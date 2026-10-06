// 第16弾：57問だけを変更（当初58問。river_026 は判断312で外した）し、条件と記号以外の解答・結果を描かない。
module.exports=({test,FF,ctx,assert,plain})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto');
 const ids=[...fs.readFileSync(path.join(__dirname,'../../DIAGRAM_REQUESTS_16.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'science_g5_hand_'+m[1]);
 const all=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_sci5'),qs=all.filter(q=>ids.includes(q.id));
 const get=id=>qs.find(q=>q.id==='science_g5_hand_'+id).diagram;
 const hash=a=>crypto.createHash('sha256').update(JSON.stringify(a)).digest('hex');
 const symbols=a=>assert.ok(Array.isArray(a)&&a.every(s=>['','ア','イ','ウ','エ','Ａ','Ｂ','Ｃ'].includes(s)));
 function range(d){
  assert.equal(d.study,true);assert.ok(typeof d.caption==='string'&&d.caption.trim());
  assert.ok(Object.keys(FF.defs.DIAGRAM_KINDS).includes(d.kind));
  if(d.kind==='biology'){
   const lengths={seed:3,flower:4,stamen:1,pregnancy:4};assert.ok(d.part in lengths);symbols(d.labels);assert.equal(d.labels.length,lengths[d.part]);
   if(d.focus)assert.ok(['all','tip','base','outside'].includes(d.focus));
  }else if(d.kind==='pendulum'){
   assert.ok(Array.isArray(d.panels)&&d.panels.length>0&&d.panels.length<=4);
   for(const p of d.panels){assert.ok(['compare','positions','amplitude','lengthCandidates','sliding'].includes(p.mode));
    if(p.labels){symbols(p.labels);assert.equal(p.labels.length,p.mode==='amplitude'?1:3);}else assert.ok(!['positions','lengthCandidates'].includes(p.mode));
    if(p.length!==undefined){assert.ok(Number.isFinite(p.length)&&p.length>0&&p.length<=200);assert.ok(['m','cm'].includes(p.unit));}
    if(p.size!==undefined)assert.ok(Number.isFinite(p.size)&&p.size>=10&&p.size<=30);
    if(p.angle!==undefined)assert.ok(Number.isFinite(p.angle)&&p.angle>0&&p.angle<=45);
   }
  }else if(d.kind==='apparatus'){
   assert.ok(d.panels.length>0&&d.panels.length<=3);
   for(const p of d.panels){assert.ok(['seedCup','plantPot','microscope','beaker','filter','cylinder'].includes(p.tool));
    if(p.wet)assert.ok(['dry','damp','submerged'].includes(p.wet));if(p.location)assert.ok(['room','fridge'].includes(p.location));
    if(p.labels){symbols(p.labels);assert.equal(p.labels.length,3);}if(p.eyes){symbols(p.eyes);assert.equal(p.eyes.length,3);}
    if(p.magnifications){assert.equal(p.magnifications.length,2);assert.ok(p.magnifications.every(v=>Number.isInteger(v)&&v>0));}
    if(p.solute){assert.ok(['食塩','ミョウバン'].includes(p.solute.label));if(p.solute.amount!==undefined){assert.ok(Number.isFinite(p.solute.amount)&&p.solute.amount>0);assert.equal(p.solute.unit,'g');}}
    if(p.stem)assert.ok(['touch','apart'].includes(p.stem));if(p.pour)assert.ok(['rod','direct'].includes(p.pour));
    if(p.temperature!==undefined)assert.ok(Number.isFinite(p.temperature)&&p.temperature>0&&p.temperature<100);
   }
  }else if(d.kind==='circuit'){
   assert.ok(d.panels.length>0&&d.panels.length<=2);for(const p of d.panels){assert.ok(['row','branches','single'].includes(p.layout));assert.equal(p.device,'coil');if(p.turns!==undefined)assert.ok(Number.isInteger(p.turns)&&p.turns>0&&p.turns<=200);if(p.compass)assert.equal(p.compass,'toward');}
  }else if(d.kind==='scienceScene'){
   assert.ok(['cloudCover','cloudMap','typhoon','riverValley','riverStones','riverBend','riverStraight','riverWidth','riverSection'].includes(d.scene));
   if(d.scene==='cloudCover'){assert.equal(d.total,10);assert.ok(Number.isInteger(d.covered)&&d.covered>=0&&d.covered<=d.total);}
   if(d.track){assert.ok(d.track.length>=2);for(const p of d.track)assert.ok(p.length===2&&p.every(Number.isFinite)&&p[0]>30&&p[0]<460&&p[1]>30&&p[1]<315);symbols(d.trackLabels);assert.equal(d.trackLabels.length,2);}
   if(d.labels){symbols(d.labels);assert.equal(d.labels.length,d.scene==='riverSection'?3:2);}
   if(d.places)assert.deepEqual(plain(d.places),['上流','下流']);
   if(d.eastArrow)assert.equal(d.scene,'cloudMap');
  }else{assert.equal(d.kind,'graph');assert.equal(d.blankAxes,true);assert.equal(d.science,true);assert.deepEqual(plain(d.values),[]);assert.deepEqual(plain(d.labels),[]);}
 }
 test('小5理科：324問のdiagram以外が不変、対象57問のみ追加',()=>{
  assert.equal(all.length,324);assert.equal(new Set(ids).size,57);assert.equal(qs.length,57);
  assert.equal(hash(all.map(q=>{const v=plain(q);delete v.diagram;return v;})),'227c500586e5e6db67e84ce212ab60b10f3c61d0c522e32ee6e68879bf0dc59a');
  // 第17弾の16画像（electromagnet_022 は直し済み）と、図を外した3問（plant_012・river_005・river_007）と river_026 を含め、対象外267問のdiagramも変更しない（river_026 も、絵が付くまで図なし。判断312）。
  assert.equal(hash(all.filter(q=>!ids.includes(q.id)).map(q=>[q.id,q.diagram?plain(q.diagram):null])),'ffbf219a4e637af1c7e1dc4bcdfe57bcc6184057838c957ce79587ab5520b7c5');
 });
 test('小5理科：57問の範囲検証と書き問題の図の継承',()=>{
  const bank=FF.learning.createBank(ctx.QUESTION_BANK);for(const q of qs){range(q.diagram);assert.deepEqual(plain(FF.learning.validateQuestion(q)),[]);if(q.inputForm)assert.deepEqual(plain(bank.byId[q.id+'#input'].diagram),plain(q.diagram));}
 });
 test('小5理科：新しい種類と拡張部品の不正値を検出',()=>{
  for(const [id,change]of [['plant_004',d=>d.labels.pop()],['flower_001',d=>d.part='answer'],['pendulum_003',d=>d.panels[0].labels.pop()],['pendulum_028',d=>d.panels[0].length=0],['pendulum_017',d=>d.panels[0].angle=90],['flower_020',d=>d.panels[0].magnifications=[400]],['dissolve_003',d=>d.panels[0].solute.amount=-1],['electromagnet_014',d=>d.panels[0].turns=0],['weather_001',d=>d.covered=11],['weather_010',d=>d.trackLabels.pop()],['river_033',d=>d.labels.pop()],['method_030',d=>d.values=[1]]]){const d=plain(get(id));change(d);assert.throws(()=>range(d));}
 });
 test('小5理科：解答の名前・実験結果・求める数をデータに入れない',()=>{
  const forbidden=['answer','result','after','growth','germinated','attracted','speed','period','pole','current','erosion','deposition','correct'];
  function scan(v){if(v&&typeof v==='object')for(const k of Object.keys(v)){assert.ok(!forbidden.includes(k),k);scan(v[k]);}}
  for(const q of qs)scan(q.diagram);
  for(const q of qs.filter(q=>q.diagram.kind==='biology'))assert.ok(!JSON.stringify(q.diagram).includes(q.answer));
  assert.deepEqual(plain(get('flower_020').panels[0].magnifications),[10,40]);
  for(const id of ['dissolve_003','dissolve_023'])assert.ok(!JSON.stringify(get(id)).includes(id.endsWith('003')?'110':'120'));
  for(const id of ['electromagnet_012','electromagnet_013'])assert.ok(!JSON.stringify(get(id)).match(/直列|並列|へい列/));
  assert.equal(get('electromagnet_030').panels[0].compass,'toward');assert.ok(!JSON.stringify(get('electromagnet_030')).includes('S'));
  for(const q of qs)if(q.diagram.eastArrow)assert.equal(q.id,'science_g5_hand_weather_031');
 });
 test('小5理科：表示する数は問題文の既知量と一致',()=>{
  for(const q of qs){const source=q.question;
   for(const p of q.diagram.panels||[]){for(const v of [p.length,p.turns,p.temperature,...(p.magnifications||[]),p.solute&&p.solute.amount].filter(v=>v!==undefined&&v!==null))assert.ok(source.includes(String(v)),q.id+' '+v);
    for(const note of p.notes||[])for(const m of note.matchAll(/\d+/g))assert.ok(source.includes(m[0]),q.id+' '+m[0]);
   }
  }
  assert.deepEqual(plain(get('method_026').panels.map(p=>p.length)),[25,50,100,200]);
  assert.deepEqual(plain(get('electromagnet_014').panels.map(p=>p.turns)),[50,100]);
  assert.deepEqual(plain(get('electromagnet_027').panels.map(p=>p.turns)),[100,200]);
 });
};
