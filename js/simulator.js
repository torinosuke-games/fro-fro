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
// - 強化には工事の待ち時間がある（SPEC_v0.3 3章、balance.js の BUILD_MINUTES）。資源は着工時に払い、実時間で完成する。
//   1日は24時間で、プレイしていない間（24時間 − minutesPerDay）も工事は進む。複数の建物を同時に工事できる。
//   中央炉の上限・採石場の解放・到達時間は「完成」で数える（完成に気づいたプレイ時間。プレイしていない間に完成したら次の日の開始時）。
//   工事の完成待ちで次の強化に進めない間は、その先の強化の資源を学習でためる。先の強化の資源まですべて足りていたら
//   完成を待つ（その日のプレイ時間内に完成するなら待つ時間もプレイ時間に数え、完成しないならその日はやめる）。
//   options.buildTimeScale で待ち時間を何倍にするか（0 で待ち時間なし＝v0.2 までと同じ）。
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

  // ---- 戦闘（v0.3 その2、DESIGN 13.4・13.11） ----
  // 1回の挑戦：正解 need 回で勝ち、まちがい lose 回で負け。各回答の正答率 p。
  // { win: 勝つ確率, answers: 挑戦が終わるまでの回答数の期待値 }
  function battleAttempt(need, lose, p) {
    function C(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; }
    var win = 0, answers = 0;
    for (var k = 0; k < lose; k++) {             // k 回まちがえて勝つ
      var pw = C(need - 1 + k, k) * Math.pow(p, need) * Math.pow(1 - p, k);
      win += pw; answers += pw * (need + k);
    }
    for (var j = 0; j < need; j++) {             // j 回正解して負ける
      var pl = C(lose - 1 + j, j) * Math.pow(1 - p, lose) * Math.pow(p, j);
      answers += pl * (lose + j);
    }
    return { win: win, answers: answers };
  }

  // 敵に勝つまで挑み続けたときの期待値。{ attempts: 挑戦の回数, answers: 回答の総数, firstWin: 1回目で勝つ確率 }
  // ボスは負けるたびに必要な正解の数が減る（battle.js の startHp と同じ式。上限の回数以降は同じ）
  function battleExpect(enemyId, p, b) {
    b = bal(b);
    var bt = b.BATTLE, st = bt.ENEMIES[enemyId], def = FF.defs.ENEMIES[enemyId];
    var need0 = Math.ceil(st.hp / bt.DAMAGE_PER_CORRECT), lose = Math.ceil(bt.PLAYER_HP / st.attack);
    var cap = def.boss ? Math.round(bt.BOSS_MERCY_MAX / bt.BOSS_MERCY_STEP) : 0;
    var alive = 1, attempts = 0, answers = 0, firstWin = null;
    for (var i = 0; ; i++) {
      var need = need0 - (def.boss ? Math.round(need0 * Math.min(bt.BOSS_MERCY_MAX, i * bt.BOSS_MERCY_STEP)) : 0);
      var a = battleAttempt(need, lose, p);
      if (firstWin === null) firstWin = a.win;
      if (i >= cap) {                            // ここから先は同じ条件のくり返し（幾何分布）
        attempts += alive / a.win;
        answers += alive * a.answers / a.win;
        break;
      }
      attempts += alive;
      answers += alive * a.answers;
      alive *= 1 - a.win;
    }
    return { attempts: attempts, answers: answers, firstWin: firstWin };
  }

  // 地域ごとの「地点を1つ進むごとの時間と報酬（期待値）」の列
  // v0.3 その2：寄り道の敵は隣の地点に着いた直後に、ボスは最後に戦う（opt.battles が false なら戦わない）。
  // 戦闘の1回の回答は、1問の秒数ぶんかかるとみなす（書き問題のやり直しは実際はもっと短いので、時間は多めに見積もる）
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
      var battles = opt.battles !== false;
      function battleItem(enemyId) {
        var e = battleExpect(enemyId, profile.accuracy, b);
        return { sec: e.answers * sec * scale, reward: Object.assign({}, b.BATTLE.REWARDS[enemyId]), battle: enemyId, attempts: e.attempts, firstWin: e.firstWin };
      }
      var gate = FF.exploration.gateIndex(r.id);
      var items = [];
      route.slice(1).forEach(function (n, idx) {
        if (n.kind === 'boss') { if (battles) items.push(battleItem(n.enemy)); return; }
        var reward = {};
        if (n.kind === 'chest') reward = Object.assign({}, b.EXPLORE.CHESTS[n.chest]);
        if (n.kind === 'event') reward = Object.assign({}, eventReward);
        items.push({ sec: perNode, reward: reward, gate: idx + 1 === gate });
        if (battles) r.nodes.filter(function (x) { return x.kind === 'enemy' && x.adjacent === n.id && x.reachable; })
          .forEach(function (x) { items.push(battleItem(x.enemy)); });
      });
      return {
        id: r.id, requires: r.requires, unlockFurnace: b.EXPLORE.UNLOCK_FURNACE_LEVEL[r.id] || 1,
        grade: grade, secPerQuestion: sec,
        nodes: items
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
    // 工事（SPEC_v0.3 3章）
    var buildScale = opt.buildTimeScale == null ? 1 : opt.buildTimeScale;
    var pending = [];   // { id, to, endsAt（実時間の秒） }
    var waitSec = 0;    // 完成待ちでプレイ時間に数えた秒数
    var maxParallel = 0;
    var lastDone = 0;   // 最後に完成した工事のプレイ時間（分）
    // 探索
    var ex = opt.explore ? explorePlan(profile, opt, b) : null;
    var exPos = {}, exDone = {}, exGate = {}, exploreSec = 0, exploreNodes = 0, exploreTickets = 0, exploreRes = 0;
    var exploreMilestones = {};
    var battleSec = 0, battleCount = 0, battleRes = 0, battleTickets = 0, battleAttempts = 0;
    function nextExploreRegion() {
      if (!ex) return null;
      for (var i = 0; i < ex.length; i++) {
        var r = ex[i];
        if (exDone[r.id]) continue;
        if (lv.furnace < r.unlockFurnace) continue;
        if (r.requires && !exGate[r.requires]) continue;   // 前の地域のボスの手前まで進めば開く（v0.3 その2）
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

    // 実時間 realNow までに終わる工事を完成させる。now はそのときのプレイ時間（分）。
    // 到達時間は完成した時点のプレイ時間（今日のプレイ中に完成したらその時点、プレイしていない間ならその日の開始時）
    function completeDue(realNow, now, dayStart) {
      pending.sort(function (x, y) { return x.endsAt - y.endsAt; });
      while (pending.length && pending[0].endsAt <= realNow) {
        var c = pending.shift();
        var at = Math.max(now - (realNow - Math.max(c.endsAt, dayStart)) / 60, play / 60);
        lv[c.id] = c.to;
        if (c.id === 'furnace') {
          if (c.to >= b.BUILDING_UNLOCK_FURNACE_LEVEL.quarry && lv.quarry === 0) lv.quarry = 1;
          if (c.to === 2) milestones.furnace2 = at;
          if (c.to === 3) milestones.furnace3 = at;
        }
        lastDone = at;
      }
    }
    // 次の強化に着工できるか：前の工事が完成している、ほかの建物は完成した中央炉のレベルまで
    function startable(s) {
      if (lv[s.id] !== s.to - 1) return false;
      if (s.id !== 'furnace' && lv.furnace < s.to) return false;
      return true;
    }
    // 着工できるだけ着工する。すべて完成していれば true
    function tryUpgrades(realNow, now, dayStart) {
      completeDue(realNow, now, dayStart);
      while (step < plan.length) {
        var s = plan[step];
        if (!startable(s)) break;
        var cost = FF.buildings.upgradeCost(s.id, s.to - 1, b);
        var ok = true;
        for (var r in cost) if (res[r] < cost[r]) ok = false;
        if (!ok) break;
        for (var r2 in cost) res[r2] -= cost[r2];
        pending.push({ id: s.id, to: s.to, endsAt: realNow + FF.buildings.buildDurationMs(s.id, s.to, b) / 1000 * buildScale });
        maxParallel = Math.max(maxParallel, pending.length);
        step++;
        completeDue(realNow, now, dayStart);   // 待ち時間 0 ならすぐ完成
      }
      if (step >= plan.length && pending.length === 0) {
        milestones.all5 = step > 0 ? lastDone : now;
        return true;
      }
      return false;
    }
    // 学習でためる資源：次の強化から順に費用を足し、最初に足りなくなったところで最も不足している資源。すべて足りていれば null
    function studyTarget() {
      var cum = {};
      for (var j = step; j < plan.length; j++) {
        var c = FF.buildings.upgradeCost(plan[j].id, plan[j].to - 1, b);
        for (var r in c) cum[r] = (cum[r] || 0) + c[r];
        var pick = null, worst = 0;
        for (var r2 in cum) {
          var deficit = cum[r2] - res[r2];
          if (deficit > worst) { worst = deficit; pick = r2; }
        }
        if (pick) return pick;
      }
      return null;
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
      var t = 0, dayStart = day * 86400;
      while (t < sessionSec) {
        if (tryUpgrades(dayStart + t, (play + t) / 60, dayStart)) {
          return finish();
        }
        var region = nextExploreRegion();
        if (region) {
          var i0 = exPos[region.id] || 0;
          var node = region.nodes[i0];
          t += node.sec;
          exploreSec += node.sec;
          if (node.battle) { battleSec += node.sec; battleCount++; battleAttempts += node.attempts; }
          else exploreNodes++;
          if (node.gate) exGate[region.id] = true;
          for (var k in node.reward) {
            if (k === 'tickets') { tickets += node.reward[k]; exploreTickets += node.reward[k]; if (node.battle) battleTickets += node.reward[k]; }
            else { res[k] += node.reward[k]; exploreRes += node.reward[k]; if (node.battle) battleRes += node.reward[k]; }
          }
          exPos[region.id] = i0 + 1;
          if (exPos[region.id] >= region.nodes.length) {
            exDone[region.id] = true;
            exGate[region.id] = true;
            exploreMilestones[region.id] = (play + t) / 60;
          }
          passTime(node.sec);
          continue;
        }
        var pick = studyTarget();
        if (!pick) {
          // 資源は足りていて、工事の完成を待つだけ
          var next = pending.reduce(function (m, c) { return Math.min(m, c.endsAt); }, Infinity);
          var wait = next - (dayStart + t);
          if (t + wait <= sessionSec) { t += wait; waitSec += wait; passTime(wait); continue; }
          break;   // 今日のプレイ時間内には完成しないので、今日はやめる
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
        build: { waitMinutes: waitSec / 60, maxParallel: maxParallel },   // 完成待ちでプレイ時間に数えた分、同時に工事した最大数
        explore: ex ? {
          minutes: exploreSec / 60,             // 探索に使ったプレイ時間（戦闘を含む）
          nodes: exploreNodes,                  // 問題に正解して進んだ地点の数（戦闘は含まない）
          resources: Math.round(exploreRes),    // 宝箱・イベント・戦闘の初回の報酬で得た資源（期待値）
          tickets: exploreTickets,
          battle: { count: battleCount, minutes: battleSec / 60, attempts: battleAttempts, resources: Math.round(battleRes), tickets: battleTickets },
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
    battleAttempt: battleAttempt,
    battleExpect: battleExpect,
    guessExpectation: guessExpectation
  };
})(this);
