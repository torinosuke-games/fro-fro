'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),U=c.FF.util,all=c.QUESTION_BANK,qs=all.filter(q=>q.collection==='course_so6_1');
 test('小6社会第1回：2単元56問、各基礎8・標準12・発展8、未レビュー・図なし',()=>{
  assert.equal(qs.length,56);
  for(const unit of ['prehistoric','asuka_nara'])for(const [d,n] of [['basic',8],['standard',12],['advanced',8]])assert.equal(qs.filter(q=>q.unit===unit&&q.difficulty===d).length,n,unit+d);
  qs.forEach(q=>{assert.equal(q.reviewed,false);assert.ok(!q.diagram);assert.deepStrictEqual(Array.from(c.FF.learning.validateQuestion(q)),[],q.id);});
 });
 test('小6社会第1回：重複IDなし・4択・ヒント1〜2・全誤答解説・答えの漏れなし',()=>{
  assert.equal(new Set(all.map(q=>q.id)).size,all.length);
  qs.forEach(q=>{assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.ok(q.choices.includes(q.answer));assert.ok(q.hints.length>=1&&q.hints.length<=2);assert.ok(!U.plainText(q.question).includes(U.plainText(q.answer)),q.id);const e=q.explanation.split('ほかの 選択肢');assert.equal(e.length,2);q.choices.filter(a=>a!==q.answer).forEach(a=>assert.ok(e[1].includes('「'+a+'」'),q.id+a));});
 });
 test('小6社会第1回：書き問題の形3割以上・既存27問のID保持・全問登録単元',()=>{
  assert.ok(qs.filter(q=>q.inputForm).length>=17);
  qs.filter(q=>q.inputForm).forEach(q=>{assert.equal(q.inputForm.reviewed,false);assert.ok(!/どれ/.test(q.inputForm.question||q.question));});
  const units=c.FF.units.DEFS.social[6];assert.equal(units.length,12);
  const legacy=all.filter(q=>q.subject==='social'&&q.gradeLevel===6&&q.collection!=='course_so6_1');assert.equal(legacy.length,27);
  const ids=['constitution_001','constitution_002','international_001',...Array.from({length:18},(_,i)=>'history_'+String(i+1).padStart(3,'0')),...Array.from({length:6},(_,i)=>'politics_'+String(i+1).padStart(3,'0'))].map(x=>'social_g6_'+x);
  assert.deepStrictEqual(Array.from(legacy,q=>q.id).sort(),ids.sort());
  legacy.concat(qs).forEach(q=>assert.ok(units.some(u=>u.id===q.unit),q.id));
 });
};
