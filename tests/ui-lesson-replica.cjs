const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const out='/workspace/lesson-replica-qa';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:1536,height:1080}}),errors=[];p.on('pageerror',e=>errors.push(e.stack));
 await p.goto('http://127.0.0.1:8775/codex-prototypes/homepage/');await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),4);FF.app.state.player.avatar='e1';FF.ui.show('study',{tab:'learn'});});await p.locator('.subject-math').click();
 const pick=async()=>{const i=await p.evaluate(()=>{const pool=FF.curriculum.pool(FF.app.bank,FF.app.session.sel);let i=pool.findIndex(q=>q.collection==='frontier100'&&q.diagram);return i<0?pool.findIndex(q=>q.diagram):i;});assert.ok(i>=0);await p.locator('.index-item').nth(i).click();};await pick();
 await p.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
 for(const width of [390,768,1024,1536,1920]){
  await p.setViewportSize({width,height:1080});await p.waitForTimeout(100);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'no overflow '+width);
  assert.equal(await p.locator('.replica-question-info').count(),1);assert.equal(await p.locator('.explanation-text').count(),0);
  assert.ok((await p.locator('.brand').innerText()).includes('Frozen Frontier'));assert.ok((await p.locator('.brand').innerText()).includes('君の学びの熱量で'));
  const card=await p.locator('.question-card').boundingBox(),help=await p.locator('.lesson-help').boundingBox();
  if(width>=1000){const left=await p.locator('.lesson-left').boundingBox();assert.ok(left.x+left.width<card.x+1);assert.ok(card.x+card.width<help.x+1);}
  if(width===768){const left=await p.locator('.lesson-left').boundingBox();assert.ok(left.x+left.width<card.x+1);}
  assert.ok(await p.locator('.lesson-figure').count(),'diagram retained');const svg=p.locator('.lesson-figure svg').first();if(await svg.count()){const fit=await svg.boundingBox();assert.ok(fit.width<=card.width,'diagram fits');}
  await p.screenshot({path:out+'/lesson-'+width+'.png',fullPage:true});
 }
 await p.setViewportSize({width:1536,height:1080});
 const before=await p.evaluate(()=>({tickets:FF.app.state.tickets.count,id:FF.app.session.currentId}));
 await p.getByRole('button',{name:/ヒントを見る/}).click();assert.equal(await p.locator('.hint-step').count(),1);assert.equal(await p.evaluate(()=>FF.app.state.tickets.count),before.tickets);assert.equal(await p.locator('.explanation-text').count(),0);
 const answer=await p.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.answer);
 const choice=await p.locator('.answer-option').evaluateAll((els,a)=>els.findIndex(el=>el.querySelector('.option-text').textContent===a),answer);assert.ok(choice>=0);await p.locator('.answer-option').nth(choice).click();
 assert.equal(await p.locator('.explanation-text').count(),1);assert.equal(await p.evaluate(()=>FF.app.state.tickets.count),before.tickets-1);assert.equal(await p.locator('.answer-option:enabled').count(),0);
 await p.waitForTimeout(1200);await p.screenshot({path:out+'/answered.png',fullPage:true});
 await p.locator('.lesson-actions .primary').click();assert.equal(await p.locator('.explanation-text').count(),0);
 // 一覧・単元・条件の既存イベントが再配置後も機能する。
 await pick();assert.equal(await p.evaluate(()=>FF.app.session.currentId),before.id);
 await p.locator('.side-settings select').first().selectOption('basic');assert.equal(await p.evaluate(()=>FF.app.session.sel.difficulty),'basic');
 await p.locator('.side-settings select').nth(1).selectOption('input');assert.equal(await p.evaluate(()=>FF.app.session.sel.answerType),'input');assert.ok(await p.locator('.lesson-answers input,.hw').count());
 await p.setViewportSize({width:768,height:1080});await p.screenshot({path:out+'/input-tablet.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: 5 widths, 3/2/1-column layouts, unchanged title, diagram fit, hint gating, answer/ticket grading, next/index/filters/input');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
