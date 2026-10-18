// 町の画面：工事中の建物は、絵の中ではなく、絵の下の「工事中」の一覧に出る（判断473）。終わる順・押すと建物の画面・工事がなければ欄ごと出ない・「学習する」は、その下
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:360,height:740}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 const open=n=>p.evaluate((n)=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';
  ['furnace','housing','lumber','mine','quarry','foodhall'].forEach(k=>s.buildings[k].level=5);const now=FF.app.now();
  if(n>=1)s.buildings.housing.construction={toLevel:6,startedAt:now,endsAt:now+4*3600e3};
  if(n>=2)s.buildings.furnace.construction={toLevel:6,startedAt:now,endsAt:now+8*3600e3};
  if(n>=3)s.buildings.foodhall.construction={toLevel:6,startedAt:now,endsAt:now+2*3600e3};
  FF.app.state=s;FF.ui.show('base');},n).then(async()=>{await p.waitForTimeout(500);for(let i=0;i<4&&await p.locator('.modal').count();i++){await p.locator('.modal button').first().click();await p.waitForTimeout(150);}});
 await open(0);assert.equal(await p.locator('.construction-list').count(),0);
 await open(3);
 assert.equal(await p.locator('.construction-list .cl-row').count(),3);
 assert.equal(await p.locator('.scene .map-construction').count(),0,'絵の中に工事中の箱を出さない');
 assert.deepEqual(await p.locator('.cl-row .cl-name').allInnerTexts(),['食料庫 Lv5','住宅 Lv5','中央炉 Lv5'],'終わる順');
 // 一覧は、絵のすぐ下、「学習する」は、その下
 const r=await p.evaluate(()=>{const l=document.querySelector('.construction-list').getBoundingClientRect(),s=document.querySelector('.scene').getBoundingClientRect(),c=document.querySelector('.home-start-mobile').getBoundingClientRect();return {sb:s.bottom,lt:l.top,lb:l.bottom,ct:c.top}});
 assert.ok(r.lt>=r.sb-1&&r.lt<r.sb+40&&r.ct>=r.lb-1,JSON.stringify(r));
 await p.locator('.cl-row').nth(1).click();await p.waitForTimeout(250);
 assert.ok((await p.locator('.modal').innerText()).includes('住宅'));
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: construction list under the town art — 3 rows by finish time, none in the art, tap opens the building, start button below');
})().catch(e=>{console.error(e);process.exit(1)});
