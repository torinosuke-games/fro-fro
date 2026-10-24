# Claude Code 引き継ぎ：FROZEN FRONTIER 比較用レプリカ

更新日：2026-10-24。最初にこの文書と `codex-prototypes/homepage/README.md` を読んでください。

## 作業開始

- リポジトリ：`torinosuke-games/fro-fro`
- 作業ブランチ：`codex/homepage-replica`
- 既存ドラフトPR：https://github.com/torinosuke-games/fro-fro/pull/175
- レプリカ：https://frozen-frontier-replica.jovialbean2048.chatgpt.site/codex-prototypes/homepage/
- 元にしたmain：`e15e2cbe81b9d37712f77a5468333b470589378e`
- 最新の画面修正コミット：`dc45980`。この後の引き継ぎ文書等も含め、ブランチ先端から再開してください。

```sh
git fetch origin
git switch codex/homepage-replica
git pull --ff-only origin codex/homepage-replica
python3 -m http.server 8775 --bind 127.0.0.1
```

既存作業のある環境では先に `git status` を確認し、未保存の変更を上書きしないこと。ローカル入口は http://127.0.0.1:8775/codex-prototypes/homepage/ 。

## 適用範囲と保存

画面変更は比較用入口だけに適用する試作。追加依頼により、本体のjs/generators.jsには値引きドリルの品質修正を加えています（末尾参照）。本体の入口・CSSは変更していません。固定問題はquestions/math_g5_hand.jsの直接的な公約数・公倍数問題の難易度のみ変更しています。mainへのマージは未実施です。過去の絵の依頼（tower-art系やDIAGRAM_REQUESTS）はこのPRの作業範囲ではありません。

- 通常学習／町の保存：`frozenFrontier.prototype.homepage.v1`
- 広い雪原の保存：`frozenFrontier.prototype.snowJourney.v1`
- `config.js` で本体の保存キー・旧セーブ取り込み・サーバー同期から分離。
- 本体へ採用する場合は、比較用configを本体へそのまま読み込まないこと。ユーザーの既存セーブを維持して個別に取り込む。

## ファイルの役割

| ファイル（codex-prototypes/homepage/内） | 役割 |
| --- | --- |
| index.html / build-entry.cjs | 本体と同じ順番で読み込む別入口。再生成はリポジトリ直下で `node codex-prototypes/homepage/build-entry.cjs` |
| config.js | 保存・同期の分離 |
| design.js | 既存レンダラーのラップ、トップ／町の配置、問題画面の装飾・不要要素除去 |
| design.css | 比較用レイアウト、雪・木枠・ヘッダーの装飾 |
| village-map.js | 固定枠内の横スワイプ村地図 |
| snow-journey.js | 独立した広域地図・経路・保存データ |
| snow-journey-ui.js | カメラ・8方向移動・歩行スプライト・円形パッド |
| README.md | 詳細仕様、生成画像の指示、検証の記録 |

`design.js` は本体の `js/ui/renewal.js` による問題画面を呼び出した後、DOMを調整します。旧 `js/ui/quiz.js` だけを変更しても現行画面には反映されません。

## ユーザーと調整した現行の見た目・動作

### 学習／問題画面

- タイトルは「Frozen Frontier」「君の学びの熱量で 町に雪解けを」を維持。
- PCは左の単元・中央の問題・右のヒント／解説の3列。タブレットは2列、スマホは縦並び。
- 問題マップは元のカレンダー調の番号5列。説明付き縦リストへ変更しない。
- 単元一覧の最大高290px、問題マップ100px。保存案内「記録は保存されます」は削除。
- 「単元を選ぶ」は厚い木枠・鋲・積雪の画像。雪の上の白い下地は透明化し、右のヒントと雪の上端を揃える。
- ヒント／解説にも雪の画像。独自の「問題情報」カード、右下の応援コメント、解説待ちのひし形は削除済み。
- ヒント冒頭の「少しずつ、考え方の手がかりを。」は削除。ヒント使用による獲得量の説明は維持。
- **解答後は全画面幅でヒント枠自体を削除し、答えと解説を上に詰める。次の問題ではヒントを戻す。**
- 上部の教科・進捗欄は不透明白。「けいさんメモ」は同じ帯内。1000px以上では問題枠の右端とボタンの右端が一致。狭い画面は同じ帯の鉛筆アイコン。
- 全ページのヘッダーは既存の高さ・文字サイズを共用し、問題ページの雪景色と白いナビボタンに統一。上部3ボタンは高さ34px、760px以下は幅も34px。
- 761px以上の資材・熱量の数字は19px（元22px）。
- ランダム資材は☆からサイコロへ変更。淡い青の丸背景で他の資材と統一。左面は赤1、上面2、右面3。上面2は左右の対角線、点間隔は広い案と狭い案の中間。説明も「サイコロはランダムです」。
- 出題・選択時の即採点・チケット・報酬・ヒント段階解放・解説解放・単元／条件選択・記述／手書き・計算メモは既存処理を共有。別の「答え合わせ」ボタンは追加していない。

### 町・雪原

- 村の表示枠は固定し、中央の村と東の開拓地を横ドラッグ／スワイプ。地区選択・中央炉へ戻る・慣性移動あり。
- 地図外での縦スクロールを妨げない。施設の既存イベントを維持。東の一部施設は予定地。
- 広い雪原は40×30。町・キャンプ・洞窟・ボス拠点の試作。別セーブ。
- **円形移動パッドを中央下に維持。斜めを含む8方向連続移動、既存の歩行用画像を使用。**
- 角抜け防止、カメラ追従、到達地点の保存。洞窟・宝箱・発見済み町への移動あり。
- 戦闘、HP消費、実際の冒険報酬は未実装のプレビュー。学習の報酬とは別。
- 性能改善済み：歩行シートは読込時に縮小、木等はキャッシュ、スマホCanvas倍率最大1.5、同一状態のDOM再構築を抑止。
- **四辺でカメラが止まった際、雪だけ動かないよう雪面もカメラ座標を基準にする。主人公座標へ戻さない。**
- 移動はフレームの余り時間を次の歩幅へ引き継ぎ、タイル境界の停止を抑制。pointercaptureの子要素由来lostイベントを誤処理しない。

## 画像

すべて `codex-prototypes/homepage/` に同梱。生成プロンプトはREADMEに記載。

- `lesson-sign.webp`：雪付き木製看板、文字はHTMLで重ねる。
- `lesson-snow-cap.webp`：透過の積雪。静止したCSS装飾。
- `lesson-village.webp`：雪の村の背景。
- `lesson-wood.webp`：木目。
- `resource-dice.webp`：128×128、現在のサイコロ。
- `east-clearing.webp`：東の開拓地。

画像生成の中間ファイルは作業環境の `/workspace/generated_images/` にあり、Gitには完成WebPだけを保存。`screenshots/` の画像には途中版もあるため、現行表示の唯一の根拠にはしないこと。

## 確認方法と実施済みチェック

PlaywrightとChromiumが必要。学習テストは現在8775を使用。

```sh
node tests/ui-lesson-replica.cjs
FF_TEST_ORIGIN=http://127.0.0.1:8775 FF_BROWSER_PATH=/usr/bin/chromium node tests/ui-homepage-replica.cjs
node tests/ui-village-map.cjs
node tests/ui-snow-journey.cjs
node tests/ui-snow-journey-walking.cjs
node tests/ui-snow-journey-smooth.cjs
node tests/ui-snow-journey-edges.cjs
```

- 学習テスト：390/768/1024/1536/1920px、配置・横はみ出し・図・元タイトル・ヒント・採点／チケット・解説・次問・問題一覧・条件変更・記述を確認。直近の変更後も成功。
- 追加のブラウザー確認：解答後のヒント枠削除・解説の上詰め・次問での復元を390/768/1202pxで確認。
- 既に確認したもの：町のタッチ横移動／縦スクロール、円形パッド8方向、歩行フレーム、滑らかなタイル境界、スマホ／PCで四辺の地面と木の一致。
- 本体テスト `node tests/run.js` は以前886件成功。本体ロジックはその後変更なし。
- `ui-homepage-replica.cjs` は環境変数なしでは未導入のPlaywrightブラウザーを探して失敗することがある。上記の実行パスを指定する。他のテストにも環境依存のパスがあるので移動先では確認する。
- 実機スマホで一定FPSを保証する測定は未実施。UIを重くする常時アニメーションや毎フレームのDOM更新を増やさない。

## キャッシュと公開の注意

ブラウザー上で以前の装飾・文言が残ったため、index.htmlのdesign.js/cssには `?v=20261025-nav-icons` を付けています。今後変更時は更新番号も更新すること。build-entry.cjsも同じ参照を出力します。

公開はGitHub PagesではなくSitesの別プロジェクト。GitHubへpushするだけではレプリカは更新されません。

- project_id：`appgprj_6adc1144c2548191bf0378603ce5fd5f`
- 最後の公開成功：2026-10-24 10:38 UTC
- 公開sourceコミット：`34bcef9b09b49e1e892b61a9cfc6ebd27da80702`（GitHubとは別リポジトリのSHA）
- 所有者限定公開。アクセス権を勝手に広げない。スマホで別のChatGPTアカウントだとアクセスできない。
- 現環境のSitesチェックアウト：`/workspace/sites/frozen-frontier-preview`。`.openai/hosting.json` のIDを保持する。
- distへJS/CSS/questions/audio/prototypeをコピー。本体img一式は大きいため、元画像参照は上記main固定SHAのraw.githubusercontent.com URLへ変換。prototype生成画像は同梱する。
- トークンやアカウント秘密情報は文書・Gitへ保存しない。Sitesを操作できる環境で、認証後にsourceをpushし、その同一SHAから作ったarchiveで公開する。
- Claude Code側でSitesへの接続がなければ、GitHubの変更とローカル表示までは進められる。公開済みと誤報しない。

## 本体へ取り込む場合

1. まずmainとの差分を確認。このブランチは上記main時点が基準であり、後続のClaude Code側変更との競合は未調整。
2. 採用する画面ごとに既存レンダラーへ整理して統合。試作のラップとCSS追記をそのまま長期設計として増やし続けない。
3. 保存キー・同期・既存問題データ・チケット等の挙動を維持する。広域雪原は独立試作なので、本体の冒険進行へ統合する設計が別途必要。
4. レプリカ確認後、ユーザーの取り込み指示に従ってPRを整理する。今回の依頼は引き継ぎ準備であり、mainへはマージしていない。

## 追記：答えを見る（引き継ぎ後の追加依頼）

未解答の操作欄に「答えを見る」を追加。design.jsでセッションのanswerViewedとattempt.doneを設定し、通常の解説表示を使用。採点APIは呼ばず永続の正解記録・資材・熱量・チケットを変更しない。閲覧後は回答不可、ヒント枠削除、報酬なしを表示。次問は通常へ復帰。スマホはボタンを次の行へ配置。検証は `node tests/ui-lesson-reveal.cjs`。本体への統合時にも閲覧と正解を区別すること。

## 追記：左枠の高さを表示領域へ追従

761px以上の左枠を画面下端16px手前まで伸ばし、増分を単元一覧に割り当てる。問題マップは最大100pxのまま。design.jsのfitSidebarで上端を測定、CSSの100dvhと組み合わせる。観測対象はHUDと帯のみ（自己観測ループを避ける）。機種情報不要。非常に短い画面では高さ360pxを下限とするためページスクロールが必要な場合あり。テスト：tests/ui-lesson-sidebar.cjs。

難易度バッジの最新指定：基礎＝青（#327ac1）、標準＝緑（#55a669）、発展＝紫（#8656b5）。761px以上はquestion-meta内で右寄せ。

けいさんメモのアイコンは生成したmemo-pencil.webp（透過128px）を24px表示。quizレンダラー後にscratch-toggleのsp-icoだけを置換し、ボタンと開閉イベントを維持。

単元看板の進捗は「全○○問中 ○○問 せいかい」。見出しとの間隔を詰め、文字を木枠の縁から内側へ配置。

## 追記：値引きドリルの品質と難易度

ユーザー指摘を受け、本体js/generators.jsを修正（ここからは見た目だけのPRではない）。小学5年percent単元のpct_offを基礎のみへ移動し、標準・発展から除去。価格候補は0円より大きく定価未満、候補補充時にも条件を強制する。異なる割引率の価格等から誤答を生成。価格8×率7の全56組で一意な4択・正解1つ・全候補の範囲を検証。ロジック887件成功。単純値引きが発展に戻らないよう注意。固定問題全件や他の演算型の全面監査はしていない。prototypeのgenerator読込にも更新番号を追加し、公開dist/js/generators.jsも更新済み。

## 追記：単純な最大公約数・最小公倍数は基礎

固定問題の直接計算を基礎に変更（12と18／24と36の最大公約数、4と6の公倍数の最小値、15と20／4・6・9の最小公倍数）。生成器のgcd_ask/lcm_askも基礎のみ。multiple標準の生成リストは空で、標準は固定問題から出題する。問題ID・答え・履歴キーは変更なし。応用文章題は別分類のまま。tests/cases/gcd-difficulty.jsと生成テストに分類を反映。資材・熱量の数字は761px以上で17px。

上部ホーム・学習記録・設定はnav-home/records/settings.webpを24px表示。FF.renewalHudをラップしボタン内容の記号を画像へ置き換える。全ページ・スマホへ共通適用。既存イベントと高さ34pxを維持し、アイコンのみの画面でもaria-labelで名前を提供する。
