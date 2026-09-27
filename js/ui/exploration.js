// 探索画面（v0.2、SPEC_v0.2 第2章〜第5章）：地域の選択、ルートの地図、地点の記録、出題、宝箱・できごとの表示。
// ロジックは FF.exploration（純粋関数）。この画面は結果を表示し、app.commit で保存するだけ。
// 探索の問題はチケットを使わず、報酬もなく、学習の記録にも残らない。
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var X = FF.exploration;
  var L = FF.learning;

  function regionName(r) { return U.rich(r.name); }

  var HIT_R = 7.6;   // 地図の座標（幅 100）での半径。地点どうしは中心が 19 以上離れているので重ならない

  // ---- 報酬の表示（資源とチケット） ----
  function rewardView(reward) {
    if (!reward) return null;
    var items = [];
    FF.defs.RESOURCES.forEach(function (r) {
      if (reward[r.id]) items.push(U.el('span', { class: 'item' }, [r.icon + ' ', U.rich(r.name), ' +' + U.fmt(reward[r.id])]));
    });
    if (reward.tickets) items.push(U.el('span', { class: 'item ticket' }, U.rich(U.T('explore.tickets'), { n: reward.tickets })));
    return U.el('div', { class: 'cost reward' }, items);
  }

  // 宝箱の絵（開いた状態。animate なら開く動き）
  function chestArt(animate) {
    var s = U.svg;
    return s('svg', { viewBox: '-20 -22 40 34', class: 'chest-art' + (animate ? ' animate' : ''), 'aria-hidden': 'true' }, [
      s('ellipse', { class: 'chest-glow', cx: 0, cy: -2, rx: 16, ry: 10 }),
      s('rect', { x: -12, y: -4, width: 24, height: 14, rx: 2, fill: '#6b4a2f', stroke: '#c9a063', 'stroke-width': 1 }),
      s('rect', { x: -12, y: 1, width: 24, height: 2, fill: '#c9a063' }),
      s('g', { class: 'chest-lid' }, [
        s('path', { d: 'M-12 -4 Q0 -14 12 -4 Z', fill: '#8a6240', stroke: '#c9a063', 'stroke-width': 1 })
      ]),
      s('rect', { x: -2, y: -2, width: 4, height: 5, fill: '#ffd166' })
    ]);
  }

  // できごとの表示。分岐でまだ選んでいなければ選べる（選んだら onChange）
  function eventView(regionId, nodeId, onChange) {
    var rec = X.regionState(FF.app.state, regionId).events[nodeId];
    if (!rec) return null;
    var ev = X.eventDef(rec.id);
    var box = U.el('div', { class: 'event-box' });
    if (ev.type === 'trivia') box.appendChild(U.el('span', { class: 'badge' }, U.rich(U.T('explore.trivia'))));
    box.appendChild(U.R('div', 'pre', ev.text));
    if (ev.type === 'resource') box.appendChild(rewardView(FF.balance.EXPLORE.EVENT_REWARDS[rec.id]));
    if (ev.type === 'choice') {
      if (rec.choice === null) {
        box.appendChild(U.el('div', { class: 'choices' }, ev.options.map(function (o, i) {
          return U.el('button', {
            class: 'choice', on: {
              click: function () {
                FF.app.commit(X.chooseEventOption(FF.app.state, regionId, nodeId, i));
                if (onChange) onChange();
              }
            }
          }, U.rich(o.label));
        })));
      } else {
        var o = ev.options[rec.choice];
        box.appendChild(U.el('div', { class: 'small muted' }, [U.rich(U.T('explore.chosen')), '：', U.rich(o.label)]));
        box.appendChild(U.R('div', 'pre', o.result));
      }
    }
    return box;
  }

  // 地点の記録（到達済みの地点をタップしたとき、たどり着いたとき）
  function nodeRecord(regionId, node, opts) {
    opts = opts || {};
    var box = U.el('div', { class: 'stack' });
    box.appendChild(U.R('div', 'pre', node.text));
    if (node.kind === 'chest') {
      var opened = X.regionState(FF.app.state, regionId).openedChests.indexOf(node.chest) >= 0;
      if (opened) {
        box.appendChild(U.el('div', { class: 'chest-row' }, [chestArt(!!opts.animate), U.el('div', {}, [
          U.R('div', 'verdict', U.T('explore.chestOpened')),
          rewardView(FF.balance.EXPLORE.CHESTS[node.chest])
        ])]));
      }
    }
    if (node.kind === 'event') {
      var holder = U.el('div', {});
      var draw = function () { U.clear(holder); holder.appendChild(eventView(regionId, node.id, draw)); };
      draw();
      box.appendChild(holder);
    }
    return box;
  }

  // ---- 解放のお知らせ（基地・探索の画面から呼ぶ） ----
  function showExploreNotices() {
    var app = FF.app;
    var list = X.pendingExploreNotices(app.state);
    if (!list.length || document.querySelector('.overlay')) return;
    var id = list[0];
    function seen() { app.commit(FF.buildings.markUnlockNoticeSeen(app.state, 'explore_' + id)); }
    var buttons = [{ label: U.T('ok'), class: app.screen === 'explore' ? 'primary' : 'ghost', onClick: function () { seen(); setTimeout(showExploreNotices, 50); } }];
    if (app.screen !== 'explore') buttons.push({ label: U.T('explore.go'), class: 'primary', onClick: function () { seen(); U.show('explore', { region: id }); } });
    U.modal({
      title: U.T('unlockTitle'),
      body: U.T('explore.unlockNotice.explore_' + id),
      vars: { name: app.state.player.name },
      buttons: buttons
    });
  }
  U.showExploreNotices = showExploreNotices;

  // ---- 地域の選択 ----
  function progressBar(pct) {
    return U.el('div', { class: 'xp-bar' }, U.el('i', { style: { width: pct + '%' } }));
  }

  function renderRegions(main) {
    var s = FF.app.state;
    main.appendChild(U.el('div', { class: 'panel' }, [
      U.R('div', 'section-title', U.T('explore.chooseRegion')),
      U.R('div', 'small muted', U.T('explore.intro'))
    ]));
    FF.defs.REGIONS.forEach(function (r) {
      var open = X.isRegionUnlocked(s, r.id);
      var pct = X.progressPercent(s, r.id);
      var done = X.isComplete(s, r.id);
      var status;
      if (!open) {
        var need = FF.balance.EXPLORE.UNLOCK_FURNACE_LEVEL[r.id];
        if (need && s.buildings.furnace.level < need) status = U.rich(U.T('explore.lockedFurnace'), { level: need });
        else status = U.el('span', {}, [regionName(X.regionDef(r.requires)), U.rich(U.T('explore.lockedRequires'))]);
      }
      main.appendChild(U.el('button', {
        class: 'region-card region-' + r.id + (open ? '' : ' locked') + (done ? ' done' : ''),
        attrs: { 'aria-disabled': open ? null : 'true' },
        on: { click: function () { if (open) U.show('explore', { region: r.id }); else U.toast(FF.util.plainText(U.T('explore.lockedFurnace'), { level: FF.balance.EXPLORE.UNLOCK_FURNACE_LEVEL[r.id] })); } }
      }, [
        U.el('div', { class: 'row between' }, [
          U.el('span', { class: 'rg-name' }, [open ? '' : '🔒 ', regionName(r)]),
          U.el('span', { class: 'rg-en', text: r.nameEn })
        ]),
        U.el('div', { class: 'small muted' }, U.rich(U.T('explore.recommended'), { from: r.grades[0], to: r.grades[1] })),
        open ? U.el('div', { class: 'row' }, [progressBar(pct), U.el('span', { class: 'pct' }, done ? U.rich(U.T('explore.complete')) : U.rich(U.T('explore.progress'), { pct: pct }))]) : null,
        status ? U.el('div', { class: 'notice' }, status) : null
      ]));
    });
  }

  // ---- ルートの地図（SVG。名前は下のパネルに出す：SVG の文字は ruby に対応しないため） ----
  function mapView(regionId, onNode) {
    var s = U.svg, st = FF.app.state;
    var r = X.regionDef(regionId), route = X.route(regionId), pos = X.regionState(st, regionId).position;
    var svg = s('svg', { viewBox: '0 0 100 104', class: 'xp-map map-' + regionId, role: 'group', 'aria-label': FF.util.plainText(r.name) });

    // 背景
    svg.appendChild(s('rect', { x: 0, y: 0, width: 100, height: 104, class: 'map-bg' }));
    if (regionId === 'forest') {
      for (var i = 0; i < 26; i++) {
        var tx = (i * 37) % 100, ty = 6 + ((i * 53) % 96), h = 5 + (i % 4);
        svg.appendChild(s('path', { class: 'tree', d: 'M' + tx + ' ' + (ty - h) + ' L' + (tx + h * 0.45) + ' ' + ty + ' H' + (tx - h * 0.45) + ' Z' }));
      }
    } else {
      for (var j = 0; j < 9; j++) {
        svg.appendChild(s('ellipse', { class: 'drift', cx: (j * 29 + 8) % 100, cy: 10 + ((j * 41) % 90), rx: 10 + (j % 3) * 4, ry: 2.4 }));
      }
    }

    // 道：通った区間は実線、まだの区間は点線。敵地点へは細い点線
    for (var k = 0; k + 1 < route.length; k++) {
      var a = route[k], b = route[k + 1];
      svg.appendChild(s('line', { class: 'trail' + (k + 1 <= pos ? ' done' : ''), x1: a.x, y1: a.y, x2: b.x, y2: b.y }));
    }
    r.nodes.filter(function (n) { return n.kind === 'enemy'; }).forEach(function (n) {
      var adj = X.nodeDef(regionId, n.adjacent);
      svg.appendChild(s('line', { class: 'trail enemy-link', x1: adj.x, y1: adj.y, x2: n.x, y2: n.y }));
    });

    // 地点
    r.nodes.forEach(function (n) {
      var status = X.nodeStatus(st, regionId, n.id);
      var g = s('g', {
        class: 'node kind-' + n.kind + ' st-' + status, transform: 'translate(' + n.x + ',' + n.y + ')',
        tabindex: 0, role: 'button', 'aria-label': FF.util.plainText(n.name)
      });
      // 押せる範囲（見た目の円より大きい透明な円）。幅 320px の画面でも直径 44px 以上になる大きさ
      g.appendChild(s('circle', { class: 'hit', r: HIT_R }));
      if (status === 'next') g.appendChild(s('circle', { class: 'pulse', r: 6.5 }));
      g.appendChild(s('circle', { class: 'disc', r: 4.4 }));
      if (n.kind === 'start') g.appendChild(s('path', { class: 'ico', d: 'M-1.2 2.2 V-2.4 L2 -1.3 L-1.2 -0.2' }));
      if (n.kind === 'normal') g.appendChild(s('circle', { class: 'ico fill', r: 1.3 }));
      if (n.kind === 'event') g.appendChild(s('path', { class: 'ico fill', d: 'M0 -2.3 L2.3 0 L0 2.3 L-2.3 0 Z' }));
      if (n.kind === 'chest') {
        var opened = X.regionState(st, regionId).openedChests.indexOf(n.chest) >= 0;
        g.appendChild(s('rect', { class: 'ico chest' + (opened ? ' opened' : ''), x: -2.4, y: -1.2, width: 4.8, height: 3.2, rx: 0.4 }));
        g.appendChild(s('path', { class: 'ico chest' + (opened ? ' opened' : ''), d: opened ? 'M-2.4 -1.2 L-1.6 -3.6 H2.2 L2.4 -1.2 Z' : 'M-2.4 -1.2 Q0 -3.4 2.4 -1.2 Z' }));
      }
      if (n.kind === 'enemy') {
        g.appendChild(s('path', { class: 'ice-shell', d: 'M0 -4.2 L3.6 -2.1 V2.1 L0 4.2 L-3.6 2.1 V-2.1 Z' }));
        var q = s('text', { class: 'ico q', x: 0, y: 1.5, 'text-anchor': 'middle' });
        q.textContent = '?';
        g.appendChild(q);
      }
      if (status === 'current') {
        g.appendChild(s('path', { class: 'you', d: 'M0 -5.2 L-2 -8.6 H2 Z' }));
      }
      function pick() { onNode(n); }
      g.addEventListener('click', pick);
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
      svg.appendChild(g);
    });
    return U.el('div', { class: 'xp-map-wrap' }, svg);
  }

  function openNode(regionId, n) {
    var st = FF.app.state;
    var status = X.nodeStatus(st, regionId, n.id);
    if (status === 'locked') {
      U.modal({ title: n.name, body: U.R('div', 'pre', n.text) });
      return;
    }
    if (status === 'next') {
      U.modal({
        title: n.name, body: U.T('explore.nextHere'),
        buttons: [{ label: U.T('back'), class: 'ghost' }, { label: U.T('explore.challenge'), class: 'primary', onClick: function () { startChallenge(regionId); } }]
      });
      return;
    }
    if (status === 'ahead') {
      U.modal({ title: n.name, body: n.kind === 'chest' ? U.T('explore.chestNotYet') : U.T('explore.ahead') });
      return;
    }
    U.modal({ title: n.name, body: nodeRecord(regionId, n) });
  }

  function startChallenge(regionId) {
    var ses = FF.app.exploreSession;
    if (!ses || ses.region !== regionId || (ses.attempt && ses.attempt.done)) FF.app.exploreSession = { region: regionId };
    U.show('exploreQuiz', { region: regionId });
  }

  function renderRoute(main, regionId) {
    var app = FF.app, s = app.state;
    var r = X.regionDef(regionId);
    if (!r || !X.isRegionUnlocked(s, regionId)) { U.show('explore'); return; }
    var rs = X.regionState(s, regionId), route = X.route(regionId);
    var done = X.isComplete(s, regionId), pct = X.progressPercent(s, regionId);

    main.appendChild(U.el('div', { class: 'row between xp-head' }, [
      U.el('button', { class: 'btn small ghost', rich: U.T('explore.backToRegions'), on: { click: function () { U.show('explore'); } } }),
      U.el('span', { class: 'rg-en', text: r.nameEn })
    ]));
    main.appendChild(U.el('div', { class: 'panel' }, [
      U.el('div', { class: 'row between' }, [
        U.el('h2', { class: 'rg-title' }, regionName(r)),
        U.el('span', { class: 'pct' }, done ? U.rich(U.T('explore.complete')) : U.rich(U.T('explore.progress'), { pct: pct }))
      ]),
      progressBar(pct),
      U.R('div', 'small muted xp-intro', r.intro, { name: s.player.name })
    ]));

    main.appendChild(mapView(regionId, function (n) { openNode(regionId, n); }));
    // 凡例は項目ごとに折り返す（狭い画面で「近づけない場所」が途中で切れないように）
    main.appendChild(U.el('div', { class: 'xp-legend' }, U.T('explore.legend').split('　').map(function (item) { return U.el('span', {}, U.rich(item)); })));

    var info = U.el('div', { class: 'panel stack' });
    if (done) {
      info.appendChild(U.el('div', { class: 'verdict good-text' }, [regionName(r), U.rich(U.T('explore.completeTitle'))]));
      info.appendChild(U.R('div', 'pre', r.completeText, { name: s.player.name }));
      info.appendChild(U.R('div', 'small muted', U.T('explore.doneNote')));
    } else {
      var cur = route[rs.position], next = route[rs.position + 1];
      info.appendChild(U.el('div', {}, [U.el('span', { class: 'badge' }, U.rich(U.T('explore.current'))), ' ', U.el('b', {}, U.rich(cur.name))]));
      info.appendChild(U.R('div', 'small muted pre', cur.text));
      info.appendChild(U.el('div', {}, [U.el('span', { class: 'badge ember' }, U.rich(U.T('explore.next'))), ' ', U.el('b', {}, U.rich(next.name))]));
      if (rs.missedHere) info.appendChild(U.R('div', 'notice', U.T('explore.missedNote')));
      info.appendChild(U.el('button', { class: 'btn primary block', rich: U.T('explore.challenge'), on: { click: function () { startChallenge(regionId); } } }));
      info.appendChild(U.R('div', 'small muted center', U.T('explore.challengeNote')));
    }
    main.appendChild(info);
  }

  function render(main, params) {
    if (!X.isExploreOpen(FF.app.state)) { U.show('base'); return; }
    if (params.region) renderRoute(main, params.region);
    else renderRegions(main);
    setTimeout(showExploreNotices, 100);
  }

  // ---- 出題 ----
  function newQuestion(ses) {
    var app = FF.app;
    ses.outcome = null; ses.retry = null; ses.picked = null; ses.arrival = null;
    var q = X.pickExploreQuestion(app.bank, app.state, ses.region, Math.random, app.now());
    ses.attempt = q ? L.startAttempt(q, Math.random) : null;
  }

  function submit(input) {
    var app = FF.app, ses = app.exploreSession;
    var r = X.answerExplore(app.state, ses.region, ses.attempt, input, app.now(), Math.random);
    var o = r.outcome;
    if (o.status === 'error') { if (o.error !== 'empty') U.show('explore', { region: ses.region }); return; }
    ses.attempt = r.attempt;
    app.commit(r.state);
    if (o.status === 'retry') {
      ses.retry = o;
      U.rerender();
      focusInput();
      return;
    }
    ses.retry = null;
    ses.outcome = o;
    ses.picked = input;
    ses.arrival = r.arrival;
    U.rerender();
  }

  function focusInput() {
    var s = FF.app.exploreSession;
    if (s && s.attempt && !U.autoFocusOK(s.attempt.question)) return;
    setTimeout(function () { var i = document.querySelector('.answer-row input'); if (i) i.focus(); }, 30);
  }

  function renderQuiz(main, params) {
    var app = FF.app;
    var regionId = params.region;
    var r = X.regionDef(regionId);
    if (!r || !X.isRegionUnlocked(app.state, regionId)) { U.show('explore'); return; }
    var ses = app.exploreSession;
    if (!ses || ses.region !== regionId) ses = app.exploreSession = { region: regionId };
    if (!ses.attempt && !ses.outcome) {
      if (X.isComplete(app.state, regionId)) { U.show('explore', { region: regionId }); return; }
      newQuestion(ses);
    }
    function toMap() {
      // 回答済みの問題は片付ける（答える前の問題は、戻ってきたときにそのまま続けられる）
      if (app.exploreSession && app.exploreSession.attempt && app.exploreSession.attempt.done) app.exploreSession = null;
      U.show('explore', { region: regionId });
    }

    // どこへ向かっているか（回答後は、たどり着いた地点ではなく出題時の行き先を出す）
    var rs = X.regionState(app.state, regionId), route = X.route(regionId);
    var target = ses.arrival ? ses.arrival.node : route[Math.min(rs.position + 1, route.length - 1)];
    main.appendChild(U.el('div', { class: 'crumbs' }, ['🗺️ ', regionName(r), '　›　', U.rich(target.name)]));

    var panel = U.el('div', { class: 'panel' });
    main.appendChild(panel);
    if (!ses.attempt) {
      panel.appendChild(U.R('div', 'center muted', U.T('explore.noQuestion')));
      main.appendChild(U.el('button', { class: 'btn block', rich: U.T('explore.backToMap'), on: { click: toMap } }));
      return;
    }

    var att = ses.attempt, q = att.question, done = att.done;
    if (!done && rs.missedHere && q.answerType === 'input') panel.appendChild(U.R('div', 'notice', U.T('explore.missedNote')));
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
      U.keepInView(input);
      panel.appendChild(U.el('div', { class: 'answer-row' }, [
        input,
        U.el('button', { class: 'btn primary', rich: U.T('answer'), disabled: done, on: { click: function () { submit(input.value); } } })
      ]));
      if (!done && U.usesNumpad(q)) panel.appendChild(U.numpad(input));
      if (!done) focusInput();
    }

    // ヒント（探索では報酬がないので倍率の表示はしない）
    var hints = U.el('div', { class: 'hints' });
    for (var i = 0; i < att.hintsShown; i++) {
      hints.appendChild(U.el('div', { class: 'hint' }, [U.rich(U.T('hint')), ' ' + (i + 1) + '：', U.rich(q.hints[i])]));
    }
    if (!done && att.hintsShown < q.hints.length) {
      hints.appendChild(U.el('button', {
        class: 'btn small ghost',
        on: { click: function () { ses.attempt = L.revealHint(ses.attempt); U.rerender(); } }
      }, U.el('span', {}, [U.rich(U.T('explore.showHint')), '（' + (att.hintsShown + 1) + '/' + q.hints.length + '）'])));
    }
    panel.appendChild(hints);

    if (ses.retry && !done) {
      panel.appendChild(U.el('div', { class: 'feedback bad' }, [
        U.R('div', 'verdict', U.T('retry')),
        U.R('div', 'small muted', U.T('retryLeft'), { n: ses.retry.attemptsLeft })
      ]));
    }

    var complete = false;
    if (done && ses.outcome) {
      var o = ses.outcome, good = o.status === 'correct';
      var fb = U.el('div', { class: 'feedback ' + (good ? 'good' : 'bad') });
      fb.appendChild(U.R('div', 'verdict', good ? U.T('explore.correct') : U.T('explore.wrong')));
      fb.appendChild(U.R('div', 'section-title', U.T('correctAnswer')));
      fb.appendChild(U.el('div', { style: { fontWeight: '800', fontSize: '18px' } }, U.rich(o.correctAnswer)));
      fb.appendChild(U.R('div', 'section-title', U.T('explanation')));
      fb.appendChild(U.el('div', { class: 'pre' }, U.rich(o.explanation)));
      panel.appendChild(fb);

      // たどり着いた地点（宝箱・できごと）
      var a = ses.arrival;
      if (a) {
        var arr = U.el('div', { class: 'panel arrival fade-in' });
        arr.appendChild(U.el('div', { class: 'verdict' }, [U.rich(a.node.name), U.rich(U.T('explore.arrived'))]));
        arr.appendChild(nodeRecord(regionId, a.node, { animate: true }));
        if (a.completed) {
          complete = true;
          arr.appendChild(U.el('div', { class: 'verdict good-text' }, [regionName(r), U.rich(U.T('explore.completeTitle'))]));
          arr.appendChild(U.R('div', 'pre', r.completeText, { name: app.state.player.name }));
        }
        main.appendChild(arr);
      }
    }

    var buttons = [U.el('button', { class: 'btn', rich: U.T('explore.backToMap'), on: { click: toMap } })];
    if (done && !complete) {
      var good2 = ses.outcome && ses.outcome.status === 'correct';
      buttons.push(U.el('button', {
        class: 'btn primary', rich: good2 ? U.T('explore.nextChallenge') : U.T('explore.tryAgain'),
        on: { click: function () { newQuestion(ses); U.rerender(); } }
      }));
    }
    main.appendChild(U.el('div', { class: buttons.length > 1 ? 'grid2' : '' }, buttons));
  }

  U.screens.explore = { render: render };
  U.screens.exploreQuiz = { render: renderQuiz };
})(this);
