// localStorage への読み書き。localStorage に触ってよいのはこのファイルだけ。
// ls を渡すとそれを使う（テスト用）。渡さなければブラウザの localStorage。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function getLs(ls) {
    if (ls) return ls;
    try { return root.localStorage || null; } catch (e) { return null; }
  }

  // { state, status: 'new' | 'loaded' | 'migrated' | 'error', error }
  // 読めないデータは消さずに「.broken」キーへ退避し、新規状態で始める。
  function load(now, ls) {
    var key = FF.config.SAVE_KEY;
    var store = getLs(ls);
    var text = null;
    try { text = store ? store.getItem(key) : null; } catch (e) { text = null; }
    if (text === null && store) {
      (FF.config.SAVE_FALLBACK_KEYS || []).some(function (legacyKey) {
        try { var old = store.getItem(legacyKey); if (old !== null) { text = old; key = legacyKey; return true; } } catch (e) { /* 続行 */ }
        return false;
      });
    }
    if (text === null) return { state: FF.state.createDefaultState(now), status: 'new' };
    var r = FF.state.parseSave(text, now);
    if (!r.ok) {
      try { store.setItem(key + '.broken', text); } catch (e) { /* 退避できなくても続行する */ }
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
    try {
      store.setItem(FF.config.SAVE_KEY, FF.state.serialize(state));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clear(ls) {
    var store = getLs(ls);
    if (!store) return;
    [FF.config.SAVE_KEY].concat(FF.config.SAVE_FALLBACK_KEYS || []).forEach(function (key) {
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
  function clearSync(ls) {
    var store = getLs(ls);
    if (!store) return;
    [syncKey(), backupKey()].forEach(function (k) { try { store.removeItem(k); } catch (e) { /* 何もしない */ } });
  }

  FF.storage = {
    load: load, save: save, clear: clear, loadReviews: loadReviews, saveReviews: saveReviews,
    loadSync: loadSync, saveSync: saveSync, loadSyncBackup: loadSyncBackup, saveSyncBackup: saveSyncBackup, clearSync: clearSync
  };
})(this);
