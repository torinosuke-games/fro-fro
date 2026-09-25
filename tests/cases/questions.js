// 問題データの構造チェック（SPEC 10.1・21.3）。questions/*.js のすべての問題を検査する。
module.exports = ({ test, FF, ctx, assert }) => {
  const bank = ctx.QUESTION_BANK || [];

  test(`全問題が第10.1節の構造を満たす（${bank.length} 問）`, () => {
    const errors = [];
    bank.forEach((q, i) => {
      const e = FF.learning.validateQuestion(q);
      if (e.length) errors.push(`${(q && q.id) || '#' + i}: ${e.join(', ')}`);
    });
    assert.ok(errors.length === 0, errors.slice(0, 30).join('\n') + (errors.length > 30 ? `\n…ほか ${errors.length - 30} 件` : ''));
  });

  test('ID の重複がない', () => {
    const seen = new Set(), dup = [];
    bank.forEach(q => { if (seen.has(q.id)) dup.push(q.id); seen.add(q.id); });
    assert.deepStrictEqual(dup, []);
  });

  test('ID が自動生成の問題（gen_ で始まる）と衝突しない', () => {
    assert.strictEqual(bank.filter(q => /^gen_/.test(q.id)).length, 0);
  });

  test('AI が作成した問題はすべて reviewed: false（true は人が検証済みのものだけ）', () => {
    // 検証済みにした問題はここで数を確認する。現時点では 0 問。
    assert.strictEqual(bank.filter(q => q.reviewed === true).length, 0);
  });
};
