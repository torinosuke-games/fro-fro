// 問題データ：算数・数学（文章題）（SPEC 10.1 の構造。フェーズ7で追加する）
// AI が作成した問題は reviewed: false にする。人が内容を確認したら true にする（フェーズ7の問題と v0.3 で追加した問題は、どちらも 2026-09-26 に確認済み）。
// 各学年：基礎（4択）1問・標準（自由入力）2問・発展（自由入力）1問。
// 昇格試験は標準の自由入力から文章題を1問まで使う（js/exam.js）。
// v0.3（SPEC_v0.3.md 4章・B案）で各学年6問を足して10問にした：基礎3（4択2・自由入力1）、標準5（自由入力4・4択1）、発展2（自由入力2）。
// 追加した問題は、Lv1〜2 をひらがな・カタカナだけで書き、Lv3 以上は漢字にすべて {漢字|よみ} を明示している。答えは問題文の数値から独立に検算した。
window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(

  // ===== Lv1（小学1年）：たし算・ひき算 =====
  {
    id: 'math_g1_addsub_001', subject: 'math', gradeLevel: 1, unit: 'addsub',
    diagram: {"kind":"objects","item":"wood","groups":[3,4],"labels":["3ぼん","4ほん"],"caption":"たきぎを あわせよう"},
    difficulty: 'basic', answerType: 'choice',
    question: 'たきぎが 3ぼん あります。4ほん もって くると、ぜんぶで なんぼんに なりますか。',
    choices: ['7ほん', '5ほん', '1ぽん', '12ほん'],
    answer: '7ほん',
    hints: ['「ぜんぶで」は たしざんの ことば。', '3と 4を あわせよう。'],
    explanation: '3＋4＝7 なので、たきぎは ぜんぶで 7ほんです。',
    inputForm: { answer: '7', acceptedAnswers: ['7ほん', '7本'], validationMode: 'number', reviewed: false },
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
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g1_order_001', subject: 'math', gradeLevel: 1, unit: 'order',
    diagram: {"kind":"objects","item":"person","groups":[7],"labels":["まえ →"],"mark":3,"caption":"しるしの ひとが ゆきさんだよ"},
    difficulty: 'basic', answerType: 'choice',
    question: 'こどもが 1れつに 7にん ならんで います。ゆきさんは まえから 3ばんめです。ゆきさんは うしろから なんばんめですか。',
    choices: ['5ばんめ', '4ばんめ', '3ばんめ', '6ばんめ'],
    answer: '5ばんめ',
    hints: ['ゆきさんの うしろには なんにん いるかな。', '○を 7こ かいて、まえから 3ばんめに しるしを つけて みよう。'],
    explanation: 'ゆきさんの うしろには 7−3＝4にん います。うしろから かぞえると、4にんの つぎが ゆきさんなので 5ばんめです。',
    inputForm: { answer: '5', acceptedAnswers: ['5ばんめ', '5番目'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g1_addsub_005', subject: 'math', gradeLevel: 1, unit: 'addsub',
    difficulty: 'basic', answerType: 'input',
    question: 'あかい はなが 6ぽん、しろい はなが 9ほん あります。しろい はなは あかい はなより なんぼん おおいですか。（かずで こたえよう）',
    answer: '3', acceptedAnswers: ['3ぼん', '3ほん'], validationMode: 'number',
    hints: ['「なんぼん おおい」は ちがいを もとめる ひきざん。', 'おおい ほうから すくない ほうを ひこう。'],
    explanation: '9−6＝3 なので、しろい はなは 3ぼん おおいです。',
    reviewed: true
  },
  {
    id: 'math_g1_addsub_006', subject: 'math', gradeLevel: 1, unit: 'addsub',
    difficulty: 'standard', answerType: 'input',
    question: 'ゆきだまを 14こ つくりました。ともだちに 6こ あげました。のこりは なんこですか。（かずで こたえよう）',
    answer: '8', acceptedAnswers: ['8こ'], validationMode: 'number',
    hints: ['「のこりは」は ひきざんの ことば。', '14を 10と 4に わけて、10から 6を ひこう。'],
    explanation: '14−6＝8 なので、のこりは 8こです。（10−6＝4、4＋4＝8）',
    reviewed: true
  },
  {
    id: 'math_g1_number_001', subject: 'math', gradeLevel: 1, unit: 'number',
    diagram: {"kind":"objects","item":"candy","groups":[10,10,10,4],"labels":["10こ","10こ","10こ","ばら 4こ"],"sealed":[true,true,true,false],"caption":"ふくろと ばらの あめだよ"},
    difficulty: 'standard', answerType: 'input',
    question: 'あめが 10こ はいった ふくろが 3ふくろと、ばらの あめが 4こ あります。あめは ぜんぶで なんこですか。（かずで こたえよう）',
    answer: '34', acceptedAnswers: ['34こ'], validationMode: 'number',
    hints: ['10の まとまりが 3つで いくつかな。', '10が 3つで 30。それに 4を あわせよう。'],
    explanation: '10が 3つで 30、ばらが 4こで、ぜんぶで 34こです。',
    reviewed: true
  },
  {
    id: 'math_g1_clock_001', subject: 'math', gradeLevel: 1, unit: 'clock',
    diagram: {"kind":"clock","hour":3,"minute":30,"caption":"ながい はりと みじかい はりを みよう"},
    difficulty: 'standard', answerType: 'choice',
    question: 'とけいの みじかい はりが 3と 4の あいだ、ながい はりが 6を さして います。なんじなんぷんですか。',
    choices: ['3じはん', '6じ15ふん', '3じ', '4じはん'],
    answer: '3じはん',
    hints: ['みじかい はりは「なんじ」を あらわすよ。3を すぎて いるので 3じ…', 'ながい はりが 6の ときは「はん（30ぷん）」だよ。'],
    explanation: 'みじかい はりが 3と 4の あいだなので 3じ、ながい はりが 6なので 30ぷん。3じはん（3じ30ぷん）です。',
    inputForm: { answer: '3じはん', acceptedAnswers: ['3じ30ぷん', '3時半', '3時30分', '3じ30ふん', '3:30'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g1_addsub_007', subject: 'math', gradeLevel: 1, unit: 'addsub',
    difficulty: 'advanced', answerType: 'input',
    question: 'バスに 8にん のって いました。つぎの バスていで 5にん のって きて、3にん おりました。いま バスには なんにん のって いますか。（かずで こたえよう）',
    answer: '10', acceptedAnswers: ['10にん'], validationMode: 'number',
    hints: ['のって きた ひとは たす、おりた ひとは ひく。', 'まず 8＋5、そのあと 3を ひこう。'],
    explanation: '8＋5＝13、13−3＝10 なので、いま 10にん のって います。',
    reviewed: true
  },

  // ===== Lv2（小学2年）：かけ算・3けたの計算・長さ =====
  {
    id: 'math_g2_multiply_001', subject: 'math', gradeLevel: 2, unit: 'multiply',
    diagram: {"kind":"objects","item":"candy","groups":[5,5,5,5],"labels":["5こ","5こ","5こ","5こ"],"caption":"5こずつの ふくろが 4つ あるよ"},
    difficulty: 'basic', answerType: 'choice',
    question: '1ふくろに あめが 5こずつ はいって います。4ふくろでは、あめは なんこに なりますか。',
    choices: ['20こ', '9こ', '15こ', '25こ'],
    answer: '20こ',
    hints: ['「5こずつ」が 4ふくろ ぶん あるよ。', '5×4 を かんがえよう。'],
    explanation: '1ふくろ 5こが 4ふくろ ぶんなので、5×4＝20。あめは 20こです。',
    inputForm: { answer: '20', acceptedAnswers: ['20こ', '20個'], validationMode: 'number', reviewed: true },
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
    diagram: {"kind":"tape","values":[120,85],"labels":["1m20cm","85cm"],"caption":"2ほんの ロープを つなぐよ"},
    difficulty: 'advanced', answerType: 'input',
    question: 'ながさ 1m20cmの ロープと、ながさ 85cmの ロープを つなぎます。あわせて なんcmに なりますか。むすびめの ながさは かんがえません。（cmの かずで こたえよう）',
    answer: '205', acceptedAnswers: ['205cm', '2m5cm'], validationMode: 'number',
    hints: ['1m は 100cm。', '1m20cm を cmだけで あらわすと なんcm かな。'],
    explanation: '1m20cm＝120cm です。120＋85＝205 なので、あわせて 205cm（2m5cm）です。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g2_multiply_003', subject: 'math', gradeLevel: 2, unit: 'multiply',
    diagram: {"kind":"objects","item":"chair","groups":[3,3,3,3,3,3,3,3],"labels":["1れつ","2れつ","3れつ","4れつ","5れつ","6れつ","7れつ","8れつ"],"columns":1,"caption":"1れつに 3きゃくずつ ならんで いるよ"},
    difficulty: 'basic', answerType: 'choice',
    question: 'いすが 1れつに 3きゃくずつ、8れつ ならんで います。いすは ぜんぶで なんきゃくですか。',
    choices: ['24きゃく', '11きゃく', '21きゃく', '27きゃく'],
    answer: '24きゃく',
    hints: ['3きゃくずつが 8れつ ぶん。', '3の だんの くくで 3×8 を かんがえよう。'],
    explanation: '3きゃくずつ 8れつ ぶんなので、3×8＝24。いすは 24きゃくです。',
    inputForm: { answer: '24', acceptedAnswers: ['24きゃく', '24脚'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g2_addsub3_002', subject: 'math', gradeLevel: 2, unit: 'addsub3',
    difficulty: 'basic', answerType: 'input',
    question: 'くりを 56こ ひろいました。ともだちから 24こ もらいました。くりは ぜんぶで なんこに なりましたか。（かずで こたえよう）',
    answer: '80', acceptedAnswers: ['80こ'], validationMode: 'number',
    hints: ['「ぜんぶで」は たしざん。56＋24 を ひっさんで しよう。', 'いちのくらいは 6＋4＝10。じゅうのくらいに 1 くりあがるよ。'],
    explanation: '56＋24＝80 なので、くりは ぜんぶで 80こです。',
    reviewed: true
  },
  {
    id: 'math_g2_time_001', subject: 'math', gradeLevel: 2, unit: 'time',
    diagram: {"kind":"tape","values":[60,20],"labels":["1じかん","20ぷん"],"notes":["60ぷん",""],"caption":"1じかんと 20ぷんを つなごう"},
    difficulty: 'standard', answerType: 'input',
    question: 'えいがの ながさは 1じかん20ぷんです。これは なんぷんですか。（かずで こたえよう）',
    answer: '80', acceptedAnswers: ['80ぷん', '80分'], validationMode: 'number',
    hints: ['1じかんは なんぷんかな。', '1じかん＝60ぷん。それに 20ぷんを たそう。'],
    explanation: '1じかん＝60ぷん なので、60＋20＝80。1じかん20ぷんは 80ぷんです。',
    reviewed: true
  },
  {
    id: 'math_g2_volume_001', subject: 'math', gradeLevel: 2, unit: 'volume',
    diagram: {"kind":"measure","capacity":10,"values":[10,3],"labels":["1L","3dL"],"unit":"dL","caption":"1Lは 10dL。めもりを みよう"},
    difficulty: 'standard', answerType: 'input',
    question: 'ジュースが 1L3dL あります。これは なんdLですか。（かずで こたえよう）',
    answer: '13', acceptedAnswers: ['13dL', '13dl'], validationMode: 'number',
    hints: ['1Lは なんdLかな。', '1L＝10dL。それに 3dLを たそう。'],
    explanation: '1L＝10dL なので、10＋3＝13。1L3dLは 13dLです。',
    reviewed: true
  },
  {
    id: 'math_g2_multiply_004', subject: 'math', gradeLevel: 2, unit: 'multiply',
    diagram: {"kind":"objects","item":"person","groups":[4,4,4,4,4,4,3],"labels":["1くみ","2くみ","3くみ","4くみ","5くみ","6くみ","あまり"],"caption":"4にんずつの くみと あまりの ひとだよ"},
    difficulty: 'standard', answerType: 'choice',
    question: 'こどもが 4にんずつ 6くみ できて、3にん あまりました。こどもは ぜんぶで なんにんですか。',
    choices: ['27にん', '24にん', '13にん', '30にん'],
    answer: '27にん',
    hints: ['まず 4にんずつ 6くみ ぶんを かけざんで もとめよう。', 'あまった 3にんも わすれずに たそう。'],
    explanation: '4×6＝24、24＋3＝27 なので、こどもは ぜんぶで 27にんです。',
    inputForm: { answer: '27', acceptedAnswers: ['27にん', '27人'], validationMode: 'number', reviewed: true },
    reviewed: true
  },
  {
    id: 'math_g2_length_002', subject: 'math', gradeLevel: 2, unit: 'length',
    diagram: {"kind":"tape","values":[30,30,30,30,12],"labels":["30cm","30cm","30cm","30cm","12cm"],"stacked":true,"caption":"ものさし 4つぶんと 12cmだよ"},
    difficulty: 'advanced', answerType: 'input',
    question: '30cmの ものさしで つくえの よこの ながさを はかったら、ものさし 4つぶんと、さらに 12cm ありました。つくえの よこの ながさは なんcmですか。（cmの かずで こたえよう）',
    answer: '132', acceptedAnswers: ['132cm', '1m32cm'], validationMode: 'number',
    hints: ['ものさし 4つぶんは 30cmの 4つぶん。', '30×4 に 12を たそう。'],
    explanation: '30×4＝120、120＋12＝132 なので、132cm（1m32cm）です。',
    reviewed: true
  },

  // ===== Lv3（小学3年）：わり算・お金 =====
  {
    id: 'math_g3_division_001', subject: 'math', gradeLevel: 3, unit: 'division',
    diagram: {"kind":"objects","item":"bread","groups":[24],"labels":["24こ"],"caption":"パンを 4人で わけよう"},
    difficulty: 'basic', answerType: 'choice',
    question: 'パンが 24{個|こ} あります。4{人|にん}で {同|おな}じ {数|かず}ずつ {分|わ}けると、ひとり{分|ぶん}は {何個|なんこ}ですか。',
    choices: ['6{個|こ}', '4{個|こ}', '8{個|こ}', '20{個|こ}'],
    answer: '6{個|こ}',
    hints: ['{同|おな}じ {数|かず}ずつ {分|わ}けるときは わり{算|ざん}。', '24÷4 を {考|かんが}えよう。4の {段|だん}の 九九で {答|こた}えが 24に なるのは？'],
    explanation: '24÷4＝6 なので、ひとり{分|ぶん}は 6{個|こ}です。（4×6＝24 で たしかめられます）',
    inputForm: { answer: '6', acceptedAnswers: ['6個', '6こ'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g3_division_002', subject: 'math', gradeLevel: 3, unit: 'division',
    diagram: {"kind":"objects","item":"wood","groups":[29],"labels":["29本"],"caption":"4本ずつ たばにしよう"},
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
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g3_time_001', subject: 'math', gradeLevel: 3, unit: 'time',
    diagram: {"kind":"doubleLine","labels":["時刻","歩く時間"],"starts":["午前9時45分","0分"],"ends":["？","30分"],"caption":"出発してから 30分 歩くよ"},
    difficulty: 'basic', answerType: 'choice',
    question: '{午前|ごぜん}9{時|じ}45{分|ふん}に {家|いえ}を {出|で}て、30{分|ぷん} {歩|ある}いて {公園|こうえん}に {着|つ}きました。{着|つ}いた {時刻|じこく}は {何時何分|なんじなんぷん}ですか。',
    choices: ['{午前|ごぜん}10{時|じ}15{分|ふん}', '{午前|ごぜん}9{時|じ}75{分|ふん}', '{午前|ごぜん}10{時|じ}45{分|ふん}', '{午前|ごぜん}9{時|じ}15{分|ふん}'],
    answer: '{午前|ごぜん}10{時|じ}15{分|ふん}',
    hints: ['9{時|じ}45{分|ふん}から 10{時|じ}までは {何分|なんぷん}かな。', '15{分|ふん}で 10{時|じ}。のこりの 15{分|ふん}を たそう。'],
    explanation: '9{時|じ}45{分|ふん}から 15{分|ふん}で 10{時|じ}、さらに 15{分|ふん}で 10{時|じ}15{分|ふん}です。（60{分|ぷん}で 1{時間|じかん}なので、75{分|ふん}とは {言|い}いません）',
    inputForm: { answer: '午前10時15分', acceptedAnswers: ['10時15分', 'ごぜん10じ15ふん', '10じ15ふん', '午前10:15', '10:15'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g3_multiply_001', subject: 'math', gradeLevel: 3, unit: 'multiply',
    difficulty: 'basic', answerType: 'input',
    question: '1{個|こ} 45{円|えん}の あめを 6{個|こ} {買|か}います。{代金|だいきん}は {何円|なんえん}ですか。（{数|かず}で {答|こた}えよう）',
    answer: '270', acceptedAnswers: ['270円'], validationMode: 'number',
    hints: ['45{円|えん}が 6{個|こ}{分|ぶん}なので かけ{算|ざん}。', '45×6 を {筆算|ひっさん}で {計算|けいさん}しよう。'],
    explanation: '45×6＝270 なので、{代金|だいきん}は 270{円|えん}です。',
    reviewed: true
  },
  {
    id: 'math_g3_weight_001', subject: 'math', gradeLevel: 3, unit: 'weight',
    diagram: {"kind":"balance","weights":["1kg200g","800g"],"caption":"2つの にもつを いっしょに のせるよ"},
    difficulty: 'standard', answerType: 'input',
    question: '{重|おも}さ 1kg200gの {荷物|にもつ}と、{重|おも}さ 800gの {荷物|にもつ}を いっしょに はかりに のせます。{全部|ぜんぶ}で {何|なん}kgですか。（{数|かず}で {答|こた}えよう）',
    answer: '2', acceptedAnswers: ['2kg', '2000g'], validationMode: 'number',
    hints: ['1kg＝1000g だよ。', '1kg200g を gだけで {表|あらわ}すと 1200g。800gを たそう。'],
    explanation: '1kg200g＝1200g。1200＋800＝2000g＝2kg なので、{全部|ぜんぶ}で 2kgです。',
    reviewed: true
  },
  {
    id: 'math_g3_length_001', subject: 'math', gradeLevel: 3, unit: 'length',
    diagram: {"kind":"tape","values":[1300,900],"labels":["1km300m","900m"],"places":["家","駅","学校"],"caption":"家から 駅を とおって 学校へ"},
    difficulty: 'standard', answerType: 'input',
    question: '{家|いえ}から {駅|えき}までは 1km300m、{駅|えき}から {学校|がっこう}までは 900mです。{家|いえ}から {駅|えき}を {通|とお}って {学校|がっこう}まで {行|い}く {道|みち}のりは {何|なん}mですか。（{数|かず}で {答|こた}えよう）',
    answer: '2200', acceptedAnswers: ['2200m', '2km200m'], validationMode: 'number',
    hints: ['1km＝1000m だよ。', '1km300m を mだけで {表|あらわ}してから、900mを たそう。'],
    explanation: '1km300m＝1300m。1300＋900＝2200 なので、2200m（2km200m）です。',
    reviewed: true
  },
  {
    id: 'math_g3_division_004', subject: 'math', gradeLevel: 3, unit: 'division',
    diagram: {"kind":"objects","item":"flower","groups":[32],"labels":["32本"],"caption":"花を 5本ずつ たばにしよう"},
    difficulty: 'standard', answerType: 'choice',
    question: '{花|はな}が 32{本|ほん} あります。5{本|ほん}ずつ たばに すると、どう なりますか。',
    choices: ['6たば できて、2{本|ほん} あまる', '6たば できて、あまりは ない', '7たば できて、3{本|ほん} {足|た}りない', '5たば できて、7{本|ほん} あまる'],
    answer: '6たば できて、2{本|ほん} あまる',
    hints: ['32÷5 を {考|かんが}えよう。', '5×6＝30、5×7＝35。32を こえないのは どちら？'],
    explanation: '32÷5＝6 あまり 2 です。5{本|ほん}の たばが 6たば できて、2{本|ほん} あまります。（あまりは わる{数|かず}の 5より {小|ちい}さく なります）',
    reviewed: true
  },
  {
    id: 'math_g3_circle_001', subject: 'math', gradeLevel: 3, unit: 'circle',
    diagram: {"kind":"circle","radius":6,"count":4,"diameter":12,"unit":"cm","caption":"ボールが 1列に ぴったり 入っているよ"},
    difficulty: 'advanced', answerType: 'input',
    question: '{直径|ちょっけい} 12cmの ボールが 4{個|こ}、{箱|はこ}の {中|なか}に 1{列|れつ}に ぴったり {入|はい}って います。{箱|はこ}の {内側|うちがわ}の {長|なが}さは {何|なん}cmですか。（{数|かず}で {答|こた}えよう）',
    answer: '48', acceptedAnswers: ['48cm'], validationMode: 'number',
    hints: ['ボール 1{個|こ}の はばは、{直径|ちょっけい}と {同|おな}じ 12cm。', 'ボールが 4{個|こ} ならんで いるので 12×4。'],
    explanation: 'ボールの はばは {直径|ちょっけい}の 12cm なので、12×4＝48cm です。',
    reviewed: true
  },

  // ===== Lv4（小学4年）：面積・小数・わり算 =====
  {
    id: 'math_g4_area_001', subject: 'math', gradeLevel: 4, unit: 'area',
    diagram: {"kind":"rect","w":12,"h":8,"unit":"m","caption":"畑の たてと よこの 長さ"},
    difficulty: 'basic', answerType: 'choice',
    question: 'たて 8m、よこ 12mの {長方形|ちょうほうけい}の {畑|はたけ}が あります。この {畑|はたけ}の {面積|めんせき}は {何|なん}m²ですか。',
    choices: ['96m²', '20m²', '40m²', '960m²'],
    answer: '96m²',
    hints: ['{長方形|ちょうほうけい}の {面積|めんせき}＝たて×よこ', '8×12 を {計算|けいさん}しよう。'],
    explanation: '{長方形|ちょうほうけい}の {面積|めんせき}は たて×よこ なので、8×12＝96。96m²です。（40m は まわりの {長|なが}さです）',
    inputForm: { answer: '96', acceptedAnswers: ['96m²', '96m2', '96平方メートル'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g4_decimal_001', subject: 'math', gradeLevel: 4, unit: 'decimal_calc',
    difficulty: 'standard', answerType: 'input',
    question: '1{本|ぽん}に 2.4Lの {灯油|とうゆ}が {入|はい}った {容器|ようき}が 5{本|ほん} あります。{灯油|とうゆ}は {全部|ぜんぶ}で {何|なん}Lですか。（{数|かず}で {答|こた}えよう）',
    answer: '12', acceptedAnswers: ['12L'], validationMode: 'number',
    hints: ['2.4Lが 5つ {分|ぶん}なので かけ{算|ざん}。', '24×5 を {計算|けいさん}して、{小数点|しょうすうてん}の {位置|いち}を {考|かんが}えよう。'],
    explanation: '2.4×5＝12.0 なので、{灯油|とうゆ}は {全部|ぜんぶ}で 12Lです。',
    reviewed: true
  },
  {
    id: 'math_g4_division_001', subject: 'math', gradeLevel: 4, unit: 'divide1',
    difficulty: 'standard', answerType: 'input',
    question: '{缶詰|かんづめ}が 135{個|こ} あります。1{箱|はこ}に 8{個|こ}ずつ つめていきます。{全部|ぜんぶ}の {缶詰|かんづめ}を つめるには、{箱|はこ}は {何箱|なんはこ} いりますか。（{数|かず}で {答|こた}えよう）',
    answer: '17', acceptedAnswers: ['17箱'], validationMode: 'number',
    hints: ['135÷8 を {筆算|ひっさん}で {計算|けいさん}しよう。', 'あまった {缶詰|かんづめ}を {入|い}れる {箱|はこ}も {必要|ひつよう}だよ。'],
    explanation: '135÷8＝16 あまり 7 です。あまりの 7{個|こ}を {入|い}れる {箱|はこ}が もう1つ いるので、16＋1＝17{箱|はこ}です。',
    reviewed: true
  },
  {
    id: 'math_g4_area_002', subject: 'math', gradeLevel: 4, unit: 'area',
    diagram: {"kind":"nestedRect","w":20,"h":20,"innerW":8,"innerH":5,"unit":"m","caption":"土地の 中に 小屋があるよ"},
    difficulty: 'advanced', answerType: 'input',
    question: '1{辺|ぺん}が 20mの {正方形|せいほうけい}の {土地|とち}が あります。その {中|なか}に、たて 5m、よこ 8mの {長方形|ちょうほうけい}の {小屋|こや}を {建|た}てました。{小屋|こや}の ないところの {面積|めんせき}は {何|なん}m²ですか。（{数|かず}で {答|こた}えよう）',
    answer: '360', acceptedAnswers: ['360m2', '360m²'], validationMode: 'number',
    hints: ['まず {土地|とち} {全体|ぜんたい}の {面積|めんせき}を {求|もと}めよう。', '{全体|ぜんたい}から {小屋|こや}の {面積|めんせき}を ひこう。'],
    explanation: '{土地|とち}は 20×20＝400m²、{小屋|こや}は 5×8＝40m²。400−40＝360m²です。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g4_angle_001', subject: 'math', gradeLevel: 4, unit: 'angle',
    diagram: {"kind":"clock","minute":0,"toMinute":15,"elapsed":15,"caption":"長い はりが 15分間に 回るところ"},
    difficulty: 'basic', answerType: 'choice',
    question: '{時計|とけい}の {長|なが}い {針|はり}が 15{分間|ふんかん}に {回|まわ}る {角度|かくど}は {何度|なんど}ですか。',
    choices: ['90°', '15°', '180°', '45°'],
    answer: '90°',
    hints: ['{長|なが}い {針|はり}は 60{分|ぷん}で 1{回転|かいてん}（360°）するよ。', '15{分|ふん}は 60{分|ぷん}の 4{分|ぶん}の1。'],
    explanation: '{長|なが}い {針|はり}は 60{分|ぷん}で 360°{回|まわ}ります。15{分|ふん}は その 4{分|ぶん}の1 なので、360÷4＝90°です（{直角|ちょっかく}）。',
    inputForm: { answer: '90', acceptedAnswers: ['90°', '90度'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g4_largenum_001', subject: 'math', gradeLevel: 4, unit: 'large',
    difficulty: 'basic', answerType: 'input',
    question: '1まい 1000{円|えん}の チケットが 250まい {売|う}れました。{売|う}り{上|あ}げは {全部|ぜんぶ}で {何円|なんえん}ですか。（{数|かず}で {答|こた}えよう）',
    answer: '250000', acceptedAnswers: ['250000円', '25万円', '25万'], validationMode: 'number',
    hints: ['1000{円|えん}が 250まい{分|ぶん}なので かけ{算|ざん}。', '250×1000 は、250の {後|うし}ろに 0を 3つ つけた {数|かず}。'],
    explanation: '1000×250＝250000 なので、{売|う}り{上|あ}げは 250000{円|えん}（25{万円|まんえん}）です。',
    reviewed: true
  },
  {
    id: 'math_g4_fraction_001', subject: 'math', gradeLevel: 4, unit: 'fraction',
    diagram: {"kind":"fractionSum","n":3,"m":4,"d":5,"separate":true,"whole":"1L","caption":"それぞれの 1Lを 5つに分けた図"},
    difficulty: 'standard', answerType: 'input',
    question: 'ジュースが 3/5L {入|はい}った びんと、4/5L {入|はい}った びんが あります。{合|あ}わせて {何|なん}Lですか。（{分数|ぶんすう}で {答|こた}えよう。{仮分数|かぶんすう}でも {帯分数|たいぶんすう}でも よい。{帯分数|たいぶんすう}は「1と1/3」のように {書|か}こう）',
    answer: '7/5', acceptedAnswers: ['1と2/5', '1 2/5', '7/5L', '1と2/5L'], validationMode: 'exact',
    hints: ['{分母|ぶんぼ}が {同|おな}じ {分数|ぶんすう}の たし{算|ざん}は、{分子|ぶんし}どうしを たすよ。', '3＋4＝7。{分母|ぶんぼ}は 5の まま。'],
    explanation: '3/5＋4/5＝7/5 です。{帯分数|たいぶんすう}で {表|あらわ}すと 1と2/5（1 2/5）Lです。',
    reviewed: true
  },
  {
    id: 'math_g4_rounding_001', subject: 'math', gradeLevel: 4, unit: 'round',
    diagram: {"kind":"numberline","start":4800,"end":4900,"step":50,"marks":[4827],"caption":"4827が どこにあるか みよう"},
    difficulty: 'standard', answerType: 'input',
    question: 'ある {日|ひ}の {雪|ゆき}まつりの {入場者|にゅうじょうしゃ}は 4827{人|にん}でした。{四捨五入|ししゃごにゅう}して {百|ひゃく}の{位|くらい}までの がい{数|すう}に すると {何人|なんにん}ですか。（{数|かず}で {答|こた}えよう）',
    answer: '4800', acceptedAnswers: ['4800人'], validationMode: 'number',
    hints: ['{百|ひゃく}の{位|くらい}までの がい{数|すう}に するには、その 1つ {下|した}の {十|じゅう}の{位|くらい}を {見|み}るよ。', '{十|じゅう}の{位|くらい}は 2。0〜4 なら {切|き}り{捨|す}て。'],
    explanation: '{十|じゅう}の{位|くらい}の {数字|すうじ}は 2 なので {切|き}り{捨|す}てて、4800{人|にん}です。',
    reviewed: true
  },
  {
    id: 'math_g4_area_003', subject: 'math', gradeLevel: 4, unit: 'area',
    diagram: {"kind":"rect","w":30,"h":30,"unit":"cm","caption":"正方形の タイルの 長さ"},
    difficulty: 'standard', answerType: 'choice',
    question: '1{辺|ぺん}が 30cmの {正方形|せいほうけい}の タイルが あります。このタイル 1まいの {面積|めんせき}は {何|なん}cm²ですか。',
    choices: ['900cm²', '120cm²', '60cm²', '9000cm²'],
    answer: '900cm²',
    hints: ['{正方形|せいほうけい}の {面積|めんせき}＝1{辺|ぺん}×1{辺|ぺん}', '30×30 を {計算|けいさん}しよう。'],
    explanation: '30×30＝900 なので、900cm²です。（120cm は まわりの {長|なが}さです）',
    inputForm: { answer: '900', acceptedAnswers: ['900cm²', '900cm2', '900平方センチメートル'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g4_decimal_002', subject: 'math', gradeLevel: 4, unit: 'decimal_calc',
    difficulty: 'advanced', answerType: 'input',
    question: '{長|なが}さ 3.6mの リボンを、4{人|にん}で {同|おな}じ {長|なが}さずつ {分|わ}けます。ひとり{分|ぶん}は {何|なん}mですか。（{数|かず}で {答|こた}えよう）',
    answer: '0.9', acceptedAnswers: ['0.9m', '90cm'], validationMode: 'number',
    hints: ['{同|おな}じ {長|なが}さずつ {分|わ}けるので わり{算|ざん}。3.6÷4', '3.6m＝360cm と {考|かんが}えても よいよ。'],
    explanation: '3.6÷4＝0.9 なので、ひとり{分|ぶん}は 0.9m（90cm）です。',
    reviewed: true
  },

  // ===== Lv5（小学5年）：平均・割合・速さ・体積 =====
  {
    id: 'math_g5_average_001', subject: 'math', gradeLevel: 5, unit: 'average',
    diagram: {"kind":"bars","values":[12,15,9],"labels":["1日目","2日目","3日目"],"caption":"3日間に つった 魚の数"},
    difficulty: 'basic', answerType: 'choice',
    question: '{3日間|みっかかん}で つった {魚|さかな}の {数|かず}は、12{匹|ひき}、15{匹|ひき}、9{匹|ひき}でした。1{日|にち}あたりの {平均|へいきん}は {何匹|なんびき}ですか。',
    choices: ['12{匹|ひき}', '11{匹|ひき}', '13{匹|ひき}', '36{匹|ひき}'],
    answer: '12{匹|ひき}',
    hints: ['{平均|へいきん}＝{合計|ごうけい}÷{個数|こすう}', 'まず {3日間|みっかかん}の {合計|ごうけい}を {求|もと}めよう。'],
    explanation: '{合計|ごうけい}は 12＋15＋9＝36{匹|ひき}。36÷3＝12 なので、{平均|へいきん}は 12{匹|ひき}です。',
    inputForm: { answer: '12', acceptedAnswers: ['12匹', '12ひき'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g5_percent_001', subject: 'math', gradeLevel: 5, unit: 'percent',
    diagram: {"kind":"band","parts":[30,10],"labels":["住んでいる 30人",""],"totalLabel":"定員 40人","caption":"住んでいる 人数と 定員を くらべよう"},
    difficulty: 'standard', answerType: 'input',
    question: '{定員|ていいん}が 40{人|にん}の {住宅|じゅうたく}に、30{人|にん}が {住|す}んで います。{住|す}んでいる {人数|にんずう}は {定員|ていいん}の {何|なん}％ですか。（{数|かず}で {答|こた}えよう）',
    answer: '75', acceptedAnswers: ['75%'], validationMode: 'number',
    hints: ['{割合|わりあい}＝くらべる{量|りょう}÷もとにする{量|りょう}', 'もとにする{量|りょう}は {定員|ていいん}の 40{人|にん}。{割合|わりあい}に 100を かけると ％に なるよ。'],
    explanation: '30÷40＝0.75。0.75×100＝75 なので、75％です。',
    reviewed: true
  },
  {
    id: 'math_g5_speed_001', subject: 'math', gradeLevel: 5, unit: 'speed',
    diagram: {"kind":"doubleLine","labels":["時間","道のり"],"ends":["2時間","36km"],"caption":"時間と 道のりの 関係を みよう"},
    difficulty: 'standard', answerType: 'input',
    question: '{犬|いぬ}ぞりが 2{時間|じかん}で 36km {進|すす}みました。この {犬|いぬ}ぞりの {速|はや}さは {時速|じそく}{何|なん}kmですか。（{数|かず}で {答|こた}えよう）',
    answer: '18', acceptedAnswers: ['18km', '時速18km'], validationMode: 'number',
    hints: ['{時速|じそく}は 1{時間|じかん}あたりに {進|すす}む {道|みち}のり。', '{速|はや}さ＝{道|みち}のり÷{時間|じかん}'],
    explanation: '36÷2＝18 なので、{時速|じそく}18kmです。',
    reviewed: true
  },
  {
    id: 'math_g5_volume_001', subject: 'math', gradeLevel: 5, unit: 'volume',
    diagram: {"kind":"solid","w":30,"depth":50,"h":40,"water":20,"unit":"cm","caption":"水そうの 長さと 水の深さ"},
    difficulty: 'advanced', answerType: 'input',
    question: '{内側|うちがわ}の {長|なが}さが、たて 50cm、よこ 30cm、{深|ふか}さ 40cmの {直方体|ちょくほうたい}の {水|みず}そうに、{深|ふか}さ 20cmまで {水|みず}が {入|はい}っています。{水|みず}は {何|なん}Lですか。（{数|かず}で {答|こた}えよう）',
    answer: '30', acceptedAnswers: ['30L'], validationMode: 'number',
    hints: ['{水|みず}の {部分|ぶぶん}は たて50cm、よこ30cm、{高|たか}さ20cmの {直方体|ちょくほうたい}。', '1L＝1000cm³ だよ。'],
    explanation: '{水|みず}の {体積|たいせき}は 50×30×20＝30000cm³。1L＝1000cm³ なので、30000÷1000＝30Lです。',
    reviewed: true
  },
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g5_area_001', subject: 'math', gradeLevel: 5, unit: 'area',
    diagram: {"kind":"triangle","base":8,"height":5,"unit":"cm","caption":"底辺と 点線の 高さを 使おう"},
    difficulty: 'basic', answerType: 'choice',
    question: '{底辺|ていへん}が 8cm、{高|たか}さが 5cmの {三角形|さんかくけい}の {旗|はた}が あります。この {旗|はた}の {面積|めんせき}は {何|なん}cm²ですか。',
    choices: ['20cm²', '40cm²', '13cm²', '26cm²'],
    answer: '20cm²',
    hints: ['{三角形|さんかくけい}の {面積|めんせき}＝{底辺|ていへん}×{高|たか}さ÷2', '8×5 を 2で わろう。'],
    explanation: '8×5÷2＝20 なので、20cm²です。（÷2 を わすれると 40 に なって しまいます）',
    inputForm: { answer: '20', acceptedAnswers: ['20cm²', '20cm2'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g5_percent_002', subject: 'math', gradeLevel: 5, unit: 'percent',
    diagram: {"kind":"band","parts":[20,80],"labels":["20％引き","残り"],"totalLabel":"定価 800円（100％）","caption":"定価の 20％ぶんを 引くよ"},
    difficulty: 'basic', answerType: 'input',
    question: '{定価|ていか} 800{円|えん}の てぶくろが、{定価|ていか}の 20％{引|び}きで {売|う}られて います。ねだんは {何円|なんえん}ですか。（{数|かず}で {答|こた}えよう）',
    answer: '640', acceptedAnswers: ['640円'], validationMode: 'number',
    hints: ['20％{引|び}きは、{定価|ていか}の 80％の ねだん。', '800×0.8 を {計算|けいさん}しよう。'],
    explanation: '20％{引|び}きなので {定価|ていか}の 80％。800×0.8＝640{円|えん}です。（800×0.2＝160{円|えん} {安|やす}く なる、と {考|かんが}えても よい）',
    reviewed: true
  },
  {
    id: 'math_g5_unit_001', subject: 'math', gradeLevel: 5, unit: 'unit',
    difficulty: 'standard', answerType: 'input',
    question: 'ガソリン 1Lで 15km {走|はし}る {雪上車|せつじょうしゃ}が あります。ガソリン 4Lでは {何|なん}km {走|はし}れますか。（{数|かず}で {答|こた}えよう）',
    answer: '60', acceptedAnswers: ['60km'], validationMode: 'number',
    hints: ['1Lあたり 15km {走|はし}るよ。', '15×4 を {計算|けいさん}しよう。'],
    explanation: '1Lあたり 15km なので、15×4＝60km {走|はし}れます。',
    reviewed: true
  },
  {
    id: 'math_g5_speed_002', subject: 'math', gradeLevel: 5, unit: 'speed',
    difficulty: 'standard', answerType: 'input',
    question: '{時速|じそく} 40kmで 2{時間|じかん}30{分|ぷん} {走|はし}ると、{何|なん}km {進|すす}みますか。（{数|かず}で {答|こた}えよう）',
    answer: '100', acceptedAnswers: ['100km'], validationMode: 'number',
    hints: ['2{時間|じかん}30{分|ぷん}を「{時間|じかん}」だけで {表|あらわ}すと {何時間|なんじかん}かな。', '30{分|ぷん}＝0.5{時間|じかん}。{道|みち}のり＝{速|はや}さ×{時間|じかん}'],
    explanation: '2{時間|じかん}30{分|ぷん}＝2.5{時間|じかん}。40×2.5＝100 なので、100km {進|すす}みます。',
    reviewed: true
  },
  {
    id: 'math_g5_fraction_001', subject: 'math', gradeLevel: 5, unit: 'fraction',
    diagram: {"kind":"pie","numerators":[1,1],"denominators":[2,3],"labels":["兄：1/2","弟：1/3"],"caption":"同じ大きさの ピザで それぞれの分を みよう"},
    difficulty: 'standard', answerType: 'choice',
    question: 'ピザの 1/2 を {兄|あに}が、1/3 を {弟|おとうと}が {食|た}べました。2{人|り}で {合|あ}わせて ピザの どれだけを {食|た}べましたか。',
    choices: ['5/6', '2/5', '1/6', '2/6'],
    answer: '5/6',
    hints: ['{分母|ぶんぼ}の ちがう {分数|ぶんすう}の たし{算|ざん}は、{通分|つうぶん}してから たすよ。', '1/2＝3/6、1/3＝2/6。'],
    explanation: '1/2＋1/3＝3/6＋2/6＝5/6 です。（{分母|ぶんぼ}どうし、{分子|ぶんし}どうしを たして 2/5 と しないように {注意|ちゅうい}しましょう）',
    inputForm: { question: 'ピザの 1/2 を {兄|あに}が、1/3 を {弟|おとうと}が {食|た}べました。2{人|り}で {合|あ}わせて ピザの 何分の何を 食べましたか。（分数で 答えよう）', acceptedAnswers: ['6分の5', '6ぶんの5'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g5_average_002', subject: 'math', gradeLevel: 5, unit: 'average',
    difficulty: 'advanced', answerType: 'input',
    question: '4{回|かい}の テストの {平均|へいきん}は 80{点|てん}でした。5{回目|かいめ}の テストで {何点|なんてん} とれば、5{回|かい}の {平均|へいきん}が 82{点|てん}に なりますか。（{数|かず}で {答|こた}えよう）',
    answer: '90', acceptedAnswers: ['90点'], validationMode: 'number',
    hints: ['{合計|ごうけい}＝{平均|へいきん}×{回数|かいすう}', '4{回|かい}の {合計|ごうけい}は 80×4、5{回|かい}の {合計|ごうけい}は 82×5。その {差|さ}が 5{回目|かいめ}の {点数|てんすう}。'],
    explanation: '4{回|かい}の {合計|ごうけい}は 80×4＝320{点|てん}、5{回|かい}で {平均|へいきん} 82{点|てん}に するには {合計|ごうけい} 82×5＝410{点|てん}。410−320＝90{点|てん}です。',
    reviewed: true
  },

  // ===== Lv6（小学6年）：比・分数・円の面積・比例 =====
  {
    id: 'math_g6_ratio_001', subject: 'math', gradeLevel: 6, unit: 'ratio',
    diagram: {"kind":"band","parts":[3,2],"labels":["木材：3","石材：2"],"known":["15個","？個"],"totalLabel":"木材と 石材の 比","caption":"同じ1つ分で 比を あらわした帯"},
    difficulty: 'basic', answerType: 'choice',
    question: '{木材|もくざい}と {石材|せきざい}を 3：2の {割合|わりあい}で {使|つか}います。{木材|もくざい}を 15{個|こ} {使|つか}うとき、{石材|せきざい}は {何個|なんこ} {使|つか}いますか。',
    choices: ['10{個|こ}', '6{個|こ}', '14{個|こ}', '22{個|こ}'],
    answer: '10{個|こ}',
    hints: ['3：2＝15：□ と {考|かんが}えよう。', '3を {何倍|なんばい}すると 15に なるかな。'],
    explanation: '3×5＝15 なので、2も 5{倍|ばい}して 2×5＝10。{石材|せきざい}は 10{個|こ}です。',
    inputForm: { answer: '10', acceptedAnswers: ['10個', '10こ'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g6_fraction_001', subject: 'math', gradeLevel: 6, unit: 'fraction',
    diagram: {"kind":"fraction","n":2,"d":3,"whole":"1kg","caption":"1kgを 3つに分けた 2つ分"},
    difficulty: 'standard', answerType: 'input',
    question: '2/3kgの {肉|にく}を 4{人|にん}で {同|おな}じ {重|おも}さずつ {分|わ}けます。ひとり{分|ぶん}は {何|なん}kgですか。（{分数|ぶんすう}で {答|こた}えよう。{約分|やくぶん}して {答|こた}えること。{例|れい}：3/5）',
    answer: '1/6', acceptedAnswers: ['1/6kg'], validationMode: 'exact',
    hints: ['{同|おな}じ {重|おも}さずつ {分|わ}けるので わり{算|ざん}。2/3÷4', '{分数|ぶんすう}÷{整数|せいすう}は、{分母|ぶんぼ}に その {整数|せいすう}を かけるよ。'],
    explanation: '2/3÷4＝2/(3×4)＝2/12＝1/6 なので、ひとり{分|ぶん}は 1/6kgです。',
    reviewed: true
  },
  {
    id: 'math_g6_circle_001', subject: 'math', gradeLevel: 6, unit: 'circle',
    diagram: {"kind":"circle","radius":5,"unit":"m","caption":"中心から 円周までが 半径だよ"},
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
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g6_case_001', subject: 'math', gradeLevel: 6, unit: 'case',
    diagram: {"kind":"objects","item":"person","groups":[3],"labels":[""],"names":["A","B","C"],"caption":"3人の ならび方を 考えよう"},
    difficulty: 'basic', answerType: 'choice',
    question: 'A・B・Cの 3{人|にん}が 1{列|れつ}に ならびます。ならび{方|かた}は {全部|ぜんぶ}で {何通|なんとお}り ありますか。',
    choices: ['6{通|とお}り', '3{通|とお}り', '9{通|とお}り', '4{通|とお}り'],
    answer: '6{通|とお}り',
    hints: ['{先頭|せんとう}が A の ときの ならび{方|かた}を {書|か}き{出|だ}して みよう（ABC、ACB）。', '{先頭|せんとう}は 3{通|とお}り、その それぞれで 2{通|とお}り ずつ。'],
    explanation: '{先頭|せんとう}が A・B・C の 3{通|とお}り、それぞれ {残|のこ}りの 2{人|り}の ならび{方|かた}が 2{通|とお}り あるので、3×2＝6{通|とお}りです（ABC、ACB、BAC、BCA、CAB、CBA）。',
    inputForm: { answer: '6', acceptedAnswers: ['6通り', '6とおり'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g6_fraction_002', subject: 'math', gradeLevel: 6, unit: 'fraction',
    difficulty: 'basic', answerType: 'input',
    question: '1mの {重|おも}さが 3/4kgの {鉄|てつ}の ぼうが あります。この ぼう 2/3mの {重|おも}さは {何|なん}kgですか。（{分数|ぶんすう}で {答|こた}えよう。{約分|やくぶん}して {答|こた}えること。{例|れい}：3/5）',
    answer: '1/2', acceptedAnswers: ['1/2kg'], validationMode: 'exact',
    hints: ['1mあたりの {重|おも}さ × {長|なが}さ で {求|もと}めるよ。', '3/4×2/3 を {計算|けいさん}して、{約分|やくぶん}しよう。'],
    explanation: '3/4×2/3＝6/12＝1/2 なので、1/2kgです。',
    reviewed: true
  },
  {
    id: 'math_g6_volume_001', subject: 'math', gradeLevel: 6, unit: 'volume',
    diagram: {"kind":"solid","shape":"triangularPrism","baseArea":12,"h":5,"unit":"cm","caption":"三角形の 底面積と 柱の高さ"},
    difficulty: 'standard', answerType: 'input',
    question: '{底面積|ていめんせき}が 12cm²、{高|たか}さが 5cmの {三角柱|さんかくちゅう}の {体積|たいせき}は {何|なん}cm³ですか。（{数|かず}で {答|こた}えよう）',
    answer: '60', acceptedAnswers: ['60cm3', '60cm³'], validationMode: 'number',
    hints: ['{角柱|かくちゅう}の {体積|たいせき}＝{底面積|ていめんせき}×{高|たか}さ', '12×5 を {計算|けいさん}しよう。'],
    explanation: '{角柱|かくちゅう}の {体積|たいせき}は {底面積|ていめんせき}×{高|たか}さ なので、12×5＝60cm³です。',
    reviewed: true
  },
  {
    id: 'math_g6_inverse_001', subject: 'math', gradeLevel: 6, unit: 'inverse',
    difficulty: 'standard', answerType: 'input',
    question: '{時速|じそく} 60kmで 2{時間|じかん} かかる {道|みち}のりを、{時速|じそく} 40kmで {進|すす}むと {何時間|なんじかん} かかりますか。（{数|かず}で {答|こた}えよう）',
    answer: '3', acceptedAnswers: ['3時間'], validationMode: 'number',
    hints: ['まず {道|みち}のりを {求|もと}めよう。60×2', '{道|みち}のりが {同|おな}じとき、{速|はや}さと かかる {時間|じかん}は {反比例|はんぴれい}するよ。'],
    explanation: '{道|みち}のりは 60×2＝120km。120÷40＝3 なので、3{時間|じかん}です。',
    reviewed: true
  },
  {
    id: 'math_g6_scale_001', subject: 'math', gradeLevel: 6, unit: 'scale',
    diagram: {"kind":"doubleLine","labels":["地図","縮尺"],"ends":["4cm","1：25000"],"caption":"地図の 長さと 縮尺を みよう"},
    difficulty: 'standard', answerType: 'choice',
    question: '{縮尺|しゅくしゃく} 1：25000の {地図|ちず}で、4cmの {長|なが}さは、{実際|じっさい}には {何|なん}kmですか。',
    choices: ['1km', '100m', '10km', '4km'],
    answer: '1km',
    hints: ['{実際|じっさい}の {長|なが}さは、{地図|ちず}の {長|なが}さの 25000{倍|ばい}。', '4×25000＝100000cm。1km＝100000cm。'],
    explanation: '4×25000＝100000cm＝1000m＝1km です。',
    inputForm: { answer: '1', acceptedAnswers: ['1km', '1キロ', '1キロメートル'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g6_ratio_002', subject: 'math', gradeLevel: 6, unit: 'ratio',
    diagram: {"kind":"band","parts":[5,3],"labels":["姉：5","妹：3"],"totalLabel":"全体 120cm","caption":"リボンを 同じ1つ分の 5：3に 分けるよ"},
    difficulty: 'advanced', answerType: 'input',
    question: '{長|なが}さ 120cmの リボンを、{姉|あね}と {妹|いもうと}で {長|なが}さの {比|ひ}が 5：3に なるように {分|わ}けます。{姉|あね}の リボンは {何|なん}cmですか。（{数|かず}で {答|こた}えよう）',
    answer: '75', acceptedAnswers: ['75cm'], validationMode: 'number',
    hints: ['{全体|ぜんたい}は 5＋3＝8 と {考|かんが}えよう。', '{姉|あね}は {全体|ぜんたい}の 5/8。120×5/8'],
    explanation: '{全体|ぜんたい}を 8とすると {姉|あね}は 5。120×5/8＝75 なので、{姉|あね}の リボンは 75cm（{妹|いもうと}は 45cm）です。',
    reviewed: true
  },

  // ===== Lv7（中学1年）：正負の数・一次方程式 =====
  {
    id: 'math_g7_integer_001', subject: 'math', gradeLevel: 7, unit: 'integer',
    diagram: {"kind":"numberline","start":-10,"end":5,"step":5,"marks":[-8,3],"markLabels":["朝 −8℃","昼 3℃"],"caption":"朝と昼の気温の位置"},
    difficulty: 'basic', answerType: 'choice',
    question: '{朝|あさ}の {気温|きおん}は −8℃、{昼|ひる}の {気温|きおん}は 3℃でした。{昼|ひる}の {気温|きおん}は {朝|あさ}より {何|なん}℃{高|たか}いですか。',
    choices: ['11℃', '5℃', '−5℃', '−11℃'],
    answer: '11℃',
    hints: ['{差|さ}は（{昼|ひる}の {気温|きおん}）−（{朝|あさ}の {気温|きおん}）で {求|もと}める。', '3−(−8) は 3＋8 と {同|おな}じ。'],
    explanation: '3−(−8)＝3＋8＝11 なので、{昼|ひる}は {朝|あさ}より 11℃{高|たか}いです。',
    inputForm: { answer: '11', acceptedAnswers: ['11℃', '11度'], validationMode: 'number', reviewed: false },
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
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g7_integer_002', subject: 'math', gradeLevel: 7, unit: 'integer',
    diagram: {"kind":"numberline","start":-5,"end":5,"step":5,"hideNegative":true,"marks":[5],"markLabels":["＋5m"],"directions":["西","東"],"caption":"0を基準に東を正とする"},
    difficulty: 'basic', answerType: 'choice',
    question: '{東|ひがし}へ 5m {進|すす}むことを ＋5m と {表|あらわ}すとき、−5m は どのような ことを {表|あらわ}すか。',
    choices: ['{西|にし}へ 5m {進|すす}む', '{東|ひがし}へ 5m {進|すす}む', '{北|きた}へ 5m {進|すす}む', 'その {場|ば}に 5{分|ふん} とまる'],
    answer: '{西|にし}へ 5m {進|すす}む',
    hints: ['{負|ふ}の {数|かず}は、{反対|はんたい}の {向|む}きや {性質|せいしつ}を {表|あらわ}す。', '{東|ひがし}の {反対|はんたい}の {向|む}きは？'],
    explanation: '＋が {東|ひがし}へ {進|すす}むことなら、−は その {反対|はんたい}の {西|にし}へ {進|すす}むことを {表|あらわ}します。',
    inputForm: { answer: '西へ5m進む', acceptedAnswers: ['西へ 5m 進む', '西に5m進む', '西へ5m', '西に5m', '西へ5メートル進む'], validationMode: 'kana-insensitive', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g7_expression_001', subject: 'math', gradeLevel: 7, unit: 'expression',
    difficulty: 'basic', answerType: 'input',
    question: '1{本|ぽん} x{円|えん}の えんぴつ 5{本|ほん}と、100{円|えん}の ノート 1{冊|さつ}を {買|か}ったときの {代金|だいきん}は（5x＋100）{円|えん}と {表|あらわ}せる。x＝60 のとき、{代金|だいきん}は {何円|なんえん}か。（{数|かず}で {答|こた}えなさい）',
    answer: '400', acceptedAnswers: ['400円'], validationMode: 'number',
    hints: ['5x＋100 の x に 60 を {代入|だいにゅう}する。', '5×60＋100 を {計算|けいさん}する。'],
    explanation: '5×60＋100＝300＋100＝400 なので、{代金|だいきん}は 400{円|えん}です。',
    reviewed: true
  },
  {
    id: 'math_g7_equation_004', subject: 'math', gradeLevel: 7, unit: 'equation',
    difficulty: 'standard', answerType: 'input',
    question: '{兄|あに}の {年齢|ねんれい}は {弟|おとうと}の {年齢|ねんれい}の 3{倍|ばい}で、2{人|り}の {年齢|ねんれい}の {和|わ}は 24{歳|さい}である。{弟|おとうと}は {何歳|なんさい}か。（{数|かず}で {答|こた}えなさい）',
    answer: '6', acceptedAnswers: ['6歳'], validationMode: 'number',
    hints: ['{弟|おとうと}の {年齢|ねんれい}を x{歳|さい}とすると、{兄|あに}は 3x{歳|さい}。', 'x＋3x＝24 を {解|と}く。'],
    explanation: '{弟|おとうと}を x{歳|さい}とすると x＋3x＝24、4x＝24、x＝6。{弟|おとうと}は 6{歳|さい}（{兄|あに}は 18{歳|さい}）です。',
    reviewed: true
  },
  {
    id: 'math_g7_proportion_001', subject: 'math', gradeLevel: 7, unit: 'proportion',
    diagram: {"kind":"table","head":["x","y"],"rows":[[4,12],[7,"？"]],"caption":"比例するxとyの対応"},
    difficulty: 'standard', answerType: 'input',
    question: 'y は x に {比例|ひれい}し、x＝4 のとき y＝12 である。x＝7 のときの y の {値|あたい}を {求|もと}めなさい。',
    answer: '21', validationMode: 'number',
    hints: ['{比例|ひれい}の {式|しき}は y＝ax。まず a を {求|もと}める。', '12＝a×4 より a＝3。'],
    explanation: 'y＝ax に x＝4、y＝12 を {代入|だいにゅう}して a＝3。y＝3x に x＝7 を {代入|だいにゅう}すると y＝21 です。',
    reviewed: true
  },
  {
    id: 'math_g7_data_001', subject: 'math', gradeLevel: 7, unit: 'data',
    diagram: {"kind":"table","head":["人","得点"],"rows":[["A",3],["B",7],["C",5],["D",9],["E",6]],"caption":"元の順序の得点（点）"},
    difficulty: 'standard', answerType: 'choice',
    question: '5{人|にん}の {小|しょう}テストの {得点|とくてん}は 3、7、5、9、6（{点|てん}）だった。{中央値|ちゅうおうち}（メジアン）は どれか。',
    choices: ['6{点|てん}', '5{点|てん}', '7{点|てん}', '30{点|てん}'],
    answer: '6{点|てん}',
    hints: ['{中央値|ちゅうおうち}は、データを {小|ちい}さい {順|じゅん}に ならべたときの まんなかの {値|あたい}。', '3、5、6、7、9 と ならべかえる。'],
    explanation: '{小|ちい}さい {順|じゅん}に ならべると 3、5、6、7、9。まんなか（3{番目|ばんめ}）は 6{点|てん}です。（{平均値|へいきんち}も 30÷5＝6{点|てん}です）',
    inputForm: { question: '5{人|にん}の {小|しょう}テストの {得点|とくてん}は 3、7、5、9、6（{点|てん}）だった。中央値（メジアン）は 何点か。', answer: '6', acceptedAnswers: ['6点'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g7_sector_001', subject: 'math', gradeLevel: 7, unit: 'sector',
    diagram: {"kind":"circle","radius":6,"angle":60,"unit":"cm","caption":"半径と中心角を示したおうぎ形"},
    difficulty: 'advanced', answerType: 'input',
    question: '{半径|はんけい} 6cm、{中心角|ちゅうしんかく} 60°の おうぎ{形|がた}の {弧|こ}の {長|なが}さは {何|なん}cmか。{円周率|えんしゅうりつ}は 3.14 と して、{数|かず}で {答|こた}えなさい。',
    answer: '6.28', acceptedAnswers: ['6.28cm'], validationMode: 'number',
    hints: ['{弧|こ}の {長|なが}さ＝{円周|えんしゅう}×{中心角|ちゅうしんかく}/360', '{円周|えんしゅう}は 2×6×3.14、それを 60/360（6{分|ぶん}の1）に する。'],
    explanation: '{円周|えんしゅう}は 2×6×3.14＝37.68cm。{中心角|ちゅうしんかく}が 60°なので その 6{分|ぶん}の1、37.68÷6＝6.28cm です。（{円周率|えんしゅうりつ}を π と すると 2π cm）',
    reviewed: true
  },

  // ===== Lv8（中学2年）：確率・連立方程式・一次関数 =====
  {
    id: 'math_g8_probability_001', subject: 'math', gradeLevel: 8, unit: 'probability',
    diagram: {"kind":"table","head":["大＼小",1,2,3,4,5,6],"rows":[[1,"□","□","□","□","□","□"],[2,"□","□","□","□","□","□"],[3,"□","□","□","□","□","□"],[4,"□","□","□","□","□","□"],[5,"□","□","□","□","□","□"],[6,"□","□","□","□","□","□"]],"caption":"大・小の目の組合せ。和は書いていない"},
    difficulty: 'basic', answerType: 'choice',
    question: '2つの さいころを {同時|どうじ}に {投|な}げます。{出|で}た {目|め}の {和|わ}が 7に なる {確率|かくりつ}を {求|もと}めなさい。',
    choices: ['1/6', '1/12', '7/36', '1/3'],
    answer: '1/6',
    hints: ['{目|め}の {出方|でかた}は {全部|ぜんぶ}で 6×6＝36{通|とお}り。', '{和|わ}が 7に なる {組|く}み{合|あ}わせを (1,6)、(2,5)… と {書|か}き{出|だ}そう。'],
    explanation: '{和|わ}が 7に なるのは (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) の 6{通|とお}り。6/36＝1/6 です。',
    inputForm: { validationMode: 'exact', reviewed: false },
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
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g8_angle_001', subject: 'math', gradeLevel: 8, unit: 'angle',
    diagram: {"kind":"polygon","shape":"pentagon","caption":"五角形の5つの頂点"},
    difficulty: 'basic', answerType: 'choice',
    question: '{五角形|ごかくけい}の {内角|ないかく}の {和|わ}は {何度|なんど}か。',
    choices: ['540°', '360°', '720°', '900°'],
    answer: '540°',
    hints: ['n{角形|かくけい}の {内角|ないかく}の {和|わ}＝180°×(n−2)', '{五角形|ごかくけい}は 1つの {頂点|ちょうてん}から {対角線|たいかくせん}を ひくと、3つの {三角形|さんかくけい}に {分|わ}けられる。'],
    explanation: '180°×(5−2)＝540° です。{四角形|しかくけい}は 360°、{六角形|ろっかくけい}は 720° です。',
    inputForm: { answer: '540', acceptedAnswers: ['540°', '540度'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g8_linear_002', subject: 'math', gradeLevel: 8, unit: 'linear',
    difficulty: 'basic', answerType: 'input',
    question: '{一次関数|いちじかんすう} y＝2x＋3 で、x＝4 のときの y の {値|あたい}を {求|もと}めなさい。',
    answer: '11', validationMode: 'number',
    hints: ['x に 4 を {代入|だいにゅう}する。', '2×4＋3 を {計算|けいさん}する。'],
    explanation: 'y＝2×4＋3＝8＋3＝11 です。',
    reviewed: true
  },
  {
    id: 'math_g8_simultaneous_003', subject: 'math', gradeLevel: 8, unit: 'simultaneous',
    difficulty: 'standard', answerType: 'input',
    question: '{入館料|にゅうかんりょう}は {大人|おとな} 1{人|り} 500{円|えん}、{子|こ}ども 1{人|り} 300{円|えん}です。{大人|おとな}と {子|こ}ども {合|あ}わせて 8{人|にん}で {入館料|にゅうかんりょう}は 3200{円|えん}でした。{大人|おとな}は {何人|なんにん}ですか。（{数|かず}で {答|こた}えなさい）',
    answer: '4', acceptedAnswers: ['4人'], validationMode: 'number',
    hints: ['{大人|おとな}を x{人|にん}、{子|こ}どもを y{人|にん}として、{人数|にんずう}の {式|しき}と {料金|りょうきん}の {式|しき}を つくる。', 'x＋y＝8、500x＋300y＝3200'],
    explanation: 'x＋y＝8、500x＋300y＝3200。1つ{目|め}の {式|しき}を 300{倍|ばい}して ひくと 200x＝800、x＝4。{大人|おとな}は 4{人|にん}（{子|こ}どもは 4{人|にん}）です。',
    reviewed: true
  },
  {
    id: 'math_g8_probability_002', subject: 'math', gradeLevel: 8, unit: 'probability',
    diagram: {"kind":"cards","labels":["赤玉","白玉"],"values":["● ● ●","○ ○"],"caption":"ふくろの中の赤玉3個と白玉2個"},
    difficulty: 'standard', answerType: 'input',
    question: 'ふくろの {中|なか}に {赤玉|あかだま}が 3{個|こ}、{白玉|しろだま}が 2{個|こ} {入|はい}っている。この {中|なか}から 1{個|こ} {取|と}り{出|だ}すとき、{赤玉|あかだま}が {出|で}る {確率|かくりつ}を {求|もと}めなさい。（{分数|ぶんすう}で {答|こた}えなさい。{例|れい}：1/3）',
    answer: '3/5', validationMode: 'exact',
    hints: ['{玉|たま}の {出方|でかた}は {全部|ぜんぶ}で 5{通|とお}り（どれも {同|おな}じ {程度|ていど}に {出|で}やすい）。', '{赤玉|あかだま}が {出|で}る {場合|ばあい}は 3{通|とお}り。'],
    explanation: '{全部|ぜんぶ}で 5{通|とお}り、{赤玉|あかだま}が {出|で}るのは 3{通|とお}り なので、{確率|かくりつ}は 3/5 です。',
    reviewed: true
  },
  {
    id: 'math_g8_linear_003', subject: 'math', gradeLevel: 8, unit: 'linear',
    diagram: {"kind":"coordinate","a":-2,"b":6,"power":1,"xRange":[-1,5],"yRange":[-4,8],"formula":"y＝−2x＋6","caption":"直線の形。目盛りは省略している"},
    difficulty: 'standard', answerType: 'choice',
    question: '{直線|ちょくせん} y＝−2x＋6 が x{軸|じく}と {交|まじ}わる {点|てん}の x{座標|ざひょう}は どれか。',
    choices: ['3', '6', '−2', '−3'],
    answer: '3',
    hints: ['x{軸上|じくじょう}の {点|てん}は、y＝0。', '0＝−2x＋6 を {解|と}く。'],
    explanation: 'x{軸上|じくじょう}では y＝0 なので、0＝−2x＋6、2x＝6、x＝3 です。（6 は y{軸|じく}と {交|まじ}わる {点|てん}の y{座標|ざひょう}＝{切片|せっぺん}です）',
    inputForm: { question: '{直線|ちょくせん} y＝−2x＋6 が x{軸|じく}と {交|まじ}わる {点|てん}の x座標を 求めなさい。', validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g8_angle_002', subject: 'math', gradeLevel: 8, unit: 'angle',
    diagram: {"kind":"exterior","angle":30,"caption":"1つの頂点の外角。辺の延長は点線"},
    difficulty: 'advanced', answerType: 'input',
    question: '1つの {外角|がいかく}が 30°の {正多角形|せいたかくけい}は、{正何角形|せいなんかくけい}か。（{数|かず}で {答|こた}えなさい）',
    answer: '12', acceptedAnswers: ['12角形', '正12角形', '正十二角形'], validationMode: 'number',
    hints: ['{多角形|たかくけい}の {外角|がいかく}の {和|わ}は、いつも 360°。', '{正多角形|せいたかくけい}の {外角|がいかく}は すべて {等|ひと}しいので、360÷30。'],
    explanation: '{外角|がいかく}の {和|わ}は 360° なので、360÷30＝12。{正十二角形|せいじゅうにかくけい}です。',
    reviewed: true
  },

  // ===== Lv9（中学3年）：三平方の定理・二次方程式・相似・関数 y＝ax² =====
  {
    id: 'math_g9_pythagoras_001', subject: 'math', gradeLevel: 9, unit: 'pythagoras',
    diagram: {"kind":"triangle","base":8,"height":6,"right":true,"unit":"m","caption":"直角をはさむ2辺と斜辺"},
    difficulty: 'basic', answerType: 'choice',
    question: '{直角|ちょっかく}を はさむ 2{辺|へん}の {長|なが}さが 6mと 8mの {直角三角形|ちょっかくさんかくけい}の {形|かたち}をした {土地|とち}が あります。{斜辺|しゃへん}の {長|なが}さは {何|なん}mですか。',
    choices: ['10m', '14m', '12m', '7m'],
    answer: '10m',
    hints: ['{三平方|さんへいほう}の{定理|ていり}：a²＋b²＝c²（cは {斜辺|しゃへん}）', '6²＋8² を {計算|けいさん}しよう。'],
    explanation: '6²＋8²＝36＋64＝100。c²＝100、c＞0 なので c＝10。{斜辺|しゃへん}は 10mです。',
    inputForm: { answer: '10', acceptedAnswers: ['10m'], validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g9_quadratic_001', subject: 'math', gradeLevel: 9, unit: 'quadratic',
    diagram: {"kind":"nestedRect","w":"x＋3","h":"x＋3","innerW":"x","innerH":"x","growth":3,"area":64,"unit":"m","caption":"たてと よこを それぞれ3m広げた畑"},
    difficulty: 'standard', answerType: 'input',
    question: '{正方形|せいほうけい}の {畑|はたけ}が あります。たても よこも 3mずつ {広|ひろ}げたら、{面積|めんせき}が 64m²に なりました。もとの {畑|はたけ}の 1{辺|ぺん}は {何|なん}mですか。（{数|かず}で {答|こた}えよう）',
    answer: '5', acceptedAnswers: ['5m'], validationMode: 'number',
    hints: ['もとの 1{辺|ぺん}を xmとすると、{広|ひろ}げたあとの 1{辺|ぺん}は (x＋3)m。', '(x＋3)²＝64 を {解|と}こう。{長|なが}さは {正|せい}の {数|かず}だよ。'],
    explanation: '(x＋3)²＝64 より x＋3＝±8、x＝5 または x＝−11。{長|なが}さは {正|せい}なので x＝5。もとの 1{辺|ぺん}は 5mです。',
    reviewed: true
  },
  {
    id: 'math_g9_similarity_001', subject: 'math', gradeLevel: 9, unit: 'similarity',
    diagram: {"kind":"similarity","height":2,"shadows":[1.5,6],"unit":"m","caption":"同じ時刻の棒と塔の影（模式図）"},
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
  },
  // --- v0.3 で追加（B案：各学年10問） ---
  {
    id: 'math_g9_sqrt_001', subject: 'math', gradeLevel: 9, unit: 'sqrt',
    diagram: {"kind":"rect","w":"？","h":"？","area":50,"unit":"m","caption":"面積が分かっている正方形"},
    difficulty: 'basic', answerType: 'choice',
    question: '{面積|めんせき}が 50m²の {正方形|せいほうけい}の {土地|とち}が ある。この {土地|とち}の 1{辺|ぺん}の {長|なが}さは どれか。',
    choices: ['5√2 m', '25 m', '2√5 m', '10 m'],
    answer: '5√2 m',
    hints: ['1{辺|ぺん}を x m とすると x²＝50、x＞0。', '√50＝√(25×2)'],
    explanation: '1{辺|ぺん}は √50＝√(25×2)＝5√2 m です（{約|やく}7.07m）。',
    inputForm: { question: '{面積|めんせき}が 50m²の {正方形|せいほうけい}の {土地|とち}が ある。この {土地|とち}の 1辺の 長さは 何mか。', answer: '5√2', acceptedAnswers: ['5√2 m', '5√2m', '5ルート2'], validationMode: 'exact', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g9_quadratic_002', subject: 'math', gradeLevel: 9, unit: 'quadratic',
    difficulty: 'basic', answerType: 'input',
    question: '{連続|れんぞく}する 2つの {正|せい}の {整数|せいすう}が あり、その {積|せき}は 56 である。{小|ちい}さい ほうの {整数|せいすう}を {求|もと}めなさい。',
    answer: '7', validationMode: 'number',
    hints: ['{小|ちい}さい ほうを x とすると、{大|おお}きい ほうは x＋1。', 'x(x＋1)＝56 を {解|と}く。{正|せい}の {整数|せいすう}だけが {答|こた}え。'],
    explanation: 'x(x＋1)＝56 より x²＋x−56＝0、(x＋8)(x−7)＝0、x＝−8, 7。{正|せい}の {整数|せいすう}なので x＝7（7×8＝56）です。',
    reviewed: true
  },
  {
    id: 'math_g9_circle_001', subject: 'math', gradeLevel: 9, unit: 'circle',
    diagram: {"kind":"inscribed","angle":35,"caption":"同じ弧に対する円周角と中心角"},
    difficulty: 'standard', answerType: 'input',
    question: '{円|えん}で、ある {弧|こ}に {対|たい}する {円周角|えんしゅうかく}が 35°のとき、{同|おな}じ {弧|こ}に {対|たい}する {中心角|ちゅうしんかく}は {何度|なんど}か。（{数|かず}で {答|こた}えなさい）',
    answer: '70', acceptedAnswers: ['70°', '70度'], validationMode: 'number',
    hints: ['{円周角|えんしゅうかく}の {定理|ていり}：{円周角|えんしゅうかく}は、{同|おな}じ {弧|こ}に {対|たい}する {中心角|ちゅうしんかく}の {半分|はんぶん}。', '{中心角|ちゅうしんかく}＝{円周角|えんしゅうかく}×2'],
    explanation: '{円周角|えんしゅうかく}は {中心角|ちゅうしんかく}の {半分|はんぶん}なので、{中心角|ちゅうしんかく}は 35×2＝70° です。',
    reviewed: true
  },
  {
    id: 'math_g9_sampling_001', subject: 'math', gradeLevel: 9, unit: 'sampling',
    difficulty: 'standard', answerType: 'input',
    question: '{箱|はこ}の {中|なか}に {赤玉|あかだま}と {白玉|しろだま}が {合|あ}わせて 500{個|こ} {入|はい}っている。よく {混|ま}ぜて 40{個|こ}を {無作為|むさくい}に {取|と}り{出|だ}したところ、{赤玉|あかだま}は 8{個|こ}だった。{箱|はこ}の {中|なか}の {赤玉|あかだま}は およそ {何個|なんこ}と {推定|すいてい}できるか。（{数|かず}で {答|こた}えなさい）',
    answer: '100', acceptedAnswers: ['100個', '約100個', '約100'], validationMode: 'number',
    hints: ['{標本|ひょうほん}（40{個|こ}）での {赤玉|あかだま}の {割合|わりあい}は 8/40。', '{母集団|ぼしゅうだん}（500{個|こ}）でも {同|おな}じ {割合|わりあい}と {考|かんが}える。500×8/40'],
    explanation: '{標本|ひょうほん}の {赤玉|あかだま}の {割合|わりあい}は 8/40＝1/5。500×1/5＝100 なので、およそ 100{個|こ}と {推定|すいてい}できます。',
    reviewed: true
  },
  {
    id: 'math_g9_function_002', subject: 'math', gradeLevel: 9, unit: 'function',
    diagram: {"kind":"coordinate","a":2,"b":0,"power":2,"xRange":[-3.5,3.5],"yRange":[-2,26],"marks":[1,3],"formula":"y＝2x²","caption":"x＝1とx＝3の点。変化の割合は示していない"},
    difficulty: 'standard', answerType: 'choice',
    question: '{関数|かんすう} y＝2x² で、x の {値|あたい}が 1 から 3 まで {増加|ぞうか}するときの {変化|へんか}の {割合|わりあい}は どれか。',
    choices: ['8', '4', '16', '2'],
    answer: '8',
    hints: ['{変化|へんか}の {割合|わりあい}＝（y の {増加量|ぞうかりょう}）÷（x の {増加量|ぞうかりょう}）', 'x＝1 のとき y＝2、x＝3 のとき y＝18。'],
    explanation: 'y の {増加量|ぞうかりょう}は 18−2＝16、x の {増加量|ぞうかりょう}は 3−1＝2 なので、{変化|へんか}の {割合|わりあい}は 16÷2＝8 です。（y＝ax² の {変化|へんか}の {割合|わりあい}は {一定|いってい}では ありません）',
    inputForm: { question: '{関数|かんすう} y＝2x² で、x の {値|あたい}が 1 から 3 まで {増加|ぞうか}するときの 変化の 割合を 求めなさい。', validationMode: 'number', reviewed: false },
    reviewed: true
  },
  {
    id: 'math_g9_pythagoras_002', subject: 'math', gradeLevel: 9, unit: 'pythagoras',
    diagram: {"kind":"polygon","shape":"diagonals","w":12,"h":5,"single":true,"unit":"cm","caption":"長方形のたて・よこと対角線"},
    difficulty: 'advanced', answerType: 'input',
    question: 'たて 5cm、よこ 12cmの {長方形|ちょうほうけい}の {対角線|たいかくせん}の {長|なが}さは {何|なん}cmか。（{数|かず}で {答|こた}えなさい）',
    answer: '13', acceptedAnswers: ['13cm'], validationMode: 'number',
    hints: ['{対角線|たいかくせん}は、たてと よこを 2{辺|へん}とする {直角三角形|ちょっかくさんかくけい}の {斜辺|しゃへん}。', '5²＋12² を {計算|けいさん}する。'],
    explanation: '5²＋12²＝25＋144＝169＝13² なので、{対角線|たいかくせん}は 13cm です。',
    reviewed: true
  }
);
