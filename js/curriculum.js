// リニューアルの出題条件。報酬・正答率・チケットの計算は元の learning / rewards / points を使う。
// 単元は js/units.js に教科・学年ごとに登録する（判断221）。問題の出どころ（collection）では区別しない。
(function (root) {
  'use strict';
  var FF = root.FF;
  var DIFF_ORDER = ['basic', 'standard', 'advanced'];
  function baseId(q) { return q.derivedFrom || q.id.replace(/#input$/, ''); }
  // 問題マップの並び：単元の順 → 単元の中の番号（number）→ 難易度 → ID
  function compare(a, b) {
    var U = FF.units;
    return (U.order(a.subject, a.gradeLevel, a.unit) - U.order(b.subject, b.gradeLevel, b.unit)) ||
      ((a.number != null ? a.number : Infinity) - (b.number != null ? b.number : Infinity)) ||
      (DIFF_ORDER.indexOf(a.difficulty) - DIFF_ORDER.indexOf(b.difficulty)) ||
      (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  }
  function pool(bank, sel) {
    return Object.keys(bank.byId).map(function (id) { return bank.byId[id]; }).filter(function (q) {
      return q.subject === sel.subject && q.gradeLevel === sel.grade && q.answerType === sel.answerType &&
        (!sel.unit || sel.unit === 'all' || q.unit === sel.unit) &&
        (!sel.difficulty || sel.difficulty === 'random' || q.difficulty === sel.difficulty);
    }).sort(compare);
  }
  // 単元の登録がない教科・学年の「すべての単元」は、元の出題（算数は自動生成も混ぜる）を使う
  function usesGenerated(sel) {
    return !FF.units.has(sel.subject, sel.grade) && (!sel.unit || sel.unit === 'all');
  }
  // 単元を登録した学年で、自動生成できる（単元 × 難易度）の組み合わせ（js/generators.js の UNIT_GEN。判断226）
  function genCombos(sel) {
    if (sel.subject !== 'math' || !FF.units.has(sel.subject, sel.grade)) return [];
    var units = (!sel.unit || sel.unit === 'all') ? FF.generators.unitsWithGenerators(sel.grade) : [sel.unit];
    var diffs = (!sel.difficulty || sel.difficulty === 'random') ? DIFF_ORDER : [sel.difficulty], out = [];
    units.forEach(function (u) { diffs.forEach(function (d) { if (FF.generators.unitSupports(sel.grade, u, d)) out.push({ unit: u, difficulty: d }); }); });
    return out;
  }
  function recentScore(q, ctx) {
    return FF.rewards.countRecentCorrect(ctx.correctLog, q.id, ctx.now) * 10 + ((ctx.recentIds || []).indexOf(q.id) >= 0 ? 5 : 0);
  }
  function pickGenerated(sel, combos, ctx, rng) {
    var best = null, min = Infinity, n = FF.balance.PICK.CANDIDATES;
    for (var i = 0; i < n; i++) {
      var c = combos[Math.floor(rng() * combos.length)];
      var q = FF.generators.generateForUnit(sel.grade, c.unit, c.difficulty, sel.answerType, rng);
      if (!q) continue;
      var sc = recentScore(q, ctx);
      if (sc < min) { min = sc; best = q; }
    }
    return best;
  }
  function pick(bank, sel, ctx) {
    if (usesGenerated(sel) && sel.subject === 'math') return FF.learning.pickQuestion(bank, sel, ctx);
    var list = pool(bank, sel), rng = ctx.rng || Math.random, combos = genCombos(sel), P = FF.balance.PICK;
    if (combos.length) {
      // 手作りの問題が少ないほど、自動生成を多く混ぜる（手作りが UNIT_GEN_FULL_POOL 問以上なら、決めた割合）
      var base = (!sel.unit || sel.unit === 'all') ? P.UNIT_GEN_SHARE_ALL : P.UNIT_GEN_SHARE;
      var share = list.length ? Math.max(base, 1 - list.length / P.UNIT_GEN_FULL_POOL) : 1;
      if (rng() < share) { var g = pickGenerated(sel, combos, ctx, rng); if (g) return g; }
    }
    if (!list.length) {
      if (usesGenerated(sel)) return FF.learning.pickQuestion(bank, sel, ctx);
      return null;
    }
    var best = [], min = Infinity;
    list.forEach(function (q) {
      var n = recentScore(q, ctx);
      if (n < min) { min = n; best = [q]; } else if (n === min) best.push(q);
    });
    // 手作りの問題が、直近に出した・24時間以内に正解した問題しか残っていないときは、自動生成で新しい問題を出す
    if (min > 0 && combos.length) { var g2 = pickGenerated(sel, combos, ctx, rng); if (g2) return g2; }
    return best[Math.floor(rng() * best.length)];
  }
  function scarcest(state) { return FF.defs.RESOURCES.reduce(function (best, r) { return state.resources[r.id] < state.resources[best] ? r.id : best; }, 'wood'); }
  // 教科・学年の登録問題（選択問題と、それから作った書き問題は1問と数える）
  function questions(bank, subject, grade) {
    var seen = {}, out = [];
    Object.keys(bank.byId).forEach(function (id) {
      var q = bank.byId[id];
      if (q.subject !== subject || q.gradeLevel !== grade) return;
      var key = baseId(q);
      if (seen[key]) return;
      seen[key] = true; out.push(q);
    });
    return out;
  }
  // 問題の通し番号（教科・学年の中で、単元の順に 1 から。書き問題の形は元の選択問題と同じ番号）。答え方や絞り込みを変えても変わらない
  var numberCache = typeof WeakMap === 'function' ? new WeakMap() : null;
  function numbering(bank, subject, grade) {
    var all = numberCache && numberCache.get(bank);
    if (!all) { all = {}; if (numberCache) numberCache.set(bank, all); }
    var key = subject + '|' + grade;
    if (!all[key]) {
      var map = { total: 0, byId: {} };
      questions(bank, subject, grade).sort(compare).forEach(function (q, i) { map.byId[baseId(q)] = i + 1; map.total = i + 1; });
      all[key] = map;
    }
    return all[key];
  }
  function numberOf(bank, q) { return numbering(bank, q.subject, q.gradeLevel).byId[baseId(q)] || null; }
  function totalOf(bank, subject, grade) { return numbering(bank, subject, grade).total; }
  function progress(bank, state, subject, grade) {
    var results = state.learning.questionResults || {}, out = { total: 0, correct: 0, review: 0, unanswered: 0, generated: false };
    questions(bank, subject, grade).forEach(function (q) {
      var key = baseId(q);
      out.total++;
      if (results[key] === true) out.correct++; else if (results[key] === false) out.review++; else out.unanswered++;
    });
    out.generated = subject === 'math' && (FF.units.has(subject, grade) ? FF.generators.unitsWithGenerators(grade).length > 0 :
      FF.defs.DIFFICULTIES.some(function (d) { return FF.generators.supports(subject, grade, d.id); }));
    return out;
  }
  // 単元ごとの問題数（書き問題の形は数えない）
  function unitCounts(bank, subject, grade) {
    var c = {};
    questions(bank, subject, grade).forEach(function (q) { c[q.unit] = (c[q.unit] || 0) + 1; });
    return c;
  }
  function diagramCount(bank, subject, grade) {
    return questions(bank, subject, grade).filter(function (q) { return !!q.diagram; }).length;
  }
  FF.curriculum = {
    pool: pool, pick: pick, genCombos: genCombos, numberOf: numberOf, totalOf: totalOf, scarcest: scarcest, progress: progress, unitCounts: unitCounts, diagramCount: diagramCount,
    units: function (subject, grade) { return FF.units.list(subject, grade); },
    unit: function (subject, grade, id) { return FF.units.get(subject, grade, id); }
  };
})(this);
