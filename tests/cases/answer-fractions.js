'use strict';
module.exports=({test,assert,FF})=>{
 test('分数解ではスラッシュを入力できるキーボードを使う',()=>{
  assert.equal(FF.answer.inputMode({validationMode:'number',answer:'-3/4'}),'text');
  assert.equal(FF.answer.inputMode({validationMode:'number',answer:'0.75'}),'decimal');
  assert.equal(FF.answer.inputMode({validationMode:'exact',answer:'3a+2'}),'text');
 });
 test('数値入力：符号・かっこ・約分前の分数を読む',()=>{
  for(const [s,n]of [['3/4',.75],['6/8',.75],['-3/4',-.75],['−3/4',-.75],['(−3)/4',-.75],['3/(-4)',-.75],['(-6)/(-8)',.75],['＋３／４',.75],[' 3 / 4 ',.75],['0/9',0],['1,000/4',250],['.5/2',.25]])assert.equal(FF.answer.parseNumber(s),n,s);
 });
 test('数値入力：ゼロ除算・不正な式を数値としない',()=>{
  for(const s of ['1/0','0/0','3/(-0)','1/0.0','3/','/4','1/2/3','(1+2)/4','((3))/4','3/4abc','Infinity','NaN','3,00/4','3//4','1e3/4','3/(2+2)'])assert.ok(Number.isNaN(FF.answer.parseNumber(s)),s);
 });
 test('分数の正誤判定：分数解と小数解、誤答とゼロ除算',()=>{
  for(const answer of ['-3/4','-0.75']){const q={answerType:'input',validationMode:'number',answer};for(const s of ['-6/8','−3/4','(−3)/4','-.75'])assert.ok(FF.answer.judge(q,s).correct,s);for(const s of ['3/4','-4/3','-3/0','-3/5'])assert.ok(!FF.answer.judge(q,s).correct,s);}
  assert.ok(!FF.answer.judge({answerType:'input',validationMode:'number',answer:'0'},'0/0').correct);
 });
};
