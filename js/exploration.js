// 探索（v0.2、SPEC_v0.2）：地域の解放、進行、出題の選択、宝箱、イベント、読み込み時の整合。純粋関数のみ。
// v0.3 その2：順路の最後のボス（kind: 'boss'）と、寄り道の敵（kind: 'enemy'）。戦闘そのものは js/battle.js。
// 探索の回答は学習の記録・反復記録・チケットの消費に一切触れない（FF.learning.submitAnswer は呼ばない）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  function E(b) { return bal(b).EXPLORE; }

  // ---- 定義 ----
  function regionDef(regionId) {
    return FF.defs.REGIONS.filter(function (r) { return r.id === regionId; })[0] || null;
  }

  function nodeDef(regionId, nodeId) {
    var r = regionDef(regionId);
    return r ? r.nodes.filter(function (n) { return n.id === nodeId; })[0] || null : null;
  }

  // 順路：start から next をたどった地点の配列（寄り道の敵地点は含まない。ボスは最後に含む）
  var routeCache = {};
  function route(regionId) {
    var r = regionDef(regionId);
    if (!r) return [];
    if (routeCache[regionId] && routeCache[regionId].def === r) return routeCache[regionId].list;
    var byId = {};
    r.nodes.forEach(function (n) { byId[n.id] = n; });
    var list = [];
    var cur = r.nodes.filter(function (n) { return n.kind === 'start'; })[0];
    while (cur && list.indexOf(cur) < 0 && list.length <= r.nodes.length) {
      list.push(cur);
      cur = cur.next ? byId[cur.next] : null;
    }
    routeCache[regionId] = { def: r, list: list };
    return list;
  }

  function lastIndex(regionId) { return route(regionId).length - 1; }

  // 順路の最後のボスの地点（なければ null）
  function bossNode(regionId) {
    var list = route(regionId);
    var last = list[list.length - 1];
    return last && last.kind === 'boss' ? last : null;
  }

  // ボスの手前の地点（ボスがいなければ終点）の番号。ここまで進めば次の地域が開く（DESIGN 13.1）
  function gateIndex(regionId) { return lastIndex(regionId) - (bossNode(regionId) ? 1 : 0); }

  function eventDef(eventId) { return FF.defs.EXPLORE_EVENTS[eventId] || null; }

  // 敵地点は reachable が true のものだけ戦える（v0.3 その2 で true にした）
  function canEnterNode(node) {
    if (!node) return false;
    return node.kind !== 'enemy' || node.reachable === true;
  }

  // 敵・ボスの地点（defs の enemy が enemyId のもの）
  function enemyNode(regionId, enemyId) {
    var r = regionDef(regionId);
    return r ? r.nodes.filter(function (n) { return (n.kind === 'enemy' || n.kind === 'boss') && n.enemy === enemyId; })[0] || null : null;
  }

  // ---- 状態の参照 ----
  function regionState(state, regionId) {
    var ex = state.exploration;
    return (ex && ex.regions && ex.regions[regionId]) || FF.state.defaultRegionState();
  }

  function isComplete(state, regionId) {
    return regionState(state, regionId).position >= lastIndex(regionId);
  }

  // ボスの手前（ボスがいなければ終点）まで進んだか
  function isGateReached(state, regionId) {
    return regionState(state, regionId).position >= gateIndex(regionId);
  }

  // 次の地点がボスか（ボスは問題に正解しても進めない。戦闘に勝つと進む）
  function nextIsBoss(state, regionId) {
    var list = route(regionId);
    var next = list[regionState(state, regionId).position + 1];
    return !!(next && next.kind === 'boss');
  }

  // 敵・ボスの状態：locked（まだ戦えない）/ available（戦える）/ defeated（倒した）
  // 寄り道の敵は、隣の地点に着いたら戦える。ボスは、ボスの手前まで進んだら戦える
  function enemyStatus(state, regionId, enemyId) {
    var node = enemyNode(regionId, enemyId);
    if (!node || !canEnterNode(node)) return 'locked';
    var rs = regionState(state, regionId);
    if ((rs.defeated || []).indexOf(enemyId) >= 0) return 'defeated';
    if (node.kind === 'boss') return isGateReached(state, regionId) ? 'available' : 'locked';
    var i = route(regionId).map(function (n) { return n.id; }).indexOf(node.adjacent);
    return i >= 0 && rs.position >= i ? 'available' : 'locked';
  }

  // 地域の解放：中央炉のレベル ＋（requires があれば）その地域のボスの手前まで進んでいる
  function isRegionUnlocked(state, regionId, b) {
    var r = regionDef(regionId);
    if (!r) return false;
    var need = E(b).UNLOCK_FURNACE_LEVEL[regionId];
    if (need != null && state.buildings.furnace.level < need) return false;
    if (r.requires && !isGateReached(state, r.requires)) return false;
    return true;
  }

  // 推奨学年より低い学年しか解放していない教科があるか（地域の選択で、昇格試験をすすめる一言を出すため）。
  // 探索・戦闘の出題は解放済みの学年からしか出さない（DESIGN 12.6・判断64）ので、この場合は推奨より易しい問題が多くなる
  function belowRecommended(state, regionId) {
    var r = regionDef(regionId);
    if (!r) return false;
    return FF.defs.SUBJECTS.some(function (subj) { return FF.learning.unlockedGrade(state, subj.id) < r.grades[0]; });
  }

  // 探索タブが開いているか（どれか1地域でも解放されている）
  function isExploreOpen(state, b) {
    return FF.defs.REGIONS.some(function (r) { return isRegionUnlocked(state, r.id, b); });
  }

  // 進捗％（入口は最初から到達済み。敵地点は数えない）
  function progressPercent(state, regionId) {
    var last = lastIndex(regionId);
    if (last <= 0) return 100;
    return Math.floor(Math.min(regionState(state, regionId).position, last) * 100 / last);
  }

  // 地点の表示上の状態：reached / current / next / ahead / locked・available・defeated（寄り道の敵）/ unknown
  // ボスは順路の地点と同じ（倒すまでは next か ahead、倒したら current）。戦えるかは enemyStatus で見る
  function nodeStatus(state, regionId, nodeId) {
    var node = nodeDef(regionId, nodeId);
    if (!node) return 'unknown';
    if (node.kind === 'enemy') return node.enemy ? enemyStatus(state, regionId, node.enemy) : 'locked';
    var i = route(regionId).indexOf(node);
    if (i < 0) return 'unknown';
    var pos = regionState(state, regionId).position;
    if (i < pos) return 'reached';
    if (i === pos) return 'current';
    if (i === pos + 1) return 'next';
    return 'ahead';
  }

  // 解放されたが、まだお知らせを出していない地域（既読は flags.unlockNoticesSeen に 'explore_<地域>' で記録）
  function pendingExploreNotices(state, b) {
    var seen = (state.flags && state.flags.unlockNoticesSeen) || [];
    return FF.defs.REGIONS.filter(function (r) {
      return isRegionUnlocked(state, r.id, b) && seen.indexOf('explore_' + r.id) < 0;
    }).map(function (r) { return r.id; });
  }

  // ---- 状態の更新の補助 ----
  // 探索の部分だけを複製した新しい状態（ほかの部分は共有。書き換えるのは exploration・resources・tickets だけ）
  function withRegion(state, regionId) {
    var s = Object.assign({}, state);
    var ex = FF.util.clone(state.exploration || FF.state.defaultExploration());
    ex.regions[regionId] = ex.regions[regionId] || FF.state.defaultRegionState();
    s.exploration = ex;
    return { s: s, ex: ex, rs: ex.regions[regionId] };
  }

  // 資源とチケットを加える。チケットは先に回復処理をしてから足す（回復の端数や上限の計算を狂わせない）。
  // 宝箱のチケットは上限（TICKET_MAX）を超えても受け取れる。上限以上の間は回復しない（tickets.js の既存の動作）。
  function addReward(s, reward, now, b) {
    if (!reward) return;
    var res = null;
    FF.defs.RESOURCES.forEach(function (r) {
      if (reward[r.id]) {
        if (!res) res = Object.assign({}, s.resources);
        res[r.id] = (res[r.id] || 0) + reward[r.id];
      }
    });
    if (res) s.resources = res;
    if (reward.tickets) {
      var t = FF.tickets.recoverTickets(s.tickets, now, bal(b));
      s.tickets = { count: t.count + reward.tickets, lastRecoveredAt: t.lastRecoveredAt };
    }
  }

  // ---- 宝箱（1個につき1回だけ） ----
  // { state, reward }。開封済み・定義にない宝箱なら reward は null で状態は変わらない
  function openChest(state, regionId, chestId, now, b) {
    var reward = E(b).CHESTS[chestId];
    var rs0 = regionState(state, regionId);
    if (!reward || rs0.openedChests.indexOf(chestId) >= 0) return { state: state, reward: null };
    var w = withRegion(state, regionId);
    w.rs.openedChests.push(chestId);
    addReward(w.s, reward, now, b);
    return { state: w.s, reward: FF.util.clone(reward) };
  }

  // ---- イベント ----
  // その地域でまだ出ていないものから抽選する。出尽くしたら直前のもの以外から。
  // 抽選済みの地点ならそのまま返す（二度目の報酬はない）。{ state, eventId, reward, isNew }
  function drawEvent(state, regionId, nodeId, rng, b) {
    var r = regionDef(regionId);
    var node = nodeDef(regionId, nodeId);
    if (!r || !node || node.kind !== 'event') return { state: state, eventId: null, reward: null, isNew: false };
    var rs0 = regionState(state, regionId);
    if (rs0.events[nodeId]) return { state: state, eventId: rs0.events[nodeId].id, reward: null, isNew: false };

    var used = Object.keys(rs0.events).map(function (k) { return rs0.events[k].id; });
    var cands = r.events.filter(function (id) { return used.indexOf(id) < 0; });
    if (!cands.length) {
      var last = state.exploration && state.exploration.lastEventId;
      cands = r.events.filter(function (id) { return id !== last; });
      if (!cands.length) cands = r.events.slice();
    }
    var id = cands[Math.floor((rng || Math.random)() * cands.length)];

    var w = withRegion(state, regionId);
    w.rs.events[nodeId] = { id: id, choice: null };
    w.ex.lastEventId = id;
    var reward = null;
    if (eventDef(id) && eventDef(id).type === 'resource') {
      reward = E(b).EVENT_REWARDS[id] || null;
      addReward(w.s, reward, null, b);
    }
    return { state: w.s, eventId: id, reward: reward ? FF.util.clone(reward) : null, isNew: true };
  }

  // 分岐イベントの選択を記録する（結果は文章だけ。資源・進行には影響しない）。最初の選択だけを記録する
  function chooseEventOption(state, regionId, nodeId, index) {
    var rec = regionState(state, regionId).events[nodeId];
    var ev = rec && eventDef(rec.id);
    if (!ev || ev.type !== 'choice' || rec.choice !== null) return state;
    if (!(index >= 0 && index < ev.options.length && Math.floor(index) === index)) return state;
    var w = withRegion(state, regionId);
    w.rs.events[nodeId].choice = index;
    return w.s;
  }

  // ---- 進行 ----
  // 1地点進む。終点にいれば何もしない。次がボスなら進まない（ボスは戦闘に勝つと進む。battle.js）。
  // { state, arrival: null | { node, index, completed, chest: {id, reward}, event: {id, reward} } }
  function advance(state, regionId, now, rng, b) {
    if (!regionDef(regionId) || isComplete(state, regionId) || nextIsBoss(state, regionId)) return { state: state, arrival: null };
    var w = withRegion(state, regionId);
    w.rs.position += 1;
    w.rs.progress = 0;
    w.rs.missedHere = false;
    var list = route(regionId);
    var node = list[w.rs.position];
    var arrival = { node: node, index: w.rs.position, completed: false, chest: null, event: null };
    var s = w.s;
    if (w.rs.position >= list.length - 1) {
      w.rs.completedAt = now;
      arrival.completed = true;
    }
    if (node.kind === 'chest' && node.chest) {
      var c = openChest(s, regionId, node.chest, now, b);
      s = c.state;
      arrival.chest = { id: node.chest, reward: c.reward };
    }
    if (node.kind === 'event') {
      var e = drawEvent(s, regionId, node.id, rng, b);
      s = e.state;
      arrival.event = { id: e.eventId, reward: e.reward };
    }
    return { state: s, arrival: arrival };
  }

  // ---- 出題の選択（SPEC_v0.2 3.2、DESIGN 12.6） ----
  function weighted(items, weightOf, rng) {
    var total = 0;
    items.forEach(function (x) { total += weightOf(x); });
    var r = rng() * total;
    for (var i = 0; i < items.length; i++) {
      r -= weightOf(items[i]);
      if (r < 0) return items[i];
    }
    return items[items.length - 1];
  }

  // 教科・学年・難易度・形式を決める。{ subject, grade, difficulty, answerType }
  // opts（戦闘で使う）：{ forceInput: 書き問題だけにする, choiceShare: 選択問題の割合 }。省略すると探索の地点の設定
  function chooseSelection(state, regionId, rng, b, opts) {
    var ex = E(b);
    var r = regionDef(regionId);
    var subject = FF.defs.SUBJECTS[Math.floor(rng() * FF.defs.SUBJECTS.length)].id;
    var top = FF.learning.unlockedGrade(state, subject);
    var grades = [];
    for (var g = 1; g <= top; g++) grades.push(g);
    var grade = weighted(grades, function (x) {
      return x >= r.grades[0] && x <= r.grades[1] ? ex.GRADE_WEIGHT.inRange : ex.GRADE_WEIGHT.outOfRange;
    }, rng);
    var dw = ex.DIFFICULTY_WEIGHT[regionId];
    var difficulty = weighted(Object.keys(dw), function (d) { return dw[d]; }, rng);
    var forceInput = opts ? !!opts.forceInput : regionState(state, regionId).missedHere;
    var share = opts && opts.choiceShare != null ? opts.choiceShare : ex.CHOICE_SHARE;
    var answerType = forceInput ? 'input' : (rng() < share ? 'choice' : 'input');
    return { subject: subject, grade: grade, difficulty: difficulty, answerType: answerType };
  }

  // 問題がない組み合わせのときに広げる順番：難易度 → 形式 → 別の教科（同じ学年。その教科で未解放なら解放済みの最高学年）→ 算数の自動生成
  function fallbackSelections(state, sel, onlyInput) {
    var types = onlyInput ? ['input'] : [sel.answerType, sel.answerType === 'choice' ? 'input' : 'choice'];
    var diffs = [sel.difficulty].concat(FF.defs.DIFFICULTIES.map(function (d) { return d.id; }).filter(function (d) { return d !== sel.difficulty; }));
    var subjects = [sel.subject].concat(FF.defs.SUBJECTS.map(function (s) { return s.id; }).filter(function (s) { return s !== sel.subject; }));
    var out = [];
    subjects.forEach(function (subject) {
      var grade = Math.min(sel.grade, FF.learning.unlockedGrade(state, subject));
      types.forEach(function (t) {
        diffs.forEach(function (d) { out.push({ subject: subject, grade: grade, difficulty: d, answerType: t }); });
      });
    });
    out.push({ subject: 'math', grade: 1, difficulty: 'basic', answerType: types[0] });
    return out;
  }

  // その地域の出題の決め方で1問選ぶ（地点・戦闘の共通）。状態は変えない。opts は chooseSelection と同じ
  function pickRegionQuestion(bank, state, regionId, rng, now, b, opts) {
    b = bal(b);
    rng = rng || Math.random;
    var sel = chooseSelection(state, regionId, rng, b, opts);
    var forceInput = opts ? !!opts.forceInput : regionState(state, regionId).missedHere;
    // 探索専用の「直近に出した問題」だけを避ける（学習の反復記録は使わない）
    var pb = Object.assign({}, b, { PICK: Object.assign({}, b.PICK, { AVOID_RECENT: b.EXPLORE.AVOID_RECENT }) });
    var ctx = { correctLog: {}, recentIds: (state.exploration && state.exploration.recentQuestionIds) || [], now: now, rng: rng };
    var list = fallbackSelections(state, sel, sel.answerType === 'input' && forceInput);
    for (var i = 0; i < list.length; i++) {
      var q = FF.learning.pickQuestion(bank, list[i], ctx, pb);
      if (q) return q;
    }
    return null;
  }

  // 次の地点のための問題を1問選ぶ。完了済み・未解放の地域、次がボスのときは null。状態は変えない。
  function pickExploreQuestion(bank, state, regionId, rng, now, b) {
    b = bal(b);
    if (!isRegionUnlocked(state, regionId, b) || isComplete(state, regionId) || nextIsBoss(state, regionId)) return null;
    return pickRegionQuestion(bank, state, regionId, rng, now, b);
  }

  // ---- 回答（SPEC_v0.2 3.1） ----
  // att は FF.learning.startAttempt で作ったもの（選択肢のシャッフル・ヒントは学習と共通）。
  // 戻り値：{ state, attempt, outcome, arrival }
  //   outcome.status: 'correct' | 'wrong'（この問題は終わり。別の問題で再挑戦） | 'retry'（自由入力でもう一度） | 'error'
  // 正解したときだけ進む。チケット・学習の成績・反復記録・学習履歴には触れない。
  function answerExplore(state, regionId, att, input, now, rng, b) {
    b = bal(b);
    function err(code) { return { state: state, attempt: att, outcome: { status: 'error', error: code }, arrival: null }; }
    if (!isRegionUnlocked(state, regionId, b)) return err('locked');
    if (isComplete(state, regionId)) return err('complete');
    if (nextIsBoss(state, regionId)) return err('boss');
    if (att.done) return err('finished');
    var q = att.question;
    var result = FF.answer.judge(q, input);
    if (result.empty) return err('empty');

    var wrong = att.wrong;
    var finished = true;
    if (!result.correct) {
      wrong += 1;
      finished = q.answerType === 'choice' || wrong >= b.INPUT_MAX_ATTEMPTS;
    }

    var w = withRegion(state, regionId);
    if (!result.correct) w.rs.missedHere = true;   // この地点では、次から自由入力だけ
    if (!finished) {
      return {
        state: w.s,
        attempt: Object.assign({}, att, { wrong: wrong }),
        outcome: { status: 'retry', attemptsLeft: b.INPUT_MAX_ATTEMPTS - wrong },
        arrival: null
      };
    }

    w.ex.stats.answered += 1;
    if (result.correct) w.ex.stats.correct += 1;
    w.ex.recentQuestionIds = w.ex.recentQuestionIds.concat([q.id]).slice(-b.EXPLORE.AVOID_RECENT);

    var s = w.s, arrival = null;
    if (result.correct) {
      w.rs.progress += 1;
      if (w.rs.progress >= b.EXPLORE.CORRECT_PER_NODE) {
        var a = advance(s, regionId, now, rng, b);
        s = a.state;
        arrival = a.arrival;
      }
    }
    return {
      state: s,
      attempt: Object.assign({}, att, { wrong: wrong, done: true }),
      outcome: {
        status: result.correct ? 'correct' : 'wrong',
        attempts: result.correct ? wrong + 1 : wrong,
        correctAnswer: FF.learning.displayAnswer(q),
        explanation: q.explanation
      },
      arrival: arrival
    };
  }

  // ボスに負けた回数の上限（それ以上は HP が減らない回数。BOSS_MERCY_MAX ÷ BOSS_MERCY_STEP）
  function bossLossCap(b) {
    var bt = bal(b).BATTLE;
    return bt ? Math.round(bt.BOSS_MERCY_MAX / bt.BOSS_MERCY_STEP) : 0;
  }

  // ---- 読み込み時の整合 ----
  // 位置を順路の範囲に収め、定義にない宝箱・イベント・地点を捨てる。未開封の宝箱を勝手に開けることはしない。
  function normalizeExploration(state, b) {
    b = bal(b);
    var s = Object.assign({}, state);
    var ex = FF.util.clone(state.exploration || FF.state.defaultExploration());
    if (!FF.util.isPlainObject(ex.regions)) ex.regions = {};
    FF.defs.REGIONS.forEach(function (r) {
      var def = FF.state.defaultRegionState();
      var rs = FF.util.isPlainObject(ex.regions[r.id]) ? ex.regions[r.id] : def;
      var last = lastIndex(r.id);
      var pos = Math.floor(Number(rs.position));
      rs.position = isFinite(pos) ? Math.max(0, Math.min(last, pos)) : 0;
      var prog = Math.floor(Number(rs.progress));
      rs.progress = isFinite(prog) ? Math.max(0, Math.min(b.EXPLORE.CORRECT_PER_NODE - 1, prog)) : 0;
      rs.missedHere = rs.missedHere === true;
      var chestIds = r.nodes.filter(function (n) { return n.kind === 'chest'; }).map(function (n) { return n.chest; });
      rs.openedChests = (Array.isArray(rs.openedChests) ? rs.openedChests : []).filter(function (id, i, arr) {
        return chestIds.indexOf(id) >= 0 && arr.indexOf(id) === i;
      });
      var events = {};
      var src = FF.util.isPlainObject(rs.events) ? rs.events : {};
      Object.keys(src).forEach(function (nodeId) {
        var node = nodeDef(r.id, nodeId);
        var rec = src[nodeId];
        if (!node || node.kind !== 'event' || !rec || r.events.indexOf(rec.id) < 0) return;
        var ev = eventDef(rec.id);
        var choice = ev.type === 'choice' && typeof rec.choice === 'number' && rec.choice >= 0 && rec.choice < ev.options.length ? rec.choice : null;
        events[nodeId] = { id: rec.id, choice: choice };
      });
      rs.events = events;
      // 倒した敵（定義にある、この地域の敵・ボスだけ。重複なし）とボスに負けた回数（v0.3 その2）
      var enemyIds = r.nodes.filter(function (n) { return n.enemy; }).map(function (n) { return n.enemy; });
      rs.defeated = (Array.isArray(rs.defeated) ? rs.defeated : []).filter(function (id, i, arr) {
        return enemyIds.indexOf(id) >= 0 && arr.indexOf(id) === i;
      });
      var boss = bossNode(r.id);
      if (boss && rs.position >= last && rs.defeated.indexOf(boss.enemy) < 0) rs.defeated.push(boss.enemy);   // 終点にいる＝ボスを倒した
      var losses = Math.floor(Number(rs.bossLosses));
      rs.bossLosses = isFinite(losses) ? Math.max(0, Math.min(bossLossCap(b), losses)) : 0;
      if (rs.position < last) rs.completedAt = null;
      else if (typeof rs.completedAt !== 'number') rs.completedAt = null;
      ex.regions[r.id] = rs;
    });
    if (typeof ex.lastEventId !== 'string' || !eventDef(ex.lastEventId)) ex.lastEventId = null;
    ex.recentQuestionIds = (Array.isArray(ex.recentQuestionIds) ? ex.recentQuestionIds : [])
      .filter(function (x) { return typeof x === 'string'; }).slice(-b.EXPLORE.AVOID_RECENT);
    if (!FF.util.isPlainObject(ex.stats)) ex.stats = { answered: 0, correct: 0 };
    ['answered', 'correct'].forEach(function (k) {
      var v = Math.floor(Number(ex.stats[k]));
      ex.stats[k] = isFinite(v) && v >= 0 ? v : 0;
    });
    s.exploration = ex;
    return s;
  }

  FF.exploration = {
    regionDef: regionDef,
    nodeDef: nodeDef,
    eventDef: eventDef,
    route: route,
    lastIndex: lastIndex,
    canEnterNode: canEnterNode,
    regionState: regionState,
    isComplete: isComplete,
    bossNode: bossNode,
    gateIndex: gateIndex,
    isGateReached: isGateReached,
    nextIsBoss: nextIsBoss,
    enemyNode: enemyNode,
    enemyStatus: enemyStatus,
    bossLossCap: bossLossCap,
    withRegion: withRegion,
    addReward: addReward,
    pickRegionQuestion: pickRegionQuestion,
    isRegionUnlocked: isRegionUnlocked,
    isExploreOpen: isExploreOpen,
    belowRecommended: belowRecommended,
    progressPercent: progressPercent,
    nodeStatus: nodeStatus,
    pendingExploreNotices: pendingExploreNotices,
    openChest: openChest,
    drawEvent: drawEvent,
    chooseEventOption: chooseEventOption,
    advance: advance,
    chooseSelection: chooseSelection,
    pickExploreQuestion: pickExploreQuestion,
    answerExplore: answerExplore,
    normalizeExploration: normalizeExploration
  };
})(this);
