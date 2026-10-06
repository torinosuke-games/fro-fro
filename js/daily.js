// その日に獲得できる資材の割り当て（判断319）。純粋関数：DOM・localStorage に触れない。
// 5つの教科のうち4つに、4つの資材を1つずつ割り当て、あまる1教科は「ランダム」（「☆」。獲得できる資材は、問題ごとに4つのうちのどれか、その場で決まる）。
// 割り当ては「日付」だけから決まる（朝4時で切りかわる）。同じ日なら、どの端末でも同じになる。
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

  // key：dayKey の文字列。返す値：
  //   { day, bySubject: { math: { resource, random }, ... }（random の教科は resource が null）, subjectOf: { wood: 'math', ... }（その資材が決まっている教科）}
  function assign(key) {
    var rand = rng(seedOf('ff-daily-resource:' + key));   // ランダムの教科の資材は、ここでは決めない（問題ごとに決める）
    var resources = FF.defs.RESOURCES.map(function (r) { return r.id; });
    var subjects = shuffle(SUBJECT_IDS, rand), rs = shuffle(resources, rand);
    var bySubject = {}, subjectOf = {};
    for (var i = 0; i < rs.length; i++) {
      bySubject[subjects[i]] = { resource: rs[i], random: false };
      subjectOf[rs[i]] = subjects[i];
    }
    bySubject[subjects[rs.length]] = { resource: null, random: true };
    return { day: key, bySubject: bySubject, subjectOf: subjectOf };
  }

  function today(now, tzOffset) { return assign(dayKey(now, tzOffset)); }
  // その日、その教科で獲得できる資材の id（ランダムの教科は null）
  function resourceFor(subject, now, tzOffset) { var e = today(now, tzOffset).bySubject[subject]; return e ? e.resource : null; }

  FF.daily = { dayKey: dayKey, assign: assign, today: today, resourceFor: resourceFor, SUBJECT_IDS: SUBJECT_IDS };
})(this);
