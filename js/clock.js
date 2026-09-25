// 現在時刻の取得を一元化する（SPEC 21.2）。Date.now() を直接呼んでよいのはこのファイルだけ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var offset = 0;     // advance() で進めた量
  var fixed = null;   // set() で固定した時刻

  FF.clock = {
    now: function () {
      return fixed !== null ? fixed : Date.now() + offset;
    },
    // デバッグ用：時刻を進める（固定中なら固定値を進める）
    advance: function (ms) {
      if (fixed !== null) fixed += ms;
      else offset += ms;
    },
    // テスト用：時刻を指定した値に固定する
    set: function (ms) {
      fixed = ms;
    },
    // 実際の時刻に戻す
    reset: function () {
      fixed = null;
      offset = 0;
    }
  };
})(this);
