// 新しい学習導線・100問・報酬と保存の結合を検証する。
module.exports=({test,FF,ctx,assert,plain})=>{
 const bank=FF.learning.createBank(ctx.QUESTION_BANK),qs=ctx.QUESTION_BANK.filter(q=>q.collection==='frontier100');
 const now=1791000000000;
 test('リニューアル：18単元100問・連番・図解・人による確認前のフラグ',()=>{
  assert.strictEqual(qs.length,100);assert.strictEqual(FF.curriculum.units.length,18);
  assert.deepStrictEqual(plain(qs.map(q=>q.number)),Array.from({length:100},(_,i)=>i+1));
  for(const u of FF.curriculum.units)assert.strictEqual(qs.filter(q=>q.unit===u.id).length,u.count,u.id);
  for(const q of qs){assert.ok(q.diagram&&q.diagram.kind&&q.diagram.caption,q.id);assert.strictEqual(q.reviewed,false);assert.strictEqual(q.choices.length,4);assert.ok(q.hints.length>=2);}
 });
 test('リニューアル：学年設定後は、診断を受けず自分の学年を学べる',()=>{
  let s=FF.state.setPlayerGrade(FF.state.createDefaultState(now),4);
  for(const id of ['math','japanese','science','social','english']){assert.ok(FF.learning.isGradeUnlocked(s,id,4));assert.ok(!FF.learning.isGradeUnlocked(s,id,5));}
  assert.ok(FF.learning.isGradeUnlocked(s,'math',1));
 });
 test('リニューアル：100問すべてを元の採点・資源・熱量の経路で回答できる',()=>{
  let s=FF.state.setPlayerGrade(FF.state.createDefaultState(now),4);
  qs.forEach((q,i)=>{s.tickets={count:20,lastRecoveredAt:now};const t=now+i*1000;
   const r=FF.learning.submitAnswer(s,FF.learning.startAttempt(q),q.answer,{now:t,resource:'wood'});
   assert.strictEqual(r.outcome.status,'correct',q.id);assert.ok(r.outcome.reward>0);assert.ok(r.outcome.points>0);
   assert.strictEqual(r.state.resources.wood-s.resources.wood,r.outcome.reward);assert.strictEqual(r.state.studyPoints-s.studyPoints,r.outcome.points);s=r.state;
  });
  assert.strictEqual(s.learning.stats.math[4].correct,100);
 });
 test('リニューアル：単元と難易度のフィルターから別の問題が混ざらない',()=>{
  const sel={subject:'math',grade:4,unit:'angle',difficulty:'standard',answerType:'choice'};
  const list=FF.curriculum.pool(bank,sel);assert.strictEqual(list.length,3);
  for(let i=0;i<30;i++){const q=FF.curriculum.pick(bank,sel,{now,correctLog:{},recentIds:[],rng:FF.util.makeRng(i+1)});assert.strictEqual(q.unit,'angle');assert.strictEqual(q.difficulty,'standard');assert.strictEqual(q.collection,'frontier100');}
  assert.strictEqual(FF.curriculum.pool(bank,{...sel,unit:'fraction',answerType:'input'}).length,0);
 });
 test('リニューアル：書き問題に変換した数値を正しく採点する',()=>{
  const inputs=qs.filter(q=>q.inputForm);assert.ok(inputs.length>=60);
  for(const q of inputs){const v=FF.learning.inputVariant(q);assert.deepStrictEqual(plain(FF.learning.validateQuestion(v)),[]);assert.ok(FF.answer.judgeInput(v,v.answer).correct);assert.ok(v.diagram);}
 });
 test('リニューアル：誤答・回答済み再送で資源や熱量を増やさない',()=>{
  const s=FF.state.setPlayerGrade(FF.state.createDefaultState(now),4),q=qs[0];
  const r=FF.learning.submitAnswer(s,FF.learning.startAttempt(q),q.choices[1],{now,resource:'wood'});
  assert.strictEqual(r.outcome.status,'wrong');assert.strictEqual(r.state.studyPoints,s.studyPoints);assert.strictEqual(r.state.resources.wood,s.resources.wood);
  const again=FF.learning.submitAnswer(r.state,r.attempt,q.answer,{now,resource:'wood'});assert.strictEqual(again.outcome.status,'error');assert.strictEqual(again.state.studyPoints,0);
 });
 test('リニューアル：25%正答の当てずっぽうは、100%正答より獲得が十分少ない',()=>{
  function run(guess){let s=FF.state.setPlayerGrade(FF.state.createDefaultState(now),4);for(let i=0;i<100;i++){const q=qs[i];s.tickets={count:20,lastRecoveredAt:now};s=FF.learning.submitAnswer(s,FF.learning.startAttempt(q),guess&&i%4!==0?q.choices[1]:q.answer,{now:now+i*1000,resource:'wood'}).state;}return s.studyPoints;}
  assert.ok(run(true)<run(false)*.08);
 });
 test('リニューアル：既存の遊びチケットに交換し、保存し直せる',()=>{
  const s=FF.state.setPlayerGrade(FF.state.createDefaultState(now),4);s.studyPoints=900;s.studyPointsEarnedTotal=900;
  const r=FF.points.redeem(s,{minutes:15,method:'print',now,rng:FF.util.makeRng(10)});assert.ok(r.ok);assert.strictEqual(r.state.studyPoints,150);assert.strictEqual(r.state.studyPointsEarnedTotal,900);
  const loaded=FF.state.parseSave(FF.state.serialize(r.state),now);assert.ok(loaded.ok);assert.strictEqual(loaded.state.player.grade,4);assert.strictEqual(loaded.state.redeemHistory.length,1);
 });
 test('公開版：原作と同じ保存キーで記録を引き継ぐ',()=>{assert.strictEqual(FF.config.SAVE_KEY,'frozenFrontier.save');});
 test('教科カード：小4算数100問を重複なく集計し最新の正誤を表示する',()=>{
  const s=FF.state.createDefaultState(now);s.learning.questionResults[qs[0].id]=true;s.learning.questionResults[qs[1].id]=false;s.learning.questionResults['gen_math_g4_unused']=true;
  assert.deepStrictEqual(plain(FF.curriculum.progress(bank,s,'math',4)),{total:100,correct:1,review:1,unanswered:98,generated:false});
  s.learning.questionResults[qs[1].id]=true;
  assert.strictEqual(FF.curriculum.progress(bank,s,'math',4).correct,2);
  assert.strictEqual(FF.curriculum.progress(bank,s,'math',4).review,0);
 });
 test('教科カード：学年別に登録問題と自動生成を区別する',()=>{
  const s=FF.state.createDefaultState(now),p=FF.curriculum.progress(bank,s,'math',9);
  const ids=new Set(Object.values(bank.byId).filter(q=>q.subject==='math'&&q.gradeLevel===9).map(q=>q.derivedFrom||q.id));
  assert.strictEqual(p.total,ids.size);assert.strictEqual(p.correct,0);assert.ok(p.generated);
  assert.ok(!FF.curriculum.progress(bank,s,'japanese',9).generated);
 });
 test('問題マップ：最新結果が保存され、書き問題と選択問題で共有される',()=>{
  let s=FF.state.setPlayerGrade(FF.state.createDefaultState(now),4),q=qs[0];
  s=FF.learning.submitAnswer(s,FF.learning.startAttempt(q),q.answer,{now,resource:'wood'}).state;
  assert.strictEqual(s.learning.questionResults[q.id],true);
  s=FF.state.parseSave(FF.state.serialize(s),now).state;
  assert.strictEqual(s.learning.questionResults[q.id],true);
  const input=bank.byId[q.id+'#input'];assert.ok(input);
  let a=FF.learning.startAttempt(input);
  for(let i=0;i<FF.balance.INPUT_MAX_ATTEMPTS;i++){const r=FF.learning.submitAnswer(s,a,'-99999',{now,resource:'wood'});s=r.state;a=r.attempt;}
  assert.strictEqual(s.learning.questionResults[q.id],false);
  s=FF.learning.submitAnswer(s,FF.learning.startAttempt(q),q.answer,{now:now+1,resource:'wood'}).state;
  assert.strictEqual(s.learning.questionResults[q.id],true);
  s.learning.history=[];
  assert.strictEqual(FF.state.parseSave(FF.state.serialize(s),now).state.learning.questionResults[q.id],true);
 });
 test('問題マップ：旧セーブは残っている履歴の最新結果を復元する',()=>{
  const s=FF.state.createDefaultState(now);delete s.learning.questionResults;
  s.learning.history=[{qid:'old',correct:true},{qid:'old#input',correct:false},{qid:'other',correct:true}];
  const loaded=FF.state.parseSave(FF.state.serialize(s),now);assert.ok(loaded.ok);
  assert.deepStrictEqual(plain(loaded.state.learning.questionResults),{old:false,other:true});
 });
 test('リニューアル：図のデータの範囲を検証する',()=>{
  for(const q of qs){const d=q.diagram;
   if(d.kind==='fraction')assert.ok(d.d>=2&&d.n>0&&Number.isInteger(d.n)&&Number.isInteger(d.d));
   if(d.kind==='graph')assert.strictEqual(d.values.length,d.labels.length);
   if(d.kind==='abacus')assert.ok(d.digits.every(n=>Number.isInteger(n)&&n>=0&&n<=9));
   if(d.kind==='cutout')assert.ok(d.w>d.cw&&d.h>d.ch);
  }
 });
};
