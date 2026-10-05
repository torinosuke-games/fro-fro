// 第10弾：33枚だけを置き換え、対象外の図と問題本文を保つ。
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
module.exports=({test,ctx,assert,plain})=>{
 const root=path.resolve(__dirname,'../..');
 const ids=[...fs.readFileSync(path.join(root,'DIAGRAM_REQUESTS_10.md'),'utf8').matchAll(/\| (\w+_\d+) \|/g)].map(m=>'social_g4_hand_'+m[1]);
 const all=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc4'));
 test('社会の絵：依頼の33問だけに固有のWebPを使う',()=>{
  assert.equal(ids.length,33);assert.equal(new Set(ids).size,33);
  const qs=all.filter(q=>q.diagram&&q.diagram.kind==='image');
  assert.deepEqual(qs.map(q=>q.id).sort(),ids.slice().sort());
  assert.equal(new Set(qs.map(q=>q.diagram.src)).size,33);
  let total=0;
  for(const q of qs){const d=q.diagram;
   assert.equal(d.src,'img/diagrams/soc4_'+q.id.replace('social_g4_hand_','')+'.webp');
   assert.deepEqual(Object.keys(d).sort(),['alt','caption','kind','src','study']);
   assert.ok(d.alt&&d.caption);assert.equal(d.study,true);
   assert.ok(!d.alt.includes(q.answer)&&!d.caption.includes(q.answer),q.id);
   const file=fs.readFileSync(path.join(root,d.src));total+=file.length;
   assert.equal(file.toString('ascii',0,4),'RIFF',q.id);assert.equal(file.toString('ascii',8,12),'WEBP',q.id);
   // この不透明WebPはVP8形式。実寸も検査して、横3:2の保存を保護する。
   assert.equal(file.toString('ascii',12,16),'VP8 ',q.id);
   assert.deepEqual([...file.subarray(23,26)],[0x9d,0x01,0x2a],q.id);
   assert.equal(file.readUInt16LE(26)&0x3fff,960,q.id);assert.equal(file.readUInt16LE(28)&0x3fff,640,q.id);
   assert.ok(file.length<=200*1024,q.id+' exceeds 200KB');
  }
  assert.ok(total<=7*1024*1024,'total exceeds 7MB');
 });
 test('社会の絵：対象外264問はdiagramも含めmainと同一',()=>{
  const untouched=all.filter(q=>!ids.includes(q.id));assert.equal(untouched.length,264);
  assert.equal(crypto.createHash('sha256').update(JSON.stringify(untouched)).digest('hex'),'e9c66a4bc850047487f266f8b0f2d204e1232c39081c71ff95e700fd1a90a0c9');
 });
};
