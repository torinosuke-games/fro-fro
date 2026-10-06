const {inside,distance}=require('../lib/social-map-geometry');
module.exports=({test,ctx,FF,assert,plain})=>{
 const crypto=require('crypto'),source=require('../fixtures/soc5-prefecture-areas.json');
 const ids=['industry_006','industry_010','industry_011','industry_012','industry_013','climate_011','climate_013','climate_024','terrain_022'].map(id=>'social_g5_hand_'+id);
 const all=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc5'));
 const get=id=>all.find(q=>q.id==='social_g5_hand_'+id).diagram;
 const hash=a=>crypto.createHash('sha256').update(JSON.stringify(a)).digest('hex');
 const inArea=(p,d)=>d.areas.some(r=>inside(p,r));
 test('社会の範囲修正：9問のdiagram以外と対象外351問は不変',()=>{
  assert.equal(all.length,360);assert.equal(hash(all.filter(q=>!ids.includes(q.id))),'98446cf2c5a2df6c9ef3dcc5bc441b75a6940b2400e4b67435b85b64f28e740a');
  assert.equal(hash(all.map(q=>{const v={...q};delete v.diagram;return v;})),'5b2a31ef42e27265d110cd1b81ee27e1ba480c0f8de146ca087d9718b8bce661');
  assert.equal(all.filter(q=>q.diagram?.kind==='image').length,110);
 });
 test('社会の範囲修正：県の形はNatural Earthの指定23県だけ',()=>{
  assert.equal(Object.keys(source.prefectures).length,23);assert.equal(source.filteredSourceSha256,'ecc053cfba5b232be2150af5e20be16f5ce4218fec6196088d83048ab807fa7c');
  const expected={industry_006:['JP-23','JP-24'],industry_010:['JP-13','JP-14'],industry_011:['JP-27','JP-28'],industry_012:['JP-33','JP-34'],industry_013:['JP-10','JP-09','JP-11'],climate_011:['JP-33','JP-34','JP-35','JP-36','JP-37','JP-38'],climate_013:['JP-20','JP-19'],climate_024:['JP-05','JP-06','JP-15','JP-16','JP-17','JP-18']};
  for(const [id,codes]of Object.entries(expected)){
   assert.deepEqual(source.plans[id].codes,codes);const d=get(id),rings=codes.flatMap(code=>source.prefectures[code]);
   assert.equal(d.areas.length,source.plans[id].mergedPieceCount);
   assert.ok(d.areas.flat().length>50,id+' must not revert to a rectangle');
   for(const r of d.areas){assert.ok(r.length>=4);assert.deepEqual(r[0],r.at(-1));
    for(let i=1;i<r.length;i++)for(let j=0;j<=4;j++){const p=[r[i-1][0]+(r[i][0]-r[i-1][0])*j/4,r[i-1][1]+(r[i][1]-r[i-1][1])*j/4];assert.ok(rings.some(s=>inside(p,s))||distance(p,rings)<=.006,id+' outside requested prefectures '+p);}
   }
  }
 });
 test('社会の範囲修正：内陸3県・中央2県を含み、隣の県や別の沿岸を塗らない',()=>{
  for(const p of [[139.06,36.39],[139.88,36.56],[139.65,35.86]])assert.ok(inArea(p,get('industry_013')),'inland reference '+p);
  for(const p of [[138.18,36.65],[138.57,35.66]])assert.ok(inArea(p,get('climate_013')),'central reference '+p);
  assert.ok(!inArea([139.94,35.61],get('industry_010')),'do not paint the east coast in the neighbouring prefecture');
  assert.ok(!inArea([136.76,35.44],get('industry_006')),'do not add an inland neighbouring prefecture');
  assert.ok(!inArea([141.49,40.51],get('climate_024')),'do not add the Pacific coast');
  assert.ok(!inArea([135.16,35.54],get('industry_011')),'do not add the northern coast');
  assert.ok(!inArea([137.14,34.8],get('industry_006')),'do not add the eastern bay');
  for(const p of [[140.33,38.26],[138.93,37.49],[137.22,36.7],[136.64,36.56],[136.22,36.07],[140.4,39.8]])assert.ok(inArea(p,get('climate_024')),'whole prefecture reference '+p);
 });
 test('社会の範囲修正：海は海岸線に沿い、島や外海を塗らない',()=>{
  const d=get('terrain_022');assert.equal(d.marineAreas.length,1);assert.ok(d.marineAreas[0].length>400);
  const filled=p=>d.marineAreas.some(r=>inside(p,r))&&!FF.japanMapData.coasts.some(r=>inside(p,r));
  for(const p of [[133.5,34.18],[135.2,34.5]])assert.ok(filled(p),'sea reference '+p);
  for(const p of [[133.5,34.7],[134.35,34.48],[134.8,33.2],[134,35.7]])assert.ok(!filled(p),'land/island/outside sea '+p);
  assert.ok(source.setoAreaKm2>10000&&source.setoAreaKm2<30000);
 });
 test('社会の範囲修正：工業4問は同じ細い帯、気候は少し広く、点・境界強調なし',()=>{
  for(const id of ['industry_006','industry_010','industry_011','industry_012']){
   const d=get(id),[w,s,e,n]=d.bounds,scale=Math.min(440/((e-w)*.79),340/(n-s));
   assert.equal(source.plans[id].bandViewBoxUnits,8);assert.ok(Math.abs(source.plans[id].coastalBandKm*scale/111-8)<1e-8);
  }
  assert.equal(source.plans.climate_011.bandViewBoxUnits,12);assert.equal(source.plans.climate_024.mode,'whole');
  for(const id of ids){const d=all.find(q=>q.id===id).diagram;assert.deepEqual(d.marks,[]);if(d.areas.length)assert.equal(d.areaOutline,false);if(d.marineAreas)assert.equal(d.marineOutline,false);}
 });
};
