// 町から町への試作：純粋な状態遷移と、既存セーブとの結合を検証する。
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const A = FF.adventure, B = FF.balance.ADVENTURE, bank = FF.learning.createBank(ctx.QUESTION_BANK), now = 1791000000000;
  const rng = () => .37;
  function atEnemy(id, source) { let p = source || A.create(); p.pos = plain(A.ENEMIES[id] || { x: 4, y: 6 }); return A.encounter(p, id); }   // ザコ敵は、ランダムに現れる（判断376）。ここでは、その場で戦闘にする
  function orders(p, overrides = {}) { return Object.fromEntries(A.alive(p).map(id => [id, overrides[id] || { type: 'attack', target: id }])); }
  function turn(p, correct = true, overrides) {
    p = A.command(p, orders(p, overrides), bank, 4, rng, now);
    assert.equal(p.battle.phase, 'attack');
    p = A.answer(p, correct ? p.battle.question.answer : 'not-the-answer', now);
    assert.equal(p.battle.phase, 'explanation');
    p = A.advance(p, bank, 4, rng, now);
    if (p.battle.phase === 'win') return p;
    assert.equal(p.battle.phase, 'playerAction');
    p = A.advance(p, bank, 4, rng, now);
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
  test('冒険：歩行経路は障害物を越えず、見える敵（峠の大獣）にふれると止まる', () => {
    let p = A.create(); p.pos = { x: 6, y: 6 };
    const before = JSON.stringify(p), route = A.path(p, A.ENEMIES.boss);
    assert.equal(route.length, 2);
    for (const pos of route) p = A.move(p, pos.x, pos.y);
    assert.equal(p.battle.enemy, 'boss'); assert.strictEqual(A.move(p, 9, 6), p);
    assert.equal(JSON.stringify(Object.assign(A.create(), { pos: { x: 6, y: 6 } })), before);
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
    p.pos = { x: 6, y: 2 }; p.roster.shiromadoushi.hp = 0; p = A.move(p, 6, 3); assert.equal(p.roster.shiromadoushi.hp, B.MEMBERS.shiromadoushi.hp);
    p.roster.shiromadoushi.hp = 1; p = A.move(A.move(p, 6, 2), 6, 3); assert.equal(p.roster.shiromadoushi.hp, 1);
    p.potions = 0; p = A.rest(p, 'home'); assert.equal(p.potions, 3); assert.equal(p.campUsed, false); assert.equal(p.roster.shiromadoushi.hp, B.MEMBERS.shiromadoushi.hp);
  });
  test('冒険：編成は町だけ、主人公を外せず重複しない', () => {
    const p = A.create();
    assert.strictEqual(A.setParty(p, ['juushouhei']), p);
    assert.strictEqual(A.setParty(p, ['hero', 'hero']), p);
    const n = A.setParty(p, ['juushouhei', 'hero']); assert.deepEqual(plain(n.party), ['juushouhei', 'hero']);
    n.pos = { x: 2, y: 6 }; assert.strictEqual(A.setParty(n, ['hero']), n);
  });
  test('冒険：解説中は行動せず、誤答でも通常攻撃・魔法・道具を使える', () => {
    let p = atEnemy('wolf'); p.roster.juushouhei.hp = 1;
    p = A.command(p, orders(p, { hero: { type: 'magic', target: 'hero' }, kenshi: { type: 'item', target: 'juushouhei' } }), bank, 4, rng, now);
    const old = JSON.stringify(p); p = A.answer(p, 'wrong', now);
    assert.equal(p.battle.hp, B.ENEMIES.wolf.hp); assert.equal(p.roster.hero.mp, B.MEMBERS.hero.mp);
    assert.equal(p.roster.juushouhei.hp, 1); assert.equal(p.potions, 3);
    p = A.advance(p, bank, 4, rng, now);
    assert.ok(p.battle.hp < B.ENEMIES.wolf.hp); assert.equal(p.roster.hero.mp, B.MEMBERS.hero.mp - B.MAGIC_COST);
    assert.equal(p.roster.juushouhei.hp, 1 + B.POTION_HEAL); assert.equal(p.potions, 2); assert.equal(p.correct, 0);
    assert.equal(p.battle.log.find(l=>l.key==='heal'&&l.who==='juushouhei').actor,'kenshi');
    assert.notEqual(JSON.stringify(p), old);
    assert.strictEqual(A.answer(p, p.battle.question.answer, now), p, '二重回答で報酬を得ない');
  });
  test('冒険：回復薬の多重予約とMP不足は拒否、空欄は未回答', () => {
    let p = atEnemy('wolf'); p.potions = 1;
    assert.strictEqual(A.command(p, orders(p, { hero: { type: 'item', target: 'juushouhei' }, kenshi: { type: 'item', target: 'shiromadoushi' } }), bank, 4, rng, now), p);
    p.roster.hero.mp = 0; assert.strictEqual(A.command(p, orders(p, { hero: { type: 'magic' } }), bank, 4, rng, now), p);
    p = A.command(p, orders(p), bank, 4, rng, now); assert.strictEqual(A.answer(p, null, now), p);
  });
  test('冒険：1問の正解で攻撃強化・敵攻撃軽減。反撃に問題は出ない', () => {
    let p = atEnemy('boss'); p.battle.turn = 2;
    p = A.command(p, orders(p), bank, 4, rng, now);
    const goodAnswer = A.answer(p, p.battle.question.answer, now), badAnswer = A.answer(p, 'wrong', now);
    assert.equal(goodAnswer.battle.hp, p.battle.hp);
    const goodHit = A.advance(goodAnswer), badHit = A.advance(badAnswer);
    assert.ok(goodHit.battle.hp < badHit.battle.hp);
    const good = A.advance(goodHit), bad = A.advance(badHit);
    assert.equal(good.battle.phase, 'enemyAction');
    assert.strictEqual(A.answer(good, 'wrong', now), good);
    assert.equal(good.answered, 1); assert.equal(good.history.length, 1);
    for (const id of p.party) { assert.ok(good.roster[id].hp < p.roster[id].hp); assert.ok(good.roster[id].hp > bad.roster[id].hp); }
    for (const state of [goodAnswer, goodHit, good]) assert.deepEqual(plain(A.normalize(state)), plain(state));
    assert.equal(A.advance(good).battle.phase, 'commands');
  });
  test('冒険：重装兵が個別攻撃をかばい、司書が全体の被害を軽減', () => {
    let p = A.recruit(A.create(), 'shisho'); p = A.setParty(p, ['hero', 'juushouhei', 'shiromadoushi', 'shisho']); assert.deepEqual(plain(p.party), ['hero', 'juushouhei', 'shiromadoushi', 'shisho']);
    p = atEnemy('boss', p); p = A.command(p, orders(p, { juushouhei: { type: 'magic' }, shisho: { type: 'magic' } }), bank, 4, rng, now);
    p = A.answer(p, p.battle.question.answer, now); p = A.advance(p); assert.equal(p.battle.guarded, true); assert.equal(p.battle.ward, true);
    p = A.advance(p, bank, 4, rng, now);
    assert.equal(p.roster.hero.hp, B.MEMBERS.hero.hp); assert.ok(p.roster.juushouhei.hp < B.MEMBERS.juushouhei.hp);
  });
  test('冒険：リンの魔法で戦線離脱から復帰、倒れた人は行動しない', () => {
    let p = atEnemy('boss'); p.roster.juushouhei.hp = 0;
    p = A.command(p, orders(p, { shiromadoushi: { type: 'magic', target: 'juushouhei' } }), bank, 4, rng, now); p = A.answer(p, p.battle.question.answer, now);
    p = A.advance(p);
    assert.ok(p.roster.juushouhei.hp > 0); assert.equal(p.roster.shiromadoushi.mp, B.MEMBERS.shiromadoushi.mp - 3);
    assert.ok(!p.battle.log.some(l => l.key === 'hit' && l.who === 'juushouhei'));
  });
  test('冒険：勝利報酬は1回だけ。離脱者にも経験値、次のレベルで能力上昇', () => {
    let p = atEnemy('cub'); p.roster.juushouhei.hp = 0; p.roster.juushouhei.xp = 20;
    p = win(p); assert.equal(p.gold, B.ENEMIES.cub.gold); assert.equal(p.roster.juushouhei.xp, 34);
    assert.equal(p.roster.juushouhei.hp, 0); assert.equal(A.stats('juushouhei', 34).level, 2); assert.ok(A.stats('juushouhei', 34).strength > B.MEMBERS.juushouhei.strength);
    assert.strictEqual(A.answer(p, p.battle.question.answer, now), p);
    p = A.advance(p, bank, 4, rng, now); assert.equal(p.gold, B.ENEMIES.cub.gold); assert.equal(p.battle, null);
    assert.notStrictEqual(A.encounter(p, 'cub'), p);   // ザコ敵は、何度でも現れる（ランダム。判断376）
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
  test('冒険：敵を倒した後の仲間は攻撃・魔法・道具を使わない', () => {
    let p=atEnemy('cub');p.battle.hp=1;p.roster.juushouhei.hp=1;
    p=A.command(p,orders(p,{hero:{type:'magic'},juushouhei:{type:'item',target:'juushouhei'}}),bank,4,rng,now);p=A.answer(p,p.battle.question.answer,now);p=A.advance(p,bank,4,()=>1,now);
    assert.equal(p.battle.phase,'win');assert.equal(p.battle.log.length,1);assert.equal(p.battle.log[0].who,'kenshi');assert.equal(p.battle.log[0].amount,1);
    assert.equal(p.roster.hero.mp,B.MEMBERS.hero.mp);assert.equal(p.potions,B.POTIONS);assert.equal(p.roster.juushouhei.hp,1);
  });
  test('冒険：勝利時の宝箱は確率境界を守り、報酬を一度だけ保存する', () => {
    let p=atEnemy('cub');p.battle.hp=1;p=A.command(p,orders(p),bank,4,rng,now);p=A.answer(p,p.battle.question.answer,now);
    const before=JSON.stringify(p), drop=A.advance(p,bank,4,()=>0,now), none=A.advance(p,bank,4,()=>B.DROP_RATE,now);
    assert.equal(JSON.stringify(p),before);assert.equal(none.battle.reward.chest,undefined);
    assert.equal(drop.battle.phase,'win');assert.equal(drop.gold,B.ENEMIES.cub.gold+B.DROP_GOLD);assert.equal(drop.potions,B.POTIONS+B.DROP_POTIONS);
    assert.deepEqual(plain(A.normalize(drop)),plain(drop));
    const state=FF.state.createDefaultState(now);state.adventure=drop;
    const restored=FF.state.parseSave(FF.state.serialize(state),now);assert.ok(restored.ok);
    assert.deepEqual(plain(restored.state.adventure.battle.reward.chest),{gold:B.DROP_GOLD,potions:B.DROP_POTIONS});
    const cleared=A.advance(restored.state.adventure);assert.equal(cleared.gold,drop.gold);assert.equal(cleared.potions,drop.potions);
    assert.strictEqual(A.advance(cleared),cleared);
  });
  test('冒険：旧戦闘の移行はすでに終わった攻撃を繰り返さない', () => {
    let p = atEnemy('wolf'); p.battle.phase='attackResult'; delete p.battle.flowVersion; p.battle.hp=100;
    const n=A.normalize(p); assert.equal(n.battle.phase,'playerAction'); assert.equal(A.advance(n).battle.hp,100);
    p.battle.phase='defenseResult'; assert.equal(A.advance(A.normalize(p)).battle.phase,'commands');
  });
  test('冒険：旧セーブの補完と戦闘途中の往復。既存の熱量・チケットは変わらない', () => {
    let s = FF.state.createDefaultState(now), old = FF.state.parseSave(FF.state.serialize(s), now); assert.ok(old.ok); assert.deepEqual(plain(old.state.adventure.party), ['hero', 'juushouhei', 'shiromadoushi', 'kenshi']);
    s.adventure = atEnemy('boss'); s.adventure = A.command(s.adventure, orders(s.adventure), bank, 4, rng, now);
    const saved = FF.state.parseSave(FF.state.serialize(s), now); assert.ok(saved.ok); assert.deepEqual(plain(saved.state.adventure), plain(s.adventure));
    saved.state.adventure = A.answer(saved.state.adventure, saved.state.adventure.battle.question.answer, now);
    assert.equal(saved.state.studyPoints, s.studyPoints); assert.deepEqual(plain(saved.state.tickets), plain(s.tickets)); assert.equal(saved.state.adventure.history.length, 1);
    const tampered = JSON.parse(FF.state.serialize(s)); tampered.adventure.gold = 999;
    assert.equal(FF.state.parseSave(JSON.stringify(tampered), now).ok, false);
  });
  test('仲間：はじめは3人（重装兵・白魔導士・剣士）。ほかの6人は、救出（recruit）で増え、編成できる', () => {
    let p = A.create();
    assert.deepEqual(plain(p.recruited), ['juushouhei', 'shiromadoushi', 'kenshi']);
    assert.deepEqual(plain(p.party), ['hero', 'juushouhei', 'shiromadoushi', 'kenshi']);
    assert.equal(A.ALLIES.length, 9);
    // まだ仲間でない人は、編成できない
    assert.strictEqual(A.setParty(p, ['hero', 'shisho']), p);
    p = A.recruit(p, 'shisho'); assert.ok(p.recruited.includes('shisho'));
    assert.strictEqual(A.recruit(p, 'shisho'), p);              // 二重には増えない
    assert.strictEqual(A.recruit(p, 'nobody'), p);
    p = A.setParty(p, ['hero', 'shisho', 'kenshi']); assert.deepEqual(plain(p.party), ['hero', 'shisho', 'kenshi']);
    // 保存して読み込んでも残る。仲間でない人が混ざった編成は、直される
    const back = A.normalize(plain(p)); assert.deepEqual(plain(back.recruited), plain(p.recruited)); assert.deepEqual(plain(back.party), ['hero', 'shisho', 'kenshi']);
    const bad = plain(p); bad.party = ['hero', 'yumitsukai', 'gakusha']; assert.deepEqual(plain(A.normalize(bad).party), ['hero']);
  });
  test('仲間：前の版（ガン・リン・ソラ）のセーブは、重装兵・白魔導士・剣士に引きつがれる', () => {
    const old = plain(A.create()); delete old.recruited;
    old.roster = { hero: { xp: 5, hp: 66, mp: 12 }, gan: { xp: 100, hp: 50, mp: 4 }, rin: { xp: 200, hp: 54, mp: 21 }, sora: { xp: 300, hp: 58, mp: 12 } };
    old.party = ['hero', 'gan', 'rin', 'sora'];
    const n = A.normalize(old);
    assert.deepEqual(plain(n.party), ['hero', 'juushouhei', 'shiromadoushi', 'kenshi']);
    assert.equal(n.roster.juushouhei.xp, 100); assert.equal(n.roster.shiromadoushi.xp, 200); assert.equal(n.roster.kenshi.xp, 300);
    assert.deepEqual(plain(n.recruited), ['juushouhei', 'shiromadoushi', 'kenshi']);
  });
  test('仲間：魔法の種類（回復・かばう・軽減・攻撃）と、9人の能力・絵・文言がそろっている', () => {
    const kinds = Object.fromEntries(A.ALLIES.map(id => [id, A.magicKind(id)]));
    assert.equal(kinds.shiromadoushi, 'heal'); assert.equal(kinds.juushouhei, 'guard'); assert.equal(kinds.shisho, 'ward');
    assert.equal(kinds.kuromadoushi, 'attack');
    for (const id of A.ALLIES) {
      assert.ok(B.MEMBERS[id], id); assert.ok(FF.texts.adventure.members[id].name, id);
      for (const s of ['jh', 'el']) assert.ok(require('fs').existsSync(require('path').resolve(__dirname, '../../img/adventure/allies/' + id + '-' + s + '.webp')), id + ' の絵（' + s + '）');
    }
  });
  test('救出：ボスを初めて倒すと、捕らわれていた旅人が仲間になる（2回目以降は何も起きない）', () => {
    const s0 = FF.state.createDefaultState(now);
    assert.ok(!s0.adventure.recruited.includes('senshi'));
    const w = FF.battle.winBattle(s0, 'snowfield', 'sf_boss_wolf', now);
    assert.equal(w.rescued, 'senshi'); assert.ok(w.state.adventure.recruited.includes('senshi'));
    const again = FF.battle.winBattle(w.state, 'snowfield', 'sf_boss_wolf', now);
    assert.equal(again.rescued, null); assert.equal(again.state.adventure.recruited.filter(x => x === 'senshi').length, 1);
    // ふつうの敵では救出されない
    assert.equal(FF.battle.winBattle(s0, 'snowfield', 'sf_enemy_fangs', now).rescued, null);
    const f = FF.battle.winBattle(FF.battle.winBattle(w.state, 'forest', 'fr_enemy_warden', now).state, 'glacier', 'gl_boss_guardian', now);
    assert.ok(['yumitsukai', 'kuromadoushi', 'senshi'].every(id => f.state.adventure.recruited.includes(id)));
    // 仲間になった旅人は、仲間紹介所で編成できる
    const p = A.setParty(f.state.adventure, ['hero', 'senshi']); assert.deepEqual(plain(p.party), ['hero', 'senshi']);
  });
  test('救出：前の版で倒したボスの旅人も、読み込み時に仲間になる', () => {
    let s = FF.state.createDefaultState(now);
    s.exploration = plain(s.exploration); s.exploration.regions = s.exploration.regions || {};
    s = FF.battle.winBattle(s, 'snowfield', 'sf_boss_wolf', now).state;
    s.adventure.recruited = s.adventure.recruited.filter(id => id !== 'senshi');   // 旧版のセーブ（救出なし）
    const back = FF.state.parseSave(FF.state.serialize(s), now + 1);
    assert.ok(back.ok, back.error); assert.ok(back.state.adventure.recruited.includes('senshi'));
  });

  // ---- ランダムエンカウント（判断376） ----
  const walk = (p, cells, r) => { for (const [x, y] of cells) { p = A.move(p, x, y, r); if (p.battle || p.notice) break; } return p; };
  const row6 = [[2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6]];
  test('ランダムエンカウント：見える敵は大獣だけ。乱数がなければ、出ない。安全な歩数のあいだと、場所では、出ない', () => {
    assert.deepStrictEqual(Object.keys(plain(A.ENEMIES)), ['boss']);
    let p = A.create(); p.pos = { x: 1, y: 6 };
    p = walk(p, row6, undefined); assert.equal(p.battle, null);   // 乱数なし
    p = A.create(); p.pos = { x: 1, y: 6 };
    p = walk(p, row6.slice(0, B.ENCOUNTER.SAFE_STEPS), () => 0); assert.equal(p.battle, null); assert.equal(p.steps, B.ENCOUNTER.SAFE_STEPS);   // はじめの数歩
    p = A.create(); p.pos = { x: 5, y: 3 }; p.steps = 99;
    p = A.move(p, 6, 3, () => 0); assert.equal(p.battle, null);   // 焚き火（場所）
  });
  test('ランダムエンカウント：安全な歩数のあとは、確率で現れる。西は野獣、東はオオカミも。出たら歩数は0', () => {
    let p = A.create(); p.pos = { x: 1, y: 6 };
    p = walk(p, row6, () => 0); assert.equal(p.battle.enemy, 'wolf'); assert.equal(p.steps, 0); assert.equal(p.battle.phase, 'commands');
    assert.deepStrictEqual(plain(p.pos), { x: 2 + B.ENCOUNTER.SAFE_STEPS, y: 6 });   // 安全な4歩のあと、5歩め（x=6。東なので、オオカミも）のとき
    let q = A.create(); q.pos = { x: 5, y: 6 }; q.steps = 99; q = A.move(q, 6, 6, () => 0); assert.equal(q.battle.enemy, 'wolf');
    q = A.create(); q.pos = { x: 5, y: 6 }; q.steps = 99; q = A.move(q, 6, 6, (() => { const v = [0, .99]; return () => v.shift(); })()); assert.equal(q.battle.enemy, 'cub');   // 東でも、野獣のことがある
    q = A.create(); q.pos = { x: 1, y: 6 }; q.steps = 99; q = A.move(q, 2, 6, () => 0); assert.equal(q.battle.enemy, 'cub');   // 西は、野獣だけ
    let none = A.create(); none.pos = { x: 1, y: 6 }; none.steps = 99; none = A.move(none, 2, 6, () => 0.99); assert.equal(none.battle, null);   // 確率の外
  });
  test('ランダムエンカウント：歩くほど出やすい（上限あり）。町・焚き火で休むと歩数は0。ザコ敵を倒しても、見える敵は消えない', () => {
    const E = B.ENCOUNTER; let hits = 0;
    for (let steps = E.SAFE_STEPS + 1; steps < 40; steps++) {
      let p = A.create(); p.pos = { x: 2, y: 6 }; p.steps = steps - 1; p = A.move(p, 3, 6, () => Math.min(E.MAX, E.BASE + (steps - E.SAFE_STEPS - 1) * E.GROWTH) - 1e-9);
      assert.ok(p.battle, 'steps ' + steps); hits++;
    }
    let p = A.create(); p.pos = { x: 2, y: 6 }; p.steps = 30; p = A.move(p, 3, 6, () => E.MAX + 1e-6); assert.equal(p.battle, null);   // 上限を超える値では、出ない
    p = A.create(); p.steps = 7; assert.equal(A.rest(p, 'home').steps, 0);
    let w = A.encounter(Object.assign(A.create(), { pos: { x: 4, y: 6 }, steps: 9 }), 'wolf'); assert.equal(w.steps, 0);
    w.battle.hp = 1; w = A.advance(win(w), bank, 4, rng, now); assert.equal(w.battle, null); assert.deepStrictEqual(plain(w.cleared), []);
    assert.equal(A.enemyAt(w, A.ENEMIES.boss), 'boss');
  });
  test('ランダムエンカウント：歩数は、保存・読み込みで残り、へんな値は直る。全員たおれているときは、出ない', () => {
    const p = A.create(); p.steps = 6; assert.equal(A.normalize(plain(p)).steps, 6);
    assert.equal(A.normalize({ steps: -3 }).steps, 0); assert.equal(A.normalize({ steps: 'x' }).steps, 0);
    const dead = A.create(); dead.pos = { x: 2, y: 6 }; dead.steps = 99; dead.party.forEach(id => dead.roster[id].hp = 0);
    assert.equal(A.move(dead, 3, 6, () => 0).battle, null);
  });
};
