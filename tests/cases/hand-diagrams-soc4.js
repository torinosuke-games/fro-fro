// 第8・9弾：問題本体を固定し、社会の共通図の入力を検証する。
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
module.exports=({test,ctx,FF,assert,plain})=>{
 const root=path.resolve(__dirname,'../..');
 const ids=[8,9].flatMap(n=>[...fs.readFileSync(path.join(root,'DIAGRAM_REQUESTS_'+n+'.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'social_g4_hand_'+m[1]));
 const all=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc4')),qs=all.filter(q=>ids.includes(q.id));
 test('社会図：依頼書の70問だけに追加・キャプション必須',()=>{
  assert.equal(ids.length,70);assert.equal(new Set(ids).size,70);assert.equal(qs.length,70);
  assert.equal(all.filter(q=>q.diagram).length,70);
  for(const q of qs){assert.ok(q.diagram.caption,q.id);assert.equal(q.diagram.study,true);assert.ok(FF.defs.DIAGRAM_KINDS[q.diagram.kind]);for(const key of FF.defs.DIAGRAM_KINDS[q.diagram.kind])assert.ok(Object.hasOwn(q.diagram,key),q.id+' '+key);}
 });
 test('社会図：mainの297問はdiagram以外の全項目を保持',()=>{
  const original=all.map(q=>{const copy={...q};if(ids.includes(q.id))delete copy.diagram;return copy;});
  assert.equal(original.length,297);
  assert.equal(crypto.createHash('sha256').update(JSON.stringify(original)).digest('hex'),'359fb64f693d6761a99497b9a24a035284acfa76ba400f6452048caa2a11c2cb');
 });
 test('社会図：地図の座標・範囲・印・線の入力を検証',()=>{
  const maps=qs.filter(q=>q.diagram.kind==='japanMap');assert.equal(maps.length,18);
  for(const q of maps){const d=q.diagram,b=d.bounds;assert.equal(b.length,4);assert.ok(b.every(Number.isFinite));assert.ok(b[0]<b[2]&&b[1]<b[3]);
   function point(p){assert.equal(p.length,2);assert.ok(p.every(Number.isFinite));assert.ok(p[0]>=b[0]&&p[0]<=b[2]&&p[1]>=b[1]&&p[1]<=b[3],q.id+' '+p);}
   assert.ok(Array.isArray(d.marks)&&Array.isArray(d.areas)&&Array.isArray(d.routes));d.marks.forEach(point);
   [...d.areas,...d.lakes||[]].forEach(ps=>{assert.ok(ps.length>=3);ps.forEach(point);});
   d.routes.forEach(r=>{assert.ok(['river','ridge'].includes(r.type));assert.ok(r.points.length>=2);r.points.forEach(point);});if(d.mountain)point(d.mountain);
   if(d.port!==undefined)assert.equal(typeof d.port,'boolean');
  }
 });
 const allowed={"terrain":["riverMouth","basin","fan","delta","levees","lakeTunnel"],"facility":["sewer","sewagePlant","reservoir","settling","filter","hydro","supply","hillSupply","landfill","truck","incinerator","gasFilter","compost","bottles","wind","solar","pylons","substation","geothermal","thermal","aqueduct","sluice"],"disaster":["flood","landslide","storm","ash","bag","seaWall","sabo","hydrant"],"culture":["dollFloat","poleFloat","lacquer","kettle","castle","thatchedHouse","lanternPole"],"industry":["citrus","dairy","carFactory","greenhouse","fishCage","hotBath","terraces","basinOrchard"]};
 for(const [kind,scenes] of Object.entries(allowed))test('社会図：'+kind+'のsceneの範囲を検証',()=>{
  const subset=qs.filter(q=>q.diagram.kind===kind);assert.ok(subset.length);
  for(const q of subset){assert.ok(scenes.includes(q.diagram.scene),q.id);if(q.diagram.tint)assert.ok(/^#[0-9a-f]{6}$/i.test(q.diagram.tint));}
  assert.deepEqual([...new Set(subset.map(q=>q.diagram.scene))].sort(),scenes.slice().sort());
 });
 test('社会図：図に答えの語・ラベル・方向・結果を入れない',()=>{
  function walk(v){if(!v||typeof v!=='object')return;for(const [k,a] of Object.entries(v)){assert.ok(!['answer','labels','name','result','direction','arrow','flow'].includes(k),k);walk(a);}}
  for(const q of qs){walk(q.diagram);assert.ok(!q.diagram.caption.includes(q.answer),q.id);}
  const get=id=>qs.find(q=>q.id==='social_g4_hand_'+id).diagram;
  assert.equal(get('prefecture_006').marks.length,0);assert.equal(get('prefecture_016').routes.length,0);assert.equal(get('prefecture_022').routes.length,0);
  assert.equal(get('electric_021').scene,'thermal');assert.equal(get('disaster_011').scene,'bag');
  for(const id of ['industry_013','industry_014']){assert.equal(get(id).marks.length,1);assert.equal(get(id).port,true);}
 });
};
