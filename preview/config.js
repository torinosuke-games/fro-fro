// 試作用入口だけの設定。公開版のプレイ記録と同期先は使わない。
(function (root) {
  'use strict';
  var config = root.FF.config;
  config.SAVE_KEY = 'frozenFrontier.preview.snowfield.v1';
  config.SAVE_FALLBACK_KEYS = [];
  config.SYNC = null;
})(this);
