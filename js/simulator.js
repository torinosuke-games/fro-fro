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
// - options.explore が true なら探索（v0.2）も行う（explorePlan を参照）。地域が開いたら、学習より先に探索を進める。
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

  // ---- 探索（v0.2） ----
  // 学年 → 1問の秒数。SIM_PROFILES（SPEC 8.3 の想定解答時間）の点を直線でつなぐ
  function secForGrade(grade, b) {
    var pts = Object.keys(b.SIM_PROFILES).map(function (k) { return b.SIM_PROFILES[k]; })
      .map(function (p) { return [p.grade, p.secPerQuestion]; }).sort(function (x, y) { return x[0] - y[0]; });
    if (grade <= pts[0][0]) return pts[0][1];
    for (var i = 1; i < pts.length; i++) {
      if (grade <= pts[i][0]) {
        var a = pts[i - 1], c = pts[i];
        return a[1] + (c[1] - a[1]) * (grade - a[0]) / (c[0] - a[0]);
      }
    }
    return pts[pts.length - 1][1];
  }

  // 探索で出る学年の期待値（exploration.js と同じ重み：推奨範囲内 inRange、範囲外 outOfRange、1〜解放済みの学年）
  function exploreGrade(region, topGrade, b) {
    var w = b.EXPLORE.GRADE_WEIGHT, sum = 0, wsum = 0;
    for (var g = 1; g <= topGrade; g++) {
      var x = g >= region.grades[0] && g <= region.grades[1] ? w.inRange : w.outOfRange;
      sum += g * x; wsum += x;
    }
    return sum / wsum;
  }

  // 1地点進むのにかかる時間の期待値（秒）。
  // 最初の問題は確率 CHOICE_SHARE で4択。4択をまちがえたら、その地点は自由入力だけ（DESIGN 12.6）。
  // 自由入力は最大3回。3回まちがえたら別の問題でやり直し。
  function exploreSecPerNode(sec, p, b, retryRatio) {
    var A = b.INPUT_MAX_ATTEMPTS;
    var inputSec = sec;
    for (var j = 1; j < A; j++) inputSec += sec * retryRatio * Math.pow(1 - p, j);
    var solve = 1 - Math.pow(1 - p, A);
    var untilInputSolved = inputSec / solve;                 // 自由入力だけで正解するまで
    var c = b.EXPLORE.CHOICE_SHARE;
    var perCorrect = c * (sec + (1 - p) * untilInputSolved) + (1 - c) * untilInputSolved;
    return perCorrect * b.EXPLORE.CORRECT_PER_NODE;
  }

  // 地域ごとの「地点を1つ進むごとの時間と報酬（期待値）」の列
  function explorePlan(profile, opt, b) {
    var top = Math.max(profile.grade, b.INITIAL_UNLOCKED_GRADE);
    var retry = opt.retrySecRatio == null ? b.SIM_DEFAULTS.retrySecRatio : opt.retrySecRatio;
    var scale = opt.exploreTimeScale == null ? 1 : opt.exploreTimeScale;
    return FF.defs.REGIONS.map(function (r) {
      var grade = exploreGrade(r, top, b);
      var sec = secForGrade(grade, b);
      var perNode = exploreSecPerNode(sec, profile.accuracy, b, retry) * scale;
      var route = FF.exploration.route(r.id);
      var eventNodes = route.filter(function (n) { return n.kind === 'event'; }).length;
      var drawP = Math.min(1, eventNodes / r.events.length);   // 各イベントが出る確率（重複なしの抽選）
      var eventReward = {};
      r.events.forEach(function (id) {
        var rw = b.EXPLORE.EVENT_REWARDS[id];
        for (var k in rw || {}) eventReward[k] = (eventReward[k] || 0) + rw[k] * drawP / eventNodes;
      });
      return {
        id: r.id, requires: r.requires, unlockFurnace: b.EXPLORE.UNLOCK_FURNACE_LEVEL[r.id] || 1,
        grade: grade, secPerQuestion: sec,
        nodes: route.slice(1).map(function (n) {
          var reward = {};
          if (n.kind === 'chest') reward = Object.assign({}, b.EXPLORE.CHESTS[n.chest]);
          if (n.kind === 'event') reward = Object.assign({}, eventReward);
          return { sec: perNode, reward: reward };
        })
      };
    });
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
    // 探索
    var ex = opt.explore ? explorePlan(profile, opt, b) : null;
    var exPos = {}, exDone = {}, exploreSec = 0, exploreNodes = 0, exploreTickets = 0, exploreRes = 0;
    var exploreMilestones = {};
    function nextExploreRegion() {
      if (!ex) return null;
      for (var i = 0; i < ex.length; i++) {
        var r = ex[i];
        if (exDone[r.id]) continue;
        if (lv.furnace < r.unlockFurnace) continue;
        if (r.requires && !exDone[r.requires]) continue;
        return r;
      }
      return null;
    }
    // 経過時間ぶんチケットを回復する（20枚以上の間は回復しない）
    function passTime(sec) {
      if (tickets < b.TICKET_MAX) {
        ticketAccum += sec;
        while (ticketAccum >= recoverSec && tickets < b.TICKET_MAX) { tickets++; ticketAccum -= recoverSec; }
      }
    }

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
        tickets = Math.max(tickets, b.TICKET_MAX);   // 24時間近く離れていれば満タン（宝箱で20枚を超えていればそのまま）
        ticketAccum = 0;
      }
      var t = 0;
      while (t < sessionSec) {
        if (tryUpgrades((play + t) / 60)) {
          return finish();
        }
        var region = nextExploreRegion();
        if (region) {
          var i0 = exPos[region.id] || 0;
          var node = region.nodes[i0];
          t += node.sec;
          exploreSec += node.sec;
          exploreNodes++;
          for (var k in node.reward) {
            if (k === 'tickets') { tickets += node.reward[k]; exploreTickets += node.reward[k]; }
            else { res[k] += node.reward[k]; exploreRes += node.reward[k]; }
          }
          exPos[region.id] = i0 + 1;
          if (exPos[region.id] >= region.nodes.length) {
            exDone[region.id] = true;
            exploreMilestones[region.id] = (play + t) / 60;
          }
          passTime(node.sec);
          continue;
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
        passTime(e.sec);
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
        productionShare: produced / (produced + learned),
        explore: ex ? {
          minutes: exploreSec / 60,             // 探索に使ったプレイ時間
          nodes: exploreNodes,
          resources: Math.round(exploreRes),    // 宝箱とイベントで得た資源（期待値）
          tickets: exploreTickets,
          completedAt: exploreMilestones,       // 地域を 100% にしたプレイ時間（分）
          regions: ex.map(function (r) { return { id: r.id, grade: r.grade, secPerQuestion: r.secPerQuestion, secPerNode: r.nodes[0].sec }; })
        } : null
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
    secForGrade: secForGrade,
    exploreGrade: exploreGrade,
    exploreSecPerNode: exploreSecPerNode,
    explorePlan: explorePlan,
    guessExpectation: guessExpectation
  };
})(this);
