// 英語の読み上げ（判断280）：読み上げる英語の取り出し、設定の補完、聞き取りの問題の形。
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const T0 = 1790000000000;
  const S = FF.speech;
  const q = (question, extra) => Object.assign({ subject: 'english', question, answer: 'x', answerType: 'choice' }, extra || {});

  test('読み上げる英語の取り出し：「…」の中の英語。日本語・空欄・ほかの教科は読み上げない', () => {
    assert.equal(S.textFor(q('「apple」は 日本語で どれかな。')), 'apple');
    assert.equal(S.textFor(q('「What\\\'s this?」と 聞かれました。')), "What's this?");
    assert.equal(S.textFor(q('「りんご」を 英語で 言うと どれかな。')), '');
    assert.equal(S.textFor(q('「Banana is ( ).」の ( )に 入る 色は どれかな。')), '');
    assert.equal(S.textFor(q('大文字の「A」の 小文字は どれかな。')), 'A');
    assert.equal(S.textFor(q('音を 聞いて えらぼう。', { listen: 'Good morning.' })), 'Good morning.');
    assert.equal(S.textFor({ subject: 'math', question: '「apple」' }), '');
    assert.equal(S.textFor(null), '');
    assert.ok(S.isEnglish('Open your book.') && S.isEnglish('twenty-one') && !S.isEnglish('りんご') && !S.isEnglish('') && !S.isEnglish('apple りんご'));
  });

  test('答えの読み上げ：答えが英語のときだけ', () => {
    assert.equal(S.answerTextFor(q('x', { answer: 'dog' })), 'dog');
    assert.equal(S.answerTextFor(q('x', { answer: 'いぬ' })), '');
    assert.equal(S.answerTextFor({ subject: 'math', answer: 'dog', answerType: 'choice' }), '');
  });

  test('読み上げの設定：初期値はオン・ふつう。古いセーブはオン・ふつうになる。オフ・速さは保存で残る。変な値はもどる', () => {
    const s = FF.state.createDefaultState(T0);
    assert.equal(s.settings.speech, true);
    assert.equal(s.settings.speechRate, 'normal');
    const a = plain(FF.state.createDefaultState(T0));
    delete a.settings.speech; delete a.settings.speechRate;
    const back0 = FF.state.parseSave(FF.state.serialize(a), T0);
    assert.equal(back0.ok, true);
    assert.equal(back0.state.settings.speech, true);
    assert.equal(back0.state.settings.speechRate, 'normal');
    const b = plain(FF.state.createDefaultState(T0));
    b.settings.speech = false; b.settings.speechRate = 'slow';
    const back1 = FF.state.parseSave(FF.state.serialize(b), T0);
    assert.equal(back1.state.settings.speech, false);
    assert.equal(back1.state.settings.speechRate, 'slow');
    const c = plain(FF.state.createDefaultState(T0));
    c.settings.speech = 'へん'; c.settings.speechRate = 'とても速い';
    const back2 = FF.state.parseSave(FF.state.serialize(c), T0);
    assert.equal(back2.state.settings.speech, true);
    assert.equal(back2.state.settings.speechRate, 'normal');
  });

  for (const g of [4, 5]) test('小' + g + '英語の聞き取りの問題：22問（基礎6・標準9・発展7）。読み上げる英語は英語のみで、問題文に英語を書かず、選択肢は日本語（数字）', () => {
    const ls = ctx.QUESTION_BANK.filter(x => x.unit === 'listening' && x.subject === 'english' && x.gradeLevel === g);
    assert.equal(ls.length, 22);
    const n = d => ls.filter(x => x.difficulty === d).length;
    assert.deepStrictEqual([n('basic'), n('standard'), n('advanced')], [6, 9, 7]);
    for (const x of ls) {
      assert.ok(x.listen && S.isEnglish(x.listen), x.id);
      assert.ok(!/[A-Za-z]/.test(x.question), x.id + ': 問題文に英語がある');
      for (const c of x.choices) assert.ok(!/[A-Za-z]{2,}/.test(c), x.id + ': 選択肢に英語がある');
      assert.equal(x.reviewed, false, x.id);
      assert.ok(x.explanation.includes(x.listen) || x.explanation.includes('「' + x.listen), x.id + ': 解説に英語がない');
      assert.equal(FF.learning.validateQuestion(x).length, 0, x.id);
    }
    assert.equal(new Set(ls.map(x => x.listen)).size, 22);
  });

  test('小5英語の手作り問題：264問（12単元×22）。読み上げる英語が取れる問題が、たくさんある', () => {
    const hand = ctx.QUESTION_BANK.filter(x => x.collection === 'hand_en5');
    assert.equal(hand.length, 264);
    assert.ok(hand.filter(x => S.textFor(x)).length >= 150);
  });
  test('小4英語の手作り問題：読み上げる英語が取れる問題が、たくさんある', () => {
    const hand = ctx.QUESTION_BANK.filter(x => x.collection === 'hand_en4');
    assert.equal(hand.length, 242);
    const speakable = hand.filter(x => S.textFor(x));
    assert.ok(speakable.length >= 150, speakable.length + '問');
  });

  test('読み上げが使えない環境（テスト）：supported は false で、speak は false を返し、例外を出さない', () => {
    assert.equal(S.supported(), false);
    assert.equal(S.speak('apple'), false);
    S.stop();
  });
};
