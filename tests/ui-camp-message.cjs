// 焚き火で回復したとき、フィールドの上に知らせが出る（判断379）
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-camp';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.addInitScript(()=>{window.FF_FIELD_MODE='css';});   // Canvas の表示ではなく、CSS の表示を確かめる（判断387）
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();
await p.evaluate(()=>{FF.adventureRng=()=>0.99;const s=FF.util.clone(FF.app.state);s.adventure.started=true;s.adventure.pos={x:5,y:3};s.adventure.roster.hero.hp=3;s.adventure.roster.hero.mp=0;FF.app.commit(s);FF.ui.show('adventure');});
await p.locator('.adv-tile[data-x="6"][data-y="3"]').click();
const banner=p.locator('.adv-field-banner.camp');await banner.waitFor({timeout:5000});
assert.ok((await banner.innerText()).includes('全回復'));
const r=await banner.boundingBox();assert.ok(r.y>=0&&r.y+r.height<=844&&r.x>=0&&r.x+r.width<=390,'banner is on screen');
assert.equal(await p.evaluate(()=>FF.app.state.adventure.roster.hero.hp),66);
await p.screenshot({path:out+'/camp.png'});
// もう使った焚き火：知らせだけ
await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.adventure.pos={x:5,y:3};FF.app.commit(s);FF.ui.show('adventure');});
await p.locator('.adv-tile[data-x="6"][data-y="3"]').click();
await p.locator('.adv-field-banner.campUsed').waitFor({timeout:5000});
assert.deepEqual(errors,[]);console.log('PASS: camp rest shows a banner on the field');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
