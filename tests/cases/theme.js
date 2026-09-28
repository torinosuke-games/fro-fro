// テーマ（SPEC_theme.md。2026-09-28 からいつも昼。夜の配色は使わずに残してある。判断176）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const fs = require('fs');
  const path = require('path');
  const vm = require('vm');
  const ROOT = path.join(__dirname, '..', '..');
  const T = FF.theme;
  const T0 = 1790000000000;
  const at = (h, m = 0) => new Date(2026, 8, 26, h, m, 0);   // 端末のローカル時刻

  // ---- テーマはいつも昼（2026-09-28 から。判断176） ----
  test('テーマはいつも昼：どの設定・どの時刻でも resolve は day、設定の値も day に直る', () => {
    for (const m of ['day', 'night', 'auto', 'purple', undefined, null]) {
      for (const h of [0, 5, 6, 12, 17, 18, 23]) assert.strictEqual(T.resolve(m, at(h)), 'day', `${m} ${h}時`);
      assert.strictEqual(T.normalizeMode(m), 'day', String(m));
    }
    assert.deepStrictEqual(plain(T.MODES), ['day']);
    assert.strictEqual(T.DEFAULT_MODE, 'day');
  });

  test('theme.js は時刻を自分で取らない（FF.clock にも関わらない）', () => {
    const src = fs.readFileSync(path.join(ROOT, 'js', 'theme.js'), 'utf8').replace(/\/\/.*$/gm, '');
    assert.ok(!/new Date|Date\.now|FF\.clock/.test(src));
  });

  test('画面はいつも昼（テーマの切り替えの画面・操作がない）', () => {
    const core = fs.readFileSync(path.join(ROOT, 'js', 'ui', 'core.js'), 'utf8');
    assert.ok(!/THEMED_SCREENS/.test(core), '画面ごとの昼夜の切り替えはない');
    assert.ok(!/themeMode/.test(fs.readFileSync(path.join(ROOT, 'js', 'ui', 'settings.js'), 'utf8')), '設定画面にテーマの切り替えはない');
    assert.ok(!/themeMode|themeHourOverride/.test(fs.readFileSync(path.join(ROOT, 'js', 'debug.js'), 'utf8')), 'デバッグ画面にテーマの操作はない');
  });

  test('新規の状態の themeMode は昼', () => {
    assert.strictEqual(FF.state.createDefaultState(T0).settings.themeMode, 'day');
  });

  test('前に「夜」や「自動」を選んでいたセーブは、読み込むと昼になる', () => {
    for (const m of ['night', 'auto']) {
      const s = FF.state.createDefaultState(T0);
      s.settings.themeMode = m;
      const r = FF.state.parseSave(FF.state.serialize(s), T0);
      assert.strictEqual(r.ok, true);
      assert.strictEqual(r.state.settings.themeMode, 'day');
    }
  });

  test('themeMode のない旧いセーブは昼（初期値）で補われ、saveVersion は 3 のまま', () => {
    const fixture = n => fs.readFileSync(path.join(__dirname, '..', 'fixtures', n), 'utf8');
    for (const text of [fixture('save_v0.json'), fixture('save_v1.json')]) {
      const r = FF.state.parseSave(text, T0);
      assert.strictEqual(r.ok, true);
      assert.strictEqual(r.state.settings.themeMode, 'day');
      assert.strictEqual(r.state.saveVersion, 3);
      assert.strictEqual(FF.config.SAVE_VERSION, 3, '新しい saveVersion は作らない');
    }
  });

  test('integrity 付き（saveVersion 3）で themeMode のないセーブも読み込め、補ったあとの内容で integrity が付き直す', () => {
    const s = plain(FF.state.createDefaultState(T0));
    delete s.settings.themeMode;                        // テーマを追加する前に保存されたデータ
    const text = FF.state.serialize(s);
    assert.strictEqual(FF.integrity.verify(JSON.parse(text)), true);
    const r = FF.state.parseSave(text, T0);
    assert.strictEqual(r.ok, true, r.error);
    assert.strictEqual(r.state.settings.themeMode, 'day');
    // 補完が終わったあとの内容で計算されている（保存し直した文字列が検証を通り、themeMode を含む）
    const saved = JSON.parse(r.saveText);
    assert.strictEqual(saved.settings.themeMode, 'day');
    assert.strictEqual(FF.integrity.verify(saved), true);
  });

  test('themeMode は保存・読み込みで昼のまま。知らない値も昼に直り、integrity が付き直す', () => {
    const bad = FF.state.createDefaultState(T0);
    bad.settings.themeMode = 'purple';
    const r = FF.state.parseSave(FF.state.serialize(bad), T0);
    assert.strictEqual(r.state.settings.themeMode, 'day');
    assert.strictEqual(FF.integrity.verify(JSON.parse(r.saveText)), true);
  });

  // ---- SVG の配色（第1.1節） ----
  // 画面のファイルはテストの読み込みに含まれないので、ここで SVG の2ファイルだけを読み込む（DOM の代わりの簡単な部品で描く）
  function loadSvg() {
    const made = [];
    FF.ui = FF.ui || {};
    FF.ui.svg = function (tag, attrs, children) {
      const node = { tag, attrs: Object.assign({}, attrs || {}), children: [], style: {}, addEventListener() {}, appendChild(c) { this.children.push(c); } };
      (Array.isArray(children) ? children : children ? [children] : []).forEach(c => { if (c) node.children.push(c); });
      made.push(node);
      return node;
    };
    for (const f of ['js/svg/buildings.js', 'js/svg/scene.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
    return made;
  }
  const badValues = made => made.flatMap(n => Object.entries(n.attrs).filter(([, v]) => v === undefined || v === null || /undefined|null|NaN/.test(String(v))).map(([k, v]) => n.tag + '.' + k + '=' + v));

  test('夜の配色は、テーマを入れる前の値のまま（建物・背景）', () => {
    loadSvg();
    assert.deepStrictEqual(plain(FF.svgBuildings.PALETTES.night), {
      wood: '#6b4a2f', woodLight: '#8a6240', woodDark: '#48301d',
      metal: '#3b4b5a', metalLight: '#5b7084', metalDark: '#26323d',
      stone: '#5f6873', stoneLight: '#808a95', stoneDark: '#434b54',
      snow: '#e6f1fa', snowShade: '#b9cfe0',
      win: '#ffcf7a', winOff: '#1d2833', fire: '#ffb35c', ember: '#ff7a2e',
      brokenPit: '#1a1410', furnaceMouth: '#2a120a', beacon: '#ff5a4a',
      smokeDark: '#4a5561', smokeLight: '#9aa9b6', rope: '#9aa9b6',
      tentBrown: '#6d5a44', tentGrey: '#56606b', tentDoor: '#231a12', door: '#2a1d12',
      mineMouth: '#120d0a', wheel: '#111', ore: '#8c6a4f',
      domeGlass: 'rgba(143,211,255,0.25)', domeFrame: '#a6ddff', domePlants: 'rgba(127,224,166,0.35)',
      outline: '#8ea2b4', towerTrim: '#eef6ff', pole: '#c9d7e3'
    });
    assert.deepStrictEqual(plain(FF.svgScene.PALETTES.night), {
      sky: ['#050912', '#12233a', '#2b4560'], ground: ['#b8cde0', '#8ba4bb', '#4d647a'],
      aurora: [['#3cffc1', 0], ['#3cffc1', 0.22], ['#6f8cff', 0]], fire: [['#ffd08a', 0.55], ['#ff8a3d', 0.2], ['#ff8a3d', 0]],
      stars: '#dbe8ff', farMountain: '#1e3148', snowcap: '#c7d9e8', nearMountain: '#2c4560',
      trail: '#6f8aa3', drift: '#d9e7f2', sun: null, cloud: null
    });
  });

  test('昼と夜の配色表は同じ項目をそろえて持つ', () => {
    loadSvg();
    for (const P of [FF.svgBuildings.PALETTES, FF.svgScene.PALETTES]) {
      assert.deepStrictEqual(Object.keys(P.day).sort(), Object.keys(P.night).sort());
    }
    assert.strictEqual(FF.svgBuildings.colors('unknown'), FF.svgBuildings.PALETTES.night, '知らないテーマは夜');
  });

  test('全建物・全レベル・昼夜で描いても、色の抜け（undefined など）がない', () => {
    const made = loadSvg();
    const B = FF.svgBuildings;
    for (const theme of ['night', 'day', undefined]) {
      for (const id of ['furnace', 'housing', 'lumber', 'mine', 'quarry', 'foodhall']) for (let L = 1; L <= 5; L++) B[id](L, theme);
      for (let f = 1; f <= 5; f++) B.watchtower(f, theme);
      B.lockedOutline(0, theme);
      for (let f = 1; f <= 5; f++) {
        const s = FF.state.createDefaultState(T0);
        s.buildings.furnace.level = f;
        FF.svgScene.render(s, () => {}, theme);
      }
    }
    assert.deepStrictEqual(badValues(made), []);
  });

  test('昼は太陽と雲、夜は星とオーロラを描く（描き分けがテーマで切り替わる）', () => {
    const made = loadSvg();
    const s = FF.state.createDefaultState(T0);
    const find = (tree, pred, out = []) => { if (pred(tree)) out.push(tree); (tree.children || []).forEach(c => find(c, pred, out)); return out; };
    const night = FF.svgScene.render(s, () => {}, 'night');
    const day = FF.svgScene.render(s, () => {}, 'day');
    const hasId = (t, id) => find(t, n => n.attrs && n.attrs.id === id).length > 0;
    assert.ok(hasId(night, 'grAurora') && !hasId(night, 'grSun'));
    assert.ok(hasId(day, 'grSun') && !hasId(day, 'grAurora'));
    const sky = t => find(t, n => n.attrs && n.attrs.id === 'grSky')[0].children.map(c => c.attrs['stop-color']);
    assert.deepStrictEqual(sky(night), ['#050912', '#12233a', '#2b4560']);
    assert.notDeepStrictEqual(sky(day), sky(night));
    assert.ok(made.length > 0);
  });

  // ---- CSS（第1.1節） ----
  test('CSS：昼で上書きする変数は、すべて夜（:root）にも定義されている', () => {
    const css = fs.readFileSync(path.join(ROOT, 'css', 'style.css'), 'utf8');
    const block = sel => { const i = css.indexOf(sel + ' {'); return css.slice(i, css.indexOf('}', i)); };
    const names = b => [...b.matchAll(/(--[a-z0-9-]+)\s*:/g)].map(m => m[1]);
    const night = names(block(':root'));
    const day = names(block(':root[data-theme="day"]'));
    assert.ok(day.length >= 20);
    assert.deepStrictEqual(day.filter(n => !night.includes(n)), []);
  });

  test('CSS：昼の文字色は、白いパネルと昼の背景の上でコントラスト比 4.5 以上（WCAG AA）', () => {
    const css = fs.readFileSync(path.join(ROOT, 'css', 'style.css'), 'utf8');
    const i = css.indexOf(':root[data-theme="day"] {');
    const day = css.slice(i, css.indexOf('}', i));
    const val = n => (day.match(new RegExp(n + ':\\s*(#[0-9a-fA-F]{6})')) || [])[1];
    const lum = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)).reduce((a, v, k) => a + v * [0.2126, 0.7152, 0.0722][k], 0);
    const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const bgs = ['#ffffff', val('--bg-1')];
    for (const n of ['--text', '--muted', '--ice', '--ember', '--good', '--bad', '--warn', '--pt']) {
      assert.ok(val(n), n + ' がない');
      for (const bg of bgs) assert.ok(ratio(val(n), bg) >= 4.5, `${n} ${val(n)} on ${bg}: ${ratio(val(n), bg).toFixed(2)}`);
    }
    assert.ok(ratio('#ffffff', val('--ice')) >= 4.5, '選ばれた切り替えボタン（白い文字・--ice の地）');
  });

  // ---- 開始画面・対象の画面（SPEC_theme_default_day.md 1.2・1.3） ----
  test('開始画面の空（renderSky）は、昼の配色で太陽と雲を描き、建物は描かない', () => {
    loadSvg();
    const find = (tree, pred, out = []) => { if (pred(tree)) out.push(tree); (tree.children || []).forEach(c => find(c, pred, out)); return out; };
    const day = FF.svgScene.renderSky('day');
    assert.ok(find(day, n => n.attrs && n.attrs.id === 'grSun').length === 1);
    assert.ok(find(day, n => n.attrs && n.attrs.class === 'bld').length === 0);
    const sky = find(day, n => n.attrs && n.attrs.id === 'grSky')[0].children.map(c => c.attrs['stop-color']);
    assert.deepStrictEqual(sky, plain(FF.svgScene.PALETTES.day.sky));
  });
};
