# 施設アイコン（プロンプト）

完了・レビュー待ち。依頼は `FACILITY_ICON_REQUESTS.md`。main から `grok/facility-icons`。

見本: `img/art/subj-math.jpg` などの教科アイコン。ふっくらした立体のミニチュア。左上から光。角丸タイル（丸みは一辺の約16%）。四すみは透明。384×384 WebP、各60KB以下。文字なし。

共通: A rounded-square app icon tile, soft 3D miniature game-art style, chubby glossy shapes, warm gentle lighting from the upper left, thin white rim and a soft shadow, solid saturated tile background, object centered with generous margin, no text, no letters, no numbers, kid-friendly, 1:1.

- `fac-weapon.webp`: steel blue-gray tile. A sword leaning on a small wooden stand, a little hand axe, tip of a spear.
- `fac-armor.webp`: warm brown tile. A breastplate, a round shield, and a helmet.
- `fac-item.webp`: saturated green tile. Small red and blue potion bottles, a scroll, and a leather pouch. No labels.
- `fac-tavern.webp`: saturated orange tile. A wooden mug with foam, a small barrel, a warm lantern.
- `fac-party.webp`: vivid blue tile. Three small friendly adventurers in different colored capes and hats, waving. Gentle faces.
- `fac-magic.webp`: saturated purple tile. A glowing crystal ball and an open blank spellbook, tiny stars.
- `fac-ticket.webp`: golden yellow tile. Overlapping golden tickets with decorative patterns only, no writing.
- `fac-training.webp`: bright red tile. A wooden training dummy and a wooden sword, small footprints.


## 透明背景の作り直し（grok/facility-icons-2）

絵の中身は前回の生成画像のまま。背景だけ切り直した。

方法: 元の JPG（白い紙面の上の角丸タイル）から、白に近い画素（R,G,B がすべて 236 超）を外してタイルを切り出す。384×384 の透明キャンバスの中央に、最大 348px で置く。角丸はタイル短辺の約16%。白いふちはタイルの一部として残す。影はタイルの下にアルファ 64 の黒をぼかした半透明だけ。キャンバスの外周 3px はアルファ 0 に固定した。黒・白・灰色の不透明な四角は残していない。
