// デバッグモードの学習画面（リニューアル）にも、問題のレビュー（判断202）が出る。通常のモードでは出ない。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH}),errors=[];
 async function start(url){
  const ctx=await b.newContext({viewport:{width:390,height:780},isMobile:true,hasTouch:true}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(url);await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
  await p.getByRole('button',{name:'学習する →',exact:true}).click();await p.locator('.subject-math').click();await p.waitForTimeout(300);
  return {ctx,p};
 }
 const base=process.env.FF_TEST_URL||'http://127.0.0.1:8765/';
 let t=await start(base);assert.equal(await t.p.locator('.review-panel').count(),0,'normal mode has no review panel');await t.ctx.close();
 t=await start(base+'?debug=1');const p=t.p;
 assert.equal(await p.locator('.review-panel').count(),1,'debug mode shows review panel');
 const qid=await p.evaluate(()=>FF.app.session.currentId);
 await p.locator('.review-note').fill('テストのメモ');await p.getByRole('button',{name:'🛠 要改善'}).click();await p.waitForTimeout(200);
 const rec=await p.evaluate(id=>FF.storage.loadReviews()[id],qid);
 assert.ok(rec&&rec.status==='fix'&&rec.note==='テストのメモ','review stored '+JSON.stringify(rec));
 // 「確認前だけ」＋「レビュー済みを出さない」を入れても、レビュー済みの問題は出ない
 await p.evaluate(()=>{FF.ui.review.setOnlyUnreviewed(true);FF.ui.review.setHideReviewed(true);});
 const seen=[];for(let i=0;i<12;i++){await p.getByRole('button',{name:/あとで考える/}).click();await p.waitForTimeout(80);seen.push(await p.evaluate(()=>FF.app.session.currentId));}
 assert.ok(!seen.includes(qid),'a reviewed question is not offered again');
 assert.ok(await p.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.reviewed!==true),'only unreviewed questions');
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no overflow');
 await t.ctx.close();
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: review panel appears only in debug mode on the study screen and records are saved');
})().catch(e=>{console.error(e);process.exit(1)});
