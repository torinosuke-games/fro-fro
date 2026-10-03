// Optional browser QA. npm package playwright + a Chromium browser are required.
// FF_PLAYWRIGHT_MODULE / FF_BROWSER_PATH can point to an existing installation.
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const out=process.env.FF_QA_OUTPUT||path.resolve(__dirname,'../../..','work','browser-qa');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.FF_TEST_URL||'http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
 for(const width of [360,390,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1000});
  const layout=await page.locator('#screen').evaluate(el=>{const r=el.getBoundingClientRect();return {width:r.width,left:r.left,right:innerWidth-r.right,overflow:document.documentElement.scrollWidth>innerWidth+1};});
  assert.ok(layout.width<=640,'Onboarding stays within a compact frame');
  assert.ok(Math.abs(layout.left-layout.right)<=1,'Onboarding is centered');
  assert.equal(layout.overflow,false,'Onboarding fits '+width);
  assert.ok(await page.locator('.opening').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=17,'Readable onboarding text');
  if(width===390||width===1440)await page.screenshot({path:path.join(out,'title-'+width+'.png'),fullPage:true});
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('.title-card input').fill('ゆき');await page.locator('.title-card .btn.primary').click();
 await page.getByRole('button',{name:'小学4年',exact:true}).click();
 await page.locator('.avatar-pick').first().click();await page.locator('.intro-line + button').click();
 assert.equal(await page.locator('body').getAttribute('data-screen'),'base');
 await page.screenshot({path:path.join(out,'home.png'),fullPage:true});
 // Collection keeps the original near-full gold glow and flies to the renewed HUD.
 await page.evaluate(()=>{let s=FF.util.clone(FF.app.state);s.buildings.lumber.lastCollectedAt=FF.app.now()-4*3600000;FF.app.commit(s);FF.ui.rerender();});
 const harvest=page.getByRole('button',{name:'木材を受け取る',exact:true});
 assert.ok(await harvest.evaluate(el=>el.classList.contains('full')),'Original gold storage indicator');
 assert.equal(await harvest.evaluate(el=>getComputedStyle(el).animationName),'bubble-hop');
 const harvestBefore=await page.evaluate(()=>FF.app.state.resources.wood);
 await page.screenshot({path:path.join(out,'harvest-ready.png'),fullPage:true});
 await harvest.click();
 assert.ok(await page.locator('.fly-res').count()>0,'Harvest flies to resource illustration');
 assert.ok(await page.evaluate(()=>FF.app.state.resources.wood)>harvestBefore);
 await page.waitForTimeout(950);
 assert.ok(await page.locator('#hud [data-resource="wood"]').evaluate(el=>el.classList.contains('got')),'Current HUD flashes at arrival');
 await page.waitForTimeout(400);assert.equal(await page.locator('.fly-res').count(),0);
 assert.equal(await page.locator('.ticket-illustration').count(),1);
 assert.equal(await page.locator('#nav .nav-illustration').count(),5);
 assert.ok(!(await page.locator('.greeting').innerText()).includes('ゆき'),'Greeting does not address self');
 await page.getByRole('button',{name:'学習する →',exact:true}).click();
 assert.equal(await page.locator('.subject-card').count(),5);
 await page.screenshot({path:path.join(out,'subjects.png'),fullPage:true});
 const avatarPosition=await page.locator('.subject-avatar').evaluate(el=>{const a=el.getBoundingClientRect(),b=el.parentNode.getBoundingClientRect();return Math.abs((a.top+a.bottom)/2-(b.top+b.bottom)/2);});
 assert.ok(avatarPosition<1,'Avatar is vertically centered');
 await page.locator('.subject-math').click();
 const index=n=>page.locator('.index-item').filter({hasText:new RegExp('^'+n+'$')});
 await index(22).click();
 // Wide desktop windows keep the lesson centered instead of stretching the question.
 for(const width of [1280,1440,1920,2560]){
  await page.setViewportSize({width,height:1000});
  const layout=await page.locator('#screen').evaluate(el=>{const r=el.getBoundingClientRect();return {width:r.width,left:r.left,right:innerWidth-r.right,overflow:document.documentElement.scrollWidth>innerWidth+1};});
  assert.ok(layout.width<=1280,'Desktop lesson has a maximum width');
  assert.ok(Math.abs(layout.left-layout.right)<=1,'Desktop lesson is centered');
  assert.equal(layout.overflow,false);
  assert.ok(await page.locator('.index-grid').evaluate(el=>el.scrollWidth<=el.clientWidth+1),'Question numbers fit the sidebar');
 }
 await page.screenshot({path:path.join(out,'desktop-wide.png'),fullPage:true});
 await page.setViewportSize({width:1440,height:1000});
 assert.equal(await page.locator('.explanation-text').count(),0,'No answer before submitting');
 await page.screenshot({path:path.join(out,'tablet-before.png'),fullPage:true});
 const before=await page.evaluate(()=>{const resource=FF.app.session.items[FF.app.session.currentId].resource;return {resource,amount:FF.app.state.resources[resource],points:FF.app.state.studyPoints,tickets:FF.app.state.tickets.count,id:FF.app.session.currentId};});
 await page.getByRole('button',{name:/ヒントを見る/}).click();
 assert.equal(await page.locator('.hint-step').count(),1);
 const right=await page.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.answer);
 await page.locator('.answer-option').filter({hasText:right}).click();
 assert.equal(await page.evaluate(()=>FF.app.state.studyPoints),before.points,'Selection alone does not submit');
 await page.getByRole('button',{name:'答え合わせ',exact:true}).click();
 assert.equal(await page.locator('.reward-flight').count(),2,'Material and heat fly from the reward');
 assert.equal(await page.locator('#hud [data-resource="'+before.resource+'"] .resource-value').innerText(),String(before.amount),'Counter waits for arrival');
 await page.waitForTimeout(1000);
 assert.ok(await page.locator('.count-up').count()>0,'Counter animates after arrival');
 const after=await page.evaluate(resource=>({amount:FF.app.state.resources[resource],points:FF.app.state.studyPoints,tickets:FF.app.state.tickets.count}),before.resource);
 assert.ok(after.amount>before.amount);assert.ok(after.points>before.points);assert.equal(after.tickets,before.tickets-1);
 assert.equal(await page.locator('.explanation-text').count(),1);
 await page.waitForTimeout(750);await page.screenshot({path:path.join(out,'tablet-after.png'),fullPage:true});
 await index(1).click();await index(22).click();assert.equal(await page.evaluate(()=>FF.app.state.studyPoints),after.points);
 assert.equal(await page.locator('.check-answer').count(),1,'Revisiting creates a fresh attempt');
 assert.equal(await page.locator('.explanation-text').count(),0);
 assert.ok(await index(22).evaluate(el=>el.classList.contains('solved')),'Latest result survives a fresh attempt');
 await index(2).click();
 const wrong=await page.evaluate(()=>{let q=FF.app.session.items[FF.app.session.currentId].attempt.question;return q.choices.find(x=>x!==q.answer);});
 await page.locator('.answer-option').filter({hasText:new RegExp('^.'+wrong+'$')}).click();
 await page.getByRole('button',{name:'答え合わせ',exact:true}).click();assert.equal(await page.evaluate(()=>FF.app.state.studyPoints),after.points);
 // Check every question diagram and figure at two device sizes. No crop, no missing asset.
 const diagramResults=[];
 for(const width of [1024,390]){
  await page.setViewportSize({width,height:900});
  const result=await page.evaluate(async()=>{
   const list=QUESTION_BANK.filter(q=>q.collection==='frontier100'),issues=[];
   let gallery=document.createElement('div');gallery.id='qa-gallery';gallery.style.cssText='position:relative;background:#f1f7fb;padding:15px;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:15px';
   list.forEach(q=>{let card=FF.ui.el('section',{style:{background:'#fff',padding:'10px',borderRadius:'12px'}},[FF.ui.el('h3',{style:{fontSize:'13px'},text:q.number+' '+q.unit}),FF.lessonFigure.render(q.diagram)]);gallery.appendChild(card);});
   document.getElementById('screen').appendChild(gallery);
   await Promise.all([...gallery.querySelectorAll('img')].map(img=>img.decode().catch(()=>issues.push('missing '+img.src))));
   for(const svg of gallery.querySelectorAll('svg')){const vb=svg.viewBox.baseVal;for(const t of svg.querySelectorAll('text')){const b=t.getBBox();if(b.x<-.5||b.y<-.5||b.x+b.width>vb.width+.5||b.y+b.height>vb.height+.5)issues.push('clipped '+t.textContent);}}
   const overflow=document.documentElement.scrollWidth>innerWidth+1;gallery.remove();return {issues,overflow};
  });diagramResults.push({width,...result});assert.deepEqual(result.issues,[]);assert.equal(result.overflow,false);
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));
 assert.equal(await page.locator('.lesson-left').isVisible(),false);
 await page.getByRole('button',{name:'☷ 単元・難易度',exact:true}).click();
 assert.equal(await page.locator('body').getAttribute('data-screen'),'lessonFilters');
 await page.getByLabel('単元を選ぶ',{exact:true}).selectOption('area');await page.getByLabel('難易度',{exact:true}).selectOption('basic');
 await page.screenshot({path:path.join(out,'phone-filters.png'),fullPage:true});
 await page.getByRole('button',{name:'この条件で学習する',exact:true}).click();
 assert.equal(await page.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.unit),'area');
 await page.screenshot({path:path.join(out,'phone-question.png'),fullPage:true});
 // Filter cancel keeps same question and selected answer.
 let qid=await page.evaluate(()=>FF.app.session.currentId);
 await page.getByRole('button',{name:'☷ 単元・難易度',exact:true}).click();await page.getByLabel('単元を選ぶ',{exact:true}).selectOption('angle');
 await page.getByRole('button',{name:'‹ 問題にもどる',exact:true}).click();assert.equal(await page.evaluate(()=>FF.app.session.currentId),qid);
 // Free input: retry, hints preserve typed text, success without choice ticket.
 await page.getByRole('button',{name:'☷ 単元・難易度',exact:true}).click();
 await page.getByLabel('答え方',{exact:true}).selectOption('input');await page.getByRole('button',{name:'この条件で学習する',exact:true}).click();
 const inputBefore=await page.evaluate(()=>FF.app.state.tickets.count);
 await page.getByRole('textbox',{name:'答えを入力'}).fill('999');await page.getByRole('button',{name:'答え合わせ',exact:true}).click();assert.equal(await page.locator('.answer-feedback.retry').count(),1);
 let answer=await page.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.answer);
 await page.getByRole('textbox',{name:'答えを入力'}).fill(answer);await page.getByRole('button',{name:/ヒントを見る/}).click();assert.equal(await page.getByRole('textbox',{name:'答えを入力'}).inputValue(),answer);
 await page.getByRole('button',{name:'答え合わせ',exact:true}).click();assert.equal(await page.locator('.answer-feedback.good').count(),1);assert.equal(await page.evaluate(()=>FF.app.state.tickets.count),inputBefore);
 // Save round trip, distinct original key, grade and real earned amount survive.
 const saved=await page.evaluate(()=>({points:FF.app.state.studyPoints,resources:FF.app.state.resources}));
 await page.reload({waitUntil:'domcontentloaded'});assert.equal(await page.evaluate(()=>FF.app.state.player.grade),4);assert.deepEqual(await page.evaluate(()=>({points:FF.app.state.studyPoints,resources:FF.app.state.resources})),saved);assert.equal(await page.evaluate(()=>localStorage.getItem('frozenFrontier.save')),null);
 // All subjects start at selected grade. This runs at mobile width through real controls.
 for(const subject of ['japanese','science','social','english']){
  await page.getByRole('button',{name:'学習する →',exact:true}).click();await page.locator('.subject-'+subject).click();
  assert.equal(await page.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.gradeLevel),4);
  await page.getByRole('button',{name:'Frozen Frontier',exact:true}).click();
 }
 // Persisted points feed the original redeem view; sufficient test balance allows issuance.
 await page.evaluate(()=>{let s=FF.util.clone(FF.app.state);s.studyPoints=900;s.studyPointsEarnedTotal=900;FF.app.commit(s);FF.ui.openRedeem();});
 await page.screenshot({path:path.join(out,'phone-tickets.png'),fullPage:true});
 await page.locator('.preset').first().click();await page.locator('.overlay .actions .primary').click();
 assert.equal(await page.evaluate(()=>FF.app.state.redeemHistory.length),1);assert.equal(await page.evaluate(()=>FF.app.state.studyPoints),150);
 // Responsive navigation/settings/home remain within the viewport.
 for(const width of [360,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});for(const screen of ['base','study','settings','redeem','records','exploration']){await page.evaluate(x=>FF.ui.show(x,{tab:'learn'}),screen);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),screen+' overflow '+width);
   if(screen==='study')assert.ok(await page.locator('.subject-avatar').evaluate(el=>{const a=el.getBoundingClientRect(),b=el.parentNode.getBoundingClientRect();return Math.abs((a.top+a.bottom)/2-(b.top+b.bottom)/2)<1;}),'Avatar centered '+width);
   if(screen==='settings')assert.ok(await page.locator('.grade-chip').first().evaluate(el=>{const a=el.getBoundingClientRect(),b=el.querySelector('.title').getBoundingClientRect();return Math.abs((a.top+a.bottom)/2-(b.top+b.bottom)/2)<1;}),'Grade is centered '+width);
  }
 }
 await page.evaluate(()=>{FF.app.leaveGuard=null;const q=QUESTION_BANK.find(q=>q.collection==='frontier100'&&q.unit==='table');FF.ui.show('exam',{mode:'exam',exam:{subject:'math',grade:4,items:[{question:q,choices:q.choices}],results:[]}});});
 assert.equal(await page.locator('.lesson-figure').count(),1,'Exam also renders newly added diagrams');
 assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',browserErrors:errors,diagramResults,checks:'onboarding, grade, all subjects, answer reveal, counters, repeat/reward safety, wrong answer, mobile filters, input retry, save/reload, ticket redemption, exam diagrams, 5 viewport sizes'},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;process.exit(1);});

