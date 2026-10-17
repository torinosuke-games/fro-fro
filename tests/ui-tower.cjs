// 夜の防衛戦の画面（判断443・T-3）：file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href+'?debug=1',{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.name='ゆき';s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;FF.ui.show('base');});
 await p.waitForTimeout(500);
 // 訓練所から、はじまりの画面。はじめの3人がいる
 await p.locator('.facility-btn[data-facility="training"]').click();
 assert.equal(await p.evaluate(()=>FF.app.screen),'tower');
 assert.ok((await p.locator('.tw-h1').innerText()).includes('防衛戦'));
 await p.screenshot({path:process.env.FF_SHOT||'/tmp/tower0.png'});
 await p.locator('[data-act="start"]').click();
 await p.waitForTimeout(600);
 // 戦場：絵が読め、Canvas が描かれ、カードが3枚
 assert.equal(await p.locator('.tw-card').count(),3);
 const shot=await p.locator('.tw-canvas').screenshot();assert.ok(shot.length>60000,'canvas drawn');   // file:// では、Canvas の画素は読めないので、見た目の大きさで確かめる
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 // カードを選んで、マスを押すと、仲間が置かれて、灯が減る
 const before=await p.evaluate(()=>FF.ui.towerBattle().light);
 await p.locator('.tw-card[data-member="kenshi"]').click();
 const box=await p.locator('.tw-canvas').boundingBox(),cw=box.width/9,ch=box.height/1440*0+box.height/5*1;
 // 2列目（col 1）・2本目の道（y=250/800）
 await p.mouse.click(box.x+cw*1.5,box.y+box.height*250/800);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().units.length),1);
 assert.ok(await p.evaluate(()=>FF.ui.towerBattle().light)<before);
 // 置いた仲間を押すと「下げる」。灯が半分戻る
 await p.mouse.click(box.x+cw*1.5,box.y+box.height*250/800);
 await p.locator('[data-act="remove"]').click();
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().units.length),0);
 // 置けないマス（右の通り道）では、置かれない
 await p.locator('.tw-card[data-member="juushouhei"]').click();
 await p.mouse.click(box.x+cw*7.5,box.y+box.height*250/800);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().units.length),0);
 // カードをドラッグして、マスにはなしても置ける（置けないマスでは、置かれない）
 await p.locator('.tw-card[data-member="kenshi"]').scrollIntoViewIfNeeded();
 const cb=await p.locator('.tw-card[data-member="kenshi"]').boundingBox();
 await p.mouse.move(cb.x+cb.width/2,cb.y+cb.height/2);await p.mouse.down();await p.mouse.move(box.x+cw*3.5,box.y+box.height*550/800,{steps:6});
 assert.equal(await p.locator('.tw-ghost').count(),1);await p.mouse.up();
 assert.equal(await p.locator('.tw-ghost').count(),0);
 assert.deepEqual(await p.evaluate(()=>FF.ui.towerBattle().units.map(u=>[u.member,u.lane,u.col])),[['kenshi',3,3]]);
 await p.mouse.move(cb.x+cb.width/2,cb.y+cb.height/2);await p.mouse.down();await p.mouse.move(box.x+cw*7.5,box.y+box.height*250/800,{steps:6});await p.mouse.up();
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().units.length),1);   // 右の通り道には置けない
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();FF.tower.remove(bt,bt.units[0].id)});
 // 遠くの魔物には、仲間は何もしない（光る効果も、攻撃の音も、出ない）。射程に入ると、効果が出る
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();FF.tower.place(bt,'kenshi',0,1);bt.schedule.forEach(s=>{s.done=true});bt.schedule.push({at:1e6,wave:1,type:'cub',lane:0,done:false});
  bt.enemies.push({id:777,type:'cub',lane:0,x:8,hp:30,max:30,atk:1,interval:9,speed:0,cd:9,core:1})});
 await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>FF.ui.towerFx()),0);assert.equal(await p.evaluate(()=>FF.ui.towerBattle().enemies[0].hp),30);
 await p.evaluate(()=>{FF.ui.towerBattle().enemies[0].x=2.2});await p.waitForTimeout(200);
 assert.ok(await p.evaluate(()=>FF.ui.towerBattle().enemies[0].hp)<30);
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.enemies.length=0;FF.tower.remove(bt,bt.units[0].id)});
 // 並べて、早送りして、魔物と戦う様子を見る
 await p.mouse.click(box.x+cw*1.5,box.y+box.height*400/800);
 await p.locator('.tw-card[data-member="kenshi"]').click();await p.mouse.click(box.x+cw*2.5,box.y+box.height*400/800);
 await p.evaluate(()=>{FF.tower.run(FF.ui.towerBattle(),30)});await p.waitForTimeout(400);
 await p.screenshot({path:process.env.FF_SHOT2||'/tmp/tower1.png'});
 // 一時停止：止まる。つづけるで、動く
 await p.locator('[data-act="pause"]').click();const t0=await p.evaluate(()=>FF.ui.towerBattle().t);await p.waitForTimeout(500);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().t),t0);assert.equal(await p.locator('.tw-overlay.is-paused').count(),1);
 await p.locator('[data-act="resume"]').click();await p.waitForTimeout(500);
 assert.ok(await p.evaluate(()=>FF.ui.towerBattle().t)>t0);
 // 別の画面へ行くと、止まる。戻ると、つづけるか選ぶ
 await p.evaluate(()=>FF.ui.show('base'));await p.waitForTimeout(300);
 await p.locator('.facility-btn[data-facility="training"]').click();await p.waitForTimeout(300);
 assert.equal(await p.locator('.tw-overlay.is-paused').count(),1);
 await p.locator('[data-act="resume"]').click();
 // 負け：炉の熱が0になる。罰はなく、「もう一度」で、新しい戦い
 await p.evaluate(()=>{FF.ui.towerBattle().core.hp=1;const bt=FF.ui.towerBattle();bt.enemies.push({id:999,type:'cub',lane:0,x:0.45,hp:30,max:30,atk:1,interval:1,speed:5,cd:1,core:8});});
 await p.waitForTimeout(800);
 assert.equal(await p.locator('.tw-overlay.is-lose').count(),1);
 assert.equal(await p.evaluate(()=>FF.app.state.tower.wins),0);
 await p.screenshot({path:process.env.FF_SHOT3||'/tmp/tower2.png'});
 await p.locator('[data-act="again"]').click();await p.waitForTimeout(300);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().t<1),true);
 // 勝ち：早送りで、全部の波を終える（何も置かないと負けるので、強い仲間を並べる）。勝った記録が残る
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.schedule.forEach(s=>{s.done=true});bt.enemies.length=0;bt.schedule.push({at:1e6,wave:5,type:'cub',lane:0,done:true});});
 await p.waitForTimeout(800);
 assert.equal(await p.locator('.tw-overlay.is-win').count(),1);
 assert.equal(await p.evaluate(()=>FF.app.state.tower.wins),1);
 await p.screenshot({path:process.env.FF_SHOT4||'/tmp/tower3.png'});
 await p.locator('[data-act="leave"]').click();assert.equal(await p.evaluate(()=>FF.app.screen),'base');
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tower screen — start, canvas drawn, place/remove, pause, leave and resume, lose/again, win recorded');
})().catch(e=>{console.error(e);process.exit(1)});
