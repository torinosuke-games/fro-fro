// 数値以外の定義（教科・学年・難易度・資源・建物）。行を足すだけで拡張できるようにする。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  FF.defs = {
    GRADES: [
      { level: 1, label: 'Lv1', school: '小学1年' },
      { level: 2, label: 'Lv2', school: '小学2年' },
      { level: 3, label: 'Lv3', school: '小学3年' },
      { level: 4, label: 'Lv4', school: '小学4年' },
      { level: 5, label: 'Lv5', school: '小学5年' },
      { level: 6, label: 'Lv6', school: '小学6年' },
      { level: 7, label: 'Lv7', school: '中学1年' },
      { level: 8, label: 'Lv8', school: '中学2年' },
      { level: 9, label: 'Lv9', school: '中学3年' }
    ],

    // 並び順が「本日の重点教科」のローテーション順
    SUBJECTS: [
      { id: 'math', name: '数学', nameByGrade: [{ from: 1, to: 6, name: '算数' }] },
      { id: 'japanese', name: '国語' },
      { id: 'science', name: '理科', nameByGrade: [{ from: 1, to: 2, name: '生活（理科）' }] },
      { id: 'social', name: '社会', nameByGrade: [{ from: 1, to: 2, name: '生活（社会）' }] },
      { id: 'english', name: '英語' }
    ],

    DIFFICULTIES: [
      { id: 'basic', name: '基礎' },
      { id: 'standard', name: '標準' },
      { id: 'advanced', name: '発展' }
    ],

    ANSWER_TYPES: [
      { id: 'choice', name: '4択' },
      { id: 'input', name: '自由入力' }
    ],

    RESOURCES: [
      { id: 'wood', icon: '🪵', name: '木材' },
      { id: 'iron', icon: '⛏️', name: '鉄' },
      { id: 'stone', icon: '🪨', name: '石' },
      { id: 'food', icon: '🍖', name: '食料' }
    ],

    BUILDINGS: [
      { id: 'furnace', name: '中央炉' },
      { id: 'housing', name: '生存者住宅' },
      { id: 'lumber', name: '木材置き場', produces: 'wood' },
      { id: 'mine', name: '鉱山', produces: 'iron' },
      { id: 'quarry', name: '石切り場', produces: 'stone' },
      { id: 'foodhall', name: '食料施設', produces: 'food' }
    ],

    // 中央炉のレベルによる解放（v0.1）
    FURNACE_UNLOCKS: [
      { level: 2, type: 'building', id: 'quarry' },
      { level: 3, type: 'teaser', id: 'watchtower' },
      { level: 4, type: 'teaser', id: 'snowfield' },
      { level: 5, type: 'teaser', id: 'expedition' }
    ]
  };
})(this);
