// 町のBGM（判断411）：町の画面で、audio/bgm-town.ogg がループで鳴り、ほかの画面・オフ・タブを隠すと止まる。音量を変えると大きさが変わる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined,args:['--autoplay-policy=no-user-gesture-required']});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route(/https:\/\/fonts\./,r=>r.abort());
 await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
 await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();
 const st=()=>p.evaluate(()=>{const a=FF.bgm.audio();return a?{paused:a.paused,loop:a.loop,vol:Math.round(a.volume*100)/100,src:a.src.split('/').pop(),t:a.currentTime}:null;});
 // 町の画面：流れる・ループ
 await p.evaluate(()=>FF.ui.show('base'));
 await p.waitForFunction(()=>{const a=FF.bgm.audio();return a&&!a.paused&&a.volume>0.2;},null,{timeout:10000});
 let s=await st();assert.equal(s.loop,true);assert.ok(/^bgm-town\.(ogg|mp4)$/.test(s.src),s.src);assert.ok(s.vol<=0.3);
 // ほかの画面：止まる
 await p.evaluate(()=>FF.ui.show('settings'));
 await p.waitForFunction(()=>FF.bgm.audio().paused,null,{timeout:10000});
 // 設定：大きさ・オフ
 assert.ok(await p.locator('button',{hasText:'小さい'}).count()>=1,'音楽の大きさの選択');
 await p.locator('button',{hasText:'大きい'}).first().click();
 assert.equal(await p.evaluate(()=>FF.app.state.settings.bgmVolume),'high');
 await p.evaluate(()=>FF.ui.show('base'));
 await p.waitForFunction(()=>{const a=FF.bgm.audio();return !a.paused&&a.volume>0.45;},null,{timeout:10000});
 await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.settings.bgm=false;FF.app.commit(s);FF.ui.show('base');});
 await p.waitForFunction(()=>FF.bgm.audio().paused,null,{timeout:10000});
 // 町の曲を50秒まで進めてから、フィールドへ移る（フィールドから町へ戻ったら、町の曲は最初から）
 await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.settings.bgm=true;FF.app.commit(s);FF.ui.show('base');});
 await p.waitForFunction(()=>{const a=FF.bgm.audio('town');return !a.paused&&a.volume>0.05;},null,{timeout:10000});
 await p.evaluate(()=>{FF.bgm.audio('town').currentTime=50;});
 // フィールド：別の曲（bgm-field）が流れ、町の曲は止まる。戦闘中は止まる。音量は、町と同じ設定
 await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.settings.bgm=true;s.settings.bgmVolume='mid';s.adventure.started=true;s.adventure.battle=null;FF.app.commit(s);FF.ui.show('adventure');});
 await p.waitForFunction(()=>{const a=FF.bgm.audio('field');return a&&!a.paused&&a.volume>0.2;},null,{timeout:10000});
 assert.ok(/^bgm-field\.(ogg|mp4)$/.test(await p.evaluate(()=>FF.bgm.audio('field').src.split('/').pop())));
 assert.equal(await p.evaluate(()=>FF.bgm.audio('field').loop),true);
 assert.ok(await p.evaluate(()=>FF.bgm.audio('town').paused),'町の曲は止まる');
 assert.ok(await p.evaluate(()=>FF.bgm.audio('field').volume)<=0.3,'音量は町と同じ設定（ふつう）');
 await p.evaluate(()=>{FF.bgm.audio('field').currentTime=40;});
 await p.evaluate(()=>{FF.adventureRng=()=>.99;const s=FF.util.clone(FF.app.state);let a=FF.adventure.create();a.started=true;a.pos={x:3,y:6};a=FF.adventure.encounter(a,'cub');s.adventure=a;FF.app.commit(s);FF.ui.show('adventure');});
 await p.waitForFunction(()=>FF.bgm.audio('field').paused,null,{timeout:10000});   // 戦闘中は止まる
 // 戦闘から戻ったら、フィールドの曲は、最初から（町の曲は、続き）
 assert.ok(await p.evaluate(()=>FF.bgm.audio('field').currentTime)<0.5,'戦闘で止めたあと、曲の頭に戻っている');
 await p.evaluate(()=>{const a=FF.bgm.audio('field');const s=FF.util.clone(FF.app.state);s.adventure.battle=null;FF.app.commit(s);FF.ui.show('adventure');});
 await p.waitForFunction(()=>{const a=FF.bgm.audio('field');return !a.paused&&a.volume>0.05;},null,{timeout:10000});
 assert.ok(await p.evaluate(()=>FF.bgm.audio('field').currentTime)<39,'戦闘から戻っても、続きではなく、最初から');
 await p.evaluate(()=>FF.ui.show('base'));
 await p.waitForFunction(()=>{const a=FF.bgm.audio('town');return !a.paused&&a.volume>0.2;},null,{timeout:10000});
 await p.waitForFunction(()=>FF.bgm.audio('field').paused,null,{timeout:10000});
 assert.ok(await p.evaluate(()=>FF.bgm.audio('town').currentTime)<10,'フィールドから町へ移ったら、町の曲は最初から');
 // 戦闘の曲：戦闘が始まると流れる（ループ・音量は共通）。毎回の戦闘で、最初から
 await p.evaluate(()=>{FF.adventureRng=()=>.99;const s=FF.util.clone(FF.app.state);let a=FF.adventure.create();a.started=true;a.pos={x:3,y:6};a=FF.adventure.encounter(a,'cub');s.adventure=a;FF.app.commit(s);FF.ui.show('adventure');});
 await p.waitForFunction(()=>{const a=FF.bgm.audio('battle');return a&&!a.paused&&a.volume>0.2;},null,{timeout:10000});
 assert.ok(/^bgm-battle\.(ogg|mp4)$/.test(await p.evaluate(()=>FF.bgm.audio('battle').src.split('/').pop())));
 assert.equal(await p.evaluate(()=>FF.bgm.audio('battle').loop),true);
 assert.ok(await p.evaluate(()=>FF.bgm.audio('battle').volume)<=0.3,'音量は共通の設定');
 await p.evaluate(()=>{FF.bgm.audio('battle').currentTime=40;});
 await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.adventure.battle=null;FF.app.commit(s);FF.ui.show('adventure');});   // 戦闘が終わる
 await p.waitForFunction(()=>{const a=FF.bgm.audio('field');return !a.paused&&a.volume>0.05;},null,{timeout:10000});
 await p.waitForFunction(()=>FF.bgm.audio('battle').paused,null,{timeout:10000});
 await p.evaluate(()=>{FF.adventureRng=()=>.99;const s=FF.util.clone(FF.app.state);let a=FF.adventure.create();a.started=true;a.pos={x:3,y:6};a=FF.adventure.encounter(a,'cub');s.adventure=a;FF.app.commit(s);FF.ui.show('adventure');});   // 次の戦闘
 await p.waitForFunction(()=>{const a=FF.bgm.audio('battle');return !a.paused&&a.volume>0.05;},null,{timeout:10000});
 assert.ok(await p.evaluate(()=>FF.bgm.audio('battle').currentTime)<10,'次の戦闘も、最初から');
 // 保存の読み込みで、ない設定は、オン・ふつうに補われる
 assert.deepEqual(await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);delete s.settings.bgm;delete s.settings.bgmVolume;const r=FF.state.normalize?FF.state.normalize(s):s;return [r.settings.bgm!==false];}),[true]);
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: town/field BGM loop, switch by screen, stop in battle/elsewhere/off, shared volume');
})().catch(e=>{console.error(e);process.exit(1);});
