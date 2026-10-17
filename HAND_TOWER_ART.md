# 夜の防衛戦：絵 第1弾

2026-10-17。`TOWER_ART_REQUESTS_1.md` に基づく最初の2枚。背景・画風は採用。中央炉1は修正版の確認待ち。

## 納品

- `img/adventure/tower/tower-field.webp`：1440×800。不透明な背景。5本の雪道、左の石畳、右の雪の森。文字・マス線・キャラクターなし。
- `img/adventure/tower/tower-core-1.webp`：512×800。透過背景。元気な中央炉。

生成には image_gen を使用。既存の `img/adventure/snow-world.webp` を目視して画風を確認した。生成 PNG を指定寸法へリサイズし、lossless WebP に変換した。寸法と中央炉のアルファ（0〜255）を確認済み。実際の戦場画面への組み込みはまだ行っていない。

初稿は4つの火口と屋上の炎になっていたため、以下の修正で差し替えた。

## 使用プロンプト

### tower-field

Create a game background asset. Exact landscape 1440x800, aspect 9:5. Cozy hand-painted Japanese anime fantasy snowy battlefield, softly lit blue night, readable bright snow, texture matching classic detailed top-down JRPG snowy world. Orthographic top-down nearly overhead, no perspective vanishing. Entire image is playable rectangle of FIVE equal-height horizontal lanes, each exactly 160px high, centers y=80,240,400,560,720. Five subtle packed-snow paths run straight horizontally all the way across with understated snowy ridges between; no grid lines, no vertical divisions. Leftmost 160px strip is continuous old stone paving foundation, empty, ready for separate furnace sprite. Rightmost 160px strip snowy pine forest edge with five open lane entrances. Middle 1120px uncluttered snowy packed paths. No characters, no monsters, no furnace, no buildings, no text, no UI, no border. Warm orange reflected light subtly touches left edge. Composition fills full canvas, no horizon or sky.

### tower-core-1

Single isolated game sprite on truly TRANSPARENT background. Output portrait 512x800 aspect ratio. Cozy hand-painted Japanese anime fantasy snow survival JRPG. Central heat furnace protecting town, healthy state with large lively golden-orange flames. One tall narrow continuous dark iron and aged stone furnace structure occupying central 80 percent width and 90 percent height, designed to stand along leftmost column spanning five lanes of an overhead tower defense battlefield. Slight top-down three-quarter view, front faces right and viewer. Tall vertical iron frame connects five open brazier hearth chambers stacked evenly vertically, each blazing with warm orange fire, one continuous central furnace assembly. Snow touches some stone edges, charming sturdy handcrafted details, subtle copper fittings. Transparent all around including under base, no ground plane, no stone paving, no background scenery, no shadows cast beyond object, no text no characters no UI. Full object visible, centered with clear margins. Soft painterly textured shading and crisp readable silhouette even when scaled to narrow 42px game column. Bright warm flames symbol of learning heat and hope.

## 次の段階

依頼書の「Claude が確認して、OKが出てから、残りを作る」に従い、ここで確認待ち。中央炉2・3、効果シート、効果音コードは未作成。

## 中央炉1の修正（2026-10-17）

利用者の確認結果に基づき、中央炉1を再生成。屋上の炎をなくし、同じ大きさのアーチ状火口を5つ備える幅広い一体の炉に変更。鉄・銅・石・雪・明るい炎と透過背景は維持。背景ファイルは変更していない。

image_gen で2回修正し、最終結果を512×800のlossless WebPに変換した。生成画像なので、火口の中心座標・形状のピクセル単位での完全一致は保証できない。5火口の数と外周余白を確認し、最終的なレーンとの位置合わせは確認待ち。

### 修正プロンプト1

Rebuild the attached furnace game sprite, retaining its beautiful painted iron, copper, stone, snow and bright orange flames, on a truly transparent background. STRICT layout correction. Canvas portrait 512x800 (aspect 0.64). Structure must occupy almost full canvas width from x=15 to x=497, and height y=8 to y=792. Build ONE connected furnace with EXACTLY FIVE identical broad rectangular arched firebox openings stacked vertically. Each firebox is same size, approximately 290 pixels wide and 112 pixels high. Exact opening centers (x=285,y=80), (285,240), (285,400), (285,560), (285,720). Five equal-height modules of 160px each, aligned parallel without perspective foreshortening, no narrowing upwards. Count: first enclosed flaming opening in top fifth, second in second fifth, third in third fifth, fourth in fourth fifth, fifth in bottom fifth. Each opening contains same healthy bright golden orange flame and dark grate with copper trim. NO flame on the roof, NO sixth opening, NO extra crown, NO tall pedestal occupying a module. Top first opening begins near top edge and bottom fifth opening near bottom edge. Wide robust silhouette filling almost entire image width. Continuous thick stone frame at left and right, copper pipes, snowy ledges between modules, tiny snowy cap only at top, thin foot only at bottom. Mostly frontal view with a little visible left side depth, matching source painterly anime JRPG style. Transparent background around silhouette and below base, no floor, no text, no characters. Layout precision is essential: five identical openings evenly spaced across entire image height, no large top or bottom decoration.

### 修正プロンプト2

Correct this sprite's geometry. Keep EXACTLY five flaming firebox openings, but make their center positions exactly 10%,30%,50%,70%,90% of full canvas height. Current first and fifth openings are too far inward. Stretch the top opening upward and bottom opening downward so five chambers fill full height equally. Remove tall roof and bottom pedestal. Each chamber occupies exactly one fifth of full height. Top first opening center y=80, second y=240, third y=400, fourth y=560, fifth y=720 on 512x800 canvas. ALL five openings identical same size and shape. Furnace external silhouette must fill entire width, left margin 12px right margin 12px. Top margin 6px bottom margin 6px. Broad straight rectangular furnace silhouette, no taper, not tower-like narrow structure. Front view almost orthographic. Stone side walls and copper pipes along sides. Preserve same snowy stone and iron, healthy golden flames and painterly JRPG appearance. No roof flame. Transparent background. Render canvas 512x800 portrait aspect. Highest priority is exact regular five row layout over decorative detail. No text.

### 確認してほしい点

- 火口が5つあり、屋上の炎を含めた数え方になっていないこと。
- 160px幅×800px高さへ描画したときの幅と、各レーン中心 y=80,240,400,560,720 に対する火口の見え方。生成による位置のわずかなずれが許容できるか。
- 炉1の承認後、炉の構図を固定して炎のみ変える炉2・3を作る。その後、効果シートと効果音へ進む。
