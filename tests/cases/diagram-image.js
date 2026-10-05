// 生成した絵を使う図（kind: 'image'。判断254）。src のファイルが img/ にあること、文字・答えを絵に入れない約束はレビューで確かめる。
const fs=require('node:fs'),path=require('node:path');
module.exports=({test,ctx,FF,assert,plain})=>{
 const root=path.resolve(__dirname,'../..');
 const base=plain(ctx.QUESTION_BANK.find(q=>q.diagram&&q.diagram.kind==='table')||ctx.QUESTION_BANK[0]);
 test('図の種類 image は src と caption が必須',()=>{
  const q=JSON.parse(JSON.stringify(base));
  q.diagram={kind:'image',src:'img/diagrams/x.webp',caption:'説明'};
  assert.deepEqual(plain(FF.learning.validateQuestion(q)),[]);
  q.diagram={kind:'image',caption:'説明'};
  assert.ok(FF.learning.validateQuestion(q).some(m=>m.includes('diagram.src')));
  q.diagram={kind:'image',src:'img/diagrams/x.webp'};
  assert.ok(FF.learning.validateQuestion(q).some(m=>m.includes('diagram.caption')));
 });
 test('図の種類 image の絵のファイルが、img/diagrams/ に実在する',()=>{
  for(const q of plain(ctx.QUESTION_BANK).filter(q=>q.diagram&&q.diagram.kind==='image')){
   assert.match(q.diagram.src,/^img\/diagrams\/[a-z0-9_\-]+\.(webp|png|jpg)$/,q.id);
   assert.ok(fs.existsSync(path.join(root,q.diagram.src)),q.id+' '+q.diagram.src);
   assert.ok(fs.statSync(path.join(root,q.diagram.src)).size<=400*1024,q.id+' ファイルが400KBを超える');
   assert.ok(q.diagram.alt||q.diagram.caption,q.id);
  }
 });
};
