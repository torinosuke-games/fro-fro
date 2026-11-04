'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1');
 test('中1数学第1回：10単元登録・2単元56問・各8/12/8・図なし',()=>{
  assert.equal(c.FF.units.DEFS.math[7].length,10);assert.equal(qs.length,56);
  for(const unit of ['signed_numbers','signed_calc'])for(const [d,n]of [['basic',8],['standard',12],['advanced',8]])assert.equal(qs.filter(q=>q.unit===unit&&q.difficulty===d).length,n);
  assert.equal(new Set(c.QUESTION_BANK.map(q=>q.id)).size,c.QUESTION_BANK.length);
  for(const q of qs){assert.equal(q.reviewed,false);assert.ok(!q.diagram);assert.equal(q.gradeLevel,7);assert.equal(q.subject,'math');assert.ok(q.hints.length>=1&&q.hints.length<=2);assert.deepStrictEqual(Array.from(c.FF.learning.validateQuestion(q)),[]);}
  const all=c.QUESTION_BANK.filter(q=>q.subject==='math'&&q.gradeLevel===7);assert.equal(all.length,66);all.forEach(q=>assert.ok(c.FF.units.DEFS.math[7].some(u=>u.id===q.unit),q.id));
 });
 test('中1数学：40問の数値解と入力判定、誤答を拒否',()=>{
  const keys={signed_numbers:[-12,-650,9,-7,6,-4,-3,-5,-2.06,4,7,7,-5,9,-18,45,16,1.5,-.5,10],signed_calc:[-3,-11,11,-13,-18,28,-4,7,1,-1.7,.25,6,-4,-24,-12,-11,18,-9,16,2]};
  for(const [u,answers]of Object.entries(keys))answers.forEach((a,i)=>{const q=qs.find(q=>q.id===`math_g7_${u}_${String(i+1).padStart(3,'0')}`);assert.equal(q.answerType,'input');assert.equal(q.validationMode,'number');assert.equal(Number(q.answer),a,q.id);assert.ok(c.FF.answer.judge(q,String(a)).correct,q.id);assert.ok(!c.FF.answer.judge(q,String(a+1)).correct,q.id);if(a<0)assert.ok(c.FF.answer.judge(q,String(a).replace('-','−')).correct,q.id);});
 });
 test('中1数学：選択16問の重複なし・全誤答解説・答え文の漏れなし',()=>{
  const choices=qs.filter(q=>q.answerType==='choice');assert.equal(choices.length,16);for(const q of choices){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.ok(q.choices.includes(q.answer));assert.ok(!q.question.includes(q.answer),q.id);assert.equal(q.explanation.split('ほかの 選択肢').length,2);q.choices.filter(a=>a!==q.answer).forEach(a=>assert.ok(q.explanation.includes('「'+a+'」'),q.id));}
 });
};
