'use strict';
// ホーム画面に追加できるアプリ（PWA。判断507）：manifest・アイコン・Service Worker・index.html のつなぎが、そろっている
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..');
module.exports = ({ test, assert }) => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  test('PWA：manifest は standalone で、アイコン（192・512・maskable）の実ファイルがある', () => {
    assert.equal(manifest.display, 'standalone');
    assert.ok(manifest.name && manifest.short_name && manifest.start_url && manifest.scope);
    assert.equal(manifest.orientation, 'any');   // 向きは固定しない（学習・町は縦向きのため。横向きは戦闘・フィールドで、ボタンから）
    const sizes = manifest.icons.map(i => i.sizes + ':' + i.purpose);
    assert.ok(sizes.includes('192x192:any') && sizes.includes('512x512:any') && sizes.includes('512x512:maskable'));
    manifest.icons.forEach(i => assert.ok(fs.existsSync(path.join(ROOT, i.src)), i.src));
  });
  test('PWA：index.html が manifest・アイコン・display.js を読み、Service Worker は http(s) のときだけ登録する', () => {
    assert.ok(html.includes('rel="manifest" href="manifest.webmanifest"'));
    assert.ok(html.includes('apple-touch-icon'));
    assert.ok(html.indexOf('js/ui/core.js') < html.indexOf('js/ui/display.js'));
    assert.ok(/\^https\?:\$\/\.test\(location\.protocol\)/.test(html));
  });
  test('PWA：sw.js は文法が正しく、自分のサイトの GET だけを扱う', () => {
    const src = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    assert.doesNotThrow(() => new vm.Script(src));
    assert.ok(/url\.origin !== self\.location\.origin/.test(src) && /req\.method !== 'GET'/.test(src));
  });
};
