// 仲間が力を貸す条件（獲得熱量）と、魔法研究所の「魔法の書物」の開発（判断363）：純粋関数のみ。
// 司書は、獲得熱量（これまでに生んだ熱量の累計）が 10000 になると、勉強熱心な主人公に力を貸して、仲間になる。
// 司書が仲間になると、司書の持っていた魔法の書物を、魔法研究所で、ゴールドを使って開発できる（開発したぶん、冒険の魔法が強くなる）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function R(b) { return (b || FF.balance).RESEARCH; }
  function bookIds(b) { return Object.keys(R(b).BOOKS); }
  function adv(state) { return state && state.adventure || null; }
  function level(state, id, b) {
    var a = adv(state), max = R(b).BOOKS[id] ? R(b).BOOKS[id].costs.length : 0;
    return a && a.research ? Math.max(0, Math.min(max, Math.floor(a.research[id]) || 0)) : 0;
  }
  function gold(state) { return Math.max(0, Math.floor(adv(state) && adv(state).gold) || 0); }

  // ---- 熱量で、力を貸してくれる仲間 ----
  // 条件を満たしたのに、まだ仲間でない人を、仲間にする（state をその場で書きかえる）。新しく仲間になった人の一覧を返す
  function applyJoins(state, b) {
    var table = R(b).JOIN_BY_HEAT, earned = state.studyPointsEarnedTotal || 0, joined = [];
    if (!FF.adventure) return joined;
    Object.keys(table).forEach(function (id) {
      if (earned < table[id]) return;
      var a = state.adventure || (state.adventure = FF.adventure.create());
      if (a.recruited.indexOf(id) >= 0) return;
      state.adventure = FF.adventure.recruit(a, id);
      state.adventure.joinNotice = (state.adventure.joinNotice || []).concat([id]);
      joined.push(id);
    });
    return joined;
  }
  // あと何ptで、その仲間が力を貸してくれるか（画面の表示用）
  function joinProgress(state, id, b) {
    var need = R(b).JOIN_BY_HEAT[id], have = state.studyPointsEarnedTotal || 0;
    return { need: need, have: Math.min(have, need), remaining: Math.max(0, need - have), done: have >= need };
  }
  // 魔法研究所が使えるか（司書が仲間になっているか）
  function unlocked(state, b) { var a = adv(state); return !!a && a.recruited.indexOf(R(b).LAB_REQUIRES) >= 0; }

  // ---- 開発 ----
  function nextCost(state, id, b) { var d = R(b).BOOKS[id]; var l = level(state, id, b); return d && l < d.costs.length ? d.costs[l] : null; }
  // { ok, reason: 'locked' | 'unknown' | 'max' | 'gold', cost }
  function canDevelop(state, id, b) {
    if (!R(b).BOOKS[id]) return { ok: false, reason: 'unknown' };
    if (!unlocked(state, b)) return { ok: false, reason: 'locked' };
    var cost = nextCost(state, id, b);
    if (cost == null) return { ok: false, reason: 'max' };
    if (gold(state) < cost) return { ok: false, reason: 'gold', cost: cost };
    return { ok: true, cost: cost };
  }
  function develop(state, id, b) {
    var c = canDevelop(state, id, b);
    if (!c.ok) return { ok: false, state: state, reason: c.reason };
    var s = FF.util.clone(state);
    s.adventure.gold = gold(state) - c.cost;
    s.adventure.research = Object.assign({}, s.adventure.research || {});
    s.adventure.research[id] = level(state, id, b) + 1;
    return { ok: true, state: s };
  }
  // 冒険の戦闘に効く、開発のぶん：{ healBonus, powerMult, guardRate（かばう・ベールの軽減。小さいほど強い） }
  function effects(state, b) {
    var B = R(b).BOOKS;
    return {
      healBonus: B.heal.perLevel * level(state, 'heal', b),
      powerMult: 1 + B.flame.perLevel * level(state, 'flame', b),
      guardBonus: B.guard.perLevel * level(state, 'guard', b)   // 軽減率に足す（0.05 なら、被害が 5ポイント さらに減る）
    };
  }

  FF.research = {
    bookIds: bookIds, level: level, applyJoins: applyJoins, joinProgress: joinProgress, unlocked: unlocked,
    nextCost: nextCost, canDevelop: canDevelop, develop: develop, effects: effects
  };
})(this);
