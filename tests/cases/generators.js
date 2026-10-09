// 算数の自動生成（SPEC 10.2・21.3）：各学年・各難易度・各形式で1000問ずつ生成し、答えを独立に検算する
module.exports = ({ test, FF, assert }) => {
  const G = FF.generators;
  const N = 1000;

  // ---- 検算用の有理数（生成器のコードとは独立に書く） ----
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  function R(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; }
  function parse(s) {
    s = String(s);
    let m = s.match(/^(\d+)(?:と| )(\d+)\/(\d+)$/);
    if (m) return R(Number(m[1]) * Number(m[3]) + Number(m[2]), Number(m[3]));
    m = s.match(/^(-?\d+)\/(\d+)$/);
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
    // ---- 小5の単元（判断243） ----
    d5_scale: m => m.k > 0 ? mul(parse(m.x), I(m.k)) : div(parse(m.x), I(-m.k)),
    d5_digit: m => mul(parse(m.u), I(m.n)),
    d5_maxdec: m => m.list.map(parse).reduce((best, x) => (x.n * best.d > best.n * x.d ? x : best)),
    vol_box: m => I(m.a * m.b * m.c),
    vol_cube: m => I(m.s ** 3),
    vol_side: m => R(m.V, m.a * m.b),
    vol_unit: m => I(m.k * { m3cm3: 1000000, Lcm3: 1000, m3L: 1000 }[m.kind]),
    prop_val: m => R(m.y1 * m.x2, m.x1),
    prop_x: m => R(m.y2 * m.x1, m.y1),
    decm_word: m => mul(I(m.p), parse(m.l)),
    decdiv_word: m => div(parse(m.a), parse(m.b)),
    dec_div_round: m => R(Math.floor(m.A * 10 / m.B + 0.5), 10),
    poly_sum: m => I(180 * (m.n - 2)),
    poly_reg: m => R(180 * (m.n - 2), m.n),
    tri_third: m => I(180 - m.a - m.b),
    quad_missing: m => I(360 - m.a - m.b - m.c),
    mult_kth: m => I(m.n * m.k),
    gcd_ask: m => I(gcd(m.a, m.b)),
    lcm_ask: m => I(m.a * m.b / gcd(m.a, m.b)),
    div_count: m => { let c = 0; for (let i = 1; i <= m.n; i++) if (m.n % i === 0) c++; return I(c); },
    frac_to_dec: m => R(m.n, m.d),
    dec_to_frac: m => parse(m.x),
    frac_reduce: m => parse(m.x),
    frac_common_num: m => I(m.n * m.L / m.d),
    div_to_frac: m => R(m.a, m.b),
    fracmix_add: m => add(parse(m.x), parse(m.y)),
    fracmix_sub: m => sub(parse(m.x), parse(m.y)),
    avg_n: m => R(m.vals.reduce((a, b) => a + b, 0), m.vals.length),
    avg_total: m => I(m.n * m.m),
    avg_missing: m => I(m.m * m.n - m.vals.reduce((a, b) => a + b, 0)),
    rate_density: m => R(m.P, m.A),
    rate_total: m => I(m.r * m.S),
    speed_v: m => R(m.d, m.t),
    speed_d: m => I(m.v * m.t),
    speed_t: m => R(m.d, m.v),
    speed_conv: m => R(m.V * 1000, 60),
    tri_area: m => R(m.b * m.h, 2),
    para_area: m => I(m.b * m.h),
    trap_area: m => R((m.a + m.b) * m.h, 2),
    rhombus_area: m => R(m.d1 * m.d2, 2),
    tri_height: m => R(2 * m.A, m.b),
    pct_rate: m => R(m.v * 100, m.base),
    pct_value: m => R(m.base * m.pc, 100),
    pct_off: m => R(m.base * (100 - m.pc), 100),
    pct_base: m => R(m.v * 100, m.pc),
    circ_len: m => mul(I(m.d), parse('3.14')),
    circ_r: m => mul(I(2 * m.r), parse('3.14')),
    circ_diam: m => div(parse(m.L), parse('3.14')),
    circ_poly: m => I(m.n * m.a),
    prism_count: m => I({ face: m.n + 2, edge: 3 * m.n, vert: 2 * m.n }[m.what]),

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
    pyth: m => x => x > 0 && (m.hyp ? x * x === m.a * m.a + m.b * m.b : m.a * m.a + x * x === m.c * m.c),
    // ---- 小4（単元別。判断226）----
    big_read: m => I(m.a * m.big + m.b * m.mid),
    big_scale: m => m.times ? I(m.n * m.k) : div(I(m.n), I(m.k)),
    round_to: m => I(Math.floor((2 * m.n + m.k) / (2 * m.k)) * m.k),
    round_top: m => I(Math.floor((2 * m.n + m.k) / (2 * m.k)) * m.k),
    round_est: m => { const r = n => Math.floor((2 * n + m.k) / (2 * m.k)) * m.k; return I(m.plus ? r(m.a) + r(m.b) : r(m.a) - r(m.b)); },
    round_range: m => { const r = n => Math.floor((2 * n + m.k) / (2 * m.k)) * m.k; return x => r(x) === m.X && (m.smallest ? r(x - 1) !== m.X : r(x + 1) !== m.X); },
    div_tens: m => div(I(m.a), I(m.b)),
    dec_mul_word: m => mul(parse(m.a), parse(m.b)),
    dec_div_word: m => div(parse(m.a), parse(m.b)),
    frac_same: m => m.op === 'frac_add' ? add(parse(m.x), parse(m.y)) : sub(parse(m.x), parse(m.y)),
    divq: m => I(Math.floor(m.a / m.b)),
    div_ceil: m => I(Math.ceil(m.a / m.b)),
    dec_unit: m => m.inv ? I(m.n) : R(m.n, Math.pow(10, m.places)),
    dec_max: m => { let best = parse(m.list[0]); for (const t of m.list) { const v = parse(t); if (v.n * best.d > best.n * v.d) best = v; } return best; },
    dec_div_int: m => div(parse(m.a), parse(m.b)),
    frac_to_mixed: m => R(m.n, m.d),
    frac_to_improper: m => R(m.w * m.d + m.r, m.d),
    frac_mixed_op: m => R((m.plus ? 1 : -1) * 0 + (m.plus ? (m.w1 * m.d + m.n1) + (m.w2 * m.d + m.n2) : (m.w1 * m.d + m.n1) - (m.w2 * m.d + m.n2)), m.d),
    angle_comp: m => I(m.t - m.x),
    angle_comp3: m => I(m.t - m.x - m.y),
    angle_ruler: m => I(m.plus ? m.a + m.b : m.a - m.b),
    angle_clock: m => I(6 * m.m),
    area_rect: m => I(m.a * m.b),
    area_side: m => I(m.S / m.a),
    area_unit: m => I(m.k * m.f),
    area_L: m => I(m.A * m.B - m.a * m.b),
    calc_rule: m => I(m.a * m.b),
    order3: m => ({ 'a/(b+c)*d': I(m.a / (m.b + m.c) * m.d), 'a-b/c': I(m.a - m.b / m.c), '(a+b)/c': I((m.a + m.b) / m.c) }[m.form]),
    change_rule: m => I(m.s * m.a * m.n + m.b),
    ratio_times: m => I(m.B / m.A),
    ratio_of: m => m.inv ? I(m.a) : I(m.a * m.k)
  };

  function verify(q, grade, difficulty, answerType, textById) {
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
            verify(q, grade, difficulty, answerType, textById);
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

  // ---- 単元ごとの自動生成（小4。判断226）----
  const UNITS = G.unitsWithGenerators(4);
  test('小4：単元別の設定が、js/units.js に登録した単元だけを使い、3つの難易度がそろっている', () => {
    const ids = FF.units.list('math', 4).map(u => u.id);
    assert.ok(UNITS.length >= 12, UNITS.join(','));
    for (const u of UNITS) {
      assert.ok(ids.includes(u), '登録のない単元: ' + u);
      for (const d of ['basic', 'standard', 'advanced']) { assert.ok(G.unitSupports(4, u, d), `${u} ${d}`); for (const e of G.UNIT_GEN[4][u][d]) assert.ok(SOLVE[e.op], `検算がない種類: ${e.op}`); }
    }
    assert.strictEqual(G.generateForUnit(4, 'quad', 'basic', 'input', FF.util.makeRng(1)), null);
    assert.strictEqual(G.generateForUnit(5, 'large', 'basic', 'input', FF.util.makeRng(1)), null);
  });
  for (const unit of UNITS) {
    for (const difficulty of ['basic', 'standard', 'advanced']) {
      for (const answerType of ['input', 'choice']) {
        test(`小4 ${unit} ${difficulty} ${answerType}：500問の答えが正しく、単元と構造が正しい`, () => {
          const rng = FF.util.makeRng(4000 + unit.length * 7 + difficulty.length + answerType.length);
          const textById = {};
          const kinds = new Set();
          for (let i = 0; i < 500; i++) {
            const q = G.generateForUnit(4, unit, difficulty, answerType, rng);
            assert.strictEqual(q.unit, unit);
            assert.strictEqual(q.generated, true);
            verify(q, 4, difficulty, answerType, textById);
            kinds.add(q.id);
          }
          assert.ok(kinds.size >= 12, `${unit} ${difficulty}: 問題の種類が ${kinds.size} 通りしかない`);
        });
      }
    }
  }

  // ---- 単元ごとの自動生成（小5。判断243）----
  const UNITS5 = G.unitsWithGenerators(5);
  test('小5：単元別の設定が、js/units.js に登録した単元だけを使い、3つの難易度がそろっている', () => {
    const ids = FF.units.list('math', 5).map(u => u.id);
    assert.ok(UNITS5.length >= 16, UNITS5.join(','));
    for (const u of UNITS5) {
      assert.ok(ids.includes(u), '登録のない単元: ' + u);
      for (const d of ['basic', 'standard', 'advanced']) { assert.ok(G.unitSupports(5, u, d), `${u} ${d}`); for (const e of G.UNIT_GEN[5][u][d]) assert.ok(SOLVE[e.op], `検算がない種類: ${e.op}`); }
    }
    assert.strictEqual(G.generateForUnit(5, 'graph', 'basic', 'input', FF.util.makeRng(1)), null);
    assert.strictEqual(G.generateForUnit(5, 'congruent', 'basic', 'input', FF.util.makeRng(1)), null);
  });
  for (const unit of UNITS5) {
    for (const difficulty of ['basic', 'standard', 'advanced']) {
      for (const answerType of ['input', 'choice']) {
        test(`小5 ${unit} ${difficulty} ${answerType}：500問の答えが正しく、単元と構造が正しい`, () => {
          const rng = FF.util.makeRng(5000 + unit.length * 7 + difficulty.length + answerType.length);
          const textById = {};
          const kinds = new Set();
          for (let i = 0; i < 500; i++) {
            const q = G.generateForUnit(5, unit, difficulty, answerType, rng);
            assert.strictEqual(q.unit, unit);
            assert.strictEqual(q.generated, true);
            verify(q, 5, difficulty, answerType, textById);
            kinds.add(q.id);
          }
          assert.ok(kinds.size >= (unit === 'prism' ? 7 : 12), `${unit} ${difficulty}: 問題の種類が ${kinds.size} 通りしかない`);
        });
      }
    }
  }

  // 4択の選択肢の質（判断346）：数の答えでは、答えからかけはなれた突拍子もない数を選択肢に出さない
  test('4択の誤答は、答えに近い「まちがえやすい数」だけ（かけはなれた数は出さない）', () => {
    let seed = 20261009;
    const rng = () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const digits = v => String(v).replace(/[^1-9]/g, '');
    const far = [];
    let checked = 0;
    for (const g of grades) for (const d of ['basic', 'standard', 'advanced']) for (let i = 0; i < 300; i++) {
      const q = G.generate(g, d, 'choice', rng);
      if (!q || !q.choices || q.choices.length !== 4 || new Set(q.choices).size !== 4) { far.push(`${g}/${d}: 選択肢が4つの別々の数でない`); continue; }
      const n = FF.answer.parseNumber(q.answer);
      if (isNaN(n) || /\//.test(q.answer)) continue;
      checked++;
      const reach = Math.max(6, Math.abs(n) * 0.5);
      const placeSlip = q.answer.indexOf('.') >= 0 || Math.abs(n) >= 100000;
      for (const c of q.choices) {
        if (c === q.answer) continue;
        const v = FF.answer.parseNumber(c);
        if (isNaN(v) || v === -n || (placeSlip && digits(c) === digits(q.answer))) continue;   // 符号・小数点・位取りのまちがいは、よくあるまちがい
        if (Math.abs(v - n) > reach) far.push(`${q.id}: 答え ${q.answer} に対して ${c} はかけはなれている`);
      }
    }
    assert.ok(checked > 2000, `数の答えの4択を ${checked} 問しか確かめていない`);
    assert.deepStrictEqual(far.slice(0, 5), []);
  });
};
