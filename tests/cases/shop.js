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
};
