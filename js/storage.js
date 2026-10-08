// localStorage への読み書き。localStorage に触ってよいのはこのファイルだけ。
// ls を渡すとそれを使う（テスト用）。渡さなければブラウザの localStorage。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function getLs(ls) {
    if (ls) return ls;
    try { return root.localStorage || null; } catch (e) { return null; }
  }

  function goodKey() { return FF.config.SAVE_KEY + '.lastGood'; }
  function historyKey() { return FF.config.SAVE_KEY + '.history'; }
  function read(store, key) { try { return store ? store.getItem(key) : null; } catch (e) { return null; } }
  function history(store) {
    try { var list=JSON.parse(read(store,historyKey()) || '[]'); return Array.isArray(list) ? list.filter(function(t){return typeof t==='string';}).slice(0,8) : []; }
    catch(e) { return []; }
  }
  // Ignore timestamp-only changes when keeping previous saves.
  function fingerprint(text) {
    try {var data=JSON.parse(text);delete data.updatedAt;delete data.integrity;if(data.tickets)delete data.tickets.lastRecoveredAt;return FF.integrity.sign(data);}
    catch(e) {return null;}
  }
  function loadRecovery(now, ls) {
    var store=getLs(ls), seen={}, out=[];
    [read(store,goodKey())].concat(history(store),[read(store,backupKey()),read(store,FF.config.SAVE_KEY+'.broken')]).forEach(function(text){
      if (!text) return;
      var parsed=FF.state.parseSave(text,now), id=fingerprint(text);
      if (parsed.ok && id && !seen[id]) {seen[id]=true;out.push({text:parsed.saveText,state:parsed.state});}
    });
    return out;
  }
  // { state, status: 'new' | 'loaded' | 'migrated' | 'recovered' | 'error', error }
  // 読めないデータは消さずに「.broken」キーへ退避し、控えがあれば復元し、なければアプリ側で自動保存を止める。
  function load(now, ls) {
    var key = FF.config.SAVE_KEY;
    var store = getLs(ls);
    var text = null;
    try { text = store ? store.getItem(key) : null; } catch (e) { return {state:FF.state.createDefaultState(now),status:'error',error:'storage'}; }
    if (text === null && store) {
      (FF.config.SAVE_FALLBACK_KEYS || []).some(function (legacyKey) {
        try { var old = store.getItem(legacyKey); if (old !== null) { text = old; key = legacyKey; return true; } } catch (e) { /* 続行 */ }
        return false;
      });
    }
    if (text === null) {
      var missing=[read(store,goodKey())].concat(history(store)).map(function(t){return t ? FF.state.parseSave(t,now) : {ok:false};}).filter(function(r){return r.ok;});
      return missing.length ? {state:missing[0].state,status:'recovered'} : { state: FF.state.createDefaultState(now), status: 'new' };
    }
    var r = FF.state.parseSave(text, now);
    if (!r.ok) {
      try { if (store.getItem(key + '.broken') === null) store.setItem(key + '.broken', text); } catch (e) { /* 退避できなくても続行する */ }
      if (r.error && r.error.indexOf('新しいバージョン') >= 0) return {state:FF.state.createDefaultState(now),status:'error',error:r.error};
      // Only local checkpoints are automatic recovery candidates; a sync conflict backup is a manual choice.
      var candidates=[read(store,goodKey())].concat(history(store));
      for (var candidate of candidates) { if (!candidate) continue; var restored=FF.state.parseSave(candidate,now);if(restored.ok)return {state:restored.state,status:'recovered'}; }
      return { state: FF.state.createDefaultState(now), status: 'error', error: r.error };
    }
    if (key !== FF.config.SAVE_KEY || r.migratedFrom < FF.config.SAVE_VERSION) {
      // 移行したデータは、すぐに最新版（integrity 付き）で保存し直す
      try { store.setItem(FF.config.SAVE_KEY, r.saveText); } catch (e) { /* 保存できなくても続行する（次の自動保存で付く） */ }
      return { state: r.state, status: 'migrated' };
    }
    return { state: r.state, status: 'loaded' };
  }

  // 成功したら true
  function save(state, ls) {
    var store = getLs(ls);
    if (!store) return false;
    var text=FF.state.serialize(state), previous=read(store,FF.config.SAVE_KEY), list=history(store);
    try { store.setItem(FF.config.SAVE_KEY,text); } catch(e) { return false; }
    // A checkpoint failure must not turn a successful primary save into a failure.
    try {
      if (previous && fingerprint(previous)!==fingerprint(text) && FF.state.parseSave(previous,state.updatedAt).ok) {
        list=[previous].concat(list.filter(function(t){return fingerprint(t)!==fingerprint(previous);})).slice(0,8);
        store.setItem(historyKey(),JSON.stringify(list));
      }
      store.setItem(goodKey(),text);
    } catch(e) { /* The primary save is already safe. */ }
    return true;
  }

  function clear(ls) {
    var store = getLs(ls);
    if (!store) return;
    [FF.config.SAVE_KEY,goodKey(),historyKey(),FF.config.SAVE_KEY+'.broken'].concat(FF.config.SAVE_FALLBACK_KEYS || []).forEach(function (key) {
      try { store.removeItem(key); } catch (e) { /* 何もしない */ }
    });
  }

  // 問題のレビューの記録（デバッグモードだけで使う。判断202）。セーブとは別のキーで、integrity は付けない
  function reviewKey() { return FF.config.SAVE_KEY + '.reviews'; }
  function loadReviews(ls) {
    var store = getLs(ls);
    try {
      var v = store ? JSON.parse(store.getItem(reviewKey()) || '{}') : {};
      return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
    } catch (e) { return {}; }
  }
  function saveReviews(obj, ls) {
    var store = getLs(ls);
    if (!store) return false;
    try { store.setItem(reviewKey(), JSON.stringify(obj)); return true; } catch (e) { return false; }
  }

  // 同期の記録（サーバー同期。判断299）と、同期で使わなかったほうのセーブ（控え）。セーブとは別のキーで、integrity は付けない
  function syncKey() { return FF.config.SAVE_KEY + '.sync'; }
  function backupKey() { return FF.config.SAVE_KEY + '.syncBackup'; }
  function loadSync(ls) {
    var store = getLs(ls);
    try { return FF.sync.normalizeRecord(JSON.parse(store ? store.getItem(syncKey()) || 'null' : 'null')); }
    catch (e) { return FF.sync.newRecord(); }
  }
  function saveSync(rec, ls) {
    var store = getLs(ls);
    if (!store) return false;
    try { store.setItem(syncKey(), JSON.stringify(rec)); return true; } catch (e) { return false; }
  }
  function loadSyncBackup(ls) {
    var store = getLs(ls);
    try { return store ? store.getItem(backupKey()) : null; } catch (e) { return null; }
  }
  function saveSyncBackup(text, ls) {
    var store = getLs(ls);
    if (!store) return false;
    try { if (text === null) store.removeItem(backupKey()); else store.setItem(backupKey(), text); return true; } catch (e) { return false; }
  }
  // 未送信の学習の履歴（サーバー同期。判断303）
  function outboxKey() { return FF.config.SAVE_KEY + '.syncOutbox'; }
  function loadOutbox(ls) {
    var store = getLs(ls);
    try { return FF.sync.normalizeOutbox(JSON.parse(store ? store.getItem(outboxKey()) || 'null' : 'null')); }
    catch (e) { return FF.sync.normalizeOutbox(null); }
  }
  function saveOutbox(o, ls) {
    var store = getLs(ls);
    if (!store) return false;
    try { store.setItem(outboxKey(), JSON.stringify(o)); return true; } catch (e) { return false; }
  }

  // 保護者の記録で見る子どものコードの一覧（この端末に保存する。判断306）。[{ code, name, addedAt }]
  function guardiansKey() { return FF.config.SAVE_KEY + '.guardians'; }
  function normalizeGuardians(list) {
    var seen = {}, out = [];
    (Array.isArray(list) ? list : []).forEach(function (g) {
      var code = g && typeof g.code === 'string' ? FF.sync.normalizeCode(g.code) : null;
      if (!code || seen[code]) return;
      seen[code] = true;
      out.push({ code: code, name: typeof g.name === 'string' ? g.name.slice(0, 24) : null, addedAt: typeof g.addedAt === 'number' ? g.addedAt : 0 });
    });
    return out.slice(0, 20);
  }
  function loadGuardians(ls) {
    var store = getLs(ls);
    try { return normalizeGuardians(JSON.parse(store ? store.getItem(guardiansKey()) || '[]' : '[]')); } catch (e) { return []; }
  }
  function saveGuardians(list, ls) {
    var store = getLs(ls);
    if (!store) return false;
    try { store.setItem(guardiansKey(), JSON.stringify(normalizeGuardians(list))); return true; } catch (e) { return false; }
  }
  function clearGuardians(ls) {
    var store = getLs(ls);
    if (store) try { store.removeItem(guardiansKey()); } catch (e) { /* 何もしない */ }
  }

  function clearSync(ls) {
    var store = getLs(ls);
    if (!store) return;
    [syncKey(), backupKey(), outboxKey()].forEach(function (k) { try { store.removeItem(k); } catch (e) { /* 何もしない */ } });
  }

  FF.storage = {
    load: load, save: save, clear: clear, loadRecovery: loadRecovery, loadReviews: loadReviews, saveReviews: saveReviews,
    loadSync: loadSync, saveSync: saveSync, loadSyncBackup: loadSyncBackup, saveSyncBackup: saveSyncBackup, clearSync: clearSync,
    loadOutbox: loadOutbox, saveOutbox: saveOutbox,
    loadGuardians: loadGuardians, saveGuardians: saveGuardians, clearGuardians: clearGuardians
  };
})(this);
