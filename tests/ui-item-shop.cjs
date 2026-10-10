// 道具屋（判断384）：file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.name='ゆき';FF.ui.show('base');});
 await p.waitForTimeout(400);
 assert.equal(await p.locator('.facility-btn[data-facility="item"]').evaluate(e=>e.classList.contains('is-soon')),false);
 await p.locator('.facility-btn[data-facility="item"]').click();
 assert.equal(await p.locator('.overlay h2').innerText(),'道具屋');
 const row=p.locator('.shop-row[data-item="potion"]');
 assert.ok((await row.innerText()).includes('25 G'));
 assert.ok((await row.innerText()).includes('所持：3個'));
 assert.equal(await p.locator('.shop-buy-1').isDisabled(),true);
 await p.locator('.overlay .btn').click();
 await p.evaluate(()=>FF.app.commit(FF.shop.addGold(FF.app.state,150)));
 await p.locator('.facility-btn[data-facility="item"]').click();
 assert.equal(await p.locator('.shop-buy-5').isDisabled(),false);
 await p.locator('.shop-buy-5').click();
 assert.equal(await p.evaluate(()=>FF.shop.potions(FF.app.state)),8);
 assert.equal(await p.evaluate(()=>FF.shop.gold(FF.app.state)),25);
 assert.ok((await p.locator('.shop-row[data-item="potion"]').innerText()).includes('所持：8個'));
 await p.locator('.shop-buy-1').click();
 assert.equal(await p.evaluate(()=>FF.app.state.adventure.potions),9);
 assert.equal(await p.locator('.shop-buy-1').isDisabled(),true);
 for(const w of [360,390,768]){await p.setViewportSize({width:w,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: item shop buys potions with gold');
})().catch(e=>{console.error(e);process.exit(1);});
