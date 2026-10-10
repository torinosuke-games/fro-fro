// 雪原のフィールドの HD-2D 風の表示（試作。判断367）：傾けた地面・立てた絵・カメラの追従・切りかえ
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-hd2d';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();
await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.adventure.started=true;FF.app.commit(s);FF.ui.show('adventure');});
await p.waitForSelector('.adv-map-viewport.hd2d');
assert.ok(await p.locator('.adv-tree').count()>5,'trees');
assert.ok((await p.locator('.adv-tilt').evaluate(e=>getComputedStyle(e).transform)).startsWith('matrix3d'),'tilted');
assert.ok((await p.locator('.adv-traveler').evaluate(e=>getComputedStyle(e).transform)).startsWith('matrix3d'),'hero stands');
const cam=()=>p.evaluate(()=>document.querySelector('.adv-map').style.transform);
const c0=await cam();
await p.locator('.adv-tile[data-x="2"][data-y="6"]').click();
await p.waitForFunction(()=>FF.app.state.adventure.pos.x===2);
assert.notEqual(await cam(),c0,'camera follows');
await p.screenshot({path:out+'/hd.png'});
assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
// 切りかえ：ふつうの見下ろしに戻せる
await p.getByRole('button',{name:/HD-2D/}).click();
await p.waitForSelector('.adv-map-viewport:not(.hd2d)');assert.equal(await p.locator('.adv-tree').count(),0);
await p.screenshot({path:out+'/flat.png'});
assert.deepEqual(errors,[]);console.log('PASS: HD-2D field tilts, stands sprites, follows hero, toggles flat');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
