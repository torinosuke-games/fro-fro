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

  // 人口（判断355）：{ total, base, housing（住宅のぶん）, rescued（救出した旅人のぶん）, rescuedCount }
  function population(state, b) {
    b = bal(b);
    var P = b.POPULATION;
    var level = state && state.buildings && state.buildings.housing ? Math.max(1, state.buildings.housing.level) : 1;
    var adv = state && state.adventure, start = b.ADVENTURE.START_ALLIES;
    var count = adv && Array.isArray(adv.recruited) ? adv.recruited.filter(function (id) { return start.indexOf(id) < 0; }).length : 0;
    var housing = P.PER_HOUSING_LEVEL * (level - 1), rescued = P.PER_RESCUED * count;
    return { total: P.BASE + housing + rescued, base: P.BASE, housing: housing, rescued: rescued, rescuedCount: count };
  }

  // 人口による、生産の倍率（はじめは 1）
  function productionMultiplier(state, b) {
    var pop = population(state, b);
    return 1 + bal(b).POPULATION.BONUS_PER_PERSON * (pop.total - pop.base);
  }

  // mult：人口による倍率（省略すると 1）
  function productionPerHour(level, b, mult) {
    return Math.max(0, level) * bal(b).PRODUCTION_PER_LEVEL_PER_HOUR * (mult || 1);
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

  // ---- 強化の待ち時間（SPEC_v0.3 3章） ----
  // 工事中の建物は bld.construction = { toLevel, startedAt, endsAt }（ミリ秒）。工事中でなければ construction を持たない。
  // 完成するまでレベルは上がらない。

  // fromLevel → toLevel の工事にかかる時間（ミリ秒）
  function buildDurationMs(buildingId, toLevel, b) {
    var t = bal(b).BUILD_MINUTES;
    if (!t) return 0;
    var table = buildingId === 'furnace' ? t.furnace : t.other;
    return Math.round((table[toLevel] || 0) * 60 * 1000);
  }

  function constructionOf(state, buildingId) {
    var bld = state.buildings[buildingId];
    return bld && bld.construction ? bld.construction : null;
  }

  // 完成までの残りミリ秒（工事中でなければ null）
  function constructionRemainingMs(state, buildingId, now) {
    var c = constructionOf(state, buildingId);
    if (!c) return null;
    return Math.max(0, Math.min(c.endsAt - now, c.endsAt - c.startedAt));
  }

  // 時刻 now までに終わった工事を完成させる。{ state, completed: [{ id, level, unlocked }] }
  // 中央炉が完成したら、新しく解放された建物を Lv1 にする（生産は完成した時刻から）。
  // 端末の時計が戻って開始時刻より前になっていたら、残り時間が工事の時間を超えないように開始時刻を今にする。
  function completeConstructions(state, now, b) {
    b = bal(b);
    var ids = FF.defs.BUILDINGS.map(function (d) { return d.id; }).filter(function (id) { return constructionOf(state, id); });
    if (!ids.length) return { state: state, completed: [] };
    var s = FF.util.clone(state), completed = [], changed = false;
    ids.sort(function (x, y) { return s.buildings[x].construction.endsAt - s.buildings[y].construction.endsAt; });
    ids.forEach(function (id) {
      var bld = s.buildings[id], c = bld.construction;
      if (now < c.startedAt) {
        var dur = c.endsAt - c.startedAt;
        bld.construction = { toLevel: c.toLevel, startedAt: now, endsAt: now + dur };
        changed = true;
        return;
      }
      if (now < c.endsAt) return;
      bld.level = c.toLevel;
      delete bld.construction;
      var unlocked = [];
      if (id === 'furnace') {
        applyUnlocks(s, c.endsAt, b);
        unlocked = FF.defs.FURNACE_UNLOCKS.filter(function (u) { return u.level === c.toLevel; });
      }
      completed.push({ id: id, level: c.toLevel, unlocked: unlocked });
      changed = true;
    });
    // 何も変わらなければ元の状態をそのまま返す（1秒ごとに呼ばれるので、むだな保存をしない）
    return { state: changed ? s : state, completed: completed };
  }

  // ---- 強化 ----

  // { ok, reason: 'unknown' | 'locked' | 'building' | 'maxLevel' | 'furnaceCap' | 'resources', cost, missing }
  function canUpgrade(state, buildingId, b) {
    b = bal(b);
    var bld = state.buildings[buildingId];
    if (!bld || !defOf(buildingId)) return { ok: false, reason: 'unknown' };
    if (!isUnlocked(state, buildingId, b) || bld.level === 0) return { ok: false, reason: 'locked', unlockAt: unlockLevel(buildingId, b) };
    if (bld.construction) return { ok: false, reason: 'building' };
    if (bld.level >= b.MAX_LEVEL) return { ok: false, reason: 'maxLevel' };
    // 中央炉以外は、中央炉のレベルを超えて強化できない
    // 中央炉が工事中なら、その完成を待つように知らせる（SPEC_v0.3 3章）
    if (buildingId !== 'furnace' && bld.level >= state.buildings.furnace.level) {
      return { ok: false, reason: state.buildings.furnace.construction ? 'furnaceBuilding' : 'furnaceCap' };
    }
    var cost = upgradeCost(buildingId, bld.level, b);
    var missing = {}, short = false;
    for (var r in cost) {
      var have = state.resources[r] || 0;
      if (have < cost[r]) { missing[r] = cost[r] - have; short = true; }
    }
    if (short) return { ok: false, reason: 'resources', cost: cost, missing: missing };
    return { ok: true, cost: cost };
  }

  // 強化を始める：資源を使い、工事を開始する（SPEC_v0.3 3章）。完成は completeConstructions で行う。
  // 工事の時間が 0 のときは、その場で完成させる。
  // { ok, state, reason, cost, toLevel, endsAt, completed: [completeConstructions の completed] }
  function upgrade(state, buildingId, now, b) {
    b = bal(b);
    var can = canUpgrade(state, buildingId, b);
    if (!can.ok) return { ok: false, state: state, reason: can.reason, missing: can.missing };
    var s = FF.util.clone(state);
    for (var r in can.cost) s.resources[r] -= can.cost[r];
    var toLevel = s.buildings[buildingId].level + 1;
    var endsAt = now + buildDurationMs(buildingId, toLevel, b);
    s.buildings[buildingId].construction = { toLevel: toLevel, startedAt: now, endsAt: endsAt };
    var done = endsAt <= now ? completeConstructions(s, now, b) : { state: s, completed: [] };
    return { ok: true, state: done.state, cost: can.cost, toLevel: toLevel, endsAt: endsAt, completed: done.completed };
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
    return Math.floor(productionPerHour(bld.level, b, productionMultiplier(state, b)) * Math.min(elapsed, capMs) / HOUR);
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

  // 1つの施設の受け取り（s をその場で書きかえる）。上限に達していなければ、受け取った分の時間だけ lastCollectedAt を進める（端数の時間を失わない）
  function collectInto(s, d, now, b, collected) {
    var bld = s.buildings[d.id];
    if (!bld.level || bld.lastCollectedAt == null) return;
    var capMs = storageHours(s.buildings.housing.level, b) * HOUR;
    var elapsed = now - bld.lastCollectedAt;
    if (elapsed < 0) { bld.lastCollectedAt = now; return; }   // 時計が戻っていた
    var amount = pendingProduction(s, d.id, now, b);
    if (amount > 0) {
      s.resources[d.produces] = (s.resources[d.produces] || 0) + amount;
      collected[d.produces] = (collected[d.produces] || 0) + amount;
    }
    if (elapsed >= capMs) bld.lastCollectedAt = now;
    else if (amount > 0) bld.lastCollectedAt += Math.floor(amount * HOUR / productionPerHour(bld.level, b, productionMultiplier(s, b)));
  }

  // 「受け取り」：すべての生産施設の生産物を資源に加える。{ state, collected: { wood: n, ... } }
  function collectAll(state, now, b) {
    b = bal(b);
    var s = FF.util.clone(state);
    var collected = {};
    producers().forEach(function (d) { collectInto(s, d, now, b, collected); });
    return { state: s, collected: collected };
  }

  // 1つの施設だけ受け取る（基地の絵の吹き出し。判断196）。生産施設でなければ何もしない。{ state, collected }
  function collectOne(state, buildingId, now, b) {
    b = bal(b);
    var s = FF.util.clone(state);
    var collected = {};
    var d = producers().filter(function (x) { return x.id === buildingId; })[0];
    if (d) collectInto(s, d, now, b, collected);
    return { state: s, collected: collected };
  }

  // 保管の上限に対する貯まり具合（0〜1。画面の吹き出しの大きさ用）
  function storageRatio(state, buildingId, now, b) {
    b = bal(b);
    var bld = state.buildings[buildingId];
    if (!bld || !bld.level || bld.lastCollectedAt == null) return 0;
    var capMs = storageHours(state.buildings.housing.level, b) * HOUR;
    return Math.max(0, Math.min(1, (now - bld.lastCollectedAt) / capMs));
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
    // 工事中の記録（v0.3）：形が正しく（工事中でなければ construction を持たない）、今のレベルの次の段階で、中央炉の上限を超えないものだけ残す
    FF.defs.BUILDINGS.forEach(function (d) {
      var bld = s.buildings[d.id], c = bld.construction;
      var valid = FF.util.isPlainObject(c) &&
        typeof c.startedAt === 'number' && typeof c.endsAt === 'number' && isFinite(c.startedAt) && isFinite(c.endsAt) &&
        c.endsAt >= c.startedAt && c.toLevel === bld.level + 1 && bld.level >= 1 && c.toLevel <= b.MAX_LEVEL &&
        (d.id === 'furnace' || c.toLevel <= f.level);
      if (valid) bld.construction = { toLevel: c.toLevel, startedAt: c.startedAt, endsAt: c.endsAt };
      else delete bld.construction;
    });
    return s;
  }

  FF.buildings = {
    defOf: defOf,
    sumCost: sumCost,
    upgradeCost: upgradeCost,
    storageHours: storageHours,
    productionPerHour: productionPerHour,
    population: population,
    productionMultiplier: productionMultiplier,
    unlockLevel: unlockLevel,
    isUnlocked: isUnlocked,
    canUpgrade: canUpgrade,
    upgrade: upgrade,
    buildDurationMs: buildDurationMs,
    constructionOf: constructionOf,
    constructionRemainingMs: constructionRemainingMs,
    completeConstructions: completeConstructions,
    pendingUnlockNotices: pendingUnlockNotices,
    markUnlockNoticeSeen: markUnlockNoticeSeen,
    pendingProduction: pendingProduction,
    collectOne: collectOne,
    storageRatio: storageRatio,
    pendingAll: pendingAll,
    isStorageFull: isStorageFull,
    collectAll: collectAll,
    normalizeBuildings: normalizeBuildings
  };
})(this);
