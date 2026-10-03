// The saved balance changes immediately; only the displayed counter waits for arrival.
(function(root){
 'use strict';
 var FF=root.FF,held={};
 function reduced(){return root.matchMedia&&root.matchMedia('(prefers-reduced-motion: reduce)').matches;}
 function chip(key){return document.querySelector(key==='heat'?'#hud .heat-item':'#hud [data-resource="'+key+'"]');}
 function prepare(changes){
  var pending={};
  if(!reduced())Object.keys(changes).forEach(function(key){var n=changes[key];if(n>0){pending[key]=n;held[key]=(held[key]||0)+n;}});
  return function(key){if(!pending[key])return;held[key]=Math.max(0,(held[key]||0)-pending[key]);delete pending[key];FF.ui.renderHud();var target=chip(key);if(target){target.classList.add('got');setTimeout(function(){target.classList.remove('got');},500);}};
 }
 function fly(jobs,arrive){
  jobs.forEach(function(job,i){
   var target=chip(job.key),src=job.source;
   if(reduced()||!target||!src||!src.animate){arrive(job.key);return;}
   var a=src.getBoundingClientRect(),c=(target.querySelector('.ico, .heat-illustration')||target).getBoundingClientRect();
   var top=document.getElementById('hud').getBoundingClientRect().bottom+12;
   var nav=document.getElementById('nav'),bottom=nav&&!nav.hidden?nav.getBoundingClientRect().top:innerHeight;
   var size=Math.max(32,Math.min(48,a.width)),x=Math.max(8,Math.min(innerWidth-size-8,a.left)),y=Math.max(top,Math.min(bottom-size-12,a.top));
   var ghost=src.cloneNode(true);ghost.className='fly-res reward-flight';ghost.setAttribute('aria-hidden','true');ghost.dataset.reward=job.key;
   Object.assign(ghost.style,{left:x+'px',top:y+'px',width:size+'px',height:size+'px'});document.body.appendChild(ghost);
   var dx=c.left+c.width/2-size/2-x,dy=c.top+c.height/2-size/2-y;
   var finished=false;
   function finish(){if(finished)return;finished=true;ghost.remove();arrive(job.key);}
   var animation=ghost.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+dx*.45+'px,'+(dy*.4-45)+'px) scale(1.18)',opacity:1,offset:.45},{transform:'translate('+dx+'px,'+dy+'px) scale(.75)',opacity:.9}],{duration:850,delay:i*100,easing:'cubic-bezier(.3,.1,.55,1)',fill:'both'});
   animation.onfinish=finish;animation.oncancel=finish;setTimeout(finish,1300+i*100);
  });
 }
 FF.rewardFlight={prepare:prepare,fly:fly,display:function(key,total){return Math.max(0,total-(held[key]||0));}};
})(this);
