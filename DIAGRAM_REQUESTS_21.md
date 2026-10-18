# 依頼（第21弾）：小5社会 `terrain_016`（三角州）の「絵」を作り直す 1枚（ChatGPT 向け）

**【完了・レビュー待ち】2026-10-18** 依頼元：Claude（判断468）。ChatGPT が画像を生成して差し替えた。プロンプト・制作方法・確認結果は `HAND_SOC5_PICTURES.md`、判断469を参照。
使い方は、第18弾（`DIAGRAM_REQUESTS_18.md`。小5社会の絵。Grok 向けに書いた依頼書ですが、絵の作り方は同じです）・第20弾（`DIAGRAM_REQUESTS_20.md`）と同じです。**今回は ChatGPT が、画像を生成して、ファイルを置きます。****作業の土台・絵のきまり・差し替えの形は、そちらを読んでください**（ブランチ例：`codex/soc5-terrain-016`）。このファイルがあるブランチ（`claude/terrain016-request`。main に入ったあとは `main`）から作ってください。

## 背景

デバッグ版のレビューで、`social_g5_hand_terrain_016`（三角州）の絵に、次の指摘が付きました。

> 河口が三角状に広がっているように見えない。河川も山側から河口へ放射状に出ているのが普通かと思いますが、この図は曲がって合流したりしていて、典型的な三角州とはいえないのでは？

いまの絵（`img/diagrams/soc5_terrain_016.webp`）は、川が大きく曲がって、いくつかの流れが**また合流**していて、中央の島が三角形に見えるだけで、「川が海に出る口に、土砂がたまって三角形に広がった平地」には見えません。**典型的な三角州の姿に、描き直してください。**

問題（変えないでください）：

- 問題文：川が海に出る河口にできる土や砂が積もった三角形に近い平らな土地を何といいますか。
- 答え：三角州（選択肢：三角州・扇状地・台地・砂丘）
- 解説：河口付近に土や砂が積もってできる地形を三角州（デルタ）といいます。

## 変えてよいもの

1. **絵のファイルを `img/diagrams/soc5_terrain_016.webp` に置きかえる**（WebP、横800×縦533 px（3：2）、**約100KB以下**。テストの上限は400KB）。
2. `terrain_016` の `diagram` の `alt` を、新しい絵に合わせて直してよい（`questions/social_g5_hand.js`）。`alt`・`caption` に、**答えを言わない**（「三角州」「デルタ」と書かない）。問題文・答え・選択肢・ヒント・解説・ID・難易度は変えない。

## 描くもの

**川が海に出る河口を、空高くから見下ろした絵。典型的な三角州（デルタ）。**

- 画面の**上（おく）が山あい・上流、下（手前）が海**。上流から**1本の川**が来て、**平らな土地に出たところで、数本（3〜4本）に枝分かれして、海へ向かって扇のように、放射状に広がって流れる**。枝分かれした川は、**もう合流しない**（曲がりくねらせない。ゆるやかに、まっすぐに近い形で、海へ向かう）。
- 川と川の間は、**土砂がたまった、平らな緑の土地（田・畑・草地）**。全体として、**上がせまく、海側（下）に向かって広がる三角形**に見える。海岸線は、**海のほうへふくらむ**（川がはこんだ土砂で、海に張り出している）。
- 河口まわりの海は、土砂で少しにごった水色（川の出口から、すじ状に）。
- 三角形の平らな土地の上に、**町（小さな家のまとまり）を少し**。まわりに、木・草・田畑。左右の端に、低い山や丘をほんの少し（あっても、三角形の平地が主役）。
- ヒントの「広島市や大阪市の一部が、この地形の上にあります」に合うように、町は小さく、平地の上に。

## 描かない

- **文字・数字・記号・矢印・吹き出し・透かし。**
- **川が合流して島を作るような描き方**・曲がりくねった川（蛇行）・中洲（なかす）が主役になる絵。
- 扇状地（山のふもとの、川が山から出るところの扇形の土地）に見える絵：**山のふもとではなく、海に出るところ**にする（海がはっきり見えること）。
- 人物の大写し。船・橋・ダム。

## 絵のきまり（第18・20弾と同じ）

- 画風：あたたかいアニメ調のゲームイラスト。教科書のように、はっきりした形・すっきりした背景（**写実的な写真風にしない**）。見本は `img/diagrams/soc5_*.webp` と `img/diagrams/soc4_*.webp`。
- 小学5年生が見て、「川が海に出るところで、川が何本にも分かれて、三角形の平らな土地になっている」と一目でわかること。スマホで上下が少し切れても読み取れること。
- 使ったプロンプトを、`HAND_SOC5_PICTURES.md` の `soc5_terrain_016.webp` の行に書きかえて残す。

プロンプトの例（そのまま使っても、直してもよい）：

```
Warm anime-style educational illustration for a Japanese elementary textbook, matching img/diagrams/soc4 and sci5: soft painterly shading, natural colors, clear scene readable at a glance, 3:2 landscape. No text, no letters, no numbers, no signs, no logos, no arrows, no speech bubbles, no watermark. High aerial view of a river delta: one river comes from the hills at the top, and where it reaches the flat plain it splits into three or four distributary channels that fan out straight-ish and never rejoin, spreading toward the sea at the bottom. Between the channels are flat green triangular lands of rice fields and farms, with a small town on the delta. The overall land forms a clear triangle (narrow at the top, wide at the bottom) bulging into the sea; slightly muddy light-blue sea water in streaks off each river mouth. Low hills only at the far top corners. Not a meandering river, no islands formed by merging channels, not a mountain-foot alluvial fan. People tiny or absent, no ships, no bridges.
```

## 完了の条件

1. `img/diagrams/soc5_terrain_016.webp` が置きかわり、`node tests/run.js` がすべて成功する（`tests/cases/diagram-image.js` が、ファイルの実在・大きさを確かめます。ほかの固定の印（ハッシュ）は、`alt` だけを変えたときは、失敗メッセージの値に書きかえてください）。
2. 絵を、問題文・答えと並べて見て、**河口で川が数本に分かれ、三角形の平地ができている**こと・合流していないこと・文字がないことを確かめる。
3. この文書の先頭を「完了・レビュー待ち」にし、`DECISIONS.md` に書く（番号は、最後の番号に続ける）。
4. PR を作る。Claude が絵を問題文・答えと並べて確認し、直す点があれば PR にコメントする。
