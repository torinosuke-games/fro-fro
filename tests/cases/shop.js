// 武器屋（判断340）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const S = FF.shop, B = FF.balance, T0 = 1790000000000;
  const W = ['wood_sword', 'stone_sword', 'iron_sword', 'steel_sword', 'flame_sword'];
  const fresh = () => FF.state.createDefaultState(T0);
  // 買って、主人公に装備する（買うだけでは、持ち物に入るだけ。判断359）
  const buyEq = (s, id) => S.equip(S.buy(s, id).state, 'hero', 'weapon', id).state;
  const buyEqA = (s, id) => S.equip(S.buyArmor(s, id).state, 'hero', 'armor', id).state;

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
  test('武器屋：ゴールドが足りなければ買えない。買うとゴールドが減り、持ち物に入る', () => {
    let s = fresh();
    assert.strictEqual(S.canBuy(s, 'stone_sword').reason, 'gold');
    assert.strictEqual(S.buy(s, 'stone_sword').ok, false);
    s = S.addGold(s, 150);
    const r = S.buy(s, 'stone_sword');
    assert.ok(r.ok);
    assert.strictEqual(S.gold(r.state), 150 - B.WEAPONS.stone_sword.price);
    assert.strictEqual(r.state.adventure.gold, 150 - B.WEAPONS.stone_sword.price);   // 冒険のゴールドから引かれる
    assert.strictEqual(S.currentWeapon(r.state), 'wood_sword');   // 買っただけでは、装備は変わらない
    assert.ok(S.owns(r.state, 'wood_sword') && S.owns(r.state, 'stone_sword'));
    assert.strictEqual(S.damagePerCorrect(S.equip(r.state, 'hero', 'weapon', 'stone_sword').state), B.WEAPONS.stone_sword.damage);
    // 元の状態は変わらない（純粋関数）
    assert.strictEqual(S.gold(s), 150);
    // 同じ武器は、2回買えない。知らない武器も買えない
    assert.strictEqual(S.canBuy(r.state, 'stone_sword').reason, 'owned');
    assert.strictEqual(S.canBuy(r.state, 'nothing').reason, 'unknown');
  });
  test('武器屋：持っている武器は付けかえられる。持っていない武器は付けられない', () => {
    let s = S.addGold(fresh(), 1000);
    s = buyEq(s, 'iron_sword');
    assert.strictEqual(S.currentWeapon(s), 'iron_sword');
    s = S.equip(s, 'hero', 'weapon', 'wood_sword').state;
    assert.strictEqual(S.currentWeapon(s), 'wood_sword');
    assert.strictEqual(S.damagePerCorrect(s), 10);
    assert.strictEqual(S.equip(s, 'hero', 'weapon', 'flame_sword').reason, 'notOwned');
    assert.strictEqual(S.equip(s, 'hero', 'weapon', 'zzz').reason, 'unknown');
    assert.strictEqual(S.equip(s, 'nobody', 'weapon', 'iron_sword').reason, 'noMember');
    s = S.equip(s, 'hero', 'weapon', 'iron_sword').state;
    assert.strictEqual(S.damagePerCorrect(s), B.WEAPONS.iron_sword.damage);
  });
  test('持ち物：品物は1つずつ。ほかの人が装備中なら、確認（force）が要る。外すと、だれも装備していない', () => {
    let s = S.addGold(fresh(), 5000);
    s = S.buyArmor(S.buy(s, 'iron_sword').state, 'iron_armor').state;
    assert.strictEqual(S.holder(s, 'weapon', 'wood_sword'), 'hero');          // はじめは、主人公が木の剣
    assert.strictEqual(S.holder(s, 'weapon', 'iron_sword'), null);
    s = S.equip(s, 'kenshi', 'weapon', 'iron_sword').state;
    assert.strictEqual(S.holder(s, 'weapon', 'iron_sword'), 'kenshi');
    assert.strictEqual(S.weaponBonus(s, 'kenshi'), B.WEAPONS.iron_sword.damage - 10);
    assert.strictEqual(S.weaponBonus(s, 'hero'), 0);
    // 主人公が、剣士の剣を装備しようとすると、確認が要る
    const ask = S.equip(s, 'hero', 'weapon', 'iron_sword');
    assert.strictEqual(ask.ok, false); assert.strictEqual(ask.reason, 'inUse'); assert.strictEqual(ask.holder, 'kenshi');
    assert.strictEqual(S.holder(s, 'weapon', 'iron_sword'), 'kenshi');       // 何も変わっていない
    const yes = S.equip(s, 'hero', 'weapon', 'iron_sword', { force: true });
    assert.ok(yes.ok); assert.strictEqual(yes.holder, 'kenshi');
    assert.strictEqual(S.holder(yes.state, 'weapon', 'iron_sword'), 'hero');
    assert.strictEqual(S.equippedOf(yes.state, 'kenshi').weapon, null);       // 外された剣士は、何も装備していない
    // 外す
    const off = S.unequip(yes.state, 'hero', 'weapon');
    assert.strictEqual(S.holder(off.state, 'weapon', 'iron_sword'), null);
    assert.strictEqual(S.damagePerCorrect(off.state), 10);                    // 武器がなければ、木の剣と同じ
    // 防具も同じ
    s = S.equip(s, 'juushouhei', 'armor', 'iron_armor').state;
    assert.strictEqual(S.armorDefense(s, 'juushouhei'), B.ARMORS.iron_armor.defense);
    assert.strictEqual(S.equip(s, 'shiromadoushi', 'armor', 'iron_armor').reason, 'inUse');
    // 保存して読み込んでも残る
    const back = FF.state.parseSave(FF.state.serialize(s), T0 + 1);
    assert.ok(back.ok, back.error);
    assert.strictEqual(S.holder(back.state, 'weapon', 'iron_sword'), 'kenshi');
    assert.strictEqual(S.holder(back.state, 'armor', 'iron_armor'), 'juushouhei');
    const g = S.gearMap(back.state);
    assert.strictEqual(g.kenshi.attack, B.WEAPONS.iron_sword.damage - 10); assert.strictEqual(g.juushouhei.defense, B.ARMORS.iron_armor.defense);
  });
  test('持ち物：前の版（主人公だけの装備）のセーブは、主人公の装備に引きつぐ', () => {
    const base = fresh();
    const old = Object.assign({}, plain(base), { equipment: { weapon: 'stone_sword', owned: ['stone_sword'], armor: 'fur_coat', ownedArmor: ['fur_coat'] } });
    const n = S.normalizeShop(old);
    assert.strictEqual(S.currentWeapon(n), 'stone_sword'); assert.strictEqual(S.currentArmor(n), 'fur_coat');
    assert.ok(S.owns(n, 'wood_sword') && S.ownsArmor(n, 'cloth_clothes'));
    // 同じ品物を2人が装備していても、先の人だけ
    const dup = Object.assign({}, plain(base), { equipment: { owned: ['wood_sword'], ownedArmor: ['cloth_clothes'], equipped: { hero: { weapon: 'wood_sword', armor: null }, kenshi: { weapon: 'wood_sword', armor: null } } } });
    const d = S.normalizeShop(dup); assert.strictEqual(S.holder(d, 'weapon', 'wood_sword'), 'hero'); assert.strictEqual(S.equippedOf(d, 'kenshi').weapon, null);
  });
  test('武器屋：セーブの読み込みで整える（知らない武器・持っていない装備を直す。前の版の state.gold は冒険のゴールドに足す）', () => {
    const base = fresh();
    const n = S.normalizeShop(Object.assign({}, base, { equipment: { weapon: 'flame_sword', owned: ['stone_sword', 'bogus'] } }));
    assert.deepStrictEqual(plain(n.equipment.owned), ['wood_sword', 'stone_sword']);
    assert.strictEqual(S.currentWeapon(n), 'wood_sword');   // 持っていない武器は装備できない
    const m = S.normalizeShop(Object.assign({}, base, { equipment: { weapon: 'stone_sword', owned: ['stone_sword'] } }));
    assert.strictEqual(S.currentWeapon(m), 'stone_sword');
    assert.ok(m.equipment.owned.includes('wood_sword'));
    // 前の版（state.gold にゴールドを持っていた）のセーブ：冒険のゴールドに足されて、gold は消える
    const legacy = JSON.parse(FF.state.serialize(S.addGold(base, 40)));
    legacy.gold = 250;
    const r = FF.state.migrate(legacy, T0 + 1);
    assert.ok(r.ok, r.error);
    assert.strictEqual(r.state.gold, undefined);
    assert.strictEqual(S.gold(r.state), 290);
    // 新しいセーブは、書き出して読み込んでも、ゴールドと装備が残る
    const s = buyEq(S.addGold(base, 500), 'iron_sword');
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
      if (w !== 'wood_sword') st = buyEq(st, w);
      const bat = BA.startBattle(st, region, enemy);
      assert.ok(bat, 'battle');
      const r = BA.answerBattle(st, bat, att(), '2', T0, FF.util.makeRng(5));
      assert.strictEqual(r.outcome.damageDealt, Math.min(bat.enemyHp, B.WEAPONS[w].damage), w);
    }
    void X;
  });
  test('防具屋：防具は5つ。買うと持ち物に入り、装備すると、武器の装備は変わらない。足りないゴールドでは買えない', () => {
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
    s = buyEq(S.addGold(s, 1000), 'iron_sword');
    const r0 = S.buyArmor(s, 'leather_armor'); assert.ok(r0.ok);
    const r = { ok: true, state: S.equip(r0.state, 'hero', 'armor', 'leather_armor').state };
    assert.strictEqual(S.gold(r.state), 1000 - B.WEAPONS.iron_sword.price - B.ARMORS.leather_armor.price);
    assert.strictEqual(S.currentArmor(r.state), 'leather_armor');
    assert.strictEqual(S.currentWeapon(r.state), 'iron_sword');
    assert.strictEqual(S.canBuyArmor(r.state, 'leather_armor').reason, 'owned');
    const q = S.equip(r.state, 'hero', 'armor', 'cloth_clothes');
    assert.strictEqual(S.currentArmor(q.state), 'cloth_clothes');
    assert.strictEqual(S.equip(r.state, 'hero', 'armor', 'steel_armor').reason, 'notOwned');
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
    const rich = buyEqA(buyEq(S.addGold(fresh(), 5000), 'flame_sword'), 'steel_armor');
    const base = run(), strong = run(S.gearMap(rich));
    assert.ok(strong.enemyHp < base.enemyHp, '剣で敵のHPがより減る');
    assert.ok(strong.heroHp > base.heroHp, '防具で主人公のHPがより残る');
    assert.strictEqual(S.weaponBonus(fresh(), 'hero'), 0);
    // 仲間の装備も、その仲間の攻撃・防御に足される
    const ally = S.equip(S.buy(S.addGold(fresh(), 5000), 'flame_sword').state, 'kenshi', 'weapon', 'flame_sword').state;
    const g = S.gearMap(ally); assert.strictEqual(g.kenshi.attack, B.WEAPONS.flame_sword.damage - 10); assert.strictEqual(g.hero.attack, 0);
  });
  test('防具：探索の戦闘で、まちがえたときのダメージが防具で減る（最低1）', () => {
    const s = fresh();
    assert.strictEqual(S.damageTaken(s, 20), 20);
    const a = buyEqA(S.addGold(s, 5000), 'steel_armor');
    assert.strictEqual(S.damageTaken(a, 20), 20 - Math.round(B.ARMORS.steel_armor.defense * B.BATTLE.ARMOR_RATE));
    assert.strictEqual(S.damageTaken(a, 1), 1);
  });
};
