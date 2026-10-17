// 夜の防衛戦 T-4（判断446）：問題で灯・今夜の襲撃と報酬（1日3回まで）・練習は報酬なし
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;s.adventure.subject='math';s.adventure.difficulty='basic';FF.app.state=s;FF.ui.show('tower');});
 await p.waitForTimeout(400);
 // はじまり：今夜の襲撃（Lv1・あと3回・報酬の見本）と練習
 assert.ok((await p.locator('.tw-raid').innerText()).includes('あと3回'));assert.ok((await p.locator('.tw-raid .tw-reward').innerText()).includes('+160 G'));   // はじめて勝つ難しさ＝ゴールド2倍
 await p.screenshot({path:process.env.FF_SHOT||'/tmp/tower-raid0.png'});
 await p.locator('[data-act="raid"]').click();await p.waitForTimeout(400);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().mode),'raid');
 // 問題：戦場が止まる。正解で灯が増え、しばらく次の問題を出せない
 const L0=await p.evaluate(()=>FF.ui.towerBattle().light);
 await p.evaluate(()=>{FF.__judge=FF.answer.judge;FF.answer.judge=()=>({correct:true})});
 await p.locator('[data-act="quiz"]').click();assert.equal(await p.locator('.tw-quiz-choice').count(),4);
 await p.screenshot({path:process.env.FF_SHOT2||'/tmp/tower-quiz.png'});
 const t0=await p.evaluate(()=>FF.ui.towerBattle().t);await p.waitForTimeout(400);assert.equal(await p.evaluate(()=>FF.ui.towerBattle().t),t0);
 await p.locator('.tw-quiz-choice').first().click();
 assert.equal(await p.locator('.overlay').count(),0);
 assert.ok(await p.evaluate((L0)=>FF.ui.towerBattle().light>=L0+8,L0));
 assert.equal(await p.locator('[data-act="quiz"]').isDisabled(),true);
 assert.ok((await p.locator('[data-act="quiz"]').innerText()).includes('あと'));
 assert.ok(await p.evaluate(()=>FF.app.state.adventure.recent.length)>=1);
 assert.equal(await p.evaluate(()=>FF.app.state.player.heat||0),0);   // 熱量は入らない
 // 待ったあとは、また出せる。まちがえると、灯は増えない
 await p.evaluate(()=>{FF.ui.towerBattle().quizLock=0});await p.waitForTimeout(300);
 const L1=await p.evaluate(()=>FF.ui.towerBattle().light);
 await p.evaluate(()=>{FF.answer.judge=()=>({correct:false})});
 await p.locator('[data-act="quiz"]').click();await p.locator('.tw-quiz-choice').first().click();
 assert.ok(await p.evaluate((L1)=>FF.ui.towerBattle().light<L1+2,L1));
 assert.ok(await p.evaluate(()=>FF.ui.towerBattle().quizLock>5));
 // 「やめる」：何も起きず、戦場が動く
 await p.evaluate(()=>{FF.ui.towerBattle().quizLock=0});await p.waitForTimeout(300);
 await p.locator('[data-act="quiz"]').click();await p.locator('.overlay .btn:has-text("やめる")').click();
 assert.equal(await p.locator('.overlay').count(),0);assert.equal(await p.evaluate(()=>FF.ui.towerBattle().quizLock),0);
 // 勝つ（今夜の襲撃）：報酬（ゴールド160＝はじめて勝つ難しさの2倍）。回数が1回ふえる
 const win=async()=>{await p.evaluate(()=>{const bt=FF.ui.towerBattle();bt.schedule.forEach(s=>{s.done=true});bt.enemies.length=0;bt.schedule.push({at:1e6,wave:5,type:'cub',lane:0,done:true})});await p.waitForTimeout(800)};
 const g0=await p.evaluate(()=>FF.app.state.adventure.gold);
 await win();
 assert.ok((await p.locator('.tw-gain').innerText()).includes('報酬をもらった'));
 assert.equal(await p.evaluate(()=>FF.app.state.adventure.gold),g0+160);
 assert.equal(await p.evaluate(()=>FF.app.state.tower.rewards),1);
 await p.screenshot({path:process.env.FF_SHOT3||'/tmp/tower-raid1.png'});
 // もう一度（襲撃）：2回目は、ゴールド80（はじめてではない）
 await p.locator('[data-act="again"]').click();await p.waitForTimeout(300);assert.equal(await p.evaluate(()=>FF.ui.towerBattle().mode),'raid');
 await win();assert.equal(await p.evaluate(()=>FF.app.state.adventure.gold),g0+160+80);
 await p.locator('[data-act="again"]').click();await p.waitForTimeout(300);await win();
 assert.equal(await p.evaluate(()=>FF.app.state.tower.rewards),3);
 // 4回目からは、報酬なし（襲撃は練習になる）
 await p.locator('[data-act="again"]').click();await p.waitForTimeout(300);
 assert.equal(await p.evaluate(()=>FF.ui.towerBattle().mode),'practice');
 const g3=await p.evaluate(()=>FF.app.state.adventure.gold);await win();
 assert.equal(await p.evaluate(()=>FF.app.state.adventure.gold),g3);assert.ok((await p.locator('.tw-overlay').innerText()).includes('練習'));
 await p.locator('[data-act="leave"]').click();assert.equal(await p.evaluate(()=>FF.app.screen),'base');
 // はじまりの画面は、「もうもらった」。あしたになると、もどる
 await p.evaluate(()=>FF.ui.show('tower'));await p.waitForTimeout(300);assert.ok((await p.locator('.tw-raid').innerText()).includes('もうもらった'));
 await p.screenshot({path:process.env.FF_SHOT4||'/tmp/tower-raid2.png'});
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: tower T-4 — quiz lights (stops field, lock, wrong, cancel), raid rewards (first x2, 3 per day, then none), practice has none');
})().catch(e=>{console.error(e);process.exit(1)});
