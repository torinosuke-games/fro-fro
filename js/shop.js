// 武器屋（判断340）：純粋関数のみ。ゴールドで武器を買い、1つ装備する。装備した武器が、探索の戦闘の正解1問のダメージを決める。
// 木の剣は、はじめから持っている（値段 0）。ゴールドは、冒険のゴールド（state.adventure.gold。敵のドロップ・宝箱で入る）を使う（判断342）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  function ids() { return FF.defs.WEAPONS.map(function (w) { return w.id; }); }
  function def(id) { return FF.defs.WEAPONS.filter(function (w) { return w.id === id; })[0] || null; }
  function stats(id, b) { return bal(b).WEAPONS[id] || null; }

  var GOLD_MAX = 1000000;   // 冒険のゴールドの上限（adventure.js の int の上限と同じ）
  function gold(state) { return Math.max(0, Math.floor(state && state.adventure && state.adventure.gold) || 0); }
  function withGold(s, n) {
    s.adventure = s.adventure || (FF.adventure ? FF.adventure.create() : {});
    s.adventure.gold = Math.max(0, Math.min(GOLD_MAX, Math.floor(n) || 0));
    return s;
  }
  function astats(id, b) { return bal(b).ARMORS[id] || null; }
  function eq(state, b) {
    var e = state && state.equipment || {}, d = bal(b).DEFAULT_WEAPON, da = bal(b).DEFAULT_ARMOR;
    var owned = (Array.isArray(e.owned) ? e.owned : []).filter(function (x) { return stats(x, b); });
    if (owned.indexOf(d) < 0) owned.unshift(d);
    var weapon = stats(e.weapon, b) && owned.indexOf(e.weapon) >= 0 ? e.weapon : d;
    var ownedArmor = (Array.isArray(e.ownedArmor) ? e.ownedArmor : []).filter(function (x) { return astats(x, b); });
    if (ownedArmor.indexOf(da) < 0) ownedArmor.unshift(da);
    var armor = astats(e.armor, b) && ownedArmor.indexOf(e.armor) >= 0 ? e.armor : da;
    return { weapon: weapon, owned: owned, armor: armor, ownedArmor: ownedArmor };
  }
  function owns(state, id, b) { return eq(state, b).owned.indexOf(id) >= 0; }
  function currentWeapon(state, b) { return eq(state, b).weapon; }
  // 正解1問で敵に与えるダメージ（装備中の武器）
  function damagePerCorrect(state, b) { return stats(currentWeapon(state, b), b).damage; }
  // 冒険のクイズ戦闘：主人公の攻撃力に足す分（木の剣との差）
  function weaponBonus(state, b) { return damagePerCorrect(state, b) - stats(bal(b).DEFAULT_WEAPON, b).damage; }
  // 防具
  function ownsArmor(state, id, b) { return eq(state, b).ownedArmor.indexOf(id) >= 0; }
  function currentArmor(state, b) { return eq(state, b).armor; }
  function armorDefense(state, b) { return astats(currentArmor(state, b), b).defense; }
  // 探索の戦闘：まちがえたときに受けるダメージ（防具で減る。最低1）
  function damageTaken(state, attack, b) {
    var rate = (bal(b).BATTLE || {}).ARMOR_RATE || 0;
    return Math.max(1, attack - Math.round(armorDefense(state, b) * rate));
  }

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
    withGold(s, gold(state) - stats(id, b).price);
    s.equipment = Object.assign({}, e, { weapon: id, owned: e.owned.concat([id]) });
    return { ok: true, state: s };
  }
  // 持っている武器を装備する。{ ok, state, reason }
  function equip(state, id, b) {
    if (!stats(id, b)) return { ok: false, state: state, reason: 'unknown' };
    if (!owns(state, id, b)) return { ok: false, state: state, reason: 'notOwned' };
    var s = FF.util.clone(state);
    s.equipment = Object.assign({}, eq(state, b), { weapon: id });
    return { ok: true, state: s };
  }
  // 防具：買う（そのまま装備）・装備する
  function canBuyArmor(state, id, b) {
    if (!astats(id, b)) return { ok: false, reason: 'unknown' };
    if (ownsArmor(state, id, b)) return { ok: false, reason: 'owned' };
    if (gold(state) < astats(id, b).price) return { ok: false, reason: 'gold' };
    return { ok: true };
  }
  function buyArmor(state, id, b) {
    var c = canBuyArmor(state, id, b);
    if (!c.ok) return { ok: false, state: state, reason: c.reason };
    var s = FF.util.clone(state), e = eq(state, b);
    withGold(s, gold(state) - astats(id, b).price);
    s.equipment = Object.assign({}, e, { armor: id, ownedArmor: e.ownedArmor.concat([id]) });
    return { ok: true, state: s };
  }
  function equipArmor(state, id, b) {
    if (!astats(id, b)) return { ok: false, state: state, reason: 'unknown' };
    if (!ownsArmor(state, id, b)) return { ok: false, state: state, reason: 'notOwned' };
    var s = FF.util.clone(state);
    s.equipment = Object.assign({}, eq(state, b), { armor: id });
    return { ok: true, state: s };
  }
  // ゴールドを足す（デバッグ用・これから入手のしくみを作るときの入口）
  function addGold(state, n) {
    var s = FF.util.clone(state);
    return withGold(s, gold(state) + Math.max(0, Math.floor(n) || 0));
  }
  // 読み込み時の整合。legacy：前の版で state.gold に持っていたゴールド（冒険のゴールドに足す）
  function normalizeShop(state, b, legacy) {
    var s = FF.util.clone(state);
    if (legacy) withGold(s, gold(state) + legacy);
    s.equipment = eq(state, b);
    return s;
  }

  FF.shop = {
    ids: ids, def: def, stats: stats, gold: gold, owns: owns, currentWeapon: currentWeapon, damagePerCorrect: damagePerCorrect,
    weaponBonus: weaponBonus, astats: astats, ownsArmor: ownsArmor, currentArmor: currentArmor, armorDefense: armorDefense, damageTaken: damageTaken,
    canBuyArmor: canBuyArmor, buyArmor: buyArmor, equipArmor: equipArmor,
    canBuy: canBuy, buy: buy, equip: equip, addGold: addGold, normalizeShop: normalizeShop
  };
})(this);
