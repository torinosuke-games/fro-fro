// ゲーム本体のスクリプトを Node.js の vm で読み込む（ブラウザの <script> 読み込みと同じ方式）。
// 読み込み順は index.html の <script src> から読み取る（順番の定義を1か所にするため）。
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');

// 画面（DOM）を使うファイル。テストでは読み込まない。
const UI_PATTERN = /^js\/(ui|svg)\/|^js\/(debug|main)\.js$/;

const ALL_SCRIPTS = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1]);
// 図の見直しで外した図の上書き（questions/diagram-fixes.js。判断495）は、ふつうのテストでは読み込まない（もとの図の依頼どおりの数を確かめるテストのため）。
// 外したあとの問題を調べるテストは、LOGIC_FILES_WITH_FIXES で読み込む
const LOGIC_FILES_WITH_FIXES = ALL_SCRIPTS.filter(f => !UI_PATTERN.test(f));
const LOGIC_FILES = LOGIC_FILES_WITH_FIXES.filter(f => f !== 'questions/diagram-fixes.js');
const UI_FILES = ALL_SCRIPTS.filter(f => UI_PATTERN.test(f));
const QUESTION_FILES = LOGIC_FILES.filter(f => f.startsWith('questions/'));

// files: ROOT からの相対パスの配列（省略時はロジック層すべて）
function load(files) {
  const context = { console: console, setTimeout: setTimeout, clearTimeout: clearTimeout };
  context.window = context;
  vm.createContext(context);
  for (const f of files || LOGIC_FILES) {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    vm.runInContext(code, context, { filename: f });
  }
  return context;
}

module.exports = { load, ROOT, ALL_SCRIPTS, LOGIC_FILES, LOGIC_FILES_WITH_FIXES, UI_FILES, QUESTION_FILES };
