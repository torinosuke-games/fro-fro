# 小4理科87問の図（第6・7弾）

2026-10-05。main `46691976f27c1d28756578f64d1ff45be7788f43` から `codex/hand-diagrams-sci4` を作成。第6弾39問・第7弾48問すべてに図を追加。省略なし。

## 変更ファイル

- questions/science_g4_hand.js：依頼された87問のdiagramだけ変更。
- js/defs.js：理科の共通6種類を登録。
- js/svg/learning.js：回路・器具・身近な場面・体・月・星のSVG線画。既存graphにscience指定の描画を追加、tableは既存を利用。
- tests/cases/hand-diagrams-sci4.js：6テスト。333問の保護項目・246問の対象外・87問とinputFormへの継承・範囲と負例・実験の結果や解答を表示しないデータを検証。
- tests/ui-hand-diagrams-sci4.cjs：87問×4幅の実際の問題画面をChromiumで検査・撮影。
- DIAGRAM_REQUESTS_6.md / DIAGRAM_REQUESTS_7.md：完了・レビュー待ちに更新。
- QUESTIONS_GUIDE.md：共通種類の形式を追記。
- DECISIONS.md：判断250。
- CLAUDE.md：進捗・次の判断番号・テスト数。
- HAND_SCI4_DIAGRAMS.md：この報告。

## 種類と使用ID

captionは全種類で必須。study: trueを指定。新規6種類はcircuitからstarMapまで。graph（4問）・table（1問）は既存。下の項目はDIAGRAM_KINDSの必須項目で、任意指定はQUESTIONS_GUIDE.mdを参照。

| 種類 | 必須項目 | 使用ID |
| --- | --- | --- |
| circuit | panels | `science_g4_hand_electric_002`、`science_g4_hand_electric_003`、`science_g4_hand_electric_004`、`science_g4_hand_electric_005`、`science_g4_hand_electric_010`、`science_g4_hand_electric_026`、`science_g4_hand_electric_011`、`science_g4_hand_electric_025`、`science_g4_hand_electric_012`、`science_g4_hand_electric_020`、`science_g4_hand_electric_022`、`science_g4_hand_electric_031` |
| apparatus | panels | `science_g4_hand_air_004`、`science_g4_hand_air_005`、`science_g4_hand_air_008`、`science_g4_hand_air_010`、`science_g4_hand_air_012`、`science_g4_hand_air_015`、`science_g4_hand_air_024`、`science_g4_hand_air_026`、`science_g4_hand_water_021`、`science_g4_hand_water_025`、`science_g4_hand_water_026`、`science_g4_hand_heat_001`、`science_g4_hand_heat_003`、`science_g4_hand_heat_016`、`science_g4_hand_heat_004`、`science_g4_hand_heat_008`、`science_g4_hand_heat_011`、`science_g4_hand_heat_014`、`science_g4_hand_heat_015`、`science_g4_hand_heat_022`、`science_g4_hand_heat_023`、`science_g4_hand_heat_029`、`science_g4_hand_heat_030` |
| scienceScene | scene | `science_g4_hand_water_002`、`science_g4_hand_water_006`、`science_g4_hand_water_012`、`science_g4_hand_heat_032`、`science_g4_hand_season_009`、`science_g4_hand_season_034`、`science_g4_hand_weather_002`、`science_g4_hand_weather_003`、`science_g4_hand_weather_016`、`science_g4_hand_weather_030`、`science_g4_hand_rain_001`、`science_g4_hand_rain_010`、`science_g4_hand_rain_011`、`science_g4_hand_rain_023`、`science_g4_hand_rain_024`、`science_g4_hand_rain_032`、`science_g4_hand_rain_034` |
| anatomy | part, pose | `science_g4_hand_body_001`、`science_g4_hand_body_002`、`science_g4_hand_body_010`、`science_g4_hand_body_011`、`science_g4_hand_body_013`、`science_g4_hand_body_021`、`science_g4_hand_body_023`、`science_g4_hand_body_025` |
| moonView | mode | `science_g4_hand_moon_001`、`science_g4_hand_moon_002`、`science_g4_hand_moon_003`、`science_g4_hand_moon_004`、`science_g4_hand_moon_006`、`science_g4_hand_moon_011`、`science_g4_hand_moon_012`、`science_g4_hand_moon_013`、`science_g4_hand_moon_019`、`science_g4_hand_moon_032` |
| starMap | points, segments, labels | `science_g4_hand_star_002`、`science_g4_hand_star_010`、`science_g4_hand_star_009`、`science_g4_hand_star_029`、`science_g4_hand_star_003`、`science_g4_hand_star_018`、`science_g4_hand_star_011`、`science_g4_hand_star_012`、`science_g4_hand_star_013`、`science_g4_hand_star_015`、`science_g4_hand_star_026`、`science_g4_hand_star_016` |
| graph | values, labels | `science_g4_hand_weather_012`、`science_g4_hand_weather_024`、`science_g4_hand_weather_019`、`science_g4_hand_weather_028` |
| table | head, rows | `science_g4_hand_season_027` |

## 検証

- `node tests/run.js`：631件成功、失敗0。
- `node tests/simulate.js`：すべて目標内。
- 昼のChromiumで、file://のindex.htmlから実際の問題画面を表示。360・390・768・1024px、87問×4幅＝348表示。SVGのviewBox・画面上の描画範囲・figureの範囲を検査し、文字の重なり・見切れ・横はみ出し・ブラウザ例外は0。
- 既存の小5手作り118問×4幅＝472表示、算数文章題55問×4幅＝220表示のChromium回帰検査も成功。
- グループの座標変換を含めたgetBBoxを比較。文字をSVGの端と完全な枠外へ動かす負例8件を検出。
- 全348問画面と、390・1024pxの図174枚を保存。gallery.htmlで図・問題文・折りたたんだ答えと解説を対照できる。
- 問題文・答え・選択肢・ヒント・解説・ID・難易度・inputForm・reviewedは変更前の全333問のSHA-256と一致。セーブ項目・saveVersion・確認済み問題数は変更なし。外部ライブラリ・ES Modules・fetch・サーバーをゲームに追加しない。

## 答えを描かないための判断と依頼との差

- 図を付けなかった問題、問題文などの変更はなし。
- electric_031とweather_028の比較図、weather_002の3つの場所はスマホで読みやすい縦配置にした。接続・条件は依頼どおり。
- electric_012の右向きのはりは、依頼書に指定された初期状態だけ。逆向きにした後は描かない。
- heat_022は読み取り問題のため、依頼どおり0〜100の目もりと45の液面を示す。ただし45という文字や正解の印は置かない。他の温度計に数値目もりは付けない。
- heat_014・heat_015の膜は平ら。水や空気の移動、熱の伝わり、容器の変形、外した後の回路、筋肉の収縮・ゆるみ・力こぶは描かない。
- electric_022の電池Bは極の文字・端子の突出を両方省く。star_018は北極星も探し方の線もなし。観察カードに欄名・記入例はなし。
- moon_032の丸い月は方位の列から分離し、未知の方位と結び付けない。moon_019は形を示さない丸印。月の名称をcaptionにも置かない。
- weather_028は山形／平らの比較の模式図で、数値の目もりや天気の名称を表示しない。粒の大きさ・体の線画も模式図で、実測の値を表示しない。
- 星の相対配置とオリオンの星の色はNASAの一次資料を参照：[夏の大三角](https://science.nasa.gov/solar-system/skywatching/night-sky-network/summer-triangle-corner-altair/)、[冬の大三角](https://science.nasa.gov/solar-system/what-are-asterisms/)、[オリオン座](https://science.nasa.gov/asset/hubble/orion-constellation/)。求める星は「？」または無名、問題文の既知の名前だけを表示。

mainにはマージせず、PRでClaude・ユーザーの図と問題のレビューを待つ。

## PR #36レビュー対応（判断251、2026-10-05）

コメント5985380083の必須1点と任意3点すべてに対応。body_010・body_011に内側・外側のラベルを追加。4問のうでの筋肉は骨の両端につながる内外1本ずつで、姿勢によらず同じ形とする。頭の骨は目のあな・歯列・あごを示し、瞳・唇は描かない。電池の既知の＋極側に突出した端子を付け、導線を接続。electric_022の電池Bは左右対称・極の文字なしを維持する。

変更ファイルはquestions/science_g4_hand.js（2問のdiagramのみ）、js/svg/learning.js、tests/cases/hand-diagrams-sci4.js、tests/ui-hand-diagrams-sci4.cjs、QUESTIONS_GUIDE.md、DECISIONS.md、CLAUDE.md、この報告。テスト631件成功・シミュレーションすべて目標内。87問×4幅＝348画面を再検査し、SVGそのものの筋肉の本数・形・ラベル・骨の目のあなと歯列・電池の端子数も検証する。333問の保護項目は変更前のハッシュと一致。全画面と390/1024pxの図174枚をレビュー用確認ページに保存。
