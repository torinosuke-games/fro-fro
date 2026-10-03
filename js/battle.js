// 戦闘（v0.3 その2、SPEC_v0.3_battle 第1章・第3章、DESIGN 13.4・13.5）：純粋関数のみ。
// 探索の地図の敵（寄り道）・ボス（順路の最後）の地点から始める。出題は探索と同じしくみ（exploration.pickRegionQuestion）。
// 正解で敵に DAMAGE_PER_CORRECT、まちがい1回ごとに敵の攻撃力ぶん隊長がダメージを受ける。
// チケット・学習の記録・反復倍率の履歴・勉強量ポイントには一切触れない（探索専用の集計だけを記録する）。
// 戦闘の途中の状態（battle）はセーブしない。倒した敵・ボスに負けた回数・地域の完了だけを state に残す。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  function BT(b) { return bal(b).BATTLE; }
  function X() { return FF.exploration; }

  function enemyDef(enemyId) { return FF.defs.ENEMIES[enemyId] || null; }
  function enemyStats(enemyId, b) { return BT(b).ENEMIES[enemyId] || null; }

  // ボスに負けた回数から、次の挑戦の開始 HP を決める。
  // 勝つのに必要な正解の数を、負けるたびに BOSS_MERCY_STEP の割合ずつ減らす（四捨五入。最大 BOSS_MERCY_MAX まで）
  function startHp(state, regionId, enemyId, b) {
    var st = enemyStats(enemyId, b), bt = BT(b), def = enemyDef(enemyId);
    if (!st) return 0;
    if (!def || !def.boss) return st.hp;
    var rs = X().regionState(state, regionId);
    if ((rs.defeated || []).indexOf(enemyId) >= 0) return st.hp;
    var frac = Math.min(bt.BOSS_MERCY_MAX, (rs.bossLosses || 0) * bt.BOSS_MERCY_STEP);
    var need = Math.ceil(st.hp / bt.DAMAGE_PER_CORRECT);
    return st.hp - bt.DAMAGE_PER_CORRECT * Math.round(need * frac);
  }

  // 戦えるか：地域が開いていて、敵が locked でない（倒した敵にも、もう一度挑める）
  function canChallenge(state, regionId, enemyId, b) {
    if (!enemyDef(enemyId) || !enemyStats(enemyId, b)) return false;
    if (!X().isRegionUnlocked(state, regionId, b)) return false;
    return X().enemyStatus(state, regionId, enemyId) !== 'locked';
  }

  // 戦闘を始める。戦えなければ null。隊長の HP はいつも満タンから
  function startBattle(state, regionId, enemyId, b) {
    if (!canChallenge(state, regionId, enemyId, b)) return null;
    var hp = startHp(state, regionId, enemyId, b);
    return {
      regionId: regionId, enemyId: enemyId, boss: !!enemyDef(enemyId).boss,
      enemyHp: hp, enemyMax: enemyStats(enemyId, b).hp, playerHp: BT(b).PLAYER_HP, playerMax: BT(b).PLAYER_HP,
      missed: false,        // 一度まちがえたら true（その戦闘の間は書き問題だけ）
      result: null          // 'win' | 'lose'（終わったら）
    };
  }

  // 戦闘の問題を1問選ぶ。一度まちがえたら書き問題だけ。終わった戦闘では null
  function pickBattleQuestion(bank, state, battle, rng, now, b) {
    if (!battle || battle.result) return null;
    return X().pickRegionQuestion(bank, state, battle.regionId, rng, now, bal(b),
      { forceInput: battle.missed, choiceShare: BT(b).CHOICE_SHARE,
        grade: state.player.grade || 1, difficulty: battle.boss ? 'advanced' : null });
  }

  // 勝ったとき：倒した記録、初めてなら報酬、ボスなら地域の完了（終点まで進める）
  // { state, reward（初めてでなければ null）, firstTime, completed }
  function winBattle(state, regionId, enemyId, now, b) {
    var node = X().enemyNode(regionId, enemyId);
    var w = X().withRegion(state, regionId);
    w.rs.defeated = (w.rs.defeated || []).slice();
    var firstTime = w.rs.defeated.indexOf(enemyId) < 0;
    var reward = null, completed = false;
    if (firstTime) {
      w.rs.defeated.push(enemyId);
      reward = BT(b).REWARDS[enemyId] || null;
      X().addReward(w.s, reward, now, b);
    }
    if (node && node.kind === 'boss') {
      w.rs.bossLosses = 0;
      var last = X().lastIndex(regionId);
      if (w.rs.position < last) {
        w.rs.position = last;
        w.rs.progress = 0;
        w.rs.missedHere = false;
        w.rs.completedAt = now;
        completed = true;
      }
    }
    return { state: w.s, reward: reward ? FF.util.clone(reward) : null, firstTime: firstTime, completed: completed };
  }

  // HPが0になって負けたとき：まだ倒していないボスの敗北回数を数える（上限まで）。
  function loseBattle(state, regionId, enemyId, b) {
    var def = enemyDef(enemyId);
    var rs = X().regionState(state, regionId);
    if (!def || !def.boss || (rs.defeated || []).indexOf(enemyId) >= 0) return state;
    var cap = X().bossLossCap(b);
    if ((rs.bossLosses || 0) >= cap) return state;
    var w = X().withRegion(state, regionId);
    w.rs.bossLosses = (w.rs.bossLosses || 0) + 1;
    return w.s;
  }

  // 引き返す（戦闘の途中でやめる）。敗北回数を増やさず、敵へのダメージは持ち越さない。
  function retreatBattle(state, battle, b) {
    if (!battle || battle.result) return { state: state, battle: battle };
    return { state: state, battle: Object.assign({}, battle, { result: 'retreat' }) };
  }

  // 回答する。att は FF.learning.startAttempt で作ったもの。
  // 戻り値：{ state, battle, attempt, outcome, result: null | 'win' | 'lose', win: winBattle の戻り値（勝ったときだけ） }
  //   outcome.status：'correct' | 'wrong'（この問題は終わり） | 'retry'（書き問題でもう一度） | 'error'
  //   outcome.damageDealt：敵に与えたダメージ、outcome.damageTaken：隊長が受けたダメージ
  function answerBattle(state, battle, att, input, now, rng, b) {
    b = bal(b);
    function err(code) { return { state: state, battle: battle, attempt: att, outcome: { status: 'error', error: code }, result: null, win: null }; }
    if (!battle || battle.result) return err('over');
    if (att.done) return err('finished');
    var q = att.question;
    var judged = FF.answer.judge(q, input);
    if (judged.empty) return err('empty');

    var bt = BT(b), st = enemyStats(battle.enemyId, b);
    var bat = Object.assign({}, battle);
    var wrong = att.wrong, dealt = 0, taken = 0;
    if (judged.correct) {
      dealt = Math.min(bat.enemyHp, bt.DAMAGE_PER_CORRECT);
      bat.enemyHp -= dealt;
    } else {
      wrong += 1;
      taken = Math.min(bat.playerHp, st.attack);
      bat.playerHp -= taken;
      bat.missed = true;
    }
    var finished = judged.correct || q.answerType === 'choice' || wrong >= b.INPUT_MAX_ATTEMPTS || bat.playerHp <= 0;

    // 探索専用の集計と「直近に出した問題」（問題が終わったときだけ。書き問題の再回答は数えない）
    var s = state;
    if (finished) {
      var w = X().withRegion(state, bat.regionId);
      w.ex.stats.answered += 1;
      if (judged.correct) w.ex.stats.correct += 1;
      w.ex.recentQuestionIds = w.ex.recentQuestionIds.concat([q.id]).slice(-b.EXPLORE.AVOID_RECENT);
      s = w.s;
    }

    var result = null, win = null;
    if (bat.enemyHp <= 0) {
      result = 'win';
      win = winBattle(s, bat.regionId, bat.enemyId, now, b);
      s = win.state;
    } else if (bat.playerHp <= 0) {
      result = 'lose';
      s = loseBattle(s, bat.regionId, bat.enemyId, b);
    }
    bat.result = result;

    var outcome;
    if (!finished) {
      outcome = { status: 'retry', attemptsLeft: b.INPUT_MAX_ATTEMPTS - wrong, damageDealt: 0, damageTaken: taken };
    } else {
      outcome = {
        status: judged.correct ? 'correct' : 'wrong',
        attempts: judged.correct ? wrong + 1 : wrong,
        damageDealt: dealt, damageTaken: taken,
        correctAnswer: FF.learning.displayAnswer(q),
        explanation: q.explanation
      };
    }
    return {
      state: s, battle: bat,
      attempt: Object.assign({}, att, { wrong: wrong, done: finished }),
      outcome: outcome, result: result, win: win
    };
  }

  FF.battle = {
    enemyDef: enemyDef,
    enemyStats: enemyStats,
    startHp: startHp,
    canChallenge: canChallenge,
    startBattle: startBattle,
    pickBattleQuestion: pickBattleQuestion,
    answerBattle: answerBattle,
    winBattle: winBattle,
    loseBattle: loseBattle,
    retreatBattle: retreatBattle
  };
})(this);
