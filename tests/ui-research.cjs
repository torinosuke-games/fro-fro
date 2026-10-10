// 司書が力を貸してくれる（獲得熱量10000）と、魔法研究所で、魔法の書物を開発できる（判断363）
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-research';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
// はじめは、魔法研究所は使えない（司書がまだ）
await p.locator('.facility-btn[data-facility="magic"]').click();
assert.ok((await p.locator('.lab-body').innerText()).includes('0 / 10,000'));
await p.screenshot({path:out+'/lab-locked.png'});
await p.locator('.overlay .btn').click();
// 獲得熱量が10000になると、司書が力を貸してくれる（お知らせが出る）
await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);FF.points.addPoints(s,10000);FF.app.commit(FF.shop.addGold(s,1000));FF.ui.show('base');});
await p.waitForSelector('.rescue-card');
assert.ok((await p.locator('.overlay').innerText()).includes('ミナ'));
await p.screenshot({path:out+'/join.png'});
await p.locator('.overlay .btn.primary').click();
assert.equal(await p.evaluate(()=>FF.app.state.adventure.joinNotice.length),0);
assert.ok(await p.evaluate(()=>FF.app.state.adventure.recruited.includes('shisho')));
// 魔法研究所で、魔法の書物を開発する
await p.locator('.facility-btn[data-facility="magic"]').click();
assert.equal(await p.locator('.shop-row[data-book]').count(),3);
await p.locator('.shop-row[data-book="heal"] .shop-btn').click();
assert.equal(await p.evaluate(()=>FF.research.level(FF.app.state,'heal')),1);
assert.equal(await p.evaluate(()=>FF.shop.gold(FF.app.state)),700);
await p.screenshot({path:out+'/lab.png'});
assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
assert.deepEqual(errors,[]);console.log('PASS: librarian joins at 10000 heat, lab develops magic books with gold');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
