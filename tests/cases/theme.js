// 昼／夜テーマ（SPEC_theme.md）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const fs = require('fs');
  const path = require('path');
  const vm = require('vm');
  const ROOT = path.join(__dirname, '..', '..');
  const T = FF.theme;
  const T0 = 1790000000000;
  const at = (h, m = 0) => new Date(2026, 8, 26, h, m, 0);   // 端末のローカル時刻

  // ---- FF.theme.resolve（第4章） ----
  test('自動：6時〜17時台は昼、それ以外は夜（境目：5時・6時・17時・18時・19時）', () => {
    const expect = { 0: 'night', 5: 'night', 6: 'day', 12: 'day', 17: 'day', 18: 'night', 19: 'night', 23: 'night' };
    for (const h in expect) assert.strictEqual(T.resolve('auto', at(Number(h))), expect[h], h + '時');
    assert.strictEqual(T.resolve('auto', at(5, 59)), 'night', '5時59分');
    assert.strictEqual(T.resolve('auto', at(6, 0)), 'day', '6時0分');
    assert.strictEqual(T.resolve('auto', at(17, 59)), 'day', '17時59分');
    assert.strictEqual(T.resolve('auto', at(18, 0)), 'night', '18時0分');
  });

  test('「昼」「夜」は時刻に関係なく固定', () => {
    for (let h = 0; h < 24; h++) {
      assert.strictEqual(T.resolve('day', at(h)), 'day', h + '時');
      assert.strictEqual(T.resolve('night', at(h)), 'night', h + '時');
    }
  });

  test('知らない値・未設定は夜（これまでの見た目）', () => {
    for (const m of [undefined, null, '', 'purple', 1]) {
      assert.strictEqual(T.normalizeMode(m), 'night');
      assert.strictEqual(T.resolve(m, at(12)), 'night');
    }
    assert.deepStrictEqual(plain(T.MODES), ['night', 'day', 'auto']);
    assert.strictEqual(T.DEFAULT_MODE, 'night');
  });

  test('昼の時間帯は config.DAY_HOURS で決まる', () => {
    assert.deepStrictEqual(plain(FF.config.DAY_HOURS), { start: 6, end: 18 });
    const cfg = Object.assign({}, FF.config, { DAY_HOURS: { start: 8, end: 16 } });
    assert.strictEqual(T.resolve('auto', at(7), cfg), 'night');
    assert.strictEqual(T.resolve('auto', at(8), cfg), 'day');
    assert.strictEqual(T.resolve('auto', at(16), cfg), 'night');
  });

  test('resolve は渡された時刻だけで決まり、FF.clock（ゲームの時計）には左右されない', () => {
    FF.clock.set(new Date(2026, 0, 1, 0, 0).getTime());   // ゲームの時計は真夜中
    assert.strictEqual(T.resolve('auto', at(12)), 'day');
    FF.clock.set(new Date(2026, 0, 1, 12, 0).getTime());  // ゲームの時計は正午
    assert.strictEqual(T.resolve('auto', at(22)), 'night');
    const src = fs.readFileSync(path.join(ROOT, 'js', 'theme.js'), 'utf8').replace(/\/\/.*$/gm, '');
    assert.ok(!/new Date|Date\.now|FF\.clock/.test(src), 'theme.js は時刻を自分で取らない');
  });

  // ---- 設定・保存（第1.3節） ----
  test('新規の状態の themeMode は夜', () => {
    assert.strictEqual(FF.state.createDefaultState(T0).settings.themeMode, 'night');
  });

  test('themeMode のない旧いセーブは夜で補われ、saveVersion は 3 のまま', () => {
    const fixture = n => fs.readFileSync(path.join(__dirname, '..', 'fixtures', n), 'utf8');
    for (const text of [fixture('save_v0.json'), fixture('save_v1.json')]) {
      const r = FF.state.parseSave(text, T0);
      assert.strictEqual(r.ok, true);
      assert.strictEqual(r.state.settings.themeMode, 'night');
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
    assert.strictEqual(r.state.settings.themeMode, 'night');
    // 補完が終わったあとの内容で計算されている（保存し直した文字列が検証を通り、themeMode を含む）
    const saved = JSON.parse(r.saveText);
    assert.strictEqual(saved.settings.themeMode, 'night');
    assert.strictEqual(FF.integrity.verify(saved), true);
  });

  test('themeMode は保存・読み込みで残り、知らない値は夜に直される', () => {
    for (const m of ['night', 'day', 'auto']) {
      const s = FF.state.createDefaultState(T0);
      s.settings.themeMode = m;
      assert.strictEqual(FF.state.parseSave(FF.state.serialize(s), T0).state.settings.themeMode, m);
    }
    const bad = FF.state.createDefaultState(T0);
    bad.settings.themeMode = 'purple';
    const r = FF.state.parseSave(FF.state.serialize(bad), T0);
    assert.strictEqual(r.state.settings.themeMode, 'night');
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
    for (const n of ['--text', '--muted', '--ice', '--ember', '--good', '--bad', '--warn']) {
      assert.ok(val(n), n + ' がない');
      for (const bg of bgs) assert.ok(ratio(val(n), bg) >= 4.5, `${n} ${val(n)} on ${bg}: ${ratio(val(n), bg).toFixed(2)}`);
    }
    assert.ok(ratio('#ffffff', val('--ice')) >= 4.5, '選ばれた切り替えボタン（白い文字・--ice の地）');
  });
};
