// 昇格試験・実力診断（SPEC 第6章）。純粋関数のみ。
// 試験・診断の回答は学習記録・反復倍率・報酬に含めない（試験履歴にだけ残す）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  var DIFF_ORDER = ['standard', 'basic', 'advanced'];

  // ふりがなの自動設定：ユーザーが手動で切り替えるまで。学年を入れていれば「小3 以下なら ON」（判断198）、
  // 入れていなければこれまでどおり「全教科 Lv2 以下なら ON」
  function applyFuriganaAuto(state, b) {
    b = bal(b);
    if (!state.settings.furiganaAuto) return state;
    var g = state.player && state.player.grade;
    var low = g ? g <= b.FURIGANA_AUTO_MAX_GRADE : FF.defs.SUBJECTS.every(function (s) {
      return FF.learning.unlockedGrade(state, s.id) <= b.INITIAL_UNLOCKED_GRADE;
    });
    var s = Object.assign({}, state);
    s.settings = Object.assign({}, state.settings, { furigana: low });
    return s;
  }

  function item(q, rng) {
    return { question: q, choices: q.answerType === 'choice' ? FF.util.shuffle(q.choices, rng) : null };
  }

  // ================= 昇格試験 =================

  // 受験できる学年の範囲。{ min, max } または null（最高学年まで解放済み）
  function examRange(state, subject, b) {
    b = bal(b);
    var u = FF.learning.unlockedGrade(state, subject);
    var min = u + b.EXAM.RANGE_MIN, max = Math.min(b.MAX_GRADE, u + b.EXAM.RANGE_MAX);
    return min > max ? null : { min: min, max: max };
  }

  function cooldownRemaining(state, subject, now) {
    var until = state.learning.examCooldownUntil[subject] || 0;
    return Math.max(0, until - now);
  }

  // { ok, reason: 'range' | 'cooldown', remainingMs }
  function canTakeExam(state, subject, grade, now, b) {
    var range = examRange(state, subject, b);
    if (!range || grade < range.min || grade > range.max) return { ok: false, reason: 'range' };
    var rem = cooldownRemaining(state, subject, now);
    if (rem > 0) return { ok: false, reason: 'cooldown', remainingMs: rem };
    return { ok: true };
  }

  // 出題する5問を選ぶ。{ ok, items } / { ok: false, reason: 'unavailable' }（画面は「準備中」）
  // 標準を優先し、足りなければ同じ学年の基礎・発展で補う。算数は自動生成も使う。
  function buildExam(bank, subject, grade, rng, b) {
    b = bal(b);
    rng = rng || Math.random;
    var N = b.EXAM.QUESTIONS, MIN_INPUT = b.EXAM.MIN_INPUT;
    var used = {}, chosen = [];
    function poolOf(type, diffs) {
      var out = [];
      diffs.forEach(function (d) {
        out = out.concat(FF.util.shuffle(FF.learning.staticPool(bank, subject, grade, d, type), rng));
      });
      return out;
    }
    function take(list, n) {
      for (var i = 0; i < list.length && n > 0; i++) {
        if (used[list[i].id]) continue;
        used[list[i].id] = true;
        chosen.push(list[i]);
        n--;
      }
      return n;
    }
    function takeGenerated(type, n) {
      if (!FF.generators.supports(subject, grade, 'standard')) return n;
      for (var tries = 0; n > 0 && tries < 50; tries++) {
        var q = FF.generators.generate(grade, 'standard', type, rng);
        if (used[q.id]) continue;
        used[q.id] = true;
        chosen.push(q);
        n--;
      }
      return n;
    }
    var gen = FF.generators.supports(subject, grade, 'standard');
    // 1) 自由入力を MIN_INPUT 問（算数は文章題を1問まで、残りは自動生成）
    var restInput = take(poolOf('input', gen ? ['standard'] : DIFF_ORDER), gen ? Math.min(1, MIN_INPUT) : MIN_INPUT);
    if (gen) restInput = takeGenerated('input', MIN_INPUT - chosen.length);
    if (restInput > 0) return { ok: false, reason: 'unavailable' };
    // 2) 残りを標準の問題（形式は問わない）→ 自動生成（4択）→ 基礎・発展の順で補う
    var rest = N - chosen.length;
    var standardAny = FF.util.shuffle(poolOf('input', ['standard']).concat(poolOf('choice', ['standard'])), rng);
    rest = take(gen ? [] : standardAny, rest);
    if (gen) rest = takeGenerated('choice', rest);
    rest = take(FF.util.shuffle(poolOf('input', ['basic', 'advanced']).concat(poolOf('choice', ['basic', 'advanced'])), rng), rest);
    if (rest > 0) return { ok: false, reason: 'unavailable' };
    return { ok: true, items: FF.util.shuffle(chosen, rng).map(function (q) { return item(q, rng); }) };
  }

  function isExamAvailable(bank, subject, grade, b) {
    return buildExam(bank, subject, grade, FF.util.makeRng(1), b).ok;
  }

  // 試験を始める。{ ok, exam, reason }
  function startExam(bank, state, subject, grade, now, rng, b) {
    var can = canTakeExam(state, subject, grade, now, b);
    if (!can.ok) return { ok: false, reason: can.reason, remainingMs: can.remainingMs };
    var built = buildExam(bank, subject, grade, rng, b);
    if (!built.ok) return { ok: false, reason: built.reason };
    return { ok: true, exam: { subject: subject, grade: grade, items: built.items, results: [], startedAt: now } };
  }

  // 1問に1回だけ答える（ヒント・再挑戦なし）。空欄は回答として数えない。
  // { exam, correct, empty, done }
  function answerExam(exam, input) {
    var cur = exam.items[exam.results.length];
    if (!cur) return { exam: exam, correct: false, empty: false, done: true };
    var r = FF.answer.judge(cur.question, input);
    if (r.empty) return { exam: exam, correct: false, empty: true, done: false };
    var next = Object.assign({}, exam, { results: exam.results.concat([r.correct]) });
    return { exam: next, correct: r.correct, empty: false, done: next.results.length >= next.items.length };
  }

  // 採点して状態に反映する。{ state, passed, correct, total }
  function finishExam(state, exam, now, b) {
    b = bal(b);
    var correct = exam.results.filter(Boolean).length;
    var passed = exam.results.length >= exam.items.length && correct >= b.EXAM.PASS;
    var s = FF.util.clone(state), L = s.learning;
    if (passed) L.unlocked[exam.subject] = Math.max(FF.learning.unlockedGrade(s, exam.subject), exam.grade);
    else L.examCooldownUntil[exam.subject] = now + b.EXAM.COOLDOWN_MS;
    L.examHistory = L.examHistory.concat([{
      at: now, subject: exam.subject, grade: exam.grade, correct: correct, total: exam.items.length, passed: passed
    }]).slice(-b.EXAM_HISTORY_LIMIT);
    return { state: applyFuriganaAuto(s, b), passed: passed, correct: correct, total: exam.items.length };
  }

  // ================= 実力診断 =================

  function canTakeDiagnosis(state, subject) {
    return state.learning.diagnosis[subject] == null;
  }

  function startDiagnosis(subject, b) {
    b = bal(b);
    return { subject: subject, grade: b.DIAGNOSIS.START_GRADE, log: [], usedIds: [] };
  }

  function isDiagnosisDone(diag, b) {
    return diag.log.length >= bal(b).DIAGNOSIS.MAX_QUESTIONS;
  }

  // 次の問題。自由入力を優先し、なければ4択。標準がなければ同じ学年の基礎・発展。
  // 出せる問題がなければ null（診断はそこで終了）。
  function nextDiagnosisItem(bank, diag, rng) {
    rng = rng || Math.random;
    var g = diag.grade, subj = diag.subject;
    for (var t = 0; t < 2; t++) {
      var type = t === 0 ? 'input' : 'choice';
      for (var d = 0; d < DIFF_ORDER.length; d++) {
        var diff = DIFF_ORDER[d];
        if (FF.generators.supports(subj, g, diff)) {
          for (var k = 0; k < 20; k++) {
            var q = FF.generators.generate(g, diff, type, rng);
            if (diag.usedIds.indexOf(q.id) < 0) return item(q, rng);
          }
        }
        var pool = FF.learning.staticPool(bank, subj, g, diff, type).filter(function (x) { return diag.usedIds.indexOf(x.id) < 0; });
        if (pool.length) return item(pool[Math.floor(rng() * pool.length)], rng);
      }
    }
    return null;
  }

  // 回答して次の学年を決める（正解 +1、不正解 −1、Lv1〜Lv7）
  function answerDiagnosis(diag, it, input, b) {
    b = bal(b);
    var r = FF.answer.judge(it.question, input);
    if (r.empty) return { diag: diag, correct: false, empty: true };
    var cfg = b.DIAGNOSIS;
    var next = Math.max(cfg.MIN_GRADE, Math.min(cfg.MAX_UNLOCK, diag.grade + (r.correct ? 1 : -1)));
    return {
      diag: {
        subject: diag.subject,
        grade: next,
        log: diag.log.concat([{ grade: diag.grade, correct: r.correct, type: it.question.answerType }]),
        usedIds: diag.usedIds.concat([it.question.id])
      },
      correct: r.correct,
      empty: false
    };
  }

  // 結果：正解した学年のうち「その学年での正解数 ≥ 不正解数」となる最高学年（下限 Lv2・上限 Lv7）
  function diagnosisResult(diag, b) {
    b = bal(b);
    var per = {};
    diag.log.forEach(function (e) {
      per[e.grade] = per[e.grade] || { c: 0, w: 0 };
      if (e.correct) per[e.grade].c++; else per[e.grade].w++;
    });
    var best = b.INITIAL_UNLOCKED_GRADE;
    for (var g in per) {
      var gi = Number(g);
      if (per[g].c > 0 && per[g].c >= per[g].w && gi > best) best = gi;
    }
    return Math.min(best, b.DIAGNOSIS.MAX_UNLOCK);
  }

  function applyDiagnosis(state, subject, result, now, b) {
    b = bal(b);
    var s = FF.util.clone(state);
    s.learning.unlocked[subject] = Math.max(FF.learning.unlockedGrade(s, subject), Math.min(result, b.DIAGNOSIS.MAX_UNLOCK));
    s.learning.diagnosis[subject] = { at: now, result: result };
    return applyFuriganaAuto(s, b);
  }

  // 診断をスキップした（または全教科を終えた）ことの記録
  function markDiagnosisOffered(state) {
    var s = Object.assign({}, state);
    s.flags = Object.assign({}, state.flags, { diagnosisOffered: true });
    return s;
  }

  FF.exam = {
    applyFuriganaAuto: applyFuriganaAuto,
    examRange: examRange,
    cooldownRemaining: cooldownRemaining,
    canTakeExam: canTakeExam,
    buildExam: buildExam,
    isExamAvailable: isExamAvailable,
    startExam: startExam,
    answerExam: answerExam,
    finishExam: finishExam,
    canTakeDiagnosis: canTakeDiagnosis,
    startDiagnosis: startDiagnosis,
    isDiagnosisDone: isDiagnosisDone,
    nextDiagnosisItem: nextDiagnosisItem,
    answerDiagnosis: answerDiagnosis,
    diagnosisResult: diagnosisResult,
    applyDiagnosis: applyDiagnosis,
    markDiagnosisOffered: markDiagnosisOffered
  };
})(this);
