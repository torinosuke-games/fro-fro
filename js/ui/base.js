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

  function openBuilding(id) {
    var app = FF.app, s = app.state;
    if (id === 'watchtower') {
      // v0.2：完成した見張り塔は探索の入口
      if (FF.exploration.isExploreOpen(s)) { U.show('explore'); return; }
      U.modal({ title: U.T('teaser.watchtower'), body: U.T('teaser.watchtowerLocked') });
      return;
    }
    var bld = s.buildings[id], name = U.buildingName(id);
    var can = B.canUpgrade(s, id);
    var body = U.el('div', { class: 'stack' });
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
        body.appendChild(U.costView(B.upgradeCost(id, bld.level), s.resources));
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
    U.modal({
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

  // ---- 絵の見た目の風景（判断177）：生成した雪原の絵の上に、建物の札（小さな絵・名前・Lv）を重ねる ----
  // 位置は絵の幅・高さに対する割合（札の中心の x、上端の y）。札を押すと、SVG の風景と同じく建物の画面を開く
  var ART_SPOTS = {
    quarry: { x: 24, y: 14 }, watchtower: { x: 88, y: 6 }, lumber: { x: 12, y: 40 },
    furnace: { x: 50, y: 30 }, mine: { x: 85, y: 38 }, housing: { x: 27, y: 58 }, foodhall: { x: 74, y: 58 }
  };
  // ---- レベルで変わる基地の絵（判断180） ----
  // 絵は「全部の建物がそのレベルの姿」の雪原を1枚ずつ（img/art/field_lv1.jpg など。どれも同じ構図）。
  // Lv1 の絵を土台にして、建物ごとに、そのレベルの絵の建物のまわりだけ（ふちをぼかした楕円）を重ねる。
  // 絵のないレベルは、それより低いレベルでいちばん近い絵を使う（今は Lv1 と Lv5 だけ）
  var FIELD_LEVELS = [1, 5];
  // 建物のまわりの楕円（絵に対する %。cx・cy は中心、rx・ry は半径）
  var ART_AREAS = {
    quarry: { cx: 27, cy: 30, rx: 18, ry: 16 }, lumber: { cx: 15, cy: 52, rx: 15, ry: 15 },
    furnace: { cx: 51, cy: 37, rx: 13, ry: 24 }, watchtower: { cx: 72, cy: 15, rx: 8, ry: 17 },
    mine: { cx: 82, cy: 40, rx: 15, ry: 15 }, housing: { cx: 27, cy: 73, rx: 18, ry: 21 },
    foodhall: { cx: 74, cy: 71, rx: 21, ry: 19 }
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
      5: [{ x: 50.8, y: 21, size: 7, puffs: 4, sec: 5, dx: 90 }]        // 中央炉の煙突
    },
    foodhall: {
      5: [{ x: 70.1, y: 51, size: 5, puffs: 3, sec: 4.2, dx: 15 }]      // 家の煙突
    }
  };
  function smokeView(p) {
    var puffs = [];
    for (var i = 0; i < p.puffs; i++) puffs.push(U.el('span', { class: 'puff', style: { animationDuration: p.sec + 's', animationDelay: -(i * p.sec / p.puffs).toFixed(2) + 's' } }));
    var box = U.el('span', { class: 'art-smoke', attrs: { 'aria-hidden': 'true' }, style: { left: p.x + '%', top: p.y + '%', width: p.size + '%' } }, puffs);
    box.style.setProperty('--dx', p.dx + '%');
    return box;
  }
  function artScene(s) {
    var box = U.el('div', { class: 'scene art' });
    box.appendChild(U.artImg('field_lv1', 'scene-art-bg', function () { return FF.svgScene.render(s, openBuilding, FF.app.theme); }));
    Object.keys(ART_AREAS).forEach(function (id) {
      var lv = fieldLevel(shownLevel(s, id));
      if (lv > 1) box.appendChild(layerView(id, lv));
    });
    Object.keys(ART_SMOKE).forEach(function (id) {
      if (s.buildings[id].level < 1) return;
      (ART_SMOKE[id][fieldLevel(shownLevel(s, id))] || []).forEach(function (p) { box.appendChild(smokeView(p)); });
    });
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
      var plainName = FF.util.plainText(name);
      box.appendChild(U.el('button', {
        class: 'art-bld' + (locked ? ' locked' : '') + (building ? ' is-building' : '') + (ready ? ' ready' : ''),
        style: { left: p.x + '%', top: p.y + '%' },
        attrs: { 'aria-label': plainName + (level ? ' Lv' + level : '') + (locked ? ' 🔒' : '') },
        on: { click: function () { openBuilding(id); } }
      }, [
        U.el('span', { class: 'thumb' }, [U.artImg(id, ''), building ? U.el('span', { class: 'mark', text: '🔨' }) : ready ? U.el('span', { class: 'mark up', text: '▲' }) : null]),
        U.el('span', { class: 'nm' }, [U.rich(name), level ? U.el('span', { class: 'lv', text: ' Lv' + level }) : null, locked ? ' 🔒' : null])
      ]));
    });
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

    var head = U.el('div', { class: 'panel' }, [
      U.el('div', { class: 'commander' }, [
        U.R('span', 'label', U.T('commander')),
        U.el('span', { class: 'name', text: s.player.name })
      ]),
      U.R('div', 'greeting', U.T('baseGreeting.' + s.buildings.furnace.level), { name: s.player.name })
    ]);
    main.appendChild(head);

    main.appendChild(U.artOn() ? artScene(s) : U.el('div', { class: 'scene' }, FF.svgScene.render(s, openBuilding, FF.app.theme)));

    collectBar = U.el('div', { class: 'panel collect-bar' });
    main.appendChild(collectBar);
    renderCollect();

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
    onTick: function () { renderCollect(); updateTimers(); }
  };
})(this);
