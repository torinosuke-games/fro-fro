// 第19弾：48問の図のみ。第18弾110画像とすべての問題内容を保護する。
module.exports=({test,FF,ctx,assert,plain})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto');
 const ids=[...fs.readFileSync(path.join(__dirname,'../../DIAGRAM_REQUESTS_19.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'social_g5_hand_'+m[1]);
 const all=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc5'&&!q.id.startsWith('social_g5_stat_'))),qs=all.filter(q=>ids.includes(q.id));
 const get=id=>qs.find(q=>q.id==='social_g5_hand_'+id).diagram;
 const hash=a=>crypto.createHash('sha256').update(JSON.stringify(a)).digest('hex');
 function range(d){
  assert.equal(d.study,true);assert.ok(typeof d.caption==='string'&&d.caption.trim());assert.ok(!/\d/.test(d.caption));
  if(d.kind==='earthScene'){assert.ok(['latitude','longitude','equator','seaZones','shelf'].includes(d.scene));if(d.scene==='seaZones')assert.ok(['near','outer'].includes(d.focus));return;}
  assert.equal(d.kind,'japanMap');assert.ok(Array.isArray(d.bounds)&&d.bounds.length===4&&d.bounds.every(Number.isFinite));
  const [w,s,e,n]=d.bounds;assert.ok(w<e&&s<n&&w>=120&&e<=156&&s>=19&&n<=47);
  function point(p){assert.ok(Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&p[0]>=w&&p[0]<=e&&p[1]>=s&&p[1]<=n);}
  function polygon(p){assert.ok(Array.isArray(p)&&p.length>=3);p.forEach(point);}
  assert.ok(d.marks.length<=2);d.marks.forEach(point);d.areas.forEach(polygon);(d.marineAreas||[]).forEach(polygon);
  for(const r of d.routes){assert.ok(['river','ridge'].includes(r.type));assert.ok(r.points.length>=2);r.points.forEach(point);}
  for(const c of d.currents||[]){assert.ok(['warm','cold'].includes(c.tone));assert.ok(c.points.length>=2);c.points.forEach(point);const a=c.points.at(-2),b=c.points.at(-1);assert.ok(a[0]!==b[0]||a[1]!==b[1]);}
  if(d.meridian!==undefined)assert.ok(Number.isFinite(d.meridian)&&d.meridian>=w&&d.meridian<=e);
  assert.ok(Array.isArray(d.lakes));d.lakes.forEach(polygon);
 }
 test('小5社会：360問の48問のdiagram以外が不変、110画像を維持',()=>{
  assert.equal(all.length,360);assert.equal(new Set(ids).size,48);assert.equal(qs.length,48);
  assert.equal(hash(all.map(q=>{const v={...q};if(ids.includes(q.id))delete v.diagram;return v;})),'a59d220561af5f8130a31682166b44214e35b21b8904c840764d33ddbab10727');
  assert.equal(all.filter(q=>q.diagram?.kind==='image').length,110);assert.equal(all.filter(q=>q.diagram).length,158);
 });
 test('小5社会：42地図＋6模式図と書き問題への継承',()=>{
  assert.equal(qs.filter(q=>q.diagram.kind==='japanMap').length,42);assert.equal(qs.filter(q=>q.diagram.kind==='earthScene').length,6);
  const bank=FF.learning.createBank(ctx.QUESTION_BANK);for(const q of qs){range(q.diagram);assert.deepEqual(plain(FF.learning.validateQuestion(q)),[]);if(q.inputForm)assert.deepEqual(plain(bank.byId[q.id+'#input'].diagram),q.diagram);}
 });
 test('小5社会：模式図・地図の範囲と不正データを検出',()=>{
  for(const [id,mutate]of [['position_010',d=>d.scene='answer'],['position_014',d=>d.focus='both'],['position_007',d=>d.marks[0]=[0,0]],['position_017',d=>d.areas[0]=[[145,44]]],['position_009',d=>d.meridian=NaN],['terrain_019',d=>d.currents[0].tone='result'],['terrain_020',d=>d.currents[0].points[1]=[200,80]],['terrain_021',d=>d.marineAreas[0]=[]],['terrain_024',d=>d.routes[0].type='answer']]){const d=plain(get(id));mutate(d);assert.throws(()=>range(d));}
 });
 test('小5社会：captionに解答名・数値を表示せず、余分な印を足さない',()=>{
  for(const q of qs){const answer=q.answer.replace(/[（(].*?[）)]/g,'');assert.ok(!q.diagram.caption.includes(answer),q.id+' answer in caption');
   assert.ok(!/与那国|択捉|竹島|尖閣|沖ノ鳥|南鳥|北方領土|琵琶湖|平野|山脈|黒潮|親潮|潮目|瀬戸内|新潟|山形|鹿児島|宮崎|愛知|京浜|阪神|工業地帯|成田|四日市|水俣|富山/.test(q.diagram.caption),q.id);
   if(q.diagram.kind==='japanMap'){assert.ok(!q.diagram.regionBoundaries&&!q.diagram.mountain&&!q.diagram.port&&!q.diagram.inset);}
  }
  assert.deepEqual(get('food_017').marks,[[130.55,31.7],[131.25,32]]);assert.equal(get('fishery_020').marks.length,1);assert.equal(get('industry_022').marks.length,1);
  assert.equal(get('position_017').areas.length,4);assert.equal(get('landlife_030').areas.length,2);
 });
 test('小5社会：矢印は依頼された海流4問のみ、暖流は北へ寒流は南へ',()=>{
  const currentIds=qs.filter(q=>q.diagram.currents).map(q=>q.id).sort();
  assert.deepEqual(currentIds,['fishery_004','terrain_019','terrain_020','terrain_021'].map(id=>'social_g5_hand_'+id).sort());
  for(const q of qs)for(const c of q.diagram.currents||[]){const delta=c.points.at(-1)[1]-c.points[0][1];assert.ok(c.tone==='warm'?delta>0:delta<0);}
  assert.equal(get('terrain_021').marineAreas.length,1);assert.equal(get('fishery_004').marineAreas.length,1);
  assert.deepEqual(get('terrain_021').currents[0].points.at(-1),get('terrain_021').currents[1].points.at(-1));
 });
 test('小5社会：印の参照座標と共通の川・山の経路',()=>{
  const refs={position_007:[122.9325,24.4514],position_008:[148.7522,45.5572],position_027:[136.0697,20.4253],position_028:[153.9867,24.2831],position_018:[131.8667,37.2333],position_019:[123.5,25.75],industry_022:[140.386,35.772]};
  for(const [id,p]of Object.entries(refs))assert.deepEqual(get(id).marks,[p]);
  for(const [id,source]of [['terrain_012','geography_011'],['terrain_027','geography_010'],['terrain_032','geography_007']])assert.deepEqual(get(id).routes,plain(ctx.QUESTION_BANK.find(q=>q.id==='social_g4_hand_'+source).diagram.routes));
  assert.equal(get('terrain_014').routes.length,3);assert.equal(get('position_009').meridian,135);
 });
};
