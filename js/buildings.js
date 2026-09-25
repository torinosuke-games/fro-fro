// 建物（SPEC 第9章）。純粋関数のみ。
// フェーズ2ではコストと生産量の計算だけ。強化・受け取りなどはフェーズ5で追加する。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }

  function sumCost(cost) {
    var s = 0;
    for (var k in cost) s += cost[k];
    return s;
  }

  // fromLevel → fromLevel+1 の強化コスト。{ wood: n, ... }（0 の資源は含めない）
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

  FF.buildings = {
    sumCost: sumCost,
    upgradeCost: upgradeCost,
    storageHours: storageHours,
    productionPerHour: productionPerHour
  };
})(this);
