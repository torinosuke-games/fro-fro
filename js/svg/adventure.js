// 試作用のオリジナルキャラクター。SVGなのでオフラインでもくっきり描ける。
(function (root) {
  'use strict';
  var U = root.FF.ui;
  function art(id, small) {
    // 仲間は、絵（img/adventure/allies/）。学年で、小学生用・中学生用に分ける予定（7年生（中学1年）から中学生用。判断353）
    if (root.FF.adventure && root.FF.adventure.ALLIES.indexOf(id) >= 0) return U.el('img', { class: 'adv-art adv-ally-art', attrs: { src: 'img/adventure/allies/' + id + (root.FF.app && root.FF.app.state && root.FF.app.state.player && root.FF.app.state.player.grade >= 7 ? '-jh' : '-el') + '.webp', alt: root.FF.texts.adventure.members[id].name, draggable: 'false' } });
    // 主人公は、設定で選んだキャラの顔の絵（img/art/portrait-*.webp。avatar-*.jpg から、仲間の絵と同じくらいの顔の大きさに切り取ったもの。判断378）。絵が読めないときだけ、下の簡単な絵
    if (id === 'hero' && root.FF.app && root.FF.app.state && root.FF.app.state.player && root.FF.app.state.player.avatar) {
      var avatar = root.FF.app.state.player.avatar, img = U.artImg('portrait-' + avatar + '.webp', 'adv-art adv-ally-art adv-hero-art', function () { return art('hero-fallback', small); });
      img.setAttribute('role', 'img'); img.setAttribute('alt', root.FF.texts.adventure.members.hero.name); img.setAttribute('data-avatar', avatar);
      return img;
    }
    if (id === 'hero-fallback') id = 'hero';
    var svg = U.svg('svg', { viewBox: '0 0 240 240', role: 'img', 'aria-label': (root.FF.texts.adventure.members[id] || root.FF.texts.adventure.enemies[id]).name, class: 'adv-art' });
    function shape(tag, attrs) { svg.appendChild(U.svg(tag, attrs)); }
    function ellipse(cx, cy, rx, ry, fill) { shape('ellipse', { cx: cx, cy: cy, rx: rx, ry: ry, fill: fill }); }
    function path(d, fill, stroke, width) { shape('path', { d: d, fill: fill || 'none', stroke: stroke || 'none', 'stroke-width': width || 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); }
    ellipse(120, 217, 79, 12, '#143d5420');
    if (['cub', 'wolf', 'boss'].indexOf(id) >= 0) {
      var big = id === 'boss', wolf = id === 'wolf', fur = big ? '#486b85' : wolf ? '#c6e2ee' : '#f7efe1', shade = big ? '#315069' : wolf ? '#87b5cb' : '#cebba3';
      if (wolf) path('M174 175 Q225 180 224 126 Q202 153 175 144Z', shade);
      ellipse(120, 155, big ? 83 : 67, big ? 58 : 49, fur);
      path('M61 172 L52 211 Q70 225 88 210 L94 177 M146 177 L155 212 Q174 223 190 208 L182 170', shade);
      ellipse(120, 117, big ? 73 : 55, big ? 59 : 53, fur);
      if (big) {
        path('M58 89 Q8 69 41 16 L57 54 L88 81Z', '#b9ecf8', '#e3fbff', 4);
        path('M182 89 Q232 69 199 16 L183 54 L152 81Z', '#b9ecf8', '#e3fbff', 4);
        path('M76 72 L90 34 L113 64 L131 28 L151 72', '#88c9df');
      } else {
        path(wolf ? 'M73 101 L62 29 L104 76Z' : 'M77 92 Q45 22 91 45 L111 91Z', shade);
        path(wolf ? 'M148 77 L185 29 L175 109Z' : 'M134 85 Q185 17 175 83 L161 102Z', shade);
      }
      ellipse(120, 144, big ? 45 : 35, 27, big ? '#7899ac' : '#fffaf0');
      ellipse(94, 113, 7, 9, '#163f56'); ellipse(148, 113, 7, 9, '#163f56');
      ellipse(96, 110, 2, 3, '#fff'); ellipse(150, 110, 2, 3, '#fff');
      path('M109 135 Q120 129 132 135 L120 144Z', '#234359');
      path('M120 144 L120 153 M109 155 Q120 161 132 153', 'none', '#234359', 3);
      if (wolf || big) { path('M92 149 L99 167 L107 150 M133 150 L141 167 L149 149', '#fff'); }
      if (big) { path('M55 150 L35 139 L46 170 M187 150 L207 139 L197 171', '#afddeb'); }
    } else {
      var colors = { hero: '#cf8236', gan: '#94634c', rin: '#458f89', sora: '#537da9' }, coat = colors[id];
      path('M91 175 L83 211 L109 215 L119 176 M126 176 L130 214 L157 211 L149 174', '#284354');
      path('M80 207 Q64 219 80 225 L110 225 L109 210 M131 210 L131 225 L165 225 Q175 217 155 207', '#203749');
      path('M78 112 Q117 90 160 114 L180 181 Q123 202 59 181Z', coat, '#294553', 2);
      path('M80 115 Q59 122 46 159 L60 174 L88 142 M158 117 Q182 125 197 161 L181 174 L153 140', coat);
      ellipse(56, 171, 12, 13, '#e8b995'); ellipse(188, 170, 12, 13, '#e8b995');
      ellipse(120, 83, 39, 42, '#f2c9a3');
      path('M80 83 Q69 23 122 24 Q173 24 163 90 L147 60 Q114 78 93 63Z', id === 'rin' ? '#563c39' : id === 'sora' ? '#6a4e3e' : '#473d3b');
      ellipse(106, 87, 3, 5, '#253b44'); ellipse(136, 87, 3, 5, '#253b44');
      path('M110 104 Q121 112 133 103', 'none', '#9d6350', 2);
      path('M81 116 Q121 139 160 116 L159 130 Q117 153 80 128Z', '#f0e4ca');
      path('M117 140 L117 183', 'none', '#eac59a', 3);
      if (id === 'gan') {
        path('M89 97 Q119 147 154 99 L146 124 Q119 146 97 125Z', '#644636');
        path('M170 216 L198 96', 'none', '#73503a', 8);
        path('M190 99 L212 66 L231 91 L204 116Z', '#bad1d8', '#4b7181', 3);
      } else if (id === 'rin') {
        path('M76 78 Q66 19 120 15 Q175 20 166 81 L148 50 Q120 34 92 53Z', coat);
        path('M185 174 L185 108', 'none', '#825e40', 5);
        shape('rect', { x: 173, y: 147, width: 25, height: 36, rx: 6, fill: '#f8cb61', stroke: '#976e37', 'stroke-width': 3 });
        ellipse(185, 160, 7, 10, '#fff4c5');
      } else if (id === 'sora') {
        path('M79 69 Q112 45 163 67 L161 82 L82 83Z', '#385b70');
        shape('rect', { x: 89, y: 62, width: 27, height: 18, rx: 6, fill: '#c1e6ee', stroke: '#29485a', 'stroke-width': 4 });
        shape('rect', { x: 123, y: 62, width: 27, height: 18, rx: 6, fill: '#c1e6ee', stroke: '#29485a', 'stroke-width': 4 });
        path('M162 131 L206 140 L170 152Z', '#e5b24f');
      } else {
        path('M76 57 L164 57 L152 33 Q116 10 88 34Z', '#d39747');
        shape('rect', { x: 108, y: 45, width: 25, height: 19, rx: 5, fill: '#ffe5a0' });
        ellipse(185, 162, 17, 20, '#f5ba4c'); ellipse(185, 157, 8, 12, '#fff0ba');
      }
    }
    if (!small) { ellipse(27, 89, 3, 3, '#b2d2e0'); ellipse(211, 48, 4, 4, '#d3e6ec'); }
    return svg;
  }
  root.FF.adventureArt = art;
})(this);
