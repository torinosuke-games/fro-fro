// データの保存（サーバー同期）の結合テスト：本物の SQL（supabase/*.sql）＋本物のクライアント（js/sync.js）を、ローカルの Postgres でつなぐ。
// 自動テスト（tests/run.js）には入れない開発用の道具：Postgres 16 のサーバー（initdb・pg_ctl）と psql が要る。
//   node tests/tools/sync-e2e-pg.cjs          （root で動かすと、ユーザー pgtest を作って、その権限で Postgres を起動する）
// Supabase の PostgREST（/rest/v1/rpc/<関数>）の代わりに、小さな HTTP サーバーが、JSON の引数を名前つき引数にして関数を呼ぶ。
'use strict';
const fs = require('node:fs'), path = require('node:path'), http = require('node:http'), os = require('node:os');
const { execFileSync, spawnSync } = require('node:child_process');
const assert = require('node:assert/strict');
const { load } = require('../lib/loader');

const ROOT = path.resolve(__dirname, '..', '..');
const PORT_PG = 54330, ANON = 'e2e-anon-key';
const isRoot = process.getuid && process.getuid() === 0;
const BIN = (() => { const base = '/usr/lib/postgresql'; const v = fs.existsSync(base) ? fs.readdirSync(base).sort().pop() : null; return process.env.PGBIN || (v ? path.join(base, v, 'bin') : ''); })();
const D = fs.mkdtempSync(path.join(os.tmpdir(), 'ff-pg-'));
const asPg = (cmd) => isRoot ? execFileSync('su', ['-s', '/bin/bash', 'pgtest', '-c', cmd], { stdio: 'pipe' }) : execFileSync('/bin/bash', ['-c', cmd], { stdio: 'pipe' });
const USER = isRoot ? 'pgtest' : os.userInfo().username;
function psql(sql) {
  const r = spawnSync('psql', ['-h', D, '-p', String(PORT_PG), '-U', USER, '-d', 'postgres', '-v', 'ON_ERROR_STOP=1', '-qAt', '-c', sql], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr || 'psql failed');
  return r.stdout.trim();
}

function lit(v) {   // JSON の値 → SQL のリテラル
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'object') return `$j$${JSON.stringify(v)}$j$::jsonb`;
  return `$s$${String(v)}$s$`;
}
function startShim() {
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', () => {
      try {
        const m = /^\/rest\/v1\/rpc\/(ff_[a-z_]+)$/.exec(req.url);
        if (req.method === 'OPTIONS') { res.writeHead(204, { 'access-control-allow-origin': '*' }); return res.end(); }
        if (!m || req.headers.apikey !== ANON) { res.writeHead(m ? 401 : 404); return res.end('{}'); }
        const args = JSON.parse(body || '{}');
        const named = Object.entries(args).map(([k, v]) => `${k} => ${lit(v)}`).join(', ');
        const out = psql(`set role anon; select public.${m[1]}(${named});`);
        res.writeHead(200, { 'content-type': 'application/json' }); res.end(out);
      } catch (e) { res.writeHead(400, { 'content-type': 'application/json' }); res.end(JSON.stringify({ message: String(e.message).slice(0, 300) })); }
    });
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}

(async () => {
  if (isRoot) { try { execFileSync('id', ['pgtest']); } catch (e) { execFileSync('useradd', ['-m', 'pgtest']); } fs.chownSync(D, Number(execFileSync('id', ['-u', 'pgtest']).toString()), -1); }
  asPg(`${BIN}/initdb -D ${D}/data >/dev/null 2>&1 && ${BIN}/pg_ctl -D ${D}/data -o '-p ${PORT_PG} -k ${D}' -l ${D}/log start >/dev/null`);
  let server;
  try {
    for (let i = 0; i < 20; i++) { try { psql('select 1'); break; } catch (e) { await new Promise(r => setTimeout(r, 300)); } }
    psql('create role anon nologin; create role authenticated nologin;');
    for (const f of ['1_tables', '2_save_functions', '3_attempt_functions', '4_grants']) {
      const r = spawnSync('psql', ['-h', D, '-p', String(PORT_PG), '-U', USER, '-d', 'postgres', '-v', 'ON_ERROR_STOP=1', '-q', '-f', path.join(ROOT, 'supabase', f + '.sql')], { encoding: 'utf8' });
      if (r.status !== 0) throw new Error(f + ': ' + r.stderr);
    }
    server = await startShim();
    const CFG = { URL: 'http://127.0.0.1:' + server.address().port, ANON_KEY: ANON };

    // ---- 本物のクライアントで、2台の端末のシナリオ ----
    const ctx = load(); const FF = ctx.FF, S = FF.sync, T0 = 1790000000000;
    const crypto = require('node:crypto');
    function device(name) {
      const d = { rec: null, outbox: null, backup: null, now: T0, state: FF.state.withUpdated(FF.state.createDefaultState(T0), T0), choice: 'local' };
      d.engine = S.createEngine({
        fetch: (u, i) => fetch(u, i), cfg: CFG, balance: FF.balance.SYNC, now: () => d.now,
        randomBytes: n => Array.from(crypto.randomBytes(n)),
        loadRec: () => d.rec, saveRec: r => { d.rec = JSON.parse(JSON.stringify(r)); },
        loadOutbox: () => d.outbox, saveOutbox: o => { d.outbox = JSON.parse(JSON.stringify(o)); },
        saveBackup: t => { d.backup = t; }, getState: () => d.state, applyRemote: s => { d.state = s; },
        decideConflict: () => Promise.resolve(d.choice)
      });
      d.answer = (n) => { const s = JSON.parse(JSON.stringify(d.state)); for (let i = 0; i < n; i++) { d.now += 10; s.learning.history.push({ at: d.now, qid: name + '_' + s.learning.history.length, subject: 'math', grade: 4, difficulty: 2, type: 'choice', correct: i % 2 === 0, attempts: 1, hints: 0, resource: 'wood', reward: 3, points: 5 }); s.studyPointsEarnedTotal += 5; s.studyPoints += 5; } d.state = FF.state.withUpdated(s, d.now); d.engine.collect(d.state); };
      return d;
    }
    const A = device('A'), B = device('B');
    const en = await A.engine.enable();
    assert.equal(en.ok, true, JSON.stringify(en));
    assert.equal((await A.engine.sync()).status, 'pushed');
    A.answer(30);
    assert.equal((await A.engine.sync({ force: true })).status, 'pushed');
    assert.equal(psql('select count(*) from attempts'), '30');
    assert.equal(psql('select rev from saves'), '2');
    assert.equal(psql("select count(*) from profiles where key_hash = '" + en.code + "'"), '0', 'コードそのものは保管庫にない');

    assert.equal((await B.engine.link(S.formatCode(en.code))).ok, true);
    B.choice = 'remote';
    assert.equal((await B.engine.sync()).status, 'conflict-remote');
    assert.equal(B.state.studyPointsEarnedTotal, 150);
    assert.equal(B.state.learning.history.length, 30);
    assert.equal(B.engine.pending().count, 0, '受け取った履歴は送り直さない');
    B.answer(5);
    assert.equal((await B.engine.sync({ force: true })).status, 'pushed');
    assert.equal(psql('select count(*) from attempts'), '35');

    // 競合：A も B も変えた → A が先に送り、B は「この端末」を選ぶ
    A.answer(1); await A.engine.sync({ force: true });   // A はまだ B の変更を受け取っていない → 競合（A が選ぶ）
    // ↑ A の base_rev は古いので、サーバーは conflict を返す。A は 'local' を選ぶ（上書き）ので、B の分は控えに残る
    assert.ok(A.backup, '使わなかったセーブの控えが残る');
    B.now += 100000;
    B.choice = 'remote';
    const r = await B.engine.sync({ force: true });
    assert.ok(['pulled', 'unchanged'].includes(r.status), r.status);

    // 保護者の記録：コードだけで全部読める
    const read = await S.fetchAttempts((u, i) => fetch(u, i), CFG, FF.balance.SYNC, en.code);
    assert.equal(read.ok, true);
    assert.equal(read.rows.length, 36);
    assert.equal(typeof read.rows[0].at, 'number');
    const sum = FF.analytics.summarize(read.rows, { now: B.now, tzOffset: -540 });
    assert.equal(sum.total.answered, 36);
    assert.equal((await S.fetchAttempts((u, i) => fetch(u, i), CFG, FF.balance.SYNC, 'ZZZZZZZZZZZZZZZZ')).error, 'not_found');

    // anon から、テーブルを直接読めない（関数だけ）
    let denied = false; try { psql('set role anon; select count(*) from saves;'); } catch (e) { denied = /permission denied/.test(e.message); }
    assert.equal(denied, true, 'anon はテーブルを直接読めない');
    // 削除
    assert.equal((await A.engine.deleteRemote()).ok, true);
    assert.equal(psql('select (select count(*) from profiles) + (select count(*) from saves) + (select count(*) from attempts)'), '0');
    console.log('sync-e2e-pg：成功（本物の SQL とクライアントで、2台の同期・履歴・競合・保護者の記録・削除）');
  } finally {
    if (server) server.close();
    try { asPg(`${BIN}/pg_ctl -D ${D}/data stop >/dev/null 2>&1`); } catch (e) { /* 何もしない */ }
    fs.rmSync(D, { recursive: true, force: true });
  }
})().catch(e => { console.error(e); process.exit(1); });
