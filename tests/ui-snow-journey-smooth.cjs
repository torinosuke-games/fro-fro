// 実際の描画位置を一定間隔のフレームで追跡。マス境界の停止と背景の位置飛びを検出する。
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8775/codex-prototypes/homepage/');await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.avatar='e1';FF.ui.show('base');});await p.waitForTimeout(100);
 await p.evaluate(()=>{
  localStorage.removeItem(FF.snowJourney.key);
  let id=0,queue=new Map();window.requestAnimationFrame=cb=>{queue.set(++id,cb);return id;};window.cancelAnimationFrame=n=>queue.delete(n);
  window.advance=t=>{const list=[...queue.values()];queue.clear();list.forEach(cb=>cb(t));};
  FF.ui.show('adventure');const c=document.querySelector('canvas'),ctx=c.getContext('2d'),orig=ctx.translate;
  window.snowPositions=[];ctx.translate=function(x,y){if(x<0&&y<0)window.snowPositions.push(x);return orig.call(this,x,y);};
 });await p.waitForFunction(()=>document.querySelector('canvas').dataset.walkReady==='true');
 const pad=await p.locator('.adv-directions').boundingBox();await p.mouse.move(pad.x+pad.width/2+43,pad.y+pad.height/2);await p.mouse.down();
 const result=await p.evaluate(()=>{window.advance(0);snowPositions=[];for(let t=16;t<=1408;t+=16)advance(t);return snowPositions;});
 assert.ok(result.length>80);const speed=67*16/280;
 for(let i=1;i<result.length;i++)assert.ok(Math.abs((result[i-1]-result[i])-speed)<.001,'continuous speed across tile and texture boundaries: '+[i,result[i-1],result[i]]);
 // 長いフレームでも一度にワープしない。
 const gap=await p.evaluate(()=>{const before=snowPositions.at(-1);advance(2408);return before-snowPositions.at(-1);});assert.ok(Math.abs(gap-67*34/280)<.001);
 await p.mouse.up();assert.deepEqual(errors,[]);console.log('PASS: continuous rendered motion over 5 tile boundaries and a texture wrap, bounded long-frame movement');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
