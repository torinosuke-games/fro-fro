const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium'});const checks=[];try{const p=await browser.newPage({isMobile:true,hasTouch:true});
for(const [name,w,h] of [['small',320,568],['phone',390,844],['mid',375,667],['short',360,640],['landscape',844,390]]){
 await p.setViewportSize({width:w,height:h});await p.goto('http://127.0.0.1:8766/codex-prototypes/snow-battle/?qa=1');
 for(let turn=1;turn<=12;turn++){
  await p.evaluate(turn=>BATTLE_QA.fixture({turn}),turn);const initial=await p.locator('#stage').boundingBox();await p.locator('[data-do=startQuiz]').click();
  const r=await p.evaluate(()=>{const b=document.querySelector('.panel-body').getBoundingClientRect();return {bounds:[b.top,b.bottom],content:[...document.querySelectorAll('.question-text,.question-figure:not([hidden]),.choice')].filter(e=>e.getClientRects().length).map(e=>{const r=e.getBoundingClientRect();return[r.top,r.bottom]}),scroll:document.querySelector('.panel-body').scrollTop}});
  assert.equal(r.scroll,0);assert.ok(r.content.every(([top,bottom])=>top>=r.bounds[0]&&bottom<=r.bounds[1]+1),`${name}/turn ${turn}: complete question and choices visible ${JSON.stringify(r)}`);
  const current=await p.locator('#stage').boundingBox();assert.ok(Math.abs(initial.height-current.height)<1&&Math.abs(initial.y-current.y)<1);checks.push(`${name}/turn ${turn}: complete question and four choices without scroll; arena fixed`);
 }
 await p.evaluate(()=>BATTLE_QA.fixture({turn:1}));await p.locator('[data-do=startQuiz]').click();await p.screenshot({path:path.join(__dirname,name+'-quiz.png'),scale:'css'});
}
fs.writeFileSync(path.join(__dirname,'question-layout-results.json'),JSON.stringify({checks,environment:'Linux Chromium viewport emulation; not a hardware test'},null,2));console.log(checks.length+' question layout checks PASS');}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
