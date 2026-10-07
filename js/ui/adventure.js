// 雪原の冒険の画面。既存の問題バンク・保存・図の表示を使う。
(function (root) {
  'use strict';
  var FF = root.FF, A = FF.adventure, U = FF.ui, T = FF.texts.adventure, B = FF.balance.ADVENTURE;
  var E = U.el, moving = false, routeId = 0, trail = [], entering = false, overview = false, orders = {}, orderKey = null, actor = null;
  var C = T.scenery, scene = FF.adventureScene;
  var beforeShow = FF.renewalBeforeShow;
  FF.renewalBeforeShow = function (screen, params) { routeId++; moving = false; if (beforeShow) beforeShow(screen, params); };
  function p() { return FF.app.state.adventure || A.create(); }
  function save(next) { FF.app.commit(Object.assign({}, FF.app.state, { adventure: next })); }
  function ensure() { if (!p().started) { var n = FF.util.clone(p()); n.started = true; save(n); } }
  function name(id) { return id === 'hero' ? FF.app.state.player.name : T.members[id].name; }
  function text(tag, cls, value) { return E(tag, { class: cls, rich: value }); }
  function btn(label, action, cls, disabled) { return E('button', { class: 'adv-button ' + (cls || ''), text: label, disabled: disabled, attrs: { type: 'button' }, on: { click: action } }); }
  function paint() { U.rerender(); }
  function change(next) { if (next === p()) return; save(next); paint(); }
  function open() { ensure(); U.show('adventure'); }
  function grade() { return FF.app.state.player.grade || 1; }
  function header(main, title, subtitle) {
    main.appendChild(E('header', { class: 'adv-heading' }, [E('div', {}, [text('p', 'adv-eyebrow', 'FROZEN FRONTIER · 冒険の試作'), text('h1', '', title), text('p', 'adv-subtitle', subtitle)]), btn(T.back, function () { routeId++; moving = false; U.show('base'); }, 'quiet')]));
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
    return E('section', { class: 'adv-entry' }, [
      E('div', { class: 'adv-entry-symbol', attrs: { 'aria-hidden': true }, text: '✦' }),
      E('div', {}, [text('small', '', T.subtitle), text('h2', '', T.title), text('p', '', T.entry)]),
      btn(p().started ? T.resume : T.start, open, 'gold'), btn(T.party, function () { U.show('adventureParty'); }, 'quiet')
    ]);
  };
  function renderParty(main) {
    ensure(); header(main, T.party, T.partyHelp);
    var locked = !!p().battle || !A.atTown(p());
    main.appendChild(E('div', { class: 'adv-toolbar' }, [btn(T.depart, open, 'gold'), text('span', '', locked ? T.partyLocked : '町で、仲間が出発を待っている。')]));
    var grid = E('div', { class: 'adv-roster' });
    A.IDS.forEach(function (id) {
      var d = T.members[id], r = p().roster[id], s = A.stats(id, r.xp), index = p().party.indexOf(id), card = E('section', { class: 'adv-roster-card' });
      card.appendChild(member(id, false));
      card.appendChild(text('blockquote', '', '「' + d.quote + '」'));
      card.appendChild(text('p', 'adv-description', d.detail));
      var stats = E('dl', { class: 'adv-stats' });
      ['strength', 'defense', 'speed', 'wisdom'].forEach(function (k) { stats.appendChild(E('div', {}, [text('dt', '', T.stats[k]), E('dd', { text: s[k] })])); });
      card.appendChild(stats);
      card.appendChild(text('p', 'adv-xp', s.level >= B.MAX_LEVEL ? 'Lv.MAX · 経験値 ' + r.xp : '経験値 ' + r.xp + ' · 次のレベルまで ' + (B.XP_STEP * s.level * s.level - r.xp)));
      card.appendChild(E('div', { class: 'adv-card-actions' }, [
        text('span', 'adv-pill', index >= 0 ? (index + 1) + ' · ' + T.joined : T.waiting),
        btn(index >= 0 ? T.remove : T.join, function () { var list = p().party.slice(); if (index >= 0) list.splice(index, 1); else list.push(id); change(A.setParty(p(), list)); }, 'quiet', locked || id === 'hero'),
        btn(T.front, function () { var list = p().party.slice(); var old = list[index - 1]; list[index - 1] = id; list[index] = old; change(A.setParty(p(), list)); }, 'quiet', locked || index <= 0)
      ]));
      grid.appendChild(card);
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
    var steps = A.path(p(), target);
    if (!steps.length) { U.toast('そこへは道がつながっていない。峠の敵や、ほかの道をたしかめよう。'); return; }
    var token = ++routeId; moving = true;
    function step() {
      if (token !== routeId || FF.app.screen !== 'adventure' || p().battle || !steps.length) { moving = false; return; }
      var pos = steps.shift(), old = p(), next = A.move(old, pos.x, pos.y);
      if (next === old) { moving = false; return; }
      trail.unshift(old.pos); trail = trail.slice(0, 3);
      if (next.battle) entering = true;
      save(next);
      if (next.battle || !steps.length || next.notice) { moving = false; steps = []; }
      paint();
      if (moving) root.setTimeout(step, 135);
    }
    step();
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
    n.party.slice().reverse().forEach(function(id, rev) {
      var i = n.party.length - 1 - rev, pos = i ? trail[i - 1] : n.pos;
      var x = pos ? pos.x * 72 + 36 : n.pos.x * 72 + 36 + i * 13;
      var y = pos ? pos.y * 72 + 40 : n.pos.y * 72 + 40 - i * 7;
      map.appendChild(E('img', { class: 'adv-traveler' + (!i ? ' leader' : ''), style: { left: x / 936 * 100 + '%', top: y / 648 * 100 + '%' }, attrs: { src: scene.traveler(id), alt: i ? name(id) : C.current, draggable: 'false' } }));
    });
    return map;
  }
  function fieldViewport() {
    var viewport = E('div', { class: 'adv-map-viewport' + (overview ? ' overview' : '') }, mapView());
    var shell = E('div', { class: 'adv-map-shell' }, [viewport,
      E('div', { class: 'adv-compass', text: 'N ↑', attrs: { 'aria-hidden': true } }),
      btn(overview ? C.follow : C.map, function () { overview = !overview; paint(); }, 'adv-map-toggle'), directions()]);
    root.requestAnimationFrame(function () {
      if (!viewport.isConnected || overview) return;
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
    header(main, C.region, C.chapter);
    main.appendChild(E('div', { class: 'adv-toolbar' }, [text('strong', 'adv-quest', n.arrived ? T.routeDone : T.route), text('span', 'adv-gold', n.gold + ' G'), btn(T.party, function () { routeId++; moving = false; U.show('adventureParty'); }, 'quiet')]));
    if (n.notice === 'arrival') main.appendChild(E('section', { class: 'adv-arrival', attrs: { role: 'status' } }, [text('p', 'adv-eyebrow', 'CHAPTER 01 · COMPLETE'), text('h2', '', T.arrivalTitle), text('p', '', T.arrivalText), text('p', '', T.arrivalNext)]));
    var layout = E('div', { class: 'adv-field-layout' }), board = E('section', { class: 'adv-board' });
    board.appendChild(E('div', { class: 'adv-map-caption' }, [text('strong', '', 'はじまりの雪原'), text('span', '', '西の町 → 東の集落')]));
    board.appendChild(fieldViewport()); board.appendChild(text('p', 'adv-map-help', C.fieldHelp));
    layout.appendChild(board);
    var side = E('aside', { class: 'adv-travel-panel' });
    side.appendChild(text('h2', '', '旅の仲間')); side.appendChild(team());
    side.appendChild(text('p', 'adv-field-help', T.fieldHelp));
    var heal = E('div', { class: 'adv-supplies' }, [text('strong', '', T.potion + ' × ' + n.potions)]);
    var target = E('select', { attrs: { 'aria-label': '回復薬を使う仲間' } }, n.party.map(function (id) { return E('option', { value: id, text: name(id) }); }));
    heal.appendChild(target); heal.appendChild(btn(T.usePotion, function () { change(A.potion(p(), target.value)); }, 'quiet', !n.potions)); side.appendChild(heal);
    side.appendChild(btn(T.returnTown, function () { routeId++; moving = false; trail = []; change(A.rest(p(), p().lastTown)); }, 'quiet'));
    side.appendChild(text('small', '', T.goldHelp));
    layout.appendChild(side); main.appendChild(layout);
    if (n.notice && T.notices[n.notice]) main.appendChild(text('p', 'adv-notice', T.notices[n.notice]));
    if (A.atTown(n)) main.appendChild(settings());
    main.appendChild(text('p', 'adv-record', '冒険の学習記録：' + n.answered + '問 · 正解 ' + n.correct + '問（熱量・問題チケットとは別の記録）'));
  }
  function intention() {
    var plan = A.intent(p());
    if (!plan || !plan.target) return '';
    if (plan.all) return '次の攻撃：吹雪の息 → 仲間全員';
    return '次の攻撃：' + (plan.heavy ? '身を低くして、強い一撃' : 'ひっかき攻撃') + ' → ' + name(plan.target);
  }
  function prepareOrders() {
    var n = p(), key = n.battle.enemy + ':' + n.battle.turn;
    if (orderKey !== key) { orders = {}; A.alive(n).forEach(function(id) { orders[id] = { type: 'attack', target: id }; }); actor = A.alive(n)[0]; orderKey = key; }
    if (A.alive(n).indexOf(actor) < 0) actor = A.alive(n)[0];
  }
  function battleStats() {
    return E('div', { class: 'adv-rpg-stats', attrs: { 'aria-label': T.party } }, p().party.map(function(id) {
      var r = p().roster[id], st = A.stats(id, r.xp), active = p().battle.phase === 'commands';
      var card = btn('', function() { actor = id; paint(); }, 'adv-status' + (active && actor === id ? ' selected' : '') + (!r.hp ? ' is-down' : ''), !active || !r.hp);
      card.setAttribute('aria-label', name(id) + C.selected); card.setAttribute('aria-pressed', active && actor === id ? 'true' : 'false');
      card.appendChild(text('strong', '', name(id)));card.appendChild(E('small', { text: 'Lv ' + st.level }));
      card.appendChild(E('span', { text: 'HP ' + r.hp }));card.appendChild(meter(r.hp,st.hp,'hp',name(id)+' HP'));
      card.appendChild(E('span', { text: 'MP ' + r.mp }));card.appendChild(meter(r.mp,st.mp,'mp',name(id)+' MP'));return card;
    }));
  }
  function commandPanel() {
    var n = p(), panel = E('section', { class: 'adv-command-panel' }), menu = E('nav', { class: 'adv-command-menu', attrs: { 'aria-label': T.command } });
    menu.appendChild(text('strong', 'adv-menu-actor', name(actor)));
    [['attack',T.fight],['magic',T.magic],['item',T.item],['escape',T.escape]].forEach(function(entry) {
      var type = entry[0], disabled = type === 'magic' && n.roster[actor].mp < B.MAGIC_COST || type === 'item' && !n.potions;
      menu.appendChild(btn(entry[1], function() { if(type === 'escape') { orderKey = null; trail = []; change(A.retreat(p())); } else { orders[actor].type = type; paint(); } }, 'adv-command' + (orders[actor].type === type ? ' chosen' : ''), disabled));
    });
    var dialogue = E('div', { class: 'adv-command-dialogue' }, [text('p', 'adv-encounter-text', C.encounter.replace('{name}',T.enemies[n.battle.enemy].name)), text('p','adv-help',C.actorHelp)]);
    var action = orders[actor].type;
    dialogue.appendChild(text('p','adv-action-description', action === 'magic' ? T.members[actor].magic + ' · ' + C.magic : action === 'item' ? C.item : C.attack));
    if (action === 'item' || action === 'magic' && actor === 'rin') {
      dialogue.appendChild(setting(C.target, n.party.map(function(id) {return {id:id,name:name(id)};}), orders[actor].target, function(id){orders[actor].target=id;}));
    }
    var summary = E('div',{class:'adv-order-summary',attrs:{'aria-label':C.ready}});
    A.alive(n).forEach(function(id){summary.appendChild(btn(name(id) + ' · ' + ({attack:T.fight,magic:T.magic,item:T.item})[orders[id].type],function(){actor=id;paint();},'adv-order-chip' + (id === actor ? ' selected' : '')));});
    dialogue.appendChild(summary);
    dialogue.appendChild(btn(T.begin, function () {
      var before = p(), next = A.command(before, orders, FF.app.bank, grade(), Math.random, FF.app.now());
      if (next === before) { U.toast(A.pick(FF.app.bank, before, grade(), Math.random, FF.app.now()) ? T.noOrders : T.noQuestion); return; }
      orderKey = null; change(next);
    }, 'gold'));
    panel.appendChild(menu); panel.appendChild(dialogue); return panel;
  }
  function questionPanel() {
    var b = p().battle, q = b.question, active = b.phase === 'attack' || b.phase === 'defense', panel = E('section', { class: 'adv-question-panel' });
    if (!q) return panel;
    panel.appendChild(text('p', 'adv-eyebrow', active ? (b.phase === 'attack' ? T.attackQuiz : T.defenseQuiz) : (b.correct ? T.good : T.wrong)));
    panel.appendChild(text('h2', 'adv-question', q.question));
    if (q.diagram && FF.lessonFigure) panel.appendChild(FF.lessonFigure.render(q.diagram));
    if (active) {
      panel.appendChild(text('p', 'adv-help', b.phase === 'attack' ? T.attackHelp : T.defenseHelp));
      if (q.answerType === 'choice') {
        panel.appendChild(E('div', { class: 'adv-choices' }, b.choices.map(function (choice, i) {
          var button = btn('', function () { change(A.answer(p(), choice, FF.app.now())); }, 'adv-answer');
          button.appendChild(E('span', { class: 'adv-choice-letter', text: ['A', 'B', 'C', 'D'][i] })); button.appendChild(U.rich(choice)); return button;
        })));
      } else {
        var input = E('input', { attrs: { 'aria-label': '答え', autocomplete: 'off' } });
        var form = E('form', { class: 'adv-input', on: { submit: function (event) { event.preventDefault(); change(A.answer(p(), input.value, FF.app.now())); } } }, [input, E('button', { class: 'adv-button gold', attrs: { type: 'submit' }, text: T.submit })]); panel.appendChild(form);
      }
      if (q.hints && q.hints.length) {
        panel.appendChild(btn(T.hint, function () { var n = FF.util.clone(p()); n.battle.hints = Math.min(q.hints.length, (n.battle.hints || 0) + 1); change(n); }, 'quiet', b.hints >= q.hints.length));
        q.hints.slice(0, b.hints || 0).forEach(function (hint) { panel.appendChild(text('p', 'adv-hint', hint)); });
      }
      panel.appendChild(btn('戦闘からにげる', function () { trail = []; change(A.retreat(p())); }, 'quiet'));
    } else {
      panel.appendChild(E('div', { class: 'adv-feedback ' + (b.correct ? 'correct' : 'wrong'), attrs: { role: 'status' } }, [text('strong', '', T.answer + '：' + FF.learning.displayAnswer(q)), text('p', '', q.explanation)]));
    }
    return panel;
  }
  function advance() {
    var old = p(), next = A.advance(old, FF.app.bank, grade(), Math.random, FF.app.now());
    if (next === old) { U.toast(T.noQuestion); return; } change(next);
  }
  function renderBattle(main) {
    var n = p(), b = n.battle, d = T.enemies[b.enemy], done = b.phase === 'win' || b.phase === 'lose';
    main.classList.add('adv-battle-screen');
    if (b.phase === 'commands') prepareOrders();
    header(main, C.region, T.scenery.turn + ' ' + b.turn + ' · ' + d.rank);
    var shell = E('div', { class: 'adv-rpg-shell' + (entering ? ' encounter' : '') }); entering = false; main.appendChild(shell); main = shell;
    main.appendChild(battleStats());
    var stage = E('section', { class: 'adv-battle-stage ' + b.enemy, attrs: { 'aria-label': d.name } }, [
      E('div', { class: 'adv-enemy-nameplate' }, [text('strong', '', d.name), E('span', { class: 'adv-enemy-hp', text: 'HP ' + b.hp + ' / ' + B.ENEMIES[b.enemy].hp }), meter(b.hp, B.ENEMIES[b.enemy].hp, 'enemy-hp', '敵のHP')]),
      E('div', { class: 'adv-enemy-art' }, scene.enemy(b.enemy)),
      !done ? text('p', 'adv-intent', intention()) : null
    ]);
    main.appendChild(stage);
    if (b.phase === 'commands') main.appendChild(commandPanel());
    else main.appendChild(questionPanel());
    if (b.log.length) main.appendChild(E('ol', { class: 'adv-battle-log', attrs: { 'aria-label': '戦闘の記録', 'aria-live': 'polite' } }, b.log.map(function (line) { return text('li', '', T.logs[line.key].replace('{name}', name(line.who)).replace('{n}', line.amount)); })));
    if (b.phase === 'win') {
      var reward = b.reward;
      main.appendChild(E('section', { class: 'adv-result win' }, [text('p', 'adv-eyebrow', 'VICTORY'), text('h2', '', T.victory),
        E('div', { class: 'adv-reward', text: '+' + reward.xp + ' EXP / 人　 +' + reward.gold + ' G' }), text('p', '', T.rewardHelp),
        E('div', { class: 'adv-levelups' }, reward.levels.map(function (r) { return text('p', '', '✦ ' + name(r.id) + ' Lv.' + r.level + '　' + T.levelUp); })), btn(T.field, advance, 'gold')
      ]));
    } else if (b.phase === 'lose') main.appendChild(E('section', { class: 'adv-result' }, [text('h2', '', T.defeat), text('p', '', T.defeatHelp), btn('町で休む', advance, 'gold')]));
    else if (b.phase === 'attackResult' || b.phase === 'defenseResult') main.appendChild(btn(b.phase === 'attackResult' ? T.nextDefense : T.nextTurn, advance, 'gold adv-next'));
  }
  U.screens.adventure = { render: function (main) { ensure(); main.classList.add('adventure-screen'); if (p().battle) renderBattle(main); else renderField(main); } };
  U.screens.adventureParty = { render: renderParty };
  root.document.addEventListener('keydown', function (e) {
    if (FF.app.screen !== 'adventure' || p().battle || /INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)) return;
    var delta = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
    if (!delta) return;
    e.preventDefault(); var pos = p().pos;
    if (A.walkable({ x: pos.x + delta[0], y: pos.y + delta[1] })) walk({ x: pos.x + delta[0], y: pos.y + delta[1] });
  });
})(this);
