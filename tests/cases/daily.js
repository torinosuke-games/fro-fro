// その日に獲得できる資材の割り当て（判断319）
module.exports = ({ test, FF, assert }) => {
  const RES = ['wood', 'iron', 'stone', 'food'], SUBJ = ['math', 'japanese', 'science', 'social', 'english'];
  const dateKey = i => new Date(Date.UTC(2026, 0, 1) + i * 86400000).toISOString().slice(0, 10);
  const keys = [];
  for (let d = 0; d < 400; d++) keys.push(dateKey(d));

  test('割り当て：4資材は教科に1つずつ、あまる1教科は「ランダム」（☆。資材は決めない）', () => {
    keys.forEach(k => {
      const a = FF.daily.assign(k);
      assert.deepStrictEqual(Object.keys(a.bySubject).sort(), SUBJ.slice().sort());
      const fixed = SUBJ.filter(s => !a.bySubject[s].random);
      assert.strictEqual(fixed.length, 4, k);
      assert.deepStrictEqual(fixed.map(s => a.bySubject[s].resource).sort(), RES.slice().sort(), k);   // 全資材が、かならずどれかに割り当てられる
      assert.strictEqual(SUBJ.filter(s => a.bySubject[s].random).length, 1, k);
      SUBJ.filter(s => a.bySubject[s].random).forEach(s => assert.strictEqual(a.bySubject[s].resource, null, k));   // ランダムの教科は、資材を決めない
      RES.forEach(r => assert.strictEqual(a.bySubject[a.subjectOf[r]].resource, r));
      RES.forEach(r => assert.strictEqual(a.bySubject[a.subjectOf[r]].random, false));
    });
  });
  test('割り当て：同じ日付なら、いつも同じ。日がかわると、かわる', () => {
    assert.deepStrictEqual(FF.daily.assign('2026-10-06'), FF.daily.assign('2026-10-06'));
    const seen = new Set(keys.map(k => JSON.stringify(FF.daily.assign(k).bySubject)));
    assert.ok(seen.size > 300, '400日で ' + seen.size + ' 通り');
    // どの教科にも、どの資材が当たる日がある。どの教科も、ランダムになる日がある
    SUBJ.forEach(s => RES.forEach(r => assert.ok(keys.some(k => FF.daily.assign(k).bySubject[s].resource === r), s + '→' + r)));
    SUBJ.forEach(s => assert.ok(keys.some(k => FF.daily.assign(k).bySubject[s].random), s + ' がランダムの日'));
  });
  test('日付の区切りは朝4時（時差0で確かめる）', () => {
    const t = (y, mo, d, h, mi) => Date.UTC(y, mo - 1, d, h, mi);
    assert.strictEqual(FF.daily.dayKey(t(2026, 10, 6, 3, 59), 0), '2026-10-05');
    assert.strictEqual(FF.daily.dayKey(t(2026, 10, 6, 4, 0), 0), '2026-10-06');
    assert.strictEqual(FF.daily.dayKey(t(2026, 10, 6, 23, 59), 0), '2026-10-06');
    assert.strictEqual(FF.daily.dayKey(t(2026, 10, 7, 0, 30), 0), '2026-10-06');
    assert.strictEqual(FF.daily.dayKey(t(2026, 10, 7, 3, 30), 0), '2026-10-06');
    // 日本時間（時差 −540分）：UTC 18:59 ＝ 日本の 3:59
    assert.strictEqual(FF.daily.dayKey(t(2026, 10, 5, 18, 59), -540), '2026-10-05');
    assert.strictEqual(FF.daily.dayKey(t(2026, 10, 5, 19, 0), -540), '2026-10-06');
  });
  test('resourceFor：教科から、その日の資材が分かる', () => {
    const now = Date.UTC(2026, 9, 6, 12, 0), a = FF.daily.today(now, 0);
    SUBJ.forEach(s => assert.strictEqual(FF.daily.resourceFor(s, now, 0), a.bySubject[s].resource));
    assert.strictEqual(FF.daily.resourceFor('zzz', now, 0), null);
  });
  test('前の日と、どの教科も同じ資材（ランダム）にならない（400日つづけて確かめる）', () => {
    for (let i = 1; i < keys.length; i++) {
      const a = FF.daily.assign(keys[i - 1]).bySubject, b = FF.daily.assign(keys[i]).bySubject;
      SUBJ.forEach(s => assert.notStrictEqual(b[s].resource, a[s].resource, keys[i] + ' ' + s));   // null（ランダム）どうしも同じとみなす
    }
  });
  test('割り当て：どの日から数えても同じ（前の日をもとに決めるが、順番に左右されない）', () => {
    FF.daily._clear();
    const late = FF.daily.assign('2027-03-15');   // 先に、あとの日を決める
    const early = FF.daily.assign('2026-02-10');
    FF.daily._clear();
    assert.deepStrictEqual(FF.daily.assign('2026-02-10'), early);
    assert.deepStrictEqual(FF.daily.assign('2027-03-15'), late);
    // 年またぎ・うるう日も、前の日と重ならない
    ['2026-12-31', '2027-01-01', '2028-02-29', '2028-03-01'].forEach(k => {
      const d = new Date(k + 'T00:00:00Z'); const prev = new Date(d.getTime() - 86400000).toISOString().slice(0, 10);
      SUBJ.forEach(s => assert.notStrictEqual(FF.daily.assign(k).bySubject[s].resource, FF.daily.assign(prev).bySubject[s].resource, k + ' ' + s));
    });
  });
};
