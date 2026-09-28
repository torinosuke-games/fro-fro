// 勉強量ポイントと引換所（SPEC 8.4・14.2・14.4・14.5・19、DESIGN 第14章）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const P = FF.points;
  const B = FF.balance;
  const SP = B.STUDY_POINTS;
  const T0 = 1790000000000;
  const HOUR = 60 * 60 * 1000;
  const bank = FF.learning.createBank(ctx.QUESTION_BANK);

  // DESIGN 14.1 の表をそのまま書いた比較用の値（balance.js の値の検証も兼ねる）
  const TABLE = {
    basic: [8, 12, 18, 24, 30, 38, 48, 60, 72],
    standard: [10, 15, 22, 30, 38, 48, 60, 75, 90],
    advanced: [13, 20, 29, 39, 49, 62, 78, 98, 117]
  };
  // 倍率を整数に直した比較用の値（SPEC 8.2）
  const MULT = {
    hint: [100, 90, 75, 50],            // /100
    attempt: { 1: 10, 2: 7, 3: 4 },     // /10
    repeat: [10, 5, 1]                  // /10
  };

  function expected(p) {
    const num = TABLE[p.difficulty][p.grade - 1] * MULT.hint[p.hintsUsed] *
      (p.answerType === 'input' ? MULT.attempt[p.attempt] : 10) * MULT.repeat[Math.min(p.repeatCount, 2)];
    return Math.max(1, Math.floor(num / (100 * 10 * 10)));
  }

  let seq = 0;
  function mkQ(o) {
    seq++;
    return Object.assign({
      id: `test_pt_${seq}`, subject: 'science', gradeLevel: 9, unit: 't', difficulty: 'standard',
      answerType: 'input', question: '問題', answer: 'みず', acceptedAnswers: [], validationMode: 'kana-insensitive',
      hints: ['h1', 'h2', 'h3'], explanation: 'e', reviewed: true
    }, o);
  }
  function newState() {
    const s = FF.state.createDefaultState(T0);
    FF.defs.SUBJECTS.forEach(sub => { s.learning.unlocked[sub.id] = 9; });
    return s;
  }
  // 学習で1問に答える（書き問題は1回目で input を答える）
  function answer(s, q, input, now = T0, resource = 'wood') {
    const att = FF.learning.startAttempt(q, FF.util.makeRng(1));
    return FF.learning.submitAnswer(s, att, input, { now, resource });
  }

  // ---- 計算式（SPEC 8.4） ----
  test('基本ポイントの表が DESIGN 14.1 のとおり（学年・難易度が上がるほど高い）', () => {
    for (let g = 1; g <= 9; g++) {
      for (const d of ['basic', 'standard', 'advanced']) assert.strictEqual(SP.BASE[g][d], TABLE[d][g - 1], `Lv${g} ${d}`);
      assert.ok(SP.BASE[g].basic < SP.BASE[g].standard && SP.BASE[g].standard < SP.BASE[g].advanced, `Lv${g}`);
      if (g > 1) for (const d of ['basic', 'standard', 'advanced']) assert.ok(SP.BASE[g][d] > SP.BASE[g - 1][d], `Lv${g} ${d}`);
    }
  });

  test('時間あたりの pt の学年差は Lv1 と Lv9 で 1.5 倍まで（きょうだいで遊び時間の差を大きくしない）', () => {
    const perSec = g => SP.BASE[g].standard / FF.simulator.secForGrade(g, B);
    for (let g = 2; g <= 9; g++) assert.ok(perSec(g) >= perSec(g - 1) - 1e-9, `Lv${g} は Lv${g - 1} 以上`);
    const ratio = perSec(9) / perSec(1);
    assert.ok(ratio >= 1.4 && ratio <= 1.5 + 1e-9, `Lv9 / Lv1 = ${ratio}`);
  });

  test('全倍率の組み合わせが計算式どおり（正答率倍率 1.0 の場合）', () => {
    let count = 0;
    for (let grade = 1; grade <= 9; grade++)
      for (const difficulty of ['basic', 'standard', 'advanced'])
        for (const answerType of ['choice', 'input'])
          for (let hintsUsed = 0; hintsUsed <= 3; hintsUsed++)
            for (const attempt of answerType === 'input' ? [1, 2, 3] : [1])
              for (let repeatCount = 0; repeatCount <= 3; repeatCount++) {
                const p = { grade, difficulty, answerType, hintsUsed, attempt, repeatCount, recent: [] };
                const got = P.calcPoints(p);
                if (got !== expected(p)) assert.fail(`${JSON.stringify(p)} → ${got}（期待値 ${expected(p)}）`);
                count++;
              }
    assert.strictEqual(count, 9 * 3 * 4 * 4 * 4);
  });

  test('施設ボーナス・重点教科倍率・形式倍率は pt にかからない', () => {
    const p = { grade: 5, difficulty: 'standard', answerType: 'choice', hintsUsed: 0, attempt: 1, repeatCount: 0, recent: [] };
    const base = P.calcPoints(p);
    assert.strictEqual(base, 38);
    assert.strictEqual(P.calcPoints(Object.assign({}, p, { facilityLevel: 5, isFocusSubject: true })), base);
    assert.strictEqual(P.calcPoints(Object.assign({}, p, { answerType: 'input' })), base);   // 書き問題の 1回目 ＝ 選択問題と同じ
    // 資源のほうは同じ条件で増える（比較）
    assert.ok(FF.rewards.calcReward(Object.assign({}, p, { facilityLevel: 5, isFocusSubject: true })) > FF.rewards.calcReward(p));
  });

  test('正答率倍率が pt にもかかる（直近10問の正答率 30% → (0.3/0.6)^4 = 0.0625）', () => {
    const recent = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
    const bd = P.pointsBreakdown({ grade: 9, difficulty: 'advanced', answerType: 'choice', recent });
    assert.ok(Math.abs(bd.accuracy - 0.0625) < 1e-12);
    assert.strictEqual(bd.total, Math.floor(117 * 0.0625));   // 7
    // 正答率 60% 以上なら割り引かない
    assert.strictEqual(P.calcPoints({ grade: 9, difficulty: 'advanced', answerType: 'choice', recent: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0] }), 117);
  });

  test('最低でも 1pt、小数点以下は切り捨て', () => {
    // 8 × 0.5 × 0.1 = 0.4 → 1
    assert.strictEqual(P.calcPoints({ grade: 1, difficulty: 'basic', answerType: 'choice', hintsUsed: 3, repeatCount: 2, recent: [] }), 1);
    // 22 × 0.9 = 19.8 → 19
    assert.strictEqual(P.calcPoints({ grade: 3, difficulty: 'standard', answerType: 'choice', hintsUsed: 1, recent: [] }), 19);
  });

  test('当てずっぽうの選択問題では pt がほとんど貯まらない（Lv9 発展の定常 ≦ Lv1 標準をまじめに解いた場合の 1/3）', () => {
    const g = FF.simulator.guessExpectation({ grade: 9, difficulty: 'advanced', pGuess: 0.25, answers: 200, kind: 'points' });
    const honest = FF.simulator.expectedPerQuestion({ grade: 1, difficulty: 'standard', answerType: 'choice', secPerQuestion: 10, accuracy: 0.9, kind: 'points' }).reward;
    assert.ok(g.steady < honest / 3, `当てずっぽう ${g.steady.toFixed(2)} ／ まじめ ${honest.toFixed(2)}`);
    // 最初の20問（記録の不足分を 60% とみなす間）でも、まじめに解いた場合を上回らない
    assert.ok(g.avgFirst(20) < honest, `最初の20問 ${g.avgFirst(20).toFixed(2)}`);
  });

  // ---- 学習の回答への組み込み ----
  test('同じ問題に24時間以内にくり返し正解すると 1.0 → 0.5 → 0.1 倍（90 → 45 → 9）。24時間たつと元に戻る', () => {
    const q = mkQ({});
    let s = newState();
    const got = [];
    for (let i = 0; i < 4; i++) {
      const r = answer(s, q, 'みず', T0 + i * 1000);
      got.push(r.outcome.points);
      s = r.state;
    }
    assert.deepStrictEqual(got, [90, 45, 9, 9]);
    assert.strictEqual(answer(s, q, 'みず', T0 + 3000 + 24 * HOUR).outcome.points, 90);
  });

  test('正解で残高と累計が増え、資源とは別に記録される。まちがいでは増えない', () => {
    let s = newState();
    const r1 = answer(s, mkQ({ gradeLevel: 5 }), 'みず');
    assert.strictEqual(r1.outcome.status, 'correct');
    assert.strictEqual(r1.outcome.points, 38);
    assert.strictEqual(r1.state.studyPoints, 38);
    assert.strictEqual(r1.state.studyPointsEarnedTotal, 38);
    assert.strictEqual(r1.state.resources.wood, s.resources.wood + r1.outcome.reward);
    assert.notStrictEqual(r1.outcome.points, r1.outcome.reward);
    const h = r1.state.learning.history[r1.state.learning.history.length - 1];
    assert.strictEqual(h.points, 38);
    // 書き問題を3回まちがえる
    s = r1.state;
    const q = mkQ({});
    let att = FF.learning.startAttempt(q);
    let r;
    for (let i = 0; i < 3; i++) { r = FF.learning.submitAnswer(s, att, 'いし', { now: T0, resource: 'wood' }); s = r.state; att = r.attempt; }
    assert.strictEqual(r.outcome.status, 'wrong');
    assert.strictEqual(r.outcome.points, 0);
    assert.strictEqual(s.studyPoints, 38);
    assert.strictEqual(s.learning.history[s.learning.history.length - 1].points, 0);
  });

  test('書き問題の2回目・3回目の正解は回答回数倍率（0.7・0.4）、ヒントはヒント倍率がかかる', () => {
    const s = newState();
    const q = mkQ({});
    let att = FF.learning.startAttempt(q);
    let r = FF.learning.submitAnswer(s, att, 'いし', { now: T0, resource: 'wood' });
    r = FF.learning.submitAnswer(r.state, r.attempt, 'みず', { now: T0, resource: 'wood' });
    assert.strictEqual(r.outcome.points, 63);   // 90 × 0.7
    att = FF.learning.revealHint(FF.learning.revealHint(FF.learning.startAttempt(mkQ({}))));
    assert.strictEqual(FF.learning.submitAnswer(s, att, 'みず', { now: T0, resource: 'wood' }).outcome.points, 67);   // 90 × 0.75 = 67.5
  });

  test('昇格試験・実力診断・探索・戦闘では pt が増えない', () => {
    // 昇格試験：すべて正解して合格しても増えない
    let s = FF.state.createDefaultState(T0);
    const ex = FF.exam.startExam(bank, s, 'math', 3, T0, FF.util.makeRng(1));
    assert.strictEqual(ex.ok, true);
    let exam = ex.exam;
    for (const it of exam.items) exam = FF.exam.answerExam(exam, String(it.question.answer)).exam;
    const fin = FF.exam.finishExam(s, exam, T0);
    assert.strictEqual(fin.passed, true);
    assert.strictEqual(fin.state.studyPoints, 0);
    assert.strictEqual(fin.state.studyPointsEarnedTotal, 0);
    // 実力診断：回答（answerDiagnosis）は状態を受け取らず、結果の反映（applyDiagnosis）でも増えない
    const dg = FF.exam.applyDiagnosis(FF.state.createDefaultState(T0), 'math', 9, T0);
    assert.strictEqual(dg.studyPoints, 0);
    assert.strictEqual(dg.studyPointsEarnedTotal, 0);
    // 探索
    s = FF.state.createDefaultState(T0);
    s.buildings.furnace.level = 3;
    const q = { id: 'test_pt_ex', subject: 'math', gradeLevel: 1, unit: 't', difficulty: 'basic', answerType: 'input', question: '1+1', answer: '2', acceptedAnswers: [], validationMode: 'number', hints: ['h'], explanation: 'e', reviewed: true };
    const rx = FF.exploration.answerExplore(s, 'snowfield', FF.learning.startAttempt(q), '2', T0, FF.util.makeRng(1));
    assert.strictEqual(rx.outcome.status, 'correct');
    assert.strictEqual(rx.state.studyPoints, 0);
    // 戦闘：勝つまで正解しても増えない
    s = FF.state.createDefaultState(T0);
    s.buildings.furnace.level = 5;
    const enemy = 'sf_enemy_fangs';
    let bs = s;
    while (!FF.battle.startBattle(bs, 'snowfield', enemy) && FF.exploration.regionState(bs, 'snowfield').position < FF.exploration.gateIndex('snowfield')) {
      bs = FF.exploration.advance(bs, 'snowfield', T0, FF.util.makeRng(1)).state;
    }
    const bat = FF.battle.startBattle(bs, 'snowfield', enemy);
    assert.ok(bat);
    let rb = { state: bs, battle: bat };
    while (!rb.battle.result) rb = FF.battle.answerBattle(rb.state, rb.battle, FF.learning.startAttempt(q), '2', T0, FF.util.makeRng(2));
    assert.strictEqual(rb.battle.result, 'win');
    const won = FF.battle.winBattle(rb.state, 'snowfield', enemy, T0).state;
    assert.strictEqual(won.studyPoints, 0);
    assert.strictEqual(won.studyPointsEarnedTotal, 0);
  });

  // ---- 保存（SPEC 14.2） ----
  test('pt の残高・累計・引換の履歴（使った日時を含む）・交換レートが、エクスポート／インポートで元に戻る', () => {
    let s = newState();
    s = answer(s, mkQ({}), 'みず').state;
    s.settings.pointsPerHour = 1800;
    s.studyPoints += 5000;
    let rd = P.redeem(s, { minutes: 30, method: 'print', now: T0 + 1, rng: FF.util.makeRng(9) });
    assert.strictEqual(rd.ok, true);
    rd = P.redeem(rd.state, { minutes: 15, method: 'print', now: T0 + 2, rng: FF.util.makeRng(8) });
    rd = P.useTicket(rd.state, rd.state.redeemHistory[0].id, T0 + 3);
    assert.strictEqual(rd.ok, true);
    const back = FF.state.parseSave(FF.state.serialize(rd.state), T0 + 4);
    assert.strictEqual(back.ok, true);
    for (const k of ['studyPoints', 'studyPointsEarnedTotal', 'redeemHistory', 'resources']) assert.deepStrictEqual(plain(back.state[k]), plain(rd.state[k]), k);
    assert.strictEqual(back.state.settings.pointsPerHour, 1800);
    assert.strictEqual(back.state.redeemHistory[0].usedAt, T0 + 3);
    assert.strictEqual('usedAt' in back.state.redeemHistory[1], false);
  });

  test('保存データの pt を書き換えると読み込まない（改ざん検出）', () => {
    const s = newState();
    s.studyPoints = 100;
    const text = FF.state.serialize(s);
    const tampered = text.replace('"studyPoints":100', '"studyPoints":999999');
    assert.notStrictEqual(tampered, text);
    assert.strictEqual(FF.state.parseSave(tampered, T0).ok, false);
  });

  test('読み込み時の整合：おかしな残高は 0、形のおかしい履歴は捨てる、交換レートの範囲外は初期値', () => {
    const s = newState();
    s.studyPoints = -5;
    s.studyPointsEarnedTotal = 1.5;
    s.redeemHistory = [
      { id: 'K7QX-3M9P', issuedAt: T0, points: 3000, minutes: 60, pointsPerHour: 3000, method: 'print' },
      { id: '', issuedAt: T0, points: 3000, minutes: 60, pointsPerHour: 3000, method: 'print' },
      { id: 'X', issuedAt: T0, points: -1, minutes: 60, pointsPerHour: 3000, method: 'print' },
      { id: 'M2QA-7KXE', issuedAt: T0, points: 750, minutes: 15, pointsPerHour: 3000, method: 'mail', usedAt: 'きのう' },
      { id: 'P9RT-4HNW', issuedAt: T0, points: 750, minutes: 15, pointsPerHour: 3000, method: 'print', usedAt: T0 + 9 },
      'text', null
    ];
    s.settings.pointsPerHour = 99;
    s.settings.parentEmail = 'parent@example.com';   // 前の版のセーブ（メールでの申請をやめたので消す）
    const r = FF.state.migrate(JSON.parse(JSON.stringify(s)), T0);
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.state.studyPoints, 0);
    assert.strictEqual(r.state.studyPointsEarnedTotal, 0);
    // 前にメールで発行した券は残す。使った日時の形がおかしければ、使っていない券として扱う
    assert.deepStrictEqual(plain(r.state.redeemHistory.map(h => h.id)), ['K7QX-3M9P', 'M2QA-7KXE', 'P9RT-4HNW']);
    assert.strictEqual(P.isUsed(r.state.redeemHistory[1]), false);
    assert.strictEqual('usedAt' in r.state.redeemHistory[1], false);
    assert.strictEqual(r.state.redeemHistory[2].usedAt, T0 + 9);
    assert.strictEqual(r.state.settings.pointsPerHour, SP.PER_HOUR_DEFAULT);
    assert.strictEqual('parentEmail' in r.state.settings, false);
    // 範囲の端はそのまま
    for (const v of [SP.PER_HOUR_MIN, SP.PER_HOUR_MAX]) {
      s.settings.pointsPerHour = v;
      assert.strictEqual(FF.state.migrate(JSON.parse(JSON.stringify(s)), T0).state.settings.pointsPerHour, v);
    }
  });

  test('新規のセーブは残高 0・交換レート 3,000pt ＝ 1時間（メールアドレスの項目はない）', () => {
    const s = FF.state.createDefaultState(T0);
    assert.strictEqual(s.studyPoints, 0);
    assert.strictEqual(s.studyPointsEarnedTotal, 0);
    assert.deepStrictEqual(plain(s.redeemHistory), []);
    assert.strictEqual(s.settings.pointsPerHour, 3000);
    assert.strictEqual('parentEmail' in s.settings, false);
  });

  // ---- 交換レートと時間（SPEC 14.4・14.5） ----
  test('換算できる時間と必要な pt：交換レートを変えると換算が変わる', () => {
    assert.strictEqual(P.minutesFor(12345, 3000), 246);
    assert.strictEqual(P.formatMinutes(P.minutesFor(12345, 3000)), '4時間6分');
    assert.strictEqual(P.minutesFor(10500, 3000), 210);
    assert.strictEqual(P.formatMinutes(210), '3時間30分');
    assert.strictEqual(P.minutesFor(350, 100), 210);       // 仕様の旧い例（100pt ＝ 1時間）
    assert.strictEqual(P.minutesFor(12345, 2400), 308);
    assert.strictEqual(P.minutesFor(49, 3000), 0);
    assert.strictEqual(P.costFor(60, 3000), 3000);
    assert.strictEqual(P.costFor(15, 3000), 750);
    assert.strictEqual(P.costFor(15, 1001), 251);          // 250.25 → 切り上げ
    assert.strictEqual(P.costFor(30, 2400), 1200);
    for (const rate of [100, 999, 2400, 3000, 7777, 100000])
      for (const m of SP.PRESET_MINUTES) assert.ok(P.minutesFor(P.costFor(m, rate), rate) >= m, `${rate} ${m}`);
    const s = newState();
    s.studyPoints = 6000;
    assert.strictEqual(P.minutesFor(s.studyPoints, P.rateOf(s)), 120);
    s.settings.pointsPerHour = 4000;
    assert.strictEqual(P.minutesFor(s.studyPoints, P.rateOf(s)), 90);
  });

  test('時間の表示：「45分」「2時間」「1時間30分」、ふりがな入りは記法を外すと同じ文字', () => {
    assert.strictEqual(P.formatMinutes(45), '45分');
    assert.strictEqual(P.formatMinutes(120), '2時間');
    assert.strictEqual(P.formatMinutes(90), '1時間30分');
    assert.strictEqual(P.formatMinutes(0), '0分');
    for (const m of [0, 1, 5, 15, 30, 45, 60, 90, 120, 246, 1234]) {
      assert.strictEqual(FF.util.plainText(P.formatMinutesMarkup(m)), P.formatMinutes(m));
    }
    assert.strictEqual(P.formatMinutesMarkup(15), '15{分|ふん}');
    assert.strictEqual(P.formatMinutesMarkup(90), '1{時間|じかん}30{分|ぷん}');
  });

  test('交換レートの範囲：100〜100,000 の整数', () => {
    for (const v of [100, 3000, 100000]) assert.strictEqual(P.isValidRate(v), true, v);
    for (const v of [99, 100001, 0, -3000, 1500.5, '3000', NaN, Infinity, null]) assert.strictEqual(P.isValidRate(v), false, String(v));
  });

  // ---- 引換（SPEC 14.5） ----
  test('引換で残高が減り、履歴に記録される（累計は減らない）。発行したときのレートを残す', () => {
    const s = newState();
    s.studyPoints = 10000;
    s.studyPointsEarnedTotal = 10000;
    const r = P.redeem(s, { minutes: 90, method: 'print', now: T0 + 5, rng: FF.util.makeRng(1) });
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.state.studyPoints, 10000 - 4500);
    assert.strictEqual(r.state.studyPointsEarnedTotal, 10000);
    assert.strictEqual(r.state.redeemHistory.length, 1);
    assert.deepStrictEqual(plain(r.state.redeemHistory[0]), plain(r.entry));
    assert.deepStrictEqual(plain(Object.keys(r.entry)), ['id', 'issuedAt', 'points', 'minutes', 'pointsPerHour', 'method']);
    assert.strictEqual(r.entry.points, 4500);
    assert.strictEqual(r.entry.minutes, 90);
    assert.strictEqual(r.entry.pointsPerHour, 3000);
    assert.strictEqual(r.entry.issuedAt, T0 + 5);
    assert.strictEqual(P.isValidTicketId(r.entry.id), true);
    // 元の状態は変えない
    assert.strictEqual(s.studyPoints, 10000);
    assert.strictEqual(s.redeemHistory.length, 0);
    // 交換レートを変えると、必要な pt も変わる
    r.state.settings.pointsPerHour = 2400;
    const r2 = P.redeem(r.state, { minutes: 60, method: 'print', now: T0 + 6, rng: FF.util.makeRng(2) });
    assert.strictEqual(r2.entry.points, 2400);
    assert.strictEqual(r2.state.studyPoints, 10000 - 4500 - 2400);
    assert.strictEqual(r2.state.redeemHistory[0].pointsPerHour, 3000);
  });

  test('残高が足りないときは発行できない（ちょうどなら発行できる）', () => {
    const s = newState();
    s.studyPoints = 2999;
    const r = P.redeem(s, { minutes: 60, method: 'print', now: T0, rng: FF.util.makeRng(1) });
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.error, 'notEnough');
    s.studyPoints = 3000;
    const ok = P.redeem(s, { minutes: 60, method: 'print', now: T0, rng: FF.util.makeRng(1) });
    assert.strictEqual(ok.ok, true);
    assert.strictEqual(ok.state.studyPoints, 0);
  });

  test('方式は印刷だけ（メールでは発行できない）', () => {
    const s = newState();
    s.studyPoints = 9000;
    assert.strictEqual(P.redeem(s, { minutes: 30, method: 'mail', now: T0, rng: FF.util.makeRng(1) }).error, 'badMethod');
    assert.strictEqual(P.redeem(s, { minutes: 30, method: 'print', now: T0, rng: FF.util.makeRng(1) }).ok, true);
  });

  // ---- 券を使う（判断173） ----
  test('［この券を使う］で使用済みになり、2回目は使えない。ほかの券・残高には触れない', () => {
    let s = newState();
    s.studyPoints = 9000;
    s = P.redeem(s, { minutes: 30, method: 'print', now: T0, rng: FF.util.makeRng(1) }).state;
    s = P.redeem(s, { minutes: 30, method: 'print', now: T0 + 1, rng: FF.util.makeRng(2) }).state;
    const [a, b] = s.redeemHistory.map(h => h.id);
    assert.strictEqual(P.isUsed(s.redeemHistory[0]), false);
    const r = P.useTicket(s, a, T0 + 100);
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.entry.usedAt, T0 + 100);
    assert.strictEqual(P.isUsed(r.state.redeemHistory[0]), true);
    assert.strictEqual(P.isUsed(r.state.redeemHistory[1]), false);
    assert.strictEqual(r.state.studyPoints, s.studyPoints);
    // 元の状態は変えない
    assert.strictEqual(P.isUsed(s.redeemHistory[0]), false);
    // 2回目：使えない（使った日時は最初のまま）
    const r2 = P.useTicket(r.state, a, T0 + 200);
    assert.strictEqual(r2.ok, false);
    assert.strictEqual(r2.error, 'alreadyUsed');
    assert.strictEqual(r2.entry.usedAt, T0 + 100);
    // もう1枚は使える。ない ID は notFound
    assert.strictEqual(P.useTicket(r.state, b, T0 + 300).ok, true);
    assert.strictEqual(P.useTicket(r.state, 'ZZZZ-ZZZZ', T0).error, 'notFound');
  });

  test('時間・方式がおかしいときは発行しない', () => {
    const s = newState();
    s.studyPoints = 99999;
    for (const m of [0, -30, 1.5, '30', null]) assert.strictEqual(P.redeem(s, { minutes: m, method: 'print', now: T0 }).error, 'badMinutes', String(m));
    assert.strictEqual(P.redeem(s, { minutes: 30, method: 'fax', now: T0 }).error, 'badMethod');
  });

  test('引換券ID：XXXX-XXXX、見まちがえやすい文字（0・O・1・I）を使わず、履歴と重ならない', () => {
    assert.strictEqual(P.ID_CHARS.length, 32);
    assert.ok(!/[01OI]/.test(P.ID_CHARS));
    const rng = FF.util.makeRng(77);
    const history = [];
    for (let i = 0; i < 3000; i++) {
      const id = P.newTicketId(history, rng);
      assert.ok(/^[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/.test(id), id);
      assert.strictEqual(P.isValidTicketId(id), true, id);
      history.push({ id });
    }
    assert.strictEqual(new Set(history.map(h => h.id)).size, history.length);
    // 同じ乱数でも、履歴にある ID は作り直す
    const first = P.newTicketId([], FF.util.makeRng(5));
    assert.notStrictEqual(P.newTicketId([{ id: first }], FF.util.makeRng(5)), first);
    // 小文字・ハイフンなし・空白入りでも検査できる
    assert.strictEqual(P.isValidTicketId(first.toLowerCase()), true);
    assert.strictEqual(P.isValidTicketId(first.replace('-', ' ')), true);
    for (const bad of ['', 'ABCD-EFG', 'ABCD-EFGHI', 'ABCD-EFG0', null]) assert.strictEqual(P.isValidTicketId(bad), false, String(bad));
  });

  test('引換券ID のチェック文字：1文字の書き誤りと、となり合う2文字の入れかえを見つける（「2」と「Z」の組み合わせだけは見つけられない）', () => {
    const rng = FF.util.makeRng(11);
    let subChecked = 0, swapChecked = 0;
    for (let n = 0; n < 200; n++) {
      const id = P.newTicketId([], rng).replace('-', '');
      for (let i = 0; i < 8; i++) {
        for (const c of P.ID_CHARS) {
          if (c === id[i]) continue;
          if (Math.abs(P.ID_CHARS.indexOf(c) - P.ID_CHARS.indexOf(id[i])) === 31) continue;
          const t = id.slice(0, i) + c + id.slice(i + 1);
          assert.strictEqual(P.isValidTicketId(t), false, `${id} → ${t}`);
          subChecked++;
        }
        if (i < 7 && id[i] !== id[i + 1] && Math.abs(P.ID_CHARS.indexOf(id[i]) - P.ID_CHARS.indexOf(id[i + 1])) !== 31) {
          const t = id.slice(0, i) + id[i + 1] + id[i] + id.slice(i + 2);
          assert.strictEqual(P.isValidTicketId(t), false, `${id} → ${t}`);
          swapChecked++;
        }
      }
    }
    assert.ok(subChecked > 40000 && swapChecked > 1000);
  });

  // ---- QR コードの文字列 ----
  test('QR コードに入れる文字列：引換券ID・名前・時間・発行日時を文字のまま', () => {
    const s = newState();
    s.player.name = 'ユキ⛄';
    const entry = { id: 'K7QX-3M9P', issuedAt: new Date(2026, 0, 5, 9, 7).getTime(), points: 750, minutes: 15, pointsPerHour: 3000, method: 'print' };
    assert.strictEqual(P.qrText(s, entry), 'FROZEN FRONTIER 引換券\nID: K7QX-3M9P\nなまえ: ユキ⛄\nじかん: 15分\nはっこう: 2026-01-05 09:07');
  });
};
