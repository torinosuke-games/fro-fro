// 手書きの欄（判断266・282）。漢字の書き取り（国語）と、英語の単語のつづりを、指・タッチペン・マウスで書いて、お手本とくらべて、自分で採点する。
// 書いた線（it.strokes）は問題の状態に持つ。画面を作りなおしても、線が消えない。
(function (root) {
  'use strict';
  var FF = root.FF, U = FF.ui, E = U.el;
  var W = 640, H = 320;            // 書く欄の、内部の大きさ（表示は、幅いっぱいにのびちぢみする）
  var INK = '#21465c', GUIDE = '#b8d3e3';

  // 答えの文字数（1〜4）だけ、四角いわくを引く
  function boxes(answer) {
    var n = Math.max(1, Math.min(4, String(answer).length));
    var side = Math.min(H, Math.floor(W / n)), total = side * n, x0 = Math.floor((W - total) / 2), y0 = Math.floor((H - side) / 2);
    var out = [];
    for (var i = 0; i < n; i++) out.push({ x: x0 + i * side, y: y0, s: side });
    return out;
  }
  // 英語のノートの、四本線（上の線・まん中の点線・ベースライン・下の線）。横に長く書ける
  function englishLines(c) {
    var ys = [{ y: 70, dash: false, w: 2 }, { y: 140, dash: true, w: 2 }, { y: 210, dash: false, w: 3 }, { y: 270, dash: false, w: 2 }];
    ys.forEach(function (l) {
      c.setLineDash(l.dash ? [10, 8] : []); c.lineWidth = l.w;
      c.beginPath(); c.moveTo(20, l.y); c.lineTo(W - 20, l.y); c.stroke();
    });
    c.setLineDash([]);
  }
  function redraw(cv, strokes, answer, kind) {
    var c = cv.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.fillStyle = '#fff'; c.fillRect(0, 0, W, H);
    c.strokeStyle = GUIDE; c.lineWidth = 2;
    if (kind === 'english') englishLines(c);
    else boxes(answer).forEach(function (b) {
      c.setLineDash([]); c.strokeRect(b.x + 1, b.y + 1, b.s - 2, b.s - 2);
      c.setLineDash([8, 8]);
      c.beginPath(); c.moveTo(b.x + b.s / 2, b.y + 4); c.lineTo(b.x + b.s / 2, b.y + b.s - 4);
      c.moveTo(b.x + 4, b.y + b.s / 2); c.lineTo(b.x + b.s - 4, b.y + b.s / 2); c.stroke();
    });
    c.setLineDash([]);
    c.strokeStyle = INK; c.lineWidth = 9; c.lineCap = 'round'; c.lineJoin = 'round';
    strokes.forEach(function (s) {
      c.beginPath();
      if (s.length === 1) { c.moveTo(s[0][0], s[0][1]); c.lineTo(s[0][0] + 0.1, s[0][1] + 0.1); }
      s.forEach(function (p, i) { if (i === 0) c.moveTo(p[0], p[1]); else c.lineTo(p[0], p[1]); });
      c.stroke();
    });
  }

  // 書く欄。it：問題の状態（it.strokes に線を持つ）、answer：お手本（わくの数を決める）、disabled：採点後は書けない、kind：'english'なら四本線
  function pad(it, answer, disabled, kind) {
    it.strokes = it.strokes || [];
    var cv = E('canvas', { class: 'hw-canvas', attrs: { width: String(W), height: String(H), role: 'img', 'aria-label': 'てがきの欄' } });
    redraw(cv, it.strokes, answer, kind);
    if (disabled) return cv;
    var cur = null, penSeen = false;
    function pt(e) {
      var r = cv.getBoundingClientRect();
      return [Math.round((e.clientX - r.left) * W / r.width), Math.round((e.clientY - r.top) * H / r.height)];
    }
    cv.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'pen') penSeen = true;
      if (penSeen && e.pointerType === 'touch') return;      // ペンで書いているときは、手のひらを無視する
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      try { cv.setPointerCapture(e.pointerId); } catch (x) { /* とれなくても書ける */ }
      cur = [pt(e)];
      it.strokes.push(cur);
      redraw(cv, it.strokes, answer, kind);
    });
    cv.addEventListener('pointermove', function (e) {
      if (!cur) return;
      e.preventDefault();
      var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      (evs.length ? evs : [e]).forEach(function (ev) { cur.push(pt(ev)); });
      redraw(cv, it.strokes, answer, kind);
    });
    function end() { cur = null; }
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    cv.addEventListener('pointerleave', end);
    cv.redraw = function () { redraw(cv, it.strokes, answer, kind); };
    return cv;
  }

  FF.handwriting = { pad: pad, redraw: redraw, boxes: boxes };
})(this);
