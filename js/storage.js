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
    if (text === null) return { state: FF.state.createDefaultState(now), status: 'new' };
    var r = FF.state.parseSave(text, now);
    if (!r.ok) {
      try { store.setItem(key + '.broken', text); } catch (e) { /* 退避できなくても続行する */ }
      return { state: FF.state.createDefaultState(now), status: 'error', error: r.error };
    }
    return { state: r.state, status: r.migratedFrom < FF.config.SAVE_VERSION ? 'migrated' : 'loaded' };
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
    try { store.removeItem(FF.config.SAVE_KEY); } catch (e) { /* 何もしない */ }
  }

  FF.storage = { load: load, save: save, clear: clear };
})(this);
