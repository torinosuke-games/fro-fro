// Chromium QA: file://で実際の問題画面を118問×4幅表示する。ゲームにテスト用コードを入れない。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),out=process.env.FF_QA_OUTPUT||path.resolve(root,'../hand-diagrams-g5-qa');
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
    FF.app.session={renewal:true,sel:{subject:'math',grade:q.gradeLevel,unit:'all',difficulty:'random',answerType:q.answerType,resource:'wood'},recentIds:[],items:{},currentId:q.id,order:[q.id],cursor:0};
    FF.app.session.items[q.id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
    FF.ui.show('quiz');scrollTo(0,0);
   };
   window.qaCheckFigure=el=>{
    const issues=[],svg=el.querySelector('svg'),rect=el.getBoundingClientRect();let minText=Infinity;
    if(!svg){for(const cell of el.querySelectorAll('th,td')){const range=document.createRange();range.selectNodeContents(cell);for(const r of range.getClientRects())if(r.left<rect.left||r.right>rect.right)issues.push('table clipped '+cell.textContent);}return {issues,overflow:document.documentElement.scrollWidth>innerWidth+1,figureOverflow:el.scrollWidth>el.clientWidth+1};}
    const vb=svg.viewBox.baseVal,sr=svg.getBoundingClientRect();
    const data=FF.app.bank.byId[FF.app.session.currentId].diagram;
    // コメントの指摘を実際の描画でも保護する（図のデータだけでなく配置も検査）。
    if(data.baseView==='front'){
     const p=svg.querySelector('path'),v=[...p.getAttribute('d').matchAll(/(-?[\d.]+),(-?[\d.]+)/g)].map(m=>[+m[1],+m[2]]);
     const area=Math.abs((v[1][0]-v[0][0])*(v[2][1]-v[0][1])-(v[2][0]-v[0][0])*(v[1][1]-v[0][1]))/2;
     if(v.length!==3||area<1200||svg.querySelectorAll('line').length!==6)issues.push('triangular prism base/edges unclear');
    }
    if(data.kind==='fraction'&&data.rows[0].pieceLabelsAtParts){
     const parts=[...svg.querySelectorAll('rect')].slice(1);
     data.rows[0].pieceLabels.forEach((label,i)=>{const t=[...svg.querySelectorAll('text')].find(t=>t.textContent===label),r=parts[i];if(Math.abs(+t.getAttribute('x')-(+r.getAttribute('x')+ +r.getAttribute('width')/2))>.01)issues.push('fraction label misplaced '+label);});
    }
    if(data.waterFill==='blue'){for(const r of [...svg.querySelectorAll('rect')].filter((r,i)=>i%2)){if(r.getAttribute('fill-opacity')!== '0.4'||getComputedStyle(r).fill===getComputedStyle(el).backgroundColor)issues.push('water contrast missing');}}
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
  const requested=[3,4,5].flatMap(n=>[...fs.readFileSync(path.join(root,'DIAGRAM_REQUESTS_'+n+'.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'math_g5_hand_'+m[1]));
  const qs=await page.evaluate(ids=>QUESTION_BANK.filter(q=>ids.includes(q.id)).map(q=>({id:q.id,kind:q.diagram.kind})),requested);
  assert.equal(requested.length,118);assert.equal(qs.length,118);const checks=[],screenshots=[],negativeChecks=[];
  for(const q of qs){
   for(const width of [360,390,768,1024]){
    await page.setViewportSize({width,height:1000});await page.evaluate(id=>qaShowQuestion(id),q.id);await settled();
    const result=await page.locator('.lesson-figure').evaluate(el=>qaCheckFigure(el));
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
    const file=q.id+'-'+width+'.png';await page.locator('.question-card').screenshot({path:path.join(out,file),style:'#hud, #nav { visibility:hidden !important; }'});screenshots.push(file);
    if(width===390||width===1024)await page.locator('.lesson-figure').screenshot({path:path.join(out,q.id+'-figure-'+width+'.png'),style:'#hud, #nav { visibility:hidden !important; }'});
   }
  }
  const report={count:118,widths:[360,390,768,1024],checks,negativeChecks,screenshots,errors};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
  for(const c of checks){assert.deepEqual(c.issues,[],c.id+' width '+c.width);assert.equal(c.overflow,false,c.id+' overflow '+c.width);assert.equal(c.figureOverflow,false,c.id+' figure overflow '+c.width);}
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',questions:118,renders:checks.length,negativeFixtures:negativeChecks.length*2,screenshots:screenshots.length,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
