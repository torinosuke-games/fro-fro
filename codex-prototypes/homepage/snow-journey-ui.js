(function(root){
  'use strict';
  var FF=root.FF,U=FF.ui,E=U.el,M=FF.snowJourney,dispose=null;
  function button(label,fn,cls){return E('button',{class:'btn '+(cls||''),text:label,on:{click:fn}});}
  U.screens.adventure.render=function(main){
    if(dispose) dispose();
    var state=M.read(),dead=false,overview=false,raf=0,route=[],face=0,modal=false,seen=new Set(state.seen),images={},width=0,height=0,scale=1,zoom=1,zoomSuppressUntil=0,touches=new Map(),pinchDistance=0,pinchZoom=1,pan=null,manualCamera=null,camera={x:state.x,y:state.y},hero={x:state.x,y:state.y},moving=null,held=null,padStamp=0,diag=false,dist=0,keys=new Set(),lastFrame=null,pendingSave=0,lastRefresh=null,lastSpark=0,spriteCache=new Map();
    main.classList.remove('adv-field-screen','adv-battle-screen'); main.classList.add('journey-screen');
    var shell=E('section',{class:'journey-shell'}), area=E('span',{class:'journey-area'}), objective=E('p',{class:'journey-objective'}), status=E('p',{class:'journey-status',attrs:{role:'status'}});
    var canvas=E('canvas',{attrs:{tabindex:'0','aria-label':'雪原の探索。地面をタップして移動。矢印キーでも移動できます。'}}),ctx=canvas.getContext('2d');
    var viewport=E('div',{class:'journey-viewport adv-map-shell is-cv'},[canvas]);
    var toggle=button('全体マップ',function(){stopInput();route=[];overview=!overview;pad.hidden=overview;toggle.textContent=overview?'冒険に戻る':'全体マップ';toggle.setAttribute('aria-pressed',String(overview));draw();});
    toggle.setAttribute('aria-pressed','false');
    shell.appendChild(E('header',{class:'journey-heading'},[E('div',{},[E('p',{class:'replica-eyebrow',text:'CHAPTER 01 · 白樺地方'})]),button('村へ',function(){dispose();U.show('base');})]));
    shell.appendChild(E('div',{class:'journey-mission'},[area,objective]));
    viewport.appendChild(E('div',{class:'journey-tools'},[toggle,button('帰還',recall),button('移動を止める',function(){stopInput();route=[];status.textContent='立ち止まりました。';})]));
    var layout=E('div',{class:'journey-layout'},[viewport]); shell.appendChild(layout);
    var side=E('aside',{class:'journey-guide'},[E('p',{class:'replica-eyebrow',text:'旅のしおり'}),E('h2',{text:'次の灯りを、見つけよう。'}),E('p',{text:'街道をたどれば、白樺の宿場町へ。気になる脇道には、まだ知らない景色が待っています。'})]);
    var destinations=E('div',{class:'journey-destinations'});side.appendChild(destinations);
    side.appendChild(E('p',{class:'journey-legend',text:'━━ 街道：安全　 ··· 森：危険地帯\n青：湖（橋を渡ろう）　暗い場所：未探索'}));
    side.appendChild(E('details',{class:'journey-future'},[E('summary',{text:'この先に広がる世界'}),E('p',{text:'白樺の森 → 封印図書館［国語］\n凍った湖 → からくり城［算数］\n氷の山脈 → 観測塔［理科］\n雪の旧街道 → 王都［社会］\n霧の海岸 → 灯台［英語］'}),E('small',{text:'白樺地方以外は、今後つなぐ地域の構想です。'})]));
    side.appendChild(E('small',{class:'journey-preview-note',text:'探索プレビュー：戦闘は準備中。見つけたアイテムは持ち物に入ります。歩いた場所と発見は、このプレビュー専用に保存されます。'}));
    side.id='journey-guide';side.hidden=true;
    var guideToggle=button('旅のしおり',function(){
      stopInput();route=[];side.hidden=!side.hidden;
      guideToggle.setAttribute('aria-expanded',String(!side.hidden));
      if(!side.hidden)side.querySelector('.journey-guide-close').focus({preventScroll:true});
    },'journey-guide-toggle');
    guideToggle.setAttribute('aria-expanded','false');guideToggle.setAttribute('aria-controls',side.id);
    viewport.querySelector('.journey-tools').appendChild(guideToggle);
    viewport.querySelector('.journey-tools').appendChild(button('主人公へ',function(){manualCamera=null;draw();}));
    side.prepend(button('閉じる',function(){side.hidden=true;guideToggle.setAttribute('aria-expanded','false');guideToggle.focus({preventScroll:true});},'journey-guide-close'));
    layout.appendChild(side);
  var PAD_DIRS = [[0, -1, '↑', '北へ'], [-1, 0, '←', '西へ'], [0, 1, '↓', '南へ'], [1, 0, '→', '東へ']];
  var PAD_DIAG = [[-1, -1, -45], [1, -1, 45], [-1, 1, -135], [1, 1, 135]];   // 上下左右と同じ「↑」を回して、太さと大きさをそろえる
    var pad=directions();
    viewport.appendChild(pad);
    status.classList.add('journey-sr-status');shell.appendChild(status);
    main.appendChild(shell);
  function dirFromVector(vx, vy, r) {
    if (Math.hypot(vx, vy) < r * .26) return null;
    var k = Math.round(Math.atan2(vy, vx) / (Math.PI / 4));
    return ({ 0: [1, 0], 1: [1, 1], 2: [0, 1], 3: [-1, 1], 4: [-1, 0], '-4': [-1, 0], '-3': [-1, -1], '-2': [0, -1], '-1': [1, -1] })[k] || null;
  }
  function directions() {
    var pad = E('div', { class: 'adv-directions', attrs: { 'aria-label': '移動パッド' } }), parts = {}, knob = E('span', { class: 'adv-knob', attrs: { 'aria-hidden': 'true' } });
    // 矢印は、同心円の輪の上に、45度ずつならべる
    function ringStyle(dx, dy) { var m = Math.hypot(dx, dy); return { left: 50 + dx / m * 37 + '%', top: 50 + dy / m * 37 + '%' }; }
    PAD_DIRS.forEach(function (d) {
      var b = button(d[2], function () {
        if (root.performance.now() - padStamp < 700) return;   // 指で押したときは、下の pointer の処理で動いている（二重に歩かない）
        step(d[0],d[1]);
      }, 'adv-button quiet');
      b.setAttribute('aria-label', d[3]); Object.assign(b.style, ringStyle(d[0], d[1])); parts[d[0] + ',' + d[1]] = b; pad.appendChild(b);
    });
    PAD_DIAG.forEach(function (d) {
      var m = E('span', { class: 'adv-diag', attrs: { 'aria-hidden': 'true' } }), g = E('span', { class: 'adv-diag-glyph', text: '↑' });
      g.style.transform = 'rotate(' + d[2] + 'deg)'; m.appendChild(g);
      Object.assign(m.style, ringStyle(d[0], d[1])); parts[d[0] + ',' + d[1]] = m; pad.appendChild(m);
    });
    pad.appendChild(knob);
    function show(d, v) {
      Object.keys(parts).forEach(function (k) { parts[k].classList.toggle('on', !!d && k === d[0] + ',' + d[1]); });
      var m = v ? Math.min(1, v.R * .5 / Math.max(1, Math.hypot(v.vx, v.vy))) : 0;
      knob.style.transform = v ? 'translate(' + v.vx * m + 'px,' + v.vy * m + 'px)' : '';
      knob.classList.toggle('on', !!v);
    }
    function aim(e) {
      var r = pad.getBoundingClientRect(), R = r.width / 2, v = { vx: e.clientX - (r.left + R), vy: e.clientY - (r.top + R), R: R };
      if(overview||document.querySelector('.overlay'))return;keys.clear();route=[];held = dirFromVector(v.vx, v.vy, R); show(held, v);
      if(held&&!moving)step(held[0],held[1]);
    }
    function stop() { held = null; show(null, null); }
    pad.addEventListener('pointerdown', function (e) { padStamp = root.performance.now(); try { pad.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); aim(e); });
    pad.addEventListener('pointermove', function (e) { if (held || (e.buttons && e.pointerType === 'mouse') || pad.hasPointerCapture && pad.hasPointerCapture(e.pointerId)) { padStamp = root.performance.now(); aim(e); } });
    ['pointerup', 'pointercancel'].forEach(function (t) { pad.addEventListener(t, stop); });
    // 子ボタンから円形パッドへキャプチャを移した際の通知では停止しない。
    pad.addEventListener('lostpointercapture',function(e){if(e.target===pad)stop();});
    return pad;
  }
    function scheduleSave(){if(!pendingSave)pendingSave=root.setTimeout(function(){pendingSave=0;if(!dead)save();},0);}
    function save(){state.seen=Array.from(seen);try{root.localStorage.setItem(M.key,JSON.stringify(state));}catch(e){status.textContent='この端末では保存できません。画面を開いている間は探索できます。';}}
    function discover(){if(state.region==='field')for(var y=-4;y<=4;y++)for(var x=-4;x<=4;x++)if(x*x+y*y<=20&&state.x+x>=0&&state.x+x<40&&state.y+y>=0&&state.y+y<30)seen.add((state.x+x)+','+(state.y+y));}
    function places(){return state.region==='cave'?M.cavePlaces:M.places.concat(M.items.filter(function(p){return !M.collected(p.id);}));}
    function refresh(){
      var key=[state.region,state.x>24,state.y<16,M.map(state.region)[state.y][state.x],state.chest,state.visited.join() ].join('|');if(key===lastRefresh)return;lastRefresh=key;
      area.textContent=state.region==='cave'?'こだまの洞窟':state.x>24?'白樺の東の森':state.y<16?'氷湖のほとり':'灯火の街道';
      objective.textContent=state.visited.includes('town')?'次の目標：東の森の「封印図書館」を見つけよう':'次の目標：街道をたどり、白樺の宿場町へ';
      if(state.visited.includes('library')&&state.visited.includes('town'))objective.textContent='宿場町と封印図書館を発見！ 洞窟や湖のほとりも探してみよう';
      if(state.region==='cave')objective.textContent=state.chest?'古い地図を手に入れた。入口から雪原へ戻ろう':'洞窟の奥にある宝箱を探そう';
      U.clear(destinations);places().filter(function(p){return p.kind!=='item'&&p.kind!=='sign'&&p.kind!=='camp'&&p.kind!=='gate';}).forEach(function(p){
        var b=button((state.visited.includes(p.id)||(p.id==='chest'&&state.chest)?'✓ ':'◇ ')+p.name,function(){go(p);},'journey-destination');b.dataset.destination=p.id;destinations.appendChild(b);
      });
      status.textContent=state.region==='cave'?'氷の洞窟。道をたどって、奥へ。':(M.grid[state.y][state.x]==='r'||M.grid[state.y][state.x]==='='?'街道を歩いています。ここは安全です。':'森の中です。戦闘を追加すると、魔物に出会う地域になります。');
    }
    function showPlace(p){
      stopInput();route=[];modal=true;
      if(p.kind==='item'){U.modal({title:'雪の中のきらめき',body:'雪の奥で、小さな光がまたたいています。',buttons:[{label:'調べる',class:'primary',onClick:function(){var found=M.collect(p.id);draw();U.modal({title:found?'回復薬を手に入れた！':'ここは調べました',body:found?'回復薬を1個、持ち物に入れました。':'もうアイテムはありません。',buttons:[{label:'旅を続ける',onClick:function(){modal=false;canvas.focus({preventScroll:true});}}]});}},{label:'あとで調べる',onClick:function(){modal=false;}}]});return;}
      if(!state.visited.includes(p.id)&&state.region==='field')state.visited.push(p.id);save();refresh();
      var buttons=[{label:'旅を続ける',onClick:function(){modal=false;canvas.focus({preventScroll:true});}}];
      if(p.kind==='cave'){changeRegion('cave',2,8);canvas.focus({preventScroll:true});return;}
      if(p.kind==='exit')buttons.unshift({label:'雪原へ戻る',class:'primary',onClick:function(){changeRegion('field',8,9);}});
      if(p.kind==='chest'){state.chest=true;save();refresh();}
      U.modal({title:p.name,body:p.note,buttons:buttons});
      // Escape / 背景で閉じた場合にも入力を再開する。
    }
    function changeRegion(region,x,y){manualCamera=null;stopInput();state.region=region;state.x=x;state.y=y;hero={x:x,y:y};camera={x:x,y:y};route=[];moving=null;modal=false;overview=false;pad.hidden=false;toggle.textContent='全体マップ';toggle.setAttribute('aria-pressed','false');discover();save();refresh();draw();}
    function recall(){stopInput();route=[];modal=true;U.modal({title:'訪れた街へ帰還',body:'道を歩いて見つけた街へ、すぐに戻れます。',buttons:M.places.filter(function(p){return p.kind==='town'&&state.visited.includes(p.id);}).map(function(p){return {label:p.name,onClick:function(){changeRegion('field',p.x,p.y);}};}).concat([{label:'閉じる',onClick:function(){modal=false;}}])});}
    function go(p){manualCamera=null;if(moving||document.querySelector('.overlay'))return;side.hidden=true;guideToggle.setAttribute('aria-expanded','false');viewport.scrollIntoView({block:'nearest',behavior:'auto'});overview=false;pad.hidden=false;toggle.textContent='全体マップ';toggle.setAttribute('aria-pressed','false');stopInput();route=M.path(state.region,state,p);if(!route.length&&state.x===p.x&&state.y===p.y)showPlace(p);else if(!route.length)status.textContent='ここへは直接進めません。道を探そう。';canvas.focus({preventScroll:true});draw();}
    function step(dx,dy){manualCamera=null;if(moving||document.querySelector('.overlay'))return;var next=M.nextStep(state.region,state,dx,dy);if(next)route=[next];}
    function stopInput(){held=null;keys.clear();if(pad){pad.querySelector('.adv-knob').style.transform='';pad.querySelectorAll('.on').forEach(function(el){el.classList.remove('on');});}}
    function transform(){var g=M.map(state.region);scale=overview?Math.min((width-32)/g[0].length,(height-60)/(g.length*.66)):(width<600?67:86);scale*=zoom;canvas.dataset.zoom=String(zoom);camera.x=overview?(g[0].length-1)/2:hero.x;camera.y=overview?(g.length-1)/2:hero.y-.8;if(manualCamera){camera.x=manualCamera.x;camera.y=manualCamera.y;}if(!overview||manualCamera){var hx=width/scale/2-.5,hy=height/(scale*.66)/2-.5;camera.x=g[0].length<=hx*2+1?(g[0].length-1)/2:Math.max(hx,Math.min(g[0].length-1-hx,camera.x));camera.y=g.length<=hy*2+1?(g.length-1)/2:Math.max(hy,Math.min(g.length-1-hy,camera.y));}}
    function project(x,y){return{x:width/2+(x-camera.x)*scale,y:height/2+(y-camera.y)*scale*.66};}
    function label(t,x,y,color){ctx.font=(overview?'10':'12')+'px sans-serif';var w=ctx.measureText(t).width+16;ctx.fillStyle=color||'#183c50e8';ctx.beginPath();ctx.roundRect(x-w/2,y-16,w,24,6);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(t,x,y);}
    var crops={tree:[0,0,485,684],cabin:[514,142,620,495],rock:[1170,244,490,427],lantern:[1744,170,280,503]};
    function sprite(name,x,y,w,h){var img=images.atlas;if(!img)return;
      // 元画像の切り出し・縮小を繰り返さず、表示サイズの小さな絵を再利用する。
      var pw=Math.ceil(w*1.5),ph=Math.ceil(h*1.5),key=name+':'+pw+':'+ph,part=spriteCache.get(key);
      if(!part){var b=crops[name],f=img.width/2048;part=document.createElement('canvas');part.width=pw;part.height=ph;part.getContext('2d').drawImage(img,b[0]*f,b[1]*f,b[2]*f,b[3]*f,0,0,pw,ph);spriteCache.set(key,part);}
      ctx.drawImage(part,x-w/2,y-h,w,h);
    }
    var trailSegments=[];
    M.trail.slice(1).forEach(function(b,i){var a=M.trail[i],dx=Math.sign(b[0]-a[0]),dy=Math.sign(b[1]-a[1]),n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]));for(var j=0;j<n;j++)trailSegments.push([[a[0]+dx*j,a[1]+dy*j],[a[0]+dx*(j+1),a[1]+dy*(j+1)]]);});
    function landmark(name,point,w,h){
      var asset=images[name];if(!asset)return;
      // Small, pre-sized transparent assets; anchor their ground at the map tile.
      var fit=Math.min(scale*w/asset.width,scale*h/asset.height),dw=asset.width*fit,dh=asset.height*fit;
      ctx.drawImage(asset,point.x-dw/2,point.y-dh+scale*.12,dw,dh);
    }
    function draw(){if(dead||!width)return;transform();canvas.dataset.cameraX=String(camera.x);canvas.dataset.cameraY=String(camera.y);var g=M.map(state.region),cave=state.region==='cave';
      ctx.clearRect(0,0,width,height);ctx.lineWidth=1;ctx.fillStyle=cave?'#213b51':'#dfedf0';ctx.fillRect(0,0,width,height);
      if(!cave&&images.snow){
        // Snow occupies fixed world units, like trees and roads. Its repeat
        // spacing and camera offset must both use the current world scale.
        var snow=images.snow,tw=snow.width*scale/86,th=snow.height*scale/86;
        var sx=((camera.x*scale-width/2)%tw+tw)%tw,sy=((camera.y*scale*.66-height/2)%th+th)%th;
        ctx.save();ctx.globalAlpha=.38;ctx.translate(-sx,-sy);
        for(var yy=0;yy<height+sy;yy+=th)for(var xx=0;xx<width+sx;xx+=tw)ctx.drawImage(snow,xx,yy,tw,th);
        ctx.restore();
      }
      // 描画範囲だけを走査。地図全体を巨大なオフスクリーン画像にしない。
      var xmin=overview?0:Math.max(0,Math.floor(camera.x-width/scale/2)-2),xmax=overview?g[0].length:Math.min(g[0].length,Math.ceil(camera.x+width/scale/2)+2);
      var ymin=overview?0:Math.max(0,Math.floor(camera.y-height/(scale*.66)/2)-3),ymax=overview?g.length:Math.min(g.length,Math.ceil(camera.y+height/(scale*.66)/2)+4);
      var y,x;
      if(cave){
        for(y=ymin;y<ymax;y++)for(x=xmin;x<xmax;x++){var p=project(x,y);ctx.fillStyle=g[y][x]==='#'?'#152c40':'#8babbe';ctx.fillRect(p.x-scale/2,p.y-scale*.33,scale+1,scale*.66+1);}
      }else{
        function water(x,y){return !!g[y]&&(g[y][x]==='~'||g[y][x]==='=');}
        // The illustration includes its own shoreline and locally formed ice.
        // No rectangular texture clipping or uniform white border.
        var lake=project(18,9.8);
        if(images.ice)ctx.drawImage(images.ice,lake.x,lake.y,scale*14,scale*.66*10.4);
        // Small transparent painted trail pieces follow the existing safe routes.
        trailSegments.forEach(function(pair){
          var from=pair[0],to=pair[1];if(from[0]<xmin-1||from[0]>xmax||from[1]<ymin-1||from[1]>ymax)return;
          if(water(from[0],from[1])&&water(to[0],to[1]))return;
          var a=project(from[0],from[1]),b=project(to[0],to[1]),length=Math.hypot(b.x-a.x,b.y-a.y);
          ctx.save();ctx.translate((a.x+b.x)/2,(a.y+b.y)/2);ctx.rotate(Math.atan2(b.y-a.y,b.x-a.x));
          if(images.trail){ctx.globalAlpha=.9;ctx.drawImage(images.trail,-length*.62,-scale*.30,length*1.24,scale*.60);}ctx.restore();
        });
        for(y=ymin;y<ymax;y++)for(x=xmin;x<xmax;x++)if(g[y][x]==='='){
          var p=project(x,y);ctx.save();ctx.translate(p.x,p.y);
          if(images.bridge)ctx.drawImage(images.bridge,-scale*.31,-scale*.36,scale*.62,scale*.72);ctx.restore();
        }
      }
      if(route.length){ctx.strokeStyle='#c29343';ctx.lineWidth=overview?1:2;ctx.setLineDash([4,6]);ctx.beginPath();var start=project(hero.x,hero.y);ctx.moveTo(start.x,start.y);route.forEach(function(q){var p=project(q.x,q.y);ctx.lineTo(p.x,p.y);});ctx.stroke();ctx.setLineDash([]);}
      for(y=ymin;y<ymax;y++){
        for(x=xmin;x<xmax;x++){var pt=project(x,y);if(g[y][x]==='#'){if(overview){ctx.fillStyle=cave?'#1c3446':'#70978c';ctx.fillRect(pt.x-scale*.4,pt.y-scale*.4,scale*.8,scale*.7);}else {var variation=((x*71+y*43)%13)/13;sprite(cave?'rock':'tree',pt.x+(variation-.5)*scale*.35,pt.y+scale*(.2+variation*.15),scale*(cave?1.2:.85+variation*.25),scale*(cave?.85:1.25+variation*.4));}}}
        places().filter(function(p){return p.y===y;}).forEach(function(p){var s=project(p.x,p.y);if(s.x < -200 || s.x > width+200 || s.y < -200 || s.y > height+200)return;
          if(p.kind==='item'){
            var time=root.matchMedia('(prefers-reduced-motion: reduce)').matches?1:root.performance.now()/1000;
            for(var k=0;k<3;k++){var pulse=Math.pow(Math.max(0,Math.sin(time*(1.7+k*.63)+p.x*.71+k*2.3)*Math.cos(time*.71+k)),3);var radius=(.025+.07*pulse)*scale;ctx.save();ctx.translate(s.x+Math.sin(k*2.4)*scale*.2,s.y-scale*(.12+k*.09));ctx.globalAlpha=.25+.75*pulse;ctx.fillStyle=k===1?'#fff3ae':'#ffffff';ctx.beginPath();ctx.moveTo(0,-radius);ctx.lineTo(radius*.3,-radius*.3);ctx.lineTo(radius,0);ctx.lineTo(radius*.3,radius*.3);ctx.lineTo(0,radius);ctx.lineTo(-radius*.3,radius*.3);ctx.lineTo(-radius,0);ctx.lineTo(-radius*.3,-radius*.3);ctx.closePath();ctx.fill();ctx.restore();}return;
          }
          if(overview){ctx.fillStyle=p.kind==='boss'?'#9a6583':'#bd8f46';ctx.beginPath();ctx.arc(s.x,s.y,5,0,7);ctx.fill();}
          else if(p.kind==='town'){sprite('cabin',s.x-scale*.45,s.y,scale*1.35,scale*1.1);sprite('cabin',s.x+scale*.6,s.y-scale*.2,scale*1.1,scale*.95);sprite('lantern',s.x,s.y+8,scale*.3,scale*.7);}
          else if(p.kind==='boss'){landmark('library',s,2.35,2.35);}
          else if(p.kind==='cave'||p.kind==='exit'){landmark('caveEntrance',s,1.9,1.55);}
          else if(p.kind==='chest'){if(images.chest)ctx.drawImage(images.chest,s.x-scale*.36,s.y-scale*.65,scale*.72,scale*.72);}
          else if(p.kind==='camp'){landmark('campfire',s,.95,.95);}
          else if(p.kind==='sign'){landmark('signpost',s,.95,1.1);}
          else {ctx.font=scale*.48+'px serif';ctx.textAlign='center';ctx.fillText('❄',s.x,s.y);}
          label(p.name,s.x,s.y+(overview?20:27),p.kind==='boss'?'#654566ee':null);
        });
        if(Math.round(hero.y)===y){var h=project(hero.x,hero.y);ctx.fillStyle='#47647644';ctx.beginPath();ctx.ellipse(h.x,h.y+5,scale*.2,scale*.09,0,0,7);ctx.fill();
          if(overview){ctx.fillStyle='#ed703b';ctx.beginPath();ctx.arc(h.x,h.y,5,0,7);ctx.fill();}
          else if(images.hero){
            var reduced=root.matchMedia('(prefers-reduced-motion: reduce)').matches;
            var wd=diag&&images.walkDiag,walk=(moving||held||route.length)&&!reduced&&(wd||images.walk);
            var im=walk||((diag&&images.heroDiag)||images.hero),size=scale*.62;
            if(walk){var q=im.width/4,col=Math.floor((dist/2%1+1)%1*4)%4;
              var flip=wd?false:diag?face%2===0:face===2&&FF.adventureScene.walkMirrorLeft(FF.app.state.player.avatar);
              var row=wd?face:diag?(face<2?0:1):flip?3:face,ws=size*1.229;
              ctx.save();ctx.translate(h.x,0);if(flip)ctx.scale(-1,1);
              ctx.drawImage(im,col*q,row*q,q,q,-ws/2,h.y+4-.015*size-.922*ws,ws,ws);ctx.restore();
              canvas.dataset.walkFrame=String(col);canvas.dataset.walkSheet=wd?'diagonal':'cardinal';
            }else{var q=im.width/2,f=diag&&!images.heroDiag?({0:0,1:0,2:3,3:3})[face]:face;
              ctx.drawImage(im,(f%2)*q,Math.floor(f/2)*q,q,q,h.x-size/2,h.y-size+4,size,size);
              canvas.dataset.walkSheet='idle';
            }
            canvas.dataset.facing=String(face);canvas.dataset.diagonal=String(diag);
          }
          else {ctx.fillStyle='#e4894d';ctx.fillRect(h.x-10,h.y-30,20,30);}
        }
      }
      if(overview&&!cave){for(y=0;y<g.length;y++)for(x=0;x<g[0].length;x++)if(!seen.has(x+','+y)){var f=project(x,y);ctx.fillStyle='#17394d55';ctx.fillRect(Math.floor(f.x-scale/2),Math.floor(f.y-scale*.33),Math.floor(f.x+scale/2)-Math.floor(f.x-scale/2),Math.floor(f.y+scale*.33)-Math.floor(f.y-scale*.33));}}
      if(!overview){var shade=ctx.createLinearGradient(0,0,0,height);shade.addColorStop(0,'#46677c25');shade.addColorStop(.35,'#ffffff00');shade.addColorStop(1,'#a9c4d533');ctx.fillStyle=shade;ctx.fillRect(0,0,width,height);}
    }
    function startStep(){
      if(modal||overview)return false;
      if(held&&!route.length){var nextHeld=M.nextStep(state.region,state,held[0],held[1]);if(nextHeld)route=[nextHeld];}
      if(!route.length)return false;
      var next=route.shift(),dx=next.x-state.x,dy=next.y-state.y;
      moving={from:{x:state.x,y:state.y},to:next,elapsed:0,duration:root.matchMedia('(prefers-reduced-motion: reduce)').matches?45:(held?280:360)*Math.hypot(dx,dy)};
      diag=!!(dx&&dy);face=diag?(dy<0?2:0)+(dx>0?1:0):dx>0?3:dx<0?2:dy<0?1:0;return true;
    }
    function tick(time){if(dead)return;if(!shell.isConnected){dispose();return;}
      // 本体と同じく、復帰時などの長いフレームを34msに抑えて急な位置飛びを防ぐ。
      var budget=lastFrame===null?0:Math.min(34,Math.max(0,time-lastFrame));lastFrame=time;
      if(!document.querySelector('.overlay'))modal=false;
      if(!modal&&!overview){
        var changed=false;if(!moving)startStep();
        while(moving&&budget>0&&!modal){
          var used=Math.min(budget,moving.duration-moving.elapsed);moving.elapsed+=used;budget-=used;
          var t=moving.elapsed/moving.duration,oldX=hero.x,oldY=hero.y;
          hero.x=moving.from.x+(moving.to.x-moving.from.x)*t;hero.y=moving.from.y+(moving.to.y-moving.from.y)*t;
          dist+=Math.hypot(hero.x-oldX,hero.y-oldY);changed=true;
          if(t<1)break;
          state.x=moving.to.x;state.y=moving.to.y;moving=null;discover();scheduleSave();refresh();
          var place=places().find(function(p){return p.x===state.x&&p.y===state.y;});
          if(place){if(state.region==='field'&&!state.visited.includes(place.id)){state.visited.push(place.id);scheduleSave();refresh();}if(!route.length)showPlace(place);}
          // 余った時間は次のマスへ。境界に停止フレームを挟まず、1フレーム1回だけ描画。
          if(!startStep())break;
        }
        if(changed||time-lastSpark>90){lastSpark=time;draw();}
      }
      raf=root.requestAnimationFrame(tick);
    }
    function fitScreen(){shell.style.setProperty('--journey-top',Math.max(0,main.getBoundingClientRect().top+parseFloat(getComputedStyle(main).paddingTop))+'px');}
    function resize(){width=viewport.clientWidth;height=viewport.clientHeight;var d=Math.min(root.devicePixelRatio||1,width<600?1.5:2);canvas.width=Math.round(width*d);canvas.height=Math.round(height*d);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(d,0,0,d,0,0);draw();}
    function setZoom(value){
      var next=Math.max(.55,Math.min(1.8,Math.round(value*1000)/1000));
      if(next===zoom)return;zoom=next;stopInput();route=[];spriteCache.clear();draw();
    }
    canvas.addEventListener('wheel',function(e){
      e.preventDefault();zoomSuppressUntil=root.performance.now()+300;
      var delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?height:1);
      setZoom(zoom*Math.exp(-Math.max(-180,Math.min(180,delta))*.002));
    },{passive:false});
    function separation(){var p=Array.from(touches.values());return Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}
    canvas.addEventListener('pointerdown',function(e){
      if(e.pointerType==='mouse'&&e.button!==0)return;
      if(e.pointerType!=='touch'){pan={id:e.pointerId,x:e.clientX,y:e.clientY,cx:camera.x,cy:camera.y,dragged:false};canvas.setPointerCapture(e.pointerId);return;}
      touches.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);
      if(touches.size===1)pan={id:e.pointerId,x:e.clientX,y:e.clientY,cx:camera.x,cy:camera.y,dragged:false};
      if(touches.size===2){pan=null;pinchDistance=separation();pinchZoom=zoom;stopInput();route=[];zoomSuppressUntil=Infinity;}
    });
    canvas.addEventListener('pointermove',function(e){
      if(pan&&pan.id===e.pointerId&&touches.size<2){
        var dx=e.clientX-pan.x,dy=e.clientY-pan.y;
        if(pan.dragged||Math.hypot(dx,dy)>8){pan.dragged=true;zoomSuppressUntil=Infinity;stopInput();route=[];moving=null;hero={x:state.x,y:state.y};manualCamera={x:pan.cx-dx/scale,y:pan.cy-dy/(scale*.66)};canvas.style.cursor='grabbing';draw();}
      }
      if(!touches.has(e.pointerId))return;touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(touches.size>=2&&pinchDistance>0)setZoom(pinchZoom*separation()/pinchDistance);
    });
    function endTouch(e){
      if(pan&&pan.id===e.pointerId){if(pan.dragged)zoomSuppressUntil=root.performance.now()+450;pan=null;canvas.style.cursor='';}
      if(!touches.has(e.pointerId))return;touches.delete(e.pointerId);
      if(pinchDistance){zoomSuppressUntil=touches.size?Infinity:root.performance.now()+450;if(!touches.size)pinchDistance=0;}
    }
    ['pointerup','pointercancel','lostpointercapture'].forEach(function(type){canvas.addEventListener(type,endTouch);});
    canvas.addEventListener('click',function(e){if(moving||root.performance.now()<zoomSuppressUntil)return;var b=canvas.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;var p={x:Math.round(camera.x+(x-width/2)/scale),y:Math.round(camera.y+(y-height/2)/(scale*.66))};var near=places().find(function(q){var s=project(q.x,q.y);return Math.abs(s.x-x)<(overview?14:scale*.65)&&Math.abs(s.y-y)<(overview?25:scale*.6);});go(near||p);});
    // 本体の adventure は document の矢印キーを監視する。比較用画面ではここで受け、二重移動を防ぐ。
    function onKey(e){if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)||dead||!shell.isConnected)return;e.stopPropagation();
      if(document.querySelector('.overlay')||/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName))return;e.preventDefault();
      if(e.type==='keyup')keys.delete(e.key);else keys.add(e.key);
      var dx=Number(keys.has('ArrowRight'))-Number(keys.has('ArrowLeft')),dy=Number(keys.has('ArrowDown'))-Number(keys.has('ArrowUp'));
      held=dx||dy?[dx,dy]:null;if(held&&!moving){route=[];step(dx,dy);}
    }
    function blur(){stopInput();route=[];touches.clear();pan=null;canvas.style.cursor='';pinchDistance=0;zoomSuppressUntil=0;}
    document.addEventListener('keydown',onKey,true);document.addEventListener('keyup',onKey,true);root.addEventListener('blur',blur);
    fitScreen();root.addEventListener('resize',fitScreen);if(root.visualViewport)root.visualViewport.addEventListener('resize',fitScreen);
    var observer=new ResizeObserver(resize);observer.observe(viewport);
    var leaveObserver=new MutationObserver(function(){if(!shell.isConnected)dispose();});leaveObserver.observe(main,{childList:true});
    dispose=function(){if(dead)return;dead=true;root.removeEventListener('resize',fitScreen);if(root.visualViewport)root.visualViewport.removeEventListener('resize',fitScreen);root.clearTimeout(pendingSave);stopInput();document.removeEventListener('keydown',onKey,true);document.removeEventListener('keyup',onKey,true);root.removeEventListener('blur',blur);root.cancelAnimationFrame(raf);observer.disconnect();leaveObserver.disconnect();save();};
    [['signpost','codex-prototypes/homepage/landmark-signpost.webp'],['campfire','codex-prototypes/homepage/landmark-campfire.webp'],['caveEntrance','codex-prototypes/homepage/landmark-cave.webp'],['library','codex-prototypes/homepage/landmark-library.webp'],['trail','codex-prototypes/homepage/trail-stone.webp'],['bridge','codex-prototypes/homepage/bridge-old.webp'],['ice','codex-prototypes/homepage/lake-shore.webp'],['chest','codex-prototypes/homepage/treasure-chest.webp'],['atlas','img/adventure/canvas/alpine-atlas.webp'],['snow','img/adventure/canvas/plain.webp'],['hero',FF.adventureScene.traveler(FF.app.state.player.avatar)],['heroDiag',FF.adventureScene.travelerDiag(FF.app.state.player.avatar)],['walk',FF.adventureScene.travelerWalk(FF.app.state.player.avatar)],['walkDiag',FF.adventureScene.travelerWalkDiag(FF.app.state.player.avatar)]].forEach(function(a){if(!a[1])return;var im=new Image();im.onload=function(){var asset=im;if(['hero','heroDiag','walk','walkDiag'].includes(a[0])){var cells=a[0].indexOf('walk')===0?4:2;asset=document.createElement('canvas');asset.width=asset.height=cells*96;asset.getContext('2d').drawImage(im,0,0,asset.width,asset.height);}images[a[0]]=asset;canvas.dataset.walkReady=String(!!(images.walk&&images.walkDiag));draw();};im.src=a[1];});
    discover();refresh();resize();raf=root.requestAnimationFrame(tick);
  };
})(this);
