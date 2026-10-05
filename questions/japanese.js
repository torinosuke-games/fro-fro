// 問題データ：国語（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。人が内容を確認したら true にする（フェーズ7の問題と v0.3 で追加・作り直した問題は、どちらも 2026-09-26 に確認済み）。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// v0.3（SPEC_v0.3.md 4章・B案）で各学年18問を足して27問にした：基礎6（4択3・自由入力3）、標準15（自由入力9・4択6）、発展6（自由入力3・4択3）。
// 追加した問題は、辞書の自動ふりがなに頼らず、漢字にはすべて {漢字|よみ} を明示している。
// 漢字の読みの問題は、答えの漢字を {漢字|}（読みが空）と書き、ふりがなを付けない。
window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(

  // ===== Lv1（小学1年） =====
  {
    id: 'japanese_g1_vocab_001', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'basic', answerType: 'choice',
    question: 'どうぶつの なまえは どれかな。',
    choices: ['いぬ', 'あか', 'はしる', 'おおきい'],
    answer: 'いぬ',
    hints: ['いきものの なまえを さがそう。', '「あか」は いろ、「はしる」は うごきの ことばだよ。'],
    explanation: '「いぬ」は どうぶつの なまえです。「あか」は いろ、「はしる」は うごき、「おおきい」は ようすを あらわす ことばです。',
    reviewed: true
  },
  {
    id: 'japanese_g1_katakana_001', subject: 'japanese', gradeLevel: 1, unit: 'katakana',
    difficulty: 'basic', answerType: 'input',
    question: '「ぱん」を かたかなで かこう。',
    answer: 'パン', validationMode: 'exact',
    hints: ['「ぱ」は かたかなで「パ」。', '「ん」は かたかなで「ン」。「ソ」と にて いるので きを つけよう。'],
    explanation: '「ぱん」は かたかなで「パン」と かきます。がいこくから きた ことばは かたかなで かきます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_read_001', subject: 'japanese', gradeLevel: 1, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「たかい {山|}に のぼる。」の「{山|}」の よみかたを ひらがなで かこう。',
    answer: 'やま', validationMode: 'kana-insensitive',
    hints: ['たかく もりあがった ところだよ。', 'ふじ〇〇 の 〇〇。'],
    explanation: '「{山|やま}」は「やま」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_read_002', subject: 'japanese', gradeLevel: 1, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{川|}で さかなを つる。」の「{川|}」の よみかたを ひらがなで かこう。',
    answer: 'かわ', validationMode: 'kana-insensitive',
    hints: ['みずが ながれて いる ところだよ。', 'さかなが およいで いるよ。'],
    explanation: '「{川|かわ}」は「かわ」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_vocab_002', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'standard', answerType: 'input',
    question: '「おおきい」の はんたいの いみの ことばを ひらがなで かこう。',
    answer: 'ちいさい', acceptedAnswers: ['小さい'], validationMode: 'kana-insensitive',
    hints: ['ありさんは ぞうさんより …。', '「ち」から はじまる ことばだよ。'],
    explanation: '「おおきい」の はんたいは「ちいさい」です。',
    reviewed: true
  },
  {
    id: 'japanese_g1_grammar_001', subject: 'japanese', gradeLevel: 1, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: 'ぶんの おわりに つける しるしは どれかな。',
    choices: ['まる（。）', 'てん（、）', 'かぎ（「」）', 'のばす ぼう（ー）'],
    answer: 'まる（。）',
    hints: ['ぶんが おわった ことを しめす しるしだよ。', '「てん（、）」は ぶんの とちゅうで くぎる ときに つかうよ。'],
    explanation: 'ぶんの おわりには「まる（。）」を つけます。「てん（、）」は ぶんの とちゅうの くぎり、「かぎ（「」）」は はなした ことばに つけます。',
    inputForm: { question: 'ぶんの おわりに つける しるしは なにかな。', answer: 'まる', acceptedAnswers: ['。', 'まる（。）', 'くてん', '句点', '丸'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g1_grammar_002', subject: 'japanese', gradeLevel: 1, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: 'ただしく かけて いる ぶんは どれかな。',
    choices: ['わたしは がっこうへ いく。', 'わたしわ がっこうえ いく。', 'わたしは がっこうえ いく。', 'わたしわ がっこうへ いく。'],
    answer: 'わたしは がっこうへ いく。',
    hints: ['「わたし〇」の 〇は「わ」と よむけれど、べつの じを かくよ。', '「がっこう〇 いく」の 〇は「え」と よむけれど、べつの じを かくよ。'],
    explanation: '「わ」と よむ ことばの あいだの じは「は」、「え」と よむ ことばの あいだの じは「へ」と かきます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_write_001', subject: 'japanese', gradeLevel: 1, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「みず」を かんじで かこう。（のむ ものの「みず」）',
    answer: '水', validationMode: 'exact',
    hints: ['かわや うみを ながれて いる ものだよ。', 'まんなかに たての ぼうが ある かんじだよ。'],
    explanation: '「みず」は かんじで「{水|みず}」と かきます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_katakana_002', subject: 'japanese', gradeLevel: 1, unit: 'katakana',
    difficulty: 'advanced', answerType: 'choice',
    question: 'かたかなで かく ことばは どれかな。',
    choices: ['てれび', 'つくえ', 'えんぴつ', 'さかな'],
    answer: 'てれび',
    hints: ['がいこくから きた ことばは かたかなで かくよ。', 'でんきで うごく ものは どれかな。'],
    explanation: '「てれび」は がいこくから きた ことばなので、かたかなで「テレビ」と かきます。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g1_vocab_003', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'basic', answerType: 'choice',
    question: 'いろの なまえは どれかな。',
    choices: ['あお', 'ねこ', 'とぶ', 'ながい'],
    answer: 'あお',
    hints: ['そらや うみの いろを おもいだそう。', '「ねこ」は どうぶつ、「とぶ」は うごきの ことばだよ。'],
    explanation: '「あお」は いろの なまえです。「ねこ」は どうぶつ、「とぶ」は うごき、「ながい」は ようすを あらわす ことばです。',
    reviewed: true
  },
  {
    id: 'japanese_g1_katakana_003', subject: 'japanese', gradeLevel: 1, unit: 'katakana',
    difficulty: 'basic', answerType: 'choice',
    question: 'かたかなの「ア」と おなじ おとの ひらがなは どれかな。',
    choices: ['あ', 'お', 'ま', 'そ'],
    answer: 'あ',
    hints: ['「アイス」の さいしょの おとだよ。', '「あいうえお」の いちばん はじめの じだよ。'],
    explanation: 'かたかなの「ア」は、ひらがなの「あ」と おなじ おとです。',
    inputForm: { question: 'かたかなの「ア」と おなじ おとの ひらがなは なにかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_read_003', subject: 'japanese', gradeLevel: 1, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{木|}に とりが とまる。」の「{木|}」の よみかたを ひらがなで かこう。',
    answer: 'き', validationMode: 'kana-insensitive',
    hints: ['はっぱが しげって、えだが のびて いるよ。', 'せみが とまって なく ところだよ。ひらがな 1もじ。'],
    explanation: '「{木|き}」は「き」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_vocab_004', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'basic', answerType: 'input',
    question: '「はる」→「なつ」→「□」→「ふゆ」。□に はいる きせつを ひらがなで かこう。',
    answer: 'あき', acceptedAnswers: ['秋'], validationMode: 'kana-insensitive',
    hints: ['はっぱが あかや きいろに なる きせつだよ。', 'どんぐりや くりが おちて いる きせつだよ。'],
    explanation: 'きせつは「はる」「なつ」「あき」「ふゆ」の じゅんに かわります。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_read_004', subject: 'japanese', gradeLevel: 1, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「にわに {花|}が さいた。」の「{花|}」の よみかたを ひらがなで かこう。',
    answer: 'はな', validationMode: 'kana-insensitive',
    hints: ['ちゅうりっぷや ひまわりの ことだよ。', 'みつばちが みつを あつめに くるよ。'],
    explanation: '「{花|はな}」は「はな」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_read_005', subject: 'japanese', gradeLevel: 1, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「あおい {空|}に くもが うかぶ。」の「{空|}」の よみかたを ひらがなで かこう。',
    answer: 'そら', validationMode: 'kana-insensitive',
    hints: ['うえを みあげると ひろがって いるよ。', 'とりや ひこうきが とんで いる ところだよ。'],
    explanation: '「{空|そら}」は「そら」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_read_006', subject: 'japanese', gradeLevel: 1, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「ねる まえに {目|}を とじる。」の「{目|}」の よみかたを ひらがなで かこう。',
    answer: 'め', validationMode: 'kana-insensitive',
    hints: ['かおの なかで、ものを みる ところだよ。', 'ひらがな 1もじの ことばだよ。'],
    explanation: '「{目|め}」は「め」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_katakana_004', subject: 'japanese', gradeLevel: 1, unit: 'katakana',
    difficulty: 'standard', answerType: 'input',
    question: '「けえき」（たんじょうびに たべる あまい おかし）を かたかなで かこう。',
    answer: 'ケーキ', validationMode: 'exact',
    hints: ['かたかなで のばす おとは「ー」で かくよ。', '「ケ」「ー」「キ」の 3もじだよ。'],
    explanation: '「ケーキ」と かきます。かたかなでは、のばす おとを「ー」で あらわします。',
    reviewed: true
  },
  {
    id: 'japanese_g1_vocab_005', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'standard', answerType: 'input',
    question: '「はやい」の はんたいの いみの ことばを ひらがなで かこう。',
    answer: 'おそい', acceptedAnswers: ['遅い'], validationMode: 'kana-insensitive',
    hints: ['かめは うさぎより あしが …。', '「お」から はじまる ことばだよ。'],
    explanation: '「はやい」の はんたいは「おそい」です。',
    reviewed: true
  },
  {
    id: 'japanese_g1_vocab_006', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'standard', answerType: 'input',
    question: '「りんご」「みかん」「ぶどう」を まとめて なんと いうかな。ひらがなで かこう。',
    answer: 'くだもの', acceptedAnswers: ['果物'], validationMode: 'kana-insensitive',
    hints: ['あまくて、きに なる ものが おおいよ。', '「く」から はじまる 4もじの ことばだよ。'],
    explanation: '「りんご」「みかん」「ぶどう」は「くだもの」の なかまです。',
    reviewed: true
  },
  {
    id: 'japanese_g1_grammar_003', subject: 'japanese', gradeLevel: 1, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: 'どうぶつの「おおかみ」を ただしく かいて いるのは どれかな。',
    choices: ['おおかみ', 'おうかみ', 'おーかみ', 'おかみ'],
    answer: 'おおかみ',
    hints: ['ひらがなでは、のばす おとに「ー」を つかわないよ。', '「おおきい」と おなじ かきかたを するよ。'],
    explanation: '「おおかみ」は「お」を ふたつ かきます。「おおきい」「とおい」なども おなじです。',
    reviewed: true
  },
  {
    id: 'japanese_g1_grammar_004', subject: 'japanese', gradeLevel: 1, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: 'ただしく かけて いる ことばは どれかな。',
    choices: ['がっこう', 'がつこう', 'がこう', 'がっこお'],
    answer: 'がっこう',
    hints: ['つまる おとは ちいさい「っ」で かくよ。', 'のばす おとの「こー」は「こう」と かくよ。'],
    explanation: 'つまる おとは ちいさい「っ」、「こー」と のばす おとは「こう」と かくので、「がっこう」が ただしいです。',
    reviewed: true
  },
  {
    id: 'japanese_g1_vocab_007', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'standard', answerType: 'choice',
    question: '「ぴょんぴょん」と はねて すすむ どうぶつは どれかな。',
    choices: ['うさぎ', 'へび', 'かたつむり', 'さかな'],
    answer: 'うさぎ',
    hints: ['ながい みみの どうぶつだよ。', 'へびは にょろにょろ、かたつむりは のろのろ すすむね。'],
    explanation: '「ぴょんぴょん」は はねる ようすを あらわす ことばです。うさぎが はねて すすむ ようすに ぴったりです。',
    reviewed: true
  },
  {
    id: 'japanese_g1_grammar_005', subject: 'japanese', gradeLevel: 1, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: 'かぎ（「」）を つけるのは どんな ときかな。',
    choices: ['ひとが はなした ことばを かく とき', 'ぶんが おわった とき', 'ぶんの とちゅうで くぎる とき', 'ひとの なまえを かく とき'],
    answer: 'ひとが はなした ことばを かく とき',
    hints: ['「おはよう。」と いった、と かく ときを おもいだそう。', 'ぶんの おわりには まる（。）を つけるね。'],
    explanation: 'かぎ（「」）は、ひとが はなした ことばに つけます。ぶんの おわりには まる（。）、とちゅうの くぎりには てん（、）を つけます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_write_002', subject: 'japanese', gradeLevel: 1, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「よぞらに まるい つきが でる。」の「つき」を かんじで かこう。',
    answer: '月', validationMode: 'exact',
    hints: ['よるの そらで ひかって いるよ。', 'かたちが かわって、みかづきにも なるよ。'],
    explanation: '「つき」は かんじで「{月|つき}」と かきます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_kanji_write_003', subject: 'japanese', gradeLevel: 1, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「てを あげて へんじを する。」の「て」を かんじで かこう。',
    answer: '手', validationMode: 'exact',
    hints: ['ものを つかんだり、はくしゅを したり する ところだよ。', 'よこの ぼうが 3ぼん ある かんじだよ。'],
    explanation: '「て」は かんじで「{手|て}」と かきます。',
    reviewed: true
  },
  {
    id: 'japanese_g1_vocab_008', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'advanced', answerType: 'choice',
    question: 'なかまはずれの ことばは どれかな。',
    choices: ['にんじん', 'いちご', 'すいか', 'めろん'],
    answer: 'にんじん',
    hints: ['みっつは あまくて、おやつや デザートに なるね。', 'りょうりに つかう やさいは どれかな。'],
    explanation: '「いちご」「すいか」「めろん」は あまい たべもので、「にんじん」は やさいです。',
    reviewed: true
  },
  {
    id: 'japanese_g1_vocab_009', subject: 'japanese', gradeLevel: 1, unit: 'vocab',
    difficulty: 'advanced', answerType: 'choice',
    question: 'えんぴつを かぞえる ときの ことばは どれかな。「えんぴつが 3□ ある。」',
    choices: ['ぼん', 'まい', 'ひき', 'だい'],
    answer: 'ぼん',
    hints: ['ほそながい ものを かぞえる ことばだよ。', '「かみ」は まい、「いぬ」は ひき、「くるま」は だい で かぞえるね。'],
    explanation: 'えんぴつのような ほそながい ものは「ほん（ぼん・ぽん）」で かぞえます。「3ぼん」と いいます。',
    inputForm: { question: 'えんぴつを かぞえる ときの ことばは なにかな。「えんぴつが 3□ ある。」', acceptedAnswers: ['ほん', '本'], validationMode: 'kana-insensitive', reviewed: true },
    reviewed: true
  },

  // ===== Lv2（小学2年） =====
  {
    id: 'japanese_g2_vocab_001', subject: 'japanese', gradeLevel: 2, unit: 'vocab',
    difficulty: 'basic', answerType: 'choice',
    question: '「{春|はる}」「{夏|なつ}」「{秋|あき}」と おなじ なかまの ことばは どれかな。',
    choices: ['{冬|ふゆ}', '{朝|あさ}', '{雪|ゆき}', '{北|きた}'],
    answer: '{冬|ふゆ}',
    hints: ['「{春|はる}」「{夏|なつ}」「{秋|あき}」は、1{年|ねん}の なかの なにを あらわす ことば かな。', 'きせつの なまえを さがそう。'],
    explanation: '「{春|はる}」「{夏|なつ}」「{秋|あき}」「{冬|ふゆ}」は、きせつの なまえです。',
    inputForm: { question: '「{春|はる}」「{夏|なつ}」「{秋|あき}」の つぎは なにかな。', acceptedAnswers: ['ふゆ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_read_001', subject: 'japanese', gradeLevel: 2, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{雪|}が ふる。」の「{雪|}」の よみかたを ひらがなで かこう。',
    answer: 'ゆき', validationMode: 'kana-insensitive',
    hints: ['ふゆに そらから ふって くる しろい ものだよ。', 'これで だるまを つくるよ。'],
    explanation: '「{雪|ゆき}」は「ゆき」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_read_002', subject: 'japanese', gradeLevel: 2, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{朝|}ごはんを {食|た}べる。」の「{朝|}」の よみかたを ひらがなで かこう。',
    answer: 'あさ', validationMode: 'kana-insensitive',
    hints: ['{一日|いちにち}の はじまりの じかんだよ。', '「ひる」「よる」の まえの じかんだよ。'],
    explanation: '「{朝|あさ}」は「あさ」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_read_003', subject: 'japanese', gradeLevel: 2, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{顔|}を あらう。」の「{顔|}」の よみかたを ひらがなで かこう。',
    answer: 'かお', validationMode: 'kana-insensitive',
    hints: ['め・はな・くちが ある ところだよ。', '「え〇〇」は わらった ときの ようすだよ。'],
    explanation: '「{顔|かお}」は「かお」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_vocab_002', subject: 'japanese', gradeLevel: 2, unit: 'vocab',
    difficulty: 'standard', answerType: 'input',
    question: '「{強|つよ}い」の はんたいの いみの ことばを ひらがなで かこう。',
    answer: 'よわい', acceptedAnswers: ['弱い'], validationMode: 'kana-insensitive',
    hints: ['ちからが あまり ない ようすだよ。', '「よ」から はじまる ことばだよ。'],
    explanation: '「{強|つよ}い」の はんたいは「よわい（{弱|よわ}い）」です。',
    reviewed: true
  },
  {
    id: 'japanese_g2_grammar_001', subject: 'japanese', gradeLevel: 2, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「{犬|いぬ}が {大|おお}きな こえで ほえた。」で、「なにが」に あたる ことばは どれかな。',
    choices: ['{犬|いぬ}が', '{大|おお}きな', 'こえで', 'ほえた'],
    answer: '{犬|いぬ}が',
    hints: ['ほえたのは だれ（なに）かな。', '「〜が」の かたちの ことばを さがそう。'],
    explanation: 'ほえたのは「{犬|いぬ}」なので、「なにが」に あたる ことばは「{犬|いぬ}が」です。',
    inputForm: { question: '「{犬|いぬ}が {大|おお}きな こえで ほえた。」で、「なにが」に あたる ことばを 書き出そう。', acceptedAnswers: ['犬', 'いぬが', 'いぬ'], validationMode: 'kana-insensitive', reviewed: true },
    reviewed: true
  },
  {
    id: 'japanese_g2_conjunction_001', subject: 'japanese', gradeLevel: 2, unit: 'conjunction',
    difficulty: 'standard', answerType: 'choice',
    question: '□に {入|はい}る ことばは どれかな。「{雨|あめ}が ふって いた。□、かさを さして {出|で}かけた。」',
    choices: ['だから', 'でも', 'それとも', 'ところで'],
    answer: 'だから',
    hints: ['{雨|あめ}が ふって いた ことが、かさを さした わけ（りゆう）に なって いるよ。', 'わけを うけて つなぐ ことばを えらぼう。'],
    explanation: '「{雨|あめ}が ふって いた」ことが りゆうで「かさを さした」ので、「だから」で つなぎます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_write_001', subject: 'japanese', gradeLevel: 2, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「ほんを よむ。」の「よむ」を、かんじと ひらがなで かこう。',
    answer: '読む', validationMode: 'exact',
    hints: ['「よ」の ぶぶんが かんじに なるよ。', 'ひだりがわに「ごんべん」が ある かんじだよ。'],
    explanation: '「よむ」は「{読|よ}む」と かきます。「む」は ひらがなで おくります。',
    reviewed: true
  },
  {
    id: 'japanese_g2_vocab_003', subject: 'japanese', gradeLevel: 2, unit: 'vocab',
    difficulty: 'advanced', answerType: 'choice',
    question: 'はんたいの いみの くみあわせに なって いないものは どれかな。',
    choices: ['{高|たか}い・{長|なが}い', '{遠|とお}い・{近|ちか}い', '{古|ふる}い・{新|あたら}しい', '{太|ふと}い・{細|ほそ}い'],
    answer: '{高|たか}い・{長|なが}い',
    hints: ['それぞれ「はんたいの ことば」を おもいうかべよう。', '「{高|たか}い」の はんたいは「ひくい」だね。'],
    explanation: '「{高|たか}い」の はんたいは「ひくい」、「{長|なが}い」の はんたいは「みじかい」です。ほかの 3つは はんたいの いみの くみあわせです。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g2_katakana_001', subject: 'japanese', gradeLevel: 2, unit: 'katakana',
    difficulty: 'basic', answerType: 'choice',
    question: 'かたかなで {書|か}く ことばは どれかな。',
    choices: ['ぴあの', 'ふでばこ', 'つくえ', 'えほん'],
    answer: 'ぴあの',
    hints: ['がいこくから きた ことばを さがそう。', 'おんがくの じかんに ひく がっきだよ。'],
    explanation: '「ぴあの」は がいこくから きた ことばなので、かたかなで「ピアノ」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_vocab_004', subject: 'japanese', gradeLevel: 2, unit: 'vocab',
    difficulty: 'basic', answerType: 'choice',
    question: '「{赤|あか}」「{青|あお}」「{黄色|きいろ}」と おなじ なかまの ことばは どれかな。',
    choices: ['{白|しろ}', '{花|はな}', '{山|やま}', '{走|はし}る'],
    answer: '{白|しろ}',
    hints: ['「{赤|あか}」「{青|あお}」「{黄色|きいろ}」は なにの なまえかな。', 'いろの なまえを さがそう。'],
    explanation: '「{赤|あか}」「{青|あお}」「{黄色|きいろ}」「{白|しろ}」は、いろの なまえです。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_read_004', subject: 'japanese', gradeLevel: 2, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{夜|}に なると {星|ほし}が {見|み}える。」の「{夜|}」の よみかたを ひらがなで かこう。',
    answer: 'よる', validationMode: 'kana-insensitive',
    hints: ['おひさまが しずんで、くらく なった ときだよ。', '「あさ」「ひる」の あとに くるよ。'],
    explanation: '「{夜|よる}」は「よる」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_read_005', subject: 'japanese', gradeLevel: 2, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{店|}で パンを {買|か}う。」の「{店|}」の よみかたを ひらがなで かこう。',
    answer: 'みせ', validationMode: 'kana-insensitive',
    hints: ['ものを {売|う}って いる ところだよ。', 'やおや、さかなや、パンや などの ことだよ。'],
    explanation: '「{店|みせ}」は「みせ」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_read_006', subject: 'japanese', gradeLevel: 2, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「なかの よい {友|}だちと あそぶ。」の「{友|}」の よみかたを ひらがなで かこう。',
    answer: 'とも', validationMode: 'kana-insensitive',
    hints: ['いっしょに あそぶ なかまの ことだよ。', 'ひらがな 2もじだよ。'],
    explanation: '「{友|とも}」は「とも」と よみます。「{友|とも}だち」と つかいます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_read_007', subject: 'japanese', gradeLevel: 2, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{電車|}に のって えきへ {行|い}く。」の「{電車|}」の よみかたを ひらがなで かこう。',
    answer: 'でんしゃ', validationMode: 'kana-insensitive',
    hints: ['せんろの {上|うえ}を はしる のりものだよ。', '「でん」は でんきの「でん」だよ。'],
    explanation: '「{電車|でんしゃ}」は「でんしゃ」と よみます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_write_002', subject: 'japanese', gradeLevel: 2, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「おひさまは ひがしから のぼる。」の「ひがし」を かんじで かこう。',
    answer: '東', validationMode: 'exact',
    hints: ['「{木|き}」と「{日|ひ}」を かさねた ような かたちだよ。', '「にし」は「{西|にし}」と かくよ。'],
    explanation: '「ひがし」は かんじで「{東|ひがし}」と かきます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_vocab_005', subject: 'japanese', gradeLevel: 2, unit: 'vocab',
    difficulty: 'standard', answerType: 'input',
    question: '「へやに {入|はい}る」の「{入|はい}る」の はんたいの いみの ことばを ひらがなで かこう。',
    answer: 'でる', acceptedAnswers: ['出る'], validationMode: 'kana-insensitive',
    hints: ['へやの そとへ いく ときの ことばだよ。', '「で」から はじまる 2もじの ことばだよ。'],
    explanation: '「{入|はい}る」の はんたいは「でる（{出|で}る）」です。',
    reviewed: true
  },
  {
    id: 'japanese_g2_katakana_002', subject: 'japanese', gradeLevel: 2, unit: 'katakana',
    difficulty: 'standard', answerType: 'input',
    question: 'なつに がっこうで およぐ、みずを ためた ところを、かたかなで かこう。',
    answer: 'プール', validationMode: 'exact',
    hints: ['はじめの おとは「ぷ」。かたかなでは「プ」と かくよ。まるを わすれないでね。', 'のばす おとは「ー」で かくよ。'],
    explanation: '「プール」と かきます。かたかなでは、のばす おとを「ー」で あらわします。',
    reviewed: false
  },
  {
    id: 'japanese_g2_grammar_002', subject: 'japanese', gradeLevel: 2, unit: 'grammar',
    difficulty: 'standard', answerType: 'input',
    question: '「わたしは まいにち ほんを よむ。」で、「だれが」に あたる ことばを ぶんの {中|なか}から そのまま かきぬこう。',
    answer: 'わたしは', acceptedAnswers: ['わたし'], validationMode: 'kana-insensitive',
    hints: ['ほんを よむのは だれかな。', '「〜は」の かたちの ことばを さがそう。'],
    explanation: 'ほんを よむのは「わたし」なので、「だれが」に あたる ことばは「わたしは」です。',
    reviewed: true
  },
  {
    id: 'japanese_g2_conjunction_002', subject: 'japanese', gradeLevel: 2, unit: 'conjunction',
    difficulty: 'standard', answerType: 'choice',
    question: '□に {入|はい}る ことばは どれかな。「あさは よく {晴|は}れて いた。□、ひるから {雨|あめ}が ふって きた。」',
    choices: ['ところが', 'だから', 'そして', 'それとも'],
    answer: 'ところが',
    hints: ['「{晴|は}れて いた」のに「{雨|あめ}が ふって きた」ね。', 'まえと ちがう ことが おきた ときに つかう ことばだよ。'],
    explanation: '{晴|は}れて いたのに {雨|あめ}が ふって きたので、おもって いたのと ちがう ことが おきた ときの「ところが」で つなぎます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_vocab_006', subject: 'japanese', gradeLevel: 2, unit: 'vocab',
    difficulty: 'standard', answerType: 'choice',
    question: '□に あう ことばは どれかな。「よぞらで {星|ほし}が □ ひかる。」',
    choices: ['きらきら', 'ざあざあ', 'ぺこぺこ', 'のろのろ'],
    answer: 'きらきら',
    hints: ['{星|ほし}が ひかる ようすを おもいうかべよう。', '「ざあざあ」は {雨|あめ}、「ぺこぺこ」は おなかの ようすだね。'],
    explanation: '{星|ほし}が ひかる ようすは「きらきら」です。「ざあざあ」は {雨|あめ}が ふる ようす、「ぺこぺこ」は おなかが すいた ようす、「のろのろ」は ゆっくり うごく ようすです。',
    reviewed: true
  },
  {
    id: 'japanese_g2_grammar_003', subject: 'japanese', gradeLevel: 2, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「ことりが {空|そら}を {高|たか}く とぶ。」で、「どうする」に あたる ことばは どれかな。',
    choices: ['とぶ', 'ことりが', '{空|そら}を', '{高|たか}く'],
    answer: 'とぶ',
    hints: ['ことりは なにを して いるのかな。', 'うごきを あらわす ことばは、ぶんの おわりの ほうに あるよ。'],
    explanation: 'ことりが して いる ことは「とぶ」なので、「どうする」に あたる ことばは「とぶ」です。',
    inputForm: { question: '「ことりが {空|そら}を {高|たか}く とぶ。」で、「どうする」に あたる ことばを 書き出そう。', acceptedAnswers: ['飛ぶ'], validationMode: 'kana-insensitive', reviewed: true },
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_meaning_001', subject: 'japanese', gradeLevel: 2, unit: 'kanji_meaning',
    difficulty: 'standard', answerType: 'choice',
    question: 'からだの ぶぶんを あらわす かんじは どれかな。',
    choices: ['{足|あし}', '{岩|いわ}', '{門|もん}', '{池|いけ}'],
    answer: '{足|あし}',
    hints: ['あるく ときに つかう ところだよ。', '「{岩|いわ}」「{門|もん}」「{池|いけ}」は からだでは ないね。'],
    explanation: '「{足|あし}」は からだの ぶぶんです。「{岩|いわ}」は {大|おお}きな いし、「{門|もん}」は いりぐち、「{池|いけ}」は みずが たまった ところです。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_write_003', subject: 'japanese', gradeLevel: 2, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「{大|おお}きな こえで うたう。」の「こえ」を かんじで かこう。',
    answer: '声', validationMode: 'exact',
    hints: ['くちから だす おとの ことだよ。', 'いちばん {上|うえ}は「{士|し}」の かたちだよ。'],
    explanation: '「こえ」は かんじで「{声|こえ}」と かきます。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_write_004', subject: 'japanese', gradeLevel: 2, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「にわとりが なく。」の「なく」を、かんじと ひらがなで かこう。（{鳥|とり}が こえを {出|だ}す ときの「なく」）',
    answer: '鳴く', validationMode: 'exact',
    hints: ['「くち」と「とり」を くみあわせた かんじだよ。', '「く」は ひらがなで おくるよ。'],
    explanation: '{鳥|とり}や むしが こえを {出|だ}す ときの「なく」は「{鳴|な}く」と かきます。{人|ひと}が なみだを {出|だ}す ときは「{泣|な}く」です。',
    reviewed: true
  },
  {
    id: 'japanese_g2_kosoado_001', subject: 'japanese', gradeLevel: 2, unit: 'kosoado',
    difficulty: 'advanced', answerType: 'choice',
    question: 'じぶんからも あいてからも とおくに ある ものを さす ことばは どれかな。',
    choices: ['あれ', 'これ', 'それ', 'どれ'],
    answer: 'あれ',
    hints: ['「これ」は じぶんの ちかく、「それ」は あいての ちかくの ものだよ。', '「どれ」は わからない ものを きく ときに つかうね。'],
    explanation: '「あれ」は、どちらからも とおい ものを さします。「これ」は じぶんに ちかい もの、「それ」は あいてに ちかい もの、「どれ」は わからない ものを きく ときの ことばです。',
    inputForm: { question: 'じぶんからも あいてからも とおくに ある ものを さす ことばは なにかな。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g2_kanji_meaning_002', subject: 'japanese', gradeLevel: 2, unit: 'kanji_meaning',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{木|き}」が 2つで「{林|はやし}」。では、「{木|き}」が 3つで できる かんじは どれかな。',
    choices: ['{森|もり}', '{村|むら}', '{校|こう}', '{休|やす}む'],
    answer: '{森|もり}',
    hints: ['{林|はやし}よりも、もっと {木|き}が たくさん ある ところだよ。', '{木|き}を {上|うえ}に 1つ、{下|した}に 2つ ならべた かたちだよ。'],
    explanation: '「{木|き}」が 3つで「{森|もり}」です。{林|はやし}よりも {木|き}が たくさん しげって いる ところを あらわします。',
    inputForm: { question: '「{木|き}」が 2つで「{林|はやし}」。では、「{木|き}」が 3つで できる かんじは なにかな。', validationMode: 'exact', reviewed: true },
    reviewed: true
  },

  // ===== Lv3（小学3年） =====
  {
    id: 'japanese_g3_dictionary_001', subject: 'japanese', gradeLevel: 3, unit: 'dictionary',
    difficulty: 'basic', answerType: 'choice',
    question: '{国語辞典|こくごじてん}で、いちばん {先|さき}に {出|で}て くる ことばは どれかな。',
    choices: ['あいさつ', 'あさがお', 'あさひ', 'あめ'],
    answer: 'あいさつ',
    hints: ['1{文字目|もじめ}は みんな「あ」。2{文字目|もじめ}を くらべよう。', '{国語辞典|こくごじてん}は「あいうえお」の {順|じゅん}に ならんで いるよ。'],
    explanation: '2{文字目|もじめ}を くらべると「い」「さ」「さ」「め」。「い」が いちばん {先|さき}なので「あいさつ」です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_read_001', subject: 'japanese', gradeLevel: 3, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{湖|}の {近|ちか}くに {住|す}む。」の「{湖|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'みずうみ', validationMode: 'kana-insensitive',
    hints: ['{池|いけ}より ずっと {大|おお}きい、{水|みず}が たまった ところだよ。', '{部首|ぶしゅ}の「さんずい」は {水|みず}に かんけいが あるよ。'],
    explanation: '「{湖|みずうみ}」は「みずうみ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_read_002', subject: 'japanese', gradeLevel: 3, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{列車|れっしゃ}が {駅|}に {着|つ}く。」の「{駅|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'えき', validationMode: 'kana-insensitive',
    hints: ['{電車|でんしゃ}に のったり おりたり する ところだよ。', '2{文字|もじ}の ことばだよ。'],
    explanation: '「{駅|えき}」は「えき」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_write_001', subject: 'japanese', gradeLevel: 3, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「かぜを ひいて くすりを のむ。」の「くすり」を {漢字|かんじ}で {書|か}こう。',
    answer: '薬', validationMode: 'exact',
    hints: ['{草|くさ}に かんけいの ある「くさかんむり」が {上|うえ}に つくよ。', '「{楽|たの}しい」の「{楽|らく}」の {上|うえ}に くさかんむりを つけた {形|かたち}だよ。'],
    explanation: '「くすり」は「{薬|くすり}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_vocab_001', subject: 'japanese', gradeLevel: 3, unit: 'vocab',
    difficulty: 'standard', answerType: 'input',
    question: '「{重|おも}い」の {反対|はんたい}の {意味|いみ}の ことばを ひらがなで {書|か}こう。',
    answer: 'かるい', acceptedAnswers: ['軽い'], validationMode: 'kana-insensitive',
    hints: ['はねや かみの ような ものの ようすだよ。', '「か」から はじまる ことばだよ。'],
    explanation: '「{重|おも}い」の {反対|はんたい}は「かるい（{軽|かる}い）」です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_grammar_001', subject: 'japanese', gradeLevel: 3, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「{赤|あか}い {大|おお}きな {船|ふね}が ゆっくり {進|すす}む。」で、「ゆっくり」が くわしく して いる ことばは どれかな。',
    choices: ['{進|すす}む', '{赤|あか}い', '{大|おお}きな', '{船|ふね}が'],
    answer: '{進|すす}む',
    hints: ['「ゆっくり」は どんな ようすを あらわして いるかな。', '「ゆっくり ○○」と つなげて {意味|いみ}が 通る ことばを さがそう。'],
    explanation: '「ゆっくり {進|すす}む」と つながるので、「ゆっくり」は「{進|すす}む」を くわしく して います（{修飾語|しゅうしょくご}）。',
    inputForm: { question: '「{赤|あか}い {大|おお}きな {船|ふね}が ゆっくり {進|すす}む。」で、「ゆっくり」が くわしく して いる ことばを 書き出そう。', acceptedAnswers: ['すすむ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g3_proverb_001', subject: 'japanese', gradeLevel: 3, unit: 'proverb',
    difficulty: 'standard', answerType: 'choice',
    question: 'ことわざ「さるも {木|き}から {落|お}ちる」の {意味|いみ}は どれかな。',
    choices: ['{名人|めいじん}でも {失敗|しっぱい}する ことが ある', 'さるは {木|き}に のぼるのが {下手|へた}だ', '{高|たか}い ところは あぶない', '{何度|なんど}も {練習|れんしゅう}すれば うまく なる'],
    answer: '{名人|めいじん}でも {失敗|しっぱい}する ことが ある',
    hints: ['さるは {木|き}のぼりが とても とくいな どうぶつだね。', 'とくいな ものでも {落|お}ちる ことが ある、という たとえだよ。'],
    explanation: '{木|き}のぼりが とくいな さるでも {落|お}ちる ことが ある ように、「{名人|めいじん}でも {失敗|しっぱい}する ことが ある」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_radical_001', subject: 'japanese', gradeLevel: 3, unit: 'radical',
    difficulty: 'advanced', answerType: 'input',
    question: '「{海|うみ}」「{池|いけ}」「{湖|みずうみ}」に {共通|きょうつう}する {部首|ぶしゅ}の {名前|なまえ}を ひらがなで {書|か}こう。',
    answer: 'さんずい', validationMode: 'kana-insensitive',
    hints: ['どれも {漢字|かんじ}の {左側|ひだりがわ}が {同|おな}じ {形|かたち}だよ。', '{水|みず}に かんけいの ある {部首|ぶしゅ}だよ。'],
    explanation: '{左側|ひだりがわ}の「氵」は「さんずい」という {部首|ぶしゅ}で、{水|みず}に かんけいの ある {漢字|かんじ}に つきます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_okurigana_001', subject: 'japanese', gradeLevel: 3, unit: 'okurigana',
    difficulty: 'advanced', answerType: 'choice',
    question: '「あつまる」を {漢字|かんじ}と {送|おく}りがなで {書|か}いた とき、{正|ただ}しいのは どれかな。',
    choices: ['集まる', '集る', '集つまる', '集あつまる'],
    answer: '集まる',
    hints: ['「あつめる」は「{集|あつ}める」と {書|か}くね。', '「あつ」の ぶぶんが {漢字|かんじ}に なるよ。'],
    explanation: '「あつまる」は「{集|あつ}まる」と {書|か}きます。「{集|あつ}める」「{集|あつ}まる」のように、かわる ところから {送|おく}りがなに します。',
    inputForm: { question: '「あつまる」を {漢字|かんじ}と {送|おく}りがなで {書|か}いた とき、どう 書くかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g3_dictionary_002', subject: 'japanese', gradeLevel: 3, unit: 'dictionary',
    difficulty: 'basic', answerType: 'choice',
    question: 'つぎの ことばを {国語辞典|こくごじてん}に のって いる {順|じゅん}に ならべた とき、いちばん {前|まえ}に くるのは どれかな。',
    choices: ['かさ', 'かみ', 'かめ', 'かも'],
    answer: 'かさ',
    hints: ['1{文字目|もじめ}は みんな「か」。2{文字目|もじめ}を くらべよう。', '「あいうえお・かきくけこ・さしすせそ…」の {順|じゅん}で {先|さき}に くるのは どれかな。'],
    explanation: '2{文字目|もじめ}は「さ」「み」「め」「も」。「さ」が いちばん {先|さき}なので「かさ」です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_vocab_002', subject: 'japanese', gradeLevel: 3, unit: 'vocab',
    difficulty: 'basic', answerType: 'choice',
    question: '□に あう ことばは どれかな。「{細|こま}かい {雨|あめ}が □ ふって いる。」',
    choices: ['しとしと', 'ぽかぽか', 'からから', 'ぎらぎら'],
    answer: 'しとしと',
    hints: ['{細|こま}かい {雨|あめ}が しずかに ふる ようすだよ。', '「ぽかぽか」は あたたかい ようす、「ぎらぎら」は つよく ひかる ようすだね。'],
    explanation: '{細|こま}かい {雨|あめ}が しずかに ふる ようすは「しとしと」です。「ぽかぽか」は あたたかい ようす、「からから」は かわいた ようす、「ぎらぎら」は つよく てりつける ようすです。',
    inputForm: { question: '□に あう ことばを 書こう。「{細|こま}かい {雨|あめ}が □ ふって いる。」', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_read_003', subject: 'japanese', gradeLevel: 3, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「おばあさんから {昔話|}を {聞|き}く。」の「{昔話|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'むかしばなし', validationMode: 'kana-insensitive',
    hints: ['「{桃太郎|ももたろう}」や「かさじぞう」のような {古|ふる}い お{話|はなし}だよ。', '「むかし」と「はなし」を つなげると、あとの ほうの {音|おと}が にごるよ。'],
    explanation: '「{昔話|むかしばなし}」は「むかしばなし」と {読|よ}みます。「はなし」が「ばなし」と にごります。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_read_004', subject: 'japanese', gradeLevel: 3, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{自転車|じてんしゃ}を おして {坂道|}を のぼる。」の「{坂道|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'さかみち', validationMode: 'kana-insensitive',
    hints: ['かたむいて いて、のぼったり くだったり する {道|みち}だよ。', '「さか」と「みち」を つなげた ことばだよ。'],
    explanation: '「{坂道|さかみち}」は「さかみち」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_read_005', subject: 'japanese', gradeLevel: 3, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「お{店|みせ}の {人|ひと}が {商品|}を ならべる。」の「{商品|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'しょうひん', validationMode: 'kana-insensitive',
    hints: ['お{店|みせ}で {売|う}る ための {品物|しなもの}の ことだよ。', '「{品|ひん}」は「{作品|さくひん}」の「ひん」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{商品|しょうひん}」は「しょうひん」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_read_006', subject: 'japanese', gradeLevel: 3, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「ねる {前|まえ}に {童話|}を {読|よ}んで もらう。」の「{童話|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'どうわ', validationMode: 'kana-insensitive',
    hints: ['{子|こ}どもの ために {書|か}かれた お{話|はなし}の ことだよ。', '「{話|わ}」は「{会話|かいわ}」の「わ」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{童話|どうわ}」は「どうわ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_write_002', subject: 'japanese', gradeLevel: 3, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{重|おも}い にもつを はこぶ。」の「はこぶ」を {漢字|かんじ}と ひらがなで {書|か}こう。',
    answer: '運ぶ', validationMode: 'exact',
    hints: ['「{運動会|うんどうかい}」の「うん」と {同|おな}じ {漢字|かんじ}だよ。', '「ぶ」は ひらがなで {送|おく}るよ。'],
    explanation: '「はこぶ」は「{運|はこ}ぶ」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_kanji_write_003', subject: 'japanese', gradeLevel: 3, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「たいようが {東|ひがし}の {空|そら}に のぼる。」の「たいよう」を {漢字|かんじ}で {書|か}こう。',
    answer: '太陽', validationMode: 'exact',
    hints: ['「たい」は「{太|ふと}い」の {漢字|かんじ}だよ。', '「よう」は「こざとへん」の {漢字|かんじ}だよ。'],
    explanation: '「たいよう」は「{太陽|たいよう}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_proverb_002', subject: 'japanese', gradeLevel: 3, unit: 'proverb',
    difficulty: 'standard', answerType: 'input',
    question: 'ことわざ「{急|いそ}がば □」は「{急|いそ}ぐ ときほど、{安全|あんぜん}な {道|みち}を {通|とお}る ほうが かえって {早|はや}い」という {意味|いみ}です。□に {入|はい}る ことばを ひらがな 3{文字|もじ}で {書|か}こう。',
    answer: 'まわれ', acceptedAnswers: ['回れ'], validationMode: 'kana-insensitive',
    hints: ['ちかみちを しないで、とおまわりを しなさい という {意味|いみ}だよ。', '「まわる」を {命令|めいれい}する {形|かたち}に しよう。'],
    explanation: '「{急|いそ}がば {回|まわ}れ」は、{急|いそ}ぐ ときほど {確|たし}かな {方法|ほうほう}を とる ほうが よい という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_idiom_001', subject: 'japanese', gradeLevel: 3, unit: 'idiom',
    difficulty: 'standard', answerType: 'input',
    question: '「□を {長|なが}くして {待|ま}つ」は「{今|いま}か {今|いま}かと {楽|たの}しみに {待|ま}つ」という {意味|いみ}です。□に {入|はい}る {体|からだ}の {部分|ぶぶん}を ひらがなで {書|か}こう。',
    answer: 'くび', acceptedAnswers: ['首'], validationMode: 'kana-insensitive',
    hints: ['{頭|あたま}と {体|からだ}を つないで いる ところだよ。', 'きりんは ここが とても {長|なが}いね。'],
    explanation: '「{首|くび}を {長|なが}くして {待|ま}つ」は、{今|いま}か {今|いま}かと {待|ま}ちこがれる ようすを あらわす {慣用句|かんようく}です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_grammar_002', subject: 'japanese', gradeLevel: 3, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「ぼくの {弟|おとうと}は とても {元気|げんき}です。」の {主語|しゅご}（「だれは」に あたる ことば）は どれかな。',
    choices: ['{弟|おとうと}は', 'ぼくの', 'とても', '{元気|げんき}です'],
    answer: '{弟|おとうと}は',
    hints: ['{元気|げんき}なのは だれかな。', '{主語|しゅご}は「〜は」「〜が」の {形|かたち}に なる ことが {多|おお}いよ。'],
    explanation: '{元気|げんき}なのは「{弟|おとうと}」なので、{主語|しゅご}は「{弟|おとうと}は」です。「ぼくの」は「{弟|おとうと}は」を くわしく して います。',
    inputForm: { question: '「ぼくの {弟|おとうと}は とても {元気|げんき}です。」の {主語|しゅご}（「だれは」に あたる ことば）を 書き出そう。', acceptedAnswers: ['弟', 'おとうとは', 'おとうと'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g3_conjunction_001', subject: 'japanese', gradeLevel: 3, unit: 'conjunction',
    difficulty: 'standard', answerType: 'choice',
    question: '□に {入|はい}る ことばは どれかな。「{宿題|しゅくだい}を すませた。□、{公園|こうえん}へ あそびに {行|い}った。」',
    choices: ['それから', 'しかし', 'なぜなら', 'それとも'],
    answer: 'それから',
    hints: ['{宿題|しゅくだい}の あとに、{公園|こうえん}へ {行|い}ったね。', 'じゅんばんに つづく ことを つなぐ ことばだよ。'],
    explanation: '{宿題|しゅくだい}を すませた あとに {公園|こうえん}へ {行|い}ったので、{順|じゅん}に つづく ことを あらわす「それから」で つなぎます。',
    inputForm: { question: '□に 入る ことばを 書こう。「{宿題|しゅくだい}を すませた。□、{公園|こうえん}へ あそびに {行|い}った。」', acceptedAnswers: ['そして', 'そのあと', 'そのあとで'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g3_kosoado_001', subject: 'japanese', gradeLevel: 3, unit: 'kosoado',
    difficulty: 'standard', answerType: 'choice',
    question: '「そこに ある ノートを とって。」の「そこ」は、どんな {場所|ばしょ}を さして いるかな。',
    choices: ['{話|はな}し{相手|あいて}に {近|ちか}い {場所|ばしょ}', '{話|はな}して いる {人|ひと}に {近|ちか}い {場所|ばしょ}', 'どちらからも {遠|とお}い {場所|ばしょ}', 'どこか わからない {場所|ばしょ}'],
    answer: '{話|はな}し{相手|あいて}に {近|ちか}い {場所|ばしょ}',
    hints: ['「ここ」「そこ」「あそこ」「どこ」の ちがいを {考|かんが}えよう。', '「ここ」は {自分|じぶん}の {近|ちか}くだね。'],
    explanation: '「そこ」は {話|はな}し{相手|あいて}に {近|ちか}い {場所|ばしょ}を さします。「ここ」は {自分|じぶん}に {近|ちか}い {場所|ばしょ}、「あそこ」は どちらからも {遠|とお}い {場所|ばしょ}、「どこ」は わからない {場所|ばしょ}を たずねる ことばです。',
    reviewed: true
  },
  {
    id: 'japanese_g3_radical_002', subject: 'japanese', gradeLevel: 3, unit: 'radical',
    difficulty: 'standard', answerType: 'choice',
    question: '「{話|はな}す」「{読|よ}む」「{詩|し}」に {共通|きょうつう}する {部首|ぶしゅ}は どれかな。',
    choices: ['ごんべん', 'にんべん', 'いとへん', 'きへん'],
    answer: 'ごんべん',
    hints: ['どれも {漢字|かんじ}の {左側|ひだりがわ}が {同|おな}じ {形|かたち}だよ。', 'ことばに かんけいの ある {部首|ぶしゅ}だよ。'],
    explanation: 'どれも {左側|ひだりがわ}に「ごんべん」が あります。ごんべんは「{言|い}う」の {形|かたち}から できた {部首|ぶしゅ}で、ことばに かんけいの ある {漢字|かんじ}に つきます。',
    inputForm: { question: '「{話|はな}す」「{読|よ}む」「{詩|し}」に {共通|きょうつう}する 部首は 何かな。', acceptedAnswers: ['言偏', '言べん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g3_okurigana_002', subject: 'japanese', gradeLevel: 3, unit: 'okurigana',
    difficulty: 'advanced', answerType: 'input',
    question: '「わかれが かなしい。」の「かなしい」を {漢字|かんじ}と {送|おく}りがなで {書|か}こう。',
    answer: '悲しい', validationMode: 'exact',
    hints: ['「こころ（{心|こころ}）」が {下|した}に つく {漢字|かんじ}だよ。', '「うれしい」「たのしい」と {同|おな}じように、「しい」を {送|おく}るよ。'],
    explanation: '「かなしい」は「{悲|かな}しい」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g3_vocab_003', subject: 'japanese', gradeLevel: 3, unit: 'vocab',
    difficulty: 'advanced', answerType: 'input',
    question: '「{授業|じゅぎょう}が {始|はじ}まる」の「{始|はじ}まる」の {反対|はんたい}の {意味|いみ}の ことばを ひらがなで {書|か}こう。',
    answer: 'おわる', acceptedAnswers: ['終わる', '終る'], validationMode: 'kana-insensitive',
    hints: ['チャイムが なって、{休|やす}み{時間|じかん}に なる ときの ことばだよ。', '「お」から はじまる 3{文字|もじ}の ことばだよ。'],
    explanation: '「{始|はじ}まる」の {反対|はんたい}は「おわる（{終|お}わる）」です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_proverb_003', subject: 'japanese', gradeLevel: 3, unit: 'proverb',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ことわざ「{花|はな}より だんご」の {意味|いみ}は どれかな。',
    choices: ['{見|み}た {目|め}の よさより、{役|やく}に {立|た}つ ものの ほうが よい', '{花|はな}を {見|み}ながら だんごを {食|た}べると おいしい', 'だんごより {花|はな}の ほうが きれいだ', 'よい ことの あとには わるい ことが おこる'],
    answer: '{見|み}た {目|め}の よさより、{役|やく}に {立|た}つ ものの ほうが よい',
    hints: ['お{花見|はなみ}で、{花|はな}より だんごを {楽|たの}しむ {人|ひと}の ようすから できた ことばだよ。', '「きれいな もの」と「おなかが いっぱいに なる もの」、どちらを えらんで いるかな。'],
    explanation: '{花|はな}を ながめるより だんごを {食|た}べる ほうが よい という ことから、「{見|み}た {目|め}より {実際|じっさい}に {役|やく}に {立|た}つ ものの ほうが よい」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g3_homonym_001', subject: 'japanese', gradeLevel: 3, unit: 'homonym',
    difficulty: 'advanced', answerType: 'choice',
    question: '「まどを あけて、{空気|くうき}を {入|い}れかえる。」の「あける」に あてはまる {漢字|かんじ}は どれかな。',
    choices: ['{開|あ}ける', '{明|あ}ける', '{空|あ}ける', '{上|あ}げる'],
    answer: '{開|あ}ける',
    hints: ['しまって いる ものを ひらく ときの「あける」だよ。', '「{門|もん}」の {中|なか}に ほかの {形|かたち}が {入|はい}った {漢字|かんじ}だよ。'],
    explanation: 'しまって いる ものを ひらく ときは「{開|あ}ける」です。「{明|あ}ける」は {夜|よ}が おわって {明|あか}るく なる とき（{夜|よ}が {明|あ}ける）、「{空|あ}ける」は からに する とき（{部屋|へや}を {空|あ}ける）に {使|つか}います。「{上|あ}げる」は「あげる」と {読|よ}む べつの ことばです。',
    inputForm: { question: '「まどを あけて、{空気|くうき}を {入|い}れかえる。」の「あける」に あてはまる 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },

  // ===== Lv4（小学4年） =====
  {
    id: 'japanese_g4_idiom_001', subject: 'japanese', gradeLevel: 4, unit: 'idiom',
    difficulty: 'basic', answerType: 'choice',
    question: '「{手|て}を かす」の {意味|いみ}は どれかな。',
    choices: ['{手伝|てつだ}う', '{手|て}を あらう', '{手|て}ぶくろを かす', 'けんかを する'],
    answer: '{手伝|てつだ}う',
    hints: ['{体|からだ}の {部分|ぶぶん}を {使|つか}った {慣用句|かんようく}だよ。', '「{手|て}が {足|た}りない」ときに {頼|たの}む ことだよ。'],
    explanation: '「{手|て}を かす」は「{手伝|てつだ}う」という {意味|いみ}の {慣用句|かんようく}です。',
    inputForm: { question: '「{手|て}を かす」の 意味は 何かな。', acceptedAnswers: ['てつだう', '手助けする', '助ける', 'たすける'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_read_001', subject: 'japanese', gradeLevel: 4, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{運動会|うんどうかい}で {旗|}を ふる。」の「{旗|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'はた', validationMode: 'kana-insensitive',
    hints: ['ぬのに もようを かいて、ぼうに つけた ものだよ。', '「{国|こっ}き」の「き」と {同|おな}じ {漢字|かんじ}。ここでは {訓読|くんよ}みで {読|よ}むよ。'],
    explanation: '「{旗|はた}」は「はた」と {読|よ}みます。{音読|おんよ}みは「キ」です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_read_002', subject: 'japanese', gradeLevel: 4, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{冬|ふゆ}から {春|はる}へ {季節|}が かわる。」の「{季節|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'きせつ', validationMode: 'kana-insensitive',
    hints: ['{春|はる}・{夏|なつ}・{秋|あき}・{冬|ふゆ}の ことだよ。', '3{文字|もじ}の ことばだよ。'],
    explanation: '「{季節|きせつ}」は「きせつ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_read_003', subject: 'japanese', gradeLevel: 4, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「カレーの {材料|}を そろえる。」の「{材料|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'ざいりょう', validationMode: 'kana-insensitive',
    hints: ['ものを {作|つく}る もとに なる ものの ことだよ。', '「{料理|りょうり}」の「{料|りょう}」と {同|おな}じ {読|よ}み{方|かた}が あるよ。'],
    explanation: '「{材料|ざいりょう}」は「ざいりょう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_write_001', subject: 'japanese', gradeLevel: 4, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「アサガオの かんさつ{日記|にっき}を つける。」の「かんさつ」を {漢字|かんじ}で {書|か}こう。',
    answer: '観察', validationMode: 'exact',
    hints: ['「かん」は「よく {見|み}る」という {意味|いみ}の {漢字|かんじ}。「{見|み}る」が {右側|みぎがわ}に つくよ。', '「さつ」は「{警|けい}さつ」の「さつ」と {同|おな}じ {漢字|かんじ}だよ。'],
    explanation: '「かんさつ」は「{観察|かんさつ}」と {書|か}きます。ものごとを よく {見|み}て しらべる ことです。',
    reviewed: true
  },
  {
    id: 'japanese_g4_compound_001', subject: 'japanese', gradeLevel: 4, unit: 'word',
    difficulty: 'standard', answerType: 'choice',
    question: '「{売買|ばいばい}（{売|う}る・{買|か}う）」と {同|おな}じ {組|く}み{立|た}ての {熟語|じゅくご}は どれかな。',
    choices: ['{左右|さゆう}', '{学習|がくしゅう}', '{海水|かいすい}', '{登山|とざん}'],
    answer: '{左右|さゆう}',
    hints: ['「{売|う}る」と「{買|か}う」は、{反対|はんたい}の {意味|いみ}の {漢字|かんじ}だね。', '{反対|はんたい}の {意味|いみ}の {漢字|かんじ}を 2つ {組|く}み{合|あ}わせた {熟語|じゅくご}を さがそう。'],
    explanation: '「{売買|ばいばい}」と「{左右|さゆう}」は、{反対|はんたい}の {意味|いみ}の {漢字|かんじ}を {組|く}み{合|あ}わせた {熟語|じゅくご}です。「{学習|がくしゅう}」は にた {意味|いみ}、「{海水|かいすい}」は「{海|うみ}の {水|みず}」、「{登山|とざん}」は「{山|やま}に {登|のぼ}る」という {組|く}み{立|た}てです。',
    reviewed: true
  },
  {
    id: 'japanese_g4_conjunction_001', subject: 'japanese', gradeLevel: 4, unit: 'conjunction',
    difficulty: 'standard', answerType: 'choice',
    question: '□に {入|はい}る ことばは どれかな。「たくさん {練習|れんしゅう}した。□、{試合|しあい}に {負|ま}けて しまった。」',
    choices: ['しかし', 'だから', 'そして', 'つまり'],
    answer: 'しかし',
    hints: ['{練習|れんしゅう}したのに、よくない {結果|けっか}に なって いるね。', '{前|まえ}と {後|あと}が {反対|はんたい}の {内容|ないよう}の ときに {使|つか}う ことばだよ。'],
    explanation: '「たくさん {練習|れんしゅう}した」のに「{負|ま}けた」という、{予想|よそう}と {反対|はんたい}の {結果|けっか}なので「しかし」で つなぎます。',
    inputForm: { question: '□に 入る ことばを 書こう。「たくさん {練習|れんしゅう}した。□、{試合|しあい}に {負|ま}けて しまった。」', acceptedAnswers: ['でも', 'けれども', 'けれど', 'だが', 'ところが'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g4_idiom_002', subject: 'japanese', gradeLevel: 4, unit: 'idiom',
    difficulty: 'advanced', answerType: 'input',
    question: '「□が {高|たか}い」は「ほこらしい {気持|きも}ち」を あらわす {慣用句|かんようく}です。□に {入|はい}る {体|からだ}の {部分|ぶぶん}を ひらがなで {書|か}こう。',
    answer: 'はな', acceptedAnswers: ['鼻'], validationMode: 'kana-insensitive',
    hints: ['{顔|かお}の まんなかに ある {部分|ぶぶん}だよ。', 'じまんする ときの ようすを {思|おも}いうかべよう。'],
    explanation: '「{鼻|はな}が {高|たか}い」は、ほこらしく {思|おも}う ようすを あらわす {慣用句|かんようく}です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_proverb_001', subject: 'japanese', gradeLevel: 4, unit: 'proverb',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ことわざ「{石|いし}の {上|うえ}にも {三年|さんねん}」の {意味|いみ}は どれかな。',
    choices: ['がまん{強|づよ}く {続|つづ}ければ、いつか うまく いく', '{石|いし}の {上|うえ}は {冷|つめ}たいので すわらない ほうが よい', '{三年|さんねん}たてば ものは {古|ふる}く なる', 'かたい ものは こわれにくい'],
    answer: 'がまん{強|づよ}く {続|つづ}ければ、いつか うまく いく',
    hints: ['{冷|つめ}たい {石|いし}も、{長|なが}い あいだ すわって いれば どうなるかな。', '「{続|つづ}ける」ことの だいじさを {言|い}って いるよ。'],
    explanation: '{冷|つめ}たい {石|いし}の {上|うえ}でも {三年|さんねん}すわり{続|つづ}ければ あたたまる ことから、「がまん{強|づよ}く {続|つづ}ければ、いつか うまく いく」という {意味|いみ}です。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g4_idiom_003', subject: 'japanese', gradeLevel: 4, unit: 'idiom',
    difficulty: 'basic', answerType: 'choice',
    question: '「{先生|せんせい}の {話|はなし}は {耳|みみ}が いたい。」の「{耳|みみ}が いたい」の {意味|いみ}は どれかな。',
    choices: ['{自分|じぶん}の {弱|よわ}い ところを {言|い}われて、{聞|き}くのが つらい', '{耳|みみ}の {病気|びょうき}に かかって いる', '{大|おお}きな {音|おと}が うるさい', '{話|はなし}が おもしろくて わらって しまう'],
    answer: '{自分|じぶん}の {弱|よわ}い ところを {言|い}われて、{聞|き}くのが つらい',
    hints: ['{体|からだ}の {部分|ぶぶん}を {使|つか}った {慣用句|かんようく}だよ。ほんとうに いたいわけでは ないよ。', '{注意|ちゅうい}された ことが {自分|じぶん}に あてはまって いる ときの {気持|きも}ちだよ。'],
    explanation: '「{耳|みみ}が いたい」は、{自分|じぶん}の {弱|よわ}い ところや {失敗|しっぱい}を {言|い}われて、{聞|き}くのが つらい という {意味|いみ}の {慣用句|かんようく}です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_grammar_001', subject: 'japanese', gradeLevel: 4, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '「{庭|にわ}に {美|うつく}しい {花|はな}が たくさん さいた。」で、「{美|うつく}しい」が くわしく して いる ことばは どれかな。',
    choices: ['{花|はな}が', '{庭|にわ}に', 'たくさん', 'さいた'],
    answer: '{花|はな}が',
    hints: ['「{美|うつく}しい ○○」と つなげて {意味|いみ}が {通|とお}る ことばを さがそう。', 'ようすを あらわす ことばは、ものの {名前|なまえ}を くわしく する ことが {多|おお}いよ。'],
    explanation: '「{美|うつく}しい {花|はな}」と つながるので、「{美|うつく}しい」は「{花|はな}が」を くわしく して います（{修飾語|しゅうしょくご}）。',
    inputForm: { question: '「{庭|にわ}に {美|うつく}しい {花|はな}が たくさん さいた。」で、「{美|うつく}しい」が くわしく して いる ことばを 書き出そう。', acceptedAnswers: ['花', 'はなが'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_read_004', subject: 'japanese', gradeLevel: 4, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{失敗|}を おそれずに ちょうせんする。」の「{失敗|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'しっぱい', validationMode: 'kana-insensitive',
    hints: ['うまく いかなかった ことだよ。「{成功|せいこう}」の {反対|はんたい}の ことば。', '「{失|うしな}う」の {音読|おんよ}みは「シツ」。ここでは つまって「しっ」に なるよ。'],
    explanation: '「{失敗|しっぱい}」は「しっぱい」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_read_005', subject: 'japanese', gradeLevel: 4, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「この はさみは {軽|かる}くて {便利|}だ。」の「{便利|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'べんり', validationMode: 'kana-insensitive',
    hints: ['{使|つか}いやすくて {役|やく}に {立|た}つ ようすだよ。', '「{利|り}」は「{利用|りよう}」の「り」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{便利|べんり}」は「べんり」と {読|よ}みます。{反対|はんたい}の {意味|いみ}の ことばは「{不便|ふべん}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_read_006', subject: 'japanese', gradeLevel: 4, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{雨|あめ}で {遠足|えんそく}が {中止|ちゅうし}に なって {残念|}だ。」の「{残念|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'ざんねん', validationMode: 'kana-insensitive',
    hints: ['{思|おも}いどおりに ならなくて、くやしい {気持|きも}ちだよ。', '「{残|のこ}る」の {音読|おんよ}みは「ザン」だよ。'],
    explanation: '「{残念|ざんねん}」は「ざんねん」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_read_007', subject: 'japanese', gradeLevel: 4, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{毎朝|まいあさ} {走|はし}って {健康|}な {体|からだ}を つくる。」の「{健康|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'けんこう', validationMode: 'kana-insensitive',
    hints: ['{病気|びょうき}を せず、{元気|げんき}な ようすだよ。', '4{文字|もじ}の ことばだよ。'],
    explanation: '「{健康|けんこう}」は「けんこう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_write_002', subject: 'japanese', gradeLevel: 4, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{水泳|すいえい}で {自分|じぶん}の きろくを のばした。」の「きろく」を {漢字|かんじ}で {書|か}こう。',
    answer: '記録', validationMode: 'exact',
    hints: ['「き」は「{日記|にっき}」の「き」と {同|おな}じ {漢字|かんじ}だよ。', '「ろく」は「かねへん」の {漢字|かんじ}だよ。'],
    explanation: '「きろく」は「{記録|きろく}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_write_003', subject: 'japanese', gradeLevel: 4, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{何度|なんど}も やりなおして、{実験|じっけん}が せいこうした。」の「せいこう」を {漢字|かんじ}で {書|か}こう。',
    answer: '成功', validationMode: 'exact',
    hints: ['「せい」は「{成長|せいちょう}」の「せい」と {同|おな}じ {漢字|かんじ}だよ。', '「こう」は「{工|こう}」と「{力|ちから}」を {合|あ}わせた {漢字|かんじ}だよ。'],
    explanation: '「せいこう」は「{成功|せいこう}」と {書|か}きます。{反対|はんたい}の {意味|いみ}の ことばは「{失敗|しっぱい}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_idiom_004', subject: 'japanese', gradeLevel: 4, unit: 'idiom',
    difficulty: 'standard', answerType: 'input',
    question: '「あまい ものに □が ない」は「とても {好|す}きで たまらない」という {意味|いみ}の {慣用句|かんようく}です。□に {入|はい}る {体|からだ}の {部分|ぶぶん}を ひらがなで {書|か}こう。',
    answer: 'め', acceptedAnswers: ['目'], validationMode: 'kana-insensitive',
    hints: ['{顔|かお}に ある、ものを {見|み}る ところだよ。', 'ひらがな 1{文字|もじ}だよ。'],
    explanation: '「{目|め}が ない」は、とても {好|す}きで、それを {見|み}ると がまんできない ようすを あらわす {慣用句|かんようく}です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_grammar_002', subject: 'japanese', gradeLevel: 4, unit: 'grammar',
    difficulty: 'standard', answerType: 'input',
    question: '「{西|にし}の {空|そら}の {夕焼|ゆうや}けが とても きれいだ。」の {主語|しゅご}を、{文|ぶん}の {中|なか}から そのまま ひらがなで {書|か}きぬこう。',
    answer: 'ゆうやけが', acceptedAnswers: ['夕焼けが', 'ゆうやけ', '夕焼け'], validationMode: 'kana-insensitive',
    hints: ['「きれいだ」なのは {何|なに}かな。', '「{西|にし}の」「{空|そら}の」は、{主語|しゅご}を くわしく して いる ことばだよ。'],
    explanation: 'きれいなのは「{夕焼|ゆうや}け」なので、{主語|しゅご}は「{夕焼|ゆうや}けが」です。{述語|じゅつご}は「きれいだ」です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_compound_002', subject: 'japanese', gradeLevel: 4, unit: 'word',
    difficulty: 'standard', answerType: 'choice',
    question: '「{岩石|がんせき}（{岩|いわ}・{石|いし}）」と {同|おな}じ {組|く}み{立|た}ての {熟語|じゅくご}は どれかな。',
    choices: ['{森林|しんりん}', '{上下|じょうげ}', '{読書|どくしょ}', '{青空|あおぞら}'],
    answer: '{森林|しんりん}',
    hints: ['「{岩|いわ}」と「{石|いし}」は、にた {意味|いみ}の {漢字|かんじ}だね。', 'にた {意味|いみ}の {漢字|かんじ}を 2つ {組|く}み{合|あ}わせた {熟語|じゅくご}を さがそう。'],
    explanation: '「{岩石|がんせき}」と「{森林|しんりん}」は、にた {意味|いみ}の {漢字|かんじ}を {組|く}み{合|あ}わせた {熟語|じゅくご}です。「{上下|じょうげ}」は {反対|はんたい}の {意味|いみ}、「{読書|どくしょ}」は「{書|しょ}を {読|よ}む」、「{青空|あおぞら}」は「{青|あお}い {空|そら}」という {組|く}み{立|た}てです。',
    reviewed: true
  },
  {
    id: 'japanese_g4_conjunction_002', subject: 'japanese', gradeLevel: 4, unit: 'conjunction',
    difficulty: 'standard', answerType: 'choice',
    question: '□に {入|はい}る ことばは どれかな。「{雨|あめ}が {強|つよ}く なった。□、{試合|しあい}は {中止|ちゅうし}に なった。」',
    choices: ['そのため', 'ところが', 'それとも', 'ところで'],
    answer: 'そのため',
    hints: ['{雨|あめ}が {強|つよ}く なった ことが、{中止|ちゅうし}の わけに なって いるね。', '{前|まえ}の ことが {原因|げんいん}で、{後|あと}の ことが おこる ときに {使|つか}う ことばだよ。'],
    explanation: '「{雨|あめ}が {強|つよ}く なった」ことが {原因|げんいん}で「{中止|ちゅうし}に なった」ので、「そのため」で つなぎます。',
    inputForm: { question: '□に 入る ことばを 書こう。「{雨|あめ}が {強|つよ}く なった。□、{試合|しあい}は {中止|ちゅうし}に なった。」', acceptedAnswers: ['だから', 'それで', 'そこで', 'したがって'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g4_proverb_002', subject: 'japanese', gradeLevel: 4, unit: 'proverb',
    difficulty: 'standard', answerType: 'choice',
    question: 'ことわざ「{猫|ねこ}に {小判|こばん}」の {意味|いみ}は どれかな。',
    choices: ['ねうちの わからない {人|ひと}に よい ものを あげても {役|やく}に {立|た}たない', '{猫|ねこ}は お{金|かね}が {大好|だいす}きだ', 'ちいさな ものでも {大切|たいせつ}に しよう', 'よい ことを すれば、よい ことが かえって くる'],
    answer: 'ねうちの わからない {人|ひと}に よい ものを あげても {役|やく}に {立|た}たない',
    hints: ['{小判|こばん}は {昔|むかし}の お{金|かね}だよ。{猫|ねこ}に あげたら どうなるかな。', '「ぶたに {真珠|しんじゅ}」も にた {意味|いみ}の ことわざだよ。'],
    explanation: '{猫|ねこ}に {小判|こばん}を あげても ねうちが わからない ことから、「ねうちの わからない {人|ひと}に よい ものを あげても {役|やく}に {立|た}たない」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_radical_001', subject: 'japanese', gradeLevel: 4, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'choice',
    question: '「{持|も}つ」「{投|な}げる」「{指|ゆび}」に {共通|きょうつう}する {部首|ぶしゅ}は どれかな。',
    choices: ['てへん', 'きへん', 'にんべん', 'ぎょうにんべん'],
    answer: 'てへん',
    hints: ['どれも {手|て}を {使|つか}う ことに かんけいが あるね。', '{左側|ひだりがわ}の {形|かたち}は「{手|て}」から できて いるよ。'],
    explanation: 'どれも {左側|ひだりがわ}に「てへん」が あります。てへんは「{手|て}」の {形|かたち}から できた {部首|ぶしゅ}で、{手|て}の はたらきに かんけいの ある {漢字|かんじ}に つきます。',
    inputForm: { question: '「{持|も}つ」「{投|な}げる」「{指|ゆび}」に {共通|きょうつう}する 部首は 何かな。', acceptedAnswers: ['手偏', '手へん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g4_yoji_001', subject: 'japanese', gradeLevel: 4, unit: 'proverb',
    difficulty: 'advanced', answerType: 'input',
    question: '{四字熟語|よじじゅくご}「{一石二鳥|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'いっせきにちょう', validationMode: 'kana-insensitive',
    hints: ['1つの {石|いし}を なげて、2わの {鳥|とり}を とる という {意味|いみ}だよ。', 'すべて {音読|おんよ}みで {読|よ}むよ。「{一|いち}」と「{石|せき}」を つなげると つまる {音|おと}に なるよ。'],
    explanation: '「{一石二鳥|いっせきにちょう}」は「いっせきにちょう」と {読|よ}みます。1つの ことを して、2つの よい ことが ある という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_kanji_write_004', subject: 'japanese', gradeLevel: 4, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「みんなで きょうりょくして {教室|きょうしつ}を そうじする。」の「きょうりょく」を {漢字|かんじ}で {書|か}こう。',
    answer: '協力', answerDisplay: '{協力|きょうりょく}', validationMode: 'exact',
    hints: ['「きょう」は「{十|じゅう}」の {右|みぎ}に「{力|ちから}」を 3つ ならべた {漢字|かんじ}だよ。', '「りょく」は「{力|ちから}」だよ。'],
    explanation: '「きょうりょく」は「{協力|きょうりょく}」と {書|か}きます。{力|ちから}を {合|あ}わせる という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g4_homonym_001', subject: 'japanese', gradeLevel: 4, unit: 'homonym',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{雨|あめ}なので、{遠足|えんそく}の {予定|よてい}を かえる。」の「かえる」に あてはまる {漢字|かんじ}は どれかな。',
    choices: ['{変|か}える', '{代|か}える', '{帰|かえ}る', '{返|かえ}る'],
    answer: '{変|か}える',
    hints: ['{前|まえ}と ちがう ものに する という {意味|いみ}の「かえる」だよ。', '「{変化|へんか}」の「{変|へん}」と {同|おな}じ {漢字|かんじ}だよ。'],
    explanation: 'ようすや {中身|なかみ}を ちがう ものに する ときは「{変|か}える」です。「{代|か}える」は ほかの ものに その {役目|やくめ}を させる とき（{手紙|てがみ}で あいさつに {代|か}える）、「{帰|かえ}る」は {家|いえ}などに もどる とき、「{返|かえ}る」は もとの {状態|じょうたい}に もどる とき（{我|われ}に {返|かえ}る）に {使|つか}います。',
    inputForm: { question: '「{雨|あめ}なので、{遠足|えんそく}の {予定|よてい}を かえる。」の「かえる」に あてはまる 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g4_grammar_003', subject: 'japanese', gradeLevel: 4, unit: 'grammar',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ものの ようすを あらわす ことばは どれかな。',
    choices: ['{明|あか}るい', '{歩|ある}く', 'つくえ', '{読|よ}む'],
    answer: '{明|あか}るい',
    hints: ['「どんなだ」に あたる ことばを さがそう。', '「{歩|ある}く」「{読|よ}む」は うごきを あらわす ことば、「つくえ」は ものの {名前|なまえ}だね。'],
    explanation: '「{明|あか}るい」は ようすを あらわす ことばです。「{歩|ある}く」「{読|よ}む」は うごきを あらわす ことば、「つくえ」は ものの {名前|なまえ}を あらわす ことばです。',
    reviewed: true
  },

  // ===== Lv5（小学5年） =====
  {
    id: 'japanese_g5_keigo_001', subject: 'japanese', gradeLevel: 5, unit: 'keigo',
    difficulty: 'basic', answerType: 'choice',
    question: '「{先生|せんせい}が いらっしゃる。」の「いらっしゃる」は、どの {種類|しゅるい}の {敬語|けいご}ですか。',
    choices: ['{尊敬語|そんけいご}', '{謙譲語|けんじょうご}', '{丁寧語|ていねいご}', '{敬語|けいご}ではない'],
    answer: '{尊敬語|そんけいご}',
    hints: ['{動作|どうさ}を して いるのは {先生|せんせい}（{目上|めうえ}の {人|ひと}）だね。', '{相手|あいて}の {動作|どうさ}を {高|たか}めて {言|い}う {敬語|けいご}は どれかな。'],
    explanation: '「いらっしゃる」は「{来|く}る・{行|い}く・いる」の {尊敬語|そんけいご}です。{目上|めうえ}の {人|ひと}の {動作|どうさ}を {高|たか}めて {言|い}います。',
    inputForm: { acceptedAnswers: ['そんけいご'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_read_001', subject: 'japanese', gradeLevel: 5, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{学校|がっこう}の {規則|}を {守|まも}る。」の「{規則|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'きそく', validationMode: 'kana-insensitive',
    hints: ['みんなが {守|まも}る {決|き}まりの ことだよ。', '3{文字|もじ}の ことばだよ。'],
    explanation: '「{規則|きそく}」は「きそく」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_read_002', subject: 'japanese', gradeLevel: 5, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{外国|がいこく}と {貿易|}を する。」の「{貿易|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'ぼうえき', validationMode: 'kana-insensitive',
    hints: ['{国|くに}と {国|くに}の あいだで ものを {売|う}り{買|か}い する ことだよ。', '「{易|やさ}しい」の {音読|おんよ}みは「イ」と「エキ」。ここでは「エキ」だよ。'],
    explanation: '「{貿易|ぼうえき}」は「ぼうえき」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_read_003', subject: 'japanese', gradeLevel: 5, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「ストーブの {燃料|}を {運|はこ}ぶ。」の「{燃料|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'ねんりょう', validationMode: 'kana-insensitive',
    hints: ['{燃|も}やして {熱|ねつ}を {出|だ}す もとに なる ものだよ。', '「{燃|も}える」の {音読|おんよ}みは「ネン」だよ。'],
    explanation: '「{燃料|ねんりょう}」は「ねんりょう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g5_keigo_002', subject: 'japanese', gradeLevel: 5, unit: 'keigo',
    difficulty: 'standard', answerType: 'input',
    question: '「{言|い}う」の {謙譲語|けんじょうご}（{自分|じぶん}が へりくだって {言|い}う {言|い}い{方|かた}）を ひらがなで {書|か}こう。',
    answer: 'もうす', acceptedAnswers: ['申す', 'もうしあげる', '申し上げる'], validationMode: 'kana-insensitive',
    hints: ['「わたくしは ○○と {言|い}います」を ていねいに {言|い}うと…。', '「も」から はじまる ことばだよ。'],
    explanation: '「{言|い}う」の {謙譲語|けんじょうご}は「もうす（{申|もう}す）」「もうしあげる（{申|もう}し{上|あ}げる）」です。{尊敬語|そんけいご}は「おっしゃる」です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_homonym_001', subject: 'japanese', gradeLevel: 5, unit: 'homonym',
    difficulty: 'standard', answerType: 'choice',
    question: '「ものさしで プールの {深|ふか}さを はかる。」の「はかる」に あてはまる {漢字|かんじ}は どれかな。',
    choices: ['{測|はか}る', '{計|はか}る', '{量|はか}る', '{図|はか}る'],
    answer: '{測|はか}る',
    hints: ['{長|なが}さ・{高|たか}さ・{深|ふか}さ・{広|ひろ}さを しらべる ときの「はかる」だね。', '「{測定|そくてい}」の「{測|そく}」と {同|おな}じ {漢字|かんじ}だよ。'],
    explanation: '{長|なが}さや {深|ふか}さ、{広|ひろ}さを しらべる ときは「{測|はか}る」です。{時間|じかん}や {数|かず}は「{計|はか}る」、{重|おも}さや かさは「{量|はか}る」、{解決|かいけつ}などを めざして くふうする ときは「{図|はか}る」を {使|つか}います。',
    inputForm: { question: '「ものさしで プールの {深|ふか}さを はかる。」の「はかる」に あてはまる 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g5_vocab_001', subject: 'japanese', gradeLevel: 5, unit: 'vocab',
    difficulty: 'standard', answerType: 'choice',
    question: '{漢語|かんご}（{漢字|かんじ}を {音読|おんよ}みする ことば）は どれかな。',
    choices: ['{出発|しゅっぱつ}', '{出|で}かける', 'スタート', '{旅立|たびだ}ち'],
    answer: '{出発|しゅっぱつ}',
    hints: ['{音読|おんよ}みは、{中国|ちゅうごく}から {伝|つた}わった {読|よ}み{方|かた}だよ。', '「スタート」は {外来語|がいらいご}、「{出|で}かける」「{旅立|たびだ}ち」は {和語|わご}だよ。'],
    explanation: '「{出発|しゅっぱつ}（シュッ・パツ）」は {音読|おんよ}みの ことばなので {漢語|かんご}です。「{出|で}かける」「{旅立|たびだ}ち」は {和語|わご}、「スタート」は {外来語|がいらいご}です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_write_001', subject: 'japanese', gradeLevel: 5, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「キャンプで {貴重|きちょう}な けいけんを した。」の「けいけん」を {漢字|かんじ}で {書|か}こう。',
    answer: '経験', validationMode: 'exact',
    hints: ['「けい」は「いとへん」の {漢字|かんじ}、「けん」は「うまへん」の {漢字|かんじ}だよ。', '「けん」は「{試験|しけん}」の「けん」と {同|おな}じ {漢字|かんじ}だよ。'],
    explanation: '「けいけん」は「{経験|けいけん}」と {書|か}きます。「{険|けわ}しい」の「{険|けん}」や「{検査|けんさ}」の「{検|けん}」と まちがえやすいので {注意|ちゅうい}しましょう。',
    reviewed: true
  },
  {
    id: 'japanese_g5_keigo_003', subject: 'japanese', gradeLevel: 5, unit: 'keigo',
    difficulty: 'advanced', answerType: 'choice',
    question: '{先生|せんせい}の {動作|どうさ}を {正|ただ}しい {敬語|けいご}で {言|い}って いるのは どれかな。',
    choices: ['{先生|せんせい}が わたしの {絵|え}を ご{覧|らん}に なった。', '{先生|せんせい}が わたしの {絵|え}を {拝見|はいけん}した。', '{先生|せんせい}が わたしの {絵|え}を お{見|み}えに した。', '{先生|せんせい}が わたしの {絵|え}を {見|み}させて いただいた。'],
    answer: '{先生|せんせい}が わたしの {絵|え}を ご{覧|らん}に なった。',
    hints: ['{先生|せんせい}の {動作|どうさ}なので、{尊敬語|そんけいご}を {使|つか}うよ。', '「{拝見|はいけん}する」は {自分|じぶん}が {見|み}る ときの {謙譲語|けんじょうご}だよ。'],
    explanation: '「{見|み}る」の {尊敬語|そんけいご}は「ご{覧|らん}に なる」です。「{拝見|はいけん}する」「{見|み}させて いただく」は {自分|じぶん}の {動作|どうさ}に {使|つか}う {謙譲|けんじょう}の {言|い}い{方|かた}です。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g5_keigo_004', subject: 'japanese', gradeLevel: 5, unit: 'keigo',
    difficulty: 'basic', answerType: 'choice',
    question: '{丁寧語|ていねいご}を {使|つか}って いる {文|ぶん}は どれかな。',
    choices: ['これは わたしの {本|ほん}です。', 'これは わたしの {本|ほん}だ。', 'これは わたしの {本|ほん}である。', 'これは わたしの {本|ほん}さ。'],
    answer: 'これは わたしの {本|ほん}です。',
    hints: ['{丁寧語|ていねいご}は、{相手|あいて}に ていねいな {気持|きも}ちを あらわす {言|い}い{方|かた}だよ。', '{文|ぶん}の {終|お}わりが「です」「ます」に なって いるのは どれかな。'],
    explanation: '「です」「ます」を {使|つか}う {言|い}い{方|かた}が {丁寧語|ていねいご}です。「だ」「である」「さ」は {丁寧語|ていねいご}では ありません。',
    reviewed: true
  },
  {
    id: 'japanese_g5_vocab_002', subject: 'japanese', gradeLevel: 5, unit: 'vocab',
    difficulty: 'basic', answerType: 'choice',
    question: '{外来語|がいらいご}（{外国|がいこく}から {入|はい}って きた ことば）は どれかな。',
    choices: ['ノート', '{帳面|ちょうめん}', '{手帳|てちょう}', '{紙|かみ}'],
    answer: 'ノート',
    hints: ['{外来語|がいらいご}は、ふつう かたかなで {書|か}くよ。', '{英語|えいご}から {入|はい}って きた ことばを さがそう。'],
    explanation: '「ノート」は {英語|えいご}から {入|はい}って きた {外来語|がいらいご}です。「{帳面|ちょうめん}」「{手帳|てちょう}」は {漢語|かんご}、「{紙|かみ}」は {和語|わご}です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_read_004', subject: 'japanese', gradeLevel: 5, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{図書館|としょかん}で {調|しら}べ{学習|がくしゅう}の {資料|}を {集|あつ}める。」の「{資料|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'しりょう', validationMode: 'kana-insensitive',
    hints: ['{調|しら}べたり {考|かんが}えたり する ときの もとに なる {本|ほん}や {記録|きろく}の ことだよ。', '「{料|りょう}」は「{材料|ざいりょう}」の「りょう」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{資料|しりょう}」は「しりょう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_read_005', subject: 'japanese', gradeLevel: 5, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「しょうらいの {夢|}は {宇宙|うちゅう}ひこうしだ。」の「{夢|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'ゆめ', validationMode: 'kana-insensitive',
    hints: ['ねて いる ときに {見|み}る ものでも あり、かなえたい ねがいの ことでも あるよ。', 'ひらがな 2{文字|もじ}だよ。'],
    explanation: '「{夢|ゆめ}」は「ゆめ」と {読|よ}みます。{音読|おんよ}みは「ム」です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_read_006', subject: 'japanese', gradeLevel: 5, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{昆虫|こんちゅう}の くらしに {興味|}を もつ。」の「{興味|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'きょうみ', validationMode: 'kana-insensitive',
    hints: ['おもしろいと {感|かん}じて、もっと {知|し}りたく なる {気持|きも}ちだよ。', '「{味|み}」は「{意味|いみ}」の「み」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{興味|きょうみ}」は「きょうみ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_read_007', subject: 'japanese', gradeLevel: 5, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{地震|じしん}などの {災害|}に そなえる。」の「{災害|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'さいがい', validationMode: 'kana-insensitive',
    hints: ['{地震|じしん}・{台風|たいふう}・{大雨|おおあめ}などで {受|う}ける {大|おお}きな ひがいの ことだよ。', '「{害|がい}」は「{公害|こうがい}」の「がい」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{災害|さいがい}」は「さいがい」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_write_002', subject: 'japanese', gradeLevel: 5, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{日本|にほん}の ぎじゅつで {新|あたら}しい {車|くるま}を つくる。」の「ぎじゅつ」を {漢字|かんじ}で {書|か}こう。',
    answer: '技術', validationMode: 'exact',
    hints: ['「ぎ」は「てへん」の {漢字|かんじ}だよ。', '「じゅつ」は「{美術|びじゅつ}」の「じゅつ」と {同|おな}じ {漢字|かんじ}だよ。'],
    explanation: '「ぎじゅつ」は「{技術|ぎじゅつ}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_write_003', subject: 'japanese', gradeLevel: 5, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「あらいたての せいけつな ハンカチ。」の「せいけつ」を {漢字|かんじ}で {書|か}こう。',
    answer: '清潔', validationMode: 'exact',
    hints: ['どちらの {漢字|かんじ}も「さんずい」が つくよ。', '「せい」は「{清|きよ}い」の {漢字|かんじ}だよ。'],
    explanation: '「せいけつ」は「{清潔|せいけつ}」と {書|か}きます。よごれが なく、きれいな ようすです。',
    reviewed: true
  },
  {
    id: 'japanese_g5_keigo_005', subject: 'japanese', gradeLevel: 5, unit: 'keigo',
    difficulty: 'standard', answerType: 'input',
    question: '「{先生|せんせい}から {本|ほん}を もらう。」の「もらう」を {謙譲語|けんじょうご}に すると？ ひらがなで {書|か}こう。',
    answer: 'いただく', acceptedAnswers: ['頂く'], validationMode: 'kana-insensitive',
    hints: ['{自分|じぶん}が {目上|めうえ}の {人|ひと}から {受|う}け{取|と}る ときの ことばだよ。', '{食事|しょくじ}の {前|まえ}の あいさつと {同|おな}じ ことばだよ。'],
    explanation: '「もらう」の {謙譲語|けんじょうご}は「いただく」です。「{先生|せんせい}から {本|ほん}を いただく」と {言|い}います。',
    reviewed: true
  },
  {
    id: 'japanese_g5_idiom_001', subject: 'japanese', gradeLevel: 5, unit: 'idiom',
    difficulty: 'standard', answerType: 'input',
    question: '「なかなか {言|い}うことを {聞|き}かない {弟|おとうと}に □を {焼|や}く。」の □に {入|はい}る {体|からだ}の {部分|ぶぶん}を ひらがなで {書|か}こう。（あつかいに こまる という {意味|いみ}）',
    answer: 'て', acceptedAnswers: ['手'], validationMode: 'kana-insensitive',
    hints: ['ものを つかんだり、{書|か}いたり する ところだよ。', '「□を {貸|か}す」「□が {足|た}りない」にも {使|つか}う ことばだよ。'],
    explanation: '「{手|て}を {焼|や}く」は、うまく あつかえずに こまる という {意味|いみ}の {慣用句|かんようく}です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_homonym_002', subject: 'japanese', gradeLevel: 5, unit: 'homonym',
    difficulty: 'standard', answerType: 'choice',
    question: '「テストの かいとう{用紙|ようし}に {名前|なまえ}を {書|か}く。」の「かいとう」に あてはまる {漢字|かんじ}は どれかな。',
    choices: ['{解答|かいとう}', '{回答|かいとう}', '{会頭|かいとう}', '{快刀|かいとう}'],
    answer: '{解答|かいとう}',
    hints: ['{問題|もんだい}を といて {答|こた}える ときの「かいとう」だよ。', '「{問題|もんだい}を {解|と}く」の「{解|と}」の {漢字|かんじ}を {使|つか}うよ。'],
    explanation: '{問題|もんだい}を といて {答|こた}える ことは「{解答|かいとう}」です。「{回答|かいとう}」は アンケートや {質問|しつもん}への {返事|へんじ}に {使|つか}います。',
    inputForm: { question: '「テストの かいとう{用紙|ようし}に {名前|なまえ}を {書|か}く。」の「かいとう」に あてはまる 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g5_grammar_001', subject: 'japanese', gradeLevel: 5, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「{兄|あに}が {作|つく}った ケーキは とても おいしい。」で、{文|ぶん}{全体|ぜんたい}の {主語|しゅご}は どれかな。',
    choices: ['ケーキは', '{兄|あに}が', '{作|つく}った', 'おいしい'],
    answer: 'ケーキは',
    hints: ['{述語|じゅつご}は「おいしい」。おいしいのは {何|なに}かな。', '「{兄|あに}が {作|つく}った」は、ケーキを くわしく して いる {部分|ぶぶん}だよ。'],
    explanation: '「おいしい」の {主語|しゅご}は「ケーキは」です。「{兄|あに}が {作|つく}った」は「ケーキ」を くわしく する {部分|ぶぶん}で、その {中|なか}の「{兄|あに}が」は「{作|つく}った」の {主語|しゅご}です。',
    inputForm: { question: '「{兄|あに}が {作|つく}った ケーキは とても おいしい。」で、{文|ぶん}{全体|ぜんたい}の 主語を 書き出そう。', acceptedAnswers: ['ケーキ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g5_vocab_003', subject: 'japanese', gradeLevel: 5, unit: 'vocab',
    difficulty: 'standard', answerType: 'choice',
    question: '{和語|わご}（もともと {日本|にほん}に あった ことば）は どれかな。',
    choices: ['{宿屋|やどや}', '{旅館|りょかん}', 'ホテル', '{民宿|みんしゅく}'],
    answer: '{宿屋|やどや}',
    hints: ['{和語|わご}は、{漢字|かんじ}を {訓読|くんよ}みする ことが {多|おお}いよ。', '「ホテル」は {外来語|がいらいご}、「{旅館|りょかん}」「{民宿|みんしゅく}」は {音読|おんよ}みの {漢語|かんご}だよ。'],
    explanation: '「{宿屋|やどや}（やど・や）」は {訓読|くんよ}みの {和語|わご}です。「{旅館|りょかん}」「{民宿|みんしゅく}」は {漢語|かんご}、「ホテル」は {外来語|がいらいご}です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_yoji_001', subject: 'japanese', gradeLevel: 5, unit: 'yoji',
    difficulty: 'standard', answerType: 'choice',
    question: '{四字熟語|よじじゅくご}「{十人十色|じゅうにんといろ}」の {意味|いみ}は どれかな。',
    choices: ['{考|かんが}えや {好|この}みは、{人|ひと}に よって それぞれ ちがう', '{十人|じゅうにん}で {力|ちから}を {合|あ}わせれば、なんでも できる', 'いろいろな {色|いろ}を まぜると きれいに なる', '{人|ひと}の {数|かず}が {多|おお}いほど {時間|じかん}が かかる'],
    answer: '{考|かんが}えや {好|この}みは、{人|ひと}に よって それぞれ ちがう',
    hints: ['{十人|じゅうにん}いれば、{色|いろ}（{性質|せいしつ}）も {十|じゅう}とおり ある という ことだよ。', '「{人|ひと}それぞれ」と にた {意味|いみ}だよ。'],
    explanation: '「{十人十色|じゅうにんといろ}」は、{考|かんが}えや {好|この}み、{性質|せいしつ}は {人|ひと}に よって それぞれ ちがう という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_kanji_write_004', subject: 'japanese', gradeLevel: 5, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「{手|て}を あらって、えいせいに {気|き}を つける。」の「えいせい」を {漢字|かんじ}で {書|か}こう。（{体|からだ}を {病気|びょうき}から まもる という {意味|いみ}）',
    answer: '衛生', validationMode: 'exact',
    hints: ['「えい」は「ぎょうがまえ」の {中|なか}に ほかの {形|かたち}が {入|はい}った {漢字|かんじ}だよ。', '「せい」は「{生|い}きる」の {漢字|かんじ}だよ。'],
    explanation: '「えいせい」は「{衛生|えいせい}」と {書|か}きます。{地球|ちきゅう}の まわりを まわる「{衛星|えいせい}」と まちがえないように しましょう。',
    reviewed: true
  },
  {
    id: 'japanese_g5_keigo_006', subject: 'japanese', gradeLevel: 5, unit: 'keigo',
    difficulty: 'advanced', answerType: 'input',
    question: '「{先生|せんせい}の {作品|さくひん}を {見|み}る。」の「{見|み}る」を {謙譲語|けんじょうご}に すると？「〜する」の {形|かたち}で ひらがなで {書|か}こう。',
    answer: 'はいけんする', acceptedAnswers: ['拝見する'], validationMode: 'kana-insensitive',
    hints: ['{自分|じぶん}が {見|み}る ことを へりくだって {言|い}う ことばだよ。', '「は」から はじまる ことばだよ。'],
    explanation: '「{見|み}る」の {謙譲語|けんじょうご}は「{拝見|はいけん}する」です。{尊敬語|そんけいご}は「ご{覧|らん}に なる」です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_idiom_002', subject: 'japanese', gradeLevel: 5, unit: 'idiom',
    difficulty: 'advanced', answerType: 'choice',
    question: '「かれの ピアノの うでまえには {舌|した}を まいた。」の「{舌|した}を まく」の {意味|いみ}は どれかな。',
    choices: ['とても すぐれて いて、おどろき {感心|かんしん}する', 'くやしくて {何|なに}も {言|い}えない', 'うそを ついて ごまかす', 'おいしくて よろこぶ'],
    answer: 'とても すぐれて いて、おどろき {感心|かんしん}する',
    hints: ['ピアノが とても じょうずだった ときの {気持|きも}ちを {考|かんが}えよう。', 'あまりに すごくて ことばが {出|で}ない ようすだよ。'],
    explanation: '「{舌|した}を まく」は、{相手|あいて}が すぐれて いて、おどろき {感心|かんしん}する という {意味|いみ}の {慣用句|かんようく}です。',
    reviewed: true
  },
  {
    id: 'japanese_g5_compound_001', subject: 'japanese', gradeLevel: 5, unit: 'compound',
    difficulty: 'advanced', answerType: 'choice',
    question: '「□{常識|じょうしき}」の □に {入|はい}る、{打|う}ち{消|け}しの {意味|いみ}の {漢字|かんじ}は どれかな。',
    choices: ['{非|ひ}', '{不|ふ}', '{無|む}', '{未|み}'],
    answer: '{非|ひ}',
    hints: ['「{常識|じょうしき}が ない、{常識|じょうしき}に はずれて いる」という {意味|いみ}の ことばに なるよ。', '「□{公式|こうしき}」「□{売品|ばいひん}」にも {使|つか}う {漢字|かんじ}だよ。'],
    explanation: '「{非常識|ひじょうしき}」が {正|ただ}しい ことばです。「{非|ひ}」は「{非公式|ひこうしき}」「{非売品|ひばいひん}」のように、「〜では ない」という {意味|いみ}を そえます。',
    inputForm: { question: '「□{常識|じょうしき}」の □に {入|はい}る、{打|う}ち{消|け}しの {意味|いみ}の 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },

  // ===== Lv6（小学6年） =====
  {
    id: 'japanese_g6_compound_001', subject: 'japanese', gradeLevel: 6, unit: 'compound',
    difficulty: 'basic', answerType: 'choice',
    question: '「□{関係|かんけい}」の □に {入|はい}る、{打|う}ち{消|け}しの {意味|いみ}の {漢字|かんじ}は どれかな。',
    choices: ['{無|む}', '{不|ふ}', '{非|ひ}', '{未|み}'],
    answer: '{無|む}',
    hints: ['「かんけいが ない」という {意味|いみ}の ことばに なるよ。', '「{不|ふ}」「{非|ひ}」「{未|み}」を つけた ことばは ないね。'],
    explanation: '「{無関係|むかんけい}」が {正|ただ}しい ことばです。{打|う}ち{消|け}しの {漢字|かんじ}は、「{不|ふ}（{不安|ふあん}）」「{非|ひ}（{非常|ひじょう}）」「{未|み}（{未来|みらい}）」など、つく ことばが {決|き}まって います。',
    inputForm: { question: '「□{関係|かんけい}」の □に {入|はい}る、{打|う}ち{消|け}しの {意味|いみ}の 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_read_001', subject: 'japanese', gradeLevel: 6, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{宇宙|}に ロケットを {飛|と}ばす。」の「{宇宙|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'うちゅう', validationMode: 'kana-insensitive',
    hints: ['{地球|ちきゅう}の {外|そと}に {広|ひろ}がる、{星|ほし}が ある {空間|くうかん}だよ。', '「う」から はじまる ことばだよ。'],
    explanation: '「{宇宙|うちゅう}」は「うちゅう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_read_002', subject: 'japanese', gradeLevel: 6, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{倉庫|そうこ}に {穀物|}を たくわえる。」の「{穀物|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'こくもつ', validationMode: 'kana-insensitive',
    hints: ['{米|こめ}・{麦|むぎ}・{豆|まめ}などの ことだよ。', '「{物|もの}」は ここでは「もつ」と {読|よ}むよ。'],
    explanation: '「{穀物|こくもつ}」は「こくもつ」と {読|よ}みます。{米|こめ}や {麦|むぎ}など、{主食|しゅしょく}に なる {作物|さくもつ}の ことです。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_read_003', subject: 'japanese', gradeLevel: 6, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「地図の {縮尺|}を 確かめる。」の「{縮尺|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'しゅくしゃく', validationMode: 'kana-insensitive',
    hints: ['{実際|じっさい}の {長|なが}さを どれだけ {縮|ちぢ}めたかを しめす {割合|わりあい}だよ。', '「{縮|ちぢ}む」の {音読|おんよ}みは「シュク」だよ。'],
    explanation: '「{縮尺|しゅくしゃく}」は「しゅくしゃく」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_yoji_001', subject: 'japanese', gradeLevel: 6, unit: 'yoji',
    difficulty: 'standard', answerType: 'input',
    question: '「{一生|いっしょう}に {一度|いちど}だけの {出会|であ}い」という {意味|いみ}の {四字熟語|よじじゅくご}「いちごいちえ」を {漢字|かんじ}で {書|か}こう。',
    answer: '一期一会', validationMode: 'exact',
    hints: ['「いちご」は「{一生|いっしょう}」という {意味|いみ}。「{期間|きかん}」の「き」の {漢字|かんじ}を {使|つか}うよ。', '「いちえ」の「え」は「{会|あ}う」の {漢字|かんじ}だよ。'],
    explanation: '「いちごいちえ」は「{一期一会|いちごいちえ}」と {書|か}きます。{一生|いっしょう}に {一度|いちど}の {出会|であ}いを {大切|たいせつ}に する という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g6_homonym_001', subject: 'japanese', gradeLevel: 6, unit: 'homonym',
    difficulty: 'standard', answerType: 'choice',
    question: '「{作品|さくひん}を てんじする。」の「てんじ」に あてはまる {漢字|かんじ}は どれかな。',
    choices: ['{展示|てんじ}', '{点字|てんじ}', '{典字|てんじ}', '{転示|てんじ}'],
    answer: '{展示|てんじ}',
    hints: ['{作品|さくひん}を ならべて {見|み}せる という {意味|いみ}だね。', '「{展覧会|てんらんかい}」の「てん」だよ。'],
    explanation: '{作品|さくひん}を ならべて {見|み}せる ことは「{展示|てんじ}」です。「{点字|てんじ}」は {指|ゆび}で さわって {読|よ}む {文字|もじ}の ことです。',
    inputForm: { question: '「{作品|さくひん}を てんじする。」の「てんじ」に あてはまる 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_rhetoric_001', subject: 'japanese', gradeLevel: 6, unit: 'rhetoric',
    difficulty: 'standard', answerType: 'choice',
    question: '「{雪|ゆき}が まるで {綿|わた}の ように {白|しろ}い。」に {使|つか}われて いる {表現|ひょうげん}の {工夫|くふう}は どれかな。',
    choices: ['{比喩|ひゆ}（たとえ）', '{倒置|とうち}', '{反復|はんぷく}', '{擬人法|ぎじんほう}'],
    answer: '{比喩|ひゆ}（たとえ）',
    hints: ['「まるで 〜の ように」に {注目|ちゅうもく}しよう。', '{雪|ゆき}を ほかの ものに たとえて いるね。'],
    explanation: '「まるで {綿|わた}の ように」と、{雪|ゆき}を {綿|わた}に たとえて いるので {比喩|ひゆ}です。',
    inputForm: { question: '「{雪|ゆき}が まるで {綿|わた}の ように {白|しろ}い。」に {使|つか}われて いる 表現の 工夫を 何と いうかな。', answer: '比喩', acceptedAnswers: ['ひゆ', 'たとえ', '比ゆ', '直喩', 'ちょくゆ', '比喩（たとえ）'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_keigo_001', subject: 'japanese', gradeLevel: 6, unit: 'keigo',
    difficulty: 'advanced', answerType: 'input',
    question: '「{食|た}べる」の {尊敬語|そんけいご}を ひらがなで {書|か}こう。（{例|れい}：「{言|い}う」の {尊敬語|そんけいご}は「おっしゃる」）',
    answer: 'めしあがる', acceptedAnswers: ['召し上がる', 'おめしあがりになる', 'お召し上がりになる'], validationMode: 'kana-insensitive',
    hints: ['{目上|めうえ}の {人|ひと}に「どうぞ ○○○○って ください」と すすめる ときの ことば。', '「め」から はじまる ことばだよ。'],
    explanation: '「{食|た}べる」の {尊敬語|そんけいご}は「めしあがる（{召|め}し{上|あ}がる）」です。{謙譲語|けんじょうご}は「いただく」です。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kojiseigo_001', subject: 'japanese', gradeLevel: 6, unit: 'kojiseigo',
    difficulty: 'advanced', answerType: 'choice',
    question: '{故事成語|こじせいご}「{矛盾|むじゅん}」の {意味|いみ}は どれかな。',
    choices: ['{話|はなし}の つじつまが {合|あ}わない こと', 'しなくて よい {心配|しんぱい}を する こと', '{争|あらそ}いに {勝|か}って {利益|りえき}を {得|え}る こと', 'よけいな ものを つけ{加|くわ}える こと'],
    answer: '{話|はなし}の つじつまが {合|あ}わない こと',
    hints: ['「どんな {盾|たて}も つき{通|とお}す {矛|ほこ}」と「どんな {矛|ほこ}も ふせぐ {盾|たて}」を {同|おな}じ {人|ひと}が {売|う}って いた {話|はなし}から できた ことばだよ。', 'その {矛|ほこ}で その {盾|たて}を ついたら どうなるかな。'],
    explanation: '「{矛盾|むじゅん}」は、{中国|ちゅうごく}の {昔話|むかしばなし}から できた ことばで、「つじつまが {合|あ}わない こと」という {意味|いみ}です。「しなくて よい {心配|しんぱい}」は「{杞憂|きゆう}」、「よけいな ものを つけ{加|くわ}える」は「{蛇足|だそく}」です。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g6_okurigana_001', subject: 'japanese', gradeLevel: 6, unit: 'okurigana',
    difficulty: 'basic', answerType: 'choice',
    question: '「{計算|けいさん}を あやまる（まちがえる）。」の「あやまる」を {漢字|かんじ}と {送|おく}りがなで {書|か}いた とき、{正|ただ}しいのは どれかな。',
    choices: ['誤る', '誤まる', '誤やまる', '謝まる'],
    answer: '誤る',
    hints: ['まちがえる という {意味|いみ}の「あやまる」は「ごんべん」に「{呉|ご}」の {漢字|かんじ}だよ。', '「あやま」までが {漢字|かんじ}の {読|よ}みで、{送|おく}りがなは「る」だけだよ。'],
    explanation: 'まちがえる という {意味|いみ}の「あやまる」は「{誤|あやま}る」と {書|か}きます。おわびを する {意味|いみ}の「あやまる」は「{謝|あやま}る」です。',
    inputForm: { question: '「{計算|けいさん}を あやまる（まちがえる）。」の「あやまる」を {漢字|かんじ}と {送|おく}りがなで {書|か}いた とき、どう 書くかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_grammar_001', subject: 'japanese', gradeLevel: 6, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '{文|ぶん}の {終|お}わりを「です」「ます」で そろえた {書|か}き{方|かた}を {何|なん}と いうかな。',
    choices: ['{敬体|けいたい}', '{常体|じょうたい}', '{口語体|こうごたい}', '{文語体|ぶんごたい}'],
    answer: '{敬体|けいたい}',
    hints: ['{相手|あいて}を うやまう、ていねいな {書|か}き{方|かた}だよ。', '「だ」「である」で {終|お}わる {書|か}き{方|かた}は「{常体|じょうたい}」だよ。'],
    explanation: '「です」「ます」で {終|お}わる {書|か}き{方|かた}を「{敬体|けいたい}」、「だ」「である」で {終|お}わる {書|か}き{方|かた}を「{常体|じょうたい}」と いいます。1つの {文章|ぶんしょう}では、どちらかに そろえて {書|か}きます。',
    inputForm: { acceptedAnswers: ['けいたい', 'です・ます体', 'ですます体', 'です・ます調', 'ですます調'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_read_004', subject: 'japanese', gradeLevel: 6, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{富士山|ふじさん}を {背景|}に {写真|しゃしん}を とる。」の「{背景|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'はいけい', validationMode: 'kana-insensitive',
    hints: ['{人|ひと}や ものの うしろに ひろがる けしきの ことだよ。', '「{背|せ}」の {音読|おんよ}みは「ハイ」、「{景|けい}」は「{風景|ふうけい}」の「けい」だよ。'],
    explanation: '「{背景|はいけい}」は「はいけい」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_read_005', subject: 'japanese', gradeLevel: 6, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{祖母|そぼ}に {郵便|}で {手紙|てがみ}を おくる。」の「{郵便|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'ゆうびん', validationMode: 'kana-insensitive',
    hints: ['{手紙|てがみ}や にもつを とどける しくみの ことだよ。', '「{便|びん}」は「{船便|ふなびん}」の「びん」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{郵便|ゆうびん}」は「ゆうびん」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_read_006', subject: 'japanese', gradeLevel: 6, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{雪国|ゆきぐに}で くらした ことは {貴重|}な {体験|たいけん}だった。」の「{貴重|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'きちょう', validationMode: 'kana-insensitive',
    hints: ['めったに なく、とても {大切|たいせつ}な ようすだよ。', '「{重|じゅう}」は ここでは「ちょう」と {読|よ}むよ。'],
    explanation: '「{貴重|きちょう}」は「きちょう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_read_007', subject: 'japanese', gradeLevel: 6, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{学級会|がっきゅうかい}で {給食|きゅうしょく}の {時間|じかん}に ついて {討論|}する。」の「{討論|}」の {読|よ}み{方|かた}を ひらがなで {書|か}こう。',
    answer: 'とうろん', validationMode: 'kana-insensitive',
    hints: ['ちがう {意見|いけん}を {出|だ}し{合|あ}って {話|はな}し{合|あ}う ことだよ。', '「{論|ろん}」は「{結論|けつろん}」の「ろん」と {同|おな}じ {読|よ}み{方|かた}だよ。'],
    explanation: '「{討論|とうろん}」は「とうろん」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_write_001', subject: 'japanese', gradeLevel: 6, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{宇宙|うちゅう}の せんもんかに {話|はなし}を {聞|き}く。」の「せんもんか」を {漢字|かんじ}で {書|か}こう。',
    answer: '専門家', validationMode: 'exact',
    hints: ['「せん」は「{専|もっぱ}ら」の {漢字|かんじ}。{右上|みぎうえ}に「、」を つけないよう {注意|ちゅうい}しよう。', '「もん」は「{門|もん}」、「か」は「{家|いえ}」の {漢字|かんじ}だよ。'],
    explanation: '「せんもんか」は「{専門家|せんもんか}」と {書|か}きます。「{専|せん}」には {点|てん}が ありません（「{博|はく}」とは ちがいます）。',
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_write_002', subject: 'japanese', gradeLevel: 6, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{友|とも}だちの たんじょうびを いわう。」の「たんじょうび」を {漢字|かんじ}で {書|か}こう。',
    answer: '誕生日', answerDisplay: '{誕生日|たんじょうび}', validationMode: 'exact',
    hints: ['「たん」は「ごんべん」の {漢字|かんじ}だよ。', '「じょう」は「{生|う}まれる」の {漢字|かんじ}、「び」は「{日|ひ}」だよ。'],
    explanation: '「たんじょうび」は「{誕生日|たんじょうび}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_yoji_002', subject: 'japanese', gradeLevel: 6, unit: 'yoji',
    difficulty: 'standard', answerType: 'input',
    question: '「{自分|じぶん}で {自分|じぶん}の ことを ほめる こと」を あらわす {四字熟語|よじじゅくご}「じがじさん」を {漢字|かんじ}で {書|か}こう。',
    answer: '自画自賛', validationMode: 'exact',
    hints: ['{自分|じぶん}で かいた {絵|え}（{画|が}）に、{自分|じぶん}で ほめる ことば（{賛|さん}）を {書|か}く ことから できた ことばだよ。', '「じ」は 2つとも「{自分|じぶん}」の「{自|じ}」だよ。'],
    explanation: '「じがじさん」は「{自画自賛|じがじさん}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g6_keigo_002', subject: 'japanese', gradeLevel: 6, unit: 'keigo',
    difficulty: 'standard', answerType: 'input',
    question: '「{校長先生|こうちょうせんせい}が あいさつを する。」の「する」を {尊敬語|そんけいご}に すると？ ひらがなで {書|か}こう。',
    answer: 'なさる', acceptedAnswers: ['される'], validationMode: 'kana-insensitive',
    hints: ['{目上|めうえ}の {人|ひと}の {動作|どうさ}を {高|たか}める ことばだよ。', '「な」から はじまる 3{文字|もじ}の ことばだよ。'],
    explanation: '「する」の {尊敬語|そんけいご}は「なさる」です（「される」も {使|つか}えます）。{謙譲語|けんじょうご}は「いたす」です。',
    reviewed: true
  },
  {
    id: 'japanese_g6_grammar_002', subject: 'japanese', gradeLevel: 6, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '□に {入|はい}る ことばは どれかな。「{決|けっ}して うそを □。」',
    choices: ['つかない', 'つく', 'つこう', 'ついた'],
    answer: 'つかない',
    hints: ['「{決|けっ}して」の あとには、{決|き}まった {言|い}い{方|かた}が くるよ。', '「{決|けっ}して 〜ない」の {形|かたち}で {使|つか}うよ。'],
    explanation: '「{決|けっ}して」は、あとに「〜ない」などの {打|う}ち{消|け}しの ことばが くる ことばです。「{決|けっ}して うそを つかない」と なります。',
    inputForm: { question: '□に 入る ことばを 書こう。「{決|けっ}して うそを □。」', acceptedAnswers: ['つきません'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_kojiseigo_002', subject: 'japanese', gradeLevel: 6, unit: 'kojiseigo',
    difficulty: 'standard', answerType: 'choice',
    question: '{故事成語|こじせいご}「{蛇足|だそく}」の {意味|いみ}は どれかな。',
    choices: ['よけいな つけたし', 'しなくて よい {心配|しんぱい}', 'つじつまが {合|あ}わない こと', 'だいたい {同|おな}じで、ちがいが {少|すく}ない こと'],
    answer: 'よけいな つけたし',
    hints: ['{蛇|へび}の {絵|え}を かく きょうそうで、{足|あし}まで かいた {人|ひと}の {話|はなし}から できた ことばだよ。', '{蛇|へび}に {足|あし}は いらないね。'],
    explanation: '{蛇|へび}の {絵|え}を {早|はや}く かきおえた {人|ひと}が、よけいな {足|あし}まで かいて {負|ま}けた という {中国|ちゅうごく}の {話|はなし}から、「よけいな つけたし」という {意味|いみ}に なりました。「しなくて よい {心配|しんぱい}」は「{杞憂|きゆう}」、「つじつまが {合|あ}わない」は「{矛盾|むじゅん}」、「ちがいが {少|すく}ない」は「{五十歩百歩|ごじっぽひゃっぽ}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g6_vocab_001', subject: 'japanese', gradeLevel: 6, unit: 'vocab',
    difficulty: 'standard', answerType: 'choice',
    question: '「{準備|じゅんび}」と にた {意味|いみ}の ことば（{類義語|るいぎご}）は どれかな。',
    choices: ['{用意|ようい}', '{整理|せいり}', '{計画|けいかく}', '{完成|かんせい}'],
    answer: '{用意|ようい}',
    hints: ['「{遠足|えんそく}の {準備|じゅんび}を する」の「{準備|じゅんび}」と {入|い}れかえても {意味|いみ}が かわらない ことばを さがそう。', 'ものごとの {前|まえ}に ととのえて おく ことだよ。'],
    explanation: '「{準備|じゅんび}」と「{用意|ようい}」は、ものごとの {前|まえ}に {必要|ひつよう}な ものを ととのえて おく という にた {意味|いみ}の ことばです。',
    inputForm: { question: '「{準備|じゅんび}」と にた {意味|いみ}の ことば（類義語）は 何かな。', acceptedAnswers: ['ようい', '支度', 'したく'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_rhetoric_002', subject: 'japanese', gradeLevel: 6, unit: 'rhetoric',
    difficulty: 'standard', answerType: 'choice',
    question: '「{春|はる}の {風|かぜ}が そっと ささやいた。」に {使|つか}われて いる {表現|ひょうげん}の {工夫|くふう}は どれかな。',
    choices: ['{擬人法|ぎじんほう}', '{倒置|とうち}', '{反復|はんぷく}', '{体言止|たいげんど}め'],
    answer: '{擬人法|ぎじんほう}',
    hints: ['「ささやく」のは、ふつう だれが する ことかな。', '{人|ひと}では ない ものを、{人|ひと}のように あらわして いるね。'],
    explanation: '「ささやく」は {人|ひと}が する ことです。{風|かぜ}を {人|ひと}のように あらわして いるので {擬人法|ぎじんほう}です。',
    inputForm: { question: '「{春|はる}の {風|かぜ}が そっと ささやいた。」に {使|つか}われて いる 表現の 工夫を 何と いうかな。', acceptedAnswers: ['ぎじんほう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_kanji_write_003', subject: 'japanese', gradeLevel: 6, unit: 'kanji_write',
    difficulty: 'advanced', answerType: 'input',
    question: '「{台風|たいふう}が {日本列島|にほんれっとう}を じゅうだんする。」の「じゅうだん」を {漢字|かんじ}で {書|か}こう。（{南|みなみ}から {北|きた}へ たてに {通|とお}りぬける という {意味|いみ}）',
    answer: '縦断', validationMode: 'exact',
    hints: ['「じゅう」は「たて」と {訓読|くんよ}みする「いとへん」の {漢字|かんじ}だよ。', '「だん」は「{横断歩道|おうだんほどう}」の「だん」と {同|おな}じ {漢字|かんじ}だよ。'],
    explanation: '「じゅうだん」は「{縦断|じゅうだん}」と {書|か}きます。{反対|はんたい}に、よこぎる ことは「{横断|おうだん}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g6_vocab_002', subject: 'japanese', gradeLevel: 6, unit: 'vocab',
    difficulty: 'advanced', answerType: 'input',
    question: '「{賛成|さんせい}」の {対義語|たいぎご}（{意味|いみ}が {逆|ぎゃく}に なる ことば）を {漢字|かんじ}2{字|じ}で {書|か}こう。',
    answer: '反対', acceptedAnswers: ['はんたい'], validationMode: 'exact',
    hints: ['ある {意見|いけん}に「そうは {思|おも}わない」と する ことだよ。', '「はん」で はじまる ことばだよ。'],
    explanation: '「{賛成|さんせい}」の {対義語|たいぎご}は「{反対|はんたい}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g6_homonym_002', subject: 'japanese', gradeLevel: 6, unit: 'homonym',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{毎日|まいにち} {練習|れんしゅう}した こうかが {出|で}て きた。」の「こうか」に あてはまる {漢字|かんじ}は どれかな。',
    choices: ['{効果|こうか}', '{校歌|こうか}', '{高価|こうか}', '{降下|こうか}'],
    answer: '{効果|こうか}',
    hints: ['ある ことを した ために あらわれた、よい {結果|けっか}の ことだよ。', '「{効|き}く」の {漢字|かんじ}を {使|つか}うよ。'],
    explanation: 'ある ことを した ために あらわれた {結果|けっか}は「{効果|こうか}」です。「{校歌|こうか}」は {学校|がっこう}の {歌|うた}、「{高価|こうか}」は ねだんが {高|たか}い こと、「{降下|こうか}」は {高|たか}い ところから おりる こと（パラシュートで {降下|こうか}する）です。',
    inputForm: { question: '「{毎日|まいにち} {練習|れんしゅう}した こうかが {出|で}て きた。」の「こうか」に あてはまる 漢字を 書こう。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g6_rhetoric_003', subject: 'japanese', gradeLevel: 6, unit: 'rhetoric',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{美|うつく}しいなあ、この {夕焼|ゆうや}けは。」に {使|つか}われて いる {表現|ひょうげん}の {工夫|くふう}は どれかな。',
    choices: ['{倒置|とうち}', '{体言止|たいげんど}め', '{比喩|ひゆ}', '{擬人法|ぎじんほう}'],
    answer: '{倒置|とうち}',
    hints: ['ふつうの {順番|じゅんばん}に なおすと、どんな {文|ぶん}に なるかな。', '「この {夕焼|ゆうや}けは {美|うつく}しいなあ。」が もとの {順番|じゅんばん}だね。'],
    explanation: 'ふつうは「この {夕焼|ゆうや}けは {美|うつく}しいなあ。」ですが、{順番|じゅんばん}を {入|い}れかえて「{美|うつく}しいなあ」を {強|つよ}めて います。これを {倒置|とうち}と いいます。',
    inputForm: { question: '「{美|うつく}しいなあ、この {夕焼|ゆうや}けは。」に {使|つか}われて いる 表現の 工夫を 何と いうかな。', acceptedAnswers: ['とうち', '倒置法', 'とうちほう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv7（中学1年） =====
  {
    id: 'japanese_g7_grammar_001', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '「{静|しず}かな {海|うみ}」の「{静|しず}かな」の {品詞|ひんし}は どれか。',
    choices: ['{形容動詞|けいようどうし}', '{形容詞|けいようし}', '{動詞|どうし}', '{副詞|ふくし}'],
    answer: '{形容動詞|けいようどうし}',
    hints: ['{言|い}い{切|き}りの {形|かたち}（{終止形|しゅうしけい}）に すると どう なるかな。', '{言|い}い{切|き}りが「い」なら {形容詞|けいようし}、「だ」なら {形容動詞|けいようどうし}。'],
    explanation: '「{静|しず}かな」は {言|い}い{切|き}りの {形|かたち}が「{静|しず}かだ」と なるので {形容動詞|けいようどうし}です。',
    inputForm: { question: '「{静|しず}かな {海|うみ}」の「{静|しず}かな」の 品詞は 何か。', acceptedAnswers: ['けいようどうし'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g7_kanji_read_001', subject: 'japanese', gradeLevel: 7, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{素朴|}な {味|あじ}わいの {料理|りょうり}。」の「{素朴|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'そぼく', validationMode: 'kana-insensitive',
    hints: ['かざりけが なく、ありのままで ある ようすを {表|あらわ}す ことば。', '「{素|そ}」は「{素材|そざい}」の「そ」と {同|おな}じ {読|よ}み。'],
    explanation: '「{素朴|そぼく}」は「そぼく」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g7_kanji_read_002', subject: 'japanese', gradeLevel: 7, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{繊細|}な {細工|さいく}を ほどこす。」の「{繊細|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'せんさい', validationMode: 'kana-insensitive',
    hints: ['{細|こま}かく、{美|うつく}しい ようすを {表|あらわ}す ことば。', '「{細|ほそ}い」の {音読|おんよ}みは「サイ」。'],
    explanation: '「{繊細|せんさい}」は「せんさい」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g7_classic_001', subject: 'japanese', gradeLevel: 7, unit: 'classic',
    difficulty: 'standard', answerType: 'input',
    question: '{歴史的仮名遣|れきしてきかなづか}いの「いふ」を {現代仮名遣|げんだいかなづか}いに {直|なお}して、ひらがなで {書|か}きなさい。',
    answer: 'いう', validationMode: 'kana-insensitive',
    hints: ['{語|ご}の {頭|あたま}以外の「は・ひ・ふ・へ・ほ」は、{現代仮名遣|げんだいかなづか}いでは どう なるか。', '「ふ」は「う」に {直|なお}す。'],
    explanation: '{語|ご}の {頭|あたま}以外の「ふ」は「う」に {直|なお}すので、「いふ」は「いう」と なります。',
    reviewed: true
  },
  {
    id: 'japanese_g7_grammar_002', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'standard', answerType: 'input',
    question: '「{空|そら}に {白|しろ}い {雲|くも}が {浮|う}かぶ。」は、いくつの {文節|ぶんせつ}に {分|わ}けられるか。{数字|すうじ}で {答|こた}えなさい。',
    answer: '4', validationMode: 'number',
    hints: ['{意味|いみ}が わかる {範囲|はんい}で、できるだけ {短|みじか}く {区切|くぎ}ったものが {文節|ぶんせつ}。', '「ネ」や「サ」を {入|い}れて {区切|くぎ}って みよう（{空|そら}にネ／…）。'],
    explanation: '「{空|そら}に／{白|しろ}い／{雲|くも}が／{浮|う}かぶ。」と {区切|くぎ}れるので、4{文節|ぶんせつ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_classic_002', subject: 'japanese', gradeLevel: 7, unit: 'classic',
    difficulty: 'standard', answerType: 'choice',
    question: '『{竹取物語|たけとりものがたり}』の {冒頭|ぼうとう}「{今|いま}は{昔|むかし}、{竹取|たけとり}の{翁|おきな}と いふ もの ありけり。」の「{翁|おきな}」の {意味|いみ}は どれか。',
    choices: ['おじいさん', 'おばあさん', '{子|こ}ども', '{若者|わかもの}'],
    answer: 'おじいさん',
    hints: ['{竹|たけ}の {中|なか}から かぐや{姫|ひめ}を {見|み}つけた {人物|じんぶつ}。', '「{翁|おきな}」に {対|たい}して、おばあさんは「{嫗|おうな}」という。'],
    explanation: '「{翁|おきな}」は {年老|としお}いた {男性|だんせい}、つまり「おじいさん」の ことです。',
    inputForm: { question: '『{竹取物語|たけとりものがたり}』の {冒頭|ぼうとう}「{今|いま}は{昔|むかし}、{竹取|たけとり}の{翁|おきな}と いふ もの ありけり。」の「{翁|おきな}」の 意味は 何か。', acceptedAnswers: ['老人', 'ろうじん', 'じいさん', 'おきな'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g7_grammar_003', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「{弟|おとうと}が {本|ほん}を {読|よ}む。」の {中|なか}で、{付属語|ふぞくご}は どれか。',
    choices: ['が', '{弟|おとうと}', '{本|ほん}', '{読|よ}む'],
    answer: 'が',
    hints: ['{付属語|ふぞくご}は、それだけでは {意味|いみ}が わからず、{自立語|じりつご}の {後|あと}に つく {語|ご}。', '{助詞|じょし}や {助動詞|じょどうし}が {付属語|ふぞくご}。'],
    explanation: '「が」は {助詞|じょし}で、{付属語|ふぞくご}です。「{弟|おとうと}」「{本|ほん}」（{名詞|めいし}）、「{読|よ}む」（{動詞|どうし}）は {自立語|じりつご}です。（「を」も {付属語|ふぞくご}です）',
    inputForm: { question: '「{弟|おとうと}が {本|ほん}を {読|よ}む。」の {中|なか}で、付属語は 何か。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g7_vocab_001', subject: 'japanese', gradeLevel: 7, unit: 'vocab',
    difficulty: 'advanced', answerType: 'input',
    question: '「{義務|ぎむ}」の {対義語|たいぎご}（{反対|はんたい}の {意味|いみ}の {語|ご}）を、{漢字|かんじ}2{字|じ}で {書|か}きなさい。',
    answer: '権利', validationMode: 'exact',
    hints: ['「しなければ ならない こと」の {反対|はんたい}は「してもよい こと・{求|もと}めてよい こと」。', '「{選挙|せんきょ}○○」「○○を {主張|しゅちょう}する」の ○○。'],
    explanation: '「{義務|ぎむ}」の {対義語|たいぎご}は「{権利|けんり}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_haiku_001', subject: 'japanese', gradeLevel: 7, unit: 'haiku',
    difficulty: 'advanced', answerType: 'choice',
    question: '{俳句|はいく}「{雪|ゆき}とけて {村|むら}いっぱいの {子|こ}どもかな」（{小林一茶|こばやしいっさ}）の {季節|きせつ}は どれか。',
    choices: ['{春|はる}', '{夏|なつ}', '{秋|あき}', '{冬|ふゆ}'],
    answer: '{春|はる}',
    hints: ['「{雪|ゆき}」が ある からといって {冬|ふゆ}とは かぎらない。', '{雪|ゆき}が「とけて」いる。{子|こ}どもたちが {外|そと}に あふれ{出|で}て くるのは いつか。'],
    explanation: '{季語|きご}は「{雪|ゆき}とけて（{雪解|ゆきど}け）」で、{季節|きせつ}は {春|はる}です。{冬|ふゆ}が {終|お}わり、{子|こ}どもたちが {外|そと}で {遊|あそ}ぶ ようすを よんで います。',
    inputForm: { question: '{俳句|はいく}「{雪|ゆき}とけて {村|むら}いっぱいの {子|こ}どもかな」（{小林一茶|こばやしいっさ}）の 季節は 何か。', acceptedAnswers: ['はる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g7_grammar_004', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '「{雲|くも}が ゆっくり {流|なが}れる。」の「ゆっくり」の {品詞|ひんし}は どれか。',
    choices: ['{副詞|ふくし}', '{形容詞|けいようし}', '{連体詞|れんたいし}', '{名詞|めいし}'],
    answer: '{副詞|ふくし}',
    hints: ['「ゆっくり」は {活用|かつよう}しない（{形|かたち}が かわらない）{語|ご}。', '{主|おも}に {用言|ようげん}（ここでは「{流|なが}れる」）を くわしく する {品詞|ひんし}。'],
    explanation: '「ゆっくり」は {活用|かつよう}せず、{用言|ようげん}「{流|なが}れる」を {修飾|しゅうしょく}して いるので {副詞|ふくし}です。',
    inputForm: { question: '「{雲|くも}が ゆっくり {流|なが}れる。」の「ゆっくり」の 品詞は 何か。', acceptedAnswers: ['ふくし'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g7_compound_001', subject: 'japanese', gradeLevel: 7, unit: 'compound',
    difficulty: 'basic', answerType: 'choice',
    question: '「{登山|とざん}（{山|やま}に {登|のぼ}る）」と {同|おな}じ {構成|こうせい}の {熟語|じゅくご}は どれか。',
    choices: ['{読書|どくしょ}', '{海水|かいすい}', '{左右|さゆう}', '{温暖|おんだん}'],
    answer: '{読書|どくしょ}',
    hints: ['「{登山|とざん}」は、{下|した}の {字|じ}が {上|うえ}の {字|じ}の {目的|もくてき}（「〜に」「〜を」）に なって いる。', '{下|した}から {上|うえ}へ {返|かえ}って {読|よ}むと {意味|いみ}が わかる {熟語|じゅくご}を さがそう。'],
    explanation: '「{登山|とざん}（{山|やま}に {登|のぼ}る）」と「{読書|どくしょ}（{書|しょ}を {読|よ}む）」は、{下|した}の {字|じ}が {上|うえ}の {字|じ}の {目的|もくてき}・{対象|たいしょう}を {表|あらわ}す {構成|こうせい}です。「{海水|かいすい}」は {上|うえ}が {下|した}を {修飾|しゅうしょく}、「{左右|さゆう}」は {反対|はんたい}の {意味|いみ}、「{温暖|おんだん}」は にた {意味|いみ}の {組|く}み{合|あ}わせです。',
    reviewed: true
  },
  {
    id: 'japanese_g7_kanji_read_003', subject: 'japanese', gradeLevel: 7, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{駅|えき}から {学校|がっこう}までの {距離|}を {測|はか}る。」の「{距離|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'きょり', validationMode: 'kana-insensitive',
    hints: ['2つの {地点|ちてん}の あいだの {長|なが}さの こと。', '「{離|はな}れる」の {音読|おんよ}みは「リ」。'],
    explanation: '「{距離|きょり}」は「きょり」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g7_kanji_read_004', subject: 'japanese', gradeLevel: 7, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{主人公|しゅじんこう}の {心情|しんじょう}の {描写|}に {注目|ちゅうもく}する。」の「{描写|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'びょうしゃ', validationMode: 'kana-insensitive',
    hints: ['ようすや {気持|きも}ちを、{文章|ぶんしょう}や {絵|え}で えがき{表|あらわ}す こと。', '「{写|うつ}す」の {音読|おんよ}みは「シャ」。'],
    explanation: '「{描写|びょうしゃ}」は「びょうしゃ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g7_kanji_read_005', subject: 'japanese', gradeLevel: 7, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{大切|たいせつ}な ことなので {慎重|}に {判断|はんだん}する。」の「{慎重|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'しんちょう', validationMode: 'kana-insensitive',
    hints: ['よく {考|かんが}えて、{注意|ちゅうい}ぶかく ものごとを する ようす。', '「{重|じゅう}」は ここでは「チョウ」と {読|よ}む。'],
    explanation: '「{慎重|しんちょう}」は「しんちょう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g7_kanji_read_006', subject: 'japanese', gradeLevel: 7, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「クラス{全員|ぜんいん}の {意見|いけん}を {把握|}する。」の「{把握|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'はあく', validationMode: 'kana-insensitive',
    hints: ['しっかりと {理解|りかい}して、つかむ こと。', 'どちらの {字|じ}も「てへん」。「{握|にぎ}る」の {音読|おんよ}みは「アク」。'],
    explanation: '「{把握|はあく}」は「はあく」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g7_kanji_write_001', subject: 'japanese', gradeLevel: 7, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「この {問題|もんだい}は たんじゅんな {計算|けいさん}で {解|と}ける。」の「たんじゅん」を {漢字|かんじ}で {書|か}きなさい。',
    answer: '単純', validationMode: 'exact',
    hints: ['「たん」は「{単語|たんご}」の「たん」。', '「じゅん」は「いとへん」の {漢字|かんじ}。'],
    explanation: '「たんじゅん」は「{単純|たんじゅん}」と {書|か}きます。{対義語|たいぎご}は「{複雑|ふくざつ}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_classic_003', subject: 'japanese', gradeLevel: 7, unit: 'classic',
    difficulty: 'standard', answerType: 'input',
    question: '{歴史的仮名遣|れきしてきかなづか}いの「をかし」を {現代仮名遣|げんだいかなづか}いに {直|なお}して、ひらがなで {書|か}きなさい。',
    answer: 'おかし', validationMode: 'kana-insensitive',
    hints: ['「を」は、{助詞|じょし}の「を」で なければ、{現代仮名遣|げんだいかなづか}いでは「お」と {書|か}く。', '「かし」は そのまま。'],
    explanation: '「を」を「お」に {直|なお}して「おかし」と なります。「をかし」は「{趣|おもむき}が ある」という {意味|いみ}の {古語|こご}です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_grammar_005', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'standard', answerType: 'input',
    question: '「{鳥|とり}が {空|そら}を {飛|と}ぶ。」は、いくつの {単語|たんご}に {分|わ}けられるか。{数字|すうじ}で {答|こた}えなさい。',
    answer: '5', validationMode: 'number',
    hints: ['まず {文節|ぶんせつ}に {分|わ}け（{鳥|とり}が／{空|そら}を／{飛|と}ぶ）、さらに {細|こま}かく {分|わ}けよう。', '「が」「を」のような {助詞|じょし}も 1つの {単語|たんご}。'],
    explanation: '「{鳥|とり}／が／{空|そら}／を／{飛|と}ぶ」と {分|わ}けられるので、5{単語|たんご}です。{助詞|じょし}の「が」「を」も {単語|たんご}として {数|かぞ}えます。',
    reviewed: true
  },
  {
    id: 'japanese_g7_vocab_002', subject: 'japanese', gradeLevel: 7, unit: 'vocab',
    difficulty: 'standard', answerType: 'input',
    question: '「{主観|しゅかん}」の {対義語|たいぎご}を、{漢字|かんじ}2{字|じ}で {書|か}きなさい。',
    answer: '客観', acceptedAnswers: ['きゃっかん'], validationMode: 'exact',
    hints: ['{自分|じぶん}だけの {見方|みかた}では なく、だれが {見|み}ても そう {思|おも}える {見方|みかた}。', '「□□{的|てき}な {意見|いけん}」のように {使|つか}う。{上|うえ}の {字|じ}は「{客|きゃく}」。'],
    explanation: '「{主観|しゅかん}」の {対義語|たいぎご}は「{客観|きゃっかん}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_grammar_006', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「{妹|いもうと}と {弟|おとうと}が {公園|こうえん}で {遊|あそ}ぶ。」の「{妹|いもうと}と」と「{弟|おとうと}が」の {文節|ぶんせつ}どうしの {関係|かんけい}は どれか。',
    choices: ['{並立|へいりつ}の {関係|かんけい}', '{主|しゅ}・{述|じゅつ}の {関係|かんけい}', '{修飾|しゅうしょく}・{被修飾|ひしゅうしょく}の {関係|かんけい}', '{補助|ほじょ}の {関係|かんけい}'],
    answer: '{並立|へいりつ}の {関係|かんけい}',
    hints: ['「{妹|いもうと}と」と「{弟|おとうと}が」は、{入|い}れかえても {意味|いみ}が かわらない。', '2つの {文節|ぶんせつ}が {対等|たいとう}に ならんで いる {関係|かんけい}。'],
    explanation: '「{妹|いもうと}と」「{弟|おとうと}が」は {対等|たいとう}に ならび、{入|い}れかえても {意味|いみ}が かわらないので {並立|へいりつ}の {関係|かんけい}です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_classic_004', subject: 'japanese', gradeLevel: 7, unit: 'classic',
    difficulty: 'standard', answerType: 'choice',
    question: '{古文|こぶん}の「いと をかし」の {意味|いみ}として {最|もっと}も {適切|てきせつ}な ものは どれか。',
    choices: ['とても {趣|おもむき}が ある', 'とても {笑|わら}える', 'とても {恐|おそ}ろしい', 'とても {悲|かな}しい'],
    answer: 'とても {趣|おもむき}が ある',
    hints: ['{古語|こご}の「いと」は「とても・たいへん」という {意味|いみ}。', '{古語|こご}の「をかし」は、{現代語|げんだいご}の「おかしい（{笑|わら}える）」とは ちがう {意味|いみ}で {使|つか}われる ことが {多|おお}い。'],
    explanation: '「いと」は「とても」、「をかし」は「{趣|おもむき}が ある・すばらしい」という {意味|いみ}です。『{枕草子|まくらのそうし}』に よく {出|で}て くる ことばです。',
    reviewed: true
  },
  {
    id: 'japanese_g7_haiku_002', subject: 'japanese', gradeLevel: 7, unit: 'haiku',
    difficulty: 'standard', answerType: 'choice',
    question: '{俳句|はいく}の {音|おん}の {数|かず}（{定型|ていけい}）として {正|ただ}しい ものは どれか。',
    choices: ['{五|ご}・{七|しち}・{五|ご}', '{五|ご}・{七|しち}・{五|ご}・{七|しち}・{七|しち}', '{七|しち}・{五|ご}・{七|しち}', '{五|ご}・{五|ご}・{七|しち}'],
    answer: '{五|ご}・{七|しち}・{五|ご}',
    hints: ['{俳句|はいく}は {世界|せかい}で {最|もっと}も {短|みじか}い {詩|し}と いわれる。', '{五|ご}・{七|しち}・{五|ご}・{七|しち}・{七|しち}は {短歌|たんか}の {定型|ていけい}。'],
    explanation: '{俳句|はいく}の {定型|ていけい}は {五|ご}・{七|しち}・{五|ご}の 17{音|おん}です。{短歌|たんか}は {五|ご}・{七|しち}・{五|ご}・{七|しち}・{七|しち}の 31{音|おん}です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_homonym_001', subject: 'japanese', gradeLevel: 7, unit: 'homonym',
    difficulty: 'standard', answerType: 'choice',
    question: '「{小学生|しょうがくせい}を たいしょうに した {本|ほん}。」の「たいしょう」に あてはまる {漢字|かんじ}は どれか。',
    choices: ['{対象|たいしょう}', '{対照|たいしょう}', '{対称|たいしょう}', '{大将|たいしょう}'],
    answer: '{対象|たいしょう}',
    hints: ['はたらきかける {相手|あいて}・{目標|もくひょう}と なる もの。', '「{対照|たいしょう}」は くらべる こと、「{対称|たいしょう}」は つりあって いる こと。'],
    explanation: 'はたらきかける {相手|あいて}や {目標|もくひょう}は「{対象|たいしょう}」です。「{対照|たいしょう}」は くらべ{合|あ}わせる こと（{対照的|たいしょうてき}）、「{対称|たいしょう}」は {左右|さゆう}などが つりあって いる こと（{左右対称|さゆうたいしょう}）です。',
    inputForm: { question: '「{小学生|しょうがくせい}を たいしょうに した {本|ほん}。」の「たいしょう」に あてはまる 漢字を 書け。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g7_grammar_007', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'advanced', answerType: 'input',
    question: '「{美|うつく}しい {景色|けしき}を {見|み}る。」の「{美|うつく}しい」の {品詞名|ひんしめい}を、{漢字|かんじ}で {書|か}きなさい。',
    answer: '形容詞', answerDisplay: '{形容詞|けいようし}', acceptedAnswers: ['けいようし'], validationMode: 'exact',
    hints: ['{活用|かつよう}する {自立語|じりつご}で、ものごとの {性質|せいしつ}や {状態|じょうたい}を {表|あらわ}す。', '{言|い}い{切|き}りの {形|かたち}が「い」で {終|お}わる。'],
    explanation: '「{美|うつく}しい」は {言|い}い{切|き}りの {形|かたち}が「い」で {終|お}わり、{状態|じょうたい}を {表|あらわ}すので {形容詞|けいようし}です。',
    reviewed: true
  },
  {
    id: 'japanese_g7_classic_005', subject: 'japanese', gradeLevel: 7, unit: 'classic',
    difficulty: 'advanced', answerType: 'input',
    question: '{歴史的仮名遣|れきしてきかなづか}いの「ゐなか」を {現代仮名遣|げんだいかなづか}いに {直|なお}して、ひらがなで {書|か}きなさい。',
    answer: 'いなか', acceptedAnswers: ['田舎'], validationMode: 'kana-insensitive',
    hints: ['「ゐ」は、{今|いま}は {使|つか}わない ひらがな。', '「ゐ」は「い」、「ゑ」は「え」に {直|なお}す。'],
    explanation: '「ゐ」を「い」に {直|なお}して「いなか（{田舎|いなか}）」と なります。',
    reviewed: true
  },
  {
    id: 'japanese_g7_literature_001', subject: 'japanese', gradeLevel: 7, unit: 'literature',
    difficulty: 'advanced', answerType: 'choice',
    question: 'チョウの {収集|しゅうしゅう}を めぐる {少年|しょうねん}の {苦|にが}い {思|おも}い{出|で}を えがいた {小説|しょうせつ}『{少年|しょうねん}の{日|ひ}の{思|おも}い{出|で}』の {作者|さくしゃ}は だれか。',
    choices: ['ヘルマン・ヘッセ', 'ゲーテ', 'トルストイ', 'アンデルセン'],
    answer: 'ヘルマン・ヘッセ',
    hints: ['ドイツ{生|う}まれの {作家|さっか}。', '『{車輪|しゃりん}の{下|した}』も この {作家|さっか}の {作品|さくひん}。'],
    explanation: '『{少年|しょうねん}の{日|ひ}の{思|おも}い{出|で}』は、ドイツ{生|う}まれの {作家|さっか} ヘルマン・ヘッセの {作品|さくひん}です。{主人公|しゅじんこう}が {友|とも}だちの {大切|たいせつ}な チョウを こわして しまい、つぐなおうと しても ゆるされない {場面|ばめん}で {知|し}られます。',
    inputForm: { acceptedAnswers: ['ヘッセ', 'ヘルマンヘッセ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g7_grammar_008', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{大|おお}きな {木|き}の {下|した}で {休|やす}む。」の「{大|おお}きな」の {品詞|ひんし}は どれか。',
    choices: ['{連体詞|れんたいし}', '{形容詞|けいようし}', '{形容動詞|けいようどうし}', '{副詞|ふくし}'],
    answer: '{連体詞|れんたいし}',
    hints: ['「{大|おお}きな」は「{大|おお}きだ」「{大|おお}きかった」のように {形|かたち}が かわるか。', '{活用|かつよう}せず、{体言|たいげん}（{名詞|めいし}）だけを {修飾|しゅうしょく}する {品詞|ひんし}。'],
    explanation: '「{大|おお}きな」は {活用|かつよう}せず、{体言|たいげん}「{木|き}」だけを {修飾|しゅうしょく}するので {連体詞|れんたいし}です。{形容詞|けいようし}の「{大|おお}きい」と まちがえやすいので {注意|ちゅうい}しましょう。',
    inputForm: { question: '「{大|おお}きな {木|き}の {下|した}で {休|やす}む。」の「{大|おお}きな」の 品詞は 何か。', acceptedAnswers: ['れんたいし'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv8（中学2年） =====
  {
    id: 'japanese_g8_grammar_001', subject: 'japanese', gradeLevel: 8, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '{動詞|どうし}「{起|お}きる」の {活用|かつよう}の {種類|しゅるい}は どれか。',
    choices: ['{上一段活用|かみいちだんかつよう}', '{五段活用|ごだんかつよう}', '{下一段活用|しもいちだんかつよう}', 'カ{行変格活用|ぎょうへんかくかつよう}'],
    answer: '{上一段活用|かみいちだんかつよう}',
    hints: ['「ない」を つけて みよう。', '「{起|お}きない」の「き」は イ{段|だん}の {音|おと}。'],
    explanation: '「ない」を つけると「{起|お}きない」と なり、「ない」の {直前|ちょくぜん}が イ{段|だん}の {音|おと}なので {上一段活用|かみいちだんかつよう}です。（ア{段|だん}なら {五段|ごだん}、エ{段|だん}なら {下一段|しもいちだん}）',
    inputForm: { question: '{動詞|どうし}「{起|お}きる」の 活用の 種類は 何か。', acceptedAnswers: ['かみいちだんかつよう', '上一段'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_read_001', subject: 'japanese', gradeLevel: 8, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{将来|しょうらい}に {漠然|}とした {不安|ふあん}を {感|かん}じる。」の「{漠然|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'ばくぜん', validationMode: 'kana-insensitive',
    hints: ['ぼんやりして はっきりしない ようす。', '「{砂漠|さばく}」の「{漠|ばく}」。'],
    explanation: '「{漠然|ばくぜん}」は「ばくぜん」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_read_002', subject: 'japanese', gradeLevel: 8, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{練習|れんしゅう}の {効果|こうか}が {顕著|}に {現|あらわ}れる。」の「{顕著|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'けんちょ', validationMode: 'kana-insensitive',
    hints: ['はっきりと {目立|めだ}つ ようす。', '「{著|いちじる}しい」の {音読|おんよ}みは「チョ」。'],
    explanation: '「{顕著|けんちょ}」は「けんちょ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_read_003', subject: 'japanese', gradeLevel: 8, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{食事|しょくじ}の {栄養|えいよう}が {偏る|}。」の「{偏る|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'かたよる', validationMode: 'kana-insensitive',
    hints: ['{一方|いっぽう}に よって、つりあいが とれない ようす。', '「{偏見|へんけん}」の「{偏|へん}」の {訓読|くんよ}み。'],
    explanation: '「{偏|かたよ}る」は「かたよる」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_keigo_001', subject: 'japanese', gradeLevel: 8, unit: 'keigo',
    difficulty: 'standard', answerType: 'input',
    question: '「{明日|あした}、{先生|せんせい}の お{宅|たく}へ {行|い}きます。」の「{行|い}く」を {謙譲語|けんじょうご}に すると？ {言|い}い{切|き}りの {形|かたち}（{終止形|しゅうしけい}）を ひらがなで {書|か}きなさい。',
    answer: 'まいる', acceptedAnswers: ['参る', 'うかがう', '伺う'], validationMode: 'kana-insensitive',
    hints: ['{自分|じぶん}の {動作|どうさ}を へりくだって {言|い}う {言|い}い{方|かた}。', '「ま」または「う」から {始|はじ}まる {言葉|ことば}。'],
    explanation: '「{行|い}く」の {謙譲語|けんじょうご}は「まいる（{参|まい}る）」や「うかがう（{伺|うかが}う）」です。{尊敬語|そんけいご}は「いらっしゃる」です。',
    reviewed: true
  },
  {
    id: 'japanese_g8_classic_001', subject: 'japanese', gradeLevel: 8, unit: 'classic',
    difficulty: 'standard', answerType: 'choice',
    question: '「{春|はる}は あけぼの。」で {始|はじ}まる {作品|さくひん}は どれか。',
    choices: ['{枕草子|まくらのそうし}', '{徒然草|つれづれぐさ}', '{方丈記|ほうじょうき}', '{平家物語|へいけものがたり}'],
    answer: '{枕草子|まくらのそうし}',
    hints: ['{平安時代|へいあんじだい}に {清少納言|せいしょうなごん}が {書|か}いた {随筆|ずいひつ}。', '{季節|きせつ}ごとの {好|す}きな {時間帯|じかんたい}を {述|の}べて いる。'],
    explanation: '「{春|はる}は あけぼの。」は、{清少納言|せいしょうなごん}の『{枕草子|まくらのそうし}』の {冒頭|ぼうとう}です。『{徒然草|つれづれぐさ}』は「つれづれなるままに」、『{方丈記|ほうじょうき}』は「ゆく{河|かわ}の{流|なが}れは{絶|た}えずして」、『{平家物語|へいけものがたり}』は「{祇園精舎|ぎおんしょうじゃ}の{鐘|かね}の{声|こえ}」で {始|はじ}まります。',
    inputForm: { question: '「{春|はる}は あけぼの。」で {始|はじ}まる 作品は 何か。', acceptedAnswers: ['まくらのそうし', '枕草紙'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g8_kanbun_001', subject: 'japanese', gradeLevel: 8, unit: 'kanbun',
    difficulty: 'standard', answerType: 'choice',
    question: '{漢文|かんぶん}の「レ{点|てん}」の {働|はたら}きとして {正|ただ}しいものは どれか。',
    choices: ['すぐ {下|した}の {一字|いちじ}から、{上|うえ}の {一字|いちじ}に {返|かえ}って {読|よ}む', '{二字|にじ}以上 {離|はな}れた {字|じ}に {返|かえ}って {読|よ}む', 'その {字|じ}を {読|よ}まずに とばす', '{上|うえ}から {順|じゅん}に そのまま {読|よ}む'],
    answer: 'すぐ {下|した}の {一字|いちじ}から、{上|うえ}の {一字|いちじ}に {返|かえ}って {読|よ}む',
    hints: ['「{読|よ}レ{書|しょ}」は「{書|しょ}を {読|よ}む」と {読|よ}む。', '{二字|にじ}以上 {離|はな}れて {返|かえ}る ときは「{一|いち}・{二|に}{点|てん}」を {使|つか}う。'],
    explanation: 'レ{点|てん}は、すぐ {下|した}の {一字|いちじ}を {先|さき}に {読|よ}み、{上|うえ}の {一字|いちじ}に {返|かえ}って {読|よ}む ことを {表|あらわ}します。{二字|にじ}以上 {離|はな}れて {返|かえ}る ときは {一|いち}・{二|に}{点|てん}を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'japanese_g8_yoji_001', subject: 'japanese', gradeLevel: 8, unit: 'yoji',
    difficulty: 'advanced', answerType: 'input',
    question: '{四字熟語|よじじゅくご}「{晴耕雨読|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'せいこううどく', validationMode: 'kana-insensitive',
    hints: ['{晴|は}れた {日|ひ}は {畑|はたけ}を {耕|たがや}し、{雨|あめ}の {日|ひ}は {本|ほん}を {読|よ}む、という {意味|いみ}。', 'すべて {音読|おんよ}みで {読|よ}む。「{耕|たがや}す」の {音読|おんよ}みは「コウ」。'],
    explanation: '「{晴耕雨読|せいこううどく}」は「せいこううどく」と {読|よ}みます。{思|おも}いのままに のんびり {暮|く}らす ことを {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'japanese_g8_grammar_002', subject: 'japanese', gradeLevel: 8, unit: 'grammar',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{先生|せんせい}が {話|はな}される。」の「れる」の {意味|いみ}は どれか。',
    choices: ['{尊敬|そんけい}', '{受|う}け{身|み}', '{可能|かのう}', '{自発|じはつ}'],
    answer: '{尊敬|そんけい}',
    hints: ['{話|はな}して いるのは {誰|だれ}か。', '{目上|めうえ}の {人|ひと}の {動作|どうさ}に ついて いる。'],
    explanation: '{先生|せんせい}（{目上|めうえ}の {人|ひと}）の {動作|どうさ}「{話|はな}す」を {高|たか}めて いるので、「れる」は {尊敬|そんけい}の {意味|いみ}です。',
    inputForm: { question: '「{先生|せんせい}が {話|はな}される。」の「れる」の 意味は 何か。', acceptedAnswers: ['そんけい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g8_grammar_003', subject: 'japanese', gradeLevel: 8, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '「{手紙|てがみ}を {書|か}けば、{気持|きも}ちが {伝|つた}わる。」の「{書|か}け」の {活用形|かつようけい}は どれか。',
    choices: ['{仮定形|かていけい}', '{命令形|めいれいけい}', '{連用形|れんようけい}', '{未然形|みぜんけい}'],
    answer: '{仮定形|かていけい}',
    hints: ['すぐ {後|あと}に {続|つづ}く {語|ご}に {注目|ちゅうもく}しよう。', '「ば」に {続|つづ}く {形|かたち}は {何|なに}か。'],
    explanation: '「ば」に {続|つづ}く {形|かたち}なので {仮定形|かていけい}です。「{書|か}け。」と {言|い}い{切|き}れば {命令形|めいれいけい}に なります。',
    inputForm: { question: '「{手紙|てがみ}を {書|か}けば、{気持|きも}ちが {伝|つた}わる。」の「{書|か}け」の 活用形は 何か。', acceptedAnswers: ['かていけい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g8_classic_002', subject: 'japanese', gradeLevel: 8, unit: 'classic',
    difficulty: 'basic', answerType: 'choice',
    question: '『{平家物語|へいけものがたり}』の {冒頭|ぼうとう}は どれか。',
    choices: ['{祇園精舎|ぎおんしょうじゃ}の{鐘|かね}の{声|こえ}、{諸行無常|しょぎょうむじょう}の{響|ひび}きあり。', '{春|はる}は あけぼの。', 'つれづれなるままに、{日|ひ}ぐらし {硯|すずり}に むかひて、', 'ゆく{河|かわ}の{流|なが}れは{絶|た}えずして、しかも もとの{水|みず}に あらず。'],
    answer: '{祇園精舎|ぎおんしょうじゃ}の{鐘|かね}の{声|こえ}、{諸行無常|しょぎょうむじょう}の{響|ひび}きあり。',
    hints: ['{平氏|へいし}の {栄|さか}えと {滅|ほろ}びを えがいた {軍記物語|ぐんきものがたり}。', '「すべての ものは うつりかわる」という {仏教|ぶっきょう}の {考|かんが}えから {始|はじ}まる。'],
    explanation: '『{平家物語|へいけものがたり}』は「{祇園精舎|ぎおんしょうじゃ}の{鐘|かね}の{声|こえ}、{諸行無常|しょぎょうむじょう}の{響|ひび}きあり。」で {始|はじ}まります。「{春|はる}は あけぼの」は『{枕草子|まくらのそうし}』、「つれづれなるままに」は『{徒然草|つれづれぐさ}』、「ゆく{河|かわ}の{流|なが}れは」は『{方丈記|ほうじょうき}』の {冒頭|ぼうとう}です。',
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_read_004', subject: 'japanese', gradeLevel: 8, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{空港|くうこう}で {飛行機|ひこうき}に {搭乗|}する。」の「{搭乗|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'とうじょう', validationMode: 'kana-insensitive',
    hints: ['{飛行機|ひこうき}や {船|ふね}に {乗|の}りこむ こと。', '「{乗|の}る」の {音読|おんよ}みは「ジョウ」。'],
    explanation: '「{搭乗|とうじょう}」は「とうじょう」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_read_005', subject: 'japanese', gradeLevel: 8, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{毎年|まいとし} {恒例|}の {雪|ゆき}まつりが {始|はじ}まる。」の「{恒例|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'こうれい', validationMode: 'kana-insensitive',
    hints: ['いつも {決|き}まって {行|おこな}われる {行事|ぎょうじ}や ならわしの こと。', '「{例|れい}」は「{例文|れいぶん}」の「れい」。'],
    explanation: '「{恒例|こうれい}」は「こうれい」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_read_006', subject: 'japanese', gradeLevel: 8, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{緩|}やかな {坂|さか}を のぼる。」の「{緩|}やか」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'ゆるやか', validationMode: 'kana-insensitive',
    hints: ['かたむきや うごきが {急|きゅう}では ない ようす。', '「{緩|かん}{和|わ}」の「{緩|かん}」の {訓読|くんよ}み。'],
    explanation: '「{緩|ゆる}やか」は「ゆるやか」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_read_007', subject: 'japanese', gradeLevel: 8, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{巧|}みな {話術|わじゅつ}で {観客|かんきゃく}を {笑|わら}わせる。」の「{巧|}み」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'たくみ', validationMode: 'kana-insensitive',
    hints: ['{技術|ぎじゅつ}が すぐれて いて、じょうずな ようす。', '「{技巧|ぎこう}」の「{巧|こう}」の {訓読|くんよ}み。'],
    explanation: '「{巧|たく}み」は「たくみ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_kanji_write_001', subject: 'japanese', gradeLevel: 8, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{話|はなし}が ふくざつに なって きた。」の「ふくざつ」を {漢字|かんじ}で {書|か}きなさい。',
    answer: '複雑', validationMode: 'exact',
    hints: ['「ふく」は「ころもへん」の {漢字|かんじ}（「{復|ふく}」ではない）。', '「ざつ」は「{雑誌|ざっし}」の「ざっ」と {同|おな}じ {漢字|かんじ}。'],
    explanation: '「ふくざつ」は「{複雑|ふくざつ}」と {書|か}きます。{対義語|たいぎご}は「{単純|たんじゅん}」です。',
    reviewed: true
  },
  {
    id: 'japanese_g8_grammar_004', subject: 'japanese', gradeLevel: 8, unit: 'grammar',
    difficulty: 'standard', answerType: 'input',
    question: '{動詞|どうし}「{走|はし}る」を {連用形|れんようけい}（「ます」に {続|つづ}く {形|かたち}）に して、ひらがなで {書|か}きなさい。',
    answer: 'はしり', acceptedAnswers: ['走り'], validationMode: 'kana-insensitive',
    hints: ['「{走|はし}る」に「ます」を つけて みよう。', '「ます」の {直前|ちょくぜん}の {部分|ぶぶん}を {答|こた}える。'],
    explanation: '「{走|はし}ります」と なるので、{連用形|れんようけい}は「はしり（{走|はし}り）」です。「{走|はし}る」は {五段活用|ごだんかつよう}の {動詞|どうし}です。',
    reviewed: true
  },
  {
    id: 'japanese_g8_yoji_002', subject: 'japanese', gradeLevel: 8, unit: 'yoji',
    difficulty: 'standard', answerType: 'input',
    question: '「1つの ことに {集中|しゅうちゅう}して、ほかの ことに {気|き}を とられない ようす」を {表|あらわ}す {四字熟語|よじじゅくご}「いっしんふらん」を {漢字|かんじ}で {書|か}きなさい。',
    answer: '一心不乱', validationMode: 'exact',
    hints: ['「いっしん」は「1つの {心|こころ}」。', '「ふらん」は「{乱|みだ}れない」という {意味|いみ}。{打|う}ち{消|け}しの {漢字|かんじ}を {使|つか}う。'],
    explanation: '「いっしんふらん」は「{一心不乱|いっしんふらん}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_keigo_002', subject: 'japanese', gradeLevel: 8, unit: 'keigo',
    difficulty: 'standard', answerType: 'input',
    question: '「その {件|けん}は よく {知|し}って います。」の「{知|し}る」を {謙譲語|けんじょうご}に すると？ {言|い}い{切|き}りの {形|かたち}を ひらがなで {書|か}きなさい。',
    answer: 'ぞんじる', acceptedAnswers: ['存じる', 'ぞんじあげる', '存じ上げる', 'ぞんずる', '存ずる'], validationMode: 'kana-insensitive',
    hints: ['「よく □□□て おります」のように {使|つか}う。', '「ぞ」から {始|はじ}まる {言葉|ことば}。'],
    explanation: '「{知|し}る」の {謙譲語|けんじょうご}は「ぞんじる（{存|ぞん}じる）」「ぞんじあげる（{存|ぞん}じ{上|あ}げる）」です。「よく {存|ぞん}じて おります」のように {使|つか}います。',
    reviewed: true
  },
  {
    id: 'japanese_g8_classic_003', subject: 'japanese', gradeLevel: 8, unit: 'classic',
    difficulty: 'standard', answerType: 'choice',
    question: '「つれづれなるままに」で {始|はじ}まる『{徒然草|つれづれぐさ}』の {作者|さくしゃ}は だれか。',
    choices: ['{兼好法師|けんこうほうし}', '{清少納言|せいしょうなごん}', '{鴨長明|かものちょうめい}', '{紀貫之|きのつらゆき}'],
    answer: '{兼好法師|けんこうほうし}',
    hints: ['{鎌倉時代|かまくらじだい}の {終|お}わりごろに {書|か}かれた {随筆|ずいひつ}。', '『{方丈記|ほうじょうき}』の {作者|さくしゃ}は {鴨長明|かものちょうめい}、『{枕草子|まくらのそうし}』は {清少納言|せいしょうなごん}。'],
    explanation: '『{徒然草|つれづれぐさ}』の {作者|さくしゃ}は {兼好法師|けんこうほうし}（{吉田兼好|よしだけんこう}）です。『{枕草子|まくらのそうし}』『{方丈記|ほうじょうき}』と あわせて {日本|にほん}の {三大随筆|さんだいずいひつ}と よばれます。',
    inputForm: { acceptedAnswers: ['吉田兼好', 'けんこうほうし', 'よしだけんこう', '卜部兼好'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g8_grammar_005', subject: 'japanese', gradeLevel: 8, unit: 'grammar',
    difficulty: 'standard', answerType: 'choice',
    question: '「{今日|きょう}は {雨|あめ}が {降|ふ}らない。」の「ない」の {品詞|ひんし}は どれか。',
    choices: ['{助動詞|じょどうし}', '{形容詞|けいようし}', '{副詞|ふくし}', '{連体詞|れんたいし}'],
    answer: '{助動詞|じょどうし}',
    hints: ['「ない」を「ぬ」に {置|お}きかえて みよう。', '「{降|ふ}らぬ」と {言|い}える「ない」は、{打|う}ち{消|け}しの {助動詞|じょどうし}。'],
    explanation: '「{降|ふ}らぬ」と {置|お}きかえられるので、{打|う}ち{消|け}しの {助動詞|じょどうし}「ない」です。「お{金|かね}が ない」のように「ぬ」に {置|お}きかえられない「ない」は {形容詞|けいようし}です。',
    inputForm: { question: '「{今日|きょう}は {雨|あめ}が {降|ふ}らない。」の「ない」の 品詞は 何か。', acceptedAnswers: ['じょどうし'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g8_kanbun_002', subject: 'japanese', gradeLevel: 8, unit: 'kanbun',
    difficulty: 'standard', answerType: 'choice',
    question: '{漢文|かんぶん}の「{一|いち}・{二|に}{点|てん}」の {働|はたら}きとして {正|ただ}しい ものは どれか。',
    choices: ['{二字|にじ}{以上|いじょう} {離|はな}れた {上|うえ}の {字|じ}に {返|かえ}って {読|よ}む', 'すぐ {下|した}の {一字|いちじ}から {上|うえ}の {一字|いちじ}に {返|かえ}って {読|よ}む', 'その {字|じ}を {読|よ}まずに とばす', '{上|うえ}から {順|じゅん}に そのまま {読|よ}む'],
    answer: '{二字|にじ}{以上|いじょう} {離|はな}れた {上|うえ}の {字|じ}に {返|かえ}って {読|よ}む',
    hints: ['すぐ {下|した}の {一字|いちじ}から {返|かえ}る ときは「レ{点|てん}」を {使|つか}う。', '「{一|いち}」の ついた {字|じ}まで {読|よ}んだら、「{二|に}」の ついた {字|じ}に {返|かえ}る。'],
    explanation: '{一|いち}・{二|に}{点|てん}は、{二字|にじ}{以上|いじょう} {離|はな}れた {上|うえ}の {字|じ}に {返|かえ}って {読|よ}む ことを {表|あらわ}します。「{一|いち}」の ついた {字|じ}を {読|よ}んでから、「{二|に}」の ついた {字|じ}に {返|かえ}ります。',
    reviewed: true
  },
  {
    id: 'japanese_g8_homonym_001', subject: 'japanese', gradeLevel: 8, unit: 'homonym',
    difficulty: 'standard', answerType: 'choice',
    question: '「{作文|さくぶん}の こうせいを {考|かんが}えてから {書|か}き{始|はじ}める。」の「こうせい」に あてはまる {漢字|かんじ}は どれか。',
    choices: ['{構成|こうせい}', '{校正|こうせい}', '{公正|こうせい}', '{厚生|こうせい}'],
    answer: '{構成|こうせい}',
    hints: ['{文章|ぶんしょう}の {組|く}み{立|た}ての こと。', '「{校正|こうせい}」は {書|か}いた {後|あと}に {誤|あやま}りを {直|なお}す こと。'],
    explanation: '{文章|ぶんしょう}の {組|く}み{立|た}ては「{構成|こうせい}」です。「{校正|こうせい}」は {文字|もじ}の {誤|あやま}りを {直|なお}す こと、「{公正|こうせい}」は かたよりが ない こと、「{厚生|こうせい}」は {人々|ひとびと}の {健康|けんこう}や くらしを ゆたかに する ことです。',
    inputForm: { question: '「{作文|さくぶん}の こうせいを {考|かんが}えてから {書|か}き{始|はじ}める。」の「こうせい」に あてはまる 漢字を 書け。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g8_classic_004', subject: 'japanese', gradeLevel: 8, unit: 'classic',
    difficulty: 'advanced', answerType: 'input',
    question: '{古文|こぶん}の {係|かか}り{結|むす}びで、{係|かか}りの {助詞|じょし}「ぞ・なむ・や・か」を {受|う}ける {文末|ぶんまつ}の {活用形|かつようけい}を {漢字|かんじ}で {書|か}きなさい。',
    answer: '連体形', answerDisplay: '{連体形|れんたいけい}', acceptedAnswers: ['れんたいけい'], validationMode: 'exact',
    hints: ['「こそ」を {受|う}ける {文末|ぶんまつ}は {已然形|いぜんけい}。', '{体言|たいげん}（{名詞|めいし}）に {続|つづ}く {形|かたち}。'],
    explanation: '「ぞ・なむ・や・か」を {受|う}ける {文末|ぶんまつ}は {連体形|れんたいけい}、「こそ」を {受|う}ける {文末|ぶんまつ}は {已然形|いぜんけい}に なります。これを {係|かか}り{結|むす}びと いいます。',
    reviewed: true
  },
  {
    id: 'japanese_g8_vocab_001', subject: 'japanese', gradeLevel: 8, unit: 'vocab',
    difficulty: 'advanced', answerType: 'input',
    question: '「{抽象|ちゅうしょう}」の {対義語|たいぎご}を、{漢字|かんじ}2{字|じ}で {書|か}きなさい。',
    answer: '具体', acceptedAnswers: ['ぐたい'], validationMode: 'exact',
    hints: ['はっきりした {形|かたち}や {内容|ないよう}を もって いる こと。', '「□□{例|れい}を あげて {説明|せつめい}する」の □□。'],
    explanation: '「{抽象|ちゅうしょう}」の {対義語|たいぎご}は「{具体|ぐたい}」です。「{抽象的|ちゅうしょうてき}」⇔「{具体的|ぐたいてき}」のように {使|つか}います。',
    reviewed: true
  },
  {
    id: 'japanese_g8_grammar_006', subject: 'japanese', gradeLevel: 8, unit: 'grammar',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{冬|ふゆ}に なると {故郷|ふるさと}の ことが {思|おも}い{出|だ}される。」の「れる」の {意味|いみ}は どれか。',
    choices: ['{自発|じはつ}', '{受|う}け{身|み}', '{可能|かのう}', '{尊敬|そんけい}'],
    answer: '{自発|じはつ}',
    hints: ['{自分|じぶん}で {思|おも}い{出|だ}そうと して いるか。', '「{自然|しぜん}に 〜して しまう」と {言|い}いかえられる。'],
    explanation: '「{自然|しぜん}に {思|おも}い{出|だ}して しまう」という {意味|いみ}なので {自発|じはつ}です。「{思|おも}う」「{感|かん}じる」「しのぶ」など、{心|こころ}の はたらきを {表|あらわ}す {動詞|どうし}に つく ことが {多|おお}いです。',
    inputForm: { question: '「{冬|ふゆ}に なると {故郷|ふるさと}の ことが {思|おも}い{出|だ}される。」の「れる」の 意味は 何か。', acceptedAnswers: ['じはつ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g8_literature_001', subject: 'japanese', gradeLevel: 8, unit: 'literature',
    difficulty: 'advanced', answerType: 'choice',
    question: '{友|とも}との {約束|やくそく}を {守|まも}る ために {走|はし}りつづける {若者|わかもの}を えがいた {小説|しょうせつ}『{走|はし}れメロス』の {作者|さくしゃ}は だれか。',
    choices: ['{太宰治|だざいおさむ}', '{夏目漱石|なつめそうせき}', '{芥川龍之介|あくたがわりゅうのすけ}', '{宮沢賢治|みやざわけんじ}'],
    answer: '{太宰治|だざいおさむ}',
    hints: ['{昭和|しょうわ}の {初|はじ}めに {活躍|かつやく}した {作家|さっか}で、『{人間失格|にんげんしっかく}』も {書|か}いた。', '{青森県|あおもりけん}の {生|う}まれで、『{斜陽|しゃよう}』も {書|か}いた。'],
    explanation: '『{走|はし}れメロス』は {太宰治|だざいおさむ}の {作品|さくひん}です。{夏目漱石|なつめそうせき}は『{坊|ぼ}っちゃん』、{芥川龍之介|あくたがわりゅうのすけ}は『{羅生門|らしょうもん}』、{宮沢賢治|みやざわけんじ}は『{銀河鉄道|ぎんがてつどう}の{夜|よる}』などを {書|か}きました。',
    inputForm: { acceptedAnswers: ['だざいおさむ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv9（中学3年） =====
  {
    id: 'japanese_g9_haiku_001', subject: 'japanese', gradeLevel: 9, unit: 'haiku',
    difficulty: 'basic', answerType: 'choice',
    question: '{俳句|はいく}「{古池|ふるいけ}や {蛙|かわず}{飛|と}びこむ {水|みず}の{音|おと}」（{松尾芭蕉|まつおばしょう}）の {切|き}れ{字|じ}は どれか。',
    choices: ['や', '{蛙|かわず}', '{飛|と}びこむ', '{水|みず}の{音|おと}'],
    answer: 'や',
    hints: ['{切|き}れ{字|じ}は、{句|く}の {切|き}れ{目|め}を {示|しめ}し、{感動|かんどう}を {強|つよ}める {言葉|ことば}。', '「や」「かな」「けり」などが {代表的|だいひょうてき}な {切|き}れ{字|じ}。'],
    explanation: '「{古池|ふるいけ}や」の「や」が {切|き}れ{字|じ}です。「や」「かな」「けり」が {代表的|だいひょうてき}な {切|き}れ{字|じ}です。',
    inputForm: { question: '{俳句|はいく}「{古池|ふるいけ}や {蛙|かわず}{飛|と}びこむ {水|みず}の{音|おと}」（{松尾芭蕉|まつおばしょう}）の 切れ字は 何か。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_read_001', subject: 'japanese', gradeLevel: 9, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{最終的|さいしゅうてき}な {判断|はんだん}を {本人|ほんにん}に {委ねる|}。」の「{委ねる|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'ゆだねる', validationMode: 'kana-insensitive',
    hints: ['すべてを {相手|あいて}に まかせる という {意味|いみ}。', '「{委員|いいん}」の「{委|い}」の {訓読|くんよ}み。'],
    explanation: '「{委|ゆだ}ねる」は「ゆだねる」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_read_002', subject: 'japanese', gradeLevel: 9, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{自分|じぶん}の {負|ま}けを {潔く|} {認|みと}める。」の「{潔く|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'いさぎよく', validationMode: 'kana-insensitive',
    hints: ['{未練|みれん}が なく、さっぱりして いる ようす。', '「{清潔|せいけつ}」の「{潔|けつ}」の {訓読|くんよ}み。'],
    explanation: '「{潔|いさぎよ}く」は「いさぎよく」と {読|よ}みます。{言|い}い{切|き}りの {形|かたち}は「{潔|いさぎよ}い」です。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_read_003', subject: 'japanese', gradeLevel: 9, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{大雪|おおゆき}に そなえて {必要|ひつよう}な {措置|}を とる。」の「{措置|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'そち', validationMode: 'kana-insensitive',
    hints: ['{事態|じたい}に {応|おう}じて {必要|ひつよう}な {手続|てつづ}きや {対策|たいさく}を とる こと。', '「{置|お}く」の {音読|おんよ}みは「チ」。'],
    explanation: '「{措置|そち}」は「そち」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_yoji_001', subject: 'japanese', gradeLevel: 9, unit: 'yoji',
    difficulty: 'standard', answerType: 'input',
    question: '「{追|お}いつめられて、{逃|のが}れようの ない {状態|じょうたい}」を {表|あらわ}す {四字熟語|よじじゅくご}「ぜったいぜつめい」を {漢字|かんじ}で {書|か}きなさい。',
    answer: '絶体絶命', validationMode: 'exact',
    hints: ['「ぜったい」は「{絶対|ぜったい}」ではない。「{体|からだ}」の {漢字|かんじ}を {使|つか}う。', '「{体|からだ}も {命|いのち}も {絶|た}たれる」ほど {追|お}いつめられた ようす。'],
    explanation: '「ぜったいぜつめい」は「{絶体絶命|ぜったいぜつめい}」と {書|か}きます。「{絶対|ぜったい}」と {書|か}く まちがいが {多|おお}いので {注意|ちゅうい}しましょう。',
    reviewed: true
  },
  {
    id: 'japanese_g9_classic_001', subject: 'japanese', gradeLevel: 9, unit: 'classic',
    difficulty: 'standard', answerType: 'choice',
    question: '「{月日|つきひ}は{百代|はくたい}の{過客|かかく}にして、{行|ゆ}きかふ{年|とし}も{又|また}{旅人|たびびと}{也|なり}。」で {始|はじ}まる『おくのほそ{道|みち}』の {作者|さくしゃ}は {誰|だれ}か。',
    choices: ['{松尾芭蕉|まつおばしょう}', '{与謝蕪村|よさぶそん}', '{小林一茶|こばやしいっさ}', '{正岡子規|まさおかしき}'],
    answer: '{松尾芭蕉|まつおばしょう}',
    hints: ['{江戸時代|えどじだい}の {前半|ぜんはん}、{東北|とうほく}・{北陸|ほくりく}を {旅|たび}した {俳人|はいじん}。', '「{古池|ふるいけ}や」の {句|く}の {作者|さくしゃ}。'],
    explanation: '『おくのほそ{道|みち}』は {松尾芭蕉|まつおばしょう}が {東北|とうほく}・{北陸|ほくりく}を {旅|たび}して {書|か}いた {紀行文|きこうぶん}です。',
    inputForm: { acceptedAnswers: ['芭蕉', 'まつおばしょう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g9_waka_001', subject: 'japanese', gradeLevel: 9, unit: 'waka',
    difficulty: 'standard', answerType: 'choice',
    question: '{和歌|わか}で、一つの {言葉|ことば}に {二|ふた}つの {意味|いみ}を {持|も}たせる {表現技法|ひょうげんぎほう}は どれか。',
    choices: ['{掛詞|かけことば}', '{枕詞|まくらことば}', '{序詞|じょことば}', '{体言止|たいげんど}め'],
    answer: '{掛詞|かけことば}',
    hints: ['{同|おな}じ {音|おと}の {言葉|ことば}に {意味|いみ}を「かける」。', '{例|れい}：「まつ」に「{松|まつ}」と「{待|ま}つ」の {意味|いみ}を {持|も}たせる。'],
    explanation: '一つの {言葉|ことば}に {同音|どうおん}の {二|ふた}つの {意味|いみ}を {持|も}たせる {技法|ぎほう}は「{掛詞|かけことば}」です。「{枕詞|まくらことば}」は {特定|とくてい}の {言葉|ことば}を {導|みちび}く {決|き}まった {言葉|ことば}（「ひさかたの」→「{光|ひかり}」など）です。',
    inputForm: { question: '{和歌|わか}で、一つの {言葉|ことば}に {二|ふた}つの {意味|いみ}を {持|も}たせる 表現技法を 何と いうか。', acceptedAnswers: ['かけことば'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g9_yoji_002', subject: 'japanese', gradeLevel: 9, unit: 'yoji',
    difficulty: 'advanced', answerType: 'input',
    question: '『{論語|ろんご}』に {由来|ゆらい}する {四字熟語|よじじゅくご}「{温故知新|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'おんこちしん', validationMode: 'kana-insensitive',
    hints: ['「{故|ふる}きを {温|たず}ねて {新|あたら}しきを {知|し}る」と {訓読|くんどく}する。', 'すべて {音読|おんよ}みで {読|よ}む。「{故|こ}」は「{故郷|こきょう}」の「こ」。'],
    explanation: '「{温故知新|おんこちしん}」は「おんこちしん」と {読|よ}みます。{昔|むかし}の ことを {学|まな}び、そこから {新|あたら}しい {考|かんが}えを {得|え}る という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g9_homonym_001', subject: 'japanese', gradeLevel: 9, unit: 'homonym',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{事故|じこ}の {責任|せきにん}を ついきゅうする。」の「ついきゅう」に あてはまる {漢字|かんじ}は どれか。',
    choices: ['{追及|ついきゅう}', '{追求|ついきゅう}', '{追究|ついきゅう}', '{追給|ついきゅう}'],
    answer: '{追及|ついきゅう}',
    hints: ['{責任|せきにん}や {罪|つみ}を {問|と}いつめる ときの「ついきゅう」。', '「{利益|りえき}を ついきゅう」は「{追求|ついきゅう}」、「{真理|しんり}を ついきゅう」は「{追究|ついきゅう}」。'],
    explanation: '{責任|せきにん}を {問|と}いつめる ときは「{追及|ついきゅう}」です。「{追求|ついきゅう}」は {目的|もくてき}の ものを {追|お}い{求|もと}める こと、「{追究|ついきゅう}」は {学問|がくもん}などで {深|ふか}く {調|しら}べる ことです。',
    inputForm: { question: '「{事故|じこ}の {責任|せきにん}を ついきゅうする。」の「ついきゅう」に あてはまる 漢字を 書け。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'japanese_g9_literature_001', subject: 'japanese', gradeLevel: 9, unit: 'literature',
    difficulty: 'basic', answerType: 'choice',
    question: '{二十年|にじゅうねん}ぶりに ふるさとへ {帰|かえ}った「{私|わたし}」と、{幼|おさな}なじみの ルントウとの {再会|さいかい}を えがいた {小説|しょうせつ}『{故郷|こきょう}』の {作者|さくしゃ}は だれか。',
    choices: ['{魯迅|ろじん}', 'ヘルマン・ヘッセ', '{太宰治|だざいおさむ}', '{夏目漱石|なつめそうせき}'],
    answer: '{魯迅|ろじん}',
    hints: ['{中国|ちゅうごく}の {作家|さっか}。', '『{阿|あ}Q{正伝|せいでん}』も この {作家|さっか}の {作品|さくひん}。'],
    explanation: '『{故郷|こきょう}』は {中国|ちゅうごく}の {作家|さっか} {魯迅|ろじん}の {小説|しょうせつ}です。{最後|さいご}に「{私|わたし}」が、{希望|きぼう}を {地上|ちじょう}の {道|みち}に たとえて {考|かんが}える {場面|ばめん}で {知|し}られます。',
    inputForm: { acceptedAnswers: ['ろじん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g9_grammar_001', subject: 'japanese', gradeLevel: 9, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '「{母|はは}の {作|つく}った {料理|りょうり}。」の「の」と {同|おな}じ {働|はたら}きの「の」を ふくむ ものは どれか。',
    choices: ['{雪|ゆき}の {降|ふ}る {夜|よる}', '{私|わたし}の {本|ほん}', '{走|はし}るのが {楽|たの}しい', '{明日|あした} {行|い}くの？'],
    answer: '{雪|ゆき}の {降|ふ}る {夜|よる}',
    hints: ['「{母|はは}の」の「の」を「が」に {置|お}きかえて みよう。', '「{母|はは}が {作|つく}った」と {言|い}える。{同|おな}じように「が」に {置|お}きかえられる ものを さがそう。'],
    explanation: '「{母|はは}の {作|つく}った」「{雪|ゆき}の {降|ふ}る」の「の」は「が」に {置|お}きかえられ、{主語|しゅご}を {示|しめ}します。「{私|わたし}の {本|ほん}」は {連体修飾語|れんたいしゅうしょくご}を つくる「の」、「{走|はし}るのが」は「こと」に {置|お}きかえられる「の」、「{行|い}くの？」は {疑問|ぎもん}を {表|あらわ}す「の」です。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_read_004', subject: 'japanese', gradeLevel: 9, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{大雪|おおゆき}に よる {交通|こうつう}の {乱|みだ}れが {懸念|}される。」の「{懸念|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'けねん', validationMode: 'kana-insensitive',
    hints: ['{気|き}に かかって {心配|しんぱい}する こと。', '「{懸|けん}」は ここでは「ケ」と {読|よ}む。「{念|ねん}」は「{記念|きねん}」の「ねん」。'],
    explanation: '「{懸念|けねん}」は「けねん」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_read_005', subject: 'japanese', gradeLevel: 9, unit: 'kanji_read',
    difficulty: 'basic', answerType: 'input',
    question: '「{先生|せんせい}の {言葉|ことば}が {解決|かいけつ}の {方法|ほうほう}を {示唆|}して いた。」の「{示唆|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'しさ', validationMode: 'kana-insensitive',
    hints: ['それとなく {教|おし}え{示|しめ}す こと。', '「{示|しめ}す」の {音読|おんよ}みは「ジ」と「シ」。ここでは「シ」。'],
    explanation: '「{示唆|しさ}」は「しさ」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_read_006', subject: 'japanese', gradeLevel: 9, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「この {道|みち}は {車|くるま}が {頻繁|}に {通|とお}る。」の「{頻繁|}」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'ひんぱん', validationMode: 'kana-insensitive',
    hints: ['{何度|なんど}も くりかえし {起|お}こる ようす。', '「{繁|はん}」は「{繁盛|はんじょう}」の「はん」。ここでは「パン」と {音|おと}が かわる。'],
    explanation: '「{頻繁|ひんぱん}」は「ひんぱん」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_read_007', subject: 'japanese', gradeLevel: 9, unit: 'kanji_read',
    difficulty: 'standard', answerType: 'input',
    question: '「{長年|ながねん}の {研究|けんきゅう}が {成功|せいこう}を {遂|}げる。」の「{遂|}げる」の {読|よ}み{方|かた}を ひらがなで {書|か}きなさい。',
    answer: 'とげる', validationMode: 'kana-insensitive',
    hints: ['{目的|もくてき}を {最後|さいご}まで やりぬいて、{実現|じつげん}させる こと。', '「{完遂|かんすい}」の「{遂|すい}」の {訓読|くんよ}み。'],
    explanation: '「{遂|と}げる」は「とげる」と {読|よ}みます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanji_write_001', subject: 'japanese', gradeLevel: 9, unit: 'kanji_write',
    difficulty: 'standard', answerType: 'input',
    question: '「{長年|ながねん} {町|まち}の ために {働|はたら}いた {人|ひと}に けいいを {表|あらわ}す。」の「けいい」を {漢字|かんじ}で {書|か}きなさい。',
    answer: '敬意', validationMode: 'exact',
    hints: ['{相手|あいて}を うやまう {気持|きも}ちの こと。', '「けい」は「{敬語|けいご}」の「けい」、「い」は「{意味|いみ}」の「い」。'],
    explanation: '「けいい」は「{敬意|けいい}」と {書|か}きます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_yoji_003', subject: 'japanese', gradeLevel: 9, unit: 'yoji',
    difficulty: 'standard', answerType: 'input',
    question: '「{多|おお}くの {人|ひと}が {口|くち}を そろえて {同|おな}じ ことを {言|い}う こと」を {表|あらわ}す {四字熟語|よじじゅくご}「いくどうおん」を {漢字|かんじ}で {書|か}きなさい。',
    answer: '異口同音', validationMode: 'exact',
    hints: ['「いく」は「ちがう {口|くち}」。「{異|こと}なる」の {漢字|かんじ}を {使|つか}う。', '「どうおん」は「{同|おな}じ {音|おと}（{声|こえ}）」。'],
    explanation: '「いくどうおん」は「{異口同音|いくどうおん}」と {書|か}きます。「{異口|いく}」を「{意句|いく}」などと {書|か}かないように {注意|ちゅうい}しましょう。',
    reviewed: true
  },
  {
    id: 'japanese_g9_waka_002', subject: 'japanese', gradeLevel: 9, unit: 'waka',
    difficulty: 'standard', answerType: 'input',
    question: '{五|ご}・{七|しち}・{五|ご}・{七|しち}・{七|しち}の {定型|ていけい}を もつ {短歌|たんか}は、{全部|ぜんぶ}で {何音|なんおん}か。{数字|すうじ}で {答|こた}えなさい。',
    answer: '31', acceptedAnswers: ['31音'], validationMode: 'number',
    hints: ['5＋7＋5＋7＋7 を {計算|けいさん}しよう。', '{俳句|はいく}（{五|ご}・{七|しち}・{五|ご}）は 17{音|おん}。'],
    explanation: '5＋7＋5＋7＋7＝31{音|おん}です。{短歌|たんか}は「{三十一文字|みそひともじ}」とも よばれます。',
    reviewed: true
  },
  {
    id: 'japanese_g9_classic_002', subject: 'japanese', gradeLevel: 9, unit: 'classic',
    difficulty: 'standard', answerType: 'input',
    question: '{歴史的仮名遣|れきしてきかなづか}いの「けふ」を {現代仮名遣|げんだいかなづか}いに {直|なお}して、ひらがなで {書|か}きなさい。',
    answer: 'きょう', acceptedAnswers: ['今日'], validationMode: 'kana-insensitive',
    hints: ['まず {語|ご}の {頭|あたま}{以外|いがい}の「ふ」を「う」に {直|なお}す（けう）。', '「ェウ（eu）」の {音|おと}は「ョウ（yō）」に {直|なお}す。'],
    explanation: '「けふ」→「けう」→「きょう（{今日|きょう}）」と {直|なお}します。「てふてふ」が「ちょうちょう」に なるのも {同|おな}じ しくみです。',
    reviewed: true
  },
  {
    id: 'japanese_g9_keigo_001', subject: 'japanese', gradeLevel: 9, unit: 'keigo',
    difficulty: 'standard', answerType: 'choice',
    question: '{敬語|けいご}の {使|つか}い{方|かた}が {正|ただ}しい ものは どれか。',
    choices: ['{先生|せんせい}が おっしゃった ことを メモする。', '{先生|せんせい}が {申|もう}された ことを メモする。', 'お{客様|きゃくさま}が お{菓子|かし}を いただいた。', '{私|わたし}が {先生|せんせい}の {絵|え}を ご{覧|らん}に なる。'],
    answer: '{先生|せんせい}が おっしゃった ことを メモする。',
    hints: ['{目上|めうえ}の {人|ひと}の {動作|どうさ}には {尊敬語|そんけいご}、{自分|じぶん}の {動作|どうさ}には {謙譲語|けんじょうご}を {使|つか}う。', '「{申|もう}す」「いただく」は {謙譲語|けんじょうご}、「おっしゃる」「ご{覧|らん}に なる」は {尊敬語|そんけいご}。'],
    explanation: '{先生|せんせい}の {動作|どうさ}に {尊敬語|そんけいご}「おっしゃる」を {使|つか}った {文|ぶん}が {正|ただ}しいです。{先生|せんせい}や お{客様|きゃくさま}の {動作|どうさ}に {謙譲語|けんじょうご}（{申|もう}す・いただく）を {使|つか}ったり、{自分|じぶん}の {動作|どうさ}に {尊敬語|そんけいご}（ご{覧|らん}に なる）を {使|つか}ったり するのは {誤|あやま}りです。',
    reviewed: true
  },
  {
    id: 'japanese_g9_haiku_002', subject: 'japanese', gradeLevel: 9, unit: 'haiku',
    difficulty: 'standard', answerType: 'choice',
    question: '{俳句|はいく}「{名月|めいげつ}や {池|いけ}を めぐりて {夜|よ}もすがら」（{松尾芭蕉|まつおばしょう}）の {季語|きご}「{名月|めいげつ}」の {季節|きせつ}は どれか。',
    choices: ['{秋|あき}', '{春|はる}', '{夏|なつ}', '{冬|ふゆ}'],
    answer: '{秋|あき}',
    hints: ['「{名月|めいげつ}」は {旧暦|きゅうれき}8{月|がつ}15{日|にち}の {月|つき}（{中秋|ちゅうしゅう}の {名月|めいげつ}）。', 'お{月見|つきみ}を する {季節|きせつ}を {考|かんが}えよう。'],
    explanation: '「{名月|めいげつ}」は {秋|あき}の {季語|きご}です。{俳句|はいく}では、ただ「{月|つき}」と いう だけでも {秋|あき}の {季語|きご}に なります。',
    inputForm: { question: '{俳句|はいく}「{名月|めいげつ}や {池|いけ}を めぐりて {夜|よ}もすがら」（{松尾芭蕉|まつおばしょう}）の {季語|きご}「{名月|めいげつ}」の 季節は 何か。', acceptedAnswers: ['あき'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g9_waka_003', subject: 'japanese', gradeLevel: 9, unit: 'waka',
    difficulty: 'standard', answerType: 'choice',
    question: '{枕詞|まくらことば}「ひさかたの」が かかる {言葉|ことば}は どれか。',
    choices: ['{光|ひかり}', '{山|やま}', '{母|はは}', '{奈良|なら}'],
    answer: '{光|ひかり}',
    hints: ['「ひさかたの」は {天|てん}や {空|そら}に かんけいする {言葉|ことば}を {導|みちび}く。', '「あしひきの」は {山|やま}、「たらちねの」は {母|はは}、「あをによし」は {奈良|なら}に かかる。'],
    explanation: '「ひさかたの」は「{光|ひかり}」「{天|あめ}」「{空|そら}」「{月|つき}」などに かかる {枕詞|まくらことば}です。「ひさかたの {光|ひかり}のどけき {春|はる}の{日|ひ}に」（{紀友則|きのとものり}）が よく {知|し}られて います。',
    reviewed: true
  },
  {
    id: 'japanese_g9_idiom_001', subject: 'japanese', gradeLevel: 9, unit: 'idiom',
    difficulty: 'standard', answerType: 'choice',
    question: '「{成功|せいこう}した {例|れい}は {枚挙|まいきょ}に いとまが ない。」の「{枚挙|まいきょ}に いとまが ない」の {意味|いみ}は どれか。',
    choices: ['{多|おお}すぎて {一|ひと}つ{一|ひと}つ {数|かぞ}えきれない', '{数|かぞ}える ひまが なく いそがしい', 'まったく {例|れい}が ない', '{数|かぞ}えるのが めんどうで やめる'],
    answer: '{多|おお}すぎて {一|ひと}つ{一|ひと}つ {数|かぞ}えきれない',
    hints: ['「{枚挙|まいきょ}」は {一|ひと}つ{一|ひと}つ {数|かぞ}えあげる こと。', '「いとま」は {時間|じかん}の よゆう。{数|かぞ}えあげる {時間|じかん}が たりない ほど…。'],
    explanation: '「{枚挙|まいきょ}に いとまが ない」は、{一|ひと}つ{一|ひと}つ {数|かぞ}えあげて いたら きりが ない ほど {多|おお}い という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'japanese_g9_kanbun_001', subject: 'japanese', gradeLevel: 9, unit: 'kanbun',
    difficulty: 'advanced', answerType: 'input',
    question: '{漢文|かんぶん}「{登|}レ{山|}」を {書|か}き{下|くだ}し{文|ぶん}に しなさい。（ひらがなだけで {書|か}いても よい）',
    answer: '山に登る', acceptedAnswers: ['やまにのぼる', '山にのぼる', 'やまに登る'], answerDisplay: '{山|やま}に{登|のぼ}る', validationMode: 'exact',
    hints: ['レ{点|てん}は、すぐ {下|した}の {一字|いちじ}を {先|さき}に {読|よ}んで、{上|うえ}の {字|じ}に {返|かえ}る しるし。', '{日本語|にほんご}の {順|じゅん}では「〜に」を {補|おぎな}って {読|よ}む。'],
    explanation: 'レ{点|てん}が あるので「{山|やま}」を {先|さき}に {読|よ}み、「{登|のぼ}」に {返|かえ}ります。{送|おく}りがなを {補|おぎな}って「{山|やま}に{登|のぼ}る」と {書|か}き{下|くだ}します。',
    reviewed: true
  },
  {
    id: 'japanese_g9_grammar_002', subject: 'japanese', gradeLevel: 9, unit: 'grammar',
    difficulty: 'advanced', answerType: 'input',
    question: '「もっと {速|はや}く {走|はし}れ。」の「{走|はし}れ」の {活用形|かつようけい}を {漢字|かんじ}で {書|か}きなさい。',
    answer: '命令形', answerDisplay: '{命令形|めいれいけい}', acceptedAnswers: ['めいれいけい'], validationMode: 'exact',
    hints: ['{相手|あいて}に {何|なに}かを させようと する {言|い}い{方|かた}。', '「{走|はし}れば」の「{走|はし}れ」とは ちがい、ここでは {言|い}い{切|き}って いる。'],
    explanation: '{命令|めいれい}して {言|い}い{切|き}る {形|かたち}なので {命令形|めいれいけい}です。「{走|はし}れば」のように「ば」に {続|つづ}く「{走|はし}れ」は {仮定形|かていけい}です。',
    reviewed: true
  },
  {
    id: 'japanese_g9_literature_002', subject: 'japanese', gradeLevel: 9, unit: 'literature',
    difficulty: 'advanced', answerType: 'choice',
    question: '{罪人|ざいにん}を {舟|ふね}で {送|おく}る {役人|やくにん}と {罪人|ざいにん}の {喜助|きすけ}との やりとりを えがいた {小説|しょうせつ}『{高瀬舟|たかせぶね}』の {作者|さくしゃ}は だれか。',
    choices: ['{森鷗外|もりおうがい}', '{夏目漱石|なつめそうせき}', '{芥川龍之介|あくたがわりゅうのすけ}', '{太宰治|だざいおさむ}'],
    answer: '{森鷗外|もりおうがい}',
    hints: ['{明治|めいじ}・{大正|たいしょう}の {作家|さっか}で、{軍医|ぐんい}でも あった。', '『{舞姫|まいひめ}』も この {作家|さっか}の {作品|さくひん}。'],
    explanation: '『{高瀬舟|たかせぶね}』は {森鷗外|もりおうがい}の {作品|さくひん}です。{森鷗外|もりおうがい}は {軍医|ぐんい}として はたらきながら、『{舞姫|まいひめ}』『{山椒大夫|さんしょうだゆう}』などを {書|か}きました。',
    inputForm: { acceptedAnswers: ['森鴎外', 'もりおうがい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'japanese_g9_yoji_004', subject: 'japanese', gradeLevel: 9, unit: 'yoji',
    difficulty: 'advanced', answerType: 'choice',
    question: '{四字熟語|よじじゅくご}「{五里霧中|ごりむちゅう}」の {意味|いみ}として {正|ただ}しい ものは どれか。',
    choices: ['{手|て}がかりが なく、どうすれば よいか わからない こと', '{遠|とお}くの ことまで よく {見通|みとお}せる こと', '{少|すこ}しずつ {着実|ちゃくじつ}に {進|すす}む こと', '{霧|きり}の {日|ひ}は {出歩|である}かない ほうが よい こと'],
    answer: '{手|て}がかりが なく、どうすれば よいか わからない こと',
    hints: ['{五里|ごり}（{約|やく}20キロメートル）も {続|つづ}く {深|ふか}い {霧|きり}の {中|なか}に いる ようす。', '{周|まわ}りが {見|み}えず、{方向|ほうこう}が わからない。'],
    explanation: '「{五里霧中|ごりむちゅう}」は、{深|ふか}い {霧|きり}の {中|なか}で {方向|ほうこう}が わからない ように、{手|て}がかりが なく {迷|まよ}う ことを {表|あらわ}します。「{五里夢中|ごりむちゅう}」と {書|か}く まちがいが {多|おお}いので {注意|ちゅうい}しましょう。',
    reviewed: true
  }
);
