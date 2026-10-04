// Browser regression checks for saved progress, fresh attempts and collection flights.
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH});
 const page=await browser.newPage({viewport:{width:1254,height:884}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const out=process.env.FF_QA_OUTPUT||path.resolve(__dirname,'../../../work/browser-qa');fs.mkdirSync(out,{recursive:true});
 await page.goto(process.env.FF_TEST_URL||'http://127.0.0.1:8765/');
 await page.locator('.title-card input').fill('ゆき');await page.locator('.title-card .btn.primary').click();
 await page.getByRole('button',{name:'小学4年',exact:true}).click();await page.locator('.avatar-pick').first().click();await page.locator('.intro-line + button').click();
 async function fillStores(){await page.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.buildings.furnace.level=2;for(const id of ['lumber','mine','quarry','foodhall']){s.buildings[id].level=1;s.buildings[id].lastCollectedAt=FF.app.now()-4*3600000;}FF.app.commit(s);FF.ui.show('base');});await page.waitForTimeout(150);while(await page.locator('.overlay').count())await page.locator('.overlay .btn').last().click();}
 await fillStores();
 const sizes=[];
 for(const width of [390,768,1193]){
  await page.setViewportSize({width,height:884});
  sizes.push(await page.locator('.art-bubble').first().evaluate(e=>e.getBoundingClientRect().width));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:path.join(out,'town-scaled-'+width+'.png'),fullPage:true});
 }
 assert.ok(sizes[0]<sizes[1]&&sizes[1]<sizes[2],'Harvest controls scale with scene width');
 const before=await page.evaluate(()=>({...FF.app.state.resources}));
 await page.getByRole('button',{name:'生産物をまとめて受け取る',exact:true}).click();
 assert.equal(await page.locator('.reward-flight').count(),4,'Each field sends its own icon');
 for(const key of ['wood','iron','stone','food']){
  assert.equal(await page.locator('[data-resource="'+key+'"] .resource-value').innerText(),String(before[key]));
  assert.ok(await page.evaluate(k=>FF.app.state.resources[k],key)>before[key]);
 }
 await page.waitForTimeout(400);await page.screenshot({path:path.join(out,'harvest-in-flight.png')});
 await page.waitForTimeout(1600);assert.equal(await page.locator('.reward-flight').count(),0);
 for(const key of ['wood','iron','stone','food'])assert.equal(await page.locator('[data-resource="'+key+'"] .resource-value').innerText(),String(await page.evaluate(k=>FF.app.state.resources[k],key)));
 await page.getByRole('button',{name:'学習する →',exact:true}).click();await page.locator('.subject-math').click();
 await page.getByLabel('答え方',{exact:true}).selectOption('input');
 // 問題マップの番号は教科・学年の通し番号（判断221）。図解100問の57・58番が今の何番かを求める
 const [n57,n58]=await page.evaluate(()=>[57,58].map(k=>FF.curriculum.numberOf(FF.app.bank,QUESTION_BANK.find(q=>q.collection==='frontier100'&&q.number===k))));
 const number=n=>page.locator('.index-item').filter({hasText:new RegExp('^'+({57:n57,58:n58}[n])+'$')});
 await number(57).click();
 const answer=await page.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.answer);
 await page.getByRole('textbox',{name:'答えを入力'}).fill(answer);
 await page.getByRole('button',{name:'答え合わせ',exact:true}).click();
 assert.equal(await page.locator('.reward-flight').count(),2);
 await page.waitForTimeout(350);await page.screenshot({path:path.join(out,'answer-in-flight.png')});
 await page.waitForTimeout(1400);await page.screenshot({path:path.join(out,'answer-reward.png'),fullPage:true});
 const points=await page.evaluate(()=>FF.app.state.studyPoints);
 await number(58).click();await number(57).click();
 assert.equal(await page.getByRole('textbox',{name:'答えを入力'}).inputValue(),'');
 assert.equal(await page.locator('.answer-feedback').count(),0);
 assert.ok(await number(57).evaluate(el=>el.classList.contains('solved')));
 assert.equal(await page.evaluate(()=>FF.app.state.studyPoints),points,'Revisit alone earns nothing');
 await page.getByRole('button',{name:'Frozen Frontier',exact:true}).click();
 await page.reload();await page.getByRole('button',{name:'学習する →',exact:true}).click();await page.locator('.subject-math').click();
 assert.ok(await number(57).evaluate(el=>el.classList.contains('solved')),'Result survives home and reload, across formats');
 await number(57).click();
 const wrong=await page.evaluate(()=>{const q=FF.app.session.items[FF.app.session.currentId].attempt.question;return q.choices.find(x=>x!==q.answer);});
 await page.locator('.answer-option').filter({hasText:new RegExp('^.'+wrong+'$')}).click();await page.getByRole('button',{name:'答え合わせ',exact:true}).click();
 assert.ok(await number(57).evaluate(el=>el.classList.contains('missed')));
 await page.reload();await page.getByRole('button',{name:'学習する →',exact:true}).click();await page.locator('.subject-math').click();
 assert.ok(await number(57).evaluate(el=>el.classList.contains('missed')),'Mistake replaces saved correct result');
 // Reduced motion skips travel while still applying the entire collection.
 await page.emulateMedia({reducedMotion:'reduce'});await fillStores();
 await page.getByRole('button',{name:'生産物をまとめて受け取る',exact:true}).click();
 assert.equal(await page.locator('.reward-flight').count(),0);
 for(const key of ['wood','iron','stone','food'])assert.equal(await page.locator('[data-resource="'+key+'"] .resource-value').innerText(),String(await page.evaluate(k=>FF.app.state.resources[k],key)));
 assert.deepEqual(errors,[]);console.log('PASS: fresh attempts, persistent latest result, four collection flights, arrival counters, responsive controls, reduced motion');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
