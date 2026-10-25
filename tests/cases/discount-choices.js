module.exports = ({test,FF,assert}) => {
 test('値引きドリルは基礎にのみ出題し、全候補が定価未満で計算を必要とする',()=>{
  const config=FF.generators.UNIT_GEN[5].percent;
  assert.ok(config.basic.some(e=>e.op==='pct_off'));
  for(const level of ['standard','advanced'])assert.ok(config[level].every(e=>e.op!=='pct_off'));
  let count=0,example=false;
  // 乱数系列を固定し、価格・割引率の全組み合わせを検証する。
  for(let b=0;b<8;b++)for(let pc=0;pc<7;pc++){
   const seq=[.75,(b+.1)/8,(pc+.1)/7];let i=0;
   const q=FF.generators.generateForUnit(5,'percent','basic','choice',()=>seq[i++]??.3);
   assert.equal(q.meta.op,'pct_off');const base=q.meta.base,rate=q.meta.pc;
   assert.equal(Number(q.answer),base*(100-rate)/100);assert.equal(q.difficulty,'basic');
   assert.equal(q.choices.length,4);assert.equal(new Set(q.choices.map(Number)).size,4);
   assert.equal(q.choices.filter(c=>Number(c)===Number(q.answer)).length,1);
   for(const c of q.choices)assert.ok(Number(c)>0&&Number(c)<base,`${base}円 ${rate}%引き: ${c}`);
   if(base===500&&rate===20){example=true;assert.equal(q.answer,'400');}
   count++;
  }
  assert.equal(count,56);assert.ok(example);
 });
};
