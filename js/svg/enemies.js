// 敵の立ち絵（v0.3 その2、DESIGN 13.8）。雑魚 7体と、ボスの画像がないときの仮の絵 3体をコードで描く。
// 座標は 300 × 200（ボスの画像と同じ 3:2）。背景（空・地面）は昼夜で切り替え、敵の色は昼夜で同じ。
// 名前は SVG に入れず、画面の文字（ふりがな付き）で出す（SVG の文字は ruby に対応しないため。判断48）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  function S() { return FF.ui.svg; }

  var PALETTES = {
    night: { sky: ['#0b1624', '#1d3450'], ground: '#c6d6e4', groundShade: '#8ea6bb', mist: 'rgba(200,225,245,0.18)', star: '#dbe8ff' },
    day: { sky: ['#5ea7dc', '#cfe8f7'], ground: '#f4f9fd', groundShade: '#c9dceb', mist: 'rgba(255,255,255,0.45)', star: null }
  };
  // 地域ごとの地面の色み（森は少し緑、氷河は少し青）
  var REGION_TINT = { snowfield: null, forest: 'rgba(60,110,80,0.18)', glacier: 'rgba(60,140,210,0.22)' };

  function el(tag, attrs) { return S()(tag, attrs); }
  function g(attrs, children) { var n = S()('g', attrs || {}); (children || []).forEach(function (c) { if (c) n.appendChild(c); }); return n; }

  function backdrop(theme, region) {
    var P = PALETTES[theme] || PALETTES.night, id = 'eg' + Math.floor(Math.random() * 1e9);
    var defs = S()('defs', {}, [S()('linearGradient', { id: id, x1: 0, y1: 0, x2: 0, y2: 1 }, [
      el('stop', { offset: '0', 'stop-color': P.sky[0] }), el('stop', { offset: '1', 'stop-color': P.sky[1] })
    ])]);
    var out = [defs, el('rect', { x: 0, y: 0, width: 300, height: 200, fill: 'url(#' + id + ')' })];
    if (P.star) for (var i = 0; i < 14; i++) out.push(el('circle', { cx: (i * 67) % 300, cy: 8 + (i * 23) % 70, r: 0.9, fill: P.star, opacity: 0.6 }));
    out.push(el('path', { d: 'M0 120 L50 92 L90 112 L140 84 L190 110 L240 88 L300 108 V200 H0 Z', fill: P.groundShade, opacity: 0.55 }));
    out.push(el('path', { d: 'M0 150 Q80 132 150 146 T300 140 V200 H0 Z', fill: P.ground }));
    if (REGION_TINT[region]) out.push(el('path', { d: 'M0 150 Q80 132 150 146 T300 140 V200 H0 Z', fill: REGION_TINT[region] }));
    out.push(el('ellipse', { cx: 150, cy: 176, rx: 120, ry: 10, fill: P.mist }));
    return out;
  }

  // ---- 敵の絵 ----
  // オオカミの頭（横向き）。むれ・長で使う
  function wolfHead(x, y, sc, fur, eye) {
    return g({ transform: 'translate(' + x + ',' + y + ') scale(' + sc + ')' }, [
      el('path', { d: 'M-30 20 L-22 -8 L-18 -30 L-8 -12 L6 -14 L14 -32 L18 -10 L34 2 L40 12 L26 16 L12 24 L-6 30 Z', fill: fur, stroke: '#5b7890', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }),
      el('path', { d: 'M26 16 L40 12 L42 18 L28 22 Z', fill: '#e8f3fb' }),
      el('path', { d: 'M28 19 L31 25 L33 19 M35 18 L37 23 L39 17', fill: 'none', stroke: '#ffffff', 'stroke-width': 1.4 }),
      el('circle', { cx: 16, cy: 0, r: 3, fill: eye }),
      el('circle', { cx: 40, cy: 12, r: 2.4, fill: '#1c2530' })
    ]);
  }
  var ART = {
    fangs: function () {
      return [wolfHead(90, 118, 1.0, '#cfe3f2', '#6fd4ff'), wolfHead(205, 112, 1.1, '#bcd6ea', '#6fd4ff'), wolfHead(150, 132, 1.35, '#e2eef8', '#8fe0ff')];
    },
    machine: function () {
      return [g({}, [
        el('rect', { x: 118, y: 150, width: 20, height: 22, fill: '#46525e' }), el('rect', { x: 162, y: 150, width: 20, height: 22, fill: '#46525e' }),
        el('rect', { x: 104, y: 78, width: 92, height: 76, rx: 8, fill: '#5d6b79', stroke: '#2e3842', 'stroke-width': 2 }),
        el('rect', { x: 124, y: 44, width: 52, height: 38, rx: 6, fill: '#6b7a88', stroke: '#2e3842', 'stroke-width': 2 }),
        el('rect', { x: 132, y: 56, width: 36, height: 10, rx: 3, fill: '#1b2229' }),
        el('circle', { cx: 150, cy: 61, r: 4, fill: '#ff4a3d' }),
        el('circle', { cx: 150, cy: 112, r: 10, fill: '#ff5a3d', opacity: 0.9 }), el('circle', { cx: 150, cy: 112, r: 18, fill: '#ff5a3d', opacity: 0.2 }),
        el('rect', { x: 78, y: 84, width: 24, height: 58, rx: 8, fill: '#56636f', stroke: '#2e3842', 'stroke-width': 2 }),
        el('rect', { x: 198, y: 84, width: 24, height: 58, rx: 8, fill: '#56636f', stroke: '#2e3842', 'stroke-width': 2 }),
        el('path', { d: 'M104 80 Q150 64 196 80 L196 88 Q150 74 104 88 Z', fill: '#e6f2fb' }),
        el('path', { d: 'M124 46 Q150 36 176 46 L176 52 Q150 44 124 52 Z', fill: '#f1f8fd' })
      ])];
    },
    antler: function () {
      var ant = 'M0 0 L-6 -22 M-6 -22 L-18 -30 M-6 -22 L-2 -38 M-2 -38 L-12 -48 M-2 -38 L6 -52';
      return [g({}, [
        el('path', { d: 'M110 172 L114 128 M128 172 L130 128 M170 172 L172 128 M186 172 L186 128', stroke: '#6b5a4a', 'stroke-width': 7, 'stroke-linecap': 'round' }),
        el('ellipse', { cx: 150, cy: 118, rx: 50, ry: 24, fill: '#8a735c' }),
        el('path', { d: 'M186 108 L204 80 L226 78 L232 90 L214 96 L200 118 Z', fill: '#8a735c' }),
        el('circle', { cx: 222, cy: 86, r: 2.5, fill: '#bfe9ff' }),
        g({ transform: 'translate(212,78)' }, [el('path', { d: ant, fill: 'none', stroke: '#bfe6fb', 'stroke-width': 4, 'stroke-linecap': 'round' })]),
        g({ transform: 'translate(222,78) scale(-1,1)' }, [el('path', { d: ant, fill: 'none', stroke: '#d8f1ff', 'stroke-width': 4, 'stroke-linecap': 'round' })]),
        el('path', { d: 'M104 104 Q150 88 196 104', fill: 'none', stroke: '#eaf6fd', 'stroke-width': 5, 'stroke-linecap': 'round' })
      ])];
    },
    roots: function () {
      var r = [];
      [[70, 1], [110, -1], [150, 1], [190, -1], [230, 1]].forEach(function (p, i) {
        r.push(el('path', { d: 'M' + p[0] + ' 178 Q' + (p[0] + 30 * p[1]) + ' ' + (130 - i * 6) + ' ' + (p[0] - 10 * p[1]) + ' ' + (80 + (i % 2) * 20) + ' T' + (p[0] + 20 * p[1]) + ' ' + (40 + i * 5), fill: 'none', stroke: '#1f1a1a', 'stroke-width': 9 - i % 2 * 2, 'stroke-linecap': 'round' }));
      });
      r.push(el('ellipse', { cx: 150, cy: 118, rx: 34, ry: 26, fill: '#241d1d' }));
      r.push(el('circle', { cx: 139, cy: 114, r: 4, fill: '#9df0c4' }), el('circle', { cx: 161, cy: 114, r: 4, fill: '#9df0c4' }));
      r.push(el('path', { d: 'M60 176 Q150 164 240 176', fill: 'none', stroke: '#e7f1f8', 'stroke-width': 4 }));
      return r;
    },
    leopard: function () {
      var spots = [];
      [[128, 116], [146, 110], [164, 118], [182, 112], [138, 128], [172, 130], [200, 122]].forEach(function (p) {
        spots.push(el('circle', { cx: p[0], cy: p[1], r: 3.2, fill: 'none', stroke: '#5c6770', 'stroke-width': 1.6 }));
      });
      return [g({}, [
        el('path', { d: 'M226 126 Q270 118 262 88 Q258 78 248 84', fill: 'none', stroke: '#dfe6ec', 'stroke-width': 11, 'stroke-linecap': 'round' }),
        el('ellipse', { cx: 166, cy: 124, rx: 60, ry: 22, fill: '#e3e9ee' }),
        el('path', { d: 'M114 136 L110 170 M136 140 L136 172 M196 140 L198 172 M218 134 L222 170', stroke: '#d4dbe1', 'stroke-width': 10, 'stroke-linecap': 'round' }),
        el('circle', { cx: 100, cy: 112, r: 22, fill: '#e8edf1' }),
        el('path', { d: 'M86 96 L90 84 L98 94 M106 94 L114 84 L116 98', fill: '#e8edf1', stroke: '#9aa6af', 'stroke-width': 1.5 }),
        el('circle', { cx: 93, cy: 110, r: 2.6, fill: '#5ec8e8' }), el('circle', { cx: 108, cy: 110, r: 2.6, fill: '#5ec8e8' }),
        el('path', { d: 'M96 120 L100 124 L104 120', fill: 'none', stroke: '#6b7780', 'stroke-width': 1.5 })
      ].concat(spots))];
    },
    drone: function () {
      return [g({}, [
        el('ellipse', { cx: 150, cy: 182, rx: 40, ry: 5, fill: 'rgba(0,0,0,0.18)' }),
        el('line', { x1: 96, y1: 80, x2: 204, y2: 80, stroke: '#3a4550', 'stroke-width': 5 }),
        el('ellipse', { cx: 96, cy: 72, rx: 26, ry: 4, fill: '#a9bccb', opacity: 0.8 }), el('ellipse', { cx: 204, cy: 72, rx: 26, ry: 4, fill: '#a9bccb', opacity: 0.8 }),
        el('rect', { x: 94, y: 72, width: 4, height: 10, fill: '#3a4550' }), el('rect', { x: 202, y: 72, width: 4, height: 10, fill: '#3a4550' }),
        el('rect', { x: 122, y: 84, width: 56, height: 40, rx: 12, fill: '#c9d3db', stroke: '#56636f', 'stroke-width': 2 }),
        el('circle', { cx: 150, cy: 104, r: 10, fill: '#1c2530' }), el('circle', { cx: 150, cy: 104, r: 5, fill: '#ffb300' }),
        el('path', { d: 'M132 124 L126 138 M168 124 L174 138', stroke: '#56636f', 'stroke-width': 3 }),
        el('path', { d: 'M122 88 Q150 78 178 88', fill: 'none', stroke: '#f3f8fb', 'stroke-width': 4 })
      ])];
    },
    golem: function () {
      var ice = '#bfe3f6', edge = '#6aa9cc';
      function blk(x, y, w, h) { return el('path', { d: 'M' + x + ' ' + (y + 4) + ' L' + (x + 4) + ' ' + y + ' H' + (x + w - 3) + ' L' + (x + w) + ' ' + (y + 5) + ' V' + (y + h - 3) + ' L' + (x + w - 5) + ' ' + (y + h) + ' H' + (x + 3) + ' L' + x + ' ' + (y + h - 4) + ' Z', fill: ice, stroke: edge, 'stroke-width': 2 }); }
      return [g({}, [
        blk(116, 146, 26, 28), blk(158, 146, 26, 28),
        blk(110, 88, 80, 62),
        blk(76, 92, 32, 46), blk(192, 92, 32, 46),
        blk(128, 50, 44, 40),
        el('circle', { cx: 141, cy: 68, r: 3.4, fill: '#1a4a6a' }), el('circle', { cx: 159, cy: 68, r: 3.4, fill: '#1a4a6a' }),
        el('path', { d: 'M126 104 L150 120 L174 104', fill: 'none', stroke: '#e9f7ff', 'stroke-width': 3 })
      ])];
    },
    // ---- ボスの仮の絵（画像がない・読み込めないとき） ----
    wolf: function () {
      return [g({}, [
        el('path', { d: 'M60 170 L90 120 L140 104 L200 106 L236 120 L250 170 Z', fill: '#cfe1ef', stroke: '#6f8ea8', 'stroke-width': 2 }),
        el('path', { d: 'M96 118 L102 96 L112 112 L124 90 L132 108 L146 88 L152 106 L166 90 L170 108', fill: 'none', stroke: '#eef7fd', 'stroke-width': 4, 'stroke-linejoin': 'round' })
      ]), wolfHead(168, 84, 2.1, '#e6f1f9', '#8fe0ff')];
    },
    warden: function () {
      return [g({}, [
        el('path', { d: 'M120 176 L126 120 L110 70 L130 36 L150 58 L170 36 L190 70 L174 120 L180 176 Z', fill: '#4a4038', stroke: '#2a231e', 'stroke-width': 2 }),
        el('path', { d: 'M110 70 L78 46 L64 20 M78 46 L56 50 M190 70 L222 46 L236 20 M222 46 L244 50', fill: 'none', stroke: '#4a4038', 'stroke-width': 8, 'stroke-linecap': 'round' }),
        el('path', { d: 'M112 72 L96 60 L118 58 Z M188 72 L204 60 L182 58 Z M130 38 L150 26 L170 38 L150 46 Z', fill: '#bfe6fb' }),
        el('circle', { cx: 140, cy: 84, r: 4, fill: '#8fe0ff' }), el('circle', { cx: 160, cy: 84, r: 4, fill: '#8fe0ff' }),
        el('path', { d: 'M136 110 L150 124 L164 110 L150 150 Z', fill: '#8fd3ff', opacity: 0.85 }),
        el('path', { d: 'M118 64 Q150 50 182 64', fill: 'none', stroke: '#f2f8fc', 'stroke-width': 6 })
      ])];
    },
    guardian: function () {
      return [g({}, [
        el('rect', { x: 96, y: 150, width: 34, height: 28, fill: '#3e4a56' }), el('rect', { x: 170, y: 150, width: 34, height: 28, fill: '#3e4a56' }),
        el('path', { d: 'M86 70 L214 70 L230 150 L70 150 Z', fill: '#58687a', stroke: '#26313c', 'stroke-width': 2 }),
        el('rect', { x: 120, y: 30, width: 60, height: 42, rx: 6, fill: '#667789', stroke: '#26313c', 'stroke-width': 2 }),
        el('rect', { x: 128, y: 44, width: 44, height: 12, rx: 4, fill: '#12181f' }),
        el('rect', { x: 132, y: 47, width: 36, height: 6, rx: 3, fill: '#7fe6ff' }),
        el('circle', { cx: 150, cy: 108, r: 16, fill: '#7fe6ff', opacity: 0.85 }), el('circle', { cx: 150, cy: 108, r: 28, fill: '#7fe6ff', opacity: 0.18 }),
        el('path', { d: 'M86 70 L60 120 L70 150 M214 70 L240 120 L230 150', fill: 'none', stroke: '#58687a', 'stroke-width': 12, 'stroke-linejoin': 'round' }),
        el('path', { d: 'M86 72 L106 58 L112 74 L132 60 L150 76 L168 60 L188 74 L194 58 L214 72', fill: '#e2f3fd' }),
        el('path', { d: 'M74 146 L82 126 L92 146 M208 146 L218 124 L226 146', fill: '#cfeaf9' })
      ])];
    }
  };

  // 立ち絵の SVG。name は ART のキー、theme は 'night' | 'day'、region は背景の色みに使う
  function render(name, theme, region) {
    var root = S()('svg', { viewBox: '0 0 300 200', class: 'enemy-art-svg', 'aria-hidden': 'true', preserveAspectRatio: 'xMidYMid slice' });
    backdrop(theme, region).forEach(function (n) { root.appendChild(n); });
    (ART[name] ? ART[name]() : []).forEach(function (n) { root.appendChild(n); });
    return root;
  }

  FF.svgEnemies = { render: render, NAMES: Object.keys(ART), PALETTES: PALETTES };
})(this);
