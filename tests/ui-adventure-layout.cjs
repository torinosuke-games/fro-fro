// Real browser: geometry and mounted scenery stay stable across every battle phase.
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-battle-layout';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium'});
 try{
  const page=await browser.newPage({viewport:{width:911,height:884},reducedMotion:'no-preference'}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//,r=>r.abort());
  await page.goto(process.env.FF_TEST_URL||'http://127.0.0.1:8773/preview/',{waitUntil:'domcontentloaded'});
  await page.addStyleTag({content:'.adv-rpg-shell.is-hurt{animation:none!important}'});   // 揺れ（判断346）は、配置の比較からはずす
  await page.locator('.title-card input').fill('ゆき');await page.locator('.title-card .btn.primary').click();await page.getByRole('button',{name:'小学4年',exact:true}).click();await page.locator('.avatar-pick').first().click();await page.locator('.intro-line + button').click();
  for(const [width,height] of [[360,640],[390,844],[768,1024],[911,884]]){
   await page.setViewportSize({width,height});
   await page.evaluate(()=>{let p=FF.adventure.create();p.started=true;p.pos={x:8,y:6};p=FF.adventure.encounter(p,'boss');p.battle.turn=2;FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));FF.ui.show('adventure');window.sceneNode=document.querySelector('.adv-rpg-shell');window.stageNode=document.querySelector('.adv-battle-stage');window.enemyNode=document.querySelector('.adv-enemy-art');});
   const measure=()=>page.evaluate(()=>{
    const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return [r.x,r.y+scrollY,r.width,r.height].map(n=>Math.round(n*100)/100);};
    const shell=document.querySelector('.adv-rpg-shell'),s=getComputedStyle(shell);
    return {shell:rect('.adv-rpg-shell'),stats:rect('.adv-rpg-stats'),stage:rect('.adv-battle-stage'),panel:rect('.adv-command-panel'),menu:rect('.adv-command-menu'),dialogue:rect('.adv-command-dialogue'),background:[s.backgroundImage,s.backgroundSize,s.backgroundPosition],transform:'(揺れは判断346で戻した。配置の比較には使わない)',same:shell===sceneNode&&document.querySelector('.adv-battle-stage')===stageNode};
   });
   const baseline=await measure();
   const menuPositions=()=>page.locator('.adv-command-menu .adv-command').evaluateAll(nodes=>nodes.map(node=>{const r=node.getBoundingClientRect();return [r.x,r.y+scrollY,r.width,r.height].map(n=>Math.round(n*100)/100);}));
   const initialButtons=await menuPositions();
   async function check(phase){assert.deepEqual(await measure(),baseline,`Stable frame at ${width}px: ${phase}`);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));if(!await page.locator('.adv-subcommand-menu').count())assert.deepEqual(await menuPositions(),initialButtons,`Stable command buttons: ${phase}`);}
   await page.getByRole('button',{name:'まほう',exact:true}).click();await check('magic submenu');await page.getByRole('button',{name:'もどる',exact:true}).click();
   await page.getByRole('button',{name:'どうぐ',exact:true}).click();await page.locator('.adv-subcommand-menu .adv-command').first().click();await check('target submenu');await page.getByRole('button',{name:'もどる',exact:true}).click();await page.getByRole('button',{name:'もどる',exact:true}).click();
   async function quiz(){for(let i=0;i<4;i++)await page.getByRole('button',{name:'たたかう',exact:true}).click();await page.locator('.adv-quiz-dialog[open]').waitFor();}
   await quiz();await check('question open');await page.keyboard.press('Escape');await check('question closed');await page.locator('.adv-open-quiz').click();await page.evaluate(()=>window.quizNode=document.querySelector('.adv-quiz-dialog'));
   const index=await page.evaluate(()=>FF.app.state.adventure.battle.choices.indexOf(FF.app.state.adventure.battle.question.answer));await page.locator('.adv-answer').nth(index).click();await check('explanation');assert.ok(await page.evaluate(()=>document.querySelector('.adv-quiz-dialog')===quizNode&&quizNode.open),'Modal stays open across answer and explanation');
   await page.getByRole('button',{name:'戦闘へ戻る',exact:true}).click();await check('attack declaration');
   assert.ok(await page.evaluate(()=>document.querySelector('.adv-enemy-art')===enemyNode),'Enemy image stays mounted');
   await page.waitForFunction(()=>FF.app.state.adventure.battle.phase==='enemyAction');await check('all-party retaliation');
   assert.equal(await page.locator('.adv-retaliation-panel .adv-action-message').count(),5);
   if(width===911)await page.screenshot({path:out+'/retaliation-tablet.png',fullPage:true});
   await page.waitForFunction(()=>FF.app.state.adventure.battle.phase==='commands');await check('next turn');
   await page.evaluate(()=>{let p=FF.util.clone(FF.app.state.adventure);p.battle.hp=1;FF.app.commit(Object.assign({},FF.app.state,{adventure:p}));});
   await quiz();const correct=await page.evaluate(()=>FF.app.state.adventure.battle.choices.indexOf(FF.app.state.adventure.battle.question.answer));await page.locator('.adv-answer').nth(correct).click();await page.getByRole('button',{name:'戦闘へ戻る',exact:true}).click();
   assert.equal(await page.locator('.adv-enemy-art').count(),1,'Final attack still gets its hit animation');
   await page.locator('.adv-victory-panel').waitFor();await check('victory');
   assert.equal(await page.locator('.adv-enemy-art,.adv-enemy-nameplate,.adv-intent').count(),0,'Defeated enemy is gone');
   if(width===911)await page.screenshot({path:out+'/victory-tablet.png',fullPage:true});
  }
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',checks:'stable geometry/background and retained scene nodes at 360/390/768/911px; command/submenu/quiz/explanation/attack/full-party retaliation/next turn/victory; final hit then enemy removal',screenshots:out},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
