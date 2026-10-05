// 単元の一覧（教科・学年ごと。判断221）。問題の unit には、ここに登録した id を使う。
// 単元を登録した教科・学年は、学習画面に単元の一覧が出て、登録した問題だけから出題する（算数の自動生成は出さない）。
// 登録のない教科・学年は「すべての単元」だけで、算数は従来どおり自動生成も出す。
// 書き方：FF.units.DEFS[教科][学年] = [{ id, name, description, icon }, ...]（並び順が画面の順。詳しくは QUESTIONS_GUIDE.md）
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  var COLORS = ['#3387c8', '#bf728e', '#49a6ad', '#e2a43d', '#887cca', '#4caa8c'];

  var DEFS = {
    math: {
      4: [
        { id: 'large', name: '大きな数', description: '億・兆と数のしくみ', icon: '123' },
        { id: 'round', name: 'がい数', description: '四捨五入・見積もり', icon: '≈' },
        { id: 'divide1', name: '１けたでわるわり算', description: '筆算・あまり', icon: '÷' },
        { id: 'divide2', name: '２けたでわるわり算', description: '商の見当・わり算の性質', icon: '÷' },
        { id: 'decimal', name: '小数', description: '位・たし算・ひき算', icon: '0.1' },
        { id: 'decimal_calc', name: '小数のかけ算・わり算', description: '小数 × 整数・小数 ÷ 整数', icon: '×' },
        { id: 'fraction', name: '分数', description: '仮分数・帯分数・計算', icon: '½' },
        { id: 'angle', name: '角', description: '角度・分度器', icon: '∠' },
        { id: 'quad', name: '垂直・平行と四角形', description: '台形・平行四辺形・ひし形', icon: '▱' },
        { id: 'area', name: '面積', description: '長方形・正方形・面積の単位', icon: '▧' },
        { id: 'solid', name: '直方体と立方体', description: '面・辺・頂点・展開図', icon: '◇' },
        { id: 'position', name: '位置の表し方', description: '平面と空間の位置', icon: '⌖' },
        { id: 'expression', name: '式と計算', description: '計算の順序・計算のきまり', icon: '( )' },
        { id: 'change', name: '変わり方', description: '表・□と○の式', icon: '↗' },
        { id: 'graph', name: '折れ線グラフ', description: '読み取り・変化のようす', icon: '⌁' },
        { id: 'table', name: '整理のしかた', description: '２つの観点で整理する表', icon: '▦' },
        { id: 'ratio', name: '倍の見方', description: '何倍・もとにする大きさ', icon: '×3' },
        { id: 'abacus', name: 'そろばん', description: '大きな数・小数', icon: '▤' }
      ],
      5: [
        { id: 'intdec', name: '整数と小数', description: '位・10倍と10分の1', icon: '0.1' },
        { id: 'volume', name: '体積', description: '直方体・立方体・単位', icon: '㎥' },
        { id: 'proportion', name: '比例', description: '２つの量の変わり方', icon: '↗' },
        { id: 'decmul', name: '小数のかけ算', description: '小数 × 整数・小数 × 小数', icon: '×' },
        { id: 'congruent', name: '合同な図形', description: '重なる図形・対応', icon: '≅' },
        { id: 'decdiv', name: '小数のわり算', description: '小数 ÷ 整数・小数 ÷ 小数', icon: '÷' },
        { id: 'angle', name: '図形の角', description: '三角形・四角形・多角形', icon: '∠' },
        { id: 'multiple', name: '倍数と約数', description: '公倍数・公約数', icon: '倍' },
        { id: 'fracrel', name: '分数と小数・整数', description: '約分・通分・商と分数', icon: '⅗' },
        { id: 'fraction', name: '分数のたし算・ひき算', description: '分母がちがう分数', icon: '½' },
        { id: 'average', name: '平均', description: '平均の求め方・使い方', icon: 'avg' },
        { id: 'unit', name: '単位量あたりの大きさ', description: '人口密度・1あたり', icon: '/' },
        { id: 'speed', name: '速さ', description: '速さ・道のり・時間', icon: '→' },
        { id: 'area', name: '面積', description: '三角形・平行四辺形・台形・ひし形', icon: '▽' },
        { id: 'percent', name: '割合', description: '百分率・歩合', icon: '%' },
        { id: 'graph', name: '帯グラフと円グラフ', description: '割合を表すグラフ', icon: '◔' },
        { id: 'circle', name: '正多角形と円', description: '円周・正多角形', icon: '○' },
        { id: 'prism', name: '角柱と円柱', description: '面・辺・頂点・展開図', icon: '▮' }
      ]
    },
    japanese: {
      4: [
        { id: 'kanji_read', name: '漢字の読み', description: '４年の漢字・都道府県の漢字', icon: '読' },
        { id: 'kanji_write', name: '漢字の書き取り', description: '同じ形の字・部首', icon: '書' },
        { id: 'okurigana', name: '送りがな', description: '動詞・形容詞の送りがな', icon: 'あ' },
        { id: 'homonym', name: '同音異義語・同訓異字', description: '使い分け', icon: '同' },
        { id: 'word', name: '熟語・類義語・対義語', description: '熟語の組み立て・言葉の意味', icon: '言' },
        { id: 'idiom', name: '慣用句', description: '体の部分・動物の言葉', icon: '慣' },
        { id: 'proverb', name: 'ことわざ・故事成語・四字熟語', description: '意味と使い方', icon: '諺' },
        { id: 'grammar', name: '文の組み立て', description: '主語・述語・修飾語', icon: '文' },
        { id: 'conjunction', name: 'つなぎ言葉・指示語', description: 'つなぎ方・こそあど言葉', icon: '接' },
        { id: 'story', name: '物語文の読み取り', description: '場面・気持ちの変化', icon: '物' },
        { id: 'explain', name: '説明文の読み取り', description: '話題・まとめ・理由', icon: '説' }
      ]
    },
    science: {
      4: [
        { id: 'season', name: '季節と生き物', description: '動物・植物の1年', icon: '🌱' },
        { id: 'weather', name: '天気と気温', description: '気温の変化・天気のようす', icon: '☀' },
        { id: 'rain', name: '雨水のゆくえ', description: '流れ方・しみこみ方', icon: '☂' },
        { id: 'water', name: '水のすがた', description: '氷・水・水蒸気・蒸発', icon: '💧' },
        { id: 'air', name: '空気と水', description: 'とじこめた空気・水', icon: '◎' },
        { id: 'heat', name: 'ものの温度とあたたまり方', description: '金属・水・空気の温度と体積', icon: '🌡' },
        { id: 'electric', name: '電気のはたらき', description: 'かん電池・光電池・モーター', icon: '⚡' },
        { id: 'body', name: '人の体のつくりと運動', description: '骨・きん肉・関節', icon: '🦴' },
        { id: 'moon', name: '月の見え方', description: '月の形と動き', icon: '☾' },
        { id: 'star', name: '星や星座', description: '星の明るさ・色・動き', icon: '★' }
      ]
    },
    social: {
      4: [
        { id: 'prefecture', name: '都道府県と地方', description: '47の都道府県・7つの地方', icon: '🗾' },
        { id: 'geography', name: '日本の地形と気候', description: '山・川・平野・季節風', icon: '⛰' },
        { id: 'water', name: 'くらしをささえる水', description: '水道・ダム・下水', icon: '💧' },
        { id: 'electric', name: 'くらしをささえる電気', description: '発電・送電', icon: '⚡' },
        { id: 'garbage', name: 'ごみの処理と利用', description: '分別・リサイクル', icon: '♻' },
        { id: 'disaster', name: '自然災害からくらしを守る', description: 'そなえ・ハザードマップ', icon: '⚠' },
        { id: 'tradition', name: '地いきの伝統・文化', description: '祭り・伝統工芸', icon: '🎎' },
        { id: 'pioneer', name: '郷土をひらいた人々', description: '用水・開拓', icon: '🌾' },
        { id: 'industry', name: '県の特色と産業', description: '農業・水産業・工業・観光', icon: '🏭' }
      ]
    }
  };

  // その教科・学年の単元（登録がなければ空の配列）。color は並び順で付ける
  function list(subject, grade) {
    var g = DEFS[subject] && DEFS[subject][grade];
    return (g || []).map(function (u, i) { return Object.assign({ color: COLORS[i % COLORS.length] }, u); });
  }
  function has(subject, grade) { return list(subject, grade).length > 0; }
  function get(subject, grade, id) { return list(subject, grade).filter(function (u) { return u.id === id; })[0] || null; }
  // 並べ替え用の順番（登録のない単元は最後）
  function order(subject, grade, id) {
    var i = list(subject, grade).map(function (u) { return u.id; }).indexOf(id);
    return i < 0 ? Infinity : i;
  }

  FF.units = { DEFS: DEFS, list: list, has: has, get: get, order: order };
})(this);
