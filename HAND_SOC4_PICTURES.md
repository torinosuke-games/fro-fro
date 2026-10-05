# 小4社会の生成した絵（第10弾）

完了・レビュー待ち。依頼は `DIAGRAM_REQUESTS_10.md`。main `ef65dbc` から `codex/soc4-pictures` を作成。mainにはマージしない。

## 変更範囲

- `img/diagrams/soc4_<ID末尾>.webp` を33枚新規生成。1問1枚で共有しない。
- `questions/social_g4_hand.js` は指定33問の diagram のみ。kind・src・alt・caption・study を指定。問題文・答え・選択肢・ヒント・解説・ID・難易度・inputForm・reviewed は維持。
- 日本地図18問と対象外264問の図・問題を変更しない。industry_013・014 の港の絵は追加しない。
- ユーザーの追加承認により、画像化に対応する最小限のテスト修正と、この作業記録・依頼書の完了記録・判断255を含める。
- 描画コード・CSS・DIAGRAM_KINDS・saveVersion は変更しない。main に準備済みの image を利用する。

## 生成・保存方法

imagegen スキルと組み込み image_gen を使用。CLI/API での生成やSVGの代用はしていない。1枚ずつ別の生成リクエストを使用。
生成PNGを、Node.jsのsharpで縮小と形式変換のみ実施：`resize(960,640).webp({quality:78,effort:6})`（disaster_015のみ容量調整でquality:72）。切り抜き・合成・文字の消去は変換処理で行わない。
全画像は不透明の横3:2、960×640pxのWebP。容量と表示の検証結果は末尾に記載する。

## 絵の確認方針

各問題文・答えと並べ、絵の文字・数字・看板・ロゴ・文字のような模様、答えの名前、依頼外の場所・結果の追加がないか確認する。
依頼書に描くよう指定された対象・災害の現状・地形は、名前を付けずに描く。これらを全面的に隠すと第10弾の目的と矛盾するため、名前・数・余計な解説を教えない方針とする。
夜の祭りは依頼書の場面であり、アプリの夜テーマは追加・検証しない。

## プロンプト

共通の先頭（water_007以外の各 Scene に付加）：

> Use case: illustration-story. Asset type: fourth-grade social-studies game illustration, landscape 3:2, 1536x1024. Style: polished warm Japanese anime game environment art, crisp readable shapes, soft painterly textures, clear child-friendly composition. Scenic background, never white. Keep important subjects centered with generous outer margins. No text, letters, numbers, signs, signboards, pseudo-writing, logos, watermarks, UI, labels, arrows or map labels anywhere. No extra educational answers, names, region names, capacities or explanations. People, when specified, small and distant with backs visible, not large portraits. Single illustration, not a collage.
Scene:

各画像の Scene（IDは social_g4_hand_ の後ろ。ファイル名は soc4_<ID>.webp）：

### water_009

> A large square sedimentation pool at a water treatment plant, viewed from high above at an oblique angle. Slightly cloudy water, a layer of brown mud visibly settled at the bottom through the water; the surface remains level. Concrete rim, surrounding grass and a few distant plain buildings. No arrows or depicted moving particles. Bright daylight.

キャプション：池の中のようす

### water_010

> An educational cutaway perspective of a rectangular water treatment pool in a sunny green landscape. One front concrete wall is cut away to clearly reveal horizontal layers: water at the top, fine sand immediately below the water, then progressively coarser gravel layers beneath. The central cutaway is large and readable. No arrows, no labels, no gauges or numerical markings. No implied experiment stages.

キャプション：池の中の層のようす

### garbage_001

> A broad landfill site in a green mountain valley. A small yellow bulldozer levels a modest low mound of gray ash and mixed unmarked waste, with earth-covered areas. Trees surround the site. No branded containers, no legible packaging, no people. Sunny landscape, focus on landfill ground and bulldozer.

キャプション：山あいのごみをうめる場所

### garbage_004

> A plain white rear-loading garbage collection truck at a neighborhood collection point in a Japanese residential street in morning light. Small workers seen from behind lift unmarked garbage bags into the truck. No writing, number plates, labels or markings on truck, clothes, houses or bags. The truck and workers clearly visible, distant simple rooftops.

キャプション：まちでごみを運ぶ車

### electric_003

> Three or four large white wind turbines with three blades each spaced on a grassy seaside hill. Blue sea beyond and bright blue sky. Turbines fully visible, not cropped, clear simple silhouettes. No motion arrows or extra electrical explanation.

キャプション：海岸の丘に並ぶ設備

### electric_004

> A modest Japanese house with neat rows of blue photovoltaic panels fitted flush along its sloping roof. Bright sun in a blue sky and gentle green trees. View from slightly above so roof panels are clear. No arrows, meters, numerical displays or wires leading to light bulbs.

キャプション：屋根の上に並ぶ設備

### electric_005

> Tall steel lattice electricity pylons connected by clearly visible thick power cables crossing a green mountain and rice-field landscape. View along the line receding into the distance. Accurate suspended cables joining pylon insulators, central pylon entirely within canvas. Sunny blue sky.

キャプション：鉄塔と線のつながり

### electric_006

> A fenced electrical substation in a green landscape beside a tall transmission pylon. Several large gray transformers and ceramic insulator structures inside the fence, power wires visibly connected to the pylon. Plain unmarked equipment, no gauges, diagrams or voltage numbers. Sunny daylight, elevated three-quarter view.

キャプション：鉄塔のそばの電気の設備

### electric_015

> A large geothermal power station in a mountain setting with thick steel pipes rising vertically from steaming ground and connected to the power plant. White steam drifting above the rocky ground and industrial equipment. Green mountains and gentle daylight. Clearly steam, not smoke, no erupting volcano or molten lava. No process arrows, no labels.

キャプション：山あいの地面と発電設備

### disaster_003

> After heavy rain, a river has overflowed into a quiet Japanese town. Streets and the lower portions of several houses are inundated with muddy water; river is visible nearby and the sky is cloudy. No people, no rescue scenes, no graphic destruction or dramatic danger. Readable calm educational wide view.

キャプション：川とまちのようす

### disaster_004

> After heavy rain a section of a green mountain slope has collapsed, leaving an exposed brown scar. Soil and rocks have slid down near a small house at the foot of the slope. Cloudy damp landscape. No people or animals, no injuries, no motion arrows. Show the mountain slope and debris clearly in a wide educational scene.

キャプション：山のしゃ面と家のようす

### disaster_005

> A high-altitude aerial view of the Japanese archipelago surrounded by blue ocean. Recognizable Hokkaido, Honshu, Shikoku and Kyushu island silhouettes. A large spiral white cloud system is over open Pacific Ocean south-east of the islands, entirely offshore, clearly not on the land. Painterly anime educational landscape, no borders, labels, arrows or names.

キャプション：日本の近くの海と雲

### disaster_006

> A volcano erupting a gray plume high into a cloudy sky, with fine gray ash falling softly onto trees and rooftops of a small distant town. Wide educational scene, no people, no victims, no lava reaching town, no fiery explosion. Make gray ash specks and light dust coating roofs visible without text or arrows.

キャプション：火山とまわりのようす

### disaster_011

> A closed red backpack-shaped emergency bag on the wooden floor of a peaceful Japanese home's entryway. Warm soft daylight, simple doorway and shoe step in background. Bag fully zipped shut, contents invisible. No badges, labels, symbols, lettering or items scattered around it.

キャプション：災害にそなえる袋。中身は示していない

### disaster_014

> A long high concrete seawall stretching along a coastal Japanese town. Sea and modest waves on the seaward side, small houses on the landward side. Slightly elevated wide perspective clearly separates sea from town. Sunny scenic background, no tsunami disaster, no arrows or result annotation.

キャプション：海岸とまちの設備

### disaster_015

> A mountain stream in a lush green valley with several small stone and concrete check dams arranged at successive levels along the stream. Distinct low stepped barriers crossing the stream, surrounding trees, gentle water. Wide elevated view. No collapsed hillside, no debris flow or arrows illustrating the result.

キャプション：山あいの川と設備

### disaster_026

> A red roadside fire hydrant standing beside a neatly coiled plain hose in a quiet Japanese residential street at early evening. Warm sunset light, simple distant homes. Hydrant and hose centered and fully visible. No fire, no people, no signs, symbols, writing or spray of water.

キャプション：道ばたの設備とホース

### tradition_001

> A summer nighttime festival parade in a Japanese town. A large illuminated three-dimensional paper lantern float depicting a colorful warrior figure rolls along the street, glowing warmly. Small distant onlookers and carriers seen from behind, no prominent real persons. Float is sculptural, not a portrait poster. Absolutely no lettering, kanji, signs or text-like decorative marks on lanterns, float or buildings.

キャプション：大きな灯ろうを運ぶまつり

### tradition_002

> A daytime festival procession through a Kyoto-like traditional Japanese town. A large wooden wheeled festival float has an ornate small roof and a very long tall central pole rising above it. Distant spectators. Float and complete pole inside the canvas with generous margins. Decorative panels plain geometric or floral only, no writing, signboards, logos or flags with symbols.

キャプション：まちを進むまつり

### tradition_004

> A glossy almost-black lacquer bowl and a matching lacquer tray on a wooden table, softly lit in a quiet traditional Japanese room. Elegant thin gold line decoration only, no symbols, writing, pictorial motifs or brand marks. Emphasize smooth glossy lacquer surfaces, clear silhouettes of bowl and tray.

キャプション：工芸品の形と色

### tradition_007

> A heavy dark black cast-iron Japanese teapot with round body, stout short spout, lid and arched handle on a wooden table. A gentle wisp of steam rises from the spout. Plain dimpled iron texture, no emblems, lettering or brand marks. Cozy traditional interior, soft warm lighting, teapot fully within frame.

キャプション：鉄で作った工芸品

### tradition_014

> A large beautiful white Japanese castle with a multi-tier central keep and layered dark tiled roofs, set on stone ramparts above a moat. Blue sky, green surroundings, warm clear daylight, anime game art. Generic architecture matching the question, no labels or signs, no additional landmarks, dates, crests or names.

キャプション：城のつくり

### tradition_033

> A nighttime Japanese summer festival. One small distant performer seen from behind balances a long upright bamboo pole from its lower end; multiple crossbars carry many small glowing plain paper lanterns like a tall branching tree. Distant audience. Entire lantern structure and pole visible with margins. No letters or symbols on any lantern, no identifiable portraits.

キャプション：灯ろうをつるしたさおと人

### pioneer_005

> A calm broad river with long raised earthen levees on both banks, their sloping sides covered in green grass. An elevated view looking along the river shows the raised embankments and small town far in the background. Bright daylight, clear terrain. No flooding, no result arrows or labels.

キャプション：川と両岸のつくり

### pioneer_014

> A substantial stone single-arch aqueduct bridge spans a green mountain valley. A shallow open water channel is clearly visible along the bridge top, not a road. Rice fields and mountains around it. Wide slightly elevated view shows whole arch and channel. No people, signboards, name inscriptions or spectacular water discharge.

キャプション：山あいにかかる石の橋

### pioneer_025

> At the entrance of a small irrigation channel from a river toward rice paddies, a simple wooden sluice board fitted into sturdy stone supports regulates the opening. Scenic green fields and low mountains. Elevated close wide view clearly shows board, stone supports and adjoining water channels. No arrows, labels or measured volumes.

キャプション：川と田につながる設備

### industry_006

> A broad green dairy pasture with several black-and-white Holstein cows grazing, a simple silo far in the background and distant green hills. Clear warm daylight. Cows normal natural anatomy, no milking apparatus, bottles, milk labels, map labels or numerical counts. Focus on cows and pasture.

キャプション：草地と牛のようす

### industry_012

> Rows of long arched plastic greenhouses in a Japanese field under clear daylight. Translucent plastic reveals neat rows of green vegetable plants inside. Scenic green farmland and distant hills. No harvest comparison, calendar, arrows, prices, product labels or signs.

キャプション：野菜を育てる建物

### industry_015

> Several floating square net fish pens in a calm blue sea near a green coast. An oblique elevated view with clear water shows fish swimming inside the submerged nets. Realistic enclosed mesh sides and floating frames, no loose fish outside highlighted pens, no names, boat lettering, signs or arrows.

キャプション：海の中のあみと魚

### geography_006

> An aerial landscape of a river flowing out of green mountains into a broad blue sea. Show the river-sea junction prominently; river is narrow through the land and meets the broad sea at the coast. No special fan-shaped or triangular delta land, no labels, arrows or place names. Warm readable anime landscape.

キャプション：川と海が出会う場所

### geography_027

> A slightly aerial view of a river emerging from a narrow green mountain valley onto a broad fan-shaped alluvial plain. The landform is a clear gentle fan spreading from the mountain valley opening into flat land, gravel and patchwork fields across it. Mountains surround the upper valley. No sea or delta, no labels, arrows or place names.

キャプション：山から平野へ出る川と土地

### geography_028

> An aerial view of a river entering a broad blue sea at a river mouth. Sediment-built triangular delta land projects into the sea, river divides into a few distributary channels around the triangle. Green fields on the flat triangular land, mountains distant inland only. Clear whole triangular shoreline, no labels, arrows or names.

キャプション：海へ出る川と土地

### water_007（個別プロンプト）

> Use case: illustration-story. Asset type: elementary social studies game illustration, landscape 3:2. Draw a polished warm Japanese anime game environment illustration with crisp readable shapes, soft painterly textures, bright daylight, appealing to fourth graders. Scene: a large cylindrical water storage tank on a grassy hill above a small Japanese town. A thick water pipe connects the tank to the town downhill, and the town's roofs are clearly visible below. Show the tank and pipe clearly in the central area with generous outer margins. Scenic background, not white. No people needed. No labels, text, letters, numbers, signs, text-like markings, logos, watermarks, arrows, or UI anywhere. Do not display a facility name or imply an exact capacity. Single illustration, not a collage. Landscape 1536x1024.

キャプション：水をためる設備のようす

### tradition_002 の再生成

初版はさおの先が画面外に出て、提灯と服の模様が文字に見えたため不採用。初版を入力画像として、組み込み画像編集で修正。最終版のみ保存する。

> Edit this image only to fix framing and prohibited markings. Zoom out enough to show the ENTIRE tall pole, including its tip, with a generous margin of sky above it, and the whole float wheels below. Keep landscape 3:2 and the warm Japanese anime game style. Remove ALL lettering, kanji, text-like emblems and pseudo-writing: every lantern must be entirely plain without any marking; all people's coats must be plain solid-colored without symbols or logos; remove the circular insignia on the float. Replace the distant pagoda landmark with simple low traditional town rooftops so no extra named landmark is shown. Preserve the central wooden wheeled float with pretty small roof and long pole, Kyoto-like street, daylight and distant small onlookers. No text, numbers, signs, signboards, UI, arrows, logos or watermarks anywhere. Single illustration 1536x1024.

## 検証結果

- `node tests/run.js`：649件成功、失敗0（作業前は647件）。画像の形式・960×640px・200KiB以内・総7MiB以内、33問の固有参照、対象外264問の完全一致を検証。
- `node tests/simulate.js`：すべて目標内。
- `tests/ui-hand-diagrams-soc4.cjs`：昼テーマ・Chromium・file://で70問×360/390/768/1024px＝280画面が成功。うち画像33問×4幅＝132画面。残るSVG37問も回帰確認。
- 画像の読み込み・3:2・contain表示、キャプションと画像枠の見切れ、横はみ出し、ブラウザ例外は0。SVGの見切れ負例8件＋画像のはみ出し/切り抜き負例8件も検出。
- 問題画面280枚と390/1024pxの図140枚を `outputs/soc4-pictures/` に保存。確認用 `gallery.html` は33問を問題文・答えと並べ、390/1024pxの実画面を表示する。スクリーンショットはローカルの確認資料で、ゲーム内には追加しない。
- 最終WebP33枚は計4,291,044 bytes（4.29 MB / 4.09 MiB）、最小50,284〜最大184,518 bytes。すべて200KiB以内。
- 33枚すべてを生成結果と問題文・答えで目視確認。名前・文字・数字・看板・文字に見える模様を出さない。袋は閉じた状態、渦の雲は海上、地形3問は依頼された形だけを名前なしで描く。
- 全297問のdiagram以外は変更前と一致。既存ハッシュ `359fb64f693d6761a99497b9a24a035284acfa76ba400f6452048caa2a11c2cb` を維持。対象外264問は図も含め `2e16b4be3f480d16807776efea5f6b24cc46505fa74cab512b142c6805b4d278` と一致。

## 依頼との差・判断

- 図を付けなかった対象問題はない。33問すべてを置き換え。
- 第10弾の指定に従い、旧SVGの地中断面などから景色・見た目へ構図を変更。captionの「模式図」は写真でない景色の絵に合う言い方へ変更し、答えの名称は付けない。
- tradition_004は第10弾の指定に従い、旧SVGの赤いうるしから、ほぼ黒のつやのある器とおぼんにした。問題文に色の指定はない。
- tradition_002の初版は見切れと文字に見える模様のため不採用。画像編集で修正し、最終版のみ採用。
- disaster_015だけWebP品質を72に調整して200KiB以内にした。残り32枚は78。寸法・構図は変えていない。
- 旧SVGのsceneを固定するテストは、33問の画像への移行と残るSVGの検証を両立する最小限の変更。ゲームの描画コード・CSSは変更しない。

## ファイル一覧

- `questions/social_g4_hand.js`（33問のdiagramのみ）
- `img/diagrams/`（下表33ファイル）
- `tests/cases/hand-diagrams-soc4.js`・`tests/cases/hand-soc4-pictures.js`・`tests/ui-hand-diagrams-soc4.cjs`
- `DIAGRAM_REQUESTS_10.md`・`HAND_SOC4_PICTURES.md`・`DECISIONS.md`

| 問題ID末尾 | 絵のファイル | 容量(bytes) | caption |
|---|---|---:|---|
| geography_006 | img/diagrams/soc4_geography_006.webp | 131036 | 川と海が出会う場所 |
| geography_027 | img/diagrams/soc4_geography_027.webp | 181858 | 山から平野へ出る川と土地 |
| geography_028 | img/diagrams/soc4_geography_028.webp | 111230 | 海へ出る川と土地 |
| water_007 | img/diagrams/soc4_water_007.webp | 149034 | 水をためる設備のようす |
| water_009 | img/diagrams/soc4_water_009.webp | 87344 | 池の中のようす |
| water_010 | img/diagrams/soc4_water_010.webp | 141850 | 池の中の層のようす |
| garbage_001 | img/diagrams/soc4_garbage_001.webp | 170260 | 山あいのごみをうめる場所 |
| garbage_004 | img/diagrams/soc4_garbage_004.webp | 109048 | まちでごみを運ぶ車 |
| electric_003 | img/diagrams/soc4_electric_003.webp | 112506 | 海岸の丘に並ぶ設備 |
| electric_004 | img/diagrams/soc4_electric_004.webp | 169310 | 屋根の上に並ぶ設備 |
| electric_005 | img/diagrams/soc4_electric_005.webp | 140160 | 鉄塔と線のつながり |
| electric_006 | img/diagrams/soc4_electric_006.webp | 181416 | 鉄塔のそばの電気の設備 |
| electric_015 | img/diagrams/soc4_electric_015.webp | 122608 | 山あいの地面と発電設備 |
| disaster_003 | img/diagrams/soc4_disaster_003.webp | 109934 | 川とまちのようす |
| disaster_004 | img/diagrams/soc4_disaster_004.webp | 131786 | 山のしゃ面と家のようす |
| disaster_005 | img/diagrams/soc4_disaster_005.webp | 140934 | 日本の近くの海と雲 |
| disaster_006 | img/diagrams/soc4_disaster_006.webp | 120726 | 火山とまわりのようす |
| disaster_011 | img/diagrams/soc4_disaster_011.webp | 50284 | 災害にそなえる袋。中身は示していない |
| disaster_014 | img/diagrams/soc4_disaster_014.webp | 134330 | 海岸とまちの設備 |
| disaster_015 | img/diagrams/soc4_disaster_015.webp | 184518 | 山あいの川と設備 |
| disaster_026 | img/diagrams/soc4_disaster_026.webp | 106462 | 道ばたの設備とホース |
| tradition_001 | img/diagrams/soc4_tradition_001.webp | 111156 | 大きな灯ろうを運ぶまつり |
| tradition_002 | img/diagrams/soc4_tradition_002.webp | 132138 | まちを進むまつり |
| tradition_004 | img/diagrams/soc4_tradition_004.webp | 53046 | 工芸品の形と色 |
| tradition_007 | img/diagrams/soc4_tradition_007.webp | 74688 | 鉄で作った工芸品 |
| tradition_014 | img/diagrams/soc4_tradition_014.webp | 145486 | 城のつくり |
| tradition_033 | img/diagrams/soc4_tradition_033.webp | 74996 | 灯ろうをつるしたさおと人 |
| pioneer_005 | img/diagrams/soc4_pioneer_005.webp | 133476 | 川と両岸のつくり |
| pioneer_014 | img/diagrams/soc4_pioneer_014.webp | 178234 | 山あいにかかる石の橋 |
| pioneer_025 | img/diagrams/soc4_pioneer_025.webp | 167198 | 川と田につながる設備 |
| industry_006 | img/diagrams/soc4_industry_006.webp | 142668 | 草地と牛のようす |
| industry_012 | img/diagrams/soc4_industry_012.webp | 151260 | 野菜を育てる建物 |
| industry_015 | img/diagrams/soc4_industry_015.webp | 140064 | 海の中のあみと魚 |

## 第11弾：レビューで要改善になった11問（判断268）

完了・レビュー待ち。依頼はDIAGRAM_REQUESTS_11.md。main `6c7c9f6` から `codex/redo-diagrams-11` を作成。指定11問と同時調整指定のindustry_014に対応し、mainにはマージしない。

### 変更範囲と生成方法

- 社会11問（A6問・地図4問・industry_014）と算数graph_005のdiagramのみ。社会297問・算数468問のそれ以外の項目はハッシュで変更前と一致。対象外の社会286問・算数467問は図も完全一致。
- 6枚をimagegenスキル・組み込みimage_genで個別に新規生成。pioneer_012だけ初版の断面を組み込み画像編集で修正。CLI/APIは使わない。
- sharpで `resize(800,533).webp({quality,effort:6})` による縮小と形式変換だけを実施。容量に応じてqualityを調整（70・54・70・78・58・78）。切り抜き・合成・描き直しは変換処理で行わない。6枚合計570,724 bytes、最大99,804 bytes、すべて100,000 bytes以下。
- water_007は芝生の屋根を持つ地中のコンクリート施設。キャッシュ対策でsrcをsoc4_water_007_v2.webpへ変更し、旧画像は削除しない。用水の初版の露出断面を自然な山の斜面へ直し、トンネル内部を描かない。
- 地図は既存海岸線を保持し、地方境界・別枠・投影の指定だけを追加。富士山は山の印だけ、半島の色は元の海岸頂点、港2問は海岸まで寄せる。地名・港の印を足さない。出典はSOCIAL_MAP_DATA.md。
- graph_005だけminorStep:1。1ごとの補助線と、この図だけ大きくした描画範囲・ラベル。値やラベルは不変、26を文字にせず点の中心が補助線に乗る。inputFormへ同じ図を継承。新しいkindなし、既存image・japanMap・graphを利用。
- ゲームの変更ファイル：questions/social_g4_hand.js、questions/math_g4_hand.js（diagramのみ）、js/japan-map.js、js/svg/learning.js、上記6枚のWebP。依頼書の完了条件により、テスト・SOCIAL_MAP_DATA.md・この記録・DIAGRAM_REQUESTS_11.md・DECISIONS.mdも更新。CSS・defs・単元・セーブは変更しない。

### 検証結果

- `node tests/run.js`：654件成功、失敗0。
- `node tests/simulate.js`：すべて目標内。
- `tests/ui-hand-diagrams-soc4.cjs`：社会70問＋graph_005の選択・入力形式＝72形式×360・390・768・1024px＝288表示成功。文字・図形の見切れ、重なり、横はみ出し、例外なし。SVG・画像の負例16件を検出。graph_005の24本の補助線と点の中心、他のグラフに補助線がないことも実SVGで検査。
- `tests/ui-social-map-geography.cjs`：地名集の参照33点・全図と地域図17枚成功。能登の原海岸頂点5点に十字を追加し、色との一致を確認。
- 6枚の画像を問題文・答えと並べて確認。文字・数字・看板・ロゴ・答えの名前なし。390・1024pxのスクリーンショットを保存。指定された対象の姿は描くが、名称・水圧の説明・流れの矢印・県や港の名前を出さない。
- スクリーンショット・検証JSON・12問の比較ギャラリーはローカル `outputs/redo-diagrams-11/`。industry_014の同時調整とpioneer_012の断面省略は依頼の内容に沿った対応で、対象の省略はない。

### 第11弾の共通プロンプト

以下の共通先頭に、各Sceneをそのまま続けて個別に生成。

> Use case: scientific-educational. Asset type: one scene illustration for a Japanese grade-4 social-studies question in FROZEN FRONTIER. Warm polished anime game illustration, sunny daytime, clear simple forms, restrained soft shading and blue/green/amber natural colors, scenic background rather than white. Landscape 3:2 composition, safe margins for an 800x533px final WebP shown at smartphone size. No text, letters, numerals, writing-like patterns, signs, labels, logos, trademarks, watermark, arrows, UI, infographic callouts or readable displays anywhere. Do not add facility names or place names. Main structures fully within the frame.

### 第11弾 water_007（採用しなかった）

ユーザーの確認で「変更前の絵のほうが実物に近い」とのことだったので、この絵は使わず、変更前の `soc4_water_007.webp` のままにした（判断268）。`soc4_water_007_v2.webp` は削除した。以下は、そのとき ChatGPT が使ったプロンプトの記録。


保存先：`img/diagrams/soc4_water_007_v2.webp`。800×533px、98460 bytes。

> A realistically recognizable Japanese hillside drinking-water storage facility: a LARGE LOW RECTANGULAR REINFORCED-CONCRETE CISTERN partly buried in the hill, with a continuous grassy roof, exposed concrete retaining wall, a modest small access door and fence. It is a covered protected reservoir, NOT a tall cylindrical metallic tank, NOT an oil or fuel tank, NOT a swimming pool. A thick pipe leaves the hillside structure and descends along the slope toward a modest Japanese town below; town roofs, sky and hill visible. Three-quarter hillside view close enough that grass-covered buried concrete structure is unmistakable. No text or signage.

### 第11弾 water_004

保存先：`img/diagrams/soc4_water_004.webp`。800×533px、99804 bytes。

> Bird's-eye oblique view of a Japanese wastewater treatment facility beside a town and river. Several clearly visible large rectangular settling/aeration basins and circular clarifier basins, a small plain management building, connecting pipes. Water is gently brownish in some basins and clearer bluish water is visible at an outlet joining the adjacent river; no directional arrows, labels or before/after panels. Realistic organized treatment site, not an abstract set of boxes; main basins large and legible on a phone. No words naming the facility.

### 第11弾 water_013

保存先：`img/diagrams/soc4_water_013.webp`。800×533px、95326 bytes。

> A concrete dam spanning a narrow forested mountain valley with a broad calm reservoir lake behind it. At the dam foot a small plain powerhouse building. A realistically plausible thick steel penstock runs down the valley side from an intake tower near the lake to the powerhouse. One transmission tower with wires nearby. Dam, lake, penstock and small building all easy to distinguish, no cutaway turbine or spinning arrows and no labels naming generation method.

### 第11弾 water_021

保存先：`img/diagrams/soc4_water_021.webp`。800×533px、91556 bytes。

> A clear educational scenic cutaway illustration: on a hill, a low rectangular concrete drinking-water cistern partly buried in ground with grassy roof; beneath the sloping ground a single continuous thick water pipe descends from the cistern to a Japanese town house. One house is opened in a simple cutaway view, exposing a kitchen sink and a tap with a clear vigorous stream of water falling into the basin. Pipe physically connected to the tap, no arrows, pressure numbers, motion labels, equations or explanatory words. Keep the small kitchen visible at smartphone size, show only the arrangement and water emerging, not a labeled explanation. Friendly anime illustration rather than abstract SVG.

### 第11弾 pioneer_012

保存先：`img/diagrams/soc4_pioneer_012.webp`。800×533px、99592 bytes。

> A scenic historical water channel across a mountain: a calm lake surrounded by wooded mountains at higher altitude, a small stone-lined water-tunnel portal at the mountain foot on the open-plain side, a narrow irrigation channel emerges from the portal and continues through rice paddies and fields on a broad sunny plain. The lake and plain are visibly separated by the mountain, water cannot simply spill openly across the top. A modest unobtrusive cutaway sliver of hillside may show the water tunnel connecting the lake to the portal; no road or train tunnel and no modern dam. Generic scene, no identifiable landmarks, lake names, place names, writing or arrows.

初版の不自然な露出断面だけを直す編集プロンプト（組み込み画像編集）：

> Use case: precise-object-edit. Edit this warm anime educational scene for a Japanese grade-4 social-studies game. Change ONLY the unnatural exposed horizontal cutaway trench and small waterfall at the lake edge in the upper-left/middle of the scene: replace that entire exposed cutaway with a continuous natural wooded mountain slope and a closed, calm natural lakeshore. The underground water tunnel must remain hidden by the mountain, not visible as a sliced-open wall or waterfall. KEEP the calm mountain lake behind the ridge, the stone tunnel portal at the mountain foot, the small irrigation channel emerging from that portal, the rice paddies/plain, composition, light and warm anime style. The result shows a lake behind a mountain and water emerging from a stone-lined tunnel on the plain side; no need to show tunnel interior. No new objects, people, text, numbers, arrows, signs, logos, place names or watermark. Maintain landscape 3:2 and safe margins.

### 第11弾 industry_007

保存先：`img/diagrams/soc4_industry_007.webp`。800×533px、85986 bytes。

> A bright modern automobile assembly factory interior, large articulated robot arms assembling plain unbranded car bodies on a conveyor production line, a few completed cars further along. Robot tools physically near chassis panels. Clear recognizable car shapes and robotic arms, uncluttered educational composition for a fourth grader, warm anime game art, not photorealistic. No manufacturer's logo, car name, number plates, warning signs, writing, control-panel characters or readable displays. Depict only a generic assembly scene with no location or brand clues.
