// 小5・第3〜5弾：118問。問題データの不変性と共通図の入力を保護する。
module.exports=({test,FF,ctx,assert,plain})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto');
 const waves=[3,4,5].map(n=>[...fs.readFileSync(path.join(__dirname,'../../DIAGRAM_REQUESTS_'+n+'.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'math_g5_hand_'+m[1]));
 const ids=waves.flat(),all=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_g5'),qs=all.filter(q=>ids.includes(q.id));
 const hash=a=>crypto.createHash('sha256').update(JSON.stringify(a)).digest('hex');
 const positive=n=>Number.isFinite(n)&&n>0,integer=n=>Number.isInteger(n)&&n>0;
 function range(d){
  assert.ok(d.caption.trim());assert.ok(d.study);
  if(d.kind==='polygon'){
   assert.ok(d.panels.length>0&&d.panels.length<=2);
   for(const p of d.panels){assert.ok(p.points.length>=3&&p.points.length<=12);for(const v of p.points)assert.ok(v.length===2&&v.every(Number.isFinite));assert.ok(new Set(p.points.map(v=>v.join(','))).size===p.points.length);assert.ok(Array.isArray(p.notes));for(const s of p.segments||[])assert.ok(s.length===2&&s[0]!==s[1]&&s.every(i=>Number.isInteger(i)&&i>=0&&i<p.points.length));if(p.names)assert.equal(p.names.length,p.points.length);if(p.angleLabels)assert.equal(p.angleLabels.length,p.points.length);if(p.people)assert.ok(integer(p.people));for(const v of p.heights||[])assert.ok(v.length===4&&v.every(Number.isFinite));}
  }else if(d.kind==='solid3d'){
   assert.ok(['box','cube','prism','cylinder'].includes(d.shape));assert.ok(d.dimensions.length===3&&d.dimensions.every(positive));assert.deepEqual(plain(d.vertices),[]);
   if(d.cut!==undefined)assert.ok(positive(d.cut)&&d.dimensions.every(v=>v>=d.cut));if(d.block!==undefined)assert.ok(positive(d.block)&&d.dimensions.every(v=>v>=d.block));
   if(d.join)assert.ok(d.join.length===3&&d.join.every(positive));if(d.stack)assert.ok(d.dimensions.every(integer));
   if(d.water!==undefined)assert.ok(positive(d.water)&&d.water+(d.rise||0)<=d.dimensions[2]);if(d.thickness!==undefined)assert.ok(positive(d.thickness)&&d.dimensions.every(v=>v>2*d.thickness));if(d.baseSides)assert.ok(integer(d.baseSides)&&d.baseSides>=3);if(d.baseView!==undefined)assert.ok(d.baseView==='front'&&d.shape==='prism'&&d.baseSides===3);
  }else if(d.kind==='band'){
   assert.ok(d.rows.length>0);for(const r of d.rows){assert.equal(r.parts.length,r.labels.length);assert.ok(r.parts.every(positive));if(r.scale)assert.ok(r.scale>=r.parts.reduce((a,b)=>a+b,0));}
  }else if(d.kind==='fraction'){
   for(const r of d.rows){assert.ok(integer(r.n)&&integer(r.d)&&r.n<=r.d);for(const f of r.pieces||[])assert.ok(f.length===2&&f.every(integer)&&f[0]<=f[1]);if(r.pieces){assert.equal(r.pieces.length,r.pieceLabels.length);assert.ok(r.pieces.reduce((s,f)=>s+f[0]/f[1],0)<=1);}if(r.used)assert.ok(r.used.every(integer)&&r.used[0]/r.used[1]<=r.n/r.d);}
  }else if(d.kind==='numberline'){
   assert.ok(Number.isFinite(d.start)&&d.end>d.start&&positive(d.step));for(const r of d.rows){assert.equal(r.marks.length,r.labels.length);assert.ok(r.marks.every(v=>Number.isFinite(v)&&v>=d.start&&v<=d.end));assert.ok(Number.isInteger(r.subdivisions)&&r.subdivisions>=0);}
  }else if(d.kind==='measure'){assert.ok(positive(d.capacity)&&d.values.every(v=>positive(v)&&v<=d.capacity));assert.equal(d.values.length,d.labels.length);if(d.waterFill!==undefined)assert.equal(d.waterFill,'blue');}
  else if(d.kind==='table'){assert.ok(d.head.length>=2);for(const row of d.rows)assert.equal(row.length,d.head.length);}
  else if(d.kind==='rect'){assert.ok(d.w==='？'||positive(d.w));assert.ok(positive(d.h));if(d.area!==undefined)assert.ok(positive(d.area));}
  else if(d.kind==='triangle'){assert.ok(positive(d.base)&&positive(d.height));}
  else if(d.kind==='coordinate'){assert.ok(d.xRange[1]>d.xRange[0]&&d.yRange[1]>d.yRange[0]);assert.ok(d.knownPoint.every(Number.isFinite));assert.equal(d.knownPoint[1],d.a*d.knownPoint[0]+d.b);}
  else if(d.kind==='pie'){assert.ok(d.sectors.every(positive));assert.equal(d.sectors.reduce((a,b)=>a+b,0),100);assert.equal(d.sectors.length,d.sectorLabels.length);}
  else if(d.kind==='tape'||d.kind==='bars'){assert.equal(d.values.length,d.labels.length);assert.ok(d.values.every(positive));}
  else if(d.kind==='doubleLine'){assert.equal(d.labels.length,2);assert.equal(d.starts.length,2);assert.equal(d.ends.length,2);}
  else if(d.kind==='circle'){assert.ok(positive(d.radius)&&d.diameter===2*d.radius);}
  else assert.fail(d.kind);
 }
 test('小5の図：470問の図以外と対象外352問は元データから不変',()=>{
  assert.equal(all.length,470);assert.equal(hash(all.map(q=>{const v=plain(q);if(ids.includes(q.id))delete v.diagram;return v;})),'bfcfee918d6c6dde0e6e2443d555495d703f6a967c21e73837d731c092887eda');
  assert.equal(hash(all.filter(q=>!ids.includes(q.id))),'4d4c6b62b6a88204f4d70100aad011808be7b181c0ef0df57d28dd49fa6a68c4');
 });
 test('小5の図：44＋25＋49＝118問の網羅と書き問題の継承',()=>{
  assert.deepEqual(waves.map(a=>a.length),[44,25,49]);assert.equal(new Set(ids).size,118);assert.equal(qs.length,118);const bank=FF.learning.createBank(ctx.QUESTION_BANK);
  for(const q of qs){assert.equal(q.reviewed,false);assert.deepEqual(plain(FF.learning.validateQuestion(q)),[]);range(q.diagram);if(q.inputForm)assert.deepEqual(plain(bank.byId[q.id+'#input'].diagram),plain(q.diagram));}
 });
 test('小5の図：不正な座標・添字・寸法・割合・分母を検出する',()=>{
  const get=s=>plain(qs.find(q=>q.id==='math_g5_hand_'+s).diagram);
  let d=get('area_001');d.panels[0].points[0][0]=NaN;assert.throws(()=>range(d));
  d=get('area_001');d.panels[0].segments=[[0,99]];assert.throws(()=>range(d));
  d=get('decmul_026');d.dimensions[0]=0;assert.throws(()=>range(d));
  d=get('volume_026');d.cut=99;assert.throws(()=>range(d));
  d=get('graph_004');d.rows[0].parts[0]=-1;assert.throws(()=>range(d));
  d=get('fraction_001');d.rows[0].d=0;assert.throws(()=>range(d));
  d=get('average_012');d.values[0]=99;assert.throws(()=>range(d));
 });
 test('小5の図：解答点・平均・密度・切断本数・残量は表示しない',()=>{
  const get=s=>qs.find(q=>q.id==='math_g5_hand_'+s).diagram;
  assert.equal(get('proportion_020').xRange[1],4);assert.deepEqual(plain(get('proportion_020').knownPoint),[4,10]);assert.ok(!get('proportion_020').marks);
  assert.deepEqual(plain(get('fracrel_010').rows[0].marks),[]);assert.equal(get('fracrel_022').rows[0].subdivisions,0);
  assert.ok(get('multiple_014').end<24);assert.ok(get('multiple_014').rows.every(r=>!r.marks.includes(24)));
  for(const id of ['decdiv_006','decdiv_009','decdiv_029'])assert.ok(get(id).schematic&&!get(id).partitions);
  for(const id of ['graph_004','graph_022','percent_004','percent_007'])assert.ok(get(id).rows[0].schematic);
  assert.ok(get('graph_013').schematic);
  for(const q of qs)for(const forbidden of ['answer','result','average','density','remainder','solved'])assert.ok(!(forbidden in q.diagram),q.id+' '+forbidden);
 });
 test('小5の図：PR34の三角柱・道のり・分数ラベル・水位を保護',()=>{
  const get=s=>qs.find(q=>q.id==='math_g5_hand_'+s).diagram;
  for(const id of ['prism_004','prism_008','prism_020'])assert.equal(get(id).baseView,'front');
  assert.ok(!get('prism_007').baseView);
  assert.ok(get('speed_015').labels.every(s=>s.includes('道のり')));assert.deepEqual(plain(get('speed_015').values),[1,1]);
  for(const id of ['fraction_027','fraction_031'])assert.ok(get(id).rows[0].pieceLabelsAtParts);
  for(const id of ['average_012','decdiv_022','fraction_030'])assert.equal(get(id).waterFill,'blue');
 });
 test('小5の図：依頼表との相違は問題文の紙・五角柱に合わせる',()=>{
  assert.deepEqual(plain(qs.find(q=>q.id==='math_g5_hand_proportion_013').diagram.starts),['10まい','2mm']);
  assert.equal(qs.find(q=>q.id==='math_g5_hand_prism_013').diagram.shape,'prism');assert.equal(qs.find(q=>q.id==='math_g5_hand_prism_013').diagram.baseSides,5);
 });
};
