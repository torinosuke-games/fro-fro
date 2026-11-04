'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),A=c.FF.answer;
 test('formula：空白・負号・積・累乗を正規化し、順序の別解を受ける',()=>{
  const q={answerType:'input',validationMode:'formula',answer:'-3a+2',acceptedAnswers:['2-3a']};
  for(const s of [' − 3 a ＋ 2 ','‐3a+2','－3a+2','2 − 3a'])assert.ok(A.judge(q,s).correct,s);
  for(const s of ['3a+2','-3a-2','2+3a'])assert.ok(!A.judge(q,s).correct,s);
  const f={answerType:'input',validationMode:'formula',answer:'2²×3³'};
  for(const s of ['2^2 * 3^3','2²＊3³','2²·3³'])assert.ok(A.judge(f,s).correct,s);
  assert.ok(!A.judge(f,'2^3×3^2').correct);assert.ok(!A.judge(f,'22×33').correct);
 });
 test('exact：英語・国語の内部空白や記号の扱いを変更しない',()=>{
  for(const [a,b]of [['a b','ab'],['a-b','a−b'],['2²×3','2^2*3']])assert.ok(!A.judge({answerType:'input',validationMode:'exact',answer:a},b).correct);
  assert.ok(A.judge({answerType:'input',validationMode:'exact',answer:'Hello World'},' hello  world ').correct);
 });
 test('第3回：既存見本4問を保持し、新作入力解を独立した期待値で検査',()=>{
  const qs=c.QUESTION_BANK;
  for(let i=1;i<=4;i++){const q=qs.find(q=>q.id==='math_g7_equation_'+String(i).padStart(3,'0'));assert.ok(q);assert.notEqual(q.collection,'course_ma7_1');}
  const keys={equation:{2:7,4:13,6:-8,8:-5,10:4,12:4,14:5,16:5,18:6,20:800,22:6,24:3,26:24,28:9},equation_calc:{1:5,3:-6,5:-2/7,7:-3,9:4,11:-3,13:-4,15:9,17:5,19:-6,21:22/5,23:-4,25:5,27:1200}};
  for(const[u,values]of Object.entries(keys))for(const[n,a]of Object.entries(values)){const q=qs.find(q=>q.collection==='course_ma7_1'&&q.unit===u&&q.number===+n);assert.equal(q.validationMode,'number');assert.equal(A.parseNumber(q.answer),a,q.id);assert.ok(A.judge(q,String(a)).correct);assert.ok(!A.judge(q,String(a+1)).correct);}
  for(const q of qs.filter(q=>q.collection==='course_ma7_1'&&['expression','expression_calc'].includes(q.unit)&&q.answerType==='input'))assert.ok(['number','formula'].includes(q.validationMode),q.id);
 });
};
