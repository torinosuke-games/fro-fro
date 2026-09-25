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
  test('資源を消費して強化できる', () => {
    const s = newState();
    s.resources = { wood: 200, iron: 0, stone: 120, food: 0 };
    const r = B.upgrade(s, 'furnace', T0);
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.state.buildings.furnace.level, 2);
    assert.deepStrictEqual(plain(r.state.resources), { wood: 50, iron: 0, stone: 20, food: 0 });
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

  test('中央炉のレベルを超えて他の建物を強化できない', () => {
    let s = rich();
    const r = B.upgrade(s, 'lumber', T0);
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.reason, 'furnaceCap');
    s = B.upgrade(s, 'furnace', T0).state;
    s = B.upgrade(s, 'lumber', T0).state;
    assert.strictEqual(s.buildings.lumber.level, 2);
    assert.strictEqual(B.upgrade(s, 'lumber', T0).reason, 'furnaceCap');
  });

  test('最大レベル（Lv5）より上には強化できない', () => {
    let s = rich();
    for (let i = 0; i < 4; i++) s = B.upgrade(s, 'furnace', T0).state;
    assert.strictEqual(s.buildings.furnace.level, 5);
    assert.strictEqual(B.upgrade(s, 'furnace', T0).reason, 'maxLevel');
    for (const id of ['housing', 'lumber', 'mine', 'quarry', 'foodhall']) {
      while (B.canUpgrade(s, id).ok) s = B.upgrade(s, id, T0).state;
      assert.strictEqual(s.buildings[id].level, 5, id);
      assert.strictEqual(B.canUpgrade(s, id).reason, 'maxLevel');
    }
  });

  test('石切り場は中央炉 Lv2 で解放される', () => {
    let s = rich();
    assert.strictEqual(s.buildings.quarry.level, 0);
    assert.strictEqual(B.canUpgrade(s, 'quarry').reason, 'locked');
    const r = B.upgrade(s, 'furnace', T0 + 5000);
    assert.strictEqual(r.state.buildings.quarry.level, 1);
    assert.strictEqual(r.state.buildings.quarry.lastCollectedAt, T0 + 5000);
    assert.deepStrictEqual(plain(r.unlocked.map(u => u.id)), ['quarry']);
  });

  test('中央炉のレベルごとの解放（Lv3 見張り塔・Lv4 雪原・Lv5 探索の予告）', () => {
    let s = rich();
    const got = [];
    for (let i = 0; i < 4; i++) {
      const r = B.upgrade(s, 'furnace', T0);
      got.push(r.unlocked.map(u => u.id).join(','));
      s = r.state;
    }
    assert.deepStrictEqual(got, ['quarry', 'watchtower', 'snowfield', 'expedition']);
  });

  test('解放のお知らせは一度見たら出ない', () => {
    let s = rich();
    s = B.upgrade(s, 'furnace', T0).state;
    assert.deepStrictEqual(plain(B.pendingUnlockNotices(s).map(u => u.id)), ['quarry']);
    s = B.markUnlockNoticeSeen(s, 'quarry');
    assert.strictEqual(B.pendingUnlockNotices(s).length, 0);
  });

  test('建物のレベルが保存される', () => {
    let s = rich();
    s = B.upgrade(s, 'furnace', T0).state;
    s = B.upgrade(s, 'mine', T0).state;
    const loaded = FF.state.parseSave(FF.state.serialize(s), T0 + HOUR).state;
    assert.strictEqual(loaded.buildings.furnace.level, 2);
    assert.strictEqual(loaded.buildings.mine.level, 2);
    assert.strictEqual(loaded.buildings.quarry.level, 1);
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
