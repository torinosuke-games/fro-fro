// 武器屋（判断340）：file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.name='ゆき';FF.app.state.player.avatar='e1';FF.ui.show('base');});
 await p.waitForTimeout(400);
 await p.locator('.facility-btn[data-facility="weapon"]').click();
 assert.equal(await p.locator('.overlay h2').innerText(),'武器屋');
 assert.equal(await p.locator('.shop-row').count(),5);
 // はじめは、木の剣を装備中。ほかは、ゴールドが足りなくて買えない
 assert.equal(await p.locator('.shop-row[data-weapon="wood_sword"] .shop-equipped').count(),1);
 assert.equal(await p.locator('.shop-row[data-weapon="stone_sword"] .shop-btn').isDisabled(),true);
 await p.locator('.overlay .btn').click();
 // ゴールドを足すと、買える。買うと、ゴールドが減り、装備中になる
 await p.evaluate(()=>FF.app.commit(FF.shop.addGold(FF.app.state,350)));
 await p.locator('.facility-btn[data-facility="weapon"]').click();
 assert.ok((await p.locator('.shop-gold').innerText()).includes('350'));
 await p.locator('.shop-row[data-weapon="iron_sword"] .shop-btn').click();
 assert.equal(await p.evaluate(()=>FF.shop.gold(FF.app.state)),50);
 assert.equal(await p.evaluate(()=>FF.shop.currentWeapon(FF.app.state)),'iron_sword');
 assert.equal(await p.locator('.shop-row[data-weapon="iron_sword"] .shop-equipped').count(),1);
 // 木の剣を付けかえられる
 await p.locator('.shop-row[data-weapon="wood_sword"] .shop-btn').click();
 assert.equal(await p.evaluate(()=>FF.shop.currentWeapon(FF.app.state)),'wood_sword');
 assert.equal(await p.evaluate(()=>FF.shop.damagePerCorrect(FF.app.state)),10);
 // 防具屋：5つ。ゴールドで買うと装備中になる
 await p.locator('.overlay .btn').click();
 await p.evaluate(()=>FF.app.commit(FF.shop.addGold(FF.app.state,150)));
 await p.locator('.facility-btn[data-facility="armor"]').click();
 assert.equal(await p.locator('.overlay h2').innerText(),'防具屋');
 assert.equal(await p.locator('.shop-row').count(),5);
 assert.equal(await p.locator('.shop-row[data-weapon="cloth_clothes"] .shop-equipped').count(),1);
 await p.locator('.shop-row[data-weapon="fur_coat"] .shop-btn').click();
 assert.equal(await p.evaluate(()=>FF.shop.currentArmor(FF.app.state)),'fur_coat');
 assert.equal(await p.evaluate(()=>FF.shop.currentWeapon(FF.app.state)),'wood_sword');
 assert.equal(await p.evaluate(()=>FF.shop.gold(FF.app.state)),100);
 // 画面におさまる
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 for(const w of [360,768]){await p.setViewportSize({width:w,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: weapon shop lists 5 weapons, buy/equip, gold, damage');
})().catch(e=>{console.error(e);process.exit(1);});
