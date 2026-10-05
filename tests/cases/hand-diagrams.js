// 第2弾：依頼の17問、データ範囲、元データと解答を表示しない指定を検証。
module.exports=({test,FF,ctx,assert,plain})=>{
 const fs=require('fs'),path=require('path'),crypto=require('crypto');
 const request=fs.readFileSync(path.join(__dirname,'../../DIAGRAM_REQUESTS_2.md'),'utf8');
 const ids=[...request.matchAll(/\| (math_g4_hand_\w+) \|/g)].map(m=>m[1]);
 const all=ctx.QUESTION_BANK.filter(q=>q.collection==='hand_g4'),qs=all.filter(q=>ids.includes(q.id));
 const hash=a=>crypto.createHash('sha256').update(JSON.stringify(a)).digest('hex');
 const get=id=>qs.find(q=>q.id==='math_g4_hand_'+id).diagram;
 function range(d){
  const pos=x=>Number.isInteger(x)&&x>0,sz=a=>assert.ok(Array.isArray(a)&&a.length===3&&a.every(pos));
  if(d.kind==='gridPoints'){
   assert.ok(pos(d.maxX)&&pos(d.maxY)&&d.maxX<=10&&d.maxY<=10);
   assert.ok(d.points.length>0);const names=[];
   for(const p of d.points){assert.ok(p.name&&Number.isInteger(p.x)&&Number.isInteger(p.y)&&p.x>=0&&p.x<=d.maxX&&p.y>=0&&p.y<=d.maxY);assert.ok(!names.includes(p.name));names.push(p.name);}
   for(const s of d.segments)assert.ok(s.length===2&&s[0]!==s[1]&&s.every(i=>Number.isInteger(i)&&i>=0&&i<d.points.length));
  }else if(d.kind==='solid3d'){
   assert.ok(['box','cube'].includes(d.shape));if(d.dimensions)sz(d.dimensions);if(d.block)assert.ok(pos(d.block)&&d.dimensions.every(v=>v>=d.block));
   const used=[];for(const v of d.vertices){assert.ok(/^[A-H]$/.test(v.vertex)&&v.label&&!used.includes(v.vertex));used.push(v.vertex);}if(d.face)assert.strictEqual(d.face,'ABCD');if(d.showLengths)assert.ok(d.dimensions&&d.unit);
  }else if(d.kind==='boxNet'){sz(d.dimensions);assert.strictEqual(typeof d.showLengths,'boolean');if(d.showLengths)assert.ok(d.unit);}
  else if(d.kind==='quadFigure'){assert.ok(['rectangle','parallelogram'].includes(d.shape));if(d.angle)assert.ok(Number.isFinite(d.angle)&&d.angle>0&&d.angle<90);if(d.diagonal)assert.ok(pos(d.diagonal)&&['ＡＯ','ＯＢ'].includes(d.unknown)&&d.unit);if(d.sides)assert.ok(d.sides.length===2&&d.sides.every(pos)&&d.unit);}
  else assert.fail(d.kind);
 }
 test('手作りの図：468問のdiagram以外の全項目と対象外の図は不変',()=>{   // 手作りの問題の本文・確認済みの印を直したら、下の2つのハッシュも更新する（判断241）
  assert.strictEqual(all.length,468);
  assert.strictEqual(hash(all.map(q=>{const v=plain(q);delete v.diagram;return v;})),'a19035f9b98140dab962625517f93c86912a1c32fc767f8d1578bd0c1a823386');
  // 第11弾でgraph_005にだけ追加した任意の補助線指定を除き、旧データと一致。
  assert.strictEqual(hash(all.filter(q=>!ids.includes(q.id)).map(q=>{const v=plain(q);if(v.id==='math_g4_hand_graph_005')delete v.diagram.minorStep;return v;})),'b7c8f6d30dbee11bb48e1001d25713836b5e78fbca85fdb670cd1b60e29b79d7');
 });
 test('手作りの図：依頼17問の網羅・caption・reviewed false・書き問題継承・除外2問',()=>{
  assert.strictEqual(ids.length,17);assert.strictEqual(qs.length,17);const bank=FF.learning.createBank(ctx.QUESTION_BANK);
  for(const q of qs){assert.ok(q.diagram&&q.diagram.caption.trim(),q.id);assert.strictEqual(q.reviewed,false);assert.deepStrictEqual(plain(FF.learning.validateQuestion(q)),[],q.id);if(q.inputForm)assert.deepStrictEqual(plain(bank.byId[q.id+'#input'].diagram),plain(q.diagram));}
  for(const id of ['math_g4_hand_quad_015','math_g4_hand_quad_016']){assert.ok(!ids.includes(id));assert.ok(!bank.byId[id].diagram);if(bank.byId[id+'#input'])assert.ok(!bank.byId[id+'#input'].diagram);}
 });
 test('手作りの図：共通4種類のデータ範囲・不正値の検出',()=>{
  qs.forEach(q=>range(q.diagram));
  const bad=plain(get('position_008'));bad.points[0].x=99;assert.throws(()=>range(bad));
  bad.points[0].x=1;bad.segments[0][1]=99;assert.throws(()=>range(bad));
  const net=plain(get('solid_011'));net.dimensions[0]=0;assert.throws(()=>range(net));
  const solid=plain(get('solid_027'));solid.block=-2;assert.throws(()=>range(solid));
  const quad=plain(get('quad_004'));quad.angle=180;assert.throws(()=>range(quad));
 });
 test('手作りの図：座標の解答点・道すじ・等分の印・個数を描かない',()=>{
  for(const [id,names] of [['position_008',['Ａ','Ｂ','Ｄ']],['position_014',['Ａ','Ｂ','Ｃ']],['position_015',['Ａ','Ｂ','Ｄ']],['position_018',['Ｐ']]])assert.deepStrictEqual(plain(get(id).points.map(p=>p.name)),names);
  for(const id of ['position_010','position_011','position_018'])assert.strictEqual(get(id).segments.length,0);
  assert.deepStrictEqual(plain(get('position_016').vertices.map(v=>v.vertex)),['A','G']);
  assert.deepStrictEqual(plain(get('solid_026').vertices.map(v=>v.vertex)),['A','G']);
  assert.strictEqual(get('solid_014').face,'ABCD');assert.strictEqual(get('solid_027').block,2);
  for(const q of qs){assert.ok(!('route' in q.diagram)&&!('count' in q.diagram)&&!('area' in q.diagram)&&!('equalMarks' in q.diagram));}
  assert.strictEqual(get('solid_021').showLengths,false);
 });
};
