// 戦闘画面（v0.3 その2、SPEC_v0.3_battle 1.3、DESIGN 13.6）：敵の立ち絵、HP、出題、勝ち負けの表示。
// ロジックは FF.battle（純粋関数）。この画面は結果を表示し、app.commit で保存するだけ。
// 戦闘は探索の地図の敵・ボスの地点からだけ入る（ナビの「戦闘」はロックのまま）。
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var X = FF.exploration;
  var BA = FF.battle;
  var L = FF.learning;

  function enemyName(enemyId) { return U.rich(FF.defs.ENEMIES[enemyId].name); }

  // ---- 敵の立ち絵：画像（img/）があれば画像、なければ SVG（js/svg/enemies.js） ----
  function artView(enemyId, regionId) {
    var def = FF.defs.ENEMIES[enemyId], theme = FF.app.theme;
    var box = U.el('div', { class: 'battle-art' + (def.boss ? ' boss' : '') });
    var art = def.art || '';
    function svgArt(name) { return FF.svgEnemies.render(name, theme, regionId); }
    if (art.indexOf('img:') === 0) {
      var img = U.el('img', { attrs: { src: 'img/' + art.slice(4), alt: '', decoding: 'async' } });
      img.addEventListener('error', function () {   // 画像が読み込めなければ仮の絵に切り替える
        if (img.parentNode) img.parentNode.replaceChild(svgArt(def.svgFallback), img);
      });
      box.appendChild(img);
    } else {
      box.appendChild(svgArt(art.replace(/^svg:/, '')));
    }
    return box;
  }

  // ---- 遭遇のお知らせ（地図の敵・ボスの地点を押したとき） ----
  function openEncounter(regionId, enemyId) {
    var app = FF.app, s = app.state;
    var def = FF.defs.ENEMIES[enemyId], node = X.enemyNode(regionId, enemyId);
    var status = X.enemyStatus(s, regionId, enemyId);
    var body = U.el('div', { class: 'stack' });
    body.appendChild(artView(enemyId, regionId));
    if (status === 'locked') {
      body.appendChild(U.R('div', 'pre', node.text));
      body.appendChild(U.R('div', 'small muted', def.boss ? U.T('explore.bossLocked') : U.T('explore.enemyLocked')));
      U.modal({ title: def.name, body: body });
      return;
    }
    if (status === 'defeated') {
      body.appendChild(U.R('div', 'pre', def.victory));
      body.appendChild(U.R('div', 'small muted', U.T('explore.enemyDefeated')));
    } else {
      body.appendChild(U.R('div', 'pre', def.encounter));
      var hp = BA.startHp(s, regionId, enemyId), max = FF.balance.BATTLE.ENEMIES[enemyId].hp;
      if (hp < max) body.appendChild(U.el('div', { class: 'notice' }, [U.rich(U.T('battle.weakened')), '（', U.rich(U.T('battle.hp'), { now: hp, max: max }), '）']));
    }
    U.modal({
      title: def.name, body: body,
      buttons: [
        { label: U.T('explore.notNow'), class: 'ghost' },
        { label: status === 'defeated' ? U.T('battle.again') : U.T('explore.fight'), class: 'primary', onClick: function () { startBattle(regionId, enemyId); } }
      ]
    });
  }
  U.openEncounter = openEncounter;

  function startBattle(regionId, enemyId) {
    var app = FF.app;
    var bat = BA.startBattle(app.state, regionId, enemyId);
    if (!bat) { U.show('explore', { region: regionId }); return; }
    app.battleSession = { regionId: regionId, enemyId: enemyId, battle: bat, weakened: bat.enemyHp < bat.enemyMax };
    newQuestion(app.battleSession);
    U.show('battle');
  }

  function newQuestion(ses) {
    var app = FF.app;
    ses.outcome = null; ses.retry = null; ses.picked = null;
    var q = BA.pickBattleQuestion(app.bank, app.state, ses.battle, Math.random, app.now());
    ses.attempt = q ? L.startAttempt(q, Math.random) : null;
  }

  function toMap() {
    var app = FF.app, ses = app.battleSession;
    var regionId = ses ? ses.regionId : null;
    app.battleSession = null;
    U.show('explore', regionId ? { region: regionId } : {});
  }

  // 引き返す：敗北には数えず、ボスの弱体化も進めない。
  function retreat() {
    var app = FF.app, ses = app.battleSession;
    if (ses && !ses.battle.result) app.commit(BA.retreatBattle(app.state, ses.battle).state);
    toMap();
  }

  function submit(input) {
    var app = FF.app, ses = app.battleSession;
    var r = BA.answerBattle(app.state, ses.battle, ses.attempt, input, app.now(), Math.random);
    var o = r.outcome;
    if (o.status === 'error') { if (o.error !== 'empty') toMap(); return; }
    ses.attempt = r.attempt;
    ses.battle = r.battle;
    app.commit(r.state);
    ses.fx = o.damageTaken ? 'hurt' : (o.damageDealt ? 'hit' : null);
    if (o.status === 'retry') {
      ses.retry = o;
      U.rerender();
      return;
    }
    ses.retry = null;
    ses.outcome = o;
    if (o.status === 'correct' && FF.sound) FF.sound.correct();
    ses.picked = input;
    ses.win = r.win;
    U.rerender();
    if (r.result) setTimeout(function () { showResult(ses); }, 450);
  }

  // 勝ち・負けのお知らせ
  function showResult(ses) {
    var app = FF.app, def = FF.defs.ENEMIES[ses.enemyId];
    if (app.battleSession !== ses) return;
    var body = U.el('div', { class: 'stack' });
    if (ses.battle.result === 'win') {
      body.appendChild(U.R('div', 'pre', def.victory));
      if (ses.win && ses.win.reward) {
        body.appendChild(U.R('div', 'section-title', U.T('battle.firstReward')));
        body.appendChild(U.exploreRewardView(ses.win.reward));
      }
      // 捕らえられていた旅人の救出（判断354）
      if (ses.win && ses.win.rescued && FF.texts.adventure.members[ses.win.rescued]) {
        var ally = FF.texts.adventure.members[ses.win.rescued];
        body.appendChild(U.R('div', 'section-title', U.T('battle.rescueTitle')));
        body.appendChild(U.el('div', { class: 'rescue-card' }, [
          U.el('div', { class: 'rescue-portrait' }, FF.adventureArt ? FF.adventureArt(ses.win.rescued, true) : null),
          U.el('div', { class: 'rescue-text' }, [
            U.el('strong', {}, [U.rich(ally.name), U.rich('　'), U.rich(ally.role)]),
            U.el('p', { class: 'rescue-quote' }, U.rich('「' + ally.rescue + '」')),
            U.el('p', { class: 'small muted' }, U.rich(U.T('battle.rescueJoin').replace('{name}', ally.name)))
          ])
        ]));
      }
      if (ses.win && ses.win.completed) {
        var r = X.regionDef(ses.regionId);
        body.appendChild(U.el('div', { class: 'verdict good-text' }, [U.rich(r.name), U.rich(U.T('explore.completeTitle'))]));
        body.appendChild(U.R('div', 'pre', r.completeText, { name: app.state.player.name }));
      }
      U.modal({ title: U.T('battle.winTitle'), body: body, buttons: [{ label: U.T('battle.toMap'), class: 'primary', onClick: toMap }] });
    } else {
      body.appendChild(U.R('div', 'pre', FF.defs.BATTLE_LOSE_TEXT));
      if (def.boss) body.appendChild(U.R('div', 'small muted', U.T('battle.bossNote')));
      U.modal({
        title: U.T('battle.loseTitle'), body: body,
        buttons: [{ label: U.T('battle.toMap'), class: 'ghost', onClick: toMap }, { label: U.T('battle.again'), class: 'primary', onClick: function () { startBattle(ses.regionId, ses.enemyId); } }]
      });
    }
  }

  function hpRow(cls, label, now, max) {
    var pct = max > 0 ? Math.max(0, Math.min(100, now / max * 100)) : 0;
    return U.el('div', { class: 'hp-row ' + cls }, [
      U.el('span', { class: 'hp-name' }, label),
      U.el('span', { class: 'hp-bar', attrs: { role: 'img', 'aria-label': FF.util.plainText(U.T('battle.hp'), { now: now, max: max }) } }, U.el('i', { style: { width: pct + '%' } })),
      U.el('span', { class: 'hp-num' }, U.rich(U.T('battle.hp'), { now: now, max: max }))
    ]);
  }

  function focusInput() {
    var s = FF.app.battleSession;
    if (s && s.attempt && !U.autoFocusOK(s.attempt.question)) return;
    setTimeout(function () { var i = document.querySelector('.answer-row input'); if (i) i.focus(); }, 30);
  }

  function render(main) {
    var app = FF.app, ses = app.battleSession;
    if (!ses) { U.show('explore'); return; }
    var bat = ses.battle, def = FF.defs.ENEMIES[ses.enemyId], r = X.regionDef(ses.regionId);
    var fx = ses.fx; ses.fx = null;
    var wrap = U.el('div', { class: 'battle-screen' + (fx === 'hurt' ? ' fx-hurt' : '') });
    main.appendChild(wrap);

    wrap.appendChild(U.el('div', { class: 'crumbs' }, ['⚔ ', U.rich(r.name), '　›　', enemyName(ses.enemyId)]));
    var art = artView(ses.enemyId, ses.regionId);
    if (fx === 'hit') art.classList.add('fx-hit');
    wrap.appendChild(art);
    wrap.appendChild(U.el('div', { class: 'hp-box' }, [
      hpRow('enemy', enemyName(ses.enemyId), bat.enemyHp, bat.enemyMax),
      hpRow('player', [U.rich(U.T('battle.captain')), ' ', app.state.player.name], bat.playerHp, bat.playerMax)
    ]));
    if (ses.weakened && !bat.result) wrap.appendChild(U.R('div', 'small muted', U.T('battle.weakened')));

    var panel = U.el('div', { class: 'panel' });
    wrap.appendChild(panel);
    if (!ses.attempt) {
      panel.appendChild(U.R('div', 'center muted', U.T('battle.noQuestion')));
    } else {
      var att = ses.attempt, q = att.question, done = att.done;
      if (!done && bat.missed && q.answerType === 'input') panel.appendChild(U.R('div', 'notice', U.T('battle.inputOnly')));
      panel.appendChild(U.el('div', { class: 'question' }, U.rich(q.question)));
      if (q.diagram && FF.lessonFigure) panel.appendChild(FF.lessonFigure.render(q.diagram));
      if (q.answerType === 'choice') {
        panel.appendChild(U.el('div', { class: 'choices' }, att.choices.map(function (c) {
          var cls = 'choice';
          if (done && c === q.answer) cls += ' is-correct';
          else if (done && c === ses.picked) cls += ' is-wrong';
          return U.el('button', { class: cls, disabled: done || !!bat.result, on: { click: function () { submit(c); } } }, U.rich(c));
        })));
      } else {
        var input = U.el('input', {
          attrs: { type: 'text', inputmode: q.validationMode === 'number' ? 'decimal' : 'text', autocomplete: 'off', placeholder: FF.util.plainText(U.T('inputPlaceholder')), 'aria-label': FF.util.plainText(U.T('inputPlaceholder')) },
          disabled: done || !!bat.result,
          value: done ? (ses.picked || '') : ''
        });
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing) submit(input.value); });
        U.keepInView(input);
        panel.appendChild(U.el('div', { class: 'answer-row' }, [
          input,
          U.el('button', { class: 'btn primary', rich: U.T('answer'), disabled: done || !!bat.result, on: { click: function () { submit(input.value); } } })
        ]));
        if (!done && !bat.result && U.usesNumpad(q)) panel.appendChild(U.numpad(input));
        if (!done && !bat.result) focusInput();
      }

      // ヒント（戦闘では報酬がないので倍率は出さない。ダメージも減らない）
      var hints = U.el('div', { class: 'hints' });
      for (var i = 0; i < att.hintsShown; i++) hints.appendChild(U.el('div', { class: 'hint' }, [U.rich(U.T('hint')), ' ' + (i + 1) + '：', U.rich(q.hints[i])]));
      if (!done && !bat.result && att.hintsShown < q.hints.length) {
        hints.appendChild(U.el('button', {
          class: 'btn small ghost', on: { click: function () { ses.attempt = L.revealHint(ses.attempt); U.rerender(); } }
        }, U.el('span', {}, [U.rich(U.T('explore.showHint')), '（' + (att.hintsShown + 1) + '/' + q.hints.length + '）'])));
      }
      panel.appendChild(hints);

      // 書き問題のやり直し（まちがえた分のダメージを出す）
      if (ses.retry && !done) {
        panel.appendChild(U.el('div', { class: 'feedback bad' }, [
          U.el('div', { class: 'verdict' }, [U.rich(U.T('battle.wrong')), enemyName(ses.enemyId), U.rich(U.T('battle.hurt'), { n: ses.retry.damageTaken })]),
          U.R('div', 'small muted', U.T('retryLeft'), { n: ses.retry.attemptsLeft })
        ]));
      }
      if (done && ses.outcome) {
        var o = ses.outcome, good = o.status === 'correct';
        var fb = U.el('div', { class: 'feedback ' + (good ? 'good' : 'bad') });
        fb.appendChild(U.el('div', { class: 'verdict' }, good
          ? [U.rich(U.T('battle.correct')), enemyName(ses.enemyId), U.rich(U.T('battle.hit'), { n: o.damageDealt })]
          : [U.rich(U.T('battle.wrong')), enemyName(ses.enemyId), U.rich(U.T('battle.hurt'), { n: o.damageTaken })]));
        fb.appendChild(U.R('div', 'section-title', U.T('correctAnswer')));
        fb.appendChild(U.el('div', { style: { fontWeight: '800', fontSize: '18px' } }, U.rich(o.correctAnswer)));
        fb.appendChild(U.R('div', 'section-title', U.T('explanation')));
        fb.appendChild(U.el('div', { class: 'pre' }, U.rich(o.explanation)));
        panel.appendChild(fb);
      }
    }

    // 固定バー（学習の出題と同じ部品）：［引き返す］［次の問題 ▶］。戦闘が終わったら［地図へ］
    var done2 = ses.attempt && ses.attempt.done;
    main.appendChild(U.el('div', { class: 'quiz-footer-space', attrs: { 'aria-hidden': 'true' } }));
    main.appendChild(U.el('div', { class: 'quiz-footer' }, U.el('div', { class: 'inner' }, bat.result ? [
      U.el('button', { class: 'btn primary qf-next', rich: U.T('battle.toMap'), on: { click: function () { showResult(ses); } } })
    ] : [
      U.el('button', { class: 'btn qf-end', rich: U.T('battle.retreat'), on: { click: retreat } }),
      U.el('button', {
        class: 'btn primary qf-next', disabled: !done2,
        on: { click: function () { if (!ses.attempt || !ses.attempt.done) return; newQuestion(ses); U.rerender(); } }
      }, [U.rich(U.T('next')), U.el('span', { attrs: { 'aria-hidden': 'true' }, text: ' ▶' })])
    ])));
  }

  U.screens.battle = { render: render };
})(this);
