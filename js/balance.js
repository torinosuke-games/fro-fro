// バランスに関わる数値はすべてここに置く（SPEC 第8章・第9章）。
// ロジックに数値を直接書かないこと。値を変えたら node tests/simulate.js で確認する。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var MIN = 60 * 1000;
  var HOUR = 60 * MIN;

  FF.balance = {
    // 雪原の冒険・試作。敵の強さと出題学年は独立。
    ADVENTURE: {
      QUIZ_ATTACK_RATE: 1.5, QUIZ_ENEMY_RATE: 0.5,
      DROP_RATE: 0.25, DROP_GOLD: 15, DROP_POTIONS: 1,
      MAX_LEVEL: 10, XP_STEP: 24, HP_GROWTH: 7, MP_GROWTH: 2, STAT_GROWTH: 2,
      DEFENSE_RATE: 0.5, ARMOR_RATE: 0.45, MAGIC_COST: 3, MAGIC_POWER: 1.7,
      HEAL: 30, POTION_HEAL: 35, POTIONS: 3, CHEST_GOLD: 30, CHEST_POTIONS: 2,
      GUARD_RATE: 0.6, WARD_RATE: 0.7, RECENT: 12, HISTORY: 200,
      // 仲間（判断352）。magic：heal＝味方ひとりを回復／guard＝個別攻撃をかばう／ward＝全員の被害を軽減／attack＝魔法で攻撃
      MEMBERS: {
        hero: { hp: 66, mp: 12, strength: 15, defense: 10, speed: 11, wisdom: 13, magic: 'attack' },
        juushouhei: { hp: 92, mp: 8, strength: 18, defense: 19, speed: 5, wisdom: 6, magic: 'guard' },
        shiromadoushi: { hp: 54, mp: 22, strength: 7, defense: 8, speed: 10, wisdom: 20, magic: 'heal' },
        kenshi: { hp: 70, mp: 8, strength: 19, defense: 12, speed: 14, wisdom: 7, magic: 'attack' },
        senshi: { hp: 80, mp: 6, strength: 20, defense: 14, speed: 9, wisdom: 5, magic: 'attack' },
        kuromadoushi: { hp: 52, mp: 22, strength: 6, defense: 7, speed: 11, wisdom: 21, magic: 'attack' },
        gakusha: { hp: 56, mp: 18, strength: 7, defense: 8, speed: 12, wisdom: 18, magic: 'attack' },
        shisho: { hp: 60, mp: 16, strength: 8, defense: 9, speed: 10, wisdom: 16, magic: 'ward' },
        touzoku: { hp: 58, mp: 8, strength: 15, defense: 8, speed: 22, wisdom: 9, magic: 'attack' },
        yumitsukai: { hp: 56, mp: 10, strength: 17, defense: 8, speed: 18, wisdom: 10, magic: 'attack' }
      },
      START_ALLIES: ['juushouhei', 'shiromadoushi', 'kenshi'],   // はじめからいる仲間。ほかは、旅人の救出で増える
      ENEMIES: {
        cub: { hp: 95, attack: 20, defense: 4, xp: 14, gold: 12 },
        wolf: { hp: 155, attack: 32, defense: 8, xp: 25, gold: 24 },
        boss: { hp: 290, attack: 38, defense: 12, xp: 60, gold: 65 }
      }
    },
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

    // ---- 勉強量ポイント（SPEC 8.4・14.4・14.5、DESIGN 14.1） ----
    // 獲得 pt = BASE[学年][難易度] × 反復倍率 × ヒント倍率 × 回答回数倍率 × 正答率倍率（倍率は上の報酬と同じ表）
    // 標準 ＝ 1問の想定時間（Lv1 10秒・Lv5 30秒・Lv9 60秒）× 時間あたりの効率（Lv1 1.0 → Lv9 1.5）。基礎 ×0.8・発展 ×1.3
    STUDY_POINTS: {
      BASE: {
        1: { basic: 8, standard: 10, advanced: 13 },
        2: { basic: 12, standard: 15, advanced: 20 },
        3: { basic: 18, standard: 22, advanced: 29 },
        4: { basic: 24, standard: 30, advanced: 39 },
        5: { basic: 30, standard: 38, advanced: 49 },
        6: { basic: 38, standard: 48, advanced: 62 },
        7: { basic: 48, standard: 60, advanced: 78 },
        8: { basic: 60, standard: 75, advanced: 98 },
        9: { basic: 72, standard: 90, advanced: 117 }
      },
      MIN: 1,
      PER_HOUR_DEFAULT: 3000,                  // 交換レートの初期値（pt ＝ 1時間）
      PER_HOUR_MIN: 100,
      PER_HOUR_MAX: 100000,
      PRESET_MINUTES: [15, 30, 60, 120]        // 引換所のプリセット
    },

    // ---- チケット（SPEC 7.2） ----
    TICKET_MAX: 20,
    TICKET_RECOVER_MS: 5 * MIN,

    // ---- 学習 ----
    INPUT_MAX_ATTEMPTS: 3,
    HANDWRITING: { REWARD_RATE: 0.5 },   // 手書きの自己採点で「書けた」を選んだときの、資源・勉強量ポイントの割合（判断266）
    DAILY_RESOURCE: { RESET_HOUR: 4 },   // その日に獲得できる資材の割り当てが切りかわる時刻（朝4時。判断319）
    INITIAL_UNLOCKED_GRADE: 2,
    FURIGANA_AUTO_MAX_GRADE: 3,   // 学年を入れたとき、ふりがなを自動でオンにするのはこの学年まで（判断198）
    MAX_GRADE: 9,
    EXAM: {
      QUESTIONS: 5, PASS: 4, MIN_INPUT: 3,
      COOLDOWN_MS: 10 * MIN,
      RANGE_MIN: 1, RANGE_MAX: 3            // 解放済みの最高学年 +1 〜 +3
    },
    DIAGNOSIS: { MAX_QUESTIONS: 10, START_GRADE: 5, MIN_GRADE: 1, MAX_UNLOCK: 7, MIN_INPUT_RATIO: 0.8 },
    RECOMMEND: { WINDOW: 10, BELOW: 0.4 },
    PICK: {
      CANDIDATES: 6,              // 自動生成で候補を何問作って選ぶか
      AVOID_RECENT: 10,           // 直近に出した問題を何問ぶん避けるか
      MATH_WORD_SHARE: 0.2,       // 算数で文章題（問題データ）を出す割合
      UNIT_GEN_SHARE: 0.4,        // 単元を登録した学年で、単元を選んだとき、自動生成の問題を混ぜる割合（手作りの問題がある単元。判断226）
      UNIT_GEN_SHARE_ALL: 0.3,    // 同じく「すべての単元」のとき
      UNIT_GEN_FULL_POOL: 20      // 手作りの問題がこの数より少ないと、少ないぶんだけ自動生成の割合を上げる
    },
    HISTORY_LIMIT: 500,
    // データの保存（サーバー同期。SPEC_sync.md・判断299）
    SYNC: {
      CHANGE_SYNC_MS: 5000, // 変更後のバックアップ。連続操作をまとめ、60秒の定期同期も維持する。
      INTERVAL_MS: 60000,         // 変更があったとき、前回の同期からこれだけたったら送る
      TIMEOUT_MS: 10000,          // 1回の通信の待ち時間
      BACKOFF_BASE_MS: 30000,     // 失敗したあとの待ち時間（失敗のたびに2倍）
      BACKOFF_MAX_MS: 1800000,    // 待ち時間の上限（30分）
      CONFLICT_DEFER_MS: 600000,  // 競合の選択を「あとで」にしたとき、次に聞くまで
      ATTEMPT_BATCH: 200,         // 学習の履歴を1回に送る件数（サーバーの上限と同じ）
      ATTEMPT_BATCHES_PER_SYNC: 5, // 1回の同期で送る回数の上限（たまっていても、1回で通信しすぎない）
      OUTBOX_LIMIT: 5000,         // 未送信の履歴をためておく上限（超えたら古い順に捨てる）
      READ_PAGE: 1000,            // 保護者の記録で、履歴を1回に読む件数（サーバーの上限と同じ）
      READ_MAX_PAGES: 100         // 読む回数の上限（10万件まで）
    },
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
    // 強化の待ち時間（SPEC_v0.3 3章）：資源を使って工事を始め、この時間が過ぎると完成する。キーは強化後のレベル。単位は分。
    // 低いレベルでは ほぼ待たず、レベルが上がるほど長くなる。中央炉以外の建物は other。
    // Lv2・Lv3 は短くする：中央炉Lv2・Lv3の到達時間（目標 3〜60分）に直接足されるため（tests/simulate.js）。
    BUILD_MINUTES: {
      furnace: { 2: 10 / 60, 3: 3, 4: 60, 5: 240 },   // Lv2 は10秒
      other:   { 2: 10 / 60, 3: 2, 4: 30, 5: 120 }
    },

    // 生産：施設レベル × PRODUCTION_PER_LEVEL_PER_HOUR 個／時間
    PRODUCTION_PER_LEVEL_PER_HOUR: 2,
    STORAGE_HOURS: { BASE: 4, PER_LEVEL: 2, MAX: 12 },  // 住宅 Lv1 で4時間、+2時間/Lv

    INITIAL_RESOURCES: { wood: 0, iron: 0, stone: 0, food: 0 },

    // ---- 探索（v0.2、SPEC_v0.2） ----
    EXPLORE: {
      CORRECT_PER_NODE: 1,                           // 1地点進むのに必要な正解数（SPEC_v0.2 3.1）
      UNLOCK_FURNACE_LEVEL: { snowfield: 3, forest: 4, glacier: 5 },
      CHOICE_SHARE: 0.5,                             // 4択を出す割合（まちがえた地点では自由入力だけ）
      GRADE_WEIGHT: { inRange: 3, outOfRange: 1 },   // 推奨学年の範囲内・範囲外の重み
      DIFFICULTY_WEIGHT: {
        snowfield: { basic: 0.6, standard: 0.4 },
        forest: { standard: 0.6, advanced: 0.4 },
        glacier: { standard: 0.4, advanced: 0.6 }
      },
      AVOID_RECENT: 20,                              // 探索で直近に出した問題を何問ぶん避けるか
      // 宝箱の中身（固定・1個につき1回）。tickets はチケットの枚数、それ以外は資源
      CHESTS: {
        sf_chest_1: { wood: 120, stone: 80 },
        sf_chest_2: { tickets: 1, iron: 80 },
        sf_chest_3: { tickets: 2, food: 150, wood: 100 },
        fr_chest_1: { wood: 150, iron: 150 },
        fr_chest_2: { tickets: 1, stone: 200 },
        fr_chest_3: { tickets: 1, food: 200, iron: 100 },
        fr_chest_4: { tickets: 2, wood: 250, stone: 200 },
        gl_chest_1: { iron: 200, stone: 150 },
        gl_chest_2: { tickets: 1, wood: 200 },
        gl_chest_3: { tickets: 1, iron: 200, food: 150 },
        gl_chest_4: { tickets: 2, stone: 250, wood: 200 }
      },
      // 資源イベントの量（宝箱よりずっと少なく）
      EVENT_REWARDS: {
        sf_ev_crate: { wood: 30 },
        sf_ev_rivets: { iron: 20 },
        fr_ev_firewood: { wood: 40 },
        fr_ev_nuts: { food: 40 },
        gl_ev_sled: { food: 40 },
        gl_ev_bolts: { iron: 40 }
      }
    },

    // ---- 戦闘（v0.3 その2、SPEC_v0.3_battle 第1章、DESIGN 13.4・13.5） ----
    // 敵の HP ＝ 勝つのに必要な正解の数 × DAMAGE_PER_CORRECT。攻撃力 ＝ 隊長の HP ÷ 負けるまでのまちがいの回数（切り上げ）。
    // 武器（武器屋。判断340）：damage ＝ 正解1問で敵に与えるダメージ、price ＝ ゴールド。木の剣は、はじめから持っている（BATTLE.DAMAGE_PER_CORRECT と同じ）。
    // 値段は、ゴールドの入手のしくみが決まったら、調整する
    WEAPONS: {
      wood_sword: { damage: 10, price: 0 },
      stone_sword: { damage: 12, price: 100 },
      iron_sword: { damage: 15, price: 300 },
      steel_sword: { damage: 18, price: 800 },
      flame_sword: { damage: 22, price: 2000 }
    },
    DEFAULT_WEAPON: 'wood_sword',
    // 防具（防具屋。判断343）：defense ＝ 防御力。冒険では、主人公の防御力に足す。探索では、まちがえたときに受けるダメージを (defense × BATTLE.ARMOR_RATE) だけ減らす（最低1）
    ARMORS: {
      cloth_clothes: { defense: 0, price: 0 },
      fur_coat: { defense: 3, price: 100 },
      leather_armor: { defense: 6, price: 300 },
      iron_armor: { defense: 10, price: 800 },
      steel_armor: { defense: 15, price: 2000 }
    },
    DEFAULT_ARMOR: 'cloth_clothes',

    BATTLE: {
      PLAYER_HP: 100,                // 隊長の HP（挑戦のたびに満タンから）
      ARMOR_RATE: 0.6,               // 防具の防御力のうち、探索でまちがえたときのダメージを減らす割合
      DAMAGE_PER_CORRECT: 10,        // 正解1問で敵に与えるダメージ（選択問題・書き問題とも同じ）
      CHOICE_SHARE: 0.5,             // 選択問題を出す割合。一度まちがえたら、その戦闘の間は書き問題だけ
      BOSS_MERCY_STEP: 0.1,          // ボスに負けるたびに、次の挑戦でボスの HP を最大値のこの割合ずつ減らす
      BOSS_MERCY_MAX: 0.5,           // 減らす上限（半分まで）
      ENEMIES: {
        sf_enemy_fangs: { hp: 30, attack: 20 },
        sf_enemy_machine: { hp: 40, attack: 20 },
        sf_boss_wolf: { hp: 80, attack: 17 },
        fr_enemy_antler: { hp: 40, attack: 20 },
        fr_enemy_roots: { hp: 50, attack: 20 },
        fr_enemy_warden: { hp: 100, attack: 17 },
        gl_enemy_leopard: { hp: 50, attack: 20 },
        gl_enemy_drone: { hp: 50, attack: 20 },
        gl_enemy_golem: { hp: 60, attack: 20 },
        gl_boss_guardian: { hp: 120, attack: 17 }
      },
      // 初めて倒したときだけの報酬（2回目以降は何もない）
      // 捕らえられていた旅人の救出（判断354）：ボスを初めて倒すと、その旅人が仲間になる
      RESCUE: { sf_boss_wolf: 'senshi', fr_enemy_warden: 'yumitsukai', gl_boss_guardian: 'kuromadoushi' },
      REWARDS: {
        sf_enemy_fangs: { food: 60 },
        sf_enemy_machine: { iron: 60 },
        sf_boss_wolf: { wood: 150, food: 100, tickets: 2 },
        fr_enemy_antler: { wood: 100 },
        fr_enemy_roots: { stone: 100 },
        fr_enemy_warden: { stone: 200, iron: 150, tickets: 2 },
        gl_enemy_leopard: { food: 120 },
        gl_enemy_drone: { iron: 120 },
        gl_enemy_golem: { stone: 120 },
        gl_boss_guardian: { iron: 250, stone: 200, tickets: 3 }
      }
    },

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
