'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),{load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader'),{renderer}=require('../lib/diagram-dom');const c=load(LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1'),all=require('../../docs/math7-diagrams/round4/samples.json'),r3=require('../../docs/math7-diagrams/round3/samples.json'),render=renderer(fs.readFileSync(path.join(__dirname,'../../js/svg/learning.js'),'utf8'));
 test('中1図の登録4：比例17・平面21、種類・計画一致、形の問題と次単元は図なし',()=>{
  const added=qs.filter(q=>['proportion','plane'].includes(q.unit)&&q.diagram);assert.equal(added.length,37);assert.equal(added.filter(q=>q.unit==='proportion').length,16);assert.equal(added.filter(q=>q.unit==='plane').length,21);
  const counts=added.reduce((o,q)=>(o[q.diagram.kind]=(o[q.diagram.kind]||0)+1,o),{});assert.deepEqual(counts,{coordinate:13,table:4,image:3,mathGeometry:11,circle:6});
  const plan=fs.readFileSync(path.join(__dirname,'../../PICTURE_PLAN_MATH7.md'),'utf8'),ids=plan.split('\n').filter(l=>l.startsWith('|M7-')).flatMap(l=>[...l.matchAll(/`(math_g7_(?:proportion|plane)_\d+)`/g)].map(m=>m[1]));assert.deepEqual(added.map(q=>q.id).sort(),ids.sort());assert.equal(qs.filter(q=>q.diagram).length,103);
  for(const n of ['010','012'])assert.ok(!qs.find(q=>q.id==='math_g7_proportion_'+n).diagram);
 });
 test('中1図の登録4：本文の点のみ、移動後の点・作図の最後の線・解答の式なし',()=>{
  const by=id=>all.find(s=>s.id.endsWith(id)).diagram;
  for(const {id,diagram} of all){const q=qs.find(q=>q.id===id);assert.equal(JSON.stringify(q.diagram),JSON.stringify(diagram));const fig=render(diagram),labels=fig.querySelectorAll('text').map(t=>t.textContent);const answer=q.answer.replace(/\s/g,'');if(q.validationMode!=='number')assert.ok(!fig.textContent.replace(/\s/g,'').includes(answer),id);assert.ok(!diagram.caption.includes(q.answer));assert.ok(!diagram.alt||!diagram.alt.includes(q.answer));
   if(diagram.kind==='coordinate'){assert.ok(!diagram.marks);for(const p of diagram.points||[]){assert.ok(q.question.includes(String(p.x).replace('-','−')),id);assert.ok(q.question.includes(String(p.y).replace('-','−')),id);}assert.ok(!diagram.rangeFill);}
  }
  for(const n of ['009','011','019','022'])assert.equal(by('plane_'+n).points.length,1);
  assert.equal(by('plane_018').segments.length,1);assert.equal(by('plane_020').segments.length,2);assert.equal(by('plane_014').arcs,undefined);assert.equal(by('plane_026').circles,undefined);
  const d=by('plane_020'),p=d.points[3];for(const a of d.arcs)assert.ok(Math.abs(Math.hypot(p[0]-a[0],p[1]-a[1])-a[2])<1e-8);
 });
 test('中1図の登録4：反比例の各枝は0と範囲外で分割、範囲・答えの端点なし',()=>{
  for(const {diagram:d,id} of all.filter(s=>s.diagram.curves?.some(c=>c.power===-1))){const n=render(d),scale=Math.min(360/(d.xRange[1]-d.xRange[0]),320/(d.yRange[1]-d.yRange[0])),left=(520-(d.xRange[1]-d.xRange[0])*scale)/2;
   const lines=n.querySelectorAll('polyline');assert.ok(lines.length>=2,id);for(const l of lines){const xs=l.attrs.points.split(' ').map(p=>(Number(p.split(',')[0])-left)/scale+d.xRange[0]);const matches=d.curves.filter(c=>c.power===-1).some(c=>{const ps=l.attrs.points.split(' ').map(p=>p.split(',').map(Number));return ps.every(p=>Math.abs(((p[0]-left)/scale+d.xRange[0])*((370-p[1])/scale+d.yRange[0])-c.a)<1e-7);});if(matches)assert.ok(xs.every(x=>x<0)||xs.every(x=>x>0),id);}
   assert.equal(n.querySelectorAll('circle').length,(d.points||[]).length,id);
  }
 });
 test('中1図の登録4：生成画像2枚は1200×800・200KB以下、歯車は2問共用',()=>{
  const imgs=all.filter(s=>s.diagram.kind==='image'),sources=[...new Set(imgs.map(s=>s.diagram.src))];assert.equal(imgs.length,3);assert.equal(sources.length,2);assert.equal(imgs.find(s=>s.id.endsWith('_019')).diagram.src,imgs.find(s=>s.id.endsWith('_029')).diagram.src);
  for(const src of sources){const b=fs.readFileSync(path.join(__dirname,'../..',src));assert.ok(b.length<=200000);assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');assert.equal(b.readUInt16LE(26)&16383,1200);assert.equal(b.readUInt16LE(28)&16383,800);}
  assert.ok(fs.readFileSync(path.join(__dirname,'../../HAND_MATH7_PICTURES.md'),'utf8').includes('Exactly two intermeshing'));
 });
 test('中1図の登録3修正：速さを除外、値引きの2区分・残り8区分と水の残りにかっこ',()=>{
  assert.equal(r3.length,10);assert.ok(!qs.find(q=>q.id==='math_g7_equation_021').diagram);
  const d=r3.find(s=>s.id.endsWith('equation_024')).diagram,n=render(d);assert.equal(d.subBrackets,true);assert.equal(n.querySelectorAll('rect').length,10);assert.equal(n.querySelectorAll('path').length,3);
  const water=r3.find(s=>s.id.endsWith('equation_030')).diagram;assert.equal(water.rows.length,1);assert.deepEqual(water.rows[0].cells,['1/3を使う','4L','残り']);assert.equal(water.rows[0].underBrace.index,2);const fig=render(water);assert.equal(fig.querySelectorAll('rect').length,3);assert.ok(fig.textContent.includes('初めの半分'));assert.ok(!fig.textContent.includes('24'));
 });
};
