# 小4社会・手作り問題70問の図（第8・9弾）

2026-10-05。main `243bc7e78c65ff23099c6617ed7184e19d8ba2b3` から `codex/hand-diagrams-soc4` を作成。第8弾33問＋第9弾37問、未対応0問。mainへのマージはせず、レビューを待つ。

## 変更したファイル

- `questions/social_g4_hand.js`：依頼された70問のdiagram引数だけを追加。問題文・答え・選択肢・ヒント・解説・ID・難易度・inputForm・reviewedは維持。
- `js/defs.js`、`js/svg/learning.js`：社会の共通6種類とSVG線画。
- `tests/cases/hand-diagrams-soc4.js`、`tests/ui-hand-diagrams-soc4.cjs`：入力値・問題データの保護・昼のChromium表示の検証。
- `DIAGRAM_REQUESTS_8.md`、`DIAGRAM_REQUESTS_9.md`：完了・レビュー待ち。
- `QUESTIONS_GUIDE.md`、`DECISIONS.md`、`CLAUDE.md`、この報告：種類・判断253・検証結果。

## 新しい共通の図

全種類にcaptionを必須とし、study: trueで昼の既存のCSS色と自然な縦横比を使用する。IDはすべて `social_g4_hand_` に続く部分を記載。

### japanMap（18問）

必須の種類別項目：bounds・marks・areas・routes。

`prefecture_004`、`prefecture_006`、`prefecture_014`、`prefecture_016`、`prefecture_022`、`geography_005`、`geography_007`、`geography_008`、`geography_010`、`geography_011`、`geography_012`、`geography_014`、`geography_015`、`geography_019`、`geography_020`、`pioneer_010`、`industry_013`、`industry_014`。

### terrain（6問）

必須の種類別項目：scene。

`geography_006`（riverMouth）、`geography_017`（basin）、`geography_027`（fan）、`geography_028`（delta）、`pioneer_005`（levees）、`pioneer_012`（lakeTunnel）。

### facility（23問）

必須の種類別項目：scene。

`water_003`（sewer）、`water_004`（sewagePlant）、`water_007`（reservoir）、`water_009`（settling）、`water_010`（filter）、`water_013`（hydro）、`water_021`（supply）、`water_023`（hillSupply）、`garbage_001`（landfill）、`garbage_004`（truck）、`garbage_009`（incinerator）、`garbage_010`（gasFilter）、`garbage_012`（compost）、`garbage_027`（bottles）、`electric_003`（wind）、`electric_004`（solar）、`electric_005`（pylons）、`electric_006`（substation）、`electric_015`（geothermal）、`electric_021`（thermal）、`electric_028`（hydro）、`pioneer_014`（aqueduct）、`pioneer_025`（sluice）。

### disaster（8問）

必須の種類別項目：scene。

`disaster_003`（flood）、`disaster_004`（landslide）、`disaster_005`（storm）、`disaster_006`（ash）、`disaster_011`（bag）、`disaster_014`（seaWall）、`disaster_015`（sabo）、`disaster_026`（hydrant）。

### culture（7問）

必須の種類別項目：scene（任意tint）。

`tradition_001`（dollFloat）、`tradition_002`（poleFloat）、`tradition_004`（lacquer）、`tradition_007`（kettle）、`tradition_014`（castle）、`tradition_024`（houseFront）、`tradition_033`（lanternPole）。

### industry（8問）

必須の種類別項目：scene。

`industry_003`（citrus）、`industry_006`（dairy）、`industry_007`（carFactory）、`industry_012`（greenhouse）、`industry_015`（fishCage）、`industry_020`（hotBath）、`industry_025`（coastOrchard）、`industry_026`（basinOrchard）。

## 答えを表示しないための扱い

- SVGテキストは地図の方位「北」だけ。地名・県名・施設名・作物名・解答の数値を出さない。captionも答えを含まない一般的な説明にする。
- 近畿の図に愛知県の印を付けない。岡山・香川の図に橋、本州・北海道の図にトンネルを描かない。
- 港の図の印は問題文にある県の位置だけ。焼津・銚子の位置を特定する印を付けない。
- 水道・送電・発電・熱利用・水路に向きの矢印を付けない。火力発電の管の中身、持ち出す袋の中身、果樹園の気温変化は隠す。
- 第9弾の指定に従い、洪水などの災害の現状、家の屋根の形、畑の地形は描く。名前や理由は図に書かない。
- 量や縮尺を測らせる図ではない。緯度・経度は略図の位置合わせ用、各場面の反復数は線画の構成用で数値として表示しない。
- 学習のSVG要素で組み立て、ゲームにHTML文字列の挿入・外部依存・fetch・セーブ項目を足さない。saveVersionは変更なし。

## 依頼書との差・独自に判断した点

- 図を付けなかった問題、問題文等を直した問題はない。対象の70問すべてに対応。
- 第9弾の発電・送電の案 `powerPlant` は `facility` にまとめた。ダム・発電機・管・鉄塔などを共有し、専用の種類を増やさない。用途は同じ。
- 赤いうるしと茶色のびんだけは、依頼の実物の色を表すため材料色を使う。他の線・塗りは既存のblue・ink・pale・orangeの昼のCSS色。
- 略地図は必要な地域を拡大する場合がある。切り出し境界を海岸線として描かず、地方・平野の塗りは陸上に限定する。精密な地図ではない。
- mainの文書には手作り295問とあるが、読み込まれるhand_soc4は変更前から297問。全297問のdiagram以外が一致し、対象外227問はそのまま。この既存の集計差に合わせて問題データを変更していない。

## 検証結果

- 修正前：`node tests/run.js` 632件成功。
- 修正後：`node tests/run.js` 641件成功、失敗0。社会図の検証9件を追加。
- `node tests/simulate.js`：すべて目標内。
- 全297問のdiagram以外をSHA-256で固定（`359fb64f693d6761a99497b9a24a035284acfa76ba400f6452048caa2a11c2cb`）。図を追加したのは依頼書の70問だけ。
- 昼のChromium、実際の問題画面70問×360・390・768・1024px＝280表示。文字の見切れ・重なり・図の輪郭の見切れ・横はみ出し・ブラウザ例外0。SVGのgetBBox、座標変換、実表示枠を検査。文字を端・外へ移す負例8件も正しく検出。
- 既存の算数・理科23種類の代表問題×4幅＝92表示も成功（見切れ・重なり・横はみ出し・ブラウザ例外0）。既存の描画を変更していないことを確認。
- 70問の問題画面280枚と、390・1024pxの図140枚を保存。全70問の390px図を一覧画像で目視確認し、代表的な種類を390・1024pxで確認。

## スクリーンショット・確認ページ

作業ホストの `outputs/hand-diagrams-soc4/gallery.html` に、全70問の問題文・種類・4幅の画像・図だけの390/1024px画像をまとめた。答え・選択肢・解説はレビュー用に折りたたみで表示し、ゲームの図には含めない。

画像と `results.json` は `outputs/hand-diagrams-soc4/screenshots/` に保存。これらはローカルの確認用で、公開済みGitHub Pagesやmainを変更しない。リポジトリのテストで同じ画像を再生成できる。

実行例（テスト専用のPlaywright/Chromiumを使用。本体に依存を追加しない）：

```powershell
$env:FF_PLAYWRIGHT_MODULE='<Playwrightのインストール先>'
$env:FF_BROWSER_PATH='<ChromiumまたはChromeの実行ファイル>'
$env:FF_QA_OUTPUT='<スクリーンショットの保存先>'
node tests/ui-hand-diagrams-soc4.cjs
```

位置の確認に用いた資料：[国土地理院の学校向け白地図](https://maps.gsi.go.jp/help/intro/school/blankmap.html)、[国交省・信濃川](https://www.mlit.go.jp/river/toukei_chousa/kasen/jiten/nihon_kawa/0405_shinano/0405_shinano_00.html)、[国交省・利根川流域](https://www.ktr.mlit.go.jp/river/bousai/river_bousai00000009.html)、[国交省・石狩川](https://www.mlit.go.jp/river/toukei_chousa/kasen/jiten/nihon_kawa/0109_ishikari/0109_ishikari_00.html)、[京都市・琵琶湖疏水](https://www.city.kyoto.lg.jp/suido/page/0000006469.html)。
## PR #38のコメント3件への修正（判断254）

上の初回報告のうち屋根・段々畑を描く判断は撤回し、tradition_024は窓と入口だけ、industry_025は木と海だけに変更した。信濃川・利根川の線を太くし、鉄塔の背景の山を削除。地形の山は1つ、港は地図と分離、渦は日本と離す。

海岸線と湖を公開の物理地理データへ置換。島・岬を増やし、地域図の切り口の塗りをなくす。元データ・座標検証の詳細はSOCIAL_MAP_DATA.md。北海道の位置の印の中心も陸上へ直した。

修正後はnode tests/run.js 645件成功、simulate.jsすべて目標内。70問×4幅＝280画面の見切れ・横はみ出し・例外0、負例8件検出。地名集33点の位置検査、全図1枚＋地域図13枚の参照座標画像も保存。問題297問のdiagram以外は同じハッシュを維持。

更新した確認ページはローカルoutputs/hand-diagrams-soc4-review/gallery.html。全図・地域図の参照画像はgeography.html。画像は同ディレクトリのscreenshots。再生成はtests/ui-hand-diagrams-soc4.cjsとtests/ui-social-map-geography.cjs。同じPRに反映しmainへはマージしない。
