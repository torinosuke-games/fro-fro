// 町から町への試作：純粋な状態遷移と、既存セーブとの結合を検証する。
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const A = FF.adventure, B = FF.balance.ADVENTURE, bank = FF.learning.createBank(ctx.QUESTION_BANK), now = 1791000000000;
  const rng = () => .37;
  function atEnemy(id, source) { let p = source || A.create(); p.pos = plain(A.ENEMIES[id]); return A.encounter(p, id); }
  function orders(p, overrides = {}) { return Object.fromEntries(A.alive(p).map(id => [id, overrides[id] || { type: 'attack', target: id }])); }
  function turn(p, correct = true, overrides) {
    p = A.command(p, orders(p, overrides), bank, 4, rng, now);
    assert.equal(p.battle.phase, 'attack');
    p = A.answer(p, correct ? p.battle.question.answer : 'not-the-answer', now);
    if (p.battle.phase === 'win') return p;
    p = A.advance(p, bank, 4, rng, now);
    assert.equal(p.battle.phase, 'defense');
    p = A.answer(p, correct ? p.battle.question.answer : 'not-the-answer', now);
    return p.battle.phase === 'lose' ? p : A.advance(p, bank, 4, rng, now);
  }
  function win(p) { for (let i = 0; i < 30 && p.battle.phase !== 'win' && p.battle.phase !== 'lose'; i++) p = turn(p); assert.equal(p.battle.phase, 'win'); return p; }

  test('冒険：移動方向を保存し、旧セーブと不正な向きは正面で補完する', () => {
    let p = A.create();
    for (const [x,y,facing] of [[1,5,'up'],[2,5,'right'],[2,6,'down'],[1,6,'left']]) {
      p = A.move(p,x,y); assert.equal(p.facing,facing); assert.equal(A.normalize(p).facing,facing);
    }
    const old = plain(p); delete old.facing; assert.equal(A.normalize(old).facing,'down');
    old.facing = 'invalid'; assert.equal(A.normalize(old).facing,'down');
    assert.strictEqual(A.move(p,0,6),p);
  });
  test('冒険：町からの出発で途中位置と戦闘を解除し、進行と報酬は保持する', () => {
    let p = atEnemy('cub'); p.gold=37; p.answered=5; p.correct=4; p.chest=true;
    const before=JSON.stringify(p), n=A.depart(p,'home');
    assert.equal(JSON.stringify(p),before);assert.equal(n.battle,null);
    assert.deepEqual(plain(n.pos),plain(A.PLACES.home));assert.equal(n.facing,'down');
    assert.equal(n.gold,37);assert.equal(n.answered,5);assert.equal(n.correct,4);assert.equal(n.chest,true);
    assert.strictEqual(A.depart(p,'town'),p);
    p.arrived=true;p.cleared=['boss'];assert.deepEqual(plain(A.depart(p,'town').pos),plain(A.PLACES.town));
  });
  test('冒険：歩行経路は障害物を越えず、敵にふれると止まる', () => {
    let p = A.create();
    const before = JSON.stringify(p), route = A.path(p, A.ENEMIES.cub);
    assert.equal(route.length, 2);
    for (const pos of route) p = A.move(p, pos.x, pos.y);
    assert.equal(p.battle.enemy, 'cub'); assert.strictEqual(A.move(p, 4, 6), p);
    assert.equal(JSON.stringify(A.create()), before);
    assert.strictEqual(A.move(A.create(), 0, 6).pos.x, 1);
    assert.strictEqual(A.move(A.create(), 7, 6).pos.x, 1);
    assert.equal(A.path(A.create(), A.PLACES.town).length, 0);
  });
  test('冒険：弱い敵は回避でき、峠の敵は回避できない', () => {
    let p = A.create(); const route = A.path(p, A.ENEMIES.boss); assert.ok(route.length);
    for (const pos of route) { p = A.move(p, pos.x, pos.y); if (p.battle) break; }
    assert.equal(p.battle.enemy, 'boss');
    assert.deepEqual(plain(p.cleared), []);
  });
  test('冒険：宝箱は1回限り、焚き火は旅ごとに1回、町で補給と復活', () => {
    let p = A.create(); p.pos = { x: 3, y: 2 }; p = A.move(p, 3, 1);
    assert.equal(p.gold, 30); assert.equal(p.potions, 5);
    p = A.move(A.move(p, 3, 2), 3, 1); assert.equal(p.gold, 30);
    p.pos = { x: 6, y: 2 }; p.roster.rin.hp = 0; p = A.move(p, 6, 3); assert.equal(p.roster.rin.hp, B.MEMBERS.rin.hp);
    p.roster.rin.hp = 1; p = A.move(A.move(p, 6, 2), 6, 3); assert.equal(p.roster.rin.hp, 1);
    p.potions = 0; p = A.rest(p, 'home'); assert.equal(p.potions, 3); assert.equal(p.campUsed, false); assert.equal(p.roster.rin.hp, B.MEMBERS.rin.hp);
  });
  test('冒険：編成は町だけ、主人公を外せず重複しない', () => {
    const p = A.create();
    assert.strictEqual(A.setParty(p, ['gan']), p);
    assert.strictEqual(A.setParty(p, ['hero', 'hero']), p);
    const n = A.setParty(p, ['gan', 'hero']); assert.deepEqual(plain(n.party), ['gan', 'hero']);
    n.pos = { x: 2, y: 6 }; assert.strictEqual(A.setParty(n, ['hero']), n);
  });
  test('冒険：誤答で攻撃・魔法は出ず、MPは減らない。道具は使える', () => {
    let p = atEnemy('wolf'); p.roster.gan.hp = 1;
    p = A.command(p, orders(p, { hero: { type: 'magic', target: 'hero' }, sora: { type: 'item', target: 'gan' } }), bank, 4, rng, now);
    const old = JSON.stringify(p); p = A.answer(p, 'wrong', now);
    assert.equal(p.battle.hp, B.ENEMIES.wolf.hp); assert.equal(p.roster.hero.mp, B.MEMBERS.hero.mp);
    assert.equal(p.roster.gan.hp, 1 + B.POTION_HEAL); assert.equal(p.potions, 2); assert.equal(p.correct, 0);
    assert.notEqual(JSON.stringify(p), old);
    assert.strictEqual(A.answer(p, p.battle.question.answer, now), p, '二重回答で報酬を得ない');
  });
  test('冒険：回復薬の多重予約とMP不足は拒否、空欄は未回答', () => {
    let p = atEnemy('wolf'); p.potions = 1;
    assert.strictEqual(A.command(p, orders(p, { hero: { type: 'item', target: 'gan' }, sora: { type: 'item', target: 'rin' } }), bank, 4, rng, now), p);
    p.roster.hero.mp = 0; assert.strictEqual(A.command(p, orders(p, { hero: { type: 'magic' } }), bank, 4, rng, now), p);
    p = A.command(p, orders(p), bank, 4, rng, now); assert.strictEqual(A.answer(p, null, now), p);
  });
  test('冒険：防御正解で軽減、強敵は予告どおり全体攻撃', () => {
    let p = atEnemy('boss'); p.battle.turn = 2;
    p = A.command(p, orders(p), bank, 4, rng, now); p = A.answer(p, 'wrong', now); p = A.advance(p, bank, 4, rng, now);
    assert.equal(A.intent(p).all, true);
    const good = A.answer(p, p.battle.question.answer, now), bad = A.answer(p, 'wrong', now);
    for (const id of p.party) { assert.ok(good.roster[id].hp < p.roster[id].hp); assert.ok(good.roster[id].hp > bad.roster[id].hp); }
  });
  test('冒険：ガンが個別攻撃をかばい、ソラが全体の被害を軽減', () => {
    let p = atEnemy('boss'); p = A.command(p, orders(p, { gan: { type: 'magic' }, sora: { type: 'magic' } }), bank, 4, rng, now);
    p = A.answer(p, p.battle.question.answer, now); assert.equal(p.battle.guarded, true); assert.equal(p.battle.ward, true);
    p = A.advance(p, bank, 4, rng, now); p = A.answer(p, 'wrong', now);
    assert.equal(p.roster.hero.hp, B.MEMBERS.hero.hp); assert.ok(p.roster.gan.hp < B.MEMBERS.gan.hp);
  });
  test('冒険：リンの魔法で戦線離脱から復帰、倒れた人は行動しない', () => {
    let p = atEnemy('boss'); p.roster.gan.hp = 0;
    p = A.command(p, orders(p, { rin: { type: 'magic', target: 'gan' } }), bank, 4, rng, now); p = A.answer(p, p.battle.question.answer, now);
    assert.ok(p.roster.gan.hp > 0); assert.equal(p.roster.rin.mp, B.MEMBERS.rin.mp - 3);
    assert.ok(!p.battle.log.some(l => l.key === 'hit' && l.who === 'gan'));
  });
  test('冒険：勝利報酬は1回だけ。離脱者にも経験値、次のレベルで能力上昇', () => {
    let p = atEnemy('cub'); p.roster.gan.hp = 0; p.roster.gan.xp = 20;
    p = win(p); assert.equal(p.gold, B.ENEMIES.cub.gold); assert.equal(p.roster.gan.xp, 34);
    assert.equal(p.roster.gan.hp, 0); assert.equal(A.stats('gan', 34).level, 2); assert.ok(A.stats('gan', 34).strength > B.MEMBERS.gan.strength);
    assert.strictEqual(A.answer(p, p.battle.question.answer, now), p);
    p = A.advance(p, bank, 4, rng, now); assert.equal(p.gold, B.ENEMIES.cub.gold); assert.equal(p.battle, null);
    assert.strictEqual(A.encounter(p, 'cub'), p);
  });
  test('冒険：敗北・撤退で資産を失わない。にげる連打で移動しない', () => {
    let p = atEnemy('boss'); p.gold = 50; p.party.forEach(id => p.roster[id].hp = 1); p.battle.turn = 2;
    p = turn(p, false); assert.equal(p.battle.phase, 'lose'); p = A.advance(p, bank, 4, rng, now);
    assert.equal(p.gold, 50); assert.deepEqual(plain(p.pos), plain(A.PLACES.home)); assert.equal(A.alive(p).length, 4);
    p = A.retreat(atEnemy('wolf', p)); const pos = plain(p.pos); assert.equal(p.battle, null); assert.strictEqual(A.retreat(p), p); assert.deepEqual(plain(p.pos), pos);
  });
  test('冒険：敵を倒して次の町へ到着でき、町では通常敵だけ再出現', () => {
    let p = atEnemy('cub'); p = A.advance(win(p), bank, 4, rng, now);
    p = atEnemy('wolf', p); p = A.advance(win(p), bank, 4, rng, now);
    p = A.rest(p, 'home'); p = atEnemy('boss', p); p = A.advance(win(p), bank, 4, rng, now);
    assert.ok(p.cleared.includes('boss'));
    for (const pos of A.path(p, A.PLACES.town)) p = A.move(p, pos.x, pos.y);
    assert.equal(p.arrived, true); assert.equal(p.lastTown, 'town'); assert.equal(p.notice, 'arrival'); assert.deepEqual(plain(p.cleared), ['boss']);
  });
  test('冒険：同じ学年・教科・難易度で出題し、直近の重複を避ける', () => {
    const p = A.create(); p.subject = 'science'; p.difficulty = 'standard';
    const q = A.pick(bank, p, 4, rng, now); assert.equal(q.gradeLevel, 4); assert.equal(q.subject, 'science'); assert.equal(q.difficulty, 'standard');
    p.recent.push(q.id); assert.notEqual(A.pick(bank, p, 4, rng, now).id, q.id);
    p.subject = 'unknown'; assert.equal(A.pick(bank, p, 4, rng, now), null);
  });
  test('冒険：旧セーブの補完と戦闘途中の往復。既存の熱量・チケットは変わらない', () => {
    let s = FF.state.createDefaultState(now), old = FF.state.parseSave(FF.state.serialize(s), now); assert.ok(old.ok); assert.deepEqual(plain(old.state.adventure.party), ['hero', 'gan', 'rin', 'sora']);
    s.adventure = atEnemy('boss'); s.adventure = A.command(s.adventure, orders(s.adventure), bank, 4, rng, now);
    const saved = FF.state.parseSave(FF.state.serialize(s), now); assert.ok(saved.ok); assert.deepEqual(plain(saved.state.adventure), plain(s.adventure));
    saved.state.adventure = A.answer(saved.state.adventure, saved.state.adventure.battle.question.answer, now);
    assert.equal(saved.state.studyPoints, s.studyPoints); assert.deepEqual(plain(saved.state.tickets), plain(s.tickets)); assert.equal(saved.state.adventure.history.length, 1);
    const tampered = JSON.parse(FF.state.serialize(s)); tampered.adventure.gold = 999;
    assert.equal(FF.state.parseSave(JSON.stringify(tampered), now).ok, false);
  });
};
