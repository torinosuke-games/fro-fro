// 熱量で力を貸してくれる仲間（司書）と、魔法研究所の魔法の書物の開発（判断363）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const R = FF.research, A = FF.adventure, B = FF.balance, T0 = 1790000000000;
  const fresh = () => FF.state.createDefaultState(T0);

  test('司書：獲得熱量が10000になると、力を貸してくれて、仲間になる（それまでは、ならない）', () => {
    let s = fresh();
    FF.points.addPoints(s, 9999);
    assert.ok(!s.adventure.recruited.includes('shisho'));
    assert.deepStrictEqual(plain(R.joinProgress(s, 'shisho')), { need: 10000, have: 9999, remaining: 1, done: false });
    assert.strictEqual(R.unlocked(s), false);
    FF.points.addPoints(s, 1);
    assert.ok(s.adventure.recruited.includes('shisho'));
    assert.deepStrictEqual(plain(s.adventure.joinNotice), ['shisho']);   // 画面に、お知らせを出す
    assert.strictEqual(R.unlocked(s), true);
    // 熱量を使っても（引換）、獲得熱量の累計は減らないので、いったん仲間になったら、そのまま
    s.studyPoints = 0;
    assert.ok(s.adventure.recruited.includes('shisho'));
    // 2回めは、お知らせが増えない
    FF.points.addPoints(s, 500);
    assert.strictEqual(s.adventure.joinNotice.length, 1);
  });
  test('司書：すでに獲得熱量が足りている古いセーブは、読み込み時に仲間になる。保存して読み込んでも残る', () => {
    const s = fresh(); s.studyPointsEarnedTotal = 12000;
    const r = FF.state.parseSave(FF.state.serialize(s), T0 + 1);
    assert.ok(r.ok, r.error);
    assert.ok(r.state.adventure.recruited.includes('shisho'));
    const again = FF.state.parseSave(FF.state.serialize(r.state), T0 + 2);
    assert.ok(again.ok, again.error);
    assert.ok(again.state.adventure.recruited.includes('shisho'));
    assert.deepStrictEqual(plain(again.state.adventure.joinNotice), ['shisho']);
  });
  test('魔法研究所：司書が仲間になるまで使えない。ゴールドを使って、魔法の書物を3レベルまで開発できる', () => {
    let s = fresh();
    s = FF.shop.addGold(s, 10000);
    assert.strictEqual(R.canDevelop(s, 'heal').reason, 'locked');
    FF.points.addPoints(s, 10000);
    const costs = B.RESEARCH.BOOKS.heal.costs;
    const g0 = FF.shop.gold(s);
    let r = R.develop(s, 'heal'); assert.ok(r.ok);
    assert.strictEqual(FF.shop.gold(r.state), g0 - costs[0]); assert.strictEqual(R.level(r.state, 'heal'), 1);
    assert.strictEqual(R.level(s, 'heal'), 0);                         // 元は変わらない
    r = R.develop(R.develop(r.state, 'heal').state, 'heal'); assert.strictEqual(R.level(r.state, 'heal'), 3);
    assert.strictEqual(R.canDevelop(r.state, 'heal').reason, 'max');
    assert.strictEqual(R.canDevelop(r.state, 'nothing').reason, 'unknown');
    // ゴールドが足りない
    let poor = fresh(); FF.points.addPoints(poor, 10000);
    assert.strictEqual(R.canDevelop(poor, 'flame').reason, 'gold');
    // 保存して読み込んでも、レベルが残る
    const back = FF.state.parseSave(FF.state.serialize(r.state), T0 + 1);
    assert.ok(back.ok, back.error); assert.strictEqual(R.level(back.state, 'heal'), 3);
  });
  test('魔法の書物：開発すると、冒険の魔法（回復・攻撃・かばう／ベール）が強くなる', () => {
    const bank = FF.learning.createBank(ctx.QUESTION_BANK), rng = () => .37, now = 1791000000000;
    const fx0 = R.effects(fresh()); assert.deepStrictEqual(plain(fx0), { healBonus: 0, powerMult: 1, guardBonus: 0 });
    let s = FF.shop.addGold(fresh(), 100000); FF.points.addPoints(s, 10000);
    for (const id of ['heal', 'flame', 'guard']) for (let i = 0; i < 3; i++) s = R.develop(s, id).state;
    const fx = R.effects(s);
    assert.ok(Math.abs(fx.healBonus - 24) < 1e-9 && Math.abs(fx.powerMult - 1.45) < 1e-9 && Math.abs(fx.guardBonus - .15) < 1e-9);
    const run = (type, who, effects) => {
      let p = A.create(); p.pos = plain(A.ENEMIES.boss); p = A.encounter(p, 'boss'); p.battle.turn = 2;
      p.roster.hero.hp = 1;
      const orders = Object.fromEntries(A.alive(p).map(id => [id, { type: 'attack', target: id }]));
      orders[who] = type === 'heal' ? { type: 'magic', target: 'hero' } : { type: 'magic', target: who };
      p = A.command(p, orders, bank, 4, rng, now); p = A.answer(p, p.battle.question.answer, now);
      const before = p.battle.hp, hp0 = p.roster.hero.hp;
      p = A.advance(p, bank, 4, rng, now, {}, effects);
      return { dmg: before - p.battle.hp, healed: p.roster.hero.hp - hp0, p };
    };
    assert.ok(run('heal', 'shiromadoushi', fx).healed > run('heal', 'shiromadoushi', fx0).healed, '癒しの書で、回復が増える');
    assert.ok(run('attack', 'hero', fx).dmg > run('attack', 'hero', fx0).dmg, '炎の書で、攻撃魔法が強くなる');
    // かばう：重装兵が個別攻撃を受けるとき、被害がさらに減る
    const guard = effects => {
      let p = A.create(); p.pos = plain(A.ENEMIES.boss); p = A.encounter(p, 'boss'); p.battle.turn = 1;
      const orders = Object.fromEntries(A.alive(p).map(id => [id, { type: 'attack', target: id }]));
      orders.juushouhei = { type: 'magic', target: 'juushouhei' };
      p = A.command(p, orders, bank, 4, rng, now); p = A.answer(p, 'x', now);
      p = A.advance(p, bank, 4, rng, now, {}, effects); p = A.advance(p, bank, 4, rng, now, {}, effects);
      return p.roster.juushouhei.hp;
    };
    assert.ok(guard(fx) > guard(fx0), '守りの書で、かばうときの被害が減る');
  });
};
