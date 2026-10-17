// 夜の防衛戦の BGM：戦っているあいだ、戦闘の曲が流れる。問題・一時停止のあいだは、曲を止めずに小さくする（最初に戻らない）。終わったら止まる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined,args:['--autoplay-policy=no-user-gesture-required']});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route(/https:\/\/fonts\./,r=>r.abort());
 await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;s.adventure.subject='math';s.adventure.difficulty='basic';s.settings.bgm=true;s.settings.bgmVolume='mid';FF.app.state=s;FF.ui.show('tower');});
 await p.waitForTimeout(300);
 const vol=()=>p.evaluate(()=>{const a=FF.bgm.audio('battle');return a?{paused:a.paused,v:Math.round(a.volume*100)/100,t:a.currentTime}:null});
 await p.locator('[data-act="start"]').click();
 await p.waitForFunction(()=>{const a=FF.bgm.audio('battle');return a&&!a.paused&&a.volume>0.2;},null,{timeout:10000});
 await p.evaluate(()=>{FF.bgm.audio('battle').currentTime=30});
 // 問題を開く：曲は続き（止まらない・最初に戻らない）、小さくなる
 await p.locator('[data-act="quiz"]').click();
 await p.waitForFunction(()=>{const a=FF.bgm.audio('battle');return !a.paused&&a.volume<0.12;},null,{timeout:10000});
 let s=await vol();assert.equal(s.paused,false);assert.ok(s.t>=30,'曲は、最初に戻らない');
 // 答えて戦場にもどる：大きさがもどる。曲は、続きから
 await p.evaluate(()=>{FF.answer.judge=()=>({correct:true})});
 await p.locator('.tw-quiz-choice').first().click();
 await p.waitForFunction(()=>{const a=FF.bgm.audio('battle');return !a.paused&&a.volume>0.2;},null,{timeout:10000});
 s=await vol();assert.ok(s.t>=30,'続きから');
 // 一時停止でも、小さくして続ける
 await p.locator('[data-act="pause"]').click();
 await p.waitForFunction(()=>{const a=FF.bgm.audio('battle');return !a.paused&&a.volume<0.12;},null,{timeout:10000});
 await p.locator('[data-act="resume"]').click();
 await p.waitForFunction(()=>FF.bgm.audio('battle').volume>0.2,null,{timeout:10000});
 // 戦いが終わると止まる
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.schedule.forEach(s=>{s.done=true});bt.enemies.length=0;bt.schedule.push({at:1e6,wave:5,type:'cub',lane:0,done:true})});
 await p.waitForFunction(()=>FF.bgm.audio('battle').paused,null,{timeout:10000});
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tower BGM — plays in battle, quieter (not restarted) during quiz and pause, stops at the end');
})().catch(e=>{console.error(e);process.exit(1)});
