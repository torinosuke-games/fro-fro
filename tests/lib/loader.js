// ゲーム本体のスクリプトを Node.js の vm で読み込む（ブラウザの <script> 読み込みと同じ方式）。
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');

// files: ROOT からの相対パスの配列（index.html と同じ順番で渡す）
function load(files) {
  const context = { console: console };
  context.window = context;
  vm.createContext(context);
  for (const f of files) {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    vm.runInContext(code, context, { filename: f });
  }
  return context;
}

module.exports = { load, ROOT };
