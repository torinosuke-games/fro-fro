// 小学5年 英語：Claude が手作りした問題（判断281）。単元ごとに少しずつ足していく。
// 小5から、教科の「外国語」（読む・書くが加わる）。単語のつづり・短い文を読む問題・自分のことを伝える表現を中心にする。
// 新作は reviewed:false。答えの判定は、英字の大文字・小文字を区別しない（answer.js の normalize）。
// 英語の問題は、問題文の「…」の中の英語を、スピーカーのボタンで読み上げられる（js/speech.js）。
(function(root){
  'use strict';
  var bank=root.QUESTION_BANK=root.QUESTION_BANK||[], serial={};
  // inp：{q:書き問題の文, acc:[別解], mode:'exact'|'kana-insensitive'|'number', ans:書き問題の答え}。省略なら書き問題なし
  function add(unit,difficulty,question,answer,wrong,hints,explanation,inp){
    var n=serial[unit]=(serial[unit]||0)+1;
    var q={id:'english_g5_hand_'+unit+'_'+('00'+n).slice(-3),subject:'english',gradeLevel:5,unit:unit,
      difficulty:difficulty,answerType:'choice',
      question:question,answer:String(answer),choices:[answer].concat(wrong).map(String),hints:hints,
      explanation:explanation,reviewed:false,collection:'hand_en5'};
    if(inp){
      var f={question:inp.q,answer:inp.ans||q.answer,validationMode:inp.mode||'exact',reviewed:false};
      if(inp.acc&&inp.acc.length) f.acceptedAnswers=inp.acc;
      q.inputForm=f;
    }
    bank.push(q);
  }
  // 英語→日本語（単語）
  function e2j(unit,diff,en,ja,wrong,h1,h2,acc){
    add(unit,diff,'「'+en+'」は 日本語で どれかな。',ja,wrong,[h1,h2],'「'+en+'」は「'+ja+'」です。',{q:'「'+en+'」は 日本語で 何かな。',acc:acc,mode:'kana-insensitive'});
  }
  // 日本語→英語（単語）
  function j2e(unit,diff,ja,en,wrong,h1,h2){
    add(unit,diff,'「'+ja+'」を 英語で 言うと どれかな。',en,wrong,[h1,h2],'「'+ja+'」は「'+en+'」です。',{q:'「'+ja+'」を 英語で 書こう。',mode:'exact'});
  }
  // 文の意味：英語の文→日本語
  function sn(unit,diff,en,ja,wrong,h1,h2){
    add(unit,diff,'「'+en+'」は どういう 意味かな。',ja,wrong,[h1,h2],'「'+en+'」は「'+ja+'」という 意味です。');
  }
  // 会話・空欄：問題文を自由に書く
  function qa(unit,diff,question,answer,wrong,h1,h2,expl,inp){
    add(unit,diff,question,answer,wrong,[h1,h2],expl,inp);
  }

  // ---- 単語のつづり（書く）：基礎6・標準9・発展7。正しい つづりを えらぶ／書く ----
  function sp(diff,ja,en,wrong,h1,h2){
    add('spell',diff,'「'+ja+'」を 英語で 書くと、正しい つづりは どれかな。',en,wrong,[h1,h2],'「'+ja+'」は「'+en+'」と 書きます。',{q:'「'+ja+'」を 英語で 書こう。',mode:'exact'});
  }
  sp('basic','たいよう','sun',['san','son','sum'],'「サン」と 読むよ。','3文字だよ。s から はじまるよ。');
  sp('basic','かばん','bag',['bug','beg','bog'],'「バッグ」と 読むよ。','3文字だよ。b から はじまるよ。');
  sp('basic','コップ','cup',['cap','cop','kup'],'「カップ」と 読むよ。','3文字だよ。c から はじまるよ。');
  sp('basic','ぼうし','hat',['hit','hut','het'],'「ハット」と 読むよ。','3文字だよ。h から はじまるよ。');
  sp('basic','ぶた','pig',['peg','pug','big'],'「ピッグ」と 読むよ。','3文字だよ。p から はじまるよ。');
  sp('basic','はこ','box',['bax','bog','bax'.replace('bax','bocks')],'「ボックス」と 読むよ。','3文字だよ。x で おわるよ。');
  sp('standard','りんご','apple',['appel','aple','appul'],'「アップル」と 読むよ。','p が 2つ ならぶよ。');
  sp('standard','緑','green',['grean','gren','greeen'],'「グリーン」と 読むよ。','e が 2つ ならぶよ。');
  sp('standard','黒','black',['blak','blck','blach'],'「ブラック」と 読むよ。','「ck」で おわるよ。');
  sp('standard','白','white',['wite','whight','whit'],'「ホワイト」と 読むよ。','「wh」から はじまるよ。');
  sp('standard','とり','bird',['burd','berd','bard'],'「バード」と 読むよ。','「ir」が 入るよ。');
  sp('standard','ぎゅうにゅう','milk',['melk','mulk','mik'],'「ミルク」と 読むよ。','「l」が 入るよ。');
  sp('standard','とら','tiger',['tigar','tyger','tigor'],'「タイガー」と 読むよ。','「i」で はじまる 音だよ。');
  sp('standard','いえ','house',['hause','howse','hous'],'「ハウス」と 読むよ。','「ou」が 入るよ。');
  sp('standard','ともだち','friend',['freind','frend','friand'],'「フレンド」と 読むよ。','「ie」の じゅんばんに 気を つけよう。');
  sp('advanced','バナナ','banana',['bananna','banena','bananaa'],'「バナナ」と 読むよ。','「na」が 2回 くり返されるよ。');
  sp('advanced','うさぎ','rabbit',['rabit','rabbet','rabbitt'],'「ラビット」と 読むよ。','b が 2つ ならぶよ。');
  sp('advanced','黄色','yellow',['yelow','yello','yelloww'],'「イエロー」と 読むよ。','l が 2つ ならぶよ。');
  sp('advanced','えんぴつ','pencil',['pensil','pencel','pencill'],'「ペンシル」と 読むよ。','「c」を 使うよ。');
  sp('advanced','先生','teacher',['techer','teachar','teacer'],'「ティーチャー」と 読むよ。','「ea」と「ch」が 入るよ。');
  sp('advanced','ぞう','elephant',['elefant','elephent','elephand'],'「エレファント」と 読むよ。','「ph」が 入るよ。');
  sp('advanced','日曜日','Sunday',['Sonday','Sundey','Sunnday'],'「サンデー」と 読むよ。','「sun（太陽）」と 「day（日）」を くっつけよう。');

  // ---- じこしょうかい・好きなこと：基礎6・標準9・発展7 ----
  sn('self','basic','I like dogs.','わたしは いぬが 好きです',['わたしは いぬが きらいです','わたしは いぬを かっています','わたしは いぬに なりたいです'],'「like」は 好きという 気もちだよ。','「dogs」は「いぬ」だよ。');
  sn('self','basic','I don\'t like fish.','わたしは さかなが 好きではありません',['わたしは さかなが 好きです','わたしは さかなを 食べました','わたしは さかなを つりました'],'「don\'t」は「～ない」の いみだよ。','「fish」は「さかな」だよ。');
  qa('self','basic','「What do you like?」と 聞かれました。「パンが 好きです」と 答えるのは どれかな。','I like bread.',['I\'m bread.','My name is bread.','Yes, I do.'],'「What do you like?」は「何が 好きですか」だよ。','「I like ～.」で 好きな ものを 言うよ。','「I like bread.」は「わたしはパンが好きです。」です。');
  sn('self','basic','My name is Mika.','わたしの 名前は ミカです',['わたしは ミカが 好きです','わたしは ミカに 会いました','わたしの 友だちは ミカです'],'「name」は「名前」だよ。','「My name is ～.」は じこしょうかいの 言い方だよ。');
  sn('self','basic','I\'m from Japan.','わたしは 日本から 来ました',['わたしは 日本が 好きです','わたしは 日本に 行きます','わたしは 日本語を 話せます'],'「from」は「～から」の いみだよ。','「Japan」は「日本」だよ。');
  sn('self','basic','I\'m ten years old.','わたしは 10才です',['わたしは 10人 います','わたしは 10時に 起きます','わたしは 10月 生まれです'],'「years old」は「～才」だよ。','「ten」は「10」だよ。');
  qa('self','standard','「What\'s your favorite color?」と 聞かれました。「一番 好きな 色は 青です」と 答えるのは どれかな。','My favorite color is blue.',['I like blue color is.','My name is blue.','I\'m blue.'],'「favorite」は「一番 好きな」だよ。','「My favorite ～ is ….」で 答えるよ。','「My favorite color is blue.」は「わたしの一番好きな色は青です。」です。');
  e2j('self','standard','favorite','一番 好きな',['きらいな','大きな','新しい'],'「ベイヴァリット」と 読むよ。','「My favorite food」の ように 使うよ。',['いちばんすきな','お気に入り','おきにいり','好きな','すきな']);
  qa('self','standard','「Do you like soccer?」と 聞かれました。「はい、好きです」と 答えるのは どれかな。','Yes, I do.',['Yes, I am.','Yes, I can.','I like.'],'「Do you ～?」には「do」で 答えるよ。','「はい」は「Yes」だよ。','「Do you like ～?」には、「Yes, I do.」か「No, I don\'t.」で 答えます。');
  sn('self','standard','I like cats, but I don\'t like dogs.','わたしは ねこは 好きですが、いぬは 好きではありません',['わたしは ねこも いぬも 好きです','わたしは ねこは きらいですが、いぬは 好きです','わたしは ねこと いぬを かっています'],'「but」は「でも」の いみだよ。','前と あとで、反対の ことを 言っているよ。');
  sn('self','standard','Please call me Ken.','わたしを ケンと よんでください',['ケンに 電話してください','ケンに 会ってください','ケンを よんでください'],'「call me」は「わたしを よぶ」だよ。','自分の よび名を つたえる 言い方だよ。');
  sn('self','standard','This is my friend, Taro.','こちらは わたしの 友だちの タロウです',['これは わたしの 家です','これは わたしの 先生です','タロウは わたしの 弟です'],'「friend」は「友だち」だよ。','人を しょうかいする ときの 言い方だよ。');
  sn('self','standard','Nice to meet you, too.','こちらこそ はじめまして',['また あした','どういたしまして','ありがとう'],'「Nice to meet you.」と 言われたときの 返事だよ。','「too」は「～も」だよ。');
  sn('self','standard','She likes apples.','かのじょは りんごが 好きです',['わたしは りんごが 好きです','かれは りんごが 好きです','かのじょは りんごを 食べました'],'「She」は「かのじょ」だよ。','「likes」は「好き」の she に 合わせた 形だよ。');
  sn('self','standard','He likes music.','かれは 音楽が 好きです',['かのじょは 音楽が 好きです','わたしは 音楽が 好きです','かれは 音楽を ききました'],'「He」は「かれ」だよ。','「music」は「音楽」だよ。');
  qa('self','advanced','「Who is this?」「This is my mother.」この 答えは どういう 意味かな。','こちらは わたしの お母さんです',['こちらは わたしの 先生です','これは わたしの かばんです','お母さんは どこですか'],'「mother」は「お母さん」だよ。','「Who is this?」は「こちらは だれですか」だよ。','「This is my mother.」は「こちらはわたしのお母さんです。」です。');
  sn('self','advanced','He is my brother.','かれは わたしの 兄（弟）です',['かれは わたしの お父さんです','かれは わたしの 友だちです','かれは わたしの 先生です'],'「brother」は「兄・弟」だよ。','「He」は「かれ」だよ。');
  qa('self','advanced','「What sport do you like?」と 聞かれました。「テニスが 好きです」と 答えるのは どれかな。','I like tennis.',['I\'m tennis.','Yes, I do.','I can tennis.'],'「sport」は「スポーツ」だよ。','「I like ～.」で 答えるよ。','「What sport do you like?」は「どんなスポーツが好きですか。」です。');
  qa('self','advanced','「What\'s your favorite subject?」と 聞かれました。「算数が 一番 好きです」と 答えるのは どれかな。','My favorite subject is math.',['I like math is.','My subject is favorite.','I\'m math.'],'「subject」は「教科」だよ。','「My favorite subject is ～.」で 答えるよ。','「What\'s your favorite subject?」は「一番好きな教科は何ですか。」です。');
  sn('self','advanced','I like swimming.','わたしは およぐことが 好きです',['わたしは およげます','わたしは およぎました','わたしは およぎたいです'],'「swimming」は「およぐこと」の いみだよ。','「like ～ing」で「～することが 好き」だよ。');
  qa('self','advanced','「My favorite animal is the panda.」の「animal」は 日本語で 何かな。','動物',['食べもの','スポーツ','教科'],'「panda」は「パンダ」だよ。','「animal」は「アニマル」と 読むよ。','「animal」は「動物」です。「My favorite animal is the panda.」は「わたしの一番好きな動物はパンダです。」です。',{q:'「animal」は 日本語で 何かな。',mode:'kana-insensitive',acc:['どうぶつ']});
  sn('self','advanced','I don\'t like spiders.','わたしは クモが 好きではありません',['わたしは クモが 好きです','わたしは クモを つかまえました','わたしは クモを 見ました'],'「don\'t like」は「好きではない」だよ。','「spiders」は「クモ」だよ。');

  // ---- たんじょう日・月・日付：基礎6・標準9・発展7 ----
  function od(diff,num,en,wrong,h1,h2){
    add('month',diff,'「'+num+'」を 英語の 順番の 言い方で 言うと どれかな。',en,wrong,[h1,h2],'「'+num+'」は「'+en+'」です。',{q:'「'+num+'」を 英語の 順番の 言い方で 書こう。',mode:'exact'});
  }
  od('basic','1st','first',['one','second','third'],'「ファースト」と 読むよ。','「いちばん はじめ」だよ。');
  od('basic','2nd','second',['two','first','third'],'「セカンド」と 読むよ。','「2番目」だよ。');
  od('basic','3rd','third',['three','second','fourth'],'「サード」と 読むよ。','「3番目」だよ。');
  od('basic','4th','fourth',['four','third','fifth'],'「フォース」と 読むよ。','four に th が ついた 形だよ。');
  od('basic','5th','fifth',['five','fourth','sixth'],'「フィフス」と 読むよ。','five の e が とれて、「fifth」に なるよ。');
  od('basic','10th','tenth',['ten','nineth','eleventh'],'「テンス」と 読むよ。','ten に th が ついた 形だよ。');
  od('standard','11th','eleventh',['eleven','tenth','twelfth'],'「イレブンス」と 読むよ。','eleven に th が ついた 形だよ。');
  od('standard','12th','twelfth',['twelve','eleventh','thirteenth'],'「トゥエルフス」と 読むよ。','twelve の ve が lf に かわるよ。');
  od('standard','20th','twentieth',['twenty','nineteenth','twenty-first'],'「トゥエンティエス」と 読むよ。','twenty の y が ie に かわるよ。');
  qa('month','standard','「My birthday is May 5th.」は いつの たんじょう日かな。','5月5日',['5月15日','4月5日','5月3日'],'「May」は「5月」だよ。','「5th」は「5番目＝5日」だよ。','「May 5th」は「5月5日」です。',{q:'「My birthday is May 5th.」は 何月何日かな。（例：3月10日）',mode:'kana-insensitive',acc:['5月5日','５月５日','五月五日']});
  qa('month','standard','「When is your birthday?」と 聞かれました。「10月10日です」と 答えるのは どれかな。','My birthday is October 10th.',['My birthday is October 1st.','My birthday is November 10th.','My birthday is 10th October is.'],'「October」は「10月」だよ。','「10日」は「10th」だよ。','「My birthday is October 10th.」は「わたしのたんじょう日は10月10日です。」です。');
  qa('month','standard','「When is your birthday?」は どういう 意味かな。','あなたの たんじょう日は いつですか',['あなたの たんじょう日は 何才ですか','あなたの たんじょう日は どこですか','あなたは だれですか'],'「When」は「いつ」だよ。','「birthday」は「たんじょう日」だよ。','「When is your birthday?」は「あなたのたんじょう日はいつですか。」です。');
  od('standard','21st','twenty-first',['twenty-one','twentieth','twenty-second'],'「トゥエンティファースト」と 読むよ。','twenty と first を ハイフンで つなぐよ。');
  od('standard','22nd','twenty-second',['twenty-two','twenty-first','twenty-third'],'「トゥエンティセカンド」と 読むよ。','twenty と second を ハイフンで つなぐよ。');
  od('standard','30th','thirtieth',['thirty','twenty-ninth','thirty-first'],'「サーティエス」と 読むよ。','thirty の y が ie に かわるよ。');
  qa('month','advanced','「July 7th」は 何月何日かな。','7月7日',['7月17日','6月7日','7月3日'],'「July」は「7月」だよ。','七夕の 日だよ。','「July 7th」は「7月7日（七夕）」です。',{q:'「July 7th」は 何月何日かな。（例：3月10日）',mode:'kana-insensitive',acc:['7月7日','７月７日','七月七日']});
  qa('month','advanced','「December 25th」は 何の 日かな。','クリスマス',['お正月','たんじょう日','こどもの日'],'「December」は「12月」だよ。','12月の 25日の 行事だよ。','「December 25th」は「12月25日」で、クリスマスです。',{q:'「December 25th」は 何の 日かな。',mode:'kana-insensitive',acc:['クリスマス','くりすます','Christmas','christmas']});
  qa('month','advanced','「What\'s the date today?」「It\'s March 3rd.」は どういう 意味かな。','今日は 3月3日です',['今日は 3月3日ではありません','明日は 3月3日です','きのうは 3月3日でした'],'「date」は「日付」だよ。','「It\'s ～.」で 日付を 答えるよ。','「What\'s the date today?」は「今日は何月何日ですか。」です。「It\'s March 3rd.」は「3月3日です。」です。');
  qa('month','advanced','「Children\'s Day is May 5th.」は どういう 意味かな。','こどもの日は 5月5日です',['こどもの日は 5月15日です','こどもの日は 4月5日です','こどもの日は 5月5日では ありません'],'「Children\'s Day」は「こどもの日」だよ。','「May」は「5月」だよ。','「Children\'s Day is May 5th.」は「こどもの日は5月5日です。」です。');
  qa('month','advanced','「New Year\'s Day is January 1st.」は どういう 意味かな。','お正月は 1月1日です',['お正月は 12月31日です','お正月は 1月11日です','お正月は 2月1日です'],'「New Year\'s Day」は「お正月」だよ。','「January」は「1月」だよ。','「New Year\'s Day is January 1st.」は「お正月は1月1日です。」です。');
  qa('month','advanced','「August 31st」は 何月何日かな。','8月31日',['8月13日','7月31日','8月30日'],'「August」は「8月」だよ。','夏休みの 最後の 日だよ。','「August 31st」は「8月31日」です。',{q:'「August 31st」は 何月何日かな。（例：3月10日）',mode:'kana-insensitive',acc:['8月31日','８月３１日','八月三十一日']});
  qa('month','advanced','「February」は 日数が 少ない 月です。何月かな。','2月',['1月','3月','12月'],'「フェブラリー」と 読むよ。','4年に 一度、29日まで ある 年が あるよ。','「February」は「2月」です。',{q:'「February」は 何月かな。（数字で）',ans:'2',mode:'number',acc:['2月','２月']});

  // ---- できること：基礎6・標準9・発展7 ----
  e2j('can','basic','sing','うたう',['おどる','およぐ','走る'],'「シング」と 読むよ。','歌を 声に 出して うたうよ。',['歌う']);
  e2j('can','basic','dance','おどる',['うたう','およぐ','走る'],'「ダンス」と 読むよ。','音楽に 合わせて 体を 動かすよ。',['踊る','ダンスする']);
  e2j('can','basic','jump','とぶ',['走る','およぐ','よむ'],'「ジャンプ」と 読むよ。','日本語でも「ジャンプ」と 言うよ。',['跳ぶ','ジャンプする','とびあがる']);
  e2j('can','basic','cook','料理する',['おどる','およぐ','かく'],'「クック」と 読むよ。','台所で ごはんを 作るよ。',['りょうりする','りょうりをする','料理をする','つくる']);
  e2j('can','basic','ride a bike','自転車に 乗る',['車を うんてんする','およぐ','走る'],'「ライド ア バイク」と 読むよ。','「bike」は「自転車」だよ。',['自転車にのる','じてんしゃにのる','自転車に乗る']);
  e2j('can','basic','play the piano','ピアノを ひく',['ピアノを 買う','ピアノを 見る','ピアノを 作る'],'「プレイ ザ ピアノ」と 読むよ。','音楽の 時間に よく するよ。',['ピアノをひく','ピアノを弾く','ピアノをひく']);
  sn('can','standard','I can\'t ride a unicycle.','わたしは 一輪車に 乗れません',['わたしは 一輪車に 乗れます','わたしは 一輪車を もっています','わたしは 一輪車が 好きです'],'「can\'t」は「～できない」だよ。','「unicycle」は「一輪車」だよ。');
  qa('can','standard','「Can you swim?」と 聞かれました。「いいえ、およげません」と 答えるのは どれかな。','No, I can\'t.',['No, I don\'t.','No, I\'m not.','Yes, I can.'],'「Can you ～?」には「can」で 答えるよ。','「いいえ」は「No」だよ。','「Can you ～?」に「いいえ」と 答えるときは、「No, I can\'t.」と 言います。');
  sn('can','standard','He can run fast.','かれは 速く 走れます',['かれは 速く 走りたいです','かれは 速く 走りました','かれは 走れません'],'「He」は「かれ」だよ。','「fast」は「速く」だよ。');
  sn('can','standard','She can\'t sing.','かのじょは うたえません',['かのじょは うたえます','かのじょは うたいたいです','かのじょは うたいました'],'「She」は「かのじょ」だよ。','「can\'t」は「～できない」だよ。');
  sn('can','standard','I can speak English.','わたしは 英語を 話せます',['わたしは 英語を 勉強しています','わたしは 英語が きらいです','わたしは 英語を 話せません'],'「speak」は「話す」だよ。','「can」は「～できる」だよ。');
  qa('can','standard','「Can you cook?」と 聞かれました。「はい、料理が できます」と 答えるのは どれかな。','Yes, I can.',['Yes, I do.','Yes, I am.','No, I can.'],'「Can you ～?」には「can」で 答えるよ。','「はい」は「Yes」だよ。','「Can you ～?」に「はい」と 答えるときは、「Yes, I can.」と 言います。');
  sn('can','standard','I can ski.','わたしは スキーが できます',['わたしは スキーが 好きです','わたしは スキーを 見ました','わたしは スキーが できません'],'「ski」は「スキー」だよ。','「can」は「～できる」だよ。');
  qa('can','standard','「What can you do?」「I can swim.」は どういう 意味かな。','あなたは 何が できますか。わたしは およげます。',['あなたは 何が 好きですか。わたしは およぎます。','あなたは どこへ 行きますか。わたしは およぎに 行きます。','あなたは だれですか。わたしは およぎます。'],'「What」は「何」だよ。','「can」は「～できる」だよ。','「What can you do?」は「あなたは何ができますか。」です。');
  sn('can','standard','I can play the guitar.','わたしは ギターが ひけます',['わたしは ギターが ひけません','わたしは ギターを 買いたいです','わたしは ギターが 好きです'],'「guitar」は「ギター」だよ。','「can」は「～できる」だよ。');
  sn('can','advanced','I can play soccer well.','わたしは サッカーが じょうずに できます',['わたしは サッカーが 好きです','わたしは サッカーが できません','わたしは サッカーを 見ました'],'「well」は「じょうずに」だよ。','「can」は「～できる」だよ。');
  sn('can','advanced','I can\'t play the guitar.','わたしは ギターを ひけません',['わたしは ギターを ひけます','わたしは ギターを 買いました','わたしは ギターを もっています'],'「can\'t」は「～できない」だよ。','「guitar」は「ギター」だよ。');
  qa('can','advanced','「Can he swim?」と 聞かれました。「はい、かれは およげます」と 答えるのは どれかな。','Yes, he can.',['Yes, I can.','Yes, he does.','Yes, he is.'],'「Can he ～?」の 「he」は「かれ」だよ。','答えにも「he」を 使うよ。','「Can he swim?」には、「Yes, he can.」か「No, he can\'t.」で 答えます。');
  qa('can','advanced','「Can you jump rope?」の「jump rope」は 日本語で 何かな。','なわとび',['つなひき','おいかけっこ','かくれんぼ'],'「jump」は「とぶ」、「rope」は「ロープ」だよ。','体育で よく する 運動だよ。','「jump rope」は「なわとび」です。',{q:'「jump rope」は 日本語で 何かな。',mode:'kana-insensitive',acc:['縄跳び','なわとび']});
  qa('can','advanced','「I can play the piano, but I can\'t play the violin.」の 意味は どれかな。','ピアノは ひけるけれど、バイオリンは ひけません',['ピアノも バイオリンも ひけます','ピアノは ひけないけれど、バイオリンは ひけます','ピアノも バイオリンも ひけません'],'「but」は「でも」の いみだよ。','前と あとで、反対の ことを 言っているよ。','「but」の 前は「ひける」、あとは「ひけない」と 反対の ことを 言っています。');
  qa('can','advanced','「I can\'t swim, but I can run fast.」で、およげない ことを 言っているのは どちらかな。','前の 文（I can\'t swim）',['あとの 文（I can run fast）','どちらでも ない','どちらも およげる'],'「can\'t」は「～できない」だよ。','「but」の 前と あとを くらべよう。','「I can\'t swim」は「およげません」、「I can run fast」は「速く 走れます」です。');

  sn('can','advanced','She can dance very well.','かのじょは とても じょうずに おどれます',['かのじょは とても おどりが きらいです','かのじょは とても じょうずに うたえます','かのじょは おどれません'],'「very well」は「とても じょうずに」だよ。','「dance」は「おどる」だよ。');

  // ---- 一日の生活：基礎6・標準9・発展7 ----
  e2j('daily','basic','get up','起きる',['ねる','ごはんを 食べる','学校へ 行く'],'「ゲット アップ」と 読むよ。','朝 一番に する ことだよ。',['おきる','起床する']);
  e2j('daily','basic','eat breakfast','朝ごはんを 食べる',['昼ごはんを 食べる','夕ごはんを 食べる','おやつを 食べる'],'「イート ブレックファスト」と 読むよ。','朝に する ことだよ。',['朝食を食べる','あさごはんをたべる','朝ごはんをたべる']);
  e2j('daily','basic','go to school','学校へ 行く',['学校から 帰る','学校で 遊ぶ','学校を やすむ'],'「ゴー トゥ スクール」と 読むよ。','朝 家を 出て、行く 場所だよ。',['学校にいく','学校に行く','がっこうへいく']);
  e2j('daily','basic','eat lunch','昼ごはんを 食べる',['朝ごはんを 食べる','夕ごはんを 食べる','おやつを 食べる'],'「イート ランチ」と 読むよ。','給食の 時間だよ。',['昼食を食べる','ひるごはんをたべる','給食を食べる']);
  e2j('daily','basic','go home','家に 帰る',['学校へ 行く','学校で 遊ぶ','家で ねる'],'「ゴー ホーム」と 読むよ。','「home」は「家」だよ。',['帰る','かえる','うちにかえる','家に帰る','いえにかえる']);
  e2j('daily','basic','go to bed','ねる',['起きる','おふろに 入る','食事を する'],'「ゴー トゥ ベッド」と 読むよ。','夜に する ことだよ。',['寝る','ベッドに行く','ねどこに入る','就寝する']);
  qa('daily','standard','「What time do you get up?」と 聞かれました。「7時に 起きます」と 答えるのは どれかな。','I get up at seven.',['I get up seven.','I am get up at seven.','I get up on seven.'],'「at」は「～に（時刻）」だよ。','「seven」は「7」だよ。','「What time do you get up?」は「何時に起きますか。」です。「I get up at seven.」は「7時に起きます。」です。');
  sn('daily','standard','I do my homework.','わたしは しゅくだいを します',['わたしは 本を 読みます','わたしは テレビを 見ます','わたしは ごはんを 作ります'],'「homework」は「しゅくだい」だよ。','「do」は「する」だよ。');
  sn('daily','standard','I take a bath.','わたしは おふろに 入ります',['わたしは 顔を あらいます','わたしは 歯を みがきます','わたしは 水を のみます'],'「bath」は「おふろ」だよ。','夜に よく する ことだよ。');
  sn('daily','standard','I watch TV.','わたしは テレビを 見ます',['わたしは テレビを 買います','わたしは ラジオを 聞きます','わたしは 本を 読みます'],'「watch」は「見る」だよ。','「TV」は「テレビ」だよ。');
  sn('daily','standard','I eat dinner at seven.','わたしは 7時に 夕ごはんを 食べます',['わたしは 7時に 起きます','わたしは 7時に 朝ごはんを 食べます','わたしは 7時に ねます'],'「dinner」は「夕ごはん」だよ。','「at seven」は「7時に」だよ。');
  sn('daily','standard','I brush my teeth.','わたしは 歯を みがきます',['わたしは 顔を あらいます','わたしは 髪を とかします','わたしは おふろに 入ります'],'「teeth」は「歯」だよ。','「brush」は「ブラシで みがく」だよ。');
  sn('daily','standard','I go to bed at nine.','わたしは 9時に ねます',['わたしは 9時に 起きます','わたしは 9時に 学校へ 行きます','わたしは 9時に ごはんを 食べます'],'「go to bed」は「ねる」だよ。','「at nine」は「9時に」だよ。');
  sn('daily','standard','I eat breakfast at seven fifteen.','わたしは 7時15分に 朝ごはんを 食べます',['わたしは 7時50分に 朝ごはんを 食べます','わたしは 7時15分に 夕ごはんを 食べます','わたしは 7時15分に 起きます'],'「seven fifteen」は「7時15分」だよ。','「breakfast」は「朝ごはん」だよ。');
  qa('daily','standard','「What time do you go to school?」と 聞かれました。「8時に 行きます」と 答えるのは どれかな。','I go to school at eight.',['I go to school eight.','I get up at eight.','I eat at school eight.'],'「at eight」で「8時に」だよ。','「go to school」は「学校へ 行く」だよ。','「What time do you go to school?」は「何時に学校へ行きますか。」です。');
  e2j('daily','advanced','in the morning','朝に',['夜に','午後に','夕方に'],'「イン ザ モーニング」と 読むよ。','「morning」は「朝」だよ。',['あさに','午前に','ごぜんに']);
  e2j('daily','advanced','in the afternoon','午後に',['朝に','夜に','夕方に'],'「イン ジ アフタヌーン」と 読むよ。','「afternoon」は「午後」だよ。',['ごごに']);
  e2j('daily','advanced','at night','夜に',['朝に','午後に','夕方に'],'「アット ナイト」と 読むよ。','「night」は「夜」だよ。',['よるに']);
  e2j('daily','advanced','every day','毎日',['毎週','毎月','毎年'],'「エブリ デイ」と 読むよ。','「day」は「日」だよ。',['まいにち']);
  qa('daily','advanced','「I study English on Mondays.」の「on Mondays」は どういう 意味かな。','毎週 月曜日に',['毎日','月曜日だけ きのう','月曜日に ならないと'],'「Monday」は「月曜日」だよ。','「Mondays」と 複数形に なっているよ。','「on Mondays」は「毎週月曜日に」です。');
  qa('daily','advanced','「What do you do on Sundays?」と 聞かれました。「サッカーを します」と 答えるのは どれかな。','I play soccer.',['I am soccer.','I like soccer is.','I soccer play.'],'「play」は「（スポーツを）する」だよ。','「What do you do ～?」は「何を しますか」だよ。','「What do you do on Sundays?」は「日曜日には何をしますか。」です。「I play soccer.」は「サッカーをします。」です。');
  sn('daily','advanced','I always eat breakfast.','わたしは いつも 朝ごはんを 食べます',['わたしは ときどき 朝ごはんを 食べます','わたしは 朝ごはんを 食べません','わたしは 朝ごはんを 作ります'],'「always」は「いつも」だよ。','毎日 かならず する ことを 言う ときに 使うよ。');

  // ---- 道案内・場所：基礎6・標準9・発展7 ----
  e2j('direction','basic','turn right','右に 曲がる',['左に 曲がる','まっすぐ 進む','止まる'],'「ターン ライト」と 読むよ。','「right」は 右だよ。',['みぎにまがる','右へ曲がる','右に曲がる']);
  e2j('direction','basic','turn left','左に 曲がる',['右に 曲がる','まっすぐ 進む','止まる'],'「ターン レフト」と 読むよ。','「left」は 左だよ。',['ひだりにまがる','左へ曲がる','左に曲がる']);
  e2j('direction','basic','go straight','まっすぐ 進む',['右に 曲がる','左に 曲がる','止まる'],'「ゴー ストレート」と 読むよ。','道を まっすぐ 行くよ。',['まっすぐいく','まっすぐすすむ','真っすぐ進む','まっすぐ行く']);
  e2j('direction','basic','stop','止まる',['進む','曲がる','走る'],'「ストップ」と 読むよ。','日本語でも「ストップ」と 言うよ。',['とまる','止まれ','とまれ']);
  e2j('direction','basic','park','公園',['学校','駅','図書館'],'「パーク」と 読むよ。','遊ぶ ところだよ。',['こうえん']);
  e2j('direction','basic','school','学校',['公園','駅','病院'],'「スクール」と 読むよ。','毎日 通う ところだよ。',['がっこう']);
  e2j('direction','standard','library','図書館',['公園','病院','駅'],'「ライブラリー」と 読むよ。','本を かりる ところだよ。',['としょかん']);
  e2j('direction','standard','post office','ゆうびんきょく',['病院','銀行','駅'],'「ポスト オフィス」と 読むよ。','手紙や はがきを 出す ところだよ。',['郵便局','ゆうびんきょく']);
  e2j('direction','standard','station','駅',['公園','学校','図書館'],'「ステーション」と 読むよ。','電車に 乗る ところだよ。',['えき']);
  e2j('direction','standard','hospital','病院',['学校','駅','公園'],'「ホスピタル」と 読むよ。','病気や けがを みてもらう ところだよ。',['びょういん']);
  e2j('direction','standard','supermarket','スーパーマーケット',['図書館','病院','公園'],'「スーパーマーケット」と 読むよ。','食べものや 日用品を 買う ところだよ。',['スーパー','すーぱー']);
  e2j('direction','standard','bank','銀行',['病院','駅','学校'],'「バンク」と 読むよ。','お金を あずける ところだよ。',['ぎんこう']);
  qa('direction','standard','「Excuse me. Where is the station?」と 聞かれました。「まっすぐ 行って、右に 曲がって ください」と 答えるのは どれかな。','Go straight and turn right.',['Turn left and stop.','It\'s a station.','I like trains.'],'「Where is ～?」は「～は どこですか」だよ。','「Go straight」は「まっすぐ」、「turn right」は「右に 曲がる」だよ。','「Go straight and turn right.」は「まっすぐ行って、右に曲がってください。」です。');
  sn('direction','standard','It\'s on your left.','それは あなたの 左がわに あります',['それは あなたの 右がわに あります','それは あなたの 前に あります','それは あなたの うしろに あります'],'「left」は「左」だよ。','「on your ～」は「あなたの ～がわに」だよ。');
  sn('direction','standard','It\'s next to the library.','それは 図書館の となりに あります',['それは 図書館の 前に あります','それは 図書館の 中に あります','それは 図書館の 近くには ありません'],'「next to」は「～の となり」だよ。','「library」は「図書館」だよ。');
  qa('direction','advanced','「It\'s between the bank and the post office.」は どういう 意味かな。','それは 銀行と ゆうびんきょくの 間に あります',['それは 銀行の となりに あります','それは ゆうびんきょくの 前に あります','それは 銀行の 中に あります'],'「between A and B」は「AとBの 間」だよ。','「bank」は「銀行」、「post office」は「ゆうびんきょく」だよ。','「between A and B」は「AとBの間」です。');
  sn('direction','advanced','Go straight for two blocks.','2ブロック まっすぐ 行ってください',['2回 曲がってください','2ブロック もどってください','2分 待ってください'],'「block」は「ブロック（道の 区切り）」だよ。','「two blocks」は「2ブロック」だよ。');
  sn('direction','advanced','Turn left at the corner.','かどで 左に 曲がってください',['かどで 右に 曲がってください','かどで 止まってください','かどに 立ってください'],'「corner」は「かど」だよ。','「turn left」は「左に 曲がる」だよ。');
  qa('direction','advanced','「Excuse me. Where is the post office?」は どういう 意味かな。','すみません。ゆうびんきょくは どこですか',['すみません。ゆうびんきょくは 何時ですか','すみません。ゆうびんきょくに 行きます','すみません。ゆうびんきょくは あそこですか'],'「Excuse me.」は「すみません」だよ。','「Where」は「どこ」だよ。','「Where is the post office?」は「ゆうびんきょくはどこですか。」です。');
  e2j('direction','advanced','near','～の 近く',['～の となり','～の 中','～の 前'],'「ニア」と 読むよ。','遠く ないことを 表すよ。',['ちかく','近く','～のちかく']);
  qa('direction','advanced','「The park is near the school.」は どういう 意味かな。','公園は 学校の 近くに あります',['公園は 学校の となりに あります','公園は 学校の 中に あります','公園は 学校から とても 遠いです'],'「near」は「近く」だよ。','「park」は「公園」、「school」は「学校」だよ。','「The park is near the school.」は「公園は学校の近くにあります。」です。');
  sn('direction','advanced','It\'s across from the school.','それは 学校の 向かい側に あります',['それは 学校の となりに あります','それは 学校の 中に あります','それは 学校の うしろに あります'],'「across from」は「～の 向かい側」だよ。','「school」は「学校」だよ。');
})(window);
