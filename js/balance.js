// バランスに関わる数値はすべてここに置く（SPEC 第8章・第9章）。
// ロジックに数値を直接書かないこと。値を変えたら node tests/simulate.js で確認する。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var MIN = 60 * 1000;
  var HOUR = 60 * MIN;

  FF.balance = {
    // ---- 報酬（SPEC 8.2） ----
    BASE_REWARD: { 1: 10, 2: 15, 3: 22, 4: 32, 5: 45, 6: 62, 7: 82, 8: 110, 9: 150 },
    DIFFICULTY_MULT: { basic: 0.8, standard: 1.0, advanced: 1.3 },
    FORMAT_MULT: { choice: 1.0, input: 1.2 },
    HINT_MULT: [1.0, 0.9, 0.75, 0.5],           // 添字 = 使ったヒントの最大段階
    ATTEMPT_MULT: { 1: 1.0, 2: 0.7, 3: 0.4 },   // 自由入力のみ
    REPEAT_MULT: [1.0, 0.5, 0.1],               // 添字 = 24時間以内の過去の正解回数（2以上は末尾）
    REPEAT_WINDOW_MS: 24 * HOUR,
    FACILITY_BONUS_PER_LEVEL: 0.10,             // 施設Lv1で+0%、Lv2で+10%
    FOCUS_SUBJECT_MULT: 1.25,
    REWARD_MIN: 1,

    // 正答率倍率：その教科・学年の直近の正答率が基準を下回っている間、報酬を割り引く。
    // a = (直近 WINDOW 問の正解数 + PRIOR × 不足件数) / WINDOW  … 今回の回答は含めない
    // 倍率 = a >= THRESHOLD ? 1 : (a / THRESHOLD) ^ EXPONENT
    ACCURACY: { WINDOW: 10, THRESHOLD: 0.6, EXPONENT: 4, PRIOR: 0.6 },

    // ---- チケット（SPEC 7.2） ----
    TICKET_MAX: 20,
    TICKET_RECOVER_MS: 5 * MIN,

    // ---- 学習 ----
    INPUT_MAX_ATTEMPTS: 3,
    INITIAL_UNLOCKED_GRADE: 2,
    MAX_GRADE: 9,
    EXAM: {
      QUESTIONS: 5, PASS: 4, MIN_INPUT: 3,
      COOLDOWN_MS: 10 * MIN,
      RANGE_MIN: 1, RANGE_MAX: 3            // 解放済みの最高学年 +1 〜 +3
    },
    DIAGNOSIS: { MAX_QUESTIONS: 10, START_GRADE: 5, MIN_GRADE: 1, MAX_UNLOCK: 7, MIN_INPUT_RATIO: 0.8 },
    RECOMMEND: { WINDOW: 10, BELOW: 0.4 },
    HISTORY_LIMIT: 500,
    EXAM_HISTORY_LIMIT: 100,

    // ---- 建物（SPEC 9.2・9.3） ----
    MAX_LEVEL: 5,
    // 中央炉の強化コスト。キーは強化後のレベル。
    FURNACE_COST: {
      2: { wood: 150, stone: 100 },
      3: { wood: 1500, stone: 1000, iron: 500 },
      4: { wood: 2500, stone: 1800, iron: 1200, food: 800 },
      5: { wood: 6000, stone: 4500, iron: 3500, food: 2500 }
    },
    // その他の建物：同じ強化段階の中央炉コスト合計 × RATIO を、建物ごとの配分比で割り振る
    BUILDING_COST_RATIO: 0.4,
    BUILDING_COST_MIX: {
      housing:  { wood: 0.5, stone: 0.3, food: 0.2 },
      lumber:   { stone: 0.5, iron: 0.3, food: 0.2 },
      mine:     { wood: 0.5, stone: 0.2, food: 0.3 },
      quarry:   { wood: 0.4, iron: 0.4, food: 0.2 },
      foodhall: { wood: 0.4, stone: 0.3, iron: 0.3 }
    },
    COST_ROUND: 10,
    BUILDING_UNLOCK_FURNACE_LEVEL: { quarry: 2 },

    // 生産：施設レベル × PRODUCTION_PER_LEVEL_PER_HOUR 個／時間
    PRODUCTION_PER_LEVEL_PER_HOUR: 2,
    STORAGE_HOURS: { BASE: 4, PER_LEVEL: 2, MAX: 12 },  // 生存者住宅 Lv1 で4時間、+2時間/Lv

    INITIAL_RESOURCES: { wood: 0, iron: 0, stone: 0, food: 0 },

    // ---- 検証の基準（SPEC 9.4）：分 ----
    TARGETS: {
      furnace2: { lv1: 5, lv5: 4, lv9: 3 },
      furnace3: { lv1: 60, lv5: 40, lv9: 25 },
      all5: { lv1: 15 * 60, lv5: 10 * 60, lv9: 6 * 60 }
    },
    TARGET_TOLERANCE: 0.3,
    PRODUCTION_SHARE_TARGET: 0.10,

    // シミュレーターの標準プロフィール（SPEC 8.3 の想定解答時間）
    SIM_PROFILES: {
      lv1: { grade: 1, difficulty: 'standard', format: 'choice', secPerQuestion: 10, accuracy: 0.9 },
      lv5: { grade: 5, difficulty: 'standard', format: 'choice', secPerQuestion: 30, accuracy: 0.9 },
      lv9: { grade: 9, difficulty: 'standard', format: 'choice', secPerQuestion: 60, accuracy: 0.9 }
    },
    SIM_DEFAULTS: {
      minutesPerDay: 30,        // 1日のプレイ時間
      collectsPerDay: 1,        // 生産物を受け取る回数／日
      retrySecRatio: 0.5        // 自由入力の再回答にかかる時間（1問の秒数に対する割合）
    }
  };
})(this);
