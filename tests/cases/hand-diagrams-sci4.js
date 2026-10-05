// 理科第6・7弾：入力範囲、図以外の不変性、解答の非表示を保護。
module.exports=({test,FF,ctx,assert,plain})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto');
 const waves=[6,7].map(n=>[...fs.readFileSync(path.join(__dirname,'../../DIAGRAM_REQUESTS_'+n+'.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'science_g4_hand_'+m[1]));
 const ids=waves.flat(),all=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_sci4'),qs=all.filter(q=>ids.includes(q.id));
 const get=id=>qs.find(q=>q.id==='science_g4_hand_'+id).diagram;
 const hash=a=>crypto.createHash('sha256').update(JSON.stringify(a)).digest('hex');
 const tools=['syringe','airgun','tankCup','beaker','flask','rod','plate','ballRing','tubeBath','bagBath','thermometer'];
 const scenes=['kettle','coldCup','window','room','branch','tree','thermLocations','height','groundCompare','terrain','school','soil','particles','slope'];
 function range(d){
  assert.ok(typeof d.caption==='string'&&d.caption.trim());assert.equal(d.study,true);
  if(d.kind==='circuit'){assert.ok(d.panels.length>=1&&d.panels.length<=2);for(const p of d.panels){assert.ok(['single','row','branches','unknown'].includes(p.layout));assert.ok(['none','bulb','motor','meter'].includes(p.device));if(p.needle)assert.equal(p.needle,'right');if(p.remove!==undefined)assert.ok(Number.isInteger(p.remove)&&p.remove>=0&&p.remove<2);}}
  else if(d.kind==='apparatus'){assert.ok(d.panels.length>=1&&d.panels.length<=3);for(const p of d.panels){assert.ok(tools.includes(p.tool));if(p.contents)assert.ok(['air','water','mixed','balloon'].includes(p.contents));if(p.membrane)assert.equal(p.membrane,'flat');if(p.marks)assert.ok(p.marks.every(v=>Number.isFinite(v)&&v>0));if(p.scale){assert.ok(p.scale.min===0&&p.scale.max>0&&p.scale.step>0&&p.scale.value>=p.scale.min&&p.scale.value<=p.scale.max);assert.ok(Number.isInteger(p.scale.max/p.scale.step));}}}
  else if(d.kind==='scienceScene'){assert.ok(scenes.includes(d.scene));if(d.materials){assert.ok(d.materials.length>=2&&d.materials.length<=3);if(d.sizes)assert.ok(d.sizes.length===d.materials.length&&d.sizes.every(v=>Number.isFinite(v)&&v>0));}if(d.positions)assert.ok(d.positions.every(p=>['person','ground'].includes(p.level)));}
  else if(d.kind==='anatomy'){assert.ok(['skull','ribs','arm','leg'].includes(d.part));assert.ok(['side','front','straight','bent'].includes(d.pose));if(d.labels)assert.equal(d.labels.length,2);}
  else if(d.kind==='moonView'){assert.ok(['shape','sky'].includes(d.mode));if(d.mode==='shape')assert.ok(['full','half','crescent','invisible','surface'].includes(d.phase));else{assert.ok(['夕方','真夜中','昼間','明け方'].includes(d.sky));assert.ok([null,'南','西','unplaced'].includes(d.position));assert.ok(d.directions.every(s=>['東','南','西','北'].includes(s)));}}
  else if(d.kind==='starMap'){assert.equal(d.points.length,d.labels.length);for(const v of d.points)assert.ok(v.length===2&&v.every(Number.isFinite)&&v[0]>=55&&v[0]<=465&&v[1]>=55&&v[1]<=295);for(const s of d.segments)assert.ok(s.length===2&&s[0]!==s[1]&&s.every(i=>Number.isInteger(i)&&i>=0&&i<d.points.length));if(d.tints)assert.equal(d.tints.length,d.points.length);}
  else if(d.kind==='graph'){assert.equal(d.values.length,d.labels.length);assert.ok(d.values.every(Number.isFinite));if(d.panels)assert.ok(d.panels.length===2&&d.panels.every(p=>p.values.length>=2&&p.values.every(Number.isFinite)));}
  else if(d.kind==='table'){assert.ok(d.head.length>0&&d.rows.every(r=>r.length===d.head.length));}
  else assert.fail(d.kind);
 }
 test('小4理科の図：333問のdiagram以外は元データから不変',()=>{
  assert.equal(all.length,333);assert.equal(hash(all.map(q=>{const v=plain(q);if(ids.includes(q.id))delete v.diagram;return v;})),'1e6218f810843df9b7a1ace3e8193c6efa228019db9349a55585fc6e59c9a61c');
  assert.ok(all.filter(q=>!ids.includes(q.id)).every(q=>!q.diagram));
 });
 test('小4理科の図：39＋48＝87問と書き問題への継承',()=>{
  assert.deepEqual(waves.map(a=>a.length),[39,48]);assert.equal(new Set(ids).size,87);assert.equal(qs.length,87);const bank=FF.learning.createBank(ctx.QUESTION_BANK);
  for(const q of qs){range(q.diagram);assert.deepEqual(plain(FF.learning.validateQuestion(q)),[]);if(q.inputForm)assert.deepEqual(plain(bank.byId[q.id+'#input'].diagram),plain(q.diagram));}
 });
 test('小4理科の図：新しい6種類の不正な値・添字を検出',()=>{
  for(const [id,mutate]of [['electric_002',d=>d.panels[0].layout='result'],['air_004',d=>d.panels[0].tool='unknown'],['heat_014',d=>d.panels[0].membrane='bulged'],['heat_022',d=>d.panels[0].scale.value=101],['rain_032',d=>d.sizes[0]=0],['body_010',d=>d.pose='contracted'],['moon_011',d=>d.position='東'],['star_009',d=>d.segments[0]=[0,99]]]){const d=plain(get(id));mutate(d);assert.throws(()=>range(d));}
 });
 test('小4理科の図：実験の結果・向き・変化をデータに入れない',()=>{
  const forbidden=['answer','result','direction','flow','rotation','after','change','contracted','relaxed','speed','bulged'];
  function scan(v){if(v&&typeof v==='object')for(const k of Object.keys(v)){assert.ok(!forbidden.includes(k),k);scan(v[k]);}}
  for(const q of qs)scan(q.diagram);
  for(const id of ['electric_004','electric_005','electric_031'])assert.ok(!JSON.stringify(get(id)).includes('直列')&&!JSON.stringify(get(id)).includes('並列'));
  assert.equal(get('electric_022').panels[0].layout,'unknown');
  for(const id of ['heat_014','heat_015'])assert.equal(get(id).panels[0].membrane,'flat');
  for(const id of ['body_010','body_011','body_013','body_023'])assert.ok(get(id).muscles);
  for(const id of ['body_010','body_011','body_013','body_023'])assert.deepEqual(plain(get(id).labels),['内側','外側']);
 });
 test('小4理科の図：既知の量・読み取りの目もりだけを表示',()=>{
  assert.deepEqual(plain(get('air_010').panels[0].marks),[100]);assert.deepEqual(plain(get('air_024').panels[0].marks),[50,100]);
  assert.deepEqual(plain(get('heat_022').panels[0].scale),{min:0,max:100,step:10,value:45});
  for(const q of qs.filter(q=>q.diagram.kind==='apparatus'&&q.id!=='science_g4_hand_heat_022'))assert.ok(q.diagram.panels.every(p=>!p.scale));
  assert.deepEqual(plain(get('weather_012').values),[15,20,22,17]);assert.deepEqual(plain(get('weather_024').values),[10,14,18,20]);
  assert.deepEqual(plain(get('weather_019').values),[]);
 });
 test('小4理科の図：月と星の解答ラベル・位置・矢印は表示しない',()=>{
  for(const id of ['moon_001','moon_002','moon_003','moon_004','moon_006'])assert.ok(!JSON.stringify(get(id)).includes(qs.find(q=>q.id==='science_g4_hand_'+id).answer));
  assert.equal(get('moon_013').position,null);assert.equal(get('moon_032').position,'unplaced');assert.equal(get('moon_019').phase,null);
  for(const id of ['star_002','star_003','star_009','star_010','star_015','star_026','star_029'])assert.ok(!get(id).labels.includes(qs.find(q=>q.id==='science_g4_hand_'+id).answer));
  assert.equal(get('star_018').points.length,12);assert.ok(get('star_018').labels.every(s=>s===''));
  assert.ok(get('season_027').head.every(s=>s==='')&&get('season_027').rows.flat().every(s=>s===''));
 });
};
