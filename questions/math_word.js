// 問題データ：算数・数学（文章題）（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。人が内容を確認したら true にする（ここまでの問題は 2026-09-26 に確認済み）。
// 各学年：基礎（4択）1問・標準（自由入力）2問・発展（自由入力）1問。
// 昇格試験は標準の自由入力から文章題を1問まで使う（js/exam.js）。
window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(

  // ===== Lv1（小学1年）：たし算・ひき算 =====
  {
    id: 'math_g1_addsub_001', subject: 'math', gradeLevel: 1, unit: 'addsub',
    difficulty: 'basic', answerType: 'choice',
    question: 'たきぎが 3ぼん あります。4ほん もって くると、ぜんぶで なんぼんに なりますか。',
    choices: ['7ほん', '5ほん', '1ぽん', '12ほん'],
    answer: '7ほん',
    hints: ['「ぜんぶで」は たしざんの ことば。', '3と 4を あわせよう。'],
    explanation: '3＋4＝7 なので、たきぎは ぜんぶで 7ほんです。',
    reviewed: true
  },
  {
    id: 'math_g1_addsub_002', subject: 'math', gradeLevel: 1, unit: 'addsub',
    difficulty: 'standard', answerType: 'input',
    question: 'ゆきだるまを 8こ つくりました。そのうち 3こが とけました。のこりは なんこですか。（かずで こたえよう）',
    answer: '5', acceptedAnswers: ['5こ'], validationMode: 'number',
    hints: ['「のこりは」は ひきざんの ことば。', '8から 3を ひこう。'],
    explanation: '8−3＝5 なので、のこりの ゆきだるまは 5こです。',
    reviewed: true
  },
  {
    id: 'math_g1_addsub_003', subject: 'math', gradeLevel: 1, unit: 'addsub',
    difficulty: 'standard', answerType: 'input',
    question: 'ペンギンが 9わ います。あとから 6わ きました。ペンギンは みんなで なんわですか。（かずで こたえよう）',
    answer: '15', acceptedAnswers: ['15わ'], validationMode: 'number',
    hints: ['「みんなで」は たしざんの ことば。', '9に 1を たすと 10。6を 1と 5に わけて かんがえよう。'],
    explanation: '9＋6＝15 なので、ペンギンは みんなで 15わです。（9に 1を たして 10、のこりの 5を たして 15）',
    reviewed: true
  },
  {
    id: 'math_g1_addsub_004', subject: 'math', gradeLevel: 1, unit: 'addsub',
    difficulty: 'advanced', answerType: 'input',
    question: 'ぼうしが 12こ あります。こどもが 7にん います。ひとり 1こずつ ぼうしを かぶると、ぼうしは なんこ あまりますか。（かずで こたえよう）',
    answer: '5', acceptedAnswers: ['5こ'], validationMode: 'number',
    hints: ['7にんが 1こずつ かぶると、ぼうしは 7こ つかう。', 'ぼうしの かずから、つかった かずを ひこう。'],
    explanation: '7にんで 7こ つかうので、12−7＝5。ぼうしは 5こ あまります。',
    reviewed: true
  },

  // ===== Lv2（小学2年）：かけ算・3けたの計算・長さ =====
  {
    id: 'math_g2_multiply_001', subject: 'math', gradeLevel: 2, unit: 'multiply',
    difficulty: 'basic', answerType: 'choice',
    question: '1ふくろに あめが 5こずつ はいって います。4ふくろでは、あめは なんこに なりますか。',
    choices: ['20こ', '9こ', '15こ', '25こ'],
    answer: '20こ',
    hints: ['「5こずつ」が 4ふくろ ぶん あるよ。', '5×4 を かんがえよう。'],
    explanation: '1ふくろ 5こが 4ふくろ ぶんなので、5×4＝20。あめは 20こです。',
    reviewed: true
  },
  {
    id: 'math_g2_multiply_002', subject: 'math', gradeLevel: 2, unit: 'multiply',
    difficulty: 'standard', answerType: 'input',
    question: 'そうこの たなは 7だん あります。1だんに かんづめが 6こずつ ならんで います。かんづめは ぜんぶで なんこですか。（かずで こたえよう）',
    answer: '42', acceptedAnswers: ['42こ'], validationMode: 'number',
    hints: ['1だんに 6こずつ、それが 7だん ぶん。', '6の だんの 九九を つかおう。'],
    explanation: '6こずつ 7だん ぶんなので、6×7＝42。かんづめは ぜんぶで 42こです。',
    reviewed: true
  },
  {
    id: 'math_g2_addsub3_001', subject: 'math', gradeLevel: 2, unit: 'addsub3',
    difficulty: 'standard', answerType: 'input',
    question: 'いしが 128こ あります。かべを つくるのに 45こ つかいました。のこりは なんこですか。（かずで こたえよう）',
    answer: '83', acceptedAnswers: ['83こ'], validationMode: 'number',
    hints: ['「のこりは」は ひきざん。128−45 を ひっさんで しよう。', 'いちのくらいの 8−5、じゅうのくらいの 2−4 は ひけないので、ひゃくのくらいから 1 かりよう。'],
    explanation: '128−45＝83 なので、のこりの いしは 83こです。',
    reviewed: true
  },
  {
    id: 'math_g2_length_001', subject: 'math', gradeLevel: 2, unit: 'length',
    difficulty: 'advanced', answerType: 'input',
    question: 'ながさ 1m20cmの ロープと、ながさ 85cmの ロープを つなぎます。あわせて なんcmに なりますか。むすびめの ながさは かんがえません。（cmの かずで こたえよう）',
    answer: '205', acceptedAnswers: ['205cm', '2m5cm'], validationMode: 'number',
    hints: ['1m は 100cm。', '1m20cm を cmだけで あらわすと なんcm かな。'],
    explanation: '1m20cm＝120cm です。120＋85＝205 なので、あわせて 205cm（2m5cm）です。',
    reviewed: true
  },

  // ===== Lv3（小学3年）：わり算・お金 =====
  {
    id: 'math_g3_division_001', subject: 'math', gradeLevel: 3, unit: 'division',
    difficulty: 'basic', answerType: 'choice',
    question: 'パンが 24{個|こ} あります。4{人|にん}で {同|おな}じ {数|かず}ずつ {分|わ}けると、ひとり{分|ぶん}は {何個|なんこ}ですか。',
    choices: ['6{個|こ}', '4{個|こ}', '8{個|こ}', '20{個|こ}'],
    answer: '6{個|こ}',
    hints: ['{同|おな}じ {数|かず}ずつ {分|わ}けるときは わり{算|ざん}。', '24÷4 を {考|かんが}えよう。4の {段|だん}の 九九で {答|こた}えが 24に なるのは？'],
    explanation: '24÷4＝6 なので、ひとり{分|ぶん}は 6{個|こ}です。（4×6＝24 で たしかめられます）',
    reviewed: true
  },
  {
    id: 'math_g3_division_002', subject: 'math', gradeLevel: 3, unit: 'division',
    difficulty: 'standard', answerType: 'input',
    question: 'たきぎが 29{本|ほん} あります。4{本|ほん}ずつ ひもで しばって たばに します。4{本|ほん}の たばは {何|なん}たば できますか。（{数|かず}で {答|こた}えよう）',
    answer: '7', acceptedAnswers: ['7たば'], validationMode: 'number',
    hints: ['29÷4 を {考|かんが}えよう。', '4×7＝28、4×8＝32。29を こえないのは どちら？'],
    explanation: '29÷4＝7 あまり 1 です。4{本|ほん}の たばは 7たば できて、1{本|ぽん} あまります。',
    reviewed: true
  },
  {
    id: 'math_g3_money_001', subject: 'math', gradeLevel: 3, unit: 'money',
    difficulty: 'standard', answerType: 'input',
    question: '1さつ 180{円|えん}の ノートを 3さつ {買|か}って、1000{円|えん}を はらいました。おつりは {何円|なんえん}ですか。（{数|かず}で {答|こた}えよう）',
    answer: '460', acceptedAnswers: ['460円'], validationMode: 'number',
    hints: ['まず、ノート 3さつの {代金|だいきん}を {求|もと}めよう。', '180×3 を {計算|けいさん}してから、1000から ひこう。'],
    explanation: 'ノートの {代金|だいきん}は 180×3＝540{円|えん}。おつりは 1000−540＝460{円|えん}です。',
    reviewed: true
  },
  {
    id: 'math_g3_division_003', subject: 'math', gradeLevel: 3, unit: 'division',
    difficulty: 'advanced', answerType: 'input',
    question: '50{人|にん}が そりで {雪原|せつげん}を わたります。そり1{台|だい}には 6{人|にん}まで {乗|の}れます。{全員|ぜんいん}が {乗|の}るには、そりは {少|すく}なくとも {何台|なんだい} いりますか。（{数|かず}で {答|こた}えよう）',
    answer: '9', acceptedAnswers: ['9台'], validationMode: 'number',
    hints: ['50÷6 を {計算|けいさん}しよう。', 'あまりの {人|ひと}も {乗|の}らないと いけないよ。'],
    explanation: '50÷6＝8 あまり 2 です。8{台|だい}では ふたり {乗|の}れないので、もう1{台|だい} いります。8＋1＝9{台|だい}です。',
    reviewed: true
  },

  // ===== Lv4（小学4年）：面積・小数・わり算 =====
  {
    id: 'math_g4_area_001', subject: 'math', gradeLevel: 4, unit: 'area',
    difficulty: 'basic', answerType: 'choice',
    question: 'たて 8m、よこ 12mの {長方形|ちょうほうけい}の {畑|はたけ}が あります。この {畑|はたけ}の {面積|めんせき}は {何|なん}m²ですか。',
    choices: ['96m²', '20m²', '40m²', '960m²'],
    answer: '96m²',
    hints: ['{長方形|ちょうほうけい}の {面積|めんせき}＝たて×よこ', '8×12 を {計算|けいさん}しよう。'],
    explanation: '{長方形|ちょうほうけい}の {面積|めんせき}は たて×よこ なので、8×12＝96。96m²です。（40m は まわりの {長|なが}さです）',
    reviewed: true
  },
  {
    id: 'math_g4_decimal_001', subject: 'math', gradeLevel: 4, unit: 'decimal',
    difficulty: 'standard', answerType: 'input',
    question: '1{本|ぽん}に 2.4Lの {灯油|とうゆ}が {入|はい}った {容器|ようき}が 5{本|ほん} あります。{灯油|とうゆ}は {全部|ぜんぶ}で {何|なん}Lですか。（{数|かず}で {答|こた}えよう）',
    answer: '12', acceptedAnswers: ['12L'], validationMode: 'number',
    hints: ['2.4Lが 5つ {分|ぶん}なので かけ{算|ざん}。', '24×5 を {計算|けいさん}して、{小数点|しょうすうてん}の {位置|いち}を {考|かんが}えよう。'],
    explanation: '2.4×5＝12.0 なので、{灯油|とうゆ}は {全部|ぜんぶ}で 12Lです。',
    reviewed: true
  },
  {
    id: 'math_g4_division_001', subject: 'math', gradeLevel: 4, unit: 'division',
    difficulty: 'standard', answerType: 'input',
    question: '{缶詰|かんづめ}が 135{個|こ} あります。1{箱|はこ}に 8{個|こ}ずつ つめていきます。{全部|ぜんぶ}の {缶詰|かんづめ}を つめるには、{箱|はこ}は {何箱|なんはこ} いりますか。（{数|かず}で {答|こた}えよう）',
    answer: '17', acceptedAnswers: ['17箱'], validationMode: 'number',
    hints: ['135÷8 を {筆算|ひっさん}で {計算|けいさん}しよう。', 'あまった {缶詰|かんづめ}を {入|い}れる {箱|はこ}も {必要|ひつよう}だよ。'],
    explanation: '135÷8＝16 あまり 7 です。あまりの 7{個|こ}を {入|い}れる {箱|はこ}が もう1つ いるので、16＋1＝17{箱|はこ}です。',
    reviewed: true
  },
  {
    id: 'math_g4_area_002', subject: 'math', gradeLevel: 4, unit: 'area',
    difficulty: 'advanced', answerType: 'input',
    question: '1{辺|ぺん}が 20mの {正方形|せいほうけい}の {土地|とち}が あります。その {中|なか}に、たて 5m、よこ 8mの {長方形|ちょうほうけい}の {小屋|こや}を {建|た}てました。{小屋|こや}の ないところの {面積|めんせき}は {何|なん}m²ですか。（{数|かず}で {答|こた}えよう）',
    answer: '360', acceptedAnswers: ['360m2', '360m²'], validationMode: 'number',
    hints: ['まず {土地|とち} {全体|ぜんたい}の {面積|めんせき}を {求|もと}めよう。', '{全体|ぜんたい}から {小屋|こや}の {面積|めんせき}を ひこう。'],
    explanation: '{土地|とち}は 20×20＝400m²、{小屋|こや}は 5×8＝40m²。400−40＝360m²です。',
    reviewed: true
  },

  // ===== Lv5（小学5年）：平均・割合・速さ・体積 =====
  {
    id: 'math_g5_average_001', subject: 'math', gradeLevel: 5, unit: 'average',
    difficulty: 'basic', answerType: 'choice',
    question: '{3日間|みっかかん}で つった {魚|さかな}の {数|かず}は、12{匹|ひき}、15{匹|ひき}、9{匹|ひき}でした。1{日|にち}あたりの {平均|へいきん}は {何匹|なんびき}ですか。',
    choices: ['12{匹|ひき}', '11{匹|ひき}', '13{匹|ひき}', '36{匹|ひき}'],
    answer: '12{匹|ひき}',
    hints: ['{平均|へいきん}＝{合計|ごうけい}÷{個数|こすう}', 'まず {3日間|みっかかん}の {合計|ごうけい}を {求|もと}めよう。'],
    explanation: '{合計|ごうけい}は 12＋15＋9＝36{匹|ひき}。36÷3＝12 なので、{平均|へいきん}は 12{匹|ひき}です。',
    reviewed: true
  },
  {
    id: 'math_g5_percent_001', subject: 'math', gradeLevel: 5, unit: 'percent',
    difficulty: 'standard', answerType: 'input',
    question: '{定員|ていいん}が 40{人|にん}の {住宅|じゅうたく}に、30{人|にん}が {住|す}んで います。{住|す}んでいる {人数|にんずう}は {定員|ていいん}の {何|なん}％ですか。（{数|かず}で {答|こた}えよう）',
    answer: '75', acceptedAnswers: ['75%'], validationMode: 'number',
    hints: ['{割合|わりあい}＝くらべる{量|りょう}÷もとにする{量|りょう}', 'もとにする{量|りょう}は {定員|ていいん}の 40{人|にん}。{割合|わりあい}に 100を かけると ％に なるよ。'],
    explanation: '30÷40＝0.75。0.75×100＝75 なので、75％です。',
    reviewed: true
  },
  {
    id: 'math_g5_speed_001', subject: 'math', gradeLevel: 5, unit: 'speed',
    difficulty: 'standard', answerType: 'input',
    question: '{犬|いぬ}ぞりが 2{時間|じかん}で 36km {進|すす}みました。この {犬|いぬ}ぞりの {速|はや}さは {時速|じそく}{何|なん}kmですか。（{数|かず}で {答|こた}えよう）',
    answer: '18', acceptedAnswers: ['18km', '時速18km'], validationMode: 'number',
    hints: ['{時速|じそく}は 1{時間|じかん}あたりに {進|すす}む {道|みち}のり。', '{速|はや}さ＝{道|みち}のり÷{時間|じかん}'],
    explanation: '36÷2＝18 なので、{時速|じそく}18kmです。',
    reviewed: true
  },
  {
    id: 'math_g5_volume_001', subject: 'math', gradeLevel: 5, unit: 'volume',
    difficulty: 'advanced', answerType: 'input',
    question: '{内側|うちがわ}の {長|なが}さが、たて 50cm、よこ 30cm、{深|ふか}さ 40cmの {直方体|ちょくほうたい}の {水|みず}そうに、{深|ふか}さ 20cmまで {水|みず}が {入|はい}っています。{水|みず}は {何|なん}Lですか。（{数|かず}で {答|こた}えよう）',
    answer: '30', acceptedAnswers: ['30L'], validationMode: 'number',
    hints: ['{水|みず}の {部分|ぶぶん}は たて50cm、よこ30cm、{高|たか}さ20cmの {直方体|ちょくほうたい}。', '1L＝1000cm³ だよ。'],
    explanation: '{水|みず}の {体積|たいせき}は 50×30×20＝30000cm³。1L＝1000cm³ なので、30000÷1000＝30Lです。',
    reviewed: true
  },

  // ===== Lv6（小学6年）：比・分数・円の面積・比例 =====
  {
    id: 'math_g6_ratio_001', subject: 'math', gradeLevel: 6, unit: 'ratio',
    difficulty: 'basic', answerType: 'choice',
    question: '{木材|もくざい}と {石材|せきざい}を 3：2の {割合|わりあい}で {使|つか}います。{木材|もくざい}を 15{個|こ} {使|つか}うとき、{石材|せきざい}は {何個|なんこ} {使|つか}いますか。',
    choices: ['10{個|こ}', '6{個|こ}', '14{個|こ}', '22{個|こ}'],
    answer: '10{個|こ}',
    hints: ['3：2＝15：□ と {考|かんが}えよう。', '3を {何倍|なんばい}すると 15に なるかな。'],
    explanation: '3×5＝15 なので、2も 5{倍|ばい}して 2×5＝10。{石材|せきざい}は 10{個|こ}です。',
    reviewed: true
  },
  {
    id: 'math_g6_fraction_001', subject: 'math', gradeLevel: 6, unit: 'fraction',
    difficulty: 'standard', answerType: 'input',
    question: '2/3kgの {肉|にく}を 4{人|にん}で {同|おな}じ {重|おも}さずつ {分|わ}けます。ひとり{分|ぶん}は {何|なん}kgですか。（{分数|ぶんすう}で {答|こた}えよう。{約分|やくぶん}して {答|こた}えること。{例|れい}：3/5）',
    answer: '1/6', acceptedAnswers: ['1/6kg'], validationMode: 'exact',
    hints: ['{同|おな}じ {重|おも}さずつ {分|わ}けるので わり{算|ざん}。2/3÷4', '{分数|ぶんすう}÷{整数|せいすう}は、{分母|ぶんぼ}に その {整数|せいすう}を かけるよ。'],
    explanation: '2/3÷4＝2/(3×4)＝2/12＝1/6 なので、ひとり{分|ぶん}は 1/6kgです。',
    reviewed: true
  },
  {
    id: 'math_g6_circle_001', subject: 'math', gradeLevel: 6, unit: 'circle',
    difficulty: 'standard', answerType: 'input',
    question: '{半径|はんけい}5mの {円|えん}の {形|かたち}をした {広場|ひろば}の {雪|ゆき}を かきます。{広場|ひろば}の {面積|めんせき}は {何|なん}m²ですか。{円周率|えんしゅうりつ}は 3.14と します。（{数|かず}で {答|こた}えよう）',
    answer: '78.5', acceptedAnswers: ['78.5m2', '78.5m²'], validationMode: 'number',
    hints: ['{円|えん}の {面積|めんせき}＝{半径|はんけい}×{半径|はんけい}×{円周率|えんしゅうりつ}', '5×5×3.14 を {計算|けいさん}しよう。'],
    explanation: '5×5×3.14＝25×3.14＝78.5 なので、78.5m²です。',
    reviewed: true
  },
  {
    id: 'math_g6_proportion_001', subject: 'math', gradeLevel: 6, unit: 'proportion',
    difficulty: 'advanced', answerType: 'input',
    question: '{同|おな}じ {太|ふと}さの ロープが あります。3mの {重|おも}さは 120gでした。このロープ 450gの {長|なが}さは {何|なん}mですか。（{数|かず}で {答|こた}えよう）',
    answer: '11.25', acceptedAnswers: ['11.25m'], validationMode: 'number',
    hints: ['ロープの {重|おも}さは {長|なが}さに {比例|ひれい}するよ。', 'まず 1mあたりの {重|おも}さを {求|もと}めよう。'],
    explanation: '1mあたりの {重|おも}さは 120÷3＝40g。450÷40＝11.25 なので、11.25mです。',
    reviewed: true
  },

  // ===== Lv7（中学1年）：正負の数・一次方程式 =====
  {
    id: 'math_g7_integer_001', subject: 'math', gradeLevel: 7, unit: 'integer',
    difficulty: 'basic', answerType: 'choice',
    question: '{朝|あさ}の {気温|きおん}は −8℃、{昼|ひる}の {気温|きおん}は 3℃でした。{昼|ひる}の {気温|きおん}は {朝|あさ}より {何|なん}℃{高|たか}いですか。',
    choices: ['11℃', '5℃', '−5℃', '−11℃'],
    answer: '11℃',
    hints: ['{差|さ}は（{昼|ひる}の {気温|きおん}）−（{朝|あさ}の {気温|きおん}）で {求|もと}める。', '3−(−8) は 3＋8 と {同|おな}じ。'],
    explanation: '3−(−8)＝3＋8＝11 なので、{昼|ひる}は {朝|あさ}より 11℃{高|たか}いです。',
    reviewed: true
  },
  {
    id: 'math_g7_equation_001', subject: 'math', gradeLevel: 7, unit: 'equation',
    difficulty: 'standard', answerType: 'input',
    question: '{鉄|てつ}が 20{個|こ} あります。{毎日|まいにち} {同|おな}じ {数|かず}ずつ {鉄|てつ}を {集|あつ}めたところ、{7日後|なのかご}には {全部|ぜんぶ}で 90{個|こ}に なりました。1{日|にち}に {何個|なんこ}ずつ {集|あつ}めましたか。（{数|かず}で {答|こた}えよう）',
    answer: '10', acceptedAnswers: ['10個'], validationMode: 'number',
    hints: ['1{日|にち}に {集|あつ}めた {数|かず}を x{個|こ}とすると、7{日|にち}で 7x{個|こ}。', '20＋7x＝90 を {解|と}こう。'],
    explanation: '20＋7x＝90 より 7x＝70、x＝10。1{日|にち}に 10{個|こ}ずつ {集|あつ}めました。',
    reviewed: true
  },
  {
    id: 'math_g7_equation_002', subject: 'math', gradeLevel: 7, unit: 'equation',
    difficulty: 'standard', answerType: 'input',
    question: '{缶詰|かんづめ}を {何人|なんにん}かに {配|くば}ります。ひとりに 3{個|こ}ずつ {配|くば}ると 8{個|こ} あまり、ひとりに 4{個|こ}ずつ {配|くば}ると 5{個|こ} {足|た}りません。{人数|にんずう}は {何人|なんにん}ですか。（{数|かず}で {答|こた}えよう）',
    answer: '13', acceptedAnswers: ['13人'], validationMode: 'number',
    hints: ['{人数|にんずう}を x{人|にん}として、{缶詰|かんづめ}の {数|かず}を 2{通|とお}りの {式|しき}で {表|あらわ}そう。', '3x＋8 と 4x−5 は どちらも {缶詰|かんづめ}の {数|かず}。'],
    explanation: '{人数|にんずう}を x{人|にん}とすると、3x＋8＝4x−5。これを {解|と}くと x＝13。{人数|にんずう}は 13{人|にん}です。（{缶詰|かんづめ}は 3×13＋8＝47{個|こ}）',
    reviewed: true
  },
  {
    id: 'math_g7_equation_003', subject: 'math', gradeLevel: 7, unit: 'equation',
    difficulty: 'advanced', answerType: 'input',
    question: '{見張|みは}り{塔|とう}から {基地|きち}まで {歩|ある}きます。{分速|ふんそく}60mで {歩|ある}くと、{分速|ふんそく}90mで {歩|ある}くより 10{分|ぷん} {多|おお}く かかります。{見張|みは}り{塔|とう}から {基地|きち}までの {道|みち}のりは {何|なん}mですか。（{数|かず}で {答|こた}えよう）',
    answer: '1800', acceptedAnswers: ['1800m'], validationMode: 'number',
    hints: ['{道|みち}のりを xmとすると、かかる {時間|じかん}は x/60{分|ふん} と x/90{分|ふん}。', 'x/60 − x/90 ＝ 10 を {解|と}こう。{両辺|りょうへん}に 180を かけると {分母|ぶんぼ}が なくなるよ。'],
    explanation: '{道|みち}のりを xmとすると、x/60 − x/90 ＝ 10。{両辺|りょうへん}に 180を かけて 3x − 2x ＝ 1800、x ＝ 1800。{道|みち}のりは 1800mです。',
    reviewed: true
  },

  // ===== Lv8（中学2年）：確率・連立方程式・一次関数 =====
  {
    id: 'math_g8_probability_001', subject: 'math', gradeLevel: 8, unit: 'probability',
    difficulty: 'basic', answerType: 'choice',
    question: '2つの さいころを {同時|どうじ}に {投|な}げます。{出|で}た {目|め}の {和|わ}が 7に なる {確率|かくりつ}を {求|もと}めなさい。',
    choices: ['1/6', '1/12', '7/36', '1/3'],
    answer: '1/6',
    hints: ['{目|め}の {出方|でかた}は {全部|ぜんぶ}で 6×6＝36{通|とお}り。', '{和|わ}が 7に なる {組|く}み{合|あ}わせを (1,6)、(2,5)… と {書|か}き{出|だ}そう。'],
    explanation: '{和|わ}が 7に なるのは (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) の 6{通|とお}り。6/36＝1/6 です。',
    reviewed: true
  },
  {
    id: 'math_g8_simultaneous_001', subject: 'math', gradeLevel: 8, unit: 'simultaneous',
    difficulty: 'standard', answerType: 'input',
    question: '1{個|こ}100{円|えん}の パンと、1{個|こ}150{円|えん}の おにぎりを {合|あ}わせて 10{個|こ} {買|か}ったら、{代金|だいきん}は 1200{円|えん}でした。おにぎりは {何個|なんこ} {買|か}いましたか。（{数|かず}で {答|こた}えよう）',
    answer: '4', acceptedAnswers: ['4個'], validationMode: 'number',
    hints: ['パンを x{個|こ}、おにぎりを y{個|こ}として、{個数|こすう}の {式|しき}と {代金|だいきん}の {式|しき}を つくろう。', 'x＋y＝10、100x＋150y＝1200'],
    explanation: 'x＋y＝10、100x＋150y＝1200。1つ{目|め}の {式|しき}を 100{倍|ばい}して ひくと 50y＝200、y＝4。おにぎりは 4{個|こ}です。（パンは 6{個|こ}）',
    reviewed: true
  },
  {
    id: 'math_g8_linear_001', subject: 'math', gradeLevel: 8, unit: 'linear',
    difficulty: 'standard', answerType: 'input',
    question: 'ストーブの タンクに {灯油|とうゆ}が 60L {入|はい}っています。ストーブを つけると、1{時間|じかん}に 4Lずつ {減|へ}ります。{灯油|とうゆ}の {残|のこ}りが 20Lに なるのは、つけてから {何時間後|なんじかんご}ですか。（{数|かず}で {答|こた}えよう）',
    answer: '10', acceptedAnswers: ['10時間', '10時間後'], validationMode: 'number',
    hints: ['x{時間後|じかんご}の {残|のこ}りを yLとすると、y＝60−4x。', 'y＝20 を {代入|だいにゅう}しよう。'],
    explanation: 'y＝60−4x に y＝20 を {代入|だいにゅう}すると 20＝60−4x、4x＝40、x＝10。10{時間後|じかんご}です。',
    reviewed: true
  },
  {
    id: 'math_g8_simultaneous_002', subject: 'math', gradeLevel: 8, unit: 'simultaneous',
    difficulty: 'advanced', answerType: 'input',
    question: '2けたの {自然数|しぜんすう}が あります。{十|じゅう}の{位|くらい}の {数|かず}と {一|いち}の{位|くらい}の {数|かず}の {和|わ}は 11です。また、{十|じゅう}の{位|くらい}と {一|いち}の{位|くらい}の {数|かず}を {入|い}れかえた {数|かず}は、もとの {数|かず}より 27{大|おお}きく なります。もとの {数|かず}を {求|もと}めなさい。',
    answer: '47', validationMode: 'number',
    hints: ['{十|じゅう}の{位|くらい}を x、{一|いち}の{位|くらい}を y とすると、もとの {数|かず}は 10x＋y。', '{入|い}れかえた {数|かず}は 10y＋x。x＋y＝11 と (10y＋x)−(10x＋y)＝27 を {解|と}こう。'],
    explanation: 'x＋y＝11、9y−9x＝27 より y−x＝3。2つの {式|しき}から x＝4、y＝7。もとの {数|かず}は 47です。（74−47＝27）',
    reviewed: true
  },

  // ===== Lv9（中学3年）：三平方の定理・二次方程式・相似・関数 y＝ax² =====
  {
    id: 'math_g9_pythagoras_001', subject: 'math', gradeLevel: 9, unit: 'pythagoras',
    difficulty: 'basic', answerType: 'choice',
    question: '{直角|ちょっかく}を はさむ 2{辺|へん}の {長|なが}さが 6mと 8mの {直角三角形|ちょっかくさんかくけい}の {形|かたち}をした {土地|とち}が あります。{斜辺|しゃへん}の {長|なが}さは {何|なん}mですか。',
    choices: ['10m', '14m', '12m', '7m'],
    answer: '10m',
    hints: ['{三平方|さんへいほう}の{定理|ていり}：a²＋b²＝c²（cは {斜辺|しゃへん}）', '6²＋8² を {計算|けいさん}しよう。'],
    explanation: '6²＋8²＝36＋64＝100。c²＝100、c＞0 なので c＝10。{斜辺|しゃへん}は 10mです。',
    reviewed: true
  },
  {
    id: 'math_g9_quadratic_001', subject: 'math', gradeLevel: 9, unit: 'quadratic',
    difficulty: 'standard', answerType: 'input',
    question: '{正方形|せいほうけい}の {畑|はたけ}が あります。たても よこも 3mずつ {広|ひろ}げたら、{面積|めんせき}が 64m²に なりました。もとの {畑|はたけ}の 1{辺|ぺん}は {何|なん}mですか。（{数|かず}で {答|こた}えよう）',
    answer: '5', acceptedAnswers: ['5m'], validationMode: 'number',
    hints: ['もとの 1{辺|ぺん}を xmとすると、{広|ひろ}げたあとの 1{辺|ぺん}は (x＋3)m。', '(x＋3)²＝64 を {解|と}こう。{長|なが}さは {正|せい}の {数|かず}だよ。'],
    explanation: '(x＋3)²＝64 より x＋3＝±8、x＝5 または x＝−11。{長|なが}さは {正|せい}なので x＝5。もとの 1{辺|ぺん}は 5mです。',
    reviewed: true
  },
  {
    id: 'math_g9_similarity_001', subject: 'math', gradeLevel: 9, unit: 'similarity',
    difficulty: 'standard', answerType: 'input',
    question: '{長|なが}さ 2mの {棒|ぼう}を {地面|じめん}に まっすぐ {立|た}てたら、{影|かげ}の {長|なが}さは 1.5mでした。{同|おな}じ {時刻|じこく}に、{見張|みは}り{塔|とう}の {影|かげ}の {長|なが}さは 6mでした。{見張|みは}り{塔|とう}の {高|たか}さは {何|なん}mですか。（{数|かず}で {答|こた}えよう）',
    answer: '8', acceptedAnswers: ['8m'], validationMode: 'number',
    hints: ['{棒|ぼう}と {影|かげ}、{塔|とう}と {影|かげ}で できる {三角形|さんかくけい}は {相似|そうじ}。', '2：1.5＝x：6 を {解|と}こう。'],
    explanation: '{相似|そうじ}な {三角形|さんかくけい}なので 2：1.5＝x：6。1.5x＝12、x＝8。{見張|みは}り{塔|とう}の {高|たか}さは 8mです。',
    reviewed: true
  },
  {
    id: 'math_g9_function_001', subject: 'math', gradeLevel: 9, unit: 'function',
    difficulty: 'advanced', answerType: 'input',
    question: '{高|たか}い {崖|がけ}から {石|いし}を そっと {落|お}とします。{落|お}としてから x{秒間|びょうかん}に {落|お}ちる {距離|きょり}を ymとすると、y＝5x² の {関係|かんけい}が あるものとします。{石|いし}が 45m {落|お}ちるのに {何秒|なんびょう} かかりますか。（{数|かず}で {答|こた}えよう）',
    answer: '3', acceptedAnswers: ['3秒'], validationMode: 'number',
    hints: ['y＝45 を {代入|だいにゅう}しよう。', '5x²＝45 から x²＝9。{時間|じかん}は {正|せい}の {数|かず}だよ。'],
    explanation: '45＝5x² より x²＝9、x＝±3。x＞0 なので x＝3。3{秒|びょう}かかります。',
    reviewed: true
  }
);
