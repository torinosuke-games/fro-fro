'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1');
 const units=['signed_numbers','signed_calc','expression','expression_calc','equation','equation_calc','proportion','plane','space','data'];
 test('中1数学第5回：10単元280問・各8/12/8・全難易度で選択と書きを混在',()=>{
  assert.equal(c.FF.units.DEFS.math[7].length,10);assert.equal(qs.length,280);
  for(const unit of units)for(const [d,n]of [['basic',8],['standard',12],['advanced',8]]){const group=qs.filter(q=>q.unit===unit&&q.difficulty===d);assert.equal(group.length,n);for(const type of ['choice','input'])assert.ok(group.some(q=>q.answerType===type),unit+d+type);}
  assert.equal(new Set(c.QUESTION_BANK.map(q=>q.id)).size,c.QUESTION_BANK.length);
  for(const q of qs){assert.equal(q.reviewed,false);if(!['signed_numbers','signed_calc'].includes(q.unit))assert.ok(!q.diagram);assert.equal(q.gradeLevel,7);assert.equal(q.subject,'math');assert.ok(q.hints.length>=1&&q.hints.length<=2);assert.deepStrictEqual(Array.from(c.FF.learning.validateQuestion(q)),[],q.id);assert.ok(!/数の符号と、基準にしている量|定義や計算のきまりに戻って|計算の順序を確認し、符号と絶対値/.test(q.hints.join('')),q.id);}
  const all=c.QUESTION_BANK.filter(q=>q.subject==='math'&&q.gradeLevel===7);assert.equal(all.length,290);all.forEach(q=>assert.ok(c.FF.units.DEFS.math[7].some(u=>u.id===q.unit),q.id));
 });
 test('中1数学：全course問題の表示に半角の加減記号を含めない',()=>{for(const q of qs)for(const value of [q.question,q.explanation,...q.choices||[],...q.hints])assert.ok(!/[-+]/.test(value),q.id+value);});
 test('中1数学：選択問題の全誤答説明と、全入力問題の正答・別表記の判定',()=>{
  for(const q of qs){if(q.answerType==='choice'){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.ok(q.choices.includes(q.answer));// 係数などを式から読み取る設問は、数値の部分一致を答え漏れとしない。
if(Number.isNaN(c.FF.answer.parseNumber(q.answer)))assert.ok(!q.question.includes(q.answer),q.id);assert.equal(q.explanation.split('ほかの 選択肢').length,2);q.choices.filter(a=>a!==q.answer).forEach(a=>assert.ok(q.explanation.includes('「'+a+'」'),q.id));}else{for(const a of [q.answer,...q.acceptedAnswers||[]])assert.ok(c.FF.answer.judge(q,a).correct,q.id+a);if(q.validationMode==='number'){const n=c.FF.answer.parseNumber(q.answer);assert.ok(Number.isFinite(n));assert.ok(!c.FF.answer.judge(q,String(n+1)).correct,q.id);}}}
 });
 test('中1数学：第1回の数値解・素因数分解の独立した期待値',()=>{
  const keys={signed_numbers:{1:-12,2:-650,3:9,4:-7,5:6,8:-5,9:-2.06,10:4,11:7,12:7,13:-5,15:-18,16:45,17:16,19:-.5,20:10,27:4,28:-5},signed_calc:{1:-3,2:-11,3:11,4:-13,6:28,7:-4,9:-5/12,10:-7/12,11:1/4,12:3/8,13:-1/6,14:-7/4,15:-12,16:-11,17:18,19:16,20:2,25:-2/3,27:-3/5}};
  for(const[u,answers]of Object.entries(keys))for(const[n,a]of Object.entries(answers)){const q=qs.find(q=>q.unit===u&&q.number===+n);assert.equal(c.FF.answer.parseNumber(q.answer),a,q.id);}
  const q=qs.find(q=>q.unit==='signed_numbers'&&q.number===14);for(const a of ['2²×3×5','2^2×3×5','3×2²×5'])assert.ok(c.FF.answer.judge(q,a).correct);for(const a of ['2×3×5','2²×3²×5'])assert.ok(!c.FF.answer.judge(q,a).correct);
 });
 test('中1数学：文字式の入力解・式の値・同値な順序と誤答の拒否',()=>{
  const keys={expression:{1:'5a',3:'b',5:'3a',7:'-6',9:'7',11:'m/5',13:'7',15:'4s',17:'12',19:'5',21:'880-3a',23:'18',25:'2a+4',27:'250-a'},expression_calc:{1:'7a',3:'4b',5:'-6x',7:'3x',9:'8a-5',11:'-3a-3',13:'-6a-8',15:'3a-2',17:'1.4a',19:'x+10',21:'4a+6',23:'3a-6',25:'-19',27:'x+2'}};
  for(const[u,answers]of Object.entries(keys))for(const[n,a]of Object.entries(answers)){const q=qs.find(q=>q.unit===u&&q.number===+n);assert.ok(c.FF.answer.judge(q,a).correct,q.id);}
  const q=qs.find(q=>q.unit==='expression_calc'&&q.number===27);for(const a of ['x+2','x＋2','2+x','2＋x'])assert.ok(c.FF.answer.judge(q,a).correct,a);for(const a of ['x-2','3x','2x'])assert.ok(!c.FF.answer.judge(q,a).correct,a);
 });
};
