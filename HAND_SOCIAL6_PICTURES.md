# 小6社会 第1回 画像制作記録

ブランチ：`codex/social6-questions`。作業日：2026-11-02。

## 採用結果

計21枚（縄文〜古墳14・飛鳥／奈良7）、対象33問（20・13）。場面イラスト18・教科書の図3。全問 reviewed:false のまま。指定23候補のうち、形・模様の確実な表現を確認できなかった2枚は除外した。

全画像は画像生成ツールで個別に生成。元のPNGから縦横比を保って1200×800へ縮小し、WebPに変換。画素の描き足し・文字の後付け・SVGによる代作はしていない。1枚200,000バイト以下（200KiBより厳しい上限）。

参照資料は学習内容・形状の確認用であり、掲載写真の複製ではない。設問の条件を再構成した教育用の絵を、実物写真・遺跡の実測図として扱わない。

## 一覧

| ファイル名（img/diagrams/） | 対象問題 | 内容 | バイト数 |
|---|---|---|---:|
| soc6_prehistoric_001.webp | social_g6_prehistoric_001<br>social_g6_prehistoric_009 | 火のそばの容器と木の実 | 189908 |
| soc6_prehistoric_002.webp | social_g6_prehistoric_003 | 住まいと地面の断面 | 190014 |
| soc6_prehistoric_003.webp | social_g6_prehistoric_004<br>social_g6_prehistoric_011 | 川と田の位置 | 186242 |
| soc6_prehistoric_004.webp | social_g6_prehistoric_005 | 建物の床と地面 | 179264 |
| soc6_prehistoric_005.webp | social_g6_prehistoric_006 | 焼いた土で作られたもの | 104716 |
| soc6_prehistoric_006.webp | social_g6_prehistoric_008<br>social_g6_prehistoric_025<br>social_g6_prehistoric_027 | 二つの丘の形と大きさ | 182054 |
| soc6_prehistoric_007.webp | social_g6_prehistoric_010 | 住まいのあとから出た骨 | 198384 |
| soc6_prehistoric_008.webp | social_g6_prehistoric_012<br>social_g6_prehistoric_023 | むらの建物と周りの土地 | 187440 |
| soc6_prehistoric_009.webp | social_g6_prehistoric_014<br>social_g6_prehistoric_015 | 石と金属で作られた道具 | 115416 |
| soc6_prehistoric_010.webp | social_g6_prehistoric_018 | 工事中の大きな丘 | 181300 |
| soc6_prehistoric_011.webp | social_g6_prehistoric_020 | 土の中から出た金属の道具 | 185416 |
| soc6_prehistoric_012.webp | social_g6_prehistoric_021 | 島の石とむらで見つかったもの | 194858 |
| soc6_prehistoric_013.webp | social_g6_prehistoric_022 | AとBから出たもの | 181372 |
| soc6_prehistoric_014.webp | social_g6_prehistoric_024 | 三つの地層から出たもの | 196820 |
| soc6_asuka_nara_001.webp | social_g6_asuka_nara_002<br>social_g6_asuka_nara_021 | 役人のかぶり物と文書 | 185876 |
| soc6_asuka_nara_002.webp | social_g6_asuka_nara_009 | 大陸の港に着いた船 | 191296 |
| soc6_asuka_nara_003.webp | social_g6_asuka_nara_011<br>social_g6_asuka_nara_012 | 古代の文書と田 | 145630 |
| soc6_asuka_nara_004.webp | social_g6_asuka_nara_013<br>social_g6_asuka_nara_014<br>social_g6_asuka_nara_022 | 古代の人々が運んだ品物 | 195024 |
| soc6_asuka_nara_005.webp | social_g6_asuka_nara_015<br>social_g6_asuka_nara_027 | 海辺の見張り場と離れた住まい | 193930 |
| soc6_asuka_nara_006.webp | social_g6_asuka_nara_017<br>social_g6_asuka_nara_024 | 田を開く途中の土地 | 199662 |
| soc6_asuka_nara_008.webp | social_g6_asuka_nara_023 | 二つの村の荷物と日数 | 136730 |

## 1枚ずつの制作記録

### soc6_prehistoric_001.webp

- 対象：`social_g6_prehistoric_001`, `social_g6_prehistoric_009`
- 種類：場面イラスト
- caption：火のそばの容器と木の実
- alt：土を焼いた深い容器と、まだ加工していない木の実が火のそばにある。
- 出力：1200×800px、189908 bytes、WebP quality 76
- 確認：土器の名称、食べられるようになった完成物、調理前後の正解比較は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [三内丸山遺跡「三内丸山遺跡とは」](https://sannaimaruyama.pref.aomori.jp/about/iseki/)：竪穴建物、土器、骨・木の実などの出土資料。特定遺構の実測復元ではなく学習用の再構成。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Jomon-era scene: one undecorated earthenware deep pot next to a small stone-bordered wood fire, a shallow woven tray of raw acorns and nuts beside it. No prepared food, no cooked result, no modern utensils. Show pottery clay texture, no inscriptions. Earth floor with minimal context. Pot and raw nuts have equal visual importance. Single scene, no panels. Save as soc6_prehistoric_001.
```

### soc6_prehistoric_002.webp

- 対象：`social_g6_prehistoric_003`
- 種類：場面イラスト
- caption：住まいと地面の断面
- alt：屋根の下の床が周りの地面より低くなっている住まいの断面。
- 出力：1200×800px、190014 bytes、WebP quality 82
- 確認：住居名、部位名、寸法、現代の設備は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [三内丸山遺跡「三内丸山遺跡とは」](https://sannaimaruyama.pref.aomori.jp/about/iseki/)：竪穴建物、土器、骨・木の実などの出土資料。特定遺構の実測復元ではなく学習用の再構成。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Clear architectural cutaway of a Jomon pit dwelling: simple thatch roof over timber poles, earthen floor distinctly BELOW surrounding ground surface, cutaway earth at front. No chimney, masonry, modern furniture.
```

### soc6_prehistoric_003.webp

- 対象：`social_g6_prehistoric_004`, `social_g6_prehistoric_011`
- 種類：場面イラスト
- caption：川と田の位置
- alt：小さな川と、少し離れた田。間には地面が続いている。
- 出力：1200×800px、186242 bytes、WebP quality 76
- 確認：完成した水路、引水の正解ルート、矢印、農業の名称は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [吉野ヶ里歴史公園「高床倉庫」](https://www.yoshinogari.jp/g/index_45.html)：高床建物を参照。村の配置・水田の位置は設問の条件に合わせた模式的な再構成。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Bird-eye oblique view of a few early Yayoi wet rice plots with rice shoots, and separate stream a short distance away. Dry ground separates stream and plots. Do NOT connect stream to plots with channels or arrows. No machinery.
```

### soc6_prehistoric_004.webp

- 対象：`social_g6_prehistoric_005`
- 種類：場面イラスト
- caption：建物の床と地面
- alt：木の柱で床を高くした建物。床の下に地面とのすき間がある。
- 出力：1200×800px、179264 bytes、WebP quality 79
- 確認：乾燥を示す効果記号、理由の説明、床下の敵など誤った誘導は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [吉野ヶ里歴史公園「高床倉庫」](https://www.yoshinogari.jp/g/index_45.html)：高床建物を参照。村の配置・水田の位置は設問の条件に合わせた模式的な再構成。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Yayoi raised timber grain store with thatched roof, rice sheaves visible within, simple ladder. Critical archaeological detail: EVERY support post is embedded directly in the earth, NO stones under posts, NO foundation slabs. Posts disappear down into damp dark soil. Big clearly visible gap between ground and wooden floor. No rodents, no explanation arrows.
```

描き直し理由：柱が石の基礎に乗っていたため、掘立柱に修正。

初稿プロンプト（不採用）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Yayoi wooden granary on raised wooden posts, thatched roof, small open doorway with rice sheaves; obvious open air gap below wooden floor, damp dark soil underneath. No dry/wet arrows or labels. No rodents.
```

### soc6_prehistoric_005.webp

- 対象：`social_g6_prehistoric_006`
- 種類：場面イラスト
- caption：焼いた土で作られたもの
- alt：筒・人・馬の形をした、赤茶色の土製品が並んでいる。
- 出力：1200×800px、104716 bytes、WebP quality 88
- 確認：はにわの名称、人物の実在肖像、現代の彩色の推測は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [国立文化財機構 e国宝「埴輪 馬」](https://emuseum.nich.go.jp/detail?content_base_id=100567&content_part_id=001&content_pict_id=001&langId=)：土製の馬と馬具の特徴。彩色や特定人物の肖像は再現しない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Three equally weighted fired reddish clay archaeological objects: cylindrical haniwa with horizontal bands and round holes; simple human haniwa hollow cylindrical torso; stocky short-legged horse haniwa with modest clay saddle. Museum-neutral background, not living beings. No real face.
```

### soc6_prehistoric_006.webp

- 対象：`social_g6_prehistoric_008`, `social_g6_prehistoric_025`, `social_g6_prehistoric_027`
- 種類：場面イラスト
- caption：二つの丘の形と大きさ
- alt：丸い部分に四角く広がる部分がつながる、大きさの異なる二つの丘。
- 出力：1200×800px、182054 bytes、WebP quality 82
- 確認：古墳の名称、地域名、支配者、動員人数、勢力の結び付きの線は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [埼玉県立さきたま史跡の博物館「埼玉古墳群紹介」](https://sakitama-muse.spec.ed.jp/埼玉古墳群紹介)：前方後円墳の形と大小の違い。特定の古墳の規模・位置・築造手順を示す絵ではない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Two separate keyhole-shaped earthen burial mounds seen from identical oblique aerial angle on neutral grassland, one substantially larger. Both circle smoothly joined to flaring rectangular forepart; show earthen terraces. No people or palace or map labels. No modern trees covering outline.
```

### soc6_prehistoric_007.webp

- 対象：`social_g6_prehistoric_010`
- 種類：場面イラスト
- caption：住まいのあとから出た骨
- alt：土の中から出た魚の骨。いくつかの先が黒くなっている。
- 出力：1200×800px、198384 bytes、WebP quality 64
- 確認：魚を食べる人物、料理の復元、道具として使う場面、用途の結論は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [三内丸山遺跡「三内丸山遺跡とは」](https://sannaimaruyama.pref.aomori.jp/about/iseki/)：竪穴建物、土器、骨・木の実などの出土資料。特定遺構の実測復元ではなく学習用の再構成。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Archaeological close-up of scattered fish vertebrae, ribs and a jaw fragment in brown excavated soil, some blackened burnt ends. No complete fish, no cooking/eating action, no meals, no excavation labels.
```

### soc6_prehistoric_008.webp

- 対象：`social_g6_prehistoric_012`, `social_g6_prehistoric_023`
- 種類：場面イラスト
- caption：むらの建物と周りの土地
- alt：似た大きさの住まいや倉、田、川のあるむらの様子。
- 出力：1200×800px、187440 bytes、WebP quality 79
- 確認：豊かな家と貧しい家の格差の結論、争い、所有者の順位は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [吉野ヶ里歴史公園「高床倉庫」](https://www.yoshinogari.jp/g/index_45.html)：高床建物を参照。村の配置・水田の位置は設問の条件に合わせた模式的な再構成。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Wide simplified Yayoi settlement, equal modest thatched dwellings, small raised rice-storage building, rice plots and nearby stream. No rich/poor comparison, no warfare, no ownership markers, no modern canals.
```

### soc6_prehistoric_009.webp

- 対象：`social_g6_prehistoric_014`, `social_g6_prehistoric_015`
- 種類：場面イラスト
- caption：石と金属で作られた道具
- alt：穴のある半月形の石の道具と、上に輪がある金属製のもの。
- 出力：1200×800px、115416 bytes、WebP quality 88
- 確認：道具名、正解だけの拡大、収穫や祭りで使用する結論、年代は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [兵庫県立考古博物館「メインホール展示2021年5月」](https://www.hyogo-koukohaku.jp/modules/xelfinder/index.php/view/87/202105mainhall.pdf)：石包丁の半月形・薄い板・二つの穴を確認。
  - [島根県「考古資料」](https://www1.pref.shimane.lg.jp/life/bunka/bunkazai/shimane/koukosiryou.html)：銅鐸を含む弥生の青銅資料。絵の装飾は簡略化し、特定遺物の模様の比較には使わない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Equal-sized visual panels without labels, pale background: left a smooth half-moon stone harvesting blade with two small perforations near straight edge, no handle; right a patinated bronze dotaku bell with rounded top suspension arch and understated intersecting band decoration. Do not show their uses, no rice harvest or worship.
```

### soc6_prehistoric_010.webp

- 対象：`social_g6_prehistoric_018`
- 種類：場面イラスト
- caption：工事中の大きな丘
- alt：段を付けて土を積み上げている途中の大きな丘と、その周りの土。
- 出力：1200×800px、181300 bytes、WebP quality 82
- 確認：食料・人数をそろえた解答セット、労働の美化、実在人物は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [埼玉県立さきたま史跡の博物館「埼玉古墳群紹介」](https://sakitama-muse.spec.ed.jp/埼玉古墳群紹介)：前方後円墳の形と大小の違い。特定の古墳の規模・位置・築造手順を示す絵ではない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. A large unfinished keyhole burial mound, unfinished sloping earth terraces and loose earth awaiting transport. Minimal timber retaining elements; no workers or food supplies or wagons or modern machinery. Show scale of construction, not a solution.
```

### soc6_prehistoric_011.webp

- 対象：`social_g6_prehistoric_020`
- 種類：場面イラスト
- caption：土の中から出た金属の道具
- alt：さびた金属の輪や棒、輪の形をした道具のかけら。
- 出力：1200×800px、185416 bytes、WebP quality 85
- 確認：乗馬の完成場面、馬の利用という結論、用途名は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [国立文化財機構 e国宝「埴輪 馬」](https://emuseum.nich.go.jp/detail?content_base_id=100567&content_part_id=001&content_pict_id=001&langId=)：土製の馬と馬具の特徴。彩色や特定人物の肖像は再現しない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Archaeological still life of corroded ancient iron horse-tack fragments: simple ring-ended bit bars and incomplete oval ring stirrup, separated on pale earth background. No horse or rider, no labels, no modern horseshoes.
```

### soc6_prehistoric_012.webp

- 対象：`social_g6_prehistoric_021`
- 種類：場面イラスト
- caption：島の石とむらで見つかったもの
- alt：左は海に囲まれた島の黒い石。右は別の場所のむらと、黒い石で作られた道具。
- 出力：1200×800px、194858 bytes、WebP quality 88
- 確認：運搬中の船、人の移動経路、交流を示す矢印、地名は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [兵庫県立考古博物館「考古資料集成26.黒曜石製石器」](https://www.hyogo-koukohaku.jp/modules/info/index.php?action=PageView&page_id=90)：黒い天然ガラスの質感、石器材料と流通を確認。島は問題文の条件を示す模式的な島で、特定の島ではない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Two separate equally sized observation vignettes with a WIDE WHITE GAP between them. LEFT: a small rocky island entirely surrounded by sea seen from above, a glassy black obsidian boulder exposed on its rock surface. RIGHT: a Jomon village dwelling with one knapped obsidian arrowhead prominent in foreground, black glassy material matching left rock. Separate scenes, not a continuous shoreline. No arrows, no boats, no routes, no labels. Island rock and arrowhead are the only highlighted objects.
```

描き直し理由：島と村の岸が地続きに見えたため、二つの独立した観察場面へ修正。

初稿プロンプト（不採用）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. A narrow sea separates small rocky island on left and simple Jomon coastal settlement on right. A natural black glassy obsidian rock near left shore and a small knapped black obsidian arrowhead at settlement visible prominently, same material. No boats, paths, arrows, origin names, borders, exchange scene.
```

### soc6_prehistoric_013.webp

- 対象：`social_g6_prehistoric_022`
- 種類：教科書の図
- caption：AとBから出たもの
- alt：Aには貝がらと魚の骨。Bには木の実とシカの骨が並んでいる。
- 出力：1200×800px、181372 bytes、WebP quality 82
- 確認：海や森の背景、正解の調査先、食生活の結論は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [三内丸山遺跡「三内丸山遺跡とは」](https://sannaimaruyama.pref.aomori.jp/about/iseki/)：竪穴建物、土器、骨・木の実などの出土資料。特定遺構の実測復元ではなく学習用の再構成。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Textbook comparison plate: two equal panels labeled ONLY A and B in very large clean sans-serif capitals. A contains seashells and fish bones; B contains raw acorns and deer bones with antler fragment. Neutral pale background, no sea or forest, no location inferred from surroundings. No other text.
```

### soc6_prehistoric_014.webp

- 対象：`social_g6_prehistoric_024`
- 種類：教科書の図
- caption：三つの地層から出たもの
- alt：上の層に土製品のかけら、中の層に木製の道具、下の層に石の道具がある。
- 出力：1200×800px、196820 bytes、WebP quality 73
- 確認：古い・新しいの文字、年代、時間の矢印、答え順に並べ直した別図は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [三内丸山遺跡「三内丸山遺跡とは」](https://sannaimaruyama.pref.aomori.jp/about/iseki/)：竪穴建物、土器、骨・木の実などの出土資料。特定遺構の実測復元ではなく学習用の再構成。
  - [国立文化財機構 e国宝「埴輪 馬」](https://emuseum.nich.go.jp/detail?content_base_id=100567&content_part_id=001&content_pict_id=001&langId=)：土製の馬と馬具の特徴。彩色や特定人物の肖像は再現しない。
  - 地層の上下と出土物は prehistoric_024 本文の架空の条件。実在の一遺跡にこの三層があるという図ではない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Textbook archaeological cutaway: exactly THREE undisturbed horizontal soil layers. Upper layer contains broken orange hollow clay haniwa sherds with band and round hole; middle layer wooden farming hoe head and digging tool fragments; bottom layer small stone arrowheads and stone spearhead. No labels, numbers, time arrows, dates, houses or whole burial mounds.
```

### soc6_asuka_nara_001.webp

- 対象：`social_g6_asuka_nara_002`, `social_g6_asuka_nara_021`
- 種類：場面イラスト
- caption：役人のかぶり物と文書
- alt：違う色のかぶり物を着けた二人の後ろ姿と、文字を省いた巻物。
- 出力：1200×800px、185876 bytes、WebP quality 88
- 確認：冠の序列や十二の数え取り、制度名、役職名、巻物の本文は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [四天王寺「聖徳太子について」](https://www.shitennoji.or.jp/shotokutaishi.html)：色の異なる冠で位を示す制度。特定の位と色の対応・人物像は示さない。衣服と建物は概略。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Two small Asuka-period officials viewed strictly from behind wearing simple long robes and soft close-fitting cloth caps, one deep purple and one blue; both same scale and level. Separate inset showing only a rolled blank sheet on a low wooden desk. Caps NOT later tall eboshi or Chinese winged official hats. No writing or ranks, no emperor or identifiable real person.
```

### soc6_asuka_nara_002.webp

- 対象：`social_g6_asuka_nara_009`
- 種類：場面イラスト
- caption：大陸の港に着いた船
- alt：木の船と帆、荷物を運ぶ人々の小さな後ろ姿。旗や文字はない。
- 出力：1200×800px、191296 bytes、WebP quality 85
- 確認：制度を学ぶなどの目的の断定、国名、航路・年号、特定の使節の肖像は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [国営平城宮跡歴史公園「天平うまし館」](https://www.heijo-park.jp/guide/suzakumon/tenpei_zone-3/)：復原遣唐使船の案内を参照。特定の船・港の実測復元ではなく、木造帆船と港の場面。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Seventh/eighth century East Asian wooden envoy sailing vessel beside modest timber landing pier at a continental harbor, plain rectangular cloth sails, wooden oars, a few small rear-view travelers in simple long robes, balanced closed bundles and rolled blank documents. No national flags, no inscriptions, no modern port cranes, no European rigging, no full travel route or arrows.
```

### soc6_asuka_nara_003.webp

- 対象：`social_g6_asuka_nara_011`, `social_g6_asuka_nara_012`
- 種類：場面イラスト
- caption：古代の文書と田
- alt：文字を省いた巻物を置いた机と、あぜで区切られた田。
- 出力：1200×800px、145630 bytes、WebP quality 88
- 確認：戸籍・口分田の文字、支給基準・面積・人数、帳簿の文字は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [奈良国立博物館「戸籍」](https://shosointen-glossary.narahaku.go.jp/koseki/)：奈良時代の人々の記録の説明を確認。氏名・制度名や数値は絵に入れない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Two balanced observation vignettes separated by pale blank space: left low plain ancient wooden desk with partly unrolled absolutely blank paper scroll and simple brush, right oblique view of ancient rice fields divided by low earth ridges. NO people, NO hats, no connecting arrows or writing. Do not show allocation sizes, individual land ownership or totals.
```

描き直し理由：役人の冠が後の時代に見えるため、人を描かず文書と田の対比に修正。

初稿プロンプト（不採用）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Two balanced areas separated by pale blank space: left small rear-view eighth century Japanese clerk at low timber desk with a partly unrolled BLANK paper register; right oblique view of several rice fields separated by earthen ridges. No arrows joining the areas, no names, no numbers, no size measurements, no marked allocation ratios, no rows of readable writing.
```

### soc6_asuka_nara_004.webp

- 対象：`social_g6_asuka_nara_013`, `social_g6_asuka_nara_014`, `social_g6_asuka_nara_022`
- 種類：場面イラスト
- caption：古代の人々が運んだ品物
- alt：稲の束、折りたたんだ布、海そうなどの品物を並べた様子。
- 出力：1200×800px、195024 bytes、WebP quality 82
- 確認：税名、荷札の地名・産物名、送り先や完成した物流の矢印は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [奈良文化財研究所「荷札のささやき」](https://www.nabunken.go.jp/nabunkenblog/2014/05/tanken16.html)：米・布・海産物を運んだことと荷札の資料を確認。税目との対応や輸送の結果を絵で示さない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Three equal-weight groups on plain mat: tied harvested rice sheaves, folded undyed handwoven cloth, and a small woven basket containing dried seaweed with closed straw-wrapped bundles. Eighth century Japanese rural tax goods, no labels or tags with writing, no arrows or destination or modern products. Do not divide them into named taxes.
```

### soc6_asuka_nara_005.webp

- 対象：`social_g6_asuka_nara_015`, `social_g6_asuka_nara_027`
- 種類：場面イラスト
- caption：海辺の見張り場と離れた住まい
- alt：左は海を見渡す見張り場。右は別の土地の住まいと家族の後ろ姿。
- 出力：1200×800px、193930 bytes、WebP quality 85
- 確認：戦闘の結果、行く理由の文字、兵士名、侵攻する敵の断定は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [福岡市博物館「防人たち」](https://museum.city.fukuoka.jp/archives/leaflet/588/index.html)：主に東国から北部九州へ送られた制度を確認。二つの場面は別の場所。見張り場の具体的形状は概略。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Two clearly separate vignettes with WIDE WHITE SPACE dividing them, NOT a continuous landscape. LEFT: simple timber lookout near northern Kyushu seacoast, tiny rear-view eighth-century guard in undyed tunic and trousers holding spear upright, looking at calm sea. RIGHT: inland eastern Japan thatched rural home among low hills, small family seen from behind at doorway. NO SEA in right panel, no joining path, no combat, no samurai armor, no enemies, no arrow or labels.
```

描き直し理由：離れた家族の場面が見張り場の近所に見えたため、独立した二場面へ修正。

初稿プロンプト（不採用）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Two quiet separate vignettes: a modest ancient northern-Kyushu coastal lookout with a small rear-view guard in plain eighth-century tunic, trousers and simple spear, looking across calm sea; and distant ordinary thatched rural home with tiny rear-view family figures. No combat, armor helmets of samurai, enemies, victory, weapons aimed at people, maps or connecting arrows.
```

### soc6_asuka_nara_006.webp

- 対象：`social_g6_asuka_nara_017`, `social_g6_asuka_nara_024`
- 種類：場面イラスト
- caption：田を開く途中の土地
- alt：草や切り株が残る土地と、その近くの小さな田。
- 出力：1200×800px、199662 bytes、WebP quality 76
- 確認：法令名、有力者が土地を獲得した結果、資金や人手の正解セットは描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [山川出版社ヒストリスト「墾田」](https://www.historist.jp/word_j_ko/entry/032473/)：開発された田・開発予定地という用語の範囲を確認。作業人員・所有の結論は描かない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Ancient eighth-century rural land partially cleared for cultivation: one side rough uncultivated grass and stumps, other side a few small newly worked rice patches, cutaway view not necessary. No workforce, money, ownership signs, completed rich estate, no modern tools or machinery.
```

### soc6_asuka_nara_008.webp

- 対象：`social_g6_asuka_nara_023`
- 種類：教科書の図
- caption：二つの村の荷物と日数
- alt：Aは10日、Bは30日。同じ大きさの荷物を一つずつ示している。
- 出力：1200×800px、136730 bytes、WebP quality 88
- 確認：道中の食料差、農作業を休む結果、負担の順位、国や地方の地名は描かない。本文で与えられた観察対象を示し、名称・理由・結論は書かない。
- 確かめた資料：
  - [奈良文化財研究所「荷札のささやき」](https://www.nabunken.go.jp/nabunkenblog/2014/05/tanken16.html)：米・布・海産物を運んだことと荷札の資料を確認。税目との対応や輸送の結果を絵で示さない。
  - A・B・10日・30日は asuka_nara_023 本文の条件をそのまま使用。実際の特定村からの所要日数ではない。

採用プロンプト（全文）：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Textbook comparison with exactly two equal panels. Left: large clean A, below it large exact Japanese text 10日, below it ONE identical tied cloth-wrapped transport bundle. Right: large clean B, below it large exact Japanese text 30日, below it ONE identical tied cloth-wrapped transport bundle. Small simple eighth-century thatched village silhouette in each background. ONLY text A B 10日 30日. Each glyph at least 8 percent of image height. No food, no working farmers, no arrows, no clocks, no date calendars. This illustrates GIVEN round-trip days and equal loads, NOT inferred burdens.
```

## 見送り・計画からの削除

- 指定の5枚：local_tax_002、modern_001、constitution_004、heian_008、kamakura_007。解く手がかりにならないため除外。画像・diagramは作っていない。
- **soc6_asuka_nara_007.webp**：asuka_nara_018・026は図なし。[東大寺公式教材](https://www.todaiji.or.jp/kids/kids2-2.html)で木・縄・粘土、鋳型の間隙、盛り土、下から順に鋳継ぐ工程を確認。試作画像は鋳型と内部の境目、坐像の形と土の関係が曖昧で、正しい構造を保証できないため不採用。採用フォルダには保存しない。

不採用の試作プロンプト：

```text
Create one original educational illustration for a Japanese grade-six history question, landscape 3:2. Warm clear restrained watercolor and precise clean outlines, simple pale background, large readable main objects at smartphone size. Historically plausible ancient Japanese materials and structures. No text, no letters, no numbers, no captions, no watermark, no borders unless explicitly allowed. No real person's likeness; avoid people or show small distant backs. Do not illustrate an inferred answer, causal conclusion, completed outcome or anachronism. Original educational reconstruction detail of the EIGHTH-CENTURY TODAIJI bronze statue casting, based on Todaiji official kids construction account: timber internal armature and clay inner form, clay outer mold separated by a narrow casting gap, thick earthen fill supporting outer mold around LOWER TORSO only. Oblique cutaway of the lower torso worksite, small visible bronze wall at one exposed edge. Earth mound supports the mold, NOT an exposed giant finished statue. No face, no finished head, no lotus pedestal (pedestal cast after body), no rows of eight labels, no workers or materials delivery or causal cooperation diagram, no modern equipment. Forms clearly show clay and bronze without labels. Single scene, simple background.
```

- **soc6_asuka_nara_009.webp**：asuka_nara_025は図なし。生成していない。[奈良国立博物館・花喰鳥](https://shosointen-glossary.narahaku.go.jp/hanakuidori/)、[同・連珠文](https://shosointen-glossary.narahaku.go.jp/renju-mon/)、[Met・馬の文様の織物](https://www.metmuseum.org/art/collection/search/329610)を確認したが、対にする実物の細部を視覚的に十分確認できなかった。一般化した架空模様を史料比較として提示しないため計画から外す。
- **soc6_kamakura_008.webp**：今回は対象外なので生成しない。将来制作時に金剛力士像の実物資料で姿勢・腕・胴体を照合してから着手し、確信が持てなければ除外する。確認済みとは扱わない。
- **soc6_modern_003・007.webp**：今回は対象外。遠景・静かな表現に限定し、戦闘・負傷・苦痛を描かない条件を継続。

## 検査

- `node tests/run.js`：908件成功、0件失敗。
- `tests/cases/course-social6.js`：21ファイルと33問題の対応、画像の存在、WebP拡張子と実体、1200×800、200,000バイト以下、空でないalt/caption、正解文字列が入っていないことを確認。
- 第1回以外の単元と除外した問題は図なしを検査。ID・問題文・正解・難易度・reviewedは保持。
- 表示確認の結果は以下に追記。
- 390px幅・昼テーマの実際の問題画面で対象33問を表示し、画像の読み込みとdecode完了を待って全画面を撮影。21枚の390px縮小一覧と代表的な問題画面を目視確認した。A/Bと10日/30日の記号・文字が読め、説明文が画像の下に表示されることを確認。撮影は `/tmp/so6-pictures/screens/`（作業時の確認用、リポジトリには含めない）。
- WebPの最小104,716・最大199,662バイト。全21枚で1200×800を確認。
- diagramを取り除いた問題データを変更前と比較し、全336問の内容が同一であることを確認。
