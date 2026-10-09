// Real browser: continuous walking/camera, explanation before attacks, automatic retaliation.
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'), fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-motion-qa';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium'});
 try {
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//,r=>r.abort());
  await page.goto(process.env.FF_TEST_URL||'http://127.0.0.1:8769/preview/',{waitUntil:'domcontentloaded'});
  await page.locator('.title-card input').fill('ゆき');await page.locator('.title-card .btn.primary').click();
  await page.getByRole('button',{name:'小学4年',exact:true}).click();await page.locator('.avatar-pick').first().click();await page.locator('.intro-line + button').click();
  await page.waitForFunction(()=>['snow-world.webp','snow-battle.webp','snow-enemies.webp','travelers/e1.webp'].every(path=>performance.getEntriesByType('resource').some(r=>r.name.endsWith(path))));
  const preloaded=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>/adventure\/.*\.webp$/.test(r.name)).map(r=>({url:r.name,bytes:r.encodedBodySize,start:r.startTime})));
  assert.equal(preloaded.length,4);assert.ok(preloaded.every(r=>r.bytes<650000));
  await page.getByRole('button',{name:'雪原へ出発',exact:true}).click();
  async function chooseAll() {
   const alive=await page.evaluate(()=>FF.adventure.alive(FF.app.state.adventure));
   assert.equal(await page.getByRole('button',{name:'クイズで行動する',exact:true}).count(),0);
   assert.equal(await page.locator('.adv-order-chip').count(),0);
   for (let i=0;i<alive.length;i++) {
    assert.equal(await page.locator('.adv-status[aria-pressed="true"]').getAttribute('aria-label'), (alive[i]==='hero'?'ゆき':{gan:'ガン',rin:'リン',sora:'ソラ'}[alive[i]])+'の行動を選ぶ');
    assert.equal(await page.locator('.adv-quiz-dialog').count(),0);
    await page.getByRole('button',{name:'たたかう',exact:true}).click();
    assert.equal(await page.evaluate(()=>FF.app.state.adventure.battle.phase),i===alive.length-1?'attack':'commands');
   }
   assert.equal(await page.locator('.adv-quiz-dialog').count(),1);
  }
  // Trace every browser frame. The same map stays mounted throughout the route.
  await page.evaluate(()=>{
   const p=FF.util.clone(FF.app.state.adventure);p.pos={x:3,y:2};p.notice='';FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));FF.ui.rerender();
  });
  await page.waitForTimeout(100);
  await page.evaluate(()=>{
   const hero=document.querySelector('.adv-traveler'), viewport=document.querySelector('.adv-map-viewport');window.motionFrames=[];let started=false,remaining=12;
   function sample(){started=started||hero.classList.contains('is-walking');if(started)window.motionFrames.push({same:hero===document.querySelector('.adv-traveler'),left:parseFloat(hero.style.left),camera:viewport.scrollLeft,leg:getComputedStyle(hero.querySelector('.adv-walk-leg-left')).transform,walking:hero.classList.contains('is-walking')});if(!started||hero.classList.contains('is-walking')||--remaining>0)requestAnimationFrame(sample);}requestAnimationFrame(sample);
  });
  await page.locator('.adv-tile[data-x="7"][data-y="2"]').click();
  await page.waitForTimeout(170);await page.screenshot({path:out+'/walking-phone.png',fullPage:true});
  await page.waitForFunction(()=>FF.app.state.adventure.pos.x===7);
  const frames=await page.evaluate(()=>motionFrames);
  assert.ok(frames.every(f=>f.same),'No tile-by-tile DOM replacement');
  const walking=frames.filter(f=>f.walking);assert.ok(walking.length>8, JSON.stringify(frames));assert.ok(new Set(walking.map(f=>f.leg)).size>5,'Feet animate');
  const deltas=walking.slice(1).map((f,i)=>f.left-walking[i].left);
  assert.ok(deltas.every(d=>d>=0&&d<2),'Position changes smoothly without tile jumps');
  assert.ok(new Set(walking.map(f=>f.camera)).size>5,'Camera interpolates');
  await page.waitForFunction(()=>!document.querySelector('.adv-traveler').classList.contains('is-walking'));
  assert.equal(await page.locator('.adv-walk-leg-left').evaluate(el=>getComputedStyle(el).animationName),'none');
  // Switch screens during movement: no delayed logical step or encounter.
  await page.getByRole('button',{name:'西へ',exact:true}).click();await page.waitForTimeout(80);
  await page.getByRole('button',{name:'町の画面へ',exact:true}).click();await page.waitForTimeout(400);
  assert.equal(await page.evaluate(()=>FF.app.screen),'base');assert.deepEqual(await page.evaluate(()=>FF.app.state.adventure.pos),{x:1,y:6});
  await page.getByRole('button',{name:'冒険のつづき',exact:true}).click();
  await page.locator('.adv-tile[data-x="3"][data-y="6"]').click();await page.waitForFunction(()=>!!FF.app.state.adventure.battle);
  await chooseAll();await page.locator('.adv-quiz-dialog[open]').waitFor();
  const before=await page.evaluate(()=>JSON.stringify(FF.app.state.adventure));await page.keyboard.press('Escape');assert.equal(await page.locator('.adv-quiz-dialog').evaluate(d=>d.open),false);
  await page.locator('.adv-open-quiz').click();assert.equal(await page.evaluate(()=>JSON.stringify(FF.app.state.adventure)),before);
  await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>!!document.activeElement.closest('.adv-quiz-dialog')));
  // Real long question + diagram: only question content scrolls.
  await page.evaluate(()=>{
   const p=FF.util.clone(FF.app.state.adventure),q=Object.values(FF.app.bank.byId).find(q=>q.subject==='math'&&q.gradeLevel===4&&q.answerType==='choice'&&q.diagram);
   p.battle.question=FF.util.clone(q);p.battle.question.question=Array(10).fill(q.question).join('\n');p.battle.choices=q.choices.slice();
   FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));FF.ui.rerender();
  });
  for(const [width,height] of [[360,640],[390,844],[768,900],[1440,1000]]){
   await page.setViewportSize({width,height});await page.locator('.adv-quiz-dialog[open]').waitFor();
   const layout=await page.evaluate(()=>{const d=document.querySelector('.adv-quiz-dialog'),s=d.querySelector('.adv-question-scroll'),r=d.getBoundingClientRect(),a=d.querySelector('.adv-choices').getBoundingClientRect();return {top:r.top,bottom:r.bottom,controls:a.bottom,overflow:s.scrollHeight>s.clientHeight,pageScroll:scrollY,horizontal:document.documentElement.scrollWidth>innerWidth};});
   assert.ok(layout.top>=0&&layout.bottom<=height&&layout.controls<=height&&layout.overflow);assert.equal(layout.pageScroll,0);assert.equal(layout.horizontal,false);
  }
  await page.setViewportSize({width:390,height:844});
  const b=await page.evaluate(()=>FF.app.state.adventure.battle);
  await page.locator('.adv-answer').nth(b.choices.indexOf(b.question.answer)).click();await page.locator('.adv-feedback').waitFor({state:'visible'});
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.battle.hp),b.hp,'No damage during explanation');
  assert.equal(await page.locator('.adv-enemy-art.is-hit').count(),0);
  await page.screenshot({path:out+'/explanation-phone.png',fullPage:true});
  await page.getByRole('button',{name:'戦闘へ戻る',exact:true}).click();
  const events=await page.evaluate(()=>FF.app.state.adventure.battle.log);
  assert.equal(await page.locator('.adv-enemy-hp').innerText(),'HP '+b.hp+' / 95','Visible HP stays unchanged during declaration');
  assert.equal(await page.locator('.adv-battle-log').count(),0,'Results are not dumped together');
  await page.evaluate(()=>{window.actionFrames=[];const node=document.querySelector('.adv-action-message');window.actionWatcher=new MutationObserver(()=>actionFrames.push({message:node.textContent,hp:document.querySelector('.adv-enemy-hp').textContent,blink:document.querySelector('.adv-enemy-art').classList.contains('is-hit')}));actionWatcher.observe(node,{childList:true,subtree:true});});
  await page.waitForFunction(()=>document.querySelector('.adv-enemy-art').classList.contains('is-hit'));
  const animation=await page.locator('.adv-enemy-art').evaluate(el=>{const a=el.getAnimations().find(a=>a.animationName==='adv-hit');return a&&{duration:a.effect.getTiming().duration,zeroes:a.effect.getKeyframes().filter(k=>Number(k.opacity)===0).length,damage:Number(el.dataset.damage)};});
  assert.ok(animation);assert.equal(animation.zeroes,2);assert.equal(animation.damage,events[0].amount);
  await page.waitForFunction(()=>document.querySelector('.adv-action-message').textContent.includes('ダメージ'));
  assert.equal(await page.locator('.adv-enemy-hp').innerText(),'HP '+(b.hp-events[0].amount)+' / 95');
  const attackFont=await page.locator('.adv-action-message').evaluate(el=>getComputedStyle(el).fontSize);
  await page.screenshot({path:out+'/attack-phone.png',fullPage:true});
  await page.waitForFunction(()=>FF.app.state.adventure.battle.phase==='enemyAction');
  const actionFrames=await page.evaluate(()=>{actionWatcher.disconnect();return actionFrames;});
  assert.equal(actionFrames.filter(f=>f.message.includes('ダメージ')).length,4);
  assert.ok(actionFrames.some(f=>f.message.includes('ゆきの攻撃'))&&actionFrames.some(f=>f.message.includes('リンの攻撃')));
  assert.ok(await page.locator('.adv-hit-flash').evaluate(el=>el.getAnimations().some(a=>a.animationName==='adv-hit-flash')));
  assert.equal(await page.locator('.adv-quiz-dialog').count(),0);assert.equal(await page.locator('.adv-status.is-damaged').count(),1);
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.answered),1);
  assert.equal(await page.locator('.adv-retaliation-panel .adv-action-message').last().evaluate(el=>getComputedStyle(el).fontSize),attackFont);
  assert.ok((await page.locator('.adv-retaliation-panel').innerText()).includes('ダメージ'));
  assert.equal(await page.locator('.adv-battle-log').count(),0);
  await page.screenshot({path:out+'/retaliation-phone.png',fullPage:true});
  await page.waitForFunction(()=>FF.app.state.adventure.battle.phase==='commands');
  // A second retaliation must start a new animation, not reuse an ended one.
  await page.evaluate(()=>{const p=FF.util.clone(FF.app.state.adventure);p.battle.hp=95;FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));});
  await chooseAll();await page.locator('.adv-quiz-dialog[open]').waitFor();
  const wrongIndex=await page.evaluate(()=>FF.app.state.adventure.battle.choices.findIndex(c=>c!==FF.app.state.adventure.battle.question.answer));
  await page.locator('.adv-answer').nth(wrongIndex).click();await page.getByRole('button',{name:'戦闘へ戻る',exact:true}).click();
  await page.waitForFunction(()=>FF.app.state.adventure.battle.phase==='enemyAction');
  const flash=await page.locator('.adv-hit-flash').evaluate(el=>{
    const a=el.getAnimations().find(a=>a.animationName==='adv-hit-flash');if(!a)return null;
    const time=a.currentTime;a.pause();a.currentTime=0;const start=Number(getComputedStyle(el).opacity);a.currentTime=110;const dim=Number(getComputedStyle(el).opacity);a.currentTime=time;a.play();return {time,start,dim};
  });
  assert.ok(flash&&flash.time<550&&flash.start>flash.dim,'Second hit flashes without moving the frame');
  assert.equal(await page.locator('.adv-rpg-shell').evaluate(el=>el.getAnimations().some(a=>a.animationName==='adv-party-shake')),true,'Hit shakes the whole frame (decision 346)');
  assert.equal(await page.locator('.adv-quiz-dialog').count(),0);
  await page.waitForFunction(()=>FF.app.state.adventure.battle.phase==='commands');
  await page.emulateMedia({reducedMotion:'reduce'});
  await chooseAll();await page.locator('.adv-quiz-dialog[open]').waitFor();
  const index=await page.evaluate(()=>FF.app.state.adventure.battle.choices.indexOf(FF.app.state.adventure.battle.question.answer));await page.locator('.adv-answer').nth(index).click();
  await page.evaluate(()=>{Math.random=()=>0;});
  await page.getByRole('button',{name:'戦闘へ戻る',exact:true}).click();
  assert.equal(await page.locator('.adv-enemy-art').evaluate(el=>getComputedStyle(el).animationName),'none');
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.battle.phase),'win');
  assert.equal(await page.locator('.adv-quiz-dialog').count(),0,'Victory is inline, not a popup');
  await page.locator('.adv-command-panel.adv-result.win').waitFor({state:'visible'});
  assert.equal(await page.locator('.adv-victory-panel .adv-command-menu').count(),1);
  assert.equal(await page.locator('.adv-enemy-art,.adv-enemy-nameplate').count(),0,'Enemy disappears at victory');
  assert.ok((await page.locator('.adv-victory-panel .adv-reward').innerText()).includes('勝利'));
  assert.equal(await page.locator('.adv-victory-panel .adv-reward').count(),1);
  assert.equal(await page.locator('.adv-battle-log').count(),0);
  assert.ok(await page.locator('.adv-loot-chest').isVisible());
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.gold),27);
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.potions),4);
  await page.screenshot({path:out+'/victory-chest-phone.png',fullPage:true});
  for(const width of [360,768,1440]) {await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  await page.getByRole('button',{name:'旅をつづける',exact:true}).click();
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.gold),27,'Treasure is credited exactly once');
  // One available potion cannot be reserved twice; submenu back never confirms a choice.
  await page.evaluate(()=>{const p=FF.adventure.depart(FF.app.state.adventure,'home');p.pos={x:2,y:6};p.potions=1;const n=FF.adventure.move(p,3,6);FF.app.commit(Object.assign({},FF.app.state,{adventure:n}));FF.ui.rerender();});
  await page.getByRole('button',{name:'まほう',exact:true}).click();
  assert.equal(await page.locator('.adv-subcommand-menu').count(),1);
  await page.getByRole('button',{name:'もどる',exact:true}).click();
  assert.equal(await page.locator('.adv-status[aria-pressed="true"]').getAttribute('aria-label'),'ゆきの行動を選ぶ');
  await page.getByRole('button',{name:'どうぐ',exact:true}).click();await page.locator('.adv-subcommand-menu .adv-command').first().click();
  await page.getByRole('button',{name:'もどる',exact:true}).click();
  assert.equal(await page.locator('.adv-subcommand-menu .adv-command').first().innerText(),'回復薬 × 1');
  await page.locator('.adv-subcommand-menu .adv-command').first().click();await page.locator('.adv-subcommand-menu .adv-command').first().click();
  assert.ok(await page.getByRole('button',{name:'どうぐ',exact:true}).isDisabled());
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.potions),1);
  await page.getByRole('button',{name:'にげる',exact:true}).click();
  // A solo party goes directly from its one command to its one question.
  await page.evaluate(()=>{let p=FF.adventure.setParty(FF.adventure.depart(FF.app.state.adventure,'home'),['hero']);p.pos={x:2,y:6};p=FF.adventure.move(p,3,6);FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));FF.ui.rerender();});
  assert.equal(await page.evaluate(()=>FF.app.state.adventure.party.length),1);
  await chooseAll();await page.locator('.adv-quiz-dialog[open]').waitFor();
  assert.equal(await page.locator('.adv-quiz-dialog').count(),1);

  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',frames:walking.length,checks:'continuous camera, moving feet, cancellation, dialog focus, long diagrams at four widths, explanation before damage, two blinks, automatic retaliation and repeated flash without moving the layout, per-character declaration/blink/damage, combined victory and treasure, preloaded lightweight artwork, one question per turn, reduced motion',screenshots:out},null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
