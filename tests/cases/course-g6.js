'use strict';
// 小6算数500問・小6理科100問の新作（ChatGPT。判断500）：固定問題。利用者のレビュー待ち（reviewed:false）
const fs=require('fs'),path=require('path'),L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),FF=c.FF,B=c.QUESTION_BANK;
 const math=B.filter(q=>q.collection==='course_g6_100'),sci=B.filter(q=>q.collection==='course_s6_100');
 test('小6の新作：算数500問・理科100問、IDは重ならず、検証を通り、reviewed:false',()=>{
  assert.equal(math.length,500);assert.equal(sci.length,100);
  const ids=new Set(B.map(q=>q.id));assert.equal(ids.size,B.length);
  math.concat(sci).forEach(q=>{assert.deepStrictEqual(Array.from(FF.learning.validateQuestion(q)),[],q.id);assert.equal(q.reviewed,false,q.id);});
 });
 test('小6の新作：4択は選択肢が4つで重ならず、答えを含む。ヒントは1〜2個。解説がある',()=>{
  math.concat(sci).filter(q=>q.answerType==='choice').forEach(q=>{assert.equal(q.choices.length,4,q.id);assert.equal(new Set(q.choices).size,4,q.id);assert.ok(q.choices.includes(q.answer),q.id);assert.ok(q.hints.length>=1&&q.hints.length<=2,q.id);assert.ok(q.explanation.length>10,q.id);});
 });
 test('小6理科：10単元×10問（基礎4・標準4・発展2）。もとの小6理科27問も、いまの単元に残る（計127問）',()=>{
  const units=FF.units.DEFS.science[6];assert.equal(units.length,10);
  units.forEach(u=>{const l=sci.filter(q=>q.unit===u.id);assert.equal(l.length,10,u.id);[['basic',4],['standard',4],['advanced',2]].forEach(([d,n])=>assert.equal(l.filter(q=>q.difficulty===d).length,n,u.id+d));});
  const all=B.filter(q=>q.subject==='science'&&q.gradeLevel===6);assert.equal(all.length,127);assert.ok(all.every(q=>units.some(u=>u.id===q.unit)));
 });
 test('小6の新作：図の絵のファイルが実在する（SVG の図は、問題にそのまま入っている）',()=>{
  const bad=[];math.concat(sci).forEach(q=>{const d=q.diagram;if(d&&d.kind==='image'&&d.src&&!/^data:/.test(d.src)&&!fs.existsSync(path.join(L.ROOT,d.src)))bad.push(q.id+' '+d.src);});
  assert.deepStrictEqual(bad,[]);
 });
};
