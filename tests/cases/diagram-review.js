'use strict';
// SVG の図の見直し（判断495）：questions/diagram-fixes.js で図を外した問題・直した問題を確かめる
const L=require('../lib/loader');
module.exports=({test,assert,plain})=>{
 const fixed=L.load(L.LOGIC_FILES_WITH_FIXES),orig=L.load();
 const text=require('node:fs').readFileSync(require('node:path').join(L.ROOT,'questions/diagram-fixes.js'),'utf8');
 const removed=[...text.matchAll(/^\s+'([a-z0-9_]+)',?$/gm)].map(m=>m[1]);
 const byId=c=>{const m={};c.QUESTION_BANK.forEach(q=>m[q.id]=q);return m;};
 const F=byId(fixed),O=byId(orig);
 test('図の見直し：外した77問は、もとは SVG の図があり、いまは図がない（絵の図は外さない）',()=>{
  assert.equal(removed.length,77);assert.equal(new Set(removed).size,77);
  removed.forEach(id=>{assert.ok(O[id]&&O[id].diagram&&O[id].diagram.kind!=='image',id+' もとの図');assert.ok(F[id]&&!F[id].diagram,id+' 外す');});
 });
 test('図の見直し：図以外（本文・答え・選択肢）は、外した問題でも変わらない',()=>{
  removed.forEach(id=>{const a=plain(F[id]),b=plain(O[id]);delete b.diagram;assert.deepEqual(a,b,id);});
 });
 test('図の見直し：直した問題（問題文・ラベル）と、ほかの問題は変わらない',()=>{
  assert.equal(F['math_g4_hand_position_001'].diagram.label,'Ｑ');
  assert.equal(F['science_g4_hand_star_018'].diagram.labels[5],'北斗七星');assert.equal(F['science_g4_hand_star_018'].diagram.labels[7],'カシオペヤ座');
  const q=F['math_g4_hand_abacus_015'];assert.ok(q.question.indexOf('買いものの代金を表しています')>=0&&q.question.indexOf('持っているお金')<0);
  assert.ok(q.inputForm.question.indexOf('買いものの代金を表しています')>=0&&q.inputForm.question.indexOf('持っているお金')<0);
  const skip=new Set(removed.concat(['math_g4_hand_abacus_015','math_g4_hand_position_001','science_g4_hand_star_018']));
  Object.keys(O).filter(id=>!skip.has(id)).forEach(id=>assert.deepEqual(plain(F[id]),plain(O[id]),id));
 });
 test('図の見直し：図を外した問題は、書き問題の形（#input）にも図が出ない',()=>{
  const mk=c=>c.FF.learning.expandInputForms?c.FF.learning.expandInputForms(c.QUESTION_BANK):null;
  const all=mk(fixed);if(!all)return;
  removed.forEach(id=>{const v=all.find(q=>q.id===id+'#input');if(v)assert.ok(!v.diagram,id+'#input');});
 });
};
