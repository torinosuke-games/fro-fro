// 夜の防衛戦（タワーディフェンス。判断443・SPEC_tower.md）：T-2（ロジックのみ）
const { play } = require('../lib/tower-bot');
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const Tw = FF.tower, B = FF.balance.TOWER, T0 = 1790000000000, DAY = 86400000;
  const ALL = ['juushouhei', 'shiromadoushi', 'kenshi', 'senshi', 'kuromadoushi', 'gakusha', 'shisho', 'touzoku', 'yumitsukai'];
  const fresh = (all) => { const s = FF.state.createDefaultState(T0); if (all) s.adventure.recruited = ALL.slice(); return s; };
  const battle = (o = {}, all = true) => Tw.create(fresh(all), Object.assign({ difficulty: 1, seed: 1 }, o));
  // 魔物を、1体だけ出して、ほかを出さない戦い
  function solo(type, lane, x, o = {}) {
    const bt = battle(o); bt.schedule.forEach(s => { s.done = true; });
    const t = B.ENEMIES[type];
    bt.enemies.push({ id: 999, type, lane, x, hp: t.hp, max: t.hp, atk: t.atk, interval: t.interval, speed: t.speed, cd: t.interval, core: t.core, sk: 0, guard: t.guard || 0 });
    return bt;
  };

  test('防衛戦：並べられるのは、仲間になっている人だけ。はじめは3人。主人公は並べない', () => {
    assert.deepStrictEqual(plain(Tw.roster(fresh(false)).sort()), ['juushouhei', 'kenshi', 'shiromadoushi']);
    assert.deepStrictEqual(plain(Tw.roster(fresh(true)).sort()), plain(ALL.slice().sort()));
    assert.ok(!Tw.roster(fresh(true)).includes('hero'));
    const bt = battle({}, false);
    assert.strictEqual(Tw.place(bt, 'senshi', 2, 3).reason, 'roster');
    assert.strictEqual(bt.core.hp, B.CORE_HP);
    assert.strictEqual(bt.light, B.LIGHT.START);
  });
  test('防衛戦：並べるには、灯と、置けるマスが要る。値段は、並べるたびに上がり、下げると、半分戻る', () => {
    const bt = battle();
    assert.strictEqual(Tw.place(bt, 'kenshi', 0, 0).reason, 'cell');       // 中央炉の列
    assert.strictEqual(Tw.place(bt, 'kenshi', 0, 6).reason, 'cell');       // 魔物の通り道
    assert.strictEqual(Tw.place(bt, 'kenshi', 5, 3).reason, 'cell');       // レーンの外
    const c0 = Tw.cost(bt, 'kenshi'); assert.strictEqual(c0, B.UNITS.kenshi.cost);
    const r = Tw.place(bt, 'kenshi', 2, 3); assert.ok(r.ok);
    assert.strictEqual(bt.light, B.LIGHT.START - c0);
    assert.strictEqual(Tw.place(bt, 'kenshi', 2, 3).reason, 'occupied');
    assert.strictEqual(Tw.cost(bt, 'kenshi'), c0 + B.LIGHT.COST_STEP);
    bt.light = 0; assert.strictEqual(Tw.place(bt, 'kenshi', 1, 3).reason, 'light');
    assert.ok(Tw.remove(bt, r.unit.id).ok);
    assert.strictEqual(bt.light, Math.floor(c0 * B.LIGHT.REFUND));
    assert.strictEqual(Tw.cost(bt, 'kenshi'), c0);
    assert.strictEqual(Tw.remove(bt, 12345).ok, false);
  });
  test('防衛戦：問題に正解すると灯が増える（冒険の難しさで量が変わる）。まちがえると、しばらく出せない', () => {
    const bt = battle(); bt.light = 0;
    assert.ok(Tw.canQuiz(bt));
    assert.strictEqual(Tw.answer(bt, true, 'advanced').gained, B.LIGHT.PER_CORRECT.advanced);
    assert.strictEqual(bt.light, B.LIGHT.PER_CORRECT.advanced);
    assert.ok(B.LIGHT.PER_CORRECT.advanced > B.LIGHT.PER_CORRECT.basic);
    assert.strictEqual(Tw.canQuiz(bt), false);   // 正解のあとも、少し待つ（問題を解いているあいだは戦場が止まるので、灯を取りすぎないため）
    Tw.run(bt, B.LIGHT.CORRECT_LOCK + 0.1); assert.ok(Tw.canQuiz(bt));
    const l = bt.light; Tw.answer(bt, false, 'standard');
    assert.strictEqual(bt.light, l);
    Tw.run(bt, B.LIGHT.WRONG_LOCK - 1); assert.strictEqual(Tw.canQuiz(bt), false);
    Tw.run(bt, 2); assert.ok(Tw.canQuiz(bt));
  });
  test('防衛戦：灯は、問題がなくても、ゆっくり増える。学者がいると、もっと増える（3人まで）', () => {
    const bt = battle({}, true); bt.light = 0; bt.trickle = B.LIGHT.TRICKLE;   // 人口の倍率は、別のテスト（判断457）
     bt.schedule = [{ at: 1e6, wave: 1, type: 'cub', lane: 0, done: false }];   // まだ出ていない魔物が、いるあいだは、勝ちにならない
    Tw.step(bt, 1); const base = bt.light; assert.ok(Math.abs(base - B.LIGHT.TRICKLE) < 1e-9);
    bt.light = 1000; Tw.place(bt, 'gakusha', 0, 1); bt.light = 0; Tw.step(bt, 1);
    assert.ok(Math.abs(bt.light - (B.LIGHT.TRICKLE + B.UNITS.gakusha.trickle)) < 1e-9);
    for (let c = 2; c <= 5; c++) { bt.light = 1000; Tw.place(bt, 'gakusha', 0, c); }
    bt.light = 0; Tw.step(bt, 1);
    assert.ok(Math.abs(bt.light - (B.LIGHT.TRICKLE + B.UNITS.gakusha.trickleMax * B.UNITS.gakusha.trickle)) < 1e-9);
  });
  test('防衛戦：魔物は、右から左へ歩く。仲間にぶつかると足を止めて殴り、仲間がいなければ、中央炉にたどりついて熱が減る', () => {
    let bt = solo('cub', 2, 9);
    Tw.step(bt, 1); assert.ok(bt.enemies[0].x < 9 && bt.enemies[0].x > 8);
    const hp0 = bt.core.hp; Tw.run(bt, 40);
    assert.strictEqual(bt.core.hp, hp0 - B.ENEMIES.cub.core);
    assert.strictEqual(bt.enemies.length, 0);
    assert.strictEqual(bt.kills, 0);   // たどりついた魔物は、倒したことにならない
    // 壁にぶつかる
    bt = solo('cub', 2, 6.5); bt.light = 999; const w = Tw.place(bt, 'juushouhei', 2, 4).unit;
    Tw.run(bt, 10);
    assert.ok(bt.enemies[0].x >= 4.5 && bt.enemies[0].x < 5.3, 'x=' + bt.enemies[0].x);   // 壁の手前で止まる
    assert.ok(w.hp < w.max);
    assert.strictEqual(bt.core.hp, B.CORE_HP);
  });
  test('防衛戦：仲間は、自分のレーンの魔物を攻撃して倒す。ほかのレーンは攻撃しない。射程の外には届かない', () => {
    let bt = solo('cub', 2, 5.2); bt.light = 999; Tw.place(bt, 'kenshi', 2, 3);
    Tw.run(bt, 10); assert.strictEqual(bt.enemies.length, 0); assert.strictEqual(bt.kills, 1);
    bt = solo('cub', 1, 5.2); bt.light = 999; Tw.place(bt, 'kenshi', 2, 3);   // ちがうレーン
    Tw.run(bt, 3); assert.strictEqual(bt.enemies[0].hp, B.ENEMIES.cub.hp);
    bt = solo('cub', 2, 8.9); bt.light = 999; Tw.place(bt, 'kenshi', 2, 3);   // 近接は届かない
    Tw.step(bt, 0.1); assert.strictEqual(bt.enemies[0].hp, B.ENEMIES.cub.hp);
    bt = solo('cub', 2, 7.2); bt.light = 999; Tw.place(bt, 'yumitsukai', 2, 2); Tw.step(bt, 1);   // 弓は、遠くまで届く
    assert.ok(bt.enemies[0].hp < B.ENEMIES.cub.hp);
  });
  test('防衛戦：黒魔導士は、まわりの魔物にも当たる。白魔導士は味方を回復する。司書は、ダメージを減らして魔物を遅くする', () => {
    let bt = solo('cub', 2, 4.5); bt.light = 999; bt.enemies.push(Object.assign({}, bt.enemies[0], { id: 1000, lane: 1, x: 4.6 }), Object.assign({}, bt.enemies[0], { id: 1001, lane: 4, x: 4.6 }));
    bt.enemies.forEach(e => { e.hp = e.max = 500; });
    Tw.place(bt, 'kuromadoushi', 2, 2); Tw.run(bt, 3);
    const hps = bt.enemies.map(e => e.hp); assert.ok(hps[0] < 500 && hps[1] < 500 && hps[2] === 500);   // 同じレーンと、となりのレーンに当たる。遠いレーンは無事
    // 回復
    bt = battle(); bt.schedule = [{ at: 1e6, wave: 1, type: 'cub', lane: 0, done: false }]; bt.light = 999;
    const k = Tw.place(bt, 'kenshi', 2, 3).unit; Tw.place(bt, 'shiromadoushi', 2, 2); k.hp = 1;
    Tw.run(bt, 5); assert.ok(k.hp > 1);
    // 司書：受けるダメージが減る
    const dmg = (ward) => { const b2 = solo('cub', 2, 4.4); b2.light = 999; const w = Tw.place(b2, 'juushouhei', 2, 4).unit; if (ward) Tw.place(b2, 'shisho', 2, 5); b2.enemies[0].cd = 0; Tw.step(b2, 0.05); return w.max - w.hp; };
    assert.ok(dmg(true) < dmg(false));
    // 司書：魔物が遅くなる
    const sp = (ward) => { const b2 = solo('cub', 2, 8); b2.light = 999; if (ward) Tw.place(b2, 'shisho', 2, 5); Tw.run(b2, 3); return b2.enemies[0].x; };
    assert.ok(sp(true) > sp(false));
  });
  test('防衛戦：装備した武器・防具、仲間のレベルが、戦場の強さに効く', () => {
    const base = fresh(true), s = JSON.parse(JSON.stringify(base));
    s.equipment = { owned: ['flame_sword'], ownedArmor: ['steel_armor'], equipped: { kenshi: { weapon: 'flame_sword', armor: 'steel_armor' }, hero: { weapon: null, armor: null } } };
    const a = Tw.unitStats(base, 'kenshi'), b = Tw.unitStats(s, 'kenshi');
    assert.ok(b.atk > a.atk); assert.ok(b.hp > a.hp);
    assert.strictEqual(b.hp - a.hp, FF.balance.ARMORS.steel_armor.defense * B.ARMOR_HP);
    const l = JSON.parse(JSON.stringify(base)); l.adventure.roster.kenshi.xp = 24 * 36;   // レベル 7 くらい
    const c = Tw.unitStats(l, 'kenshi'); assert.ok(c.hp > a.hp && c.atk >= a.atk);
    // 壁は、HP が、ほかより大きい。学者・司書は、攻撃しない
    assert.ok(Tw.unitStats(base, 'juushouhei').hp > Tw.unitStats(base, 'kenshi').hp * 2);
    assert.strictEqual(Tw.unitStats(base, 'gakusha').atk, 0);
    assert.strictEqual(Tw.unitStats(base, 'shisho').atk, 0);
  });
  test('防衛戦：波は5つ。同じ種なら同じ戦い。最後の波に、ボス。難しさで、数・強さが増える', () => {
    const a = battle({ seed: 7 }), b = battle({ seed: 7 }), c = battle({ seed: 8 });
    assert.deepStrictEqual(plain(a.schedule), plain(b.schedule));
    assert.notDeepStrictEqual(plain(a.schedule.map(s => s.lane)), plain(c.schedule.map(s => s.lane)));
    assert.deepStrictEqual([...new Set(a.schedule.map(s => s.wave))], [1, 2, 3, 4, 5]);
    assert.strictEqual(a.schedule.filter(s => s.type === 'boss').length, 1);
    assert.ok(a.schedule.filter(s => s.type === 'boss').every(s => s.wave === 5));
    const n = (d) => battle({ difficulty: d }).schedule.length;
    for (let d = 2; d <= 5; d++) assert.ok(n(d) > n(d - 1), 'd' + d);
    assert.strictEqual(battle({ difficulty: 4 }).schedule.filter(s => s.type === 'boss').length, 2);
    // 魔物の強さ（HP）
    const hpOf = (d) => { const bt = battle({ difficulty: d }); Tw.run(bt, B.WAVE_START[0] + 0.1); return bt.enemies[0].max; };
    for (let d = 2; d <= 5; d++) assert.ok(hpOf(d) > hpOf(d - 1));
  });
  test('防衛戦：なにも並べないと、どの難しさでも、負ける（中央炉の熱が0）。全部しのげば、勝ち', () => {
    for (let d = 1; d <= 5; d++) { const bt = battle({ difficulty: d }); Tw.run(bt, B.MAX_TIME); assert.strictEqual(bt.result, 'lose', 'd' + d); assert.strictEqual(bt.core.hp, 0); }
    const win = play(FF, fresh(true), { difficulty: 1, seed: 3, acc: 1 });
    assert.strictEqual(win.result, 'win'); assert.ok(win.core.hp > 0); assert.strictEqual(win.wave, 5);
    // 終わったあとは、進まない・並べられない
    const t = win.t; Tw.step(win, 1); assert.strictEqual(win.t, t);
    assert.strictEqual(Tw.place(win, 'kenshi', 0, 1).reason, 'over');
    assert.strictEqual(Tw.canQuiz(win), false);
  });
  test('防衛戦：目安の勝ちやすさ。難しさ1は、はじめの3人でも、たいてい勝てる。難しさが上がると、勝ちにくくなる', () => {
    const rate = (all, d, acc) => { let w = 0; const N = 10; for (let seed = 1; seed <= N; seed++) if (play(FF, fresh(all), { difficulty: d, seed, acc }).result === 'win') w++; return w / N; };
    assert.ok(rate(false, 1, 0.85) >= 0.8);
    assert.ok(rate(true, 1, 1) >= rate(true, 3, 1));
    assert.ok(rate(true, 3, 1) >= rate(true, 5, 1));
    assert.ok(rate(true, 5, 1) < 0.6);
    assert.ok(rate(true, 1, 1) > rate(true, 1, 0.3));   // 正解が多いほうが、勝ちやすい
  });

  // ---- 記録と報酬 ----
  const won = (s, d, mode, now = T0) => { const bt = battle({ difficulty: d, mode }); bt.result = 'win'; bt.wave = 5; return Tw.finish(s, bt, now); };
  test('防衛戦の記録：新しいゲームでは空。今日の分を作ると日付が入る。同じ日は同じ state', () => {
    const s = fresh(true);
    assert.deepStrictEqual(plain(s.tower), { version: 1, day: null, rewards: 0, cleared: {}, wins: 0, best: {} });
    const t = Tw.today(s, T0); assert.strictEqual(t.tower.day, FF.daily.dayKey(T0)); assert.strictEqual(Tw.today(t, T0 + 1000), t);
    assert.strictEqual(Tw.raidsLeft(s, T0), B.RAIDS_PER_DAY);
    assert.strictEqual(Tw.raidDifficulty(s), 1);
    const f = JSON.parse(JSON.stringify(s)); f.buildings.furnace.level = 4; assert.strictEqual(Tw.raidDifficulty(f), 1, '中央炉のレベルとは、つながらない（判断461）');
  });
  test('防衛戦の報酬：今夜の襲撃に勝つと、ゴールド・資材・回復薬（難しさ3から）。熱量は入らない。1日3回まで', () => {
    let s = fresh(true); const g0 = FF.shop.gold(s), pts = s.studyPoints;
    const r1 = won(s, 1, 'raid'); const rw = r1.reward;
    assert.strictEqual(rw.gold, B.REWARD.GOLD_PER_LEVEL * B.REWARD.FIRST_CLEAR);   // はじめて勝つと、2倍
    assert.strictEqual(FF.shop.gold(r1.state) - g0, rw.gold);
    assert.strictEqual(Object.keys(rw.res).length, B.REWARD.RES_KINDS);
    Object.keys(rw.res).forEach(k => assert.strictEqual(r1.state.resources[k] - s.resources[k], rw.res[k]));
    assert.strictEqual(rw.potions, 0);
    assert.strictEqual(r1.state.studyPoints, pts);
    assert.strictEqual(r1.state.tower.rewards, 1); assert.ok(r1.state.tower.cleared[1]); assert.strictEqual(r1.state.tower.wins, 1);
    const r2 = won(r1.state, 1, 'raid'); assert.strictEqual(r2.reward.gold, B.REWARD.GOLD_PER_LEVEL);   // 2回目からは、ふつう
    const r3 = won(r2.state, 1, 'raid'); assert.ok(r3.reward);
    assert.strictEqual(Tw.raidsLeft(r3.state, T0), 0);
    const r4 = won(r3.state, 1, 'raid'); assert.strictEqual(r4.reward, null);   // 4回目は、報酬なし（勝った記録だけ）
    assert.strictEqual(r4.state.tower.wins, 4);
    // 日がかわると、また3回
    assert.strictEqual(Tw.raidsLeft(r4.state, T0 + DAY), B.RAIDS_PER_DAY);
    assert.ok(won(r4.state, 1, 'raid', T0 + DAY).reward);
    assert.ok(won(s, 3, 'raid').reward.potions >= 1);
    assert.ok(won(s, 3, 'raid').reward.gold > won(s, 2, 'raid').reward.gold);
  });
  test('防衛戦の報酬：練習・負けには、報酬がない。練習で勝っても、記録（はじめて勝った難しさ）は残る', () => {
    const s = fresh(true);
    const p = won(s, 2, 'practice'); assert.strictEqual(p.reward, null); assert.strictEqual(FF.shop.gold(p.state), FF.shop.gold(s));
    assert.ok(p.state.tower.cleared[2]); assert.strictEqual(p.state.tower.rewards, 0);
    const lose = battle({ difficulty: 2, mode: 'raid' }); lose.result = 'lose'; lose.wave = 3;
    const l = Tw.finish(s, lose, T0); assert.strictEqual(l.reward, null); assert.strictEqual(l.state.tower.rewards, 0); assert.strictEqual(l.state.tower.best[2], 2);
    assert.strictEqual(Tw.finish(s, battle(), T0).reward, null);   // 終わっていない戦いは、何も変えない
    assert.strictEqual(Tw.finish(s, battle(), T0).state, s);
  });
  test('防衛戦：挑める難しさは、勝った難しさの次まで（勝って解放）。20段階（10まで＋やり込みの11〜20）。襲撃も練習も同じ。中央炉のレベルとは、つながらない（判断461・463）', () => {
    let s = fresh(true); assert.strictEqual(Tw.unlockedMax(s), 1); assert.strictEqual(Tw.practiceMax(s), 1);
    assert.ok(Tw.isUnlocked(s, 1) && !Tw.isUnlocked(s, 2));
    s = won(s, 1, 'practice').state; assert.strictEqual(Tw.unlockedMax(s), 2);
    s = won(s, 2, 'raid').state; s = won(s, 3, 'practice').state; assert.strictEqual(Tw.unlockedMax(s), 4);   // 襲撃で勝っても、解放される
    s = won(s, 5, 'practice').state; assert.strictEqual(Tw.unlockedMax(s), 6);
    for (let d = 6; d <= 20; d++) s = won(s, d, 'practice').state;
    assert.strictEqual(Tw.unlockedMax(s), 20); assert.strictEqual(B.MAX_LEVEL, 20);
    const f = fresh(true); f.buildings.furnace.level = 5; assert.strictEqual(Tw.unlockedMax(f), 1);
    assert.strictEqual(B.LANES_BY_LEVEL.length, 20); assert.ok(B.LANES_BY_LEVEL.slice(7).every(n => n === 7));
  });
  test('難しさ6〜10（判断461）：数・体力・攻撃・速さが、段々に増える（5までより、ゆるやか）。ボスもふえる。どの難しさでも、報酬が出る（1日3回まで）', () => {
    const cnt = d => battle({ difficulty: d }).schedule.length;
    for (let d = 2; d <= 10; d++) assert.ok(cnt(d) >= cnt(d - 1), 'count d' + d);
    assert.ok(cnt(10) > cnt(5) * 1.2);
    const stat = (d, k) => { const b = battle({ difficulty: d }); b.schedule.forEach(x => { x.done = true; }); const t = B.ENEMIES.wolf; b.schedule.push({ at: 0, wave: 1, type: 'wolf', lane: 0, done: false }); Tw.step(b, B.TICK); return b.enemies[0][k]; };
    for (let d = 2; d <= 10; d++) assert.ok(stat(d, 'max') > stat(d - 1, 'max') && stat(d, 'atk') > stat(d - 1, 'atk') && stat(d, 'speed') > stat(d - 1, 'speed'), 'stat d' + d);
    assert.ok(stat(10, 'max') < stat(1, 'max') * 3, '増えすぎない');
    const bosses = d => battle({ difficulty: d }).schedule.filter(x => x.type === 'boss').length;
    assert.ok(bosses(10) > bosses(1));
    let s = fresh(true); s.tower.cleared = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true };
    const r = won(s, 10, 'raid'); assert.ok(r.reward && r.reward.gold === 10 * B.REWARD.GOLD_PER_LEVEL * B.REWARD.FIRST_CLEAR);   // どの難しさでも、数える
    assert.ok(r.state.tower.cleared[10]);
  });
  test('難しさ11〜20（判断463）：10までより、急に増える（体力・攻撃・数）。やり込み用', () => {
    const stat = (d, k) => { const b = battle({ difficulty: d }); b.schedule.forEach(x => { x.done = true; }); b.schedule.push({ at: 0, wave: 1, type: 'wolf', lane: 0, done: false }); Tw.step(b, B.TICK); return b.enemies[0][k]; };
    for (let d = 11; d <= 20; d++) assert.ok(stat(d, 'max') > stat(d - 1, 'max') && stat(d, 'atk') > stat(d - 1, 'atk'), 'stat d' + d);
    assert.ok(stat(11, 'max') - stat(10, 'max') > (stat(10, 'max') - stat(9, 'max')) * 2, '10までより、急');
    const cnt = d => battle({ difficulty: d }).schedule.length;
    assert.ok(cnt(20) > cnt(10) * 1.5);
    let s = fresh(true); s.tower.cleared = {}; for (let d = 1; d <= 19; d++) s.tower.cleared[d] = true;
    const r = won(s, 20, 'raid'); assert.ok(r.reward && r.reward.gold === 20 * B.REWARD.GOLD_PER_LEVEL * B.REWARD.FIRST_CLEAR);
  });
  test('町の力（判断464）：中央炉が Lv6 以上で、熱の最大・灯の速さ・仲間の HP が増える。Lv5 までは増えない', () => {
    const at = (lv) => { const st = fresh(true); st.buildings.furnace.level = lv; return st; };
    assert.deepStrictEqual(plain(Tw.power(at(5))), { steps: 0, core: 0, trickle: 1, hp: 1 });
    const p10 = Tw.power(at(10)), P = B.POWER;
    assert.strictEqual(p10.steps, 5); assert.strictEqual(p10.core, 5 * P.CORE);
    assert.ok(Math.abs(p10.trickle - (1 + 5 * P.TRICKLE)) < 1e-9 && Math.abs(p10.hp - (1 + 5 * P.HP)) < 1e-9);
    const b5 = Tw.create(at(5), { difficulty: 1, seed: 1 }), b10 = Tw.create(at(10), { difficulty: 1, seed: 1 });
    assert.strictEqual(b10.core.max, b5.core.max + p10.core); assert.strictEqual(b10.core.hp, b10.core.max);
    assert.ok(b10.trickle > b5.trickle * 1.5); assert.ok(b10.defs.kenshi.hp > b5.defs.kenshi.hp * 1.4);
  });
  test('防衛戦のセーブ：保存して読み込んでも同じ。形のおかしい記録は直す', () => {
    let s = won(fresh(true), 3, 'raid').state;
    const text = FF.state.serialize(s), back = FF.state.migrate(JSON.parse(text), T0);
    assert.ok(back.ok); assert.deepStrictEqual(plain(back.state.tower), plain(s.tower));
    const bad = JSON.parse(text); bad.tower = { day: 'x', rewards: 999, cleared: { 1: true, 9: true, 21: true, x: true }, wins: -5, best: { 1: 99, 2: 'a' } };
    const f = Tw.normalize(bad);
    assert.deepStrictEqual(plain(f.tower), { version: 1, day: null, rewards: B.RAIDS_PER_DAY, cleared: { 1: true, 9: true }, wins: 0, best: { 1: B.WAVES.length } });
    assert.deepStrictEqual(plain(Tw.normalize({ tower: 'x' }).tower), plain(Tw.createState()));
  });
  test('氷の精霊（判断455）：射程の中の最前列の仲間を凍らせる。凍っているあいだは、攻撃も回復もしない。解けると、また動く', () => {
    const f = B.ENEMIES.spirit.freeze;
    let bt = solo('spirit', 2, 3.2); bt.light = 999;
    Tw.place(bt, 'kenshi', 2, 3); Tw.place(bt, 'gakusha', 2, 2);   // 前の列（3）と、後ろの列（2。攻撃しない仲間）
    bt.enemies[0].sk = 0; bt.enemies[0].speed = 0; bt.enemies[0].atk = 0;
    Tw.step(bt, B.TICK);
    const front = bt.units.find(u => u.col === 3), back = bt.units.find(u => u.col === 2);
    assert.ok(front.frozen > 0 && !(back.frozen > 0));   // 最前列だけ
    const e = bt.enemies[0], hp0 = e.hp; front.cd = 0;
    Tw.run(bt, f.dur - 0.5); assert.strictEqual(e.hp, hp0, '凍っている仲間は、攻撃しない');
    Tw.run(bt, 1);
    assert.ok(!(front.frozen > 0));
    // 凍る間隔（cd）のあいだは、また凍らない。解けたあと、時間がたつと、また凍らせる
    assert.ok(bt.enemies.length === 0 || bt.enemies[0].hp <= hp0);
    // 白魔導士・司書・学者も、凍ると、はたらかない
    let b2 = solo('spirit', 2, 6); b2.light = 999; Tw.place(b2, 'gakusha', 2, 1);
    const r0 = (() => { const x = b2.light; Tw.step(b2, 1); return b2.light - x; })();
    b2.units[0].frozen = 5; const r1 = (() => { const x = b2.light; Tw.step(b2, 1); return b2.light - x; })();
    assert.ok(r0 > r1);
  });
  test('雪の巨人（判断455）：壁役の仲間には、倍のダメージ。ほかの仲間には、ふつう', () => {
    const wallDmg = (member) => {
      const bt = solo('giant', 2, 3.4); bt.light = 999; Tw.place(bt, member, 2, 3);
      const u = bt.units[0], g = bt.enemies[0]; g.cd = 0; u.hp = u.max = 10000;
      Tw.step(bt, B.TICK); return 10000 - u.hp;
    };
    assert.ok(wallDmg('juushouhei') > wallDmg('kenshi') * (B.ENEMIES.giant.wall - 0.01));
  });
  test('新しい魔物の出かた（判断455）：難しさ1にはいない。精霊は難しさ2から、巨人は難しさ3から。難しさで、数が増える', () => {
    const count = (d, k) => battle({ difficulty: d }).schedule.filter(x => x.type === k).length;
    assert.strictEqual(count(1, 'spirit') + count(1, 'giant'), 0);
    assert.ok(count(2, 'spirit') > 0 && count(2, 'giant') === 0);
    assert.ok(count(3, 'giant') > 0);
    assert.ok(count(5, 'spirit') >= count(2, 'spirit'));
    for (const k of ['spirit', 'giant']) assert.ok(B.ENEMIES[k] && B.ENEMIES[k].core > 0);
  });
  test('難しさ6以降の魔物（判断462）：出る難しさ・鳥は後ろの仲間を狙う・盾兵は1体への攻撃をへらす・魔女は遠くから・氷竜のブレスは道の全員', () => {
    const count = (d, k) => battle({ difficulty: d }).schedule.filter(x => x.type === k).length;
    for (const [k, from] of [['bird', 6], ['shield', 7], ['witch', 8], ['dragon', 9]]) {
      assert.strictEqual(count(from - 1, k), 0, k); assert.ok(count(from, k) > 0, k); assert.ok(B.ENEMIES[k].core > 0);
    }
    // 吹雪の鳥：前の仲間を飛びこえて、いちばん後ろの仲間を殴る
    let bt = solo('bird', 2, 4.2); bt.light = 999; Tw.place(bt, 'kenshi', 2, 4); Tw.place(bt, 'shiromadoushi', 2, 1);
    for (let i = 0; i < 30 * 20 && bt.units.every(u => u.hp === u.max); i++) Tw.step(bt, B.TICK);
    const front = bt.units.find(u => u.member === 'kenshi'), rear = bt.units.find(u => u.member === 'shiromadoushi');
    assert.ok(rear.hp < rear.max && front.hp === front.max, 'rear hit');
    // 氷の盾兵：1体を狙う攻撃は guard 倍。範囲の魔法は、へらない
    bt = solo('shield', 2, 2.3); bt.light = 999; Tw.place(bt, 'kenshi', 2, 1); const e = bt.enemies[0], u = bt.units[0];
    const h0 = e.hp; u.cd = 0; Tw.step(bt, B.TICK); const dmg1 = h0 - e.hp;
    assert.ok(dmg1 > 0 && dmg1 < bt.defs.kenshi.atk * 0.6, 'guard'); assert.ok(bt.fxLog.some(f => f.kind === 'block'));
    // 霜の魔女：遠くから、仲間を撃つ（近づかなくても、ダメージ）
    bt = solo('witch', 2, 5.5); bt.light = 999; Tw.place(bt, 'juushouhei', 2, 3);
    const w = bt.enemies[0]; w.cd = 0; Tw.step(bt, B.TICK);
    assert.ok(bt.units[0].hp < bt.units[0].max && w.x > 5, 'ranged'); assert.ok(bt.fxLog.some(f => f.kind === 'bolt'));
    // 氷竜：ブレスで、道の仲間みんなに、ダメージ
    bt = solo('dragon', 2, 8); bt.light = 999; Tw.place(bt, 'juushouhei', 2, 1); Tw.place(bt, 'kenshi', 2, 4);
    bt.enemies[0].sk = 0; Tw.step(bt, B.TICK);
    assert.ok(bt.units.every(x => x.hp < x.max), 'breath all'); assert.ok(bt.fxLog.some(f => f.kind === 'breath'));
  });
  test('住民の応援（判断456）：信頼が「恩人」の町の人だけが、戦いに加わる。はたらきは人ごとに1つ', () => {
    const withTrust = (t, all) => { const st = fresh(all); st.quests = FF.quests.create(); st.quests.trust = t; return st; };
    assert.deepStrictEqual(plain(Tw.cheers(fresh(true))), []);
    assert.deepStrictEqual(plain(Tw.cheers(withTrust({ baker: 14, hunter: 15 }))), ['hunter']);   // 14 は親友まで。15 から恩人
    const all = withTrust({ baker: 15, woodcutter: 15, hunter: 15, nurse: 15, child: 15, elder: 15 });
    assert.strictEqual(Tw.cheers(all).length, 6);
    const base = Tw.create(fresh(true), { difficulty: 1, seed: 1 }), bt = Tw.create(all, { difficulty: 1, seed: 1 });
    assert.strictEqual(bt.light, base.light + B.CHEER.baker.light);                                     // トム：はじめの灯
    assert.strictEqual(bt.core.max, base.core.max + B.CHEER.elder.core);                                // バルト：炉の熱
    assert.strictEqual(bt.core.hp, base.core.hp + B.CHEER.elder.core);
    assert.strictEqual(bt.defs.kenshi.hp, Math.round(base.defs.kenshi.hp * (1 + B.CHEER.woodcutter.hp))); // ガイ：仲間の HP
    const g0 = Tw.answer(Tw.create(fresh(true), { difficulty: 1, seed: 1 }), true, 'basic').gained;
    assert.strictEqual(Tw.answer(bt, true, 'basic').gained, g0 + B.CHEER.child.light);                 // リコ：正解の灯
    assert.strictEqual(Tw.answer(bt, false, 'basic').gained, 0);
  });
  test('住民の応援（判断456）：猟師の矢は、各道のいちばん炉に近い魔物を撃つ。看護の手当ては、仲間みんなの HP を戻す。記録（cheerLog）が残る', () => {
    const st = fresh(true); st.quests = FF.quests.create(); st.quests.trust = { hunter: 15, nurse: 15 };
    const bt = Tw.create(st, { difficulty: 1, seed: 1 }); bt.schedule.forEach(s => { s.done = true; }); bt.schedule.push({ at: 1e6, wave: 5, type: 'cub', lane: 0, done: false });
    const mk = (id, lane, x) => ({ id, type: 'cub', lane, x, hp: 100, max: 100, atk: 0, interval: 9, speed: 0, cd: 9, core: 1 });
    bt.enemies.push(mk(901, 1, 7), mk(902, 1, 4), mk(903, 3, 5));
    bt.light = 999; Tw.place(bt, 'juushouhei', 4, 3); bt.units[0].hp = bt.units[0].max * 0.4;
    Tw.run(bt, B.CHEER.hunter.every + 0.2);
    assert.strictEqual(bt.enemies.find(e => e.id === 902).hp, 100 - B.CHEER.hunter.damage);   // 前の魔物だけ
    assert.strictEqual(bt.enemies.find(e => e.id === 901).hp, 100);
    assert.strictEqual(bt.enemies.find(e => e.id === 903).hp, 100 - B.CHEER.hunter.damage);
    Tw.run(bt, B.CHEER.nurse.every - B.CHEER.hunter.every + 0.3);
    assert.ok(bt.units[0].hp >= bt.units[0].max * 0.4 + bt.units[0].max * B.CHEER.nurse.heal - 1);
    assert.deepStrictEqual(plain(bt.cheerLog.map(x => x.who)), ['hunter', 'nurse']);
  });
  test('人口で灯（判断457）：人口がふえると、灯が自然にふえる速さが上がる。はじめの人口なら変わらない。上限がある', () => {
    const st = fresh(false), L = B.LIGHT;
    assert.strictEqual(Tw.popMult(st), 1);
    const bt0 = Tw.create(st, { difficulty: 1, seed: 1 }); assert.strictEqual(bt0.trickle, L.TRICKLE);
    const big = fresh(true); big.buildings.housing.level = 5; big.adventure.recruited = ALL.slice();   // 住宅 Lv5（+20人）・救出した旅人 6人（+60人）
    const pop = FF.buildings.population(big);
    assert.ok(pop.total > 10 + 20);
    const m = Tw.popMult(big); assert.ok(m > 1 && m <= L.POP_MAX);
    assert.strictEqual(m, Math.min(L.POP_MAX, 1 + L.POP_BONUS * (pop.total - pop.base)));
    const mid = fresh(false); mid.buildings.housing.level = 3;   // +10人
    assert.ok(Math.abs(Tw.popMult(mid) - (1 + L.POP_BONUS * 10)) < 1e-9);
    // 実際に、灯が速くふえる（学者などの、ほかの増え方がない戦い）
    const hi = fresh(false); hi.buildings.housing.level = 5;   // +20人
    const a = Tw.create(fresh(false), { difficulty: 1, seed: 1 }), b = Tw.create(hi, { difficulty: 1, seed: 1 });
    a.schedule.forEach(x => { x.done = true; }); b.schedule.forEach(x => { x.done = true; });
    a.schedule.push({ at: 1e6, wave: 5, type: 'cub', lane: 0, done: false }); b.schedule.push({ at: 1e6, wave: 5, type: 'cub', lane: 0, done: false });
    const a0 = a.light, b0 = b.light; Tw.run(a, 20); Tw.run(b, 20);
    assert.ok((b.light - b0) > (a.light - a0) * 1.15);
  });
  test('レーンの数（試作。判断458）：練習で、5本か6本を選べる。襲撃では、難しさで決まる（難しさ4・5は6本）。6本だと、魔物の数も、レーンに合わせてふえる', () => {
    const st = fresh(true);
    const b5 = Tw.create(st, { difficulty: 3, seed: 1 }), b6 = Tw.create(st, { difficulty: 3, seed: 1, lanes: 6 }), b9 = Tw.create(st, { difficulty: 3, seed: 1, lanes: 9 });
    assert.strictEqual(b5.lanes, 5); assert.strictEqual(b6.lanes, 6); assert.strictEqual(b9.lanes, 5, '選べない数は、ふつうの数');
    assert.strictEqual(Tw.create(st, { difficulty: 3, seed: 1, lanes: 6, mode: 'raid' }).lanes, 5, '襲撃は、難しさで決まる');
    assert.ok(b6.schedule.length > b5.schedule.length * 1.1);
    assert.ok(b6.schedule.some(x => x.lane === 5) && !b5.schedule.some(x => x.lane === 5));
    b6.light = 999; assert.ok(Tw.place(b6, 'kenshi', 5, 3).ok); assert.strictEqual(Tw.place(b6, 'kenshi', 6, 3).reason, 'cell');
    b5.light = 999; assert.strictEqual(Tw.place(b5, 'kenshi', 5, 3).reason, 'cell');
    assert.deepStrictEqual([1, 2, 3, 4, 5].map(d => Tw.lanesOf(d)), [5, 5, 5, 6, 6]);   // 難しさ4・5は6本（判断459）
    assert.strictEqual(Tw.create(st, { difficulty: 4, seed: 1, mode: 'raid' }).lanes, 6);
    assert.strictEqual(Tw.create(st, { difficulty: 4, seed: 1, lanes: 5 }).lanes, 5, '練習なら、5本にも変えられる');
  });
};
