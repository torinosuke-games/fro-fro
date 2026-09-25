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

  // ---- 第10.3節の問題数（フェーズ7） ----
  const TEXT_SUBJECTS = ['japanese', 'science', 'social', 'english'];
  const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  test('国語・理科・社会・英語：各学年9問以上（基礎2・標準5・発展2）、半分以上が自由入力、標準の自由入力3問以上', () => {
    const errors = [];
    for (const s of TEXT_SUBJECTS) for (const g of GRADES) {
      const qs = bank.filter(q => q.subject === s && q.gradeLevel === g);
      const n = d => qs.filter(q => q.difficulty === d).length;
      const input = qs.filter(q => q.answerType === 'input').length;
      const stdInput = qs.filter(q => q.difficulty === 'standard' && q.answerType === 'input').length;
      if (qs.length < 9 || n('basic') < 2 || n('standard') < 5 || n('advanced') < 2 || input * 2 < qs.length || stdInput < 3) {
        errors.push(`${s} Lv${g}：全${qs.length}（基礎${n('basic')}・標準${n('standard')}・発展${n('advanced')}）自由入力${input}・標準の自由入力${stdInput}`);
      }
    }
    assert.ok(errors.length === 0, errors.join('\n'));
  });

  test('算数の文章題：各学年3問以上', () => {
    const short = GRADES.filter(g => bank.filter(q => q.subject === 'math' && q.gradeLevel === g).length < 3);
    assert.deepStrictEqual(short, []);
  });

  test('自由入力の別解（acceptedAnswers）はすべて正解と判定される', () => {
    const ng = [];
    bank.filter(q => q.answerType === 'input').forEach(q => (q.acceptedAnswers || []).forEach(a => {
      if (!FF.answer.judgeInput(q, a).correct) ng.push(`${q.id}: ${a}`);
    }));
    assert.deepStrictEqual(ng, []);
  });

  test('自由入力の answer・acceptedAnswers にふりがなの記法を書いていない', () => {
    const ng = Array.from(bank.filter(q => q.answerType === 'input' && [q.answer].concat(q.acceptedAnswers || []).some(a => /[{}]/.test(a))), q => q.id);
    assert.deepStrictEqual(ng, []);
  });

  test('全教科・全学年で昇格試験を組める（「準備中」にならない）', () => {
    const b = FF.learning.createBank(bank), ng = [];
    for (const s of ['math'].concat(TEXT_SUBJECTS)) for (const g of GRADES) {
      if (!FF.exam.isExamAvailable(b, s, g)) ng.push(`${s} Lv${g}`);
    }
    assert.deepStrictEqual(ng, []);
  });

  test('国語・理科・社会・英語の実力診断は、全問正解でも全問不正解でも10問まで出題できる', () => {
    const b = FF.learning.createBank(bank), rng = FF.util.makeRng(7), ng = [];
    for (const s of TEXT_SUBJECTS) for (const allCorrect of [true, false]) {
      let d = FF.exam.startDiagnosis(s);
      while (!FF.exam.isDiagnosisDone(d)) {
        const it = FF.exam.nextDiagnosisItem(b, d, rng);
        if (!it) break;
        d = FF.exam.answerDiagnosis(d, it, allCorrect ? it.question.answer : '（まちがい）').diag;
      }
      if (d.log.length < 10) ng.push(`${s}（${allCorrect ? '全問正解' : '全問不正解'}）：${d.log.length}問で終了`);
    }
    assert.deepStrictEqual(ng, []);
  });

  // ---- 漢字の読みの問題で答えが見えないこと ----
  // 答えの漢字は {漢字|} と書き、辞書の自動ふりがなから外す。
  const noRubyTargets = s => Array.from(s.matchAll(/\{([^{}|]+)\|\}/g), m => m[1]);
  const readingQuestions = bank.filter(q => q.unit === 'kanji_read' || noRubyTargets(q.question).length > 0);

  test('漢字の読み（kanji_read）の問題は、答えの漢字を {漢字|} で書いている', () => {
    const ng = Array.from(bank.filter(q => q.unit === 'kanji_read' && noRubyTargets(q.question).length === 0), q => q.id);
    assert.deepStrictEqual(ng, []);
  });

  test('ふりがな辞書に答えの語を足しても、読みの問題の問題文・選択肢・ヒントに答えの読みが出ない', () => {
    // 最悪の場合：答えの語がすべて辞書に登録された状態で確かめる
    const dict = Object.assign({}, FF.FURIGANA);
    readingQuestions.forEach(q => noRubyTargets(q.question).forEach(w => { dict[w] = q.answer; }));
    const kana = s => FF.answer.toHiragana(FF.answer.normalize(s));
    const ng = [];
    readingQuestions.forEach(q => {
      const targets = noRubyTargets(q.question);
      const readings = [q.answer].concat(q.acceptedAnswers || []).map(kana);
      [q.question].concat(q.hints, q.choices || []).forEach(s => {
        FF.util.parseRichText(FF.util.autoRubyMarkup(s, dict)).forEach(t => {
          if (t.ruby === undefined) return;
          if (targets.some(w => t.ruby.indexOf(w) >= 0 || w.indexOf(t.ruby) >= 0) && readings.indexOf(kana(t.rt)) >= 0) {
            ng.push(`${q.id}: {${t.ruby}|${t.rt}} ← ${s.slice(0, 30)}`);
          }
        });
      });
    });
    assert.ok(readingQuestions.length >= 24, `読みの問題が ${readingQuestions.length} 問しか見つからない`);
    assert.deepStrictEqual(ng, []);
  });

  test('人が内容を確認した問題（reviewed: true）は 2026-09-26 に確認した360問だけ（新しく AI が作った問題は false）', () => {
    // 確認済みの問題を増やしたら、この数も更新する
    assert.strictEqual(bank.filter(q => q.reviewed === true).length, 360);
  });
};
