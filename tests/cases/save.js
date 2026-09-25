// 保存・読み込み・データ移行（SPEC 14.2・第19章）
module.exports = ({ test, FF, assert, plain }) => {
  const S = FF.state;
  const T0 = 1790000000000;
  const fs = require('fs');
  const path = require('path');

  // localStorage の代わり
  function fakeStorage() {
    const data = {};
    return {
      data,
      getItem: k => (Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null),
      setItem: (k, v) => { data[k] = String(v); },
      removeItem: k => { delete data[k]; }
    };
  }

  function sampleState() {
    const s = S.createDefaultState(T0);
    s.player.name = 'ユキ';
    s.resources.wood = 321;
    s.resources.stone = 45;
    s.buildings.furnace.level = 3;
    s.buildings.quarry = { level: 2, lastCollectedAt: T0 + 1000 };
    s.tickets = { count: 7, lastRecoveredAt: T0 + 2000 };
    s.learning.unlocked.math = 5;
    s.learning.examCooldownUntil.english = T0 + 600000;
    s.learning.examHistory.push({ at: T0, subject: 'math', grade: 5, correct: 4, total: 5, passed: true });
    s.learning.stats.math = { 3: { attempts: 4, correct: 3, choice: { attempts: 1, correct: 1 }, input: { attempts: 3, correct: 2 }, hintsUsed: 1, recent: [1, 0, 1, 1] } };
    s.learning.correctLog = { q1: [T0] };
    s.learning.history.push({ at: T0, qid: 'q1', correct: true });
    s.settings = { furigana: false, furiganaAuto: false };
    s.flags.introSeen = true;
    return s;
  }

  test('初期状態に必要な項目がそろっている', () => {
    const s = S.createDefaultState(T0);
    assert.strictEqual(s.saveVersion, FF.config.SAVE_VERSION);
    assert.deepStrictEqual(Object.keys(s.resources), ['wood', 'iron', 'stone', 'food']);
    assert.strictEqual(s.buildings.furnace.level, 1);
    assert.strictEqual(s.buildings.quarry.level, 0);
    assert.strictEqual(s.buildings.quarry.lastCollectedAt, null);
    assert.strictEqual(s.buildings.lumber.lastCollectedAt, T0);
    assert.deepStrictEqual(plain(s.tickets), { count: 20, lastRecoveredAt: T0 });
    for (const subj of FF.defs.SUBJECTS) assert.strictEqual(s.learning.unlocked[subj.id], 2);
  });

  test('エクスポートしたデータをインポートすると元の状態に戻る', () => {
    const s = sampleState();
    const text = S.serialize(s);
    const r = S.parseSave(text, T0 + 99999);
    assert.strictEqual(r.ok, true);
    assert.deepStrictEqual(plain(r.state), plain(s));
  });

  test('前後に空白や改行があってもインポートできる', () => {
    const r = S.parseSave('\n  ' + S.serialize(sampleState()) + '  \n', T0);
    assert.strictEqual(r.ok, true);
  });

  test('保存して読み込むと、すべての状態が維持される（リロード相当）', () => {
    const ls = fakeStorage();
    const s = sampleState();
    assert.strictEqual(FF.storage.save(s, ls), true);
    const r = FF.storage.load(T0 + 5000, ls);
    assert.strictEqual(r.status, 'loaded');
    assert.deepStrictEqual(plain(r.state), plain(s));
    assert.strictEqual(r.state.player.name, 'ユキ');
  });

  test('保存データがなければ新規状態', () => {
    const r = FF.storage.load(T0, fakeStorage());
    assert.strictEqual(r.status, 'new');
    assert.strictEqual(r.state.tickets.count, 20);
  });

  test('壊れた保存データは退避して新規状態で始める', () => {
    const ls = fakeStorage();
    ls.setItem(FF.config.SAVE_KEY, '{壊れた');
    const r = FF.storage.load(T0, ls);
    assert.strictEqual(r.status, 'error');
    assert.strictEqual(ls.getItem(FF.config.SAVE_KEY + '.broken'), '{壊れた');
  });

  test('古い形式（saveVersion なし）のデータを移行できる', () => {
    const text = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'save_v0.json'), 'utf8');
    const r = S.parseSave(text, T0 + 1234);
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.migratedFrom, 0);
    const s = r.state;
    assert.strictEqual(s.saveVersion, FF.config.SAVE_VERSION);
    assert.strictEqual(s.player.name, 'ゆきねこ');
    assert.deepStrictEqual(plain(s.resources), { wood: 120, iron: 30, stone: 80, food: 10 });
    assert.strictEqual(s.buildings.furnace.level, 2);
    assert.strictEqual(s.buildings.lumber.level, 2);
    assert.strictEqual(s.buildings.lumber.lastCollectedAt, T0 + 1234);
    assert.deepStrictEqual(plain(s.tickets), { count: 7, lastRecoveredAt: 1790000000000 });
    assert.strictEqual(s.learning.unlocked.math, 4);
    assert.strictEqual(s.learning.unlocked.science, 2);   // 旧データにない教科は既定値
    assert.strictEqual(s.settings.furigana, false);
    assert.strictEqual(s.settings.furiganaAuto, false);
    assert.ok(Array.isArray(s.learning.history));
    assert.ok(s.learning.totalEarned && s.learning.totalEarned.wood === 0);
  });

  test('移行したデータを保存し直すと、次からは移行なしで読める', () => {
    const ls = fakeStorage();
    ls.setItem(FF.config.SAVE_KEY, fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'save_v0.json'), 'utf8'));
    const first = FF.storage.load(T0, ls);
    assert.strictEqual(first.status, 'migrated');
    FF.storage.save(first.state, ls);
    const second = FF.storage.load(T0, ls);
    assert.strictEqual(second.status, 'loaded');
    assert.deepStrictEqual(plain(second.state), plain(first.state));
  });

  test('不足している項目は既定値で補い、型の違う値は既定値に戻す', () => {
    const s = plain(S.createDefaultState(T0));
    delete s.learning.streak;
    delete s.buildings.mine;
    s.resources.wood = 'たくさん';
    s.resources.iron = null;
    const r = S.migrate(s, T0);
    assert.strictEqual(r.ok, true);
    assert.deepStrictEqual(plain(r.state.learning.streak), { current: 0, best: 0 });
    assert.strictEqual(r.state.buildings.mine.level, 1);
    assert.strictEqual(r.state.resources.wood, 0);
    assert.strictEqual(r.state.resources.iron, 0);
  });

  test('保存側にしかない項目（学年別の成績など）は残す', () => {
    const s = sampleState();
    const r = S.migrate(plain(s), T0);
    assert.deepStrictEqual(plain(r.state.learning.stats), plain(s.learning.stats));
    assert.deepStrictEqual(plain(r.state.learning.correctLog), { q1: [T0] });
  });

  test('読み込んだ名前も正規化される', () => {
    const s = plain(S.createDefaultState(T0));
    s.player.name = '   ';
    assert.strictEqual(S.migrate(s, T0).state.player.name, 'プレイヤー');
  });

  test('不正なインポートは取り込まない', () => {
    assert.strictEqual(S.parseSave('', T0).ok, false);
    assert.strictEqual(S.parseSave('not json', T0).ok, false);
    assert.strictEqual(S.parseSave('[1,2,3]', T0).ok, false);
    assert.strictEqual(S.parseSave('"text"', T0).ok, false);
    assert.strictEqual(S.parseSave('null', T0).ok, false);
  });

  test('新しいバージョンのデータは取り込まない', () => {
    const s = plain(S.createDefaultState(T0));
    s.saveVersion = FF.config.SAVE_VERSION + 1;
    const r = S.parseSave(JSON.stringify(s), T0);
    assert.strictEqual(r.ok, false);
    assert.ok(/新しいバージョン/.test(r.error));
  });

  test('移行は元のデータを書き換えない', () => {
    const src = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'save_v0.json'), 'utf8'));
    const before = JSON.stringify(src);
    S.migrate(src, T0);
    assert.strictEqual(JSON.stringify(src), before);
  });

  test('すべての移行段階が定義されている', () => {
    for (let v = 0; v < FF.config.SAVE_VERSION; v++) assert.strictEqual(typeof S.MIGRATIONS[v], 'function', `MIGRATIONS[${v}]`);
  });
};
