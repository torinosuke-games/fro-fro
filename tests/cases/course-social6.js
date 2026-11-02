'use strict';
const L=require('../lib/loader');
module.exports=({test,assert})=>{
 const c=L.load(L.LOGIC_FILES_WITH_FIXES),U=c.FF.util,all=c.QUESTION_BANK,qs=all.filter(q=>q.collection==='course_so6_1');
 test('小6社会第1回：12単元336問、各基礎8・標準12・発展8、未レビュー・図なし',()=>{
  assert.equal(qs.length,336);
  for(const unit of ['prehistoric','asuka_nara','heian','kamakura','muromachi_sengoku','edo','meiji','modern','constitution','politics','local_tax','international'])for(const [d,n] of [['basic',8],['standard',12],['advanced',8]])assert.equal(qs.filter(q=>q.unit===unit&&q.difficulty===d).length,n,unit+d);
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
   q.choices.filter(a=>a!==q.answer).forEach(a=>assert.ok(!/必ず|全員|全く|すべて|一日で|蒸気機関車|鎌倉幕府|江戸幕府/.test(U.plainText(a)),q.id+a));
   if(!['meiji','modern','constitution','politics'].includes(q.unit))q.choices.filter(a=>a!==q.answer).forEach(a=>assert.ok(!/国会議員/.test(U.plainText(a)),q.id+a));
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

 test('小6社会第3回：指定の範囲外用語を新作から除き、追加発展は各型3問以下',()=>{
  const excluded=/公領|国衙|康慶|定朝|湛慶|政所|問注所|侍所|雑徭|院政|六波羅探題|二毛作|定期市|禅宗|題目|快慶/;
  qs.forEach(q=>assert.ok(!excluded.test(U.plainText(JSON.stringify(q))),q.id));
  const types=require('../fixtures/social6-advanced-types-3.json');
  const adv=qs.filter(q=>['muromachi_sengoku','edo'].includes(q.unit)&&q.difficulty==='advanced');
  assert.equal(adv.length,16);assert.deepStrictEqual(Object.keys(types).sort(),Array.from(adv,q=>q.id).sort());
  const counts={};Object.values(types).forEach(t=>counts[t]=(counts[t]||0)+1);Object.values(counts).forEach(n=>assert.ok(n<=3));
  const old=['kamakura_010','kamakura_012','kamakura_015','kamakura_016','kamakura_017','kamakura_018','kamakura_019','heian_017','heian_022','heian_026'];
  old.forEach(id=>assert.ok(qs.some(q=>q.id==='social_g6_'+id),id));
 });

 test('小6社会第4回：発展16問は各型3問以下、結び付ける二つの事項を記録',()=>{
  const types=require('../fixtures/social6-advanced-types-4.json');
  const links=require('../fixtures/social6-advanced-connections-4.json');
  const adv=qs.filter(q=>['meiji','modern'].includes(q.unit)&&q.difficulty==='advanced');
  assert.equal(adv.length,16);
  for(const data of [types,links])assert.deepStrictEqual(Object.keys(data).sort(),Array.from(adv,q=>q.id).sort());
  const counts={};Object.values(types).forEach(t=>counts[t]=(counts[t]||0)+1);Object.values(counts).forEach(n=>assert.ok(n<=3));
  Object.entries(links).forEach(([id,facts])=>{assert.equal(facts.length,2,id);assert.equal(new Set(facts).size,2,id);facts.forEach(s=>assert.ok(typeof s==='string'&&s.length>0,id));});
 });

 test('小6社会第5回：指定3問の修正と追加発展の配分',()=>{
  const get=id=>qs.find(q=>q.id==='social_g6_'+id);
  assert.ok(U.plainText(get('modern_021').question).startsWith('明治の衆議院議員選挙'));
  assert.ok(!/[0-9０-９]/.test(U.plainText(get('modern_017').question)));
  assert.equal(U.plainText(get('modern_017').answer),'9');
  assert.ok(get('modern_001').choices.some(s=>U.plainText(s)==='昭和三陸地震'));
  assert.ok(!U.plainText(get('modern_001').explanation).includes('東海地方の地震災害'));
  const types=require('../fixtures/social6-advanced-types-5.json');
  const links=require('../fixtures/social6-advanced-connections-5.json');
  const adv=qs.filter(q=>['constitution','politics'].includes(q.unit)&&q.difficulty==='advanced');
  assert.equal(adv.length,16);
  for(const data of [types,links])assert.deepStrictEqual(Object.keys(data).sort(),Array.from(adv,q=>q.id).sort());
  const counts={};Object.values(types).forEach(t=>counts[t]=(counts[t]||0)+1);Object.values(counts).forEach(n=>assert.ok(n<=3));
  Object.entries(links).forEach(([id,facts])=>{assert.equal(facts.length,2,id);assert.equal(new Set(facts).size,2,id);});
  const names={constitution_004:['人権','じんけん'],politics_010:['首相','しゅしょう','総理大臣'],politics_016:['法案','ほうあん']};
  Object.entries(names).forEach(([id,answers])=>{const v=c.FF.learning.inputVariant(get(id));answers.forEach(a=>assert.ok(c.FF.answer.judge(v,a).correct,id+a));});
 });

 test('小6社会第6回：指定29問の正解・ID保持、誤答点検、新規2単元の発展配分',()=>{
  const review=require('../fixtures/social6-distractor-review-6.json');
  const preserved=require('../fixtures/social6-preserved-6.json');
  assert.equal(Object.keys(review).length,29);
  Object.entries(preserved).forEach(([id,fields])=>{const q=qs.find(q=>q.id===id);assert.ok(q,id);Object.entries(fields).forEach(([k,v])=>assert.equal(q[k],v,id+k));
   if(Array.isArray(review[id]))assert.deepStrictEqual(Array.from(q.choices.filter(a=>a!==q.answer),U.plainText),review[id],id);
   assert.ok(!/一人で複数回投票|罪が軽くなる|その場で憲法を変更|裁判所が予算案を作る|天皇が事業を進める/.test(U.plainText(q.explanation)),id);
  });
  const types=require('../fixtures/social6-advanced-types-6.json');
  const links=require('../fixtures/social6-advanced-connections-6.json');
  const adv=qs.filter(q=>['local_tax','international'].includes(q.unit)&&q.difficulty==='advanced');
  assert.equal(adv.length,16);
  for(const data of [types,links])assert.deepStrictEqual(Object.keys(data).sort(),Array.from(adv,q=>q.id).sort());
  const counts={};Object.values(types).forEach(t=>counts[t]=(counts[t]||0)+1);Object.values(counts).forEach(n=>assert.ok(n<=3));
  Object.entries(links).forEach(([id,facts])=>{assert.equal(facts.length,2,id);assert.equal(new Set(facts).size,2,id);});
  const names={social_g6_international_006:['UNICEF','国連児童基金'],social_g6_international_007:['UNESCO','国連教育科学文化機関']};
  Object.entries(names).forEach(([id,answers])=>{const v=c.FF.learning.inputVariant(qs.find(q=>q.id===id));answers.forEach(a=>assert.ok(c.FF.answer.judge(v,a).correct,id+a));});
 });

};
