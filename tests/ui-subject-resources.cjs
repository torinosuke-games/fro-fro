const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH});
 const p=await b.newPage({viewport:{width:586,height:884}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const out=process.env.FF_QA_OUTPUT||path.resolve(__dirname,'../../../work/browser-qa');fs.mkdirSync(out,{recursive:true});
 await p.goto(process.env.FF_TEST_URL||'http://127.0.0.1:8765/');await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
 const resource=name=>({
  click:async()=>{await p.locator('.study-resource-button').click();await p.locator('.resource-choices').getByRole('button',{name,exact:true}).click();},
  getAttribute:async attr=>{await p.locator('.study-resource-button').click();const value=await p.locator('.resource-choices').getByRole('button',{name,exact:true}).getAttribute(attr);await p.keyboard.press('Escape');return value;}
 });
 async function study(){await p.getByRole('button',{name:'学習する →',exact:true}).click();}
 async function home(){await p.getByRole('button',{name:'Frozen Frontier',exact:true}).click();}
 async function specified(id){assert.equal(await p.evaluate(()=>FF.app.session.sel.resource),id);assert.equal(await p.evaluate(()=>FF.app.session.items[FF.app.session.currentId].resource),id);}
 await study();assert.equal(await resource('指定なし').getAttribute('aria-pressed'),'true');
 assert.equal(await p.locator('.subject-math .progress-total').innerText(),'全'+await p.evaluate(()=>FF.curriculum.totalOf(FF.app.bank,'math',4))+'問');
 await resource('鉄').click();await p.locator('.subject-math').click();await specified('iron');
 const before=await p.evaluate(()=>({...FF.app.state.resources}));
 let answer=await p.evaluate(()=>FF.app.session.items[FF.app.session.currentId].attempt.question.answer);
 const drill=await p.evaluate(()=>!!FF.app.session.items[FF.app.session.currentId].attempt.question.generated);   // 自動生成のドリルは、問題数・正解数に数えない（判断226）
 await p.locator('.answer-option').filter({hasText:answer}).click();
 const after=await p.evaluate(()=>({...FF.app.state.resources}));assert.ok(after.iron>before.iron);for(const key of ['wood','stone','food'])assert.equal(after[key],before[key]);
 await p.getByRole('button',{name:'次の問題 →',exact:true}).click();await specified('iron');
 await home();await study();assert.equal(await resource('指定なし').getAttribute('aria-pressed'),'true');
 assert.equal(await p.locator('.subject-math .progress-correct').innerText(),drill?'正解 0問':'正解 1問');
 await resource('食料').click();await p.locator('.masthead-links').getByRole('button',{name:/設定/}).click();await home();await study();assert.equal(await resource('指定なし').getAttribute('aria-pressed'),'true');
 // A real building's shortage button preselects that resource.
 async function shortage(){await home();await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);for(const key of ['wood','iron','stone','food'])s.resources[key]=0;FF.app.commit(s);FF.ui.rerender();});await p.locator('.bld-card').first().click();const short=p.locator('.overlay .short.tap').first();const name=(await short.innerText()).includes('木材')?'木材':null;assert.equal(name,'木材');await short.click();assert.equal(await resource('木材').getAttribute('aria-pressed'),'true');}
 await shortage();await p.locator('.subject-math').click();await specified('wood');await p.getByRole('button',{name:'あとで考える →',exact:true}).click();await specified('wood');
 await home();await study();assert.equal(await resource('指定なし').getAttribute('aria-pressed'),'true');
 await shortage();await p.locator('.masthead-links').getByRole('button',{name:/設定/}).click();await home();await study();assert.equal(await resource('指定なし').getAttribute('aria-pressed'),'true');
 // Counts reflect saved state and deduplicate input variants.
 await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);const qs=QUESTION_BANK.filter(q=>q.collection==='frontier100');s.learning.questionResults={};s.learning.questionResults[qs[0].id]=true;s.learning.questionResults[qs[1].id]=false;FF.app.commit(s);FF.ui.rerender();});
 assert.equal(await p.locator('.subject-math .progress-correct').innerText(),'正解 1問');assert.equal(await p.locator('.subject-math .progress-review').innerText(),'要復習 1問');
 for(const grade of [4,9])for(const width of [360,390,586,768,923,1440]){
  await p.setViewportSize({width,height:884});await p.evaluate(g=>{FF.app.commit(FF.state.setPlayerGrade(FF.app.state,g));FF.ui.rerender();},grade);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Fits '+grade+'/'+width);
  assert.equal(await resource('指定なし').getAttribute('aria-pressed'),'true');
  const total=await p.evaluate(g=>FF.curriculum.progress(FF.app.bank,FF.app.state,'math',g).total,grade);assert.equal(await p.locator('.subject-math .progress-total').innerText(),'全'+total+'問');
  if(width===586||width===390)await p.screenshot({path:path.join(out,'subject-resources-g'+grade+'-'+width+'.png'),fullPage:true});
 }
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: specified rewards, building shortage preselection, reset on leaving, unique grade progress, six responsive widths');
})().catch(e=>{console.error(e);process.exit(1);});
