// SVG の図つきの問題を、実際の問題画面で撮って、図の質を目で確かめる道具（判断495）。
// 使い方：node tests/tools/shoot-diagrams.cjs <出力フォルダ>   → <id>.png（問題カード）と manifest.json（問題・答え・図の説明）
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..','..'),out=process.argv[2];fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const page=await browser.newPage({viewport:{width:430,height:1000},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>{
  document.documentElement.dataset.theme='day';FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),9);FF.app.state.player.name='ゆき';FF.app.state.player.avatar='e1';
  window.qaShow=id=>{const q=FF.app.bank.byId[id];FF.app.state.player.grade=q.gradeLevel;
   FF.app.session={renewal:true,sel:{subject:q.subject,grade:q.gradeLevel,unit:'all',difficulty:'random',answerType:q.answerType,resource:'wood'},recentIds:[],items:{},currentId:q.id,order:[q.id],cursor:0};
   FF.app.session.items[q.id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
   FF.ui.show('quiz');scrollTo(0,0);};
 });
 const list=await page.evaluate(()=>Object.values(FF.app.bank.byId).filter(q=>q.diagram&&q.diagram.kind!=='image').map(q=>({id:q.id,subject:q.subject,grade:q.gradeLevel,unit:q.unit,kind:q.diagram.kind,question:q.question,answer:q.answer,choices:q.choices||null,caption:q.diagram.caption,explanation:q.explanation})));
 for(const m of list){await page.evaluate(id=>qaShow(id),m.id);await page.waitForTimeout(40);
  await page.locator('.question-card').screenshot({path:path.join(out,m.id+'.png'),style:'#hud, #nav { visibility:hidden !important; }'});}
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(list,null,1));console.log(list.length);await browser.close();
})();
