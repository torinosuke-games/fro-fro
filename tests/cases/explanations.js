'use strict';
// 解説の充実（判断497）：questions/explanations.js で、全問題（算数の自動生成を除く）の解説を、正解の理由と「ほかの選択肢」の説明つきに書きなおした
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const NOCOURSE=L.LOGIC_FILES_WITH_FIXES.filter(f=>!/_g[6-9]_course\.js$/.test(f)),fixed=L.load(NOCOURSE),orig=L.load(NOCOURSE.filter(f=>!/^questions\/explanations(-\d+)?\.js$/.test(f))),U=fixed.FF.util;   // 比べる相手は、図の見直しまで入れた問題
 const bank=fixed.QUESTION_BANK.filter(q=>!q.id.startsWith('gen_')&&!/^course_/.test(q.collection||'')),O={};
 orig.QUESTION_BANK.forEach(q=>O[q.id]=q);   // 小6の新作（course_*）は、自分の解説を持つので、ここでは調べない
 const plain=s=>U.plainText(String(s)).replace(/\s+/g,'');
 test('解説：算数の自動生成以外の全問（4915問）に、新しい解説がある',()=>{
  assert.equal(bank.length,4915);
  bank.forEach(q=>{assert.ok(q.explanation!==O[q.id].explanation,q.id+' 解説が変わっていない');assert.ok(q.explanation.length>=50,q.id+' 短い');});
 });
 test('解説：選択問題は、正解以外の選択肢すべてが解説に出てくる（ほかの選択肢の説明）',()=>{
  const ng=[];bank.filter(q=>q.answerType==='choice').forEach(q=>{const e=plain(q.explanation);q.choices.filter(x=>x!==q.answer).forEach(x=>{if(!e.includes(plain(x)))ng.push(q.id+': '+x);});});
  assert.deepStrictEqual(ng,[]);
 });
 test('解説：問題・答え・選択肢・ヒントは変わっていない',()=>{
  bank.forEach(q=>{const o=O[q.id];['question','answer','hints'].forEach(k=>assert.deepStrictEqual(JSON.parse(JSON.stringify(q[k])),JSON.parse(JSON.stringify(o[k])),q.id+' '+k));assert.deepStrictEqual(q.choices?[...q.choices]:null,o.choices?[...o.choices]:null,q.id);});
 });
 test('解説：書き問題の形（#input）にも、新しい解説が引き継がれる',()=>{
  const q=fixed.QUESTION_BANK.find(x=>x.inputForm);const v=fixed.FF.learning.inputVariant?fixed.FF.learning.inputVariant(q):null;
  if(v)assert.equal(v.explanation,q.explanation);
 });
};
