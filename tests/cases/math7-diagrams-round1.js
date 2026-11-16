'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto'),{load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader'),{renderer}=require('../lib/diagram-dom');
 const c=load(LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1'),all=require('../../docs/math7-diagrams/round1/samples.json'),ids=all.map(s=>s.id),render=renderer(fs.readFileSync(path.join(__dirname,'../../js/svg/learning.js'),'utf8'));
 test('中1図の登録1：正負11・計算4、計画の対象だけ、本文・解答等を保持',()=>{
  const registered=qs.filter(q=>q.diagram&&['signed_numbers','signed_calc'].includes(q.unit));assert.equal(registered.length,15);assert.equal(registered.filter(q=>q.unit==='signed_numbers').length,11);assert.equal(registered.filter(q=>q.unit==='signed_calc').length,4);
  assert.equal(registered.filter(q=>q.diagram.kind==='numberline').length,14);assert.equal(registered.filter(q=>q.diagram.kind==='quantityBars').length,1);
  assert.deepEqual(registered.map(q=>q.id).sort(),[...ids].sort());assert.ok(!qs.find(q=>q.id==='math_g7_signed_numbers_019').diagram);
  const plan=fs.readFileSync(path.join(__dirname,'../../PICTURE_PLAN_MATH7.md'),'utf8'),planned=plan.split('\n').filter(l=>l.startsWith('|M7-')).flatMap(l=>[...l.matchAll(/`(math_g7_signed_(?:numbers|calc)_\d+)`/g)].map(m=>m[1]));assert.deepEqual(planned.sort(),[...ids].sort());
  const values=qs.map(q=>{const v=JSON.parse(JSON.stringify(q));delete v.diagram;return v;});assert.equal(crypto.createHash('sha256').update(JSON.stringify(values)).digest('hex'),'41c2f0998485c3053520a5490d516b7bb226e5f0d81cf703014c8ce728607773');
 });
 test('中1図の登録1：解答の文字・解答点を追加しない、与条件の比較は同書式',()=>{
  for(const {id,diagram} of all){const q=qs.find(q=>q.id===id);assert.equal(JSON.stringify(q.diagram),JSON.stringify(diagram));const fig=render(diagram),labels=fig.querySelectorAll('text').map(t=>t.textContent);
   const ordinary=(diagram.labelValues||[]).map(v=>String(v).replace('-','−'));assert.ok(!labels.includes(q.answer)||ordinary.includes(q.answer),id+' answer label');
   assert.ok(!diagram.caption.includes(q.answer),id+' caption');assert.ok(!diagram.alt||!diagram.alt.includes(q.answer));
   if(diagram.marks&&q.validationMode==='number'&&!id.endsWith('numbers_009')&&!id.endsWith('numbers_001'))assert.ok(!diagram.marks.includes(c.FF.answer.parseNumber(q.answer)),id+' answer point');
   if(id.endsWith('numbers_001'))assert.deepEqual(Array.from(diagram.markLabels),['海面より12m下']); // 内部の−12は本文の位置であり、答えの符号を表示しない。
   if(diagram.kind==='numberline'){assert.ok(diagram.labelValues.length>=2);for(const v of diagram.marks||[])assert.ok(Math.abs((v-diagram.start)/diagram.step-Math.round((v-diagram.start)/diagram.step))<1e-6);}
  }
 });
 test('中1図の登録1：小数の間隔・方向だけの矢印・円錐ラベル左配置',()=>{
  assert.ok(!qs.find(q=>q.id==='math_g7_signed_numbers_009').diagram);
  const dir=all.find(s=>s.id.endsWith('numbers_004')).diagram;assert.equal(dir.direction,'left');assert.equal(dir.marks.length,0);
  for(const heightValue of [4,6]){const fig=render({kind:'spatialFigure',shape:'cone',radius:3,heightValue,heightLabel:heightValue+'cm'}),labels=fig.querySelectorAll('text');assert.equal(labels.length,2);for(const t of labels){assert.ok(t.attrs.x<245);assert.equal(t.attrs['text-anchor'],'end');}}
 });
};
