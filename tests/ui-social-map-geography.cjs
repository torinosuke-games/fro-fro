// Geographic reference overlays are QA artifacts only; the game never renders place names.
'use strict';
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const {landmarks,source}=require('./fixtures/social-map-landmarks.json');
const {inside,distance,project}=require('./lib/social-map-geometry');
const dem=require('./fixtures/kanto-plain-dem.json');
const root=path.resolve(__dirname,'..'),out=process.env.FF_QA_OUTPUT||path.resolve(root,'../social-map-geo-qa');
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1024,height:1100}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  const maps=await page.evaluate(()=>QUESTION_BANK.filter(q=>q.diagram&&q.diagram.kind==='japanMap').map(q=>({id:q.id,diagram:q.diagram})));
  const data=await page.evaluate(()=>FF.japanMapData);
  const checks=landmarks.map(p=>({...p,distanceDegrees:p.type==='cape'?distance(p.point,data.coasts):p.type==='lake'?distance(p.point,[data.lake]):data.coasts.some(r=>inside(p.point,r))?0:distance(p.point,data.coasts)}));
  checks.forEach(p=>assert.ok(p.distanceDegrees<=.1,p.name+' '+p.distanceDegrees));
  // Full map plus all 14 question-specific regional maps; geographic labels are outside the SVG.
  const views=[{id:'full',diagram:{kind:'japanMap',bounds:[122,23.5,150,46],marks:[],areas:[],routes:[],caption:'検証用：地名集の位置を重ねた日本全図',study:true}},...maps.filter(q=>q.diagram.bounds[2]-q.diagram.bounds[0]<20)];
  const images=[];
  for(const v of views){
   const b=v.diagram.bounds,visible=checks.filter(p=>p.point[0]>=b[0]&&p.point[0]<=b[2]&&p.point[1]>=b[1]&&p.point[1]<=b[3]).map(p=>({...p,xy:project(p.point,b,v.diagram.regionBoundaries?570:430)}));
   if(v.id==='social_g4_hand_geography_005')for(const p of dem.references){assert.equal(inside(p.point,v.diagram.areas[0]),p.within,p.id);visible.push({...p,xy:project(p.point,b)});}
   if(v.id==='social_g4_hand_geography_008')visible.push({id:'aso',name:'火山の参照位置',point:[131.104,32.884],xy:project([131.104,32.884],b)});
   if(v.id==='social_g4_hand_pioneer_010')for(const [id,name,point] of [['intake','大津側取水口',[135.8627,35.0147]],['keage','東山の下の水路',[135.789,35.01]],['kyoto','京都の市街地',[135.768,35.011]]])visible.push({id,name,point,xy:project(point,b)});
   // 色の輪郭が実際の原海岸頂点を通るか、検証画像だけに青い十字を置く。
   const coastReferences=v.id==='social_g4_hand_geography_019'?v.diagram.areas[0].filter((p,i)=>[0,6,11,20,31].includes(i)).map(p=>project(p,b)):[];
   if(v.id==='social_g4_hand_geography_005')coastReferences.push(...data.coasts.flat().filter(p=>p[0]>=b[0]&&p[0]<=b[2]&&p[1]>=b[1]&&p[1]<=b[3]&&inside(p,v.diagram.areas[0])).map(p=>project(p,b)));
   await page.evaluate(({d,points,id,source,coastReferences})=>{
    document.documentElement.dataset.theme='day';document.body.replaceChildren();
    const host=document.createElement('main');host.style.cssText='max-width:820px;margin:20px auto;padding:20px;background:#fff;color:#21465c;font:16px/1.5 sans-serif';
    const title=document.createElement('h1');title.textContent=id+'：地理の確認用（ゲームには出ない印）';host.append(title);
    const figure=FF.lessonFigure.render(d);host.append(figure);
    const svg=figure.querySelector('svg');svg.style.maxWidth='780px';svg.style.width='100%';
    for(const p of points){const [x,y]=p.xy;const mark=FF.ui.svg('path',{d:'M'+(x-4)+','+y+'H'+(x+4)+'M'+x+','+(y-4)+'V'+(y+4),fill:'none',stroke:'#ab2850','stroke-width':1.5,'data-reference':p.id});svg.append(mark);}
    for(const [x,y] of coastReferences)svg.append(FF.ui.svg('path',{d:'M'+(x-5)+','+y+'H'+(x+5)+'M'+x+','+(y-5)+'V'+(y+5),fill:'none',stroke:'#075b9e','stroke-width':2,'data-coast-reference':'true'}));
    const legend=document.createElement('p');legend.textContent='赤い十字＝地名集・標高タイル・疏水公式地図を参照する確認用の座標。'+points.map(p=>p.name+' ('+p.point.join(', ')+')').join(' ／ ');host.append(legend);
    if(coastReferences.length){const note=document.createElement('p');note.textContent='青い十字＝色の境界に使った原海岸線の頂点。';host.append(note);}
    const a=document.createElement('a');a.href=source;a.textContent='参照：国土地理院 地名集日本2021';host.append(a);document.body.append(host);
   },{d:v.diagram,points:visible,id:v.id,source,coastReferences});
   await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>({marks:document.querySelectorAll('[data-reference]').length,overflow:document.documentElement.scrollWidth>innerWidth+1}));
   assert.equal(result.marks,visible.length);assert.equal(result.overflow,false);
   const file='geo-'+v.id+'.png';await page.locator('main').screenshot({path:path.join(out,file)});images.push({id:v.id,file,landmarks:visible.length});
  }
  assert.ok(images.length>=11);assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'geography-results.json'),JSON.stringify({source,checks,images,errors},null,2));
  console.log(JSON.stringify({status:'PASS',referencePoints:checks.length,maps:images.length,maxCapeDeviation:Math.max(...checks.filter(p=>p.type==='cape').map(p=>p.distanceDegrees)),errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
