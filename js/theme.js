// テーマ：2026-09-28 から昼だけ（ユーザーの判断。判断176）。夜のテーマは完成まで作らない。
// 夜の配色（css/style.css の :root、js/svg/*.js の PALETTES.night）は、あとで夜を足すかを決めるときのために残してあるが、使わない。
// 純粋関数のみ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var MODES = ['day'];
  var DEFAULT_MODE = 'day';

  // 設定の値はいつも昼（前のセーブの 'night'・'auto' も昼に直す）
  function normalizeMode() { return DEFAULT_MODE; }

  // いつも 'day'（引数は前の版との互換のため）
  function resolve() { return 'day'; }

  FF.theme = {
    MODES: MODES,
    DEFAULT_MODE: DEFAULT_MODE,
    normalizeMode: normalizeMode,
    resolve: resolve
  };
})(this);
