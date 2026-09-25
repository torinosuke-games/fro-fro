// 問題データ：国語（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。人が内容を確認したら true にする（ここまでの問題は 2026-09-26 に確認済み）。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// 漢字の読みの問題は、答えの漢字にふりがなが付かないよう、ふりがな辞書（js/texts.js）にない語を選んでいる。
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

  // ===== Lv2（小学2年） =====
  {
    id: 'japanese_g2_vocab_001', subject: 'japanese', gradeLevel: 2, unit: 'vocab',
    difficulty: 'basic', answerType: 'choice',
    question: '「{春|はる}」「{夏|なつ}」「{秋|あき}」と おなじ なかまの ことばは どれかな。',
    choices: ['{冬|ふゆ}', '{朝|あさ}', '{雪|ゆき}', '{北|きた}'],
    answer: '{冬|ふゆ}',
    hints: ['「{春|はる}」「{夏|なつ}」「{秋|あき}」は、1{年|ねん}の なかの なにを あらわす ことば かな。', 'きせつの なまえを さがそう。'],
    explanation: '「{春|はる}」「{夏|なつ}」「{秋|あき}」「{冬|ふゆ}」は、きせつの なまえです。',
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
    id: 'japanese_g4_compound_001', subject: 'japanese', gradeLevel: 4, unit: 'compound',
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

  // ===== Lv5（小学5年） =====
  {
    id: 'japanese_g5_keigo_001', subject: 'japanese', gradeLevel: 5, unit: 'keigo',
    difficulty: 'basic', answerType: 'choice',
    question: '「{先生|せんせい}が いらっしゃる。」の「いらっしゃる」は、どの {種類|しゅるい}の {敬語|けいご}ですか。',
    choices: ['{尊敬語|そんけいご}', '{謙譲語|けんじょうご}', '{丁寧語|ていねいご}', '{敬語|けいご}ではない'],
    answer: '{尊敬語|そんけいご}',
    hints: ['{動作|どうさ}を して いるのは {先生|せんせい}（{目上|めうえ}の {人|ひと}）だね。', '{相手|あいて}の {動作|どうさ}を {高|たか}めて {言|い}う {敬語|けいご}は どれかな。'],
    explanation: '「いらっしゃる」は「{来|く}る・{行|い}く・いる」の {尊敬語|そんけいご}です。{目上|めうえ}の {人|ひと}の {動作|どうさ}を {高|たか}めて {言|い}います。',
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
    question: '「{目的地|もくてきち}に {早|はや}く つく。」の「つく」に あてはまる {漢字|かんじ}は どれかな。',
    choices: ['{着|つ}く', '{付|つ}く', '{就|つ}く', '{突|つ}く'],
    answer: '{着|つ}く',
    hints: ['ある {場所|ばしょ}に たどりつく という {意味|いみ}だね。', '「{到着|とうちゃく}」の「ちゃく」と {同|おな}じ {漢字|かんじ}だよ。'],
    explanation: '{場所|ばしょ}に たどりつく {意味|いみ}の「つく」は「{着|つ}く」です。「{付|つ}く」は くっつく、「{就|つ}く」は {仕事|しごと}や {役目|やくめ}に つく、「{突|つ}く」は つきさす {意味|いみ}です。',
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

  // ===== Lv6（小学6年） =====
  {
    id: 'japanese_g6_compound_001', subject: 'japanese', gradeLevel: 6, unit: 'compound',
    difficulty: 'basic', answerType: 'choice',
    question: '「□{関係|かんけい}」の □に {入|はい}る、{打|う}ち{消|け}しの {意味|いみ}の {漢字|かんじ}は どれかな。',
    choices: ['{無|む}', '{不|ふ}', '{非|ひ}', '{未|み}'],
    answer: '{無|む}',
    hints: ['「かんけいが ない」という {意味|いみ}の ことばに なるよ。', '「{不|ふ}」「{非|ひ}」「{未|み}」を つけた ことばは ないね。'],
    explanation: '「{無関係|むかんけい}」が {正|ただ}しい ことばです。{打|う}ち{消|け}しの {漢字|かんじ}は、「{不|ふ}（{不安|ふあん}）」「{非|ひ}（{非常|ひじょう}）」「{未|み}（{未来|みらい}）」など、つく ことばが {決|き}まって います。',
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

  // ===== Lv7（中学1年） =====
  {
    id: 'japanese_g7_grammar_001', subject: 'japanese', gradeLevel: 7, unit: 'grammar',
    difficulty: 'basic', answerType: 'choice',
    question: '「{静|しず}かな {海|うみ}」の「{静|しず}かな」の {品詞|ひんし}は どれか。',
    choices: ['{形容動詞|けいようどうし}', '{形容詞|けいようし}', '{動詞|どうし}', '{副詞|ふくし}'],
    answer: '{形容動詞|けいようどうし}',
    hints: ['{言|い}い{切|き}りの {形|かたち}（{終止形|しゅうしけい}）に すると どう なるかな。', '{言|い}い{切|き}りが「い」なら {形容詞|けいようし}、「だ」なら {形容動詞|けいようどうし}。'],
    explanation: '「{静|しず}かな」は {言|い}い{切|き}りの {形|かたち}が「{静|しず}かだ」と なるので {形容動詞|けいようどうし}です。',
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
    reviewed: true
  }
);
