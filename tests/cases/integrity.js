// セーブデータの改ざん検出（SPEC_save_integrity.md 第5章）
module.exports = ({ test, FF, assert, plain }) => {
  const I = FF.integrity;
  const S = FF.state;
  const T0 = 1790000000000;
  const fs = require('fs');
  const path = require('path');
  const fixture = name => fs.readFileSync(path.join(__dirname, '..', 'fixtures', name), 'utf8');

  function fakeStorage() {
    const data = {};
    return {
      data,
      getItem: k => (Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null),
      setItem: (k, v) => { data[k] = String(v); },
      removeItem: k => { delete data[k]; }
    };
  }

  // 遊んだ途中のようなセーブ（資源・建物・探索・学習記録が入っている）
  function played() {
    let s = S.createDefaultState(T0);
    s.player.name = 'ユキ';
    s.resources = { wood: 1234, iron: 56, stone: 789, food: 10 };
    s.buildings.furnace.level = 3;
    s.buildings.quarry = { level: 2, lastCollectedAt: T0 };
    s.tickets = { count: 7, lastRecoveredAt: T0 + 1000 };
    s.learning.unlocked.math = 5;
    s.learning.stats.math = { 3: { attempts: 4, correct: 3, choice: { attempts: 1, correct: 1 }, input: { attempts: 3, correct: 2 }, hintsUsed: 1, recent: [1, 0, 1, 1] } };
    s.learning.history.push({ at: T0, qid: 'q1', correct: true, reward: 26 });
    s = FF.exploration.advance(s, 'snowfield', T0, FF.util.makeRng(1)).state;
    return s;
  }
  const samples = () => [S.createDefaultState(T0), played(), S.parseSave(fixture('save_v1.json'), T0).state];

  // ---- sign / verify（第2章） ----
  test('同じデータなら常に同じ指紋になる（決定的）', () => {
    for (const s of samples()) {
      assert.strictEqual(I.sign(s), I.sign(JSON.parse(JSON.stringify(s))));
      assert.match(I.sign(s), /^[0-9a-f]{14}$/);
    }
  });

  test('キーの並びが変わっても、中身が同じなら同じ指紋になる', () => {
    const s = played();
    const reversed = o => (o && typeof o === 'object' && !Array.isArray(o))
      ? Object.keys(o).reverse().reduce((acc, k) => { acc[k] = reversed(o[k]); return acc; }, {})
      : (Array.isArray(o) ? o.map(reversed) : o);
    const r = reversed(plain(s));
    assert.notStrictEqual(JSON.stringify(r), JSON.stringify(plain(s)), '並びが本当に変わっている');
    assert.strictEqual(I.sign(r), I.sign(s));
  });

  test('中身が1か所でも変われば、ほぼ確実に別の指紋になる', () => {
    for (const s of samples()) {
      const base = I.sign(s);
      const edits = [
        x => { x.resources.wood += 1; },
        x => { x.resources.iron = 999999; },
        x => { x.buildings.furnace.level = 5; },
        x => { x.tickets.count += 1; },
        x => { x.player.name += 'ア'; },
        x => { x.learning.unlocked.english = 9; },
        x => { x.exploration.regions.snowfield.position = 9; },
        x => { x.flags.introSeen = !x.flags.introSeen; }
      ];
      for (const e of edits) {
        const c = JSON.parse(JSON.stringify(s));
        e(c);
        assert.notStrictEqual(I.sign(c), base, String(e));
      }
    }
  });

  test('ハッシュの雪崩効果：1文字ちがうだけで指紋が大きく変わる（1万通りで衝突なし）', () => {
    const seen = new Set();
    for (let i = 0; i < 10000; i++) seen.add(I.hash('{"wood":' + i + '}'));
    assert.strictEqual(seen.size, 10000);
    const a = I.hash('abc'), b = I.hash('abd');
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++;
    assert.ok(diff >= 8, `${a} / ${b}`);
  });

  test('verify：正しい指紋なら true、ない・ちがう・文字列でないなら false', () => {
    const s = plain(played());
    const signed = Object.assign({}, s, { integrity: I.sign(s) });
    assert.strictEqual(I.verify(signed), true);
    assert.strictEqual(I.verify(s), false);
    assert.strictEqual(I.verify(Object.assign({}, s, { integrity: '00000000000000' })), false);
    assert.strictEqual(I.verify(Object.assign({}, s, { integrity: 12345 })), false);
    assert.strictEqual(I.verify(null), false);
  });

  // ---- 保存・読み込み（第3章・第5章） ----
  test('保存した文字列には integrity が入り、そのまま読み込むと検証を通って元の状態に戻る', () => {
    for (const s of samples()) {
      const text = S.serialize(s);
      const raw = JSON.parse(text);
      assert.strictEqual(typeof raw.integrity, 'string');
      assert.strictEqual(I.verify(raw), true);
      const r = S.parseSave(text, T0 + 5);
      assert.strictEqual(r.ok, true, r.error);
      assert.deepStrictEqual(plain(r.state), plain(s));
      assert.ok(!('integrity' in r.state), '読み込んだ状態には integrity を残さない');
    }
  });

  test('保存（localStorage）→ 読み込みでも検証を通る（起動時の読み込みと同じ経路）', () => {
    const ls = fakeStorage();
    const s = played();
    FF.storage.save(s, ls);
    assert.strictEqual(I.verify(JSON.parse(ls.getItem(FF.config.SAVE_KEY))), true);
    const r = FF.storage.load(T0, ls);
    assert.strictEqual(r.status, 'loaded');
    assert.deepStrictEqual(plain(r.state), plain(s));
  });

  // 書き出した文字列の数値などを書き換える
  const tampers = [
    ['木材の数', t => t.replace('"wood":1234', '"wood":99999')],
    ['中央炉のレベル', t => t.replace('"furnace":{"level":3}', '"furnace":{"level":5}')],
    ['チケットの枚数', t => t.replace('"count":7', '"count":20')],
    ['解放済みの学年', t => t.replace('"math":5', '"math":9')],
    ['探索の位置', t => t.replace('"position":1', '"position":9')],
    ['integrity 自体', t => t.replace(/"integrity":"[0-9a-f]+"/, '"integrity":"0123456789abcd"')]
  ];

  test('書き出した文字列を書き換えてインポートすると、読み込みを拒否する', () => {
    const text = S.serialize(played());
    for (const [label, edit] of tampers) {
      const bad = edit(text);
      assert.notStrictEqual(bad, text, label + ' を書き換えられていない（テストの前提）');
      const r = S.parseSave(bad, T0);
      assert.strictEqual(r.ok, false, label);
      assert.strictEqual(r.reason, 'integrity', label);
      assert.strictEqual(r.error, 'セーブデータの形式が正しくありません。', '既存の表示に合流する');
    }
  });

  test('書き換えたセーブを起動時に読み込むと拒否され、保存されていた文字列には手を加えない', () => {
    const text = S.serialize(played());
    for (const [label, edit] of tampers) {
      const bad = edit(text);
      const ls = fakeStorage();
      ls.setItem(FF.config.SAVE_KEY, bad);
      const r = FF.storage.load(T0, ls);
      assert.strictEqual(r.status, 'error', label);
      // 書き換えられた資源などは読み込まれず、新しい状態で始まる
      assert.strictEqual(r.state.resources.wood, 0, label);
      assert.strictEqual(r.state.buildings.furnace.level, 1, label);
      // 元の文字列はそのまま（既存の「壊れたデータ」と同じく .broken にもそのまま退避）
      assert.strictEqual(ls.getItem(FF.config.SAVE_KEY), bad, label);
      assert.strictEqual(ls.getItem(FF.config.SAVE_KEY + '.broken'), bad, label);
    }
  });

  test('インポートを拒否しても、今の状態は変わらない', () => {
    const current = played();
    const before = JSON.stringify(current);
    const bad = tampers[0][1](S.serialize(current));
    S.parseSave(bad, T0);
    assert.strictEqual(JSON.stringify(current), before);
  });

  test('改行や前後の空白が付いていても、中身が同じなら検証を通る（コピーと貼り付け）', () => {
    const text = S.serialize(played());
    assert.strictEqual(S.parseSave('\n  ' + text + '  \n', T0).ok, true);
    // JSON の整形（インデント）は中身を変えないので通る
    assert.strictEqual(S.parseSave(JSON.stringify(JSON.parse(text), null, 2), T0).ok, true);
  });

  // ---- 後方互換（第3章 1、第5章） ----
  test('integrity のない v0.1・v0 のセーブ（fixtures）は、改ざん扱いされずに読み込める', () => {
    for (const name of ['save_v0.json', 'save_v1.json']) {
      const r = S.parseSave(fixture(name), T0);
      assert.strictEqual(r.ok, true, name + ': ' + r.error);
      assert.ok(!('integrity' in JSON.parse(fixture(name))), name + ' に integrity がない（前提）');
    }
    const ls = fakeStorage();
    ls.setItem(FF.config.SAVE_KEY, fixture('save_v1.json'));
    assert.strictEqual(FF.storage.load(T0, ls).status, 'migrated');
  });

  // v0.2 のときの保存（saveVersion 2・integrity なし）
  const v02text = s => JSON.stringify(Object.assign({}, plain(s), { saveVersion: 2 }));

  test('integrity のない v0.2 形式（saveVersion 2）のセーブも、そのまま読み込める', () => {
    const s = played();
    const r = S.parseSave(v02text(s), T0);
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.migratedFrom, 2);
    assert.deepStrictEqual(plain(r.state), plain(s));
  });

  // ---- saveVersion 3：integrity が必須 ----
  test('saveVersion が 3（integrity が必須になる版）は config で決まっている', () => {
    assert.strictEqual(FF.config.SAVE_VERSION, 3);
    assert.strictEqual(FF.config.INTEGRITY_REQUIRED_FROM, 3);
    assert.strictEqual(typeof S.MIGRATIONS[2], 'function');
  });

  test('saveVersion 3 で integrity がないデータは拒否される（integrity を消して書き換えてもすり抜けない）', () => {
    const text = S.serialize(played());
    const noField = JSON.parse(text);
    delete noField.integrity;
    assert.strictEqual(noField.saveVersion, 3);
    // integrity を消しただけ／消して数値も書き換えた、のどちらも拒否
    for (const bad of [JSON.stringify(noField), JSON.stringify(noField).replace('"wood":1234', '"wood":999999')]) {
      const r = S.parseSave(bad, T0);
      assert.strictEqual(r.ok, false);
      assert.strictEqual(r.reason, 'integrity');
      const ls = fakeStorage();
      ls.setItem(FF.config.SAVE_KEY, bad);
      const loaded = FF.storage.load(T0, ls);
      assert.strictEqual(loaded.status, 'error');
      assert.strictEqual(loaded.state.resources.wood, 0);
      assert.strictEqual(ls.getItem(FF.config.SAVE_KEY + '.broken'), bad);
    }
  });

  test('saveVersion 3 で integrity が一致しない・文字列でないデータは拒否される', () => {
    const raw = JSON.parse(S.serialize(played()));
    for (const v of ['0123456789abcd', '', 123, null]) {
      const r = S.parseSave(JSON.stringify(Object.assign({}, raw, { integrity: v })), T0);
      assert.strictEqual(r.ok, false, JSON.stringify(v));
      assert.strictEqual(r.reason, 'integrity', JSON.stringify(v));
    }
  });

  test('saveVersion 2 以下で integrity がないデータは、これまで通り読み込める（後方互換）', () => {
    const cases = [
      ['v0（saveVersion なし）', fixture('save_v0.json'), 0],
      ['v1', fixture('save_v1.json'), 1],
      ['v2', v02text(played()), 2]
    ];
    for (const [label, text, from] of cases) {
      assert.ok(!('integrity' in JSON.parse(text)), label + '（前提）');
      const r = S.parseSave(text, T0);
      assert.strictEqual(r.ok, true, label + ': ' + r.error);
      assert.strictEqual(r.migratedFrom, from, label);
      const ls = fakeStorage();
      ls.setItem(FF.config.SAVE_KEY, text);
      assert.strictEqual(FF.storage.load(T0, ls).status, 'migrated', label);
    }
  });

  test('saveVersion 2 でも integrity があれば検証する（前の版で付いた指紋は通り、書き換えは拒否）', () => {
    const body = Object.assign({}, plain(played()), { saveVersion: 2 });
    const signed = JSON.stringify(Object.assign({}, body, { integrity: I.sign(body) }));
    assert.strictEqual(S.parseSave(signed, T0).ok, true);
    const r = S.parseSave(signed.replace('"wood":1234', '"wood":999999'), T0);
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.reason, 'integrity');
  });

  test('今の版より新しいセーブは、integrity より先に「新しいバージョン」として扱う', () => {
    const s = Object.assign({}, plain(played()), { saveVersion: FF.config.SAVE_VERSION + 1 });
    const r = S.parseSave(JSON.stringify(s), T0);
    assert.strictEqual(r.ok, false);
    assert.ok(/新しいバージョン/.test(r.error));
  });

  test('移行の結果（saveText）は saveVersion 3 で、正しい integrity が付いている', () => {
    for (const text of [fixture('save_v0.json'), fixture('save_v1.json'), v02text(played())]) {
      const r = S.parseSave(text, T0);
      const saved = JSON.parse(r.saveText);
      assert.strictEqual(saved.saveVersion, 3);
      assert.strictEqual(I.verify(saved), true);
      assert.strictEqual(r.saveText, S.serialize(r.state), '移行後の状態そのものの指紋');
    }
  });

  test('旧バージョンから読み込むと、すぐに saveVersion 3・正しい integrity で保存し直され、次からは移行なしで読める', () => {
    for (const text of [fixture('save_v0.json'), fixture('save_v1.json'), v02text(played())]) {
      const ls = fakeStorage();
      ls.setItem(FF.config.SAVE_KEY, text);
      const first = FF.storage.load(T0, ls);
      assert.strictEqual(first.status, 'migrated');
      const stored = JSON.parse(ls.getItem(FF.config.SAVE_KEY));
      assert.strictEqual(stored.saveVersion, 3);
      assert.strictEqual(I.verify(stored), true);
      const second = FF.storage.load(T0, ls);
      assert.strictEqual(second.status, 'loaded');
      assert.deepStrictEqual(plain(second.state), plain(first.state));
    }
  });

  test('旧バージョンから読み込んで保存し直すと、saveVersion が 3 になり、正しい integrity が付く', () => {
    for (const text of [fixture('save_v0.json'), fixture('save_v1.json'), v02text(played())]) {
      const r = S.parseSave(text, T0);
      const ls = fakeStorage();
      FF.storage.save(r.state, ls);
      const saved = JSON.parse(ls.getItem(FF.config.SAVE_KEY));
      assert.strictEqual(saved.saveVersion, 3);
      assert.strictEqual(I.verify(saved), true);
      // integrity を消すと、もう読み込めない
      delete saved.integrity;
      assert.strictEqual(S.parseSave(JSON.stringify(saved), T0).ok, false);
    }
  });

  test('読み込めたデータを保存し直すと、正しい integrity が付く', () => {
    for (const name of ['save_v0.json', 'save_v1.json']) {
      const ls = fakeStorage();
      ls.setItem(FF.config.SAVE_KEY, fixture(name));
      const first = FF.storage.load(T0, ls);
      FF.storage.save(first.state, ls);
      const saved = JSON.parse(ls.getItem(FF.config.SAVE_KEY));
      assert.strictEqual(I.verify(saved), true, name);
      const second = FF.storage.load(T0, ls);
      assert.strictEqual(second.status, 'loaded', name);
      assert.deepStrictEqual(plain(second.state), plain(first.state), name);
    }
  });

  test('状態に integrity が紛れ込んでいても、保存し直すと正しい値に付け直される', () => {
    const s = Object.assign(played(), { integrity: 'stale' });
    const raw = JSON.parse(S.serialize(s));
    assert.strictEqual(I.verify(raw), true);
    assert.notStrictEqual(raw.integrity, 'stale');
  });

  test('アプリ自身の操作（デバッグ画面と同じ関数）で変えた状態は、保存し直せば検証を通る', () => {
    let s = played();
    s = FF.buildings.normalizeBuildings(Object.assign({}, s, { buildings: Object.assign({}, s.buildings, { furnace: { level: 4 } }) }), T0);
    s = FF.exploration.advance(s, 'snowfield', T0, FF.util.makeRng(2)).state;
    const r = S.parseSave(S.serialize(s), T0);
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.state.buildings.furnace.level, 4);
  });
};
