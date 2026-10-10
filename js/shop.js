// 武器屋・防具屋・持ち物（判断340・343・359）：純粋関数のみ。ゴールドで武器・防具を買い、仲間ひとりひとりに装備する。
// 武器・防具は、1つずつ（同じ品物は1つだけ）。誰かが装備している品物を、ほかの人が装備するには、いまの持ち主から外す（画面で確認する）。
// 装備の効き方：探索の戦闘は、主人公の装備だけ（正解1問のダメージ・まちがえたときのダメージ）。冒険のクイズ戦闘は、全員の装備が、それぞれの攻撃力・防御力に足される。
// 木の剣・ぬのの服は、はじめから持っていて、主人公が装備している（値段 0）。ゴールドは、冒険のゴールド（state.adventure.gold）を使う（判断342）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  function ids() { return FF.defs.WEAPONS.map(function (w) { return w.id; }); }
  function def(id) { return FF.defs.WEAPONS.filter(function (w) { return w.id === id; })[0] || null; }
  function stats(id, b) { return bal(b).WEAPONS[id] || null; }
  function astats(id, b) { return bal(b).ARMORS[id] || null; }
  function members() { return FF.adventure ? FF.adventure.IDS : ['hero']; }
  function kindStats(kind, id, b) { return kind === 'armor' ? astats(id, b) : stats(id, b); }

  var GOLD_MAX = 1000000;   // 冒険のゴールドの上限（adventure.js の int の上限と同じ）
  function gold(state) { return Math.max(0, Math.floor(state && state.adventure && state.adventure.gold) || 0); }
  function withGold(s, n) {
    s.adventure = s.adventure || (FF.adventure ? FF.adventure.create() : {});
    s.adventure.gold = Math.max(0, Math.min(GOLD_MAX, Math.floor(n) || 0));
    return s;
  }

  // 装備の整合：{ owned, ownedArmor, equipped: { 仲間: { weapon, armor } } }。同じ品物を2人が装備していたら、先の人だけ
  function eq(state, b) {
    var e = state && state.equipment || {}, d = bal(b).DEFAULT_WEAPON, da = bal(b).DEFAULT_ARMOR;
    var owned = (Array.isArray(e.owned) ? e.owned : []).filter(function (x, i, a) { return stats(x, b) && a.indexOf(x) === i; });
    if (owned.indexOf(d) < 0) owned.unshift(d);
    var ownedArmor = (Array.isArray(e.ownedArmor) ? e.ownedArmor : []).filter(function (x, i, a) { return astats(x, b) && a.indexOf(x) === i; });
    if (ownedArmor.indexOf(da) < 0) ownedArmor.unshift(da);
    var raw = e.equipped && typeof e.equipped === 'object' ? e.equipped : null;
    if (!raw) raw = { hero: { weapon: owned.indexOf(e.weapon) >= 0 ? e.weapon : d, armor: ownedArmor.indexOf(e.armor) >= 0 ? e.armor : da } };   // 前の版：装備は主人公の1つだけ
    if (!raw.hero) raw.hero = { weapon: d, armor: da };               // はじめは、主人公が木の剣・ぬのの服
    var used = { weapon: {}, armor: {} }, equipped = {};
    members().forEach(function (id) {
      var r = raw[id] || {}, w = r.weapon, a = r.armor;
      if (!(w && owned.indexOf(w) >= 0 && !used.weapon[w])) w = null;
      if (!(a && ownedArmor.indexOf(a) >= 0 && !used.armor[a])) a = null;
      if (w) used.weapon[w] = true;
      if (a) used.armor[a] = true;
      if (w || a || id === 'hero') equipped[id] = { weapon: w, armor: a };   // 何も装備していない仲間は、書かない
    });
    return { owned: owned, ownedArmor: ownedArmor, equipped: equipped };
  }
  function owns(state, id, b) { return eq(state, b).owned.indexOf(id) >= 0; }
  function ownsArmor(state, id, b) { return eq(state, b).ownedArmor.indexOf(id) >= 0; }
  function owned(state, kind, b) { var e = eq(state, b); return kind === 'armor' ? e.ownedArmor : e.owned; }

  // ---- 装備 ----
  function equippedOf(state, memberId, b) { return eq(state, b).equipped[memberId] || { weapon: null, armor: null }; }
  // その品物を、いま装備している人（いなければ null）
  function holder(state, kind, itemId, b) {
    var e = eq(state, b).equipped, found = null;
    members().forEach(function (id) { if (!found && e[id] && e[id][kind] === itemId) found = id; });
    return found;
  }
  // 装備する。ほかの人が装備中なら、force が true のときだけ、その人から外して付ける。{ ok, state, reason: 'unknown'|'notOwned'|'inUse'|'noMember', holder }
  function equip(state, memberId, kind, itemId, opts, b) {
    if (kind !== 'weapon' && kind !== 'armor') return { ok: false, state: state, reason: 'unknown' };
    if (!kindStats(kind, itemId, b)) return { ok: false, state: state, reason: 'unknown' };
    if (members().indexOf(memberId) < 0) return { ok: false, state: state, reason: 'noMember' };
    var e = eq(state, b);
    if ((kind === 'armor' ? e.ownedArmor : e.owned).indexOf(itemId) < 0) return { ok: false, state: state, reason: 'notOwned' };
    var h = holder(state, kind, itemId, b);
    if (h === memberId) return { ok: true, state: state, holder: h };
    if (h && !(opts && opts.force)) return { ok: false, state: state, reason: 'inUse', holder: h };
    var s = FF.util.clone(state);
    if (h) e.equipped[h][kind] = null;
    e.equipped[memberId] = e.equipped[memberId] || { weapon: null, armor: null };
    e.equipped[memberId][kind] = itemId;
    s.equipment = eq({ equipment: e }, b);
    return { ok: true, state: s, holder: h };
  }
  // 外す
  function unequip(state, memberId, kind, b) {
    if (members().indexOf(memberId) < 0 || (kind !== 'weapon' && kind !== 'armor')) return { ok: false, state: state };
    var s = FF.util.clone(state), e = eq(state, b);
    e.equipped[memberId] = e.equipped[memberId] || { weapon: null, armor: null };
    e.equipped[memberId][kind] = null; s.equipment = eq({ equipment: e }, b);
    return { ok: true, state: s };
  }

  // ---- 効き方 ----
  // 冒険のクイズ戦闘：その人の攻撃力に足す分（木の剣との差。装備なしは0）
  function weaponBonus(state, memberId, b) {
    var w = equippedOf(state, memberId || 'hero', b).weapon;
    return w ? stats(w, b).damage - stats(bal(b).DEFAULT_WEAPON, b).damage : 0;
  }
  // 防御力に足す分（装備なしは0）
  function armorDefense(state, memberId, b) {
    var a = equippedOf(state, memberId || 'hero', b).armor;
    return a ? astats(a, b).defense : 0;
  }
  // 冒険のクイズ戦闘で渡す、全員の装備のぶん：{ 仲間: { attack, defense } }
  function gearMap(state, b) {
    var out = {};
    members().forEach(function (id) { out[id] = { attack: weaponBonus(state, id, b), defense: armorDefense(state, id, b) }; });
    return out;
  }
  // 主人公の装備（探索の戦闘用）
  function currentWeapon(state, b) { return equippedOf(state, 'hero', b).weapon; }
  function currentArmor(state, b) { return equippedOf(state, 'hero', b).armor; }
  // 正解1問で敵に与えるダメージ（主人公の武器。なければ、木の剣と同じ）
  function damagePerCorrect(state, b) { var w = currentWeapon(state, b); return stats(w || bal(b).DEFAULT_WEAPON, b).damage; }
  // 探索の戦闘：まちがえたときに受けるダメージ（主人公の防具で減る。最低1）
  function damageTaken(state, attack, b) {
    var rate = (bal(b).BATTLE || {}).ARMOR_RATE || 0;
    return Math.max(1, attack - Math.round(armorDefense(state, 'hero', b) * rate));
  }

  // ---- 買う（買った品物は持ち物に入る。装備は、持ち物か編成の画面で）----
  // 買えるか：{ ok, reason: 'unknown' | 'owned' | 'gold' }
  function canBuyItem(state, kind, id, b) {
    var st = kindStats(kind, id, b);
    if (!st) return { ok: false, reason: 'unknown' };
    if (owned(state, kind, b).indexOf(id) >= 0) return { ok: false, reason: 'owned' };
    if (gold(state) < st.price) return { ok: false, reason: 'gold' };
    return { ok: true };
  }
  function buyItem(state, kind, id, b) {
    var c = canBuyItem(state, kind, id, b);
    if (!c.ok) return { ok: false, state: state, reason: c.reason };
    var s = FF.util.clone(state), e = eq(state, b);
    withGold(s, gold(state) - kindStats(kind, id, b).price);
    if (kind === 'armor') e.ownedArmor = e.ownedArmor.concat([id]); else e.owned = e.owned.concat([id]);
    s.equipment = e;
    return { ok: true, state: s };
  }
  function canBuy(state, id, b) { return canBuyItem(state, 'weapon', id, b); }
  function buy(state, id, b) { return buyItem(state, 'weapon', id, b); }
  function canBuyArmor(state, id, b) { return canBuyItem(state, 'armor', id, b); }
  function buyArmor(state, id, b) { return buyItem(state, 'armor', id, b); }

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
    ids: ids, def: def, stats: stats, astats: astats, gold: gold, owns: owns, ownsArmor: ownsArmor, owned: owned,
    equippedOf: equippedOf, holder: holder, equip: equip, unequip: unequip,
    weaponBonus: weaponBonus, armorDefense: armorDefense, gearMap: gearMap,
    currentWeapon: currentWeapon, currentArmor: currentArmor, damagePerCorrect: damagePerCorrect, damageTaken: damageTaken,
    canBuyItem: canBuyItem, buyItem: buyItem, canBuy: canBuy, buy: buy, canBuyArmor: canBuyArmor, buyArmor: buyArmor,
    addGold: addGold, normalizeShop: normalizeShop
  };
})(this);
