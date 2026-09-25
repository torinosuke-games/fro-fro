// 報酬計算（SPEC 第8章）。純粋関数のみ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }

  // 直近の回答（今回を含まない、古い順の 0/1 配列）から正答率を求める。
  // 記録が WINDOW 件に満たない分は PRIOR として扱う。
  function recentAccuracy(recent, b) {
    var cfg = bal(b).ACCURACY;
    var list = (recent || []).slice(-cfg.WINDOW);
    var correct = 0;
    for (var i = 0; i < list.length; i++) if (list[i]) correct++;
    return (correct + cfg.PRIOR * (cfg.WINDOW - list.length)) / cfg.WINDOW;
  }

  function accuracyMultiplier(recent, b) {
    var cfg = bal(b).ACCURACY;
    var a = recentAccuracy(recent, b);
    if (a >= cfg.THRESHOLD) return 1;
    return Math.pow(a / cfg.THRESHOLD, cfg.EXPONENT);
  }

  function facilityMultiplier(level, b) {
    if (!level || level <= 1) return 1;
    return 1 + bal(b).FACILITY_BONUS_PER_LEVEL * (level - 1);
  }

  function repeatMultiplier(repeatCount, b) {
    var table = bal(b).REPEAT_MULT;
    return table[Math.min(repeatCount || 0, table.length - 1)];
  }

  // 各倍率の内訳を返す（画面の報酬表示にも使う）
  function rewardBreakdown(p, b) {
    b = bal(b);
    var m = {
      base: b.BASE_REWARD[p.grade],
      difficulty: b.DIFFICULTY_MULT[p.difficulty],
      format: b.FORMAT_MULT[p.answerType],
      hint: b.HINT_MULT[Math.min(p.hintsUsed || 0, b.HINT_MULT.length - 1)],
      attempt: p.answerType === 'input' ? b.ATTEMPT_MULT[p.attempt || 1] : 1,
      repeat: repeatMultiplier(p.repeatCount, b),
      facility: facilityMultiplier(p.facilityLevel, b),
      focus: p.isFocusSubject ? b.FOCUS_SUBJECT_MULT : 1,
      accuracy: accuracyMultiplier(p.recent, b)
    };
    var raw = m.base * m.difficulty * m.format * m.hint * m.attempt *
              m.repeat * m.facility * m.focus * m.accuracy;
    // 浮動小数の誤差（例：9.999999）で切り捨てが1つずれないように補正する
    m.total = Math.max(b.REWARD_MIN, Math.floor(raw + 1e-9));
    return m;
  }

  // 正解したときの獲得量（整数・最低1）。不正解のときは呼ばない。
  function calcReward(p, b) {
    return rewardBreakdown(p, b).total;
  }

  FF.rewards = {
    recentAccuracy: recentAccuracy,
    accuracyMultiplier: accuracyMultiplier,
    facilityMultiplier: facilityMultiplier,
    repeatMultiplier: repeatMultiplier,
    rewardBreakdown: rewardBreakdown,
    calcReward: calcReward
  };
})(this);
