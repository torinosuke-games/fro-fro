// 中央炉 Lv6〜10 の「町の力」（判断464）：建物の画面に効きめが出る。夜の防衛戦の画面に、町の力の行が出る。ほかの建物は Lv5 まで
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;
  s.buildings.furnace.level=8;['housing','lumber','mine','quarry','foodhall'].forEach(i=>s.buildings[i].level=5);Object.assign(s.resources,{wood:99999,stone:99999,iron:99999,food:99999});FF.app.state=s;FF.ui.show('base');});
 await p.waitForTimeout(400);
 assert.equal(await p.evaluate(()=>FF.buildings.canUpgrade(FF.app.state,'housing').reason),'maxLevel');
 assert.equal(await p.evaluate(()=>FF.buildings.canUpgrade(FF.app.state,'furnace').ok),true);
 await p.evaluate(()=>FF.ui.show('tower'));await p.waitForTimeout(300);
 for(let i=0;i<5&&await p.locator('.modal').count();i++){await p.locator('.modal button').first().click();await p.waitForTimeout(200);}
 assert.ok((await p.locator('.tw-power').innerText()).includes('町の力'));
 await p.locator('[data-act="start"]').click();await p.waitForTimeout(400);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().core.max-FF.balance.TOWER.CORE_HP-3*FF.balance.TOWER.POWER.CORE),0);
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: furnace power — Lv6-10 effect on the tower, other buildings stay at Lv5');
})().catch(e=>{console.error(e);process.exit(1)});
