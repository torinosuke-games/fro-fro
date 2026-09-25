// 昇格試験・実力診断の画面（SPEC 第6章）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var E = FF.exam;
  var L = FF.learning;
  var cooldownNodes = [];

  // ---- 昇格試験タブ ----
  function renderExamTab(box) {
    var app = FF.app, s = app.state, now = app.now();
    cooldownNodes = [];
    box.appendChild(U.el('div', { class: 'panel small' }, U.rich(U.T('examIntro'))));
    FF.defs.SUBJECTS.forEach(function (subj) {
      var u = L.unlockedGrade(s, subj.id);
      var range = E.examRange(s, subj.id);
      var p = U.el('div', { class: 'panel' });
      p.appendChild(U.el('div', { class: 'row between' }, [
        U.el('h3', {}, U.rich(L.subjectName(subj.id, u))),
        U.el('span', { class: 'badge ember', text: 'Lv' + u })
      ]));
      if (!range) {
        p.appendChild(U.R('div', 'small muted', U.T('examAllUnlocked')));
      } else {
        p.appendChild(U.R('div', 'small muted', U.T('examRange'), range));
        var cd = U.el('div', { class: 'notice' });
        cooldownNodes.push({ node: cd, subject: subj.id });
        p.appendChild(cd);
        var row = U.el('div', { class: 'grid3' });
        for (var g = range.min; g <= range.max; g++) (function (grade) {
          var avail = E.isExamAvailable(app.bank, subj.id, grade);
          row.appendChild(U.el('button', {
            class: 'pick', disabled: !avail,
            on: { click: function () { confirmExam(subj.id, grade); } }
          }, [U.el('span', { class: 'title', text: 'Lv' + grade }), U.el('span', { class: 'sub' }, avail ? U.rich(U.T('examStart')) : U.rich(U.T('preparing')))]));
        })(g);
        p.appendChild(row);
      }
      box.appendChild(p);
    });
    examTick();
  }

  function examTick() {
    var app = FF.app, now = app.now();
    cooldownNodes.forEach(function (c) {
      var rem = E.cooldownRemaining(app.state, c.subject, now);
      U.clear(c.node);
      if (rem > 0) c.node.appendChild(U.rich(U.T('examCooldown'), { time: FF.util.formatCountdown(rem) }));
    });
  }

  function confirmExam(subject, grade) {
    var app = FF.app;
    var st = E.startExam(app.bank, app.state, subject, grade, app.now(), Math.random);
    if (!st.ok) {
      if (st.reason === 'cooldown') U.toast(U.T('examCooldown'), { time: FF.util.formatCountdown(st.remainingMs) });
      else U.toast(U.T('preparing'));
      return;
    }
    U.modal({
      title: L.subjectName(subject, grade) + ' Lv' + grade + '　' + U.T('studyTabs.exam'),
      body: U.T('examIntro'),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        { label: U.T('examStart'), class: 'primary', onClick: function () { U.show('exam', { exam: st.exam, mode: 'exam' }); } }
      ]
    });
  }

  // ---- 実力診断タブ ----
  function renderDiagnosisTab(box) {
    var app = FF.app, s = app.state;
    box.appendChild(U.el('div', { class: 'panel small' }, U.rich(U.T('diagIntro'))));
    var grid = U.el('div', { class: 'grid2' });
    FF.defs.SUBJECTS.forEach(function (subj) {
      var done = s.learning.diagnosis[subj.id];
      var probe = E.nextDiagnosisItem(app.bank, E.startDiagnosis(subj.id), FF.util.makeRng(1));
      grid.appendChild(U.el('button', {
        class: 'pick', disabled: !!done || !probe,
        on: { click: function () { U.show('exam', { mode: 'diagnosis', diag: E.startDiagnosis(subj.id) }); } }
      }, [
        U.el('span', { class: 'title' }, U.rich(L.subjectName(subj.id, L.unlockedGrade(s, subj.id)))),
        U.el('span', { class: 'sub' }, done ? U.rich(U.T('diagDone'), { grade: done.result }) : (probe ? U.rich(U.T('diagnosisStart')) : U.rich(U.T('preparing'))))
      ]));
    });
    box.appendChild(grid);
  }

  // ---- 試験・診断の進行（1つの画面で両方を扱う） ----
  function render(main, params) {
    var app = FF.app;
    var run = app.examRun;
    if (!run || run.params !== params) {
      run = app.examRun = { params: params, exam: params.exam, diag: params.diag, item: null, last: null, finished: null };
    }
    var isExam = params.mode === 'exam';
    // 途中で別の画面に移るときは確認する（記録はされない）
    app.leaveGuard = run.finished ? null : function (target) {
      U.modal({
        body: isExam ? U.T('examAbortConfirm') : U.T('diagAbortConfirm'),
        buttons: [
          { label: U.T('cancel'), class: 'ghost' },
          { label: U.T('examAbort'), class: 'danger', onClick: function () {
            // 試験は途中でやめても不合格として扱う（問題を見てからやめ直すことを防ぐ）
            if (isExam) app.commit(E.finishExam(app.state, run.exam, app.now()).state);
            app.leaveGuard = null; app.examRun = null; U.show(target, target === 'study' ? { tab: isExam ? 'exam' : 'diagnosis' } : {}); } }
        ]
      });
      return false;
    };

    var subject = isExam ? run.exam.subject : run.diag.subject;
    var panel = U.el('div', { class: 'panel' });
    main.appendChild(panel);

    if (run.finished) {
      panel.appendChild(U.R('h2', '', run.finished.message, run.finished.vars));
      main.appendChild(U.el('button', {
        class: 'btn primary block', rich: U.T('back'),
        on: { click: function () { app.examRun = null; U.show('study', { tab: isExam ? 'exam' : 'diagnosis' }); } }
      }));
      return;
    }

    // 現在の問題
    if (!run.item && !run.last) {
      if (isExam) run.item = run.exam.items[run.exam.results.length];
      else run.item = E.isDiagnosisDone(run.diag) ? null : E.nextDiagnosisItem(app.bank, run.diag, Math.random);
      if (!run.item) { finish(); return; }
    }
    var it = run.item;
    var n = isExam ? run.exam.results.length + (run.last ? 0 : 1) : run.diag.log.length + (run.last ? 0 : 1);
    var head = isExam
      ? U.rich(U.T('examQuestion'), { n: n, total: run.exam.items.length })
      : U.rich(U.T('diagProgress'), { n: n, total: FF.balance.DIAGNOSIS.MAX_QUESTIONS });
    panel.appendChild(U.el('div', { class: 'row between' }, [
      U.el('span', { class: 'badge ember' }, [U.rich(L.subjectName(subject, it.question.gradeLevel)), ' Lv' + it.question.gradeLevel]),
      U.el('span', { class: 'small muted' }, head)
    ]));
    panel.appendChild(U.el('div', { class: 'question' }, U.rich(it.question.question)));

    var answered = !!run.last;
    if (it.question.answerType === 'choice') {
      panel.appendChild(U.el('div', { class: 'choices' }, it.choices.map(function (c) {
        var cls = 'choice';
        if (answered && c === it.question.answer) cls += ' is-correct';
        else if (answered && c === run.last.input) cls += ' is-wrong';
        return U.el('button', { class: cls, disabled: answered, on: { click: function () { answer(c); } } }, U.rich(c));
      })));
    } else {
      var input = U.el('input', { attrs: { type: 'text', autocomplete: 'off', inputmode: it.question.validationMode === 'number' ? 'decimal' : 'text', 'aria-label': FF.util.plainText(U.T('inputPlaceholder')), placeholder: FF.util.plainText(U.T('inputPlaceholder')) }, disabled: answered });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing) answer(input.value); });
      panel.appendChild(U.el('div', { class: 'answer-row' }, [input, U.el('button', { class: 'btn primary', rich: U.T('answer'), disabled: answered, on: { click: function () { answer(input.value); } } })]));
      if (!answered) setTimeout(function () { input.focus(); }, 30);
    }

    if (answered) {
      var fb = U.el('div', { class: 'feedback ' + (run.last.correct ? 'good' : 'bad') }, [
        U.R('div', 'verdict', run.last.correct ? U.T('examCorrect') : U.T('examWrong')),
        U.R('div', 'section-title', U.T('correctAnswer')),
        U.el('div', { style: { fontWeight: '800' } }, U.rich(it.question.answer)),
        U.R('div', 'section-title', U.T('explanation')),
        U.el('div', { class: 'pre small' }, U.rich(it.question.explanation))
      ]);
      panel.appendChild(fb);
      var last = isExam ? run.exam.results.length >= run.exam.items.length : E.isDiagnosisDone(run.diag);
      main.appendChild(U.el('button', {
        class: 'btn primary block', rich: last ? U.T('examFinish') : U.T('next'),
        on: { click: function () { run.last = null; run.item = null; if (last) finish(); else U.rerender(); } }
      }));
    }

    function answer(input) {
      if (isExam) {
        var r = E.answerExam(run.exam, input);
        if (r.empty) return;
        run.exam = r.exam;
        run.last = { correct: r.correct, input: input };
      } else {
        var d = E.answerDiagnosis(run.diag, run.item, input);
        if (d.empty) return;
        run.diag = d.diag;
        run.last = { correct: d.correct, input: input };
      }
      U.rerender();
    }

    function finish() {
      var now = app.now();
      if (isExam) {
        var r = E.finishExam(app.state, run.exam, now);
        app.commit(r.state);
        run.finished = r.passed
          ? { message: U.T('examPass'), vars: { subject: L.subjectName(subject, run.exam.grade), grade: run.exam.grade } }
          : { message: U.T('examFail'), vars: { correct: r.correct } };
      } else {
        var before = L.unlockedGrade(app.state, subject);
        var result = E.diagnosisResult(run.diag);
        var s = E.applyDiagnosis(app.state, subject, result, now);
        app.commit(s);
        var after = L.unlockedGrade(s, subject);
        run.finished = after > before
          ? { message: U.T('diagResult'), vars: { subject: L.subjectName(subject, after), grade: after } }
          : { message: U.T('diagResultSame'), vars: { subject: L.subjectName(subject, after) } };
      }
      app.leaveGuard = null;
      U.rerender();
    }
  }

  U.studyTabs = U.studyTabs || {};
  U.studyTabs.exam = renderExamTab;
  U.studyTabs.examTick = examTick;
  U.studyTabs.diagnosis = renderDiagnosisTab;
  U.screens.exam = { render: render };
})(this);
