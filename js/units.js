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
