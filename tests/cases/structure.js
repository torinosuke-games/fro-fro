// ファイル構成のルール（SPEC 14.1・21.1・3.2）
module.exports = ({ test, assert }) => {
  const fs = require('fs');
  const path = require('path');
  const { ROOT, ALL_SCRIPTS, LOGIC_FILES, UI_FILES } = require('../lib/loader');
  const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
  const list = dir => fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })
    .flatMap(d => d.isDirectory() ? list(dir + '/' + d.name) : [dir + '/' + d.name]).filter(f => f.endsWith('.js'));
  // コメントを除いたコード（説明文の中の単語に反応しないように）
  const code = f => read(f).replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"])\/\/.*$/gm, '$1');

  test('js/ と questions/ のすべてのファイルを index.html が読み込んでいる', () => {
    const files = list('js').concat(list('questions'));
    const missing = files.filter(f => !ALL_SCRIPTS.includes(f));
    assert.deepStrictEqual(missing, []);
  });

  test('index.html は tests/ を読み込まない', () => {
    assert.ok(!ALL_SCRIPTS.some(f => f.startsWith('tests/')));
  });

  test('ES Modules・fetch・外部 URL を使わない', () => {
    for (const f of ALL_SCRIPTS) {
      const src = code(f);
      assert.ok(!/^\s*(import|export)\s/m.test(src), `${f}: import/export`);
      assert.ok(!/\bfetch\s*\(/.test(src), `${f}: fetch`);
      assert.ok(!/XMLHttpRequest/.test(src), `${f}: XMLHttpRequest`);
    }
    const html = read('index.html');
    assert.ok(!/type="module"/.test(html));
    // 外部の URL は Google Fonts だけ（判断175）。外部のスクリプトは読まない
    for (const m of html.match(/(src|href)="(https?:)?\/\/[^"]*"/g) || []) {
      assert.ok(/^href="https:\/\/fonts\.(googleapis|gstatic)\.com(\/|")/.test(m), '外部の URL を読み込んでいる：' + m);
    }
    assert.ok(!/<script[^>]+src="(https?:)?\/\//.test(html), '外部のスクリプトを読み込んでいる');
  });

  test('ロジックのファイルは document・localStorage・alert を直接使わない（storage.js を除く）', () => {
    for (const f of LOGIC_FILES) {
      if (f === 'js/storage.js') continue;
      const src = code(f);
      assert.ok(!/\bdocument\b/.test(src), `${f}: document`);
      assert.ok(!/localStorage/.test(src), `${f}: localStorage`);
      assert.ok(!/\balert\s*\(/.test(src), `${f}: alert`);
    }
  });

  test('画面のファイルは innerHTML を使わない（名前などは textContent で表示する）', () => {
    for (const f of UI_FILES) {
      const src = code(f);
      assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML|document\.write/.test(src), `${f}: HTML 文字列を直接挿入している`);
    }
  });

  test('画面のファイルも Date.now() を直接呼ばない（clock.now() を使う）', () => {
    for (const f of UI_FILES) assert.ok(!/Date\.now\s*\(/.test(code(f)), f);
  });

  test('プレイヤー名をコードに直接書いていない（{name} テンプレートを使う）', () => {
    for (const f of UI_FILES.concat(['js/texts.js'])) {
      const src = read(f);
      assert.ok(!/隊長、/.test(src.replace(/\{name\}隊長、/g, '')), `${f}: 「○○隊長、」を直接書いている`);
    }
  });

  test('絵の見た目（判断177）で使う img/art/ の絵がすべてある', () => {
    const names = ['field_lv1', 'field_lv5', 'furnace', 'housing', 'lumber', 'mine', 'quarry', 'foodhall', 'watchtower',
      'res-wood', 'res-iron', 'res-stone', 'res-food', 'subj-jp', 'subj-math', 'subj-sci', 'subj-soc', 'subj-en'];
    const missing = names.filter(n => !fs.existsSync(path.join(ROOT, 'img/art', n + '.jpg')));
    assert.deepStrictEqual(missing, []);
  });
};
