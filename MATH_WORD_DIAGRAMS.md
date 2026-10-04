# 算数文章題55問への図の追加（判断223）

2026-10-04。mainのPR #11取り込み済みコミット `e82fa03b6da8f4b294359c853e2f58ff09f0581c` を土台に、`codex/math-word-diagrams-55` で制作。

## 実装と変更ファイル

依頼表の55問すべて（A 38問・B 17問）に図を追加。Bの省略はなし。元の90問のID・問題文・答え・選択肢・ヒント・解説・inputForm・reviewedを保持し、diagramを除いた全データのSHA-256で不変を確認。セーブ項目・saveVersion・外部ライブラリ・通信処理は追加していない。

- `questions/math_word.js`：55問にdiagramを追加。
- `js/defs.js`：新規15種類の必須項目を登録。
- `js/svg/learning.js`：共通SVG描画と既存図の拡張。
- `QUESTIONS_GUIDE.md`：種類と任意項目の説明。
- `DECISIONS.md`：判断223を追記。
- `tests/cases/math-word-diagrams.js`：55問網羅・元データ不変・書き問題継承・範囲・答えを表示しないデータのテスト4件。
- `tests/cases/renewal.js`：小4の図なし文章題を10→4問に更新し、文章題10問全体が出題される検証を保持。
- `tests/ui-math-word-diagrams.cjs`：実際の問題画面55問×4幅のChromium検証と撮影。
- `MATH_WORD_DIAGRAMS.md`：この報告。

## 新規の図の種類と使用ID

|種類|必須項目（captionも全種類で必須）|使った問題ID|
|---|---|---|
|`objects`|`item`, `groups`, `labels`|`math_g1_addsub_001`、`math_g1_order_001`、`math_g1_number_001`、`math_g2_multiply_001`、`math_g2_multiply_003`、`math_g2_multiply_004`、`math_g3_division_001`、`math_g3_division_002`、`math_g3_division_004`、`math_g6_case_001`|
|`clock`|`minute`|`math_g1_clock_001`、`math_g4_angle_001`|
|`tape`|`values`, `labels`|`math_g2_length_001`、`math_g2_time_001`、`math_g2_length_002`、`math_g3_length_001`|
|`measure`|`capacity`, `values`, `labels`, `unit`|`math_g2_volume_001`|
|`balance`|`weights`|`math_g3_weight_001`|
|`nestedRect`|`w`, `h`, `innerW`, `innerH`, `unit`|`math_g4_area_002`、`math_g9_quadratic_001`|
|`triangle`|`base`, `height`, `unit`|`math_g5_area_001`、`math_g9_pythagoras_001`|
|`pie`|`numerators`, `denominators`, `labels`|`math_g5_fraction_001`|
|`band`|`parts`, `labels`, `totalLabel`|`math_g5_percent_001`、`math_g5_percent_002`、`math_g6_ratio_001`、`math_g6_ratio_002`|
|`doubleLine`|`labels`, `ends`|`math_g3_time_001`、`math_g5_speed_001`、`math_g6_scale_001`|
|`circle`|`radius`, `unit`|`math_g3_circle_001`、`math_g6_circle_001`、`math_g7_sector_001`|
|`coordinate`|`a`, `b`, `power`, `xRange`, `yRange`, `formula`|`math_g8_linear_003`、`math_g9_function_002`|
|`exterior`|`angle`|`math_g8_angle_002`|
|`inscribed`|`angle`|`math_g9_circle_001`|
|`similarity`|`height`, `shadows`, `unit`|`math_g9_similarity_001`|

## 既存の図の使用・拡張

- `rect`：`math_g4_area_001`、`math_g4_area_003`、`math_g9_sqrt_001`
- `fractionSum`：`math_g4_fraction_001`
- `numberline`：`math_g4_rounding_001`、`math_g7_integer_001`、`math_g7_integer_002`
- `bars`：`math_g5_average_001`
- `solid`：`math_g5_volume_001`、`math_g6_volume_001`
- `fraction`：`math_g6_fraction_001`
- `table`：`math_g7_proportion_001`、`math_g7_data_001`、`math_g8_probability_001`
- `polygon`：`math_g8_angle_001`、`math_g9_pythagoras_002`
- `cards`：`math_g8_probability_002`

`fractionSum.separate` で3/5と4/5を別々に表示。`fraction.whole` で1kgを表示。`rect.area` は未知の辺を持つ正方形。`polygon` は五角形・寸法付き長方形と対角線1本。`solid` は寸法と水深・三角柱。`numberline` は既知点の印、方向、負のラベルを隠す指定。従来の図の既定描画は維持する。

## 検証

- `node tests/run.js`：439件成功、失敗0。
- `node tests/simulate.js`：すべて目標内。
- `node tests/ui-math-word-diagrams.cjs`：55問×360/390/768/1024px＝220画面成功。SVG文字のgetBBoxとviewBoxによる見切れ、図内とページ全体の横はみ出し、ブラウザエラーはいずれも0。
- `node tests/ui-renewal.cjs`：既存図解100問・開始画面・全教科・回答と報酬・再回答・フィルター・セーブ再読込・引換・試験の回帰検証成功。既存100問の390/1024pxでも見切れ・横はみ出し0。
- Chromium（Google Chrome）、昼のテーマ、`file://.../index.html` で検証。ローカルサーバーなし。
- 390/1024pxで全55問の図110枚を撮影。固定ヘッダーと下部ナビだけ撮影時に非表示にし、図への重なりを除去（レイアウト検査は通常の実画面で行う）。スクリーンショット・一覧HTML・results.jsonは作業報告の添付一式。
- 小1・小2はひらがな中心、SVGラベル24〜30、時計の数字28で表示。個数の多い図は高さ上限を解除し、絵を小さく縮めない。最低360pxでもラベルは約13.6〜17px以上（文字サイズと図の表示倍率から検査）。
- 答えを表示しない設計を各問題のデータと代表画像で確認：時刻の文字、合計の分数、わり算後の個数・束数、単位換算後の合計、割合・面積・体積の答え、樹形図、交点の印、外角問題の全辺数を表示しない。問題文にある値と同じ数が答えにも現れる場合（平均の問題の12等）は元の既知値として表示。

## 依頼書との差と判断

- `math_g3_division_004`：依頼表は「32本のたきぎ」だが実際の問題は花。問題文を保持して花32本の絵にした。
- `math_g4_fraction_001`：既存fractionSumの合算表示では答えが完成するため、指定の種類を拡張して別の帯で3/5L・4/5Lを表示。
- `math_g2_length_002`：ものさし4本と12cmを縦に配置。小さい画面でもラベルと長さを読めるようにした（長さの比は保持）。
- `math_g3_time_001`：時刻と経過時間を対応する2本の線で示し、到着時刻は `？` とした。時間・道のり・縮尺と共通の種類を使用。
- `math_g8_linear_003` / `math_g9_function_002`：数値目盛りを省き、答えの交点座標や変化の割合を読み取る補助を避けた。放物線のx=1,3だけを指定どおり印で示す。
- 判断番号222はmainですでに使われていたので、番号を続けて223にした。
- 図を付けなかった指定問題：なし。効果が薄いとして省略したB問題：なし。依頼表以外の35問への追加：なし。

作業ブランチをGitHubに反映し、main向けPRで確認を待つ。mainへのマージ・Pagesの更新は今回行わない。

