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

  // v0.3（SPEC_v0.3.md 4章・B案）：各学年27問（基礎6・標準15・発展6）。自由入力は半分以上、標準の自由入力は9問以上。
  // 1教科ずつ作るので、作り終えた教科をここに足していく。
  const B_PLAN_DONE = ['japanese', 'science', 'social', 'english'];
  test(`B案の問題数：${B_PLAN_DONE.join('・')} は各学年27問以上（基礎6・標準15・発展6）、半分以上が自由入力、標準の自由入力9問以上`, () => {
    const errors = [];
    for (const s of B_PLAN_DONE) for (const g of GRADES) {
      const qs = bank.filter(q => q.subject === s && q.gradeLevel === g);
      const n = d => qs.filter(q => q.difficulty === d).length;
      const input = qs.filter(q => q.answerType === 'input').length;
      const stdInput = qs.filter(q => q.difficulty === 'standard' && q.answerType === 'input').length;
      if (qs.length < 27 || n('basic') < 6 || n('standard') < 15 || n('advanced') < 6 || input * 2 < qs.length || stdInput < 9) {
        errors.push(`${s} Lv${g}：全${qs.length}（基礎${n('basic')}・標準${n('standard')}・発展${n('advanced')}）自由入力${input}・標準の自由入力${stdInput}`);
      }
    }
    assert.ok(errors.length === 0, errors.join('\n'));
  });

  test('算数の文章題：各学年3問以上', () => {
    const short = GRADES.filter(g => bank.filter(q => q.subject === 'math' && q.gradeLevel === g).length < 3);
    assert.deepStrictEqual(short, []);
  });

  // v0.3（B案）：算数の文章題は各学年10問（基礎3・標準5・発展2）、標準の自由入力4問以上（昇格試験で文章題を1問まで使う）
  test('B案の問題数：算数の文章題は各学年10問以上（基礎3・標準5・発展2）、標準の自由入力4問以上', () => {
    const errors = [];
    for (const g of GRADES) {
      const qs = bank.filter(q => q.subject === 'math' && q.gradeLevel === g);
      const n = d => qs.filter(q => q.difficulty === d).length;
      const stdInput = qs.filter(q => q.difficulty === 'standard' && q.answerType === 'input').length;
      if (qs.length < 10 || n('basic') < 3 || n('standard') < 5 || n('advanced') < 2 || stdInput < 4) {
        errors.push(`math Lv${g}：全${qs.length}（基礎${n('basic')}・標準${n('standard')}・発展${n('advanced')}）標準の自由入力${stdInput}`);
      }
    }
    assert.ok(errors.length === 0, errors.join('\n'));
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

  test('answerDisplay（表示用の答え）は、ふりがなを外すと answer と同じ文字になる', () => {
    const withDisplay = bank.filter(q => q.answerDisplay !== undefined);
    assert.ok(withDisplay.length >= 1);
    for (const q of withDisplay) assert.strictEqual(FF.util.plainText(q.answerDisplay), q.answer, q.id);
    const bad = Object.assign({}, withDisplay[0], { answerDisplay: '{中京|ちゅうきょう}' });
    assert.ok(FF.learning.validateQuestion(bad).some(e => /answerDisplay/.test(e)));
  });

  test('「正しい答え」の表示には answerDisplay を使い、判定は answer・acceptedAnswers のまま', () => {
    const q = bank.find(x => x.id === 'social_g5_industry_001');
    assert.strictEqual(FF.learning.displayAnswer(q), '{中京工業地帯|ちゅうきょうこうぎょうちたい}');
    assert.strictEqual(FF.learning.displayAnswer(bank.find(x => x.answerDisplay === undefined && x.answerType === 'input')) !== undefined, true);
    for (const input of ['中京工業地帯', 'ちゅうきょう', 'チュウキョウ', '中京']) assert.ok(FF.answer.judgeInput(q, input).correct, input);
    const T0 = 1790000000000;
    const s = FF.state.createDefaultState(T0);
    s.learning.unlocked.social = 5;
    const r = FF.learning.submitAnswer(s, FF.learning.startAttempt(q), '中京工業地帯', { now: T0, resource: 'wood' });
    assert.strictEqual(r.outcome.status, 'correct');
    assert.strictEqual(r.outcome.correctAnswer, q.answerDisplay);
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

  test('人が内容を確認した問題（reviewed: true）は 1061問だけ（新しく AI が作った・直した問題は false）', () => {
    // 確認済みの問題を増やしたら、この数も更新する。
    // フェーズ7の360問（v0.3 で漢字の配当に合わせて作り直した japanese_g5_homonym_001 を含む）と、
    // v0.3（B案）で追加した702問は、ユーザーの承認で true にした（360 + 702 = 1062問）
    // 2026-10-04：デバッグ版のレビューでOKだった問題（手作り10問・リニューアル1問）を true にした（判断241）
    // 2026-10-02：japanese_g2_katakana_002 をレビューの指摘（判断205）で直したので、確認し直すまで false
    assert.strictEqual(bank.filter(q => q.reviewed === true).length, 1072);   // 2026-10-04：デバッグ版のレビューでOKだった手作り10問＋リニューアル1問を確認済みにした（判断241）
    assert.strictEqual(bank.filter(q => q.reviewed === false && q.collection !== 'hand_g4' && q.collection !== 'hand_g5').length, 100); // 原作の1問＋リニューアルの99問（手作りの hand_g4 は数えない。判断227）
  });
  test('選択問題の inputForm（書き問題としても出す。判断200）は、すべて書き問題として正しく、確認前は reviewed: false', () => {
    const withForm = bank.filter(q => q.inputForm);
    assert.ok(withForm.length >= 80, `inputForm が ${withForm.length} 問しかない`);
    const ng = [];
    withForm.forEach(q => {
      const errs = FF.learning.validateQuestion(q);
      if (errs.length) ng.push(q.id + ': ' + errs.join(' / '));
      const v = FF.learning.inputVariant(q);
      if (/[{}]/.test(v.answer) || (v.acceptedAnswers || []).some(a => /[{}]/.test(a))) ng.push(q.id + ': 答えにふりがなの記法がある');
      if (/どれ/.test(FF.util.plainText(v.question))) ng.push(q.id + ': 書き問題の文に「どれ」が残っている');
    });
    assert.deepStrictEqual(ng, []);
    // 人が内容を確認したら true にし、この数も更新する
    assert.strictEqual(withForm.filter(q => q.inputForm.reviewed === true).length, 14);   // 2026-10-02 のレビューでOKだった6問（判断205）
  });
};
