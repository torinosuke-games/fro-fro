// 武器屋（判断340）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const S = FF.shop, B = FF.balance, T0 = 1790000000000;
  const W = ['wood_sword', 'stone_sword', 'iron_sword', 'steel_sword', 'flame_sword'];
  const fresh = () => FF.state.createDefaultState(T0);

  test('武器屋：武器は5つ。木の剣は、はじめから持っていて、装備していて、ダメージは今までと同じ', () => {
    assert.deepStrictEqual(plain(FF.defs.WEAPONS.map(w => w.id)), W);
    assert.deepStrictEqual(plain(Object.keys(B.WEAPONS)), W);
    const s = fresh();
    assert.strictEqual(S.gold(s), 0);
    assert.strictEqual(s.gold, undefined);   // ゴールドは、冒険のゴールド（adventure.gold）
    assert.strictEqual(S.currentWeapon(s), 'wood_sword');
    assert.ok(S.owns(s, 'wood_sword'));
    assert.strictEqual(B.WEAPONS.wood_sword.price, 0);
    assert.strictEqual(S.damagePerCorrect(s), B.BATTLE.DAMAGE_PER_CORRECT);
    // 強いほど、ダメージが大きく、値段が高い
    for (let i = 1; i < W.length; i++) {
      assert.ok(B.WEAPONS[W[i]].damage > B.WEAPONS[W[i - 1]].damage, W[i]);
      assert.ok(B.WEAPONS[W[i]].price > B.WEAPONS[W[i - 1]].price, W[i]);
    }
  });
  test('武器屋：ゴールドが足りなければ買えない。買うとゴールドが減り、そのまま装備される', () => {
    let s = fresh();
    assert.strictEqual(S.canBuy(s, 'stone_sword').reason, 'gold');
    assert.strictEqual(S.buy(s, 'stone_sword').ok, false);
    s = S.addGold(s, 150);
    const r = S.buy(s, 'stone_sword');
    assert.ok(r.ok);
    assert.strictEqual(S.gold(r.state), 150 - B.WEAPONS.stone_sword.price);
    assert.strictEqual(r.state.adventure.gold, 150 - B.WEAPONS.stone_sword.price);   // 冒険のゴールドから引かれる
    assert.strictEqual(S.currentWeapon(r.state), 'stone_sword');
    assert.ok(S.owns(r.state, 'wood_sword') && S.owns(r.state, 'stone_sword'));
    assert.strictEqual(S.damagePerCorrect(r.state), B.WEAPONS.stone_sword.damage);
    // 元の状態は変わらない（純粋関数）
    assert.strictEqual(S.gold(s), 150);
    // 同じ武器は、2回買えない。知らない武器も買えない
    assert.strictEqual(S.canBuy(r.state, 'stone_sword').reason, 'owned');
    assert.strictEqual(S.canBuy(r.state, 'nothing').reason, 'unknown');
  });
  test('武器屋：持っている武器は、いつでも付けかえられる。持っていない武器は付けられない', () => {
    let s = S.addGold(fresh(), 1000);
    s = S.buy(s, 'iron_sword').state;
    assert.strictEqual(S.currentWeapon(s), 'iron_sword');
    s = S.equip(s, 'wood_sword').state;
    assert.strictEqual(S.currentWeapon(s), 'wood_sword');
    assert.strictEqual(S.damagePerCorrect(s), 10);
    assert.strictEqual(S.equip(s, 'flame_sword').reason, 'notOwned');
    assert.strictEqual(S.equip(s, 'zzz').reason, 'unknown');
    s = S.equip(s, 'iron_sword').state;
    assert.strictEqual(S.damagePerCorrect(s), B.WEAPONS.iron_sword.damage);
  });
  test('武器屋：セーブの読み込みで整える（知らない武器・持っていない装備を直す。前の版の state.gold は冒険のゴールドに足す）', () => {
    const base = fresh();
    const n = S.normalizeShop(Object.assign({}, base, { equipment: { weapon: 'flame_sword', owned: ['stone_sword', 'bogus'] } }));
    assert.deepStrictEqual(plain(n.equipment.owned), ['wood_sword', 'stone_sword']);
    assert.strictEqual(n.equipment.weapon, 'wood_sword');   // 持っていない武器は装備できない
    const m = S.normalizeShop(Object.assign({}, base, { equipment: { weapon: 'stone_sword', owned: ['stone_sword'] } }));
    assert.strictEqual(m.equipment.weapon, 'stone_sword');
    assert.ok(m.equipment.owned.includes('wood_sword'));
    // 前の版（state.gold にゴールドを持っていた）のセーブ：冒険のゴールドに足されて、gold は消える
    const legacy = JSON.parse(FF.state.serialize(S.addGold(base, 40)));
    legacy.gold = 250;
    const r = FF.state.migrate(legacy, T0 + 1);
    assert.ok(r.ok, r.error);
    assert.strictEqual(r.state.gold, undefined);
    assert.strictEqual(S.gold(r.state), 290);
    // 新しいセーブは、書き出して読み込んでも、ゴールドと装備が残る
    const s = S.buy(S.addGold(base, 500), 'iron_sword').state;
    const back = FF.state.parseSave(FF.state.serialize(s), T0 + 1);
    assert.ok(back.ok, back.error);
    assert.strictEqual(S.gold(back.state), 500 - B.WEAPONS.iron_sword.price);
    assert.strictEqual(S.currentWeapon(back.state), 'iron_sword');
  });
  test('武器屋：戦闘で、装備中の武器のダメージが、正解1回ごとに入る（敵のHPを超えない）', () => {
    const BA = FF.battle, X = FF.exploration;
    const q = { id: 'test_shop_q', subject: 'math', gradeLevel: 1, unit: 't', difficulty: 'basic', answerType: 'choice',
      question: '1+1', choices: ['1', '2', '3', '4'], answer: '2', hints: ['h'], explanation: 'e', reviewed: true };
    const att = () => FF.learning.startAttempt(q, FF.util.makeRng(3));
    let s = fresh(); s.buildings.furnace.level = 5;
    const region = 'snowfield', enemy = 'sf_enemy_fangs';
    const target = X.route(region).findIndex(n => n.id === 'sf_07');
    while (X.regionState(s, region).position < target) s = X.advance(s, region, T0, FF.util.makeRng(1)).state;
    for (const w of ['wood_sword', 'iron_sword']) {
      let st = S.addGold(s, 1000);
      if (w !== 'wood_sword') st = S.buy(st, w).state;
      const bat = BA.startBattle(st, region, enemy);
      assert.ok(bat, 'battle');
      const r = BA.answerBattle(st, bat, att(), '2', T0, FF.util.makeRng(5));
      assert.strictEqual(r.outcome.damageDealt, Math.min(bat.enemyHp, B.WEAPONS[w].damage), w);
    }
    void X;
  });
  test('防具屋：防具は5つ。買うと装備され、武器の装備は変わらない。足りないゴールドでは買えない', () => {
    const AR = ['cloth_clothes', 'fur_coat', 'leather_armor', 'iron_armor', 'steel_armor'];
    assert.deepStrictEqual(plain(FF.defs.ARMORS.map(a => a.id)), AR);
    assert.deepStrictEqual(plain(Object.keys(B.ARMORS)), AR);
    for (let i = 1; i < AR.length; i++) {
      assert.ok(B.ARMORS[AR[i]].defense > B.ARMORS[AR[i - 1]].defense, AR[i]);
      assert.ok(B.ARMORS[AR[i]].price > B.ARMORS[AR[i - 1]].price, AR[i]);
    }
    let s = fresh();
    assert.strictEqual(S.currentArmor(s), 'cloth_clothes');
    assert.strictEqual(S.armorDefense(s), 0);
    assert.strictEqual(S.canBuyArmor(s, 'fur_coat').reason, 'gold');
    assert.strictEqual(S.canBuyArmor(s, 'bogus').reason, 'unknown');
    s = S.buy(S.addGold(s, 1000), 'iron_sword').state;
    const r = S.buyArmor(s, 'leather_armor');
    assert.ok(r.ok);
    assert.strictEqual(S.gold(r.state), 1000 - B.WEAPONS.iron_sword.price - B.ARMORS.leather_armor.price);
    assert.strictEqual(S.currentArmor(r.state), 'leather_armor');
    assert.strictEqual(S.currentWeapon(r.state), 'iron_sword');
    assert.strictEqual(S.canBuyArmor(r.state, 'leather_armor').reason, 'owned');
    const q = S.equipArmor(r.state, 'cloth_clothes');
    assert.strictEqual(S.currentArmor(q.state), 'cloth_clothes');
    assert.strictEqual(S.equipArmor(r.state, 'steel_armor').reason, 'notOwned');
    const back = FF.state.parseSave(FF.state.serialize(r.state), T0 + 1);
    assert.ok(back.ok, back.error);
    assert.strictEqual(S.currentArmor(back.state), 'leather_armor');
    // 古いセーブ（防具の項目なし）は、ぬのの服で補う
    const old = Object.assign({}, fresh(), { equipment: { weapon: 'wood_sword', owned: ['wood_sword'] } });
    assert.strictEqual(S.currentArmor(S.normalizeShop(old)), 'cloth_clothes');
  });
  test('武器・防具：冒険のクイズ戦闘で、剣は主人公の与えるダメージを、防具は受けるダメージを変える', () => {
    const A = FF.adventure, bank = FF.learning.createBank(ctx.QUESTION_BANK), rng = () => .37, now = 1791000000000;
    const run = gear => {
      let p = A.create(); p.pos = plain(A.ENEMIES.boss); p = A.encounter(p, 'boss');
      const orders = Object.fromEntries(A.alive(p).map(id => [id, { type: 'attack', target: id }]));
      p = A.command(p, orders, bank, 4, rng, now);
      p = A.answer(p, p.battle.question.answer, now);
      p = A.advance(p, bank, 4, rng, now, gear);          // 攻撃
      const hp = p.battle.hp;
      p = A.advance(p, bank, 4, rng, now, gear);          // 反撃
      return { enemyHp: hp, heroHp: p.roster.hero.hp };
    };
    const base = run(), strong = run({ attack: S.weaponBonus(S.buy(S.addGold(fresh(), 5000), 'flame_sword').state), defense: B.ARMORS.steel_armor.defense });
    assert.ok(strong.enemyHp < base.enemyHp, '剣で敵のHPがより減る');
    assert.ok(strong.heroHp > base.heroHp, '防具で主人公のHPがより残る');
    assert.strictEqual(S.weaponBonus(fresh()), 0);
  });
  test('防具：探索の戦闘で、まちがえたときのダメージが防具で減る（最低1）', () => {
    const s = fresh();
    assert.strictEqual(S.damageTaken(s, 20), 20);
    const a = S.buyArmor(S.addGold(s, 5000), 'steel_armor').state;
    assert.strictEqual(S.damageTaken(a, 20), 20 - Math.round(B.ARMORS.steel_armor.defense * B.BATTLE.ARMOR_RATE));
    assert.strictEqual(S.damageTaken(a, 1), 1);
  });
};
