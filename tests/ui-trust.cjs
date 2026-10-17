// 住民の信頼と特別な依頼（判断440）：file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{let s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.name='ゆき';s.player.avatar='e1';s.adventure.started=true;s=FF.quests.today(s,FF.app.now());s.quests.trust={baker:5,hunter:3};s=FF.quests.today(s,FF.app.now());s.resources.food=99;FF.app.state=s;FF.ui.show('base');});
 await p.waitForTimeout(400);
 await p.locator('.facility-btn[data-facility="tavern"]').click();
 // 特別な依頼が、いちばん上に出る（トム・ロクの1つ目。画面には最大2件）
 assert.deepEqual(await p.locator('.qt-card.is-special').evaluateAll(l=>l.map(e=>e.dataset.quest)),['sp:baker-1','sp:hunter-1']);
 assert.equal(await p.locator('.qt-card').first().getAttribute('data-quest'),'sp:baker-1');
 assert.ok((await p.locator('.qt-card.is-special').first().innerText()).includes('パン生地'));   // 物語
 assert.ok((await p.locator('.qt-card.is-special').first().innerText()).includes('特別な依頼'));
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.screenshot({path:process.env.FF_SHOT||'/tmp/trust1.png'});
 // 受ける→渡す→報告。感謝のことば（トムの吹き出し）と、信頼が「親友」になった知らせ・次の特別な依頼の知らせ
 const sp=p.locator('.qt-card[data-quest="sp:baker-1"]');
 await sp.locator('[data-act="accept"]').click();
 await p.locator('.qt-card[data-quest="sp:baker-1"] [data-act="deliver"]').click();
 await p.locator('.qt-card[data-quest="sp:baker-1"] [data-act="claim"]').click();
 const says=await p.locator('.qt-body > .qt-girl .qt-bubble').allInnerTexts();
 assert.ok(says[0].includes('パン')&&says[0].includes('ふっくら'),says[0]);
 assert.ok(says[1].includes('親友')&&says[1].includes('特別な依頼'),says[1]);
 assert.equal(await p.evaluate(()=>FF.quests.trustOf(FF.app.state,'baker')),8);
 await p.waitForTimeout(500);await p.screenshot({path:process.env.FF_SHOT2||'/tmp/trust2.png'});
 // 次の特別な依頼（トムの2つ目）が出ている。終えた1つ目は出ない
 assert.ok(await p.locator('.qt-card[data-quest="sp:baker-2"]').count()===1);
 assert.equal(await p.locator('.qt-card[data-quest="sp:baker-1"]').count(),0);
 // 「住民の信頼」のタブ：6人。トムは「親友」、ロクは「仲良し」
 await p.locator('.qt-tab[data-tab="trust"]').click();
 assert.equal(await p.locator('.qt-trust-row').count(),6);
 assert.equal(await p.locator('.qt-trust-row[data-who="baker"]').getAttribute('data-level'),'2');
 assert.equal(await p.locator('.qt-trust-row[data-who="hunter"]').getAttribute('data-level'),'1');
 assert.equal(await p.locator('.qt-trust-row[data-who="elder"]').getAttribute('data-level'),'0');
 assert.ok((await p.locator('.qt-trust-row[data-who="baker"]').innerText()).includes('親友'));
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.screenshot({path:process.env.FF_SHOT3||'/tmp/trust3.png'});
 // 日替わりの依頼のカードにも、住民の信頼の段階が出る
 await p.locator('.qt-tab[data-tab="board"]').click();
 assert.ok(await p.locator('.qt-card:not(.is-special) .qt-level').count()>=3);
 await p.locator('.overlay .btn').click();
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: trust, special quests (story, thanks, level-up notice, next unlock), trust tab');
})().catch(e=>{console.error(e);process.exit(1);});
