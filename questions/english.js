// 問題データ：英語（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// Lv1〜4 の自由入力は、英語の意味を日本語で答える・数字で答える形にしている（英語のつづりを書くのは Lv5 から）。
// 英語の自由入力は大文字・小文字を区別しない（js/answer.js の正規化）。
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
    reviewed: false
  },
  {
    id: 'english_g1_color_001', subject: 'english', gradeLevel: 1, unit: 'color',
    difficulty: 'basic', answerType: 'input',
    question: '「red（レッド）」は なにいろかな。ひらがなで かこう。',
    answer: 'あか', acceptedAnswers: ['赤', 'あかいろ', '赤色'], validationMode: 'kana-insensitive',
    hints: ['いちごや トマトの いろだよ。', 'しんごうの「とまれ」の いろだよ。'],
    explanation: '「red（レッド）」は「あか」です。',
    reviewed: false
  },
  {
    id: 'english_g1_animal_001', subject: 'english', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「dog（ドッグ）」は なんの どうぶつかな。ひらがなで かこう。',
    answer: 'いぬ', acceptedAnswers: ['犬'], validationMode: 'kana-insensitive',
    hints: ['「ワンワン」と なくよ。', 'さんぽが だいすきな どうぶつだよ。'],
    explanation: '「dog（ドッグ）」は「いぬ」です。',
    reviewed: false
  },
  {
    id: 'english_g1_number_001', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「three（スリー）」は いくつかな。すうじで かこう。',
    answer: '3', validationMode: 'number',
    hints: ['one（ワン）は 1、two（ツー）は 2 だよ。', 'two の つぎの かずだよ。'],
    explanation: '「three（スリー）」は 3 です。one（1）、two（2）、three（3）と かぞえます。',
    reviewed: false
  },
  {
    id: 'english_g1_animal_002', subject: 'english', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「cat（キャット）」は なんの どうぶつかな。ひらがなで かこう。',
    answer: 'ねこ', acceptedAnswers: ['猫'], validationMode: 'kana-insensitive',
    hints: ['「ニャー」と なくよ。', 'いぬと ならんで、いえで かわれる ことが おおい どうぶつだよ。'],
    explanation: '「cat（キャット）」は「ねこ」です。',
    reviewed: false
  },
  {
    id: 'english_g1_greeting_001', subject: 'english', gradeLevel: 1, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: 'あさ、ともだちに あった ときの あいさつは どれかな。',
    choices: ['Good morning.', 'Good night.', 'Goodbye.', 'Thank you.'],
    answer: 'Good morning.',
    hints: ['「morning（モーニング）」は「あさ」という いみだよ。', '「Good night.」は ねる まえの あいさつだよ。'],
    explanation: 'あさの あいさつは「Good morning.（おはよう）」です。「Good night.」は おやすみ、「Goodbye.」は さようなら、「Thank you.」は ありがとう です。',
    reviewed: false
  },
  {
    id: 'english_g1_color_002', subject: 'english', gradeLevel: 1, unit: 'color',
    difficulty: 'standard', answerType: 'choice',
    question: '「blue（ブルー）」は なにいろかな。',
    choices: ['あお', 'きいろ', 'みどり', 'しろ'],
    answer: 'あお',
    hints: ['はれた ひの そらの いろだよ。', 'うみの いろにも にて いるよ。'],
    explanation: '「blue（ブルー）」は「あお」です。きいろは yellow、みどりは green、しろは white です。',
    reviewed: false
  },
  {
    id: 'english_g1_number_002', subject: 'english', gradeLevel: 1, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「ten（テン）」は いくつかな。すうじで かこう。',
    answer: '10', validationMode: 'number',
    hints: ['りょうての ゆびを ぜんぶ たてた かずだよ。', 'nine（ナイン）＝9 の つぎの かずだよ。'],
    explanation: '「ten（テン）」は 10 です。',
    reviewed: false
  },
  {
    id: 'english_g1_greeting_002', subject: 'english', gradeLevel: 1, unit: 'greeting',
    difficulty: 'advanced', answerType: 'choice',
    question: '「ありがとう」は えいごで どれかな。',
    choices: ['Thank you.', 'Sorry.', 'Hello.', 'See you.'],
    answer: 'Thank you.',
    hints: ['「サンキュー」と よむよ。', 'なにかを して もらった ときに いう ことばだよ。'],
    explanation: '「ありがとう」は「Thank you.（サンキュー）」です。「Sorry.」は ごめんなさい、「Hello.」は こんにちは、「See you.」は またね です。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g2_color_001', subject: 'english', gradeLevel: 2, unit: 'color',
    difficulty: 'basic', answerType: 'input',
    question: '「yellow（イエロー）」は なにいろかな。ひらがなで かこう。',
    answer: 'きいろ', acceptedAnswers: ['黄色', 'きいろい', '黄色い'], validationMode: 'kana-insensitive',
    hints: ['バナナや レモンの いろだよ。', 'ひよこの いろにも にて いるよ。'],
    explanation: '「yellow（イエロー）」は「きいろ」です。',
    reviewed: false
  },
  {
    id: 'english_g2_number_001', subject: 'english', gradeLevel: 2, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「eight（エイト）」は いくつかな。すうじで かこう。',
    answer: '8', validationMode: 'number',
    hints: ['seven（セブン）＝7 の つぎの かずだよ。', 'たこの あしの かずと おなじだよ。'],
    explanation: '「eight（エイト）」は 8 です。',
    reviewed: false
  },
  {
    id: 'english_g2_animal_002', subject: 'english', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: '「bird（バード）」は なにかな。ひらがなで かこう。',
    answer: 'とり', acceptedAnswers: ['鳥'], validationMode: 'kana-insensitive',
    hints: ['はねが あって そらを とぶよ。', 'すずめや からすの なかまだよ。'],
    explanation: '「bird（バード）」は「とり」です。',
    reviewed: false
  },
  {
    id: 'english_g2_food_001', subject: 'english', gradeLevel: 2, unit: 'food',
    difficulty: 'standard', answerType: 'input',
    question: '「milk（ミルク）」は なにかな。ひらがなで かこう。',
    answer: 'ぎゅうにゅう', acceptedAnswers: ['牛乳', 'ミルク', 'みるく'], validationMode: 'kana-insensitive',
    hints: ['うしから とれる、しろい のみものだよ。', 'きゅうしょくで よく のむよ。'],
    explanation: '「milk（ミルク）」は「ぎゅうにゅう」です。',
    reviewed: false
  },
  {
    id: 'english_g2_greeting_001', subject: 'english', gradeLevel: 2, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: 'ともだちと わかれる ときの あいさつは どれかな。',
    choices: ['Goodbye.', 'Hello.', 'Good morning.', 'Nice to meet you.'],
    answer: 'Goodbye.',
    hints: ['「さようなら」の いみの ことばだよ。', '「Hello.」は あった ときの あいさつだよ。'],
    explanation: 'わかれる ときは「Goodbye.（さようなら）」と いいます。「See you.（またね）」とも いいます。',
    reviewed: false
  },
  {
    id: 'english_g2_animal_003', subject: 'english', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'choice',
    question: '「さかな」は えいごで どれかな。',
    choices: ['fish', 'bird', 'frog', 'bear'],
    answer: 'fish',
    hints: ['「フィッシュ」と よむよ。', 'f から はじまる ことばだよ。'],
    explanation: '「さかな」は「fish（フィッシュ）」です。bird は とり、frog は かえる、bear は くまです。',
    reviewed: false
  },
  {
    id: 'english_g2_number_002', subject: 'english', gradeLevel: 2, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「seven（セブン）」は いくつかな。すうじで かこう。',
    answer: '7', validationMode: 'number',
    hints: ['six（シックス）＝6 の つぎの かずだよ。', '1しゅうかんの ひの かずと おなじだよ。'],
    explanation: '「seven（セブン）」は 7 です。',
    reviewed: false
  },
  {
    id: 'english_g2_greeting_002', subject: 'english', gradeLevel: 2, unit: 'greeting',
    difficulty: 'advanced', answerType: 'choice',
    question: '「How are you?（げんき？）」と きかれた ときの こたえに ぴったりなのは どれかな。',
    choices: ["I'm fine, thank you.", 'My name is Ken.', "I'm seven.", 'I like dogs.'],
    answer: "I'm fine, thank you.",
    hints: ['「げんき？」と きかれて いるよ。', '「fine（ファイン）」は「げんき」という いみだよ。'],
    explanation: '「How are you?（げんき？）」には「I\'m fine, thank you.（げんきだよ、ありがとう）」と こたえます。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g3_alphabet_001', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'basic', answerType: 'input',
    question: 'アルファベットで、A・B・C の {次|つぎ}の {文字|もじ}は {何|なに}かな。',
    answer: 'D', validationMode: 'exact',
    hints: ['ABCの {歌|うた}を {思|おも}い{出|だ}そう。', '「ディー」と {読|よ}む {文字|もじ}だよ。'],
    explanation: 'A・B・C の {次|つぎ}は「D（ディー）」です。A B C D E F G …と {続|つづ}きます。',
    reviewed: false
  },
  {
    id: 'english_g3_number_001', subject: 'english', gradeLevel: 3, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「fifteen（フィフティーン）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '15', validationMode: 'number',
    hints: ['five（ファイブ）は 5。「-teen（ティーン）」が つくと 10 {増|ふ}えるよ。', 'ten（10）と five（5）を {合|あ}わせた {数|かず}だよ。'],
    explanation: '「fifteen」は 15 です。13〜19 は「-teen」で {終|お}わります（thirteen＝13、fourteen＝14 など）。',
    reviewed: false
  },
  {
    id: 'english_g3_word_001', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「What color do you like?」の「color（カラー）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'いろ', acceptedAnswers: ['色'], validationMode: 'kana-insensitive',
    hints: ['red や blue の なかまを まとめた ことばだよ。', '「{何|なに}○○が すき？」と きいて いるよ。'],
    explanation: '「color」は「いろ」です。「What color do you like?」は「{何色|なにいろ}が すき？」という {意味|いみ}です。',
    reviewed: false
  },
  {
    id: 'english_g3_word_002', subject: 'english', gradeLevel: 3, unit: 'word',
    difficulty: 'standard', answerType: 'input',
    question: '「I like apples.」の「like（ライク）」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'すき', acceptedAnswers: ['好き', 'すきです', '好きです'], validationMode: 'kana-insensitive',
    hints: ['「わたしは りんごが ○○です」という {文|ぶん}だよ。', 'きらいの {反対|はんたい}だよ。'],
    explanation: '「like」は「すき」です。「I like apples.」は「わたしは りんごが すきです」という {意味|いみ}です。',
    reviewed: false
  },
  {
    id: 'english_g3_number_002', subject: 'english', gradeLevel: 3, unit: 'number',
    difficulty: 'standard', answerType: 'choice',
    question: '「How many apples?（りんごは いくつ？）」と きかれました。りんごは 12{個|こ} あります。{正|ただ}しい {答|こた}えは どれかな。',
    choices: ['Twelve.', 'Twenty.', 'Two.', 'Eleven.'],
    answer: 'Twelve.',
    hints: ['eleven が 11 だよ。その {次|つぎ}の {数|かず}だよ。', 'twenty は 20、two は 2 だよ。'],
    explanation: '12 は「twelve（トゥエルブ）」です。11 は eleven、20 は twenty です。',
    reviewed: false
  },
  {
    id: 'english_g3_greeting_002', subject: 'english', gradeLevel: 3, unit: 'greeting',
    difficulty: 'standard', answerType: 'choice',
    question: '「What\'s your name?」と きかれた ときの {答|こた}えとして ぴったりなのは どれかな。',
    choices: ['My name is Yuki.', "I'm fine.", 'I like dogs.', "It's red."],
    answer: 'My name is Yuki.',
    hints: ['「name（ネーム）」は「{名前|なまえ}」という {意味|いみ}だよ。', '{名前|なまえ}を きかれて いるよ。'],
    explanation: '「What\'s your name?」は「あなたの {名前|なまえ}は {何|なん}ですか」なので、「My name is Yuki.（わたしの {名前|なまえ}は ユキです）」と {答|こた}えます。',
    reviewed: false
  },
  {
    id: 'english_g3_alphabet_002', subject: 'english', gradeLevel: 3, unit: 'alphabet',
    difficulty: 'advanced', answerType: 'input',
    question: 'アルファベットで、M の {次|つぎ}の {文字|もじ}は {何|なに}かな。',
    answer: 'N', validationMode: 'exact',
    hints: ['H I J K L M … と {続|つづ}けて みよう。', '「エヌ」と {読|よ}む {文字|もじ}だよ。'],
    explanation: 'M の {次|つぎ}は「N（エヌ）」です。… K L M N O P …と {続|つづ}きます。',
    reviewed: false
  },
  {
    id: 'english_g3_phrase_001', subject: 'english', gradeLevel: 3, unit: 'phrase',
    difficulty: 'advanced', answerType: 'choice',
    question: '「How many?」の {意味|いみ}は どれかな。',
    choices: ['いくつ？', 'どこ？', 'だれ？', 'いつ？'],
    answer: 'いくつ？',
    hints: ['{数|かず}を たずねる ときに {使|つか}うよ。', '「many（メニー）」は「たくさん」という {意味|いみ}だよ。'],
    explanation: '「How many?」は「いくつ？」と {数|かず}を たずねる ことばです。「どこ？」は Where?、「だれ？」は Who?、「いつ？」は When? です。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g4_week_002', subject: 'english', gradeLevel: 4, unit: 'week',
    difficulty: 'basic', answerType: 'input',
    question: '「Sunday」は {何曜日|なんようび}かな。ひらがなで {書|か}こう。（{例|れい}：げつようび）',
    answer: 'にちようび', acceptedAnswers: ['日曜日', '日曜', 'にちよう', '日'], validationMode: 'kana-insensitive',
    hints: ['「Sun」は「{太陽|たいよう}」という {意味|いみ}だよ。', '{学校|がっこう}が お{休|やす}みの {日|ひ}だよ。'],
    explanation: '「Sunday」は「{日曜日|にちようび}」です。「Sun（{太陽|たいよう}）」の {日|ひ}という {意味|いみ}です。',
    reviewed: false
  },
  {
    id: 'english_g4_weather_001', subject: 'english', gradeLevel: 4, unit: 'weather',
    difficulty: 'standard', answerType: 'input',
    question: '「It\'s rainy.」は どんな {天気|てんき}かな。ひらがなで {書|か}こう。',
    answer: 'あめ', acceptedAnswers: ['雨'], validationMode: 'kana-insensitive',
    hints: ['「rain（レイン）」は {空|そら}から ふって くる ものだよ。', 'かさが {必要|ひつよう}な {天気|てんき}だよ。'],
    explanation: '「rainy」は「{雨|あめ}の」という {意味|いみ}で、「It\'s rainy.」は「{雨|あめ}です」です。sunny＝{晴|は}れ、cloudy＝くもり、snowy＝{雪|ゆき}です。',
    reviewed: false
  },
  {
    id: 'english_g4_time_001', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'standard', answerType: 'input',
    question: '「It\'s three o\'clock.」は {何時|なんじ}かな。{数字|すうじ}で {書|か}こう。',
    answer: '3', acceptedAnswers: ['3時'], validationMode: 'number',
    hints: ['「o\'clock（オクロック）」は「〜{時|じ}ちょうど」という {意味|いみ}だよ。', '「three」は いくつだったかな。'],
    explanation: '「It\'s three o\'clock.」は「3{時|じ}です」という {意味|いみ}です。',
    reviewed: false
  },
  {
    id: 'english_g4_number_001', subject: 'english', gradeLevel: 4, unit: 'number',
    difficulty: 'standard', answerType: 'input',
    question: '「twenty（トゥエンティ）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '20', validationMode: 'number',
    hints: ['「-ty（ティ）」で {終|お}わる {数|かず}は、10、20、30… のような {数|かず}だよ。', 'two（2）に にて いるね。'],
    explanation: '「twenty」は 20 です。30 は thirty、40 は forty です。',
    reviewed: false
  },
  {
    id: 'english_g4_phrase_001', subject: 'english', gradeLevel: 4, unit: 'phrase',
    difficulty: 'standard', answerType: 'choice',
    question: '「Let\'s play soccer.」の {意味|いみ}は どれかな。',
    choices: ['サッカーを しよう。', 'サッカーが すきです。', 'サッカーを しましたか。', 'サッカーは しません。'],
    answer: 'サッカーを しよう。',
    hints: ['「Let\'s（レッツ）〜.」は {相手|あいて}を さそう ときの ことばだよ。', '「〜しよう」という {意味|いみ}だよ。'],
    explanation: '「Let\'s 〜.」は「〜しよう」と さそう {言|い}い{方|かた}です。「Let\'s play soccer.」は「サッカーを しよう」です。',
    reviewed: false
  },
  {
    id: 'english_g4_word_001', subject: 'english', gradeLevel: 4, unit: 'word',
    difficulty: 'standard', answerType: 'choice',
    question: '「pencil」は どれかな。',
    choices: ['えんぴつ', 'けしゴム', 'ノート', 'じょうぎ'],
    answer: 'えんぴつ',
    hints: ['「ペンシル」と {読|よ}むよ。', '{字|じ}を {書|か}く {道具|どうぐ}だよ。'],
    explanation: '「pencil」は「えんぴつ」です。けしゴムは eraser、ノートは notebook、じょうぎは ruler です。',
    reviewed: false
  },
  {
    id: 'english_g4_number_002', subject: 'english', gradeLevel: 4, unit: 'number',
    difficulty: 'advanced', answerType: 'input',
    question: '「thirty（サーティ）」は いくつかな。{数字|すうじ}で {書|か}こう。',
    answer: '30', validationMode: 'number',
    hints: ['「-ty」で {終|お}わるので、10、20、30… の どれかだよ。', 'three（3）に にて いるね。'],
    explanation: '「thirty」は 30 です。13 の thirteen（サーティーン）と まちがえないように しましょう。',
    reviewed: false
  },
  {
    id: 'english_g4_time_002', subject: 'english', gradeLevel: 4, unit: 'time',
    difficulty: 'advanced', answerType: 'choice',
    question: '「What time is it?」—「It\'s seven thirty.」 {今|いま}は {何時|なんじ}かな。',
    choices: ['7{時|じ}30{分|ぷん}', '7{時|じ}13{分|ぷん}', '3{時|じ}7{分|ふん}', '30{時|じ}7{分|ふん}'],
    answer: '7{時|じ}30{分|ぷん}',
    hints: ['{最初|さいしょ}の {数|かず}が「{時|じ}」、{次|つぎ}の {数|かず}が「{分|ふん}」だよ。', 'seven は 7、thirty は 30 だよ。'],
    explanation: '「seven thirty」は「7{時|じ}30{分|ぷん}」です。{時|じ}と {分|ふん}の {数|かず}を {順|じゅん}に {言|い}います。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g5_spell_001', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「ねこ」を {英語|えいご}で {書|か}こう。（アルファベット 3{文字|もじ}）',
    answer: 'cat', validationMode: 'exact',
    hints: ['「キャット」と {読|よ}むよ。', 'c から {始|はじ}まるよ。'],
    explanation: '「ねこ」は「cat」です。',
    reviewed: false
  },
  {
    id: 'english_g5_spell_002', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「いぬ」を {英語|えいご}で {書|か}こう。（アルファベット 3{文字|もじ}）',
    answer: 'dog', validationMode: 'exact',
    hints: ['「ドッグ」と {読|よ}むよ。', 'd から {始|はじ}まって g で {終|お}わるよ。'],
    explanation: '「いぬ」は「dog」です。',
    reviewed: false
  },
  {
    id: 'english_g5_can_001', subject: 'english', gradeLevel: 5, unit: 'can',
    difficulty: 'standard', answerType: 'input',
    question: '「I can swim.」の「swim」の {意味|いみ}を ひらがなで {書|か}こう。',
    answer: 'およぐ', acceptedAnswers: ['泳ぐ', 'およげる', '泳げる', 'すいえい', '水泳'], validationMode: 'kana-insensitive',
    hints: ['「can」は「〜できる」という {意味|いみ}だよ。', 'プールや {海|うみ}で する ことだよ。'],
    explanation: '「swim」は「およぐ」です。「I can swim.」は「わたしは およぐ ことが できます」という {意味|いみ}です。',
    reviewed: false
  },
  {
    id: 'english_g5_month_002', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'standard', answerType: 'input',
    question: '「When is your birthday?」—「My birthday is May 5th.」 この {人|ひと}の {誕生日|たんじょうび}は {何月|なんがつ}かな。{数字|すうじ}で {書|か}こう。',
    answer: '5', acceptedAnswers: ['5月'], validationMode: 'number',
    hints: ['「birthday」は「{誕生日|たんじょうび}」だよ。', '「May」は {何月|なんがつ}かな。'],
    explanation: '「May」は 5{月|がつ}なので、{誕生日|たんじょうび}は 5{月|がつ}5{日|か}です。',
    reviewed: false
  },
  {
    id: 'english_g5_want_001', subject: 'english', gradeLevel: 5, unit: 'want',
    difficulty: 'standard', answerType: 'choice',
    question: '「I want to be a doctor.」の {意味|いみ}は どれかな。',
    choices: ['わたしは {医者|いしゃ}に なりたいです。', 'わたしは {医者|いしゃ}です。', 'わたしは {病院|びょういん}に {行|い}きました。', 'わたしは {医者|いしゃ}が すきです。'],
    answer: 'わたしは {医者|いしゃ}に なりたいです。',
    hints: ['「want to be 〜」は「〜に なりたい」という {意味|いみ}だよ。', '「doctor」は「{医者|いしゃ}」だよ。'],
    explanation: '「I want to be 〜.」は「〜に なりたい」と {将来|しょうらい}の {夢|ゆめ}を {伝|つた}える {言|い}い{方|かた}です。',
    reviewed: false
  },
  {
    id: 'english_g5_direction_001', subject: 'english', gradeLevel: 5, unit: 'direction',
    difficulty: 'standard', answerType: 'choice',
    question: '{道案内|みちあんない}で「Turn right.」と {言|い}われました。どう すれば よいかな。',
    choices: ['{右|みぎ}に {曲|ま}がる', '{左|ひだり}に {曲|ま}がる', 'まっすぐ {進|すす}む', '{止|と}まる'],
    answer: '{右|みぎ}に {曲|ま}がる',
    hints: ['「turn」は「{曲|ま}がる」という {意味|いみ}だよ。', '「right」は {右|みぎ}、「left」は {左|ひだり}だよ。'],
    explanation: '「Turn right.」は「{右|みぎ}に {曲|ま}がって」です。「Turn left.」は {左|ひだり}に {曲|ま}がる、「Go straight.」は まっすぐ {進|すす}む です。',
    reviewed: false
  },
  {
    id: 'english_g5_spell_003', subject: 'english', gradeLevel: 5, unit: 'spell',
    difficulty: 'advanced', answerType: 'input',
    question: '「{本|ほん}」を {英語|えいご}で {書|か}こう。（アルファベット 4{文字|もじ}）',
    answer: 'book', validationMode: 'exact',
    hints: ['「ブック」と {読|よ}むよ。', 'b から {始|はじ}まり、o が 2つ {続|つづ}くよ。'],
    explanation: '「{本|ほん}」は「book」です。o を 2つ {続|つづ}けて {書|か}きます。',
    reviewed: false
  },
  {
    id: 'english_g5_month_003', subject: 'english', gradeLevel: 5, unit: 'month',
    difficulty: 'advanced', answerType: 'choice',
    question: '「8{月|がつ}」を {英語|えいご}で {言|い}うと どれかな。',
    choices: ['August', 'October', 'June', 'March'],
    answer: 'August',
    hints: ['「オーガスト」と {読|よ}むよ。', 'October は 10{月|がつ}、June は 6{月|がつ}、March は 3{月|がつ}だよ。'],
    explanation: '8{月|がつ}は「August」です。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g6_spell_001', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'basic', answerType: 'input',
    question: '「{夏|なつ}」を {英語|えいご}で {書|か}こう。',
    answer: 'summer', validationMode: 'exact',
    hints: ['「サマー」と {読|よ}むよ。', 's から {始|はじ}まり、m が 2つ {続|つづ}くよ。'],
    explanation: '「{夏|なつ}」は「summer」です。{春|はる}は spring、{秋|あき}は fall（autumn）、{冬|ふゆ}は winter です。',
    reviewed: false
  },
  {
    id: 'english_g6_spell_002', subject: 'english', gradeLevel: 6, unit: 'spell',
    difficulty: 'standard', answerType: 'input',
    question: '「{水|みず}」を {英語|えいご}で {書|か}こう。',
    answer: 'water', validationMode: 'exact',
    hints: ['「ウォーター」と {読|よ}むよ。', 'w から {始|はじ}まる 5{文字|もじ}の ことばだよ。'],
    explanation: '「{水|みず}」は「water」です。',
    reviewed: false
  },
  {
    id: 'english_g6_past_002', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'input',
    question: '「I ate curry.（わたしは カレーを {食|た}べました）」の「ate」の もとの {形|かたち}を {英語|えいご}で {書|か}こう。',
    answer: 'eat', validationMode: 'exact',
    hints: ['「{食|た}べる」という {意味|いみ}の ことばだよ。', 'アルファベット 3{文字|もじ}。e から {始|はじ}まるよ。'],
    explanation: '「ate」は「eat（{食|た}べる）」の {過去|かこ}の {形|かたち}です。',
    reviewed: false
  },
  {
    id: 'english_g6_subject_001', subject: 'english', gradeLevel: 6, unit: 'subject',
    difficulty: 'standard', answerType: 'input',
    question: '「My favorite subject is math.」の「math」は {何|なん}の {教科|きょうか}かな。ひらがなで {書|か}こう。',
    answer: 'さんすう', acceptedAnswers: ['算数', 'すうがく', '数学'], validationMode: 'kana-insensitive',
    hints: ['「subject」は「{教科|きょうか}」という {意味|いみ}だよ。', '{計算|けいさん}や {図形|ずけい}を {勉強|べんきょう}する {教科|きょうか}だよ。'],
    explanation: '「math」は「{算数|さんすう}（{数学|すうがく}）」です。{英語|えいご}は English、{理科|りか}は science、{社会|しゃかい}は social studies です。',
    reviewed: false
  },
  {
    id: 'english_g6_want_001', subject: 'english', gradeLevel: 6, unit: 'want',
    difficulty: 'standard', answerType: 'choice',
    question: '「What do you want to be?」と きかれた ときの {答|こた}えとして ぴったりなのは どれかな。',
    choices: ['I want to be a teacher.', 'I like teachers.', 'I am a student.', 'I went to school.'],
    answer: 'I want to be a teacher.',
    hints: ['「{何|なに}に なりたいですか」と きかれて いるよ。', '{同|おな}じ「want to be」を {使|つか}って {答|こた}えよう。'],
    explanation: '「What do you want to be?（{何|なに}に なりたいですか）」には「I want to be a teacher.（{先生|せんせい}に なりたいです）」のように {答|こた}えます。',
    reviewed: false
  },
  {
    id: 'english_g6_past_003', subject: 'english', gradeLevel: 6, unit: 'past',
    difficulty: 'standard', answerType: 'choice',
    question: '「I enjoyed swimming.」の {意味|いみ}は どれかな。',
    choices: ['わたしは {水泳|すいえい}を {楽|たの}しみました。', 'わたしは {水泳|すいえい}を {楽|たの}しみます。', 'わたしは {水泳|すいえい}が {好|す}きでは ありません。', 'わたしは {水泳|すいえい}を したいです。'],
    answer: 'わたしは {水泳|すいえい}を {楽|たの}しみました。',
    hints: ['「enjoy」は「{楽|たの}しむ」という {意味|いみ}だよ。', '「-ed」が ついて いるので、{過去|かこ}の ことだよ。'],
    explanation: '「enjoyed」は「enjoy（{楽|たの}しむ）」の {過去|かこ}の {形|かたち}なので、「{楽|たの}しみました」という {意味|いみ}です。',
    reviewed: false
  },
  {
    id: 'english_g6_word_001', subject: 'english', gradeLevel: 6, unit: 'word',
    difficulty: 'advanced', answerType: 'input',
    question: '「big（{大|おお}きい）」の {反対|はんたい}の {意味|いみ}の {英語|えいご}を {書|か}こう。',
    answer: 'small', acceptedAnswers: ['little'], validationMode: 'exact',
    hints: ['「{小|ちい}さい」という {意味|いみ}の ことばだよ。', '「スモール」と {読|よ}むよ。'],
    explanation: '「big」の {反対|はんたい}は「small（{小|ちい}さい）」です。「little」も {小|ちい}さいという {意味|いみ}で {使|つか}えます。',
    reviewed: false
  },
  {
    id: 'english_g6_can_001', subject: 'english', gradeLevel: 6, unit: 'can',
    difficulty: 'advanced', answerType: 'choice',
    question: '「Can you play the piano?」に「はい、ひけます」と {答|こた}える とき、{正|ただ}しいのは どれかな。',
    choices: ['Yes, I can.', 'Yes, I do.', 'Yes, I am.', 'Yes, you can.'],
    answer: 'Yes, I can.',
    hints: ['「Can you 〜?」と きかれて いるよ。', 'きかれた ことばと {同|おな}じ「can」を {使|つか}って {答|こた}えよう。'],
    explanation: '「Can you 〜?」には「Yes, I can.」か「No, I can\'t.」で {答|こた}えます。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g7_verb_001', subject: 'english', gradeLevel: 7, unit: 'verb',
    difficulty: 'basic', answerType: 'input',
    question: '「Ken (　) tennis every day.」の（　）に、play を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'plays', validationMode: 'exact',
    hints: ['{主語|しゅご}の Ken は {三人称|さんにんしょう}・{単数|たんすう}。', '{現在|げんざい}の {文|ぶん}で、{主語|しゅご}が {三人称単数|さんにんしょうたんすう}の とき、{動詞|どうし}に s を つける。'],
    explanation: '{主語|しゅご}が {三人称単数|さんにんしょうたんすう}（Ken）で {現在|げんざい}の {文|ぶん}なので、play に s を つけて plays に します。',
    reviewed: false
  },
  {
    id: 'english_g7_article_001', subject: 'english', gradeLevel: 7, unit: 'article',
    difficulty: 'standard', answerType: 'input',
    question: '「This is (　) apple.」の（　）に、a か an の どちらかを {入|い}れなさい。',
    answer: 'an', validationMode: 'exact',
    hints: ['apple は {母音|ぼいん}（ア・イ・ウ・エ・オに {近|ちか}い {音|おと}）で {始|はじ}まる。', '{母音|ぼいん}で {始|はじ}まる {語|ご}の {前|まえ}では、a の {代|か}わりに…'],
    explanation: 'apple は {母音|ぼいん}の {音|おと}で {始|はじ}まるので、a ではなく an を {使|つか}います（an apple）。',
    reviewed: false
  },
  {
    id: 'english_g7_plural_001', subject: 'english', gradeLevel: 7, unit: 'plural',
    difficulty: 'standard', answerType: 'input',
    question: '「box（{箱|はこ}）」の {複数形|ふくすうけい}を {書|か}きなさい。',
    answer: 'boxes', validationMode: 'exact',
    hints: ['x で {終|お}わる {語|ご}の {複数形|ふくすうけい}は、s だけでは ない。', 'bus → buses と {同|おな}じ つけ{方|かた}。'],
    explanation: 's・x・sh・ch で {終|お}わる {語|ご}は es を つけます。box → boxes です。',
    reviewed: false
  },
  {
    id: 'english_g7_progressive_001', subject: 'english', gradeLevel: 7, unit: 'progressive',
    difficulty: 'standard', answerType: 'input',
    question: '「She is (　) a book now.（{彼女|かのじょ}は {今|いま}、{本|ほん}を {読|よ}んで います）」の（　）に、read を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'reading', validationMode: 'exact',
    hints: ['「〜して いる」は {現在進行形|げんざいしんこうけい}（be{動詞|どうし}＋{動詞|どうし}の -ing{形|けい}）。', 'read に ing を つける。'],
    explanation: '{現在進行形|げんざいしんこうけい}は「be{動詞|どうし}＋-ing{形|けい}」なので、reading に します。',
    reviewed: false
  },
  {
    id: 'english_g7_question_001', subject: 'english', gradeLevel: 7, unit: 'question',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「(　) do you live? — I live in Tokyo.」',
    choices: ['Where', 'What', 'When', 'Who'],
    answer: 'Where',
    hints: ['{答|こた}えは「{東京|とうきょう}に {住|す}んで います」。', '{場所|ばしょ}を たずねる {疑問詞|ぎもんし}は？'],
    explanation: '{住|す}んで いる {場所|ばしょ}を たずねて いるので、Where（どこに）を {使|つか}います。',
    reviewed: false
  },
  {
    id: 'english_g7_verb_002', subject: 'english', gradeLevel: 7, unit: 'verb',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「Do you like music? — Yes, I (　).」',
    choices: ['do', 'am', 'like', 'does'],
    answer: 'do',
    hints: ['「Do you 〜?」で たずねられて いる。', 'たずねる ときに {使|つか}った {語|ご}で {答|こた}える。'],
    explanation: '「Do you 〜?」には「Yes, I do.」または「No, I don\'t.」で {答|こた}えます。',
    reviewed: false
  },
  {
    id: 'english_g7_past_001', subject: 'english', gradeLevel: 7, unit: 'past',
    difficulty: 'advanced', answerType: 'input',
    question: '「go」の {過去形|かこけい}を {書|か}きなさい。',
    answer: 'went', validationMode: 'exact',
    hints: ['{不規則動詞|ふきそくどうし}なので、ed を つけるのでは ない。', '「I (　) to the park yesterday.」の（　）に {入|はい}る {語|ご}。'],
    explanation: 'go の {過去形|かこけい}は went です（{不規則動詞|ふきそくどうし}）。',
    reviewed: false
  },
  {
    id: 'english_g7_past_002', subject: 'english', gradeLevel: 7, unit: 'past',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「He (　) TV last night.」',
    choices: ['watched', 'watches', 'watch', 'is watching'],
    answer: 'watched',
    hints: ['「last night（{昨夜|さくや}）」に {注目|ちゅうもく}する。', '{過去|かこ}の ことを {表|あらわ}す {形|かたち}を {選|えら}ぶ。'],
    explanation: 'last night（{昨夜|さくや}）が あるので {過去形|かこけい}の watched を {使|つか}います。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g8_comparison_001', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'basic', answerType: 'input',
    question: '「tall」の {比較級|ひかくきゅう}を {書|か}きなさい。',
    answer: 'taller', validationMode: 'exact',
    hints: ['「より {背|せ}が {高|たか}い」という {意味|いみ}の {形|かたち}。', '{短|みじか}い {語|ご}は、{語尾|ごび}に er を つける。'],
    explanation: 'tall の {比較級|ひかくきゅう}は taller、{最上級|さいじょうきゅう}は tallest です。',
    reviewed: false
  },
  {
    id: 'english_g8_comparison_002', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'standard', answerType: 'input',
    question: '「good」の {最上級|さいじょうきゅう}を {書|か}きなさい。',
    answer: 'best', validationMode: 'exact',
    hints: ['good は {不規則|ふきそく}に {変化|へんか}する。', '{比較級|ひかくきゅう}は better。'],
    explanation: 'good の {比較級|ひかくきゅう}は better、{最上級|さいじょうきゅう}は best です（good − better − best）。',
    reviewed: false
  },
  {
    id: 'english_g8_modal_001', subject: 'english', gradeLevel: 8, unit: 'modal',
    difficulty: 'standard', answerType: 'input',
    question: '「You (　) not run here.（ここで {走|はし}っては いけません）」の（　）に {入|はい}る {助動詞|じょどうし}を {書|か}きなさい。',
    answer: 'must', validationMode: 'exact',
    hints: ['「〜しなければ ならない」という {意味|いみ}の {助動詞|じょどうし}。', 'その {否定形|ひていけい}は「〜しては いけない」という {強|つよ}い {禁止|きんし}に なる。'],
    explanation: '「must not（mustn\'t）＋{動詞|どうし}の {原形|げんけい}」で「〜しては いけない」という {禁止|きんし}を {表|あらわ}します。',
    reviewed: false
  },
  {
    id: 'english_g8_passive_001', subject: 'english', gradeLevel: 8, unit: 'passive',
    difficulty: 'standard', answerType: 'input',
    question: '「This book was (　) by Natsume Soseki.（この {本|ほん}は {夏目漱石|なつめそうせき}に よって {書|か}かれた）」の（　）に、write を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'written', validationMode: 'exact',
    hints: ['{受|う}け{身|み}は「be{動詞|どうし}＋{過去分詞|かこぶんし}」。', 'write − wrote − ？'],
    explanation: '{受|う}け{身|み}の {文|ぶん}なので {過去分詞|かこぶんし}を {使|つか}います。write の {過去分詞|かこぶんし}は written です（write − wrote − written）。',
    reviewed: false
  },
  {
    id: 'english_g8_gerund_001', subject: 'english', gradeLevel: 8, unit: 'gerund',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「I enjoy (　) soccer.」',
    choices: ['playing', 'to play', 'play', 'played'],
    answer: 'playing',
    hints: ['enjoy の {後|あと}ろには、{決|き}まった {形|かたち}が くる。', 'enjoy は「〜する ことを {楽|たの}しむ」。{動名詞|どうめいし}（-ing）を {目的語|もくてきご}に とる。'],
    explanation: 'enjoy の {後|あと}ろには {動名詞|どうめいし}（-ing{形|けい}）が きます。to{不定詞|ふていし}は {使|つか}えません。',
    reviewed: false
  },
  {
    id: 'english_g8_there_001', subject: 'english', gradeLevel: 8, unit: 'there',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「There (　) two cats under the table.」',
    choices: ['are', 'is', 'be', 'am'],
    answer: 'are',
    hints: ['There is / There are の {後|あと}ろの {名詞|めいし}に {注目|ちゅうもく}する。', 'two cats は {複数|ふくすう}。'],
    explanation: '「There is / are 〜.」は、{後|あと}ろの {名詞|めいし}が {単数|たんすう}なら is、{複数|ふくすう}なら are を {使|つか}います。two cats は {複数|ふくすう}なので are です。',
    reviewed: false
  },
  {
    id: 'english_g8_infinitive_001', subject: 'english', gradeLevel: 8, unit: 'infinitive',
    difficulty: 'advanced', answerType: 'input',
    question: '「I want (　) a doctor.（わたしは {医者|いしゃ}に なりたい）」の（　）に {入|はい}る 2{語|ご}を {書|か}きなさい。（be を {使|つか}う）',
    answer: 'to be', validationMode: 'exact',
    hints: ['want の {後|あと}ろには to{不定詞|ふていし}（to＋{動詞|どうし}の {原形|げんけい}）が くる。', 'be の {前|まえ}に 1{語|ご} {加|くわ}える。'],
    explanation: '「want to＋{動詞|どうし}の {原形|げんけい}」で「〜したい」なので、to be が {入|はい}ります。',
    reviewed: false
  },
  {
    id: 'english_g8_comparison_003', subject: 'english', gradeLevel: 8, unit: 'comparison',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「Mt. Fuji is (　) mountain in Japan.」',
    choices: ['the highest', 'higher', 'high', 'the higher'],
    answer: 'the highest',
    hints: ['「{日本|にほん}で いちばん {高|たか}い {山|やま}」という {意味|いみ}に したい。', '「in Japan」の ような {範囲|はんい}を {表|あらわ}す {語句|ごく}が ある ときは {最上級|さいじょうきゅう}。'],
    explanation: '「{日本|にほん}で いちばん 〜」は {最上級|さいじょうきゅう}で、the を つけて the highest と します。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'english_g9_verb_001', subject: 'english', gradeLevel: 9, unit: 'verb',
    difficulty: 'basic', answerType: 'input',
    question: '「take」の {過去分詞|かこぶんし}を {書|か}きなさい。',
    answer: 'taken', validationMode: 'exact',
    hints: ['{不規則動詞|ふきそくどうし}。{過去形|かこけい}は took。', 'take − took − ？'],
    explanation: 'take − took − taken と {変化|へんか}します。',
    reviewed: false
  },
  {
    id: 'english_g9_perfect_002', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'standard', answerType: 'input',
    question: '「I have (　) been to Kyoto.（わたしは {一度|いちど}も {京都|きょうと}に {行|い}った ことが ない）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'never', validationMode: 'exact',
    hints: ['{経験|けいけん}を {表|あらわ}す {現在完了形|げんざいかんりょうけい}の {否定|ひてい}。', '「{一度|いちど}も〜ない」という {意味|いみ}の {副詞|ふくし}。'],
    explanation: '「have never＋{過去分詞|かこぶんし}」で「{一度|いちど}も〜した ことが ない」という {意味|いみ}に なります。',
    reviewed: false
  },
  {
    id: 'english_g9_relative_001', subject: 'english', gradeLevel: 9, unit: 'relative',
    difficulty: 'standard', answerType: 'input',
    question: '「This is the boy (　) plays soccer well.（こちらは サッカーが {上手|じょうず}な {少年|しょうねん}です）」の（　）に {入|はい}る {関係代名詞|かんけいだいめいし}を 1{語|ご} {書|か}きなさい。',
    answer: 'who', acceptedAnswers: ['that'], validationMode: 'exact',
    hints: ['{先行詞|せんこうし}の the boy は「{人|ひと}」。', '（　）の {後|あと}ろに {動詞|どうし}（plays）が {続|つづ}くので {主格|しゅかく}。'],
    explanation: '{先行詞|せんこうし}が {人|ひと}で、{主格|しゅかく}の {関係代名詞|かんけいだいめいし}なので who を {使|つか}います（that も {使|つか}えます）。',
    reviewed: false
  },
  {
    id: 'english_g9_perfect_003', subject: 'english', gradeLevel: 9, unit: 'perfect',
    difficulty: 'standard', answerType: 'input',
    question: '「I have lived here (　) 2010.（わたしは 2010{年|ねん}から ここに {住|す}んで います）」の（　）に {入|はい}る 1{語|ご}を {書|か}きなさい。',
    answer: 'since', validationMode: 'exact',
    hints: ['「〜から（ずっと）」と {始|はじ}まりの {時点|じてん}を {表|あらわ}す {語|ご}。', '{期間|きかん}（five years など）の ときは for を {使|つか}う。'],
    explanation: '{始|はじ}まりの {時点|じてん}（2010{年|ねん}）を {表|あらわ}すときは since、{期間|きかん}を {表|あらわ}すときは for を {使|つか}います。',
    reviewed: false
  },
  {
    id: 'english_g9_subjunctive_001', subject: 'english', gradeLevel: 9, unit: 'subjunctive',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語|ご}は どれか。「If I (　) a bird, I could fly.」',
    choices: ['were', 'am', 'is', 'be'],
    answer: 'were',
    hints: ['「もし {鳥|とり}なら {飛|と}べるのに」と、{現実|げんじつ}と ちがう ことを {言|い}って いる。', '{仮定法|かていほう}では、{主語|しゅご}が I でも be{動詞|どうし}は ふつう were を {使|つか}う。'],
    explanation: '{現在|げんざい}の {事実|じじつ}と {反対|はんたい}の ことを {言|い}う {仮定法過去|かていほうかこ}では、「If＋{主語|しゅご}＋{過去形|かこけい}, {主語|しゅご}＋could / would＋{動詞|どうし}の {原形|げんけい}」の {形|かたち}に なり、be{動詞|どうし}は ふつう were を {使|つか}います。',
    reviewed: false
  },
  {
    id: 'english_g9_indirect_001', subject: 'english', gradeLevel: 9, unit: 'indirect',
    difficulty: 'standard', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「Do you know where (　)?」（{彼女|かのじょ}が どこに {住|す}んで いるか {知|し}って いますか）',
    choices: ['she lives', 'does she live', 'lives she', 'she does live'],
    answer: 'she lives',
    hints: ['{文|ぶん}の {中|なか}に {疑問文|ぎもんぶん}が {入|はい}る {間接疑問|かんせつぎもん}。', '{間接疑問|かんせつぎもん}では「{疑問詞|ぎもんし}＋{主語|しゅご}＋{動詞|どうし}」の {語順|ごじゅん}に なる。'],
    explanation: '{間接疑問|かんせつぎもん}は「{疑問詞|ぎもんし}＋{主語|しゅご}＋{動詞|どうし}」の {語順|ごじゅん}なので、where she lives と なります。',
    reviewed: false
  },
  {
    id: 'english_g9_participle_001', subject: 'english', gradeLevel: 9, unit: 'participle',
    difficulty: 'advanced', answerType: 'input',
    question: '「The language (　) in Brazil is Portuguese.（ブラジルで {話|はな}されて いる {言語|げんご}は ポルトガル{語|ご}です）」の（　）に、speak を {適切|てきせつ}な {形|かたち}に して {入|い}れなさい。',
    answer: 'spoken', validationMode: 'exact',
    hints: ['「〜される」という {意味|いみ}で {名詞|めいし}を {後|うし}ろから {修飾|しゅうしょく}する。', 'speak − spoke − ？'],
    explanation: '「{話|はな}されて いる」と {受|う}け{身|み}の {意味|いみ}で {名詞|めいし}を {修飾|しゅうしょく}するので、{過去分詞|かこぶんし}の spoken を {使|つか}います。',
    reviewed: false
  },
  {
    id: 'english_g9_infinitive_001', subject: 'english', gradeLevel: 9, unit: 'infinitive',
    difficulty: 'advanced', answerType: 'choice',
    question: '（　）に {入|はい}る {語句|ごく}は どれか。「I don\'t know what (　).」（{何|なに}を すれば よいか わからない）',
    choices: ['to do', 'doing', 'do', 'done'],
    answer: 'to do',
    hints: ['「{疑問詞|ぎもんし}＋to＋{動詞|どうし}の {原形|げんけい}」の {形|かたち}。', 'what to do で「{何|なに}を すれば よいか」。'],
    explanation: '「what to do」は「{何|なに}を すれば よいか（{何|なに}を すべきか）」という {意味|いみ}です。how to 〜（〜の しかた）と {同|おな}じ {形|かたち}です。',
    reviewed: false
  }
);
