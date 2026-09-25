# FROZEN FRONTIER v0.1 設計書（フェーズ1）

SPEC.md 第18章フェーズ1の成果物です。承認後、フェーズ2以降はこの設計に沿って実装します。
承認前のため、コードはまだありません。

---

## 1. 全体方針

| 方針 | 内容 |
|---|---|
| 読み込み方式 | ES Modules・fetch を使わず、すべて `<script>` タグで順番に読み込む（`file://` と GitHub Pages の両方で動作） |
| 名前空間 | グローバルは `window.FF`（ゲーム本体）と `window.QUESTION_BANK`（問題データ）の2つだけにする。各ファイルは IIFE で包み、`FF.tickets = {...}` のように登録する |
| ロジックと画面 | 3層に分ける（下図）。ロジック層は DOM・`localStorage`・`clock` に触れない純粋関数とし、時刻は引数 `now` で受け取る |
| 状態の更新 | ロジック関数は元の状態を書き換えず、新しい状態を返す（例：`recoverTickets(ticketState, now, balance)` → 新しい `ticketState`） |
| 数値 | バランスに関わる数値はすべて `balance.js`。名前・アイコン・表示文などの非数値データは `defs.js` / `texts.js` |
| テスト | Node.js 標準の `vm` と `assert` のみ。`index.html` の `<script>` の並びを `tests/run.js` が読み取り、同じ順番で読み込む（読み込み順の管理を1か所にするため） |

```text
┌────────────────────────────────────────────────────┐
│ 画面層      ui/*.js, svg/*.js, debug.js, main.js     │  DOM 操作・イベント
│             （clock.now() を呼ぶのはこの層だけ）     │
├────────────────────────────────────────────────────┤
│ 保存アダプタ storage.js                               │  localStorage の読み書きだけ
├────────────────────────────────────────────────────┤
│ ロジック層  tickets, rewards, buildings, answer,      │  純粋関数（now を引数で受け取る）
│             learning, exam, generators, simulator,   │  node tests/run.js でテスト
│             state（生成・移行・検証）                 │
├────────────────────────────────────────────────────┤
│ データ層    config, balance, defs, texts, questions/ │  値の定義のみ
└────────────────────────────────────────────────────┘
```

---

## 2. ファイル構成

SPEC 14.3 の例をベースに、責務が大きくなる `ui.js` と `learning.js` を分割しています。

```text
index.html                 … <script> の読み込み順はここが唯一の定義
CLAUDE.md                  … 開発メモ（テスト方法・構成要約・進捗・判断した点）
DESIGN.md                  … この設計書
css/style.css

js/config.js               … タイトル文字列、保存キー、SAVE_VERSION など
js/clock.js                … now / advance / set / reset（SPEC 21.2）
js/balance.js              … バランス数値すべて
js/defs.js                 … 教科・学年・難易度・資源・建物の定義（データとして）
js/texts.js                … 画面文言と {name} テンプレート、ふりがな記法入りの文
js/util.js                 … 乱数（シード付き）、シャッフル、テンプレート展開、日付計算など共通の純粋関数

js/state.js                … 初期状態の生成、データ移行、インポート時の検証（純粋）
js/storage.js              … localStorage への読み書き（唯一 localStorage に触るファイル）
js/tickets.js              … チケットの回復・消費・残り時間
js/rewards.js              … 報酬計算、反復倍率、本日の重点教科
js/buildings.js            … 強化可否・強化・生産量・受け取り・解放
js/answer.js               … 入力の正規化と判定（validationMode）
js/generators.js           … 算数の自動生成（学年×難易度の設定表を含む）
js/learning.js             … 問題インデックス、出題選択、回答処理、学習記録の更新
js/exam.js                 … 昇格試験・実力診断の進行と判定
js/simulator.js            … バランス計算（デバッグ画面と tests/simulate.js で共有）

questions/math_word.js     … 算数・数学の文章題
questions/japanese.js
questions/science.js
questions/social.js
questions/english.js

js/ui/core.js              … 画面切替、ナビ、ふりがな付きテキストの描画、モーダル
js/ui/title.js             … 開始画面・名前入力・導入
js/ui/base.js              … 基地画面・建物パネル・受け取り
js/ui/study.js             … 学習画面（資源→教科→学年→難易度→形式→出題）
js/ui/exam.js              … 昇格試験・実力診断の画面
js/ui/records.js           … 学習記録
js/ui/settings.js          … 設定・名前変更・エクスポート／インポート・リセット
js/svg/buildings.js        … 建物の SVG（レベル別の外観）
js/svg/scene.js            … 背景（雪原・吹雪・煙）
js/debug.js                … ?debug=1 のときだけ有効になるデバッグ画面
js/main.js                 … 起動処理（読み込み→移行→チケット回復→描画→保存フック）

tests/run.js               … 自動テスト（node tests/run.js）
tests/simulate.js          … バランス計算（node tests/simulate.js）
tests/lib/loader.js        … vm で index.html と同じ順番に読み込む補助
tests/fixtures/save_v0.json … 移行テスト用の古いセーブデータ
tests/MANUAL.md            … 手動確認の手順（フェーズ6）
tests/REVIEW_NEEDED.md     … 要検証の問題（フェーズ7）
```

**読み込み順（index.html）**

`config → clock → balance → defs → texts → util → state → storage → tickets → rewards → buildings → answer → generators → questions/*.js → learning → exam → simulator → svg/* → ui/* → debug → main`

`tests/run.js` はこの中からロジック層・データ層・問題データだけを読み込みます（`storage`・`svg`・`ui`・`debug`・`main` はテストでは読み込まない）。

---

## 3. データ定義（defs.js / balance.js）

### 3.1 学年（将来 Lv10〜12 を行を足すだけで追加できる）

```text
FF.defs.GRADES = [
  { level: 1, label: "Lv1", school: "小学1年" }, … { level: 9, label: "Lv9", school: "中学3年" }
]
```

基本報酬などの学年別の数値は `balance.js` 側で `{1: 10, 2: 15, …}` の形で持ちます。

### 3.2 教科（データとして定義。追加は1行＋問題ファイル）

```text
FF.defs.SUBJECTS = [
  { id: "math",     name: "数学", nameByGrade: { "1-6": "算数" } },
  { id: "japanese", name: "国語" },
  { id: "science",  name: "理科", nameByGrade: { "1-2": "生活（理科）" } },
  { id: "social",   name: "社会", nameByGrade: { "1-2": "生活（社会）" } },
  { id: "english",  name: "英語" }
]
```

並び順が「本日の重点教科」のローテーション順になります。

### 3.3 難易度・形式・資源・建物

```text
DIFFICULTIES = ["basic", "standard", "advanced"]   表示名：基礎・標準・発展
ANSWER_TYPES = ["choice", "input"]                  表示名：4択・自由入力
RESOURCES    = [{ id:"wood", icon:"🪵", name:"木材" }, { id:"iron", … }, { id:"stone", … }, { id:"food", … }]
BUILDINGS    = [
  { id:"furnace",  name:"中央炉" },
  { id:"housing",  name:"生存者住宅" },
  { id:"lumber",   name:"木材置き場", produces:"wood"  },
  { id:"mine",     name:"鉱山",       produces:"iron"  },
  { id:"quarry",   name:"石切り場",   produces:"stone" },
  { id:"foodhall", name:"食料施設",   produces:"food"  }
]
FURNACE_UNLOCKS = [{ level:2, type:"building", id:"quarry" }, { level:3, type:"teaser", id:"watchtower" }, …]
```

### 3.4 balance.js に置く数値（一覧）

| キー | 内容 |
|---|---|
| `BASE_REWARD[grade]` | 10, 15, 22, 32, 45, 62, 82, 110, 150 |
| `DIFFICULTY_MULT` | basic 0.8 / standard 1.0 / advanced 1.3 |
| `FORMAT_MULT` | choice 1.0 / input 1.2 |
| `HINT_MULT[使用段階]` | 0: 1.0 / 1: 0.9 / 2: 0.75 / 3: 0.5 |
| `ATTEMPT_MULT[回数]` | 1: 1.0 / 2: 0.7 / 3: 0.4 |
| `REPEAT_MULT[24h以内の正解回数]` | 0回: 1.0 / 1回: 0.5 / 2回以上: 0.1、`REPEAT_WINDOW_MS` = 24h |
| `FACILITY_BONUS_PER_LEVEL` | 0.10（Lv1 で +0%） |
| `FOCUS_SUBJECT_MULT` | 1.25 |
| `ACCURACY` | 正答率倍率：WINDOW 10、THRESHOLD 0.6、EXPONENT 4、PRIOR 0.6（フェーズ2で追加） |
| `REWARD_MIN` | 1 |
| `TICKET_MAX` / `TICKET_RECOVER_MS` | 20 / 5分 |
| `INPUT_MAX_ATTEMPTS` | 3 |
| `INITIAL_UNLOCKED_GRADE` | 2 |
| `EXAM_*` | 問題数5、合格4、自由入力の最低数3、クールダウン10分、受験範囲 +1〜+3 |
| `DIAGNOSIS_*` | 最大10問、開始 Lv5、上限 Lv7、自由入力の割合 |
| `RECOMMEND_*` | 直近10問、40%未満 |
| `FURNACE_COST[level]` | SPEC 9.3 の表（フェーズ2で Lv2→3 を 木1500・石1000・鉄500 に調整） |
| `BUILDING_COST_RATIO` | 0.4 |
| `BUILDING_COST_MIX[building]` | 建物ごとの資源の配分比（下記） |
| `MAX_LEVEL` | 5（v0.1） |
| `PRODUCTION_PER_LEVEL_PER_HOUR` | 2（フェーズ2で 60 から調整） |
| `STORAGE_HOURS` | Lv1 4h、+2h/Lv、上限12h |
| `INITIAL_RESOURCES` | 初期資源（初期値 0） |
| `HISTORY_LIMIT` | 500 |

**建物の強化コスト（その他の建物）**：
合計量 = 同じレベルの中央炉コストの合計 × 0.4 を、建物ごとの配分比で割り振り、10単位に丸めます。
自分が生産する資源をあまり要求しない配分にします（初期案。フェーズ2で調整）。

| 建物 | 木材 | 鉄 | 石 | 食料 |
|---|---|---|---|---|
| 生存者住宅 | 0.5 | – | 0.3 | 0.2 |
| 木材置き場 | – | 0.3 | 0.5 | 0.2 |
| 鉱山 | 0.5 | – | 0.2 | 0.3 |
| 石切り場 | 0.4 | 0.4 | – | 0.2 |
| 食料施設 | 0.4 | 0.3 | 0.3 | – |

---

## 4. 問題データの構造

### 4.1 1問の構造（SPEC 10.1 準拠＋任意項目）

```text
{
  id: "science_g5_weather_001",     必須  {教科}_g{学年}_{単元}_{3桁連番}、全体で一意
  subject: "science",               必須  SUBJECTS の id
  gradeLevel: 5,                    必須  GRADES の level
  unit: "weather",                  必須  単元（英小文字）
  difficulty: "standard",           必須  basic | standard | advanced
  answerType: "input",              必須  choice | input
  question: "{雲|くも}の…",         必須  ふりがな記法（4.3）を使える
  choices: [4つ],                   choice のとき必須、ちょうど4つ、重複なし、answer を含む
  answer: "...",                    必須
  acceptedAnswers: [],              任意（input の別解）
  validationMode: "exact",          input のとき必須  exact | number | kana-insensitive | any-of
  hints: ["...", "...", "..."],     必須  1〜3個（考え方の補助）
  explanation: "...",               必須
  reviewed: false                   必須  AI 作成分はすべて false
}
```

- 報酬は持たせません（学年・難易度・形式から計算）。
- 自動生成の問題は同じ構造で、実行時に `generated: true` を付けます。

### 4.2 ファイル形式

```text
questions/science.js：
  window.QUESTION_BANK = window.QUESTION_BANK || [];
  window.QUESTION_BANK.push( {…}, {…}, … );
```

起動時に `learning.js` が `教科|学年|難易度|形式` をキーにした索引を1回だけ作ります。数千問に増えても出題時の検索は索引を引くだけです。
問題がない組み合わせは索引が空になり、画面は「準備中」を表示します（エラーにしない）。
不正な問題（構造チェックに失敗したもの）は索引に入れず、コンソールに警告を出します（ゲームは止めない）。

### 4.3 ふりがな記法

`{漢字|かんじ}` と書くと、ふりがなオン時は `<ruby>` で表示、オフ時は「漢字」だけを表示します。
`{漢字|}`（読みが空）は、ふりがなを付けずに「漢字」だけを表示します。辞書による自動付与も `{…}` の中には手を付けないので、漢字の読みを問う問題の答えなどに使います。
画面文言（texts.js）と問題文の両方で使います。
描画は DOM ノードを組み立てて行い、`innerHTML` は使いません。

### 4.4 判定（answer.js）

**正規化**（すべての判定の前に、入力と正解の両方に適用）

1. `NFKC` 正規化（全角英数・記号→半角、半角カナ→全角カナ）
2. 前後の空白を除去（全角スペースを含む）、連続する空白を1つに
3. 英字を小文字化

**validationMode**

| モード | 判定 |
|---|---|
| `exact` | 正規化後に `answer` または `acceptedAnswers` のどれかと完全一致 |
| `kana-insensitive` | さらにカタカナをひらがなに変換してから比較 |
| `number` | 数値として比較（「0.5」と「.5」が一致）。カンマ区切り「1,000」、マイナス記号の全角・異体字（－ − ）も許容 |
| `any-of` | `acceptedAnswers`（＋`answer`）のどれかと一致。複数の正解があることを明示する用途 |

### 4.5 算数の自動生成（generators.js）

- 設定表 `GEN_CONFIG[学年][難易度]` に「出題する演算の種類と数値の範囲」を並べます。
  例：Lv1 基礎＝1桁のたし算・ひき算（答え10以下）、Lv5 標準＝分数の加減（異分母）、Lv7 発展＝一次方程式 など。
- `generate(grade, difficulty, answerType, rng)` → 4.1 の構造の問題を返します。ヒント3段階と解説もテンプレートから自動生成します。
- 4択の場合は、ありがちな間違い（繰り上がり忘れ・符号ミスなど）から誤答を3つ作ります。
- **ID は数値から決定的に作ります**（例：`gen_math_g3_add_47_38`）。同じ問題が再び出たときに反復倍率がきちんと効くようにするためです。
- 乱数は引数で受け取ります（テストではシード付き乱数で再現可能にする）。

---

## 5. LocalStorage の構造

キーは1つ：`frozenFrontier.save`（config.js で変更可能）。値は下記の JSON です。時刻はすべてミリ秒（epoch）。

```text
{
  "saveVersion": 1,
  "createdAt": 1790000000000,
  "updatedAt": 1790000000000,

  "player": { "name": "プレイヤー" },

  "resources": { "wood": 0, "iron": 0, "stone": 0, "food": 0 },

  "buildings": {
    "furnace":  { "level": 1 },
    "housing":  { "level": 1 },
    "lumber":   { "level": 1, "lastCollectedAt": 1790000000000 },
    "mine":     { "level": 1, "lastCollectedAt": 1790000000000 },
    "quarry":   { "level": 0, "lastCollectedAt": null },
    "foodhall": { "level": 1, "lastCollectedAt": 1790000000000 }
  },

  "tickets": { "count": 20, "lastRecoveredAt": 1790000000000 },

  "learning": {
    "unlocked":        { "math": 2, "japanese": 2, "science": 2, "social": 2, "english": 2 },
    "examCooldownUntil": { "math": 0, … },
    "examHistory":     [ { "at": …, "subject": "math", "grade": 4, "correct": 4, "total": 5, "passed": true } ],
    "diagnosis":       { "math": { "at": …, "result": 5 }, "japanese": null, … },

    "stats": {
      "math": {
        "3": {
          "attempts": 40, "correct": 31,
          "choice": { "attempts": 10, "correct": 8 },
          "input":  { "attempts": 30, "correct": 23 },
          "hintsUsed": 6,
          "recent": [1,1,0,1,1,1,0,1,1,1]
        }
      }
    },
    "streak":      { "current": 3, "best": 12 },
    "totalEarned": { "wood": 0, "iron": 0, "stone": 0, "food": 0 },

    "correctLog": { "math_g5_fraction_001": [1790000000000, 1790000300000] },

    "history": [
      { "at": …, "qid": "…", "subject": "math", "grade": 3, "difficulty": "standard",
        "type": "input", "correct": true, "attempts": 1, "hints": 0,
        "resource": "wood", "reward": 26 }
    ]
  },

  "settings": { "furigana": true, "furiganaAuto": true },

  "flags": { "introSeen": false, "diagnosisOffered": false, "unlockNoticesSeen": [] }
}
```

| 項目 | 補足 |
|---|---|
| `unlocked[教科]` | 解放済みの最高学年。昇格試験・実力診断でのみ上がり、下がることはない。**「最高到達学年」はこの値**（初期値2も含めて表示） |
| `correctLog` | 反復倍率用。問題IDごとの正解時刻。書き込み時に24時間より古いものを削除するので肥大化しない |
| `stats[教科][学年].recent` | 直近10問（1=正解, 0=不正解）。推奨表示と正答率倍率の両方に使う |
| `history` | 直近500件。超えたら古い順に削除 |
| `examHistory` | 直近100件まで |
| `quarry.level = 0` | 未解放。中央炉 Lv2 到達時に Lv1 になり、`lastCollectedAt` を設定 |
| `settings.furiganaAuto` | ユーザーが手動で切り替えるまで true。true の間は「全教科が Lv2 以下なら ON」を自動適用 |

**データ移行（state.js）**

- `saveVersion` がない、または古いデータは `MIGRATIONS[v]`（v → v+1 の関数）を順に適用して最新版にします。
- 最後に「初期状態との不足項目の補完」を行い、新しく追加した教科・資源・建物のキーが自動で入るようにします。
- インポート時も同じ処理を通します。JSON として壊れている・必須項目の型が違う場合は取り込まず、エラーメッセージを表示します。

**保存のタイミング**：状態を変える操作はすべて `app.commit(newState)` を通し、その中で保存します。加えて `visibilitychange`（hidden）と `pagehide` でも保存します。

---

## 6. 主要ロジックの仕様（関数の形）

すべて純粋関数。`now` と `balance` は引数で受け取ります（`balance` は省略時 `FF.balance`）。

### 6.1 チケット（tickets.js）

| 関数 | 動作 |
|---|---|
| `recoverTickets(t, now)` | `now < lastRecoveredAt`（時計が戻った）→ 枚数はそのまま、`lastRecoveredAt = now`。満タン → `lastRecoveredAt = now`。それ以外 → `n = floor(経過 / 5分)` 回復（上限20）。上限に達したら `lastRecoveredAt = now`、達しなければ `lastRecoveredAt += n × 5分`（端数を保持） |
| `consumeTicket(t, now)` | 先に回復処理。0枚なら失敗を返す。満タンから使ったときは `lastRecoveredAt = now` |
| `msUntilNext(t, now)` | 次の回復までの残りミリ秒（満タンなら null） |

チケットの消費は「4択の回答を確定した時点」だけ。問題の表示・戻るでは呼びません。

### 6.2 報酬（rewards.js）

```text
calcReward({ grade, difficulty, answerType, hintsUsed, attempt, repeatCount,
             facilityLevel, isFocusSubject, recent }) → 整数（floor、最低1）
```

- `repeatCount` ＝ その問題の24時間以内の正解回数（今回を含まない）。`countRecentCorrect(correctLog, qid, now)` で求めます。
- `facilityLevel` ＝ 選んだ資源を生産する施設のレベル。0（石切り場が未解放）のときは倍率 1.0。
- `focusSubjectOf(now)` ＝ 端末のローカル日付から通し日数を求め、`SUBJECTS[通し日数 % 教科数]`。
- `recent` ＝ その教科・学年の直近10問（今回を含まない）。正答率 a（不足分は 60% とみなす）が 60% 未満なら (a/0.6)^4 をかける。
- 報酬が発生するのは正解時だけ。不正解・3回失敗は 0。

### 6.3 出題と回答（learning.js）

- **学習の流れ**：資源を選ぶ → 教科 → 学年（解放済みのみ選択可）→ 難易度 → 形式 → 連続出題（「戻る」で終了）
- **出題の選択**：候補の中から「24時間以内の正解回数が最も少ない問題」を優先してランダムに選びます。直近に出した問題は避けます。算数は生成問題と文章題を混ぜます。
  → 反復倍率で損をする問題を、システムの側からなるべく出さないようにします（第2章 原則3）。
- **4択**：選択肢は表示のたびにシャッフル。回答は1回だけ。回答後は正誤にかかわらず正解と解説を表示。
- **自由入力**：最大3回。3回失敗で正解と解説を表示し、報酬なし。
- **ヒント**：1段階ずつ開く。使った最大段階を記録（4択・自由入力の両方で使える）。
- **正誤の数え方**：自由入力は「3回以内に正解」を正解として数えます（回答回数は記録と報酬に反映）。連続正解数も同じ基準。
- **推奨表示**：その教科・学年の `recent` が10件そろい、正答率40%未満のとき「ひとつ下の学年で力をつけよう」を表示（自動で学年は下げない）。
- 昇格試験・実力診断の回答は、学習記録の成績・反復倍率・報酬には含めず、試験履歴にだけ記録します。

### 6.4 昇格試験・実力診断（exam.js）

**昇格試験**
- 受験可能な学年：`unlocked + 1` 〜 `unlocked + 3`（最大 Lv9）、クールダウン中は不可。
- 出題：その学年の標準問題から5問、うち3問以上を自由入力。チケット消費なし、報酬なし。
- 4問以上正解で合格 → `unlocked = 受験学年`。不合格 → `examCooldownUntil = now + 10分`。

**実力診断**（開始時に任意・スキップ可。各教科1回まで）
- 自由入力中心（10問中おおむね8問以上）。Lv5 標準から始め、正解で+1、不正解で-1（範囲 Lv1〜Lv7）。
- 結果：「正解した学年のうち、その学年での正解数 ≥ 不正解数となる最高学年」。下限2、上限7。
- 結果が現在の `unlocked` より高いときだけ反映。

### 6.5 建物（buildings.js）

| 関数 | 動作 |
|---|---|
| `upgradeCost(buildingId, currentLevel)` | 中央炉は表、それ以外は 0.4 × 配分比 |
| `canUpgrade(state, buildingId)` | 最大Lv未満、中央炉以外は `level < 中央炉のlevel`、資源が足りる、解放済み。理由付きで返す |
| `upgrade(state, buildingId, now)` | 資源を引いてレベル+1。中央炉なら解放処理（石切り場を Lv1 に） |
| `pendingProduction(building, housingLevel, now)` | `floor(level × 60 × min(経過時間, 保管上限) / 1時間)`。時計が戻っていたら 0 |
| `collectAll(state, now)` | 全生産施設の生産物を資源に加え、`lastCollectedAt = now` |

---

## 7. 画面の構成（フェーズ6の概要）

- 縦画面を基本とした1ページアプリ。画面下部のナビ：🏠基地 / 🗺️探索🔒 / ⚔️戦闘🔒 / 👥仲間🔒 / 📖学習 / ⚙️設定
- ヘッダーに資源4種とチケット（「問題チケット 12 / 20」「次の回復まで 03:21」）を常時表示し、1秒ごとに更新。
- 基地：SVG の雪原に6つの建物。レベルごとに形・灯り・煙・積雪が変化。見張り塔などの予告はロック表示。
- 学習記録：「数学 Lv6 / 国語 Lv5 / …」の一覧と注記「これはゲーム内の記録であり、学校の正式な評価ではありません」。
- 名前やテンプレート文の表示はすべて `textContent`／DOM ノードの組み立てで行う。
- 確認ダイアログ（リセットの2段階確認など）は画面内のモーダルで作る。
- デザイン：半透明のダークパネル、氷青と炉のオレンジの2色を軸にした高コントラスト、金属質の枠。

---

## 8. デバッグ画面とシミュレーター

- `?debug=1` のときだけ、設定画面にデバッグタブを表示。
- テスト操作：資源追加、時間を進める（`clock.advance()`）、チケット数の設定、全データリセット。
- シミュレーター（`simulator.js`）は入力（学年・難易度・形式・1問の秒数・正答率）から、中央炉 Lv2 / Lv3 / Lv5（全施設 Lv5）までの**プレイ時間**を計算します。
  - 毎回、最も不足している資源を選んで学習し、買えるようになった強化を即実行する貪欲法。
  - 施設ボーナス、4択のチケット上限（切れたら自由入力に切り替える）、生産（1日のプレイ時間と受け取りタイミングを仮定）を含めます。
- `tests/simulate.js` は同じ関数を使い、第9.4節の9マスの到達時間と ±30% の判定を表で出力します。

---

## 9. 自動テストの構成（tests/run.js）

自作の最小ランナー（`test(name, fn)`、最後に「成功数 / 失敗数」と失敗したテスト名・理由を出力、失敗があれば終了コード1）。

| グループ | 主な内容 |
|---|---|
| 名前 | 空欄→「プレイヤー」、前後空白の除去、12文字の上限、テンプレートの展開 |
| チケット | 初期20、回答で-1（正誤問わず）、5分で1回復、17分で3回復して残り約3分、上限20、時計が戻っても減らない、満タンから使うと `lastRecoveredAt=now` |
| 報酬 | 全倍率の組み合わせ、切り捨て、最低1、反復 1.0→0.5→0.1、24時間経過で元に戻る |
| 判定 | apple 5パターン、りんご/リンゴ、0.5/.5、any-of、数値のカンマ・全角マイナス |
| 昇格試験・診断 | 4/5 で合格・3/5 で不合格、クールダウン10分、受験範囲 +1〜+3、診断の上限 Lv7、未解放の学年は選べない |
| 建物 | 資源不足、中央炉の上限、強化後のレベル、石切り場の解放、生産の保管上限 |
| 保存 | 移行（fixtures/save_v0.json）、エクスポート→インポートで同じ状態 |
| 問題データ | 必須項目、`choices` が4つ、`answer ∈ choices`、ID重複なし、`validationMode` の値 |
| 生成 | 全学年×全難易度×2形式で1000問ずつ生成し、答えの検算とエラーなし |

---

## 10. 設計段階で見つかった懸念点

**対応状況（フェーズ2）**：10.1 は提案1・2とも採用し SPEC 6.2・10.3 に反映。10.2・10.3 は `balance.js` を調整して解消。10.4 は SPEC 第8章に「正答率倍率」を追加して解消（期待値は `node tests/simulate.js` で確認）。

### 10.1 昇格試験の問題数が足りない（仕様同士の矛盾）

- 昇格試験は「その学年の**標準問題**を5問、うち3問以上は自由入力」です。
- しかし第10.3節の最低数は、国語・理科・社会・英語で「各学年6問（標準は**2問**）」です。
- このままでは算数以外の昇格試験が実施できません。

**提案**：
1. 試験は標準問題を優先し、足りない分は同じ学年の基礎・発展で補う。それでも5問（自由入力3問）に届かなければ「準備中」と表示。
2. フェーズ7の目標数を「各学年9問（基礎2・**標準5（自由入力3以上）**・発展2）」に引き上げる。

また、同じ5問が毎回出ると、答えを覚えて合格できてしまいます。問題数が増えるまでは避けられないため、既知の課題として扱います。

### 10.2 生産量が「経済の1割」を大きく超える可能性

- 仕様の「施設レベル × 60 個／時間」と「保管上限 4〜12時間」で計算すると、1日1回受け取るだけで Lv1 の施設でも1日 240 個／資源になります。
- 「1日30分 × 約1か月（合計約15時間の学習）」という想定では、1か月の生産量が経済全体（全施設 Lv5 までの総コスト約7.3万）の3〜4割に達する見込みです。
- **提案**：生産量の数値は `balance.js` に置き、フェーズ2のシミュレーションで「1日30分プレイ」の前提で1割程度になるよう調整する（例えば毎時の生産量を下げる）。調整結果はフェーズ2で報告します。

### 10.3 目標時間との概算のズレ（フェーズ2で調整）

生産・施設ボーナス・正答率を無視した概算です。

| 到達点 | Lv1のみ | Lv5中心 | Lv9中心 | 目標 |
|---|---|---|---|---|
| 中央炉 Lv2（250個） | 約4分 | 約3分 | 約2分 | 5 / 4 / 3分 |
| 中央炉 Lv3（計2,050個） | 約34分 | 約23分 | 約14分 | 60 / 40 / 25分 |
| 全施設 Lv5（計約72,750個） | 約20時間 | 約13.5時間 | 約8時間 | 15 / 10 / 6時間 |

中央炉 Lv3 は目標より速く、Lv5 は目標より遅い傾向です。フェーズ2で正答率・自由入力倍率・施設ボーナスを入れて精算し、必要ならコストを調整します。

### 10.4 高学年の4択の当てずっぽう

- Lv9 の4択を当てずっぽうで答えると、期待値は 150 × 0.25 ≒ 37 個／チケット（数秒）で、Lv1 を考えて解く（10個／10秒）より多くなります。
- 昇格試験（自由入力3問以上）で守られていますが、一度解放した学年では有効です。チケット上限（20枚＋毎時12枚）が歯止めになっています。
- フェーズ2で「1時間あたりの最大獲得量」を当てずっぽうの場合と比べ、問題があれば報告します（仕様の倍率は変えずに、4択の出題選択などで対応できるか検討）。

---

## 11. 独自に判断した点（CLAUDE.md にも記録）

1. `ui.js` と `learning.js` を複数ファイルに分割し、`config.js`・`defs.js`・`texts.js`・`util.js`・`storage.js`・`answer.js`・`exam.js`・`simulator.js` を追加した。
2. `localStorage` に触れるのは `storage.js` だけにし、`state.js` は純粋関数にした（テストしやすくするため）。
3. 「最高到達学年」は `unlocked`（解放済みの最高学年）と同じ値とし、初期値の Lv2 も表示する。
4. 石切り場は中央炉 Lv2 到達時に無料で Lv1 になる（Lv0→1 のコストは仕様にないため）。
5. 石切り場の解放前でも、学習で石を選んで獲得できる（中央炉 Lv2 に石が必要なため）。施設ボーナスは 1.0。
6. 施設の強化時点で、未受け取りの生産物は新しいレベルで計算される（v0.1 では簡略化）。
7. すべての判定モードで `answer` と `acceptedAnswers` の両方を正解候補とする。
8. `number` モードではカンマ区切りと全角・異体字のマイナス記号を許容する。分数表記は `exact` で扱う。
9. 自由入力は3回以内に正解すれば「正解」として正答率・連続正解数に数える。
10. 昇格試験・実力診断の回答は学習成績・反復倍率に含めない。
11. 実力診断は教科ごとに1回まで。結果は「正解数 ≥ 不正解数の最高学年」（下限2・上限7）。
12. 推奨表示は直近10問がそろってから判定する。
13. 本日の重点教科は端末のローカル日付で切り替える。
14. 自動生成の問題 ID は数値から決定的に作り、反復倍率が効くようにする。
15. 出題時は24時間以内の正解回数が少ない問題を優先する。
16. ふりがなは `{漢字|かんじ}` 記法で書き、DOM で `<ruby>` を組み立てる。自動設定はユーザーが手動で切り替えるまで有効。
17. 試験履歴は直近100件まで保存する。
18. 不正な問題データは出題から除外して警告のみ出し、ゲームは止めない。
