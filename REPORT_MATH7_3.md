# 中1数学 第3回

ブランチは codex/math7-questions。第2回の修正と、新作56問を実施した。

## 第2回の修正

- expression_022・027・028・029を発展として作り直した。送料を含む支払額と予算との差、つなぐひもの重なり、買い物後の残額の半分、料金式から人数を読む問題。各単元8・12・8問と選択・書きの数を保持。
- js/answer.jsにformulaモードを追加。exactの正規化に加え、全空白・マイナス記号・積記号・二乗と三乗の表記をそろえる。項や因数の交換は自動では行わず、acceptedAnswersで指定する。
- 文字式・素因数分解の書き問題をformulaへ移し、同じ式の記号だけの別表記をacceptedAnswersから除いた。因数分解の別解は因数の並び違いにした。英語・国語などのexactは変更しない。

## 第3回の内訳

各欄は選択／書き。

|単元|基礎|標準|発展|選択計|書き計|合計|
|---|---:|---:|---:|---:|---:|---:|
|方程式 equation|4／4|6／6|4／4|14|14|28|
|方程式の計算 equation_calc|4／4|6／6|4／4|14|14|28|

解の意味・等式の性質・移項・かっこ・小数・分数・比例式を扱う。文章題は代金・過不足・速さ・年齢・割合・水量を扱い、立式を選ぶ問題も入れた。書き問題はnumberで値だけを答える。全問に個別ヒント、全選択肢に解説を付けた。連立方程式は含めない。

既存見本equation_001〜004はそのまま保持し、新作IDは005〜032とした。単元内numberは1〜28。equation_calcは001〜028。course_ma7_1は累計168問、全問reviewed:false。図は作成しない。

## 変更ファイルと検証

- questions/math_g7_course.js：発展4問の修正・formula化・56問追加。
- js/answer.js：formula判定。QUESTIONS_GUIDE.md：追加モードの記載。
- tests/cases/answer-formula.js：式の記号と空白、累乗、別解・誤答、exactの挙動保持、見本4問の保持、第3回の独立した入力解を検査。
- tests/cases/course-math7.js：6単元168問の数・形式・構造・正誤・ヒントと既存見本を含む178問のID対応を検査。
- DECISIONS.md：判断533。この報告書を追加。
- node tests/run.js：919件成功・失敗0。git diff --check：成功。
- ブラウザ実画面はChromium起動時の環境制限（setsockopt: Operation not permitted）により未確認。

commit・push後に停止し、次の単元には進まない。
