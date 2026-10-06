// 学習の履歴（サーバーの attempts）の集計（保護者の記録画面用。SPEC_sync.md 7章・判断304）。純粋関数のみ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // 時刻（ms）→ 端末の日付 'YYYY-MM-DD'。tzOffset は Date#getTimezoneOffset() の値（分。日本は -540）
  function dayKey(at, tzOffset) {
    var d = new Date(at - (tzOffset || 0) * 60000);
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }

  function baseId(qid) { return String(qid).replace(/#input$/, ''); }

  function rate(c, n) { return n ? c / n : 0; }

  // rows：{ attempt_id, at, qid, subject, grade, correct, points } の配列
  // opts：now（ms）, tzOffset, days（日ごとのグラフの日数。既定14）, lookup(qid) → { subject, grade, unit, unitName, question } か null,
  //       minUnitTries（弱い単元に数える最低の回答数。既定5）, minMissed（よく間違える問題に数える最低の誤答数。既定2）, limit（一覧の件数）
  function summarize(rows, opts) {
    opts = opts || {};
    var tz = opts.tzOffset || 0, days = opts.days || 14, now = opts.now || 0;
    var minUnit = opts.minUnitTries || 5, minMissed = opts.minMissed || 2, limit = opts.limit || 5;
    var lookup = opts.lookup || function () { return null; };

    var seen = {}, list = [];
    (rows || []).forEach(function (r) {
      if (!r || typeof r.at !== 'number' || typeof r.correct !== 'boolean' || typeof r.qid !== 'string') return;
      var id = r.attempt_id || (r.at + '-' + r.qid);
      if (seen[id]) return;
      seen[id] = true;
      list.push(r);
    });

    var total = { answered: 0, correct: 0, points: 0, activeDays: 0, streak: 0, firstAt: null, lastAt: null };
    var dayMap = {}, subj = {}, unit = {}, missed = {};
    list.forEach(function (r) {
      total.answered++;
      if (r.correct) total.correct++;
      total.points += typeof r.points === 'number' ? r.points : 0;
      if (total.firstAt === null || r.at < total.firstAt) total.firstAt = r.at;
      if (total.lastAt === null || r.at > total.lastAt) total.lastAt = r.at;

      var k = dayKey(r.at, tz);
      var d = dayMap[k] = dayMap[k] || { day: k, answered: 0, correct: 0, points: 0 };
      d.answered++; if (r.correct) d.correct++; d.points += typeof r.points === 'number' ? r.points : 0;

      if (r.subject) {
        var s = subj[r.subject] = subj[r.subject] || { subject: r.subject, answered: 0, correct: 0 };
        s.answered++; if (r.correct) s.correct++;
      }

      var id = baseId(r.qid), info = lookup(id);
      var uk = info && info.unit ? [info.subject, info.grade, info.unit].join('|') : '?|' + (r.subject || '') + '|' + (r.grade || '');
      var u = unit[uk] = unit[uk] || {
        key: uk, subject: info && info.unit ? info.subject : (r.subject || null), grade: info && info.unit ? info.grade : (typeof r.grade === 'number' ? r.grade : null),
        unit: info && info.unit ? info.unit : null, name: info && info.unitName ? info.unitName : null, answered: 0, correct: 0
      };
      u.answered++; if (r.correct) u.correct++;

      var m = missed[id] = missed[id] || { qid: id, tries: 0, wrong: 0, lastAt: 0, question: info && info.question ? info.question : null, subject: r.subject || null, grade: typeof r.grade === 'number' ? r.grade : null };
      m.tries++; if (!r.correct) m.wrong++; if (r.at > m.lastAt) m.lastAt = r.at;
    });
    total.activeDays = Object.keys(dayMap).length;

    // 日ごと（古い日 → 今日。ない日は 0）
    var daily = [];
    for (var i = days - 1; i >= 0; i--) {
      var key = dayKey(now - i * 86400000, tz);
      daily.push(dayMap[key] || { day: key, answered: 0, correct: 0, points: 0 });
    }
    // 連続して学習した日数（今日まだなら、昨日から数える）
    var back = dayMap[dayKey(now, tz)] ? 0 : 1, streak = 0;
    while (dayMap[dayKey(now - back * 86400000, tz)]) { streak++; back++; }
    total.streak = streak;

    var bySubject = Object.keys(subj).map(function (k) { var s = subj[k]; s.rate = rate(s.correct, s.answered); return s; })
      .sort(function (a, b) { return b.answered - a.answered; });
    var units = Object.keys(unit).map(function (k) { var u = unit[k]; u.rate = rate(u.correct, u.answered); return u; });
    var weakUnits = units.filter(function (u) { return u.unit && u.answered >= minUnit; })
      .sort(function (a, b) { return (a.rate - b.rate) || (b.answered - a.answered); }).slice(0, limit);
    var byUnit = units.sort(function (a, b) { return b.answered - a.answered; });
    var missedList = Object.keys(missed).map(function (k) { var m = missed[k]; m.rate = rate(m.wrong, m.tries); return m; })
      .filter(function (m) { return m.wrong >= minMissed; })
      .sort(function (a, b) { return (b.wrong - a.wrong) || (b.rate - a.rate) || (b.lastAt - a.lastAt); }).slice(0, limit * 2);

    total.rate = rate(total.correct, total.answered);
    return { total: total, daily: daily, bySubject: bySubject, byUnit: byUnit, weakUnits: weakUnits, missed: missedList };
  }

  // グラフの縦軸：max までが入る「きりのよい」上限と、目盛り（0 から、等間隔。多くても count + 1 本）
  function niceTicks(max, count) {
    count = count || 4;
    var m = Math.max(1, Math.ceil(max || 0));
    var steps = [1, 2, 5], mag = 1, step = 1;
    for (var guard = 0; guard < 30; guard++) {
      var found = false;
      for (var i = 0; i < steps.length; i++) {
        step = steps[i] * mag;
        if (Math.ceil(m / step) <= count) { found = true; break; }
      }
      if (found) break;
      mag *= 10;
    }
    var top = Math.ceil(m / step) * step, ticks = [];
    for (var v = 0; v <= top; v += step) ticks.push(v);
    return { max: top, step: step, ticks: ticks };
  }

  FF.analytics = { dayKey: dayKey, summarize: summarize, niceTicks: niceTicks };
})(this);
