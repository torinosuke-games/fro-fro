// 出題画面：問題・4択／自由入力・ヒント・結果と解説（SPEC 第7章・第11章）
// チケットは「回答を確定したとき」だけ消費する。表示・ヒント・戻るでは消費しない。
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var L = FF.learning;

  function nextQuestion() {
    var app = FF.app, ses = app.session;
    var q = L.pickQuestion(app.bank, ses.sel, {
      correctLog: app.state.learning.correctLog, recentIds: ses.recentIds, now: app.now(), rng: Math.random
    });
    ses.outcome = null;
    ses.retry = null;
    ses.notice = null;
    ses.picked = null;
    if (!q) { ses.attempt = null; return; }
    ses.attempt = L.startAttempt(q, Math.random);
    ses.recentIds = ses.recentIds.concat([q.id]).slice(-20);
  }

  function submit(input) {
    var app = FF.app, ses = app.session;
    var r = L.submitAnswer(app.state, ses.attempt, input, { now: app.now(), resource: ses.sel.resource });
    var o = r.outcome;
    if (o.status === 'error') {
      if (o.error === 'noTicket') { app.commit(r.state); ses.notice = 'noTicket'; U.rerender(); }
      return;
    }
    ses.attempt = r.attempt;
    if (o.status === 'retry') {
      ses.retry = o;
      U.rerender();
      focusInput();
      return;
    }
    ses.retry = null;
    ses.outcome = o;
    ses.picked = input;
    app.commit(r.state);
    U.rerender();
  }

  // 学習を終える：出題を片付けて学習画面（学ぶ）に戻る。回答中の下のボタンと、判定後の固定バーの両方から呼ぶ（確認なし）
  function endStudy() {
    var app = FF.app;
    app.session.attempt = null;
    app.session.outcome = null;
    U.show('study', { tab: 'learn' });
  }

  function focusInput() {
    var s = FF.app.session;
    if (s && s.attempt && !U.autoFocusOK(s.attempt.question)) return;
    setTimeout(function () { var i = document.querySelector('.answer-row input'); if (i) i.focus(); }, 30);
  }

  function breakdownView(bd) {
    var labels = U.T('breakdown');
    var keys = ['difficulty', 'format', 'hint', 'attempt', 'repeat', 'facility', 'focus', 'accuracy'];
    return U.el('div', { class: 'breakdown' }, [U.el('span', {}, [U.rich(labels.base), ' ' + bd.base])].concat(keys.filter(function (k) {
      return Math.abs(bd[k] - 1) > 1e-9;
    }).map(function (k) {
      return U.el('span', {}, [U.rich(labels[k]), ' ×' + (Math.round(bd[k] * 100) / 100)]);
    })));
  }

  function render(main) {
    var app = FF.app, ses = app.session;
    if (!ses) { U.show('study'); return; }
    if (!ses.attempt && !ses.outcome) nextQuestion();

    var sel = ses.sel;
    var res = U.resDef(sel.resource);
    main.appendChild(U.el('div', { class: 'crumbs' }, [res.icon + ' ', U.rich(U.T('selection'), {
      subject: L.subjectName(sel.subject, sel.grade), grade: sel.grade,
      difficulty: sel.difficulty === L.RANDOM_DIFFICULTY
        ? U.plain(U.T('difficultyRandom')) + (ses.attempt ? '（' + U.nameOf(FF.defs.DIFFICULTIES, ses.attempt.question.difficulty) + '）' : '')
        : U.nameOf(FF.defs.DIFFICULTIES, sel.difficulty),
      format: U.nameOf(FF.defs.ANSWER_TYPES, sel.answerType)
    })]));

    var panel = U.el('div', { class: 'panel' });
    main.appendChild(panel);

    if (!ses.attempt) {
      panel.appendChild(U.R('div', 'center muted', U.T('preparing')));
      main.appendChild(U.el('button', { class: 'btn block', rich: U.T('back'), on: { click: function () { U.show('study', { tab: 'learn' }); } } }));
      return;
    }

    var att = ses.attempt, q = att.question, done = att.done;
    panel.appendChild(U.el('div', { class: 'question' }, U.rich(q.question)));

    if (q.answerType === 'choice') {
      panel.appendChild(U.el('div', { class: 'choices' }, att.choices.map(function (c) {
        var cls = 'choice';
        if (done && c === q.answer) cls += ' is-correct';
        else if (done && c === ses.picked) cls += ' is-wrong';
        return U.el('button', { class: cls, disabled: done, on: { click: function () { submit(c); } } }, U.rich(c));
      })));
    } else {
      var input = U.el('input', {
        attrs: { type: 'text', inputmode: q.validationMode === 'number' ? 'decimal' : 'text', autocomplete: 'off', placeholder: FF.util.plainText(U.T('inputPlaceholder')), 'aria-label': FF.util.plainText(U.T('inputPlaceholder')) },
        disabled: done,
        value: done ? (ses.picked || '') : ''
      });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing) submit(input.value); });
      panel.appendChild(U.el('div', { class: 'answer-row' }, [
        input,
        U.el('button', { class: 'btn primary', rich: U.T('answer'), disabled: done, on: { click: function () { submit(input.value); } } })
      ]));
      if (!done && U.usesNumpad(q)) panel.appendChild(U.numpad(input));
      if (!done) focusInput();
    }

    // ヒント
    var hints = U.el('div', { class: 'hints' });
    for (var i = 0; i < att.hintsShown; i++) {
      hints.appendChild(U.el('div', { class: 'hint' }, [U.rich(U.T('hint')), ' ' + (i + 1) + '：', U.rich(q.hints[i])]));
    }
    if (!done && att.hintsShown < q.hints.length) {
      var mult = FF.balance.HINT_MULT[Math.min(att.hintsShown + 1, FF.balance.HINT_MULT.length - 1)];
      hints.appendChild(U.el('button', {
        class: 'btn small ghost',
        on: { click: function () { ses.attempt = L.revealHint(ses.attempt); U.rerender(); } }
      }, U.el('span', {}, [U.rich(U.T('showHint')), '（' + (att.hintsShown + 1) + '/' + q.hints.length + '　', U.rich(U.T('hintCost'), { mult: mult }), '）'])));
    }
    panel.appendChild(hints);

    // チケット切れ
    if (ses.notice === 'noTicket' && !done) {
      panel.appendChild(U.el('div', { class: 'feedback bad' }, [
        U.R('div', '', U.T('noTicket')),
        U.el('button', {
          class: 'btn small ice', style: { marginTop: '8px' }, rich: U.T('switchToInput'),
          on: { click: function () { ses.sel.answerType = 'input'; if (app.studySel) app.studySel.answerType = 'input'; ses.attempt = null; U.rerender(); } }
        })
      ]));
    }

    // 自由入力の再挑戦
    if (ses.retry && !done) {
      panel.appendChild(U.el('div', { class: 'feedback bad' }, [
        U.R('div', 'verdict', U.T('retry')),
        U.R('div', 'small muted', U.T('retryLeft'), { n: ses.retry.attemptsLeft })
      ]));
    }

    // 結果
    if (done && ses.outcome) {
      var o = ses.outcome, good = o.status === 'correct';
      var fb = U.el('div', { class: 'feedback ' + (good ? 'good' : 'bad') });
      fb.appendChild(U.R('div', 'verdict', good ? U.T('correct') : U.T('wrong')));
      if (good) {
        fb.appendChild(U.el('div', { class: 'gain' }, ['+' + U.fmt(o.reward) + ' ' + res.icon + ' ', U.rich(res.name)]));
        fb.appendChild(breakdownView(o.breakdown));
      } else {
        fb.appendChild(U.R('div', 'small muted', U.T('noReward')));
      }
      fb.appendChild(U.R('div', 'section-title', U.T('correctAnswer')));
      fb.appendChild(U.el('div', { style: { fontWeight: '800', fontSize: '18px' } }, U.rich(o.correctAnswer)));
      fb.appendChild(U.R('div', 'section-title', U.T('explanation')));
      fb.appendChild(U.el('div', { class: 'pre' }, U.rich(o.explanation)));
      if (L.shouldRecommendLower(app.state, q.subject, q.gradeLevel)) fb.appendChild(U.R('div', 'notice', U.T('recommendLower')));
      panel.appendChild(fb);
    }

    // ［学習を終える］［次の問題 ▶］は、出題の最初から画面の下（ナビの上）に固定しておく（判定の前後でバーの位置・大きさは変えない）。
    // 判定の前は［次の問題］だけを無効（グレー）にし、判定が出たら有効（オレンジ）にする。［学習を終える］はいつでも押せる。
    // 本文がバーの裏に隠れないよう、同じ高さの余白（.quiz-footer-space）を最後に置く。
    main.appendChild(U.el('div', { class: 'quiz-footer-space', attrs: { 'aria-hidden': 'true' } }));
    main.appendChild(U.el('div', { class: 'quiz-footer' }, U.el('div', { class: 'inner' }, [
      U.el('button', { class: 'btn qf-end', rich: U.T('endStudy'), on: { click: endStudy } }),
      U.el('button', {
        class: 'btn primary qf-next', disabled: !done,
        on: { click: function () { if (!ses.attempt || !ses.attempt.done) return; nextQuestion(); U.rerender(); } }
      }, [U.rich(U.T('next')), U.el('span', { attrs: { 'aria-hidden': 'true' }, text: ' ▶' })])
    ])));
  }

  U.screens.quiz = { render: render };
})(this);
