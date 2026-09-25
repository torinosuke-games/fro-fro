// ゲーム本体のスクリプトを Node.js の vm で読み込む（ブラウザの <script> 読み込みと同じ方式）。
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');

// ロジック層とデータ層（index.html と同じ順番）。
// フェーズ6で index.html を作ったら、index.html の <script> から読み取る方式に切り替える。
const LOGIC_FILES = [
  'js/config.js',
  'js/clock.js',
  'js/balance.js',
  'js/defs.js',
  'js/util.js',
  'js/state.js',
  'js/storage.js',
  'js/tickets.js',
  'js/rewards.js',
  'js/buildings.js',
  'js/answer.js',
  'js/generators.js',
  // questions/*.js はここに入る（QUESTION_FILES）
  'js/learning.js',
  'js/exam.js',
  'js/simulator.js'
];

// 問題データ（ファイル名順）
const QUESTION_FILES = fs.readdirSync(path.join(ROOT, 'questions')).filter(f => f.endsWith('.js')).sort().map(f => 'questions/' + f);
const i = LOGIC_FILES.indexOf('js/learning.js');
LOGIC_FILES.splice(i, 0, ...QUESTION_FILES);

// files: ROOT からの相対パスの配列
function load(files) {
  const context = { console: console };
  context.window = context;
  vm.createContext(context);
  for (const f of files || LOGIC_FILES) {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    vm.runInContext(code, context, { filename: f });
  }
  return context;
}

module.exports = { load, ROOT, LOGIC_FILES, QUESTION_FILES };
