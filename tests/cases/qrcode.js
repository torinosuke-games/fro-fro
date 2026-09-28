// QR コード（SPEC 14.5・19、DESIGN 14.6）。js/qrcode.js で作ったものを、テスト専用の読み取り処理（tests/lib/qrdecode.js）で元に戻す。
const QD = require('../lib/qrdecode');

module.exports = ({ test, FF, assert, plain }) => {
  const Q = FF.qrcode;
  const I = Q._internal;
  const T0 = 1790000000000;
  const rng = FF.util.makeRng(2026);

  // 型番 v の上限ちょうどのバイト数（バイトモード・レベル M）
  const capacity = v => Math.floor((I.dataCodewords(v) * 8 - 4 - (v <= 9 ? 8 : 16)) / 8);
  const ascii = n => { let s = ''; while (s.length < n) s += String.fromCharCode(33 + Math.floor(rng() * 90)); return s; };
  const roundTrip = (text, opts) => {
    const q = Q.encode(text, opts);
    const d = QD.decode(plain(q.modules));
    assert.strictEqual(d.text, text);
    assert.strictEqual(d.version, q.version);
    assert.strictEqual(d.mask, q.mask);
    return q;
  };

  test('リード・ソロモン符号：「HELLO WORLD」型番 1-M の例と同じ誤り訂正の符号語になる', () => {
    const data = [32, 91, 11, 120, 209, 114, 220, 77, 67, 64, 236, 17, 236, 17, 236, 17];
    assert.deepStrictEqual(plain(I.rsRemainder(data, I.rsDivisor(10))), [196, 35, 39, 119, 235, 215, 231, 226, 93, 23]);
  });

  test('形式情報（レベル M、マスク 0〜7）と型番情報（型番 7・40）が規格の表と同じ', () => {
    const M = ['101010000010010', '101000100100101', '101111001111100', '101101101001011',
      '100010111111001', '100000011001110', '100111110010111', '100101010100000'];
    for (let k = 0; k < 8; k++) {
      assert.strictEqual(I.formatBits(k), parseInt(M[k], 2), 'マスク ' + k);
      assert.strictEqual(I.formatBits(k), QD.formatCode('M', k), 'マスク ' + k);
    }
    assert.strictEqual(I.versionBits(7), parseInt('000111110010010100', 2));
    assert.strictEqual(I.versionBits(40), parseInt('101000110001101001', 2));
    for (let v = 7; v <= 40; v++) assert.strictEqual(I.versionBits(v), QD.versionCode(v), '型番 ' + v);
  });

  test('位置合わせパターンの座標とブロックの分け方が、型番 1〜40 のすべてで規格の表と同じ', () => {
    for (let v = 1; v <= 40; v++) {
      assert.deepStrictEqual(plain(I.alignmentPositions(v)), QD.ALIGN[v], '型番 ' + v);
      const [ecLen, nb] = QD.EC_M[v];
      assert.strictEqual(Math.floor(I.rawDataModules(v) / 8) - I.dataCodewords(v), ecLen * nb, '型番 ' + v);
    }
    // バイトモードで入る文字数（規格の表 7 のレベル M）
    assert.strictEqual(capacity(1), 14);
    assert.strictEqual(capacity(5), 84);
    assert.strictEqual(capacity(10), 213);
    assert.strictEqual(capacity(40), 2331);
  });

  test('型番 1〜40 のそれぞれの上限の長さで作り、元の文字列に戻る（1バイト増えると次の型番）', () => {
    for (let v = 1; v <= 40; v++) {
      const text = ascii(capacity(v));
      assert.strictEqual(roundTrip(text).version, v, '型番 ' + v);
      if (v < 40) assert.strictEqual(Q.encode(text + 'x').version, v + 1, '型番 ' + v + ' ＋1バイト');
    }
  });

  test('8種類のマスクのどれを指定しても、元の文字列に戻る', () => {
    for (const text of ['a', 'FROZEN FRONTIER', ascii(300), 'あいうえお😀⛄']) {
      for (let k = 0; k < 8; k++) assert.strictEqual(roundTrip(text, { mask: k }).mask, k);
    }
  });

  test('日本語・絵文字・改行を含む文字列が、UTF-8 のまま元に戻る', () => {
    const texts = ['引換券', 'なまえ: ユキ⛄', '😀😀😀', 'é ñ ü', 'a\nb\r\nc', '1時間30分', ' ', '𠮷野家'];
    const chars = [...'あいうカナ漢字引換券時間😀⛄é-: /\n0Aa'];
    for (let n = 0; n < 60; n++) {
      let s = '';
      const len = 1 + Math.floor(rng() * 120);
      for (let k = 0; k < len; k++) s += chars[Math.floor(rng() * chars.length)];
      texts.push(s);
    }
    for (const t of texts) roundTrip(t);
    // UTF-8 のバイト列が Node の Buffer と同じ
    for (const t of texts) assert.deepStrictEqual(plain(I.utf8Bytes(t)), [...Buffer.from(t, 'utf8')], t);
    // 対になっていないサロゲートは U+FFFD
    assert.deepStrictEqual(plain(I.utf8Bytes('a\uD800b')), [0x61, 0xEF, 0xBF, 0xBD, 0x62]);
  });

  test('引換券の文字列（名前 12 文字の絵文字でも）が型番 10 以下に入り、元に戻る', () => {
    const s = FF.state.createDefaultState(T0);
    const entry = { id: 'K7QX-3M9P', issuedAt: T0, points: 99000, minutes: 1980, pointsPerHour: 3000, method: 'print' };
    for (const name of ['たろう', 'プレイヤー', '😀😀😀😀😀😀😀😀😀😀😀😀', '𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷', 'ABCDEFGHIJKL']) {
      s.player.name = name;
      const text = FF.points.qrText(s, entry);
      const q = roundTrip(text);
      assert.ok(q.version <= 10, `${name}：型番 ${q.version}`);
    }
  });

  test('マスクを指定しないときは、失点がいちばん小さいマスクを選ぶ', () => {
    for (const text of ['a', 'FROZEN FRONTIER 引換券', ascii(200)]) {
      const auto = Q.encode(text);
      const scores = [0, 1, 2, 3, 4, 5, 6, 7].map(k => I.penalty(Q.encode(text, { mask: k }).modules));
      assert.strictEqual(scores[auto.mask], Math.min(...scores), text);
      assert.strictEqual(scores.indexOf(Math.min(...scores)), auto.mask, '同点なら小さい番号');
    }
  });

  test('テスト用の読み取り処理は、マスが1つでもちがうと読み取りを失敗にする（検査が働いている）', () => {
    const q = Q.encode('FROZEN FRONTIER 引換券\nID: K7QX-3M9P');
    const base = plain(q.modules);
    let tried = 0;
    for (let y = 0; y < q.size; y++) {
      for (let x = 0; x < q.size; x++) {
        if ((x * 7 + y * 3) % 5 !== 0) continue;   // 全体に散らばるように5つに1つ
        const m = base.map(r => r.slice());
        m[y][x] = !m[y][x];
        assert.throws(() => QD.decode(m), Error, `(${x}, ${y}) を反転しても読めてしまう`);
        tried++;
      }
    }
    assert.ok(tried > 150);
  });

  test('QR コードと引換所は外部と通信しない（fetch・XMLHttpRequest・外部の URL・import を使わない）', () => {
    const fs = require('fs'), path = require('path');
    const ROOT = path.join(__dirname, '..', '..');
    for (const f of ['js/qrcode.js', 'js/points.js', 'js/ui/redeem.js']) {
      const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
      assert.ok(!/\bfetch\s*\(|XMLHttpRequest|https?:\/\/|\bimport\s*\(|\bimport\s+[\w{*]|WebSocket|sendBeacon/.test(src), f);
    }
    // 読み込みは index.html の <script> だけで、外部のファイルを読まない
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    assert.ok(/<script src="js\/qrcode\.js"><\/script>/.test(html));
    // 外部の URL は Google Fonts（フォントのスタイルシートと接続の準備）だけ。スクリプトは外部から読まない（判断175）
    const ext = html.match(/(src|href)="(https?:)?\/\/[^"]*"/g) || [];
    for (const m of ext) assert.ok(/^href="https:\/\/fonts\.(googleapis|gstatic)\.com(\/|")/.test(m), 'index.html の外部の URL は Google Fonts だけ：' + m);
    assert.ok(!/<script[^>]+src="(https?:)?\/\//.test(html), 'index.html は外部のスクリプトを読まない');
  });

  test('入りきらない長さはエラーにする', () => {
    assert.throws(() => Q.encode(ascii(2332)), /入りきらない/);
  });

  test('SVG の path：黒いマスの数と面積が同じで、余白の分だけずれる', () => {
    const q = Q.encode('FROZEN FRONTIER');
    const dark = q.modules.reduce((a, row) => a + row.filter(Boolean).length, 0);
    const d = Q.pathData(q.modules, 4);
    let area = 0;
    for (const m of d.matchAll(/M(\d+) (\d+)h(\d+)v1h-(\d+)z/g)) {
      assert.strictEqual(m[3], m[4]);
      area += Number(m[3]);
      assert.ok(Number(m[1]) >= 4 && Number(m[2]) >= 4 && Number(m[1]) + Number(m[3]) <= q.size + 4 && Number(m[2]) < q.size + 4);
    }
    assert.strictEqual(area, dark);
    assert.ok(d.startsWith('M4 4h7'), '左上の位置検出パターンの1行目（黒7マス）から始まる');
  });
};
