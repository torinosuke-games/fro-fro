// 冒険の画面（編成・持ち物・フィールド）の主人公の絵は、設定で選んだキャラ（判断374）
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();
for(const av of ['e9','e3']){
 await p.evaluate(a=>{const s=FF.util.clone(FF.app.state);s.player.avatar=a;s.adventure.started=true;FF.app.commit(s);FF.ui.show('adventureParty');},av);
 await p.waitForSelector('.adv-squad-slot[data-member="hero"] img');
 for(const sel of ['.adv-squad-slot[data-member="hero"] img','article[data-member="hero"] img'])
  assert.equal(await p.locator(sel).first().getAttribute('data-avatar'),av,sel);
 assert.ok(await p.locator('.adv-squad-slot[data-member="hero"] img').evaluate((i,a)=>i.complete&&i.naturalWidth>0&&i.src.includes('portrait-'+a+'.webp'),av));
}
assert.deepEqual(errors,[]);console.log('PASS: hero portrait follows the chosen avatar');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
