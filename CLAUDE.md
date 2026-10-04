# CLAUDE.md（開発メモ）

ブラウザだけで動く雪原サバイバル × 学習ゲーム「FROZEN FRONTIER」。`index.html` を開くだけで動く（`file://`、サーバー・外部ライブラリ・ES Modules・fetch なし）。

**コンセプト（判断189、`STORY.md`）**：何者かによって雪に閉ざされた辺境の地の生存者を、主人公の「勉強する熱」で雪を溶かし、街を発展させて救い出す。熱量 ＝ 勉強量ポイント、遊び時間 ＝ 熱量を変えた「休憩」。文言・絵・新しい機能はこのコンセプトに従う。

## 文書の場所（必要なときだけ読む）

- 物語とコンセプト：`STORY.md`（文言・絵・新しい機能を考えるときに読む）
- 仕様：`SPEC.md`（v0.1＋v0.4 の勉強量ポイントと引換所）、`SPEC_v0.2.md`（探索。矛盾したらこちらが優先）、`SPEC_save_integrity.md`、`SPEC_theme.md`、`SPEC_theme_default_day.md`、`SPEC_v0.3.md`、`SPEC_v0.3_battle.md`
- 設計：`DESIGN.md`（v0.2 は第12章、v0.3 戦闘は第13章、v0.4 は第14章）
- **判断した点（19〜）と進捗の詳細：`DECISIONS.md`**。仕様にない判断をしたら、その末尾に番号を続けて追記する（次は 243。206〜220 は ChatGPT（Codex）のリニューアル、223 は ChatGPT の算数文章題の図）。関係する機能を変える前に、該当する判断を検索して読む
- 問題データの書き方：`QUESTIONS_GUIDE.md`（`questions/*.js` を作る・直す前に必ず読む。単元と図の形式は「単元と図」＝判断221）
- リニューアル（ChatGPT で作った学習画面・小4算数の図解100問）：`RENEWAL.md`、`QUESTIONS_100.md`。算数の文章題55問への図（判断223）：`MATH_WORD_DIAGRAMS.md`（図の種類・使った問題）、依頼の記録は `DIAGRAM_REQUESTS.md`（完了）
- 完成報告：`REPORT.md`（v0.1）、`REPORT_v0.2.md`、`REPORT_v0.3.md`、`REPORT_v0.4.md`
- 手動確認：`tests/MANUAL.md`（末尾に自動テストとの分類の表）

## 進め方

- 作業は SPEC 第18章・各仕様書のフェーズ単位。**1フェーズ（1作業）が終わったら報告して止まり、ユーザーの確認を待つ**。
- 報告には、変更したファイル・自動テストの結果・見た目の確認（ヘッドレス Chrome のスクリーンショットなど）・独自に判断した点を含める。
- ロジックは DOM・localStorage に触れない純粋関数（SPEC 21.1）。時刻は必ず `FF.clock.now()`（SPEC 21.2）。バランスの数値は `js/balance.js` に置く。
- 画面の文言は `js/texts.js`。漢字にはふりがなの辞書が自動で付くが、読みが文脈で変わる語は `{漢字|よみ}` と明示する（詳しくは `QUESTIONS_GUIDE.md` と `DECISIONS.md` の判断47・70・72）。
- **見た目は昼だけ（判断176）。夜のテーマは作らない・確かめない**（完成してから足すかを決める）。色は CSS 変数で、昼の値は `:root[data-theme="day"]`。新しい変数は `:root` にも同じ値を置けばよい（夜の値は考えない）。スクリーンショットも昼だけ。
- セーブ：saveVersion 3、`integrity`（改ざん検出）が必須。項目を足すときは saveVersion を上げずに読み込み時に補う形が基本（`state.js` の移行・整合）。
- git：作業用ブランチに commit・push し、`main` へは PR を通す（GitHub Pages は `main` を公開）。
- 公開先：https://torinosuke-games.github.io/fro-fro/ （リポジトリは Organization の `torinosuke-games/fro-fro`。前の `torinosuke/fro-fro` から移した）

## 今の状態（2026-10-04）

- 2026-10-04：ChatGPT（Codex）のリニューアル（PR #10。学習画面・小4算数の図解100問＝`reviewed: false`）を main に取り込み済み。判断221で、図解の問題と Claude の問題を教科・学年・単元で一緒に管理する形にした（小4算数は 110問、教科・学年ごとの単元は `js/units.js`、図は省略可の `diagram`）。Claude の算数の文章題 90問のうち 55問に ChatGPT が図を付けた（PR #12、判断223。図の種類は全36種）。小4算数の図解100問は、価値の低い図30問を外して70問に図（判断225）。図付きの問題は計125問。スマホの学習の入口はコンパクトにした（判断222）。図の確認は、問題文・答えと並べて描いて見る方法で行った（答えを教えていないか、文字の見切れ・重なりがないか）
- 小4算数の手作り問題（判断227〜236）：全18単元で目標の数（大きい単元は基礎9・標準15・発展12、小さい単元は基礎6・標準9・発展7）がそろい、`questions/math_g4_hand.js` に468問（reviewed: false）。小4算数は全部で578問。図の依頼は `DIAGRAM_REQUESTS_2.md`（17問。判断238・241）。確認はデバッグ版のレビューで行う
- v0.1〜v0.3（探索・戦闘・ボス・問題 1062問＋リニューアルの 100問＝1162問。レビューで直した 1問（判断205）だけ `reviewed: false`、残り 1061問は true）：完成・承認済み
- v0.4（勉強量ポイントと引換所）：v0.4-1〜4 承認済み。v0.4-5（手動確認と完成報告）と「引換券を使うしくみ・メールの廃止」（判断173）は確認待ち
- 見た目は昼だけ（夜のテーマは完成後に検討。判断176）。開始画面は試作の見た目（判断174、Google Fonts は判断175、丸文字は全画面＝判断193）。基地・資源・教科のアイコンは生成した絵の試作（判断177、基地の絵は建物のレベルで変わる＝判断180、Lv5 の食料庫は判断182、Lv2〜4 の絵は判断183、絵に煙は描かない＝判断184、Lv6〜10 の絵は先に用意だけ（最大レベルは 5 のまま）＝判断185、建物の画面の絵＝判断186、探索の画面の絵＝判断190・191、行き来する人＝判断194・195、受け取りのアイコンとかご＝判断196・197、主人公の絵・学年・「学ぶ」の整理＝判断198、主人公の絵は小学生用・中学生用の24人から学年で出し分け＝判断204、`config.ART_STYLE` で戻せる。絵は `img/art/`、元の絵は `img/test_img/`）
- 選択問題を書き問題にも使う `inputForm`（判断200・201）：全教科の選択問題 459問のうち 305問に付けた（判断205のレビューで 4問は外し、6問は確認済み。残り 299問は確認待ち・reviewed: false）
- 今後の検討課題：Lv1 の算数の出題範囲を広げる（判断161）。QR コード＋データベース（Supabase など）で引換券の使用済みを確かめる案（SPEC 14.5）。保護者用のロック（SPEC 14.4）
- 自動テスト 520件すべて成功、`node tests/simulate.js` はすべて目標内

## テストの実行方法

- 自動テスト：`node tests/run.js`（`tests/cases/*.js` をすべて実行。失敗があれば終了コード1）
- バランス計算：`node tests/simulate.js`（目標外があれば終了コード1）
- 画面の確認：`index.html` を開く。テスト操作は `index.html?debug=1` のデバッグ画面。手順は `tests/MANUAL.md`
- スマホの確認ページ（Artifact）：ふつう https://claude.ai/artifact/XLuEepmTkNsku4cPPTfqCF 、デバッグ用 https://claude.ai/artifact/4V4WJ32ByTk6YAk7GzfuuW （index.html に `window.FF_DEBUG = true` を足したもの。判断188。`db` の機能付きで、問題のレビューの記録が `reviews` コレクションに入る＝判断202。`ArtifactData` の list で読む。再公開では capabilities を省いて機能を保つ）。変えたファイルを両方に送る
- 問題データの確認済みの数（`tests/cases/questions.js`）は 1072

## ファイル構成の要約

- `index.html` … `<script>` の読み込み順はここが唯一の定義
- `js/` ロジック（純粋関数）：`config.js`、`clock.js`、`balance.js`、`util.js`、`defs.js`（資源・建物・教科・地域・敵・図の種類の定義）、`units.js`（教科・学年ごとの単元）、`integrity.js`（セーブの指紋）、`theme.js`、`state.js`（初期状態・移行・読み込みの検証）、`storage.js`（localStorage はここだけ）、`tickets.js`、`rewards.js`、`buildings.js`（強化・工事の待ち時間・生産）、`answer.js`（判定）、`generators.js`（算数の自動生成）、`learning.js`（出題・回答・学習記録）、`curriculum.js`（リニューアルの出題・単元の絞り込み・問題の番号）、`exam.js`（昇格試験・実力診断）、`exploration.js`（探索）、`battle.js`（戦闘）、`points.js`（勉強量ポイント・引換・券を使う・引換券ID・QR コードの文字列）、`qrcode.js`（自作の QR コード）、`simulator.js`、`texts.js`（文言とふりがな辞書）
- `js/ui/` 画面：`core.js`（部品・ふりがな・ヘッダー・ナビ・画面切替）、`title.js`、`base.js`、`study.js`、`quiz.js`、`exam.js`、`records.js`、`settings.js`、`exploration.js`、`battle.js`、`redeem.js`（引換所と券・印刷）、`renewal.js`（リニューアルの学ぶ・問題画面）。`js/svg/learning.js`（問題の図）、`js/svg/`（建物・風景・教科アイコン・敵の立ち絵）、`js/debug.js`（`?debug=1`）、`js/main.js`（起動・自動保存）
- `questions/` 問題データ（`window.QUESTION_BANK.push(...)`）、`img/` ボスの画像
- `tests/` テスト（`index.html` からは読み込まない。`tests/lib/loader.js` が vm で読み込む）
