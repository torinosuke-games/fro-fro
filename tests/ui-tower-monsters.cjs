// 夜の防衛戦の新しい魔物（判断455）：氷の精霊が仲間を凍らせ、雪の巨人が壁役を殴る。絵が読める
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;FF.ui.show('tower');});
 await p.waitForTimeout(300);await p.locator('[data-act="start"]').click();await p.waitForTimeout(500);
 // 氷の精霊と雪の巨人を、仲間のいる道に出す
 await p.evaluate(()=>{const bt=FF.ui.towerBattle(),B=FF.balance.TOWER;bt.light=999;bt.schedule.forEach(s=>{s.done=true});bt.schedule.push({at:1e6,wave:1,type:'cub',lane:0,done:false});
  FF.tower.place(bt,'kenshi',1,4);FF.tower.place(bt,'juushouhei',3,4);FF.tower.place(bt,'kenshi',1,3);
  const mk=(id,type,lane,x)=>{const t=B.ENEMIES[type];return {id,type,lane,x,hp:t.hp,max:t.hp,atk:t.atk,interval:t.interval,speed:t.speed*0.01,cd:0.2,core:t.core,sk:0}};
  bt.enemies.push(mk(801,'spirit',1,6.6),mk(802,'giant',3,5.2))});
 await p.waitForTimeout(500);
 assert.ok(await p.evaluate(()=>FF.ui.towerBattle().units.some(u=>u.frozen>0)),'凍る');
 await p.screenshot({path:process.env.FF_SHOT||'/tmp/monsters1.png',clip:{x:0,y:50,width:390,height:260}});
 const g=await p.evaluate(()=>FF.ui.towerBattle().units.find(u=>u.member==='juushouhei'));
 await p.waitForTimeout(1500);
 assert.ok(await p.evaluate(()=>FF.ui.towerBattle().units.find(u=>u.member==='juushouhei').hp)<g.hp,'巨人が殴る');
 assert.ok(await p.evaluate(()=>FF.ui.towerFx())>=0);
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: new monsters on screen — ice spirit freezes, snow giant smashes the wall');
})().catch(e=>{console.error(e);process.exit(1)});
