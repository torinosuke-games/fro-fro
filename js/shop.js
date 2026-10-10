// 武器屋・防具屋・持ち物（判断340・343・359）：純粋関数のみ。ゴールドで武器・防具を買い、仲間ひとりひとりに装備する。
// 武器・防具は、同じ品物を、何個でも買える（判断381。上限は MAX_COPIES）。1個につき、1人が装備する。持っている個数ぶんの人が、同じ品物を装備できる。あまりがなければ、いまの持ち主から外す（画面で確認する）。
// 装備の効き方：探索の戦闘は、主人公の装備だけ（正解1問のダメージ・まちがえたときのダメージ）。冒険のクイズ戦闘は、全員の装備が、それぞれの攻撃力・防御力に足される。
// 木の剣・ぬのの服は、いちばん弱い武器・防具（+1）。はじめは、何も持っていない。ゴールドは、冒険のゴールド（state.adventure.gold）を使う（判断342）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  function ids() { return FF.defs.WEAPONS.map(function (w) { return w.id; }); }
  function def(id) { return FF.defs.WEAPONS.filter(function (w) { return w.id === id; })[0] || null; }
  function stats(id, b) { return bal(b).WEAPONS[id] || null; }
  function astats(id, b) { return bal(b).ARMORS[id] || null; }
  // 装備なしの攻撃（探索の戦闘の、正解1回のダメージ）。木の剣は、これより +1
  function baseDamage(b) { return bal(b).BATTLE.DAMAGE_PER_CORRECT; }
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
  var MAX_COPIES = 10;   // 同じ品物を持てる上限（仲間は、主人公を入れて10人）
  function eq(state, b) {
    var e = state && state.equipment || {};
    function clean(list, ok) {
      var out = (Array.isArray(list) ? list : []).filter(ok);
      var counts = {};
      out = out.filter(function (x) { counts[x] = (counts[x] || 0) + 1; return counts[x] <= MAX_COPIES; });   // 同じ品物は、複数持てる
      return out;
    }
    var owned = clean(e.owned, function (x) { return !!stats(x, b); });
    var ownedArmor = clean(e.ownedArmor, function (x) { return !!astats(x, b); });
    var raw = e.equipped && typeof e.equipped === 'object' ? e.equipped : null;
    if (!raw) raw = { hero: { weapon: owned.indexOf(e.weapon) >= 0 ? e.weapon : null, armor: ownedArmor.indexOf(e.armor) >= 0 ? e.armor : null } };   // 前の版：装備は主人公の1つだけ
    if (!raw.hero) raw.hero = { weapon: null, armor: null };
    function count(list) { var c = {}; list.forEach(function (x) { c[x] = (c[x] || 0) + 1; }); return c; }
    var have = { weapon: count(owned), armor: count(ownedArmor) }, used = { weapon: {}, armor: {} }, equipped = {};
    members().forEach(function (id) {
      var r = raw[id] || {}, w = r.weapon, a = r.armor;
      if (!(w && have.weapon[w] && (used.weapon[w] || 0) < have.weapon[w])) w = null;   // 持っている個数までの人が、装備できる
      if (!(a && have.armor[a] && (used.armor[a] || 0) < have.armor[a])) a = null;
      if (w) used.weapon[w] = (used.weapon[w] || 0) + 1;
      if (a) used.armor[a] = (used.armor[a] || 0) + 1;
      if (w || a || id === 'hero') equipped[id] = { weapon: w, armor: a };   // 何も装備していない仲間は、書かない
    });
    return { owned: owned, ownedArmor: ownedArmor, equipped: equipped };
  }
  // はじめから持っている木の剣・ぬのの服（能力は±0。装備なしと、同じ）。画面には出さない（判断382）
  // 持っている個数
  function copies(state, kind, id, b) { var e = eq(state, b); return (kind === 'armor' ? e.ownedArmor : e.owned).filter(function (x) { return x === id; }).length; }
  function owns(state, id, b) { return eq(state, b).owned.indexOf(id) >= 0; }
  function ownsArmor(state, id, b) { return eq(state, b).ownedArmor.indexOf(id) >= 0; }
  // 持っている品物の種類（同じ品物は、1つにまとめる。個数は copies）
  function owned(state, kind, b) { var e = eq(state, b); return (kind === 'armor' ? e.ownedArmor : e.owned).filter(function (x, i, a) { return a.indexOf(x) === i; }); }

  // ---- 装備 ----
  function equippedOf(state, memberId, b) { return eq(state, b).equipped[memberId] || { weapon: null, armor: null }; }
  // その品物を、いま装備している人（いなければ null）
  function holders(state, kind, itemId, b) {
    var e = eq(state, b).equipped;
    return members().filter(function (id) { return e[id] && e[id][kind] === itemId; });
  }
  function holder(state, kind, itemId, b) { return holders(state, kind, itemId, b)[0] || null; }
  // 装備していない、あまりの個数
  function freeCopies(state, kind, itemId, b) { return copies(state, kind, itemId, b) - holders(state, kind, itemId, b).length; }
  // 装備する。ほかの人が装備中なら、force が true のときだけ、その人から外して付ける。{ ok, state, reason: 'unknown'|'notOwned'|'inUse'|'noMember', holder }
  function equip(state, memberId, kind, itemId, opts, b) {
    if (kind !== 'weapon' && kind !== 'armor') return { ok: false, state: state, reason: 'unknown' };
    if (!kindStats(kind, itemId, b)) return { ok: false, state: state, reason: 'unknown' };
    if (members().indexOf(memberId) < 0) return { ok: false, state: state, reason: 'noMember' };
    var e = eq(state, b);
    if ((kind === 'armor' ? e.ownedArmor : e.owned).indexOf(itemId) < 0) return { ok: false, state: state, reason: 'notOwned' };
    var all = holders(state, kind, itemId, b);
    if (all.indexOf(memberId) >= 0) return { ok: true, state: state, holder: memberId };
    var h = all.length >= copies(state, kind, itemId, b) ? all[all.length - 1] : null;   // あまりがなければ、いちばん最後の人から、もらう
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
    return w ? stats(w, b).damage - baseDamage(b) : 0;
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
  function damagePerCorrect(state, b) { var w = currentWeapon(state, b); return w ? stats(w, b).damage : baseDamage(b); }
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
    if (copies(state, kind, id, b) >= MAX_COPIES) return { ok: false, reason: 'max' };
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

  // 道具屋（判断384）：回復薬を、ゴールドで買う。持てる数に上限がある（冒険の持ち物 adventure.potions）
  function adv(b) { return (b || FF.balance).ADVENTURE; }
  function potions(state) { return Math.max(0, Math.floor(state && state.adventure && state.adventure.potions) || 0); }
  function canBuyPotion(state, n, b) {
    n = Math.max(1, Math.floor(n) || 1);
    if (potions(state) + n > adv(b).POTION_MAX) return { ok: false, reason: 'max' };
    if (gold(state) < n * adv(b).POTION_PRICE) return { ok: false, reason: 'gold' };
    return { ok: true };
  }
  function buyPotion(state, n, b) {
    n = Math.max(1, Math.floor(n) || 1);
    var c = canBuyPotion(state, n, b);
    if (!c.ok) return { ok: false, state: state, reason: c.reason };
    var s = FF.util.clone(state);
    withGold(s, gold(state) - n * adv(b).POTION_PRICE);
    s.adventure.potions = potions(state) + n;
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
    baseDamage: baseDamage, ids: ids, def: def, stats: stats, astats: astats, gold: gold, owns: owns, ownsArmor: ownsArmor, owned: owned,
    equippedOf: equippedOf, holder: holder, equip: equip, unequip: unequip,
    weaponBonus: weaponBonus, armorDefense: armorDefense, gearMap: gearMap,
    currentWeapon: currentWeapon, currentArmor: currentArmor, damagePerCorrect: damagePerCorrect, damageTaken: damageTaken,
    copies: copies, holders: holders, freeCopies: freeCopies, MAX_COPIES: MAX_COPIES, canBuyItem: canBuyItem, buyItem: buyItem, canBuy: canBuy, buy: buy, canBuyArmor: canBuyArmor, buyArmor: buyArmor,
    potions: potions, canBuyPotion: canBuyPotion, buyPotion: buyPotion, addGold: addGold, normalizeShop: normalizeShop
  };
})(this);
