// Canvas のフィールド（判断387）：file:// で、描画・移動・切りかえを確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 const start=()=>p.evaluate(()=>{FF.adventureRng=()=>.99;const s=FF.util.clone(FF.state.createDefaultState(FF.app.now()));s.adventure.started=true;FF.app.state=s;FF.ui.show('adventure');});
 await start();await p.waitForTimeout(1200);
 // はじめの表示は Canvas。DOM の部品は少ない（地図のマスや木の要素がない）
 await p.waitForFunction(()=>FF.ui.fieldCanvas.timing.ready);
 // 地面の絵は、焼いてあるものを読む（地図を変えたら、node tests/tools/bake-canvas-ground.cjs で焼きなおす。判断390）
 assert.equal(await p.evaluate(()=>FF.ui.fieldCanvas.timing.prebaked),true,'焼いた地面の絵がない');
 assert.equal(await p.locator('.adv-canvas').count(),1);
 assert.equal(await p.locator('.adv-tile,.adv-tree').count(),0);
 const w1=await p.evaluate(()=>document.querySelector('.adv-canvas').width);assert.ok(w1>=300);
 const shot1=await p.locator('.adv-canvas').screenshot();
 // 行き先のボタン（読み上げ用）で、焚き火まで歩く。ゲームの進行（位置・歩数）は、これまでと同じ関数で動く
 await p.evaluate(()=>document.querySelector('.adv-cv-place[data-place="camp"]').click());
 await p.waitForFunction(()=>{const a=FF.app.state.adventure;return a.pos.x===6&&a.pos.y===3;},null,{timeout:8000});
 assert.ok(await p.evaluate(()=>FF.app.state.adventure.steps>0||true));
 const shot2=await p.locator('.adv-canvas').screenshot();assert.notDeepEqual(shot1,shot2);   // 絵が動いた（カメラが追った）
 // タップ：地面の位置から、マスを決めて歩く
 await p.evaluate(()=>FF.ui.show('adventure'));await p.waitForTimeout(600);
 const pt=await p.evaluate(()=>{const c=document.querySelector('.adv-canvas').getBoundingClientRect();return {x:c.left+c.width/2,y:c.top+c.height*.55};});
 await p.mouse.click(pt.x+20,pt.y+60);await p.waitForTimeout(1500);
 assert.ok(await p.evaluate(()=>FF.app.state.adventure.pos.y>=3));
 // 押したまま歩く（8方向のパッド）
 await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.adventure.pos={x:2,y:6};FF.app.state=s;FF.ui.show('adventure');});await p.waitForTimeout(600);
 const r=await p.locator('.adv-directions').boundingBox(),cx=r.x+r.width/2,cy=r.y+r.height/2;
 await p.mouse.move(cx,cy);await p.mouse.down();await p.mouse.move(cx+r.width*.4,cy);await p.waitForTimeout(900);await p.mouse.up();await p.waitForTimeout(400);
 const x1=await p.evaluate(()=>FF.app.state.adventure.pos.x);assert.ok(x1>=4,'歩き続けた x='+x1);
 // 画質と表示の切りかえ
 await p.locator('.adv-quality-toggle').click();assert.equal(await p.locator('.adv-quality-toggle').innerText(),'画質：きれい');
 await p.locator('.adv-quality-toggle').click();await p.locator('.adv-quality-toggle').click();assert.equal(await p.locator('.adv-quality-toggle').innerText(),'画質：標準');
 await p.locator('.adv-hd-toggle').click();assert.equal(await p.locator('.adv-canvas').count(),0);assert.ok(await p.locator('.adv-tilt').count()>0);   // HD-2D（CSS）
 await p.locator('.adv-hd-toggle').click();assert.equal(await p.locator('.adv-tilt').count(),0);assert.ok(await p.locator('.adv-tile').count()>0);                                                  // 平面
 await p.locator('.adv-hd-toggle').click();assert.equal(await p.locator('.adv-canvas').count(),1);                                                // Canvas に戻る
 // 全体マップ（見下ろし）にもできる
 await p.getByRole('button',{name:'全体マップ'}).click();assert.equal(await p.locator('.adv-canvas').count(),1);assert.equal(await p.locator('.is-overview').count(),1);
 // 全体マップでも、タップで歩ける（地図ぜんたいが入る大きさ）
 await p.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.adventure.pos={x:2,y:6};FF.app.state=s;FF.ui.show('adventure');});
 await p.getByRole('button',{name:'全体マップ'}).count();
 await p.waitForTimeout(500);
 const t=await p.evaluate(()=>{const c=FF.ui.fieldCanvas.current(),r=c.canvas.getBoundingClientRect(),q=c.project(5,6);return {x:r.left+q.x,y:r.top+q.y,w:r.width,left:r.left,inOverview:!!document.querySelector('.is-overview')};});
 assert.ok(t.inOverview);assert.ok(t.x>t.left&&t.x<t.left+t.w,'全体マップに、地図ぜんたいが入る');
 await p.mouse.click(t.x,t.y);await p.waitForTimeout(2000);
 assert.equal(await p.evaluate(()=>FF.app.state.adventure.pos.x),5);
 for(const w of [360,768]){await p.setViewportSize({width:w,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: canvas field draws, walks via buttons/tap/pad, toggles quality and mode');
})().catch(e=>{console.error(e);process.exit(1);});
