// 学習画面「教科を選ぼう」の教科アイコンの SVG（国語・算数・理科・社会・英語）。
// 試作イラスト（Design キャンバスの Subjects.dc.html）を元に、建物と同じくコードで描く。座標は 120 × 120。
// 教科名は SVG に入れず、ボタンの文字（ふりがな付き）で出す（SVG の文字は ruby に対応しないため。判断48）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  function S() { return FF.ui.svg; }

  // 配色。昼は試作の線・図形の色そのまま。夜は暗いボタンの上で見えるよう、同じ色相で明るくした色。
  // 下地（tile）は教科の色をうすく敷き、ボタンの地（--pick-bg）になじませる。本のページは白。
  var PALETTES = {
    day: {
      japanese: '#d84315', math: '#1565c0', science: '#2e7d32', social: '#6a1b9a', english: '#0277bd',
      tileOpacity: 0.13, page: '#ffffff', bubble: '#ffffff'
    },
    night: {
      japanese: '#ff8a65', math: '#64b5f6', science: '#81c784', social: '#ce93d8', english: '#4fc3f7',
      tileOpacity: 0.18, page: '#eef5fb', bubble: '#ffffff'
    }
  };
  function colors(theme) { return PALETTES[theme] || PALETTES.night; }

  function text(x, y, size, fill, str) {
    var t = S()('text', { x: x, y: y, 'font-size': size, 'font-weight': 700, fill: fill, 'text-anchor': 'middle' });
    t.textContent = str;
    return t;
  }

  // 開いた本（国語・英語で共通）
  function book(c, P) {
    var s = S();
    return [
      s('polygon', { points: '20,40 60,30 60,90 20,100', fill: P.page, stroke: c, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
      s('polygon', { points: '100,40 60,30 60,90 100,100', fill: P.page, stroke: c, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
      s('line', { x1: 60, y1: 30, x2: 60, y2: 90, stroke: c, 'stroke-width': 3 })
    ];
  }

  var DRAW = {
    // 国語：本と「文」、しおり。左のページに縦書きの行
    japanese: function (c, P) {
      var s = S();
      return book(c, P).concat([
        s('line', { x1: 32, y1: 46, x2: 32, y2: 84, stroke: c, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.6 }),
        s('line', { x1: 44, y1: 43, x2: 44, y2: 72, stroke: c, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.6 }),
        text(78, 72, 30, c, '文'),
        s('rect', { x: 45, y: 18, width: 8, height: 20, fill: c })
      ]);
    },
    // 算数：三角形・点線の円・たし算の記号
    math: function (c) {
      var s = S();
      return [
        s('polygon', { points: '28,92 74,92 28,38', fill: c, 'fill-opacity': 0.15, stroke: c, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
        s('circle', { cx: 78, cy: 55, r: 23, fill: 'none', stroke: c, 'stroke-width': 4, 'stroke-dasharray': '5 5' }),
        s('rect', { x: 86, y: 80, width: 18, height: 6, fill: c }),
        s('rect', { x: 92, y: 74, width: 6, height: 18, fill: c })
      ];
    },
    // 理科：三角フラスコと泡
    science: function (c, P) {
      var s = S();
      return [
        s('rect', { x: 52, y: 24, width: 16, height: 24, fill: P.page, stroke: c, 'stroke-width': 3 }),
        s('path', { d: 'M45,48 L75,48 L89,94 Q89,105 78,105 L42,105 Q31,105 31,94 Z', fill: P.page, stroke: c, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
        s('path', { d: 'M36,80 L84,80 L89,94 Q89,105 78,105 L42,105 Q31,105 31,94 Z', fill: c, 'fill-opacity': 0.6 }),
        s('circle', { cx: 55, cy: 90, r: 4, fill: P.bubble, opacity: 0.85 }),
        s('circle', { cx: 66, cy: 95, r: 3, fill: P.bubble, opacity: 0.85 }),
        s('circle', { cx: 70, cy: 84, r: 2.5, fill: P.bubble, opacity: 0.85 })
      ];
    },
    // 社会：地球儀と地図のピン
    social: function (c, P) {
      var s = S();
      return [
        s('circle', { cx: 52, cy: 62, r: 34, fill: P.page, stroke: c, 'stroke-width': 3 }),
        s('ellipse', { cx: 52, cy: 62, rx: 34, ry: 13, fill: 'none', stroke: c, 'stroke-width': 2 }),
        s('ellipse', { cx: 52, cy: 62, rx: 34, ry: 24, fill: 'none', stroke: c, 'stroke-width': 1.5 }),
        s('line', { x1: 52, y1: 28, x2: 52, y2: 96, stroke: c, 'stroke-width': 2 }),
        s('circle', { cx: 88, cy: 36, r: 8, fill: c }),
        s('polygon', { points: '88,44 82,56 94,56', fill: c })
      ];
    },
    // 英語：本の左右に「あ」と「A」
    english: function (c, P) {
      return book(c, P).concat([
        text(40, 74, 24, c, 'あ'),
        text(80, 75, 28, c, 'A')
      ]);
    }
  };

  // 教科アイコン。theme：'night' | 'day'（省略すると夜）
  function icon(subjectId, theme) {
    var s = S(), P = colors(theme), c = P[subjectId];
    var root = s('svg', {
      viewBox: '0 0 120 120', class: 'subj-icon', 'aria-hidden': 'true', focusable: 'false',
      'font-family': "'Hiragino Sans','Yu Gothic','Meiryo',sans-serif"
    });
    root.appendChild(s('rect', { width: 120, height: 120, rx: 16, fill: c, 'fill-opacity': P.tileOpacity }));
    (DRAW[subjectId] ? DRAW[subjectId](c, P) : []).forEach(function (n) { root.appendChild(n); });
    return root;
  }

  FF.svgSubjects = { icon: icon, PALETTES: PALETTES, SUBJECTS: Object.keys(DRAW) };
})(this);
