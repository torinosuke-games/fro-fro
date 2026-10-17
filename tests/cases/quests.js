// 住民の依頼クエスト（酒場。判断434・SPEC_quest.md）：Q-1（ロジックのみ）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const Q = FF.quests, B = FF.balance, T0 = 1790000000000, DAY = 86400000;
  const fresh = () => FF.state.createDefaultState(T0);
  const withAdv = (s) => { const t = JSON.parse(JSON.stringify(s)); t.adventure.started = true; return t; };
  const board = (s, now = T0) => Q.today(s, now).quests.board;
  const hunter = (s) => withAdv(s);

  test('依頼：新しいゲームでは依頼は空。今日の分を作ると、4件（納品・納品・学習・防衛。冒険を始めていないので、討伐は納品に）', () => {
    const s = fresh();
    assert.deepStrictEqual(plain(s.quests), { version: 1, day: null, board: [], history: { completed: 0 }, trust: {}, specials: [], specialDone: {} });
    const b = board(s);
    assert.strictEqual(b.length, B.QUESTS.PER_DAY);
    assert.deepStrictEqual(plain(b.map(x => x.kind)), ['deliver', 'deliver', 'study', 'defend']);
    assert.notStrictEqual(b[0].target, b[1].target);   // 納品の資材は、重ならない
  });
  test('依頼：冒険を始めていると、討伐が出る（納品・討伐・学習・防衛）。オオカミは中央炉 Lv2 から', () => {
    const s = hunter(fresh());
    const k = board(s).map(x => x.kind);
    assert.deepStrictEqual(plain(k), ['deliver', 'hunt', 'study', 'defend']);
    for (let d = 0; d < 20; d++) assert.strictEqual(board(s, T0 + d * DAY)[1].target, 'cub');   // 中央炉 Lv1 は、野獣だけ
    const s2 = JSON.parse(JSON.stringify(s)); s2.buildings.furnace.level = 3;
    const seen = new Set(); for (let d = 0; d < 40; d++) seen.add(board(s2, T0 + d * DAY)[1].target);
    assert.ok(seen.has('wolf') && seen.has('cub'));
  });
  test('依頼：同じ日なら同じ依頼。日がかわる（朝4時）と変わり、前の日と同じ納品の資材にはならない', () => {
    const s = fresh();
    const a = board(s), a2 = Q.today(s, T0 + 60000).quests.board;
    assert.deepStrictEqual(plain(a2), plain(a));
    for (let d = 1; d <= 30; d++) {
      const prev = board(s, T0 + (d - 1) * DAY)[0].target, cur = board(s, T0 + d * DAY)[0].target;
      assert.notStrictEqual(cur, prev, 'day ' + d);
    }
    assert.notStrictEqual(FF.daily.dayKey(T0 + DAY), FF.daily.dayKey(T0));
  });
  test('依頼：数量は中央炉のレベルで増える。報酬は、ゴールド・（納品は）お礼の資材が渡した分より多い', () => {
    const lv = (n) => { const s = JSON.parse(JSON.stringify(fresh())); s.buildings.furnace.level = n; return board(s); };
    assert.ok(lv(5)[0].need > lv(1)[0].need);
    assert.ok(lv(5)[2].need > lv(1)[2].need);
    const d = lv(1)[0];
    assert.strictEqual(d.reward.gold, d.need * B.QUESTS.DELIVER.GOLD_PER_UNIT);
    assert.ok(d.reward.res[d.target] > d.need);
    assert.ok(lv(1)[2].reward.gold > 0);
  });
  test('依頼：受けないと渡せない。足りなければ渡せない。渡すと資材が減って、達成になる', () => {
    let s = Q.today(fresh(), T0); const d = s.quests.board[0];
    assert.strictEqual(Q.canDeliver(s, d.id).reason, 'notAccepted');
    s = Q.accept(s, d.id).state;
    assert.strictEqual(Q.accept(s, d.id).reason, 'already');
    s.resources[d.target] = d.need - 1;
    assert.strictEqual(Q.canDeliver(s, d.id).reason, 'short');
    assert.strictEqual(Q.deliver(s, d.id).ok, false);
    s.resources[d.target] = d.need + 5;
    const r = Q.deliver(s, d.id);
    assert.ok(r.ok);
    assert.strictEqual(r.state.resources[d.target], 5);
    assert.ok(Q.done(Q.find(r.state, d.id)));
    assert.strictEqual(Q.canDeliver(r.state, d.id).reason, 'done');
    assert.strictEqual(s.resources[d.target], d.need + 5);   // もとの state は変わらない
  });
  test('依頼：学習は、受けたあとの正解だけ数える。教科を決める依頼は、その教科だけ。上限で止まる', () => {
    let s = Q.today(fresh(), T0); const st = s.quests.board.find(x => x.kind === 'study');
    const other = FF.defs.SUBJECTS.map(x => x.id).find(x => x !== st.target);
    assert.strictEqual(Q.onCorrect(s, st.target === 'any' ? 'math' : st.target), s);   // 受ける前は進まない
    s = Q.accept(s, st.id).state;
    if (st.target !== 'any') assert.strictEqual(Q.onCorrect(s, other), s);
    const subj = st.target === 'any' ? 'math' : st.target;
    for (let i = 0; i < st.need + 3; i++) s = Q.onCorrect(s, subj);
    const q = Q.find(s, st.id);
    assert.strictEqual(q.progress, st.need);
    assert.ok(Q.done(q));
  });
  test('依頼：討伐は、受けたあとに、その敵に勝った数だけ。ほかの敵では進まない', () => {
    let s = hunter(fresh()); s = Q.today(s, T0); const h = s.quests.board.find(x => x.kind === 'hunt');
    assert.strictEqual(Q.onVictory(s, 'cub'), s);   // 受ける前
    s = Q.accept(s, h.id).state;
    assert.strictEqual(Q.onVictory(s, 'boss'), s);
    for (let i = 0; i < h.need; i++) s = Q.onVictory(s, 'cub');
    assert.ok(Q.done(Q.find(s, h.id)));
  });
  test('依頼：達成してから報告すると、報酬をもらう（1回だけ）。ゴールド・お礼の資材・回復薬', () => {
    let s = Q.today(fresh(), T0); const d = s.quests.board[0];
    assert.strictEqual(Q.claim(s, d.id).reason, 'notDone');
    s = Q.accept(s, d.id).state; s.resources[d.target] = d.need;
    s = Q.deliver(s, d.id).state;
    const g0 = FF.shop.gold(s), p0 = s.adventure.potions, r0 = s.resources[d.target];
    const r = Q.claim(s, d.id);
    assert.ok(r.ok);
    assert.strictEqual(FF.shop.gold(r.state), g0 + d.reward.gold);
    assert.strictEqual(r.state.resources[d.target], r0 + d.reward.res[d.target]);
    assert.strictEqual(r.state.adventure.potions, p0 + d.reward.potions);
    assert.strictEqual(r.state.quests.history.completed, 1);
    assert.strictEqual(Q.claim(r.state, d.id).reason, 'claimed');
    assert.strictEqual(Q.remaining(r.state), 3);
    assert.strictEqual(r.state.studyPoints, s.studyPoints);   // 熱量（勉強量ポイント）は、報酬にならない
  });
  test('依頼：日がかわると、新しい依頼になる。終えた数の記録は、残る', () => {
    let s = Q.today(fresh(), T0); const d = s.quests.board[0];
    s = Q.accept(s, d.id).state; s.resources[d.target] = d.need; s = Q.deliver(s, d.id).state; s = Q.claim(s, d.id).state;
    const n = Q.today(s, T0 + DAY);
    assert.notStrictEqual(n.quests.day, s.quests.day);
    assert.strictEqual(n.quests.history.completed, 1);
    assert.ok(n.quests.board.every(x => !x.accepted && x.progress === 0 && !x.claimed));
    assert.strictEqual(Q.today(s, T0 + 1000), s);   // 同じ日は、そのまま
  });
  test('依頼：救出した旅人も、依頼を出す。はじめの3人の仲間は出さない', () => {
    const s = fresh();
    assert.deepStrictEqual(plain(Q.residents(s)), plain(B.QUESTS.RESIDENTS));
    const t = JSON.parse(JSON.stringify(s)); t.adventure.recruited = t.adventure.recruited.concat(['senshi']);
    assert.ok(Q.residents(t).includes('senshi'));
    assert.ok(!Q.residents(t).includes('kenshi'));
  });
  test('依頼：セーブの整合。形のおかしい依頼は捨て、数値は範囲内に。保存して読み込んでも同じ', () => {
    let s = Q.today(hunter(fresh()), T0);
    s = Q.accept(s, s.quests.board[0].id).state;
    const text = FF.state.serialize(s), back = FF.state.migrate(JSON.parse(text), T0);
    assert.ok(back.ok);
    assert.deepStrictEqual(plain(back.state.quests), plain(s.quests));
    const bad = JSON.parse(text);
    bad.quests.board.push({ id: 'x', kind: 'nope', target: 'wood', need: 3 }, { id: 'y', kind: 'deliver', target: 'gold', need: 3 }, null, 5);
    bad.quests.board[0].progress = 999999; bad.quests.board[0].need = 3; bad.quests.board[0].reward.gold = 99999999;
    const fixed = Q.normalize(bad);
    assert.strictEqual(fixed.quests.board.length, s.quests.board.length);
    assert.strictEqual(fixed.quests.board[0].progress, 3);
    assert.ok(fixed.quests.board[0].reward.gold <= B.QUESTS.GOLD_MAX_PER_QUEST);
    assert.deepStrictEqual(plain(Q.normalize({ quests: 'x' }).quests), plain(Q.create()));
  });

  // ---- Q-3：学習・冒険とのつながり ----
  test('依頼：日がちがう（日がかわったのに作り直していない）依頼は、now を渡すと進まない', () => {
    let s = Q.today(fresh(), T0); const st = s.quests.board.find(x => x.kind === 'study');
    s = Q.accept(s, st.id).state;
    const subj = st.target === 'any' ? 'math' : st.target;
    assert.strictEqual(Q.onCorrect(s, subj, T0 + DAY), s);
    assert.notStrictEqual(Q.onCorrect(s, subj, T0 + 1000), s);
  });
  test('依頼：学習の依頼は、本物の回答処理（正解）で進む。まちがい・ほかの人の画面の回答では進まない', () => {
    const L = FF.learning;
    const choiceQ = { id: 'qz_c1', subject: 'math', gradeLevel: 2, unit: 'x', difficulty: 'standard', answerType: 'choice', question: '1+1', answer: '2', choices: ['2', '3', '4', '5'], acceptedAnswers: [], validationMode: 'exact', hints: ['a', 'b', 'c'], explanation: 'e', reviewed: false };
    let s = FF.exam.applyFuriganaAuto(fresh()); s = Q.today(s, T0);
    const st = s.quests.board.find(x => x.kind === 'study');
    s.quests.board.forEach(x => { if (x.id === st.id) { x.target = 'math'; x.accepted = true; } });
    let a = L.startAttempt(choiceQ, () => 0.5);
    let r = L.submitAnswer(s, a, '3', { now: T0, resource: 'wood' });   // まちがい
    assert.strictEqual(Q.find(r.state, st.id).progress, 0);
    a = L.startAttempt(choiceQ, () => 0.5);
    r = L.submitAnswer(s, a, '2', { now: T0, resource: 'wood' });
    assert.strictEqual(r.outcome.status, 'correct');
    assert.strictEqual(Q.find(r.state, st.id).progress, 1);
    // 理科の依頼は、算数の正解では進まない
    const t = JSON.parse(JSON.stringify(s)); t.quests.board.forEach(x => { if (x.id === st.id) x.target = 'science'; });
    a = L.startAttempt(choiceQ, () => 0.5);
    r = L.submitAnswer(t, a, '2', { now: T0, resource: 'wood' });
    assert.strictEqual(Q.find(r.state, st.id).progress, 0);
  });
  test('依頼：冒険の戦闘に勝った瞬間に、討伐が1つ進む（勝利の画面のあいだ、何度保存しても1回だけ）', () => {
    let s = Q.today(hunter(fresh()), T0); const h = s.quests.board.find(x => x.kind === 'hunt');
    s = Q.accept(s, h.id).state;
    const mk = (phase) => Object.assign({}, s, { adventure: Object.assign({}, s.adventure, { battle: { enemy: h.target, phase } }) });
    const fighting = mk('quiz'), won = mk('win');
    const after = Q.onBattleWin(fighting.adventure, won, T0);
    assert.strictEqual(Q.find(after, h.id).progress, 1);
    assert.strictEqual(Q.onBattleWin(won.adventure, after, T0), after);   // もう勝利のあいだ
    assert.strictEqual(Q.onBattleWin(fighting.adventure, mk('quiz'), T0).quests, mk('quiz').quests);   // 勝っていない
    const other = Object.assign({}, won, { adventure: Object.assign({}, won.adventure, { battle: { enemy: 'boss', phase: 'win' } }) });
    assert.strictEqual(Q.onBattleWin(fighting.adventure, other, T0), other);   // ほかの敵
  });
  test('依頼：新しく達成した依頼を知らせる（newlyDone）。報告できる数（claimable）は、報告すると減る', () => {
    let s = Q.today(fresh(), T0); const d = s.quests.board[0];
    s = Q.accept(s, d.id).state; s.resources[d.target] = d.need;
    assert.deepStrictEqual(plain(Q.newlyDone(Q.accept(Q.today(fresh(), T0), d.id).state, s)), []);
    const done = Q.deliver(s, d.id).state;
    assert.deepStrictEqual(plain(Q.newlyDone(s, done)), [d.id]);
    assert.deepStrictEqual(plain(Q.newlyDone(done, done)), []);
    assert.strictEqual(Q.claimable(s), 0);
    assert.strictEqual(Q.claimable(done), 1);
    assert.strictEqual(Q.claimable(Q.claim(done, d.id).state), 0);
  });

  // ---- 信頼と特別な依頼（判断440） ----
  const TR = B.QUESTS.TRUST;
  const withTrust = (s, who, n) => { const t = JSON.parse(JSON.stringify(s)); t.quests.trust = Object.assign({}, t.quests.trust, { [who]: n }); return t; };
  // 依頼を1つ、受けて達成にして、報告する（住民 who の依頼にする）
  function finish(s, id, who) {
    let t = JSON.parse(JSON.stringify(s)); const qu = Q.find(t, id);
    if (who) qu.who = who; qu.accepted = true; qu.progress = qu.need;
    return Q.claim(t, id);
  }
  test('信頼：はじめは0（顔見知り）。段階は 0・3・8・15 で上がる。段階ごとのボーナスは大きくなる', () => {
    const s = Q.today(fresh(), T0);
    assert.strictEqual(Q.trustOf(s, 'baker'), 0);
    assert.strictEqual(Q.trustLevel(s, 'baker'), 0);
    for (const [n, lv] of [[2, 0], [3, 1], [7, 1], [8, 2], [14, 2], [15, 3], [999, 3]]) assert.strictEqual(Q.trustLevel(withTrust(s, 'baker', n), 'baker'), lv, 'trust ' + n);
    assert.deepStrictEqual(plain(Q.trustProgress(withTrust(s, 'baker', 4), 'baker')), { level: 1, have: 4, next: 8 });
    assert.strictEqual(Q.trustProgress(withTrust(s, 'baker', 20), 'baker').next, null);
    for (let i = 1; i < TR.BONUS.length; i++) assert.ok(TR.BONUS[i] > TR.BONUS[i - 1]);
  });
  test('信頼：依頼を報告すると、その住民との信頼が増える（段階が上がったら、知らせる）。報酬のゴールドは、信頼のボーナスで増える', () => {
    let s = Q.today(fresh(), T0); const d = s.quests.board[0];
    const r1 = finish(s, d.id, 'baker');
    assert.ok(r1.ok);
    assert.deepStrictEqual(plain(r1.trust), { who: 'baker', gain: TR.GAIN.deliver, from: 0, to: 0, levelUp: false, bonus: 0 });
    assert.strictEqual(Q.trustOf(r1.state, 'baker'), TR.GAIN.deliver);
    assert.strictEqual(r1.reward.gold, d.reward.gold);
    // 信頼が段階1に上がる直前（2）→報告で3になって、段階が上がる
    const r2 = finish(withTrust(s, 'baker', TR.LEVELS[1] - TR.GAIN.deliver), d.id, 'baker');
    assert.strictEqual(r2.trust.levelUp, true);
    assert.strictEqual(r2.trust.to, 1);
    // 親友（段階2）の住民の依頼は、ゴールドが 10% 増える
    const r3 = finish(withTrust(s, 'baker', TR.LEVELS[2]), d.id, 'baker');
    assert.strictEqual(r3.reward.gold, Math.round(d.reward.gold * (1 + TR.BONUS[2])));
    assert.strictEqual(FF.shop.gold(r3.state) - FF.shop.gold(s), r3.reward.gold);
    // 信頼には上限がある
    assert.strictEqual(Q.trustOf(finish(withTrust(s, 'baker', TR.MAX), d.id, 'baker').state, 'baker'), TR.MAX);
  });
  test('特別な依頼：信頼が「仲良し」になると、その住民の1つ目が出る。前の依頼を終えてから、次が出る', () => {
    let s = Q.today(fresh(), T0);
    assert.deepStrictEqual(plain(Q.specials(s)), []);
    s = Q.today(withTrust(s, 'baker', TR.LEVELS[1]), T0);
    const sp = Q.specials(s);
    assert.strictEqual(sp.length, 1);
    assert.strictEqual(sp[0].special, 'baker-1');
    assert.strictEqual(sp[0].who, 'baker');
    assert.deepStrictEqual([sp[0].kind, sp[0].target, sp[0].need], [B.QUESTS.SPECIAL.baker[0].kind, B.QUESTS.SPECIAL.baker[0].target, B.QUESTS.SPECIAL.baker[0].need]);
    // 同じ依頼を、二重に出さない
    assert.strictEqual(Q.refreshSpecials(s), s);
    // 信頼が親友になっても、1つ目を終えるまでは、2つ目は出ない
    const t = Q.today(withTrust(s, 'baker', TR.LEVELS[2]), T0);
    assert.deepStrictEqual(plain(Q.specials(t).map(x => x.special)), ['baker-1']);
    // 1つ目を終えると（信頼が増える）、2つ目が出る。終えた1つ目は、もう出ない
    const done1 = finish(t, 'sp:baker-1', null);
    assert.ok(done1.ok);
    assert.deepStrictEqual(plain(Q.specials(done1.state).map(x => x.special)), ['baker-2']);
    assert.deepStrictEqual(plain(done1.unlocked), ['baker-2']);
    assert.strictEqual(done1.state.quests.specialDone['baker-1'], true);
  });
  test('特別な依頼：報告すると、信頼が +3。報酬（ゴールド・資材・回復薬）がもらえる。段階が上がると、次の依頼が出る', () => {
    let s = Q.today(withTrust(Q.today(fresh(), T0), 'woodcutter', TR.LEVELS[1]), T0);
    const d = B.QUESTS.SPECIAL.woodcutter[0];
    const r = finish(s, 'sp:woodcutter-1', null);
    assert.strictEqual(r.trust.gain, TR.GAIN.special);
    assert.strictEqual(r.trust.who, 'woodcutter');
    assert.strictEqual(r.reward.gold, Math.round(d.reward.gold * (1 + TR.BONUS[1])));
    assert.strictEqual(Q.trustOf(r.state, 'woodcutter'), TR.LEVELS[1] + TR.GAIN.special);
    assert.strictEqual(Q.claim(r.state, 'sp:woodcutter-1').ok, false);   // 二重にはもらえない
  });
  test('特別な依頼：日がかわっても消えず、進みぐあいも続く。学習・討伐・納品で進む', () => {
    let s = Q.today(withTrust(Q.today(hunter(fresh()), T0), 'hunter', TR.LEVELS[1]), T0);
    let sp = Q.specials(s)[0];
    assert.strictEqual(sp.special, 'hunter-1');
    s = Q.accept(s, sp.id).state;
    const n = Q.today(s, T0 + DAY);   // 次の日
    assert.deepStrictEqual(plain(Q.specials(n).map(x => x.special)), ['hunter-1']);
    assert.ok(Q.find(n, sp.id).accepted);
    // 次の日、酒場を開く前でも、討伐は進む（ふつうの依頼は、日がちがうと進まない）
    let m = Q.onVictory(s, sp.target, T0 + DAY);
    assert.strictEqual(Q.find(m, sp.id).progress, 1);
    // 学習
    let t = Q.today(withTrust(Q.today(fresh(), T0), 'child', TR.LEVELS[1]), T0);
    const c = Q.specials(t)[0]; t = Q.accept(t, c.id).state;
    t = Q.onCorrect(t, 'japanese', T0); assert.strictEqual(Q.find(t, c.id).progress, 0);   // 算数の依頼（child-1）は、国語では進まない
    t = Q.onCorrect(t, 'math', T0); assert.strictEqual(Q.find(t, c.id).progress, 1);
    // 納品（nurse-1：食料）
    let u = Q.today(withTrust(Q.today(fresh(), T0), 'nurse', TR.LEVELS[1]), T0);
    const nu = Q.specials(u)[0]; u = Q.accept(u, nu.id).state; u.resources[nu.target] = nu.need;
    const dv = Q.deliver(u, nu.id); assert.ok(dv.ok); assert.ok(Q.done(Q.find(dv.state, nu.id)));
    assert.strictEqual(Q.claimable(dv.state), 1);
    assert.deepStrictEqual(plain(Q.newlyDone(u, dv.state)), [nu.id]);
  });
  test('特別な依頼：画面に出すのは最大2件。全部で18件（6人×3）で、前の段階のものから', () => {
    assert.strictEqual(Object.keys(B.QUESTS.SPECIAL).length, 6);
    for (const who of Object.keys(B.QUESTS.SPECIAL)) assert.strictEqual(B.QUESTS.SPECIAL[who].length, 3);
    assert.deepStrictEqual(plain(Object.keys(B.QUESTS.SPECIAL).sort()), plain(B.QUESTS.RESIDENTS.slice().sort()));
    let s = Q.today(fresh(), T0);
    for (const who of B.QUESTS.RESIDENTS) s = withTrust(s, who, TR.LEVELS[1]);
    s = Q.today(s, T0);
    assert.strictEqual(s.quests.specials.length, 6);
    assert.strictEqual(Q.specials(s).length, TR.MAX_VISIBLE_SPECIALS);
    // 達成の目印・報告できる数は、特別な依頼もふくむ
    assert.strictEqual(Q.claimable(s), 0);
  });
  test('信頼・特別な依頼のセーブ：保存して読み込んでも同じ。知らない依頼・書きかえられた報酬は、定義から作り直す', () => {
    let s = Q.today(withTrust(Q.today(fresh(), T0), 'elder', TR.LEVELS[1]), T0);
    s = Q.accept(s, 'sp:elder-1').state;
    s.resources.iron = 99; s = Q.deliver(s, 'sp:elder-1').state;
    const text = FF.state.serialize(s), back = FF.state.migrate(JSON.parse(text), T0);
    assert.ok(back.ok);
    assert.deepStrictEqual(plain(back.state.quests.specials), plain(s.quests.specials));
    assert.deepStrictEqual(plain(back.state.quests.trust), plain(s.quests.trust));
    const bad = JSON.parse(text);
    bad.quests.specials[0].reward.gold = 99999999; bad.quests.specials[0].need = 1; bad.quests.specials[0].progress = 99999;
    bad.quests.specials.push({ special: 'nobody-1' }, { special: 'elder-9' }, { special: 'elder-1' }, null, 7);
    bad.quests.trust = { elder: -5, baker: 1e12, ['x'.repeat(40)]: 3, ok: 'zz' };
    bad.quests.specialDone = { 'baker-1': true, 'nobody-1': true };
    const f = Q.normalize(bad);
    assert.strictEqual(f.quests.specials.length, 1);
    assert.strictEqual(f.quests.specials[0].reward.gold, B.QUESTS.SPECIAL.elder[0].reward.gold);
    assert.strictEqual(f.quests.specials[0].need, B.QUESTS.SPECIAL.elder[0].need);
    assert.strictEqual(f.quests.specials[0].progress, B.QUESTS.SPECIAL.elder[0].need);
    assert.strictEqual(f.quests.trust.elder, 0);
    assert.strictEqual(f.quests.trust.baker, TR.MAX);
    assert.strictEqual(f.quests.trust.ok, 0);
    assert.deepStrictEqual(plain(f.quests.specialDone), { 'baker-1': true });
  });
  test('防衛の依頼（判断449）：今夜の襲撃に勝つと進む（受けたあと・練習や負けは数えない）。報告で、ゴールド。読み込みで形を整える', () => {
    let s = Q.today(fresh(), T0); const d = s.quests.board.find(x => x.kind === 'defend');
    assert.ok(d); assert.strictEqual(d.target, 'raid'); assert.strictEqual(d.need, B.QUESTS.DEFEND.COUNT[0]);
    assert.strictEqual(d.reward.gold, Math.min(B.QUESTS.GOLD_MAX_PER_QUEST, d.need * B.QUESTS.DEFEND.GOLD_PER_WIN));
    assert.strictEqual(Q.onRaidWin(s, T0), s);   // 受けていないと進まない
    s = Q.accept(s, d.id).state;
    assert.strictEqual(Q.onRaidWin(s, T0 + DAY), s);   // 日がちがうと進まない
    for (let i = 0; i < d.need; i++) s = Q.onRaidWin(s, T0);
    assert.ok(Q.done(Q.find(s, d.id)));
    const g0 = FF.shop.gold(s), r = Q.claim(s, d.id);
    assert.ok(r.ok); assert.ok(FF.shop.gold(r.state) >= g0 + d.reward.gold);
    // 中央炉が高いほど、回数が増える
    const hi = fresh(); hi.buildings.furnace.level = 5;
    assert.strictEqual(Q.today(hi, T0).quests.board.find(x => x.kind === 'defend').need, B.QUESTS.DEFEND.COUNT[4]);
    // セーブをいじっても、形が直る
    const bad = JSON.parse(JSON.stringify(s)); bad.quests.board.find(x => x.kind === 'defend').target = 'xxx';
    assert.ok(!Q.normalize(bad).quests.board.some(x => x.kind === 'defend'));
  });
};
