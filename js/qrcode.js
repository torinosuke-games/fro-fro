// QR コードの作成（SPEC 14.5・DESIGN 14.6）。外部のライブラリ・サービスを使わない自作の1ファイル。純粋関数のみ。
// 規格（JIS X 0510 / ISO/IEC 18004）のうち、次だけを実装する：
// - バイトモード（文字列を UTF-8 にしたもの）。ECI は付けない
// - 誤り訂正レベル M、型番 1〜40（入る最小の型番を選ぶ）
// - マスクは 8 種類を試し、規格の失点計算がいちばん小さいものを選ぶ（opts.mask で指定もできる。テスト用）
// 使い方：FF.qrcode.encode(文字列) → { version, size, mask, modules: [[true/false, ...], ...] }（true が黒）
//         FF.qrcode.pathData(modules, margin) → SVG の path の d（黒いマスを行ごとにつないだ四角）
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  // ---- 誤り訂正レベル M の表（添字 = 型番。規格の表 9） ----
  // 1ブロックあたりの誤り訂正の符号語の数
  var EC_PER_BLOCK = [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26,
    26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28];
  // ブロックの数
  var NUM_BLOCKS = [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16,
    17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49];
  var FORMAT_EC_BITS = 0;   // レベル M の形式情報の2ビット（00）

  // ---- 文字列 → UTF-8 のバイト列 ----
  function utf8Bytes(str) {
    var out = [];
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c >= 0xD800 && c < 0xDC00 && i + 1 < str.length) {
        var d = str.charCodeAt(i + 1);
        if (d >= 0xDC00 && d < 0xE000) { c = 0x10000 + ((c - 0xD800) << 10) + (d - 0xDC00); i++; }
      }
      if (c >= 0xD800 && c < 0xE000) c = 0xFFFD;   // 対になっていないサロゲート
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xC0 | (c >> 6), 0x80 | (c & 63));
      else if (c < 0x10000) out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
      else out.push(0xF0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }

  // ---- 型番ごとの大きさ ----
  // データを置けるマスの数（位置検出・位置合わせ・タイミング・形式情報・型番情報を除いたもの）
  function rawDataModules(ver) {
    var n = (16 * ver + 128) * ver + 64;
    if (ver >= 2) {
      var align = Math.floor(ver / 7) + 2;
      n -= (25 * align - 10) * align - 55;
      if (ver >= 7) n -= 36;
    }
    return n;
  }
  function dataCodewords(ver) {
    return Math.floor(rawDataModules(ver) / 8) - EC_PER_BLOCK[ver] * NUM_BLOCKS[ver];
  }
  function countBits(ver) { return ver <= 9 ? 8 : 16; }   // バイトモードの文字数の長さ
  // 位置合わせパターンの中心の座標
  function alignmentPositions(ver) {
    if (ver === 1) return [];
    var num = Math.floor(ver / 7) + 2;
    var step = ver === 32 ? 26 : Math.ceil((ver * 4 + 4) / (num * 2 - 2)) * 2;
    var out = [6];
    for (var pos = ver * 4 + 10; out.length < num; pos -= step) out.splice(1, 0, pos);
    return out;
  }

  // ---- GF(256)（原始多項式 x^8 + x^4 + x^3 + x^2 + 1）とリード・ソロモン符号 ----
  function gfMul(x, y) {
    var z = 0;
    for (var i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11D);
      z ^= ((y >>> i) & 1) * x;
    }
    return z & 0xFF;
  }
  // 次数 n の生成多項式（最高次の係数 1 を除いた係数、高い次から）
  function rsDivisor(n) {
    var r = [];
    for (var i = 0; i < n - 1; i++) r.push(0);
    r.push(1);
    var rootVal = 1;
    for (var k = 0; k < n; k++) {
      for (var j = 0; j < n; j++) {
        r[j] = gfMul(r[j], rootVal);
        if (j + 1 < n) r[j] ^= r[j + 1];
      }
      rootVal = gfMul(rootVal, 0x02);
    }
    return r;
  }
  // データの符号語 → 誤り訂正の符号語
  function rsRemainder(data, divisor) {
    var r = divisor.map(function () { return 0; });
    data.forEach(function (b) {
      var factor = b ^ r.shift();
      r.push(0);
      for (var i = 0; i < r.length; i++) r[i] ^= gfMul(divisor[i], factor);
    });
    return r;
  }

  // データの符号語をブロックに分け、誤り訂正を付けて交互に並べる
  function addEccAndInterleave(data, ver) {
    var numBlocks = NUM_BLOCKS[ver], ecLen = EC_PER_BLOCK[ver];
    var raw = Math.floor(rawDataModules(ver) / 8);
    var numShort = numBlocks - raw % numBlocks;
    var shortLen = Math.floor(raw / numBlocks);
    var divisor = rsDivisor(ecLen);
    var blocks = [];
    for (var i = 0, k = 0; i < numBlocks; i++) {
      var dat = data.slice(k, k + shortLen - ecLen + (i < numShort ? 0 : 1));
      k += dat.length;
      var ecc = rsRemainder(dat, divisor);
      if (i < numShort) dat.push(0);   // 長いブロックとそろえるための仮の値（並べるときに飛ばす）
      blocks.push(dat.concat(ecc));
    }
    var out = [];
    for (var p = 0; p < blocks[0].length; p++) {
      for (var j = 0; j < blocks.length; j++) {
        if (p !== shortLen - ecLen || j >= numShort) out.push(blocks[j][p]);
      }
    }
    return out;
  }

  // ---- 符号語の並びを作る ----
  function makeCodewords(bytes, ver) {
    var bits = [];
    function put(val, len) { for (var i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); }
    put(0x4, 4);                                  // バイトモード
    put(bytes.length, countBits(ver));
    bytes.forEach(function (b) { put(b, 8); });
    var cap = dataCodewords(ver) * 8;
    put(0, Math.min(4, cap - bits.length));       // 終端パターン
    put(0, (8 - bits.length % 8) % 8);
    for (var pad = 0xEC; bits.length < cap; pad ^= 0xEC ^ 0x11) put(pad, 8);   // 埋め草 11101100・00010001
    var data = [];
    for (var i = 0; i < bits.length; i += 8) {
      var v = 0;
      for (var j = 0; j < 8; j++) v = (v << 1) | bits[i + j];
      data.push(v);
    }
    return addEccAndInterleave(data, ver);
  }

  // ---- マスの配置 ----
  function Grid(ver) {
    this.size = ver * 4 + 17;
    this.mod = [];
    this.fn = [];
    for (var y = 0; y < this.size; y++) {
      this.mod.push(new Array(this.size).fill(false));
      this.fn.push(new Array(this.size).fill(false));
    }
  }
  Grid.prototype.setFn = function (x, y, dark) { this.mod[y][x] = dark; this.fn[y][x] = true; };

  function drawFunctionPatterns(g, ver) {
    var size = g.size, i;
    for (i = 0; i < size; i++) { g.setFn(6, i, i % 2 === 0); g.setFn(i, 6, i % 2 === 0); }   // タイミングパターン
    [[3, 3], [size - 4, 3], [3, size - 4]].forEach(function (c) {                              // 位置検出パターンと分離パターン
      for (var dy = -4; dy <= 4; dy++) {
        for (var dx = -4; dx <= 4; dx++) {
          var d = Math.max(Math.abs(dx), Math.abs(dy)), x = c[0] + dx, y = c[1] + dy;
          if (x >= 0 && x < size && y >= 0 && y < size) g.setFn(x, y, d !== 2 && d !== 4);
        }
      }
    });
    var pos = alignmentPositions(ver), last = pos.length - 1;                                  // 位置合わせパターン
    for (var a = 0; a < pos.length; a++) {
      for (var b = 0; b < pos.length; b++) {
        if ((a === 0 && b === 0) || (a === 0 && b === last) || (a === last && b === 0)) continue;
        for (var dy2 = -2; dy2 <= 2; dy2++) {
          for (var dx2 = -2; dx2 <= 2; dx2++) g.setFn(pos[a] + dx2, pos[b] + dy2, Math.max(Math.abs(dx2), Math.abs(dy2)) !== 1);
        }
      }
    }
    drawFormatBits(g, 0);          // 形式情報の場所を確保する（マスクを決めたあとで描き直す）
    drawVersionBits(g, ver);
  }

  // 形式情報（15ビット、BCH(15,5) とマスク 101010000010010）
  function formatBits(mask) {
    var data = (FORMAT_EC_BITS << 3) | mask;
    var rem = data;
    for (var i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    return ((data << 10) | rem) ^ 0x5412;
  }
  function drawFormatBits(g, mask) {
    var bits = formatBits(mask), size = g.size, i;
    var bit = function (k) { return ((bits >>> k) & 1) !== 0; };
    for (i = 0; i <= 5; i++) g.setFn(8, i, bit(i));
    g.setFn(8, 7, bit(6));
    g.setFn(8, 8, bit(7));
    g.setFn(7, 8, bit(8));
    for (i = 9; i < 15; i++) g.setFn(14 - i, 8, bit(i));
    for (i = 0; i < 8; i++) g.setFn(size - 1 - i, 8, bit(i));
    for (i = 8; i < 15; i++) g.setFn(8, size - 15 + i, bit(i));
    g.setFn(8, size - 8, true);    // 常に黒いマス
  }
  // 型番情報（型番 7 以上。18ビット、BCH(18,6)）
  function versionBits(ver) {
    var rem = ver;
    for (var i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
    return (ver << 12) | rem;
  }
  function drawVersionBits(g, ver) {
    if (ver < 7) return;
    var bits = versionBits(ver);
    for (var i = 0; i < 18; i++) {
      var dark = ((bits >>> i) & 1) !== 0, a = g.size - 11 + i % 3, b = Math.floor(i / 3);
      g.setFn(a, b, dark);
      g.setFn(b, a, dark);
    }
  }

  // 符号語を右下から2列ずつ、上下にジグザグに置く
  function drawCodewords(g, data) {
    var size = g.size, i = 0;
    for (var right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;     // タイミングパターンの列を飛ばす
      for (var v = 0; v < size; v++) {
        for (var j = 0; j < 2; j++) {
          var x = right - j, upward = ((right + 1) & 2) === 0, y = upward ? size - 1 - v : v;
          if (!g.fn[y][x] && i < data.length * 8) {
            g.mod[y][x] = ((data[i >>> 3] >>> (7 - (i & 7))) & 1) !== 0;
            i++;
          }
        }
      }
    }
  }

  var MASKS = [
    function (x, y) { return (x + y) % 2 === 0; },
    function (x, y) { return y % 2 === 0; },
    function (x) { return x % 3 === 0; },
    function (x, y) { return (x + y) % 3 === 0; },
    function (x, y) { return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; },
    function (x, y) { return x * y % 2 + x * y % 3 === 0; },
    function (x, y) { return (x * y % 2 + x * y % 3) % 2 === 0; },
    function (x, y) { return ((x + y) % 2 + x * y % 3) % 2 === 0; }
  ];
  function applyMask(g, mask) {
    for (var y = 0; y < g.size; y++) {
      for (var x = 0; x < g.size; x++) if (!g.fn[y][x] && MASKS[mask](x, y)) g.mod[y][x] = !g.mod[y][x];
    }
  }

  // ---- 失点の計算（規格 7.8.3） ----
  function penalty(m) {
    var size = m.length, score = 0, x, y, dark = 0;
    // 同じ色が5つ以上続く行・列：3 ＋ (長さ − 5)
    function runs(get) {
      for (var a = 0; a < size; a++) {
        var len = 1;
        for (var b = 1; b <= size; b++) {
          if (b < size && get(a, b) === get(a, b - 1)) { len++; continue; }
          if (len >= 5) score += 3 + (len - 5);
          len = 1;
        }
      }
    }
    runs(function (a, b) { return m[a][b]; });
    runs(function (a, b) { return m[b][a]; });
    // 2×2 の同じ色：3
    for (y = 0; y < size - 1; y++) {
      for (x = 0; x < size - 1; x++) {
        var c = m[y][x];
        if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) score += 3;
      }
    }
    // 位置検出パターンに似た並び（暗:明:暗暗暗:明:暗 と、その片側に明4つ）：40
    var P1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0], P2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
    function finderLike(get) {
      for (var a = 0; a < size; a++) {
        for (var b = 0; b + 11 <= size; b++) {
          var ok1 = true, ok2 = true;
          for (var k = 0; k < 11; k++) {
            var v = get(a, b + k) ? 1 : 0;
            if (v !== P1[k]) ok1 = false;
            if (v !== P2[k]) ok2 = false;
          }
          if (ok1) score += 40;
          if (ok2) score += 40;
        }
      }
    }
    finderLike(function (a, b) { return m[a][b]; });
    finderLike(function (a, b) { return m[b][a]; });
    // 黒の割合が 50% から 5% 離れるごとに 10
    for (y = 0; y < size; y++) for (x = 0; x < size; x++) if (m[y][x]) dark++;
    var total = size * size;
    score += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
    return score;
  }

  // ---- 作成 ----
  function chooseVersion(byteLen) {
    for (var ver = 1; ver <= 40; ver++) {
      if (4 + countBits(ver) + byteLen * 8 <= dataCodewords(ver) * 8) return ver;
    }
    return null;
  }

  function encode(text, opts) {
    opts = opts || {};
    var bytes = utf8Bytes(String(text));
    var ver = chooseVersion(bytes.length);
    if (ver === null) throw new Error('QR コードに入りきらない長さです（' + bytes.length + ' バイト）');
    var g = new Grid(ver);
    drawFunctionPatterns(g, ver);
    drawCodewords(g, makeCodewords(bytes, ver));
    var mask = opts.mask;
    if (mask == null) {
      var best = Infinity;
      for (var k = 0; k < 8; k++) {
        applyMask(g, k);
        drawFormatBits(g, k);
        var p = penalty(g.mod);
        if (p < best) { best = p; mask = k; }
        applyMask(g, k);   // XOR なので、もう一度かけると元に戻る
      }
    }
    applyMask(g, mask);
    drawFormatBits(g, mask);
    return { version: ver, size: g.size, mask: mask, modules: g.mod };
  }

  // 黒いマスを行ごとにつないだ SVG の path（座標はマス単位。margin はまわりの白い余白のマスの数）
  function pathData(modules, margin) {
    margin = margin == null ? 4 : margin;
    var d = [];
    for (var y = 0; y < modules.length; y++) {
      var row = modules[y];
      for (var x = 0; x < row.length; x++) {
        if (!row[x]) continue;
        var start = x;
        while (x + 1 < row.length && row[x + 1]) x++;
        d.push('M' + (start + margin) + ' ' + (y + margin) + 'h' + (x - start + 1) + 'v1h-' + (x - start + 1) + 'z');
      }
    }
    return d.join('');
  }

  FF.qrcode = {
    encode: encode,
    pathData: pathData,
    // テスト用に中の関数も出しておく
    _internal: {
      utf8Bytes: utf8Bytes, rawDataModules: rawDataModules, dataCodewords: dataCodewords, alignmentPositions: alignmentPositions,
      rsDivisor: rsDivisor, rsRemainder: rsRemainder, formatBits: formatBits, versionBits: versionBits,
      chooseVersion: chooseVersion, penalty: penalty, makeCodewords: makeCodewords
    }
  };
})(this);
