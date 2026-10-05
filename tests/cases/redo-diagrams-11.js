'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {distance}=require('../lib/social-map-geometry');
module.exports=({test,FF,ctx,assert,plain})=>{
 const root=path.resolve(__dirname,'../..'),get=id=>plain(ctx.QUESTION_BANK.find(q=>q.id===id)).diagram;
 const imageIds=['water_004','water_013','water_021','pioneer_012','industry_007'].map(s=>'social_g4_hand_'+s);
 const mapIds=['prefecture_004','geography_015','geography_019','industry_013','industry_014'].map(s=>'social_g4_hand_'+s);
 const hash=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
 test('第11弾：指定以外の社会286問・算数467問は図も含め変更なし',()=>{
  const social=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc4'));
  const math=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_g4'));
  assert.equal(hash(social.filter(q=>!imageIds.concat(mapIds).includes(q.id))),'07d2f138e5f74b802fb50a030c53f15fa9fc499ce0d396515d5bb66fc365beef');
  assert.equal(hash(math.filter(q=>q.id!=='math_g4_hand_graph_005')),'290597fa0145b6ba853f26f8702ebb23faeb65c4002a866777d5a276dfbaaac3');
 });
 test('第11弾：生成5枚は固有（water_007 は変更前の絵のまま。判断268）の800×533 WebP・各100KB以下',()=>{
  const sources=[];for(const id of imageIds){const d=get(id),q=ctx.QUESTION_BANK.find(q=>q.id===id),f=fs.readFileSync(path.join(root,d.src));
   assert.equal(d.kind,'image');assert.ok(d.caption&&d.alt);assert.equal(d.study,true);
   assert.ok(!d.caption.includes(q.answer)&&!d.alt.includes(q.answer));
   assert.equal(f.toString('ascii',8,12),'WEBP');assert.equal(f.toString('ascii',12,16),'VP8 ');
   assert.equal(f.readUInt16LE(26)&0x3fff,800);assert.equal(f.readUInt16LE(28)&0x3fff,533);assert.ok(f.length<=100000,id);
   sources.push(d.src);
  }assert.equal(new Set(sources).size,5);
 });
 test('第11弾：地方境界・別枠の範囲と、富士山・港の余計な印を検証',()=>{
  const d=get('social_g4_hand_prefecture_004');assert.equal(d.regionBoundaries,true);assert.deepEqual(d.marks,[[130.42,33.6]]);
  assert.ok(d.bounds[2]-d.bounds[0]<18);assert.deepEqual(d.inset.bounds,[122.7,24,130,30]);
  const borders=plain(FF.japanMapData.regionBoundaries);assert.equal(borders.length,5);assert.equal(borders.flat().length,199);
  function ranges(lines){for(const ps of lines){assert.ok(ps.length>=2);for(const p of ps){assert.equal(p.length,2);assert.ok(p.every(Number.isFinite));assert.ok(p[0]>=130&&p[0]<=142&&p[1]>=33&&p[1]<=39);}}}
  ranges(borders);const bad=JSON.parse(JSON.stringify(borders));bad[0][0][0]=0;assert.throws(()=>ranges(bad));
  const f=get('social_g4_hand_geography_015');assert.deepEqual(f.marks,[]);assert.deepEqual(f.mountain,[138.73,35.36]);assert.ok(f.bounds[2]-f.bounds[0]<2);
  for(const id of ['social_g4_hand_industry_013','social_g4_hand_industry_014']){const m=get(id);assert.equal(m.marks.length,1);assert.equal(m.port,undefined);assert.ok(m.bounds[2]-m.bounds[0]<2.1);assert.deepEqual(m.areas,[]);assert.deepEqual(m.routes,[]);}
 });
 test('第11弾：半島の色の輪郭は海岸の連続した原頂点と閉点だけ',()=>{
  const d=get('social_g4_hand_geography_019'),coasts=plain(FF.japanMapData.coasts),r=coasts.find(r=>r.some(p=>p[0]>136.8&&p[0]<137.4&&p[1]>37.4));
  assert.deepEqual(d.areas,[r.slice(178,210).concat([r[178]])]);
  for(const p of d.areas[0])assert.equal(distance(p,coasts),0);
  assert.deepEqual(d.areas[0][0],d.areas[0].at(-1));
 });
 test('第11弾：1刻みの補助線はgraph_005だけ・値とラベルと書き問題を維持',()=>{
  const d=get('math_g4_hand_graph_005');assert.equal(d.minorStep,1);
  assert.deepEqual(d.values,[20,26,24,18,18,30]);assert.deepEqual(d.labels,['月','火','水','木','金','土']);
  const qs=ctx.QUESTION_BANK.filter(q=>q.diagram&&q.diagram.minorStep!==undefined);assert.equal(qs.length,1);assert.equal(qs[0].id,'math_g4_hand_graph_005');
  const bank=FF.learning.createBank(ctx.QUESTION_BANK);assert.deepEqual(plain(bank.byId['math_g4_hand_graph_005#input'].diagram),d);
 });
};
