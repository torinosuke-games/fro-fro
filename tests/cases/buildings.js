// 基地：建物・強化・中央炉の上限・生産と受け取り（SPEC 第9章・第19章）
module.exports = ({ test, FF, assert, plain }) => {
  const B = FF.buildings;
  const T0 = 1790000000000;
  const HOUR = 60 * 60 * 1000;
  const MIN = 60 * 1000;
  const newState = () => FF.state.createDefaultState(T0);
  const rich = () => { const s = newState(); s.resources = { wood: 1e6, iron: 1e6, stone: 1e6, food: 1e6 }; return s; };
  const rate = FF.balance.PRODUCTION_PER_LEVEL_PER_HOUR;

  // ---- コスト ----
  test('中央炉の強化コストは balance.js の表どおり', () => {
    assert.deepStrictEqual(plain(B.upgradeCost('furnace', 1)), { wood: 150, stone: 100 });
    assert.deepStrictEqual(plain(B.upgradeCost('furnace', 4)), { wood: 6000, stone: 4500, iron: 3500, food: 2500 });
    assert.strictEqual(B.upgradeCost('furnace', 5), null);
  });

  test('その他の建物は同じ段階の中央炉コストの約0.4倍で、資源の組み合わせが建物ごとに違う', () => {
    const others = ['housing', 'lumber', 'mine', 'quarry', 'foodhall'];
    for (let lv = 1; lv <= 4; lv++) {
      const target = B.sumCost(B.upgradeCost('furnace', lv)) * FF.balance.BUILDING_COST_RATIO;
      for (const id of others) {
        const total = B.sumCost(B.upgradeCost(id, lv));
        assert.ok(Math.abs(total - target) <= FF.balance.COST_ROUND * 3, `${id} Lv${lv}: ${total} / ${target}`);
      }
    }
    const combos = new Set(others.map(id => JSON.stringify(FF.balance.BUILDING_COST_MIX[id])));
    assert.strictEqual(combos.size, others.length);
  });

  // ---- 強化 ----
  // 強化は工事を始めるだけで、完成は completeConstructions（SPEC_v0.3 3章）。
  // build：強化を始めて、完成の時刻まで進めて完成させる（テスト用）。{ state, start（upgrade の結果）, completed }
  const build = (st, id, now) => {
    const r = B.upgrade(st, id, now);
    if (!r.ok) return { state: st, start: r, completed: [] };
    const d = B.completeConstructions(r.state, r.endsAt);
    return { state: d.state, start: r, completed: d.completed };
  };
  const unlockedIds = res => res.completed.flatMap(c => c.unlocked.map(u => u.id));

  test('資源を消費して強化を始め、待ち時間のあとに完成する', () => {
    const s = newState();
    s.resources = { wood: 200, iron: 0, stone: 120, food: 0 };
    const r = B.upgrade(s, 'furnace', T0);
    assert.strictEqual(r.ok, true);
    assert.deepStrictEqual(plain(r.state.resources), { wood: 50, iron: 0, stone: 20, food: 0 }, '資源は始めた時点で使う');
    assert.strictEqual(r.state.buildings.furnace.level, 1, '完成するまでレベルは上がらない');
    assert.deepStrictEqual(plain(r.state.buildings.furnace.construction), { toLevel: 2, startedAt: T0, endsAt: T0 + B.buildDurationMs('furnace', 2) });
    const done = B.completeConstructions(r.state, r.endsAt);
    assert.strictEqual(done.state.buildings.furnace.level, 2);
    assert.strictEqual(done.state.buildings.furnace.construction, undefined, '完成したら工事の記録を消す');
    assert.strictEqual(s.buildings.furnace.level, 1, '元の状態は変わらない');
  });

  test('資源が足りないときは強化できず、不足分がわかる', () => {
    const s = newState();
    s.resources = { wood: 100, iron: 0, stone: 100, food: 0 };
    const r = B.upgrade(s, 'furnace', T0);
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.reason, 'resources');
    assert.deepStrictEqual(plain(r.missing), { wood: 50 });
    assert.strictEqual(r.state, s);
  });

  test('中央炉のレベルを超えて他の建物を強化できない（中央炉の工事中も、完成するまでは上げられない）', () => {
    let s = rich();
    assert.strictEqual(B.upgrade(s, 'lumber', T0).reason, 'furnaceCap');
    const f = B.upgrade(s, 'furnace', T0);
    assert.strictEqual(B.upgrade(f.state, 'lumber', T0).reason, 'furnaceBuilding', '中央炉が工事中の間はまだ上げられない（完成を待つように知らせる）');
    s = B.completeConstructions(f.state, f.endsAt).state;
    s = build(s, 'lumber', f.endsAt).state;
    assert.strictEqual(s.buildings.lumber.level, 2);
    assert.strictEqual(B.upgrade(s, 'lumber', T0).reason, 'furnaceCap');
  });

  test('最大レベル（Lv5）より上には強化できない', () => {
    let s = rich();
    for (let i = 0; i < 4; i++) s = build(s, 'furnace', T0).state;
    assert.strictEqual(s.buildings.furnace.level, 5);
    assert.strictEqual(B.upgrade(s, 'furnace', T0).reason, 'maxLevel');
    for (const id of ['housing', 'lumber', 'mine', 'quarry', 'foodhall']) {
      while (B.canUpgrade(s, id).ok) s = build(s, id, T0).state;
      assert.strictEqual(s.buildings[id].level, 5, id);
      assert.strictEqual(B.canUpgrade(s, id).reason, 'maxLevel');
    }
  });

  test('石切り場は中央炉 Lv2 の完成で解放され、生産は完成した時刻から', () => {
    const s = rich();
    assert.strictEqual(s.buildings.quarry.level, 0);
    assert.strictEqual(B.canUpgrade(s, 'quarry').reason, 'locked');
    const r = B.upgrade(s, 'furnace', T0 + 5000);
    assert.strictEqual(r.state.buildings.quarry.level, 0, '工事中はまだ解放されない');
    const done = B.completeConstructions(r.state, r.endsAt + 60000);
    assert.strictEqual(done.state.buildings.quarry.level, 1);
    assert.strictEqual(done.state.buildings.quarry.lastCollectedAt, r.endsAt, '完成した時刻（確かめた時刻ではない）');
    assert.deepStrictEqual(plain(done.completed.flatMap(c => c.unlocked.map(u => u.id))), ['quarry']);
  });

  test('中央炉のレベルごとの解放（Lv3 見張り塔・Lv4 雪原・Lv5 探索の予告）は完成の時点', () => {
    let s = rich();
    const got = [];
    for (let i = 0; i < 4; i++) {
      const r = build(s, 'furnace', T0);
      assert.strictEqual(r.start.completed.length, 0, '始めた時点では何も解放されない');
      got.push(unlockedIds(r).join(','));
      s = r.state;
    }
    assert.deepStrictEqual(got, ['quarry', 'watchtower', 'snowfield', 'expedition']);
  });

  test('解放のお知らせは一度見たら出ない', () => {
    let s = rich();
    s = build(s, 'furnace', T0).state;
    assert.deepStrictEqual(plain(B.pendingUnlockNotices(s).map(u => u.id)), ['quarry']);
    s = B.markUnlockNoticeSeen(s, 'quarry');
    assert.strictEqual(B.pendingUnlockNotices(s).length, 0);
  });

  test('建物のレベルが保存される', () => {
    let s = rich();
    s = build(s, 'furnace', T0).state;
    s = build(s, 'mine', T0 + HOUR).state;
    const loaded = FF.state.parseSave(FF.state.serialize(s), T0 + 2 * HOUR).state;
    assert.strictEqual(loaded.buildings.furnace.level, 2);
    assert.strictEqual(loaded.buildings.mine.level, 2);
    assert.strictEqual(loaded.buildings.quarry.level, 1);
  });

  // ---- 強化の待ち時間（SPEC_v0.3 3章） ----
  test('待ち時間は balance.js の表どおりで、レベルが高いほど長い', () => {
    const t = FF.balance.BUILD_MINUTES;
    for (let lv = 2; lv <= 5; lv++) {
      assert.strictEqual(B.buildDurationMs('furnace', lv), t.furnace[lv] * MIN);
      assert.strictEqual(B.buildDurationMs('mine', lv), t.other[lv] * MIN);
      if (lv > 2) {
        assert.ok(B.buildDurationMs('furnace', lv) > B.buildDurationMs('furnace', lv - 1));
        assert.ok(B.buildDurationMs('lumber', lv) > B.buildDurationMs('lumber', lv - 1));
      }
    }
    assert.ok(B.buildDurationMs('furnace', 2) <= MIN, '最初の強化は ほぼ待たない（1分以内）');
  });

  test('完成の境目：終了時刻の1ミリ秒前は工事中、ちょうどで完成', () => {
    const r = B.upgrade(rich(), 'furnace', T0);
    const before = B.completeConstructions(r.state, r.endsAt - 1);
    assert.strictEqual(before.completed.length, 0);
    assert.strictEqual(before.state, r.state, '変化がなければ同じ状態を返す');
    assert.strictEqual(B.constructionRemainingMs(r.state, 'furnace', r.endsAt - 1), 1);
    const at = B.completeConstructions(r.state, r.endsAt);
    assert.deepStrictEqual(plain(at.completed.map(c => [c.id, c.level])), [['furnace', 2]]);
    assert.strictEqual(B.constructionRemainingMs(at.state, 'furnace', r.endsAt), null);
  });

  test('残り時間：始めた直後は工事の時間、途中は減っていき、過ぎても 0 より小さくならない', () => {
    let s = build(rich(), 'furnace', T0).state;
    s = build(s, 'furnace', T0).state;                       // Lv3
    const r = B.upgrade(s, 'furnace', T0);                    // Lv3 → 4
    const dur = B.buildDurationMs('furnace', 4);
    assert.strictEqual(B.constructionRemainingMs(r.state, 'furnace', T0), dur);
    assert.strictEqual(B.constructionRemainingMs(r.state, 'furnace', T0 + 25 * MIN), dur - 25 * MIN);
    assert.strictEqual(B.constructionRemainingMs(r.state, 'furnace', T0 + 10 * HOUR), 0);
  });

  test('工事中の建物は、完成するまで次の強化ができない', () => {
    const r = B.upgrade(rich(), 'furnace', T0);
    assert.strictEqual(B.canUpgrade(r.state, 'furnace').reason, 'building');
    assert.strictEqual(B.upgrade(r.state, 'furnace', T0).ok, false);
  });

  test('ほかの建物は同時に工事できる（工事中でも別の建物の強化を始められる）', () => {
    const s = build(rich(), 'furnace', T0).state;             // 中央炉 Lv2
    const a = B.upgrade(s, 'lumber', T0);
    const b2 = B.upgrade(a.state, 'mine', T0 + 1000);
    const c = B.upgrade(b2.state, 'furnace', T0 + 2000);
    assert.ok(c.ok, '中央炉の工事も同時に始められる');
    const ids = ['lumber', 'mine', 'furnace'].filter(id => B.constructionOf(c.state, id));
    assert.deepStrictEqual(ids, ['lumber', 'mine', 'furnace']);
    const done = B.completeConstructions(c.state, T0 + HOUR);
    assert.deepStrictEqual(plain(done.completed.map(x => x.id)), ['lumber', 'mine', 'furnace'], '終わる順に完成する');
    assert.deepStrictEqual([done.state.buildings.lumber.level, done.state.buildings.mine.level, done.state.buildings.furnace.level], [2, 2, 3]);
  });

  test('アプリを閉じていた間に終わった工事は、保存データを読み込んで確かめると完成している', () => {
    const s = build(build(rich(), 'furnace', T0).state, 'furnace', T0).state;
    const r = B.upgrade(s, 'furnace', T0);                    // Lv3 → 4
    const dur = B.buildDurationMs('furnace', 4);
    const text = FF.state.serialize(r.state);                // ここでアプリを閉じた
    const early = FF.state.parseSave(text, T0 + dur / 2).state;
    assert.strictEqual(B.completeConstructions(early, T0 + dur / 2).state.buildings.furnace.level, 3, '半分の時間ではまだ工事中');
    assert.strictEqual(B.constructionRemainingMs(early, 'furnace', T0 + dur / 2), dur / 2);
    const later = FF.state.parseSave(text, T0 + dur + 5 * HOUR).state;
    const done = B.completeConstructions(later, T0 + dur + 5 * HOUR);
    assert.strictEqual(done.state.buildings.furnace.level, 4, '時間がたってから開くと完成している');
    assert.deepStrictEqual(plain(done.completed.flatMap(c => c.unlocked.map(u => u.id))), ['snowfield']);
  });

  test('端末の時計が工事を始めた時刻より前に戻ったら、残り時間が工事の時間を超えないようにする', () => {
    const r = B.upgrade(rich(), 'furnace', T0);
    const dur = B.buildDurationMs('furnace', 2);
    const back = B.completeConstructions(r.state, T0 - HOUR);
    assert.strictEqual(back.completed.length, 0);
    assert.deepStrictEqual(plain(back.state.buildings.furnace.construction), { toLevel: 2, startedAt: T0 - HOUR, endsAt: T0 - HOUR + dur });
    assert.strictEqual(B.constructionRemainingMs(r.state, 'furnace', T0 - HOUR), dur, '表示の残り時間も工事の時間まで');
  });

  test('待ち時間が 0 の設定なら、その場で完成する', () => {
    const b0 = Object.assign({}, FF.balance, { BUILD_MINUTES: { furnace: { 2: 0, 3: 0, 4: 0, 5: 0 }, other: { 2: 0, 3: 0, 4: 0, 5: 0 } } });
    const r = B.upgrade(rich(), 'furnace', T0, b0);
    assert.strictEqual(r.state.buildings.furnace.level, 2);
    assert.deepStrictEqual(plain(r.completed.map(c => c.id)), ['furnace']);
  });

  test('残り時間の表示「あと◯分」：秒・分・時間の形と「分」の読み（ふん／ぷん）', () => {
    const f = FF.util.formatDurationMarkup;
    assert.strictEqual(f(30 * 1000), '30{秒|びょう}');
    assert.strictEqual(f(59 * 1000 + 1), '1{分|ぷん}', '59秒あまりは切り上げて1分');
    assert.strictEqual(f(2 * MIN), '2{分|ふん}');
    assert.strictEqual(f(3 * MIN), '3{分|ぷん}');
    assert.strictEqual(f(10 * MIN), '10{分|ぷん}');
    assert.strictEqual(f(25 * MIN), '25{分|ふん}');
    assert.strictEqual(f(4 * MIN + 1), '5{分|ふん}', '分は切り上げ');
    assert.strictEqual(f(HOUR), '1{時間|じかん}');
    assert.strictEqual(f(HOUR + 20 * MIN), '1{時間|じかん}20{分|ぷん}');
    assert.strictEqual(f(0), '0{秒|びょう}');
    assert.strictEqual(FF.util.plainText(f(3 * HOUR + 7 * MIN)), '3時間7分');
  });

  test('読み込み時の整合：形のおかしい工事の記録や、次の段階でない記録は消す（正しいものは残す）', () => {
    const s = plain(build(rich(), 'furnace', T0).state);
    s.buildings.furnace.construction = { toLevel: 3, startedAt: T0, endsAt: T0 + 10 * MIN };   // 正しい
    s.buildings.mine.construction = { toLevel: 3, startedAt: T0, endsAt: T0 + MIN };           // Lv1 → 3 はおかしい
    s.buildings.lumber.construction = { toLevel: 2, startedAt: 'x', endsAt: T0 };              // 形がおかしい
    s.buildings.housing.construction = { toLevel: 2, startedAt: T0 + MIN, endsAt: T0 };        // 終わりが始まりより前
    const r = FF.state.migrate(s, T0).state;
    assert.deepStrictEqual(plain(r.buildings.furnace.construction), { toLevel: 3, startedAt: T0, endsAt: T0 + 10 * MIN });
    for (const id of ['mine', 'lumber', 'housing']) assert.strictEqual(r.buildings[id].construction, undefined, id);
    const r2 = plain(newState());
    r2.buildings.mine.construction = { toLevel: 2, startedAt: T0, endsAt: T0 + MIN };          // 中央炉 Lv1 を超える
    assert.strictEqual(FF.state.migrate(r2, T0).state.buildings.mine.construction, undefined);
  });

  test('読み込み時に、中央炉を超えるレベルや解放漏れを直す', () => {
    const s = plain(newState());
    s.buildings.furnace.level = 3;
    s.buildings.mine.level = 5;        // 中央炉を超えている
    s.buildings.quarry.level = 0;      // 解放済みなのに 0
    s.buildings.lumber.level = 99;
    const r = FF.state.migrate(s, T0 + 7).state;
    assert.strictEqual(r.buildings.mine.level, 3);
    assert.strictEqual(r.buildings.lumber.level, 3);
    assert.strictEqual(r.buildings.quarry.level, 1);
    assert.strictEqual(r.buildings.quarry.lastCollectedAt, T0 + 7);
  });

  // ---- 生産 ----
  test('保管の上限時間：住宅 Lv1 で4時間、1レベルごとに+2時間、最大12時間', () => {
    assert.deepStrictEqual([1, 2, 3, 4, 5, 6].map(l => B.storageHours(l)), [4, 6, 8, 10, 12, 12]);
  });

  test('生産量は「施設レベル × 毎時の生産量」', () => {
    const s = newState();
    s.buildings.lumber.level = 1;
    assert.strictEqual(B.pendingProduction(s, 'lumber', T0 + HOUR), rate);
    s.buildings.mine.level = 1;
    s.buildings.furnace.level = 3;
    s.buildings.mine.level = 3;
    assert.strictEqual(B.pendingProduction(s, 'mine', T0 + 2 * HOUR), 3 * rate * 2);
  });

  test('生産物は住宅のレベルで決まる時間の上限まで貯まる', () => {
    const s = newState();
    assert.strictEqual(B.pendingProduction(s, 'lumber', T0 + 4 * HOUR), 4 * rate);
    assert.strictEqual(B.pendingProduction(s, 'lumber', T0 + 30 * HOUR), 4 * rate);
    assert.strictEqual(B.isStorageFull(s, 'lumber', T0 + 4 * HOUR), true);
    s.buildings.furnace.level = 5;
    s.buildings.housing.level = 5;
    assert.strictEqual(B.pendingProduction(s, 'lumber', T0 + 30 * HOUR), 12 * rate);
  });

  test('生産物は自動では加算されず、「受け取り」で資源に入る', () => {
    const s = newState();
    const now = T0 + 3 * HOUR;
    assert.strictEqual(s.resources.wood, 0);
    assert.deepStrictEqual(plain(B.pendingAll(s, now)), { wood: 3 * rate, iron: 3 * rate, stone: 0, food: 3 * rate });
    const r = B.collectAll(s, now);
    assert.deepStrictEqual(plain(r.collected), { wood: 3 * rate, iron: 3 * rate, food: 3 * rate });
    assert.strictEqual(r.state.resources.wood, 3 * rate);
    assert.strictEqual(B.pendingProduction(r.state, 'lumber', now), 0);
  });

  test('受け取りで端数の時間を失わない', () => {
    // Lv1 は 1個あたり 60/rate 分。45分で1個受け取り、さらに15分で次の1個
    let s = newState();
    const per = HOUR / rate;
    s = B.collectAll(s, T0 + per * 1.5).state;
    assert.strictEqual(s.resources.wood, 1);
    assert.strictEqual(B.pendingProduction(s, 'lumber', T0 + per * 2), 1);
    s = B.collectAll(s, T0 + per * 2).state;
    assert.strictEqual(s.resources.wood, 2);
  });

  test('上限に達していたら、受け取った時刻から数え直す', () => {
    let s = newState();
    s = B.collectAll(s, T0 + 10 * HOUR).state;
    assert.strictEqual(s.resources.wood, 4 * rate);
    assert.strictEqual(s.buildings.lumber.lastCollectedAt, T0 + 10 * HOUR);
  });

  test('解放前の石切り場は生産しない', () => {
    const s = newState();
    assert.strictEqual(B.pendingProduction(s, 'quarry', T0 + 5 * HOUR), 0);
  });

  test('端末の時計が戻っていても生産物は減らず、マイナスにもならない', () => {
    let s = newState();
    assert.strictEqual(B.pendingProduction(s, 'lumber', T0 - HOUR), 0);
    const r = B.collectAll(s, T0 - HOUR);
    assert.strictEqual(r.state.resources.wood, 0);
    assert.strictEqual(r.state.buildings.lumber.lastCollectedAt, T0 - HOUR);
    assert.strictEqual(B.pendingProduction(r.state, 'lumber', T0), rate);
  });

  test('生産施設の受け取り時刻が保存される', () => {
    let s = B.collectAll(newState(), T0 + 2 * HOUR).state;
    const loaded = FF.state.parseSave(FF.state.serialize(s), T0 + 3 * HOUR).state;
    assert.strictEqual(B.pendingProduction(loaded, 'lumber', T0 + 3 * HOUR), rate);
  });
};
