// 夜の防衛戦：20段階の難しさ（判断461）。勝って解放。襲撃も練習も、解放ずみの難しさから選ぶ。どの難しさでも、報酬が数えられる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 const open=cleared=>p.evaluate((c)=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;
  s.tower.cleared={};for(let d=1;d<=c;d++)s.tower.cleared[d]=true;FF.app.state=s;FF.ui.show('base');FF.ui.show('tower');},cleared);
 const opts=sel=>p.locator(sel).evaluate(e=>[...e.options].map(o=>o.value).join());
 // はじめ：難しさ1だけ（中央炉のレベルとは、つながらない（ロジックのテストで確認））。次は、1に勝つと解放
 await open(0);await p.waitForTimeout(300);
 assert.equal(await opts('[data-act="raid-stage"]'),'1');assert.ok((await p.locator('.tw-raid').innerText()).includes('難しさ2は、難しさ1に勝つと'));
 // 3つ勝つと、4まで。いちばん先（4）が、はじめに選ばれる。選び直すと、道の数・報酬が変わる
 await open(3);await p.waitForTimeout(300);
 assert.equal(await opts('[data-act="raid-stage"]'),'1,2,3,4');assert.equal(await p.locator('[data-act="raid-stage"]').inputValue(),'4');
 assert.ok((await p.locator('.tw-raid-meta').innerText()).includes('6本'));
 await p.locator('[data-act="raid-stage"]').selectOption('2');assert.ok((await p.locator('.tw-raid-meta').innerText()).includes('5本'));assert.ok((await p.locator('.tw-raid .tw-reward').innerText()).includes('+160 G'));   // 勝ったことのある難しさ＝2倍にならない
 assert.equal(await p.locator('.tw-pick select').first().inputValue(),'4');
 await p.screenshot({path:process.env.FF_SHOT||'/tmp/stages1.png'});
 // 難しさ2で襲撃：2で戦う。勝つと、報酬が数えられ、解放は、そのまま
 await p.locator('[data-act="raid"]').click();await p.waitForTimeout(300);
 assert.deepEqual(await p.evaluate(()=>{const bt=FF.ui.towerBattle();return [bt.difficulty,bt.mode,bt.lanes]}),[2,'raid',5]);
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.schedule.forEach(s=>{s.done=true});bt.enemies.length=0;bt.schedule.push({at:1e6,wave:5,type:'cub',lane:0,done:true})});await p.waitForTimeout(800);
 assert.equal(await p.evaluate(()=>FF.app.state.tower.rewards),1);assert.equal(await p.evaluate(()=>FF.tower.unlockedMax(FF.app.state)),4);
 // 難しさ4に勝つと、5が解放。難しさ4は、6本の道
 await p.locator('[data-act="leave"]').click();await p.evaluate(()=>FF.ui.show('tower'));await p.waitForTimeout(300);
 await p.locator('[data-act="raid"]').click();await p.waitForTimeout(300);
 assert.deepEqual(await p.evaluate(()=>{const bt=FF.ui.towerBattle();return [bt.difficulty,bt.lanes]}),[4,6]);
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.schedule.forEach(s=>{s.done=true});bt.enemies.length=0;bt.schedule.push({at:1e6,wave:5,type:'cub',lane:0,done:true})});await p.waitForTimeout(800);
 assert.equal(await p.evaluate(()=>FF.tower.unlockedMax(FF.app.state)),5);assert.equal(await p.evaluate(()=>FF.app.state.tower.rewards),2);
 // 全部解放：20まで。道の数は、7本
 await p.locator('[data-act="leave"]').click();await open(20);await p.waitForTimeout(300);
 assert.equal(await opts('[data-act="raid-stage"]'),[...Array(20)].map((_,i)=>i+1).join());assert.ok((await p.locator('.tw-raid').innerText()).includes('全部の難しさに、挑める'));
 await p.locator('[data-act="raid-stage"]').selectOption('20');assert.ok((await p.locator('.tw-raid-meta').innerText()).includes('7本'));
 await p.screenshot({path:'/tmp/stages2.png'});
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tower stages — unlock by clearing, 20 levels, raid/practice select, rewards at any level');
})().catch(e=>{console.error(e);process.exit(1)});
