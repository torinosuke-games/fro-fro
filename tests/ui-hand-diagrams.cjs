// Chromium QA: file://で実際の問題画面を17問×4幅表示する。ゲームにテスト用コードを入れない。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),out=process.env.FF_QA_OUTPUT||path.resolve(root,'../hand-diagrams-qa');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.FF_TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
  await page.evaluate(()=>{
   document.documentElement.dataset.theme='day';FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),9);FF.app.state.player.name='ゆき';FF.app.state.player.avatar='e1';
   window.qaShowQuestion=id=>{
    const q=FF.app.bank.byId[id];FF.app.state.player.grade=q.gradeLevel;
    FF.app.session={renewal:true,sel:{subject:'math',grade:q.gradeLevel,unit:'all',difficulty:'random',answerType:q.answerType,resource:'wood'},recentIds:[],items:{},currentId:q.id,order:[q.id],cursor:0};
    FF.app.session.items[q.id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
    FF.ui.show('quiz');scrollTo(0,0);
   };
   window.qaCheckFigure=el=>{
    const issues=[],svg=el.querySelector('svg'),rect=el.getBoundingClientRect(),vb=svg.viewBox.baseVal,sr=svg.getBoundingClientRect();let minText=Infinity;
    const ts=[...svg.querySelectorAll('text')];
    for(const t of ts){
     const b=t.getBBox(),cs=getComputedStyle(t),stroke=cs.stroke==='none'?0:parseFloat(cs.strokeWidth)/2;
     // getBBoxは文字の塗りだけ。縁取りも含め、viewBoxの原点と厳密な端を検査する。
     if(b.x-stroke<vb.x||b.y-stroke<vb.y||b.x+b.width+stroke>vb.x+vb.width||b.y+b.height+stroke>vb.y+vb.height)issues.push('viewBox clipped '+t.textContent);
     // 画面上の位置でも、SVGの表示枠とfigureの外に出ていないか検査する。
     const m=t.getScreenCTM(),pts=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(m));
     const sx=Math.hypot(m.a,m.b),sy=Math.hypot(m.c,m.d),px=Math.max(1,stroke*sx),py=Math.max(1,stroke*sy);
     const left=Math.min(...pts.map(p=>p.x))-px,right=Math.max(...pts.map(p=>p.x))+px,top=Math.min(...pts.map(p=>p.y))-py,bottom=Math.max(...pts.map(p=>p.y))+py;
     if(left<sr.left||right>sr.right||top<sr.top||bottom>sr.bottom)issues.push('viewport clipped '+t.textContent);
     if(left<rect.left||right>rect.right||top<rect.top||bottom>rect.bottom)issues.push('figure clipped '+t.textContent);
     minText=Math.min(minText,parseFloat(cs.fontSize)*sx);
    }
    for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){const a=ts[i].getBBox(),b=ts[j].getBBox();if(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y)issues.push('overlap '+ts[i].textContent+'/'+ts[j].textContent);}
    return {issues,minText:Number.isFinite(minText)?minText:null,overflow:document.documentElement.scrollWidth>innerWidth+1,figureOverflow:el.scrollWidth>el.clientWidth+1,figureWidth:rect.width};
   };
  });
  const settled=()=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
  const requested=[...fs.readFileSync(path.join(root,'DIAGRAM_REQUESTS_2.md'),'utf8').matchAll(/\| (math_g4_hand_\w+) \|/g)].map(m=>m[1]);
  const qs=await page.evaluate(ids=>QUESTION_BANK.filter(q=>ids.includes(q.id)).map(q=>({id:q.id,kind:q.diagram.kind})),requested);
  assert.equal(requested.length,17);assert.equal(qs.length,17);const checks=[],screenshots=[],negativeChecks=[];
  for(const q of qs){
   for(const width of [360,390,768,1024]){
    await page.setViewportSize({width,height:1000});await page.evaluate(id=>qaShowQuestion(id),q.id);await settled();
    const result=await page.locator('.lesson-figure').evaluate(el=>qaCheckFigure(el));
    checks.push({id:q.id,width,...result});
    if(q.id==='math_g4_hand_solid_011'){
     // 実際の「3cm」をviewBoxの端をまたぐ／完全に外へ出す負例。検査後は元に戻す。
     const negative=await page.locator('.lesson-figure').evaluate(el=>{
      const svg=el.querySelector('svg'),t=[...svg.querySelectorAll('text')].find(t=>t.textContent==='3cm'),old=t.getAttribute('x'),vb=svg.viewBox.baseVal;
      const results=[];
      try{for(const x of [vb.x+vb.width-1,vb.x+vb.width+10]){t.setAttribute('x',x);results.push({x,issues:qaCheckFigure(el).issues});}}finally{t.setAttribute('x',old);}
      return results;
     });
     for(const n of negative){assert.ok(n.issues.includes('viewBox clipped 3cm'),'negative fixture must detect viewBox clipping');assert.ok(n.issues.includes('viewport clipped 3cm'),'negative fixture must detect actual viewport clipping');}
     negativeChecks.push({width,cases:negative});
    }
    const file=q.id+'-'+width+'.png';await page.locator('.question-card').screenshot({path:path.join(out,file),style:'#hud, #nav { visibility:hidden !important; }'});screenshots.push(file);
    if(width===390||width===1024)await page.locator('.lesson-figure').screenshot({path:path.join(out,q.id+'-figure-'+width+'.png'),style:'#hud, #nav { visibility:hidden !important; }'});
   }
  }
  const removedChecks=[];
  for(const id of ['math_g4_hand_quad_015','math_g4_hand_quad_016'])for(const width of [360,390,768,1024]){
   await page.setViewportSize({width,height:1000});
   for(const variant of [id,id+'#input']){
    if(!await page.evaluate(id=>Boolean(FF.app.bank.byId[id]),variant))continue;
    await page.evaluate(id=>qaShowQuestion(id),variant);await settled();
    const count=await page.locator('.lesson-figure').count();assert.equal(count,0,variant+' must not show a diagram');removedChecks.push({id:variant,width,figureCount:count});
   }
  }
  const report={count:17,widths:[360,390,768,1024],checks,negativeChecks,removedChecks,screenshots,errors};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
  for(const c of checks){assert.deepEqual(c.issues,[],c.id+' width '+c.width);assert.equal(c.overflow,false,c.id+' overflow '+c.width);assert.equal(c.figureOverflow,false,c.id+' figure overflow '+c.width);}
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',questions:17,renders:checks.length,negativeFixtures:negativeChecks.length*2,removedRenders:removedChecks.length,screenshots:screenshots.length,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
