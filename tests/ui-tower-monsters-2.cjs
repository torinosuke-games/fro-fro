// 夜の防衛戦の、難しさ6以降の魔物（判断462）：吹雪の鳥・氷の盾兵・霜の魔女・氷竜が、絵つきで出て、わざの効果が出る
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;FF.ui.show('tower');});
 await p.waitForTimeout(300);await p.locator('[data-act="start"]').click();await p.waitForTimeout(500);
 await p.evaluate(()=>{const bt=FF.ui.towerBattle(),B=FF.balance.TOWER;bt.light=999;bt.schedule.forEach(s=>{s.done=true});bt.schedule.push({at:1e6,wave:1,type:'cub',lane:0,done:false});
  FF.tower.place(bt,'juushouhei',1,3);FF.tower.place(bt,'kenshi',2,3);FF.tower.place(bt,'kenshi',3,3);FF.tower.place(bt,'shiromadoushi',3,1);FF.tower.place(bt,'kenshi',4,2);FF.tower.place(bt,'juushouhei',4,4);
  const mk=(id,type,lane,x)=>{const t=B.ENEMIES[type];return {id,type,lane,x,hp:t.hp,max:t.hp*2,atk:t.atk,interval:t.interval,speed:t.speed*0.01,cd:0.2,core:t.core,sk:0.2,guard:t.guard||0}};
  bt.enemies.push(mk(901,'bird',3,2.0),mk(902,'shield',2,3.6),mk(903,'witch',1,6.5),mk(904,'dragon',4,8))});
 const seen={};
 for(let i=0;i<40;i++){await p.waitForTimeout(60);const k=await p.evaluate(()=>FF.ui.towerBattle().fxLog.map(f=>f.kind));k.forEach(x=>seen[x]=1);await p.screenshot({path:'/tmp/mon2-'+String(i).padStart(2,'0')+'.png',clip:{x:0,y:50,width:390,height:330}});}
 for(const k of ['bolt','gust','breath']) assert.ok(seen[k],k+' が出た');
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: d6+ monsters on screen —',Object.keys(seen).join(','));
})().catch(e=>{console.error(e);process.exit(1)});
