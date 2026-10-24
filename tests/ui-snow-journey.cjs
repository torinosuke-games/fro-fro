// 探索プレビューの経路、実操作、洞窟遷移、保存領域を検証する。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const origin=process.env.FF_TEST_ORIGIN||'http://127.0.0.1:8775';
const out=process.env.FF_QA_OUTPUT||'/workspace/snow-journey-qa';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[];
 async function boot(page){page.on('pageerror',e=>errors.push(e.stack));await page.goto(origin+'/codex-prototypes/homepage/');await page.evaluate(()=>{
   FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.avatar='e1';
   localStorage.setItem('frozenFrontier.save','unchanged-public-save');FF.ui.show('adventure');
 });await page.locator('.journey-viewport canvas').waitFor();await page.waitForTimeout(300);}
 const state=page=>page.evaluate(()=>FF.snowJourney.read());
 async function arrive(page,id,title){if(!(await page.locator('.journey-guide').isVisible()))await page.getByRole('button',{name:'旅のしおり',exact:true}).click();await page.locator('[data-destination="'+id+'"]').click();if(id==='cave'){await page.waitForFunction(()=>FF.snowJourney.read().region==='cave');assert.equal(await page.locator('.overlay').count(),0);}else await page.locator('.modal h2').filter({hasText:title}).waitFor({timeout:20000});}
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await boot(page);
  const game=await page.evaluate(()=>JSON.stringify(FF.app.state));
  const checks=await page.evaluate(()=>{const M=FF.snowJourney;return {
   size:[M.grid[0].length,M.grid.length],routes:M.places.slice(1).map(p=>M.path('field',{x:4,y:24},p)),
   safe:M.path('field',{x:4,y:24},M.places.find(p=>p.id==='town')).every(p=>['r','='].includes(M.grid[p.y][p.x])),
   blocked:M.path('field',{x:4,y:24},{x:0,y:0}).length,
   cave:M.path('cave',{x:2,y:8},{x:8,y:2})};});
  assert.deepEqual(checks.size,[40,30]);assert.ok(checks.routes.every(r=>r.length));assert.ok(checks.safe,'town route should stay on the safe road');assert.equal(checks.blocked,0);assert.ok(checks.cave.length);
  for(const width of [360,390,768,1440]){await page.setViewportSize({width,height:width<760?844:1000});await page.waitForTimeout(150);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const frame=await page.locator('.journey-viewport').boundingBox(),layout=await page.locator('.journey-layout').boundingBox();assert.ok(frame.height>=330);assert.ok(Math.abs(frame.width-layout.width)<2);assert.equal(await page.locator('.journey-guide').isVisible(),false);assert.equal(await page.locator('.journey-heading h1').count(),0);
    await page.locator('.journey-shell').screenshot({path:path.join(out,'field-'+width+'.png'),animations:'disabled'});
  }
  await page.getByRole('button',{name:'全体マップ',exact:true}).click();await page.locator('.journey-shell').screenshot({path:path.join(out,'world-map.png')});
  await page.getByRole('button',{name:'冒険に戻る',exact:true}).click();
  await page.locator('canvas').focus();await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>FF.snowJourney.read().x===5);
  await arrive(page,'town','白樺の宿場町');assert.ok((await state(page)).visited.includes('town'));await page.keyboard.press('Escape');
  await page.locator('.journey-shell').screenshot({path:path.join(out,'town.png')});
  // 再描画でも位置を保持し、古い RAF / Observer が新しい画面を壊さない。
  await page.evaluate(()=>FF.ui.rerender());await page.waitForTimeout(100);assert.equal((await state(page)).x,29);
  await arrive(page,'cave','こだまの洞窟');assert.equal((await state(page)).region,'cave');
  await arrive(page,'chest','旅人の宝箱');assert.equal((await state(page)).chest,true);await page.keyboard.press('Escape');
  await page.locator('.journey-shell').screenshot({path:path.join(out,'cave.png')});
  await arrive(page,'exit','雪原へ');await page.getByRole('button',{name:'雪原へ戻る',exact:true}).click();assert.equal((await state(page)).region,'field');
  await arrive(page,'library','封印図書館');await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'帰還',exact:true}).click();await page.getByRole('button',{name:'灯火の村',exact:true}).click();assert.equal((await state(page)).x,4);
  if(!(await page.locator('.journey-guide').isVisible()))await page.getByRole('button',{name:'旅のしおり',exact:true}).click();
  await page.locator('[data-destination="town"]').click();await page.waitForFunction(()=>FF.snowJourney.read().x>4);await page.getByRole('button',{name:'移動を止める',exact:true}).click();await page.waitForTimeout(200);const stopped=await state(page);await page.waitForTimeout(250);assert.deepEqual(await state(page),stopped);
  assert.equal(await page.evaluate(()=>JSON.stringify(FF.app.state)),game);
  assert.equal(await page.evaluate(()=>localStorage.getItem('frozenFrontier.save')),'unchanged-public-save');
  await page.getByRole('button',{name:'村へ',exact:true}).click();await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>FF.app.screen),'base');assert.equal(await page.locator('.journey-shell').count(),0);
  await page.evaluate(()=>FF.ui.show('adventure'));assert.deepEqual(await state(page),stopped);
  // 壊れた位置を安全な開始地点に戻す。
  await page.evaluate(()=>FF.ui.show('base'));await page.waitForTimeout(100);await page.evaluate(()=>{localStorage.setItem(FF.snowJourney.key,JSON.stringify({region:'field',x:-1,y:200}));FF.ui.show('adventure');});assert.equal((await state(page)).x,4);
  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await boot(mobile);
  await mobile.getByRole('button',{name:'東へ',exact:true}).tap();await mobile.waitForFunction(()=>FF.snowJourney.read().x===5);
  await mobile.getByRole('button',{name:'全体マップ',exact:true}).tap();await mobile.getByRole('button',{name:'冒険に戻る',exact:true}).tap();
  // 地面を実際にタップして移動（現在地の右隣）。
  const box=await mobile.locator('canvas').boundingBox();await mobile.touchscreen.tap(box.x+box.width/2+67,box.y+box.height/2+.8*67*.66);await mobile.waitForFunction(()=>FF.snowJourney.read().x===6);
  await mobile.locator('.journey-shell').screenshot({path:path.join(out,'mobile-touch.png'),animations:'disabled'});
  assert.deepEqual(errors,[]);console.log('PASS: 40×30 connectivity, safe road, 4 widths, keyboard/touch, town/cave/chest/boss, recall, stop, rerender, malformed save, isolated state');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
