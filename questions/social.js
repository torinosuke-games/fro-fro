// 問題データ：社会（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。人が内容を確認したら true にする（フェーズ7の問題と v0.3 で追加した問題は、どちらも 2026-09-26 に確認済み）。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// Lv1〜2 は生活科に相当する内容（安全・まちの人や場所・行事）。
// v0.3（SPEC_v0.3.md 4章・B案）で各学年18問を足して27問にした：基礎6（4択3・自由入力3）、標準15（自由入力9・4択6）、発展6（自由入力3・4択3）。
// 追加した問題は、Lv1〜2 をひらがな・カタカナだけで書き、Lv3 以上は漢字にすべて {漢字|よみ} を明示している。
window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(

  // ===== Lv1（小学1年・生活科相当） =====
  {
    id: 'social_g1_safety_001', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'basic', answerType: 'choice',
    question: 'ほこうしゃようの しんごうが あかの とき、どう すれば よいかな。',
    choices: ['とまって まつ', 'わたる', 'はしって わたる', 'てを あげて わたる'],
    answer: 'とまって まつ',
    hints: ['あかは「とまれ」の あいずだよ。', 'あおに なるまで まとう。'],
    explanation: 'しんごうが あかの ときは、とまって まちます。あおに なって、みぎ・ひだりを よく みてから わたりましょう。',
    reviewed: true
  },
  {
    id: 'social_g1_school_001', subject: 'social', gradeLevel: 1, unit: 'school',
    difficulty: 'basic', answerType: 'input',
    question: 'がっこうで、ほんを よんだり かりたり できる へやを なんと いうかな。ひらがなで かこう。',
    answer: 'としょしつ', acceptedAnswers: ['図書室'], validationMode: 'kana-insensitive',
    hints: ['ほんが たくさん ならんで いる へやだよ。', '「としょ〇〇」だよ。'],
    explanation: 'ほんを よんだり かりたり できる へやは「としょしつ」です。しずかに つかいましょう。',
    reviewed: true
  },
  {
    id: 'social_g1_town_001', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'まちの こうばんに いて、みちあんないを したり、こまった ひとを たすけたり する ひとを なんと よぶかな。ひらがなで かこう。',
    answer: 'おまわりさん', acceptedAnswers: ['けいさつかん', '警察官', 'けいかん', '警官'], validationMode: 'kana-insensitive',
    hints: ['まちを「おまわり」して まもって くれる ひとだよ。', '「お」から はじまる よびかただよ。'],
    explanation: 'こうばんには「おまわりさん（けいさつかん）」が いて、まちの あんぜんを まもって います。',
    reviewed: true
  },
  {
    id: 'social_g1_town_002', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'かじの とき、しょうぼうしゃで かけつけて ひを けして くれる ひとを なんと いうかな。ひらがなで かこう。',
    answer: 'しょうぼうし', acceptedAnswers: ['消防士', 'しょうぼうたいいん', '消防隊員', 'しょうぼうかん', '消防官'], validationMode: 'kana-insensitive',
    hints: ['あかい くるまに のって くるよ。', '「しょうぼう〇」だよ。'],
    explanation: 'かじの ひを けして くれるのは「しょうぼうし」です。けがや びょうきの ひとを はこぶ きゅうきゅうたいも しょうぼうしょに います。',
    reviewed: true
  },
  {
    id: 'social_g1_event_001', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: '1がつの はじめに、あたらしい としを むかえて おいわいする ことを なんと いうかな。ひらがなで かこう。',
    answer: 'おしょうがつ', acceptedAnswers: ['しょうがつ', 'お正月', '正月'], validationMode: 'kana-insensitive',
    hints: ['おせちりょうりを たべたり、おとしだまを もらったり するよ。', '「おしょう〇〇」だよ。'],
    explanation: '1がつの はじめに あたらしい としを いわう ことを「おしょうがつ」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g1_town_003', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'choice',
    question: 'みんなで つかう こうえんで、して よい ことは どれかな。',
    choices: ['じゅんばんを まもって あそぶ', 'ごみを おいて かえる', 'さいて いる はなを とって かえる', 'ブランコを ずっと ひとりじめする'],
    answer: 'じゅんばんを まもって あそぶ',
    hints: ['こうえんは みんなの ばしょだよ。', 'ほかの ひとが こまる ことは しないように しよう。'],
    explanation: 'こうえんは みんなで つかう ばしょです。じゅんばんを まもり、ごみは もちかえりましょう。',
    reviewed: true
  },
  {
    id: 'social_g1_safety_002', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'standard', answerType: 'choice',
    question: 'じけんや じこを みて、けいさつに でんわを する ときの ばんごうは どれかな。',
    choices: ['110ばん', '119ばん', '117ばん', '100ばん'],
    answer: '110ばん',
    hints: ['「ひゃくとおばん」と よぶ ことが あるよ。', '119ばんは かじや きゅうきゅうしゃの ばんごうだよ。'],
    explanation: 'けいさつへの でんわは「110ばん」です。かじや きゅうきゅうしゃを よぶ ときは「119ばん」です。',
    inputForm: { question: 'じけんや じこを みて、けいさつに でんわを する ときの ばんごうは なんばんかな。', answer: '110', acceptedAnswers: ['110ばん', '110番', 'ひゃくとおばん'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g1_safety_003', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'advanced', answerType: 'input',
    question: 'かじの ときや、きゅうきゅうしゃを よぶ ときに かける でんわばんごうは なんばんかな。すうじで かこう。',
    answer: '119', acceptedAnswers: ['119ばん'], validationMode: 'number',
    hints: ['けいさつは 110ばん。こちらは さいごの かずが ちがうよ。', 'しょうぼうしょに つながる ばんごうだよ。'],
    explanation: 'かじや きゅうきゅうしゃは「119ばん」です。けいさつは「110ばん」です。',
    reviewed: true
  },
  {
    id: 'social_g1_event_002', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'advanced', answerType: 'choice',
    question: '7がつ 7かに、ねがいごとを かいた たんざくを ささに かざる ぎょうじは どれかな。',
    choices: ['たなばた', 'ひなまつり', 'こどもの ひ', 'せつぶん'],
    answer: 'たなばた',
    hints: ['おりひめと ひこぼしの おはなしが あるよ。', 'よぞらの あまのがわに かんけいが あるよ。'],
    explanation: '7がつ 7かの「たなばた」には、ねがいごとを かいた たんざくを ささに かざります。',
    inputForm: { question: '7がつ 7かに、ねがいごとを かいた たんざくを ささに かざる ぎょうじは なにかな。', acceptedAnswers: ['七夕'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g1_school_002', subject: 'social', gradeLevel: 1, unit: 'school',
    difficulty: 'basic', answerType: 'choice',
    question: 'がっこうで けがを したり、ぐあいが わるく なったり した ときに いく へやは どれかな。',
    choices: ['ほけんしつ', 'としょしつ', 'おんがくしつ', 'りかしつ'],
    answer: 'ほけんしつ',
    hints: ['ベッドが あって、やすむ ことが できる へやだよ。', 'ようごの せんせいが いる へやだよ。'],
    explanation: 'けがを したり ぐあいが わるく なったり したら「ほけんしつ」へ いきます。ようごの せんせいが てあてを して くれます。',
    inputForm: { question: 'がっこうで けがを したり、ぐあいが わるく なったり した ときに いく へやは なにかな。', acceptedAnswers: ['保健室'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g1_safety_004', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'basic', answerType: 'choice',
    question: 'しんごうの ない みちを わたる とき、まず する ことは どれかな。',
    choices: ['とまって、みぎと ひだりを よく みる', 'めを つぶって はしる', 'ともだちと ふざけながら わたる', 'くるまが きても そのまま わたる'],
    answer: 'とまって、みぎと ひだりを よく みる',
    hints: ['くるまが きて いないか たしかめるよ。', 'あわてないで、いちど とまろう。'],
    explanation: 'みちを わたる ときは、とまって みぎと ひだりを よく みて、くるまが こない ことを たしかめてから わたります。',
    reviewed: true
  },
  {
    id: 'social_g1_town_004', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'basic', answerType: 'input',
    question: 'びょうきや けがの ときに、からだを みて なおして くれる ひとを なんと よぶかな。ひらがなで かこう。',
    answer: 'おいしゃさん', acceptedAnswers: ['いしゃ', 'おいしゃ', 'いしゃさん', '医者', 'お医者さん'], validationMode: 'kana-insensitive',
    hints: ['びょういんで はたらいて いるよ。', 'しろい ふくを きて、ちょうしんきを つかう ことが あるよ。'],
    explanation: 'びょうきや けがを なおして くれるのは「おいしゃさん」です。びょういんでは かんごしさんも いっしょに はたらいて います。',
    reviewed: true
  },
  {
    id: 'social_g1_event_003', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'basic', answerType: 'input',
    question: '12がつ 25にちの まえの よるに、サンタクロースが プレゼントを もって くると いわれる ひを なんと いうかな。かたかなで かこう。',
    answer: 'クリスマス', validationMode: 'kana-insensitive',
    hints: ['ツリーに かざりを つけるよ。', '「ク」から はじまる ことばだよ。'],
    explanation: '12がつ 25にちは「クリスマス」です。まえの ひの よるは「クリスマスイブ」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g1_school_003', subject: 'social', gradeLevel: 1, unit: 'school',
    difficulty: 'standard', answerType: 'input',
    question: 'がっこうで いちばん うえの たちばで、がっこう ぜんたいを まとめて いる せんせいを なんと いうかな。ひらがなで かこう。',
    answer: 'こうちょうせんせい', acceptedAnswers: ['こうちょう', '校長', '校長先生'], validationMode: 'kana-insensitive',
    hints: ['ぜんこうしゅうかいで おはなしを する ことが おおいよ。', '「こう」から はじまる ことばだよ。'],
    explanation: 'がっこう ぜんたいを まとめて いるのは「こうちょうせんせい」です。',
    reviewed: true
  },
  {
    id: 'social_g1_town_005', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'ひとが のって、そらを とんで とおくへ いく のりものは なにかな。ひらがなで かこう。',
    answer: 'ひこうき', acceptedAnswers: ['飛行機', 'ヒコウキ'], validationMode: 'kana-insensitive',
    hints: ['くうこうから とびたつよ。', 'つばさが ついて いるよ。'],
    explanation: 'そらを とんで とおくへ いく のりものは「ひこうき」です。くうこうから のります。',
    reviewed: true
  },
  {
    id: 'social_g1_event_004', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: 'おしょうがつに、おとなから こどもが もらう おかねを なんと いうかな。ひらがなで かこう。',
    answer: 'おとしだま', acceptedAnswers: ['お年玉', 'としだま'], validationMode: 'kana-insensitive',
    hints: ['ぽちぶくろと いう ちいさな ふくろに はいって いるよ。', '「おとし○○」だよ。'],
    explanation: 'おしょうがつに もらう おかねを「おとしだま」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g1_family_001', subject: 'social', gradeLevel: 1, unit: 'family',
    difficulty: 'standard', answerType: 'input',
    question: 'おとうさんや おかあさんの おとうさんを なんと よぶかな。ひらがなで かこう。',
    answer: 'おじいさん', acceptedAnswers: ['おじいちゃん', 'じいじ', 'そふ', '祖父', 'じいちゃん'], validationMode: 'kana-insensitive',
    hints: ['おとうさんや おかあさんの おかあさんは「おばあさん」だね。', '「おじい○○」だよ。'],
    explanation: 'おとうさんや おかあさんの おとうさんは「おじいさん（そふ）」、おかあさんは「おばあさん（そぼ）」です。',
    reviewed: true
  },
  {
    id: 'social_g1_safety_005', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'standard', answerType: 'input',
    question: 'くるまに のる ときに、からだを まもる ために しめる ベルトを なんと いうかな。かたかなで かこう。',
    answer: 'シートベルト', acceptedAnswers: ['しーとべると'], validationMode: 'kana-insensitive',
    hints: ['くるまが きゅうに とまっても、からだが とびださないように するよ。', '「シート」は いすの ことだよ。'],
    explanation: 'くるまに のる ときは「シートベルト」を しめます。ちいさい こどもは チャイルドシートを つかいます。',
    reviewed: true
  },
  {
    id: 'social_g1_safety_006', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'standard', answerType: 'input',
    question: 'くるまの しんごうの いろは「あお・きいろ・○○」の 3つです。○○に はいる いろを ひらがなで かこう。',
    answer: 'あか', acceptedAnswers: ['赤'], validationMode: 'kana-insensitive',
    hints: ['「とまれ」の いみの いろだよ。', 'りんごや いちごの いろだよ。'],
    explanation: 'しんごうは「あお（すすめ）・きいろ（とまれ・ちゅうい）・あか（とまれ）」の 3つの いろです。',
    reviewed: true
  },
  {
    id: 'social_g1_safety_007', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'standard', answerType: 'choice',
    question: 'しらない ひとに「いっしょに いこう」と こえを かけられたら、どう すれば よいかな。',
    choices: ['ついて いかずに、ちかくの おとなや おうちの ひとに しらせる', 'おかしを くれるなら ついて いく', 'だまって ついて いく', 'ともだちと いっしょなら ついて いく'],
    answer: 'ついて いかずに、ちかくの おとなや おうちの ひとに しらせる',
    hints: ['しらない ひとには ついて いかないよ。', 'こまった ときは、「こども 110ばんの いえ」に にげこむ ことも できるよ。'],
    explanation: 'しらない ひとには ついて いきません。こわい ときは おおきな こえを だして にげ、ちかくの おとなや おうちの ひとに しらせましょう。',
    reviewed: true
  },
  {
    id: 'social_g1_event_005', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'standard', answerType: 'choice',
    question: 'あきの「おつきみ」の ときに、よく おそなえする たべものは どれかな。',
    choices: ['だんご', 'ケーキ', 'かしわもち', 'ちまき'],
    answer: 'だんご',
    hints: ['まるくて しろい たべものだよ。', 'まんまるの おつきさまに にて いるね。'],
    explanation: 'おつきみでは、まんまるの つきに にた「だんご」や、すすきを そなえます。かしわもちや ちまきは こどもの ひに たべます。',
    inputForm: { question: 'あきの「おつきみ」の ときに、よく おそなえする たべものは なにかな。', acceptedAnswers: ['おだんご', '団子', 'つきみだんご', '月見団子'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g1_town_006', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'choice',
    question: 'まちの ひとが ほんを かりたり よんだり できる しせつは どれかな。',
    choices: ['としょかん', 'ゆうびんきょく', 'えき', 'こうばん'],
    answer: 'としょかん',
    hints: ['がっこうの としょしつより たくさん ほんが あるよ。', 'かりた ほんは きめられた ひまでに かえすよ。'],
    explanation: '「としょかん」では、まちの だれでも ほんを かりたり よんだり できます。',
    inputForm: { question: 'まちの ひとが ほんを かりたり よんだり できる しせつは なにかな。', acceptedAnswers: ['図書館'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g1_school_004', subject: 'social', gradeLevel: 1, unit: 'school',
    difficulty: 'standard', answerType: 'choice',
    question: 'きゅうしょくを たべる まえに かならず する ことは どれかな。',
    choices: ['せっけんで てを あらう', 'すなばで あそぶ', 'はしって ろうかを いく', 'くつを ぬいで そとへ でる'],
    answer: 'せっけんで てを あらう',
    hints: ['ばいきんを おとすよ。', 'たべる まえは、てを きれいに しよう。'],
    explanation: 'たべる まえには、せっけんで てを あらって ばいきんを おとします。',
    reviewed: true
  },
  {
    id: 'social_g1_event_006', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'advanced', answerType: 'input',
    question: '5がつ 5かの、こどもが げんきに そだつ ことを ねがう しゅくじつを なんと いうかな。ひらがなで かこう。',
    answer: 'こどものひ', acceptedAnswers: ['こどもの ひ', 'こどもの日', 'たんごのせっく', '端午の節句'], validationMode: 'kana-insensitive',
    hints: ['こいのぼりを かざったり、かしわもちを たべたり するよ。', '「こども」が つく なまえだよ。'],
    explanation: '5がつ 5かは「こどもの ひ（たんごの せっく）」です。こいのぼりや かぶとを かざって、こどもの せいちょうを いわいます。',
    reviewed: true
  },
  {
    id: 'social_g1_town_007', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'advanced', answerType: 'input',
    question: 'でんしゃに のる ために えきで かう、ちいさな かみを なんと いうかな。ひらがなで かこう。',
    answer: 'きっぷ', acceptedAnswers: ['切符', 'キップ'], validationMode: 'kana-insensitive',
    hints: ['かいさつを とおる ときに つかうよ。', 'いまは カードで のる ひとも おおいね。'],
    explanation: 'でんしゃに のる ときは、えきで「きっぷ」を かいます。のる ばしょと おりる ばしょで ねだんが かわります。',
    reviewed: true
  },
  {
    id: 'social_g1_town_008', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'advanced', answerType: 'choice',
    question: 'けがや きゅうな びょうきの ひとを はこぶ きゅうきゅうしゃが おいて ある ところは どこかな。',
    choices: ['しょうぼうしょ', 'けいさつしょ', 'ゆうびんきょく', 'えき'],
    answer: 'しょうぼうしょ',
    hints: ['119ばんに でんわを すると、きゅうきゅうしゃが くるね。', 'しょうぼうしゃと おなじ ところに あるよ。'],
    explanation: 'きゅうきゅうしゃは「しょうぼうしょ」に あります。119ばんに でんわを すると、しょうぼうしょから しょうぼうしゃや きゅうきゅうしゃが でて きます。',
    inputForm: { acceptedAnswers: ['消防署'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g1_event_007', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'advanced', answerType: 'choice',
    question: 'なつの「おぼん」の ころに、おおくの いえで する ことは どれかな。',
    choices: ['ごせんぞさまを むかえて、おはかまいりを する', 'まめを まいて おにを おいはらう', 'おひなさまを かざる', 'たんざくに ねがいごとを かく'],
    answer: 'ごせんぞさまを むかえて、おはかまいりを する',
    hints: ['なくなった かぞくや ごせんぞさまに かんけいの ある ぎょうじだよ。', 'まめまきは せつぶん、おひなさまは ひなまつりだね。'],
    explanation: 'おぼんには、ごせんぞさまを むかえて おまつりし、おはかまいりを する いえが おおいです。ぼんおどりを する ちいきも あります。',
    reviewed: true
  },

  // ===== Lv2（小学2年・生活科相当） =====
  {
    id: 'social_g2_town_001', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'basic', answerType: 'choice',
    question: 'まちで、やさいや さかな、おかしなどを かう ことが できる ところは どれかな。',
    choices: ['スーパーマーケット', 'としょかん', 'けいさつしょ', 'しょうぼうしょ'],
    answer: 'スーパーマーケット',
    hints: ['かいものを する ところだよ。', 'レジで おかねを はらうよ。'],
    explanation: 'スーパーマーケットでは、たべものや いろいろな ものを かう ことが できます。',
    inputForm: { question: 'まちで、やさいや さかな、おかしなどを かう ことが できる ところは どこかな。', acceptedAnswers: ['スーパー', 'スーパー マーケット'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g2_town_002', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'basic', answerType: 'input',
    question: 'てがみや はがきを だす ときに いれる、みちに ある あかい はこを なんと いうかな。かたかなで かこう。',
    answer: 'ポスト', validationMode: 'kana-insensitive',
    hints: ['ゆうびんきょくの ひとが なかの てがみを あつめに くるよ。', 'かたかな 3もじだよ。'],
    explanation: 'てがみや はがきは「ポスト」に いれると、ゆうびんきょくの ひとが とどけて くれます。',
    reviewed: true
  },
  {
    id: 'social_g2_event_001', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: 'はるが はじまる ひ（りっしゅん）の まえの ひに、「おには そと、ふくは うち」と いって まめを まく ぎょうじを なんと いうかな。ひらがなで かこう。',
    answer: 'せつぶん', acceptedAnswers: ['節分'], validationMode: 'kana-insensitive',
    hints: ['おにの おめんを つかう ことが あるよ。', '「せつ〇〇」だよ。'],
    explanation: 'りっしゅんの まえの ひ（2がつの はじめごろ）の「せつぶん」には、まめを まいて わるい ものを おいはらいます。',
    reviewed: true
  },
  {
    id: 'social_g2_town_003', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'でんしゃに のったり おりたり する ところを なんと いうかな。ひらがなで かこう。',
    answer: 'えき', acceptedAnswers: ['駅'], validationMode: 'kana-insensitive',
    hints: ['きっぷを かったり、かいさつを とおったり するよ。', 'ひらがな 2もじだよ。'],
    explanation: 'でんしゃに のったり おりたり する ところは「えき」です。',
    reviewed: true
  },
  {
    id: 'social_g2_event_002', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: '3がつ 3かに、おひなさまを かざって、おんなのこの せいちょうを いわう ぎょうじを なんと いうかな。ひらがなで かこう。',
    answer: 'ひなまつり', acceptedAnswers: ['ひな祭り', '雛祭り', 'もものせっく', '桃の節句'], validationMode: 'kana-insensitive',
    hints: ['ひしもちや ひなあられを たべるよ。', '「ひな〇〇〇」だよ。'],
    explanation: '3がつ 3かは「ひなまつり（もものせっく）」です。おひなさまを かざって、おんなのこの せいちょうを いわいます。',
    reviewed: true
  },
  {
    id: 'social_g2_safety_001', subject: 'social', gradeLevel: 2, unit: 'safety',
    difficulty: 'standard', answerType: 'choice',
    question: 'みちで、ひとが あるく ために くるまの みちと わけられて いる ところを なんと いうかな。',
    choices: ['ほどう', 'しゃどう', 'せんろ', 'かわら'],
    answer: 'ほどう',
    hints: ['「ほ」は あるく ことを あらわす ことばだよ。', 'くるまが はしる ところは「しゃどう」だよ。'],
    explanation: 'ひとが あるく ところは「ほどう」、くるまが はしる ところは「しゃどう」です。',
    inputForm: { acceptedAnswers: ['歩道'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g2_town_004', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'standard', answerType: 'choice',
    question: 'としょかんで ほんを かりたら、どう すれば よいかな。',
    choices: ['きめられた ひまでに かえす', 'ずっと じぶんの ものに する', 'ともだちに あげる', 'すきな ページを きりとる'],
    answer: 'きめられた ひまでに かえす',
    hints: ['としょかんの ほんは みんなの ものだよ。', 'つぎに よみたい ひとが まって いるかも しれないよ。'],
    explanation: 'としょかんの ほんは みんなの ものです。たいせつに よんで、きめられた ひまでに かえしましょう。',
    reviewed: true
  },
  {
    id: 'social_g2_event_003', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'advanced', answerType: 'input',
    question: '5がつ 5かの「こどもの ひ」に そとに かざる、さかなの かたちの のぼりを なんと いうかな。ひらがなで かこう。',
    answer: 'こいのぼり', acceptedAnswers: ['鯉のぼり'], validationMode: 'kana-insensitive',
    hints: ['かぜに のって そらを およぐように みえるよ。', '「こい」という さかなだよ。'],
    explanation: '「こどもの ひ」には、こどもが げんきに そだつように ねがって「こいのぼり」を かざります。',
    reviewed: true
  },
  {
    id: 'social_g2_map_001', subject: 'social', gradeLevel: 2, unit: 'map',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ちずでは、ふつう うえが どの ほうがくに なって いるかな。',
    choices: ['きた', 'みなみ', 'ひがし', 'にし'],
    answer: 'きた',
    hints: ['ほうがくは「きた・みなみ・ひがし・にし」の 4つだよ。', 'おひさまが のぼる ひがしは、ちずの みぎがわだよ。'],
    explanation: 'ちずは ふつう、うえが「きた」、したが みなみ、みぎが ひがし、ひだりが にしに なって います。',
    inputForm: { acceptedAnswers: ['北'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g2_town_005', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'basic', answerType: 'choice',
    question: 'びょうきや けがを した ときに、みて もらう ところは どれかな。',
    choices: ['びょういん', 'ぎんこう', 'こうえん', 'スーパーマーケット'],
    answer: 'びょういん',
    hints: ['おいしゃさんや かんごしさんが はたらいて いるよ。', 'くすりを もらう ことも あるよ。'],
    explanation: 'びょうきや けがの ときは「びょういん」で みて もらいます。',
    inputForm: { question: 'びょうきや けがを した ときに、みて もらう ところは どこかな。', acceptedAnswers: ['病院'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g2_safety_002', subject: 'social', gradeLevel: 2, unit: 'safety',
    difficulty: 'basic', answerType: 'choice',
    question: 'じてんしゃに のる とき、あたまを まもる ために かぶる ものは どれかな。',
    choices: ['ヘルメット', 'むぎわらぼうし', 'はちまき', 'マスク'],
    answer: 'ヘルメット',
    hints: ['かたくて じょうぶな ぼうしだよ。', 'ころんだ ときに あたまを うたないように まもるよ。'],
    explanation: 'じてんしゃに のる ときは「ヘルメット」を かぶって、あたまを まもりましょう。',
    inputForm: { question: 'じてんしゃに のる とき、あたまを まもる ために かぶる ものは なにかな。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g2_map_002', subject: 'social', gradeLevel: 2, unit: 'map',
    difficulty: 'basic', answerType: 'input',
    question: 'ちずでは、うえが「きた」です。では、したは どの ほうがくかな。ひらがなで かこう。',
    answer: 'みなみ', acceptedAnswers: ['南'], validationMode: 'kana-insensitive',
    hints: ['きたの はんたいの ほうがくだよ。', 'おひるに おひさまが ある ほうがくだよ。'],
    explanation: 'ちずの うえは きた、したは「みなみ」です。みぎは ひがし、ひだりは にしです。',
    reviewed: true
  },
  {
    id: 'social_g2_town_006', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'basic', answerType: 'input',
    question: 'まちで、みちを あるく ひとが バスを まつ ところを なんと いうかな。',
    answer: 'バスてい', acceptedAnswers: ['バス停', 'ばすてい', 'バスのりば', 'バス乗り場', 'ていりゅうじょ', '停留所', 'バスていりゅうじょ'], validationMode: 'kana-insensitive',
    hints: ['じこくひょうが かいて ある かんばんが たって いるよ。', '「バス○○」だよ。'],
    explanation: 'バスを まつ ところを「バスてい（ていりゅうじょ）」と いいます。じこくひょうを みると、バスが くる じかんが わかります。',
    reviewed: true
  },
  {
    id: 'social_g2_job_001', subject: 'social', gradeLevel: 2, unit: 'job',
    difficulty: 'standard', answerType: 'input',
    question: 'のうかの ひとが、やさいを そだてる ところを なんと いうかな。ひらがなで かこう。（こめを そだてる「たんぼ」では ないよ）',
    answer: 'はたけ', acceptedAnswers: ['畑', 'ハタケ'], validationMode: 'kana-insensitive',
    hints: ['つちを たがやして、うねを つくるよ。', 'ひらがな 3もじだよ。'],
    explanation: 'やさいを そだてる ところは「はたけ」です。こめは みずを はった「たんぼ（た）」で そだてます。',
    reviewed: true
  },
  {
    id: 'social_g2_town_007', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'おかねを あずけたり、ひきだしたり する ところを なんと いうかな。ひらがなで かこう。',
    answer: 'ぎんこう', acceptedAnswers: ['銀行'], validationMode: 'kana-insensitive',
    hints: ['ATM（エーティーエム）と いう きかいが あるよ。', '「ぎん」から はじまる ことばだよ。'],
    explanation: 'おかねを あずけたり ひきだしたり する ところは「ぎんこう」です。',
    reviewed: true
  },
  {
    id: 'social_g2_event_004', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: '12がつ 31にち、1ねんの さいごの ひを なんと いうかな。ひらがなで かこう。',
    answer: 'おおみそか', acceptedAnswers: ['大晦日', '大みそか'], validationMode: 'kana-insensitive',
    hints: ['としこしそばを たべる いえが おおいよ。', 'よるに じょやの かねが なるよ。'],
    explanation: '12がつ 31にちは「おおみそか」です。つぎの ひは 1がつ 1にち、おしょうがつです。',
    reviewed: true
  },
  {
    id: 'social_g2_map_003', subject: 'social', gradeLevel: 2, unit: 'map',
    difficulty: 'standard', answerType: 'input',
    question: 'ゆうがたに おひさまが しずんで いく ほうがくは どれかな。ひらがなで かこう。',
    answer: 'にし', acceptedAnswers: ['西'], validationMode: 'kana-insensitive',
    hints: ['おひさまは ひがしから のぼるね。', 'ひがしの はんたいの ほうがくだよ。'],
    explanation: 'おひさまは ひがしから のぼり、「にし」に しずみます。',
    reviewed: true
  },
  {
    id: 'social_g2_job_002', subject: 'social', gradeLevel: 2, unit: 'job',
    difficulty: 'standard', answerType: 'input',
    question: 'でんしゃを うごかして、おきゃくさんを はこぶ しごとの ひとを なんと いうかな。ひらがなで かこう。',
    answer: 'うんてんし', acceptedAnswers: ['運転士', 'うんてんしゅ', '運転手', 'うんてんしさん', 'うんてんしゅさん'], validationMode: 'kana-insensitive',
    hints: ['でんしゃの いちばん まえに のって いるよ。', '「うんてん○」だよ。'],
    explanation: 'でんしゃを うごかすのは「うんてんし」です。えきでは えきいんさんも はたらいて います。',
    reviewed: true
  },
  {
    id: 'social_g2_family_001', subject: 'social', gradeLevel: 2, unit: 'family',
    difficulty: 'standard', answerType: 'input',
    question: 'おとうさんや おかあさんの きょうだいで、おとこの ひとを なんと よぶかな。ひらがなで かこう。',
    answer: 'おじさん', acceptedAnswers: ['おじ', 'おじちゃん', '叔父', '伯父'], validationMode: 'kana-insensitive',
    hints: ['おんなの ひとなら「おばさん」だね。', 'おとうさんや おかあさんと おなじくらいの せだいの ひとだよ。'],
    explanation: 'おとうさんや おかあさんの きょうだいで、おとこの ひとは「おじさん」、おんなの ひとは「おばさん」です。',
    reviewed: true
  },
  {
    id: 'social_g2_safety_003', subject: 'social', gradeLevel: 2, unit: 'safety',
    difficulty: 'standard', answerType: 'choice',
    question: 'おうだんほどうを わたろうと したら、あおしんごうが ちかちか しはじめました。どう すれば よいかな。',
    choices: ['わたらずに、つぎの あおしんごうを まつ', 'いそいで はしって わたる', 'くるまに てを ふって とめる', 'めを つぶって わたる'],
    answer: 'わたらずに、つぎの あおしんごうを まつ',
    hints: ['ちかちかは「もうすぐ あかに なるよ」の あいずだよ。', 'とちゅうで あかに なると あぶないね。'],
    explanation: 'あおしんごうが ちかちか しはじめたら、わたりはじめずに つぎの あおしんごうを まちます。',
    reviewed: true
  },
  {
    id: 'social_g2_town_008', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'standard', answerType: 'choice',
    question: 'ゆうびんきょくで できる ことは どれかな。',
    choices: ['てがみや にもつを おくる', 'でんしゃに のる', 'ほんを かりる', 'けがを なおして もらう'],
    answer: 'てがみや にもつを おくる',
    hints: ['「〒」の マークが めじるしだよ。', 'ポストに いれた てがみを あつめて とどけるよ。'],
    explanation: 'ゆうびんきょくでは、てがみや にもつを おくる ことが できます。きってや はがきも うって います。',
    reviewed: true
  },
  {
    id: 'social_g2_event_005', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'standard', answerType: 'choice',
    question: 'いえじゅうを きれいに して あたらしい としを むかえる「おおそうじ」を する ことが おおいのは いつかな。',
    choices: ['12がつの おわり', '4がつの はじめ', '8がつの おわり', '5がつの はじめ'],
    answer: '12がつの おわり',
    hints: ['「あたらしい としを むかえる」じゅんびだよ。', 'おしょうがつの すこし まえだよ。'],
    explanation: '「おおそうじ」は、あたらしい としを きもちよく むかえる ために、12がつの おわりに する ことが おおいです。',
    reviewed: true
  },
  {
    id: 'social_g2_map_004', subject: 'social', gradeLevel: 2, unit: 'map',
    difficulty: 'standard', answerType: 'choice',
    question: 'ちずで、みぎがわは どの ほうがくかな。',
    choices: ['ひがし', 'にし', 'きた', 'みなみ'],
    answer: 'ひがし',
    hints: ['ちずの うえが きた、したが みなみだよ。', 'おひさまが のぼる ほうがくだよ。'],
    explanation: 'ちずでは、うえが きた、したが みなみ、みぎが「ひがし」、ひだりが にしです。',
    inputForm: { acceptedAnswers: ['東'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g2_town_009', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'advanced', answerType: 'input',
    question: 'かじの ときに、しょうぼうしゃが ホースを つないで みずを とる、みちに ある せつびを なんと いうかな。ひらがなで かこう。',
    answer: 'しょうかせん', acceptedAnswers: ['消火栓', 'しょうかせんの ふた'], validationMode: 'kana-insensitive',
    hints: ['みちの まんなかや はしに、まるい ふたや あかい はこが あるよ。', '「しょうか」は ひを けす ことだよ。'],
    explanation: 'かじの とき、しょうぼうしゃは「しょうかせん」に ホースを つないで みずを とります。',
    reviewed: true
  },
  {
    id: 'social_g2_event_006', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'advanced', answerType: 'input',
    question: '9がつの だい3げつようびに ある、おとしよりを たいせつに する しゅくじつを なんと いうかな。ひらがなで かこう。',
    answer: 'けいろうのひ', acceptedAnswers: ['けいろうの ひ', '敬老の日'], validationMode: 'kana-insensitive',
    hints: ['おじいさんや おばあさんに かんしゃする ひだよ。', '「けいろう」は、としよりを うやまう ことだよ。'],
    explanation: '9がつの だい3げつようびは「けいろうの ひ」です。ながく くらして きた おとしよりを うやまい、ながいきを いわいます。',
    reviewed: true
  },
  {
    id: 'social_g2_job_003', subject: 'social', gradeLevel: 2, unit: 'job',
    difficulty: 'advanced', answerType: 'choice',
    question: 'のうかの ひとが、おこめを そだてる ところは どれかな。',
    choices: ['たんぼ', 'はたけ', 'かだん', 'こうじょう'],
    answer: 'たんぼ',
    hints: ['はるに みずを はって、なえを うえるよ。', 'あきに いねかりを するよ。'],
    explanation: 'おこめは、みずを はった「たんぼ（た）」で そだてます。はるに たうえを して、あきに いねかりを します。',
    inputForm: { question: 'のうかの ひとが、おこめを そだてる ところは どこかな。', acceptedAnswers: ['田んぼ', '田', 'た', 'すいでん', '水田'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g2_town_010', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'advanced', answerType: 'choice',
    question: 'みんなが つかう こうえんや としょかん、じどうかんなどは、おもに だれが つくって いるかな。',
    choices: ['まち（しやくしょ）が、まちの ひとから あつめた おかねで つくる', 'ちかくに すむ こどもたちが つくる', 'おみせの ひとが うりものと して つくる', 'しぜんに できあがる'],
    answer: 'まち（しやくしょ）が、まちの ひとから あつめた おかねで つくる',
    hints: ['だれでも つかえる「こうきょう しせつ」と いうよ。', 'まちの しごとを する ところが しやくしょだよ。'],
    explanation: 'こうえんや としょかんなどの「こうきょう しせつ」は、まち（しやくしょ）が、みんなから あつめた おかね（ぜいきん）で つくって います。だから みんなで たいせつに つかいます。',
    reviewed: true
  },

  // ===== Lv3（小学3年） =====
  {
    id: 'social_g3_mapsymbol_001', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'basic', answerType: 'choice',
    question: '{地図記号|ちずきごう}の「文」は、{何|なに}を あらわして いるかな。',
    choices: ['{小|しょう}・{中学校|ちゅうがっこう}', '{図書館|としょかん}', '{病院|びょういん}', '{郵便局|ゆうびんきょく}'],
    answer: '{小|しょう}・{中学校|ちゅうがっこう}',
    hints: ['「{文|ぶん}」は、{勉強|べんきょう}に かんけいの ある {漢字|かんじ}だよ。', '{高校|こうこう}は「文」を まるで かこんだ {記号|きごう}だよ。'],
    explanation: '「文」の {地図記号|ちずきごう}は {小|しょう}・{中学校|ちゅうがっこう}を あらわします。',
    inputForm: { answer: '小・中学校', acceptedAnswers: ['小中学校', 'しょうちゅうがっこう', '学校', 'がっこう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_direction_001', subject: 'social', gradeLevel: 3, unit: 'direction',
    difficulty: 'basic', answerType: 'input',
    question: '{東|ひがし}・{西|にし}・{南|みなみ}・{北|きた}の うち、{太陽|たいよう}が のぼる {方位|ほうい}は どれかな。',
    answer: '東', acceptedAnswers: ['ひがし'], validationMode: 'kana-insensitive',
    hints: ['{太陽|たいよう}は {朝|あさ}に のぼって、{夕方|ゆうがた}に しずむよ。', '{地図|ちず}では {右|みぎ}がわの {方位|ほうい}だよ。'],
    explanation: '{太陽|たいよう}は「{東|ひがし}」から のぼり、{南|みなみ}の {空|そら}を {通|とお}って、{西|にし}に しずみます。',
    reviewed: true
  },
  {
    id: 'social_g3_direction_002', subject: 'social', gradeLevel: 3, unit: 'direction',
    difficulty: 'standard', answerType: 'input',
    question: '{八方位|はちほうい}で、{北|きた}と {東|ひがし}の ちょうど あいだの {方位|ほうい}を {何|なん}と いうかな。',
    answer: '北東', acceptedAnswers: ['ほくとう'], validationMode: 'kana-insensitive',
    hints: ['{北|きた}と {南|みなみ}を {先|さき}に {言|い}う きまりが あるよ。', '「{北|きた}」＋「{東|ひがし}」だよ。'],
    explanation: '{北|きた}と {東|ひがし}の あいだは「{北東|ほくとう}」です。{八方位|はちほうい}は {北|きた}・{北東|ほくとう}・{東|ひがし}・{南東|なんとう}・{南|みなみ}・{南西|なんせい}・{西|にし}・{北西|ほくせい}です。',
    reviewed: true
  },
  {
    id: 'social_g3_mapsymbol_002', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'standard', answerType: 'input',
    question: '{地図記号|ちずきごう}の「卍」は、どんな {建物|たてもの}を あらわして いるかな。ひらがなで {答|こた}えよう。',
    answer: 'てら', acceptedAnswers: ['寺', 'おてら', 'お寺', 'じいん', '寺院'], validationMode: 'kana-insensitive',
    hints: ['お{坊|ぼう}さんが いる ところだよ。', '{神社|じんじゃ}の {記号|きごう}は {鳥居|とりい}の {形|かたち}。こちらは…？'],
    explanation: '「卍」は「{寺|てら}（{寺院|じいん}）」の {地図記号|ちずきごう}です。{神社|じんじゃ}は {鳥居|とりい}の {形|かたち}の {記号|きごう}です。',
    reviewed: true
  },
  {
    id: 'social_g3_store_001', subject: 'social', gradeLevel: 3, unit: 'store',
    difficulty: 'standard', answerType: 'input',
    question: 'スーパーマーケットで、{商品|しょうひん}の バーコードを {読|よ}み{取|と}って ねだんを {計算|けいさん}し、お{金|かね}を はらう ところを {何|なん}と いうかな。カタカナで {答|こた}えよう。',
    answer: 'レジ', acceptedAnswers: ['レジスター'], validationMode: 'kana-insensitive',
    hints: ['{買|か}い{物|もの}の {最後|さいご}に ならぶ ところだよ。', 'カタカナ 2{文字|もじ}だよ。'],
    explanation: 'ねだんを {計算|けいさん}して お{金|かね}を はらう ところを「レジ」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g3_mapsymbol_003', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'standard', answerType: 'choice',
    question: '「Y」のような {形|かたち}の {地図記号|ちずきごう}は、{何|なに}を あらわして いるかな。',
    choices: ['{消防署|しょうぼうしょ}', '{警察署|けいさつしょ}', '{工場|こうじょう}', '{発電所|はつでんしょ}'],
    answer: '{消防署|しょうぼうしょ}',
    hints: ['{昔|むかし}、{火|ひ}を {消|け}すときに {使|つか}った「さすまた」という {道具|どうぐ}の {形|かたち}だよ。', '{火事|かじ}の ときに かけつける ところだよ。'],
    explanation: '「Y」の {形|かたち}は、{昔|むかし}の {火消|ひけ}しの {道具|どうぐ}「さすまた」を もとに した {消防署|しょうぼうしょ}の {地図記号|ちずきごう}です。',
    inputForm: { acceptedAnswers: ['しょうぼうしょ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_history_001', subject: 'social', gradeLevel: 3, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{昔|むかし}の くらしで、{洗濯|せんたく}を するときに {使|つか}われて いた {道具|どうぐ}は どれかな。',
    choices: ['せんたく{板|いた}', '{七輪|しちりん}', '{湯|ゆ}たんぽ', 'かまど'],
    answer: 'せんたく{板|いた}',
    hints: ['{表面|ひょうめん}が でこぼこに なって いる {板|いた}だよ。', '{七輪|しちりん}や かまどは {料理|りょうり}に、{湯|ゆ}たんぽは {体|からだ}を あたためるのに {使|つか}ったよ。'],
    explanation: 'せんたく{板|いた}の でこぼこに {衣類|いるい}を こすりつけて、{手|て}で {洗濯|せんたく}を して いました。',
    inputForm: { question: '{昔|むかし}の くらしで、{洗濯|せんたく}を するときに {使|つか}われて いた 道具は 何かな。', acceptedAnswers: ['せんたくいた', '洗濯板'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_tax_001', subject: 'social', gradeLevel: 3, unit: 'tax',
    difficulty: 'advanced', answerType: 'input',
    question: 'お{店|みせ}で {品物|しなもの}を {買|か}うときに、{品物|しなもの}の ねだんに {上乗|うわの}せして はらう {税金|ぜいきん}を {何|なん}と いうかな。',
    answer: '消費税', acceptedAnswers: ['しょうひぜい'], validationMode: 'kana-insensitive',
    hints: ['レシートに「{税|ぜい}」と {書|か}かれて いる ことが あるよ。', 'ものを「{使|つか}う」「{買|か}う」ことを {漢字|かんじ} 2{文字|もじ}で「しょうひ」と いうよ。'],
    explanation: '{品物|しなもの}を {買|か}うときに はらう {税金|ぜいきん}を「{消費税|しょうひぜい}」と いいます。{集|あつ}めた {税金|ぜいきん}は、{学校|がっこう}や {道路|どうろ}など みんなの ために {使|つか}われます。',
    reviewed: true
  },
  {
    id: 'social_g3_mapsymbol_004', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'advanced', answerType: 'choice',
    question: '{地図記号|ちずきごう}の「〒」を まるで かこんだ {記号|きごう}は、{何|なに}を あらわして いるかな。',
    choices: ['{郵便局|ゆうびんきょく}', '{銀行|ぎんこう}', '{市役所|しやくしょ}', '{神社|じんじゃ}'],
    answer: '{郵便局|ゆうびんきょく}',
    hints: ['「〒」は {郵便番号|ゆうびんばんごう}の {前|まえ}に {書|か}く {記号|きごう}だね。', '{手紙|てがみ}や {荷物|にもつ}を {届|とど}ける {仕事|しごと}を する ところだよ。'],
    explanation: '「〒」を まるで かこんだ {記号|きごう}は {郵便局|ゆうびんきょく}です。',
    inputForm: { acceptedAnswers: ['ゆうびんきょく'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g3_mapsymbol_005', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'basic', answerType: 'choice',
    question: '{神社|じんじゃ}の {地図記号|ちずきごう}は、{何|なに}の {形|かたち}を もとに して いるかな。',
    choices: ['{鳥居|とりい}', 'お{寺|てら}の {屋根|やね}', 'さすまた', '{木|き}'],
    answer: '{鳥居|とりい}',
    hints: ['{神社|じんじゃ}の {入|い}り{口|ぐち}に {立|た}って いる、{赤|あか}い ことが {多|おお}い {門|もん}だよ。', 'さすまたは {消防署|しょうぼうしょ}の {記号|きごう}の もとだね。'],
    explanation: '{神社|じんじゃ}の {地図記号|ちずきごう}は、{入|い}り{口|ぐち}に ある「{鳥居|とりい}」の {形|かたち}です。お{寺|てら}は「卍」で {表|あらわ}します。',
    inputForm: { acceptedAnswers: ['とりい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_safety_001', subject: 'social', gradeLevel: 3, unit: 'safety',
    difficulty: 'basic', answerType: 'choice',
    question: '{町|まち}の {交番|こうばん}で はたらき、{道|みち}あんないや パトロールを して いる {人|ひと}は だれかな。',
    choices: ['{警察官|けいさつかん}', '{消防士|しょうぼうし}', '{郵便局|ゆうびんきょく}の {人|ひと}', 'お{店|みせ}の {人|ひと}'],
    answer: '{警察官|けいさつかん}',
    hints: ['{事故|じこ}や {事件|じけん}の ときに かけつけるよ。', '110{番|ばん}に {電話|でんわ}すると {連絡|れんらく}が いくよ。'],
    explanation: '{交番|こうばん}では {警察官|けいさつかん}が はたらき、{道|みち}あんないや パトロールなどで {町|まち}の {安全|あんぜん}を {守|まも}って います。',
    inputForm: { acceptedAnswers: ['けいさつかん', 'おまわりさん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_mapsymbol_006', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'basic', answerType: 'input',
    question: '{地図記号|ちずきごう}で、{縦|たて}の {線|せん}が 2{本|ほん} ならんだ「∥」のような {形|かたち}は、どんな {土地|とち}を {表|あらわ}すかな。ひらがなで {答|こた}えよう。',
    answer: 'たんぼ', acceptedAnswers: ['た', '田', '田んぼ', 'すいでん', '水田'], validationMode: 'kana-insensitive',
    hints: ['いねを かり{取|と}った あとの {切|き}り{株|かぶ}の {形|かたち}から できたよ。', 'お{米|こめ}を {育|そだ}てる {土地|とち}だよ。'],
    explanation: '「∥」の {形|かたち}は「{田|た}（たんぼ）」の {地図記号|ちずきごう}です。いねを かった あとの {切|き}り{株|かぶ}の {形|かたち}から できました。',
    reviewed: true
  },
  {
    id: 'social_g3_farm_001', subject: 'social', gradeLevel: 3, unit: 'farm',
    difficulty: 'basic', answerType: 'input',
    question: 'スーパーマーケットの {野菜|やさい}の ねふだに {書|か}かれて いる、その {野菜|やさい}が つくられた {場所|ばしょ}の ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'さんち', acceptedAnswers: ['産地'], validationMode: 'kana-insensitive',
    hints: ['「○○{県|けん}{産|さん}」のように {書|か}かれて いるよ。', '「さん」から はじまる 3{文字|もじ}の ことばだよ。'],
    explanation: 'ものが つくられた {場所|ばしょ}を「{産地|さんち}」と いいます。ねふだや だんボールを {見|み}ると、{野菜|やさい}の {産地|さんち}が わかります。',
    reviewed: true
  },
  {
    id: 'social_g3_store_002', subject: 'social', gradeLevel: 3, unit: 'store',
    difficulty: 'standard', answerType: 'input',
    question: 'お{店|みせ}が、{安|やす}い {品物|しなもの}や おすすめの {品物|しなもの}を {知|し}らせる ために {配|くば}る {紙|かみ}を {何|なん}と いうかな。カタカナで {答|こた}えよう。',
    answer: 'チラシ', acceptedAnswers: ['ちらし'], validationMode: 'kana-insensitive',
    hints: ['{新聞|しんぶん}に はさまって いる ことが {多|おお}いよ。', 'カタカナ 3{文字|もじ}だよ。'],
    explanation: 'お{店|みせ}は「チラシ」を {配|くば}って、{安|やす}い {品物|しなもの}などを お{客|きゃく}さんに {知|し}らせます。',
    reviewed: true
  },
  {
    id: 'social_g3_farm_002', subject: 'social', gradeLevel: 3, unit: 'farm',
    difficulty: 'standard', answerType: 'input',
    question: 'ビニールで おおって {中|なか}を あたたかく し、{寒|さむ}い {時期|じき}でも {野菜|やさい}を {育|そだ}てられるように した {建物|たてもの}を {何|なん}と いうかな。カタカナで {答|こた}えよう。',
    answer: 'ビニールハウス', acceptedAnswers: ['ハウス', 'びにーるはうす'], validationMode: 'kana-insensitive',
    hints: ['{英語|えいご}で「{家|いえ}」を {意味|いみ}する ことばが つくよ。', '「ビニール○○○」だよ。'],
    explanation: '「ビニールハウス」を {使|つか}うと、{中|なか}の {温度|おんど}を {調節|ちょうせつ}して、{季節|きせつ}に かかわらず {野菜|やさい}を {育|そだ}てる ことが できます。',
    reviewed: true
  },
  {
    id: 'social_g3_factory_001', subject: 'social', gradeLevel: 3, unit: 'factory',
    difficulty: 'standard', answerType: 'input',
    question: '{工場|こうじょう}で、{原料|げんりょう}を {使|つか}って つくられた {品物|しなもの}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'せいひん', acceptedAnswers: ['製品'], validationMode: 'kana-insensitive',
    hints: ['{原料|げんりょう}（もとに なる もの）→ {工場|こうじょう} → ？', '「せい」から はじまる ことばだよ。'],
    explanation: '{工場|こうじょう}で {原料|げんりょう}から つくられた {品物|しなもの}を「{製品|せいひん}」と いいます。{製品|せいひん}は トラックなどで お{店|みせ}へ {運|はこ}ばれます。',
    reviewed: true
  },
  {
    id: 'social_g3_safety_002', subject: 'social', gradeLevel: 3, unit: 'safety',
    difficulty: 'standard', answerType: 'input',
    question: 'ふだんは ほかの {仕事|しごと}を しながら、{火事|かじ}や {災害|さいがい}の ときに {消防署|しょうぼうしょ}と {協力|きょうりょく}して かつやくする、{地域|ちいき}の {人|ひと}たちの {組織|そしき}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'しょうぼうだん', acceptedAnswers: ['消防団'], validationMode: 'kana-insensitive',
    hints: ['{地域|ちいき}の {人|ひと}たちが {自分|じぶん}たちの {町|まち}を {守|まも}る {組織|そしき}だよ。', '「しょうぼう」の あとに {漢字|かんじ} 1{文字|もじ}が つくよ。'],
    explanation: '「{消防団|しょうぼうだん}」は {地域|ちいき}の {人|ひと}たちで つくる {組織|そしき}で、{火事|かじ}や {災害|さいがい}の ときに {消防署|しょうぼうしょ}と {協力|きょうりょく}して {町|まち}を {守|まも}ります。',
    reviewed: true
  },
  {
    id: 'social_g3_history_002', subject: 'social', gradeLevel: 3, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{昔|むかし}の {台所|だいどころ}で、まきを {燃|も}やして ごはんを たいたり、にものを つくったり した せつびを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'かまど', acceptedAnswers: ['竈', 'へっつい'], validationMode: 'kana-insensitive',
    hints: ['{土|つち}や {石|いし}で つくられ、{上|うえ}に おかまを のせたよ。', 'ひらがな 3{文字|もじ}だよ。'],
    explanation: '「かまど」は まきを {燃|も}やして {料理|りょうり}を する せつびです。{今|いま}は ガスコンロや すいはんきを {使|つか}う {家|いえ}が ほとんどです。',
    reviewed: true
  },
  {
    id: 'social_g3_direction_003', subject: 'social', gradeLevel: 3, unit: 'direction',
    difficulty: 'standard', answerType: 'input',
    question: '{八方位|はちほうい}で、{南|みなみ}と {西|にし}の ちょうど あいだの {方位|ほうい}を {何|なん}と いうかな。',
    answer: '南西', acceptedAnswers: ['なんせい'], validationMode: 'kana-insensitive',
    hints: ['{北|きた}か {南|みなみ}を {先|さき}に {言|い}う きまりが あるよ。', '「{南|みなみ}」＋「{西|にし}」だよ。'],
    explanation: '{南|みなみ}と {西|にし}の あいだは「{南西|なんせい}」です。{北|きた}と {南|みなみ}を {先|さき}に {言|い}うので、「{西南|せいなん}」とは いいません。',
    reviewed: true
  },
  {
    id: 'social_g3_mapsymbol_007', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'standard', answerType: 'choice',
    question: '{工場|こうじょう}の {地図記号|ちずきごう}は、{何|なに}の {形|かたち}を もとに して いるかな。',
    choices: ['{機械|きかい}の {歯車|はぐるま}', '{鳥居|とりい}', '{本|ほん}', '{木|き}の {葉|は}'],
    answer: '{機械|きかい}の {歯車|はぐるま}',
    hints: ['{工場|こうじょう}では {機械|きかい}を {使|つか}って {製品|せいひん}を つくるね。', '{機械|きかい}の {中|なか}で かみ{合|あ}って {回|まわ}る {部品|ぶひん}だよ。'],
    explanation: '{工場|こうじょう}の {地図記号|ちずきごう}は、{機械|きかい}の「{歯車|はぐるま}」の {形|かたち}を もとに して います。',
    inputForm: { answer: '歯車', acceptedAnswers: ['はぐるま', '機械の歯車', 'きかいのはぐるま', '機械の 歯車'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_store_003', subject: 'social', gradeLevel: 3, unit: 'store',
    difficulty: 'standard', answerType: 'choice',
    question: 'スーパーマーケットが、お{客|きゃく}さんが {買|か}い{物|もの}を しやすいように して いる くふうは どれかな。',
    choices: ['{品物|しなもの}の しゅるいごとに {売|う}り{場|ば}を {分|わ}け、かんばんで {知|し}らせる', '{品物|しなもの}を どこに ある か わからないように する', 'お{店|みせ}を {開|あ}けて いる {時間|じかん}を {毎日|まいにち} {変|か}える', 'ねだんを {書|か}かないで {売|う}る'],
    answer: '{品物|しなもの}の しゅるいごとに {売|う}り{場|ば}を {分|わ}け、かんばんで {知|し}らせる',
    hints: ['お{客|きゃく}さんが {品物|しなもの}を さがしやすく なる くふうを {考|かんが}えよう。', '{天井|てんじょう}から「{野菜|やさい}」「お{肉|にく}」などの かんばんが さがって いるね。'],
    explanation: 'スーパーマーケットでは、{品物|しなもの}の しゅるいごとに {売|う}り{場|ば}を {分|わ}け、かんばんで {知|し}らせて、お{客|きゃく}さんが さがしやすいように くふうして います。',
    reviewed: true
  },
  {
    id: 'social_g3_farm_003', subject: 'social', gradeLevel: 3, unit: 'farm',
    difficulty: 'standard', answerType: 'choice',
    question: '{農家|のうか}で とれた {野菜|やさい}の {多|おお}くは、どこを {通|とお}って お{店|みせ}に とどくかな。',
    choices: ['{市場|いちば}（おろし{売|う}り{市場|しじょう}）', '{消防署|しょうぼうしょ}', '{図書館|としょかん}', '{交番|こうばん}'],
    answer: '{市場|いちば}（おろし{売|う}り{市場|しじょう}）',
    hints: ['たくさんの {野菜|やさい}や くだものが {集|あつ}まって、せりで ねだんが {決|き}まる ところだよ。', 'お{店|みせ}の {人|ひと}が {朝早|あさはや}く {買|か}いに {行|い}くよ。'],
    explanation: '{農家|のうか}で とれた {野菜|やさい}の {多|おお}くは、{市場|いちば}（おろし{売|う}り{市場|しじょう}）に {集|あつ}められ、そこから お{店|みせ}に とどけられます。{農家|のうか}が {直接|ちょくせつ} {売|う}る {直売所|ちょくばいじょ}も あります。',
    inputForm: { answer: '市場', acceptedAnswers: ['いちば', 'しじょう', 'おろし売り市場', 'おろしうりしじょう', '卸売市場', 'おろしうりいちば'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_history_003', subject: 'social', gradeLevel: 3, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: 'せんたく{板|いた}と たらいに かわって、{家|いえ}の せんたくを らくに した {道具|どうぐ}は どれかな。',
    choices: ['{電気|でんき}せんたく{機|き}', 'かまど', '{七輪|しちりん}', 'いろり'],
    answer: '{電気|でんき}せんたく{機|き}',
    hints: ['{電気|でんき}の ちからで {動|うご}く {道具|どうぐ}だよ。', 'かまど・{七輪|しちりん}・いろりは、{火|ひ}を {使|つか}う {道具|どうぐ}だね。'],
    explanation: '{電気|でんき}せんたく{機|き}が {広|ひろ}まって、{手|て}で こすって あらう せんたくの {手間|てま}が へり、くらしが {大|おお}きく {変|か}わりました。',
    inputForm: { question: 'せんたく{板|いた}と たらいに かわって、{家|いえ}の せんたくを らくに した 道具は 何かな。', answer: '電気せんたく機', acceptedAnswers: ['でんきせんたくき', '電気洗濯機', 'せんたく機', 'せんたくき', '洗濯機'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g3_mapsymbol_008', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'advanced', answerType: 'input',
    question: '{地図記号|ちずきごう}の「♨」は、{何|なに}を {表|あらわ}して いるかな。ひらがなで {答|こた}えよう。',
    answer: 'おんせん', acceptedAnswers: ['温泉'], validationMode: 'kana-insensitive',
    hints: ['{地面|じめん}の {下|した}から わき{出|で}る お{湯|ゆ}だよ。', 'ゆげが {立|た}ちのぼって いる {形|かたち}だよ。'],
    explanation: '「♨」は「{温泉|おんせん}」の {地図記号|ちずきごう}です。お{湯|ゆ}から ゆげが {立|た}ちのぼる ようすを {表|あらわ}して います。',
    reviewed: true
  },
  {
    id: 'social_g3_history_004', subject: 'social', gradeLevel: 3, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '{昔|むかし}の {家|いえ}で、{部屋|へや}の {床|ゆか}を {四角|しかく}く {切|き}って {火|ひ}を たき、だんを とったり {料理|りょうり}を したり した ところを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'いろり', acceptedAnswers: ['囲炉裏'], validationMode: 'kana-insensitive',
    hints: ['{上|うえ}から なべを つるして にものを つくったよ。', 'まわりに {家族|かぞく}が {集|あつ}まって {話|はな}を したよ。'],
    explanation: '「いろり」は {床|ゆか}を {四角|しかく}く {切|き}って {火|ひ}を たく ところで、だんを とったり {料理|りょうり}を したり、{明|あ}かりに したり しました。',
    reviewed: true
  },
  {
    id: 'social_g3_factory_002', subject: 'social', gradeLevel: 3, unit: 'factory',
    difficulty: 'advanced', answerType: 'choice',
    question: 'おかしを つくる {工場|こうじょう}で、はたらく {人|ひと}が {白|しろ}い {服|ふく}や ぼうし、マスクを {身|み}に つけて いるのは なぜかな。',
    choices: ['{食|た}べ{物|もの}に かみの{毛|け}や よごれが {入|はい}らないように するため', 'おそろいの {服|ふく}で {写真|しゃしん}を とるため', '{寒|さむ}さを ふせぐため', '{工場|こうじょう}の {中|なか}を {明|あか}るく するため'],
    answer: '{食|た}べ{物|もの}に かみの{毛|け}や よごれが {入|はい}らないように するため',
    hints: ['{食|た}べ{物|もの}を つくる {工場|こうじょう}で、いちばん {気|き}を つけて いる ことは {何|なに}かな。', '{工場|こうじょう}に {入|はい}る {前|まえ}には、エアシャワーで ほこりを とばす ことも あるよ。'],
    explanation: '{食|た}べ{物|もの}を つくる {工場|こうじょう}では、せいけつに する ことが とても {大切|たいせつ}です。{白|しろ}い {服|ふく}や ぼうしで、かみの{毛|け}や よごれが {入|はい}らないように して います。',
    reviewed: true
  },
  {
    id: 'social_g3_land_001', subject: 'social', gradeLevel: 3, unit: 'land',
    difficulty: 'advanced', answerType: 'choice',
    question: '{市|し}の {土地|とち}の {使|つか}われ{方|かた}を {調|しら}べました。{駅|えき}の まわりに {多|おお}く {見|み}られる ようすは どれかな。',
    choices: ['お{店|みせ}や {会社|かいしゃ}の たてものが {多|おお}く、{人|ひと}が たくさん {集|あつ}まる', '{田|た}や {畑|はたけ}が {広|ひろ}がって いる', '{森|もり}や {林|はやし}が {広|ひろ}がって いる', '{人|ひと}が ほとんど いない'],
    answer: 'お{店|みせ}や {会社|かいしゃ}の たてものが {多|おお}く、{人|ひと}が たくさん {集|あつ}まる',
    hints: ['{駅|えき}には、たくさんの {人|ひと}が {電車|でんしゃ}で {集|あつ}まって くるね。', '{人|ひと}が {多|おお}い ところには、どんな たてものが できるかな。'],
    explanation: '{駅|えき}の まわりには {人|ひと}が たくさん {集|あつ}まるので、お{店|みせ}や {会社|かいしゃ}の たてものが {多|おお}く なります。{田|た}や {畑|はたけ}は、{市|し}の はずれに {広|ひろ}がって いる ことが {多|おお}いです。',
    reviewed: true
  },

  // ===== Lv4（小学4年） =====
  {
    id: 'social_g4_prefecture_001', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'basic', answerType: 'choice',
    question: '{日本|にほん}の {都道府県|とどうふけん}は、ぜんぶで いくつ あるかな。',
    choices: ['47', '43', '50', '38'],
    answer: '47',
    hints: ['1{都|と}・1{道|どう}・2{府|ふ}と、{県|けん}が 43 あるよ。', '1＋1＋2＋43 を {計算|けいさん}しよう。'],
    explanation: '{東京都|とうきょうと}（1{都|と}）、{北海道|ほっかいどう}（1{道|どう}）、{大阪府|おおさかふ}・{京都府|きょうとふ}（2{府|ふ}）と 43{県|けん}で、あわせて 47です。',
    inputForm: { acceptedAnswers: ['47こ', '47個'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_002', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'basic', answerType: 'input',
    question: '{日本|にほん}の {都道府県|とどうふけん}で、{面積|めんせき}が いちばん {大|おお}きいのは どこかな。',
    answer: '北海道', acceptedAnswers: ['ほっかいどう'], validationMode: 'kana-insensitive',
    hints: ['{日本|にほん}の いちばん {北|きた}に ある {都道府県|とどうふけん}だよ。', '{都|と}・{道|どう}・{府|ふ}・{県|けん}の うち、「{道|どう}」は ここ だけだよ。'],
    explanation: '{面積|めんせき}が いちばん {大|おお}きいのは「{北海道|ほっかいどう}」で、{日本|にほん}の {面積|めんせき}の {約|やく}5{分|ぶん}の1を しめます。',
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_003', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'standard', answerType: 'input',
    question: '{愛知県|あいちけん}の {県庁所在地|けんちょうしょざいち}（{県庁|けんちょう}の ある {市|し}）は どこかな。',
    answer: '名古屋市', acceptedAnswers: ['名古屋', 'なごや', 'なごやし'], validationMode: 'kana-insensitive',
    hints: ['{中部地方|ちゅうぶちほう}で いちばん {人口|じんこう}が {多|おお}い {市|し}だよ。', '「しゃちほこ」で {有名|ゆうめい}な お{城|しろ}が あるよ。'],
    explanation: '{愛知県|あいちけん}の {県庁所在地|けんちょうしょざいち}は「{名古屋市|なごやし}」です。{県名|けんめい}と {県庁所在地|けんちょうしょざいち}の {名前|なまえ}が ちがう {県|けん}の 1つです。',
    reviewed: true
  },
  {
    id: 'social_g4_water_001', subject: 'social', gradeLevel: 4, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: '{川|かわ}や ダムの {水|みず}を きれいに して、{飲|の}める {水|みず}に する {施設|しせつ}を {何|なん}と いうかな。',
    answer: '浄水場', acceptedAnswers: ['じょうすいじょう'], validationMode: 'kana-insensitive',
    hints: ['「きれいに する」という {意味|いみ}の「じょう」が つくよ。', 'よごれた {水|みず}を きれいに して {川|かわ}に もどす {施設|しせつ}は「{下水処理場|げすいしょりじょう}」だよ。'],
    explanation: '{水|みず}を きれいに して {飲|の}める {水|みず}に する {施設|しせつ}は「{浄水場|じょうすいじょう}」です。',
    reviewed: true
  },
  {
    id: 'social_g4_garbage_001', subject: 'social', gradeLevel: 4, unit: 'garbage',
    difficulty: 'standard', answerType: 'input',
    question: 'ペットボトルや かんなどを {資源|しげん}として {集|あつ}め、もう{一度|いちど} {原料|げんりょう}に して {利用|りよう}する ことを {何|なん}と いうかな。カタカナで {答|こた}えよう。',
    answer: 'リサイクル', validationMode: 'kana-insensitive',
    hints: ['「ごみを へらす 3R」の 1つだよ。', '「リ」から はじまる ことばだよ。'],
    explanation: '{資源|しげん}を {原料|げんりょう}に もどして {再|ふたた}び {利用|りよう}する ことを「リサイクル」と いいます。ごみを へらす 3Rは、リデュース（へらす）・リユース（くり{返|かえ}し {使|つか}う）・リサイクルです。',
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_004', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'standard', answerType: 'choice',
    question: '{日本|にほん}の {都道府県|とどうふけん}で、{面積|めんせき}が いちばん {小|ちい}さいのは どこかな。',
    choices: ['{香川県|かがわけん}', '{大阪府|おおさかふ}', '{東京都|とうきょうと}', '{沖縄県|おきなわけん}'],
    answer: '{香川県|かがわけん}',
    hints: ['{四国|しこく}{地方|ちほう}に ある {県|けん}だよ。', 'うどんで {有名|ゆうめい}な {県|けん}だよ。'],
    explanation: '{面積|めんせき}が いちばん {小|ちい}さいのは {四国|しこく}の「{香川県|かがわけん}」です。2{番目|ばんめ}に {小|ちい}さいのは {大阪府|おおさかふ}です。',
    inputForm: { acceptedAnswers: ['かがわけん', '香川', 'かがわ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g4_disaster_001', subject: 'social', gradeLevel: 4, unit: 'disaster',
    difficulty: 'standard', answerType: 'choice',
    question: '{地震|じしん}や {大雨|おおあめ}などの {災害|さいがい}に そなえて、{危険|きけん}な {場所|ばしょ}や ひなん{場所|ばしょ}を しめした {地図|ちず}を {何|なん}と いうかな。',
    choices: ['ハザードマップ', 'ガイドマップ', '{路線図|ろせんず}', '{天気図|てんきず}'],
    answer: 'ハザードマップ',
    hints: ['「ハザード」は {英語|えいご}で「{危険|きけん}」という {意味|いみ}だよ。', '{市|し}や {町|まち}が つくって、{家|いえ}に くばって いる ことが {多|おお}いよ。'],
    explanation: '{災害|さいがい}の ときの {危険|きけん}な {場所|ばしょ}や ひなん{場所|ばしょ}を しめした {地図|ちず}を「ハザードマップ」と いいます。',
    inputForm: { acceptedAnswers: ['ハザード マップ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g4_geography_001', subject: 'social', gradeLevel: 4, unit: 'geography',
    difficulty: 'advanced', answerType: 'input',
    question: '{日本|にほん}で いちばん {長|なが}い {川|かわ}は {何|なん}という {川|かわ}かな。',
    answer: '信濃川', acceptedAnswers: ['しなのがわ', '信濃'], validationMode: 'kana-insensitive',
    hints: ['{長野県|ながのけん}から {新潟県|にいがたけん}を {流|なが}れて、{日本海|にほんかい}に そそぐよ。', '{長野県|ながのけん}の {昔|むかし}の {国|くに}の {名前|なまえ}「しなの」が ついて いるよ。'],
    explanation: '{日本|にほん}で いちばん {長|なが}い {川|かわ}は「{信濃川|しなのがわ}」（{約|やく}367km）です。{長野県|ながのけん}では「{千曲川|ちくまがわ}」と よばれます。',
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_005', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'advanced', answerType: 'choice',
    question: '{次|つぎ}の うち、{海|うみ}に {面|めん}して いない {県|けん}は どれかな。',
    choices: ['{奈良県|ならけん}', '{和歌山県|わかやまけん}', '{三重県|みえけん}', '{京都府|きょうとふ}'],
    answer: '{奈良県|ならけん}',
    hints: ['{近畿地方|きんきちほう}の {内陸|ないりく}に ある {県|けん}だよ。', '{大仏|だいぶつ}や しかで {有名|ゆうめい}な {県|けん}だよ。'],
    explanation: '{奈良県|ならけん}は {海|うみ}に {面|めん}して いない {内陸県|ないりくけん}です。{京都府|きょうとふ}は {北|きた}がわが {日本海|にほんかい}に {面|めん}して います。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g4_prefecture_006', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'basic', answerType: 'choice',
    question: '{都道府県|とどうふけん}の うち、「{府|ふ}」が つくのは どれかな。',
    choices: ['{大阪府|おおさかふ}と {京都府|きょうとふ}', '{東京|とうきょう}と {大阪|おおさか}', '{京都|きょうと}と {奈良|なら}', '{北海道|ほっかいどう}と {沖縄|おきなわ}'],
    answer: '{大阪府|おおさかふ}と {京都府|きょうとふ}',
    hints: ['「{府|ふ}」は 2つ あるよ。', 'どちらも {近畿地方|きんきちほう}に あるよ。'],
    explanation: '「{府|ふ}」は {大阪府|おおさかふ}と {京都府|きょうとふ}の 2つです。「{都|と}」は {東京都|とうきょうと}、「{道|どう}」は {北海道|ほっかいどう}です。',
    reviewed: true
  },
  {
    id: 'social_g4_water_002', subject: 'social', gradeLevel: 4, unit: 'water',
    difficulty: 'basic', answerType: 'choice',
    question: '{川|かわ}の {上流|じょうりゅう}に つくられ、{雨|あめ}の {水|みず}を ためて {流|なが}す {水|みず}の {量|りょう}を {調整|ちょうせい}する しせつは どれかな。',
    choices: ['ダム', '{浄水場|じょうすいじょう}', '{下水処理場|げすいしょりじょう}', '{清掃工場|せいそうこうじょう}'],
    answer: 'ダム',
    hints: ['{山|やま}の {中|なか}に ある、{大|おお}きな コンクリートの かべだよ。', '{水|みず}が {足|た}りない ときに そなえて {水|みず}を ためて おくよ。'],
    explanation: '「ダム」は {川|かわ}の {水|みず}を ためて、{水|みず}が {足|た}りない ときに {流|なが}したり、{大雨|おおあめ}の ときに {流|なが}す {量|りょう}を おさえたり します。',
    inputForm: { question: '{川|かわ}の {上流|じょうりゅう}に つくられ、{雨|あめ}の {水|みず}を ためて {流|なが}す {水|みず}の {量|りょう}を {調整|ちょうせい}する しせつは 何かな。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_007', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'basic', answerType: 'input',
    question: '{北海道|ほっかいどう}の {道庁所在地|どうちょうしょざいち}（{道庁|どうちょう}の ある {市|し}）は どこかな。',
    answer: '札幌市', acceptedAnswers: ['札幌', 'さっぽろ', 'さっぽろし'], validationMode: 'kana-insensitive',
    hints: ['{冬|ふゆ}に「{雪|ゆき}まつり」が {開|ひら}かれる {都市|とし}だよ。', '「さっ」から はじまるよ。'],
    explanation: '{北海道|ほっかいどう}の {道庁所在地|どうちょうしょざいち}は「{札幌市|さっぽろし}」です。',
    reviewed: true
  },
  {
    id: 'social_g4_garbage_002', subject: 'social', gradeLevel: 4, unit: 'garbage',
    difficulty: 'basic', answerType: 'input',
    question: '{集|あつ}められた {燃|も}える ごみを {燃|も}やして {処理|しょり}する しせつを {何|なん}と いうかな。',
    answer: '清掃工場', acceptedAnswers: ['せいそうこうじょう', 'ごみ処理場', 'ごみしょりじょう', 'ごみ処理工場', '焼却場', 'しょうきゃくじょう', 'クリーンセンター'], validationMode: 'kana-insensitive',
    hints: ['{高|たか}い えんとつが ある ことが {多|おお}いよ。', '「せいそう」は きれいに そうじする という {意味|いみ}だよ。'],
    explanation: '{燃|も}える ごみは「{清掃工場|せいそうこうじょう}」で {燃|も}やして {処理|しょり}します。{燃|も}やした ときの {熱|ねつ}を {発電|はつでん}や プールの {温水|おんすい}に {利用|りよう}して いる ところも あります。',
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_008', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'standard', answerType: 'input',
    question: '{滋賀県|しがけん}に ある、{日本|にほん}で いちばん {大|おお}きな {湖|みずうみ}を {何|なん}と いうかな。',
    answer: '琵琶湖', acceptedAnswers: ['びわこ', 'びわ湖'], validationMode: 'kana-insensitive',
    hints: ['{楽器|がっき}の {名前|なまえ}が ついて いるよ。', '{近畿地方|きんきちほう}の {人々|ひとびと}の {大切|たいせつ}な {水|みず}がめだよ。'],
    explanation: '{日本|にほん}で いちばん {大|おお}きな {湖|みずうみ}は、{滋賀県|しがけん}の「{琵琶湖|びわこ}」です。{滋賀県|しがけん}の {面積|めんせき}の {約|やく}6{分|ぶん}の1を しめます。',
    reviewed: true
  },
  {
    id: 'social_g4_water_003', subject: 'social', gradeLevel: 4, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: '{森林|しんりん}の {土|つち}は {雨水|あまみず}を たくわえ、{少|すこ}しずつ {川|かわ}へ {流|なが}します。この はたらきから、{森林|しんりん}は「{緑|みどり}の ○○」と よばれます。○○に {入|はい}る ことばを カタカナで {答|こた}えよう。',
    answer: 'ダム', acceptedAnswers: ['だむ'], validationMode: 'kana-insensitive',
    hints: ['{川|かわ}の {上流|じょうりゅう}に ある、{水|みず}を ためる しせつと {同|おな}じ はたらきだよ。', 'カタカナ 2{文字|もじ}だよ。'],
    explanation: '{森林|しんりん}は {雨水|あまみず}を たくわえて {少|すこ}しずつ {流|なが}すので「{緑|みどり}の ダム」と よばれます。{水源|すいげん}の {森林|しんりん}を {守|まも}る ことは、{飲|の}み{水|みず}を {守|まも}る ことに つながります。',
    reviewed: true
  },
  {
    id: 'social_g4_disaster_002', subject: 'social', gradeLevel: 4, unit: 'disaster',
    difficulty: 'standard', answerType: 'input',
    question: '{大|おお}きな {地震|じしん}の あと、{海|うみ}から {陸|りく}へ おしよせる {大|おお}きな {波|なみ}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'つなみ', acceptedAnswers: ['津波'], validationMode: 'kana-insensitive',
    hints: ['{海|うみ}の {近|ちか}くで {大|おお}きな ゆれを {感|かん}じたら、すぐに {高|たか}い ところへ にげるよ。', '「つ」から はじまる 3{文字|もじ}の ことばだよ。'],
    explanation: '{地震|じしん}の あとに おしよせる {大|おお}きな {波|なみ}を「{津波|つなみ}」と いいます。{海|うみ}の {近|ちか}くで ゆれを {感|かん}じたら、すぐに {高|たか}い ところへ ひなんします。',
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_009', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'standard', answerType: 'input',
    question: '{東北地方|とうほくちほう}の いちばん {北|きた}に あり、りんごの {生産量|せいさんりょう}が {日本一|にっぽんいち}の {県|けん}は どこかな。',
    answer: '青森県', acceptedAnswers: ['青森', 'あおもり', 'あおもりけん'], validationMode: 'kana-insensitive',
    hints: ['{本州|ほんしゅう}の いちばん {北|きた}に ある {県|けん}だよ。', '「ねぶた{祭|まつ}り」が {有名|ゆうめい}だよ。'],
    explanation: 'りんごの {生産量|せいさんりょう}が {日本一|にっぽんいち}なのは「{青森県|あおもりけん}」で、{全国|ぜんこく}の {半分|はんぶん}{以上|いじょう}を つくって います。',
    reviewed: true
  },
  {
    id: 'social_g4_tradition_001', subject: 'social', gradeLevel: 4, unit: 'tradition',
    difficulty: 'standard', answerType: 'input',
    question: '{石川県|いしかわけん}の {輪島塗|わじまぬり}のように、{昔|むかし}から {受|う}けつがれて きた {技術|ぎじゅつ}で、{職人|しょくにん}が {手|て}づくりする {品物|しなもの}を {何|なん}と いうかな。',
    answer: '伝統工芸品', acceptedAnswers: ['でんとうこうげいひん', '伝統的工芸品', 'でんとうてきこうげいひん', '伝統工芸', 'でんとうこうげい'], validationMode: 'kana-insensitive',
    hints: ['{昔|むかし}から {伝|つた}わる ことを「でんとう」と いうよ。', '「でんとう」＋「こうげいひん」だよ。'],
    explanation: '{昔|むかし}から {受|う}けつがれて きた {技術|ぎじゅつ}で つくる {品物|しなもの}を「{伝統工芸品|でんとうこうげいひん}」と いいます。あとを つぐ {人|ひと}を {育|そだ}てる ことが {課題|かだい}に なって います。',
    reviewed: true
  },
  {
    id: 'social_g4_disaster_003', subject: 'social', gradeLevel: 4, unit: 'disaster',
    difficulty: 'standard', answerType: 'input',
    question: '{災害|さいがい}への そなえで、{自分|じぶん}の {命|いのち}を {自分|じぶん}で {守|まも}る ことを「{自助|じじょ}」と いいます。{近所|きんじょ}や {地域|ちいき}の {人|ひと}どうしが {助|たす}け{合|あ}う ことを {何|なん}と いうかな。',
    answer: '共助', acceptedAnswers: ['きょうじょ'], validationMode: 'kana-insensitive',
    hints: ['「ともに」という {意味|いみ}の {漢字|かんじ}が つくよ。', '{国|くに}や {市|し}が {行|おこな}う {助|たす}けは「{公助|こうじょ}」と いうよ。'],
    explanation: '{地域|ちいき}の {人|ひと}どうしが {助|たす}け{合|あ}う ことを「{共助|きょうじょ}」と いいます。「{自助|じじょ}」「{共助|きょうじょ}」「{公助|こうじょ}」を {組|く}み{合|あ}わせて {災害|さいがい}に そなえます。',
    reviewed: true
  },
  {
    id: 'social_g4_garbage_003', subject: 'social', gradeLevel: 4, unit: 'garbage',
    difficulty: 'standard', answerType: 'choice',
    question: 'ごみを「{燃|も}える ごみ」「{資源|しげん}ごみ」などに {分|わ}けて {出|だ}す（{分別|ぶんべつ}する）のは なぜかな。',
    choices: ['{資源|しげん}として {再|ふたた}び {利用|りよう}したり、{処理|しょり}を しやすく したり するため', 'ごみの {量|りょう}を ふやすため', 'ごみを {集|あつ}める {日|ひ}を へらすため', 'ごみを {遠|とお}くの {国|くに}に {送|おく}るため'],
    answer: '{資源|しげん}として {再|ふたた}び {利用|りよう}したり、{処理|しょり}を しやすく したり するため',
    hints: ['ペットボトルや かんは、{原料|げんりょう}に もどして {使|つか}えるね。', 'まぜて {出|だ}すと、{清掃工場|せいそうこうじょう}で {処理|しょり}が むずかしく なるよ。'],
    explanation: 'ごみを {分別|ぶんべつ}すると、{資源|しげん}ごみを リサイクルしたり、ごみを {安全|あんぜん}に {処理|しょり}したり しやすく なります。',
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_010', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'standard', answerType: 'choice',
    question: '{日本|にほん}を 7つの {地方|ちほう}に {分|わ}けたとき、{中部地方|ちゅうぶちほう}に ふくまれない {県|けん}は どれかな。',
    choices: ['{三重県|みえけん}', '{長野県|ながのけん}', '{静岡県|しずおかけん}', '{新潟県|にいがたけん}'],
    answer: '{三重県|みえけん}',
    hints: ['{中部地方|ちゅうぶちほう}は、{本州|ほんしゅう}の まんなかあたりの 9つの {県|けん}だよ。', 'この {県|けん}は {近畿地方|きんきちほう}に ふくまれるよ。'],
    explanation: '7{地方|ちほう}の {区分|くぶん}では、{三重県|みえけん}は {近畿地方|きんきちほう}に ふくまれます。{長野県|ながのけん}・{静岡県|しずおかけん}・{新潟県|にいがたけん}は {中部地方|ちゅうぶちほう}です。',
    reviewed: true
  },
  {
    id: 'social_g4_electric_001', subject: 'social', gradeLevel: 4, unit: 'electric',
    difficulty: 'standard', answerType: 'choice',
    question: 'ダムに ためた {水|みず}が {流|なが}れ{落|お}ちる {力|ちから}を {利用|りよう}して {電気|でんき}を つくる {発電所|はつでんしょ}は どれかな。',
    choices: ['{水力発電所|すいりょくはつでんしょ}', '{火力発電所|かりょくはつでんしょ}', '{風力発電所|ふうりょくはつでんしょ}', '{太陽光発電所|たいようこうはつでんしょ}'],
    answer: '{水力発電所|すいりょくはつでんしょ}',
    hints: ['{水|みず}の {力|ちから}を {使|つか}うよ。', '{火力|かりょく}は {石油|せきゆ}や {石炭|せきたん}などを {燃|も}やす {発電|はつでん}だよ。'],
    explanation: '{水|みず}が {流|なが}れ{落|お}ちる {力|ちから}で {電気|でんき}を つくるのは「{水力発電所|すいりょくはつでんしょ}」です。',
    inputForm: { question: 'ダムに ためた {水|みず}が {流|なが}れ{落|お}ちる {力|ちから}を {利用|りよう}して {電気|でんき}を つくる 発電所は 何かな。', acceptedAnswers: ['すいりょくはつでんしょ', '水力発電', 'すいりょくはつでん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g4_pioneer_001', subject: 'social', gradeLevel: 4, unit: 'pioneer',
    difficulty: 'standard', answerType: 'choice',
    question: '{昔|むかし}、{水|みず}が {足|た}りなくて {米|こめ}づくりが できなかった {土地|とち}に、{遠|とお}くの {川|かわ}から {水|みず}を {引|ひ}く ために {人々|ひとびと}が つくった {水|みず}の {通|とお}り{道|みち}は どれかな。',
    choices: ['{用水|ようすい}', '{堤防|ていぼう}', '{古墳|こふん}', 'お{城|しろ}の ほり'],
    answer: '{用水|ようすい}',
    hints: ['{田|た}や {畑|はたけ}に {水|みず}を {送|おく}る ための {水路|すいろ}だよ。', '{堤防|ていぼう}は、{川|かわ}の {水|みず}が あふれないように する しせつだね。'],
    explanation: '{田|た}や {畑|はたけ}に {水|みず}を {送|おく}る {水路|すいろ}を「{用水|ようすい}」と いいます。{昔|むかし}の {人々|ひとびと}は、{長|なが}い {年月|ねんげつ}を かけて {用水|ようすい}を つくり、{地域|ちいき}を ゆたかに しました。',
    inputForm: { question: '{昔|むかし}、{水|みず}が {足|た}りなくて {米|こめ}づくりが できなかった {土地|とち}に、{遠|とお}くの {川|かわ}から {水|みず}を {引|ひ}く ために {人々|ひとびと}が つくった 水の 通り道を 何と いうかな。', acceptedAnswers: ['ようすい', '用水路', 'ようすいろ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_011', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'advanced', answerType: 'input',
    question: '{島根県|しまねけん}の {県庁所在地|けんちょうしょざいち}は どこかな。',
    answer: '松江市', acceptedAnswers: ['松江', 'まつえ', 'まつえし'], validationMode: 'kana-insensitive',
    hints: ['{県名|けんめい}と {県庁所在地|けんちょうしょざいち}の {名前|なまえ}が ちがう {県|けん}だよ。', '{宍道湖|しんじこ}の ほとりに ある、お{城|しろ}の ある {町|まち}だよ。'],
    explanation: '{島根県|しまねけん}の {県庁所在地|けんちょうしょざいち}は「{松江市|まつえし}」です。{国宝|こくほう}の {松江城|まつえじょう}が あります。',
    reviewed: true
  },
  {
    id: 'social_g4_disaster_004', subject: 'social', gradeLevel: 4, unit: 'disaster',
    difficulty: 'advanced', answerType: 'input',
    question: '{災害|さいがい}で {家|いえ}に いられなく なった {人|ひと}が、しばらく くらす ための {場所|ばしょ}（{学校|がっこう}の {体育館|たいいくかん}など）を {何|なん}と いうかな。',
    answer: '避難所', acceptedAnswers: ['ひなんじょ', 'ひなんしょ'], validationMode: 'kana-insensitive',
    hints: ['「ひなん」は、{危険|きけん}な ところから にげる ことだよ。', '{水|みず}や {食料|しょくりょう}、もうふなどが そなえられて いるよ。'],
    explanation: '{災害|さいがい}の ときに しばらく くらす {場所|ばしょ}を「{避難所|ひなんじょ}」と いいます。すぐに にげる ための「{避難場所|ひなんばしょ}」とは {区別|くべつ}される ことも あります。',
    reviewed: true
  },
  {
    id: 'social_g4_prefecture_012', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'advanced', answerType: 'choice',
    question: '2020{年|ねん}の {国勢調査|こくせいちょうさ}で、{人口|じんこう}が いちばん {少|すく}なかった {県|けん}は どれかな。',
    choices: ['{鳥取県|とっとりけん}', '{島根県|しまねけん}', '{高知県|こうちけん}', '{秋田県|あきたけん}'],
    answer: '{鳥取県|とっとりけん}',
    hints: ['{中国地方|ちゅうごくちほう}の {日本海側|にほんかいがわ}に ある {県|けん}だよ。', '{大|おお}きな {砂丘|さきゅう}が {有名|ゆうめい}だよ。'],
    explanation: '2020{年|ねん}の {国勢調査|こくせいちょうさ}で {人口|じんこう}が いちばん {少|すく}なかったのは「{鳥取県|とっとりけん}」（{約|やく}55{万人|まんにん}）で、{次|つぎ}が {島根県|しまねけん}です。',
    inputForm: { question: '2020{年|ねん}の {国勢調査|こくせいちょうさ}で、{人口|じんこう}が いちばん {少|すく}なかった 県は どこかな。', acceptedAnswers: ['とっとりけん', '鳥取', 'とっとり'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g4_tradition_002', subject: 'social', gradeLevel: 4, unit: 'tradition',
    difficulty: 'advanced', answerType: 'choice',
    question: '{地域|ちいき}の {人々|ひとびと}が、{昔|むかし}から {続|つづ}く お{祭|まつ}りを {大切|たいせつ}に {受|う}けついで いるのは なぜかな。',
    choices: ['{豊作|ほうさく}や {地域|ちいき}の {安全|あんぜん}などの ねがいを {伝|つた}え、{人々|ひとびと}の つながりを {深|ふか}める ため', 'お{祭|まつ}りの ときだけ {税金|ぜいきん}が いらなく なる ため', '{法律|ほうりつ}で かならず {行|おこな}う ことに なって いる ため', '{外国|がいこく}の {人|ひと}に {売|う}る ため'],
    answer: '{豊作|ほうさく}や {地域|ちいき}の {安全|あんぜん}などの ねがいを {伝|つた}え、{人々|ひとびと}の つながりを {深|ふか}める ため',
    hints: ['お{祭|まつ}りには、{昔|むかし}の {人々|ひとびと}の ねがいが こめられて いるよ。', 'じゅんびや {練習|れんしゅう}を {地域|ちいき}の {人|ひと}たちが {協力|きょうりょく}して {行|おこな}うね。'],
    explanation: '{昔|むかし}から {続|つづ}く お{祭|まつ}りには {豊作|ほうさく}や {地域|ちいき}の {安全|あんぜん}への ねがいが こめられて います。{受|う}けつぐ ことで、{地域|ちいき}の {人々|ひとびと}の つながりも {深|ふか}まります。',
    reviewed: true
  },

  // ===== Lv5（小学5年） =====
  {
    id: 'social_g5_territory_001', subject: 'social', gradeLevel: 5, unit: 'territory',
    difficulty: 'basic', answerType: 'choice',
    question: '{日本|にほん}の いちばん {北|きた}の はしに ある {島|しま}は どれかな。',
    choices: ['{択捉島|えとろふとう}', '{沖ノ鳥島|おきのとりしま}', '{与那国島|よなぐにじま}', '{南鳥島|みなみとりしま}'],
    answer: '{択捉島|えとろふとう}',
    hints: ['{北海道|ほっかいどう}の {東|ひがし}に ある {北方領土|ほっぽうりょうど}の 1つだよ。', '{沖ノ鳥島|おきのとりしま}は {南|みなみ}、{与那国島|よなぐにじま}は {西|にし}、{南鳥島|みなみとりしま}は {東|ひがし}の はしだよ。'],
    explanation: '{日本|にほん}の {北|きた}の はしは {択捉島|えとろふとう}、{南|みなみ}の はしは {沖ノ鳥島|おきのとりしま}、{西|にし}の はしは {与那国島|よなぐにじま}、{東|ひがし}の はしは {南鳥島|みなみとりしま}です。{択捉島|えとろふとう}を ふくむ {北方領土|ほっぽうりょうど}は、{現在|げんざい} ロシアが {実際|じっさい}に {支配|しはい}して いますが（{実効支配|じっこうしはい}）、{日本|にほん}{政府|せいふ}は {日本|にほん}の {領土|りょうど}だと して、{返還|へんかん}を {求|もと}めて います。',
    inputForm: { question: '{日本|にほん}の いちばん {北|きた}の はしに ある 島は 何かな。', acceptedAnswers: ['えとろふとう', '択捉'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g5_geography_001', subject: 'social', gradeLevel: 5, unit: 'geography',
    difficulty: 'basic', answerType: 'input',
    question: '{日本|にほん}で いちばん {高|たか}い {山|やま}は {何|なん}かな。',
    answer: '富士山', acceptedAnswers: ['ふじさん', '富士'], validationMode: 'kana-insensitive',
    hints: ['{静岡県|しずおかけん}と {山梨県|やまなしけん}に またがって いるよ。', '{高|たか}さは 3776mだよ。'],
    explanation: '{日本|にほん}で いちばん {高|たか}い {山|やま}は「{富士山|ふじさん}」（3776m）です。{世界文化遺産|せかいぶんかいさん}にも {登録|とうろく}されて います。',
    reviewed: true
  },
  {
    id: 'social_g5_agriculture_001', subject: 'social', gradeLevel: 5, unit: 'agriculture',
    difficulty: 'standard', answerType: 'input',
    question: '2023{年|ねん}の {統計|とうけい}で、{米|こめ}の {生産量|せいさんりょう}が {日本|にほん}で いちばん {多|おお}い {都道府県|とどうふけん}は どこかな。（{県|けん}の {名前|なまえ}で {答|こた}えよう）',
    answer: '新潟県', acceptedAnswers: ['新潟', 'にいがた', 'にいがたけん'], validationMode: 'kana-insensitive',
    hints: ['{日本海側|にほんかいがわ}に ある {県|けん}で、{信濃川|しなのがわ}が {流|なが}れて いるよ。', '「コシヒカリ」の {産地|さんち}として {有名|ゆうめい}だよ。'],
    explanation: '2023{年|ねん}の {統計|とうけい}では、{米|こめ}の {生産量|せいさんりょう}が いちばん {多|おお}いのは「{新潟県|にいがたけん}」で、2{番目|ばんめ}は {北海道|ほっかいどう}です。{順位|じゅんい}は {年|とし}に よって {変|か}わる ことが あります。',
    reviewed: true
  },
  {
    id: 'social_g5_industry_001', subject: 'social', gradeLevel: 5, unit: 'industry',
    difficulty: 'standard', answerType: 'input',
    question: '{愛知県|あいちけん}を {中心|ちゅうしん}に {広|ひろ}がり、{自動車|じどうしゃ}などの {機械工業|きかいこうぎょう}が さかんな {工業地帯|こうぎょうちたい}を {何|なん}と いうかな。',
    answer: '中京工業地帯', answerDisplay: '{中京工業地帯|ちゅうきょうこうぎょうちたい}', acceptedAnswers: ['中京', 'ちゅうきょう', 'ちゅうきょうこうぎょうちたい'], validationMode: 'kana-insensitive',
    hints: ['{名古屋|なごや}は、{東京|とうきょう}と {京都|きょうと}の あいだに ある {都市|とし}として「○○」と よばれたよ。', '「ちゅうきょう」から はじまるよ。'],
    explanation: '{愛知県|あいちけん}を {中心|ちゅうしん}と する「{中京工業地帯|ちゅうきょうこうぎょうちたい}」は、2019{年|ねん}の {統計|とうけい}で {工業生産額|こうぎょうせいさんがく}が {日本|にほん}で いちばん {多|おお}い {工業地帯|こうぎょうちたい}です。',
    reviewed: true
  },
  {
    id: 'social_g5_trade_001', subject: 'social', gradeLevel: 5, unit: 'trade',
    difficulty: 'standard', answerType: 'input',
    question: '{外国|がいこく}から {品物|しなもの}を {買|か}い{入|い}れる ことを {何|なん}と いうかな。{漢字|かんじ}2{文字|もじ}か ひらがなで {答|こた}えよう。',
    answer: '輸入', acceptedAnswers: ['ゆにゅう'], validationMode: 'kana-insensitive',
    hints: ['{外国|がいこく}へ {品物|しなもの}を {売|う}る ことは「{輸出|ゆしゅつ}」だよ。', '{国|くに}の「{中|なか}に {入|い}れる」ことだよ。'],
    explanation: '{外国|がいこく}から {品物|しなもの}を {買|か}い{入|い}れる ことを「{輸入|ゆにゅう}」、{外国|がいこく}へ {売|う}る ことを「{輸出|ゆしゅつ}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g5_climate_001', subject: 'social', gradeLevel: 5, unit: 'climate',
    difficulty: 'standard', answerType: 'choice',
    question: '{冬|ふゆ}に {北西|ほくせい}から ふく {季節風|きせつふう}の えいきょうで、{雪|ゆき}が {多|おお}く ふる {地域|ちいき}は どれかな。',
    choices: ['{日本海側|にほんかいがわ}', '{太平洋側|たいへいようがわ}', '{瀬戸内|せとうち}', '{南西諸島|なんせいしょとう}'],
    answer: '{日本海側|にほんかいがわ}',
    hints: ['{北西|ほくせい}の {季節風|きせつふう}は、{海|うみ}の {上|うえ}で しめり{気|け}を ふくむよ。', 'しめった {風|かぜ}が {山地|さんち}に ぶつかって、{雪|ゆき}を ふらせるよ。'],
    explanation: '{冬|ふゆ}の {北西|ほくせい}の {季節風|きせつふう}は {日本海|にほんかい}で しめり{気|け}を ふくみ、{山地|さんち}に ぶつかって {日本海側|にほんかいがわ}に {雪|ゆき}を ふらせます。{山|やま}を こえた {太平洋側|たいへいようがわ}は かわいた {晴|は}れの {日|ひ}が {多|おお}く なります。',
    inputForm: { question: '{冬|ふゆ}に {北西|ほくせい}から ふく {季節風|きせつふう}の えいきょうで、{雪|ゆき}が {多|おお}く ふる 地域は どこかな。', acceptedAnswers: ['にほんかいがわ', 'にっぽんかいがわ', '日本海'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g5_environment_001', subject: 'social', gradeLevel: 5, unit: 'environment',
    difficulty: 'standard', answerType: 'choice',
    question: '{四大公害病|よんだいこうがいびょう}の 1つ「{水俣病|みなまたびょう}」の {原因|げんいん}と なった ものは どれかな。',
    choices: ['{工場|こうじょう}から {出|だ}された {有機水銀|ゆうきすいぎん}', '{鉱山|こうざん}から {出|だ}された カドミウム', '{工場|こうじょう}の けむりに ふくまれる {亜硫酸|ありゅうさん}ガス', '{自動車|じどうしゃ}の {排気|はいき}ガス'],
    answer: '{工場|こうじょう}から {出|だ}された {有機水銀|ゆうきすいぎん}',
    hints: ['{熊本県|くまもとけん}の {水俣湾|みなまたわん}で {発生|はっせい}したよ。', '{海|うみ}に {流|なが}された ものが {魚|さかな}や {貝|かい}に たまり、それを {食|た}べた {人|ひと}が {病気|びょうき}に なったよ。'],
    explanation: '{水俣病|みなまたびょう}は、{工場|こうじょう}から {海|うみ}に {流|なが}された {有機水銀|ゆうきすいぎん}（メチル{水銀|すいぎん}）が {原因|げんいん}です。カドミウムは イタイイタイ{病|びょう}、{亜硫酸|ありゅうさん}ガスは {四日市|よっかいち}ぜんそくの {原因|げんいん}です。',
    inputForm: { question: '{四大公害病|よんだいこうがいびょう}の 1つ「{水俣病|みなまたびょう}」の 原因と なった 物質は 何かな。', answer: '有機水銀', acceptedAnswers: ['ゆうきすいぎん', 'メチル水銀', 'めちるすいぎん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g5_fishery_001', subject: 'social', gradeLevel: 5, unit: 'fishery',
    difficulty: 'advanced', answerType: 'input',
    question: '{魚|さかな}や {貝|かい}を、いけすなどで {大|おお}きく なるまで {育|そだ}ててから とる {漁業|ぎょぎょう}を {何|なん}と いうかな。',
    answer: '養殖業', acceptedAnswers: ['養殖', 'ようしょく', 'ようしょくぎょう', '養殖漁業', 'ようしょくぎょぎょう'], validationMode: 'kana-insensitive',
    hints: ['たまごから {育|そだ}てた {稚魚|ちぎょ}を {川|かわ}や {海|うみ}に {放|はな}す のは「さいばい{漁業|ぎょぎょう}」だよ。', 'こちらは とるまで ずっと {人|ひと}が {育|そだ}てるよ。「よう」から はじまるよ。'],
    explanation: 'いけすなどで {大|おお}きく なるまで {育|そだ}てて とる {漁業|ぎょぎょう}を「{養殖業|ようしょくぎょう}」と いいます。{稚魚|ちぎょ}を {放流|ほうりゅう}して {大|おお}きく なってから とるのは「さいばい{漁業|ぎょぎょう}」です。',
    reviewed: true
  },
  {
    id: 'social_g5_agriculture_002', subject: 'social', gradeLevel: 5, unit: 'agriculture',
    difficulty: 'advanced', answerType: 'choice',
    question: '2022{年度|ねんど}の {統計|とうけい}で、{次|つぎ}の {食料|しょくりょう}の うち {日本|にほん}の {食料自給率|しょくりょうじきゅうりつ}（{国内|こくない}で まかなえる {割合|わりあい}）が いちばん {低|ひく}いのは どれかな。',
    choices: ['{小麦|こむぎ}', '{米|こめ}', '{野菜|やさい}', '{鶏卵|けいらん}'],
    answer: '{小麦|こむぎ}',
    hints: ['パンや めんの {原料|げんりょう}に なる {作物|さくもつ}だよ。', 'アメリカや カナダ、オーストラリアから たくさん {輸入|ゆにゅう}して いるよ。'],
    explanation: '2022{年度|ねんど}の {統計|とうけい}では、{小麦|こむぎ}の {自給率|じきゅうりつ}は 2{割|わり}に {満|み}たず、ほとんどを {輸入|ゆにゅう}に たよって います。{米|こめ}は ほぼ 100％、{鶏卵|けいらん}は 90％{以上|いじょう}、{野菜|やさい}は {約|やく}8{割|わり}です。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g5_territory_002', subject: 'social', gradeLevel: 5, unit: 'territory',
    difficulty: 'basic', answerType: 'choice',
    question: '{日本|にほん}の {国土|こくど}の うち、{山地|さんち}（{山|やま}や {丘|おか}）は およそ どれくらいを しめて いるかな。',
    choices: ['{約|やく}4{分|ぶん}の3', '{約|やく}4{分|ぶん}の1', '{約|やく}2{分|ぶん}の1', 'ほとんど ない'],
    answer: '{約|やく}4{分|ぶん}の3',
    hints: ['{日本|にほん}は {山|やま}が とても {多|おお}い {国|くに}だよ。', '{平地|へいち}は {国土|こくど}の {約|やく}4{分|ぶん}の1だよ。'],
    explanation: '{日本|にほん}の {国土|こくど}の {約|やく}4{分|ぶん}の3は {山地|さんち}で、{平地|へいち}は {約|やく}4{分|ぶん}の1です。{多|おお}くの {人|ひと}が {平地|へいち}に {集|あつ}まって くらして います。',
    reviewed: true
  },
  {
    id: 'social_g5_agriculture_003', subject: 'social', gradeLevel: 5, unit: 'agriculture',
    difficulty: 'basic', answerType: 'choice',
    question: '{米|こめ}づくりで、{春|はる}に {育|そだ}てた {苗|なえ}を {水|みず}を はった {田|た}に {植|う}える {作業|さぎょう}は どれかな。',
    choices: ['{田植|たう}え', '{稲|いね}かり', 'だっこく', '{種|たね}もみの {選別|せんべつ}'],
    answer: '{田植|たう}え',
    hints: ['{今|いま}は {田植|たう}え{機|き}と いう {機械|きかい}を {使|つか}う ことが {多|おお}いよ。', '{稲|いね}かりは {秋|あき}の {作業|さぎょう}だね。'],
    explanation: '{苗|なえ}を {田|た}に {植|う}える {作業|さぎょう}を「{田植|たう}え」と いいます。{秋|あき}に {稲|いね}かりを して、だっこく（もみを {取|と}る）を します。',
    inputForm: { question: '{米|こめ}づくりで、{春|はる}に {育|そだ}てた {苗|なえ}を {水|みず}を はった {田|た}に {植|う}える 作業を 何と いうかな。', acceptedAnswers: ['たうえ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g5_territory_003', subject: 'social', gradeLevel: 5, unit: 'territory',
    difficulty: 'basic', answerType: 'input',
    question: '{日本|にほん}の いちばん {南|みなみ}の はしに ある {島|しま}は どこかな。',
    answer: '沖ノ鳥島', acceptedAnswers: ['おきのとりしま', '沖の鳥島'], validationMode: 'kana-insensitive',
    hints: ['{東京都|とうきょうと}に ふくまれる {島|しま}だよ。', 'しずまないように、まわりを コンクリートで {守|まも}って いるよ。'],
    explanation: '{日本|にほん}の {南|みなみ}の はしは「{沖ノ鳥島|おきのとりしま}」です。{島|しま}が しずむと まわりの {海|うみ}の しげんを {利用|りよう}できなく なるので、{護岸工事|ごがんこうじ}で {守|まも}られて います。',
    reviewed: true
  },
  {
    id: 'social_g5_info_001', subject: 'social', gradeLevel: 5, unit: 'info',
    difficulty: 'basic', answerType: 'input',
    question: 'テレビ・{新聞|しんぶん}・ラジオ・{雑誌|ざっし}など、{多|おお}くの {人|ひと}に {同時|どうじ}に {情報|じょうほう}を {伝|つた}える もの（{方法|ほうほう}）を まとめて {何|なん}と いうかな。カタカナで {答|こた}えよう。',
    answer: 'マスメディア', acceptedAnswers: ['マスコミ', 'マスコミュニケーション', 'ますめでぃあ', 'メディア'], validationMode: 'kana-insensitive',
    hints: ['「マス」は {英語|えいご}で「{大量|たいりょう}の・{多|おお}くの {人|ひと}の」という {意味|いみ}だよ。', '「マス○○○○」だよ。'],
    explanation: '{多|おお}くの {人|ひと}に {情報|じょうほう}を {伝|つた}える テレビや {新聞|しんぶん}などを「マスメディア」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g5_climate_002', subject: 'social', gradeLevel: 5, unit: 'climate',
    difficulty: 'standard', answerType: 'input',
    question: '6{月|がつ}から 7{月|がつ}ごろに かけて、{北海道|ほっかいどう}を のぞく {日本|にほん}の {各地|かくち}で {雨|あめ}や くもりの {日|ひ}が {続|つづ}く {時期|じき}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'つゆ', acceptedAnswers: ['梅雨', 'ばいう'], validationMode: 'kana-insensitive',
    hints: ['この {時期|じき}の あとに {本格的|ほんかくてき}な {夏|なつ}が くるよ。', 'ひらがな 2{文字|もじ}だよ。'],
    explanation: '6{月|がつ}から 7{月|がつ}ごろに {雨|あめ}の {日|ひ}が {続|つづ}く {時期|じき}を「{梅雨|つゆ}（ばいう）」と いいます。{北海道|ほっかいどう}には はっきりした {梅雨|つゆ}が ありません。',
    reviewed: true
  },
  {
    id: 'social_g5_industry_002', subject: 'social', gradeLevel: 5, unit: 'industry',
    difficulty: 'standard', answerType: 'input',
    question: '{関東地方|かんとうちほう}から {九州地方|きゅうしゅうちほう}の {北部|ほくぶ}に かけて、{海沿|うみぞ}いに {工業|こうぎょう}の さかんな {地域|ちいき}が {帯|おび}のように {連|つら}なる ところを {何|なん}と いうかな。',
    answer: '太平洋ベルト', acceptedAnswers: ['たいへいようベルト', 'たいへいようべると'], validationMode: 'kana-insensitive',
    hints: ['「ベルト」は {帯|おび}の ことだよ。', 'そばに ある {大|おお}きな {海|うみ}の {名前|なまえ}が つくよ。'],
    explanation: '{関東|かんとう}から {九州|きゅうしゅう}{北部|ほくぶ}の {海沿|うみぞ}いに {工業地帯|こうぎょうちたい}・{工業地域|こうぎょうちいき}が {連|つら}なる ところを「{太平洋|たいへいよう}ベルト」と いいます。{原料|げんりょう}や {製品|せいひん}を {船|ふね}で {運|はこ}びやすい ことなどが りゆうです。',
    reviewed: true
  },
  {
    id: 'social_g5_trade_002', subject: 'social', gradeLevel: 5, unit: 'trade',
    difficulty: 'standard', answerType: 'input',
    question: '{原料|げんりょう}を {輸入|ゆにゅう}し、それを {加工|かこう}して つくった {製品|せいひん}を {輸出|ゆしゅつ}する {貿易|ぼうえき}の しかたを {何|なん}と いうかな。',
    answer: '加工貿易', acceptedAnswers: ['かこうぼうえき'], validationMode: 'kana-insensitive',
    hints: ['{原料|げんりょう}に {手|て}を くわえて {製品|せいひん}に する ことを「かこう」と いうよ。', '「かこう」＋「ぼうえき」だよ。'],
    explanation: '{原料|げんりょう}を {輸入|ゆにゅう}して {製品|せいひん}に し、{輸出|ゆしゅつ}する {貿易|ぼうえき}を「{加工貿易|かこうぼうえき}」と いいます。{日本|にほん}は {長|なが}い {間|あいだ}、{加工貿易|かこうぼうえき}で {発展|はってん}して きました。',
    reviewed: true
  },
  {
    id: 'social_g5_fishery_002', subject: 'social', gradeLevel: 5, unit: 'fishery',
    difficulty: 'standard', answerType: 'input',
    question: '{日本|にほん}の {近|ちか}くの {海|うみ}で、{数日|すうじつ}がかりで {魚|さかな}を とる {漁業|ぎょぎょう}を {何|なん}と いうかな。',
    answer: '沖合漁業', acceptedAnswers: ['おきあいぎょぎょう', '沖合い漁業'], validationMode: 'kana-insensitive',
    hints: ['{日帰|ひがえ}りで {行|おこな}う {漁業|ぎょぎょう}は「{沿岸漁業|えんがんぎょぎょう}」、{遠|とお}くの {海|うみ}で {長|なが}い {間|あいだ} {行|おこな}う {漁業|ぎょぎょう}は「{遠洋漁業|えんようぎょぎょう}」だよ。', '「{沖|おき}」の {字|じ}が つくよ。'],
    explanation: '{数日|すうじつ}がかりで {日本|にほん}の {近|ちか}くの {海|うみ}で {行|おこな}う {漁業|ぎょぎょう}を「{沖合漁業|おきあいぎょぎょう}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g5_agriculture_004', subject: 'social', gradeLevel: 5, unit: 'agriculture',
    difficulty: 'standard', answerType: 'input',
    question: '{牛|うし}・ぶた・にわとりなどの {家畜|かちく}を {育|そだ}てて、{肉|にく}や {牛乳|ぎゅうにゅう}、たまごなどを {生産|せいさん}する {農業|のうぎょう}を {何|なん}と いうかな。',
    answer: '畜産', acceptedAnswers: ['ちくさん', '畜産業', 'ちくさんぎょう', 'らくのう', '酪農'], validationMode: 'kana-insensitive',
    hints: ['「{家畜|かちく}」の「{畜|ちく}」の {字|じ}を {使|つか}うよ。', '{北海道|ほっかいどう}や {九州|きゅうしゅう}{南部|なんぶ}で さかんだよ。'],
    explanation: '{家畜|かちく}を {育|そだ}てる {農業|のうぎょう}を「{畜産|ちくさん}」と いいます。{乳牛|にゅうぎゅう}を {育|そだ}てて {牛乳|ぎゅうにゅう}を つくる {農業|のうぎょう}は、とくに「{酪農|らくのう}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g5_environment_002', subject: 'social', gradeLevel: 5, unit: 'environment',
    difficulty: 'standard', answerType: 'input',
    question: '{日本|にほん}の {国土|こくど}の {約|やく}3{分|ぶん}の2を おおって いる ものは {何|なに}かな。',
    answer: '森林', acceptedAnswers: ['しんりん', '森', 'もり', '林'], validationMode: 'kana-insensitive',
    hints: ['{木|き}が たくさん はえて いる ところだよ。', '{土砂|どしゃ}くずれを ふせいだり、{水|みず}を たくわえたり するよ。'],
    explanation: '{日本|にほん}の {国土|こくど}の {約|やく}3{分|ぶん}の2は {森林|しんりん}です。{森林|しんりん}は {木材|もくざい}を {生|う}み、{水|みず}を たくわえ、{土砂|どしゃ}くずれを ふせぐ はたらきを して います。',
    reviewed: true
  },
  {
    id: 'social_g5_territory_004', subject: 'social', gradeLevel: 5, unit: 'territory',
    difficulty: 'standard', answerType: 'choice',
    question: '{沿岸|えんがん}の {国|くに}が {魚|さかな}や {海底|かいてい}の {資源|しげん}を {利用|りよう}できる「{排他的経済水域|はいたてきけいざいすいいき}」は、{海岸線|かいがんせん}から {何海里|なんかいり}までの {海|うみ}かな。',
    choices: ['200{海里|かいり}', '12{海里|かいり}', '100{海里|かいり}', '50{海里|かいり}'],
    answer: '200{海里|かいり}',
    hints: ['12{海里|かいり}までは「{領海|りょうかい}」と いうよ。', '{約|やく}370kmに あたるよ。'],
    explanation: '{排他的経済水域|はいたてきけいざいすいいき}は {海岸線|かいがんせん}から 200{海里|かいり}（{約|やく}370km）までの {海|うみ}（{領海|りょうかい}を のぞく）です。{日本|にほん}は {島|しま}が {多|おお}いので、{国土|こくど}の {面積|めんせき}に くらべて {広|ひろ}い {排他的経済水域|はいたてきけいざいすいいき}を もって います。',
    inputForm: { answer: '200', acceptedAnswers: ['200海里', '200かいり'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g5_industry_003', subject: 'social', gradeLevel: 5, unit: 'industry',
    difficulty: 'standard', answerType: 'choice',
    question: '{自動車工場|じどうしゃこうじょう}に、シートや ハンドルなどの {部品|ぶひん}を つくって とどけて いる {工場|こうじょう}を {何|なん}と いうかな。',
    choices: ['{関連工場|かんれんこうじょう}', '{清掃工場|せいそうこうじょう}', '{浄水場|じょうすいじょう}', '{発電所|はつでんしょ}'],
    answer: '{関連工場|かんれんこうじょう}',
    hints: ['{自動車|じどうしゃ}は {約|やく}3{万個|まんこ}の {部品|ぶひん}で できて いるよ。', '{組|く}み{立|た}て{工場|こうじょう}と「かんれん」する {工場|こうじょう}だよ。'],
    explanation: '{自動車|じどうしゃ}の {部品|ぶひん}を つくる {工場|こうじょう}を「{関連工場|かんれんこうじょう}」と いいます。{必要|ひつよう}な {部品|ぶひん}を、{必要|ひつよう}な ときに、{必要|ひつよう}な {数|かず}だけ {組|く}み{立|た}て{工場|こうじょう}へ とどけます。',
    inputForm: { acceptedAnswers: ['かんれんこうじょう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g5_info_002', subject: 'social', gradeLevel: 5, unit: 'info',
    difficulty: 'standard', answerType: 'choice',
    question: 'インターネットで {情報|じょうほう}を {集|あつ}める ときに {大切|たいせつ}な ことは どれかな。',
    choices: ['その {情報|じょうほう}が {正|ただ}しいか、ほかの {本|ほん}や {資料|しりょう}でも {確|たし}かめる', 'さいしょに {見|み}つけた {情報|じょうほう}を すべて しんじる', '{友|とも}だちの {名前|なまえ}や {住所|じゅうしょ}を のせる', 'ほかの {人|ひと}の {写真|しゃしん}を かってに {使|つか}う'],
    answer: 'その {情報|じょうほう}が {正|ただ}しいか、ほかの {本|ほん}や {資料|しりょう}でも {確|たし}かめる',
    hints: ['インターネットには、まちがった {情報|じょうほう}も あるよ。', 'ほかの {人|ひと}の {個人情報|こじんじょうほう}や {写真|しゃしん}の あつかいにも {気|き}を つけよう。'],
    explanation: 'インターネットの {情報|じょうほう}には まちがいも あるので、{本|ほん}や ほかの {資料|しりょう}でも {確|たし}かめる ことが {大切|たいせつ}です。{個人情報|こじんじょうほう}を のせたり、{人|ひと}の {写真|しゃしん}を かってに {使|つか}ったり しては いけません。',
    reviewed: true
  },
  {
    id: 'social_g5_climate_003', subject: 'social', gradeLevel: 5, unit: 'climate',
    difficulty: 'standard', answerType: 'choice',
    question: '{沖縄県|おきなわけん}の {昔|むかし}ながらの {家|いえ}に {見|み}られる くふうは どれかな。',
    choices: ['{台風|たいふう}に そなえて、{家|いえ}の まわりを {石垣|いしがき}で かこみ、{屋根|やね}の かわらを しっくいで {固|かた}めて いる', '{雪|ゆき}が つもらないように、{屋根|やね}を {急|きゅう}な かたむきに して いる', '{寒|さむ}さに そなえて、{窓|まど}を {二重|にじゅう}に して いる', '{雪|ゆき}を とかす ために、{道路|どうろ}に {水|みず}を まく しくみが ある'],
    answer: '{台風|たいふう}に そなえて、{家|いえ}の まわりを {石垣|いしがき}で かこみ、{屋根|やね}の かわらを しっくいで {固|かた}めて いる',
    hints: ['{沖縄県|おきなわけん}は {雪|ゆき}が ほとんど ふらない あたたかい {地域|ちいき}だよ。', '{夏|なつ}から {秋|あき}に {台風|たいふう}が よく {通|とお}るよ。'],
    explanation: '{沖縄県|おきなわけん}の {昔|むかし}ながらの {家|いえ}は、{台風|たいふう}の {強|つよ}い {風|かぜ}に そなえて {石垣|いしがき}で かこみ、かわらを しっくいで {固|かた}めて います。{雪|ゆき}や {寒|さむ}さへの くふうは、{北|きた}の {地域|ちいき}の くふうです。',
    reviewed: true
  },
  {
    id: 'social_g5_agriculture_005', subject: 'social', gradeLevel: 5, unit: 'agriculture',
    difficulty: 'advanced', answerType: 'input',
    question: '{同|おな}じ {田|た}や {畑|はたけ}で、1{年|ねん}の {間|あいだ}に ちがう しゅるいの {作物|さくもつ}を 2{回|かい} つくる ことを {何|なん}と いうかな。（{例|れい}：{米|こめ}を かった あとに {麦|むぎ}を つくる）',
    answer: '二毛作', acceptedAnswers: ['にもうさく'], validationMode: 'kana-insensitive',
    hints: ['{同|おな}じ {作物|さくもつ}を 2{回|かい} つくるのは「{二期作|にきさく}」だよ。', '「に」から はじまる ことばだよ。'],
    explanation: '1{年|ねん}に ちがう {作物|さくもつ}を 2{回|かい} つくる ことを「{二毛作|にもうさく}」と いいます。{同|おな}じ {作物|さくもつ}（{米|こめ}など）を 2{回|かい} つくる ことは「{二期作|にきさく}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g5_industry_004', subject: 'social', gradeLevel: 5, unit: 'industry',
    difficulty: 'advanced', answerType: 'input',
    question: 'はたらく {人|ひと}が 300{人|にん}{未満|みまん}の {工場|こうじょう}を {何|なん}と いうかな。',
    answer: '中小工場', answerDisplay: '{中小工場|ちゅうしょうこうじょう}', acceptedAnswers: ['ちゅうしょうこうじょう'], validationMode: 'kana-insensitive',
    hints: ['300{人|にん}{以上|いじょう}の {工場|こうじょう}は「{大工場|だいこうじょう}」だよ。', '「{中|ちゅう}」と「{小|しょう}」を あわせた ことばだよ。'],
    explanation: 'はたらく {人|ひと}が 300{人|にん}{未満|みまん}の {工場|こうじょう}を「{中小工場|ちゅうしょうこうじょう}」と いいます。{日本|にほん}の {工場|こうじょう}の ほとんどは {中小工場|ちゅうしょうこうじょう}で、すぐれた {技術|ぎじゅつ}を もつ {工場|こうじょう}も {多|おお}く あります。',
    reviewed: true
  },
  {
    id: 'social_g5_environment_003', subject: 'social', gradeLevel: 5, unit: 'environment',
    difficulty: 'advanced', answerType: 'choice',
    question: '{四大公害病|よんだいこうがいびょう}の 1つ「イタイイタイ{病|びょう}」が {発生|はっせい}した {県|けん}は どれかな。',
    choices: ['{富山県|とやまけん}', '{熊本県|くまもとけん}', '{新潟県|にいがたけん}', '{三重県|みえけん}'],
    answer: '{富山県|とやまけん}',
    hints: ['{神通川|じんづうがわ}の {流域|りゅういき}で {発生|はっせい}したよ。', '{熊本県|くまもとけん}は {水俣病|みなまたびょう}、{三重県|みえけん}は {四日市|よっかいち}ぜんそくだね。'],
    explanation: 'イタイイタイ{病|びょう}は {富山県|とやまけん}の {神通川|じんづうがわ}{流域|りゅういき}で、{鉱山|こうざん}から {流|なが}れ{出|で}た カドミウムが {原因|げんいん}で {発生|はっせい}しました。{新潟県|にいがたけん}では {新潟水俣病|にいがたみなまたびょう}、{三重県|みえけん}では {四日市|よっかいち}ぜんそくが {発生|はっせい}しました。',
    inputForm: { question: '{四大公害病|よんだいこうがいびょう}の 1つ「イタイイタイ{病|びょう}」が {発生|はっせい}した 県は どこかな。', acceptedAnswers: ['とやまけん', '富山', 'とやま'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g5_info_003', subject: 'social', gradeLevel: 5, unit: 'info',
    difficulty: 'advanced', answerType: 'choice',
    question: 'テレビの ニュース{番組|ばんぐみ}を つくる {人|ひと}たちが、もっとも {大切|たいせつ}に して いる ことは どれかな。',
    choices: ['{事実|じじつ}を {確|たし}かめて、{正確|せいかく}で わかりやすい {情報|じょうほう}を {伝|つた}える こと', 'できるだけ おもしろく なるように {話|はなし}を つくる こと', 'ほかの {局|きょく}より {長|なが}い {時間|じかん} {放送|ほうそう}する こと', '{自分|じぶん}たちの {意見|いけん}だけを {伝|つた}える こと'],
    answer: '{事実|じじつ}を {確|たし}かめて、{正確|せいかく}で わかりやすい {情報|じょうほう}を {伝|つた}える こと',
    hints: ['{多|おお}くの {人|ひと}が ニュースを {見|み}て、{行動|こうどう}を {決|き}めるよ。', 'まちがった {情報|じょうほう}を {伝|つた}えると、どう なるかな。'],
    explanation: 'ニュースは {多|おお}くの {人|ひと}に えいきょうを あたえるので、{取材|しゅざい}して {事実|じじつ}を {確|たし}かめ、{正確|せいかく}で わかりやすく {伝|つた}える ことが {大切|たいせつ}に されて います。',
    reviewed: true
  },

  // ===== Lv6（小学6年） =====
  {
    id: 'social_g6_constitution_001', subject: 'social', gradeLevel: 6, unit: 'constitution',
    difficulty: 'basic', answerType: 'choice',
    question: '{日本国憲法|にほんこくけんぽう}の {三|みっ}つの {原則|げんそく}に ふくまれない ものは どれかな。',
    choices: ['{三権分立|さんけんぶんりつ}', '{国民主権|こくみんしゅけん}', '{基本的人権|きほんてきじんけん}の {尊重|そんちょう}', '{平和主義|へいわしゅぎ}'],
    answer: '{三権分立|さんけんぶんりつ}',
    hints: ['{三|みっ}つの {原則|げんそく}は「{国民|こくみん}が {主役|しゅやく}」「{人権|じんけん}を {大切|たいせつ}に」「{戦争|せんそう}を しない」。', '{三権分立|さんけんぶんりつ}は {国|くに}の {政治|せいじ}の しくみの ことだよ。'],
    explanation: '{日本国憲法|にほんこくけんぽう}の {三|みっ}つの {原則|げんそく}は「{国民主権|こくみんしゅけん}」「{基本的人権|きほんてきじんけん}の {尊重|そんちょう}」「{平和主義|へいわしゅぎ}」です。{三権分立|さんけんぶんりつ}は、{国会|こっかい}・{内閣|ないかく}・{裁判所|さいばんしょ}が {権力|けんりょく}を {分|わ}け{合|あ}う しくみです。',
    reviewed: true
  },
  {
    id: 'social_g6_history_001', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'basic', answerType: 'input',
    question: '{聖徳太子|しょうとくたいし}が {定|さだ}めた、「{和|わ}を {以|もっ}て {貴|とうと}しと なす」で {始|はじ}まる {役人|やくにん}の {心|こころ}がまえを しめした きまりを {何|なん}と いうかな。',
    answer: '十七条の憲法', acceptedAnswers: ['十七条憲法', 'じゅうしちじょうのけんぽう', 'じゅうしちじょうけんぽう'], validationMode: 'kana-insensitive',
    hints: ['{条文|じょうぶん}の {数|かず}が {名前|なまえ}に ついて いるよ。', '「○○{条|じょう}の {憲法|けんぽう}」だよ。'],
    explanation: '{聖徳太子|しょうとくたいし}は「{十七条|じゅうしちじょう}の{憲法|けんぽう}」で、{役人|やくにん}の {心|こころ}がまえを しめしました。',
    reviewed: true
  },
  {
    id: 'social_g6_history_002', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{平氏|へいし}を たおした あと、{鎌倉|かまくら}に {幕府|ばくふ}を ひらき、{征夷大将軍|せいいたいしょうぐん}に なった {人物|じんぶつ}は だれかな。',
    answer: '源頼朝', acceptedAnswers: ['みなもとのよりとも', 'みなもとよりとも'], validationMode: 'kana-insensitive',
    hints: ['{源氏|げんじ}の {中心|ちゅうしん}と なった {人物|じんぶつ}だよ。', '{弟|おとうと}の {源義経|みなもとのよしつね}が {平氏|へいし}との たたかいで かつやくしたよ。'],
    explanation: '「{源頼朝|みなもとのよりとも}」は {鎌倉|かまくら}に {幕府|ばくふ}を ひらき、{武士|ぶし}の {政治|せいじ}を {始|はじ}めました。',
    reviewed: true
  },
  {
    id: 'social_g6_politics_001', subject: 'social', gradeLevel: 6, unit: 'politics',
    difficulty: 'standard', answerType: 'input',
    question: '{国|くに}の {法律|ほうりつ}を つくる ところで、{衆議院|しゅうぎいん}と {参議院|さんぎいん}から なる {機関|きかん}を {何|なん}と いうかな。',
    answer: '国会', acceptedAnswers: ['こっかい'], validationMode: 'kana-insensitive',
    hints: ['{選挙|せんきょ}で えらばれた {議員|ぎいん}が {集|あつ}まる ところだよ。', '{東京|とうきょう}の {永田町|ながたちょう}に {議事堂|ぎじどう}が あるよ。'],
    explanation: '{法律|ほうりつ}を つくるのは「{国会|こっかい}」です。{内閣|ないかく}は {法律|ほうりつ}に もとづいて {政治|せいじ}を {行|おこな}い、{裁判所|さいばんしょ}は {法律|ほうりつ}に もとづいて {裁判|さいばん}を {行|おこな}います。',
    reviewed: true
  },
  {
    id: 'social_g6_history_003', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{関ヶ原|せきがはら}の たたかいに {勝|か}ち、{江戸|えど}に {幕府|ばくふ}を ひらいた {人物|じんぶつ}は だれかな。',
    answer: '徳川家康', acceptedAnswers: ['とくがわいえやす'], validationMode: 'kana-insensitive',
    hints: ['この {人物|じんぶつ}の {家|いえ}が、{約|やく}260{年|ねん} {将軍|しょうぐん}を つとめたよ。', '「とくがわ」から はじまるよ。'],
    explanation: '「{徳川家康|とくがわいえやす}」は 1600{年|ねん}の {関ヶ原|せきがはら}の たたかいに {勝|か}ち、1603{年|ねん}に {江戸幕府|えどばくふ}を ひらきました。',
    reviewed: true
  },
  {
    id: 'social_g6_history_004', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{奈良|なら}の {東大寺|とうだいじ}に {大仏|だいぶつ}を つくらせた {天皇|てんのう}は だれかな。',
    choices: ['{聖武天皇|しょうむてんのう}', '{天智天皇|てんじてんのう}', '{桓武天皇|かんむてんのう}', '{推古天皇|すいこてんのう}'],
    answer: '{聖武天皇|しょうむてんのう}',
    hints: ['{仏教|ぶっきょう}の {力|ちから}で {国|くに}を {守|まも}ろうと した {天皇|てんのう}だよ。', '{全国|ぜんこく}に {国分寺|こくぶんじ}を たてさせたよ。'],
    explanation: '{聖武天皇|しょうむてんのう}は {仏教|ぶっきょう}の {力|ちから}で {国|くに}を {安|やす}らかに しようと、{東大寺|とうだいじ}に {大仏|だいぶつ}を つくらせ、{全国|ぜんこく}に {国分寺|こくぶんじ}を たてさせました。',
    inputForm: { acceptedAnswers: ['しょうむてんのう', '聖武'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_history_005', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{縄文時代|じょうもんじだい}の {人々|ひとびと}が、{食|た}べた {貝|かい}の からなどを すてた あとを {何|なん}と いうかな。',
    choices: ['{貝塚|かいづか}', '{古墳|こふん}', '{高床倉庫|たかゆかそうこ}', 'たて{穴住居|あなじゅうきょ}'],
    answer: '{貝塚|かいづか}',
    hints: ['{貝|かい}の からが {積|つ}もって、{小|ちい}さな {山|やま}の ように なったよ。', '「{塚|つか}」は もりあがった ところと いう {意味|いみ}だよ。'],
    explanation: '{貝|かい}の からや {動物|どうぶつ}の ほねなどが すてられた あとを「{貝塚|かいづか}」と いいます。{当時|とうじ}の くらしを {知|し}る {手|て}がかりに なります。',
    inputForm: { acceptedAnswers: ['かいづか'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_history_006', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '{江戸幕府|えどばくふ}が たおれた あと、{明治|めいじ}の {新|あたら}しい {政府|せいふ}が すすめた、{政治|せいじ}や {社会|しゃかい}の {大|おお}きな {改革|かいかく}を {何|なん}と いうかな。',
    answer: '明治維新', acceptedAnswers: ['めいじいしん'], validationMode: 'kana-insensitive',
    hints: ['「{明治|めいじ}○○」と いうよ。', '{廃藩置県|はいはんちけん}や {学制|がくせい}なども この {改革|かいかく}の 1つだよ。'],
    explanation: '{明治|めいじ}の {新政府|しんせいふ}が すすめた {一連|いちれん}の {改革|かいかく}を「{明治維新|めいじいしん}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g6_constitution_002', subject: 'social', gradeLevel: 6, unit: 'constitution',
    difficulty: 'advanced', answerType: 'choice',
    question: '{日本国憲法|にほんこくけんぽう}が {公布|こうふ}された {日|ひ}は どれかな。（{今|いま}は {国民|こくみん}の {祝日|しゅくじつ}に なって いる）',
    choices: ['11{月|がつ}3{日|か}（{文化|ぶんか}の{日|ひ}）', '5{月|がつ}3{日|か}（{憲法記念日|けんぽうきねんび}）', '2{月|がつ}11{日|にち}（{建国記念|けんこくきねん}の{日|ひ}）', '4{月|がつ}29{日|にち}（{昭和|しょうわ}の{日|ひ}）'],
    answer: '11{月|がつ}3{日|か}（{文化|ぶんか}の{日|ひ}）',
    hints: ['「{公布|こうふ}」は {国民|こくみん}に {発表|はっぴょう}する こと、「{施行|しこう}」は {実際|じっさい}に {使|つか}い{始|はじ}める こと。', '{施行|しこう}された {日|ひ}は「{憲法記念日|けんぽうきねんび}」。{公布|こうふ}は その {半年|はんとし} {前|まえ}だよ。'],
    explanation: '{日本国憲法|にほんこくけんぽう}は 1946{年|ねん}11{月|がつ}3{日|か}に {公布|こうふ}され（{今|いま}の {文化|ぶんか}の{日|ひ}）、1947{年|ねん}5{月|がつ}3{日|か}に {施行|しこう}されました（{今|いま}の {憲法記念日|けんぽうきねんび}）。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g6_history_007', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'basic', answerType: 'choice',
    question: '{大陸|たいりく}から {米|こめ}づくりが {伝|つた}わって {広|ひろ}まり、むらや くにが できて いった {時代|じだい}は どれかな。',
    choices: ['{弥生時代|やよいじだい}', '{縄文時代|じょうもんじだい}', '{古墳時代|こふんじだい}', '{奈良時代|ならじだい}'],
    answer: '{弥生時代|やよいじだい}',
    hints: ['{米|こめ}を たくわえる {高床倉庫|たかゆかそうこ}が つくられたよ。', '{縄文時代|じょうもんじだい}の {次|つぎ}の {時代|じだい}だよ。'],
    explanation: '{米|こめ}づくりが {広|ひろ}まったのは {弥生時代|やよいじだい}です。{米|こめ}や {土地|とち}を めぐって むらどうしの {争|あらそ}いも おこり、やがて くにが できました。',
    inputForm: { question: '{大陸|たいりく}から {米|こめ}づくりが {伝|つた}わって {広|ひろ}まり、むらや くにが できて いった 時代は 何時代かな。', acceptedAnswers: ['やよいじだい', '弥生'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_politics_002', subject: 'social', gradeLevel: 6, unit: 'politics',
    difficulty: 'basic', answerType: 'choice',
    question: '{国会|こっかい}で {決|き}めた {法律|ほうりつ}や {予算|よさん}に もとづいて、{実際|じっさい}に {国|くに}の {政治|せいじ}を {行|おこな}う ところは どれかな。',
    choices: ['{内閣|ないかく}', '{裁判所|さいばんしょ}', '{市役所|しやくしょ}', '{日本銀行|にっぽんぎんこう}'],
    answer: '{内閣|ないかく}',
    hints: ['{内閣総理大臣|ないかくそうりだいじん}と {国務大臣|こくむだいじん}で つくられて いるよ。', '{国会|こっかい}・{内閣|ないかく}・{裁判所|さいばんしょ}の 3つで {三権分立|さんけんぶんりつ}だね。'],
    explanation: '{国会|こっかい}で {決|き}めた {法律|ほうりつ}や {予算|よさん}に もとづいて {政治|せいじ}を {行|おこな}うのは「{内閣|ないかく}」です。{内閣|ないかく}の {下|もと}で、{省庁|しょうちょう}が {実際|じっさい}の {仕事|しごと}を {分担|ぶんたん}して います。',
    inputForm: { question: '{国会|こっかい}で {決|き}めた {法律|ほうりつ}や {予算|よさん}に もとづいて、{実際|じっさい}に {国|くに}の {政治|せいじ}を {行|おこな}う ところは どこかな。', acceptedAnswers: ['ないかく'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_history_008', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'basic', answerType: 'input',
    question: '{平安時代|へいあんじだい}に、かな{文字|もじ}を {使|つか}って『{源氏物語|げんじものがたり}』を {書|か}いた {女性|じょせい}は だれかな。',
    answer: '紫式部', answerDisplay: '{紫式部|むらさきしきぶ}', acceptedAnswers: ['むらさきしきぶ'], validationMode: 'kana-insensitive',
    hints: ['『{枕草子|まくらのそうし}』を {書|か}いたのは {清少納言|せいしょうなごん}だね。', '「むらさき」から はじまる {名前|なまえ}だよ。'],
    explanation: '『{源氏物語|げんじものがたり}』を {書|か}いたのは「{紫式部|むらさきしきぶ}」です。かな{文字|もじ}が {生|う}まれ、{日本|にほん}らしい {国風文化|こくふうぶんか}が さかえました。',
    reviewed: true
  },
  {
    id: 'social_g6_politics_003', subject: 'social', gradeLevel: 6, unit: 'politics',
    difficulty: 'basic', answerType: 'input',
    question: '{三権分立|さんけんぶんりつ}で、{法律|ほうりつ}を つくるのは {国会|こっかい}、{政治|せいじ}を {行|おこな}うのは {内閣|ないかく}です。{法律|ほうりつ}に もとづいて {争|あらそ}いごとを {解決|かいけつ}したり、{罪|つみ}を {裁|さば}いたり するのは どこかな。',
    answer: '裁判所', acceptedAnswers: ['さいばんしょ'], validationMode: 'kana-insensitive',
    hints: ['{裁判官|さいばんかん}が はたらいて いるよ。', 'いちばん {上|うえ}は「{最高|さいこう}○○○」だよ。'],
    explanation: '{法律|ほうりつ}に もとづいて {裁判|さいばん}を {行|おこな}うのは「{裁判所|さいばんしょ}」です。{国会|こっかい}（{立法|りっぽう}）・{内閣|ないかく}（{行政|ぎょうせい}）・{裁判所|さいばんしょ}（{司法|しほう}）が {権力|けんりょく}を {分|わ}け{合|あ}って います。',
    reviewed: true
  },
  {
    id: 'social_g6_history_009', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{京都|きょうと}の {北山|きたやま}に {金閣|きんかく}を {建|た}てた、{室町幕府|むろまちばくふ}の 3{代将軍|だいしょうぐん}は だれかな。',
    answer: '足利義満', answerDisplay: '{足利義満|あしかがよしみつ}', acceptedAnswers: ['あしかがよしみつ'], validationMode: 'kana-insensitive',
    hints: ['{室町幕府|むろまちばくふ}を ひらいたのは {足利尊氏|あしかがたかうじ}だね。', '{中国|ちゅうごく}（{明|みん}）との {貿易|ぼうえき}も {始|はじ}めたよ。'],
    explanation: '{金閣|きんかく}を {建|た}てたのは 3{代将軍|だいしょうぐん}「{足利義満|あしかがよしみつ}」です。8{代将軍|だいしょうぐん}の {足利義政|あしかがよしまさ}は {銀閣|ぎんかく}を {建|た}てました。',
    reviewed: true
  },
  {
    id: 'social_g6_history_010', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{全国|ぜんこく}の {田畑|たはた}の {広|ひろ}さや よしあしを {調|しら}べる {検地|けんち}や、{百姓|ひゃくしょう}から {武器|ぶき}を {取|と}り{上|あ}げる {刀狩|かたながり}を {行|おこな}い、{全国|ぜんこく}を {統一|とういつ}した {人物|じんぶつ}は だれかな。',
    answer: '豊臣秀吉', acceptedAnswers: ['とよとみひでよし', '羽柴秀吉'], validationMode: 'kana-insensitive',
    hints: ['{織田信長|おだのぶなが}の {家来|けらい}だった {人物|じんぶつ}だよ。', '{大阪城|おおさかじょう}を きずいたよ。'],
    explanation: '{検地|けんち}（{太閤検地|たいこうけんち}）や {刀狩|かたながり}を {行|おこな}い、{全国|ぜんこく}を {統一|とういつ}したのは「{豊臣秀吉|とよとみひでよし}」です。これにより {武士|ぶし}と {百姓|ひゃくしょう}の {身分|みぶん}が はっきり {分|わ}けられました。',
    reviewed: true
  },
  {
    id: 'social_g6_history_011', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{大王|おおきみ}や {豪族|ごうぞく}の {墓|はか}として つくられた、{土|つち}を {高|たか}く もり{上|あ}げた {大|おお}きな {墓|はか}を {何|なん}と いうかな。',
    answer: '古墳', acceptedAnswers: ['こふん'], validationMode: 'kana-insensitive',
    hints: ['{大阪府|おおさかふ}の {大仙|だいせん}（{仁徳陵|にんとくりょう}）○○は、{前方後円墳|ぜんぽうこうえんふん}で {日本最大|にほんさいだい}だよ。', 'まわりに はにわが ならべられたよ。'],
    explanation: '{大王|おおきみ}や {豪族|ごうぞく}の {大|おお}きな {墓|はか}を「{古墳|こふん}」と いいます。{古墳|こふん}が さかんに つくられた {時代|じだい}を {古墳時代|こふんじだい}と いいます。',
    reviewed: true
  },
  {
    id: 'social_g6_politics_004', subject: 'social', gradeLevel: 6, unit: 'politics',
    difficulty: 'standard', answerType: 'input',
    question: '{国|くに}や {都道府県|とどうふけん}・{市|し}などが、{学校|がっこう}や {道路|どうろ}、{消防|しょうぼう}など みんなの ための {仕事|しごと}に {使|つか}う ために、{国民|こくみん}から {集|あつ}める お{金|かね}を {何|なん}と いうかな。',
    answer: '税金', acceptedAnswers: ['ぜいきん', '税', 'ぜい'], validationMode: 'kana-insensitive',
    hints: ['{買|か}い{物|もの}の ときに はらう {消費税|しょうひぜい}も その 1つだよ。', '{漢字|かんじ} 2{文字|もじ}の ことばだよ。'],
    explanation: 'みんなの ための {仕事|しごと}に {使|つか}う ために {集|あつ}める お{金|かね}を「{税金|ぜいきん}」と いいます。{税金|ぜいきん}を {納|おさ}める ことは {国民|こくみん}の {義務|ぎむ}の 1つです。',
    reviewed: true
  },
  {
    id: 'social_g6_history_012', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{長篠|ながしの}の たたかいで {鉄砲|てっぽう}を {効果的|こうかてき}に {使|つか}い、{安土城|あづちじょう}を きずいて {天下統一|てんかとういつ}を めざした {戦国大名|せんごくだいみょう}は だれかな。',
    answer: '織田信長', acceptedAnswers: ['おだのぶなが'], validationMode: 'kana-insensitive',
    hints: ['{尾張|おわり}（{今|いま}の {愛知県|あいちけん}{西部|せいぶ}）の {大名|だいみょう}だよ。', '{楽市|らくいち}・{楽座|らくざ}で {商工業|しょうこうぎょう}を さかんに したよ。'],
    explanation: '{長篠|ながしの}の たたかいで {鉄砲|てっぽう}を {使|つか}い、{安土城|あづちじょう}を きずいたのは「{織田信長|おだのぶなが}」です。{天下統一|てんかとういつ}の とちゅう、{本能寺|ほんのうじ}で たおれました。',
    reviewed: true
  },
  {
    id: 'social_g6_international_001', subject: 'social', gradeLevel: 6, unit: 'international',
    difficulty: 'standard', answerType: 'input',
    question: '2015{年|ねん}に {国際連合|こくさいれんごう}で {決|き}められた、2030{年|ねん}までに {世界|せかい}で {達成|たっせい}を めざす 17の「{持続可能|じぞくかのう}な {開発目標|かいはつもくひょう}」を、アルファベットの {略称|りゃくしょう}で {答|こた}えよう。',
    answer: 'SDGs', acceptedAnswers: ['エスディージーズ'], validationMode: 'exact',
    hints: ['{貧困|ひんこん}を なくす、{地球|ちきゅう}の {環境|かんきょう}を {守|まも}るなどの {目標|もくひょう}が あるよ。', 'アルファベット 4{文字|もじ}だよ（{最後|さいご}の 1{文字|もじ}は {小文字|こもじ}）。'],
    explanation: '「{持続可能|じぞくかのう}な {開発目標|かいはつもくひょう}」は、{英語|えいご}の {頭文字|かしらもじ}から「SDGs（エスディージーズ）」と よばれます。',
    reviewed: true
  },
  {
    id: 'social_g6_history_013', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{平安時代|へいあんじだい}、{娘|むすめ}を {天皇|てんのう}の きさきに して {力|ちから}を のばし、「この{世|よ}をば わが{世|よ}とぞ{思|おも}ふ」という {歌|うた}を よんだ {人物|じんぶつ}は だれかな。',
    choices: ['{藤原道長|ふじわらのみちなが}', '{聖徳太子|しょうとくたいし}', '{源頼朝|みなもとのよりとも}', '{足利尊氏|あしかがたかうじ}'],
    answer: '{藤原道長|ふじわらのみちなが}',
    hints: ['{藤原氏|ふじわらし}が もっとも さかえた ころの {人物|じんぶつ}だよ。', '{天皇|てんのう}に かわって {政治|せいじ}を {動|うご}かしたよ。'],
    explanation: '{藤原道長|ふじわらのみちなが}は {娘|むすめ}を {天皇|てんのう}の きさきに して {力|ちから}を のばし、{藤原氏|ふじわらし}の もっとも さかえた {時代|じだい}を きずきました。',
    inputForm: { acceptedAnswers: ['ふじわらのみちなが', '道長'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_history_014', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{江戸時代|えどじだい}、{大名|だいみょう}に 1{年|ねん}おきに {江戸|えど}と {自分|じぶん}の {領地|りょうち}を {行|い}き{来|き}させた {制度|せいど}は どれかな。',
    choices: ['{参勤交代|さんきんこうたい}', '{鎖国|さこく}', '{刀狩|かたながり}', '{楽市楽座|らくいちらくざ}'],
    answer: '{参勤交代|さんきんこうたい}',
    hints: ['{大名|だいみょう}の {妻|つま}や {子|こ}は {江戸|えど}に すまわせられたよ。', '3{代将軍|だいしょうぐん}{徳川家光|とくがわいえみつ}の ときに {制度|せいど}として {定|さだ}められたよ。'],
    explanation: '{大名|だいみょう}が 1{年|ねん}おきに {江戸|えど}と {領地|りょうち}を {行|い}き{来|き}する {制度|せいど}を「{参勤交代|さんきんこうたい}」と いいます。{大名|だいみょう}には {大|おお}きな {出費|しゅっぴ}と なり、{幕府|ばくふ}が {大名|だいみょう}を おさえる {力|ちから}に なりました。',
    inputForm: { question: '{江戸時代|えどじだい}、{大名|だいみょう}に 1{年|ねん}おきに {江戸|えど}と {自分|じぶん}の {領地|りょうち}を {行|い}き{来|き}させた 制度を 何と いうかな。', acceptedAnswers: ['さんきんこうたい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_politics_005', subject: 'social', gradeLevel: 6, unit: 'politics',
    difficulty: 'standard', answerType: 'choice',
    question: '{内閣総理大臣|ないかくそうりだいじん}を {指名|しめい}するのは どこかな。',
    choices: ['{国会|こっかい}', '{最高裁判所|さいこうさいばんしょ}', '{都道府県|とどうふけん}の {知事|ちじ}', '{国民|こくみん}の {直接選挙|ちょくせつせんきょ}'],
    answer: '{国会|こっかい}',
    hints: ['{国会議員|こっかいぎいん}の {中|なか}から えらばれるよ。', '{国民|こくみん}が {直接|ちょくせつ} えらぶ わけでは ないよ。'],
    explanation: '{内閣総理大臣|ないかくそうりだいじん}は、{国会|こっかい}が {国会議員|こっかいぎいん}の {中|なか}から {指名|しめい}し、{天皇|てんのう}が {任命|にんめい}します。',
    inputForm: { acceptedAnswers: ['こっかい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_history_015', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '1945{年|ねん}8{月|がつ}6{日|か}に、{世界|せかい}で はじめて {原子爆弾|げんしばくだん}が {投下|とうか}された {都市|とし}は どこかな。',
    choices: ['{広島|ひろしま}', '{長崎|ながさき}', '{東京|とうきょう}', '{那覇|なは}'],
    answer: '{広島|ひろしま}',
    hints: ['8{月|がつ}9{日|か}には {長崎|ながさき}にも {投下|とうか}されたよ。', '{原爆|げんばく}ドームが {世界遺産|せかいいさん}に なって いるよ。'],
    explanation: '1945{年|ねん}8{月|がつ}6{日|か}に {広島|ひろしま}、8{月|がつ}9{日|か}に {長崎|ながさき}に {原子爆弾|げんしばくだん}が {投下|とうか}され、{多|おお}くの {人々|ひとびと}が なくなりました。{広島|ひろしま}の {原爆|げんばく}ドームは {世界遺産|せかいいさん}です。',
    inputForm: { acceptedAnswers: ['ひろしま', '広島市'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_history_016', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '{明治時代|めいじじだい}の はじめ、れんがづくりの {建物|たてもの}や ガス{灯|とう}、{洋服|ようふく}など、{西洋|せいよう}の {文化|ぶんか}が {取|と}り{入|い}れられて くらしが {大|おお}きく {変|か}わった ことを {何|なん}と いうかな。',
    answer: '文明開化', acceptedAnswers: ['ぶんめいかいか'], validationMode: 'kana-insensitive',
    hints: ['「ざんぎり{頭|あたま}を たたいて みれば、○○○○の {音|おと}が する」と うたわれたよ。', '「ぶんめい」から はじまる ことばだよ。'],
    explanation: '{西洋|せいよう}の {文化|ぶんか}が {取|と}り{入|い}れられ、くらしが {変|か}わった ことを「{文明開化|ぶんめいかいか}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g6_politics_006', subject: 'social', gradeLevel: 6, unit: 'politics',
    difficulty: 'advanced', answerType: 'input',
    question: '{都道府県|とどうふけん}の {政治|せいじ}の {中心|ちゅうしん}と なる {人|ひと}で、{住民|じゅうみん}の {選挙|せんきょ}で えらばれる {人|ひと}を {何|なん}と いうかな。',
    answer: '知事', acceptedAnswers: ['ちじ', '都道府県知事', 'とどうふけんちじ'], validationMode: 'kana-insensitive',
    hints: ['{市|し}の {場合|ばあい}は「{市長|しちょう}」だね。', '「ち」から はじまる 2{文字|もじ}の ことばだよ。'],
    explanation: '{都道府県|とどうふけん}の {政治|せいじ}の {中心|ちゅうしん}と なるのは「{知事|ちじ}」で、{住民|じゅうみん}の {選挙|せんきょ}で えらばれます。',
    reviewed: true
  },
  {
    id: 'social_g6_history_017', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '{室町時代|むろまちじだい}に {観阿弥|かんあみ}・{世阿弥|ぜあみ}の {親子|おやこ}が {大成|たいせい}し、{今|いま}に {受|う}けつがれて いる {芸能|げいのう}は どれかな。',
    choices: ['{能|のう}', '{歌舞伎|かぶき}', '{人形浄瑠璃|にんぎょうじょうるり}', '{落語|らくご}'],
    answer: '{能|のう}',
    hints: ['{面|めん}を つけて {舞|ま}う {芸能|げいのう}だよ。', '{歌舞伎|かぶき}や {人形浄瑠璃|にんぎょうじょうるり}は {江戸時代|えどじだい}に さかんに なったよ。'],
    explanation: '{観阿弥|かんあみ}・{世阿弥|ぜあみ}が {大成|たいせい}したのは「{能|のう}」です。{能|のう}の {合間|あいま}に {演|えん}じられる {狂言|きょうげん}も この ころ {広|ひろ}まりました。',
    inputForm: { question: '{室町時代|むろまちじだい}に {観阿弥|かんあみ}・{世阿弥|ぜあみ}の {親子|おやこ}が {大成|たいせい}し、{今|いま}に {受|う}けつがれて いる 芸能は 何かな。', acceptedAnswers: ['のう', '能楽', 'のうがく'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g6_history_018', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '1964{年|ねん}、{東海道新幹線|とうかいどうしんかんせん}の {開通|かいつう}と {同|おな}じ {年|とし}に、{日本|にほん}で はじめて {開|ひら}かれた {国際的|こくさいてき}な スポーツ{大会|たいかい}は どれかな。',
    choices: ['{東京|とうきょう}オリンピック', '{大阪|おおさか}{万国博覧会|ばんこくはくらんかい}', '{長野|ながの}オリンピック', 'サッカーの ワールドカップ'],
    answer: '{東京|とうきょう}オリンピック',
    hints: ['アジアで はじめて {開|ひら}かれた オリンピックだよ。', '{大阪|おおさか}{万国博覧会|ばんこくはくらんかい}は 1970{年|ねん}だね。'],
    explanation: '1964{年|ねん}に {東京|とうきょう}オリンピックが {開|ひら}かれ、{同|おな}じ {年|とし}に {東海道新幹線|とうかいどうしんかんせん}も {開通|かいつう}しました。{日本|にほん}の {経済|けいざい}が {大|おお}きく {成長|せいちょう}した {時期|じき}の {出来事|できごと}です。',
    inputForm: { question: '1964{年|ねん}、{東海道新幹線|とうかいどうしんかんせん}の {開通|かいつう}と {同|おな}じ {年|とし}に、{日本|にほん}で はじめて {開|ひら}かれた {国際的|こくさいてき}な スポーツ大会は 何かな。', acceptedAnswers: ['東京五輪', 'とうきょうおりんぴっく', 'オリンピック'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv7（中学1年） =====
  {
    id: 'social_g7_world_001', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'basic', answerType: 'choice',
    question: '{世界|せかい}の {六大陸|ろくたいりく}の うち、{面積|めんせき}が もっとも {広|ひろ}い {大陸|たいりく}は どれか。',
    choices: ['ユーラシア{大陸|たいりく}', 'アフリカ{大陸|たいりく}', '{北|きた}アメリカ{大陸|たいりく}', '{南極大陸|なんきょくたいりく}'],
    answer: 'ユーラシア{大陸|たいりく}',
    hints: ['ヨーロッパと アジアを ふくむ {大陸|たいりく}。', '{日本|にほん}の {西|にし}に {広|ひろ}がって いる。'],
    explanation: 'もっとも {広|ひろ}いのは、ヨーロッパと アジアから なる「ユーラシア{大陸|たいりく}」です。2{番目|ばんめ}は アフリカ{大陸|たいりく}です。',
    inputForm: { question: '{世界|せかい}の {六大陸|ろくたいりく}の うち、{面積|めんせき}が もっとも {広|ひろ}い 大陸は 何か。', acceptedAnswers: ['ユーラシア'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_world_002', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'basic', answerType: 'input',
    question: '{三大洋|さんたいよう}の うち、もっとも {面積|めんせき}が {広|ひろ}い {海洋|かいよう}を {何|なん}と いうか。',
    answer: '太平洋', acceptedAnswers: ['たいへいよう'], validationMode: 'kana-insensitive',
    hints: ['{三大洋|さんたいよう}は {太平洋|たいへいよう}・{大西洋|たいせいよう}・インド{洋|よう}。', '{日本|にほん}の {東|ひがし}に {広|ひろ}がる {海洋|かいよう}。'],
    explanation: 'もっとも {広|ひろ}い {海洋|かいよう}は「{太平洋|たいへいよう}」で、{地球|ちきゅう}の {表面|ひょうめん}の {約|やく}3{分|ぶん}の1を しめます。',
    reviewed: true
  },
  {
    id: 'social_g7_world_003', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: '{経度|けいど}0{度|ど}の {経線|けいせん}（{本初子午線|ほんしょしごせん}）が {通|とお}る、イギリスの {首都|しゅと}は どこか。',
    answer: 'ロンドン', validationMode: 'kana-insensitive',
    hints: ['{旧|きゅう}グリニッジ{天文台|てんもんだい}が ある {都市|とし}。', 'テムズ{川|がわ}が {流|なが}れる {都市|とし}。'],
    explanation: '{本初子午線|ほんしょしごせん}は、イギリスの {首都|しゅと}「ロンドン」の {旧|きゅう}グリニッジ{天文台|てんもんだい}を {通|とお}ります。',
    reviewed: true
  },
  {
    id: 'social_g7_world_004', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: '{日本|にほん}の {標準時子午線|ひょうじゅんじしごせん}は {東経|とうけい}{何度|なんど}か。{数|かず}で {答|こた}えなさい。',
    answer: '135', acceptedAnswers: ['135度', '東経135度'], validationMode: 'number',
    hints: ['{兵庫県|ひょうごけん}の {明石市|あかしし}を {通|とお}る {経線|けいせん}。', '15の {倍数|ばいすう}に なって いる。'],
    explanation: '{日本|にほん}の {標準時子午線|ひょうじゅんじしごせん}は {兵庫県|ひょうごけん}{明石市|あかしし}を {通|とお}る {東経|とうけい}135{度|ど}の {経線|けいせん}です。',
    reviewed: true
  },
  {
    id: 'social_g7_world_005', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: '{地球|ちきゅう}は 24{時間|じかん}で 360{度|ど} {自転|じてん}する。{経度|けいど}が {何度|なんど} ちがうと、1{時間|じかん}の {時差|じさ}が {生|しょう}じるか。{数|かず}で {答|こた}えなさい。',
    answer: '15', acceptedAnswers: ['15度'], validationMode: 'number',
    hints: ['360{度|ど}を 24{時間|じかん}で わる。', '360÷24 を {計算|けいさん}する。'],
    explanation: '360÷24＝15 なので、{経度|けいど}が 15{度|ど} ちがうと 1{時間|じかん}の {時差|じさ}が {生|しょう}じます。',
    reviewed: true
  },
  {
    id: 'social_g7_history_001', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '645{年|ねん}、{中臣鎌足|なかとみのかまたり}と ともに {蘇我氏|そがし}を たおし、{大化|たいか}の{改新|かいしん}と よばれる {政治改革|せいじかいかく}を {始|はじ}めた {人物|じんぶつ}は だれか。',
    choices: ['{中大兄皇子|なかのおおえのおうじ}', '{聖武天皇|しょうむてんのう}', '{桓武天皇|かんむてんのう}', '{藤原道長|ふじわらのみちなが}'],
    answer: '{中大兄皇子|なかのおおえのおうじ}',
    hints: ['のちに {天智天皇|てんじてんのう}と なった {人物|じんぶつ}。', '{土地|とち}と {人民|じんみん}を {国|くに}の ものと する {公地公民|こうちこうみん}の {方針|ほうしん}を しめした。'],
    explanation: '{中大兄皇子|なかのおおえのおうじ}は {中臣鎌足|なかとみのかまたり}と ともに {蘇我氏|そがし}を たおし、{大化|たいか}の{改新|かいしん}を {始|はじ}めました。のちに {天智天皇|てんじてんのう}と なりました。',
    inputForm: { acceptedAnswers: ['なかのおおえのおうじ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_world_006', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'choice',
    question: '{赤道|せきどう}の {付近|ふきん}に {広|ひろ}がり、1{年|ねん}{中|じゅう} {気温|きおん}が {高|たか}く、{雨|あめ}の {多|おお}い {地域|ちいき}が ふくまれる {気候帯|きこうたい}は どれか。',
    choices: ['{熱帯|ねったい}', '{乾燥帯|かんそうたい}', '{温帯|おんたい}', '{冷帯|れいたい}（{亜寒帯|あかんたい}）'],
    answer: '{熱帯|ねったい}',
    hints: ['{熱帯雨林|ねったいうりん}が しげる {地域|ちいき}が ある。', '{赤道|せきどう}の {近|ちか}くは {太陽|たいよう}の {光|ひかり}を ほぼ {真上|まうえ}から {受|う}ける。'],
    explanation: '{赤道|せきどう}の {付近|ふきん}は「{熱帯|ねったい}」で、1{年|ねん}{中|じゅう} {気温|きおん}が {高|たか}く、{雨|あめ}の {多|おお}い {地域|ちいき}には {熱帯雨林|ねったいうりん}が {広|ひろ}がります。',
    inputForm: { question: '{赤道|せきどう}の {付近|ふきん}に {広|ひろ}がり、1{年|ねん}{中|じゅう} {気温|きおん}が {高|たか}く、{雨|あめ}の {多|おお}い {地域|ちいき}が ふくまれる 気候帯は 何か。', acceptedAnswers: ['ねったい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_history_002', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '{鎌倉幕府|かまくらばくふ}で、{将軍|しょうぐん}が {御家人|ごけにん}の {領地|りょうち}を {保護|ほご}したり {新|あたら}しい {領地|りょうち}を {与|あた}えたり する ことを「{御恩|ごおん}」と いう。これに {対|たい}して、{御家人|ごけにん}が {将軍|しょうぐん}の ために {戦|たたか}ったり {警備|けいび}を したり する ことを {何|なん}と いうか。',
    answer: '奉公', acceptedAnswers: ['ほうこう'], validationMode: 'kana-insensitive',
    hints: ['「{御恩|ごおん}と ○○」で セットに なる {言葉|ことば}。', '「いざ{鎌倉|かまくら}」の {精神|せいしん}。「ほう」から {始|はじ}まる。'],
    explanation: '{御家人|ごけにん}が {将軍|しょうぐん}に つくす ことを「{奉公|ほうこう}」と いいます。{土地|とち}を なかだちに した「{御恩|ごおん}と{奉公|ほうこう}」の {関係|かんけい}で、{将軍|しょうぐん}と {御家人|ごけにん}は {結|むす}ばれて いました。',
    reviewed: true
  },
  {
    id: 'social_g7_history_003', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '743{年|ねん}に {出|だ}された、{新|あたら}しく {開墾|かいこん}した {土地|とち}を {永久|えいきゅう}に {私有|しゆう}する ことを {認|みと}めた {法|ほう}は どれか。',
    choices: ['{墾田永年私財法|こんでんえいねんしざいのほう}', '{班田収授法|はんでんしゅうじゅのほう}', '{武家諸法度|ぶけしょはっと}', '{御成敗式目|ごせいばいしきもく}'],
    answer: '{墾田永年私財法|こんでんえいねんしざいのほう}',
    hints: ['「{墾田|こんでん}」は {新|あたら}しく {開墾|かいこん}した {田|た}、「{永年|えいねん}」は {永久|えいきゅう}に、の {意味|いみ}。', '{公地公民|こうちこうみん}の {原則|げんそく}が くずれる きっかけに なった。'],
    explanation: '{墾田永年私財法|こんでんえいねんしざいのほう}で {開墾|かいこん}した {土地|とち}の {永久|えいきゅう}の {私有|しゆう}が {認|みと}められ、のちの {荘園|しょうえん}の もとに なりました。{班田収授法|はんでんしゅうじゅのほう}は {口分田|くぶんでん}を {与|あた}える しくみ、{武家諸法度|ぶけしょはっと}は {江戸幕府|えどばくふ}、{御成敗式目|ごせいばいしきもく}は {鎌倉幕府|かまくらばくふ}の きまりです。',
    inputForm: { question: '743{年|ねん}に {出|だ}された、{新|あたら}しく {開墾|かいこん}した {土地|とち}を {永久|えいきゅう}に {私有|しゆう}する ことを {認|みと}めた 法を 何と いうか。', acceptedAnswers: ['こんでんえいねんしざいほう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g7_world_007', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'basic', answerType: 'choice',
    question: '{赤道|せきどう}の {緯度|いど}は {何度|なんど}か。',
    choices: ['0{度|ど}', '90{度|ど}', '180{度|ど}', '45{度|ど}'],
    answer: '0{度|ど}',
    hints: ['{緯度|いど}は {赤道|せきどう}を {基準|きじゅん}に して、{南北|なんぼく}に はかる。', '{北極点|ほっきょくてん}の {緯度|いど}は {北緯|ほくい}90{度|ど}。'],
    explanation: '{緯度|いど}は {赤道|せきどう}を 0{度|ど}として、{南北|なんぼく}それぞれ 90{度|ど}まで はかります。{北極点|ほっきょくてん}は {北緯|ほくい}90{度|ど}、{南極点|なんきょくてん}は {南緯|なんい}90{度|ど}です。',
    inputForm: { answer: '0', acceptedAnswers: ['0度', '0°'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_history_004', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'basic', answerType: 'choice',
    question: 'ナイル{川|がわ}の {流域|りゅういき}で おこり、ピラミッドや {象形文字|しょうけいもじ}で {知|し}られる {古代文明|こだいぶんめい}は どれか。',
    choices: ['エジプト{文明|ぶんめい}', 'メソポタミア{文明|ぶんめい}', 'インダス{文明|ぶんめい}', '{中国文明|ちゅうごくぶんめい}'],
    answer: 'エジプト{文明|ぶんめい}',
    hints: ['ナイル{川|がわ}は アフリカ{大陸|たいりく}の {北東部|ほくとうぶ}を {流|なが}れる。', 'メソポタミア{文明|ぶんめい}は チグリス{川|がわ}・ユーフラテス{川|がわ}の {流域|りゅういき}。'],
    explanation: 'ナイル{川|がわ}の {流域|りゅういき}で おこったのは エジプト{文明|ぶんめい}です。{川|かわ}の はんらんの {時期|じき}を {知|し}る ために {太陽暦|たいようれき}が つくられ、{王|おう}の {墓|はか}と される ピラミッドが {建|た}てられました。',
    inputForm: { question: 'ナイル{川|がわ}の {流域|りゅういき}で おこり、ピラミッドや {象形文字|しょうけいもじ}で {知|し}られる 古代文明は 何か。', acceptedAnswers: ['えじぷとぶんめい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_world_008', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'basic', answerType: 'input',
    question: 'EU（ヨーロッパ{連合|れんごう}）の {多|おお}くの {加盟国|かめいこく}で {使|つか}われて いる {共通|きょうつう}の {通貨|つうか}を カタカナで {答|こた}えなさい。',
    answer: 'ユーロ', acceptedAnswers: ['ゆーろ'], validationMode: 'kana-insensitive',
    hints: ['{国境|こっきょう}を こえて {同|おな}じ お{金|かね}が {使|つか}えるので、{貿易|ぼうえき}や {旅行|りょこう}が しやすく なった。', 'カタカナ 3{文字|もじ}。'],
    explanation: 'EUの {多|おお}くの {加盟国|かめいこく}では、{共通通貨|きょうつうつうか}「ユーロ」が {使|つか}われて います。',
    reviewed: true
  },
  {
    id: 'social_g7_history_005', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'basic', answerType: 'input',
    question: '3{世紀|せいき}ごろ、30ほどの {国|くに}を したがえ、{中国|ちゅうごく}の {魏|ぎ}に {使|つか}いを {送|おく}ったと される {邪馬台国|やまたいこく}の {女王|じょおう}は だれか。',
    answer: '卑弥呼', acceptedAnswers: ['ひみこ'], validationMode: 'kana-insensitive',
    hints: ['{中国|ちゅうごく}の {歴史書|れきししょ}『{魏志|ぎし}』{倭人伝|わじんでん}に {書|か}かれて いる。', '{魏|ぎ}の {皇帝|こうてい}から「{親魏倭王|しんぎわおう}」の {称号|しょうごう}を {受|う}けた。'],
    explanation: '{邪馬台国|やまたいこく}の {女王|じょおう}は「{卑弥呼|ひみこ}」です。まじないに よって {政治|せいじ}を {行|おこな}ったと されます。',
    reviewed: true
  },
  {
    id: 'social_g7_world_009', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: 'アメリカ{合衆国|がっしゅうこく}の サンフランシスコ{近郊|きんこう}に ある、ICT（{情報通信技術|じょうほうつうしんぎじゅつ}）{関連|かんれん}の {企業|きぎょう}が {多|おお}く {集|あつ}まる {地域|ちいき}を {何|なん}と いうか。カタカナで {答|こた}えなさい。',
    answer: 'シリコンバレー', acceptedAnswers: ['しりこんばれー'], validationMode: 'kana-insensitive',
    hints: ['{半導体|はんどうたい}の {材料|ざいりょう}の {名前|なまえ}が つく。', '「バレー」は {谷|たに}の こと。'],
    explanation: 'サンフランシスコの {近郊|きんこう}に ある ICT{関連|かんれん}の {企業|きぎょう}が {集|あつ}まる {地域|ちいき}を「シリコンバレー」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g7_world_010', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: 'オーストラリアの {先住民|せんじゅうみん}を {何|なん}と いうか。カタカナで {答|こた}えなさい。',
    answer: 'アボリジニ', acceptedAnswers: ['アボリジニー', 'あぼりじに', 'あぼりじにー'], validationMode: 'kana-insensitive',
    hints: ['ニュージーランドの {先住民|せんじゅうみん}は「マオリ」。', '「ア」から {始|はじ}まる。'],
    explanation: 'オーストラリアの {先住民|せんじゅうみん}は「アボリジニ」です。オーストラリアは かつて ヨーロッパ{系|けい}{以外|いがい}の {移民|いみん}を {制限|せいげん}して いましたが（{白豪主義|はくごうしゅぎ}）、{現在|げんざい}は {多文化社会|たぶんかしゃかい}を めざして います。',
    reviewed: true
  },
  {
    id: 'social_g7_history_006', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{聖徳太子|しょうとくたいし}（{厩戸皇子|うまやどのおうじ}）らが、{家柄|いえがら}に とらわれず、{才能|さいのう}や {功績|こうせき}の ある {人|ひと}を {役人|やくにん}に {取|と}り{立|た}てる ために {定|さだ}めた {制度|せいど}を {何|なん}と いうか。',
    answer: '冠位十二階', answerDisplay: '{冠位十二階|かんいじゅうにかい}', acceptedAnswers: ['かんいじゅうにかい', '冠位十二階の制'], validationMode: 'kana-insensitive',
    hints: ['かんむりの {色|いろ}などで {位|くらい}を {区別|くべつ}した。', '{位|くらい}の {数|かず}が {名前|なまえ}に ついて いる。'],
    explanation: '「{冠位十二階|かんいじゅうにかい}」は、{才能|さいのう}や {功績|こうせき}の ある {人|ひと}を {役人|やくにん}に {取|と}り{立|た}てる ために {定|さだ}められました。{同|おな}じ ころ、{役人|やくにん}の {心|こころ}がまえを しめす {十七条|じゅうしちじょう}の{憲法|けんぽう}も {定|さだ}められました。',
    reviewed: true
  },
  {
    id: 'social_g7_history_007', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '794{年|ねん}、{都|みやこ}を {京都|きょうと}の {平安京|へいあんきょう}に {移|うつ}した {天皇|てんのう}は だれか。',
    answer: '桓武天皇', acceptedAnswers: ['かんむてんのう', '桓武'], validationMode: 'kana-insensitive',
    hints: ['{仏教|ぶっきょう}の {勢力|せいりょく}が {政治|せいじ}に かかわるのを おさえ、{政治|せいじ}を {立|た}て{直|なお}そうと した。', '{坂上田村麻呂|さかのうえのたむらまろ}を {征夷大将軍|せいいたいしょうぐん}に して {東北地方|とうほくちほう}に {送|おく}った。'],
    explanation: '794{年|ねん}に {平安京|へいあんきょう}に {都|みやこ}を {移|うつ}したのは「{桓武天皇|かんむてんのう}」です。ここから {約|やく}400{年|ねん}の {平安時代|へいあんじだい}が {始|はじ}まりました。',
    reviewed: true
  },
  {
    id: 'social_g7_history_008', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '13{世紀|せいき}{後半|こうはん}、{元|げん}（モンゴル）の {軍|ぐん}が 2{度|ど}に わたって {九州北部|きゅうしゅうほくぶ}に せめて きた（{元寇|げんこう}）ときの、{鎌倉幕府|かまくらばくふ}の {執権|しっけん}は だれか。',
    answer: '北条時宗', acceptedAnswers: ['ほうじょうときむね'], validationMode: 'kana-insensitive',
    hints: ['{元|げん}の {皇帝|こうてい}フビライ・ハンの {要求|ようきゅう}を しりぞけた。', '「ほうじょう」から {始|はじ}まる。'],
    explanation: '{元寇|げんこう}（{文永|ぶんえい}の{役|えき}・{弘安|こうあん}の{役|えき}）の ときの {執権|しっけん}は「{北条時宗|ほうじょうときむね}」です。{御家人|ごけにん}は よく {戦|たたか}いましたが、{十分|じゅうぶん}な {恩賞|おんしょう}を {得|え}られず、{幕府|ばくふ}への {不満|ふまん}が {高|たか}まりました。',
    reviewed: true
  },
  {
    id: 'social_g7_world_011', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: '{南|みなみ}アメリカ{州|しゅう}の {多|おお}くの {国|くに}で {公用語|こうようご}と されて いる、ヨーロッパの {言語|げんご}は {何|なに}か。（ブラジルでは ない {国|くに}の {多|おお}く）',
    answer: 'スペイン語', acceptedAnswers: ['スペインご', 'すぺいんご', 'スペイン'], validationMode: 'kana-insensitive',
    hints: ['16{世紀|せいき}ごろから、この {国|くに}が {南|みなみ}アメリカの {多|おお}くを {植民地|しょくみんち}に した。', 'ブラジルの {公用語|こうようご}は ポルトガル{語|ご}。'],
    explanation: '{南|みなみ}アメリカの {多|おお}くの {国|くに}では、かつて {植民地|しょくみんち}に した スペインの {言語|げんご}「スペイン{語|ご}」が {公用語|こうようご}です。ブラジルは ポルトガルの {植民地|しょくみんち}だったので、ポルトガル{語|ご}が {公用語|こうようご}です。',
    reviewed: true
  },
  {
    id: 'social_g7_world_012', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'choice',
    question: 'ブラジルの {公用語|こうようご}は どれか。',
    choices: ['ポルトガル{語|ご}', 'スペイン{語|ご}', '{英語|えいご}', 'フランス{語|ご}'],
    answer: 'ポルトガル{語|ご}',
    hints: ['ブラジルは かつて ある ヨーロッパの {国|くに}の {植民地|しょくみんち}だった。', '{南|みなみ}アメリカの ほかの {多|おお}くの {国|くに}とは ちがう {言語|げんご}。'],
    explanation: 'ブラジルは かつて ポルトガルの {植民地|しょくみんち}だったので、{公用語|こうようご}は ポルトガル{語|ご}です。',
    inputForm: { question: 'ブラジルの 公用語は 何か。', acceptedAnswers: ['ポルトガル'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_world_013', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'choice',
    question: '{夏|なつ}は {乾燥|かんそう}して {気温|きおん}が {高|たか}く、{冬|ふゆ}に {雨|あめ}が {多|おお}い、オリーブや ぶどうの {栽培|さいばい}に {適|てき}した {気候|きこう}は どれか。',
    choices: ['{地中海性気候|ちちゅうかいせいきこう}', '{西岸海洋性気候|せいがんかいようせいきこう}', '{温暖湿潤気候|おんだんしつじゅんきこう}', 'ステップ{気候|きこう}'],
    answer: '{地中海性気候|ちちゅうかいせいきこう}',
    hints: ['ヨーロッパの {南部|なんぶ}、イタリアや スペインなどに {見|み}られる。', '{夏|なつ}の {乾燥|かんそう}に {強|つよ}い {作物|さくもつ}が {育|そだ}てられる。'],
    explanation: '{夏|なつ}に {乾燥|かんそう}し、{冬|ふゆ}に {雨|あめ}が {多|おお}いのは「{地中海性気候|ちちゅうかいせいきこう}」です。{夏|なつ}は オリーブや ぶどうなどの {果樹|かじゅ}、{冬|ふゆ}は {小麦|こむぎ}を つくる {地中海式農業|ちちゅうかいしきのうぎょう}が {行|おこな}われます。',
    inputForm: { question: '{夏|なつ}は {乾燥|かんそう}して {気温|きおん}が {高|たか}く、{冬|ふゆ}に {雨|あめ}が {多|おお}い、オリーブや ぶどうの {栽培|さいばい}に {適|てき}した 気候を 何と いうか。', acceptedAnswers: ['ちちゅうかいせいきこう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_history_009', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{応仁|おうにん}の{乱|らん}の あと {広|ひろ}がった、{身分|みぶん}の {下|した}の {者|もの}が {実力|じつりょく}で {上|うえ}の {者|もの}に {打|う}ち{勝|か}って {地位|ちい}を うばう {風潮|ふうちょう}を {何|なん}と いうか。',
    choices: ['{下剋上|げこくじょう}', '{一揆|いっき}', '{御恩|ごおん}と {奉公|ほうこう}', '{惣|そう}'],
    answer: '{下剋上|げこくじょう}',
    hints: ['「{下|した}が {上|うえ}に {剋|か}つ」と {書|か}く。', 'この {風潮|ふうちょう}の {中|なか}で {戦国大名|せんごくだいみょう}が {登場|とうじょう}した。'],
    explanation: '{実力|じつりょく}の ある {者|もの}が {上|うえ}の {身分|みぶん}の {者|もの}を たおす {風潮|ふうちょう}を「{下剋上|げこくじょう}」と いいます。この {中|なか}で、{各地|かくち}に {戦国大名|せんごくだいみょう}が {現|あらわ}れました。',
    inputForm: { acceptedAnswers: ['げこくじょう', '下克上'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_world_014', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'choice',
    question: '{中国|ちゅうごく}で 1979{年|ねん}から 2015{年|ねん}ごろまで {行|おこな}われた、{人口|じんこう}の {増加|ぞうか}を おさえる ための {政策|せいさく}は どれか。',
    choices: ['{一人|ひとり}っ{子政策|こせいさく}', '{経済特区|けいざいとっく}', '{白豪主義|はくごうしゅぎ}', 'アパルトヘイト'],
    answer: '{一人|ひとり}っ{子政策|こせいさく}',
    hints: ['{夫婦|ふうふ}が もつ {子|こ}どもの {数|かず}を {原則|げんそく} 1{人|り}に した。', '{経済特区|けいざいとっく}は、{外国企業|がいこくきぎょう}を まねく ために {設|もう}けた {地区|ちく}。'],
    explanation: '{中国|ちゅうごく}では {人口|じんこう}の {急増|きゅうぞう}を おさえる ため「{一人|ひとり}っ{子政策|こせいさく}」が {行|おこな}われました。{少子高齢化|しょうしこうれいか}が {進|すす}んだ ため、{現在|げんざい}は {廃止|はいし}されて います。',
    inputForm: { question: '{中国|ちゅうごく}で 1979{年|ねん}から 2015{年|ねん}ごろまで {行|おこな}われた、{人口|じんこう}の {増加|ぞうか}を おさえる ための 政策を 何と いうか。', acceptedAnswers: ['ひとりっこせいさく', '一人っ子'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_world_015', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'advanced', answerType: 'input',
    question: 'タイ・インドネシア・ベトナムなど、{東南|とうなん}アジアの {国々|くにぐに}が {経済|けいざい}や {政治|せいじ}で {協力|きょうりょく}する ために つくった {地域協力機構|ちいききょうりょくきこう}を、アルファベットの {略称|りゃくしょう}で {答|こた}えなさい。',
    answer: 'ASEAN', acceptedAnswers: ['アセアン', 'あせあん'], validationMode: 'exact',
    hints: ['{日本語|にほんご}の {名前|なまえ}は「{東南|とうなん}アジア{諸国連合|しょこくれんごう}」。', 'アルファベット 5{文字|もじ}。'],
    explanation: '{東南|とうなん}アジア{諸国連合|しょこくれんごう}は、{英語|えいご}の {頭文字|かしらもじ}から「ASEAN（アセアン）」と よばれます。',
    reviewed: true
  },
  {
    id: 'social_g7_history_010', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '1232{年|ねん}、{武士|ぶし}の {社会|しゃかい}の {慣習|かんしゅう}に もとづいて、{裁判|さいばん}の {基準|きじゅん}と なる {御成敗式目|ごせいばいしきもく}（{貞永式目|じょうえいしきもく}）を {定|さだ}めた {鎌倉幕府|かまくらばくふ}の {執権|しっけん}は だれか。',
    answer: '北条泰時', acceptedAnswers: ['ほうじょうやすとき'], validationMode: 'kana-insensitive',
    hints: ['3{代|だい}{執権|しっけん}。', '「ほうじょう」から {始|はじ}まる。{元寇|げんこう}の ときの {執権|しっけん}とは ちがう。'],
    explanation: '{御成敗式目|ごせいばいしきもく}を {定|さだ}めたのは 3{代|だい}{執権|しっけん}「{北条泰時|ほうじょうやすとき}」です。{武士|ぶし}に よる はじめての {法律|ほうりつ}で、{長|なが}く {武家|ぶけ}の {法律|ほうりつ}の {手本|てほん}と されました。',
    reviewed: true
  },
  {
    id: 'social_g7_world_016', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'advanced', answerType: 'choice',
    question: 'EU（ヨーロッパ{連合|れんごう}）の {本部|ほんぶ}が {置|お}かれて いる {都市|とし}は どれか。',
    choices: ['ブリュッセル', 'パリ', 'ベルリン', 'ジュネーブ'],
    answer: 'ブリュッセル',
    hints: ['ベルギーの {首都|しゅと}。', 'ジュネーブ（スイス）には {国際連合|こくさいれんごう}の {機関|きかん}が {多|おお}く {置|お}かれて いる。'],
    explanation: 'EUの {本部|ほんぶ}は ベルギーの {首都|しゅと} ブリュッセルに {置|お}かれて います。',
    inputForm: { question: 'EU（ヨーロッパ{連合|れんごう}）の {本部|ほんぶ}が {置|お}かれて いる 都市は どこか。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g7_history_011', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '701{年|ねん}、{唐|とう}の {法律|ほうりつ}に ならって {定|さだ}められ、{天皇|てんのう}を {中心|ちゅうしん}と する {国|くに}の しくみを {整|ととの}えた {法律|ほうりつ}は どれか。',
    choices: ['{大宝律令|たいほうりつりょう}', '{御成敗式目|ごせいばいしきもく}', '{武家諸法度|ぶけしょはっと}', '{十七条|じゅうしちじょう}の{憲法|けんぽう}'],
    answer: '{大宝律令|たいほうりつりょう}',
    hints: ['「{律|りつ}」は {刑罰|けいばつ}の きまり、「{令|りょう}」は {政治|せいじ}の きまり。', '{元号|げんごう}の {名前|なまえ}が ついて いる。'],
    explanation: '701{年|ねん}に {定|さだ}められた「{大宝律令|たいほうりつりょう}」に よって、{天皇|てんのう}を {中心|ちゅうしん}と する {律令国家|りつりょうこっか}の しくみが {整|ととの}えられました。',
    inputForm: { question: '701{年|ねん}、{唐|とう}の {法律|ほうりつ}に ならって {定|さだ}められ、{天皇|てんのう}を {中心|ちゅうしん}と する {国|くに}の しくみを {整|ととの}えた 法律を 何と いうか。', acceptedAnswers: ['たいほうりつりょう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv8（中学2年） =====
  {
    id: 'social_g8_history_001', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'basic', answerType: 'choice',
    question: '{江戸時代|えどじだい}、{鎖国|さこく}の {体制|たいせい}が {固|かた}まった あと、{長崎|ながさき}の {出島|でじま}に {商館|しょうかん}を {置|お}いて {日本|にほん}との {貿易|ぼうえき}を {続|つづ}けた ヨーロッパの {国|くに}は どれか。',
    choices: ['オランダ', 'ポルトガル', 'スペイン', 'イギリス'],
    answer: 'オランダ',
    hints: ['キリスト{教|きょう}の {布教|ふきょう}を {行|おこな}わなかった {国|くに}。', 'この {国|くに}の {言葉|ことば}で {西洋|せいよう}の {学問|がくもん}を {学|まな}ぶ「{蘭学|らんがく}」が {生|う}まれた。'],
    explanation: 'ポルトガル{船|せん}の {来航|らいこう}が {禁止|きんし}された あと、1641{年|ねん}に オランダの {商館|しょうかん}が {長崎|ながさき}の {出島|でじま}に {移|うつ}され、{鎖国|さこく}の {間|あいだ}、ヨーロッパの {国|くに}で {日本|にほん}との {貿易|ぼうえき}を {続|つづ}けたのは、キリスト{教|きょう}の {布教|ふきょう}を {行|おこな}わなかった オランダでした。{長崎|ながさき}では {中国|ちゅうごく}とも {貿易|ぼうえき}が {行|おこな}われ、ほかに {対馬藩|つしまはん}を {通|つう}じて {朝鮮|ちょうせん}、{薩摩藩|さつまはん}を {通|つう}じて {琉球|りゅうきゅう}、{松前藩|まつまえはん}を {通|つう}じて アイヌの {人々|ひとびと}とも {交流|こうりゅう}が ありました。',
    inputForm: { question: '{江戸時代|えどじだい}、{鎖国|さこく}の {体制|たいせい}が {固|かた}まった あと、{長崎|ながさき}の {出島|でじま}に {商館|しょうかん}を {置|お}いて {日本|にほん}との {貿易|ぼうえき}を {続|つづ}けた ヨーロッパの 国は どこか。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_japan_001', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'basic', answerType: 'input',
    question: '2020{年|ねん}の {国勢調査|こくせいちょうさ}で、{人口|じんこう}が もっとも {多|おお}かった {都道府県|とどうふけん}は どこか。',
    answer: '東京都', acceptedAnswers: ['東京', 'とうきょう', 'とうきょうと'], validationMode: 'kana-insensitive',
    hints: ['{日本|にほん}の {首都|しゅと}が ある。', '{人口|じんこう}は {約|やく}1400{万人|まんにん}。'],
    explanation: '2020{年|ねん}の {国勢調査|こくせいちょうさ}で {人口|じんこう}が もっとも {多|おお}かったのは「{東京都|とうきょうと}」で、{約|やく}1400{万人|まんにん}でした。',
    reviewed: true
  },
  {
    id: 'social_g8_history_002', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '1853{年|ねん}、{軍艦|ぐんかん}を ひきいて {浦賀|うらが}に {来航|らいこう}し、{日本|にほん}に {開国|かいこく}を {求|もと}めた アメリカの {使節|しせつ}は だれか。カタカナで {答|こた}えなさい。',
    answer: 'ペリー', validationMode: 'kana-insensitive',
    hints: ['{黒船|くろふね}で やって {来|き}た。', '{翌年|よくねん}、{日米和親条約|にちべいわしんじょうやく}が {結|むす}ばれた。'],
    explanation: '1853{年|ねん}に {浦賀|うらが}に {来航|らいこう}したのは「ペリー」です。{翌年|よくねん}、{日米和親条約|にちべいわしんじょうやく}を {結|むす}び、{日本|にほん}は {開国|かいこく}しました。',
    reviewed: true
  },
  {
    id: 'social_g8_history_003', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{目安箱|めやすばこ}の {設置|せっち}や {公事方御定書|くじかたおさだめがき}の {制定|せいてい}など、{享保|きょうほう}の{改革|かいかく}を {行|おこな}った {江戸幕府|えどばくふ}の 8{代将軍|だいしょうぐん}は だれか。',
    answer: '徳川吉宗', acceptedAnswers: ['とくがわよしむね'], validationMode: 'kana-insensitive',
    hints: ['{紀伊藩|きいはん}（{和歌山|わかやま}）の {藩主|はんしゅ}から {将軍|しょうぐん}に なった。', '「{米将軍|こめしょうぐん}」とも よばれた。'],
    explanation: '{享保|きょうほう}の{改革|かいかく}を {行|おこな}ったのは 8{代将軍|だいしょうぐん}「{徳川吉宗|とくがわよしむね}」です。',
    reviewed: true
  },
  {
    id: 'social_g8_japan_002', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'input',
    question: '{夏|なつ}は {南東|なんとう}から、{冬|ふゆ}は {北西|ほくせい}から ふき、{日本|にほん}の {気候|きこう}に {大|おお}きな えいきょうを あたえる {風|かぜ}を {何|なん}と いうか。',
    answer: '季節風', acceptedAnswers: ['きせつふう', 'モンスーン'], validationMode: 'kana-insensitive',
    hints: ['{季節|きせつ}に よって ふく {向|む}きが {変|か}わる。', '{英語|えいご}では「モンスーン」。'],
    explanation: '{季節|きせつ}に よって ふく {向|む}きが {変|か}わる {風|かぜ}を「{季節風|きせつふう}（モンスーン）」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g8_history_004', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{伊藤博文|いとうひろぶみ}らが {大日本帝国憲法|だいにっぽんていこくけんぽう}を つくる ときに、おもに {手本|てほん}と した {国|くに}の {憲法|けんぽう}は どれか。',
    choices: ['ドイツ（プロイセン）', 'イギリス', 'アメリカ', 'フランス'],
    answer: 'ドイツ（プロイセン）',
    hints: ['{君主|くんしゅ}（{皇帝|こうてい}）の {権力|けんりょく}が {強|つよ}い {憲法|けんぽう}を {持|も}つ {国|くに}。', '{伊藤博文|いとうひろぶみ}は ヨーロッパで この {国|くに}の {憲法|けんぽう}を {学|まな}んだ。'],
    explanation: '{大日本帝国憲法|だいにっぽんていこくけんぽう}は、{君主|くんしゅ}の {権力|けんりょく}が {強|つよ}い ドイツ（プロイセン）の {憲法|けんぽう}を {手本|てほん}に して、1889{年|ねん}に {発布|はっぷ}されました。',
    inputForm: { question: '{伊藤博文|いとうひろぶみ}らが {大日本帝国憲法|だいにっぽんていこくけんぽう}を つくる ときに、おもに {手本|てほん}と した 国は どこか。', answer: 'ドイツ', acceptedAnswers: ['プロイセン', 'ドイツ(プロイセン)', 'ドイツ（プロイセン）'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_japan_003', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'choice',
    question: '{高知平野|こうちへいや}や {宮崎平野|みやざきへいや}で さかんな、{冬|ふゆ}でも {暖|あたた}かい {気候|きこう}を {利用|りよう}して {野菜|やさい}の {出荷|しゅっか}{時期|じき}を {早|はや}める {栽培方法|さいばいほうほう}は どれか。',
    choices: ['{促成栽培|そくせいさいばい}', '{抑制栽培|よくせいさいばい}', '{近郊農業|きんこうのうぎょう}', '{二毛作|にもうさく}'],
    answer: '{促成栽培|そくせいさいばい}',
    hints: ['「{促|うなが}す」は {早|はや}める という {意味|いみ}。', '{出荷|しゅっか}を おくらせる {栽培|さいばい}は「{抑制栽培|よくせいさいばい}」。'],
    explanation: '{暖|あたた}かい {気候|きこう}と ビニールハウスを {利用|りよう}して {出荷|しゅっか}{時期|じき}を {早|はや}める のが「{促成栽培|そくせいさいばい}」です。{他|ほか}の {産地|さんち}の {出荷|しゅっか}が {少|すく}ない {時期|じき}に {高|たか}い {値段|ねだん}で {売|う}る ことが できます。',
    inputForm: { question: '{高知平野|こうちへいや}や {宮崎平野|みやざきへいや}で さかんな、{冬|ふゆ}でも {暖|あたた}かい {気候|きこう}を {利用|りよう}して {野菜|やさい}の {出荷|しゅっか}{時期|じき}を {早|はや}める 栽培方法を 何と いうか。', acceptedAnswers: ['そくせいさいばい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_history_005', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '1867{年|ねん}、15{代将軍|だいしょうぐん}{徳川慶喜|とくがわよしのぶ}が {政権|せいけん}を {朝廷|ちょうてい}に {返|かえ}した ことを {何|なん}と いうか。',
    answer: '大政奉還', acceptedAnswers: ['たいせいほうかん'], validationMode: 'kana-insensitive',
    hints: ['「{大政|たいせい}」は {国|くに}の {政治|せいじ}、「{奉還|ほうかん}」は お{返|かえ}しする という {意味|いみ}。', 'この {後|あと}、{王政復古|おうせいふっこ}の {大号令|だいごうれい}が {出|だ}された。'],
    explanation: '{徳川慶喜|とくがわよしのぶ}が {政権|せいけん}を {朝廷|ちょうてい}に {返|かえ}した ことを「{大政奉還|たいせいほうかん}」と いいます。これにより {江戸幕府|えどばくふ}の {政治|せいじ}は {終|お}わりました。',
    reviewed: true
  },
  {
    id: 'social_g8_history_006', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '{日清戦争|にっしんせんそう}の {講和条約|こうわじょうやく}は どれか。',
    choices: ['{下関条約|しものせきじょうやく}', 'ポーツマス{条約|じょうやく}', '{日米和親条約|にちべいわしんじょうやく}', 'ベルサイユ{条約|じょうやく}'],
    answer: '{下関条約|しものせきじょうやく}',
    hints: ['1895{年|ねん}に {山口県|やまぐちけん}で {結|むす}ばれた。', 'ポーツマス{条約|じょうやく}は {日露戦争|にちろせんそう}の {講和条約|こうわじょうやく}。'],
    explanation: '{日清戦争|にっしんせんそう}の {講和条約|こうわじょうやく}は、1895{年|ねん}の「{下関条約|しものせきじょうやく}」です。{日本|にほん}は {遼東半島|りょうとうはんとう}・{台湾|たいわん}などを {得|え}ましたが、{三国干渉|さんごくかんしょう}で {遼東半島|りょうとうはんとう}は {返還|へんかん}しました。',
    inputForm: { question: '{日清戦争|にっしんせんそう}の 講和条約を 何と いうか。', acceptedAnswers: ['しものせきじょうやく'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g8_japan_004', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'basic', answerType: 'choice',
    question: '{飛驒山脈|ひださんみゃく}・{木曽山脈|きそさんみゃく}・{赤石山脈|あかいしさんみゃく}から なる「{日本|にほん}アルプス」が ある {地方|ちほう}は どれか。',
    choices: ['{中部地方|ちゅうぶちほう}', '{東北地方|とうほくちほう}', '{近畿地方|きんきちほう}', '{九州地方|きゅうしゅうちほう}'],
    answer: '{中部地方|ちゅうぶちほう}',
    hints: ['3000m{級|きゅう}の {山々|やまやま}が つらなり、「{日本|にほん}の {屋根|やね}」と よばれる。', '{長野県|ながのけん}・{岐阜県|ぎふけん}・{富山県|とやまけん}などに またがる。'],
    explanation: '{日本|にほん}アルプスは {中部地方|ちゅうぶちほう}に あり、3000m{級|きゅう}の {山々|やまやま}が つらなります。',
    inputForm: { question: '{飛驒山脈|ひださんみゃく}・{木曽山脈|きそさんみゃく}・{赤石山脈|あかいしさんみゃく}から なる「{日本|にほん}アルプス」が ある 地方は どこか。', acceptedAnswers: ['ちゅうぶちほう', '中部'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_history_007', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'basic', answerType: 'choice',
    question: '{江戸幕府|えどばくふ}が {大名|だいみょう}を {統制|とうせい}する ために {定|さだ}めた きまりは どれか。',
    choices: ['{武家諸法度|ぶけしょはっと}', '{御成敗式目|ごせいばいしきもく}', '{大宝律令|たいほうりつりょう}', '{五箇条|ごかじょう}の{御誓文|ごせいもん}'],
    answer: '{武家諸法度|ぶけしょはっと}',
    hints: ['{城|しろ}の {修理|しゅうり}や {大名|だいみょう}どうしの {結婚|けっこん}には {幕府|ばくふ}の {許可|きょか}が {必要|ひつよう}と した。', '{御成敗式目|ごせいばいしきもく}は {鎌倉幕府|かまくらばくふ}の きまり。'],
    explanation: '{江戸幕府|えどばくふ}は「{武家諸法度|ぶけしょはっと}」を {定|さだ}めて {大名|だいみょう}を {統制|とうせい}し、きまりに そむいた {大名|だいみょう}は {領地|りょうち}を {取|と}り{上|あ}げるなど {厳|きび}しく {処分|しょぶん}しました。',
    inputForm: { question: '{江戸幕府|えどばくふ}が {大名|だいみょう}を {統制|とうせい}する ために {定|さだ}めた きまりを 何と いうか。', acceptedAnswers: ['ぶけしょはっと'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_japan_005', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'basic', answerType: 'input',
    question: '{九州|きゅうしゅう}{南部|なんぶ}に {広|ひろ}がる、{火山|かざん}の ふん{出物|しゅつぶつ}が {厚|あつ}く {積|つ}もって できた {台地|だいち}を {何|なん}と いうか。',
    answer: 'シラス台地', acceptedAnswers: ['しらすだいち', 'シラス'], validationMode: 'kana-insensitive',
    hints: ['{水|みず}を {通|とお}しやすく、{稲作|いなさく}には {向|む}かない。', '「{白|しろ}い {砂|すな}」を {意味|いみ}する ことばが つく。'],
    explanation: '{九州|きゅうしゅう}{南部|なんぶ}の「シラス{台地|だいち}」は {水|みず}もちが {悪|わる}いので、さつまいもや {茶|ちゃ}の {栽培|さいばい}、{畜産|ちくさん}が さかんに {行|おこな}われて います。',
    reviewed: true
  },
  {
    id: 'social_g8_history_008', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'basic', answerType: 'input',
    question: '1873{年|ねん}、{明治政府|めいじせいふ}が {財政|ざいせい}を {安定|あんてい}させる ため、{土地|とち}の {所有者|しょゆうしゃ}に {地価|ちか}の 3％を {現金|げんきん}で {納|おさ}めさせた {改革|かいかく}を {何|なん}と いうか。',
    answer: '地租改正', answerDisplay: '{地租改正|ちそかいせい}', acceptedAnswers: ['ちそかいせい'], validationMode: 'kana-insensitive',
    hints: ['それまでは {米|こめ}で {年貢|ねんぐ}を {納|おさ}めて いた。', '{土地|とち}に かかる {税|ぜい}を「{地租|ちそ}」と いう。'],
    explanation: '「{地租改正|ちそかいせい}」で、{税|ぜい}は {米|こめ}ではなく {地価|ちか}の 3％を {現金|げんきん}で {納|おさ}める ことに なり、{政府|せいふ}の {収入|しゅうにゅう}が {安定|あんてい}しました。',
    reviewed: true
  },
  {
    id: 'social_g8_japan_006', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'input',
    question: '{大都市|だいとし}の {周辺|しゅうへん}で、{都市|とし}の {住民|じゅうみん}に {向|む}けて {新鮮|しんせん}な {野菜|やさい}や {花|はな}などを つくる {農業|のうぎょう}を {何|なん}と いうか。',
    answer: '近郊農業', acceptedAnswers: ['きんこうのうぎょう'], validationMode: 'kana-insensitive',
    hints: ['{大|おお}きな {消費地|しょうひち}に {近|ちか}いので、{輸送|ゆそう}の {時間|じかん}や {費用|ひよう}を おさえられる。', '「{近|ちか}く」を {意味|いみ}する {字|じ}が つく。'],
    explanation: '{大都市|だいとし}の {周辺|しゅうへん}で {行|おこな}われる {農業|のうぎょう}を「{近郊農業|きんこうのうぎょう}」と いいます。{関東地方|かんとうちほう}の {千葉県|ちばけん}や {茨城県|いばらきけん}などで さかんです。',
    reviewed: true
  },
  {
    id: 'social_g8_japan_007', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'input',
    question: '{北海道|ほっかいどう}などに {古|ふる}くから くらし、{独自|どくじ}の ことばや {文化|ぶんか}を もつ {先住民族|せんじゅうみんぞく}を {何|なん}と いうか。カタカナで {答|こた}えなさい。',
    answer: 'アイヌ', acceptedAnswers: ['アイヌ民族', 'あいぬ'], validationMode: 'kana-insensitive',
    hints: ['{北海道|ほっかいどう}の {地名|ちめい}には、この {民族|みんぞく}の ことばに {由来|ゆらい}する ものが {多|おお}い。', 'カタカナ 3{文字|もじ}。'],
    explanation: '{北海道|ほっかいどう}などに {古|ふる}くから くらす {先住民族|せんじゅうみんぞく}を「アイヌ（アイヌ{民族|みんぞく}）」と いいます。「サッポロ」「ワッカナイ」など、アイヌ{語|ご}に {由来|ゆらい}する {地名|ちめい}が {多|おお}く あります。',
    reviewed: true
  },
  {
    id: 'social_g8_history_009', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '『{学問|がくもん}のすゝめ』を {書|か}き、「{天|てん}は {人|ひと}の {上|うえ}に {人|ひと}を {造|つく}らず」と {人間|にんげん}の {平等|びょうどう}を {説|と}いた {人物|じんぶつ}は だれか。',
    answer: '福沢諭吉', acceptedAnswers: ['ふくざわゆきち', '福澤諭吉'], validationMode: 'kana-insensitive',
    hints: ['{慶應義塾|けいおうぎじゅく}を ひらいた。', '「ふくざわ」から {始|はじ}まる。'],
    explanation: '『{学問|がくもん}のすゝめ』を {書|か}いたのは「{福沢諭吉|ふくざわゆきち}」です。{学問|がくもん}の {大切|たいせつ}さを {説|と}き、{多|おお}くの {人|ひと}に {読|よ}まれました。',
    reviewed: true
  },
  {
    id: 'social_g8_history_010', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '1925{年|ねん}に {成立|せいりつ}した、{満|まん}25{歳|さい}{以上|いじょう}の すべての {男子|だんし}に {選挙権|せんきょけん}を あたえた {法律|ほうりつ}を {何|なん}と いうか。',
    answer: '普通選挙法', acceptedAnswers: ['ふつうせんきょほう'], validationMode: 'kana-insensitive',
    hints: ['それまでは、{納|おさ}める {税金|ぜいきん}の {額|がく}で {選挙権|せんきょけん}が かぎられて いた。', '{同|おな}じ {年|とし}に {治安維持法|ちあんいじほう}も {成立|せいりつ}した。'],
    explanation: '1925{年|ねん}の「{普通選挙法|ふつうせんきょほう}」で、{納税額|のうぜいがく}に よる {制限|せいげん}が なくなり、{満|まん}25{歳|さい}{以上|いじょう}の {男子|だんし}に {選挙権|せんきょけん}が あたえられました。{女性|じょせい}の {選挙権|せんきょけん}は まだ ありませんでした。',
    reviewed: true
  },
  {
    id: 'social_g8_japan_008', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'input',
    question: '{雨|あめ}が {少|すく}ない {讃岐平野|さぬきへいや}（{香川県|かがわけん}）などで、{農業用水|のうぎょうようすい}を たくわえる ために {多|おお}く つくられて きた {池|いけ}を {何|なん}と いうか。',
    answer: 'ため池', acceptedAnswers: ['ためいけ'], validationMode: 'kana-insensitive',
    hints: ['{瀬戸内|せとうち}の {気候|きこう}は、1{年|ねん}を {通|とお}して {雨|あめ}が {少|すく}ない。', '{水|みず}を「ためる」ための {池|いけ}。'],
    explanation: '{降水量|こうすいりょう}が {少|すく}ない {讃岐平野|さぬきへいや}などでは、{農業用水|のうぎょうようすい}を たくわえる「ため{池|いけ}」が {多|おお}く つくられて きました。{現在|げんざい}は {香川用水|かがわようすい}も {利用|りよう}されて います。',
    reviewed: true
  },
  {
    id: 'social_g8_history_011', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '1868{年|ねん}、{明治天皇|めいじてんのう}が {神|かみ}に ちかう {形|かたち}で しめした、{新|あたら}しい {政治|せいじ}の {方針|ほうしん}を {何|なん}と いうか。',
    answer: '五箇条の御誓文', acceptedAnswers: ['ごかじょうのごせいもん', '五か条の御誓文', '五ヶ条の御誓文', '五箇条の誓文'], validationMode: 'kana-insensitive',
    hints: ['「{広|ひろ}く {会議|かいぎ}を {興|おこ}し、{万機公論|ばんきこうろん}に {決|けっ}すべし」で {始|はじ}まる。', '5つの {条文|じょうぶん}から なる。'],
    explanation: '「{五箇条|ごかじょう}の{御誓文|ごせいもん}」は、{会議|かいぎ}を ひらいて {世論|よろん}に もとづいて {政治|せいじ}を {行|おこな}う ことなど、{新|あたら}しい {政治|せいじ}の {方針|ほうしん}を しめしました。',
    reviewed: true
  },
  {
    id: 'social_g8_japan_009', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'choice',
    question: '{夏|なつ}に {東北地方|とうほくちほう}の {太平洋側|たいへいようがわ}に ふき、{冷害|れいがい}の {原因|げんいん}と なる、{冷|つめ}たく しめった {北東|ほくとう}の {風|かぜ}は どれか。',
    choices: ['やませ', 'からっ{風|かぜ}', '{偏西風|へんせいふう}', 'フェーン'],
    answer: 'やませ',
    hints: ['この {風|かぜ}が ふくと、{日照不足|にっしょうぶそく}で {稲|いね}が {育|そだ}ちにくく なる。', 'からっ{風|かぜ}は {冬|ふゆ}の {関東地方|かんとうちほう}に ふく かわいた {風|かぜ}。'],
    explanation: '{夏|なつ}に {東北地方|とうほくちほう}の {太平洋側|たいへいようがわ}に ふく {冷|つめ}たい {北東|ほくとう}の {風|かぜ}を「やませ」と いいます。{気温|きおん}が {上|あ}がらず、{稲|いね}が {十分|じゅうぶん}に {育|そだ}たない {冷害|れいがい}の {原因|げんいん}に なります。',
    inputForm: { question: '{夏|なつ}に {東北地方|とうほくちほう}の {太平洋側|たいへいようがわ}に ふき、{冷害|れいがい}の {原因|げんいん}と なる、{冷|つめ}たく しめった 北東の 風を 何と いうか。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_history_012', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '18{世紀|せいき}の おわりに、{倹約|けんやく}を すすめ、ききんに そなえて {米|こめ}を たくわえさせるなどの {寛政|かんせい}の{改革|かいかく}を {行|おこな}った {老中|ろうじゅう}は だれか。',
    choices: ['{松平定信|まつだいらさだのぶ}', '{水野忠邦|みずのただくに}', '{田沼意次|たぬまおきつぐ}', '{徳川吉宗|とくがわよしむね}'],
    answer: '{松平定信|まつだいらさだのぶ}',
    hints: ['{徳川吉宗|とくがわよしむね}の {孫|まご}に あたる {人物|じんぶつ}。', '{天保|てんぽう}の{改革|かいかく}を {行|おこな}ったのは {水野忠邦|みずのただくに}。'],
    explanation: '{寛政|かんせい}の{改革|かいかく}を {行|おこな}ったのは {老中|ろうじゅう}の {松平定信|まつだいらさだのぶ}です。{享保|きょうほう}の{改革|かいかく}は {徳川吉宗|とくがわよしむね}、{天保|てんぽう}の{改革|かいかく}は {水野忠邦|みずのただくに}が {行|おこな}いました。',
    inputForm: { acceptedAnswers: ['まつだいらさだのぶ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_japan_010', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'choice',
    question: '{少子高齢化|しょうしこうれいか}が {進|すす}んだ {現在|げんざい}の {日本|にほん}の {人口|じんこう}ピラミッドの {形|かたち}は どれに {近|ちか}いか。',
    choices: ['つぼ{型|がた}', '{富士山型|ふじさんがた}', 'つりがね{型|がた}', 'ほし{型|がた}'],
    answer: 'つぼ{型|がた}',
    hints: ['{子|こ}どもの {数|かず}が へって、{下|した}の {部分|ぶぶん}が せまく なって いる。', '{富士山型|ふじさんがた}は {子|こ}どもが {多|おお}い、{発展途上国|はってんとじょうこく}に {多|おお}い {形|かたち}。'],
    explanation: '{現在|げんざい}の {日本|にほん}は {子|こ}どもが {少|すく}なく、{高齢者|こうれいしゃ}が {多|おお}いので、{人口|じんこう}ピラミッドは {下|した}が せまい「つぼ{型|がた}」に {近|ちか}い {形|かたち}です。',
    inputForm: { question: '{少子高齢化|しょうしこうれいか}が {進|すす}んだ {現在|げんざい}の {日本|にほん}の {人口|じんこう}ピラミッドの 形は 何型に 近いか。', acceptedAnswers: ['つぼがた', '壺型'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_history_013', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '1914{年|ねん}に ヨーロッパで {始|はじ}まり、{日本|にほん}も {日英同盟|にちえいどうめい}を {理由|りゆう}に {参戦|さんせん}した {戦争|せんそう}は どれか。',
    choices: ['{第一次世界大戦|だいいちじせかいたいせん}', '{日露戦争|にちろせんそう}', '{第二次世界大戦|だいにじせかいたいせん}', '{日清戦争|にっしんせんそう}'],
    answer: '{第一次世界大戦|だいいちじせかいたいせん}',
    hints: ['サラエボ{事件|じけん}が きっかけと なった。', '{日露戦争|にちろせんそう}は 1904{年|ねん}、{第二次世界大戦|だいにじせかいたいせん}は 1939{年|ねん}に {始|はじ}まった。'],
    explanation: '1914{年|ねん}に {始|はじ}まったのは {第一次世界大戦|だいいちじせかいたいせん}です。{日本|にほん}は {日英同盟|にちえいどうめい}を {理由|りゆう}に {参戦|さんせん}し、{中国|ちゅうごく}に {二十一|にじゅういち}か{条|じょう}の{要求|ようきゅう}を {出|だ}しました。',
    inputForm: { question: '1914{年|ねん}に ヨーロッパで {始|はじ}まり、{日本|にほん}も {日英同盟|にちえいどうめい}を {理由|りゆう}に {参戦|さんせん}した 戦争は 何か。', acceptedAnswers: ['だいいちじせかいたいせん', '第1次世界大戦'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_history_014', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '1858{年|ねん}の {日米修好通商条約|にちべいしゅうこうつうしょうじょうやく}で {日本|にほん}が {認|みと}めた、{日本|にほん}で {罪|つみ}を おかした {外国人|がいこくじん}を、その {国|くに}の {領事|りょうじ}が {自国|じこく}の {法律|ほうりつ}で {裁|さば}く {権利|けんり}を {何|なん}と いうか。',
    answer: '領事裁判権', acceptedAnswers: ['りょうじさいばんけん', '治外法権', 'ちがいほうけん'], validationMode: 'kana-insensitive',
    hints: ['この {条約|じょうやく}は、{関税自主権|かんぜいじしゅけん}が ないなど、{日本|にほん}に {不平等|ふびょうどう}な {内容|ないよう}だった。', '1894{年|ねん}、{陸奥宗光|むつむねみつ}が この {権利|けんり}の {撤廃|てっぱい}に {成功|せいこう}した。'],
    explanation: '{日米修好通商条約|にちべいしゅうこうつうしょうじょうやく}では「{領事裁判権|りょうじさいばんけん}（{治外法権|ちがいほうけん}）」を {認|みと}め、{関税自主権|かんぜいじしゅけん}が ありませんでした。{領事裁判権|りょうじさいばんけん}は 1894{年|ねん}に {撤廃|てっぱい}され、{関税自主権|かんぜいじしゅけん}は 1911{年|ねん}に {完全|かんぜん}に {回復|かいふく}しました。',
    reviewed: true
  },
  {
    id: 'social_g8_japan_011', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'advanced', answerType: 'input',
    question: '{日本|にほん}で いちばん {面積|めんせき}が {広|ひろ}い {平野|へいや}を {何|なん}と いうか。',
    answer: '関東平野', acceptedAnswers: ['かんとうへいや'], validationMode: 'kana-insensitive',
    hints: ['{利根川|とねがわ}が {流|なが}れて いる。', '{日本|にほん}の {首都|しゅと}が ある {地方|ちほう}に ある。'],
    explanation: '{日本|にほん}で いちばん {広|ひろ}い {平野|へいや}は「{関東平野|かんとうへいや}」です。{火山灰|かざんばい}が {積|つ}もった {赤土|あかつち}（{関東|かんとう}ローム）に おおわれた {台地|だいち}が {広|ひろ}がって います。',
    reviewed: true
  },
  {
    id: 'social_g8_history_015', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '1918{年|ねん}の {米騒動|こめそうどう}の あと、{衆議院|しゅうぎいん}で {多数|たすう}を しめる {政党|せいとう}の {党員|とういん}で {大臣|だいじん}の {大部分|だいぶぶん}を しめる、{本格的|ほんかくてき}な {政党内閣|せいとうないかく}を つくった {人物|じんぶつ}は だれか。',
    choices: ['{原敬|はらたかし}', '{伊藤博文|いとうひろぶみ}', '{大隈重信|おおくましげのぶ}', '{吉田茂|よしだしげる}'],
    answer: '{原敬|はらたかし}',
    hints: ['{爵位|しゃくい}を もたなかったので「{平民宰相|へいみんさいしょう}」と よばれた。', '{立憲政友会|りっけんせいゆうかい}の {総裁|そうさい}だった。'],
    explanation: '1918{年|ねん}、{立憲政友会|りっけんせいゆうかい}の {原敬|はらたかし}が {本格的|ほんかくてき}な {政党内閣|せいとうないかく}を つくりました。{民主主義|みんしゅしゅぎ}を もとめる {動|うご}きが {高|たか}まった この {時期|じき}の {風潮|ふうちょう}を {大正|たいしょう}デモクラシーと いいます。',
    inputForm: { acceptedAnswers: ['はらたかし'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g8_japan_012', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'advanced', answerType: 'choice',
    question: '{火山|かざん}の {熱|ねつ}を {利用|りよう}する {地熱発電所|ちねつはつでんしょ}が {多|おお}く {見|み}られる {地方|ちほう}は どれか。',
    choices: ['{九州地方|きゅうしゅうちほう}', '{近畿地方|きんきちほう}', '{四国地方|しこくちほう}', '{関東地方|かんとうちほう}'],
    answer: '{九州地方|きゅうしゅうちほう}',
    hints: ['{阿蘇山|あそさん}や {桜島|さくらじま}など、{活動|かつどう}が さかんな {火山|かざん}が {多|おお}い {地方|ちほう}。', '{大分県|おおいたけん}には {日本最大級|にほんさいだいきゅう}の {地熱発電所|ちねつはつでんしょ}が ある。'],
    explanation: '{火山|かざん}が {多|おお}い {九州地方|きゅうしゅうちほう}には {地熱発電所|ちねつはつでんしょ}が {多|おお}く あります（{東北地方|とうほくちほう}にも {多|おお}く あります）。{温泉|おんせん}も {多|おお}く、{観光|かんこう}にも {利用|りよう}されて います。',
    inputForm: { question: '{火山|かざん}の {熱|ねつ}を {利用|りよう}する {地熱発電所|ちねつはつでんしょ}が {多|おお}く {見|み}られる 地方は どこか。', acceptedAnswers: ['きゅうしゅうちほう', '九州'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv9（中学3年） =====
  {
    id: 'social_g9_politics_001', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'basic', answerType: 'choice',
    question: '{日本|にほん}の {国会|こっかい}を {構成|こうせい}する {二|ふた}つの {議院|ぎいん}の {組|く}み{合|あ}わせは どれか。',
    choices: ['{衆議院|しゅうぎいん}と {参議院|さんぎいん}', '{貴族院|きぞくいん}と {衆議院|しゅうぎいん}', '{上院|じょういん}と {下院|かいん}', '{衆議院|しゅうぎいん}と {内閣|ないかく}'],
    answer: '{衆議院|しゅうぎいん}と {参議院|さんぎいん}',
    hints: ['{日本国憲法|にほんこくけんぽう}の {下|もと}での {二院制|にいんせい}。', '{貴族院|きぞくいん}は {大日本帝国憲法|だいにっぽんていこくけんぽう}の {時代|じだい}に あった。'],
    explanation: '{国会|こっかい}は {衆議院|しゅうぎいん}と {参議院|さんぎいん}の {二院制|にいんせい}です。{大日本帝国憲法|だいにっぽんていこくけんぽう}の {時代|じだい}は {貴族院|きぞくいん}と {衆議院|しゅうぎいん}でした。',
    inputForm: { question: '{日本|にほん}の {国会|こっかい}を {構成|こうせい}する {二|ふた}つの {議院|ぎいん}の 組み合わせは 何か。', answer: '衆議院と参議院', acceptedAnswers: ['衆議院と 参議院', '参議院と衆議院', '参議院と 衆議院', 'しゅうぎいんとさんぎいん', '衆議院・参議院'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_politics_002', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'basic', answerType: 'input',
    question: '{現在|げんざい}の {日本|にほん}で、{選挙権|せんきょけん}が {与|あた}えられるのは {満|まん}{何歳|なんさい}{以上|いじょう}か。{数|かず}で {答|こた}えなさい。',
    answer: '18', acceptedAnswers: ['18歳', '満18歳'], validationMode: 'number',
    hints: ['2016{年|ねん}の {選挙|せんきょ}から {引|ひ}き{下|さ}げられた。', 'それ{以前|いぜん}は {満|まん}20{歳|さい}{以上|いじょう}だった。'],
    explanation: '{選挙権|せんきょけん}は {満|まん}18{歳|さい}{以上|いじょう}の {国民|こくみん}に {与|あた}えられて います（2016{年|ねん}から）。',
    reviewed: true
  },
  {
    id: 'social_g9_politics_003', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'standard', answerType: 'input',
    question: '{衆議院議員総選挙|しゅうぎいんぎいんそうせんきょ}の ときに、{国民|こくみん}が {最高裁判所|さいこうさいばんしょ}の {裁判官|さいばんかん}を ふさわしいか どうか {審査|しんさ}する {制度|せいど}を {何|なん}と いうか。',
    answer: '国民審査', acceptedAnswers: ['こくみんしんさ', '最高裁判所裁判官国民審査'], validationMode: 'kana-insensitive',
    hints: ['{辞|や}めさせた ほうが よいと {思|おも}う {裁判官|さいばんかん}に ×を {書|か}く。', '「{国民|こくみん}○○」。'],
    explanation: '{最高裁判所|さいこうさいばんしょ}の {裁判官|さいばんかん}が ふさわしいかを {国民|こくみん}が {判断|はんだん}する しくみを「{国民審査|こくみんしんさ}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g9_economy_001', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'standard', answerType: 'input',
    question: '{市場|しじょう}で、{需要量|じゅようりょう}（{買|か}いたい {量|りょう}）と {供給量|きょうきゅうりょう}（{売|う}りたい {量|りょう}）が {一致|いっち}する ときの {価格|かかく}を {何|なん}と いうか。',
    answer: '均衡価格', acceptedAnswers: ['きんこうかかく'], validationMode: 'kana-insensitive',
    hints: ['{需要曲線|じゅようきょくせん}と {供給曲線|きょうきゅうきょくせん}が {交|まじ}わる {点|てん}の {価格|かかく}。', '「つり{合|あ}い」を {意味|いみ}する {言葉|ことば}が つく。'],
    explanation: '{需要量|じゅようりょう}と {供給量|きょうきゅうりょう}が {一致|いっち}する {価格|かかく}を「{均衡価格|きんこうかかく}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g9_constitution_001', subject: 'social', gradeLevel: 9, unit: 'constitution',
    difficulty: 'standard', answerType: 'input',
    question: '{日本国憲法|にほんこくけんぽう}で、{戦争|せんそう}の {放棄|ほうき}・{戦力|せんりょく}の {不保持|ふほじ}・{交戦権|こうせんけん}の {否認|ひにん}を {定|さだ}めて いるのは {第|だい}{何条|なんじょう}か。{数|かず}で {答|こた}えなさい。',
    answer: '9', acceptedAnswers: ['9条', '第9条'], validationMode: 'number',
    hints: ['{平和主義|へいわしゅぎ}を {具体的|ぐたいてき}に {定|さだ}めた {条文|じょうぶん}。', '1{桁|けた}の {数|かず}。'],
    explanation: '{日本国憲法|にほんこくけんぽう}{第|だい}9{条|じょう}は、{戦争|せんそう}の {放棄|ほうき}・{戦力|せんりょく}の {不保持|ふほじ}・{交戦権|こうせんけん}の {否認|ひにん}を {定|さだ}めて います。',
    reviewed: true
  },
  {
    id: 'social_g9_politics_004', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'standard', answerType: 'choice',
    question: '{内閣|ないかく}の {長|ちょう}は だれか。',
    choices: ['{内閣総理大臣|ないかくそうりだいじん}', '{天皇|てんのう}', '{最高裁判所長官|さいこうさいばんしょちょうかん}', '{衆議院議長|しゅうぎいんぎちょう}'],
    answer: '{内閣総理大臣|ないかくそうりだいじん}',
    hints: ['{国会議員|こっかいぎいん}の {中|なか}から {国会|こっかい}が {指名|しめい}する。', '「{首相|しゅしょう}」とも よばれる。'],
    explanation: '{内閣|ないかく}の {長|ちょう}は {内閣総理大臣|ないかくそうりだいじん}（{首相|しゅしょう}）です。{国会|こっかい}が {国会議員|こっかいぎいん}の {中|なか}から {指名|しめい}し、{天皇|てんのう}が {任命|にんめい}します。',
    inputForm: { acceptedAnswers: ['ないかくそうりだいじん', '首相', '総理大臣', 'しゅしょう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_international_001', subject: 'social', gradeLevel: 9, unit: 'international',
    difficulty: 'standard', answerType: 'choice',
    question: '{国際連合|こくさいれんごう}の {本部|ほんぶ}が ある {都市|とし}は どれか。',
    choices: ['ニューヨーク', 'ジュネーブ', 'ワシントンD.C.', 'パリ'],
    answer: 'ニューヨーク',
    hints: ['アメリカ{合衆国|がっしゅうこく}に ある。', 'アメリカの {首都|しゅと}では ない。'],
    explanation: '{国際連合|こくさいれんごう}の {本部|ほんぶ}は アメリカの ニューヨークに あります。',
    inputForm: { question: '{国際連合|こくさいれんごう}の {本部|ほんぶ}が ある 都市は どこか。', validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_economy_002', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'advanced', answerType: 'input',
    question: '{日本銀行|にっぽんぎんこう}が、{国債|こくさい}などの {売|う}り{買|か}いを {通|つう}じて {世|よ}の {中|なか}に {出回|でまわ}る お{金|かね}の {量|りょう}を {調整|ちょうせい}し、{景気|けいき}や {物価|ぶっか}を {安定|あんてい}させようと する {政策|せいさく}を {何|なん}と いうか。',
    answer: '金融政策', acceptedAnswers: ['きんゆうせいさく'], validationMode: 'kana-insensitive',
    hints: ['{政府|せいふ}が {税|ぜい}や {公共事業|こうきょうじぎょう}で {行|おこな}う のは「{財政政策|ざいせいせいさく}」。', 'お{金|かね}の {流|なが}れを「{金融|きんゆう}」と いう。'],
    explanation: '{日本銀行|にっぽんぎんこう}が お{金|かね}の {量|りょう}を {調整|ちょうせい}して {景気|けいき}や {物価|ぶっか}を {安定|あんてい}させる {政策|せいさく}を「{金融政策|きんゆうせいさく}」と いいます。',
    reviewed: true
  },
  {
    id: 'social_g9_history_001', subject: 'social', gradeLevel: 9, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '1951{年|ねん}に {結|むす}ばれ、{翌年|よくねん}の {発効|はっこう}に よって {日本|にほん}が {独立|どくりつ}を {回復|かいふく}した {条約|じょうやく}は どれか。',
    choices: ['サンフランシスコ{平和条約|へいわじょうやく}', '{日米安全保障条約|にちべいあんぜんほしょうじょうやく}', 'ポツダム{宣言|せんげん}', '{日ソ共同宣言|にっそきょうどうせんげん}'],
    answer: 'サンフランシスコ{平和条約|へいわじょうやく}',
    hints: ['アメリカの {都市|とし}の {名前|なまえ}が ついて いる。', '{同|おな}じ {日|ひ}に {日米安全保障条約|にちべいあんぜんほしょうじょうやく}も {結|むす}ばれたが、こちらは {安全保障|あんぜんほしょう}に ついての {条約|じょうやく}。'],
    explanation: '1951{年|ねん}、{日本|にほん}は 48か{国|こく}と サンフランシスコ{平和条約|へいわじょうやく}を {結|むす}び、1952{年|ねん}の {発効|はっこう}で {独立|どくりつ}を {回復|かいふく}しました。{同|おな}じ {日|ひ}に {日米安全保障条約|にちべいあんぜんほしょうじょうやく}も {結|むす}ばれました。',
    inputForm: { question: '1951{年|ねん}に {結|むす}ばれ、{翌年|よくねん}の {発効|はっこう}に よって {日本|にほん}が {独立|どくりつ}を {回復|かいふく}した 条約は 何か。', acceptedAnswers: ['サンフランシスコ講和条約'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'social_g9_rights_001', subject: 'social', gradeLevel: 9, unit: 'rights',
    difficulty: 'basic', answerType: 'choice',
    question: '{日本国憲法|にほんこくけんぽう}{第|だい}25{条|じょう}が {保障|ほしょう}する「{健康|けんこう}で {文化的|ぶんかてき}な {最低限度|さいていげんど}の {生活|せいかつ}を {営|いとな}む {権利|けんり}」を {何|なん}と いうか。',
    choices: ['{生存権|せいぞんけん}', '{参政権|さんせいけん}', '{請求権|せいきゅうけん}', '{知|し}る{権利|けんり}'],
    answer: '{生存権|せいぞんけん}',
    hints: ['{社会権|しゃかいけん}の {中|なか}で {基本|きほん}と なる {権利|けんり}。', 'この {権利|けんり}を もとに、{生活保護|せいかつほご}などの {社会保障|しゃかいほしょう}が {行|おこな}われて いる。'],
    explanation: '{第|だい}25{条|じょう}が {保障|ほしょう}するのは「{生存権|せいぞんけん}」で、{社会権|しゃかいけん}の 1つです。{国|くに}は {社会保障|しゃかいほしょう}などを {通|とお}して、この {権利|けんり}を {守|まも}る {努力|どりょく}を しなければ なりません。',
    inputForm: { acceptedAnswers: ['せいぞんけん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_economy_003', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'basic', answerType: 'choice',
    question: '{訪問販売|ほうもんはんばい}などで {商品|しょうひん}を {買|か}う {契約|けいやく}を したあと、{一定|いってい}の {期間|きかん}{内|ない}であれば {無条件|むじょうけん}で {契約|けいやく}を {取|と}り{消|け}す ことが できる {制度|せいど}は どれか。',
    choices: ['クーリング・オフ', 'インフォームド・コンセント', 'バリアフリー', 'フェアトレード'],
    answer: 'クーリング・オフ',
    hints: ['「{頭|あたま}を {冷|ひ}やす」という {意味|いみ}の {英語|えいご}から きた ことば。', '{消費者|しょうひしゃ}を {守|まも}る ための {制度|せいど}。'],
    explanation: '「クーリング・オフ」は、{訪問販売|ほうもんはんばい}などで {契約|けいやく}した あと、{一定|いってい}の {期間|きかん}（{訪問販売|ほうもんはんばい}なら 8{日|か}）{以内|いない}なら {無条件|むじょうけん}で {契約|けいやく}を {取|と}り{消|け}せる {制度|せいど}です。',
    inputForm: { question: '{訪問販売|ほうもんはんばい}などで {商品|しょうひん}を {買|か}う {契約|けいやく}を したあと、{一定|いってい}の {期間|きかん}{内|ない}であれば {無条件|むじょうけん}で {契約|けいやく}を {取|と}り{消|け}す ことが できる 制度を 何と いうか。', acceptedAnswers: ['クーリングオフ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_local_001', subject: 'social', gradeLevel: 9, unit: 'local',
    difficulty: 'basic', answerType: 'input',
    question: '{地方公共団体|ちほうこうきょうだんたい}（{都道府県|とどうふけん}や {市町村|しちょうそん}）が、{法律|ほうりつ}の {範囲内|はんいない}で {独自|どくじ}に {定|さだ}める きまりを {何|なん}と いうか。',
    answer: '条例', acceptedAnswers: ['じょうれい'], validationMode: 'kana-insensitive',
    hints: ['{地方議会|ちほうぎかい}で {制定|せいてい}される。', '{住民|じゅうみん}は、この きまりの {制定|せいてい}や {改廃|かいはい}を {請求|せいきゅう}できる（{直接請求権|ちょくせつせいきゅうけん}）。'],
    explanation: '{地方公共団体|ちほうこうきょうだんたい}が {法律|ほうりつ}の {範囲内|はんいない}で {定|さだ}める きまりを「{条例|じょうれい}」と いい、{地方議会|ちほうぎかい}で {制定|せいてい}されます。',
    reviewed: true
  },
  {
    id: 'social_g9_history_002', subject: 'social', gradeLevel: 9, unit: 'history',
    difficulty: 'basic', answerType: 'input',
    question: '1945{年|ねん}8{月|がつ}14{日|か}、{日本|にほん}が {受|う}け{入|い}れて {降伏|こうふく}する ことを {決|き}めた、{連合国|れんごうこく}が {日本|にほん}に {無条件降伏|むじょうけんこうふく}を もとめた {宣言|せんげん}を {何|なん}と いうか。',
    answer: 'ポツダム宣言', acceptedAnswers: ['ぽつだむせんげん', 'ポツダムせんげん'], validationMode: 'kana-insensitive',
    hints: ['ドイツの {都市|とし}の {名前|なまえ}が ついて いる。', '8{月|がつ}15{日|にち}、{天皇|てんのう}が ラジオ{放送|ほうそう}で {国民|こくみん}に {降伏|こうふく}を {知|し}らせた。'],
    explanation: '{日本|にほん}は「ポツダム{宣言|せんげん}」を {受|う}け{入|い}れて {降伏|こうふく}し、8{月|がつ}15{日|にち}に {国民|こくみん}に {知|し}らされました。',
    reviewed: true
  },
  {
    id: 'social_g9_judiciary_001', subject: 'social', gradeLevel: 9, unit: 'judiciary',
    difficulty: 'standard', answerType: 'input',
    question: '2009{年|ねん}に {始|はじ}まった、{国民|こくみん}の {中|なか}から えらばれた {人|ひと}が {裁判官|さいばんかん}と いっしょに {重大|じゅうだい}な {刑事裁判|けいじさいばん}に {参加|さんか}する {制度|せいど}を {何|なん}と いうか。',
    answer: '裁判員制度', answerDisplay: '{裁判員制度|さいばんいんせいど}', acceptedAnswers: ['さいばんいんせいど', '裁判員'], validationMode: 'kana-insensitive',
    hints: ['{有罪|ゆうざい}か {無罪|むざい}か、{有罪|ゆうざい}なら どのような {刑罰|けいばつ}に するかを {決|き}める。', '「さいばん○○」の {制度|せいど}。'],
    explanation: '「{裁判員制度|さいばんいんせいど}」は、{国民|こくみん}の {感覚|かんかく}を {裁判|さいばん}に {反映|はんえい}させ、{司法|しほう}への {理解|りかい}と {信頼|しんらい}を {深|ふか}める ために {始|はじ}まりました。',
    reviewed: true
  },
  {
    id: 'social_g9_economy_004', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'standard', answerType: 'input',
    question: '{株式|かぶしき}を {発行|はっこう}して {多|おお}くの {人|ひと}から {資金|しきん}を {集|あつ}め、その {資金|しきん}で {事業|じぎょう}を {行|おこな}う {会社|かいしゃ}を {何|なん}と いうか。',
    answer: '株式会社', answerDisplay: '{株式会社|かぶしきがいしゃ}', acceptedAnswers: ['かぶしきがいしゃ'], validationMode: 'kana-insensitive',
    hints: ['{株式|かぶしき}を もつ {人|ひと}を {株主|かぶぬし}と いい、{利益|りえき}の {一部|いちぶ}を {配当|はいとう}として {受|う}け{取|と}る。', '{株主|かぶぬし}は {株主総会|かぶぬしそうかい}に {出席|しゅっせき}できる。'],
    explanation: '{株式|かぶしき}を {発行|はっこう}して {資金|しきん}を {集|あつ}める {会社|かいしゃ}を「{株式会社|かぶしきがいしゃ}」と いいます。{株主|かぶぬし}は {配当|はいとう}を {受|う}け{取|と}り、{株主総会|かぶぬしそうかい}で {会社|かいしゃ}の {方針|ほうしん}に {意見|いけん}を {述|の}べる ことが できます。',
    reviewed: true
  },
  {
    id: 'social_g9_international_002', subject: 'social', gradeLevel: 9, unit: 'international',
    difficulty: 'standard', answerType: 'input',
    question: '{国際連合|こくさいれんごう}の {安全保障理事会|あんぜんほしょうりじかい}で、{常任理事国|じょうにんりじこく}の 5か{国|こく}が もつ、1か{国|こく}でも {反対|はんたい}すると {重要|じゅうよう}な {問題|もんだい}を {決定|けってい}できない {権利|けんり}を {何|なん}と いうか。',
    answer: '拒否権', acceptedAnswers: ['きょひけん'], validationMode: 'kana-insensitive',
    hints: ['{常任理事国|じょうにんりじこく}は アメリカ・イギリス・フランス・ロシア・{中国|ちゅうごく}。', '「こばむ」という {意味|いみ}の {漢字|かんじ}が つく。'],
    explanation: '{常任理事国|じょうにんりじこく}が もつ {権利|けんり}を「{拒否権|きょひけん}」と いいます。1か{国|こく}でも {反対|はんたい}すると {決定|けってい}できないため、{安全保障理事会|あんぜんほしょうりじかい}が {機能|きのう}しにくく なる ことが あります。',
    reviewed: true
  },
  {
    id: 'social_g9_history_003', subject: 'social', gradeLevel: 9, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '1950{年代|ねんだい}{後半|こうはん}から 1973{年|ねん}の {石油危機|せきゆきき}まで {続|つづ}いた、{日本|にほん}の {経済|けいざい}が {急速|きゅうそく}に {成長|せいちょう}した {時期|じき}の ことを {何|なん}と いうか。',
    answer: '高度経済成長', answerDisplay: '{高度経済成長|こうどけいざいせいちょう}', acceptedAnswers: ['こうどけいざいせいちょう', '高度成長', 'こうどせいちょう'], validationMode: 'kana-insensitive',
    hints: ['{家庭|かてい}に テレビ・{電気|でんき}せんたく{機|き}・{電気冷蔵庫|でんきれいぞうこ}が {広|ひろ}まった。', '{一方|いっぽう}で、{公害|こうがい}が {大|おお}きな {問題|もんだい}に なった。'],
    explanation: 'この {時期|じき}を「{高度経済成長|こうどけいざいせいちょう}」と いいます。{国民|こくみん}の くらしは ゆたかに なりましたが、{公害|こうがい}や {過密|かみつ}・{過疎|かそ}などの {問題|もんだい}も おこりました。',
    reviewed: true
  },
  {
    id: 'social_g9_rights_002', subject: 'social', gradeLevel: 9, unit: 'rights',
    difficulty: 'standard', answerType: 'input',
    question: '{新|あたら}しい {人権|じんけん}の 1つで、{私生活|しせいかつ}や {個人|こじん}の {情報|じょうほう}を みだりに {公開|こうかい}されない {権利|けんり}を {何|なん}と いうか。',
    answer: 'プライバシーの権利', acceptedAnswers: ['プライバシー権', 'プライバシー', 'ぷらいばしーのけんり', 'プライバシーのけんり'], validationMode: 'kana-insensitive',
    hints: ['{情報化|じょうほうか}が {進|すす}んで、{重視|じゅうし}される ように なった。', '「○○○○○○の {権利|けんり}」。カタカナの ことばが {入|はい}る。'],
    explanation: '{私生活|しせいかつ}や {個人情報|こじんじょうほう}を {守|まも}る {権利|けんり}を「プライバシーの{権利|けんり}」と いいます。{環境権|かんきょうけん}・{知|し}る{権利|けんり}・{自己決定権|じこけっていけん}なども {新|あたら}しい {人権|じんけん}です。',
    reviewed: true
  },
  {
    id: 'social_g9_economy_005', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'standard', answerType: 'input',
    question: '{所得税|しょとくぜい}などで、{所得|しょとく}が {多|おお}い {人|ひと}ほど {高|たか}い {税率|ぜいりつ}を かける しくみを {何|なん}と いうか。',
    answer: '累進課税', acceptedAnswers: ['るいしんかぜい', '累進課税制度'], validationMode: 'kana-insensitive',
    hints: ['{所得|しょとく}の {格差|かくさ}を {小|ちい}さく する はたらきが ある。', '「るいしん」は、{段階的|だんかいてき}に {割合|わりあい}が {増|ふ}えて いく こと。'],
    explanation: '{所得|しょとく}が {多|おお}い {人|ひと}ほど {税率|ぜいりつ}を {高|たか}く する しくみを「{累進課税|るいしんかぜい}」と いいます。{所得|しょとく}の {再分配|さいぶんぱい}の はたらきが あります。',
    reviewed: true
  },
  {
    id: 'social_g9_politics_005', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'standard', answerType: 'choice',
    question: '「{衆議院|しゅうぎいん}の {優越|ゆうえつ}」の {例|れい}として {正|ただ}しいものは どれか。',
    choices: ['{予算|よさん}は {先|さき}に {衆議院|しゅうぎいん}で {審議|しんぎ}する', '{憲法改正|けんぽうかいせい}の {発議|はつぎ}は {衆議院|しゅうぎいん}だけで できる', '{参議院|さんぎいん}には {解散|かいさん}が ある', '{条約|じょうやく}の {承認|しょうにん}は {参議院|さんぎいん}だけで {行|おこな}う'],
    answer: '{予算|よさん}は {先|さき}に {衆議院|しゅうぎいん}で {審議|しんぎ}する',
    hints: ['{衆議院|しゅうぎいん}は {任期|にんき}が {短|みじか}く {解散|かいさん}も あるので、{国民|こくみん}の {意見|いけん}を {反映|はんえい}しやすいと される。', '{憲法改正|けんぽうかいせい}の {発議|はつぎ}には、{両|りょう}{議院|ぎいん}の {賛成|さんせい}が {必要|ひつよう}。'],
    explanation: '{予算|よさん}の {先議権|せんぎけん}は {衆議院|しゅうぎいん}の {優越|ゆうえつ}の 1つです。ほかに {内閣不信任|ないかくふしんにん}の {決議|けつぎ}も {衆議院|しゅうぎいん}だけが できます。{憲法改正|けんぽうかいせい}の {発議|はつぎ}では {衆議院|しゅうぎいん}の {優越|ゆうえつ}は なく、{解散|かいさん}が あるのは {衆議院|しゅうぎいん}だけです。',
    reviewed: true
  },
  {
    id: 'social_g9_international_003', subject: 'social', gradeLevel: 9, unit: 'international',
    difficulty: 'standard', answerType: 'choice',
    question: '{発展途上国|はってんとじょうこく}の {生産者|せいさんしゃ}の {生活|せいかつ}を {支|ささ}える ために、{農産物|のうさんぶつ}などを {適正|てきせい}な {価格|かかく}で {継続的|けいぞくてき}に {取引|とりひき}する しくみは どれか。',
    choices: ['フェアトレード', 'クーリング・オフ', 'ODA（{政府開発援助|せいふかいはつえんじょ}）', 'リサイクル'],
    answer: 'フェアトレード',
    hints: ['「フェア」は「{公正|こうせい}な」という {意味|いみ}。', 'コーヒーや チョコレートの {原料|げんりょう}などで {行|おこな}われて いる。'],
    explanation: '{発展途上国|はってんとじょうこく}の {生産者|せいさんしゃ}から {適正|てきせい}な {価格|かかく}で {買|か}い{続|つづ}ける しくみを「フェアトレード（{公正|こうせい}な {貿易|ぼうえき}）」と いいます。',
    inputForm: { question: '{発展途上国|はってんとじょうこく}の {生産者|せいさんしゃ}の {生活|せいかつ}を {支|ささ}える ために、{農産物|のうさんぶつ}などを {適正|てきせい}な {価格|かかく}で {継続的|けいぞくてき}に {取引|とりひき}する しくみを 何と いうか。', acceptedAnswers: ['フェア・トレード'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_economy_006', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'standard', answerType: 'choice',
    question: '{景気|けいき}が {過熱|かねつ}して {物価|ぶっか}が {上|あ}がり{続|つづ}けて いる ときに、{日本銀行|にっぽんぎんこう}が {行|おこな}う {政策|せいさく}として {正|ただ}しいものは どれか。',
    choices: ['{銀行|ぎんこう}に {国債|こくさい}などを {売|う}って、{世|よ}の {中|なか}に {出回|でまわ}る お{金|かね}の {量|りょう}を {減|へ}らす', '{銀行|ぎんこう}から {国債|こくさい}などを {買|か}って、{世|よ}の {中|なか}に {出回|でまわ}る お{金|かね}の {量|りょう}を {増|ふ}やす', '{税金|ぜいきん}を {減|へ}らす', '{公共事業|こうきょうじぎょう}を {増|ふ}やす'],
    answer: '{銀行|ぎんこう}に {国債|こくさい}などを {売|う}って、{世|よ}の {中|なか}に {出回|でまわ}る お{金|かね}の {量|りょう}を {減|へ}らす',
    hints: ['{景気|けいき}の {過熱|かねつ}を おさえるには、お{金|かね}を {借|か}りにくく する。', '{税金|ぜいきん}や {公共事業|こうきょうじぎょう}は {政府|せいふ}の {財政政策|ざいせいせいさく}。'],
    explanation: '{景気|けいき}が {過熱|かねつ}して いる ときは、{日本銀行|にっぽんぎんこう}が {銀行|ぎんこう}に {国債|こくさい}などを {売|う}り、{銀行|ぎんこう}の {資金|しきん}を {減|へ}らして お{金|かね}を {貸|か}し{出|だ}しにくく します（{金融政策|きんゆうせいさく}）。',
    reviewed: true
  },
  {
    id: 'social_g9_history_004', subject: 'social', gradeLevel: 9, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '1972{年|ねん}に アメリカから {日本|にほん}に {返還|へんかん}された {地域|ちいき}は どれか。',
    choices: ['{沖縄|おきなわ}', '{小笠原諸島|おがさわらしょとう}', '{奄美群島|あまみぐんとう}', '{北方領土|ほっぽうりょうど}'],
    answer: '{沖縄|おきなわ}',
    hints: ['{返還|へんかん}の あとも、{広|ひろ}い {米軍基地|べいぐんきち}が {残|のこ}って いる。', '{小笠原諸島|おがさわらしょとう}は 1968{年|ねん}、{奄美群島|あまみぐんとう}は 1953{年|ねん}に {返還|へんかん}された。'],
    explanation: '{沖縄|おきなわ}は 1972{年|ねん}に {日本|にほん}に {返還|へんかん}されました。{現在|げんざい}も {日本|にほん}の {米軍基地|べいぐんきち}の {多|おお}くが {沖縄|おきなわ}に {集中|しゅうちゅう}して います。{北方領土|ほっぽうりょうど}は、まだ {返還|へんかん}されて いません。',
    inputForm: { question: '1972{年|ねん}に アメリカから {日本|にほん}に {返還|へんかん}された 地域は どこか。', acceptedAnswers: ['おきなわ', '沖縄県'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_constitution_002', subject: 'social', gradeLevel: 9, unit: 'constitution',
    difficulty: 'advanced', answerType: 'input',
    question: '{日本国憲法|にほんこくけんぽう}の {改正|かいせい}は、{衆議院|しゅうぎいん}と {参議院|さんぎいん}の それぞれで {総議員|そうぎいん}の {何分|なんぶん}の{何|なん}{以上|いじょう}の {賛成|さんせい}で {国会|こっかい}が {発議|はつぎ}するか。「○{分|ぶん}の○」の {形|かたち}で {答|こた}えなさい。',
    answer: '3分の2', answerDisplay: '3{分|ぶん}の2', acceptedAnswers: ['2/3', '三分の二', 'さんぶんのに', '3ぶんの2'], validationMode: 'kana-insensitive',
    hints: ['{過半数|かはんすう}（2{分|ぶん}の1より {多|おお}い）よりも {厳|きび}しい {条件|じょうけん}。', '{発議|はつぎ}の あと、{国民投票|こくみんとうひょう}で {過半数|かはんすう}の {賛成|さんせい}が {必要|ひつよう}。'],
    explanation: '{憲法改正|けんぽうかいせい}は、{各|かく}{議院|ぎいん}の {総議員|そうぎいん}の 3{分|ぶん}の2{以上|いじょう}の {賛成|さんせい}で {国会|こっかい}が {発議|はつぎ}し、{国民投票|こくみんとうひょう}で {過半数|かはんすう}の {賛成|さんせい}を {得|え}ると {成立|せいりつ}します。',
    reviewed: true
  },
  {
    id: 'social_g9_economy_007', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'advanced', answerType: 'input',
    question: '{労働時間|ろうどうじかん}（1{日|にち}8{時間|じかん}{以内|いない}など）や {休日|きゅうじつ}など、{労働条件|ろうどうじょうけん}の {最低|さいてい}の {基準|きじゅん}を {定|さだ}めた {法律|ほうりつ}を {何|なん}と いうか。',
    answer: '労働基準法', acceptedAnswers: ['ろうどうきじゅんほう'], validationMode: 'kana-insensitive',
    hints: ['{労働組合法|ろうどうくみあいほう}・{労働関係調整法|ろうどうかんけいちょうせいほう}と あわせて「{労働三法|ろうどうさんぽう}」と よばれる。', '「{基準|きじゅん}」の ことばが {入|はい}る。'],
    explanation: '{労働条件|ろうどうじょうけん}の {最低基準|さいていきじゅん}を {定|さだ}めた {法律|ほうりつ}は「{労働基準法|ろうどうきじゅんほう}」です。{労働組合法|ろうどうくみあいほう}・{労働関係調整法|ろうどうかんけいちょうせいほう}と あわせて {労働三法|ろうどうさんぽう}と いいます。',
    reviewed: true
  },
  {
    id: 'social_g9_history_005', subject: 'social', gradeLevel: 9, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '1956{年|ねん}、{日本|にほん}と ソ{連|れん}の {国交|こっこう}が {回復|かいふく}した（{日|にっ}ソ{共同宣言|きょうどうせんげん}）ことで、{同|おな}じ {年|とし}に {実現|じつげん}した ことは どれか。',
    choices: ['{日本|にほん}の {国際連合|こくさいれんごう}への {加盟|かめい}', '{沖縄|おきなわ}の {日本|にほん}への {返還|へんかん}', '{北方領土|ほっぽうりょうど}の すべての {島|しま}の {返還|へんかん}', '{東京|とうきょう}オリンピックの {開催|かいさい}'],
    answer: '{日本|にほん}の {国際連合|こくさいれんごう}への {加盟|かめい}',
    hints: ['それまで ソ{連|れん}が、{日本|にほん}の ある {国際機関|こくさいきかん}への {加盟|かめい}に {反対|はんたい}して いた。', '{北方領土|ほっぽうりょうど}の {問題|もんだい}は、まだ {解決|かいけつ}して いない。'],
    explanation: '{日|にっ}ソ{共同宣言|きょうどうせんげん}で ソ{連|れん}との {国交|こっこう}が {回復|かいふく}し、ソ{連|れん}の {反対|はんたい}が なくなった ため、1956{年|ねん}に {日本|にほん}は {国際連合|こくさいれんごう}への {加盟|かめい}が {認|みと}められました。',
    inputForm: { question: '1956{年|ねん}、{日本|にほん}と ソ{連|れん}の {国交|こっこう}が {回復|かいふく}した（{日|にっ}ソ{共同宣言|きょうどうせんげん}）ことで、同じ 年に 日本が 加盟した 国際機関は 何か。', answer: '国際連合', acceptedAnswers: ['国連', 'こくさいれんごう', 'こくれん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'social_g9_rights_003', subject: 'social', gradeLevel: 9, unit: 'rights',
    difficulty: 'advanced', answerType: 'choice',
    question: '{選挙区|せんきょく}ごとに、{議員|ぎいん} 1{人|り}あたりの {有権者|ゆうけんしゃ}の {数|かず}が {大|おお}きく ちがう「{一票|いっぴょう}の {格差|かくさ}」は、{日本国憲法|にほんこくけんぽう}の どの {考|かんが}え{方|かた}に {反|はん}すると される ことが あるか。',
    choices: ['{法|ほう}の {下|もと}の {平等|びょうどう}', '{表現|ひょうげん}の {自由|じゆう}', '{勤労|きんろう}の {義務|ぎむ}', '{信教|しんきょう}の {自由|じゆう}'],
    answer: '{法|ほう}の {下|もと}の {平等|びょうどう}',
    hints: ['1{人|り}の {一票|いっぴょう}の {重|おも}みが、{住|す}む {場所|ばしょ}で ちがう ことが {問題|もんだい}。', '{日本国憲法|にほんこくけんぽう}{第|だい}14{条|じょう}。'],
    explanation: '{一票|いっぴょう}の {格差|かくさ}は、{有権者|ゆうけんしゃ}の {一票|いっぴょう}の {価値|かち}が {平等|びょうどう}で ない ことから、「{法|ほう}の {下|もと}の {平等|びょうどう}」（{第|だい}14{条|じょう}）に {反|はん}すると して、{裁判|さいばん}で {違憲|いけん}{状態|じょうたい}と {判断|はんだん}された ことが あります。',
    inputForm: { question: '{選挙区|せんきょく}ごとに、{議員|ぎいん} 1{人|り}あたりの {有権者|ゆうけんしゃ}の {数|かず}が {大|おお}きく ちがう「{一票|いっぴょう}の {格差|かくさ}」は、{日本国憲法|にほんこくけんぽう}の どんな 考え方に {反|はん}すると される ことが あるか。', answer: '法の下の平等', acceptedAnswers: ['法の 下の 平等', 'ほうのもとのびょうどう', '法のもとの平等'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  }
);
