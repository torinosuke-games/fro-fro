// 時刻の一元化（SPEC 21.2）
module.exports = ({ test, FF, assert }) => {
  const clock = FF.clock;

  test('set で固定した時刻を now が返す', () => {
    clock.set(1000);
    assert.strictEqual(clock.now(), 1000);
  });

  test('advance で固定中の時刻が進む', () => {
    clock.set(1000);
    clock.advance(500);
    assert.strictEqual(clock.now(), 1500);
  });

  test('固定していないときも advance で進む', () => {
    const before = clock.now();
    clock.advance(60 * 60 * 1000);
    const diff = clock.now() - before;
    assert.ok(diff >= 60 * 60 * 1000 && diff < 60 * 60 * 1000 + 5000, `差が ${diff}`);
  });

  test('reset で実際の時刻に戻る', () => {
    clock.set(1000);
    clock.advance(10);
    clock.reset();
    assert.ok(Math.abs(clock.now() - Date.now()) < 5000);
  });

  test('ロジックのファイルは Date.now() を直接呼ばない', () => {
    const fs = require('fs');
    const path = require('path');
    const { ROOT, LOGIC_FILES } = require('../lib/loader');
    for (const f of LOGIC_FILES) {
      if (f === 'js/clock.js') continue;
      const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
      assert.ok(!/Date\.now\s*\(/.test(src), `${f} が Date.now() を呼んでいる`);
    }
  });
};
