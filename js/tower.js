// 夜の防衛戦（タワーディフェンス。判断442・443、SPEC_tower.md）：戦いのロジック。DOM・localStorage に触れない。
// 戦いの状態（battle）は、保存しない一時的な、JSON にできるデータ。step・place・answer などは、battle を、その場で書きかえる（速いので）。
// セーブする state.tower（勝った記録・今日の報酬の回数）は、書きかえず、新しい state を返す。乱数は、種つき（同じ種なら、同じ戦い）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function T(b) { return (b || FF.balance).TOWER; }
  function clone(v) { return FF.util.clone(v); }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function int(v, d, max) { v = Math.floor(v); return isFinite(v) && v >= 0 ? Math.min(max == null ? 1e9 : max, v) : d; }
  function rand(b) {   // mulberry32。b.rng を進める
    b.rng = (b.rng + 0x6D2B79F5) >>> 0;
    var t = b.rng;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // ---- 仲間（並べるもの） ----
  function roster(state, b) {
    var rec = state && state.adventure && state.adventure.recruited || [];
    return Object.keys(T(b).UNITS).filter(function (id) { return rec.indexOf(id) >= 0; });
  }
  // 冒険の能力（レベル・装備）を、戦場の能力にする
  function unitStats(state, id, b) {
    var t = T(b), u = t.UNITS[id], a = state.adventure, xp = a && a.roster && a.roster[id] ? a.roster[id].xp : 0;
    var st = FF.adventure.stats(id, xp), lv = 1 + t.LEVEL_RATE * (st.level - 1);
    var eq = FF.shop.equippedOf(state, id, b), w = eq.weapon && FF.shop.stats(eq.weapon, b), ar = eq.armor && FF.shop.astats(eq.armor, b);
    var wb = w ? Math.max(0, w.damage - FF.shop.baseDamage(b)) : 0, ad = ar ? ar.defense : 0;
    var out = Object.assign({}, u);
    out.hp = Math.max(1, Math.round(st.hp * t.HP_RATE * u.hp * lv + ad * t.ARMOR_HP));
    out.atk = u.atk > 0 ? Math.max(1, Math.round(st[u.stat] * t.ATK_RATE * u.atk * lv + wb * t.WEAPON_ATK * u.atk)) : 0;
    out.interval = clamp(u.interval * 10 / Math.max(1, st.speed), 0.35, 3);
    if (u.role === 'ward' || u.role === 'sage') out.interval = u.interval;
    return out;
  }

  // 人口による、灯の速さの倍率（はじめの10人なら 1。上限 POP_MAX）
  function popMult(state, b) {
    var L = T(b).LIGHT, pop = FF.buildings && FF.buildings.population ? FF.buildings.population(state, b) : null;
    return pop ? Math.min(L.POP_MAX, 1 + L.POP_BONUS * Math.max(0, pop.total - pop.base)) : 1;
  }

  // ---- 住民の応援（判断456） ----
  // 信頼が「恩人」になった町の人（CHEER に定義のある人だけ）
  function cheers(state, b) {
    var C = T(b).CHEER;
    return Object.keys(C).filter(function (k) { return k !== 'LEVEL' && state && state.quests && FF.quests && FF.quests.trustLevel(state, k, b) >= C.LEVEL; });
  }

  // 難しさごとのレーン数（opts.lanes で上書きできるのは、練習）
  function lanesOf(d, b) { var t = T(b), n = t.LANES_BY_LEVEL && t.LANES_BY_LEVEL[d - 1]; return n || t.LANES; }

  // ---- 戦いを作る ----
  // 難しさ d のときの、増え方の倍率（難しさ1が 1）。5まで：1つにつき key の割合。6以降：TAIL の割合
  function grow(key, d, b) { var L = T(b).LEVEL; return 1 + L[key] * (Math.min(d, 5) - 1) + L.TAIL[key] * Math.max(0, d - 5); }

  function waveList(d, b, lanes) {
    var t = T(b), L = t.LEVEL, list = [], lf = (lanes || t.LANES) / t.LANES;   // レーンがふえると、魔物の数も、レーンの数に合わせてふえる
    t.WAVES.forEach(function (w, i) {
      var items = [];
      Object.keys(t.WAVES_NEW || {}).forEach(function (k) {   // 新しい魔物（氷の精霊・雪の巨人）
        var nw = t.WAVES_NEW[k], base = nw.PER_WAVE[i] || 0;
        if (d >= nw.FROM && base) for (var q = 0, n = Math.round(base * (1 + grow('COUNT', d, b) - grow('COUNT', nw.FROM, b)) * lf); q < n; q++) items.push(k);
      });
      Object.keys(w).forEach(function (k) {
        var n = k === 'boss' ? w[k] + Math.floor((d - 1) / L.BOSS_EVERY) : Math.round(w[k] * grow('COUNT', d, b) * lf);
        for (var j = 0; j < n; j++) items.push(k);
      });
      list.push(items);
    });
    return list;
  }
  // opts：difficulty（1〜5）、seed（整数）、mode（'raid'｜'practice'）
  function create(state, opts, b) {
    var t = T(b), d = clamp(Math.floor(opts && opts.difficulty) || 1, 1, t.MAX_LEVEL), seed = (opts && opts.seed != null ? opts.seed : 1) >>> 0;
    var lanes = opts && opts.lanes && T(b).LANES_CHOICES.indexOf(opts.lanes) >= 0 && opts.mode !== 'raid' ? opts.lanes : lanesOf(d, b);
    var bt = { version: 1, lanes: lanes, mode: opts && opts.mode === 'raid' ? 'raid' : 'practice', difficulty: d, seed: seed, rng: seed, t: 0,
      core: { hp: t.CORE_HP, max: t.CORE_HP }, light: t.LIGHT.START, quizLock: 0, units: [], enemies: [], schedule: [], nextId: 1, placed: {},
      defs: {}, kills: 0, wave: 0, result: null };
    roster(state, b).forEach(function (id) { bt.defs[id] = unitStats(state, id, b); });
    // 町の人口が多いほど、灯が自然にふえる速さが、上がる（判断457）
    bt.popMult = popMult(state, b); bt.trickle = t.LIGHT.TRICKLE * bt.popMult;
    // 住民の応援：はじめの灯・仲間の HP・炉の熱は、ここで。矢と手当ては、step で、時間ごとに（cheerT）。cheerLog は、画面に知らせるための記録
    bt.cheers = cheers(state, b); bt.cheerT = {}; bt.cheerLog = [];
    var C = t.CHEER;
    bt.cheers.forEach(function (k) {
      if (k === 'baker') bt.light += C.baker.light;
      if (k === 'woodcutter') Object.keys(bt.defs).forEach(function (id) { bt.defs[id].hp = Math.round(bt.defs[id].hp * (1 + C.woodcutter.hp)); });
      if (k === 'elder') { bt.core.hp += C.elder.core; bt.core.max += C.elder.core; }
      if (k === 'hunter' || k === 'nurse') bt.cheerT[k] = C[k].every;
    });
    var lists = waveList(d, b, lanes);
    lists.forEach(function (items, wi) {
      for (var i = items.length - 1; i > 0; i--) { var j = Math.floor(rand(bt) * (i + 1)), x = items[i]; items[i] = items[j]; items[j] = x; }
      items.forEach(function (type, k) { bt.schedule.push({ at: t.WAVE_START[wi] + k * t.SPAWN_GAP, wave: wi + 1, type: type, lane: Math.floor(rand(bt) * lanes), done: false }); });
    });
    bt.schedule.sort(function (a, c) { return a.at - c.at; });
    return bt;
  }

  // ---- 並べる・下げる ----
  function cost(bt, id, b) { var u = T(b).UNITS[id]; return u ? u.cost + T(b).LIGHT.COST_STEP * (bt.placed[id] || 0) : 0; }
  function unitAt(bt, lane, col) { for (var i = 0; i < bt.units.length; i++) if (bt.units[i].lane === lane && bt.units[i].col === col) return bt.units[i]; return null; }
  function canPlace(bt, id, lane, col, b) {
    var t = T(b);
    if (bt.result) return { ok: false, reason: 'over' };
    if (!bt.defs[id]) return { ok: false, reason: 'roster' };
    if (lane < 0 || lane >= (bt.lanes || t.LANES) || col < t.PLACE_FROM || col > t.PLACE_TO || lane !== Math.floor(lane) || col !== Math.floor(col)) return { ok: false, reason: 'cell' };
    if (unitAt(bt, lane, col)) return { ok: false, reason: 'occupied' };
    if (bt.light < cost(bt, id, b)) return { ok: false, reason: 'light' };
    return { ok: true };
  }
  function place(bt, id, lane, col, b) {
    var c = canPlace(bt, id, lane, col, b);
    if (!c.ok) return c;
    var d = bt.defs[id], paid = cost(bt, id, b);
    bt.light -= paid; bt.placed[id] = (bt.placed[id] || 0) + 1;
    var u = { id: bt.nextId++, member: id, lane: lane, col: col, hp: d.hp, max: d.hp, cd: d.role === 'healer' ? d.interval : 0.5, paid: paid };
    bt.units.push(u);
    return { ok: true, unit: u };
  }
  function remove(bt, unitId, b) {
    for (var i = 0; i < bt.units.length; i++) if (bt.units[i].id === unitId) {
      var u = bt.units[i];
      bt.light = Math.min(T(b).LIGHT.MAX, bt.light + Math.floor(u.paid * T(b).LIGHT.REFUND));
      bt.placed[u.member] = Math.max(0, (bt.placed[u.member] || 1) - 1);
      bt.units.splice(i, 1);
      return { ok: true };
    }
    return { ok: false, reason: 'none' };
  }

  // ---- 問題（灯） ----
  function canQuiz(bt) { return !bt.result && bt.quizLock <= 0; }
  // diffKey：冒険で決めた難しさ（'basic'｜'standard'｜'advanced'）
  function answer(bt, correct, diffKey, b) {
    var L = T(b).LIGHT;
    if (correct) { var g = (L.PER_CORRECT[diffKey] || L.PER_CORRECT.standard) + (bt.cheers && bt.cheers.indexOf('child') >= 0 ? T(b).CHEER.child.light : 0); bt.light = Math.min(L.MAX, bt.light + g); bt.quizLock = L.CORRECT_LOCK; return { gained: g, lock: L.CORRECT_LOCK }; }
    bt.quizLock = L.WRONG_LOCK;
    return { gained: 0, lock: L.WRONG_LOCK };
  }

  // ---- 進める ----
  function ux(u) { return u.col + 0.5; }
  function wardReduce(bt, u, b) {
    var r = 1;
    bt.units.forEach(function (w) { var d = bt.defs[w.member]; if (d.role === 'ward' && w.hp > 0 && !(w.frozen > 0) && Math.abs(w.lane - u.lane) <= 1 && Math.abs(w.col - u.col) <= d.range) r = Math.min(r, d.reduce); });
    return r;
  }
  function slowOf(bt, e) {
    var s = 1;
    bt.units.forEach(function (w) { var d = bt.defs[w.member]; if (d.role === 'ward' && w.hp > 0 && !(w.frozen > 0) && w.lane === e.lane) { var dx = e.x - ux(w); if (dx > 0 && dx <= d.slowRange) s = Math.min(s, d.slow); } });
    return s;
  }
  function target(bt, u, d) {
    var best = null, bd = 1e9;
    bt.enemies.forEach(function (e) { if (e.lane !== u.lane || e.hp <= 0) return; var dx = e.x - ux(u); if (dx > -0.3 && dx <= d.range && dx < bd) { best = e; bd = dx; } });
    return best;
  }
  function hit(bt, e, dmg) { e.hp -= dmg; }

  function step(bt, dt, b) {
    if (bt.result) return bt;
    var t = T(b); dt = dt || t.TICK;
    bt.t += dt; bt.quizLock = Math.max(0, bt.quizLock - dt);
    // 灯：ゆっくり増える。学者がいると、もっと
    var sages = 0;
    bt.units.forEach(function (u) { if (bt.defs[u.member].role === 'sage' && u.hp > 0 && !(u.frozen > 0)) sages++; });
    var rate = bt.trickle != null ? bt.trickle : t.LIGHT.TRICKLE, sd = t.UNITS.gakusha;
    rate += sd ? Math.min(sages, sd.trickleMax) * sd.trickle : 0;
    bt.light = Math.min(t.LIGHT.MAX, bt.light + rate * dt);
    // 魔物が出る
    var d = bt.difficulty, L = t.LEVEL;
    bt.schedule.forEach(function (s) {
      if (s.done || s.at > bt.t) return;
      s.done = true; bt.wave = Math.max(bt.wave, s.wave);
      var def = t.ENEMIES[s.type], hp = Math.round(def.hp * grow('HP', d, b));
      bt.enemies.push({ id: bt.nextId++, type: s.type, lane: s.lane, x: t.COLS, hp: hp, max: hp, atk: def.atk * grow('ATK', d, b), interval: def.interval,
        speed: def.speed * grow('SPEED', d, b), cd: def.interval, core: def.core, sk: def.freeze ? def.freeze.cd * 0.6 : 0 });
    });
    // 住民の応援：猟師の矢（各道の、いちばん炉に近い魔物）・看護の手当て（仲間みんなの HP）
    var C = t.CHEER;
    if (bt.cheerT && bt.cheerT.hunter != null) {
      bt.cheerT.hunter -= dt;
      if (bt.cheerT.hunter <= 0) {
        bt.cheerT.hunter = C.hunter.every;
        for (var ln = 0; ln < (bt.lanes || t.LANES); ln++) { var front = null; bt.enemies.forEach(function (e) { if (e.lane === ln && e.hp > 0 && (!front || e.x < front.x)) front = e; }); if (front) hit(bt, front, C.hunter.damage); }
        bt.cheerLog.push({ who: 'hunter', t: bt.t });
      }
    }
    if (bt.cheerT && bt.cheerT.nurse != null) {
      bt.cheerT.nurse -= dt;
      if (bt.cheerT.nurse <= 0) {
        bt.cheerT.nurse = C.nurse.every;
        bt.units.forEach(function (u) { if (u.hp > 0) u.hp = Math.min(u.max, u.hp + u.max * C.nurse.heal); });
        bt.cheerLog.push({ who: 'nurse', t: bt.t });
      }
    }
    // 仲間の行動
    bt.units.forEach(function (u) {
      if (u.hp <= 0) return;
      if (u.frozen > 0) { u.frozen = Math.max(0, u.frozen - dt); return; }   // 凍っているあいだは、何もできない
      var def = bt.defs[u.member];
      if (def.role === 'ward' || def.role === 'sage' || def.atk <= 0) return;
      u.cd -= dt;
      if (u.cd > 0) return;
      if (def.role === 'healer') {
        var healed = false;
        bt.units.forEach(function (o) { if (o.hp > 0 && o.hp < o.max && Math.abs(o.lane - u.lane) <= 1 && Math.abs(o.col - u.col) <= def.range) { o.hp = Math.min(o.max, o.hp + def.atk); healed = true; } });
        u.cd = healed ? def.interval : 0.3;
        return;
      }
      var tg = target(bt, u, def);
      if (!tg) { u.cd = 0.1; return; }
      if (def.aoe) bt.enemies.forEach(function (e) { if (e.hp > 0 && Math.abs(e.lane - tg.lane) <= 1 && Math.abs(e.x - tg.x) <= def.aoe) hit(bt, e, def.atk); });
      else hit(bt, tg, def.atk);
      u.cd = def.interval;
    });
    // 魔物の行動
    bt.enemies.forEach(function (e) {
      if (e.hp <= 0) return;
      var block = null;
      bt.units.forEach(function (u) { if (u.hp > 0 && u.lane === e.lane) { var dx = e.x - ux(u); if (dx >= -0.2 && dx <= 0.7 && (!block || ux(u) > ux(block))) block = u; } });
      var ed = t.ENEMIES[e.type] || {};
      if (ed.freeze) {   // 氷の精霊：射程の中の最前列の仲間を、凍らせる（もう凍っている仲間は、とばす）
        e.sk -= dt;
        if (e.sk <= 0) {
          var tg = null;
          bt.units.forEach(function (u) { var dx = e.x - ux(u); if (u.lane === e.lane && u.hp > 0 && !(u.frozen > 0) && dx > -0.3 && dx <= ed.freeze.range && (!tg || ux(u) > ux(tg))) tg = u; });
          if (tg) { tg.frozen = ed.freeze.dur; e.sk = ed.freeze.cd; } else e.sk = 0.4;
        }
      }
      if (block) {
        e.cd -= dt;
        if (e.cd <= 0) { block.hp -= e.atk * wardReduce(bt, block, b) * (ed.wall && bt.defs[block.member].role === 'wall' ? ed.wall : 1); e.cd = e.interval; }
        return;
      }
      e.x -= e.speed * slowOf(bt, e) * dt;
      if (e.x <= t.CORE_X) { bt.core.hp = Math.max(0, bt.core.hp - e.core); e.hp = 0; e.reached = true; }
    });
    // 倒れたものを片づける
    bt.units = bt.units.filter(function (u) { return u.hp > 0; });
    var alive = [];
    bt.enemies.forEach(function (e) { if (e.hp > 0) alive.push(e); else if (!e.reached) bt.kills++; });
    bt.enemies = alive;
    // 勝ち負け
    if (bt.core.hp <= 0) bt.result = 'lose';
    else if (bt.schedule.every(function (s) { return s.done; }) && bt.enemies.length === 0) bt.result = 'win';
    else if (bt.t >= t.MAX_TIME) bt.result = 'lose';
    return bt;
  }
  // 秒数ぶん、進める（テスト・確認用）。勝ち負けが決まったら、止まる
  function run(bt, seconds, b) {
    var n = Math.round(seconds / T(b).TICK);
    for (var i = 0; i < n && !bt.result; i++) step(bt, T(b).TICK, b);
    return bt;
  }

  // ---- 記録（state.tower）と報酬 ----
  function createState() { return { version: 1, day: null, rewards: 0, cleared: {}, wins: 0, best: {} }; }
  function normalize(state, b) {
    var s = clone(state), r = s.tower;
    if (!r || typeof r !== 'object') { s.tower = createState(); return s; }
    var cl = {}, best = {};
    for (var d = 1; d <= T(b).MAX_LEVEL; d++) { if (r.cleared && r.cleared[d]) cl[d] = true; var v = r.best && r.best[d]; if (typeof v === 'number') best[d] = int(v, 0, T(b).WAVES.length); }
    s.tower = { version: 1, day: typeof r.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(r.day) ? r.day : null, rewards: int(r.rewards, 0, T(b).RAIDS_PER_DAY), cleared: cl, wins: int(r.wins, 0, 1e7), best: best };
    return s;
  }
  // 日がかわったら、今日の報酬の回数を 0 に戻す（変わらなければ、同じ state を返す）
  function today(state, now) {
    var key = FF.daily.dayKey(now), r = state.tower || createState();
    if (r.day === key) return state;
    var s = clone(state); s.tower = Object.assign({}, createState(), r, { day: key, rewards: 0 });
    return s;
  }
  function raidsLeft(state, now, b) { var s = today(state, now); return Math.max(0, T(b).RAIDS_PER_DAY - (s.tower.rewards || 0)); }
  // 勝ったことのある、いちばん上の難しさ
  function maxCleared(state, b) { var m = 0, c = state.tower && state.tower.cleared || {}; for (var d = 1; d <= T(b).MAX_LEVEL; d++) if (c[d]) m = d; return m; }
  // 挑める、いちばん上の難しさ（勝って解放：前の難しさに勝つと、次に進める。中央炉のレベルとは、つながらない。判断461）
  function unlockedMax(state, b) { return clamp(maxCleared(state, b) + 1, 1, T(b).MAX_LEVEL); }
  function isUnlocked(state, d, b) { return d >= 1 && d <= unlockedMax(state, b); }
  // 練習・襲撃で、はじめに選ばれている難しさ（いちばん先）
  function raidDifficulty(state, b) { return unlockedMax(state, b); }
  function practiceMax(state, b) { return unlockedMax(state, b); }
  function rewardFor(state, d, now, b) {
    var R = T(b).REWARD, first = !(state.tower && state.tower.cleared && state.tower.cleared[d]);
    var ids = FF.defs.RESOURCES.map(function (x) { return x.id; }), rand2 = FF.daily.rng(FF.daily.seedOf('tower:' + FF.daily.dayKey(now) + ':' + d)), pool = ids.slice(), res = {};
    for (var k = 0; k < R.RES_KINDS && pool.length; k++) res[pool.splice(Math.floor(rand2() * pool.length), 1)[0]] = d * R.RES_PER_LEVEL;
    return { gold: d * R.GOLD_PER_LEVEL * (first ? R.FIRST_CLEAR : 1), res: res, potions: d >= R.POTION_FROM_LEVEL ? 1 : 0, first: first };
  }
  // 戦いが終わったら、記録して、報酬を渡す。返すもの：{ state, reward（もらえたときだけ。なければ null） }
  function finish(state, bt, now, b) {
    var s = today(state, now), d = bt.difficulty, reward = null;
    if (bt.result !== 'win' && bt.result !== 'lose') return { state: state, reward: null };
    s = clone(s);
    var tw = s.tower;
    tw.best[d] = Math.max(tw.best[d] || 0, bt.result === 'win' ? T(b).WAVES.length : Math.max(0, bt.wave - 1));
    if (bt.result === 'win') {
      if (bt.mode === 'raid' && (tw.rewards || 0) < T(b).RAIDS_PER_DAY) {
        reward = rewardFor(s, d, now, b);
        s = FF.shop.addGold(s, reward.gold);
        Object.keys(reward.res).forEach(function (k) { s.resources[k] = (s.resources[k] || 0) + reward.res[k]; });
        if (reward.potions) s.adventure.potions = Math.min(FF.balance.ADVENTURE.POTION_MAX, (s.adventure.potions || 0) + reward.potions);
        s.tower.rewards = (s.tower.rewards || 0) + 1;
      }
      s.tower.cleared[d] = true; s.tower.wins = (s.tower.wins || 0) + 1;
    }
    return { state: s, reward: reward };
  }

  FF.tower = { lanesOf: lanesOf, popMult: popMult, cheers: cheers, roster: roster, unitStats: unitStats, create: create, cost: cost, canPlace: canPlace, place: place, remove: remove, unitAt: unitAt, canQuiz: canQuiz, answer: answer,
    step: step, run: run, createState: createState, normalize: normalize, today: today, raidsLeft: raidsLeft, raidDifficulty: raidDifficulty, maxCleared: maxCleared, unlockedMax: unlockedMax, isUnlocked: isUnlocked,
    practiceMax: practiceMax, rewardFor: rewardFor, finish: finish };
})(this);
