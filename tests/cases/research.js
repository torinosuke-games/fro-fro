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

  test('学者：正解した問題が200種類になると仲間になる。盗賊：探索の宝箱を8個開けると仲間になる', () => {
    let s = fresh();
    for (let i = 0; i < 199; i++) s.learning.questionResults['q' + i] = true;
    s.learning.questionResults.wrong = false;
    R.applyJoins(s);
    assert.ok(!s.adventure.recruited.includes('gakusha'));
    assert.strictEqual(R.joinProgress(s, 'gakusha').remaining, 1);
    s.learning.questionResults.q200 = true;
    assert.deepStrictEqual(plain(R.applyJoins(s)), ['gakusha']);
    assert.deepStrictEqual(plain(s.adventure.joinNotice), ['gakusha']);
    // 盗賊：宝箱（探索）。8個目で仲間になる
    s = fresh();
    const ids = Object.keys(B.EXPLORE.CHESTS), regions = { sf: 'snowfield', fr: 'forest', gl: 'glacier' };
    let opened = 0;
    for (const id of ids) {
      if (opened >= 8) break;
      const r = FF.exploration.openChest(s, regions[id.slice(0, 2)], id, T0);
      if (r.reward) { s = r.state; opened++; }
      if (opened < 8) assert.ok(!s.adventure.recruited.includes('touzoku'));
    }
    assert.strictEqual(opened, 8);
    assert.ok(s.adventure.recruited.includes('touzoku'));
  });
  test('学者・盗賊：まだ会えていない間は、編成の画面に条件の数は出ない', () => {
    assert.strictEqual(R.joinKind('gakusha'), 'solved');
    assert.strictEqual(R.joinKind('touzoku'), 'chests');
    assert.strictEqual(R.joinKind('shisho'), 'heat');
    assert.strictEqual(R.joinKind('senshi'), null);
    assert.ok(!/\d/.test(FF.texts.adventure.lockedSolved + FF.texts.adventure.lockedChests));
  });

  test('値段のバランス（判断366）：はじめの一周のゴールドで最初の武器と防具が買え、最後の品物は何周も遊ぶ先にある', () => {
    const AB = B.ADVENTURE, firstRun = AB.CHEST_GOLD + AB.ENEMIES.cub.gold + AB.ENEMIES.wolf.gold + AB.ENEMIES.boss.gold;
    assert.ok(firstRun >= B.WEAPONS.stone_sword.price + B.ARMORS.fur_coat.price);   // 最初の宝箱とボスで、はじめの2つが買える
    const loop = AB.ENEMIES.cub.gold + AB.ENEMIES.wolf.gold + AB.DROP_RATE * AB.DROP_GOLD * 2;   // 2回めからの1周（ボス・宝箱はなし）
    const all = Object.values(B.WEAPONS).concat(Object.values(B.ARMORS)).reduce((a, x) => a + x.price, 0);
    const books = Object.values(B.RESEARCH.BOOKS).reduce((a, x) => a + x.costs.reduce((p, c) => p + c, 0), 0);
    assert.ok((all + books) / loop > 60 && (all + books) / loop < 250);   // すべてそろえるまでに、60〜250周
    Object.values(B.RESEARCH.BOOKS).forEach(bk => bk.costs.forEach((c, k) => { if (k) assert.ok(c > bk.costs[k - 1]); }));
  });
};
