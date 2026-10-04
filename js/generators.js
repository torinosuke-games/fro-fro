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
      hints: ['小数点を とって、' + A + ' × ' + B + ' を 計算しよう', 'かける数と かけられる数の 小数点より下の けた{数|すう}を たそう（1 + 1 = 2）', '答えの 小数点を、右から 2 けたの ところに うとう'],
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
      hints: ['まず 符号を 考えずに 計算しよう', '{負|ふ}の {数|すう}が 1つ なら 答えは 負、2つ なら 正', '絶対値の 答えに 符号を つけよう'],
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
      hints: ['x の 項を 左辺に、{数|すう}の {項|こう}を 右辺に 集めよう', term(a - c, 'x', true) + ' = ' + (d - b), '両辺を ' + p(a - c) + ' で わろう'],
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
      hints: ['どちらかの 文字の 係数を そろえて 消そう（加減法）', 'y を 消すには、上の式を ' + Math.abs(b2) + ' 倍、下の式を ' + Math.abs(b1) + ' 倍 してみよう', 'y が 消えたら、x の 1次方程式を {解|と}こう'],
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


  // ======== 小4：単元ごとの自動生成（判断226） ========
  // 計算だけの問題と、数を入れかえる文章題を、単元ごとに作る。手で作る文章題・図の問題は questions/ にある。
  function pw(k) { return Math.pow(10, k); }
  function placeValue(name) { return { '十': 10, '百': 100, '千': 1000, '万': 10000 }[name]; }
  function roundTo(n, k) { return Math.floor((n + k / 2) / k) * k; }
  // 数え方の読み：{本|ぽん} などの明示（辞書では数で読みが変わる語を決められないため）
  function hon(n) { var r = n % 10, y = (r === 1 || r === 6 || r === 8 || r === 0) ? 'ぽん' : (r === 3 ? 'ぼん' : 'ほん'); return n + '{本|' + y + '}'; }
  function nin(n) { return n === 1 ? '{1人|ひとり}' : n === 2 ? '{2人|ふたり}' : n + '{人|にん}'; }
  function uniq(list, not) { // 正解と重複せず、正の整数の誤答だけ残す
    var seen = {}, out = [];
    list.forEach(function (v) { v = String(v); if (v !== String(not) && !seen[v] && /^\d+(\.\d+)?$/.test(v) && Number(v) > 0) { seen[v] = true; out.push(v); } });
    return out;
  }

  // 大きな数
  OPS.big_read = function (rng, P) {
    var hi = pick(rng, P.hi), big = hi === '兆' ? 1e12 : 1e8, mid = hi === '兆' ? 1e8 : 1e4, midName = hi === '兆' ? '億' : '万';
    var a = ri(rng, 1, 99), b = ri(rng, 1, 9999), v = a * big + b * mid;
    return {
      key: [a, b, hi === '兆' ? 1 : 0], text: a + hi + b + midName + 'を、数字で書きましょう。', answer: String(v), mode: 'number',
      hints: ['数字を 4けたずつ 区切って、一・万・億・兆の 位を 考えよう', hi + 'の 位に ' + a + '、' + midName + 'の 位に ' + b + ' を 書こう', 'あいている 位には 0 を 書こう'],
      explanation: a + hi + '＝' + a * big + '、' + b + midName + '＝' + b * mid + '。合わせて ' + v + ' です。',
      distractors: uniq([a * big + b * mid * 10, a * big * 10 + b * mid, a * big + b * mid / 10, a * big + b * mid / 100], v),
      meta: { op: 'big_read', a: a, b: b, big: big, mid: mid }
    };
  };
  OPS.big_scale = function (rng, P) {
    var u = pick(rng, P.units), k = pick(rng, P.k), times = rng() < 0.5, r = ri(rng, 2, 99), n = times ? r : r * k, ans = times ? r * k : r;
    return {
      key: [n, k, times ? 1 : 0, u], text: n + u + 'を' + k + (times ? '倍すると' : 'でわると') + '、何' + u + 'ですか。', answer: String(ans), mode: 'number',
      hints: [k === 10 ? '10倍すると 位が 1つ 上がるよ（0が 1つ ふえる）' : '100倍すると 位が 2つ 上がるよ（0が 2つ ふえる）', times ? n + ' × ' + k + ' を 計算しよう' : n + ' ÷ ' + k + ' を 考えよう', '単位の ' + u + ' は そのまま つけよう'],
      explanation: n + ' ' + (times ? '×' : '÷') + ' ' + k + ' ＝ ' + ans + '。答えは ' + ans + u + ' です。',
      distractors: uniq([ans * 10, ans / 10, ans + k, times ? n + k : n - k, ans * 100], ans),
      meta: { op: 'big_scale', n: n, k: k, times: times }
    };
  };

  // がい数
  OPS.round_to = function (rng, P) {
    var d = pick(rng, P.digits), name, k, n, i;
    for (i = 0; i < 50; i++) { name = pick(rng, P.places); k = placeValue(name); if (k * 10 <= pw(d)) break; }
    n = ri(rng, pw(d - 1), pw(d) - 1);
    if (n % k === 0) n += 1;
    var ans = roundTo(n, k);
    return {
      key: [n, k], text: n + 'を四捨五入して、' + name + 'の位までのがい数にしましょう。', answer: String(ans), mode: 'number',
      hints: [name + 'の 位までの がい数 → ひとつ 下の 位を 見るよ', 'ひとつ 下の 位が 0〜4 なら 切り捨て、5〜9 なら 切り上げ', '切り上げるときは ' + name + 'の 位に 1 を たそう'],
      explanation: 'ひとつ下の位の数字は ' + (Math.floor(n / (k / 10)) % 10) + ' です。四捨五入して ' + ans + ' になります。',
      distractors: uniq([Math.floor(n / k) * k, Math.floor(n / k) * k + k, roundTo(n, k * 10), roundTo(n, k / 10 || 1)], ans),
      meta: { op: 'round_to', n: n, k: k }
    };
  };
  OPS.round_top = function (rng, P) {
    var d = pick(rng, P.digits), top = pick(rng, P.tops), k = pw(d - top), n = ri(rng, pw(d - 1), pw(d) - 1);
    if (n % k === 0) n += 1;
    var ans = roundTo(n, k);
    return {
      key: [n, top], text: n + 'を四捨五入して、上から' + top + 'けたのがい数にしましょう。', answer: String(ans), mode: 'number',
      hints: ['上から ' + top + ' けたまで のこす → 次の けたを 四捨五入しよう', '次の けたが 0〜4 なら 切り捨て、5〜9 なら 切り上げ', 'のこりの けたは 0 に なるよ'],
      explanation: '上から ' + top + ' けたまで のこして四捨五入すると ' + ans + ' です。',
      distractors: uniq([Math.floor(n / k) * k, Math.floor(n / k) * k + k, roundTo(n, k * 10), roundTo(n, k / 10)], ans),
      meta: { op: 'round_top', n: n, k: k }
    };
  };
  OPS.round_est = function (rng, P) {
    var name = pick(rng, P.places), k = placeValue(name), a = ri(rng, 1100, 9899), b = ri(rng, 1100, 9899), plus = rng() < 0.5;
    if (!plus && roundTo(a, k) <= roundTo(b, k)) { var t = a; a = b; b = t; }
    var ra = roundTo(a, k), rb = roundTo(b, k), ans = plus ? ra + rb : ra - rb;
    if (ans <= 0) { a += k * 3; ra = roundTo(a, k); ans = plus ? ra + rb : ra - rb; }
    return {
      key: [a, b, k, plus ? 1 : 0], text: a + 'と' + b + 'を、それぞれ' + name + 'の位までのがい数にして、' + (plus ? '和' : '差') + 'を見積もりましょう。', answer: String(ans), mode: 'number',
      hints: ['先に ' + a + ' と ' + b + ' を ' + name + 'の 位までの がい数に しよう', a + ' → ' + ra + '、' + b + ' → ' + rb, ra + (plus ? ' + ' : ' − ') + rb + ' を 計算しよう'],
      explanation: a + ' ≒ ' + ra + '、' + b + ' ≒ ' + rb + ' なので、' + ra + (plus ? ' + ' : ' − ') + rb + ' ＝ ' + ans + ' です。',
      distractors: uniq([plus ? a + b : a - b, ans + k, ans - k, plus ? ra + rb + k * 2 : ra - rb + k * 2], ans),
      meta: { op: 'round_est', a: a, b: b, k: k, plus: plus }
    };
  };
  OPS.round_range = function (rng, P) {
    var name = pick(rng, P.places), k = placeValue(name), X = ri(rng, 3, 98) * k, smallest = rng() < 0.5, ans = smallest ? X - k / 2 : X + k / 2 - 1;
    return {
      key: [X, k, smallest ? 1 : 0], text: '四捨五入して' + name + 'の位までのがい数にすると ' + X + ' になる整数のうち、いちばん' + (smallest ? '小さい' : '大きい') + '数はいくつですか。', answer: String(ans), mode: 'number',
      hints: [X + ' に なる 数の はんいを 考えよう', (X - k / 2) + ' から ' + (X + k / 2 - 1) + ' までが ' + X + ' に なるよ', smallest ? '切り上げて ' + X + ' に なる いちばん 小さい 数は？' : '切り捨てて ' + X + ' に なる いちばん 大きい 数は？'],
      explanation: (X - k / 2) + ' から ' + (X + k / 2 - 1) + ' までの 整数が ' + X + ' になります。いちばん' + (smallest ? '小さい' : '大きい') + '数は ' + ans + ' です。',
      distractors: uniq([X - k / 2 - 1, X + k / 2, X - k / 2 + 1, X + k / 2 - 2, X], ans),
      meta: { op: 'round_range', X: X, k: k, smallest: smallest }
    };
  };

  // わり算
  OPS.div_tens = function (rng, P) {
    var t = ri(rng, 2, 9), b = t * 10, q = ri(rng, 2, 9), a = b * q;
    return {
      key: [a, b], text: a + ' ÷ ' + b + ' = □', answer: String(q), mode: 'number',
      hints: ['10を 1つ分と 考えて、' + (a / 10) + ' ÷ ' + t + ' を 計算しよう', t + ' の だんの 九九を となえよう', '答えは そのまま ' + q + ' に なるよ'],
      explanation: a + ' ÷ ' + b + ' は、両方を 10 でわって ' + (a / 10) + ' ÷ ' + t + ' ＝ ' + q + ' です。',
      distractors: uniq([q * 10, q + 1, q - 1, a / 10], q),
      meta: { op: 'div', a: a, b: b }
    };
  };
  OPS.divq = function (rng, P) {
    var b = ri(rng, P.b[0], P.b[1]), q = ri(rng, P.q[0], P.q[1]), r = ri(rng, 1, b - 1), a = b * q + r;
    return {
      key: [a, b], text: a + ' ÷ ' + b + ' の商はいくつですか。（あまりは 考えません）', answer: String(q), mode: 'number',
      hints: [b + ' × □ が ' + a + ' を こえない、いちばん 大きい □ を さがそう', '商の 見当を つけて、' + b + ' に かけて 確かめよう', 'かけた 答えが ' + a + ' より 大きく なったら、1 へらそう'],
      explanation: a + ' ÷ ' + b + ' ＝ ' + q + ' あまり ' + r + ' なので、商は ' + q + ' です。',
      distractors: uniq([q + 1, q - 1, r, q * 10, q + 10], q),
      meta: { op: 'divq', a: a, b: b }
    };
  };
  function cnt(n, u) { return u === '本' ? hon(n) : n + u; }
  var STUFF = [{ t: 'まき', u: '本' }, { t: 'じゃがいも', u: 'こ' }, { t: '板', u: '枚' }, { t: 'パン', u: 'こ' }, { t: 'クッキー', u: 'まい' }];
  OPS.div_ceil = function (rng, P) {
    var th = pick(rng, STUFF), b = ri(rng, P.b[0], P.b[1]), q = ri(rng, P.q[0], P.q[1]), r = ri(rng, 1, b - 1), a = b * q + r;
    return {
      key: [a, b, th.t], text: '町に ' + th.t + ' が ' + cnt(a, th.u) + ' あります。1つの箱に ' + cnt(b, th.u) + ' ずつ 入れます。全部 入れるには、箱は 何箱 いりますか。', answer: String(q + 1), mode: 'number',
      hints: [a + ' ÷ ' + b + ' を 計算しよう', 'あまりが 出たら、その ぶんを 入れる 箱も ひつようだよ', '商に 1 を たそう'],
      explanation: a + ' ÷ ' + b + ' ＝ ' + q + ' あまり ' + r + '。あまりの ' + cnt(r, th.u) + ' を 入れる 箱が もう 1つ いるので、' + (q + 1) + ' 箱です。',
      distractors: uniq([q, q + 2, r, q + 1 + 10, a - b * q], q + 1),
      meta: { op: 'div_ceil', a: a, b: b }
    };
  };

  // 小数
  OPS.dec_unit = function (rng, P) {
    var places = pick(rng, [1, 2, 3]), unit = dec(1, places), n = ri(rng, 2, 99), inv = rng() < 0.5, x = dec(n, places);
    return {
      key: [places, n, inv ? 1 : 0], text: inv ? x + 'は、' + unit + 'を何こ集めた数ですか。' : unit + 'を ' + n + 'こ 集めた数は、いくつですか。', answer: inv ? String(n) : x, mode: 'number',
      hints: [unit + ' は 1 を ' + pw(places) + ' に 分けた 1つ分 だよ', inv ? x + ' ÷ ' + unit + ' を 考えよう' : unit + ' × ' + n + ' を 考えよう', inv ? x + ' の 小数点を ' + places + ' けた 右へ うごかそう' : n + ' の 小数点を ' + places + ' けた 左へ うごかそう'],
      explanation: inv ? x + ' ＝ ' + unit + ' が ' + n + ' こ分 です。' : unit + ' が ' + n + ' こ分 で ' + x + ' です。',
      distractors: inv ? uniq([n * 10, n / 10, n + 1, n - 1], n) : uniq([dec(n, places + 1), dec(n, Math.max(0, places - 1)), dec(n + 1, places), dec(n - 1, places)], x),
      meta: { op: 'dec_unit', n: n, places: places, inv: inv }
    };
  };
  OPS.dec_max = function (rng, P) {
    var list = [], vals = [], tries = 0;
    while (list.length < 4 && tries++ < 200) {
      var pl = ri(rng, 1, 3), v = ri(rng, 1, pw(pl) * 2 - 1);
      if (v % 10 === 0) v += 1;
      var s = dec(v, pl), val = v * pw(3 - pl);
      if (vals.indexOf(val) >= 0) continue;
      vals.push(val); list.push(s);
    }
    var best = vals.indexOf(Math.max.apply(null, vals)), ans = list[best];
    return {
      key: list.slice().sort(), text: '次の4つの数で、いちばん大きい数はいくつですか。' + list.join('、'), answer: ans, mode: 'number',
      hints: ['小数点の 位置を そろえて、けた数を そろえて 書こう', '上の 位（一の位・小数第1位…）から じゅんに くらべよう', 'ちがいが 出た 位で 大小が 決まるよ'],
      explanation: '位をそろえて書くと ' + list.map(function (t) { var q = t.split('.'); return q[0] + '.' + ((q[1] || '') + '000').slice(0, 3); }).join('、') + ' です。いちばん大きい数は ' + ans + ' です。',
      distractors: list.filter(function (t, i) { return i !== best; }),
      meta: { op: 'dec_max', list: list }
    };
  };

  // 小数のかけ算・わり算
  OPS.dec_div_int = function (rng, P) {
    var pl = pick(rng, P.places), D = ri(rng, P.d[0], P.d[1]), Q = ri(rng, 11, 99);
    if (Q % 10 === 0) Q += 1;
    var fa = dec(Q * D, pl), fq = dec(Q, pl);
    return {
      key: [fa, D], text: fa + ' ÷ ' + D + ' = □', answer: fq, mode: 'number',
      hints: ['小数点が ないものと して、' + (Q * D) + ' ÷ ' + D + ' を 計算しよう', '商の 小数点は、わられる数の 小数点に そろえて うとう', '右から ' + pl + ' けたの ところに 小数点が くるよ'],
      explanation: (Q * D) + ' ÷ ' + D + ' ＝ ' + Q + '。小数点を そろえて ' + fa + ' ÷ ' + D + ' ＝ ' + fq + ' です。',
      distractors: uniq([dec(Q, pl + 1), dec(Q, Math.max(0, pl - 1)), dec(Q + 1, pl), dec(Q - 1, pl)], fq),
      meta: { op: 'dec_div_int', a: fa, b: String(D) }
    };
  };
  OPS.dec_mul_word = function (rng, P) {
    var pl = pick(rng, [1, 2]), A = ri(rng, 11, 60), b = ri(rng, 2, 9);
    if (A % 10 === 0) A += 1;
    var fa = dec(A, pl), ans = dec(A * b, pl), C = pick(rng, [
      { t: function () { return '1{本|ぽん} ' + fa + 'm の ロープを ' + hon(b) + ' つなぎます。全部で 何m ですか。（つなぎ目は 考えません）'; } },
      { t: function () { return '1つ ' + fa + 'L ずつ 入った 水の 容器が ' + b + 'つ あります。水は 全部で 何L ですか。'; } },
      { t: function () { return '1まい ' + fa + 'm の 旗を ' + b + 'まい 作ります。布は 何m いりますか。'; } }
    ]);
    return {
      key: [fa, b, C.t().length], text: C.t(), answer: ans, mode: 'number',
      hints: ['同じ 数を 何回も たす → かけ算 だね', fa + ' × ' + b + ' の 式に しよう', '小数点を とって ' + A + ' × ' + b + ' を 計算して、小数点を もどそう'],
      explanation: fa + ' × ' + b + ' ＝ ' + ans + ' です。',
      distractors: uniq([dec(A * b, pl + 1), dec(A * b, Math.max(0, pl - 1)), dec(A * b + 1, pl), dec(A + b, pl)], ans),
      meta: { op: 'dec_mul_int', a: fa, b: String(b) }
    };
  };
  OPS.dec_div_word = function (rng, P) {
    var pl = pick(rng, [1, 2]), D = ri(rng, 2, 9), Q = ri(rng, 11, 99);
    if (Q % 10 === 0) Q += 1;
    var fa = dec(Q * D, pl), fq = dec(Q, pl), C = pick(rng, [
      function () { return fa + 'm の リボンを ' + nin(D) + 'で 同じ 長さずつ 分けます。ひとり分は 何m ですか。'; },
      function () { return fa + 'L の スープを ' + D + 'つの なべに 同じ 量ずつ 分けます。1つに 何L 入りますか。'; },
      function () { return fa + 'kg の 小麦粉を ' + D + 'つの ふくろに 同じ 重さずつ 入れます。1ふくろ 何kg ですか。'; }
    ]);
    return {
      key: [fa, D, C().length], text: C(), answer: fq, mode: 'number',
      hints: ['同じ 数ずつ 分ける → わり算 だね', fa + ' ÷ ' + D + ' の 式に しよう', '商の 小数点は、わられる数の 小数点に そろえよう'],
      explanation: fa + ' ÷ ' + D + ' ＝ ' + fq + ' です。',
      distractors: uniq([dec(Q, pl + 1), dec(Q, Math.max(0, pl - 1)), dec(Q + 1, pl), dec(Q * D, pl)], fq),
      meta: { op: 'dec_div_int', a: fa, b: String(D) }
    };
  };

  // 分数（小4：同じ分母の計算・帯分数。約分は 5年で習うので、約分が 必要な 問題は 作らない）
  OPS.frac_to_mixed = function (rng, P) {
    var d, r, w, n, i;
    for (i = 0; i < 200; i++) { d = ri(rng, 3, 9); w = ri(rng, 1, 4); r = ri(rng, 1, d - 1); if (gcd(r, d) === 1) break; }
    n = w * d + r;
    return {
      key: [n, d], text: n + '/' + d + 'を、帯分数になおしましょう。', answer: w + 'と' + r + '/' + d, accepted: [w + ' ' + r + '/' + d], mode: 'exact',
      hints: ['分子を 分母で わって、商と あまりを 出そう', n + ' ÷ ' + d + ' ＝ ' + w + ' あまり ' + r, '商が 整数の 部分、あまりが 分子に なるよ'],
      explanation: n + ' ÷ ' + d + ' ＝ ' + w + ' あまり ' + r + ' なので、' + n + '/' + d + ' ＝ ' + w + 'と' + r + '/' + d + ' です。',
      distractors: [r + 'と' + w + '/' + d, (w + 1) + 'と' + r + '/' + d, w + 'と' + (r + 1) + '/' + d, w + 'と' + r + '/' + (d + 1)],
      meta: { op: 'frac_to_mixed', n: n, d: d }
    };
  };
  OPS.frac_to_improper = function (rng, P) {
    var d, r, w, i;
    for (i = 0; i < 200; i++) { d = ri(rng, 3, 9); w = ri(rng, 1, 4); r = ri(rng, 1, d - 1); if (gcd(r, d) === 1) break; }
    var n = w * d + r;
    return {
      key: [w, r, d], text: w + 'と' + r + '/' + d + 'を、仮分数になおしましょう。', answer: n + '/' + d, mode: 'exact',
      hints: ['整数の 部分を 分母と 同じ 分数に なおそう', w + ' ＝ ' + (w * d) + '/' + d, '分子どうしを たそう（' + (w * d) + ' ＋ ' + r + '）'],
      explanation: w + ' ＝ ' + (w * d) + '/' + d + ' なので、' + (w * d) + '/' + d + ' ＋ ' + r + '/' + d + ' ＝ ' + n + '/' + d + ' です。',
      distractors: [(w + r) + '/' + d, (w * d) + '/' + d, n + '/' + (d + 1), (n + 1) + '/' + d],
      meta: { op: 'frac_to_improper', w: w, r: r, d: d }
    };
  };
  OPS.frac_same = function (rng, P) {
    var plus = rng() < 0.5, d, n1, n2, i, s;
    for (i = 0; i < 500; i++) {
      d = ri(rng, 3, 9); n1 = ri(rng, 1, d - 1); n2 = ri(rng, 1, d - 1);
      if (!plus && n1 <= n2) continue;
      s = plus ? n1 + n2 : n1 - n2;
      if (gcd(s, d) === 1 && gcd(n1, d) === 1 && gcd(n2, d) === 1) break;
    }
    var r = frac(s, d);
    return {
      key: [n1, n2, d, plus ? 1 : 0], text: n1 + '/' + d + ' ' + (plus ? '+' : '−') + ' ' + n2 + '/' + d + ' = □（仮分数でも 帯分数でも よい）', answer: s + '/' + d, accepted: fmixed(r), mode: 'exact',
      hints: ['分母が 同じなので、分子どうしを 計算しよう', n1 + ' ' + (plus ? '+' : '−') + ' ' + n2 + ' を 計算しよう', '分母は そのまま だよ'],
      explanation: '分母が同じなので、分子どうしを計算します。' + n1 + '/' + d + ' ' + (plus ? '+' : '−') + ' ' + n2 + '/' + d + ' ＝ ' + s + '/' + d + ' です。',
      distractors: [(plus ? n1 + n2 : n1 - n2) + '/' + (d + d), (plus ? n1 + n2 : n1 - n2) + '/' + (plus ? d * 2 : d), (s + 1) + '/' + d, (Math.max(1, s - 1)) + '/' + d],
      meta: { op: plus ? 'frac_add' : 'frac_sub', x: n1 + '/' + d, y: n2 + '/' + d }
    };
  };
  OPS.frac_mixed_op = function (rng, P) {
    var plus = rng() < 0.5, d, w1, w2, n1, n2, T, i;
    for (i = 0; i < 1000; i++) {
      d = ri(rng, 3, 9); w1 = ri(rng, 1, 4); w2 = ri(rng, 1, 3); n1 = ri(rng, 1, d - 1); n2 = ri(rng, 1, d - 1);
      if (gcd(n1, d) !== 1 || gcd(n2, d) !== 1) continue;
      var t1 = w1 * d + n1, t2 = w2 * d + n2;
      if (!plus && t1 <= t2) continue;
      T = plus ? t1 + t2 : t1 - t2;
      if (T % d !== 0 && gcd(T % d, d) === 1) break;
    }
    var r = frac(T, d), m = fmixed(r);
    return {
      key: [w1, n1, w2, n2, d, plus ? 1 : 0], text: w1 + 'と' + n1 + '/' + d + ' ' + (plus ? '+' : '−') + ' ' + w2 + 'と' + n2 + '/' + d + ' = □（帯分数か 仮分数で 答えよう）', answer: T + '/' + d, accepted: m, mode: 'exact',
      hints: ['帯分数を 仮分数に なおして 計算する 方法が あるよ', w1 + 'と' + n1 + '/' + d + ' ＝ ' + (w1 * d + n1) + '/' + d + '、' + w2 + 'と' + n2 + '/' + d + ' ＝ ' + (w2 * d + n2) + '/' + d, '分子どうしを 計算して、分母は そのままに しよう'],
      explanation: '仮分数になおすと ' + (w1 * d + n1) + '/' + d + ' ' + (plus ? '+' : '−') + ' ' + (w2 * d + n2) + '/' + d + ' ＝ ' + T + '/' + d + ' です。',
      distractors: [(T + 1) + '/' + d, (T - 1) + '/' + d, (T + d) + '/' + d, T + '/' + (d + 1)],
      meta: { op: 'frac_mixed_op', w1: w1, n1: n1, w2: w2, n2: n2, d: d, plus: plus }
    };
  };

  // 角
  var ANGLE_NAME = { 90: '直角', 180: '一直線の角', 360: '点のまわりの角' };
  OPS.angle_comp = function (rng, P) {
    var t = pick(rng, P.totals), x = ri(rng, 4, t / 5 - 4) * 5;
    return {
      key: [t, x], text: ANGLE_NAME[t] + '（' + t + '°）を 2つに 分けました。一方が ' + x + '° のとき、もう一方は 何度ですか。', answer: String(t - x), mode: 'number',
      hints: [ANGLE_NAME[t] + 'は ' + t + '° だよ', '2つの 角を 合わせると ' + t + '° に なるよ', t + ' − ' + x + ' を 計算しよう'],
      explanation: t + ' − ' + x + ' ＝ ' + (t - x) + '。もう一方は ' + (t - x) + '° です。',
      distractors: uniq([t + x, x, t - x + 10, t - x - 10, 180 - x], t - x),
      meta: { op: 'angle_comp', t: t, x: x }
    };
  };
  OPS.angle_comp3 = function (rng, P) {
    var t = pick(rng, [180, 360]), lo = t === 180 ? 4 : 12, hi = t === 180 ? 14 : 30, x = ri(rng, lo, hi) * 5, y = ri(rng, lo, hi) * 5, z = t - x - y;
    return {
      key: [t, x, y], text: ANGLE_NAME[t] + '（' + t + '°）を 3つに 分けました。2つが ' + x + '° と ' + y + '° のとき、のこりの 角は 何度ですか。', answer: String(z), mode: 'number',
      hints: ['3つの 角を 合わせると ' + t + '° に なるよ', '分かっている 2つを 先に たそう（' + x + ' + ' + y + '）', t + ' から その 答えを ひこう'],
      explanation: x + ' + ' + y + ' ＝ ' + (x + y) + '、' + t + ' − ' + (x + y) + ' ＝ ' + z + '。のこりは ' + z + '° です。',
      distractors: uniq([x + y, t - x, t - y, z + 10, z - 10], z),
      meta: { op: 'angle_comp3', t: t, x: x, y: y }
    };
  };
  OPS.angle_ruler = function (rng, P) {
    var set = [30, 45, 60, 90], a = pick(rng, set), b = pick(rng, set), plus = rng() < 0.6;
    if (!plus && a <= b) { var t = a; a = b; b = t; if (a === b) { a = 90; b = 45; } }
    var ans = plus ? a + b : a - b;
    return {
      key: [a, b, plus ? 1 : 0], text: '三角じょうぎの ' + a + '° の角と ' + b + '° の角を ' + (plus ? '合わせると、何度の 角に なりますか。' : '重ねて、' + a + '° から ' + b + '° を ひくと、何度の 角に なりますか。'), answer: String(ans), mode: 'number',
      hints: ['三角じょうぎの 角は、30°・45°・60°・90° だよ', a + ' と ' + b + ' を ' + (plus ? 'たそう' : 'ひこう'), a + (plus ? ' + ' : ' − ') + b + ' を 計算しよう'],
      explanation: a + (plus ? ' + ' : ' − ') + b + ' ＝ ' + ans + '。' + ans + '° です。',
      distractors: uniq([plus ? a - b : a + b, ans + 10, ans - 15, ans + 15, 180 - ans], ans),
      meta: { op: 'angle_ruler', a: a, b: b, plus: plus }
    };
  };
  OPS.angle_clock = function (rng, P) {
    var m = ri(rng, 1, 10) * 5, ans = m * 6;
    return {
      key: [m], text: '時計の 長い針が ' + m + '分間に 回る 角度は 何度ですか。', answer: String(ans), mode: 'number',
      hints: ['長い針が 60分で 1回転 → 360° だよ', '1分間で 回る 角度は 360 ÷ 60 ＝ 6°', '6 × ' + m + ' を 計算しよう'],
      explanation: '1分間に 6° 回るので、' + m + '分間では 6 × ' + m + ' ＝ ' + ans + '° です。',
      distractors: uniq([m * 3, m * 12, ans + 30, ans - 30, m * 5], ans),
      meta: { op: 'angle_clock', m: m }
    };
  };

  // 面積
  OPS.area_rect = function (rng, P) {
    var a = ri(rng, 2, 20), b = rng() < 0.25 ? a : ri(rng, 2, 20), sq = a === b, u = pick(rng, ['cm', 'm']), ans = a * b;
    return {
      key: [a, b, u], text: sq ? '1辺が ' + a + u + ' の 正方形の 面積は 何' + u + '² ですか。' : 'たて ' + a + u + '、横 ' + b + u + ' の 長方形の 面積は 何' + u + '² ですか。', answer: String(ans), mode: 'number',
      accepted: [ans + u + '²', ans + u + '2'],
      hints: [sq ? '正方形の 面積 ＝ 1辺 × 1辺' : '長方形の 面積 ＝ たて × 横', a + ' × ' + b + ' を 計算しよう', '答えの 単位は ' + u + '² だよ'],
      explanation: a + ' × ' + b + ' ＝ ' + ans + '。' + ans + u + '² です。',
      distractors: uniq([2 * (a + b), a + b, ans * 10, ans + a, ans - b], ans),
      meta: { op: 'area_rect', a: a, b: b }
    };
  };
  OPS.area_side = function (rng, P) {
    var a = ri(rng, 3, 15), b = ri(rng, 3, 15), S = a * b;
    return {
      key: [S, a], text: '面積が ' + S + 'cm² の 長方形が あります。たてが ' + a + 'cm の とき、横は 何cm ですか。', answer: String(b), mode: 'number',
      accepted: [b + 'cm'],
      hints: ['長方形の 面積 ＝ たて × 横 → 横 ＝ 面積 ÷ たて', S + ' ÷ ' + a + ' を 計算しよう', '□ × ' + a + ' ＝ ' + S + ' の □ を さがしても いいよ'],
      explanation: S + ' ÷ ' + a + ' ＝ ' + b + '。横は ' + b + 'cm です。',
      distractors: uniq([S - a, S + a, a, b + 1, b - 1], b),
      meta: { op: 'area_side', S: S, a: a }
    };
  };
  OPS.area_unit = function (rng, P) {
    var U = pick(rng, P.kinds), k = ri(rng, 2, 9);
    var K = { m2cm2: ['m²', 'cm²', 10000], a: ['a', 'm²', 100], ha: ['ha', 'm²', 10000], km2: ['km²', 'ha', 100], km2m: ['km²', 'm²', 1000000] }[U];
    var ans = k * K[2];
    return {
      key: [U, k], text: k + K[0] + 'は 何' + K[1] + ' ですか。', answer: String(ans), mode: 'number',
      accepted: [ans + K[1]],
      hints: ['1' + K[0] + ' ＝ ' + K[2] + K[1] + ' だよ', k + ' × ' + K[2] + ' を 計算しよう', '0 の 数に 気を つけよう'],
      explanation: '1' + K[0] + ' ＝ ' + K[2] + K[1] + ' なので、' + k + K[0] + ' ＝ ' + ans + K[1] + ' です。',
      distractors: uniq([ans * 10, ans / 10, ans * 100, k * 100, k * 1000], ans),
      meta: { op: 'area_unit', k: k, f: K[2] }
    };
  };
  OPS.area_L = function (rng, P) {
    var A = ri(rng, 8, 20), B = ri(rng, 8, 20), a = ri(rng, 2, A - 3), b = ri(rng, 2, B - 3), ans = A * B - a * b;
    return {
      key: [A, B, a, b], text: 'たて ' + A + 'cm、横 ' + B + 'cm の 長方形から、たて ' + a + 'cm、横 ' + b + 'cm の 長方形を すみから 切り取ります。のこりの 面積は 何cm² ですか。', answer: String(ans), mode: 'number',
      accepted: [ans + 'cm²', ans + 'cm2'],
      hints: ['切り取る 前の 面積から、切り取った 面積を ひこう', A + ' × ' + B + ' ＝ ' + A * B + '、' + a + ' × ' + b + ' ＝ ' + a * b, A * B + ' − ' + a * b + ' を 計算しよう'],
      explanation: A + ' × ' + B + ' − ' + a + ' × ' + b + ' ＝ ' + A * B + ' − ' + a * b + ' ＝ ' + ans + '。' + ans + 'cm² です。',
      distractors: uniq([A * B + a * b, A * B, a * b, 2 * (A + B), ans + a, ans - b], ans),
      meta: { op: 'area_L', A: A, B: B, a: a, b: b }
    };
  };

  // 式と計算
  OPS.calc_rule = function (rng, P) {
    var pr = pick(rng, [[25, 4], [125, 8], [5, 2], [50, 2], [15, 2], [25, 8]]), a = pr[0], c = pr[1], d = ri(rng, 3, 9), b = c * d, ans = a * b;
    return {
      key: [a, b, c], text: a + ' × ' + b + ' を、(' + a + ' × ' + c + ') × ' + d + ' と 考えて 計算します。答えは いくつですか。', answer: String(ans), mode: 'number',
      hints: ['かけ算は、かける じゅんばんを かえても 答えは 同じ（結合のきまり）', '先に ' + a + ' × ' + c + ' ＝ ' + a * c + ' を 計算しよう', a * c + ' × ' + d + ' を 計算しよう'],
      explanation: a + ' × ' + b + ' ＝ ' + a + ' × ' + c + ' × ' + d + ' ＝ ' + a * c + ' × ' + d + ' ＝ ' + ans + ' です。',
      distractors: uniq([ans + a, ans - a, a * c + d, ans * 10, a * d], ans),
      meta: { op: 'calc_rule', a: a, b: b }
    };
  };
  OPS.order3 = function (rng, P) {
    var form = pick(rng, ['a/(b+c)*d', 'a-b/c', '(a+b)/c']), a, b, c, d, ans, text, first, hint;
    if (form === 'a/(b+c)*d') { b = ri(rng, 2, 6); c = ri(rng, 2, 6); d = ri(rng, 2, 9); a = (b + c) * ri(rng, 2, 9); ans = a / (b + c) * d; text = a + ' ÷ (' + b + ' + ' + c + ') × ' + d; first = b + ' + ' + c; hint = '( ) の 中を 先に 計算し、あとは 左から じゅんに 計算しよう'; }
    else if (form === 'a-b/c') { c = ri(rng, 2, 9); b = c * ri(rng, 2, 9); a = b / c + ri(rng, 1, 30); ans = a - b / c; d = 0; text = a + ' − ' + b + ' ÷ ' + c; first = b + ' ÷ ' + c; hint = 'わり算は、ひき算より 先に 計算するよ'; }
    else { c = ri(rng, 2, 9); var q = ri(rng, 2, 12); a = ri(rng, 1, c * q - 1); b = c * q - a; ans = q; d = 0; text = '(' + a + ' + ' + b + ') ÷ ' + c; first = a + ' + ' + b; hint = '( ) の 中を 先に 計算するよ'; }
    return {
      key: [form.replace(/[()]/g, 'k').replace('/', 'd').replace('*', 't').replace('+', 'p').replace('-', 'm'), a, b, c, d], text: text + ' = □', answer: String(ans), mode: 'number',
      hints: [hint, 'まず ' + first + ' を 計算しよう', 'その 答えを 使って、のこりを 計算しよう'],
      explanation: '先に ' + first + ' を計算します。' + text + ' ＝ ' + ans + ' です。',
      distractors: uniq([ans + 1, ans - 1, ans * 2, ans + 10, Math.round(ans / 2)], ans),
      meta: { op: 'order3', form: form, a: a, b: b, c: c, d: d }
    };
  };

  // 変わり方
  OPS.change_rule = function (rng, P) {
    var form = pick(rng, P.forms), a, b, s, n, v, text, rule;
    if (form === 'mul') { a = ri(rng, 2, 9); b = 0; s = 1; n = ri(rng, 5, 15); rule = '○ ＝ ' + a + ' × □'; }
    else if (form === 'sum') { b = ri(rng, 20, 60); a = 1; s = -1; n = ri(rng, 5, b - 5); rule = '□ + ○ ＝ ' + b; }
    else if (form === 'lin') { a = ri(rng, 2, 6); b = ri(rng, 1, 9); s = 1; n = ri(rng, 5, 15); rule = '○ ＝ ' + a + ' × □ + ' + b; }
    else { a = ri(rng, 2, 6); b = ri(rng, 40, 80); s = -1; n = ri(rng, 5, Math.floor((b - 1) / a)); rule = '○ ＝ ' + b + ' − ' + a + ' × □'; }
    var vals = [1, 2, 3].map(function (i) { return s * a * i + b; }), ans = s * a * n + b;
    if (form === 'sum') text = '□ と ○ を 合わせた 数は いつも ' + b + ' です。□ が ' + n + ' のとき、○ は いくつですか。';
    else text = '□ が 1、2、3 のとき、○ は ' + vals.join('、') + ' に なります。□ が ' + n + ' のとき、○ は いくつですか。';
    return {
      key: [form, a, b, n], text: text, answer: String(ans), mode: 'number',
      hints: form === 'sum' ? ['合わせると ' + b + ' → ○ ＝ ' + b + ' − □', b + ' − ' + n + ' を 計算しよう', '答えを たして ' + b + ' に なるか 確かめよう'] : ['□ が 1 ふえると ○ が いくつ 変わるか 見よう', '○ と □ の 関係を 式に しよう（' + rule + '）', '□ に ' + n + ' を 入れて 計算しよう'],
      explanation: (form === 'sum' ? '○ ＝ ' + b + ' − □ なので、' + b + ' − ' + n + ' ＝ ' + ans : rule + ' の □ に ' + n + ' を 入れて、○ ＝ ' + ans) + ' です。',
      distractors: uniq([ans + a, ans - a, ans + 1, ans - 1, a * n, vals[2] + a * (n - 3) + (s > 0 ? a : -a)], ans),
      meta: { op: 'change_rule', a: a, b: b, s: s, n: n }
    };
  };

  // 倍の見方
  OPS.ratio_times = function (rng, P) {
    var A = ri(rng, 2, 12), k = ri(rng, 2, 9), B = A * k;
    var names = pick(rng, [['青い ロープ', '赤い ロープ', '長さ', 'm'], ['小さい 箱', '大きい 箱', '重さ', 'kg'], ['弟の 木', '兄の 木', '高さ', 'm'], ['短い 板', '長い 板', '長さ', 'cm']]);
    return {
      key: [A, B, names[3], names[0]], text: names[0] + 'の ' + names[2] + 'は ' + A + names[3] + '、' + names[1] + 'の ' + names[2] + 'は ' + B + names[3] + ' です。' + names[1] + 'の ' + names[2] + 'は、' + names[0] + 'の ' + names[2] + 'の 何倍ですか。', answer: String(k), mode: 'number',
      hints: ['もとに する 大きさは ' + names[0] + ' の ' + names[2] + ' だよ', B + ' ÷ ' + A + ' を 計算しよう', '「何倍」は わり算で 求められるよ'],
      explanation: B + ' ÷ ' + A + ' ＝ ' + k + '。' + k + '倍です。',
      distractors: uniq([A / B, k + 1, k - 1, B - A, k * 2], k),
      meta: { op: 'ratio_times', A: A, B: B }
    };
  };
  OPS.ratio_of = function (rng, P) {
    var a = ri(rng, 2, 20), k = ri(rng, 2, 9), inv = P.inv ? rng() < 0.6 : false, N = a * k;
    return {
      key: [a, k, inv ? 1 : 0], text: inv ? 'ある 長さの ' + k + '倍が ' + N + 'm です。もとの 長さは 何m ですか。' : a + 'm の ' + k + '倍は 何m ですか。', answer: String(inv ? a : N), mode: 'number',
      accepted: [(inv ? a : N) + 'm'],
      hints: inv ? ['もとの 長さ × ' + k + ' ＝ ' + N + ' だよ', N + ' ÷ ' + k + ' を 計算しよう', '求めた 数に ' + k + ' を かけて 確かめよう'] : ['「' + k + '倍」は ' + k + ' 回ぶんの 大きさ', a + ' × ' + k + ' を 計算しよう', '答えの 単位は m だよ'],
      explanation: inv ? N + ' ÷ ' + k + ' ＝ ' + a + '。もとの 長さは ' + a + 'm です。' : a + ' × ' + k + ' ＝ ' + N + '。' + N + 'm です。',
      distractors: uniq(inv ? [N * k, N - k, a + 1, a - 1, k] : [a + k, N + a, N - a, a / k, N * 2], inv ? a : N),
      meta: { op: 'ratio_of', a: a, k: k, inv: inv }
    };
  };

  // OPS.order と OPS.dec_mul_int を、小4用の設定で使えるように広げる
  var orderOrig = OPS.order;
  OPS.order = function (rng, P) {
    if (!P.forms) return orderOrig(rng, P);
    var a = ri(rng, 2, 30), b = ri(rng, 2, 9), c = ri(rng, 2, 9), form = pick(rng, P.forms);
    if (form === 'a-bc' && a < b * c) a += b * c;
    var text, ans, first, wrong;
    if (form === 'a+bc') { text = a + ' + ' + b + ' × ' + c; ans = a + b * c; first = b + ' × ' + c; wrong = (a + b) * c; }
    else if (form === '(a+b)c') { text = '(' + a + ' + ' + b + ') × ' + c; ans = (a + b) * c; first = a + ' + ' + b; wrong = a + b * c; }
    else if (form === 'a-bc') { text = a + ' − ' + b + ' × ' + c; ans = a - b * c; first = b + ' × ' + c; wrong = (a - b) * c; }
    else { text = a + ' × ' + b + ' − ' + c; ans = a * b - c; first = a + ' × ' + b; wrong = a * (b - c); }
    return {
      key: [form.replace(/[()]/g, 'k').replace('+', 'p').replace('-', 'm'), a, b, c], text: text + ' = □', answer: String(ans), mode: 'number',
      hints: [form === '(a+b)c' ? '( ) の 中を 先に 計算するよ' : 'かけ算は、たし算・ひき算より 先に 計算するよ', 'まず ' + first + ' を 計算しよう', 'その 答えを 使って、のこりを 計算しよう'],
      explanation: '先に ' + first + ' を計算します。' + text + ' ＝ ' + ans + ' です。',
      distractors: [wrong, ans + 1, ans - 1, ans + 10].filter(function (v) { return v >= 0; }).map(String),
      meta: { op: 'order', form: form, a: a, b: b, c: c }
    };
  };
  var decMulIntOrig = OPS.dec_mul_int;
  OPS.dec_mul_int = function (rng, P) {
    if (!P.b) return decMulIntOrig(rng, P);
    var pl = pick(rng, P.places), A = ri(rng, 11, P.max * pow10(pl));
    if (A % 10 === 0) A += 1;
    var b = ri(rng, P.b[0], P.b[1]), fa = dec(A, pl), ans = dec(A * b, pl);
    return {
      key: [fa, b], text: fa + ' × ' + b + ' = □', answer: ans, mode: 'number',
      hints: ['小数点を とって、' + A + ' × ' + b + ' を 計算しよう', fa + ' は ' + A + ' を ' + pow10(pl) + ' で わった 数だね', '整数の 答えの 小数点を、左へ ' + pl + ' けた うごかそう'],
      explanation: A + ' × ' + b + ' = ' + A * b + ' なので、' + fa + ' × ' + b + ' = ' + ans + ' です。',
      distractors: [dec(A * b, pl + 1), dec(A * b, Math.max(0, pl - 1)), dec(A * b + pow10(pl), pl), dec(A * b - 1, pl)],
      meta: { op: 'dec_mul_int', a: fa, b: String(b) }
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
    4: null,   // 小4は、下の UNIT_GEN（単元ごとの設定）から作る
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


  // ---- 単元ごとの設定（小4。判断226） ----
  // UNIT_GEN[学年][単元 id][難易度] = [{ op, p }]。単元 id は js/units.js に登録した id。
  // 計算だけの問題と、数を入れかえる文章題を、単元ごとに自動で作る。図の問題・読み取りの問題は questions/ に手で作る。
  var UNIT_GEN = {
    4: {
      large: {
        basic: [{ op: 'big_read', p: { hi: ['億'] } }, { op: 'big_scale', p: { units: ['万', '億'], k: [10, 100] } }],
        standard: [{ op: 'big_read', p: { hi: ['億', '兆'] } }, { op: 'big_scale', p: { units: ['億', '兆'], k: [10, 100] } }, { op: 'mul', p: { a: [100, 999], b: [11, 99] } }],
        advanced: [{ op: 'mul', p: { a: [100, 999], b: [100, 999] } }, { op: 'big_read', p: { hi: ['兆'] } }]
      },
      round: {
        basic: [{ op: 'round_to', p: { digits: [4, 5], places: ['百', '千'] } }],
        standard: [{ op: 'round_to', p: { digits: [5, 6], places: ['千', '万'] } }, { op: 'round_top', p: { digits: [4, 5, 6], tops: [2] } }],
        advanced: [{ op: 'round_est', p: { places: ['百', '千'] } }, { op: 'round_range', p: { places: ['十', '百', '千'] } }, { op: 'round_top', p: { digits: [5, 6], tops: [1, 2] } }]
      },
      divide1: {
        basic: [{ op: 'div', p: { b: [2, 9], q: [11, 99] } }],
        standard: [{ op: 'divrem', p: { b: [3, 9], q: [11, 99] } }, { op: 'div_ceil', p: { b: [3, 9], q: [5, 30] } }],
        advanced: [{ op: 'div', p: { b: [6, 9], q: [100, 180] } }, { op: 'div_ceil', p: { b: [6, 9], q: [30, 90] } }]
      },
      divide2: {
        basic: [{ op: 'div_tens', p: {} }],
        standard: [{ op: 'div', p: { b: [11, 29], q: [2, 30] } }],
        advanced: [{ op: 'divq', p: { b: [11, 29], q: [10, 40] } }, { op: 'divrem', p: { b: [11, 29], q: [10, 40] } }, { op: 'div_ceil', p: { b: [12, 29], q: [10, 40] } }]
      },
      decimal: {
        basic: [{ op: 'dec_unit', p: {} }],
        standard: [{ op: 'dec_add', p: { places: [1, 2], max: 20 } }, { op: 'dec_sub', p: { places: [1, 2], max: 20 } }],
        advanced: [{ op: 'dec_max', p: {} }, { op: 'dec_add', p: { places: [2, 3], max: 10 } }, { op: 'dec_sub', p: { places: [2, 3], max: 10 } }]
      },
      decimal_calc: {
        basic: [{ op: 'dec_mul_int', p: { places: [1], max: 9 } }, { op: 'dec_mul_word', p: {} }],
        standard: [{ op: 'dec_mul_int', p: { places: [1, 2], max: 30, b: [2, 9] } }, { op: 'dec_div_int', p: { places: [1, 2], d: [2, 9] } }, { op: 'dec_div_word', p: {} }],
        advanced: [{ op: 'dec_mul_int', p: { places: [1, 2], max: 30, b: [11, 29] } }, { op: 'dec_div_int', p: { places: [1, 2], d: [11, 29] } }]
      },
      fraction: {
        basic: [{ op: 'frac_to_mixed', p: {} }, { op: 'frac_to_improper', p: {} }],
        standard: [{ op: 'frac_same', p: {} }],
        advanced: [{ op: 'frac_mixed_op', p: {} }]
      },
      angle: {
        basic: [{ op: 'angle_comp', p: { totals: [90, 180] } }],
        standard: [{ op: 'angle_ruler', p: {} }, { op: 'angle_comp', p: { totals: [360] } }],
        advanced: [{ op: 'angle_clock', p: {} }, { op: 'angle_comp3', p: {} }]
      },
      area: {
        basic: [{ op: 'area_rect', p: {} }],
        standard: [{ op: 'area_side', p: {} }, { op: 'area_unit', p: { kinds: ['m2cm2', 'a'] } }],
        advanced: [{ op: 'area_L', p: {} }, { op: 'area_unit', p: { kinds: ['ha', 'km2', 'km2m'] } }]
      },
      expression: {
        basic: [{ op: 'order', p: { forms: ['a+bc', '(a+b)c'] } }],
        standard: [{ op: 'order', p: { forms: ['a-bc', 'ab-c'] } }, { op: 'calc_rule', p: {} }],
        advanced: [{ op: 'order3', p: {} }]
      },
      change: {
        basic: [{ op: 'change_rule', p: { forms: ['mul', 'sum'] } }],
        standard: [{ op: 'change_rule', p: { forms: ['lin'] } }],
        advanced: [{ op: 'change_rule', p: { forms: ['neg'] } }]
      },
      ratio: {
        basic: [{ op: 'ratio_times', p: {} }],
        standard: [{ op: 'ratio_of', p: {} }],
        advanced: [{ op: 'ratio_of', p: { inv: true } }, { op: 'ratio_times', p: {} }]
      }
    }
  };
  // 学年全体の設定（昇格試験・探索・戦闘・実力診断が使う）：その学年の全単元の設定を、難易度ごとに並べる
  Object.keys(UNIT_GEN).forEach(function (g) {
    GEN_CONFIG[g] = {};
    ['basic', 'standard', 'advanced'].forEach(function (d) {
      GEN_CONFIG[g][d] = [];
      Object.keys(UNIT_GEN[g]).forEach(function (u) {
        (UNIT_GEN[g][u][d] || []).forEach(function (e) { GEN_CONFIG[g][d].push({ op: e.op, p: e.p, unit: u }); });
      });
    });
  });

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

  function make(grade, entry, difficulty, answerType, rng) {
    var s = OPS[entry.op](rng, entry.p);
    var q = {
      id: idOf(grade, entry.op, s.key),
      subject: 'math',
      gradeLevel: grade,
      unit: entry.unit || entry.op,
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

  // grade: 1〜9、difficulty: basic | standard | advanced、answerType: choice | input
  function generate(grade, difficulty, answerType, rng) {
    rng = rng || Math.random;
    var list = GEN_CONFIG[grade] && GEN_CONFIG[grade][difficulty];
    if (!list || !list.length) return null;
    return make(grade, pick(rng, list), difficulty, answerType, rng);
  }

  // 単元を指定して作る（単元の設定がなければ null）。単元の id は js/units.js のもの
  function unitSupports(grade, unit, difficulty) {
    var u = UNIT_GEN[grade] && UNIT_GEN[grade][unit];
    return !!(u && u[difficulty] && u[difficulty].length);
  }
  function unitsWithGenerators(grade) { return Object.keys(UNIT_GEN[grade] || {}); }
  function generateForUnit(grade, unit, difficulty, answerType, rng) {
    rng = rng || Math.random;
    if (!unitSupports(grade, unit, difficulty)) return null;
    var e = pick(rng, UNIT_GEN[grade][unit][difficulty]);
    return make(grade, { op: e.op, p: e.p, unit: unit }, difficulty, answerType, rng);
  }

  function supports(subject, grade, difficulty) {
    return subject === 'math' && !!(GEN_CONFIG[grade] && GEN_CONFIG[grade][difficulty]);
  }

  FF.generators = {
    GEN_CONFIG: GEN_CONFIG,
    OPS: OPS,
    generate: generate,
    generateForUnit: generateForUnit,
    unitSupports: unitSupports,
    unitsWithGenerators: unitsWithGenerators,
    UNIT_GEN: UNIT_GEN,
    supports: supports,
    // テスト用に公開
    _frac: { frac: frac, fstr: fstr, gcd: gcd }
  };
})(this);
