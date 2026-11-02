# 小6社会 画像制作記録

第1回の履歴と、第2回の変更・保留事項を記録する。古墳の保留は利用者提供写真との照合で解消済み。現状は末尾の追補を参照。

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
