// 絵の図（kind: 'image'）：次の問題を先に選んで絵を読み込む（判断256）。枠の高さを先に確保し、文章が動かないこと。
const path=require('node:path'),{pathToFileURL}=require('node:url'),assert=require('node:assert/strict');
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
 const page=await browser.newPage({viewport:{width:390,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 const r=await page.evaluate(async()=>{
  document.documentElement.dataset.theme='day';
  FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),4);
  const ids=QUESTION_BANK.filter(q=>q.diagram&&q.diagram.kind==='image').map(q=>q.id);
  const q=FF.app.bank.byId[ids[0]];
  FF.app.session={renewal:true,sel:{subject:'social',grade:4,unit:'all',difficulty:'random',answerType:'choice',resource:'wood'},recentIds:[],items:{},currentId:q.id,order:[q.id],cursor:0};
  FF.app.session.items[q.id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
  // 読み込みを確かめるため、Image を数える
  const made=[];const Orig=window.Image;window.Image=function(){const i=new Orig();made.push(i);return i;};
  FF.ui.show('quiz');await new Promise(r=>setTimeout(r,100));
  const img=document.querySelector('.figure-picture');
  const attr=img?{w:img.getAttribute('width'),h:img.getAttribute('height'),lazy:img.getAttribute('loading')}:null;
  const before=!!FF.app.session.nextQ;
  const imgQ=FF.app.bank.byId[ids[5]];const origPick=FF.curriculum.pick;FF.curriculum.pick=()=>imgQ; // 次の問題を絵の問題に固定する
  FF.app.session.items[q.id].selected=q.answer;FF.ui.rerender();
  document.querySelector('.check-answer').click();await new Promise(r=>setTimeout(r,100));
  const nq=FF.app.session.nextQ;
  const out={ids:ids.length,attr,before,hasNext:!!nq,nextIsImage:!!(nq&&nq.diagram&&nq.diagram.kind==='image'),prefetched:made.filter(i=>nq&&nq.diagram&&i.src.endsWith(nq.diagram.src)).length};
  const nextId=nq&&nq.id;
  const btn=[...document.querySelectorAll('.lesson-actions button')].pop();btn.click();await new Promise(r=>setTimeout(r,100));
  FF.curriculum.pick=origPick;
  out.usedPeeked=FF.app.session.currentId===nextId;out.cleared=!FF.app.session.nextQ;
  return out;
 });
 console.log(JSON.stringify(r));
 assert.ok(r.ids>=33);
 assert.deepEqual(r.attr,{w:'960',h:'640',lazy:null});
 assert.equal(r.before,false);
 assert.equal(r.hasNext,true);
 assert.equal(r.nextIsImage,true);assert.equal(r.prefetched,1);
 assert.equal(r.usedPeeked,true);
 assert.equal(r.cleared,true);
 assert.deepEqual(errors,[]);
 await browser.close();console.log('ok');
})().catch(e=>{console.error(e);process.exit(1);});
