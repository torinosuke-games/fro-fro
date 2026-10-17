// 夜の防衛戦：6本の道（試作。判断458）。いちばん下の道にも、押して・ドラッグして置ける。背景・炉が、つなぎ足されて出る
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;FF.ui.show('tower');});
 await p.waitForTimeout(300);
 assert.equal(await p.locator('.tw-pick select').nth(1).evaluate(e=>[...e.options].map(o=>o.value).join()),'5,6,7');
 await p.locator('.tw-pick select').nth(1).selectOption('6');await p.locator('[data-act="start"]').click();await p.waitForTimeout(800);
 const box=await p.locator('.tw-canvas').boundingBox();
 assert.ok(Math.abs(box.height/box.width-950/1440)<0.01,'canvas is 1440x950');
 const cw=box.width/9,laneY=[100,250,400,550,705,855],pt=l=>box.y+box.height*laneY[l]/950;
 // 押して置く（いちばん下の道＝6本目）
 await p.locator('.tw-card[data-member="kenshi"]').click();await p.mouse.click(box.x+cw*2.5,pt(5));
 assert.deepEqual(await p.evaluate(()=>FF.ui.towerBattle().units.map(u=>[u.lane,u.col])),[[5,2]]);
 // ドラッグで置く（5本目）
 const cb=await p.locator('.tw-card[data-member="kenshi"]').boundingBox();
 await p.mouse.move(cb.x+cb.width/2,cb.y+cb.height/2);await p.mouse.down();await p.mouse.move(box.x+cw*3.5,pt(4),{steps:6});await p.mouse.up();
 assert.deepEqual(await p.evaluate(()=>FF.ui.towerBattle().units.map(u=>[u.lane,u.col]).sort()),[[4,3],[5,2]]);
 // 6本目に、魔物が出る（出る道は、0〜5）
 assert.ok(await p.evaluate(()=>FF.ui.towerBattle().schedule.every(s=>s.lane>=0&&s.lane<=5)));
 await p.screenshot({path:process.env.FF_SHOT||'/tmp/lanes6-ui.png',clip:{x:0,y:50,width:390,height:330}});
 // もう一度でも、6本のまま。5本に戻して始めると、5本
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.core.hp=1;bt.enemies.push({id:999,type:'cub',lane:0,x:0.45,hp:30,max:30,atk:1,interval:1,speed:5,cd:1,core:8})});
 await p.waitForTimeout(800);await p.locator('[data-act="again"]').click();await p.waitForTimeout(300);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().lanes),6);
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tower 6 lanes — placeable on the 6th lane, drag, canvas 1440x950, again keeps 6');
})().catch(e=>{console.error(e);process.exit(1)});
