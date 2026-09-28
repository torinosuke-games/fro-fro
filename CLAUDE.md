# CLAUDE.md（開発メモ）

ブラウザだけで動く雪原サバイバル × 学習ゲーム「FROZEN FRONTIER」。`index.html` を開くだけで動く（`file://`、サーバー・外部ライブラリ・ES Modules・fetch なし）。

## 文書の場所（必要なときだけ読む）

- 仕様：`SPEC.md`（v0.1＋v0.4 の勉強量ポイントと引換所）、`SPEC_v0.2.md`（探索。矛盾したらこちらが優先）、`SPEC_save_integrity.md`、`SPEC_theme.md`、`SPEC_theme_default_day.md`、`SPEC_v0.3.md`、`SPEC_v0.3_battle.md`
- 設計：`DESIGN.md`（v0.2 は第12章、v0.3 戦闘は第13章、v0.4 は第14章）
- **判断した点（19〜）と進捗の詳細：`DECISIONS.md`**。仕様にない判断をしたら、その末尾に番号を続けて追記する（次は 180）。関係する機能を変える前に、該当する判断を検索して読む
- 問題データの書き方：`QUESTIONS_GUIDE.md`（`questions/*.js` を作る・直す前に必ず読む）
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

## 今の状態（2026-09-28）

- v0.1〜v0.3（探索・戦闘・ボス・問題 1062問すべて `reviewed: true`）：完成・承認済み
- v0.4（勉強量ポイントと引換所）：v0.4-1〜4 承認済み。v0.4-5（手動確認と完成報告）と「引換券を使うしくみ・メールの廃止」（判断173）は確認待ち
- 見た目は昼だけ（夜のテーマは完成後に検討。判断176）。開始画面は試作の見た目（判断174、Google Fonts は判断175）。基地・資源・教科のアイコンは生成した絵の試作（判断177、`config.ART_STYLE` で戻せる。絵は `img/art/`、元の絵は `img/test_img/`）
- 今後の検討課題：Lv1 の算数の出題範囲を広げる（判断161）。QR コード＋データベース（Supabase など）で引換券の使用済みを確かめる案（SPEC 14.5）。保護者用のロック（SPEC 14.4）
- 自動テスト 403件すべて成功、`node tests/simulate.js` はすべて目標内

## テストの実行方法

- 自動テスト：`node tests/run.js`（`tests/cases/*.js` をすべて実行。失敗があれば終了コード1）
- バランス計算：`node tests/simulate.js`（目標外があれば終了コード1）
- 画面の確認：`index.html` を開く。テスト操作は `index.html?debug=1` のデバッグ画面。手順は `tests/MANUAL.md`
- 問題データの確認済みの数（`tests/cases/questions.js`）は 1062

## ファイル構成の要約

- `index.html` … `<script>` の読み込み順はここが唯一の定義
- `js/` ロジック（純粋関数）：`config.js`、`clock.js`、`balance.js`、`util.js`、`defs.js`（資源・建物・教科・地域・敵の定義）、`integrity.js`（セーブの指紋）、`theme.js`、`state.js`（初期状態・移行・読み込みの検証）、`storage.js`（localStorage はここだけ）、`tickets.js`、`rewards.js`、`buildings.js`（強化・工事の待ち時間・生産）、`answer.js`（判定）、`generators.js`（算数の自動生成）、`learning.js`（出題・回答・学習記録）、`exam.js`（昇格試験・実力診断）、`exploration.js`（探索）、`battle.js`（戦闘）、`points.js`（勉強量ポイント・引換・券を使う・引換券ID・QR コードの文字列）、`qrcode.js`（自作の QR コード）、`simulator.js`、`texts.js`（文言とふりがな辞書）
- `js/ui/` 画面：`core.js`（部品・ふりがな・ヘッダー・ナビ・画面切替）、`title.js`、`base.js`、`study.js`、`quiz.js`、`exam.js`、`records.js`、`settings.js`、`exploration.js`、`battle.js`、`redeem.js`（引換所と券・印刷）。`js/svg/`（建物・風景・教科アイコン・敵の立ち絵）、`js/debug.js`（`?debug=1`）、`js/main.js`（起動・自動保存）
- `questions/` 問題データ（`window.QUESTION_BANK.push(...)`）、`img/` ボスの画像
- `tests/` テスト（`index.html` からは読み込まない。`tests/lib/loader.js` が vm で読み込む）
