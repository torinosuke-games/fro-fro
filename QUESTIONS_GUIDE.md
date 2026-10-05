# QUESTIONS_GUIDE.md（問題データの書き方）

`CLAUDE.md` から移した、問題データ（`questions/*.js`）を作る・直すときのルールです。問題を扱う作業の前に読んでください。

## 進め方とルール（SPEC 10・21.5。フェーズ7で決め、v0.3 の B案でも使った）

- 1回の作業で1教科ずつ作る。1教科を作り終えるたびに `node tests/run.js` を実行し、すべて成功することを確かめる。
- 事実関係の確認が必要な問題は `tests/REVIEW_NEEDED.md` に「教科・問題ID・確認すべき点」を追記する（作成済み。5教科の分を記録してある）。
- **目標の問題数**（SPEC 10.3。フェーズ1で引き上げ済み）
  - 国語・理科・社会・英語：各学年 **最低9問**（基礎2・標準5・発展2）。うち半分以上は自由入力。**標準5問のうち3問以上は自由入力**（昇格試験に使う）。
  - 算数・数学：計算は自動生成で全学年をカバー済み。`questions/math_word.js` に**文章題を各学年3問以上**（subject は `"math"`）。
- **書き方**
  - 置き場所：`questions/japanese.js`・`science.js`・`social.js`・`english.js`・`math_word.js` の `window.QUESTION_BANK.push( … );` の中。ファイルを増やしたら `index.html` の `<script>` にも追加する（テストが検出する）。
  - 構造：SPEC 10.1 どおり。ID は `{教科}_g{学年}_{単元}_{3桁の連番}`（例：`science_g5_weather_001`）。`gen_` で始めない。
  - 教科の id：`math`・`japanese`・`science`・`social`・`english`。Lv1〜2 の理科・社会は生活科相当の内容にする。
  - 4択：`choices` はちょうど4つで重複なし、`answer` と同じ文字列を1つ含める。表示のたびにシャッフルされるので「上のどれでもない」のような選択肢は使わない。
  - 自由入力：`validationMode` は `exact`・`number`・`kana-insensitive`・`any-of`。読みを答える問題（ひらがな・カタカナどちらでもよい）は `kana-insensitive`。別解は `acceptedAnswers` に入れる（どのモードでも正解候補になる）。`any-of` は `acceptedAnswers` が空だとエラー。`number` は `answer` が数値でないとエラー。
  - **選択問題を書き問題にも使う（`inputForm`。判断200）**：選択肢がなくても答えが1つに決まり、答えが短い（ことば・数・人名など）選択問題には、`inputForm: { question?, answer?, acceptedAnswers?, validationMode, hints?, explanation?, answerDisplay?, reviewed }` を付ける。読み込み時に ID が `元のID#input` の書き問題が作られ、書き問題の候補に入る（くり返しの数え方も別）。省いた項目は元の問題のものを使う。問題文が「どれかな」「どれか」なら「何かな」「どこか」「何と いうか」などに直して `question` に書く（テストが「どれ」を見つける）。答えのふりがなの記法は自動で外れる（漢字で書いても正解）。漢字の答えには読み（ひらがな）を、ことばの間に空白が入る答えには空白なしを、よくある別の言い方を `acceptedAnswers` に入れる。数の答えは `number`、ほかは `kana-insensitive`。「〜に ふくまれない ものは どれ」「正しい ものは どれ」のように選択肢を見比べることが問題の中身のものと、答えが文になるものには付けない。AI が付けたものは `reviewed: false`（人が確かめたら true にし、`tests/cases/questions.js` の数も直す）。
  - `hints` は1〜3個。答えそのものではなく考え方の手がかりにする。`explanation` は必須。
  - AI が作った問題は必ず `reviewed: false`。人が内容を確認したら `true` にし、`tests/cases/questions.js` の確認済みの数（現在 1061）も更新する。
  - **ふりがな**：問題文・選択肢・ヒント・解説には、`texts.js` の辞書にある語へ自動でふりがなが付く。辞書にない語や、読みが文脈で変わる語（「上」「下」「方」など）は `{漢字|よみ}` と明示する。**漢字の読みを問う問題（`kanji_read` など）では、答えの漢字を `{漢字|}`（読みが空）と書き、ふりがなを付けない**（辞書にある語でも付かない。テストで確認）。低学年（Lv1〜2）の問題はひらがな中心にする。自由入力の `answer`・`acceptedAnswers` には `{…|…}` を書かない（入力と比べるため）。答えの表示で辞書のふりがなが誤るときは、任意の項目 `answerDisplay`（記法入り。ふりがなを外すと `answer` と同じ文字になること）を足す。文中で `{` `}` を記法以外に使わない。
- 構造チェック（`tests/cases/questions.js`）が確かめること：必須項目、`choices` が4つで `answer` を含む、ID の重複がない、`gen_` と衝突しない、`reviewed: true` の数、第10.3節の問題数、別解が正解になる、読みの問題で答えが見えない。**事実の正しさは確かめない**ので、REVIEW_NEEDED.md への記録を忘れない。
- 問題を入れたあとは、ブラウザで各教科の学習・昇格試験・実力診断が「準備中」でなくなることも確認する。

## 単元と図（判断221。全教科で同じ形式。Claude・ChatGPT のどちらが作る問題もこれに従う）

問題は、作った人や問題ファイル（`collection`）に関係なく、**教科・学年・単元**で管理する。図は付けても付けなくてもよく、どちらも同じ単元の一覧・問題マップに並ぶ。

### 単元の登録（`js/units.js`）

- `FF.units.DEFS[教科][学年]` に `{ id, name, description, icon }` を並べる。並び順が画面の単元の一覧と問題マップの番号の順になる。
  - `id`：英小文字と `_`（例：`decimal_calc`）。その教科・学年の中で重複しない。
  - `name`：単元名（例：`小数のかけ算・わり算`）。`description`：一行の説明。`icon`：1〜3文字の記号（例：`½`）。色は並び順で自動で付く。
- 単元を登録した教科・学年は、その学年の問題の `unit` を**すべて登録した id にする**（`tests/cases/renewal.js` が確かめる）。単元を登録した教科・学年では、算数の自動生成は出さない。
- まだ登録していない教科・学年は「すべての単元」だけで出題する（算数は従来どおり自動生成も混ぜる）。単元を足すときは、その学年の既存の問題の `unit` もいっしょに直す（ID は変えない。セーブの記録が ID で結び付いているため）。

### 問題の項目（SPEC 10.1 に加えて）

- `diagram`（省略できる）：問題の図。`{ kind, caption, …種類ごとの項目 }`。種類と必須の項目は `js/defs.js` の `DIAGRAM_KINDS`、描き方は `js/svg/learning.js`。`caption`（図の説明）は必須。書き問題の形（`inputForm`）にも同じ図が出る。
  - 例：`{ kind: 'rect', w: 8, h: 6, unit: 'cm', caption: '図の長さを使おう' }`、`{ kind: 'fraction', n: 3, d: 5, caption: '…' }`
  - 新しい種類の図が要るときは、`DIAGRAM_KINDS` に必須の項目を足し、`js/svg/learning.js` に描き方を足す。
  - 図の数値は問題文・答えと同じ値にする（図だけ見て答えが変わらないように）。
- `number`（省略できる）：単元の中での並び順。問題マップの番号は、教科・学年の中で「単元の順 → `number` → 難易度 → ID」の順に 1 から付く通し番号（答え方を変えても同じ番号）。
- `collection`（省略できる）：問題のまとまりの名前（例：`frontier100`）。出題や集計には使わない（記録用）。
- AI が作った問題は `reviewed: false`（これまでと同じ）。

### 文章題の共通図（判断223）

第2弾の手作り問題では、以下の共通図も使う（判断241。17問に図を追加。すべて `caption` 必須）。

- `gridPoints`（`maxX, maxY, points, segments`）：整数の方眼。点は `{name, x, y}`、線は点の添字2つ。任意の `unknown, notes` は図の外に表示し、求める点を方眼に置かない。
- `solid3d`（`shape, vertices`）：`box` または `cube` の見取り図。頂点は `{vertex: 'A'〜'H', label}`、空配列も可。任意の `dimensions: [横, 奥行き, 高さ], showLengths, unit, face: 'ABCD', block, notes` で既知の長さ・指定の面・積み木1こを表示。道すじや未知の頂点を強調しない。
- `boxNet`（`dimensions, showLengths`）：直方体の6面の展開図。寸法は `[横, 奥行き, 高さ]`。`showLengths: false` なら数値を表示せず、立方体には `[1,1,1]` を使う。面の枚数やふちの組数は書かない。
- `quadFigure`（`shape`）：`rectangle` または `parallelogram`。任意の `angle, diagonal, unknown, sides, unit` で角Ａの既知角度・対角線ＡＣの長さ・未知の線分名・辺ＡＢとＢＣの長さを表示。未知の角・長さは `？` とし、等分の印を付けない。

値や表示する数値は必ず問題の `diagram` に置く。未知の長さは `？` または `x` とし、合計・割合・交点・分けた後の個数を描かない。

- `objects`（`item, groups, labels`）：たきぎ・あめ・パン・花・いす・人の個数。`sealed` で袋の中を隠し、`columns, mark, names` で列・印・名前を指定。
- `clock`（`minute`）：時計の針。任意の `hour` と `toMinute, elapsed` で短針や長針の移動を指定。時刻の答えは文字で出さない。
- `tape`（`values, labels`）：長さ・時間・道のりの帯。`notes, places, stacked` で補助表示・通過点・折り返しを指定。
- `measure`（`capacity, values, labels, unit`）：容量と入っている量を目盛り付きのますに示す。
- `balance`（`weights`）：2つの荷物の重さとはかり。はかりの合計表示は `？`。
- `nestedRect`（`w, h, innerW, innerH, unit`）：土地と内側の小屋。`growth, area` で元の正方形を一方向ずつ広げる模式図にも使う。
- `triangle`（`base, height, unit`）：底辺と点線の高さ。`right` なら直角三角形で斜辺を `？` にする。
- `pie`（`numerators, denominators, labels`）：同じ大きさの円を分けて別々の分数を示す。合算しない。
- `band`（`parts, labels, totalLabel`）：割合・比の帯。任意の `known` に既知量だけを表示する。
- `doubleLine`（`labels, ends`）：時刻と経過時間・時間と道のり・地図の長さと縮尺の線。目盛りや換算の答えは出さない。
- `circle`（`radius, unit`）：半径の図。`count, diameter` で円の列、`angle` でおうぎ形を指定。
- `coordinate`（`a, b, power, xRange, yRange, formula`）：直線（`power: 1`）・放物線（`power: 2`）。目盛りを省略し、任意の `marks` は問題文に指定されたxだけにする。
- `exterior`（`angle`）：1つの頂点の外角と辺の延長。多角形全体の辺数は示さない。
- `inscribed`（`angle`）：同じ弧の円周角と、未知の中心角を示す。
- `similarity`（`height, shadows, unit`）：棒・塔と影の相似の模式図。塔の高さは `？`。
- 既存 `fractionSum` の `separate: true` は2つの量を別の帯で表示し、`whole` は1つ分の単位。既存の合算表示は維持する。
- 既存 `rect` の `area` と `w/h: '？'` は面積だけ分かる正方形、`solid` の `w, depth, h, water, unit` は寸法と水深、`shape: 'triangularPrism', baseArea, h, unit` は三角柱。
- 既存 `polygon` の `shape: 'pentagon'` は五角形、`shape: 'diagonals', w, h, unit, single: true` は寸法付きの長方形と対角線1本。既存 `numberline` の `marks, markLabels, directions, hideNegative` は問題文の既知点と向きだけを表示する。

### 小5手作り問題の共通図拡張（判断247）

新しいkindは追加しない。第3〜5弾118問では、従来の必須項目を保ったうえで、`study: true` と次の任意項目を使用する。データの範囲は `tests/cases/hand-diagrams-g5.js`、表示は `tests/ui-hand-diagrams-g5.cjs` で検証する。

- `polygon.panels`：1〜2枚の座標形状。各 `points` は3〜12頂点、`names`・`angleLabels` は頂点と同数、`heights` は高さの2端点と直角印、`segments` は頂点番号の組。各枚の `notes` に既知の寸法だけを書く。共通縮尺で比較する。
- `solid3d.dimensions`：横・奥行き・高さの正の3値。`vertices: []` を保ち、`cut`・`join`・`stack`・`open`・`thickness`・`water`・`rise`・`baseSides` で共通の立体を表す。寸法は `notes` の既知量だけを表示。
- `band.rows`：複数の帯（parts・labelsは同数）。`scale` は共通の尺度、`schematic` は未知量を幅で教えない模式図。模式図であることをcaptionに書く。
- `pie.sectors/sectorLabels`：全体100の円を一枚で区分する。`schematic` は未知の割合を角度で教えない等角度の模式図（captionに明記）。
- `fraction.rows`：各帯のn・d・label。`pieces/pieceLabels` は同数の分数部分、`used/usedLabel` は既知の使用量。`people` は人数のみ、1人分の切り分けは描かない。
- `numberline.rows`：marks・labelsが同数、marksはstart〜end内。`subdivisions` は非負整数（0は目盛りなし）。`title/note/endLabel` は既知の説明と途中省略用。比較の答えになる位置や、次に重なる時刻は打たない。
- `coordinate.knownPoint/gridSteps`：問題文で指定された点と格子幅。グラフの範囲を既知点までに限定し、未知点の座標を図で求めさせない。
- `tape.schematic`：全体と1つ分を省略した模式図。`stacked/notes` は複数段で、未知の本数・合計時間・換算値は描かない。
- `measure` のstudy図は既知の容量と量だけを水位で示し、答えを数えられる目盛りは付けない。`circle.diameter` は半径ではなく問題文の直径ラベルを表示する。
- `rect`・`bars` のstudy図はスマホで読める文字サイズを使用。`triangle`・`doubleLine`・`table` は既存の形式を再利用する。

118問のIDと項目一覧、依頼表との差異、検証結果は `HAND_G5_DIAGRAMS.md`。

PR #34レビュー対応（判断248）：`solid3d.baseView: 'front'` は三角柱の底面を正面に向けた見取り図。`fraction.rows[].pieceLabelsAtParts: true` は各部分の中央から引出線を出してラベルを置く。`measure.waterFill: 'blue'` は昼の既存の青を不透明度0.4で使う。割合を求める帯は `schematic` とcaptionで比例しないことを明示し、道のりの帯と時間の注記を混同しない。

### 小4理科の共通図（判断250）

第6・7弾87問。全種類にcaptionとstudy: trueを指定し、結果・変化・動く向きの矢印は表示しない。値の範囲と負例はtests/cases/hand-diagrams-sci4.js、実際の問題画面はtests/ui-hand-diagrams-sci4.cjsで検査する。

- `circuit`（必須panels）：1〜2枚の回路。layoutはsingle・row・branches・unknown、deviceはnone・bulb・motor・meter。gapは外れた導線、removeは外す電池の添字。needle: rightは既知の初期状態だけ。unknownは電池Bの極・端子を隠す。
- `apparatus`（必須panels）：注射器・容器・温度計・加熱器具の共通線画。各toolはsyringe・airgun・tankCup・beaker・flask・rod・plate・ballRing・tubeBath・bagBath・thermometer。contents、marks、notes、heat、ice、lid、bath、pressed、eyesで既知の条件だけを指定。membraneはflatのみ。scaleのmin・max・step・valueは温度の読み取り問題だけで使い、液面の答えを文字にしない。
- `scienceScene`（必須scene）：身近な現象・季節・気温測定・地形・土の共通線画。sceneはkettle・coldCup・window・room・branch・tree・thermLocations・height・groundCompare・terrain・school・soil・particles・slope。seasons・places・positions・materials・sizes・pour・trace・directionsは既知の状況だけを指定。粒のsizesは描画用の相対サイズで、数値として表示しない。
- `anatomy`（必須part・pose）：skull・ribs・arm・legの模式線画、side・front・straight・bentの姿勢。musclesは筋肉の位置だけ、labelsは内側・外側。曲げても筋肉の収縮・太さの変化・力こぶを示さない。
- `moonView`（必須mode）：shapeではphase（full・half・crescent・invisible・surface）、skyではsky・directions・positionで既知の空と方位を指定。未知の形は丸印、未知の方位はunplacedとして方位の列から分離する。
- `starMap`（必須points・segments・labels）：星の位置、星の添字を結ぶ線、既知の星名（空文字可）。pointsとlabels、任意のtintsは同数。sky・horizon・planisphereで方位・地平線・星座早見を示す。探し方の補助線・移動の矢印は描かない。
- 既存`graph`はvalues・labelsを保ってscience: trueを指定すると、既知の気温と時刻だけを表示する。panelsによる比較は共通尺度の模式図で、値の目もりを付けない。既存`table`は観察カードの空欄に使い、欄名も空文字にする。

全使用ID・依頼との差・検証結果はHAND_SCI4_DIAGRAMS.md。

PR #36レビュー対応（判断251）：電池は既知の＋極側だけ端子を突出させ、unknownの電池Bは左右対称のままにする。うでの筋肉は内外1本ずつ骨の両端につなぎ、曲げた図でも同じ形を使う。筋肉を示す4問はlabelsで内側・外側を必ず指定する。頭の骨は目のあなと歯列を残し、瞳・唇は描かない。

### 小4社会の共通図（判断253）

第8・9弾70問。全種類にcaptionとstudy: trueを指定する。図に答えの語・数・地名・施設名や流れの矢印を表示しない。略地図の「北」だけは方位の補助表示。値の範囲はtests/cases/hand-diagrams-soc4.js、実際の問題画面はtests/ui-hand-diagrams-soc4.cjsで検査する。

- `japanMap`（必須bounds・marks・areas・routes）：boundsは[西端経度,南端緯度,東端経度,北端緯度]、marksは[経度,緯度]の配列、areasは3頂点以上の範囲。routesは{type: riverまたはridge, points}。任意のlakesは湖の頂点、mountainは山の位置、portは県の地図の下に港の線画を置く。県名・港名や、問われていない港の位置を出さない。略図を切り出した端を海岸線として描かない。
- `terrain`（必須scene）：riverMouth・basin・fan・delta・levees・lakeTunnelの地形・河川・水路の模式線画。
- `facility`（必須scene）：sewer・sewagePlant・reservoir・settling・filter・hydro・supply・hillSupply・landfill・truck・incinerator・gasFilter・compost・bottles・wind・solar・pylons・substation・geothermal・thermal・aqueduct・sluice。発電・送電も施設として共有し、thermalは管の中身を隠す。清掃工場の発電機を排ガス管につながない。
- `disaster`（必須scene）：flood・landslide・storm・ash・bag・seaWall・sabo・hydrant。第9弾で指定された災害の現状は描くが、名前・数を書かず、bagの中身は隠す。
- `culture`（必須scene）：dollFloat・poleFloat・lacquer・kettle・castle・houseFront・lanternPole。名前のない祭り・工芸品・建物の線画。houseFrontは窓と入口のみで屋根の形を出さない。任意のtintは#RRGGBB形式の材料色（赤いうるし）。
- `industry`（必須scene）：citrus・dairy・carFactory・greenhouse・fishCage・hotBath・coastOrchard・basinOrchard。作物名・産地名・栽培法を書かず、気温の変化を示さない。coastOrchardは木と海のみで太陽や畑の形を出さない。

模式図の形・反復は描画用で、数量や実寸の読み取りには使わない。全使用ID・依頼との差・検証結果はHAND_SOC4_DIAGRAMS.md。

### 生成した絵の図（判断254）
- `diagram:{kind:'image', src:'img/diagrams/<名前>.webp', alt, caption, study:true}`。`src` と `caption` が必須（`alt` は省略すると caption を使う）。絵は横3：2・WebP・約200KB 以下、`img/diagrams/` に置く（テストは400KBまで）。
- 絵の中に文字・数字・看板を入れない。答えの名前を描かない。ものの見た目を見せる図に使い、数・形を合わせる図（算数の図・表・グラフ）と地図（`japanMap`）は SVG のままにする。依頼の書き方は `DIAGRAM_REQUESTS_10.md`。
