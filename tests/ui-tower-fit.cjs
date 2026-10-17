// 夜の防衛戦：戦っているあいだ、スマホ（小さい画面）でも、上下にスクロールせずに1画面に収まる。いちばん上の道のゲージが見える
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 for(const [w,h] of [[390,844],[375,667],[360,640]]){
  const p=await b.newPage({viewport:{width:w,height:h}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;FF.ui.show('tower');});
  await p.waitForTimeout(300);await p.locator('[data-act="start"]').click();await p.waitForTimeout(500);
  // いちばん上の道に、HP が減った仲間と魔物を置く
  await p.evaluate(()=>{const bt=FF.ui.towerBattle();FF.tower.place(bt,'kenshi',0,2);bt.units[0].hp=bt.units[0].max/2;bt.enemies.push({id:900,type:'boss',lane:0,x:6,hp:150,max:300,atk:1,interval:9,speed:0,cd:9,core:1});});
  await p.waitForTimeout(300);
  const m=await p.evaluate(()=>({sh:document.documentElement.scrollHeight,ih:innerHeight,nav:document.getElementById('nav').hidden,strip:getComputedStyle(document.querySelector('#hud .resource-strip')).display,mast:document.querySelector('#hud .masthead').getBoundingClientRect().height,
   cards:document.querySelector('.tw-cards').getBoundingClientRect().bottom,top:document.querySelector('.tw-top').getBoundingClientRect().top}));
  assert.ok(m.sh<=m.ih+1,`${w}x${h}: scrollHeight ${m.sh} > ${m.ih}`);assert.equal(m.nav,true);assert.equal(m.strip,'none');assert.ok(m.mast>30,'masthead stays');assert.ok(m.cards<=m.ih&&m.top>=0);
  await p.screenshot({path:`/tmp/tower-fit-${w}x${h}.png`});
  // 勝ったら、ナビはもどる
  await p.evaluate(()=>{FF.ui.show('base')});await p.waitForTimeout(200);assert.equal(await p.evaluate(()=>document.getElementById('nav').hidden),false);
  assert.deepEqual(errors,[]);await p.close();
 }
 await b.close();console.log('PASS: tower battle fits one screen on 390x844, 375x667, 360x640 (no scroll, masthead stays, resource strip and nav hidden)');
})().catch(e=>{console.error(e);process.exit(1)});
