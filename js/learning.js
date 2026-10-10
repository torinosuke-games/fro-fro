// 学習：問題データの索引、出題の選択、回答処理、学習記録（SPEC 第7章・第12章）。純粋関数のみ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }
  function ids(list) { return list.map(function (x) { return x.id; }); }
  function keyOf(subject, grade, difficulty, answerType) {
    return subject + '|' + grade + '|' + difficulty + '|' + answerType;
  }

  // ---- 問題データの検証（SPEC 10.1） ----
  function validateQuestion(q) {
    var e = [];
    var defs = FF.defs;
    function str(v) { return typeof v === 'string' && v.trim() !== ''; }
    if (!q || typeof q !== 'object') return ['問題がオブジェクトではない'];
    if (!str(q.id)) e.push('id がない');
    if (ids(defs.SUBJECTS).indexOf(q.subject) < 0) e.push('subject が不正: ' + q.subject);
    if (defs.GRADES.map(function (g) { return g.level; }).indexOf(q.gradeLevel) < 0) e.push('gradeLevel が不正: ' + q.gradeLevel);
    if (!str(q.unit)) e.push('unit がない');
    if (ids(defs.DIFFICULTIES).indexOf(q.difficulty) < 0) e.push('difficulty が不正: ' + q.difficulty);
    if (ids(defs.ANSWER_TYPES).indexOf(q.answerType) < 0) e.push('answerType が不正: ' + q.answerType);
    if (!str(q.question)) e.push('question がない');
    if (!str(q.answer)) e.push('answer がない');
    if (!str(q.explanation)) e.push('explanation がない');
    if (typeof q.reviewed !== 'boolean') e.push('reviewed が true/false でない');
    if (!Array.isArray(q.hints) || q.hints.length < 1 || q.hints.length > 3 || !q.hints.every(str)) e.push('hints は1〜3個の文字列');
    if (q.answerDisplay !== undefined && (!str(q.answerDisplay) || FF.util.plainText(q.answerDisplay) !== q.answer)) e.push('answerDisplay のふりがなを外した文字が answer と一致しない');
    if (q.acceptedAnswers !== undefined && (!Array.isArray(q.acceptedAnswers) || !q.acceptedAnswers.every(str))) e.push('acceptedAnswers は文字列の配列');
    if (q.answerType === 'choice') {
      if (!Array.isArray(q.choices) || q.choices.length !== 4) e.push('choices がちょうど4つでない');
      else {
        if (!q.choices.every(str)) e.push('choices に空の選択肢がある');
        if (q.choices.indexOf(q.answer) < 0) e.push('answer が choices に含まれていない');
        var norm = q.choices.map(FF.answer.normalize);
        if (norm.some(function (c, i) { return norm.indexOf(c) !== i; })) e.push('choices に重複がある');
      }
    }
    // 図（省略できる。判断221）。種類と、種類ごとの必須の項目
    if (q.diagram !== undefined) {
      var d = q.diagram, need = d && typeof d === 'object' && defs.DIAGRAM_KINDS[d.kind];
      if (!need) e.push('diagram.kind が不正: ' + (d && d.kind));
      else {
        if (!str(d.caption)) e.push('diagram.caption がない');
        need.forEach(function (k) { if (d[k] === undefined || d[k] === null || d[k] === '') e.push('diagram.' + k + ' がない（' + d.kind + '）'); });
      }
    }
    // 選択問題を書き問題にも使う形（判断200）。中身は inputVariant で作った書き問題として検証する
    if (q.inputForm !== undefined) {
      if (q.answerType !== 'choice') e.push('inputForm は選択問題にだけ付けられる');
      else if (!q.inputForm || typeof q.inputForm !== 'object') e.push('inputForm がオブジェクトではない');
      else validateQuestion(inputVariant(q)).forEach(function (m) { e.push('inputForm: ' + m); });
    }
    if (q.answerType === 'input') {
      if (FF.answer.VALIDATION_MODES.indexOf(q.validationMode) < 0) e.push('validationMode が不正: ' + q.validationMode);
      if (q.validationMode === 'any-of' && !(q.acceptedAnswers && q.acceptedAnswers.length)) e.push('any-of なのに acceptedAnswers が空');
      if (q.validationMode === 'number' && isNaN(FF.answer.parseNumber(q.answer))) e.push('number なのに answer が数値でない');
      if (str(q.answer) && !FF.answer.judgeInput(q, q.answer).correct) e.push('answer 自身が正解と判定されない');
    }
    return e;
  }

  // 選択問題の inputForm から、書き問題として出す問題を作る（判断200）。ID は元の ID + '#input'（くり返しの数え方も別になる）。
  // inputForm: { question?, answer?, acceptedAnswers?, validationMode, hints?, explanation?, answerDisplay?, reviewed }
  // 省いた項目は元の選択問題のものを使う（answer を変えたときの answerDisplay は元のものを使わない）
  var INPUT_SUFFIX = '#input';
  function inputVariant(q) {
    var f = q.inputForm || {};
    var v = {};
    Object.keys(q).forEach(function (k) { if (k !== 'choices' && k !== 'inputForm') v[k] = q[k]; });
    v.id = q.id + INPUT_SUFFIX;
    v.answerType = 'input';
    v.derivedFrom = q.id;
    ['question', 'hints', 'explanation'].forEach(function (k) { if (f[k] !== undefined) v[k] = f[k]; });
    if (f.answer !== undefined) { v.answer = f.answer; delete v.answerDisplay; }
    else if (/[{}]/.test(v.answer)) {   // 選択問題の答えのふりがなの記法は、入力と比べられるように外す（表示は記法入りのまま）
      if (v.answerDisplay === undefined) v.answerDisplay = v.answer;
      v.answer = FF.util.plainText(v.answer);
    }
    if (f.answerDisplay !== undefined) v.answerDisplay = f.answerDisplay;
    v.validationMode = f.validationMode;
    if (f.acceptedAnswers !== undefined) v.acceptedAnswers = f.acceptedAnswers; else delete v.acceptedAnswers;
    v.reviewed = f.reviewed;
    return v;
  }

  // 「正しい答え」として表示する文字列。自由入力の answer には {漢字|よみ} を書けない（入力と比べるため）ので、
  // 辞書の自動ふりがなが誤る答えだけ answerDisplay（ふりがなの記法入り）を持たせる。
  function displayAnswer(q) {
    return q.answerDisplay || q.answer;
  }

  // ---- 索引 ----
  // 不正な問題と重複IDは索引に入れず、invalid / duplicates に記録する（ゲームは止めない）
  function createBank(questions) {
    var bank = { byKey: {}, byId: {}, invalid: [], duplicates: [], count: 0 };
    (questions || []).forEach(function (q) {
      var errors = validateQuestion(q);
      if (errors.length) { bank.invalid.push({ id: q && q.id, errors: errors }); return; }
      if (bank.byId[q.id]) { bank.duplicates.push(q.id); return; }
      [q].concat(q.inputForm ? [inputVariant(q)] : []).forEach(function (x) {   // 書き問題の形も一緒に入れる（判断200）
        bank.byId[x.id] = x;
        var k = keyOf(x.subject, x.gradeLevel, x.difficulty, x.answerType);
        (bank.byKey[k] = bank.byKey[k] || []).push(x);
        bank.count++;
      });
    });
    return bank;
  }

  function staticPool(bank, subject, grade, difficulty, answerType) {
    return bank.byKey[keyOf(subject, grade, difficulty, answerType)] || [];
  }

  // その組み合わせで出題できるか（できなければ画面は「準備中」）
  // 難易度の「ランダム」（学習画面の初期値）。問題を出すたびに、出せる難易度から1つを同じ確率で選ぶ。
  var RANDOM = 'random';
  function availableDifficulties(bank, subject, grade, answerType) {
    return FF.defs.DIFFICULTIES.map(function (d) { return d.id; }).filter(function (d) {
      return isAvailable(bank, subject, grade, d, answerType);
    });
  }
  function isAvailable(bank, subject, grade, difficulty, answerType) {
    if (difficulty === RANDOM) return availableDifficulties(bank, subject, grade, answerType).length > 0;
    return staticPool(bank, subject, grade, difficulty, answerType).length > 0 ||
      FF.generators.supports(subject, grade, difficulty);
  }

  // ---- 学年の解放 ----
  function unlockedGrade(state, subject) {
    return Math.max(state.learning.unlocked[subject] || bal().INITIAL_UNLOCKED_GRADE, state.player.grade || 0);
  }
  function isGradeUnlocked(state, subject, grade) {
    return grade >= 1 && grade <= unlockedGrade(state, subject);
  }

  function subjectName(subjectId, grade) {
    var s = FF.defs.SUBJECTS.filter(function (x) { return x.id === subjectId; })[0];
    if (!s) return subjectId;
    var over = (s.nameByGrade || []).filter(function (r) { return grade >= r.from && grade <= r.to; })[0];
    return over ? over.name : s.name;
  }

  // ---- 出題の選択 ----
  // 24時間以内の正解回数が少ない問題、直近に出していない問題を優先する（反復で損をする問題を出さない）
  function score(q, ctx, b) {
    var repeat = FF.rewards.countRecentCorrect(ctx.correctLog || {}, q.id, ctx.now, b);
    var recent = (ctx.recentIds || []).slice(-b.PICK.AVOID_RECENT).indexOf(q.id) >= 0;
    return repeat * 10 + (recent ? 5 : 0);
  }
  function pickBest(cands, ctx, b, rng) {
    var best = [], bestScore = Infinity;
    cands.forEach(function (q) {
      var s = score(q, ctx, b);
      if (s < bestScore) { bestScore = s; best = [q]; }
      else if (s === bestScore) best.push(q);
    });
    return best.length ? best[Math.floor(rng() * best.length)] : null;
  }

  // sel: { subject, grade, difficulty, answerType }
  // ctx: { correctLog, recentIds, now, rng }
  // sel.difficulty が 'random' なら、出せる難易度から1つ選んでから出題する（報酬は出た問題の難易度で決まる）
  function pickQuestion(bank, sel, ctx, b) {
    b = bal(b);
    var rng = ctx.rng || Math.random;
    if (sel.difficulty === RANDOM) {
      var diffs = availableDifficulties(bank, sel.subject, sel.grade, sel.answerType);
      if (!diffs.length) return null;
      sel = Object.assign({}, sel, { difficulty: diffs[Math.floor(rng() * diffs.length)] });
    }
    var pool = staticPool(bank, sel.subject, sel.grade, sel.difficulty, sel.answerType);
    var canGen = FF.generators.supports(sel.subject, sel.grade, sel.difficulty);
    if (canGen && (pool.length === 0 || rng() >= b.PICK.MATH_WORD_SHARE)) {
      var cands = [];
      for (var i = 0; i < b.PICK.CANDIDATES; i++) cands.push(FF.generators.generate(sel.grade, sel.difficulty, sel.answerType, rng));
      return pickBest(cands, ctx, b, rng);
    }
    return pickBest(pool, ctx, b, rng);
  }

  // ---- 回答の進行 ----
  // 問題を表示するときに作る。チケットには触れない。
  function startAttempt(q, rng) {
    return {
      question: q,
      choices: q.answerType === 'choice' ? FF.util.shuffle(q.choices, rng || Math.random) : null,
      hintsShown: 0,
      wrong: 0,
      done: false
    };
  }

  // ヒントを1段階開く。チケットには触れない。
  function revealHint(att) {
    var n = Math.min(att.question.hints.length, att.hintsShown + 1);
    return Object.assign({}, att, { hintsShown: n });
  }

  // 回答する。
  // ctx: { now, resource }（resource：獲得する資源の id）
  // 戻り値：{ state, attempt, outcome }
  //   outcome.status: 'correct' | 'wrong'（終了） | 'retry'（自由入力で再挑戦できる） | 'error'
  function submitAnswer(state, att, input, ctx, b) {
    b = bal(b);
    var q = att.question;
    var now = ctx.now;
    if (att.done) return { state: state, attempt: att, outcome: { status: 'error', error: 'finished' } };
    if (!isGradeUnlocked(state, q.subject, q.gradeLevel)) return { state: state, attempt: att, outcome: { status: 'error', error: 'locked' } };

    var s = FF.util.clone(state);
    var result = FF.answer.judge(q, input);
    if (result.empty) return { state: state, attempt: att, outcome: { status: 'error', error: 'empty' } };

    if (q.answerType === 'choice') {
      var c = FF.tickets.consumeTicket(s.tickets, now, b);
      s.tickets = c.tickets;
      if (!c.ok) return { state: s, attempt: att, outcome: { status: 'error', error: 'noTicket' } };
      return finish(s, att, result.correct, 1, ctx, b);
    }

    if (result.correct) return finish(s, att, true, att.wrong + 1, ctx, b);
    var wrong = att.wrong + 1;
    if (wrong >= b.INPUT_MAX_ATTEMPTS) return finish(s, Object.assign({}, att, { wrong: wrong }), false, wrong, ctx, b);
    return {
      state: state,
      attempt: Object.assign({}, att, { wrong: wrong }),
      outcome: { status: 'retry', attemptsLeft: b.INPUT_MAX_ATTEMPTS - wrong }
    };
  }

  function statsCell(s, subject, grade) {
    var bySubject = s.learning.stats[subject] = s.learning.stats[subject] || {};
    return bySubject[grade] = bySubject[grade] || {
      attempts: 0, correct: 0,
      choice: { attempts: 0, correct: 0 },
      input: { attempts: 0, correct: 0 },
      hintsUsed: 0, recent: []
    };
  }

  function finish(s, att, correct, attemptNo, ctx, b) {
    var q = att.question, now = ctx.now, L = s.learning;
    var cell = statsCell(s, q.subject, q.gradeLevel);
    var reward = 0, breakdown = null, points = 0, pointsBreakdown = null;

    if (correct) {
      var producer = FF.defs.BUILDINGS.filter(function (d) { return d.produces === ctx.resource; })[0];
      var params = {
        grade: q.gradeLevel, difficulty: q.difficulty, answerType: q.answerType,
        hintsUsed: att.hintsShown, attempt: attemptNo,
        repeatCount: FF.rewards.countRecentCorrect(L.correctLog, q.id, now, b),
        facilityLevel: producer ? s.buildings[producer.id].level : 0,
        isFocusSubject: FF.rewards.focusSubjectOf(now) === q.subject,
        recent: cell.recent            // 今回の回答を記録する前の直近
      };
      breakdown = FF.rewards.rewardBreakdown(params, b);
      reward = scaleReward(breakdown.total, ctx.rewardRate);
      s.resources[ctx.resource] = (s.resources[ctx.resource] || 0) + reward;
      L.totalEarned[ctx.resource] = (L.totalEarned[ctx.resource] || 0) + reward;
      // 勉強量ポイント（SPEC 8.4）：同じ反復回数・直近の正答で計算する（施設・重点教科・形式はかからない）
      pointsBreakdown = FF.points.pointsBreakdown(params, b);
      points = scaleReward(pointsBreakdown.total, ctx.rewardRate);
      FF.points.addPoints(s, points);
      L.correctLog = FF.rewards.recordCorrect(L.correctLog, q.id, now, b);
    } else {
      L.correctLog = FF.rewards.pruneCorrectLog(L.correctLog, now, b);
    }

    // 学習記録
    L.questionResults = L.questionResults || {};
    L.questionResults[q.id.replace(/#input$/, '')] = correct;
    cell.attempts++;
    cell[q.answerType].attempts++;
    if (correct) { cell.correct++; cell[q.answerType].correct++; }
    cell.hintsUsed += att.hintsShown;
    var keep = Math.max(b.ACCURACY.WINDOW, b.RECOMMEND.WINDOW);
    cell.recent = cell.recent.concat([correct ? 1 : 0]).slice(-keep);
    L.streak.current = correct ? L.streak.current + 1 : 0;
    L.streak.best = Math.max(L.streak.best, L.streak.current);
    L.history = L.history.concat([{
      at: now, qid: q.id, subject: q.subject, grade: q.gradeLevel, difficulty: q.difficulty,
      type: q.answerType, correct: correct, attempts: attemptNo, hints: att.hintsShown,
      resource: correct ? ctx.resource : null, reward: reward, points: points
    }]).slice(-b.HISTORY_LIMIT);
    if (FF.research) FF.research.applyJoins(s);   // 正解した問題の数で仲間になる人（判断365）

    return {
      state: s,
      attempt: Object.assign({}, att, { done: true }),
      outcome: {
        status: correct ? 'correct' : 'wrong',
        reward: reward,
        breakdown: breakdown,
        points: points,
        pointsBreakdown: pointsBreakdown,
        attempts: attemptNo,
        correctAnswer: displayAnswer(q),
        explanation: q.explanation,
        method: ctx.rewardRate == null ? 'typed' : 'self',
        rate: ctx.rewardRate == null ? 1 : ctx.rewardRate
      }
    };
  }

  // ---- 手書きの自己採点（判断266）----
  // 漢字で答える書き問題（国語。答えが漢字をふくみ、判定が exact）は、手で書いて、お手本とくらべて、自分で採点できる
  // 手書きにできる書き問題：国語は、漢字をふくむ答え。英語は、英語の単語（ハイフン・あきで2語まで、12文字まで。判断282）。どちらも exact
  var EN_WORD = /^[A-Za-z]+(?:[ -][A-Za-z]+)?$/;
  function handwriteKind(q) {
    if (!q || q.answerType !== 'input' || q.validationMode !== 'exact') return null;
    var a = String(q.answer);
    if (q.subject === 'japanese' && /[\u4e00-\u9fff]/.test(a)) return 'kanji';
    if (q.subject === 'english' && a.length >= 2 && a.length <= 12 && EN_WORD.test(a)) return 'english';
    return null;
  }
  function canHandwrite(q) { return handwriteKind(q) !== null; }
  // 資源・勉強量ポイントを割合 rate にする（rate が省略か 1 以上なら、そのまま。0 より大きい分は、最低1）
  function scaleReward(v, rate) {
    if (rate == null || rate >= 1 || v <= 0) return v;
    return Math.max(1, Math.round(v * rate));
  }
  // ok：自分で「書けた」と採点したか。「まちがえた」は、答えを見ているので、やり直しにせず、不正解で終える
  function submitSelfCheck(state, att, ok, ctx, b) {
    b = bal(b);
    var q = att.question;
    if (att.done) return { state: state, attempt: att, outcome: { status: 'error', error: 'finished' } };
    if (!canHandwrite(q)) return { state: state, attempt: att, outcome: { status: 'error', error: 'notHandwrite' } };
    if (!isGradeUnlocked(state, q.subject, q.gradeLevel)) return { state: state, attempt: att, outcome: { status: 'error', error: 'locked' } };
    var s = FF.util.clone(state);
    var c2 = Object.assign({}, ctx, { rewardRate: b.HANDWRITING.REWARD_RATE });
    var a2 = ok ? att : Object.assign({}, att, { wrong: att.wrong + 1 });
    return finish(s, a2, !!ok, att.wrong + 1, c2, b);
  }

  // ---- 推奨表示・集計 ----
  // 直近10問がそろい、正答率が40%未満なら「ひとつ下の学年で力をつけよう」
  function shouldRecommendLower(state, subject, grade, b) {
    b = bal(b);
    if (grade <= 1) return false;
    var cell = state.learning.stats[subject] && state.learning.stats[subject][grade];
    if (!cell) return false;
    var recent = cell.recent.slice(-b.RECOMMEND.WINDOW);
    if (recent.length < b.RECOMMEND.WINDOW) return false;
    var c = recent.reduce(function (x, y) { return x + y; }, 0);
    return c / recent.length < b.RECOMMEND.BELOW;
  }

  // 教科ごとの合計 { attempts, correct, rate, choice, input, hintsUsed }
  function subjectSummary(state, subject) {
    var out = { attempts: 0, correct: 0, choice: { attempts: 0, correct: 0 }, input: { attempts: 0, correct: 0 }, hintsUsed: 0 };
    var bySubject = state.learning.stats[subject] || {};
    for (var g in bySubject) {
      var c = bySubject[g];
      out.attempts += c.attempts; out.correct += c.correct; out.hintsUsed += c.hintsUsed;
      out.choice.attempts += c.choice.attempts; out.choice.correct += c.choice.correct;
      out.input.attempts += c.input.attempts; out.input.correct += c.input.correct;
    }
    out.rate = out.attempts ? out.correct / out.attempts : null;
    return out;
  }

  // 「数学 Lv6 / 国語 Lv5 / …」
  function progressLine(state) {
    return FF.defs.SUBJECTS.map(function (s) {
      var g = unlockedGrade(state, s.id);
      return subjectName(s.id, g) + ' Lv' + g;
    }).join(' / ');
  }

  FF.learning = {
    keyOf: keyOf,
    validateQuestion: validateQuestion,
    inputVariant: inputVariant,
    INPUT_SUFFIX: INPUT_SUFFIX,
    displayAnswer: displayAnswer,
    createBank: createBank,
    staticPool: staticPool,
    isAvailable: isAvailable,
    unlockedGrade: unlockedGrade,
    isGradeUnlocked: isGradeUnlocked,
    subjectName: subjectName,
    pickQuestion: pickQuestion,
    RANDOM_DIFFICULTY: RANDOM,
    availableDifficulties: availableDifficulties,
    startAttempt: startAttempt,
    revealHint: revealHint,
    submitAnswer: submitAnswer,
    submitSelfCheck: submitSelfCheck,
    canHandwrite: canHandwrite,
    handwriteKind: handwriteKind,
    shouldRecommendLower: shouldRecommendLower,
    subjectSummary: subjectSummary,
    progressLine: progressLine
  };
})(this);
