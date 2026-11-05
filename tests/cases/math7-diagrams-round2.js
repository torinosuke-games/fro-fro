'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),{load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader'),{renderer}=require('../lib/diagram-dom');const c=load(LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1'),all=require('../../docs/math7-diagrams/round2/samples.json'),render=renderer(fs.readFileSync(path.join(__dirname,'../../js/svg/learning.js'),'utf8'));
 test('中1図の登録2：計画の文字と式12・文字式計算2のみ、種類と未登録単元',()=>{
  const added=qs.filter(q=>['expression','expression_calc'].includes(q.unit)&&q.diagram);assert.equal(added.length,13);assert.equal(added.filter(q=>q.unit==='expression').length,11);assert.equal(added.filter(q=>q.diagram.kind==='quantityBars').length,11);assert.equal(added.filter(q=>q.diagram.kind==='table').length,1);assert.equal(added.filter(q=>q.diagram.kind==='mathGeometry').length,1);
  const plan=fs.readFileSync(path.join(__dirname,'../../PICTURE_PLAN_MATH7.md'),'utf8'),ids=plan.split('\n').filter(l=>l.startsWith('|M7-')).flatMap(l=>[...l.matchAll(/`(math_g7_expression(?:_calc)?_\d+)`/g)].map(m=>m[1]));assert.deepEqual(added.map(q=>q.id).sort(),ids.sort());
  assert.equal(qs.filter(q=>q.diagram).length,76);assert.ok(qs.filter(q=>!['signed_numbers','signed_calc','expression','expression_calc','equation','equation_calc','proportion','plane'].includes(q.unit)).every(q=>!q.diagram));
 });
 test('中1図の登録2：与条件の帯・全体のかっこ、答えの式は描かない',()=>{
  for(const {id,diagram} of all){const q=qs.find(q=>q.id===id);assert.equal(JSON.stringify(q.diagram),JSON.stringify(diagram));const fig=render(diagram);const text=fig.textContent.replace(/\s/g,'');assert.ok(!text.includes(q.answer.replace(/\s/g,'')),id);assert.ok(!diagram.caption.includes(q.answer));
   if(diagram.kind==='quantityBars'){assert.ok(fig.querySelectorAll('rect').length);assert.ok(fig.querySelectorAll('path').length,'whole brace '+id);if(!id.endsWith('expression_017'))assert.ok(!text.includes('…'));}
  }
 });
 test('中1図の登録1修正：出発点の方向矢印・温度の未解決の終点・得点差',()=>{
  const a=require('../../docs/math7-diagrams/round1/samples.json'),find=id=>a.find(s=>s.id.endsWith(id)).diagram;
  for(const [id,start] of [['numbers_004',0],['calc_001',-7]]){const d=find(id),n=render(d),x=55+(start-d.start)/(d.end-d.start)*410;assert.ok(n.querySelectorAll('line').some(l=>l.attrs.x1===x&&l.attrs.y1===85));}
  const temp=find('calc_022');assert.equal(temp.kind,'numberline');assert.equal(temp.vertical,true);assert.equal(temp.directionStart,-3);assert.deepEqual(temp.marks,[-3]);assert.equal(temp.direction,'down');
  const scores=find('calc_026'),rs=render(scores).querySelectorAll('rect');assert.deepEqual(scores.deviations,[6,-4,7]);assert.deepEqual(rs.map(r=>r.attrs.height),[108,72,126]);assert.deepEqual(rs.map(r=>r.attrs.y),[122,230,104]);
 });
};
