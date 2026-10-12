// 雪原の冒険の戦闘の画面（判断394）。ChatGPT の戦闘試作（codex-prototypes/snow-battle）の画面構成を、本編の戦闘ロジック（FF.adventure）につないだ。
// ここは、画面だけ：状態の遷移（作戦 → 問題 → 解答 → 行動）・予約の検証・ダメージ・報酬は、すべて js/adventure.js の関数が決める。
// 毎ターン「作戦 → 問題 → 正解・解説 → 明示的な確認 → 行動」。オートでも、問題の回答と解答の確認は、人が操作する。
(function (root) {
  'use strict';
  var FF = root.FF, A = FF.adventure, U = FF.ui, T = FF.texts.adventure, BT = T.bt, B = FF.balance.ADVENTURE, E = U.el, scene = FF.adventureScene;
  var host = null;   // js/ui/adventure.js から渡される：{ p, change, advance, paint, name, grade, home }
  var UNKNOWN = '？？？';   // 「わからない」：どの選択肢とも合わない答えとして、回答する（不正解）
  var S = { actor: null, orders: {}, key: null, sel: null, last: null, escape: false, speed: 1, sequence: null, received: {}, history: [], sched: '', gen: 0, message: '', actLines: [] };

  function init(h) { host = h; }
  function p() { return host.p(); }
  function rich(tag, cls, tpl, vars) { return E(tag, { class: cls, rich: tpl, vars: vars }); }
  function tpl(s, vars) { var out = s; Object.keys(vars || {}).forEach(function (k) { out = out.split('{' + k + '}').join(vars[k]); }); return out; }
  function reduced() { return !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function uiPhase(b) { return { commands: 'commands', attack: 'quiz', explanation: 'review', playerAction: 'acting', enemyAction: 'acting', win: 'win', lose: 'lose' }[b.phase] || 'commands'; }
  function memberDef(id) { return T.members[id]; }
  function maxHp(id) { return A.stats(id, p().roster[id].xp).hp; }
  function maxMp(id) { return A.stats(id, p().roster[id].xp).mp; }
  function hpState(id) { var r = p().roster[id], m = maxHp(id); return !r.hp ? 'down' : r.hp / m <= .25 ? 'critical' : r.hp / m <= .5 ? 'caution' : 'normal'; }

  // 時間をおく：速さ ×2、非表示のタブでは止める。画面が変わっていたら、何もしない
  function later(ms, fn) {
    var gen = S.gen;
    root.setTimeout(function () {
      if (gen !== S.gen) return;
      if (root.document.hidden) { var again = function () { root.document.removeEventListener('visibilitychange', again); if (gen === S.gen) fn(); }; root.document.addEventListener('visibilitychange', again); return; }
      fn();
    }, reduced() ? Math.min(ms, 120) : ms / S.speed);
  }
  function live() { var app = root.document.querySelector('.bt-app'); return !!app && FF.app.screen === 'adventure' && !!p().battle; }
  function reset() { S.gen++; S.sequence = null; S.sched = ''; S.key = null; S.sel = null; S.last = null; S.escape = false; S.received = {}; S.actLines = []; }

  // 状態が変わったとき（js/ui/adventure.js の change から）：行動の再生・受けたダメージ・記録のもとを集める
  function observe(before, next) {
    var b0 = before.battle, b1 = next.battle;
    S.received = {};
    if (!b0 && b1) { S.history = []; S.escape = false; S.sel = null; S.last = null; S.actLines = []; }
    if (b0 && b0.phase === 'attack' && b1 && b1.phase === 'explanation') {
      var q = b0.question;
      S.history.push({ question: q.question, yours: S.last && S.last.text != null ? S.last.text : null, answer: FF.learning.displayAnswer(q), explanation: q.explanation, correct: !!b1.correct });
      S.sel = null;
    }
    if (b0 && b0.phase === 'explanation' && b1) { S.sequence = { enemy: b1.enemy, turn: b1.turn, hp: b0.hp, events: b1.log.slice(), index: 0 }; S.actLines = []; S.sched = ''; }
    if (b0 && b0.phase === 'playerAction') next.party.forEach(function (id) { var loss = before.roster[id].hp - next.roster[id].hp; if (loss > 0) S.received[id] = loss; });
    if (b0 && b1 && b0.phase === 'enemyAction' && b1.phase === 'commands') { S.key = null; S.actLines = []; }
  }

  // ---- 絵 ----
  var SPRITES = { juushouhei: 'guardian', shiromadoushi: 'healer', kenshi: 'sword' };
  function sprite(id) {
    if (id === 'hero') {
      var avatar = FF.app.state.player.avatar || 'e1';
      if (avatar === 'e1') return E('img', { attrs: { src: 'img/adventure/battle/hero.webp', alt: '', draggable: 'false' } });
      return E('span', { class: 'bt-sheet', style: { backgroundImage: 'url("' + scene.traveler(avatar) + '")' } });   // 敵のほうを向いた絵（右向き）
    }
    if (SPRITES[id]) return E('img', { attrs: { src: 'img/adventure/battle/' + SPRITES[id] + '.webp', alt: '', draggable: 'false' } });
    return E('img', { attrs: { src: 'img/adventure/allies/' + id + (FF.app.state.player.grade >= 7 ? '-jh' : '-el') + '.webp', alt: '', draggable: 'false' } });   // 戦闘用の立ち絵がない仲間は、全身の絵
  }
  function subjectName(q) {
    var s = FF.defs.SUBJECTS.filter(function (x) { return x.id === q.subject; })[0], g = q.gradeLevel || 1;
    if (!s) return '';
    var by = (s.nameByGrade || []).filter(function (r) { return g >= r.from && g <= r.to; })[0];
    return by ? by.name : s.name;
  }

  // ---- 作戦 ----
  function ensureOrders() {
    var n = p(), key = n.battle.enemy + ':' + n.battle.turn;
    if (S.key === key) return;
    S.key = key; S.orders = {}; A.alive(n).forEach(function (id) { S.orders[id] = { type: 'attack', target: id }; });
    S.actor = A.alive(n)[0]; S.sched = '';
  }
  function reservable(except) {
    var used = Object.keys(S.orders).filter(function (id) { return id !== except && S.orders[id].type === 'item'; }).length;
    return p().potions - used;
  }
  function orderLabel(id) {
    var o = S.orders[id], r = p().roster[id];
    if (!r.hp) return BT.orderDown;
    if (!o) return BT.orderNone;
    return o.type === 'magic' ? memberDef(id).magic : o.type === 'item' ? T.potion : o.type === 'defend' ? BT.cmdDefend : BT.cmdAttack;
  }
  function nextActor() {
    var alive = A.alive(p()), i = alive.indexOf(S.actor);
    if (i >= 0 && i < alive.length - 1) S.actor = alive[i + 1];   // 最後の仲間では、止まる
  }
  function setOrder(order) { S.orders[S.actor] = order; nextActor(); host.paint(); }
  function targetList(title, onPick, back) {
    var n = p(), close, list = E('div', { class: 'bt-list' }, n.party.map(function (id) {
      var r = n.roster[id], low = hpState(id) === 'caution' || hpState(id) === 'critical' || !r.hp;
      return E('button', { class: 'bt-option' + (low ? ' is-low' : ''), attrs: { type: 'button', 'data-target': id }, on: { click: function () { close(); onPick(id); } } }, [
        E('div', {}, [E('b', { text: host.name(id) }), E('small', { text: 'HP ' + r.hp + ' / ' + maxHp(id) + '　MP ' + r.mp + ' / ' + maxMp(id) })]),
        r.hp ? null : rich('span', 'count', BT.down)
      ]);
    }));
    var buttons = []; if (back) buttons.push({ label: BT.targetBack, class: 'ghost', onClick: back });
    buttons.push({ label: BT.close, class: 'ghost' });
    close = U.modal({ title: title, body: list, buttons: buttons });
  }
  function openItems() {
    var n = p(), left = reservable(S.actor), close;
    var body = left <= 0 && n.potions <= 0 ? rich('p', '', BT.itemsNone) : E('div', { class: 'bt-list' }, [
      E('button', { class: 'bt-option', disabled: left <= 0, attrs: { type: 'button', 'data-item': 'potion' }, on: { click: function () { close(); targetList(BT.targetTitle, function (id) { setOrder({ type: 'item', target: id }); }, openItems); } } }, [
        E('div', {}, [rich('b', '', T.potion), rich('small', '', BT.infoItemSet)]),
        E('div', { class: 'count' }, [rich('div', '', tpl(BT.itemCount, { n: n.potions })), rich('div', '', tpl(BT.itemReserve, { n: Math.max(0, left) }))])
      ])
    ]);
    close = U.modal({ title: BT.itemsTitle, body: body, buttons: [{ label: BT.close, class: 'ghost' }] });
  }
  function choose(type) {
    var n = p(), id = S.actor;
    if (type === 'attack' || type === 'defend') { setOrder({ type: type, target: id }); return; }
    if (type === 'magic') {
      if (n.roster[id].mp < B.MAGIC_COST) return;
      if (A.magicKind(id) === 'heal') targetList(BT.healTargetTitle, function (t) { setOrder({ type: 'magic', target: t }); });
      else setOrder({ type: 'magic', target: id });
      return;
    }
    if (type === 'item') openItems();
  }
  function infoText() {
    var id = S.actor, o = S.orders[id] || { type: 'attack' }, tg = o.target && o.target !== id ? ' ' + tpl(BT.infoTarget, { name: host.name(o.target) }) : '';
    if (o.type === 'magic') return memberDef(id).detail + (A.magicKind(id) === 'heal' && o.target ? tg : '');
    if (o.type === 'defend') return BT.infoDefend;
    if (o.type === 'item') return BT.infoItemSet + (o.target ? tg || ' ' + tpl(BT.infoTarget, { name: host.name(o.target) }) : '');
    return BT.infoAttack;
  }
  function startQuiz() {
    var before = p(), orders = {};
    A.alive(before).forEach(function (id) { orders[id] = S.orders[id] || { type: 'attack', target: id }; });
    var next = A.command(before, orders, FF.app.bank, host.grade(), Math.random, FF.app.now());
    if (next === before) { U.toast(A.pick(FF.app.bank, before, host.grade(), Math.random, FF.app.now()) ? BT.noOrders : BT.noQuestion); host.paint(); return; }
    S.key = null; S.sel = null; S.last = null; host.change(next);
  }
  function commandsPanel() {
    ensureOrders();
    var n = p(), id = S.actor, r = n.roster[id], o = S.orders[id], magic = memberDef(id).magic, panel = E('div', { class: 'bt-panel' });
    var cmds = [
      ['attack', '⚔', BT.cmdAttack, BT.cmdAttackSub, false],
      ['magic', '✧', magic, tpl(BT.cmdMagicSub, { n: B.MAGIC_COST }), r.mp < B.MAGIC_COST],
      ['defend', '◇', BT.cmdDefend, BT.cmdDefendSub, false],
      ['item', '＋', BT.cmdItem, BT.cmdItemSub, n.potions <= 0 || reservable(id) <= 0 && !(o && o.type === 'item')]
    ];
    var body = E('div', { class: 'bt-body' }, [
      E('div', { class: 'bt-selhead' }, [E('strong', { text: tpl(BT.actorTitle, { name: host.name(id) }).replace(/\{([^{}|]+)\|[^{}]*\}/g, '$1') }), E('span', { text: tpl(BT.mp, { n: r.mp, max: maxMp(id) }) })]),
      E('div', { class: 'bt-commands' }, cmds.map(function (c) {
        var active = o && o.type === c[0];
        return E('button', { class: 'bt-command' + (active ? ' active' : ''), disabled: c[4], attrs: { type: 'button', 'data-order': c[0], 'aria-pressed': active ? 'true' : 'false' }, on: { click: function () { choose(c[0]); } } }, [
          E('span', { class: 'bt-command-icon', text: c[1], attrs: { 'aria-hidden': 'true' } }), rich('strong', '', c[2]), rich('small', '', c[3])
        ]);
      })),
      rich('p', 'bt-info', infoText()),
      E('div', { class: 'bt-plan' }, [
        E('button', { class: 'bt-secondary', attrs: { type: 'button', 'data-do': 'recommend' }, rich: BT.recommend, on: { click: function () {
          S.orders = A.autoOrders(p(), p().auto.tactic); A.alive(p()).forEach(function (m) { if (!S.orders[m]) S.orders[m] = { type: 'attack', target: m }; }); U.toast(BT.recommended); host.paint(); } } }),
        E('button', { class: 'bt-secondary', attrs: { type: 'button', 'data-do': 'allAttack' }, rich: BT.allAttack, on: { click: function () {
          S.orders = {}; A.alive(p()).forEach(function (m) { S.orders[m] = { type: 'attack', target: m }; }); U.toast(BT.allAttacked); host.paint(); } } })
      ])
    ]);
    panel.appendChild(body);
    panel.appendChild(E('div', { class: 'bt-foot' }, [rich('p', 'bt-note', BT.planNote), E('button', { class: 'bt-primary', attrs: { type: 'button', 'data-do': 'startQuiz' }, rich: BT.toQuiz, on: { click: startQuiz } })]));
    return panel;
  }
  // オート：少し待ってから、作戦で全員の行動を決めて、問題へ（問題と解答は、人が操作する）
  function autoPanel() {
    var n = p(), panel = E('div', { class: 'bt-panel' }), tactic = C().tactics[n.auto.tactic];
    panel.appendChild(E('div', { class: 'bt-body' }, [
      rich('p', 'bt-acting', tpl(BT.autoWorking, { name: tactic.name })), rich('p', 'bt-info', tactic.text),
      E('div', { class: 'bt-plan' }, [E('button', { class: 'bt-secondary', attrs: { type: 'button', 'data-do': 'autoStop' }, rich: BT.autoStopBtn, on: { click: function () { host.change(A.setAuto(p(), null)); } } })])
    ]));
    var turn = n.battle.turn, enemy = n.battle.enemy, key = 'auto:' + enemy + ':' + turn;
    if (S.sched !== key) {
      S.sched = key;
      later(1100, function () {
        var before = p();
        if (!live() || !before.battle || before.battle.phase !== 'commands' || before.battle.turn !== turn || before.battle.enemy !== enemy || !before.auto.on) return;
        var next = A.command(before, A.autoOrders(before, before.auto.tactic), FF.app.bank, host.grade(), Math.random, FF.app.now());
        if (next === before) { U.toast(C().autoFailed); host.change(A.setAuto(before, null)); return; }
        S.key = null; host.change(next);
      });
    }
    return panel;
  }
  function C() { return T.scenery; }

  // ---- 問題 ----
  function submit(value) {
    var before = p(); S.last = { text: value === UNKNOWN ? null : value };
    var next = A.answer(before, value, FF.app.now());
    if (next === before) return;
    host.change(next);
  }
  function quizPanel() {
    var b = p().battle, q = b.question, panel = E('div', { class: 'bt-panel' }), body = E('div', { class: 'bt-body' }), foot = E('div', { class: 'bt-foot' });
    var tags = E('div', { class: 'bt-tags' }, [rich('span', 'bt-tag', tpl(BT.gradeTag, { n: q.gradeLevel || host.grade() }) + ' · ' + subjectName(q))]);
    body.appendChild(tags); body.appendChild(rich('h2', 'bt-question', q.question));
    if (q.diagram && FF.lessonFigure) body.appendChild(FF.lessonFigure.render(q.diagram));
    var canSubmit;
    if (q.answerType === 'choice') {
      body.appendChild(E('div', { class: 'bt-choices', attrs: { role: 'group', 'aria-label': U.plain(BT.pickAnswer) } }, b.choices.map(function (choice, i) {
        return E('button', { class: 'bt-choice', attrs: { type: 'button', 'data-choice': i, 'aria-pressed': S.sel === choice ? 'true' : 'false' }, on: { click: function () { S.sel = choice; host.paint(); } } }, [E('span', { class: 'bt-letter', text: ['A', 'B', 'C', 'D'][i], attrs: { 'aria-hidden': 'true' } }), U.rich(choice)]);
      })));
      canSubmit = S.sel !== null && b.choices.indexOf(S.sel) >= 0;
    } else {
      var input = E('input', { attrs: { 'aria-label': U.plain(BT.inputLabel), autocomplete: 'off', inputmode: 'text' }, value: S.sel || '', on: { input: function () { S.sel = input.value; primary.disabled = !input.value.trim(); } } });
      body.appendChild(E('div', { class: 'bt-input' }, [input]));
      canSubmit = !!(S.sel && String(S.sel).trim());
    }
    var shown = b.hints || 0, more = q.hints && shown < q.hints.length;
    (q.hints || []).slice(0, shown).forEach(function (hint) { body.appendChild(rich('p', 'bt-hint', hint)); });
    var tools = E('div', { class: 'bt-tools2' }, [
      q.hints && q.hints.length ? E('button', { class: 'bt-quiet', disabled: !more, attrs: { type: 'button', 'data-do': 'hint' }, rich: shown ? BT.hintMore : BT.hint, on: { click: function () { var n = FF.util.clone(p()); n.battle.hints = Math.min(q.hints.length, shown + 1); host.change(n); } } }) : E('span'),
      E('button', { class: 'bt-quiet', attrs: { type: 'button', 'data-do': 'dontKnow' }, rich: BT.dontKnow, on: { click: function () { submit(UNKNOWN); } } })
    ]);
    body.appendChild(tools);
    var primary = E('button', { class: 'bt-primary', disabled: !canSubmit, attrs: { type: 'button', 'data-do': 'submit' }, rich: BT.submit, on: { click: function () { if (S.sel !== null) submit(S.sel); } } });
    foot.appendChild(rich('p', 'bt-note', S.escape ? BT.quizNoteEscape : BT.quizNote)); foot.appendChild(primary);
    panel.appendChild(body); panel.appendChild(foot); return panel;
  }
  function reviewPanel() {
    var b = p().battle, q = b.question, panel = E('div', { class: 'bt-panel' }), unknown = S.last && S.last.text == null;
    var yours = S.last ? (S.last.text == null ? BT.unknown : S.last.text) : BT.noRecord;
    var eff = S.escape ? BT.effectEscape : b.correct ? tpl(BT.effectRight, { a: B.QUIZ_ATTACK_RATE }) : BT.effectWrong;
    panel.appendChild(E('div', { class: 'bt-body' }, [
      E('div', { class: 'bt-status' + (b.correct ? '' : ' wrong') }, [E('span', { class: 'bt-seal', text: b.correct ? '✓' : '◇', attrs: { 'aria-hidden': 'true' } }), rich('strong', '', b.correct ? BT.right : unknown ? BT.wrongUnknown : BT.wrongLearn)]),
      rich('p', 'bt-aq', q.question),
      E('div', { class: 'bt-pair' }, [E('div', {}, [rich('small', '', BT.yourAnswer), E('strong', {}, U.rich(yours))]), E('div', {}, [rich('small', '', BT.correctAnswer), E('strong', { attrs: { 'data-correct': '1' } }, U.rich(FF.learning.displayAnswer(q)))])]),
      rich('p', 'bt-explain', q.explanation), rich('p', 'bt-effect', eff)
    ]));
    panel.appendChild(E('div', { class: 'bt-foot' }, [rich('p', 'bt-note', BT.ackNote), E('button', { class: 'bt-primary', attrs: { type: 'button', 'data-do': 'ack' }, rich: S.escape ? BT.ackEscape : BT.ack, on: { click: acknowledge } })]));
    return panel;
  }
  function acknowledge() {
    if (S.escape) { var next = A.retreat(p()); S.escape = false; host.change(next); return; }
    host.advance();
  }

  // ---- 行動 ----
  function logText(line) {
    var b = p().battle;
    if (line.key === 'hit') return tpl(T.damageResult, { enemy: T.enemies[b.enemy].name, n: line.amount });
    return tpl(T.logs[line.key], { name: host.name(line.who), n: line.amount });
  }
  function declareText(line) {
    var acting = line.actor || line.who, order = p().battle.orders[acting];
    if (line.key === 'hit') return tpl(order && order.type === 'magic' ? T.magicDeclare : T.attackDeclare, { name: host.name(acting), magic: memberDef(acting).magic });
    return tpl(T.actionDeclare, { name: host.name(acting) });
  }
  function actingPanel(app, title) {
    var panel = E('div', { class: 'bt-panel' });
    panel.appendChild(E('div', { class: 'bt-body' }, [rich('p', 'bt-acting', title), rich('p', 'bt-note', BT.actingNote), E('ul', { class: 'bt-actlog' }, S.actLines.map(function (t) { return E('li', {}, [E('span', { class: 'dot', text: '◇', attrs: { 'aria-hidden': 'true' } }), rich('span', '', t)]); }))]));
    return panel;
  }
  function floatText(app, cls, text) {
    var stage = app.querySelector('.bt-stage'); if (!stage) return;
    var node = E('span', { class: 'bt-float ' + cls, text: text, attrs: { 'aria-hidden': 'true' } }); stage.appendChild(node);
    root.setTimeout(function () { node.remove(); }, 1000);
  }
  // 攻撃する仲間が、少し前に出て戻る（ChatGPT の試作と同じ。右へ12px）
  function lunge(app, line) {
    if (reduced() || document.hidden || line.key !== 'hit') return;
    var f = app.querySelector('[data-fighter="' + (line.actor || line.who) + '"]');
    if (f && f.animate) f.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(12px)', offset: .4 }, { transform: 'translateX(0)' }], { duration: 360 / S.speed });
  }
  // 行動のようす：ひとりずつ、宣言 → 命中 → 結果。終わったら、敵の行動へ
  function play(app, seq) {
    var gen = S.gen;
    function ok() { return gen === S.gen && S.sequence === seq && app.isConnected && FF.app.screen === 'adventure' && p().battle; }
    function hpSet() { setEnemyHp(app, seq.hp); }
    function step() {
      if (!ok()) return;
      if (seq.index >= seq.events.length) {
        S.sequence = null;
        if (p().battle.phase === 'playerAction') host.advance(); else host.paint();
        return;
      }
      var line = seq.events[seq.index], fig = app.querySelector('.bt-enemy-figure');
      fig.classList.remove('is-hit'); S.message = declareText(line); setMessage(app);
      lunge(app, line);
      later(350, function () {
        if (!ok()) return;
        if (line.key === 'hit' && !reduced()) fig.classList.add('is-hit');
        later(line.key === 'hit' ? 460 : 150, function () {
          if (!ok()) return;
          if (line.key === 'hit') { seq.hp = Math.max(0, seq.hp - line.amount); hpSet(); floatText(app, 'enemy', '−' + line.amount); }
          else if (line.key === 'heal') floatText(app, 'heal', '＋' + line.amount);
          S.message = logText(line); setMessage(app); S.actLines.push(logText(line)); refreshPanel(app);
          seq.index++; later(400, step);
        });
      });
    }
    hpSet(); step();
  }

  // ---- おわり ----
  function endPanel(win) {
    var b = p().battle, panel = E('div', { class: 'bt-panel' }), body = E('div', { class: 'bt-body' });
    if (win) {
      var r = b.reward;
      body.appendChild(E('div', { class: 'bt-endmark', text: '✧', attrs: { 'aria-hidden': 'true' } }));
      body.appendChild(rich('p', 'bt-result', tpl(T.victoryReward, { xp: r.xp, gold: r.gold })));
      if (r.levels.length) body.appendChild(E('div', { class: 'bt-levelups' }, r.levels.map(function (x) { return rich('p', '', '✦ ' + host.name(x.id) + ' Lv.' + x.level + '　' + T.levelUp); })));
      if (r.chest) body.appendChild(E('div', { class: 'bt-loot' }, [scene.chest(), E('div', {}, [rich('strong', '', T.treasureFound), rich('p', '', tpl(T.treasureContents, { gold: r.chest.gold, potions: r.chest.potions }))])]));
    } else {
      body.appendChild(E('div', { class: 'bt-endmark', text: '◇', attrs: { 'aria-hidden': 'true' } }));
      body.appendChild(rich('p', 'bt-result', T.defeat)); body.appendChild(rich('p', 'bt-info', T.defeatHelp));
    }
    panel.appendChild(body);
    panel.appendChild(E('div', { class: 'bt-foot' }, [E('button', { class: 'bt-primary ' + (win ? 'win' : 'lose'), attrs: { type: 'button', 'data-do': 'finish' }, rich: win ? T.field : '町で休む', on: { click: function () { host.advance(); } } })]));
    return panel;
  }

  // ---- 窓（記録・せつめい・にげる・オート）----
  function openLog() {
    var list = S.history.length ? E('div', {}, S.history.map(function (h, i) {
      return E('div', { class: 'bt-history' }, [rich('small', '', (i + 1) + '　' + (h.correct ? BT.logCorrect : BT.logWrong)), rich('h3', '', h.question),
        E('p', {}, [rich('span', '', BT.yourAnswer + '：'), U.rich(h.yours == null ? BT.unknown : h.yours)]), E('p', {}, [rich('span', '', BT.correctAnswer + '：'), U.rich(h.answer)]), rich('p', '', h.explanation || '')]);
    })) : rich('p', '', BT.logEmpty);
    U.modal({ title: BT.logTitle, body: list, buttons: [{ label: BT.close, class: 'ghost' }] });
  }
  function openHelp() { U.modal({ title: BT.helpTitle, body: E('div', { class: 'bt-help' }, BT.helpLines.map(function (l) { return rich('p', '', l); })), buttons: [{ label: BT.close, class: 'ghost' }] }); }
  function openEscape() {
    var b = p().battle, now = b.phase === 'commands';
    U.modal({ title: BT.escapeTitle, body: rich('p', '', now ? BT.escapeNow : BT.escapeLater), buttons: [
      { label: BT.escapeNo, class: 'ghost' },
      { label: BT.escapeYes, class: 'primary', onClick: function () {
        if (now) { S.key = null; host.change(A.retreat(p())); return; }
        S.escape = true; if (p().auto && p().auto.on) { host.change(A.setAuto(p(), null)); return; }
        U.toast(BT.escapeReserved); host.paint();
      } }
    ] });
  }
  function openAuto() {
    var n = p(), tactics = n.auto && n.auto.on ? n.auto.tactic : null;
    var buttons = B.AUTO.TACTICS.map(function (t) { return { label: (tactics === t ? '✓ ' : '') + C().tactics[t].name, class: tactics === t ? 'primary' : '', onClick: function () { host.change(A.setAuto(p(), t)); } }; });
    if (tactics) buttons.push({ label: BT.autoStopBtn, class: 'ghost', onClick: function () { host.change(A.setAuto(p(), null)); } });
    buttons.push({ label: C().autoBack, class: 'ghost' });
    U.modal({ title: C().autoMenuTitle, body: E('div', { class: 'bt-help' }, B.AUTO.TACTICS.map(function (t) { return rich('p', '', '【' + C().tactics[t].name + '】' + C().tactics[t].text); })), buttons: buttons });
  }

  // ---- 組み立て ----
  function build() {
    var app = E('div', { class: 'bt-app' }), inner = E('div', { class: 'bt-inner' });
    var bar = E('header', { class: 'bt-bar' }, [
      E('nav', { class: 'bt-flow', attrs: { 'aria-label': 'このターンの進み方' } }, [E('span', { class: 'bt-turn' }), E('ol', {}, BT.flow.map(function (f) { return E('li', { rich: f }); }))]),
      E('div', { class: 'bt-tools' }, [
        E('button', { class: 'bt-log', attrs: { type: 'button', 'aria-label': U.plain(BT.logTitle) }, rich: BT.log, on: { click: openLog } }),
        E('button', { class: 'bt-help', attrs: { type: 'button', 'aria-label': U.plain(BT.helpTitle) }, text: BT.help, on: { click: openHelp } }),
        E('button', { class: 'bt-escape', attrs: { type: 'button' }, rich: BT.escape, on: { click: openEscape } })
      ])
    ]);
    var stage = E('div', { class: 'bt-stage', attrs: { role: 'img' } }, [
      E('img', { class: 'bt-arena', attrs: { src: 'img/adventure/battle/arena.webp', alt: '', decoding: 'async', draggable: 'false' } }), E('div', { class: 'bt-wash', attrs: { 'aria-hidden': 'true' } }),
      E('button', { class: 'bt-auto', attrs: { type: 'button' }, on: { click: openAuto } }),
      E('div', { class: 'bt-enemy-status' }, [E('div', { class: 'bt-enemy-row' }, [E('strong', { class: 'bt-enemy-name' }), E('span', { class: 'bt-enemy-num' })]), E('div', { class: 'bt-meter bt-enemy-meter', attrs: { role: 'progressbar', 'aria-label': '敵のHP', 'aria-valuemin': 0 } }, E('i')), E('small', { class: 'bt-enemy-note' })]),
      E('div', { class: 'bt-formation', attrs: { 'aria-hidden': 'true' } }), E('div', { class: 'bt-enemy-figure', attrs: { 'aria-hidden': 'true' } }),
      E('p', { class: 'bt-message', attrs: { 'aria-live': 'polite' } }),
      E('button', { class: 'bt-speed', attrs: { type: 'button' }, on: { click: function () { S.speed = S.speed === 1 ? 2 : 1; setSpeed(app); } } })
    ]);
    var party = E('div', { class: 'bt-party', attrs: { 'aria-label': U.plain(T.party) } }), con = E('section', { class: 'bt-console', attrs: { 'aria-label': '戦闘の操作' } });
    inner.appendChild(bar); inner.appendChild(E('div', { class: 'bt-layout' }, [E('section', { class: 'bt-scene' }, [stage, party]), con]));
    app.appendChild(inner);
    var fig = stage.querySelector('.bt-enemy-figure'); fig.appendChild(scene.enemy(p().battle.enemy));
    stage.querySelector('.bt-enemy-name').textContent = U.plain(T.enemies[p().battle.enemy].name);
    app.btParty = p().party.join(',');
    p().party.forEach(function (id, i) { stage.querySelector('.bt-formation').appendChild(E('div', { class: 'bt-fighter', attrs: { 'data-slot': i, 'data-fighter': id } }, [E('span', { class: 'bt-shadow' }), sprite(id)])); });
    setSpeed(app);
    return app;
  }
  function setSpeed(app) { var b = app.querySelector('.bt-speed'); b.textContent = U.plain(tpl(BT.speed, { n: S.speed })); b.setAttribute('aria-label', b.textContent); }
  function setMessage(app) { app.querySelector('.bt-message').textContent = U.plain(S.message || ''); }
  function setEnemyHp(app, hp) {
    var n = p(), b = n.battle, max = B.ENEMIES[b.enemy].hp, bar = app.querySelector('.bt-enemy-meter');
    app.querySelector('.bt-enemy-num').textContent = hp + ' / ' + max;
    bar.setAttribute('aria-valuenow', hp); bar.setAttribute('aria-valuemax', max); bar.firstChild.style.width = (hp / max * 100) + '%';
    app.querySelector('.bt-enemy-note').textContent = U.plain(hp === 0 ? BT.enemyNoteDone : hp < max * .3 ? BT.enemyNoteLow : BT.enemyNote);
    app.querySelector('.bt-enemy-figure').classList.toggle('defeated', hp === 0);
  }
  function renderParty(app) {
    var n = p(), b = n.battle, commands = b.phase === 'commands' && !(n.auto && n.auto.on);
    var party = app.querySelector('.bt-party'); U.clear(party);
    n.party.forEach(function (id) {
      var r = n.roster[id], st = hpState(id), sel = commands && S.actor === id, m = maxHp(id);
      var hurt = S.received[id];
      var card = E('button', { class: 'bt-member' + (!r.hp ? ' is-down' : ''), disabled: !commands || !r.hp, attrs: { type: 'button', 'data-actor': id, 'data-hp-state': st, 'aria-pressed': sel ? 'true' : 'false',
        'aria-label': host.name(id) + (st === 'critical' ? '、HPがとても少ない' : st === 'caution' ? '、HPが少ない' : st === 'down' ? '、戦闘不能' : '') + '、HP ' + r.hp + '/' + m + '、MP ' + r.mp + '/' + maxMp(id) },
        on: { click: function () { S.actor = id; host.paint(); } } }, [
        E('span', { class: 'bt-member-top' }, [E('span', { class: 'bt-portrait adv-portrait' }, FF.adventureArt(id, true)), E('span', { class: 'bt-member-name', text: host.name(id) })]),
        E('span', { class: 'bt-vitals' }, [E('span', {}, ['HP ', E('b', { text: r.hp }), '/' + m]), E('span', { class: 'mp', text: 'MP ' + r.mp })]),
        E('span', { class: 'bt-meter' }, E('i', { style: { width: (r.hp / m * 100) + '%' } })),
        E('span', { class: 'bt-order' }, [E('b', { text: r.hp ? '◆' : '−', attrs: { 'aria-hidden': 'true' } }), b.phase === 'commands' ? U.rich(orderLabel(id)) : (b.orders[id] ? U.rich(orderLabel2(id)) : '')]),
        hurt ? E('span', { class: 'bt-dmg', text: '−' + hurt, attrs: { 'aria-hidden': 'true' } }) : null
      ].filter(Boolean));
      party.appendChild(card);
    });
    n.party.forEach(function (id) {
      var f = app.querySelector('[data-fighter="' + id + '"]'); if (!f) return;
      f.classList.toggle('selected', commands && S.actor === id); f.classList.toggle('down', !n.roster[id].hp);
      f.classList.toggle('defending', ((b.defending || []).indexOf(id) >= 0) && (b.phase === 'playerAction' || b.phase === 'enemyAction' || (b.phase === 'explanation')));
    });
  }
  function orderLabel2(id) { var o = p().battle.orders[id]; return !o ? '' : o.type === 'magic' ? memberDef(id).magic : o.type === 'item' ? T.potion : o.type === 'defend' ? BT.cmdDefend : BT.cmdAttack; }
  function refreshPanel(app) {
    var n = p(), b = n.battle, con = app.querySelector('.bt-console'), seq = S.sequence;
    U.clear(con);
    var panel;
    if (seq) panel = actingPanel(app, BT.actingTitle);
    else if (b.phase === 'commands') panel = n.auto && n.auto.on ? autoPanel() : commandsPanel();
    else if (b.phase === 'attack') panel = quizPanel();
    else if (b.phase === 'explanation') panel = reviewPanel();
    else if (b.phase === 'win') panel = endPanel(true);
    else if (b.phase === 'lose') panel = endPanel(false);
    else panel = actingPanel(app, b.phase === 'enemyAction' ? BT.enemyTitle : BT.actingTitle);
    con.appendChild(panel);
    var body = con.querySelector('.bt-body'); if (body && (b.phase === 'enemyAction' || seq)) body.scrollTop = body.scrollHeight;
  }
  function refresh(app) {
    var n = p(), b = n.battle, ph = uiPhase(b), seq = S.sequence;
    if (seq && (seq.enemy !== b.enemy || seq.turn !== b.turn)) { seq = S.sequence = null; }
    if (b.phase === 'commands') ensureOrders();
    app.setAttribute('data-phase', ph);
    app.querySelector('.bt-turn').textContent = BT.turn + ' ' + ('0' + b.turn).slice(-2);
    var step = ph === 'commands' ? 0 : ph === 'quiz' ? 1 : ph === 'review' ? 2 : 3;
    app.querySelectorAll('.bt-flow li').forEach(function (li, i) { li.classList.toggle('current', i === step); li.classList.toggle('done', i < step); if (i === step) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); });
    var busy = !!seq || b.phase === 'playerAction' || b.phase === 'enemyAction' || b.phase === 'win' || b.phase === 'lose';
    app.querySelector('.bt-escape').disabled = busy;
    var auto = app.querySelector('.bt-auto'), on = !!(n.auto && n.auto.on);
    auto.disabled = busy; auto.setAttribute('aria-pressed', String(on)); U.clear(auto);
    auto.appendChild(E('strong', { text: U.plain(on ? BT.autoOn : BT.autoOff) })); auto.appendChild(rich('small', '', BT.autoSub));
    setEnemyHp(app, seq ? seq.hp : b.hp);
    if (!seq) S.message = S.message && (b.phase === 'playerAction' || b.phase === 'enemyAction') ? S.message : ph === 'quiz' ? BT.messageQuiz : ph === 'review' ? (b.correct ? BT.messageReview : BT.messageWrong) : ph === 'commands' ? BT.messageStart : b.phase === 'win' ? U.plain(T.victory) : S.message;
    setMessage(app); renderParty(app); refreshPanel(app);
    // 行動の再生・自動の進行
    if (seq && !seq.started) { seq.started = true; play(app, seq); }
    var key = b.enemy + ':' + b.turn + ':' + b.phase;
    if (!seq && (b.phase === 'playerAction' || b.phase === 'enemyAction') && S.sched !== key) {
      S.sched = key;
      var lines = b.phase === 'enemyAction' ? b.log.filter(function (l) { return l.key !== 'hit' || true; }) : [];
      if (b.phase === 'enemyAction') { S.actLines = lines.map(logText); S.message = S.actLines.length ? S.actLines[S.actLines.length - 1] : S.message; refreshPanel(app); setMessage(app); }
      later(b.phase === 'enemyAction' ? 900 + 450 * lines.length : 600, function () { var q = p(); if (live() && q.battle.phase === b.phase && q.battle.turn === b.turn) host.advance(); });
    }
  }
  function render(main) {
    var n = p(), b = n.battle; main.classList.add('adv-battle-screen');
    var app = main.querySelector('.bt-app');
    if (app && (app.btParty !== n.party.join(',') || app.btEnemy !== b.enemy)) { app.remove(); app = null; }
    if (!app) { app = build(); app.btEnemy = b.enemy; main.appendChild(app); }
    refresh(app);
  }

  FF.ui.adventureBattle = { init: init, render: render, observe: observe, reset: reset };
})(this);
