// 店主（武器屋・防具屋・道具屋。判断439）：吹き出しであいさつする。file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 const setup=(gold)=>p.evaluate((gold)=>{let s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.name='ゆき';s.player.avatar='e1';s=FF.shop.addGold(s,gold);FF.app.state=s;FF.ui.show('base');},gold);
 await setup(0);await p.waitForTimeout(400);
 const kinds=[['weapon','武器屋','いらっしゃい！ いい剣','足りない'],['armor','防具屋','いらっしゃい。丈夫','寂しい'],['item','道具屋','いらっしゃいませ','足りない']];
 for(const [id,title,hello,poor] of kinds){
  // ゴールドが0のときは、「足りない」あいさつ
  await p.locator('.facility-btn[data-facility="'+id+'"]').click();
  assert.equal(await p.locator('.overlay h2').innerText(),title);
  assert.ok(await p.locator('.qt-portrait').evaluate(i=>i.complete&&i.naturalWidth>0),id+' の顔の絵');
  assert.ok((await p.locator('.qt-bubble').innerText()).includes(title+'の店主'));
  assert.ok((await p.locator('.qt-bubble').innerText()).includes(poor),id+' poor: '+await p.locator('.qt-bubble').innerText());
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(id==='weapon')await p.screenshot({path:process.env.FF_SHOT||'/tmp/keeper-weapon.png'});
  await p.locator('.overlay .btn').click();
 }
 // ゴールドがあるときは、「いらっしゃい」。買うと「まいど」に変わる
 await setup(100000);await p.waitForTimeout(300);
 await p.locator('.facility-btn[data-facility="weapon"]').click();
 assert.ok((await p.locator('.qt-bubble').innerText()).includes(kinds[0][2]));
 await p.locator('.shop-buy').first().click();
 assert.ok((await p.locator('.qt-bubble').innerText()).includes('まいど'));
 await p.locator('.overlay .btn').click();
 await p.locator('.facility-btn[data-facility="item"]').click();
 assert.ok((await p.locator('.qt-bubble').innerText()).includes('いらっしゃいませ'));
 await p.locator('.shop-buy-1').click();
 assert.ok((await p.locator('.qt-bubble').innerText()).includes('ありがとう'));
 await p.waitForTimeout(700);await p.screenshot({path:process.env.FF_SHOT2||'/tmp/keeper-item.png'});
 await p.locator('.overlay .btn').click();
 // 酒場も、同じ形で顔の絵が出る
 await p.locator('.facility-btn[data-facility="tavern"]').click();
 assert.ok(await p.locator('.qt-portrait').evaluate(i=>i.complete&&i.naturalWidth>0));
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: keepers greet in speech bubbles (weapon/armor/item), bought/poor lines, tavern face');
})().catch(e=>{console.error(e);process.exit(1);});
