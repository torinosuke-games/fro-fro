'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),{renderer}=require('../lib/diagram-dom'),{load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader');const render=renderer(fs.readFileSync(path.join(__dirname,'../../js/svg/learning.js'),'utf8')),all=require('../../docs/math7-diagrams/round5/samples.json'),by=id=>all.find(s=>s.id.endsWith(id)).diagram,c=load(LOGIC_FILES_WITH_FIXES);
 test('中1図の仕上げ：回転前の辺を延長した1点鎖線の軸、回転後・軌跡なし',()=>{
  for(const id of ['space_007','space_019']){const d=by(id),n=render(d),line=n.querySelectorAll('line').find(l=>l.attrs['stroke-dasharray']==='12 5 2 5');assert.ok(line,id);assert.equal(line.attrs.x1,150);assert.equal(line.attrs.x2,150);assert.ok(line.attrs.y1<65&&line.attrs.y2>270);assert.ok(!d.segments.some(e=>e[0]===150&&e[2]===150));assert.equal(n.querySelectorAll('text').filter(t=>t.textContent==='軸').length,1);assert.equal(n.querySelectorAll('circle').length,0);assert.equal(n.querySelectorAll('path').length,0);}
 });
 test('中1図の仕上げ：真上・正面から本体へ向かう矢印、投影形は描かない',()=>{
  const d=by('space_009'),n=render(d);assert.equal(d.viewArrows,true);assert.deepEqual(d.viewDirections,['真上から','正面から']);
  const lines=n.querySelectorAll('line');assert.ok(lines.some(l=>l.attrs.x1===260&&l.attrs.x2===260&&l.attrs.y1===70&&l.attrs.y2>70));assert.ok(lines.some(l=>l.attrs.x1===500&&l.attrs.x2<500&&l.attrs.y1===l.attrs.y2));assert.equal(n.querySelectorAll('ellipse').length,1);assert.equal(n.querySelectorAll('rect').length,0);assert.ok(!n.textContent.includes('長方形'));assert.ok(!n.textContent.includes('立面図'));
 });
 test('中1図の仕上げ：半径の数字は共通配置で線の上、楕円の内側に収まる',()=>{
  const cases=[['cone',{radius:3,heightValue:4,radiusLabel:'3cm'},245,315,150],['hemisphere',{radiusLabel:'3cm'},245,205,150],['sphere',{radiusLabel:'2cm'},245,205,150]];
  for(const[shape,options,cx,cy,r]of cases){const n=render({kind:'spatialFigure',shape,...options}),label=n.querySelectorAll('text').find(t=>t.textContent===options.radiusLabel);assert.equal(label.attrs.x,cx+r*.38);assert.equal(label.attrs.y,cy-8);assert.equal(label.attrs['font-size'],22);assert.ok(n.querySelectorAll('line').some(l=>l.attrs.x1===cx&&l.attrs.x2===cx+r&&l.attrs.y1===cy&&l.attrs.y2===cy));}
  for(const id of ['space_010','space_014']){const n=render(by(id)),ellipse=n.querySelectorAll('ellipse')[0],label=n.querySelectorAll('text').find(t=>t.textContent==='3cm');assert.equal(label.attrs.x,ellipse.attrs.cx+ellipse.attrs.rx*.38);assert.equal(label.attrs.y,ellipse.attrs.cy-8);}
 });
 test('中1図の仕上げ：正五角形の上下の合同な投影・対応する辺、条件の登録は一致',()=>{
  const d=by('space_001'),n=render(d),lines=n.querySelectorAll('line'),bottom=lines.slice(0,5),vertical=lines.slice(5,10);assert.equal(d.sides,5);assert.equal(d.baseProjection,.55);assert.equal(n.querySelectorAll('text').length,0);
  const top=n.querySelectorAll('path')[0].attrs.d.match(/-?\d+(?:\.\d+)?/g).map(Number);assert.equal(top.length,10);
  for(let i=0;i<5;i++){const l=bottom[i],v=vertical[i],x=l.attrs.x1-245,y=(l.attrs.y1-315)/.55;assert.ok(Math.abs(x*x+y*y-150*150)<1e-7);assert.equal(top[i*2],l.attrs.x1);assert.equal(top[i*2+1],l.attrs.y1-200);assert.equal(v.attrs.x1,v.attrs.x2);assert.equal(v.attrs.y1-v.attrs.y2,200);const next=bottom[(i+1)%5];assert.equal(l.attrs.x2,next.attrs.x1);assert.equal(l.attrs.y2,next.attrs.y1);}
  for(const {id,diagram}of all)assert.equal(JSON.stringify(c.QUESTION_BANK.find(q=>q.id===id).diagram),JSON.stringify(diagram));
 });
};
