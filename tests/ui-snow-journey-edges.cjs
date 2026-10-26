// 四辺でカメラが止まった際、雪面と木の描画座標が一緒に止まることを確認。
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8775/?noenc=1');await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.avatar='e1';FF.ui.show('base');});await p.waitForTimeout(100);
 await p.evaluate(()=>{let id=0,queue=new Map();requestAnimationFrame=cb=>{queue.set(++id,cb);return id;};cancelAnimationFrame=id=>queue.delete(id);window.advance=t=>{const list=[...queue.values()];queue.clear();list.forEach(cb=>cb(t));};});
 for(const width of [390,1440]){await p.setViewportSize({width,height:width===390?844:1000});
  for(const edge of ['left','right','top','bottom']){
   await p.evaluate(()=>FF.ui.show('base'));await p.waitForTimeout(50);
   await p.evaluate(edge=>{const M=FF.snowJourney;let start;
    for(let n=3;n<27;n++){const x=edge==='left'?2:edge==='right'?37:n,y=edge==='top'?2:edge==='bottom'?27:n,dx=edge==='left'?1:edge==='right'?-1:0,dy=edge==='top'?1:edge==='bottom'?-1:0;
     if(M.walkable('field',x,y)&&M.walkable('field',x+dx,y+dy)&&!M.places.some(p=>p.x===x+dx&&p.y===y+dy)){start={x,y};break;}}
    if(!start)throw Error('missing edge fixture');localStorage.setItem(M.key,JSON.stringify({region:'field',...start,visited:['home'],seen:[]}));FF.ui.show('adventure');
   },edge);await p.waitForFunction(()=>document.querySelector('canvas').dataset.walkReady==='true');
   await p.evaluate(()=>{const ctx=document.querySelector('canvas').getContext('2d'),draw=ctx.drawImage;window.renderLog=[];ctx.drawImage=function(img,...args){if(img.width===1024&&img.height===512&&args[0]===0&&args[1]===0){const m=this.getTransform();renderLog.push({snow:[m.e,m.f],trees:[]});}else if(img instanceof HTMLCanvasElement&&img.width!==384&&img.width!==192&&renderLog.length){renderLog.at(-1).trees.push(args.slice(0,4));}return draw.call(this,img,...args);};});
   const key={left:'ArrowRight',right:'ArrowLeft',top:'ArrowDown',bottom:'ArrowUp'}[edge];await p.locator('canvas').focus();await p.keyboard.down(key);
   const logs=await p.evaluate(()=>{advance(0);renderLog=[];advance(16);advance(32);return renderLog;});await p.keyboard.up(key);
   assert.equal(logs.length,2,edge);assert.deepEqual(logs[0].trees,logs[1].trees,'trees stay still at '+edge);assert.deepEqual(logs[0].snow,logs[1].snow,'snow stays with trees at '+edge);
  }
 }
 assert.deepEqual(errors,[]);console.log('PASS: snow and scenery remain aligned at all 4 boundaries on mobile and desktop');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
