// 住民の依頼クエスト（酒場。判断434・SPEC_quest.md）：Q-1（ロジックのみ）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const Q = FF.quests, B = FF.balance, T0 = 1790000000000, DAY = 86400000;
  const fresh = () => FF.state.createDefaultState(T0);
  const withAdv = (s) => { const t = JSON.parse(JSON.stringify(s)); t.adventure.started = true; return t; };
  const board = (s, now = T0) => Q.today(s, now).quests.board;
  const hunter = (s) => withAdv(s);

  test('依頼：新しいゲームでは依頼は空。今日の分を作ると、3件（納品・納品・学習。冒険を始めていないので、討伐は納品に）', () => {
    const s = fresh();
    assert.deepStrictEqual(plain(s.quests), { version: 1, day: null, board: [], history: { completed: 0 } });
    const b = board(s);
    assert.strictEqual(b.length, B.QUESTS.PER_DAY);
    assert.deepStrictEqual(plain(b.map(x => x.kind)), ['deliver', 'deliver', 'study']);
    assert.notStrictEqual(b[0].target, b[1].target);   // 納品の資材は、重ならない
  });
  test('依頼：冒険を始めていると、討伐が出る（納品・討伐・学習）。オオカミは中央炉 Lv2 から', () => {
    const s = hunter(fresh());
    const k = board(s).map(x => x.kind);
    assert.deepStrictEqual(plain(k), ['deliver', 'hunt', 'study']);
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
    assert.strictEqual(Q.remaining(r.state), 2);
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
};
