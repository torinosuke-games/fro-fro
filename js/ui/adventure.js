// 雪原の冒険の画面。既存の問題バンク・保存・図の表示を使う。
(function (root) {
  'use strict';
  var FF = root.FF, A = FF.adventure, U = FF.ui, T = FF.texts.adventure, B = FF.balance.ADVENTURE;
  var E = U.el, moving = false, routeId = 0, overview = false, battleUi = FF.ui.adventureBattle;
  var C = T.scenery, scene = FF.adventureScene;
  var beforeShow = FF.renewalBeforeShow;
  FF.renewalBeforeShow = function (screen, params) { routeId++; moving = false; battleUi.reset(); if (screen === 'adventureParty' && FF.app.screen === 'base') { ensure(); save(A.depart(p(), 'home')); } if (beforeShow) beforeShow(screen, params); };
  function p() { return FF.app.state.adventure || A.create(); }
  function save(next) { FF.app.commit(Object.assign({}, FF.app.state, { adventure: next })); }
  function ensure() { if (!p().started) { var n = FF.util.clone(p()); n.started = true; save(n); } }
  function name(id) { return id === 'hero' ? FF.app.state.player.name : T.members[id].name; }
  function text(tag, cls, value) { return E(tag, { class: cls, rich: value }); }
  function btn(label, action, cls, disabled) { return E('button', { class: 'adv-button ' + (cls || ''), text: label, disabled: disabled, attrs: { type: 'button' }, on: { click: action } }); }
  function paint() {
    var main = root.document.getElementById('screen');
    // Keep the decoded background and enemy mounted throughout a battle.
    if (FF.app.screen === 'adventure' && p().battle && main.querySelector('.bt-app')) renderBattle(main);
    else U.rerender();
  }
  // 画面に出す「知らせ」（焚き火で回復・宝箱など）：フィールドの上に、数秒だけ出す。再描画のたびには、出さない
  var pendingBanner = null;
  function change(next) {
    var before = p(); if (next === before) return;
    if (!next.battle && next.notice && next.notice !== before.notice) pendingBanner = next.notice;
    battleUi.observe(before, next);   // 行動の再生・受けたダメージなど、戦闘の画面のしたく
    save(next); paint();
    if (before.battle || next.battle) root.scrollTo(0, 0);
  }
  function open() { ensure(); U.show('adventure'); }
  function departHome() { ensure(); save(A.depart(p(), 'home')); open(); }
  function home() { routeId++; moving = false; battleUi.reset(); save(A.depart(p(), 'home')); U.show('base'); }
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
    var dmg = SH.stats(id).damage; return I.power.replace('{n}', dmg).replace('{b}', dmg - SH.baseDamage());
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
  // 持っている個数と、装備している人たち（同じ品物を、何個も持てる。判断381）
  function holderBadge(kind, itemId) {
    var hs = SH.holders(FF.app.state, kind, itemId), n = SH.copies(FF.app.state, kind, itemId), free = n - hs.length;
    var parts = [E('span', { class: 'inv-count-tag', text: '持っている：' + n + '個' })];
    if (!hs.length) parts.push(E('span', { class: 'inv-holder is-nobody', rich: I.nobody }));
    hs.forEach(function (h) { parts.push(E('span', { class: 'inv-holder' }, [E('span', { class: 'adv-portrait inv-holder-icon' }, FF.adventureArt(h, true)), text('strong', '', name(h))])); });
    if (hs.length && free > 0) parts.push(E('span', { class: 'inv-holder is-nobody', text: '（あまり ' + free + '個）' }));
    return E('span', { class: 'inv-holders' }, parts);
  }
  // ある人の、武器（防具）を選ぶ
  function openPicker(memberId, kind) {
    var s = FF.app.state, cur = SH.equippedOf(s, memberId)[kind], close = null;
    var list = E('div', { class: 'inv-pick-list' }, SH.owned(s, kind).map(function (id) {
      var hs = SH.holders(s, kind, id), free = SH.copies(s, kind, id) - hs.length, h = hs[hs.length - 1];
      return E('button', { class: 'rn-button inv-pick' + (id === cur ? ' is-current' : ''), attrs: { type: 'button', 'data-item': id }, on: { click: function () { close(); equipFlow(memberId, kind, id); } } }, [
        E('strong', { rich: itemMarkup(kind, id) }), E('small', { rich: itemPower(kind, id) }),
        E('small', { class: 'inv-pick-holder', text: (SH.copies(s, kind, id) > 1 ? '×' + SH.copies(s, kind, id) + '　' : '') + (hs.indexOf(memberId) >= 0 ? '◎' : (free <= 0 && h ? U.plain(I.equippedBy) + name(h) : '')) })
      ]);
    }));
    var buttons = [{ label: U.T('back'), class: 'ghost' }];
    if (cur) buttons.unshift({ label: I.remove, class: 'ghost', onClick: function () { removeGear(memberId, kind); } });
    close = U.modal({ title: name(memberId) + '　' + U.plain(I.gearLabel[kind]), body: list, buttons: buttons });
  }
  // ある品物を、だれが装備するかを選ぶ
  function openAssign(kind, itemId) {
    var close = null, s = FF.app.state, hs = SH.holders(s, kind, itemId), h = hs.length === 1 ? hs[0] : null;
    var list = E('div', { class: 'inv-pick-list' }, squadIds().map(function (id) {
      var cur = SH.equippedOf(s, id)[kind];
      return E('button', { class: 'rn-button inv-pick' + (hs.indexOf(id) >= 0 ? ' is-current' : ''), attrs: { type: 'button', 'data-member': id }, on: { click: function () { close(); equipFlow(id, kind, itemId); } } }, [
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
        var hs = SH.holders(s, invTab, id), h = hs.length === 1 ? hs[0] : null, d = itemDef(invTab, id), locked = !!p().battle;
        panel.appendChild(E('article', { class: 'inv-row', attrs: { 'data-item': id } }, [
          E('span', { class: 'inv-ico', text: d.icon }),
          E('div', { class: 'inv-info' }, [E('strong', { rich: d.name }), E('span', { class: 'inv-power', rich: itemPower(invTab, id) }), holderBadge(invTab, id)]),
          E('div', { class: 'inv-actions' }, [
            btn(hs.length && SH.copies(s, invTab, id) - hs.length <= 0 ? I.change : I.equip, function () { openAssign(invTab, id); }, 'quiet inv-equip', locked),
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
    if (locked) main.appendChild(E('div', { class: 'adv-toolbar' }, [text('span', '', T.partyLocked)]));   // 持ち物は、下のナビから（編成画面には、ボタンを置かない）
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
  // ランダムエンカウントの乱数（テストでは、FF.adventureRng で差しかえる）
  function wildRng() { return (FF.adventureRng || Math.random)(); }
  // Canvas の表示のときの「旅人」の代わり（walk は、旅人の要素を直接さわるので、同じ名前のメソッドを持つ入れ物を渡す）
  function cvTraveler() {
    var o = { style: {}, classList: { add: function (c) { if (c === 'is-walking' && cv) cv.setWalking(true); }, remove: function (c) { if (c === 'is-walking' && cv) cv.setWalking(false); } }, setAttribute: function () {} };
    Object.defineProperty(o, 'isConnected', { get: function () { return !!cv && cv.canvas.isConnected; } });
    return o;
  }
  function walk(target, forced) {
    if (moving || p().battle) return;
    if (!forced && A.same(target, A.PLACES.home) && A.same(p().pos, target)) { home(); return; }
    var steps = forced || A.path(p(), target);
    if (!steps.length) { U.toast('そこへは道がつながっていない。峠の敵や、ほかの道をたしかめよう。'); return; }
    var token = ++routeId, viewport = root.document.querySelector('.adv-map-viewport'), cvNow = !!cv && viewport.classList.contains('adv-cv'), traveler = cvNow ? cvTraveler() : viewport.querySelector('.adv-traveler'), map = cvNow ? viewport : viewport.querySelector('.adv-map'), hdNow = viewport.classList.contains('hd2d');
    moving = true; traveler.classList.add('is-walking');
    function finish() { moving = false; traveler.classList.remove('is-walking'); }
    function step() {
      if (token !== routeId || !traveler.isConnected || FF.app.screen !== 'adventure' || p().battle || !steps.length) { finish(); return; }
      var pos = steps.shift(), old = p(), next = pos.via ? advanceDiag(old, pos) : A.move(old, pos.x, pos.y, wildRng);
      if (next === old) { finish(); return; }
      if (cvNow) cv.face(next.facing, pos.via ? { dx: pos.x - old.pos.x, dy: pos.y - old.pos.y } : null);
      var diagArt = pos.via ? scene.travelerDiag(FF.app.state.player.avatar) : null;   // ななめ向きの絵があれば、それを使う
      if (diagArt) {
        traveler.style.backgroundImage = 'url("' + diagArt + '")';
        traveler.style.backgroundPosition = (pos.x > old.pos.x ? 'right' : 'left') + ' ' + (pos.y < old.pos.y ? 'bottom' : 'top');   // 左前＝左上・右前＝右上・左後ろ＝左下・右後ろ＝右下
      } else {
        traveler.style.backgroundImage = 'url("' + scene.traveler(FF.app.state.player.avatar) + '")';
        traveler.style.backgroundPosition = ({down:'left top',up:'right top',left:'left bottom',right:'right bottom'})[next.facing];
      }
      traveler.setAttribute('data-facing', next.facing);
      traveler.setAttribute('data-diag', diagArt ? '1' : '0');
      traveler.setAttribute('data-lean', pos.via && !diagArt ? (pos.x > old.pos.x ? '1' : '-1') : '0');   // ななめの絵がないときだけ、進む側へかたむけて見せる
      var sx = old.pos.x * 72 + 36, sy = old.pos.y * 72 + 40, ex = next.pos.x * 72 + 36, ey = next.pos.y * 72 + 40;
      var scale = map.clientWidth / (A.MAP[0].length * 72), cx = viewport.scrollLeft, cy = viewport.scrollTop;
      var tx = Math.max(0, Math.min(viewport.scrollWidth - viewport.clientWidth, ex * scale - viewport.clientWidth / 2));
      var ty = Math.max(0, Math.min(viewport.scrollHeight - viewport.clientHeight, ey * scale - viewport.clientHeight / 2));
      var last = null, elapsed = 0, duration = root.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : cvNow ? (held ? 280 : 360) * Math.hypot(next.pos.x - old.pos.x, next.pos.y - old.pos.y) : (held ? 210 : 300);   // Canvas は、少しゆっくり（斜めは、距離のぶん長く）
      function frame(time) {
        if (token !== routeId || !traveler.isConnected || FF.app.screen !== 'adventure') { finish(); return; }
        if (last !== null) elapsed += Math.min(34, Math.max(0, time - last));
        last = time;
        var fraction = duration ? Math.min(1, elapsed / duration) : 1;
        if (cvNow) cv.setHero(old.pos.x + (next.pos.x - old.pos.x) * fraction, old.pos.y + (next.pos.y - old.pos.y) * fraction);
        else if (!hdNow) { traveler.style.left = (sx + (ex - sx) * fraction) / (A.MAP[0].length * 72) * 100 + '%'; traveler.style.top = (sy + (ey - sy) * fraction) / (A.MAP.length * 72) * 100 + '%'; }
        if (cvNow) { /* 上で描いた */ }
        else if (hdNow) {
          hdPlace(map, sx + (ex - sx) * fraction, sy + (ey - sy) * fraction);
        } else { viewport.scrollLeft = cx + (tx - cx) * fraction; viewport.scrollTop = cy + (ty - cy) * fraction; }
        if (fraction < 1) { root.requestAnimationFrame(frame); return; }
        if (!steps.length && held && !next.battle && !next.notice) { var more = holdStep(held, next); if (more) steps.push(more); }   // 指を離すまで、つぎの1マスを足していく
        if (steps.length && !next.battle && !next.notice) FF.app.state = Object.assign({}, FF.app.state, { adventure: next }); else save(next);   // 道の途中は、保存・画面の更新をしない（重いので）。着いたとき・戦闘や知らせのときに保存
        if (hdNow) syncTrees(map, ex, ey);
        map.querySelectorAll('.adv-tile.current').forEach(function(cell) {cell.classList.remove('current');cell.removeAttribute('aria-current');});
        var cell = map.querySelector('[data-x="' + next.pos.x + '"][data-y="' + next.pos.y + '"]');
        if (cell) {cell.classList.add('current');cell.setAttribute('aria-current','location');}
        if (!next.battle && A.same(next.pos, A.PLACES.home)) { finish(); U.show('base'); return; }
        if (next.battle || next.notice) { held = null; if (next.notice && !next.battle) pendingBanner = next.notice; finish(); paint(); return; }
        root.document.querySelectorAll('.adv-settings,.adv-notice').forEach(function(node) {node.remove();});
        if (steps.length) step(); else finish();
      }
      root.requestAnimationFrame(frame);
    }
    step();
  }

  // ---- HD-2D 風の表示（試作。判断367）：地面を傾け、木・人物・敵は立てた絵。カメラは、主人公の位置を --cx/--cy で追う ----
  // 表示の種類（判断387）：'canvas' ＝ Canvas で描く斜め見下ろし／'css' ＝ CSS の3D で傾ける HD-2D（判断367）／'flat' ＝ これまでの見下ろし。config.ADVENTURE_FIELD（なければ ADVENTURE_HD2D）で、はじめの表示を決める
  // Canvas の絵は、起動のあと、手があいたときに先に読んでおく（冒険の画面を開いたとき、待たせない。判断390）
  if (FF.ui.fieldCanvas && root.setTimeout) root.setTimeout(function () { var go = function () { try { FF.ui.fieldCanvas.preload(A.MAP); } catch (e) { /* 先読みだけ。なくてもよい */ } }; if (root.requestIdleCallback) root.requestIdleCallback(go, { timeout: 4000 }); else go(); }, 1500);
  var fieldMode = null, treeUrls = null, cv = null, cvQuality = 'std';
  function mode() { if (!fieldMode) fieldMode = root.FF_FIELD_MODE || (FF.config && FF.config.ADVENTURE_FIELD) || (FF.config && FF.config.ADVENTURE_HD2D === false ? 'flat' : 'css'); return fieldMode; }
  function isHd() { return mode() === 'css' && !overview; }
  function isCv() { return mode() === 'canvas' && !!FF.ui.fieldCanvas; }
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
    var cols = A.MAP[0].length, rows = A.MAP.length;
    for (var x = -1; x <= cols; x++) { list.push([x, -1]); list.push([x, rows]); }
    for (var y = 0; y < rows; y++) { list.push([-1, y]); list.push([cols, y]); }
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
    map.style.setProperty('--cols', A.MAP[0].length); map.style.setProperty('--rows', A.MAP.length);
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
    map.appendChild(E('span', { class: 'adv-traveler leader', style: { backgroundImage: 'url("' + scene.traveler(FF.app.state.player.avatar) + '")', backgroundPosition: ({down:'left top',up:'right top',left:'left bottom',right:'right bottom'})[n.facing], left: (n.pos.x * 72 + 36) / (A.MAP[0].length * 72) * 100 + '%', top: (n.pos.y * 72 + 40) / (A.MAP.length * 72) * 100 + '%' }, attrs: { role: 'img', 'aria-label': C.current, 'data-sprite': scene.traveler(FF.app.state.player.avatar), 'data-avatar': FF.app.state.player.avatar || 'e1', 'data-facing': n.facing, draggable: 'false' } }, [E('span', { class: 'adv-lean', attrs: { 'aria-hidden': 'true' } }, ['body','leg-left','leg-right'].map(function(part) {return E('span',{class:'adv-walk-part adv-walk-' + part,attrs:{'aria-hidden':'true'}});}))]));
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
      mode() === 'canvas' && !overview ? btn(C.quality[cvQuality], function () { cvQuality = cvQuality === 'std' ? 'high' : cvQuality === 'high' ? 'low' : 'std'; if (cv) cv.setQuality(cvQuality); this.textContent = C.quality[cvQuality]; }, 'quiet adv-quality-toggle') : null,
      btn(C.fieldMode[mode()], function () { routeId++; moving = false; fieldMode = mode() === 'canvas' ? 'css' : mode() === 'css' ? 'flat' : 'canvas'; overview = false; paint(); }, 'quiet adv-hd-toggle')
    ].filter(Boolean));
  }
  // Canvas の表示（判断387）：地図は FF.adventure のものをそのまま使い、絵だけ描く。タップは、これまでと同じ walk に渡す。読み上げ用に、行き先のボタンを重ねる（見えない）
  function canvasViewport() {
    var n = p(), host = E('div', { class: 'adv-map-viewport adv-cv' }), places = ['home', 'camp', 'chest', 'town'];
    var labels = { home: T.home, camp: T.camp, town: T.town };
    var reduced = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cv = FF.ui.fieldCanvas.create(host, { map: A.MAP, places: A.PLACES, boss: A.ENEMIES.boss, hero: n.pos, overview: overview, quality: cvQuality, reduced: reduced, labels: labels, sheet: scene.traveler(FF.app.state.player.avatar), diagSheet: scene.travelerDiag(FF.app.state.player.avatar),
      state: p, onTap: function (cell) { walk(cell); } });
    cv.face(n.facing, null);
    var list = E('div', { class: 'adv-cv-places', attrs: { role: 'group', 'aria-label': T.map } }, places.map(function (k) {
      return E('button', { class: 'adv-cv-place', text: destinationLabel(A.PLACES[k].x, A.PLACES[k].y), attrs: { type: 'button', 'data-place': k }, on: { click: function () { walk(A.PLACES[k]); } } });
    }));
    host.appendChild(list);
    return host;
  }
  function fieldViewport() {
    held = null;   // 戦闘から帰ってきたとき、前の「押している」が残らないように
    if (cv) { cv.destroy(); cv = null; }
    if (isCv()) {
      var cvHost = canvasViewport();
      return E('div', { class: 'adv-map-shell is-cv' + (overview ? ' is-overview' : '') }, [cvHost, E('div', { class: 'adv-compass', text: 'N ↑', attrs: { 'aria-hidden': true } }), fieldBar(), directions()]);
    }
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
  // ---- 移動パッド（8方向）：押したまま指を動かすと、その方角へ歩き続ける。ちょん、と押せば1マス ----
  var held = null, padStamp = 0;   // held：押している方角 [dx, dy]
  var PAD_DIRS = [[0, -1, '↑', '北へ'], [-1, 0, '←', '西へ'], [0, 1, '↓', '南へ'], [1, 0, '→', '東へ']];
  var PAD_DIAG = [[-1, -1, -45], [1, -1, 45], [-1, 1, -135], [1, 1, 135]];   // 上下左右と同じ「↑」を回して、太さと大きさをそろえる
  function dirFromVector(vx, vy, r) {
    if (Math.hypot(vx, vy) < r * .26) return null;
    var k = Math.round(Math.atan2(vy, vx) / (Math.PI / 4));
    return ({ 0: [1, 0], 1: [1, 1], 2: [0, 1], 3: [-1, 1], 4: [-1, 0], '-4': [-1, 0], '-3': [-1, -1], '-2': [0, -1], '-1': [1, -1] })[k] || null;
  }
  // いまの状態から、その方角へ進む1歩。ななめは、両どなりが歩けるときだけ。ふさがれていたら、歩ける向きへ、かべづたいに進む
  function holdStep(d, state) {
    var n = state || p(), x = n.pos.x, y = n.pos.y;
    if (n.battle) return null;
    function ok(tx, ty) { return A.walkable({ x: tx, y: ty }) && !(tx > 8 && n.cleared.indexOf('boss') < 0); }
    if (d[0] && d[1]) {
      if (ok(x + d[0], y + d[1]) && ok(x + d[0], y) && ok(x, y + d[1])) return { x: x + d[0], y: y + d[1], via: { x: x + d[0], y: y } };
      d = ok(x + d[0], y) ? [d[0], 0] : ok(x, y + d[1]) ? [0, d[1]] : null;
      if (!d) return null;
    }
    return ok(x + d[0], y + d[1]) ? { x: x + d[0], y: y + d[1] } : null;
  }
  // ななめの1歩 ＝ 横へ1歩、たてへ1歩（途中で戦闘・宝箱などが起きたら、そこで止まる）
  function advanceDiag(old, pos) {
    var a = A.move(old, pos.via.x, pos.via.y, wildRng);
    if (a === old || a.battle || a.notice) return a;
    var b = A.move(a, pos.x, pos.y, wildRng);
    if (b === a) return a;
    b.facing = pos.y < old.pos.y ? 'up' : 'down';   // ななめ用の絵はないので、手前向き・奥向きの絵を、進む側へかたむけて使う
    return b;
  }
  function directions() {
    var pad = E('div', { class: 'adv-directions', attrs: { 'aria-label': '移動パッド' } }), parts = {}, knob = E('span', { class: 'adv-knob', attrs: { 'aria-hidden': 'true' } });
    // 矢印は、同心円の輪の上に、45度ずつならべる
    function ringStyle(dx, dy) { var m = Math.hypot(dx, dy); return { left: 50 + dx / m * 37 + '%', top: 50 + dy / m * 37 + '%' }; }
    PAD_DIRS.forEach(function (d) {
      var b = btn(d[2], function () {
        if (root.performance.now() - padStamp < 700) return;   // 指で押したときは、下の pointer の処理で動いている（二重に歩かない）
        var pos = p().pos; if (A.walkable({ x: pos.x + d[0], y: pos.y + d[1] })) walk({ x: pos.x + d[0], y: pos.y + d[1] });
      }, 'quiet');
      b.setAttribute('aria-label', d[3]); Object.assign(b.style, ringStyle(d[0], d[1])); parts[d[0] + ',' + d[1]] = b; pad.appendChild(b);
    });
    PAD_DIAG.forEach(function (d) {
      var m = E('span', { class: 'adv-diag', attrs: { 'aria-hidden': 'true' } }), g = E('span', { class: 'adv-diag-glyph', text: '↑' });
      g.style.transform = 'rotate(' + d[2] + 'deg)'; m.appendChild(g);
      Object.assign(m.style, ringStyle(d[0], d[1])); parts[d[0] + ',' + d[1]] = m; pad.appendChild(m);
    });
    pad.appendChild(knob);
    function show(d, v) {
      Object.keys(parts).forEach(function (k) { parts[k].classList.toggle('on', !!d && k === d[0] + ',' + d[1]); });
      var m = v ? Math.min(1, v.R * .5 / Math.max(1, Math.hypot(v.vx, v.vy))) : 0;
      knob.style.transform = v ? 'translate(' + v.vx * m + 'px,' + v.vy * m + 'px)' : '';
      knob.classList.toggle('on', !!v);
    }
    function aim(e) {
      var r = pad.getBoundingClientRect(), R = r.width / 2, v = { vx: e.clientX - (r.left + R), vy: e.clientY - (r.top + R), R: R };
      held = dirFromVector(v.vx, v.vy, R); show(held, v);
      if (held && !moving && !p().battle) { var st = holdStep(held); if (st) walk(st, [st]); }
    }
    function stop() { held = null; show(null, null); }
    pad.addEventListener('pointerdown', function (e) { padStamp = root.performance.now(); try { pad.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); aim(e); });
    pad.addEventListener('pointermove', function (e) { if (held || (e.buttons && e.pointerType === 'mouse') || pad.hasPointerCapture && pad.hasPointerCapture(e.pointerId)) { padStamp = root.performance.now(); aim(e); } });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { pad.addEventListener(t, stop); });
    return pad;
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
    var banner = pendingBanner; pendingBanner = null;
    if (banner && banner !== 'arrival' && T.notices[banner]) {
      var shell = main.querySelector('.adv-map-shell');
      if (shell) {
        var node = E('div', { class: 'adv-field-banner ' + banner, attrs: { role: 'status' } }, [text('strong', '', T.notices[banner])]);
        shell.appendChild(node); root.setTimeout(function() { node.remove(); }, 4800);
      } else main.appendChild(text('p', 'adv-notice', T.notices[banner]));
    }
    if (A.atTown(n)) main.appendChild(settings());
    main.appendChild(text('p', 'adv-record', '冒険の学習記録：' + n.answered + '問 · 正解 ' + n.correct + '問（熱量・問題チケットとは別の記録）'));
  }
  // 武器・防具を、ひとりひとりの攻撃・防御に足す（判断343・359）
  function gear() { return FF.shop ? FF.shop.gearMap(FF.app.state) : {}; }
  function advance() {
    var old = p(), next = A.advance(old, FF.app.bank, grade(), Math.random, FF.app.now(), gear(), FF.research ? FF.research.effects(FF.app.state) : {});
    if (next === old) { U.toast(T.noQuestion); return; } change(next);
  }
  // 戦闘の画面は、js/ui/adventure-battle.js（判断394）。ここは、状態の保存と、画面の切りかえだけ渡す
  function renderBattle(main) { FF.ui.adventureBattle.render(main); }
  battleUi.init({ p: p, change: change, advance: advance, paint: paint, name: name, grade: grade });
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
