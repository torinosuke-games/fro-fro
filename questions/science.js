// 問題データ：理科（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。人が内容を確認したら true にする（フェーズ7の問題と v0.3 で追加した問題は、どちらも 2026-09-26 に確認済み）。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// Lv1〜2 は生活科に相当する内容（季節・生き物・植物・身近な自然）。
// v0.3（SPEC_v0.3.md 4章・B案）で各学年18問を足して27問にした：基礎6（4択3・自由入力3）、標準15（自由入力9・4択6）、発展6（自由入力3・4択3）。
// 追加した問題は、Lv1〜2 をひらがな・カタカナだけで書き、Lv3 以上は漢字にすべて {漢字|よみ} を明示している。
window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(

  // ===== Lv1（小学1年・生活科相当） =====
  {
    id: 'science_g1_season_001', subject: 'science', gradeLevel: 1, unit: 'season',
    difficulty: 'basic', answerType: 'choice',
    question: 'あさがおの たねを まくのに よい きせつは いつかな。',
    choices: ['はる', 'なつ', 'あき', 'ふゆ'],
    answer: 'はる',
    hints: ['あたたかく なって きた ころに まくよ。', 'なつに はなが さくように、その まえの きせつに まこう。'],
    explanation: 'あさがおは はる（4〜5がつごろ）に たねを まくと、なつに はなが さきます。',
    inputForm: { acceptedAnswers: ['春'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_weather_001', subject: 'science', gradeLevel: 1, unit: 'weather',
    difficulty: 'basic', answerType: 'input',
    question: 'あめが やんだ あと、そらに でる なないろの ながい はしのような ものを なんと いうかな。ひらがなで かこう。',
    answer: 'にじ', acceptedAnswers: ['虹'], validationMode: 'kana-insensitive',
    hints: ['あか・だいだい・きいろ・みどり…と いろが ならんで いるよ。', 'ひらがな 2もじの ことばだよ。'],
    explanation: 'あめの あとに おひさまが でると、そらに「にじ」が みえる ことが あります。',
    reviewed: true
  },
  {
    id: 'science_g1_animal_001', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: 'おたまじゃくしが おおきく なると、なにに なるかな。',
    answer: 'かえる', acceptedAnswers: ['カエル'], validationMode: 'kana-insensitive',
    hints: ['おおきく なると、あしが はえて しっぽが なくなるよ。', 'いけや たんぼで「ケロケロ」と なくよ。'],
    explanation: 'おたまじゃくしは、あしが はえて しっぽが なくなり、「かえる」に なります。',
    reviewed: true
  },
  {
    id: 'science_g1_water_001', subject: 'science', gradeLevel: 1, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: 'ゆきだるまを あたたかい ところに おいて おくと、とけて なにに なるかな。ひらがなで かこう。',
    answer: 'みず', acceptedAnswers: ['水'], validationMode: 'kana-insensitive',
    hints: ['ゆきは つめたい ときに かたまって いるよ。', 'あたたかく なると、ながれる ものに かわるよ。'],
    explanation: 'ゆきや こおりは、あたたかく なると とけて「みず」に なります。',
    reviewed: true
  },
  {
    id: 'science_g1_plant_001', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: 'あさがおを そだてて います。つちが からからに かわいて いたら、なにを あげると よいかな。ひらがなで かこう。',
    answer: 'みず', acceptedAnswers: ['水'], validationMode: 'kana-insensitive',
    hints: ['しょくぶつが いきるのに ひつような ものだよ。', 'じょうろで あげるよ。'],
    explanation: 'つちが かわいて いたら、じょうろで「みず」を あげましょう。',
    reviewed: true
  },
  {
    id: 'science_g1_animal_002', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'choice',
    question: 'だんごむしを そっと さわると、どう なるかな。',
    choices: ['まるく なる', 'とんで にげる', 'おおきな こえで なく', 'いろが かわる'],
    answer: 'まるく なる',
    hints: ['なまえに ヒントが あるよ。', '「だんご」の ような かたちに なるよ。'],
    explanation: 'だんごむしは さわられると、からだを まるめて「だんご」の ような かたちに なり、みを まもります。',
    inputForm: { answer: 'まるくなる', acceptedAnswers: ['まるく なる', '丸くなる', '丸く なる', 'まるまる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_insect_001', subject: 'science', gradeLevel: 1, unit: 'insect',
    difficulty: 'standard', answerType: 'choice',
    question: 'なつに きのみきに とまって、「ミーンミーン」と なく むしは どれかな。',
    choices: ['せみ', 'すずむし', 'こおろぎ', 'ちょう'],
    answer: 'せみ',
    hints: ['すずむしや こおろぎは あきに なく むしだよ。', 'きに とまって おおきな こえで なくよ。'],
    explanation: 'なつに きに とまって なくのは「せみ」です。すずむしや こおろぎは あきの よるに なきます。',
    inputForm: { question: 'なつに きのみきに とまって、「ミーンミーン」と なく むしは なにかな。', acceptedAnswers: ['セミ', '蝉', 'みんみんぜみ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_plant_002', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'advanced', answerType: 'input',
    question: 'あさがおの めが でて、さいしょに ひらく 2まいの まるい はっぱを なんと いうかな。ひらがなで かこう。',
    answer: 'ふたば', acceptedAnswers: ['双葉', '子葉', 'しよう'], validationMode: 'kana-insensitive',
    hints: ['「2まい」の はっぱ だから、「ふた〇」だよ。', 'あとから でて くる はっぱとは かたちが ちがうよ。'],
    explanation: 'めが でて さいしょに ひらく 2まいの はっぱを「ふたば」と いいます。',
    reviewed: true
  },
  {
    id: 'science_g1_animal_003', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'advanced', answerType: 'choice',
    question: 'さむい ふゆの あいだ、かえるは どう して いるかな。',
    choices: ['つちの なかで じっと して ふゆを こす', 'いけで げんきに およぐ', 'みなみの くにへ とんで いく', 'ゆきの うえで あそぶ'],
    answer: 'つちの なかで じっと して ふゆを こす',
    hints: ['ふゆに かえるを みかける ことは あるかな。', 'さむい あいだは ねむった ように して すごすよ。'],
    explanation: 'かえるは ふゆの あいだ、つちの なかなどで じっと して すごします（とうみん）。はるに なると でて きます。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g1_season_002', subject: 'science', gradeLevel: 1, unit: 'season',
    difficulty: 'basic', answerType: 'choice',
    question: 'そらから ゆきが ふって くるのは、どの きせつが おおいかな。',
    choices: ['ふゆ', 'はる', 'なつ', 'あき'],
    answer: 'ふゆ',
    hints: ['いちばん さむい きせつだよ。', 'ゆきだるまを つくって あそぶ きせつだよ。'],
    explanation: 'ゆきは さむい「ふゆ」に ふる ことが おおいです。',
    inputForm: { acceptedAnswers: ['冬'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_plant_003', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'basic', answerType: 'choice',
    question: 'なつに さく ひまわりの はなびらは、なにいろかな。',
    choices: ['きいろ', 'あお', 'くろ', 'みずいろ'],
    answer: 'きいろ',
    hints: ['おひさまの ような あかるい いろだよ。', 'バナナの かわと にた いろだよ。'],
    explanation: 'ひまわりの はなびらは「きいろ」です。おひさまの ほうを むいて さくと いわれます。',
    inputForm: { acceptedAnswers: ['黄色', 'きいろい', '黄'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_animal_004', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'basic', answerType: 'input',
    question: '「ワンワン」と なく どうぶつは なにかな。ひらがなで かこう。',
    answer: 'いぬ', acceptedAnswers: ['犬'], validationMode: 'kana-insensitive',
    hints: ['さんぽに つれて いく ことが おおい どうぶつだよ。', '「ニャー」と なくのは ねこだね。'],
    explanation: '「ワンワン」と なくのは「いぬ」です。',
    reviewed: true
  },
  {
    id: 'science_g1_weather_002', subject: 'science', gradeLevel: 1, unit: 'weather',
    difficulty: 'basic', answerType: 'input',
    question: 'そとに でる とき かさを さすのは、そらから なにが ふって いる ときかな。ひらがなで かこう。',
    answer: 'あめ', acceptedAnswers: ['雨'], validationMode: 'kana-insensitive',
    hints: ['みずの つぶが そらから おちて くるよ。', 'ながぐつを はいて でかけるよ。'],
    explanation: '「あめ」が ふって いる ときは、かさを さして ぬれないように します。',
    reviewed: true
  },
  {
    id: 'science_g1_insect_002', subject: 'science', gradeLevel: 1, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: 'はなの みつを あつめて、あまい はちみつを つくる むしは なにかな。ひらがなで かこう。',
    answer: 'みつばち', acceptedAnswers: ['はち', 'ミツバチ', 'ハチ'], validationMode: 'kana-insensitive',
    hints: ['きいろと くろの しましまの むしだよ。', 'さされると いたいので、そっと みようね。'],
    explanation: '「みつばち」は はなの みつを あつめて、すの なかで はちみつを つくります。',
    reviewed: true
  },
  {
    id: 'science_g1_animal_005', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: 'にわとりが うむ、まるくて からの かたい ものは なにかな。ひらがなで かこう。',
    answer: 'たまご', acceptedAnswers: ['卵', 'タマゴ'], validationMode: 'kana-insensitive',
    hints: ['あたためると ひよこが うまれるよ。', 'めだまやきに して たべるよ。'],
    explanation: 'にわとりは「たまご」を うみます。あたためると、なかから ひよこが うまれます。',
    reviewed: true
  },
  {
    id: 'science_g1_plant_004', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: 'あさがおの はなが ひらくのは、1にちの うち いつごろかな。ひらがなで かこう。',
    answer: 'あさ', acceptedAnswers: ['朝', 'あさがた'], validationMode: 'kana-insensitive',
    hints: ['はなの なまえに ヒントが あるよ。', 'がっこうへ いく まえの じかんだよ。'],
    explanation: 'あさがおは「あさ」に はなが ひらき、ひるすぎには しぼんで しまいます。',
    reviewed: true
  },
  {
    id: 'science_g1_season_003', subject: 'science', gradeLevel: 1, unit: 'season',
    difficulty: 'standard', answerType: 'input',
    question: 'せみが たくさん ないて いるのは、どの きせつかな。ひらがなで かこう。',
    answer: 'なつ', acceptedAnswers: ['夏'], validationMode: 'kana-insensitive',
    hints: ['プールや うみで およぐ きせつだよ。', 'いちばん あつい きせつだよ。'],
    explanation: 'せみは あつい「なつ」に たくさん なきます。',
    reviewed: true
  },
  {
    id: 'science_g1_animal_006', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: 'かめの せなかに ある、かたい いえの ような ものを なんと いうかな。ひらがなで かこう。',
    answer: 'こうら', acceptedAnswers: ['甲羅'], validationMode: 'kana-insensitive',
    hints: ['あぶない ときは、あたまや あしを この なかに ひっこめるよ。', '「こ」から はじまる 3もじの ことばだよ。'],
    explanation: 'かめの せなかの かたい ものを「こうら」と いいます。あぶない ときは、こうらの なかに あたまや あしを ひっこめて みを まもります。',
    reviewed: true
  },
  {
    id: 'science_g1_air_001', subject: 'science', gradeLevel: 1, unit: 'air',
    difficulty: 'standard', answerType: 'input',
    question: 'ふうせんを ふくらませる とき、くちから ふきこんで いる ものは なにかな。ひらがなで かこう。',
    answer: 'くうき', acceptedAnswers: ['空気', 'いき', '息'], validationMode: 'kana-insensitive',
    hints: ['めには みえないけれど、わたしたちの まわりに いっぱい あるよ。', 'すったり はいたり して いる ものだよ。'],
    explanation: 'ふうせんには、くちから はいた「くうき（いき）」が はいって ふくらみます。',
    reviewed: true
  },
  {
    id: 'science_g1_insect_003', subject: 'science', gradeLevel: 1, unit: 'insect',
    difficulty: 'standard', answerType: 'choice',
    question: 'あきの よるに「リーンリーン」と きれいな こえで なく むしは どれかな。',
    choices: ['すずむし', 'せみ', 'ちょう', 'みつばち'],
    answer: 'すずむし',
    hints: ['なまえに「すず」が はいって いるよ。', 'せみは なつの ひるに なく むしだね。'],
    explanation: 'あきの よるに「リーンリーン」と なくのは「すずむし」です。すずの ような きれいな こえで なきます。',
    inputForm: { question: 'あきの よるに「リーンリーン」と きれいな こえで なく むしは なにかな。', acceptedAnswers: ['鈴虫'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_plant_005', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'standard', answerType: 'choice',
    question: 'たんぽぽの はなが おわった あとに できて、かぜで とんで いく ものは どれかな。',
    choices: ['わたげ', 'どんぐり', 'まつぼっくり', 'つぼみ'],
    answer: 'わたげ',
    hints: ['ふわふわ して いて、ふうっと ふくと とんで いくよ。', 'さきに たねが ついて いるよ。'],
    explanation: 'たんぽぽは はなが おわると「わたげ」が できます。わたげは かぜに のって とび、とおくで たねから めを だします。',
    inputForm: { question: 'たんぽぽの はなが おわった あとに できて、かぜで とんで いく ものを なんと いうかな。', acceptedAnswers: ['綿毛'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_animal_007', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'choice',
    question: 'さかなが みずの なかで いきを する ための ところは どれかな。',
    choices: ['えら', 'はな', 'みみ', 'しっぽ'],
    answer: 'えら',
    hints: ['あたまの よこに ある、ぱくぱく うごく ところだよ。', 'さかなは みずの なかでも くるしく ならないね。'],
    explanation: 'さかなは あたまの よこに ある「えら」で、みずに とけて いる くうきを とりいれて いきを して います。',
    inputForm: { question: 'さかなが みずの なかで いきを する ための ところを なんと いうかな。', acceptedAnswers: ['鰓'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g1_weather_003', subject: 'science', gradeLevel: 1, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: 'かぜが つよく ふいて いる ことが わかる ようすは どれかな。',
    choices: ['きの えだが おおきく ゆれて いる', 'みずたまりが しずかで ゆれない', 'くもが ひとつも ない', 'はっぱが じっと して いる'],
    answer: 'きの えだが おおきく ゆれて いる',
    hints: ['かぜは めに みえないけれど、ものを うごかすよ。', 'かぜが あたると、きの えだや はっぱは どう なるかな。'],
    explanation: 'かぜは めに みえませんが、つよく ふくと きの えだが おおきく ゆれるので、かぜが ある ことが わかります。',
    reviewed: true
  },
  {
    id: 'science_g1_shadow_001', subject: 'science', gradeLevel: 1, unit: 'shadow',
    difficulty: 'advanced', answerType: 'input',
    question: 'はれた ひ、じぶんの かげが いちばん みじかく なるのは、1にちの うち いつごろかな。ひらがなで かこう。',
    answer: 'ひる', acceptedAnswers: ['おひる', '昼', 'ひるごろ', 'おひるごろ', 'しょうご', '正午'], validationMode: 'kana-insensitive',
    hints: ['おひさまが そらの いちばん たかい ところに ある ときだよ。', 'きゅうしょくを たべる ころだよ。'],
    explanation: 'おひさまが いちばん たかく なる「ひる」ごろ、かげは いちばん みじかく なります。あさや ゆうがたは、かげが ながく なります。',
    reviewed: true
  },
  {
    id: 'science_g1_plant_006', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'advanced', answerType: 'input',
    question: 'あさがおの つるが まきついて のびて いけるように、うえきばちに たてる ものは なにかな。ひらがなで かこう。',
    answer: 'ぼう', acceptedAnswers: ['棒', 'しちゅう', '支柱'], validationMode: 'kana-insensitive',
    hints: ['ほそながくて、まっすぐな ものだよ。', 'つるは これに ぐるぐる まきついて うえへ のびるよ。'],
    explanation: 'あさがおの つるは、たてた「ぼう（しちゅう）」に まきついて うえへ のびて いきます。',
    reviewed: true
  },
  {
    id: 'science_g1_season_004', subject: 'science', gradeLevel: 1, unit: 'season',
    difficulty: 'advanced', answerType: 'choice',
    question: 'はるに なると みられる ようすは どれかな。',
    choices: ['さくらの はなが さく', 'せみが たくさん なく', 'もみじの はっぱが あかく なる', 'ゆきが つもる'],
    answer: 'さくらの はなが さく',
    hints: ['あたたかく なって きた ころの ようすだよ。', 'にゅうがくしきの ころに さく ピンクの はなだよ。'],
    explanation: 'はるには さくらの はなが さきます。せみが なくのは なつ、もみじが あかく なるのは あき、ゆきが つもるのは ふゆです。',
    reviewed: true
  },
  {
    id: 'science_g1_insect_004', subject: 'science', gradeLevel: 1, unit: 'insect',
    difficulty: 'advanced', answerType: 'choice',
    question: 'かぶとむしの ようちゅうが すんで いる ところは どこかな。',
    choices: ['つちの なか', 'みずの なか', 'はっぱの うえ', 'はなの なか'],
    answer: 'つちの なか',
    hints: ['しろくて まるまった ようちゅうは、くさった はっぱの つちを たべるよ。', 'なつに おとなに なって、つちから でて くるよ。'],
    explanation: 'かぶとむしの ようちゅうは「つちの なか」で、くさった はっぱなどを たべて おおきく なります。さなぎを へて、なつに おとなに なって でて きます。',
    inputForm: { answer: 'つちのなか', acceptedAnswers: ['つちの なか', '土の中', '土の なか', 'つち', '土'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv2（小学2年・生活科相当） =====
  {
    id: 'science_g2_plant_001', subject: 'science', gradeLevel: 2, unit: 'plant',
    difficulty: 'basic', answerType: 'choice',
    question: 'ミニトマトの みは、できた ばかりの ときは なにいろかな。',
    choices: ['みどり', 'あか', 'きいろ', 'むらさき'],
    answer: 'みどり',
    hints: ['はっぱと にた いろだよ。', 'だんだん いろが かわって、あかく なるよ。'],
    explanation: 'ミニトマトの みは、はじめは「みどり」いろで、じゅくすと あかく なります。',
    inputForm: { acceptedAnswers: ['緑', 'みどりいろ', '緑色'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g2_water_001', subject: 'science', gradeLevel: 2, unit: 'water',
    difficulty: 'basic', answerType: 'input',
    question: 'みずを れいとうこに いれて ひえると、なにに なるかな。ひらがなで かこう。',
    answer: 'こおり', acceptedAnswers: ['氷'], validationMode: 'kana-insensitive',
    hints: ['つめたくて かたい ものに なるよ。', 'ジュースに いれて ひやす ものだよ。'],
    explanation: 'みずは つめたく ひやすと、かたい「こおり」に なります。',
    reviewed: true
  },
  {
    id: 'science_g2_animal_001', subject: 'science', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: 'ザリガニの からだの まえに ついて いる、ものを はさむ「はさみ」は いくつ あるかな。かずで こたえよう。',
    answer: '2', acceptedAnswers: ['2こ', '2つ'], validationMode: 'number',
    hints: ['みぎと ひだりに あるよ。', 'かにの はさみと おなじ かずだよ。'],
    explanation: 'ザリガニの はさみは、みぎと ひだりに 1つずつ、あわせて 2つ あります。',
    reviewed: true
  },
  {
    id: 'science_g2_toy_001', subject: 'science', gradeLevel: 2, unit: 'toy',
    difficulty: 'standard', answerType: 'input',
    question: 'かざぐるまを そとに もって いくと、くるくる まわりました。かざぐるまを まわした ものは なにかな。ひらがなで かこう。',
    answer: 'かぜ', acceptedAnswers: ['風'], validationMode: 'kana-insensitive',
    hints: ['「かざ ぐるま」の なまえに ヒントが あるよ。', 'めには みえないけれど、ふくと きの はっぱが ゆれるよ。'],
    explanation: '「かぜ」が あたると、かざぐるまは まわります。かぜが つよいほど よく まわります。',
    reviewed: true
  },
  {
    id: 'science_g2_insect_001', subject: 'science', gradeLevel: 2, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: 'モンシロチョウの ようちゅう（あおむし）が たべる はっぱは なにかな。かたかなで かこう。（はたけで そだてる やさいだよ）',
    answer: 'キャベツ', acceptedAnswers: ['ブロッコリー', 'アブラナ', 'なのはな', '菜の花', 'ダイコン', 'ハクサイ', 'コマツナ'], validationMode: 'kana-insensitive',
    hints: ['まるくて、はっぱが なんまいも かさなった やさいだよ。', 'とんかつの よこに きざんで そえる ことが あるよ。'],
    explanation: 'あおむしは「キャベツ」など、アブラナの なかまの はっぱを たべて おおきく なります。',
    reviewed: true
  },
  {
    id: 'science_g2_season_001', subject: 'science', gradeLevel: 2, unit: 'season',
    difficulty: 'standard', answerType: 'choice',
    question: 'こうえんで どんぐりが たくさん おちて いるのは、どの きせつかな。',
    choices: ['あき', 'はる', 'なつ', 'ふゆの おわり'],
    answer: 'あき',
    hints: ['はっぱが あかや きいろに なる ころだよ。', 'くりや かきが みのる きせつだよ。'],
    explanation: 'どんぐりは「あき」に みのって おちます。はっぱが いろづく ころです。',
    inputForm: { acceptedAnswers: ['秋'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g2_shadow_001', subject: 'science', gradeLevel: 2, unit: 'shadow',
    difficulty: 'standard', answerType: 'choice',
    question: 'はれた ひに そとに たつと、じぶんの かげは どちらがわに できるかな。',
    choices: ['おひさまの はんたいがわ', 'おひさまと おなじ がわ', 'じぶんの まうえ', 'かげは できない'],
    answer: 'おひさまの はんたいがわ',
    hints: ['おひさまの ひかりを じぶんの からだが さえぎるよ。', 'ひかりが とどかない ところに かげが できるよ。'],
    explanation: 'からだが おひさまの ひかりを さえぎるので、かげは おひさまの「はんたいがわ」に できます。',
    reviewed: true
  },
  {
    id: 'science_g2_plant_002', subject: 'science', gradeLevel: 2, unit: 'plant',
    difficulty: 'advanced', answerType: 'input',
    question: 'ひまわりの はなが かれた あと、はなの まんなかに たくさん できる ものは なにかな。ひらがなで かこう。',
    answer: 'たね', acceptedAnswers: ['種'], validationMode: 'kana-insensitive',
    hints: ['つぎの としに まくと、また めが でるよ。', 'ハムスターが よく たべるよ。'],
    explanation: 'ひまわりの はなが かれると、まんなかに たくさんの「たね」が できます。',
    reviewed: true
  },
  {
    id: 'science_g2_insect_002', subject: 'science', gradeLevel: 2, unit: 'insect',
    difficulty: 'advanced', answerType: 'choice',
    question: 'たまごから うまれて、さなぎに ならずに おとなに なる むしは どれかな。',
    choices: ['バッタ', 'チョウ', 'カブトムシ', 'テントウムシ'],
    answer: 'バッタ',
    hints: ['ようちゅうの ときから おとなと にた かたちを して いる むしだよ。', 'くさむらで ぴょんと はねる むしだよ。'],
    explanation: 'バッタは たまご → ようちゅう → せいちゅう と そだち、さなぎに なりません。チョウ・カブトムシ・テントウムシは さなぎに なります。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g2_animal_002', subject: 'science', gradeLevel: 2, unit: 'animal',
    difficulty: 'basic', answerType: 'choice',
    question: 'ザリガニが すんで いるのは どんな ところかな。',
    choices: ['たんぼや いけ', 'うみの そこ', 'たかい やまの うえ', 'すなばかりの さばく'],
    answer: 'たんぼや いけ',
    hints: ['みずの なかで くらす いきものだよ。', 'しおからい うみでは なく、たんすいの ところだよ。'],
    explanation: 'ザリガニは、たんぼや いけ、ながれの ゆるやかな かわなど、しおからく ない みずの なかに すんで います。',
    reviewed: true
  },
  {
    id: 'science_g2_plant_003', subject: 'science', gradeLevel: 2, unit: 'plant',
    difficulty: 'basic', answerType: 'choice',
    question: 'つちの なかに できた ところを たべる やさいは どれかな。',
    choices: ['さつまいも', 'ミニトマト', 'なす', 'きゅうり'],
    answer: 'さつまいも',
    hints: ['いもほりで つちを ほって とる やさいだよ。', 'ミニトマト・なす・きゅうりは、くきに ぶらさがって できるね。'],
    explanation: '「さつまいも」は つちの なかで おおきく なった ところを ほって たべます。ミニトマト・なす・きゅうりは、はなが さいた あとに できる みを たべます。',
    reviewed: true
  },
  {
    id: 'science_g2_season_002', subject: 'science', gradeLevel: 2, unit: 'season',
    difficulty: 'basic', answerType: 'input',
    question: 'はるに ピンクの はなを たくさん さかせて、おはなみを する きは なにかな。ひらがなで かこう。',
    answer: 'さくら', acceptedAnswers: ['桜', 'サクラ'], validationMode: 'kana-insensitive',
    hints: ['にゅうがくしきの ころに さく ことが おおいよ。', 'はなびらが ひらひらと ちるよ。'],
    explanation: 'はるに ピンクの はなを さかせ、おはなみを するのは「さくら」です。',
    reviewed: true
  },
  {
    id: 'science_g2_toy_002', subject: 'science', gradeLevel: 2, unit: 'toy',
    difficulty: 'basic', answerType: 'input',
    question: 'ゴムで とばす おもちゃを つくりました。ゴムを ながく のばすほど、とぶ ちからは つよく なるかな、よわく なるかな。ひらがなで かこう。',
    answer: 'つよくなる', acceptedAnswers: ['つよく なる', 'つよく', '強くなる', '強く'], validationMode: 'kana-insensitive',
    hints: ['ゴムを ひっぱると、もどろうと する ちからが はたらくよ。', 'たくさん のばした ほうが、もどる いきおいは どうかな。'],
    explanation: 'ゴムは ながく のばすほど、もとに もどろうと する ちからが「つよく なります」。だから おもちゃは とおくまで とびます。',
    reviewed: true
  },
  {
    id: 'science_g2_insect_003', subject: 'science', gradeLevel: 2, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: 'てんとうむしが よく たべる、はっぱや くきに つく ちいさな むしは なにかな。かたかなで かこう。',
    answer: 'アブラムシ', acceptedAnswers: ['ありまき', 'アリマキ'], validationMode: 'kana-insensitive',
    hints: ['みどりいろや くろい ちいさな むしで、しょくぶつの しるを すうよ。', '「アブラ」から はじまる なまえだよ。'],
    explanation: 'てんとうむし（ナナホシテントウ）は「アブラムシ」を たべます。アブラムシは しょくぶつの しるを すって よわらせるので、てんとうむしは はたけの みかたです。',
    reviewed: true
  },
  {
    id: 'science_g2_plant_004', subject: 'science', gradeLevel: 2, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: 'ミニトマトの はなは、なにいろかな。ひらがなで かこう。',
    answer: 'きいろ', acceptedAnswers: ['黄色', 'きいろい'], validationMode: 'kana-insensitive',
    hints: ['みは あかく なるけれど、はなは ちがう いろだよ。', 'ひよこの ような いろだよ。'],
    explanation: 'ミニトマトの はなは「きいろ」です。はなが さいた あとに みが できて、みどりから あかに かわります。',
    reviewed: true
  },
  {
    id: 'science_g2_animal_003', subject: 'science', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: 'かえるの こどもで、みずの なかを しっぽで およぐ ものを なんと いうかな。ひらがなで かこう。',
    answer: 'おたまじゃくし', acceptedAnswers: ['オタマジャクシ'], validationMode: 'kana-insensitive',
    hints: ['まるい あたまと ながい しっぽの かたちだよ。', 'りょうりで つかう「おたま」に にた かたちだよ。'],
    explanation: 'かえるの こどもは「おたまじゃくし」です。えらで いきを して、しっぽで およぎます。やがて あしが はえて かえるに なります。',
    reviewed: true
  },
  {
    id: 'science_g2_insect_004', subject: 'science', gradeLevel: 2, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: 'キャベツの はっぱを たべて そだった あおむしは、さなぎに なった あと、なにに なるかな。ひらがなで かこう。',
    answer: 'ちょう', acceptedAnswers: ['チョウ', 'ちょうちょ', 'ちょうちょう', 'もんしろちょう', 'モンシロチョウ'], validationMode: 'kana-insensitive',
    hints: ['はねを ひらひら させて はなから はなへ とぶよ。', 'しろい はねの「もんしろ○○○」だよ。'],
    explanation: 'あおむしは さなぎに なり、やがて「ちょう（モンシロチョウ）」に なって とびたちます。',
    reviewed: true
  },
  {
    id: 'science_g2_weather_001', subject: 'science', gradeLevel: 2, unit: 'weather',
    difficulty: 'standard', answerType: 'input',
    question: 'そらが くもで いっぱいで、おひさまが みえない てんきを なんと いうかな。ひらがなで かこう。',
    answer: 'くもり', acceptedAnswers: ['曇り', '曇'], validationMode: 'kana-insensitive',
    hints: ['「はれ」でも「あめ」でも ない てんきだよ。', 'そらが はいいろに みえるよ。'],
    explanation: 'くもが そらいっぱいに ひろがって、おひさまが みえない てんきを「くもり」と いいます。',
    reviewed: true
  },
  {
    id: 'science_g2_shadow_002', subject: 'science', gradeLevel: 2, unit: 'shadow',
    difficulty: 'standard', answerType: 'input',
    question: 'かげは、からだが おひさまの なにを さえぎると できるかな。ひらがなで かこう。',
    answer: 'ひかり', acceptedAnswers: ['光'], validationMode: 'kana-insensitive',
    hints: ['おひさまから とどいて、まわりを あかるく する ものだよ。', 'くらい ところでは かげは できないね。'],
    explanation: 'からだが おひさまの「ひかり」を さえぎると、ひかりが とどかない ところに かげが できます。',
    reviewed: true
  },
  {
    id: 'science_g2_toy_003', subject: 'science', gradeLevel: 2, unit: 'toy',
    difficulty: 'standard', answerType: 'choice',
    question: 'かざぐるまが いちばん よく まわるのは どんな ときかな。',
    choices: ['かぜが つよく ふいて いる とき', 'かぜが ふいて いない とき', 'へやの なかで じっと して いる とき', 'くらい よるの とき'],
    answer: 'かぜが つよく ふいて いる とき',
    hints: ['かざぐるまは かぜを うけて まわるね。', 'かぜが つよいと、はねを おす ちからは どう なるかな。'],
    explanation: 'かざぐるまは かぜを うけて まわるので、「かぜが つよく ふいて いる とき」ほど よく まわります。',
    reviewed: true
  },
  {
    id: 'science_g2_plant_005', subject: 'science', gradeLevel: 2, unit: 'plant',
    difficulty: 'standard', answerType: 'choice',
    question: 'ミニトマトの みは、どこに できるかな。',
    choices: ['はなが さいて いた ところ', 'ねっこの さき', 'はっぱの うら', 'くきの いちばん した'],
    answer: 'はなが さいて いた ところ',
    hints: ['はなが おわった あとの ようすを おもいだそう。', 'はなびらが おちた あとに、ちいさな みどりの たまが できるよ。'],
    explanation: 'ミニトマトは、はなが さいて いた ところに みが できます。はじめは みどりいろで、だんだん あかく なります。',
    reviewed: true
  },
  {
    id: 'science_g2_animal_004', subject: 'science', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'choice',
    question: 'だんごむしを さがすなら、どこが よいかな。',
    choices: ['いしや おちばの したの しめった ところ', 'ひあたりの よい コンクリートの うえ', 'いけの みずの なか', 'たかい きの てっぺん'],
    answer: 'いしや おちばの したの しめった ところ',
    hints: ['だんごむしは かわいた ところが にがてだよ。', 'おちばを たべる ことも あるよ。'],
    explanation: 'だんごむしは、いしや おちばの したの しめった ところに よく います。おちばなどを たべて くらして います。',
    reviewed: true
  },
  {
    id: 'science_g2_season_003', subject: 'science', gradeLevel: 2, unit: 'season',
    difficulty: 'standard', answerType: 'choice',
    question: 'あきに みられる ようすは どれかな。',
    choices: ['いちょうの はっぱが きいろく なる', 'つくしが でて くる', 'せみの ぬけがらが たくさん ある', 'いけに こおりが はる'],
    answer: 'いちょうの はっぱが きいろく なる',
    hints: ['すずしく なって、はっぱの いろが かわる ころだよ。', 'つくしは はる、こおりは ふゆの ようすだね。'],
    explanation: 'あきには、いちょうの はっぱが きいろく なったり、もみじが あかく なったり します。つくしは はる、せみは なつ、こおりが はるのは ふゆの ようすです。',
    reviewed: true
  },
  {
    id: 'science_g2_insect_005', subject: 'science', gradeLevel: 2, unit: 'insect',
    difficulty: 'advanced', answerType: 'input',
    question: 'せみの ようちゅうは、おとなに なるまで どこで くらして いるかな。ひらがなで かこう。',
    answer: 'つちのなか', acceptedAnswers: ['つちの なか', '土の中', 'つち', '土', 'じめんのなか', 'じめんの なか'], validationMode: 'kana-insensitive',
    hints: ['なつに きの みきで ぬけがらを みつける ことが あるね。', 'ようちゅうは、きの ねっこから しるを すって くらすよ。'],
    explanation: 'せみの ようちゅうは、なんねんも「つちの なか」で きの ねっこの しるを すって くらします。おとなに なる とき つちから でて きて、きの みきなどで からを ぬぎます。',
    reviewed: true
  },
  {
    id: 'science_g2_water_002', subject: 'science', gradeLevel: 2, unit: 'water',
    difficulty: 'advanced', answerType: 'input',
    question: 'こおりの はいった つめたい ジュースの コップを おいて おくと、コップの そとがわに つく ものは なにかな。ひらがなで かこう。',
    answer: 'みずてき', acceptedAnswers: ['みず', '水', '水てき', '水滴', 'すいてき', 'しずく', 'みずの つぶ', 'みずのつぶ'], validationMode: 'kana-insensitive',
    hints: ['コップの そとを さわると、ぬれて いるよ。', 'まわりの くうきに まじって いる「すいじょうき」が、つめたい コップで ひやされたよ。'],
    explanation: 'まわりの くうきの なかの めに みえない みず（すいじょうき）が、つめたい コップに ひやされて「みずてき」に なって つきます。ジュースが しみでた わけでは ありません。',
    reviewed: true
  },
  {
    id: 'science_g2_animal_005', subject: 'science', gradeLevel: 2, unit: 'animal',
    difficulty: 'advanced', answerType: 'choice',
    question: 'たまごを うまずに、おかあさんの おなかの なかで あかちゃんが そだって うまれる どうぶつは どれかな。',
    choices: ['うさぎ', 'にわとり', 'かめ', 'めだか'],
    answer: 'うさぎ',
    hints: ['にわとり・かめ・めだかは、たまごから うまれるね。', 'おかあさんの おっぱいを のんで そだつ どうぶつだよ。'],
    explanation: 'うさぎは、おかあさんの おなかの なかで あかちゃんが そだって うまれ、おっぱいを のんで そだちます。にわとり・かめ・めだかは たまごを うみます。',
    reviewed: true
  },
  {
    id: 'science_g2_shadow_003', subject: 'science', gradeLevel: 2, unit: 'shadow',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ゆうがたの かげは、ひるの かげと くらべて どう なるかな。',
    choices: ['ながく なる', 'みじかく なる', 'きえて なくなる', 'おなじ ながさ'],
    answer: 'ながく なる',
    hints: ['ゆうがたの おひさまは、ひくい ところに あるよ。', 'おひさまが ひくいと、ひかりは ななめに あたるね。'],
    explanation: 'ゆうがたは おひさまが ひくい ところに あるので、ひかりが ななめに あたり、かげは ひるより「ながく」なります。',
    inputForm: { answer: 'ながくなる', acceptedAnswers: ['ながく なる', '長くなる', '長く なる', 'のびる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv3（小学3年） =====
  {
    id: 'science_g3_magnet_001', subject: 'science', gradeLevel: 3, unit: 'magnet',
    difficulty: 'basic', answerType: 'choice',
    question: 'じしゃくに {引|ひ}きつけられる ものは どれかな。',
    choices: ['{鉄|てつ}の くぎ', 'アルミニウムの かん', '10{円玉|えんだま}', 'ガラスの コップ'],
    answer: '{鉄|てつ}の くぎ',
    hints: ['じしゃくに {引|ひ}きつけられるのは、{金属|きんぞく}の {中|なか}でも {一部|いちぶ}だけだよ。', 'アルミニウムや {銅|どう}（10{円玉|えんだま}）は {引|ひ}きつけられないよ。'],
    explanation: 'じしゃくに {引|ひ}きつけられるのは {鉄|てつ}などです。アルミニウムや {銅|どう}は {金属|きんぞく}でも {引|ひ}きつけられません。',
    reviewed: true
  },
  {
    id: 'science_g3_insect_001', subject: 'science', gradeLevel: 3, unit: 'insect',
    difficulty: 'basic', answerType: 'input',
    question: 'こん{虫|ちゅう}の {体|からだ}は、いくつの {部分|ぶぶん}に {分|わ}かれて いるかな。{数|かず}で {答|こた}えよう。',
    answer: '3', acceptedAnswers: ['3つ'], validationMode: 'number',
    hints: ['{頭|あたま}・むね・…', 'あしが ついて いるのは「むね」だよ。'],
    explanation: 'こん{虫|ちゅう}の {体|からだ}は「{頭|あたま}・むね・はら」の 3つの {部分|ぶぶん}に {分|わ}かれて います。',
    reviewed: true
  },
  {
    id: 'science_g3_insect_002', subject: 'science', gradeLevel: 3, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: 'こん{虫|ちゅう}の あしは {何本|なんぼん}かな。{数|かず}で {答|こた}えよう。',
    answer: '6', acceptedAnswers: ['6本'], validationMode: 'number',
    hints: ['あしは すべて むねに ついて いるよ。', '{左右|さゆう}に 3{本|ぼん}ずつ あるよ。'],
    explanation: 'こん{虫|ちゅう}の あしは、むねに {左右|さゆう} 3{本|ぼん}ずつ、あわせて 6{本|ぽん}です。（クモは あしが 8{本|ほん}なので こん{虫|ちゅう}では ありません）',
    reviewed: true
  },
  {
    id: 'science_g3_plant_001', subject: 'science', gradeLevel: 3, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: '{植物|しょくぶつ}の {体|からだ}で、{土|つち}の {中|なか}に あって {水|みず}を すい{上|あ}げる {部分|ぶぶん}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'ね', acceptedAnswers: ['根'], validationMode: 'kana-insensitive',
    hints: ['{植物|しょくぶつ}の {体|からだ}は「○・くき・{葉|は}」で できて いるよ。', 'ひらがな 1{文字|もじ}だよ。'],
    explanation: '{土|つち}の {中|なか}に あって {水|みず}を すい{上|あ}げるのは「{根|ね}」です。{植物|しょくぶつ}の {体|からだ}は {根|ね}・くき・{葉|は}で できて います。',
    reviewed: true
  },
  {
    id: 'science_g3_magnet_002', subject: 'science', gradeLevel: 3, unit: 'magnet',
    difficulty: 'standard', answerType: 'input',
    question: 'じしゃくの {両|りょう}はしの {極|きょく}は、N{極|きょく}と {何極|なにきょく}かな。',
    answer: 'S極', acceptedAnswers: ['S', 'エス極', 'えすきょく', 'Sきょく'], validationMode: 'kana-insensitive',
    hints: ['アルファベット 1{文字|もじ}だよ。', 'N（North）は {北|きた}。もう{一方|いっぽう}は {南|みなみ}（South）だよ。'],
    explanation: 'じしゃくには N{極|きょく}と「S{極|きょく}」が あります。N{極|きょく}は {北|きた}を、S{極|きょく}は {南|みなみ}を さします。',
    reviewed: true
  },
  {
    id: 'science_g3_magnet_003', subject: 'science', gradeLevel: 3, unit: 'magnet',
    difficulty: 'standard', answerType: 'choice',
    question: 'じしゃくの N{極|きょく}と N{極|きょく}を {近|ちか}づけると、どう なるかな。',
    choices: ['しりぞけ{合|あ}う', '{引|ひ}き{合|あ}う', 'くっついて はなれなくなる', '{何|なに}も おこらない'],
    answer: 'しりぞけ{合|あ}う',
    hints: ['{同|おな}じ {極|きょく}どうしを {近|ちか}づけて いるね。', 'ちがう {極|きょく}どうし（N{極|きょく}と S{極|きょく}）なら {引|ひ}き{合|あ}うよ。'],
    explanation: '{同|おな}じ {極|きょく}どうしは しりぞけ{合|あ}い、ちがう {極|きょく}どうしは {引|ひ}き{合|あ}います。',
    inputForm: { answer: 'しりぞけ合う', acceptedAnswers: ['しりぞけあう', 'しりぞけ 合う', '反発する', 'はんぱつする', '反発しあう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g3_sun_001', subject: 'science', gradeLevel: 3, unit: 'sun',
    difficulty: 'standard', answerType: 'choice',
    question: '{朝|あさ}、{太陽|たいよう}が {東|ひがし}の {空|そら}に あるとき、{木|き}の かげは どの {方位|ほうい}に できるかな。',
    choices: ['{西|にし}', '{東|ひがし}', '{南|みなみ}', '{北|きた}'],
    answer: '{西|にし}',
    hints: ['かげは {太陽|たいよう}の {反対|はんたい}がわに できるよ。', '{東|ひがし}の {反対|はんたい}の {方位|ほうい}は どれかな。'],
    explanation: 'かげは {太陽|たいよう}の {反対|はんたい}がわに できます。{太陽|たいよう}が {東|ひがし}に あるとき、かげは {西|にし}に できます。',
    inputForm: { acceptedAnswers: ['にし'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g3_electric_001', subject: 'science', gradeLevel: 3, unit: 'electric',
    difficulty: 'advanced', answerType: 'input',
    question: '{鉄|てつ}・{銅|どう}・アルミニウムなど、{電気|でんき}を {通|とお}す ものを まとめて {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'きんぞく', acceptedAnswers: ['金属'], validationMode: 'kana-insensitive',
    hints: ['みがくと ぴかぴか {光|ひか}る ものが {多|おお}いよ。', '「きん」から はじまる ことばだよ。'],
    explanation: '{鉄|てつ}・{銅|どう}・アルミニウムなどを「{金属|きんぞく}」と いいます。{金属|きんぞく}は {電気|でんき}を {通|とお}します。',
    reviewed: true
  },
  {
    id: 'science_g3_sound_001', subject: 'science', gradeLevel: 3, unit: 'sound',
    difficulty: 'advanced', answerType: 'choice',
    question: 'たいこを たたいて {音|おと}が {出|で}て いるとき、たいこの {皮|かわ}は どう なって いるかな。',
    choices: ['ふるえて いる', 'まったく {動|うご}いて いない', 'あたたかく なって いる', 'へこんだ ままに なって いる'],
    answer: 'ふるえて いる',
    hints: ['たいこの {上|うえ}に つぶを のせて たたくと、どう なるかな。', '{音|おと}が {出|で}て いる ものに そっと さわって みよう。'],
    explanation: '{音|おと}が {出|で}て いる ものは ふるえて います。ふるえを {手|て}で おさえると、{音|おと}は {止|と}まります。',
    inputForm: { answer: 'ふるえている', acceptedAnswers: ['ふるえて いる', 'ふるえる', '振動している', 'しんどうしている'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g3_plant_002', subject: 'science', gradeLevel: 3, unit: 'plant',
    difficulty: 'basic', answerType: 'choice',
    question: '{植物|しょくぶつ}の {体|からだ}の つくりを {正|ただ}しく {表|あらわ}して いるのは どれかな。',
    choices: ['{根|ね}・くき・{葉|は}', '{頭|あたま}・むね・はら', '{根|ね}・{頭|あたま}・{葉|は}', 'くき・むね・{葉|は}'],
    answer: '{根|ね}・くき・{葉|は}',
    hints: ['「{頭|あたま}・むね・はら」は こん{虫|ちゅう}の {体|からだ}の つくりだよ。', '{土|つち}の {中|なか}、{土|つち}の {上|うえ}で のびる ところ、{緑|みどり}の ひらたい ところの 3つだよ。'],
    explanation: '{植物|しょくぶつ}の {体|からだ}は「{根|ね}・くき・{葉|は}」で できて います。こん{虫|ちゅう}の {体|からだ}は「{頭|あたま}・むね・はら」です。',
    reviewed: true
  },
  {
    id: 'science_g3_light_001', subject: 'science', gradeLevel: 3, unit: 'light',
    difficulty: 'basic', answerType: 'choice',
    question: 'かがみで はね{返|かえ}した {日光|にっこう}を、かげに なって いる かべに {当|あ}てました。{光|ひかり}が {当|あ}たった ところは どう なるかな。',
    choices: ['{明|あか}るく、あたたかく なる', '{暗|くら}く、つめたく なる', '{明|あか}るく なるが、あたたかさは {変|か}わらない', '{何|なに}も {変|か}わらない'],
    answer: '{明|あか}るく、あたたかく なる',
    hints: ['{日光|にっこう}が {当|あ}たって いる ひなたの ようすを {思|おも}い{出|だ}そう。', 'はね{返|かえ}した {日光|にっこう}も、{日光|にっこう}と {同|おな}じ はたらきを するよ。'],
    explanation: 'はね{返|かえ}した {日光|にっこう}が {当|あ}たった ところは、{明|あか}るく、あたたかく なります。',
    reviewed: true
  },
  {
    id: 'science_g3_insect_003', subject: 'science', gradeLevel: 3, unit: 'insect',
    difficulty: 'basic', answerType: 'input',
    question: 'モンシロチョウは「{卵|たまご} → よう{虫|ちゅう} → □ → せい{虫|ちゅう}」の {順|じゅん}に {育|そだ}ちます。□に {入|はい}る ことばを ひらがなで {書|か}こう。',
    answer: 'さなぎ', acceptedAnswers: ['サナギ', '蛹'], validationMode: 'kana-insensitive',
    hints: ['よう{虫|ちゅう}が {動|うご}かなく なり、かたい からに つつまれた すがただよ。', 'この すがたの {間|あいだ}は {何|なに}も {食|た}べないよ。'],
    explanation: 'モンシロチョウは「{卵|たまご} → よう{虫|ちゅう} → さなぎ → せい{虫|ちゅう}」の {順|じゅん}に {育|そだ}ちます。',
    reviewed: true
  },
  {
    id: 'science_g3_electric_002', subject: 'science', gradeLevel: 3, unit: 'electric',
    difficulty: 'basic', answerType: 'input',
    question: 'かん{電池|でんち}・{豆電球|まめでんきゅう}・{導線|どうせん}を つないで できる、{電気|でんき}の {通|とお}り{道|みち}の わを {何|なん}と いうかな。ひらがなで {書|か}こう。',
    answer: 'かいろ', acceptedAnswers: ['回路'], validationMode: 'kana-insensitive',
    hints: ['わが とちゅうで {切|き}れて いると、{豆電球|まめでんきゅう}は つかないよ。', '「かい」から はじまる 3{文字|もじ}の ことばだよ。'],
    explanation: '{電気|でんき}の {通|とお}り{道|みち}の わを「{回路|かいろ}」と いいます。{回路|かいろ}が 1つの わに なって いると、{電気|でんき}が {流|なが}れて {豆電球|まめでんきゅう}が つきます。',
    reviewed: true
  },
  {
    id: 'science_g3_light_002', subject: 'science', gradeLevel: 3, unit: 'light',
    difficulty: 'standard', answerType: 'input',
    question: '{虫|むし}めがねで {日光|にっこう}を {集|あつ}めて、{紙|かみ}に うつった {光|ひかり}の {部分|ぶぶん}を {小|ちい}さく しました。{光|ひかり}の {部分|ぶぶん}の {明|あか}るさは どう なるかな。',
    answer: 'あかるくなる', acceptedAnswers: ['あかるく なる', '明るくなる', 'あかるく', '明るく'], validationMode: 'kana-insensitive',
    hints: ['{同|おな}じ {量|りょう}の {日光|にっこう}を、せまい ところに {集|あつ}めて いるね。', '{光|ひかり}を {小|ちい}さく {集|あつ}めるほど、{紙|かみ}が こげる ことも あるよ（あぶないので {人|ひと}や {生|い}き{物|もの}に {向|む}けないこと）。'],
    explanation: '{日光|にっこう}を {小|ちい}さく {集|あつ}めるほど、{明|あか}るく、あつく なります。',
    reviewed: true
  },
  {
    id: 'science_g3_weight_001', subject: 'science', gradeLevel: 3, unit: 'weight',
    difficulty: 'standard', answerType: 'input',
    question: '100gの ねんどを、{細長|ほそなが}い {形|かたち}に のばしてから はかりに のせました。{重|おも}さは {何|なん}gかな。{数|かず}で {答|こた}えよう。',
    answer: '100', acceptedAnswers: ['100g'], validationMode: 'number',
    hints: ['ねんどを ちぎって すてたり、つけ{足|た}したり は して いないね。', '{形|かたち}を {変|か}えても、ものの {量|りょう}は {変|か}わるかな。'],
    explanation: 'ものは {形|かたち}を {変|か}えても {重|おも}さは {変|か}わりません。100gの ままです。',
    reviewed: true
  },
  {
    id: 'science_g3_sun_002', subject: 'science', gradeLevel: 3, unit: 'sun',
    difficulty: 'standard', answerType: 'input',
    question: '{晴|は}れた {日|ひ}の {正午|しょうご}ごろ、{地面|じめん}の あたたかさを くらべました。あたたかいのは「{日|ひ}なた」と「{日|ひ}かげ」の どちらかな。',
    answer: 'ひなた', acceptedAnswers: ['日なた', '日向'], validationMode: 'kana-insensitive',
    hints: ['{日光|にっこう}が {当|あ}たって いるのは どちらかな。', '{日光|にっこう}には {地面|じめん}を あたためる はたらきが あるよ。'],
    explanation: '{日光|にっこう}が {当|あ}たる「{日|ひ}なた」の {地面|じめん}は、{日|ひ}かげの {地面|じめん}より あたたかく なります。',
    reviewed: true
  },
  {
    id: 'science_g3_insect_004', subject: 'science', gradeLevel: 3, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: '{水|みず}の {中|なか}で くらす トンボの よう{虫|ちゅう}を {何|なん}と いうかな。カタカナか ひらがなで {書|か}こう。',
    answer: 'ヤゴ', acceptedAnswers: ['やご'], validationMode: 'kana-insensitive',
    hints: ['{池|いけ}や プールの {底|そこ}で、ほかの {虫|むし}などを {食|た}べて {育|そだ}つよ。', 'カタカナ 2{文字|もじ}だよ。'],
    explanation: 'トンボの よう{虫|ちゅう}は「ヤゴ」と いい、{水|みず}の {中|なか}で くらします。トンボは さなぎに ならずに せい{虫|ちゅう}に なります。',
    reviewed: true
  },
  {
    id: 'science_g3_sound_002', subject: 'science', gradeLevel: 3, unit: 'sound',
    difficulty: 'standard', answerType: 'input',
    question: 'トライアングルを {強|つよ}く たたいて {大|おお}きな {音|おと}を {出|だ}しました。{小|ちい}さな {音|おと}の ときと くらべて、ふるえは {大|おお}きいかな、{小|ちい}さいかな。',
    answer: 'おおきい', acceptedAnswers: ['大きい', 'おおきくなる', '大きくなる', 'おおきく', '大きく'], validationMode: 'kana-insensitive',
    hints: ['{音|おと}が {出|で}て いる ものは ふるえて いるよ。', '{音|おと}の {大|おお}きさと ふるえ{方|かた}には つながりが あるよ。'],
    explanation: '{大|おお}きな {音|おと}が {出|で}て いる とき、ものの ふるえは {大|おお}きく なります。{小|ちい}さな {音|おと}の ときは、ふるえも {小|ちい}さく なります。',
    reviewed: true
  },
  {
    id: 'science_g3_wind_001', subject: 'science', gradeLevel: 3, unit: 'wind',
    difficulty: 'standard', answerType: 'input',
    question: 'ほを {立|た}てた {車|くるま}に、{送風機|そうふうき}で {風|かぜ}を {当|あ}てます。{風|かぜ}を {強|つよ}く すると、{車|くるま}の {進|すす}む きょりは どう なるかな。',
    answer: 'ながくなる', acceptedAnswers: ['ながく なる', '長くなる', 'ながく', '長く', 'のびる', 'とおくなる', '遠くなる'], validationMode: 'kana-insensitive',
    hints: ['{風|かぜ}には ものを {動|うご}かす はたらきが あるよ。', '{強|つよ}い {風|かぜ}ほど、ほを おす {力|ちから}は どう なるかな。'],
    explanation: '{風|かぜ}を {強|つよ}く すると、ものを {動|うご}かす はたらきが {大|おお}きく なるので、{車|くるま}の {進|すす}む きょりは {長|なが}く なります。',
    reviewed: true
  },
  {
    id: 'science_g3_magnet_004', subject: 'science', gradeLevel: 3, unit: 'magnet',
    difficulty: 'standard', answerType: 'choice',
    question: 'じしゃくに しばらく つけて おいた {鉄|てつ}の くぎを、じしゃくから はなしました。この くぎは どう なって いるかな。',
    choices: ['じしゃくの せいしつを もち、ほかの {鉄|てつ}を {引|ひ}きつける', '{電気|でんき}を {通|とお}さなく なる', '{鉄|てつ}では なく {銅|どう}に {変|か}わる', '{重|おも}さが {重|おも}く なる'],
    answer: 'じしゃくの せいしつを もち、ほかの {鉄|てつ}を {引|ひ}きつける',
    hints: ['その くぎに {砂鉄|さてつ}を {近|ちか}づけて みよう。', '{鉄|てつ}は じしゃくに つけて おくと、じしゃくに なる ことが あるよ。'],
    explanation: '{鉄|てつ}は じしゃくに つけて おくと じしゃくの せいしつを もち、ほかの {鉄|てつ}を {引|ひ}きつけるように なります。N{極|きょく}と S{極|きょく}も できます。',
    reviewed: true
  },
  {
    id: 'science_g3_electric_003', subject: 'science', gradeLevel: 3, unit: 'electric',
    difficulty: 'standard', answerType: 'choice',
    question: '{豆電球|まめでんきゅう}に {明|あ}かりが つく つなぎ{方|かた}は どれかな。',
    choices: ['{豆電球|まめでんきゅう}から {出|で}た 2{本|ほん}の {導線|どうせん}を、かん{電池|でんち}の ＋{極|きょく}と −{極|きょく}に 1{本|ぽん}ずつ つなぐ', '2{本|ほん}の {導線|どうせん}を、どちらも ＋{極|きょく}に つなぐ', '2{本|ほん}の {導線|どうせん}を、どちらも −{極|きょく}に つなぐ', '1{本|ぽん}の {導線|どうせん}だけを ＋{極|きょく}に つなぐ'],
    answer: '{豆電球|まめでんきゅう}から {出|で}た 2{本|ほん}の {導線|どうせん}を、かん{電池|でんち}の ＋{極|きょく}と −{極|きょく}に 1{本|ぽん}ずつ つなぐ',
    hints: ['{電気|でんき}の {通|とお}り{道|みち}が 1つの わに なる つなぎ{方|かた}を さがそう。', '＋{極|きょく}から {出|で}た {電気|でんき}が、{豆電球|まめでんきゅう}を {通|とお}って −{極|きょく}に もどるよ。'],
    explanation: 'かん{電池|でんち}の ＋{極|きょく}、{豆電球|まめでんきゅう}、−{極|きょく}が 1つの わ（{回路|かいろ}）に なるように つなぐと、{明|あ}かりが つきます。',
    reviewed: true
  },
  {
    id: 'science_g3_weight_002', subject: 'science', gradeLevel: 3, unit: 'weight',
    difficulty: 'standard', answerType: 'choice',
    question: '{同|おな}じ {大|おお}きさの つつに、{次|つぎ}の ものを それぞれ いっぱいに つめて {重|おも}さを はかりました。いちばん {重|おも}いのは どれかな。',
    choices: ['{鉄|てつ}', '{木|き}', 'プラスチック', 'はっぽうスチロール'],
    answer: '{鉄|てつ}',
    hints: ['{同|おな}じ {大|おお}きさ（かさ）でも、ものに よって {重|おも}さが ちがうよ。', '{持|も}った ときに ずっしり {重|おも}い ものは どれかな。'],
    explanation: '{同|おな}じ {大|おお}きさでも、ものの しゅるいに よって {重|おも}さは ちがいます。この 4つの {中|なか}では {鉄|てつ}が いちばん {重|おも}く、はっぽうスチロールが いちばん {軽|かる}いです。',
    reviewed: true
  },
  {
    id: 'science_g3_plant_003', subject: 'science', gradeLevel: 3, unit: 'plant',
    difficulty: 'standard', answerType: 'choice',
    question: 'ホウセンカの {花|はな}が さいた あと、{花|はな}が あった ところに できる ものは どれかな。',
    choices: ['{実|み}', '{根|ね}', 'つぼみ', '{子葉|しよう}'],
    answer: '{実|み}',
    hints: ['{中|なか}に {次|つぎ}の {年|とし}に まく ものが {入|はい}って いるよ。', '{種|たね} → {子葉|しよう} → {葉|は} → つぼみ → {花|はな} → ？'],
    explanation: 'ホウセンカは {花|はな}が さいた あとに「{実|み}」が でき、その {中|なか}に {種|たね}が できます。{種|たね}を のこすと、{植物|しょくぶつ}は かれて しまいます。',
    inputForm: { question: 'ホウセンカの {花|はな}が さいた あと、{花|はな}が あった ところに できる ものは 何かな。', acceptedAnswers: ['み'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g3_insect_005', subject: 'science', gradeLevel: 3, unit: 'insect',
    difficulty: 'advanced', answerType: 'input',
    question: 'クモは こん{虫|ちゅう}の なかまでは ありません。クモの あしは {何本|なんぼん}かな。{数|かず}で {答|こた}えよう。',
    answer: '8', acceptedAnswers: ['8本'], validationMode: 'number',
    hints: ['こん{虫|ちゅう}の あしは 6{本|ぽん}。クモは それより {多|おお}いよ。', '{左右|さゆう}に 4{本|ほん}ずつ あるよ。'],
    explanation: 'クモの あしは 8{本|ほん}です。{体|からだ}も {頭|あたま}・むね・はらの 3つに {分|わ}かれて いないので、こん{虫|ちゅう}では ありません。',
    reviewed: true
  },
  {
    id: 'science_g3_light_003', subject: 'science', gradeLevel: 3, unit: 'light',
    difficulty: 'advanced', answerType: 'input',
    question: 'かがみ 1まい、2まい、3まいで はね{返|かえ}した {日光|にっこう}を、それぞれ べつの {的|まと}に {重|かさ}ねて {当|あ}てました。いちばん あたたかく なるのは、かがみ {何|なん}まいの ときかな。{数|かず}で {答|こた}えよう。',
    answer: '3', acceptedAnswers: ['3まい', '3枚'], validationMode: 'number',
    hints: ['{重|かさ}ねる {日光|にっこう}が {多|おお}いほど、どう なるかな。', 'はね{返|かえ}した {日光|にっこう}を {重|かさ}ねるほど、{明|あか}るく なるよ。'],
    explanation: 'はね{返|かえ}した {日光|にっこう}を {多|おお}く {重|かさ}ねるほど、{明|あか}るく、あたたかく なります。かがみ 3まいの ときが いちばん あたたかく なります。',
    reviewed: true
  },
  {
    id: 'science_g3_electric_004', subject: 'science', gradeLevel: 3, unit: 'electric',
    difficulty: 'advanced', answerType: 'choice',
    question: '{回路|かいろ}の とちゅうに はさんだ とき、{豆電球|まめでんきゅう}が つかない ものは どれかな。',
    choices: ['プラスチックの じょうぎ', '{鉄|てつ}の クリップ', 'アルミニウムはく', '10{円玉|えんだま}'],
    answer: 'プラスチックの じょうぎ',
    hints: ['{電気|でんき}を {通|とお}すのは {金属|きんぞく}だよ。', '{金属|きんぞく}で ない ものを さがそう。'],
    explanation: '{鉄|てつ}・アルミニウム・{銅|どう}（10{円玉|えんだま}）などの {金属|きんぞく}は {電気|でんき}を {通|とお}しますが、プラスチックは {電気|でんき}を {通|とお}しません。',
    reviewed: true
  },
  {
    id: 'science_g3_sun_003', subject: 'science', gradeLevel: 3, unit: 'sun',
    difficulty: 'advanced', answerType: 'choice',
    question: '{朝|あさ}から {夕方|ゆうがた}まで、{木|き}の かげの {向|む}きは どのように {変|か}わるかな。',
    choices: ['{西|にし} → {北|きた} → {東|ひがし}', '{東|ひがし} → {南|みなみ} → {西|にし}', '{北|きた} → {西|にし} → {南|みなみ}', 'ずっと {北|きた}の まま'],
    answer: '{西|にし} → {北|きた} → {東|ひがし}',
    hints: ['{太陽|たいよう}は {東|ひがし} → {南|みなみ} → {西|にし}と {動|うご}くね。', 'かげは いつも {太陽|たいよう}の {反対|はんたい}がわに できるよ。'],
    explanation: '{太陽|たいよう}は {東|ひがし} → {南|みなみ} → {西|にし}と {動|うご}くので、かげは その {反対|はんたい}がわの {西|にし} → {北|きた} → {東|ひがし}と {動|うご}きます。',
    reviewed: true
  },

  // ===== Lv4（小学4年） =====
  {
    id: 'science_g4_water_001', subject: 'science', gradeLevel: 4, unit: 'water',
    difficulty: 'basic', answerType: 'choice',
    question: '{水|みず}を {熱|ねっ}し{続|つづ}けると、およそ {何|なん}℃で ふっとうするかな。',
    choices: ['100℃', '0℃', '50℃', '200℃'],
    answer: '100℃',
    hints: ['{水|みず}が こおるのは 0℃だよ。', 'ふっとうしている {間|あいだ}、{温度|おんど}は {変|か}わらないよ。'],
    explanation: '{水|みず}は およそ 100℃で ふっとうします。ふっとうして いる {間|あいだ}、{温度|おんど}は 100℃の まま {変|か}わりません。',
    inputForm: { answer: '100', acceptedAnswers: ['100℃', '100度', '100ど'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g4_water_002', subject: 'science', gradeLevel: 4, unit: 'water',
    difficulty: 'basic', answerType: 'input',
    question: '{水|みず}を {冷|ひ}やして いくと、{何|なん}℃で こおり{始|はじ}めるかな。{数|かず}で {答|こた}えよう。',
    answer: '0', acceptedAnswers: ['0℃', '0度'], validationMode: 'number',
    hints: ['{冬|ふゆ}の {朝|あさ}、{水|みず}たまりが こおって いる ことが あるね。', 'ふっとうする {温度|おんど}は 100℃。こおる {温度|おんど}は…？'],
    explanation: '{水|みず}は 0℃で こおり{始|はじ}めます。{全部|ぜんぶ}が こおるまで、{温度|おんど}は 0℃の まま {変|か}わりません。',
    reviewed: true
  },
  {
    id: 'science_g4_water_003', subject: 'science', gradeLevel: 4, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: '{水|みず}が ふっとうして いるとき、{中|なか}から {出|で}て くる あわの {正体|しょうたい}は {何|なん}かな。ひらがなで {答|こた}えよう。',
    answer: 'すいじょうき', acceptedAnswers: ['水蒸気', '水じょう気'], validationMode: 'kana-insensitive',
    hints: ['あわは {空気|くうき}では ないよ。{水|みず}が すがたを {変|か}えた ものだよ。', '{目|め}に {見|み}えない、{気体|きたい}の {水|みず}の ことだよ。'],
    explanation: 'ふっとうした {水|みず}から {出|で}る あわは、{水|みず}が {気体|きたい}に なった「{水蒸気|すいじょうき}」です。',
    reviewed: true
  },
  {
    id: 'science_g4_body_001', subject: 'science', gradeLevel: 4, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: 'ほねと ほねの つなぎ{目|め}で、{体|からだ}を {曲|ま}げる ことが できる ところを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'かんせつ', acceptedAnswers: ['関節'], validationMode: 'kana-insensitive',
    hints: ['ひじや ひざに あるよ。', '「かん」から はじまる ことばだよ。'],
    explanation: 'ほねと ほねの つなぎ{目|め}で、{曲|ま}げられる ところを「{関節|かんせつ}」と いいます。',
    reviewed: true
  },
  {
    id: 'science_g4_star_001', subject: 'science', gradeLevel: 4, unit: 'star',
    difficulty: 'standard', answerType: 'input',
    question: '{夏|なつ}の {大三角|だいさんかく}を つくる {星|ほし}は、ベガ・アルタイルと、もう1つは {何|なん}かな。カタカナで {答|こた}えよう。',
    answer: 'デネブ', validationMode: 'kana-insensitive',
    hints: ['はくちょう{座|ざ}の {星|ほし}だよ。', '「デ」から はじまる {名前|なまえ}だよ。'],
    explanation: '{夏|なつ}の {大三角|だいさんかく}は、こと{座|ざ}の ベガ、わし{座|ざ}の アルタイル、はくちょう{座|ざ}の「デネブ」で できて います。',
    reviewed: true
  },
  {
    id: 'science_g4_electric_001', subject: 'science', gradeLevel: 4, unit: 'electric',
    difficulty: 'standard', answerType: 'choice',
    question: 'かん{電池|でんち} 2{個|こ}を {直列|ちょくれつ}つなぎに して モーターを {回|まわ}すと、かん{電池|でんち} 1{個|こ}の ときと くらべて どう なるかな。',
    choices: ['{速|はや}く {回|まわ}る', 'おそく {回|まわ}る', '{同|おな}じ {速|はや}さで {回|まわ}る', '{反対|はんたい}{向|む}きに {回|まわ}る'],
    answer: '{速|はや}く {回|まわ}る',
    hints: ['{直列|ちょくれつ}つなぎに すると、{電流|でんりゅう}の {大|おお}きさは どう なるかな。', '{電流|でんりゅう}が {大|おお}きく なると、モーターの {回|まわ}り{方|かた}も {変|か}わるよ。'],
    explanation: 'かん{電池|でんち}を {直列|ちょくれつ}つなぎに すると {電流|でんりゅう}が {大|おお}きく なり、モーターは 1{個|こ}の ときより {速|はや}く {回|まわ}ります。（{並列|へいれつ}つなぎでは、1{個|こ}の ときと ほぼ {同|おな}じです）',
    inputForm: { answer: '速く回る', acceptedAnswers: ['速く 回る', 'はやくまわる', 'はやく まわる', '早く回る', '速くなる', 'はやくなる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g4_weather_001', subject: 'science', gradeLevel: 4, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: 'よく {晴|は}れた {日|ひ}、1{日|にち}の {中|なか}で {気温|きおん}が いちばん {高|たか}く なるのは いつごろかな。',
    choices: ['{午後|ごご}2{時|じ}ごろ', '{朝|あさ}6{時|じ}ごろ', '{午前|ごぜん}10{時|じ}ごろ', '{夜|よる}8{時|じ}ごろ'],
    answer: '{午後|ごご}2{時|じ}ごろ',
    hints: ['{太陽|たいよう}が いちばん {高|たか}く なるのは {正午|しょうご}ごろ。', '{太陽|たいよう}で {地面|じめん}が あたたまり、その {地面|じめん}が {空気|くうき}を あたためるので、{少|すこ}し おくれるよ。'],
    explanation: '{晴|は}れた {日|ひ}の {気温|きおん}は、{太陽|たいよう}が いちばん {高|たか}く なる {正午|しょうご}より {少|すこ}し おくれて、{午後|ごご}2{時|じ}ごろに いちばん {高|たか}く なります。',
    inputForm: { answer: '午後2時ごろ', acceptedAnswers: ['午後2時', 'ごご2じ', 'ごご2じごろ', '14時', '14時ごろ', '2時', '2時ごろ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g4_moon_001', subject: 'science', gradeLevel: 4, unit: 'moon',
    difficulty: 'advanced', answerType: 'input',
    question: '{月|つき}は {太陽|たいよう}と {同|おな}じように、{東|ひがし}から のぼり、{南|みなみ}の {空|そら}を {通|とお}って、どの {方位|ほうい}に しずむかな。{漢字|かんじ} 1{文字|もじ}か ひらがなで {答|こた}えよう。',
    answer: '西', acceptedAnswers: ['にし'], validationMode: 'kana-insensitive',
    hints: ['{太陽|たいよう}が しずむ {方位|ほうい}と {同|おな}じだよ。', '{東|ひがし}の {反対|はんたい}の {方位|ほうい}だよ。'],
    explanation: '{月|つき}も {太陽|たいよう}と {同|おな}じように、{東|ひがし}から のぼって {南|みなみ}の {空|そら}を {通|とお}り、{西|にし}に しずみます。',
    reviewed: true
  },
  {
    id: 'science_g4_air_001', subject: 'science', gradeLevel: 4, unit: 'air',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ちゅうしゃ{器|き}に {空気|くうき}と {水|みず}を {半分|はんぶん}ずつ とじこめて ピストンを おしました。おしちぢめられるのは どれかな。',
    choices: ['{空気|くうき}だけ', '{水|みず}だけ', '{空気|くうき}と {水|みず}の {両方|りょうほう}', 'どちらも おしちぢめられない'],
    answer: '{空気|くうき}だけ',
    hints: ['とじこめた {空気|くうき}は、おすと {体積|たいせき}が {小|ちい}さく なるね。', 'とじこめた {水|みず}は、おしても {体積|たいせき}が {変|か}わらないよ。'],
    explanation: 'とじこめた {空気|くうき}は おしちぢめられますが、{水|みず}は おしちぢめられません。だから ちぢむのは {空気|くうき}だけです。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g4_heat_001', subject: 'science', gradeLevel: 4, unit: 'heat',
    difficulty: 'basic', answerType: 'choice',
    question: '{金属|きんぞく}の ぼうの はしを {熱|ねっ}しました。ぼうは どのように あたたまるかな。',
    choices: ['{熱|ねっ}した ところから {順|じゅん}に あたたまって いく', 'ぼう{全体|ぜんたい}が {同時|どうじ}に あたたまる', 'はしから いちばん {遠|とお}い ところが {先|さき}に あたたまる', '{上|うえ}の ほうだけが あたたまる'],
    answer: '{熱|ねっ}した ところから {順|じゅん}に あたたまって いく',
    hints: ['ぼうに ろうを ぬって おくと、とける {順番|じゅんばん}で わかるよ。', '{金属|きんぞく}は、{熱|ねつ}が {伝|つた}わって あたたまるよ。'],
    explanation: '{金属|きんぞく}は、{熱|ねっ}した ところから {順|じゅん}に {熱|ねつ}が {伝|つた}わって あたたまって いきます。',
    reviewed: true
  },
  {
    id: 'science_g4_season_001', subject: 'science', gradeLevel: 4, unit: 'season',
    difficulty: 'basic', answerType: 'choice',
    question: 'ツバメが {南|みなみ}の {国|くに}から {日本|にほん}に やって きて、{巣|す}を つくり{始|はじ}めるのは どの {季節|きせつ}かな。',
    choices: ['{春|はる}', '{夏|なつ}の {終|お}わり', '{秋|あき}', '{冬|ふゆ}'],
    answer: '{春|はる}',
    hints: ['あたたかく なって、{虫|むし}が {多|おお}く なる ころだよ。', '{秋|あき}には {南|みなみ}の {国|くに}へ わたって いくよ。'],
    explanation: 'ツバメは {春|はる}に {南|みなみ}の {国|くに}から わたって きて、{巣|す}を つくって {子|こ}そだてを します。{秋|あき}には {南|みなみ}の {国|くに}へ もどって いきます。',
    inputForm: { acceptedAnswers: ['はる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g4_star_002', subject: 'science', gradeLevel: 4, unit: 'star',
    difficulty: 'basic', answerType: 'input',
    question: 'ひしゃくの {形|かたち}に ならんだ「{北斗七星|ほくとしちせい}」を ふくむ {星座|せいざ}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'おおぐまざ', acceptedAnswers: ['おおぐま座', 'おおぐま', 'オオグマ座'], validationMode: 'kana-insensitive',
    hints: ['{大|おお}きな どうぶつの {形|かたち}を した {星座|せいざ}だよ。', '「おお○○ざ」の ○○は、もりに すむ どうぶつだよ。'],
    explanation: '{北斗七星|ほくとしちせい}は「おおぐま{座|ざ}」の {一部|いちぶ}です。{北斗七星|ほくとしちせい}を {使|つか}うと、{北極星|ほっきょくせい}を {見|み}つける ことが できます。',
    reviewed: true
  },
  {
    id: 'science_g4_body_002', subject: 'science', gradeLevel: 4, unit: 'body',
    difficulty: 'basic', answerType: 'input',
    question: 'ほねに ついて いて、ちぢんだり ゆるんだり して {体|からだ}を {動|うご}かす ものを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'きんにく', acceptedAnswers: ['筋肉'], validationMode: 'kana-insensitive',
    hints: ['うでに {力|ちから}を {入|い}れると、かたく もり{上|あ}がるよ。', '「きん」から はじまる ことばだよ。'],
    explanation: '「{筋肉|きんにく}」が ちぢんだり ゆるんだり する ことで、ほねが {動|うご}き、{体|からだ}を {動|うご}かす ことが できます。',
    reviewed: true
  },
  {
    id: 'science_g4_heat_002', subject: 'science', gradeLevel: 4, unit: 'heat',
    difficulty: 'standard', answerType: 'input',
    question: 'ビーカーの {水|みず}の {底|そこ}を {熱|ねっ}すると、あたためられた {水|みず}は {上|うえ}と {下|した}の どちらへ {動|うご}くかな。',
    answer: 'うえ', acceptedAnswers: ['上', 'うえのほう', '上のほう', '上の方'], validationMode: 'kana-insensitive',
    hints: ['{水|みず}に おがくずや {絵|え}の{具|ぐ}を {入|い}れて {熱|ねっ}すると、{動|うご}きが {見|み}えるよ。', 'おふろの お{湯|ゆ}は、{上|うえ}と {下|した}の どちらが あついかな。'],
    explanation: 'あたためられた {水|みず}は {上|うえ}へ {動|うご}き、{上|うえ}の つめたい {水|みず}が {下|した}へ {動|うご}きます。こうして {水|みず}が {動|うご}きながら {全体|ぜんたい}が あたたまります。',
    reviewed: true
  },
  {
    id: 'science_g4_air_002', subject: 'science', gradeLevel: 4, unit: 'air',
    difficulty: 'standard', answerType: 'input',
    question: 'つつに とじこめた {空気|くうき}を ピストンで おしました。おしちぢめるほど、{手|て}ごたえ（おし{返|かえ}す {力|ちから}）は どう なるかな。',
    answer: 'おおきくなる', acceptedAnswers: ['おおきく なる', '大きくなる', 'おおきく', '大きく', 'つよくなる', '強くなる'], validationMode: 'kana-insensitive',
    hints: ['{空気|くうき}は おしちぢめられるけれど、もとに もどろうと するよ。', 'たくさん ちぢめるほど、もどろうと する {力|ちから}は どう なるかな。'],
    explanation: 'とじこめた {空気|くうき}は、おしちぢめるほど、もとに もどろうと して おし{返|かえ}す {力|ちから}が {大|おお}きく なります。',
    reviewed: true
  },
  {
    id: 'science_g4_rain_001', subject: 'science', gradeLevel: 4, unit: 'rain',
    difficulty: 'standard', answerType: 'input',
    question: '{地面|じめん}に ふった {雨水|あまみず}は、{高|たか}い ところと {低|ひく}い ところの どちらへ {流|なが}れて いくかな。',
    answer: 'ひくいところ', acceptedAnswers: ['ひくい ところ', '低いところ', '低い所', 'ひくいほう', '低い方', 'ひくい', '低い'], validationMode: 'kana-insensitive',
    hints: ['すべり{台|だい}の {上|うえ}から ボールを {転|ころ}がすと、どちらへ {動|うご}くかな。', '{雨|あめ}の あと、{水|みず}たまりが できやすいのは どんな ところかな。'],
    explanation: '{水|みず}は {高|たか}い ところから {低|ひく}い ところへ {流|なが}れます。そのため、{雨水|あまみず}は {低|ひく}い ところに {集|あつ}まって {水|みず}たまりを つくります。',
    reviewed: true
  },
  {
    id: 'science_g4_electric_002', subject: 'science', gradeLevel: 4, unit: 'electric',
    difficulty: 'standard', answerType: 'input',
    question: '{回路|かいろ}に つないで、{電流|でんりゅう}の {向|む}きと {大|おお}きさを {調|しら}べる きぐを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'けんりゅうけい', acceptedAnswers: ['検流計', '簡易検流計', 'かんいけんりゅうけい'], validationMode: 'kana-insensitive',
    hints: ['はりの ふれる {向|む}きで {電流|でんりゅう}の {向|む}きが、ふれる {大|おお}きさで {電流|でんりゅう}の {大|おお}きさが わかるよ。', '「けん」から はじまる ことばだよ。'],
    explanation: '{電流|でんりゅう}の {向|む}きと {大|おお}きさは「{検流計|けんりゅうけい}」で {調|しら}べます。はりが ふれる {向|む}きが {電流|でんりゅう}の {向|む}き、ふれる {大|おお}きさが {電流|でんりゅう}の {大|おお}きさを {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'science_g4_heat_003', subject: 'science', gradeLevel: 4, unit: 'heat',
    difficulty: 'standard', answerType: 'input',
    question: 'へこんだ ピンポン{玉|だま}を お{湯|ゆ}に つけると、もとに もどりました。{中|なか}の {空気|くうき}は、あたためられると {体積|たいせき}が どう なるかな。',
    answer: 'ふえる', acceptedAnswers: ['増える', 'おおきくなる', '大きくなる', 'ふくらむ', '膨らむ', 'ふえた'], validationMode: 'kana-insensitive',
    hints: ['{中|なか}の {空気|くうき}が、ピンポン{玉|だま}を {内側|うちがわ}から おし{広|ひろ}げたよ。', '{空気|くうき}は、{冷|ひ}やすと {体積|たいせき}が へるよ。その {反対|はんたい}だね。'],
    explanation: '{空気|くうき}は あたためられると {体積|たいせき}が ふえ、{冷|ひ}やされると {体積|たいせき}が へります。{中|なか}の {空気|くうき}の {体積|たいせき}が ふえて、へこみが もどりました。',
    reviewed: true
  },
  {
    id: 'science_g4_water_004', subject: 'science', gradeLevel: 4, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: 'せんたく{物|もの}が かわくのは、{水|みず}が {目|め}に {見|み}えない {水蒸気|すいじょうき}に なって {空気|くうき}の {中|なか}に {出|で}て いくからです。この ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'じょうはつ', acceptedAnswers: ['蒸発'], validationMode: 'kana-insensitive',
    hints: ['ふっとうしなくても、{水|みず}の {表面|ひょうめん}から おこるよ。', '「じょう」から はじまる ことばだよ。'],
    explanation: '{水|みず}が {水面|すいめん}などから {水蒸気|すいじょうき}に なって {空気|くうき}の {中|なか}に {出|で}て いく ことを「{蒸発|じょうはつ}」と いいます。',
    reviewed: true
  },
  {
    id: 'science_g4_electric_003', subject: 'science', gradeLevel: 4, unit: 'electric',
    difficulty: 'standard', answerType: 'choice',
    question: 'かん{電池|でんち} 2{個|こ}を {並列|へいれつ}つなぎに して {豆電球|まめでんきゅう}を つけました。かん{電池|でんち} 1{個|こ}の ときと くらべて、{明|あか}るさは どう なるかな。',
    choices: ['ほぼ {同|おな}じ {明|あか}るさ', '{明|あか}るく なる', '{暗|くら}く なる', 'つかなく なる'],
    answer: 'ほぼ {同|おな}じ {明|あか}るさ',
    hints: ['{並列|へいれつ}つなぎでは、{回路|かいろ}に {流|なが}れる {電流|でんりゅう}の {大|おお}きさは 1{個|こ}の ときと ほぼ {同|おな}じだよ。', '{直列|ちょくれつ}つなぎに すると {明|あか}るく なるね。'],
    explanation: 'かん{電池|でんち}の {並列|へいれつ}つなぎでは、{電流|でんりゅう}の {大|おお}きさは 1{個|こ}の ときと ほぼ {同|おな}じなので、{明|あか}るさも ほぼ {同|おな}じです。そのかわり、かん{電池|でんち}が {長|なが}もちします。',
    inputForm: { answer: 'ほぼ同じ', acceptedAnswers: ['ほぼ 同じ 明るさ', 'ほぼ同じ明るさ', '同じ', 'おなじ', '同じ明るさ', '変わらない', 'かわらない'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g4_weather_002', subject: 'science', gradeLevel: 4, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: '1{日中|にちじゅう} {雨|あめ}が ふって いた {日|ひ}の {気温|きおん}の {変化|へんか}は、{晴|は}れた {日|ひ}と くらべて どう なるかな。',
    choices: ['{変化|へんか}が {小|ちい}さい', '{変化|へんか}が {大|おお}きい', '{夜|よる}に いちばん {高|たか}く なる', '{正午|しょうご}に いちばん {低|ひく}く なる'],
    answer: '{変化|へんか}が {小|ちい}さい',
    hints: ['{雨|あめ}や くもりの {日|ひ}は、{雲|くも}が {日光|にっこう}を さえぎるよ。', '{日光|にっこう}で {地面|じめん}が あたたまりにくいと、{気温|きおん}は {上|あ}がるかな。'],
    explanation: '{雨|あめ}や くもりの {日|ひ}は、{雲|くも}が {日光|にっこう}を さえぎるので、1{日|にち}の {気温|きおん}の {変化|へんか}が {小|ちい}さく なります。{晴|は}れた {日|ひ}は {変化|へんか}が {大|おお}きく なります。',
    inputForm: { answer: '変化が小さい', acceptedAnswers: ['変化が 小さい', 'へんかがちいさい', '小さい', '変化が少ない'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g4_season_002', subject: 'science', gradeLevel: 4, unit: 'season',
    difficulty: 'standard', answerType: 'choice',
    question: '{冬|ふゆ}の サクラの {木|き}は、どんな ようすかな。',
    choices: ['{葉|は}が {落|お}ちて、えだに {芽|め}を つけて いる', '{花|はな}が さいて いる', '{緑|みどり}の {葉|は}が しげって いる', '{実|み}が たくさん なって いる'],
    answer: '{葉|は}が {落|お}ちて、えだに {芽|め}を つけて いる',
    hints: ['{秋|あき}に {葉|は}の {色|いろ}が {変|か}わって {落|お}ちたね。', '{春|はる}に {花|はな}を さかせる じゅんびを して いるよ。'],
    explanation: 'サクラは {秋|あき}に {葉|は}を {落|お}とし、{冬|ふゆ}は えだに {芽|め}を つけて {寒|さむ}さを こします。{春|はる}に なると {芽|め}から {花|はな}が さきます。',
    reviewed: true
  },
  {
    id: 'science_g4_rain_002', subject: 'science', gradeLevel: 4, unit: 'rain',
    difficulty: 'standard', answerType: 'choice',
    question: 'つぶの {大|おお}きさが ちがう {土|つち}に {同|おな}じ {量|りょう}の {水|みず}を かけました。{水|みず}が いちばん {速|はや}く しみこむのは どれかな。',
    choices: ['つぶが {大|おお}きい じゃり', 'つぶが {中|ちゅう}くらいの すな', 'つぶが {小|ちい}さい ねんどの {多|おお}い {土|つち}', 'どれも {同|おな}じ'],
    answer: 'つぶが {大|おお}きい じゃり',
    hints: ['つぶと つぶの すきまの {大|おお}きさを {考|かんが}えよう。', 'すきまが {大|おお}きいほど、{水|みず}は {通|とお}りやすいよ。'],
    explanation: 'つぶが {大|おお}きいほど つぶの すきまが {大|おお}きく、{水|みず}が {速|はや}く しみこみます。つぶが {小|ちい}さいと しみこみにくく、{水|みず}たまりが できやすく なります。',
    reviewed: true
  },
  {
    id: 'science_g4_heat_004', subject: 'science', gradeLevel: 4, unit: 'heat',
    difficulty: 'advanced', answerType: 'input',
    question: '{金属|きんぞく}・{水|みず}・{空気|くうき}を {同|おな}じように あたためたとき、{体積|たいせき}の {変化|へんか}が いちばん {大|おお}きいのは どれかな。',
    answer: 'くうき', acceptedAnswers: ['空気'], validationMode: 'kana-insensitive',
    hints: ['{金属|きんぞく}の {体積|たいせき}の {変化|へんか}は、とても {小|ちい}さいよ。', 'ピンポン{玉|だま}の へこみが もどる {実験|じっけん}を {思|おも}い{出|だ}そう。'],
    explanation: 'あたためた ときの {体積|たいせき}の {変化|へんか}は、{空気|くうき}が いちばん {大|おお}きく、{次|つぎ}が {水|みず}、{金属|きんぞく}は いちばん {小|ちい}さいです。',
    reviewed: true
  },
  {
    id: 'science_g4_star_003', subject: 'science', gradeLevel: 4, unit: 'star',
    difficulty: 'advanced', answerType: 'input',
    question: '{冬|ふゆ}の {夜空|よぞら}に {見|み}える オリオン{座|ざ}で、{赤|あか}っぽく {光|ひか}る 1{等星|とうせい}の {名前|なまえ}を カタカナで {答|こた}えよう。',
    answer: 'ベテルギウス', acceptedAnswers: ['べてるぎうす'], validationMode: 'kana-insensitive',
    hints: ['オリオン{座|ざ}には、{赤|あか}い {星|ほし}と {白|しろ}っぽい {星|ほし}の 2つの 1{等星|とうせい}が あるよ。', '「ベ」から はじまる {名前|なまえ}だよ。'],
    explanation: 'オリオン{座|ざ}の {赤|あか}い 1{等星|とうせい}は「ベテルギウス」です（{白|しろ}っぽい 1{等星|とうせい}は リゲル）。ベテルギウスは、シリウス・プロキオンと {冬|ふゆ}の {大三角|だいさんかく}を つくります。{星|ほし}には いろいろな {色|いろ}が あります。',
    reviewed: true
  },
  {
    id: 'science_g4_water_005', subject: 'science', gradeLevel: 4, unit: 'water',
    difficulty: 'advanced', answerType: 'choice',
    question: '{水|みず}を {冷|ひ}やして {氷|こおり}に すると、{体積|たいせき}は どう なるかな。',
    choices: ['ふえる', 'へる', '{変|か}わらない', 'なくなる'],
    answer: 'ふえる',
    hints: ['{水|みず}を いっぱいに {入|い}れた ペットボトルを こおらせると、どう なるかな。', '{氷|こおり}は {水|みず}に うくね。'],
    explanation: '{水|みず}は {氷|こおり}に なると {体積|たいせき}が ふえます（{約|やく}1.1{倍|ばい}）。そのため、{氷|こおり}は {水|みず}に うきます。',
    inputForm: { acceptedAnswers: ['増える', '大きくなる', '大きく なる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g4_body_003', subject: 'science', gradeLevel: 4, unit: 'body',
    difficulty: 'advanced', answerType: 'choice',
    question: 'うでを {曲|ま}げる とき、うでの {内側|うちがわ}の {筋肉|きんにく}は どう なるかな。',
    choices: ['ちぢむ', 'ゆるむ', '{動|うご}かない', 'なくなる'],
    answer: 'ちぢむ',
    hints: ['うでを {曲|ま}げて {力|ちから}こぶを さわって みよう。', '{内側|うちがわ}と {外側|そとがわ}の {筋肉|きんにく}は、{反対|はんたい}の はたらきを するよ。'],
    explanation: 'うでを {曲|ま}げる ときは、{内側|うちがわ}の {筋肉|きんにく}が ちぢみ、{外側|そとがわ}の {筋肉|きんにく}が ゆるみます。のばす ときは その {反対|はんたい}です。',
    inputForm: { acceptedAnswers: ['縮む', 'ちぢまる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv5（小学5年） =====
  {
    id: 'science_g5_plant_001', subject: 'science', gradeLevel: 5, unit: 'plant',
    difficulty: 'basic', answerType: 'choice',
    question: 'インゲンマメの {種子|しゅし}が {発芽|はつが}するために、{必要|ひつよう}で ない ものは どれかな。',
    choices: ['{日光|にっこう}', '{水|みず}', '{空気|くうき}', '{適当|てきとう}な {温度|おんど}'],
    answer: '{日光|にっこう}',
    hints: ['{発芽|はつが}に {必要|ひつよう}な {条件|じょうけん}は 3つだよ。', '{暗|くら}い {箱|はこ}の {中|なか}でも {発芽|はつが}するかな。'],
    explanation: '{発芽|はつが}に {必要|ひつよう}なのは「{水|みず}・{空気|くうき}・{適当|てきとう}な {温度|おんど}」です。{日光|にっこう}は {発芽|はつが}には {必要|ひつよう}ありませんが、{発芽|はつが}した あと よく {育|そだ}つには {必要|ひつよう}です。',
    reviewed: true
  },
  {
    id: 'science_g5_pendulum_001', subject: 'science', gradeLevel: 5, unit: 'pendulum',
    difficulty: 'basic', answerType: 'input',
    question: 'ふりこが 1{往復|おうふく}する {時間|じかん}は、おもりの {重|おも}さ・ふれはば・ふりこの {長|なが}さの うち、どれを {変|か}えると {変|か}わるかな。',
    answer: 'ふりこの長さ', acceptedAnswers: ['長さ', 'ながさ', 'ふりこのながさ'], validationMode: 'kana-insensitive',
    hints: ['{条件|じょうけん}を 1つずつ {変|か}えて {調|しら}べる {実験|じっけん}を {思|おも}い{出|だ}そう。', 'おもりを {重|おも}く しても、ふれはばを {大|おお}きく しても、1{往復|おうふく}の {時間|じかん}は {変|か}わらないよ。'],
    explanation: 'ふりこが 1{往復|おうふく}する {時間|じかん}は、ふりこの {長|なが}さで {決|き}まります。{長|なが}いほど 1{往復|おうふく}の {時間|じかん}は {長|なが}く なります。',
    reviewed: true
  },
  {
    id: 'science_g5_life_001', subject: 'science', gradeLevel: 5, unit: 'life',
    difficulty: 'standard', answerType: 'input',
    question: 'メダカの めすが {産|う}んだ {卵|たまご}（{卵子|らんし}）と、おすが {出|だ}した {精子|せいし}が {結|むす}びつく ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'じゅせい', acceptedAnswers: ['受精'], validationMode: 'kana-insensitive',
    hints: ['{結|むす}びついた {卵|たまご}を「○○{卵|らん}」と いうよ。', '「じゅ」から はじまる ことばだよ。'],
    explanation: '{卵|たまご}と {精子|せいし}が {結|むす}びつく ことを「{受精|じゅせい}」と いい、{受精|じゅせい}した {卵|たまご}を「{受精卵|じゅせいらん}」と いいます。',
    reviewed: true
  },
  {
    id: 'science_g5_electromagnet_001', subject: 'science', gradeLevel: 5, unit: 'electromagnet',
    difficulty: 'standard', answerType: 'input',
    question: '{電磁石|でんじしゃく}を {強|つよ}く するには、{電流|でんりゅう}を {大|おお}きく する ほかに、コイルの {何|なに}を {多|おお}く すれば よいかな。ひらがなで {答|こた}えよう。',
    answer: 'まきすう', acceptedAnswers: ['巻き数', 'まき数', '巻数', 'まく数'], validationMode: 'kana-insensitive',
    hints: ['コイルは {導線|どうせん}を ぐるぐる まいた ものだよ。', 'まいた {回数|かいすう}の ことを {何|なん}と いうかな。'],
    explanation: '{電磁石|でんじしゃく}は、{電流|でんりゅう}を {大|おお}きく したり、コイルの「まき{数|すう}」を {多|おお}く したり すると {強|つよ}く なります。',
    reviewed: true
  },
  {
    id: 'science_g5_river_001', subject: 'science', gradeLevel: 5, unit: 'river',
    difficulty: 'standard', answerType: 'input',
    question: '{川|かわ}が {曲|ま}がって {流|なが}れて いる ところで、{流|なが}れが {速|はや}いのは「{内側|うちがわ}」と「{外側|そとがわ}」の どちらかな。',
    answer: '外側', acceptedAnswers: ['そとがわ'], validationMode: 'kana-insensitive',
    hints: ['{流|なが}れが {速|はや}い {側|がわ}では、{岸|きし}が けずられて がけに なる ことが {多|おお}いよ。', '{流|なが}れが おそい {側|がわ}には、{石|いし}や {砂|すな}が たまって {川原|かわら}が できるよ。'],
    explanation: '{曲|ま}がった ところでは {外側|そとがわ}の {流|なが}れが {速|はや}く、{岸|きし}が けずられて がけに なりやすいです。{内側|うちがわ}は {流|なが}れが おそく、{石|いし}や {砂|すな}が たまって {川原|かわら}が できます。',
    reviewed: true
  },
  {
    id: 'science_g5_dissolve_001', subject: 'science', gradeLevel: 5, unit: 'dissolve',
    difficulty: 'standard', answerType: 'choice',
    question: '{食塩|しょくえん}を とかした {水|みず}（{食塩水|しょくえんすい}）から {食塩|しょくえん}を {取|と}り{出|だ}すには、どう すれば よいかな。',
    choices: ['{水|みず}を {蒸発|じょうはつ}させる', 'ろ{紙|し}で こす', '{冷|ひ}やして こおらせる', 'よく かきまぜる'],
    answer: '{水|みず}を {蒸発|じょうはつ}させる',
    hints: ['とけた {食塩|しょくえん}は、ろ{紙|し}を {通|とお}りぬけて しまうよ。', '{水|みず}だけを なくす {方法|ほうほう}を {考|かんが}えよう。'],
    explanation: '{食塩水|しょくえんすい}を {熱|ねっ}して {水|みず}を {蒸発|じょうはつ}させると、{食塩|しょくえん}が {出|で}て きます。{水|みず}に とけた ものは ろ{紙|し}で こしても {取|と}り{出|だ}せません。',
    inputForm: { answer: '水を蒸発させる', acceptedAnswers: ['水を 蒸発させる', '蒸発させる', 'じょうはつさせる', '水をじょうはつさせる', '加熱する', '熱する'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g5_weather_001', subject: 'science', gradeLevel: 5, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: '{日本|にほん}の {上空|じょうくう}の {雲|くも}は、およそ どの {方位|ほうい}から どの {方位|ほうい}へ {動|うご}くかな。',
    choices: ['{西|にし}から {東|ひがし}へ', '{東|ひがし}から {西|にし}へ', '{南|みなみ}から {北|きた}へ', '{北|きた}から {南|みなみ}へ'],
    answer: '{西|にし}から {東|ひがし}へ',
    hints: ['{天気|てんき}は、{雲|くも}の {動|うご}きに ともなって {変|か}わって いくよ。', '「{夕焼|ゆうや}けの {次|つぎ}の {日|ひ}は {晴|は}れ」という ことわざは、{西|にし}の {空|そら}の ようすを {見|み}て いるよ。'],
    explanation: '{日本|にほん}の {上空|じょうくう}には {西|にし}から {東|ひがし}へ {強|つよ}い {風|かぜ}（{偏西風|へんせいふう}）が ふいて いるので、{雲|くも}も {天気|てんき}も およそ {西|にし}から {東|ひがし}へ {変|か}わって いきます。',
    inputForm: { answer: '西から東へ', acceptedAnswers: ['西から 東へ', 'にしからひがしへ', '西から東'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g5_dissolve_002', subject: 'science', gradeLevel: 5, unit: 'dissolve',
    difficulty: 'advanced', answerType: 'input',
    question: '{水|みず} 100gに {食塩|しょくえん} 20gを {入|い}れて、{全部|ぜんぶ} とかしました。できた {食塩水|しょくえんすい}の {重|おも}さは {何|なん}gかな。{数|かず}で {答|こた}えよう。',
    answer: '120', acceptedAnswers: ['120g'], validationMode: 'number',
    hints: ['とけて {見|み}えなく なっても、{食塩|しょくえん}は {水|みず}の {中|なか}に あるよ。', '{水|みず}の {重|おも}さと {食塩|しょくえん}の {重|おも}さを たそう。'],
    explanation: 'ものが {水|みず}に とけても、{重|おも}さは なくなりません。100＋20＝120gです。',
    reviewed: true
  },
  {
    id: 'science_g5_plant_002', subject: 'science', gradeLevel: 5, unit: 'plant',
    difficulty: 'advanced', answerType: 'choice',
    question: 'インゲンマメの {子葉|しよう}を {切|き}って ヨウ{素液|そえき}を つけると、{青|あお}むらさき{色|いろ}に {変|か}わりました。{子葉|しよう}に ふくまれて いる {養分|ようぶん}は どれかな。',
    choices: ['でんぷん', 'しぼう', 'たんぱく{質|しつ}', '{食塩|しょくえん}'],
    answer: 'でんぷん',
    hints: ['ヨウ{素液|そえき}は、ある {養分|ようぶん}が あると {青|あお}むらさき{色|いろ}に {変|か}わるよ。', 'ごはんや じゃがいもにも たくさん ふくまれて いるよ。'],
    explanation: 'ヨウ{素液|そえき}で {青|あお}むらさき{色|いろ}に {変|か}わるのは「でんぷん」が ある しるしです。{子葉|しよう}の でんぷんは {発芽|はつが}に {使|つか}われます。',
    inputForm: { question: 'インゲンマメの {子葉|しよう}を {切|き}って ヨウ{素液|そえき}を つけると、{青|あお}むらさき{色|いろ}に {変|か}わりました。{子葉|しよう}に ふくまれて いる 養分は 何かな。', acceptedAnswers: ['デンプン'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g5_flower_001', subject: 'science', gradeLevel: 5, unit: 'flower',
    difficulty: 'basic', answerType: 'choice',
    question: 'アサガオの {花|はな}で、{花粉|かふん}を つくる ところは どれかな。',
    choices: ['おしべ', 'めしべ', 'がく', '{花|はな}びら'],
    answer: 'おしべ',
    hints: ['{先|さき}の ふくろに、こなのような ものが たくさん ついて いるよ。', 'めしべの まわりに {何本|なんぼん}も あるよ。'],
    explanation: '{花粉|かふん}は「おしべ」の {先|さき}で つくられます。{花粉|かふん}が めしべの {先|さき}に つくと、やがて {実|み}が できます。',
    inputForm: { question: 'アサガオの {花|はな}で、{花粉|かふん}を つくる ところは どこかな。', acceptedAnswers: ['雄しべ', 'オシベ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g5_weather_002', subject: 'science', gradeLevel: 5, unit: 'weather',
    difficulty: 'basic', answerType: 'choice',
    question: '{台風|たいふう}が {近|ちか}づくと、どんな {天気|てんき}に なる ことが {多|おお}いかな。',
    choices: ['{強|つよ}い {風|かぜ}が ふき、{大雨|おおあめ}が ふる', '{風|かぜ}が なく、よく {晴|は}れる', '{気温|きおん}が {急|きゅう}に {下|さ}がって {雪|ゆき}が ふる', 'きりが こく なるだけで {雨|あめ}は ふらない'],
    answer: '{強|つよ}い {風|かぜ}が ふき、{大雨|おおあめ}が ふる',
    hints: ['{台風|たいふう}は、{南|みなみ}の {海|うみ}の {上|うえ}で できる {大|おお}きな うずまきの {雲|くも}だよ。', '{台風|たいふう}の ときは、こう{水|ずい}や {土|ど}しゃくずれに {注意|ちゅうい}が {必要|ひつよう}だね。'],
    explanation: '{台風|たいふう}が {近|ちか}づくと、{強|つよ}い {風|かぜ}が ふき、{大雨|おおあめ}が ふります。{夏|なつ}から {秋|あき}に かけて {日本|にほん}に {近|ちか}づく ことが {多|おお}いです。',
    reviewed: true
  },
  {
    id: 'science_g5_life_002', subject: 'science', gradeLevel: 5, unit: 'life',
    difficulty: 'basic', answerType: 'input',
    question: 'メダカの せびれに {切|き}れこみが あり、しりびれが {平行四辺形|へいこうしへんけい}に {近|ちか}い {形|かたち}を して いるのは、めすと おすの どちらかな。',
    answer: 'おす', acceptedAnswers: ['オス', '雄'], validationMode: 'kana-insensitive',
    hints: ['めすの しりびれは、うしろが せまく なって いるよ。', '{卵|たまご}を {産|う}む ほうでは ないよ。'],
    explanation: 'せびれに {切|き}れこみが あり、しりびれが {平行四辺形|へいこうしへんけい}に {近|ちか}いのが おすです。めすは せびれに {切|き}れこみが なく、しりびれの うしろが せまく なって います。',
    reviewed: true
  },
  {
    id: 'science_g5_life_003', subject: 'science', gradeLevel: 5, unit: 'life',
    difficulty: 'basic', answerType: 'input',
    question: 'ヒトの {子|こ}どもは、{生|う}まれるまで {母親|ははおや}の {体|からだ}の {中|なか}の {何|なん}と いう ところで {育|そだ}つかな。ひらがなで {答|こた}えよう。',
    answer: 'しきゅう', acceptedAnswers: ['子宮'], validationMode: 'kana-insensitive',
    hints: ['{母親|ははおや}の おなかの {中|なか}に ある ふくろの ような ところだよ。', '「し」から はじまる 3{文字|もじ}の ことばだよ。'],
    explanation: 'ヒトの {子|こ}どもは、{母親|ははおや}の「{子宮|しきゅう}」の {中|なか}で {育|そだ}ちます。',
    reviewed: true
  },
  {
    id: 'science_g5_flower_002', subject: 'science', gradeLevel: 5, unit: 'flower',
    difficulty: 'standard', answerType: 'input',
    question: 'おしべで つくられた {花粉|かふん}が、めしべの {先|さき}に つく ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'じゅふん', acceptedAnswers: ['受粉'], validationMode: 'kana-insensitive',
    hints: ['{花粉|かふん}を「{受|う}け{取|と}る」と いう {意味|いみ}の ことばだよ。', '「じゅ」から はじまる ことばだよ。'],
    explanation: '{花粉|かふん}が めしべの {先|さき}に つく ことを「{受粉|じゅふん}」と いいます。{受粉|じゅふん}すると、めしべの もとが ふくらんで {実|み}に なり、{中|なか}に {種子|しゅし}が できます。',
    reviewed: true
  },
  {
    id: 'science_g5_pendulum_002', subject: 'science', gradeLevel: 5, unit: 'pendulum',
    difficulty: 'standard', answerType: 'input',
    question: 'ふりこの {長|なが}さを {長|なが}く すると、1{往復|おうふく}する {時間|じかん}は どう なるかな。',
    answer: 'ながくなる', acceptedAnswers: ['ながく なる', '長くなる', 'ながく', '長く'], validationMode: 'kana-insensitive',
    hints: ['1{往復|おうふく}の {時間|じかん}は、ふりこの {長|なが}さで {決|き}まるよ。', 'ブランコの くさりが {長|なが}いと、ゆっくり ゆれるね。'],
    explanation: 'ふりこの {長|なが}さを {長|なが}く すると、1{往復|おうふく}する {時間|じかん}は {長|なが}く なります。{短|みじか}く すると {短|みじか}く なります。',
    reviewed: true
  },
  {
    id: 'science_g5_dissolve_003', subject: 'science', gradeLevel: 5, unit: 'dissolve',
    difficulty: 'standard', answerType: 'input',
    question: '{同|おな}じ {温度|おんど}で、{水|みず}の {量|りょう}を 2{倍|ばい}に すると、とける {食塩|しょくえん}の {量|りょう}は {何倍|なんばい}に なるかな。{数|かず}で {答|こた}えよう。',
    answer: '2', acceptedAnswers: ['2倍'], validationMode: 'number',
    hints: ['{水|みず}の {量|りょう}が ふえると、とける {量|りょう}も ふえるよ。', 'とける {量|りょう}は、{水|みず}の {量|りょう}に {比例|ひれい}するよ。'],
    explanation: '{水|みず}に とける ものの {量|りょう}は、{水|みず}の {量|りょう}に {比例|ひれい}します。{水|みず}の {量|りょう}を 2{倍|ばい}に すると、とける {量|りょう}も 2{倍|ばい}に なります。',
    reviewed: true
  },
  {
    id: 'science_g5_river_002', subject: 'science', gradeLevel: 5, unit: 'river',
    difficulty: 'standard', answerType: 'input',
    question: '{流|なが}れる {水|みず}の はたらきの うち、けずった {土|つち}や {石|いし}を {下流|かりゅう}へ {運|はこ}ぶ はたらきを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'うんぱん', acceptedAnswers: ['運搬', '運ぱん'], validationMode: 'kana-insensitive',
    hints: ['{流|なが}れる {水|みず}の はたらきには「しん{食|しょく}・○○○○・たい{積|せき}」の 3つが あるよ。', '「{運|はこ}ぶ」の {漢字|かんじ}を {使|つか}う ことばだよ。'],
    explanation: '{土|つち}や {石|いし}を {運|はこ}ぶ はたらきを「{運|うん}ぱん」と いいます。けずる はたらきは「しん{食|しょく}」、つもらせる はたらきは「たい{積|せき}」です。',
    reviewed: true
  },
  {
    id: 'science_g5_electromagnet_002', subject: 'science', gradeLevel: 5, unit: 'electromagnet',
    difficulty: 'standard', answerType: 'input',
    question: '{電磁石|でんじしゃく}に {流|なが}す {電流|でんりゅう}の {向|む}きを {反対|はんたい}に すると、N{極|きょく}と S{極|きょく}は どう なるかな。',
    answer: 'いれかわる', acceptedAnswers: ['入れかわる', '入れ替わる', 'いれかわった', 'はんたいになる', '反対になる', 'ぎゃくになる', '逆になる', 'かわる', '変わる'], validationMode: 'kana-insensitive',
    hints: ['{方位磁針|ほういじしん}を {近|ちか}づけて、はりの {向|む}きを くらべて みよう。', 'かん{電池|でんち}の {向|む}きを {反対|はんたい}に して つないで みよう。'],
    explanation: '{電流|でんりゅう}の {向|む}きを {反対|はんたい}に すると、{電磁石|でんじしゃく}の N{極|きょく}と S{極|きょく}は {入|い}れかわります。',
    reviewed: true
  },
  {
    id: 'science_g5_life_004', subject: 'science', gradeLevel: 5, unit: 'life',
    difficulty: 'standard', answerType: 'input',
    question: '{子宮|しきゅう}の {中|なか}の {子|こ}ども（{胎児|たいじ}）と {母親|ははおや}を つなぎ、{養分|ようぶん}などを やりとりする {管|くだ}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'へそのお', acceptedAnswers: ['へその緒', 'さいたい', '臍帯'], validationMode: 'kana-insensitive',
    hints: ['{生|う}まれた あと、おなかの まんなかに あとが のこるよ。', '「へそ」の ついた ことばだよ。'],
    explanation: '{胎児|たいじ}は「へその{緒|お}」で {母親|ははおや}の {胎盤|たいばん}と つながり、{養分|ようぶん}を {受|う}け{取|と}ったり、いらなく なった ものを わたしたり します。',
    reviewed: true
  },
  {
    id: 'science_g5_dissolve_004', subject: 'science', gradeLevel: 5, unit: 'dissolve',
    difficulty: 'standard', answerType: 'choice',
    question: '60℃の {水|みず}に ミョウバンを とけるだけ とかしてから、{水|みず}よう{液|えき}を {冷|ひ}やしました。どう なるかな。',
    choices: ['ミョウバンの つぶが {出|で}て くる', '{何|なに}も {変|か}わらない', '{水|みず}よう{液|えき}が {赤|あか}く なる', 'あわが {出|で}て くる'],
    answer: 'ミョウバンの つぶが {出|で}て くる',
    hints: ['ミョウバンは、{温度|おんど}が {高|たか}いほど たくさん とけるよ。', '{温度|おんど}が {下|さ}がると、とけて いられる {量|りょう}は どう なるかな。'],
    explanation: 'ミョウバンは {温度|おんど}が {低|ひく}く なると とける {量|りょう}が {少|すく}なく なるので、とけきれなく なった ぶんが つぶに なって {出|で}て きます。',
    reviewed: true
  },
  {
    id: 'science_g5_plant_003', subject: 'science', gradeLevel: 5, unit: 'plant',
    difficulty: 'standard', answerType: 'choice',
    question: '{植物|しょくぶつ}の {成長|せいちょう}に {日光|にっこう}が {必要|ひつよう}かを {調|しら}べます。2つの はちで {変|か}える {条件|じょうけん}は どれかな。',
    choices: ['{日光|にっこう}に {当|あ}てるか {当|あ}てないか だけ', '{日光|にっこう}と {肥料|ひりょう}の {両方|りょうほう}', '{水|みず}を やるか やらないか だけ', 'すべての {条件|じょうけん}'],
    answer: '{日光|にっこう}に {当|あ}てるか {当|あ}てないか だけ',
    hints: ['{調|しら}べたい {条件|じょうけん}だけを {変|か}えるよ。', 'ほかの {条件|じょうけん}まで {変|か}えると、{何|なに}が {原因|げんいん}か わからなく なるね。'],
    explanation: '{調|しら}べたい {条件|じょうけん}（{日光|にっこう}）だけを {変|か}え、{水|みず}・{肥料|ひりょう}・{温度|おんど}などの ほかの {条件|じょうけん}は {同|おな}じに します。',
    reviewed: true
  },
  {
    id: 'science_g5_river_003', subject: 'science', gradeLevel: 5, unit: 'river',
    difficulty: 'standard', answerType: 'choice',
    question: '{川|かわ}の {上流|じょうりゅう}で {見|み}られる {石|いし}は、どんな ようすが {多|おお}いかな。',
    choices: ['{大|おお}きく、{角|かど}ばって いる', '{小|ちい}さく、{丸|まる}みを おびて いる', 'すなのように こまかい', '{上流|じょうりゅう}には {石|いし}が ない'],
    answer: '{大|おお}きく、{角|かど}ばって いる',
    hints: ['{石|いし}は {流|なが}されながら、ぶつかり{合|あ}って けずられて いくよ。', '{上流|じょうりゅう}の {石|いし}は、まだ あまり {流|なが}されて いないね。'],
    explanation: '{上流|じょうりゅう}の {石|いし}は {大|おお}きく {角|かど}ばって います。{下流|かりゅう}へ {流|なが}される {間|あいだ}に われたり けずられたり して、{小|ちい}さく {丸|まる}く なります。',
    reviewed: true
  },
  {
    id: 'science_g5_weather_003', subject: 'science', gradeLevel: 5, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: '{空|そら}{全体|ぜんたい}の {広|ひろ}さを 10と したとき、{雲|くも}の {量|りょう}が いくつの ときを「{晴|は}れ」と するかな。',
    choices: ['0〜8', '9〜10', '0だけ', '5〜10'],
    answer: '0〜8',
    hints: ['{雲|くも}が {少|すこ}し あっても「{晴|は}れ」と いうよ。', '9〜10は「くもり」だよ。'],
    explanation: '{雲|くも}の {量|りょう}が 0〜8の ときを「{晴|は}れ」、9〜10の ときを「くもり」と します（{雨|あめ}が ふって いる ときは {雨|あめ}）。',
    reviewed: true
  },
  {
    id: 'science_g5_dissolve_005', subject: 'science', gradeLevel: 5, unit: 'dissolve',
    difficulty: 'advanced', answerType: 'input',
    question: 'ある {温度|おんど}で、{水|みず} 50mLに {食塩|しょくえん}は 18gまで とけました。{同|おな}じ {温度|おんど}で、{水|みず} 100mLには {何|なん}gまで とけるかな。{数|かず}で {答|こた}えよう。',
    answer: '36', acceptedAnswers: ['36g'], validationMode: 'number',
    hints: ['{水|みず}の {量|りょう}が 2{倍|ばい}に なって いるね。', 'とける {量|りょう}は {水|みず}の {量|りょう}に {比例|ひれい}するよ。18×2＝？'],
    explanation: '{水|みず}の {量|りょう}が 2{倍|ばい}なので、とける {食塩|しょくえん}の {量|りょう}も 2{倍|ばい}に なります。18×2＝36gです。',
    reviewed: true
  },
  {
    id: 'science_g5_pendulum_003', subject: 'science', gradeLevel: 5, unit: 'pendulum',
    difficulty: 'advanced', answerType: 'input',
    question: 'ふりこが 10{往復|おうふく}するのに 15{秒|びょう}かかりました。1{往復|おうふく}する {時間|じかん}は {何秒|なんびょう}かな。{数|かず}で {答|こた}えよう。',
    answer: '1.5', acceptedAnswers: ['1.5秒'], validationMode: 'number',
    hints: ['1{往復|おうふく}は とても {短|みじか}いので、10{往復|おうふく}の {時間|じかん}を はかって {計算|けいさん}するよ。', '15÷10 を {計算|けいさん}しよう。'],
    explanation: '15÷10＝1.5{秒|びょう}です。10{往復|おうふく}の {時間|じかん}を はかって 10で わると、はかり まちがいの えいきょうを {小|ちい}さく できます。',
    reviewed: true
  },
  {
    id: 'science_g5_life_005', subject: 'science', gradeLevel: 5, unit: 'life',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ヒトの {子|こ}どもが {受精|じゅせい}してから {生|う}まれるまでの {期間|きかん}は、およそ どれくらいかな。',
    choices: ['{約|やく}38{週|しゅう}', '{約|やく}10{週|しゅう}', '{約|やく}20{週|しゅう}', '{約|やく}52{週|しゅう}'],
    answer: '{約|やく}38{週|しゅう}',
    hints: ['1{年|ねん}（{約|やく}52{週|しゅう}）より {短|みじか}いよ。', '9か{月|げつ}くらいだよ。'],
    explanation: 'ヒトの {子|こ}どもは、{受精|じゅせい}してから {約|やく}38{週|しゅう}で {生|う}まれます。{生|う}まれる ときの {身長|しんちょう}は {約|やく}50cm、{体重|たいじゅう}は {約|やく}3000gです。',
    inputForm: { question: 'ヒトの {子|こ}どもが {受精|じゅせい}してから {生|う}まれるまでの {期間|きかん}は、およそ 何週かな。', answer: '38', acceptedAnswers: ['約38週', '38週', 'やく38週'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g5_flower_003', subject: 'science', gradeLevel: 5, unit: 'flower',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ヘチマの {花|はな}には、めばなと おばなが あります。{実|み}に なるのは どちらかな。',
    choices: ['めばな', 'おばな', 'めばなと おばなの {両方|りょうほう}', 'どちらも {実|み}に ならない'],
    answer: 'めばな',
    hints: ['{実|み}に なるのは、めしべの もとの {部分|ぶぶん}だよ。', 'めしべが あるのは どちらの {花|はな}かな。'],
    explanation: 'ヘチマは めばなに めしべ、おばなに おしべが あります。{受粉|じゅふん}すると、めばなの めしべの もとが ふくらんで {実|み}に なります。',
    inputForm: { acceptedAnswers: ['雌花'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv6（小学6年） =====
  {
    id: 'science_g6_combustion_001', subject: 'science', gradeLevel: 6, unit: 'combustion',
    difficulty: 'basic', answerType: 'choice',
    question: 'ものが {燃|も}えるときに {使|つか}われる {気体|きたい}は どれかな。',
    choices: ['{酸素|さんそ}', 'ちっ{素|そ}', '{二酸化炭素|にさんかたんそ}', '{水素|すいそ}'],
    answer: '{酸素|さんそ}',
    hints: ['{空気|くうき}の {約|やく}5{分|ぶん}の1を しめる {気体|きたい}だよ。', '{人|ひと}が {呼吸|こきゅう}で とり{入|い}れる {気体|きたい}と {同|おな}じだよ。'],
    explanation: 'ものが {燃|も}えるときには {酸素|さんそ}が {使|つか}われ、{二酸化炭素|にさんかたんそ}が できます。{空気|くうき}の {約|やく}78％を しめる ちっ{素|そ}は、ものを {燃|も}やす はたらきが ありません。',
    inputForm: { question: 'ものが {燃|も}えるときに {使|つか}われる 気体は 何かな。', acceptedAnswers: ['さんそ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g6_combustion_002', subject: 'science', gradeLevel: 6, unit: 'combustion',
    difficulty: 'basic', answerType: 'input',
    question: '{木|き}や {紙|かみ}が {燃|も}えた あと、{空気|くうき}の {中|なか}で {増|ふ}える {気体|きたい}は {何|なん}かな。',
    answer: 'にさんかたんそ', acceptedAnswers: ['二酸化炭素', 'CO2'], validationMode: 'kana-insensitive',
    hints: ['{石灰水|せっかいすい}を {白|しろ}く にごらせる {気体|きたい}だよ。', '{人|ひと}が はく {息|いき}にも {多|おお}く ふくまれて いるよ。'],
    explanation: 'ものが {燃|も}えると {酸素|さんそ}が {使|つか}われて「{二酸化炭素|にさんかたんそ}」が できます。{二酸化炭素|にさんかたんそ}は {石灰水|せっかいすい}を {白|しろ}く にごらせます。',
    reviewed: true
  },
  {
    id: 'science_g6_body_001', subject: 'science', gradeLevel: 6, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '{口|くち}の {中|なか}で、ごはんに ふくまれる でんぷんを {別|べつ}の ものに {変|か}える {消化液|しょうかえき}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'だえき', acceptedAnswers: ['唾液', 'だ液'], validationMode: 'kana-insensitive',
    hints: ['{口|くち}の {中|なか}に {出|で}て くる えきだよ。', 'ごはんを よく かむと、あまく {感|かん}じるのは この えきの はたらきだよ。'],
    explanation: '「だ{液|えき}」は でんぷんを {別|べつ}の ものに {変|か}える {消化液|しょうかえき}です。ごはんを よく かむと あまく {感|かん}じるのは このためです。',
    reviewed: true
  },
  {
    id: 'science_g6_plant_001', subject: 'science', gradeLevel: 6, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: '{植物|しょくぶつ}の {体|からだ}の {水|みず}が、おもに {葉|は}から {水蒸気|すいじょうき}と なって {出|で}て いく ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'じょうさん', acceptedAnswers: ['蒸散'], validationMode: 'kana-insensitive',
    hints: ['{葉|は}に ふくろを かぶせて おくと、ふくろの {内側|うちがわ}に {水|みず}てきが つくよ。', '「{蒸|む}す」の {字|じ}が {入|はい}る ことばだよ。'],
    explanation: '{葉|は}の {気孔|きこう}から {水|みず}が {水蒸気|すいじょうき}と なって {出|で}て いく ことを「{蒸散|じょうさん}」と いいます。',
    reviewed: true
  },
  {
    id: 'science_g6_lever_001', subject: 'science', gradeLevel: 6, unit: 'lever',
    difficulty: 'standard', answerType: 'input',
    question: 'てこの {支点|してん}から {左|ひだり}に 20cmの ところに 30gの おもりを つるしました。{支点|してん}から {右|みぎ}に 10cmの ところに {何|なん}gの おもりを つるすと、てこは つり{合|あ}うかな。{数|かず}で {答|こた}えよう。',
    answer: '60', acceptedAnswers: ['60g'], validationMode: 'number',
    hints: ['てこが つり{合|あ}うのは、{左右|さゆう}で「おもりの {重|おも}さ × {支点|してん}からの きょり」が {等|ひと}しい とき。', '{左|ひだり}は 30×20＝600。{右|みぎ}は □×10＝600。'],
    explanation: '{左|ひだり}：30×20＝600。{右|みぎ}：□×10＝600 なので、□＝60。60gの おもりを つるすと つり{合|あ}います。',
    reviewed: true
  },
  {
    id: 'science_g6_gas_001', subject: 'science', gradeLevel: 6, unit: 'gas',
    difficulty: 'standard', answerType: 'choice',
    question: '{石灰水|せっかいすい}に ある {気体|きたい}を ふきこむと、{白|しろ}く にごりました。この {気体|きたい}は どれかな。',
    choices: ['{二酸化炭素|にさんかたんそ}', '{酸素|さんそ}', 'ちっ{素|そ}', '{水素|すいそ}'],
    answer: '{二酸化炭素|にさんかたんそ}',
    hints: ['{人|ひと}が はく {息|いき}を {石灰水|せっかいすい}に ふきこんでも {白|しろ}く にごるよ。', 'ものが {燃|も}えた あとに {増|ふ}える {気体|きたい}だよ。'],
    explanation: '{石灰水|せっかいすい}を {白|しろ}く にごらせるのは {二酸化炭素|にさんかたんそ}です。{二酸化炭素|にさんかたんそ}が あるかを {調|しら}べるのに {使|つか}います。',
    inputForm: { question: '{石灰水|せっかいすい}に ある {気体|きたい}を ふきこむと、{白|しろ}く にごりました。この 気体は 何かな。', acceptedAnswers: ['にさんかたんそ', 'CO2'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g6_solution_001', subject: 'science', gradeLevel: 6, unit: 'solution',
    difficulty: 'standard', answerType: 'choice',
    question: 'うすい {塩酸|えんさん}を リトマス{紙|し}に つけると、どう なるかな。',
    choices: ['{青色|あおいろ}の リトマス{紙|し}が {赤色|あかいろ}に {変|か}わる', '{赤色|あかいろ}の リトマス{紙|し}が {青色|あおいろ}に {変|か}わる', 'どちらの リトマス{紙|し}も {色|いろ}が {変|か}わらない', 'どちらの リトマス{紙|し}も {白|しろ}く なる'],
    answer: '{青色|あおいろ}の リトマス{紙|し}が {赤色|あかいろ}に {変|か}わる',
    hints: ['{塩酸|えんさん}は {酸性|さんせい}の {水溶液|すいようえき}だよ。', '{酸性|さんせい}は「{青|あお}→{赤|あか}」、アルカリ{性|せい}は「{赤|あか}→{青|あお}」。'],
    explanation: '{塩酸|えんさん}は {酸性|さんせい}なので、{青色|あおいろ}の リトマス{紙|し}を {赤色|あかいろ}に {変|か}えます。アルカリ{性|せい}の {水溶液|すいようえき}は {赤色|あかいろ}の リトマス{紙|し}を {青色|あおいろ}に {変|か}えます。',
    reviewed: true
  },
  {
    id: 'science_g6_earth_001', subject: 'science', gradeLevel: 6, unit: 'earth',
    difficulty: 'advanced', answerType: 'input',
    question: '{地層|ちそう}の {中|なか}で、つぶの {大|おお}きさが 2mm{以上|いじょう}の「れき」が おし{固|かた}められて できた {岩石|がんせき}を {何|なん}と いうかな。',
    answer: 'れき岩', acceptedAnswers: ['れきがん', '礫岩'], validationMode: 'kana-insensitive',
    hints: ['{砂|すな}が {固|かた}まった {岩石|がんせき}は「{砂岩|さがん}」、どろが {固|かた}まった {岩石|がんせき}は「でい{岩|がん}」。', '「れき」＋「{岩|がん}」だよ。'],
    explanation: 'れきが {固|かた}まって できた {岩石|がんせき}は「れき{岩|がん}」です。{砂|すな}なら {砂岩|さがん}、どろなら でい{岩|がん}に なります。',
    reviewed: true
  },
  {
    id: 'science_g6_moon_001', subject: 'science', gradeLevel: 6, unit: 'moon',
    difficulty: 'advanced', answerType: 'choice',
    question: '{月|つき}が {満月|まんげつ}に {見|み}えるとき、{月|つき}は {地球|ちきゅう}から {見|み}て どの {位置|いち}に あるかな。',
    choices: ['{太陽|たいよう}と {反対|はんたい}の {方向|ほうこう}', '{太陽|たいよう}と {同|おな}じ {方向|ほうこう}', '{太陽|たいよう}から {見|み}て {真横|まよこ}', '{地球|ちきゅう}の {真|ま}うら{側|がわ}の {地下|ちか}'],
    answer: '{太陽|たいよう}と {反対|はんたい}の {方向|ほうこう}',
    hints: ['{月|つき}は {太陽|たいよう}の {光|ひかり}を {反射|はんしゃ}して {光|ひか}って いるよ。', '{地球|ちきゅう}から {見|み}て、{月|つき}の {光|ひか}って いる {面|めん}が {全部|ぜんぶ} {見|み}えるのは どんな とき かな。'],
    explanation: '{満月|まんげつ}は、{地球|ちきゅう}から {見|み}て {月|つき}が {太陽|たいよう}と {反対|はんたい}の {方向|ほうこう}に あり、{太陽|たいよう}に {照|て}らされた {面|めん}が {全部|ぜんぶ} {見|み}えるときです。{夕方|ゆうがた}に {東|ひがし}から のぼります。',
    inputForm: { answer: '太陽と反対の方向', acceptedAnswers: ['太陽と 反対の 方向', '太陽と反対', '太陽の反対', '太陽と反対側', '太陽の反対側'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g6_body_002', subject: 'science', gradeLevel: 6, unit: 'body',
    difficulty: 'basic', answerType: 'choice',
    question: 'はい（{肺|はい}）で、{吸|す}った {空気|くうき}から {血液|けつえき}に {取|と}り{入|い}れられる {気体|きたい}は どれかな。',
    choices: ['{酸素|さんそ}', '{二酸化炭素|にさんかたんそ}', 'ちっ{素|そ}', '{水素|すいそ}'],
    answer: '{酸素|さんそ}',
    hints: ['はいた {息|いき}には、{吸|す}った {空気|くうき}より この {気体|きたい}が {少|すく}なく なって いるよ。', '{体|からだ}の {中|なか}で {養分|ようぶん}を {使|つか}う ときに {必要|ひつよう}な {気体|きたい}だよ。'],
    explanation: '{肺|はい}では、{空気中|くうきちゅう}の {酸素|さんそ}が {血液|けつえき}に {取|と}り{入|い}れられ、{血液中|けつえきちゅう}の {二酸化炭素|にさんかたんそ}が {出|だ}されます。',
    inputForm: { question: 'はい（{肺|はい}）で、{吸|す}った {空気|くうき}から {血液|けつえき}に {取|と}り{入|い}れられる 気体は 何かな。', acceptedAnswers: ['さんそ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g6_electric_001', subject: 'science', gradeLevel: 6, unit: 'electric',
    difficulty: 'basic', answerType: 'choice',
    question: '{手回|てまわ}し{発電機|はつでんき}で つくった {電気|でんき}を、ためて おく ことが できる ものは どれかな。',
    choices: ['コンデンサー', '{発光|はっこう}ダイオード', '{豆電球|まめでんきゅう}', 'モーター'],
    answer: 'コンデンサー',
    hints: ['{電気|でんき}を ためて、あとから {使|つか}える ようにする ものだよ。', '{発光|はっこう}ダイオードや {豆電球|まめでんきゅう}は、{電気|でんき}を {光|ひかり}に {変|か}える ものだね。'],
    explanation: '「コンデンサー」は {電気|でんき}を ためる ことが できます。{発光|はっこう}ダイオードと {豆電球|まめでんきゅう}は {電気|でんき}を {光|ひかり}に、モーターは {電気|でんき}を {運動|うんどう}に {変|か}えます。',
    inputForm: { question: '{手回|てまわ}し{発電機|はつでんき}で つくった {電気|でんき}を、ためて おく ことが できる ものは 何かな。', acceptedAnswers: ['コンデンサ', 'ちくでんき', '蓄電器'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g6_body_003', subject: 'science', gradeLevel: 6, unit: 'body',
    difficulty: 'basic', answerType: 'input',
    question: 'ちぢんだり ゆるんだり して、{血液|けつえき}を {全身|ぜんしん}に {送|おく}り{出|だ}して いる {臓器|ぞうき}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'しんぞう', acceptedAnswers: ['心臓'], validationMode: 'kana-insensitive',
    hints: ['むねに {手|て}を あてると、どきどきと {動|うご}いて いるのが わかるよ。', 'この {動|うご}きを「はく{動|どう}」と いうよ。'],
    explanation: '「{心臓|しんぞう}」は ちぢんだり ゆるんだり して、{血液|けつえき}を {全身|ぜんしん}に {送|おく}り{出|だ}して います。この {動|うご}きを はく{動|どう}と いい、{手首|てくび}などで {脈|みゃく}はくとして {感|かん}じられます。',
    reviewed: true
  },
  {
    id: 'science_g6_solution_002', subject: 'science', gradeLevel: 6, unit: 'solution',
    difficulty: 'basic', answerType: 'input',
    question: '{炭酸水|たんさんすい}は、{水|みず}に ある {気体|きたい}が とけた {水|すい}よう{液|えき}です。とけて いる {気体|きたい}は {何|なん}かな。',
    answer: 'にさんかたんそ', acceptedAnswers: ['二酸化炭素', 'CO2'], validationMode: 'kana-insensitive',
    hints: ['{炭酸水|たんさんすい}の あわを {石灰水|せっかいすい}に {通|とお}すと、{白|しろ}く にごるよ。', 'ものが {燃|も}えた あとに ふえる {気体|きたい}と {同|おな}じだよ。'],
    explanation: '{炭酸水|たんさんすい}には「{二酸化炭素|にさんかたんそ}」が とけて います。{気体|きたい}が とけた {水|すい}よう{液|えき}は、{水|みず}を {蒸発|じょうはつ}させても {何|なに}も {残|のこ}りません。',
    reviewed: true
  },
  {
    id: 'science_g6_plant_002', subject: 'science', gradeLevel: 6, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: '{日光|にっこう}に {当|あ}てた {葉|は}を ヨウ{素液|そえき}に つけると、{青|あお}むらさき{色|いろ}に なりました。{葉|は}で つくられた {養分|ようぶん}は {何|なに}かな。',
    answer: 'でんぷん', acceptedAnswers: ['デンプン'], validationMode: 'kana-insensitive',
    hints: ['ヨウ{素液|そえき}で {青|あお}むらさき{色|いろ}に なる {養分|ようぶん}だよ。', 'ごはんや じゃがいもに たくさん ふくまれて いるよ。'],
    explanation: '{植物|しょくぶつ}の {葉|は}に {日光|にっこう}が {当|あ}たると、「でんぷん」が つくられます。{日光|にっこう}に {当|あ}てない {葉|は}では、でんぷんは できません。',
    reviewed: true
  },
  {
    id: 'science_g6_body_004', subject: 'science', gradeLevel: 6, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '{消化|しょうか}された {養分|ようぶん}を、おもに {吸収|きゅうしゅう}する {臓器|ぞうき}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'しょうちょう', acceptedAnswers: ['小腸'], validationMode: 'kana-insensitive',
    hints: ['{胃|い}の {次|つぎ}に {食|た}べ{物|もの}が {通|とお}る、とても {長|なが}い {管|くだ}だよ。', '「{大腸|だいちょう}」では なく、もう {一方|いっぽう}だよ。'],
    explanation: '{養分|ようぶん}は、おもに「{小腸|しょうちょう}」で {吸収|きゅうしゅう}されて {血液|けつえき}に {入|はい}ります。{大腸|だいちょう}では おもに {水分|すいぶん}が {吸収|きゅうしゅう}されます。',
    reviewed: true
  },
  {
    id: 'science_g6_lever_002', subject: 'science', gradeLevel: 6, unit: 'lever',
    difficulty: 'standard', answerType: 'input',
    question: 'てこで、ぼうを ささえる ところを {支点|してん}、ものに {力|ちから}が はたらく ところを {作用点|さようてん}と いいます。{人|ひと}が {力|ちから}を {加|くわ}える ところを {何|なん}と いうかな。',
    answer: 'りきてん', acceptedAnswers: ['力点'], validationMode: 'kana-insensitive',
    hints: ['「{支点|してん}」「{作用点|さようてん}」と {同|おな}じく「{点|てん}」が つくよ。', '「{力|ちから}」の {字|じ}を {使|つか}う ことばだよ。'],
    explanation: '{人|ひと}が {力|ちから}を {加|くわ}える ところを「{力点|りきてん}」と いいます。{力点|りきてん}が {支点|してん}から {遠|とお}いほど、{小|ちい}さな {力|ちから}で ものを {持|も}ち{上|あ}げられます。',
    reviewed: true
  },
  {
    id: 'science_g6_ecology_001', subject: 'science', gradeLevel: 6, unit: 'ecology',
    difficulty: 'standard', answerType: 'input',
    question: '「{草|くさ} → バッタ → カエル → ヘビ」のように、{生物|せいぶつ}どうしが「{食|た}べる・{食|た}べられる」の {関係|かんけい}で つながって いる ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'しょくもつれんさ', acceptedAnswers: ['食物連鎖', '食物れんさ'], validationMode: 'kana-insensitive',
    hints: ['くさりのように つながって いる ことを「れんさ」と いうよ。', '「しょく」から はじまる ことばだよ。'],
    explanation: '「{食|た}べる・{食|た}べられる」の {関係|かんけい}の つながりを「{食物|しょくもつ}れんさ」と いいます。もとを たどると、{日光|にっこう}を {受|う}けて {養分|ようぶん}を つくる {植物|しょくぶつ}に いきつきます。',
    reviewed: true
  },
  {
    id: 'science_g6_earth_002', subject: 'science', gradeLevel: 6, unit: 'earth',
    difficulty: 'standard', answerType: 'input',
    question: '{地層|ちそう}の {中|なか}から {見|み}つかる、{大昔|おおむかし}の {生物|せいぶつ}の {体|からだ}や {足|あし}あとなどが {残|のこ}った ものを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'かせき', acceptedAnswers: ['化石'], validationMode: 'kana-insensitive',
    hints: ['{恐竜|きょうりゅう}の ほねや、{貝|かい}の {形|かたち}が {残|のこ}った {石|いし}などが あるよ。', '「か」から はじまる 3{文字|もじ}の ことばだよ。'],
    explanation: '{大昔|おおむかし}の {生物|せいぶつ}の {体|からだ}や {足|あし}あとなどが {地層|ちそう}の {中|なか}に {残|のこ}った ものを「{化石|かせき}」と いいます。{化石|かせき}から、その {地層|ちそう}が できた ころの ようすが わかります。',
    reviewed: true
  },
  {
    id: 'science_g6_electric_002', subject: 'science', gradeLevel: 6, unit: 'electric',
    difficulty: 'standard', answerType: 'input',
    question: '{手回|てまわ}し{発電機|はつでんき}に {豆電球|まめでんきゅう}を つないで、ハンドルを {速|はや}く {回|まわ}しました。ゆっくり {回|まわ}した ときと くらべて、{豆電球|まめでんきゅう}の {明|あか}るさは どう なるかな。',
    answer: 'あかるくなる', acceptedAnswers: ['あかるく なる', '明るくなる', 'あかるく', '明るく'], validationMode: 'kana-insensitive',
    hints: ['{速|はや}く {回|まわ}すほど、つくられる {電気|でんき}は どう なるかな。', 'ハンドルを {回|まわ}す {手|て}ごたえも {変|か}わるよ。'],
    explanation: 'ハンドルを {速|はや}く {回|まわ}すほど {大|おお}きな {電流|でんりゅう}が {流|なが}れ、{豆電球|まめでんきゅう}は {明|あか}るく なります。{回|まわ}す {向|む}きを {反対|はんたい}に すると、{電流|でんりゅう}の {向|む}きも {反対|はんたい}に なります。',
    reviewed: true
  },
  {
    id: 'science_g6_solution_003', subject: 'science', gradeLevel: 6, unit: 'solution',
    difficulty: 'standard', answerType: 'choice',
    question: 'アルミニウムはくに うすい {塩酸|えんさん}を {加|くわ}えると、どう なるかな。',
    choices: ['あわを {出|だ}して とける', '{何|なに}も {変|か}わらない', '{赤|あか}く {色|いろ}が {変|か}わるだけ', 'かたまって {大|おお}きく なる'],
    answer: 'あわを {出|だ}して とける',
    hints: ['{塩酸|えんさん}には、{金属|きんぞく}を {変化|へんか}させる はたらきが あるよ。', 'はげしく あわが {出|で}て、アルミニウムは {見|み}えなく なるよ。'],
    explanation: 'うすい {塩酸|えんさん}に アルミニウムを {入|い}れると、あわ（{水素|すいそ}）を {出|だ}して とけます。とけた {液|えき}を {蒸発|じょうはつ}させて {出|で}て くる ものは、もとの アルミニウムとは ちがう ものです。',
    reviewed: true
  },
  {
    id: 'science_g6_combustion_003', subject: 'science', gradeLevel: 6, unit: 'combustion',
    difficulty: 'standard', answerType: 'choice',
    question: 'びんの {中|なか}で ろうそくを {燃|も}やしました。{燃|も}やす {前|まえ}と くらべて、{燃|も}やした {後|あと}の びんの {中|なか}の {空気|くうき}は どう なって いるかな。',
    choices: ['{酸素|さんそ}が へり、{二酸化炭素|にさんかたんそ}が ふえて いる', '{酸素|さんそ}が なくなり、ちっ{素|そ}も なくなって いる', '{二酸化炭素|にさんかたんそ}が へり、{酸素|さんそ}が ふえて いる', '{何|なに}も {変|か}わって いない'],
    answer: '{酸素|さんそ}が へり、{二酸化炭素|にさんかたんそ}が ふえて いる',
    hints: ['ものが {燃|も}える ときに {使|つか}われる {気体|きたい}と、できる {気体|きたい}を {考|かんが}えよう。', '{酸素|さんそ}は {全部|ぜんぶ}は なくならないよ。ちっ{素|そ}は ほとんど {変|か}わらないよ。'],
    explanation: 'ろうそくが {燃|も}えると {酸素|さんそ}の {一部|いちぶ}が {使|つか}われて へり、{二酸化炭素|にさんかたんそ}が ふえます。ちっ{素|そ}は ほとんど {変|か}わりません。',
    reviewed: true
  },
  {
    id: 'science_g6_moon_002', subject: 'science', gradeLevel: 6, unit: 'moon',
    difficulty: 'standard', answerType: 'choice',
    question: '{夕方|ゆうがた}、{西|にし}の {空|そら}の {低|ひく}い ところに {見|み}える {月|つき}は どれかな。',
    choices: ['{三日月|みかづき}', '{満月|まんげつ}', '{左側|ひだりがわ}が {光|ひか}った {半月|はんげつ}（{下弦|かげん}の {月|つき}）', '{新月|しんげつ}'],
    answer: '{三日月|みかづき}',
    hints: ['{月|つき}は、{太陽|たいよう}の ある {側|がわ}が {光|ひか}って {見|み}えるよ。', '{夕方|ゆうがた}、{太陽|たいよう}は {西|にし}に しずむね。{満月|まんげつ}は {夕方|ゆうがた}に {東|ひがし}から のぼるよ。'],
    explanation: '{夕方|ゆうがた}に {西|にし}の {空|そら}に {見|み}えるのは、{太陽|たいよう}に {近|ちか}い {方向|ほうこう}に ある {三日月|みかづき}です。{右側|みぎがわ}（{太陽|たいよう}の {側|がわ}）が {細|ほそ}く {光|ひか}って {見|み}えます。',
    inputForm: { question: '{夕方|ゆうがた}、{西|にし}の {空|そら}の {低|ひく}い ところに {見|み}える 月を 何と いうかな。', acceptedAnswers: ['みかづき'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g6_earth_003', subject: 'science', gradeLevel: 6, unit: 'earth',
    difficulty: 'standard', answerType: 'choice',
    question: '{火山|かざん}の ふん{火|か}で ふり{積|つ}もった {火山灰|かざんばい}の つぶを けんび{鏡|きょう}で {見|み}ると、どんな {形|かたち}を して いるかな。',
    choices: ['{角|かど}ばって いる', '{丸|まる}みを おびて いる', 'すべて {同|おな}じ {大|おお}きさの {球|きゅう}の {形|かたち}', 'やわらかい どろのよう'],
    answer: '{角|かど}ばって いる',
    hints: ['{流|なが}れる {水|みず}で {運|はこ}ばれた つぶは、ぶつかり{合|あ}って {丸|まる}く なるね。', '{火山灰|かざんばい}は {水|みず}で {運|はこ}ばれて いないよ。'],
    explanation: '{火山灰|かざんばい}の つぶは {角|かど}ばって います。{流|なが}れる {水|みず}の はたらきで できた {地層|ちそう}の つぶは、{丸|まる}みを おびて います。',
    inputForm: { answer: '角ばっている', acceptedAnswers: ['角ばって いる', 'かどばっている', '角ばる', 'とがっている', 'ごつごつしている'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g6_lever_003', subject: 'science', gradeLevel: 6, unit: 'lever',
    difficulty: 'advanced', answerType: 'input',
    question: '{実験用|じっけんよう}てこの {左|ひだり}の うでの めもり 4に 30gの おもりを つるしました。{右|みぎ}の うでの めもり 6に {何|なん}gの おもりを つるすと つり{合|あ}うかな。{数|かず}で {答|こた}えよう。',
    answer: '20', acceptedAnswers: ['20g'], validationMode: 'number',
    hints: ['「おもりの {重|おも}さ × {支点|してん}からの きょり（めもり）」が {左右|さゆう}で {等|ひと}しい とき つり{合|あ}うよ。', '{左|ひだり}は 30×4＝120。{右|みぎ}は □×6＝120。'],
    explanation: '{左|ひだり}：30×4＝120。{右|みぎ}：□×6＝120 なので、□＝20。20gの おもりを つるすと つり{合|あ}います。',
    reviewed: true
  },
  {
    id: 'science_g6_body_005', subject: 'science', gradeLevel: 6, unit: 'body',
    difficulty: 'advanced', answerType: 'input',
    question: '{血液|けつえき}の {中|なか}の いらなく なった ものを こし{出|だ}して、にょうを つくる {臓器|ぞうき}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'じんぞう', acceptedAnswers: ['腎臓'], validationMode: 'kana-insensitive',
    hints: ['せなかの こしの あたりに、{左右|さゆう} 1つずつ あるよ。', 'つくられた にょうは ぼうこうに ためられるよ。'],
    explanation: '「じん{臓|ぞう}」は、{血液|けつえき}の {中|なか}の いらなく なった ものを こし{出|だ}して にょうを つくります。にょうは ぼうこうに ためられてから {体|からだ}の {外|そと}へ {出|だ}されます。',
    reviewed: true
  },
  {
    id: 'science_g6_solution_004', subject: 'science', gradeLevel: 6, unit: 'solution',
    difficulty: 'advanced', answerType: 'choice',
    question: '{次|つぎ}の {水|すい}よう{液|えき}の うち、{赤色|あかいろ}の リトマス{紙|し}を {青色|あおいろ}に {変|か}えるのは どれかな。',
    choices: ['{石灰水|せっかいすい}', '{食塩水|しょくえんすい}', '{炭酸水|たんさんすい}', 'うすい {塩酸|えんさん}'],
    answer: '{石灰水|せっかいすい}',
    hints: ['{赤色|あかいろ}の リトマス{紙|し}を {青色|あおいろ}に {変|か}えるのは アルカリ{性|せい}の {水|すい}よう{液|えき}だよ。', '{炭酸水|たんさんすい}と {塩酸|えんさん}は {酸性|さんせい}、{食塩水|しょくえんすい}は {中性|ちゅうせい}だよ。'],
    explanation: '{石灰水|せっかいすい}は アルカリ{性|せい}なので、{赤色|あかいろ}の リトマス{紙|し}を {青色|あおいろ}に {変|か}えます。{炭酸水|たんさんすい}と うすい {塩酸|えんさん}は {酸性|さんせい}、{食塩水|しょくえんすい}は {中性|ちゅうせい}です。',
    reviewed: true
  },
  {
    id: 'science_g6_electric_003', subject: 'science', gradeLevel: 6, unit: 'electric',
    difficulty: 'advanced', answerType: 'choice',
    question: '{同|おな}じ {量|りょう}の {電気|でんき}を ためた コンデンサーを {使|つか}って、{豆電球|まめでんきゅう}と {発光|はっこう}ダイオードを {光|ひか}らせました。{長|なが}い {時間|じかん} {光|ひか}るのは どちらかな。',
    choices: ['{発光|はっこう}ダイオード', '{豆電球|まめでんきゅう}', 'どちらも {同|おな}じ', 'どちらも {光|ひか}らない'],
    answer: '{発光|はっこう}ダイオード',
    hints: ['{少|すく}ない {電気|でんき}で {光|ひか}る ことが できるのは どちらかな。', '{豆電球|まめでんきゅう}は {光|ひか}る ときに {熱|ねつ}も たくさん {出|だ}すよ。'],
    explanation: '{発光|はっこう}ダイオードは、{豆電球|まめでんきゅう}より {少|すく}ない {電気|でんき}で {光|ひか}るので、{長|なが}い {時間|じかん} {光|ひか}ります。このため、{信号機|しんごうき}や {照明|しょうめい}などに {使|つか}われて います。',
    inputForm: { acceptedAnswers: ['LED', 'はっこうダイオード'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv7（中学1年） =====
  {
    id: 'science_g7_plant_001', subject: 'science', gradeLevel: 7, unit: 'plant',
    difficulty: 'basic', answerType: 'choice',
    question: 'マツの {仲間|なかま}は、{植物|しょくぶつ}の {分類|ぶんるい}で どれに あたるか。',
    choices: ['{裸子植物|らししょくぶつ}', '{被子植物|ひししょくぶつ}', 'シダ{植物|しょくぶつ}', 'コケ{植物|しょくぶつ}'],
    answer: '{裸子植物|らししょくぶつ}',
    hints: ['マツは {種子|しゅし}で ふえる {植物|しょくぶつ}。', '{胚珠|はいしゅ}が {子房|しぼう}に つつまれて いるか、むき{出|だ}しか。'],
    explanation: 'マツは {種子|しゅし}で ふえ、{胚珠|はいしゅ}が むき{出|だ}しに なって いるので {裸子植物|らししょくぶつ}です。{胚珠|はいしゅ}が {子房|しぼう}に つつまれて いる {植物|しょくぶつ}は {被子植物|ひししょくぶつ}です。',
    inputForm: { question: 'マツの {仲間|なかま}は、{植物|しょくぶつ}の {分類|ぶんるい}で 何に あたるか。', acceptedAnswers: ['らししょくぶつ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g7_matter_001', subject: 'science', gradeLevel: 7, unit: 'matter',
    difficulty: 'basic', answerType: 'input',
    question: '{質量|しつりょう}が 54g、{体積|たいせき}が 20cm³の {金属|きんぞく}の {密度|みつど}は {何|なん}g/cm³か。{数|かず}で {答|こた}えなさい。',
    answer: '2.7', validationMode: 'number',
    hints: ['{密度|みつど}＝{質量|しつりょう}÷{体積|たいせき}', '54÷20 を {計算|けいさん}する。'],
    explanation: '{密度|みつど}＝{質量|しつりょう}÷{体積|たいせき}＝54÷20＝2.7g/cm³ です。（アルミニウムの {密度|みつど}に {近|ちか}い {値|あたい}です）',
    reviewed: true
  },
  {
    id: 'science_g7_earthquake_001', subject: 'science', gradeLevel: 7, unit: 'earthquake',
    difficulty: 'standard', answerType: 'input',
    question: '{地震|じしん}の ゆれで、はじめに {来|く}る {小|ちい}さな ゆれ（{初期微動|しょきびどう}）を {伝|つた}える {波|なみ}を {何|なん}と いうか。',
    answer: 'P波', acceptedAnswers: ['P'], validationMode: 'exact',
    hints: ['{伝|つた}わる {速|はや}さが {速|はや}い {波|なみ}の ほう。', 'あとから {来|く}る {大|おお}きな ゆれ（{主要動|しゅようどう}）を {伝|つた}えるのは S{波|は}。'],
    explanation: '{初期微動|しょきびどう}を {伝|つた}えるのは {速|はや}い「P{波|は}」、{主要動|しゅようどう}を {伝|つた}えるのは おそい「S{波|は}」です。',
    reviewed: true
  },
  {
    id: 'science_g7_light_001', subject: 'science', gradeLevel: 7, unit: 'light',
    difficulty: 'standard', answerType: 'input',
    question: '{鏡|かがみ}に {光|ひかり}を あてたところ、{入射角|にゅうしゃかく}は 30°でした。{反射角|はんしゃかく}は {何度|なんど}か。{数|かず}で {答|こた}えなさい。',
    answer: '30', acceptedAnswers: ['30°', '30度'], validationMode: 'number',
    hints: ['{光|ひかり}の {反射|はんしゃ}の {法則|ほうそく}を {思|おも}い{出|だ}そう。', '{入射角|にゅうしゃかく}と {反射角|はんしゃかく}の {関係|かんけい}は？'],
    explanation: '{光|ひかり}が {反射|はんしゃ}するとき、{入射角|にゅうしゃかく}と {反射角|はんしゃかく}は {等|ひと}しく なります（{反射|はんしゃ}の {法則|ほうそく}）。{反射角|はんしゃかく}は 30°です。',
    reviewed: true
  },
  {
    id: 'science_g7_matter_002', subject: 'science', gradeLevel: 7, unit: 'matter',
    difficulty: 'standard', answerType: 'input',
    question: '{物質|ぶっしつ}が {固体|こたい}から {液体|えきたい}に {変|か}わる ときの {温度|おんど}を {何|なん}と いうか。ひらがなか {漢字|かんじ}で {答|こた}えなさい。',
    answer: 'ゆうてん', acceptedAnswers: ['融点'], validationMode: 'kana-insensitive',
    hints: ['{液体|えきたい}が {沸騰|ふっとう}する {温度|おんど}は「{沸点|ふってん}」。', '「とける」という {意味|いみ}の {漢字|かんじ}を {使|つか}う。'],
    explanation: '{固体|こたい}が とけて {液体|えきたい}に なる {温度|おんど}を「{融点|ゆうてん}」と いいます。{水|みず}の {融点|ゆうてん}は 0℃です。',
    reviewed: true
  },
  {
    id: 'science_g7_gas_001', subject: 'science', gradeLevel: 7, unit: 'gas',
    difficulty: 'standard', answerType: 'choice',
    question: '{酸素|さんそ}の {性質|せいしつ}として {正|ただ}しいものは どれか。',
    choices: ['ものを {燃|も}やす はたらきが ある', '{石灰水|せっかいすい}を {白|しろ}く にごらせる', '{水|みず}に よく とけ、その {水溶液|すいようえき}は アルカリ{性|せい}', '{空気|くうき}より {軽|かる}く、{火|ひ}を つけると {音|おと}を たてて {燃|も}える'],
    answer: 'ものを {燃|も}やす はたらきが ある',
    hints: ['{火|ひ}の ついた {線香|せんこう}を {酸素|さんそ}の {中|なか}に {入|い}れると どう なるか。', 'ほかの {選択肢|せんたくし}は、{二酸化炭素|にさんかたんそ}・アンモニア・{水素|すいそ}の {性質|せいしつ}。'],
    explanation: '{酸素|さんそ}には ものを {燃|も}やす はたらき（{助燃性|じょねんせい}）が あります。{石灰水|せっかいすい}を にごらせるのは {二酸化炭素|にさんかたんそ}、アルカリ{性|せい}の {水溶液|すいようえき}に なるのは アンモニア、{音|おと}を たてて {燃|も}えるのは {水素|すいそ}です。',
    reviewed: true
  },
  {
    id: 'science_g7_volcano_001', subject: 'science', gradeLevel: 7, unit: 'volcano',
    difficulty: 'standard', answerType: 'choice',
    question: 'ねばりけが {強|つよ}い マグマで できた {火山|かざん}の {特徴|とくちょう}として {正|ただ}しいものは どれか。',
    choices: ['もり{上|あ}がった ドーム{状|じょう}の {形|かたち}で、{白|しろ}っぽい {岩石|がんせき}が {多|おお}い', 'うすく {広|ひろ}がった {形|かたち}で、{黒|くろ}っぽい {岩石|がんせき}が {多|おお}い', 'うすく {広|ひろ}がった {形|かたち}で、{白|しろ}っぽい {岩石|がんせき}が {多|おお}い', 'もり{上|あ}がった ドーム{状|じょう}の {形|かたち}で、{黒|くろ}っぽい {岩石|がんせき}が {多|おお}い'],
    answer: 'もり{上|あ}がった ドーム{状|じょう}の {形|かたち}で、{白|しろ}っぽい {岩石|がんせき}が {多|おお}い',
    hints: ['ねばりけが {強|つよ}いと、{溶岩|ようがん}は {流|なが}れにくい。', 'ねばりけが {強|つよ}い マグマには {白|しろ}っぽい {鉱物|こうぶつ}が {多|おお}く ふくまれる。'],
    explanation: 'ねばりけが {強|つよ}い マグマは {流|なが}れにくいので、もり{上|あ}がった ドーム{状|じょう}の {火山|かざん}を つくり、{白|しろ}っぽい {岩石|がんせき}に なります（{例|れい}：{昭和新山|しょうわしんざん}）。ねばりけが {弱|よわ}いと、うすく {広|ひろ}がった {形|かたち}で {黒|くろ}っぽく なります。',
    reviewed: true
  },
  {
    id: 'science_g7_force_001', subject: 'science', gradeLevel: 7, unit: 'force',
    difficulty: 'advanced', answerType: 'input',
    question: '1Nの {力|ちから}で {引|ひ}くと 2cm のびる ばねが あります。このばねを 3Nの {力|ちから}で {引|ひ}くと、{何|なん}cm のびるか。{数|かず}で {答|こた}えなさい。',
    answer: '6', acceptedAnswers: ['6cm'], validationMode: 'number',
    hints: ['ばねの のびは、{引|ひ}く {力|ちから}の {大|おお}きさに {比例|ひれい}する（フックの {法則|ほうそく}）。', '{力|ちから}が 3{倍|ばい}に なると、のびも 3{倍|ばい}。'],
    explanation: 'ばねの のびは、ばねが もとに もどらなく なるほど {引|ひ}きのばさない {範囲|はんい}では、{力|ちから}の {大|おお}きさに {比例|ひれい}します（フックの {法則|ほうそく}）。その {範囲内|はんいない}で、{力|ちから}が 3{倍|ばい}なので、のびは 2×3＝6cm です。',
    reviewed: true
  },
  {
    id: 'science_g7_solution_001', subject: 'science', gradeLevel: 7, unit: 'solution',
    difficulty: 'advanced', answerType: 'choice',
    question: '{水|みず} 90gに {食塩|しょくえん} 10gを とかした {食塩水|しょくえんすい}の {質量|しつりょう}パーセント{濃度|のうど}は どれか。',
    choices: ['10％', '11％', '9％', '90％'],
    answer: '10％',
    hints: ['{質量|しつりょう}パーセント{濃度|のうど}＝{溶質|ようしつ}の {質量|しつりょう}÷{溶液|ようえき}の {質量|しつりょう}×100', '{溶液|ようえき}の {質量|しつりょう}は、{水|みず}と {食塩|しょくえん}の {合計|ごうけい}。'],
    explanation: '{溶液|ようえき}の {質量|しつりょう}は 90＋10＝100g。10÷100×100＝10％ です。（10÷90 と しないよう {注意|ちゅうい}）',
    inputForm: { question: '{水|みず} 90gに {食塩|しょくえん} 10gを とかした {食塩水|しょくえんすい}の {質量|しつりょう}パーセント濃度は 何％か。', answer: '10', acceptedAnswers: ['10%', '10％'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g7_plant_002', subject: 'science', gradeLevel: 7, unit: 'plant',
    difficulty: 'basic', answerType: 'choice',
    question: '{単子葉類|たんしようるい}（トウモロコシ・イネなど）の {特徴|とくちょう}として {正|ただ}しいものは どれか。',
    choices: ['{葉脈|ようみゃく}が {平行|へいこう}に {通|とお}り、{根|ね}は ひげ{根|ね}', '{葉脈|ようみゃく}が {網目状|あみめじょう}で、{根|ね}は {主根|しゅこん}と {側根|そっこん}', '{葉脈|ようみゃく}が {平行|へいこう}に {通|とお}り、{根|ね}は {主根|しゅこん}と {側根|そっこん}', '{葉脈|ようみゃく}が {網目状|あみめじょう}で、{根|ね}は ひげ{根|ね}'],
    answer: '{葉脈|ようみゃく}が {平行|へいこう}に {通|とお}り、{根|ね}は ひげ{根|ね}',
    hints: ['{単子葉類|たんしようるい}は、{子葉|しよう}が 1{枚|まい}の {植物|しょくぶつ}。', 'イネの {葉|は}の すじ（{葉脈|ようみゃく}）は どう なって いるか。'],
    explanation: '{単子葉類|たんしようるい}は {子葉|しよう}が 1{枚|まい}で、{葉脈|ようみゃく}は {平行脈|へいこうみゃく}、{根|ね}は ひげ{根|ね}です。{双子葉類|そうしようるい}は {子葉|しよう}が 2{枚|まい}で、{葉脈|ようみゃく}は {網状脈|もうじょうみゃく}、{根|ね}は {主根|しゅこん}と {側根|そっこん}です。',
    reviewed: true
  },
  {
    id: 'science_g7_animal_001', subject: 'science', gradeLevel: 7, unit: 'animal',
    difficulty: 'basic', answerType: 'choice',
    question: 'セキツイ{動物|どうぶつ}の うち、{体|からだ}の {表面|ひょうめん}が {羽毛|うもう}で おおわれ、{殻|から}の ある {卵|たまご}を {産|う}む なかまは どれか。',
    choices: ['{鳥類|ちょうるい}', 'ハチュウ{類|るい}', '{両生類|りょうせいるい}', 'ホニュウ{類|るい}'],
    answer: '{鳥類|ちょうるい}',
    hints: ['ハチュウ{類|るい}の {体|からだ}の {表面|ひょうめん}は うろこで おおわれて いる。', 'ホニュウ{類|るい}は {卵|たまご}ではなく、{子|こ}を {産|う}む（{胎生|たいせい}）。'],
    explanation: '{羽毛|うもう}で おおわれて いるのは {鳥類|ちょうるい}です。ハチュウ{類|るい}は うろこ、{両生類|りょうせいるい}は しめった {皮膚|ひふ}、ホニュウ{類|るい}は {毛|け}で おおわれて います。',
    inputForm: { question: 'セキツイ{動物|どうぶつ}の うち、{体|からだ}の {表面|ひょうめん}が {羽毛|うもう}で おおわれ、{殻|から}の ある {卵|たまご}を {産|う}む なかまは 何類か。', acceptedAnswers: ['ちょうるい', '鳥'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g7_sound_001', subject: 'science', gradeLevel: 7, unit: 'sound',
    difficulty: 'basic', answerType: 'input',
    question: '{音|おと}を {出|だ}す {物体|ぶったい}が 1{秒間|びょうかん}に {振動|しんどう}する {回数|かいすう}（{振動数|しんどうすう}）の {単位|たんい}を カタカナで {答|こた}えなさい。',
    answer: 'ヘルツ', acceptedAnswers: ['へるつ'], validationMode: 'kana-insensitive',
    hints: ['{音|おと}の {高|たか}さに かかわる {量|りょう}の {単位|たんい}。', '{電波|でんぱ}の {研究|けんきゅう}を した {物理学者|ぶつりがくしゃ}の {名前|なまえ}から つけられた。'],
    explanation: '{振動数|しんどうすう}の {単位|たんい}は「ヘルツ（Hz）」です。{振動数|しんどうすう}が {多|おお}いほど {高|たか}い {音|おと}に なります。',
    reviewed: true
  },
  {
    id: 'science_g7_force_002', subject: 'science', gradeLevel: 7, unit: 'force',
    difficulty: 'basic', answerType: 'input',
    question: '{力|ちから}の {大|おお}きさを {表|あらわ}す {単位|たんい}を カタカナで {答|こた}えなさい。（{記号|きごう}は N）',
    answer: 'ニュートン', acceptedAnswers: ['にゅーとん'], validationMode: 'kana-insensitive',
    hints: ['リンゴが {木|き}から {落|お}ちるのを {見|み}て {引力|いんりょく}を {考|かんが}えたと いわれる {科学者|かがくしゃ}の {名前|なまえ}。', '{約|やく}100gの {物体|ぶったい}に はたらく {重力|じゅうりょく}の {大|おお}きさが {約|やく}1N。'],
    explanation: '{力|ちから}の {大|おお}きさの {単位|たんい}は「ニュートン（N）」です。{地球上|ちきゅうじょう}では、{約|やく}100gの {物体|ぶったい}に はたらく {重力|じゅうりょく}の {大|おお}きさが {約|やく}1Nです。',
    reviewed: true
  },
  {
    id: 'science_g7_light_002', subject: 'science', gradeLevel: 7, unit: 'light',
    difficulty: 'standard', answerType: 'input',
    question: '{光|ひかり}が {空気|くうき}から {水|みず}へ ななめに {進|すす}むとき、{境界面|きょうかいめん}で {折|お}れ{曲|ま}がる {現象|げんしょう}を {何|なん}と いうか。',
    answer: 'くっせつ', acceptedAnswers: ['屈折', '光の屈折', 'ひかりのくっせつ'], validationMode: 'kana-insensitive',
    hints: ['{水|みず}に {入|い}れた ストローが {折|お}れ{曲|ま}がって {見|み}えるのは、この {現象|げんしょう}の ため。', '{鏡|かがみ}で はね{返|かえ}る「{反射|はんしゃ}」とは ちがう。'],
    explanation: '{光|ひかり}が {種類|しゅるい}の ちがう {物質|ぶっしつ}の {境界面|きょうかいめん}で {折|お}れ{曲|ま}がる {現象|げんしょう}を「{屈折|くっせつ}」と いいます。',
    reviewed: true
  },
  {
    id: 'science_g7_matter_003', subject: 'science', gradeLevel: 7, unit: 'matter',
    difficulty: 'standard', answerType: 'input',
    question: '{液体|えきたい}を {加熱|かねつ}して {沸騰|ふっとう}させ、{出|で}て くる {気体|きたい}を {冷|ひ}やして ふたたび {液体|えきたい}に して {取|と}り{出|だ}す {方法|ほうほう}を {何|なん}と いうか。',
    answer: 'じょうりゅう', acceptedAnswers: ['蒸留'], validationMode: 'kana-insensitive',
    hints: ['{沸点|ふってん}の ちがいを {利用|りよう}して、{混合物|こんごうぶつ}から {物質|ぶっしつ}を {分|わ}ける {方法|ほうほう}。', '{水|みず}と エタノールの {混合物|こんごうぶつ}を {分|わ}ける ときに {使|つか}う。'],
    explanation: '{液体|えきたい}を {沸騰|ふっとう}させて {出|で}て くる {気体|きたい}を {冷|ひ}やし、ふたたび {液体|えきたい}に して {集|あつ}める {方法|ほうほう}を「{蒸留|じょうりゅう}」と いいます。{沸点|ふってん}の ちがいで {物質|ぶっしつ}を {分|わ}ける ことが できます。',
    reviewed: true
  },
  {
    id: 'science_g7_earthquake_002', subject: 'science', gradeLevel: 7, unit: 'earthquake',
    difficulty: 'standard', answerType: 'input',
    question: '{地震|じしん}そのものの {規模|きぼ}（エネルギーの {大|おお}きさ）を {表|あらわ}す {値|あたい}を カタカナで {答|こた}えなさい。',
    answer: 'マグニチュード', acceptedAnswers: ['まぐにちゅーど'], validationMode: 'kana-insensitive',
    hints: ['{記号|きごう}は M。', 'ある {地点|ちてん}での ゆれの {大|おお}きさを {表|あらわ}すのは「{震度|しんど}」。'],
    explanation: '{地震|じしん}の {規模|きぼ}は「マグニチュード（M）」で {表|あらわ}します。{値|あたい}が 1 {大|おお}きく なると、エネルギーは {約|やく}32{倍|ばい}に なります。ゆれの {大|おお}きさは {震度|しんど}で {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'science_g7_sound_002', subject: 'science', gradeLevel: 7, unit: 'sound',
    difficulty: 'standard', answerType: 'input',
    question: 'いなずまが {光|ひか}ってから 3{秒後|びょうご}に {雷|かみなり}の {音|おと}が {聞|き}こえた。{音|おと}が {空気中|くうきちゅう}を {伝|つた}わる {速|はや}さを 340m/sと すると、{雷|かみなり}までの {距離|きょり}は {何|なん}mか。{数|かず}で {答|こた}えなさい。',
    answer: '1020', acceptedAnswers: ['1020m'], validationMode: 'number',
    hints: ['{光|ひかり}は とても {速|はや}いので、{光|ひかり}が とどく {時間|じかん}は 0と {考|かんが}えて よい。', '{距離|きょり}＝{速|はや}さ×{時間|じかん}'],
    explanation: '{距離|きょり}＝340×3＝1020m です。',
    reviewed: true
  },
  {
    id: 'science_g7_animal_002', subject: 'science', gradeLevel: 7, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '{背骨|せぼね}を もたない {動物|どうぶつ}の うち、{体|からだ}の {外側|そとがわ}が かたい {殻|から}（{外骨格|がいこっかく}）で おおわれ、{体|からだ}や あしに {節|ふし}が ある なかま（{昆虫類|こんちゅうるい}・{甲殻類|こうかくるい}など）を {何|なん}と いうか。',
    answer: 'せっそくどうぶつ', acceptedAnswers: ['節足動物'], validationMode: 'kana-insensitive',
    hints: ['あしに {節|ふし}が ある {動物|どうぶつ}という {意味|いみ}の {名前|なまえ}。', 'バッタ・カニ・クモ・ムカデなどが ふくまれる。'],
    explanation: '{外骨格|がいこっかく}を もち、{体|からだ}や あしに {節|ふし}が ある {動物|どうぶつ}を「{節足動物|せっそくどうぶつ}」と いいます。イカや タコ、アサリなどは「{軟体動物|なんたいどうぶつ}」です。',
    reviewed: true
  },
  {
    id: 'science_g7_stratum_001', subject: 'science', gradeLevel: 7, unit: 'stratum',
    difficulty: 'standard', answerType: 'input',
    question: 'サンゴの {化石|かせき}のように、{地層|ちそう}が できた {当時|とうじ}の {環境|かんきょう}を {知|し}る {手|て}がかりに なる {化石|かせき}を {何|なん}と いうか。',
    answer: 'しそうかせき', acceptedAnswers: ['示相化石'], validationMode: 'kana-insensitive',
    hints: ['サンゴの {化石|かせき}が {出|で}ると、あたたかくて {浅|あさ}い {海|うみ}だったと わかる。', '{地層|ちそう}が できた {時代|じだい}を {知|し}る {手|て}がかりに なるのは「{示準化石|しじゅんかせき}」。'],
    explanation: '{当時|とうじ}の {環境|かんきょう}を {知|し}る {手|て}がかりに なる {化石|かせき}を「{示相化石|しそうかせき}」と いいます（{例|れい}：サンゴ、シジミ）。{時代|じだい}を {知|し}る {手|て}がかりに なる {化石|かせき}は「{示準化石|しじゅんかせき}」です（{例|れい}：サンヨウチュウ、アンモナイト）。',
    reviewed: true
  },
  {
    id: 'science_g7_light_003', subject: 'science', gradeLevel: 7, unit: 'light',
    difficulty: 'standard', answerType: 'choice',
    question: '{物体|ぶったい}を {凸|とつ}レンズの {焦点|しょうてん}より {内側|うちがわ}に {置|お}き、レンズを {通|とお}して {物体|ぶったい}を {見|み}たとき に {見|み}える {像|ぞう}は どれか。',
    choices: ['{物体|ぶったい}より {大|おお}きく、{向|む}きが {同|おな}じ {虚像|きょぞう}', '{物体|ぶったい}と {同|おな}じ {大|おお}きさの {実像|じつぞう}', '{上下左右|じょうげさゆう}が {逆|ぎゃく}の {実像|じつぞう}', '{像|ぞう}は {見|み}えない'],
    answer: '{物体|ぶったい}より {大|おお}きく、{向|む}きが {同|おな}じ {虚像|きょぞう}',
    hints: ['{虫|むし}めがねで {近|ちか}くの ものを {見|み}る ときと {同|おな}じ {状態|じょうたい}。', 'スクリーンに うつる {像|ぞう}は {実像|じつぞう}。この {場合|ばあい}は スクリーンに うつらない。'],
    explanation: '{物体|ぶったい}が {焦点|しょうてん}より {内側|うちがわ}に あるとき、スクリーンに {像|ぞう}は うつらず、レンズを のぞくと {物体|ぶったい}より {大|おお}きく {向|む}きが {同|おな}じ {虚像|きょぞう}が {見|み}えます。',
    reviewed: true
  },
  {
    id: 'science_g7_gas_002', subject: 'science', gradeLevel: 7, unit: 'gas',
    difficulty: 'standard', answerType: 'choice',
    question: 'アンモニアは {水|みず}に とても とけやすく、{空気|くうき}より {軽|かる}い {気体|きたい}である。アンモニアを {集|あつ}める {方法|ほうほう}として {適切|てきせつ}な ものは どれか。',
    choices: ['{上方置換法|じょうほうちかんほう}', '{下方置換法|かほうちかんほう}', '{水上置換法|すいじょうちかんほう}', 'どの {方法|ほうほう}でも よい'],
    answer: '{上方置換法|じょうほうちかんほう}',
    hints: ['{水|みず}に とけやすい {気体|きたい}は、{水上置換法|すいじょうちかんほう}では {集|あつ}められない。', '{空気|くうき}より {軽|かる}い {気体|きたい}は、{容器|ようき}の {上|うえ}の ほうに たまる。'],
    explanation: '{水|みず}に とけやすく {空気|くうき}より {軽|かる}い アンモニアは、{上方置換法|じょうほうちかんほう}で {集|あつ}めます。{水|みず}に とけにくい {気体|きたい}は {水上置換法|すいじょうちかんほう}、{水|みず}に とけやすく {空気|くうき}より {重|おも}い {気体|きたい}は {下方置換法|かほうちかんほう}で {集|あつ}めます。',
    inputForm: { question: 'アンモニアは {水|みず}に とても とけやすく、{空気|くうき}より {軽|かる}い {気体|きたい}である。アンモニアを {集|あつ}める {方法|ほうほう}として 適切な ものは 何か。', acceptedAnswers: ['じょうほうちかんほう', '上方置換'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g7_matter_004', subject: 'science', gradeLevel: 7, unit: 'matter',
    difficulty: 'standard', answerType: 'choice',
    question: '{有機物|ゆうきぶつ}は どれか。',
    choices: ['{砂糖|さとう}', '{食塩|しょくえん}', '{鉄|てつ}', 'ガラス'],
    answer: '{砂糖|さとう}',
    hints: ['{有機物|ゆうきぶつ}は {炭素|たんそ}を ふくみ、{燃|も}えると {二酸化炭素|にさんかたんそ}が できる。', '{加熱|かねつ}すると こげて {黒|くろ}く なる ものは どれか。'],
    explanation: '{砂糖|さとう}は {炭素|たんそ}を ふくむ {有機物|ゆうきぶつ}で、{加熱|かねつ}すると こげて、{燃|も}えると {二酸化炭素|にさんかたんそ}と {水|みず}が できます。{食塩|しょくえん}・{鉄|てつ}・ガラスは {無機物|むきぶつ}です。',
    reviewed: true
  },
  {
    id: 'science_g7_volcano_002', subject: 'science', gradeLevel: 7, unit: 'volcano',
    difficulty: 'standard', answerType: 'choice',
    question: 'マグマが {地下|ちか}の {深|ふか}い ところで ゆっくり {冷|ひ}え{固|かた}まって できた {岩石|がんせき}（{深成岩|しんせいがん}）は どれか。',
    choices: ['{花|か}こう{岩|がん}', '{玄武岩|げんぶがん}', '{安山岩|あんざんがん}', '{流紋岩|りゅうもんがん}'],
    answer: '{花|か}こう{岩|がん}',
    hints: ['{深成岩|しんせいがん}は、{同|おな}じくらいの {大|おお}きさの {鉱物|こうぶつ}が すきまなく ならぶ（{等粒状組織|とうりゅうじょうそしき}）。', '{玄武岩|げんぶがん}・{安山岩|あんざんがん}・{流紋岩|りゅうもんがん}は、{地表|ちひょう}や {地表|ちひょう}の {近|ちか}くで {急|きゅう}に {冷|ひ}えた {火山岩|かざんがん}。'],
    explanation: '{花|か}こう{岩|がん}は {深成岩|しんせいがん}です。{玄武岩|げんぶがん}・{安山岩|あんざんがん}・{流紋岩|りゅうもんがん}は {火山岩|かざんがん}で、{細|こま}かい つぶ（{石基|せっき}）の {中|なか}に {大|おお}きな {鉱物|こうぶつ}（{斑晶|はんしょう}）が ちらばる {斑状組織|はんじょうそしき}を もちます。',
    reviewed: true
  },
  {
    id: 'science_g7_force_003', subject: 'science', gradeLevel: 7, unit: 'force',
    difficulty: 'advanced', answerType: 'input',
    question: '100Nの {力|ちから}が 0.5m²の {面|めん}に {垂直|すいちょく}に はたらいて いる。この {面|めん}に はたらく {圧力|あつりょく}は {何|なん}Paか。{数|かず}で {答|こた}えなさい。',
    answer: '200', acceptedAnswers: ['200Pa'], validationMode: 'number',
    hints: ['{圧力|あつりょく}（Pa）＝{面|めん}を {垂直|すいちょく}に おす {力|ちから}（N）÷{力|ちから}が はたらく {面積|めんせき}（m²）', '100÷0.5 を {計算|けいさん}する。'],
    explanation: '{圧力|あつりょく}＝100÷0.5＝200Pa です。1Pa は、1m²あたり 1Nの {力|ちから}が はたらくときの {圧力|あつりょく}です。',
    reviewed: true
  },
  {
    id: 'science_g7_solution_002', subject: 'science', gradeLevel: 7, unit: 'solution',
    difficulty: 'advanced', answerType: 'input',
    question: 'ある {温度|おんど}の {水|みず}に、{物質|ぶっしつ}を それ{以上|いじょう} とけきれなく なるまで とかした {水溶液|すいようえき}を {何|なん}と いうか。',
    answer: 'ほうわすいようえき', acceptedAnswers: ['飽和水溶液'], validationMode: 'kana-insensitive',
    hints: ['「いっぱいに みちて いる」という {意味|いみ}の ことばが つく。', 'このとき とけて いる {物質|ぶっしつ}の {質量|しつりょう}を もとに「{溶解度|ようかいど}」を {表|あらわ}す。'],
    explanation: '{物質|ぶっしつ}が {限度|げんど}まで とけて いる {水溶液|すいようえき}を「{飽和水溶液|ほうわすいようえき}」と いいます。{水|みず}100gに とける {限度|げんど}の {質量|しつりょう}を {溶解度|ようかいど}と いいます。',
    reviewed: true
  },
  {
    id: 'science_g7_earthquake_003', subject: 'science', gradeLevel: 7, unit: 'earthquake',
    difficulty: 'advanced', answerType: 'choice',
    question: '{初期微動継続時間|しょきびどうけいぞくじかん}（P{波|は}が とどいてから S{波|は}が とどくまでの {時間|じかん}）が {長|なが}い {地点|ちてん}ほど、どう いえるか。',
    choices: ['{震源|しんげん}からの {距離|きょり}が {遠|とお}い', '{震源|しんげん}からの {距離|きょり}が {近|ちか}い', '{地震|じしん}の マグニチュードが {大|おお}きい', '{震度|しんど}が {大|おお}きい'],
    answer: '{震源|しんげん}からの {距離|きょり}が {遠|とお}い',
    hints: ['P{波|は}と S{波|は}は {伝|つた}わる {速|はや}さが ちがう。', '{遠|とお}くまで {伝|つた}わるほど、2つの {波|なみ}の とどく {時刻|じこく}の {差|さ}は どう なるか。'],
    explanation: 'P{波|は}と S{波|は}は {速|はや}さが ちがうので、{震源|しんげん}から {遠|とお}いほど とどく {時刻|じこく}の {差|さ}が {大|おお}きく なります。{初期微動継続時間|しょきびどうけいぞくじかん}は {震源|しんげん}からの {距離|きょり}に ほぼ {比例|ひれい}します。',
    reviewed: true
  },
  {
    id: 'science_g7_plant_003', subject: 'science', gradeLevel: 7, unit: 'plant',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ゼニゴケなどの コケ{植物|しょくぶつ}の {特徴|とくちょう}として {正|ただ}しいものは どれか。',
    choices: ['{根|ね}・{茎|くき}・{葉|は}の {区別|くべつ}が なく、{胞子|ほうし}で ふえる', '{根|ね}・{茎|くき}・{葉|は}の {区別|くべつ}が あり、{種子|しゅし}で ふえる', '{根|ね}・{茎|くき}・{葉|は}の {区別|くべつ}が あり、{胞子|ほうし}で ふえる', '{花|はな}を さかせ、{種子|しゅし}で ふえる'],
    answer: '{根|ね}・{茎|くき}・{葉|は}の {区別|くべつ}が なく、{胞子|ほうし}で ふえる',
    hints: ['シダ{植物|しょくぶつ}は {根|ね}・{茎|くき}・{葉|は}の {区別|くべつ}が あり、{胞子|ほうし}で ふえる。', 'コケ{植物|しょくぶつ}の {根|ね}のように {見|み}える ものは「{仮根|かこん}」と いい、おもに {体|からだ}を {固定|こてい}する はたらきを する。'],
    explanation: 'コケ{植物|しょくぶつ}は {根|ね}・{茎|くき}・{葉|は}の {区別|くべつ}が なく、{胞子|ほうし}で ふえます。{水|みず}は {体|からだ}の {表面|ひょうめん}から {取|と}り{入|い}れます。シダ{植物|しょくぶつ}は {根|ね}・{茎|くき}・{葉|は}の {区別|くべつ}が あり、{胞子|ほうし}で ふえます。',
    reviewed: true
  },

  // ===== Lv8（中学2年） =====
  {
    id: 'science_g8_electrolysis_001', subject: 'science', gradeLevel: 8, unit: 'electrolysis',
    difficulty: 'basic', answerType: 'choice',
    question: 'うすい {水酸化|すいさんか}ナトリウム{水溶液|すいようえき}を {電気分解|でんきぶんかい}したとき、{陰極|いんきょく}に {発生|はっせい}する {気体|きたい}は どれか。',
    choices: ['{水素|すいそ}', '{酸素|さんそ}', '{二酸化炭素|にさんかたんそ}', 'ちっ{素|そ}'],
    answer: '{水素|すいそ}',
    hints: ['{陰極|いんきょく}には、{陽極|ようきょく}の {約|やく}2{倍|ばい}の {体積|たいせき}の {気体|きたい}が {発生|はっせい}する。', 'マッチの {火|ひ}を {近|ちか}づけると ポンと {音|おと}を たてて {燃|も}える {気体|きたい}。'],
    explanation: '{純粋|じゅんすい}な {水|みず}は {電流|でんりゅう}が {流|なが}れにくいので、{少量|しょうりょう}の {水酸化|すいさんか}ナトリウムを とかして {電気分解|でんきぶんかい}します。このとき {分解|ぶんかい}されるのは {水|みず}で、{陰極|いんきょく}に {水素|すいそ}、{陽極|ようきょく}に {酸素|さんそ}が {発生|はっせい}します。{体積|たいせき}の {比|ひ}は {水素|すいそ}：{酸素|さんそ}＝2：1 です。',
    inputForm: { question: 'うすい {水酸化|すいさんか}ナトリウム{水溶液|すいようえき}を {電気分解|でんきぶんかい}したとき、{陰極|いんきょく}に {発生|はっせい}する 気体は 何か。', acceptedAnswers: ['すいそ', 'H2'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g8_atom_001', subject: 'science', gradeLevel: 8, unit: 'atom',
    difficulty: 'basic', answerType: 'input',
    question: '{水|みず}の {化学式|かがくしき}を {書|か}きなさい。（{数字|すうじ}は {小|ちい}さく しなくて よい）',
    answer: 'H2O', validationMode: 'exact',
    hints: ['{水|みず}の {分子|ぶんし}は、{水素原子|すいそげんし}と {酸素原子|さんそげんし}で できて いる。', '{水素原子|すいそげんし} 2{個|こ}と {酸素原子|さんそげんし} 1{個|こ}。'],
    explanation: '{水|みず}の {分子|ぶんし}は {水素原子|すいそげんし}（H）2{個|こ}と {酸素原子|さんそげんし}（O）1{個|こ}で できて いるので、H₂O と {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'science_g8_electric_001', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'standard', answerType: 'input',
    question: '{抵抗|ていこう}が 2Ωの {電熱線|でんねつせん}に 6Vの {電圧|でんあつ}を {加|くわ}えると、{何|なん}Aの {電流|でんりゅう}が {流|なが}れるか。{数|かず}で {答|こた}えなさい。',
    answer: '3', acceptedAnswers: ['3A'], validationMode: 'number',
    hints: ['オームの {法則|ほうそく}：{電圧|でんあつ}＝{抵抗|ていこう}×{電流|でんりゅう}', '{電流|でんりゅう}＝{電圧|でんあつ}÷{抵抗|ていこう}'],
    explanation: 'オームの {法則|ほうそく}より、{電流|でんりゅう}＝{電圧|でんあつ}÷{抵抗|ていこう}＝6÷2＝3A です。',
    reviewed: true
  },
  {
    id: 'science_g8_reaction_001', subject: 'science', gradeLevel: 8, unit: 'reaction',
    difficulty: 'standard', answerType: 'input',
    question: '{銅|どう}の {粉末|ふんまつ} 4.0gを {十分|じゅうぶん}に {加熱|かねつ}したところ、すべて {酸化銅|さんかどう}に なり、{質量|しつりょう}は 5.0gに なった。{銅|どう}と {結|むす}びついた {酸素|さんそ}は {何|なん}gか。{数|かず}で {答|こた}えなさい。',
    answer: '1', acceptedAnswers: ['1g', '1.0g'], validationMode: 'number',
    hints: ['{増|ふ}えた {質量|しつりょう}は、{結|むす}びついた {酸素|さんそ}の {質量|しつりょう}。', '5.0−4.0 を {計算|けいさん}する。'],
    explanation: '{加熱後|かねつご}に {増|ふ}えた {質量|しつりょう}が {結|むす}びついた {酸素|さんそ}の {質量|しつりょう}です。5.0−4.0＝1.0g。（{銅|どう}：{酸素|さんそ}＝4：1 の {質量|しつりょう}の {比|ひ}で {結|むす}びつきます）',
    reviewed: true
  },
  {
    id: 'science_g8_body_001', subject: 'science', gradeLevel: 8, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '{血液|けつえき}の {成分|せいぶん}のうち、ヘモグロビンを ふくみ、{酸素|さんそ}を {運|はこ}ぶ はたらきを する ものを {何|なん}と いうか。',
    answer: 'せっけっきゅう', acceptedAnswers: ['赤血球'], validationMode: 'kana-insensitive',
    hints: ['{血液|けつえき}の {固形成分|こけいせいぶん}には、{赤血球|せっけっきゅう}・{白血球|はっけっきゅう}・{血小板|けっしょうばん}が ある。', '{血液|けつえき}が {赤|あか}く {見|み}えるのは この {成分|せいぶん}の ため。'],
    explanation: '{酸素|さんそ}を {運|はこ}ぶのは「{赤血球|せっけっきゅう}」です。ふくまれる ヘモグロビンが、{酸素|さんそ}の {多|おお}い ところで {酸素|さんそ}と {結|むす}びつき、{少|すく}ない ところで {酸素|さんそ}を はなします。',
    reviewed: true
  },
  {
    id: 'science_g8_weather_001', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: '{寒冷前線|かんれいぜんせん}が {通過|つうか}した あとの {天気|てんき}の {変化|へんか}として {正|ただ}しいものは どれか。',
    choices: ['{気温|きおん}が {下|さ}がり、{北寄|きたよ}りの {風|かぜ}に {変|か}わる', '{気温|きおん}が {上|あ}がり、{南寄|みなみよ}りの {風|かぜ}に {変|か}わる', '{気温|きおん}が {上|あ}がり、{北寄|きたよ}りの {風|かぜ}に {変|か}わる', '{気温|きおん}も {風向|かざむ}きも {変|か}わらない'],
    answer: '{気温|きおん}が {下|さ}がり、{北寄|きたよ}りの {風|かぜ}に {変|か}わる',
    hints: ['{寒冷前線|かんれいぜんせん}は、{寒気|かんき}が {暖気|だんき}の {下|した}に もぐりこんで {進|すす}む {前線|ぜんせん}。', '{通過|つうか}した あとは、{寒気|かんき}に おおわれる。'],
    explanation: '{寒冷前線|かんれいぜんせん}が {通過|つうか}すると、{寒気|かんき}に おおわれるので {気温|きおん}が {下|さ}がり、{風向|かざむ}きは {南寄|みなみよ}りから {北寄|きたよ}りに {変|か}わります。{通過|つうか}するときは、せまい {範囲|はんい}に {強|つよ}い {雨|あめ}が {短時間|たんじかん}ふります。',
    reviewed: true
  },
  {
    id: 'science_g8_cell_001', subject: 'science', gradeLevel: 8, unit: 'cell',
    difficulty: 'standard', answerType: 'choice',
    question: '{植物|しょくぶつ}の {細胞|さいぼう}には あるが、{動物|どうぶつ}の {細胞|さいぼう}には ない つくりは どれか。',
    choices: ['{細胞壁|さいぼうへき}', '{核|かく}', '{細胞膜|さいぼうまく}', '{細胞質|さいぼうしつ}'],
    answer: '{細胞壁|さいぼうへき}',
    hints: ['{植物|しょくぶつ}の {体|からだ}を ささえる、じょうぶな つくり。', '{核|かく}と {細胞膜|さいぼうまく}は、{植物|しょくぶつ}にも {動物|どうぶつ}にも ある。'],
    explanation: '{細胞壁|さいぼうへき}は {植物|しょくぶつ}の {細胞|さいぼう}だけに あります。ほかに {葉緑体|ようりょくたい}や {発達|はったつ}した {液胞|えきほう}も {植物|しょくぶつ}の {細胞|さいぼう}の {特徴|とくちょう}です。',
    reviewed: true
  },
  {
    id: 'science_g8_weather_002', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'advanced', answerType: 'input',
    question: '{気温|きおん} 20℃の {部屋|へや}の {空気|くうき} 1m³に、8.65gの {水蒸気|すいじょうき}が ふくまれて いる。20℃の {飽和水蒸気量|ほうわすいじょうきりょう}を 17.3g/m³と すると、この {部屋|へや}の {湿度|しつど}は {何|なん}％か。{数|かず}で {答|こた}えなさい。',
    answer: '50', acceptedAnswers: ['50%'], validationMode: 'number',
    hints: ['{湿度|しつど}（％）＝{空気|くうき}1m³{中|ちゅう}の {水蒸気量|すいじょうきりょう}÷その {気温|きおん}での {飽和水蒸気量|ほうわすいじょうきりょう}×100', '8.65÷17.3 を {計算|けいさん}する。'],
    explanation: '{湿度|しつど}＝8.65÷17.3×100＝50％ です。',
    reviewed: true
  },
  {
    id: 'science_g8_electric_002', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'advanced', answerType: 'choice',
    question: '{消費電力|しょうひでんりょく} 1200Wの ストーブを 30{分間|ふんかん} {使|つか}った。{使|つか}った {電力量|でんりょくりょう}は どれか。',
    choices: ['600Wh', '36000Wh', '2400Wh', '40Wh'],
    answer: '600Wh',
    hints: ['{電力量|でんりょくりょう}（Wh）＝{電力|でんりょく}（W）×{時間|じかん}（h）', '30{分|ぷん}は {何時間|なんじかん}か。'],
    explanation: '30{分|ぷん}＝0.5{時間|じかん}なので、1200×0.5＝600Wh です。（ジュールで {表|あらわ}すと 1200×1800＝2160000J）',
    inputForm: { question: '{消費電力|しょうひでんりょく} 1200Wの ストーブを 30{分間|ふんかん} {使|つか}った。{使|つか}った 電力量は 何Whか。', answer: '600', acceptedAnswers: ['600Wh'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g8_reaction_002', subject: 'science', gradeLevel: 8, unit: 'reaction',
    difficulty: 'basic', answerType: 'choice',
    question: '{炭酸水素|たんさんすいそ}ナトリウムを {加熱|かねつ}すると {分解|ぶんかい}する。このとき {発生|はっせい}する {気体|きたい}は どれか。',
    choices: ['{二酸化炭素|にさんかたんそ}', '{酸素|さんそ}', '{水素|すいそ}', 'アンモニア'],
    answer: '{二酸化炭素|にさんかたんそ}',
    hints: ['{発生|はっせい}した {気体|きたい}を {石灰水|せっかいすい}に {通|とお}すと {白|しろ}く にごる。', 'ホットケーキが ふくらむのは、この {気体|きたい}が {出|で}る ため。'],
    explanation: '{炭酸水素|たんさんすいそ}ナトリウムを {加熱|かねつ}すると、{炭酸|たんさん}ナトリウム・{水|みず}・{二酸化炭素|にさんかたんそ}に {分解|ぶんかい}します。',
    inputForm: { question: '{炭酸水素|たんさんすいそ}ナトリウムを {加熱|かねつ}すると {分解|ぶんかい}する。このとき {発生|はっせい}する 気体は 何か。', acceptedAnswers: ['にさんかたんそ', 'CO2'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g8_body_002', subject: 'science', gradeLevel: 8, unit: 'body',
    difficulty: 'basic', answerType: 'choice',
    question: 'だ{液|えき}に ふくまれ、デンプンを {分解|ぶんかい}する {消化酵素|しょうかこうそ}は どれか。',
    choices: ['アミラーゼ', 'ペプシン', 'リパーゼ', 'トリプシン'],
    answer: 'アミラーゼ',
    hints: ['ペプシンは {胃液|いえき}に ふくまれ、タンパク{質|しつ}を {分解|ぶんかい}する。', 'リパーゼは すい{液|えき}に ふくまれ、{脂肪|しぼう}を {分解|ぶんかい}する。'],
    explanation: 'だ{液|えき}に ふくまれる アミラーゼは、デンプンを {分解|ぶんかい}します。ペプシン（{胃液|いえき}）と トリプシン（すい{液|えき}）は タンパク{質|しつ}を、リパーゼ（すい{液|えき}）は {脂肪|しぼう}を {分解|ぶんかい}します。',
    inputForm: { question: 'だ{液|えき}に ふくまれ、デンプンを {分解|ぶんかい}する 消化酵素は 何か。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g8_weather_003', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'basic', answerType: 'input',
    question: '{空気|くうき}を {冷|ひ}やして いったとき、ふくまれて いる {水蒸気|すいじょうき}が {水滴|すいてき}に {変|か}わり{始|はじ}める {温度|おんど}を {何|なん}と いうか。',
    answer: 'ろてん', acceptedAnswers: ['露点'], validationMode: 'kana-insensitive',
    hints: ['この {温度|おんど}で、{湿度|しつど}は 100％に なる。', '{朝|あさ}、{草|くさ}に つく {水滴|すいてき}（つゆ）に かんけいする ことば。'],
    explanation: '{水蒸気|すいじょうき}が {水滴|すいてき}に {変|か}わり{始|はじ}める {温度|おんど}を「{露点|ろてん}」と いいます。{空気|くうき}に ふくまれる {水蒸気|すいじょうき}が {多|おお}いほど、{露点|ろてん}は {高|たか}く なります。',
    reviewed: true
  },
  {
    id: 'science_g8_atom_002', subject: 'science', gradeLevel: 8, unit: 'atom',
    difficulty: 'basic', answerType: 'input',
    question: '{二酸化炭素|にさんかたんそ}の {化学式|かがくしき}を {書|か}きなさい。（{数字|すうじ}は {小|ちい}さく しなくて よい）',
    answer: 'CO2', validationMode: 'exact',
    hints: ['{二酸化炭素|にさんかたんそ}の {分子|ぶんし}は、{炭素原子|たんそげんし}と {酸素原子|さんそげんし}で できて いる。', '{炭素原子|たんそげんし} 1{個|こ}と {酸素原子|さんそげんし} 2{個|こ}。{炭素|たんそ}の {記号|きごう}は C。'],
    explanation: '{二酸化炭素|にさんかたんそ}の {分子|ぶんし}は {炭素原子|たんそげんし}（C）1{個|こ}と {酸素原子|さんそげんし}（O）2{個|こ}で できて いるので、CO₂ と {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'science_g8_reaction_003', subject: 'science', gradeLevel: 8, unit: 'reaction',
    difficulty: 'standard', answerType: 'input',
    question: '{酸化銅|さんかどう}と {炭素|たんそ}の {粉末|ふんまつ}を {混|ま}ぜて {加熱|かねつ}すると、{銅|どう}が できる。このように、{酸化物|さんかぶつ}から {酸素|さんそ}が {取|と}り{除|のぞ}かれる {化学変化|かがくへんか}を {何|なん}と いうか。',
    answer: 'かんげん', acceptedAnswers: ['還元'], validationMode: 'kana-insensitive',
    hints: ['{物質|ぶっしつ}が {酸素|さんそ}と {結|むす}びつく {化学変化|かがくへんか}は「{酸化|さんか}」。', 'その {反対|はんたい}の {変化|へんか}を {表|あらわ}す ことば。'],
    explanation: '{酸化物|さんかぶつ}から {酸素|さんそ}が {取|と}り{除|のぞ}かれる {化学変化|かがくへんか}を「{還元|かんげん}」と いいます。このとき {炭素|たんそ}は {酸化|さんか}されて {二酸化炭素|にさんかたんそ}に なり、{還元|かんげん}と {酸化|さんか}は {同時|どうじ}に おこります。',
    reviewed: true
  },
  {
    id: 'science_g8_electric_003', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'standard', answerType: 'input',
    question: '10Ωの {抵抗|ていこう}と 20Ωの {抵抗|ていこう}を {直列|ちょくれつ}に つないだ。{回路|かいろ}{全体|ぜんたい}の {抵抗|ていこう}は {何|なん}Ωか。{数|かず}で {答|こた}えなさい。',
    answer: '30', acceptedAnswers: ['30Ω'], validationMode: 'number',
    hints: ['{直列|ちょくれつ}つなぎでは、{全体|ぜんたい}の {抵抗|ていこう}は それぞれの {抵抗|ていこう}の {和|わ}に なる。', '10＋20 を {計算|けいさん}する。'],
    explanation: '{直列|ちょくれつ}つなぎの {全体|ぜんたい}の {抵抗|ていこう}は、それぞれの {抵抗|ていこう}の {和|わ}なので、10＋20＝30Ω です。（{並列|へいれつ}つなぎでは、{全体|ぜんたい}の {抵抗|ていこう}は それぞれの {抵抗|ていこう}より {小|ちい}さく なります）',
    reviewed: true
  },
  {
    id: 'science_g8_body_003', subject: 'science', gradeLevel: 8, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '{小腸|しょうちょう}の {内側|うちがわ}の かべに たくさん ある、{養分|ようぶん}を {吸収|きゅうしゅう}する {小|ちい}さな {突起|とっき}を {何|なん}と いうか。',
    answer: 'じゅうもう', acceptedAnswers: ['柔毛', '柔突起', 'じゅうとっき'], validationMode: 'kana-insensitive',
    hints: ['この {突起|とっき}が たくさん ある ことで、{表面積|ひょうめんせき}が {大|おお}きく なる。', '「やわらかい {毛|け}」という {意味|いみ}の ことば。'],
    explanation: '{小腸|しょうちょう}の かべの ひだの {表面|ひょうめん}には「{柔毛|じゅうもう}」が たくさん あり、{表面積|ひょうめんせき}が {大|おお}きく なって いるので、{養分|ようぶん}を {効率|こうりつ}よく {吸収|きゅうしゅう}できます。',
    reviewed: true
  },
  {
    id: 'science_g8_weather_004', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'standard', answerType: 'input',
    question: '{天気図|てんきず}などで {気圧|きあつ}を {表|あらわ}す ときに {使|つか}う {単位|たんい}を カタカナで {答|こた}えなさい。（{記号|きごう}は hPa）',
    answer: 'ヘクトパスカル', acceptedAnswers: ['へくとぱすかる'], validationMode: 'kana-insensitive',
    hints: ['{圧力|あつりょく}の {単位|たんい}「パスカル（Pa）」の 100{倍|ばい}。', '{地上|ちじょう}の {平均的|へいきんてき}な {気圧|きあつ}は {約|やく}1013 hPa。'],
    explanation: '{気圧|きあつ}は「ヘクトパスカル（hPa）」で {表|あらわ}します。1 hPa＝100 Pa で、{海面|かいめん}での {平均的|へいきんてき}な {気圧|きあつ}（1{気圧|きあつ}）は {約|やく}1013 hPa です。',
    reviewed: true
  },
  {
    id: 'science_g8_electric_004', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'standard', answerType: 'input',
    question: 'コイルに {磁石|じしゃく}を {近|ちか}づけたり {遠|とお}ざけたり して、コイルの {中|なか}の {磁界|じかい}を {変化|へんか}させると、コイルに {電流|でんりゅう}が {流|なが}れる。この {現象|げんしょう}を {何|なん}と いうか。',
    answer: 'でんじゆうどう', acceptedAnswers: ['電磁誘導'], validationMode: 'kana-insensitive',
    hints: ['このとき {流|なが}れる {電流|でんりゅう}を「{誘導電流|ゆうどうでんりゅう}」と いう。', '{発電機|はつでんき}は、この しくみを {利用|りよう}して いる。'],
    explanation: 'コイルの {中|なか}の {磁界|じかい}が {変化|へんか}すると {電流|でんりゅう}が {流|なが}れる {現象|げんしょう}を「{電磁誘導|でんじゆうどう}」と いい、{流|なが}れる {電流|でんりゅう}を {誘導電流|ゆうどうでんりゅう}と いいます。{発電機|はつでんき}に {利用|りよう}されて います。',
    reviewed: true
  },
  {
    id: 'science_g8_body_004', subject: 'science', gradeLevel: 8, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '{熱|あつ}い ものに {手|て}が ふれたとき、{思|おも}わず {手|て}を ひっこめるように、{刺激|しげき}に {対|たい}して {意識|いしき}と {関係|かんけい}なく おこる {反応|はんのう}を {何|なん}と いうか。',
    answer: 'はんしゃ', acceptedAnswers: ['反射'], validationMode: 'kana-insensitive',
    hints: ['{命令|めいれい}が {脳|のう}を {通|とお}らず、せきずいから {出|だ}される。', '{光|ひかり}が {鏡|かがみ}で はね{返|かえ}る ことと {同|おな}じ ことば。'],
    explanation: '{刺激|しげき}に {対|たい}して {意識|いしき}と {関係|かんけい}なく おこる {反応|はんのう}を「{反射|はんしゃ}」と いいます。{命令|めいれい}が {脳|のう}を {通|とお}らず せきずいなどから {出|だ}されるので、{反応|はんのう}までの {時間|じかん}が {短|みじか}く、{体|からだ}を {守|まも}るのに {役立|やくだ}ちます。',
    reviewed: true
  },
  {
    id: 'science_g8_reaction_004', subject: 'science', gradeLevel: 8, unit: 'reaction',
    difficulty: 'standard', answerType: 'choice',
    question: '{化学変化|かがくへんか}の {前後|ぜんご}で、{化学変化|かがくへんか}に {関係|かんけい}する {物質|ぶっしつ}{全体|ぜんたい}の {質量|しつりょう}は {変|か}わらない。この {法則|ほうそく}を {何|なん}と いうか。',
    choices: ['{質量保存|しつりょうほぞん}の {法則|ほうそく}', 'オームの {法則|ほうそく}', 'フックの {法則|ほうそく}', '{反射|はんしゃ}の {法則|ほうそく}'],
    answer: '{質量保存|しつりょうほぞん}の {法則|ほうそく}',
    hints: ['{化学変化|かがくへんか}では、{原子|げんし}の {組|く}み{合|あ}わせは {変|か}わるが、{原子|げんし}の {種類|しゅるい}と {数|かず}は {変|か}わらない。', '{質量|しつりょう}が「たもたれる」という {意味|いみ}の {名前|なまえ}。'],
    explanation: '{化学変化|かがくへんか}の {前後|ぜんご}で {物質|ぶっしつ}{全体|ぜんたい}の {質量|しつりょう}が {変|か}わらない ことを「{質量保存|しつりょうほぞん}の {法則|ほうそく}」と いいます。{気体|きたい}が {出|で}て いく {場合|ばあい}は、{密閉|みっぺい}した {容器|ようき}の {中|なか}で はかると {確|たし}かめられます。',
    inputForm: { answer: '質量保存の法則', acceptedAnswers: ['質量保存の 法則', 'しつりょうほぞんのほうそく'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g8_cell_002', subject: 'science', gradeLevel: 8, unit: 'cell',
    difficulty: 'standard', answerType: 'choice',
    question: '{植物|しょくぶつ}の {細胞|さいぼう}の {中|なか}で、{光合成|こうごうせい}が {行|おこな}われる {緑色|みどりいろ}の つぶは どれか。',
    choices: ['{葉緑体|ようりょくたい}', '{核|かく}', '{液胞|えきほう}', '{細胞壁|さいぼうへき}'],
    answer: '{葉緑体|ようりょくたい}',
    hints: ['{葉|は}が {緑色|みどりいろ}に {見|み}えるのは、この つぶが ある ため。', '{光|ひかり}の エネルギーを {使|つか}って、デンプンなどを つくる。'],
    explanation: '{光合成|こうごうせい}は {葉緑体|ようりょくたい}で {行|おこな}われます。{光|ひかり}の エネルギーを {使|つか}って、{水|みず}と {二酸化炭素|にさんかたんそ}から デンプンなどの {養分|ようぶん}を つくり、{酸素|さんそ}を {出|だ}します。',
    inputForm: { question: '{植物|しょくぶつ}の {細胞|さいぼう}の {中|なか}で、{光合成|こうごうせい}が {行|おこな}われる {緑色|みどりいろ}の つぶを 何と いうか。', acceptedAnswers: ['ようりょくたい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g8_weather_005', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: '{日本|にほん}の {冬|ふゆ}の {天気図|てんきず}で よく {見|み}られる {気圧配置|きあつはいち}は どれか。',
    choices: ['{西高東低|せいこうとうてい}', '{南高北低|なんこうほくてい}', '{東高西低|とうこうせいてい}', '{北高南低|ほっこうなんてい}'],
    answer: '{西高東低|せいこうとうてい}',
    hints: ['{冬|ふゆ}は、ユーラシア{大陸|たいりく}の シベリア{高気圧|こうきあつ}が {発達|はったつ}する。', '{冬|ふゆ}の {季節風|きせつふう}は {北西|ほくせい}から ふく。'],
    explanation: '{冬|ふゆ}は {大陸|たいりく}（{西|にし}）に {高気圧|こうきあつ}、{太平洋|たいへいよう}の {北|きた}の {海上|かいじょう}（{東|ひがし}）に {低気圧|ていきあつ}が ある「{西高東低|せいこうとうてい}」の {気圧配置|きあつはいち}に なりやすく、{北西|ほくせい}の {季節風|きせつふう}が ふきます。',
    inputForm: { question: '{日本|にほん}の {冬|ふゆ}の {天気図|てんきず}で よく {見|み}られる 気圧配置を 何と いうか。', acceptedAnswers: ['せいこうとうてい', '西高東低型'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g8_electric_005', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'standard', answerType: 'choice',
    question: 'まっすぐな {導線|どうせん}に {電流|でんりゅう}を {流|なが}したとき、{導線|どうせん}の まわりに できる {磁界|じかい}の {向|む}きとして {正|ただ}しいものは どれか。',
    choices: ['{電流|でんりゅう}の {向|む}きに {右|みぎ}ねじを {進|すす}めるとき、{右|みぎ}ねじを {回|まわ}す {向|む}き', '{電流|でんりゅう}と {同|おな}じ {向|む}き', '{電流|でんりゅう}と {反対|はんたい}の {向|む}き', '{導線|どうせん}から はなれる {向|む}き'],
    answer: '{電流|でんりゅう}の {向|む}きに {右|みぎ}ねじを {進|すす}めるとき、{右|みぎ}ねじを {回|まわ}す {向|む}き',
    hints: ['{磁界|じかい}は、{導線|どうせん}を {中心|ちゅうしん}と する {同心円|どうしんえん}の {形|かたち}に できる。', '「{右|みぎ}ねじの {法則|ほうそく}」を {思|おも}い{出|だ}そう。'],
    explanation: '{導線|どうせん}の まわりには {同心円|どうしんえん}{状|じょう}の {磁界|じかい}が でき、その {向|む}きは、{電流|でんりゅう}の {向|む}きに {右|みぎ}ねじを {進|すす}めるときに ねじを {回|まわ}す {向|む}きに なります。',
    reviewed: true
  },
  {
    id: 'science_g8_reaction_005', subject: 'science', gradeLevel: 8, unit: 'reaction',
    difficulty: 'advanced', answerType: 'input',
    question: '{鉄|てつ}（Fe）と {硫黄|いおう}（S）の {混合物|こんごうぶつ}を {加熱|かねつ}すると、{硫化鉄|りゅうかてつ}が できる。{硫化鉄|りゅうかてつ}の {化学式|かがくしき}を {書|か}きなさい。',
    answer: 'FeS', validationMode: 'exact',
    hints: ['{鉄原子|てつげんし}と {硫黄原子|いおうげんし}が 1：1の {割合|わりあい}で {結|むす}びつく。', '{金属|きんぞく}の {元素記号|げんそきごう}を {先|さき}に {書|か}く。'],
    explanation: '{鉄|てつ}と {硫黄|いおう}は 1：1で {結|むす}びつくので、{硫化鉄|りゅうかてつ}は FeS です（Fe＋S→FeS）。できた {硫化鉄|りゅうかてつ}は {磁石|じしゃく}に {引|ひ}きつけられず、もとの {鉄|てつ}とは ちがう {物質|ぶっしつ}です。',
    reviewed: true
  },
  {
    id: 'science_g8_electric_006', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'advanced', answerType: 'input',
    question: '100Vの {電圧|でんあつ}で 2Aの {電流|でんりゅう}が {流|なが}れる {電気器具|でんききぐ}の {電力|でんりょく}は {何|なん}Wか。{数|かず}で {答|こた}えなさい。',
    answer: '200', acceptedAnswers: ['200W'], validationMode: 'number',
    hints: ['{電力|でんりょく}（W）＝{電圧|でんあつ}（V）×{電流|でんりゅう}（A）', '100×2 を {計算|けいさん}する。'],
    explanation: '{電力|でんりょく}＝100×2＝200W です。{電力|でんりょく}は、1{秒間|びょうかん}あたりに {使|つか}われる {電気|でんき}エネルギーの {大|おお}きさを {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'science_g8_weather_006', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'advanced', answerType: 'choice',
    question: '{温暖前線|おんだんぜんせん}が {近|ちか}づいて くるとき、{広|ひろ}い {範囲|はんい}に {長|なが}い {時間|じかん}、おだやかな {雨|あめ}を ふらせる {雲|くも}は どれか。',
    choices: ['{乱層雲|らんそううん}', '{積乱雲|せきらんうん}', '{巻雲|けんうん}', '{積雲|せきうん}'],
    answer: '{乱層雲|らんそううん}',
    hints: ['{温暖前線|おんだんぜんせん}では、{暖気|だんき}が {寒気|かんき}の {上|うえ}を ゆるやかに はい{上|あ}がる。', '{積乱雲|せきらんうん}は {寒冷前線|かんれいぜんせん}で できやすく、せまい {範囲|はんい}に {強|つよ}い {雨|あめ}を ふらせる。'],
    explanation: '{温暖前線|おんだんぜんせん}では {暖気|だんき}が ゆるやかに {上|あ}がるので、{乱層雲|らんそううん}などの {層状|そうじょう}の {雲|くも}が でき、{広|ひろ}い {範囲|はんい}に おだやかな {雨|あめ}が {長|なが}い {時間|じかん}ふります。',
    inputForm: { question: '{温暖前線|おんだんぜんせん}が {近|ちか}づいて くるとき、{広|ひろ}い {範囲|はんい}に {長|なが}い {時間|じかん}、おだやかな {雨|あめ}を ふらせる 雲は 何か。', acceptedAnswers: ['らんそううん', '雨雲'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g8_body_005', subject: 'science', gradeLevel: 8, unit: 'body',
    difficulty: 'advanced', answerType: 'choice',
    question: '{肺|はい}は、{肺胞|はいほう}と いう {小|ちい}さな ふくろが たくさん {集|あつ}まって できて いる。この つくりの {利点|りてん}として {正|ただ}しいものは どれか。',
    choices: ['{空気|くうき}に ふれる {表面積|ひょうめんせき}が {大|おお}きく なり、{気体|きたい}の {交換|こうかん}が {効率|こうりつ}よく できる', '{肺|はい}が {軽|かる}く なり、{体|からだ}が {動|うご}かしやすく なる', '{血液|けつえき}が {流|なが}れなく なり、{酸素|さんそ}が たまる', '{空気|くうき}が {肺|はい}に {入|はい}らなく なる'],
    answer: '{空気|くうき}に ふれる {表面積|ひょうめんせき}が {大|おお}きく なり、{気体|きたい}の {交換|こうかん}が {効率|こうりつ}よく できる',
    hints: ['{小腸|しょうちょう}の {柔毛|じゅうもう}と にた しくみ。', '{肺胞|はいほう}の まわりは {毛細血管|もうさいけっかん}が とりまいて いる。'],
    explanation: '{肺胞|はいほう}が たくさん ある ことで、{空気|くうき}に ふれる {表面積|ひょうめんせき}が {大|おお}きく なり、{酸素|さんそ}と {二酸化炭素|にさんかたんそ}の {交換|こうかん}を {効率|こうりつ}よく {行|おこな}う ことが できます。',
    reviewed: true
  },

  // ===== Lv9（中学3年） =====
  {
    id: 'science_g9_ion_001', subject: 'science', gradeLevel: 9, unit: 'ion',
    difficulty: 'basic', answerType: 'choice',
    question: '{酸性|さんせい}の {水溶液|すいようえき}と アルカリ{性|せい}の {水溶液|すいようえき}を {混|ま}ぜると、たがいの {性質|せいしつ}を {打|う}ち{消|け}し{合|あ}う。この {反応|はんのう}を {何|なん}と いうか。',
    choices: ['{中和|ちゅうわ}', '{酸化|さんか}', '{還元|かんげん}', '{電気分解|でんきぶんかい}'],
    answer: '{中和|ちゅうわ}',
    hints: ['{水素|すいそ}イオンと {水酸化物|すいさんかぶつ}イオンが {結|むす}びついて {水|みず}が できる。', '「{和|わ}」の {字|じ}が つく ことば。'],
    explanation: '{酸|さん}と アルカリが たがいの {性質|せいしつ}を {打|う}ち{消|け}し{合|あ}う {反応|はんのう}を {中和|ちゅうわ}と いいます。{水|みず}と {塩|えん}が できます。',
    inputForm: { acceptedAnswers: ['ちゅうわ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g9_motion_001', subject: 'science', gradeLevel: 9, unit: 'motion',
    difficulty: 'basic', answerType: 'input',
    question: 'そりが 120mの {距離|きょり}を 8{秒|びょう}で {進|すす}んだ。このそりの {平均|へいきん}の {速|はや}さは {何|なん}m/sか。{数|かず}で {答|こた}えなさい。',
    answer: '15', acceptedAnswers: ['15m/s'], validationMode: 'number',
    hints: ['{速|はや}さ＝{移動|いどう}した {距離|きょり}÷かかった {時間|じかん}', '120÷8 を {計算|けいさん}する。'],
    explanation: '{速|はや}さ＝120÷8＝15m/s です。',
    reviewed: true
  },
  {
    id: 'science_g9_heredity_001', subject: 'science', gradeLevel: 9, unit: 'heredity',
    difficulty: 'standard', answerType: 'input',
    question: 'エンドウの {種子|しゅし}の {形|かたち}で、{丸|まる}（{顕性|けんせい}）の {遺伝子|いでんし}を A、しわ（{潜性|せんせい}）の {遺伝子|いでんし}を a と する。Aaの {個体|こたい}どうしを かけ{合|あ}わせたとき、できる {種子|しゅし}のうち「しわ」は {全体|ぜんたい}の {何|なん}％か。{数|かず}で {答|こた}えなさい。',
    answer: '25', acceptedAnswers: ['25%'], validationMode: 'number',
    hints: ['{子|こ}の {遺伝子|いでんし}の {組|く}み{合|あ}わせは AA・Aa・Aa・aa の 4{通|とお}り。', '「しわ」に なるのは aa の ときだけ。'],
    explanation: 'Aa×Aa で できる {子|こ}は AA：Aa：aa＝1：2：1。しわに なるのは aa だけなので、4つの うち 1つ、25％ です（{丸|まる}：しわ＝3：1）。',
    reviewed: true
  },
  {
    id: 'science_g9_energy_001', subject: 'science', gradeLevel: 9, unit: 'energy',
    difficulty: 'standard', answerType: 'input',
    question: '{重|おも}さ 10Nの {荷物|にもつ}を、ゆっくりと 2mの {高|たか}さまで まっすぐ {持|も}ち{上|あ}げた。このとき した {仕事|しごと}は {何|なん}Jか。{数|かず}で {答|こた}えなさい。',
    answer: '20', acceptedAnswers: ['20J'], validationMode: 'number',
    hints: ['{仕事|しごと}（J）＝{力|ちから}の {大|おお}きさ（N）×{力|ちから}の {向|む}きに {動|うご}いた {距離|きょり}（m）', '10×2 を {計算|けいさん}する。'],
    explanation: '{仕事|しごと}＝10N×2m＝20J です。',
    reviewed: true
  },
  {
    id: 'science_g9_astronomy_001', subject: 'science', gradeLevel: 9, unit: 'astronomy',
    difficulty: 'standard', answerType: 'input',
    question: '{地球|ちきゅう}の {自転|じてん}に よって、{太陽|たいよう}や {星|ほし}が 1{日|にち}に 1{回|かい}、{東|ひがし}から {西|にし}へ {動|うご}いて {見|み}える {見|み}かけの {動|うご}きを {何|なん}と いうか。',
    answer: 'にっしゅううんどう', acceptedAnswers: ['日周運動'], validationMode: 'kana-insensitive',
    hints: ['{地球|ちきゅう}の {公転|こうてん}に よる {見|み}かけの {動|うご}きは「{年周運動|ねんしゅううんどう}」。', '「1{日|にち}で 1{周|しゅう}する {運動|うんどう}」という {意味|いみ}の ことば。'],
    explanation: '{地球|ちきゅう}の {自転|じてん}に よる {天体|てんたい}の {見|み}かけの {動|うご}きを「{日周運動|にっしゅううんどう}」と いいます。{公転|こうてん}に よるものは「{年周運動|ねんしゅううんどう}」です。',
    reviewed: true
  },
  {
    id: 'science_g9_energy_002', subject: 'science', gradeLevel: 9, unit: 'energy',
    difficulty: 'standard', answerType: 'choice',
    question: 'まさつや {空気|くうき}の {抵抗|ていこう}が ないとき、{位置|いち}エネルギーと {運動|うんどう}エネルギーの {和|わ}は {一定|いってい}に {保|たも}たれる。この {和|わ}を {何|なん}と いうか。',
    choices: ['{力学的|りきがくてき}エネルギー', '{熱|ねつ}エネルギー', '{電気|でんき}エネルギー', '{化学|かがく}エネルギー'],
    answer: '{力学的|りきがくてき}エネルギー',
    hints: ['ふりこや ジェットコースターの {運動|うんどう}で {考|かんが}える エネルギー。', '「{力学的|りきがくてき}エネルギーの {保存|ほぞん}」という {言葉|ことば}が ある。'],
    explanation: '{位置|いち}エネルギーと {運動|うんどう}エネルギーの {和|わ}を {力学的|りきがくてき}エネルギーと いい、まさつなどが なければ {一定|いってい}に {保|たも}たれます（{力学的|りきがくてき}エネルギーの {保存|ほぞん}）。',
    inputForm: { acceptedAnswers: ['りきがくてきエネルギー'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g9_ecology_001', subject: 'science', gradeLevel: 9, unit: 'ecology',
    difficulty: 'standard', answerType: 'choice',
    question: '{生態系|せいたいけい}の {中|なか}で「{生産者|せいさんしゃ}」に あたる {生物|せいぶつ}は どれか。',
    choices: ['{植物|しょくぶつ}', '{草食動物|そうしょくどうぶつ}', '{肉食動物|にくしょくどうぶつ}', '{菌類|きんるい}・{細菌類|さいきんるい}'],
    answer: '{植物|しょくぶつ}',
    hints: ['{光合成|こうごうせい}に よって、{無機物|むきぶつ}から {有機物|ゆうきぶつ}を つくり{出|だ}す {生物|せいぶつ}。', '{動物|どうぶつ}は ほかの {生物|せいぶつ}を {食|た}べる「{消費者|しょうひしゃ}」。'],
    explanation: '{光合成|こうごうせい}で {有機物|ゆうきぶつ}を つくる {植物|しょくぶつ}が「{生産者|せいさんしゃ}」です。{動物|どうぶつ}は「{消費者|しょうひしゃ}」、{菌類|きんるい}・{細菌類|さいきんるい}は {死骸|しがい}などを {分解|ぶんかい}する「{分解者|ぶんかいしゃ}」です。',
    inputForm: { question: '{生態系|せいたいけい}の {中|なか}で「{生産者|せいさんしゃ}」に あたる 生物は 何か。', acceptedAnswers: ['しょくぶつ', '緑色植物'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g9_battery_001', subject: 'science', gradeLevel: 9, unit: 'battery',
    difficulty: 'advanced', answerType: 'input',
    question: 'ダニエル{電池|でんち}で、{亜鉛板|あえんばん}と {銅板|どうばん}の うち −{極|きょく}に なる {金属|きんぞく}は どちらか。{金属|きんぞく}の {名前|なまえ}で {答|こた}えなさい。',
    answer: '亜鉛', acceptedAnswers: ['あえん', 'Zn', '亜鉛板', 'あえんばん'], validationMode: 'kana-insensitive',
    hints: ['イオンに なりやすい {金属|きんぞく}が {電子|でんし}を {放出|ほうしゅつ}して −{極|きょく}に なる。', '{亜鉛|あえん}と {銅|どう}では、{亜鉛|あえん}の ほうが イオンに なりやすい。'],
    explanation: 'イオンに なりやすい {亜鉛|あえん}が {電子|でんし}を {放出|ほうしゅつ}して {亜鉛|あえん}イオンに なるので、{亜鉛板|あえんばん}が −{極|きょく}です。{電子|でんし}は {導線|どうせん}を {通|とお}って {銅板|どうばん}（＋{極|きょく}）へ {移動|いどう}します。',
    reviewed: true
  },
  {
    id: 'science_g9_force_001', subject: 'science', gradeLevel: 9, unit: 'force',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ばねばかりに つるした {物体|ぶったい}の {重|おも}さは、{空気中|くうきちゅう}で 5.0N、{全体|ぜんたい}を {水中|すいちゅう}に しずめると 3.0Nだった。この {物体|ぶったい}に はたらく {浮力|ふりょく}は どれか。',
    choices: ['2.0N', '8.0N', '3.0N', '5.0N'],
    answer: '2.0N',
    hints: ['{浮力|ふりょく}は、{水中|すいちゅう}で {物体|ぶったい}を {上向|うわむ}きに おす {力|ちから}。', '{空気中|くうきちゅう}と {水中|すいちゅう}の ばねばかりの {値|あたい}の {差|さ}を {考|かんが}える。'],
    explanation: '{浮力|ふりょく}＝{空気中|くうきちゅう}の {値|あたい}−{水中|すいちゅう}の {値|あたい}＝5.0−3.0＝2.0N です。',
    inputForm: { question: 'ばねばかりに つるした {物体|ぶったい}の {重|おも}さは、{空気中|くうきちゅう}で 5.0N、{全体|ぜんたい}を {水中|すいちゅう}に しずめると 3.0Nだった。この {物体|ぶったい}に はたらく 浮力は 何Nか。', answer: '2', acceptedAnswers: ['2.0N', '2N', '2.0'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'science_g9_ion_002', subject: 'science', gradeLevel: 9, unit: 'ion',
    difficulty: 'basic', answerType: 'choice',
    question: '{水|みず}に とかしたとき、その {水溶液|すいようえき}に {電流|でんりゅう}が {流|なが}れる {物質|ぶっしつ}（{電解質|でんかいしつ}）は どれか。',
    choices: ['{塩化|えんか}ナトリウム', '{砂糖|さとう}', 'エタノール', 'ブドウ{糖|とう}'],
    answer: '{塩化|えんか}ナトリウム',
    hints: ['{電解質|でんかいしつ}は、{水|みず}に とけると {陽|よう}イオンと {陰|いん}イオンに {分|わ}かれる（{電離|でんり}する）。', '{砂糖|さとう}や エタノールは、{水|みず}に とけても イオンに {分|わ}かれない。'],
    explanation: '{塩化|えんか}ナトリウムは {水|みず}に とけると ナトリウムイオンと {塩化物|えんかぶつ}イオンに {電離|でんり}するので、{水溶液|すいようえき}に {電流|でんりゅう}が {流|なが}れます。{砂糖|さとう}・エタノール・ブドウ{糖|とう}は {非電解質|ひでんかいしつ}です。',
    reviewed: true
  },
  {
    id: 'science_g9_astronomy_002', subject: 'science', gradeLevel: 9, unit: 'astronomy',
    difficulty: 'basic', answerType: 'choice',
    question: '{太陽系|たいようけい}の {惑星|わくせい}の うち、いちばん {大|おお}きい {惑星|わくせい}は どれか。',
    choices: ['{木星|もくせい}', '{土星|どせい}', '{地球|ちきゅう}', '{海王星|かいおうせい}'],
    answer: '{木星|もくせい}',
    hints: ['{地球|ちきゅう}の {直径|ちょっけい}の {約|やく}11{倍|ばい}も ある、ガスで できた {惑星|わくせい}。', '{土星|どせい}は {大|おお}きな {環|わ}を もつ、2{番目|ばんめ}に {大|おお}きい {惑星|わくせい}。'],
    explanation: '{太陽系|たいようけい}で いちばん {大|おお}きい {惑星|わくせい}は {木星|もくせい}で、{直径|ちょっけい}は {地球|ちきゅう}の {約|やく}11{倍|ばい}です。{木星|もくせい}や {土星|どせい}は、おもに {気体|きたい}で できた {木星型惑星|もくせいがたわくせい}です。',
    inputForm: { question: '{太陽系|たいようけい}の {惑星|わくせい}の うち、いちばん {大|おお}きい 惑星は 何か。', acceptedAnswers: ['もくせい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g9_ion_003', subject: 'science', gradeLevel: 9, unit: 'ion',
    difficulty: 'basic', answerType: 'input',
    question: 'pH（ピーエイチ）が 7 の {水溶液|すいようえき}は、{酸性|さんせい}・{中性|ちゅうせい}・アルカリ{性|せい}の どれか。',
    answer: 'ちゅうせい', acceptedAnswers: ['中性'], validationMode: 'kana-insensitive',
    hints: ['pH は 0〜14 の {数|かず}で {表|あらわ}し、{小|ちい}さいほど {酸性|さんせい}が {強|つよ}い。', '7より {大|おお}きいと アルカリ{性|せい}。'],
    explanation: 'pH が 7 の {水溶液|すいようえき}は {中性|ちゅうせい}です。7より {小|ちい}さいと {酸性|さんせい}、7より {大|おお}きいと アルカリ{性|せい}です。',
    reviewed: true
  },
  {
    id: 'science_g9_reproduction_001', subject: 'science', gradeLevel: 9, unit: 'reproduction',
    difficulty: 'basic', answerType: 'input',
    question: '{卵|らん}や {精子|せいし}などの {生殖細胞|せいしょくさいぼう}が つくられる ときに おこる、{染色体|せんしょくたい}の {数|かず}が もとの {細胞|さいぼう}の {半分|はんぶん}に なる {細胞分裂|さいぼうぶんれつ}を {何|なん}と いうか。',
    answer: 'げんすうぶんれつ', acceptedAnswers: ['減数分裂'], validationMode: 'kana-insensitive',
    hints: ['{体|からだ}を つくる {細胞|さいぼう}が ふえる ときの ふつうの {分裂|ぶんれつ}は「{体細胞分裂|たいさいぼうぶんれつ}」。', '{染色体|せんしょくたい}の {数|かず}が「へる」ことを {表|あらわ}す {名前|なまえ}。'],
    explanation: '{生殖細胞|せいしょくさいぼう}が つくられる ときの {分裂|ぶんれつ}を「{減数分裂|げんすうぶんれつ}」と いいます。{受精|じゅせい}で {染色体|せんしょくたい}の {数|かず}が もとに もどるので、{親|おや}と {子|こ}の {染色体|せんしょくたい}の {数|かず}は {同|おな}じに なります。',
    reviewed: true
  },
  {
    id: 'science_g9_motion_002', subject: 'science', gradeLevel: 9, unit: 'motion',
    difficulty: 'standard', answerType: 'input',
    question: '{物体|ぶったい}に {力|ちから}が はたらいて いないとき（はたらく {力|ちから}が つり{合|あ}って いるとき）、{静止|せいし}して いる {物体|ぶったい}は {静止|せいし}し{続|つづ}け、{運動|うんどう}して いる {物体|ぶったい}は {等速直線運動|とうそくちょくせんうんどう}を {続|つづ}ける。この {性質|せいしつ}を {何|なん}と いうか。',
    answer: 'かんせい', acceptedAnswers: ['慣性'], validationMode: 'kana-insensitive',
    hints: ['{電車|でんしゃ}が {急|きゅう}に {止|と}まると、{乗客|じょうきゃく}の {体|からだ}が {前|まえ}に たおれそうに なるのは この {性質|せいしつ}の ため。', '「{慣|な}れる」の {字|じ}を {使|つか}う ことば。'],
    explanation: '{物体|ぶったい}が それまでの {運動|うんどう}の {状態|じょうたい}を {続|つづ}けようと する {性質|せいしつ}を「{慣性|かんせい}」と いいます。この {法則|ほうそく}を {慣性|かんせい}の {法則|ほうそく}と いいます。',
    reviewed: true
  },
  {
    id: 'science_g9_heredity_002', subject: 'science', gradeLevel: 9, unit: 'heredity',
    difficulty: 'standard', answerType: 'input',
    question: '{遺伝子|いでんし}の {本体|ほんたい}で ある {物質|ぶっしつ}を、アルファベット3{文字|もじ}の {略称|りゃくしょう}で {答|こた}えなさい。',
    answer: 'DNA', validationMode: 'exact',
    hints: ['{細胞|さいぼう}の {核|かく}の {中|なか}の {染色体|せんしょくたい}に ふくまれる。', '{正式|せいしき}な {名前|なまえ}は「デオキシリボ{核酸|かくさん}」。'],
    explanation: '{遺伝子|いでんし}の {本体|ほんたい}は DNA（デオキシリボ{核酸|かくさん}）です。DNA は {細胞|さいぼう}の {核|かく}の {中|なか}の {染色体|せんしょくたい}に ふくまれて います。',
    reviewed: true
  },
  {
    id: 'science_g9_energy_003', subject: 'science', gradeLevel: 9, unit: 'energy',
    difficulty: 'standard', answerType: 'input',
    question: 'モーターで {荷物|にもつ}を {持|も}ち{上|あ}げ、10{秒間|びょうかん}で 300Jの {仕事|しごと}を した。このときの {仕事率|しごとりつ}は {何|なん}Wか。{数|かず}で {答|こた}えなさい。',
    answer: '30', acceptedAnswers: ['30W'], validationMode: 'number',
    hints: ['{仕事率|しごとりつ}（W）＝{仕事|しごと}（J）÷かかった {時間|じかん}（s）', '300÷10 を {計算|けいさん}する。'],
    explanation: '{仕事率|しごとりつ}＝300÷10＝30W です。{仕事率|しごとりつ}は 1{秒間|びょうかん}あたりに する {仕事|しごと}の {大|おお}きさです。',
    reviewed: true
  },
  {
    id: 'science_g9_astronomy_003', subject: 'science', gradeLevel: 9, unit: 'astronomy',
    difficulty: 'standard', answerType: 'input',
    question: '{夕方|ゆうがた}、{西|にし}の {空|そら}に {明|あか}るく かがやいて {見|み}える {金星|きんせい}を {何|なん}と よぶか。ひらがなで {答|こた}えなさい。',
    answer: 'よいのみょうじょう', acceptedAnswers: ['宵の明星', 'よいの明星'], validationMode: 'kana-insensitive',
    hints: ['{明|あ}け{方|がた}、{東|ひがし}の {空|そら}に {見|み}える {金星|きんせい}は「{明|あ}けの {明星|みょうじょう}」。', '「{宵|よい}」は、{日|ひ}が くれて まもない ころの こと。'],
    explanation: '{夕方|ゆうがた}に {西|にし}の {空|そら}に {見|み}える {金星|きんせい}を「{宵|よい}の {明星|みょうじょう}」、{明|あ}け{方|がた}に {東|ひがし}の {空|そら}に {見|み}える {金星|きんせい}を「{明|あ}けの {明星|みょうじょう}」と いいます。{金星|きんせい}は {地球|ちきゅう}より {内側|うちがわ}を {公転|こうてん}して いるので、{真夜中|まよなか}には {見|み}えません。',
    reviewed: true
  },
  {
    id: 'science_g9_ion_004', subject: 'science', gradeLevel: 9, unit: 'ion',
    difficulty: 'standard', answerType: 'input',
    question: '{中和|ちゅうわ}で、{酸|さん}の {陰|いん}イオンと アルカリの {陽|よう}イオンが {結|むす}びついて できる {物質|ぶっしつ}を {何|なん}と いうか。{漢字|かんじ}1{字|じ}か ひらがなで {答|こた}えなさい。',
    answer: 'えん', acceptedAnswers: ['塩'], validationMode: 'kana-insensitive',
    hints: ['{塩酸|えんさん}と {水酸化|すいさんか}ナトリウム{水溶液|すいようえき}の {中和|ちゅうわ}では、{塩化|えんか}ナトリウムが できる。', '「しお」と {同|おな}じ {漢字|かんじ}を、{音読|おんよ}みする。'],
    explanation: '{中和|ちゅうわ}で できる、{酸|さん}の {陰|いん}イオンと アルカリの {陽|よう}イオンが {結|むす}びついた {物質|ぶっしつ}を「{塩|えん}」と いいます。{中和|ちゅうわ}では、{水素|すいそ}イオンと {水酸化物|すいさんかぶつ}イオンが {結|むす}びついて {水|みず}も できます。',
    reviewed: true
  },
  {
    id: 'science_g9_evolution_001', subject: 'science', gradeLevel: 9, unit: 'evolution',
    difficulty: 'standard', answerType: 'input',
    question: 'ヒトの うで、クジラの {胸|むな}びれ、コウモリの つばさのように、{形|かたち}や はたらきは ちがうが、もとは {同|おな}じ {器官|きかん}から {変化|へんか}したと {考|かんが}えられる {器官|きかん}を {何|なん}と いうか。',
    answer: 'そうどうきかん', acceptedAnswers: ['相同器官'], validationMode: 'kana-insensitive',
    hints: ['{骨格|こっかく}の {基本的|きほんてき}な つくりが {似|に}て いる。', '「{相|あい}」と「{同|おな}じ」の {字|じ}を {使|つか}う。'],
    explanation: 'もとは {同|おな}じ {器官|きかん}だったと {考|かんが}えられる {器官|きかん}を「{相同器官|そうどうきかん}」と いいます。{生物|せいぶつ}が {長|なが}い {時間|じかん}を かけて {進化|しんか}して きた {証拠|しょうこ}の 1つと {考|かんが}えられて います。',
    reviewed: true
  },
  {
    id: 'science_g9_force_002', subject: 'science', gradeLevel: 9, unit: 'force',
    difficulty: 'standard', answerType: 'choice',
    question: '1つの {物体|ぶったい}に、{一直線上|いっちょくせんじょう}で {同|おな}じ {向|む}きに 3Nと 4Nの {力|ちから}が はたらいて いる。この 2つの {力|ちから}の {合力|ごうりょく}は どれか。',
    choices: ['7N', '1N', '5N', '12N'],
    answer: '7N',
    hints: ['{同|おな}じ {向|む}きの {力|ちから}の {合力|ごうりょく}は、2つの {力|ちから}の {和|わ}。', '{反対|はんたい}{向|む}きなら {差|さ}に なる。'],
    explanation: '{一直線上|いっちょくせんじょう}で {同|おな}じ {向|む}きに はたらく 2{力|りょく}の {合力|ごうりょく}は、{和|わ}の 3＋4＝7N です。{反対|はんたい}{向|む}きなら {差|さ}の 1N、{直角|ちょっかく}に はたらく {場合|ばあい}は {平行四辺形|へいこうしへんけい}の {法則|ほうそく}で 5N に なります。',
    inputForm: { question: '1つの {物体|ぶったい}に、{一直線上|いっちょくせんじょう}で {同|おな}じ {向|む}きに 3Nと 4Nの {力|ちから}が はたらいて いる。この 2つの {力|ちから}の 合力は 何Nか。', answer: '7', acceptedAnswers: ['7N'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g9_motion_003', subject: 'science', gradeLevel: 9, unit: 'motion',
    difficulty: 'standard', answerType: 'choice',
    question: 'スケートボードに {乗|の}った {人|ひと}が かべを おすと、{人|ひと}は かべから おし{返|かえ}されて {動|うご}き{出|だ}した。かべが {人|ひと}を おし{返|かえ}す {力|ちから}の {大|おお}きさは、{人|ひと}が かべを おす {力|ちから}と くらべて どうか。',
    choices: ['{同|おな}じ {大|おお}きさ', 'より {大|おお}きい', 'より {小|ちい}さい', '0（おし{返|かえ}す {力|ちから}は はたらかない）'],
    answer: '{同|おな}じ {大|おお}きさ',
    hints: ['{作用|さよう}・{反作用|はんさよう}の {法則|ほうそく}を {思|おも}い{出|だ}そう。', '2つの {物体|ぶったい}の {間|あいだ}で {力|ちから}は {対|つい}に なって はたらく。'],
    explanation: '{物体|ぶったい}が ほかの {物体|ぶったい}に {力|ちから}を {加|くわ}えると、{同時|どうじ}に {同|おな}じ {大|おお}きさで {反対|はんたい}{向|む}きの {力|ちから}を {受|う}けます（{作用|さよう}・{反作用|はんさよう}の {法則|ほうそく}）。',
    inputForm: { answer: '同じ大きさ', acceptedAnswers: ['同じ 大きさ', '同じ', 'おなじ', 'おなじおおきさ', '等しい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g9_astronomy_004', subject: 'science', gradeLevel: 9, unit: 'astronomy',
    difficulty: 'standard', answerType: 'choice',
    question: '{日本|にほん}で、{夏|なつ}は {冬|ふゆ}に くらべて {太陽|たいよう}の {南中高度|なんちゅうこうど}が {高|たか}く、{昼|ひる}の {長|なが}さが {長|なが}い。その {理由|りゆう}として {正|ただ}しいものは どれか。',
    choices: ['{地球|ちきゅう}が {地軸|ちじく}を {傾|かたむ}けたまま {公転|こうてん}して いるから', '{夏|なつ}は {地球|ちきゅう}と {太陽|たいよう}の {距離|きょり}が とても {近|ちか}く なるから', '{夏|なつ}は {地球|ちきゅう}の {自転|じてん}が おそく なるから', '{夏|なつ}は {太陽|たいよう}が {大|おお}きく なるから'],
    answer: '{地球|ちきゅう}が {地軸|ちじく}を {傾|かたむ}けたまま {公転|こうてん}して いるから',
    hints: ['{地軸|ちじく}は、{公転面|こうてんめん}に {垂直|すいちょく}な {方向|ほうこう}から {約|やく}23.4° {傾|かたむ}いて いる。', '{北半球|きたはんきゅう}が {太陽|たいよう}の {方|ほう}に {傾|かたむ}いて いる {時期|じき}は どの {季節|きせつ}か。'],
    explanation: '{地球|ちきゅう}は {地軸|ちじく}を {傾|かたむ}けたまま {太陽|たいよう}の まわりを {公転|こうてん}して いるので、{季節|きせつ}に よって {南中高度|なんちゅうこうど}や {昼|ひる}の {長|なが}さが {変|か}わります。{太陽|たいよう}との {距離|きょり}の {変化|へんか}は、{季節|きせつ}の おもな {原因|げんいん}では ありません。',
    reviewed: true
  },
  {
    id: 'science_g9_environment_001', subject: 'science', gradeLevel: 9, unit: 'environment',
    difficulty: 'standard', answerType: 'choice',
    question: '{化石燃料|かせきねんりょう}の {大量|たいりょう}の {使用|しよう}などで {大気中|たいきちゅう}に ふえ、{地球温暖化|ちきゅうおんだんか}の {原因|げんいん}の 1つと {考|かんが}えられて いる {気体|きたい}は どれか。',
    choices: ['{二酸化炭素|にさんかたんそ}', '{酸素|さんそ}', '{窒素|ちっそ}', 'アルゴン'],
    answer: '{二酸化炭素|にさんかたんそ}',
    hints: ['{石油|せきゆ}や {石炭|せきたん}を {燃|も}やすと {発生|はっせい}する。', '{地表|ちひょう}から {出|で}る {熱|ねつ}を {吸収|きゅうしゅう}する「{温室効果|おんしつこうか}ガス」の 1つ。'],
    explanation: '{二酸化炭素|にさんかたんそ}は {温室効果|おんしつこうか}ガスの 1つで、{化石燃料|かせきねんりょう}の {使用|しよう}などで ふえ、{地球温暖化|ちきゅうおんだんか}の {原因|げんいん}の 1つと {考|かんが}えられて います。',
    inputForm: { question: '{化石燃料|かせきねんりょう}の {大量|たいりょう}の {使用|しよう}などで {大気中|たいきちゅう}に ふえ、{地球温暖化|ちきゅうおんだんか}の {原因|げんいん}の 1つと {考|かんが}えられて いる 気体は 何か。', acceptedAnswers: ['にさんかたんそ', 'CO2'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'science_g9_motion_004', subject: 'science', gradeLevel: 9, unit: 'motion',
    difficulty: 'advanced', answerType: 'input',
    question: '{時速|じそく}72kmで {走|はし}る {自動車|じどうしゃ}の {速|はや}さは、{秒速|びょうそく}{何|なん}mか。{数|かず}で {答|こた}えなさい。',
    answer: '20', acceptedAnswers: ['20m/s'], validationMode: 'number',
    hints: ['72km＝72000m、1{時間|じかん}＝3600{秒|びょう}。', '72000÷3600 を {計算|けいさん}する。'],
    explanation: '72km/h＝72000m÷3600s＝20m/s です。（km/h を m/s に なおすには 3.6 で わる）',
    reviewed: true
  },
  {
    id: 'science_g9_astronomy_005', subject: 'science', gradeLevel: 9, unit: 'astronomy',
    difficulty: 'advanced', answerType: 'input',
    question: '{北極星|ほっきょくせい}の {高度|こうど}は、{観測|かんそく}する {地点|ちてん}の {緯度|いど}と ほぼ {等|ひと}しい。{北緯|ほくい}35°の {地点|ちてん}で {見|み}る {北極星|ほっきょくせい}の {高度|こうど}は {何度|なんど}か。{数|かず}で {答|こた}えなさい。',
    answer: '35', acceptedAnswers: ['35°', '35度'], validationMode: 'number',
    hints: ['{北極|ほっきょく}（{北緯|ほくい}90°）では、{北極星|ほっきょくせい}は ほぼ {真上|まうえ}（{高度|こうど}90°）に {見|み}える。', '{赤道|せきどう}（{緯度|いど}0°）では、ほぼ {地平線|ちへいせん}（{高度|こうど}0°）に {見|み}える。'],
    explanation: '{北極星|ほっきょくせい}の {高度|こうど}は その {地点|ちてん}の {緯度|いど}と ほぼ {等|ひと}しいので、{北緯|ほくい}35°の {地点|ちてん}では {約|やく}35°です。',
    reviewed: true
  },
  {
    id: 'science_g9_reproduction_002', subject: 'science', gradeLevel: 9, unit: 'reproduction',
    difficulty: 'advanced', answerType: 'choice',
    question: '{無性生殖|むせいせいしょく}の {例|れい}として {正|ただ}しいものは どれか。',
    choices: ['ジャガイモの いもから {芽|め}が {出|で}て、{新|あたら}しい {個体|こたい}が できる', 'カエルの {卵|らん}と {精子|せいし}が {受精|じゅせい}して {子|こ}が できる', 'エンドウの {花|はな}で {受粉|じゅふん}して {種子|しゅし}が できる', 'メダカの めすと おすから {子|こ}が できる'],
    answer: 'ジャガイモの いもから {芽|め}が {出|で}て、{新|あたら}しい {個体|こたい}が できる',
    hints: ['{無性生殖|むせいせいしょく}は、{受精|じゅせい}を しないで {子|こ}を つくる ふえ{方|かた}。', '{植物|しょくぶつ}の {体|からだ}の {一部|いちぶ}から {新|あたら}しい {個体|こたい}が できる ことを「{栄養生殖|えいようせいしょく}」と いう。'],
    explanation: 'ジャガイモの いもから {新|あたら}しい {個体|こたい}が できるのは、{受精|じゅせい}を しない {無性生殖|むせいせいしょく}（{栄養生殖|えいようせいしょく}）です。{無性生殖|むせいせいしょく}で できた {子|こ}は、{親|おや}と まったく {同|おな}じ {形質|けいしつ}を もちます。',
    reviewed: true
  },
  {
    id: 'science_g9_force_003', subject: 'science', gradeLevel: 9, unit: 'force',
    difficulty: 'advanced', answerType: 'choice',
    question: '{水中|すいちゅう}に ある {物体|ぶったい}に はたらく {水圧|すいあつ}に ついて、{正|ただ}しいものは どれか。',
    choices: ['{深|ふか}いほど {大|おお}きく、あらゆる {向|む}きから はたらく', '{深|ふか}いほど {小|ちい}さく、{上|うえ}からだけ はたらく', '{深|ふか}さに {関係|かんけい}なく {同|おな}じ {大|おお}きさで、{下|した}からだけ はたらく', '{水面|すいめん}の {近|ちか}くだけで はたらく'],
    answer: '{深|ふか}いほど {大|おお}きく、あらゆる {向|む}きから はたらく',
    hints: ['{水圧|すいあつ}は、その {上|うえ}に ある {水|みず}の {重|おも}さに よって {生|しょう}じる。', 'ゴム{膜|まく}を はった つつを {水|みず}に しずめると、どの {向|む}きの {膜|まく}も へこむ。'],
    explanation: '{水圧|すいあつ}は {深|ふか}いほど {大|おお}きく、あらゆる {向|む}きから はたらきます。{物体|ぶったい}の {下|した}の {面|めん}に はたらく {水圧|すいあつ}は {上|うえ}の {面|めん}より {大|おお}きいので、その {差|さ}が {浮力|ふりょく}に なります。',
    reviewed: true
  }
);
