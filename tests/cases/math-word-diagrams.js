// 判断223：依頼の55問、共通図のデータ範囲、解答を描かないデータを検証。
module.exports=({test,FF,ctx,assert,plain})=>{
 const fs=require('fs'),path=require('path');
 const request=fs.readFileSync(path.join(__dirname,'../../DIAGRAM_REQUESTS.md'),'utf8');
 const ids=[...request.matchAll(/^\| \d+ \| (math_\w+) \|/gm)].map(m=>m[1]);
 const qs=ctx.QUESTION_BANK.filter(q=>ids.includes(q.id));
 test('文章題の図：元の90問の全項目をdiagram以外は変更していない',()=>{
  const crypto=require('node:crypto');
  const original=ctx.QUESTION_BANK.filter(q=>/^math_g\d_/.test(q.id)&&q.collection!=='frontier100'&&q.collection!=='hand_g4'&&q.collection!=='hand_g5').map(q=>{const copy=plain(q);delete copy.diagram;return copy;});
  assert.strictEqual(original.length,90);
  assert.strictEqual(crypto.createHash('sha256').update(JSON.stringify(original)).digest('hex'),'54351549ef7eec144c8414b09cc6e0ecc5ec277c7f90fe9111fab26a77bc314f');
 });
 test('文章題の図：依頼の55問だけに追加し、書き問題にも引き継ぐ',()=>{
  assert.strictEqual(ids.length,55);assert.strictEqual(qs.length,55);
  const all=ctx.QUESTION_BANK.filter(q=>q.subject==='math'&&q.collection!=='frontier100'&&q.collection!=='hand_g4'&&q.collection!=='hand_g5');
  assert.strictEqual(all.filter(q=>q.diagram).length,55);
  const bank=FF.learning.createBank(ctx.QUESTION_BANK);
  for(const q of qs){assert.ok(q.diagram.caption.trim(),q.id);assert.deepStrictEqual(plain(FF.learning.validateQuestion(q)),[],q.id);assert.strictEqual(q.reviewed,true,q.id);
   if(q.inputForm)assert.deepStrictEqual(plain(bank.byId[q.id+'#input'].diagram),plain(q.diagram),q.id);
  }
 });
 test('文章題の図：全種類のデータの範囲と配列の対応を検証する',()=>{
  const positive=x=>typeof x==='number'&&Number.isFinite(x)&&x>0;
  const integer=x=>positive(x)&&Number.isInteger(x);
  const same=(a,b)=>assert.strictEqual(a.length,b.length);
  for(const q of qs){const d=q.diagram;
   switch(d.kind){
    case 'objects': assert.ok(['wood','person','candy','bread','flower','chair'].includes(d.item));assert.ok(d.groups.every(integer));same(d.groups,d.labels);if(d.sealed)same(d.groups,d.sealed);if(d.names)assert.strictEqual(d.names.length,d.groups[0]);if(d.mark)assert.ok(integer(d.mark)&&d.mark<=d.groups[0]);break;
    case 'clock': assert.ok(Number.isInteger(d.minute)&&d.minute>=0&&d.minute<60);if(d.hour!==undefined)assert.ok(Number.isInteger(d.hour)&&d.hour>=0&&d.hour<12);if(d.toMinute!==undefined)assert.ok(d.toMinute>=0&&d.toMinute<60&&integer(d.elapsed));break;
    case 'tape': assert.ok(d.values.every(positive));same(d.values,d.labels);if(d.notes)same(d.values,d.notes);if(d.places)assert.strictEqual(d.places.length,d.values.length+1);break;
    case 'measure': assert.ok(integer(d.capacity));assert.ok(d.values.every(v=>integer(v)&&v<=d.capacity));same(d.values,d.labels);break;
    case 'balance': assert.strictEqual(d.weights.length,2);assert.ok(d.weights.every(v=>typeof v==='string'&&v.length>0));break;
    case 'nestedRect': if(d.growth){assert.ok(positive(d.growth)&&positive(d.area));assert.strictEqual(d.w,'x＋'+d.growth);assert.strictEqual(d.innerW,'x');}else assert.ok([d.w,d.h,d.innerW,d.innerH].every(positive)&&d.w>d.innerW&&d.h>d.innerH);break;
    case 'triangle': assert.ok(positive(d.base)&&positive(d.height));break;
    case 'pie': same(d.numerators,d.denominators);same(d.labels,d.denominators);assert.ok(d.denominators.every(integer));assert.ok(d.numerators.every((n,i)=>integer(n)&&n<=d.denominators[i]));break;
    case 'band': assert.ok(d.parts.every(positive));same(d.parts,d.labels);if(d.known)same(d.known,d.parts);break;
    case 'doubleLine': same(d.labels,d.ends);assert.strictEqual(d.ends.length,2);assert.ok(d.ends.every(v=>typeof v==='string'&&v.trim()));break;
    case 'circle': assert.ok(positive(d.radius));if(d.angle)assert.ok(d.angle>0&&d.angle<360);if(d.count)assert.ok(integer(d.count)&&d.diameter===2*d.radius);break;
    case 'coordinate': assert.ok(Number.isFinite(d.a)&&Number.isFinite(d.b));assert.ok([1,2].includes(d.power));for(const r of [d.xRange,d.yRange])assert.ok(r.length===2&&r.every(Number.isFinite)&&r[0]<r[1]);if(d.marks)assert.ok(d.marks.every(x=>x>=d.xRange[0]&&x<=d.xRange[1]));break;
    case 'exterior': case 'inscribed': assert.ok(positive(d.angle)&&d.angle<180);break;
    case 'similarity': assert.ok(positive(d.height)&&d.shadows.length===2&&d.shadows.every(positive));break;
    case 'numberline': assert.ok(d.end>d.start&&positive(d.step)&&Number.isInteger((d.end-d.start)/d.step));assert.ok(d.marks.every(v=>v>=d.start&&v<=d.end));if(d.markLabels)same(d.markLabels,d.marks);break;
    case 'fractionSum': assert.ok(integer(d.n)&&integer(d.m)&&integer(d.d)&&d.n<=d.d&&d.m<=d.d&&d.separate);break;
    case 'fraction': assert.ok(integer(d.n)&&integer(d.d)&&d.n<d.d);break;
    case 'rect': assert.ok(d.area?positive(d.area)&&d.w==='？'&&d.h==='？':positive(d.w)&&positive(d.h));break;
    case 'solid': assert.ok(positive(d.h));if(d.shape==='triangularPrism')assert.ok(positive(d.baseArea));else assert.ok(positive(d.w)&&positive(d.depth)&&positive(d.water)&&d.water<d.h);break;
    case 'polygon': assert.ok(['pentagon','diagonals'].includes(d.shape));if(d.w)assert.ok(positive(d.w)&&positive(d.h)&&d.single);break;
    case 'table': assert.ok(d.head.length>=2&&d.rows.length>0);for(const row of d.rows)same(row,d.head);break;
    case 'bars': case 'cards': same(d.labels,d.values);if(d.kind==='bars')assert.ok(d.values.every(positive));break;
    default: assert.fail(q.id+' '+d.kind);
   }
  }
 });
 test('文章題の図：解答や途中の計算結果を表示するデータを持たない',()=>{
  const get=id=>qs.find(q=>q.id===id).diagram;
  assert.strictEqual(get('math_g4_fraction_001').separate,true);
  assert.deepStrictEqual(plain(get('math_g8_linear_003').marks||[]),[]);
  assert.ok(!get('math_g7_integer_002').marks.includes(-5));
  assert.ok(!get('math_g4_rounding_001').marks.includes(4800));
  assert.deepStrictEqual(plain(get('math_g9_function_002').marks),[1,3]);
  for(const id of ['math_g3_division_001','math_g3_division_002','math_g3_division_004'])assert.strictEqual(get(id).groups.length,1);
  for(const row of get('math_g8_probability_001').rows)assert.ok(row.slice(1).every(v=>v==='□'));
 });
};
