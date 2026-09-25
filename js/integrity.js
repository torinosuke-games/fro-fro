// セーブデータの改ざん検出（SPEC_save_integrity.md）。純粋関数のみ。
// 目的は「書き出したテキストの数値をメモ帳で書き換えて読み込ませる」程度の改ざんを見つけること。
// SALT は配信される JS に含まれるので、ソースを読める人には見える前提（暗号学的な強度は求めない）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var SALT = 'FROZEN-FRONTIER/save/7c1e-snowfield-hearth';
  var FIELD = 'integrity';

  // cyrb53：乗算とビットシフトを組み合わせた軽量な 53bit のハッシュ（1文字変わればほぼ確実に別の値）
  function cyrb53(str, seed) {
    var h1 = 0xdeadbeef ^ (seed || 0), h2 = 0x41c6ce57 ^ (seed || 0);
    for (var i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }

  // 文字列の指紋（16進 14 桁）
  function hash(str) {
    var n = cyrb53(SALT + '|' + String(str));
    var hex = n.toString(16);
    while (hex.length < 14) hex = '0' + hex;
    return hex;
  }

  // キーを並べ替えた JSON（オブジェクトのキーの順番に左右されない文字列にする）。
  // いったん JSON を通してから並べるので、undefined や NaN の扱いは保存される JSON と同じになる。
  function canonical(value) {
    return stringifySorted(JSON.parse(JSON.stringify(value === undefined ? null : value)));
  }
  function stringifySorted(v) {
    if (Array.isArray(v)) return '[' + v.map(stringifySorted).join(',') + ']';
    if (v !== null && typeof v === 'object') {
      return '{' + Object.keys(v).sort().map(function (k) { return JSON.stringify(k) + ':' + stringifySorted(v[k]); }).join(',') + '}';
    }
    return JSON.stringify(v);
  }

  // integrity を除いた本体
  function withoutField(data) {
    var body = {};
    for (var k in data) if (Object.prototype.hasOwnProperty.call(data, k) && k !== FIELD) body[k] = data[k];
    return body;
  }

  // 本体（integrity を含んでいても取り除いて計算する）の指紋
  function sign(dataWithoutIntegrity) {
    return hash(canonical(withoutField(dataWithoutIntegrity)));
  }

  // integrity が本体の指紋と一致すれば true（integrity がない・文字列でない場合は false）
  function verify(dataWithIntegrityField) {
    if (!dataWithIntegrityField || typeof dataWithIntegrityField !== 'object') return false;
    var got = dataWithIntegrityField[FIELD];
    return typeof got === 'string' && got === sign(dataWithIntegrityField);
  }

  function hasField(data) {
    return !!data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, FIELD);
  }

  FF.integrity = {
    SALT: SALT,
    FIELD: FIELD,
    hash: hash,
    canonical: canonical,
    withoutField: withoutField,
    sign: sign,
    verify: verify,
    hasField: hasField
  };
})(this);
