// 町のほかの施設のアイコン（判断325）：file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.name='ゆき';FF.app.state.player.avatar='e1';FF.ui.show('base');});
 await p.waitForTimeout(500);
 const ids=['weapon','armor','item','tavern','party','magic','ticket','training'];
 assert.deepEqual(await p.locator('.facility-btn').evaluateAll(l=>l.map(e=>e.dataset.facility)),ids);
 // 絵がすべて読める
 assert.deepEqual(await p.locator('.facility-icon').evaluateAll(l=>l.map(i=>i.naturalWidth>0)),ids.map(()=>true));
 // スマホは横に4つ（2行）。「学習する」ボタンの下に並ぶ
 const boxes=await p.locator('.facility-btn').evaluateAll(l=>l.map(e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width)}}));
 assert.equal(new Set(boxes.slice(0,4).map(b=>b.y)).size,1);assert.equal(new Set(boxes.slice(4).map(b=>b.y)).size,1);assert.ok(boxes[4].y>boxes[0].y);
 const cta=await p.locator('.home-start-mobile').boundingBox();assert.ok(boxes[0].y>=cta.y+cta.height-1);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 // 準備中の施設は、ウィンドウが開く。チケット引換所は、引換所の画面
 await p.locator('.facility-btn[data-facility="armor"]').click();
 assert.equal(await p.locator('.overlay h2').innerText(),'防具屋');assert.ok((await p.locator('.facility-soon').innerText()).includes('準備中'));
 await p.locator('.overlay .btn').click();assert.equal(await p.locator('.overlay').count(),0);
 await p.locator('.facility-btn[data-facility="ticket"]').click();
 assert.equal(await p.evaluate(()=>FF.app.screen),'redeem');
 // 広い画面は横8つ
 await p.evaluate(()=>FF.ui.show('base'));await p.setViewportSize({width:1024,height:800});await p.waitForTimeout(300);
 assert.equal(new Set(await p.locator('.facility-btn').evaluateAll(l=>l.map(e=>Math.round(e.getBoundingClientRect().y)))).size,1);
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: 8 facility icons, 4 per row on phone, soon dialog, ticket office opens redeem');
})().catch(e=>{console.error(e);process.exit(1);});
