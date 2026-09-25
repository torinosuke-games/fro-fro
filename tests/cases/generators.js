// 算数の自動生成（SPEC 10.2・21.3）：各学年・各難易度・各形式で1000問ずつ生成し、答えを独立に検算する
module.exports = ({ test, FF, assert }) => {
  const G = FF.generators;
  const N = 1000;

  // ---- 検算用の有理数（生成器のコードとは独立に書く） ----
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  function R(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; }
  function parse(s) {
    s = String(s);
    let m = s.match(/^(-?\d+)\/(\d+)$/);
    if (m) return R(Number(m[1]), Number(m[2]));
    m = s.match(/^(-?)(\d*)\.?(\d*)$/);
    if (!m) throw new Error('数として読めない: ' + s);
    const places = m[3].length;
    const v = Number((m[2] || '0') + m[3]) * (m[1] ? -1 : 1);
    return R(v, Math.pow(10, places));
  }
  const add = (x, y) => R(x.n * y.d + y.n * x.d, x.d * y.d);
  const sub = (x, y) => R(x.n * y.d - y.n * x.d, x.d * y.d);
  const mul = (x, y) => R(x.n * y.n, x.d * y.d);
  const div = (x, y) => R(x.n * y.d, x.d * y.n);
  const eq = (x, y) => x.n === y.n && x.d === y.d;
  const I = n => R(n);

  // meta から正しい答えを計算する。関数を返す場合は「答え x がこの条件を満たすか」を調べる
  const SOLVE = {
    add: m => I(m.a + m.b),
    sub: m => I(m.a - m.b),
    add3: m => { const x = m.o1 === '+' ? m.a + m.b : m.a - m.b; return I(m.o2 === '+' ? x + m.c : x - m.c); },
    mul: m => I(m.a * m.b),
    div: m => div(I(m.a), I(m.b)),
    divrem: m => I(m.a % m.b),
    dec_add: m => add(parse(m.a), parse(m.b)),
    dec_sub: m => sub(parse(m.a), parse(m.b)),
    dec_mul_int: m => mul(parse(m.a), parse(m.b)),
    dec_mul_dec: m => mul(parse(m.a), parse(m.b)),
    dec_div: m => div(parse(m.a), parse(m.b)),
    order: m => I({ 'a+bc': m.a + m.b * m.c, '(a+b)c': (m.a + m.b) * m.c, 'a-bc': m.a - m.b * m.c, 'ab-c': m.a * m.b - m.c }[m.form]),
    frac_add: m => add(parse(m.x), parse(m.y)),
    frac_sub: m => sub(parse(m.x), parse(m.y)),
    frac_mul: m => mul(parse(m.x), parse(m.y)),
    frac_div: m => div(parse(m.x), parse(m.y)),
    ratio: m => div(I(m.c * m.b), I(m.a)),
    int_add: m => I(m.o === '+' ? m.a + m.b : m.a - m.b),
    int_mul: m => (m.div ? div(I(m.a), I(m.b)) : I(m.a * m.b)),
    lin_eq: m => x => m.a * x + m.b === m.c,
    lin_eq2: m => x => m.a * x + m.b === m.c * x + m.d,
    subst: m => I(m.pa * m.av + m.qb * m.bv),
    simul: m => x => m.a1 * x + m.b1 * m.y === m.c1 && m.a2 * x + m.b2 * m.y === m.c2,
    slope: m => div(I(m.y2 - m.y1), I(m.x2 - m.x1)),
    sqrt: m => x => x > 0 && x * x === m.a * m.b,
    quad: m => x => x * x + m.p * x + m.q === 0 && (-m.p - x) < x,   // 解であり、もう一方の解より大きい
    pyth: m => x => x > 0 && (m.hyp ? x * x === m.a * m.a + m.b * m.b : m.a * m.a + x * x === m.c * m.c)
  };

  const grades = Object.keys(G.GEN_CONFIG).map(Number);

  test('すべての学年・難易度に設定がある', () => {
    assert.deepStrictEqual(grades, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const g of grades) for (const d of ['basic', 'standard', 'advanced']) {
      assert.ok(G.supports('math', g, d), `Lv${g} ${d}`);
      for (const e of G.GEN_CONFIG[g][d]) assert.ok(SOLVE[e.op], `検算がない種類: ${e.op}`);
    }
  });

  for (const grade of grades) {
    for (const difficulty of ['basic', 'standard', 'advanced']) {
      for (const answerType of ['input', 'choice']) {
        test(`Lv${grade} ${difficulty} ${answerType}：${N}問の答えが正しく、構造が正しい`, () => {
          const rng = FF.util.makeRng(grade * 1000 + difficulty.length * 10 + answerType.length);
          const textById = {};
          for (let i = 0; i < N; i++) {
            let q;
            try { q = G.generate(grade, difficulty, answerType, rng); }
            catch (e) { assert.fail(`生成でエラー（${i}問目）: ${e.message}`); }
            const where = `${q.id} 「${q.question}」 答え ${q.answer}`;
            const errors = FF.learning.validateQuestion(q);
            if (errors.length) assert.fail(`${where}: ${errors.join(', ')}`);
            if (/undefined|NaN|Infinity/.test(q.question + q.answer + q.explanation + q.hints.join('') + (q.choices || []).join('')))
              assert.fail(`${where}: 文中に undefined / NaN がある`);
            assert.strictEqual(q.hints.length, 3, `${where}: ヒントが3つでない`);
            assert.strictEqual(q.gradeLevel, grade);
            assert.strictEqual(q.difficulty, difficulty);

            // 検算
            const want = SOLVE[q.meta.op](q.meta);
            const got = parse(q.answer);
            if (typeof want === 'function') {
              if (got.d !== 1 || !want(got.n)) assert.fail(`${where}: 答えが条件を満たさない`);
            } else if (!eq(got, want)) {
              assert.fail(`${where}: 正しい答えは ${want.n}/${want.d}`);
            }
            // 分数の答えは約分済み
            if (/\//.test(q.answer)) assert.strictEqual(gcd(got.n, got.d), 1, `${where}: 約分されていない`);
            // 正解・別解は正解と判定される
            for (const a of [q.answer].concat(q.acceptedAnswers)) assert.ok(FF.answer.judgeInput(Object.assign({}, q, { answerType: 'input' }), a).correct, `${where}: ${a} が正解にならない`);
            // 4択：誤答は不正解と判定される
            if (answerType === 'choice') {
              for (const c of q.choices) {
                if (c === q.answer) continue;
                if (FF.answer.judgeInput(Object.assign({}, q, { answerType: 'input' }), c).correct) assert.fail(`${where}: 誤答 ${c} が正解扱い`);
              }
            }
            // 同じ ID は同じ問題
            if (textById[q.id] !== undefined && textById[q.id] !== q.question) assert.fail(`${q.id}: 同じ ID で違う問題`);
            textById[q.id] = q.question;
          }
        });
      }
    }
  }

  test('同じシードなら同じ問題が生成される', () => {
    const a = G.generate(5, 'standard', 'choice', FF.util.makeRng(42));
    const b = G.generate(5, 'standard', 'choice', FF.util.makeRng(42));
    assert.strictEqual(JSON.stringify(a), JSON.stringify(b));
  });

  test('問題の種類は十分にばらつく（Lv1 基礎で100問中50種類以上）', () => {
    const rng = FF.util.makeRng(7);
    const set = new Set();
    for (let i = 0; i < 100; i++) set.add(G.generate(1, 'basic', 'input', rng).id);
    assert.ok(set.size >= 50, `${set.size} 種類`);
  });

  test('4択と自由入力で同じ問題なら同じ ID（形式を変えて反復倍率を避けられない）', () => {
    const a = G.generate(3, 'standard', 'choice', FF.util.makeRng(9));
    const b = G.generate(3, 'standard', 'input', FF.util.makeRng(9));
    assert.strictEqual(a.id, b.id);
  });
};
