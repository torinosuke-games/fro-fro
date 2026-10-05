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

  // ---- 買い物・ほしいもの：基礎6・標準9・発展7 ----
  e2j('want','basic','want','ほしい',['すきな','たべる','かう'],'「ウォント」と 読むよ。','「I want a bag.」の「want」だよ。',['欲しい','ほしいです']);
  sn('want','basic','I want a bag.','わたしは かばんが ほしいです',['わたしは かばんを もっています','わたしは かばんを かいました','わたしは かばんが すきです'],'「want」は「ほしい」だよ。','「bag」は「かばん」だよ。');
  e2j('want','basic','How much?','いくら',['いつ','どこ','だれ'],'「ハウ マッチ」と 読むよ。','ねだんを たずねる 言葉だよ。',['いくらですか','いくら？']);
  e2j('want','basic','yen','円',['ドル','ユーロ','元'],'「イェン」と 読むよ。','日本の お金の たんいだよ。',['えん']);
  e2j('want','basic','Here you are.','どうぞ',['ありがとう','すみません','さようなら'],'ものを わたすときに 言うよ。','「Thank you.」と 返されることが 多いよ。',['はい、どうぞ','どうぞ']);
  e2j('want','basic','one hundred','100',['10','1000','11'],'「ワン ハンドレッド」と 読むよ。','hundred は「百」だよ。',['百','ひゃく','100']);
  qa('want','standard','「How much is this?」と 聞かれました。「300円です」と 答えるのは どれかな。','It\'s three hundred yen.',['It\'s thirty yen.','I\'m three hundred.','Yes, it is.'],'「How much ～?」は ねだんを たずねるよ。','「three hundred」は「300」だよ。','「How much is this?」は「これは いくらですか。」です。「It\'s three hundred yen.」は「300円です。」です。');
  sn('want','standard','I want a new bike.','わたしは 新しい 自転車が ほしいです',['わたしは 新しい 自転車を もっています','わたしは 新しい 自転車を 買いました','わたしは 新しい 自転車に 乗れます'],'「new」は「新しい」だよ。','「bike」は「自転車」だよ。');
  sn('want','standard','I\'d like a hamburger.','ハンバーガーを ください',['ハンバーガーが きらいです','ハンバーガーを 作りました','ハンバーガーは どこですか'],'「I\'d like ～.」は「～を ください」と ていねいに たのむ 言い方だよ。','お店で よく 使うよ。');
  qa('want','standard','「What do you want?」と 聞かれました。「ペンが ほしいです」と 答えるのは どれかな。','I want a pen.',['I like a pen.','I\'m a pen.','Yes, I do.'],'「What do you want?」は「何が ほしいですか」だよ。','「I want ～.」で 答えるよ。','「What do you want?」は「何がほしいですか。」です。「I want a pen.」は「ペンがほしいです。」です。');
  e2j('want','standard','two hundred','200',['20','2000','22'],'「トゥー ハンドレッド」と 読むよ。','hundred は「百」だよ。',['二百','にひゃく','200']);
  e2j('want','standard','five hundred','500',['50','5000','15'],'「ファイブ ハンドレッド」と 読むよ。','hundred は「百」だよ。',['五百','ごひゃく','500']);
  sn('want','standard','Can I have an ice cream?','アイスクリームを ください',['アイスクリームを 作りましたか','アイスクリームが すきですか','アイスクリームは どこですか'],'「Can I have ～?」は「～を ください」と たのむ 言い方だよ。','「ice cream」は「アイスクリーム」だよ。');
  sn('want','standard','Anything else?','ほかには ありますか',['ほかに どこへ 行きますか','ほかの 人は だれですか','ほかに 何時ですか'],'お店の人が よく 言うよ。','「else」は「ほかに」だよ。');
  sn('want','standard','That\'s all, thank you.','それで ぜんぶです、ありがとう',['それは いくらですか','それは ほしくありません','それを ください'],'「all」は「ぜんぶ」だよ。','買い物の おわりに 言うよ。');
  e2j('want','advanced','one thousand','1000',['100','10000','1001'],'「ワン サウザンド」と 読むよ。','thousand は「千」だよ。',['千','せん','1000']);
  qa('want','advanced','「It\'s one thousand yen.」は いくらかな。','1000円',['100円','10000円','1001円'],'「thousand」は「千」だよ。','「yen」は「円」だよ。','「It\'s one thousand yen.」は「1000円です。」です。',{q:'「It\'s one thousand yen.」は いくらかな。（数字で）',ans:'1000',mode:'number',acc:['1000円','千円']});
  sn('want','advanced','How much are these?','これらは いくらですか',['これらは いくつですか','これらは だれの ものですか','これらは どこに ありますか'],'「these」は「これら（いくつかの もの）」だよ。','ねだんを たずねる 言い方だよ。');
  sn('want','advanced','I don\'t want a bag.','わたしは かばんは いりません',['わたしは かばんが ほしいです','わたしは かばんを 買いました','わたしは かばんが きらいです'],'「don\'t want」は「ほしくない」だよ。','「bag」は「かばん」だよ。');
  e2j('want','advanced','two thousand','2000',['200','20000','2001'],'「トゥー サウザンド」と 読むよ。','thousand は「千」だよ。',['二千','にせん','2000']);
  sn('want','advanced','I want to buy a cake.','わたしは ケーキを 買いたいです',['わたしは ケーキを 作りたいです','わたしは ケーキが ほしくありません','わたしは ケーキを 買いました'],'「want to ～」は「～したい」だよ。','「buy」は「買う」だよ。');
  qa('want','advanced','「Do you want a pen?」と 聞かれました。「はい、おねがいします」と 答えるのは どれかな。','Yes, please.',['Yes, I can.','Yes, I am.','Thank you, no.'],'「please」は「おねがいします」だよ。','ものを すすめられたときに 使うよ。','「Do you want ～?」と すすめられて「はい、おねがいします」は「Yes, please.」です。');

  // ---- 職業・なりたいもの：基礎6・標準9・発展7 ----
  e2j('job','basic','doctor','医者',['先生','かんごし','りょうりにん'],'「ドクター」と 読むよ。','病気を なおす 人だよ。',['いしゃ','お医者さん','おいしゃさん']);
  e2j('job','basic','teacher','先生',['医者','パン屋さん','歌手'],'「ティーチャー」と 読むよ。','学校で 教えてくれる 人だよ。',['せんせい']);
  e2j('job','basic','nurse','かんごし',['医者','先生','警察官'],'「ナース」と 読むよ。','病院で 病人の せわを する 人だよ。',['看護師','かんごふ','ナース']);
  e2j('job','basic','cook','料理人',['医者','先生','農家'],'「クック」と 読むよ。','レストランで 料理を 作る 人だよ。',['りょうりにん','コック','シェフ']);
  e2j('job','basic','singer','歌手',['先生','医者','画家'],'「シンガー」と 読むよ。','歌を うたう 人だよ。',['かしゅ']);
  e2j('job','basic','farmer','農家',['料理人','先生','歌手'],'「ファーマー」と 読むよ。','畑で やさいを 育てる 人だよ。',['のうか','農夫','のうふ']);
  e2j('job','standard','pilot','パイロット',['けいさつかん','かんごし','先生'],'「パイロット」と 読むよ。','ひこうきを うんてんする 人だよ。',['ぱいろっと','操縦士']);
  e2j('job','standard','baker','パン屋さん',['花屋さん','肉屋さん','魚屋さん'],'「ベイカー」と 読むよ。','パンを やく 人だよ。',['パンや','パン屋','ぱんやさん','パンやさん']);
  e2j('job','standard','police officer','けいさつかん',['しょうぼうし','かんごし','先生'],'「ポリス オフィサー」と 読むよ。','町の あんぜんを まもる 人だよ。',['警察官','おまわりさん','けいさつ']);
  e2j('job','standard','firefighter','しょうぼうし',['けいさつかん','かんごし','先生'],'「ファイアファイター」と 読むよ。','火事を 消す 人だよ。',['消防士','しょうぼうかん','消防隊員']);
  e2j('job','standard','scientist','科学者',['医者','先生','歌手'],'「サイエンティスト」と 読むよ。','研究を する 人だよ。',['かがくしゃ']);
  qa('job','standard','「What do you want to be?」は どういう 意味かな。','あなたは 何に なりたいですか',['あなたは 何が すきですか','あなたは 何を もっていますか','あなたは どこから 来ましたか'],'「want to be」は「～に なりたい」だよ。','「What」は「何」だよ。','「What do you want to be?」は「あなたは何になりたいですか。」です。');
  qa('job','standard','「What do you want to be?」と 聞かれました。「医者に なりたいです」と 答えるのは どれかな。','I want to be a doctor.',['I want a doctor.','I\'m a doctor now.','I like doctor.'],'「want to be ～」は「～に なりたい」だよ。','「doctor」は「医者」だよ。','「I want to be a doctor.」は「わたしは医者になりたいです。」です。');
  sn('job','standard','I want to be a teacher.','わたしは 先生に なりたいです',['わたしは 先生が すきです','わたしは 先生に 会いました','わたしは 先生です'],'「want to be」は「～に なりたい」だよ。','「teacher」は「先生」だよ。');
  sn('job','standard','She wants to be a singer.','かのじょは 歌手に なりたいです',['かのじょは 歌手です','かのじょは 歌が すきです','かのじょは 歌手に 会いました'],'「wants to be」は「～に なりたい」の she に 合わせた 形だよ。','「singer」は「歌手」だよ。');
  e2j('job','advanced','astronaut','うちゅうひこうし',['パイロット','科学者','船長'],'「アストロノート」と 読むよ。','ロケットで うちゅうへ 行く 人だよ。',['うちゅう飛行士','アストロノート']);
  e2j('job','advanced','vet','じゅうい',['医者','かんごし','先生'],'「ベット」と 読むよ。','動物の 病気を なおす 人だよ。',['獣医','じゅういさん','動物のお医者さん']);
  e2j('job','advanced','florist','花屋さん',['パン屋さん','魚屋さん','肉屋さん'],'「フローリスト」と 読むよ。','「flower（花）」に にているよ。',['はなや','花屋','はなやさん']);
  e2j('job','advanced','soccer player','サッカー選手',['やきゅう選手','テニス選手','水泳選手'],'「サッカー プレイヤー」と 読むよ。','「player」は「選手」だよ。',['サッカーせんしゅ']);
  qa('job','advanced','「I like animals. I want to be a ( ).」の ( )に 入る 職業は どれかな。','vet',['pilot','baker','singer'],'「animals」は「動物」だよ。','動物の 病気を なおす 人だよ。','「I like animals.（動物が好き）」とあるので、( )には「vet（じゅうい）」が合います。',{q:'「I like animals. I want to be a ( ).」の ( )に 入る、動物の 病気を なおす 人を 英語で 書こう。（v で はじまる）',mode:'exact'});
  qa('job','advanced','「He is a pilot.」は どういう 意味かな。','かれは パイロットです',['かれは パイロットに なりたいです','かれは パイロットが すきです','かれは パイロットに 会いました'],'「is」は「～です」だよ。','今、その 仕事を して いる という 意味だよ。','「He is a pilot.」は「かれはパイロットです。」です。「He wants to be a pilot.」は「パイロットになりたい」です。');
  qa('job','advanced','「Why do you want to be a doctor?」「I want to help sick people.」の 答えは どういう 意味かな。','病気の 人を 助けたいからです',['病気の 人が すきだからです','病気に なりたいからです','お医者さんに 会いたいからです'],'「help」は「助ける」だよ。','「sick people」は「病気の 人」だよ。','「Why ～?」は「どうして」と 理由を たずねる 言い方です。答えは「病気の人を助けたいからです。」です。');

  // ---- 国・行きたい国：基礎6・標準9・発展7 ----
  e2j('country','basic','Japan','日本',['中国','かんこく','アメリカ'],'「ジャパン」と 読むよ。','わたしたちの 国だよ。',['にほん','にっぽん']);
  e2j('country','basic','America','アメリカ',['日本','中国','インド'],'「アメリカ」と 読むよ。','自由の 女神が ある 国だよ。',['米国','アメリカ合衆国','あめりか']);
  e2j('country','basic','China','中国',['日本','かんこく','インド'],'「チャイナ」と 読むよ。','日本の となりの 大きな 国だよ。',['ちゅうごく']);
  e2j('country','basic','Korea','かんこく',['中国','日本','インド'],'「コリア」と 読むよ。','日本の 近くに ある 国だよ。',['韓国','南朝鮮']);
  e2j('country','basic','India','インド',['中国','アメリカ','オーストラリア'],'「インディア」と 読むよ。','カレーで 有名な 国だよ。',['いんど']);
  e2j('country','basic','Australia','オーストラリア',['アメリカ','インド','カナダ'],'「オーストレイリア」と 読むよ。','コアラや カンガルーが いる 国だよ。',['オーストラリア','おーすとらりあ']);
  e2j('country','standard','Italy','イタリア',['フランス','スペイン','ドイツ'],'「イタリー」と 読むよ。','ピザや スパゲッティの 国だよ。',['いたりあ']);
  e2j('country','standard','France','フランス',['イタリア','スペイン','ドイツ'],'「フランス」と 読むよ。','エッフェルとうが ある 国だよ。',['ふらんす']);
  e2j('country','standard','Brazil','ブラジル',['アルゼンチン','メキシコ','ペルー'],'「ブラジル」と 読むよ。','サッカーが さかんな 国だよ。',['ぶらじる']);
  e2j('country','standard','Egypt','エジプト',['インド','ギリシャ','トルコ'],'「イージプト」と 読むよ。','ピラミッドが ある 国だよ。',['えじぷと']);
  e2j('country','standard','Canada','カナダ',['アメリカ','オーストラリア','イギリス'],'「キャナダ」と 読むよ。','かえでの 葉が 国旗に あるよ。',['かなだ']);
  qa('country','standard','「Where do you want to go?」は どういう 意味かな。','あなたは どこへ 行きたいですか',['あなたは どこから 来ましたか','あなたは どこに いますか','あなたは いつ 行きますか'],'「Where」は「どこ」だよ。','「want to go」は「行きたい」だよ。','「Where do you want to go?」は「あなたはどこへ行きたいですか。」です。');
  qa('country','standard','「Where do you want to go?」と 聞かれました。「イタリアへ 行きたいです」と 答えるのは どれかな。','I want to go to Italy.',['I\'m from Italy.','I like Italy is.','I want Italy go.'],'「want to go to ～」は「～へ 行きたい」だよ。','「Italy」は「イタリア」だよ。','「I want to go to Italy.」は「わたしはイタリアへ行きたいです。」です。');
  sn('country','standard','I want to go to Italy. I want to eat pizza.','わたしは イタリアへ 行きたいです。ピザを 食べたいです',['わたしは イタリアから 来ました。ピザが すきです','わたしは イタリアに います。ピザを 作りました','わたしは イタリアへ 行きました。ピザを 食べました'],'「want to ～」は「～したい」だよ。','「eat」は「食べる」だよ。');
  sn('country','standard','Let\'s go to Canada.','カナダへ 行こう',['カナダから 来ました','カナダは どこですか','カナダが すきです'],'「Let\'s ～.」は「～しよう」だよ。','「go to」は「～へ 行く」だよ。');
  e2j('country','advanced','Germany','ドイツ',['フランス','イタリア','スペイン'],'「ジャーマニー」と 読むよ。','ヨーロッパの 国で、ビールや ソーセージで 有名だよ。',['どいつ']);
  e2j('country','advanced','Spain','スペイン',['フランス','イタリア','ドイツ'],'「スペイン」と 読むよ。','フラメンコが 有名な 国だよ。',['すぺいん']);
  e2j('country','advanced','England','イギリス',['アメリカ','カナダ','オーストラリア'],'「イングランド」と 読むよ。','ロンドンが ある 国だよ。',['英国','いぎりす']);
  qa('country','advanced','「Why do you want to go to France?」「I want to see the Eiffel Tower.」の 答えは どういう 意味かな。','エッフェルとうを 見たいからです',['エッフェルとうを 作りたいからです','エッフェルとうに のぼったからです','エッフェルとうが きらいだからです'],'「see」は「見る」だよ。','「Tower」は「とう」だよ。','「Why ～?」は「どうして」と 理由を たずねる 言い方です。答えは「エッフェルとうを見たいからです。」です。');
  qa('country','advanced','「I want to see koalas.」と 言っています。どの 国へ 行きたいのかな。','Australia',['Canada','Egypt','Brazil'],'「koalas」は「コアラ」だよ。','コアラが いる 国だよ。','コアラが いるのは「Australia（オーストラリア）」です。',{q:'「I want to see koalas.」と 言っています。行きたい 国を 英語で 書こう。（A で はじまる）',mode:'exact'});
  qa('country','advanced','「I want to see the pyramids.」と 言っています。どの 国へ 行きたいのかな。','Egypt',['India','Italy','Canada'],'「pyramids」は「ピラミッド」だよ。','ピラミッドが ある 国だよ。','ピラミッドが あるのは「Egypt（エジプト）」です。');
  qa('country','advanced','「I want to play soccer in Brazil.」は どういう 意味かな。','わたしは ブラジルで サッカーを したいです',['わたしは ブラジルから 来ました','わたしは ブラジルへ 行きました','わたしは ブラジルで サッカーを 見ました'],'「play soccer」は「サッカーを する」だよ。','「in Brazil」は「ブラジルで」だよ。','「I want to play soccer in Brazil.」は「わたしはブラジルでサッカーをしたいです。」です。');

  // ---- 学校・教科・時間割：基礎6・標準9・発展7 ----
  e2j('school','basic','gym','体育館',['校庭','音楽室','図書室'],'「ジム」と 読むよ。','体育を する 建物だよ。',['たいいくかん','ジム']);
  e2j('school','basic','music room','音楽室',['体育館','図書室','校庭'],'「ミュージック ルーム」と 読むよ。','ピアノが ある 部屋だよ。',['おんがくしつ']);
  e2j('school','basic','playground','校庭',['体育館','教室','図書室'],'「プレイグラウンド」と 読むよ。','外で 遊ぶ ところだよ。',['こうてい','運動場','うんどうじょう','グラウンド']);
  e2j('school','basic','library','図書室',['体育館','音楽室','校庭'],'「ライブラリー」と 読むよ。','本を 読む 部屋だよ。',['としょしつ','図書館','としょかん']);
  e2j('school','basic','school lunch','給食',['おやつ','弁当','朝ごはん'],'「スクール ランチ」と 読むよ。','学校で みんなで 食べる ごはんだよ。',['きゅうしょく']);
  e2j('school','basic','recess','休み時間',['授業','給食','放課後'],'「リセス」と 読むよ。','授業と 授業の 間の 時間だよ。',['やすみじかん','中休み','なかやすみ']);
  qa('school','standard','「What subject do you like?」と 聞かれました。「算数が 好きです」と 答えるのは どれかな。','I like math.',['I\'m math.','I have math.','I want math.'],'「subject」は「教科」だよ。','「I like ～.」で 答えるよ。','「What subject do you like?」は「どの教科が好きですか。」です。「I like math.」は「算数が好きです。」です。');
  sn('school','standard','I have math on Monday.','わたしは 月曜日に 算数が あります',['わたしは 月曜日が すきです','わたしは 月曜日に 算数を 習いたいです','わたしは 算数が 月曜日に きらいです'],'「have」は「ある」の いみだよ。','「on Monday」は「月曜日に」だよ。');
  qa('school','standard','「What do you have on Tuesday?」と 聞かれました。「英語と 音楽が あります」と 答えるのは どれかな。','I have English and music.',['I like English and music.','I\'m English and music.','I want English and music.'],'「What do you have ～?」は「何が ありますか」だよ。','「have」で 答えるよ。','「What do you have on Tuesday?」は「火曜日には何がありますか。」です。');
  sn('school','standard','We have P.E. today.','今日は 体育が あります',['今日は 体育が すきです','今日は 体育を 見ました','今日は 体育が ありません'],'「P.E.」は「体育」だよ。','「today」は「今日」だよ。');
  sn('school','standard','I like P.E.','わたしは 体育が すきです',['わたしは 体育が きらいです','わたしは 体育が あります','わたしは 体育を 見ました'],'「like」は「すき」だよ。','「P.E.」は「体育」だよ。');
  e2j('school','standard','school trip','修学旅行',['遠足','運動会','学芸会'],'「スクール トリップ」と 読むよ。','小学校の 6年生で 行く 旅行だよ。',['しゅうがくりょこう','遠足','えんそく']);
  e2j('school','standard','sports day','運動会',['遠足','学芸会','入学式'],'「スポーツ デイ」と 読むよ。','かけっこや 玉入れを する 日だよ。',['うんどうかい']);
  e2j('school','standard','school festival','文化祭',['運動会','遠足','入学式'],'「スクール フェスティバル」と 読むよ。','学校で 出し物や 発表を する おまつりだよ。',['ぶんかさい','学園祭','がくえんさい','学芸会','がくげいかい']);
  qa('school','standard','「Do you like English?」と 聞かれました。「はい、好きです」と 答えるのは どれかな。','Yes, I do.',['Yes, I am.','Yes, I can.','I have English.'],'「Do you ～?」には「do」で 答えるよ。','「はい」は「Yes」だよ。','「Do you like ～?」には、「Yes, I do.」か「No, I don\'t.」で 答えます。');
  e2j('school','advanced','moral education','どうとく',['国語','算数','理科'],'「モラル エデュケーション」と 読むよ。','道を 守る 心を 学ぶ 教科だよ。',['道徳']);
  e2j('school','advanced','homeroom','学級活動',['体育','図工','算数'],'「ホームルーム」と 読むよ。','学級で 話し合いを する 時間だよ。',['がっきゅうかつどう','学活','ホームルーム','学級会']);
  e2j('school','advanced','schedule','じかんわり',['教科書','時計','カレンダー'],'「スケジュール」と 読むよ。','どの 教科が 何時間目か 書いて あるよ。',['時間割','スケジュール','予定']);
  sn('school','advanced','We have English on Wednesdays.','毎週 水曜日に 英語が あります',['毎日 英語が あります','水曜日に 英語を 習いたいです','水曜日は 英語が きらいです'],'「Wednesdays」と 複数形に なっているよ。','「on Wednesdays」は「毎週 水曜日に」だよ。');
  qa('school','advanced','「What time is it? It\'s time for lunch.」の「time for lunch」は どういう 意味かな。','給食の 時間',['休み時間','算数の 時間','帰る 時間'],'「lunch」は「昼ごはん」だよ。','「time for ～」は「～の 時間」だよ。','「time for lunch」は「昼ごはんの時間」、学校では「給食の時間」です。');
  qa('school','advanced','「What\'s your favorite subject?」「My favorite subject is science. I like experiments.」の 答えから わかる ことは どれかな。','理科が 一番 好きで、実験が すき',['算数が 一番 好きで、実験が きらい','理科が きらいで、実験が すき','国語が 一番 好き'],'「favorite subject」は「一番 好きな 教科」だよ。','「experiments」は「実験」だよ。','「My favorite subject is science.」は「一番好きな教科は理科です。」、「I like experiments.」は「実験が好きです。」です。');
  qa('school','advanced','「We have music, art, and P.E. on Fridays.」で、金曜日に ない 教科は どれかな。','算数',['音楽','図工','体育'],'「music」は「音楽」、「art」は「図工」だよ。','文の 中に 出て こない 教科を えらぼう。','金曜日には「music（音楽）」「art（図工）」「P.E.（体育）」があり、「算数」は出てきません。');

  // ---- 読んでみよう：基礎6・標準9・発展7。短い英語の文章（問題文の「…」）を読んで、日本語の選択肢で答える ----
  function rd(diff,passage,ask,answer,wrong,h1,h2,expl){
    add('reading',diff,'つぎの 英語を 読んで、答えよう。\n\n「'+passage+'」\n\n問い：'+ask,answer,wrong,[h1,h2],expl);
  }
  var R1='Hello. My name is Ken. I am ten years old. I like soccer. I can run fast. I want to be a soccer player.';
  rd('basic',R1,'この 人の 名前は 何かな。','ケン',['タロウ','ケイ','ミカ'],'「My name is ～.」に 注目しよう。','文章の 2つ目の 文だよ。','「My name is Ken.」と 書いてあるので、名前は「ケン」です。');
  rd('basic',R1,'ケンは 何才かな。','10才',['9才','11才','12才'],'「years old」に 注目しよう。','「ten」は「10」だよ。','「I am ten years old.」は「わたしは10才です。」です。');
  rd('standard',R1,'ケンが 好きな スポーツは 何かな。','サッカー',['野球','テニス','水泳'],'「I like ～.」に 注目しよう。','「soccer」は「サッカー」だよ。','「I like soccer.」は「わたしはサッカーが好きです。」です。');
  rd('standard',R1,'ケンは 何が できるかな。','速く 走る こと',['およぐ こと','うたう こと','ピアノを ひく こと'],'「I can ～.」に 注目しよう。','「run fast」は「速く 走る」だよ。','「I can run fast.」は「わたしは速く走れます。」です。');
  rd('advanced',R1,'ケンは これから 何に なりたいのかな。','サッカー選手',['先生','医者','パイロット'],'「I want to be ～.」に 注目しよう。','「player」は「選手」だよ。','「I want to be a soccer player.」は「わたしはサッカー選手になりたいです。」です。');
  var R2='I get up at six thirty. I eat breakfast at seven. I go to school at eight. I do my homework after school. I go to bed at nine.';
  rd('basic',R2,'この 人は 何時に 起きるかな。','6時30分',['6時','7時','8時'],'「get up」は「起きる」だよ。','文章の はじめの 文だよ。','「I get up at six thirty.」は「6時30分に起きます。」です。');
  rd('standard',R2,'この 人は 何時に 学校へ 行くかな。','8時',['7時','8時30分','9時'],'「go to school」は「学校へ 行く」だよ。','「at eight」は「8時に」だよ。','「I go to school at eight.」は「8時に学校へ行きます。」です。');
  rd('standard',R2,'この 人は 学校の あとに 何を するかな。','しゅくだいを する',['テレビを 見る','ごはんを 食べる','ねる'],'「after school」は「学校の あと」だよ。','「homework」は「しゅくだい」だよ。','「I do my homework after school.」は「学校のあとにしゅくだいをします。」です。');
  rd('advanced',R2,'この 人が ねる 時間は 何時かな。','9時',['8時','10時','11時'],'「go to bed」は「ねる」だよ。','文章の おわりの 文だよ。','「I go to bed at nine.」は「9時にねます。」です。');
  var R3='Today is my birthday. It is May fifth. I am eleven. I have a party. I want a new bike.';
  rd('basic',R3,'今日は 何の 日かな。','この 人の たんじょう日',['クリスマス','お正月','運動会'],'「birthday」は「たんじょう日」だよ。','文章の はじめの 文だよ。','「Today is my birthday.」は「今日はわたしのたんじょう日です。」です。');
  rd('standard',R3,'たんじょう日は 何月何日かな。','5月5日',['5月15日','4月5日','5月3日'],'「May」は「5月」だよ。','「fifth」は「5日」だよ。','「It is May fifth.」は「5月5日です。」です。');
  rd('standard',R3,'この 人は 今 何才かな。','11才',['10才','12才','5才'],'「I am ～.」に 注目しよう。','「eleven」は「11」だよ。','「I am eleven.」は「わたしは11才です。」です。');
  rd('advanced',R3,'この 人が ほしい ものは 何かな。','新しい 自転車',['新しい かばん','新しい ゲーム','新しい 本'],'「I want ～.」に 注目しよう。','「bike」は「自転車」だよ。','「I want a new bike.」は「わたしは新しい自転車がほしいです。」です。');
  var R4='This is my town. There is a big park near my house. The library is next to the park. The station is on the left. I go to the library on Saturdays.';
  rd('basic',R4,'家の 近くに あるのは 何かな。','大きな 公園',['大きな 駅','大きな 学校','大きな 病院'],'「near my house」は「家の 近く」だよ。','「park」は「公園」だよ。','「There is a big park near my house.」は「家の近くに大きな公園があります。」です。');
  rd('standard',R4,'図書館は どこに あるかな。','公園の となり',['公園の 中','駅の となり','学校の 前'],'「library」は「図書館」だよ。','「next to」は「～の となり」だよ。','「The library is next to the park.」は「図書館は公園のとなりにあります。」です。');
  rd('standard',R4,'駅は どちらがわに あるかな。','左がわ',['右がわ','前','うしろ'],'「station」は「駅」だよ。','「on the left」は「左がわに」だよ。','「The station is on the left.」は「駅は左がわにあります。」です。');
  rd('advanced',R4,'この 人は いつ 図書館へ 行くかな。','毎週 土曜日',['毎日','毎週 日曜日','毎週 金曜日'],'「on Saturdays」に 注目しよう。','「Saturdays」と 複数形に なっているよ。','「I go to the library on Saturdays.」は「毎週土曜日に図書館へ行きます。」です。');
  var R5='A: Hello. How much is this cap? B: It is five hundred yen. A: I want it. Here you are. B: Thank you.';
  rd('standard',R5,'ぼうしは いくらかな。','500円',['50円','5000円','100円'],'「How much」は ねだんを たずねる 言葉だよ。','「five hundred」は「500」だよ。','「It is five hundred yen.」は「500円です。」です。');
  rd('advanced',R5,'Aは この あと どうするかな。','ぼうしを 買う',['ぼうしを やめる','ぼうしを うる','ぼうしを かりる'],'「I want it.」は「それが ほしい」だよ。','「Here you are.」は お金を わたす ときの 言葉だよ。','Aは「I want it.（それがほしい）」と言って、お金をわたしたので、ぼうしを買います。');
  rd('advanced',R5,'この 会話が 行われているのは どこかな。','お店',['学校','病院','駅'],'「How much」「Here you are」の 言葉に 注目しよう。','ものを 買う ところだよ。','ねだんを たずねたり、お金をわたしたりしているので、場所は「お店」です。');
  var R6='I like animals. I have a dog and two cats. My dog is big. My cats are small. I want to be a vet.';
  rd('basic',R6,'この 人が かっている どうぶつは 何かな。','いぬ 1ぴきと ねこ 2ひき',['いぬ 2ひきと ねこ 1ぴき','ねこ 1ぴきだけ','いぬ 2ひきだけ'],'「I have ～.」は「～を もっている」だよ。','「a dog」は「1ぴきの いぬ」だよ。','「I have a dog and two cats.」は「わたしはいぬ1ぴきとねこ2ひきをかっています。」です。');
  rd('advanced',R6,'この 人は 何に なりたいのかな。','じゅうい',['先生','パイロット','料理人'],'「I want to be ～.」に 注目しよう。','「I like animals.」とも 書いてあるね。','「I want to be a vet.」は「わたしはじゅういになりたいです。」です。');

  // ---- 聞き取り：基礎6・標準9・発展7。q.listen の英語を、読み上げて聞かせる（判断280）。問題文には、英語を書かない ----
  function ls(diff,listen,answer,wrong,hint2,expl){
    var n=serial.listening=(serial.listening||0)+1;
    bank.push({id:'english_g5_hand_listening_'+('00'+n).slice(-3),subject:'english',gradeLevel:5,unit:'listening',difficulty:diff,answerType:'choice',
      question:'音を 聞いて、あてはまる ものを えらぼう。',listen:listen,answer:answer,choices:[answer].concat(wrong),
      hints:['ボタンを おして、もういちど 聞いてみよう。',hint2],explanation:expl||('英語は「'+listen+'」です。「'+answer+'」という 意味です。'),reviewed:false,collection:'hand_en5'});
  }
  ls('basic','banana','バナナ',['りんご','みかん','ぶどう'],'黄色い くだものだよ。');
  ls('basic','Tuesday','火曜日',['月曜日','水曜日','木曜日'],'曜日の 名前だよ。月曜日の 次の 日だよ。');
  ls('basic','green','緑',['赤','青','黄色'],'色の 名前だよ。草の 色だよ。');
  ls('basic','twenty','20',['2','12','200'],'数の 名前だよ。10の 2つ分だよ。');
  ls('basic','Good night.','おやすみなさい',['おはよう','こんにちは','ありがとう'],'ねる 前の あいさつだよ。');
  ls('basic','park','公園',['学校','駅','図書館'],'遊べる ところだよ。');
  ls('standard','I like cats.','わたしは ねこが 好きです',['わたしは ねこが きらいです','わたしは ねこを かっています','わたしは ねこに なりたいです'],'「like」は どんな 気もちを 表す 言葉かな。');
  ls('standard','I can swim.','わたしは およげます',['わたしは およげません','わたしは およぎたいです','わたしは およぎました'],'「can」は「できる」の いみだよ。');
  ls('standard','Turn right.','右に 曲がってください',['左に 曲がってください','まっすぐ 行ってください','止まってください'],'道案内の 言葉だよ。');
  ls('standard','My birthday is May fifth.','わたしの たんじょう日は 5月5日です',['わたしの たんじょう日は 5月15日です','わたしの たんじょう日は 4月5日です','わたしの たんじょう日は 5月3日です'],'「May」は何月かな。「fifth」は何日かな。');
  ls('standard','I get up at six.','わたしは 6時に 起きます',['わたしは 6時に ねます','わたしは 7時に 起きます','わたしは 6時に 朝ごはんを 食べます'],'「get up」は 朝 一番に する ことだよ。');
  ls('standard','It\'s three hundred yen.','300円です',['30円です','3000円です','100円です'],'お店で ねだんを 言っているよ。');
  ls('standard','I want to be a doctor.','わたしは 医者に なりたいです',['わたしは 医者です','わたしは 医者が すきです','わたしは 医者に 会いました'],'「want to be」は「～に なりたい」だよ。');
  ls('standard','I want to go to Italy.','わたしは イタリアへ 行きたいです',['わたしは イタリアから 来ました','わたしは イタリアに います','わたしは イタリアが きらいです'],'「want to go」は「行きたい」だよ。');
  ls('standard','Go straight.','まっすぐ 行ってください',['右に 曲がってください','左に 曲がってください','止まってください'],'道案内の 言葉だよ。');
  ls('advanced','I don\'t like fish.','わたしは さかなが 好きではありません',['わたしは さかなが 好きです','わたしは さかなを 食べました','わたしは さかなを つりました'],'「don\'t」は「～ない」の いみだよ。');
  ls('advanced','She can\'t sing.','かのじょは うたえません',['かのじょは うたえます','かれは うたえません','わたしは うたえません'],'「She」は だれの ことかな。「can\'t」は 打ち消しだよ。');
  ls('advanced','The library is next to the park.','図書館は 公園の となりに あります',['図書館は 公園の 中に あります','図書館は 公園の 前に あります','図書館は 公園から 遠いです'],'「next to」は「～の となり」だよ。');
  ls('advanced','We have English on Wednesdays.','毎週 水曜日に 英語が あります',['毎日 英語が あります','水曜日は 英語が ありません','毎週 月曜日に 英語が あります'],'「Wednesdays」と 複数形に なっているよ。');
  ls('advanced','I eat dinner at seven.','7時に 夕ごはんを 食べます',['7時に 朝ごはんを 食べます','7時に 起きます','7時に ねます'],'「dinner」は 夜に 食べる ごはんだよ。');
  ls('advanced','How much is this?','これは いくらですか',['これは だれの ものですか','これは 何ですか','これは どこですか'],'「much」は「たくさん」の いみだよ。ねだんを たずねているよ。');
  ls('advanced','Why do you want to go to France?','どうして フランスへ 行きたいのですか',['いつ フランスへ 行きますか','どこへ 行きたいですか','だれと 行きますか'],'「Why」は「どうして」だよ。');
})(window);
