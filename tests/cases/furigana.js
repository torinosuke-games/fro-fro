// ふりがな（SPEC 13）：画面の文言と自動生成の問題に、読みのない漢字が残っていないか
module.exports = ({ test, FF, assert, plain }) => {
  const U = FF.util;

  function allStrings(obj, out = []) {
    if (typeof obj === 'string') out.push(obj);
    else if (obj && typeof obj === 'object') for (const k in obj) allStrings(obj[k], out);
    return out;
  }
  function report(strings) {
    const missing = new Map();
    for (const s of strings) for (const k of U.bareKanji(s, { name: 'X' })) if (!missing.has(k)) missing.set(k, s);
    return [...missing].map(([k, s]) => `「${k}」 ← ${s.slice(0, 40).replace(/\n/g, ' ')}`);
  }

  test('辞書の語は自動でふりがなの記法になる', () => {
    assert.strictEqual(U.autoRubyMarkup('中央炉を強化する'), '{中央炉|ちゅうおうろ}を{強化|きょうか}する');
  });

  test('長い語を優先する（「生存者住宅」は「生存者」＋「住宅」ではなく1語）', () => {
    assert.strictEqual(U.autoRubyMarkup('生存者住宅'), '{生存者住宅|せいぞんしゃじゅうたく}');
  });

  test('送りがなを含む語は漢字の部分だけに読みを付ける', () => {
    assert.deepStrictEqual(plain(U.parseRichText(U.autoRubyMarkup('受け取る'))), [
      { ruby: '受', rt: 'う' }, { text: 'け' }, { ruby: '取', rt: 'と' }, { text: 'る' }
    ]);
  });

  test('{name} と明示したふりがなには手を付けず、名前の漢字は変換しない', () => {
    const tokens = plain(U.parseRichText(U.autoRubyMarkup('{name}隊長、{雪|ゆき}'), { name: '中央炉' }));
    assert.deepStrictEqual(tokens, [{ text: '中央炉' }, { ruby: '隊長', rt: 'たいちょう' }, { text: '、' }, { ruby: '雪', rt: 'ゆき' }]);
  });

  test('{漢字|}（読みが空）はふりがなを付けず、辞書にある語でも自動で付かない', () => {
    const dict = { '雪': 'ゆき', '中央炉': 'ちゅうおうろ' };
    const markup = U.autoRubyMarkup('「{雪|}が ふる。」の「{雪|}」と 雪', dict);
    assert.deepStrictEqual(plain(U.parseRichText(markup)), [
      { text: '「雪が ふる。」の「雪」と ' }, { ruby: '雪', rt: 'ゆき' }
    ]);
    assert.strictEqual(U.plainText('{中央炉|}'), '中央炉');
  });

  test('画面の文言・名称に読みのない漢字がない', () => {
    const strings = allStrings(FF.texts)
      .concat(FF.defs.SUBJECTS.map(s => s.name), FF.defs.SUBJECTS.flatMap(s => (s.nameByGrade || []).map(n => n.name)))
      .concat(FF.defs.BUILDINGS.map(b => b.name), FF.defs.RESOURCES.map(r => r.name))
      .concat(FF.defs.DIFFICULTIES.map(d => d.name), FF.defs.ANSWER_TYPES.map(d => d.name), FF.defs.GRADES.map(g => g.school));
    const missing = report(strings);
    assert.ok(missing.length === 0, missing.join('\n'));
  });

  test('自動生成の問題（問題文・ヒント・解説）に読みのない漢字がない', () => {
    const rng = U.makeRng(99);
    const strings = [];
    for (let g = 1; g <= 9; g++) for (const d of ['basic', 'standard', 'advanced']) for (let i = 0; i < 60; i++) {
      const q = FF.generators.generate(g, d, 'input', rng);
      strings.push(q.question, q.explanation, ...q.hints);
    }
    const missing = report(strings);
    assert.ok(missing.length === 0, missing.join('\n'));
  });
};
