// この入口だけで使う保存領域。本体のプレイ記録を読み込まず、同期もしない。
(function (root) {
  'use strict';
  root.FF.config.SAVE_KEY = 'frozenFrontier.prototype.homepage.v1';
  root.FF.config.SAVE_FALLBACK_KEYS = [];
  root.FF.config.SYNC = null;
})(this);
