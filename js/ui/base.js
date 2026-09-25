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
      body.appendChild(U.R('div', 'small muted', U.T('cost')));
      body.appendChild(U.costView(B.upgradeCost(id, bld.level), s.resources));
    }
    if (!can.ok) {
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
    U.toast(U.T('upgradeDone'), { building: U.buildingName(id), level: r.state.buildings[id].level });
    U.rerender();
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

    main.appendChild(U.el('div', { class: 'scene' }, FF.svgScene.render(s, openBuilding)));

    collectBar = U.el('div', { class: 'panel collect-bar' });
    main.appendChild(collectBar);
    renderCollect();

    var list = U.el('div', { class: 'bld-list' });
    ORDER.forEach(function (id) {
      var bld = s.buildings[id], locked = bld.level === 0;
      var ef = effectText(id, bld.level);
      var can = B.canUpgrade(s, id);
      list.appendChild(U.el('button', {
        class: 'bld-card' + (locked ? ' locked' : ''),
        on: { click: function () { openBuilding(id); } }
      }, [
        U.R('span', 'nm', U.buildingName(id)),
        U.el('span', { class: 'lv', text: locked ? '🔒' : 'Lv' + bld.level }),
        U.el('span', { class: 'ef' }, locked
          ? U.rich(U.T('reason.locked'), { level: B.unlockLevel(id) })
          : [U.rich(ef[0], ef[1]), can.ok ? U.el('span', { class: 'ready' }, ['  ▲ ', U.rich(U.T('upgrade'))]) : null,
            B.isStorageFull(s, id, now) ? U.el('span', { class: 'notice' }, ['  ', U.rich(U.T('storageFull'))]) : null])
      ]));
    });
    main.appendChild(list);

    setTimeout(showUnlockNotices, 100);
  }

  U.screens.base = {
    render: render,
    onTick: renderCollect
  };
})(this);
