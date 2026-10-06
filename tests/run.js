// ロジックの自動テスト（node tests/run.js）
// tests/cases/*.js をすべて実行し、「成功数 / 失敗数」と失敗したテストの名前・理由を表示する。
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { load } = require('./lib/loader');

// vm 内のオブジェクトは Object.prototype が別物なので、比較の前に通常のオブジェクトへ変換する
const plain = x => JSON.parse(JSON.stringify(x));

const casesDir = path.join(__dirname, 'cases');
const tests = [];

for (const file of fs.readdirSync(casesDir).filter(f => f.endsWith('.js')).sort()) {
  const group = path.basename(file, '.js');
  const ctx = load();   // ファイルごとに新しい環境で読み込む
  const register = (name, fn) => tests.push({ name: `[${group}] ${name}`, fn, FF: ctx.FF });
  require(path.join(casesDir, file))({ test: register, FF: ctx.FF, ctx, assert, plain });
}

let passed = 0;
const failed = [];
(async () => {
for (const t of tests) {
  try {
    await t.fn();   // async のテスト（同期の通信など）も待つ
    passed++;
  } catch (e) {
    failed.push({ name: t.name, reason: e && e.message ? e.message : String(e) });
  } finally {
    t.FF.clock.reset();
  }
}

for (const f of failed) {
  console.log(`✗ ${f.name}`);
  console.log('    ' + f.reason.split('\n').join('\n    '));
}
console.log(`\n成功 ${passed} / 失敗 ${failed.length}（全 ${tests.length} 件）`);
process.exitCode = failed.length === 0 ? 0 : 1;
})();
