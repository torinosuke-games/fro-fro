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

## 取り込み（Claude。判断455）

`enemies-2.webp`・`tower-fx-2.webp` を確認して、そのまま使った。魔物の大きさ（高さ）は、精霊＝155（オオカミと同じ）、巨人＝225（大獣と同じ）。切り出しは、上の表の可視範囲。効果は、1コマ 256×256 で、凍結は 0行目（氷がかたまる→全身が氷→砕ける）、壁が壊れるのは 1行目。

## 第3弾：難しさ6〜10の魔物（2026-10-17）

利用者の依頼順に従い、まず `enemies-3.webp` の3体を作成し、画風・大きさのOKを受けた。続いて `enemies-4.webp`（氷竜）、`tower-fx-3.webp`（追加効果4種類）を制作した。詳細は下記「第3弾の続き」を参照。

### 追加ファイル・可視範囲

`img/adventure/tower/enemies-3.webp`：1536×1024、RGBA、透過のlossless WebP。左から吹雪の鳥・氷の盾兵・霜の魔女。正面〜わずかに斜めの全身で、地面・影・文字・枠なし。等幅の3コマではなく、次の可視範囲で切り出す。

| 魔物 | 可視範囲（x, y, 幅, 高さ） | 表示高の目安（既存Canvas座標） |
|---|---|---|
| 吹雪の鳥 | `[24, 625, 630, 305]` | 155（オオカミ程度） |
| 氷の盾兵 | `[670, 224, 432, 706]` | 190（オオカミと巨人の中間） |
| 霜の魔女 | `[1118, 306, 393, 624]` | 155（精霊と同じ） |

鳥は横に広げた翼を優先した横長の形。原画上の高さは305pxなので、表示時は可視範囲を切り出して表示高を設定する。盾兵は大きな雪結晶の盾と兜、魔女はとんがり帽子・杖・濃紺のマント・ブーツで役目と輪郭を分けた。魔女の可視高624pxは既存の精霊と同じ、盾兵706pxは精霊と巨人851pxの間になる。

### 制作方法

最新の `enemies-2.webp` を主な画風基準とし、`snow-enemies.webp`、既存効果、戦場も目視した。主な参照画像は夜色背景へ合成した確認用PNGにして image_gen へ渡し、背景そのものは描かないよう指定した。3体のシートを生成して配置を1回修正した後、鳥だけを別途生成し、翼を横へ広げた飛行姿へ整えた。盾兵と魔女は修正版から分離して使った。

それぞれを縦横比を保って縮小し、1536×1024の透明シートへ配置した。アルファ8/255以下の微弱な外周の残りを整理し、細い縁のアンチエイリアスを残した。生成原画は別途保持している。既存の魔物・効果・ゲームコードは変更していない。

### 検証済み

- WebP・RGBA・1536×1024を確認し、書き出し後の可視範囲を画素から測定。
- 外周24pxが完全透明。鳥と盾兵の間16px、盾兵と魔女の間16pxも完全透明で、3体の重なりなし。
- 翼・槍・盾・帽子・杖・マント・足先を含む全身を目視確認。
- 基準の精霊・巨人と原画倍率60%で並べて比較。各魔物を高さ60px（夜色）・40px（白背景）でも表示し、輪郭と透過の縁を確認した。
- 画像と引き継ぎ記録のみの変更なので、ゲームコードの自動テストは追加・実行していない。

### 確認してほしい点

1. 最新の精霊・巨人との画風、輪郭線、氷の青や雪の白の明るさ。
2. 40〜60pxで、横に広い翼／大きな盾／帽子と杖とマントを見分けられるか。
3. 鳥の翼幅と表示時の大きさ、盾兵の重さ、魔女の大人びた印象が役目に合っているか。
4. 魔女が氷の精霊と十分に違って見えるか。
5. 白いふち、過度なぼやけ、不要な影、絵の欠けがないか。

### 使用プロンプト（3体の初稿）

Create a new production MONSTER SPRITE ATLAS for FROZEN FRONTIER, snowy fantasy survival / learning JRPG. Exact landscape canvas 1536x1024, truly TRANSPARENT RGBA background. Three NEW creatures only, LEFT TO RIGHT: blizzard bird, ice shield soldier, frost witch. Reference1 (approved ice spirit + snow giant) is the PRIMARY style standard: detailed hand-painted Japanese anime fantasy, finely textured ice/snow, crisp dark-blue contour outlines, warm tactile painted shading, bright readable blue-white highlights. Reference2 existing beasts is secondary style/scale reference. Reference images have a dark backdrop for visibility ONLY: DO NOT copy any backdrop. No background, no floor, NO GROUND, NO cast shadows/contact shadows, no text, labels, frames, grid or scenery. THREE SEPARATE FRONT-FACING FULL-BODY sprites with all wings/weapons/hats visible and transparent margins, never touching or overlapping. No existing reference creatures. Three reserved cells: x0-511 bird; x512-1023 soldier; x1024-1535 witch. Keep at least24px outer margins and a clear transparent gap between creatures. Bottom of each complete sprite near y930, grounded features have no drawn ground. Approximate character bounds: bird x24..490 y480..930 (about466 wide x450 tall, winged horizontal silhouette, comparable size to reference wolf); soldier x555..980 y170..930 (about425wide x760tall, between wolf and giant); witch x1075..1495 y300..930 (about420wide x630tall, same height as approved spirit). Scale can be refined later but full silhouettes must fit their cells.
LEFT BLIZZARD BIRD: regal EAGLE/HAWK made of pale cyan/blue crystalline ice, suspended mid-flight facing viewer with a little head turn toward left, large wings spread broadly sideways, CLEAR ONE BIRD silhouette not a butterfly. Long layered faceted ice flight feathers, tips dissolving into a few close swirling snow feathers. Small tucked talons, compact strong chest, proud curved beak, sharp pale aqua eyes, readable central head. One compact swirl of snow close to its wing/body perimeter, no big haze cloud below it, NO ground/landing pose. Wider than tall, fast airborne creature, majestic and strong but not frightening for children.
CENTER ICE SHIELD SOLDIER: sturdy stocky biped humanoid elemental knight, FULL ice armor with snowy layered pauldrons and chunky boots. Face mostly concealed by an icy enclosed helmet, only narrow calm blue eye slit. One LARGE BOLD HEXAGONAL ICE SHIELD held prominently in front covering much of torso, large high-contrast WHITE SNOWFLAKE EMBLEM on shield face. Shield should instantly read at40px height. A short ice spear or sword held behind and to one side of shield, stay within own cell. Broad squat armored silhouette, patient defensive strength, not a ghost, no human skin, no menacing spikes. Blues and white ice with grey-blue recessed armor. More solid and heavy than witch, smaller than approved snow giant.
RIGHT FROST WITCH: mysterious adult-looking young woman, visibly more mature than approved childlike ice spirit. Cool reserved calm expression, small face with slender mature proportions, pale silver hair under a LARGE clearly POINTED ICE WITCH HAT with a wide brim and tilted icy tip. Full winter FROST MANTLE/cloak in deep navy-grey blue and frosted silver edges, distinct dark cloth mass, NOT a glowing pale spirit body. Slim two-legged full-body stance, small boots visible below cloak or within a close narrow snow swirl. Hold a long thin ICE STAFF at one side with a luminous blue CRYSTAL tip. Hat + staff + dark flowing cloak must be unmistakable at40-60px. No bare torso, no ice-spirit snowflake chest core, no legless wisp tail. Beautiful and mysterious, slightly cold rather than cruel or scary. Small close snow spiral at feet is magic particles only, NOT a ground plane or shadow.
All three should feel born from snow, ice and blizzard, strong higher-difficulty monsters but child-friendly. Match latest reference outline weight and brightness. Detailed hand-painted illustration, NOT photorealistic, NOT3D, NOT flat vector, NOT pixel art. Transparent negative space around every silhouette, no white matte halo, no large atmospheric aura. Prioritize three clearly different silhouettes: wide floating wings / big broad shield and squat armor / tall pointed hat plus staff and dark cloak.

### 使用プロンプト（全身・余白の修正）

Edit the supplied three-monster sprite sheet. PRESERVE the exact appealing character designs, faces, materials and rendering: ice eagle left, ice shield knight center, mature navy-cloaked frost witch right. Correct ONLY the overlarge sizes and clipping/spacing. This is an atlas of THREE separate smaller full-body sprites on a 1536x1024 TRANSPARENT canvas, not a full-bleed illustration. IMPORTANT: currently the eagle's LEFT WING and witch's RIGHT CLOAK are cut by canvas edges, and the eagle wing is too close to knight's spear. REDRAW any missing tips and give all three COMPLETE UNCROPPED silhouettes. Generous empty transparent margins. Scale down each independently and reposition, DO NOT crop parts to fit. EXACT STRICT CELLS: bird must fit wholly x40..472, y490..930 (432wide,440tall); knight including its weapon must fit wholly x568..968, y190..930 (400wide,740tall); witch including her hat, staff, raised hand and cloak must fit wholly x1090..1470,y306..930 (380wide,624tall). Thus completely transparent vertical gaps x480..560 and x980..1080. At least40px empty canvas margin left/right. These are upper bounds, much smaller than current characters. Do not fill the canvas with character detail. Full bird spread wings must BOTH be visible: make the horizontal wingspan smaller but retain flying compact body, tucked talons and a small close snow swirl; remove excessive distant floating feathers to fit. Shield knight stays stocky with big snowflake shield, enclosed helmet and short spear behind shield, no huge outward spear blade crossing into bird cell. Witch stays mature and slim, large navy pointed hat, staff, snowy navy mantle, small boots, a narrow magical snow spiral; bring staff and raised hand close to body so width stays within own cell. Keep all previous fine painted detail and dark-blue crisp outlines, snowy bright ice and friendly strong fantasy mood. Reference2 is the approved spirit/giant palette if needed. No other monsters. Truly transparent background and around every part, no ground, NO SHADOWS, no text, no borders, no large atmospheric halos. Highest priority: all parts entirely inside the specified separated bounds with ample negative space, no touching and no clipping. Use same art style, not smaller pixel art; detailed smooth hand-painted anime JRPG rendering.

### 使用プロンプト（鳥の翼を横へ広げる）

Create ONE isolated production monster sprite: the BLIZZARD ICE EAGLE from reference1's LEFT creature, preserving that exact species/design, crisp dark-blue outlines, white icy chest feathers, faceted cyan wing feathers, sharp pale-blue eyes, curved blue beak, small tucked talons and close snow swirls. Do NOT draw reference1's soldier or witch. Reference2 (approved spirit/giant) is style only. Detailed hand-painted Japanese anime fantasy JRPG, tactile fine texture, bright night-readable snow and ice, not3D/notphotorealistic/notpixelart. TRANSPARENT RGBA background. Canvas1536x1024. Entire one bird fully visible with generous clear margin, all wing and tail tips within canvas, no text, no ground, no shadows, no backdrop, no large atmospheric halo. FRONT-FACING hovering/gliding pose, head may turn slightly toward viewer's left. CRUCIAL SILHOUETTE CORRECTION: wings stretch almost HORIZONTALLY out to LEFT and RIGHT like an eagle GLIDING. Wing tips at approximately head/shoulder height, NOT raised high into a V, NOT vertical upward wings, NOT a perched bird. Small compact body hangs below the horizontal wings; small talons tucked, short layered tail pointing down, a small curling snow breeze nearby only. Desired complete silhouette including close snow particles about1100wide x750high (width/height about1.45), centered x768,y512, roughly bounding x210..1320,y140..890. No detached feathers far away. Show a strong elegant flying monster that will read as broad horizontal wings when reduced to40-60px high. Regal, swift and powerful but child-friendly, no terrifying teeth, no other creatures. Prioritize fully intact horizontal spread wings and clean transparent negative space around the sprite.

### 第3弾の続き：氷竜・追加効果（2026-10-17）

利用者から `enemies-3.webp` のOKを受け、同じ `codex/tower-art-3` ブランチに氷竜、続いて追加効果を作成した。承認済みの3体は変更していない。

#### 氷竜

`img/adventure/tower/enemies-4.webp`：1536×1024、RGBA、透過のlossless WebP。氷竜1体のみ。左へ少し向いた正面斜めの全身で、四つ足・長い首としっぽ・たたんだ翼・氷の角と鱗が見える。口もとの冷気は小さく、地面・影・文字・枠なし。

| 魔物 | 可視範囲（x, y, 幅, 高さ） | 表示高の目安（既存Canvas座標） |
|---|---|---|
| 氷竜 | `[80, 40, 1375, 944]` | 270（雪の巨人225の1.2倍） |

この1.2倍は、可視範囲を切り出してゲーム内で描く高さの比率。シート上の画素高の比率ではない。縦横比を保って描く。最新の精霊・巨人と承認済み3体を画風の参照にして image_gen で生成し、弱い外周の残り（アルファ8/255以下）を整理、全身をトリミングして縦横比を保ち所定キャンバスへ配置した。

- WebP・RGBA・1536×1024、可視範囲を画素から確認。キャンバス外周40pxは完全透明。
- 角・四つの足・翼・しっぽ先の欠けがないことを目視確認。
- 既存の大獣・巨人との表示高225:225:270で比較し、40px・60pxでも首・翼・しっぽの輪郭を確認。夜色・白背景の両方で透過の縁を確認した。

#### 追加効果4種類

`img/adventure/tower/tower-fx-3.webp`：1024×1024、RGBA、透過のlossless WebP。4列×4行、1コマ256×256。キャラクター・杖・盾の実物・鳥・竜・口などは描かず、効果のみ。

| 行（0始まり） | 効果 | 左から右への4コマ |
|---|---|---|
| 0 | 氷の弾（右から左） | 生まれる小さな核 → 左へ飛ぶ弾と右に引く尾 → 命中してはじける → 小さな破片が散る |
| 1 | 盾で防ぐ | 衝撃の輪 → 青白い火花 → 氷の粉 → わずかな粒だけに消える |
| 2 | 突風 | 細い風の筋 → 大きな渦 → 舞う雪粒 → 薄い風と粒が消える |
| 3 | 冷気のブレス（右が口もと、左へ広がる） | 短い冷気 → 左へ広がる → 最大の横長の吹雪 → 薄い雪粒だけ |

通常の切り出し：`sx = frame * 256`、`sy = row * 256`、幅・高さ256、frameは0〜3。各効果は最大216×216に収まり、各コマの外周20pxは完全透明。

ブレスは共通の中央帯（コマ内 `[20, 80, 216, 96]`）へ収めた。横へ引き伸ばす際、この帯だけを使うなら `sx = frame * 256 + 20`、`sy = 848`、`sw = 216`、`sh = 96`。4コマとも同じ範囲を使い、右端を口もと、帯の中央を道の中央へ合わせる。実際の可視高は最大63pxで、帯の上下に余白がある。

既存効果を参照して image_gen で16コマの原画を生成。ブレスを柔らかい雪の流れへ再編集し、上3行は初稿、最下行は修正版を採用した。各コマの座標系を保って216×216以内へ共通倍率で縮小し、ブレスだけ全4コマ共通で216×96の中央帯へ整えた。コマごとのトリミング・拡大はせず、少ない粒の始点・終点が大きくならないようにした。アルファ8/255以下と原画のコマ境界の微光を整理し、ブレス最終コマ左端に混入した隣コマの光も除いた。生成原画は別途保持している。

- WebP・RGBA・1024×1024、16コマすべてに効果があることを確認。
- 全コマの外周20pxが完全透明、可視範囲216×216以内、隣のコマへのはみ出しなし。
- ブレスは全コマ中央の同じ帯に収まり、出始め→拡大→最大→消失の効果量を画素と目視で確認。
- 氷の弾は先端が左・尾が右。ブレスは右の細い発生位置から左の雪の前面へ広がることを目視確認。
- 夜色・白背景で縁とコマ順を確認。ブレスの共通帯を960×96へ横長に引き伸ばし、道を覆う表示も確認。
- 画像と引き継ぎ記録のみの変更。ゲームの読み込み・描画処理は変更していないため、ゲームコードの自動テストは追加・実行していない。

#### 取り込み時に確認してほしい点

1. 最新の精霊・巨人、承認済み3体と合わせた画風・輪郭線・明るさ。
2. 氷竜を表示高270で描いたときのボスの存在感と、40〜60pxでも長い首・翼・しっぽを見分けられるか。
3. 効果を実際の再生速度で重ねたときの大きさ、ブレスの道への横方向の伸ばし方。
4. 透過の縁、氷の弾とブレスの左向き、最終コマの消え方。

#### 使用プロンプト（氷竜）

Create ONE production boss monster sprite for FROZEN FRONTIER snowy fantasy survival/learning JRPG. Exact1536x1024 landscape TRANSPARENT RGBA canvas. ONE ICE DRAGON only, filling most canvas but with at least40px clear transparent margin on every side; full horns, all four feet, folded wings, and entire tail visible, no cropping. Primary style reference1 is approved ice spirit/snow giant; reference2 is approved bird/knight/witch. Match their detailed hand-painted Japanese anime fantasy rendering, crisp dark blue contour outlines, fine tactile icy texture, luminous readable white/cyan highlights, soft painterly shading. Dark reference backdrop is for visibility only: NO background/backdrop in output. No ground, no floor, no cast shadow or contact shadow, no scenery, no frame or text, no other creatures or humans.
DESIGN: majestic ancient quadruped ICE DRAGON, strong high-difficulty boss, awe and dignity rather than horror, suitable for children. Big elongated low torso standing on FOUR distinct clawed draconic legs; LONG graceful upright S-CURVED NECK, small elegant dragon head held high with calm bright cyan eyes, swept-back crystalline ICE HORNS (not bull crescent horns). Long sinuous tapering TAIL curling sideways to the right so it is unmistakably visible. TWO WINGS FOLDED against back/flanks, structured like folded angular dragon wings with translucent blue icy membranes and clear jointed ribs, NOT spread open and not bird feathers. Layered faceted ice SCALES, white frosted ridges on back and shoulders, pale ivory/icy underbelly plates, deep blue crevices. No fur mane or large beard; silhouette must differ clearly from the horned furry beast and the biped rock giant. Proud regal face, no snarling rage, no gore, a few small teeth at most. Mouth very slightly open, a SMALL WISP of chilly white-cyan breath leaks toward LEFT next to snout, close to mouth only, no large attack plume (the attack is a separate VFX asset).
POSE: front THREE-QUARTER view, face and long neck oriented slightly toward viewer's LEFT, all four feet readable, body extends horizontally toward right and tail curls out to right. Folded wings clearly visible over back. Complete outline roughly1300wide x880tall, centered in canvas, horizontal and massive. Long neck rises above the low body's shoulder, long tail and folded wings give a distinct dragon shape even at40-60px tall. Heavier boss presence than reference snow giant, the game will draw it at1.2x giant height. Keep transparent negative space between neck, torso, legs and tail; no rectangular haze or glowing background. Snow white, ice blue, pale cyan, dark blue contours; match approved newest monsters in brightness and detail. Detailed painted illustration, NOT3D, NOT photorealistic, NOT pixel art, NOT flat icon.

#### 使用プロンプト（追加効果の初稿）

Create a production EFFECT ANIMATION ATLAS for FROZEN FRONTIER snowy Japanese anime fantasy JRPG. Exact1024x1024 transparent RGBA. FOUR COLUMNS x FOUR ROWS, cell256x256, SIXTEEN different separate cells. Match reference effect sheets' finely painted faceted blue ice, white snow grains, crisp readable outlines and delicate luminous highlights. Reference backdrops are visibility aids ONLY: output background alphaZERO. No text, labels, grid, borders, ground, shadows or rectangular haze. ONLY EFFECTS: NO character, NO witch, wand, physical shield, knight, bird, dragon, mouth or body part. Each complete effect including glow/particles fits within central216x216 of its cell with at least20px fully transparent margin. Never cross cell boundaries. Columns are FOUR DISTINCT left-to-right animation stages, same cell coordinate system/scale: do NOT enlarge sparse start/end frames to fill cells. All magic is cyan/blue/white; shield sparks are BLUE-WHITE, not orange flames.
ROW1 y0-255: ICE BOLT traveling RIGHT TO LEFT. Cell1: a SMALL newborn blue crystal energy seed near local(x176,y128), with a few fine cyan sparkles, no wand. Cell2: a LEFT-POINTING faceted ice projectile, sharp tip toward localx55-75, solid icy head mainly left of center, a thin pale cyan snowy TRAIL extending RIGHT towardx210. Direction MUST be LEFT (mirror opposite the arrow in reference1). Cell3: centered impact, icy starburst breaking into blue shards and cold white sparkles. Cell4: fewer SMALL scattered fading ice fragments, no big unbroken projectile and no dense burst.
ROW2 y256-511: DEFLECT / SHIELD BLOCK, effect only no shield object. Cell1: small thin pale blue-white shock ring, center mostly transparent. Cell2: brightest compact BLUE-WHITE deflection sparks / asymmetric starburst at contact, fine crystalline accents, no flames. Cell3: fine ice POWDER and small pale shards scatter outward, less dense. Cell4: almost empty, only 4-8 tiny very faint blue-white specks, no ring or large burst.
ROW3 y512-767: BLIZZARD BIRD GUST moving generally LEFT. Cell1: two or three thin curling horizontal white-cyan wind STREAKS. Cell2: a larger swirling airy wind vortex/ribbons with a few snow grains, still open/transparent, not an opaque solid tornado. Cell3: wind becomes faint and mostly separate snow GRAINS swirling outward. Cell4: mostly vanished, a couple short faint wind wisps and a few tiny snow specks only. No bird, no feathers as a character silhouette.
ROW4 y768-1023: DRAGON COLD BREATH, HORIZONTAL LEFTWARD BLIZZARD BAND for later stretching across an entire lane. Mouth/origin is implied at the RIGHT end of every cell, no actual mouth drawing. Narrow origin at localx215,y128, snowy plume extends toward LEFT. Keep the whole breath in a THIN HORIZONTAL CENTRAL BAND centered localy128, maximum heightabout80px (y88..168), maximum width216. This must be much WIDER THAN TALL, not a radial burst, not an upward tornado, no tall billowing cloud. Cell1: short small horizontal chilly wisp near RIGHT origin x160..215. Cell2: plume reaches left tox80 from right originx215, wider toward LEFT, fine longitudinal swirling streaks, light snow grains. Cell3: strongest and longest plume x28..220, wide leading snowy fan on LEFT and narrow tapered source on RIGHT, a layered icy-white blizzard ribbon with tiny blue-white snow grains; no central starburst or large solid crystal chunks. Cell4: band nearly gone, only a few tiny snow flecks and very thin short fading streaks around y112..144. Horizontal texture/flow must remain natural when stretched much wider alongx. ALL FOUR breath frames centered vertically in same thin band; plenty of transparency above/below. LEFT end is advancing cold, RIGHT end is the source.
Strict regular4x4 atlas. Prioritize different row identities, clear build/impact/fade progressions, correct LEFTWARD ice bolt and breath, genuinely sparse final frames, cool child-friendly painted effects, and transparent padding.

#### 使用プロンプト（ブレスの修正）

Edit ONLY the BOTTOM ROW (four dragon breath frames) of this16-cell4x4 transparent VFX atlas. Preserve the TOP THREE ROWS (ice bolt, blue shield sparks, wind) unchanged. Keep exact square4x4 layout, transparent background, no labels, no characters or body parts, independent cells with transparent margins. Problem to correct: bottom-row first3 cells currently look like sharp RIGHT-pointing crystalline arrows. They must read as a LEFTWARD SNOWY BREATH plume instead of a projectile.
REPLACE all hard arrow tips, spear-shaped veins and long pointed crystals in bottom row with SOFT HORIZONTAL ICY WHITE BLIZZARD / SNOW MIST and fine tiny snow grains. Direction is RIGHT TO LEFT. At the RIGHT end near localx215,y128 is the IMPLIED SOURCE: a narrow SHORT OPEN-ENDED HORIZONTAL JET, softly cut off with a tiny FLAT/VERTICAL open edge on the right (not a sharp point or arrowhead). From that right source, wind streaks curve/sweep LEFT and snowy fog expands toward LEFT. LEFT end is the broad SOFT FEATHERY BILLowing snow front, no arrowhead there either, with fine snow particles scattered farther to the left. No central impact burst. No large crystals. Do not draw the dragon mouth.
All four breath frames stay in the SAME THIN CENTRAL HORIZONTAL BAND centered at localy128, maximum occupied heightabout80px, widthatmost216px, lots of transparent empty space above/below. Frame1: small short soft cold wisp just LEFT of right-hand origin, aroundx160..215, no angular point. Frame2: plume extends farther LEFT fromx215 down tox80, widening at its LEFT front; fine horizontal snow spray. Frame3: strongest plume spanningx28..220, widest snowy leading edge on LEFT, narrow open source on RIGHT, layered soft longitudinal white/cyan snow ribbons with SMALL snow grains, suitable for stretching across a whole lane. Frame4: almost entirely faded, only a few tiny snow grains and a couple very faint short wisps in the central band, no dense fog. Keep frame1 small and frame4 faint, never enlarge them independently.
Retain same finely painted Japanese anime ice magic style and cool blue-white palette. Top three rows exactly same. This is a transparent horizontal area attack, not an arrow projectile, not flame, not an opaque large cloud or a vertical tornado. LEFT flow must be visually obvious through expanding soft snowy front on left and narrow open origin on right.
