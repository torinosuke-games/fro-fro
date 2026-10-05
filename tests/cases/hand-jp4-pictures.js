// 小4国語の絵（第12弾。Grok）：30枚の絵と、絵が付く問題。絵が答えを教えてしまう2問には付けない。
const fs = require('node:fs'), path = require('node:path');
module.exports = ({ test, ctx, assert, plain }) => {
  const root = path.resolve(__dirname, '../..');
  const qs = plain(ctx.QUESTION_BANK.filter(q => q.collection === 'hand_jp4'));
  const pics = qs.filter(q => q.diagram);
  test('小4国語の絵：63問に絵が付き、絵のファイルは29枚で、1枚100KB以下', () => {
    assert.equal(pics.length, 63);
    const srcs = new Set(pics.map(q => q.diagram.src));
    assert.equal(srcs.size, 29);
    for (const s of srcs) {
      assert.match(s, /^img\/diagrams\/jp4_(story_p[1-9]|explain_e[1-7]|homonym_\d{3})\.webp$/);
      assert.ok(fs.statSync(path.join(root, s)).size <= 100 * 1024, s);
    }
    for (const q of pics) { assert.equal(q.diagram.kind, 'image'); assert.ok(q.diagram.caption); assert.equal(q.diagram.study, true); }
  });
  test('小4国語の絵：絵が答えを教えてしまう問いには付けない（雪のけっしょうのかどの数、ホッキョクグマの毛の色）', () => {
    for (const id of ['japanese_g4_hand_explain_002', 'japanese_g4_hand_explain_009']) {
      assert.equal(qs.find(q => q.id === id).diagram, undefined, id);
    }
  });
  test('小4国語の絵：同じ文章の問いは、同じ絵（物語文9本・説明文7本（かまくらの文章は、絵を作り直し中））', () => {
    const byPassage = new Map();
    for (const q of qs.filter(q => q.unit === 'story' || q.unit === 'explain')) {
      const passage = q.question.split('\n\n')[1];
      if (!byPassage.has(passage)) byPassage.set(passage, new Set());
      byPassage.get(passage).add(q.diagram ? q.diagram.src : 'なし');
    }
    assert.equal(byPassage.size, 16);
    for (const [p, set] of byPassage) assert.ok(set.size <= 2 && (set.size === 1 || set.has('なし')), p.slice(0, 20));
  });
};
