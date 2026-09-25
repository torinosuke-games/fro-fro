// 答えの判定（SPEC 7.4・第19章）
module.exports = ({ test, FF, assert }) => {
  const A = FF.answer;
  const q = (answer, validationMode, acceptedAnswers) => ({ answerType: 'input', answer, validationMode, acceptedAnswers: acceptedAnswers || [] });
  const ok = (question, input) => A.judgeInput(question, input).correct;

  test('apple / Apple / APPLE / ａｐｐｌｅ / "apple " がすべて正解', () => {
    const question = q('apple', 'exact');
    for (const s of ['apple', 'Apple', 'APPLE', 'ａｐｐｌｅ', 'apple ', '  apple', 'ＡＰＰＬＥ']) assert.ok(ok(question, s), s);
  });

  test('連続する空白は1つにまとめる', () => {
    const question = q('good morning', 'exact');
    assert.ok(ok(question, 'good   morning'));
    assert.ok(ok(question, 'good　morning'));
    assert.ok(!ok(question, 'goodmorning'));
  });

  test('kana-insensitive：「りんご」と「リンゴ」の両方が正解', () => {
    const question = q('りんご', 'kana-insensitive');
    assert.ok(ok(question, 'りんご'));
    assert.ok(ok(question, 'リンゴ'));
    assert.ok(ok(question, 'ﾘﾝｺﾞ'));   // 半角カナ
    assert.ok(!ok(question, 'みかん'));
  });

  test('exact ではひらがなとカタカナを区別する', () => {
    const question = q('りんご', 'exact');
    assert.ok(ok(question, 'りんご'));
    assert.ok(!ok(question, 'リンゴ'));
  });

  test('number：「0.5」と「.5」の両方が正解', () => {
    const question = q('0.5', 'number');
    for (const s of ['0.5', '.5', '0.50', '０．５', ' 0.5 ', '+0.5']) assert.ok(ok(question, s), s);
    assert.ok(!ok(question, '5'));
    assert.ok(!ok(question, '0.05'));
  });

  test('number：3桁ごとのカンマとマイナス記号の異体字', () => {
    assert.ok(ok(q('1000', 'number'), '1,000'));
    assert.ok(ok(q('1000', 'number'), '１，０００'));
    assert.ok(!ok(q('1000', 'number'), '1,00'));
    for (const s of ['-3', '−3', '－3', 'ー3', '‐3']) assert.ok(ok(q('-3', 'number'), s), s);
  });

  test('number：数値でない入力は不正解', () => {
    assert.ok(!ok(q('12', 'number'), '12こ'));
    assert.ok(!ok(q('12', 'number'), 'abc'));
  });

  test('any-of：複数の正解のどれか1つと一致すれば正解', () => {
    const question = q('とうきょう', 'any-of', ['東京', 'Tokyo', 'とうきょう']);
    for (const s of ['東京', 'tokyo', 'TOKYO', 'とうきょう']) assert.ok(ok(question, s), s);
    assert.ok(!ok(question, 'おおさか'));
  });

  test('acceptedAnswers はどのモードでも正解候補になる', () => {
    assert.ok(ok(q('5/4', 'exact', ['1と1/4']), '1と1/4'));
    assert.ok(ok(q('ねこ', 'kana-insensitive', ['cat']), 'CAT'));
  });

  test('空欄は判定しない（empty）', () => {
    const r = A.judgeInput(q('1', 'number'), '   ');
    assert.strictEqual(r.empty, true);
    assert.strictEqual(r.correct, false);
  });

  test('4択は選んだ選択肢が answer と一致するか', () => {
    const question = { answerType: 'choice', answer: '東京', choices: ['東京', '大阪', '京都', '札幌'] };
    assert.strictEqual(A.judge(question, '東京').correct, true);
    assert.strictEqual(A.judge(question, '大阪').correct, false);
  });
};
