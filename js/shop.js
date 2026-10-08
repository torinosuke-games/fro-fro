// 武器屋（判断330）：純粋関数のみ。ゴールドで武器を買い、1つ装備する。装備した武器が、戦闘の正解1問のダメージを決める。
// 木の剣は、はじめから持っている（値段 0）。ゴールドの入手のしくみは、まだない（デバッグ画面で足せる）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  function ids() { return FF.defs.WEAPONS.map(function (w) { return w.id; }); }
  function def(id) { return FF.defs.WEAPONS.filter(function (w) { return w.id === id; })[0] || null; }
  function stats(id, b) { return bal(b).WEAPONS[id] || null; }

  function gold(state) { return Math.max(0, Math.floor(state && state.gold) || 0); }
  function eq(state, b) {
    var e = state && state.equipment || {}, d = bal(b).DEFAULT_WEAPON;
    var owned = (Array.isArray(e.owned) ? e.owned : []).filter(function (x) { return stats(x, b); });
    if (owned.indexOf(d) < 0) owned.unshift(d);
    var weapon = stats(e.weapon, b) && owned.indexOf(e.weapon) >= 0 ? e.weapon : d;
    return { weapon: weapon, owned: owned };
  }
  function owns(state, id, b) { return eq(state, b).owned.indexOf(id) >= 0; }
  function currentWeapon(state, b) { return eq(state, b).weapon; }
  // 正解1問で敵に与えるダメージ（装備中の武器）
  function damagePerCorrect(state, b) { return stats(currentWeapon(state, b), b).damage; }

  // 買えるか：{ ok, reason: 'unknown' | 'owned' | 'gold' }
  function canBuy(state, id, b) {
    if (!stats(id, b)) return { ok: false, reason: 'unknown' };
    if (owns(state, id, b)) return { ok: false, reason: 'owned' };
    if (gold(state) < stats(id, b).price) return { ok: false, reason: 'gold' };
    return { ok: true };
  }
  // 買う。買ったら、そのまま装備する。{ ok, state, reason }
  function buy(state, id, b) {
    var c = canBuy(state, id, b);
    if (!c.ok) return { ok: false, state: state, reason: c.reason };
    var s = FF.util.clone(state), e = eq(state, b);
    s.gold = gold(state) - stats(id, b).price;
    s.equipment = { weapon: id, owned: e.owned.concat([id]) };
    return { ok: true, state: s };
  }
  // 持っている武器を装備する。{ ok, state, reason }
  function equip(state, id, b) {
    if (!stats(id, b)) return { ok: false, state: state, reason: 'unknown' };
    if (!owns(state, id, b)) return { ok: false, state: state, reason: 'notOwned' };
    var s = FF.util.clone(state);
    s.equipment = { weapon: id, owned: eq(state, b).owned };
    return { ok: true, state: s };
  }
  // ゴールドを足す（デバッグ用・これから入手のしくみを作るときの入口）
  function addGold(state, n) {
    var s = FF.util.clone(state);
    s.gold = gold(state) + Math.max(0, Math.floor(n) || 0);
    return s;
  }
  // 読み込み時の整合
  function normalizeShop(state, b) {
    var s = FF.util.clone(state);
    s.gold = gold(state);
    s.equipment = eq(state, b);
    return s;
  }

  FF.shop = {
    ids: ids, def: def, stats: stats, gold: gold, owns: owns, currentWeapon: currentWeapon, damagePerCorrect: damagePerCorrect,
    canBuy: canBuy, buy: buy, equip: equip, addGold: addGold, normalizeShop: normalizeShop
  };
})(this);
