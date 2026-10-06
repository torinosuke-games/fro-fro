// データの保存（サーバー同期。判断299・SPEC_sync.md）：コード・SHA-256・通信・同期の進め方（偽のサーバーで）
const nodeCrypto = require('crypto');

module.exports = ({ test, FF, assert, plain }) => {
  const T0 = 1790000000000;
  const S = FF.sync;
  const CFG = { URL: 'https://example.supabase.co/', ANON_KEY: 'anon-key' };

  // SQL（supabase/*.sql）と同じ振る舞いの偽サーバー
  function makeServer() {
    const srv = { profiles: {}, calls: [], down: false, delay: null };
    function body(res) { return { ok: true, status: 200, json: () => Promise.resolve(res) }; }
    srv.fetch = (url, init) => {
      const name = url.split('/rpc/')[1];
      const a = JSON.parse(init.body);
      srv.calls.push({ name, a, init });
      if (srv.down) return Promise.reject(new Error('offline'));
      const hash = k => nodeCrypto.createHash('sha256').update(k).digest('hex');
      const p = srv.profiles[hash(a.p_key || '')];
      if (name === 'ff_create_profile') {
        if (p) return Promise.resolve(body({ ok: false, error: 'exists' }));
        srv.profiles[hash(a.p_key)] = { rev: 0, save: null };
        return Promise.resolve(body({ ok: true }));
      }
      if (!p) return Promise.resolve(body({ ok: false, error: 'not_found' }));
      if (name === 'ff_pull') return Promise.resolve(body({ ok: true, rev: p.rev, save_json: p.save }));
      if (name === 'ff_push_save') {
        if (p.rev !== a.p_base_rev) return Promise.resolve(body({ ok: false, error: 'conflict', rev: p.rev, save_json: p.save }));
        p.rev += 1; p.save = a.p_save;
        return Promise.resolve(body({ ok: true, rev: p.rev }));
      }
      if (name === 'ff_delete_profile') { delete srv.profiles[hash(a.p_key)]; return Promise.resolve(body({ ok: true })); }
      return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) });
    };
    return srv;
  }

  // 1台ぶんの端末（保存先・状態・選択を持つ）
  function makeDevice(srv, name, opts) {
    opts = opts || {};
    const dev = { name, now: T0, rec: null, backup: null, applied: [], asked: [], choice: 'local', interruptible: true };
    dev.state = FF.state.withUpdated(FF.state.createDefaultState(T0), T0);
    dev.engine = S.createEngine({
      fetch: srv.fetch, cfg: CFG, balance: FF.balance.SYNC, now: () => dev.now,
      randomBytes: n => Array.from(nodeCrypto.randomBytes(n)),
      loadRec: () => dev.rec, saveRec: r => { dev.rec = plain(r); },
      saveBackup: t => { dev.backup = t; },
      getState: () => dev.state,
      applyRemote: st => { dev.state = st; dev.applied.push(st); },
      decideConflict: info => { dev.asked.push(info); return Promise.resolve(dev.choice); },
      canInterrupt: () => dev.interruptible
    });
    dev.play = (points) => {   // 遊んで、勉強量ポイントを増やす
      dev.now += 1000;
      const s = plain(dev.state);
      s.studyPoints += points; s.studyPointsEarnedTotal += points;
      dev.state = FF.state.withUpdated(s, dev.now);
    };
    return dev;
  }

  test('SHA-256：既知の値と、Node の crypto が一致する（日本語・長い文字列も）', () => {
    assert.equal(S.sha256Hex('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    assert.equal(S.sha256Hex(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    for (const t of ['あいうえお🙂', 'x'.repeat(55), 'x'.repeat(56), 'x'.repeat(64), 'x'.repeat(1000)]) {
      assert.equal(S.sha256Hex(t), nodeCrypto.createHash('sha256').update(t, 'utf8').digest('hex'));
    }
  });

  test('引き継ぎコード：16文字・紛らわしい文字なし・すべて違う。入力はゆるく読み、形が違えば null', () => {
    const rb = n => Array.from(nodeCrypto.randomBytes(n));
    const seen = new Set();
    for (let i = 0; i < 200; i++) {
      const c = S.generateCode(rb);
      assert.equal(c.length, 16);
      assert.ok(/^[A-HJ-KM-NP-Z2-9]{16}$/.test(c), c);
      assert.equal(S.normalizeCode(c), c);
      seen.add(c);
    }
    assert.equal(seen.size, 200);
    const c = S.generateCode(rb);
    assert.equal(S.normalizeCode(S.formatCode(c).toLowerCase()), c);
    assert.equal(S.normalizeCode(' ' + S.formatCode(c) + ' '), c);
    assert.match(S.formatCode(c), /^[A-Z2-9]{4}(-[A-Z2-9]{4}){3}$/);
    assert.equal(S.normalizeCode('ABCD'), null);
    assert.equal(S.normalizeCode('0'.repeat(16)), null);   // 0 は使わない文字
    assert.equal(S.normalizeCode(null), null);
    // 偏りの検査：全部 255 の乱数でも、捨てられて終わらないことはない（次の乱数を使う）
    let n = 0;
    assert.equal(S.generateCode(k => { n++; return n === 1 ? new Array(k).fill(255) : new Array(k).fill(0); }).length, 16);
    assert.equal(S.keyOf(c).length, 64);
    assert.notEqual(S.keyOf(c), S.sha256Hex(c));
  });

  test('同期の記録：形のおかしい値は初期値にもどる。コードが読めなければオフ', () => {
    assert.deepEqual(plain(S.normalizeRecord(null)), plain(S.newRecord()));
    assert.equal(S.normalizeRecord({ enabled: true, code: 'bad' }).enabled, false);
    const r = S.normalizeRecord({ enabled: true, code: 'abcd-efgh-jkmn-pqrs', rev: 3.7, failures: -1, nextTryAt: 'x' });
    assert.equal(r.enabled, true); assert.equal(r.code, 'ABCDEFGHJKMNPQRS'); assert.equal(r.rev, 3); assert.equal(r.failures, 0); assert.equal(r.nextTryAt, 0);
  });

  test('通信：成功・サーバーの失敗・つながらない、のどれでも例外を投げず、鍵と anon キーを付ける', async () => {
    const srv = makeServer();
    const r1 = await S.rpc(srv.fetch, CFG, 'ff_create_profile', { p_key: 'a'.repeat(64) }, 1000);
    assert.equal(r1.ok, true);
    const c = srv.calls[0];
    assert.equal(c.init.headers.apikey, 'anon-key');
    assert.equal(c.init.headers.Authorization, 'Bearer anon-key');
    assert.equal(c.init.method, 'POST');
    srv.down = true;
    assert.deepEqual(plain(await S.rpc(srv.fetch, CFG, 'ff_pull', {}, 1000)), { ok: false, error: 'network' });
    const r500 = await S.rpc(() => Promise.resolve({ ok: false, status: 500 }), CFG, 'x', {}, 1000);
    assert.equal(r500.error, 'http_500');
    const rThrow = await S.rpc(() => { throw new Error('x'); }, CFG, 'x', {}, 1000);
    assert.equal(rThrow.error, 'network');
    const rSlow = await S.rpc(() => new Promise(() => {}), CFG, 'x', {}, 20);
    assert.equal(rSlow.error, 'timeout');
    const rBad = await S.rpc(() => Promise.resolve({ ok: true, json: () => Promise.resolve('x') }), CFG, 'x', {}, 1000);
    assert.equal(rBad.error, 'bad_response');
  });

  test('同期：オフのときは何も送らない（通信ゼロ）', async () => {
    const srv = makeServer(); const d = makeDevice(srv, 'A');
    assert.equal((await d.engine.sync()).status, 'off');
    assert.equal(srv.calls.length, 0);
  });

  test('同期：オンにするとコードができ、最初の同期でセーブが送られ、変えなければ送らない', async () => {
    const srv = makeServer(); const d = makeDevice(srv, 'A');
    const en = await d.engine.enable();
    assert.equal(en.ok, true);
    assert.ok(S.normalizeCode(en.code));
    assert.equal(d.rec.enabled, true);
    assert.equal(d.rec.code, en.code);
    assert.ok(d.rec.consentAt);
    assert.equal((await d.engine.sync()).status, 'pushed');
    const server = Object.values(srv.profiles)[0];
    assert.equal(server.rev, 1);
    // 送った中身は、読み込みの検証を通るセーブ（integrity つき）
    assert.equal(FF.state.parseSave(JSON.stringify(server.save), T0).ok, true);
    assert.equal(Object.keys(srv.profiles)[0], nodeCrypto.createHash('sha256').update(S.keyOf(en.code)).digest('hex'));
    const before = srv.calls.length;
    assert.equal((await d.engine.sync()).status, 'unchanged');
    assert.ok(srv.calls.slice(before).every(c => c.name === 'ff_pull'));
    d.play(50);
    assert.equal((await d.engine.sync()).status, 'pushed');
    assert.equal(server.rev, 2);
    assert.equal(server.save.studyPointsEarnedTotal, 50);
    // コードそのもの（と、通信に使う鍵）はサーバーに保存されない
    assert.ok(!JSON.stringify(srv.profiles).includes(en.code));
    assert.ok(!JSON.stringify(srv.profiles).includes(S.keyOf(en.code)));
  });

  test('同期：別の端末が先に進めて、この端末は変えていなければ、自動で受け取る', async () => {
    const srv = makeServer(); const a = makeDevice(srv, 'A'); const b = makeDevice(srv, 'B');
    const code = (await a.engine.enable()).code;
    await a.engine.sync();
    assert.equal((await b.engine.link(S.formatCode(code))).ok, true);
    b.choice = 'remote';
    assert.equal((await b.engine.sync()).status, 'conflict-remote');   // 最初の引き継ぎは、選ぶ（firstLink）
    assert.equal(b.asked[0].firstLink, true);
    a.play(30); await a.engine.sync();
    b.now += 100000;
    assert.equal((await b.engine.sync()).status, 'pulled');
    assert.equal(b.state.studyPointsEarnedTotal, 30);
    assert.equal(b.asked.length, 1);   // 2回目は聞かない
    assert.equal(b.rec.rev, 2);
    assert.equal((await b.engine.sync()).status, 'unchanged');
  });

  test('同期：両方の端末が変えたら競合。「この端末」を選ぶと上書きし、サーバーの分は控えに残る', async () => {
    const srv = makeServer(); const a = makeDevice(srv, 'A'); const b = makeDevice(srv, 'B');
    const code = (await a.engine.enable()).code; await a.engine.sync();
    await b.engine.link(code); b.choice = 'remote'; await b.engine.sync();
    a.play(10); await a.engine.sync();
    b.play(99);
    b.choice = 'local';
    assert.equal((await b.engine.sync()).status, 'conflict-local');
    const info = b.asked[b.asked.length - 1];
    assert.equal(info.firstLink, false);
    assert.equal(info.local.points, 99); assert.equal(info.remote.points, 10);
    const server = Object.values(srv.profiles)[0];
    assert.equal(server.save.studyPointsEarnedTotal, 99);
    assert.equal(JSON.parse(b.backup).studyPointsEarnedTotal, 10);
    a.now += 100000;
    assert.equal((await a.engine.sync()).status, 'pulled');   // A は何も変えていないので、自動で受け取る
    assert.equal(a.state.studyPointsEarnedTotal, 99);
  });

  test('同期：競合で「もう1つの端末」を選ぶと受け取り、この端末の分は控えに残る。あとで、なら何もしないで10分あける', async () => {
    const srv = makeServer(); const a = makeDevice(srv, 'A'); const b = makeDevice(srv, 'B');
    const code = (await a.engine.enable()).code; await a.engine.sync();
    await b.engine.link(code); b.choice = 'remote'; await b.engine.sync();
    a.play(10); await a.engine.sync();
    b.play(99);
    b.choice = null;
    assert.equal((await b.engine.sync()).status, 'conflict-pending');
    assert.equal(b.state.studyPointsEarnedTotal, 99);
    assert.equal((await b.engine.sync()).status, 'wait');
    b.now += FF.balance.SYNC.CONFLICT_DEFER_MS + 1;
    b.choice = 'remote';
    assert.equal((await b.engine.sync()).status, 'conflict-remote');
    assert.equal(b.state.studyPointsEarnedTotal, 10);
    assert.equal(JSON.parse(b.backup).studyPointsEarnedTotal, 99);
    assert.equal(b.rec.rev, 2);
    assert.equal(b.state.updatedAt, a.state.updatedAt);   // 受け取ったセーブの時刻のまま（新しい変更にならない）
    assert.equal((await b.engine.sync({ force: true })).status, 'unchanged');
  });

  test('同期：コードで引き継ぐと、サーバーにそのコードがなければ失敗。形が違えば bad_code', async () => {
    const srv = makeServer(); const b = makeDevice(srv, 'B');
    assert.equal((await b.engine.link('ABCD')).error, 'bad_code');
    const r = await b.engine.link(S.generateCode(n => Array.from(nodeCrypto.randomBytes(n))));
    assert.equal(r.error, 'not_found');
    assert.equal(b.rec, null);   // 記録は作らない
  });

  test('同期：サーバーに最初のセーブがないコードで引き継ぐと、この端末のデータを送る', async () => {
    const srv = makeServer(); const a = makeDevice(srv, 'A'); const b = makeDevice(srv, 'B');
    const code = (await a.engine.enable()).code;   // A は同期しない。サーバーには利用者だけがいる
    await b.engine.link(code);
    b.play(5);
    assert.equal((await b.engine.sync()).status, 'pushed');
  });

  test('同期：通信に失敗しても遊びは止まらず、待ち時間を伸ばして再挑戦。つながれば元にもどる', async () => {
    const srv = makeServer(); const d = makeDevice(srv, 'A');
    await d.engine.enable(); await d.engine.sync();
    d.play(1); srv.down = true;
    let r = await d.engine.sync();
    assert.deepEqual([r.status, r.error], ['error', 'network']);
    assert.equal(d.rec.failures, 1);
    assert.equal(d.rec.nextTryAt, d.now + 30000);
    assert.equal((await d.engine.sync()).status, 'wait');
    d.now += 30001; await d.engine.sync();
    assert.equal(d.rec.failures, 2);
    assert.equal(d.rec.nextTryAt, d.now + 60000);
    for (let i = 0; i < 10; i++) { d.now += 4000000; await d.engine.sync(); }
    assert.equal(d.rec.nextTryAt - d.now, FF.balance.SYNC.BACKOFF_MAX_MS);   // 上限
    srv.down = false;
    assert.equal((await d.engine.sync({ force: true })).status, 'pushed');   // 強制なら待ち時間を無視
    assert.equal(d.rec.failures, 0); assert.equal(d.rec.lastError, null);
    assert.equal(d.state.studyPointsEarnedTotal, 1);   // ローカルのデータは無傷
  });

  test('同期：サーバーのセーブが壊れている（integrity が合わない）と、使わずエラーにして端末のデータを守る', async () => {
    const srv = makeServer(); const a = makeDevice(srv, 'A'); const b = makeDevice(srv, 'B');
    const code = (await a.engine.enable()).code; await a.engine.sync();
    const server = Object.values(srv.profiles)[0];
    server.save.studyPoints = 999999;   // 書き換え
    await b.engine.link(code);
    b.play(7);
    const r = await b.engine.sync();
    assert.deepEqual([r.status, r.error], ['error', 'bad_remote']);
    assert.equal(b.state.studyPointsEarnedTotal, 7);
    assert.equal(b.applied.length, 0);
    assert.equal(server.rev, 1);   // サーバーも上書きしない
  });

  test('同期：出題中など画面を変えられないときは、受け取りも競合の質問も先のばし。通信中に遊んだときも上書きしない', async () => {
    const srv = makeServer(); const a = makeDevice(srv, 'A'); const b = makeDevice(srv, 'B');
    const code = (await a.engine.enable()).code; await a.engine.sync();
    await b.engine.link(code); b.choice = 'remote'; await b.engine.sync();
    a.play(20); await a.engine.sync();
    b.interruptible = false;
    assert.equal((await b.engine.sync({ force: true })).status, 'deferred');
    assert.equal(b.applied.length, 1);   // 最初の引き継ぎの1回だけ
    b.interruptible = true;
    // 通信している間にこの端末が変わる（同じ記録・同じセーブを持つ端末 c を作り、pull の最中に遊ばせる）
    const orig = srv.fetch;
    let c = null;
    srv.fetch = (u, i) => { const p = orig(u, i); if (u.endsWith('ff_pull') && c) c.play(3); return p; };
    c = makeDevice(srv, 'C'); c.rec = plain(b.rec); c.state = b.state; c.now = b.now;
    const r = await c.engine.sync({ force: true });
    assert.equal(r.status, 'deferred');
    assert.equal(c.state.studyPointsEarnedTotal, 3);
    assert.equal(c.applied.length, 0);
  });

  test('同期：サーバーに利用者がいない（消えた）ときは、作り直して送る。オフにすると通信しない', async () => {
    const srv = makeServer(); const d = makeDevice(srv, 'A');
    await d.engine.enable(); await d.engine.sync();
    srv.profiles = {};
    d.play(2);
    const r = await d.engine.sync({ force: true });
    assert.equal(r.status, 'pushed');
    assert.equal(Object.values(srv.profiles)[0].save.studyPointsEarnedTotal, 2);
    d.engine.disable();
    const n = srv.calls.length;
    assert.equal((await d.engine.sync({ force: true })).status, 'off');
    assert.equal(srv.calls.length, n);
  });

  test('同期：サーバーのデータを消すと、記録も初期にもどる', async () => {
    const srv = makeServer(); const d = makeDevice(srv, 'A');
    await d.engine.enable(); await d.engine.sync();
    assert.equal(Object.keys(srv.profiles).length, 1);
    assert.equal((await d.engine.deleteRemote()).ok, true);
    assert.equal(Object.keys(srv.profiles).length, 0);
    assert.deepEqual(plain(S.normalizeRecord(d.rec)), plain(S.newRecord()));
  });

  test('保存先：同期の記録と控えは、セーブとは別のキー。セーブの消去では消えず、clearSync で消える', () => {
    const mem = {}; const ls = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
    assert.equal(FF.storage.loadSync(ls).enabled, false);
    const r = S.newRecord(); r.enabled = true; r.code = 'ABCDEFGHJKMNPQRS';
    FF.storage.saveSync(r, ls); FF.storage.saveSyncBackup('{"x":1}', ls);
    assert.equal(FF.storage.loadSync(ls).code, 'ABCDEFGHJKMNPQRS');
    assert.equal(FF.storage.loadSyncBackup(ls), '{"x":1}');
    FF.storage.save(FF.state.createDefaultState(T0), ls);
    FF.storage.clear(ls);
    assert.equal(FF.storage.loadSync(ls).enabled, true);
    FF.storage.clearSync(ls);
    assert.equal(FF.storage.loadSync(ls).enabled, false);
    assert.equal(FF.storage.loadSyncBackup(ls), null);
    mem['frozenFrontier.save.sync'] = 'こわれた';
    assert.equal(FF.storage.loadSync(ls).enabled, false);
  });
};
