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
 test('社会地図：印は陸上か検証済みの海岸・離島位置',()=>{
  // 第19弾：細い島の端点・湾は簡略海岸の海側になり得る。
  // 沖ノ鳥島・南鳥島は既存データの範囲外。7地点だけ参照座標に固定する。
  const coastal={position_007:[122.9325,24.4514],position_008:[148.7522,45.5572],position_018:[131.8667,37.2333],position_019:[123.5,25.75],position_027:[136.0697,20.4253],position_028:[153.9867,24.2831],environment_017:[130.383,32.206]};
  for(const q of ctx.QUESTION_BANK.filter(q=>q.diagram&&q.diagram.kind==='japanMap'))for(const p of q.diagram.marks){
   const ref=coastal[q.id.replace(/^social_g5_hand_/,'')];
   if(q.id.startsWith('social_g5_hand_')&&ref){assert.equal(p[0],ref[0]);assert.equal(p[1],ref[1]);if(!q.id.endsWith('position_027')&&!q.id.endsWith('position_028'))assert.ok(distance(p,coasts)<=.1,q.id+' coastal reference');}
   else assert.ok(coasts.some(r=>inside(p,r)),q.id+' '+p);
  }
 });
};
