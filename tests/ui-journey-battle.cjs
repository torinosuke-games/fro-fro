// 広い雪原に従来の戦闘を入れた（判断501）：森を歩くと魔物に出会い、戦闘の画面になる。街道では出ない。負けると街で目を覚ます。仲間の帯・回復薬・大ボス
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');
const origin=process.env.FF_TEST_ORIGIN||'http://127.0.0.1:8775';
(async()=>{const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 try{
  const p=await b.newPage({viewport:{width:430,height:900},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(origin+'/');
  await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.name='ゆき';FF.app.state.flags.introSeen=true;FF.app.state.flags.diagnosisOffered=true;
   // 森（'.'）が右へ7マス続く場所をさがして、そこに置く
   const M=FF.snowJourney;let at=null;for(let y=3;y<27&&!at;y++)for(let x=3;x<30&&!at;x++){let ok=true;for(let k=0;k<8;k++)if(M.grid[y][x+k]!=='.')ok=false;if(ok)at={x,y};}
   window.__at=at;localStorage.setItem(FF.config.SAVE_KEY+'.snowJourney',JSON.stringify({region:'field',x:at.x,y:at.y,visited:['home'],chest:false,seen:[]}));
   FF.ui.show('adventure');});
  await p.locator('.journey-party').waitFor();
  const bar=await p.evaluate(()=>({members:document.querySelectorAll('.journey-member').length,potion:document.querySelector('.journey-potion').textContent,diff:!!document.querySelector('.journey-party-tools select')}));
  assert.equal(bar.members,4);assert.match(bar.potion,/回復薬 ×3/);assert.ok(bar.diff);
  // 遭遇なしの印（?noenc=1）のページでは、森を歩いても戦闘にならない
  const q=await b.newPage({viewport:{width:430,height:900},reducedMotion:'reduce'});q.on('pageerror',e=>errors.push(e.message));
  await q.goto(origin+'/?noenc=1');
  await q.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.flags.introSeen=true;const M=FF.snowJourney;let at=null;for(let y=3;y<27&&!at;y++)for(let x=3;x<30&&!at;x++){let ok=true;for(let k=0;k<8;k++)if(M.grid[y][x+k]!=='.')ok=false;if(ok)at={x,y};}
   localStorage.setItem(FF.config.SAVE_KEY+'.snowJourney',JSON.stringify({region:'field',x:at.x,y:at.y,visited:['home'],chest:false,seen:[]}));FF.adventureRng=()=>0;FF.ui.show('adventure');});
  await q.locator('canvas').focus();await q.keyboard.down('ArrowRight');await q.waitForTimeout(2600);await q.keyboard.up('ArrowRight');
  assert.equal(await q.evaluate(()=>!!FF.app.state.adventure.battle),false);await q.close();
  // 遭遇あり：森を歩くと、5歩目ごろから戦闘になる
  await p.evaluate(()=>{FF.adventureRng=()=>0;});
  await p.locator('canvas').focus();await p.keyboard.down('ArrowRight');await p.locator('.bt-app').waitFor({timeout:12000});await p.keyboard.up('ArrowRight');
  const bt=await p.evaluate(()=>({screen:FF.app.screen,enemy:FF.app.state.adventure.battle.enemy,phase:FF.app.state.adventure.battle.phase}));
  assert.equal(bt.screen,'adventure');assert.ok(['cub','wolf'].includes(bt.enemy));assert.equal(bt.phase,'commands');
  // 負けたら街で目を覚ます（持ち物・経験値は残る）：負けの処理（従来の冒険と同じ rest）をして、雪原にもどる
  await p.evaluate(()=>{const A=FF.adventure,a=FF.util.clone(FF.app.state.adventure);a.battle.phase='lose';const n=A.advance(a,FF.app.bank,5,Math.random,FF.app.now(),{},{});FF.app.commit(Object.assign({},FF.app.state,{adventure:n}));FF.ui.show('adventure');});
  await p.locator('.overlay .modal').waitFor({timeout:4000});
  const back=await p.evaluate(()=>({text:document.querySelector('.overlay .modal').innerText,j:JSON.parse(localStorage.getItem(FF.config.SAVE_KEY+'.snowJourney')),battle:FF.app.state.adventure.battle,notice:FF.app.state.adventure.notice,atTown:FF.adventure.atTown(FF.app.state.adventure)}));
  assert.match(back.text,/街で全回復|街で目を覚ました/);assert.deepEqual([back.j.region,back.j.x,back.j.y],['field',4,24]);assert.equal(back.battle,null);assert.equal(back.notice,'');assert.equal(back.atTown,true);
  await p.locator('.overlay .btn.primary, .overlay button').first().click();
  // 大ボス（図書館の入口）：戦う→戦闘の画面
  await p.evaluate(()=>{const n=FF.adventure.bossBattle(FF.app.state.adventure);FF.app.commit(Object.assign({},FF.app.state,{adventure:n}));FF.ui.show('base');FF.ui.show('adventure');});
  await p.locator('.bt-app').waitFor({timeout:4000});assert.equal(await p.evaluate(()=>FF.app.state.adventure.battle.enemy),'boss');
  // 街道・橋・場所では、歩数が進まない（出会わない）：onArrive は森（'.'）だけ
  assert.deepEqual(errors,[]);
  console.log('PASS: journey battle — party bar, no encounter when disabled, forest encounter → battle screen, defeat → town + message, boss battle');
 }finally{await b.close();}})();
