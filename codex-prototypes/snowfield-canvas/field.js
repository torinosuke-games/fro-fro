/* Isolated field study. No FF scripts, saved state, storage, network APIs or external packages. */
(() => {
'use strict';
const MAP=['#############','#.......#...#','#.......#...#','#.......#...#','#..##...#...#','#.......#...#','#...........#','#.......#...#','#############'];
const PLACES={home:{x:1,y:6,name:'山小屋',message:'山小屋に着きました。暖かな灯りが迎えてくれます。'},camp:{x:6,y:3,name:'焚き火',message:'火のぬくもりで、ひと休み。'},chest:{x:3,y:1,name:'古い道具箱',message:'雪の下に、旅人の道具箱を見つけました。'},town:{x:11,y:2,name:'雪灯りの集落',message:'峠を越え、雪灯りの集落に到着しました。'}};
const $=id=>document.getElementById(id), canvas=$('field'),ctx=canvas.getContext('2d',{alpha:true});
const T=112,Y=.64,GROUND_W=13*T+120,GROUND_H=9*T*Y+130;
const hero={x:1,y:6,face:0,diag:false},camera={x:1,y:5.7};
let width=0,height=0,ratio=1,zoom=1,ready=false,raf=0,last=0,step=null,route=[],held=null,pointer=null,keys=new Set(),overview=false,dirty=true,quality='auto',low=innerWidth<=600,near=null,toastTimer=0,walkTime=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const stats={frames:0,draws:0,drawMs:[],intervals:[],visibleObjects:0,autoReduced:false,loaded:false};
let seed=941;function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
const objects=[],images={};
const crop={tree:[0,0,485,684],cabin:[514,142,620,495],rock:[1170,244,490,427],lantern:[1744,170,280,503]};
function walk(x,y){return Number.isInteger(x)&&Number.isInteger(y)&&MAP[y]?.[x]==='.';}
function allowed(x,y,nx,ny){return walk(nx,ny)&&(!(nx!==x&&ny!==y)||(walk(nx,y)&&walk(x,ny)));}
function pathTo(x,y,tx,ty){
 if(!walk(tx,ty))return null;
 const open=[{x,y,path:[]}],visited=new Set([x+','+y]);
 for(let i=0;i<open.length;i++){const p=open[i];if(p.x===tx&&p.y===ty)return p.path;
 for(const [dx,dy] of [[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const nx=p.x+dx,ny=p.y+dy,k=nx+','+ny;if(!visited.has(k)&&allowed(p.x,p.y,nx,ny)){visited.add(k);open.push({x:nx,y:ny,path:p.path.concat({x:nx,y:ny})});}}}return null;
}
function cameraTarget(){const margin=Math.min(4.9, Math.max(1.6,width/(T*zoom)*.30));return {x:Math.max(margin,Math.min(12-margin,hero.x)),y:hero.y-.3};}
function project(x,y){return {x:width*.5+(x-camera.x)*T*zoom,y:height*.55+(y-camera.y)*T*Y*zoom};}
function unproject(x,y){return {x:camera.x+(x-width*.5)/(T*zoom),y:camera.y+(y-height*.55)/(T*Y*zoom)};}
function poly(c,pts,fill){c.fillStyle=fill;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();}
function oval(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
// All snow texture, tracks and cliff faces are rasterized once, rather than redrawn per frame.
const ground=document.createElement('canvas');ground.width=GROUND_W;ground.height=GROUND_H;
function buildGround(){
 const c=ground.getContext('2d');const outline=[[28,95],[98,35],[300,30],[370,49],[650,24],[920,42],[1310,35],[1400,110],[1402,515],[1360,658],[1090,690],[1020,673],[700,700],[610,680],[170,689],[62,647],[35,464]];
 poly(c,outline.map(([x,y])=>[x,y+50]),'#4b7485');poly(c,outline.map(([x,y])=>[x,y+25]),'#96b9c5');
 // Bake actual crag sprites into the shore; avoid the geometric vertical 'board' edge.
 const rock=crop.rock,f=images.atlas.width/2048;
 for(let x=42;x<1370;x+=64){const y=644+Math.sin(x*.012)*10;c.drawImage(images.atlas,rock[0]*f,rock[1]*f,rock[2]*f,rock[3]*f,x-38,y-24,125,92);}
 for(let y=90;y<635;y+=62)c.drawImage(images.atlas,rock[0]*f,rock[1]*f,rock[2]*f,rock[3]*f,4,y,100,96);

 const snow=c.createLinearGradient(0,0,1000,740);snow.addColorStop(0,'#fcfcf0');snow.addColorStop(.55,'#e7f0ed');snow.addColorStop(1,'#c5dce3');poly(c,outline,snow);
 c.save();c.beginPath();outline.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.clip();
 c.globalAlpha=.86;c.drawImage(images.snow,0,0,GROUND_W,GROUND_H);c.globalAlpha=1;
 for(let i=0;i<80;i++){const x=rand()*GROUND_W,y=rand()*GROUND_H,r=20+rand()*100;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,i%3?'#ffffff70':'#80adbd22');g.addColorStop(1,'#ffffff00');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
 function track(pts,w,color){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo((x+.5)*T+28,(y+.5)*T*Y+20):c.moveTo((x+.5)*T+28,(y+.5)*T*Y+20));c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.strokeStyle=color;c.stroke();}
 const main=[[1,6],[5,6],[8,6],[11,6],[11,2]],side=[[5,6],[6,5],[6,3]],north=[[2,6],[2,3],[3,1]];
 [main,side,north].forEach((p,i)=>{track(p,i?27:40,'#91aeb644');track(p,i?23:34,'#f6f5e996');track(p,i?11:17,'#d7dcd14a');});
 for(let i=0;i<16000;i++){c.fillStyle=i%3?'#ffffff65':'#709dad1b';c.fillRect(rand()*GROUND_W,rand()*GROUND_H,rand()*2+1,1);}
 c.restore();
}
function add(type,x,y,w,variant=0){const b=crop[type];objects.push({type,x,y,w,h:w*b[3]/b[2],variant});}
function buildObjects(){
 MAP.forEach((row,y)=>[...row].forEach((v,x)=>{if(v!=='#')return;
 if(x===8&&y>0&&y<8){add('rock',x,y+.08,150+rand()*24);if(y!==5&&y!==7)add('rock',x+.05,y-.35,108);}
 else {add('tree',x+(rand()-.5)*.28,y+(rand()-.5)*.2,101+rand()*35);if(y===0||y===8)add('tree',x+.4,y+.19,90+rand()*30);}}));
 add('cabin',1,5.7,176);add('cabin',11,1.65,172);add('cabin',10.25,1.1,132);add('cabin',11.65,.92,128);
 add('lantern',2.6,6.1,35);add('lantern',7.15,6.02,35);add('lantern',10.5,4.1,35);add('lantern',10.3,2.35,35);
 // Every tree and ridge is anchored on a blocked MAP cell. Cabins sit just north of their interaction point.
 objects.sort((a,b)=>a.y-b.y);
}
const shadowStamp=document.createElement('canvas');shadowStamp.width=96;shadowStamp.height=40;{const c=shadowStamp.getContext('2d');c.scale(1,.42);const g=c.createRadialGradient(48,48,0,48,48,48);g.addColorStop(0,'#31526665');g.addColorStop(.45,'#3152662d');g.addColorStop(1,'#31526600');c.fillStyle=g;c.fillRect(0,0,96,96);}
function shadow(p,w,h,alpha=.16){ctx.drawImage(shadowStamp,p.x-w*.45,p.y-h*.05,w*1.12,h*.18);}
function sprite(o){const p=project(o.x,o.y),w=o.w*zoom,h=o.h*zoom;if(p.x+w/2<0||p.x-w/2>width||p.y<0||p.y-h>height)return;
 stats.visibleObjects++;const b=crop[o.type],f=images.atlas.width/2048;shadow(p,w,h);
 // Fade scenery that would obscure the hero's body, while retaining its contact shadow.
 const hp=project(hero.x,hero.y);const covers=o.y>hero.y+.05&&Math.abs(p.x-hp.x)<w*.42&&hp.y-28>p.y-h&&hp.y-28<p.y;
 ctx.globalAlpha=covers?.36:1;ctx.drawImage(images.atlas,b[0]*f,b[1]*f,b[2]*f,b[3]*f,p.x-w/2,p.y-h,w,h);ctx.globalAlpha=1;
}
function drawHero(){const p=project(hero.x,hero.y),s=72*zoom,bob=step&&!reduced?Math.sin(walkTime*22)*1.8:0;shadow(p,43*zoom,100*zoom,.2);
 ctx.strokeStyle='#e0b568';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,p.y+1,20*zoom,7*zoom,0,0,Math.PI*2);ctx.stroke();
 const img=hero.diag?images.diag:images.hero,q=img.width/2,ix=hero.face%2,iy=Math.floor(hero.face/2);ctx.drawImage(img,ix*q,iy*q,q,q,p.x-s/2,p.y-s+4+bob,s,s);
}
function drawProp(kind,x,y,w){const p=project(x,y),img=images.props,half=img.width/2,h=w*img.height/half;shadow(p,w*zoom,h*zoom);ctx.drawImage(img,kind*half,0,half,img.height,p.x-w*zoom/2,p.y-h*zoom+8*zoom,w*zoom,h*zoom);}
function drawFire(){drawProp(1,6.65,2.75,66);}
function label(x,y,text){const p=project(x,y);if(p.x<-100||p.x>width+100||p.y<190||p.y>height-210)return;ctx.font='11px sans-serif';const w=ctx.measureText(text).width+22;ctx.fillStyle='#f7f9efec';ctx.beginPath();ctx.roundRect(p.x-w/2,p.y+13,w,25,12);ctx.fill();ctx.fillStyle='#46616a';ctx.textAlign='center';ctx.fillText(text,p.x,p.y+30);}
function draw(){
 const start=performance.now();stats.visibleObjects=0;ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);
 const p=project(-.5,-.5);ctx.drawImage(ground,p.x-28*zoom,p.y-20*zoom,GROUND_W*zoom,GROUND_H*zoom);
 if(route.length){ctx.strokeStyle='#b48b4590';ctx.lineWidth=2;ctx.setLineDash([3,8]);ctx.beginPath();const hp=project(hero.x,hero.y);ctx.moveTo(hp.x,hp.y);route.forEach(n=>{const q=project(n.x,n.y);ctx.lineTo(q.x,q.y)});ctx.stroke();ctx.setLineDash([]);const q=project(route.at(-1).x,route.at(-1).y);ctx.strokeStyle='#b48439';ctx.beginPath();ctx.ellipse(q.x,q.y,15*zoom,7*zoom,0,0,Math.PI*2);ctx.stroke();}
 drawProp(0,3,.7,45);
 let heroDrawn=false,fireDrawn=false;for(const o of objects){if(!fireDrawn&&o.y>=3){drawFire();fireDrawn=true;}if(!heroDrawn&&o.y>=hero.y){drawHero();heroDrawn=true;}sprite(o);}if(!heroDrawn)drawHero();if(!fireDrawn)drawFire();
 label(1,6,'山小屋');label(6,3,'焚き火');label(11,2,'雪灯りの集落');
 // Subtle light; no blur, dynamic shadow filter, WebGL, 3D CSS or post-processing.
 if(!low){const g=ctx.createLinearGradient(0,0,width,height);g.addColorStop(0,'#fff0be18');g.addColorStop(.6,'#fff0be00');g.addColorStop(1,'#315e7d0a');ctx.fillStyle=g;ctx.fillRect(0,0,width,height);}
 stats.draws++;stats.drawMs.push(performance.now()-start);if(stats.drawMs.length>600)stats.drawMs.shift();dirty=false;
}
function resize(){width=innerWidth;height=innerHeight;zoom=width<600?.78:Math.min(1.22,width/1000);if(height<500)zoom=.8;ratio=low?1:Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);dirty=true;wake();}
function facing(dx,dy){hero.diag=dx!==0&&dy!==0;hero.face=hero.diag?(dy<0?2:0)+(dx>0?1:0):dy<0?1:dy>0?0:dx<0?2:3;}
function begin(nx,ny){const x=Math.round(hero.x),y=Math.round(hero.y);if(!allowed(x,y,nx,ny))return false;facing(nx-x,ny-y);step={x,y,nx,ny,t:0,duration:Math.hypot(nx-x,ny-y)*.22};return true;}
function nextMove(){if(step)return;let dir=held;if(keys.size){const dx=Number(keys.has('ArrowRight')||keys.has('d'))-Number(keys.has('ArrowLeft')||keys.has('a')),dy=Number(keys.has('ArrowDown')||keys.has('s'))-Number(keys.has('ArrowUp')||keys.has('w'));dir=dx||dy?[dx,dy]:null;}
 if(dir){route=[];const x=Math.round(hero.x),y=Math.round(hero.y);if(!begin(x+dir[0],y+dir[1])&&dir[0]&&dir[1]){if(!begin(x+dir[0],y))begin(x,y+dir[1]);}}
 else if(route.length){const n=route.shift();begin(n.x,n.y);}}
function updateNearby(){const n=Object.values(PLACES).find(p=>Math.hypot(hero.x-p.x,hero.y-p.y)<.65);if(n!==near){near=n;$('action').disabled=!near;$('action').querySelector('b').textContent=near?.name==='焚き火'?'ひと休み':'しらべる';}}
function frame(now){raf=0;if(!ready||document.hidden||overview){last=0;return;}const elapsed=last?now-last:16.67;if(low&&last&&elapsed<31){raf=requestAnimationFrame(frame);return;}const dt=Math.min(elapsed/1000,.12);last=now;stats.frames++;if(step)stats.intervals.push(elapsed);if(stats.intervals.length>600)stats.intervals.shift();
 nextMove();if(step){step.t+=dt;const f=Math.min(1,step.t/step.duration);hero.x=step.x+(step.nx-step.x)*f;hero.y=step.y+(step.ny-step.y)*f;walkTime+=dt;dirty=true;if(f===1){hero.x=step.nx;hero.y=step.ny;step=null;updateNearby();}}
 const target=cameraTarget(),tx=target.x,ty=target.y,a=reduced?1:1-Math.exp(-dt*10);const movingCamera=Math.abs(tx-camera.x)+Math.abs(ty-camera.y)>.003;if(movingCamera){camera.x+=(tx-camera.x)*a;camera.y+=(ty-camera.y)*a;dirty=true;}
 if(dirty)draw();
 // Conservative adaptive fallback requires sustained slow frames, not a single startup hitch.
 if(quality==='auto'&&!low&&stats.intervals.length>=24&&stats.intervals.slice(-24).filter(t=>t>29).length>16){low=true;stats.autoReduced=true;$('quality').textContent='画質：自動・軽量';resize();}
 if((step||route.length||held||keys.size||movingCamera)&&!raf)raf=requestAnimationFrame(frame);else last=0;
}
function wake(){if(ready&&!raf&&!document.hidden&&!overview)raf=requestAnimationFrame(frame);}
function cancelInput(){held=null;keys.clear();pointer=null;$('knob').style.transform='';route=[];if(step){hero.x=step.t/step.duration>.5?step.nx:step.x;hero.y=step.t/step.duration>.5?step.ny:step.y;step=null;}dirty=true;updateNearby();wake();}
function announce(s){$('toast').textContent=s;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3200);}
function go(tx,ty){const from=step?{x:step.nx,y:step.ny}:{x:Math.round(hero.x),y:Math.round(hero.y)};const p=pathTo(from.x,from.y,tx,ty);if(!p){announce('そこは岩や林です。雪の道を選んでください。');return false;}held=null;route=p;dirty=true;wake();return true;}
const pad=$('pad');function padMove(e){if(e.pointerId!==pointer)return;const r=pad.getBoundingClientRect(),dx=e.clientX-r.x-r.width/2,dy=e.clientY-r.y-r.height/2,d=Math.hypot(dx,dy),m=Math.min(d,r.width*.29),angle=Math.atan2(dy,dx);$('knob').style.transform=`translate(${Math.cos(angle)*m}px,${Math.sin(angle)*m}px)`;if(d<r.width*.12)held=null;else{const a=Math.round(angle/(Math.PI/4))*Math.PI/4;held=[Math.round(Math.cos(a)),Math.round(Math.sin(a))];}route=[];wake();}
pad.addEventListener('pointerdown',e=>{if(pointer!==null||!ready)return;e.preventDefault();pointer=e.pointerId;pad.setPointerCapture(e.pointerId);padMove(e);});pad.addEventListener('pointermove',padMove);
function release(e){if(e.pointerId!==pointer)return;pointer=null;held=null;$('knob').style.transform='';wake();}
pad.addEventListener('pointerup',release);pad.addEventListener('pointercancel',e=>{if(e.pointerId===pointer)cancelInput();});pad.addEventListener('lostpointercapture',release);
pad.querySelectorAll('button').forEach(b=>b.addEventListener('click',e=>{if(e.detail===0){route=[];begin(Math.round(hero.x)+Number(b.dataset.dx),Math.round(hero.y)+Number(b.dataset.dy));wake();}}));
let tap=null;canvas.addEventListener('pointerdown',e=>{tap={id:e.pointerId,x:e.clientX,y:e.clientY};});canvas.addEventListener('pointerup',e=>{if(!tap||tap.id!==e.pointerId)return;const t=tap;tap=null;if(Math.hypot(e.clientX-t.x,e.clientY-t.y)>16||!ready)return;const p=unproject(e.clientX,e.clientY);go(Math.round(p.x),Math.round(p.y));});canvas.addEventListener('pointercancel',()=>tap=null);
addEventListener('keydown',e=>{if(overview)return;const k=e.key.length===1?e.key.toLowerCase():e.key;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','w','a','s','d'].includes(k)){e.preventDefault();keys.add(k);route=[];wake();}if(e.key===' '&&document.activeElement===canvas){e.preventDefault();$('action').click();}});addEventListener('keyup',e=>{keys.delete(e.key.length===1?e.key.toLowerCase():e.key);});
addEventListener('blur',cancelInput);document.addEventListener('visibilitychange',()=>{cancelInput();if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0;}else wake();});addEventListener('resize',resize);
$('quality').addEventListener('click',()=>{quality=quality==='auto'?'low':quality==='low'?'high':'auto';low=quality==='low'||(quality==='auto'&&innerWidth<=600);stats.intervals=[];$('quality').textContent=quality==='auto'?(low?'画質：自動・軽量':'画質：自動'):low?'画質：軽量':'画質：標準';resize();});
$('action').addEventListener('click',()=>{if(near){cancelInput();announce(near.message);}});
function mini(){const c=$('minimap').getContext('2d'),s=48;c.fillStyle='#d0e1e2';c.fillRect(0,0,624,432);MAP.forEach((row,y)=>[...row].forEach((v,x)=>{c.fillStyle=v==='#'?'#71939b':'#f4f4e8';c.fillRect(x*s+2,y*s+2,s-4,s-4);if(v==='#'){c.fillStyle='#a9c5c7';c.beginPath();c.moveTo(x*s+24,y*s+9);c.lineTo(x*s+9,y*s+35);c.lineTo(x*s+39,y*s+35);c.fill();}}));c.textAlign='center';c.font='15px sans-serif';Object.values(PLACES).forEach(p=>{c.fillStyle='#9b732f';c.fillText(p.name,(p.x+.5)*s,(p.y+.5)*s-6);});oval(c,(hero.x+.5)*s,(hero.y+.5)*s,9,9,'#d6993f');c.strokeStyle='#fff';c.lineWidth=3;c.stroke();}
$('mapButton').onclick=()=>{cancelInput();overview=true;cancelAnimationFrame(raf);raf=0;mini();$('mapDialog').showModal();};$('closeMap').onclick=()=>$('mapDialog').close();$('mapDialog').addEventListener('close',()=>{overview=false;last=0;dirty=true;wake();});
$('minimap').addEventListener('click',e=>{const r=e.currentTarget.getBoundingClientRect(),x=Math.floor((e.clientX-r.x)/r.width*13),y=Math.floor((e.clientY-r.y)/r.height*9);if(go(x,y))$('mapDialog').close();});document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{const p=PLACES[b.dataset.place];go(p.x,p.y);$('mapDialog').close();});
async function load(name,url){const i=new Image();i.src=url;await i.decode();images[name]=i;}
async function init(){try{await Promise.all([load('atlas','assets/alpine-atlas.webp'),load('hero','assets/hero.webp'),load('diag','assets/hero-diagonal.webp'),load('distance','assets/alpine-distance.webp'),load('snow','assets/snow-surface.webp'),load('props','assets/camp-props.webp')]);buildGround();buildObjects();ready=true;stats.loaded=true;if(low)$('quality').textContent='画質：自動・軽量';resize();Object.assign(camera,cameraTarget());updateNearby();$('loading').hidden=true;wake();}catch(e){$('loading').querySelector('p').textContent='画像を読み込めませんでした。フォルダー一式を配置して、ページを開き直してください。';console.error(e);}}
// Read-only inspection hooks except explicit test route/reset, enabled only with ?qa=1.
if(new URLSearchParams(location.search).has('qa'))window.FIELD_QA={MAP,PLACES,walk,pathTo,project,stats,state:()=>({hero:{...hero},camera:{...camera},route:route.slice(),moving:!!step,held,quality,low,ratio,canvas:[canvas.width,canvas.height],raf,near:near?.name}),go,reset:(x,y)=>{if(!walk(x,y))throw Error('Blocked test position');cancelInput();hero.x=x;hero.y=y;Object.assign(camera,cameraTarget());dirty=true;updateNearby();wake();}};
init();
})();
