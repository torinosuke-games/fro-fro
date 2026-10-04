// スマホ（判断224）：答えを選んだら、スクロールせずに「答え合わせ」を押せる。答え合わせのあとも「次の問題」が画面の下に残る。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH}),errors=[];
 for(const [w,h] of [[360,740],[390,780],[432,860]]){
  const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,isMobile:true,hasTouch:true}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(process.env.FF_TEST_URL||'http://127.0.0.1:8765/');await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
  await p.getByRole('button',{name:'学習する →',exact:true}).click();await p.locator('.subject-math').click();
  // 図のある問題（高さがいちばん大きくなる）を出す
  await p.evaluate(()=>{const s=FF.app.session,q=FF.app.bank.byId['math_g4_area_001'];s.sel.answerType='choice';s.items[q.id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};s.currentId=q.id;FF.ui.rerender();window.scrollTo(0,0);});
  const m=await p.evaluate(()=>({mast:document.querySelector('.masthead').getBoundingClientRect().height,head:document.querySelector('.lesson-heading').getBoundingClientRect().height,hudTop:getComputedStyle(document.querySelector('#hud')).top}));
  assert.ok(m.mast<=48.5,'masthead '+m.mast+' '+w);assert.ok(m.head<=46,'lesson heading is one row '+m.head+' '+w);assert.equal(m.hudTop,'-48px');
  await p.locator('.answer-option').first().click({force:true});
  await p.evaluate(()=>window.scrollTo(0,0));
  const fits=await p.evaluate(()=>{const r=document.querySelector('.check-answer').getBoundingClientRect();return r.bottom<=innerHeight+1&&r.top>=0;});
  assert.ok(fits,'check button visible without scrolling '+w);
  await p.locator('.check-answer').click({force:true});await p.waitForTimeout(700);await p.evaluate(()=>window.scrollTo(0,0));
  const next=await p.evaluate(()=>{const r=document.querySelector('.lesson-actions').getBoundingClientRect();return r.bottom<=innerHeight+1&&r.top>=0;});
  assert.ok(next,'next button visible without scrolling '+w);
  assert.equal(await p.evaluate(()=>getComputedStyle(document.querySelector('.hint-card')).display),'none','hint card is hidden after checking on phones '+w);   // 判断240
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+w);
  await ctx.close();
 }
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: compact bands, check and next buttons stay in view on phone widths');
})().catch(e=>{console.error(e);process.exit(1)});
