// ゲーム全体の設定（バランス以外）。タイトルはここで変更できる。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  FF.config = {
    TITLE: 'FROZEN FRONTIER',
    SAVE_KEY: 'frozenFrontier.save',
    SAVE_FALLBACK_KEYS: ['frozenFrontier.renewal.save'], // ローカル試作版の記録も引き継ぐ
    SAVE_VERSION: 3,             // 1：v0.1、2：v0.2（探索の記録を追加）、3：integrity（改ざん検出の指紋）が必須
    INTEGRITY_REQUIRED_FROM: 3,  // この版以降のセーブは integrity がない・一致しないと読み込まない
    DAY_HOURS: { start: 6, end: 18 },   // テーマ「自動」で昼にする時間帯（start 時以上 end 時未満、端末の時計）
    DEFAULT_PLAYER_NAME: 'プレイヤー',
    NAME_MAX_LENGTH: 12,
    // 開始画面の見た目（試作。2026-09-28）：'hero' ＝ 雪原の絵・白いカード（昼のテーマのときだけ）、
    // 'classic' ＝ これまでの見た目。戻すときは 'classic' にする（夜のテーマはどちらでも これまでの見た目）
    TITLE_STYLE: 'hero',
    TITLE_HERO_IMAGE: 'img/title_snowfield.jpg',
    // 絵の見た目（試作。2026-09-28、判断177）：'art' ＝ 生成した絵（img/art/）で、基地の風景・建物・資源・教科のアイコンを出す。
    // 'classic' ＝ これまでの SVG・絵文字。戻すときは 'classic' にする。元の画像は img/test_img/（img/art/ は縮めた写し）
    ART_STYLE: 'art',
    ART_DIR: 'img/art/'
  };
})(this);
