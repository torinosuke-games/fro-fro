// 漢字の学年配当（v0.3）：問題データの漢字が、その学年で習う字かを学年別漢字配当表・常用漢字表と照らし合わせる。
// Lv1〜6 は「その学年までに配当された字」、Lv7〜9 は「常用漢字」を習った字とみなす（tests/lib/kanji.js）。
// ふりがな付きで出る未習の字は読めるので許す（確認用には一覧を出せる）。
const K = require('../lib/kanji.js');

module.exports = ({ test, FF, ctx, assert }) => {
  const U = FF.util;
  const bank = ctx.QUESTION_BANK || [];
  const fmt = list => list.map(x => `${x.ch}(${K.gradeLabel(x.grade)})`).join(' ');

  // 選択肢そのものが漢字の使い分けを問う単元
  const ASK_CHOICE_UNITS = ['homonym', 'okurigana', 'kanji_meaning'];
  // 字ではなく記号として見せているもの（部首の形・地図記号）
  const SYMBOLS = new Set(['氵', '卍']);
  // 例外（理由を書いて入れる）
  // （japanese_g5_homonym_001 は「就」「突」を Lv5 の選択肢に使っていたので、例外にせず「はかる」に作り直した）
  const ASK_ALLOW = {};

  // 問う漢字：読みの答え {漢字|}、書かせる答え（exact の answer）、使い分けの選択肢
  function askedText(q) {
    const parts = Array.from(q.question.matchAll(/\{([^{}|]+)\|\}/g), m => m[1]);
    if (q.answerType === 'input' && q.validationMode === 'exact') parts.push(q.answer);
    if (q.answerType === 'choice' && ASK_CHOICE_UNITS.includes(q.unit)) parts.push(...q.choices.map(c => U.plainText(c)));
    return parts.join('');
  }

  test('データ：学年別漢字配当表は1026字（80・160・200・202・193・191）、常用漢字は2136字', () => {
    const { KYOIKU, JOYO } = require('../data/kanji.js');
    assert.deepStrictEqual(Object.keys(KYOIKU).map(g => [...KYOIKU[g]].length), [80, 160, 200, 202, 193, 191]);
    assert.strictEqual(new Set([...JOYO]).size, 2136);
    for (const g in KYOIKU) for (const ch of KYOIKU[g]) assert.ok(JOYO.includes(ch), ch);
    assert.strictEqual(K.gradeOf('山'), 1);
    assert.strictEqual(K.gradeOf('暑'), 3);
    assert.strictEqual(K.gradeOf('熱'), 4);
    assert.strictEqual(K.gradeOf('唆'), 7);
    assert.strictEqual(K.gradeOf('鷗'), 8);
    assert.ok(K.learnedBy('唆', 9) && !K.learnedBy('唆', 6) && !K.learnedBy('鷗', 9));
  });

  test('問う漢字（読み・書きの答え、使い分けの選択肢）は、その学年までに習う字', () => {
    const ng = [];
    for (const q of bank) {
      const allow = new Set(ASK_ALLOW[q.id] || []);
      const bad = K.unlearned(askedText(q), q.gradeLevel).filter(x => !allow.has(x.ch));
      if (bad.length) ng.push(`${q.id}: ${fmt(bad)}`);
    }
    assert.ok(ng.length === 0, ng.join('\n'));
  });

  test('ふりがなが付かないまま出る漢字は、その学年までに習う字', () => {
    const ng = [];
    for (const q of bank) {
      const asked = new Set(askedText(q));
      const texts = [q.question, q.explanation].concat(q.hints, q.answerType === 'choice' && q.unit !== 'okurigana' ? q.choices : []);
      const bare = [];
      for (const s of texts) for (const t of U.parseRichText(U.autoRubyMarkup(s))) if (t.text !== undefined) bare.push(t.text);
      const bad = K.unlearned(bare.join(''), q.gradeLevel).filter(x => !asked.has(x.ch) && !SYMBOLS.has(x.ch));
      if (bad.length) ng.push(`${q.id}: ${fmt(bad)}`);
    }
    assert.ok(ng.length === 0, ng.join('\n'));
  });

  test('照合の例：Lv3 の「熱い」は未習、Lv4 なら習った字', () => {
    const q = { question: '「{熱|}い」', answerType: 'choice', choices: [], unit: 'kanji_read', gradeLevel: 3 };
    assert.strictEqual(K.unlearned(askedText(q), 3).length, 1);
    assert.strictEqual(K.unlearned(askedText(q), 4).length, 0);
  });
};
