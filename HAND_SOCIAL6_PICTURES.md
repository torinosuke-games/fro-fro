# 小6社会 画像制作記録

第1回〜第4回の制作内容を記録する。古墳の保留は利用者提供写真との照合で解消済み。現状は末尾の追補を参照。

# 第1回 画像制作記録

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


# 第2回（2026-11-02）：修正2枚・新規16枚、古墳の写真照合は保留

- 登録済み：縄文土器001・魚骨007の2枚を差し替え。平安7枚・鎌倉9枚（場面14・教科書の図2）を28問へ新規登録。合計37枚・61問。全336問のID・本文・正解・難易度・reviewedは変更していない。
- 未完了：prehistoric_006の候補画像はできたが、要求された実物空撮との目視比較ができていない。現行画像・対象IDは変更していない。後述の保留記録を参照。
- 見送り：kamakura_008は実物写真で腕・体幹の形を確認できなかったため、利用者の指示に従い計画から削除。対象019は図なし。
- 新規場面は画像生成、地図も地理データから作った参照図を画像生成ツールに渡して仕上げた。SVGは使用しない。元画像は保持し、採用画像を1200×800に縮小してWebP化。200,000バイト以下。
- 資料の説明文・地理データの確認と、実物写真の目視確認を区別する。以下の史料URLは、特記しない限り説明文を確認したもの。写真は確認済みと書かない。
- 前の第1回記録のバイト数・プロンプトは当時の履歴。今回の変更2枚については以下が現行の記録。

## 第2回の登録一覧

| ファイル名 | 対象問題ID | 内容 | bytes |
|---|---|---|---:|
| soc6_prehistoric_001.webp | social_g6_prehistoric_001<br>social_g6_prehistoric_009 | 火のそばの容器と木の実 | 197252 |
| soc6_prehistoric_007.webp | social_g6_prehistoric_010 | 住まいのあとから出た骨 | 195530 |
| soc6_heian_001.webp | social_g6_heian_003<br>social_g6_heian_019 | 庭や池のある住まい | 199308 |
| soc6_heian_002.webp | social_g6_heian_008<br>social_g6_heian_028 | 田畑の境目の様子 | 189198 |
| soc6_heian_003.webp | social_g6_heian_014<br>social_g6_heian_023 | 田畑と都の住まい | 182054 |
| soc6_heian_004.webp | social_g6_heian_015<br>social_g6_heian_024 | 紙を受け取る場面 | 196990 |
| soc6_heian_005.webp | social_g6_heian_017 | 横に広げた巻物 | 188438 |
| soc6_heian_006.webp | social_g6_heian_018 | 港の船と荷物 | 179994 |
| soc6_heian_007.webp | social_g6_heian_022 | 資料A・Bの暮らしの場面 | 192686 |
| soc6_kamakura_001.webp | social_g6_kamakura_002<br>social_g6_kamakura_003<br>social_g6_kamakura_026 | 人々と田畑の三つの場面 | 198454 |
| soc6_kamakura_002.webp | social_g6_kamakura_004<br>social_g6_kamakura_005<br>social_g6_kamakura_022 | 集まりと収穫の場面 | 194178 |
| soc6_kamakura_003.webp | social_g6_kamakura_009<br>social_g6_kamakura_015<br>social_g6_kamakura_016 | 田畑・収穫・武具 | 198158 |
| soc6_kamakura_004.webp | social_g6_kamakura_010 | 馬と弓の練習 | 179892 |
| soc6_kamakura_006.webp | social_g6_kamakura_013<br>social_g6_kamakura_028 | 博多湾沿いの海岸 | 186338 |
| soc6_kamakura_009.webp | social_g6_kamakura_020<br>social_g6_kamakura_027 | 読む場面と語る場面 | 182096 |
| soc6_kamakura_010.webp | social_g6_kamakura_023 | 海岸の警備に向けた準備 | 189394 |
| soc6_kamakura_011.webp | social_g6_kamakura_024 | 田の境目で相談する場面 | 195818 |
| soc6_kamakura_005.webp | social_g6_kamakura_012 | 京都と鎌倉の位置（概略） | 59994 |

### 第2回：soc6_prehistoric_001.webp

- 対象：`social_g6_prehistoric_001`、`social_g6_prehistoric_009`
- 種類：場面イラスト
- caption：火のそばの容器と木の実
- alt：土を焼いた深い容器と、まだ加工していない木の実が火のそばにある。
- 出力：1200×800、197252 bytes、WebP quality 79
- 確認した資料・条件：
  - [京都国立博物館「縄目に注目してみると」](https://www.kyohaku.go.jp/jp/learn/home/dictio/kouko/232/)の説明文：縄を転がす・押し付けることで粘土に文様を付ける。利用者の深鉢の指定をもとに、広口・深い胴に変更した。写真を目視したとは扱わない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。
- 作り直し理由：丸いつぼ状の形を深鉢に変更。最初の修正版の縄目は実際の縄を貼ったように見えたため、浅いくぼみの連続模様へ再修正した。木の実・かご・火は保持。

採用プロンプト（全文）：

```text
Edit only the pot surface in this image, preserve its deep open bowl shape, wide mouth, almost straight deep walls, basket and nuts, fire and surroundings. The current surface looks covered in actual woven thick rope and is WRONG. Replace that texture with fired reddish-brown clay covered in SMALL SHALLOW INDENTED impressions left by rolling a thin twisted cord over wet clay. Fine recessed dotted diagonal grooves only, no actual rope, no woven basket texture, no raised rope coils, no bands. Unglazed rough clay with subtle scorch tint near bottom. Keep rim plain and slightly irregular. Absolutely no text or labels. Landscape3:2.
```

### 第2回：soc6_prehistoric_007.webp

- 対象：`social_g6_prehistoric_010`
- 種類：場面イラスト
- caption：住まいのあとから出た骨
- alt：土の中から出た魚の骨。いくつかの先が黒くなっている。
- 出力：1200×800、195530 bytes、WebP quality 49
- 確認した資料・条件：
  - 利用者の修正指定（小さな円盤状の背骨・細い小骨・あご・うろこ・一部の焦げ）と問題本文の出土状況。第1回に記録した三内丸山遺跡の出土物の説明を引き継ぐ。今回の魚種や特定発掘資料を同定した図ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。
- 作り直し理由：太い獣骨に見えた部分を、細い魚骨・小さな背骨・あご・うろこへ変更し、一部の黒い焦げは残した。

採用プロンプト（全文）：

```text
Edit this archaeological illustration preserving the soil and excavated small remains composition. Replace all thick vertebrae and ribs with unmistakably SMALL FISH remains: a short linked chain of tiny disk/spool shaped vertebral centra, a few detached small disk centra, fine needle-like fish bones, one delicate fish jaw fragment and a few small fish scales. Thin fragile anatomy, not mammalian ribs, not dinosaur bones, no large pelvis or heavy curved bones. Some fragments are blackened by burning, others pale tan. Clear close-up educational scientific watercolor rendering. No intact flesh, no cooking scene, no person, no text, no numbers, no labels. Landscape 3:2.
```

### 第2回：soc6_heian_001.webp

- 対象：`social_g6_heian_003`、`social_g6_heian_019`
- 種類：場面イラスト
- caption：庭や池のある住まい
- alt：庭と池の周りに、廊下でつながる木の建物がある。
- 出力：1200×800、199308 bytes、WebP quality 58
- 確認した資料・条件：
  - [コトバンク「寝殿造」](https://kotobank.jp/word/%E5%AF%9D%E6%AE%BF%E9%80%A0-82294)の説明文：建物・渡殿・御簾などの構成を確認。特定の邸宅の実測復元ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Heian-period Japanese aristocratic residence around 1000 CE, high oblique view of timber shinden-style main hall and smaller flanking buildings linked by covered wooden corridors. Broad cypress-bark roofs, open wooden verandas with reed blinds, plank floors and loose mats, no full modern tatami grids or modern shoji. South garden has a pond with small natural island, shrubs and gravel. Composition clearly shows garden, pond and connecting corridors. No people necessary. Not a temple or castle, not Chinese tiled palace.
```

### 第2回：soc6_heian_002.webp

- 対象：`social_g6_heian_008`、`social_g6_heian_028`
- 種類：場面イラスト
- caption：田畑の境目の様子
- alt：田畑の境目に立ち、弓を持つ人の後ろ姿。
- 出力：1200×800、189198 bytes、WebP quality 76
- 確認した資料・条件：
  - [コトバンク「大鎧」](https://kotobank.jp/word/%E5%A4%A7%E9%8E%A7-39672)の説明文：平安・鎌倉期の大鎧、大袖と札を糸でつなぐ構造。[文化遺産データベース「白絲威鎧」](https://online.bunka.go.jp/db/heritages/detail/188936)の年代説明。特定の現存甲冑の複製ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Late Heian rural Japan, a few rice paddies and dry cultivated plots separated by low earthen boundaries. A small distant anonymous warrior seen from behind quietly stands beside an uncertain land boundary. Plain late-Heian lamellar armor with broad shoulder guards, long asymmetrical bow, no elaborate horned helmet or katana pair. No opponent, no battle, no conquest or outcome. Landscape occupies most of image, warrior small.
```

### 第2回：soc6_heian_003.webp

- 対象：`social_g6_heian_014`、`social_g6_heian_023`
- 種類：場面イラスト
- caption：田畑と都の住まい
- alt：地方の耕地と都の建物を、離れた二つの場面で示している。
- 出力：1200×800、182054 bytes、WebP quality 76
- 確認した資料・条件：
  - [コトバンク「寝殿造」](https://kotobank.jp/word/%E5%AF%9D%E6%AE%BF%E9%80%A0-82294)の説明文：建物・渡殿・御簾などの構成を確認。特定の邸宅の実測復元ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Two separated balanced vignette scenes on a pale parchment background with no connection arrows: left rural Heian-period cultivated fields and simple farmhouse; right a Heian capital aristocrat timber residence with cypress-bark roof, open wooden veranda and reed blinds, garden. Views at similar visual prominence, large neutral gap between. No people, no ownership colors, no giving of land, no protection outcome.
```

### 第2回：soc6_heian_004.webp

- 対象：`social_g6_heian_015`、`social_g6_heian_024`
- 種類：場面イラスト
- caption：紙を受け取る場面
- alt：紙を受け取る人の後ろ姿と、筆を用意した机。紙の文字は省略している。
- 出力：1200×800、196990 bytes、WebP quality 79
- 確認した資料・条件：
  - [コトバンク「寝殿造」](https://kotobank.jp/word/%E5%AF%9D%E6%AE%BF%E9%80%A0-82294)の説明文：建物・渡殿・御簾などの構成を確認。特定の邸宅の実測復元ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Heian Japan around1000 CE: anonymous adult court noble seen only from behind sitting on a loose mat on a wooden veranda, receiving a small completely blank folded sheet from another anonymous person's hand at frame edge. Nearby low writing desk with inkstone, brush, and blank paper ready for response. Court eboshi cap and loose layered robe. Reed blinds, simple wooden interior, no wall text. Absolutely no marks on paper. No face, no emotions or poem words.
```

### 第2回：soc6_heian_005.webp

- 対象：`social_g6_heian_017`
- 種類：場面イラスト
- caption：横に広げた巻物
- alt：横長の紙に暮らしの小さな場面が続き、両端が巻かれている。文章部分は省略している。
- 出力：1200×800、188438 bytes、WebP quality 85
- 確認した資料・条件：
  - [藤田美術館「そもそも絵巻ってなんですか？」](https://fujita-museum.or.jp/topics/2020/03/13/708/)の説明文：紙を横につないだ巻物。既存作品は複製せず、文章欄は空白にした。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Object study: partially unrolled long horizontal Japanese handscroll on a plain wooden surface, wooden roller at each end. Alternating entirely blank cream text spaces and small painted daily-life vignettes of late Heian Japan: people carrying baskets on path, a wooden residence with garden, rear-view person on veranda. All tiny painted people faces hidden. Original compositions not copying existing art. No text or pseudo-writing on scroll or anywhere. Make the continuous rolled format clear.
```

### 第2回：soc6_heian_006.webp

- 対象：`social_g6_heian_018`
- 種類：場面イラスト
- caption：港の船と荷物
- alt：港の船、器や布の荷物、中央に穴のある銭を示している。
- 出力：1200×800、179994 bytes、WebP quality 76
- 確認した資料・条件：
  - [ジャパンサーチ「福岡県博多遺跡群出土品」](https://jpsearch.go.jp/item/bunka-294910)の説明文：中世貿易拠点の陶磁器・宋人商人。中世全体の資料と12世紀の場面を混同しないよう、試作の青花を無地の青磁・白磁・褐色の器へ変更した。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。
- 作り直し理由：初稿の青い絵付けを無地の青磁・白磁・褐色の器に変更。銭の文字も除去。

採用プロンプト（全文）：

```text
Correct this late12th-century Japanese-Song trading harbor illustration. Keep layout, boat, cargo, rear-view anonymous merchants and cloth. Replace ALL blue-and-white painted ceramic jars (anachronistic here) with plain undecorated muted green celadon vessels, pale ivory white ware, and brown stoneware. No blue painted decorations anywhere. Remove ALL lettering, pseudocharacters and decorative markings from coins: small worn plain copper disks with square central holes, visible only as simple shapes, no inscriptions. Keep no text on packages or boat. No faces. No modern objects. Original educational warm watercolor, landscape3:2.
```

### 第2回：soc6_heian_007.webp

- 対象：`social_g6_heian_022`
- 種類：教科書の図
- caption：資料A・Bの暮らしの場面
- alt：Aは田畑のそばで弓を練習する人、Bは住まいで紙を交わす人。文字は省略している。
- 出力：1200×800、192686 bytes、WebP quality 76
- 確認した資料・条件：
  - [コトバンク「寝殿造」](https://kotobank.jp/word/%E5%AF%9D%E6%AE%BF%E9%80%A0-82294)の説明文：建物・渡殿・御簾などの構成を確認。特定の邸宅の実測復元ではない。
  - [コトバンク「大鎧」](https://kotobank.jp/word/%E5%A4%A7%E9%8E%A7-39672)の説明文：平安・鎌倉期の大鎧、大袖と札を糸でつなぐ構造。[文化遺産データベース「白絲威鎧」](https://online.bunka.go.jp/db/heritages/detail/188936)の年代説明。特定の現存甲冑の複製ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Two equal-width textbook scene panels, with ONLY large simple Latin capital A above left and B above right. A: late-Heian small rear-view warrior practicing longbow toward a plain unmarked straw target beside cultivated fields, no battle. B: Heian courtly wooden residence, two anonymous rear-view court nobles exchange completely blank papers beside low writing desk and brush. Period robes and eboshi, faces entirely hidden. No words except A and B; no additional symbols, no ranking, no decorative text.
```

### 第2回：soc6_kamakura_001.webp

- 対象：`social_g6_kamakura_002`、`social_g6_kamakura_003`、`social_g6_kamakura_026`
- 種類：場面イラスト
- caption：人々と田畑の三つの場面
- alt：建物に座る人、弓を持って集まる人々、区切られた田畑を別々に示している。
- 出力：1200×800、198454 bytes、WebP quality 85
- 確認した資料・条件：
  - [コトバンク「寝殿造」](https://kotobank.jp/word/%E5%AF%9D%E6%AE%BF%E9%80%A0-82294)の説明文：建物・渡殿・御簾などの構成を確認。特定の邸宅の実測復元ではない。
  - [コトバンク「大鎧」](https://kotobank.jp/word/%E5%A4%A7%E9%8E%A7-39672)の説明文：平安・鎌倉期の大鎧、大袖と札を糸でつなぐ構造。[文化遺産データベース「白絲威鎧」](https://online.bunka.go.jp/db/heritages/detail/188936)の年代説明。特定の現存甲冑の複製ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Three equally weighted isolated vignettes in a horizontal composition, separated by blank parchment gaps, no connecting lines: an anonymous seated shogun viewed entirely from behind in a modest Kamakura timber residence, a small rear-view group of Kamakura warriors with broad boxy o-yoroi shoulder guards and long bows, and bounded cultivated rice fields. No kneeling before another person, no gifts or transfer of land, no ownership colors, no arrows, no family crests.
```

### 第2回：soc6_kamakura_002.webp

- 対象：`social_g6_kamakura_004`、`social_g6_kamakura_005`、`social_g6_kamakura_022`
- 種類：場面イラスト
- caption：集まりと収穫の場面
- alt：建物の前に人々が集まる場面と、稲の束を確かめる場面。
- 出力：1200×800、194178 bytes、WebP quality 61
- 確認した資料・条件：
  - [コトバンク「大鎧」](https://kotobank.jp/word/%E5%A4%A7%E9%8E%A7-39672)の説明文：平安・鎌倉期の大鎧、大袖と札を糸でつなぐ構造。[文化遺産データベース「白絲威鎧」](https://online.bunka.go.jp/db/heritages/detail/188936)の年代説明。特定の現存甲冑の複製ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Two equally weighted separate vignettes of Kamakura Japan13th century. Left: several small rear-view warriors gathering quietly outside simple timber hall with shingle roof, broad rectangular o-yoroi shoulder guards, longbows. Right: anonymous rear-view people inspecting bundled harvested rice at rice field edge. No money or tax handover, no command diagram, no A/B labels, no family crests, no visible faces. Clearly different activities without specifying official titles.
```

### 第2回：soc6_kamakura_003.webp

- 対象：`social_g6_kamakura_009`、`social_g6_kamakura_015`、`social_g6_kamakura_016`
- 種類：場面イラスト
- caption：田畑・収穫・武具
- alt：田畑、収穫した稲と米、よろいや弓を別々に示している。
- 出力：1200×800、198158 bytes、WebP quality 82
- 確認した資料・条件：
  - [コトバンク「大鎧」](https://kotobank.jp/word/%E5%A4%A7%E9%8E%A7-39672)の説明文：平安・鎌倉期の大鎧、大袖と札を糸でつなぐ構造。[文化遺産データベース「白絲威鎧」](https://online.bunka.go.jp/db/heritages/detail/188936)の年代説明。特定の現存甲冑の複製ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Three isolated original object/landscape vignettes, same visual prominence, generous blank parchment gaps, NO arrows: left a Kamakura rice field; center a few tied rice sheaves and woven basket of harvested rice; right medieval13th-century Japanese o-yoroi with large square shoulder guards on plain wooden support, long asymmetrical bow and quiver nearby. No human needed. No Edo katana pair, no gun, no helmet with extravagant horns, no transfer/tax/payment result.
```

### 第2回：soc6_kamakura_004.webp

- 対象：`social_g6_kamakura_010`
- 種類：場面イラスト
- caption：馬と弓の練習
- alt：馬に乗り、弓を構える人の後ろ姿。離れた場所に的がある。
- 出力：1200×800、179892 bytes、WebP quality 76
- 確認した資料・条件：
  - [コトバンク「大鎧」](https://kotobank.jp/word/%E5%A4%A7%E9%8E%A7-39672)の説明文：平安・鎌倉期の大鎧、大袖と札を糸でつなぐ構造。[文化遺産データベース「白絲威鎧」](https://online.bunka.go.jp/db/heritages/detail/188936)の年代説明。特定の現存甲冑の複製ではない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Wide landscape of a Kamakura13th-century countryside practice ground. A small distant anonymous warrior seen entirely from behind practices riding a small sturdy horse and handling a Japanese asymmetrical long bow. Period broad o-yoroi shoulder guards, simple helmet, no elaborate crest. Plain straw target on ground far away, NO hit arrow or outcome, no opponent, no battle, no flags, no prizes. Quiet broad country landscape and basic wooden fence.
```

### 第2回：soc6_kamakura_006.webp

- 対象：`social_g6_kamakura_013`、`social_g6_kamakura_028`
- 種類：場面イラスト
- caption：博多湾沿いの海岸
- alt：砂浜に沿って、石を重ねた壁が続く様子。
- 出力：1200×800、186338 bytes、WebP quality 76
- 確認した資料・条件：
  - [福岡市の文化財「今津地区」](https://bunkazai.city.fukuoka.lg.jp/sp/cultural_properties/detail/38)の説明文：海に向いた砂丘の斜面の石積みと砂の構造。[福岡市「今津元寇防塁」](https://www.city.fukuoka.lg.jp/nishiku/c-shinko/charm/nisikunotakara/genkoborui_imadu.html)の位置・高さの説明。特定区間の写真復元ではなく、海岸と石積みの関係を示す再構成。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Quiet empty Hakata Bay coastal landscape in late13th-century Japan, oblique landward view shows a continuous roughly2-3m high stone barrier parallel to sandy shoreline. Sea-facing surface built of uneven local stone, wide top, slightly battered trapezoid profile, sandy earth behind. Not a European battlement, no crenellations or towers, no cement or cut ashlar, no torii. Coastal pines behind, calm water and distant hills, no ships, people, war, timeline, year or result. Material and relation to shoreline clearly visible.
```

### 第2回：soc6_kamakura_009.webp

- 対象：`social_g6_kamakura_020`、`social_g6_kamakura_027`
- 種類：場面イラスト
- caption：読む場面と語る場面
- alt：文字を省略した本を持つ手元と、琵琶を持つ人の後ろ姿を並べている。
- 出力：1200×800、182096 bytes、WebP quality 85
- 確認した資料・条件：
  - [国立公文書館「平家物語――妖しくも美しき――」](https://www.archives.go.jp/exhibition/digital/heikemonogatari/contents/09.html)の説明文：琵琶法師の語りと写本による伝承。[京都大学貴重資料デジタルアーカイブ](https://rmda.kulib.kyoto-u.ac.jp/item/rb00000086/explanation/heike)の説明文：僧侶による弾き語り。人物は匿名の後ろ姿にした。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。
- 作り直し理由：初稿の華やかな衣服と烏帽子を、簡素な僧衣と剃髪の後ろ姿に変更。

採用プロンプト（全文）：

```text
Edit only the RIGHT panel of this educational comparison. The storyteller must be an anonymous medieval Japanese BIWA HOSHI, not a noble court musician: entirely rear view with shaved head, NO eboshi hat, plain modest gray-brown Buddhist robe with no brocade patterns, sitting on simple mat near humble wooden building, no ornate palace behind. Preserve plausible pear-shaped four-string biwa lute and large plectrum, no face, no text, no speech notes. Listener backs may remain small. LEFT panel reading hands and completely blank diary should remain unchanged. Warm clear textbook watercolor, landscape3:2.
```

### 第2回：soc6_kamakura_010.webp

- 対象：`social_g6_kamakura_023`
- 種類：場面イラスト
- caption：海岸の警備に向けた準備
- alt：家のそばに武具や食料の包み、少量の銭を置き、人が荷物を準備している。
- 出力：1200×800、189394 bytes、WebP quality 76
- 確認した資料・条件：
  - [コトバンク「大鎧」](https://kotobank.jp/word/%E5%A4%A7%E9%8E%A7-39672)の説明文：平安・鎌倉期の大鎧、大袖と札を糸でつなぐ構造。[文化遺産データベース「白絲威鎧」](https://online.bunka.go.jp/db/heritages/detail/188936)の年代説明。特定の現存甲冑の複製ではない。
  - [福岡市の文化財「今津地区」](https://bunkazai.city.fukuoka.lg.jp/sp/cultural_properties/detail/38)の説明文：海に向いた砂丘の斜面の石積みと砂の構造。[福岡市「今津元寇防塁」](https://www.city.fukuoka.lg.jp/nishiku/c-shinko/charm/nisikunotakara/genkoborui_imadu.html)の位置・高さの説明。特定区間の写真復元ではなく、海岸と石積みの関係を示す再構成。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Quiet13th-century Kamakura warrior household preparing provisions and equipment for guarding the coast. Low wooden house veranda, small anonymous rear-view person preparing simple woven food bundles beside an o-yoroi armor with broad shoulder guards, long bow, arrows, and a small cloth with a few plain copper coins with square holes and absolutely NO inscriptions. No empty purse or explicit poverty outcome, no numbers, no battle, no new land depiction. No late-period armor or guns.
```

### 第2回：soc6_kamakura_011.webp

- 対象：`social_g6_kamakura_024`
- 種類：場面イラスト
- caption：田の境目で相談する場面
- alt：田の境目で二人が相談する後ろ姿。別の場所に文字を省略した巻物を置いている。
- 出力：1200×800、195818 bytes、WebP quality 76
- 確認した資料・条件：
  - [藤田美術館「そもそも絵巻ってなんですか？」](https://fujita-museum.or.jp/topics/2020/03/13/708/)の説明文：紙を横につないだ巻物。既存作品は複製せず、文章欄は空白にした。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。

採用プロンプト（全文）：

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Kamakura Japan13th-century: two very small anonymous people seen entirely from behind calmly discussing an unclear earthen boundary between adjacent rice fields. Identical muted clothing to avoid ownership clues, neither points at the other. Separate small vignette in foreground has an entirely blank partly rolled paper scroll on a low wood stand. No linking arrows, boundary colors, legal words, verdict, court labels, faces or fighting. Focus on uncertain boundary and undecided consultation.
```

### 第2回：soc6_kamakura_005.webp

- 対象：`social_g6_kamakura_012`
- 種類：教科書の図
- caption：京都と鎌倉の位置（概略）
- alt：上が北の地図。左の点が京都、右の点が鎌倉の位置を示している。
- 出力：1200×800、59994 bytes、WebP quality 88
- 確認した資料・条件：
  - [Natural Earthの公開地理データ](https://github.com/nvkelso/natural-earth-vector)（ne_10m_land.geojson、ne_10m_lakes.geojson、public domain）を取得し、海岸線と湖を描いた位置図を参照画像に使用。[京都付近の位置](https://geoshape.ex.nii.ac.jp/nrct/resource/27/270000332600.html)と[鎌倉の位置](https://geolod.thibetanus.com/resource/wNAifR)の座標説明を確認。点は概略で京都135.75E/35.02N、鎌倉139.55E/35.32N。現代の地形の概略を位置の手がかりに使い、当時の海岸線・行政境界・支配範囲は示さない。
  - 対象設問の本文と正解・誤答を照合。場面・素材を示し、用途・制度・結論のラベルや答えの矢印は加えない。
- 作り直し理由：初稿は伊豆半島などの海岸線が崩れたため不採用。地理データの参照図を使って再生成。最終画像と参照図の陸地マスクIoUは0.995、二点の位置を目視確認。小縮尺の概略図であり、厳密な距離測定には使わない。

採用プロンプト（全文）：

```text
Finish this accurate geographic reference as a restrained educational watercolor map. It is ESSENTIAL to preserve exactly the reference coastline, lake outline, island shapes, aspect ratio, and the exact positions and equal sizes of the two black dots. Do NOT redraw or reinterpret geography. Add only a very subtle light warm paper wash within the pale land and subtle pale blue wash in sea, keep crisp thin coastlines. No shading implying terrain, no new features. No text, labels, letters, numbers, routes, arrows, symbols, borders, title, compass, buildings, labels or hierarchy. Keep same3:2 composition and all outlines in same position. This is a school historical location aid with no political interpretation.
```

## 第2回の不採用初稿（修正履歴）

### soc6_prehistoric_001.webp の不採用初稿

```text
Edit this educational illustration. Keep the basket of nuts, the small fire, and surrounding natural setting/composition. Replace the clay vessel with an archaeologically plausible Jomon DEEP BOWL (fukabachi): broad OPEN mouth, deep almost straight slightly tapering sides, small flat base, height greater than width at the bottom, rough low-fired reddish brown clay with dense clearly visible rolled twisted-cord impressions across surface. Simple slightly irregular rim, no elaborate invented ornament. NOT a round smooth jar, NOT a narrow neck, NOT glazed. Preserve the warm clear textbook illustration style, landscape 3:2, no text, no labels, no numbers, no people, no cooked finished food or outcome.
```

### soc6_heian_006.webp の不採用初稿

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Late12th-century Japanese harbor during trade with Song China. Wooden seagoing cargo vessel at quiet wooden wharf; packed ceramic vessels, folded fabric bundles, and a few cast copper round coins with square holes on small mat, coins too small for lettering and shown without inscriptions. Two small anonymous people in simple period robes and eboshi seen from behind examining cargo and coins, no completed handshake or handover. Curved wooden hull and furled period sail, no modern cranes, currency, dock signs or route arrows.
```

### soc6_kamakura_009.webp の不採用初稿

```text
Create one original educational historical illustration for Japanese grade 6. Landscape 3:2, intended 1200x800. Warm restrained watercolor and fine ink, clear large shapes readable on a phone, realistic material and architecture, no fantasy. ALL people are small and seen strictly from behind, faces entirely hidden, anonymous, no portraits. No words, labels, signatures, arrows, numbers, kanji, writing or decorative pseudo-text anywhere unless explicitly allowed below. No battles, blood, injuries or violence. No modern objects. No Edo/Sengoku armor, guns, stone castle keeps, katana pair, modern paved roads. Medieval Japanese clothing and materials only. Keep scene observational; no answer, outcome, relationship arrows or didactic conclusion. Two distinct equal-sized scenes on a light parchment background. Left: close cropped hands holding open an entirely blank personal diary made of Japanese paper on a wooden floor, inkbrush nearby; no writing of any kind. Right: anonymous Kamakura13th-century robed biwa storyteller strictly seen from behind at three-quarter rear so a pear-shaped wooden lute, four strings, short bent neck and large plectrum can be seen to side. NO visible face, no audience faces. Plain surroundings, no music notes, speech bubbles, titles or superiority symbols.
```

### soc6_kamakura_005.webp の不採用初稿

```text
Create a rigorously geographically correct SIMPLE TEXTBOOK LOCATION MAP of central and western Honshu Japan. Landscape3:2 intended1200x800. North up, orthographic flat overhead, NO perspective, coastlines accurately based on real geography, include Lake Biwa and the Kii, Izu, Miura and Boso peninsulas recognizable, show part of Shikoku at bottom left if within frame. Pale cream land and pale blue sea, thin subtle gray coastline, no stylized mountains, buildings or people. Put ONLY TWO small equal dark circular dots: Kyoto at35.02N135.75E (inland west/southwest of Lake Biwa) and Kamakura at35.32N139.55E (on north coast of Sagami Bay, immediately WEST of Miura peninsula, NOT Tokyo). Do not print these coordinates or any names. Focus view 133.5E to141E and33N to37.4N, consistent scale throughout. Absolutely NO words, numbers, letters, labels, arrows, borders, routes, grids, compass, title, legend, politics, division, relationship line or ownership coloring. Neither dot emphasized over other. This is a location aid, no answer or hierarchy.
```

## 写真確認の制約と残作業

- 東大寺公式の[南大門](https://www.todaiji.or.jp/information/nandaimon/)の説明文と阿形・吽形の写真リンクを確認。阿形写真URLは https://www.todaiji.or.jp/wp-content/uploads/2022/01/kongo-rikishi.jpg 。画像取得はHTTP 403で拒否され、Web検索ツールの応答にも目視できる画像データが含まれなかった。別の像から推測で生成せず、soc6_kamakura_008.webpを計画から除外した。
- 古墳は[大仙陵古墳の2007年空撮資料](https://commons.wikimedia.org/wiki/File:NintokuTomb_Aerial_photograph_2007.jpg)の説明・国土地理院空撮の出典を確認。原画像URLは https://upload.wikimedia.org/wikipedia/commons/c/c3/NintokuTomb_Aerial_photograph_2007.jpg 。こちらも通信制限でHTTP 403となり、写真本体を目視できなかった。
- 古墳候補は、利用者の指定どおり大小二つ、全周の堀、前方部にも草木とゆるやかな段を描いて生成した。実物写真との照合前なので正式ファイルには反映していない。対象のsocial_g6_prehistoric_008・025・027と既存画像は維持。
- 残作業は、空撮写真を目視して候補を必要なら再修正し、同名WebPで置換、テスト、commit・push。写真の添付、または環境設定で資料サイトへのアクセスを許可してから再開できる。次の単元には進まない。

保留中の古墳候補プロンプト：

```text
Correct this educational aerial view of TWO DIFFERENTLY SIZED Japanese keyhole burial mounds. Preserve two mounds of different sizes side by side seen from same high oblique angle, warm detailed natural textbook style. CRITICAL geometry: EACH mound is ONE CONTINUOUS KEYHOLE SHAPED ISLAND consisting of circular rear joined through narrowed waist to a flared rectangular front. A CONTINUOUS WATER-FILLED MOAT must encircle the ENTIRE KEYHOLE perimeter, around BOTH circle AND all sides of rectangular front. NO land causeway, NO front protruding outside water, NO moat only around circle. The rectangular front is ALSO A GREEN EARTHEN HILL, with gently sloping rounded low terraced contours, grass, shrubs, and scattered trees like the rear mound. No stone steps, no pyramidal stone structure, no sharp white masonry edges, no stairs. Entire mound contours readable beneath patchy vegetation. Large and small mound have same basic keyhole shape; no connecting lines, no people, no tomb labels, no words, no numbers, no modern buildings or roads. Landscape3:2.
```

作業環境内の候補原画（未登録）：`/workspace/generated_images/exec-587c8ea1-9e97-4803-9ddf-91ff03a117f0.png`。

## 第2回の地図参照データ

- 海岸線・湖：Natural Earth 1:10mの現代地形を概略位置の参考に使用。歴史的な支配範囲や当時の海岸線の復元ではない。
- land10.geojson SHA-256：`1ac90796408bc6ad6911d69448485d3c4dbf2190370080368a09976e1c9f7416`
- lakes.geojson SHA-256：`2d036f53dedec578001c5c30c2959ee7d4eebc1306900fa4367c49929ec8f2d9`
- 投影用の縦横比：緯度35度のcos補正。表示範囲：経度133.8–141.2、緯度32.95–36.99。記号・数値は画像に印字しない。最終仕上げは上記の画像生成プロンプト。

## 第2回の検査結果

- `node tests/run.js`：908件成功・0件失敗。
- `tests/fixtures/social6-images-2.json`に16枚・28問の対応を追加。第1回の21枚・33問と合わせて37枚・61問を検査。画像の存在、WebP実体・拡張子、1200×800、200,000バイト以下、alt/captionの空欄・正解文字列混入を確認。
- 変更前後をdiagram以外の全フィールドで比較し、336問の内容が同一であることを確認。
- 新規28問と修正2枚の対象3問を、390px幅の実際の問題画面で表示し、画像のdecode完了を待って31問を撮影。18枚の縮小一覧と、A/B・地図・魚骨・琵琶の代表画面を目視。A/Bの判読とcaptionの表示を確認。作業時の撮影先は `/tmp/so6-round2/screens/`。
- 古墳候補・金剛力士像は上記検査の完成対象に含めない。


# 第2回追補：大仙古墳の添付写真と照合し、古墳006を差し替え

- 資料：利用者が会話に添付した `NintokuTomb_Aerial_photograph_2007.jpg`。画像そのものを目視確認した。先の通信制限による未確認状態は、この添付で解消した。
- 目視した点：前方部と後円部が一つの墳丘としてつながり、前方部の先端と側面を含む墳丘全体の周囲に水のある堀が回る。前方部も後円部と同様に樹木に覆われている。石積みのピラミッド状の階段ではない。
- 写真では植生が密で段の細部は見えないため、段数・傾斜・寸法を写真から確認したとは扱わない。写真の多重の堀や現代市街地をそのまま再現する絵ではなく、利用者指定の大小二つの墳丘を比較する学習用の再構成として、ゆるやかな地形と一周の堀を示す。
- 採用：前節に全文記録した「保留中の古墳候補プロンプト」で生成した候補を、添付写真と比較して採用。今回は追加生成せず、保持していた原画を縮小・WebP化した。
- ファイル：`img/diagrams/soc6_prehistoric_006.webp`。1200×800、194,914 bytes、WebP quality 79。
- 対象：`social_g6_prehistoric_008`・`social_g6_prehistoric_025`・`social_g6_prehistoric_027`。同名ファイルの置換のみで、問題ID・diagramの登録・alt・caption・reviewedは変更しない。既存fixtureの対応も同じなので書き換えない。
- 第2回の最終反映：修正3枚（prehistoric_001・006・007）、新規16枚（heian7・kamakura9）。金剛力士像008は前節の理由で見送りを継続。合計37枚・61問、画像計画96枚・161問の集計は変わらない。
- 前節の「古墳の照合待ち」「未登録」「残作業」はこの追補で解消した過去の記録。次の単元には進まない。
- 差し替え後の検査：`node tests/run.js` は908件成功・0件失敗。対象3問を390px幅で撮影し、全周の堀・前方部・大小の違い・captionの表示を目視確認した（`/tmp/so6-round2/kofun-screens/`）。

# 第3回 画像制作記録（2026-11-02）

ブランチ：`codex/social6-questions`。京都・鎌倉の地図1枚を修正し、室町・戦国9枚／江戸8枚を新規登録。新規対象は32問（14・18）、累計54枚／93問。次の単元は制作していない。

画像生成ツールで制作・修正後、Pillowは1200×800への縮小とWebP変換のみに使用。全18枚は200,000バイト以下。場面画像に文字は入れず、地図だけ利用者が許可した「京都」「鎌倉」を表示。全336問のdiagram以外のデータは変更せず、reviewed:falseを保持。

資料の説明文を読んで確認した事項と、写真そのものの目視確認は区別する。今回の外部資料は説明文を参照しており、取得できない実物写真を見たとは扱わない。測量の絵は確認できた単純な道具に限定した。

## 第3回一覧

| ファイル名 | 対象問題 | 内容 | バイト数 |
|---|---|---|---:|
| soc6_kamakura_005.webp（修正） | social_g6_kamakura_012 | 京都・鎌倉の地名を追加・拡大 | 47912 |
| soc6_muromachi_sengoku_001.webp | social_g6_muromachi_sengoku_003 | 墨の濃淡による山・川の小さな風景画と筆。表現の材料と技法を観察する。 | 184904 |
| soc6_muromachi_sengoku_002.webp | social_g6_muromachi_sengoku_007<br>social_g6_muromachi_sengoku_022 | 城と町の俯瞰。商いの場・職人の作業場を同じ大きさで示し、人々が集まる配置を観察。 | 199314 |
| soc6_muromachi_sengoku_003.webp | social_g6_muromachi_sengoku_011<br>social_g6_muromachi_sengoku_021 | 畳と床の間のある歴史的な室内と、同じ要素を持つ現代の和室。共通点を観察。 | 192700 |
| soc6_muromachi_sengoku_004.webp | social_g6_muromachi_sengoku_012<br>social_g6_muromachi_sengoku_020 | 茶器と花を用意した客を迎える室内。配置と道具を観察。 | 179084 |
| soc6_muromachi_sengoku_005.webp | social_g6_muromachi_sengoku_013 | 領地の川・堤防・近くの田畑。水と土地の位置関係を観察。 | 198200 |
| soc6_muromachi_sengoku_006.webp | social_g6_muromachi_sengoku_015<br>social_g6_muromachi_sengoku_023 | 田畑を測る小さな後ろ姿と、集められた武器を同じ大きさの二場面にする。 | 184816 |
| soc6_muromachi_sengoku_007.webp | social_g6_muromachi_sengoku_017<br>social_g6_muromachi_sengoku_027 | 帆船の停泊する港で、品物を確認し会話する人々。交流の入口を想像する。 | 191058 |
| soc6_muromachi_sengoku_008.webp | social_g6_muromachi_sengoku_018 | 大きな城と周囲の町の遠景。城の規模と目立ち方を観察する。 | 193630 |
| soc6_muromachi_sengoku_009.webp | social_g6_muromachi_sengoku_028 | 未使用の火縄銃の道具一式と、整理前の資材。武器を用意する状況を考える。 | 193466 |
| soc6_edo_001.webp | social_g6_edo_003<br>social_g6_edo_021 | 店先で品物を扱う商人と、収穫米を束ねる農民を同じ大きさに並べる。仕事の場面の比較。 | 199686 |
| soc6_edo_002.webp | social_g6_edo_004<br>social_g6_edo_024 | 子どもが机で無地の帳面とそろばんを使う教室。学習と実生活の関係を考える。 | 185910 |
| soc6_edo_003.webp | social_g6_edo_009<br>social_g6_edo_010<br>social_g6_edo_022 | 街道、宿、荷を置く場所、旅の一行。移動に伴う必要を考える資料。 | 199050 |
| soc6_edo_004.webp | social_g6_edo_011<br>social_g6_edo_020<br>social_g6_edo_026 | 米俵などの荷物が並ぶ港と倉。品物が集まる場面を観察する。 | 182308 |
| soc6_edo_005.webp | social_g6_edo_006<br>social_g6_edo_023 | 木版、刷り紙、色を載せる道具を横並びにする。版画の材料を観察する。 | 184966 |
| soc6_edo_006.webp | social_g6_edo_014<br>social_g6_edo_015<br>social_g6_edo_027 | 書物を見比べる机と、人体のごく簡単な輪郭の図。書物の対象の違いを考える。 | 179032 |
| soc6_edo_007.webp | social_g6_edo_017<br>social_g6_edo_028 | 道の上で測量道具を扱う小さな後ろ姿。景色を描くこととの違いを考える。 | 198026 |
| soc6_edo_008.webp | social_g6_edo_019 | 農民が無地の紙を持って集まる静かな場面。集団で訴える状況を具体化。 | 181790 |

## 地図の修正

- 対象：social_g6_kamakura_012。海岸線・点の位置を保持し、点の上側に京都・鎌倉を配置。初回の追加文字は390px画面で小さかったため再拡大。文字と点・海岸線の間隔を目視確認。altは「上が北の地図。京都と鎌倉の位置に点がある。」に変更。
- 資料：第2回のNatural Earth参照地図・既存画像（出典は第2回記録参照）、利用者の今回の文字追加指示。新しい地理情報は加えていない。
- 初回プロンプト：
```text
Edit this exact textbook map by adding ONLY TWO Japanese place labels, preserving all coastlines, lake shapes, dots, colors and composition exactly. Label the LEFT dot 「京都」 and RIGHT dot 「鎌倉」. Use large clean bold dark Japanese print type, each kanji at least 7% of image HEIGHT so legible when map is displayed at330px wide. Put 京都 in open land immediately ABOVE-LEFT of the left dot (not on Lake Biwa, not touching dot or coastline), and 鎌倉 in open land immediately ABOVE-LEFT of right dot (not touching Tokyo/Sagami coastlines or dot). About15px breathing space from labels to dots at1200px size. No connecting arrows or new symbols. Correct exact characters 京都 and 鎌倉. No other text. Keep3:2 landscape.
```
- 拡大修正プロンプト：
```text
Edit only typography on this exact map. Preserve original coastlines, lakes, point positions, colors, scale and framing precisely. Existing 京都 and 鎌倉 text is too small. Replace BOTH labels with bold clean Japanese labels 1.65 TIMES current height and width (each character around 60 pixels high in1200x800). Place 京都 immediately ABOVE-LEFT of left dot, moved slightly left to avoid touching Lake Biwa. Place 鎌倉 ABOVE-LEFT of right dot, moved upward to open land so label never overlaps coastline. Maintain clear breathing room around point and shoreline. Exact text 京都 and 鎌倉 only, no other words, arrows, symbols or decorations. Labels must remain readable on330px displayed map.
```

### 第3回：soc6_muromachi_sengoku_001.webp

- 対象問題：social_g6_muromachi_sengoku_003
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. On a low wooden work surface in Muromachi Japan, a small loose sheet showing an ORIGINAL modest monochrome ink landscape of mountains and winding river, washes ranging from pale gray to black, a brush and inkstone nearby. Do not copy any Sesshu artwork or famous composition. No signature, seal, poem or calligraphy. No person. Observational study of paper, ink tones and tools.
```

### 第3回：soc6_muromachi_sengoku_002.webp

- 対象問題：social_g6_muromachi_sengoku_007, social_g6_muromachi_sengoku_022
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Bird's-eye view of a late16th-century Japanese castle and surrounding castle town, modest timber plaster watchtowers with dark tiled roofs above rough stone base, streets below lined with wooden tile/shingle roof shops and workshops. A few tiny anonymous rear-view merchants handling fabric/baskets and woodworkers working at a bench, both equally prominent. No signage, clan emblems or flags, no army, no destruction, no outcome arrows. Not19th-century city or elaborate modern tourist reconstruction.
```

### 第3回：soc6_muromachi_sengoku_003.webp

- 対象問題：social_g6_muromachi_sengoku_011, social_g6_muromachi_sengoku_021
- 確認した資料・条件：京都市「寝殿造から書院造へ」の説明（https://www2.city.kyoto.lg.jp/somu/rekishi/fm/nenpyou/htmlsheet/bunka06.html）、福井市立郷土歴史博物館の調べ学習ページ（https://history-museum.city.fukui.lg.jp/gakko/for_students/medieval/shoin.html）。畳・床の間・障子・棚という要素と現代へのつながりを確認。特定建物の復元ではない。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Two equally sized separated interior vignettes with NO labels. Left: late Muromachi shoin-style room, plain timber posts, tatami mat floor, modest recessed alcove with empty vase and completely blank hanging scroll, built-in low desk beside paper-screen window, simple staggered shelves. Not a lavish Edo palace or exact reproduction of Ginkakuji. Right: a present-day plain Japanese-style room with tatami and modest alcove, same features clearly visible but different viewpoint. The right panel deliberately compares a modern room, with no electronics or modern gadgets needed. No person, no highlighted links, no arrows or names.
```

### 第3回：soc6_muromachi_sengoku_004.webp

- 対象問題：social_g6_muromachi_sengoku_012, social_g6_muromachi_sengoku_020
- 確認した資料・条件：書院造の説明（https://kotobank.jp/word/書院造り-291732）と対象設問・計画の茶器／花の条件。茶室の床の間は形式に幅があることを確認。特定の茶室・茶人の再現ではない。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Late Muromachi to Momoyama modest tea-room interior prepared to receive a guest: low doorway, simple timber and paper screens, tatami, an unadorned ceramic tea bowl, small lidded tea container, bamboo whisk and scoop, kettle near hearth, modest flower arrangement with a single natural branch in plain vase. No guest face, no host portrait, no calligraphy or visible writing. No modern tea set, handles or cups. Calm prepared room, no outcome or emotional result.
```

### 第3回：soc6_muromachi_sengoku_005.webp

- 対象問題：social_g6_muromachi_sengoku_013
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Sengoku16th-century countryside landscape: river bends beside rice fields, broad gently sloping EARTHEN embankment separating river and plots, some stones and vegetation but no concrete. Clear spatial relation of river, embankment and cultivation. Tiny thatched farm buildings in distance. Normal water level, no flood disaster or before/after good harvest, no ruler or name, no modern machinery.
```

### 第3回：soc6_muromachi_sengoku_006.webp

- 対象問題：social_g6_muromachi_sengoku_015, social_g6_muromachi_sengoku_023
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Two equal separate vignettes from late16th-century Japan, no labels A/B or any text. Left: two tiny rear-view survey workers in plain period robes measure a field with a straight wooden measuring rod and cord, blank rolled record sheet at side, no measurements or numbers. Right: a few collected sheathed swords and polearms lying quietly on a wooden support in simple storehouse, no person seizing them, no raised weapons or threat. No completed tax calculation, no ownership colors or causal arrows.
```

### 第3回：soc6_muromachi_sengoku_007.webp

- 対象問題：social_g6_muromachi_sengoku_017, social_g6_muromachi_sengoku_027
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Late16th-century Japanese trading harbor, wooden cargo ship with European ocean-going sailing rig at anchor in distance, furled square sails, NO crosses, flags or writing. On shore small anonymous rear-view visitors in period Portuguese doublet/cape and Japanese merchants in kosode quietly discuss plain bundled cargo, fabric and ceramic vessels equally visible. No missionaries with religious symbols, no rifles emphasized, no modern dock/crane, no forced exchange, no outcome.
```

### 第3回：soc6_muromachi_sengoku_008.webp

- 対象問題：social_g6_muromachi_sengoku_018
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Distant wide view of a large late16th-century Japanese castle on rough stone base, timber and plaster multiple tiers with tiled roofs above a surrounding town of simple timber houses. Neutral daylight, no dramatic heroic rays, no victory flags, no army, no battle. Main visual cue is castle size relative to town. Original plausible design not exact modern Himeji/Osaka reconstruction, no modern buildings, power wires, tourist signs or names.
```

### 第3回：soc6_muromachi_sengoku_009.webp

- 対象問題：social_g6_muromachi_sengoku_028
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Quiet museum-like still life of an UNUSED Japanese16th-century matchlock musket laid horizontally on a plain wood rack, long iron barrel and traditional short curved wooden stock, unlit match cord coiled separately, simple closed powder flask and a few plain material bundles nearby. No loaded or firing weapon, no person aiming it, no functional assembly directions, no exploded diagram, no amount/count/price labels. Main cue is historical objects and supplies, not combat or demonstrated effectiveness. No percussion cap, bolt action, modern gun or cartridge.
```

### 第3回：soc6_edo_001.webp

- 対象問題：social_g6_edo_003, social_g6_edo_021
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Two equally sized scenes in Edo Japan: left a wooden town shop with cloth goods, pottery and a modest craftsman's workbench; rear-view merchant arranging goods. Right a rear-view farm worker tying harvested rice bundles beside rice stacks, not handing anything to an official. No labels, arrows, A/B, tax delivery, outcomes. Straw sandals, plain kosode, wood and thatch.
```

### 第3回：soc6_edo_002.webp

- 対象問題：social_g6_edo_004, social_g6_edo_024
- 確認した資料・条件：江戸東京博物館友の会会報119号の寺子屋・手習いの説明（https://www.edo-tomo.jp/edotomo/r03%282021%29/edotomo-No119.pdf）、天神机の説明（https://bs.tbs.co.jp/edo/ooedo/backnumber/05.html）。水巻町歴史資料館「そろばん」（https://www.town.mizumaki.lg.jp/museum/040/020/050/570/1289.html）で上2珠・下5珠の構造を確認。生成では珠数が安定しないため、そろばんを省き筆と帳面の手習いに変更した。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Edo-period children's learning room, rear view only of three children in plain kosode kneeling at individual LOW wooden writing desks on tatami. Entirely blank Japanese stitch-bound notebook, inkstone and brush on desk. One simple early soroban clearly visible with EXACTLY TWO beads above divider and FIVE below on every rod, all beads away from divider; wooden frame bamboo rods, never modern one-above-four-below. No teacher portrait, signs, lettering or modern school furniture.
```
- 修正プロンプト：
```text
Edit this image only to correct all abacuses to Edo-period 2:5 bead structure. Keep the children, room, desks, blank notebooks unchanged. Remove the abacuses on left and right desk (replace with plain closed blank-cover notebooks). On CENTER desk show ONE large old wooden abacus, viewed enough from above to count: exactly two beads on each rod in upper compartment, exactly FIVE beads on same rod in lower compartment, separated by a single wooden horizontal bar. Use only five rods to simplify. Every rod has 2 upper beads and 5 lower beads. No writing or digits anywhere. Do not use modern 1:4 structure.
```
- 修正プロンプト：
```text
Edit ONLY the wooden abacus on center desk: remove it completely and replace it with a small rectangular dark inkstone and a plain unmarked bamboo brush rest. Keep every other part unchanged: three children rear-view at low desks with blank bound notebooks, Edo room. No abacus anywhere, no writing, numbers or symbols. This image illustrates writing practice; do not add calculation tools.
```

### 第3回：soc6_edo_003.webp

- 対象問題：social_g6_edo_009, social_g6_edo_010, social_g6_edo_022
- 確認した資料・条件：国土交通省「宿場とはどういうところだったのでしょう？」（https://www.ktr.mlit.go.jp/yokohama/tokaido/02_tokaido/04_qa/index2/a0201.htm）。宿泊・休息、公用荷物の継送という役割を説明文で確認。特定宿場の復元ではない。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Edo-period unpaved highway entering a modest post town, low timber and plaster inns with tiled or wooden roofs, blank awnings, tied bundles and packhorse at a resting place. Small rear-view travelers and a distant dignified traveling party with one closed palanquin, no insignia, swords sheathed, no coercion or military action. Show road, lodging and cargo storage clearly with no conclusions or signs.
```

### 第3回：soc6_edo_004.webp

- 対象問題：social_g6_edo_011, social_g6_edo_020, social_g6_edo_026
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Edo-period calm Japanese trading port with low timber warehouses and plaster fireproof storehouse, rice straw bales and cloth-wrapped cargo on wooden quay, traditional Japanese wooden cargo sailboats with single large furled sail, tiny rear-view porters. No named port, maps, flags, numbers, labels, arrows or import/export direction. No steamship, cranes, electric equipment or brick factories.
```

### 第3回：soc6_edo_005.webp

- 対象問題：social_g6_edo_006, social_g6_edo_023
- 確認した資料・条件：アダチ版画研究所の道具・技法の説明（https://store.adachi-hanga.com/pages/quality 、https://store.adachi-hanga.com/pages/craftmanship）、武蔵野美術大学「バレン」（https://zokeifile.musabi.ac.jp/バレン/）。版木・和紙・刷毛・竹皮で包んだばれんを確認。初稿のかご状のばれんを描き直し、刷り紙は未使用の無地にして反転関係の誤表現を除いた。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Edo woodblock printing materials on low wood workbench, close view: a wood block with shallow original simple landscape carving, ONE unfinished print on washi (no famous artwork), small pigment dishes, horsehair wooden-handled brush, round bamboo-sheath baren with twisted handle. Objects side by side, no arrows or sequence numbers, no piles of identical completed prints, no title, characters or writing. No metal roller, synthetic paint or modern tools.
```
- 修正プロンプト：
```text
Correct this Edo woodblock-printing illustration. Keep artisan hands, inked carved wood block, pigment bowls and period room. Make the single paper sheet at lower left completely blank, with NO printed landscape (it is unused paper). Replace the basket-like tool lower right with an authentic flat round baren: very thin circular disk fully wrapped in smooth overlapped bamboo sheath, the two twisted ends joined into one low handle on top. NOT a woven basket, no radial ribs or raised rim. No text or modern tools.
```

### 第3回：soc6_edo_006.webp

- 対象問題：social_g6_edo_014, social_g6_edo_015, social_g6_edo_027
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Edo study desk viewed from above at slight angle, a few open and closed Japanese thread-bound books with blank pages, one page with very simple non-detailed human silhouette outline only, brush and inkstone, anonymous rear-view scholar small at far edge comparing pages. Books neutral plain covers, no writing, foreign script, title, organ details, body specimen, modern medical equipment or recognizable scholar.
```

### 第3回：soc6_edo_007.webp

- 対象問題：social_g6_edo_017, social_g6_edo_028
- 確認した資料・条件：千葉県公式観光サイト・伊能忠敬記念館学芸員への取材記事（https://maruchiba.jp/feature/detail_286.html）の導線法の説明で、梵天を目印に間縄／鉄鎖で距離を測ることを確認。福島町教育委員会「福島町と伊能忠敬全国測量」（https://www.town.fukushima.hokkaido.jp/kyouiku/福島町の文化財/福島町と伊能忠敬全国測量/）で梵天を竹の棒と説明。台東区の国立科学博物館探訪（https://www.culture.city.taito.lg.jp/bunkatanbou/culture/kahaku/japanese/page_05.html）で間縄等の距離測定と光学器械を使わない点を確認。資料の説明文に基づく単純な縄・杭・竹の目印だけを採用し、彎窠羅鍼等の精密な形を未確認のまま描かない。伊能隊の特定日の実景・測量器の実測図ではない。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Edo early19th-century land survey on country road, based on documented simple tools: two small anonymous rear-view workers in plain kosode/hakama/straw sandals stretch a natural-fiber measuring cord STRAIGHT between two short wooden stakes along the road. A simple tall thin bamboo marker pole at far endpoint, with small plain white cloth tuft, no characters. Cord is taut near ground, knots visible but no numeric measurements. Blank paper notebook near worker. No telescope, no optical instrument, no modern tripod/theodolite, no completed map, no named or recognizable Ino Tadataka face. Calm coastline in far background, focus on measuring distance with cord and stakes.
```

### 第3回：soc6_edo_008.webp

- 対象問題：social_g6_edo_019
- 確認した資料・条件：対象設問の問題文・選択肢・解説、PICTURE_PLAN_SOCIAL6.mdの対応行を照合。特定人物・建物・実物資料の精密復元ではなく、設問の既知の場面を再構成した教育用イラスト。
- 採用時の確認：文字・正解名・実在人物の顔・戦闘／負傷描写を入れない。建物・道具の表現を問題と照合。
- 使用プロンプト：
```text
Create ONE original Japanese grade6 history educational illustration, landscape3:2 intended1200x800. Warm restrained watercolor and clear fine ink outlines, large readable objects at smartphone size, light simple surroundings. No text, kanji, letters, numbers, signatures, seals, logos, labels, pseudo-writing, arrows, diagram captions anywhere. Papers/books/flags/signboards entirely blank or omit them. All people anonymous, small or strictly rear views or only hands, no real historical person's face. Calm observational scene; no combat, blood, injuries, victory, outcomes or moral conclusion. Period-appropriate Japanese materials/clothing only; no electricity, cars, railways, modern machines, modern school furniture or modern weapons. Edo-period farmers gathering quietly beside a rural wooden meeting house, five anonymous adults in plain work kosode, straw sandals, rear views only. One holds a blank folded sheet at waist height while others stand calmly together. No raised fists, placards, weapons, violence, crying, officials granting requests, victory or outcome, no text. Modest rural thatched buildings and fields, not a modern demonstration.
```

## 第3回の検査

- tests/fixtures/social6-images-3.jsonに17枚・32問の対応を追加。course-social6.jsの対象を6単元・54枚・93問へ更新。既存のWebP実体／サイズ／寸法／alt・caption／正解文字列検査を全画像問題へ適用。
- node tests/run.js：908件成功・0件失敗（地名の最終拡大後にも再実行）。
- 390px幅で新規32問と地図1問を実際の問題画面に表示して画像読み込みを確認。各原画と代表画面を目視確認。地図は文字拡大後にも再撮影。室内比較の撮影1件は描画待ちが短く画像が写らなかったため、待機時間を延ばして該当2問を再撮影し、正常表示を確認した。
- そろばんは上2珠・下5珠の安定した表現が得られず、誤った構造を載せることを避け、手習いの筆と帳面へ構図を変更。ばれんの初稿も修正済み。
- 測量は縄・杭・竹の目印の範囲で採用。特定測量器の精密な形、特定の城・港の復元精度を保証する図ではない。問題の答え・制度の結論は描き加えていない。

# 第4回 画像制作記録（2026-11-03）

ブランチ：`codex/social6-questions`。既存1枚の修正、明治8枚・近現代8枚の新規16枚（21問）。累計70枚・114問。憲法以降は未制作。

全17枚を画像生成ツールで制作・編集し、原画を目視確認した。Pillowは1200×800への縮小とWebP変換のみに使用。全て200,000バイト以下。場面内に文字を入れず、modern_007だけ問題文にあるA・Bを表示。設問の本文・選択肢・正解・ID・難易度・reviewedは変更しない。以下の資料確認は説明文・検索抜粋によるもので、取得できなかった実物写真を見たとは扱わない。

|ファイル|対象問題|バイト数|
|---|---|---:|
|soc6_muromachi_sengoku_009.webp|social_g6_muromachi_sengoku_028|180950|
|soc6_meiji_001.webp|social_g6_meiji_004, social_g6_meiji_022, social_g6_meiji_027|199724|
|soc6_meiji_002.webp|social_g6_meiji_005, social_g6_meiji_009|179224|
|soc6_meiji_003.webp|social_g6_meiji_016|192178|
|soc6_meiji_004.webp|social_g6_meiji_017|199098|
|soc6_meiji_005.webp|social_g6_meiji_023|187212|
|soc6_meiji_006.webp|social_g6_meiji_024|181234|
|soc6_meiji_007.webp|social_g6_meiji_025|180864|
|soc6_meiji_008.webp|social_g6_meiji_028|194478|
|soc6_modern_002.webp|social_g6_modern_004, social_g6_modern_014|181600|
|soc6_modern_003.webp|social_g6_modern_012|197258|
|soc6_modern_004.webp|social_g6_modern_015|182034|
|soc6_modern_005.webp|social_g6_modern_019, social_g6_modern_025|184410|
|soc6_modern_006.webp|social_g6_modern_022|182186|
|soc6_modern_007.webp|social_g6_modern_023|189880|
|soc6_modern_008.webp|social_g6_modern_026|175642|
|soc6_modern_009.webp|social_g6_modern_027|198050|

### 第4回：soc6_muromachi_sengoku_009.webp

- 対象問題：social_g6_muromachi_sengoku_028
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：新城市設楽原歴史資料館「種子島銃」https://www.city.shinshiro.lg.jp/mokuteki/shisetu/shiryokan/shitaragahara/tanegashima.html の説明文。写真本体へのアクセスは403で取得できず、形の目視照合はできなかった。旧画像の床尾・用心金・撃鉄の誤りを直すため、利用者指定の代案に従い銃本体と台を除去。道具と荷物だけにした。
- 使用プロンプト：
```text
Edit this exact watercolor educational historical illustration. REMOVE the entire gun/rifle completely, including its barrel, stock, lock and trigger. REMOVE its empty wooden display rack as well. Keep the unlit coiled match cord at lower left, closed dark powder flask, tied cloth ball pouch, folded dark cloth parcel and straw-wrapped cargo at right in the same basic arrangement. Recompose slightly to fill the vacated tabletop naturally, with plain empty wood behind these objects; no gun or weapon anywhere. Preserve the period timber room and distant Japanese castle, no people, no combat, no smoke, no loose gunpowder or ammunition, no instructions, numbers, text, logos or labels. Warm clear watercolor and ink, landscape3:2. Only accessories and packed supplies.
```

### 第4回：soc6_meiji_001.webp

- 対象問題：social_g6_meiji_004, social_g6_meiji_022, social_g6_meiji_027
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Early Meiji Japanese rural life: three separate equally important vignettes of rice field with tiny rear-view farmer in plain work kimono, harvested straw rice bundles with sacks, and modest rice-selling shop with a blank ledger and closed coin pouch. No actual currency markings/numbers, tax collector, money transfer arrow, before-after harvest comparison, hardship expression. Timber and thatch farm buildings, unpaved ground, no machines.
```

### 第4回：soc6_meiji_002.webp

- 対象問題：social_g6_meiji_005, social_g6_meiji_009
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：農林水産省「明治150年・製糸」https://www.maff.go.jp/j/meiji150/you/03.html の説明（鉄製本体、真ちゅうの台、銅製の釜）、岡谷蚕糸博物館 https://silkfact.jp/blog/フランス式繰糸機の実演/ （1872年輸入のフランス式）、富岡製糸場公式 https://www.tomioka-silk.jp/_tomioka-silk-mill/point/ （木骨れんが造・繰糸場）の説明文を参照。特定の機械の写真の細部を目視確認したものではない。
- 作り直し理由：初稿の大きな糸巻き・回転機構の形に確信が持てず、確認した釜・台・細い糸を中心にし、上部の機構は画面外へ省いた。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Early Meiji1870s mechanized silk-reeling workshop, not weaving loom. Show a SHORT section with TWO copper reeling basins on a brass horizontal table supported by iron frame, fine silk threads rising via simple guides toward overhead wooden winding reels, modest belt-driven shaft in background. Basket of white silkworm cocoons and neatly wound off-white raw silk hank in foreground. Architecture: tall timber trusses, brick infill walls, repeated high windows, no company sign or identifiable building front. Tiny rear-view workers in plain kimono and hakama, sleeves tied back, not modern uniforms. Based on early French reeling machine materials: iron body, brass table,copper pans. No automated1950s machines, no giant textile looms, no electronic controls, no text or numbers, no exact factory reconstruction claim.
```
- 修正プロンプト：
```text
Revise this early Meiji silk REELING illustration to avoid imaginary oversized textile machinery. Keep foreground basket of cocoons and raw silk hank, timber-truss brick workshop and anonymous rear-view women in kimono. Remove the enormous overhead cylindrical spools and giant flywheel completely. Show a close view of the TWO small copper cocoon basins on the brass reeling table and simple iron supports only; fine threads gather from several cocoons into just TWO thin strands per basin through small guides and lead out of frame upward. Upper part of winding mechanism is cropped out, not invented. No fan of parallel weaving threads, no fabric sheet, no huge wheels, no modern controls, no labels, text, numbers or recognizable faces. Educational observed materials scene rather than complete technical reconstruction.
```

### 第4回：soc6_meiji_003.webp

- 対象問題：social_g6_meiji_016
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Two separate equal vignettes of early Meiji Japan: one modest wooden primary school classroom, plain timber double desks and benches, blank small slates/notebooks, tiny rear-view children in simple kimono; no sailor uniform or modern schoolbag. Other vignette rural family tending field beside thatched house, tiny rear-view figures. No attendance outcome, empty desks emphasis, money amounts, crying, judgment or arrows.
```

### 第4回：soc6_meiji_004.webp

- 対象問題：social_g6_meiji_017
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：広島市交通科学館の資料 https://www.vehicle.city.hiroshima.jp/hyperbook_web/model/detail?id=31571 の1871年製小型タンク式機関車の説明と、コトバンク「一号機関車」https://kotobank.jp/word/一号機関車-3143129 の1Bタンク式という説明を参照。後代の大型機関車や炭水車は描かない。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Two equal separate scenes of early Meiji transport before departure: left a small1870s British-style Japanese steam TANK locomotive standing by a low timber platform, short boiler, tall plain chimney, side water tanks, one small leading wheel and TWO larger coupled driving wheels visible on side, small open cab, NO separate tender, no giant twentieth-century engine, no headlight modern shape, no numbers or railway logos. Right a wooden postal sorting counter with plain blank envelopes and cloth mailbags, tiny rear-view clerk in plain dark Meiji tunic. No postal mark, text, delivery arrows or destination outcomes.
```

### 第4回：soc6_meiji_005.webp

- 対象問題：social_g6_meiji_023
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：農林水産省「明治150年・製糸」https://www.maff.go.jp/j/meiji150/you/03.html の説明（鉄製本体、真ちゅうの台、銅製の釜）、岡谷蚕糸博物館 https://silkfact.jp/blog/フランス式繰糸機の実演/ （1872年輸入のフランス式）、富岡製糸場公式 https://www.tomioka-silk.jp/_tomioka-silk-mill/point/ （木骨れんが造・繰糸場）の説明文を参照。特定の機械の写真の細部を目視確認したものではない。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Meiji Japan factory and distant port as two separate large vignettes without connecting route: left timber/brick workshop warehouse with wrapped raw silk hanks and cloth parcels stacked awaiting shipment; right a distant nineteenth-century harbor with wooden ships and modest brick/timber warehouses. In between leave pale neutral gap, no railway or arrows or roadway solving transport question, no production totals, no export result. Small anonymous rear-view workers in period work kimono.
```

### 第4回：soc6_meiji_006.webp

- 対象問題：social_g6_meiji_024
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：国立国会図書館 https://www.ndl.go.jp/landmarks/column/national_diet_building と参議院 https://www.sangiin.go.jp/japanese/70/70-1.html の仮議事堂の説明文（木造）を参照。現在の国会議事堂の外観は使わない。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Late Meiji1890s two separate vignettes: left interior of a modest wood-built Western-style parliamentary debating chamber with tiers of dark wood desks and central lectern, viewed from rear so all people are tiny backs in plain dark frock coats; no microphones, modern concrete National Diet building, flags or insignia. Right a few anonymous rear-view adults in mixed plain kimono/hakama and dark period suits walking toward a low timber civic hall entrance, no voter lists, exclusion barriers, counts, vote results or eligibility labels. Do not make a before/after or victory scene.
```

### 第4回：soc6_meiji_007.webp

- 対象問題：social_g6_meiji_025
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：博物館明治村「宮津裁判所法廷」https://www.meijimura.com/sight/宮津裁判所法廷/ の木造・和洋折衷の説明文を参照。特定法廷の精密復元ではなく、木の机・いすを使った場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Meiji1890s two equal observational vignettes: left an unoccupied wood-built Japanese-Western courtroom, high wood bench, simple desks and railing, plain white walls, tall windows, NO gavel, wig, scales, national flags or modern microphone. Right a wooden harbor cargo-inspection counter with closed crates and cloth bales, rear-view workers in Meiji work clothes examining blank papers. No customs percentage, country ownership, legal sovereignty arrows, handcuffs or accused person.
```

### 第4回：soc6_meiji_008.webp

- 対象問題：social_g6_meiji_028
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：農林水産省「明治150年・製糸」https://www.maff.go.jp/j/meiji150/you/03.html の説明（鉄製本体、真ちゅうの台、銅製の釜）、岡谷蚕糸博物館 https://silkfact.jp/blog/フランス式繰糸機の実演/ （1872年輸入のフランス式）、富岡製糸場公式 https://www.tomioka-silk.jp/_tomioka-silk-mill/point/ （木骨れんが造・繰糸場）の説明文を参照。特定の機械の写真の細部を目視確認したものではない。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Meiji-era harbor quay with TWO equally prominent groups of goods, no arrows: bundles of ivory raw silk hanks wrapped in plain cloth at left, a nineteenth-century cast-iron belt-driven workshop machine with exposed large flywheel and plain wooden shipping crate at right. Industrial machine is partly crated so only simple verified cast-iron frame, flywheel and belt pulley visible, no precision invented controls. Background small wooden merchant steamship/sailship and timber warehouse. No country flags, export/import labels, money, modern crane or containers.
```

### 第4回：soc6_modern_002.webp

- 対象問題：social_g6_modern_004, social_g6_modern_014
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 作り直し理由：初稿では家の場面にも子どもがおり、移動後の到着と読み違えやすいため、下の場面を家にいる大人一人に変更した。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Japan1944 civilian evacuation, two quiet separated vignettes: small rear-view children in plain cotton shirts and short trousers or simple monpe, carrying small cloth bundles, walking away from distant low urban houses toward rural lodging with rear-view adult guide; other vignette a simple home interior with low table, folded bedding and rear-view adult. No arrows, written destination, military clothing, weapons, destroyed city, aircraft, bombs, smoke, tears, expressions or joyful reunion. Do not show outcomes or deprivation. No modern backpack.
```
- 修正プロンプト：
```text
Edit only LOWER panel of this history illustration. Upper panel with children traveling and adult guide stays unchanged. Lower panel must be a DIFFERENT family home, not arrival of the same group: remove ALL children in lower panel. Keep ONE anonymous adult rear-view quietly seated at low table with blank paper, plain domestic room and folded bedding. No crying, distress, dramatic loneliness, happy reunion, gestures or expressions, only ordinary calm home interior. This separates children away from home and family home, no connecting arrows, labels, text, military objects, injury or numbers. Keep3:2.
```

### 第4回：soc6_modern_003.webp

- 対象問題：social_g6_modern_012
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Okinawan village around1945 shown as calm distant landscape only: low wooden houses with Okinawan red-tile hip roofs held by pale mortar, some thatched cottages, low limestone boundary walls, fields and vegetation, a small natural limestone cave entrance set near the settlement. No military structures, soldiers, weapons, flags, explosions, smoke, rubble with casualties or suffering. No modern concrete apartment houses or Okinawan tourist castle. Just civilian living spaces and nearby possible shelter, no labels or arrows.
```

### 第4回：soc6_modern_004.webp

- 対象問題：social_g6_modern_015
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Japanese town shortly after1945, quiet far-distance view of an empty road through sparsely standing low timber structures, some damaged roof beams and cleared brick/wood fragments, small intact area with bundled household bedding, bucket and plain pots. Tiny anonymous rear-view civilians only far away, calm neutral posture. No smoke, flames, ongoing attack, weapons, planes, corpses, wounds, sad faces, radiation imagery. Do not show completed recovery, abundant relief goods or step-by-step rebuilding instructions.
```

### 第4回：soc6_modern_005.webp

- 対象問題：social_g6_modern_019, social_g6_modern_025
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Japan during1950s-1960s industrial growth, medium-distance river landscape with a modest factory compound of low sawtooth-roof buildings, a few plain tall chimneys, nearby low timber residential houses and riverbank. River subdued ordinary blue-gray, NOT black toxic sludge, no bright green liquid, dead fish, sick people, exaggerated smoke, causal arrows, outfall highlighting or solution machinery. Show proximity of workplace, river and homes neutrally. No modern cars, pylons or plastic.
```

### 第4回：soc6_modern_006.webp

- 対象問題：social_g6_modern_022
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Japanese wartime civilian household1940s, two related quiet areas: small vegetable plot beside simple timber house and a low table with a modest cloth-wrapped food parcel and bowl. One tiny rear-view adult in plain monpe tending plants. No comparisons of people missing, no soldier, ration coupon text, numbers, distress, empty starving plates, military flag, weapon or bomb. No dramatization or outcome; simple observational household materials.
```

### 第4回：soc6_modern_007.webp

- 対象問題：social_g6_modern_023
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Two equal panels for a Japanese history textbook, only labels A and B allowed. Large clean bold dark letter A in top-left of LEFT panel, B in top-left of RIGHT panel, each at least7percent of full image height. LEFT: distant civilian town reconstruction after1945 with timber house frames and small rear-view workers, no flames, rubble casualties, heavy modern cranes or completed prosperity. RIGHT: quiet1950s community health consultation room with low plain wooden desk, anonymous rear-view adult visitor and rear-view doctor in white coat looking at BLANK papers, no instruments touching body, no illness, pain or medical injury imagery. Both calm neutral. No other letters, numbers, crosses, labels, charts, radiation symbols, military objects, arrows linking panels or recovery-complete marks.
```

### 第4回：soc6_modern_008.webp

- 対象問題：social_g6_modern_026
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：群馬県立歴史博物館「電気洗濯機」https://jmapps.ne.jp/grekisi_ed/det.html?data_id=5371 、北海道博物館 https://www.hm.pref.hokkaido.lg.jp/exhibition/permanent/theme-04/ 、科学技術館 https://www2.jsf.or.jp/industry50/mamechishiki/mamechishiki07-1.html 、杉並区立郷土博物館所蔵品紹介 https://suginamigaku.org/2014/10/tool-sentakuki.html の説明文を参照。一槽式・上下二本のローラー・手回しハンドルによる絞りを確認。写真の画素を取得して形を目視照合したとは扱わない。メーカー固有の製品の精密復元ではなく、確認できた構成で描いた。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Two equal prominent objects side by side on plain uncluttered Japanese domestic floor: LEFT a wooden wash tub and wooden washboard with small folded cotton cloth. RIGHT a1955-era Japanese electric single-tub wringer washing machine based on museum descriptions: cream enamel upright rounded-rectangle metal cabinet on short feet, OPEN top showing ONE wash tub, no hinged top lid and no second spin tub. Along one SIDE upper edge is an external metal U-shaped frame holding exactly TWO horizontal rubber rollers stacked vertically, with a hand crank projecting sideways from roller axle. Rollers are ABOVE and beside tub opening, not a lid; hand crank clear. Very plain period rotary control knob with NO numbers, brand or text. No modern plastic console, digital display, full automatic machine, front-loading door or modern appliance. No people, clocks, speed arrows, labels or claims of saved time. Emphasize shapes of manual tub and early machine.
```

### 第4回：soc6_modern_009.webp

- 対象問題：social_g6_modern_027
- 確認：対象設問の問題文・選択肢・解説と、画像計画の対応行を照合。特定人物の顔、戦闘・負傷・苦痛、正解を示す結論や文字は描かない。
- 資料：対象設問と画像計画の場面指定。特定の実物・日時・人物を復元する資料画ではなく、衣服・建物・生活道具を簡略化した教育用の場面。
- 使用プロンプト：
```text
Create ONE original educational history illustration for Japanese grade6. Landscape3:2, intended1200x800. Warm restrained watercolor, clear fine ink outlines, readable large shapes at smartphone width, simple uncluttered backgrounds. No text, letters, numbers, labels, logos, signatures, pseudo-writing, signs, flags or captions anywhere unless explicitly allowed below. Books/papers/envelopes totally blank. Anonymous people ONLY small rear views, no recognizable real person's face, no frontal faces. Calm observational everyday scene, no dramatic emotions or implied outcome. No combat, weapons, military flags, bombs, bombers, mushroom clouds, injury, dead people, suffering or distressed expressions. No modern cars, concrete utility poles, plastic products, neon, screens or contemporary machinery. Correct Japanese period clothing and architecture; no fantasy or stereotypes. Contemporary rural Japan as a simple educational setting, but no cars or modern utility poles: modest empty roadside bus-stop shelter with a completely blank round sign, two tiny rear-view older adults in simple neutral coats (no stereotype posture), a distant small plain clinic building across fields. No bus timetable text, hospital name, logos, medical cross, service bus, route arrows, count percentages or solutions. Calm daytime, no distress; show distance between waiting place and clinic.
```

## 第4回の検証

- `node tests/run.js`：成功908、失敗0。画像の実在、WebP実体、1200×800、200,000バイト以下、alt/captionの非空と正解の混入、fixtureとの対応を検査。
- 336問のdiagram以外のデータが作業前と一致することを確認。
- 写真未照合の火縄銃本体は除去。建築・工場機械・洗濯機は説明文で確認した範囲の再構成であり、個別の実物の精密復元ではない。
- 390px幅の実際の問題画面で対象22問を撮影し、画像の読み込みを確認。火縄の道具、製糸工場、鉄道、A/Bの比較図、ローラー付き洗濯機の代表画面を目視確認した。
