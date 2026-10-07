// Exercise native quiz dialogs and the actual browser damage animation.
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-feedback-qa';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium'});
 try {
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//,r=>r.abort());
  await page.goto(process.env.FF_TEST_URL||'http://127.0.0.1:8768/preview/',{waitUntil:'domcontentloaded'});
  await page.locator('.title-card input').fill('ゆき');await page.locator('.title-card .btn.primary').click();
  await page.getByRole('button',{name:'小学4年',exact:true}).click();await page.locator('.avatar-pick').first().click();await page.locator('.intro-line + button').click();
  await page.getByRole('button',{name:'雪原へ出発',exact:true}).click();await page.locator('.adv-tile[data-x="3"][data-y="6"]').click();await page.waitForFunction(()=>!!FF.app.state.adventure.battle);
  await page.getByRole('button',{name:'クイズで行動する',exact:true}).click();await page.locator('.adv-quiz-dialog[open]').waitFor();
  // Escape closes only the window. Reopening preserves the same question and state.
  const before=await page.evaluate(()=>JSON.stringify(FF.app.state.adventure));await page.keyboard.press('Escape');assert.equal(await page.locator('.adv-quiz-dialog').evaluate(d=>d.open),false);
  await page.locator('.adv-open-quiz').click();assert.equal(await page.evaluate(()=>JSON.stringify(FF.app.state.adventure)),before);
  await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>!!document.activeElement.closest('.adv-quiz-dialog')));
  const b=await page.evaluate(()=>FF.app.state.adventure.battle);
  await page.locator('.adv-answer').nth(b.choices.indexOf(b.question.answer)).click();
  const animation=await page.locator('.adv-enemy-art').evaluate(el=>{
   const a=el.getAnimations().find(a=>a.animationName==='adv-hit');
   if(!a)return null;return {duration:a.effect.getTiming().duration,zeroes:a.effect.getKeyframes().filter(k=>Number(k.opacity)===0).length,damage:Number(el.dataset.damage),running:a.playState};
  });
  assert.ok(animation);assert.equal(animation.zeroes,2);assert.ok(animation.duration<=500);assert.equal(animation.running,'running');
  assert.equal(animation.damage,b.hp-(await page.evaluate(()=>FF.app.state.adventure.battle.hp)));
  assert.equal(await page.locator('.adv-quiz-dialog').evaluate(d=>d.open),false,'Damage is visible before the result window');
  // A background save (e.g. completed construction) must not cancel the result opening.
  await page.evaluate(()=>FF.app.commit(FF.util.clone(FF.app.state)));
  await page.locator('.adv-feedback').waitFor({state:'visible'});await page.screenshot({path:out+'/result-phone.png',fullPage:true});
  // Long questions and real diagrams remain readable inside the dialog; controls stay on-screen.
  await page.getByRole('button',{name:'敵の攻撃にそなえる',exact:true}).click();await page.locator('.adv-quiz-dialog[open]').waitFor();
  await page.evaluate(()=>{
   const p=FF.util.clone(FF.app.state.adventure);
   const q=Object.values(FF.app.bank.byId).find(q=>q.subject==='math'&&q.gradeLevel===4&&q.answerType==='choice'&&q.diagram);
   p.battle.question=FF.util.clone(q);p.battle.question.question=Array(10).fill(q.question).join('\n');p.battle.choices=q.choices.slice();p.battle.hints=0;
   FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));FF.ui.rerender();
  });
  for(const [width,height] of [[360,640],[390,844],[768,900],[1440,1000]]){
   await page.setViewportSize({width,height});await page.locator('.adv-quiz-dialog[open]').waitFor();
   const layout=await page.evaluate(()=>{
    const d=document.querySelector('.adv-quiz-dialog'),s=d.querySelector('.adv-question-scroll'),c=d.querySelector('.adv-choices'),r=d.getBoundingClientRect(),a=c.getBoundingClientRect();
    return {top:r.top,bottom:r.bottom,controls:a.bottom,overflow:s.scrollHeight>s.clientHeight,pageScroll:scrollY,horizontal:document.documentElement.scrollWidth>innerWidth};
   });
   assert.ok(layout.top>=0&&layout.bottom<=height&&layout.controls<=height&&layout.overflow);assert.equal(layout.pageScroll,0);assert.equal(layout.horizontal,false);
   if(width===360)await page.screenshot({path:out+'/long-diagram-phone.png',fullPage:true});
  }
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>{let p=FF.util.clone(FF.app.state.adventure);p.battle.phase='attack';p.battle.hp=95;p.battle.log=[];FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));FF.ui.rerender();});
  await page.locator('.adv-quiz-dialog[open]').waitFor();
  const index=await page.evaluate(()=>FF.app.state.adventure.battle.choices.indexOf(FF.app.state.adventure.battle.question.answer));await page.locator('.adv-answer').nth(index).click();
  await page.locator('.adv-feedback').waitFor({state:'visible'});
  assert.equal(await page.locator('.adv-enemy-art').evaluate(el=>getComputedStyle(el).animationName),'none');
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',checks:'two rapid blinks, real damage, result delay, focus and Escape, long text with diagrams at four viewport sizes, reduced motion',animation,screenshots:out},null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
