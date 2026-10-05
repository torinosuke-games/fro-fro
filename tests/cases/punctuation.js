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
  // 読み取りの文章（物語文・説明文）も、読点を重ねない（判断271）
  test('手作りの読み取りの文章の1文に、読点が3つ以上ない・助詞のあとの読点が3つ以上ない', () => {
    const bad = [], seen = new Set();
    for (const q of hand) {
      if (!q.question.includes('次の文章を読んで')) continue;
      const passage = q.question.split('\n\n')[1];
      if (seen.has(passage)) continue;
      seen.add(passage);
      for (const sent of passage.split(/(?<=。)/)) {
        const c = (sent.match(/、/g) || []).length, p = (sent.match(PART) || []).length;
        if (c >= 3 || p >= 3) bad.push(q.id + ': ' + sent.trim().slice(0, 40));
      }
    }
    assert.ok(seen.size >= 30);
    assert.deepStrictEqual(bad, []);
  });
};
