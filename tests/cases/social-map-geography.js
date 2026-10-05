'use strict';
const {inside,distance}=require('../lib/social-map-geometry');
const {landmarks}=require('../fixtures/social-map-landmarks.json');
module.exports=({test,FF,ctx,assert})=>{
 const {coasts,lake,maxDeviation}=FF.japanMapData;
 test('社会地図：静的な実測由来の海岸線と湖の座標範囲',()=>{
  assert.equal(coasts.length,328);assert.equal(coasts.reduce((n,r)=>n+r.length,0),2957);
  assert.ok(maxDeviation<=.025);
  for(const ring of [...coasts,lake]){assert.ok(ring.length>=4);assert.deepEqual(ring[0],ring[ring.length-1]);for(const p of ring){assert.equal(p.length,2);assert.ok(p.every(Number.isFinite));assert.ok(p[0]>=122&&p[0]<=150&&p[1]>=23&&p[1]<=46);}}
 });
 test('社会地図：地名集の14岬は海岸線から0.1度以内',()=>{
  const caps=landmarks.filter(p=>p.type==='cape');assert.equal(caps.length,14);
  for(const p of caps)assert.ok(distance(p.point,coasts)<=.1,p.name+' '+distance(p.point,coasts));
 });
 test('社会地図：都市・半島は陸上、13島と湖はそれぞれの輪郭に対応',()=>{
  for(const p of landmarks.filter(p=>p.type==='city'))assert.ok(coasts.some(r=>inside(p.point,r)),p.name);
  const islands=landmarks.filter(p=>p.type==='island');assert.equal(islands.length,13);
  // 地名集の注記位置が細い島の海側にある場合は、最寄りの実海岸が0.1度以内か確認する。
  const owners=islands.map(p=>{let i=coasts.findIndex(r=>inside(p.point,r));if(i<0){const ds=coasts.map(r=>distance(p.point,[r])),nearest=Math.min(...ds);assert.ok(nearest<=.1,p.name+' '+nearest);i=ds.indexOf(nearest);}return i;});
  assert.equal(new Set(owners).size,13,'separate islands must not be joined');
  assert.ok(inside(landmarks.find(p=>p.type==='lake').point,lake));
  assert.ok(!coasts.some(r=>inside([130.96,33.945],r)),'関門海峡の海を残す');
 });
 test('社会地図：問題の地域の印が海へずれない',()=>{
  for(const q of ctx.QUESTION_BANK.filter(q=>q.diagram&&q.diagram.kind==='japanMap'))for(const p of q.diagram.marks)assert.ok(coasts.some(r=>inside(p,r)),q.id+' '+p);
 });
};
