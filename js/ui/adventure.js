// 雪原の冒険の画面。既存の問題バンク・保存・図の表示を使う。
(function (root) {
  'use strict';
  var FF = root.FF, A = FF.adventure, U = FF.ui, T = FF.texts.adventure, B = FF.balance.ADVENTURE;
  var E = U.el, moving = false, routeId = 0, entering = false, overview = false, orders = {}, orderKey = null, actor = null, submenu = null, impact = 0, received = {}, sequence = null;
  var C = T.scenery, scene = FF.adventureScene;
  var beforeShow = FF.renewalBeforeShow;
  FF.renewalBeforeShow = function (screen, params) { routeId++; moving = false; sequence = null; if (screen !== 'adventure') { orderKey = null; submenu = null; } if (screen === 'adventureParty' && FF.app.screen === 'base') { ensure(); save(A.depart(p(), 'home')); } if (beforeShow) beforeShow(screen, params); };
  function p() { return FF.app.state.adventure || A.create(); }
  function save(next) { FF.app.commit(Object.assign({}, FF.app.state, { adventure: next })); }
  function ensure() { if (!p().started) { var n = FF.util.clone(p()); n.started = true; save(n); } }
  function name(id) { return id === 'hero' ? FF.app.state.player.name : T.members[id].name; }
  function text(tag, cls, value) { return E(tag, { class: cls, rich: value }); }
  function btn(label, action, cls, disabled) { return E('button', { class: 'adv-button ' + (cls || ''), text: label, disabled: disabled, attrs: { type: 'button' }, on: { click: action } }); }
  function paint() {
    var main = root.document.getElementById('screen');
    // Keep the decoded background and enemy mounted throughout a battle.
    if (FF.app.screen === 'adventure' && p().battle && main.querySelector('.adv-rpg-shell')) renderBattle(main);
    else U.rerender();
  }
  function change(next) {
    var before = p(); if (next === before) return;
    impact = before.battle && before.battle.phase === 'explanation' && next.battle ? Math.max(0, before.battle.hp - next.battle.hp) : 0;
    if (before.battle && before.battle.phase === 'explanation' && next.battle) {
      sequence = {enemy:next.battle.enemy,turn:next.battle.turn,hp:before.battle.hp,events:next.battle.log.slice(),index:0};
      impact = 0;
    }
    received = {};
    if (before.battle && before.battle.phase === 'playerAction') next.party.forEach(function(id) { var loss = before.roster[id].hp - next.roster[id].hp; if (loss > 0) received[id] = loss; });
    save(next); paint();
    if (before.battle || next.battle) root.scrollTo(0, 0);
  }
  function open() { ensure(); U.show('adventure'); }
  function departHome() { ensure(); save(A.depart(p(), 'home')); open(); }
  function home() { routeId++; moving = false; orderKey = null; save(A.depart(p(), 'home')); U.show('base'); }
  function grade() { return FF.app.state.player.grade || 1; }
  function header(main, title, subtitle) {
    main.appendChild(E('header', { class: 'adv-heading' }, [E('div', {}, [text('p', 'adv-eyebrow', 'FROZEN FRONTIER · 冒険の試作'), text('h1', '', title), text('p', 'adv-subtitle', subtitle)]), btn(T.back, home, 'quiet')]));
  }
  function meter(value, max, cls, label) { return E('div', { class: 'adv-meter ' + cls, attrs: { role: 'progressbar', 'aria-label': label, 'aria-valuenow': value, 'aria-valuemax': max, 'aria-valuemin': 0 } }, E('span', { style: { width: (100 * value / max) + '%' } })); }
  function member(id, compact) {
    var d = T.members[id], r = p().roster[id], s = A.stats(id, r.xp);
    return E('article', { class: 'adv-member ' + (compact ? 'compact ' : '') + (!r.hp ? 'is-down' : ''), style: { '--member-color': d.color }, attrs: { 'data-member': id } }, [
      E('div', { class: 'adv-portrait' }, FF.adventureArt(id, true)), E('div', { class: 'adv-member-info' }, [
        E('div', { class: 'adv-member-title' }, [text('strong', '', name(id)), E('span', { class: 'adv-level', text: 'Lv.' + s.level })]),
        !compact ? text('p', 'adv-role', d.role) : null,
        E('div', { class: 'adv-vital', text: 'HP ' + r.hp + ' / ' + s.hp + (!r.hp ? ' · ' + T.down : '') }), meter(r.hp, s.hp, 'hp', name(id) + ' HP'),
        E('div', { class: 'adv-vital', text: 'MP ' + r.mp + ' / ' + s.mp }), meter(r.mp, s.mp, 'mp', name(id) + ' MP')
      ])
    ]);
  }
  function team() { return E('div', { class: 'adv-team' }, p().party.map(function (id) { return member(id, true); })); }
  function setting(label, choices, value, onChange) {
    var select = E('select', { attrs: { 'aria-label': label }, on: { change: function () { onChange(select.value); } } }, choices.map(function (c) { return E('option', { value: c.id, text: c.name }); }));
    select.value = value;
    return E('label', { class: 'adv-select' }, [text('span', '', label), select]);
  }
  function settings() {
    return E('div', { class: 'adv-settings' }, [
      setting(T.learning + '（' + (FF.defs.GRADES.find(function (g) { return g.level === grade(); }) || {}).school + '）', FF.defs.SUBJECTS.map(function (s) { return { id: s.id, name: U.plain((s.nameByGrade || []).find(function (v) { return grade() >= v.from && grade() <= v.to; })?.name || s.name) }; }), p().subject, function (v) { var n = FF.util.clone(p()); n.subject = v; save(n); }),
      setting(T.difficulty, [{ id: 'basic', name: '基礎' }, { id: 'standard', name: '標準' }, { id: 'advanced', name: '発展' }], p().difficulty, function (v) { var n = FF.util.clone(p()); n.difficulty = v; save(n); })
    ]);
  }
  U.adventureEntry = function () {
    scene.preload(FF.app.state.player.avatar);
    return E('section', { class: 'adv-entry' }, [
      E('div', { class: 'adv-entry-symbol', attrs: { 'aria-hidden': true }, text: '✦' }),
      E('div', {}, [text('small', '', T.subtitle), text('h2', '', T.title), text('p', '', T.entry)]),
      btn(p().started ? T.resume : T.start, departHome, 'gold')   // 編成・持ち物は、下のナビから（判断361）
    ]);
  };
  // ---- 持ち物と装備（判断359） ----
  var SH = FF.shop, I = T.inv, invTab = 'weapon';
  function itemDef(kind, id) { return (kind === 'armor' ? FF.defs.ARMORS : FF.defs.WEAPONS).filter(function (x) { return x.id === id; })[0] || null; }
  function itemMarkup(kind, id) { var d = itemDef(kind, id); return d ? d.icon + ' ' + d.name : ''; }
  function itemPlain(kind, id) { var d = itemDef(kind, id); return d ? U.plain(d.name) : ''; }
  function itemPower(kind, id) {
    if (kind === 'armor') return I.defense.replace('{n}', SH.astats(id).defense);
    var dmg = SH.stats(id).damage; return I.power.replace('{n}', dmg).replace('{b}', dmg - SH.stats(FF.balance.DEFAULT_WEAPON).damage);
  }
  function gearBonus(id) { var s = FF.app.state; return { attack: SH.weaponBonus(s, id), defense: SH.armorDefense(s, id) }; }
  function squadIds() { return ['hero'].concat(p().recruited); }
  function gearDone(next, message) { FF.app.commit(next); if (message) U.toast(message); U.rerender(); }
  // 装備する。ほかの人が装備中なら、確認のメッセージを出す
  function equipFlow(memberId, kind, itemId) {
    var r = SH.equip(FF.app.state, memberId, kind, itemId), vars = { item: itemPlain(kind, itemId), member: name(memberId) };
    if (r.ok) { gearDone(r.state, U.plain(I.doneEquip.replace('{member}', vars.member).replace('{item}', vars.item))); return; }
    if (r.reason !== 'inUse') return;
    vars.holder = name(r.holder);
    U.modal({ title: I.confirmTitle, body: I.confirm, vars: vars, buttons: [
      { label: I.yes, class: 'primary', onClick: function () { var r2 = SH.equip(FF.app.state, memberId, kind, itemId, { force: true }); if (r2.ok) gearDone(r2.state, U.plain(I.doneEquip.replace('{member}', vars.member).replace('{item}', vars.item))); } },
      { label: I.cancel, class: 'ghost' }
    ] });
  }
  function removeGear(memberId, kind) {
    var cur = SH.equippedOf(FF.app.state, memberId)[kind], r = SH.unequip(FF.app.state, memberId, kind);
    if (r.ok && cur) gearDone(r.state, U.plain(I.doneRemove.replace('{member}', name(memberId)).replace('{item}', itemPlain(kind, cur))));
  }
  function holderBadge(kind, itemId) {
    var h = SH.holder(FF.app.state, kind, itemId);
    if (!h) return E('span', { class: 'inv-holder is-nobody', rich: I.nobody });
    return E('span', { class: 'inv-holder' }, [E('span', { class: 'adv-portrait inv-holder-icon' }, FF.adventureArt(h, true)), E('span', { rich: I.equippedBy }), text('strong', '', name(h))]);
  }
  // ある人の、武器（防具）を選ぶ
  function openPicker(memberId, kind) {
    var s = FF.app.state, cur = SH.equippedOf(s, memberId)[kind], close = null;
    var list = E('div', { class: 'inv-pick-list' }, SH.owned(s, kind).map(function (id) {
      var h = SH.holder(s, kind, id);
      return E('button', { class: 'rn-button inv-pick' + (id === cur ? ' is-current' : ''), attrs: { type: 'button', 'data-item': id }, on: { click: function () { close(); equipFlow(memberId, kind, id); } } }, [
        E('strong', { rich: itemMarkup(kind, id) }), E('small', { rich: itemPower(kind, id) }),
        E('small', { class: 'inv-pick-holder', text: h && h !== memberId ? U.plain(I.equippedBy) + name(h) : (id === cur ? '◎' : '') })
      ]);
    }));
    var buttons = [{ label: U.T('back'), class: 'ghost' }];
    if (cur) buttons.unshift({ label: I.remove, class: 'ghost', onClick: function () { removeGear(memberId, kind); } });
    close = U.modal({ title: name(memberId) + '　' + U.plain(I.gearLabel[kind]), body: list, buttons: buttons });
  }
  // ある品物を、だれが装備するかを選ぶ
  function openAssign(kind, itemId) {
    var close = null, s = FF.app.state, h = SH.holder(s, kind, itemId);
    var list = E('div', { class: 'inv-pick-list' }, squadIds().map(function (id) {
      var cur = SH.equippedOf(s, id)[kind];
      return E('button', { class: 'rn-button inv-pick' + (id === h ? ' is-current' : ''), attrs: { type: 'button', 'data-member': id }, on: { click: function () { close(); equipFlow(id, kind, itemId); } } }, [
        E('span', { class: 'adv-portrait inv-pick-icon' }, FF.adventureArt(id, true)), E('strong', { text: name(id) }),
        E('small', { rich: cur ? itemMarkup(kind, cur) : I.nobody })
      ]);
    }));
    var buttons = [{ label: U.T('back'), class: 'ghost' }];
    if (h) buttons.unshift({ label: I.remove, class: 'ghost', onClick: function () { removeGear(h, kind); } });
    close = U.modal({ title: I.pickTitle, body: E('div', {}, [E('p', { class: 'inv-pick-item', rich: itemMarkup(kind, itemId) }), list]), buttons: buttons });
  }
  U.openAssign = openAssign;
  function renderInventory(main) {
    ensure(); header(main, I.title, I.help);
    var tabs = E('div', { class: 'inv-tabs', attrs: { role: 'tablist' } }, ['weapon', 'armor', 'item'].map(function (k) {
      return E('button', { class: 'inv-tab' + (invTab === k ? ' is-active' : ''), attrs: { type: 'button', role: 'tab', 'aria-selected': invTab === k ? 'true' : 'false', 'data-tab': k }, rich: I.tabs[k], on: { click: function () { invTab = k; U.rerender(); } } });
    }));
    main.appendChild(tabs);
    var panel = E('section', { class: 'inv-panel' });
    if (invTab === 'item') {
      panel.appendChild(E('article', { class: 'inv-row' }, [
        E('span', { class: 'inv-ico', text: '🧪' }),
        E('div', { class: 'inv-info' }, [E('strong', { rich: I.potion }), E('span', { class: 'inv-power', rich: I.potionText })]),
        E('span', { class: 'inv-count' }, [E('strong', { text: '× ' + p().potions })])
      ]));
    } else {
      var s = FF.app.state, ids = SH.owned(s, invTab);
      if (!ids.length) panel.appendChild(text('p', 'inv-empty', I.empty));
      ids.forEach(function (id) {
        var h = SH.holder(s, invTab, id), d = itemDef(invTab, id), locked = !!p().battle;
        panel.appendChild(E('article', { class: 'inv-row', attrs: { 'data-item': id } }, [
          E('span', { class: 'inv-ico', text: d.icon }),
          E('div', { class: 'inv-info' }, [E('strong', { rich: d.name }), E('span', { class: 'inv-power', rich: itemPower(invTab, id) }), holderBadge(invTab, id)]),
          E('div', { class: 'inv-actions' }, [
            btn(h ? I.change : I.equip, function () { openAssign(invTab, id); }, 'quiet inv-equip', locked),
            h ? btn(I.remove, function () { removeGear(h, invTab); }, 'quiet inv-remove', locked) : null
          ])
        ]));
      });
    }
    main.appendChild(panel);
  }
  function openInventory() { U.show('adventureInventory'); }
  function renderParty(main) {
    ensure(); header(main, T.party, T.partyHelp);
    var locked = !!p().battle || !A.atTown(p());
    // 「この仲間で旅をする」は、なくした（町の中で編成していて、急に外に出ないように。判断358）
    main.appendChild(E('div', { class: 'adv-toolbar' }, [btn(I.button, openInventory, 'quiet adv-party-inv'), locked ? text('span', '', T.partyLocked) : null]));
    // いまの隊（先頭から順）：アイコンと名前で、4つの枠。ここで、順番を前へ・外すこともできる（判断358）
    var squad = E('section', { class: 'adv-squad', attrs: { 'aria-label': T.squad } }, [text('h2', 'adv-squad-title', T.squad), text('p', 'adv-squad-help', T.squadHelp)]);
    var slots = E('ol', { class: 'adv-squad-slots' });
    for (var i = 0; i < 4; i++) {
      (function (i) {
        var id = p().party[i], slot = E('li', { class: 'adv-squad-slot' + (id ? '' : ' is-empty'), attrs: id ? { 'data-member': id } : {} });
        slot.appendChild(E('span', { class: 'adv-squad-no', text: String(i + 1) }));
        if (id) {
          slot.appendChild(E('div', { class: 'adv-portrait adv-squad-icon' }, FF.adventureArt(id, true)));
          slot.appendChild(text('strong', 'adv-squad-name', name(id)));
          slot.appendChild(E('div', { class: 'adv-squad-actions' }, [
            btn('◀', function () { var list = p().party.slice(); var o = list[i - 1]; list[i - 1] = id; list[i] = o; change(A.setParty(p(), list)); }, 'quiet adv-squad-move', locked || i === 0),
            btn('✕', function () { var list = p().party.slice(); list.splice(i, 1); change(A.setParty(p(), list)); }, 'quiet adv-squad-out', locked || id === 'hero')
          ]));
          slot.lastChild.firstChild.setAttribute('aria-label', name(id) + T.front);
          slot.lastChild.lastChild.setAttribute('aria-label', name(id) + T.remove);
        } else slot.appendChild(text('span', 'adv-squad-empty', T.squadEmpty));
        slots.appendChild(slot);
      })(i);
    }
    squad.appendChild(slots); main.appendChild(squad);
    var grid = E('div', { class: 'adv-roster' });
    A.IDS.filter(function (id) { return id === 'hero' || p().recruited.indexOf(id) >= 0; }).forEach(function (id) {
      var d = T.members[id], r = p().roster[id], s = A.stats(id, r.xp), index = p().party.indexOf(id), card = E('section', { class: 'adv-roster-card' });
      card.appendChild(member(id, false));
      card.appendChild(text('blockquote', '', '「' + d.quote + '」'));
      card.appendChild(text('p', 'adv-description', d.detail));
      var gb = gearBonus(id), stats = E('dl', { class: 'adv-stats' });
      ['strength', 'defense', 'speed', 'wisdom'].forEach(function (k) {
        var bonus = k === 'strength' ? gb.attack : k === 'defense' ? gb.defense : 0;
        stats.appendChild(E('div', {}, [text('dt', '', T.stats[k]), E('dd', { text: bonus ? (s[k] + bonus) + '（+' + bonus + '）' : s[k] })]));
      });
      card.appendChild(stats);
      // 装備（武器・防具）：ここで入れかえられる（判断359）
      card.appendChild(E('div', { class: 'adv-gear' }, ['weapon', 'armor'].map(function (kind) {
        var cur = SH.equippedOf(FF.app.state, id)[kind];
        return E('div', { class: 'adv-gear-row', attrs: { 'data-gear': kind } }, [
          text('span', 'adv-gear-label', I.gearLabel[kind]),
          cur ? E('span', { class: 'adv-gear-name', rich: itemMarkup(kind, cur) }) : text('span', 'adv-gear-name is-none', I.nobody),
          btn(I.change2, function () { openPicker(id, kind); }, 'quiet adv-gear-btn', !!p().battle)
        ]);
      })));
      card.appendChild(text('p', 'adv-xp', s.level >= B.MAX_LEVEL ? 'Lv.MAX · 経験値 ' + r.xp : '経験値 ' + r.xp + ' · 次のレベルまで ' + (B.XP_STEP * s.level * s.level - r.xp)));
      card.appendChild(E('div', { class: 'adv-card-actions' }, [
        text('span', 'adv-pill', index >= 0 ? (index + 1) + ' · ' + T.joined : T.waiting),
        btn(index >= 0 ? T.remove : T.join, function () { var list = p().party.slice(); if (index >= 0) list.splice(index, 1); else list.push(id); change(A.setParty(p(), list)); }, 'quiet', locked || id === 'hero'),
        btn(T.front, function () { var list = p().party.slice(); var old = list[index - 1]; list[index - 1] = id; list[index] = old; change(A.setParty(p(), list)); }, 'quiet', locked || index <= 0)
      ]));
      grid.appendChild(card);
    });
    // まだ会えていない旅人（影の絵。旅人を救出すると、仲間になる）
    A.ALLIES.filter(function (id) { return p().recruited.indexOf(id) < 0; }).forEach(function (id) {
      grid.appendChild(E('section', { class: 'adv-roster-card adv-roster-locked', attrs: { 'data-locked': id } }, [
        E('div', { class: 'adv-portrait' }, FF.adventureArt(id, true)), text('p', 'adv-role', (FF.research.joinKind(id) === 'heat' ? T.lockedHeat : FF.research.joinKind(id) === 'solved' ? T.lockedSolved : FF.research.joinKind(id) === 'chests' ? T.lockedChests : T.lockedAlly))
      ]));
    });
    main.appendChild(grid);
    if (!locked) main.appendChild(settings());
  }
  function destinationLabel(x, y) {
    var n = p(), pos = { x: x, y: y }, enemy = A.enemyAt(n, pos);
    if (enemy) return T.enemies[enemy].name + 'と戦う';
    for (var key of Object.keys(A.PLACES)) if (A.same(pos, A.PLACES[key])) return T[key] + 'へ移動';
    return '雪道 ' + x + ',' + y + 'へ移動';
  }
  function walk(target) {
    if (moving || p().battle) return;
    if (A.same(target, A.PLACES.home) && A.same(p().pos, target)) { home(); return; }
    var steps = A.path(p(), target);
    if (!steps.length) { U.toast('そこへは道がつながっていない。峠の敵や、ほかの道をたしかめよう。'); return; }
    var token = ++routeId, viewport = root.document.querySelector('.adv-map-viewport'), traveler = viewport.querySelector('.adv-traveler'), map = viewport.querySelector('.adv-map'), hdNow = viewport.classList.contains('hd2d');
    moving = true; traveler.classList.add('is-walking');
    function finish() { moving = false; traveler.classList.remove('is-walking'); }
    function step() {
      if (token !== routeId || !traveler.isConnected || FF.app.screen !== 'adventure' || p().battle || !steps.length) { finish(); return; }
      var pos = steps.shift(), old = p(), next = A.move(old, pos.x, pos.y);
      if (next === old) { finish(); return; }
      traveler.style.backgroundPosition = ({down:'left top',up:'right top',left:'left bottom',right:'right bottom'})[next.facing];
      traveler.setAttribute('data-facing', next.facing);
      var sx = old.pos.x * 72 + 36, sy = old.pos.y * 72 + 40, ex = next.pos.x * 72 + 36, ey = next.pos.y * 72 + 40;
      var scale = map.clientWidth / 936, cx = viewport.scrollLeft, cy = viewport.scrollTop;
      var tx = Math.max(0, Math.min(viewport.scrollWidth - viewport.clientWidth, ex * scale - viewport.clientWidth / 2));
      var ty = Math.max(0, Math.min(viewport.scrollHeight - viewport.clientHeight, ey * scale - viewport.clientHeight / 2));
      var last = null, elapsed = 0, duration = root.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;
      function frame(time) {
        if (token !== routeId || !traveler.isConnected || FF.app.screen !== 'adventure') { finish(); return; }
        if (last !== null) elapsed += Math.min(34, Math.max(0, time - last));
        last = time;
        var fraction = duration ? Math.min(1, elapsed / duration) : 1;
        if (!hdNow) { traveler.style.left = (sx + (ex - sx) * fraction) / 936 * 100 + '%'; traveler.style.top = (sy + (ey - sy) * fraction) / 648 * 100 + '%'; }
        if (hdNow) {
          hdPlace(map, sx + (ex - sx) * fraction, sy + (ey - sy) * fraction);
        } else { viewport.scrollLeft = cx + (tx - cx) * fraction; viewport.scrollTop = cy + (ty - cy) * fraction; }
        if (fraction < 1) { root.requestAnimationFrame(frame); return; }
        if (steps.length && !next.battle && !next.notice) FF.app.state = Object.assign({}, FF.app.state, { adventure: next }); else save(next);   // 道の途中は、保存・画面の更新をしない（重いので）。着いたとき・戦闘や知らせのときに保存
        if (hdNow) syncTrees(map, ex, ey);
        map.querySelectorAll('.adv-tile.current').forEach(function(cell) {cell.classList.remove('current');cell.removeAttribute('aria-current');});
        var cell = map.querySelector('[data-x="' + pos.x + '"][data-y="' + pos.y + '"]');
        if (cell) {cell.classList.add('current');cell.setAttribute('aria-current','location');}
        if (!next.battle && A.same(next.pos, A.PLACES.home)) { finish(); U.show('base'); return; }
        if (next.battle || next.notice) { finish(); entering = !!next.battle; paint(); return; }
        root.document.querySelectorAll('.adv-settings,.adv-notice').forEach(function(node) {node.remove();});
        if (steps.length) step(); else finish();
      }
      root.requestAnimationFrame(frame);
    }
    step();
  }

  // ---- HD-2D 風の表示（試作。判断367）：地面を傾け、木・人物・敵は立てた絵。カメラは、主人公の位置を --cx/--cy で追う ----
  var hd = !(FF.config && FF.config.ADVENTURE_HD2D === false), treeUrls = null;
  function isHd() { return hd && !overview; }
  function treeSprites() {
    if (treeUrls) return treeUrls;
    treeUrls = [0, 1, 2].map(function (v) {
      var c = root.document.createElement('canvas'); c.width = 96; c.height = 128;
      var x = c.getContext('2d'), tones = [['#2d5a66', '#3d7480'], ['#2a5560', '#38707a'], ['#31606a', '#437c86']][v];
      function poly(pts, col) { x.fillStyle = col; x.beginPath(); pts.forEach(function (q, i) { if (i) x.lineTo(q[0], q[1]); else x.moveTo(q[0], q[1]); }); x.closePath(); x.fill(); }
      x.fillStyle = '#6e625a'; x.fillRect(43, 100, 10, 24); x.fillStyle = '#85766b'; x.fillRect(43, 100, 4, 24);
      for (var j = 0; j < 4; j++) {
        var base = 106 - j * 25, top = base - 40 + j * 4, w = 40 - j * 7;
        poly([[48 - w, base], [48, top], [48 + w, base], [48 + w * .45, base - 6], [48, base + 2], [48 - w * .45, base - 6]], tones[0]);
        poly([[48 - w, base], [48, top], [48 + w * .15, base - 4], [48 - w * .5, base - 4]], tones[1]);
        poly([[48 - w * .8, base - 10], [48, top], [48 + w * .75, base - 12], [48 + w * .25, base - 20], [48, base - 14], [48 - w * .3, base - 21]], '#e9f4f7');
        poly([[48, top], [48 + w * .75, base - 12], [48 + w * .25, base - 20]], '#bcd6e0');
      }
      return c.toDataURL('image/png');
    });
    return treeUrls;
  }
  // 木は、カメラの近くのぶんだけ出す（遠いものは外す。画面の部品が少ないほど、軽い）
  function hdTreeData() {
    var hash = function (a, b) { var h = (a * 374761393 + b * 668265263) >>> 0; h = ((h ^ (h >>> 13)) * 1274126177) >>> 0; return (h ^ (h >>> 16)) / 4294967296; };
    var list = [], out = [];
    A.MAP.forEach(function (row, y) { row.split('').forEach(function (t, x) { if (t === '#') list.push([x, y]); }); });
    // 外側の海べりの、もう1列。木の列が、そのまま続いて見える
    for (var x = -1; x <= 13; x++) { list.push([x, -1]); list.push([x, 9]); }
    for (var y = 0; y < 9; y++) { list.push([-1, y]); list.push([13, y]); }
    list.sort(function (a, b) { return a[1] - b[1] || a[0] - b[0]; }).forEach(function (c) {
      var big = .85 + hash(c[0] + 3, c[1] + 5) * .35;
      out.push({ key: c[0] + ',' + c[1], x: (c[0] + .5) * 72 + (hash(c[0], c[1]) - .5) * 26, y: (c[1] + .85) * 72 + (hash(c[1], c[0] + 7) - .5) * 18, w: 86 * big, v: Math.floor(hash(c[0], c[1] + 11) * 3) });
    });
    return out;
  }
  function syncTrees(map, cx, cy) {
    var st = map._trees; if (!st) return;
    var urls = treeSprites();
    st.data.forEach(function (t) {
      var near = t.x > cx - 560 && t.x < cx + 560 && t.y > cy - 700 && t.y < cy + 380, el = st.els[t.key];
      if (near && !el) {
        el = E('img', { class: 'adv-tree', attrs: { src: urls[t.v], alt: '', draggable: 'false', 'aria-hidden': 'true' }, style: { left: t.x + 'px', top: t.y + 'px', width: t.w + 'px' } });
        st.els[t.key] = el; map.appendChild(el);
      } else if (!near && el) { el.remove(); delete st.els[t.key]; }
    });
  }
  // HD-2D：カメラ（地面の移動）と主人公・影の位置を、transform で直接動かす（レイアウトや、子への再計算を起こさない）
  function hdPlace(map, x, y) {
    map.style.transform = 'translate3d(' + (-x) + 'px,' + (-y) + 'px,0)';
    var hero = map.querySelector('.adv-traveler'), shadow = map.querySelector('.adv-traveler-shadow');
    if (hero) hero.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-92%) rotateX(-56deg)';
    if (shadow) shadow.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
  }
  function mapView() {
    var n = p(), map = E('div', { class: 'adv-map', attrs: { role: 'group', 'aria-label': T.map } });
    map.appendChild(E('img', { class: 'adv-world-art', attrs: { src: scene.background, alt: '', draggable: 'false' }, on: { error: function(event) { event.target.src = scene.world(); } } }));
    A.MAP.forEach(function (row, y) {
      row.split('').forEach(function (tile, x) {
        if (tile === '#') return;
        var here = { x: x, y: y }, place = Object.keys(A.PLACES).find(function (k) { return A.same(here, A.PLACES[k]); }), enemy = A.enemyAt(n, here), current = A.same(n.pos, here);
        var cell = E('button', { class: 'adv-tile ' + (place || '') + (enemy ? ' enemy' : '') + (current ? ' current' : ''), style: { gridColumn: x + 1, gridRow: y + 1 },
          attrs: { type: 'button', 'aria-label': destinationLabel(x, y), 'aria-current': current ? 'location' : null, 'data-x': x, 'data-y': y }, on: { click: function () { walk(here); } } });
        if (enemy) { cell.appendChild(scene.enemy(enemy)); cell.appendChild(E('span', { class: 'adv-threat', text: enemy === 'boss' ? '★★★' : enemy === 'wolf' ? '★★' : '★' })); }
        else if (place) cell.appendChild(text('span', 'adv-map-label', T[place]));
        map.appendChild(cell);
      });
    });
    map.appendChild(E('span', { class: 'adv-traveler leader', style: { backgroundImage: 'url("' + scene.traveler(FF.app.state.player.avatar) + '")', backgroundPosition: ({down:'left top',up:'right top',left:'left bottom',right:'right bottom'})[n.facing], left: (n.pos.x * 72 + 36) / 936 * 100 + '%', top: (n.pos.y * 72 + 40) / 648 * 100 + '%' }, attrs: { role: 'img', 'aria-label': C.current, 'data-sprite': scene.traveler(FF.app.state.player.avatar), 'data-avatar': FF.app.state.player.avatar || 'e1', 'data-facing': n.facing, draggable: 'false' } }, ['body','leg-left','leg-right'].map(function(part) {return E('span',{class:'adv-walk-part adv-walk-' + part,attrs:{'aria-hidden':'true'}});})));
    if (isHd()) {
      var hx = n.pos.x * 72 + 36, hy = n.pos.y * 72 + 40, shadow = E('span', { class: 'adv-shadow adv-traveler-shadow', attrs: { 'aria-hidden': 'true' } });
      map.appendChild(shadow);
      map._trees = { data: hdTreeData(), els: {} };
      hdPlace(map, hx, hy);
      syncTrees(map, hx, hy);
    }
    return map;
  }
  // フィールドの上に重ねる操作：町へ・仲間の編成・ゴールド・全体マップ・HD-2D（画面を広く使うため、タイトルは出さない）
  function fieldBar() {
    var n = p();
    return E('div', { class: 'adv-fbar' }, [
      btn(T.back, home, 'quiet'),
      btn(T.party, function () { routeId++; moving = false; U.show('adventureParty'); }, 'quiet'),
      text('span', 'adv-gold adv-fgold', n.gold + ' G'),
      E('span', { class: 'adv-fspacer' }),
      btn(overview ? C.follow : C.map, function () { routeId++; moving = false; overview = !overview; paint(); }, 'quiet'),
      btn(hd ? 'HD-2D：入' : 'HD-2D：切', function () { routeId++; moving = false; hd = !hd; overview = false; paint(); }, 'quiet adv-hd-toggle')
    ]);
  }
  function fieldViewport() {
    var flat = !isHd(), world = mapView();
    var viewport = E('div', { class: 'adv-map-viewport' + (overview ? ' overview' : '') + (flat ? '' : ' hd2d') }, flat ? world : E('div', { class: 'adv-tilt' }, world));
    var shell = E('div', { class: 'adv-map-shell' + (flat ? '' : ' is-hd') }, [viewport,
      flat ? null : E('div', { class: 'adv-hd-fx adv-hd-haze', attrs: { 'aria-hidden': 'true' } }),
      flat ? null : E('div', { class: 'adv-hd-fx adv-hd-light', attrs: { 'aria-hidden': 'true' } }),
      E('div', { class: 'adv-compass', text: 'N ↑', attrs: { 'aria-hidden': true } }),
      fieldBar(), directions()].filter(Boolean));
    root.requestAnimationFrame(function () {
      if (!viewport.isConnected || overview || !flat) return;
      viewport.scrollLeft = p().pos.x * 72 + 36 - viewport.clientWidth / 2;
      viewport.scrollTop = p().pos.y * 72 + 36 - viewport.clientHeight / 2;
    });
    return shell;
  }
  function directions() {
    return E('div', { class: 'adv-directions', attrs: { 'aria-label': '移動ボタン' } }, [[0, -1, '↑', '北へ'], [-1, 0, '←', '西へ'], [0, 1, '↓', '南へ'], [1, 0, '→', '東へ']].map(function (d) {
      var b = btn(d[2], function () { var pos = p().pos; if (A.walkable({ x: pos.x + d[0], y: pos.y + d[1] })) walk({ x: pos.x + d[0], y: pos.y + d[1] }); }, 'quiet'); b.setAttribute('aria-label', d[3]); return b;
    }));
  }
  function renderField(main) {
    var n = p(); main.classList.add('adv-field-screen');
    if (n.notice === 'arrival') main.appendChild(E('section', { class: 'adv-arrival', attrs: { role: 'status' } }, [text('p', 'adv-eyebrow', 'CHAPTER 01 · COMPLETE'), text('h2', '', T.arrivalTitle), text('p', '', T.arrivalText), text('p', '', T.arrivalNext)]));
    var layout = E('div', { class: 'adv-field-layout' }), board = E('section', { class: 'adv-board' });
    board.appendChild(fieldViewport()); board.appendChild(text('p', 'adv-map-help', C.fieldHelp));
    layout.appendChild(board);
    var side = E('aside', { class: 'adv-travel-panel' });
    side.appendChild(text('strong', 'adv-quest', n.arrived ? T.routeDone : T.route)); side.appendChild(text('h2', '', '旅の仲間')); side.appendChild(team());
    side.appendChild(text('p', 'adv-field-help', T.fieldHelp));
    var heal = E('div', { class: 'adv-supplies' }, [text('strong', '', T.potion + ' × ' + n.potions)]);
    var target = E('select', { attrs: { 'aria-label': '回復薬を使う仲間' } }, n.party.map(function (id) { return E('option', { value: id, text: name(id) }); }));
    heal.appendChild(target); heal.appendChild(btn(T.usePotion, function () { change(A.potion(p(), target.value)); }, 'quiet', !n.potions)); side.appendChild(heal);
    side.appendChild(btn(T.returnTown, function () { if (p().lastTown === 'home') home(); else change(A.depart(p(), 'town')); }, 'quiet'));
    side.appendChild(text('small', '', T.goldHelp));
    layout.appendChild(side); main.appendChild(layout);
    if (n.notice && T.notices[n.notice]) main.appendChild(text('p', 'adv-notice', T.notices[n.notice]));
    if (A.atTown(n)) main.appendChild(settings());
    main.appendChild(text('p', 'adv-record', '冒険の学習記録：' + n.answered + '問 · 正解 ' + n.correct + '問（熱量・問題チケットとは別の記録）'));
  }
  // 敵の次の行動は、先に見せない（わかると簡単になるため。判断348）。要素は残し、中身を空にする
  function intention() { return ''; }
  function prepareOrders() {
    var n = p(), key = n.battle.enemy + ':' + n.battle.turn;
    if (orderKey !== key) { orders = {}; actor = A.alive(n)[0]; submenu = null; orderKey = key; }
    if (A.alive(n).indexOf(actor) < 0) actor = A.alive(n)[0];
  }
  function battleStats() {
    return E('div', { class: 'adv-rpg-stats', attrs: { 'aria-label': T.party } }, p().party.map(function(id) {
      var r = p().roster[id], st = A.stats(id, r.xp), active = p().battle.phase === 'commands';
      var card = btn('', function() { actor = id; submenu = null; paint(); }, 'adv-status' + (active && actor === id ? ' selected' : '') + (!r.hp ? ' is-down' : '') + (received[id] ? ' is-damaged' : ''), !active || !r.hp);
      card.setAttribute('aria-label', name(id) + C.selected); card.setAttribute('aria-pressed', active && actor === id ? 'true' : 'false');
      if (received[id]) card.appendChild(E('span',{class:'adv-party-damage',text:'−' + received[id],attrs:{'aria-hidden':'true'}}));
      card.appendChild(text('strong', '', name(id)));card.appendChild(E('small', { text: 'Lv ' + st.level }));
      card.appendChild(E('span', { text: 'HP ' + r.hp }));card.appendChild(meter(r.hp,st.hp,'hp',name(id)+' HP'));
      card.appendChild(E('span', { text: 'MP ' + r.mp }));card.appendChild(meter(r.mp,st.mp,'mp',name(id)+' MP'));return card;
    }));
  }
  // Reserve each choice without spending MP or supplies. Only the last choice opens the quiz.
  function availablePotions() {
    return p().potions - Object.keys(orders).filter(function(id) { return id !== actor && orders[id].type === 'item'; }).length;
  }
  function confirmOrder(type, target) {
    orders[actor] = { type: type, target: target || actor }; submenu = null;
    var pending = A.alive(p()).find(function(id) { return !orders[id]; });
    if (pending) { actor = pending; paint(); return; }
    var before = p(), next = A.command(before, orders, FF.app.bank, grade(), Math.random, FF.app.now());
    if (next === before) { U.toast(A.pick(FF.app.bank, before, grade(), Math.random, FF.app.now()) ? T.noOrders : T.noQuestion); paint(); return; }
    orderKey = null; change(next);
  }
  // 戦闘の説明は、毎回は出さず、ボタンで開く（判断349）
  function openHowto() {
    U.modal({ title: C.howtoButton, body: E('div', { class: 'adv-howto-body' }, C.howto.map(function(line) { return text('p', '', line); })), buttons: [{ label: C.goBack, class: 'ghost' }] });
  }
  function commandPanel() {
    var n = p(), panel = E('section', { class: 'adv-command-panel' }), menu = E('nav', { class: 'adv-command-menu' + (submenu ? ' adv-subcommand-menu' : ''), attrs: { 'aria-label': submenu ? C.details : T.command } });
    menu.appendChild(text('strong', 'adv-menu-actor', name(actor)));
    var prompt = C.chooseAction.replace('{name}', name(actor));
    if (!submenu) {
      [['attack',T.fight],['magic',T.magic],['item',T.item],['escape',T.escape]].forEach(function(entry) {
        var type = entry[0], disabled = type === 'magic' && n.roster[actor].mp < B.MAGIC_COST || type === 'item' && availablePotions() <= 0;
        menu.appendChild(btn(entry[1], function() {
          if (type === 'escape') { orderKey = null; change(A.retreat(p())); }
          else if (type === 'attack') confirmOrder(type);
          else { submenu = {type:type, target:false}; paint(); }
        }, 'adv-command', disabled));
      });
    } else {
      var type = submenu.type;
      if (submenu.target) {
        prompt = C.chooseTarget;
        n.party.forEach(function(id) {
          menu.appendChild(btn(name(id) + ' · HP ' + n.roster[id].hp, function() { confirmOrder(type, id); }, 'adv-command'));
        });
      } else if (type === 'magic') {
        prompt = C.chooseMagic;
        menu.appendChild(btn(T.members[actor].magic + ' · ' + B.MAGIC_COST + ' MP', function() {
          if (A.magicKind(actor) === 'heal') { submenu.target = true; paint(); } else confirmOrder('magic');
        }, 'adv-command', n.roster[actor].mp < B.MAGIC_COST));
      } else {
        prompt = C.chooseItem;
        menu.appendChild(btn(T.potion + ' × ' + availablePotions(), function() { submenu.target = true; paint(); }, 'adv-command', availablePotions() <= 0));
      }
      menu.appendChild(btn(C.goBack, function() { if (submenu.target) submenu.target = false; else submenu = null; paint(); }, 'adv-command'));
    }
    var alive = A.alive(n);
    var dialogue = E('div', { class: 'adv-command-dialogue' }, [
      text('p', 'adv-encounter-text', C.encounter.replace('{name}',T.enemies[n.battle.enemy].name)),
      text('p', 'adv-action-message adv-command-prompt', prompt),
      submenu ? text('p', 'adv-action-description', submenu.type === 'magic' ? T.members[actor].detail : C.item) : null,
      E('div', { class: 'adv-command-foot' }, [
        E('button', { class: 'adv-howto', rich: '？ ' + C.howtoShort, attrs: { type: 'button' }, on: { click: openHowto } })
      ])
    ]);
    panel.appendChild(menu); panel.appendChild(dialogue); return panel;
  }
  function questionPanel() {
    var b = p().battle, q = b.question, active = b.phase === 'attack';
    var panel = E('section', { class: 'adv-question-panel' }), body = E('div', { class: 'adv-question-scroll' }), controls = E('div', { class: 'adv-quiz-controls' });
    if (!q || b.phase === 'win' || b.phase === 'lose') return panel;
    body.appendChild(text('h2', 'adv-question', q.question));
    if (active && q.diagram && FF.lessonFigure) body.appendChild(FF.lessonFigure.render(q.diagram));
    if (active) {
      q.hints.slice(0, b.hints || 0).forEach(function(hint) { body.appendChild(text('p', 'adv-hint', hint)); });
      if (q.answerType === 'choice') {
        controls.appendChild(E('div', { class: 'adv-choices' }, b.choices.map(function(choice, i) {
          var button = btn('', function() { change(A.answer(p(), choice, FF.app.now())); }, 'adv-answer');
          button.appendChild(E('span', { class: 'adv-choice-letter', text: ['A','B','C','D'][i] })); button.appendChild(U.rich(choice)); return button;
        })));
      } else {
        var input = E('input', { attrs: { 'aria-label': '答え', autocomplete: 'off' } });
        controls.appendChild(E('form', { class: 'adv-input', on: { submit: function(event) { event.preventDefault(); change(A.answer(p(), input.value, FF.app.now())); } } }, [input, E('button', { class: 'adv-button gold', attrs: { type: 'submit' }, text: T.submit })]));
      }
      var tools = E('div', { class: 'adv-quiz-tools' });
      if (q.hints && q.hints.length) tools.appendChild(btn(T.hint, function() { var n=FF.util.clone(p()); n.battle.hints=Math.min(q.hints.length,(b.hints||0)+1); change(n); }, 'quiet', b.hints >= q.hints.length));
      tools.appendChild(btn('戦闘からにげる', function() { change(A.retreat(p())); }, 'quiet'));
      controls.appendChild(tools);
    } else {
      body.appendChild(E('div', { class: 'adv-feedback ' + (b.correct ? 'correct' : 'wrong'), attrs: { role: 'status' } }, [text('strong','',T.answer+'：'+FF.learning.displayAnswer(q)),text('p','',q.explanation)]));
    }
    panel.appendChild(body); if (active) panel.appendChild(controls); return panel;
  }
  function passiveMenu() {
    var menu = E('nav', {class:'adv-command-menu adv-passive-menu',attrs:{'aria-label':T.command}});
    menu.appendChild(text('strong','adv-menu-actor',T.battleMenu));
    [T.fight,T.magic,T.item,T.escape].forEach(function(label) {menu.appendChild(btn(label,function(){},'adv-command',true));});
    return menu;
  }
  function battleWindow(dialogue, cls) {
    return E('section',{class:'adv-command-panel ' + (cls || ''),attrs:{'aria-live':'polite'}},[passiveMenu(),dialogue]);
  }
  function quizDialog(main, damage) {
    var b = p().battle, active = b.phase === 'attack';
    var title = active ? T.attackQuiz : (b.correct ? T.good : T.wrong);
    var dialog = main.querySelector('.adv-quiz-dialog');
    if (dialog) U.clear(dialog);
    else dialog = E('dialog', { class: 'adv-quiz-dialog', attrs: { 'aria-labelledby': 'adv-quiz-title' } });
    var heading = E('h2', { class: 'adv-dialog-title', rich: title, attrs: { id: 'adv-quiz-title', tabindex: '-1' } });
    dialog.appendChild(E('header', { class: 'adv-dialog-header' }, [heading, btn(C.viewBattle, function() { dialog.close(); }, 'quiet')]));
    dialog.appendChild(questionPanel());
    var footer = E('footer', { class: 'adv-dialog-footer' });
    if (b.phase === 'lose') footer.appendChild(E('section',{class:'adv-result'},[text('h2','',T.defeat),text('p','',T.defeatHelp),btn('町で休む',advance,'gold')]));
    else if (!active) footer.appendChild(btn(T.returnBattle,advance,'gold adv-next'));
    if (!active) dialog.appendChild(footer);
    var opener = btn(active ? C.answerQuiz : C.reviewQuiz,function(){dialog.showModal();heading.focus({preventScroll:true});},'gold adv-open-quiz');
    main.appendChild(battleWindow(E('div',{class:'adv-command-dialogue'},[text('p','adv-action-message',b.phase === 'lose' ? T.defeat : title),opener]),'adv-quiz-pending')); if (!dialog.isConnected) main.appendChild(dialog);
    if (dialog.open) heading.focus({preventScroll:true});
    root.requestAnimationFrame(function() {
      var delay = damage && !root.matchMedia('(prefers-reduced-motion: reduce)').matches ? 480 : 0;
      root.setTimeout(function() { if(dialog.isConnected && FF.app.screen === 'adventure' && !dialog.open) {dialog.showModal();heading.focus({preventScroll:true});} },delay);
    });
  }
  // 武器・防具を、ひとりひとりの攻撃・防御に足す（判断343・359）
  function gear() { return FF.shop ? FF.shop.gearMap(FF.app.state) : {}; }
  function advance() {
    var old = p(), next = A.advance(old, FF.app.bank, grade(), Math.random, FF.app.now(), gear(), FF.research ? FF.research.effects(FF.app.state) : {});
    if (next === old) { U.toast(T.noQuestion); return; } change(next);
  }
  function victoryPanel(damage) {
    var reward = p().battle.reward;
    var panel = E('section', {class:'adv-command-panel adv-victory-panel adv-result win', attrs:{'aria-label':T.victory,'aria-live':'polite'}});
    var dialogue = E('div',{class:'adv-command-dialogue'},[
      text('p','adv-reward',T.victoryReward.replace('{xp}',reward.xp).replace('{gold}',reward.gold)),
      btn(T.field,advance,'gold'),
      E('div',{class:'adv-levelups'},reward.levels.map(function(r){return text('p','','✦ ' + name(r.id) + ' Lv.' + r.level + '　' + T.levelUp);} ))
    ]);
    if (reward.chest) dialogue.appendChild(E('div',{class:'adv-loot'},[
      scene.chest(), E('div',{},[text('strong','',T.treasureFound),text('p','',T.treasureContents.replace('{gold}',reward.chest.gold).replace('{potions}',reward.chest.potions))])
    ]));
    panel.appendChild(passiveMenu()); panel.appendChild(dialogue);
    // Let the final hit play before revealing the victory and chest.
    if (damage && !root.matchMedia('(prefers-reduced-motion: reduce)').matches) panel.classList.add('after-hit');
    return panel;
  }
  function playActions(shell, stage) {
    var playback = sequence, message = text('p','adv-action-message','');
    var dialogue = E('div',{class:'adv-command-dialogue'},message);
    shell.appendChild(battleWindow(dialogue,'adv-sequence-panel'));
    var art = stage.querySelector('.adv-enemy-art'), hpText = stage.querySelector('.adv-enemy-hp'), bar = stage.querySelector('.adv-meter'), total = B.ENEMIES[playback.enemy].hp;
    function setHp() {hpText.textContent='HP ' + playback.hp + ' / ' + total;bar.setAttribute('aria-valuenow',playback.hp);bar.firstChild.style.width=(playback.hp/total*100)+'%';}
    function say(value) {U.clear(message);message.appendChild(U.rich(value));}
    function wait(ms, action) {root.setTimeout(function(){if(shell.isConnected && sequence===playback && FF.app.screen==='adventure') action();},ms);}
    function event() {
      if (playback.index >= playback.events.length) {
        sequence = null;
        if (p().battle.phase === 'playerAction') advance(); else paint();
        return;
      }
      var line=playback.events[playback.index], acting=line.actor || line.who, command=p().battle.orders[acting];
      art.classList.remove('is-hit');art.querySelectorAll('.adv-damage').forEach(function(node){node.remove();});
      say((line.key==='hit' ? (command && command.type==='magic' ? T.magicDeclare.replace('{magic}',T.members[acting].magic) : T.attackDeclare) : T.actionDeclare).replace('{name}',name(acting)));
      wait(350,function(){
        if (line.key==='hit') {
          if (!root.matchMedia('(prefers-reduced-motion: reduce)').matches) art.classList.add('is-hit');
          art.setAttribute('data-damage',line.amount);
        }
        wait(line.key==='hit' ? 460 : 150,function(){
          if (line.key==='hit') {
            playback.hp=Math.max(0,playback.hp-line.amount);setHp();
            art.appendChild(E('span',{class:'adv-damage',text:'−'+line.amount,attrs:{'aria-hidden':'true'}}));
            say(T.damageResult.replace('{enemy}',T.enemies[playback.enemy].name).replace('{n}',line.amount));
          } else say(T.logs[line.key].replace('{name}',name(line.who)).replace('{n}',line.amount));
          playback.index++;wait(400,event);
        });
      });
    }
    setHp();event();
  }
  function renderBattle(main) {
    var n = p(), b = n.battle, d = T.enemies[b.enemy], done = b.phase === 'win' || b.phase === 'lose', damage = impact, hurt = Object.keys(received).length; impact = 0;
    main.classList.add('adv-battle-screen');
    if (b.phase === 'commands') prepareOrders();
    var playing = sequence && sequence.enemy===b.enemy && sequence.turn===b.turn, won = b.phase === 'win' && !playing;
    var shell = main.querySelector('.adv-rpg-shell');
    if (!shell) {
      header(main, C.region, T.scenery.turn + ' ' + b.turn + ' · ' + d.rank);
      shell = E('div', {class:'adv-rpg-shell' + (entering ? ' encounter' : '')}); main.appendChild(shell);
      // 登場の光（encounter）は一度だけ。残しておくと、揺れ（is-hurt）のあとで再生されて、画面が白く光る（判断347）
      shell.addEventListener('animationend', function(e) { if (e.target === shell && e.animationName === 'adv-encounter') shell.classList.remove('encounter'); });
      root.setTimeout(function() { shell.classList.remove('encounter'); }, 700);
    } else {
      U.clear(main.querySelector('.adv-subtitle')); main.querySelector('.adv-subtitle').appendChild(U.rich(T.scenery.turn + ' ' + b.turn + ' · ' + d.rank));
      // Retain the open question dialog when replacing the question with its explanation.
      shell.querySelectorAll('.adv-command-panel,.adv-battle-log,.adv-hit-flash').forEach(function(node) {node.remove();});
      if (['attack','explanation','lose'].indexOf(b.phase) < 0) shell.querySelectorAll('.adv-quiz-dialog').forEach(function(dialog) {dialog.close();dialog.remove();});
    }
    entering = false; main = shell;
    var stats = shell.querySelector('.adv-rpg-stats');
    if (stats) stats.replaceWith(battleStats()); else shell.appendChild(battleStats());
    received = {};
    if (hurt) shell.appendChild(E('div',{class:'adv-hit-flash',attrs:{'aria-hidden':'true'}}));
    // ダメージを受けたら、画面（戦闘の枠）全体を揺らす（判断346。transform だけなので配置はずれない）
    shell.classList.remove('is-hurt'); if (hurt) { void shell.offsetWidth; shell.classList.add('is-hurt'); }
    var stage = shell.querySelector('.adv-battle-stage');
    if (!stage) {
      stage = E('section', {class:'adv-battle-stage ' + b.enemy,attrs:{'aria-label':d.name}},[
        E('div',{class:'adv-enemy-nameplate'},[text('strong','',d.name),E('span',{class:'adv-enemy-hp'}),meter(b.hp,B.ENEMIES[b.enemy].hp,'enemy-hp','敵のHP')]),
        E('div',{class:'adv-enemy-art'},scene.enemy(b.enemy)),
        text('p','adv-intent',intention())
      ]); shell.appendChild(stage);
    }
    if (won) { U.clear(stage); stage.setAttribute('aria-label',T.victory); }
    else {
      var hpText = stage.querySelector('.adv-enemy-hp'), bar = stage.querySelector('.adv-meter'), art = stage.querySelector('.adv-enemy-art'), intent = stage.querySelector('.adv-intent');
      hpText.textContent = 'HP ' + b.hp + ' / ' + B.ENEMIES[b.enemy].hp;
      bar.setAttribute('aria-valuenow',b.hp);bar.firstChild.style.width=(b.hp/B.ENEMIES[b.enemy].hp*100)+'%';
      art.classList.remove('is-hit');art.querySelectorAll('.adv-damage').forEach(function(node){node.remove();});
      if (damage) {art.classList.add('is-hit');art.appendChild(E('span',{class:'adv-damage',text:'−'+damage,attrs:{'aria-hidden':'true'}}));}
      U.clear(intent);intent.appendChild(U.rich(done ? '' : intention()));intent.style.visibility = done ? 'hidden' : 'visible';
    }
    if (sequence && sequence.enemy===b.enemy && sequence.turn===b.turn) {playActions(main,stage);return;}
    if (b.phase === 'commands') main.appendChild(commandPanel());
    else if (b.phase === 'win') main.appendChild(victoryPanel(damage));
    else if (b.phase === 'playerAction' || b.phase === 'enemyAction') {
      var dialogue = E('div', {class:'adv-command-dialogue'}, [text('p','adv-action-message',b.phase === 'playerAction' ? T.playerAction : T.enemyDeclare.replace('{enemy}',d.name))]);
      if (b.phase === 'enemyAction') b.log.forEach(function(line) {
        dialogue.appendChild(text('p','adv-action-message',T.logs[line.key].replace('{name}',name(line.who)).replace('{n}',line.amount)));
      });
      main.appendChild(battleWindow(dialogue,'adv-sequence-panel adv-retaliation-panel'));
      var phase = b.phase, turn = b.turn, marker = stage;
      root.setTimeout(function() { if (marker.isConnected && FF.app.screen === 'adventure' && p().battle && p().battle.phase === phase && p().battle.turn === turn) advance(); }, b.phase === 'enemyAction' ? 1800 : 900);
    } else quizDialog(main, damage || hurt);

  }

  U.screens.adventure = { render: function (main) { ensure(); main.classList.remove('adv-field-screen','adv-battle-screen','is-hurt'); main.classList.add('adventure-screen'); if (p().battle) renderBattle(main); else renderField(main); } };
  U.screens.adventureParty = { render: renderParty };
  U.screens.adventureInventory = { render: renderInventory };
  root.document.addEventListener('keydown', function (e) {
    if (FF.app.screen !== 'adventure' || p().battle || /INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)) return;
    var delta = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
    if (!delta) return;
    e.preventDefault(); var pos = p().pos;
    if (A.walkable({ x: pos.x + delta[0], y: pos.y + delta[1] })) walk({ x: pos.x + delta[0], y: pos.y + delta[1] });
  });
})(this);
