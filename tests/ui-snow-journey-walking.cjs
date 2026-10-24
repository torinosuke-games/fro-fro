const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];p.on('pageerror',e=>errors.push(e.stack));
 await p.goto('http://127.0.0.1:8775/codex-prototypes/homepage/');await p.evaluate(()=>{FF.app.state=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);FF.app.state.player.avatar='e1';FF.ui.show('base');});
 const start=await p.evaluate(()=>{const M=FF.snowJourney;for(let y=5;y<24;y++)for(let x=5;x<34;x++){if(M.places.some(p=>Math.hypot(p.x-x,p.y-y)<4))continue;let good=true;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)if(!M.walkable('field',x+dx,y+dy))good=false;if(good)return{x,y};}return{x:14,y:19};});
 async function reset(){await p.bringToFront();await p.evaluate(()=>FF.ui.show('base'));await p.waitForTimeout(80);await p.evaluate(s=>{localStorage.setItem(FF.snowJourney.key,JSON.stringify({region:'field',...s,visited:['home'],seen:[]}));FF.ui.show('adventure');},start);await p.waitForFunction(()=>document.querySelector('canvas').dataset.walkReady==='true');}
 const cdp=await p.context().newCDPSession(p);let frames=new Set();
 for(const [dx,dy] of [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]){
  await reset();const box=await p.locator('.adv-directions').boundingBox(),x=box.x+box.width/2,y=box.y+box.height/2;
  assert.ok(Math.abs(x-195)<3,'pad centered');
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x+dx*43/Math.hypot(dx,dy),y:y+dy*43/Math.hypot(dx,dy)}]});
  await p.waitForFunction(expected=>document.querySelector('canvas').dataset.walkSheet===expected,dx&&dy?'diagonal':'cardinal');let a=await p.locator('canvas').evaluate(c=>({...c.dataset}));frames.add(a.walkFrame);assert.equal(a.walkSheet,dx&&dy?'diagonal':'cardinal');
  await p.waitForTimeout(210);frames.add(await p.locator('canvas').getAttribute('data-walk-frame'));
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(500);
  const end=await p.evaluate(()=>FF.snowJourney.read());assert.equal(Math.sign(end.x-start.x),dx);assert.equal(Math.sign(end.y-start.y),dy);
  await p.waitForTimeout(350);assert.deepEqual(await p.evaluate(()=>FF.snowJourney.read()),end,'release stops');
 }
 assert.ok(frames.size>1,'walk frames advance');
 await reset();await p.locator('canvas').focus();await p.keyboard.down('ArrowUp');await p.keyboard.down('ArrowRight');await p.waitForTimeout(150);assert.equal(await p.locator('canvas').getAttribute('data-diagonal'),'true');await p.keyboard.up('ArrowUp');await p.keyboard.up('ArrowRight');
 const corners=await p.evaluate(()=>{const M=FF.snowJourney;let n=0;for(let y=1;y<29;y++)for(let x=1;x<39;x++)for(const dx of [-1,1])for(const dy of [-1,1]){if(!M.walkable('field',x,y))continue;const next=M.nextStep('field',{x,y},dx,dy);if(next&&next.x!==x&&next.y!==y){if(!M.walkable('field',x+dx,y)||!M.walkable('field',x,y+dy))throw Error('corner cut');n++;}}return n;});assert.ok(corners>0);
 await p.locator('.journey-shell').screenshot({path:'/workspace/snow-journey-qa/circular-pad.png'});assert.deepEqual(errors,[]);console.log('PASS: real touch 8 directions, center pad, cardinal/diagonal sheets, changing frames, release stop, simultaneous keys, corner collision');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
