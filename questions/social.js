// 問題データ：社会（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。
// 各学年9問：基礎2（4択1・自由入力1）、標準5（自由入力3・4択2）、発展2（自由入力1・4択1）。
// Lv1〜2 は生活科に相当する内容（安全・まちの人や場所・行事）。
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
    reviewed: false
  },
  {
    id: 'social_g1_school_001', subject: 'social', gradeLevel: 1, unit: 'school',
    difficulty: 'basic', answerType: 'input',
    question: 'がっこうで、ほんを よんだり かりたり できる へやを なんと いうかな。ひらがなで かこう。',
    answer: 'としょしつ', acceptedAnswers: ['図書室'], validationMode: 'kana-insensitive',
    hints: ['ほんが たくさん ならんで いる へやだよ。', '「としょ〇〇」だよ。'],
    explanation: 'ほんを よんだり かりたり できる へやは「としょしつ」です。しずかに つかいましょう。',
    reviewed: false
  },
  {
    id: 'social_g1_town_001', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'まちの こうばんに いて、みちあんないを したり、こまった ひとを たすけたり する ひとを なんと よぶかな。ひらがなで かこう。',
    answer: 'おまわりさん', acceptedAnswers: ['けいさつかん', '警察官', 'けいかん', '警官'], validationMode: 'kana-insensitive',
    hints: ['まちを「おまわり」して まもって くれる ひとだよ。', '「お」から はじまる よびかただよ。'],
    explanation: 'こうばんには「おまわりさん（けいさつかん）」が いて、まちの あんぜんを まもって います。',
    reviewed: false
  },
  {
    id: 'social_g1_town_002', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'かじの とき、しょうぼうしゃで かけつけて ひを けして くれる ひとを なんと いうかな。ひらがなで かこう。',
    answer: 'しょうぼうし', acceptedAnswers: ['消防士', 'しょうぼうたいいん', '消防隊員', 'しょうぼうかん', '消防官'], validationMode: 'kana-insensitive',
    hints: ['あかい くるまに のって くるよ。', '「しょうぼう〇」だよ。'],
    explanation: 'かじの ひを けして くれるのは「しょうぼうし」です。けがや びょうきの ひとを はこぶ きゅうきゅうたいも しょうぼうしょに います。',
    reviewed: false
  },
  {
    id: 'social_g1_event_001', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: '1がつの はじめに、あたらしい としを むかえて おいわいする ことを なんと いうかな。ひらがなで かこう。',
    answer: 'おしょうがつ', acceptedAnswers: ['しょうがつ', 'お正月', '正月'], validationMode: 'kana-insensitive',
    hints: ['おせちりょうりを たべたり、おとしだまを もらったり するよ。', '「おしょう〇〇」だよ。'],
    explanation: '1がつの はじめに あたらしい としを いわう ことを「おしょうがつ」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g1_town_003', subject: 'social', gradeLevel: 1, unit: 'town',
    difficulty: 'standard', answerType: 'choice',
    question: 'みんなで つかう こうえんで、して よい ことは どれかな。',
    choices: ['じゅんばんを まもって あそぶ', 'ごみを おいて かえる', 'さいて いる はなを とって かえる', 'ブランコを ずっと ひとりじめする'],
    answer: 'じゅんばんを まもって あそぶ',
    hints: ['こうえんは みんなの ばしょだよ。', 'ほかの ひとが こまる ことは しないように しよう。'],
    explanation: 'こうえんは みんなで つかう ばしょです。じゅんばんを まもり、ごみは もちかえりましょう。',
    reviewed: false
  },
  {
    id: 'social_g1_safety_002', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'standard', answerType: 'choice',
    question: 'じけんや じこを みて、けいさつに でんわを する ときの ばんごうは どれかな。',
    choices: ['110ばん', '119ばん', '117ばん', '100ばん'],
    answer: '110ばん',
    hints: ['「ひゃくとおばん」と よぶ ことが あるよ。', '119ばんは かじや きゅうきゅうしゃの ばんごうだよ。'],
    explanation: 'けいさつへの でんわは「110ばん」です。かじや きゅうきゅうしゃを よぶ ときは「119ばん」です。',
    reviewed: false
  },
  {
    id: 'social_g1_safety_003', subject: 'social', gradeLevel: 1, unit: 'safety',
    difficulty: 'advanced', answerType: 'input',
    question: 'かじの ときや、きゅうきゅうしゃを よぶ ときに かける でんわばんごうは なんばんかな。すうじで かこう。',
    answer: '119', acceptedAnswers: ['119ばん'], validationMode: 'number',
    hints: ['けいさつは 110ばん。こちらは さいごの かずが ちがうよ。', 'しょうぼうしょに つながる ばんごうだよ。'],
    explanation: 'かじや きゅうきゅうしゃは「119ばん」です。けいさつは「110ばん」です。',
    reviewed: false
  },
  {
    id: 'social_g1_event_002', subject: 'social', gradeLevel: 1, unit: 'event',
    difficulty: 'advanced', answerType: 'choice',
    question: '7がつ 7かに、ねがいごとを かいた たんざくを ささに かざる ぎょうじは どれかな。',
    choices: ['たなばた', 'ひなまつり', 'こどもの ひ', 'せつぶん'],
    answer: 'たなばた',
    hints: ['おりひめと ひこぼしの おはなしが あるよ。', 'よぞらの あまのがわに かんけいが あるよ。'],
    explanation: '7がつ 7かの「たなばた」には、ねがいごとを かいた たんざくを ささに かざります。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g2_town_002', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'basic', answerType: 'input',
    question: 'てがみや はがきを だす ときに いれる、みちに ある あかい はこを なんと いうかな。かたかなで かこう。',
    answer: 'ポスト', validationMode: 'kana-insensitive',
    hints: ['ゆうびんきょくの ひとが なかの てがみを あつめに くるよ。', 'かたかな 3もじだよ。'],
    explanation: 'てがみや はがきは「ポスト」に いれると、ゆうびんきょくの ひとが とどけて くれます。',
    reviewed: false
  },
  {
    id: 'social_g2_event_001', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: 'はるが はじまる ひ（りっしゅん）の まえの ひに、「おには そと、ふくは うち」と いって まめを まく ぎょうじを なんと いうかな。ひらがなで かこう。',
    answer: 'せつぶん', acceptedAnswers: ['節分'], validationMode: 'kana-insensitive',
    hints: ['おにの おめんを つかう ことが あるよ。', '「せつ〇〇」だよ。'],
    explanation: 'りっしゅんの まえの ひ（2がつの はじめごろ）の「せつぶん」には、まめを まいて わるい ものを おいはらいます。',
    reviewed: false
  },
  {
    id: 'social_g2_town_003', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'standard', answerType: 'input',
    question: 'でんしゃに のったり おりたり する ところを なんと いうかな。ひらがなで かこう。',
    answer: 'えき', acceptedAnswers: ['駅'], validationMode: 'kana-insensitive',
    hints: ['きっぷを かったり、かいさつを とおったり するよ。', 'ひらがな 2もじだよ。'],
    explanation: 'でんしゃに のったり おりたり する ところは「えき」です。',
    reviewed: false
  },
  {
    id: 'social_g2_event_002', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'standard', answerType: 'input',
    question: '3がつ 3かに、おひなさまを かざって、おんなのこの せいちょうを いわう ぎょうじを なんと いうかな。ひらがなで かこう。',
    answer: 'ひなまつり', acceptedAnswers: ['ひな祭り', '雛祭り', 'もものせっく', '桃の節句'], validationMode: 'kana-insensitive',
    hints: ['ひしもちや ひなあられを たべるよ。', '「ひな〇〇〇」だよ。'],
    explanation: '3がつ 3かは「ひなまつり（もものせっく）」です。おひなさまを かざって、おんなのこの せいちょうを いわいます。',
    reviewed: false
  },
  {
    id: 'social_g2_safety_001', subject: 'social', gradeLevel: 2, unit: 'safety',
    difficulty: 'standard', answerType: 'choice',
    question: 'みちで、ひとが あるく ために くるまの みちと わけられて いる ところを なんと いうかな。',
    choices: ['ほどう', 'しゃどう', 'せんろ', 'かわら'],
    answer: 'ほどう',
    hints: ['「ほ」は あるく ことを あらわす ことばだよ。', 'くるまが はしる ところは「しゃどう」だよ。'],
    explanation: 'ひとが あるく ところは「ほどう」、くるまが はしる ところは「しゃどう」です。',
    reviewed: false
  },
  {
    id: 'social_g2_town_004', subject: 'social', gradeLevel: 2, unit: 'town',
    difficulty: 'standard', answerType: 'choice',
    question: 'としょかんで ほんを かりたら、どう すれば よいかな。',
    choices: ['きめられた ひまでに かえす', 'ずっと じぶんの ものに する', 'ともだちに あげる', 'すきな ページを きりとる'],
    answer: 'きめられた ひまでに かえす',
    hints: ['としょかんの ほんは みんなの ものだよ。', 'つぎに よみたい ひとが まって いるかも しれないよ。'],
    explanation: 'としょかんの ほんは みんなの ものです。たいせつに よんで、きめられた ひまでに かえしましょう。',
    reviewed: false
  },
  {
    id: 'social_g2_event_003', subject: 'social', gradeLevel: 2, unit: 'event',
    difficulty: 'advanced', answerType: 'input',
    question: '5がつ 5かの「こどもの ひ」に そとに かざる、さかなの かたちの のぼりを なんと いうかな。ひらがなで かこう。',
    answer: 'こいのぼり', acceptedAnswers: ['鯉のぼり'], validationMode: 'kana-insensitive',
    hints: ['かぜに のって そらを およぐように みえるよ。', '「こい」という さかなだよ。'],
    explanation: '「こどもの ひ」には、こどもが げんきに そだつように ねがって「こいのぼり」を かざります。',
    reviewed: false
  },
  {
    id: 'social_g2_map_001', subject: 'social', gradeLevel: 2, unit: 'map',
    difficulty: 'advanced', answerType: 'choice',
    question: 'ちずでは、ふつう うえが どの ほうがくに なって いるかな。',
    choices: ['きた', 'みなみ', 'ひがし', 'にし'],
    answer: 'きた',
    hints: ['ほうがくは「きた・みなみ・ひがし・にし」の 4つだよ。', 'おひさまが のぼる ひがしは、ちずの みぎがわだよ。'],
    explanation: 'ちずは ふつう、うえが「きた」、したが みなみ、みぎが ひがし、ひだりが にしに なって います。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g3_direction_001', subject: 'social', gradeLevel: 3, unit: 'direction',
    difficulty: 'basic', answerType: 'input',
    question: '{東|ひがし}・{西|にし}・{南|みなみ}・{北|きた}の うち、{太陽|たいよう}が のぼる {方位|ほうい}は どれかな。',
    answer: '東', acceptedAnswers: ['ひがし'], validationMode: 'kana-insensitive',
    hints: ['{太陽|たいよう}は {朝|あさ}に のぼって、{夕方|ゆうがた}に しずむよ。', '{地図|ちず}では {右|みぎ}がわの {方位|ほうい}だよ。'],
    explanation: '{太陽|たいよう}は「{東|ひがし}」から のぼり、{南|みなみ}の {空|そら}を {通|とお}って、{西|にし}に しずみます。',
    reviewed: false
  },
  {
    id: 'social_g3_direction_002', subject: 'social', gradeLevel: 3, unit: 'direction',
    difficulty: 'standard', answerType: 'input',
    question: '{八方位|はちほうい}で、{北|きた}と {東|ひがし}の ちょうど あいだの {方位|ほうい}を {何|なん}と いうかな。',
    answer: '北東', acceptedAnswers: ['ほくとう'], validationMode: 'kana-insensitive',
    hints: ['{北|きた}と {南|みなみ}を {先|さき}に {言|い}う きまりが あるよ。', '「{北|きた}」＋「{東|ひがし}」だよ。'],
    explanation: '{北|きた}と {東|ひがし}の あいだは「{北東|ほくとう}」です。{八方位|はちほうい}は {北|きた}・{北東|ほくとう}・{東|ひがし}・{南東|なんとう}・{南|みなみ}・{南西|なんせい}・{西|にし}・{北西|ほくせい}です。',
    reviewed: false
  },
  {
    id: 'social_g3_mapsymbol_002', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'standard', answerType: 'input',
    question: '{地図記号|ちずきごう}の「卍」は、どんな {建物|たてもの}を あらわして いるかな。ひらがなで {答|こた}えよう。',
    answer: 'てら', acceptedAnswers: ['寺', 'おてら', 'お寺', 'じいん', '寺院'], validationMode: 'kana-insensitive',
    hints: ['お{坊|ぼう}さんが いる ところだよ。', '{神社|じんじゃ}の {記号|きごう}は {鳥居|とりい}の {形|かたち}。こちらは…？'],
    explanation: '「卍」は「{寺|てら}（{寺院|じいん}）」の {地図記号|ちずきごう}です。{神社|じんじゃ}は {鳥居|とりい}の {形|かたち}の {記号|きごう}です。',
    reviewed: false
  },
  {
    id: 'social_g3_store_001', subject: 'social', gradeLevel: 3, unit: 'store',
    difficulty: 'standard', answerType: 'input',
    question: 'スーパーマーケットで、{商品|しょうひん}の バーコードを {読|よ}み{取|と}って ねだんを {計算|けいさん}し、お{金|かね}を はらう ところを {何|なん}と いうかな。カタカナで {答|こた}えよう。',
    answer: 'レジ', acceptedAnswers: ['レジスター'], validationMode: 'kana-insensitive',
    hints: ['{買|か}い{物|もの}の {最後|さいご}に ならぶ ところだよ。', 'カタカナ 2{文字|もじ}だよ。'],
    explanation: 'ねだんを {計算|けいさん}して お{金|かね}を はらう ところを「レジ」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g3_mapsymbol_003', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'standard', answerType: 'choice',
    question: '「Y」のような {形|かたち}の {地図記号|ちずきごう}は、{何|なに}を あらわして いるかな。',
    choices: ['{消防署|しょうぼうしょ}', '{警察署|けいさつしょ}', '{工場|こうじょう}', '{発電所|はつでんしょ}'],
    answer: '{消防署|しょうぼうしょ}',
    hints: ['{昔|むかし}、{火|ひ}を {消|け}すときに {使|つか}った「さすまた」という {道具|どうぐ}の {形|かたち}だよ。', '{火事|かじ}の ときに かけつける ところだよ。'],
    explanation: '「Y」の {形|かたち}は、{昔|むかし}の {火消|ひけ}しの {道具|どうぐ}「さすまた」を もとに した {消防署|しょうぼうしょ}の {地図記号|ちずきごう}です。',
    reviewed: false
  },
  {
    id: 'social_g3_history_001', subject: 'social', gradeLevel: 3, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{昔|むかし}の くらしで、{洗濯|せんたく}を するときに {使|つか}われて いた {道具|どうぐ}は どれかな。',
    choices: ['せんたく{板|いた}', '{七輪|しちりん}', '{湯|ゆ}たんぽ', 'かまど'],
    answer: 'せんたく{板|いた}',
    hints: ['{表面|ひょうめん}が でこぼこに なって いる {板|いた}だよ。', '{七輪|しちりん}や かまどは {料理|りょうり}に、{湯|ゆ}たんぽは {体|からだ}を あたためるのに {使|つか}ったよ。'],
    explanation: 'せんたく{板|いた}の でこぼこに {衣類|いるい}を こすりつけて、{手|て}で {洗濯|せんたく}を して いました。',
    reviewed: false
  },
  {
    id: 'social_g3_tax_001', subject: 'social', gradeLevel: 3, unit: 'tax',
    difficulty: 'advanced', answerType: 'input',
    question: 'お{店|みせ}で {品物|しなもの}を {買|か}うときに、{品物|しなもの}の ねだんに {上乗|うわの}せして はらう {税金|ぜいきん}を {何|なん}と いうかな。',
    answer: '消費税', acceptedAnswers: ['しょうひぜい'], validationMode: 'kana-insensitive',
    hints: ['レシートに「{税|ぜい}」と {書|か}かれて いる ことが あるよ。', 'ものを「{使|つか}う」「{買|か}う」ことを {漢字|かんじ} 2{文字|もじ}で「しょうひ」と いうよ。'],
    explanation: '{品物|しなもの}を {買|か}うときに はらう {税金|ぜいきん}を「{消費税|しょうひぜい}」と いいます。{集|あつ}めた {税金|ぜいきん}は、{学校|がっこう}や {道路|どうろ}など みんなの ために {使|つか}われます。',
    reviewed: false
  },
  {
    id: 'social_g3_mapsymbol_004', subject: 'social', gradeLevel: 3, unit: 'mapsymbol',
    difficulty: 'advanced', answerType: 'choice',
    question: '{地図記号|ちずきごう}の「〒」を まるで かこんだ {記号|きごう}は、{何|なに}を あらわして いるかな。',
    choices: ['{郵便局|ゆうびんきょく}', '{銀行|ぎんこう}', '{市役所|しやくしょ}', '{神社|じんじゃ}'],
    answer: '{郵便局|ゆうびんきょく}',
    hints: ['「〒」は {郵便番号|ゆうびんばんごう}の {前|まえ}に {書|か}く {記号|きごう}だね。', '{手紙|てがみ}や {荷物|にもつ}を {届|とど}ける {仕事|しごと}を する ところだよ。'],
    explanation: '「〒」を まるで かこんだ {記号|きごう}は {郵便局|ゆうびんきょく}です。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g4_prefecture_002', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'basic', answerType: 'input',
    question: '{日本|にほん}の {都道府県|とどうふけん}で、{面積|めんせき}が いちばん {大|おお}きいのは どこかな。',
    answer: '北海道', acceptedAnswers: ['ほっかいどう'], validationMode: 'kana-insensitive',
    hints: ['{日本|にほん}の いちばん {北|きた}に ある {都道府県|とどうふけん}だよ。', '{都|と}・{道|どう}・{府|ふ}・{県|けん}の うち、「{道|どう}」は ここ だけだよ。'],
    explanation: '{面積|めんせき}が いちばん {大|おお}きいのは「{北海道|ほっかいどう}」で、{日本|にほん}の {面積|めんせき}の {約|やく}5{分|ぶん}の1を しめます。',
    reviewed: false
  },
  {
    id: 'social_g4_prefecture_003', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'standard', answerType: 'input',
    question: '{愛知県|あいちけん}の {県庁所在地|けんちょうしょざいち}（{県庁|けんちょう}の ある {市|し}）は どこかな。',
    answer: '名古屋市', acceptedAnswers: ['名古屋', 'なごや', 'なごやし'], validationMode: 'kana-insensitive',
    hints: ['{中部地方|ちゅうぶちほう}で いちばん {人口|じんこう}が {多|おお}い {市|し}だよ。', '「しゃちほこ」で {有名|ゆうめい}な お{城|しろ}が あるよ。'],
    explanation: '{愛知県|あいちけん}の {県庁所在地|けんちょうしょざいち}は「{名古屋市|なごやし}」です。{県名|けんめい}と {県庁所在地|けんちょうしょざいち}の {名前|なまえ}が ちがう {県|けん}の 1つです。',
    reviewed: false
  },
  {
    id: 'social_g4_water_001', subject: 'social', gradeLevel: 4, unit: 'water',
    difficulty: 'standard', answerType: 'input',
    question: '{川|かわ}や ダムの {水|みず}を きれいに して、{飲|の}める {水|みず}に する {施設|しせつ}を {何|なん}と いうかな。',
    answer: '浄水場', acceptedAnswers: ['じょうすいじょう'], validationMode: 'kana-insensitive',
    hints: ['「きれいに する」という {意味|いみ}の「じょう」が つくよ。', 'よごれた {水|みず}を きれいに して {川|かわ}に もどす {施設|しせつ}は「{下水処理場|げすいしょりじょう}」だよ。'],
    explanation: '{水|みず}を きれいに して {飲|の}める {水|みず}に する {施設|しせつ}は「{浄水場|じょうすいじょう}」です。',
    reviewed: false
  },
  {
    id: 'social_g4_garbage_001', subject: 'social', gradeLevel: 4, unit: 'garbage',
    difficulty: 'standard', answerType: 'input',
    question: 'ペットボトルや かんなどを {資源|しげん}として {集|あつ}め、もう{一度|いちど} {原料|げんりょう}に して {利用|りよう}する ことを {何|なん}と いうかな。カタカナで {答|こた}えよう。',
    answer: 'リサイクル', validationMode: 'kana-insensitive',
    hints: ['「ごみを へらす 3R」の 1つだよ。', '「リ」から はじまる ことばだよ。'],
    explanation: '{資源|しげん}を {原料|げんりょう}に もどして {再|ふたた}び {利用|りよう}する ことを「リサイクル」と いいます。ごみを へらす 3Rは、リデュース（へらす）・リユース（くり{返|かえ}し {使|つか}う）・リサイクルです。',
    reviewed: false
  },
  {
    id: 'social_g4_prefecture_004', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'standard', answerType: 'choice',
    question: '{日本|にほん}の {都道府県|とどうふけん}で、{面積|めんせき}が いちばん {小|ちい}さいのは どこかな。',
    choices: ['{香川県|かがわけん}', '{大阪府|おおさかふ}', '{東京都|とうきょうと}', '{沖縄県|おきなわけん}'],
    answer: '{香川県|かがわけん}',
    hints: ['{四国|しこく}{地方|ちほう}に ある {県|けん}だよ。', 'うどんで {有名|ゆうめい}な {県|けん}だよ。'],
    explanation: '{面積|めんせき}が いちばん {小|ちい}さいのは {四国|しこく}の「{香川県|かがわけん}」です。2{番目|ばんめ}に {小|ちい}さいのは {大阪府|おおさかふ}です。',
    reviewed: false
  },
  {
    id: 'social_g4_disaster_001', subject: 'social', gradeLevel: 4, unit: 'disaster',
    difficulty: 'standard', answerType: 'choice',
    question: '{地震|じしん}や {大雨|おおあめ}などの {災害|さいがい}に そなえて、{危険|きけん}な {場所|ばしょ}や ひなん{場所|ばしょ}を しめした {地図|ちず}を {何|なん}と いうかな。',
    choices: ['ハザードマップ', 'ガイドマップ', '{路線図|ろせんず}', '{天気図|てんきず}'],
    answer: 'ハザードマップ',
    hints: ['「ハザード」は {英語|えいご}で「{危険|きけん}」という {意味|いみ}だよ。', '{市|し}や {町|まち}が つくって、{家|いえ}に くばって いる ことが {多|おお}いよ。'],
    explanation: '{災害|さいがい}の ときの {危険|きけん}な {場所|ばしょ}や ひなん{場所|ばしょ}を しめした {地図|ちず}を「ハザードマップ」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g4_geography_001', subject: 'social', gradeLevel: 4, unit: 'geography',
    difficulty: 'advanced', answerType: 'input',
    question: '{日本|にほん}で いちばん {長|なが}い {川|かわ}は {何|なん}という {川|かわ}かな。',
    answer: '信濃川', acceptedAnswers: ['しなのがわ', '信濃'], validationMode: 'kana-insensitive',
    hints: ['{長野県|ながのけん}から {新潟県|にいがたけん}を {流|なが}れて、{日本海|にほんかい}に そそぐよ。', '{長野県|ながのけん}の {昔|むかし}の {国|くに}の {名前|なまえ}「しなの」が ついて いるよ。'],
    explanation: '{日本|にほん}で いちばん {長|なが}い {川|かわ}は「{信濃川|しなのがわ}」（{約|やく}367km）です。{長野県|ながのけん}では「{千曲川|ちくまがわ}」と よばれます。',
    reviewed: false
  },
  {
    id: 'social_g4_prefecture_005', subject: 'social', gradeLevel: 4, unit: 'prefecture',
    difficulty: 'advanced', answerType: 'choice',
    question: '{次|つぎ}の うち、{海|うみ}に {面|めん}して いない {県|けん}は どれかな。',
    choices: ['{奈良県|ならけん}', '{和歌山県|わかやまけん}', '{三重県|みえけん}', '{京都府|きょうとふ}'],
    answer: '{奈良県|ならけん}',
    hints: ['{近畿地方|きんきちほう}の {内陸|ないりく}に ある {県|けん}だよ。', '{大仏|だいぶつ}や しかで {有名|ゆうめい}な {県|けん}だよ。'],
    explanation: '{奈良県|ならけん}は {海|うみ}に {面|めん}して いない {内陸県|ないりくけん}です。{京都府|きょうとふ}は {北|きた}がわが {日本海|にほんかい}に {面|めん}して います。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g5_geography_001', subject: 'social', gradeLevel: 5, unit: 'geography',
    difficulty: 'basic', answerType: 'input',
    question: '{日本|にほん}で いちばん {高|たか}い {山|やま}は {何|なん}かな。',
    answer: '富士山', acceptedAnswers: ['ふじさん', '富士'], validationMode: 'kana-insensitive',
    hints: ['{静岡県|しずおかけん}と {山梨県|やまなしけん}に またがって いるよ。', '{高|たか}さは 3776mだよ。'],
    explanation: '{日本|にほん}で いちばん {高|たか}い {山|やま}は「{富士山|ふじさん}」（3776m）です。{世界文化遺産|せかいぶんかいさん}にも {登録|とうろく}されて います。',
    reviewed: false
  },
  {
    id: 'social_g5_agriculture_001', subject: 'social', gradeLevel: 5, unit: 'agriculture',
    difficulty: 'standard', answerType: 'input',
    question: '2023{年|ねん}の {統計|とうけい}で、{米|こめ}の {生産量|せいさんりょう}が {日本|にほん}で いちばん {多|おお}い {都道府県|とどうふけん}は どこかな。（{県|けん}の {名前|なまえ}で {答|こた}えよう）',
    answer: '新潟県', acceptedAnswers: ['新潟', 'にいがた', 'にいがたけん'], validationMode: 'kana-insensitive',
    hints: ['{日本海側|にほんかいがわ}に ある {県|けん}で、{信濃川|しなのがわ}が {流|なが}れて いるよ。', '「コシヒカリ」の {産地|さんち}として {有名|ゆうめい}だよ。'],
    explanation: '2023{年|ねん}の {統計|とうけい}では、{米|こめ}の {生産量|せいさんりょう}が いちばん {多|おお}いのは「{新潟県|にいがたけん}」で、2{番目|ばんめ}は {北海道|ほっかいどう}です。{順位|じゅんい}は {年|とし}に よって {変|か}わる ことが あります。',
    reviewed: false
  },
  {
    id: 'social_g5_industry_001', subject: 'social', gradeLevel: 5, unit: 'industry',
    difficulty: 'standard', answerType: 'input',
    question: '{愛知県|あいちけん}を {中心|ちゅうしん}に {広|ひろ}がり、{自動車|じどうしゃ}などの {機械工業|きかいこうぎょう}が さかんな {工業地帯|こうぎょうちたい}を {何|なん}と いうかな。',
    answer: '中京工業地帯', acceptedAnswers: ['中京', 'ちゅうきょう', 'ちゅうきょうこうぎょうちたい'], validationMode: 'kana-insensitive',
    hints: ['{名古屋|なごや}は、{東京|とうきょう}と {京都|きょうと}の あいだに ある {都市|とし}として「○○」と よばれたよ。', '「ちゅうきょう」から はじまるよ。'],
    explanation: '{愛知県|あいちけん}を {中心|ちゅうしん}と する「{中京工業地帯|ちゅうきょうこうぎょうちたい}」は、2019{年|ねん}の {統計|とうけい}で {工業生産額|こうぎょうせいさんがく}が {日本|にほん}で いちばん {多|おお}い {工業地帯|こうぎょうちたい}です。',
    reviewed: false
  },
  {
    id: 'social_g5_trade_001', subject: 'social', gradeLevel: 5, unit: 'trade',
    difficulty: 'standard', answerType: 'input',
    question: '{外国|がいこく}から {品物|しなもの}を {買|か}い{入|い}れる ことを {何|なん}と いうかな。{漢字|かんじ}2{文字|もじ}か ひらがなで {答|こた}えよう。',
    answer: '輸入', acceptedAnswers: ['ゆにゅう'], validationMode: 'kana-insensitive',
    hints: ['{外国|がいこく}へ {品物|しなもの}を {売|う}る ことは「{輸出|ゆしゅつ}」だよ。', '{国|くに}の「{中|なか}に {入|い}れる」ことだよ。'],
    explanation: '{外国|がいこく}から {品物|しなもの}を {買|か}い{入|い}れる ことを「{輸入|ゆにゅう}」、{外国|がいこく}へ {売|う}る ことを「{輸出|ゆしゅつ}」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g5_climate_001', subject: 'social', gradeLevel: 5, unit: 'climate',
    difficulty: 'standard', answerType: 'choice',
    question: '{冬|ふゆ}に {北西|ほくせい}から ふく {季節風|きせつふう}の えいきょうで、{雪|ゆき}が {多|おお}く ふる {地域|ちいき}は どれかな。',
    choices: ['{日本海側|にほんかいがわ}', '{太平洋側|たいへいようがわ}', '{瀬戸内|せとうち}', '{南西諸島|なんせいしょとう}'],
    answer: '{日本海側|にほんかいがわ}',
    hints: ['{北西|ほくせい}の {季節風|きせつふう}は、{海|うみ}の {上|うえ}で しめり{気|け}を ふくむよ。', 'しめった {風|かぜ}が {山地|さんち}に ぶつかって、{雪|ゆき}を ふらせるよ。'],
    explanation: '{冬|ふゆ}の {北西|ほくせい}の {季節風|きせつふう}は {日本海|にほんかい}で しめり{気|け}を ふくみ、{山地|さんち}に ぶつかって {日本海側|にほんかいがわ}に {雪|ゆき}を ふらせます。{山|やま}を こえた {太平洋側|たいへいようがわ}は かわいた {晴|は}れの {日|ひ}が {多|おお}く なります。',
    reviewed: false
  },
  {
    id: 'social_g5_environment_001', subject: 'social', gradeLevel: 5, unit: 'environment',
    difficulty: 'standard', answerType: 'choice',
    question: '{四大公害病|よんだいこうがいびょう}の 1つ「{水俣病|みなまたびょう}」の {原因|げんいん}と なった ものは どれかな。',
    choices: ['{工場|こうじょう}から {出|だ}された {有機水銀|ゆうきすいぎん}', '{鉱山|こうざん}から {出|だ}された カドミウム', '{工場|こうじょう}の けむりに ふくまれる {亜硫酸|ありゅうさん}ガス', '{自動車|じどうしゃ}の {排気|はいき}ガス'],
    answer: '{工場|こうじょう}から {出|だ}された {有機水銀|ゆうきすいぎん}',
    hints: ['{熊本県|くまもとけん}の {水俣湾|みなまたわん}で {発生|はっせい}したよ。', '{海|うみ}に {流|なが}された ものが {魚|さかな}や {貝|かい}に たまり、それを {食|た}べた {人|ひと}が {病気|びょうき}に なったよ。'],
    explanation: '{水俣病|みなまたびょう}は、{工場|こうじょう}から {海|うみ}に {流|なが}された {有機水銀|ゆうきすいぎん}（メチル{水銀|すいぎん}）が {原因|げんいん}です。カドミウムは イタイイタイ{病|びょう}、{亜硫酸|ありゅうさん}ガスは {四日市|よっかいち}ぜんそくの {原因|げんいん}です。',
    reviewed: false
  },
  {
    id: 'social_g5_fishery_001', subject: 'social', gradeLevel: 5, unit: 'fishery',
    difficulty: 'advanced', answerType: 'input',
    question: '{魚|さかな}や {貝|かい}を、いけすなどで {大|おお}きく なるまで {育|そだ}ててから とる {漁業|ぎょぎょう}を {何|なん}と いうかな。',
    answer: '養殖業', acceptedAnswers: ['養殖', 'ようしょく', 'ようしょくぎょう', '養殖漁業', 'ようしょくぎょぎょう'], validationMode: 'kana-insensitive',
    hints: ['たまごから {育|そだ}てた {稚魚|ちぎょ}を {川|かわ}や {海|うみ}に {放|はな}す のは「さいばい{漁業|ぎょぎょう}」だよ。', 'こちらは とるまで ずっと {人|ひと}が {育|そだ}てるよ。「よう」から はじまるよ。'],
    explanation: 'いけすなどで {大|おお}きく なるまで {育|そだ}てて とる {漁業|ぎょぎょう}を「{養殖業|ようしょくぎょう}」と いいます。{稚魚|ちぎょ}を {放流|ほうりゅう}して {大|おお}きく なってから とるのは「さいばい{漁業|ぎょぎょう}」です。',
    reviewed: false
  },
  {
    id: 'social_g5_agriculture_002', subject: 'social', gradeLevel: 5, unit: 'agriculture',
    difficulty: 'advanced', answerType: 'choice',
    question: '2022{年度|ねんど}の {統計|とうけい}で、{次|つぎ}の {食料|しょくりょう}の うち {日本|にほん}の {食料自給率|しょくりょうじきゅうりつ}（{国内|こくない}で まかなえる {割合|わりあい}）が いちばん {低|ひく}いのは どれかな。',
    choices: ['{小麦|こむぎ}', '{米|こめ}', '{野菜|やさい}', '{鶏卵|けいらん}'],
    answer: '{小麦|こむぎ}',
    hints: ['パンや めんの {原料|げんりょう}に なる {作物|さくもつ}だよ。', 'アメリカや カナダ、オーストラリアから たくさん {輸入|ゆにゅう}して いるよ。'],
    explanation: '2022{年度|ねんど}の {統計|とうけい}では、{小麦|こむぎ}の {自給率|じきゅうりつ}は 2{割|わり}に {満|み}たず、ほとんどを {輸入|ゆにゅう}に たよって います。{米|こめ}は ほぼ 100％、{鶏卵|けいらん}は 90％{以上|いじょう}、{野菜|やさい}は {約|やく}8{割|わり}です。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g6_history_001', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'basic', answerType: 'input',
    question: '{聖徳太子|しょうとくたいし}が {定|さだ}めた、「{和|わ}を {以|もっ}て {貴|とうと}しと なす」で {始|はじ}まる {役人|やくにん}の {心|こころ}がまえを しめした きまりを {何|なん}と いうかな。',
    answer: '十七条の憲法', acceptedAnswers: ['十七条憲法', 'じゅうしちじょうのけんぽう', 'じゅうしちじょうけんぽう'], validationMode: 'kana-insensitive',
    hints: ['{条文|じょうぶん}の {数|かず}が {名前|なまえ}に ついて いるよ。', '「○○{条|じょう}の {憲法|けんぽう}」だよ。'],
    explanation: '{聖徳太子|しょうとくたいし}は「{十七条|じゅうしちじょう}の{憲法|けんぽう}」で、{役人|やくにん}の {心|こころ}がまえを しめしました。',
    reviewed: false
  },
  {
    id: 'social_g6_history_002', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{平氏|へいし}を たおした あと、{鎌倉|かまくら}に {幕府|ばくふ}を ひらき、{征夷大将軍|せいいたいしょうぐん}に なった {人物|じんぶつ}は だれかな。',
    answer: '源頼朝', acceptedAnswers: ['みなもとのよりとも', 'みなもとよりとも'], validationMode: 'kana-insensitive',
    hints: ['{源氏|げんじ}の {中心|ちゅうしん}と なった {人物|じんぶつ}だよ。', '{弟|おとうと}の {源義経|みなもとのよしつね}が {平氏|へいし}との たたかいで かつやくしたよ。'],
    explanation: '「{源頼朝|みなもとのよりとも}」は {鎌倉|かまくら}に {幕府|ばくふ}を ひらき、{武士|ぶし}の {政治|せいじ}を {始|はじ}めました。',
    reviewed: false
  },
  {
    id: 'social_g6_politics_001', subject: 'social', gradeLevel: 6, unit: 'politics',
    difficulty: 'standard', answerType: 'input',
    question: '{国|くに}の {法律|ほうりつ}を つくる ところで、{衆議院|しゅうぎいん}と {参議院|さんぎいん}から なる {機関|きかん}を {何|なん}と いうかな。',
    answer: '国会', acceptedAnswers: ['こっかい'], validationMode: 'kana-insensitive',
    hints: ['{選挙|せんきょ}で えらばれた {議員|ぎいん}が {集|あつ}まる ところだよ。', '{東京|とうきょう}の {永田町|ながたちょう}に {議事堂|ぎじどう}が あるよ。'],
    explanation: '{法律|ほうりつ}を つくるのは「{国会|こっかい}」です。{内閣|ないかく}は {法律|ほうりつ}に もとづいて {政治|せいじ}を {行|おこな}い、{裁判所|さいばんしょ}は {法律|ほうりつ}に もとづいて {裁判|さいばん}を {行|おこな}います。',
    reviewed: false
  },
  {
    id: 'social_g6_history_003', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{関ヶ原|せきがはら}の たたかいに {勝|か}ち、{江戸|えど}に {幕府|ばくふ}を ひらいた {人物|じんぶつ}は だれかな。',
    answer: '徳川家康', acceptedAnswers: ['とくがわいえやす'], validationMode: 'kana-insensitive',
    hints: ['この {人物|じんぶつ}の {家|いえ}が、{約|やく}260{年|ねん} {将軍|しょうぐん}を つとめたよ。', '「とくがわ」から はじまるよ。'],
    explanation: '「{徳川家康|とくがわいえやす}」は 1600{年|ねん}の {関ヶ原|せきがはら}の たたかいに {勝|か}ち、1603{年|ねん}に {江戸幕府|えどばくふ}を ひらきました。',
    reviewed: false
  },
  {
    id: 'social_g6_history_004', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{奈良|なら}の {東大寺|とうだいじ}に {大仏|だいぶつ}を つくらせた {天皇|てんのう}は だれかな。',
    choices: ['{聖武天皇|しょうむてんのう}', '{天智天皇|てんじてんのう}', '{桓武天皇|かんむてんのう}', '{推古天皇|すいこてんのう}'],
    answer: '{聖武天皇|しょうむてんのう}',
    hints: ['{仏教|ぶっきょう}の {力|ちから}で {国|くに}を {守|まも}ろうと した {天皇|てんのう}だよ。', '{全国|ぜんこく}に {国分寺|こくぶんじ}を たてさせたよ。'],
    explanation: '{聖武天皇|しょうむてんのう}は {仏教|ぶっきょう}の {力|ちから}で {国|くに}を {安|やす}らかに しようと、{東大寺|とうだいじ}に {大仏|だいぶつ}を つくらせ、{全国|ぜんこく}に {国分寺|こくぶんじ}を たてさせました。',
    reviewed: false
  },
  {
    id: 'social_g6_history_005', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{縄文時代|じょうもんじだい}の {人々|ひとびと}が、{食|た}べた {貝|かい}の からなどを すてた あとを {何|なん}と いうかな。',
    choices: ['{貝塚|かいづか}', '{古墳|こふん}', '{高床倉庫|たかゆかそうこ}', 'たて{穴住居|あなじゅうきょ}'],
    answer: '{貝塚|かいづか}',
    hints: ['{貝|かい}の からが {積|つ}もって、{小|ちい}さな {山|やま}の ように なったよ。', '「{塚|つか}」は もりあがった ところと いう {意味|いみ}だよ。'],
    explanation: '{貝|かい}の からや {動物|どうぶつ}の ほねなどが すてられた あとを「{貝塚|かいづか}」と いいます。{当時|とうじ}の くらしを {知|し}る {手|て}がかりに なります。',
    reviewed: false
  },
  {
    id: 'social_g6_history_006', subject: 'social', gradeLevel: 6, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '{江戸幕府|えどばくふ}が たおれた あと、{明治|めいじ}の {新|あたら}しい {政府|せいふ}が すすめた、{政治|せいじ}や {社会|しゃかい}の {大|おお}きな {改革|かいかく}を {何|なん}と いうかな。',
    answer: '明治維新', acceptedAnswers: ['めいじいしん'], validationMode: 'kana-insensitive',
    hints: ['「{明治|めいじ}○○」と いうよ。', '{廃藩置県|はいはんちけん}や {学制|がくせい}なども この {改革|かいかく}の 1つだよ。'],
    explanation: '{明治|めいじ}の {新政府|しんせいふ}が すすめた {一連|いちれん}の {改革|かいかく}を「{明治維新|めいじいしん}」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g6_constitution_002', subject: 'social', gradeLevel: 6, unit: 'constitution',
    difficulty: 'advanced', answerType: 'choice',
    question: '{日本国憲法|にほんこくけんぽう}が {公布|こうふ}された {日|ひ}は どれかな。（{今|いま}は {国民|こくみん}の {祝日|しゅくじつ}に なって いる）',
    choices: ['11{月|がつ}3{日|か}（{文化|ぶんか}の{日|ひ}）', '5{月|がつ}3{日|か}（{憲法記念日|けんぽうきねんび}）', '2{月|がつ}11{日|にち}（{建国記念|けんこくきねん}の{日|ひ}）', '4{月|がつ}29{日|にち}（{昭和|しょうわ}の{日|ひ}）'],
    answer: '11{月|がつ}3{日|か}（{文化|ぶんか}の{日|ひ}）',
    hints: ['「{公布|こうふ}」は {国民|こくみん}に {発表|はっぴょう}する こと、「{施行|しこう}」は {実際|じっさい}に {使|つか}い{始|はじ}める こと。', '{施行|しこう}された {日|ひ}は「{憲法記念日|けんぽうきねんび}」。{公布|こうふ}は その {半年|はんとし} {前|まえ}だよ。'],
    explanation: '{日本国憲法|にほんこくけんぽう}は 1946{年|ねん}11{月|がつ}3{日|か}に {公布|こうふ}され（{今|いま}の {文化|ぶんか}の{日|ひ}）、1947{年|ねん}5{月|がつ}3{日|か}に {施行|しこう}されました（{今|いま}の {憲法記念日|けんぽうきねんび}）。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g7_world_002', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'basic', answerType: 'input',
    question: '{三大洋|さんたいよう}の うち、もっとも {面積|めんせき}が {広|ひろ}い {海洋|かいよう}を {何|なん}と いうか。',
    answer: '太平洋', acceptedAnswers: ['たいへいよう'], validationMode: 'kana-insensitive',
    hints: ['{三大洋|さんたいよう}は {太平洋|たいへいよう}・{大西洋|たいせいよう}・インド{洋|よう}。', '{日本|にほん}の {東|ひがし}に {広|ひろ}がる {海洋|かいよう}。'],
    explanation: 'もっとも {広|ひろ}い {海洋|かいよう}は「{太平洋|たいへいよう}」で、{地球|ちきゅう}の {表面|ひょうめん}の {約|やく}3{分|ぶん}の1を しめます。',
    reviewed: false
  },
  {
    id: 'social_g7_world_003', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: '{経度|けいど}0{度|ど}の {経線|けいせん}（{本初子午線|ほんしょしごせん}）が {通|とお}る、イギリスの {首都|しゅと}は どこか。',
    answer: 'ロンドン', validationMode: 'kana-insensitive',
    hints: ['{旧|きゅう}グリニッジ{天文台|てんもんだい}が ある {都市|とし}。', 'テムズ{川|がわ}が {流|なが}れる {都市|とし}。'],
    explanation: '{本初子午線|ほんしょしごせん}は、イギリスの {首都|しゅと}「ロンドン」の {旧|きゅう}グリニッジ{天文台|てんもんだい}を {通|とお}ります。',
    reviewed: false
  },
  {
    id: 'social_g7_world_004', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: '{日本|にほん}の {標準時子午線|ひょうじゅんじしごせん}は {東経|とうけい}{何度|なんど}か。{数|かず}で {答|こた}えなさい。',
    answer: '135', acceptedAnswers: ['135度', '東経135度'], validationMode: 'number',
    hints: ['{兵庫県|ひょうごけん}の {明石市|あかしし}を {通|とお}る {経線|けいせん}。', '15の {倍数|ばいすう}に なって いる。'],
    explanation: '{日本|にほん}の {標準時子午線|ひょうじゅんじしごせん}は {兵庫県|ひょうごけん}{明石市|あかしし}を {通|とお}る {東経|とうけい}135{度|ど}の {経線|けいせん}です。',
    reviewed: false
  },
  {
    id: 'social_g7_world_005', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'input',
    question: '{地球|ちきゅう}は 24{時間|じかん}で 360{度|ど} {自転|じてん}する。{経度|けいど}が {何度|なんど} ちがうと、1{時間|じかん}の {時差|じさ}が {生|しょう}じるか。{数|かず}で {答|こた}えなさい。',
    answer: '15', acceptedAnswers: ['15度'], validationMode: 'number',
    hints: ['360{度|ど}を 24{時間|じかん}で わる。', '360÷24 を {計算|けいさん}する。'],
    explanation: '360÷24＝15 なので、{経度|けいど}が 15{度|ど} ちがうと 1{時間|じかん}の {時差|じさ}が {生|しょう}じます。',
    reviewed: false
  },
  {
    id: 'social_g7_history_001', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '645{年|ねん}、{中臣鎌足|なかとみのかまたり}と ともに {蘇我氏|そがし}を たおし、{大化|たいか}の{改新|かいしん}と よばれる {政治改革|せいじかいかく}を {始|はじ}めた {人物|じんぶつ}は だれか。',
    choices: ['{中大兄皇子|なかのおおえのおうじ}', '{聖武天皇|しょうむてんのう}', '{桓武天皇|かんむてんのう}', '{藤原道長|ふじわらのみちなが}'],
    answer: '{中大兄皇子|なかのおおえのおうじ}',
    hints: ['のちに {天智天皇|てんじてんのう}と なった {人物|じんぶつ}。', '{土地|とち}と {人民|じんみん}を {国|くに}の ものと する {公地公民|こうちこうみん}の {方針|ほうしん}を しめした。'],
    explanation: '{中大兄皇子|なかのおおえのおうじ}は {中臣鎌足|なかとみのかまたり}と ともに {蘇我氏|そがし}を たおし、{大化|たいか}の{改新|かいしん}を {始|はじ}めました。のちに {天智天皇|てんじてんのう}と なりました。',
    reviewed: false
  },
  {
    id: 'social_g7_world_006', subject: 'social', gradeLevel: 7, unit: 'world',
    difficulty: 'standard', answerType: 'choice',
    question: '{赤道|せきどう}の {付近|ふきん}に {広|ひろ}がり、1{年|ねん}{中|じゅう} {気温|きおん}が {高|たか}く、{雨|あめ}の {多|おお}い {地域|ちいき}が ふくまれる {気候帯|きこうたい}は どれか。',
    choices: ['{熱帯|ねったい}', '{乾燥帯|かんそうたい}', '{温帯|おんたい}', '{冷帯|れいたい}（{亜寒帯|あかんたい}）'],
    answer: '{熱帯|ねったい}',
    hints: ['{熱帯雨林|ねったいうりん}が しげる {地域|ちいき}が ある。', '{赤道|せきどう}の {近|ちか}くは {太陽|たいよう}の {光|ひかり}を ほぼ {真上|まうえ}から {受|う}ける。'],
    explanation: '{赤道|せきどう}の {付近|ふきん}は「{熱帯|ねったい}」で、1{年|ねん}{中|じゅう} {気温|きおん}が {高|たか}く、{雨|あめ}の {多|おお}い {地域|ちいき}には {熱帯雨林|ねったいうりん}が {広|ひろ}がります。',
    reviewed: false
  },
  {
    id: 'social_g7_history_002', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '{鎌倉幕府|かまくらばくふ}で、{将軍|しょうぐん}が {御家人|ごけにん}の {領地|りょうち}を {保護|ほご}したり {新|あたら}しい {領地|りょうち}を {与|あた}えたり する ことを「{御恩|ごおん}」と いう。これに {対|たい}して、{御家人|ごけにん}が {将軍|しょうぐん}の ために {戦|たたか}ったり {警備|けいび}を したり する ことを {何|なん}と いうか。',
    answer: '奉公', acceptedAnswers: ['ほうこう'], validationMode: 'kana-insensitive',
    hints: ['「{御恩|ごおん}と ○○」で セットに なる {言葉|ことば}。', '「いざ{鎌倉|かまくら}」の {精神|せいしん}。「ほう」から {始|はじ}まる。'],
    explanation: '{御家人|ごけにん}が {将軍|しょうぐん}に つくす ことを「{奉公|ほうこう}」と いいます。{土地|とち}を なかだちに した「{御恩|ごおん}と{奉公|ほうこう}」の {関係|かんけい}で、{将軍|しょうぐん}と {御家人|ごけにん}は {結|むす}ばれて いました。',
    reviewed: false
  },
  {
    id: 'social_g7_history_003', subject: 'social', gradeLevel: 7, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '743{年|ねん}に {出|だ}された、{新|あたら}しく {開墾|かいこん}した {土地|とち}を {永久|えいきゅう}に {私有|しゆう}する ことを {認|みと}めた {法|ほう}は どれか。',
    choices: ['{墾田永年私財法|こんでんえいねんしざいのほう}', '{班田収授法|はんでんしゅうじゅのほう}', '{武家諸法度|ぶけしょはっと}', '{御成敗式目|ごせいばいしきもく}'],
    answer: '{墾田永年私財法|こんでんえいねんしざいのほう}',
    hints: ['「{墾田|こんでん}」は {新|あたら}しく {開墾|かいこん}した {田|た}、「{永年|えいねん}」は {永久|えいきゅう}に、の {意味|いみ}。', '{公地公民|こうちこうみん}の {原則|げんそく}が くずれる きっかけに なった。'],
    explanation: '{墾田永年私財法|こんでんえいねんしざいのほう}で {開墾|かいこん}した {土地|とち}の {永久|えいきゅう}の {私有|しゆう}が {認|みと}められ、のちの {荘園|しょうえん}の もとに なりました。{班田収授法|はんでんしゅうじゅのほう}は {口分田|くぶんでん}を {与|あた}える しくみ、{武家諸法度|ぶけしょはっと}は {江戸幕府|えどばくふ}、{御成敗式目|ごせいばいしきもく}は {鎌倉幕府|かまくらばくふ}の きまりです。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g8_japan_001', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'basic', answerType: 'input',
    question: '2020{年|ねん}の {国勢調査|こくせいちょうさ}で、{人口|じんこう}が もっとも {多|おお}かった {都道府県|とどうふけん}は どこか。',
    answer: '東京都', acceptedAnswers: ['東京', 'とうきょう', 'とうきょうと'], validationMode: 'kana-insensitive',
    hints: ['{日本|にほん}の {首都|しゅと}が ある。', '{人口|じんこう}は {約|やく}1400{万人|まんにん}。'],
    explanation: '2020{年|ねん}の {国勢調査|こくせいちょうさ}で {人口|じんこう}が もっとも {多|おお}かったのは「{東京都|とうきょうと}」で、{約|やく}1400{万人|まんにん}でした。',
    reviewed: false
  },
  {
    id: 'social_g8_history_002', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '1853{年|ねん}、{軍艦|ぐんかん}を ひきいて {浦賀|うらが}に {来航|らいこう}し、{日本|にほん}に {開国|かいこく}を {求|もと}めた アメリカの {使節|しせつ}は だれか。カタカナで {答|こた}えなさい。',
    answer: 'ペリー', validationMode: 'kana-insensitive',
    hints: ['{黒船|くろふね}で やって {来|き}た。', '{翌年|よくねん}、{日米和親条約|にちべいわしんじょうやく}が {結|むす}ばれた。'],
    explanation: '1853{年|ねん}に {浦賀|うらが}に {来航|らいこう}したのは「ペリー」です。{翌年|よくねん}、{日米和親条約|にちべいわしんじょうやく}を {結|むす}び、{日本|にほん}は {開国|かいこく}しました。',
    reviewed: false
  },
  {
    id: 'social_g8_history_003', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'input',
    question: '{目安箱|めやすばこ}の {設置|せっち}や {公事方御定書|くじかたおさだめがき}の {制定|せいてい}など、{享保|きょうほう}の{改革|かいかく}を {行|おこな}った {江戸幕府|えどばくふ}の 8{代将軍|だいしょうぐん}は だれか。',
    answer: '徳川吉宗', acceptedAnswers: ['とくがわよしむね'], validationMode: 'kana-insensitive',
    hints: ['{紀伊藩|きいはん}（{和歌山|わかやま}）の {藩主|はんしゅ}から {将軍|しょうぐん}に なった。', '「{米将軍|こめしょうぐん}」とも よばれた。'],
    explanation: '{享保|きょうほう}の{改革|かいかく}を {行|おこな}ったのは 8{代将軍|だいしょうぐん}「{徳川吉宗|とくがわよしむね}」です。',
    reviewed: false
  },
  {
    id: 'social_g8_japan_002', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'input',
    question: '{夏|なつ}は {南東|なんとう}から、{冬|ふゆ}は {北西|ほくせい}から ふき、{日本|にほん}の {気候|きこう}に {大|おお}きな えいきょうを あたえる {風|かぜ}を {何|なん}と いうか。',
    answer: '季節風', acceptedAnswers: ['きせつふう', 'モンスーン'], validationMode: 'kana-insensitive',
    hints: ['{季節|きせつ}に よって ふく {向|む}きが {変|か}わる。', '{英語|えいご}では「モンスーン」。'],
    explanation: '{季節|きせつ}に よって ふく {向|む}きが {変|か}わる {風|かぜ}を「{季節風|きせつふう}（モンスーン）」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g8_history_004', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'standard', answerType: 'choice',
    question: '{伊藤博文|いとうひろぶみ}らが {大日本帝国憲法|だいにっぽんていこくけんぽう}を つくる ときに、おもに {手本|てほん}と した {国|くに}の {憲法|けんぽう}は どれか。',
    choices: ['ドイツ（プロイセン）', 'イギリス', 'アメリカ', 'フランス'],
    answer: 'ドイツ（プロイセン）',
    hints: ['{君主|くんしゅ}（{皇帝|こうてい}）の {権力|けんりょく}が {強|つよ}い {憲法|けんぽう}を {持|も}つ {国|くに}。', '{伊藤博文|いとうひろぶみ}は ヨーロッパで この {国|くに}の {憲法|けんぽう}を {学|まな}んだ。'],
    explanation: '{大日本帝国憲法|だいにっぽんていこくけんぽう}は、{君主|くんしゅ}の {権力|けんりょく}が {強|つよ}い ドイツ（プロイセン）の {憲法|けんぽう}を {手本|てほん}に して、1889{年|ねん}に {発布|はっぷ}されました。',
    reviewed: false
  },
  {
    id: 'social_g8_japan_003', subject: 'social', gradeLevel: 8, unit: 'japan',
    difficulty: 'standard', answerType: 'choice',
    question: '{高知平野|こうちへいや}や {宮崎平野|みやざきへいや}で さかんな、{冬|ふゆ}でも {暖|あたた}かい {気候|きこう}を {利用|りよう}して {野菜|やさい}の {出荷|しゅっか}{時期|じき}を {早|はや}める {栽培方法|さいばいほうほう}は どれか。',
    choices: ['{促成栽培|そくせいさいばい}', '{抑制栽培|よくせいさいばい}', '{近郊農業|きんこうのうぎょう}', '{二毛作|にもうさく}'],
    answer: '{促成栽培|そくせいさいばい}',
    hints: ['「{促|うなが}す」は {早|はや}める という {意味|いみ}。', '{出荷|しゅっか}を おくらせる {栽培|さいばい}は「{抑制栽培|よくせいさいばい}」。'],
    explanation: '{暖|あたた}かい {気候|きこう}と ビニールハウスを {利用|りよう}して {出荷|しゅっか}{時期|じき}を {早|はや}める のが「{促成栽培|そくせいさいばい}」です。{他|ほか}の {産地|さんち}の {出荷|しゅっか}が {少|すく}ない {時期|じき}に {高|たか}い {値段|ねだん}で {売|う}る ことが できます。',
    reviewed: false
  },
  {
    id: 'social_g8_history_005', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'advanced', answerType: 'input',
    question: '1867{年|ねん}、15{代将軍|だいしょうぐん}{徳川慶喜|とくがわよしのぶ}が {政権|せいけん}を {朝廷|ちょうてい}に {返|かえ}した ことを {何|なん}と いうか。',
    answer: '大政奉還', acceptedAnswers: ['たいせいほうかん'], validationMode: 'kana-insensitive',
    hints: ['「{大政|たいせい}」は {国|くに}の {政治|せいじ}、「{奉還|ほうかん}」は お{返|かえ}しする という {意味|いみ}。', 'この {後|あと}、{王政復古|おうせいふっこ}の {大号令|だいごうれい}が {出|だ}された。'],
    explanation: '{徳川慶喜|とくがわよしのぶ}が {政権|せいけん}を {朝廷|ちょうてい}に {返|かえ}した ことを「{大政奉還|たいせいほうかん}」と いいます。これにより {江戸幕府|えどばくふ}の {政治|せいじ}は {終|お}わりました。',
    reviewed: false
  },
  {
    id: 'social_g8_history_006', subject: 'social', gradeLevel: 8, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '{日清戦争|にっしんせんそう}の {講和条約|こうわじょうやく}は どれか。',
    choices: ['{下関条約|しものせきじょうやく}', 'ポーツマス{条約|じょうやく}', '{日米和親条約|にちべいわしんじょうやく}', 'ベルサイユ{条約|じょうやく}'],
    answer: '{下関条約|しものせきじょうやく}',
    hints: ['1895{年|ねん}に {山口県|やまぐちけん}で {結|むす}ばれた。', 'ポーツマス{条約|じょうやく}は {日露戦争|にちろせんそう}の {講和条約|こうわじょうやく}。'],
    explanation: '{日清戦争|にっしんせんそう}の {講和条約|こうわじょうやく}は、1895{年|ねん}の「{下関条約|しものせきじょうやく}」です。{日本|にほん}は {遼東半島|りょうとうはんとう}・{台湾|たいわん}などを {得|え}ましたが、{三国干渉|さんごくかんしょう}で {遼東半島|りょうとうはんとう}は {返還|へんかん}しました。',
    reviewed: false
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
    reviewed: false
  },
  {
    id: 'social_g9_politics_002', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'basic', answerType: 'input',
    question: '{現在|げんざい}の {日本|にほん}で、{選挙権|せんきょけん}が {与|あた}えられるのは {満|まん}{何歳|なんさい}{以上|いじょう}か。{数|かず}で {答|こた}えなさい。',
    answer: '18', acceptedAnswers: ['18歳', '満18歳'], validationMode: 'number',
    hints: ['2016{年|ねん}の {選挙|せんきょ}から {引|ひ}き{下|さ}げられた。', 'それ{以前|いぜん}は {満|まん}20{歳|さい}{以上|いじょう}だった。'],
    explanation: '{選挙権|せんきょけん}は {満|まん}18{歳|さい}{以上|いじょう}の {国民|こくみん}に {与|あた}えられて います（2016{年|ねん}から）。',
    reviewed: false
  },
  {
    id: 'social_g9_politics_003', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'standard', answerType: 'input',
    question: '{衆議院議員総選挙|しゅうぎいんぎいんそうせんきょ}の ときに、{国民|こくみん}が {最高裁判所|さいこうさいばんしょ}の {裁判官|さいばんかん}を ふさわしいか どうか {審査|しんさ}する {制度|せいど}を {何|なん}と いうか。',
    answer: '国民審査', acceptedAnswers: ['こくみんしんさ', '最高裁判所裁判官国民審査'], validationMode: 'kana-insensitive',
    hints: ['{辞|や}めさせた ほうが よいと {思|おも}う {裁判官|さいばんかん}に ×を {書|か}く。', '「{国民|こくみん}○○」。'],
    explanation: '{最高裁判所|さいこうさいばんしょ}の {裁判官|さいばんかん}が ふさわしいかを {国民|こくみん}が {判断|はんだん}する しくみを「{国民審査|こくみんしんさ}」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g9_economy_001', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'standard', answerType: 'input',
    question: '{市場|しじょう}で、{需要量|じゅようりょう}（{買|か}いたい {量|りょう}）と {供給量|きょうきゅうりょう}（{売|う}りたい {量|りょう}）が {一致|いっち}する ときの {価格|かかく}を {何|なん}と いうか。',
    answer: '均衡価格', acceptedAnswers: ['きんこうかかく'], validationMode: 'kana-insensitive',
    hints: ['{需要曲線|じゅようきょくせん}と {供給曲線|きょうきゅうきょくせん}が {交|まじ}わる {点|てん}の {価格|かかく}。', '「つり{合|あ}い」を {意味|いみ}する {言葉|ことば}が つく。'],
    explanation: '{需要量|じゅようりょう}と {供給量|きょうきゅうりょう}が {一致|いっち}する {価格|かかく}を「{均衡価格|きんこうかかく}」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g9_constitution_001', subject: 'social', gradeLevel: 9, unit: 'constitution',
    difficulty: 'standard', answerType: 'input',
    question: '{日本国憲法|にほんこくけんぽう}で、{戦争|せんそう}の {放棄|ほうき}・{戦力|せんりょく}の {不保持|ふほじ}・{交戦権|こうせんけん}の {否認|ひにん}を {定|さだ}めて いるのは {第|だい}{何条|なんじょう}か。{数|かず}で {答|こた}えなさい。',
    answer: '9', acceptedAnswers: ['9条', '第9条'], validationMode: 'number',
    hints: ['{平和主義|へいわしゅぎ}を {具体的|ぐたいてき}に {定|さだ}めた {条文|じょうぶん}。', '1{桁|けた}の {数|かず}。'],
    explanation: '{日本国憲法|にほんこくけんぽう}{第|だい}9{条|じょう}は、{戦争|せんそう}の {放棄|ほうき}・{戦力|せんりょく}の {不保持|ふほじ}・{交戦権|こうせんけん}の {否認|ひにん}を {定|さだ}めて います。',
    reviewed: false
  },
  {
    id: 'social_g9_politics_004', subject: 'social', gradeLevel: 9, unit: 'politics',
    difficulty: 'standard', answerType: 'choice',
    question: '{内閣|ないかく}の {長|ちょう}は だれか。',
    choices: ['{内閣総理大臣|ないかくそうりだいじん}', '{天皇|てんのう}', '{最高裁判所長官|さいこうさいばんしょちょうかん}', '{衆議院議長|しゅうぎいんぎちょう}'],
    answer: '{内閣総理大臣|ないかくそうりだいじん}',
    hints: ['{国会議員|こっかいぎいん}の {中|なか}から {国会|こっかい}が {指名|しめい}する。', '「{首相|しゅしょう}」とも よばれる。'],
    explanation: '{内閣|ないかく}の {長|ちょう}は {内閣総理大臣|ないかくそうりだいじん}（{首相|しゅしょう}）です。{国会|こっかい}が {国会議員|こっかいぎいん}の {中|なか}から {指名|しめい}し、{天皇|てんのう}が {任命|にんめい}します。',
    reviewed: false
  },
  {
    id: 'social_g9_international_001', subject: 'social', gradeLevel: 9, unit: 'international',
    difficulty: 'standard', answerType: 'choice',
    question: '{国際連合|こくさいれんごう}の {本部|ほんぶ}が ある {都市|とし}は どれか。',
    choices: ['ニューヨーク', 'ジュネーブ', 'ワシントンD.C.', 'パリ'],
    answer: 'ニューヨーク',
    hints: ['アメリカ{合衆国|がっしゅうこく}に ある。', 'アメリカの {首都|しゅと}では ない。'],
    explanation: '{国際連合|こくさいれんごう}の {本部|ほんぶ}は アメリカの ニューヨークに あります。',
    reviewed: false
  },
  {
    id: 'social_g9_economy_002', subject: 'social', gradeLevel: 9, unit: 'economy',
    difficulty: 'advanced', answerType: 'input',
    question: '{日本銀行|にっぽんぎんこう}が、{国債|こくさい}などの {売|う}り{買|か}いを {通|つう}じて {世|よ}の {中|なか}に {出回|でまわ}る お{金|かね}の {量|りょう}を {調整|ちょうせい}し、{景気|けいき}や {物価|ぶっか}を {安定|あんてい}させようと する {政策|せいさく}を {何|なん}と いうか。',
    answer: '金融政策', acceptedAnswers: ['きんゆうせいさく'], validationMode: 'kana-insensitive',
    hints: ['{政府|せいふ}が {税|ぜい}や {公共事業|こうきょうじぎょう}で {行|おこな}う のは「{財政政策|ざいせいせいさく}」。', 'お{金|かね}の {流|なが}れを「{金融|きんゆう}」と いう。'],
    explanation: '{日本銀行|にっぽんぎんこう}が お{金|かね}の {量|りょう}を {調整|ちょうせい}して {景気|けいき}や {物価|ぶっか}を {安定|あんてい}させる {政策|せいさく}を「{金融政策|きんゆうせいさく}」と いいます。',
    reviewed: false
  },
  {
    id: 'social_g9_history_001', subject: 'social', gradeLevel: 9, unit: 'history',
    difficulty: 'advanced', answerType: 'choice',
    question: '1951{年|ねん}に {結|むす}ばれ、{翌年|よくねん}の {発効|はっこう}に よって {日本|にほん}が {独立|どくりつ}を {回復|かいふく}した {条約|じょうやく}は どれか。',
    choices: ['サンフランシスコ{平和条約|へいわじょうやく}', '{日米安全保障条約|にちべいあんぜんほしょうじょうやく}', 'ポツダム{宣言|せんげん}', '{日ソ共同宣言|にっそきょうどうせんげん}'],
    answer: 'サンフランシスコ{平和条約|へいわじょうやく}',
    hints: ['アメリカの {都市|とし}の {名前|なまえ}が ついて いる。', '{同|おな}じ {日|ひ}に {日米安全保障条約|にちべいあんぜんほしょうじょうやく}も {結|むす}ばれたが、こちらは {安全保障|あんぜんほしょう}に ついての {条約|じょうやく}。'],
    explanation: '1951{年|ねん}、{日本|にほん}は 48か{国|こく}と サンフランシスコ{平和条約|へいわじょうやく}を {結|むす}び、1952{年|ねん}の {発効|はっこう}で {独立|どくりつ}を {回復|かいふく}しました。{同|おな}じ {日|ひ}に {日米安全保障条約|にちべいあんぜんほしょうじょうやく}も {結|むす}ばれました。',
    reviewed: false
  }
);
