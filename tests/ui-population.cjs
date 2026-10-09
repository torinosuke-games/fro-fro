// 人口（判断355）：町の画面に、人口と、生産の増え方が出る。押すと、内訳のウィンドウが開く
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
assert.ok((await p.locator('.population-bar').innerText()).includes('10'));
await p.evaluate(()=>{let s=FF.util.clone(FF.app.state);s.buildings.furnace.level=4;s.buildings.housing.level=3;s.adventure=FF.adventure.recruit(s.adventure,'senshi');s=FF.buildings.markUnlockNoticeSeen?FF.buildings.markUnlockNoticeSeen(s,'furnace_4'):s;FF.app.commit(s);FF.ui.show('base');});
await p.waitForTimeout(500);
while(await p.locator('.overlay .btn').count()){await p.locator('.overlay .btn').first().click();await p.waitForTimeout(150);}
const text=await p.locator('.population-bar').innerText();
assert.ok(text.includes('30')&&text.includes('+40%'),text);
await p.locator('.population-bar').click();
assert.ok((await p.locator('.overlay').innerText()).includes('+10'));
assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
assert.deepEqual(errors,[]);console.log('PASS: population bar shows 30 people and +40% production; detail modal');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
