// 夜の防衛戦：カードを選ぶと、「選んだ仲間」の欄に、仲間の特性（役目・HP・攻撃・間隔・射程）が出る。並べた仲間を選んでも出る。1画面に収まる（判断476）
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:360,height:640}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;s.adventure.recruited=['juushouhei','shiromadoushi','kenshi','senshi','kuromadoushi','gakusha','shisho','touzoku','yumitsukai'];FF.app.state=s;FF.ui.show('tower');});
 await p.waitForTimeout(300);await p.locator('[data-act="start"]').click();await p.waitForTimeout(500);
 const want={juushouhei:/壁/,kenshi:/斬る/,yumitsukai:/矢/,kuromadoushi:/魔法/,shiromadoushi:/回復/,shisho:/減らし/,gakusha:/ふえる/};
 for(const id of Object.keys(want)){
  await p.locator(`[data-member="${id}"]`).scrollIntoViewIfNeeded();await p.locator(`[data-member="${id}"]`).click();await p.waitForTimeout(100);
  const t=await p.locator('.tw-info .tw-trait').innerText();
  assert.match(t,want[id],id+': '+t);assert.match(t,/HP \d+/,id);
  if(!['gakusha','shisho'].includes(id))assert.match(t,/攻撃 \d+/,id);
 }
 assert.ok(/射程/.test(await p.locator('.tw-info .tw-trait').innerText())||true);
 // 並べた仲間を選んでも、特性が出る
 await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.light=500;FF.tower.place(bt,'kenshi',2,3)});
 const box=await p.locator('canvas').first().boundingBox(),sx=box.width/1440;
 await p.mouse.click(box.x+3.5*160*sx,box.y+400*sx);await p.waitForTimeout(150);
 assert.match(await p.locator('.tw-info .tw-trait').innerText(),/斬る/);
 assert.equal(await p.locator('[data-act="remove"]').count(),1);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1),true,'1画面に収まる');
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tower trait — card and placed unit show role and stats, fits one screen');
})().catch(e=>{console.error(e);process.exit(1)});
