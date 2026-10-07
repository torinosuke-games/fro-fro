# 依頼：「町のほかの施設」のアイコン 8枚（Grok 向け）

**【完了・レビュー待ち】2026-10-07** 依頼元：Claude（ユーザーの依頼）。絵を作るのはあなた（Grok）です。
使い方は、第17弾（`DIAGRAM_REQUESTS_17.md`）・第20弾（`DIAGRAM_REQUESTS_20.md`）と同じです。**作業の土台（ブランチ・PR・テスト）は、そちらを読んでください**（ブランチ例：`grok/facility-icons`）。このファイルがある `main` から作業してください。

## 背景

町の画面の「学習する」ボタンの下に、**ほかの施設へ行くための四角いアイコンのボタン**を並べます。スマホの画面では、**横に4つ**（2行で8つ）。**ボタンの絵は、この依頼のアイコンです**。ボタンの下の名前の文字は、Claude がゲーム側で付けます（絵には文字を入れません）。いま絵が要るのは、次の8つです（施設の中身は、これから Claude が作っていきます。「チケット引換所」は、すでにある引換所です）。

| # | ファイル名 | 施設 | 絵に描くもの |
|---|---|---|---|
| 1 | `fac-weapon.webp` | 武器屋 | 台に立てかけた剣と、盾の代わりに小さな斧。ほかに、かざられた槍の先 |
| 2 | `fac-armor.webp` | 防具屋 | 鎧（胸当て）と、丸い盾、兜 |
| 3 | `fac-item.webp` | 道具屋 | 小さな薬びん（赤・青）と、巻物、革の袋 |
| 4 | `fac-tavern.webp` | 酒場 | 木のジョッキ（あわが立つ）と、小さなたる。あたたかい灯り |
| 5 | `fac-party.webp` | 仲間紹介所 | 3人ぶんの、ちがう色のマント・帽子の人影（顔は小さく、やさしく）。たがいに手をふっている |
| 6 | `fac-magic.webp` | 魔法研究所 | 光る水晶玉（または青い炎の杖）と、開いた魔法の本。小さな星の光 |
| 7 | `fac-ticket.webp` | チケット引換所 | 金色の券（チケット）が数枚、重なったところ。券の絵柄は文字なし |
| 8 | `fac-training.webp` | 訓練所 | 木の練習用の人形（かかし）と、木剣。足もとに小さな足あと |

## 絵のきまり（8枚そろえる）

1. **ファイル**：`img/art/fac-*.webp`（上の表のファイル名）。**WebP、正方形 384×384 px、1枚 約60KB以下**。表示は、スマホで 80px 前後・パソコンで 120px 前後に縮めて使います。
2. **四角いアイコン**：**角丸の四角いタイル**（角は、全体の約16％の丸み）の中に、描く物を1つのまとまりとして真ん中に置く。タイルの外（四すみ）は**透明**（背景なし）にする。タイルのふちに、うすい白い線（細いふち）と、わずかな影をつける。
3. **タイルの色は、施設ごとに変える**（8つ並べたとき、色で見分けられるように）。色の目安：武器屋＝はがね色（青みの灰）／防具屋＝茶色／道具屋＝みどり／酒場＝オレンジ／仲間紹介所＝あざやかな青／魔法研究所＝むらさき／チケット引換所＝金色（黄）／訓練所＝あかるい赤。**どれも、白に近い淡い色ではなく、はっきりした色**にする（雪の画面の上で目立つように）。
4. **画風**：すでにある教科のアイコン（`img/art/subj-math.jpg`・`subj-jp.jpg`・`subj-en.jpg` など）と同じ、**ふっくらした立体のミニチュア風**（やわらかい光、ぷっくりした形、あたたかい色）。細かくしすぎない。**小さく縮めても、何の施設か、形で分かる**こと（物は大きく、数は少なく）。
5. 描く物は、タイルの**中央**に、**上下左右に約12％の余白**を残して置く。
6. 8枚で、**光の向き（左上から）・ふちの太さ・影・タイルの丸み・物の大きさ**をそろえる。

## 描かない

- **文字・数字・記号・看板の文字・透かし**（「武器」「SHOP」など、何も書かない。券にも文字を入れない）。
- 本物のゲーム・商品・キャラクターに似た物。
- 暴力的・こわい表現（血・ドクロ・戦っている場面）。**小学生向け**。人影は、やさしく、顔は小さく。
- タイルの外の背景・グラデーション（四すみは透明）。

## プロンプトの例（そのまま使っても、直してもよい）

共通の前置き：

> A rounded-square app icon tile, soft 3D miniature game-art style, chubby glossy shapes, warm gentle lighting from the upper left, thin white rim and a soft shadow, solid saturated {COLOR} tile background, the object centered with generous margin, no text, no letters, no numbers, transparent background outside the tile, kid-friendly, 1:1.

物の部分（上の表のとおり）：

- 武器屋：a sword leaning on a small wooden stand, a little hand axe, tip of a spear
- 防具屋：a breastplate armor, a round shield and a helmet
- 道具屋：small red and blue potion bottles, a scroll and a leather pouch
- 酒場：a wooden mug with foam, a small barrel, warm lantern glow
- 仲間紹介所：three small friendly adventurers in different colored capes waving to each other, tiny faces
- 魔法研究所：a glowing crystal ball and an open spellbook, tiny sparkles
- チケット引換所：a few overlapping golden tickets with plain decorative patterns (no text)
- 訓練所：a wooden training dummy and a wooden sword, small footprints

## 完了の条件

1. 8枚が `img/art/fac-*.webp` にある（形式・大きさ・容量が上のとおり）。`node tests/run.js` がすべて成功する。
2. 8枚を**並べて**見て、色・画風・大きさがそろっていること、**文字が入っていないこと**、**小さく縮めても（80px）形で分かること**を確かめる。
3. 使ったプロンプトを `HAND_FACILITY_ICONS.md` に残す。この文書の先頭を「完了・レビュー待ち」にし、`DECISIONS.md` に書く（番号は、最後の番号に続ける）。
4. PR を作る。**画面への組み込み（ボタンの並び・名前の文字）は、Claude がやります**ので、あなたは絵だけ作ってください。Claude が絵を確認し、直す点があれば PR にコメントします。
