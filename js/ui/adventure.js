// 雪原の冒険の画面。既存の問題バンク・保存・図の表示を使う。
(function (root) {
  'use strict';
  var FF = root.FF, A = FF.adventure, U = FF.ui, T = FF.texts.adventure, B = FF.balance.ADVENTURE;
  var E = U.el, moving = false, routeId = 0;
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
      save(next);
      if (next.battle || !steps.length || next.notice) { moving = false; steps = []; }
      paint();
      if (moving) root.setTimeout(step, 135);
    }
    step();
  }
  function mapView() {
    var n = p(), map = E('div', { class: 'adv-map', attrs: { role: 'group', 'aria-label': T.map } });
    A.MAP.forEach(function (row, y) {
      row.split('').forEach(function (tile, x) {
        if (tile === '#') {
          map.appendChild(E('div', { class: 'adv-terrain ' + (x === 8 ? 'ridge' : 'pines'), style: { gridColumn: x + 1, gridRow: y + 1 }, attrs: { 'aria-hidden': true }, text: (x + y) % 3 === 0 ? '▲' : '♠' })); return;
        }
        var here = { x: x, y: y }, place = Object.keys(A.PLACES).find(function (k) { return A.same(here, A.PLACES[k]); }), enemy = A.enemyAt(n, here), current = A.same(n.pos, here);
        var cell = E('button', { class: 'adv-tile ' + (place || '') + (enemy ? ' enemy' : '') + (current ? ' current' : ''), style: { gridColumn: x + 1, gridRow: y + 1 },
          attrs: { type: 'button', 'aria-label': destinationLabel(x, y), 'aria-current': current ? 'location' : null, 'data-x': x, 'data-y': y }, on: { click: function () { walk(here); } } });
        if (enemy) { cell.appendChild(FF.adventureArt(enemy, true)); cell.appendChild(E('span', { class: 'adv-threat', text: enemy === 'boss' ? '★★★' : enemy === 'wolf' ? '★★' : '★' })); }
        else if (place) {
          cell.appendChild(E('span', { class: 'adv-place-icon', attrs: { 'aria-hidden': true }, text: place === 'home' || place === 'town' ? '⌂' : place === 'camp' ? '♨' : n.chest ? '◇' : '▣' }));
          cell.appendChild(text('span', 'adv-map-label', T[place]));
        }
        if (current) cell.appendChild(E('span', { class: 'adv-pawn', attrs: { 'aria-label': '現在地' } }, FF.adventureArt('hero', true)));
        map.appendChild(cell);
      });
    });
    return map;
  }
  function directions() {
    return E('div', { class: 'adv-directions', attrs: { 'aria-label': '移動ボタン' } }, [[0, -1, '↑', '北へ'], [-1, 0, '←', '西へ'], [0, 1, '↓', '南へ'], [1, 0, '→', '東へ']].map(function (d) {
      var b = btn(d[2], function () { var pos = p().pos; if (A.walkable({ x: pos.x + d[0], y: pos.y + d[1] })) walk({ x: pos.x + d[0], y: pos.y + d[1] }); }, 'quiet'); b.setAttribute('aria-label', d[3]); return b;
    }));
  }
  function renderField(main) {
    var n = p();
    header(main, T.title, T.subtitle);
    main.appendChild(E('div', { class: 'adv-toolbar' }, [text('strong', 'adv-quest', n.arrived ? T.routeDone : T.route), text('span', 'adv-gold', n.gold + ' G'), btn(T.party, function () { routeId++; moving = false; U.show('adventureParty'); }, 'quiet')]));
    if (n.notice === 'arrival') main.appendChild(E('section', { class: 'adv-arrival', attrs: { role: 'status' } }, [text('p', 'adv-eyebrow', 'CHAPTER 01 · COMPLETE'), text('h2', '', T.arrivalTitle), text('p', '', T.arrivalText), text('p', '', T.arrivalNext)]));
    var layout = E('div', { class: 'adv-field-layout' }), board = E('section', { class: 'adv-board' });
    board.appendChild(E('div', { class: 'adv-map-caption' }, [text('strong', '', 'はじまりの雪原'), text('span', '', '西の町 → 東の集落')]));
    board.appendChild(mapView()); board.appendChild(text('p', 'adv-map-help', T.mapHelp)); board.appendChild(directions());
    layout.appendChild(board);
    var side = E('aside', { class: 'adv-travel-panel' });
    side.appendChild(text('h2', '', '旅の仲間')); side.appendChild(team());
    side.appendChild(text('p', 'adv-field-help', T.fieldHelp));
    var heal = E('div', { class: 'adv-supplies' }, [text('strong', '', T.potion + ' × ' + n.potions)]);
    var target = E('select', { attrs: { 'aria-label': '回復薬を使う仲間' } }, n.party.map(function (id) { return E('option', { value: id, text: name(id) }); }));
    heal.appendChild(target); heal.appendChild(btn(T.usePotion, function () { change(A.potion(p(), target.value)); }, 'quiet', !n.potions)); side.appendChild(heal);
    side.appendChild(btn(T.returnTown, function () { routeId++; moving = false; change(A.rest(p(), p().lastTown)); }, 'quiet'));
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
  function commandPanel() {
    var n = p(), panel = E('section', { class: 'adv-command-panel' }, [text('h2', '', T.command), text('p', 'adv-help', T.commandHelp)]), orders = {}, rows = E('div', { class: 'adv-orders' });
    A.alive(n).forEach(function (id) {
      orders[id] = { type: 'attack', target: id };
      var target = E('select', { disabled: true, attrs: { 'aria-label': name(id) + 'の回復対象' }, on: { change: function () { orders[id].target = target.value; } } }, n.party.map(function (key) { return E('option', { value: key, text: name(key) }); })); target.value = id;
      var select = E('select', { attrs: { 'aria-label': name(id) + 'のコマンド' }, on: { change: function () { orders[id].type = select.value; target.disabled = !(select.value === 'item' || select.value === 'magic' && id === 'rin'); } } }, [
        E('option', { value: 'attack', text: '⚔ ' + T.fight }),
        E('option', { value: 'magic', text: '✦ ' + T.magic + ' · ' + T.members[id].magic + '（3MP）', disabled: n.roster[id].mp < B.MAGIC_COST }),
        E('option', { value: 'item', text: '✚ ' + T.item + ' · 回復薬', disabled: !n.potions })
      ]);
      rows.appendChild(E('div', { class: 'adv-order' }, [text('strong', '', name(id)), select, E('label', { class: 'adv-target' }, [text('small', '', '回復する相手'), target])]));
    });
    panel.appendChild(rows);
    panel.appendChild(E('div', { class: 'adv-actions' }, [btn(T.begin, function () {
      var before = p(), next = A.command(before, orders, FF.app.bank, grade(), Math.random, FF.app.now());
      if (next === before) { U.toast(A.pick(FF.app.bank, before, grade(), Math.random, FF.app.now()) ? T.noOrders : T.noQuestion); return; }
      change(next);
    }, 'gold'), btn(T.escape, function () { change(A.retreat(p())); }, 'quiet'), text('span', '', '回復薬 × ' + n.potions)]));
    return panel;
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
      panel.appendChild(btn('戦闘からにげる', function () { change(A.retreat(p())); }, 'quiet'));
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
    header(main, d.name, 'TURN ' + b.turn + ' · ' + d.rank);
    var stage = E('section', { class: 'adv-battle-stage ' + b.enemy }, [
      E('div', { class: 'adv-enemy-art' }, FF.adventureArt(b.enemy)),
      E('div', { class: 'adv-enemy-info' }, [text('p', 'adv-eyebrow', d.tag), text('h2', '', d.name), text('p', 'adv-enemy-story', d.text),
        E('div', { class: 'adv-enemy-hp', text: 'HP ' + b.hp + ' / ' + B.ENEMIES[b.enemy].hp }), meter(b.hp, B.ENEMIES[b.enemy].hp, 'enemy-hp', '敵のHP'),
        !done ? text('p', 'adv-intent', intention()) : null])
    ]);
    main.appendChild(stage); main.appendChild(team());
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
