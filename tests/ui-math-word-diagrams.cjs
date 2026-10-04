// Chromium QA: file://で実際の問題画面を55問×4幅表示する。ゲームにテスト用コードを入れない。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),out=process.env.FF_QA_OUTPUT||path.resolve(root,'../math-word-qa');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.FF_TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
  await page.evaluate(()=>{document.documentElement.dataset.theme='day';FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),9);FF.app.state.player.name='ゆき';FF.app.state.player.avatar='e1';});
  await page.evaluate(()=>document.fonts.ready);
  const qs=await page.evaluate(()=>QUESTION_BANK.filter(q=>q.subject==='math'&&q.collection!=='frontier100'&&q.collection!=='hand_g4'&&q.diagram).map(q=>({id:q.id,kind:q.diagram.kind,grade:q.gradeLevel})));
  assert.equal(qs.length,55);const checks=[],screenshots=[];
  for(const q of qs){
   for(const width of [360,390,768,1024]){
    await page.setViewportSize({width,height:1000});
    await page.evaluate(id=>{
     const q=FF.app.bank.byId[id];FF.app.state.player.grade=q.gradeLevel;
     FF.app.session={renewal:true,sel:{subject:'math',grade:q.gradeLevel,unit:'all',difficulty:'random',answerType:q.answerType,resource:'wood'},recentIds:[],items:{},currentId:q.id,order:[q.id],cursor:0};
     FF.app.session.items[q.id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
     FF.ui.show('quiz');scrollTo(0,0);
    },q.id);
    const result=await page.locator('.lesson-figure').evaluate(el=>{
     const issues=[],svg=el.querySelector('svg'),rect=el.getBoundingClientRect();let minText=Infinity;
     if(svg){const vb=svg.viewBox.baseVal,scale=svg.getBoundingClientRect().width/vb.width;
      for(const t of svg.querySelectorAll('text')){const b=t.getBBox();if(b.x<-.5||b.y<-.5||b.x+b.width>vb.width+.5||b.y+b.height>vb.height+.5)issues.push('clipped '+t.textContent);minText=Math.min(minText,parseFloat(getComputedStyle(t).fontSize)*scale);}
     }
     return {issues,minText:Number.isFinite(minText)?minText:null,overflow:document.documentElement.scrollWidth>innerWidth+1,figureOverflow:el.scrollWidth>el.clientWidth+1,figureWidth:rect.width};
    });
    checks.push({id:q.id,width,...result});
    if(width===390||width===1024){const file=q.id+'-'+width+'.png';await page.locator('.lesson-figure').evaluate(el=>el.scrollIntoView({block:'center'}));await page.locator('.lesson-figure').screenshot({path:path.join(out,file),style:'#hud, #nav { visibility:hidden !important; }'});screenshots.push(file);}
   }
  }
  const report={count:55,widths:[360,390,768,1024],checks,screenshots,errors};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
  for(const c of checks){assert.deepEqual(c.issues,[],c.id+' width '+c.width);assert.equal(c.overflow,false,c.id+' overflow '+c.width);assert.equal(c.figureOverflow,false,c.id+' figure overflow '+c.width);}
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',questions:55,renders:checks.length,screenshots:screenshots.length,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
