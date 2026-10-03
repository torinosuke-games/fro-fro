// 基地画面：風景・建物・強化・生産物の受け取り・解放のお知らせ（SPEC 第9章）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var B = FF.buildings;
  var ORDER = ['furnace', 'housing', 'lumber', 'mine', 'quarry', 'foodhall'];
  var collectBar = null;

  function effectText(id, level) {
    if (level <= 0) return null;
    if (id === 'furnace') return [U.T('effectFurnace'), { level: level }];
    if (id === 'housing') return [U.T('effectHousing'), { hours: B.storageHours(level) }];
    return [U.T('effectProducer'), {
      rate: B.productionPerHour(level),
      bonus: Math.round((FF.rewards.facilityMultiplier(level) - 1) * 100)
    }];
  }

  // ---- 強化の待ち時間（SPEC_v0.3 3章） ----
  // {time} を、ふりがなの記法入りの残り時間に置き換える（変数で入れた文字には ふりがなが付かないため）
  function withTime(template, ms) { return template.replace('{time}', FF.util.formatDurationMarkup(ms)); }
  // 「Lv◯まで あと ◯分」。1秒ごとに updateTimers で書き換える
  function remainingView(id, state, now) {
    var c = B.constructionOf(state, id);
    return U.el('span', { class: 'ct-left', attrs: { 'data-id': id } },
      U.rich(withTime(U.T('constructUntil'), B.constructionRemainingMs(state, id, now)), { level: c.toLevel }));
  }
  function updateTimers() {
    var app = FF.app, now = app.now();
    Array.prototype.forEach.call(document.querySelectorAll('.ct-left'), function (node) {
      var id = node.getAttribute('data-id'), c = B.constructionOf(app.state, id);
      if (!c) return;
      U.clear(node);
      node.appendChild(U.rich(withTime(U.T('constructUntil'), B.constructionRemainingMs(app.state, id, now)), { level: c.toLevel }));
    });
  }

  function pendingView(state, now) {
    var p = B.pendingAll(state, now);
    var items = Object.keys(p).filter(function (r) { return p[r] > 0; });
    if (!items.length) return U.R('span', 'pend', U.T('collectNone'));
    return U.el('span', { class: 'pend' }, [U.R('span', '', U.T('pending')), ' '].concat(items.map(function (r) {
      return U.resDef(r).icon + ' ' + U.fmt(p[r]) + '  ';
    })));
  }

  function renderCollect() {
    if (!collectBar) return;
    var app = FF.app, now = app.now();
    U.clear(collectBar);
    var p = B.pendingAll(app.state, now);
    var any = Object.keys(p).some(function (r) { return p[r] > 0; });
    collectBar.appendChild(pendingView(app.state, now));
    collectBar.appendChild(U.el('button', { class: 'btn ice small', rich: U.T('collect'), disabled: !any, on: { click: collect } }));
  }

  function collect() {
    var app = FF.app;
    var r = B.collectAll(app.state, app.now());
    var got = Object.keys(r.collected);
    if (!got.length) { U.toast(U.T('collectNone')); return; }
    app.commit(r.state);
    U.toast(U.T('collected') + '：' + got.map(function (k) { return U.resDef(k).icon + ' +' + U.fmt(r.collected[k]); }).join('  '));
    U.rerender();
  }

  // ---- 基地の絵の上の受け取り（判断196）：建物の上の吹き出し（1つずつ）と、絵の右下のかご（まとめて） ----
  // 収穫のアイコンを付ける建物（名札の右上に小さく重ねる。判断197）
  var ART_BUBBLES = { lumber: true, mine: true, quarry: true, foodhall: true };
  var bubbleEls = {}, basketEl = null;
  function producerOf(id) { return FF.defs.BUILDINGS.filter(function (d) { return d.id === id; })[0]; }
  function bubbleView(id) {
    var r = U.resDef(producerOf(id).produces);
    var b = U.el('button', {
      class: 'art-bubble', attrs: { hidden: '', 'aria-label': FF.util.plainText(U.T('collectOne'), { name: r.name }) },
      on: { click: function (e) { e.stopPropagation(); collectOneArt(id); } }
    }, U.resIcon(r));
    bubbleEls[id] = b;
    return b;
  }
  function basketView() {
    basketEl = U.el('button', {
      class: 'art-basket', attrs: { hidden: '', 'aria-label': FF.util.plainText(U.T('collectAllArt')) },
      on: { click: function (e) { e.stopPropagation(); collectAllArt(); } }
    }, [U.el('span', { class: 'ico', attrs: { 'aria-hidden': 'true' }, text: '🧺' }), U.el('span', { class: 'badge-n' })]);
    return basketEl;
  }
  // 貯まっている建物だけアイコンを出す（8割以上は金色のふちで小さくはずむ）。画面を作り直さずに毎秒ここだけ直す
  function updateBubbles() {
    if (!basketEl || !document.body.contains(basketEl)) return;
    var s = FF.app.state, now = FF.app.now(), n = 0;
    Object.keys(bubbleEls).forEach(function (id) {
      var b = bubbleEls[id], amount = B.pendingProduction(s, id, now);
      if (amount <= 0) { b.hidden = true; return; }
      n++;
      var ratio = B.storageRatio(s, id, now);
      b.hidden = false;
      b.classList.toggle('full', ratio >= 0.8);
    });
    basketEl.hidden = n === 0;
    basketEl.querySelector('.badge-n').textContent = n;
  }
  // 受け取った資源の絵を、上のバーの資源の欄へ飛ばす（動きを減らす設定では飛ばさない）
  function afterCollectArt(r, ids) {
    var got = Object.keys(r.collected);
    if (!got.length) { U.toast(U.T('collectNone')); return; }
    var jobs = ids.filter(function(id){return r.collected[producerOf(id).produces];}).map(function(id){return {key:producerOf(id).produces,source:bubbleEls[id] && bubbleEls[id].querySelector('img, .ico')};});
    var arrive = FF.rewardFlight.prepare(r.collected);
    FF.rewardFlight.fly(jobs, arrive);
    FF.app.commit(r.state);
    U.toast(U.T('collected') + '：' + got.map(function (k) { return U.resDef(k).icon + ' +' + U.fmt(r.collected[k]); }).join('  '));
    updateBubbles();
  }
  function collectOneArt(id) { afterCollectArt(B.collectOne(FF.app.state, id, FF.app.now()), [id]); }
  function collectAllArt() { afterCollectArt(B.collectAll(FF.app.state, FF.app.now()), Object.keys(bubbleEls)); }

  function openBuilding(id) {
    var app = FF.app, s = app.state;
    if (id === 'watchtower') {
      // v0.2：完成した見張り塔は探索の入口
      if (FF.exploration.isExploreOpen(s)) { U.show('explore'); return; }
      var tb = U.el('div', { class: 'stack' });
      if (U.artOn()) tb.appendChild(buildingArt('watchtower', 1, true));
      tb.appendChild(U.R('div', 'pre', U.T('teaser.watchtowerLocked')));
      U.modal({ title: U.T('teaser.watchtower'), body: tb });
      return;
    }
    var bld = s.buildings[id], name = U.buildingName(id);
    var can = B.canUpgrade(s, id);
    var body = U.el('div', { class: 'stack' });
    if (U.artOn()) body.appendChild(buildingArt(id, shownLevel(s, id), bld.level === 0));   // 名前の下に、今のレベルの姿（判断186）
    body.appendChild(U.R('div', 'small', U.T('buildingInfo.' + id)));
    var cur = effectText(id, bld.level);
    if (cur) body.appendChild(U.el('div', { class: 'badge' }, U.rich(cur[0], cur[1])));
    if (bld.level > 0 && bld.level < FF.balance.MAX_LEVEL) {
      var nx = effectText(id, bld.level + 1);
      body.appendChild(U.R('div', 'section-title', U.T('nextLevel')));
      if (nx) body.appendChild(U.el('div', { class: 'small muted' }, U.rich(nx[0], nx[1])));
      // 工事中は資源を払い終えているので、必要な資源と工事の時間は出さない
      if (!bld.construction) {
        body.appendChild(U.R('div', 'small muted', U.T('cost')));
        var cost = B.upgradeCost(id, bld.level);
        body.appendChild(U.costView(cost, s.resources, studyFor));
        var anyShort = Object.keys(cost).some(function (r) { return (s.resources[r] || 0) < cost[r]; });
        if (anyShort) body.appendChild(U.R('div', 'small muted', U.T('shortTapHint')));
        body.appendChild(U.R('div', 'small muted', withTime(U.T('buildTime'), B.buildDurationMs(id, bld.level + 1))));
      }
    }
    if (bld.construction) {
      body.appendChild(U.el('div', { class: 'notice constructing' }, [
        '🔨 ', U.rich(U.T('constructing')), '　', remainingView(id, s, app.now())
      ]));
    } else if (!can.ok) {
      var reasonVars = { level: can.unlockAt };
      body.appendChild(U.R('div', 'notice', U.T('reason.' + can.reason), reasonVars));
    }
    // 足りない資源を押すと、学ぶの画面へ。資源だけを選び、教科・学年・出題形式は未選択にする（判断187）
    function studyFor(r) {
      if (closeModal) closeModal();
      app.studySel = { resource: r, subject: null, grade: null, difficulty: FF.learning.RANDOM_DIFFICULTY, answerType: null, pickGrade: true };
      app.studyTab = 'learn';
      U.show('study', { tab: 'learn', resource: r });
    }
    var closeModal = U.modal({
      title: name + (bld.level > 0 ? '  Lv' + bld.level : ''),
      body: body,
      buttons: [
        { label: U.T('back'), class: 'ghost' },
        can.ok ? { label: U.T('upgrade'), class: 'primary', onClick: function () { doUpgrade(id); } } : null
      ].filter(Boolean)
    });
  }

  function doUpgrade(id) {
    var app = FF.app;
    var r = B.upgrade(app.state, id, app.now());
    if (!r.ok) { U.toast(U.T('reason.' + r.reason)); return; }
    app.commit(r.state);
    if (r.completed.length) U.toast(U.T('upgradeDone'), { building: U.buildingName(id), level: r.toLevel });
    else U.toast(withTime(U.T('upgradeStarted'), r.endsAt - app.now()), { building: U.buildingName(id), level: r.toLevel });
    U.rerender();
  }

  // ---- 絵の見た目の風景（判断177・181）：生成した雪原の絵の上に、建物の名札（名前・Lv）を重ねる ----
  // 名札は建物の絵に重ならないよう、建物のすぐ下などの空いた地面に置く（位置は絵に対する %。x は名札の中心、y は上端）。
  // 建物の絵そのもの（ART_AREAS の楕円の内側の四角）も押せる。どちらを押しても、SVG の風景と同じく建物の画面を開く
  var ART_SPOTS = {
    quarry: { x: 31, y: 44 }, watchtower: { x: 72, y: 29 }, lumber: { x: 13, y: 59 },
    furnace: { x: 51, y: 59 }, mine: { x: 86, y: 56 }, housing: { x: 29, y: 87 }, foodhall: { x: 73, y: 86 }
  };

  // ---- レベルで変わる基地の絵（判断180） ----
  // 絵は「全部の建物がそのレベルの姿」の雪原を1枚ずつ（img/art/field_lv1.jpg など。どれも同じ構図）。
  // Lv1 の絵を土台にして、建物ごとに、そのレベルの絵の建物のまわりだけ（ふちをぼかした楕円）を重ねる。
  // 絵のないレベルは、それより低いレベルでいちばん近い絵を使う（Lv1〜10 の絵がある。Lv6〜10 は最大レベルを上げたときのため。判断185）
  var FIELD_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // 建物のまわりの楕円（絵に対する %。cx・cy は中心、rx・ry は半径）
  var ART_AREAS = {
    quarry: { cx: 27, cy: 30, rx: 18, ry: 16 }, lumber: { cx: 15, cy: 52, rx: 15, ry: 15 },
    furnace: { cx: 51, cy: 37, rx: 13, ry: 24 }, watchtower: { cx: 72, cy: 15, rx: 8, ry: 17 },
    mine: { cx: 82, cy: 40, rx: 15, ry: 15 }, housing: { cx: 27, cy: 73, rx: 18, ry: 21 },
    foodhall: { cx: 74, cy: 73, rx: 21, ry: 20 }
  };
  function fieldLevel(level) {
    var best = FIELD_LEVELS[0];
    FIELD_LEVELS.forEach(function (l) { if (l <= level) best = l; });
    return best;
  }
  // 絵の上での建物の姿のレベル。まだ使えない建物は Lv1 の絵（建てる前の姿）。見張り塔は探索が開いたら完成した姿
  function shownLevel(s, id) {
    if (id === 'watchtower') return FF.exploration.isExploreOpen(s) ? 5 : 1;
    return Math.max(1, s.buildings[id].level);
  }
  // 建物の画面に出す小さな絵（判断186）：そのレベルの雪原の絵から、建物のまわりの四角（ART_CROPS。絵に対する %。
  // どのレベルの姿も入るように広めにとる）を切り出し、高さ ART_CROP_PX にそろえる。絵は CSS の背景。まだ使えない建物は薄い灰色
  var ART_CROPS = {
    quarry: { x: 5, y: 8, w: 42, h: 40 }, lumber: { x: 0, y: 33, w: 30, h: 39 }, furnace: { x: 34, y: 16, w: 32, h: 48 },
    watchtower: { x: 60, y: 2, w: 26, h: 34 }, mine: { x: 58, y: 22, w: 42, h: 38 }, housing: { x: 3, y: 55, w: 39, h: 44 },
    foodhall: { x: 52, y: 50, w: 44, h: 46 }
  };
  var FIELD_ASPECT = 960 / 644, ART_CROP_PX = 150;   // img/art/field_lv*.jpg の横 / 縦、切り出した絵の高さ
  function buildingArt(id, lv, locked) {
    var c = ART_CROPS[id];
    var box = U.el('div', { class: 'bld-art' + (locked ? ' locked' : ''), attrs: { 'aria-hidden': 'true' } });
    box.style.backgroundImage = 'url("' + FF.config.ART_DIR + 'field_lv' + fieldLevel(lv) + '.jpg")';
    box.style.backgroundSize = (10000 / c.w) + '% ' + (10000 / c.h) + '%';
    box.style.backgroundPosition = (c.x / (100 - c.w) * 100) + '% ' + (c.y / (100 - c.h) * 100) + '%';
    box.style.width = Math.round(ART_CROP_PX * c.w * FIELD_ASPECT / c.h) + 'px';
    box.style.height = ART_CROP_PX + 'px';
    return box;
  }
  function layerView(id, lv) {
    var a = ART_AREAS[id];
    var mask = 'radial-gradient(' + a.rx + '% ' + a.ry + '% at ' + a.cx + '% ' + a.cy + '%, #000 72%, transparent 100%)';
    var img = U.artImg('field_lv' + lv, 'scene-art-layer');
    img.style.webkitMaskImage = mask;
    img.style.maskImage = mask;
    return img;
  }

  // 動く煙（判断179・180）：絵に描いてある煙突・たき火の位置（絵に対する %）から、白い粒を少しずつずらして上げる。
  // 絵のレベルごとに位置が違うので、建物 → 絵のレベル → 煙の出どころ（複数可）の表にする。
  // size は粒の大きさ（絵の幅に対する %）、puffs は粒の数、sec は1つの粒が消えるまでの秒数、dx は横に流れる量。
  // 建物が使えるとき（Lv1 以上）だけ出す
  var ART_SMOKE = {
    furnace: {
      1: [{ x: 49.3, y: 49, size: 4, puffs: 3, sec: 3.6, dx: 40 }],     // たき火
      2: [{ x: 49.8, y: 50, size: 4.5, puffs: 3, sec: 3.8, dx: 45 }],  // 石で囲んだたき火
      3: [{ x: 50, y: 46, size: 5, puffs: 3, sec: 4.2, dx: 60 }],      // 石のかまどの上
      4: [{ x: 52, y: 33, size: 6, puffs: 4, sec: 4.6, dx: 75 }],      // 短い煙突
      5: [{ x: 50.8, y: 21, size: 7, puffs: 4, sec: 5, dx: 90 }],       // 中央炉の煙突
      6: [{ x: 51.2, y: 21, size: 7, puffs: 4, sec: 5, dx: 90 }],
      7: [{ x: 51.2, y: 18, size: 7, puffs: 4, sec: 5, dx: 90 }],       // 煙突の上の囲い
      8: [{ x: 51.2, y: 21, size: 7, puffs: 4, sec: 5, dx: 90 }],
      9: [{ x: 51.2, y: 21, size: 7.5, puffs: 4, sec: 5, dx: 90 }],
      10: [{ x: 51.2, y: 21.5, size: 7.5, puffs: 4, sec: 5, dx: 90 }]
    },
    foodhall: {
      5: [{ x: 71.0, y: 58, size: 4, puffs: 3, sec: 4.2, dx: 15 }],     // 食料庫の煙突
      6: [{ x: 71.0, y: 58, size: 4, puffs: 3, sec: 4.2, dx: 15 }]      // Lv7 からは煙突がない
    }
  };
  function smokeView(p) {
    var puffs = [];
    for (var i = 0; i < p.puffs; i++) puffs.push(U.el('span', { class: 'puff', style: { animationDuration: p.sec + 's', animationDelay: -(i * p.sec / p.puffs).toFixed(2) + 's' } }));
    var box = U.el('span', { class: 'art-smoke', attrs: { 'aria-hidden': 'true' }, style: { left: p.x + '%', top: p.y + '%', width: p.size + '%' } }, puffs);
    box.style.setProperty('--dx', p.dx + '%');
    return box;
  }
  // 行き来する人（判断194・195）：中央炉と各建物のあいだの道を、町の人がゆっくり行って戻る（煙と同じく CSS のアニメーション）。
  // 人は生成した絵（img/art/villager-*.png。1回の生成で8人を描かせて切り分けた）。道は絵に対する %（a → m → b）。
  // 行った先・戻った先で立ち止まる。その建物が使えるとき（Lv1 以上）だけ歩き、Lv3 以上なら2人（別の人・ずらして）。
  // 街が発展するほど人が増える ＝ 救われた生存者（STORY.md）
  var ART_WALKS = [
    { id: 'housing', a: [30, 86], m: [38, 72], b: [46, 62], sec: 96, who: ['elder', 'child'] },
    { id: 'mine', a: [54, 60], m: [68, 55], b: [81, 51], sec: 110, who: ['miner', 'smith'] },
    { id: 'lumber', a: [44, 60], m: [32, 58], b: [19, 62], sec: 104, who: ['lumberjack', 'hunter'] },
    { id: 'foodhall', a: [52, 64], m: [58, 74], b: [65, 82], sec: 88, who: ['cook', 'child'] },
    { id: 'quarry', a: [46, 56], m: [40, 49], b: [33, 45], sec: 92, who: ['mason', 'smith'] }
  ];
  function walkerView(w, k) {
    var i = ART_WALKS.indexOf(w);
    var el = U.el('span', { class: 'art-walker', attrs: { 'aria-hidden': 'true' } },
      U.artImg('villager-' + w.who[k] + '.png', 'vg', function () { return U.el('span'); }));
    var st = el.style, ym = w.m[1];
    [['--x1', w.a[0]], ['--y1', w.a[1]], ['--xm', w.m[0]], ['--ym', w.m[1]], ['--x2', w.b[0]], ['--y2', w.b[1]]].forEach(function (v) { st.setProperty(v[0], v[1] + '%'); });
    st.setProperty('--dir', w.b[0] >= w.a[0] ? 1 : -1);              // 絵は右向き。行きの向きに合わせる
    st.width = (2.3 * (0.7 + ym / 100 * 0.6)).toFixed(2) + '%';      // 手前（下）ほど大きく
    var sec = w.sec + k * 13;                                         // 2人目は少し遅く、同じ動きに見えないように
    st.animationDuration = sec + 's';
    st.animationDelay = -((k * 0.55 + i * 0.21) % 1 * sec).toFixed(1) + 's';
    return el;
  }
  function artScene(s) {
    var box = U.el('div', { class: 'scene art' });
    box.appendChild(U.artImg('field_lv1', 'scene-art-bg', function () { return FF.svgScene.render(s, openBuilding, FF.app.theme); }));
    Object.keys(ART_AREAS).forEach(function (id) {
      var lv = fieldLevel(shownLevel(s, id));
      if (lv > 1) box.appendChild(layerView(id, lv));
    });
    ART_WALKS.forEach(function (w) {
      var lv = s.buildings[w.id].level;
      if (lv < 1) return;
      box.appendChild(walkerView(w, 0));
      if (lv >= 3) box.appendChild(walkerView(w, 1));
    });
    Object.keys(ART_SMOKE).forEach(function (id) {
      if (s.buildings[id].level < 1) return;
      (ART_SMOKE[id][fieldLevel(shownLevel(s, id))] || []).forEach(function (p) { box.appendChild(smokeView(p)); });
    });
    var labels = [];
    bubbleEls = {};
    Object.keys(ART_SPOTS).forEach(function (id) {
      var p = ART_SPOTS[id], name, level = 0, locked, building = false, ready = false;
      if (id === 'watchtower') {
        name = FF.texts.teaser.watchtower;
        locked = !FF.exploration.isExploreOpen(s);
      } else {
        name = U.buildingName(id);
        level = s.buildings[id].level;
        locked = level === 0;
        building = !!s.buildings[id].construction;
        ready = !locked && B.canUpgrade(s, id).ok;
      }
      var plainName = FF.util.plainText(name), label = plainName + (level ? ' Lv' + level : '') + (locked ? ' 🔒' : '');
      var ar = ART_AREAS[id];
      // 建物の絵の上の押せる場所（見た目はなし。キーボードでは名札のほうを使う）
      box.appendChild(U.el('button', {
        class: 'art-hit', attrs: { tabindex: '-1', 'aria-hidden': 'true' },
        style: { left: (ar.cx - ar.rx * 0.6) + '%', top: (ar.cy - ar.ry * 0.6) + '%', width: (ar.rx * 1.2) + '%', height: (ar.ry * 1.2) + '%' },
        on: { click: function () { openBuilding(id); } }
      }));
      var lab = U.el('button', {
        class: 'art-bld' + (locked ? ' locked' : '') + (building ? ' is-building' : '') + (ready ? ' ready' : ''),
        attrs: { 'aria-label': label },
        on: { click: function () { openBuilding(id); } }
      }, [
        U.el('span', { class: 'nm' }, [
          U.rich(name), level ? U.el('span', { class: 'lv', text: ' Lv' + level }) : null, locked ? ' 🔒' : null,
          building ? U.el('span', { class: 'mark', text: ' 🔨' }) : ready ? U.el('span', { class: 'mark up', text: ' ▲' }) : null
        ]),
        building ? U.el('span', { class: 'map-construction' }, [
          U.R('span', 'construction-label', U.T('constructing')), remainingView(id, s, FF.app.now())
        ]) : null
      ]);
      // 名札と、その右上に小さく重ねる収穫のアイコン（生産施設だけ。判断196・197）
      labels.push(U.el('span', { class: 'art-tag', style: { left: p.x + '%', top: p.y + '%' } }, [lab, ART_BUBBLES[id] ? bubbleView(id) : null]));
    });
    labels.forEach(function (l) { box.appendChild(l); });   // 名札は押せる場所より上に
    box.appendChild(basketView());
    return box;
  }

  // 解放のお知らせを1つずつ出す。中央炉のお知らせのあとに、探索の地域のお知らせ（v0.2）
  function showUnlockNotices() {
    var app = FF.app;
    var list = B.pendingUnlockNotices(app.state);
    if (document.querySelector('.overlay')) return;
    if (!list.length) { if (U.showExploreNotices) U.showExploreNotices(); return; }
    var u = list[0];
    U.modal({
      title: U.T('unlockTitle'),
      body: U.T('unlockNotice.' + u.id),
      vars: { name: app.state.player.name },
      buttons: [{
        label: U.T('ok'), class: 'primary', onClick: function () {
          var st = B.markUnlockNoticeSeen(app.state, u.id);
          // 見張り塔のお知らせは「雪原に出られる」も伝えるので、雪原のお知らせは重ねて出さない
          if (u.id === 'watchtower') st = B.markUnlockNoticeSeen(st, 'explore_snowfield');
          app.commit(st);
          setTimeout(showUnlockNotices, 50);
        }
      }]
    });
  }

  function render(main) {
    var app = FF.app, s = app.state, now = app.now();

    var text = U.el('div', { class: 'head-text' }, [
      U.el('div', { class: 'commander' }, [
        U.R('span', 'label', U.T('commander')),
        U.el('span', { class: 'name', text: s.player.name })
      ]),
      U.R('div', 'greeting', U.T('baseGreeting.' + s.buildings.furnace.level), { name: s.player.name })
    ]);
    // 主人公の絵（判断198）：選んでいれば名前の左に。押すと設定で変えられる
    var face = U.artOn() && s.player.avatar ? U.el('button', {
      class: 'head-avatar', attrs: { 'aria-label': FF.util.plainText(U.T('settingsAvatar')) }, on: { click: function () { U.show('settings'); } }
    }, U.artImg('avatar-' + s.player.avatar + '.jpg', '', function () { return U.el('span'); })) : null;
    var head = U.el('div', { class: 'panel' + (face ? ' head-with-avatar' : '') }, [face, text]);
    main.appendChild(head);

    main.appendChild(U.artOn() ? artScene(s) : U.el('div', { class: 'scene' }, FF.svgScene.render(s, openBuilding, FF.app.theme)));

    // 絵の見た目では「生産物」の行を出さず、絵の上の吹き出しとかごで受け取る（判断196）
    if (U.artOn()) { collectBar = null; updateBubbles(); }
    else {
      collectBar = U.el('div', { class: 'panel collect-bar' });
      main.appendChild(collectBar);
      renderCollect();
    }

    // 絵の見た目では、学習への大きなボタンを風景の下に置く（見本の画面に合わせる。判断177）
    if (U.artOn()) main.appendChild(U.el('button', { class: 'btn primary base-cta', rich: U.T('baseStudyCta'), on: { click: function () { U.show('study'); } } }));

    var list = U.el('div', { class: 'bld-list' });
    ORDER.forEach(function (id) {
      var bld = s.buildings[id], locked = bld.level === 0;
      var ef = effectText(id, bld.level);
      var can = B.canUpgrade(s, id);
      list.appendChild(U.el('button', {
        class: 'bld-card' + (locked ? ' locked' : '') + (bld.construction ? ' is-building' : ''),
        on: { click: function () { openBuilding(id); } }
      }, [
        U.R('span', 'nm', U.buildingName(id)),
        U.el('span', { class: 'lv', text: locked ? '🔒' : 'Lv' + bld.level }),
        U.el('span', { class: 'ef' }, locked
          ? U.rich(U.T('reason.locked'), { level: B.unlockLevel(id) })
          : [U.rich(ef[0], ef[1]), can.ok ? U.el('span', { class: 'ready' }, ['  ▲ ', U.rich(U.T('upgrade'))]) : null,
            bld.construction ? U.el('span', { class: 'constructing' }, ['🔨 ', U.rich(U.T('constructing')), ' ', remainingView(id, s, now)]) : null,
            B.isStorageFull(s, id, now) ? U.el('span', { class: 'notice' }, ['  ', U.rich(U.T('storageFull'))]) : null])
      ]));
    });
    main.appendChild(list);

    setTimeout(showUnlockNotices, 100);
  }

  U.screens.base = {
    render: render,
    onTick: function () { renderCollect(); updateBubbles(); updateTimers(); }
  };
})(this);
