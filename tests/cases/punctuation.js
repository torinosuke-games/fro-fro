// 読点の使い方（判断264の続き）：手作りの問題文・選択肢・ヒント・解説で、助詞のあとの読点を重ねすぎない。
module.exports = ({ test, ctx, assert }) => {
  const strip = s => String(s).replace(/\{([^|}]*)\|[^}]*\}/g, '$1');
  const PART = /[がをにはでともへのやか]、|から、|まで、|より、/g;
  const hand = ctx.QUESTION_BANK.filter(q => q.collection && q.collection.startsWith('hand_'));
  function fields(q) { return [q.question, q.explanation].concat(q.hints || [], q.choices || []); }
  test('手作りの問題の1文に、助詞のあとの読点が4つ以上ない', () => {
    const bad = [];
    for (const q of hand) for (const t of fields(q)) {
      if (String(t).includes('次の文章を読んで')) continue;
      for (const s of strip(t).split(/(?<=[。？！\n])/)) {
        const p = (s.replace(/（[^）]*）/g, '').match(PART) || []).length;
        if (p >= 4) bad.push(q.id + ': ' + s.trim().slice(0, 50));
      }
    }
    assert.deepStrictEqual(bad, []);
  });
  test('手作りの問題文（question）の1文に、助詞のあとの読点が3つ以上ない', () => {
    const bad = [];
    for (const q of hand) {
      if (q.question.includes('次の文章を読んで')) continue;
      for (const s of strip(q.question).split(/(?<=[。？！\n])/)) {
        const p = (s.replace(/（[^）]*）/g, '').match(PART) || []).length;
        if (p >= 3) bad.push(q.id + ': ' + s.trim().slice(0, 50));
      }
    }
    assert.deepStrictEqual(bad, []);
  });
};
