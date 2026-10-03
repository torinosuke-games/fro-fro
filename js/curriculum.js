// リニューアルの出題条件。報酬・正答率・チケットの計算は元の learning / rewards / points を使う。
(function (root) {
  'use strict';
  var FF = root.FF;
  var units = [
    ['large','大きな数','億・兆と数のしくみ','123',6],
    ['round','がい数','四捨五入・見積もり','≈',6],
    ['divide1','１けたでわるわり算','筆算・あまり','÷',6],
    ['divide2','２けたでわるわり算','商の見当・わり算の性質','÷',6],
    ['decimal','小数','位・たし算・ひき算','0.1',6],
    ['decimal_calc','小数のかけ算・わり算','小数 × 整数・小数 ÷ 整数','×',6],
    ['fraction','分数','仮分数・帯分数・計算','½',6],
    ['angle','角','角度・分度器','∠',6],
    ['quad','垂直・平行と四角形','台形・平行四辺形・ひし形','▱',6],
    ['area','面積','長方形・正方形・面積の単位','▧',8],
    ['solid','直方体と立方体','面・辺・頂点・展開図','◇',6],
    ['position','位置の表し方','平面と空間の位置','⌖',4],
    ['expression','式と計算','計算の順序・計算のきまり','( )',6],
    ['change','変わり方','表・□と○の式','↗',4],
    ['graph','折れ線グラフ','読み取り・変化のようす','⌁',6],
    ['table','整理のしかた','２つの観点で整理する表','▦',4],
    ['ratio','倍の見方','何倍・もとにする大きさ','×3',4],
    ['abacus','そろばん','大きな数・小数','▤',4]
  ].map(function(a,i){return {id:a[0],name:a[1],description:a[2],icon:a[3],count:a[4],color:['#3387c8','#bf728e','#49a6ad','#e2a43d','#887cca','#4caa8c'][i%6]};});
  function pool(bank, sel) {
    return Object.keys(bank.byId).map(function(id){return bank.byId[id];}).filter(function(q){
      return q.subject===sel.subject && q.gradeLevel===sel.grade && q.answerType===sel.answerType &&
        (sel.subject!=='math'||sel.grade!==4||q.collection==='frontier100') &&
        (!sel.unit||sel.unit==='all'||q.unit===sel.unit) &&
        (!sel.difficulty||sel.difficulty==='random'||q.difficulty===sel.difficulty);
    });
  }
  function pick(bank,sel,ctx) {
    if(sel.subject==='math'&&sel.grade!==4&&(!sel.unit||sel.unit==='all')) return FF.learning.pickQuestion(bank,sel,ctx);
    var list=pool(bank,sel), rng=ctx.rng||Math.random;
    if(!list.length) {
      if(sel.subject==='math'&&sel.grade!==4&&(!sel.unit||sel.unit==='all')) return FF.learning.pickQuestion(bank,sel,ctx);
      return null;
    }
    var best=[],min=Infinity;
    list.forEach(function(q){
      var n=FF.rewards.countRecentCorrect(ctx.correctLog,q.id,ctx.now)*10+((ctx.recentIds||[]).indexOf(q.id)>=0?5:0);
      if(n<min){min=n;best=[q];}else if(n===min)best.push(q);
    });
    return best[Math.floor(rng()*best.length)];
  }
  function scarcest(state) {return FF.defs.RESOURCES.reduce(function(best,r){return state.resources[r.id]<state.resources[best]?r.id:best;},'wood');}
  function progress(bank,state,subject,grade){
    var seen={},results=state.learning.questionResults||{},out={total:0,correct:0,review:0,unanswered:0,generated:false};
    Object.keys(bank.byId).forEach(function(id){var q=bank.byId[id];if(q.subject!==subject||q.gradeLevel!==grade||(subject==='math'&&grade===4&&q.collection!=='frontier100'))return;
      var key=q.derivedFrom||q.id.replace(/#input$/,'');if(seen[key])return;seen[key]=true;out.total++;
      if(results[key]===true)out.correct++;else if(results[key]===false)out.review++;else out.unanswered++;
    });
    out.generated=subject==='math'&&grade!==4&&FF.defs.DIFFICULTIES.some(function(d){return FF.generators.supports(subject,grade,d.id);});
    return out;
  }
  FF.curriculum={units:units,pool:pool,pick:pick,scarcest:scarcest,progress:progress,unit:function(id){return units.filter(function(u){return u.id===id;})[0];}};
})(this);
