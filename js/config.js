// ゲーム全体の設定（バランス以外）。タイトルはここで変更できる。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  FF.config = {
    TITLE: 'FROZEN FRONTIER',
    SAVE_KEY: 'frozenFrontier.save',
    SAVE_VERSION: 3,             // 1：v0.1、2：v0.2（探索の記録を追加）、3：integrity（改ざん検出の指紋）が必須
    INTEGRITY_REQUIRED_FROM: 3,  // この版以降のセーブは integrity がない・一致しないと読み込まない
    DAY_HOURS: { start: 6, end: 18 },   // テーマ「自動」で昼にする時間帯（start 時以上 end 時未満、端末の時計）
    DEFAULT_PLAYER_NAME: 'プレイヤー',
    NAME_MAX_LENGTH: 12
  };
})(this);
