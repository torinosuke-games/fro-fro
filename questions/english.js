// 問題データ：英語（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。人が内容を確認したら true にする（フェーズ7の問題と v0.3 で追加した問題は、どちらも 2026-09-26 に確認済み）。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// Lv1〜4 の自由入力は、英語の意味を日本語で答える・数字で答える形にしている（英語のつづりを書くのは Lv5 から）。
// 英語の自由入力は大文字・小文字を区別しない（js/answer.js の正規化）。
// v0.3（SPEC_v0.3.md 4章・B案）で各学年18問を足して27問にした：基礎6（4択3・自由入力3）、標準15（自由入力9・4択6）、発展6（自由入力3・4択3）。
// 追加した問題も上の決まりに従う。Lv1〜2 の日本語は ひらがな・カタカナだけ、Lv3 以上は漢字にすべて {漢字|よみ} を明示している。
// 短縮形（can't など）の答えには、スマートフォンで入力されやすい ’（右シングル引用符）の形も別解に入れている。
window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(

  // ===== Lv1（小学1年） =====
  {
    id: 'english_g1_word_001', subject: 'english', gradeLevel: 1, unit: 'word',
    difficulty: 'basic', answerType: 'choice',
    question: '「りんご」は えいごで どれかな。',
    choices: ['apple', 'banana', 'orange', 'grape'],
    answer: 'apple',
    hints: ['「アップル」と よむよ。', 'a から はじまる ことばだよ。'],
    explanation: '「りんご」は えいごで「apple（アップル）」です。banana は バナナ、orange は オレンジ、grape は ぶどうです。',
    inputForm: { question: '「りんご」は えいごで なんと いうかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_color_001', subject: 'english', gradeLevel: 1, unit: 'color',
    difficulty: 'basic', answerType: 'input',
    question: '「red（レッド）」は なにいろかな。ひらがなで かこう。',
    answer: 'あか', acceptedAnswers: ['赤', 'あかいろ', '赤色'], validationMode: 'kana-insensitive',
    hints: ['いちごや トマトの いろだよ。', 'しんごうの「とまれ」の いろだよ。'],
    explanation: '「red（レッド）」は「あか」です。',
    reviewed: true
  },
  {
    id: 'english_g1_animal_001', subject: 'english', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「dog（ドッグ）」は なんの どうぶつかな。ひらがなで かこう。',
    answer: 'いぬ', acceptedAnswers: ['犬'], validationMode: 'kana-insensitive',
    hints: ['「ワンワン」と なくよ。', 'さんぽが だいすきな どうぶつだよ。'],
    explanation: '「dog（ドッグ）」は「いぬ」です。',
    reviewed: true
  },
  {
    id: 'english_g1_number_001', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「three（スリー）」は いくつかな。すうじで かこう。',
    answer: '3', validationMode: 'number',
    hints: ['one（ワン）は 1、two（ツー）は 2 だよ。', 'two の つぎの かずだよ。'],
    explanation: '「three（スリー）」は 3 です。one（1）、two（2）、three（3）と かぞえます。',
    reviewed: true
  },
  {
    id: 'english_g1_animal_002', subject: 'english', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「cat（キャット）」は なんの どうぶつかな。ひらがなで かこう。',
    answer: 'ねこ', acceptedAnswers: ['猫'], validationMode: 'kana-insensitive',
    hints: ['「ニャー」と なくよ。', 'いぬと ならんで、いえで かわれる ことが おおい どうぶつだよ。'],
    explanation: '「cat（キャット）」は「ねこ」です。',
    reviewed: true
  },
  {
    id: 'english_g1_greeting_001', subject: 'english', gradeLevel: 1, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: 'あさ、ともだちに あった ときの あいさつは どれかな。',
    choices: ['Good morning.', 'Good night.', 'Goodbye.', 'Thank you.'],
    answer: 'Good morning.',
    hints: ['「morning（モーニング）」は「あさ」という いみだよ。', '「Good night.」は ねる まえの あいさつだよ。'],
    explanation: 'あさの あいさつは「Good morning.（おはよう）」です。「Good night.」は おやすみ、「Goodbye.」は さようなら、「Thank you.」は ありがとう です。',
    inputForm: { question: 'あさ、ともだちに あった ときの あいさつを えいごで いうと なにかな。', acceptedAnswers: ['Good morning', 'goodmorning'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_color_002', subject: 'english', gradeLevel: 1, unit: 'color',
    difficulty: 'standard', answerType: 'choice',
    question: '「blue（ブルー）」は なにいろかな。',
    choices: ['あお', 'きいろ', 'みどり', 'しろ'],
    answer: 'あお',
    hints: ['はれた ひの そらの いろだよ。', 'うみの いろにも にて いるよ。'],
    explanation: '「blue（ブルー）」は「あお」です。きいろは yellow、みどりは green、しろは white です。',
    inputForm: { acceptedAnswers: ['青', 'あおいろ', '青色'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_number_002', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「ten（テン）」は いくつかな。すうじで かこう。',
    answer: '10', validationMode: 'number',
    hints: ['りょうての ゆびを ぜんぶ たてた かずだよ。', 'nine（ナイン）＝9 の つぎの かずだよ。'],
    explanation: '「ten（テン）」は 10 です。',
    reviewed: true
  },
  {
    id: 'english_g1_greeting_002', subject: 'english', gradeLevel: 1, unit: 'greeting',
    difficulty: 'advanced', answerType: 'choice',
    question: '「ありがとう」は えいごで どれかな。',
    choices: ['Thank you.', 'Sorry.', 'Hello.', 'See you.'],
    answer: 'Thank you.',
    hints: ['「サンキュー」と よむよ。', 'なにかを して もらった ときに いう ことばだよ。'],
    explanation: '「ありがとう」は「Thank you.（サンキュー）」です。「Sorry.」は ごめんなさい、「Hello.」は こんにちは、「See you.」は またね です。',
    inputForm: { question: '「ありがとう」は えいごで なんと いうかな。', acceptedAnswers: ['Thank you', 'Thanks', 'Thanks.', 'thankyou'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g1_word_002', subject: 'english', gradeLevel: 1, unit: 'word',
    difficulty: 'basic', answerType: 'choice',
    question: '「ばなな」は えいごで どれかな。',
    choices: ['banana', 'apple', 'lemon', 'peach'],
    answer: 'banana',
    hints: ['「バナナ」と よむよ。', 'b から はじまる ことばだよ。'],
    explanation: '「ばなな」は えいごで「banana（バナナ）」です。apple は りんご、lemon は レモン、peach は もも です。',
    inputForm: { question: '「ばなな」は えいごで なんと いうかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_number_003', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'basic', answerType: 'choice',
    question: '「one（ワン）」は いくつかな。',
    choices: ['1', '2', '3', '4'],
    answer: '1',
    hints: ['かずを かぞえる ときの さいしょの かずだよ。', 'two（ツー）は 2 だよ。'],
    explanation: '「one（ワン）」は 1 です。one（1）、two（2）、three（3）と かぞえます。',
    inputForm: { acceptedAnswers: ['いち', 'ひとつ', '1こ'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_color_003', subject: 'english', gradeLevel: 1, unit: 'color',
    difficulty: 'basic', answerType: 'input',
    question: '「white（ホワイト）」は なにいろかな。ひらがなで かこう。',
    answer: 'しろ', acceptedAnswers: ['白', 'しろいろ', '白色'], validationMode: 'kana-insensitive',
    hints: ['ゆきや くもの いろだよ。', 'ぎゅうにゅうの いろにも にて いるよ。'],
    explanation: '「white（ホワイト）」は「しろ」です。',
    reviewed: true
  },
  {
    id: 'english_g1_animal_003', subject: 'english', gradeLevel: 1, unit: 'animal',
    difficulty: 'basic', answerType: 'input',
    question: '「rabbit（ラビット）」は なんの どうぶつかな。ひらがなで かこう。',
    answer: 'うさぎ', acceptedAnswers: ['兎', 'ウサギ'], validationMode: 'kana-insensitive',
    hints: ['ながい みみの どうぶつだよ。', 'ぴょんぴょん はねるよ。'],
    explanation: '「rabbit（ラビット）」は「うさぎ」です。',
    reviewed: true
  },
  {
    id: 'english_g1_number_004', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「five（ファイブ）」は いくつかな。すうじで かこう。',
    answer: '5', validationMode: 'number',
    hints: ['かたての ゆびを ぜんぶ たてた かずだよ。', 'four（フォー）＝4 の つぎの かずだよ。'],
    explanation: '「five（ファイブ）」は 5 です。',
    reviewed: true
  },
  {
    id: 'english_g1_color_004', subject: 'english', gradeLevel: 1, unit: 'color',
    difficulty: 'standard', answerType: 'input',
    question: '「green（グリーン）」は なにいろかな。ひらがなで かこう。',
    answer: 'みどり', acceptedAnswers: ['緑', 'みどりいろ', '緑色'], validationMode: 'kana-insensitive',
    hints: ['はっぱや くさの いろだよ。', 'しんごうの「すすめ」の いろにも つかわれるよ。'],
    explanation: '「green（グリーン）」は「みどり」です。',
    reviewed: true
  },
  {
    id: 'english_g1_animal_004', subject: 'english', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「fish（フィッシュ）」は なにかな。ひらがなで かこう。',
    answer: 'さかな', acceptedAnswers: ['魚', 'サカナ'], validationMode: 'kana-insensitive',
    hints: ['みずの なかを およいで いるよ。', 'えらで いきを するよ。'],
    explanation: '「fish（フィッシュ）」は「さかな」です。',
    reviewed: true
  },
  {
    id: 'english_g1_word_003', subject: 'english', gradeLevel: 1, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「sun（サン）」は なにかな。ひらがなで かこう。',
    answer: 'たいよう', acceptedAnswers: ['おひさま', 'おてんとうさま', '太陽', 'ひ', '日'], validationMode: 'kana-insensitive',
    hints: ['ひるま、そらで あかるく ひかって いるよ。', 'あさ ひがしから のぼって、ゆうがた にしに しずむよ。'],
    explanation: '「sun（サン）」は「たいよう（おひさま）」です。',
    reviewed: true
  },
  {
    id: 'english_g1_number_005', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「two（ツー）」は いくつかな。すうじで かこう。',
    answer: '2', validationMode: 'number',
    hints: ['one（ワン）＝1 の つぎの かずだよ。', 'めや みみの かずと おなじだよ。'],
    explanation: '「two（ツー）」は 2 です。',
    reviewed: true
  },
  {
    id: 'english_g1_word_004', subject: 'english', gradeLevel: 1, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「egg（エッグ）」は なにかな。ひらがなで かこう。',
    answer: 'たまご', acceptedAnswers: ['卵', 'タマゴ'], validationMode: 'kana-insensitive',
    hints: ['にわとりが うむよ。', 'めだまやきに するよ。'],
    explanation: '「egg（エッグ）」は「たまご」です。',
    reviewed: true
  },
  {
    id: 'english_g1_greeting_003', subject: 'english', gradeLevel: 1, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: 'よる、ねる まえの あいさつは どれかな。',
    choices: ['Good night.', 'Good morning.', 'Hello.', 'Thank you.'],
    answer: 'Good night.',
    hints: ['「night（ナイト）」は「よる」という いみだよ。', '「Good morning.」は あさの あいさつだね。'],
    explanation: 'ねる まえの あいさつは「Good night.（おやすみなさい）」です。',
    inputForm: { question: 'よる、ねる まえの あいさつを えいごで いうと なにかな。', acceptedAnswers: ['Good night', 'goodnight', 'Good night!'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_word_005', subject: 'english', gradeLevel: 1, unit: 'word',
    difficulty: 'standard', answerType: 'choice',
    question: '「くるま」は えいごで どれかな。',
    choices: ['car', 'cup', 'cat', 'cake'],
    answer: 'car',
    hints: ['「カー」と よむよ。', 'cup は コップ、cat は ねこ、cake は ケーキ だよ。'],
    explanation: '「くるま」は えいごで「car（カー）」です。',
    inputForm: { question: '「くるま」は えいごで なんと いうかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_color_005', subject: 'english', gradeLevel: 1, unit: 'color',
    difficulty: 'standard', answerType: 'choice',
    question: '「くろ」は えいごで どれかな。',
    choices: ['black', 'white', 'brown', 'blue'],
    answer: 'black',
    hints: ['「ブラック」と よむよ。', 'white は しろ、brown は ちゃいろ、blue は あお だよ。'],
    explanation: '「くろ」は えいごで「black（ブラック）」です。',
    inputForm: { question: '「くろ」は えいごで なんと いうかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_greeting_004', subject: 'english', gradeLevel: 1, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: '「ごめんなさい」は えいごで どれかな。',
    choices: ['Sorry.', 'Thank you.', 'Hello.', 'Good morning.'],
    answer: 'Sorry.',
    hints: ['「ソーリー」と よむよ。', 'わるい ことを した ときに いう ことばだよ。'],
    explanation: '「ごめんなさい」は「Sorry.（ソーリー）」です。「I\'m sorry.」とも いいます。',
    inputForm: { question: '「ごめんなさい」は えいごで なんと いうかな。', acceptedAnswers: ['Sorry', 'I\'m sorry', 'I\'m sorry.', 'Sorry!'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_number_006', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「six（シックス）」は いくつかな。すうじで かこう。',
    answer: '6', validationMode: 'number',
    hints: ['five（ファイブ）＝5 の つぎの かずだよ。', 'サイコロの いちばん おおきい めの かずだよ。'],
    explanation: '「six（シックス）」は 6 です。',
    reviewed: true
  },
  {
    id: 'english_g1_animal_005', subject: 'english', gradeLevel: 1, unit: 'animal',
    difficulty: 'advanced', answerType: 'input',
    question: '「elephant（エレファント）」は なんの どうぶつかな。ひらがなで かこう。',
    answer: 'ぞう', acceptedAnswers: ['象', 'ゾウ'], validationMode: 'kana-insensitive',
    hints: ['はなが とても ながい どうぶつだよ。', 'どうぶつえんで いちばん おおきい どうぶつの 1つだよ。'],
    explanation: '「elephant（エレファント）」は「ぞう」です。',
    reviewed: true
  },
  {
    id: 'english_g1_word_006', subject: 'english', gradeLevel: 1, unit: 'word',
    difficulty: 'advanced', answerType: 'choice',
    question: '「book（ブック）」は なにかな。',
    choices: ['ほん', 'つくえ', 'いす', 'かばん'],
    answer: 'ほん',
    hints: ['よんだり、えを みたり する ものだよ。', 'としょしつに たくさん あるよ。'],
    explanation: '「book（ブック）」は「ほん」です。つくえは desk、いすは chair、かばんは bag です。',
    inputForm: { acceptedAnswers: ['本'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g1_greeting_005', subject: 'english', gradeLevel: 1, unit: 'greeting',
    difficulty: 'advanced', answerType: 'choice',
    question: '「See you.（シー ユー）」は どんな いみかな。',
    choices: ['またね', 'おはよう', 'ありがとう', 'いただきます'],
    answer: 'またね',
    hints: ['ともだちと わかれる ときに いうよ。', '「また あおうね」という きもちの ことばだよ。'],
    explanation: '「See you.」は「またね」という いみで、わかれる ときの あいさつです。',
    inputForm: { acceptedAnswers: ['またね！', 'さようなら', 'じゃあね', 'またあとで', 'バイバイ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv2（小学2年） =====
  {
    id: 'english_g2_animal_001', subject: 'english', gradeLevel: 2, unit: 'animal',
    difficulty: 'basic', answerType: 'choice',
    question: '「ねこ」は えいごで どれかな。',
    choices: ['cat', 'dog', 'bird', 'fish'],
    answer: 'cat',
    hints: ['「キャット」と よむよ。', 'c から はじまる ことばだよ。'],
    explanation: '「ねこ」は「cat（キャット）」です。dog は いぬ、bird は とり、fish は さかなです。',
    inputForm: { question: '「ねこ」は えいごで なんと いうかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_color_001', subject: 'english', gradeLevel: 2, unit: 'color',
    difficulty: 'basic', answerType: 'input',
    question: '「yellow（イエロー）」は なにいろかな。ひらがなで かこう。',
    answer: 'きいろ', acceptedAnswers: ['黄色', 'きいろい', '黄色い'], validationMode: 'kana-insensitive',
    hints: ['バナナや レモンの いろだよ。', 'ひよこの いろにも にて いるよ。'],
    explanation: '「yellow（イエロー）」は「きいろ」です。',
    reviewed: true
  },
  {
    id: 'english_g2_number_001', subject: 'english', gradeLevel: 2, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「eight（エイト）」は いくつかな。すうじで かこう。',
    answer: '8', validationMode: 'number',
    hints: ['seven（セブン）＝7 の つぎの かずだよ。', 'たこの あしの かずと おなじだよ。'],
    explanation: '「eight（エイト）」は 8 です。',
    reviewed: true
  },
  {
    id: 'english_g2_animal_002', subject: 'english', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「bird（バード）」は なにかな。ひらがなで かこう。',
    answer: 'とり', acceptedAnswers: ['鳥'], validationMode: 'kana-insensitive',
    hints: ['はねが あって そらを とぶよ。', 'すずめや からすの なかまだよ。'],
    explanation: '「bird（バード）」は「とり」です。',
    reviewed: true
  },
  {
    id: 'english_g2_food_001', subject: 'english', gradeLevel: 2, unit: 'food',
    difficulty: 'standard', answerType: 'input',
    question: '「milk（ミルク）」は なにかな。ひらがなで かこう。',
    answer: 'ぎゅうにゅう', acceptedAnswers: ['牛乳', 'ミルク', 'みるく'], validationMode: 'kana-insensitive',
    hints: ['うしから とれる、しろい のみものだよ。', 'きゅうしょくで よく のむよ。'],
    explanation: '「milk（ミルク）」は「ぎゅうにゅう」です。',
    reviewed: true
  },
  {
    id: 'english_g2_greeting_001', subject: 'english', gradeLevel: 2, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: 'ともだちと わかれる ときの あいさつは どれかな。',
    choices: ['Goodbye.', 'Hello.', 'Good morning.', 'Nice to meet you.'],
    answer: 'Goodbye.',
    hints: ['「さようなら」の いみの ことばだよ。', '「Hello.」は あった ときの あいさつだよ。'],
    explanation: 'わかれる ときは「Goodbye.（さようなら）」と いいます。「See you.（またね）」とも いいます。',
    inputForm: { question: 'ともだちと わかれる ときの あいさつを えいごで いうと なにかな。', acceptedAnswers: ['Goodbye', 'Good bye', 'Good bye.', 'Bye', 'Bye.', 'See you', 'See you.'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_animal_003', subject: 'english', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'choice',
    question: '「さかな」は えいごで どれかな。',
    choices: ['fish', 'bird', 'frog', 'bear'],
    answer: 'fish',
    hints: ['「フィッシュ」と よむよ。', 'f から はじまる ことばだよ。'],
    explanation: '「さかな」は「fish（フィッシュ）」です。bird は とり、frog は かえる、bear は くまです。',
    inputForm: { question: '「さかな」は えいごで なんと いうかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_number_002', subject: 'english', gradeLevel: 2, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「seven（セブン）」は いくつかな。すうじで かこう。',
    answer: '7', validationMode: 'number',
    hints: ['six（シックス）＝6 の つぎの かずだよ。', '1しゅうかんの ひの かずと おなじだよ。'],
    explanation: '「seven（セブン）」は 7 です。',
    reviewed: true
  },
  {
    id: 'english_g2_greeting_002', subject: 'english', gradeLevel: 2, unit: 'greeting',
    difficulty: 'advanced', answerType: 'choice',
    question: '「How are you?（げんき？）」と きかれた ときの こたえに ぴったりなのは どれかな。',
    choices: ["I'm fine, thank you.", 'My name is Ken.', "I'm seven.", 'I like dogs.'],
    answer: "I'm fine, thank you.",
    hints: ['「げんき？」と きかれて いるよ。', '「fine（ファイン）」は「げんき」という いみだよ。'],
    explanation: '「How are you?（げんき？）」には「I\'m fine, thank you.（げんきだよ、ありがとう）」と こたえます。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g2_food_002', subject: 'english', gradeLevel: 2, unit: 'food',
    difficulty: 'basic', answerType: 'choice',
    question: '「ぶどう」は えいごで どれかな。',
    choices: ['grape', 'apple', 'melon', 'cherry'],
    answer: 'grape',
    hints: ['「グレープ」と よむよ。', 'g から はじまる ことばだよ。'],
    explanation: '「ぶどう」は「grape（グレープ）」です。melon は メロン、cherry は さくらんぼ です。',
    inputForm: { question: '「ぶどう」は えいごで なんと いうかな。', acceptedAnswers: ['grapes'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_body_001', subject: 'english', gradeLevel: 2, unit: 'body',
    difficulty: 'basic', answerType: 'choice',
    question: '「て」は えいごで どれかな。',
    choices: ['hand', 'foot', 'head', 'eye'],
    answer: 'hand',
    hints: ['「ハンド」と よむよ。', 'foot は あし、head は あたま、eye は め だよ。'],
    explanation: '「て」は「hand（ハンド）」です。',
    inputForm: { question: '「て」は えいごで なんと いうかな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_body_002', subject: 'english', gradeLevel: 2, unit: 'body',
    difficulty: 'basic', answerType: 'input',
    question: '「eye（アイ）」は からだの どこかな。ひらがなで かこう。',
    answer: 'め', acceptedAnswers: ['目'], validationMode: 'kana-insensitive',
    hints: ['ものを みる ところだよ。', 'かおに 2つ あるよ。'],
    explanation: '「eye（アイ）」は「め」です。',
    reviewed: true
  },
  {
    id: 'english_g2_food_003', subject: 'english', gradeLevel: 2, unit: 'food',
    difficulty: 'basic', answerType: 'input',
    question: '「water（ウォーター）」は なにかな。ひらがなで かこう。',
    answer: 'みず', acceptedAnswers: ['水'], validationMode: 'kana-insensitive',
    hints: ['のどが かわいた ときに のむよ。', 'すいどうから でて くるよ。'],
    explanation: '「water（ウォーター）」は「みず」です。',
    reviewed: true
  },
  {
    id: 'english_g2_number_003', subject: 'english', gradeLevel: 2, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「nine（ナイン）」は いくつかな。すうじで かこう。',
    answer: '9', validationMode: 'number',
    hints: ['eight（エイト）＝8 の つぎの かずだよ。', 'ten（テン）＝10 の ひとつ まえだよ。'],
    explanation: '「nine（ナイン）」は 9 です。',
    reviewed: true
  },
  {
    id: 'english_g2_family_001', subject: 'english', gradeLevel: 2, unit: 'family',
    difficulty: 'standard', answerType: 'input',
    question: '「mother（マザー）」は だれかな。ひらがなで かこう。',
    answer: 'おかあさん', acceptedAnswers: ['おかあちゃん', 'はは', 'ママ', 'まま', 'お母さん', '母'], validationMode: 'kana-insensitive',
    hints: ['かぞくの ひとりだよ。', 'father（ファーザー）は おとうさんだよ。'],
    explanation: '「mother（マザー）」は「おかあさん」です。',
    reviewed: true
  },
  {
    id: 'english_g2_animal_004', subject: 'english', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「bear（ベア）」は なんの どうぶつかな。ひらがなで かこう。',
    answer: 'くま', acceptedAnswers: ['熊', 'クマ'], validationMode: 'kana-insensitive',
    hints: ['もりに すむ、おおきくて ちからの つよい どうぶつだよ。', 'はちみつが すきな キャラクターも いるね。'],
    explanation: '「bear（ベア）」は「くま」です。「テディベア」は くまの ぬいぐるみの ことです。',
    reviewed: true
  },
  {
    id: 'english_g2_body_003', subject: 'english', gradeLevel: 2, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '「nose（ノーズ）」は からだの どこかな。ひらがなで かこう。',
    answer: 'はな', acceptedAnswers: ['鼻'], validationMode: 'kana-insensitive',
    hints: ['においを かぐ ところだよ。', 'かおの まんなかに あるよ。'],
    explanation: '「nose（ノーズ）」は「はな」です。',
    reviewed: true
  },
  {
    id: 'english_g2_color_002', subject: 'english', gradeLevel: 2, unit: 'color',
    difficulty: 'standard', answerType: 'input',
    question: '「black（ブラック）」は なにいろかな。ひらがなで かこう。',
    answer: 'くろ', acceptedAnswers: ['黒', 'くろいろ', '黒色'], validationMode: 'kana-insensitive',
    hints: ['よるの そらの いろだよ。', 'からすの いろだよ。'],
    explanation: '「black（ブラック）」は「くろ」です。',
    reviewed: true
  },
  {
    id: 'english_g2_weather_001', subject: 'english', gradeLevel: 2, unit: 'weather',
    difficulty: 'standard', answerType: 'input',
    question: '「snow（スノー）」は なにかな。ひらがなで かこう。',
    answer: 'ゆき', acceptedAnswers: ['雪'], validationMode: 'kana-insensitive',
    hints: ['ふゆに そらから ふって くる しろい ものだよ。', 'これで だるまを つくるよ。'],
    explanation: '「snow（スノー）」は「ゆき」です。「snowman（スノーマン）」は ゆきだるまです。',
    reviewed: true
  },
  {
    id: 'english_g2_family_002', subject: 'english', gradeLevel: 2, unit: 'family',
    difficulty: 'standard', answerType: 'choice',
    question: '「おとうさん」は えいごで どれかな。',
    choices: ['father', 'mother', 'brother', 'sister'],
    answer: 'father',
    hints: ['「ファーザー」と よむよ。', 'mother は おかあさんだよ。'],
    explanation: '「おとうさん」は「father（ファーザー）」です。brother は おとこの きょうだい、sister は おんなの きょうだいです。',
    inputForm: { question: '「おとうさん」は えいごで なんと いうかな。', acceptedAnswers: ['dad', 'daddy'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_food_004', subject: 'english', gradeLevel: 2, unit: 'food',
    difficulty: 'standard', answerType: 'choice',
    question: '「いちご」は えいごで どれかな。',
    choices: ['strawberry', 'tomato', 'potato', 'onion'],
    answer: 'strawberry',
    hints: ['「ストロベリー」と よむよ。', 'tomato は トマト、potato は じゃがいも、onion は たまねぎ だよ。'],
    explanation: '「いちご」は「strawberry（ストロベリー）」です。',
    inputForm: { question: '「いちご」は えいごで なんと いうかな。', acceptedAnswers: ['strawberries'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_greeting_003', subject: 'english', gradeLevel: 2, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: 'はじめて あった ひとに いう「はじめまして」は どれかな。',
    choices: ['Nice to meet you.', 'See you.', 'Good night.', 'Sorry.'],
    answer: 'Nice to meet you.',
    hints: ['「meet（ミート）」は「あう」という いみだよ。', '「あえて うれしいです」という きもちの ことばだよ。'],
    explanation: '「はじめまして」は「Nice to meet you.（ナイス トゥ ミート ユー）」です。',
    inputForm: { question: 'はじめて あった ひとに いう「はじめまして」は えいごで なんと いうかな。', acceptedAnswers: ['Nice to meet you', 'Nice to meet you!'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_animal_005', subject: 'english', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'choice',
    question: '「monkey（モンキー）」は なんの どうぶつかな。',
    choices: ['さる', 'うま', 'ぶた', 'ひつじ'],
    answer: 'さる',
    hints: ['きのぼりが とくいな どうぶつだよ。', 'バナナが すきだと いわれるね。'],
    explanation: '「monkey（モンキー）」は「さる」です。うまは horse、ぶたは pig、ひつじは sheep です。',
    inputForm: { acceptedAnswers: ['猿', 'おさる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g2_number_004', subject: 'english', gradeLevel: 2, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「eleven（イレブン）」は いくつかな。すうじで かこう。',
    answer: '11', validationMode: 'number',
    hints: ['ten（テン）＝10 の つぎの かずだよ。', 'サッカーの 1チームの にんずうと おなじだよ。'],
    explanation: '「eleven（イレブン）」は 11 です。12 は twelve（トゥエルブ）です。',
    reviewed: true
  },
  {
    id: 'english_g2_food_005', subject: 'english', gradeLevel: 2, unit: 'food',
    difficulty: 'advanced', answerType: 'input',
    question: '「rice（ライス）」は なにかな。ひらがなで かこう。',
    answer: 'ごはん', acceptedAnswers: ['こめ', 'おこめ', 'ライス', 'らいす', 'ご飯', '米', 'お米'], validationMode: 'kana-insensitive',
    hints: ['にほんの しょくじで よく たべる しろい ものだよ。', 'カレー○○○と いう りょうりも あるね。'],
    explanation: '「rice（ライス）」は「ごはん（おこめ）」です。',
    reviewed: true
  },
  {
    id: 'english_g2_greeting_004', subject: 'english', gradeLevel: 2, unit: 'greeting',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ともだちに「I\'m sorry.（ごめんね）」と いわれました。「いいよ」と こたえる ときは どれかな。',
    choices: ["That's OK.", "You're welcome.", 'Good night.', 'Nice to meet you.'],
    answer: "That's OK.",
    hints: ['「OK（オーケー）」は「だいじょうぶ」という いみだよ。', '「You\'re welcome.」は「どういたしまして」だよ。'],
    explanation: '「I\'m sorry.」に「いいよ」と こたえる ときは「That\'s OK.（だいじょうぶだよ）」と いいます。「You\'re welcome.」は、おれいを いわれた ときの「どういたしまして」です。',
    reviewed: true
  },
  {
    id: 'english_g2_body_004', subject: 'english', gradeLevel: 2, unit: 'body',
    difficulty: 'advanced', answerType: 'choice',
    question: '「Touch your head.」と いわれました。どう すれば よいかな。',
    choices: ['あたまを さわる', 'てを たたく', 'あしを あげる', 'めを とじる'],
    answer: 'あたまを さわる',
    hints: ['「head（ヘッド）」は あたまだよ。', '「touch（タッチ）」は「さわる」という いみだよ。'],
    explanation: '「Touch your head.」は「あたまを さわって」という いみです。',
    reviewed: true
  },

  // ===== Lv3（小学3年） =====
  {
    id: 'english_g3_greeting_001', subject: 'english', gradeLevel: 3, unit: 'greeting',
    difficulty: 'basic', answerType: 'choice',
    question: '「Hello.」の {意味|いみ}は どれかな。',
    choices: ['こんにちは', 'さようなら', 'ありがとう', 'ごめんなさい'],
    answer: 'こんにちは',
    hints: ['「ハロー」と {読|よ}むよ。', '{人|ひと}に {会|あ}った ときの あいさつだよ。'],
    explanation: '「Hello.（ハロー）」は「こんにちは」です。',
    inputForm: { question: '「Hello.」の 意味は 何かな。', acceptedAnswers: ['今日は', 'こんにちわ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g3_alphabet_001', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'basic', answerType: 'input',
    question: 'アルファベットで、A・B・C の {次|つぎ}の {文字|もじ}は {何|なに}かな。',
    answer: 'D', validationMode: 'exact',
    hints: ['ABCの {歌|うた}を {思|おも}い{出|だ}そう。', '「ディー」と {読|よ}む {文字|もじ}だよ。'],
    explanation: 'A・B・C の {次|つぎ}は「D（ディー）」です。A B C D E F G …と {続|つづ}きます。',
    reviewed: true
  },
  {
    id: 'english_g3_number_001', subject: 'english', gradeLevel: 3, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「fifteen（フィフティーン）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '15', validationMode: 'number',
    hints: ['five（ファイブ）は 5。「-teen（ティーン）」が つくと 10 {増|ふ}えるよ。', 'ten（10）と five（5）を {合|あ}わせた {数|かず}だよ。'],
    explanation: '「fifteen」は 15 です。13〜19 は「-teen」で {終|お}わります（thirteen＝13、fourteen＝14 など）。',
    reviewed: true
  },
  {
    id: 'english_g3_word_001', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「What color do you like?」の「color（カラー）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'いろ', acceptedAnswers: ['色'], validationMode: 'kana-insensitive',
    hints: ['red や blue の なかまを まとめた ことばだよ。', '「{何|なに}○○が すき？」と きいて いるよ。'],
    explanation: '「color」は「いろ」です。「What color do you like?」は「{何色|なにいろ}が すき？」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g3_word_002', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「I like apples.」の「like（ライク）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'すき', acceptedAnswers: ['好き', 'すきです', '好きです'], validationMode: 'kana-insensitive',
    hints: ['「わたしは りんごが ○○です」という {文|ぶん}だよ。', 'きらいの {反対|はんたい}だよ。'],
    explanation: '「like」は「すき」です。「I like apples.」は「わたしは りんごが すきです」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g3_number_002', subject: 'english', gradeLevel: 3, unit: 'number',
    difficulty: 'standard', answerType: 'choice',
    question: '「How many apples?（りんごは いくつ？）」と きかれました。りんごは 12{個|こ} あります。{正|ただ}しい {答|こた}えは どれかな。',
    choices: ['Twelve.', 'Twenty.', 'Two.', 'Eleven.'],
    answer: 'Twelve.',
    hints: ['eleven が 11 だよ。その {次|つぎ}の {数|かず}だよ。', 'twenty は 20、two は 2 だよ。'],
    explanation: '12 は「twelve（トゥエルブ）」です。11 は eleven、20 は twenty です。',
    inputForm: { question: '「How many apples?（りんごは いくつ？）」と きかれました。りんごは 12{個|こ} あります。英語で 答えよう。', acceptedAnswers: ['Twelve', 'twelve apples', 'Twelve apples.'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g3_greeting_002', subject: 'english', gradeLevel: 3, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: '「What\'s your name?」と きかれた ときの {答|こた}えとして ぴったりなのは どれかな。',
    choices: ['My name is Yuki.', "I'm fine.", 'I like dogs.', "It's red."],
    answer: 'My name is Yuki.',
    hints: ['「name（ネーム）」は「{名前|なまえ}」という {意味|いみ}だよ。', '{名前|なまえ}を きかれて いるよ。'],
    explanation: '「What\'s your name?」は「あなたの {名前|なまえ}は {何|なん}ですか」なので、「My name is Yuki.（わたしの {名前|なまえ}は ユキです）」と {答|こた}えます。',
    reviewed: true
  },
  {
    id: 'english_g3_alphabet_002', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'advanced', answerType: 'input',
    question: 'アルファベットで、M の {次|つぎ}の {文字|もじ}は {何|なに}かな。',
    answer: 'N', validationMode: 'exact',
    hints: ['H I J K L M … と {続|つづ}けて みよう。', '「エヌ」と {読|よ}む {文字|もじ}だよ。'],
    explanation: 'M の {次|つぎ}は「N（エヌ）」です。… K L M N O P …と {続|つづ}きます。',
    reviewed: true
  },
  {
    id: 'english_g3_phrase_001', subject: 'english', gradeLevel: 3, unit: 'phrase',
    difficulty: 'advanced', answerType: 'choice',
    question: '「How many?」の {意味|いみ}は どれかな。',
    choices: ['いくつ？', 'どこ？', 'だれ？', 'いつ？'],
    answer: 'いくつ？',
    hints: ['{数|かず}を たずねる ときに {使|つか}うよ。', '「many（メニー）」は「たくさん」という {意味|いみ}だよ。'],
    explanation: '「How many?」は「いくつ？」と {数|かず}を たずねる ことばです。「どこ？」は Where?、「だれ？」は Who?、「いつ？」は When? です。',
    inputForm: { question: '「How many?」の 意味は 何かな。', answer: 'いくつ', acceptedAnswers: ['いくつ？', 'いくつ?', '何個', 'なんこ', '何こ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g3_alphabet_003', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'basic', answerType: 'choice',
    question: '{小文字|こもじ}の「b」の {大文字|おおもじ}は どれかな。',
    choices: ['B', 'D', 'P', 'R'],
    answer: 'B',
    hints: ['「ビー」と {読|よ}む {文字|もじ}だよ。', 'A の {次|つぎ}の {文字|もじ}だよ。'],
    explanation: '「b」の {大文字|おおもじ}は「B」です。{小文字|こもじ}の b と d、p と q は {形|かたち}が にて いるので {気|き}を つけましょう。',
    reviewed: true
  },
  {
    id: 'english_g3_feeling_001', subject: 'english', gradeLevel: 3, unit: 'feeling',
    difficulty: 'basic', answerType: 'choice',
    question: '「I\'m happy.」の {意味|いみ}は どれかな。',
    choices: ['うれしい', 'かなしい', 'ねむい', 'おなかが すいた'],
    answer: 'うれしい',
    hints: ['「happy（ハッピー）」は、にこにこ する {気持|きも}ちだよ。', '「かなしい」は sad だよ。'],
    explanation: '「I\'m happy.」は「うれしい（しあわせ）」という {意味|いみ}です。かなしいは sad、ねむいは sleepy、おなかが すいたは hungry です。',
    inputForm: { question: '「I\'m happy.」の 意味は 何かな。', acceptedAnswers: ['嬉しい', 'しあわせ', '幸せ', 'たのしい', '楽しい'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g3_number_003', subject: 'english', gradeLevel: 3, unit: 'number',
    difficulty: 'basic', answerType: 'input',
    question: '「thirteen（サーティーン）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '13', validationMode: 'number',
    hints: ['「-teen（ティーン）」で {終|お}わる {数|かず}は、10より {大|おお}きく 20より {小|ちい}さいよ。', 'three（3）に にて いるね。'],
    explanation: '「thirteen」は 13 です。30 の thirty（サーティ）と まちがえないように しましょう。',
    reviewed: true
  },
  {
    id: 'english_g3_word_003', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'basic', answerType: 'input',
    question: '「flower（フラワー）」は {何|なに}かな。ひらがなで {書|か}こう。',
    answer: 'はな', acceptedAnswers: ['花', 'おはな', 'お花'], validationMode: 'kana-insensitive',
    hints: ['{春|はる}に たくさん さくよ。', 'チューリップや ひまわりの なかまだよ。'],
    explanation: '「flower（フラワー）」は「{花|はな}」です。',
    reviewed: true
  },
  {
    id: 'english_g3_word_004', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「What sport do you like?」の「sport（スポーツ）」の {意味|いみ}を {書|か}こう。',
    answer: 'スポーツ', acceptedAnswers: ['すぽーつ', 'うんどう', '運動'], validationMode: 'kana-insensitive',
    hints: ['サッカーや {野球|やきゅう}、{水泳|すいえい}などの なかまを まとめた ことばだよ。', '{日本語|にほんご}でも カタカナで {使|つか}う ことばだよ。'],
    explanation: '「sport」は「スポーツ（{運動|うんどう}）」です。「What sport do you like?」は「どんな スポーツが すき？」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g3_number_004', subject: 'english', gradeLevel: 3, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「nineteen（ナインティーン）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '19', validationMode: 'number',
    hints: ['nine（ナイン）は 9。「-teen」が つくと 10 {増|ふ}えるよ。', 'twenty（20）の ひとつ {前|まえ}の {数|かず}だよ。'],
    explanation: '「nineteen」は 19 です。',
    reviewed: true
  },
  {
    id: 'english_g3_word_005', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「hat（ハット）」は {何|なに}かな。ひらがなで {書|か}こう。',
    answer: 'ぼうし', acceptedAnswers: ['帽子', 'ハット'], validationMode: 'kana-insensitive',
    hints: ['{頭|あたま}に かぶる ものだよ。', '{夏|なつ}の {日|ひ}ざしから {頭|あたま}を {守|まも}るよ。'],
    explanation: '「hat（ハット）」は「ぼうし」です。つばの ない ぼうしは cap（キャップ）とも いいます。',
    reviewed: true
  },
  {
    id: 'english_g3_feeling_002', subject: 'english', gradeLevel: 3, unit: 'feeling',
    difficulty: 'standard', answerType: 'input',
    question: '「I\'m sleepy.」の「sleepy（スリーピー）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'ねむい', acceptedAnswers: ['眠い', 'ねむたい'], validationMode: 'kana-insensitive',
    hints: ['「sleep（スリープ）」は「ねむる」という {意味|いみ}だよ。', '{夜|よる} おそくまで おきて いると、こう なるね。'],
    explanation: '「sleepy」は「ねむい」です。「I\'m sleepy.」は「ねむいです」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g3_word_006', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「desk（デスク）」は {何|なに}かな。ひらがなで {書|か}こう。',
    answer: 'つくえ', acceptedAnswers: ['机'], validationMode: 'kana-insensitive',
    hints: ['{教室|きょうしつ}で {勉強|べんきょう}する ときに {使|つか}う {家具|かぐ}だよ。', 'いす（chair）と セットで {使|つか}うよ。'],
    explanation: '「desk（デスク）」は「つくえ」です。いすは chair（チェア）です。',
    reviewed: true
  },
  {
    id: 'english_g3_alphabet_004', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'standard', answerType: 'input',
    question: 'アルファベットの {大文字|おおもじ}は、A から Z まで {全部|ぜんぶ}で {何文字|なんもじ}かな。{数字|すうじ}で {書|か}こう。',
    answer: '26', acceptedAnswers: ['26文字'], validationMode: 'number',
    hints: ['ABCの {歌|うた}を {歌|うた}いながら {数|かぞ}えて みよう。', '20より {多|おお}く、30より {少|すく}ないよ。'],
    explanation: 'アルファベットは A から Z まで 26{文字|もじ}です。{大文字|おおもじ}と {小文字|こもじ}が あります。',
    reviewed: true
  },
  {
    id: 'english_g3_greeting_003', subject: 'english', gradeLevel: 3, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: '「Nice to meet you.」の {意味|いみ}は どれかな。',
    choices: ['はじめまして', 'おやすみなさい', 'さようなら', 'どういたしまして'],
    answer: 'はじめまして',
    hints: ['はじめて {会|あ}った {人|ひと}に {言|い}う ことばだよ。', '「meet」は「{会|あ}う」という {意味|いみ}だよ。'],
    explanation: '「Nice to meet you.」は「はじめまして（{会|あ}えて うれしいです）」という {意味|いみ}です。',
    inputForm: { question: '「Nice to meet you.」の 意味は 何かな。', acceptedAnswers: ['初めまして'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g3_phrase_002', subject: 'english', gradeLevel: 3, unit: 'phrase',
    difficulty: 'standard', answerType: 'choice',
    question: '「What do you like?」の {意味|いみ}は どれかな。',
    choices: ['{何|なに}が すきですか。', 'どこに いますか。', 'だれが すきですか。', 'いつ すきですか。'],
    answer: '{何|なに}が すきですか。',
    hints: ['「What（ワット）」は「{何|なに}」という {意味|いみ}だよ。', '「like」は「すき」だよ。'],
    explanation: '「What do you like?」は「{何|なに}が すきですか」と たずねる ことばです。',
    reviewed: true
  },
  {
    id: 'english_g3_word_007', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'choice',
    question: 'くだものでは ない ものは どれかな。',
    choices: ['carrot', 'apple', 'peach', 'lemon'],
    answer: 'carrot',
    hints: ['apple は りんご、peach は もも、lemon は レモンだよ。', '「キャロット」と {読|よ}む {野菜|やさい}が あるよ。'],
    explanation: '「carrot（キャロット）」は にんじんで、{野菜|やさい}です。apple・peach・lemon は くだものです。',
    reviewed: true
  },
  {
    id: 'english_g3_number_005', subject: 'english', gradeLevel: 3, unit: 'number',
    difficulty: 'standard', answerType: 'choice',
    question: '「How many cats?（ねこは {何|なん}びき？）」と きかれました。ねこは 3びき います。{正|ただ}しい {答|こた}えは どれかな。',
    choices: ['Three.', 'Tree.', 'Thirty.', 'Thirteen.'],
    answer: 'Three.',
    hints: ['3 は「スリー」と {言|い}うよ。', 'Tree（ツリー）は「{木|き}」、Thirty は 30、Thirteen は 13 だよ。'],
    explanation: '3 は「three（スリー）」です。tree（ツリー）は「{木|き}」という べつの ことばです。',
    inputForm: { question: '「How many cats?（ねこは {何|なん}びき？）」と きかれました。ねこは 3びき います。英語で 答えよう。', acceptedAnswers: ['Three', 'three cats', 'Three cats.'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g3_alphabet_005', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'advanced', answerType: 'input',
    question: 'アルファベットで、X の {次|つぎ}の {文字|もじ}は {何|なに}かな。',
    answer: 'Y', validationMode: 'exact',
    hints: ['アルファベットの {最後|さいご}の ほうだよ。… W X ? Z', '「ワイ」と {読|よ}む {文字|もじ}だよ。'],
    explanation: 'X の {次|つぎ}は「Y（ワイ）」です。… W X Y Z で {終|お}わります。',
    reviewed: true
  },
  {
    id: 'english_g3_family_001', subject: 'english', gradeLevel: 3, unit: 'family',
    difficulty: 'advanced', answerType: 'input',
    question: '「grandmother（グランドマザー）」は だれかな。ひらがなで {書|か}こう。',
    answer: 'おばあさん', acceptedAnswers: ['おばあちゃん', 'そぼ', '祖母', 'ばあば', 'おばあさま'], validationMode: 'kana-insensitive',
    hints: ['「mother」は おかあさんだよ。「grand」が つくと…？', 'おとうさんや おかあさんの おかあさんだよ。'],
    explanation: '「grandmother」は「おばあさん」です。おじいさんは grandfather（グランドファーザー）です。',
    reviewed: true
  },
  {
    id: 'english_g3_phrase_003', subject: 'english', gradeLevel: 3, unit: 'phrase',
    difficulty: 'advanced', answerType: 'choice',
    question: '「Here you are.」は、どんな ときに {使|つか}う ことばかな。',
    choices: ['{相手|あいて}に ものを わたす とき', '{相手|あいて}に {名前|なまえ}を きく とき', '{朝|あさ} {会|あ}った とき', 'ねる とき'],
    answer: '{相手|あいて}に ものを わたす とき',
    hints: ['「はい、どうぞ」という {意味|いみ}だよ。', 'お{店|みせ}で {品物|しなもの}を わたす ときにも {使|つか}うよ。'],
    explanation: '「Here you are.」は「はい、どうぞ」と {相手|あいて}に ものを わたす ときの ことばです。',
    reviewed: true
  },
  {
    id: 'english_g3_alphabet_006', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'advanced', answerType: 'choice',
    question: '「cat（ねこ）」を {大文字|おおもじ}だけで {書|か}くと どれかな。',
    choices: ['CAT', 'CUT', 'KAT', 'CAD'],
    answer: 'CAT',
    hints: ['c・a・t を 1{文字|もじ}ずつ {大文字|おおもじ}に しよう。', 'c の {大文字|おおもじ}は C、a は A、t は T だよ。'],
    explanation: '「cat」を {大文字|おおもじ}で {書|か}くと「CAT」です。',
    reviewed: true
  },

  // ===== Lv4（小学4年） =====
  {
    id: 'english_g4_week_001', subject: 'english', gradeLevel: 4, unit: 'week',
    difficulty: 'basic', answerType: 'choice',
    question: '「Monday」は {何曜日|なんようび}かな。',
    choices: ['{月曜日|げつようび}', '{日曜日|にちようび}', '{火曜日|かようび}', '{金曜日|きんようび}'],
    answer: '{月曜日|げつようび}',
    hints: ['「Mon」は「moon（{月|つき}）」から できたと いわれて いるよ。', '{週|しゅう}の {始|はじ}まりの {平日|へいじつ}だよ。'],
    explanation: '「Monday」は「{月曜日|げつようび}」です。Sunday＝{日曜日|にちようび}、Tuesday＝{火曜日|かようび}、Friday＝{金曜日|きんようび}です。',
    inputForm: { acceptedAnswers: ['月曜', 'げつようび'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g4_week_002', subject: 'english', gradeLevel: 4, unit: 'week',
    difficulty: 'basic', answerType: 'input',
    question: '「Sunday」は {何曜日|なんようび}かな。ひらがなで {書|か}こう。（{例|れい}：げつようび）',
    answer: 'にちようび', acceptedAnswers: ['日曜日', '日曜', 'にちよう', '日'], validationMode: 'kana-insensitive',
    hints: ['「Sun」は「{太陽|たいよう}」という {意味|いみ}だよ。', '{学校|がっこう}が お{休|やす}みの {日|ひ}だよ。'],
    explanation: '「Sunday」は「{日曜日|にちようび}」です。「Sun（{太陽|たいよう}）」の {日|ひ}という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g4_weather_001', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'standard', answerType: 'input',
    question: '「It\'s rainy.」は どんな {天気|てんき}かな。ひらがなで {書|か}こう。',
    answer: 'あめ', acceptedAnswers: ['雨'], validationMode: 'kana-insensitive',
    hints: ['「rain（レイン）」は {空|そら}から ふって くる ものだよ。', 'かさが {必要|ひつよう}な {天気|てんき}だよ。'],
    explanation: '「rainy」は「{雨|あめ}の」という {意味|いみ}で、「It\'s rainy.」は「{雨|あめ}です」です。sunny＝{晴|は}れ、cloudy＝くもり、snowy＝{雪|ゆき}です。',
    reviewed: true
  },
  {
    id: 'english_g4_time_001', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'standard', answerType: 'input',
    question: '「It\'s three o\'clock.」は {何時|なんじ}かな。{数字|すうじ}で {書|か}こう。',
    answer: '3', acceptedAnswers: ['3時'], validationMode: 'number',
    hints: ['「o\'clock（オクロック）」は「〜{時|じ}ちょうど」という {意味|いみ}だよ。', '「three」は いくつだったかな。'],
    explanation: '「It\'s three o\'clock.」は「3{時|じ}です」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g4_number_001', subject: 'english', gradeLevel: 4, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「twenty（トゥエンティ）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '20', validationMode: 'number',
    hints: ['「-ty（ティ）」で {終|お}わる {数|かず}は、10、20、30… のような {数|かず}だよ。', 'two（2）に にて いるね。'],
    explanation: '「twenty」は 20 です。30 は thirty、40 は forty です。',
    reviewed: true
  },
  {
    id: 'english_g4_phrase_001', subject: 'english', gradeLevel: 4, unit: 'phrase',
    difficulty: 'standard', answerType: 'choice',
    question: '「Let\'s play soccer.」の {意味|いみ}は どれかな。',
    choices: ['サッカーを しよう。', 'サッカーが すきです。', 'サッカーを しましたか。', 'サッカーは しません。'],
    answer: 'サッカーを しよう。',
    hints: ['「Let\'s（レッツ）〜.」は {相手|あいて}を さそう ときの ことばだよ。', '「〜しよう」という {意味|いみ}だよ。'],
    explanation: '「Let\'s 〜.」は「〜しよう」と さそう {言|い}い{方|かた}です。「Let\'s play soccer.」は「サッカーを しよう」です。',
    reviewed: true
  },
  {
    id: 'english_g4_word_001', subject: 'english', gradeLevel: 4, unit: 'school',
    difficulty: 'standard', answerType: 'choice',
    question: '「pencil」は どれかな。',
    choices: ['えんぴつ', 'けしゴム', 'ノート', 'じょうぎ'],
    answer: 'えんぴつ',
    hints: ['「ペンシル」と {読|よ}むよ。', '{字|じ}を {書|か}く {道具|どうぐ}だよ。'],
    explanation: '「pencil」は「えんぴつ」です。けしゴムは eraser、ノートは notebook、じょうぎは ruler です。',
    inputForm: { question: '「pencil」は 何かな。', acceptedAnswers: ['鉛筆'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g4_number_002', subject: 'english', gradeLevel: 4, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「thirty（サーティ）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '30', validationMode: 'number',
    hints: ['「-ty」で {終|お}わるので、10、20、30… の どれかだよ。', 'three（3）に にて いるね。'],
    explanation: '「thirty」は 30 です。13 の thirteen（サーティーン）と まちがえないように しましょう。',
    reviewed: true
  },
  {
    id: 'english_g4_time_002', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'advanced', answerType: 'choice',
    question: '「What time is it?」—「It\'s seven thirty.」 {今|いま}は {何時|なんじ}かな。',
    choices: ['7{時|じ}30{分|ぷん}', '7{時|じ}13{分|ぷん}', '3{時|じ}7{分|ふん}', '30{時|じ}7{分|ふん}'],
    answer: '7{時|じ}30{分|ぷん}',
    hints: ['{最初|さいしょ}の {数|かず}が「{時|じ}」、{次|つぎ}の {数|かず}が「{分|ふん}」だよ。', 'seven は 7、thirty は 30 だよ。'],
    explanation: '「seven thirty」は「7{時|じ}30{分|ぷん}」です。{時|じ}と {分|ふん}の {数|かず}を {順|じゅん}に {言|い}います。',
    inputForm: { answer: '7時30分', acceptedAnswers: ['7時半', '7:30', '7じはん', '7じ30ぷん', '7時30ぷん', '7じ30分', 'しちじはん'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g4_weather_002', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'basic', answerType: 'choice',
    question: '「It\'s sunny.」は どんな {天気|てんき}かな。',
    choices: ['{晴|は}れ', '{雨|あめ}', 'くもり', '{雪|ゆき}'],
    answer: '{晴|は}れ',
    hints: ['「sun（サン）」は「{太陽|たいよう}」だよ。', '{太陽|たいよう}が よく {出|で}て いる {天気|てんき}だね。'],
    explanation: '「sunny」は「{晴|は}れた」という {意味|いみ}で、「It\'s sunny.」は「{晴|は}れです」です。rainy＝{雨|あめ}、cloudy＝くもり、snowy＝{雪|ゆき}です。',
    inputForm: { acceptedAnswers: ['はれ', '晴'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g4_week_003', subject: 'english', gradeLevel: 4, unit: 'week',
    difficulty: 'basic', answerType: 'choice',
    question: '「Friday」は {何曜日|なんようび}かな。',
    choices: ['{金曜日|きんようび}', '{月曜日|げつようび}', '{水曜日|すいようび}', '{土曜日|どようび}'],
    answer: '{金曜日|きんようび}',
    hints: ['「フライデー」と {読|よ}むよ。', '{土曜日|どようび}の {前|まえ}の {日|ひ}だよ。'],
    explanation: '「Friday」は「{金曜日|きんようび}」です。Monday＝{月曜日|げつようび}、Wednesday＝{水曜日|すいようび}、Saturday＝{土曜日|どようび}です。',
    inputForm: { acceptedAnswers: ['金曜', 'きんようび'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g4_number_003', subject: 'english', gradeLevel: 4, unit: 'number',
    difficulty: 'basic', answerType: 'input',
    question: '「forty（フォーティ）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '40', validationMode: 'number',
    hints: ['「-ty」で {終|お}わる {数|かず}は 10、20、30… のような {数|かず}だよ。', 'four（4）に にて いるね。'],
    explanation: '「forty」は 40 です。four（4）の つづりと ちがって u が ない ことに {注意|ちゅうい}しましょう。',
    reviewed: true
  },
  {
    id: 'english_g4_word_002', subject: 'english', gradeLevel: 4, unit: 'school',
    difficulty: 'basic', answerType: 'input',
    question: '「eraser（イレイサー）」は {何|なに}かな。ひらがなか カタカナで {書|か}こう。',
    answer: 'けしゴム', acceptedAnswers: ['けしごむ', '消しゴム', 'ケシゴム'], validationMode: 'kana-insensitive',
    hints: ['{書|か}きまちがえた ときに {使|つか}う {道具|どうぐ}だよ。', 'えんぴつの {字|じ}を {消|け}すよ。'],
    explanation: '「eraser」は「{消|け}しゴム」です。',
    reviewed: true
  },
  {
    id: 'english_g4_week_004', subject: 'english', gradeLevel: 4, unit: 'week',
    difficulty: 'standard', answerType: 'input',
    question: '「Wednesday」は {何曜日|なんようび}かな。ひらがなで {書|か}こう。（{例|れい}：げつようび）',
    answer: 'すいようび', acceptedAnswers: ['水曜日', '水曜', 'すいよう', '水'], validationMode: 'kana-insensitive',
    hints: ['「ウェンズデー」と {読|よ}むよ（d は {読|よ}まない）。', '{火曜日|かようび}の {次|つぎ}の {日|ひ}だよ。'],
    explanation: '「Wednesday」は「{水曜日|すいようび}」です。つづりの d は {発音|はつおん}しません。',
    reviewed: true
  },
  {
    id: 'english_g4_time_003', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'standard', answerType: 'input',
    question: '「It\'s eight o\'clock.」は {何時|なんじ}かな。{数字|すうじ}で {書|か}こう。',
    answer: '8', acceptedAnswers: ['8時'], validationMode: 'number',
    hints: ['「o\'clock」は「〜{時|じ}ちょうど」という {意味|いみ}だよ。', '「eight」は いくつだったかな。'],
    explanation: '「It\'s eight o\'clock.」は「8{時|じ}です」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g4_weather_003', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'standard', answerType: 'input',
    question: '「It\'s snowy.」は どんな {天気|てんき}かな。ひらがなで {書|か}こう。',
    answer: 'ゆき', acceptedAnswers: ['雪'], validationMode: 'kana-insensitive',
    hints: ['「snow（スノー）」は {冬|ふゆ}に ふる {白|しろ}い ものだよ。', '{寒|さむ}い {日|ひ}の {天気|てんき}だよ。'],
    explanation: '「snowy」は「{雪|ゆき}の」という {意味|いみ}で、「It\'s snowy.」は「{雪|ゆき}です」です。',
    reviewed: true
  },
  {
    id: 'english_g4_word_003', subject: 'english', gradeLevel: 4, unit: 'school',
    difficulty: 'standard', answerType: 'input',
    question: '「library（ライブラリー）」は どんな {場所|ばしょ}かな。ひらがなで {書|か}こう。',
    answer: 'としょかん', acceptedAnswers: ['図書館', 'としょしつ', '図書室'], validationMode: 'kana-insensitive',
    hints: ['{本|ほん}が たくさん ある {場所|ばしょ}だよ。', '{本|ほん}を かりたり {読|よ}んだり できるよ。'],
    explanation: '「library」は「{図書館|としょかん}（{図書室|としょしつ}）」です。',
    reviewed: true
  },
  {
    id: 'english_g4_number_004', subject: 'english', gradeLevel: 4, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「fifty（フィフティ）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '50', validationMode: 'number',
    hints: ['「-ty」で {終|お}わるので、10 ずつの {数|かず}だよ。', 'five（5）に にて いるね。'],
    explanation: '「fifty」は 50 です。15 の fifteen（フィフティーン）と まちがえないように しましょう。',
    reviewed: true
  },
  {
    id: 'english_g4_phrase_002', subject: 'english', gradeLevel: 4, unit: 'phrase',
    difficulty: 'standard', answerType: 'input',
    question: '「I have a pen.」の「have（ハブ）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'もっている', acceptedAnswers: ['もって いる', 'もっています', 'もって います', 'もつ', '持っている', '持っています', '持つ'], validationMode: 'kana-insensitive',
    hints: ['「わたしは ペンを ○○○○○」という {文|ぶん}だよ。', '{手|て}に にぎって いたり、{自分|じぶん}の ものに して いたり する ことだよ。'],
    explanation: '「have」は「{持|も}って いる」です。「I have a pen.」は「わたしは ペンを {持|も}って います」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g4_phrase_003', subject: 'english', gradeLevel: 4, unit: 'phrase',
    difficulty: 'standard', answerType: 'choice',
    question: '「Do you have a ruler?」—「Yes, I do.」 この {人|ひと}は どう {答|こた}えて いるかな。',
    choices: ['じょうぎを {持|も}って いる', 'じょうぎを {持|も}って いない', 'じょうぎが すき', 'じょうぎを {買|か}いたい'],
    answer: 'じょうぎを {持|も}って いる',
    hints: ['「ruler（ルーラー）」は じょうぎだよ。', '「Yes」は「はい」だね。'],
    explanation: '「Do you have a ruler?」は「じょうぎを {持|も}って いますか」、「Yes, I do.」は「はい、{持|も}って います」です。',
    reviewed: true
  },
  {
    id: 'english_g4_word_004', subject: 'english', gradeLevel: 4, unit: 'school',
    difficulty: 'standard', answerType: 'choice',
    question: '「classroom（クラスルーム）」は どこかな。',
    choices: ['{教室|きょうしつ}', '{体育館|たいいくかん}', '{音楽室|おんがくしつ}', '{校庭|こうてい}'],
    answer: '{教室|きょうしつ}',
    hints: ['「class（クラス）」＋「room（{部屋|へや}）」だよ。', '{毎日|まいにち} {授業|じゅぎょう}を うける {部屋|へや}だよ。'],
    explanation: '「classroom」は「{教室|きょうしつ}」です。{体育館|たいいくかん}は gym、{音楽室|おんがくしつ}は music room、{校庭|こうてい}は schoolyard です。',
    inputForm: { acceptedAnswers: ['きょうしつ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g4_week_005', subject: 'english', gradeLevel: 4, unit: 'week',
    difficulty: 'standard', answerType: 'choice',
    question: '「What day is it today?」—「It\'s Tuesday.」 {今日|きょう}は {何曜日|なんようび}かな。',
    choices: ['{火曜日|かようび}', '{木曜日|もくようび}', '{日曜日|にちようび}', '{水曜日|すいようび}'],
    answer: '{火曜日|かようび}',
    hints: ['「チューズデー」と {読|よ}むよ。', 'Thursday（サーズデー）は {木曜日|もくようび}だよ。'],
    explanation: '「Tuesday」は「{火曜日|かようび}」です。つづりの にて いる Thursday（{木曜日|もくようび}）と まちがえないように しましょう。',
    inputForm: { acceptedAnswers: ['火曜', 'かようび'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g4_time_004', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'standard', answerType: 'choice',
    question: '「I get up at six.」の {意味|いみ}は どれかな。',
    choices: ['わたしは 6{時|じ}に {起|お}きます。', 'わたしは 6{時|じ}に ねます。', 'わたしは 6{時|じ}に {学校|がっこう}へ {行|い}きます。', 'わたしは 6{歳|さい}です。'],
    answer: 'わたしは 6{時|じ}に {起|お}きます。',
    hints: ['「get up（ゲット アップ）」は「{起|お}きる」だよ。', '「at 〜」は「〜{時|じ}に」だよ。'],
    explanation: '「get up」は「{起|お}きる」、「at six」は「6{時|じ}に」なので、「わたしは 6{時|じ}に {起|お}きます」です。「ねる」は go to bed です。',
    reviewed: true
  },
  {
    id: 'english_g4_number_005', subject: 'english', gradeLevel: 4, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「one hundred（ワン ハンドレッド）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '100', validationMode: 'number',
    hints: ['「hundred（ハンドレッド）」は「{百|ひゃく}」だよ。', 'ninety-nine（99）の {次|つぎ}の {数|かず}だよ。'],
    explanation: '「one hundred」は 100 です。「two hundred」なら 200 です。',
    reviewed: true
  },
  {
    id: 'english_g4_time_005', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'advanced', answerType: 'input',
    question: '「It\'s ten fifteen.」は 10{時|じ}{何分|なんぷん}かな。「{分|ふん}」の {数|かず}を {数字|すうじ}で {書|か}こう。',
    answer: '15', acceptedAnswers: ['15分'], validationMode: 'number',
    hints: ['{最初|さいしょ}の ten が「{時|じ}」、{次|つぎ}の fifteen が「{分|ふん}」だよ。', 'fifteen は いくつだったかな。'],
    explanation: '「ten fifteen」は「10{時|じ}15{分|ふん}」です。',
    reviewed: true
  },
  {
    id: 'english_g4_week_006', subject: 'english', gradeLevel: 4, unit: 'week',
    difficulty: 'advanced', answerType: 'choice',
    question: '「{土曜日|どようび}」を {英語|えいご}で {言|い}うと どれかな。',
    choices: ['Saturday', 'Sunday', 'Thursday', 'Tuesday'],
    answer: 'Saturday',
    hints: ['「サタデー」と {読|よ}むよ。', 'Sunday は {日曜日|にちようび}、Thursday は {木曜日|もくようび}、Tuesday は {火曜日|かようび}だよ。'],
    explanation: '「{土曜日|どようび}」は「Saturday」です。',
    inputForm: { question: '「{土曜日|どようび}」を 英語で 言うと 何かな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g4_phrase_004', subject: 'english', gradeLevel: 4, unit: 'phrase',
    difficulty: 'advanced', answerType: 'choice',
    question: '「Where is my cap?」—「It\'s on the desk.」 ぼうしは どこに あるかな。',
    choices: ['つくえの {上|うえ}', 'つくえの {下|した}', 'つくえの {中|なか}', 'つくえの よこ'],
    answer: 'つくえの {上|うえ}',
    hints: ['「on（オン）」は、ものの {上|うえ}に のって いる ときに {使|つか}うよ。', '「under」なら {下|した}、「in」なら {中|なか}だよ。'],
    explanation: '「on the desk」は「つくえの {上|うえ}に」です。under the desk は「つくえの {下|した}に」、in the desk は「つくえの {中|なか}に」です。',
    inputForm: { answer: 'つくえの上', acceptedAnswers: ['つくえの 上', '机の上', '机の 上', 'つくえのうえ', '上', 'うえ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv5（小学5年） =====
  {
    id: 'english_g5_month_001', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'basic', answerType: 'choice',
    question: '「April」は {何月|なんがつ}かな。',
    choices: ['4{月|がつ}', '8{月|がつ}', '5{月|がつ}', '10{月|がつ}'],
    answer: '4{月|がつ}',
    hints: ['{日本|にほん}では {新学期|しんがっき}が {始|はじ}まる {月|つき}だよ。', 'August は 8{月|がつ}、May は 5{月|がつ}、October は 10{月|がつ}だよ。'],
    explanation: '「April」は 4{月|がつ}です。',
    inputForm: { acceptedAnswers: ['4がつ', 'しがつ', '四月'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g5_spell_001', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「ねこ」を {英語|えいご}で {書|か}こう。（アルファベット 3{文字|もじ}）',
    answer: 'cat', validationMode: 'exact',
    hints: ['「キャット」と {読|よ}むよ。', 'c から {始|はじ}まるよ。'],
    explanation: '「ねこ」は「cat」です。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_002', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「いぬ」を {英語|えいご}で {書|か}こう。（アルファベット 3{文字|もじ}）',
    answer: 'dog', validationMode: 'exact',
    hints: ['「ドッグ」と {読|よ}むよ。', 'd から {始|はじ}まって g で {終|お}わるよ。'],
    explanation: '「いぬ」は「dog」です。',
    reviewed: true
  },
  {
    id: 'english_g5_can_001', subject: 'english', gradeLevel: 5, unit: 'can',
    difficulty: 'standard', answerType: 'input',
    question: '「I can swim.」の「swim」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'およぐ', acceptedAnswers: ['泳ぐ', 'およげる', '泳げる', 'すいえい', '水泳'], validationMode: 'kana-insensitive',
    hints: ['「can」は「〜できる」という {意味|いみ}だよ。', 'プールや {海|うみ}で する ことだよ。'],
    explanation: '「swim」は「およぐ」です。「I can swim.」は「わたしは およぐ ことが できます」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g5_month_002', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'standard', answerType: 'input',
    question: '「When is your birthday?」—「My birthday is May 5th.」 この {人|ひと}の {誕生日|たんじょうび}は {何月|なんがつ}かな。{数字|すうじ}で {書|か}こう。',
    answer: '5', acceptedAnswers: ['5月'], validationMode: 'number',
    hints: ['「birthday」は「{誕生日|たんじょうび}」だよ。', '「May」は {何月|なんがつ}かな。'],
    explanation: '「May」は 5{月|がつ}なので、{誕生日|たんじょうび}は 5{月|がつ}5{日|か}です。',
    reviewed: true
  },
  {
    id: 'english_g5_want_001', subject: 'english', gradeLevel: 5, unit: 'want',
    difficulty: 'standard', answerType: 'choice',
    question: '「I want to be a doctor.」の {意味|いみ}は どれかな。',
    choices: ['わたしは {医者|いしゃ}に なりたいです。', 'わたしは {医者|いしゃ}です。', 'わたしは {病院|びょういん}に {行|い}きました。', 'わたしは {医者|いしゃ}が すきです。'],
    answer: 'わたしは {医者|いしゃ}に なりたいです。',
    hints: ['「want to be 〜」は「〜に なりたい」という {意味|いみ}だよ。', '「doctor」は「{医者|いしゃ}」だよ。'],
    explanation: '「I want to be 〜.」は「〜に なりたい」と {将来|しょうらい}の {夢|ゆめ}を {伝|つた}える {言|い}い{方|かた}です。',
    reviewed: true
  },
  {
    id: 'english_g5_direction_001', subject: 'english', gradeLevel: 5, unit: 'direction',
    difficulty: 'standard', answerType: 'choice',
    question: '{道案内|みちあんない}で「Turn right.」と {言|い}われました。どう すれば よいかな。',
    choices: ['{右|みぎ}に {曲|ま}がる', '{左|ひだり}に {曲|ま}がる', 'まっすぐ {進|すす}む', '{止|と}まる'],
    answer: '{右|みぎ}に {曲|ま}がる',
    hints: ['「turn」は「{曲|ま}がる」という {意味|いみ}だよ。', '「right」は {右|みぎ}、「left」は {左|ひだり}だよ。'],
    explanation: '「Turn right.」は「{右|みぎ}に {曲|ま}がって」です。「Turn left.」は {左|ひだり}に {曲|ま}がる、「Go straight.」は まっすぐ {進|すす}む です。',
    inputForm: { answer: '右に曲がる', acceptedAnswers: ['右に 曲がる', 'みぎにまがる', '右へ曲がる', '右', 'みぎ', '右にまがる'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g5_spell_003', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'advanced', answerType: 'input',
    question: '「{本|ほん}」を {英語|えいご}で {書|か}こう。（アルファベット 4{文字|もじ}）',
    answer: 'book', validationMode: 'exact',
    hints: ['「ブック」と {読|よ}むよ。', 'b から {始|はじ}まり、o が 2つ {続|つづ}くよ。'],
    explanation: '「{本|ほん}」は「book」です。o を 2つ {続|つづ}けて {書|か}きます。',
    reviewed: true
  },
  {
    id: 'english_g5_month_003', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'advanced', answerType: 'choice',
    question: '「8{月|がつ}」を {英語|えいご}で {言|い}うと どれかな。',
    choices: ['August', 'October', 'June', 'March'],
    answer: 'August',
    hints: ['「オーガスト」と {読|よ}むよ。', 'October は 10{月|がつ}、June は 6{月|がつ}、March は 3{月|がつ}だよ。'],
    explanation: '8{月|がつ}は「August」です。',
    inputForm: { question: '「8{月|がつ}」を 英語で 言うと 何かな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g5_month_004', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'basic', answerType: 'choice',
    question: '「December」は {何月|なんがつ}かな。',
    choices: ['12{月|がつ}', '10{月|がつ}', '11{月|がつ}', '1{月|がつ}'],
    answer: '12{月|がつ}',
    hints: ['「ディセンバー」と {読|よ}むよ。', '1{年|ねん}の {最後|さいご}の {月|つき}だよ。'],
    explanation: '「December」は 12{月|がつ}です。October は 10{月|がつ}、November は 11{月|がつ}、January は 1{月|がつ}です。',
    inputForm: { acceptedAnswers: ['12がつ', 'じゅうにがつ', '十二月'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g5_can_002', subject: 'english', gradeLevel: 5, unit: 'can',
    difficulty: 'basic', answerType: 'choice',
    question: '「I can\'t swim.」の {意味|いみ}は どれかな。',
    choices: ['わたしは {泳|およ}げません。', 'わたしは {泳|およ}げます。', 'わたしは {泳|およ}ぎたいです。', 'わたしは {泳|およ}ぎました。'],
    answer: 'わたしは {泳|およ}げません。',
    hints: ['「can\'t」は「cannot（〜できない）」を {短|みじか}く した {形|かたち}だよ。', '「can」は「〜できる」だね。'],
    explanation: '「can\'t（cannot）」は「〜できない」なので、「I can\'t swim.」は「わたしは {泳|およ}げません」です。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_004', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「{赤|あか}」を {英語|えいご}で {書|か}こう。（アルファベット 3{文字|もじ}）',
    answer: 'red', validationMode: 'exact',
    hints: ['「レッド」と {読|よ}むよ。', 'r から {始|はじ}まって d で {終|お}わるよ。'],
    explanation: '「{赤|あか}」は「red」です。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_005', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「ペン」を {英語|えいご}で {書|か}こう。（アルファベット 3{文字|もじ}）',
    answer: 'pen', validationMode: 'exact',
    hints: ['{読|よ}み{方|かた}は {日本語|にほんご}と ほとんど {同|おな}じだよ。', 'p から {始|はじ}まるよ。'],
    explanation: '「ペン」は「pen」です。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_006', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「たまご」を {英語|えいご}で {書|か}こう。（アルファベット 3{文字|もじ}）',
    answer: 'egg', validationMode: 'exact',
    hints: ['「エッグ」と {読|よ}むよ。', 'e から {始|はじ}まり、g が 2つ {続|つづ}くよ。'],
    explanation: '「たまご」は「egg」です。g を 2つ {続|つづ}けて {書|か}きます。',
    reviewed: true
  },
  {
    id: 'english_g5_month_005', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'standard', answerType: 'input',
    question: '「January」は {何月|なんがつ}かな。{数字|すうじ}で {書|か}こう。',
    answer: '1', acceptedAnswers: ['1月'], validationMode: 'number',
    hints: ['「ジャニュアリー」と {読|よ}むよ。', '1{年|ねん}の {始|はじ}まりの {月|つき}だよ。'],
    explanation: '「January」は 1{月|がつ}です。2{月|がつ}は February です。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_007', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「{魚|さかな}」を {英語|えいご}で {書|か}こう。（アルファベット 4{文字|もじ}）',
    answer: 'fish', validationMode: 'exact',
    hints: ['「フィッシュ」と {読|よ}むよ。', 'f から {始|はじ}まり、「シュ」の {音|おと}は sh と {書|か}くよ。'],
    explanation: '「{魚|さかな}」は「fish」です。「シュ」の {音|おと}は sh で {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'english_g5_direction_002', subject: 'english', gradeLevel: 5, unit: 'direction',
    difficulty: 'standard', answerType: 'input',
    question: '{道案内|みちあんない}で「Go straight.」と {言|い}われました。どう {進|すす}めば よいかな。ひらがなで {書|か}こう。',
    answer: 'まっすぐ', acceptedAnswers: ['まっすぐすすむ', 'まっすぐ すすむ', 'まっすぐいく', 'まっすぐ いく', '真っすぐ', '真っ直ぐ'], validationMode: 'kana-insensitive',
    hints: ['「straight（ストレート）」は「まがらずに」という {意味|いみ}だよ。', '{右|みぎ}にも {左|ひだり}にも {曲|ま}がらないよ。'],
    explanation: '「Go straight.」は「まっすぐ {進|すす}んで」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_008', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「{青|あお}」を {英語|えいご}で {書|か}こう。（アルファベット 4{文字|もじ}）',
    answer: 'blue', validationMode: 'exact',
    hints: ['「ブルー」と {読|よ}むよ。', 'b・l で {始|はじ}まり、{最後|さいご}は e で {終|お}わるよ。'],
    explanation: '「{青|あお}」は「blue」です。{最後|さいご}の e を わすれないように しましょう。',
    reviewed: true
  },
  {
    id: 'english_g5_want_002', subject: 'english', gradeLevel: 5, unit: 'want',
    difficulty: 'standard', answerType: 'input',
    question: '「I want a new bike.」の「want（ウォント）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'ほしい', acceptedAnswers: ['ほしいです', '欲しい', '欲しいです'], validationMode: 'kana-insensitive',
    hints: ['「わたしは {新|あたら}しい {自転車|じてんしゃ}が ○○○」という {文|ぶん}だよ。', '「〜を {手|て}に {入|い}れたい」という {気持|きも}ちの ことばだよ。'],
    explanation: '「want」は「ほしい」です。「I want a new bike.」は「わたしは {新|あたら}しい {自転車|じてんしゃ}が ほしいです」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g5_job_001', subject: 'english', gradeLevel: 5, unit: 'job',
    difficulty: 'standard', answerType: 'choice',
    question: '「teacher（ティーチャー）」は どんな {職業|しょくぎょう}かな。',
    choices: ['{先生|せんせい}', '{医者|いしゃ}', 'コック', '{警察官|けいさつかん}'],
    answer: '{先生|せんせい}',
    hints: ['「teach（ティーチ）」は「{教|おし}える」という {意味|いみ}だよ。', '{学校|がっこう}で はたらいて いる {人|ひと}だよ。'],
    explanation: '「teacher」は「{先生|せんせい}」です。{医者|いしゃ}は doctor、コックは cook、{警察官|けいさつかん}は police officer です。',
    inputForm: { acceptedAnswers: ['せんせい', '教師', 'きょうし'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g5_direction_003', subject: 'english', gradeLevel: 5, unit: 'direction',
    difficulty: 'standard', answerType: 'choice',
    question: '「Where is the station?」の {意味|いみ}は どれかな。',
    choices: ['{駅|えき}は どこですか。', '{駅|えき}は {遠|とお}いですか。', '{駅|えき}へ {行|い}きましょう。', 'これは {駅|えき}ですか。'],
    answer: '{駅|えき}は どこですか。',
    hints: ['「Where（ウェア）」は「どこ」という {意味|いみ}だよ。', '「station（ステーション）」は {駅|えき}だよ。'],
    explanation: '「Where is 〜?」は「〜は どこですか」と {場所|ばしょ}を たずねる {言|い}い{方|かた}です。',
    reviewed: true
  },
  {
    id: 'english_g5_month_006', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'standard', answerType: 'choice',
    question: '「My birthday is in March.」 この {人|ひと}の {誕生日|たんじょうび}は {何月|なんがつ}かな。',
    choices: ['3{月|がつ}', '5{月|がつ}', '1{月|がつ}', '11{月|がつ}'],
    answer: '3{月|がつ}',
    hints: ['「マーチ」と {読|よ}むよ。', '{日本|にほん}では ひなまつりの ある {月|つき}だよ。'],
    explanation: '「March」は 3{月|がつ}です。May は 5{月|がつ}、January は 1{月|がつ}、November は 11{月|がつ}です。',
    inputForm: { acceptedAnswers: ['3がつ', 'さんがつ', '三月'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g5_can_003', subject: 'english', gradeLevel: 5, unit: 'can',
    difficulty: 'standard', answerType: 'choice',
    question: '「Can you cook?」—「No, I can\'t.」 この {人|ひと}は どう {答|こた}えて いるかな。',
    choices: ['{料理|りょうり}は できない', '{料理|りょうり}が できる', '{料理|りょうり}が すき', '{料理|りょうり}を {食|た}べたい'],
    answer: '{料理|りょうり}は できない',
    hints: ['「cook（クック）」は「{料理|りょうり}する」だよ。', '「No」と {答|こた}えて いるね。'],
    explanation: '「Can you cook?」は「{料理|りょうり}が できますか」、「No, I can\'t.」は「いいえ、できません」です。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_009', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'advanced', answerType: 'input',
    question: '「3」を {英語|えいご}の つづりで {書|か}こう。（アルファベット 5{文字|もじ}）',
    answer: 'three', validationMode: 'exact',
    hints: ['「スリー」と {読|よ}むよ。', 'th で {始|はじ}まり、e が 2つ {続|つづ}いて {終|お}わるよ。'],
    explanation: '「3」は「three」です。tree（{木|き}）と まちがえないように、h を {入|い}れましょう。',
    reviewed: true
  },
  {
    id: 'english_g5_spell_010', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'advanced', answerType: 'input',
    question: '「{学校|がっこう}」を {英語|えいご}で {書|か}こう。（アルファベット 6{文字|もじ}）',
    answer: 'school', validationMode: 'exact',
    hints: ['「スクール」と {読|よ}むよ。', 's・c・h で {始|はじ}まり、o が 2つ {続|つづ}くよ。'],
    explanation: '「{学校|がっこう}」は「school」です。「ク」の {音|おと}を ch と {書|か}く ことに {注意|ちゅうい}しましょう。',
    reviewed: true
  },
  {
    id: 'english_g5_want_003', subject: 'english', gradeLevel: 5, unit: 'want',
    difficulty: 'advanced', answerType: 'choice',
    question: 'お{店|みせ}で「What would you like?（{何|なに}に なさいますか）」と きかれました。ピザを ていねいに {注文|ちゅうもん}する とき、{正|ただ}しいのは どれかな。',
    choices: ["I'd like pizza, please.", 'I like pizza.', 'I ate pizza.', 'I can pizza.'],
    answer: "I'd like pizza, please.",
    hints: ['「I\'d like 〜.」は「〜が ほしいです」の ていねいな {言|い}い{方|かた}だよ。', '「I like 〜.」は「〜が すき」という {意味|いみ}だね。'],
    explanation: '「I\'d like 〜, please.」は「〜を お{願|ねが}いします」と ていねいに {注文|ちゅうもん}する {言|い}い{方|かた}です。「I like pizza.」は「ピザが すきです」という {意味|いみ}に なります。',
    reviewed: true
  },
  {
    id: 'english_g5_month_007', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'advanced', answerType: 'choice',
    question: '「10{月|がつ}」を {英語|えいご}で {言|い}うと どれかな。',
    choices: ['October', 'August', 'November', 'September'],
    answer: 'October',
    hints: ['「オクトーバー」と {読|よ}むよ。', 'August は 8{月|がつ}、September は 9{月|がつ}、November は 11{月|がつ}だよ。'],
    explanation: '10{月|がつ}は「October」です。',
    inputForm: { question: '「10{月|がつ}」を 英語で 言うと 何かな。', validationMode: 'exact', reviewed: false },
    reviewed: true
  },

  // ===== Lv6（小学6年） =====
  {
    id: 'english_g6_past_001', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'basic', answerType: 'choice',
    question: '「I went to Kyoto.（わたしは {京都|きょうと}に {行|い}きました）」の「went」は、どの ことばが {変|か}わった {形|かたち}かな。',
    choices: ['go', 'get', 'give', 'want'],
    answer: 'go',
    hints: ['「{行|い}く」という {意味|いみ}の ことばだよ。', '「{行|い}った」と {過去|かこ}の ことを {言|い}う ときに {形|かたち}が {変|か}わるよ。'],
    explanation: '「went」は「go（{行|い}く）」の {過去|かこ}の {形|かたち}です。',
    inputForm: { validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g6_spell_001', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「{夏|なつ}」を {英語|えいご}で {書|か}こう。',
    answer: 'summer', validationMode: 'exact',
    hints: ['「サマー」と {読|よ}むよ。', 's から {始|はじ}まり、m が 2つ {続|つづ}くよ。'],
    explanation: '「{夏|なつ}」は「summer」です。{春|はる}は spring、{秋|あき}は fall（autumn）、{冬|ふゆ}は winter です。',
    reviewed: true
  },
  {
    id: 'english_g6_spell_002', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「{水|みず}」を {英語|えいご}で {書|か}こう。',
    answer: 'water', validationMode: 'exact',
    hints: ['「ウォーター」と {読|よ}むよ。', 'w から {始|はじ}まる 5{文字|もじ}の ことばだよ。'],
    explanation: '「{水|みず}」は「water」です。',
    reviewed: true
  },
  {
    id: 'english_g6_past_002', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'input',
    question: '「I ate curry.（わたしは カレーを {食|た}べました）」の「ate」の もとの {形|かたち}を {英語|えいご}で {書|か}こう。',
    answer: 'eat', validationMode: 'exact',
    hints: ['「{食|た}べる」という {意味|いみ}の ことばだよ。', 'アルファベット 3{文字|もじ}。e から {始|はじ}まるよ。'],
    explanation: '「ate」は「eat（{食|た}べる）」の {過去|かこ}の {形|かたち}です。',
    reviewed: true
  },
  {
    id: 'english_g6_subject_001', subject: 'english', gradeLevel: 6, unit: 'subject',
    difficulty: 'standard', answerType: 'input',
    question: '「My favorite subject is math.」の「math」は {何|なん}の {教科|きょうか}かな。ひらがなで {書|か}こう。',
    answer: 'さんすう', acceptedAnswers: ['算数', 'すうがく', '数学'], validationMode: 'kana-insensitive',
    hints: ['「subject」は「{教科|きょうか}」という {意味|いみ}だよ。', '{計算|けいさん}や {図形|ずけい}を {勉強|べんきょう}する {教科|きょうか}だよ。'],
    explanation: '「math」は「{算数|さんすう}（{数学|すうがく}）」です。{英語|えいご}は English、{理科|りか}は science、{社会|しゃかい}は social studies です。',
    reviewed: true
  },
  {
    id: 'english_g6_want_001', subject: 'english', gradeLevel: 6, unit: 'want',
    difficulty: 'standard', answerType: 'choice',
    question: '「What do you want to be?」と きかれた ときの {答|こた}えとして ぴったりなのは どれかな。',
    choices: ['I want to be a teacher.', 'I like teachers.', 'I am a student.', 'I went to school.'],
    answer: 'I want to be a teacher.',
    hints: ['「{何|なに}に なりたいですか」と きかれて いるよ。', '{同|おな}じ「want to be」を {使|つか}って {答|こた}えよう。'],
    explanation: '「What do you want to be?（{何|なに}に なりたいですか）」には「I want to be a teacher.（{先生|せんせい}に なりたいです）」のように {答|こた}えます。',
    reviewed: true
  },
  {
    id: 'english_g6_past_003', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'choice',
    question: '「I enjoyed swimming.」の {意味|いみ}は どれかな。',
    choices: ['わたしは {水泳|すいえい}を {楽|たの}しみました。', 'わたしは {水泳|すいえい}を {楽|たの}しみます。', 'わたしは {水泳|すいえい}が {好|す}きでは ありません。', 'わたしは {水泳|すいえい}を したいです。'],
    answer: 'わたしは {水泳|すいえい}を {楽|たの}しみました。',
    hints: ['「enjoy」は「{楽|たの}しむ」という {意味|いみ}だよ。', '「-ed」が ついて いるので、{過去|かこ}の ことだよ。'],
    explanation: '「enjoyed」は「enjoy（{楽|たの}しむ）」の {過去|かこ}の {形|かたち}なので、「{楽|たの}しみました」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g6_word_001', subject: 'english', gradeLevel: 6, unit: 'word',
    difficulty: 'advanced', answerType: 'input',
    question: '「big（{大|おお}きい）」の {反対|はんたい}の {意味|いみ}の {英語|えいご}を {書|か}こう。',
    answer: 'small', acceptedAnswers: ['little'], validationMode: 'exact',
    hints: ['「{小|ちい}さい」という {意味|いみ}の ことばだよ。', '「スモール」と {読|よ}むよ。'],
    explanation: '「big」の {反対|はんたい}は「small（{小|ちい}さい）」です。「little」も {小|ちい}さいという {意味|いみ}で {使|つか}えます。',
    reviewed: true
  },
  {
    id: 'english_g6_can_001', subject: 'english', gradeLevel: 6, unit: 'can',
    difficulty: 'advanced', answerType: 'choice',
    question: '「Can you play the piano?」に「はい、ひけます」と {答|こた}える とき、{正|ただ}しいのは どれかな。',
    choices: ['Yes, I can.', 'Yes, I do.', 'Yes, I am.', 'Yes, you can.'],
    answer: 'Yes, I can.',
    hints: ['「Can you 〜?」と きかれて いるよ。', 'きかれた ことばと {同|おな}じ「can」を {使|つか}って {答|こた}えよう。'],
    explanation: '「Can you 〜?」には「Yes, I can.」か「No, I can\'t.」で {答|こた}えます。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g6_past_004', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'basic', answerType: 'choice',
    question: '「I saw a panda at the zoo.（わたしは {動物園|どうぶつえん}で パンダを {見|み}ました）」の「saw」は、どの ことばが {変|か}わった {形|かたち}かな。',
    choices: ['see', 'say', 'sit', 'sell'],
    answer: 'see',
    hints: ['「{見|み}る」という {意味|いみ}の ことばだよ。', '「{見|み}た」と {過去|かこ}の ことを {言|い}う ときに {形|かたち}が {変|か}わるよ。'],
    explanation: '「saw」は「see（{見|み}る）」の {過去|かこ}の {形|かたち}です。',
    inputForm: { validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g6_subject_002', subject: 'english', gradeLevel: 6, unit: 'subject',
    difficulty: 'basic', answerType: 'choice',
    question: '「science（サイエンス）」は {何|なん}の {教科|きょうか}かな。',
    choices: ['{理科|りか}', '{社会|しゃかい}', '{音楽|おんがく}', '{図工|ずこう}'],
    answer: '{理科|りか}',
    hints: ['{実験|じっけん}や {観察|かんさつ}を する {教科|きょうか}だよ。', '{社会|しゃかい}は social studies、{音楽|おんがく}は music だよ。'],
    explanation: '「science」は「{理科|りか}」です。{図工|ずこう}は arts and crafts です。',
    inputForm: { acceptedAnswers: ['りか'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g6_spell_003', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「{冬|ふゆ}」を {英語|えいご}で {書|か}こう。',
    answer: 'winter', validationMode: 'exact',
    hints: ['「ウィンター」と {読|よ}むよ。', 'w から {始|はじ}まる 6{文字|もじ}の ことばだよ。'],
    explanation: '「{冬|ふゆ}」は「winter」です。',
    reviewed: true
  },
  {
    id: 'english_g6_spell_004', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「{友|とも}だち」を {英語|えいご}で {書|か}こう。',
    answer: 'friend', validationMode: 'exact',
    hints: ['「フレンド」と {読|よ}むよ。', 'f・r で {始|はじ}まり、とちゅうに i と e が {続|つづ}くよ。'],
    explanation: '「{友|とも}だち」は「friend」です。「フレ」の {部分|ぶぶん}を frie と {書|か}く ことに {注意|ちゅうい}しましょう。',
    reviewed: true
  },
  {
    id: 'english_g6_past_005', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'input',
    question: '「I (　) soccer yesterday.（わたしは きのう サッカーを しました）」の（　）に、play を {過去|かこ}の {形|かたち}に して {書|か}こう。',
    answer: 'played', validationMode: 'exact',
    hints: ['「yesterday（きのう）」は {過去|かこ}の ことだよ。', 'play の {後|うし}ろに 2{文字|もじ} つけるよ。'],
    explanation: 'play の {過去|かこ}の {形|かたち}は played です。{多|おお}くの ことばは、{後|うし}ろに ed を つけて {過去|かこ}の {形|かたち}に します。',
    reviewed: true
  },
  {
    id: 'english_g6_spell_005', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「{英語|えいご}」を {英語|えいご}で {書|か}こう。',
    answer: 'English', validationMode: 'exact',
    hints: ['「イングリッシュ」と {読|よ}むよ。', 'E で {始|はじ}まり、sh で {終|お}わるよ（{言語|げんご}の {名前|なまえ}は {大文字|おおもじ}で {始|はじ}める）。'],
    explanation: '「{英語|えいご}」は「English」です。{言語|げんご}や {国|くに}の {名前|なまえ}は、{最初|さいしょ}の {文字|もじ}を {大文字|おおもじ}で {書|か}きます。',
    reviewed: true
  },
  {
    id: 'english_g6_word_002', subject: 'english', gradeLevel: 6, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「hot（あつい）」の {反対|はんたい}の {意味|いみ}の {英語|えいご}を {書|か}こう。',
    answer: 'cold', validationMode: 'exact',
    hints: ['「さむい・つめたい」という {意味|いみ}の ことばだよ。', '「コールド」と {読|よ}むよ。'],
    explanation: '「hot」の {反対|はんたい}は「cold（さむい・つめたい）」です。',
    reviewed: true
  },
  {
    id: 'english_g6_past_006', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'input',
    question: '「I went to the sea in summer.」の「sea（シー）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'うみ', acceptedAnswers: ['海'], validationMode: 'kana-insensitive',
    hints: ['{夏|なつ}に {泳|およ}ぎに {行|い}く ところだよ。', 'しおからい {水|みず}が {広|ひろ}がって いるよ。'],
    explanation: '「sea」は「{海|うみ}」です。「I went to the sea in summer.」は「わたしは {夏|なつ}に {海|うみ}へ {行|い}きました」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g6_spell_006', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「{音楽|おんがく}」を {英語|えいご}で {書|か}こう。',
    answer: 'music', validationMode: 'exact',
    hints: ['「ミュージック」と {読|よ}むよ。', 'm から {始|はじ}まる 5{文字|もじ}の ことばだよ。'],
    explanation: '「{音楽|おんがく}」は「music」です。',
    reviewed: true
  },
  {
    id: 'english_g6_past_007', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'input',
    question: '「It (　) fun.（{楽|たの}しかったです）」の（　）に {入|はい}る ことばを {書|か}こう。',
    answer: 'was', validationMode: 'exact',
    hints: ['「It is fun.（{楽|たの}しいです）」を {過去|かこ}の ことに すると…？', 'is の {過去|かこ}の {形|かたち}だよ。3{文字|もじ}。'],
    explanation: '「is」の {過去|かこ}の {形|かたち}は「was」なので、「It was fun.」で「{楽|たの}しかったです」に なります。',
    reviewed: true
  },
  {
    id: 'english_g6_word_003', subject: 'english', gradeLevel: 6, unit: 'word',
    difficulty: 'standard', answerType: 'choice',
    question: '「My dream is to be a pilot.」の「dream」の {意味|いみ}は どれかな。',
    choices: ['{夢|ゆめ}', '{名前|なまえ}', '{仕事|しごと}', '{友|とも}だち'],
    answer: '{夢|ゆめ}',
    hints: ['「わたしの ○ は パイロットに なる ことです」という {文|ぶん}だよ。', '「ドリーム」と {読|よ}むよ。'],
    explanation: '「dream」は「{夢|ゆめ}」です。「My dream is to be a pilot.」は「わたしの {夢|ゆめ}は パイロットに なる ことです」という {意味|いみ}です。',
    inputForm: { question: '「My dream is to be a pilot.」の「dream」の 意味は 何かな。', acceptedAnswers: ['ゆめ'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g6_past_008', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'choice',
    question: '「What did you do in summer vacation?」と きかれた ときの {答|こた}えとして ぴったりなのは どれかな。',
    choices: ['I went to the mountains.', 'I go to school.', 'I want to go to Kyoto.', 'I like summer.'],
    answer: 'I went to the mountains.',
    hints: ['「{夏休|なつやす}みに {何|なに}を しましたか」と、{過去|かこ}の ことを きかれて いるよ。', '{過去|かこ}の {形|かたち}（went など）を {使|つか}って {答|こた}えよう。'],
    explanation: '「What did you do in summer vacation?（{夏休|なつやす}みに {何|なに}を しましたか）」には、「I went to the mountains.（{山|やま}へ {行|い}きました）」のように {過去|かこ}の {形|かたち}で {答|こた}えます。',
    reviewed: true
  },
  {
    id: 'english_g6_subject_003', subject: 'english', gradeLevel: 6, unit: 'subject',
    difficulty: 'standard', answerType: 'choice',
    question: '「{体育|たいいく}」を {英語|えいご}で {言|い}うと どれかな。',
    choices: ['P.E.', 'math', 'science', 'music'],
    answer: 'P.E.',
    hints: ['physical education（{体|からだ}の {教育|きょういく}）の {頭文字|かしらもじ}だよ。', 'math は {算数|さんすう}、science は {理科|りか}、music は {音楽|おんがく}だよ。'],
    explanation: '「{体育|たいいく}」は「P.E.（physical education）」です。',
    inputForm: { question: '「{体育|たいいく}」を 英語で 言うと 何かな。', acceptedAnswers: ['PE', 'P.E', 'physical education'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g6_want_002', subject: 'english', gradeLevel: 6, unit: 'want',
    difficulty: 'standard', answerType: 'choice',
    question: '「Where do you want to go?」と きかれた ときの {答|こた}えとして ぴったりなのは どれかな。',
    choices: ['I want to go to Italy.', 'I want to be a cook.', 'I went to Italy.', 'I like pizza.'],
    answer: 'I want to go to Italy.',
    hints: ['「どこに {行|い}きたいですか」と きかれて いるよ。', '「want to go to 〜」で {答|こた}えよう。'],
    explanation: '「Where do you want to go?（どこに {行|い}きたいですか）」には「I want to go to Italy.（イタリアに {行|い}きたいです）」のように {答|こた}えます。',
    reviewed: true
  },
  {
    id: 'english_g6_spell_007', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'advanced', answerType: 'input',
    question: '「{図書館|としょかん}」を {英語|えいご}で {書|か}こう。',
    answer: 'library', validationMode: 'exact',
    hints: ['「ライブラリー」と {読|よ}むよ。', 'l で {始|はじ}まり、とちゅうに r が 2つ {出|で}て くるよ。{最後|さいご}は y。'],
    explanation: '「{図書館|としょかん}」は「library」です。',
    reviewed: true
  },
  {
    id: 'english_g6_past_009', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'advanced', answerType: 'input',
    question: '「see（{見|み}る）」の {過去|かこ}の {形|かたち}を {書|か}こう。',
    answer: 'saw', validationMode: 'exact',
    hints: ['ed を つけるのでは ない、とくべつな {形|かたち}だよ。', '「I ○○○ a panda.」の ○○○ に {入|はい}る 3{文字|もじ}の ことばだよ。'],
    explanation: '「see」の {過去|かこ}の {形|かたち}は「saw」です。go → went、eat → ate のように、とくべつな {形|かたち}に {変|か}わる ことばが あります。',
    reviewed: true
  },
  {
    id: 'english_g6_word_004', subject: 'english', gradeLevel: 6, unit: 'word',
    difficulty: 'advanced', answerType: 'choice',
    question: '「I want to join the tennis team in junior high school.」の「junior high school」は どこかな。',
    choices: ['{中学校|ちゅうがっこう}', '{小学校|しょうがっこう}', '{高校|こうこう}', '{大学|だいがく}'],
    answer: '{中学校|ちゅうがっこう}',
    hints: ['{小学校|しょうがっこう}は elementary school だよ。', '{小学校|しょうがっこう}を {卒業|そつぎょう}した あとに {入|はい}る {学校|がっこう}だよ。'],
    explanation: '「junior high school」は「{中学校|ちゅうがっこう}」です。「{中学校|ちゅうがっこう}で テニス{部|ぶ}に {入|はい}りたい」という {意味|いみ}です。',
    inputForm: { acceptedAnswers: ['ちゅうがっこう', '中学'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g6_past_010', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'advanced', answerType: 'choice',
    question: '「My best memory is our school trip.」の「school trip」は {何|なん}の {行事|ぎょうじ}かな。',
    choices: ['{修学旅行|しゅうがくりょこう}', '{運動会|うんどうかい}', '{入学式|にゅうがくしき}', '{音楽会|おんがくかい}'],
    answer: '{修学旅行|しゅうがくりょこう}',
    hints: ['「trip（トリップ）」は「{旅行|りょこう}」という {意味|いみ}だよ。', '「memory」は「{思|おも}い{出|で}」だよ。'],
    explanation: '「school trip」は「{修学旅行|しゅうがくりょこう}」です。「いちばんの {思|おも}い{出|で}は {修学旅行|しゅうがくりょこう}です」という {意味|いみ}です。{運動会|うんどうかい}は sports day です。',
    inputForm: { acceptedAnswers: ['しゅうがくりょこう'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },

  // ===== Lv7（中学1年） =====
  {
    id: 'english_g7_be_001', subject: 'english', gradeLevel: 7, unit: 'be',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「I (　) a student.」',
    choices: ['am', 'is', 'are', 'be'],
    answer: 'am',
    hints: ['{主語|しゅご}は「I」。', 'I の ときの be{動詞|どうし}は {決|き}まって いる。'],
    explanation: '{主語|しゅご}が I の ときの be{動詞|どうし}は am です。you・{複数|ふくすう}は are、he・she・it などは is です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「I (　) a student.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_verb_001', subject: 'english', gradeLevel: 7, unit: 'verb',
    difficulty: 'basic', answerType: 'input',
    question: '「Ken (　) tennis every day.」の（　）に、play を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'plays', validationMode: 'exact',
    hints: ['{主語|しゅご}の Ken は {三人称|さんにんしょう}・{単数|たんすう}。', '{現在|げんざい}の {文|ぶん}で、{主語|しゅご}が {三人称単数|さんにんしょうたんすう}の とき、{動詞|どうし}に s を つける。'],
    explanation: '{主語|しゅご}が {三人称単数|さんにんしょうたんすう}（Ken）で {現在|げんざい}の {文|ぶん}なので、play に s を つけて plays に します。',
    reviewed: true
  },
  {
    id: 'english_g7_article_001', subject: 'english', gradeLevel: 7, unit: 'article',
    difficulty: 'standard', answerType: 'input',
    question: '「This is (　) apple.」の（　）に、a か an の どちらかを {入|い}れなさい。',
    answer: 'an', validationMode: 'exact',
    hints: ['apple は {母音|ぼいん}（ア・イ・ウ・エ・オに {近|ちか}い {音|おと}）で {始|はじ}まる。', '{母音|ぼいん}で {始|はじ}まる {語|ご}の {前|まえ}では、a の {代|か}わりに…'],
    explanation: 'apple は {母音|ぼいん}の {音|おと}で {始|はじ}まるので、a ではなく an を {使|つか}います（an apple）。',
    reviewed: true
  },
  {
    id: 'english_g7_plural_001', subject: 'english', gradeLevel: 7, unit: 'plural',
    difficulty: 'standard', answerType: 'input',
    question: '「box（{箱|はこ}）」の {複数形|ふくすうけい}を {書|か}きなさい。',
    answer: 'boxes', validationMode: 'exact',
    hints: ['x で {終|お}わる {語|ご}の {複数形|ふくすうけい}は、s だけでは ない。', 'bus → buses と {同|おな}じ つけ{方|かた}。'],
    explanation: 's・x・sh・ch で {終|お}わる {語|ご}は es を つけます。box → boxes です。',
    reviewed: true
  },
  {
    id: 'english_g7_progressive_001', subject: 'english', gradeLevel: 7, unit: 'progressive',
    difficulty: 'standard', answerType: 'input',
    question: '「She is (　) a book now.（{彼女|かのじょ}は {今|いま}、{本|ほん}を {読|よ}んで います）」の（　）に、read を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'reading', validationMode: 'exact',
    hints: ['「〜して いる」は {現在進行形|げんざいしんこうけい}（be{動詞|どうし}＋{動詞|どうし}の -ing{形|けい}）。', 'read に ing を つける。'],
    explanation: '{現在進行形|げんざいしんこうけい}は「be{動詞|どうし}＋-ing{形|けい}」なので、reading に します。',
    reviewed: true
  },
  {
    id: 'english_g7_question_001', subject: 'english', gradeLevel: 7, unit: 'question',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「(　) do you live? — I live in Tokyo.」',
    choices: ['Where', 'What', 'When', 'Who'],
    answer: 'Where',
    hints: ['{答|こた}えは「{東京|とうきょう}に {住|す}んで います」。', '{場所|ばしょ}を たずねる {疑問詞|ぎもんし}は？'],
    explanation: '{住|す}んで いる {場所|ばしょ}を たずねて いるので、Where（どこに）を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「(　) do you live? — I live in Tokyo.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_verb_002', subject: 'english', gradeLevel: 7, unit: 'verb',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Do you like music? — Yes, I (　).」',
    choices: ['do', 'am', 'like', 'does'],
    answer: 'do',
    hints: ['「Do you 〜?」で たずねられて いる。', 'たずねる ときに {使|つか}った {語|ご}で {答|こた}える。'],
    explanation: '「Do you 〜?」には「Yes, I do.」または「No, I don\'t.」で {答|こた}えます。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「Do you like music? — Yes, I (　).」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_past_001', subject: 'english', gradeLevel: 7, unit: 'past',
    difficulty: 'advanced', answerType: 'input',
    question: '「go」の {過去形|かこけい}を {書|か}きなさい。',
    answer: 'went', validationMode: 'exact',
    hints: ['{不規則動詞|ふきそくどうし}なので、ed を つけるのでは ない。', '「I (　) to the park yesterday.」の（　）に {入|はい}る {語|ご}。'],
    explanation: 'go の {過去形|かこけい}は went です（{不規則動詞|ふきそくどうし}）。',
    reviewed: true
  },
  {
    id: 'english_g7_past_002', subject: 'english', gradeLevel: 7, unit: 'past',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「He (　) TV last night.」',
    choices: ['watched', 'watches', 'watch', 'is watching'],
    answer: 'watched',
    hints: ['「last night（{昨夜|さくや}）」に {注目|ちゅうもく}する。', '{過去|かこ}の ことを {表|あらわ}す {形|かたち}を {選|えら}ぶ。'],
    explanation: 'last night（{昨夜|さくや}）が あるので {過去形|かこけい}の watched を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語句を 書きなさい。「He (　) TV last night.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g7_be_002', subject: 'english', gradeLevel: 7, unit: 'be',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「You (　) my good friend.」',
    choices: ['are', 'am', 'is', 'be'],
    answer: 'are',
    hints: ['{主語|しゅご}は「You」。', 'I は am、he・she は is。you は？'],
    explanation: '{主語|しゅご}が you の ときの be{動詞|どうし}は are です。「あなたは わたしの よい {友|とも}だちです」という {意味|いみ}です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「You (　) my good friend.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_pronoun_001', subject: 'english', gradeLevel: 7, unit: 'pronoun',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「This is my brother. (　) is a student.」',
    choices: ['He', 'She', 'It', 'They'],
    answer: 'He',
    hints: ['my brother（わたしの {兄|あに}・{弟|おとうと}）を {代名詞|だいめいし}に する。', '{男性|だんせい} 1{人|り}を さす {代名詞|だいめいし}。'],
    explanation: 'my brother は {男性|だんせい} 1{人|り}なので、He で {受|う}けます。{女性|じょせい}なら She、もの 1つなら It、{複数|ふくすう}なら They です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「This is my brother. (　) is a student.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_plural_002', subject: 'english', gradeLevel: 7, unit: 'plural',
    difficulty: 'basic', answerType: 'input',
    question: '「child（{子|こ}ども）」の {複数形|ふくすうけい}を {書|か}きなさい。',
    answer: 'children', validationMode: 'exact',
    hints: ['s を つけるのでは ない、{不規則|ふきそく}な {複数形|ふくすうけい}。', '{後|うし}ろに ren を つける。'],
    explanation: 'child の {複数形|ふくすうけい}は children です。man → men、woman → women なども {不規則|ふきそく}な {複数形|ふくすうけい}です。',
    reviewed: true
  },
  {
    id: 'english_g7_verb_003', subject: 'english', gradeLevel: 7, unit: 'verb',
    difficulty: 'basic', answerType: 'input',
    question: '「Mika (　) English every day.」の（　）に、study を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'studies', validationMode: 'exact',
    hints: ['{主語|しゅご}の Mika は {三人称単数|さんにんしょうたんすう}。', '「{子音字|しいんじ}＋y」で {終|お}わる {動詞|どうし}は、y を i に {変|か}えて es を つける。'],
    explanation: '{主語|しゅご}が {三人称単数|さんにんしょうたんすう}で {現在|げんざい}の {文|ぶん}です。study は「{子音字|しいんじ}＋y」で {終|お}わるので、y を i に {変|か}えて studies と します。',
    reviewed: true
  },
  {
    id: 'english_g7_pronoun_002', subject: 'english', gradeLevel: 7, unit: 'pronoun',
    difficulty: 'standard', answerType: 'input',
    question: '「This is (　) bag.（これは わたしの かばんです）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'my', validationMode: 'exact',
    hints: ['「わたしの」を {表|あらわ}す {代名詞|だいめいし}。', 'I − (　) − me − mine と {変化|へんか}する。'],
    explanation: '「わたしの」は my です。I（わたしは）− my（わたしの）− me（わたしを）− mine（わたしの もの）と {変化|へんか}します。',
    reviewed: true
  },
  {
    id: 'english_g7_question_002', subject: 'english', gradeLevel: 7, unit: 'question',
    difficulty: 'standard', answerType: 'input',
    question: '「(　) is that? — It\'s a dog.（あれは {何|なん}ですか。— {犬|いぬ}です）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'What', validationMode: 'exact',
    hints: ['「{何|なに}」を たずねる {疑問詞|ぎもんし}。', 'W で {始|はじ}まる 4{文字|もじ}の {語|ご}。'],
    explanation: '「{何|なに}」を たずねるときは What を {使|つか}います。「What is that?」は「あれは {何|なん}ですか」です。',
    reviewed: true
  },
  {
    id: 'english_g7_can_001', subject: 'english', gradeLevel: 7, unit: 'can',
    difficulty: 'standard', answerType: 'input',
    question: '「He (　) swim.（{彼|かれ}は {泳|およ}ぐ ことが できません）」の（　）に {入|はい}る 1{語|ご}を、{短縮形|たんしゅくけい}で {書|か}きなさい。',
    answer: "can't", acceptedAnswers: ['can’t'], validationMode: 'exact',
    hints: ['「〜できる」は can。その {否定|ひてい}の {形|かたち}。', 'cannot を {短|みじか}く した {形|かたち}（アポストロフィを {使|つか}う）。'],
    explanation: '「〜できない」は cannot、{短縮形|たんしゅくけい}は can\'t です。can の {後|うし}ろの {動詞|どうし}は、{主語|しゅご}が he でも {原形|げんけい}（swim）の ままです。',
    reviewed: true
  },
  {
    id: 'english_g7_past_003', subject: 'english', gradeLevel: 7, unit: 'past',
    difficulty: 'standard', answerType: 'input',
    question: '「study」の {過去形|かこけい}を {書|か}きなさい。',
    answer: 'studied', validationMode: 'exact',
    hints: ['「{子音字|しいんじ}＋y」で {終|お}わる {動詞|どうし}。', 'y を i に {変|か}えて ed を つける。'],
    explanation: 'study は「{子音字|しいんじ}＋y」で {終|お}わるので、y を i に {変|か}えて studied と します。',
    reviewed: true
  },
  {
    id: 'english_g7_imperative_001', subject: 'english', gradeLevel: 7, unit: 'imperative',
    difficulty: 'standard', answerType: 'input',
    question: '「(　) run in the classroom.（{教室|きょうしつ}で {走|はし}っては いけません）」の（　）に {入|はい}る 1{語|ご}を、{短縮形|たんしゅくけい}で {書|か}きなさい。',
    answer: "Don't", acceptedAnswers: ['Don’t'], validationMode: 'exact',
    hints: ['「〜しなさい」は {動詞|どうし}の {原形|げんけい}で {文|ぶん}を {始|はじ}める。', '「〜しては いけない」は、その {前|まえ}に do not の {短縮形|たんしゅくけい}を {置|お}く。'],
    explanation: '「〜しては いけません」という {否定|ひてい}の {命令文|めいれいぶん}は「Don\'t＋{動詞|どうし}の {原形|げんけい}」です。',
    reviewed: true
  },
  {
    id: 'english_g7_question_003', subject: 'english', gradeLevel: 7, unit: 'question',
    difficulty: 'standard', answerType: 'input',
    question: '「How (　) is this bag? — It\'s 2,000 yen.（この かばんは いくらですか）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'much', validationMode: 'exact',
    hints: ['ねだんを たずねる {言|い}い{方|かた}。', '{数|かず}を たずねるのは How many。ねだん（{量|りょう}）を たずねるのは How ○○○○。'],
    explanation: 'ねだんを たずねるときは「How much 〜?」を {使|つか}います。{数|かず}を たずねるときは「How many 〜?」です。',
    reviewed: true
  },
  {
    id: 'english_g7_progressive_002', subject: 'english', gradeLevel: 7, unit: 'progressive',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「What are you doing? — I (　) studying math.」',
    choices: ['am', 'is', 'are', 'do'],
    answer: 'am',
    hints: ['{現在進行形|げんざいしんこうけい}は「be{動詞|どうし}＋-ing{形|けい}」。', '{主語|しゅご}が I の ときの be{動詞|どうし}は？'],
    explanation: '{現在進行形|げんざいしんこうけい}で {主語|しゅご}が I なので、be{動詞|どうし}は am です。「{数学|すうがく}を {勉強|べんきょう}して います」という {意味|いみ}です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「What are you doing? — I (　) studying math.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_pronoun_003', subject: 'english', gradeLevel: 7, unit: 'pronoun',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Is this (　) umbrella? — Yes, it\'s mine.」',
    choices: ['your', 'you', 'yours', 'my'],
    answer: 'your',
    hints: ['{答|こた}えの「it\'s mine（わたしの ものです）」から、「あなたの かさですか」と きいて いる。', '{名詞|めいし}（umbrella）の {前|まえ}に {置|お}く「あなたの」。'],
    explanation: '「あなたの 〜」と {名詞|めいし}の {前|まえ}に {置|お}くのは your です。yours は「あなたの もの」で、{名詞|めいし}の {前|まえ}には {置|お}きません。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「Is this (　) umbrella? — Yes, it\'s mine.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_question_004', subject: 'english', gradeLevel: 7, unit: 'question',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「(　) is your birthday? — It\'s May 3.」',
    choices: ['When', 'Where', 'Who', 'Which'],
    answer: 'When',
    hints: ['{答|こた}えは「5{月|がつ}3{日|か}です」。', '「いつ」を たずねる {疑問詞|ぎもんし}は？'],
    explanation: '{日付|ひづけ}（いつ）を たずねて いるので When を {使|つか}います。Where は どこ、Who は だれ、Which は どちら です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「(　) is your birthday? — It\'s May 3.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_verb_004', subject: 'english', gradeLevel: 7, unit: 'verb',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Does your sister like cats? — Yes, she (　).」',
    choices: ['does', 'do', 'is', 'likes'],
    answer: 'does',
    hints: ['「Does 〜?」で たずねられて いる。', 'たずねる ときに {使|つか}った {語|ご}で {答|こた}える。'],
    explanation: '「Does 〜?」には「Yes, 〜 does.」または「No, 〜 doesn\'t.」で {答|こた}えます。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「Does your sister like cats? — Yes, she (　).」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_past_004', subject: 'english', gradeLevel: 7, unit: 'past',
    difficulty: 'advanced', answerType: 'input',
    question: '「Did you watch TV last night? — No, I (　).」の（　）に {入|はい}る 1{語|ご}を、{短縮形|たんしゅくけい}で {書|か}きなさい。',
    answer: "didn't", acceptedAnswers: ['didn’t'], validationMode: 'exact',
    hints: ['「Did you 〜?」には did を {使|つか}って {答|こた}える。', '「いいえ」なので、did not の {短縮形|たんしゅくけい}。'],
    explanation: '「Did you 〜?」には「Yes, I did.」または「No, I didn\'t.」で {答|こた}えます。didn\'t は did not の {短縮形|たんしゅくけい}です。',
    reviewed: true
  },
  {
    id: 'english_g7_plural_003', subject: 'english', gradeLevel: 7, unit: 'plural',
    difficulty: 'advanced', answerType: 'input',
    question: '「knife（ナイフ）」の {複数形|ふくすうけい}を {書|か}きなさい。',
    answer: 'knives', validationMode: 'exact',
    hints: ['f・fe で {終|お}わる {語|ご}の {複数形|ふくすうけい}は、s を つけるだけでは ない。', 'fe を v に {変|か}えて es を つける（leaf → leaves と {同|おな}じ）。'],
    explanation: 'knife の {複数形|ふくすうけい}は knives です。f・fe で {終|お}わる {語|ご}の {多|おお}くは、f・fe を v に {変|か}えて es を つけます（leaf → leaves）。',
    reviewed: true
  },
  {
    id: 'english_g7_article_002', subject: 'english', gradeLevel: 7, unit: 'article',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「I play (　) piano every day.」',
    choices: ['the', 'a', 'an', '（{何|なに}も {入|い}れない）'],
    answer: 'the',
    hints: ['{楽器|がっき}を「{演奏|えんそう}する」と {言|い}うとき、{楽器|がっき}の {前|まえ}に つける {語|ご}が ある。', 'スポーツ（play soccer）の ときは {何|なに}も つけない。'],
    explanation: '「{楽器|がっき}を {演奏|えんそう}する」は「play the＋{楽器|がっき}」です（play the piano）。スポーツの ときは the を つけません（play tennis）。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「I play (　) piano every day.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g7_question_005', subject: 'english', gradeLevel: 7, unit: 'question',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Whose bike is this? — It\'s (　).」',
    choices: ["Tom's", 'Tom', 'he', 'him'],
    answer: "Tom's",
    hints: ['「Whose 〜?」は「だれの 〜ですか」と {持|も}ち{主|ぬし}を たずねる。', '「トムの もの」を {表|あらわ}す {形|かたち}は、{名前|なまえ}に \'s を つける。'],
    explanation: '「Whose 〜?（だれの 〜）」には、「Tom\'s（トムの もの）」や「mine（わたしの もの）」のように {答|こた}えます。',
    reviewed: true
  },

  // ===== Lv8（中学2年） =====
  {
    id: 'english_g8_future_001', subject: 'english', gradeLevel: 8, unit: 'future',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「I (　) visit my uncle tomorrow.」',
    choices: ['will', 'was', 'did', 'am'],
    answer: 'will',
    hints: ['「tomorrow（{明日|あした}）」に {注目|ちゅうもく}する。', '{後|あと}ろの visit は {原形|げんけい}。'],
    explanation: '{未来|みらい}の ことなので、「will＋{動詞|どうし}の {原形|げんけい}」を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g8_comparison_001', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'basic', answerType: 'input',
    question: '「tall」の {比較級|ひかくきゅう}を {書|か}きなさい。',
    answer: 'taller', validationMode: 'exact',
    hints: ['「より {背|せ}が {高|たか}い」という {意味|いみ}の {形|かたち}。', '{短|みじか}い {語|ご}は、{語尾|ごび}に er を つける。'],
    explanation: 'tall の {比較級|ひかくきゅう}は taller、{最上級|さいじょうきゅう}は tallest です。',
    reviewed: true
  },
  {
    id: 'english_g8_comparison_002', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'standard', answerType: 'input',
    question: '「good」の {最上級|さいじょうきゅう}を {書|か}きなさい。',
    answer: 'best', validationMode: 'exact',
    hints: ['good は {不規則|ふきそく}に {変化|へんか}する。', '{比較級|ひかくきゅう}は better。'],
    explanation: 'good の {比較級|ひかくきゅう}は better、{最上級|さいじょうきゅう}は best です（good − better − best）。',
    reviewed: true
  },
  {
    id: 'english_g8_modal_001', subject: 'english', gradeLevel: 8, unit: 'modal',
    difficulty: 'standard', answerType: 'input',
    question: '「You (　) not run here.（ここで {走|はし}っては いけません）」の（　）に {入|はい}る {助動詞|じょどうし}を {書|か}きなさい。',
    answer: 'must', validationMode: 'exact',
    hints: ['「〜しなければ ならない」という {意味|いみ}の {助動詞|じょどうし}。', 'その {否定形|ひていけい}は「〜しては いけない」という {強|つよ}い {禁止|きんし}に なる。'],
    explanation: '「must not（mustn\'t）＋{動詞|どうし}の {原形|げんけい}」で「〜しては いけない」という {禁止|きんし}を {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'english_g8_passive_001', subject: 'english', gradeLevel: 8, unit: 'passive',
    difficulty: 'standard', answerType: 'input',
    question: '「This book was (　) by Natsume Soseki.（この {本|ほん}は {夏目漱石|なつめそうせき}に よって {書|か}かれた）」の（　）に、write を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'written', validationMode: 'exact',
    hints: ['{受|う}け{身|み}は「be{動詞|どうし}＋{過去分詞|かこぶんし}」。', 'write − wrote − ？'],
    explanation: '{受|う}け{身|み}の {文|ぶん}なので {過去分詞|かこぶんし}を {使|つか}います。write の {過去分詞|かこぶんし}は written です（write − wrote − written）。',
    reviewed: true
  },
  {
    id: 'english_g8_gerund_001', subject: 'english', gradeLevel: 8, unit: 'gerund',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「I enjoy (　) soccer.」',
    choices: ['playing', 'to play', 'play', 'played'],
    answer: 'playing',
    hints: ['enjoy の {後|あと}ろには、{決|き}まった {形|かたち}が くる。', 'enjoy は「〜する ことを {楽|たの}しむ」。{動名詞|どうめいし}（-ing）を {目的語|もくてきご}に とる。'],
    explanation: 'enjoy の {後|あと}ろには {動名詞|どうめいし}（-ing{形|けい}）が きます。to{不定詞|ふていし}は {使|つか}えません。',
    inputForm: { question: '（　）に 入る 語句を 書きなさい。「I enjoy (　) soccer.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_there_001', subject: 'english', gradeLevel: 8, unit: 'there',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「There (　) two cats under the table.」',
    choices: ['are', 'is', 'be', 'am'],
    answer: 'are',
    hints: ['There is / There are の {後|あと}ろの {名詞|めいし}に {注目|ちゅうもく}する。', 'two cats は {複数|ふくすう}。'],
    explanation: '「There is / are 〜.」は、{後|あと}ろの {名詞|めいし}が {単数|たんすう}なら is、{複数|ふくすう}なら are を {使|つか}います。two cats は {複数|ふくすう}なので are です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「There (　) two cats under the table.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_infinitive_001', subject: 'english', gradeLevel: 8, unit: 'infinitive',
    difficulty: 'advanced', answerType: 'input',
    question: '「I want (　) a doctor.（わたしは {医者|いしゃ}に なりたい）」の（　）に {入|はい}る 2{語|ご}を {書|か}きなさい。（be を {使|つか}う）',
    answer: 'to be', validationMode: 'exact',
    hints: ['want の {後|あと}ろには to{不定詞|ふていし}（to＋{動詞|どうし}の {原形|げんけい}）が くる。', 'be の {前|まえ}に 1{語|ご} {加|くわ}える。'],
    explanation: '「want to＋{動詞|どうし}の {原形|げんけい}」で「〜したい」なので、to be が {入|はい}ります。',
    reviewed: true
  },
  {
    id: 'english_g8_comparison_003', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「Mt. Fuji is (　) mountain in Japan.」',
    choices: ['the highest', 'higher', 'high', 'the higher'],
    answer: 'the highest',
    hints: ['「{日本|にほん}で いちばん {高|たか}い {山|やま}」という {意味|いみ}に したい。', '「in Japan」の ような {範囲|はんい}を {表|あらわ}す {語句|ごく}が ある ときは {最上級|さいじょうきゅう}。'],
    explanation: '「{日本|にほん}で いちばん 〜」は {最上級|さいじょうきゅう}で、the を つけて the highest と します。',
    inputForm: { question: '（　）に 入る 語句を 書きなさい。「Mt. Fuji is (　) mountain in Japan.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g8_future_002', subject: 'english', gradeLevel: 8, unit: 'future',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「I am going (　) visit Kyoto next week.」',
    choices: ['to', 'for', 'at', 'in'],
    answer: 'to',
    hints: ['「〜する つもりだ」は「be going (　)＋{動詞|どうし}の {原形|げんけい}」。', '{後|うし}ろの visit は {動詞|どうし}の {原形|げんけい}。'],
    explanation: '「be going to＋{動詞|どうし}の {原形|げんけい}」で「〜する つもりだ・〜する {予定|よてい}だ」という {未来|みらい}を {表|あらわ}します。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「I am going (　) visit Kyoto next week.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_conjunction_001', subject: 'english', gradeLevel: 8, unit: 'conjunction',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「I stayed home (　) it was rainy.（{雨|あめ}だったので、{家|いえ}に いました）」',
    choices: ['because', 'but', 'or', 'if'],
    answer: 'because',
    hints: ['「{雨|あめ}だった」は、{家|いえ}に いた {理由|りゆう}。', '{理由|りゆう}を {表|あらわ}す {接続詞|せつぞくし}。'],
    explanation: '{理由|りゆう}を {表|あらわ}す「〜なので」は because です。but は「しかし」、or は「または」、if は「もし〜なら」です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「I stayed home (　) it was rainy.（{雨|あめ}だったので、{家|いえ}に いました）」', acceptedAnswers: ['since', 'as'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_comparison_004', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'basic', answerType: 'input',
    question: '「big」の {比較級|ひかくきゅう}を {書|か}きなさい。',
    answer: 'bigger', validationMode: 'exact',
    hints: ['「{短母音|たんぼいん}＋{子音字|しいんじ}」で {終|お}わる {語|ご}は、{最後|さいご}の {文字|もじ}を {重|かさ}ねて er を つける。', 'hot → hotter と {同|おな}じ {変化|へんか}。'],
    explanation: 'big の {比較級|ひかくきゅう}は、g を {重|かさ}ねて bigger と します。{最上級|さいじょうきゅう}は biggest です。',
    reviewed: true
  },
  {
    id: 'english_g8_modal_002', subject: 'english', gradeLevel: 8, unit: 'modal',
    difficulty: 'basic', answerType: 'input',
    question: '「(　) I open the window? — Sure.（{窓|まど}を {開|あ}けても いいですか。— もちろん）」の（　）に {入|はい}る {助動詞|じょどうし}を 1{語|ご} {書|か}きなさい。',
    answer: 'May', acceptedAnswers: ['Can'], validationMode: 'exact',
    hints: ['「〜しても よいですか」と {許可|きょか}を もとめる {言|い}い{方|かた}。', 'ていねいな {言|い}い{方|かた}では M で {始|はじ}まる {助動詞|じょどうし}を {使|つか}う。'],
    explanation: '「May I 〜?」は「〜しても よいですか」と {許可|きょか}を もとめる ていねいな {言|い}い{方|かた}です。{友|とも}だちどうしでは「Can I 〜?」も {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g8_comparison_005', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'standard', answerType: 'input',
    question: '「This is the (　) (　) flower in this garden.（これは この {庭|にわ}で いちばん {美|うつく}しい {花|はな}です）」の（　）に {入|はい}る 2{語|ご}を、beautiful を {使|つか}って {書|か}きなさい。',
    answer: 'most beautiful', validationMode: 'exact',
    hints: ['つづりの {長|なが}い {語|ご}の {最上級|さいじょうきゅう}は、est を つけない。', '{語|ご}の {前|まえ}に 1{語|ご} {置|お}いて {最上級|さいじょうきゅう}に する。'],
    explanation: 'beautiful のように つづりの {長|なが}い {語|ご}は、most を {前|まえ}に {置|お}いて {最上級|さいじょうきゅう}に します（the most beautiful）。{比較級|ひかくきゅう}は more beautiful です。',
    reviewed: true
  },
  {
    id: 'english_g8_passive_002', subject: 'english', gradeLevel: 8, unit: 'passive',
    difficulty: 'standard', answerType: 'input',
    question: '「This room is (　) every day.（この {部屋|へや}は {毎日|まいにち} そうじされます）」の（　）に、clean を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'cleaned', validationMode: 'exact',
    hints: ['{受|う}け{身|み}は「be{動詞|どうし}＋{過去分詞|かこぶんし}」。', 'clean は {規則動詞|きそくどうし}。{過去分詞|かこぶんし}は {過去形|かこけい}と {同|おな}じ {形|かたち}。'],
    explanation: '{受|う}け{身|み}の {文|ぶん}なので {過去分詞|かこぶんし}を {使|つか}います。clean の {過去分詞|かこぶんし}は cleaned です。',
    reviewed: true
  },
  {
    id: 'english_g8_infinitive_002', subject: 'english', gradeLevel: 8, unit: 'infinitive',
    difficulty: 'standard', answerType: 'input',
    question: '「I went to the library (　) study.（わたしは {勉強|べんきょう}する ために {図書館|としょかん}へ {行|い}きました）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'to', validationMode: 'exact',
    hints: ['「〜する ために」と {目的|もくてき}を {表|あらわ}す {形|かたち}。', '{不定詞|ふていし}（○○＋{動詞|どうし}の {原形|げんけい}）の {副詞的用法|ふくしてきようほう}。'],
    explanation: '「to＋{動詞|どうし}の {原形|げんけい}」で「〜する ために」と {目的|もくてき}を {表|あらわ}せます（{不定詞|ふていし}の {副詞的用法|ふくしてきようほう}）。',
    reviewed: true
  },
  {
    id: 'english_g8_gerund_002', subject: 'english', gradeLevel: 8, unit: 'gerund',
    difficulty: 'standard', answerType: 'input',
    question: '「Thank you for (　) me.（{手伝|てつだ}って くれて ありがとう）」の（　）に、help を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'helping', validationMode: 'exact',
    hints: ['for は {前置詞|ぜんちし}。{前置詞|ぜんちし}の {後|うし}ろに {動詞|どうし}を {置|お}くときは…', '{動名詞|どうめいし}（-ing{形|けい}）に する。'],
    explanation: '{前置詞|ぜんちし}（for）の {後|うし}ろに {動詞|どうし}を {置|お}くときは {動名詞|どうめいし}に します。「Thank you for helping me.」で「{手伝|てつだ}って くれて ありがとう」です。',
    reviewed: true
  },
  {
    id: 'english_g8_modal_003', subject: 'english', gradeLevel: 8, unit: 'modal',
    difficulty: 'standard', answerType: 'input',
    question: '「You (　) to study hard.（あなたは {一生懸命|いっしょうけんめい} {勉強|べんきょう}しなければ ならない）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'have', validationMode: 'exact',
    hints: ['「〜しなければ ならない」は must の ほかに、2{語|ご}で {表|あらわ}す {言|い}い{方|かた}が ある。', '（　）to＋{動詞|どうし}の {原形|げんけい}。{主語|しゅご}が he なら has に なる。'],
    explanation: '「have to＋{動詞|どうし}の {原形|げんけい}」で「〜しなければ ならない」という {意味|いみ}です。{主語|しゅご}が {三人称単数|さんにんしょうたんすう}の ときは has to を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g8_progressive_001', subject: 'english', gradeLevel: 8, unit: 'progressive',
    difficulty: 'standard', answerType: 'input',
    question: '「I (　) watching TV at eight last night.（わたしは {昨夜|さくや} 8{時|じ}に テレビを {見|み}て いました）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'was', validationMode: 'exact',
    hints: ['「〜して いた」は {過去進行形|かこしんこうけい}（be{動詞|どうし}の {過去形|かこけい}＋-ing{形|けい}）。', '{主語|しゅご}が I の ときの be{動詞|どうし}の {過去形|かこけい}。'],
    explanation: '{過去進行形|かこしんこうけい}は「was / were＋-ing{形|けい}」です。{主語|しゅご}が I なので was を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g8_comparison_006', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「My bag is as (　) as yours.（わたしの かばんは あなたの と {同|おな}じくらい {大|おお}きい）」',
    choices: ['big', 'bigger', 'biggest', 'more big'],
    answer: 'big',
    hints: ['「as 〜 as …」は「…と {同|おな}じくらい 〜」。', 'as と as の あいだには、{形|かたち}を {変|か}えない {語|ご}（{原級|げんきゅう}）が {入|はい}る。'],
    explanation: '「as＋{原級|げんきゅう}＋as …」で「…と {同|おな}じくらい 〜」という {意味|いみ}です。{比較級|ひかくきゅう}や {最上級|さいじょうきゅう}には しません。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「My bag is as (　) as yours.（わたしの かばんは あなたの と {同|おな}じくらい {大|おお}きい）」', acceptedAnswers: ['large'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_conjunction_002', subject: 'english', gradeLevel: 8, unit: 'conjunction',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「If it (　) tomorrow, I will stay home.（もし {明日|あした} {雨|あめ}なら、{家|いえ}に いるつもりです）」',
    choices: ['rains', 'will rain', 'rained', 'raining'],
    answer: 'rains',
    hints: ['if や when の {後|うし}ろ（{条件|じょうけん}を {表|あらわ}す {部分|ぶぶん}）では、{未来|みらい}の ことも {現在形|げんざいけい}で {表|あらわ}す。', '{主語|しゅご}は it（{三人称単数|さんにんしょうたんすう}）。'],
    explanation: '{条件|じょうけん}を {表|あらわ}す if の {後|うし}ろでは、{未来|みらい}の ことでも {現在形|げんざいけい}を {使|つか}います。{主語|しゅご}が it なので rains です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「If it (　) tomorrow, I will stay home.（もし {明日|あした} {雨|あめ}なら、{家|いえ}に いるつもりです）」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_sentence_001', subject: 'english', gradeLevel: 8, unit: 'sentence',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「My father gave (　) a watch.（{父|ちち}は わたしに {時計|とけい}を くれた）」',
    choices: ['me', 'I', 'my', 'mine'],
    answer: 'me',
    hints: ['「give＋{人|ひと}＋もの」で「{人|ひと}に ものを あたえる」。', '{動詞|どうし}の {後|うし}ろに {置|お}く「わたしに」の {形|かたち}。'],
    explanation: '「give＋{人|ひと}＋もの」の {文|ぶん}で、{人|ひと}の {部分|ぶぶん}には {目的格|もくてきかく}（me）を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「My father gave (　) a watch.（{父|ちち}は わたしに {時計|とけい}を くれた）」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_there_002', subject: 'english', gradeLevel: 8, unit: 'there',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「(　) there a park near here? — Yes, there is.」',
    choices: ['Is', 'Are', 'Do', 'Does'],
    answer: 'Is',
    hints: ['There is 〜. の {疑問文|ぎもんぶん}は、be{動詞|どうし}を there の {前|まえ}に {出|だ}す。', 'a park は {単数|たんすう}。{答|こた}えも「there is」だね。'],
    explanation: '「There is 〜.」の {疑問文|ぎもんぶん}は「Is there 〜?」です。a park は {単数|たんすう}なので Is を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「(　) there a park near here? — Yes, there is.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_passive_003', subject: 'english', gradeLevel: 8, unit: 'passive',
    difficulty: 'advanced', answerType: 'input',
    question: '「This temple was (　) about 1,000 years ago.（この {寺|てら}は {約|やく}1000{年前|ねんまえ}に {建|た}てられた）」の（　）に、build を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'built', validationMode: 'exact',
    hints: ['{受|う}け{身|み}は「be{動詞|どうし}＋{過去分詞|かこぶんし}」。', 'build は {不規則動詞|ふきそくどうし}。build − ○○○○ − ○○○○（{過去形|かこけい}と {過去分詞|かこぶんし}は {同|おな}じ）。'],
    explanation: 'build の {過去分詞|かこぶんし}は built です（build − built − built）。{受|う}け{身|み}の {文|ぶん}なので built を {入|い}れます。',
    reviewed: true
  },
  {
    id: 'english_g8_infinitive_003', subject: 'english', gradeLevel: 8, unit: 'infinitive',
    difficulty: 'advanced', answerType: 'input',
    question: '「It is important (　) us to learn about other cultures.（わたしたちが ほかの {文化|ぶんか}に ついて {学|まな}ぶ ことは {大切|たいせつ}だ）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'for', validationMode: 'exact',
    hints: ['「It is 〜 (　) {人|ひと} to …」で「{人|ひと}が …する ことは 〜だ」。', 'to{不定詞|ふていし}の {動作|どうさ}を する {人|ひと}を {示|しめ}す {前置詞|ぜんちし}。'],
    explanation: '「It is 〜 for＋{人|ひと}＋to＋{動詞|どうし}の {原形|げんけい}」で「{人|ひと}が …する ことは 〜だ」という {意味|いみ}です。for us が「わたしたちが」を {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'english_g8_comparison_007', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Which do you like (　), tea or coffee?」',
    choices: ['better', 'good', 'best', 'more good'],
    answer: 'better',
    hints: ['2つの うち「どちらが より すきか」を たずねて いる。', 'like 〜 well の {比較級|ひかくきゅう}。well − better − best。'],
    explanation: '2つを くらべて「どちらが より すきですか」と たずねるときは「Which do you like better, A or B?」を {使|つか}います。3つ{以上|いじょう}の {中|なか}で いちばん すきな ものを たずねる ときは best を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「Which do you like (　), tea or coffee?」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g8_modal_004', subject: 'english', gradeLevel: 8, unit: 'modal',
    difficulty: 'advanced', answerType: 'choice',
    question: '「You don\'t have to come to school tomorrow.」の {意味|いみ}として {正|ただ}しいものは どれか。',
    choices: ['{明日|あした}は {学校|がっこう}に {来|く}る {必要|ひつよう}は ありません。', '{明日|あした}は {学校|がっこう}に {来|き}ては いけません。', '{明日|あした}は {学校|がっこう}に {来|こ}なければ なりません。', '{明日|あした}は {学校|がっこう}に {来|く}る ことが できません。'],
    answer: '{明日|あした}は {学校|がっこう}に {来|く}る {必要|ひつよう}は ありません。',
    hints: ['have to の {否定|ひてい}（don\'t have to）は「〜しなくて よい」。', 'must not（〜しては いけない）とは {意味|いみ}が ちがう。'],
    explanation: '「don\'t have to＋{動詞|どうし}の {原形|げんけい}」は「〜する {必要|ひつよう}は ない（〜しなくて よい）」という {意味|いみ}です。「〜しては いけない」は must not です。',
    reviewed: true
  },

  // ===== Lv9（中学3年） =====
  {
    id: 'english_g9_perfect_001', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「I have (　) in Tokyo for five years.」',
    choices: ['lived', 'live', 'living', 'lives'],
    answer: 'lived',
    hints: ['「have＋{過去分詞|かこぶんし}」で {現在完了形|げんざいかんりょうけい}。', '「for five years」は {継続|けいぞく}（ずっと〜して いる）を {表|あらわ}す。'],
    explanation: '{現在完了形|げんざいかんりょうけい}は「have（has）＋{過去分詞|かこぶんし}」です。live の {過去分詞|かこぶんし}は lived です。「5{年間|ねんかん} {東京|とうきょう}に {住|す}んで いる」という {意味|いみ}です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「I have (　) in Tokyo for five years.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_verb_001', subject: 'english', gradeLevel: 9, unit: 'verb',
    difficulty: 'basic', answerType: 'input',
    question: '「take」の {過去分詞|かこぶんし}を {書|か}きなさい。',
    answer: 'taken', validationMode: 'exact',
    hints: ['{不規則動詞|ふきそくどうし}。{過去形|かこけい}は took。', 'take − took − ？'],
    explanation: 'take − took − taken と {変化|へんか}します。',
    reviewed: true
  },
  {
    id: 'english_g9_perfect_002', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'standard', answerType: 'input',
    question: '「I have (　) been to Kyoto.（わたしは {一度|いちど}も {京都|きょうと}に {行|い}った ことが ない）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'never', validationMode: 'exact',
    hints: ['{経験|けいけん}を {表|あらわ}す {現在完了形|げんざいかんりょうけい}の {否定|ひてい}。', '「{一度|いちど}も〜ない」という {意味|いみ}の {副詞|ふくし}。'],
    explanation: '「have never＋{過去分詞|かこぶんし}」で「{一度|いちど}も〜した ことが ない」という {意味|いみ}に なります。',
    reviewed: true
  },
  {
    id: 'english_g9_relative_001', subject: 'english', gradeLevel: 9, unit: 'relative',
    difficulty: 'standard', answerType: 'input',
    question: '「This is the boy (　) plays soccer well.（こちらは サッカーが {上手|じょうず}な {少年|しょうねん}です）」の（　）に {入|はい}る {関係代名詞|かんけいだいめいし}を 1{語|ご} {書|か}きなさい。',
    answer: 'who', acceptedAnswers: ['that'], validationMode: 'exact',
    hints: ['{先行詞|せんこうし}の the boy は「{人|ひと}」。', '（　）の {後|あと}ろに {動詞|どうし}（plays）が {続|つづ}くので {主格|しゅかく}。'],
    explanation: '{先行詞|せんこうし}が {人|ひと}で、{主格|しゅかく}の {関係代名詞|かんけいだいめいし}なので who を {使|つか}います（that も {使|つか}えます）。',
    reviewed: true
  },
  {
    id: 'english_g9_perfect_003', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'standard', answerType: 'input',
    question: '「I have lived here (　) 2010.（わたしは 2010{年|ねん}から ここに {住|す}んで います）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'since', validationMode: 'exact',
    hints: ['「〜から（ずっと）」と {始|はじ}まりの {時点|じてん}を {表|あらわ}す {語|ご}。', '{期間|きかん}（five years など）の ときは for を {使|つか}う。'],
    explanation: '{始|はじ}まりの {時点|じてん}（2010{年|ねん}）を {表|あらわ}すときは since、{期間|きかん}を {表|あらわ}すときは for を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g9_subjunctive_001', subject: 'english', gradeLevel: 9, unit: 'subjunctive',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「If I (　) a bird, I could fly.」',
    choices: ['were', 'am', 'is', 'be'],
    answer: 'were',
    hints: ['「もし {鳥|とり}なら {飛|と}べるのに」と、{現実|げんじつ}と ちがう ことを {言|い}って いる。', '{仮定法|かていほう}では、{主語|しゅご}が I でも be{動詞|どうし}は ふつう were を {使|つか}う。'],
    explanation: '{現在|げんざい}の {事実|じじつ}と {反対|はんたい}の ことを {言|い}う {仮定法過去|かていほうかこ}では、「If＋{主語|しゅご}＋{過去形|かこけい}, {主語|しゅご}＋could / would＋{動詞|どうし}の {原形|げんけい}」の {形|かたち}に なり、be{動詞|どうし}は ふつう were を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「If I (　) a bird, I could fly.」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_indirect_001', subject: 'english', gradeLevel: 9, unit: 'indirect',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「Do you know where (　)?」（{彼女|かのじょ}が どこに {住|す}んで いるか {知|し}って いますか）',
    choices: ['she lives', 'does she live', 'lives she', 'she does live'],
    answer: 'she lives',
    hints: ['{文|ぶん}の {中|なか}に {疑問文|ぎもんぶん}が {入|はい}る {間接疑問|かんせつぎもん}。', '{間接疑問|かんせつぎもん}では「{疑問詞|ぎもんし}＋{主語|しゅご}＋{動詞|どうし}」の {語順|ごじゅん}に なる。'],
    explanation: '{間接疑問|かんせつぎもん}は「{疑問詞|ぎもんし}＋{主語|しゅご}＋{動詞|どうし}」の {語順|ごじゅん}なので、where she lives と なります。',
    inputForm: { question: '（　）に 入る 語句を 書きなさい。「Do you know where (　)?」（{彼女|かのじょ}が どこに {住|す}んで いるか {知|し}って いますか）', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_participle_001', subject: 'english', gradeLevel: 9, unit: 'participle',
    difficulty: 'advanced', answerType: 'input',
    question: '「The language (　) in Brazil is Portuguese.（ブラジルで {話|はな}されて いる {言語|げんご}は ポルトガル{語|ご}です）」の（　）に、speak を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'spoken', validationMode: 'exact',
    hints: ['「〜される」という {意味|いみ}で {名詞|めいし}を {後|うし}ろから {修飾|しゅうしょく}する。', 'speak − spoke − ？'],
    explanation: '「{話|はな}されて いる」と {受|う}け{身|み}の {意味|いみ}で {名詞|めいし}を {修飾|しゅうしょく}するので、{過去分詞|かこぶんし}の spoken を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g9_infinitive_001', subject: 'english', gradeLevel: 9, unit: 'infinitive',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「I don\'t know what (　).」（{何|なに}を すれば よいか わからない）',
    choices: ['to do', 'doing', 'do', 'done'],
    answer: 'to do',
    hints: ['「{疑問詞|ぎもんし}＋to＋{動詞|どうし}の {原形|げんけい}」の {形|かたち}。', 'what to do で「{何|なに}を すれば よいか」。'],
    explanation: '「what to do」は「{何|なに}を すれば よいか（{何|なに}を すべきか）」という {意味|いみ}です。how to 〜（〜の しかた）と {同|おな}じ {形|かたち}です。',
    inputForm: { question: '（　）に 入る 語句を 書きなさい。「I don\'t know what (　).」（{何|なに}を すれば よいか わからない）', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年27問） ---
  {
    id: 'english_g9_perfect_004', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Have you ever (　) Mt. Fuji?（{富士山|ふじさん}に {登|のぼ}った ことが ありますか）」',
    choices: ['climbed', 'climb', 'climbing', 'climbs'],
    answer: 'climbed',
    hints: ['「Have you ever＋{過去分詞|かこぶんし}？」で「〜した ことが ありますか」。', 'climb は {規則動詞|きそくどうし}。'],
    explanation: '{経験|けいけん}を たずねる {現在完了形|げんざいかんりょうけい}は「Have you ever＋{過去分詞|かこぶんし}？」です。climb の {過去分詞|かこぶんし}は climbed です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「Have you ever (　) Mt. Fuji?（{富士山|ふじさん}に {登|のぼ}った ことが ありますか）」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_relative_002', subject: 'english', gradeLevel: 9, unit: 'relative',
    difficulty: 'basic', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「This is the book (　) I bought yesterday.（これは わたしが きのう {買|か}った {本|ほん}です）」',
    choices: ['which', 'who', 'where', 'whose'],
    answer: 'which',
    hints: ['{先行詞|せんこうし}の the book は「もの」。', '（　）の {後|うし}ろは「I bought（わたしが {買|か}った）」で、{目的語|もくてきご}が ぬけて いる。'],
    explanation: '{先行詞|せんこうし}が もので、{目的格|もくてきかく}の {関係代名詞|かんけいだいめいし}なので which を {使|つか}います（that も {使|つか}えます。{省略|しょうりゃく}も できます）。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「This is the book (　) I bought yesterday.（これは わたしが きのう {買|か}った {本|ほん}です）」', acceptedAnswers: ['that'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_verb_002', subject: 'english', gradeLevel: 9, unit: 'verb',
    difficulty: 'basic', answerType: 'input',
    question: '「eat」の {過去分詞|かこぶんし}を {書|か}きなさい。',
    answer: 'eaten', validationMode: 'exact',
    hints: ['{不規則動詞|ふきそくどうし}。{過去形|かこけい}は ate。', 'eat − ate − ？'],
    explanation: 'eat − ate − eaten と {変化|へんか}します。',
    reviewed: true
  },
  {
    id: 'english_g9_perfect_005', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'basic', answerType: 'input',
    question: '「I have just (　) my homework.（わたしは ちょうど {宿題|しゅくだい}を {終|お}えた ところです）」の（　）に、finish を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'finished', validationMode: 'exact',
    hints: ['「have just＋{過去分詞|かこぶんし}」で「ちょうど〜した ところだ」（{完了|かんりょう}）。', 'finish は {規則動詞|きそくどうし}。'],
    explanation: '{完了|かんりょう}を {表|あらわ}す {現在完了形|げんざいかんりょうけい}なので {過去分詞|かこぶんし}の finished を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g9_perfect_006', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'standard', answerType: 'input',
    question: '「How (　) have you lived in this town? — For ten years.」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'long', validationMode: 'exact',
    hints: ['{答|こた}えは「10{年間|ねんかん}です」と {期間|きかん}を {答|こた}えて いる。', '「どのくらいの {間|あいだ}」と {期間|きかん}を たずねる {言|い}い{方|かた}。'],
    explanation: '{期間|きかん}を たずねるときは「How long 〜?」を {使|つか}います。「この {町|まち}に どのくらい {住|す}んで いますか」という {意味|いみ}です。',
    reviewed: true
  },
  {
    id: 'english_g9_participle_002', subject: 'english', gradeLevel: 9, unit: 'participle',
    difficulty: 'standard', answerType: 'input',
    question: '「Look at the boy (　) under the tree.（{木|き}の {下|した}に すわって いる {少年|しょうねん}を {見|み}なさい）」の（　）に、sit を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'sitting', validationMode: 'exact',
    hints: ['「〜して いる」という {意味|いみ}で {名詞|めいし}を {後|うし}ろから {修飾|しゅうしょく}する。', '{現在分詞|げんざいぶんし}（-ing{形|けい}）。sit は {最後|さいご}の t を {重|かさ}ねる。'],
    explanation: '「〜して いる {少年|しょうねん}」と {名詞|めいし}を {修飾|しゅうしょく}するので、{現在分詞|げんざいぶんし}の sitting を {使|つか}います（t を {重|かさ}ねる {点|てん}に {注意|ちゅうい}）。',
    reviewed: true
  },
  {
    id: 'english_g9_relative_003', subject: 'english', gradeLevel: 9, unit: 'relative',
    difficulty: 'standard', answerType: 'input',
    question: '「I have a friend (　) father is a doctor.（わたしには、お{父|とう}さんが {医者|いしゃ}の {友|とも}だちが います）」の（　）に {入|はい}る {関係代名詞|かんけいだいめいし}を 1{語|ご} {書|か}きなさい。',
    answer: 'whose', validationMode: 'exact',
    hints: ['「その {友|とも}だちの お{父|とう}さん」と、{持|も}ち{主|ぬし}の {関係|かんけい}を {表|あらわ}す。', '{所有格|しょゆうかく}の {関係代名詞|かんけいだいめいし}。'],
    explanation: '「{友|とも}だちの お{父|とう}さん」と {所有|しょゆう}の {関係|かんけい}を {表|あらわ}すので、{所有格|しょゆうかく}の {関係代名詞|かんけいだいめいし} whose を {使|つか}います。',
    reviewed: true
  },
  {
    id: 'english_g9_subjunctive_002', subject: 'english', gradeLevel: 9, unit: 'subjunctive',
    difficulty: 'standard', answerType: 'input',
    question: '「I wish I (　) a dog.（{犬|いぬ}を {飼|か}って いれば いいのに）」の（　）に、have を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'had', validationMode: 'exact',
    hints: ['「I wish＋{主語|しゅご}＋{過去形|かこけい}」で、{現実|げんじつ}と ちがう {願望|がんぼう}を {表|あらわ}す（{仮定法|かていほう}）。', 'have の {過去形|かこけい}。'],
    explanation: '「I wish I had 〜.」は「〜を {持|も}って いれば いいのに（{実際|じっさい}は {持|も}って いない）」という {仮定法|かていほう}の {表現|ひょうげん}です。',
    reviewed: true
  },
  {
    id: 'english_g9_infinitive_002', subject: 'english', gradeLevel: 9, unit: 'infinitive',
    difficulty: 'standard', answerType: 'input',
    question: '「My mother told me (　) clean my room.（{母|はは}は わたしに {部屋|へや}を そうじするように {言|い}った）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'to', validationMode: 'exact',
    hints: ['「tell＋{人|ひと}＋(　)＋{動詞|どうし}の {原形|げんけい}」で「{人|ひと}に 〜するように {言|い}う」。', '{不定詞|ふていし}を {作|つく}る {語|ご}。'],
    explanation: '「tell＋{人|ひと}＋to＋{動詞|どうし}の {原形|げんけい}」で「{人|ひと}に 〜するように {言|い}う」という {意味|いみ}です。ask＋{人|ひと}＋to 〜（{人|ひと}に 〜するように {頼|たの}む）も {同|おな}じ {形|かたち}です。',
    reviewed: true
  },
  {
    id: 'english_g9_perfect_007', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'standard', answerType: 'input',
    question: '「I have been (　) for two hours.（わたしは 2{時間|じかん} ずっと {勉強|べんきょう}して います）」の（　）に、study を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'studying', validationMode: 'exact',
    hints: ['「have been＋-ing{形|けい}」は {現在完了進行形|げんざいかんりょうしんこうけい}。', '「ずっと 〜し{続|つづ}けて いる」という {意味|いみ}に なる。'],
    explanation: '{現在完了進行形|げんざいかんりょうしんこうけい}は「have（has）been＋-ing{形|けい}」で、ある {動作|どうさ}が {過去|かこ}から {今|いま}まで ずっと {続|つづ}いて いる ことを {表|あらわ}します。',
    reviewed: true
  },
  {
    id: 'english_g9_perfect_008', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Have you finished your lunch (　)?（もう {昼食|ちゅうしょく}を {食|た}べ{終|お}えましたか）」',
    choices: ['yet', 'already', 'ever', 'since'],
    answer: 'yet',
    hints: ['{完了|かんりょう}の {疑問文|ぎもんぶん}で「もう」を {表|あらわ}す {語|ご}。', 'already は ふつう {肯定文|こうていぶん}で「すでに」の {意味|いみ}に {使|つか}う。'],
    explanation: '{現在完了形|げんざいかんりょうけい}の {疑問文|ぎもんぶん}で「もう〜しましたか」と たずねるときは、{文|ぶん}の {最後|さいご}に yet を {置|お}きます。{否定文|ひていぶん}の yet は「まだ」の {意味|いみ}です。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「Have you finished your lunch (　)?（もう {昼食|ちゅうしょく}を {食|た}べ{終|お}えましたか）」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_indirect_002', subject: 'english', gradeLevel: 9, unit: 'indirect',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「I don\'t know what (　).（{彼|かれ}が {何|なに}を ほしいのか わからない）」',
    choices: ['he wants', 'does he want', 'he does want', 'wants he'],
    answer: 'he wants',
    hints: ['{文|ぶん}の {中|なか}に {疑問文|ぎもんぶん}が {入|はい}る {間接疑問|かんせつぎもん}。', '{疑問詞|ぎもんし}の {後|うし}ろは「{主語|しゅご}＋{動詞|どうし}」の {語順|ごじゅん}。'],
    explanation: '{間接疑問|かんせつぎもん}では「{疑問詞|ぎもんし}＋{主語|しゅご}＋{動詞|どうし}」の {語順|ごじゅん}に なるので、what he wants と なります。does は {使|つか}いません。',
    inputForm: { question: '（　）に 入る 語句を 書きなさい。「I don\'t know what (　).（{彼|かれ}が {何|なに}を ほしいのか わからない）」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_participle_003', subject: 'english', gradeLevel: 9, unit: 'participle',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Do you know the girl (　) with Ken?（ケンと {話|はな}して いる {少女|しょうじょ}を {知|し}って いますか）」',
    choices: ['talking', 'talked', 'talks', 'to talked'],
    answer: 'talking',
    hints: ['「〜して いる {少女|しょうじょ}」と {名詞|めいし}を {後|うし}ろから {修飾|しゅうしょく}する。', '「〜して いる」は {現在分詞|げんざいぶんし}、「〜された」は {過去分詞|かこぶんし}。'],
    explanation: '「ケンと {話|はな}して いる {少女|しょうじょ}」と、{進行中|しんこうちゅう}の {動作|どうさ}で {名詞|めいし}を {修飾|しゅうしょく}するので {現在分詞|げんざいぶんし}の talking を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「Do you know the girl (　) with Ken?（ケンと {話|はな}して いる {少女|しょうじょ}を {知|し}って いますか）」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_subjunctive_003', subject: 'english', gradeLevel: 9, unit: 'subjunctive',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「I wish I (　) fly like a bird.（{鳥|とり}のように {飛|と}べたら いいのに）」',
    choices: ['could', 'can', 'will', 'may'],
    answer: 'could',
    hints: ['{実際|じっさい}には {飛|と}べない ことを「〜できたら いいのに」と {願|ねが}って いる。', '{仮定法|かていほう}なので、can の {過去形|かこけい}を {使|つか}う。'],
    explanation: '「I wish I could 〜.」は「〜できたら いいのに」という {仮定法|かていほう}の {表現|ひょうげん}です。can の {過去形|かこけい} could を {使|つか}います。',
    inputForm: { question: '（　）に 入る 語を 書きなさい。「I wish I (　) fly like a bird.（{鳥|とり}のように {飛|と}べたら いいのに）」', validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'english_g9_relative_004', subject: 'english', gradeLevel: 9, unit: 'relative',
    difficulty: 'advanced', answerType: 'input',
    question: '「The man (　) I met yesterday was very kind.（わたしが きのう {会|あ}った {男性|だんせい}は とても {親切|しんせつ}だった）」の（　）に {入|はい}る {関係代名詞|かんけいだいめいし}を 1{語|ご} {書|か}きなさい。',
    answer: 'that', acceptedAnswers: ['who', 'whom'], validationMode: 'exact',
    hints: ['{先行詞|せんこうし}の the man は「{人|ひと}」。', '（　）の {後|うし}ろの「I met」には {目的語|もくてきご}が ない（{目的格|もくてきかく}）。'],
    explanation: '{先行詞|せんこうし}が {人|ひと}で {目的格|もくてきかく}の {関係代名詞|かんけいだいめいし}なので、that（または who / whom）を {使|つか}います。{目的格|もくてきかく}の {関係代名詞|かんけいだいめいし}は {省略|しょうりゃく}する ことも できます。',
    reviewed: true
  },
  {
    id: 'english_g9_verb_003', subject: 'english', gradeLevel: 9, unit: 'verb',
    difficulty: 'advanced', answerType: 'input',
    question: '「forget」の {過去分詞|かこぶんし}を {書|か}きなさい。',
    answer: 'forgotten', validationMode: 'exact',
    hints: ['{不規則動詞|ふきそくどうし}。{過去形|かこけい}は forgot。', 'forget − forgot − ？（{最後|さいご}に en が つく）'],
    explanation: 'forget − forgot − forgotten と {変化|へんか}します。t を {重|かさ}ねて en を つける {点|てん}に {注意|ちゅうい}しましょう。',
    reviewed: true
  },
  {
    id: 'english_g9_sentence_001', subject: 'english', gradeLevel: 9, unit: 'sentence',
    difficulty: 'advanced', answerType: 'choice',
    question: '「She asked me to help her.」の {意味|いみ}として {正|ただ}しいものは どれか。',
    choices: ['{彼女|かのじょ}は わたしに {手伝|てつだ}って くれるように {頼|たの}んだ。', '{彼女|かのじょ}は わたしを {手伝|てつだ}った。', 'わたしは {彼女|かのじょ}に {手伝|てつだ}うように {頼|たの}んだ。', '{彼女|かのじょ}は わたしに {手伝|てつだ}えるか きいた だけだ。'],
    answer: '{彼女|かのじょ}は わたしに {手伝|てつだ}って くれるように {頼|たの}んだ。',
    hints: ['「ask＋{人|ひと}＋to＋{動詞|どうし}の {原形|げんけい}」の {形|かたち}。', '{頼|たの}んだ のは She、{手伝|てつだ}う のは me（わたし）。'],
    explanation: '「ask＋{人|ひと}＋to 〜」は「{人|ひと}に 〜するように {頼|たの}む」という {意味|いみ}です。{頼|たの}んだのは {彼女|かのじょ}で、{手伝|てつだ}うのは わたしです。',
    reviewed: true
  },
  {
    id: 'english_g9_perfect_009', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'advanced', answerType: 'choice',
    question: '「I have lost my key.」が {表|あらわ}す {内容|ないよう}として {最|もっと}も {適切|てきせつ}な ものは どれか。',
    choices: ['かぎを なくして しまい、{今|いま}も {見|み}つかって いない。', 'かぎを なくしたが、もう {見|み}つかった。', 'かぎを なくした ことは {一度|いちど}も ない。', 'これから かぎを なくすかも しれない。'],
    answer: 'かぎを なくして しまい、{今|いま}も {見|み}つかって いない。',
    hints: ['{現在完了形|げんざいかんりょうけい}（{完了|かんりょう}・{結果|けっか}）は、{過去|かこ}の {出来事|できごと}の {結果|けっか}が {今|いま}も {続|つづ}いて いる ことを {表|あらわ}す。', '「I lost my key.（{過去形|かこけい}）」なら、{今|いま}の ことは わからない。'],
    explanation: '{現在完了形|げんざいかんりょうけい}の「I have lost my key.」は「かぎを なくして しまった（その {結果|けっか}、{今|いま}も ない）」という {意味|いみ}に なります。{過去形|かこけい}の「I lost my key.」は、{今|いま}の {状態|じょうたい}には ふれません。',
    reviewed: true
  }
);
