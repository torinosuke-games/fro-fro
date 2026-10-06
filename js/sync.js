// データの保存（サーバー同期）のロジック（SPEC_sync.md・判断299）。
// DOM・localStorage には触れない。通信（fetch）・時刻・保存先は、すべて引数で受け取る（テストでは偽物を渡す）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  // ---- SHA-256（純粋な JS。crypto.subtle は https でしか使えないので使わない） ----
  var K256 = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function utf8Bytes(str) {
    var out = [];
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c >= 0xd800 && c < 0xdc00 && i + 1 < str.length) {
        var d = str.charCodeAt(i + 1);
        if (d >= 0xdc00 && d < 0xe000) { c = 0x10000 + ((c - 0xd800) << 10) + (d - 0xdc00); i++; }
      }
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
      else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
      else out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }

  function sha256Hex(str) {
    var bytes = utf8Bytes(String(str));
    var bitLen = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    var hi = Math.floor(bitLen / 4294967296), lo = bitLen >>> 0;
    bytes.push((hi >>> 24) & 255, (hi >>> 16) & 255, (hi >>> 8) & 255, hi & 255, (lo >>> 24) & 255, (lo >>> 16) & 255, (lo >>> 8) & 255, lo & 255);
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var w = new Array(64);
    function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
    for (var off = 0; off < bytes.length; off += 64) {
      var t;
      for (t = 0; t < 16; t++) w[t] = ((bytes[off + 4 * t] << 24) | (bytes[off + 4 * t + 1] << 16) | (bytes[off + 4 * t + 2] << 8) | bytes[off + 4 * t + 3]) | 0;
      for (t = 16; t < 64; t++) {
        var s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3);
        var s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10);
        w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0;
      }
      var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (t = 0; t < 64; t++) {
        var S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K256[t] + w[t]) | 0;
        var S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
  }

  // ---- 引き継ぎコード ----
  // 紛らわしい文字（0 O 1 I L）を除いた 31 種 × 16 文字（約 79 ビット）
  var ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var CODE_LENGTH = 16;

  // randomBytes(n) → 0〜255 の n 個の配列（ブラウザでは crypto.getRandomValues。テストでは偽物）
  function generateCode(randomBytes) {
    var out = '';
    var limit = 256 - (256 % ALPHABET.length);   // 偏りをなくすため、これ以上の値は捨てる
    while (out.length < CODE_LENGTH) {
      var bytes = randomBytes(CODE_LENGTH * 2);
      for (var i = 0; i < bytes.length && out.length < CODE_LENGTH; i++) {
        if (bytes[i] < limit) out += ALPHABET.charAt(bytes[i] % ALPHABET.length);
      }
    }
    return out;
  }

  // 入力された文字 → 16文字のコード。ハイフン・空白・小文字はゆるす。形が違えば null
  function normalizeCode(text) {
    var c = String(text == null ? '' : text).toUpperCase().replace(/[\s\-ー－‐]/g, '');
    if (c.length !== CODE_LENGTH) return null;
    for (var i = 0; i < c.length; i++) if (ALPHABET.indexOf(c.charAt(i)) < 0) return null;
    return c;
  }

  function formatCode(code) {
    return String(code).replace(/(.{4})(?=.)/g, '$1-');
  }

  // サーバーに送る鍵（コードの指紋。コードそのものは送らない）
  function keyOf(code) { return sha256Hex('FROZEN-FRONTIER/sync/' + code); }

  // ---- 同期の記録（セーブとは別のキーに保存する） ----
  function newRecord() {
    return { enabled: false, code: null, deviceId: null, rev: null, pushedAt: null, lastSyncAt: null, failures: 0, nextTryAt: 0, lastError: null, consentAt: null };
  }
  function normalizeRecord(obj) {
    var r = newRecord();
    if (!obj || typeof obj !== 'object') return r;
    r.enabled = obj.enabled === true;
    r.code = typeof obj.code === 'string' && normalizeCode(obj.code) ? normalizeCode(obj.code) : null;
    r.deviceId = typeof obj.deviceId === 'string' ? obj.deviceId.slice(0, 64) : null;
    r.rev = typeof obj.rev === 'number' && obj.rev >= 0 && isFinite(obj.rev) ? Math.floor(obj.rev) : null;
    ['pushedAt', 'lastSyncAt', 'consentAt'].forEach(function (k) { r[k] = typeof obj[k] === 'number' && isFinite(obj[k]) ? obj[k] : null; });
    r.failures = typeof obj.failures === 'number' && obj.failures > 0 ? Math.floor(obj.failures) : 0;
    r.nextTryAt = typeof obj.nextTryAt === 'number' && isFinite(obj.nextTryAt) ? obj.nextTryAt : 0;
    r.lastError = typeof obj.lastError === 'string' ? obj.lastError.slice(0, 40) : null;
    if (!r.code) r.enabled = false;
    return r;
  }

  function newDeviceId(randomBytes) {
    return randomBytes(6).map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
  }

  // 競合の選択画面に見せる、セーブの要約
  function summarize(state) {
    var levels = 0;
    var b = state && state.buildings ? state.buildings : {};
    Object.keys(b).forEach(function (id) { levels += (b[id] && b[id].level) || 0; });
    return {
      updatedAt: state && state.updatedAt || 0,
      name: state && state.player ? state.player.name : '',
      points: state && state.studyPointsEarnedTotal || 0,
      levels: levels
    };
  }

  // ---- 学習の履歴（attempts）----
  // 履歴の1件（learning.history の要素）→ サーバーに送る1行。使えない形なら null。
  // attempt_id は中身だけで決める（端末の ID は入れない）：同じ履歴が別の端末から来ても、サーバーで1件になる
  function str(v, n) { return typeof v === 'string' ? v.slice(0, n) : null; }
  function int(v) { return typeof v === 'number' && isFinite(v) ? Math.floor(v) : null; }
  function attemptRow(h, deviceId) {
    if (!h || typeof h !== 'object' || typeof h.qid !== 'string' || !h.qid || typeof h.at !== 'number' || !isFinite(h.at) || typeof h.correct !== 'boolean') return null;
    var at = Math.floor(h.at);
    return {
      attempt_id: at + '-' + h.qid.slice(0, 80) + '-' + (int(h.attempts) === null ? 0 : int(h.attempts)),
      at: at, qid: h.qid.slice(0, 80), subject: str(h.subject, 24), grade: int(h.grade), difficulty: int(h.difficulty),
      type: str(h.type, 16), correct: h.correct, attempts: int(h.attempts), hints: int(h.hints),
      resource: str(h.resource, 24), reward: int(h.reward), points: int(h.points), device_id: deviceId || null
    };
  }
  function normalizeOutbox(o) {
    var rows = o && Array.isArray(o.rows) ? o.rows.filter(function (r) { return r && typeof r.attempt_id === 'string'; }) : [];
    var known = o && Array.isArray(o.known) ? o.known.filter(function (k) { return typeof k === 'string'; }) : [];
    // known：箱に入れた（または、ほかの端末が送った）履歴の attempt_id。新しい順に、上限まで覚える
    return { rows: rows, dropped: o && typeof o.dropped === 'number' && o.dropped > 0 ? Math.floor(o.dropped) : 0, known: known.slice(-2000) };
  }

  // ---- 通信（Supabase の RPC） ----
  // 失敗しても例外は投げず、{ ok: false, error } を返す
  function rpc(fetchFn, cfg, name, args, timeoutMs) {
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = null;
    var req;
    try {
      req = fetchFn(String(cfg.URL).replace(/\/+$/, '') + '/rest/v1/rpc/' + name, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: cfg.ANON_KEY, Authorization: 'Bearer ' + cfg.ANON_KEY },
        body: JSON.stringify(args || {}),
        signal: ctrl ? ctrl.signal : undefined
      });
    } catch (e) { return Promise.resolve({ ok: false, error: 'network' }); }
    var timeout = new Promise(function (resolve) {
      timer = setTimeout(function () { if (ctrl) ctrl.abort(); resolve({ ok: false, error: 'timeout' }); }, timeoutMs || 10000);
    });
    var run = Promise.resolve(req).then(function (res) {
      if (!res || !res.ok) return { ok: false, error: 'http_' + (res ? res.status : 0) };
      return res.json().then(function (j) {
        return j && typeof j === 'object' ? j : { ok: false, error: 'bad_response' };
      });
    }).catch(function () { return { ok: false, error: 'network' }; });
    return Promise.race([run, timeout]).then(function (r) { clearTimeout(timer); return r; });
  }

  // ---- 同期の進め方 ----
  // deps：fetch, cfg（URL・ANON_KEY）, balance（FF.balance.SYNC）, now(), randomBytes(n),
  //       loadRec(), saveRec(rec), saveBackup(text), getState(), applyRemote(state),
  //       decideConflict(info) → Promise<'local'|'remote'|null>, canInterrupt()（省略可。false の間は、画面を変える処理を先のばし）
  function createEngine(deps) {
    var B = deps.balance;
    var busy = false;

    function rec() { return normalizeRecord(deps.loadRec()); }
    function put(r) { deps.saveRec(r); return r; }
    function outbox() { return normalizeOutbox(deps.loadOutbox ? deps.loadOutbox() : null); }
    function putOutbox(o) { if (deps.saveOutbox) deps.saveOutbox(o); }

    // 新しい回答の履歴を、未送信の箱に入れる（同期がオンのときだけ）。入れた件数を返す。
    // 時刻の比べっこはしない（端末の時計がずれていても取りこぼさないため）。箱に入れた履歴の ID（known）で、新しいかどうかを決める。
    // known がないとき（オンにした直後）は、端末にある履歴すべてが新しい＝さかのぼって送る
    function collect(state) {
      var r = rec();
      if (!r.enabled || !r.code || !state || !state.learning || !Array.isArray(state.learning.history)) return 0;
      var hist = state.learning.history;
      if (!hist.length) return 0;
      var o = outbox();
      var known = {};
      o.known.forEach(function (k) { known[k] = true; });
      var lastRow = attemptRow(hist[hist.length - 1], r.deviceId);
      if (lastRow && known[lastRow.attempt_id]) return 0;   // いちばん新しい履歴が、もう知っているものなら、何も増えていない
      var added = 0;
      for (var i = 0; i < hist.length; i++) {
        var row = attemptRow(hist[i], r.deviceId);
        if (row && !known[row.attempt_id]) { known[row.attempt_id] = true; o.known.push(row.attempt_id); o.rows.push(row); added++; }
      }
      if (o.rows.length > B.OUTBOX_LIMIT) { o.dropped += o.rows.length - B.OUTBOX_LIMIT; o.rows = o.rows.slice(o.rows.length - B.OUTBOX_LIMIT); }
      o.known = o.known.slice(-2000);
      if (added) putOutbox(o);
      return added;
    }

    // 受け取ったセーブの履歴は、ほかの端末が送っている。「知っている」ことにして、送り直さない
    function markKnown(state) {
      var hist = state && state.learning && state.learning.history;
      if (!hist || !hist.length) return;
      var o = outbox();
      var known = {};
      o.known.forEach(function (k) { known[k] = true; });
      hist.forEach(function (h) {
        var row = attemptRow(h, null);
        if (row && !known[row.attempt_id]) { known[row.attempt_id] = true; o.known.push(row.attempt_id); }
      });
      o.known = o.known.slice(-2000);
      putOutbox(o);
    }

    // 未送信の履歴を、サーバーへ送る（200件ずつ、1回に最大 ATTEMPT_BATCHES_PER_SYNC 回）。失敗したら箱に残す
    function flush(r, key) {
      var n = 0;
      function next() {
        var o = outbox();
        if (!o.rows.length || n >= B.ATTEMPT_BATCHES_PER_SYNC) return Promise.resolve(null);
        n++;
        var batch = o.rows.slice(0, B.ATTEMPT_BATCH);
        return rpc(deps.fetch, deps.cfg, 'ff_push_attempts', { p_key: key, p_rows: batch }, B.TIMEOUT_MS).then(function (res) {
          if (!res.ok) return res.error || 'attempts';
          var sent = {};
          batch.forEach(function (x) { sent[x.attempt_id] = true; });
          var now = outbox();   // 通信している間に増えた分を消さないよう、読み直す
          now.rows = now.rows.filter(function (x) { return !sent[x.attempt_id]; });
          putOutbox(now);
          return next();
        });
      }
      return next();
    }

    function fail(r, code) {
      r.failures += 1;
      r.lastError = code;
      r.nextTryAt = deps.now() + Math.min(B.BACKOFF_MAX_MS, B.BACKOFF_BASE_MS * Math.pow(2, r.failures - 1));
      put(r);
      return { status: 'error', error: code };
    }
    function succeed(r, status) {
      r.failures = 0; r.lastError = null; r.nextTryAt = 0; r.lastSyncAt = deps.now();
      put(r);
      return { status: status };
    }

    // サーバーのセーブ（JSON）を、読み込みと同じ検証にかける。使えなければ null
    function parseRemote(saveJson) {
      if (!saveJson || typeof saveJson !== 'object') return null;
      var r = FF.state.parseSave(JSON.stringify(saveJson), deps.now());
      return r.ok ? r.state : null;
    }

    function pushState(r, key, state, baseRev) {
      return rpc(deps.fetch, deps.cfg, 'ff_push_save',
        { p_key: key, p_base_rev: baseRev, p_save: JSON.parse(FF.state.serialize(state)), p_device: r.deviceId }, B.TIMEOUT_MS)
        .then(function (res) {
          if (res.ok) { r.rev = res.rev; r.pushedAt = state.updatedAt; }
          return res;
        });
    }

    // 通信している間に、この端末のデータが変わっていたら、上書きしない
    function changedMeanwhile(local) {
      var now = deps.getState();
      return !now || now.updatedAt !== local.updatedAt;
    }

    function adoptRemote(r, remoteState, serverRev) {
      deps.applyRemote(remoteState);
      markKnown(remoteState);
      r.rev = serverRev;
      r.pushedAt = remoteState.updatedAt;
    }

    function resolveConflict(r, key, local, pull, remoteState, firstLink) {
      if (deps.canInterrupt && !deps.canInterrupt()) return Promise.resolve({ status: 'deferred' });
      if (changedMeanwhile(local)) return Promise.resolve({ status: 'deferred' });
      return Promise.resolve(deps.decideConflict({
        local: summarize(local), remote: summarize(remoteState), firstLink: !!firstLink
      })).then(function (choice) {
        if (choice === 'remote') {
          if (changedMeanwhile(local)) return { status: 'deferred' };
          deps.saveBackup(FF.state.serialize(local));
          adoptRemote(r, remoteState, pull.rev);
          return succeed(r, 'conflict-remote');
        }
        if (choice === 'local') {
          deps.saveBackup(JSON.stringify(pull.save_json));
          return pushState(r, key, local, pull.rev).then(function (res) {
            if (!res.ok) return fail(r, res.error || 'push');
            return succeed(r, 'conflict-local');
          });
        }
        r.nextTryAt = deps.now() + B.CONFLICT_DEFER_MS;
        put(r);
        return { status: 'conflict-pending' };
      });
    }

    // 1回の同期。opts.force が true なら、待ち時間を無視する
    function sync(opts) {
      opts = opts || {};
      var r = rec();
      if (!r.enabled || !r.code) return Promise.resolve({ status: 'off' });
      if (busy) return Promise.resolve({ status: 'busy' });
      if (!opts.force && deps.now() < r.nextTryAt) return Promise.resolve({ status: 'wait' });
      busy = true;
      var key = keyOf(r.code);
      var local = deps.getState();
      collect(local);
      var chain = rpc(deps.fetch, deps.cfg, 'ff_pull', { p_key: key }, B.TIMEOUT_MS).then(function (pull) {
        if (!pull.ok && pull.error === 'not_found') {
          return rpc(deps.fetch, deps.cfg, 'ff_create_profile', { p_key: key }, B.TIMEOUT_MS).then(function (c) {
            return c.ok ? { ok: true, rev: 0, save_json: null } : c;
          });
        }
        return pull;
      }).then(function (pull) {
        if (!pull.ok) return fail(r, pull.error || 'pull');
        var serverRev = pull.rev || 0;
        var hasRemote = pull.save_json != null;
        var changed = r.rev === null || local.updatedAt !== r.pushedAt;

        if (r.rev === null) {
          if (!hasRemote) {
            return pushState(r, key, local, 0).then(function (res) {
              return res.ok ? succeed(r, 'pushed') : fail(r, res.error || 'push');
            });
          }
          var first = parseRemote(pull.save_json);
          if (!first) return fail(r, 'bad_remote');
          return resolveConflict(r, key, local, pull, first, true);
        }
        if (!hasRemote) {
          // サーバーのセーブが消えている（利用者を作り直した）：この端末のデータを、最初のセーブとして送る
          return pushState(r, key, local, 0).then(function (res) {
            return res.ok ? succeed(r, 'pushed') : fail(r, res.error || 'push');
          });
        }
        if (serverRev === r.rev) {
          if (!changed) return succeed(r, 'unchanged');
          return pushState(r, key, local, r.rev).then(function (res) {
            if (res.ok) return succeed(r, 'pushed');
            if (res.error === 'conflict') {
              var remoteNow = parseRemote(res.save_json);
              if (!remoteNow) return fail(r, 'bad_remote');
              return resolveConflict(r, key, local, res, remoteNow, false);
            }
            return fail(r, res.error || 'push');
          });
        }
        // サーバーのほうが新しい
        var remote = parseRemote(pull.save_json);
        if (!remote) return fail(r, 'bad_remote');
        if (!changed) {
          if ((deps.canInterrupt && !deps.canInterrupt()) || changedMeanwhile(local)) return { status: 'deferred' };
          adoptRemote(r, remote, serverRev);
          return succeed(r, 'pulled');
        }
        return resolveConflict(r, key, local, pull, remote, false);
      }).then(function (out) {
        // セーブの同期のあと、未送信の履歴を送る（セーブが「あとで」「先のばし」でも送る。通信できなかったときは送らない）
        if (out.status === 'error' || !outbox().rows.length) return out;
        var r2 = rec();
        return flush(r2, key).then(function (err) {
          if (err) return fail(r2, err);
          return out;
        });
      }).then(function (out) { busy = false; return out; }, function (e) { busy = false; return fail(r, 'exception'); });
      return chain;
    }

    // 同期をオンにする。コードがなければ作って、サーバーに利用者を作る。
    // 返す値：{ ok, code } か { ok: false, error }
    function enable(opts) {
      opts = opts || {};
      var r = rec();
      var code = r.code || generateCode(deps.randomBytes);
      var key = keyOf(code);
      var make = r.code ? Promise.resolve({ ok: true }) : rpc(deps.fetch, deps.cfg, 'ff_create_profile', { p_key: key }, B.TIMEOUT_MS);
      return make.then(function (res) {
        if (!res.ok) return { ok: false, error: res.error || 'create' };
        r.enabled = true; r.code = code; r.deviceId = r.deviceId || newDeviceId(deps.randomBytes);
        r.consentAt = r.consentAt || deps.now();
        if (!rec().code) { r.rev = null; r.pushedAt = null; }
        put(r);
        return { ok: true, code: code };
      });
    }

    // 別の端末のコードで引き継ぐ（サーバーにそのコードの利用者があるか確かめる）。同期は、このあと sync() で行う
    function link(codeText) {
      var code = normalizeCode(codeText);
      if (!code) return Promise.resolve({ ok: false, error: 'bad_code' });
      return rpc(deps.fetch, deps.cfg, 'ff_pull', { p_key: keyOf(code) }, B.TIMEOUT_MS).then(function (res) {
        if (!res.ok) return { ok: false, error: res.error === 'not_found' ? 'not_found' : (res.error || 'pull') };
        var r = rec();
        r.enabled = true; r.code = code; r.deviceId = r.deviceId || newDeviceId(deps.randomBytes);
        r.rev = null; r.pushedAt = null; r.failures = 0; r.nextTryAt = 0; r.lastError = null;
        r.consentAt = r.consentAt || deps.now();
        put(r);
        return { ok: true };
      });
    }

    function disable() {
      var r = rec();
      r.enabled = false;
      put(r);
    }

    // サーバーのデータをすべて消して、同期をオフにする（コードも捨てる）
    function deleteRemote() {
      var r = rec();
      if (!r.code) return Promise.resolve({ ok: true });
      return rpc(deps.fetch, deps.cfg, 'ff_delete_profile', { p_key: keyOf(r.code) }, B.TIMEOUT_MS).then(function (res) {
        if (res.ok || res.error === 'not_found') { deps.saveRec(newRecord()); putOutbox({ rows: [], dropped: 0, known: [] }); return { ok: true }; }
        return { ok: false, error: res.error || 'delete' };
      });
    }

    function pending() { var o = outbox(); return { count: o.rows.length, dropped: o.dropped }; }

    return { sync: sync, enable: enable, link: link, disable: disable, deleteRemote: deleteRemote, record: rec, collect: collect, pending: pending };
  }

  FF.sync = {
    sha256Hex: sha256Hex, ALPHABET: ALPHABET, CODE_LENGTH: CODE_LENGTH,
    generateCode: generateCode, normalizeCode: normalizeCode, formatCode: formatCode, keyOf: keyOf,
    newRecord: newRecord, normalizeRecord: normalizeRecord, summarize: summarize, attemptRow: attemptRow, normalizeOutbox: normalizeOutbox,
    rpc: rpc, createEngine: createEngine
  };
})(this);
