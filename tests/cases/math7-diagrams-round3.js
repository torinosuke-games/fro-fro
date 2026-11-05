'use strict';
module.exports=({test,assert})=>{
 const fs=require('fs'),path=require('path'),{load,LOGIC_FILES_WITH_FIXES}=require('../lib/loader'),{renderer}=require('../lib/diagram-dom');const c=load(LOGIC_FILES_WITH_FIXES),qs=c.QUESTION_BANK.filter(q=>q.collection==='course_ma7_1'),all=require('../../docs/math7-diagrams/round3/samples.json'),r2=require('../../docs/math7-diagrams/round2/samples.json'),render=renderer(fs.readFileSync(path.join(__dirname,'../../js/svg/learning.js'),'utf8'));
 test('中1図の登録3：方程式9・計算2、全11点が計画と一致、次単元なし',()=>{
  const added=qs.filter(q=>['equation','equation_calc'].includes(q.unit)&&q.diagram);assert.equal(added.length,11);assert.equal(added.filter(q=>q.unit==='equation').length,9);assert.ok(added.every(q=>q.diagram.kind==='quantityBars'));
  const plan=fs.readFileSync(path.join(__dirname,'../../PICTURE_PLAN_MATH7.md'),'utf8'),ids=plan.split('\n').filter(l=>l.startsWith('|M7-')).flatMap(l=>[...l.matchAll(/`(math_g7_equation(?:_calc)?_\d+)`/g)].map(m=>m[1]));assert.deepEqual(added.map(q=>q.id).sort(),ids.sort());assert.equal(qs.filter(q=>q.diagram).length,39);assert.ok(qs.filter(q=>['proportion','plane','space','data'].includes(q.unit)).every(q=>!q.diagram));
 });
 test('中1図の登録3：方程式・解を加えず、比較の帯の基準位置は縦の点線',()=>{
  for(const {id,diagram} of all){const q=qs.find(q=>q.id===id);assert.equal(JSON.stringify(q.diagram),JSON.stringify(diagram));const fig=render(diagram),labels=fig.querySelectorAll('text').map(t=>t.textContent),text=labels.join('').replace(/\s/g,'');
   if(q.validationMode==='number')assert.ok(!labels.includes(q.answer),id);else assert.ok(!text.includes(q.answer.replace(/\s/g,'')),id);
   assert.ok(!/[＝=]/.test(text),id+' equation');assert.ok(!diagram.caption.includes(q.answer));assert.ok(fig.querySelectorAll('rect').length);assert.ok(fig.querySelectorAll('path').length);
   if(diagram.aligned){const guide=diagram.guide||435;assert.ok(fig.querySelectorAll('line').some(l=>l.attrs.x1===guide&&l.attrs.x2===guide&&l.attrs['stroke-dasharray']==='6 6'),id);assert.equal(diagram.rows.length,2);}
  }
 });
 test('中1図の登録2修正：値引き10等分・束の省略・支払額との差・速さなし',()=>{
  const by=id=>r2.find(s=>s.id.endsWith(id)).diagram;assert.equal(r2.length,13);assert.ok(!qs.find(q=>q.id==='math_g7_expression_011').diagram);
  const discount=render(by('expression_013'));assert.equal(discount.querySelectorAll('rect').length,10);assert.ok(discount.textContent.includes('値引き'));assert.ok(!/8割|0.8|2割引き/.test(discount.textContent));
  const bundle=render(by('expression_017'));assert.ok(bundle.textContent.includes('…'));assert.ok(!bundle.textContent.includes('束の数は示していない'));assert.equal(bundle.querySelectorAll('text').filter(t=>t.textContent==='3冊').length,2);
  const d=by('expression_022'),fig=render(d);assert.equal(d.rows[0].width,d.rows[1].width);assert.equal(d.rows[1].dashed,4);assert.ok(fig.querySelectorAll('rect').some(r=>r.attrs['stroke-dasharray']==='6 6'));assert.ok(fig.textContent.includes('差'));
 });
};
