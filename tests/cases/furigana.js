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

  // 記法を含む値は語の表記をそのまま置き換えるので、ふりがなを外すと元の語に戻らなければならない
  // （v0.3 まで「見張り塔」の値が「み{張|は}りとう」で、本文が「み張りとう」と表示されていた）
  test('辞書の記法入りの値は、ふりがなを外すと元の語と同じ', () => {
    const bad = Object.entries(FF.FURIGANA).filter(([k, v]) => v.indexOf('{') >= 0 && U.plainText(v) !== k);
    assert.deepStrictEqual(bad, []);
  });

  test('建物名は、ふりがなを付けても表記が変わらない', () => {
    for (const b of FF.defs.BUILDINGS) assert.strictEqual(U.plainText(U.autoRubyMarkup(b.name)), b.name);
    assert.strictEqual(U.plainText(U.autoRubyMarkup(FF.texts.teaser.watchtower)), '見張り塔');
  });

  test('「見張り塔」をかなで書いた文言が残っていない', () => {
    const strings = allStrings(FF.texts).concat(allStrings(FF.defs.REGIONS));
    for (const s of strings) {
      const p = U.plainText(U.autoRubyMarkup(s));
      assert.ok(!/み張り|みはり|張りとう/.test(p), p);
    }
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

  // 辞書の一字の語（「数」→かず、「解」→かい など）が、文脈と違う読みを付けていた箇所（v0.2 の監査で修正）
  test('辞書の誤読を直した箇所が、正しい読みで表示される', () => {
    const rt = s => plain(U.parseRichText(U.autoRubyMarkup(s))).filter(t => t.ruby).map(t => t.ruby + ':' + t.rt);
    assert.ok(rt(FF.texts.breakdown.attempt).includes('回答回数:かいとうかいすう'));
    const rng = U.makeRng(5);
    const hints = new Set();
    for (let i = 0; i < 400; i++) for (const [g, d] of [[5, 'advanced'], [7, 'standard'], [7, 'advanced'], [8, 'standard']]) {
      FF.generators.generate(g, d, 'input', rng).hints.forEach(h => hints.add(h));
    }
    const all = [...hints].flatMap(rt);
    for (const want of ['解:と', '負:ふ', '項:こう']) assert.ok(all.includes(want), want);
    // 「けた数」「負の 数」「数の 項」「解こう」を読みの明示なしで書いたヒントが残っていない
    for (const h of hints) assert.ok(!/けた数|負の 数|数の 項|解こう/.test(h), '読みを明示していない: ' + h);
  });
};
