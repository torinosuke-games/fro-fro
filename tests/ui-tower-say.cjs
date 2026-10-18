// 夜の防衛戦：まちがえたときなどのお知らせが、「下げる」ボタンにかぶらない（判断471）。3つのスマホの大きさで、お知らせの枠が、下げるボタンと重ならず、ボタンを押せる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 for(const [w,h] of [[390,844],[375,667],[360,640]]){
  const p=await b.newPage({viewport:{width:w,height:h}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;FF.ui.show('tower');});
  await p.waitForTimeout(300);await p.locator('[data-act="start"]').click();await p.waitForTimeout(500);
  await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.light=500;FF.tower.place(bt,'kenshi',2,3)});
  const box=await p.locator('canvas').first().boundingBox(),sx=box.width/1440;
  await p.mouse.click(box.x+3.5*160*sx,box.y+400*sx);await p.waitForTimeout(150);
  assert.equal(await p.locator('[data-act="remove"]').count(),1);
  // まちがえた：問題を出して、「わからない」
  await p.locator('[data-act="quiz"]').click();await p.waitForTimeout(300);
  await p.locator('.modal .actions button, .modal button').filter({hasText:'わからない'}).first().click();await p.waitForTimeout(250);
  const r=await p.evaluate(()=>{const t=document.querySelector('.toast'),m=document.querySelector('[data-act="remove"]');return t&&m?{t:t.getBoundingClientRect().toJSON(),m:m.getBoundingClientRect().toJSON(),txt:t.innerText}:null});
  assert.ok(r,'お知らせが出る：'+w+'x'+h);
  const overlap=!(r.t.right<=r.m.left||r.t.left>=r.m.right||r.t.bottom<=r.m.top||r.t.top>=r.m.bottom);
  assert.ok(!overlap,`お知らせと下げるボタンが重ならない ${w}x${h} ${JSON.stringify(r)}`);
  assert.ok(r.t.top>=0&&r.t.bottom<=h&&r.t.left>=0&&r.t.right<=w);
  await p.screenshot({path:process.env.FF_SHOT_DIR?path.join(process.env.FF_SHOT_DIR,`say-${w}.png`):`/tmp/say-${w}.png`});
  // 下げるボタンが、お知らせの出ているあいだも、押せる
  await p.locator('[data-act="remove"]').click();await p.waitForTimeout(150);
  assert.equal(await p.evaluate(()=>FF.ui.towerBattle().units.length),0);
  assert.deepEqual(errors,[]);await p.close();
 }
 await b.close();console.log('PASS: tower say — notice does not cover the remove button on 3 phone sizes');
})().catch(e=>{console.error(e);process.exit(1)});
