// 雪原の冒険：移動・編成・クイズ戦闘・成長。状態を返す純粋関数。
(function (root) {
  'use strict';
  var FF = root.FF, B = FF.balance.ADVENTURE;
  var IDS = ['hero', 'gan', 'rin', 'sora'];
  var MAP = ['#############', '#.......#...#', '#.......#...#', '#.......#...#', '#..##...#...#', '#.......#...#', '#...........#', '#.......#...#', '#############'];
  var PLACES = { home: { x: 1, y: 6 }, camp: { x: 6, y: 3 }, chest: { x: 3, y: 1 }, town: { x: 11, y: 2 } };
  var ENEMIES = { cub: { x: 3, y: 6 }, wolf: { x: 6, y: 5 }, boss: { x: 8, y: 6 } };
  function clone(v) { return FF.util.clone(v); }
  function same(a, b) { return a.x === b.x && a.y === b.y; }
  function int(n, fallback, max) { return typeof n === 'number' && isFinite(n) ? Math.max(0, Math.min(max, Math.floor(n))) : fallback; }
  function level(xp) { return Math.min(B.MAX_LEVEL, 1 + Math.floor(Math.sqrt(Math.max(0, xp) / B.XP_STEP))); }
  function stats(id, xp) {
    var base = B.MEMBERS[id], l = level(xp) - 1, out = { level: l + 1 };
    Object.keys(base).forEach(function (k) { out[k] = base[k] + l * (k === 'hp' ? B.HP_GROWTH : k === 'mp' ? B.MP_GROWTH : B.STAT_GROWTH); });
    return out;
  }
  function walkable(pos) { return !!MAP[pos.y] && MAP[pos.y][pos.x] === '.'; }
  function create() {
    var roster = {};
    IDS.forEach(function (id) { var s = stats(id, 0); roster[id] = { xp: 0, hp: s.hp, mp: s.mp }; });
    return { version: 1, started: false, roster: roster, party: IDS.slice(), gold: 0, potions: B.POTIONS, pos: clone(PLACES.home),
      lastTown: 'home', facing: 'down', cleared: [], chest: false, arrived: false, campUsed: false, battle: null,
      subject: 'math', difficulty: 'basic', recent: [], answered: 0, correct: 0, history: [], notice: 'welcome' };
  }
  function normalize(raw) {
    var p = create();
    if (!raw || typeof raw !== 'object') return p;
    IDS.forEach(function (id) {
      var r = raw.roster && raw.roster[id] || {}, xp = int(r.xp, 0, 1000000), s = stats(id, xp);
      p.roster[id] = { xp: xp, hp: int(r.hp, s.hp, s.hp), mp: int(r.mp, s.mp, s.mp) };
    });
    p.party = Array.isArray(raw.party) ? raw.party.filter(function (id, i, a) { return IDS.indexOf(id) >= 0 && a.indexOf(id) === i; }) : IDS.slice();
    if (p.party.indexOf('hero') < 0) p.party.unshift('hero');
    p.party = p.party.slice(0, 4);
    ['gold', 'potions', 'answered', 'correct'].forEach(function (k) { p[k] = int(raw[k], p[k], 1000000); });
    p.correct = Math.min(p.answered, p.correct);
    ['started', 'chest', 'arrived', 'campUsed'].forEach(function (k) { p[k] = raw[k] === true; });
    if (raw.pos && Number.isInteger(raw.pos.x) && Number.isInteger(raw.pos.y) && walkable(raw.pos)) p.pos = clone(raw.pos);
    if (['up', 'down', 'left', 'right'].indexOf(raw.facing) >= 0) p.facing = raw.facing;
    p.lastTown = raw.lastTown === 'town' && p.arrived ? 'town' : 'home';
    p.cleared = Array.isArray(raw.cleared) ? Object.keys(ENEMIES).filter(function (id) { return raw.cleared.indexOf(id) >= 0; }) : [];
    if (p.arrived && p.cleared.indexOf('boss') < 0) p.cleared.push('boss');
    if (p.pos.x > 8 && p.cleared.indexOf('boss') < 0) p.pos = clone(PLACES.home);
    if (['math', 'japanese', 'science', 'social', 'english'].indexOf(raw.subject) >= 0) p.subject = raw.subject;
    if (['basic', 'standard', 'advanced'].indexOf(raw.difficulty) >= 0) p.difficulty = raw.difficulty;
    p.recent = Array.isArray(raw.recent) ? raw.recent.filter(function (s) { return typeof s === 'string'; }).slice(-B.RECENT) : [];
    p.history = Array.isArray(raw.history) ? raw.history.filter(function (h) { return h && typeof h.qid === 'string' && typeof h.correct === 'boolean' && isFinite(h.at); }).slice(-B.HISTORY) : [];
    p.notice = typeof raw.notice === 'string' ? raw.notice : '';
    var bat = raw.battle;
    if (bat && B.ENEMIES[bat.enemy] && same(p.pos, ENEMIES[bat.enemy]) &&
        ['commands', 'attack', 'explanation', 'playerAction', 'enemyAction', 'attackResult', 'defense', 'defenseResult', 'win', 'lose'].indexOf(bat.phase) >= 0 &&
        Array.isArray(bat.log) && bat.orders && typeof bat.orders === 'object' &&
        (['attack', 'explanation'].indexOf(bat.phase) < 0 ||
          (bat.question && FF.learning.validateQuestion(bat.question).length === 0 && Array.isArray(bat.choices)))) {
      p.battle = clone(bat);
      if (bat.flowVersion !== 2) {
        p.battle.phase = ({attackResult:'playerAction', defense:'playerAction', defenseResult:'enemyAction'})[bat.phase] || bat.phase;
        if (bat.phase === 'defense') p.battle.correct = false;
      }
      p.battle.flowVersion = 2;
      p.battle.hp = int(bat.hp, B.ENEMIES[bat.enemy].hp, B.ENEMIES[bat.enemy].hp);
      p.battle.turn = Math.max(1, int(bat.turn, 1, 10000));
    }
    if (!p.battle && !p.party.some(function (id) { return p.roster[id].hp > 0; })) p = rest(p, p.lastTown);
    return p;
  }
  function alive(p) { return p.party.filter(function (id) { return p.roster[id].hp > 0; }); }
  function atTown(p) { return same(p.pos, PLACES.home) || same(p.pos, PLACES.town); }
  function rest(p, where) {
    if (p.battle && p.battle.phase !== 'lose') return p;
    if (where !== 'home' && where !== 'town' && where !== 'camp') return p;
    if (where === 'town' && !p.arrived) return p;
    var n = clone(p);
    IDS.forEach(function (id) { var s = stats(id, n.roster[id].xp); n.roster[id].hp = s.hp; n.roster[id].mp = s.mp; });
    if (where !== 'camp') {
      n.lastTown = where; n.pos = clone(PLACES[where]);
      n.potions = Math.max(B.POTIONS, n.potions);
      n.cleared = n.cleared.filter(function (id) { return id === 'boss'; });
      n.campUsed = false;
    } else n.campUsed = true;
    n.battle = null; n.notice = 'rested';
    return n;
  }
  // Entering the town screen and departing from it always uses that town's position.
  function depart(p, where) {
    if (where !== 'home' && (where !== 'town' || !p.arrived)) return p;
    var n = clone(p); n.battle = null; n = rest(n, where); n.facing = 'down'; n.notice = ''; return n;
  }
  function setParty(p, party) {
    if (p.battle || !atTown(p) || !Array.isArray(party) || party.length > 4 || party.indexOf('hero') < 0 ||
        party.some(function (id, i) { return IDS.indexOf(id) < 0 || party.indexOf(id) !== i; })) return p;
    var n = clone(p); n.party = party.slice(); return n;
  }
  function enemyAt(p, pos) { return Object.keys(ENEMIES).find(function (id) { return same(pos, ENEMIES[id]) && p.cleared.indexOf(id) < 0; }) || null; }
  function encounter(p, id) {
    if (p.battle || !alive(p).length || enemyAt(p, p.pos) !== id) return p;
    var n = clone(p);
    n.battle = { flowVersion: 2, enemy: id, hp: B.ENEMIES[id].hp, phase: 'commands', turn: 1, orders: {}, log: [], question: null, choices: [], guarded: false, ward: false };
    return n;
  }
  function move(p, x, y) {
    if (p.battle || !walkable({ x: x, y: y }) || Math.abs(p.pos.x - x) + Math.abs(p.pos.y - y) !== 1) return p;
    // 峠の大獣を倒すまでは、東側へ抜けられない。
    if (x > 8 && p.cleared.indexOf('boss') < 0) return p;
    var n = clone(p); n.facing = x > p.pos.x ? 'right' : x < p.pos.x ? 'left' : y > p.pos.y ? 'down' : 'up'; n.pos = { x: x, y: y }; n.notice = '';
    var enemy = enemyAt(n, n.pos);
    if (enemy) return encounter(n, enemy);
    if (same(n.pos, PLACES.chest) && !n.chest) { n.chest = true; n.gold += B.CHEST_GOLD; n.potions += B.CHEST_POTIONS; n.notice = 'chest'; }
    if (same(n.pos, PLACES.camp) && !n.campUsed) n = rest(n, 'camp');
    if (same(n.pos, PLACES.home)) n = rest(n, 'home');
    if (same(n.pos, PLACES.town)) { var first = !n.arrived; n.arrived = true; n = rest(n, 'town'); n.notice = first ? 'arrival' : 'rested'; }
    return n;
  }
  // 遠い場所のタップも一歩ずつ進む。敵への接触で必ず止まる。
  function path(p, target) {
    if (!walkable(target) || same(p.pos, target)) return [];
    var queue = [{ pos: p.pos, route: [] }], seen = {};
    seen[p.pos.x + ',' + p.pos.y] = true;
    while (queue.length) {
      var cur = queue.shift();
      for (var d of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
        var pos = { x: cur.pos.x + d[0], y: cur.pos.y + d[1] }, key = pos.x + ',' + pos.y;
        if (seen[key] || !walkable(pos)) continue;
        seen[key] = true;
        var route = cur.route.concat([pos]);
        if (same(pos, target)) return route;
        if (enemyAt(p, pos)) continue;
        if (pos.x > 8 && p.cleared.indexOf('boss') < 0) continue;
        queue.push({ pos: pos, route: route });
      }
    }
    return [];
  }
  function intent(p) {
    var b = p.battle;
    if (!b) return null;
    return { all: b.enemy === 'boss' && b.turn % 2 === 0, heavy: b.enemy === 'wolf' && b.turn % 2 === 0,
      target: alive(p)[(b.turn - 1) % Math.max(1, alive(p).length)] };
  }
  function availableQuestions(bank, p, grade) {
    return Object.keys(bank.byId).map(function (id) { return bank.byId[id]; }).filter(function (q) {
      return q.subject === p.subject && q.gradeLevel === grade && q.difficulty === p.difficulty && !q.listen && q.answerType === 'choice';
    });
  }
  function pick(bank, p, grade, rng, now) {
    var list = availableQuestions(bank, p, grade);
    var fresh = list.filter(function (q) { return p.recent.indexOf(q.id) < 0; });
    if (list.length) { list = fresh.length ? fresh : list; return list[Math.floor(rng() * list.length)]; }
    // 同じ学年・難易度の算数は自動生成も利用できる。出題条件を黙って変えない。
    if (p.subject !== 'math') return null;
    return FF.curriculum.pick(bank, { subject: p.subject, grade: grade, difficulty: p.difficulty, answerType: 'choice', unit: 'all' }, { rng: rng, now: now, correctLog: {}, recentIds: p.recent });
  }
  function setQuestion(n, bank, grade, rng, now) {
    var q = pick(bank, n, grade, rng, now);
    if (!q) return false;
    n.battle.question = clone(q); n.battle.choices = FF.util.shuffle(q.choices || [], rng);
    n.battle.correct = null; n.battle.hints = 0;
    return true;
  }
  function command(p, orders, bank, grade, rng, now) {
    if (!p.battle || p.battle.phase !== 'commands') return p;
    var n = clone(p), count = 0;
    for (var id of alive(n)) {
      var o = orders[id];
      if (!o || ['attack', 'magic', 'item'].indexOf(o.type) < 0) return p;
      if (o.type === 'magic' && n.roster[id].mp < B.MAGIC_COST) return p;
      if (o.type === 'item') count++;
      if ((o.type === 'item' || o.type === 'magic' && id === 'rin') && n.party.indexOf(o.target) < 0) return p;
      n.battle.orders[id] = { type: o.type, target: o.target || id };
    }
    if (count > n.potions) return p;
    n.battle.guarded = false; n.battle.ward = false; n.battle.log = [];
    if (!setQuestion(n, bank, grade, rng, now)) return p;
    n.battle.phase = 'attack';
    return n;
  }
  function log(b, key, who, amount, actor) { var entry = { key:key, who:who, amount:amount }; if (actor && actor !== who) entry.actor = actor; b.log.push(entry); }
  function victory(n, rng) {
    var b = n.battle, e = B.ENEMIES[b.enemy];
    b.phase = 'win'; b.reward = { xp: e.xp, gold: e.gold, levels: [] };
    n.gold += e.gold;
    if (typeof rng === 'function' && rng() < B.DROP_RATE) {
      b.reward.chest = { gold: B.DROP_GOLD, potions: B.DROP_POTIONS };
      n.gold += B.DROP_GOLD; n.potions += B.DROP_POTIONS;
    }
    if (n.cleared.indexOf(b.enemy) < 0) n.cleared.push(b.enemy);
    n.party.forEach(function (id) {
      var r = n.roster[id], old = stats(id, r.xp); r.xp += e.xp;
      var next = stats(id, r.xp);
      if (next.level > old.level) {
        if (r.hp > 0) r.hp += next.hp - old.hp;
        r.mp += next.mp - old.mp;
        b.reward.levels.push({ id: id, level: next.level });
      }
    });
  }
  function attack(n, correct, rng, gear) {
    gear = gear || {};
    var b = n.battle, e = B.ENEMIES[b.enemy];
    alive(n).sort(function (a, c) { return stats(c, n.roster[c].xp).speed - stats(a, n.roster[a].xp).speed; }).forEach(function (id) {
      var o = b.orders[id], r = n.roster[id], s = stats(id, r.xp), target = o && n.roster[o.target];
      if (!o || b.hp <= 0) return;
      if (o.type === 'item') {
        if (!n.potions || !target) return;
        var healed = Math.min(B.POTION_HEAL, stats(o.target, target.xp).hp - target.hp);
        if (healed <= 0) { log(b, 'full', o.target, 0, id); return; }
        n.potions--; target.hp += healed; log(b, 'heal', o.target, healed, id); return;
      }
      if (o.type === 'magic') {
        r.mp -= B.MAGIC_COST;
        if (id === 'rin') { var h = Math.min(B.HEAL + s.wisdom, stats(o.target, target.xp).hp - target.hp); target.hp += h; log(b, 'heal', o.target, h, id); return; }
        if (id === 'gan') { b.guarded = true; log(b, 'guard', id, 0); return; }
        if (id === 'sora') { b.ward = true; log(b, 'ward', id, 0); return; }
      }
      var damage = Math.max(1, Math.round(((o.type === 'magic' ? s.wisdom * B.MAGIC_POWER : s.strength + (id === 'hero' ? gear.attack || 0 : 0)) - e.defense * B.ARMOR_RATE) * (correct ? B.QUIZ_ATTACK_RATE : 1)));
      damage = Math.min(b.hp, damage); b.hp -= damage;
      log(b, 'hit', id, damage);
    });
    if (b.hp <= 0) victory(n, rng); else b.phase = 'playerAction';
  }
  function defend(n, correct, gear) {
    gear = gear || {};
    var b = n.battle, e = B.ENEMIES[b.enemy], plan = intent(n);
    var targets = plan.all ? alive(n) : [plan.target];
    if (!plan.all && b.guarded && n.party.indexOf('gan') >= 0 && n.roster.gan.hp > 0) targets = ['gan'];
    targets.forEach(function (id) {
      var r = n.roster[id], s = stats(id, r.xp);
      var damage = Math.max(1, Math.round((e.attack * (correct ? B.QUIZ_ENEMY_RATE : 1) * (plan.heavy ? 1.5 : 1) - (s.defense + (id === 'hero' ? gear.defense || 0 : 0)) * B.ARMOR_RATE) *
        (b.ward ? B.WARD_RATE : 1) * (id === 'gan' && b.guarded ? B.GUARD_RATE : 1)));
      damage = Math.min(r.hp, damage); r.hp -= damage; log(b, 'hurt', id, damage);
      if (!r.hp) log(b, 'down', id, 0);
    });
    b.phase = alive(n).length ? 'enemyAction' : 'lose';
  }
  function answer(p, input, now) {
    if (!p.battle || p.battle.phase !== 'attack') return p;
    var q = p.battle.question, judged = FF.answer.judge(q, input);
    if (judged.empty) return p;
    var n = clone(p), b = n.battle;
    n.answered++; if (judged.correct) n.correct++;
    n.recent = n.recent.concat([q.id]).slice(-B.RECENT);
    n.history = n.history.concat([{ qid: q.id, subject: q.subject, grade: q.gradeLevel, correct: judged.correct, at: now, phase: b.phase }]).slice(-B.HISTORY);
    b.correct = judged.correct; b.log = [];
    b.phase = 'explanation';
    return n;
  }
  function advance(p, bank, grade, rng, now, gear) {
    if (!p.battle) return p;
    var n = clone(p), b = n.battle;
    if (b.phase === 'explanation') { attack(n, b.correct, rng, gear); }
    else if (b.phase === 'playerAction') { b.log = []; defend(n, b.correct, gear); }
    else if (b.phase === 'enemyAction') { b.phase = 'commands'; b.turn++; b.orders = {}; b.log = []; b.question = null; }
    else if (b.phase === 'win') { n.battle = null; n.notice = b.enemy === 'boss' ? 'passOpen' : 'victory'; }
    else if (b.phase === 'lose') { n = rest(n, n.lastTown); n.notice = 'rescued'; }
    else return p;
    return n;
  }
  function retreat(p) {
    if (!p.battle || ['win', 'lose'].indexOf(p.battle.phase) >= 0) return p;
    var n = clone(p); n.battle = null;
    // 接触位置の一歩手前へ戻す。再開直後に再接触しない。
    n.pos.x = Math.max(1, n.pos.x - 1); n.notice = 'retreated'; return n;
  }
  function potion(p, id) {
    if (p.battle || !p.potions || p.party.indexOf(id) < 0 || p.roster[id].hp >= stats(id, p.roster[id].xp).hp) return p;
    var n = clone(p); n.potions--; n.roster[id].hp = Math.min(stats(id, n.roster[id].xp).hp, n.roster[id].hp + B.POTION_HEAL); return n;
  }
  FF.adventure = { IDS: IDS, MAP: MAP, PLACES: PLACES, ENEMIES: ENEMIES, create: create, normalize: normalize,
    stats: stats, level: level, same: same, alive: alive, atTown: atTown, rest: rest, depart: depart, setParty: setParty,
    walkable: walkable, path: path, enemyAt: enemyAt, move: move, encounter: encounter, intent: intent,
    command: command, answer: answer, advance: advance, retreat: retreat, potion: potion, pick: pick };
})(this);
