// 計算用のメモ（判断490）。算数の問題で、指・タッチペン・マウスで書いて計算するための、画面の下3分の1ほどのパッド。
// 問題のそばのアイコンを押すと開く。書いた線は、その問題のあいだだけ持つ（次の問題に進むと消える）。保存はしない。
(function (root) {
  'use strict';
  var FF = root.FF, U = FF.ui, E = U.el;
  var SUBJECTS = { math: true };       // パッドを出す教科
  var INK = '#21465c';
  var st = { open: false, qid: null, strokes: [], erase: false, penSeen: false };
  var sheet = null, cv = null, drawing = null;

  function R() { return FF.texts.renewal; }
  function usable(q) { return !!(q && SUBJECTS[q.subject]); }

  // ---- 描く ----
  function size() {
    var r = cv.getBoundingClientRect(), dpr = Math.max(1, Math.min(3, root.devicePixelRatio || 1));
    var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
  }
  function redraw() {
    if (!cv) return;
    size();
    var c = cv.getContext('2d'), w = cv.width, h = cv.height, lw = Math.max(3, w / 160);
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    c.lineCap = 'round'; c.lineJoin = 'round';
    st.strokes.forEach(function (s) {
      c.strokeStyle = s.e ? '#fff' : INK; c.lineWidth = s.e ? lw * 5 : lw;
      c.beginPath();
      if (s.p.length === 1) { c.moveTo(s.p[0][0] * w, s.p[0][1] * h); c.lineTo(s.p[0][0] * w + 0.1, s.p[0][1] * h + 0.1); }
      s.p.forEach(function (p, i) { if (i === 0) c.moveTo(p[0] * w, p[1] * h); else c.lineTo(p[0] * w, p[1] * h); });
      c.stroke();
    });
  }
  function pt(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; }

  // ---- パッド本体（body に1つ。画面を作りなおしても消えない） ----
  function build() {
    if (sheet) return;
    var doc = root.document;
    function btn(label, aria, fn, cls) { return E('button', { class: 'sp-btn ' + (cls || ''), attrs: { type: 'button', 'aria-label': aria }, text: label, on: { click: fn } }); }
    var penBtn = btn('✏ ' + R().scratchPen, R().scratchPen, function () { st.erase = false; sync(); }, 'sp-pen');
    var eraseBtn = btn('🧽 ' + R().scratchErase, R().scratchErase, function () { st.erase = true; sync(); }, 'sp-erase');
    cv = E('canvas', { class: 'sp-canvas', attrs: { role: 'img', 'aria-label': R().scratchLabel } });
    sheet = E('div', { class: 'scratch-sheet', attrs: { id: 'scratch-sheet', role: 'dialog', 'aria-label': R().scratchLabel } }, [
      E('div', { class: 'sp-bar' }, [
        E('strong', { class: 'sp-title', text: R().scratchTitle }),
        penBtn, eraseBtn,
        btn('↩ ' + R().scratchUndo, R().scratchUndo, function () { st.strokes.pop(); redraw(); }),
        btn('🗑 ' + R().scratchClearShort, R().scratchClear, function () { st.strokes = []; redraw(); }),
        btn('✕ ' + R().scratchClose, R().scratchClose, function () { setOpen(false); }, 'sp-close')
      ]),
      cv
    ]);
    doc.body.appendChild(sheet);
    cv.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'pen') st.penSeen = true;
      if (st.penSeen && e.pointerType === 'touch') return;   // ペンで書いているときは、手のひらを無視する
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      try { cv.setPointerCapture(e.pointerId); } catch (x) { /* とれなくても書ける */ }
      drawing = { e: st.erase, p: [pt(e)] };
      st.strokes.push(drawing); redraw();
    });
    cv.addEventListener('pointermove', function (e) {
      if (!drawing) return;
      e.preventDefault();
      var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      (evs.length ? evs : [e]).forEach(function (ev) { drawing.p.push(pt(ev)); });
      redraw();
    });
    function end() { drawing = null; }
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    root.addEventListener('resize', function () { if (st.open) redraw(); });
  }
  function setOpen(v) { st.open = !!v; sync(); }

  // いまの状態を、画面に反映する（開く・とじる・ペン／消しゴムの強調・教科のないときは出さない）
  function sync(q) {
    var doc = root.document;
    if (q !== undefined) {
      if (q && q.id !== st.qid) { st.qid = q.id; st.strokes = []; }
      st.cur = q || null;
    }
    var on = usable(st.cur);
    if (on && st.open) build();
    if (sheet) {
      var show = on && st.open;
      sheet.classList.toggle('is-open', show);
      sheet.querySelector('.sp-pen').classList.toggle('active', !st.erase);
      sheet.querySelector('.sp-erase').classList.toggle('active', st.erase);
      if (show) root.requestAnimationFrame(redraw);
    }
    doc.body.classList.toggle('scratch-open', on && st.open);
    Array.prototype.forEach.call(doc.querySelectorAll('.scratch-toggle'), function (b) { b.setAttribute('aria-pressed', st.open ? 'true' : 'false'); b.classList.toggle('active', st.open); });
  }

  // 問題のそばに置くアイコン。パッドを使えない教科では null
  function toggleButton(q) {
    if (!usable(q)) return null;
    return E('button', { class: 'scratch-toggle' + (st.open ? ' active' : ''), attrs: { type: 'button', 'aria-label': R().scratchOpen, 'aria-pressed': st.open ? 'true' : 'false', title: R().scratchOpen },
      on: { click: function () { setOpen(!st.open); } } }, [E('span', { class: 'sp-ico', attrs: { 'aria-hidden': 'true' }, text: '✏' }), E('span', { class: 'sp-label', text: R().scratchOpen })]);
  }
  FF.scratchpad = { button: toggleButton, sync: sync, setOpen: setOpen, state: st };
})(this);
