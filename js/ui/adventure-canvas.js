// 雪原のフィールドの Canvas 描画（試作。判断387）：斜め見下ろしの固定カメラ。地面・遠景は一度だけ焼き込み、木・家・岩などの立った絵は足元の y 順に重ねる。
// 地図・場所・状態は、呼び出し側（js/ui/adventure.js）が持つ。ここは、絵を描いて、タップの位置を返すだけ（ゲームの進行・セーブには触れない）。
// 元になった試作：codex-prototypes/snowfield-canvas（ChatGPT。素材もそこから）。木・雪面が単調にならないよう、色・大きさ・向きのばらつきと、雪の起伏・小物を足した。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {}; FF.ui = FF.ui || {};
  var doc = root.document;
  var T = 112, Y = .64, OX = 60, OY = 50, CLIFF = 70;     // 1マスの幅（描画用の座標）、たての縮み、地面の絵の余白（海べりのふくらみ）・崖の高さ
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

  var imgs = null, loading = null, baked = null, current = null, groundCache = {};

  function mk(w, h) { var c = doc.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function poly(c, pts, fill) { c.fillStyle = fill; c.beginPath(); pts.forEach(function (p, i) { if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); }); c.closePath(); c.fill(); }
  function pill(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

  function loadImage(url) {
    return new Promise(function (resolve) { var i = new root.Image(); i.onload = function () { resolve(i); }; i.onerror = function () { resolve(null); }; i.src = url; });
  }
  function ensureImages() {
    if (imgs) return Promise.resolve(imgs);
    if (loading) return loading;
    var urls = { atlas: DIR + 'alpine-atlas.webp', distance: DIR + 'alpine-distance.webp', snow: DIR + 'snow-surface.webp', props: DIR + 'camp-props.webp', enemies: 'img/adventure/snow-enemies.webp', world: 'img/adventure/snow-world.webp' };
    loading = Promise.all(Object.keys(urls).map(function (k) { return loadImage(urls[k]).then(function (i) { return [k, i]; }); })).then(function (list) {
      var o = {}; list.forEach(function (p) { o[p[0]] = p[1]; });
      imgs = o; baked = bake(o); return o;
    });
    return loading;
  }
  // 水面のさざ波と流氷（つなぎ目のない小さな絵。カメラにあわせて動かして、地面と同じ速さで流れる）
  var waterTile = null;
  function water() {
    if (waterTile) return waterTile;
    var c = mk(256, 128), x = c.getContext('2d'), q = rng(55);
    function at(fn) { for (var ox = -256; ox <= 256; ox += 256) for (var oy = -128; oy <= 128; oy += 128) { x.save(); x.translate(ox, oy); fn(); x.restore(); } }
    for (var i = 0; i < 16; i++) { var px = q() * 256, py = q() * 128, len = 18 + q() * 40, light = i % 3 > 0; at(function () { x.strokeStyle = light ? 'rgba(255,255,255,.4)' : 'rgba(35,95,135,.16)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + len / 2, py - 2.5, px + len, py); x.stroke(); }); }
    for (i = 0; i < 4; i++) { var fx = q() * 256, fy = q() * 128, fr = 9 + q() * 12; at(function () { x.fillStyle = 'rgba(40,100,140,.2)'; x.beginPath(); x.ellipse(fx + 3, fy + 3, fr, fr * .42, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = 'rgba(244,250,252,.92)'; x.beginPath(); x.ellipse(fx, fy, fr, fr * .4, 0, 0, Math.PI * 2); x.fill(); }); }
    return (waterTile = c);
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
  // 地図から、陸のマス（'~' の海でないマス）の形を作る。四角いマスの和に、海に面した辺と角へ、ふくらみ（だ円）を足して、海べりを自然な形にする
  function dims(MAP) { var cols = MAP[0].length, rows = MAP.length; return { cols: cols, rows: rows, GW: cols * T + 2 * OX, GH: Math.round(rows * T * Y) + 2 * OY + CLIFF }; }
  function isLand(MAP, x, y) { var row = MAP[y]; return !!row && x >= 0 && x < row.length && row.charAt(x) !== '~'; }
  function landPath(c, MAP, dy, rim) {
    var rnd = rng(1234), H = T * Y;
    c.beginPath();
    function blob(cx, cy, rx) { c.moveTo(cx + rx, cy + dy); c.ellipse(cx, cy + dy, rx, rx * Y, 0, 0, Math.PI * 2); }
    for (var y = 0; y < MAP.length; y++) for (var x = 0; x < MAP[y].length; x++) {
      if (!isLand(MAP, x, y)) continue;
      var cx = (x + .5) * T + OX, cy = (y + .5) * H + OY;
      c.rect(cx - T / 2 - 1, cy - H / 2 - 1 + dy, T + 2, H + 2);
      var W = isLand(MAP, x - 1, y), E = isLand(MAP, x + 1, y), N = isLand(MAP, x, y - 1), S = isLand(MAP, x, y + 1);
      [[W, -1, 0], [E, 1, 0], [N, 0, -1], [S, 0, 1]].forEach(function (d) {
        if (d[0]) return;
        for (var k = -1; k <= 1; k++) {
          var bx = cx + (d[1] ? d[1] * T / 2 : k * T * .3), by = cy + (d[2] ? d[2] * H / 2 : k * H * .3), out = rnd() * .2, rx = T * (.2 + rnd() * .18);
          bx += d[1] * T * out; by += d[2] * H * out; blob(bx, by, rx);
          if (rim && dy === 0) rim.push([bx, by, d[1], d[2]]);
        }
      });
      [[W, N, -1, -1], [E, N, 1, -1], [W, S, -1, 1], [E, S, 1, 1]].forEach(function (d) { if (!d[0] && !d[1]) blob(cx + d[2] * T / 2, cy + d[3] * H / 2, T * (.28 + rnd() * .1)); });   // とがった角を、まるくする
    }
  }
  function groundFor(o, parts, MAP) {
    var key = MAP.join('/');
    if (!groundCache[key]) groundCache[key] = bakeGround(o, parts, MAP);
    return groundCache[key];
  }
  function bakeGround(o, parts, MAP) {
    var D = dims(MAP), GW = D.GW, GH = D.GH, g = mk(GW, GH), c = g.getContext('2d'), r = rng(941), rim = [], k0 = GW * GH / (13 * T * 9 * T * Y);
    landPath(c, MAP, 0, rim);   // rim を作る
    // 崖：陸の形を、下へずらして重ねる。海べりの岩を並べる
    landPath(c, MAP, 38); c.fillStyle = 'rgba(75,116,133,.55)'; c.fill();
    landPath(c, MAP, 24); c.fillStyle = '#96b9c5'; c.fill();
    var rock = parts.rocks[1][0], rr = rng(77);
    rim.forEach(function (p) {
      if (p[3] < 0) return;   // 奥（北）の海べりは、崖が見えない
      var big = p[3] > 0, w = big ? 110 + rr() * 26 : 86 + rr() * 20, h = w * rock.height / rock.width;
      c.save(); if (rr() < .5) { c.translate(p[0] * 2, 0); c.scale(-1, 1); } c.drawImage(rock, 0, 0, rock.width, rock.height, p[0] - w / 2 + (p[2] ? p[2] * 6 : 0), p[1] + 14 - h * .55, w, h); c.restore();
    });
    var snow = c.createLinearGradient(0, 0, GW * .7, GH); snow.addColorStop(0, '#ffffff'); snow.addColorStop(.55, '#f1f7f5'); snow.addColorStop(1, '#dcebef');
    landPath(c, MAP, 0); c.fillStyle = snow; c.fill();
    c.save(); landPath(c, MAP, 0); c.clip();
    // 雪の質感：大きさと向きを変えた3枚を、うすく重ねる（1枚を引き伸ばすと、同じ模様が目立つ）
    function tex(alpha, flip, fx, fy, fw) {   // 雪の絵の一部（fx,fy,fw は 0〜1 の割合）を、地面いっぱいに引きのばす（タイルにしない。つなぎ目が出ない）
      var w = o.snow.width * fw, h = o.snow.height * fw;
      c.save(); c.globalAlpha = alpha; if (flip) { c.translate(GW, 0); c.scale(-1, 1); }
      c.drawImage(o.snow, o.snow.width * fx, o.snow.height * fy, w, h, 0, 0, GW, GH); c.restore();
    }
    tex(.5, false, 0, .1, .9); tex(.3, true, .15, 0, .8); tex(.22, false, .05, .25, .65);
    // ゆるやかな色むら：青い窪みと、日の当たる明るいところ
    var blot = [['#ffffff', .4], ['#9cc3d6', .1], ['#fff0c4', .2], ['#7aa8bf', .08], ['#ffffff', .3]];
    for (var i = 0; i < 90 * k0; i++) {
      var bx = r() * GW, by = r() * GH, br = 70 + r() * 260, bc = blot[i % blot.length], gr = c.createRadialGradient(bx, by, 0, bx, by, br);
      gr.addColorStop(0, bc[0] + ('0' + Math.round(bc[1] * 255).toString(16)).slice(-2)); gr.addColorStop(1, bc[0] + '00'); c.fillStyle = gr; c.fillRect(bx - br, by - br, br * 2, br * 2);
    }
    // 海べりは、青く沈む
    rim.forEach(function (p) { var gr = c.createRadialGradient(p[0], p[1], 0, p[0], p[1], 90); gr.addColorStop(0, 'rgba(80,130,160,.18)'); gr.addColorStop(1, 'rgba(80,130,160,0)'); c.fillStyle = gr; c.fillRect(p[0] - 90, p[1] - 90, 180, 180); });
    // 雪の起伏・枯れ草・小さな岩：以前の地面の絵から切り出して、ふちをぼかして置く（大きさ・向き・位置はばらばら）
    var st = stamps(o.world);
    function put(list, n, sx, sy, scaleLo, scaleHi, alpha) {
      for (var q = 0; q < n; q++) {
        var s0 = list[(r() * list.length) | 0], sc = scaleLo + r() * (scaleHi - scaleLo), w = s0.width * sc * sx, h = s0.height * sc * sy;
        c.save(); c.globalAlpha = alpha; c.translate(OX + r() * (GW - 2 * OX), OY + r() * (GH - 2 * OY - CLIFF)); if (r() < .5) c.scale(-1, 1);
        c.drawImage(s0, -w / 2, -h / 2, w, h); c.restore();
      }
    }
    put(st.mound, Math.round(42 * k0), .97, .64, .85, 1.5, .92);
    put(st.shrub, Math.round(56 * k0), .9, .8, .8, 1.25, .98);
    put(st.rock, Math.round(22 * k0), .9, .8, .8, 1.3, .98);
    for (i = 0; i < 16000 * k0; i++) { c.fillStyle = i % 3 ? 'rgba(255,255,255,.4)' : 'rgba(112,157,173,.11)'; c.fillRect(r() * GW, r() * GH, r() * 2 + 1, 1); }
    // きらめき（雪の結晶）
    for (i = 0; i < 260 * k0; i++) {
      var qx = r() * GW, qy = r() * GH; c.fillStyle = 'rgba(255,255,255,.95)'; c.fillRect(qx, qy, 2, 2);
      if (i % 5 === 0) { c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1; c.beginPath(); c.moveTo(qx - 5, qy + 1); c.lineTo(qx + 7, qy + 1); c.moveTo(qx + 1, qy - 5); c.lineTo(qx + 1, qy + 7); c.stroke(); }
    }
    c.restore();
    return { canvas: g, GW: GW, GH: GH };
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
    MAP.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        if (row[x] !== '#') continue;
        if (x === 8 && y > 0 && y < MAP.length - 1) { rock(x, y + .08, 150 + r() * 24); if (y !== 5 && y !== 7) rock(x + .05, y - .35, 108); continue; }
        var roll = r(), jx = (r() - .5) * .62, jy = (r() - .5) * .4;
        if (roll < .1) { for (var k = 0; k < 3; k++) tree(x + (k - 1) * .3 + jx * .3, y + .1 + (k % 2) * .16, 100, 'young'); }       // 若木の群れ
        else if (roll < .16) { rock(x + jx, y + .12, 70 + r() * 36); tree(x + .1, y - .1, 96, 'young'); }                              // 岩のそばの木
        else { tree(x + jx, y + jy, 108); if (r() < .38) tree(x + (r() < .5 ? -.32 : .32), y - .28 + r() * .1, 82, 'young'); }       // 大きな木に、小さい木をそえる
        if (!isLand(MAP, x - 1, y) || !isLand(MAP, x + 1, y) || !isLand(MAP, x, y - 1) || !isLand(MAP, x, y + 1)) tree(x + .4, y + .19, 96);   // 海べりの木は、すきまなく
      }
    });
    var h = PLACES.home, tn = PLACES.town, ch = PLACES.chest;
    list.push({ kind: 'cabin', x: h.x, y: h.y - .3, w: 176, h: 176 * 495 / 620 });
    [[0, -.35, 172], [-.75, -.9, 132], [.65, -1.08, 128]].forEach(function (q) { list.push({ kind: 'cabin', x: tn.x + q[0], y: tn.y + q[1], w: q[2], h: q[2] * 495 / 620 }); });
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
    var objects = buildObjects(MAP, PLACES);
    var width = 0, height = 0, ratio = 1, zoom = 1, back = null, dead = false, pending = 0, ro = null;
    var hero = { x: opts.hero.x, y: opts.hero.y, face: 0, diag: false, walking: false, stamp: 0 };
    var cam = { x: hero.x, y: hero.y - .3 }, quality = opts.quality || 'std';
    var avatarSheet = opts.sheet, diagSheet = opts.diagSheet, ground = null, cols = MAP[0].length, rows = MAP.length;

    var overview = !!opts.overview, cy0 = overview ? .5 : .55;   // 全体マップ：地図ぜんたいが入る大きさで、動かさない
    function project(x, y) { return { x: width * .5 + (x - cam.x) * T * zoom, y: height * cy0 + (y - cam.y) * T * Y * zoom }; }
    function unproject(px, py) { return { x: cam.x + (px - width * .5) / (T * zoom), y: cam.y + (py - height * cy0) / (T * Y * zoom) }; }
    function followHero() {
      if (overview) { cam.x = (cols - 1) / 2; cam.y = (rows - 1) / 2; return; }
      var margin = Math.min(4.9, Math.max(1.6, width / (T * zoom) * .3));
      cam.x = Math.max(margin, Math.min(cols - 1 - margin, hero.x));
      var maxY = rows - .45 - (height * .45 - 150) / (T * Y * zoom);   // 地面の下の端が、画面の下に近づきすぎない（下の空きは、移動パッドのうしろに隠れる）
      cam.y = Math.min(hero.y - .3, maxY);
    }
    function horizon() { return Math.round(height * .34); }
    function bakeBack() {
      back = mk(width * ratio, height * ratio); var b = back.getContext('2d'); b.setTransform(ratio, 0, 0, ratio, 0, 0);
      var h0 = horizon();
      b.fillStyle = '#bcd6e4'; b.fillRect(0, 0, width, height);
      // 遠景：雪山。いちばん下は、もやにとけて、水平線になる
      var d = imgs && imgs.distance;
      if (d) { var s = Math.max(width / d.width, h0 * 1.3 / d.height), dw = d.width * s, dh = d.height * s; b.drawImage(d, (width - dw) * .5, Math.min(0, h0 - dh * .72), dw, dh); }
      var hz = b.createLinearGradient(0, h0 * .62, 0, h0); hz.addColorStop(0, 'rgba(207,227,234,0)'); hz.addColorStop(1, '#cfe3ea'); b.fillStyle = hz; b.fillRect(0, h0 * .62, width, h0 * .38 + 1);
      // 水面：水平線のあたりは、もやで白く、手前ほど深い青
      var w = b.createLinearGradient(0, h0, 0, height); w.addColorStop(0, '#cfe3ea'); w.addColorStop(.12, '#98c6d6'); w.addColorStop(.55, '#6aa5be'); w.addColorStop(1, '#4f8aa6');
      b.fillStyle = w; b.fillRect(0, h0, width, height - h0);
    }
    function resize() {
      var w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
      width = w; height = h; ratio = Math.min(root.devicePixelRatio || 1, QUALITY[quality] || 1.5);
      zoom = width < 600 ? .78 : Math.min(1.22, width / 1000); if (height < 500) zoom = Math.min(zoom, .8);
      if (overview) zoom = Math.min((width - 12) / (cols * T), (height * .8) / (rows * T * Y), 1.2);
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
      var src;
      if (o.kind === 'tree') src = baked.trees[o.tone][o.flip];
      else if (o.kind === 'rock') src = baked.rocks[o.tone][o.flip];
      else src = baked[o.kind];
      shadow(p, w);
      // 手前の木・岩が主人公の体をかくすときは、うすくする（足元の影は残す）
      var covers = o.y > hero.y + .05 && Math.abs(p.x - hp.x) < w * .42 && hp.y - 28 > p.y - h && hp.y - 28 < p.y;
      ctx.globalAlpha = covers ? .36 : 1; ctx.drawImage(src, p.x - w / 2, p.y - h, w, h); ctx.globalAlpha = 1;
    }
    function drawProp(kind, x, y, w) {
      var img = imgs.props, half = img.width / 2, h = w * img.height / half, p = project(x, y);
      shadow(p, w * zoom); ctx.drawImage(img, kind * half, 0, half, img.height, p.x - w * zoom / 2, p.y - h * zoom + 8 * zoom, w * zoom, h * zoom);
    }
    function drawBoss(x, y) {
      var img = imgs.enemies; if (!img) return; var p = project(x, y), h = 150 * zoom, w = h * 707 / 940;
      shadow(p, w * 1.1, .2); ctx.drawImage(img, 829, 20, 707, 940, p.x - w / 2, p.y - h + 10 * zoom, w, h);
      ctx.font = '700 11px sans-serif'; ctx.fillStyle = '#c8873a'; ctx.textAlign = 'center'; ctx.fillText('★★★', p.x, p.y - h - 2); ctx.textAlign = 'start';
    }
    function drawHero() {
      var p = project(hero.x, hero.y), s = 72 * zoom, bob = hero.walking && !opts.reduced ? Math.sin(root.performance.now() / 1000 * 22) * 1.8 : 0;
      if (overview) { ctx.fillStyle = 'rgba(224,181,104,.55)'; ctx.beginPath(); ctx.arc(p.x, p.y - 8, 15, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#d09233'; ctx.lineWidth = 2.5; ctx.stroke(); }
      shadow(p, 43 * zoom * 1.2, .22);
      ctx.strokeStyle = '#e0b568'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(p.x, p.y + 1, 20 * zoom, 7 * zoom, 0, 0, Math.PI * 2); ctx.stroke();
      var img = (hero.diag && sheet(diagSheet)) || sheet(avatarSheet); if (!img) return;
      var diag = hero.diag && img === sheets[diagSheet], q = img.width / 2, face = hero.face;
      if (hero.diag && !diag) face = ({ 0: 0, 1: 0, 2: 3, 3: 3 })[face];   // ななめの絵がないときは、前向き・左右の絵
      ctx.drawImage(img, (face % 2) * q, Math.floor(face / 2) * q, q, q, p.x - s / 2, p.y - s + 4 + bob, s, s);
    }

    function draw() {
      if (dead || !width || !baked || !ground) return;
      var st = opts.state(), hp = project(hero.x, hero.y);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, height);
      ctx.drawImage(back, 0, 0, width, height);
      var wt = water(), wz = Math.max(zoom, .75), tw = 256 * wz, th = 128 * wz, h0 = horizon(), ox = overview ? 0 : -((cam.x * T * zoom * .9) % tw), oy = overview ? 0 : -((cam.y * T * Y * zoom) % th);
      ctx.save(); ctx.beginPath(); ctx.rect(0, h0, width, height - h0); ctx.clip(); ctx.globalAlpha = .9;
      for (var wy = h0 + oy - th; wy < height; wy += th) for (var wx = ox - tw; wx < width; wx += tw) ctx.drawImage(wt, wx, wy, tw, th);
      ctx.restore();
      var p0 = project(-.5, -.5); ctx.drawImage(ground.canvas, p0.x - OX * zoom, p0.y - OY * zoom, ground.GW * zoom, ground.GH * zoom);
      // 動くもの・状態で変わるもの：主人公・焚き火・宝箱・ボス。足元の y 順に、立てた絵の間へ入れる
      var dyn = [{ y: hero.y, f: drawHero }, { y: PLACES.camp.y - .25, f: function () { drawProp(1, PLACES.camp.x + .65, PLACES.camp.y - .25, 66); } }];
      if (st && !st.chest) dyn.push({ y: PLACES.chest.y - .3, f: function () { drawProp(0, PLACES.chest.x, PLACES.chest.y - .3, 45); } });
      if (st && opts.boss && st.cleared.indexOf('boss') < 0) dyn.push({ y: opts.boss.y, f: function () { drawBoss(opts.boss.x, opts.boss.y); } });
      dyn.sort(function (a, b) { return a.y - b.y; });
      var di = 0;
      objects.forEach(function (o) { while (di < dyn.length && dyn[di].y <= o.y) dyn[di++].f(); drawObject(o, hp); });
      while (di < dyn.length) dyn[di++].f();
      Object.keys(opts.labels).forEach(function (k) { label(PLACES[k].x, PLACES[k].y, opts.labels[k]); });
      if (quality !== 'low') {
        var g = ctx.createLinearGradient(0, 0, width, height); g.addColorStop(0, 'rgba(255,240,190,.09)'); g.addColorStop(.6, 'rgba(255,240,190,0)'); g.addColorStop(1, 'rgba(49,94,125,.04)'); ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);
      }
    }
    function requestDraw() { if (pending || dead) return; pending = root.requestAnimationFrame(function () { pending = 0; draw(); }); }

    // タップ：地面の位置を、マスに直して返す
    var tap = null;
    canvas.addEventListener('pointerdown', function (e) { tap = { id: e.pointerId, x: e.clientX, y: e.clientY }; });
    canvas.addEventListener('pointerup', function (e) {
      if (!tap || tap.id !== e.pointerId) return; var t = tap; tap = null;
      if (Math.hypot(e.clientX - t.x, e.clientY - t.y) > 12) return;
      var r = canvas.getBoundingClientRect(), u = unproject(e.clientX - r.left, e.clientY - r.top), cx = Math.round(u.x), cy = Math.round(u.y);
      if (cy >= 0 && cy < MAP.length && cx >= 0 && cx < MAP[0].length) opts.onTap({ x: cx, y: cy });
    });
    canvas.addEventListener('pointercancel', function () { tap = null; });

    var api = {
      canvas: canvas,
      setHero: function (x, y) { hero.x = x; hero.y = y; followHero(); draw(); },
      face: function (facing, via) {
        if (via) { hero.diag = true; hero.face = (via.dy < 0 ? 2 : 0) + (via.dx > 0 ? 1 : 0); }
        else { hero.diag = false; hero.face = ({ down: 0, up: 1, left: 2, right: 3 })[facing] || 0; }
      },
      setWalking: function (b) { hero.walking = !!b; requestDraw(); },
      setQuality: function (q) { quality = q; resize(); },
      quality: function () { return quality; },
      requestDraw: requestDraw,
      project: project,
      destroy: function () { dead = true; if (ro) ro.disconnect(); if (pending) root.cancelAnimationFrame(pending); if (canvas.parentNode) canvas.parentNode.removeChild(canvas); if (current === api) current = null; }
    };
    current = api;
    if (root.ResizeObserver) { ro = new root.ResizeObserver(function () { if (!canvas.isConnected) { api.destroy(); return; } resize(); }); ro.observe(host); } else root.addEventListener('resize', resize);
    ensureImages().then(function () { if (!dead) { ground = groundFor(imgs, baked, MAP); bakeBack(); resize(); } });
    resize();
    return api;
  }

  FF.ui.fieldCanvas = { create: create, QUALITY: QUALITY, current: function () { return current; } };
})(this);
