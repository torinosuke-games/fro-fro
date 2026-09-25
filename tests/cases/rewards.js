// 報酬計算（SPEC 第8章・第19章）
module.exports = ({ test, FF, assert }) => {
  const R = FF.rewards;
  const HOUR = 60 * 60 * 1000;
  const T0 = 1790000000000;

  // SPEC 8.2 の表をそのまま書いた比較用の値（balance.js の値の検証も兼ねる）。
  // 倍率を整数に直し、整数演算で厳密に切り捨てる。
  const SPEC = {
    base: { 1: 10, 2: 15, 3: 22, 4: 32, 5: 45, 6: 62, 7: 82, 8: 110, 9: 150 },
    difficulty: { basic: 8, standard: 10, advanced: 13 },          // /10
    format: { choice: 10, input: 12 },                             // /10
    hint: [100, 90, 75, 50],                                       // /100
    attempt: { 1: 10, 2: 7, 3: 4 },                                // /10
    repeat: [10, 5, 1],                                            // /10
    facility: { 0: 10, 1: 10, 2: 11, 3: 12, 4: 13, 5: 14 },        // /10
    focus: { false: 100, true: 125 }                               // /100
  };
  const DENOM = 10 * 10 * 100 * 10 * 10 * 10 * 100;

  function expected(p) {
    const num = SPEC.base[p.grade] * SPEC.difficulty[p.difficulty] * SPEC.format[p.answerType] *
      SPEC.hint[p.hintsUsed] * (p.answerType === 'input' ? SPEC.attempt[p.attempt] : 10) *
      SPEC.repeat[Math.min(p.repeatCount, 2)] * SPEC.facility[p.facilityLevel] * SPEC.focus[p.isFocusSubject];
    return Math.max(1, Math.floor(num / DENOM));
  }

  test('全倍率の組み合わせが計算式どおり（正答率倍率 1.0 の場合）', () => {
    let count = 0;
    for (let grade = 1; grade <= 9; grade++)
      for (const difficulty of ['basic', 'standard', 'advanced'])
        for (const answerType of ['choice', 'input'])
          for (let hintsUsed = 0; hintsUsed <= 3; hintsUsed++)
            for (const attempt of answerType === 'input' ? [1, 2, 3] : [1])
              for (let repeatCount = 0; repeatCount <= 3; repeatCount++)
                for (let facilityLevel = 0; facilityLevel <= 5; facilityLevel++)
                  for (const isFocusSubject of [false, true]) {
                    const p = { grade, difficulty, answerType, hintsUsed, attempt, repeatCount, facilityLevel, isFocusSubject, recent: [] };
                    const got = R.calcReward(p);
                    const want = expected(p);
                    if (got !== want) assert.fail(`${JSON.stringify(p)} → ${got}（期待値 ${want}）`);
                    count++;
                  }
    assert.strictEqual(count, 9 * 3 * (1 + 3) * 4 * 4 * 6 * 2);
  });

  test('代表例：Lv5 発展・自由入力・ヒント1・2回目・施設Lv3・重点教科', () => {
    // 45 × 1.3 × 1.2 × 0.9 × 0.7 × 1.0 × 1.2 × 1.25 = 66.339 → 66
    const got = R.calcReward({ grade: 5, difficulty: 'advanced', answerType: 'input', hintsUsed: 1, attempt: 2, repeatCount: 0, facilityLevel: 3, isFocusSubject: true, recent: [] });
    assert.strictEqual(got, 66);
  });

  test('小数点以下は切り捨て', () => {
    // 22 × 0.8 = 17.6 → 17
    assert.strictEqual(R.calcReward({ grade: 3, difficulty: 'basic', answerType: 'choice', recent: [] }), 17);
  });

  test('最低でも1', () => {
    // 10 × 0.8 × 0.5 × 0.1 = 0.4 → 1
    assert.strictEqual(R.calcReward({ grade: 1, difficulty: 'basic', answerType: 'choice', hintsUsed: 3, repeatCount: 2, recent: [] }), 1);
    // 正答率倍率で小さくなっても1
    assert.strictEqual(R.calcReward({ grade: 1, difficulty: 'basic', answerType: 'choice', hintsUsed: 3, recent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }), 1);
  });

  test('4択では回答回数倍率を使わない', () => {
    const a = R.calcReward({ grade: 5, difficulty: 'standard', answerType: 'choice', attempt: 3, recent: [] });
    assert.strictEqual(a, 45);
  });

  test('同じ問題を24時間以内に繰り返すと 1.0 → 0.5 → 0.1', () => {
    let log = {};
    const got = [];
    for (let i = 0; i < 4; i++) {
      const now = T0 + i * HOUR;
      const repeatCount = R.countRecentCorrect(log, 'q1', now);
      got.push(R.calcReward({ grade: 5, difficulty: 'standard', answerType: 'choice', repeatCount, recent: [] }));
      log = R.recordCorrect(log, 'q1', now);
    }
    assert.deepStrictEqual(got, [45, 22, 4, 4]);
  });

  test('24時間経つと反復倍率が元に戻る', () => {
    let log = {};
    log = R.recordCorrect(log, 'q1', T0);
    log = R.recordCorrect(log, 'q1', T0 + HOUR);
    assert.strictEqual(R.countRecentCorrect(log, 'q1', T0 + 24 * HOUR - 1), 2);
    assert.strictEqual(R.countRecentCorrect(log, 'q1', T0 + 24 * HOUR), 1);
    assert.strictEqual(R.countRecentCorrect(log, 'q1', T0 + 25 * HOUR), 0);
  });

  test('反復倍率は問題IDごとに数える', () => {
    let log = R.recordCorrect({}, 'q1', T0);
    assert.strictEqual(R.countRecentCorrect(log, 'q1', T0 + 1), 1);
    assert.strictEqual(R.countRecentCorrect(log, 'q2', T0 + 1), 0);
  });

  test('24時間より古い正解記録は削除される', () => {
    let log = R.recordCorrect({}, 'old', T0);
    log = R.recordCorrect(log, 'new', T0 + 25 * HOUR);
    assert.deepStrictEqual(Object.keys(log), ['new']);
  });

  test('施設ボーナス：Lv0・Lv1 は +0%、Lv2 は +10%、Lv5 は +40%', () => {
    assert.strictEqual(R.facilityMultiplier(0), 1);
    assert.strictEqual(R.facilityMultiplier(1), 1);
    assert.ok(Math.abs(R.facilityMultiplier(2) - 1.1) < 1e-12);
    assert.ok(Math.abs(R.facilityMultiplier(5) - 1.4) < 1e-12);
  });

  test('正答率倍率：60%以上は 1.0', () => {
    assert.strictEqual(R.accuracyMultiplier([1, 1, 1, 1, 1, 1, 0, 0, 0, 0]), 1);
    assert.strictEqual(R.accuracyMultiplier([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), 1);
  });

  test('正答率倍率：60%未満は (a÷0.6)^4', () => {
    const near = (x, y) => assert.ok(Math.abs(x - y) < 1e-9, `${x} ≠ ${y}`);
    near(R.accuracyMultiplier([1, 1, 1, 1, 1, 0, 0, 0, 0, 0]), Math.pow(0.5 / 0.6, 4));
    near(R.accuracyMultiplier([1, 1, 1, 1, 0, 0, 0, 0, 0, 0]), Math.pow(0.4 / 0.6, 4));
    near(R.accuracyMultiplier([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 0);
  });

  test('正答率倍率：記録が10問未満の間は不足分を60%とみなす', () => {
    assert.strictEqual(R.accuracyMultiplier([]), 1);
    assert.ok(Math.abs(R.accuracyMultiplier([0]) - Math.pow(0.54 / 0.6, 4)) < 1e-12);
    assert.strictEqual(R.recentAccuracy([1, 0, 0, 0, 0]), (1 + 0.6 * 5) / 10);
  });

  test('正答率倍率：直近10問だけを使う', () => {
    const recent = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    assert.strictEqual(R.recentAccuracy(recent), 1);
  });

  test('正答率倍率が報酬に反映される', () => {
    // 150 × 1.3 × (0.3/0.6)^4 = 150 × 1.3 × 0.0625 = 12.1875 → 12
    const recent = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
    assert.strictEqual(R.calcReward({ grade: 9, difficulty: 'advanced', answerType: 'choice', recent }), 12);
  });

  test('本日の重点教科は日付で1教科ずつ切り替わる', () => {
    const ids = [];
    for (let d = 0; d < 10; d++) ids.push(R.focusSubjectOf(new Date(2026, 8, 1 + d, 12).getTime()));
    const subjects = FF.defs.SUBJECTS.map(s => s.id);
    for (let d = 1; d < 10; d++) {
      const prev = subjects.indexOf(ids[d - 1]);
      assert.strictEqual(ids[d], subjects[(prev + 1) % subjects.length]);
    }
  });

  test('本日の重点教科は同じ日の中では変わらない', () => {
    const a = R.focusSubjectOf(new Date(2026, 8, 26, 0, 0, 1).getTime());
    const b = R.focusSubjectOf(new Date(2026, 8, 26, 23, 59, 59).getTime());
    assert.strictEqual(a, b);
  });

  test('内訳の total は calcReward と一致する', () => {
    const p = { grade: 7, difficulty: 'standard', answerType: 'input', hintsUsed: 2, attempt: 3, repeatCount: 1, facilityLevel: 4, isFocusSubject: false, recent: [1, 1, 0] };
    assert.strictEqual(R.rewardBreakdown(p).total, R.calcReward(p));
  });
};
