// 昼／夜テーマ（SPEC_theme.md）：見た目の配色を決めるだけ。ゲームのロジックには関わらない。純粋関数のみ。
// 「自動」の判定に使う時刻は、画面側で実際の端末の時計（new Date()）を渡す。FF.clock は使わない（SPEC_theme 1.2）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var MODES = ['night', 'day', 'auto'];
  var DEFAULT_MODE = 'night';   // 何も設定しなければ、これまでと同じ夜の見た目

  // 設定の値を正規化する（知らない値は夜）
  function normalizeMode(mode) {
    return MODES.indexOf(mode) >= 0 ? mode : DEFAULT_MODE;
  }

  // mode：'day' | 'night' | 'auto'、now：Date → 'day' | 'night'
  // 自動は config.DAY_HOURS（start 時以上 end 時未満）を昼とする
  function resolve(mode, now, cfg) {
    cfg = cfg || FF.config;
    var m = normalizeMode(mode);
    if (m !== 'auto') return m;
    var h = now.getHours();
    return h >= cfg.DAY_HOURS.start && h < cfg.DAY_HOURS.end ? 'day' : 'night';
  }

  FF.theme = {
    MODES: MODES,
    DEFAULT_MODE: DEFAULT_MODE,
    normalizeMode: normalizeMode,
    resolve: resolve
  };
})(this);
