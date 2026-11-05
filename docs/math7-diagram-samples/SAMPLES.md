# 中1数学 第1回 図の見本

390px幅・実際の問題画面。問題データは変更せず、撮影時だけ図を注入した。答えは照合用にこの一覧へ記載し、未回答の図中には追加しない。選択肢にある答えは通常の問題画面の表示。

再撮影: `node tests/ui-math7-diagram-samples.cjs`（Chromium、playwright）。設定は samples.json、機械検査記録は inspection.json。

|種類|問題ID|問題文|答え（照合用）|スクリーンショット|
|---|---|---|---|---|
|numberline|math_g7_signed_numbers_001|海面を基準に、上を正とします。海面より12m下の位置を符号付きの数で表しなさい。単位は不要です。|−12|[見本](01-math_g7_signed_numbers_001.png)|
|numberline|math_g7_signed_numbers_012|数直線上の−5と＋2の間の距離を答えなさい。|7|[見本](02-math_g7_signed_numbers_012.png)|
|coordinate|math_g7_proportion_005|点Aの座標は（−4，3）です。x座標を答えなさい。|-4|[見本](04-math_g7_proportion_005.png)|
|coordinate|math_g7_proportion_024|y＝−12/xで、−6≦x≦−2のときのyの変域はどれですか。|2≦y≦6|[見本](05-math_g7_proportion_024.png)|
|coordinate|math_g7_proportion_026|比例と反比例のグラフがともに点（2，6）を通ります。x＝4のときのyについて正しいものはどれですか。|比例は12、反比例は3|[見本](06-math_g7_proportion_026.png)|
|circle|math_g7_plane_015|半径6cm、中心角120°のおうぎ形の弧の長さを、πを使い単位なしで答えなさい。|4π|[見本](07-math_g7_plane_015.png)|
|circle|math_g7_plane_025|半径8cm、中心角135°のおうぎ形の面積を、πを使い単位なしで答えなさい。|24π|[見本](08-math_g7_plane_025.png)|
|circle|math_g7_plane_027|直径12cmの円から、中心角150°のおうぎ形を切り取ります。このおうぎ形の面積を、πを使い単位なしで答えなさい。|15π|[見本](09-math_g7_plane_027.png)|
|solid3d|math_g7_space_010|半径3cm、高さ5cmの円柱の体積を、πを使い単位なしで答えなさい。|45π|[見本](10-math_g7_space_010.png)|
|solid3d|math_g7_space_014|半径3cm、高さ4cmの円柱の表面積を、πを使い単位なしで答えなさい。|42π|[見本](11-math_g7_space_014.png)|
|mathGeometry|math_g7_plane_003|点Pから直線lへの垂線の長さは4cm、別の斜めの線分の長さは5cmです。点Pと直線lの距離を、cmを付けずに答えなさい。|4|[見本](12-math_g7_plane_003.png)|
|mathGeometry|math_g7_plane_013|中心O、半径6cmの円に点Aで接する直線lがあります。半径OAと直線lのなす角を度数だけで答えなさい。|90|[見本](13-math_g7_plane_013.png)|
|mathGeometry|math_g7_plane_018|直線l上の点Pに垂線を作図します。l上でPA＝PBとなる点A、Bを取り、A、Bから同じ半径の円弧で交点Qを作った後はどうしますか。|PとQを結ぶ|[見本](14-math_g7_plane_018.png)|
|quantityBars|math_g7_expression_009|1個b円の品物を2個買い、袋代10円を加えます。合計を表す式はどれですか。|2b＋10|[見本](15-math_g7_expression_009.png)|
|quantityBars|math_g7_expression_021|長さa cmのひもから7cm切った残りがb cmです。関係を表す等式はどれですか。|a−7＝b|[見本](16-math_g7_expression_021.png)|
|quantityBars|math_g7_equation_025|同じノートを1人4冊ずつ配ると6冊足りず、3冊ずつなら9冊余ります。人数をx人とした方程式はどれですか。|4x−6＝3x＋9|[見本](17-math_g7_equation_025.png)|
|spatialFigure|math_g7_space_011|底面の半径3cm、高さ4cmの円{錐\|すい}の体積はどれですか。|12π|[見本](18-math_g7_space_011.png)|
|spatialFigure|math_g7_space_016|底面の半径3cm、母線5cmの円{錐\|すい}の表面積を、πを使い単位なしで答えなさい。|24π|[見本](19-math_g7_space_016.png)|
|spatialFigure|math_g7_space_028|半径3cmの半球を切り口の円も含めて囲む表面積を、πを使い単位なしで答えなさい。|27π|[見本](20-math_g7_space_028.png)|
|quantityBars|math_g7_equation_019|生徒に鉛筆を1人3本ずつ配ると5本余ります。生徒x人、鉛筆41本のときの方程式はどれですか。|3x＋5＝41|[見本](21-math_g7_equation_019.png)|

判断539：03（signed_numbers_019）は答えの順序を示すため削除。既存の見本番号を維持し、21（equation_019）を追加した。線分図は15・16・17・21の4点。計画は106図・107問。origin/mainの判断540を取り込んで撮影。

確認：ページの横はみ出し・SVG文字の見切れなし。全見本を目視し、文字の重なりと可読性を確認。寸法・座標・角度と答えの点を描かない条件は tests/cases/math7-diagram-samples.js でも検証する。通常の目盛りは共通制約の例外として表示する。文字量は模式図、錐の母線だけが既知の問題では高さの数値を表示しない。
