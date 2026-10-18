// 夜の防衛戦の特別な装備（判断465）：開始画面に一覧が出る。難しさ10にはじめて勝つと、装備がもらえて、持ち物に入る。武器屋には並ばない
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;
  s.tower.cleared={};for(let d=1;d<=9;d++)s.tower.cleared[d]=true;FF.app.state=s;FF.ui.show('base');FF.ui.show('tower');});
 await p.waitForTimeout(300);
 for(let i=0;i<5&&await p.locator('.modal').count();i++){await p.locator('.modal button').first().click();await p.waitForTimeout(200);}
 assert.equal(await p.locator('.tw-gear-row').count(),6);
 assert.equal(await p.locator('.tw-gear-row.is-got').count(),0);
 await p.locator('[data-act="raid-stage"]').selectOption('10');await p.locator('[data-act="raid"]').click();await p.waitForTimeout(500);
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.schedule.forEach(s=>{s.done=true});bt.enemies.length=0;bt.schedule.push({at:1e6,wave:5,type:'cub',lane:0,done:true})});await p.waitForTimeout(900);
 assert.ok((await p.locator('.tw-gear-got').innerText()).includes('氷晶の剣'));
 assert.equal(await p.evaluate(()=>FF.shop.copies(FF.app.state,'weapon','ice_crystal_sword')),1);
 assert.equal(await p.evaluate(()=>FF.app.state.tower.gear[10]),true);
 await p.locator('[data-act="leave"]').click();await p.evaluate(()=>FF.ui.show('tower'));await p.waitForTimeout(300);
 assert.equal(await p.locator('.tw-gear-row.is-got').count(),1);
 assert.equal(await p.evaluate(()=>FF.shop.canBuyItem(FF.app.state,'weapon','ice_crystal_sword').reason),'special');
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tower gear — list on start screen, first clear of 10 gives the sword once');
})().catch(e=>{console.error(e);process.exit(1)});
