// 数値以外の定義（教科・学年・難易度・資源・建物）。行を足すだけで拡張できるようにする。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  FF.defs = {
    // 主人公の絵（判断198・204）。img/art/avatar-<id>.jpg。e＝小学生用、j＝中学生用（各12人）。学年に合う方から選ぶ
    AVATARS_ELEM: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12'],
    AVATARS_JR: ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j11', 'j12'],
    AVATARS: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j11', 'j12'],
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

    // 正解の音の種類（判断262）。鳴らし方は js/ui/sound.js。初めは 'bright'
    SOUND_STYLES: [
      { id: 'bright', name: 'あかるい3音' },
      { id: 'pinpon', name: 'ぴんぽーん' },
      { id: 'piko', name: 'ぴこん' },
      { id: 'sparkle', name: 'きらきら' },
      { id: 'coin', name: 'コイン' },
      { id: 'bell', name: 'ベル' }
    ],

    DIFFICULTIES: [
      { id: 'basic', name: '基礎' },
      { id: 'standard', name: '標準' },
      { id: 'advanced', name: '発展' }
    ],

    ANSWER_TYPES: [
      { id: 'choice', name: '選択問題' },
      { id: 'input', name: '書き問題' }
    ],

    // 問題の図（q.diagram。省略できる。判断221）。種類ごとに必須の項目。描き方は js/svg/learning.js
    // すべての種類で caption（図の説明の文字列）も必須。書き方は QUESTIONS_GUIDE.md
    DIAGRAM_KINDS: {
      story: ['item', 'total', 'each'],
      table: ['head', 'rows'],
      image: ['src'],
      cards: ['labels', 'values'],
      bars: ['labels', 'values'],
      rect: ['w', 'h'],
      cutout: ['w', 'h', 'cw', 'ch'],
      fraction: ['n', 'd'],
      fractionSum: ['n', 'm', 'd'],
      angle: ['deg'],
      angleSplit: ['total', 'part'],
      angleReflex: ['deg'],
      protractor: ['deg'],
      lines: ['mode'],
      polygon: ['shape'],
      solid: [],
      net: [],
      grid: ['x', 'y'],
      gridPoints: ['maxX', 'maxY', 'points', 'segments'],
      solid3d: ['shape', 'vertices'],
      boxNet: ['dimensions', 'showLengths'],
      quadFigure: ['shape'],
      axes: ['values'],
      graph: ['labels', 'values'],
      abacus: ['digits', 'labels'],
      numberline: ['start', 'end', 'step'],
      objects: ['item', 'groups', 'labels'],
      clock: ['minute'],
      tape: ['values', 'labels'],
      measure: ['capacity', 'values', 'labels', 'unit'],
      balance: ['weights'],
      nestedRect: ['w', 'h', 'innerW', 'innerH', 'unit'],
      triangle: ['base', 'height', 'unit'],
      pie: ['numerators', 'denominators', 'labels'],
      band: ['parts', 'labels', 'totalLabel'],
      doubleLine: ['labels', 'ends'],
      circle: ['radius', 'unit'],
      coordinate: ['a', 'b', 'power', 'xRange', 'yRange', 'formula'],
      exterior: ['angle'],
      inscribed: ['angle'],
      similarity: ['height', 'shadows', 'unit'],
      circuit: ['panels'],
      apparatus: ['panels'],
      biology: ['part', 'labels'],
      pendulum: ['panels'],
      scienceScene: ['scene'],
      anatomy: ['part', 'pose'],
      moonView: ['mode'],
      starMap: ['points', 'segments', 'labels'],
      japanMap: ['bounds', 'marks', 'areas', 'routes'],
      terrain: ['scene'],
      facility: ['scene'],
      disaster: ['scene'],
      culture: ['scene'],
      industry: ['scene']
    },

    RESOURCES: [
      { id: 'wood', icon: '🪵', name: '木材' },
      { id: 'iron', icon: '⛏️', name: '鉄' },
      { id: 'stone', icon: '🪨', name: '石' },
      { id: 'food', icon: '🍖', name: '食料' }
    ],

    BUILDINGS: [
      { id: 'furnace', name: '中央炉' },
      { id: 'housing', name: '住宅' },
      { id: 'lumber', name: '木工所', produces: 'wood' },
      { id: 'mine', name: '鉱山', produces: 'iron' },
      { id: 'quarry', name: '採石場', produces: 'stone' },
      { id: 'foodhall', name: '食料庫', produces: 'food' }
    ],

    // 中央炉のレベルによる解放（v0.1）
    FURNACE_UNLOCKS: [
      { level: 2, type: 'building', id: 'quarry' },
      { level: 3, type: 'teaser', id: 'watchtower' },
      { level: 4, type: 'teaser', id: 'snowfield' },
      { level: 5, type: 'teaser', id: 'expedition' }
    ],

    // ---- 探索（v0.2、SPEC_v0.2 第2章・6.2） ----
    // 地点の kind：start（入口）/ normal / event / chest / enemy / boss
    // 順路は start から next をたどった列。enemy は順路の外に置き、adjacent で隣の地点とつなぐ（寄り道。倒さなくても進める）。
    // boss は順路の最後に1つ（v0.3 その2。倒すとその地域が 100%）。enemy・boss の enemy は ENEMIES の ID。
    // 座標 x・y は地図の中の相対位置（0〜100）。
    // 宝箱の中身・資源イベントの量は balance.js の EXPLORE.CHESTS / EVENT_REWARDS。
    // 文章は {name}・{漢字|よみ} の記法が使え、辞書の語には自動でふりがなが付く。
    //
    // 敵地点：v0.2 では到達できなかった（reachable: false）。v0.3 その2 で reachable を true にし、戦えるようにした。
    // 次の地域の requires は、その地域のボスの手前（今の終点の1つ前）まで進むこと（DESIGN 13.1）。
    REGIONS: [
      {
        id: 'snowfield', name: '{雪原|せつげん}', nameEn: 'SNOWFIELD',
        grades: [1, 4],        // 推奨学年（出題の重み付けにだけ使う）
        requires: null,        // 先に 100% にしておく地域
        intro: '{name}{隊長|たいちょう}、{見|み}{張|は}り{塔|とう}から{雪原|せつげん}への{道|みち}が{見|み}えました。{古|ふる}い{道|みち}しるべをたどれば、{何|なに}か{見|み}つかるかもしれません。',
        completeText: '{氷牙|ひょうが}の{長|おさ}を{退|しりぞ}け、{雪原|せつげん}を{歩|ある}きつくした。この{先|さき}には、{凍|こお}りついた{森|もり}が{広|ひろ}がっている。',
        events: ['sf_ev_crate', 'sf_ev_rivets', 'sf_ev_crystal', 'sf_ev_polaris', 'sf_ev_hollow', 'sf_ev_tracks'],
        nodes: [
          { id: 'sf_01', kind: 'start', name: '{基地|きち}の{門|もん}', x: 12, y: 14, next: 'sf_02',
            text: '{基地|きち}の{門|もん}。ふり{返|かえ}ると、{中央炉|ちゅうおうろ}の{煙|けむり}が{細|ほそ}く{空|そら}へのぼっている。' },
          { id: 'sf_02', kind: 'normal', name: '{風|かぜ}の{丘|おか}', x: 37, y: 14, next: 'sf_03',
            text: '{強|つよ}い{風|かぜ}が{雪|ゆき}をまき{上|あ}げる{丘|おか}。{白|しろ}い{景色|けしき}がどこまでも{続|つづ}いている。' },
          { id: 'sf_03', kind: 'event', name: '{古|ふる}い{道|みち}しるべ', x: 62, y: 14, next: 'sf_04',
            text: '{雪|ゆき}にうもれかけた{木|き}の{道|みち}しるべ。{文字|もじ}はほとんど{読|よ}めない。' },
          { id: 'sf_04', kind: 'chest', name: '{雪|ゆき}にうもれた{小屋|こや}', x: 87, y: 14, next: 'sf_05', chest: 'sf_chest_1',
            text: '{屋根|やね}まで{雪|ゆき}にうもれた{小屋|こや}。{中|なか}に{何|なに}か{残|のこ}っているようだ。' },
          { id: 'sf_05', kind: 'normal', name: '{凍|こお}った{小川|おがわ}', x: 87, y: 44, next: 'sf_06',
            text: '{小川|おがわ}が{凍|こお}りついている。{氷|こおり}の{下|した}から、かすかに{水|みず}の{流|なが}れる{音|おと}がする。' },
          { id: 'sf_06', kind: 'event', name: '{見|み}{晴|は}らし{岩|いわ}', x: 62, y: 44, next: 'sf_07',
            text: '{大|おお}きな{岩|いわ}の{上|うえ}に{立|た}つと、{雪原|せつげん}のずっと{先|さき}まで{見|み}わたせる。' },
          { id: 'sf_07', kind: 'chest', name: '{旧観測所跡|きゅうかんそくじょあと}', x: 37, y: 44, next: 'sf_08', chest: 'sf_chest_2',
            text: '{昔|むかし}、だれかが{天気|てんき}を{調|しら}べていた{観測所|かんそくじょ}のあと。こわれた{機械|きかい}が{残|のこ}っている。' },
          { id: 'sf_08', kind: 'normal', name: '{吹|ふ}きだまり', x: 37, y: 74, next: 'sf_09',
            text: '{風|かぜ}で{雪|ゆき}が{深|ふか}くつもった{場所|ばしょ}。{一歩|いっぽ}ずつ、{足|あし}もとを{確|たし}かめて{進|すす}む。' },
          { id: 'sf_09', kind: 'event', name: '{氷|こおり}の{橋|はし}', x: 62, y: 74, next: 'sf_10',
            text: '{谷|たに}にかかる、{氷|こおり}でできた{橋|はし}。そっとわたろう。' },
          { id: 'sf_10', kind: 'chest', name: '{雪原|せつげん}の{果|は}ての{石塔|せきとう}', x: 87, y: 74, next: 'sf_11', chest: 'sf_chest_3',
            text: '{雪原|せつげん}のいちばん{奥|おく}に{立|た}つ、{古|ふる}い{石|いし}の{塔|とう}。だれが{建|た}てたのかはわからない。' },
          { id: 'sf_11', kind: 'boss', name: '{氷牙|ひょうが}の{長|おさ}', x: 87, y: 96, next: null, enemy: 'sf_boss_wolf',
            text: '{石塔|せきとう}の{先|さき}、{吹雪|ふぶき}の{奥|おく}に{大|おお}きな{影|かげ}が{見|み}える。' },
          // 敵（寄り道）：隣の地点に着いたら戦える
          { id: 'sf_enemy_fangs', kind: 'enemy', name: '{氷牙|ひょうが}のむれ', x: 12, y: 44, adjacent: 'sf_07', reachable: true, enemy: 'sf_enemy_fangs',
            text: '{雪|ゆき}の{向|む}こうで、{青白|あおじろ}い{目|め}がいくつもこちらを{見|み}ている。' },
          { id: 'sf_enemy_machine', kind: 'enemy', name: '{凍|こお}りついた{機械兵|きかいへい}', x: 12, y: 74, adjacent: 'sf_08', reachable: true, enemy: 'sf_enemy_machine',
            text: '{雪|ゆき}の{中|なか}に、{大|おお}きな{鉄|てつ}の{影|かげ}が{立|た}っている。{近|ちか}づくと、{低|ひく}いうなりのような{音|おと}がする。' }
        ]
      },
      {
        id: 'forest', name: '{凍結森林|とうけつしんりん}', nameEn: 'FROZEN FOREST',
        grades: [3, 6],
        requires: 'snowfield',
        intro: '{name}{隊長|たいちょう}、{雪原|せつげん}の{先|さき}に{森|もり}が{見|み}えました。{木|き}も{地面|じめん}も、すべてが{凍|こお}りついています。',
        completeText: '{森|もり}の{奥|おく}の{主|ぬし}は{眠|ねむ}りについた。{森|もり}の{先|さき}には、{青白|あおじろ}い{氷|こおり}の{川|かわ}が{見|み}える。',
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
          { id: 'fr_12', kind: 'chest', name: '{大樹|たいじゅ}の{根元|ねもと}', x: 87, y: 72, next: 'fr_13', chest: 'fr_chest_4',
            text: '{森|もり}でいちばん{大|おお}きな{木|き}の{根元|ねもと}。{太|ふと}い{根|ね}のすき{間|ま}に、{何|なに}かがはさまっている。' },
          { id: 'fr_13', kind: 'boss', name: '{森|もり}の{奥|おく}の{主|ぬし}', x: 87, y: 94, next: null, enemy: 'fr_enemy_warden',
            text: '{森|もり}のいちばん{奥|おく}から、{地面|じめん}をゆらす{足音|あしおと}が{聞|き}こえる。' },
          // 敵（寄り道）
          { id: 'fr_enemy_antler', kind: 'enemy', name: '{霧氷|むひょう}の{大角|おおづの}', x: 74, y: 27, adjacent: 'fr_05', reachable: true, enemy: 'fr_enemy_antler',
            text: '{霧|きり}の{奥|おく}で、{氷|こおり}をまとった{大|おお}きな{角|つの}がゆれた。' },
          { id: 'fr_enemy_roots', kind: 'enemy', name: '{黒|くろ}い{根|ね}のもの', x: 12, y: 94, adjacent: 'fr_09', reachable: true, enemy: 'fr_enemy_roots',
            text: '{凍|こお}った{根|ね}が、ひとりでに{動|うご}いた{気|き}がする。' }
        ]
      },
      {
        id: 'glacier', name: '{氷河|ひょうが}', nameEn: 'GLACIER',
        grades: [5, 8],
        requires: 'forest',
        intro: '{name}{隊長|たいちょう}、{凍結森林|とうけつしんりん}の{先|さき}に、{巨大|きょだい}な{氷|こおり}の{川|かわ}が{見|み}えました。{昔|むかし}の{調査隊|ちょうさたい}が{残|のこ}したものが、まだ{眠|ねむ}っているかもしれません。',
        completeText: '{氷河|ひょうが}の{守護機|しゅごき}は{静|しず}かになった。{谷|たに}の{奥|おく}で、{古|ふる}い{装置|そうち}の{明|あ}かりが{一|ひと}つだけともった。',
        events: ['gl_ev_sled', 'gl_ev_bolts', 'gl_ev_flow', 'gl_ev_blue', 'gl_ev_crevasse', 'gl_ev_echo'],
        nodes: [
          { id: 'gl_01', kind: 'start', name: '{氷河|ひょうが}の{入口|いりぐち}', x: 12, y: 12, next: 'gl_02',
            text: '{森|もり}が{終|お}わると、{目|め}の{前|まえ}に{青白|あおじろ}い{氷|こおり}の{川|かわ}が{広|ひろ}がった。{足|あし}もとの{氷|こおり}の{下|した}で、{何|なに}かがきしむ{音|おと}がする。' },
          { id: 'gl_02', kind: 'normal', name: '{青|あお}い{氷|こおり}の{坂|さか}', x: 37, y: 12, next: 'gl_03',
            text: '{風|かぜ}にみがかれた{氷|こおり}の{坂|さか}。{一歩|いっぽ}ずつ、{足場|あしば}を{確|たし}かめながら{登|のぼ}る。' },
          { id: 'gl_03', kind: 'event', name: 'クレバスのふち', x: 62, y: 12, next: 'gl_04',
            text: '{氷|こおり}の{大|おお}きな{割|わ}れ{目|め}が{口|くち}を{開|あ}けている。{底|そこ}は{暗|くら}くて{見|み}えない。' },
          { id: 'gl_04', kind: 'chest', name: 'そりの{跡|あと}', x: 87, y: 12, next: 'gl_05', chest: 'gl_chest_1',
            text: '{雪|ゆき}にうもれたそりを{見|み}つけた。{荷台|にだい}に、{使|つか}えそうな{物資|ぶっし}が{残|のこ}っている。' },
          { id: 'gl_05', kind: 'normal', name: '{氷|こおり}のほら{穴|あな}', x: 87, y: 42, next: 'gl_06',
            text: '{氷|こおり}の{壁|かべ}が{青|あお}く{光|ひか}るほら{穴|あな}。{外|そと}の{吹雪|ふぶき}がうそのように{静|しず}かだ。' },
          { id: 'gl_06', kind: 'event', name: '{凍|こお}った{湖|みずうみ}', x: 62, y: 42, next: 'gl_07',
            text: '{厚|あつ}い{氷|こおり}の{張|は}った{湖|みずうみ}。{氷|こおり}の{下|した}に、{泡|あわ}がとじこめられている。' },
          { id: 'gl_07', kind: 'chest', name: '{古|ふる}い{測量|そくりょう}{小屋|ごや}', x: 37, y: 42, next: 'gl_08', chest: 'gl_chest_2',
            text: '{昔|むかし}の{調査隊|ちょうさたい}の{小屋|こや}。{壁|かべ}に、{氷河|ひょうが}の{地図|ちず}がはられたままになっている。' },
          { id: 'gl_08', kind: 'normal', name: '{吹雪|ふぶき}の{尾根|おね}', x: 12, y: 42, next: 'gl_09',
            text: '{尾根|おね}に{出|で}ると、{横|よこ}なぐりの{吹雪|ふぶき}。{身|み}をかがめて{進|すす}む。' },
          { id: 'gl_09', kind: 'event', name: '{氷柱|ひょうちゅう}の{林|はやし}', x: 12, y: 72, next: 'gl_10',
            text: '{背|せ}の{高|たか}い{氷|こおり}の{柱|はしら}が、{林|はやし}のように{立|た}ち{並|なら}んでいる。' },
          { id: 'gl_10', kind: 'chest', name: '{凍|こお}りついた{荷物|にもつ}', x: 37, y: 72, next: 'gl_11', chest: 'gl_chest_3',
            text: '{氷|こおり}づけの{木箱|きばこ}がいくつも{並|なら}んでいる。{調査隊|ちょうさたい}の{荷物|にもつ}だろうか。' },
          { id: 'gl_11', kind: 'event', name: '{鳴|な}る{氷河|ひょうが}', x: 62, y: 72, next: 'gl_12',
            text: 'ときどき、{遠|とお}くで{氷|こおり}が{割|わ}れる{大|おお}きな{音|おと}がひびく。{氷河|ひょうが}は{生|い}きているようだ。' },
          { id: 'gl_12', kind: 'chest', name: '{氷河|ひょうが}のみなもと', x: 87, y: 72, next: 'gl_13', chest: 'gl_chest_4',
            text: '{氷河|ひょうが}が{生|う}まれる{高|たか}い{谷|たに}。その{奥|おく}に、{氷|こおり}におおわれた{大|おお}きな{影|かげ}が{立|た}っている。' },
          { id: 'gl_13', kind: 'boss', name: '{氷河|ひょうが}の{守護機|しゅごき}', x: 87, y: 94, next: null, enemy: 'gl_boss_guardian',
            text: '{氷河|ひょうが}のみなもとの{奥|おく}に、{氷|こおり}におおわれた{大|おお}きな{影|かげ}が{立|た}っている。' },
          // 敵（寄り道）
          { id: 'gl_enemy_leopard', kind: 'enemy', name: 'はだれ{豹|ひょう}', x: 74, y: 27, adjacent: 'gl_03', reachable: true, enemy: 'gl_enemy_leopard',
            text: '{氷|こおり}の{上|うえ}を、まだら{模様|もよう}の{影|かげ}が{走|はし}っていった。' },
          { id: 'gl_enemy_drone', kind: 'enemy', name: '{迷|まよ}い{機械|きかい}', x: 24, y: 57, adjacent: 'gl_07', reachable: true, enemy: 'gl_enemy_drone',
            text: '{小屋|こや}の{外|そと}で、{小|ちい}さな{機械|きかい}の{音|おと}がする。' },
          { id: 'gl_enemy_golem', kind: 'enemy', name: '{氷塊|ひょうかい}の{番兵|ばんぺい}', x: 37, y: 94, adjacent: 'gl_10', reachable: true, enemy: 'gl_enemy_golem',
            text: '{大|おお}きな{氷|こおり}のかたまりが、{人|ひと}のような{形|かたち}に{並|なら}んでいる。' }
        ]
      }
    ],

    // ---- 敵とボス（v0.3 その2、DESIGN 13.4・13.7） ----
    // HP・攻撃力・初めて倒したときの報酬は balance.js の BATTLE。ここには名前・文章・立ち絵だけを書く。
    // art：'svg:<名前>'（js/svg/ で描く）／'img:<ファイル名>'（img/ の画像。読み込めなければ svgFallback の SVG）
    ENEMIES: {
      sf_enemy_fangs: { region: 'snowfield', boss: false, name: '{氷牙|ひょうが}のむれ', art: 'img:enemy-frost-wolf-pack.png', svgFallback: 'fangs',
        encounter: '{雪|ゆき}のくぼみから、{青白|あおじろ}い{目|め}がいくつものぞいている。{氷|こおり}の{牙|きば}をもつオオカミのむれだ。',
        victory: 'むれは{雪|ゆき}けむりを{上|あ}げて{散|ち}っていった。{遠|とお}くで、ひときわ{大|おお}きな{遠|とお}ぼえがひびいた。' },
      sf_enemy_machine: { region: 'snowfield', boss: false, name: '{凍|こお}りついた{機械兵|きかいへい}', art: 'img:enemy-frozen-machine.png', svgFallback: 'machine',
        encounter: '{雪|ゆき}の{中|なか}の{鉄|てつ}の{影|かげ}が、きしみながら{動|うご}き{出|だ}した。{胸|むね}の{明|あ}かりが{赤|あか}く{光|ひか}る。',
        victory: '{機械兵|きかいへい}は{動|うご}きを{止|と}め、{雪|ゆき}の{上|うえ}にひざをついた。{背中|せなか}に、{見|み}なれない{紋章|もんしょう}がきざまれている。' },
      sf_boss_wolf: { region: 'snowfield', boss: true, name: '{氷牙|ひょうが}の{長|おさ}', art: 'img:boss_frost_wolf.png', svgFallback: 'wolf',
        encounter: '{石塔|せきとう}の{向|む}こうに、ひときわ{大|おお}きなオオカミが{立|た}っていた。むれの{長|おさ}だ。{氷|こおり}の{毛|け}が{逆立|さかだ}ち、{低|ひく}いうなり{声|ごえ}が{雪原|せつげん}にひびく。',
        victory: '{長|おさ}は{一声|ひとこえ}ほえると、{吹雪|ふぶき}の{中|なか}へ{去|さ}っていった。{雪原|せつげん}に、{静|しず}かな{朝|あさ}がもどってきた。' },
      fr_enemy_antler: { region: 'forest', boss: false, name: '{霧氷|むひょう}の{大角|おおづの}', art: 'svg:antler',
        encounter: '{霧|きり}の{奥|おく}から、{氷|こおり}をまとった{大|おお}きな{角|つの}がゆっくりと{現|あらわ}れた。',
        victory: '{大角|おおづの}は{首|くび}をふると、{霧|きり}の{中|なか}へ{帰|かえ}っていった。{足|あし}あとに、とけかけた{氷|こおり}のかけらが{残|のこ}った。' },
      fr_enemy_roots: { region: 'forest', boss: false, name: '{黒|くろ}い{根|ね}のもの', art: 'svg:roots',
        encounter: '{地面|じめん}から{黒|くろ}い{根|ね}が{伸|の}びてきて、{行|ゆ}く{手|て}をふさいだ。',
        victory: '{根|ね}はしおれて{地面|じめん}にもどった。その{下|した}から、{小|ちい}さな{芽|め}が{顔|かお}を{出|だ}していた。' },
      fr_enemy_warden: { region: 'forest', boss: true, name: '{森|もり}の{奥|おく}の{主|ぬし}', art: 'img:boss_forest_master.png', svgFallback: 'warden',
        encounter: '{大樹|たいじゅ}の{根元|ねもと}がゆれ、{苔|こけ}と{氷|こおり}におおわれた{巨大|きょだい}な{影|かげ}が{起|お}き{上|あ}がった。この{森|もり}を{守|まも}ってきた{主|ぬし}だ。',
        victory: '{主|ぬし}はゆっくりと{目|め}を{閉|と}じ、{大樹|たいじゅ}にもたれて{眠|ねむ}りについた。{森|もり}を{抜|ぬ}ける{道|みち}が、はっきりと{見|み}えた。' },
      gl_enemy_leopard: { region: 'glacier', boss: false, name: 'はだれ{豹|ひょう}', art: 'svg:leopard',
        encounter: '{雪|ゆき}と{同|おな}じまだら{模様|もよう}の{豹|ひょう}が、{氷|こおり}の{上|うえ}から{音|おと}もなく{飛|と}びおりてきた。',
        victory: '{豹|ひょう}は{身|み}をひるがえし、クレバスの{向|む}こうへ{消|き}えた。' },
      gl_enemy_drone: { region: 'glacier', boss: false, name: '{迷|まよ}い{機械|きかい}', art: 'svg:drone',
        encounter: '{小|ちい}さな{機械|きかい}が、{同|おな}じ{所|ところ}をぐるぐる{回|まわ}っている。こちらに{気|き}づくと、{警告音|けいこくおん}を{鳴|な}らした。',
        victory: '{機械|きかい}は{静|しず}かになった。{中|なか}から、{調査隊|ちょうさたい}の{古|ふる}い{記録|きろく}の{紙|かみ}{切|き}れが{出|で}てきた。' },
      gl_enemy_golem: { region: 'glacier', boss: false, name: '{氷塊|ひょうかい}の{番兵|ばんぺい}', art: 'svg:golem',
        encounter: '{氷|こおり}のかたまりが{組|く}み{上|あ}がり、{人|ひと}の{形|かたち}になって{立|た}ちふさがった。',
        victory: '{番兵|ばんぺい}はくずれて、ただの{氷|こおり}のかたまりにもどった。' },
      gl_boss_guardian: { region: 'glacier', boss: true, name: '{氷河|ひょうが}の{守護機|しゅごき}', art: 'img:boss_glacier_guardian.png', svgFallback: 'guardian',
        encounter: '{谷|たに}の{奥|おく}で、{氷|こおり}におおわれた{巨大|きょだい}な{機械|きかい}が{目|め}を{覚|さ}ました。{何十年|なんじゅうねん}も、ここで{何|なに}かを{守|まも}り{続|つづ}けていたようだ。',
        victory: '{守護機|しゅごき}の{光|ひかり}が{消|き}えた。その{足|あし}もとで、{止|と}まっていた{古|ふる}い{装置|そうち}の{明|あ}かりが{一|ひと}つだけともった。' }
    },
    // 戦闘に負けた・引き返したときの文章（共通）
    BATTLE_LOSE_TEXT: '{力|ちから}をたくわえて、もう{一度|いちど}いどもう。いったん{引|ひ}き{返|かえ}した。',

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
        ] },
      gl_ev_sled: { region: 'glacier', type: 'resource', text: '{雪|ゆき}にうもれた{食料|しょくりょう}の{包|つつ}みを{見|み}つけた。' },
      gl_ev_bolts: { region: 'glacier', type: 'resource', text: '{凍|こお}った{機械|きかい}の{残|ざん}がいから、{使|つか}えるボルトを{外|はず}した。' },
      gl_ev_flow: { region: 'glacier', type: 'trivia', text: '{氷河|ひょうが}は、{自分|じぶん}の{重|おも}さで{少|すこ}しずつ{低|ひく}い{方|ほう}へ{流|なが}れている。{速|はや}さは{一日|いちにち}に{数|すう}センチから{数|すう}メートルほどだ。' },
      gl_ev_blue: { region: 'glacier', type: 'trivia', text: '{足|あし}もとの{氷|こおり}が{青|あお}く{見|み}える。{厚|あつ}い{氷|こおり}は{赤|あか}っぽい{光|ひかり}を{吸|す}いこみ、{青|あお}い{光|ひかり}を{通|とお}しやすいからだ。' },
      gl_ev_crevasse: { region: 'glacier', type: 'choice', text: 'クレバスに、{細|ほそ}い{雪|ゆき}の{橋|はし}がかかっている。',
        options: [
          { label: 'そっとわたる', result: '{息|いき}をとめて、{一歩|いっぽ}ずつわたった。{向|む}こう{岸|ぎし}に{着|つ}くと、{足|あし}が{少|すこ}しふるえていた。' },
          { label: '{遠回|とおまわ}りする', result: 'クレバスのはしまで{回|まわ}りこんだ。{時間|じかん}はかかったが、{安全|あんぜん}に{先|さき}へ{進|すす}めた。' }
        ] },
      gl_ev_echo: { region: 'glacier', type: 'choice', text: '{氷|こおり}の{壁|かべ}から、{声|こえ}のようなこだまが{返|かえ}ってくる。',
        options: [
          { label: '{呼|よ}びかけてみる', result: '「おーい」と{呼|よ}ぶと、{声|こえ}は{何度|なんど}もはね{返|かえ}って、{遠|とお}くへ{消|き}えていった。' },
          { label: '{静|しず}かに{通|とお}りすぎる', result: '{足音|あしおと}をしのばせて{進|すす}んだ。こだまは、いつのまにかやんでいた。' }
        ] }
    }
  };

  // 学年に合う主人公の候補（判断204）。中1〜中3（7〜9）は中学生用、それ以外（小学生・未設定）は小学生用
  FF.defs.avatarsFor = function (grade) {
    return typeof grade === 'number' && grade >= 7 ? FF.defs.AVATARS_JR : FF.defs.AVATARS_ELEM;
  };
})(this);
