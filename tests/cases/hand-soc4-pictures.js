// 第10弾：33枚だけを置き換え、対象外の図と問題本文を保つ。
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
module.exports=({test,ctx,assert,plain})=>{
 const root=path.resolve(__dirname,'../..');
 const ids=[...fs.readFileSync(path.join(root,'DIAGRAM_REQUESTS_10.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'social_g4_hand_'+m[1]);
 const all=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc4'));
 const redo=['water_007','water_004','water_013','water_021','pioneer_012','industry_007'].map(s=>'social_g4_hand_'+s);
 const expected=[...new Set(ids.concat(redo))];
 test('社会の絵：第10・11弾の38問だけに固有のWebPを使う',()=>{
  assert.equal(ids.length,33);assert.equal(new Set(ids).size,33);
  const qs=all.filter(q=>q.diagram&&q.diagram.kind==='image');
  assert.deepEqual(qs.map(q=>q.id).sort(),expected.slice().sort());
  assert.equal(new Set(qs.map(q=>q.diagram.src)).size,38);
  let total=0;
  for(const q of qs){const d=q.diagram;
   assert.equal(d.src,'img/diagrams/soc4_'+q.id.replace('social_g4_hand_','')+(q.id==='social_g4_hand_water_007'?'_v2':'')+'.webp');
   assert.deepEqual(Object.keys(d).sort(),['alt','caption','kind','src','study']);
   assert.ok(d.alt&&d.caption);assert.equal(d.study,true);
   assert.ok(!d.alt.includes(q.answer)&&!d.caption.includes(q.answer),q.id);
   const file=fs.readFileSync(path.join(root,d.src));total+=file.length;
   assert.equal(file.toString('ascii',0,4),'RIFF',q.id);assert.equal(file.toString('ascii',8,12),'WEBP',q.id);
   // この不透明WebPはVP8形式。実寸も検査して、横3:2の保存を保護する。
   assert.equal(file.toString('ascii',12,16),'VP8 ',q.id);
   assert.deepEqual([...file.subarray(23,26)],[0x9d,0x01,0x2a],q.id);
   assert.equal(file.readUInt16LE(26)&0x3fff,redo.includes(q.id)?800:960,q.id);assert.equal(file.readUInt16LE(28)&0x3fff,redo.includes(q.id)?533:640,q.id);
   assert.ok(file.length<=200*1024,q.id+' exceeds 200KB');
  }
  assert.ok(total<=7*1024*1024,'total exceeds 7MB');
 });
 test('社会の絵：第10・11弾の対象外254問はdiagramも含めmainと同一',()=>{
  const permitted=expected.concat(['prefecture_004','geography_015','geography_019','industry_013','industry_014'].map(s=>'social_g4_hand_'+s));
  const untouched=all.filter(q=>!permitted.includes(q.id));assert.equal(untouched.length,254);
  assert.equal(crypto.createHash('sha256').update(JSON.stringify(untouched)).digest('hex'),'2782e86c945d0dac9d10970b9f6ea801eb23fe607e09f9ee9bced02c00932ea8');
 });
};
