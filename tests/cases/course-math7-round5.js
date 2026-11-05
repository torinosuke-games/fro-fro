'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),A=c.FF.answer,qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1');
 test('第5回：独立した体積・表面積・統計の解と単位付き入力の拒否',()=>{
 const keys={space:{2:6,4:6,6:60,8:24,10:'45π',12:'32π/3',14:'42π',16:'24π',18:'36π',20:120,22:60,24:8/3,26:108,28:'27π'},data:{2:25,4:2,6:6,8:6,10:.3,12:.75,14:8,16:7,18:17,20:.23,22:.25,24:6,26:90,28:14.4}};
 for(const[u,answers]of Object.entries(keys))for(const[n,a]of Object.entries(answers)){const q=qs.find(q=>q.unit===u&&q.number===+n);assert.ok(A.judge(q,String(a)).correct,q.id);if(typeof a==='number'){assert.equal(A.parseNumber(q.answer),a,q.id);assert.ok(!A.judge(q,String(a+1)).correct,q.id);}else{assert.equal(q.validationMode,'formula');assert.ok(!A.judge(q,String(a)+' cm').correct);assert.ok(!A.judge(q,'2π').correct);}}
 });
 test('第5回：既存資料の見本を保持し、新作は各14択14書き',()=>{
 const old=c.QUESTION_BANK.filter(q=>q.subject==='math'&&q.gradeLevel===7&&q.unit==='data'&&q.collection!=='course_ma7_1');assert.equal(old.length,1);assert.equal(old[0].id,'math_g7_data_001');
 for(const u of ['space','data'])for(const type of ['choice','input'])assert.equal(qs.filter(q=>q.unit===u&&q.answerType===type).length,14);
 const names=new Set();for(const q of qs.filter(q=>['space','data'].includes(q.unit))){assert.equal(q.hints.length,1);assert.ok(!names.has(q.hints[0]),q.id);names.add(q.hints[0]);}
 });
};
