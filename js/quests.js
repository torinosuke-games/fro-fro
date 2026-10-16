// 住民の依頼クエスト（酒場。判断434・SPEC_quest.md）：純粋関数のみ。DOM・localStorage に触れない。時刻は呼び出し側が FF.clock.now() で渡す。
// 状態は state.quests = { version, day, board: [依頼...], history: { completed } }。関数は、新しい state を返す（もとは変えない）。
// 依頼：{ id, kind: 'deliver'|'hunt'|'study', who, target, need, reward: { gold, res: {id: n}, potions }, accepted, progress, claimed }
//   deliver：target＝資材の id。「渡す」で、資材を need 個引く（progress が need になる）。
//   hunt：target＝敵の id（'cub'|'wolf'）。受けたあとに雪原の冒険で勝った数が progress。
//   study：target＝教科の id か 'any'。受けたあとに正解した数が progress。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function Q(b) { return (b || FF.balance).QUESTS; }
  function clone(v) { return FF.util.clone(v); }
  function int(v, d, max) { v = Math.floor(v); return isFinite(v) && v >= 0 ? Math.min(max == null ? 1e9 : max, v) : d; }
  function pick(list, rand) { return list[Math.floor(rand() * list.length) % list.length]; }

  function create() { return { version: 1, day: null, board: [], history: { completed: 0 } }; }

  // 中央炉のレベル（1〜）。数量の表の、何番目を使うか
  function tier(state, b) {
    var f = state && state.buildings && state.buildings.furnace, lv = f ? Math.max(1, Math.floor(f.level) || 1) : 1;
    return Math.min(lv, Q(b).DELIVER.NEED.length) - 1;
  }
  function huntable(state) { return !!(state && state.adventure && state.adventure.started); }
  function subjectIds() { return FF.defs.SUBJECTS.map(function (x) { return x.id; }); }
  function resourceIds() { return FF.defs.RESOURCES.map(function (x) { return x.id; }); }
  // 依頼を出す人：町の人 ＋ 救出した旅人（仲間になった人のうち、はじめからいる3人以外）
  function residents(state, b) {
    var base = Q(b).RESIDENTS.slice(), a = state && state.adventure, start = (b || FF.balance).ADVENTURE.START_ALLIES;
    ((a && a.recruited) || []).forEach(function (id) { if (start.indexOf(id) < 0 && base.indexOf(id) < 0) base.push(id); });
    return base;
  }

  // ---- 日替わりの依頼を作る（日付だけから決まる。同じ日・同じ進み具合なら同じ） ----
  function reward(kind, target, need, rand, b) {
    var q = Q(b), r = { gold: 0, res: {}, potions: 0 };
    if (kind === 'deliver') {
      r.gold = need * q.DELIVER.GOLD_PER_UNIT;
      r.res[target] = Math.ceil(need * (1 + q.DELIVER.RETURN_BONUS));   // お礼：渡した分より少し多く返る
    } else if (kind === 'hunt') {
      r.gold = need * q.HUNT.GOLD_PER_KILL * (target === 'wolf' ? 1.5 : 1);
    } else {
      r.gold = need * q.STUDY.GOLD_PER_CORRECT;
    }
    if (rand() < q.POTION_CHANCE) r.potions = q.POTION_COUNT;
    r.gold = Math.min(q.GOLD_MAX_PER_QUEST, Math.round(r.gold));
    return r;
  }
  // 1つ目の納品の資材：4日ごとのまとまりで、4つの資材を1回ずつ、かならず出す（前の日と同じ資材には、かならずならない）
  function dayNumber(key) { var p = key.split('-'); return Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000); }
  function blockOrder(block) {
    var ids = resourceIds(), n = ids.length;
    function perm(k) { return FF.daily.shuffle ? FF.daily.shuffle(ids, FF.daily.rng(FF.daily.seedOf('quest-block:' + k))) : ids; }
    var cur = perm(block).slice();
    if (cur[0] === perm(block - 1)[n - 1]) { var t = cur[0]; cur[0] = cur[1]; cur[1] = t; }
    return cur;
  }
  function deliverOfDay(key) { var ids = resourceIds(), n = dayNumber(key), o = blockOrder(Math.floor(n / ids.length)); return o[((n % ids.length) + ids.length) % ids.length]; }

  function make(kind, idx, state, rand, key, used, b) {
    var q = Q(b), t = tier(state, b), who = pick(residents(state, b), rand), target, need;
    if (kind === 'deliver') {
      if (!used.length) target = deliverOfDay(key);
      else { var res = resourceIds().filter(function (x) { return used.indexOf(x) < 0; }); target = pick(res.length ? res : resourceIds(), rand); }
      need = q.DELIVER.NEED[t];
    } else if (kind === 'hunt') {
      var es = q.HUNT.ENEMIES.filter(function (x) { return x !== 'wolf' || t + 1 >= q.HUNT.WOLF_FROM_LEVEL; });
      target = pick(es, rand); need = q.HUNT.COUNT[t];
    } else {
      target = rand() < q.STUDY.ANY_SHARE ? 'any' : pick(subjectIds(), rand); need = q.STUDY.COUNT[t];
    }
    if (kind === 'deliver') used.push(target);
    return { id: key + '-' + idx, kind: kind, who: who, target: target, need: need, reward: reward(kind, target, need, rand, b), accepted: false, progress: 0, claimed: false };
  }
  function generate(state, now, b) {
    var key = FF.daily.dayKey(now), rand = FF.daily.rng(FF.daily.seedOf('quest:' + key + ':' + tier(state, b)));
    var q = Q(b), kinds = q.KINDS.slice(0, q.PER_DAY), used = [], board = [];
    kinds.forEach(function (k, i) {
      if (k === 'hunt' && !huntable(state)) k = 'deliver';   // 冒険を始めていないときは、討伐のかわりに納品
      board.push(make(k, i, state, rand, key, used, b));
    });
    return board;
  }

  // 今日の依頼にそろえた state を返す（日がかわっていたら、作り直す。受けたまま終わっていない依頼は消える）
  function today(state, now, b) {
    var key = FF.daily.dayKey(now), cur = state.quests;
    if (cur && cur.day === key && Array.isArray(cur.board) && cur.board.length) return state;
    var s = clone(state), old = cur && cur.history ? cur.history : { completed: 0 };
    s.quests = { version: 1, day: key, board: generate(state, now, b), history: { completed: int(old.completed, 0) } };
    return s;
  }
  function find(state, id) { var l = state.quests && state.quests.board || []; for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i]; return null; }
  function done(qu) { return !!qu && qu.progress >= qu.need; }
  function gold(state) { return Math.max(0, Math.floor(state && state.adventure && state.adventure.gold) || 0); }

  function accept(state, id) {
    var qu = find(state, id);
    if (!qu) return { ok: false, state: state, reason: 'none' };
    if (qu.accepted) return { ok: false, state: state, reason: 'already' };
    var s = clone(state); find(s, id).accepted = true;
    return { ok: true, state: s };
  }
  // 納品：資材を need 個渡す（足りなければ渡せない）
  function canDeliver(state, id) {
    var qu = find(state, id);
    if (!qu || qu.kind !== 'deliver') return { ok: false, reason: 'none' };
    if (!qu.accepted) return { ok: false, reason: 'notAccepted' };
    if (done(qu)) return { ok: false, reason: 'done' };
    if ((state.resources[qu.target] || 0) < qu.need) return { ok: false, reason: 'short' };
    return { ok: true };
  }
  function deliver(state, id) {
    var c = canDeliver(state, id);
    if (!c.ok) return { ok: false, state: state, reason: c.reason };
    var s = clone(state), qu = find(s, id);
    s.resources[qu.target] -= qu.need; qu.progress = qu.need;
    return { ok: true, state: s };
  }
  // 受けた依頼を進める（受けていない・終わった依頼は進まない）
  function advance(state, match, n) {
    var list = state.quests && state.quests.board || [], hit = false;
    var s = clone(state);
    s.quests.board.forEach(function (qu) {
      if (!qu.accepted || done(qu) || !match(qu)) return;
      qu.progress = Math.min(qu.need, qu.progress + (n || 1)); hit = true;
    });
    return hit ? s : state;
  }
  function onCorrect(state, subject) { return advance(state, function (qu) { return qu.kind === 'study' && (qu.target === 'any' || qu.target === subject); }, 1); }
  function onVictory(state, enemyId) { return advance(state, function (qu) { return qu.kind === 'hunt' && qu.target === enemyId; }, 1); }

  // 報告：達成した依頼の報酬をもらう（1回だけ）
  function canClaim(state, id) {
    var qu = find(state, id);
    if (!qu) return { ok: false, reason: 'none' };
    if (qu.claimed) return { ok: false, reason: 'claimed' };
    if (!done(qu)) return { ok: false, reason: 'notDone' };
    return { ok: true };
  }
  function claim(state, id, b) {
    var c = canClaim(state, id);
    if (!c.ok) return { ok: false, state: state, reason: c.reason };
    var s = clone(state), qu = find(s, id), r = qu.reward;
    s.adventure = s.adventure || (FF.adventure ? FF.adventure.create() : {});
    s.adventure.gold = Math.max(0, gold(state) + r.gold);
    if (r.potions) s.adventure.potions = Math.min((b || FF.balance).ADVENTURE.POTION_MAX, Math.max(0, Math.floor(s.adventure.potions) || 0) + r.potions);
    Object.keys(r.res || {}).forEach(function (k) { s.resources[k] = (s.resources[k] || 0) + r.res[k]; });
    qu.claimed = true; s.quests.history.completed += 1;
    return { ok: true, state: s, reward: clone(r) };
  }
  function remaining(state) { return (state.quests && state.quests.board || []).filter(function (qu) { return !qu.claimed; }).length; }

  // 読み込み時の整合：形がおかしい依頼を捨てる、数値は整数・範囲内に。日付の入れかえは today() が行う
  function normalize(state, b) {
    var s = clone(state), raw = s.quests, kinds = Q(b).KINDS, subs = subjectIds().concat(['any']), ress = resourceIds(), ens = Q(b).HUNT.ENEMIES;
    if (!raw || typeof raw !== 'object') { s.quests = create(); return s; }
    var board = (Array.isArray(raw.board) ? raw.board : []).filter(function (qu) {
      if (!qu || typeof qu.id !== 'string' || kinds.indexOf(qu.kind) < 0) return false;
      return qu.kind === 'deliver' ? ress.indexOf(qu.target) >= 0 : qu.kind === 'hunt' ? ens.indexOf(qu.target) >= 0 : subs.indexOf(qu.target) >= 0;
    }).slice(0, 12).map(function (qu) {
      var need = Math.max(1, int(qu.need, 1, 1000)), r = qu.reward && typeof qu.reward === 'object' ? qu.reward : {}, res = {};
      Object.keys(r.res && typeof r.res === 'object' ? r.res : {}).forEach(function (k) { if (ress.indexOf(k) >= 0) res[k] = int(r.res[k], 0, 10000); });
      return { id: qu.id, kind: qu.kind, who: typeof qu.who === 'string' ? qu.who.slice(0, 20) : '', target: qu.target, need: need,
        reward: { gold: int(r.gold, 0, Q(b).GOLD_MAX_PER_QUEST), res: res, potions: int(r.potions, 0, 5) },
        accepted: !!qu.accepted, progress: Math.min(need, int(qu.progress, 0, 1000)), claimed: !!qu.claimed };
    });
    s.quests = { version: 1, day: typeof raw.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.day) ? raw.day : null, board: board,
      history: { completed: int(raw.history && raw.history.completed, 0, 1e7) } };
    if (!board.length) s.quests.day = null;
    return s;
  }

  FF.quests = { create: create, today: today, find: find, done: done, accept: accept, canDeliver: canDeliver, deliver: deliver, onCorrect: onCorrect, onVictory: onVictory,
    canClaim: canClaim, claim: claim, remaining: remaining, normalize: normalize, residents: residents, tier: tier };
})(this);
