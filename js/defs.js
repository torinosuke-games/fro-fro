// 数値以外の定義（教科・学年・難易度・資源・建物）。行を足すだけで拡張できるようにする。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  FF.defs = {
    GRADES: [
      { level: 1, label: 'Lv1', school: '小学1年' },
      { level: 2, label: 'Lv2', school: '小学2年' },
      { level: 3, label: 'Lv3', school: '小学3年' },
      { level: 4, label: 'Lv4', school: '小学4年' },
      { level: 5, label: 'Lv5', school: '小学5年' },
      { level: 6, label: 'Lv6', school: '小学6年' },
      { level: 7, label: 'Lv7', school: '中学1年' },
      { level: 8, label: 'Lv8', school: '中学2年' },
      { level: 9, label: 'Lv9', school: '中学3年' }
    ],

    // 並び順が「本日の重点教科」のローテーション順
    SUBJECTS: [
      { id: 'math', name: '数学', nameByGrade: [{ from: 1, to: 6, name: '算数' }] },
      { id: 'japanese', name: '国語' },
      { id: 'science', name: '理科', nameByGrade: [{ from: 1, to: 2, name: '生活（理科）' }] },
      { id: 'social', name: '社会', nameByGrade: [{ from: 1, to: 2, name: '生活（社会）' }] },
      { id: 'english', name: '英語' }
    ],

    DIFFICULTIES: [
      { id: 'basic', name: '基礎' },
      { id: 'standard', name: '標準' },
      { id: 'advanced', name: '発展' }
    ],

    ANSWER_TYPES: [
      { id: 'choice', name: '4択' },
      { id: 'input', name: '自由入力' }
    ],

    RESOURCES: [
      { id: 'wood', icon: '🪵', name: '木材' },
      { id: 'iron', icon: '⛏️', name: '鉄' },
      { id: 'stone', icon: '🪨', name: '石' },
      { id: 'food', icon: '🍖', name: '食料' }
    ],

    BUILDINGS: [
      { id: 'furnace', name: '中央炉' },
      { id: 'housing', name: '生存者住宅' },
      { id: 'lumber', name: '木材置き場', produces: 'wood' },
      { id: 'mine', name: '鉱山', produces: 'iron' },
      { id: 'quarry', name: '石切り場', produces: 'stone' },
      { id: 'foodhall', name: '食料施設', produces: 'food' }
    ],

    // 中央炉のレベルによる解放（v0.1）
    FURNACE_UNLOCKS: [
      { level: 2, type: 'building', id: 'quarry' },
      { level: 3, type: 'teaser', id: 'watchtower' },
      { level: 4, type: 'teaser', id: 'snowfield' },
      { level: 5, type: 'teaser', id: 'expedition' }
    ],

    // ---- 探索（v0.2、SPEC_v0.2 第2章・6.2） ----
    // 地点の kind：start（入口）/ normal / event / chest / enemy
    // 順路は start から next をたどった列。enemy は順路の外に置き、adjacent で隣の地点とつなぐ。
    // 座標 x・y は地図の中の相対位置（0〜100）。
    // 宝箱の中身・資源イベントの量は balance.js の EXPLORE.CHESTS / EVENT_REWARDS。
    // 文章は {name}・{漢字|よみ} の記法が使え、辞書の語には自動でふりがなが付く。
    //
    // 敵地点：v0.2 では到達できない（reachable: false）。
    // v0.3 で戦闘を実装するときに reachable を true にして解放する予定。
    REGIONS: [
      {
        id: 'snowfield', name: '{雪原|せつげん}', nameEn: 'SNOWFIELD',
        grades: [1, 4],        // 推奨学年（出題の重み付けにだけ使う）
        requires: null,        // 先に 100% にしておく地域
        intro: '{name}{隊長|たいちょう}、{見|み}{張|は}りとうから{雪原|せつげん}への{道|みち}が{見|み}えました。{古|ふる}い{道|みち}しるべをたどれば、{何|なに}か{見|み}つかるかもしれません。',
        completeText: '{雪原|せつげん}の{果|は}てまでたどり{着|つ}いた。この{先|さき}には、{凍|こお}りついた{森|もり}が{広|ひろ}がっている。',
        events: ['sf_ev_crate', 'sf_ev_rivets', 'sf_ev_crystal', 'sf_ev_polaris', 'sf_ev_hollow', 'sf_ev_tracks'],
        nodes: [
          { id: 'sf_01', kind: 'start', name: '{基地|きち}の{門|もん}', x: 12, y: 18, next: 'sf_02',
            text: '{基地|きち}の{門|もん}。ふり{返|かえ}ると、{中央炉|ちゅうおうろ}の{煙|けむり}が{細|ほそ}く{空|そら}へのぼっている。' },
          { id: 'sf_02', kind: 'normal', name: '{風|かぜ}の{丘|おか}', x: 37, y: 18, next: 'sf_03',
            text: '{強|つよ}い{風|かぜ}が{雪|ゆき}をまき{上|あ}げる{丘|おか}。{白|しろ}い{景色|けしき}がどこまでも{続|つづ}いている。' },
          { id: 'sf_03', kind: 'event', name: '{古|ふる}い{道|みち}しるべ', x: 62, y: 18, next: 'sf_04',
            text: '{雪|ゆき}にうもれかけた{木|き}の{道|みち}しるべ。{文字|もじ}はほとんど{読|よ}めない。' },
          { id: 'sf_04', kind: 'chest', name: '{雪|ゆき}にうもれた{小屋|こや}', x: 87, y: 18, next: 'sf_05', chest: 'sf_chest_1',
            text: '{屋根|やね}まで{雪|ゆき}にうもれた{小屋|こや}。{中|なか}に{何|なに}か{残|のこ}っているようだ。' },
          { id: 'sf_05', kind: 'normal', name: '{凍|こお}った{小川|おがわ}', x: 87, y: 50, next: 'sf_06',
            text: '{小川|おがわ}が{凍|こお}りついている。{氷|こおり}の{下|した}から、かすかに{水|みず}の{流|なが}れる{音|おと}がする。' },
          { id: 'sf_06', kind: 'event', name: '{見|み}{晴|は}らし{岩|いわ}', x: 62, y: 50, next: 'sf_07',
            text: '{大|おお}きな{岩|いわ}の{上|うえ}に{立|た}つと、{雪原|せつげん}のずっと{先|さき}まで{見|み}わたせる。' },
          { id: 'sf_07', kind: 'chest', name: '{旧観測所跡|きゅうかんそくじょあと}', x: 37, y: 50, next: 'sf_08', chest: 'sf_chest_2',
            text: '{昔|むかし}、だれかが{天気|てんき}を{調|しら}べていた{観測所|かんそくじょ}のあと。こわれた{機械|きかい}が{残|のこ}っている。' },
          { id: 'sf_08', kind: 'normal', name: '{吹|ふ}きだまり', x: 37, y: 82, next: 'sf_09',
            text: '{風|かぜ}で{雪|ゆき}が{深|ふか}くつもった{場所|ばしょ}。{一歩|いっぽ}ずつ、{足|あし}もとを{確|たし}かめて{進|すす}む。' },
          { id: 'sf_09', kind: 'event', name: '{氷|こおり}の{橋|はし}', x: 62, y: 82, next: 'sf_10',
            text: '{谷|たに}にかかる、{氷|こおり}でできた{橋|はし}。そっとわたろう。' },
          { id: 'sf_10', kind: 'chest', name: '{雪原|せつげん}の{果|は}ての{石塔|せきとう}', x: 87, y: 82, next: null, chest: 'sf_chest_3',
            text: '{雪原|せつげん}のいちばん{奥|おく}に{立|た}つ、{古|ふる}い{石|いし}の{塔|とう}。だれが{建|た}てたのかはわからない。' },
          // v0.3 で解放予定（reachable を true にする）
          { id: 'sf_enemy_fangs', kind: 'enemy', name: '{氷牙|ひょうが}のむれ', x: 12, y: 50, adjacent: 'sf_07', reachable: false,
            text: '{雪|ゆき}の{向|む}こうで、{青白|あおじろ}い{目|め}がいくつもこちらを{見|み}ている。そこには{何|なに}か{強大|きょうだい}な{気配|けはい}がある……{今|いま}は{近|ちか}づけない。' },
          { id: 'sf_enemy_machine', kind: 'enemy', name: '{凍|こお}りついた{機械兵|きかいへい}', x: 12, y: 82, adjacent: 'sf_08', reachable: false,
            text: '{雪|ゆき}の{中|なか}に、{大|おお}きな{鉄|てつ}の{影|かげ}が{立|た}っている。{近|ちか}づくと、{低|ひく}いうなりのような{音|おと}がする……{今|いま}は{近|ちか}づけない。' }
        ]
      },
      {
        id: 'forest', name: '{凍結森林|とうけつしんりん}', nameEn: 'FROZEN FOREST',
        grades: [3, 6],
        requires: 'snowfield',
        intro: '{name}{隊長|たいちょう}、{雪原|せつげん}の{先|さき}に{森|もり}が{見|み}えました。{木|き}も{地面|じめん}も、すべてが{凍|こお}りついています。',
        completeText: '{大樹|たいじゅ}の{根元|ねもと}までたどり{着|つ}いた。{森|もり}の{奥|おく}からは、まだ{何|なに}かの{気配|けはい}がする。',
        events: ['fr_ev_firewood', 'fr_ev_nuts', 'fr_ev_evergreen', 'fr_ev_rime', 'fr_ev_path', 'fr_ev_bird'],
        nodes: [
          { id: 'fr_01', kind: 'start', name: '{森|もり}の{入口|いりぐち}', x: 12, y: 12, next: 'fr_02',
            text: '{凍|こお}りついた{木々|きぎ}が、{門|もん}のように{並|なら}んでいる。ここから{先|さき}が{凍結森林|とうけつしんりん}だ。' },
          { id: 'fr_02', kind: 'normal', name: '{樹氷|じゅひょう}の{並木|なみき}', x: 37, y: 12, next: 'fr_03',
            text: '{白|しろ}い{氷|こおり}をまとった{木|き}が、{道|みち}の{両側|りょうがわ}にずらりと{並|なら}んでいる。' },
          { id: 'fr_03', kind: 'event', name: '{倒木|とうぼく}の{広場|ひろば}', x: 62, y: 12, next: 'fr_04',
            text: '{大|おお}きな{木|き}が{倒|たお}れて、ぽっかりと{空|そら}が{見|み}える{広場|ひろば}。' },
          { id: 'fr_04', kind: 'chest', name: 'きこりの{小屋|こや}{跡|あと}', x: 87, y: 12, next: 'fr_05', chest: 'fr_chest_1',
            text: '{昔|むかし}、きこりが{使|つか}っていた{小屋|こや}のあと。{道具箱|どうぐばこ}が{残|のこ}っている。' },
          { id: 'fr_05', kind: 'normal', name: '{凍|こお}った{泉|いずみ}', x: 87, y: 42, next: 'fr_06',
            text: '{泉|いずみ}が{鏡|かがみ}のように{凍|こお}っている。のぞきこむと、{自分|じぶん}の{顔|かお}がうつった。' },
          { id: 'fr_06', kind: 'event', name: '{苔|こけ}の{岩|いわ}', x: 62, y: 42, next: 'fr_07',
            text: '{緑|みどり}の{苔|こけ}におおわれた{岩|いわ}。{雪|ゆき}の{中|なか}で、ここだけ{色|いろ}がある。' },
          { id: 'fr_07', kind: 'chest', name: '{古|ふる}い{狩|か}り{小屋|こや}', x: 37, y: 42, next: 'fr_08', chest: 'fr_chest_2',
            text: '{狩|か}りをする{人|ひと}が{泊|と}まっていた{小屋|こや}。たなの{上|うえ}に{包|つつ}みが{置|お}いてある。' },
          { id: 'fr_08', kind: 'normal', name: '{霧|きり}の{谷|たに}', x: 12, y: 42, next: 'fr_09',
            text: '{冷|つめ}たい{霧|きり}が{立|た}ちこめる{谷|たに}。{自分|じぶん}の{足音|あしおと}だけが{静|しず}かにひびく。' },
          { id: 'fr_09', kind: 'event', name: '{枝|えだ}のトンネル', x: 12, y: 72, next: 'fr_10',
            text: '{凍|こお}った{枝|えだ}が{重|かさ}なって、トンネルのようになっている。' },
          { id: 'fr_10', kind: 'chest', name: '{氷|こおり}の{滝|たき}', x: 37, y: 72, next: 'fr_11', chest: 'fr_chest_3',
            text: '{流|なが}れ{落|お}ちる{形|かたち}のまま、まるごと{凍|こお}りついた{滝|たき}。' },
          { id: 'fr_11', kind: 'event', name: '{静|しず}かな{空|あ}き{地|ち}', x: 62, y: 72, next: 'fr_12',
            text: '{風|かぜ}の{音|おと}も{聞|き}こえない、しんとした{空|あ}き{地|ち}。' },
          { id: 'fr_12', kind: 'chest', name: '{大樹|たいじゅ}の{根元|ねもと}', x: 87, y: 72, next: null, chest: 'fr_chest_4',
            text: '{森|もり}でいちばん{大|おお}きな{木|き}の{根元|ねもと}。{太|ふと}い{根|ね}のすき{間|ま}に、{何|なに}かがはさまっている。' },
          // v0.3 で解放予定（reachable を true にする）
          { id: 'fr_enemy_antler', kind: 'enemy', name: '{霧氷|むひょう}の{大角|おおづの}', x: 74, y: 27, adjacent: 'fr_05', reachable: false,
            text: '{霧|きり}の{奥|おく}で、{氷|こおり}をまとった{大|おお}きな{角|つの}がゆれた。{今|いま}のあなたには、まだ{立|た}ち{向|む}かえない。' },
          { id: 'fr_enemy_roots', kind: 'enemy', name: '{黒|くろ}い{根|ね}のもの', x: 12, y: 94, adjacent: 'fr_09', reachable: false,
            text: '{凍|こお}った{根|ね}が、ひとりでに{動|うご}いた{気|き}がする……{今|いま}は{近|ちか}づけない。' },
          { id: 'fr_enemy_warden', kind: 'enemy', name: '{森|もり}の{奥|おく}の{主|ぬし}', x: 87, y: 94, adjacent: 'fr_12', reachable: false,
            text: '{森|もり}のいちばん{奥|おく}から、{地面|じめん}をゆらす{足音|あしおと}が{聞|き}こえる。そこには{何|なに}か{強大|きょうだい}な{気配|けはい}がある……{今|いま}は{近|ちか}づけない。' }
        ]
      }
    ],

    // 探索のイベント。type：resource（資源が少し手に入る）/ trivia（豆知識）/ choice（どちらを選んでも結果は文章だけ）
    EXPLORE_EVENTS: {
      sf_ev_crate: { region: 'snowfield', type: 'resource', text: '{雪|ゆき}にうもれた{木箱|きばこ}を{見|み}つけた。{中|なか}には{使|つか}えそうな{木材|もくざい}が{入|はい}っていた。' },
      sf_ev_rivets: { region: 'snowfield', type: 'resource', text: '{倒|たお}れた{道|みち}しるべから、まだ{使|つか}える{鉄|てつ}の{金具|かなぐ}を{外|はず}した。' },
      sf_ev_crystal: { region: 'snowfield', type: 'trivia', text: '{手|て}ぶくろに{落|お}ちた{雪|ゆき}を、よく{見|み}てみた。{雪|ゆき}の{結晶|けっしょう}は、ほとんどが{六角形|ろっかくけい}をもとにした{形|かたち}をしている。' },
      sf_ev_polaris: { region: 'snowfield', type: 'trivia', text: '{夜空|よぞら}に{北極星|ほっきょくせい}が{光|ひか}っている。{北極星|ほっきょくせい}は、ほぼ{真北|まきた}の{空|そら}にあって、{一晩|ひとばん}じゅう{位置|いち}がほとんど{変|か}わらない。{昔|むかし}の{旅人|たびびと}は、{方角|ほうがく}の{目印|めじるし}にした。' },
      sf_ev_hollow: { region: 'snowfield', type: 'choice', text: '{風|かぜ}が{強|つよ}くなってきた。どうする？',
        options: [
          { label: 'くぼ{地|ち}で{風|かぜ}がやむのを{待|ま}つ', result: '{少|すこ}し{休|やす}んで、{体|からだ}をあたためた。{風|かぜ}が{弱|よわ}まったので、また{歩|ある}き{出|だ}す。' },
          { label: 'このまま{進|すす}む', result: '{顔|かお}をふせて、{風|かぜ}の{中|なか}を{進|すす}んだ。しばらくすると、{風|かぜ}は{弱|よわ}まった。' }
        ] },
      sf_ev_tracks: { region: 'snowfield', type: 'choice', text: '{雪|ゆき}の{上|うえ}に、{小|ちい}さな{足|あし}あとが{続|つづ}いている。',
        options: [
          { label: '{足|あし}あとをたどる', result: '{足|あし}あとの{先|さき}で、{白|しろ}いうさぎが{雪|ゆき}の{中|なか}へかけていった。' },
          { label: '{道|みち}しるべに{従|したが}う', result: '{道|みち}しるべの{指|さ}す{方|ほう}へ{進|すす}んだ。{道|みち}は{迷|まよ}わずに{続|つづ}いていた。' }
        ] },
      fr_ev_firewood: { region: 'forest', type: 'resource', text: '{凍|こお}った{倒木|とうぼく}から、かわいた{薪|まき}を{集|あつ}めた。' },
      fr_ev_nuts: { region: 'forest', type: 'resource', text: '{木|き}のうろに、{動物|どうぶつ}がためこんだ{木|き}の{実|み}があった。{少|すこ}しだけ{分|わ}けてもらった。' },
      fr_ev_evergreen: { region: 'forest', type: 'trivia', text: 'まわりの{木|き}には、{冬|ふゆ}なのに{葉|は}がついている。{針葉樹|しんようじゅ}の{多|おお}くは、{冬|ふゆ}でも{葉|は}を{落|お}とさない。{細|ほそ}くてかたい{葉|は}は、{寒|さむ}さや{乾燥|かんそう}に{強|つよ}い。' },
      fr_ev_rime: { region: 'forest', type: 'trivia', text: '{木|き}が{白|しろ}い{氷|こおり}におおわれている。{樹氷|じゅひょう}は、{氷点下|ひょうてんか}でも{凍|こお}らずにいる{霧|きり}の{細|こま}かい{水|みず}のつぶが、{木|き}にぶつかって{凍|こお}りついてできる。' },
      fr_ev_path: { region: 'forest', type: 'choice', text: '{道|みち}が{二つ|ふたつ}に{分|わ}かれている。',
        options: [
          { label: '{明|あか}るい{道|みち}', result: '{木|き}のすき{間|ま}から{光|ひかり}がさしこむ{道|みち}を{進|すす}んだ。{少|すこ}し{遠回|とおまわ}りだったが、{歩|ある}きやすかった。' },
          { label: '{苔|こけ}むした{近道|ちかみち}', result: 'すべらないように{気|き}をつけて、{近道|ちかみち}を{進|すす}んだ。{無事|ぶじ}に{先|さき}へ{出|で}られた。' }
        ] },
      fr_ev_bird: { region: 'forest', type: 'choice', text: '{遠|とお}くで{鳥|とり}が{鳴|な}いた。',
        options: [
          { label: '{声|こえ}のする{方|ほう}へ{行|い}く', result: '{枝|えだ}の{上|うえ}に、{羽|はね}をふくらませた{小鳥|ことり}がいた。{寒|さむ}さから{身|み}を{守|まも}っているようだ。' },
          { label: '{静|しず}かな{方|ほう}へ{行|い}く', result: '{雪|ゆき}をふむ{音|おと}だけが{聞|き}こえる。しばらく{歩|ある}くと、{道|みち}はまたひとつになった。' }
        ] }
    }
  };
})(this);
