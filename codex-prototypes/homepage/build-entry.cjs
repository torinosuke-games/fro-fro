// 本体と同じ読み込み順を保ち、比較用の設定と見た目だけを追加する。
// リポジトリ直下の index.html を変更したときに再実行する。
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const changes = [
  ['<meta charset="utf-8">', '<meta charset="utf-8">\n  <base href="../../">'],
  ['<title>FROZEN FRONTIER</title>', '<title>FROZEN FRONTIER · ChatGPT デザイン案</title>'],
  ['<link rel="stylesheet" href="css/tower.css">', '<link rel="stylesheet" href="css/tower.css">\n  <link rel="stylesheet" href="codex-prototypes/homepage/design.css">'],
  ['<script src="js/config.js"></script>', '<script src="js/config.js"></script>\n  <script src="codex-prototypes/homepage/config.js"></script>'],
  ['<script src="js/main.js"></script>', '<script src="codex-prototypes/homepage/village-map.js"></script>\n  <script src="codex-prototypes/homepage/design.js"></script>\n  <script src="js/main.js"></script>']
];
for (const [before, after] of changes) {
  if (html.split(before).length !== 2) throw new Error('本体の入口が変わっています。差し込み位置を確認してください: ' + before);
  html = html.replace(before, after);
}
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
