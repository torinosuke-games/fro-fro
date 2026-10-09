// 旅人の救出（判断354）：探索のボス（氷牙の長）を初めて倒すと、捕らわれていた旅人（戦士レオ）が仲間になる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
await p.evaluate(()=>{let s=FF.util.clone(FF.app.state);s.buildings.furnace.level=3;s.exploration.regions.snowfield.position=FF.exploration.gateIndex('snowfield');s=FF.buildings.markUnlockNoticeSeen(s,'explore_snowfield');FF.app.commit(s);});
await p.evaluate(()=>FF.ui.openEncounter('snowfield','sf_boss_wolf'));
await p.locator('.overlay .btn.primary').click();await p.waitForFunction(()=>!!FF.app.battleSession,null,{timeout:8000});
for(let i=0;i<40;i++){
 if(await p.evaluate(()=>!!FF.app.battleSession.battle.result))break;
 const a=await p.evaluate(()=>{const q=FF.app.battleSession.attempt;return {done:q.done,type:q.question.answerType,ans:q.question.answer,idx:q.choices?q.choices.indexOf(q.question.answer):-1};});
 if(a.done){await p.locator('.qf-next').click();continue;}
 if(a.type==='choice')await p.locator('.choices .choice').nth(a.idx).click();
 else{await p.locator('.answer-row input').fill(a.ans);await p.locator('.answer-row button').click();}
 await p.waitForTimeout(100);
}
await p.waitForSelector('.rescue-card',{timeout:5000});
assert.ok((await p.locator('.rescue-card').innerText()).includes('レオ'));
assert.ok(await p.evaluate(()=>FF.app.state.adventure.recruited.includes('senshi')));
assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
assert.deepEqual(errors,[]);console.log('PASS: first boss win rescues the traveler and recruits the ally');
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
