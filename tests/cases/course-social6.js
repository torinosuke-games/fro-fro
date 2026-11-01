'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),U=c.FF.util,all=c.QUESTION_BANK,qs=all.filter(q=>q.collection==='course_so6_1');
 test('小6社会第1回：4単元112問、各基礎8・標準12・発展8、未レビュー・図なし',()=>{
  assert.equal(qs.length,112);
  for(const unit of ['prehistoric','asuka_nara','heian','kamakura'])for(const [d,n] of [['basic',8],['standard',12],['advanced',8]])assert.equal(qs.filter(q=>q.unit===unit&&q.difficulty===d).length,n,unit+d);
  qs.forEach(q=>{assert.equal(q.reviewed,false);assert.ok(!q.diagram);assert.deepStrictEqual(Array.from(c.FF.learning.validateQuestion(q)),[],q.id);});
 });
 test('小6社会第1回：重複IDなし・4択・ヒント1〜2・全誤答解説・答えの漏れなし',()=>{
  assert.equal(new Set(all.map(q=>q.id)).size,all.length);
  qs.forEach(q=>{assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.ok(q.choices.includes(q.answer));assert.ok(q.hints.length>=1&&q.hints.length<=2);assert.ok(!U.plainText(q.question).includes(U.plainText(q.answer)),q.id);const e=q.explanation.split('ほかの 選択肢');assert.equal(e.length,2);q.choices.filter(a=>a!==q.answer).forEach(a=>assert.ok(e[1].includes('「'+a+'」'),q.id+a));});
 });
 test('小6社会第1回：書き問題の形3割以上・既存27問のID保持・全問登録単元',()=>{
  assert.ok(qs.filter(q=>q.inputForm).length>=Math.ceil(qs.length*0.3));
  qs.filter(q=>q.inputForm).forEach(q=>{assert.equal(q.inputForm.reviewed,false);assert.ok(!/どれ/.test(q.inputForm.question||q.question));});
  const units=c.FF.units.DEFS.social[6];assert.equal(units.length,12);
  const legacy=all.filter(q=>q.subject==='social'&&q.gradeLevel===6&&q.collection!=='course_so6_1');assert.equal(legacy.length,27);
  const ids=['constitution_001','constitution_002','international_001',...Array.from({length:18},(_,i)=>'history_'+String(i+1).padStart(3,'0')),...Array.from({length:6},(_,i)=>'politics_'+String(i+1).padStart(3,'0'))].map(x=>'social_g6_'+x);
  assert.deepStrictEqual(Array.from(legacy,q=>q.id).sort(),ids.sort());
  legacy.concat(qs).forEach(q=>assert.ok(units.some(u=>u.id===q.unit),q.id));
 });
 test('小6社会改訂：極端・時代違いの誤答と難語を再導入しない',()=>{
  qs.forEach(q=>{
   q.choices.filter(a=>a!==q.answer).forEach(a=>assert.ok(!/必ず|全員|全く|すべて|一日で|蒸気機関車|国会議員|鎌倉幕府|江戸幕府/.test(U.plainText(a)),q.id+a));
   assert.ok(!/慎重|造立|照らし合わせ/.test(U.plainText([q.question,...q.hints,q.explanation].join(''))),q.id);
  });
  const q=qs.find(q=>q.id==='social_g6_prehistoric_027');
  assert.equal(U.plainText(q.question),'古墳の大きさから、何が考えられますか。');
 });
 test('小6社会改訂：書き問題の別名が実際に正解になる',()=>{
  const names={social_g6_prehistoric_017:['ヤマト政権','大和王権','ヤマト王権','やまとおうけん'],social_g6_prehistoric_003:['竪穴式住居','たて穴式住居'],social_g6_asuka_nara_003:['十七条憲法','じゅうしちじょうけんぽう']};
  Object.entries(names).forEach(([id,answers])=>{const q=c.FF.learning.inputVariant(qs.find(q=>q.id===id));answers.forEach(a=>assert.ok(c.FF.answer.judge(q,a).correct,id+a));});
  qs.filter(q=>q.inputForm).forEach(q=>{const v=c.FF.learning.inputVariant(q);assert.deepStrictEqual(Array.from(c.FF.learning.validateQuestion(v)),[],q.id);});
 });

 test('小6社会追加：指定の文言修正・別解重複なし・発展の型の配分',()=>{
  const get=id=>qs.find(q=>q.id==='social_g6_'+id);
  assert.ok(!get('prehistoric_010').question.includes('食べ残しとして'));
  assert.ok(!/645|710|743/.test(get('asuka_nara_028').question));
  assert.ok(get('prehistoric_024').question.includes('はにわのかけら'));
  assert.ok(!get('prehistoric_024').question.includes('大型の古墳'));
  const norm=s=>c.FF.answer.toHiragana(c.FF.answer.normalize(U.plainText(s)));
  qs.filter(q=>q.inputForm).forEach(q=>{const f=q.inputForm;const list=[norm(f.answer||q.answer),...Array.from(f.acceptedAnswers||[],norm)];assert.equal(new Set(list).size,list.length,q.id);});
  const types=require('../fixtures/social6-advanced-types.json');
  const adv=qs.filter(q=>['heian','kamakura'].includes(q.unit)&&q.difficulty==='advanced');
  assert.equal(adv.length,16);assert.deepStrictEqual(Object.keys(types).sort(),Array.from(adv,q=>q.id).sort());
  const counts={};Object.values(types).forEach(t=>counts[t]=(counts[t]||0)+1);Object.values(counts).forEach(n=>assert.ok(n<=3));
 });

};
