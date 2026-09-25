// ゲーム全体の設定（バランス以外）。タイトルはここで変更できる。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  FF.config = {
    TITLE: 'FROZEN FRONTIER',
    SAVE_KEY: 'frozenFrontier.save',
    SAVE_VERSION: 1,
    DEFAULT_PLAYER_NAME: 'プレイヤー',
    NAME_MAX_LENGTH: 12
  };
})(this);
