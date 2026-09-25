// 基地の建物の SVG。レベルが上がるごとに、形・灯り・煙・雪の積もり方が変わる（SPEC 13）。
// 各関数は地面の中心を (0, 0) とし、上方向をマイナス y として描く。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  function S() { return FF.ui.svg; }

  var C = {
    wood: '#6b4a2f', woodLight: '#8a6240', woodDark: '#48301d',
    metal: '#3b4b5a', metalLight: '#5b7084', metalDark: '#26323d',
    stone: '#5f6873', stoneLight: '#808a95', stoneDark: '#434b54',
    snow: '#e6f1fa', snowShade: '#b9cfe0',
    win: '#ffcf7a', winOff: '#1d2833', fire: '#ffb35c', ember: '#ff7a2e'
  };

  function g(attrs, children) { return S()('g', attrs, children); }
  function rect(x, y, w, h, fill, extra) { return S()('rect', Object.assign({ x: x, y: y, width: w, height: h, fill: fill }, extra || {})); }
  function poly(points, fill, extra) { return S()('polygon', Object.assign({ points: points, fill: fill }, extra || {})); }
  function path(d, fill, extra) { return S()('path', Object.assign({ d: d, fill: fill }, extra || {})); }
  function circle(cx, cy, r, fill, extra) { return S()('circle', Object.assign({ cx: cx, cy: cy, r: r, fill: fill }, extra || {})); }
  function ellipse(cx, cy, rx, ry, fill, extra) { return S()('ellipse', Object.assign({ cx: cx, cy: cy, rx: rx, ry: ry, fill: fill }, extra || {})); }

  // 雪の積もり：レベルが低いほど厚い（建物が暖まると雪が減る）
  function snowDepth(level) { return Math.max(1.5, 7 - level * 1.2); }
  function roofSnow(x1, y1, x2, y2, x3, y3, level) {
    var d = snowDepth(level);
    return path('M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' L' + x3 + ' ' + y3 +
      ' L' + (x3 - 2) + ' ' + (y3 + d * 0.6) + ' L' + x2 + ' ' + (y2 + d) + ' L' + (x1 + 2) + ' ' + (y1 + d * 0.6) + ' Z', C.snow);
  }
  function flatSnow(x, y, w, level) {
    var d = snowDepth(level);
    return path('M' + (x - 1) + ' ' + y + ' Q' + (x + w / 2) + ' ' + (y - d) + ' ' + (x + w + 1) + ' ' + y + ' L' + (x + w + 1) + ' ' + (y + d * 0.4) + ' L' + (x - 1) + ' ' + (y + d * 0.4) + ' Z', C.snow);
  }
  function snowMound(w) { return ellipse(0, 1, w, 4, C.snow, { opacity: 0.9 }); }
  function win(x, y, w, h, lit) {
    return rect(x, y, w, h, lit ? C.win : C.winOff, lit ? { class: 'windowlight', filter: 'url(#ffGlowSoft)' } : {});
  }
  function smoke(x, y, n, dark) {
    var out = [];
    for (var i = 0; i < n; i++) {
      out.push(circle(x + i * 2, y - i * 3, 5 + i, dark ? '#4a5561' : '#9aa9b6', { class: 'smoke d' + (i + 1), opacity: 0 }));
    }
    return g({}, out);
  }
  function glow(x, y, r) { return circle(x, y, r, 'url(#grFire)', { class: 'flicker' }); }

  // ---- 中央炉 ----
  function furnace(L) {
    var w = 34 + L * 6, h = 22 + L * 9, top = -h;
    var parts = [snowMound(w * 0.9)];
    if (L >= 2) parts.push(glow(0, -h * 0.35, 18 + L * 7));
    // 土台（石）
    parts.push(rect(-w / 2 - 4, -10, w + 8, 10, C.stoneDark));
    parts.push(rect(-w / 2 - 4, -10, w + 8, 2, C.stoneLight, { opacity: 0.5 }));
    if (L === 1) {
      // 壊れた炉：崩れた石組みと消えかけの残り火
      parts.push(path('M' + (-w / 2) + ' -10 L' + (-w / 2 + 4) + ' ' + (top + 6) + ' L' + (-4) + ' ' + (top + 12) + ' L4 ' + (top + 2) + ' L' + (w / 2 - 3) + ' ' + (top + 10) + ' L' + (w / 2) + ' -10 Z', C.stone));
      parts.push(rect(-6, -22, 12, 12, '#1a1410'));
      parts.push(circle(0, -14, 3, C.ember, { class: 'flicker', opacity: 0.7 }));
      parts.push(flatSnow(-w / 2 + 2, top + 8, w - 4, L));
      return g({}, parts);
    }
    // 本体：レベル3以上は金属の外殻
    var bodyFill = L >= 3 ? C.metal : C.stone;
    parts.push(path('M' + (-w / 2) + ' -10 L' + (-w / 2 + 5) + ' ' + top + ' L' + (w / 2 - 5) + ' ' + top + ' L' + (w / 2) + ' -10 Z', bodyFill));
    if (L >= 3) {
      for (var b = 1; b <= L - 1; b++) parts.push(rect(-w / 2 + 3, -10 - b * (h - 10) / L, w - 6, 2.5, C.metalLight));
    }
    // 炉の口
    var mw = 10 + L * 2;
    parts.push(path('M' + (-mw / 2) + ' -10 L' + (-mw / 2) + ' ' + (-10 - mw * 0.8) + ' Q0 ' + (-10 - mw * 1.3) + ' ' + (mw / 2) + ' ' + (-10 - mw * 0.8) + ' L' + (mw / 2) + ' -10 Z', '#2a120a'));
    parts.push(path('M' + (-mw / 2 + 2) + ' -10 L' + (-mw / 2 + 2) + ' ' + (-10 - mw * 0.6) + ' Q0 ' + (-10 - mw * 1.05) + ' ' + (mw / 2 - 2) + ' ' + (-10 - mw * 0.6) + ' L' + (mw / 2 - 2) + ' -10 Z', C.fire, { class: 'flicker', filter: 'url(#ffGlow)' }));
    // 煙突
    var ch = 16 + L * 6, cw = 7 + L;
    parts.push(rect(-cw / 2 + w * 0.15, top - ch, cw, ch, L >= 3 ? C.metalDark : C.stoneDark));
    parts.push(rect(-cw / 2 + w * 0.15 - 1, top - ch, cw + 2, 3, C.metalLight));
    parts.push(smoke(w * 0.15, top - ch - 4, Math.min(3, L - 1), true));
    // 側面のパイプ（Lv4〜）
    if (L >= 4) {
      parts.push(path('M' + (-w / 2) + ' ' + (top + 14) + ' h-12 v' + (h - 26) + ' h6', 'none', { stroke: C.metalLight, 'stroke-width': 3 }));
      parts.push(path('M' + (w / 2) + ' ' + (top + 18) + ' h12 v' + (h - 30) + ' h-6', 'none', { stroke: C.metalLight, 'stroke-width': 3 }));
    }
    // 頂部の灯り（Lv4〜）とアンテナ（Lv5）
    if (L >= 4) for (var i = 0; i < L; i++) parts.push(circle(-w / 2 + 8 + i * (w - 16) / (L - 1), top + 5, 1.6, C.win, { class: 'windowlight' }));
    if (L >= 5) {
      parts.push(path('M' + (-w * 0.2) + ' ' + top + ' v-22', 'none', { stroke: C.metalLight, 'stroke-width': 1.5 }));
      parts.push(circle(-w * 0.2, top - 23, 2, '#ff5a4a', { class: 'flicker' }));
    }
    parts.push(flatSnow(-w / 2 + 5, top, w - 10, L));
    return g({}, parts);
  }

  // ---- 生存者住宅：テント → 小屋 → 長屋 → 石と金属の住居棟 ----
  function housing(L) {
    var parts = [snowMound(34 + L * 4)];
    if (L === 1) {
      [-12, 10].forEach(function (x, i) {
        parts.push(poly((x - 12) + ',0 ' + x + ',-20 ' + (x + 12) + ',0', i ? '#56606b' : '#6d5a44'));
        parts.push(poly((x - 3) + ',0 ' + x + ',-8 ' + (x + 3) + ',0', '#231a12'));
        parts.push(roofSnow(x - 12, 0, x, -20, x + 12, 0, 1));
      });
      parts.push(circle(0, -2, 2.4, C.fire, { class: 'flicker', filter: 'url(#ffGlow)' }));
      return g({}, parts);
    }
    var units = Math.min(L, 4), uw = 20 + (L >= 4 ? 4 : 0), total = units * uw;
    for (var i = 0; i < units; i++) {
      var x = -total / 2 + i * uw, h = 14 + L * 2;
      var wall = L >= 5 ? C.stone : C.wood;
      parts.push(rect(x, -h, uw - 1, h, wall));
      if (L < 5) for (var k = 1; k < 4; k++) parts.push(rect(x, -h + k * h / 4, uw - 1, 0.8, C.woodDark, { opacity: 0.6 }));
      parts.push(poly((x - 2) + ',' + (-h) + ' ' + (x + uw / 2 - 0.5) + ',' + (-h - 10 - L) + ' ' + (x + uw + 1) + ',' + (-h), L >= 4 ? C.metal : C.woodDark));
      parts.push(roofSnow(x - 2, -h, x + uw / 2 - 0.5, -h - 10 - L, x + uw + 1, -h, L));
      parts.push(win(x + 4, -h + 5, 5, 5, true));
      parts.push(win(x + uw - 10, -h + 5, 5, 5, i < L - 1));
      if (i === 0) parts.push(rect(x + uw / 2 - 3, -9, 6, 9, '#2a1d12'));
    }
    if (L >= 3) parts.push(smoke(-total / 2 + 6, -24 - L * 2, 1, false));
    if (L >= 5) {
      parts.push(path('M' + (total / 2 + 4) + ' 0 v-44', 'none', { stroke: C.metalLight, 'stroke-width': 1.5 }));
      parts.push(poly((total / 2 + 4) + ',-44 ' + (total / 2 + 18) + ',-40 ' + (total / 2 + 4) + ',-36', C.ember));
    }
    return g({}, parts);
  }

  // ---- 木材置き場：丸太の山 → 作業小屋 → 製材の刃 → クレーン ----
  function lumber(L) {
    var parts = [snowMound(30 + L * 4)];
    var piles = Math.min(L + 1, 5);
    for (var p = 0; p < piles; p++) {
      var px = -22 + p * 11, rows = 1 + (p % 2) + (L >= 3 ? 1 : 0);
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < 3 - r; c++) {
          var cx = px + c * 3.6 + r * 1.8, cy = -3 - r * 3.4;
          parts.push(circle(cx, cy, 2, C.woodLight));
          parts.push(circle(cx, cy, 0.8, C.woodDark));
        }
      }
      parts.push(flatSnow(px - 1, -3 - rows * 3.4, 10, L));
    }
    if (L >= 2) {
      parts.push(rect(10, -22, 22, 22, C.wood));
      parts.push(poly('8,-22 21,-32 34,-22', C.woodDark));
      parts.push(roofSnow(8, -22, 21, -32, 34, -22, L));
      parts.push(win(14, -16, 5, 5, L >= 2));
      parts.push(win(24, -16, 5, 5, L >= 4));
    }
    if (L >= 3) {
      parts.push(circle(-8, -24, 7, C.metalLight, { stroke: C.metalDark, 'stroke-width': 1.5 }));
      parts.push(circle(-8, -24, 2, C.metalDark));
      parts.push(rect(-9, -17, 2, 17, C.metalDark));
    }
    if (L >= 5) {
      parts.push(path('M-28 0 V-50 H18 M-28 -50 L-18 -40', 'none', { stroke: C.metalLight, 'stroke-width': 2 }));
      parts.push(path('M10 -50 V-38', 'none', { stroke: '#9aa9b6', 'stroke-width': 0.8 }));
      parts.push(circle(-28, -52, 1.8, '#ff5a4a', { class: 'flicker' }));
    }
    if (L >= 2) parts.push(smoke(26, -34, Math.min(2, L - 1), false));
    return g({}, parts);
  }

  // ---- 鉱山：坑道の入口 → 支柱とトロッコ → やぐら ----
  function mine(L) {
    var parts = [];
    var hw = 30 + L * 4;
    parts.push(path('M' + (-hw) + ' 0 L' + (-hw * 0.4) + ' ' + (-26 - L * 4) + ' L' + (hw * 0.3) + ' ' + (-20 - L * 3) + ' L' + hw + ' 0 Z', C.stoneDark));
    parts.push(path('M' + (-hw * 0.4) + ' ' + (-26 - L * 4) + ' L' + (-hw * 0.2) + ' ' + (-18 - L * 3) + ' L' + (hw * 0.3) + ' ' + (-20 - L * 3) + ' Z', C.snow));
    parts.push(path('M' + (-hw * 0.4 - 3) + ' ' + (-24 - L * 4) + ' L' + (-hw * 0.4) + ' ' + (-26 - L * 4) + ' L' + (-hw * 0.4 + 5) + ' ' + (-22 - L * 4), C.snow));
    // 入口
    parts.push(path('M-9 0 V-13 Q0 -20 9 -13 V0 Z', '#120d0a'));
    parts.push(path('M-10 0 V-14 H10 V0', 'none', { stroke: C.woodLight, 'stroke-width': 2.2 }));
    parts.push(glow(0, -6, 6 + L * 1.5));
    if (L >= 2) {
      parts.push(path('M-2 0 L-26 6 M4 0 L-20 7', 'none', { stroke: C.metalLight, 'stroke-width': 1 }));
      parts.push(rect(-24, -3, 9, 5, C.metalDark));
      parts.push(ellipse(-20, 2.5, 1.5, 1.5, '#111'));
      parts.push(path('M-23 -3 l2 -2 l2 1 l2 -2 l2 3 Z', '#8c6a4f'));
    }
    if (L >= 3) {
      var th = 20 + L * 6;
      parts.push(path('M14 0 L20 ' + (-th) + ' L26 0 M15 ' + (-th * 0.35) + ' H25 M17 ' + (-th * 0.7) + ' H23', 'none', { stroke: C.woodLight, 'stroke-width': 1.6 }));
      parts.push(circle(20, -th - 2, 3, 'none', { stroke: C.metalLight, 'stroke-width': 1.5 }));
      parts.push(circle(20, -th - 6, 1.6, C.win, { class: 'windowlight' }));
    }
    if (L >= 4) {
      parts.push(rect(-hw + 6, -12, 14, 12, C.metal));
      parts.push(flatSnow(-hw + 6, -12, 14, L));
      parts.push(win(-hw + 9, -8, 4, 4, true));
      parts.push(smoke(-hw + 14, -16, L - 3, true));
    }
    return g({}, parts);
  }

  // ---- 石切り場：切り出した石 → 足場 → クレーン ----
  function quarry(L) {
    var parts = [snowMound(30 + L * 4)];
    parts.push(path('M-30 0 L-26 -18 L-12 -24 L-4 -14 L-4 0 Z', C.stone));
    parts.push(path('M-26 -18 L-12 -24 L-8 -20 L-22 -15 Z', C.snow));
    var blocks = 1 + L;
    for (var i = 0; i < blocks; i++) {
      var bx = -2 + (i % 3) * 9, by = -6 - Math.floor(i / 3) * 6;
      parts.push(rect(bx, by, 8, 6, i % 2 ? C.stoneLight : C.stone, { stroke: C.stoneDark, 'stroke-width': 0.6 }));
      parts.push(rect(bx, by, 8, Math.max(0.8, snowDepth(L) * 0.35), C.snow));
    }
    if (L >= 3) parts.push(path('M-18 0 V-30 M-22 -30 H4 M-22 -22 H-14', 'none', { stroke: C.woodLight, 'stroke-width': 1.6 }));
    if (L >= 4) {
      parts.push(path('M28 0 V-46 L-6 -46 M28 -40 L20 -46', 'none', { stroke: C.metalLight, 'stroke-width': 2 }));
      parts.push(path('M0 -46 V-34', 'none', { stroke: '#9aa9b6', 'stroke-width': 0.8 }));
      parts.push(rect(-3, -34, 6, 5, C.stoneLight));
      parts.push(circle(28, -48, 1.8, '#ff5a4a', { class: 'flicker' }));
    }
    if (L >= 2) parts.push(win(-14, -12, 4, 4, true));
    return g({}, parts);
  }

  // ---- 食料施設：燻製小屋 → 温室ドーム → 大型の食料庫 ----
  function foodhall(L) {
    var parts = [snowMound(32 + L * 4)];
    parts.push(rect(-26, -18, 20, 18, C.wood));
    parts.push(poly('-28,-18 -16,-28 -4,-18', C.woodDark));
    parts.push(roofSnow(-28, -18, -16, -28, -4, -18, L));
    parts.push(win(-20, -12, 6, 5, L >= 2));
    parts.push(smoke(-12, -30, Math.min(2, L), false));
    var domes = Math.max(0, Math.min(3, L - 1));
    for (var i = 0; i < domes; i++) {
      var dx = 6 + i * 16, r = 8 + (L >= 4 ? 2 : 0);
      parts.push(path('M' + (dx - r) + ' 0 A' + r + ' ' + r + ' 0 0 1 ' + (dx + r) + ' 0 Z', 'rgba(143,211,255,0.25)', { stroke: '#a6ddff', 'stroke-width': 0.8 }));
      parts.push(path('M' + (dx - r + 3) + ' 0 A' + (r - 3) + ' ' + (r - 3) + ' 0 0 1 ' + (dx + r - 3) + ' 0 Z', 'rgba(127,224,166,0.35)', { class: 'windowlight' }));
      parts.push(path('M' + dx + ' 0 V' + (-r) + ' M' + (dx - r * 0.7) + ' ' + (-r * 0.7) + ' L' + (dx + r * 0.7) + ' ' + (-r * 0.7), 'none', { stroke: '#a6ddff', 'stroke-width': 0.5, opacity: 0.6 }));
      if (L <= 3) parts.push(path('M' + (dx - r * 0.5) + ' ' + (-r * 0.85) + ' Q' + dx + ' ' + (-r - 2) + ' ' + (dx + r * 0.5) + ' ' + (-r * 0.85), 'none', { stroke: C.snow, 'stroke-width': 1.5 }));
    }
    if (L >= 5) {
      parts.push(rect(-44, -26, 16, 26, C.metal));
      parts.push(flatSnow(-44, -26, 16, L));
      parts.push(win(-40, -20, 8, 4, true));
      parts.push(win(-40, -12, 8, 4, true));
    }
    return g({}, parts);
  }

  // ---- 見張り塔（中央炉 Lv3 で完成し、探索の入口になる。v0.2） ----
  function watchtower(furnaceLevel) {
    var parts = [snowMound(18)];
    var dash = { fill: 'none', stroke: '#8ea2b4', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.7 };
    if (furnaceLevel >= 3) {
      // 完成した見張り塔：木の脚、見張り台、灯り、旗
      parts.push(path('M-10 0 L-6 -44 M10 0 L6 -44 M-9 -12 H9 M-8 -24 H8 M-7 -36 H7 M-9 -12 L8 -24 M-8 -24 L7 -36', 'none', { stroke: C.woodLight, 'stroke-width': 1.6 }));
      parts.push(rect(-11, -52, 22, 9, C.wood));
      parts.push(win(-6, -50, 12, 5, true));
      parts.push(path('M-13 -52 H13 L0 -63 Z', C.metal));
      parts.push(path('M-13 -52 H13 L10 -55 H-10 Z', '#eef6ff', { opacity: 0.85 }));
      parts.push(path('M0 -63 V-74', 'none', { stroke: '#c9d7e3', 'stroke-width': 1 }));
      parts.push(path('M0 -74 L9 -71 L0 -68 Z', C.ember || '#ff8a3d', { class: 'flicker' }));
    } else {
      parts.push(path('M-10 0 L-6 -48 H6 L10 0 Z M-12 -48 H12 L0 -60 Z', 'none', dash));
    }
    return g({}, parts);
  }

  // 未解放の建物のシルエット
  function lockedOutline() {
    return g({}, [
      snowMound(22),
      path('M-18 0 V-18 L0 -30 L18 -18 V0 Z', 'none', { stroke: '#8ea2b4', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.7 })
    ]);
  }

  FF.svgBuildings = {
    furnace: furnace, housing: housing, lumber: lumber, mine: mine, quarry: quarry, foodhall: foodhall,
    watchtower: watchtower, lockedOutline: lockedOutline
  };
})(this);
