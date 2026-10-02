// ファイル構成のルール（SPEC 14.1・21.1・3.2）
module.exports = ({ test, FF, assert, plain }) => {
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
    // 基地の雪原は base.js の FIELD_LEVELS のレベルの絵（判断180・183・185）
    const levels = (read('js/ui/base.js').match(/var FIELD_LEVELS = \[([\d,\s]+)\]/) || [])[1] || '';
    assert.ok(levels, 'FIELD_LEVELS が見つからない');
    const fields = levels.split(',').map(s => 'field_lv' + s.trim());
    const names = fields.concat(['furnace', 'housing', 'lumber', 'mine', 'quarry', 'foodhall', 'watchtower',
      'res-wood', 'res-iron', 'res-stone', 'res-food', 'subj-jp', 'subj-math', 'subj-sci', 'subj-soc', 'subj-en',
      'region-snowfield', 'region-forest', 'region-glacier'].concat(['lumberjack', 'miner', 'mason', 'cook', 'smith', 'hunter', 'elder', 'child'].map(n => 'villager-' + n)));
    const missing = names.filter(n => !fs.existsSync(path.join(ROOT, 'img/art', n + (n.startsWith('villager-') ? '.png' : '.jpg'))));   // 人の絵は透明の背景の PNG（判断195）
    assert.deepStrictEqual(missing, []);
  });

  test('主人公の絵（判断204）：小学生用・中学生用の12人ずつの絵がすべてあり、学年で候補が分かれる', () => {
    const D = FF.defs;
    assert.strictEqual(D.AVATARS_ELEM.length, 12);
    assert.strictEqual(D.AVATARS_JR.length, 12);
    assert.deepStrictEqual(plain(D.AVATARS), plain(D.AVATARS_ELEM).concat(plain(D.AVATARS_JR)));
    const missing = D.AVATARS.filter(id => !fs.existsSync(path.join(ROOT, 'img/art', 'avatar-' + id + '.jpg')));
    assert.deepStrictEqual(plain(missing), []);
    for (const g of [1, 4, 6, null]) assert.strictEqual(D.avatarsFor(g), D.AVATARS_ELEM, String(g));
    for (const g of [7, 8, 9]) assert.strictEqual(D.avatarsFor(g), D.AVATARS_JR, String(g));
  });
};
