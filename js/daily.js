// その日に獲得できる資材の割り当て（判断319）。純粋関数：DOM・localStorage に触れない。
// 5つの教科のうち4つに、4つの資材を1つずつ割り当て、あまる1教科は「ランダム」（「☆」。獲得できる資材は、問題ごとに4つのうちのどれか、その場で決まる）。
// 割り当ては「日付」だけから決まる（朝4時で切りかわる）。同じ日なら、どの端末でも同じになる。前の日と、どの教科も同じ資材（ランダム）にならない。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  var SUBJECT_IDS = ['math', 'japanese', 'science', 'social', 'english'];

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // 朝4時（balance.DAILY_RESOURCE.RESET_HOUR）までは、前の日として数える。tzOffset：分（new Date().getTimezoneOffset() と同じ向き）
  function dayKey(now, tzOffset) {
    var off = typeof tzOffset === 'number' ? tzOffset : new Date(now).getTimezoneOffset();
    var d = new Date(now - off * 60000 - FF.balance.DAILY_RESOURCE.RESET_HOUR * 3600000);
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }

  // 文字列 → 32ビットの種（FNV-1a）と、それから作る乱数（mulberry32）
  function seedOf(text) {
    var h = 2166136261;
    for (var i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(list, rand) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // 日付の文字列（'2026-10-06'）→ 通し番号（UTC の日数）
  function dayIndex(key) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(key));
    return m ? Math.round(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000) : null;
  }
  var EPOCH = Math.round(Date.UTC(2026, 0, 1) / 86400000);   // ここから1日ずつ決めていく（前の日と重ならないようにするため）
  var memo = {};

  // 1日ぶんの割り当て：5つの「枠」（4つの資材と「ランダム」）を、5教科に1つずつ。
  // 前の日と、どの教科も同じ枠にならない（同じ資材が2日つづけて当たらない。ランダムも2日つづけない）。
  function build(n, prev) {
    var rand = rng(seedOf('ff-daily-resource:' + n));
    var slots = FF.defs.RESOURCES.map(function (r) { return r.id; }).concat([null]);   // null ＝ ランダム
    var order = null;
    for (var t = 0; t < 200 && !order; t++) {
      var subjects = shuffle(SUBJECT_IDS, rand), rs = shuffle(slots, rand), ok = true;
      if (prev) for (var i = 0; i < subjects.length; i++) if (prev.bySubject[subjects[i]].resource === rs[i]) { ok = false; break; }
      if (ok) order = { subjects: subjects, slots: rs };
    }
    if (!order) {   // 見つからなければ（まず起きない）、前の日の枠を1つずつずらす（かならず、どの教科も別の枠になる）
      var ps = SUBJECT_IDS.slice(), pr = ps.map(function (s) { return prev.bySubject[s].resource; });
      order = { subjects: ps, slots: pr.slice(1).concat(pr.slice(0, 1)) };
    }
    var bySubject = {}, subjectOf = {};
    order.subjects.forEach(function (sub, i) {
      var r = order.slots[i];
      bySubject[sub] = { resource: r, random: r === null };
      if (r !== null) subjectOf[r] = sub;
    });
    return { day: null, bySubject: bySubject, subjectOf: subjectOf };
  }

  // key：dayKey の文字列。返す値：
  //   { day, bySubject: { math: { resource, random }, ... }（random の教科は resource が null）, subjectOf: { wood: 'math', ... }（その資材が決まっている教科）}
  // 同じ日付なら、いつ・どの端末で呼んでも同じ（2026-01-01 から1日ずつ、前の日をもとに決める）。
  function assign(key) {
    var n = dayIndex(key);
    if (n === null) { var r0 = build(seedOf(String(key)), null); r0.day = key; return r0; }
    if (n < EPOCH) { var r1 = build(n, null); r1.day = key; return r1; }
    if (!memo[n]) {
      var start = n, prev = null;
      while (start > EPOCH && !memo[start - 1]) start--;
      prev = start > EPOCH ? memo[start - 1] : null;
      for (var i = start; i <= n; i++) { var d = build(i, prev); d.day = null; memo[i] = prev = d; }
    }
    var out = memo[n];
    return { day: key, bySubject: out.bySubject, subjectOf: out.subjectOf };
  }

  function today(now, tzOffset) { return assign(dayKey(now, tzOffset)); }
  // その日、その教科で獲得できる資材の id（ランダムの教科は null）
  function resourceFor(subject, now, tzOffset) { var e = today(now, tzOffset).bySubject[subject]; return e ? e.resource : null; }

  FF.daily = { dayKey: dayKey, assign: assign, today: today, resourceFor: resourceFor, SUBJECT_IDS: SUBJECT_IDS, _clear: function () { memo = {}; } };
})(this);
