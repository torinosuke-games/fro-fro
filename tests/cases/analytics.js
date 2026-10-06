// 保護者の記録（判断304）：履歴の集計（純粋関数）と、履歴の読み出し（ページ分け）
const nodeCrypto = require('crypto');

module.exports = ({ test, FF, assert, plain }) => {
  const A = FF.analytics, S = FF.sync;
  const JST = -540;                                   // Date#getTimezoneOffset()（日本）
  const DAY = 86400000;
  const at = (y, m, d, h, min) => Date.UTC(y, m - 1, d, h || 0, min || 0) - 9 * 3600000;   // 日本時間の日時 → ms
  const NOW = at(2026, 10, 6, 12);
  let n = 0;
  const row = (t, qid, correct, extra) => Object.assign({ attempt_id: 'r' + (n++), at: t, qid, subject: 'math', grade: 4, correct, points: correct ? 5 : 0 }, extra || {});

  test('日付：端末の日付で数える（日本の午前0時をまたぐと日が変わる）', () => {
    assert.equal(A.dayKey(at(2026, 10, 6, 0, 0), JST), '2026-10-06');
    assert.equal(A.dayKey(at(2026, 10, 5, 23, 59), JST), '2026-10-05');
    assert.equal(A.dayKey(at(2026, 10, 5, 23, 59), 0), '2026-10-05' === A.dayKey(at(2026, 10, 5, 23, 59), 0) ? A.dayKey(at(2026, 10, 5, 23, 59), 0) : '');
    assert.equal(A.dayKey(Date.UTC(2026, 0, 1, 15, 0), JST), '2026-01-02');   // UTC 15:00 ＝ 日本の翌日0:00
  });

  test('集計：回答数・正答率・ポイント・学習した日数・連続日数', () => {
    const rows = [
      row(at(2026, 10, 6, 9), 'q1', true), row(at(2026, 10, 6, 10), 'q2', false),
      row(at(2026, 10, 5, 9), 'q1', true), row(at(2026, 10, 4, 9), 'q3', true),
      row(at(2026, 10, 1, 9), 'q3', false)
    ];
    const s = A.summarize(rows, { now: NOW, tzOffset: JST });
    assert.equal(s.total.answered, 5); assert.equal(s.total.correct, 3);
    assert.equal(s.total.rate, 0.6); assert.equal(s.total.points, 15);
    assert.equal(s.total.activeDays, 4);
    assert.equal(s.total.streak, 3);                       // 10/4・10/5・10/6
    assert.equal(s.total.firstAt, at(2026, 10, 1, 9)); assert.equal(s.total.lastAt, at(2026, 10, 6, 10));
  });

  test('集計：今日まだ学習していなければ、昨日までの連続日数。昨日もなければ 0', () => {
    const base = [row(at(2026, 10, 5, 9), 'q', true), row(at(2026, 10, 4, 9), 'q', true)];
    assert.equal(A.summarize(base, { now: NOW, tzOffset: JST }).total.streak, 2);
    assert.equal(A.summarize(base, { now: NOW + DAY, tzOffset: JST }).total.streak, 0);
    assert.equal(A.summarize([], { now: NOW, tzOffset: JST }).total.answered, 0);
  });

  test('日ごと：古い日 → 今日の順で、ない日は 0。指定した日数ぶん', () => {
    const s = A.summarize([row(at(2026, 10, 6, 9), 'q', true), row(at(2026, 10, 6, 9, 5), 'q', false), row(at(2026, 10, 2, 9), 'q', true)], { now: NOW, tzOffset: JST, days: 7 });
    assert.equal(s.daily.length, 7);
    assert.deepEqual(s.daily.map(d => d.day), ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06']);
    assert.deepEqual(plain(s.daily[6]), { day: '2026-10-06', answered: 2, correct: 1, points: 5 });
    assert.equal(s.daily[2].answered, 1); assert.equal(s.daily[3].answered, 0);
  });

  test('集計：同じ attempt_id は1件。形のおかしい行は数えない', () => {
    const r = row(at(2026, 10, 6, 9), 'q', true);
    const s = A.summarize([r, Object.assign({}, r), { at: 'x', qid: 'q', correct: true }, null, { at: 1, qid: 5, correct: true }, { at: 1, qid: 'q', correct: 'yes' }], { now: NOW, tzOffset: JST });
    assert.equal(s.total.answered, 1);
  });

  test('教科ごと・単元ごと：問題データから単元を引く。正答率の低い単元が先。回答が少ない単元は弱い単元に入れない', () => {
    const info = {
      a1: { subject: 'math', grade: 4, unit: 'large', unitName: '大きな数', question: '問1' },
      a2: { subject: 'math', grade: 4, unit: 'large', unitName: '大きな数', question: '問2' },
      b1: { subject: 'math', grade: 4, unit: 'angle', unitName: '角', question: '問3' },
      c1: { subject: 'science', grade: 4, unit: 'electric', unitName: '電気', question: '問4' }
    };
    const rows = [];
    for (let i = 0; i < 6; i++) rows.push(row(at(2026, 10, 6, 9, i), i % 2 ? 'a1' : 'a2', i < 5));            // 大きな数：5/6
    for (let i = 0; i < 5; i++) rows.push(row(at(2026, 10, 6, 10, i), 'b1', i < 2));                         // 角：2/5
    for (let i = 0; i < 4; i++) rows.push(row(at(2026, 10, 6, 11, i), 'c1', false, { subject: 'science' })); // 電気：0/4（少ない）
    rows.push(row(at(2026, 10, 6, 12, 0), 'gen_math_g4_x_1', false));                                         // 自動の問題
    const s = A.summarize(rows, { now: NOW, tzOffset: JST, lookup: id => info[id] || null });
    assert.deepEqual(s.bySubject.map(x => [x.subject, x.answered]), [['math', 12], ['science', 4]]);
    assert.deepEqual(s.weakUnits.map(u => [u.unit, u.name, u.answered, u.correct]), [['angle', '角', 5, 2], ['large', '大きな数', 6, 5]]);
    const auto = s.byUnit.find(u => u.unit === null && u.subject === 'math');
    assert.equal(auto.answered, 1); assert.equal(auto.name, null);
  });

  test('よく間違える問題：2回以上間違えた問題を、間違えた回数の多い順に。書き問題の形（#input）も同じ問題として数える', () => {
    const rows = [
      row(1000, 'x', false), row(2000, 'x', false), row(3000, 'x#input', false), row(4000, 'x', true),   // x：4回中3回間違い
      row(1100, 'y', false), row(2100, 'y', false),                                                       // y：2回中2回間違い
      row(1200, 'z', false), row(2200, 'z', true)                                                         // z：1回だけ（入らない）
    ];
    const s = A.summarize(rows, { now: NOW, tzOffset: JST, lookup: id => id === 'x' ? { subject: 'math', grade: 4, unit: 'u', unitName: 'U', question: '算数の問題' } : null });
    assert.deepEqual(s.missed.map(m => [m.qid, m.wrong, m.tries]), [['x', 3, 4], ['y', 2, 2]]);
    assert.equal(s.missed[0].question, '算数の問題'); assert.equal(s.missed[1].question, null);
  });

  // ---- 履歴の読み出し（ページ分け）----
  function makeReadServer(all) {
    const srv = { calls: 0, down: false };
    const hash = k => nodeCrypto.createHash('sha256').update(k).digest('hex');
    const KEY = S.keyOf('ABCDEFGHJKMNPQRS');
    srv.fetch = (url, init) => {
      srv.calls++;
      const a = JSON.parse(init.body);
      const json = x => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(x) });
      if (srv.down) return Promise.reject(new Error('offline'));
      if (a.p_key !== KEY) return json({ ok: false, error: 'not_found' });
      const lim = Math.min(Math.max(a.p_limit || 500, 1), 1000);
      const rows = all.filter(r => r.at > (a.p_since || 0)).sort((x, y) => x.at - y.at || (x.attempt_id < y.attempt_id ? -1 : 1)).slice(0, lim);
      return json({ ok: true, rows });
    };
    return srv;
  }
  const CFG = { URL: 'https://example.supabase.co', ANON_KEY: 'k' };
  const mk = (i, t) => ({ attempt_id: 'a' + i, at: t, qid: 'q' + i, correct: true });

  test('履歴の読み出し：1000件ずつ、すべて読む（2500件なら3回）', async () => {
    const all = []; for (let i = 0; i < 2500; i++) all.push(mk(i, 1000 + i));
    const srv = makeReadServer(all); const progress = [];
    const r = await S.fetchAttempts(srv.fetch, CFG, FF.balance.SYNC, 'abcd-efgh-jkmn-pqrs', c => progress.push(c));
    assert.equal(r.ok, true); assert.equal(r.rows.length, 2500);
    assert.equal(srv.calls, 3);
    assert.deepEqual(progress, [1000, 1999, 2500]);   // 境目の1件は読み直す（同じ時刻の履歴を取りこぼさないため）。重なった分は数えない
  });

  test('履歴の読み出し：ページの境目に同じ時刻の履歴が重なっても、取りこぼさず、二重にもしない', async () => {
    const all = []; for (let i = 0; i < 1010; i++) all.push(mk(i, 5000 + Math.floor(i / 5)));   // 5件ずつが同じ時刻（境目の 1000件目のあとも同じ時刻が続く）
    const srv = makeReadServer(all);
    const r = await S.fetchAttempts(srv.fetch, CFG, FF.balance.SYNC, 'ABCDEFGHJKMNPQRS');
    assert.equal(r.rows.length, 1010);
    assert.equal(new Set(r.rows.map(x => x.attempt_id)).size, 1010);
  });

  test('履歴の読み出し：同じ時刻が1000件より多くても、終わらないことはない（進まなければ止める）', async () => {
    const all = []; for (let i = 0; i < 1500; i++) all.push(mk(i, 7000));
    const srv = makeReadServer(all);
    const r = await S.fetchAttempts(srv.fetch, CFG, FF.balance.SYNC, 'ABCDEFGHJKMNPQRS');
    assert.equal(r.ok, true);
    assert.ok(srv.calls <= 3);
    assert.equal(r.rows.length, 1000);   // 先頭のページぶん（これ以上は同じ時刻で区別できない。実際には起きない）
  });

  test('履歴の読み出し：コードの形が違う・保管庫にない・つながらない、は、通信せずに／エラーで返す', async () => {
    const srv = makeReadServer([mk(1, 1)]);
    assert.equal((await S.fetchAttempts(srv.fetch, CFG, FF.balance.SYNC, 'ABC')).error, 'bad_code');
    assert.equal(srv.calls, 0);
    assert.equal((await S.fetchAttempts(srv.fetch, CFG, FF.balance.SYNC, 'ZZZZZZZZZZZZZZZZ')).error, 'not_found');
    srv.down = true;
    assert.equal((await S.fetchAttempts(srv.fetch, CFG, FF.balance.SYNC, 'ABCDEFGHJKMNPQRS')).error, 'network');
  });

  test('グラフの縦軸：きりのよい上限と、多くても5本の目盛り（0 を含む）。大きな数でも小さな数でも', () => {
    const t = (max) => plain(A.niceTicks(max, 4));
    assert.deepEqual(t(0), { max: 1, step: 1, ticks: [0, 1] });
    assert.deepEqual(t(3), { max: 3, step: 1, ticks: [0, 1, 2, 3] });
    assert.deepEqual(t(4), { max: 4, step: 1, ticks: [0, 1, 2, 3, 4] });
    assert.deepEqual(t(5), { max: 6, step: 2, ticks: [0, 2, 4, 6] });
    assert.deepEqual(t(15), { max: 15, step: 5, ticks: [0, 5, 10, 15] });
    assert.deepEqual(t(16), { max: 20, step: 5, ticks: [0, 5, 10, 15, 20] });
    assert.deepEqual(t(37), { max: 40, step: 10, ticks: [0, 10, 20, 30, 40] });
    assert.deepEqual(t(101), { max: 150, step: 50, ticks: [0, 50, 100, 150] });
    for (let m = 1; m <= 5000; m += 7) {
      const r = A.niceTicks(m, 4);
      assert.ok(r.max >= m && r.ticks.length <= 5 && r.ticks[0] === 0 && r.ticks[r.ticks.length - 1] === r.max, 'max=' + m);
    }
  });
};
