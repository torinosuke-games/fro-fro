// 出題・回答処理・チケット消費・学習記録（SPEC 第7章・第12章・第19章）
module.exports = ({ test, FF, assert, plain }) => {
  const L = FF.learning;
  const T0 = 1790000000000;
  const rng = () => FF.util.makeRng(123);

  let seq = 0;
  function mk(o) {
    seq++;
    const base = {
      id: `test_q_${seq}`, subject: 'science', gradeLevel: 2, unit: 'test', difficulty: 'standard',
      answerType: 'input', question: '問題', answer: 'みず', acceptedAnswers: [], validationMode: 'kana-insensitive',
      hints: ['ヒント1', 'ヒント2', 'ヒント3'], explanation: '解説', reviewed: false
    };
    const q = Object.assign(base, o);
    if (q.answerType === 'choice' && !o.choices) q.choices = [q.answer, 'いし', 'き', 'かぜ'];
    return q;
  }
  const newState = () => FF.exam.applyFuriganaAuto(FF.state.createDefaultState(T0));
  const choiceQ = mk({ answerType: 'choice', answer: 'みず', id: 'c1' });
  const inputQ = mk({ id: 'i1' });
  const ctx = (o) => Object.assign({ now: T0, resource: 'wood' }, o);

  // ---- 索引と検証 ----
  test('問題データを検証し、不正な問題と重複 ID を除外する', () => {
    const bank = L.createBank([
      mk({ id: 'ok1' }),
      mk({ id: 'ok1' }),                                         // 重複
      mk({ id: 'bad1', answerType: 'choice', choices: ['a', 'b', 'c'] }),   // 3択
      mk({ id: 'bad2', answerType: 'choice', answer: 'z', choices: ['a', 'b', 'c', 'd'] }),
      mk({ id: 'bad3', subject: 'music' }),
      mk({ id: 'bad4', validationMode: 'number', answer: 'みず' }),
      mk({ id: 'bad5', hints: [] }),
      mk({ id: 'bad6', reviewed: 'no' })
    ]);
    assert.strictEqual(bank.count, 1);
    assert.deepStrictEqual(plain(bank.duplicates), ['ok1']);
    assert.deepStrictEqual(plain(bank.invalid.map(x => x.id)), ['bad1', 'bad2', 'bad3', 'bad4', 'bad5', 'bad6']);
  });

  test('問題がない組み合わせは「準備中」（isAvailable が false）', () => {
    const bank = L.createBank([inputQ]);
    assert.strictEqual(L.isAvailable(bank, 'science', 2, 'standard', 'input'), true);
    assert.strictEqual(L.isAvailable(bank, 'science', 2, 'standard', 'choice'), false);
    assert.strictEqual(L.isAvailable(bank, 'english', 9, 'advanced', 'input'), false);
    assert.strictEqual(L.pickQuestion(bank, { subject: 'english', grade: 9, difficulty: 'advanced', answerType: 'input' }, { now: T0, rng: rng() }), null);
  });

  test('算数はすべての学年・難易度・形式で出題できる', () => {
    const bank = L.createBank([]);
    for (let g = 1; g <= 9; g++) for (const d of ['basic', 'standard', 'advanced']) for (const t of ['choice', 'input']) {
      const q = L.pickQuestion(bank, { subject: 'math', grade: g, difficulty: d, answerType: t }, { now: T0, rng: rng() });
      assert.ok(q && q.gradeLevel === g && q.answerType === t);
    }
  });

  test('24時間以内に正解した問題より、まだ正解していない問題を優先する', () => {
    const a = mk({ id: 'pa' }), b = mk({ id: 'pb' });
    const bank = L.createBank([a, b]);
    const log = FF.rewards.recordCorrect({}, 'pa', T0 - 1000);
    for (let i = 0; i < 20; i++) {
      const q = L.pickQuestion(bank, { subject: 'science', grade: 2, difficulty: 'standard', answerType: 'input' }, { now: T0, correctLog: log, rng: FF.util.makeRng(i) });
      assert.strictEqual(q.id, 'pb');
    }
  });

  test('直前に出した問題を避ける', () => {
    const a = mk({ id: 'ra' }), b = mk({ id: 'rb' });
    const bank = L.createBank([a, b]);
    for (let i = 0; i < 20; i++) {
      const q = L.pickQuestion(bank, { subject: 'science', grade: 2, difficulty: 'standard', answerType: 'input' }, { now: T0, recentIds: ['ra'], rng: FF.util.makeRng(i) });
      assert.strictEqual(q.id, 'rb');
    }
  });

  // ---- 学年の解放 ----
  test('初期状態では Lv1〜Lv2 だけが解放されている', () => {
    const s = newState();
    for (const subj of FF.defs.SUBJECTS) {
      assert.ok(L.isGradeUnlocked(s, subj.id, 1));
      assert.ok(L.isGradeUnlocked(s, subj.id, 2));
      assert.ok(!L.isGradeUnlocked(s, subj.id, 3));
    }
  });

  test('解放されていない学年の問題には回答できない', () => {
    const s = newState();
    const q = mk({ id: 'locked', gradeLevel: 5, answerType: 'choice' });
    const r = L.submitAnswer(s, L.startAttempt(q, rng()), 'みず', ctx());
    assert.strictEqual(r.outcome.status, 'error');
    assert.strictEqual(r.outcome.error, 'locked');
    assert.strictEqual(r.state.tickets.count, 20);
  });

  // ---- チケット ----
  test('問題を表示しただけ・ヒントを見ただけ・戻っただけでは、チケットが減らない', () => {
    const s = newState();
    const before = JSON.stringify(s);
    let att = L.startAttempt(choiceQ, rng());
    att = L.revealHint(att);
    att = L.revealHint(att);
    // 「戻る」＝ attempt を捨てるだけ。状態は何も変わらない
    assert.strictEqual(JSON.stringify(s), before);
    assert.strictEqual(s.tickets.count, 20);
  });

  test('4択に正解すると1枚減る', () => {
    const r = L.submitAnswer(newState(), L.startAttempt(choiceQ, rng()), 'みず', ctx());
    assert.strictEqual(r.outcome.status, 'correct');
    assert.strictEqual(r.state.tickets.count, 19);
  });

  test('4択に不正解でも1枚減る', () => {
    const r = L.submitAnswer(newState(), L.startAttempt(choiceQ, rng()), 'いし', ctx());
    assert.strictEqual(r.outcome.status, 'wrong');
    assert.strictEqual(r.state.tickets.count, 19);
  });

  test('チケットが0枚なら4択に回答できない', () => {
    const s = newState();
    s.tickets = { count: 0, lastRecoveredAt: T0 };
    const r = L.submitAnswer(s, L.startAttempt(choiceQ, rng()), 'みず', ctx());
    assert.strictEqual(r.outcome.error, 'noTicket');
    assert.strictEqual(r.state.resources.wood, 0);
  });

  test('自由入力はチケットを使わない', () => {
    const r = L.submitAnswer(newState(), L.startAttempt(inputQ, rng()), 'みず', ctx());
    assert.strictEqual(r.outcome.status, 'correct');
    assert.strictEqual(r.state.tickets.count, 20);
  });

  test('回答した問題には二度回答できない', () => {
    const r = L.submitAnswer(newState(), L.startAttempt(choiceQ, rng()), 'みず', ctx());
    const r2 = L.submitAnswer(r.state, r.attempt, 'みず', ctx());
    assert.strictEqual(r2.outcome.error, 'finished');
    assert.strictEqual(r2.state.tickets.count, 19);
  });

  // ---- 4択 ----
  test('選択肢は表示のたびにシャッフルされ、中身は変わらない', () => {
    const orders = new Set();
    for (let i = 0; i < 30; i++) {
      const att = L.startAttempt(choiceQ, FF.util.makeRng(i));
      assert.deepStrictEqual([...att.choices].sort(), [...choiceQ.choices].sort());
      orders.add(att.choices.join(','));
    }
    assert.ok(orders.size > 5);
  });

  test('回答後は正誤にかかわらず正しい答えと解説を返す', () => {
    const r = L.submitAnswer(newState(), L.startAttempt(choiceQ, rng()), 'いし', ctx());
    assert.strictEqual(r.outcome.correctAnswer, 'みず');
    assert.strictEqual(r.outcome.explanation, '解説');
  });

  // ---- 自由入力 ----
  test('自由入力は3回間違えると終了し、報酬は発生しない', () => {
    let s = newState(), att = L.startAttempt(inputQ, rng());
    let r = L.submitAnswer(s, att, 'いし', ctx());
    assert.strictEqual(r.outcome.status, 'retry');
    assert.strictEqual(r.outcome.attemptsLeft, 2);
    r = L.submitAnswer(r.state, r.attempt, 'き', ctx());
    assert.strictEqual(r.outcome.attemptsLeft, 1);
    r = L.submitAnswer(r.state, r.attempt, 'かぜ', ctx());
    assert.strictEqual(r.outcome.status, 'wrong');
    assert.strictEqual(r.outcome.reward, 0);
    assert.strictEqual(r.outcome.correctAnswer, 'みず');
    assert.strictEqual(r.state.resources.wood, 0);
    const r4 = L.submitAnswer(r.state, r.attempt, 'みず', ctx());
    assert.strictEqual(r4.outcome.error, 'finished');
  });

  test('自由入力の回答回数で報酬が 1.0 / 0.7 / 0.4 倍になる', () => {
    // Lv2 標準 自由入力：15 × 1.2 = 18 → 18 / 12.6→12 / 7.2→7（理科が重点教科でない日に解く）
    const now = nonFocusDay('science');
    const rewards = [];
    for (let wrongFirst = 0; wrongFirst < 3; wrongFirst++) {
      let r = { state: newState(), attempt: L.startAttempt(mk({ id: 'att' + wrongFirst }), rng()) };
      for (let k = 0; k < wrongFirst; k++) r = L.submitAnswer(r.state, r.attempt, 'ちがう', ctx({ now }));
      r = L.submitAnswer(r.state, r.attempt, 'ミズ', ctx({ now }));
      assert.strictEqual(r.outcome.attempts, wrongFirst + 1);
      rewards.push(r.outcome.reward);
    }
    assert.deepStrictEqual(rewards, [18, 12, 7]);
  });

  test('空欄の回答は回数に数えない', () => {
    const att = L.startAttempt(inputQ, rng());
    const r = L.submitAnswer(newState(), att, '  ', ctx());
    assert.strictEqual(r.outcome.error, 'empty');
    assert.strictEqual(r.attempt.wrong, 0);
  });

  // ---- 報酬 ----
  function nonFocusDay(subject) {
    for (let d = 0; d < 10; d++) {
      const t = T0 + d * 86400000;
      if (FF.rewards.focusSubjectOf(t) !== subject) return t;
    }
  }
  function focusDay(subject) {
    for (let d = 0; d < 10; d++) {
      const t = T0 + d * 86400000;
      if (FF.rewards.focusSubjectOf(t) === subject) return t;
    }
  }

  test('正解すると選んだ資源に報酬が入る（Lv2 標準 4択 = 15）', () => {
    const now = nonFocusDay('science');
    const r = L.submitAnswer(newState(), L.startAttempt(choiceQ, rng()), 'みず', ctx({ now, resource: 'stone' }));
    assert.strictEqual(r.outcome.reward, 15);
    assert.strictEqual(r.state.resources.stone, 15);
    assert.strictEqual(r.state.learning.totalEarned.stone, 15);
  });

  test('本日の重点教科なら 1.25 倍', () => {
    const now = focusDay('science');
    const r = L.submitAnswer(newState(), L.startAttempt(choiceQ, rng()), 'みず', ctx({ now }));
    assert.strictEqual(r.outcome.reward, 18);   // 15 × 1.25 = 18.75
  });

  test('施設ボーナスは選んだ資源の施設レベルで決まる', () => {
    const now = nonFocusDay('science');
    const s = newState();
    s.buildings.lumber.level = 3;   // 木材 +20%
    const wood = L.submitAnswer(s, L.startAttempt(choiceQ, rng()), 'みず', ctx({ now, resource: 'wood' }));
    const food = L.submitAnswer(s, L.startAttempt(choiceQ, rng()), 'みず', ctx({ now, resource: 'food' }));
    assert.strictEqual(wood.outcome.reward, 18);
    assert.strictEqual(food.outcome.reward, 15);
  });

  test('ヒントを使うと報酬が減る（ヒント2まで：0.75倍）', () => {
    const now = nonFocusDay('science');
    let att = L.startAttempt(choiceQ, rng());
    att = L.revealHint(L.revealHint(att));
    const r = L.submitAnswer(newState(), att, 'みず', ctx({ now }));
    assert.strictEqual(r.outcome.reward, 11);   // 15 × 0.75 = 11.25
  });

  test('ヒントは問題が持つ数までしか開かない', () => {
    let att = L.startAttempt(mk({ hints: ['だけ'] }), rng());
    att = L.revealHint(L.revealHint(L.revealHint(att)));
    assert.strictEqual(att.hintsShown, 1);
  });

  test('同じ問題を繰り返し正解すると報酬が 1.0 → 0.5 → 0.1 倍', () => {
    const now = nonFocusDay('science');
    let s = newState();
    const got = [];
    for (let i = 0; i < 3; i++) {
      const r = L.submitAnswer(s, L.startAttempt(choiceQ, rng()), 'みず', ctx({ now: now + i * 60000 }));
      got.push(r.outcome.reward);
      s = r.state;
    }
    assert.deepStrictEqual(got, [15, 7, 1]);
  });

  test('正答率が低い間は報酬が割り引かれる', () => {
    const now = nonFocusDay('science');
    const s = newState();
    s.learning.stats.science = { 2: { attempts: 10, correct: 3, choice: { attempts: 10, correct: 3 }, input: { attempts: 0, correct: 0 }, hintsUsed: 0, recent: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0] } };
    const r = L.submitAnswer(s, L.startAttempt(choiceQ, rng()), 'みず', ctx({ now }));
    // 15 × (0.3/0.6)^4 = 0.9375 → 最低1
    assert.strictEqual(r.outcome.reward, 1);
    assert.ok(Math.abs(r.outcome.breakdown.accuracy - 0.0625) < 1e-12);
  });

  // ---- 学習記録 ----
  test('学習記録：挑戦数・正解数・形式別・ヒント・直近10問・連続正解・履歴・累計', () => {
    let s = newState();
    const results = [true, true, false, true];
    results.forEach((ok, i) => {
      const q = i % 2 ? inputQ : choiceQ;
      let att = L.startAttempt(q, rng());
      if (i === 0) att = L.revealHint(att);
      let r = L.submitAnswer(s, att, ok ? 'みず' : 'いし', ctx({ now: T0 + i * 1000 }));
      while (r.outcome.status === 'retry') r = L.submitAnswer(r.state, r.attempt, 'いし', ctx({ now: T0 + i * 1000 }));
      s = r.state;
    });
    const cell = s.learning.stats.science[2];
    assert.strictEqual(cell.attempts, 4);
    assert.strictEqual(cell.correct, 3);
    assert.deepStrictEqual(plain(cell.choice), { attempts: 2, correct: 1 });
    assert.deepStrictEqual(plain(cell.input), { attempts: 2, correct: 2 });
    assert.strictEqual(cell.hintsUsed, 1);
    assert.deepStrictEqual(plain(cell.recent), [1, 1, 0, 1]);
    assert.deepStrictEqual(plain(s.learning.streak), { current: 1, best: 2 });
    assert.strictEqual(s.learning.history.length, 4);
    assert.strictEqual(s.learning.history[2].correct, false);
    assert.strictEqual(s.learning.history[2].reward, 0);
    assert.strictEqual(s.learning.totalEarned.wood, s.resources.wood);
    const sum = L.subjectSummary(s, 'science');
    assert.strictEqual(sum.rate, 0.75);
  });

  test('直近の記録は10問まで、学習履歴は500件まで', () => {
    let s = newState();
    for (let i = 0; i < 520; i++) {
      const r = L.submitAnswer(s, L.startAttempt(mk({ id: 'h' + i }), rng()), 'みず', ctx({ now: T0 + i }));
      s = r.state;
    }
    assert.strictEqual(s.learning.stats.science[2].recent.length, 10);
    assert.strictEqual(s.learning.history.length, 500);
    assert.strictEqual(s.learning.history[0].qid, 'h20');
  });

  test('直近10問の正答率が40%未満なら「ひとつ下の学年」を勧める（自動では下げない）', () => {
    const s = newState();
    const cell = recent => ({ attempts: 10, correct: 0, choice: { attempts: 0, correct: 0 }, input: { attempts: 0, correct: 0 }, hintsUsed: 0, recent });
    s.learning.stats.science = { 2: cell([1, 1, 1, 0, 0, 0, 0, 0, 0, 0]), 1: cell([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) };
    assert.strictEqual(L.shouldRecommendLower(s, 'science', 2), true);
    assert.strictEqual(L.shouldRecommendLower(s, 'science', 1), false);   // Lv1 より下はない
    s.learning.stats.science[2] = cell([1, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
    assert.strictEqual(L.shouldRecommendLower(s, 'science', 2), false);   // 40% ちょうど
    s.learning.stats.science[2] = cell([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    assert.strictEqual(L.shouldRecommendLower(s, 'science', 2), false);   // 9問しかない
    assert.strictEqual(L.unlockedGrade(s, 'science'), 2);
  });

  test('教科ごとの到達状況の一覧', () => {
    const s = newState();
    s.learning.unlocked.math = 6;
    assert.strictEqual(L.progressLine(s), '算数 Lv6 / 国語 Lv2 / 生活（理科） Lv2 / 生活（社会） Lv2 / 英語 Lv2');
    s.learning.unlocked.math = 7;
    assert.ok(L.progressLine(s).startsWith('数学 Lv7'));
  });
  // ---- 難易度「ランダム」（学習画面の初期値） ----
  test("難易度ランダム：出せる難易度だけから、ほぼ同じ割合で選ぶ（問題がない難易度は出さない）", () => {
    const bank = L.createBank([mk({ id: "rb", difficulty: "basic" }), mk({ id: "ra2", difficulty: "advanced" })]);
    assert.deepStrictEqual(Array.from(L.availableDifficulties(bank, "science", 2, "input")), ["basic", "advanced"]);
    assert.strictEqual(L.isAvailable(bank, "science", 2, "random", "input"), true);
    assert.strictEqual(L.isAvailable(bank, "science", 2, "random", "choice"), false);
    const count = { basic: 0, standard: 0, advanced: 0 };
    const r = FF.util.makeRng(7);
    for (let i = 0; i < 2000; i++) count[L.pickQuestion(bank, { subject: "science", grade: 2, difficulty: "random", answerType: "input" }, { now: T0, rng: r }).difficulty]++;
    assert.strictEqual(count.standard, 0);
    assert.ok(Math.abs(count.basic - 1000) < 100 && Math.abs(count.advanced - 1000) < 100, JSON.stringify(count));
    assert.strictEqual(L.pickQuestion(bank, { subject: "science", grade: 2, difficulty: "random", answerType: "choice" }, { now: T0, rng: r }), null);
  });

  test("難易度ランダム：算数（自動生成）は3つの難易度が出て、報酬は出た問題の難易度で決まる", () => {
    const bank = L.createBank([]);
    const seen = {};
    const r = FF.util.makeRng(11);
    for (let i = 0; i < 300; i++) seen[L.pickQuestion(bank, { subject: "math", grade: 2, difficulty: "random", answerType: "input" }, { now: T0, rng: r }).difficulty] = true;
    assert.deepStrictEqual(Object.keys(seen).sort(), ["advanced", "basic", "standard"]);
    const q = L.pickQuestion(bank, { subject: "math", grade: 2, difficulty: "random", answerType: "input" }, { now: T0, rng: FF.util.makeRng(3) });
    const res = L.submitAnswer(newState(), L.startAttempt(q), String(q.answer), ctx());
    assert.strictEqual(res.outcome.breakdown.difficulty, FF.balance.DIFFICULTY_MULT[q.difficulty]);
  });
};
