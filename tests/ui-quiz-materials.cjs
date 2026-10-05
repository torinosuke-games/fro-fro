const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE);const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH});const p=await b.newPage({viewport:{width:586,height:884}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:8765/');await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
await p.getByRole('button',{name:'学習する →',exact:true}).click();await p.locator('.subject-math').click();
assert.equal(await p.locator('.question-reward-note').count(),0);
await p.locator('#hud [data-resource="iron"]').click();assert.equal(await p.evaluate(()=>FF.app.session.sel.resource),'iron');assert.equal(await p.evaluate(()=>FF.app.session.items[FF.app.session.currentId].resource),'iron');
await p.locator('.quiz-resource-button').click();await p.locator('.quiz-resource-options').getByRole('button',{name:'石',exact:true}).click();assert.equal(await p.evaluate(()=>FF.app.session.sel.resource),'stone');
const before=await p.evaluate(()=>({...FF.app.state.resources}));const answerIndex=await p.evaluate(()=>{const a=FF.app.session.items[FF.app.session.currentId].attempt;return a.choices.indexOf(a.question.answer);});await p.locator('.answer-option').nth(answerIndex).click();const after=await p.evaluate(()=>({...FF.app.state.resources}));assert.ok(after.stone>before.stone);for(const k of ['wood','iron','food'])assert.equal(after[k],before[k]);
await p.getByRole('button',{name:'次の問題 →',exact:true}).click();assert.equal(await p.evaluate(()=>FF.app.session.items[FF.app.session.currentId].resource),'stone');
await p.locator('.quiz-resource-button').click();await p.locator('.quiz-resource-options').getByRole('button',{name:'指定なし',exact:true}).click();assert.equal(await p.evaluate(()=>FF.app.session.sel.resource),null);
await p.locator('#hud [data-resource="food"]').click();await p.locator('.filter-open').click();assert.equal(await p.evaluate(()=>FF.app.session.sel.resource),null);await p.getByRole('button',{name:/問題にもどる/}).click();assert.equal(await p.evaluate(()=>FF.app.session.sel.resource),null);
await p.evaluate(()=>{const it=FF.app.session.items[FF.app.session.currentId];it.attempt.question.diagram=null;FF.ui.rerender();});assert.ok(!(await p.locator('.encourage p').innerText()).includes('図'));
for(const width of [360,390,586,768,1440]){await p.setViewportSize({width,height:884});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
await p.getByRole('button',{name:'Frozen Frontier',exact:true}).click();
await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);const now=FF.app.now();for(const id of ['lumber','mine','quarry','foodhall']){s.buildings[id].level=1;s.buildings[id].lastCollectedAt=now-4*3600000;}s.buildings.furnace.construction={toLevel:s.buildings.furnace.level+1,startedAt:now,endsAt:now+55000};FF.app.commit(s);FF.ui.rerender();});
const status=p.locator('.art-bld.is-building .map-construction');assert.ok((await status.innerText()).includes('工事中'));const t=await status.innerText();await p.waitForTimeout(2100);assert.notEqual(await status.innerText(),t);
const sizes=[];for(const width of [390,586,768,1193]){await p.setViewportSize({width,height:884});sizes.push((await p.locator('.art-basket').boundingBox()).width);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}for(let i=1;i<sizes.length;i++)assert.ok(sizes[i]>sizes[i-1]);
await p.setViewportSize({width:586,height:884});await p.screenshot({path:'../../work/browser-qa/town-construction-586.png',fullPage:true});
assert.deepEqual(errors,[]);await b.close();console.log('PASS: HUD and modal material selection, exclusive rewards, navigation reset, appropriate comments, responsive basket and live construction timer');})().catch(e=>{console.error(e);process.exit(1)});




