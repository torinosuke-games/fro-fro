// 問題データ：理科（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// Lv1〜2 は生活科に相当する内容（季節・生き物・植物・身近な自然）。
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
    reviewed: false
  },
  {
    id: 'science_g1_weather_001', subject: 'science', gradeLevel: 1, unit: 'weather',
    difficulty: 'basic', answerType: 'input',
    question: 'あめが やんだ あと、そらに でる なないろの ながい はしのような ものを なんと いうかな。ひらがなで かこう。',
    answer: 'にじ', acceptedAnswers: ['虹'], validationMode: 'kana-insensitive',
    hints: ['あか・だいだい・きいろ・みどり…と いろが ならんで いるよ。', 'ひらがな 2もじの ことばだよ。'],
    explanation: 'あめの あとに おひさまが でると、そらに「にじ」が みえる ことが あります。',
    reviewed: false
  },
  {
    id: 'science_g1_animal_001', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: 'おたまじゃくしが おおきく なると、なにに なるかな。',
    answer: 'かえる', acceptedAnswers: ['カエル'], validationMode: 'kana-insensitive',
    hints: ['おおきく なると、あしが はえて しっぽが なくなるよ。', 'いけや たんぼで「ケロケロ」と なくよ。'],
    explanation: 'おたまじゃくしは、あしが はえて しっぽが なくなり、「かえる」に なります。',
    reviewed: false
  },
  {
    id: 'science_g1_water_001', subject: 'science', gradeLevel: 1, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: 'ゆきだるまを あたたかい ところに おいて おくと、とけて なにに なるかな。ひらがなで かこう。',
    answer: 'みず', acceptedAnswers: ['水'], validationMode: 'kana-insensitive',
    hints: ['ゆきは つめたい ときに かたまって いるよ。', 'あたたかく なると、ながれる ものに かわるよ。'],
    explanation: 'ゆきや こおりは、あたたかく なると とけて「みず」に なります。',
    reviewed: false
  },
  {
    id: 'science_g1_plant_001', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: 'あさがおを そだてて います。つちが からからに かわいて いたら、なにを あげると よいかな。ひらがなで かこう。',
    answer: 'みず', acceptedAnswers: ['水'], validationMode: 'kana-insensitive',
    hints: ['しょくぶつが いきるのに ひつような ものだよ。', 'じょうろで あげるよ。'],
    explanation: 'つちが かわいて いたら、じょうろで「みず」を あげましょう。',
    reviewed: false
  },
  {
    id: 'science_g1_animal_002', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'standard', answerType: 'choice',
    question: 'だんごむしを そっと さわると、どう なるかな。',
    choices: ['まるく なる', 'とんで にげる', 'おおきな こえで なく', 'いろが かわる'],
    answer: 'まるく なる',
    hints: ['なまえに ヒントが あるよ。', '「だんご」の ような かたちに なるよ。'],
    explanation: 'だんごむしは さわられると、からだを まるめて「だんご」の ような かたちに なり、みを まもります。',
    reviewed: false
  },
  {
    id: 'science_g1_insect_001', subject: 'science', gradeLevel: 1, unit: 'insect',
    difficulty: 'standard', answerType: 'choice',
    question: 'なつに きのみきに とまって、「ミーンミーン」と なく むしは どれかな。',
    choices: ['せみ', 'すずむし', 'こおろぎ', 'ちょう'],
    answer: 'せみ',
    hints: ['すずむしや こおろぎは あきに なく むしだよ。', 'きに とまって おおきな こえで なくよ。'],
    explanation: 'なつに きに とまって なくのは「せみ」です。すずむしや こおろぎは あきの よるに なきます。',
    reviewed: false
  },
  {
    id: 'science_g1_plant_002', subject: 'science', gradeLevel: 1, unit: 'plant',
    difficulty: 'advanced', answerType: 'input',
    question: 'あさがおの めが でて、さいしょに ひらく 2まいの まるい はっぱを なんと いうかな。ひらがなで かこう。',
    answer: 'ふたば', acceptedAnswers: ['双葉', '子葉', 'しよう'], validationMode: 'kana-insensitive',
    hints: ['「2まい」の はっぱ だから、「ふた〇」だよ。', 'あとから でて くる はっぱとは かたちが ちがうよ。'],
    explanation: 'めが でて さいしょに ひらく 2まいの はっぱを「ふたば」と いいます。',
    reviewed: false
  },
  {
    id: 'science_g1_animal_003', subject: 'science', gradeLevel: 1, unit: 'animal',
    difficulty: 'advanced', answerType: 'choice',
    question: 'さむい ふゆの あいだ、かえるは どう して いるかな。',
    choices: ['つちの なかで じっと して ふゆを こす', 'いけで げんきに およぐ', 'みなみの くにへ とんで いく', 'ゆきの うえで あそぶ'],
    answer: 'つちの なかで じっと して ふゆを こす',
    hints: ['ふゆに かえるを みかける ことは あるかな。', 'さむい あいだは ねむった ように して すごすよ。'],
    explanation: 'かえるは ふゆの あいだ、つちの なかなどで じっと して すごします（とうみん）。はるに なると でて きます。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'science_g2_water_001', subject: 'science', gradeLevel: 2, unit: 'water',
    difficulty: 'basic', answerType: 'input',
    question: 'みずを れいとうこに いれて ひえると、なにに なるかな。ひらがなで かこう。',
    answer: 'こおり', acceptedAnswers: ['氷'], validationMode: 'kana-insensitive',
    hints: ['つめたくて かたい ものに なるよ。', 'ジュースに いれて ひやす ものだよ。'],
    explanation: 'みずは つめたく ひやすと、かたい「こおり」に なります。',
    reviewed: false
  },
  {
    id: 'science_g2_animal_001', subject: 'science', gradeLevel: 2, unit: 'animal',
    difficulty: 'standard', answerType: 'input',
    question: 'ザリガニの からだの まえに ついて いる、ものを はさむ「はさみ」は いくつ あるかな。かずで こたえよう。',
    answer: '2', acceptedAnswers: ['2こ', '2つ'], validationMode: 'number',
    hints: ['みぎと ひだりに あるよ。', 'かにの はさみと おなじ かずだよ。'],
    explanation: 'ザリガニの はさみは、みぎと ひだりに 1つずつ、あわせて 2つ あります。',
    reviewed: false
  },
  {
    id: 'science_g2_toy_001', subject: 'science', gradeLevel: 2, unit: 'toy',
    difficulty: 'standard', answerType: 'input',
    question: 'かざぐるまを そとに もって いくと、くるくる まわりました。かざぐるまを まわした ものは なにかな。ひらがなで かこう。',
    answer: 'かぜ', acceptedAnswers: ['風'], validationMode: 'kana-insensitive',
    hints: ['「かざ ぐるま」の なまえに ヒントが あるよ。', 'めには みえないけれど、ふくと きの はっぱが ゆれるよ。'],
    explanation: '「かぜ」が あたると、かざぐるまは まわります。かぜが つよいほど よく まわります。',
    reviewed: false
  },
  {
    id: 'science_g2_insect_001', subject: 'science', gradeLevel: 2, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: 'モンシロチョウの ようちゅう（あおむし）が たべる はっぱは なにかな。かたかなで かこう。（はたけで そだてる やさいだよ）',
    answer: 'キャベツ', acceptedAnswers: ['ブロッコリー', 'アブラナ', 'なのはな', '菜の花', 'ダイコン', 'ハクサイ', 'コマツナ'], validationMode: 'kana-insensitive',
    hints: ['まるくて、はっぱが なんまいも かさなった やさいだよ。', 'とんかつの よこに きざんで そえる ことが あるよ。'],
    explanation: 'あおむしは「キャベツ」など、アブラナの なかまの はっぱを たべて おおきく なります。',
    reviewed: false
  },
  {
    id: 'science_g2_season_001', subject: 'science', gradeLevel: 2, unit: 'season',
    difficulty: 'standard', answerType: 'choice',
    question: 'こうえんで どんぐりが たくさん おちて いるのは、どの きせつかな。',
    choices: ['あき', 'はる', 'なつ', 'ふゆの おわり'],
    answer: 'あき',
    hints: ['はっぱが あかや きいろに なる ころだよ。', 'くりや かきが みのる きせつだよ。'],
    explanation: 'どんぐりは「あき」に みのって おちます。はっぱが いろづく ころです。',
    reviewed: false
  },
  {
    id: 'science_g2_shadow_001', subject: 'science', gradeLevel: 2, unit: 'shadow',
    difficulty: 'standard', answerType: 'choice',
    question: 'はれた ひに そとに たつと、じぶんの かげは どちらがわに できるかな。',
    choices: ['おひさまの はんたいがわ', 'おひさまと おなじ がわ', 'じぶんの まうえ', 'かげは できない'],
    answer: 'おひさまの はんたいがわ',
    hints: ['おひさまの ひかりを じぶんの からだが さえぎるよ。', 'ひかりが とどかない ところに かげが できるよ。'],
    explanation: 'からだが おひさまの ひかりを さえぎるので、かげは おひさまの「はんたいがわ」に できます。',
    reviewed: false
  },
  {
    id: 'science_g2_plant_002', subject: 'science', gradeLevel: 2, unit: 'plant',
    difficulty: 'advanced', answerType: 'input',
    question: 'ひまわりの はなが かれた あと、はなの まんなかに たくさん できる ものは なにかな。ひらがなで かこう。',
    answer: 'たね', acceptedAnswers: ['種'], validationMode: 'kana-insensitive',
    hints: ['つぎの としに まくと、また めが でるよ。', 'ハムスターが よく たべるよ。'],
    explanation: 'ひまわりの はなが かれると、まんなかに たくさんの「たね」が できます。',
    reviewed: false
  },
  {
    id: 'science_g2_insect_002', subject: 'science', gradeLevel: 2, unit: 'insect',
    difficulty: 'advanced', answerType: 'choice',
    question: 'たまごから うまれて、さなぎに ならずに おとなに なる むしは どれかな。',
    choices: ['バッタ', 'チョウ', 'カブトムシ', 'テントウムシ'],
    answer: 'バッタ',
    hints: ['ようちゅうの ときから おとなと にた かたちを して いる むしだよ。', 'くさむらで ぴょんと はねる むしだよ。'],
    explanation: 'バッタは たまご → ようちゅう → せいちゅう と そだち、さなぎに なりません。チョウ・カブトムシ・テントウムシは さなぎに なります。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'science_g3_insect_001', subject: 'science', gradeLevel: 3, unit: 'insect',
    difficulty: 'basic', answerType: 'input',
    question: 'こん{虫|ちゅう}の {体|からだ}は、いくつの {部分|ぶぶん}に {分|わ}かれて いるかな。{数|かず}で {答|こた}えよう。',
    answer: '3', acceptedAnswers: ['3つ'], validationMode: 'number',
    hints: ['{頭|あたま}・むね・…', 'あしが ついて いるのは「むね」だよ。'],
    explanation: 'こん{虫|ちゅう}の {体|からだ}は「{頭|あたま}・むね・はら」の 3つの {部分|ぶぶん}に {分|わ}かれて います。',
    reviewed: false
  },
  {
    id: 'science_g3_insect_002', subject: 'science', gradeLevel: 3, unit: 'insect',
    difficulty: 'standard', answerType: 'input',
    question: 'こん{虫|ちゅう}の あしは {何本|なんぼん}かな。{数|かず}で {答|こた}えよう。',
    answer: '6', acceptedAnswers: ['6本'], validationMode: 'number',
    hints: ['あしは すべて むねに ついて いるよ。', '{左右|さゆう}に 3{本|ぼん}ずつ あるよ。'],
    explanation: 'こん{虫|ちゅう}の あしは、むねに {左右|さゆう} 3{本|ぼん}ずつ、あわせて 6{本|ぽん}です。（クモは あしが 8{本|ほん}なので こん{虫|ちゅう}では ありません）',
    reviewed: false
  },
  {
    id: 'science_g3_plant_001', subject: 'science', gradeLevel: 3, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: '{植物|しょくぶつ}の {体|からだ}で、{土|つち}の {中|なか}に あって {水|みず}を すい{上|あ}げる {部分|ぶぶん}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'ね', acceptedAnswers: ['根'], validationMode: 'kana-insensitive',
    hints: ['{植物|しょくぶつ}の {体|からだ}は「○・くき・{葉|は}」で できて いるよ。', 'ひらがな 1{文字|もじ}だよ。'],
    explanation: '{土|つち}の {中|なか}に あって {水|みず}を すい{上|あ}げるのは「{根|ね}」です。{植物|しょくぶつ}の {体|からだ}は {根|ね}・くき・{葉|は}で できて います。',
    reviewed: false
  },
  {
    id: 'science_g3_magnet_002', subject: 'science', gradeLevel: 3, unit: 'magnet',
    difficulty: 'standard', answerType: 'input',
    question: 'じしゃくの {両|りょう}はしの {極|きょく}は、N{極|きょく}と {何極|なにきょく}かな。',
    answer: 'S極', acceptedAnswers: ['S', 'エス極', 'えすきょく', 'Sきょく'], validationMode: 'kana-insensitive',
    hints: ['アルファベット 1{文字|もじ}だよ。', 'N（North）は {北|きた}。もう{一方|いっぽう}は {南|みなみ}（South）だよ。'],
    explanation: 'じしゃくには N{極|きょく}と「S{極|きょく}」が あります。N{極|きょく}は {北|きた}を、S{極|きょく}は {南|みなみ}を さします。',
    reviewed: false
  },
  {
    id: 'science_g3_magnet_003', subject: 'science', gradeLevel: 3, unit: 'magnet',
    difficulty: 'standard', answerType: 'choice',
    question: 'じしゃくの N{極|きょく}と N{極|きょく}を {近|ちか}づけると、どう なるかな。',
    choices: ['しりぞけ{合|あ}う', '{引|ひ}き{合|あ}う', 'くっついて はなれなくなる', '{何|なに}も おこらない'],
    answer: 'しりぞけ{合|あ}う',
    hints: ['{同|おな}じ {極|きょく}どうしを {近|ちか}づけて いるね。', 'ちがう {極|きょく}どうし（N{極|きょく}と S{極|きょく}）なら {引|ひ}き{合|あ}うよ。'],
    explanation: '{同|おな}じ {極|きょく}どうしは しりぞけ{合|あ}い、ちがう {極|きょく}どうしは {引|ひ}き{合|あ}います。',
    reviewed: false
  },
  {
    id: 'science_g3_sun_001', subject: 'science', gradeLevel: 3, unit: 'sun',
    difficulty: 'standard', answerType: 'choice',
    question: '{朝|あさ}、{太陽|たいよう}が {東|ひがし}の {空|そら}に あるとき、{木|き}の かげは どの {方位|ほうい}に できるかな。',
    choices: ['{西|にし}', '{東|ひがし}', '{南|みなみ}', '{北|きた}'],
    answer: '{西|にし}',
    hints: ['かげは {太陽|たいよう}の {反対|はんたい}がわに できるよ。', '{東|ひがし}の {反対|はんたい}の {方位|ほうい}は どれかな。'],
    explanation: 'かげは {太陽|たいよう}の {反対|はんたい}がわに できます。{太陽|たいよう}が {東|ひがし}に あるとき、かげは {西|にし}に できます。',
    reviewed: false
  },
  {
    id: 'science_g3_electric_001', subject: 'science', gradeLevel: 3, unit: 'electric',
    difficulty: 'advanced', answerType: 'input',
    question: '{鉄|てつ}・{銅|どう}・アルミニウムなど、{電気|でんき}を {通|とお}す ものを まとめて {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'きんぞく', acceptedAnswers: ['金属'], validationMode: 'kana-insensitive',
    hints: ['みがくと ぴかぴか {光|ひか}る ものが {多|おお}いよ。', '「きん」から はじまる ことばだよ。'],
    explanation: '{鉄|てつ}・{銅|どう}・アルミニウムなどを「{金属|きんぞく}」と いいます。{金属|きんぞく}は {電気|でんき}を {通|とお}します。',
    reviewed: false
  },
  {
    id: 'science_g3_sound_001', subject: 'science', gradeLevel: 3, unit: 'sound',
    difficulty: 'advanced', answerType: 'choice',
    question: 'たいこを たたいて {音|おと}が {出|で}て いるとき、たいこの {皮|かわ}は どう なって いるかな。',
    choices: ['ふるえて いる', 'まったく {動|うご}いて いない', 'あたたかく なって いる', 'へこんだ ままに なって いる'],
    answer: 'ふるえて いる',
    hints: ['たいこの {上|うえ}に つぶを のせて たたくと、どう なるかな。', '{音|おと}が {出|で}て いる ものに そっと さわって みよう。'],
    explanation: '{音|おと}が {出|で}て いる ものは ふるえて います。ふるえを {手|て}で おさえると、{音|おと}は {止|と}まります。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'science_g4_water_002', subject: 'science', gradeLevel: 4, unit: 'water',
    difficulty: 'basic', answerType: 'input',
    question: '{水|みず}を {冷|ひ}やして いくと、{何|なん}℃で こおり{始|はじ}めるかな。{数|かず}で {答|こた}えよう。',
    answer: '0', acceptedAnswers: ['0℃', '0度'], validationMode: 'number',
    hints: ['{冬|ふゆ}の {朝|あさ}、{水|みず}たまりが こおって いる ことが あるね。', 'ふっとうする {温度|おんど}は 100℃。こおる {温度|おんど}は…？'],
    explanation: '{水|みず}は 0℃で こおり{始|はじ}めます。{全部|ぜんぶ}が こおるまで、{温度|おんど}は 0℃の まま {変|か}わりません。',
    reviewed: false
  },
  {
    id: 'science_g4_water_003', subject: 'science', gradeLevel: 4, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: '{水|みず}が ふっとうして いるとき、{中|なか}から {出|で}て くる あわの {正体|しょうたい}は {何|なん}かな。ひらがなで {答|こた}えよう。',
    answer: 'すいじょうき', acceptedAnswers: ['水蒸気', '水じょう気'], validationMode: 'kana-insensitive',
    hints: ['あわは {空気|くうき}では ないよ。{水|みず}が すがたを {変|か}えた ものだよ。', '{目|め}に {見|み}えない、{気体|きたい}の {水|みず}の ことだよ。'],
    explanation: 'ふっとうした {水|みず}から {出|で}る あわは、{水|みず}が {気体|きたい}に なった「{水蒸気|すいじょうき}」です。',
    reviewed: false
  },
  {
    id: 'science_g4_body_001', subject: 'science', gradeLevel: 4, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: 'ほねと ほねの つなぎ{目|め}で、{体|からだ}を {曲|ま}げる ことが できる ところを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'かんせつ', acceptedAnswers: ['関節'], validationMode: 'kana-insensitive',
    hints: ['ひじや ひざに あるよ。', '「かん」から はじまる ことばだよ。'],
    explanation: 'ほねと ほねの つなぎ{目|め}で、{曲|ま}げられる ところを「{関節|かんせつ}」と いいます。',
    reviewed: false
  },
  {
    id: 'science_g4_star_001', subject: 'science', gradeLevel: 4, unit: 'star',
    difficulty: 'standard', answerType: 'input',
    question: '{夏|なつ}の {大三角|だいさんかく}を つくる {星|ほし}は、ベガ・アルタイルと、もう1つは {何|なん}かな。カタカナで {答|こた}えよう。',
    answer: 'デネブ', validationMode: 'kana-insensitive',
    hints: ['はくちょう{座|ざ}の {星|ほし}だよ。', '「デ」から はじまる {名前|なまえ}だよ。'],
    explanation: '{夏|なつ}の {大三角|だいさんかく}は、こと{座|ざ}の ベガ、わし{座|ざ}の アルタイル、はくちょう{座|ざ}の「デネブ」で できて います。',
    reviewed: false
  },
  {
    id: 'science_g4_electric_001', subject: 'science', gradeLevel: 4, unit: 'electric',
    difficulty: 'standard', answerType: 'choice',
    question: 'かん{電池|でんち} 2{個|こ}を {直列|ちょくれつ}つなぎに して モーターを {回|まわ}すと、かん{電池|でんち} 1{個|こ}の ときと くらべて どう なるかな。',
    choices: ['{速|はや}く {回|まわ}る', 'おそく {回|まわ}る', '{同|おな}じ {速|はや}さで {回|まわ}る', '{反対|はんたい}{向|む}きに {回|まわ}る'],
    answer: '{速|はや}く {回|まわ}る',
    hints: ['{直列|ちょくれつ}つなぎに すると、{電流|でんりゅう}の {大|おお}きさは どう なるかな。', '{電流|でんりゅう}が {大|おお}きく なると、モーターの {回|まわ}り{方|かた}も {変|か}わるよ。'],
    explanation: 'かん{電池|でんち}を {直列|ちょくれつ}つなぎに すると {電流|でんりゅう}が {大|おお}きく なり、モーターは 1{個|こ}の ときより {速|はや}く {回|まわ}ります。（{並列|へいれつ}つなぎでは、1{個|こ}の ときと ほぼ {同|おな}じです）',
    reviewed: false
  },
  {
    id: 'science_g4_weather_001', subject: 'science', gradeLevel: 4, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: 'よく {晴|は}れた {日|ひ}、1{日|にち}の {中|なか}で {気温|きおん}が いちばん {高|たか}く なるのは いつごろかな。',
    choices: ['{午後|ごご}2{時|じ}ごろ', '{朝|あさ}6{時|じ}ごろ', '{午前|ごぜん}10{時|じ}ごろ', '{夜|よる}8{時|じ}ごろ'],
    answer: '{午後|ごご}2{時|じ}ごろ',
    hints: ['{太陽|たいよう}が いちばん {高|たか}く なるのは {正午|しょうご}ごろ。', '{太陽|たいよう}で {地面|じめん}が あたたまり、その {地面|じめん}が {空気|くうき}を あたためるので、{少|すこ}し おくれるよ。'],
    explanation: '{晴|は}れた {日|ひ}の {気温|きおん}は、{太陽|たいよう}が いちばん {高|たか}く なる {正午|しょうご}より {少|すこ}し おくれて、{午後|ごご}2{時|じ}ごろに いちばん {高|たか}く なります。',
    reviewed: false
  },
  {
    id: 'science_g4_moon_001', subject: 'science', gradeLevel: 4, unit: 'moon',
    difficulty: 'advanced', answerType: 'input',
    question: '{月|つき}は {太陽|たいよう}と {同|おな}じように、{東|ひがし}から のぼり、{南|みなみ}の {空|そら}を {通|とお}って、どの {方位|ほうい}に しずむかな。{漢字|かんじ} 1{文字|もじ}か ひらがなで {答|こた}えよう。',
    answer: '西', acceptedAnswers: ['にし'], validationMode: 'kana-insensitive',
    hints: ['{太陽|たいよう}が しずむ {方位|ほうい}と {同|おな}じだよ。', '{東|ひがし}の {反対|はんたい}の {方位|ほうい}だよ。'],
    explanation: '{月|つき}も {太陽|たいよう}と {同|おな}じように、{東|ひがし}から のぼって {南|みなみ}の {空|そら}を {通|とお}り、{西|にし}に しずみます。',
    reviewed: false
  },
  {
    id: 'science_g4_air_001', subject: 'science', gradeLevel: 4, unit: 'air',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ちゅうしゃ{器|き}に {空気|くうき}と {水|みず}を {半分|はんぶん}ずつ とじこめて ピストンを おしました。おしちぢめられるのは どれかな。',
    choices: ['{空気|くうき}だけ', '{水|みず}だけ', '{空気|くうき}と {水|みず}の {両方|りょうほう}', 'どちらも おしちぢめられない'],
    answer: '{空気|くうき}だけ',
    hints: ['とじこめた {空気|くうき}は、おすと {体積|たいせき}が {小|ちい}さく なるね。', 'とじこめた {水|みず}は、おしても {体積|たいせき}が {変|か}わらないよ。'],
    explanation: 'とじこめた {空気|くうき}は おしちぢめられますが、{水|みず}は おしちぢめられません。だから ちぢむのは {空気|くうき}だけです。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'science_g5_pendulum_001', subject: 'science', gradeLevel: 5, unit: 'pendulum',
    difficulty: 'basic', answerType: 'input',
    question: 'ふりこが 1{往復|おうふく}する {時間|じかん}は、おもりの {重|おも}さ・ふれはば・ふりこの {長|なが}さの うち、どれを {変|か}えると {変|か}わるかな。',
    answer: 'ふりこの長さ', acceptedAnswers: ['長さ', 'ながさ', 'ふりこのながさ'], validationMode: 'kana-insensitive',
    hints: ['{条件|じょうけん}を 1つずつ {変|か}えて {調|しら}べる {実験|じっけん}を {思|おも}い{出|だ}そう。', 'おもりを {重|おも}く しても、ふれはばを {大|おお}きく しても、1{往復|おうふく}の {時間|じかん}は {変|か}わらないよ。'],
    explanation: 'ふりこが 1{往復|おうふく}する {時間|じかん}は、ふりこの {長|なが}さで {決|き}まります。{長|なが}いほど 1{往復|おうふく}の {時間|じかん}は {長|なが}く なります。',
    reviewed: false
  },
  {
    id: 'science_g5_life_001', subject: 'science', gradeLevel: 5, unit: 'life',
    difficulty: 'standard', answerType: 'input',
    question: 'メダカの めすが {産|う}んだ {卵|たまご}（{卵子|らんし}）と、おすが {出|だ}した {精子|せいし}が {結|むす}びつく ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'じゅせい', acceptedAnswers: ['受精'], validationMode: 'kana-insensitive',
    hints: ['{結|むす}びついた {卵|たまご}を「○○{卵|らん}」と いうよ。', '「じゅ」から はじまる ことばだよ。'],
    explanation: '{卵|たまご}と {精子|せいし}が {結|むす}びつく ことを「{受精|じゅせい}」と いい、{受精|じゅせい}した {卵|たまご}を「{受精卵|じゅせいらん}」と いいます。',
    reviewed: false
  },
  {
    id: 'science_g5_electromagnet_001', subject: 'science', gradeLevel: 5, unit: 'electromagnet',
    difficulty: 'standard', answerType: 'input',
    question: '{電磁石|でんじしゃく}を {強|つよ}く するには、{電流|でんりゅう}を {大|おお}きく する ほかに、コイルの {何|なに}を {多|おお}く すれば よいかな。ひらがなで {答|こた}えよう。',
    answer: 'まきすう', acceptedAnswers: ['巻き数', 'まき数', '巻数', 'まく数'], validationMode: 'kana-insensitive',
    hints: ['コイルは {導線|どうせん}を ぐるぐる まいた ものだよ。', 'まいた {回数|かいすう}の ことを {何|なん}と いうかな。'],
    explanation: '{電磁石|でんじしゃく}は、{電流|でんりゅう}を {大|おお}きく したり、コイルの「まき{数|すう}」を {多|おお}く したり すると {強|つよ}く なります。',
    reviewed: false
  },
  {
    id: 'science_g5_river_001', subject: 'science', gradeLevel: 5, unit: 'river',
    difficulty: 'standard', answerType: 'input',
    question: '{川|かわ}が {曲|ま}がって {流|なが}れて いる ところで、{流|なが}れが {速|はや}いのは「{内側|うちがわ}」と「{外側|そとがわ}」の どちらかな。',
    answer: '外側', acceptedAnswers: ['そとがわ'], validationMode: 'kana-insensitive',
    hints: ['{流|なが}れが {速|はや}い {側|がわ}では、{岸|きし}が けずられて がけに なる ことが {多|おお}いよ。', '{流|なが}れが おそい {側|がわ}には、{石|いし}や {砂|すな}が たまって {川原|かわら}が できるよ。'],
    explanation: '{曲|ま}がった ところでは {外側|そとがわ}の {流|なが}れが {速|はや}く、{岸|きし}が けずられて がけに なりやすいです。{内側|うちがわ}は {流|なが}れが おそく、{石|いし}や {砂|すな}が たまって {川原|かわら}が できます。',
    reviewed: false
  },
  {
    id: 'science_g5_dissolve_001', subject: 'science', gradeLevel: 5, unit: 'dissolve',
    difficulty: 'standard', answerType: 'choice',
    question: '{食塩|しょくえん}を とかした {水|みず}（{食塩水|しょくえんすい}）から {食塩|しょくえん}を {取|と}り{出|だ}すには、どう すれば よいかな。',
    choices: ['{水|みず}を {蒸発|じょうはつ}させる', 'ろ{紙|し}で こす', '{冷|ひ}やして こおらせる', 'よく かきまぜる'],
    answer: '{水|みず}を {蒸発|じょうはつ}させる',
    hints: ['とけた {食塩|しょくえん}は、ろ{紙|し}を {通|とお}りぬけて しまうよ。', '{水|みず}だけを なくす {方法|ほうほう}を {考|かんが}えよう。'],
    explanation: '{食塩水|しょくえんすい}を {熱|ねっ}して {水|みず}を {蒸発|じょうはつ}させると、{食塩|しょくえん}が {出|で}て きます。{水|みず}に とけた ものは ろ{紙|し}で こしても {取|と}り{出|だ}せません。',
    reviewed: false
  },
  {
    id: 'science_g5_weather_001', subject: 'science', gradeLevel: 5, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: '{日本|にほん}の {上空|じょうくう}の {雲|くも}は、およそ どの {方位|ほうい}から どの {方位|ほうい}へ {動|うご}くかな。',
    choices: ['{西|にし}から {東|ひがし}へ', '{東|ひがし}から {西|にし}へ', '{南|みなみ}から {北|きた}へ', '{北|きた}から {南|みなみ}へ'],
    answer: '{西|にし}から {東|ひがし}へ',
    hints: ['{天気|てんき}は、{雲|くも}の {動|うご}きに ともなって {変|か}わって いくよ。', '「{夕焼|ゆうや}けの {次|つぎ}の {日|ひ}は {晴|は}れ」という ことわざは、{西|にし}の {空|そら}の ようすを {見|み}て いるよ。'],
    explanation: '{日本|にほん}の {上空|じょうくう}には {西|にし}から {東|ひがし}へ {強|つよ}い {風|かぜ}（{偏西風|へんせいふう}）が ふいて いるので、{雲|くも}も {天気|てんき}も およそ {西|にし}から {東|ひがし}へ {変|か}わって いきます。',
    reviewed: false
  },
  {
    id: 'science_g5_dissolve_002', subject: 'science', gradeLevel: 5, unit: 'dissolve',
    difficulty: 'advanced', answerType: 'input',
    question: '{水|みず} 100gに {食塩|しょくえん} 20gを {入|い}れて、{全部|ぜんぶ} とかしました。できた {食塩水|しょくえんすい}の {重|おも}さは {何|なん}gかな。{数|かず}で {答|こた}えよう。',
    answer: '120', acceptedAnswers: ['120g'], validationMode: 'number',
    hints: ['とけて {見|み}えなく なっても、{食塩|しょくえん}は {水|みず}の {中|なか}に あるよ。', '{水|みず}の {重|おも}さと {食塩|しょくえん}の {重|おも}さを たそう。'],
    explanation: 'ものが {水|みず}に とけても、{重|おも}さは なくなりません。100＋20＝120gです。',
    reviewed: false
  },
  {
    id: 'science_g5_plant_002', subject: 'science', gradeLevel: 5, unit: 'plant',
    difficulty: 'advanced', answerType: 'choice',
    question: 'インゲンマメの {子葉|しよう}を {切|き}って ヨウ{素液|そえき}を つけると、{青|あお}むらさき{色|いろ}に {変|か}わりました。{子葉|しよう}に ふくまれて いる {養分|ようぶん}は どれかな。',
    choices: ['でんぷん', 'しぼう', 'たんぱく{質|しつ}', '{食塩|しょくえん}'],
    answer: 'でんぷん',
    hints: ['ヨウ{素液|そえき}は、ある {養分|ようぶん}が あると {青|あお}むらさき{色|いろ}に {変|か}わるよ。', 'ごはんや じゃがいもにも たくさん ふくまれて いるよ。'],
    explanation: 'ヨウ{素液|そえき}で {青|あお}むらさき{色|いろ}に {変|か}わるのは「でんぷん」が ある しるしです。{子葉|しよう}の でんぷんは {発芽|はつが}に {使|つか}われます。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'science_g6_combustion_002', subject: 'science', gradeLevel: 6, unit: 'combustion',
    difficulty: 'basic', answerType: 'input',
    question: '{木|き}や {紙|かみ}が {燃|も}えた あと、{空気|くうき}の {中|なか}で {増|ふ}える {気体|きたい}は {何|なん}かな。',
    answer: 'にさんかたんそ', acceptedAnswers: ['二酸化炭素', 'CO2'], validationMode: 'kana-insensitive',
    hints: ['{石灰水|せっかいすい}を {白|しろ}く にごらせる {気体|きたい}だよ。', '{人|ひと}が はく {息|いき}にも {多|おお}く ふくまれて いるよ。'],
    explanation: 'ものが {燃|も}えると {酸素|さんそ}が {使|つか}われて「{二酸化炭素|にさんかたんそ}」が できます。{二酸化炭素|にさんかたんそ}は {石灰水|せっかいすい}を {白|しろ}く にごらせます。',
    reviewed: false
  },
  {
    id: 'science_g6_body_001', subject: 'science', gradeLevel: 6, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '{口|くち}の {中|なか}で、ごはんに ふくまれる でんぷんを {別|べつ}の ものに {変|か}える {消化液|しょうかえき}を {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'だえき', acceptedAnswers: ['唾液', 'だ液'], validationMode: 'kana-insensitive',
    hints: ['{口|くち}の {中|なか}に {出|で}て くる えきだよ。', 'ごはんを よく かむと、あまく {感|かん}じるのは この えきの はたらきだよ。'],
    explanation: '「だ{液|えき}」は でんぷんを {別|べつ}の ものに {変|か}える {消化液|しょうかえき}です。ごはんを よく かむと あまく {感|かん}じるのは このためです。',
    reviewed: false
  },
  {
    id: 'science_g6_plant_001', subject: 'science', gradeLevel: 6, unit: 'plant',
    difficulty: 'standard', answerType: 'input',
    question: '{植物|しょくぶつ}の {体|からだ}の {水|みず}が、おもに {葉|は}から {水蒸気|すいじょうき}と なって {出|で}て いく ことを {何|なん}と いうかな。ひらがなで {答|こた}えよう。',
    answer: 'じょうさん', acceptedAnswers: ['蒸散'], validationMode: 'kana-insensitive',
    hints: ['{葉|は}に ふくろを かぶせて おくと、ふくろの {内側|うちがわ}に {水|みず}てきが つくよ。', '「{蒸|む}す」の {字|じ}が {入|はい}る ことばだよ。'],
    explanation: '{葉|は}の {気孔|きこう}から {水|みず}が {水蒸気|すいじょうき}と なって {出|で}て いく ことを「{蒸散|じょうさん}」と いいます。',
    reviewed: false
  },
  {
    id: 'science_g6_lever_001', subject: 'science', gradeLevel: 6, unit: 'lever',
    difficulty: 'standard', answerType: 'input',
    question: 'てこの {支点|してん}から {左|ひだり}に 20cmの ところに 30gの おもりを つるしました。{支点|してん}から {右|みぎ}に 10cmの ところに {何|なん}gの おもりを つるすと、てこは つり{合|あ}うかな。{数|かず}で {答|こた}えよう。',
    answer: '60', acceptedAnswers: ['60g'], validationMode: 'number',
    hints: ['てこが つり{合|あ}うのは、{左右|さゆう}で「おもりの {重|おも}さ × {支点|してん}からの きょり」が {等|ひと}しい とき。', '{左|ひだり}は 30×20＝600。{右|みぎ}は □×10＝600。'],
    explanation: '{左|ひだり}：30×20＝600。{右|みぎ}：□×10＝600 なので、□＝60。60gの おもりを つるすと つり{合|あ}います。',
    reviewed: false
  },
  {
    id: 'science_g6_gas_001', subject: 'science', gradeLevel: 6, unit: 'gas',
    difficulty: 'standard', answerType: 'choice',
    question: '{石灰水|せっかいすい}に ある {気体|きたい}を ふきこむと、{白|しろ}く にごりました。この {気体|きたい}は どれかな。',
    choices: ['{二酸化炭素|にさんかたんそ}', '{酸素|さんそ}', 'ちっ{素|そ}', '{水素|すいそ}'],
    answer: '{二酸化炭素|にさんかたんそ}',
    hints: ['{人|ひと}が はく {息|いき}を {石灰水|せっかいすい}に ふきこんでも {白|しろ}く にごるよ。', 'ものが {燃|も}えた あとに {増|ふ}える {気体|きたい}だよ。'],
    explanation: '{石灰水|せっかいすい}を {白|しろ}く にごらせるのは {二酸化炭素|にさんかたんそ}です。{二酸化炭素|にさんかたんそ}が あるかを {調|しら}べるのに {使|つか}います。',
    reviewed: false
  },
  {
    id: 'science_g6_solution_001', subject: 'science', gradeLevel: 6, unit: 'solution',
    difficulty: 'standard', answerType: 'choice',
    question: 'うすい {塩酸|えんさん}を リトマス{紙|し}に つけると、どう なるかな。',
    choices: ['{青色|あおいろ}の リトマス{紙|し}が {赤色|あかいろ}に {変|か}わる', '{赤色|あかいろ}の リトマス{紙|し}が {青色|あおいろ}に {変|か}わる', 'どちらの リトマス{紙|し}も {色|いろ}が {変|か}わらない', 'どちらの リトマス{紙|し}も {白|しろ}く なる'],
    answer: '{青色|あおいろ}の リトマス{紙|し}が {赤色|あかいろ}に {変|か}わる',
    hints: ['{塩酸|えんさん}は {酸性|さんせい}の {水溶液|すいようえき}だよ。', '{酸性|さんせい}は「{青|あお}→{赤|あか}」、アルカリ{性|せい}は「{赤|あか}→{青|あお}」。'],
    explanation: '{塩酸|えんさん}は {酸性|さんせい}なので、{青色|あおいろ}の リトマス{紙|し}を {赤色|あかいろ}に {変|か}えます。アルカリ{性|せい}の {水溶液|すいようえき}は {赤色|あかいろ}の リトマス{紙|し}を {青色|あおいろ}に {変|か}えます。',
    reviewed: false
  },
  {
    id: 'science_g6_earth_001', subject: 'science', gradeLevel: 6, unit: 'earth',
    difficulty: 'advanced', answerType: 'input',
    question: '{地層|ちそう}の {中|なか}で、つぶの {大|おお}きさが 2mm{以上|いじょう}の「れき」が おし{固|かた}められて できた {岩石|がんせき}を {何|なん}と いうかな。',
    answer: 'れき岩', acceptedAnswers: ['れきがん', '礫岩'], validationMode: 'kana-insensitive',
    hints: ['{砂|すな}が {固|かた}まった {岩石|がんせき}は「{砂岩|さがん}」、どろが {固|かた}まった {岩石|がんせき}は「でい{岩|がん}」。', '「れき」＋「{岩|がん}」だよ。'],
    explanation: 'れきが {固|かた}まって できた {岩石|がんせき}は「れき{岩|がん}」です。{砂|すな}なら {砂岩|さがん}、どろなら でい{岩|がん}に なります。',
    reviewed: false
  },
  {
    id: 'science_g6_moon_001', subject: 'science', gradeLevel: 6, unit: 'moon',
    difficulty: 'advanced', answerType: 'choice',
    question: '{月|つき}が {満月|まんげつ}に {見|み}えるとき、{月|つき}は {地球|ちきゅう}から {見|み}て どの {位置|いち}に あるかな。',
    choices: ['{太陽|たいよう}と {反対|はんたい}の {方向|ほうこう}', '{太陽|たいよう}と {同|おな}じ {方向|ほうこう}', '{太陽|たいよう}から {見|み}て {真横|まよこ}', '{地球|ちきゅう}の {真|ま}うら{側|がわ}の {地下|ちか}'],
    answer: '{太陽|たいよう}と {反対|はんたい}の {方向|ほうこう}',
    hints: ['{月|つき}は {太陽|たいよう}の {光|ひかり}を {反射|はんしゃ}して {光|ひか}って いるよ。', '{地球|ちきゅう}から {見|み}て、{月|つき}の {光|ひか}って いる {面|めん}が {全部|ぜんぶ} {見|み}えるのは どんな とき かな。'],
    explanation: '{満月|まんげつ}は、{地球|ちきゅう}から {見|み}て {月|つき}が {太陽|たいよう}と {反対|はんたい}の {方向|ほうこう}に あり、{太陽|たいよう}に {照|て}らされた {面|めん}が {全部|ぜんぶ} {見|み}えるときです。{夕方|ゆうがた}に {東|ひがし}から のぼります。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'science_g7_matter_001', subject: 'science', gradeLevel: 7, unit: 'matter',
    difficulty: 'basic', answerType: 'input',
    question: '{質量|しつりょう}が 54g、{体積|たいせき}が 20cm³の {金属|きんぞく}の {密度|みつど}は {何|なん}g/cm³か。{数|かず}で {答|こた}えなさい。',
    answer: '2.7', validationMode: 'number',
    hints: ['{密度|みつど}＝{質量|しつりょう}÷{体積|たいせき}', '54÷20 を {計算|けいさん}する。'],
    explanation: '{密度|みつど}＝{質量|しつりょう}÷{体積|たいせき}＝54÷20＝2.7g/cm³ です。（アルミニウムの {密度|みつど}に {近|ちか}い {値|あたい}です）',
    reviewed: false
  },
  {
    id: 'science_g7_earthquake_001', subject: 'science', gradeLevel: 7, unit: 'earthquake',
    difficulty: 'standard', answerType: 'input',
    question: '{地震|じしん}の ゆれで、はじめに {来|く}る {小|ちい}さな ゆれ（{初期微動|しょきびどう}）を {伝|つた}える {波|なみ}を {何|なん}と いうか。',
    answer: 'P波', acceptedAnswers: ['P'], validationMode: 'exact',
    hints: ['{伝|つた}わる {速|はや}さが {速|はや}い {波|なみ}の ほう。', 'あとから {来|く}る {大|おお}きな ゆれ（{主要動|しゅようどう}）を {伝|つた}えるのは S{波|は}。'],
    explanation: '{初期微動|しょきびどう}を {伝|つた}えるのは {速|はや}い「P{波|は}」、{主要動|しゅようどう}を {伝|つた}えるのは おそい「S{波|は}」です。',
    reviewed: false
  },
  {
    id: 'science_g7_light_001', subject: 'science', gradeLevel: 7, unit: 'light',
    difficulty: 'standard', answerType: 'input',
    question: '{鏡|かがみ}に {光|ひかり}を あてたところ、{入射角|にゅうしゃかく}は 30°でした。{反射角|はんしゃかく}は {何度|なんど}か。{数|かず}で {答|こた}えなさい。',
    answer: '30', acceptedAnswers: ['30°', '30度'], validationMode: 'number',
    hints: ['{光|ひかり}の {反射|はんしゃ}の {法則|ほうそく}を {思|おも}い{出|だ}そう。', '{入射角|にゅうしゃかく}と {反射角|はんしゃかく}の {関係|かんけい}は？'],
    explanation: '{光|ひかり}が {反射|はんしゃ}するとき、{入射角|にゅうしゃかく}と {反射角|はんしゃかく}は {等|ひと}しく なります（{反射|はんしゃ}の {法則|ほうそく}）。{反射角|はんしゃかく}は 30°です。',
    reviewed: false
  },
  {
    id: 'science_g7_matter_002', subject: 'science', gradeLevel: 7, unit: 'matter',
    difficulty: 'standard', answerType: 'input',
    question: '{物質|ぶっしつ}が {固体|こたい}から {液体|えきたい}に {変|か}わる ときの {温度|おんど}を {何|なん}と いうか。ひらがなか {漢字|かんじ}で {答|こた}えなさい。',
    answer: 'ゆうてん', acceptedAnswers: ['融点'], validationMode: 'kana-insensitive',
    hints: ['{液体|えきたい}が {沸騰|ふっとう}する {温度|おんど}は「{沸点|ふってん}」。', '「とける」という {意味|いみ}の {漢字|かんじ}を {使|つか}う。'],
    explanation: '{固体|こたい}が とけて {液体|えきたい}に なる {温度|おんど}を「{融点|ゆうてん}」と いいます。{水|みず}の {融点|ゆうてん}は 0℃です。',
    reviewed: false
  },
  {
    id: 'science_g7_gas_001', subject: 'science', gradeLevel: 7, unit: 'gas',
    difficulty: 'standard', answerType: 'choice',
    question: '{酸素|さんそ}の {性質|せいしつ}として {正|ただ}しいものは どれか。',
    choices: ['ものを {燃|も}やす はたらきが ある', '{石灰水|せっかいすい}を {白|しろ}く にごらせる', '{水|みず}に よく とけ、その {水溶液|すいようえき}は アルカリ{性|せい}', '{空気|くうき}より {軽|かる}く、{火|ひ}を つけると {音|おと}を たてて {燃|も}える'],
    answer: 'ものを {燃|も}やす はたらきが ある',
    hints: ['{火|ひ}の ついた {線香|せんこう}を {酸素|さんそ}の {中|なか}に {入|い}れると どう なるか。', 'ほかの {選択肢|せんたくし}は、{二酸化炭素|にさんかたんそ}・アンモニア・{水素|すいそ}の {性質|せいしつ}。'],
    explanation: '{酸素|さんそ}には ものを {燃|も}やす はたらき（{助燃性|じょねんせい}）が あります。{石灰水|せっかいすい}を にごらせるのは {二酸化炭素|にさんかたんそ}、アルカリ{性|せい}の {水溶液|すいようえき}に なるのは アンモニア、{音|おと}を たてて {燃|も}えるのは {水素|すいそ}です。',
    reviewed: false
  },
  {
    id: 'science_g7_volcano_001', subject: 'science', gradeLevel: 7, unit: 'volcano',
    difficulty: 'standard', answerType: 'choice',
    question: 'ねばりけが {強|つよ}い マグマで できた {火山|かざん}の {特徴|とくちょう}として {正|ただ}しいものは どれか。',
    choices: ['もり{上|あ}がった ドーム{状|じょう}の {形|かたち}で、{白|しろ}っぽい {岩石|がんせき}が {多|おお}い', 'うすく {広|ひろ}がった {形|かたち}で、{黒|くろ}っぽい {岩石|がんせき}が {多|おお}い', 'うすく {広|ひろ}がった {形|かたち}で、{白|しろ}っぽい {岩石|がんせき}が {多|おお}い', 'もり{上|あ}がった ドーム{状|じょう}の {形|かたち}で、{黒|くろ}っぽい {岩石|がんせき}が {多|おお}い'],
    answer: 'もり{上|あ}がった ドーム{状|じょう}の {形|かたち}で、{白|しろ}っぽい {岩石|がんせき}が {多|おお}い',
    hints: ['ねばりけが {強|つよ}いと、{溶岩|ようがん}は {流|なが}れにくい。', 'ねばりけが {強|つよ}い マグマには {白|しろ}っぽい {鉱物|こうぶつ}が {多|おお}く ふくまれる。'],
    explanation: 'ねばりけが {強|つよ}い マグマは {流|なが}れにくいので、もり{上|あ}がった ドーム{状|じょう}の {火山|かざん}を つくり、{白|しろ}っぽい {岩石|がんせき}に なります（{例|れい}：{昭和新山|しょうわしんざん}）。ねばりけが {弱|よわ}いと、うすく {広|ひろ}がった {形|かたち}で {黒|くろ}っぽく なります。',
    reviewed: false
  },
  {
    id: 'science_g7_force_001', subject: 'science', gradeLevel: 7, unit: 'force',
    difficulty: 'advanced', answerType: 'input',
    question: '1Nの {力|ちから}で {引|ひ}くと 2cm のびる ばねが あります。このばねを 3Nの {力|ちから}で {引|ひ}くと、{何|なん}cm のびるか。{数|かず}で {答|こた}えなさい。',
    answer: '6', acceptedAnswers: ['6cm'], validationMode: 'number',
    hints: ['ばねの のびは、{引|ひ}く {力|ちから}の {大|おお}きさに {比例|ひれい}する（フックの {法則|ほうそく}）。', '{力|ちから}が 3{倍|ばい}に なると、のびも 3{倍|ばい}。'],
    explanation: 'ばねの のびは {力|ちから}の {大|おお}きさに {比例|ひれい}します（フックの {法則|ほうそく}）。{力|ちから}が 3{倍|ばい}なので、のびは 2×3＝6cm です。',
    reviewed: false
  },
  {
    id: 'science_g7_solution_001', subject: 'science', gradeLevel: 7, unit: 'solution',
    difficulty: 'advanced', answerType: 'choice',
    question: '{水|みず} 90gに {食塩|しょくえん} 10gを とかした {食塩水|しょくえんすい}の {質量|しつりょう}パーセント{濃度|のうど}は どれか。',
    choices: ['10％', '11％', '9％', '90％'],
    answer: '10％',
    hints: ['{質量|しつりょう}パーセント{濃度|のうど}＝{溶質|ようしつ}の {質量|しつりょう}÷{溶液|ようえき}の {質量|しつりょう}×100', '{溶液|ようえき}の {質量|しつりょう}は、{水|みず}と {食塩|しょくえん}の {合計|ごうけい}。'],
    explanation: '{溶液|ようえき}の {質量|しつりょう}は 90＋10＝100g。10÷100×100＝10％ です。（10÷90 と しないよう {注意|ちゅうい}）',
    reviewed: false
  },

  // ===== Lv8（中学2年） =====
  {
    id: 'science_g8_electrolysis_001', subject: 'science', gradeLevel: 8, unit: 'electrolysis',
    difficulty: 'basic', answerType: 'choice',
    question: '{水|みず}を {電気分解|でんきぶんかい}したとき、{陰極|いんきょく}に {発生|はっせい}する {気体|きたい}は どれか。',
    choices: ['{水素|すいそ}', '{酸素|さんそ}', '{二酸化炭素|にさんかたんそ}', 'ちっ{素|そ}'],
    answer: '{水素|すいそ}',
    hints: ['{陰極|いんきょく}には、{陽極|ようきょく}の {約|やく}2{倍|ばい}の {体積|たいせき}の {気体|きたい}が {発生|はっせい}する。', 'マッチの {火|ひ}を {近|ちか}づけると ポンと {音|おと}を たてて {燃|も}える {気体|きたい}。'],
    explanation: '{水|みず}を {電気分解|でんきぶんかい}すると、{陰極|いんきょく}に {水素|すいそ}、{陽極|ようきょく}に {酸素|さんそ}が {発生|はっせい}します。{体積|たいせき}の {比|ひ}は {水素|すいそ}：{酸素|さんそ}＝2：1 です。',
    reviewed: false
  },
  {
    id: 'science_g8_atom_001', subject: 'science', gradeLevel: 8, unit: 'atom',
    difficulty: 'basic', answerType: 'input',
    question: '{水|みず}の {化学式|かがくしき}を {書|か}きなさい。（{数字|すうじ}は {小|ちい}さく しなくて よい）',
    answer: 'H2O', validationMode: 'exact',
    hints: ['{水|みず}の {分子|ぶんし}は、{水素原子|すいそげんし}と {酸素原子|さんそげんし}で できて いる。', '{水素原子|すいそげんし} 2{個|こ}と {酸素原子|さんそげんし} 1{個|こ}。'],
    explanation: '{水|みず}の {分子|ぶんし}は {水素原子|すいそげんし}（H）2{個|こ}と {酸素原子|さんそげんし}（O）1{個|こ}で できて いるので、H₂O と {表|あらわ}します。',
    reviewed: false
  },
  {
    id: 'science_g8_electric_001', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'standard', answerType: 'input',
    question: '{抵抗|ていこう}が 2Ωの {電熱線|でんねつせん}に 6Vの {電圧|でんあつ}を {加|くわ}えると、{何|なん}Aの {電流|でんりゅう}が {流|なが}れるか。{数|かず}で {答|こた}えなさい。',
    answer: '3', acceptedAnswers: ['3A'], validationMode: 'number',
    hints: ['オームの {法則|ほうそく}：{電圧|でんあつ}＝{抵抗|ていこう}×{電流|でんりゅう}', '{電流|でんりゅう}＝{電圧|でんあつ}÷{抵抗|ていこう}'],
    explanation: 'オームの {法則|ほうそく}より、{電流|でんりゅう}＝{電圧|でんあつ}÷{抵抗|ていこう}＝6÷2＝3A です。',
    reviewed: false
  },
  {
    id: 'science_g8_reaction_001', subject: 'science', gradeLevel: 8, unit: 'reaction',
    difficulty: 'standard', answerType: 'input',
    question: '{銅|どう}の {粉末|ふんまつ} 4.0gを {十分|じゅうぶん}に {加熱|かねつ}したところ、すべて {酸化銅|さんかどう}に なり、{質量|しつりょう}は 5.0gに なった。{銅|どう}と {結|むす}びついた {酸素|さんそ}は {何|なん}gか。{数|かず}で {答|こた}えなさい。',
    answer: '1', acceptedAnswers: ['1g', '1.0g'], validationMode: 'number',
    hints: ['{増|ふ}えた {質量|しつりょう}は、{結|むす}びついた {酸素|さんそ}の {質量|しつりょう}。', '5.0−4.0 を {計算|けいさん}する。'],
    explanation: '{加熱後|かねつご}に {増|ふ}えた {質量|しつりょう}が {結|むす}びついた {酸素|さんそ}の {質量|しつりょう}です。5.0−4.0＝1.0g。（{銅|どう}：{酸素|さんそ}＝4：1 の {質量|しつりょう}の {比|ひ}で {結|むす}びつきます）',
    reviewed: false
  },
  {
    id: 'science_g8_body_001', subject: 'science', gradeLevel: 8, unit: 'body',
    difficulty: 'standard', answerType: 'input',
    question: '{血液|けつえき}の {成分|せいぶん}のうち、ヘモグロビンを ふくみ、{酸素|さんそ}を {運|はこ}ぶ はたらきを する ものを {何|なん}と いうか。',
    answer: 'せっけっきゅう', acceptedAnswers: ['赤血球'], validationMode: 'kana-insensitive',
    hints: ['{血液|けつえき}の {固形成分|こけいせいぶん}には、{赤血球|せっけっきゅう}・{白血球|はっけっきゅう}・{血小板|けっしょうばん}が ある。', '{血液|けつえき}が {赤|あか}く {見|み}えるのは この {成分|せいぶん}の ため。'],
    explanation: '{酸素|さんそ}を {運|はこ}ぶのは「{赤血球|せっけっきゅう}」です。ふくまれる ヘモグロビンが、{酸素|さんそ}の {多|おお}い ところで {酸素|さんそ}と {結|むす}びつき、{少|すく}ない ところで {酸素|さんそ}を はなします。',
    reviewed: false
  },
  {
    id: 'science_g8_weather_001', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'standard', answerType: 'choice',
    question: '{寒冷前線|かんれいぜんせん}が {通過|つうか}した あとの {天気|てんき}の {変化|へんか}として {正|ただ}しいものは どれか。',
    choices: ['{気温|きおん}が {下|さ}がり、{北寄|きたよ}りの {風|かぜ}に {変|か}わる', '{気温|きおん}が {上|あ}がり、{南寄|みなみよ}りの {風|かぜ}に {変|か}わる', '{気温|きおん}が {上|あ}がり、{北寄|きたよ}りの {風|かぜ}に {変|か}わる', '{気温|きおん}も {風向|かざむ}きも {変|か}わらない'],
    answer: '{気温|きおん}が {下|さ}がり、{北寄|きたよ}りの {風|かぜ}に {変|か}わる',
    hints: ['{寒冷前線|かんれいぜんせん}は、{寒気|かんき}が {暖気|だんき}の {下|した}に もぐりこんで {進|すす}む {前線|ぜんせん}。', '{通過|つうか}した あとは、{寒気|かんき}に おおわれる。'],
    explanation: '{寒冷前線|かんれいぜんせん}が {通過|つうか}すると、{寒気|かんき}に おおわれるので {気温|きおん}が {下|さ}がり、{風向|かざむ}きは {南寄|みなみよ}りから {北寄|きたよ}りに {変|か}わります。{通過|つうか}するときは、せまい {範囲|はんい}に {強|つよ}い {雨|あめ}が {短時間|たんじかん}ふります。',
    reviewed: false
  },
  {
    id: 'science_g8_cell_001', subject: 'science', gradeLevel: 8, unit: 'cell',
    difficulty: 'standard', answerType: 'choice',
    question: '{植物|しょくぶつ}の {細胞|さいぼう}には あるが、{動物|どうぶつ}の {細胞|さいぼう}には ない つくりは どれか。',
    choices: ['{細胞壁|さいぼうへき}', '{核|かく}', '{細胞膜|さいぼうまく}', '{細胞質|さいぼうしつ}'],
    answer: '{細胞壁|さいぼうへき}',
    hints: ['{植物|しょくぶつ}の {体|からだ}を ささえる、じょうぶな つくり。', '{核|かく}と {細胞膜|さいぼうまく}は、{植物|しょくぶつ}にも {動物|どうぶつ}にも ある。'],
    explanation: '{細胞壁|さいぼうへき}は {植物|しょくぶつ}の {細胞|さいぼう}だけに あります。ほかに {葉緑体|ようりょくたい}や {発達|はったつ}した {液胞|えきほう}も {植物|しょくぶつ}の {細胞|さいぼう}の {特徴|とくちょう}です。',
    reviewed: false
  },
  {
    id: 'science_g8_weather_002', subject: 'science', gradeLevel: 8, unit: 'weather',
    difficulty: 'advanced', answerType: 'input',
    question: '{気温|きおん} 20℃の {部屋|へや}の {空気|くうき} 1m³に、8.65gの {水蒸気|すいじょうき}が ふくまれて いる。20℃の {飽和水蒸気量|ほうわすいじょうきりょう}を 17.3g/m³と すると、この {部屋|へや}の {湿度|しつど}は {何|なん}％か。{数|かず}で {答|こた}えなさい。',
    answer: '50', acceptedAnswers: ['50%'], validationMode: 'number',
    hints: ['{湿度|しつど}（％）＝{空気|くうき}1m³{中|ちゅう}の {水蒸気量|すいじょうきりょう}÷その {気温|きおん}での {飽和水蒸気量|ほうわすいじょうきりょう}×100', '8.65÷17.3 を {計算|けいさん}する。'],
    explanation: '{湿度|しつど}＝8.65÷17.3×100＝50％ です。',
    reviewed: false
  },
  {
    id: 'science_g8_electric_002', subject: 'science', gradeLevel: 8, unit: 'electric',
    difficulty: 'advanced', answerType: 'choice',
    question: '{消費電力|しょうひでんりょく} 1200Wの ストーブを 30{分間|ふんかん} {使|つか}った。{使|つか}った {電力量|でんりょくりょう}は どれか。',
    choices: ['600Wh', '36000Wh', '2400Wh', '40Wh'],
    answer: '600Wh',
    hints: ['{電力量|でんりょくりょう}（Wh）＝{電力|でんりょく}（W）×{時間|じかん}（h）', '30{分|ぷん}は {何時間|なんじかん}か。'],
    explanation: '30{分|ぷん}＝0.5{時間|じかん}なので、1200×0.5＝600Wh です。（ジュールで {表|あらわ}すと 1200×1800＝2160000J）',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'science_g9_motion_001', subject: 'science', gradeLevel: 9, unit: 'motion',
    difficulty: 'basic', answerType: 'input',
    question: 'そりが 120mの {距離|きょり}を 8{秒|びょう}で {進|すす}んだ。このそりの {平均|へいきん}の {速|はや}さは {何|なん}m/sか。{数|かず}で {答|こた}えなさい。',
    answer: '15', acceptedAnswers: ['15m/s'], validationMode: 'number',
    hints: ['{速|はや}さ＝{移動|いどう}した {距離|きょり}÷かかった {時間|じかん}', '120÷8 を {計算|けいさん}する。'],
    explanation: '{速|はや}さ＝120÷8＝15m/s です。',
    reviewed: false
  },
  {
    id: 'science_g9_heredity_001', subject: 'science', gradeLevel: 9, unit: 'heredity',
    difficulty: 'standard', answerType: 'input',
    question: 'エンドウの {種子|しゅし}の {形|かたち}で、{丸|まる}（{顕性|けんせい}）の {遺伝子|いでんし}を A、しわ（{潜性|せんせい}）の {遺伝子|いでんし}を a と する。Aaの {個体|こたい}どうしを かけ{合|あ}わせたとき、できる {種子|しゅし}のうち「しわ」は {全体|ぜんたい}の {何|なん}％か。{数|かず}で {答|こた}えなさい。',
    answer: '25', acceptedAnswers: ['25%'], validationMode: 'number',
    hints: ['{子|こ}の {遺伝子|いでんし}の {組|く}み{合|あ}わせは AA・Aa・Aa・aa の 4{通|とお}り。', '「しわ」に なるのは aa の ときだけ。'],
    explanation: 'Aa×Aa で できる {子|こ}は AA：Aa：aa＝1：2：1。しわに なるのは aa だけなので、4つの うち 1つ、25％ です（{丸|まる}：しわ＝3：1）。',
    reviewed: false
  },
  {
    id: 'science_g9_energy_001', subject: 'science', gradeLevel: 9, unit: 'energy',
    difficulty: 'standard', answerType: 'input',
    question: '{重|おも}さ 10Nの {荷物|にもつ}を、ゆっくりと 2mの {高|たか}さまで まっすぐ {持|も}ち{上|あ}げた。このとき した {仕事|しごと}は {何|なん}Jか。{数|かず}で {答|こた}えなさい。',
    answer: '20', acceptedAnswers: ['20J'], validationMode: 'number',
    hints: ['{仕事|しごと}（J）＝{力|ちから}の {大|おお}きさ（N）×{力|ちから}の {向|む}きに {動|うご}いた {距離|きょり}（m）', '10×2 を {計算|けいさん}する。'],
    explanation: '{仕事|しごと}＝10N×2m＝20J です。',
    reviewed: false
  },
  {
    id: 'science_g9_astronomy_001', subject: 'science', gradeLevel: 9, unit: 'astronomy',
    difficulty: 'standard', answerType: 'input',
    question: '{地球|ちきゅう}の {自転|じてん}に よって、{太陽|たいよう}や {星|ほし}が 1{日|にち}に 1{回|かい}、{東|ひがし}から {西|にし}へ {動|うご}いて {見|み}える {見|み}かけの {動|うご}きを {何|なん}と いうか。',
    answer: 'にっしゅううんどう', acceptedAnswers: ['日周運動'], validationMode: 'kana-insensitive',
    hints: ['{地球|ちきゅう}の {公転|こうてん}に よる {見|み}かけの {動|うご}きは「{年周運動|ねんしゅううんどう}」。', '「1{日|にち}で 1{周|しゅう}する {運動|うんどう}」という {意味|いみ}の ことば。'],
    explanation: '{地球|ちきゅう}の {自転|じてん}に よる {天体|てんたい}の {見|み}かけの {動|うご}きを「{日周運動|にっしゅううんどう}」と いいます。{公転|こうてん}に よるものは「{年周運動|ねんしゅううんどう}」です。',
    reviewed: false
  },
  {
    id: 'science_g9_energy_002', subject: 'science', gradeLevel: 9, unit: 'energy',
    difficulty: 'standard', answerType: 'choice',
    question: 'まさつや {空気|くうき}の {抵抗|ていこう}が ないとき、{位置|いち}エネルギーと {運動|うんどう}エネルギーの {和|わ}は {一定|いってい}に {保|たも}たれる。この {和|わ}を {何|なん}と いうか。',
    choices: ['{力学的|りきがくてき}エネルギー', '{熱|ねつ}エネルギー', '{電気|でんき}エネルギー', '{化学|かがく}エネルギー'],
    answer: '{力学的|りきがくてき}エネルギー',
    hints: ['ふりこや ジェットコースターの {運動|うんどう}で {考|かんが}える エネルギー。', '「{力学的|りきがくてき}エネルギーの {保存|ほぞん}」という {言葉|ことば}が ある。'],
    explanation: '{位置|いち}エネルギーと {運動|うんどう}エネルギーの {和|わ}を {力学的|りきがくてき}エネルギーと いい、まさつなどが なければ {一定|いってい}に {保|たも}たれます（{力学的|りきがくてき}エネルギーの {保存|ほぞん}）。',
    reviewed: false
  },
  {
    id: 'science_g9_ecology_001', subject: 'science', gradeLevel: 9, unit: 'ecology',
    difficulty: 'standard', answerType: 'choice',
    question: '{生態系|せいたいけい}の {中|なか}で「{生産者|せいさんしゃ}」に あたる {生物|せいぶつ}は どれか。',
    choices: ['{植物|しょくぶつ}', '{草食動物|そうしょくどうぶつ}', '{肉食動物|にくしょくどうぶつ}', '{菌類|きんるい}・{細菌類|さいきんるい}'],
    answer: '{植物|しょくぶつ}',
    hints: ['{光合成|こうごうせい}に よって、{無機物|むきぶつ}から {有機物|ゆうきぶつ}を つくり{出|だ}す {生物|せいぶつ}。', '{動物|どうぶつ}は ほかの {生物|せいぶつ}を {食|た}べる「{消費者|しょうひしゃ}」。'],
    explanation: '{光合成|こうごうせい}で {有機物|ゆうきぶつ}を つくる {植物|しょくぶつ}が「{生産者|せいさんしゃ}」です。{動物|どうぶつ}は「{消費者|しょうひしゃ}」、{菌類|きんるい}・{細菌類|さいきんるい}は {死骸|しがい}などを {分解|ぶんかい}する「{分解者|ぶんかいしゃ}」です。',
    reviewed: false
  },
  {
    id: 'science_g9_battery_001', subject: 'science', gradeLevel: 9, unit: 'battery',
    difficulty: 'advanced', answerType: 'input',
    question: 'ダニエル{電池|でんち}で、{亜鉛板|あえんばん}と {銅板|どうばん}の うち −{極|きょく}に なる {金属|きんぞく}は どちらか。{金属|きんぞく}の {名前|なまえ}で {答|こた}えなさい。',
    answer: '亜鉛', acceptedAnswers: ['あえん', 'Zn', '亜鉛板', 'あえんばん'], validationMode: 'kana-insensitive',
    hints: ['イオンに なりやすい {金属|きんぞく}が {電子|でんし}を {放出|ほうしゅつ}して −{極|きょく}に なる。', '{亜鉛|あえん}と {銅|どう}では、{亜鉛|あえん}の ほうが イオンに なりやすい。'],
    explanation: 'イオンに なりやすい {亜鉛|あえん}が {電子|でんし}を {放出|ほうしゅつ}して {亜鉛|あえん}イオンに なるので、{亜鉛板|あえんばん}が −{極|きょく}です。{電子|でんし}は {導線|どうせん}を {通|とお}って {銅板|どうばん}（＋{極|きょく}）へ {移動|いどう}します。',
    reviewed: false
  },
  {
    id: 'science_g9_force_001', subject: 'science', gradeLevel: 9, unit: 'force',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ばねばかりに つるした {物体|ぶったい}の {重|おも}さは、{空気中|くうきちゅう}で 5.0N、{全体|ぜんたい}を {水中|すいちゅう}に しずめると 3.0Nだった。この {物体|ぶったい}に はたらく {浮力|ふりょく}は どれか。',
    choices: ['2.0N', '8.0N', '3.0N', '5.0N'],
    answer: '2.0N',
    hints: ['{浮力|ふりょく}は、{水中|すいちゅう}で {物体|ぶったい}を {上向|うわむ}きに おす {力|ちから}。', '{空気中|くうきちゅう}と {水中|すいちゅう}の ばねばかりの {値|あたい}の {差|さ}を {考|かんが}える。'],
    explanation: '{浮力|ふりょく}＝{空気中|くうきちゅう}の {値|あたい}−{水中|すいちゅう}の {値|あたい}＝5.0−3.0＝2.0N です。',
    reviewed: false
  }
);
