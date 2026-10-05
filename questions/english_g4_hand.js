// 小学4年 英語：Claude が手作りした問題（判断278）。単元ごとに少しずつ足していく。
// 小4は、聞く・話す中心の外国語活動の内容（あいさつ・数・色・動物・食べもの・文房具・曜日・月・時こく・天気・会話）。書く問題は少しだけ。
// 新作は reviewed:false。答えの判定は、英字の大文字・小文字を区別しない（answer.js の normalize）。
// 選択問題の書き問題の形（inputForm）は、答えが短い語のものに付ける。日本語の答えは kana-insensitive、英語の答えは exact。
(function(root){
  'use strict';
  var bank=root.QUESTION_BANK=root.QUESTION_BANK||[], serial={};
  // inp：{q:書き問題の文, acc:[別解], mode:'exact'|'kana-insensitive'|'number'}。省略なら書き問題なし
  function add(unit,difficulty,question,answer,wrong,hints,explanation,inp){
    var n=serial[unit]=(serial[unit]||0)+1;
    var q={id:'english_g4_hand_'+unit+'_'+('00'+n).slice(-3),subject:'english',gradeLevel:4,unit:unit,
      difficulty:difficulty,answerType:'choice',
      question:question,answer:String(answer),choices:[answer].concat(wrong).map(String),hints:hints,
      explanation:explanation,reviewed:false,collection:'hand_en4'};
    if(inp){
      var f={question:inp.q,answer:q.answer,validationMode:inp.mode||'exact',reviewed:false};
      if(inp.acc&&inp.acc.length) f.acceptedAnswers=inp.acc;
      q.inputForm=f;
    }
    bank.push(q);
  }
  // 英語→日本語：「apple」は日本語で何かな
  function e2j(unit,diff,en,ja,wrong,h1,h2,acc,expl){
    add(unit,diff,'「'+en+'」は 日本語で どれかな。',ja,wrong,[h1,h2],expl||('「'+en+'」は「'+ja+'」です。'),{q:'「'+en+'」は 日本語で 何かな。',acc:acc,mode:'kana-insensitive'});
  }
  // 日本語→英語：「りんご」を英語で言うと
  function j2e(unit,diff,ja,en,wrong,h1,h2,expl){
    add(unit,diff,'「'+ja+'」を 英語で 言うと どれかな。',en,wrong,[h1,h2],expl||('「'+ja+'」は「'+en+'」です。'),{q:'「'+ja+'」を 英語で 書こう。',mode:'exact'});
  }

  // ---- アルファベット：基礎6・標準9・発展7 ----
  function al(diff,question,answer,wrong,h1,h2,expl,inpq,acc){
    if(Array.isArray(h1)){acc=inpq;inpq=expl;expl=h2;h2=h1[1];h1=h1[0];}   // ヒントを配列でまとめて渡してもよい
    add('alphabet',diff,question,answer,wrong,[h1,h2],expl,inpq?{q:inpq,acc:acc,mode:'exact'}:null);
  }
  al('basic','大文字の「A」の 小文字は どれかな。','a',['e','o','d'],['ABCの うたを おもいだそう。','「エー」と 読む 文字だよ。'],'「A」の小文字は「a」です。');
  al('basic','大文字の「B」の 小文字は どれかな。','b',['d','p','q'],['「ビー」と 読む 文字だよ。','まるい ところは、右がわに あるよ。'],'「B」の小文字は「b」です。「d」とは、まるい ところの 向きが ちがいます。');
  al('basic','大文字の「C」の 小文字は どれかな。','c',['e','o','s'],['「シー」と 読む 文字だよ。','大文字と 小文字が にているよ。'],'「C」の小文字は「c」です。大きさが ちがうだけで、形は にています。');
  al('basic','大文字の「D」の 小文字は どれかな。','d',['b','p','q'],['「ディー」と 読む 文字だよ。','まるい ところは、左がわに あるよ。'],'「D」の小文字は「d」です。「b」と まちがえやすいので 気を つけましょう。');
  al('basic','アルファベットで、AとCの 間に 来る 文字は 何かな。','B',['D','E','F'],['ABCの うたを 思い出そう。','「ビー」と 読むよ。'],'A、B、C の じゅんなので、AとCの間は「B」です。','アルファベットで、AとCの 間に 来る 文字を 書こう。',['b']);
  al('basic','アルファベットで、Yの 前に 来る 文字は 何かな。','X',['W','Z','V'],['XYZの じゅんを 思い出そう。','「エックス」と 読むよ。'],'W、X、Y、Z の じゅんなので、Yの前は「X」です。','アルファベットで、Yの 前に 来る 文字を 書こう。',['x']);
  al('standard','「apple」の 一番 はじめの 文字は どれかな。','a',['p','e','l'],['「アップル」と 読むよ。','一番 はじめの 音を 聞いてみよう。'],'「apple」は「a」から はじまります。');
  al('standard','「dog」の 一番 はじめの 文字は どれかな。','d',['b','g','o'],['「ドッグ」と 読むよ。','「ディー」と 読む 文字だよ。'],'「dog」は「d」から はじまります。');
  al('standard','大文字の「M」の 小文字は どれかな。','m',['n','w','h'],['「エム」と 読む 文字だよ。','山が 二つ あるよ。'],'「M」の小文字は「m」です。');
  al('standard','大文字の「Q」の 小文字は どれかな。','q',['p','g','b'],['「キュー」と 読む 文字だよ。','まるい ところの 右がわに 下へ のびる 線が あるよ。'],'「Q」の小文字は「q」です。「p」「g」「b」と まちがえないように 気を つけましょう。');
  al('standard','大文字の「G」の 小文字は どれかな。','g',['q','y','j'],['「ジー」と 読む 文字だよ。','まるい ところの 右がわに、下へ のびて 曲がる 線が あるよ。'],'「G」の小文字は「g」です。');
  al('standard','アルファベットの 5番目の 文字は 何かな。','E',['D','F','C'],['ABCDE…と かぞえてみよう。','「イー」と 読むよ。'],'A、B、C、D、E の じゅんなので、5番目は「E」です。','アルファベットの 5番目の 文字を 書こう。',['e']);
  al('standard','アルファベットは 全部で 何文字 あるかな。','26',['24','25','28'],['AからZまで かぞえてみよう。','20より 大きいよ。'],'アルファベットは、AからZまで 全部で 26文字 あります。','アルファベットは 全部で 何文字 あるかな。（数字で）',['26文字','二十六']);
  al('standard','「ビー」と 読む 文字は どれかな。','B',['D','P','V'],['「ビー」の 音を 思い出そう。','AのつぎのABC の 文字だよ。'],'「ビー」と 読む 文字は「B」です。','「ビー」と 読む 文字を 書こう。',['b']);
  al('standard','「エス」と 読む 文字は どれかな。','S',['F','X','N'],['ヘビのような 形の 文字だよ。','「S」の形を 思い出そう。'],'「エス」と 読む 文字は「S」です。','「エス」と 読む 文字を 書こう。',['s']);
  al('advanced','大文字の「N」の 小文字は どれかな。','n',['m','h','r'],['「エヌ」と 読む 文字だよ。','山が 一つの 形だよ。'],'「N」の小文字は「n」です。「m」は 山が 二つです。');
  al('advanced','「cat」の 2番目の 文字は どれかな。','a',['c','t','e'],['「キャット」と 読むよ。','c-a-t と 一文字ずつ 見てみよう。'],'「cat」は c・a・t の 3文字で、2番目は「a」です。');
  al('advanced','「book」の 一番 さいごの 文字は どれかな。','k',['o','b','c'],['「ブック」と 読むよ。','b-o-o-k と 一文字ずつ 見てみよう。'],'「book」は b・o・o・k の 4文字で、さいごは「k」です。');
  al('advanced','「fish」の 一番 はじめの 文字は どれかな。','f',['i','s','t'],['「フィッシュ」と 読むよ。','「エフ」と 読む 文字だよ。'],'「fish」は「f」から はじまります。');
  al('advanced','アルファベットで、Zの 2つ前の 文字は 何かな。','X',['Y','W','V'],['Zの すぐ前は Y だよ。','もう 一つ もどってみよう。'],'Z の すぐ前は Y、その前は X なので、Zの 2つ前は「X」です。','アルファベットで、Zの 2つ前の 文字を 書こう。',['x']);
  al('advanced','アルファベットで、Jの 次に 来る 文字は 何かな。','K',['I','L','H'],['ABC…と かぞえてみよう。','「ケー」と 読むよ。'],'I、J、K の じゅんなので、Jの次は「K」です。','アルファベットで、Jの 次に 来る 文字を 書こう。',['k']);
  al('advanced','アルファベットで、Uの 次に 来る 文字は 何かな。','V',['T','W','X'],['ABC…と かぞえてみよう。','「ヴィー」と 読むよ。'],'T、U、V の じゅんなので、Uの次は「V」です。','アルファベットで、Uの 次に 来る 文字を 書こう。',['v']);

  // ---- 数：基礎6・標準9・発展7 ----
  function nm(diff,en,num,wrong,h1,h2){
    add('number',diff,'「'+en+'」は 数字で いくつかな。',num,wrong,[h1,h2],'「'+en+'」は「'+num+'」です。',{q:'「'+en+'」は 数字で いくつかな。（数字で）',mode:'number'});
  }
  function nj(diff,num,en,wrong,h1,h2){
    add('number',diff,num+' を 英語で 言うと どれかな。',en,wrong,[h1,h2],num+' は「'+en+'」です。',{q:num+' を 英語で 書こう。',mode:'exact'});
  }
  nm('basic','five','5',['4','6','15'],'手の ゆびは 何本 あるかな。','ファイブ と 読むよ。');
  nm('basic','seven','7',['6','8','17'],'1週間は 何日かな。','セブン と 読むよ。');
  nm('basic','ten','10',['9','11','100'],'手の ゆびを 全部 合わせた 数だよ。','テン と 読むよ。');
  nm('basic','three','3',['2','4','13'],'さんかくけいの 辺は 何本かな。','スリー と 読むよ。');
  nm('basic','eight','8',['7','9','18'],'ほしの カウントダウン 10、9、…','エイト と 読むよ。');
  nm('basic','nine','9',['8','10','19'],'10の 一つ 前の 数だよ。','ナイン と 読むよ。');
  nm('standard','twelve','12',['2','20','10'],'1年は 何か月かな。','ツウェルブ と 読むよ。');
  nm('standard','fifteen','15',['50','5','25'],'fif-teen。5と teen（10と なんぼ）。','フィフティーン と 読むよ。');
  nm('standard','twenty','20',['2','12','200'],'十の 2つ分だよ。','トゥエンティ と 読むよ。');
  nj('standard','13','thirteen',['thirty','three','thirtieth'],'ティーン が 後ろに つくよ。','3 と ten。');
  nj('standard','18','eighteen',['eighty','eight','eighth'],'エイティーン と 読むよ。','8 と teen。');
  nm('standard','thirty','30',['13','3','300'],'ティー で おわるよ。','サーティ と 読むよ。');
  nm('standard','forty','40',['14','4','400'],'フォーティ と 読むよ。','fourty では なく forty と 書くよ。');
  add('number','standard','What is five plus three?（5たす3は？）','eight',['seven','nine','six'],['5 + 3 を 計算しよう。','答えは 5より 大きく 10より 小さいよ。'],'5 + 3 = 8 です。8は「eight」です。',{q:'What is five plus three?（英語で 答えよう）',mode:'exact'});
  add('number','standard','twenty, thirty, ( ), fifty の ( )に 入る 数は どれかな。','forty',['sixty','fourteen','twenty-one'],['20、30、( )、50 と 10ずつ ふえているよ。','30の 次は 何かな。'],'20、30、40、50 と 10ずつ ふえるので、( )は「forty（40）」です。',{q:'twenty, thirty, ( ), fifty の ( )に 入る 数を 英語で 書こう。',mode:'exact'});
  nm('advanced','fifty','50',['15','5','500'],'フィフティ と 読むよ。','ティー で おわるよ。');
  nm('advanced','sixty','60',['16','6','600'],'シックスティ と 読むよ。','sixteen は 16だよ。');
  nm('advanced','seventy','70',['17','7','700'],'セブンティ と 読むよ。','seventeen は 17だよ。');
  nm('advanced','ninety','90',['19','9','900'],'ナインティ と 読むよ。','nineteen は 19だよ。');
  nm('advanced','sixteen','16',['60','6','61'],'シックスティーン と 読むよ。','sixty は 60だよ。');
  add('number','advanced','I have six apples.（わたしは りんごを 六つ もっています。）りんごは いくつかな。','6',['5','7','16'],['six は 数の 名前だよ。','1、2、3、4、5、6 と かぞえてみよう。'],'「six」は 6 です。りんごは 6こです。',{q:'I have six apples. りんごは いくつかな。（数字で）',mode:'number'});
  add('number','advanced','What is ten plus ten?（10たす10は？）','twenty',['thirty','fifteen','ten'],['10 + 10 を 計算しよう。','答えは 20だよ。'],'10 + 10 = 20 です。20は「twenty」です。',{q:'What is ten plus ten?（英語で 答えよう）',mode:'exact'});

  // ---- あいさつ・自己紹介・気持ち：基礎6・標準9・発展7 ----
  function gr(diff,question,answer,wrong,h1,h2,expl,inp){
    if(Array.isArray(h1)){inp=expl;expl=h2;h2=h1[1];h1=h1[0];}   // ヒントを配列でまとめて渡してもよい
    add('greeting',diff,question,answer,wrong,[h1,h2],expl,inp);
  }
  gr('basic','「Hello.」は 日本語で どれかな。','こんにちは',['おはよう','おやすみ','さようなら'],['人に 会ったときの あいさつだよ。','ひるまに よく 言うよ。'],'「Hello.」は「こんにちは」です。',{q:'「Hello.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('basic','「Good morning.」は 日本語で どれかな。','おはよう',['こんにちは','こんばんは','おやすみ'],['morning は「朝」だよ。','朝の あいさつだよ。'],'「Good morning.」は「おはよう」です。',{q:'「Good morning.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('basic','「Good night.」は 日本語で どれかな。','おやすみなさい',['おはよう','こんにちは','ありがとう'],['night は「夜」だよ。','ねる前に 言うよ。'],'「Good night.」は「おやすみなさい」です。',{q:'「Good night.」は 日本語で 何かな。',mode:'kana-insensitive',acc:['おやすみ']});
  gr('basic','「Thank you.」は 日本語で どれかな。','ありがとう',['ごめんなさい','さようなら','こんにちは'],['うれしいときに 言う 言葉だよ。','おれいの 言葉だよ。'],'「Thank you.」は「ありがとう」です。',{q:'「Thank you.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('basic','「Goodbye.」は 日本語で どれかな。','さようなら',['こんにちは','おはよう','ありがとう'],['別れるときの あいさつだよ。','Bye と みじかく 言うことも あるよ。'],'「Goodbye.」は「さようなら」です。',{q:'「Goodbye.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('basic','「Sorry.」は 日本語で どれかな。','ごめんなさい',['ありがとう','おはよう','どういたしまして'],['まちがえたときに 言う 言葉だよ。','あやまるときの 言葉だよ。'],'「Sorry.」は「ごめんなさい」です。',{q:'「Sorry.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('standard','「Good afternoon.」は 日本語で どれかな。','こんにちは',['おはよう','こんばんは','おやすみなさい'],['afternoon は「ひる」だよ。','ひるすぎの あいさつだよ。'],'「Good afternoon.」は、ひるすぎの「こんにちは」です。',{q:'「Good afternoon.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('standard','「How are you?」と 聞かれました。答えとして 合うのは どれかな。','I\'m fine, thank you.',['My name is Ken.','I\'m ten.','Yes, please.'],['「元気ですか」と 聞かれて いるよ。','「fine」は「元気」の いみだよ。'],'「How are you?」は「元気ですか。」という 意味です。「I\'m fine, thank you.」は「元気です。ありがとう。」です。');
  gr('standard','「Nice to meet you.」は 日本語で どれかな。','はじめまして',['さようなら','ありがとう','どういたしまして'],['はじめて 会ったときの あいさつだよ。','「会えて うれしい」という 気もちだよ。'],'「Nice to meet you.」は「はじめまして。」です。',{q:'「Nice to meet you.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('standard','「What\'s your name?」と 聞かれました。答えとして 合うのは どれかな。','My name is Ken.',['I\'m fine.','I\'m ten.','I like cats.'],['「名前は？」と 聞かれて いるよ。','「My name is ～.」で 自分の 名前を 言うよ。'],'「What\'s your name?」は「名前は何ですか。」です。「My name is Ken.」は「わたしの名前はケンです。」です。');
  gr('standard','「You\'re welcome.」は 日本語で どれかな。','どういたしまして',['ありがとう','ごめんなさい','さようなら'],['Thank you. と 言われたときの 返事だよ。','おれいを 言われた ときに 使うよ。'],'「You\'re welcome.」は「どういたしまして。」です。',{q:'「You\'re welcome.」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('standard','「Excuse me.」は どんな ときに 使う 言葉かな。','人に 話しかけるとき',['ごはんを 食べるとき','ねる前','わらったとき'],['「すみません」と 声を かけるときの 言葉だよ。','人の 前を 通るときにも 使うよ。'],'「Excuse me.」は「すみません。」と、人に 話しかけたり、前を 通ったりするときに 使います。');
  gr('standard','「Happy birthday!」は 日本語で どれかな。','たんじょう日おめでとう',['あけましておめでとう','ありがとう','おやすみなさい'],['birthday は「たんじょう日」だよ。','たんじょう日の おいわいの 言葉だよ。'],'「Happy birthday!」は「たんじょう日おめでとう！」です。',{q:'「Happy birthday!」は 日本語で 何かな。',mode:'kana-insensitive',acc:['たんじょうびおめでとう','お誕生日おめでとう']});
  gr('standard','「How old are you?」と 聞かれました。答えとして 合うのは どれかな。','I\'m ten.',['I\'m fine.','I\'m Ken.','I\'m happy.'],['「何才ですか」と 聞かれて いるよ。','「I\'m ten.」は「10才です。」だよ。'],'「How old are you?」は「何才ですか。」です。「I\'m ten.」は「10才です。」と 答えます。');
  gr('standard','「Yes」は 日本語で どれかな。','はい',['いいえ','ありがとう','さようなら'],['「No」の 反対だよ。','質問に 同じ 気もちで 答えるとき 言うよ。'],'「Yes」は「はい」です。「No」は「いいえ」です。',{q:'「Yes」は 日本語で 何かな。',mode:'kana-insensitive'});
  gr('advanced','「Where are you from?」と 聞かれました。答えとして 合うのは どれかな。','I\'m from Japan.',['My name is Mika.','I\'m ten.','Thank you.'],['「どこから 来ましたか」と 聞かれて いるよ。','国の 名前を 言うよ。'],'「Where are you from?」は「どこの出身ですか。」です。「I\'m from Japan.」は「日本から来ました。」です。');
  gr('advanced','「I\'m sleepy.」は 日本語で どれかな。','ねむいです',['おなかが すきました','うれしいです','おこっています'],['sleep は「ねる」だよ。','ねむたいときの 気もちだよ。'],'「I\'m sleepy.」は「ねむいです。」です。');
  gr('advanced','「I\'m hungry.」は 日本語で どれかな。','おなかが すきました',['ねむいです','かなしいです','つかれました'],['食べものが ほしいときの 気もちだよ。','お昼前に よく 思うよ。'],'「I\'m hungry.」は「おなかがすきました。」です。');
  gr('advanced','「I\'m happy.」は 日本語で どれかな。','うれしいです',['かなしいです','おこっています','ねむいです'],['「sad」の 反対の 気もちだよ。','いい ことが あったときの 気もちだよ。'],'「I\'m happy.」は「うれしいです。」です。「sad」は「かなしい」です。');
  gr('advanced','「Stand up.」は 日本語で どれかな。','立ってください',['すわってください','しずかに してください','手を あげてください'],['stand は「立つ」だよ。','「Sit down.」の 反対だよ。'],'「Stand up.」は「立ってください。」です。「Sit down.」は「すわってください。」です。');
  gr('advanced','「Sit down.」は 日本語で どれかな。','すわってください',['立ってください','見てください','聞いてください'],['sit は「すわる」だよ。','「Stand up.」の 反対だよ。'],'「Sit down.」は「すわってください。」です。');
  gr('advanced','「See you.」は 日本語で どれかな。','またね',['おはよう','ありがとう','はじめまして'],['別れる ときの かんたんな あいさつだよ。','「会いましょう」という 気もちだよ。'],'「See you.」は「またね。」です。「Goodbye.」より くだけた 言い方です。',{q:'「See you.」は 日本語で 何かな。',mode:'kana-insensitive'});

  // ---- 色・形：基礎6・標準9・発展7 ----
  j2e('color','basic','赤','red',['blue','green','yellow'],'りんごや トマトの 色だよ。','「レッド」と 読むよ。');
  j2e('color','basic','青','blue',['red','green','white'],'空や 海の 色だよ。','「ブルー」と 読むよ。');
  j2e('color','basic','黄色','yellow',['orange','green','brown'],'バナナの 色だよ。','「イエロー」と 読むよ。');
  j2e('color','basic','緑','green',['blue','yellow','black'],'草や 葉っぱの 色だよ。','「グリーン」と 読むよ。');
  j2e('color','basic','黒','black',['white','brown','blue'],'夜の 空の 色だよ。','「ブラック」と 読むよ。');
  j2e('color','basic','白','white',['black','yellow','pink'],'雪の 色だよ。','「ホワイト」と 読むよ。');
  e2j('color','standard','pink','ピンク',['むらさき','オレンジ','茶色'],'さくらの 花の 色だよ。','日本語でも「ピンク」と 言うよ。',['もも色','桃色']);
  e2j('color','standard','orange','オレンジ色',['黄色','赤','茶色'],'くだものの 名前でも あるよ。','みかんの 色だよ。',['オレンジ','橙色']);
  e2j('color','standard','purple','むらさき',['ピンク','茶色','灰色'],'ぶどうの 色だよ。','青と 赤を まぜた 色だよ。',['紫']);
  e2j('color','standard','brown','茶色',['むらさき','灰色','赤'],'チョコレートや 土の 色だよ。','「ブラウン」と 読むよ。',['ちゃいろ']);
  add('color','standard','「Banana is ( ).」の ( )に 入る 色は どれかな。','yellow',['blue','white','black'],['バナナは 何色かな。','「イエロー」だよ。'],'バナナは「yellow（黄色）」です。',{q:'「Banana is ( ).」の ( )に 入る 色を 英語で 書こう。',mode:'exact'});
  add('color','standard','「The sky is ( ).」の ( )に 入る 色は どれかな。','blue',['green','red','black'],['晴れた 日の 空は 何色かな。','「ブルー」だよ。'],'晴れた日の空は「blue（青）」です。',{q:'「The sky is ( ).」の ( )に 入る 色を 英語で 書こう。',mode:'exact'});
  add('color','standard','「Snow is ( ).」の ( )に 入る 色は どれかな。','white',['black','red','yellow'],['雪は 何色かな。','「ホワイト」だよ。'],'雪は「white（白）」です。',{q:'「Snow is ( ).」の ( )に 入る 色を 英語で 書こう。',mode:'exact'});
  e2j('color','standard','circle','円（まる）',['さんかく','しかく','ほし'],'「サークル」と 読むよ。','太陽の 形だよ。',['まる','円','丸']);
  e2j('color','standard','triangle','三角形',['円','四角形','星形'],'「トライアングル」と 読むよ。','おにぎりの 形だよ。',['さんかく','さんかっけい','三角']);
  e2j('color','advanced','gray','灰色',['茶色','むらさき','銀色'],'くもりの 日の 空の 色だよ。','ねずみの 色だよ。',['はいいろ','グレー']);
  e2j('color','advanced','square','正方形（しかく）',['円','三角形','星形'],'「スクウェア」と 読むよ。','4つの 辺の 長さが 同じ 形だよ。',['しかく','四角','正方形','せいほうけい','四角形']);
  e2j('color','advanced','star','星形（ほし）',['円','ハート形','三角形'],'「スター」と 読むよ。','夜の 空に 光る ものだよ。',['ほし','星','ほしがた']);
  e2j('color','advanced','heart','ハート形',['円','星形','三角形'],'「ハート」と 読むよ。','「心」の 形だよ。',['ハート','はーと','ハートがた']);
  add('color','advanced','赤と 白を まぜると どんな 色に なるかな。（red and white）','pink',['green','purple','brown'],['絵の具を まぜる ところを 思いうかべよう。','さくらの 花の 色だよ。'],'赤（red）と 白（white）を まぜると、ピンク（pink）に なります。',{q:'赤と 白を まぜた 色を 英語で 書こう。（red and white）',mode:'exact'});
  add('color','advanced','青と 黄色を まぜると どんな 色に なるかな。（blue and yellow）','green',['purple','orange','brown'],['絵の具を まぜる ところを 思いうかべよう。','草の 色だよ。'],'青（blue）と 黄色（yellow）を まぜると、緑（green）に なります。',{q:'青と 黄色を まぜた 色を 英語で 書こう。（blue and yellow）',mode:'exact'});
  add('color','advanced','「rectangle」は どんな 形かな。','長方形',['正方形','円','三角形'],['「レクタングル」と 読むよ。','ノートの 形だよ。'],'「rectangle」は「長方形」です。「square」は「正方形」です。',{q:'「rectangle」は 日本語で 何かな。',mode:'kana-insensitive',acc:['ちょうほうけい','長四角','ながしかく']});

  // ---- 動物：基礎6・標準9・発展7 ----
  j2e('animal','basic','いぬ','dog',['cat','bird','rabbit'],'「ドッグ」と 読むよ。','「ワン」と なくよ。');
  j2e('animal','basic','ねこ','cat',['dog','bird','fish'],'「キャット」と 読むよ。','「ニャー」と なくよ。');
  j2e('animal','basic','とり','bird',['fish','dog','rabbit'],'「バード」と 読むよ。','空を とぶよ。');
  j2e('animal','basic','さかな','fish',['bird','cat','monkey'],'「フィッシュ」と 読むよ。','水の 中に すんでいるよ。');
  j2e('animal','basic','うさぎ','rabbit',['monkey','cat','dog'],'「ラビット」と 読むよ。','耳が 長いよ。');
  j2e('animal','basic','さる','monkey',['rabbit','dog','bird'],'「モンキー」と 読むよ。','バナナが 好きだよ。');
  e2j('animal','standard','elephant','ぞう',['きりん','さる','うま'],'「エレファント」と 読むよ。','鼻が 長いよ。',['象','ゾウ']);
  e2j('animal','standard','lion','ライオン',['とら','くま','ぞう'],'「ライオン」と 読むよ。','どうぶつの 王さまだよ。',['らいおん']);
  e2j('animal','standard','bear','くま',['ぞう','ぶた','うま'],'「ベア」と 読むよ。','冬ねむを するよ。',['熊','クマ']);
  e2j('animal','standard','horse','うま',['うし','ぶた','ひつじ'],'「ホース」と 読むよ。','人が 乗れるよ。',['馬','ウマ']);
  e2j('animal','standard','pig','ぶた',['うし','ひつじ','うま'],'「ピッグ」と 読むよ。','「ブーブー」と なくよ。',['豚','ブタ']);
  e2j('animal','standard','cow','うし',['ぶた','ひつじ','うま'],'「カウ」と 読むよ。','ミルクを くれるよ。',['牛','ウシ']);
  e2j('animal','standard','penguin','ペンギン',['くじら','あざらし','カモメ'],'「ペンギン」と 読むよ。','南極に すんでいる 鳥だよ。',['ぺんぎん']);
  e2j('animal','standard','giraffe','きりん',['ぞう','うま','しまうま'],'「ジラフ」と 読むよ。','首が とても 長いよ。',['キリン','麒麟']);
  e2j('animal','standard','zebra','しまうま',['うま','きりん','とら'],'「ジーブラ」と 読むよ。','しましまの もようが あるよ。',['シマウマ','縞馬']);
  e2j('animal','advanced','kangaroo','カンガルー',['コアラ','パンダ','ぞう'],'「カンガルー」と 読むよ。','おなかの ふくろで 赤ちゃんを 育てるよ。',['かんがるー']);
  e2j('animal','advanced','koala','コアラ',['カンガルー','パンダ','くま'],'「コアラ」と 読むよ。','ユーカリの 葉を 食べるよ。',['こあら']);
  e2j('animal','advanced','snake','へび',['かえる','とかげ','ねずみ'],'「スネイク」と 読むよ。','足が ないよ。',['蛇','ヘビ']);
  e2j('animal','advanced','frog','かえる',['へび','ねずみ','さかな'],'「フロッグ」と 読むよ。','「ケロケロ」と なくよ。',['蛙','カエル']);
  e2j('animal','advanced','whale','くじら',['さかな','いるか','ペンギン'],'「ホエール」と 読むよ。','海に すむ 一番 大きな 動物だよ。',['鯨','クジラ']);
  add('animal','advanced','It has a long nose. What is it?（長い 鼻を もっています。何かな。）','elephant',['lion','monkey','pig'],['「long」は「長い」、「nose」は「鼻」だよ。','「エレファント」だよ。'],'「long nose（長い鼻）」を もつのは「elephant（ぞう）」です。',{q:'It has a long nose. What is it?（英語で 答えよう）',mode:'exact'});
  add('animal','advanced','It says "Moo!" What is it?（「モー」と なきます。何かな。）','cow',['pig','horse','dog'],['牛の なき声は 「モー」だよ。','ミルクを くれる 動物だよ。'],'「モー」と なくのは「cow（うし）」です。',{q:'It says "Moo!" What is it?（英語で 答えよう）',mode:'exact'});
})(window);
