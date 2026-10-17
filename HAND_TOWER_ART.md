# 夜の防衛戦：絵 第1弾

2026-10-17。`TOWER_ART_REQUESTS_1.md` に基づく最初の2枚。画風確認待ち。

## 納品

- `img/adventure/tower/tower-field.webp`：1440×800。不透明な背景。5本の雪道、左の石畳、右の雪の森。文字・マス線・キャラクターなし。
- `img/adventure/tower/tower-core-1.webp`：512×800。透過背景。元気な中央炉。

生成には image_gen を使用。既存の `img/adventure/snow-world.webp` を目視して画風を確認した。生成 PNG を指定寸法へリサイズし、lossless WebP に変換した。寸法と中央炉のアルファ（0〜255）を確認済み。実際の戦場画面への組み込みはまだ行っていない。

中央炉は5つの火口を縦につないだ一体の炉として描いた。幅42pxほどで表示したときの読みやすさと、既存の冒険の絵との相性は確認が必要。

## 使用プロンプト

### tower-field

Create a game background asset. Exact landscape 1440x800, aspect 9:5. Cozy hand-painted Japanese anime fantasy snowy battlefield, softly lit blue night, readable bright snow, texture matching classic detailed top-down JRPG snowy world. Orthographic top-down nearly overhead, no perspective vanishing. Entire image is playable rectangle of FIVE equal-height horizontal lanes, each exactly 160px high, centers y=80,240,400,560,720. Five subtle packed-snow paths run straight horizontally all the way across with understated snowy ridges between; no grid lines, no vertical divisions. Leftmost 160px strip is continuous old stone paving foundation, empty, ready for separate furnace sprite. Rightmost 160px strip snowy pine forest edge with five open lane entrances. Middle 1120px uncluttered snowy packed paths. No characters, no monsters, no furnace, no buildings, no text, no UI, no border. Warm orange reflected light subtly touches left edge. Composition fills full canvas, no horizon or sky.

### tower-core-1

Single isolated game sprite on truly TRANSPARENT background. Output portrait 512x800 aspect ratio. Cozy hand-painted Japanese anime fantasy snow survival JRPG. Central heat furnace protecting town, healthy state with large lively golden-orange flames. One tall narrow continuous dark iron and aged stone furnace structure occupying central 80 percent width and 90 percent height, designed to stand along leftmost column spanning five lanes of an overhead tower defense battlefield. Slight top-down three-quarter view, front faces right and viewer. Tall vertical iron frame connects five open brazier hearth chambers stacked evenly vertically, each blazing with warm orange fire, one continuous central furnace assembly. Snow touches some stone edges, charming sturdy handcrafted details, subtle copper fittings. Transparent all around including under base, no ground plane, no stone paving, no background scenery, no shadows cast beyond object, no text no characters no UI. Full object visible, centered with clear margins. Soft painterly textured shading and crisp readable silhouette even when scaled to narrow 42px game column. Bright warm flames symbol of learning heat and hope.

## 次の段階

依頼書の「Claude が確認して、OKが出てから、残りを作る」に従い、ここで確認待ち。中央炉2・3、効果シート、効果音コードは未作成。
