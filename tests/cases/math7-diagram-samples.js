'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto');
 const root=path.resolve(__dirname,'../..'),{renderer}=require('../lib/diagram-dom');
 const render=renderer(fs.readFileSync(path.join(root,'js/svg/learning.js'),'utf8'));
 const samples=require('../../docs/math7-diagram-samples/samples.json');
 const {load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader'),c=load(LOGIC_FILES_WITH_FIXES);
 const texts=n=>n.querySelectorAll('text').map(t=>t.textContent),svg=n=>n.querySelectorAll('svg')[0];
 test('中1図：7種類・線分図4点を含む20見本、問題本文と登録は未変更',()=>{
  const counts={};for(const s of samples){counts[s.diagram.kind]=(counts[s.diagram.kind]||0)+1;const q=c.QUESTION_BANK.find(q=>q.id===s.id);assert.ok(q);if(!['signed_numbers','signed_calc'].includes(q.unit))assert.ok(!q.diagram);assert.deepEqual(Array.from(c.FF.learning.validateQuestion({...q,diagram:s.diagram})),[],s.id);assert.ok(svg(render(s.diagram)));}
  assert.equal(Object.keys(counts).length,7);Object.values(counts).forEach(n=>assert.ok(n>=2&&n<=4));
  assert.equal(c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1'&&q.diagram).length,16);
 });
 test('中1図：反比例は0の前後・範囲外をまたがず等縮尺、点のみも可能',()=>{
  const d=samples.find(s=>s.id.endsWith('proportion_024')).diagram,n=render(d),lines=n.querySelectorAll('polyline');assert.equal(lines.length,2);
  for(const line of lines){const ps=line.attrs.points.split(' ').map(p=>p.split(',').map(Number));const xs=ps.map(p=>(p[0]-100)/20-8);assert.ok(xs.every(x=>x<0)||xs.every(x=>x>0));for(const p of ps){const x=(p[0]-100)/20-8,y=(370-p[1])/20-8;assert.ok(Math.abs(x*y+12)<1e-8);}}
  const point=render(samples.find(s=>s.id.endsWith('proportion_005')).diagram);assert.equal(point.querySelectorAll('polyline').length,0);assert.equal(point.querySelectorAll('circle').length,1);
  const pn=point.querySelectorAll('circle')[0];assert.ok(Math.abs(pn.attrs.cx-(100+2*320/12))<1e-8);assert.equal(pn.attrs.cy,130);
 });
 test('中1図：分数見本の除外・縦向き・選択ラベルが正確',()=>{
  assert.ok(!samples.some(s=>s.id.endsWith('signed_numbers_019')));
  const v=render(samples[0].diagram),p=v.querySelectorAll('circle')[0];assert.equal(p.attrs.cx,240);assert.equal(p.attrs.cy,308);assert.ok(!texts(v).includes('-12'));
 });
 test('中1図：直径指定は半径値を表示しない、扇形の端点と角度',()=>{
  const n=render(samples.find(s=>s.id.endsWith('plane_027')).diagram);assert.ok(texts(n).includes('直径12cm'));assert.ok(!n.textContent.includes('6cm'));assert.ok(texts(n).includes('150°'));
  const d=n.querySelectorAll('path')[0].attrs.d,nums=d.match(/-?\d+(?:\.\d+)?/g).map(Number);assert.ok(d.includes(' A115,115 '));assert.ok(Math.abs(nums[2]-(260+115*Math.cos(75*Math.PI/180)))<1e-8);
 });
 test('中1図：円柱は本文の寸法だけ、円錐母線問題は高さを追加しない',()=>{
  const d=samples.find(s=>s.id.endsWith('space_010')).diagram,n=render(d);assert.deepEqual(texts(n),['3cm','5cm']);assert.equal(n.querySelectorAll('ellipse').length,1);
  const cone=render(samples.find(s=>s.id.endsWith('space_016')).diagram);assert.deepEqual(texts(cone),['3cm','5cm']);assert.ok(!cone.textContent.includes('4cm'));
 });
 test('中1図：作図途中にPQや直角印を足さず4:5・円弧の交点を保持',()=>{
  const s=samples.find(s=>s.id.endsWith('plane_003')).diagram,a=s.segments[1],b=s.segments[2];assert.equal(Math.hypot(a[2]-a[0],a[3]-a[1])/Math.hypot(b[2]-b[0],b[3]-b[1]),4/5);
  const d=samples.find(s=>s.id.endsWith('plane_018')).diagram,n=render(d);assert.equal(n.querySelectorAll('line').length,1);const q=d.points[3];for(const x of [180,340])assert.ok(Math.abs(Math.hypot(q[0]-x,q[1]-260)-125)<1e-8);assert.equal(n.querySelectorAll('path').length,2);
 });
 test('中1図：未知量は等幅で答えの式を追加しない',()=>{
  const d=samples.find(s=>s.id.endsWith('expression_021')).diagram,n=render(d),bs=n.querySelectorAll('rect');assert.equal(bs[0].attrs.width,bs[1].attrs.width);assert.ok(!n.textContent.includes('＝'));
 });
 test('中1図：新設の錐・柱・球・平面と直線、複数立体と既知割合も描画できる',()=>{
  for(const shape of ['prism','pyramid','sphere','hemisphere','cone','planeLine']){const n=render({kind:'spatialFigure',shape,sides:5,radius:2,heightValue:3});assert.ok(!JSON.stringify(n).includes('NaN'));assert.ok(n.querySelectorAll('*').length>2);}
  const group=render({kind:'spatialFigure',shape:'group',solids:[{kind:'spatialFigure',shape:'cone',radius:3,heightValue:8},{kind:'solid3d',study:true,shape:'cylinder',dimensions:[6,6,4],vertices:[]}]});assert.equal(group.querySelectorAll('g').length,2);
  const bars=render({kind:'quantityBars',rows:[{cells:['',''],parts:[1,4]}]}).querySelectorAll('rect');assert.equal(bars[1].attrs.width/bars[0].attrs.width,4);
  const cyl=render({kind:'solid3d',study:true,shape:'cylinder',dimensions:[6,6,5],vertices:[],viewDirections:['真上','正面']});assert.deepEqual(texts(cyl),['真上','正面']);
 });
 test('中1図：計画は106図・107問、除外4問・歯車共用と一致',()=>{
  const plan=fs.readFileSync(path.join(root,'PICTURE_PLAN_MATH7.md'),'utf8'),rows=plan.split('\n').filter(l=>l.startsWith('|M7-'));
  assert.equal(rows.length,106);const ids=rows.flatMap(l=>[...l.matchAll(/`(math_g7_\w+)`/g)].map(m=>m[1]));assert.equal(ids.length,107);assert.equal(new Set(ids).size,107);
  for(const id of ids)assert.ok(c.QUESTION_BANK.some(q=>q.id===id),id);
  for(const id of ['expression_006','expression_016','data_006','data_014'])assert.ok(!ids.includes('math_g7_'+id));
  assert.equal(rows.filter(l=>l.includes('生成した絵')).length,2);assert.equal(rows.filter(l=>l.includes('SVG・')).length,104);
 });
 test('中1図：修正した寸法ラベル・全体のかっこ・過不足の整列',()=>{
  const by=id=>samples.find(s=>s.id.endsWith(id)).diagram;
  assert.equal(samples.length,20);assert.equal(samples.filter(s=>s.diagram.kind==='quantityBars').length,4);
  const sea=render(by('signed_numbers_001')).querySelectorAll('text').find(t=>t.textContent==='海面');assert.equal(sea.attrs.y,147);
  const n=render(by('equation_025')),rects=n.querySelectorAll('rect');assert.equal(rects.length,4);assert.equal(rects[1].attrs.x,355);assert.equal(rects[3].attrs.x+rects[3].attrs.width,355);assert.equal(rects[1].attrs['stroke-dasharray'],'6 6');assert.ok(n.querySelectorAll('line').some(l=>l.attrs.x1===355&&l.attrs.x2===355));assert.ok(!n.textContent.includes('…'));
  const sum=render(by('expression_009'));assert.deepEqual(texts(sum),['合計','b円','b円','10円']);const rs=sum.querySelectorAll('rect');assert.ok(rs[2].attrs.width<rs[0].attrs.width);assert.ok(sum.querySelectorAll('path').length);
  for(const id of ['space_010','space_014']){const d=render(by(id));assert.ok(d.querySelectorAll('ellipse')[0].attrs.rx*2>=300);}
 });
 test('中1図：既存全図のSVG・表・画像構造は拡張前と同一',()=>{
  const ids=require('../../docs/math7-diagrams/round1/samples.json').map(s=>s.id);const qs=c.QUESTION_BANK.filter(q=>q.diagram&&!ids.includes(q.id)),baseline=require('../fixtures/math7-diagram-baseline.json');
  const digest=crypto.createHash('sha256').update(JSON.stringify(qs.map(q=>[q.id,render(q.diagram)]))).digest('hex');
  assert.equal(qs.length,baseline.count);assert.equal(digest,baseline.sha256);
 });
};
