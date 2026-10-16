// 酒場の依頼クエスト（判断436）：file:// で、実際の画面を確かめる
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.name='ゆき';s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;FF.ui.show('base');});
 await p.waitForTimeout(500);
 await p.locator('.facility-btn[data-facility="tavern"]').click();
 assert.equal(await p.locator('.overlay h2').innerText(),'酒場');
 // 看板娘の絵が読め、依頼が3件（納品・討伐・学習）
 assert.ok(await p.locator('.qt-portrait').evaluate(i=>i.complete&&i.naturalWidth>0));
 assert.deepEqual(await p.locator('.qt-card').evaluateAll(l=>l.map(e=>e.dataset.kind)),['deliver','hunt','study']);
 assert.ok((await p.locator('.qt-bubble').innerText()).includes('いらっしゃい'));
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.screenshot({path:process.env.FF_SHOT||'/tmp/quest1.png'});
 // 受ける前は進みぐあいが出ない。受けると出る
 const d=p.locator('.qt-card[data-kind="deliver"]');
 assert.equal(await d.locator('.qt-progress').count(),0);
 await d.locator('[data-act="accept"]').click();
 assert.equal(await p.locator('.qt-card[data-kind="deliver"] .qt-progress').count(),1);
 // 資材が足りないと渡せない。足りると渡せて、報告できる
 assert.equal(await p.locator('.qt-card[data-kind="deliver"] [data-act="deliver"]').isDisabled(),true);
 const q=await p.evaluate(()=>FF.app.state.quests.board[0]);
 await p.evaluate((q)=>{const s=FF.util.clone(FF.app.state);s.resources[q.target]=q.need;FF.app.commit(s);},q);
 await p.evaluate(()=>FF.ui.openTavern());
 await p.locator('.qt-card[data-kind="deliver"] [data-act="deliver"]').click();
 // 達成のお知らせ（判断437）。酒場のアイコンに「!」の目印（報告できる依頼があるあいだ）
 assert.ok((await p.locator('.toast').innerText()).includes('達成'));
 await p.locator('.overlay .btn').click();await p.evaluate(()=>FF.ui.show('base'));await p.waitForTimeout(300);
 assert.equal(await p.locator('.facility-btn[data-facility="tavern"] .facility-badge').count(),1);
 await p.locator('.facility-btn[data-facility="tavern"]').click();
 const g0=await p.evaluate(()=>FF.shop.gold(FF.app.state));
 await p.locator('.qt-card[data-kind="deliver"] [data-act="claim"]').click();
 assert.equal(await p.evaluate(()=>FF.shop.gold(FF.app.state)),g0+q.reward.gold);
 assert.ok((await p.locator('.toast').innerText()).includes('G'));   // 報酬の中身も、お知らせに出る

 assert.ok((await p.locator('.qt-card[data-kind="deliver"]').getAttribute('class')).includes('is-claimed'));
 // 学習・討伐は、ボタンがなく「受けた」と出る（受ける→進める は、Q-3 で、学習・戦闘とつなぐ）
 await p.locator('.qt-card[data-kind="hunt"] [data-act="accept"]').click();
 assert.ok((await p.locator('.qt-card[data-kind="hunt"] .qt-state').innerText()).includes('受けた'));
 await p.screenshot({path:process.env.FF_SHOT2||'/tmp/quest2.png'});
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.locator('.overlay .btn').click();assert.equal(await p.locator('.overlay').count(),0);
 await p.evaluate(()=>FF.ui.show('base'));await p.waitForTimeout(300);
 assert.equal(await p.locator('.facility-badge').count(),0);   // 報告をすませたら、目印は消える
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tavern opens, 3 quests, accept/deliver/claim, gold paid');
})().catch(e=>{console.error(e);process.exit(1);});
