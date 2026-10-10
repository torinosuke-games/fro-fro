// 移動パッド（8方向）：押したまま指を動かすと、その方角へ歩き続ける（判断369）
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-joystick';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();
const setup=(x,y)=>p.evaluate(([x,y])=>{const s=FF.util.clone(FF.app.state);s.adventure.started=true;s.adventure.pos={x,y};s.adventure.cleared=['cub','wolf'];FF.app.commit(s);FF.ui.show('adventure');},[x,y]);
const pos=()=>p.evaluate(()=>FF.app.state.adventure.pos);
const center=async()=>{const r=await p.locator('.adv-directions').boundingBox();return {x:r.x+r.width/2,y:r.y+r.height/2,R:r.width/2};};
await setup(1,6);await p.waitForSelector('.adv-directions');
assert.equal(await p.locator('.adv-diag').count(),4,'4 diagonals');
{const r=await p.locator('.adv-directions').boundingBox();const sh=await p.locator('.adv-map-shell').boundingBox();assert.ok(Math.abs(r.x+r.width/2-(sh.x+sh.width/2))<3,'pad is centered');
 // 8つの矢印は、中心から同じ距離（同心円の輪の上）
 const d=await p.evaluate(()=>{const pad=document.querySelector('.adv-directions').getBoundingClientRect(),cx=pad.x+pad.width/2,cy=pad.y+pad.height/2;return [...document.querySelectorAll('.adv-directions .adv-button,.adv-directions .adv-diag')].map(e=>{const b=e.getBoundingClientRect();return Math.hypot(b.x+b.width/2-cx,b.y+b.height/2-cy)})});
 assert.equal(d.length,8);assert.ok(Math.max(...d)-Math.min(...d)<2,'ring '+d.join(','));}
// 東へ押したまま：歩き続ける
let c=await center();
await p.mouse.move(c.x,c.y);await p.mouse.down();await p.mouse.move(c.x+c.R*.8,c.y,{steps:4});
await p.waitForFunction(()=>FF.app.state.adventure.pos.x>=4,null,{timeout:8000});
await p.mouse.up();await p.waitForTimeout(500);
const stopped=await pos();await p.waitForTimeout(600);assert.deepEqual(await pos(),stopped,'stops after release');
assert.ok(stopped.x>=4&&stopped.y===6);
// 北東へ：ななめに1マスずつ
await setup(4,6);c=await center();
await p.mouse.move(c.x,c.y);await p.mouse.down();await p.mouse.move(c.x+c.R*.6,c.y-c.R*.6,{steps:4});
await p.waitForFunction(()=>FF.app.state.adventure.pos.x>4&&FF.app.state.adventure.pos.y<6,null,{timeout:6000});
assert.equal(await p.locator('.adv-traveler').getAttribute('data-facing'),'up','back sprite going north-east');
assert.equal(await p.locator('.adv-traveler').getAttribute('data-lean'),'1','leans toward east');
await p.screenshot({path:out+'/diag.png'});
await p.mouse.up();await p.waitForTimeout(500);
// 指を回して、向きを変える：北東 → 西
await setup(5,5);c=await center();
await p.mouse.move(c.x,c.y);await p.mouse.down();await p.mouse.move(c.x,c.y-c.R*.8,{steps:3});
await p.waitForTimeout(500);await p.mouse.move(c.x-c.R*.8,c.y,{steps:6});
await p.waitForFunction(()=>FF.app.state.adventure.pos.x<5,null,{timeout:6000});
await p.mouse.up();await p.waitForTimeout(500);
// 壁にぶつかったら、動かない（ななめで壁づたいにすべる）
await setup(1,1);c=await center();
await p.mouse.move(c.x,c.y);await p.mouse.down();await p.mouse.move(c.x-c.R*.8,c.y-c.R*.8,{steps:3});await p.waitForTimeout(700);await p.mouse.up();
assert.deepEqual(await pos(),{x:1,y:1},'wall blocks');
assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
assert.deepEqual(errors,[]);console.log('PASS: 8-way hold-to-walk pad');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
