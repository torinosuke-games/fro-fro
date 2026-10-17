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

## 第2弾：氷の精霊・雪の巨人（2026-10-17、承認済み）

依頼の順序に従い、まず魔物2体を作成した。利用者から「enemies-2.webp は OK」と承認を受け、続けて追加効果 `tower-fx-2.webp` を制作した（下記）。

### 追加ファイル

- `img/adventure/tower/enemies-2.webp`：1536×1024、透過のlossless WebP。左が氷の精霊、右が雪の巨人。正面・全身。地面・影・文字・枠なし。
- `img/adventure/tower/enemies-2-preview.webp`：2048×1024、不透明の比較専用画像。ゲームでは使わない。上段は既存3体＋新2体を同じ原画倍率60%で並べ、下段は各魔物を高さ60px（夜色）・40px（白背景）で表示した。

既存の `snow-enemies.webp`・`tower-field.webp`・`tower-fx.webp` を目視し、image_gen の参照画像にも使用した。最初に2体のシートを生成し、巨人の横幅と余白を調整する編集を1回行った。その後、2体を分離して縦横比を保ったままサイズを整え、透明な1536×1024のシートへ配置した。生成時のアルファ8/255以下の微弱な外周の残りを除き、エッジのアンチエイリアスと精霊の透過は残した。生成原画は別途保持している。

### 切り出し・大きさの目安

左右の領域は各768×1024。絵の可視範囲（x, y, 幅, 高さ）は次のとおり。ゲーム側で切り出す場合は、周囲に数pxの余白を足してよい。

| 魔物 | 可視範囲 | 表示高の目安（既存Canvas座標） |
|---|---|---|
| 氷の精霊 | `[179, 306, 411, 624]` | オオカミと同じ155 |
| 雪の巨人 | `[812, 79, 681, 851]` | 大獣と同じ225 |

原画の可視高は既存オオカミが約624px、大獣が約885px。精霊はオオカミ程度、巨人は大獣に近い大きさにそろえた。巨人は二本足・岩のこぶし・氷柱のひげ、精霊は足のない細い渦状の下半身・胸の雪結晶・光の輪で区別する。両者とも正面向きで、左へ進む移動処理はゲーム側に任せる。既存ファイルとゲームコードは変更していない。

### 検証済み

- `enemies-2.webp` の形式・1536×1024・RGBAを確認。
- 外周32pxと中央の x=640〜799 の帯は完全透明。2体の重なりなし。
- 白背景・夜色背景で外周を目視確認。比較画像には40px・60pxの実寸縮小も含めた。
- 画像・引き継ぎ記録のみの変更なので、ゲームコードの自動テストは追加・実行していない。

### 魔物の確認点（承認済み）

1. 既存3体との画風・線の太さ・明るさ。新しい2体の氷の青や雪の白が強すぎないか。
2. 精霊のやさしさ・少しさびしげな表情・胸の核・透け具合。巨人が「怖い」より「どっしり・おおらか」に見えるか。
3. 40〜60pxで、細く浮く精霊と、ずんぐりした二足の巨人を区別できるか。
4. 白いふち・過度なぼやけ・不要な影がないか。

### 使用プロンプト（初稿）

Create a new production character sprite atlas for the Japanese fantasy learning/snow-survival game FROZEN FRONTIER. Exact landscape canvas 1536x1024, truly TRANSPARENT RGBA background. Use reference 1 (snow-enemies.webp) as the strict drawing-style guide: richly detailed hand-painted Japanese anime fantasy JRPG monsters, crisp dark blue contour outlines, finely rendered fur/rock/ice, painterly warm tactile texture, bright readable snow-white and blue tones. Reference 2 is the blue snowy night battlefield color context only. Reference 3 shows compatible magic materials only. NEW characters only, do not copy the three reference beasts. TWO separate FRONT-FACING FULL-BODY creatures, left ice spirit and right snow giant, with transparent negative space between them and around every edge. No ground, no floor, no cast shadows, no contact shadows, no backdrop, no horizon, no text, no labels, no border. Both face the viewer as in reference 1, even though game logic will move them leftwards. Entire silhouettes visible, not cropped. Approximate visible bounding boxes: left spirit x85..625 y265..940 (about 520 wide by 675 tall, same scale as reference wolf); right giant x795..1505 y30..950 (about 710 wide by 920 tall, same scale as reference ice-horn beast). Top-to-bottom height/width of each creature about 1.3, including its magic halo or arms. Keep a common bottom baseline around y940. LEFT: a small androgynous childlike ice spirit, gentle slightly lonely face, pale aqua luminous eyes, small elegant human-like torso and arms, NO legs and NO feet, lower body tapers into a floating ethereal ice wisp. Semi-transparent blue-white icy body with CLEAR outlined silhouette and softly translucent interior, not invisible or washed-out. Bright highly readable snowflake-shaped white/cyan crystalline core in its chest. A few discrete suspended snow fragments and one slender cool luminous elliptical ring around the waist/body, confined close to the sprite, no huge haze cloud. Colors ice blue, white, pale cyan. Mysterious beautiful and a little cute, never scary, suitable for elementary-school children. RIGHT: a heavy, broad, sturdy TWO-LEGGED HUMANOID snow giant made of grey-blue boulders, packed snow and blue ice. Distinct from the four-legged horned beast: upright biped, NO horns, NO beast face, NO fur mane. Broad hunched shoulders with snow piled on shoulder/back ledges, large separate rocklike fists hanging at both sides, two clearly visible stout rock legs and broad feet, a few ice crystal seams. Craggy rock face, sleepy drooping brows and SMALL deep blue eyes, a short beard of hanging icicles. Dignified, slow, solid and generous presence, not angry or frightening. Snow white, grey-blue stone, ice blue, only eyes faintly luminous blue. Strong readable silhouette at 40-60 pixel game height; giant broad and squat, spirit slender and hovering. Match reference's outline weight and detailed illustrated rendering, not 3D, not photorealistic, not flat vector, not pixel art. Absolutely transparent around/under both characters; no white matte fringe.

### 使用プロンプト（横幅・余白の調整）

Refine reference 1, the two-new-monster sprite atlas. Preserve these exact two character designs and beautiful crisp detailed Japanese anime painted rendering, matching reference 2's existing monsters. STRICT ASSET LAYOUT correction, still exact 1536x1024 TRANSPARENT RGBA canvas. Background pixels must have zero alpha, absolutely no broad atmospheric glow cloud, no floor/ground/shadows. LEFT ICE SPIRIT remains gender-neutral, small gentle lonely face, pale glowing aqua eyes, clear translucent blue-white body, bright SNOWFLAKE CHEST CORE, no legs or feet, tapered floating wisp bottom and close slender icy ring, only a few close floating shards. Make its entire visible silhouette including shards about 500px wide and 650px tall, bounding box approximately x125..625,y285..935. Its chest core must stay legible at tiny game size. RIGHT SNOW-ROCK GIANT remains a heavy sleepy kindly craggy humanoid, snow on shoulders and head, small deep-blue eyes, icicle beard, rock fists, clearly two rock legs. NO horns. CORRECT its overly wide pose: bring the massive fists and forearms nearer the sides of its torso, shoulder width slightly narrower, keep upright stance and full feet. Giant's entire visible silhouette should be about 690px wide and 900px tall, bounding box x815..1505,y35..935 (height/width 1.3). Tall enough to match existing boss height, but still broad and stout relative to slim spirit. Do not shrink giant to spirit size. Keep BOTH characters strictly in their own half, a wide completely empty transparent gap x650..800, all edges at least25px from canvas edge. Both FRONT-FACING, FULL BODY. No existing reference beasts in result, only the spirit left and the giant right. NO text, NO grid, NO background, NO ground, NO shadows. Transparency around exterior must be crisp without white matte fringe; keep subtle translucency INSIDE the spirit, avoid an outer blurry aura.

### 第2弾の追加効果（2026-10-17）

利用者から `enemies-2.webp` のOKを受け、同じブランチで `img/adventure/tower/tower-fx-2.webp` を追加した。魔物2体の画像は変更していない。

- 1024×512、透過のlossless WebP。4列×2行、1コマ256×256。
- 上段（行0）：凍結。1＝小さな氷粒、2＝下側から半分できる氷、3＝中心が空いた全身用の氷の殻、4＝ひび割れて外へ砕け始める殻。
- 下段（行1）：壁が壊れる衝撃。1＝小さな衝撃の輪と接触の光、2＝強い雪・岩の破片の飛散、3＝広がる破片と雪けむり、4＝薄いけむりと小さな雪粒。
- キャラクター・こぶし・壁そのものは描いていない。効果だけを、ゲーム側でキャラクターの上へ重ねる。
- 切り出しは `sx = frame * 256`、`sy = row * 256`、幅・高さ256、frameは0〜3。凍結は最初の3コマで包み、凍結中は3コマ目（frame=2）を保持し、解除時に4コマ目（frame=3）を使う。壁破壊は4コマを左から右へ一度再生する。

既存の効果シートと承認済み魔物をPNGへ変換して参照し、image_gen で原画を生成した。初稿の凍結1コマ目と壁破壊の始点・終点が強すぎたため、粒だけの始点と消えかけの終点へ1回編集した。生成原画は1774×887で、各コマを切り出して同じ座標系・ほぼ同じ倍率で216×216以内へ縮小し、256×256の中心に配置した。コマごとのトリミングや個別拡大はせず、少ない粒のコマを大きくしすぎないようにした。アルファ8/255以下の微弱な残りとコマ境界の微光を整理し、外周に透明の余白を確保した。

#### 効果の検証結果

- WebP・RGBA・1024×512を確認。8コマすべてに効果がある。
- 各256×256コマの外周20pxは完全透明。可視範囲はすべて216×216以内で、隣のコマへのはみ出しなし。
- 凍結3コマ目の中心40×60pxはアルファ0。下に描く仲間が見える空洞を保持している。
- 凍結は粒→半分→全体で効果量が増え、壁破壊の最終コマは3コマ目より十分薄くなることを画素量でも確認。
- 夜色・白背景の両方で目視し、コマ順・氷の空洞・破片の進行・透過の縁を確認。
- 画像と引き継ぎ記録のみの変更。ゲームへの読み込み・状態に応じた描画は取り込み側で行うため、ゲームコードの自動テストは追加・実行していない。

#### 効果の使用プロンプト（初稿）

Create a production VFX animation sprite atlas for FROZEN FRONTIER, cozy snowy Japanese anime fantasy JRPG. Exact 1024x512 transparent RGBA canvas, FOUR COLUMNS and TWO ROWS, exactly 256x256 per cell. Reference 1 is the existing effect atlas: match its detailed hand-painted crystalline materials, crisp fine outlines, soft luminous highlights, readable at small game size. Reference 2 is the approved ice spirit and snow-rock giant: match their ice, white snow and grey-blue stone. ONLY EFFECTS. NO characters, NO silhouettes of people, NO fists, NO wall object, NO faces, NO body parts, NO icons or text. No background, no grid, no panel borders, no shadows or ground. Each complete effect including glow and flying debris fits inside the central 216x216 square of its cell, leaving at least20px fully transparent margin. No effects bleed between cells. Clear empty space between effects. FOUR LEFT-TO-RIGHT ANIMATION STAGES PER ROW, not four identical pictures.
TOP ROW (cell centers x128,384,640,896 y128): FREEZING ENCLOSURE overlay placed ON TOP of an existing ally character sprite. Pale cyan and ice blue crystals, a little white frost, same faceted ice art as references. Stage1: a FEW small frost grains and thin scattered crystals forming around the outer edges of an EMPTY vertical oval, center empty. Stage2: a half-formed ice casing growing UPWARD from its bottom, a curved crystalline lower bowl/foot and two low side fragments reaching halfway up; remaining upper half is open, central region EMPTY transparent. Stage3: full-body frozen casing shaped like an irregular upright oval ICE SHELL / HOLLOW CRYSTALLINE FRAME, thick clear faceted ice on the left/right perimeter and top/bottom, luminous blue edges, a completely EMPTY TRANSPARENT center window so the ally sprite underneath is visible. The large central opening (roughly80px wide and120px high centered in the cell) must have alpha ZERO: do NOT fill it with glass, fog, cyan wash, white light, stars or a character. Stage4: that SAME hollow ice shell develops large cracks and begins breaking outward into a few detached blue shards; transparent central opening remains EMPTY, silhouette still recognizable. Keep the shell height and baseline consistent across frames2-4; not a portal with a solid interior, not an ice block hiding the ally.
BOTTOM ROW (centers x128,384,640,896 y384): HEAVY WALL-BREAKING IMPACT, without drawing the wall, attacker, fist or ally. Stage1: one compact outward expanding impact ring with a small warm pale gold/white contact flash and a few snow grains. Stage2: a forceful radial burst of chunky grey-blue ROCK FRAGMENTS and white SNOW chunks, bigger and brighter, all contained within cell, no flames. Stage3: those fragments spread farther apart, fewer chunks with soft wispy white SNOW DUST swirling between them; broadening but stay inside216px. Stage4: nearly gone, very sparse TINY white snow grains and a few faint fading dust wisps, no large rock chunks. Winter impact colors grey-blue stone, snow white and a subtle warm contact glint, gentle child-friendly visual. Readable artistic progression: ring -> debris burst -> spreading debris and snow dust -> faint snow flecks. Transparent background around all particles; no rectangular atmospheric haze. Exact regular 4x2 atlas layout. Every one of the eight cells independent and fully padded.

#### 効果の使用プロンプト（始点・終点の調整）

Edit this 4-column by 2-row TRANSPARENT VFX sprite atlas, preserving its style, palette, materials, eight-cell layout and all good middle stages. Keep the 2:1 canvas, no labels, no grid, no characters, fully transparent background. CORRECT THE ANIMATION START AND END STATES so they clearly build up and fade out:
TOP LEFT CELL ONLY (freezing frame1): REMOVE the large connected icy oval and the sweeping frosty ribbons entirely. Replace them with only 8-12 TINY separate ice grains and miniature cyan crystals loosely scattered near the left/right/bottom perimeter of the same oval footprint. Each particle tiny, lots of completely empty transparency. NO solid ring, NO arch, NO connecting ribbons, NO ice wall in frame1. Keep the entire central region empty. The other three top cells remain: lower HALF-CASING with upper half open in frame2; complete HOLLOW ice shell with large alpha-zero center in frame3; cracked breaking HOLLOW shell and detached shards in frame4. Retain these distinctions. All top frame centers must remain COMPLETELY TRANSPARENT, so an ally underneath can be seen, never put any cyan fog or white fill inside the hollow area.
BOTTOM LEFT CELL ONLY (wall impact frame1): simplify to a small pale-gold/white contact glint inside one thin pale icy-white shockwave ring, with only a FEW tiny snow grains. REMOVE all large rocks, remove giant pointed ice blades, no huge burst yet. Its footprint is about half the diameter of bottom frame2's burst.
BOTTOM RIGHT CELL ONLY (wall impact frame4): REMOVE ALL big rocks, all medium rocks, all thick smoke ribbons and the large cloud. Replace with only 8-12 tiny widely separated white snow motes and one or two extremely faint SHORT fading wisps. This is almost gone, much fainter and sparser than frame3. No rock chunks, no starburst, no large ring, no substantial cloud. Preserve bottom frame2 as the strongest radial snow/rock burst and bottom frame3 as spreading fragments with snow dust, so row progression is ring -> strong debris burst -> scattered debris with snow dust -> almost empty tiny snow particles.
Each effect must fit its own cell with clear transparent padding; do not cross any cell boundaries. Make the first/last sparse frames actually sparse; do not enlarge tiny particles to fill the cell. Preserve detailed hand-painted Japanese anime JRPG art, faceted blue ice, grey-blue rock, white snow, gentle warm tiny contact flash. This is an effects-only overlay atlas.
