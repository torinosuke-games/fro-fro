'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),A=c.FF.answer,qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1');
 test('第4回：独立した数値・πの解と、単位付き入力の拒否',()=>{
 const keys={proportion:{2:-12,4:-4,6:-4,8:-.5,10:-2,12:6,14:3,16:70,18:9,20:-4,22:12,24:7.5,26:8,28:6},plane:{2:4,4:90,6:10,8:3,10:-3,12:90,14:'4π',16:'4π',18:3,20:120,22:'12＋4π',24:'24π',26:'15π',28:'3π'}};
 for(const[u,values]of Object.entries(keys))for(const[n,a]of Object.entries(values)){const q=qs.find(q=>q.unit===u&&q.number===+n);assert.ok(A.judge(q,String(a)).correct,q.id);if(typeof a==='number'){assert.equal(A.parseNumber(q.answer),a);assert.ok(!A.judge(q,String(a+1)).correct);}else{assert.equal(q.validationMode,'formula');assert.ok(!A.judge(q,String(a)+' cm').correct);assert.ok(!A.judge(q,'6π cm').correct);}}
 const q=qs.find(q=>q.unit==='plane'&&q.number===22);for(const s of ['12+4π','4π + 12','12 ＋ 4π'])assert.ok(A.judge(q,s).correct,s);
 });
 test('第3回の表示変更後もASCIIの数・式を受ける',()=>{
  for(const q of qs.filter(q=>q.answerType==='input')){const ascii=q.answer.replace(/−/g,'-').replace(/＋/g,'+');assert.ok(A.judge(q,ascii).correct,q.id);for(const a of q.acceptedAnswers||[])assert.ok(A.judge(q,a.replace(/−/g,'-').replace(/＋/g,'+')).correct,q.id);}
 });
 test('第4回：既存見本2問は元のcollectionのまま、新作は各14択14書き',()=>{
 const old=c.QUESTION_BANK.filter(q=>q.gradeLevel===7&&q.subject==='math'&&['proportion','plane'].includes(q.unit)&&q.collection!=='course_ma7_1');assert.equal(old.length,2);
 for(const u of ['proportion','plane'])for(const type of ['choice','input'])assert.equal(qs.filter(q=>q.unit===u&&q.answerType===type).length,14);
 });
};
