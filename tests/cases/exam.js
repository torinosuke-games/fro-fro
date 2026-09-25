// 昇格試験・実力診断（SPEC 第6章・第19章）
module.exports = ({ test, FF, assert, plain }) => {
  const E = FF.exam;
  const L = FF.learning;
  const T0 = 1790000000000;
  const MIN = 60000;
  const newState = () => E.applyFuriganaAuto(FF.state.createDefaultState(T0));
  const mathBank = L.createBank([]);

  let seq = 0;
  function mk(o) {
    seq++;
    const q = Object.assign({
      id: `exam_q_${seq}`, subject: 'english', gradeLevel: 3, unit: 't', difficulty: 'standard',
      answerType: 'input', question: 'Q', answer: 'yes', acceptedAnswers: [], validationMode: 'exact',
      hints: ['h'], explanation: 'e', reviewed: false
    }, o);
    if (q.answerType === 'choice') q.choices = ['yes', 'no', 'maybe', 'ok'];
    return q;
  }

  // 正解（または不正解）を n 問そろえて試験を終える
  function runExam(state, subject, grade, correctCount, bank = mathBank) {
    const st = E.startExam(bank, state, subject, grade, T0, FF.util.makeRng(grade));
    assert.ok(st.ok, '試験を開始できない: ' + st.reason);
    let exam = st.exam;
    exam.items.forEach((it, i) => {
      const right = it.question.answer;
      const wrong = it.question.answerType === 'choice' ? it.choices.find(c => c !== right) : 'zzz';
      exam = E.answerExam(exam, i < correctCount ? right : wrong).exam;
    });
    return E.finishExam(state, exam, T0);
  }

  test('受験できる範囲は「解放済みの最高学年 +1 〜 +3」', () => {
    const s = newState();
    assert.deepStrictEqual(plain(E.examRange(s, 'math')), { min: 3, max: 5 });
    s.learning.unlocked.math = 7;
    assert.deepStrictEqual(plain(E.examRange(s, 'math')), { min: 8, max: 9 });
    s.learning.unlocked.math = 9;
    assert.strictEqual(E.examRange(s, 'math'), null);
  });

  test('範囲外の学年は受験できない', () => {
    const s = newState();
    assert.strictEqual(E.canTakeExam(s, 'math', 2, T0).ok, false);
    assert.strictEqual(E.canTakeExam(s, 'math', 6, T0).ok, false);
    assert.strictEqual(E.canTakeExam(s, 'math', 3, T0).ok, true);
    assert.strictEqual(E.canTakeExam(s, 'math', 5, T0).ok, true);
  });

  test('5問中4問正解で合格し、受験した学年まで解放される（飛び級）', () => {
    const r = runExam(newState(), 'math', 5, 4);
    assert.strictEqual(r.passed, true);
    assert.strictEqual(r.correct, 4);
    assert.strictEqual(r.state.learning.unlocked.math, 5);
    assert.strictEqual(r.state.learning.unlocked.japanese, 2);
    assert.strictEqual(L.isGradeUnlocked(r.state, 'math', 4), true);
  });

  test('5問中3問正解では不合格', () => {
    const r = runExam(newState(), 'math', 3, 3);
    assert.strictEqual(r.passed, false);
    assert.strictEqual(r.state.learning.unlocked.math, 2);
  });

  test('不合格だと同じ教科は10分間受験できない（ほかの教科は受けられる）', () => {
    const s = runExam(newState(), 'math', 3, 0).state;
    assert.strictEqual(E.canTakeExam(s, 'math', 3, T0 + 10 * MIN - 1).ok, false);
    assert.strictEqual(E.canTakeExam(s, 'math', 3, T0 + 10 * MIN - 1).reason, 'cooldown');
    assert.strictEqual(E.canTakeExam(s, 'math', 3, T0 + 10 * MIN).ok, true);
    assert.strictEqual(E.cooldownRemaining(s, 'math', T0 + 3 * MIN), 7 * MIN);
    assert.strictEqual(E.startExam(mathBank, s, 'math', 3, T0 + MIN, FF.util.makeRng(1)).reason, 'cooldown');
    // 英語は受けられる（問題がないので準備中にはなる）
    assert.strictEqual(E.canTakeExam(s, 'english', 3, T0 + MIN).ok, true);
  });

  test('試験はチケットを使わず、資源の報酬もなく、学習記録にも入らない', () => {
    const s = newState();
    const r = runExam(s, 'math', 3, 5);
    assert.strictEqual(r.state.tickets.count, 20);
    assert.deepStrictEqual(plain(r.state.resources), plain(s.resources));
    assert.deepStrictEqual(plain(r.state.learning.stats), {});
    assert.deepStrictEqual(plain(r.state.learning.correctLog), {});
    assert.strictEqual(r.state.learning.examHistory.length, 1);
    assert.strictEqual(r.state.learning.examHistory[0].passed, true);
  });

  test('算数の試験：その学年の標準問題5問、うち3問以上が自由入力（シードを変えて200回）', () => {
    for (let seed = 0; seed < 200; seed++) {
      const b = E.buildExam(mathBank, 'math', 1 + (seed % 9), FF.util.makeRng(seed));
      assert.ok(b.ok);
      assert.strictEqual(b.items.length, 5);
      assert.ok(b.items.filter(it => it.question.answerType === 'input').length >= 3);
      assert.ok(b.items.every(it => it.question.difficulty === 'standard' && it.question.gradeLevel === 1 + (seed % 9)));
      assert.strictEqual(new Set(b.items.map(it => it.question.id)).size, 5);
    }
  });

  test('標準問題が足りなければ基礎・発展で補う', () => {
    const bank = L.createBank([
      mk({ difficulty: 'standard' }), mk({ difficulty: 'standard', answerType: 'choice' }),
      mk({ difficulty: 'basic' }), mk({ difficulty: 'advanced' }), mk({ difficulty: 'basic', answerType: 'choice' })
    ]);
    const b = E.buildExam(bank, 'english', 3, FF.util.makeRng(3));
    assert.ok(b.ok);
    assert.strictEqual(b.items.length, 5);
    assert.ok(b.items.filter(it => it.question.answerType === 'input').length >= 3);
    assert.strictEqual(b.items.filter(it => it.question.difficulty === 'standard').length, 2);
  });

  test('自由入力が3問に届かなければ「準備中」', () => {
    const bank = L.createBank([
      mk({}), mk({}), mk({ answerType: 'choice' }), mk({ answerType: 'choice' }), mk({ answerType: 'choice' }), mk({ answerType: 'choice' })
    ]);
    assert.strictEqual(E.buildExam(bank, 'english', 3, FF.util.makeRng(1)).ok, false);
    assert.strictEqual(E.isExamAvailable(bank, 'english', 3), false);
    assert.strictEqual(E.startExam(bank, newState(), 'english', 3, T0, FF.util.makeRng(1)).reason, 'unavailable');
  });

  test('問題が1問もない教科・学年は「準備中」（エラーにならない）', () => {
    assert.strictEqual(E.isExamAvailable(L.createBank([]), 'social', 5), false);
  });

  test('試験中の空欄は回答として数えない', () => {
    const st = E.startExam(mathBank, newState(), 'math', 3, T0, FF.util.makeRng(1));
    const r = E.answerExam(st.exam, '');
    assert.strictEqual(r.empty, true);
    assert.strictEqual(r.exam.results.length, 0);
  });

  // ---- 実力診断 ----
  function runDiagnosis(subject, answerFn, bank = mathBank) {
    let d = E.startDiagnosis(subject);
    const grades = [];
    while (!E.isDiagnosisDone(d)) {
      const it = E.nextDiagnosisItem(bank, d, FF.util.makeRng(d.log.length + 1));
      if (!it) break;
      grades.push(d.grade);
      const right = answerFn(d.log.length, d.grade);
      const q = it.question;
      const input = right ? q.answer : (q.answerType === 'choice' ? it.choices.find(c => c !== q.answer) : 'zzz');
      d = E.answerDiagnosis(d, it, input).diag;
    }
    return { d, grades };
  }

  test('診断は Lv5 から始まり、正解で上がり不正解で下がる。最大10問', () => {
    const { d, grades } = runDiagnosis('math', i => i % 2 === 0);
    assert.strictEqual(d.log.length, 10);
    assert.deepStrictEqual(grades, [5, 6, 5, 6, 5, 6, 5, 6, 5, 6]);
    assert.strictEqual(E.diagnosisResult(d), 5);   // Lv5 は 5勝0敗、Lv6 は 0勝5敗
  });

  test('診断で解放されるのは Lv7 まで', () => {
    const { d, grades } = runDiagnosis('math', () => true);
    assert.ok(Math.max(...grades) <= 7);
    assert.strictEqual(E.diagnosisResult(d), 7);
    const s = E.applyDiagnosis(newState(), 'math', 9, T0);
    assert.strictEqual(s.learning.unlocked.math, 7);
  });

  test('全問不正解でも Lv2 は解放されたまま（下がらない）', () => {
    const { d } = runDiagnosis('math', () => false);
    assert.strictEqual(E.diagnosisResult(d), 2);
    const s = newState();
    s.learning.unlocked.math = 4;
    assert.strictEqual(E.applyDiagnosis(s, 'math', 2, T0).learning.unlocked.math, 4);
  });

  test('診断は自由入力を中心に出題する（算数はすべて自由入力）', () => {
    const { d } = runDiagnosis('math', i => i < 5);
    assert.ok(d.log.every(e => e.type === 'input'));
  });

  test('診断は教科ごとに1回だけ', () => {
    let s = newState();
    assert.strictEqual(E.canTakeDiagnosis(s, 'math'), true);
    s = E.applyDiagnosis(s, 'math', 4, T0);
    assert.strictEqual(E.canTakeDiagnosis(s, 'math'), false);
    assert.strictEqual(E.canTakeDiagnosis(s, 'english'), true);
  });

  test('問題がない教科の診断はすぐ終わる（エラーにならない）', () => {
    const { d } = runDiagnosis('social', () => true, L.createBank([]));
    assert.strictEqual(d.log.length, 0);
    assert.strictEqual(E.diagnosisResult(d), 2);
  });

  // ---- ふりがなの自動設定 ----
  test('Lv1〜2 しか解放されていない間はふりがなが ON、試験で上がると OFF', () => {
    let s = newState();
    assert.strictEqual(s.settings.furigana, true);
    s = runExam(s, 'math', 3, 5).state;
    assert.strictEqual(s.settings.furigana, false);
  });

  test('ユーザーが手動で切り替えた後は自動で変えない', () => {
    let s = newState();
    s.settings = { furigana: true, furiganaAuto: false };
    s = runExam(s, 'math', 3, 5).state;
    assert.strictEqual(s.settings.furigana, true);
  });
};
