// その日に獲得できる資材（教科で決まる。判断319）：file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.name='ゆき';FF.app.state.player.avatar='e1';FF.ui.show('study',{tab:'learn'});});
 const today=await p.evaluate(()=>FF.daily.today(FF.app.now()));
 // 各教科のカードに、その日の資材が出る。ランダムな教科だけ ☆ が付く
 for(const s of ['math','japanese','science','social','english']){
  const card=p.locator('.subject-card[data-subject="'+s+'"]');
  assert.equal(await card.getAttribute('data-resource'),today.bySubject[s].resource,s);
  assert.equal(await card.locator('.daily-badge .daily-star').count(),today.bySubject[s].random?1:0,s);
 }
 assert.equal(await p.locator('.subject-card .daily-star').count(),1);
 assert.equal(await p.locator('.study-resource-button').count(),0);
 // 資材の欄を押しても、資材は選べない
 await p.evaluate(()=>FF.ui.show('study',{tab:'learn'}));
 assert.equal(await p.locator('#hud button.resource-item').count(),0);
 // 教科を選ぶと、その日の資材がその教科の問題の報酬になる（見出しのバッジにも出る）
 for(const s of ['math','english']){
  await p.evaluate(()=>FF.ui.show('study',{tab:'learn'}));
  await p.locator('.subject-card[data-subject="'+s+'"]').click();
  assert.equal(await p.evaluate(()=>FF.app.session.sel.resource),today.bySubject[s].resource);
  assert.equal(await p.evaluate(()=>FF.app.session.items[FF.app.session.currentId].resource),today.bySubject[s].resource);
  assert.ok((await p.locator('.quiz-resource-button').getAttribute('aria-label')).includes(await p.evaluate(r=>FF.ui.plain(FF.ui.resDef(r).name),today.bySubject[s].resource)));
 }
 // 設備の画面で足りない資材を押すと、その資材が決まっている教科（☆でないほう）にカーソルが当たる
 for(const r of ['wood','iron','stone','food']){
  await p.evaluate(res=>FF.ui.show('study',{tab:'learn',resource:res}),r);
  await p.waitForTimeout(150);
  assert.equal(await p.evaluate(()=>document.activeElement&&document.activeElement.dataset.subject),today.subjectOf[r],r);
  assert.equal(await p.locator('.subject-card.daily-focus').count(),1,r);
 }
 await p.evaluate(()=>FF.ui.show('study',{tab:'learn'}));
 assert.equal(await p.locator('.subject-card.daily-focus').count(),0);
 // 日付が（朝4時で）かわると、割り当てがかわる
 const next=await p.evaluate(()=>{FF.clock.advance(24*3600*1000);return FF.daily.today(FF.app.now()).day;});
 assert.notEqual(next,today.day);
 for(const width of [360,390,768,1024]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Fits '+width);}
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: daily resource badges, random star, no manual picker, focus from building shortage');
})().catch(e=>{console.error(e);process.exit(1);});
