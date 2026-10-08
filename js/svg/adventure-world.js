// Original, deterministic pixel scenery. The collision map remains the source of truth.
(function (root) {
  'use strict';
  var FF = root.FF, cached, S = 72;
  function world() {
    if (cached) return cached;
    var c = document.createElement('canvas'); c.width = 936; c.height = 648;
    var ctx = c.getContext('2d'), seed = 3917;
    function rand() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    function rect(x,y,w,h,color) { ctx.fillStyle=color; ctx.fillRect(Math.round(x),Math.round(y),w,h); }
    function poly(points,color) { ctx.fillStyle=color;ctx.beginPath();points.forEach(function(p,i){if(i)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);});ctx.closePath();ctx.fill(); }
    function pine(x,y,s) {
      ctx.save();ctx.translate(x,y);ctx.scale(s,s);
      poly([[-14,8],[9,13],[35,3],[12,-4]],'#91b4c177');
      rect(-3,-12,6,22,'#736c67');
      for(var j=0;j<3;j++) { var v=-19-j*14,w=25-j*5;
        poly([[-w,v+18],[0,v-23],[w,v+18],[8,v+14],[0,v+20]],'#305e69');
        poly([[-w+2,v+13],[0,v-23],[w-4,v+10],[4,v+5],[-3,v+12]],'#dceef1');
        poly([[0,v-23],[w-4,v+10],[4,v+5]],'#aecdd9');
        rect(-w+5,v+10,10,3,'#f9ffff');
      } ctx.restore();
    }
    function mountain(x,y) {
      poly([[x-38,y+31],[x-30,y-5],[x-14,y-18],[x+1,y-58],[x+14,y-37],[x+24,y-32],[x+43,y+28]],'#698a9c');
      poly([[x-38,y+31],[x-14,y-18],[x+1,y-58],[x-3,y+16]],'#d9e9ef');
      poly([[x+1,y-58],[x+14,y-37],[x+24,y-32],[x+43,y+28],[x+17,y+12]],'#8fabbc');
      poly([[x-22,y-5],[x+1,y-58],[x+17,y-25],[x+7,y-31],[x+3,y-13],[x-4,y-24]],'#f8ffff');
      poly([[x-36,y+24],[x-15,y+15],[x-3,y+18],[x+10,y+28],[x+34,y+22],[x+44,y+34],[x-38,y+34]],'#c2dce6');
      rect(x-19,y+8,7,3,'#f4fcff');
    }
    function cabin(x,y,small) {
      var w=small?26:36; poly([[x-w,y+14],[x+w+16,y+16],[x+w+28,y+4],[x,y-10]],'#779eac66');
      rect(x-w,y-18,w*2,38,'#756859');rect(x-w+3,y-16,w*2-6,34,'#9d8063');
      for(var k=0;k<4;k++)rect(x-w+2,y-10+k*8,w*2-4,2,'#756959');
      poly([[x-w-9,y-15],[x-5,y-45],[x+w+11,y-17]],'#496876');
      poly([[x-w-9,y-21],[x-5,y-49],[x+w+11,y-23],[x+w+7,y-16],[x-5,y-40],[x-w-7,y-15]],'#f6feff');
      rect(x+14,y-43,7,17,'#716f68');rect(x+12,y-45,11,4,'#eaf7fb');
      rect(x-7,y,13,20,'#3b5059');rect(x-23,y-9,10,10,'#ffda8b');rect(x+13,y-9,10,10,'#ffda8b');
      rect(x-26,y+20,52,4,'#f5ffff');
    }
    rect(0,0,936,648,'#317395');
    for(var i=0;i<2500;i++) {var x=rand()*936,y=rand()*648;rect(x,y,5+rand()*15,2,['#4687a7','#568fac','#2b648a'][i%3]);}
    // Snow coastline: pixel steps keep every traversable tile safely on land.
    poly([[58,52],[255,52],[270,43],[520,46],[551,29],[801,36],[816,57],[884,57],[884,565],[864,580],[650,583],[629,598],[331,590],[314,577],[67,577],[67,452],[50,431]],'#7d9aab');
    poly([[58,45],[255,45],[270,36],[520,39],[551,22],[801,29],[816,50],[884,50],[884,558],[864,573],[650,576],[629,591],[331,583],[314,570],[67,570],[67,445],[50,424]],'#b1d4e0');
    poly([[62,45],[255,45],[270,36],[520,39],[551,22],[801,29],[816,50],[880,50],[880,553],[860,569],[650,572],[629,585],[331,577],[314,566],[72,566],[72,440],[55,422]],'#e5f2f5');
    for(i=0;i<6000;i++) {x=76+rand()*798;y=60+rand()*500;rect(x,y,2+rand()*5,2,['#d5e7ee','#f9ffff','#cee2ea','#eaf6f8'][i%4]);}
    // Wide packed-snow track connects the towns and the mountain pass.
    ctx.strokeStyle='#c3dce5';ctx.lineWidth=25;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(108,468);ctx.lineTo(828,468);ctx.lineTo(828,180);ctx.stroke();
    ctx.strokeStyle='#edf7f8';ctx.lineWidth=18;ctx.stroke();
    for(x=136;x<823;x+=21){rect(x,464,4,2,'#a8c8d5');rect(x+7,471,4,2,'#afcdd7');}
    for(y=192;y<460;y+=20){rect(823,y,3,4,'#accbd5');rect(831,y+7,3,4,'#accbd5');}
    // Terrain is drawn only on impassable cells, apart from small ground details.
    FF.adventure.MAP.forEach(function(row,ty){row.split('').forEach(function(tile,tx){
      if(tile!=='#')return;
      var cx=tx*S+36,cy=ty*S+43;
      if(tx===8 && ty!==0 && ty!==8) mountain(cx,cy);
      else if(tx>0 && tx<12) {pine(cx-15,cy+6,.7);pine(cx+15,cy-6,.85);pine(cx+9,cy+27,.65);}
    });});
    cabin(108,468,false);cabin(818,176,false);cabin(851,144,true);cabin(786,143,true);
    // Campfire and supplies.
    poly([[450,271],[481,271],[487,256],[469,218]],'#89a3aa');poly([[450,271],[469,218],[470,267]],'#edf7f7');
    rect(475,266,15,4,'#80735e');poly([[475,265],[479,246],[484,255],[487,244],[491,264]],'#e89741');poly([[480,265],[484,253],[487,265]],'#ffe1a2');
    rect(241,99,24,19,'#6a6756');rect(243,99,20,13,'#b28b48');rect(241,96,24,4,'#e5c587');rect(251,99,4,19,'#dfb76e');
    cached=c.toDataURL();return cached;
  }
  function traveler(avatar) {
    if (FF.defs.AVATARS.indexOf(avatar) < 0) avatar = 'e1';
    var junior = ['e4','e7','e2','j4','e1','j6','e8','e9','e6','e5','e12','e3'];
    var sheet = avatar.charAt(0) === 'j' ? junior[Number(avatar.slice(1)) - 1] : avatar;
    return 'img/adventure/travelers/' + sheet + '.webp';
  }
  function enemy(id) {
    var boxes={cub:'0 550 340 405',wolf:'337 278 497 675',boss:'829 20 707 940'};
    var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox',boxes[id]);svg.setAttribute('class','adv-monster');svg.setAttribute('aria-hidden','true');
    // A nested viewport clips the sprite even when the outer SVG is letterboxed.
    var box=boxes[id].split(' '),crop=document.createElementNS(svg.namespaceURI,'svg');
    ['x','y','width','height'].forEach(function(key,i){crop.setAttribute(key,box[i]);});
    crop.setAttribute('viewBox',boxes[id]);crop.setAttribute('overflow','hidden');
    var img=document.createElementNS(svg.namespaceURI,'image');img.setAttribute('href','img/adventure/snow-enemies.webp');img.setAttribute('width','1536');img.setAttribute('height','1024');crop.appendChild(img);svg.appendChild(crop);return svg;
  }
  function chest() {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 120 100');svg.setAttribute('class','adv-loot-chest');svg.setAttribute('aria-hidden','true');
    function shape(tag,attrs,parent) {var node=document.createElementNS(ns,tag);Object.keys(attrs).forEach(function(k){node.setAttribute(k,attrs[k]);});(parent||svg).appendChild(node);return node;}
    shape('ellipse',{cx:60,cy:88,rx:49,ry:8,fill:'#0005'});
    shape('path',{d:'M20 45 L98 45 L91 85 L27 85 Z',fill:'#795039',stroke:'#f0bd55','stroke-width':4});
    shape('path',{d:'M32 46 L36 84 M84 46 L80 84',stroke:'#f4c766','stroke-width':7});
    shape('rect',{x:51,y:52,width:18,height:18,rx:3,fill:'#ffd478'});
    var lid=shape('g',{class:'adv-loot-lid'});
    shape('path',{d:'M20 45 L25 15 Q60 0 95 15 L98 45 Z',fill:'#986847',stroke:'#f0bd55','stroke-width':4},lid);
    shape('path',{d:'M34 12 L32 43 M85 12 L87 43',stroke:'#f4c766','stroke-width':7},lid);
    shape('path',{class:'adv-loot-sparkle',d:'M60 15 L64 27 L76 31 L64 35 L60 47 L56 35 L44 31 L56 27 Z',fill:'#fff5b4'});
    return svg;
  }
  var prepared = {};
  function preload(avatar) {
    ['img/adventure/snow-world.webp','img/adventure/snow-battle.webp','img/adventure/snow-enemies.webp',traveler(avatar)].forEach(function(url){
      if (prepared[url]) return;
      var image=new Image();prepared[url]=image;image.decoding='async';image.src=url;
      if (image.decode) image.decode().catch(function(){});
    });
  }
  FF.adventureScene={background:'img/adventure/snow-world.webp',world:world,traveler:traveler,enemy:enemy,chest:chest,preload:preload,tile:S};
})(this);
