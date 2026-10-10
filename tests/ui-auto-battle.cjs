// オートバトル（判断375）：戦闘の「オート」から作戦を選ぶと、全員の行動が決まって、クイズへ進む。手動にもどせる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-auto';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();
const battle=()=>p.evaluate(()=>{const s=FF.util.clone(FF.app.state);let a=FF.adventure.create();a.started=true;a.pos={x:3,y:6};a=FF.adventure.encounter(a,'cub');s.adventure=a;FF.app.commit(s);FF.ui.show('adventure');});
await battle();
await p.getByRole('button',{name:'オート',exact:true}).click();
for(const n of ['ガンガンいこうぜ','MP使うな','バランス重視で','いのち大事に'])assert.ok(await p.getByRole('button',{name:n,exact:true}).count()===1,n);
await p.screenshot({path:out+'/menu.png'});
await p.getByRole('button',{name:'ガンガンいこうぜ',exact:true}).click();
assert.deepEqual(await p.evaluate(()=>FF.app.state.adventure.auto),{on:true,tactic:'gungun'});
// 小さな目印「オート：ON」。押すと、作戦の選びなおしと、手動にもどすボタンが出る
const chip=p.locator('.adv-auto-chip');await chip.waitFor();assert.equal((await chip.innerText()).trim(),'オート：ON');
await chip.click();await p.locator('.overlay .modal').waitFor();
for(const n of ['ガンガンいこうぜ','MP使うな','バランス重視で','いのち大事に','手動にする'])assert.ok(await p.locator('.overlay .btn',{hasText:n}).count()>=1,n);
await p.screenshot({path:out+'/chip-menu.png'});
await p.locator('.overlay .btn',{hasText:'バランス重視で'}).click();
assert.equal(await p.evaluate(()=>FF.app.state.adventure.auto.tactic),'balance');
// 少しすると、全員の行動が決まり、クイズが出る
await p.waitForFunction(()=>FF.app.state.adventure.battle.phase==='attack',null,{timeout:8000});
const orders=await p.evaluate(()=>FF.app.state.adventure.battle.orders);
assert.equal(Object.keys(orders).length,4);
// クイズの画面の中から、オートを止める（問題には、そのまま答えられる）
await p.screenshot({path:out+'/quiz-auto.png'});
await p.locator('.adv-quiz-dialog[open] .adv-auto-stop').click();
assert.equal(await p.evaluate(()=>FF.app.state.adventure.auto.on),false);
assert.equal(await p.locator('.adv-auto-chip').count(),0);
assert.equal(await p.evaluate(()=>FF.app.state.adventure.battle.phase),'attack');
await p.screenshot({path:out+'/quiz.png'});
// 作戦を変える・手動にもどす（クイズに答えたあと、次のターンで）
await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.adventure=FF.adventure.setAuto(FF.adventure.retreat(FF.adventure.create()),null);});
await battle();
await p.getByRole('button',{name:'オート',exact:true}).click();await p.getByRole('button',{name:'いのち大事に',exact:true}).click();
await p.getByRole('button',{name:'✓ いのち大事に',exact:true}).waitFor();
await p.screenshot({path:out+'/auto.png'});
await p.getByRole('button',{name:'手動にする',exact:true}).click();
assert.equal(await p.evaluate(()=>FF.app.state.adventure.auto.on),false);
await p.getByRole('button',{name:'たたかう',exact:true}).waitFor();
assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
assert.deepEqual(errors,[]);console.log('PASS: auto battle picks orders by tactic, goes to quiz, returns to manual');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
