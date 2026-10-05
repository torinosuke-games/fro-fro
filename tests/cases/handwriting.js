// 手書きの自己採点（判断266）：漢字の書き取りを、書いて、お手本とくらべて、自分で採点する。「書けた」は、ポイントが半分。
module.exports = ({ test, ctx, FF, assert, plain }) => {
  const L = FF.learning, T0 = 1790000000000;
  const rng = () => FF.util.makeRng(7);
  const cx = (o) => Object.assign({ now: T0, resource: 'wood' }, o);
  const base = { subject: 'japanese', gradeLevel: 2, unit: 'kanji_write', difficulty: 'standard', answerType: 'input', question: '「さんか」を漢字で書きましょう。', answer: '参加', acceptedAnswers: [], validationMode: 'exact', hints: ['ヒント1', 'ヒント2'], explanation: '解説', reviewed: false };
  let seq = 0;
  const mk = (o) => Object.assign({}, base, { id: 'hw_q_' + (++seq) }, o);
  const newState = () => FF.exam.applyFuriganaAuto(FF.state.createDefaultState(T0));

  test('手書きにできるのは、国語で、漢字をふくむ答えを exact で判定する書き問題だけ', () => {
    assert.equal(L.canHandwrite(mk()), true);
    assert.equal(L.canHandwrite(mk({ answer: '続く' })), true);
    assert.equal(L.canHandwrite(mk({ answer: 'さんか', validationMode: 'kana-insensitive' })), false);   // 読み
    assert.equal(L.canHandwrite(mk({ answer: '12', validationMode: 'number' })), false);
    assert.equal(L.canHandwrite(mk({ answer: 'ひらがな' })), false);                                      // 漢字をふくまない
    assert.equal(L.canHandwrite(mk({ subject: 'social' })), false);
    assert.equal(L.canHandwrite(mk({ answerType: 'choice', choices: ['参加', 'a', 'b', 'c'] })), false);
    assert.equal(L.canHandwrite(null), false);
  });
  test('自己採点の「書けた」：正解の扱いで、資源と勉強量ポイントが、半分（最低1）', () => {
    const q = mk(), s0 = newState();
    const typed = L.submitAnswer(s0, L.startAttempt(q, rng()), '参加', cx());
    const self = L.submitSelfCheck(s0, L.startAttempt(q, rng()), true, cx());
    assert.equal(typed.outcome.status, 'correct');
    assert.equal(self.outcome.status, 'correct');
    assert.equal(self.outcome.method, 'self');
    assert.equal(self.outcome.rate, FF.balance.HANDWRITING.REWARD_RATE);
    assert.equal(self.outcome.reward, Math.max(1, Math.round(typed.outcome.reward * 0.5)));
    assert.equal(self.outcome.points, Math.max(1, Math.round(typed.outcome.points * 0.5)));
    assert.ok(self.outcome.reward < typed.outcome.reward || typed.outcome.reward === 1);
    assert.equal(self.state.resources.wood, s0.resources.wood + self.outcome.reward);
    assert.equal(self.state.studyPoints, s0.studyPoints + self.outcome.points);
    assert.equal(self.attempt.done, true);
    assert.equal(typed.outcome.method, 'typed');
  });
  test('自己採点の「まちがえた」：不正解で終わる（やり直しにならない）。ポイントはない', () => {
    const q = mk(), s0 = newState();
    const r = L.submitSelfCheck(s0, L.startAttempt(q, rng()), false, cx());
    assert.equal(r.outcome.status, 'wrong');
    assert.equal(r.outcome.reward, 0);
    assert.equal(r.outcome.points, 0);
    assert.equal(r.attempt.done, true);
    assert.equal(r.state.studyPoints, s0.studyPoints);
    assert.equal(r.state.learning.questionResults[q.id], false);
  });
  test('自己採点：終わった問題・手書きにできない問題・まだ解放されていない学年は、エラー', () => {
    const q = mk(), s0 = newState();
    const done = L.submitSelfCheck(s0, L.startAttempt(q, rng()), true, cx());
    assert.equal(L.submitSelfCheck(done.state, done.attempt, true, cx()).outcome.error, 'finished');
    const reading = mk({ answer: 'さんか', validationMode: 'kana-insensitive' });
    assert.equal(L.submitSelfCheck(s0, L.startAttempt(reading, rng()), true, cx()).outcome.error, 'notHandwrite');
    const locked = mk({ gradeLevel: 4 });
    assert.equal(L.submitSelfCheck(s0, L.startAttempt(locked, rng()), true, cx()).outcome.error, 'locked');
  });
  test('手書きの割合は、バランスの値（0より大きく1より小さい）', () => {
    const r = FF.balance.HANDWRITING.REWARD_RATE;
    assert.ok(r > 0 && r < 1);
  });
  test('小4国語の書き取り・送りがな・同音異義語の「書き問題の形」は、手書きにできる。読みの問題はできない', () => {
    let ok = 0;
    for (const q of ctx.QUESTION_BANK.filter(x => x.collection === 'hand_jp4' && x.inputForm)) {
      const v = L.inputVariant(q), can = L.canHandwrite(v);
      if (['kanji_write', 'okurigana', 'homonym'].includes(q.unit)) { assert.equal(can, true, q.id); ok++; }
      else assert.equal(can, false, q.id);
    }
    assert.ok(ok >= 80, '手書きにできる問題が、少なくとも80問ある（いま ' + ok + '問）');
  });
};
