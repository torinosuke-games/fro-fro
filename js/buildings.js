// 建物（SPEC 第9章）：強化コスト、強化、中央炉による上限、解放、生産と受け取り。純粋関数のみ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var HOUR = 60 * 60 * 1000;

  function bal(b) { return b || FF.balance; }

  function defOf(id) {
    return FF.defs.BUILDINGS.filter(function (d) { return d.id === id; })[0] || null;
  }
  function producers() {
    return FF.defs.BUILDINGS.filter(function (d) { return !!d.produces; });
  }

  function sumCost(cost) {
    var s = 0;
    for (var k in cost) s += cost[k];
    return s;
  }

  // fromLevel → fromLevel+1 の強化コスト。{ wood: n, ... }（0 の資源は含めない）。これ以上ないなら null
  function upgradeCost(buildingId, fromLevel, b) {
    b = bal(b);
    var furnace = b.FURNACE_COST[fromLevel + 1];
    if (!furnace) return null;
    if (buildingId === 'furnace') return Object.assign({}, furnace);
    var mix = b.BUILDING_COST_MIX[buildingId];
    var total = sumCost(furnace) * b.BUILDING_COST_RATIO;
    var cost = {};
    for (var res in mix) {
      var n = Math.round(total * mix[res] / b.COST_ROUND) * b.COST_ROUND;
      if (n > 0) cost[res] = n;
    }
    return cost;
  }

  function storageHours(housingLevel, b) {
    var s = bal(b).STORAGE_HOURS;
    return Math.min(s.MAX, s.BASE + s.PER_LEVEL * Math.max(0, housingLevel - 1));
  }

  function productionPerHour(level, b) {
    return Math.max(0, level) * bal(b).PRODUCTION_PER_LEVEL_PER_HOUR;
  }

  // ---- 解放 ----

  // その建物が解放される中央炉のレベル（最初からあるものは 1）
  function unlockLevel(buildingId, b) {
    return bal(b).BUILDING_UNLOCK_FURNACE_LEVEL[buildingId] || 1;
  }

  function isUnlocked(state, buildingId, b) {
    return state.buildings.furnace.level >= unlockLevel(buildingId, b);
  }

  // 中央炉のレベルに合わせて、新しく解放された建物を Lv1 にする（状態を書き換える）
  function applyUnlocks(s, now, b) {
    FF.defs.BUILDINGS.forEach(function (d) {
      var bld = s.buildings[d.id];
      if (bld.level === 0 && isUnlocked(s, d.id, b)) {
        bld.level = 1;
        if (d.produces) bld.lastCollectedAt = now;
      }
    });
  }

  // ---- 強化 ----

  // { ok, reason: 'unknown' | 'locked' | 'maxLevel' | 'furnaceCap' | 'resources', cost, missing }
  function canUpgrade(state, buildingId, b) {
    b = bal(b);
    var bld = state.buildings[buildingId];
    if (!bld || !defOf(buildingId)) return { ok: false, reason: 'unknown' };
    if (!isUnlocked(state, buildingId, b) || bld.level === 0) return { ok: false, reason: 'locked', unlockAt: unlockLevel(buildingId, b) };
    if (bld.level >= b.MAX_LEVEL) return { ok: false, reason: 'maxLevel' };
    // 中央炉以外は、中央炉のレベルを超えて強化できない
    if (buildingId !== 'furnace' && bld.level >= state.buildings.furnace.level) return { ok: false, reason: 'furnaceCap' };
    var cost = upgradeCost(buildingId, bld.level, b);
    var missing = {}, short = false;
    for (var r in cost) {
      var have = state.resources[r] || 0;
      if (have < cost[r]) { missing[r] = cost[r] - have; short = true; }
    }
    if (short) return { ok: false, reason: 'resources', cost: cost, missing: missing };
    return { ok: true, cost: cost };
  }

  // 強化する（即時完了）。{ ok, state, reason, unlocked: [FURNACE_UNLOCKS の項目] }
  function upgrade(state, buildingId, now, b) {
    b = bal(b);
    var can = canUpgrade(state, buildingId, b);
    if (!can.ok) return { ok: false, state: state, reason: can.reason, missing: can.missing };
    var s = FF.util.clone(state);
    for (var r in can.cost) s.resources[r] -= can.cost[r];
    s.buildings[buildingId].level++;
    var unlocked = [];
    if (buildingId === 'furnace') {
      applyUnlocks(s, now, b);
      var lv = s.buildings.furnace.level;
      unlocked = FF.defs.FURNACE_UNLOCKS.filter(function (u) { return u.level === lv; });
    }
    return { ok: true, state: s, unlocked: unlocked, cost: can.cost };
  }

  // 中央炉のレベルで解放済みなのに、まだお知らせを見ていない項目
  function pendingUnlockNotices(state) {
    var seen = state.flags.unlockNoticesSeen || [];
    var lv = state.buildings.furnace.level;
    return FF.defs.FURNACE_UNLOCKS.filter(function (u) {
      return u.level <= lv && seen.indexOf(u.id) < 0;
    });
  }

  function markUnlockNoticeSeen(state, id) {
    var s = Object.assign({}, state);
    var seen = (state.flags.unlockNoticesSeen || []).slice();
    if (seen.indexOf(id) < 0) seen.push(id);
    s.flags = Object.assign({}, state.flags, { unlockNoticesSeen: seen });
    return s;
  }

  // ---- 生産と受け取り ----

  // 1つの施設に貯まっている生産物（整数）。自動では資源に加えない。
  function pendingProduction(state, buildingId, now, b) {
    b = bal(b);
    var bld = state.buildings[buildingId];
    if (!bld || !bld.level || bld.lastCollectedAt == null) return 0;
    var elapsed = now - bld.lastCollectedAt;
    if (elapsed <= 0) return 0;   // 時計が戻っている
    var capMs = storageHours(state.buildings.housing.level, b) * HOUR;
    return Math.floor(productionPerHour(bld.level, b) * Math.min(elapsed, capMs) / HOUR);
  }

  // 資源ごとの未受け取り量 { wood: n, ... }
  function pendingAll(state, now, b) {
    var out = {};
    producers().forEach(function (d) {
      out[d.produces] = (out[d.produces] || 0) + pendingProduction(state, d.id, now, b);
    });
    return out;
  }

  // 保管の上限まで貯まっている施設があるか（画面の表示用）
  function isStorageFull(state, buildingId, now, b) {
    var bld = state.buildings[buildingId];
    if (!bld || !bld.level || bld.lastCollectedAt == null) return false;
    return now - bld.lastCollectedAt >= storageHours(state.buildings.housing.level, b) * HOUR;
  }

  // 「受け取り」：すべての生産施設の生産物を資源に加える。{ state, collected: { wood: n, ... } }
  // 上限に達していなければ、受け取った分の時間だけ lastCollectedAt を進める（端数の時間を失わない）。
  function collectAll(state, now, b) {
    b = bal(b);
    var s = FF.util.clone(state);
    var collected = {};
    var capMs = storageHours(s.buildings.housing.level, b) * HOUR;
    producers().forEach(function (d) {
      var bld = s.buildings[d.id];
      if (!bld.level || bld.lastCollectedAt == null) return;
      var elapsed = now - bld.lastCollectedAt;
      if (elapsed < 0) { bld.lastCollectedAt = now; return; }   // 時計が戻っていた
      var amount = pendingProduction(s, d.id, now, b);
      if (amount > 0) {
        s.resources[d.produces] = (s.resources[d.produces] || 0) + amount;
        collected[d.produces] = (collected[d.produces] || 0) + amount;
      }
      if (elapsed >= capMs) bld.lastCollectedAt = now;
      else if (amount > 0) bld.lastCollectedAt += Math.floor(amount * HOUR / productionPerHour(bld.level, b));
    });
    return { state: s, collected: collected };
  }

  // ---- 読み込み時の整合 ----
  // レベルを 0〜最大 に収め、中央炉を超える建物は中央炉に合わせ、解放済みの建物を Lv1 にする
  function normalizeBuildings(state, now, b) {
    b = bal(b);
    var s = FF.util.clone(state);
    var f = s.buildings.furnace;
    f.level = Math.max(1, Math.min(b.MAX_LEVEL, Math.floor(f.level) || 1));
    FF.defs.BUILDINGS.forEach(function (d) {
      if (d.id === 'furnace') return;
      var bld = s.buildings[d.id];
      var min = isUnlocked(s, d.id, b) ? 1 : 0;
      bld.level = Math.max(min, Math.min(f.level, Math.floor(bld.level) || 0));
      if (d.produces) {
        if (bld.level > 0 && typeof bld.lastCollectedAt !== 'number') bld.lastCollectedAt = now;
        if (bld.level === 0) bld.lastCollectedAt = null;
      }
    });
    return s;
  }

  FF.buildings = {
    defOf: defOf,
    sumCost: sumCost,
    upgradeCost: upgradeCost,
    storageHours: storageHours,
    productionPerHour: productionPerHour,
    unlockLevel: unlockLevel,
    isUnlocked: isUnlocked,
    canUpgrade: canUpgrade,
    upgrade: upgrade,
    pendingUnlockNotices: pendingUnlockNotices,
    markUnlockNoticeSeen: markUnlockNoticeSeen,
    pendingProduction: pendingProduction,
    pendingAll: pendingAll,
    isStorageFull: isStorageFull,
    collectAll: collectAll,
    normalizeBuildings: normalizeBuildings
  };
})(this);
