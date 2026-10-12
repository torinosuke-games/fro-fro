// 雪原のフィールドの Canvas 描画（試作。判断387）：斜め見下ろしの固定カメラ。地面・遠景は一度だけ焼き込み、木・家・岩などの立った絵は足元の y 順に重ねる。
// 地図・場所・状態は、呼び出し側（js/ui/adventure.js）が持つ。ここは、絵を描いて、タップの位置を返すだけ（ゲームの進行・セーブには触れない）。
// 元になった試作：codex-prototypes/snowfield-canvas（ChatGPT。素材もそこから）。木・雪面が単調にならないよう、色・大きさ・向きのばらつきと、雪の起伏・小物を足した。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {}; FF.ui = FF.ui || {};
  var doc = root.document;
  var T = 112, Y = .64, H = T * Y, GMX = T * 1.5, GMY = H * 1.5, FM = 10, SB = .75;     // 1マスの幅・高さ（描画用の座標）、たての縮み、地面の絵の余白（ふちは、まわりの雪にとけこむ）、地図の外の林のはば（マス）、焼き込みの縮小
  var DIR = 'img/adventure/canvas/';
  // 近景アトラスの切り出し（2048 幅の座標。実際の絵は 1280 幅なので、拡大率で換算する）
  var CROP = { tree: [0, 0, 485, 684], cabin: [514, 142, 620, 495], rock: [1170, 244, 490, 427], lantern: [1744, 170, 280, 503] };
  // 以前の地面の絵（img/adventure/snow-world.webp）から切り出した、雪の起伏・枯れ草・岩（座標は、その絵の中。判断387）。ふちをぼかして、雪の地面に重ねる
  var STAMPS = {
    mound: [[690, 190, 140, 100], [510, 260, 100, 70], [190, 200, 110, 80], [200, 495, 120, 90], [590, 590, 120, 100], [680, 500, 130, 90], [290, 375, 100, 70]],
    shrub: [[825, 260, 60, 45], [615, 125, 55, 50], [305, 200, 60, 50], [415, 615, 60, 70], [735, 610, 60, 50], [605, 665, 60, 45], [125, 340, 70, 45], [445, 795, 70, 55], [285, 545, 60, 50]],
    rock: [[470, 235, 40, 35], [805, 310, 40, 35], [810, 553, 40, 35], [410, 675, 45, 35]]
  };
  var QUALITY = { low: 1, std: 1.5, high: 2 };

  var current = null;

  function mk(w, h) { var c = doc.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function poly(c, pts, fill) { c.fillStyle = fill; c.beginPath(); pts.forEach(function (p, i) { if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); }); c.closePath(); c.fill(); }
  function pill(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

  function loadImage(url) {
    return new Promise(function (resolve) { var i = new root.Image(); i.onload = function () { resolve(i); }; i.onerror = function () { resolve(null); }; i.src = url; });
  }
  var timing = {};   // 読み込みにかかった時間（ミリ秒）。重さの確認用
  function mapKey(MAP) { var h = 5381, t = MAP.join('/'); for (var i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0; return h.toString(16); }
  // 地面と、地図の外の雪原の絵は、あらかじめ焼いた絵（ground-<地図の指紋>.webp・plain.webp）を読む（起動のたびに焼くと、遅い）。
  // 地図を変えたら、tests/tools/bake-canvas-ground.cjs で焼きなおす。ない・読めないときは、その場で焼く（遅い）
  var pending = {};
  function ensureImages(MAP) {
    var key = mapKey(MAP);
    if (pending[key]) return pending[key];
    var t0 = root.performance.now();
    var urls = { atlas: DIR + 'alpine-atlas.webp', distance: DIR + 'alpine-distance.webp', props: DIR + 'camp-props.webp', enemies: 'img/adventure/snow-enemies.webp', ground: DIR + 'ground-' + key + '.webp', plain: DIR + 'plain.webp' };
    pending[key] = Promise.all(Object.keys(urls).map(function (k) { return loadImage(urls[k]).then(function (i) { return [k, i]; }); })).then(function (list) {
      var o = {}; list.forEach(function (p) { o[p[0]] = p[1]; });
      timing.images = Math.round(root.performance.now() - t0);
      var t1 = root.performance.now(); o.parts = bake(o); timing.bake = Math.round(root.performance.now() - t1);
      if (o.ground && o.plain) { timing.prebaked = true; return o; }
      timing.prebaked = false;   // 焼いた絵がない：その場で焼く
      return Promise.all([loadImage(DIR + 'snow-surface.webp'), loadImage('img/adventure/snow-world.webp')]).then(function (l) {
        o.snow = l[0]; o.world = l[1]; var t2 = root.performance.now();
        var g = bakeGround(o, o.parts, MAP); o.ground = g.canvas; o.plain = bakePlain(o).canvas; timing.ground = Math.round(root.performance.now() - t2); return o;
      });
    });
    return pending[key];
  }
  var sheets = {};
  function sheet(url) {
    if (!url) return null;
    if (sheets[url] === undefined) { sheets[url] = null; loadImage(url).then(function (i) { sheets[url] = i; if (current) current.requestDraw(); }); }
    return sheets[url];
  }

  // ---- 焼き込み（一度だけ）----
  function cropOf(img, name) { var f = img.width / 2048, b = CROP[name]; return [b[0] * f, b[1] * f, b[2] * f, b[3] * f]; }
  function tinted(img, name, tint, flip) {
    var b = cropOf(img, name), c = mk(b[2], b[3]), x = c.getContext('2d');
    if (flip) { x.translate(c.width, 0); x.scale(-1, 1); }
    x.drawImage(img, b[0], b[1], b[2], b[3], 0, 0, c.width, c.height);
    if (tint) { x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-atop'; x.fillStyle = tint; x.fillRect(0, 0, c.width, c.height); }
    return c;
  }
  function bake(o) {
    var out = { trees: [], rocks: [] };
    if (!o.atlas) return out;
    // 木：色と向きを変えた何種類か（同じ木が並んで見えないように）
    var tones = [null, 'rgba(30,70,110,.24)', 'rgba(255,214,140,.17)', 'rgba(255,255,255,.3)', 'rgba(8,40,44,.32)', 'rgba(70,120,90,.18)'];
    tones.forEach(function (t) { out.trees.push([tinted(o.atlas, 'tree', t, false), tinted(o.atlas, 'tree', t, true)]); });
    ['rgba(40,70,110,.2)', null, 'rgba(255,230,180,.16)'].forEach(function (t) { out.rocks.push([tinted(o.atlas, 'rock', t, false), tinted(o.atlas, 'rock', t, true)]); });
    out.cabin = tinted(o.atlas, 'cabin', null, false); out.lantern = tinted(o.atlas, 'lantern', null, false);
    return out;
  }
  // 切り出して、ふちをなめらかに透明にした小さな絵（雪の地面に重ねても、四角いふちが見えない）
  function stamps(world) {
    var out = {};
    Object.keys(STAMPS).forEach(function (k) {
      out[k] = STAMPS[k].map(function (b) {
        var c = mk(b[2], b[3]), x = c.getContext('2d');
        if (world) x.drawImage(world, b[0], b[1], b[2], b[3], 0, 0, b[2], b[3]);
        x.globalCompositeOperation = 'destination-in'; x.translate(b[2] / 2, b[3] / 2); x.scale(1, b[3] / b[2]);
        var g = x.createRadialGradient(0, 0, 0, 0, 0, b[2] / 2); g.addColorStop(0, '#000'); g.addColorStop(.62, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = g; x.fillRect(-b[2] / 2, -b[2] / 2, b[2], b[2]);
        return c;
      });
    });
    return out;
  }
  // 雪の地面を焼く（地図のぜんたい＋まわり1.5マス。ふちは、まわりの雪原にとけこむ）。scale＜1 で小さく焼いて、軽くする
  function groundDims(MAP) { return { GW: MAP[0].length * T + 2 * GMX, GH: Math.round(MAP.length * H + 2 * GMY) }; }
  function snowLayers(c, o, r, W, Hh, k0, wrap) {   // 雪の質感・色むら・起伏・枯れ草・岩・粒・きらめきを、W×Hh の面に描く（地面と、地図の外の雪原で、同じ見た目にする）
    function tex(alpha, flip, fx, fy, fw) {   // 雪の絵の一部（fx,fy,fw は 0〜1 の割合）を、面いっぱいに引きのばす（タイルにしない。つなぎ目が出ない）
      var w = o.snow.width * fw, h = o.snow.height * fw;
      c.save(); c.globalAlpha = alpha; if (flip) { c.translate(W, 0); c.scale(-1, 1); }
      if (wrap) { for (var qx = 0; qx < 2; qx++) for (var qy = 0; qy < 2; qy++) { c.save(); c.translate(qx * W / 2 + (qx ? W / 2 : 0), qy * Hh / 2 + (qy ? Hh / 2 : 0)); c.scale(qx ? -1 : 1, qy ? -1 : 1); c.drawImage(o.snow, o.snow.width * fx, o.snow.height * fy, w, h, 0, 0, W / 2, Hh / 2); c.restore(); } }   // 折り返して並べる（細かい雪の粒だけなので、対称は目立たない）
      else c.drawImage(o.snow, o.snow.width * fx, o.snow.height * fy, w, h, 0, 0, W, Hh);
      c.restore();
    }
    function at(fn) { if (!wrap) { fn(0, 0); return; } for (var ox = -1; ox <= 1; ox++) for (var oy = -1; oy <= 1; oy++) fn(ox * W, oy * Hh); }   // つなぎ目のない絵：はしにかかるものは、反対がわにも描く
    tex(.5, false, 0, .1, .9); tex(.3, true, .15, 0, .8); tex(.22, false, .05, .25, .65);
    var blot = [['#ffffff', .4], ['#9cc3d6', .1], ['#fff0c4', .2], ['#7aa8bf', .08], ['#ffffff', .3]];   // 青い窪みと、日の当たる明るいところ
    for (var i = 0; i < 90 * k0; i++) {
      var bx = r() * W, by = r() * Hh, br = 70 + r() * 260, bc = blot[i % blot.length], col = bc[0] + ('0' + Math.round(bc[1] * 255).toString(16)).slice(-2);
      at(function (ox, oy) { var gr = c.createRadialGradient(bx + ox, by + oy, 0, bx + ox, by + oy, br); gr.addColorStop(0, col); gr.addColorStop(1, bc[0] + '00'); c.fillStyle = gr; c.fillRect(bx + ox - br, by + oy - br, br * 2, br * 2); });
    }
    // 雪の起伏・枯れ草・小さな岩：以前の地面の絵から切り出して、ふちをぼかして置く（大きさ・向き・位置はばらばら）
    var st = stamps(o.world);
    function put(list, n, sx, sy, scaleLo, scaleHi, alpha) {
      for (var q = 0; q < n; q++) {
        var s0 = list[(r() * list.length) | 0], sc = scaleLo + r() * (scaleHi - scaleLo), w = s0.width * sc * sx, h = s0.height * sc * sy;
        var px = r() * W, py = r() * Hh, fl = r() < .5;
        at(function (ox, oy) { c.save(); c.globalAlpha = alpha; c.translate(px + ox, py + oy); if (fl) c.scale(-1, 1); c.drawImage(s0, -w / 2, -h / 2, w, h); c.restore(); });
      }
    }
    put(st.mound, Math.round(42 * k0), .97, .64, .85, 1.5, .92);
    put(st.shrub, Math.round(56 * k0), .9, .8, .8, 1.25, .98);
    put(st.rock, Math.round(22 * k0), .9, .8, .8, 1.3, .98);
    for (i = 0; i < 9000 * k0; i++) { c.fillStyle = i % 3 ? 'rgba(255,255,255,.4)' : 'rgba(112,157,173,.11)'; c.fillRect(r() * W, r() * Hh, r() * 2 + 1, 1); }   // 粒は、はしでかけても目立たない
    for (i = 0; i < 260 * k0; i++) {   // きらめき（雪の結晶）
      var qx = r() * W, qy = r() * Hh; c.fillStyle = 'rgba(255,255,255,.95)'; c.fillRect(qx, qy, 2, 2);
      if (i % 5 === 0) { c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1; c.beginPath(); c.moveTo(qx - 5, qy + 1); c.lineTo(qx + 7, qy + 1); c.moveTo(qx + 1, qy - 5); c.lineTo(qx + 1, qy + 7); c.stroke(); }
    }
  }
  function snowBase(c, W, Hh) { var g = c.createLinearGradient(0, 0, W * .7, Hh); g.addColorStop(0, '#fbfdfc'); g.addColorStop(.55, '#f0f6f5'); g.addColorStop(1, '#e3eef1'); c.fillStyle = g; c.fillRect(0, 0, W, Hh); }
  function bakeGround(o, parts, MAP, scale) {
    var D = groundDims(MAP), sc = scale || SB, g = mk(D.GW * sc, D.GH * sc), c = g.getContext('2d');
    c.scale(sc, sc); snowBase(c, D.GW, D.GH);
    snowLayers(c, o, rng(941), D.GW, D.GH, D.GW * D.GH / (13 * T * 9 * H));
    // ふちを、すこしずつ透明に（まわりの雪原と、さかいめなくつながる）
    c.globalCompositeOperation = 'destination-in';
    var fx = GMX * .95, fy = GMY * .95, gx = c.createLinearGradient(0, 0, D.GW, 0), gy = c.createLinearGradient(0, 0, 0, D.GH);
    gx.addColorStop(0, 'rgba(0,0,0,0)'); gx.addColorStop(fx / D.GW, '#000'); gx.addColorStop(1 - fx / D.GW, '#000'); gx.addColorStop(1, 'rgba(0,0,0,0)');
    gy.addColorStop(0, 'rgba(0,0,0,0)'); gy.addColorStop(fy / D.GH, '#000'); gy.addColorStop(1 - fy / D.GH, '#000'); gy.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = gx; c.fillRect(0, 0, D.GW, D.GH); c.fillStyle = gy; c.fillRect(0, 0, D.GW, D.GH);
    return { canvas: g, GW: D.GW, GH: D.GH };
  }
  // 地図の外の雪原：つなぎ目のない 1024×512 の絵（起伏・枯れ草は、はしでかけても、反対がわにも描く）
  function bakePlain(o) {
    var p = mk(1024, 512), c = p.getContext('2d');
    snowBase(c, 1024, 512); snowLayers(c, o, rng(33), 1024, 512, 1024 * 512 / (13 * T * 9 * H) * 1.1, true);
    return { canvas: p };
  }

  // ---- 立った絵（木・家・岩・灯り）の置き場所。地図から作る ----
  function buildObjects(MAP, PLACES) {
    var list = [], r = rng(7), lastTone = -1;
    function tree(x, y, base, kind) {
      var tone = (r() * 6) | 0; if (tone === lastTone) tone = (tone + 1 + ((r() * 5) | 0)) % 6; lastTone = tone;
      var w = base * (kind === 'young' ? .6 : .76 + r() * .62), asp = 684 / 485 * (.88 + r() * .26);
      list.push({ kind: 'tree', x: x, y: y, w: w, h: w * asp, tone: tone, flip: r() < .5 ? 1 : 0 });
    }
    function rock(x, y, w) { list.push({ kind: 'rock', x: x, y: y, w: w, h: w * 427 / 490, tone: (r() * 3) | 0, flip: r() < .5 ? 1 : 0 }); }
    function wall(x, y, ridge) {   // 通れないマス：木の林（ところどころに岩・若木）。尾根（x=8）は、岩のつらなり
      if (ridge) { rock(x, y + .08, 150 + r() * 24); if (y !== 5 && y !== 7) rock(x + .05, y - .35, 108); return; }
      var roll = r(), jx = (r() - .5) * .62, jy = (r() - .5) * .4;
      if (roll < .1) { for (var k = 0; k < 3; k++) tree(x + (k - 1) * .3 + jx * .3, y + .1 + (k % 2) * .16, 100, 'young'); }       // 若木の群れ
      else if (roll < .16) { rock(x + jx, y + .12, 70 + r() * 36); tree(x + .1, y - .1, 96, 'young'); }                              // 岩のそばの木
      else { tree(x + jx, y + jy, 108); if (r() < .38) tree(x + (r() < .5 ? -.32 : .32), y - .28 + r() * .1, 82, 'young'); }       // 大きな木に、小さい木をそえる
    }
    var cols = MAP[0].length, rows = MAP.length;
    // 地図の外は、林（FM マスぶん）。地図のふちの木から、そのまま林が続く
    for (var y = -FM; y < rows + FM; y++) for (var x = -FM; x < cols + FM; x++) {
      var inside = y >= 0 && y < rows && x >= 0 && x < cols;
      if (inside) { if (MAP[y].charAt(x) === '#') wall(x, y, x === 8 && y > 0 && y < rows - 1); }
      else {   // 地図の外：ふちのすぐ外だけ木をつづけ、そこから先は、ぽつぽつと（雪原が見える）
        var out = Math.max(x < 0 ? -x : x - cols + 1, y < 0 ? -y : y - rows + 1), keep = out <= 1 ? .85 : out <= 3 ? .3 : out <= 6 ? .1 : .03;
        if (r() < keep) { if (r() < .12) rock(x + (r() - .5) * .5, y + .12, 70 + r() * 40); else tree(x + (r() - .5) * .7, y + (r() - .5) * .5, 98); }
      }
    }
    var h = PLACES.home, tn = PLACES.town, ch = PLACES.chest;
    list.push({ kind: 'cabin', x: h.x, y: h.y - .3, w: 176, h: 176 * 495 / 620, place: 'home' });
    [[0, -.35, 172], [-.75, -.9, 132], [.65, -1.08, 128]].forEach(function (q) { list.push({ kind: 'cabin', x: tn.x + q[0], y: tn.y + q[1], w: q[2], h: q[2] * 495 / 620, place: 'town' }); });
    [[1.6, .1], [-.35, .2]].forEach(function (q, i) { list.push({ kind: 'lantern', x: h.x + q[0], y: h.y + q[1], w: 35, h: 35 * 503 / 280, i: i }); });
    [[tn.x - .5, tn.y + 2.1], [tn.x - .7, tn.y + .35]].forEach(function (q) { list.push({ kind: 'lantern', x: q[0], y: q[1], w: 35, h: 35 * 503 / 280 }); });
    list.push({ kind: 'lantern', x: PLACES.camp.x + 1.15, y: PLACES.camp.y + .02, w: 35, h: 35 * 503 / 280 });
    void ch;
    list.sort(function (a, b) { return a.y - b.y; });
    return list;
  }

  // ---- 描画器 ----
  function create(host, opts) {
    if (current) current.destroy();
    var MAP = opts.map, PLACES = opts.places, canvas = doc.createElement('canvas'), ctx = canvas.getContext('2d', { alpha: true });
    canvas.className = 'adv-canvas'; canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    var objects = buildObjects(MAP, PLACES), A = null;   // A：読み込んだ絵
    var hits = [], width = 0, height = 0, ratio = 1, zoom = 1, back = null, dead = false, queued = 0, ro = null;
    var hero = { x: opts.hero.x, y: opts.hero.y, face: 0, diag: false, walking: false, dist: 0 };   // dist：歩いた道のり（マス）。歩くしぐさの位相
    var cam = { x: hero.x, y: hero.y - .3 }, quality = opts.quality || 'std';
    var avatarSheet = opts.sheet, diagSheet = opts.diagSheet, walkSheet = opts.walkSheet, cols = MAP[0].length, rows = MAP.length;

    var overview = !!opts.overview, cy0 = overview ? .5 : .55;   // 全体マップ：地図ぜんたいが入る大きさで、動かさない
    function project(x, y) { return { x: width * .5 + (x - cam.x) * T * zoom, y: height * cy0 + (y - cam.y) * T * Y * zoom }; }
    function unproject(px, py) { return { x: cam.x + (px - width * .5) / (T * zoom), y: cam.y + (py - height * cy0) / (T * Y * zoom) }; }
    function followHero() {
      if (overview) { cam.x = (cols - 1) / 2; cam.y = (rows - 1) / 2; return; }
      var margin = Math.min(4.9, Math.max(1.6, width / (T * zoom) * .3));
      cam.x = Math.max(margin, Math.min(cols - 1 - margin, hero.x));
      cam.y = hero.y - .3;
    }
    function horizon() { return Math.round(height * (overview ? .1 : .34)); }
    function bakeBack() {
      back = mk(width * ratio, height * ratio); var b = back.getContext('2d'); b.setTransform(ratio, 0, 0, ratio, 0, 0);
      var h0 = horizon();
      b.fillStyle = '#bcd6e4'; b.fillRect(0, 0, width, height);
      // 遠景：雪山。いちばん下は、もやにとけて、水平線になる
      var d = A && A.distance;
      if (d) { var s = Math.max(width / d.width, h0 * 1.3 / d.height), dw = d.width * s, dh = d.height * s; b.drawImage(d, (width - dw) * .5, Math.min(0, h0 - dh * .72), dw, dh); }
      var hz = b.createLinearGradient(0, h0 * .62, 0, h0); hz.addColorStop(0, 'rgba(222,234,240,0)'); hz.addColorStop(1, '#e4edf1'); b.fillStyle = hz; b.fillRect(0, h0 * .62, width, h0 * .38 + 1);
      b.fillStyle = '#e8f0f2'; b.fillRect(0, h0, width, height - h0);
    }
    function resize() {
      var w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
      width = w; height = h; ratio = Math.min(root.devicePixelRatio || 1, QUALITY[quality] || 1.5);
      zoom = width < 600 ? .78 : Math.min(1.22, width / 1000); if (height < 500) zoom = Math.min(zoom, .8);
      if (overview) zoom = Math.min((width - 12) / ((cols + 2) * T), (height * .8) / ((rows + 2) * T * Y), 1.2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      bakeBack(); followHero(); draw();
    }

    function label(wx, wy, markup) {
      var p = project(wx, wy), useRt = !!(FF.app && FF.app.state && FF.app.state.settings.furigana), toks = FF.util.parseRichText(useRt ? FF.util.autoRubyMarkup(markup) : markup, {});
      if (p.x < -120 || p.x > width + 120 || p.y < 40 || p.y > height - 20) return;
      if (Math.hypot(hero.x - wx, hero.y - wy) < 1.1) return;   // 主人公がそばにいるときは、ラベルで体をかくさない
      ctx.font = '700 12px sans-serif'; var tw = 0; toks.forEach(function (t) { t.w = ctx.measureText(t.text !== undefined ? t.text : t.ruby).width; tw += t.w; });
      var W = tw + 20, H = useRt ? 28 : 20, x = p.x - W / 2, y = p.y + 14;
      ctx.fillStyle = 'rgba(247,249,239,.92)'; pill(ctx, x, y, W, H, 9); ctx.fill();
      ctx.fillStyle = '#35566a'; ctx.textBaseline = 'alphabetic'; var cx = x + 10, base = y + H - 6;
      toks.forEach(function (t) {
        if (t.text !== undefined) { ctx.font = '700 12px sans-serif'; ctx.fillText(t.text, cx, base); }
        else { ctx.font = '700 12px sans-serif'; ctx.fillText(t.ruby, cx, base); if (useRt && t.rt) { ctx.font = '600 7px sans-serif'; var rw = ctx.measureText(t.rt).width; ctx.fillText(t.rt, cx + (t.w - rw) / 2, base - 13); } }
        cx += t.w;
      });
    }
    function shadow(p, w, a) {
      ctx.fillStyle = 'rgba(40,70,100,' + (a || .16) + ')'; ctx.beginPath(); ctx.ellipse(p.x, p.y + 1, w * .36, w * .1, 0, 0, Math.PI * 2); ctx.fill();
    }
    function drawObject(o, hp) {
      var p = project(o.x, o.y), w = o.w * zoom, h = o.h * zoom;
      if (p.x + w / 2 < 0 || p.x - w / 2 > width || p.y < 0 || p.y - h > height) return;
      // 水平線より奥は、足元の地面がない（山のうえに浮いて見える）ので、描かない。水平線のすぐ手前は、もやにとけるように、だんだんうすく
      var h0 = horizon(), fade = Math.min(1, (p.y - h0) / (80 * zoom)); if (fade <= 0) return;
      var src;
      if (o.kind === 'tree') src = A.parts.trees[o.tone][o.flip];
      else if (o.kind === 'rock') src = A.parts.rocks[o.tone][o.flip];
      else src = A.parts[o.kind];
      shadow(p, w);
      // 手前の木・岩が主人公の体をかくすときは、うすくする（足元の影は残す）
      var covers = o.y > hero.y + .05 && Math.abs(p.x - hp.x) < w * .42 && hp.y - 28 > p.y - h && hp.y - 28 < p.y;
      ctx.globalAlpha = (covers ? .36 : 1) * fade; ctx.drawImage(src, p.x - w / 2, p.y - h, w, h); ctx.globalAlpha = 1;
      if (o.place) hits.push({ x: p.x - w / 2, y: p.y - h, w: w, h: h, cell: PLACES[o.place], kind: o.place });   // 建物をタップしたら、その入口のマスへ
    }
    function drawProp(kind, x, y, w, cell) {
      var img = A.props, half = img.width / 2, h = w * img.height / half, p = project(x, y);
      shadow(p, w * zoom); ctx.drawImage(img, kind * half, 0, half, img.height, p.x - w * zoom / 2, p.y - h * zoom + 8 * zoom, w * zoom, h * zoom);
      hits.push({ x: p.x - w * zoom / 2, y: p.y - h * zoom + 8 * zoom, w: w * zoom, h: h * zoom, cell: cell, kind: kind ? 'camp' : 'chest' });   // 焚き火・宝箱をタップしたら、そのマスへ
    }
    function drawBoss(x, y) {
      var img = A.enemies; if (!img) return; var p = project(x, y), h = 150 * zoom, w = h * 707 / 940;
      shadow(p, w * 1.1, .2); ctx.drawImage(img, 829, 20, 707, 940, p.x - w / 2, p.y - h + 10 * zoom, w, h);
      hits.push({ x: p.x - w / 2, y: p.y - h + 10 * zoom, w: w, h: h, cell: { x: x, y: y }, kind: 'boss' });
      ctx.font = '700 11px sans-serif'; ctx.fillStyle = '#c8873a'; ctx.textAlign = 'center'; ctx.fillText('★★★', p.x, p.y - h - 2); ctx.textAlign = 'start';
    }
    function drawHero() {
      var p = project(hero.x, hero.y), s = 72 * zoom;
      // 歩くしぐさ：絵は、立ち姿の1枚ずつなので、1マスに2歩ぶん、はずんで、体をかたむける（歩いた道のりで決まるので、足を止めるとぴたりと止まる）
      var wimg = walkSheet && hero.walking && !opts.reduced && !overview ? sheet(walkSheet) : null;
      var ph = hero.walking && !opts.reduced && !overview && !wimg ? hero.dist * Math.PI * 2 : 0, hop = Math.abs(Math.sin(ph)), tilt = Math.sin(ph);
      if (overview) { ctx.fillStyle = 'rgba(224,181,104,.55)'; ctx.beginPath(); ctx.arc(p.x, p.y - 8, 15, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#d09233'; ctx.lineWidth = 2.5; ctx.stroke(); }
      shadow(p, 43 * zoom * 1.2 * (1 - .25 * hop), .22 - .08 * hop);
      ctx.strokeStyle = '#e0b568'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(p.x, p.y + 1, 20 * zoom, 7 * zoom, 0, 0, Math.PI * 2); ctx.stroke();
      // 歩く絵（判断397）：歩いているあいだ、歩いた道のり（1マス＝歩き1周＝4コマ）でコマを選ぶ。ななめ向き・絵がない人は、下の立ち姿を跳ねさせる
      if (wimg) {
        var wq = wimg.width / 4, ws = s * 1.229, col = Math.floor((hero.dist / 2 % 1 + 1) % 1 * 4) % 4;   // 1マスで1歩（2コマ）、2マスで歩き1周。1コマの人物の高さは枠の約78%なので、立ち姿（約96%）と同じ大きさにそろえる
        // ななめ向きは、歩く絵のななめがないので、前向き（手前へ）・後ろ向き（奥へ）の行を、進む側へ向けて（左右反転）使う。跳ねない
        var flip = hero.diag ? hero.face % 2 === 0 : hero.face === 2, row = hero.diag ? (hero.face < 2 ? 0 : 1) : flip ? 3 : hero.face;   // 左向きは、右向きの行を左右反転（e1 の左向きの行は、足の動きがほとんどなかった。判断399）
        ctx.save(); ctx.translate(p.x, 0); if (flip) ctx.scale(-1, 1);
        ctx.drawImage(wimg, col * wq, row * wq, wq, wq, -ws / 2, p.y + 4 - .015 * s - .922 * ws, ws, ws); ctx.restore(); return;
      }
      var img = (hero.diag && sheet(diagSheet)) || sheet(avatarSheet); if (!img) return;
      var diag = hero.diag && img === sheets[diagSheet], q = img.width / 2, face = hero.face;
      if (hero.diag && !diag) face = ({ 0: 0, 1: 0, 2: 3, 3: 3 })[face];   // ななめの絵がないときは、前向き・左右の絵
      ctx.save(); ctx.translate(p.x + tilt * 2.5 * zoom, p.y - hop * 11 * zoom); ctx.rotate(tilt * .13); ctx.scale(1 + .05 * (1 - hop), 1 + .08 * hop);   // 足元を軸に、はずんで・かたむく
      ctx.drawImage(img, (face % 2) * q, Math.floor(face / 2) * q, q, q, -s / 2, -s + 4, s, s); ctx.restore();
    }

    function draw() {
      if (dead || !width) return;
      if (!A) { ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.fillStyle = '#dbe9ee'; ctx.fillRect(0, 0, width, height); ctx.fillStyle = '#6d8f9f'; ctx.font = '700 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('景色を準備しています…', width / 2, height * .45); ctx.textAlign = 'start'; return; }
      var st = opts.state(), hp = project(hero.x, hero.y); hits = [];
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, height);
      ctx.drawImage(back, 0, 0, width, height);
      var h0 = horizon(), pl = A.plain, tw = 1024 * zoom, th = 512 * zoom, p0 = project(-.5, -.5);
      // 地図の外の雪原：地面と同じ速さで流れる。水平線の下だけ
      var ox = (((p0.x - GMX * zoom) % tw) + tw) % tw - tw, oy = (((p0.y - GMY * zoom) % th) + th) % th - th;
      ctx.save(); ctx.beginPath(); ctx.rect(0, h0, width, height - h0); ctx.clip();
      for (var wy = Math.min(oy, h0 - th); wy < height; wy += th) for (var wx = ox; wx < width; wx += tw) ctx.drawImage(pl, wx, wy, tw, th);
      ctx.restore();
      var hz = ctx.createLinearGradient(0, h0, 0, h0 + 110 * zoom); hz.addColorStop(0, 'rgba(228,237,241,.95)'); hz.addColorStop(1, 'rgba(228,237,241,0)'); ctx.fillStyle = hz; ctx.fillRect(0, h0, width, 110 * zoom);
      var gd = groundDims(MAP); ctx.drawImage(A.ground, p0.x - GMX * zoom, p0.y - GMY * zoom, gd.GW * zoom, gd.GH * zoom);
      // 動くもの・状態で変わるもの：主人公・焚き火・宝箱・ボス。足元の y 順に、立てた絵の間へ入れる
      var dyn = [{ y: hero.y, f: drawHero }, { y: PLACES.camp.y - .3, f: function () { drawProp(1, PLACES.camp.x + .3, PLACES.camp.y - .3, 66, PLACES.camp); } }];   // 絵の足元は、焚き火のマスの中（右上に少し）。マスとの、ずれは0.5マスいない。主人公は、そのとなりに立つ
      if (st && !st.chest) dyn.push({ y: PLACES.chest.y - .3, f: function () { drawProp(0, PLACES.chest.x, PLACES.chest.y - .3, 45, PLACES.chest); } });
      if (st && opts.boss && st.cleared.indexOf('boss') < 0) dyn.push({ y: opts.boss.y, f: function () { drawBoss(opts.boss.x, opts.boss.y); } });
      dyn.sort(function (a, b) { return a.y - b.y; });
      var di = 0;
      var yTop = cam.y - height * cy0 / (H * zoom) - 4.8, yEnd = cam.y + height * (1 - cy0) / (H * zoom) + 1.6, lo = 0, hi = objects.length;   // 見える範囲の木だけ（y 順に並んでいるので、二分探索）
      while (lo < hi) { var mid = (lo + hi) >> 1; if (objects[mid].y < yTop) lo = mid + 1; else hi = mid; }
      for (var oi = lo; oi < objects.length && objects[oi].y <= yEnd; oi++) { var ob = objects[oi]; while (di < dyn.length && dyn[di].y <= ob.y) dyn[di++].f(); drawObject(ob, hp); }
      while (di < dyn.length) dyn[di++].f();
      Object.keys(opts.labels).forEach(function (k) { label(PLACES[k].x, PLACES[k].y, opts.labels[k]); });
      if (quality !== 'low') {
        var g = ctx.createLinearGradient(0, 0, width, height); g.addColorStop(0, 'rgba(255,240,190,.09)'); g.addColorStop(.6, 'rgba(255,240,190,0)'); g.addColorStop(1, 'rgba(49,94,125,.04)'); ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);
      }
    }
    function requestDraw() { if (queued || dead) return; queued = root.requestAnimationFrame(function () { queued = 0; draw(); }); }

    // タップ：地面の位置を、マスに直して返す
    var tap = null;
    canvas.addEventListener('pointerdown', function (e) { tap = { id: e.pointerId, x: e.clientX, y: e.clientY }; });
    canvas.addEventListener('pointerup', function (e) {
      if (!tap || tap.id !== e.pointerId) return; var t = tap; tap = null;
      if (Math.hypot(e.clientX - t.x, e.clientY - t.y) > 12) return;
      var r = canvas.getBoundingClientRect(), tx = e.clientX - r.left, ty = e.clientY - r.top;
      for (var hi = hits.length - 1; hi >= 0; hi--) { var hh = hits[hi]; if (tx >= hh.x && tx <= hh.x + hh.w && ty >= hh.y && ty <= hh.y + hh.h) { opts.onTap({ x: hh.cell.x, y: hh.cell.y }); return; } }   // 建物・焚き火・宝箱・ボスの絵の上は、そのマスへ
      var u = unproject(tx, ty), cx = Math.round(u.x), cy = Math.round(u.y);
      if (cy >= 0 && cy < MAP.length && cx >= 0 && cx < MAP[0].length) opts.onTap({ x: cx, y: cy });
    });
    canvas.addEventListener('pointercancel', function () { tap = null; });

    var api = {
      canvas: canvas,
      setHero: function (x, y) { hero.dist += Math.hypot(x - hero.x, y - hero.y); hero.x = x; hero.y = y; followHero(); draw(); },
      face: function (facing, via) {
        if (via) { hero.diag = true; hero.face = (via.dy < 0 ? 2 : 0) + (via.dx > 0 ? 1 : 0); }
        else { hero.diag = false; hero.face = ({ down: 0, up: 1, left: 2, right: 3 })[facing] || 0; }
      },
      setWalking: function (b) { hero.walking = !!b; requestDraw(); },
      setQuality: function (q) { quality = q; resize(); },
      quality: function () { return quality; },
      requestDraw: requestDraw,
      project: project,
      hitRects: function () { return hits.slice(); },
      destroy: function () { dead = true; if (ro) ro.disconnect(); if (queued) root.cancelAnimationFrame(queued); if (canvas.parentNode) canvas.parentNode.removeChild(canvas); if (current === api) current = null; }
    };
    current = api;
    if (root.ResizeObserver) { ro = new root.ResizeObserver(function () { if (!canvas.isConnected) { api.destroy(); return; } resize(); }); ro.observe(host); } else root.addEventListener('resize', resize);
    ensureImages(MAP).then(function (o) { if (dead) return; A = o; bakeBack(); resize(); timing.ready = true; });
    resize();
    return api;
  }

    // 焼き込み用（tests/tools/bake-canvas-ground.cjs から呼ぶ）：地面と、地図の外の雪原の絵を作る
  function bakeAssets(MAP) {
    return Promise.all([loadImage(DIR + 'alpine-atlas.webp'), loadImage(DIR + 'snow-surface.webp'), loadImage('img/adventure/snow-world.webp')]).then(function (l) {
      var o = { atlas: l[0], snow: l[1], world: l[2] }; o.parts = bake(o);
      return { key: mapKey(MAP), ground: bakeGround(o, o.parts, MAP).canvas, plain: bakePlain(o).canvas };
    });
  }
  FF.ui.fieldCanvas = { create: create, preload: function (MAP) { return ensureImages(MAP); }, bakeAssets: bakeAssets, mapKey: mapKey, QUALITY: QUALITY, timing: timing, current: function () { return current; } };
})(this);
