# 小5算数の手作り118問：図の追加（第3〜5弾）

2026-10-05。`main`（2051defe5f1d614ca9e85251771a1cb3f779bb72）から `codex/hand-diagrams-g5` を作成。第3弾44問・第4弾25問・第5弾49問、計118問すべて実装。省略した問題はありません。PRレビュー待ち、mainへのマージ・公開は行いません。

## 変更と不変条件

- `questions/math_g5_hand.js`：依頼一覧の118問のdiagramだけ追加。
- `js/svg/learning.js`：既存の種類を共通拡張。SVG要素だけで組み立て、昼の既存CSS色を使用。
- `tests/cases/hand-diagrams-g5.js`：118IDの網羅、範囲・対応数、不変性、答えの非表示、依頼との相違の回帰検証5件。
- `tests/ui-hand-diagrams-g5.cjs`：118問×4画面幅、文字の見切れ・重なり・横はみ出し、負例を検証。
- `DIAGRAM_REQUESTS_3.md`・`DIAGRAM_REQUESTS_4.md`・`DIAGRAM_REQUESTS_5.md`：完了・レビュー待ちの表示。
- `QUESTIONS_GUIDE.md`・`DECISIONS.md`・`CLAUDE.md`・本報告：共通拡張・判断247・検証結果。

問題データ470件を、対象118問のdiagramを除いてSHA-256照合。問題文・答え・選択肢・ヒント・解説・ID・難易度・reviewed・inputFormは元と一致。対象外352件はdiagramを含めて一致。確認済みの数・saveVersion・セーブ項目・index.htmlは変更なし。

## 使用した種類

新しいkindは0。既存15種類を使用。全図にcaptionとstudy:trueがあり、studyは小5の拡張だけに適用（従来描画は維持）。下記IDは `math_g5_hand_` を省略。

| 種類 | 数 | 入力項目 | 使用ID |
|---|---:|---|---|
| `polygon` | 43 | 既存必須: shape / 追加: panels(points, notes)、任意 names・heights・segments・angleLabels | `area_001`・`area_003`・`area_009`・`area_017`・`area_021`・`area_004`・`area_030`・`area_013`・`area_014`・`area_024`・`area_026`・`area_028`・`area_032`・`angle_003`・`angle_006`・`angle_014`・`angle_022`・`angle_010`・`angle_011`・`angle_017`・`angle_019`・`angle_021`・`angle_024`・`angle_029`・`angle_033`・`angle_036`・`congruent_004`・`congruent_007`・`congruent_010`・`congruent_011`・`congruent_017`・`congruent_021`・`congruent_022`・`circle_011`・`circle_013`・`circle_014`・`circle_016`・`circle_020`・`circle_022`・`decmul_035`・`unit_001`・`unit_007`・`unit_019` |
| `triangle` | 1 | base, height, unit | `area_002` |
| `solid3d` | 18 | 既存必須: shape, vertices / 追加: dimensions, notes、任意 cut・join・stack・open・water・rise・baseSides | `volume_001`・`volume_004`・`volume_010`・`volume_013`・`volume_016`・`volume_020`・`volume_026`・`volume_027`・`volume_029`・`volume_034`・`prism_004`・`prism_007`・`prism_008`・`prism_013`・`prism_019`・`prism_020`・`prism_021`・`decmul_026` |
| `doubleLine` | 5 | labels, ends、任意 starts | `proportion_013`・`proportion_017`・`proportion_022`・`speed_001`・`speed_007` |
| `coordinate` | 1 | a, b, power, xRange, yRange, formula / 追加: knownPoint, gridSteps | `proportion_020` |
| `band` | 9 | parts, labels / 追加: rows(parts, labels, totalLabel)、任意 schematic・scale | `graph_004`・`graph_009`・`graph_014`・`graph_021`・`graph_022`・`percent_004`・`percent_007`・`percent_015`・`percent_020` |
| `pie` | 1 | numerators, denominators, labels / 追加: sectors, sectorLabels、任意 schematic | `graph_013` |
| `table` | 6 | head, rows | `graph_020`・`intdec_001`・`intdec_013`・`intdec_017`・`average_015`・`unit_014` |
| `circle` | 1 | radius, unit、直径図は diameter | `circle_004` |
| `rect` | 9 | w, h、任意 unit・area | `decmul_004`・`decmul_007`・`decmul_013`・`decmul_022`・`decmul_036`・`multiple_013`・`multiple_020`・`decdiv_021`・`decdiv_027` |
| `tape` | 6 | values, labels、任意 stacked・schematic・notes | `decdiv_006`・`decdiv_009`・`decdiv_029`・`fraction_035`・`speed_015`・`speed_017` |
| `measure` | 3 | capacity, values, labels, unit | `decdiv_022`・`fraction_030`・`average_012` |
| `fraction` | 9 | n, d / 追加: rows(n, d, label)、任意 pieces・used・people | `fraction_001`・`fraction_002`・`fraction_009`・`fraction_015`・`fraction_016`・`fraction_027`・`fraction_031`・`fracrel_001`・`fracrel_014` |
| `numberline` | 5 | start, end, step / 追加: rows(marks, labels, subdivisions)、任意 title・note・endLabel | `fraction_025`・`fracrel_005`・`fracrel_010`・`fracrel_022`・`multiple_014` |
| `bars` | 1 | values, labels | `average_006` |

## 依頼表と異なる判断・答えを描かない工夫

- `proportion_013`：表の「針金3m/12g/7m」ではなく、実際の問題文の「紙10まい/2mm/35まい」を二重の線で表現。問題文は変更なし。
- `prism_013`：表の「円柱の展開図・半径5cm」ではなく、実際の問題文の「五角柱の側面数」に合う五角柱を描画。側面の数値は表示しない。
- `fracrel_010`：比較する2/3・3/4を正しい位置に打つと大小の答えが直接分かるので、0〜1の空の数直線と、既知の分数を置く課題の注記にした。
- `proportion_020`：比例グラフは既知点(4,10)まで。x=6に延長せず、y=15の位置・値を描かない。
- `graph_004`・`graph_022`・`graph_013`：未知の割合を帯の長さや円の角度から読み取れないよう、等幅／等角度の模式図にし、比例していないことをcaptionに明記。凡例には既知割合と？だけ。
- `multiple_014`：6分おき・8分おきの途中の発車だけを示し、24分で重なる印は描かない。末尾は「…」。
- `decdiv_006`・`decdiv_009`・`decdiv_029`：ロープ全体と1本分の長さを参照する模式図。全数の切り分けや数えられる本数は描かない。
- 分数の異分母の帯はそれぞれ元の分母だけで分割し、通分・和・残りの数値を描かない。等分問題は人の数だけ示し、1人分に切らない。平均線・密度・時間換算・面積・体積・未知の角・辺・周りの長さを描かない。

## 検証

- `node tests/run.js`：成功623 / 失敗0。
- `node tests/simulate.js`：すべて目標内。
- `node tests/ui-hand-diagrams-g5.cjs`：118問×360・390・768・1024px＝472表示、見切れ・重なり・横はみ出し・JavaScriptエラー0。文字を端にまたがらせる／完全に外に出す負例8件も検出。
- 昼テーマの問題画面472枚、図だけの390・1024px画像236枚、計708PNGとresults.jsonを保存。各種類の代表例を目視し、既知量・未知量・形・文字を確認。
- 回帰：小4手作り17問×4幅＝68表示成功、既存文章題55問×4幅＝220表示成功、`tests/ui-renewal.cjs`成功。
- 再実行にはPlaywright/Chromiumが必要。既存インストールは `FF_PLAYWRIGHT_MODULE`・`FF_BROWSER_PATH` で指定し、保存先は `FF_QA_OUTPUT` で指定可能。ゲーム自身に外部依存は追加していない。

スクリーンショットの一覧と実測結果は作業報告のローカル出力 `outputs/hand-diagrams-g5/gallery.html`・`screenshots/results.json`。画像はリポジトリにコミットせず、レビュー用成果物として提供。

