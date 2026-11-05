'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto'),{load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader'),{renderer}=require('../lib/diagram-dom');
 const c=load(LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1'),all=require('../../docs/math7-diagrams/round1/samples.json'),ids=all.map(s=>s.id),render=renderer(fs.readFileSync(path.join(__dirname,'../../js/svg/learning.js'),'utf8'));
 test('中1図の登録1：正負12・計算4、計画の対象だけ、本文・解答等を保持',()=>{
  const registered=qs.filter(q=>q.diagram);assert.equal(registered.length,16);assert.equal(registered.filter(q=>q.unit==='signed_numbers').length,12);assert.equal(registered.filter(q=>q.unit==='signed_calc').length,4);
  assert.equal(registered.filter(q=>q.diagram.kind==='numberline').length,14);assert.equal(registered.filter(q=>q.diagram.kind==='quantityBars').length,2);
  assert.deepEqual(registered.map(q=>q.id).sort(),[...ids].sort());assert.ok(!qs.find(q=>q.id==='math_g7_signed_numbers_019').diagram);
  const plan=fs.readFileSync(path.join(__dirname,'../../PICTURE_PLAN_MATH7.md'),'utf8'),planned=plan.split('\n').filter(l=>l.startsWith('|M7-')).flatMap(l=>[...l.matchAll(/`(math_g7_signed_(?:numbers|calc)_\d+)`/g)].map(m=>m[1]));assert.deepEqual(planned.sort(),[...ids].sort());
  const values=qs.map(q=>{const v=JSON.parse(JSON.stringify(q));delete v.diagram;return v;});assert.equal(crypto.createHash('sha256').update(JSON.stringify(values)).digest('hex'),'41c2f0998485c3053520a5490d516b7bb226e5f0d81cf703014c8ce728607773');
 });
 test('中1図の登録1：解答の文字・解答点を追加しない、与条件の比較は同書式',()=>{
  for(const {id,diagram} of all){const q=qs.find(q=>q.id===id);assert.equal(JSON.stringify(q.diagram),JSON.stringify(diagram));const fig=render(diagram),labels=fig.querySelectorAll('text').map(t=>t.textContent);
   // 009では答えそのものも比較対象の与条件。両方を同じ印・大きさで表示。
   if(id.endsWith('numbers_009')){assert.deepEqual(Array.from(diagram.markLabels),['−2.6','−2.06']);assert.deepEqual(Array.from(diagram.marks),[-2.6,-2.06]);const ps=fig.querySelectorAll('circle');assert.equal(ps[0].attrs.r,ps[1].attrs.r);assert.equal(ps[0].attrs.fill,ps[1].attrs.fill);}
   else assert.ok(!labels.includes(q.answer),id+' answer label');
   assert.ok(!diagram.caption.includes(q.answer),id+' caption');assert.ok(!diagram.alt||!diagram.alt.includes(q.answer));
   if(diagram.marks&&q.validationMode==='number'&&!id.endsWith('numbers_009')&&!id.endsWith('numbers_001'))assert.ok(!diagram.marks.includes(c.FF.answer.parseNumber(q.answer)),id+' answer point');
   if(id.endsWith('numbers_001'))assert.deepEqual(Array.from(diagram.markLabels),['海面より12m下']); // 内部の−12は本文の位置であり、答えの符号を表示しない。
   if(diagram.kind==='numberline')assert.deepEqual(Array.from(diagram.labelValues),[0]);
  }
 });
 test('中1図の登録1：小数の間隔・方向だけの矢印・円錐ラベル左配置',()=>{
  const d=all.find(s=>s.id.endsWith('numbers_009')).diagram,ps=render(d).querySelectorAll('circle');assert.ok(Math.abs(ps[1].attrs.cx-ps[0].attrs.cx-.54/3*410)<1e-8);
  const dir=all.find(s=>s.id.endsWith('numbers_004')).diagram;assert.equal(dir.direction,'left');assert.equal(dir.marks.length,0);
  for(const heightValue of [4,6]){const fig=render({kind:'spatialFigure',shape:'cone',radius:3,heightValue,heightLabel:heightValue+'cm'}),labels=fig.querySelectorAll('text');assert.equal(labels.length,2);for(const t of labels){assert.ok(t.attrs.x<245);assert.equal(t.attrs['text-anchor'],'end');}}
 });
};
