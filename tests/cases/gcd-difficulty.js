module.exports=({test,FF,ctx,assert})=>{
 test('数の最大公約数を直接求める固定問題とドリルは基礎',()=>{
  const questions=ctx.QUESTION_BANK.filter(q=>q.subject==='math'&&q.gradeLevel===5&&/^[\d０-９]+と[\d０-９]+の最大公約数はいくつですか。$/.test(q.question));
  assert.ok(questions.length>=3);for(const q of questions)assert.equal(q.difficulty,'basic',q.id);
  // IDや正誤履歴のキーは変えず、難易度だけを変更する。
  const example=questions.find(q=>q.question.startsWith('24と36'));assert.ok(example);assert.equal(example.answer,'12');
  const config=FF.generators.UNIT_GEN[5].multiple;
  assert.ok(config.basic.some(e=>e.op==='gcd_ask'));for(const level of ['standard','advanced'])assert.ok(config[level].every(e=>e.op!=='gcd_ask'));
  let first=true;const rng=FF.util.makeRng(71);const q=FF.generators.generateForUnit(5,'multiple','basic','choice',()=>{if(first){first=false;return .5;}return rng();});assert.equal(q.meta.op,'gcd_ask');assert.equal(q.difficulty,'basic');
 });
 test('最小公倍数を直接求める固定問題とドリルは基礎',()=>{
  const direct=ctx.QUESTION_BANK.filter(q=>q.subject==='math'&&q.gradeLevel===5&&/^[\d０-９、と]+の最小公倍数はいくつですか。$/.test(q.question));
  assert.ok(direct.length>=3);for(const q of direct)assert.equal(q.difficulty,'basic',q.id);
  const config=FF.generators.UNIT_GEN[5].multiple;
  assert.ok(config.basic.some(e=>e.op==='lcm_ask'));for(const level of ['standard','advanced'])assert.ok(config[level].every(e=>e.op!=='lcm_ask'));
  let first=true;const rng=FF.util.makeRng(72);const q=FF.generators.generateForUnit(5,'multiple','basic','choice',()=>{if(first){first=false;return .8;}return rng();});assert.equal(q.meta.op,'lcm_ask');assert.equal(q.difficulty,'basic');
 });
};
