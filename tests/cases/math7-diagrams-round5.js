'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),{load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader'),{renderer}=require('../lib/diagram-dom');const c=load(LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1'),all=require('../../docs/math7-diagrams/round5/samples.json'),r4=require('../../docs/math7-diagrams/round4/samples.json'),render=renderer(fs.readFileSync(path.join(__dirname,'../../js/svg/learning.js'),'utf8'));
 test('中1図の登録5：空間21・資料7、計画と登録の最終103問が一致',()=>{
  const added=qs.filter(q=>['space','data'].includes(q.unit)&&q.diagram);assert.equal(added.length,28);assert.equal(added.filter(q=>q.unit==='space').length,21);assert.equal(added.filter(q=>q.unit==='data').length,7);
  assert.deepEqual(added.reduce((o,q)=>(o[q.diagram.kind]=(o[q.diagram.kind]||0)+1,o),{}),{spatialFigure:14,mathGeometry:2,solid3d:5,table:7});
  const plan=fs.readFileSync(path.join(__dirname,'../../PICTURE_PLAN_MATH7.md'),'utf8'),ids=plan.split('\n').filter(l=>l.startsWith('|M7-')).flatMap(l=>[...l.matchAll(/`(math_g7_\w+)`/g)].map(m=>m[1]));assert.equal(ids.length,103);assert.deepEqual(qs.filter(q=>q.diagram).map(q=>q.id).sort(),ids.sort());assert.equal(plan.split('\n').filter(l=>l.startsWith('|M7-')).length,102); // 歯車だけを1制作物として2問で共用。
 });
 test('中1図の登録5：寸法は与条件だけ、立体名・面数・解・展開・投影を追加しない',()=>{
  for(const {id,diagram} of all){const q=qs.find(q=>q.id===id);assert.equal(JSON.stringify(q.diagram),JSON.stringify(diagram));const fig=render(diagram),labels=fig.querySelectorAll('text').map(t=>t.textContent),text=fig.textContent.replace(/\s/g,'');
   if(Number.isFinite(c.FF.answer.parseNumber(q.answer)))assert.ok(!labels.includes(q.answer),id);else assert.ok(!text.includes(q.answer.replace(/\s/g,'')),id);assert.ok(!diagram.caption.includes(q.answer));
   if(q.unit==='space'){assert.ok(!/角柱|円柱|角錐|円錐|半球|立面図|平面図|展開図|体積|表面積/.test(labels.join('')),id);assert.ok(!diagram.net&&!diagram.projection);}
  }
  const by=id=>all.find(s=>s.id.endsWith(id)).diagram;
  assert.deepEqual(by('space_013').vertices.map(v=>v.label),'ABCDEFGH'.split(''));
  assert.ok(!by('space_016').heightLabel);assert.ok(!by('space_020').angle);assert.equal(by('space_024').solids[1].dimensionLabels,undefined);
 });
 test('中1図の登録5：資料は元の階級・度数だけ、累積・計算列や行の強調なし',()=>{
  const data=all.filter(s=>s.id.includes('_data_'));assert.equal(data.length,7);
  for(const {diagram:d,id} of data){assert.equal(d.kind,'table');assert.ok(!d.head.some(t=>/累積|合計|積の列/.test(t)),id);assert.ok(!d.highlight&&!d.colors);assert.ok(d.rows.every(r=>r.length===d.head.length));}
  const get=n=>data.find(s=>s.id.endsWith('_'+n)).diagram.rows;
  assert.deepEqual(get('010'),[['0以上10未満','3'],['10以上20未満','7'],['20以上30未満','5']]);assert.deepEqual(get('012'),[['0以上10未満','2'],['10以上20未満','5'],['20以上30未満','3']]);assert.deepEqual(get('028'),[['10未満','4'],['10以上20未満','8'],['20以上30未満','8']]);
 });
 test('中1図の登録4修正：半径は円内・線の上、座標は単位目盛りと共通の原点周辺配置',()=>{
  const by=id=>r4.find(s=>s.id.endsWith(id)).diagram;assert.equal(r4.length,37);assert.ok(!qs.find(q=>q.id==='math_g7_proportion_018').diagram);
  const n=render(by('plane_007')),label=n.querySelectorAll('text').find(t=>t.textContent==='半径 5cm');assert.ok(label.attrs.x<330);assert.ok(label.attrs.y<175);
  const d=by('plane_009');assert.deepEqual(d.xRange,[-6,6]);assert.deepEqual(d.yRange,[-6,6]);assert.equal(d.gridStep,1);assert.equal(d.tickStep,2);
  for(const s of r4.filter(s=>s.diagram.kind==='coordinate')){const n=render(s.diagram),texts=n.querySelectorAll('text'),ox=texts.find(t=>t.textContent==='y').attrs.x,originY=texts.find(t=>t.textContent==='x').attrs.y-8;
   assert.ok(!texts.some(t=>t.attrs.x===ox-13&&t.textContent===String(-s.diagram.tickStep).replace('-','−')),s.id);
   if(s.id.endsWith('plane_009'))assert.ok(texts.some(t=>t.textContent==='2'&&t.attrs.y<originY));
  }
 });
};
