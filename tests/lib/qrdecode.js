// テスト専用の QR コードの読み取り処理（DESIGN 14.6）。js/qrcode.js のコードは使わず、規格の表と手順から独立に書く。
// 読み取れないときは Error を投げる。誤りの訂正はしない（作ったばかりの QR コードは誤りが 0 のはずなので、検査だけする）。
'use strict';

// 位置合わせパターンの中心の座標（規格の附属書 E の表をそのまま）
const ALIGN = [null, [],
  [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62],
  [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90],
  [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]
];

// 誤り訂正レベル M：[1ブロックの誤り訂正の符号語の数, ブロックの数]（規格の表 9）
const EC_M = [null,
  [10, 1], [16, 1], [26, 1], [18, 2], [24, 2], [16, 4], [18, 4], [22, 4], [22, 5], [26, 5],
  [30, 5], [22, 8], [22, 9], [24, 9], [24, 10], [28, 10], [28, 11], [26, 13], [26, 14], [26, 16],
  [26, 17], [28, 17], [28, 18], [28, 20], [28, 21], [28, 23], [28, 25], [28, 26], [28, 28], [28, 29],
  [28, 31], [28, 33], [28, 35], [28, 37], [28, 38], [28, 40], [28, 43], [28, 45], [28, 47], [28, 49]
];

const EC_LEVEL_BITS = { L: 1, M: 0, Q: 3, H: 2 };

// マスクの条件（規格の表 10。i は行、j は列）
const MASK = [
  (i, j) => (i + j) % 2 === 0,
  (i) => i % 2 === 0,
  (i, j) => j % 3 === 0,
  (i, j) => (i + j) % 3 === 0,
  (i, j) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0,
  (i, j) => ((i * j) % 2) + ((i * j) % 3) === 0,
  (i, j) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0,
  (i, j) => (((i * j) % 3) + ((i + j) % 2)) % 2 === 0
];

// ---- BCH 符号 ----
function polyRemainder(value, gen, genDeg) {
  let v = value;
  for (let bit = 31; bit >= genDeg; bit--) if ((v >>> bit) & 1) v ^= gen << (bit - genDeg);
  return v;
}
// 形式情報の 15 ビット（誤り訂正レベルとマスクから）
function formatCode(level, mask) {
  const data = (EC_LEVEL_BITS[level] << 3) | mask;
  return ((data << 10) | polyRemainder(data << 10, 0b10100110111, 10)) ^ 0b101010000010010;
}
// 型番情報の 18 ビット
function versionCode(ver) {
  return (ver << 12) | polyRemainder(ver << 12, 0b1111100100101, 12);
}

// ---- GF(256) の指数と対数の表 ----
const EXP = new Array(512), LOG = new Array(256);
(function () {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x; LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11D;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();
function mul(a, b) { return a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]; }
// ブロック（データ＋誤り訂正、高い次から）のシンドローム。誤りがなければすべて 0
function syndromes(block, ecLen) {
  const out = [];
  for (let j = 0; j < ecLen; j++) {
    let s = 0;
    for (const c of block) s = mul(s, EXP[j]) ^ c;
    out.push(s);
  }
  return out;
}

function decode(m) {
  const size = m.length;
  const dark = (row, col) => !!m[row][col];
  const ver = (size - 17) / 4;
  if (!Number.isInteger(ver) || ver < 1 || ver > 40) throw new Error('大きさが QR コードの型番に合わない: ' + size);
  for (const r of m) if (r.length !== size) throw new Error('正方形でない');

  // 位置検出パターン（7×7）と分離パターン
  for (const [r0, c0] of [[0, 0], [0, size - 7], [size - 7, 0]]) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r, cc = c0 + c;
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
        const inside = r >= 0 && r <= 6 && c >= 0 && c <= 6;
        const want = inside && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        if (dark(rr, cc) !== want) throw new Error(`位置検出パターンの形がちがう (${rr}, ${cc})`);
      }
    }
  }
  // タイミングパターン
  for (let k = 8; k < size - 8; k++) {
    if (dark(6, k) !== (k % 2 === 0) || dark(k, 6) !== (k % 2 === 0)) throw new Error('タイミングパターンがちがう ' + k);
  }
  if (!dark(size - 8, 8)) throw new Error('左下の黒いマスがない');

  // 機能パターンの場所
  const fn = Array.from({ length: size }, () => new Array(size).fill(false));
  const mark = (r, c) => { fn[r][c] = true; };
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if ((r < 9 && c < 9) || (r < 9 && c >= size - 8) || (r >= size - 8 && c < 9) || r === 6 || c === 6) mark(r, c);
    }
  }
  const pos = ALIGN[ver];
  for (const r0 of pos) {
    for (const c0 of pos) {
      if ((r0 === 6 && c0 === 6) || (r0 === 6 && c0 === pos[pos.length - 1]) || (r0 === pos[pos.length - 1] && c0 === 6)) continue;
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const want = Math.max(Math.abs(r), Math.abs(c)) !== 1;
          if (dark(r0 + r, c0 + c) !== want) throw new Error(`位置合わせパターンの形がちがう (${r0}, ${c0})`);
          mark(r0 + r, c0 + c);
        }
      }
    }
  }
  if (ver >= 7) {
    // 型番情報：右上（6行 × 3列）と左下（3行 × 6列）。下位のビットから
    let a = 0, b = 0;
    for (let k = 0; k < 18; k++) {
      const r = Math.floor(k / 3), c = size - 11 + (k % 3);
      if (dark(r, c)) a |= 1 << k;
      if (dark(c, r)) b |= 1 << k;
      mark(r, c); mark(c, r);
    }
    if (a !== versionCode(ver) || b !== versionCode(ver)) throw new Error('型番情報がちがう');
  }

  // 形式情報（2か所。下位のビットから）
  const COPY1 = [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8], [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0]];
  const COPY2 = [];
  for (let k = 0; k < 8; k++) COPY2.push([8, size - 1 - k]);
  for (let k = 8; k < 15; k++) COPY2.push([size - 15 + k, 8]);
  const readFormat = list => list.reduce((v, [r, c], k) => v | ((dark(r, c) ? 1 : 0) << k), 0);
  const f1 = readFormat(COPY1), f2 = readFormat(COPY2);
  if (f1 !== f2) throw new Error('形式情報の2か所が一致しない');
  let level = null, mask = null;
  for (const L of Object.keys(EC_LEVEL_BITS)) for (let k = 0; k < 8; k++) if (formatCode(L, k) === f1) { level = L; mask = k; }
  if (level === null) throw new Error('形式情報が BCH 符号になっていない');
  if (level !== 'M') throw new Error('誤り訂正レベルが M でない: ' + level);

  // データのビットを右下から2列ずつジグザグに読み、マスクを外す
  const bits = [];
  let upward = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col = 5;
    for (let k = 0; k < size; k++) {
      const r = upward ? size - 1 - k : k;
      for (const c of [col, col - 1]) {
        if (fn[r][c]) continue;
        bits.push(dark(r, c) !== MASK[mask](r, c) ? 1 : 0);
      }
    }
    upward = !upward;
  }
  const total = Math.floor(bits.length / 8);
  const cw = [];
  for (let k = 0; k < total; k++) {
    let v = 0;
    for (let b = 0; b < 8; b++) v = (v << 1) | bits[k * 8 + b];
    cw.push(v);
  }
  // 余りのビットは 0（規格では明るいマスのまま。マスクを外すと 0 に戻る）
  for (let k = total * 8; k < bits.length; k++) if (bits[k] !== 0) throw new Error('余りのビットが 0 でない');

  // ブロックに戻す（短いブロックが先、長いブロックはデータが1つ多い）
  const [ecLen, nb] = EC_M[ver];
  const longCount = total % nb, shortTotal = Math.floor(total / nb);
  const dataLens = [];
  for (let k = 0; k < nb; k++) dataLens.push(shortTotal - ecLen + (k >= nb - longCount ? 1 : 0));
  const blocks = dataLens.map(() => []);
  let p = 0;
  for (let i = 0; i < Math.max(...dataLens); i++) for (let k = 0; k < nb; k++) if (i < dataLens[k]) blocks[k].push(cw[p++]);
  for (let i = 0; i < ecLen; i++) for (let k = 0; k < nb; k++) blocks[k].push(cw[p++]);
  if (p !== total) throw new Error('符号語の数が合わない');
  const data = [];
  blocks.forEach((blk, k) => {
    if (syndromes(blk, ecLen).some(s => s !== 0)) throw new Error('リード・ソロモンの検査で誤りがある（ブロック ' + k + '）');
    data.push(...blk.slice(0, dataLens[k]));
  });

  // バイトモードの中身を取り出す
  const stream = [];
  for (const b of data) for (let k = 7; k >= 0; k--) stream.push((b >>> k) & 1);
  let q = 0;
  const take = n => { let v = 0; for (let k = 0; k < n; k++) v = (v << 1) | stream[q++]; return v; };
  const mode = take(4);
  if (mode !== 0b0100) throw new Error('バイトモードでない: ' + mode);
  const count = take(ver <= 9 ? 8 : 16);
  const bytes = [];
  for (let k = 0; k < count; k++) bytes.push(take(8));
  if (q > stream.length) throw new Error('データが足りない');
  // 終端パターン（最大4ビットの 0）と、バイトの区切りまでの 0、埋め草 0xEC・0x11 のくり返し
  const term = Math.min(4, stream.length - q);
  if (take(term) !== 0) throw new Error('終端パターンが 0 でない');
  while (q % 8 !== 0) if (stream[q++] !== 0) throw new Error('区切りの 0 がない');
  for (let pad = 0xEC; q < stream.length; pad ^= 0xEC ^ 0x11) if (take(8) !== pad) throw new Error('埋め草がちがう');

  return { version: ver, level, mask, bytes, text: Buffer.from(bytes).toString('utf8'), dataCodewords: data.length };
}

module.exports = { decode, ALIGN, EC_M, formatCode, versionCode };
