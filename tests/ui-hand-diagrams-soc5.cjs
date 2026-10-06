// Chromium QA: file://で実際の問題画面を48問×4幅表示する。ゲームにテスト用コードを入れない。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),out=process.env.FF_QA_OUTPUT||path.resolve(root,'../hand-diagrams-soc5-qa');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.FF_TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>{
   document.documentElement.dataset.theme='day';FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),9);FF.app.state.player.name='ゆき';FF.app.state.player.avatar='e1';
   window.qaShowQuestion=id=>{
    const q=FF.app.bank.byId[id];FF.app.state.player.grade=q.gradeLevel;
    FF.app.session={renewal:true,sel:{subject:q.subject,grade:q.gradeLevel,unit:'all',difficulty:'random',answerType:q.answerType,resource:'wood'},recentIds:[],items:{},currentId:q.id,order:[q.id],cursor:0};
    FF.app.session.items[q.id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
    FF.ui.show('quiz');scrollTo(0,0);
   };
   window.qaCheckFigure=el=>{
    const issues=[],svg=el.querySelector('svg'),rect=el.getBoundingClientRect();let minText=Infinity;
    if(!svg){const img=el.querySelector('.figure-picture');if(img){const r=img.getBoundingClientRect();if(!img.complete||!img.naturalWidth)issues.push('image not loaded');if(img.naturalWidth/img.naturalHeight!==1.5&&!(img.naturalWidth===800&&img.naturalHeight===533))issues.push('image aspect ratio');if(r.left<rect.left||r.right>rect.right||r.top<rect.top||r.bottom>rect.bottom)issues.push('image clipped');if(getComputedStyle(img).objectFit!=='contain')issues.push('image must not crop');}for(const cell of el.querySelectorAll('th,td,figcaption')){const range=document.createRange();range.selectNodeContents(cell);for(const r of range.getClientRects())if(r.left<rect.left||r.right>rect.right)issues.push('text clipped '+cell.textContent);}return {issues,overflow:document.documentElement.scrollWidth>innerWidth+1,figureOverflow:el.scrollWidth>el.clientWidth+1,figureWidth:rect.width};}
    const vb=svg.viewBox.baseVal,sr=svg.getBoundingClientRect();
    const ts=[...svg.querySelectorAll('text')];
    function svgBox(t){const b=t.getBBox(),m=svg.getCTM().inverse().multiply(t.getCTM()),ps=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(m)),x=Math.min(...ps.map(p=>p.x)),y=Math.min(...ps.map(p=>p.y));return {x,y,width:Math.max(...ps.map(p=>p.x))-x,height:Math.max(...ps.map(p=>p.y))-y};}
    for(const t of ts){
     const b=t.getBBox(),cs=getComputedStyle(t),stroke=cs.stroke==='none'?0:parseFloat(cs.strokeWidth)/2;
     // getBBoxは文字の塗りだけ。縁取りも含め、viewBoxの原点と厳密な端を検査する。
     const sb=svgBox(t);if(sb.x-stroke<vb.x||sb.y-stroke<vb.y||sb.x+sb.width+stroke>vb.x+vb.width||sb.y+sb.height+stroke>vb.y+vb.height)issues.push('viewBox clipped '+t.textContent);
     // 画面上の位置でも、SVGの表示枠とfigureの外に出ていないか検査する。
     const m=t.getScreenCTM(),pts=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(m));
     const sx=Math.hypot(m.a,m.b),sy=Math.hypot(m.c,m.d),px=Math.max(1,stroke*sx),py=Math.max(1,stroke*sy);
     const left=Math.min(...pts.map(p=>p.x))-px,right=Math.max(...pts.map(p=>p.x))+px,top=Math.min(...pts.map(p=>p.y))-py,bottom=Math.max(...pts.map(p=>p.y))+py;
     if(left<sr.left||right>sr.right||top<sr.top||bottom>sr.bottom)issues.push('viewport clipped '+t.textContent);
     if(left<rect.left||right>rect.right||top<rect.top||bottom>rect.bottom)issues.push('figure clipped '+t.textContent);
     minText=Math.min(minText,parseFloat(cs.fontSize)*sx);
    }
    for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){const a=svgBox(ts[i]),b=svgBox(ts[j]);if(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y)issues.push('overlap '+ts[i].textContent+'/'+ts[j].textContent);}
    // 文字のない線画も、変換後の輪郭がviewBoxからはみ出さないことを確認する。
    for(const shape of svg.querySelectorAll('path,rect,circle,ellipse,line,polygon')){
     if(shape.closest('defs'))continue;
     const b=svgBox(shape),cs=getComputedStyle(shape),stroke=cs.stroke==='none'?0:parseFloat(cs.strokeWidth)/2;
     if(b.x-stroke<vb.x||b.y-stroke<vb.y||b.x+b.width+stroke>vb.x+vb.width||b.y+b.height+stroke>vb.y+vb.height)issues.push('shape clipped '+shape.tagName);
    }
    return {issues,minText:Number.isFinite(minText)?minText:null,overflow:document.documentElement.scrollWidth>innerWidth+1,figureOverflow:el.scrollWidth>el.clientWidth+1,figureWidth:rect.width};
   };
  });
  const settled=()=>page.evaluate(async()=>{await document.fonts.ready;for(const img of document.querySelectorAll('.figure-picture')){img.loading='eager';await img.decode();}await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
  const requested=[19].flatMap(n=>[...fs.readFileSync(path.join(root,'DIAGRAM_REQUESTS_'+n+'.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'social_g5_hand_'+m[1]));
  const inputIds=await page.evaluate(ids=>ids.filter(id=>FF.app.bank.byId[id+'#input']).map(id=>id+'#input'),requested);
  const forms=requested.concat(inputIds);const qs=await page.evaluate(ids=>ids.map(id=>({id,kind:FF.app.bank.byId[id].diagram.kind})),forms);
  assert.equal(requested.length,48);const checks=[],screenshots=[],negativeChecks=[];
  for(const q of qs){
   for(const width of [360,390,768,1024]){
    await page.setViewportSize({width,height:1000});await page.evaluate(id=>qaShowQuestion(id),q.id);await settled();
    const result=await page.locator('.lesson-figure').evaluate(el=>qaCheckFigure(el));
    const structure=await page.evaluate(()=>{const q=FF.app.bank.byId[FF.app.session.currentId],d=q.diagram,s=document.querySelector('.lesson-figure svg');return {labels:[...s.querySelectorAll('text')].map(n=>n.textContent),marks:s.querySelectorAll('circle').length,areas:s.querySelectorAll('[data-part="area"]').length,marine:s.querySelectorAll('[data-part="marine-area"]').length,arrows:s.querySelectorAll('[data-part="current-arrow"]').length,expectedMarks:d.marks?.length,expectedAreas:d.areas?.length,expectedMarine:d.marineAreas?.length||0,expectedArrows:d.currents?.length||0,meridians:s.querySelectorAll('[data-part="meridian"]').length,expectedMeridians:d.meridian===undefined?0:1};});
    assert.deepEqual(structure.labels,q.kind==='japanMap'?['北']:[],q.id+' answer label');
    assert.equal(structure.arrows,structure.expectedArrows);assert.equal(structure.meridians,structure.expectedMeridians);
    if(q.kind==='japanMap'){assert.equal(structure.marks,structure.expectedMarks);assert.equal(structure.areas,structure.expectedAreas);assert.equal(structure.marine,structure.expectedMarine);}
    checks.push({id:q.id,width,...result});
    if(q.id===qs[0].id){
     // 実際の文字をviewBoxの端をまたぐ／完全に外へ出す負例。検査後は元に戻す。
     const negative=await page.locator('.lesson-figure').evaluate(el=>{
      const svg=el.querySelector('svg'),t=svg.querySelector('text'),old=t.getAttribute('x'),anchor=t.getAttribute('text-anchor'),vb=svg.viewBox.baseVal;
      const results=[];
      try{t.setAttribute('text-anchor','start');for(const x of [vb.x+vb.width-1,vb.x+vb.width+10]){t.setAttribute('x',x);results.push({x,text:t.textContent,issues:qaCheckFigure(el).issues});}}finally{t.setAttribute('x',old);t.setAttribute('text-anchor',anchor||'middle');}
      return results;
     });
     for(const n of negative){assert.ok(n.issues.includes('viewBox clipped '+n.text),'negative fixture must detect viewBox clipping');assert.ok(n.issues.includes('viewport clipped '+n.text),'negative fixture must detect actual viewport clipping');}
     negativeChecks.push({width,cases:negative});
    }
    const file=q.id+'-'+width+'.png';await page.locator('.question-card').screenshot({path:path.join(out,file),style:'#hud, #nav { visibility:hidden !important; } .check-answer {position:static!important;}'});screenshots.push(file);
    if(width===390||width===1024)await page.locator('.lesson-figure').screenshot({path:path.join(out,q.id+'-figure-'+width+'.png'),style:'#hud, #nav { visibility:hidden !important; } .check-answer {position:static!important;}'});
   }
  }
  const report={count:48,inputForms:inputIds.length,widths:[360,390,768,1024],checks,negativeChecks,screenshots,errors};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
  for(const c of checks){assert.deepEqual(c.issues,[],c.id+' width '+c.width);assert.equal(c.overflow,false,c.id+' overflow '+c.width);assert.equal(c.figureOverflow,false,c.id+' figure overflow '+c.width);}
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',questions:48,inputForms:inputIds.length,renders:checks.length,negativeFixtures:negativeChecks.length*2,screenshots:screenshots.length,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

