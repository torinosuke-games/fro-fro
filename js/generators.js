// 算数・数学の問題の自動生成（SPEC 10.2）。純粋関数のみ（乱数は引数で受け取る）。
//
// - GEN_CONFIG[学年][難易度] に、出題する問題の種類（op）と数値の範囲（p）を並べる。
// - 生成した問題は SPEC 10.1 と同じ構造。ヒント3段階と解説も自動で付ける。
// - ID は数値から決まる（同じ問題が再び出たとき反復倍率が効くように）。4択と自由入力で同じ ID になる。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  // ---- 数値の道具 ----
  function ri(rng, min, max) { return min + Math.floor(rng() * (max - min + 1)); }
  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function lcm(a, b) { return a / gcd(a, b) * b; }
  function nz(rng, min, max) { var v; do { v = ri(rng, min, max); } while (v === 0); return v; }

  // 分数 { n, d }（d > 0、約分済み）
  function frac(n, d) {
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d) || 1;
    return { n: n / g, d: d / g };
  }
  function fadd(x, y) { return frac(x.n * y.d + y.n * x.d, x.d * y.d); }
  function fsub(x, y) { return frac(x.n * y.d - y.n * x.d, x.d * y.d); }
  function fmul(x, y) { return frac(x.n * y.n, x.d * y.d); }
  function fdiv(x, y) { return frac(x.n * y.d, x.d * y.n); }
  function fstr(f) { return f.d === 1 ? String(f.n) : f.n + '/' + f.d; }
  // 帯分数の表記（仮分数のときだけ）
  function fmixed(f) {
    if (f.d === 1 || Math.abs(f.n) < f.d || f.n < 0) return [];
    var w = Math.floor(f.n / f.d), r = f.n % f.d;
    return [w + 'と' + r + '/' + f.d, w + ' ' + r + '/' + f.d];
  }

  // 整数 v を 10^places で割った小数の文字列（末尾の0は消す）
  function dec(v, places) {
    var neg = v < 0; v = Math.abs(v);
    var s = String(v);
    if (places > 0) {
      while (s.length <= places) s = '0' + s;
      s = s.slice(0, s.length - places) + '.' + s.slice(s.length - places);
      s = s.replace(/0+$/, '').replace(/\.$/, '');
    }
    return (neg ? '-' : '') + s;
  }
  function pow10(n) { return Math.pow(10, n); }

  // 式の中の数：負の数はかっこで囲む
  function p(n) { return n < 0 ? '(' + n + ')' : String(n); }
  // 係数つきの項（1x → x、-1x → -x）
  function term(coef, v, first) {
    var sign = coef < 0 ? (first ? '-' : ' − ') : (first ? '' : ' + ');
    var abs = Math.abs(coef);
    return sign + (abs === 1 && v ? '' : abs) + (v || '');
  }

  function hasCarry(a, b) {
    while (a > 0 || b > 0) { if (a % 10 + b % 10 >= 10) return true; a = Math.floor(a / 10); b = Math.floor(b / 10); }
    return false;
  }
  function hasBorrow(a, b) {
    while (b > 0) { if (a % 10 < b % 10) return true; a = Math.floor(a / 10); b = Math.floor(b / 10); }
    return false;
  }
  function digitwise(a, b, fn) {
    var r = 0, m = 1;
    while (a > 0 || b > 0) { r += fn(a % 10, b % 10) * m; a = Math.floor(a / 10); b = Math.floor(b / 10); m *= 10; }
    return r;
  }

  // ---- 問題の種類 ----
  // 各関数は { key, text, answer, mode, accepted, hints, explanation, distractors, meta } を返す
  var OPS = {};

  OPS.add = function (rng, P) {
    var a, b;
    for (var i = 0; i < 500; i++) {
      a = ri(rng, P.a[0], P.a[1]); b = ri(rng, P.b[0], P.b[1]);
      if (P.maxSum && a + b > P.maxSum) continue;
      if (P.carry === 'yes' && !hasCarry(a, b)) continue;
      if (P.carry === 'no' && hasCarry(a, b)) continue;
      break;
    }
    var s = a + b, hints;
    if (a < 10 && b < 10) {
      hints = s > 10
        ? [a + ' は あと ' + (10 - a) + ' で 10 に なるよ', b + ' を ' + (10 - a) + ' と ' + (b - (10 - a)) + ' に わけて みよう', '10 と ' + (b - (10 - a)) + ' を あわせよう']
        : [a + ' から ' + b + ' こ かぞえて みよう', 'ゆびや ●を つかって かぞえても いいよ', a + ' の つぎから ' + b + ' かい かぞえよう'];
    } else {
      hints = ['一の位どうしを たそう（' + (a % 10) + ' + ' + (b % 10) + '）', '10 を こえたら、上の位に 1 くり上げよう', '十の位・百の位も 同じように たそう（くり上がりを わすれずに）'];
    }
    return {
      key: [a, b], text: a + ' + ' + b + ' = □', answer: String(s), mode: 'number', hints: hints,
      explanation: a + ' + ' + b + ' = ' + s + '。位ごとに たして、10 を こえたら 上の位に くり上げます。',
      distractors: [s + 1, s - 1, s + 10, s - 10, digitwise(a, b, function (x, y) { return (x + y) % 10; })].map(String),
      meta: { op: 'add', a: a, b: b }
    };
  };

  OPS.sub = function (rng, P) {
    var a, b;
    for (var i = 0; i < 500; i++) {
      a = ri(rng, P.a[0], P.a[1]); b = ri(rng, P.b[0], P.b[1]);
      if (b > a) { var t = a; a = b; b = t; }
      if (P.borrow === 'yes' && !hasBorrow(a, b)) continue;
      if (P.borrow === 'no' && hasBorrow(a, b)) continue;
      break;
    }
    var d = a - b, hints;
    if (a <= 20 && b < 10) {
      hints = a > 10 && a % 10 < b
        ? [a + ' を 10 と ' + (a - 10) + ' に わけて みよう', '10 から ' + b + ' を ひくと いくつ？', 'のこりと ' + (a - 10) + ' を あわせよう']
        : [a + ' から ' + b + ' こ もどって みよう', 'ゆびや ●を つかって かぞえても いいよ', a + ' から 1 ずつ ' + b + ' かい へらそう'];
    } else {
      hints = ['一の位どうしを ひこう（' + (a % 10) + ' − ' + (b % 10) + '）', 'ひけない ときは、上の位から 10 を かりて こよう', '十の位・百の位も 同じように ひこう（かりた 1 を わすれずに）'];
    }
    return {
      key: [a, b], text: a + ' − ' + b + ' = □', answer: String(d), mode: 'number', hints: hints,
      explanation: a + ' − ' + b + ' = ' + d + '。位ごとに ひいて、ひけない ときは 上の位から 10 を かります。',
      distractors: [d + 1, d - 1, d + 10, d - 10, digitwise(a, b, function (x, y) { return Math.abs(x - y); })].filter(function (v) { return v >= 0; }).map(String),
      meta: { op: 'sub', a: a, b: b }
    };
  };

  OPS.add3 = function (rng, P) {
    var a, b, c, o1, o2, mid, r;
    for (var i = 0; i < 500; i++) {
      a = ri(rng, 1, P.max); b = ri(rng, 1, 9); c = ri(rng, 1, 9);
      o1 = pick(rng, ['+', '−']); o2 = pick(rng, ['+', '−']);
      mid = o1 === '+' ? a + b : a - b;
      r = o2 === '+' ? mid + c : mid - c;
      if (mid >= 0 && mid <= P.max && r >= 0 && r <= P.max) break;
    }
    return {
      key: [a, o1 === '+' ? 'p' : 'm', b, o2 === '+' ? 'p' : 'm', c],
      text: a + ' ' + o1 + ' ' + b + ' ' + o2 + ' ' + c + ' = □', answer: String(r), mode: 'number',
      hints: ['左から じゅんに 計算しよう', 'まず ' + a + ' ' + o1 + ' ' + b + ' を 計算しよう', 'その 答えに ' + c + ' を ' + (o2 === '+' ? 'たそう' : 'ひこう')],
      explanation: a + ' ' + o1 + ' ' + b + ' = ' + mid + '、' + mid + ' ' + o2 + ' ' + c + ' = ' + r + ' です。',
      distractors: [r + 1, r - 1, r + 2, r - 2, o2 === '+' ? mid - c : mid + c].filter(function (v) { return v >= 0; }).map(String),
      meta: { op: 'add3', a: a, b: b, c: c, o1: o1, o2: o2 }
    };
  };

  OPS.mul = function (rng, P) {
    var a = ri(rng, P.a[0], P.a[1]), b = ri(rng, P.b[0], P.b[1]), m = a * b, hints;
    if (a < 10 && b < 10) {
      hints = [a + ' の だんの 九九を 思い出そう', a + ' × ' + b + ' は ' + a + ' を ' + b + ' 回 たした 数', b >= 2 ? a + ' × ' + (b - 1) + ' = ' + a * (b - 1) + ' に ' + a + ' を たそう' : 'どんな 数に 1 を かけても、その 数の まま'];
    } else if (b < 10) {
      var t = Math.floor(a / 10) * 10, o = a % 10;
      hints = [a + ' を ' + t + ' と ' + o + ' に 分けよう', t + ' × ' + b + ' と ' + o + ' × ' + b + ' を それぞれ 計算しよう', '2つの 答えを たそう'];
    } else {
      var bt = Math.floor(b / 10) * 10, bo = b % 10;
      hints = [b + ' を ' + bt + ' と ' + bo + ' に 分けよう', a + ' × ' + bt + ' と ' + a + ' × ' + bo + ' を 計算しよう', '2つの 答えを たそう（筆算でも いいよ）'];
    }
    return {
      key: [a, b], text: a + ' × ' + b + ' = □', answer: String(m), mode: 'number', hints: hints,
      explanation: a + ' × ' + b + ' = ' + m + ' です。',
      distractors: [m + a, m - a, m + b, m - b, m + 10, m - 10].filter(function (v) { return v >= 0; }).map(String),
      meta: { op: 'mul', a: a, b: b }
    };
  };

  OPS.div = function (rng, P) {
    var b = ri(rng, P.b[0], P.b[1]), q = ri(rng, P.q[0], P.q[1]), a = b * q, hints;
    if (q < 10 && b >= 10) {
      hints = [b + ' を およそ ' + Math.round(b / 10) * 10 + ' と 考えて、答えの 見当を つけよう', b + ' × □ が ' + a + ' に なる □ を さがそう', '見当を つけた 数を ' + b + ' に かけて 確かめよう'];
    } else if (q < 10) {
      hints = [b + ' × □ = ' + a + ' の □ を 考えよう', b + ' の だんの 九九を となえよう', '九九の 答えが ' + a + ' に なる ところを さがそう'];
    } else {
      var t = Math.floor(q / 10) * 10;
      hints = [b + ' × ' + t + ' を 考えて みよう', a + ' から ' + b * t + ' を ひいて みよう', '残った ' + (a - b * t) + ' を ' + b + ' で わろう'];
    }
    return {
      key: [a, b], text: a + ' ÷ ' + b + ' = □', answer: String(q), mode: 'number', hints: hints,
      explanation: b + ' × ' + q + ' = ' + a + ' なので、' + a + ' ÷ ' + b + ' = ' + q + ' です。',
      distractors: [q + 1, q - 1, q + 10, q - 10, q * 10].filter(function (v) { return v > 0; }).map(String),
      meta: { op: 'div', a: a, b: b }
    };
  };

  OPS.divrem = function (rng, P) {
    var b = ri(rng, P.b[0], P.b[1]), q = ri(rng, P.q[0], P.q[1]), r = ri(rng, 1, b - 1), a = b * q + r;
    return {
      key: [a, b], text: a + ' ÷ ' + b + ' の あまりは いくつ？', answer: String(r), mode: 'number',
      hints: [b + ' × □ が ' + a + ' を こえない、いちばん 大きい □ を さがそう', '見つけた 数を ' + b + ' に かけて、' + a + ' から ひこう', 'あまりは ' + b + ' より 小さく なるよ'],
      explanation: a + ' ÷ ' + b + ' = ' + q + ' あまり ' + r + '（' + b + ' × ' + q + ' + ' + r + ' = ' + a + '）です。',
      distractors: [q, r + 1, r - 1, b - r, r + b].filter(function (v) { return v >= 0; }).map(String),
      meta: { op: 'divrem', a: a, b: b }
    };
  };

  OPS.dec_add = function (rng, P) { return decAddSub(rng, P, '+'); };
  OPS.dec_sub = function (rng, P) { return decAddSub(rng, P, '−'); };
  function decAddSub(rng, P, op) {
    var pa = pick(rng, P.places), pb = pick(rng, P.places), pl = Math.max(pa, pb);
    var A = ri(rng, pow10(pa) / 10 + 1, P.max * pow10(pa)), B = ri(rng, pow10(pb) / 10 + 1, P.max * pow10(pb));
    if (A % 10 === 0 && pa > 0) A += 1;
    if (B % 10 === 0 && pb > 0) B += 1;
    var As = A * pow10(pl - pa), Bs = B * pow10(pl - pb);
    if (op === '−' && Bs > As) { var t = A; A = B; B = t; t = pa; pa = pb; pb = t; t = As; As = Bs; Bs = t; }
    var C = op === '+' ? As + Bs : As - Bs;
    var fa = dec(A, pa), fb = dec(B, pb), ans = dec(C, pl);
    // 位をそろえずに計算したときの間違い
    var wrong = op === '+' ? A + B : Math.abs(A - B);
    return {
      key: [fa, op === '+' ? 'p' : 'm', fb], text: fa + ' ' + op + ' ' + fb + ' = □', answer: ans, mode: 'number',
      hints: ['小数点の 位置を そろえて 書こう', '整数と 同じように、位ごとに 計算しよう', '答えにも、そろえた 位置に 小数点を うとう'],
      explanation: '小数点の位置をそろえて計算すると、' + fa + ' ' + op + ' ' + fb + ' = ' + ans + ' です。',
      distractors: [dec(C + 1, pl), dec(C - 1, pl), dec(C + pow10(pl), pl), dec(C, pl + 1), dec(wrong, Math.min(pa, pb) || 1)].filter(function (s) { return s.charAt(0) !== '-'; }),
      meta: { op: 'dec_' + (op === '+' ? 'add' : 'sub'), a: fa, b: fb }
    };
  }

  OPS.dec_mul_int = function (rng, P) {
    var pl = pick(rng, P.places), A = ri(rng, 11, P.max * pow10(pl));
    if (A % 10 === 0) A += 1;
    var b = ri(rng, 2, 9), fa = dec(A, pl), ans = dec(A * b, pl);
    return {
      key: [fa, b], text: fa + ' × ' + b + ' = □', answer: ans, mode: 'number',
      hints: ['小数点を とって、' + A + ' × ' + b + ' を 計算しよう', fa + ' は ' + A + ' を ' + pow10(pl) + ' で わった 数だね', '整数の 答えの 小数点を、左へ ' + pl + ' けた うごかそう'],
      explanation: A + ' × ' + b + ' = ' + A * b + ' なので、' + fa + ' × ' + b + ' = ' + ans + ' です。',
      distractors: [dec(A * b, pl + 1), dec(A * b, Math.max(0, pl - 1)), dec(A * b + pow10(pl), pl), dec(A * b - 1, pl)],
      meta: { op: 'dec_mul_int', a: fa, b: String(b) }
    };
  };

  OPS.dec_mul_dec = function (rng, P) {
    var A = ri(rng, 11, 99), B = ri(rng, 2, 99);
    if (A % 10 === 0) A += 1;
    if (B % 10 === 0) B += 1;
    var fa = dec(A, 1), fb = dec(B, 1), ans = dec(A * B, 2);
    return {
      key: [fa, fb], text: fa + ' × ' + fb + ' = □', answer: ans, mode: 'number',
      hints: ['小数点を とって、' + A + ' × ' + B + ' を 計算しよう', 'かける数と かけられる数の 小数点より下の けた数を たそう（1 + 1 = 2）', '答えの 小数点を、右から 2 けたの ところに うとう'],
      explanation: A + ' × ' + B + ' = ' + A * B + '。小数点より下は あわせて 2 けたなので、' + ans + ' です。',
      distractors: [dec(A * B, 1), dec(A * B, 3), dec(A * B + 1, 2), dec(A * B - 1, 2)],
      meta: { op: 'dec_mul_dec', a: fa, b: fb }
    };
  };

  OPS.dec_div = function (rng, P) {
    var Q = ri(rng, 2, 99), D = ri(rng, 2, 9);
    if (Q % 10 === 0) Q += 1;
    var fq = dec(Q, 1), fd = dec(D, 1), fa = dec(Q * D, 2);
    return {
      key: [fa, fd], text: fa + ' ÷ ' + fd + ' = □', answer: fq, mode: 'number',
      hints: ['わる数 ' + fd + ' を 整数に するには、何倍 すれば いい？', 'わられる数も 同じだけ 倍に しよう（' + fa + ' → ' + dec(Q * D, 1) + '）', dec(Q * D, 1) + ' ÷ ' + D + ' を 計算しよう'],
      explanation: '両方を 10 倍して ' + dec(Q * D, 1) + ' ÷ ' + D + ' = ' + fq + ' です。',
      distractors: [dec(Q, 2), dec(Q, 0), dec(Q + 1, 1), dec(Q - 1, 1)],
      meta: { op: 'dec_div', a: fa, b: fd }
    };
  };

  OPS.order = function (rng, P) {
    var a = ri(rng, 2, 30), b = ri(rng, 2, 9), c = ri(rng, 2, 9), form = pick(rng, ['a+bc', '(a+b)c', 'a-bc', 'ab-c']);
    if (form === 'a-bc' && a < b * c) a += b * c;
    var text, ans, first, wrong;
    if (form === 'a+bc') { text = a + ' + ' + b + ' × ' + c; ans = a + b * c; first = b + ' × ' + c; wrong = (a + b) * c; }
    else if (form === '(a+b)c') { text = '(' + a + ' + ' + b + ') × ' + c; ans = (a + b) * c; first = a + ' + ' + b; wrong = a + b * c; }
    else if (form === 'a-bc') { text = a + ' − ' + b + ' × ' + c; ans = a - b * c; first = b + ' × ' + c; wrong = (a - b) * c; }
    else { text = a + ' × ' + b + ' − ' + c; ans = a * b - c; first = a + ' × ' + b; wrong = a * (b - c); }
    return {
      key: [form.replace(/[()]/g, 'k').replace('+', 'p').replace('-', 'm'), a, b, c], text: text + ' = □', answer: String(ans), mode: 'number',
      hints: [form === '(a+b)c' ? '( ) の 中を 先に 計算するよ' : 'かけ算は、たし算・ひき算より 先に 計算するよ', 'まず ' + first + ' を 計算しよう', 'その 答えを 使って、のこりを 計算しよう'],
      explanation: '先に ' + first + ' を計算します。' + text + ' = ' + ans + ' です。',
      distractors: [wrong, ans + 1, ans - 1, ans + 10].filter(function (v) { return v >= 0; }).map(String),
      meta: { op: 'order', form: form, a: a, b: b, c: c }
    };
  };

  function fracChoices(r) {
    var out = [frac(r.n + 1, r.d), frac(r.n - 1, r.d), frac(r.n, r.d + 1), frac(r.d, r.n || 1)];
    return out.filter(function (f) { return f.n > 0; }).map(fstr);
  }
  var FRAC_NOTE = '（答えは 約分して、分数か 整数で 書こう）';

  OPS.frac_add = function (rng, P) { return fracAddSub(rng, P, '+'); };
  OPS.frac_sub = function (rng, P) { return fracAddSub(rng, P, '−'); };
  function fracAddSub(rng, P, op) {
    var d1, d2, n1, n2, x, y;
    for (var i = 0; i < 500; i++) {
      d1 = ri(rng, 2, P.maxDen); d2 = P.same ? d1 : ri(rng, 2, P.maxDen);
      if (!P.same && d1 === d2) continue;
      n1 = ri(rng, 1, d1 - 1); n2 = ri(rng, 1, d2 - 1);
      if (gcd(n1, d1) !== 1 || gcd(n2, d2) !== 1) continue;
      x = frac(n1, d1); y = frac(n2, d2);
      if (op === '−' && x.n * y.d <= y.n * x.d) continue;
      break;
    }
    var r = op === '+' ? fadd(x, y) : fsub(x, y), L = lcm(d1, d2);
    var raw = op === '+' ? (n1 * L / d1 + n2 * L / d2) : (n1 * L / d1 - n2 * L / d2);
    return {
      key: [n1, d1, op === '+' ? 'p' : 'm', n2, d2],
      text: n1 + '/' + d1 + ' ' + op + ' ' + n2 + '/' + d2 + ' = □' + FRAC_NOTE, answer: fstr(r), accepted: fmixed(r), mode: 'exact',
      hints: [d1 === d2 ? '分母が 同じなので、分子どうしを 計算しよう' : '分母を ' + L + ' に そろえよう（通分）',
        d1 === d2 ? n1 + ' ' + op + ' ' + n2 + ' を 計算しよう' : n1 + '/' + d1 + ' = ' + n1 * L / d1 + '/' + L + '、' + n2 + '/' + d2 + ' = ' + n2 * L / d2 + '/' + L,
        '分子どうしを 計算したら、約分 できるか 確かめよう'],
      explanation: '通分すると ' + (n1 * L / d1) + '/' + L + ' ' + op + ' ' + (n2 * L / d2) + '/' + L + ' = ' + raw + '/' + L + '。約分して ' + fstr(r) + ' です。',
      distractors: [(op === '+' ? n1 + n2 : Math.abs(n1 - n2)) + '/' + (op === '+' ? d1 + d2 : Math.abs(d1 - d2) || d1), raw + '/' + L].concat(fracChoices(r)),
      meta: { op: 'frac_' + (op === '+' ? 'add' : 'sub'), x: fstr(x), y: fstr(y) }
    };
  }

  OPS.frac_mul = function (rng, P) {
    var x = frac(ri(rng, 1, 8), ri(rng, 2, 9)), y;
    if (x.d === 1) x = frac(1, 2);
    var withInt = rng() < 0.3;
    y = withInt ? frac(ri(rng, 2, 9), 1) : frac(ri(rng, 1, 8), ri(rng, 2, 9));
    if (!withInt && y.d === 1) y = frac(y.n, y.n + 1);
    var r = fmul(x, y);
    return {
      key: [x.n, x.d, y.n, y.d], text: fstr(x) + ' × ' + fstr(y) + ' = □' + FRAC_NOTE, answer: fstr(r), accepted: fmixed(r), mode: 'exact',
      hints: [withInt ? '整数は 分子に かけよう' : '分子どうし、分母どうしを かけよう', 'かける 前に 約分 できると、計算が 楽に なるよ', '最後に 約分 できるか 確かめよう'],
      explanation: '(' + x.n + ' × ' + y.n + ') / (' + x.d + ' × ' + y.d + ') = ' + (x.n * y.n) + '/' + (x.d * y.d) + '。約分して ' + fstr(r) + ' です。',
      distractors: [(x.n * y.n) + '/' + (x.d + y.d), fstr(fdiv(x, y)), (x.n + y.n) + '/' + (x.d * y.d)].concat(fracChoices(r)),
      meta: { op: 'frac_mul', x: fstr(x), y: fstr(y) }
    };
  };

  OPS.frac_div = function (rng, P) {
    var x = frac(ri(rng, 1, 8), ri(rng, 2, 9)), y = frac(ri(rng, 1, 8), ri(rng, 2, 9));
    if (x.d === 1) x = frac(x.n, x.n + 1);
    if (y.d === 1) y = frac(y.n, y.n + 1);
    var r = fdiv(x, y), inv = frac(y.d, y.n);
    return {
      key: [x.n, x.d, y.n, y.d], text: fstr(x) + ' ÷ ' + fstr(y) + ' = □' + FRAC_NOTE, answer: fstr(r), accepted: fmixed(r), mode: 'exact',
      hints: ['わる数の 逆数を かけよう', fstr(y) + ' の 逆数は ' + fstr(inv), fstr(x) + ' × ' + fstr(inv) + ' を 計算して、約分しよう'],
      explanation: fstr(x) + ' ÷ ' + fstr(y) + ' = ' + fstr(x) + ' × ' + fstr(inv) + ' = ' + fstr(r) + ' です。',
      distractors: [fstr(fmul(x, y)), fstr(frac(r.d, r.n))].concat(fracChoices(r)),
      meta: { op: 'frac_div', x: fstr(x), y: fstr(y) }
    };
  };

  OPS.ratio = function (rng, P) {
    var a, b;
    do { a = ri(rng, 1, 9); b = ri(rng, 1, 9); } while (a === b || gcd(a, b) !== 1);
    var k = ri(rng, 2, 9), c = a * k, x = b * k;
    return {
      key: [a, b, c], text: a + ' : ' + b + ' = ' + c + ' : □', answer: String(x), mode: 'number',
      hints: [a + ' を 何倍 すると ' + c + ' に なる？', c + ' ÷ ' + a + ' を 計算しよう', b + ' にも 同じ 数を かけよう'],
      explanation: a + ' × ' + k + ' = ' + c + ' なので、' + b + ' × ' + k + ' = ' + x + ' です。',
      distractors: [String(b + (c - a)), String(x + b), String(x - b), String(c * b)],
      meta: { op: 'ratio', a: a, b: b, c: c }
    };
  };

  OPS.int_add = function (rng, P) {
    var a, b, op;
    do { a = ri(rng, -P.max, P.max); b = ri(rng, -P.max, P.max); } while (a === 0 || b === 0 || (a > 0 && b > 0));
    op = pick(rng, ['+', '−']);
    var r = op === '+' ? a + b : a - b;
    return {
      key: [a, op === '+' ? 'p' : 'm', b], text: p(a) + ' ' + op + ' ' + p(b) + ' = □', answer: String(r), mode: 'number',
      hints: [op === '−' ? 'ひく ことは、符号を 変えた 数を たす ことと 同じ' : '2つの 数の 符号が 同じか ちがうかを 見よう',
        '符号が ちがう ときは、絶対値の 大きい 方から 小さい 方を ひこう', '答えの 符号は、絶対値の 大きい 方の 符号に なるよ'],
      explanation: p(a) + ' ' + op + ' ' + p(b) + ' = ' + r + ' です。',
      distractors: [-r, op === '+' ? a - b : a + b, r + 1, r - 1].map(String),
      meta: { op: 'int_add', a: a, b: b, o: op }
    };
  };

  OPS.int_mul = function (rng, P) {
    var a, b;
    do { a = nz(rng, -P.max, P.max); b = nz(rng, -P.max, P.max); } while (a > 0 && b > 0);
    var isDiv = rng() < 0.4, text, r;
    if (isDiv) { text = p(a * b) + ' ÷ ' + p(b); r = a; }
    else { text = p(a) + ' × ' + p(b); r = a * b; }
    return {
      key: [isDiv ? 'd' : 'x', isDiv ? a * b : a, b], text: text + ' = □', answer: String(r), mode: 'number',
      hints: ['まず 符号を 考えずに 計算しよう', '負の 数が 1つ なら 答えは 負、2つ なら 正', '絶対値の 答えに 符号を つけよう'],
      explanation: text + ' = ' + r + ' です。',
      distractors: [-r, r + 1, r - 1, isDiv ? a * b * b : a + b].map(String),
      meta: { op: 'int_mul', text: text, a: isDiv ? a * b : a, b: b, div: isDiv }
    };
  };

  OPS.lin_eq = function (rng, P) {
    var x = ri(rng, P.x[0], P.x[1]), a = ri(rng, 2, 9), b = nz(rng, -20, 20), c = a * x + b;
    var lhs = term(a, 'x', true) + (b < 0 ? ' − ' + (-b) : ' + ' + b);
    return {
      key: [a, b, c], text: lhs + ' = ' + c + ' のとき、x の値を 求めよう', answer: String(x), mode: 'number',
      hints: [(b < 0 ? '−' + (-b) : '+' + b) + ' を 右辺に 移項しよう（符号が 変わる）', term(a, 'x', true) + ' = ' + (c - b), '両辺を ' + a + ' で わろう'],
      explanation: term(a, 'x', true) + ' = ' + c + ' ' + (b < 0 ? '+ ' + (-b) : '− ' + b) + ' = ' + (c - b) + '、x = ' + (c - b) + ' ÷ ' + a + ' = ' + x + ' です。',
      distractors: [-x, x + 1, x - 1, c - b, c + b].map(String),
      meta: { op: 'lin_eq', a: a, b: b, c: c }
    };
  };

  OPS.lin_eq2 = function (rng, P) {
    var x = ri(rng, -9, 9), a, c;
    do { a = nz(rng, -9, 9); c = nz(rng, -9, 9); } while (a === c);
    var b = nz(rng, -20, 20), d = (a - c) * x + b;
    var lhs = term(a, 'x', true) + (b < 0 ? ' − ' + (-b) : ' + ' + b);
    var rhs = term(c, 'x', true) + (d === 0 ? '' : d < 0 ? ' − ' + (-d) : ' + ' + d);
    return {
      key: [a, b, c, d], text: lhs + ' = ' + rhs + ' のとき、x の値を 求めよう', answer: String(x), mode: 'number',
      hints: ['x の 項を 左辺に、数の 項を 右辺に 集めよう', term(a - c, 'x', true) + ' = ' + (d - b), '両辺を ' + p(a - c) + ' で わろう'],
      explanation: '移項すると ' + term(a - c, 'x', true) + ' = ' + (d - b) + '。x = ' + x + ' です。',
      distractors: [-x, x + 1, x - 1, d - b].map(String),
      meta: { op: 'lin_eq2', a: a, b: b, c: c, d: d }
    };
  };

  OPS.subst = function (rng, P) {
    var pa = nz(rng, -5, 5), qb = nz(rng, -5, 5), av = nz(rng, -5, 5), bv = nz(rng, -5, 5);
    var expr = term(pa, 'a', true) + term(qb, 'b', false), r = pa * av + qb * bv;
    return {
      key: [pa, qb, av, bv], text: 'a = ' + av + '、b = ' + bv + ' のとき、' + expr + ' の値を 求めよう', answer: String(r), mode: 'number',
      hints: ['a に ' + av + ' を、b に ' + bv + ' を 代入しよう（負の数は かっこを つける）', pa + ' × ' + p(av) + ' と ' + qb + ' × ' + p(bv) + ' を それぞれ 計算しよう', '2つの 結果を たそう'],
      explanation: pa + ' × ' + p(av) + ' + ' + p(qb) + ' × ' + p(bv) + ' = ' + (pa * av) + ' + ' + p(qb * bv) + ' = ' + r + ' です。',
      distractors: [-r, pa * av - qb * bv, pa * bv + qb * av, r + 1].map(String),
      meta: { op: 'subst', pa: pa, qb: qb, av: av, bv: bv }
    };
  };

  OPS.simul = function (rng, P) {
    var x, y, a1, b1, a2, b2;
    do {
      x = ri(rng, -6, 6); y = ri(rng, -6, 6);
      a1 = nz(rng, -5, 5); b1 = nz(rng, -5, 5); a2 = nz(rng, -5, 5); b2 = nz(rng, -5, 5);
    } while (a1 * b2 - a2 * b1 === 0 || x === y);
    var c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
    var e1 = term(a1, 'x', true) + term(b1, 'y', false) + ' = ' + c1;
    var e2 = term(a2, 'x', true) + term(b2, 'y', false) + ' = ' + c2;
    return {
      key: [a1, b1, c1, a2, b2, c2], text: '連立方程式\n' + e1 + '\n' + e2 + '\nの解のうち、x の値を 求めよう', answer: String(x), mode: 'number',
      hints: ['どちらかの 文字の 係数を そろえて 消そう（加減法）', 'y を 消すには、上の式を ' + Math.abs(b2) + ' 倍、下の式を ' + Math.abs(b1) + ' 倍 してみよう', 'y が 消えたら、x の 1次方程式を 解こう'],
      explanation: '加減法で y を消すと x = ' + x + '。代入すると y = ' + y + ' です。',
      distractors: [y, -x, x + 1, x - 1].map(String),
      meta: { op: 'simul', a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2, y: y }
    };
  };

  OPS.slope = function (rng, P) {
    var m = nz(rng, -5, 5), k = ri(rng, -9, 9), x1, x2;
    do { x1 = ri(rng, -5, 5); x2 = ri(rng, -5, 5); } while (x1 === x2);
    var y1 = m * x1 + k, y2 = m * x2 + k;
    return {
      key: [x1, y1, x2, y2], text: '2点 (' + x1 + ', ' + y1 + ')、(' + x2 + ', ' + y2 + ') を通る 直線の 傾きを 求めよう', answer: String(m), mode: 'number',
      hints: ['傾き ＝ y の増加量 ÷ x の増加量', 'y の増加量は ' + y2 + ' − ' + p(y1), 'x の増加量は ' + x2 + ' − ' + p(x1)],
      explanation: '(' + y2 + ' − ' + p(y1) + ') ÷ (' + x2 + ' − ' + p(x1) + ') = ' + (y2 - y1) + ' ÷ ' + p(x2 - x1) + ' = ' + m + ' です。',
      distractors: [-m, k, m + 1, m - 1, y2 - y1].map(String),
      meta: { op: 'slope', x1: x1, y1: y1, x2: x2, y2: y2 }
    };
  };

  OPS.sqrt = function (rng, P) {
    if (rng() < 0.4) {
      var n = ri(rng, 2, 20);
      return {
        key: ['sq', n * n], text: '√' + (n * n) + ' = □', answer: String(n), mode: 'number',
        hints: ['2乗して ' + n * n + ' に なる 正の数を さがそう', '10² = 100、20² = 400 を 目安に しよう', '一の位に 注目して、候補を しぼろう'],
        explanation: n + '² = ' + n * n + ' なので、√' + n * n + ' = ' + n + ' です。',
        distractors: [n + 1, n - 1, n * 2, Math.round(n * n / 2)].map(String),
        meta: { op: 'sqrt', a: n * n, b: 1 }
      };
    }
    var s = pick(rng, [2, 3, 5, 6, 7]), u = ri(rng, 1, 3), v = ri(rng, 1, 4);
    var a = s * u * u, b = s * v * v, r = s * u * v;
    return {
      key: ['pr', a, b], text: '√' + a + ' × √' + b + ' = □', answer: String(r), mode: 'number',
      hints: ['√a × √b = √(a × b)', a + ' × ' + b + ' = ' + a * b, a * b + ' は 何の 2乗？'],
      explanation: '√' + a + ' × √' + b + ' = √' + a * b + ' = ' + r + ' です。',
      distractors: [a * b, r + 1, r - 1, a + b].map(String),
      meta: { op: 'sqrt', a: a, b: b }
    };
  };

  OPS.quad = function (rng, P) {
    var r1, r2;
    do { r1 = ri(rng, -9, 9); r2 = ri(rng, -9, 9); } while (r1 === r2);
    if (r1 > r2) { var t = r1; r1 = r2; r2 = t; }
    var pp = -(r1 + r2), q = r1 * r2;
    var text = 'x²' + (pp === 0 ? '' : term(pp, 'x', false)) + (q === 0 ? '' : term(q, '', false)) + ' = 0';
    return {
      key: [pp, q], text: '2次方程式 ' + text + ' の 解のうち、大きい方を 答えよう', answer: String(r2), mode: 'number',
      hints: ['かけて ' + q + '、たして ' + (-pp) + ' に なる 2つの 数を さがそう', '(x − □)(x − △) = 0 の 形に 因数分解しよう', 'それぞれの かっこが 0 に なる x を 考えよう'],
      explanation: '(x ' + (r1 < 0 ? '+ ' + (-r1) : '− ' + r1) + ')(x ' + (r2 < 0 ? '+ ' + (-r2) : '− ' + r2) + ') = 0 より、x = ' + r1 + '、' + r2 + '。大きい方は ' + r2 + ' です。',
      distractors: [r1, -r2, -r1, r2 + 1].map(String),
      meta: { op: 'quad', p: pp, q: q }
    };
  };

  OPS.pyth = function (rng, P) {
    var t = pick(rng, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), k = ri(rng, 1, 4);
    var a = t[0] * k, b = t[1] * k, c = t[2] * k, askHyp = rng() < 0.6;
    if (askHyp) {
      return {
        key: ['h', a, b], text: '直角三角形で、直角を はさむ 2辺の 長さが ' + a + ' cm と ' + b + ' cm のとき、斜辺の 長さは 何 cm？（数だけ 答えよう）', answer: String(c), mode: 'number',
        hints: ['三平方の定理：a² + b² = c²', a + '² + ' + b + '² = ' + (a * a + b * b), '2乗して ' + (a * a + b * b) + ' に なる 正の数を さがそう'],
        explanation: a + '² + ' + b + '² = ' + (a * a + b * b) + ' = ' + c + '² なので、斜辺は ' + c + ' cm です。',
        distractors: [a + b, c + 1, c - 1, a * a + b * b].map(String),
        meta: { op: 'pyth', a: a, b: b, hyp: true }
      };
    }
    return {
      key: ['l', a, c], text: '直角三角形で、斜辺が ' + c + ' cm、もう 1辺が ' + a + ' cm のとき、残りの 1辺の 長さは 何 cm？（数だけ 答えよう）', answer: String(b), mode: 'number',
      hints: ['三平方の定理：a² + b² = c²', c + '² − ' + a + '² = ' + (c * c - a * a), '2乗して ' + (c * c - a * a) + ' に なる 正の数を さがそう'],
      explanation: c + '² − ' + a + '² = ' + (c * c - a * a) + ' = ' + b + '² なので、残りの辺は ' + b + ' cm です。',
      distractors: [c - a, b + 1, b - 1, c * c - a * a].map(String),
      meta: { op: 'pyth', a: a, c: c, hyp: false }
    };
  };

  // ---- 学年 × 難易度 の設定 ----
  var GEN_CONFIG = {
    1: {
      basic: [{ op: 'add', p: { a: [0, 9], b: [0, 9], maxSum: 10 } }, { op: 'sub', p: { a: [1, 10], b: [0, 9] } }],
      standard: [{ op: 'add', p: { a: [2, 9], b: [2, 9], carry: 'yes' } }, { op: 'sub', p: { a: [11, 18], b: [2, 9], borrow: 'yes' } }],
      advanced: [{ op: 'add3', p: { max: 20 } }]
    },
    2: {
      basic: [{ op: 'add', p: { a: [10, 89], b: [10, 89], carry: 'no', maxSum: 99 } }, { op: 'sub', p: { a: [20, 99], b: [10, 89], borrow: 'no' } }],
      standard: [{ op: 'mul', p: { a: [2, 9], b: [1, 9] } }, { op: 'add', p: { a: [10, 89], b: [10, 89], carry: 'yes', maxSum: 99 } }, { op: 'sub', p: { a: [20, 99], b: [10, 89], borrow: 'yes' } }],
      advanced: [{ op: 'add', p: { a: [100, 899], b: [100, 899], maxSum: 999 } }, { op: 'sub', p: { a: [100, 999], b: [100, 999] } }]
    },
    3: {
      basic: [{ op: 'add', p: { a: [100, 999], b: [100, 999], carry: 'yes', maxSum: 1998 } }, { op: 'sub', p: { a: [100, 999], b: [100, 999], borrow: 'yes' } }],
      standard: [{ op: 'mul', p: { a: [11, 99], b: [2, 9] } }, { op: 'div', p: { b: [2, 9], q: [2, 9] } }],
      advanced: [{ op: 'mul', p: { a: [11, 99], b: [11, 99] } }, { op: 'divrem', p: { b: [3, 9], q: [2, 9] } }]
    },
    4: {
      basic: [{ op: 'div', p: { b: [2, 9], q: [11, 99] } }],
      standard: [{ op: 'dec_add', p: { places: [1, 2], max: 20 } }, { op: 'dec_sub', p: { places: [1, 2], max: 20 } }],
      advanced: [{ op: 'div', p: { b: [11, 29], q: [2, 30] } }, { op: 'order', p: {} }]
    },
    5: {
      basic: [{ op: 'dec_mul_int', p: { places: [1, 2], max: 9 } }],
      standard: [{ op: 'frac_add', p: { maxDen: 9 } }, { op: 'frac_sub', p: { maxDen: 9 } }],
      advanced: [{ op: 'dec_mul_dec', p: {} }, { op: 'dec_div', p: {} }]
    },
    6: {
      basic: [{ op: 'frac_mul', p: {} }],
      standard: [{ op: 'frac_div', p: {} }],
      advanced: [{ op: 'ratio', p: {} }, { op: 'frac_add', p: { maxDen: 12 } }]
    },
    7: {
      basic: [{ op: 'int_add', p: { max: 20 } }],
      standard: [{ op: 'int_mul', p: { max: 12 } }, { op: 'lin_eq', p: { x: [-9, 9] } }],
      advanced: [{ op: 'lin_eq2', p: {} }]
    },
    8: {
      basic: [{ op: 'subst', p: {} }],
      standard: [{ op: 'simul', p: {} }],
      advanced: [{ op: 'slope', p: {} }]
    },
    9: {
      basic: [{ op: 'sqrt', p: {} }],
      standard: [{ op: 'quad', p: {} }],
      advanced: [{ op: 'pyth', p: {} }]
    }
  };

  function idOf(grade, op, key) {
    return 'gen_math_g' + grade + '_' + op + '_' + key.map(function (k) {
      return String(k).replace(/-/g, 'm').replace(/\./g, 'p').replace(/\//g, 's');
    }).join('_');
  }

  // 4択の誤答を3つ選ぶ（正解と同じと判定されるもの・重複は除く）
  function makeChoices(q, distractors, rng) {
    var seen = {};
    seen[FF.answer.normalize(q.answer)] = true;
    var pool = [];
    function add(s) {
      s = String(s);
      var key = FF.answer.normalize(s);
      if (seen[key] || s === '' || s === 'NaN') return;
      if (FF.answer.judgeInput(q, s).correct) return;
      seen[key] = true;
      pool.push(s);
    }
    FF.util.shuffle(distractors, rng).forEach(add);
    // 足りなければ正解の近くの数で補う
    var n = FF.answer.parseNumber(q.answer);
    var isFrac = /^\d+\/\d+$/.test(q.answer);
    var step = 1;
    if (!isNaN(n) && q.answer.indexOf('.') >= 0) step = pow10(-(q.answer.split('.')[1].length));
    for (var k = 1; pool.length < 3 && k < 50; k++) {
      if (isFrac) {
        var parts = q.answer.split('/');
        add((Number(parts[0]) + k) + '/' + parts[1]);
      } else if (!isNaN(n)) {
        var places = step < 1 ? Math.round(-Math.log10(step)) : 0;
        add(dec(Math.round((n + k * step) * pow10(places)), places));
        if (n - k * step >= 0) add(dec(Math.round((n - k * step) * pow10(places)), places));
      }
    }
    return [q.answer].concat(pool.slice(0, 3));
  }

  // grade: 1〜9、difficulty: basic | standard | advanced、answerType: choice | input
  function generate(grade, difficulty, answerType, rng) {
    rng = rng || Math.random;
    var list = GEN_CONFIG[grade] && GEN_CONFIG[grade][difficulty];
    if (!list) return null;
    var entry = pick(rng, list);
    var s = OPS[entry.op](rng, entry.p);
    var q = {
      id: idOf(grade, entry.op, s.key),
      subject: 'math',
      gradeLevel: grade,
      unit: entry.op,
      difficulty: difficulty,
      answerType: answerType,
      question: s.text,
      answer: s.answer,
      acceptedAnswers: s.accepted || [],
      validationMode: s.mode,
      hints: s.hints,
      explanation: s.explanation,
      reviewed: false,
      generated: true,
      meta: s.meta
    };
    if (answerType === 'choice') q.choices = makeChoices(q, s.distractors || [], rng);
    return q;
  }

  function supports(subject, grade, difficulty) {
    return subject === 'math' && !!(GEN_CONFIG[grade] && GEN_CONFIG[grade][difficulty]);
  }

  FF.generators = {
    GEN_CONFIG: GEN_CONFIG,
    OPS: OPS,
    generate: generate,
    supports: supports,
    // テスト用に公開
    _frac: { frac: frac, fstr: fstr, gcd: gcd }
  };
})(this);
