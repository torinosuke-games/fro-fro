// 答えの閲覧で採点・報酬・チケット消費を起こさず、次問は通常出題へ戻る。
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage();await p.goto((process.env.FF_TEST_ORIGIN||'http://127.0.0.1:8775')+'/');
 for(const width of [390,768,1202]){
  await p.setViewportSize({width,height:884});
  await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.ui.show('study',{tab:'learn'});});await p.locator('.subject-math').click();
  for(const mode of ['choice','input']){
   if(mode==='input'){await p.setViewportSize({width:1202,height:884});await p.locator('.side-settings select').nth(1).selectOption('input');await p.setViewportSize({width,height:884});}
   const before=await p.evaluate(()=>JSON.stringify(FF.app.state));
   await p.locator('.replica-reveal-answer').click();
   assert.equal(await p.evaluate(()=>JSON.stringify(FF.app.state)),before,'viewing does not change saved state');
   assert.equal(await p.locator('.explanation-text').count(),1);assert.equal(await p.locator('.hint-card').count(),0);
   assert.equal(await p.locator('.replica-answer-viewed').count(),1);assert.equal(await p.locator('.reward-gains').count(),0);
   assert.equal(await p.locator('.answer-option:enabled,.renewal-input:enabled').count(),0);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await p.locator('.lesson-actions .primary').click();
   assert.equal(await p.locator('.replica-reveal-answer').count(),1);assert.equal(await p.locator('.explanation-text').count(),0);
  }
 }
 console.log('PASS: reveal on choice/input at 3 widths; saved state unchanged; locked answers; next question restored');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
