// 新しい学習導線・100問・報酬と保存の結合を検証する。
module.exports=({test,FF,ctx,assert,plain})=>{
 const bank=FF.learning.createBank(ctx.QUESTION_BANK),qs=ctx.QUESTION_BANK.filter(q=>q.collection==='frontier100'),HAND=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_g4').length;
 // デバッグ版のレビューでOKだった問題（確認済み。判断241）。独立した控えとして、データとは別にここにも書く
 const REVIEWED_OK=new Set(['math_g4_hand_position_001','math_g4_hand_large_017','math_g4_hand_fraction_016','math_g4_hand_fraction_011','math_g4_hand_decimal_005','math_g4_hand_expression_009','math_g4_hand_expression_014','math_g4_hand_expression_026','math_g4_hand_table_009','math_g4_hand_ratio_003','math_g4_frontier_decimal_calc_004']);
 const now=1791000000000;
 test('リニューアル：18単元100問・連番・図解・人による確認前のフラグ',()=>{
  assert.strictEqual(qs.length,100);assert.strictEqual(FF.curriculum.units('math',4).length,18);
  assert.deepStrictEqual(plain(qs.map(q=>q.number)),Array.from({length:100},(_,i)=>i+1));
  const four=['position','change','table','ratio','abacus'];
  for(const u of FF.curriculum.units('math',4))assert.strictEqual(qs.filter(q=>q.unit===u.id).length,u.id==='area'?8:four.includes(u.id)?4:6,u.id);
  for(const q of qs){if(q.diagram)assert.ok(q.diagram.kind&&q.diagram.caption,q.id);assert.strictEqual(q.reviewed,REVIEWED_OK.has(q.id));assert.strictEqual(q.choices.length,4);assert.ok(q.hints.length>=2);}
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
  const list=FF.curriculum.pool(bank,sel);assert.strictEqual(list.length,ctx.QUESTION_BANK.filter(q=>q.unit==='angle'&&q.gradeLevel===4&&q.difficulty==='standard').length);assert.ok(list.length>=3);
  for(let i=0;i<30;i++){const q=FF.curriculum.pick(bank,sel,{now,correctLog:{},recentIds:[],rng:FF.util.makeRng(i+1)});assert.strictEqual(q.unit,'angle');assert.strictEqual(q.difficulty,'standard');assert.strictEqual(q.answerType,'choice');}
  const fr=FF.curriculum.pool(bank,{...sel,unit:'fraction',difficulty:'random',answerType:'input'});assert.ok(fr.length>0);
  for(const q of fr){assert.strictEqual(q.unit,'fraction');assert.strictEqual(q.answerType,'input');assert.strictEqual(q.gradeLevel,4);}
 });
 test('リニューアル：書き問題に変換した数値を正しく採点する',()=>{
  const inputs=qs.filter(q=>q.inputForm);assert.ok(inputs.length>=60);
  for(const q of inputs){const v=FF.learning.inputVariant(q);assert.deepStrictEqual(plain(FF.learning.validateQuestion(v)),[]);assert.ok(FF.answer.judgeInput(v,v.answer).correct);assert.strictEqual(!!v.diagram,!!q.diagram);}
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
 test('教科カード：小4算数（図解100問＋文章題10問）を重複なく集計し最新の正誤を表示する',()=>{
  const s=FF.state.createDefaultState(now);s.learning.questionResults[qs[0].id]=true;s.learning.questionResults[qs[1].id]=false;s.learning.questionResults['gen_math_g4_unused']=true;
  assert.deepStrictEqual(plain(FF.curriculum.progress(bank,s,'math',4)),{total:110+HAND,correct:1,review:1,unanswered:108+HAND,generated:true});
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
  for(const q of qs){const d=q.diagram;if(!d)continue;
   if(d.kind==='fraction')assert.ok(d.d>=2&&d.n>0&&Number.isInteger(d.n)&&Number.isInteger(d.d));
   if(d.kind==='graph')assert.strictEqual(d.values.length,d.labels.length);
   if(d.kind==='abacus')assert.ok(d.digits.every(n=>Number.isInteger(n)&&n>=0&&n<=9));
   if(d.kind==='cutout')assert.ok(d.w>d.cw&&d.h>d.ch);
  }
 });
 test('単元（判断221）：単元を登録した教科・学年の問題は、すべて登録した単元に入っている',()=>{
  const ng=[];
  for(const q of ctx.QUESTION_BANK){if(FF.units.has(q.subject,q.gradeLevel)&&!FF.units.get(q.subject,q.gradeLevel,q.unit))ng.push(q.id+'（'+q.unit+'）');}
  assert.deepStrictEqual(ng,[]);
  for(const subject of Object.keys(FF.units.DEFS))for(const grade of Object.keys(FF.units.DEFS[subject])){
   const ids=FF.units.list(subject,+grade).map(u=>u.id);assert.strictEqual(new Set(ids).size,ids.length,subject+grade);
   for(const u of FF.units.list(subject,+grade))assert.ok(u.id&&u.name&&u.description&&u.icon&&u.color,subject+grade+u.id);
  }
 });
 test('単元（判断221）：図のない問題も、図解の問題と同じ単元・問題マップで出題する',()=>{
  const claude=ctx.QUESTION_BANK.filter(q=>q.subject==='math'&&q.gradeLevel===4&&q.collection!=='frontier100'&&q.collection!=='hand_g4');assert.strictEqual(claude.length,10);
  assert.strictEqual(claude.filter(q=>!q.diagram).length,4);
  for(const q of claude){
   const list=FF.curriculum.pool(bank,{subject:'math',grade:4,unit:q.unit,difficulty:'random',answerType:q.answerType});
   assert.ok(list.some(x=>x.id===q.id),q.id);
  }
  const all=FF.curriculum.pool(bank,{subject:'math',grade:4,unit:'all',difficulty:'random',answerType:'choice'});
  const order=all.map(q=>FF.units.order('math',4,q.unit));assert.ok(order.every((v,i)=>i===0||order[i-1]<=v));
  // 単元を登録した学年は、手作りの問題に、単元ごとの自動生成（判断226）を混ぜる。登録のない学年は従来どおり
  const rngOf=i=>FF.util.makeRng(i+1),ctx2=i=>({now,correctLog:{},recentIds:[],rng:rngOf(i)});
  let gen=0;for(let i=0;i<200;i++){const q=FF.curriculum.pick(bank,{subject:'math',grade:4,unit:'all',difficulty:'random',answerType:'input'},ctx2(i));if(q.generated){gen++;assert.ok(FF.units.get('math',4,q.unit),q.id);}}
  assert.ok(gen>30&&gen<110,'自動生成の割合 '+gen+'/200');
  gen=0;for(let i=0;i<50;i++){const q=FF.curriculum.pick(bank,{subject:'math',grade:3,unit:'all',difficulty:'random',answerType:'input'},ctx2(i));if(/^gen_/.test(q.id))gen++;}
  assert.ok(gen>0);
 });
 test('図（判断221）：種類と必須の項目を検証する',()=>{
  const base={id:'t_diagram',subject:'math',gradeLevel:4,unit:'area',difficulty:'basic',answerType:'input',question:'q',answer:'1',validationMode:'number',hints:['h'],explanation:'e',reviewed:false};
  assert.deepStrictEqual(plain(FF.learning.validateQuestion(base)),[]);
  assert.deepStrictEqual(plain(FF.learning.validateQuestion({...base,diagram:{kind:'rect',w:3,h:2,caption:'c'}})),[]);
  assert.ok(FF.learning.validateQuestion({...base,diagram:{kind:'photo',caption:'c'}}).some(m=>/diagram.kind/.test(m)));
  assert.ok(FF.learning.validateQuestion({...base,diagram:{kind:'rect',w:3,caption:'c'}}).some(m=>/diagram.h/.test(m)));
  assert.ok(FF.learning.validateQuestion({...base,diagram:{kind:'rect',w:3,h:2}}).some(m=>/caption/.test(m)));
 });
 test('単元（判断221）：問題の番号は教科・学年の中の通し番号で、答え方を変えても同じ',()=>{
  assert.strictEqual(FF.curriculum.totalOf(bank,'math',4),110+HAND);
  const nums=new Set();
  for(const q of Object.values(bank.byId).filter(q=>q.subject==='math'&&q.gradeLevel===4)){
   const n=FF.curriculum.numberOf(bank,q);assert.ok(n>=1&&n<=110+HAND,q.id);
   if(q.derivedFrom)assert.strictEqual(n,FF.curriculum.numberOf(bank,bank.byId[q.derivedFrom]));else nums.add(n);
  }
  assert.strictEqual(nums.size,110+HAND);
  assert.strictEqual(FF.curriculum.numberOf(bank,qs[0]),1);
 });
 test('図（判断225）：図解100問のうち、問題文の数字を並べ直すだけの図・合わない絵の図を外した（70問に図、30問は図なし）',()=>{
  const noFig=[1,2,3,4,6,7,8,9,12,15,17,19,20,21,23,24,25,27,29,32,33,34,36,60,73,74,75,76,78,94];
  assert.deepStrictEqual(plain(qs.filter(q=>!q.diagram).map(q=>q.number)),noFig);
  assert.strictEqual(qs.filter(q=>q.diagram).length,70);
  assert.ok(!qs.some(q=>q.diagram&&q.diagram.kind==='cards'),'cards の図は使わない');
  assert.ok(!qs.some(q=>q.diagram&&q.diagram.noArt),'絵なしの札は使わない');
  for(const q of qs.filter(q=>!q.diagram)){assert.ok(q.question&&q.hints.length>=2&&q.choices.length===4,q.id);}
 });
 test('自動生成（判断226）：単元・難易度・形式の指定どおりに出て、元の採点・資源の経路で回答できる',()=>{
  const ctxOf=i=>({now,correctLog:{},recentIds:[],rng:FF.util.makeRng(i+1)});
  // 自動生成のない単元（図形・位置など）は、手作りの問題だけ
  for(let i=0;i<60;i++){const q=FF.curriculum.pick(bank,{subject:'math',grade:4,unit:'quad',difficulty:'random',answerType:'choice'},ctxOf(i));assert.ok(!q.generated&&q.unit==='quad',q.id);}
  // 単元と難易度を決めると、その単元・難易度の問題だけ。手作りの問題がない組み合わせは、すべて自動生成
  let gen=0;
  for(let i=0;i<120;i++){const q=FF.curriculum.pick(bank,{subject:'math',grade:4,unit:'angle',difficulty:'advanced',answerType:'input'},ctxOf(i));assert.strictEqual(q.unit,'angle');assert.strictEqual(q.difficulty,'advanced');assert.strictEqual(q.answerType,'input');if(q.generated)gen++;}
  assert.ok(gen>=40,'angle 発展：自動生成 '+gen+'/120');
  for(let i=0;i<30;i++){const q=FF.curriculum.pick(bank,{subject:'math',grade:4,unit:'position',difficulty:'standard',answerType:'choice'},ctxOf(i));assert.ok(q&&q.unit==='position'&&!q.generated);}
  // 4択の自動生成：正解を含む4つの選択肢
  for(let i=0;i<40;i++){const q=FF.curriculum.pick(bank,{subject:'math',grade:4,unit:'fraction',difficulty:'standard',answerType:'choice'},ctxOf(i));if(q.generated){assert.strictEqual(q.choices.length,4);assert.ok(q.choices.includes(q.answer));assert.strictEqual(q.unit,'fraction');}}
  // 回答：正解で資源と熱量が増え、同じ問題（4択と書きで同じ ID）の記録が questionResults に残る
  let st=FF.state.setPlayerGrade(FF.state.createDefaultState(now),4);
  for(let i=0;i<20;i++){const q=FF.curriculum.pick(bank,{subject:'math',grade:4,unit:'decimal_calc',difficulty:'random',answerType:'input'},ctxOf(i+1000));st.tickets={count:20,lastRecoveredAt:now};
   const r=FF.learning.submitAnswer(st,FF.learning.startAttempt(q),q.answer,{now:now+i*1000,resource:'wood'});assert.strictEqual(r.outcome.status,'correct',q.id);assert.ok(r.outcome.points>0);st=r.state;}
  assert.ok(st.resources.wood>0&&st.studyPoints>0);
 });
 test('自動生成（判断226）：直近に出した問題を避け、同じ問題が続けて出ない',()=>{
  const sel={subject:'math',grade:4,unit:'divide1',difficulty:'standard',answerType:'input'},seen=[];let dup=0;
  for(let i=0;i<60;i++){const q=FF.curriculum.pick(bank,sel,{now,correctLog:{},recentIds:seen.slice(-20),rng:FF.util.makeRng(i*7+3)});if(seen.slice(-10).includes(q.id))dup++;seen.push(q.id);}
  assert.ok(dup<=3,'直近10問の中の重複 '+dup);
 });
 test('手作りの問題（判断227）：位置の表し方は基礎6・標準9・発展7問、直方体と立方体・垂直平行と四角形・折れ線グラフは基礎9・標準15・発展12問、小数のかけ算・わり算は基礎9・標準15・発展12問、分数は基礎10・標準17・発展12問、面積は基礎10・標準15・発展12問、式と計算は基礎10・標準15・発展12問、大きな数・がい数・わり算・小数・角は基礎9・標準15・発展12問、変わり方・倍の見方・整理のしかた・そろばんは基礎6・標準9・発展7問で、すべて reviewed:false',()=>{
  const hand=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_g4');
  assert.ok(hand.every(q=>q.reviewed===REVIEWED_OK.has(q.id)&&q.gradeLevel===4&&q.subject==='math'),'手作りは、レビューでOKだった問題だけ確認済み');
  assert.ok(hand.every(q=>new Set(q.choices).size===q.choices.length&&q.choices.includes(q.answer)),'選択肢');
  const c={};ctx.QUESTION_BANK.filter(q=>q.unit==='position'&&q.gradeLevel===4).forEach(q=>{c[q.difficulty]=(c[q.difficulty]||0)+1;});
  assert.deepStrictEqual(c,{basic:6,standard:9,advanced:7});
  const d={};ctx.QUESTION_BANK.filter(q=>q.unit==='solid').forEach(q=>{d[q.difficulty]=(d[q.difficulty]||0)+1;});
  assert.deepStrictEqual(d,{basic:9,standard:15,advanced:12});
  const e={};ctx.QUESTION_BANK.filter(q=>q.unit==='quad').forEach(q=>{e[q.difficulty]=(e[q.difficulty]||0)+1;});
  assert.deepStrictEqual(e,{basic:9,standard:15,advanced:12});
  const g={};ctx.QUESTION_BANK.filter(q=>q.unit==='graph'&&q.gradeLevel===4).forEach(q=>{g[q.difficulty]=(g[q.difficulty]||0)+1;});
  assert.deepStrictEqual(g,{basic:9,standard:15,advanced:12});
  {const h={};ctx.QUESTION_BANK.filter(q=>q.unit==='decimal_calc').forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});assert.deepStrictEqual(h,{basic:9,standard:15,advanced:12},'decimal_calc');}
  {const h={};ctx.QUESTION_BANK.filter(q=>q.unit==='fraction'&&q.gradeLevel===4).forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});assert.deepStrictEqual(h,{basic:9,standard:15,advanced:12},'fraction');}
  {const h={};ctx.QUESTION_BANK.filter(q=>q.unit==='area'&&q.gradeLevel===4).forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});assert.deepStrictEqual(h,{basic:9,standard:15,advanced:12},'area');}
  {const h={};ctx.QUESTION_BANK.filter(q=>q.unit==='expression').forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});assert.deepStrictEqual(h,{basic:10,standard:15,advanced:12},'expression');}
  for(const u of['large','round','divide1','divide2','decimal','angle']){const h={};ctx.QUESTION_BANK.filter(q=>q.unit===u&&q.gradeLevel===4).forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});for(const [k,n] of Object.entries({basic:9,standard:15,advanced:12}))assert.ok(h[k]>=n,u+' '+k+' '+h[k]);}
  for(const u of['change','ratio']){const h={};ctx.QUESTION_BANK.filter(q=>q.unit===u&&q.gradeLevel===4).forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});for(const [k,n] of Object.entries({basic:6,standard:9,advanced:7}))assert.ok(h[k]>=n,u+' '+k+' '+h[k]);}
  for(const u of['table','abacus']){const h={};ctx.QUESTION_BANK.filter(q=>q.unit===u&&q.gradeLevel===4).forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});assert.deepStrictEqual(h,{basic:6,standard:9,advanced:7},u);}
 });
 test('手作りの問題（判断244）：小5算数の面積・体積・図形の角は基礎9・標準15・発展12問、合同な図形・比例・帯グラフと円グラフ・正多角形と円・角柱と円柱は基礎6・標準9・発展7問（原作の問題を合わせて）、手作りはすべて reviewed:false',()=>{
  const hand=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_g5');
  assert.ok(hand.length>=460);
  assert.ok(hand.every(q=>q.reviewed===false&&q.gradeLevel===5&&q.subject==='math'),'手作りは reviewed:false');
  assert.ok(hand.every(q=>new Set(q.choices).size===q.choices.length&&q.choices.includes(q.answer)),'選択肢');
  const want={area:{basic:9,standard:15,advanced:12},volume:{basic:9,standard:15,advanced:12},angle:{basic:9,standard:15,advanced:12},congruent:{basic:6,standard:9,advanced:7},proportion:{basic:6,standard:9,advanced:7},graph:{basic:6,standard:9,advanced:7},circle:{basic:6,standard:9,advanced:7},prism:{basic:6,standard:9,advanced:7},decmul:{basic:9,standard:15,advanced:12},decdiv:{basic:9,standard:15,advanced:12},fraction:{basic:9,standard:15,advanced:12},intdec:{basic:6,standard:9,advanced:7},multiple:{basic:6,standard:9,advanced:7},fracrel:{basic:6,standard:9,advanced:7},average:{basic:6,standard:9,advanced:7},unit:{basic:6,standard:9,advanced:7},speed:{basic:6,standard:9,advanced:7},percent:{basic:6,standard:9,advanced:7}};
  for(const u of Object.keys(want)){const h={};ctx.QUESTION_BANK.filter(q=>q.unit===u&&q.gradeLevel===5&&q.subject==='math').forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});for(const [k,n] of Object.entries(want[u]))assert.ok(h[k]>=n,u+' '+k+' '+h[k]);}
 });
 test('手作りの問題（判断249）：小4理科の10単元は、すべて基礎9・標準15・発展12問（原作の問題を合わせて）、手作りはすべて reviewed:false',()=>{
  const hand=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_sci4');
  assert.ok(hand.length>=330);
  assert.ok(hand.every(q=>q.reviewed===false&&q.gradeLevel===4&&q.subject==='science'),'手作りは reviewed:false');
  assert.ok(hand.every(q=>q.choices.length===4&&new Set(q.choices).size===4&&q.choices.includes(q.answer)),'選択肢');
  for(const u of['season','weather','rain','water','air','heat','electric','body','moon','star']){const h={};ctx.QUESTION_BANK.filter(q=>q.unit===u&&q.gradeLevel===4&&q.subject==='science').forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});for(const [k,n] of Object.entries({basic:9,standard:15,advanced:12}))assert.ok(h[k]>=n,u+' '+k+' '+h[k]);}
  const units=new Set(FF.units.list('science',4).map(x=>x.id));assert.strictEqual(units.size,10);
  assert.ok(ctx.QUESTION_BANK.filter(q=>q.subject==='science'&&q.gradeLevel===4).every(q=>units.has(q.unit)),'小4理科の問題の単元は、登録した単元');
 });
 test('手作りの問題（判断252）：小4社会の9単元は、すべて基礎9・標準15・発展12問（原作の問題を合わせて）、手作りはすべて reviewed:false',()=>{
  const hand=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc4');
  assert.ok(hand.length>=290);
  assert.ok(hand.every(q=>q.reviewed===false&&q.gradeLevel===4&&q.subject==='social'),'手作りは reviewed:false');
  assert.ok(hand.every(q=>q.choices.length===4&&new Set(q.choices).size===4&&q.choices.includes(q.answer)),'選択肢');
  for(const u of['prefecture','geography','water','garbage','electric','disaster','tradition','pioneer','industry']){const h={};ctx.QUESTION_BANK.filter(q=>q.unit===u&&q.gradeLevel===4&&q.subject==='social').forEach(q=>{h[q.difficulty]=(h[q.difficulty]||0)+1;});for(const [k,n] of Object.entries({basic:9,standard:15,advanced:12}))assert.ok(h[k]>=n,u+' '+k+' '+h[k]);}
  const units=new Set(FF.units.list('social',4).map(x=>x.id));assert.strictEqual(units.size,9);
  assert.ok(ctx.QUESTION_BANK.filter(q=>q.subject==='social'&&q.gradeLevel===4).every(q=>units.has(q.unit)),'小4社会の問題の単元は、登録した単元');
 });
};
