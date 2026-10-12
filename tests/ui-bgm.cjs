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
 let s=await st();assert.equal(s.loop,true);assert.ok(/^bgm-town\.(ogg|m4a)$/.test(s.src),s.src);assert.ok(s.vol<=0.3);
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
 // 保存の読み込みで、ない設定は、オン・ふつうに補われる
 assert.deepEqual(await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);delete s.settings.bgm;delete s.settings.bgmVolume;const r=FF.state.normalize?FF.state.normalize(s):s;return [r.settings.bgm!==false];}),[true]);
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: town BGM loops on the town screen, stops elsewhere/off, volume setting');
})().catch(e=>{console.error(e);process.exit(1);});
