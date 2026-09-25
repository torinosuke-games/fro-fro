// バランスシミュレーター（SPEC 9.5）。デバッグ画面と tests/simulate.js で共有する純粋関数。
//
// モデル：
// - 1日 minutesPerDay 分プレイする。到達時間は「プレイ時間の合計」で測る。
// - 強化の順番：中央炉を1つ上げたら、ほかの建物を同じレベルまで上げる（生産施設 → 住宅）。
// - 毎回「次の強化で最も不足している資源」を選んで学習する。買えるようになったら即強化。
// - 報酬は期待値で加算する。正答率倍率は直近10問が二項分布に従うとして厳密に期待値をとる。
// - 4択はチケットがある間だけ。切れたら同じ学年・難易度の自由入力に切り替える。
// - 自由入力は最大3回。各回の正答率は accuracy、再回答には retrySecRatio × 1問の秒数かかる。
// - 生産物は各プレイ日の開始時に受け取る（collectsPerDay 回に分けて受け取ったとみなす）。
// - ヒント・反復・重点教科は使わない（倍率 1.0）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }

  var PRODUCERS_ORDER = ['lumber', 'mine', 'quarry', 'foodhall'];
  var OTHERS_ORDER = ['lumber', 'mine', 'quarry', 'foodhall', 'housing'];

  function binomPmf(n, k, p) {
    var c = 1;
    for (var i = 1; i <= k; i++) c = c * (n - k + i) / i;
    return c * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  function makeRecent(ones, total) {
    var r = [];
    for (var i = 0; i < total; i++) r.push(i < ones ? 1 : 0);
    return r;
  }

  // 1問あたりの期待報酬と期待時間（秒）。
  // windowSize: 直近の記録件数（定常状態なら WINDOW）
  function expectedPerQuestion(o, b) {
    b = bal(b);
    var W = o.windowSize == null ? b.ACCURACY.WINDOW : o.windowSize;
    var p = o.accuracy;
    var A = o.answerType === 'input' ? b.INPUT_MAX_ATTEMPTS : 1;
    var solve = 1 - Math.pow(1 - p, A);   // 学習記録上の正答率
    var reward = 0;
    for (var x = 0; x <= W; x++) {
      var w = binomPmf(W, x, solve);
      if (w === 0) continue;
      var recent = makeRecent(x, W);
      for (var i = 1; i <= A; i++) {
        var pi = Math.pow(1 - p, i - 1) * p;
        reward += w * pi * FF.rewards.calcReward({
          grade: o.grade, difficulty: o.difficulty, answerType: o.answerType,
          hintsUsed: 0, attempt: i, repeatCount: 0,
          facilityLevel: o.facilityLevel || 0, isFocusSubject: !!o.isFocusSubject,
          recent: recent
        }, b);
      }
    }
    var sec = o.secPerQuestion;
    if (o.answerType === 'input') {
      var retry = o.retrySecRatio == null ? b.SIM_DEFAULTS.retrySecRatio : o.retrySecRatio;
      for (var j = 1; j < A; j++) sec += o.secPerQuestion * retry * Math.pow(1 - p, j);
    }
    return { reward: reward, sec: sec };
  }

  function buildPlan(b) {
    var plan = [];
    for (var L = 1; L < b.MAX_LEVEL; L++) {
      plan.push({ id: 'furnace', to: L + 1 });
      for (var i = 0; i < OTHERS_ORDER.length; i++) plan.push({ id: OTHERS_ORDER[i], to: L + 1 });
    }
    return plan;
  }

  function producerOf(resId) {
    var list = FF.defs.BUILDINGS;
    for (var i = 0; i < list.length; i++) if (list[i].produces === resId) return list[i].id;
    return null;
  }

  // profile: { grade, difficulty, format, secPerQuestion, accuracy }
  // options: SIM_DEFAULTS の上書き
  function run(profile, options, b) {
    b = bal(b);
    var opt = Object.assign({}, b.SIM_DEFAULTS, options || {});
    var sessionSec = opt.minutesPerDay * 60;
    var recoverSec = b.TICKET_RECOVER_MS / 1000;

    var res = Object.assign({}, b.INITIAL_RESOURCES);
    var lv = { furnace: 1, housing: 1, lumber: 1, mine: 1, quarry: 0, foodhall: 1 };
    var plan = buildPlan(b);
    var step = 0;
    var play = 0, learned = 0, produced = 0, questions = 0, choiceCount = 0;
    var milestones = { furnace2: null, furnace3: null, all5: null };
    var tickets = b.TICKET_MAX, ticketAccum = 0;
    var memo = {};

    function expected(type, facilityLevel) {
      var key = type + ':' + facilityLevel;
      if (!memo[key]) {
        memo[key] = expectedPerQuestion({
          grade: profile.grade, difficulty: profile.difficulty, answerType: type,
          secPerQuestion: profile.secPerQuestion, accuracy: profile.accuracy,
          facilityLevel: facilityLevel, retrySecRatio: opt.retrySecRatio
        }, b);
      }
      return memo[key];
    }

    function tryUpgrades(now) {
      while (step < plan.length) {
        var s = plan[step];
        var cost = FF.buildings.upgradeCost(s.id, s.to - 1, b);
        for (var r in cost) if (res[r] < cost[r]) return false;
        for (var r2 in cost) res[r2] -= cost[r2];
        lv[s.id] = s.to;
        if (s.id === 'furnace') {
          if (s.to >= b.BUILDING_UNLOCK_FURNACE_LEVEL.quarry && lv.quarry === 0) lv.quarry = 1;
          if (s.to === 2) milestones.furnace2 = now;
          if (s.to === 3) milestones.furnace3 = now;
        }
        step++;
      }
      milestones.all5 = now;
      return true;
    }

    for (var day = 0; day < 5000; day++) {
      if (day > 0) {
        var hours = Math.min(24, opt.collectsPerDay * Math.min(24 / opt.collectsPerDay, FF.buildings.storageHours(lv.housing, b)));
        for (var i = 0; i < PRODUCERS_ORDER.length; i++) {
          var amount = Math.floor(FF.buildings.productionPerHour(lv[PRODUCERS_ORDER[i]], b) * hours);
          var resId = FF.defs.BUILDINGS.filter(function (d) { return d.id === PRODUCERS_ORDER[i]; })[0].produces;
          res[resId] += amount;
          produced += amount;
        }
        tickets = b.TICKET_MAX;   // 24時間近く離れていれば満タン
        ticketAccum = 0;
      }
      var t = 0;
      while (t < sessionSec) {
        if (tryUpgrades((play + t) / 60)) {
          return finish();
        }
        var cost = FF.buildings.upgradeCost(plan[step].id, plan[step].to - 1, b);
        var pick = null, worst = -Infinity;
        for (var r in cost) {
          var deficit = cost[r] - res[r];
          if (deficit > worst) { worst = deficit; pick = r; }
        }
        var type = profile.format === 'choice' && tickets >= 1 ? 'choice' : 'input';
        var e = expected(type, lv[producerOf(pick)] || 0);
        if (type === 'choice') {
          if (tickets === b.TICKET_MAX) ticketAccum = 0;
          tickets--;
          choiceCount++;
        }
        res[pick] += e.reward;
        learned += e.reward;
        questions++;
        t += e.sec;
        if (tickets < b.TICKET_MAX) {
          ticketAccum += e.sec;
          while (ticketAccum >= recoverSec && tickets < b.TICKET_MAX) { tickets++; ticketAccum -= recoverSec; }
        }
      }
      play += t;
    }
    return finish();

    function finish() {
      return {
        milestones: milestones,        // 分（プレイ時間）
        days: day + 1,
        questions: questions,
        choiceShare: questions ? choiceCount / questions : 0,
        learned: Math.round(learned),
        produced: produced,
        productionShare: produced / (produced + learned)
      };
    }
  }

  // 当てずっぽうの期待値：正解率 pGuess で4択に答え続けたときの、i 問目（0始まり）の期待獲得量。
  // 直近の記録は i 件（最大 WINDOW 件）で、各記録は確率 pGuess で正解。
  function guessExpectation(o, b) {
    b = bal(b);
    var W = b.ACCURACY.WINDOW;
    var perAnswer = [];
    for (var i = 0; i < o.answers; i++) {
      var n = Math.min(i, W);
      var e = 0;
      for (var x = 0; x <= n; x++) {
        e += binomPmf(n, x, o.pGuess) * o.pGuess * FF.rewards.calcReward({
          grade: o.grade, difficulty: o.difficulty, answerType: 'choice',
          hintsUsed: 0, attempt: 1, repeatCount: 0,
          facilityLevel: o.facilityLevel || 0, isFocusSubject: !!o.isFocusSubject,
          recent: makeRecent(x, n)
        }, b);
      }
      perAnswer.push(e);
    }
    function avgFirst(k) {
      var s = 0;
      for (var j = 0; j < k; j++) s += perAnswer[j];
      return s / k;
    }
    return { perAnswer: perAnswer, steady: perAnswer[perAnswer.length - 1], avgFirst: avgFirst };
  }

  FF.simulator = {
    binomPmf: binomPmf,
    expectedPerQuestion: expectedPerQuestion,
    buildPlan: buildPlan,
    run: run,
    guessExpectation: guessExpectation
  };
})(this);
