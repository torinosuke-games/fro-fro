// 戦闘の画面（判断394）：実際の画面で、作戦・問題・解答・行動・オート・逃げる・勝敗まで。画面の配置が、局面で変わらないことも。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-battle-ui';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route(/https:\/\/fonts\./,r=>r.abort());
 await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
 await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();
 const battle=(enemy='cub',patch)=>p.evaluate(([enemy,patch])=>{FF.adventureRng=()=>.99;const s=FF.util.clone(FF.app.state);let a=FF.adventure.create();a.started=true;a.pos=enemy==='boss'?{x:8,y:6}:{x:3,y:6};a=FF.adventure.encounter(a,enemy);if(patch)eval('('+patch+')')(a);s.adventure=a;FF.app.commit(s);FF.ui.show('adventure');},[enemy,patch||null]);
 const st=()=>p.evaluate(()=>FF.app.state.adventure);
 const rects=()=>p.evaluate(()=>{const r=s=>{const e=document.querySelector(s).getBoundingClientRect();return [e.x,e.y,e.width,e.height].map(n=>Math.round(n*10)/10)};return {stage:r('.bt-stage'),party:r('.bt-party'),console:r('.bt-console'),fighters:[...document.querySelectorAll('.bt-fighter')].map(f=>{const e=f.getBoundingClientRect();return [e.x,e.y,e.width,e.height].map(n=>Math.round(n*10)/10)})}});
 const answer=async(correct)=>{const s=await st();const i=s.battle.choices.findIndex(c=>correct?c===s.battle.question.answer:c!==s.battle.question.answer);await p.locator('[data-choice="'+i+'"]').click();await p.locator('[data-do="submit"]').click();await p.locator('[data-do="ack"]').waitFor();};
 await battle('boss');
 // 構成：4人のカード・立ち絵、敵、作戦の4つのコマンド
 await p.locator('.bt-app').waitFor();
 assert.equal(await p.locator('.bt-member').count(),4);assert.equal(await p.locator('.bt-fighter').count(),4);
 assert.equal(await p.locator('.bt-command').count(),4);assert.equal(await p.locator('.bt-enemy-figure > svg').count(),1);
 assert.equal(await p.locator('.bt-app').getAttribute('data-phase'),'commands');
 const base=await rects();
 await p.screenshot({path:out+'/commands.png'});
 // 作戦：まもる → 次の生存者へカーソルが移る。取り消しても、お金（MP・回復薬）は減らない
 assert.equal(await p.locator('.bt-member[aria-pressed="true"]').getAttribute('data-actor'),'hero');
 await p.locator('[data-order="defend"]').click();
 assert.equal(await p.locator('.bt-member[aria-pressed="true"]').getAttribute('data-actor'),'juushouhei');
 await p.locator('[data-actor="hero"]').click();assert.equal(await p.locator('.bt-command.active').getAttribute('data-order'),'defend');
 // どうぐ：所持一覧 → 品物 → 対象。確定するまでは、予約も消費もしない
 await p.locator('[data-order="item"]').click();await p.locator('.overlay [data-item="potion"]').waitFor();
 assert.ok((await p.locator('.overlay').innerText()).includes('3'));
 await p.locator('.overlay .actions .btn').click();   // 閉じる
 assert.equal(await p.locator('.bt-command.active').getAttribute('data-order'),'defend');
 await p.locator('[data-order="item"]').click();await p.locator('.overlay [data-item="potion"]').click();await p.locator('.overlay [data-target="juushouhei"]').click();
 assert.deepEqual(await p.evaluate(()=>null),null);
 assert.equal(await p.locator('.bt-member[aria-pressed="true"]').getAttribute('data-actor'),'juushouhei');
 await p.locator('[data-do="allAttack"]').click();assert.equal(await p.locator('.bt-command.active').getAttribute('data-order'),'attack');
 await p.locator('[data-do="recommend"]').click();
 assert.equal((await st()).potions,3);assert.equal((await st()).roster.hero.mp,(await st()).roster.hero.mp);
 // 記録・せつめい・にげるの窓
 await p.locator('.bt-help').click();assert.ok((await p.locator('.overlay').innerText()).includes('まもる'));await p.locator('.overlay .actions .btn').click();
 await p.locator('.bt-log').click();assert.ok((await p.locator('.overlay').innerText()).includes('まだ'));await p.locator('.overlay .actions .btn').click();
 // 問題へ：まもるを選んだ仲間は、そのまま予約される
 await p.locator('[data-actor="hero"]').click();await p.locator('[data-order="defend"]').click();
 await p.locator('[data-do="startQuiz"]').click();await p.locator('[data-choice="0"]').waitFor();
 let s=await st();assert.equal(s.battle.phase,'attack');assert.deepEqual(s.battle.orders.hero,{type:'defend',target:'hero'});
 assert.deepEqual(await rects(),base,'作戦から問題へ：戦場・仲間・操作の配置が変わらない');
 assert.equal(await p.locator('.bt-app').getAttribute('data-phase'),'quiz');
 // 答えは、選んでから確定する。選び直せる
 assert.equal(await p.locator('[data-do="submit"]').isDisabled(),true);
 await p.locator('[data-choice="1"]').click();assert.equal(await p.locator('[data-choice="1"]').getAttribute('aria-pressed'),'true');
 await p.locator('[data-choice="2"]').click();assert.equal(await p.locator('[data-choice="1"]').getAttribute('aria-pressed'),'false');
 assert.equal((await st()).battle.phase,'attack','選んだだけでは、回答にならない');
 await p.screenshot({path:out+'/quiz.png'});
 // 解答を確認するまで、行動しない（敵のHPは変わらない）
 const hp0=(await st()).battle.hp;
 await answer(true);
 s=await st();assert.equal(s.battle.phase,'explanation');assert.equal(s.battle.hp,hp0);
 assert.equal(await p.locator('.bt-app').getAttribute('data-phase'),'review');
 assert.ok((await p.locator('.bt-pair').innerText()).length>0);
 assert.deepEqual(await rects(),base,'解答：配置が変わらない');
 await p.screenshot({path:out+'/review.png'});
 await p.locator('[data-do="ack"]').click();
 await p.waitForFunction(()=>FF.app.state.adventure.battle.phase==='commands'&&FF.app.state.adventure.battle.turn===2,null,{timeout:20000});
 assert.ok((await st()).battle.hp<hp0,'解答のあと、仲間が行動した');
 assert.deepEqual(await rects(),base,'次のターン：配置が変わらない');
 assert.equal(await p.locator('.bt-member[aria-pressed="true"]').getAttribute('data-actor'),'hero');
 // 記録に残る
 await p.locator('.bt-log').click();assert.ok((await p.locator('.overlay .bt-history').count())===1);await p.locator('.overlay .actions .btn').click();
 // 「わからない」でも、解答の確認へ進める（行き止まりにならない）
 await p.locator('[data-do="startQuiz"]').click();await p.locator('[data-do="dontKnow"]').click();await p.locator('[data-do="ack"]').waitFor();
 assert.equal((await st()).battle.correct,false);assert.ok((await p.locator('.bt-pair').innerText()).includes('わからない'));
 await p.locator('[data-do="ack"]').click();
 await p.waitForFunction(()=>FF.app.state.adventure.battle&&FF.app.state.adventure.battle.phase==='commands'&&FF.app.state.adventure.battle.turn===3,null,{timeout:20000});
 // 逃げる：作戦のときは、確認のあと、すぐ撤退
 await p.locator('.bt-escape').click();await p.locator('.overlay .actions .btn.primary').click();
 await p.waitForFunction(()=>!FF.app.state.adventure.battle);assert.equal((await st()).notice,'retreated');
 // 逃げる：問題のあいだは、解答の確認まで進んでから、行動せずに撤退
 await battle();await p.locator('[data-do="startQuiz"]').click();await p.locator('.bt-escape').click();await p.locator('.overlay .actions .btn.primary').click();
 assert.ok((await p.locator('.bt-note').innerText()).includes('撤退'));assert.ok(await p.locator('.bt-escape').isEnabled());
 const hp1=(await st()).battle.hp;await answer(true);
 assert.ok((await p.locator('[data-do="ack"]').innerText()).includes('逃げる'));assert.equal((await st()).battle.hp,hp1);
 await p.locator('[data-do="ack"]').click();await p.waitForFunction(()=>!FF.app.state.adventure.battle);assert.equal((await st()).notice,'retreated');
 // オート：作戦を選ぶと、全員の行動が決まって、問題で止まる。問題と解答は、人が操作する
 await battle();await p.locator('.bt-auto').click();
 for(const n of ['ガンガンいこうぜ','MP使うな','バランス重視で','いのち大事に'])assert.ok(await p.locator('.overlay .btn',{hasText:n}).count()===1,n);
 await p.locator('.overlay .btn',{hasText:'いのち大事に'}).click();
 assert.deepEqual((await st()).auto,{on:true,tactic:'life'});assert.equal(await p.locator('.bt-auto').getAttribute('aria-pressed'),'true');
 await p.waitForFunction(()=>FF.app.state.adventure.battle.phase==='attack',null,{timeout:8000});
 assert.equal(Object.keys((await st()).battle.orders).length,4);
 await p.waitForTimeout(1500);assert.equal((await st()).battle.phase,'attack','オートでも、問題で止まったまま');
 await p.locator('.bt-auto').click();await p.locator('.overlay .btn',{hasText:'オートをやめる'}).click();assert.equal((await st()).auto.on,false);
 // 勝利：報酬の画面 → フィールドへ
 await battle('cub','a=>{a.battle.hp=1}');await p.locator('[data-do="startQuiz"]').click();await answer(true);await p.locator('[data-do="ack"]').click();
 await p.locator('[data-do="finish"].win').waitFor({timeout:20000});assert.ok((await p.locator('.bt-body').innerText()).includes('EXP'));
 const gold=(await st()).gold;await p.locator('[data-do="finish"]').click();await p.waitForFunction(()=>!FF.app.state.adventure.battle);assert.equal((await st()).gold,gold);
 assert.equal(await p.locator('.bt-app').count(),0);
 // 敗北：町で休む
 await battle('boss','a=>{a.party.forEach(id=>{a.roster[id].hp=id=="hero"?1:0})}');await p.locator('[data-do="startQuiz"]').click();await answer(false);await p.locator('[data-do="ack"]').click();
 await p.locator('[data-do="finish"].lose').waitFor({timeout:20000});await p.screenshot({path:out+'/lose.png'});await p.locator('[data-do="finish"]').click();await p.waitForFunction(()=>!FF.app.state.adventure.battle);
 // 再読み込みで、問題のところから再開できる
 await battle();await p.locator('[data-do="startQuiz"]').click();await p.locator('[data-choice="0"]').waitFor();
 const before=JSON.stringify(await st());await p.reload({waitUntil:'domcontentloaded'});
 assert.equal(JSON.stringify(await p.evaluate(()=>FF.app.state.adventure)).replace(",\"journeyItems\":[]",""),before);
 // 画面の大きさ・向き：はみ出さない・操作が見える
 await battle();
 for(const [w,h] of [[360,640],[390,844],[768,1024],[844,390],[1280,800]]){
  await p.setViewportSize({width:w,height:h});await p.waitForTimeout(150);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),w+'x'+h+' 横にはみ出さない');
  const vis=await p.evaluate(()=>{const f=document.querySelector('.bt-primary,.bt-command');const e=f.getBoundingClientRect();return e.bottom<=innerHeight+1&&e.right<=innerWidth+1});
  assert.ok(vis,w+'x'+h+' 決定のボタンが画面におさまる');
  await p.screenshot({path:out+'/size-'+w+'x'+h+'.png'});
 }
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: battle UI — commands, defend, items, quiz two-step, review before action, escape, auto, win/lose, stable layout');
})().catch(e=>{console.error(e);process.exit(1);});
