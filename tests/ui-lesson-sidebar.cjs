const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage();await p.goto((process.env.FF_TEST_ORIGIN||'http://127.0.0.1:8775')+'/');await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.ui.show('study',{tab:'learn'});});await p.locator('.subject-math').click();
 for(const [width,height] of [[1202,884],[1202,1100],[768,1024],[1024,700],[1202,884]]){
  await p.setViewportSize({width,height});await p.waitForTimeout(150);
  const left=await p.locator('.lesson-left').boundingBox(),units=await p.locator('.unit-list').boundingBox(),map=await p.locator('.question-index').boundingBox();
  assert.ok(Math.abs(left.y+left.height-(height-16))<2,'sidebar fits viewport');assert.ok(units.height>60);assert.ok(map.y+map.height<=height-16);
  assert.equal(await p.locator('.index-grid').evaluate(e=>getComputedStyle(e).maxHeight),'100px');
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  if(width===1202&&height===1100)assert.ok(units.height>290,'extra room goes to units');
 }
 await p.locator('.unit-list').evaluate(e=>{e.scrollTop=e.scrollHeight});await p.locator('.unit-list .unit-row').last().click();assert.ok(await p.locator('.question-card').count());
 await p.setViewportSize({width:390,height:844});assert.equal(await p.locator('.lesson-left').isVisible(),false);
 console.log('PASS: sidebar fits 5 viewport sizes, map fixed, units expand/scroll/select, mobile unchanged');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
