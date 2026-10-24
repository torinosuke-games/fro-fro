(function(root){
  'use strict';
  var FF=root.FF,U=FF.ui,E=U.el,M=FF.snowJourney,dispose=null;
  function button(label,fn,cls){return E('button',{class:'btn '+(cls||''),text:label,on:{click:fn}});}
  U.screens.adventure.render=function(main){
    if(dispose) dispose();
    var state=M.read(),dead=false,overview=false,raf=0,route=[],face=0,modal=false,seen=new Set(state.seen),images={},width=0,height=0,scale=1,camera={x:state.x,y:state.y},hero={x:state.x,y:state.y},moving=null;
    main.classList.remove('adv-field-screen','adv-battle-screen'); main.classList.add('journey-screen');
    var shell=E('section',{class:'journey-shell'}), heading=E('h1',{text:'雪原の旅'}), area=E('span',{class:'journey-area'}), objective=E('p',{class:'journey-objective'}), status=E('p',{class:'journey-status',attrs:{role:'status'}});
    var canvas=E('canvas',{attrs:{tabindex:'0','aria-label':'雪原の探索。地面をタップして移動。矢印キーでも移動できます。'}}),ctx=canvas.getContext('2d');
    var viewport=E('div',{class:'journey-viewport'},[canvas]);
    var toggle=button('全体マップ',function(){route=[];overview=!overview;toggle.textContent=overview?'冒険に戻る':'全体マップ';toggle.setAttribute('aria-pressed',String(overview));draw();});
    toggle.setAttribute('aria-pressed','false');
    shell.appendChild(E('header',{class:'journey-heading'},[E('div',{},[E('p',{class:'replica-eyebrow',text:'CHAPTER 01 · 白樺地方'}),heading]),button('村へ',function(){dispose();U.show('base');})]));
    shell.appendChild(E('div',{class:'journey-mission'},[area,objective]));
    shell.appendChild(E('div',{class:'journey-tools'},[toggle,button('帰還',recall),button('移動を止める',function(){route=[];status.textContent='立ち止まりました。';})]));
    var layout=E('div',{class:'journey-layout'},[viewport]); shell.appendChild(layout);
    var side=E('aside',{class:'journey-guide'},[E('p',{class:'replica-eyebrow',text:'旅のしおり'}),E('h2',{text:'次の灯りを、見つけよう。'}),E('p',{text:'街道をたどれば、白樺の宿場町へ。気になる脇道には、まだ知らない景色が待っています。'})]);
    var destinations=E('div',{class:'journey-destinations'});side.appendChild(destinations);
    side.appendChild(E('p',{class:'journey-legend',text:'━━ 街道：安全　 ··· 森：危険地帯\n青：湖（橋を渡ろう）　暗い場所：未探索'}));
    side.appendChild(E('details',{class:'journey-future'},[E('summary',{text:'この先に広がる世界'}),E('p',{text:'白樺の森 → 封印図書館［国語］\n凍った湖 → からくり城［算数］\n氷の山脈 → 観測塔［理科］\n雪の旧街道 → 王都［社会］\n霧の海岸 → 灯台［英語］'}),E('small',{text:'白樺地方以外は、今後つなぐ地域の構想です。'})]));
    side.appendChild(E('small',{class:'journey-preview-note',text:'探索プレビュー：戦闘・報酬は準備中。歩いた場所と発見は、このプレビュー専用に保存されます。'}));
    layout.appendChild(side);
    var pad=E('div',{class:'journey-pad',attrs:{'aria-label':'移動方向'}});
    [['↑',0,-1,'北へ'],['←',-1,0,'西へ'],['↓',0,1,'南へ'],['→',1,0,'東へ']].forEach(function(d){var b=button(d[0],function(){step(d[1],d[2]);});b.setAttribute('aria-label',d[3]);pad.appendChild(b);});
    viewport.appendChild(pad);
    shell.appendChild(status);shell.appendChild(E('p',{class:'journey-help',text:'地面・目的地をタップして歩く ／ 矢印キー・方向ボタンでも移動'}));
    main.appendChild(shell);
    function save(){state.seen=Array.from(seen);try{root.localStorage.setItem(M.key,JSON.stringify(state));}catch(e){status.textContent='この端末では保存できません。画面を開いている間は探索できます。';}}
    function discover(){if(state.region==='field')for(var y=-4;y<=4;y++)for(var x=-4;x<=4;x++)if(x*x+y*y<=20&&state.x+x>=0&&state.x+x<40&&state.y+y>=0&&state.y+y<30)seen.add((state.x+x)+','+(state.y+y));}
    function places(){return state.region==='cave'?M.cavePlaces:M.places;}
    function refresh(){
      area.textContent=state.region==='cave'?'こだまの洞窟':state.x>24?'白樺の東の森':state.y<16?'氷湖のほとり':'灯火の街道';
      objective.textContent=state.visited.includes('town')?'次の目標：東の森の「封印図書館」を見つけよう':'次の目標：街道をたどり、白樺の宿場町へ';
      if(state.visited.includes('library')&&state.visited.includes('town'))objective.textContent='宿場町と封印図書館を発見！ 洞窟や湖のほとりも探してみよう';
      if(state.region==='cave')objective.textContent=state.chest?'古い地図を手に入れた。入口から雪原へ戻ろう':'洞窟の奥にある宝箱を探そう';
      U.clear(destinations);places().filter(function(p){return p.kind!=='sign'&&p.kind!=='camp'&&p.kind!=='gate';}).forEach(function(p){
        var b=button((state.visited.includes(p.id)||(p.id==='chest'&&state.chest)?'✓ ':'◇ ')+p.name,function(){go(p);},'journey-destination');b.dataset.destination=p.id;destinations.appendChild(b);
      });
      status.textContent=state.region==='cave'?'氷の洞窟。道をたどって、奥へ。':(M.grid[state.y][state.x]==='r'||M.grid[state.y][state.x]==='='?'街道を歩いています。ここは安全です。':'森の中です。戦闘を追加すると、魔物に出会う地域になります。');
    }
    function showPlace(p){
      route=[];modal=true;if(!state.visited.includes(p.id)&&state.region==='field')state.visited.push(p.id);save();refresh();
      var buttons=[{label:'旅を続ける',onClick:function(){modal=false;canvas.focus({preventScroll:true});}}];
      if(p.kind==='cave')buttons.unshift({label:'洞窟に入る',class:'primary',onClick:function(){changeRegion('cave',2,8);}});
      if(p.kind==='exit')buttons.unshift({label:'雪原へ戻る',class:'primary',onClick:function(){changeRegion('field',8,9);}});
      if(p.kind==='chest'){state.chest=true;save();refresh();}
      U.modal({title:p.name,body:p.note,buttons:buttons});
      // Escape / 背景で閉じた場合にも入力を再開する。
    }
    function changeRegion(region,x,y){state.region=region;state.x=x;state.y=y;hero={x:x,y:y};camera={x:x,y:y};route=[];moving=null;modal=false;overview=false;toggle.textContent='全体マップ';toggle.setAttribute('aria-pressed','false');discover();save();refresh();draw();}
    function recall(){route=[];modal=true;U.modal({title:'訪れた街へ帰還',body:'道を歩いて見つけた街へ、すぐに戻れます。',buttons:M.places.filter(function(p){return p.kind==='town'&&state.visited.includes(p.id);}).map(function(p){return {label:p.name,onClick:function(){changeRegion('field',p.x,p.y);}};}).concat([{label:'閉じる',onClick:function(){modal=false;}}])});}
    function go(p){if(moving||document.querySelector('.overlay'))return;overview=false;toggle.textContent='全体マップ';toggle.setAttribute('aria-pressed','false');route=M.path(state.region,state,p);if(!route.length&&state.x===p.x&&state.y===p.y)showPlace(p);else if(!route.length)status.textContent='ここへは直接進めません。道を探そう。';canvas.focus({preventScroll:true});draw();}
    function step(dx,dy){if(moving||document.querySelector('.overlay'))return;go({x:state.x+dx,y:state.y+dy});}
    function transform(){var g=M.map(state.region);scale=overview?Math.min((width-32)/g[0].length,(height-60)/(g.length*.66)):width<600?67:86;camera.x=overview?(g[0].length-1)/2:hero.x;camera.y=overview?(g.length-1)/2:hero.y-.8;if(!overview){var hx=width/scale/2-.5,hy=height/(scale*.66)/2-.5;camera.x=g[0].length<=hx*2+1?(g[0].length-1)/2:Math.max(hx,Math.min(g[0].length-1-hx,camera.x));camera.y=g.length<=hy*2+1?(g.length-1)/2:Math.max(hy,Math.min(g.length-1-hy,camera.y));}}
    function project(x,y){return{x:width/2+(x-camera.x)*scale,y:height/2+(y-camera.y)*scale*.66};}
    function label(t,x,y,color){ctx.font=(overview?'10':'12')+'px sans-serif';var w=ctx.measureText(t).width+16;ctx.fillStyle=color||'#183c50e8';ctx.beginPath();ctx.roundRect(x-w/2,y-16,w,24,6);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(t,x,y);}
    var crops={tree:[0,0,485,684],cabin:[514,142,620,495],rock:[1170,244,490,427],lantern:[1744,170,280,503]};
    function sprite(name,x,y,w,h){var img=images.atlas;if(!img)return;var b=crops[name],f=img.width/2048;ctx.drawImage(img,b[0]*f,b[1]*f,b[2]*f,b[3]*f,x-w/2,y-h,w,h);}
    function draw(){if(dead||!width)return;transform();var g=M.map(state.region),cave=state.region==='cave';
      ctx.clearRect(0,0,width,height);ctx.lineWidth=1;ctx.fillStyle=cave?'#213b51':'#dfedf0';ctx.fillRect(0,0,width,height);
      if(!cave&&images.snow){ctx.globalAlpha=.38;var pattern=ctx.createPattern(images.snow,'repeat');ctx.save();ctx.translate(-hero.x*scale%256,-hero.y*scale*.66%256);ctx.fillStyle=pattern;ctx.fillRect(-256,-256,width+512,height+512);ctx.restore();ctx.globalAlpha=1;}
      // 描画範囲だけを走査。地図全体を巨大なオフスクリーン画像にしない。
      var xmin=overview?0:Math.max(0,Math.floor(camera.x-width/scale/2)-2),xmax=overview?g[0].length:Math.min(g[0].length,Math.ceil(camera.x+width/scale/2)+2);
      var ymin=overview?0:Math.max(0,Math.floor(camera.y-height/(scale*.66)/2)-3),ymax=overview?g.length:Math.min(g.length,Math.ceil(camera.y+height/(scale*.66)/2)+4);
      for(var y=ymin;y<ymax;y++)for(var x=xmin;x<xmax;x++){var p=project(x,y),t=g[y][x];
        if(cave){ctx.fillStyle=t==='#'?'#152c40':'#8babbe';ctx.fillRect(p.x-scale/2,p.y-scale*.33,scale+1,scale*.66+1);}
        else if(t==='~'||t==='='){ctx.fillStyle='#88b9cc';ctx.fillRect(p.x-scale*.51,p.y-scale*.34,scale*1.02,scale*.68);ctx.strokeStyle='#b8e3e9';ctx.beginPath();ctx.moveTo(p.x-scale*.4,p.y);ctx.lineTo(p.x+scale*.35,p.y-scale*.15);ctx.stroke();}
        if(t==='='){ctx.fillStyle='#977b58';ctx.fillRect(p.x-scale*.3,p.y-scale*.36,scale*.6,scale*.72);ctx.strokeStyle='#ead4a6';for(var n=0;n<4;n++){ctx.beginPath();ctx.moveTo(p.x-scale*.3,p.y-scale*.3+n*scale*.18);ctx.lineTo(p.x+scale*.3,p.y-scale*.3+n*scale*.18);ctx.stroke();}}
      }
      if(!cave){ctx.strokeStyle='#c8bd9c99';ctx.lineWidth=scale*.48;ctx.lineCap='round';ctx.beginPath();
        for(y=ymin;y<ymax;y++)for(x=xmin;x<xmax;x++)if(g[y][x]==='r'){
          var a=project(x,y);[[1,0],[0,1]].forEach(function(d){var yy=y+d[1],xx=x+d[0];if(g[yy]&&(g[yy][xx]==='r'||g[yy][xx]==='=')){var b=project(xx,yy);ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);}});
        }ctx.stroke();ctx.lineCap='butt';}
      if(route.length){ctx.strokeStyle='#c29343';ctx.lineWidth=overview?1:2;ctx.setLineDash([4,6]);ctx.beginPath();var start=project(hero.x,hero.y);ctx.moveTo(start.x,start.y);route.forEach(function(q){var p=project(q.x,q.y);ctx.lineTo(p.x,p.y);});ctx.stroke();ctx.setLineDash([]);}
      for(y=ymin;y<ymax;y++){
        for(x=xmin;x<xmax;x++){var pt=project(x,y);if(g[y][x]==='#'){if(overview){ctx.fillStyle=cave?'#1c3446':'#70978c';ctx.fillRect(pt.x-scale*.4,pt.y-scale*.4,scale*.8,scale*.7);}else {var variation=((x*71+y*43)%13)/13;sprite(cave?'rock':'tree',pt.x+(variation-.5)*scale*.35,pt.y+scale*(.2+variation*.15),scale*(cave?1.2:.85+variation*.25),scale*(cave?.85:1.25+variation*.4));}}}
        places().filter(function(p){return p.y===y;}).forEach(function(p){var s=project(p.x,p.y);if(s.x < -200 || s.x > width+200 || s.y < -200 || s.y > height+200)return;
          if(overview){ctx.fillStyle=p.kind==='boss'?'#9a6583':'#bd8f46';ctx.beginPath();ctx.arc(s.x,s.y,5,0,7);ctx.fill();}
          else if(p.kind==='town'){sprite('cabin',s.x-scale*.45,s.y,scale*1.35,scale*1.1);sprite('cabin',s.x+scale*.6,s.y-scale*.2,scale*1.1,scale*.95);sprite('lantern',s.x,s.y+8,scale*.3,scale*.7);}
          else if(p.kind==='boss'){sprite('rock',s.x,s.y,scale*2.1,scale*1.6);ctx.fillStyle='#465c7b';ctx.fillRect(s.x-scale*.5,s.y-scale,scale,scale);ctx.fillStyle='#91e4ec';ctx.fillRect(s.x-scale*.12,s.y-scale*.65,scale*.24,scale*.65);}
          else if(p.kind==='cave'||p.kind==='exit'){sprite('rock',s.x,s.y,scale*1.6,scale*1.2);ctx.fillStyle='#203647';ctx.beginPath();ctx.ellipse(s.x,s.y-scale*.3,scale*.3,scale*.35,0,0,7);ctx.fill();}
          else {ctx.font=scale*.48+'px serif';ctx.textAlign='center';ctx.fillText(p.kind==='camp'?'🔥':p.kind==='chest'?'🎁':p.kind==='sign'?'⚑':'❄',s.x,s.y);}
          label(p.name,s.x,s.y+(overview?20:27),p.kind==='boss'?'#654566ee':null);
        });
        if(Math.round(hero.y)===y){var h=project(hero.x,hero.y);ctx.fillStyle='#47647644';ctx.beginPath();ctx.ellipse(h.x,h.y+5,scale*.2,scale*.09,0,0,7);ctx.fill();
          if(overview){ctx.fillStyle='#ed703b';ctx.beginPath();ctx.arc(h.x,h.y,5,0,7);ctx.fill();}
          else if(images.hero){var im=images.hero,cw=im.width/2,ch=im.height/2;ctx.drawImage(im,(face%2)*cw,Math.floor(face/2)*ch,cw,ch,h.x-scale*.31,h.y-scale*.9,scale*.62,scale);}
          else {ctx.fillStyle='#e4894d';ctx.fillRect(h.x-10,h.y-30,20,30);}
        }
      }
      if(overview&&!cave){for(y=0;y<g.length;y++)for(x=0;x<g[0].length;x++)if(!seen.has(x+','+y)){var f=project(x,y);ctx.fillStyle='#17394d55';ctx.fillRect(Math.floor(f.x-scale/2),Math.floor(f.y-scale*.33),Math.floor(f.x+scale/2)-Math.floor(f.x-scale/2),Math.floor(f.y+scale*.33)-Math.floor(f.y-scale*.33));}}
      if(!overview){var shade=ctx.createLinearGradient(0,0,0,height);shade.addColorStop(0,'#46677c25');shade.addColorStop(.35,'#ffffff00');shade.addColorStop(1,'#a9c4d533');ctx.fillStyle=shade;ctx.fillRect(0,0,width,height);}
    }
    function tick(time){if(dead)return;if(!shell.isConnected){dispose();return;}
      if(!document.querySelector('.overlay'))modal=false;
      if(!modal&&!overview){
        if(!moving&&route.length){var next=route.shift();moving={from:{x:state.x,y:state.y},to:next,start:time};face=next.x>state.x?3:next.x<state.x?2:next.y<state.y?1:0;}
        if(moving){var t=Math.min(1,(time-moving.start)/(root.matchMedia('(prefers-reduced-motion: reduce)').matches?45:125));hero.x=moving.from.x+(moving.to.x-moving.from.x)*t;hero.y=moving.from.y+(moving.to.y-moving.from.y)*t;
          if(t===1){state.x=moving.to.x;state.y=moving.to.y;moving=null;discover();save();refresh();var place=places().find(function(p){return p.x===state.x&&p.y===state.y;});if(place){if(state.region==='field'&&!state.visited.includes(place.id)){state.visited.push(place.id);save();refresh();}if(!route.length)showPlace(place);}}draw();}
      }
      raf=root.requestAnimationFrame(tick);
    }
    function resize(){width=viewport.clientWidth;height=viewport.clientHeight;var d=Math.min(root.devicePixelRatio||1,2);canvas.width=Math.round(width*d);canvas.height=Math.round(height*d);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(d,0,0,d,0,0);draw();}
    canvas.addEventListener('click',function(e){if(moving)return;var b=canvas.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;var p={x:Math.round(camera.x+(x-width/2)/scale),y:Math.round(camera.y+(y-height/2)/(scale*.66))};var near=places().find(function(q){var s=project(q.x,q.y);return Math.abs(s.x-x)<(overview?14:scale*.65)&&Math.abs(s.y-y)<(overview?25:scale*.6);});go(near||p);});
    // 本体の adventure は document の矢印キーを監視する。比較用画面ではここで受け、二重移動を防ぐ。
    function onKey(e){var dirs={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
      if(dead||!shell.isConnected||!dirs[e.key])return;e.stopPropagation();
      if(document.querySelector('.overlay')||/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName))return;
      e.preventDefault();step.apply(null,dirs[e.key]);
    }
    document.addEventListener('keydown',onKey,true);
    var observer=new ResizeObserver(resize);observer.observe(viewport);
    var leaveObserver=new MutationObserver(function(){if(!shell.isConnected)dispose();});leaveObserver.observe(main,{childList:true});
    dispose=function(){if(dead)return;dead=true;document.removeEventListener('keydown',onKey,true);root.cancelAnimationFrame(raf);observer.disconnect();leaveObserver.disconnect();save();};
    [['atlas','img/adventure/canvas/alpine-atlas.webp'],['snow','img/adventure/canvas/plain.webp'],['hero',FF.adventureScene.traveler(FF.app.state.player.avatar)]].forEach(function(a){var im=new Image();im.onload=function(){images[a[0]]=im;draw();};im.src=a[1];});
    discover();refresh();resize();raf=root.requestAnimationFrame(tick);
  };
})(this);
