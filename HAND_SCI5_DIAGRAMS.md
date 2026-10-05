# 小5理科の手作り問題：第16弾61問のSVG図

2026-10-06。`main`（開始時aa08e03）から `codex/hand-diagrams-sci5`。作業中に更新されたmain（dd53ea8、PR #67）を取り込み、最終確認する。PRレビュー待ち、mainには未反映。

## 変更の範囲

- `questions/science_g5_hand.js`：依頼表の61問のdiagramのみ。324問のほかの項目はSHA-256で元データと一致し、inputFormを含め一切変更しない。
- `js/defs.js`：新規biology・pendulumの必須項目。
- `js/svg/learning.js`：二つの新規種類と既存apparatus・circuit・scienceScene・graphの追加部品。文字列HTMLは挿入せずSVG要素を組み立てる。
- `tests/cases/hand-diagrams-sci5.js`・`tests/ui-hand-diagrams-sci5.cjs`：検証。
- `DIAGRAM_REQUESTS_16.md`・`QUESTIONS_GUIDE.md`・`DECISIONS.md`・本書：完了記録。

画像16問（第17弾）、単元、セーブ、saveVersion、CSS、問題の本文・答え・選択肢・ヒント・解説・ID・難易度・inputForm・reviewedは変更しない。依頼61問の省略はない。

## 種類・必須項目・使用ID

IDの接頭辞はすべて `science_g5_hand_`。caption・study: trueを全図に指定する。

| 種類 | 必須項目 | 数 | 使用ID（接頭辞省略） |
|---|---|---:|---|
| **biology（新規）** | part・labels | 11 | plant_004・009、flower_001・002・003・007・023、life_011・012・013・014 |
| **pendulum（新規）** | panels | 12 | pendulum_002・003・004・016・017・018・019・028・030・034、method_025・026 |
| apparatus（小4を拡張） | panels | 15 | plant_012・019・026・027、flower_019・020、dissolve_003・006・007・008・019・023・032、method_020・029 |
| circuit（小4を拡張） | panels | 7 | electromagnet_012・013・014・016・027・030・033 |
| scienceScene（小4を拡張） | scene | 15 | weather_001・002・010・011・017・027・031、river_005・007・009・010・011・019・026・033 |
| graph（既存を拡張） | labels・values | 1 | method_030 |
| 合計 | | **61** | 植物6・花7・体4・天気7・川8・とけ方7・ふりこ10・電磁石7・方法5 |

### 新しい2種類

- biology：partはseed・flower・stamen・pregnancy。labelsは3・4・1・4個、不要箇所を空文字で省略できる。花のfocusはall・tip・base・outside。引出線は部分を指すが、名前は書かない。体内は壁・液体・胎児とつながる管・壁に接した部分を別々に描き、lifeの4問で同じ記号を使う。
- pendulum：1〜4枚のpanels。modeはlengthCandidates・positions・amplitude・compare・sliding。位置のlabelsは3個、角度は1個。length・unitは既知量、size・angleは描画用の寸法で、重さや角度の数値にはしない。共通尺度で長さを比べ、最短の25cmも文字は同じ大きさで表示する。

### 小4の種類の使い回し

- apparatus：既存beakerの容器・水を再利用し、solute（食塩はさじの山、ミョウバンは袋）を追加。seedCup・plantPotは発芽や成長を描かず、microscopeはレンズ二つの倍率のみ。filterの二つの方法は同じ大きさ・色、正解を示さない。cylinderは番号のない目もりと三つの目の位置。
- circuit：電池・極表示・配線・1枚330の共通配置をそのまま使い、device: coilを追加。コイルは鉄しんとつながった巻き線。巻き数の実線は省略した模式図で、数字はturnsから表示する。
- scienceScene：cloudCoverは10ます中の5・9・8ます。cloudMapは既存japanMapと同じ日本の輪郭。川は流れの矢印や岸の変化を示さず、既知の位置だけを記号にする。
- graph：blankAxesは空の軸・枠・目もりのみ。軸の名前・数値・測定結果・折れ線を描かない。

## 答えを表示しないための確認

- 合計110g・120g、全体400倍、周期、求める電磁石のN/S、引きつけたクリップ数、天気の名前、川の速さ・しん食/たい積は表示しない。
- 種子・花・体内・器具はア〜エだけ。ろ過はア/イ両方を同じ扱いで表示する。種子は芽を描かず、苗は両方同じ形・大きさ。
- 観察前のクリップ箱だけを描き、コイルにクリップを付けない。electromagnet_033は5個のクリップも省略して、巻き数と電池だけにした（未知の数の絵を作らない）。
- weather_031の東への矢印、electromagnet_030の磁針N側は、依頼表で指定された既知の状態だけ。次の日の天気・電磁石の極は描かない。
- river_005の谷の形、river_007の石の形・大小は依頼表の許可通り。形の名前や比較の答えを文字にしない。

## 依頼との差とPRでの相談

図を付けなかった問題はない。依頼表の条件・記号を保ち、比較図は狭い画面で文字を小さくしないため縦に並べた。電磁石の巻き線、石、体内は模式図であり、実寸や個数を読み取らせない。

1. **plant_012**：問題は「正しい比べ方」を問うが、依頼表指定の二つのコップ（水に沈める/湿らせる）は正解選択肢の比べ方そのもの。名前や実験結果を描かなくても、図が比較方法の手掛かりになる。依頼表に従って図を付け、問題文は変更していない。「図の二条件を比べると何を調べられるか」のような問いへの変更が必要か、別変更として相談する。
2. **pendulum_002**：正解文の「ふれはばの中心からおもりの中心まで」は、支点の位置を表す表現として確認が必要。図は依頼表通り、支点からおもりの中心・上・下の候補を示し、正解文は変更していない。

## 検証とスクリーンショット

- `node tests/run.js`：689件成功、失敗0。追加5テストで324問の不変性、61問、書き問題の継承、データ範囲と13種類の負例、非表示項目、問題文との既知量の一致を検証。
- `node tests/simulate.js`：すべて目標内。共通部品の回帰確認 `tests/ui-hand-diagrams-sci4.cjs`：87問×4幅＝348表示、見切れ・重なり・横はみ出し・ページエラーなし。
- `tests/ui-hand-diagrams-sci5.cjs`：昼のテーマ、Chromium（Google Chrome）、file://で実際の問題画面。61選択問＋9書き問、幅360・390・768・1024＝**280表示**。
- SVG文字の塗り・縁取りをviewBox/画面/figureの端で検査、文字同士の重なり、ページと図の横はみ出しを検査。画面の文字はdiagramで指定した記号・既知条件だけ、雲のます数と東矢印の数も検証。文字がviewBoxをまたぐ/完全に出る負例8件を検出。
- 問題と図のスクリーンショット280枚＋図のみ140枚（390・1024、書き問題込み）。撮影中だけHUD/ナビを隠し、回答ボタンのstickyを解除して長い図に重ならないようにする。通常表示のCSSは変更しない。
- 全61問の390px図を一覧にして目視し、代表の種子・花・体内・器具・ふりこ・回路・天気・川は390/1024の問題画面と照合する。
- ローカル成果物：`outputs/hand-diagrams-sci5/gallery.html`、`results.json`、各IDのPNG。ギャラリーで4幅と書き問題を切り替えて確認できる。スクリーンショットはゲームに追加しない。

## 再実行

```powershell
node tests/run.js
$env:FF_PLAYWRIGHT_MODULE='Playwrightのインストール先'
$env:FF_BROWSER_PATH='ChromiumまたはChromeの実行ファイル'
$env:FF_QA_OUTPUT='スクリーンショット出力先'
node tests/ui-hand-diagrams-sci5.cjs
```

PRレビュー後に指摘を直す。mainのマージ・公開は行わない。
