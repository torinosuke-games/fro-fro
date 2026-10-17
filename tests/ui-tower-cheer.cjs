// 夜の防衛戦：住民の応援（判断456）。恩人になった町の人が、はじまりの画面に出て、戦闘中も顔が出る。矢・手当ての知らせが出る。小さい画面でも1画面に収まる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 for(const [w,h] of [[390,844],[360,640]]){
  const p=await b.newPage({viewport:{width:w,height:h}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;FF.app.state=FF.quests.today(s,FF.app.now());
   const t=FF.util.clone(FF.app.state);t.quests.trust={baker:15,woodcutter:15,hunter:15,nurse:15,child:3,elder:15};FF.app.state=t;FF.ui.show('tower');});
  await p.waitForTimeout(300);
  // はじまり：恩人の5人だけ（リコは仲良し）が、効果つきで出る
  assert.deepEqual(await p.locator('.tw-cheer-row').evaluateAll(l=>l.map(e=>e.dataset.who)),['baker','woodcutter','hunter','nurse','elder']);
  assert.ok((await p.locator('.tw-cheer-row[data-who="hunter"]').innerText()).includes('猟師のロク'));
  if(w===390)await p.screenshot({path:process.env.FF_SHOT||'/tmp/cheer0.png'});
  await p.locator('[data-act="start"]').click();await p.waitForTimeout(500);
  assert.equal(await p.locator('.tw-cheer-face').count(),5);
  // はじめの灯（トム）・炉の熱（バルト）。戦いを進めると、猟師の矢と看護の手当ての知らせが出る
  const m=await p.evaluate(()=>{const bt=FF.ui.towerBattle(),B=FF.balance.TOWER;return {light:bt.light>=B.LIGHT.START+B.CHEER.baker.light&&bt.light<B.LIGHT.START+B.CHEER.baker.light+3,core:bt.core.max===B.CORE_HP+B.CHEER.elder.core}});
  assert.deepEqual(m,{light:true,core:true});
  await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.schedule.forEach(s=>{s.done=true});bt.schedule.push({at:1e6,wave:1,type:'cub',lane:0,done:false});
   const t=FF.balance.TOWER.ENEMIES.cub;bt.enemies.push({id:900,type:'cub',lane:2,x:6,hp:t.hp*9,max:t.hp*9,atk:0,interval:9,speed:0,cd:9,core:1});FF.tower.run(bt,FF.balance.TOWER.CHEER.hunter.every+0.1)});
  await p.waitForTimeout(300);
  assert.ok((await p.locator('.toast').first().innerText()).includes('ロクの矢'));
  assert.ok(await p.evaluate(()=>FF.ui.towerBattle().enemies[0].hp<FF.balance.TOWER.ENEMIES.cub.hp*9));
  // 1画面に収まる（スクロールしない）
  assert.ok(await p.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1),`${w}x${h} scroll`);
  if(w===390)await p.screenshot({path:'/tmp/cheer1.png'});
  assert.deepEqual(errors,[]);await p.close();
 }
 await b.close();console.log('PASS: tower cheer — supporters (trust 恩人) listed, start light/core bonus, arrow/heal events, fits one screen');
})().catch(e=>{console.error(e);process.exit(1)});
