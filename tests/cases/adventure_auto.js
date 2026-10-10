// オートバトル（判断375）：作戦ごとの、そのターンの行動
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const A = FF.adventure, B = FF.balance.ADVENTURE, bank = FF.learning.createBank(ctx.QUESTION_BANK), now = 1791000000000, rng = () => .37;
  const full = () => { const p = A.create(); p.party = ['hero', 'juushouhei', 'shiromadoushi', 'kenshi']; p.recruited = p.party.filter(x => x !== 'hero'); p.pos = plain(A.ENEMIES.boss); return A.encounter(p, 'boss'); };
  const hurt = (p, id, ratio) => { p.roster[id].hp = Math.max(0, Math.round(A.stats(id, p.roster[id].xp).hp * ratio)); return p; };
  const type = (o, id) => o[id].type + (o[id].type === 'attack' ? '' : ':' + (o[id].target));

  test('オートバトル：初期状態は手動。保存・読み込みで、オンと作戦が残り、へんな値は直る', () => {
    const p = A.create(); assert.deepStrictEqual(plain(p.auto), { on: false, tactic: 'balance' });
    const on = A.setAuto(p, 'life'); assert.deepStrictEqual(plain(on.auto), { on: true, tactic: 'life' });
    assert.deepStrictEqual(plain(A.setAuto(on, null).auto), { on: false, tactic: 'life' });   // 手動にもどしても、作戦は覚えている
    assert.strictEqual(A.setAuto(p, 'bogus'), p);
    assert.deepStrictEqual(plain(A.normalize({ auto: { on: 'yes', tactic: 'x' } }).auto), { on: false, tactic: 'balance' });
    assert.deepStrictEqual(plain(A.normalize(plain(on)).auto), { on: true, tactic: 'life' });
  });
  test('オートバトル：どの作戦も、全員ぶんの行動を決め、そのままクイズへ進める', () => {
    for (const t of B.AUTO.TACTICS) {
      let p = full(); p = hurt(p, 'kenshi', .3);
      const o = A.autoOrders(p, t); assert.deepStrictEqual(plain(Object.keys(o).sort()), plain(A.alive(p).slice().sort()));
      const next = A.command(p, o, bank, 4, rng, now); assert.notStrictEqual(next, p, t); assert.equal(next.battle.phase, 'attack');
    }
  });
  test('ガンガンいこうぜ：回復せず、攻撃。魔法が強い人は魔法', () => {
    let p = full(); p = hurt(p, 'kenshi', .1);
    const o = A.autoOrders(p, 'gungun');
    assert.equal(type(o, 'shiromadoushi'), 'attack'); assert.equal(type(o, 'juushouhei'), 'attack'); assert.equal(type(o, 'kenshi'), 'attack');
    p.party = ['hero', 'kuromadoushi']; p.recruited = ['kuromadoushi']; p.roster.hero.hp = 1;
    assert.equal(A.autoOrders(p, 'gungun').kuromadoushi.type, 'magic');   // 黒魔導士：魔法が強い
  });
  test('MP使うな：魔法は使わない。HPが少ない人には、回復薬', () => {
    let p = full(); let o = A.autoOrders(p, 'noMp');
    for (const id of A.alive(p)) assert.equal(o[id].type, 'attack');
    p = hurt(p, 'kenshi', .2); o = A.autoOrders(p, 'noMp');
    assert.ok(A.alive(p).every(id => o[id].type !== 'magic'));
    assert.equal(A.alive(p).filter(id => o[id].type === 'item').length, 1);   // 同じ人に、回復薬を重ねない
    assert.equal(A.alive(p).find(id => o[id].type === 'item') && o[A.alive(p).find(id => o[id].type === 'item')].target, 'kenshi');
    p.potions = 0; o = A.autoOrders(p, 'noMp'); assert.ok(A.alive(p).every(id => o[id].type === 'attack'));
  });
  test('いのち大事に：減った仲間を回復魔法で、まもり役は、まもる', () => {
    let p = full(); p = hurt(p, 'kenshi', .7);
    const o = A.autoOrders(p, 'life');
    assert.deepStrictEqual(plain(o.shiromadoushi), { type: 'magic', target: 'kenshi' });   // 回復魔法
    assert.deepStrictEqual(plain(o.juushouhei), { type: 'magic', target: 'juushouhei' });   // かばう
    const none = A.autoOrders(full(), 'life'); assert.equal(none.shiromadoushi.type, 'attack');   // 全員元気なら、回復しない
  });
  test('バランス重視で：HPが減ったときだけ回復。MPが足りなければ攻撃', () => {
    let p = full(); assert.equal(A.autoOrders(p, 'balance').shiromadoushi.type, 'attack');
    p = hurt(p, 'hero', .5); assert.deepStrictEqual(plain(A.autoOrders(p, 'balance').shiromadoushi), { type: 'magic', target: 'hero' });
    p.roster.shiromadoushi.mp = 0; const o = A.autoOrders(p, 'balance'); assert.equal(o.shiromadoushi.type, 'attack');
    assert.notStrictEqual(A.command(p, o, bank, 4, rng, now), p);
  });
  test('オートバトル：たおれた仲間も、回復魔法の相手にする。同じ人に、回復を重ねない', () => {
    let p = full(); p = hurt(p, 'kenshi', 0);
    const o = A.autoOrders(p, 'life'); assert.deepStrictEqual(plain(o.shiromadoushi), { type: 'magic', target: 'kenshi' });
    assert.ok(!A.alive(p).includes('kenshi')); assert.equal(Object.keys(o).includes('kenshi'), false);
    p.potions = 5; assert.equal(A.alive(p).filter(id => o[id].type === 'item' || (o[id].type === 'magic' && o[id].target === 'kenshi')).length, 1);
  });
};
