// 小5社会：統計のグラフを読む問題（判断316）
module.exports = ({ test, ctx, assert }) => {
  const qs = ctx.QUESTION_BANK.filter(q => q.id.startsWith('social_g5_stat_'));
  test('小5社会の統計グラフ：33問、すべて図（caption付き）と別解のない選択肢を持つ', () => {
    assert.strictEqual(qs.length, 33);
    qs.forEach(q => {
      assert.ok(q.diagram && q.diagram.caption, q.id + ' に図の caption がある');
      assert.ok(['graph', 'bars', 'band'].includes(q.diagram.kind), q.id);
      assert.strictEqual(q.choices.length, 4, q.id);
      assert.ok(q.choices.includes(q.answer), q.id);
      assert.strictEqual(new Set(q.choices).size, 4, q.id);
      assert.strictEqual(q.reviewed, false, q.id);
    });
  });
  test('小5社会の統計グラフ：折れ線は値を表示し、数の答えは図の数字から計算できる', () => {
    const get = id => qs.find(q => q.id === 'social_g5_stat_' + id);
    assert.ok(qs.filter(q => q.diagram.kind === 'graph').every(q => q.diagram.showValues === true));
    const v = get('food_002').diagram.values;
    assert.strictEqual(String(v[0] - v[3]), get('food_002').answer);
    const k = get('industry_003').diagram.values;
    assert.strictEqual(String(Math.round(k[0] / k[3])), get('industry_003').answer);
    const m = get('rice_003').diagram.values;
    assert.strictEqual(String(m[0] + m[1] + m[2]), get('rice_003').answer);
  });
};
