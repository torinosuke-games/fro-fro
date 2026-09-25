// ゲーム全体の設定（バランス以外）。タイトルはここで変更できる。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  FF.config = {
    TITLE: 'FROZEN FRONTIER',
    SAVE_KEY: 'frozenFrontier.save',
    SAVE_VERSION: 2,             // 1：v0.1、2：v0.2（探索の記録を追加）
    DEFAULT_PLAYER_NAME: 'プレイヤー',
    NAME_MAX_LENGTH: 12
  };
})(this);
