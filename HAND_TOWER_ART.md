# 夜の防衛戦：絵 第1弾

2026-10-17。`TOWER_ART_REQUESTS_1.md` に基づく納品。背景と中央炉1の修正版は利用者の承認済み（火口5つ・レーン位置は許容範囲）。その構図を固定して、後半の中央炉2・3、効果シート、効果音コードを追加した。

## 納品

- `img/adventure/tower/tower-field.webp`：1440×800。不透明な背景。5本の雪道、左の石畳、右の雪の森。文字・マス線・キャラクターなし。
- `img/adventure/tower/tower-core-1.webp`：512×800。透過背景。元気な中央炉。
- `img/adventure/tower/tower-core-2.webp`：512×800。5火口とも炎が小さい。
- `img/adventure/tower/tower-core-3.webp`：512×800。5火口ともほとんど灰と少量の残り火。
- `img/adventure/tower/tower-fx.webp`：1024×1024、透過。4×4、1コマ256×256。上から矢・氷の魔法・回復の光・火花。各行を左から右へコマ送りする。
- `js/ui/tower-sound.js`：`FF.towerSound = { place, hit, kill, coreHit, light, win, lose, wave }`。すべて引数なし。`index.html` に読み込みを追加済み。
- `tests/ui-tower-sound.cjs`：効果音の設定・連打・発音上限・有効化待ちなどの検証（`node tests/ui-tower-sound.cjs`）。

生成には image_gen を使用。既存の `img/adventure/snow-world.webp` を目視して画風を確認した。生成 PNG を指定寸法へリサイズし、lossless WebP に変換した。寸法と中央炉のアルファ（0〜255）を確認済み。実際の戦場画面への組み込みはまだ行っていない。

初稿は4つの火口と屋上の炎になっていたため、以下の修正で差し替えた。

## 使用プロンプト

### tower-field

Create a game background asset. Exact landscape 1440x800, aspect 9:5. Cozy hand-painted Japanese anime fantasy snowy battlefield, softly lit blue night, readable bright snow, texture matching classic detailed top-down JRPG snowy world. Orthographic top-down nearly overhead, no perspective vanishing. Entire image is playable rectangle of FIVE equal-height horizontal lanes, each exactly 160px high, centers y=80,240,400,560,720. Five subtle packed-snow paths run straight horizontally all the way across with understated snowy ridges between; no grid lines, no vertical divisions. Leftmost 160px strip is continuous old stone paving foundation, empty, ready for separate furnace sprite. Rightmost 160px strip snowy pine forest edge with five open lane entrances. Middle 1120px uncluttered snowy packed paths. No characters, no monsters, no furnace, no buildings, no text, no UI, no border. Warm orange reflected light subtly touches left edge. Composition fills full canvas, no horizon or sky.

### tower-core-1

Single isolated game sprite on truly TRANSPARENT background. Output portrait 512x800 aspect ratio. Cozy hand-painted Japanese anime fantasy snow survival JRPG. Central heat furnace protecting town, healthy state with large lively golden-orange flames. One tall narrow continuous dark iron and aged stone furnace structure occupying central 80 percent width and 90 percent height, designed to stand along leftmost column spanning five lanes of an overhead tower defense battlefield. Slight top-down three-quarter view, front faces right and viewer. Tall vertical iron frame connects five open brazier hearth chambers stacked evenly vertically, each blazing with warm orange fire, one continuous central furnace assembly. Snow touches some stone edges, charming sturdy handcrafted details, subtle copper fittings. Transparent all around including under base, no ground plane, no stone paving, no background scenery, no shadows cast beyond object, no text no characters no UI. Full object visible, centered with clear margins. Soft painterly textured shading and crisp readable silhouette even when scaled to narrow 42px game column. Bright warm flames symbol of learning heat and hope.

## 前半の確認

最初の2枚でいったん確認を待ち、その後、中央炉1を以下のとおり修正した。修正版は利用者の承認済み。

## 中央炉1の修正（2026-10-17）

利用者の確認結果に基づき、中央炉1を再生成。屋上の炎をなくし、同じ大きさのアーチ状火口を5つ備える幅広い一体の炉に変更。鉄・銅・石・雪・明るい炎と透過背景は維持。背景ファイルは変更していない。

image_gen で2回修正し、最終結果を512×800のlossless WebPに変換した。生成画像なので、指定レーン中心座標へのピクセル単位での完全一致は保証できない。5火口の数と外周余白を確認した後、レーンとの位置合わせも利用者から許容範囲との承認を受けた。

### 修正プロンプト1

Rebuild the attached furnace game sprite, retaining its beautiful painted iron, copper, stone, snow and bright orange flames, on a truly transparent background. STRICT layout correction. Canvas portrait 512x800 (aspect 0.64). Structure must occupy almost full canvas width from x=15 to x=497, and height y=8 to y=792. Build ONE connected furnace with EXACTLY FIVE identical broad rectangular arched firebox openings stacked vertically. Each firebox is same size, approximately 290 pixels wide and 112 pixels high. Exact opening centers (x=285,y=80), (285,240), (285,400), (285,560), (285,720). Five equal-height modules of 160px each, aligned parallel without perspective foreshortening, no narrowing upwards. Count: first enclosed flaming opening in top fifth, second in second fifth, third in third fifth, fourth in fourth fifth, fifth in bottom fifth. Each opening contains same healthy bright golden orange flame and dark grate with copper trim. NO flame on the roof, NO sixth opening, NO extra crown, NO tall pedestal occupying a module. Top first opening begins near top edge and bottom fifth opening near bottom edge. Wide robust silhouette filling almost entire image width. Continuous thick stone frame at left and right, copper pipes, snowy ledges between modules, tiny snowy cap only at top, thin foot only at bottom. Mostly frontal view with a little visible left side depth, matching source painterly anime JRPG style. Transparent background around silhouette and below base, no floor, no text, no characters. Layout precision is essential: five identical openings evenly spaced across entire image height, no large top or bottom decoration.

### 修正プロンプト2

Correct this sprite's geometry. Keep EXACTLY five flaming firebox openings, but make their center positions exactly 10%,30%,50%,70%,90% of full canvas height. Current first and fifth openings are too far inward. Stretch the top opening upward and bottom opening downward so five chambers fill full height equally. Remove tall roof and bottom pedestal. Each chamber occupies exactly one fifth of full height. Top first opening center y=80, second y=240, third y=400, fourth y=560, fifth y=720 on 512x800 canvas. ALL five openings identical same size and shape. Furnace external silhouette must fill entire width, left margin 12px right margin 12px. Top margin 6px bottom margin 6px. Broad straight rectangular furnace silhouette, no taper, not tower-like narrow structure. Front view almost orthographic. Stone side walls and copper pipes along sides. Preserve same snowy stone and iron, healthy golden flames and painterly JRPG appearance. No roof flame. Transparent background. Render canvas 512x800 portrait aspect. Highest priority is exact regular five row layout over decorative detail. No text.

### 確認結果

利用者より「中央炉1の修正版は OK（火口は5つ、レーンとの位置も許容範囲）」との承認を受け、以下の後半へ進んだ。

## 後半の制作・取り込み方

炉2・3は image_gen で承認済み炉1を参照して炎を編集した。生成画像全体を差し替えると構造の微差が出るため、編集結果の火口内を各段に位置合わせし、炉1へマスク合成した。前面の柵・柱・菱形の飾り・雪・外枠は炉1の画素を保持。アルファは全画素で炉1のものを使い、lossless WebPにした。炉1と背景のファイルは変更していない。

効果は image_gen の生成結果をコマごとに分け、1024×1024へ再配置した。各コマの効果は最大216×216に収め、透明の余白を確保した。切り出し座標は `sx = frame * 256`、`sy = row * 256`、幅・高さとも256。行番号は矢0・氷1・回復2・火花3、コマ番号は0〜3。

効果音は既存の `sound.js` と同じ IIFE・Web Audio API・操作イベントでの有効化方式。`state.settings.sound === false` なら生成・発音しない。`hit` は35msの短い小音量、60ms間隔の制限。共通ゲイン0.5、コンプレッサー、最大24音源の上限で重なりを抑える。終了したノードは切断する。再生できない環境では何もしない。ロック中の音をためて解除時に一斉再生することもない。

戦場から `FF.towerSound.place()` などを呼ぶ処理、HPに応じた炉の切り替え、Canvasへの描画・コマ送りは取り込み側で実施する。BGMは既存の `audio/bgm-battle.ogg` をそのまま使う。

### 検証結果

- 炉2・3：各512×800。火口内マスクの外側の可視画素に差分なし。全画素のアルファ値が炉1と一致。5段の構図を並べて目視確認。
- 効果シート：1024×1024のRGBA。16コマすべてに効果があり、各コマ外周18pxは完全透明。行順・向き・4コマの進行を目視確認。
- `node tests/run.js`：855件成功、失敗0。
- `node tests/ui-tower-sound.cjs`：8種類のAPI、消音、hitの連打制限、24音源の上限と終了後の解放、ロック中の予約抑制、非対応環境・webkitフォールバックを確認。
- Chromiumの実Web Audioでも操作後の有効化と8音を確認。8音＋hit連打をOfflineAudioContextで描画したピークは約0.219（クリッピングなし）。この環境のブラウザ管理ポリシーは `file://` の閲覧を禁止しているため、このブラウザ検証はメモリ上のページで実施した。コードは通常のscriptで、音声ファイル・fetch・外部依存を使わない。実機スマホでの聴感確認は取り込み時に行う。

### 後半の使用プロンプト

#### tower-core-2（参照：承認済み tower-core-1）

Edit the supplied approved furnace game sprite, changing ONLY fire inside its five existing arched hearth openings to a weakened state. Preserve the source canvas aspect 512x800 and exact composition with pixel-aligned registration: same furnace silhouette, identical five openings, their centers, arches, columns, iron bars, diamond copper decorations, bricks, pipes, snow, object scale, margins and position. Do not redraw, move, resize, add or remove any structural element. EXACTLY FIVE firebox openings. In EACH of the five openings replace the current tall bright flame with a distinctly SMALL LOW golden-orange flame close to the coal bed, only about one quarter of the existing flame height. Upper part of each opening becomes dark sooty brick, low ember coals beneath. Keep a little warm light only within the firebox. The fire burns weakly in all five chambers. Exterior furnace pixels and transparent silhouette must match source exactly; all edits confined inside arches, behind existing front grates and copper ornamentation. Keep transparent background, same painterly detailed anime JRPG style. This is frame/state 2 of a three-state asset, registration with supplied source is critical.

#### tower-core-3（参照：承認済み tower-core-1）

Edit the supplied approved furnace game sprite, changing ONLY fire inside its five existing arched hearth openings to the critically dying state. Preserve source canvas aspect 512x800 and exact composition with pixel-aligned registration: same furnace silhouette, identical FIVE openings and their centers, same arches, columns, iron bars, diamond copper decorations, bricks, pipes, snow, object scale, margins and position. Do not redraw, move, resize, add or remove any structural element. In EACH of the five fireboxes remove the tall yellow-orange flame entirely; instead show a cold dim sooty brick interior above a bed of MOSTLY GREY ASH with a few dim deep red embers and one TINY nearly extinguished orange flicker close to the bottom. All five hearths almost out, no tall flames, no bright yellow mass, no smoke outside openings. Exterior furnace pixels and transparent silhouette must match source exactly; edits confined inside arches and behind existing front grates and copper ornamentation. Background transparent. Preserve painterly detailed anime JRPG style. This is state 3 of three, registration with supplied source is critical.

#### tower-fx

Create a production game VFX sprite sheet, exact 1024x1024 transparent RGBA, 4 columns by 4 rows, each cell exactly 256x256, NO grid lines, NO labels, NO text, NO background or checkerboard. Sixteen individually separated effects fully within their cell with at least 20px padding. Cozy hand-painted anime fantasy snowy tower defense JRPG, soft painterly detailed but clear at tiny size, warm orange highlights, gently magical not harsh neon. Each ROW is ONE effect and columns are successive animation frames left to right. Row1 y0-255: one wooden arrow with metal tip pointing RIGHT, consistent horizontal position and scale in all four frames, simple pale golden motion streak that subtly changes as it flies, no bow, no character. Row2 y256-511: ice spell impact, four stages small pale blue crystalline seed -> blue icy burst -> larger radiating snow crystals -> fading sparse icy shards. Row3 y512-767: healing light, four stages gentle green and gold motes ascending from low center -> rising spiral with gold sparkle -> higher sparse soft green motes -> fading high golden glints, no hearts or text. Row4 y768-1023: tiny warm orange-yellow impact sparks, four stages compact bright impact -> radial starburst -> scattered shorter amber sparks -> fading tiny embers. Exact regular sprite atlas layout, visual centers x128,384,640,896; row centers y128,384,640,896. Each effect isolated and never crosses cell boundaries. Transparent background all around and between particles.
