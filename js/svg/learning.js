// 正確な数値・形を持つ教材図。文字列のHTMLを挿入せずSVGの要素を組み立てる。
(function(root){
 'use strict';
 var FF=root.FF,U=FF.ui,S=U.svg;
 var blue='#3389bf',ink='#21465c',pale='#dcedf6',orange='#e9a34b';
 function text(x,y,t,size,anchor){return S('text',{x:x,y:y,fill:ink,'font-size':size||20,'text-anchor':anchor||'middle','font-family':'inherit','font-weight':600},String(t));}
 function line(x1,y1,x2,y2,color,dash){return S('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:color||blue,'stroke-width':3,'stroke-dasharray':dash||null});}
 function box(x,y,w,h,fill){return S('rect',{x:x,y:y,width:w,height:h,rx:7,fill:fill||pale,stroke:'#b8d3e3','stroke-width':1.5});}
 function path(d,fill,color,dash){return S('path',{d:d,fill:fill||'none',stroke:color||blue,'stroke-width':3,'stroke-linejoin':'round','stroke-dasharray':dash||null});}
 function point(cx,cy,r,a){return [cx+r*Math.cos(a*Math.PI/180),cy-r*Math.sin(a*Math.PI/180)];}
 var socialMapSerial=0;
 function render(d){
  if(!d)return null;
  var fig=U.el('figure',{class:'lesson-figure figure-'+d.kind});
  if(d.kind==='story'){
   var scenic=d.item==='じゃがいも';
   var storyNodes=[];
   if(!d.noArt)storyNodes.push(U.el('img',{attrs:{src:scenic?'img/learning-warehouse.png':'img/lesson-'+d.art+'.jpg',alt:'雪原の町の'+d.item+'の場面'}}));
   storyNodes.push(U.el('div',{class:'story-note',style:d.noArt?{padding:'20px',width:'100%'}:{}},[U.el('span',{class:'eyebrow',text:'町のおしごと'}),U.el('strong',{text:d.item}),U.el('div',{class:'story-quantities'},[U.el('span',{style:d.noArt?{whiteSpace:'nowrap'}:{},text:d.total}),U.el('span',{style:d.noArt?{whiteSpace:'nowrap'}:{},text:d.each})])]));
   fig.appendChild(U.el('div',{class:'story-visual'+(scenic?' scenic':''),style:d.noArt?{minHeight:'0'}:{}},storyNodes));
  }else if(d.kind==='table'){
   fig.appendChild(U.el('div',{class:'diagram-table-wrap'},U.el('table',{class:'diagram-table'},[
    U.el('thead',{},U.el('tr',{},d.head.map(function(t){return U.el('th',{attrs:{scope:'col'},text:t});}))),
    U.el('tbody',{},d.rows.map(function(row){return U.el('tr',{},row.map(function(t,i){return U.el(i===0?'th':'td',{attrs:i===0?{scope:'row'}:{},text:t});}));}))
   ])));
  }else if(d.kind==='image'){
   // 生成した絵（PNG・JPEG・WebP）。img/ に置き、src は 'img/…' の相対パス。文字は絵に入れない（判断254）
   fig.appendChild(U.el('img',{class:'figure-picture',attrs:{src:d.src,alt:d.alt||d.caption||'問題を考えるための絵',width:960,height:640,decoding:'async'}}));
  }else{
   var nodes=[],h=245;
   function add(){Array.prototype.forEach.call(arguments,function(n){nodes.push(n);});}
   function clearText(x,y,t,size,anchor){var label=text(x,y,t,size,anchor);label.setAttribute('stroke','#fff');label.setAttribute('stroke-width','8');label.setAttribute('stroke-linejoin','round');label.setAttribute('paint-order','stroke');return label;}
   function circle(x,y,r,fill){return S('circle',{cx:x,cy:y,r:r,fill:fill||pale,stroke:blue,'stroke-width':2});}
   function icon(x,y,item,color){
    if(item==='person')add(circle(x,y-9,7,color),path('M'+(x-11)+','+(y+17)+' v-12 q11,-10 22,0 v12',color||pale));
    else if(item==='chair')add(path('M'+(x-9)+','+(y-14)+' h18 v14 h-18 Z M'+(x-11)+','+(y+4)+' h22 M'+(x-9)+','+(y+4)+' v13 M'+(x+9)+','+(y+4)+' v13'));
    else if(item==='wood')add(S('rect',{x:x-15,y:y-6,width:30,height:12,rx:6,fill:pale,stroke:blue,'stroke-width':2}),line(x-9,y,x+9,y));
    else if(item==='flower'){add(line(x,y,x,y+17),circle(x,y-6,8,orange),path('M'+x+','+(y+8)+' q-12,-9 -13,-2 q3,7 13,2',pale));}
    else if(item==='bread')add(S('rect',{x:x-14,y:y-12,width:28,height:24,rx:9,fill:pale,stroke:blue,'stroke-width':2}),line(x-4,y-6,x-7,y+4),line(x+5,y-6,x+2,y+4));
    else add(circle(x,y,9,orange),path('M'+(x-9)+','+y+' l-7,-7 v14 Z M'+(x+9)+','+y+' l7,-7 v14 Z',pale));
   }
   if(['japanMap','earthScene','terrain','facility','disaster','culture','industry'].indexOf(d.kind)>=0){
    // 社会の共通線画。地名・施設名・答えの語、結果の矢印は表示しない。
    h=400;
    function poly(ps,fill,color){return S('polygon',{points:ps.map(function(p){return p.join(',');}).join(' '),fill:fill||pale,stroke:color||blue,'stroke-width':3,'stroke-linejoin':'round'});}
    function group(x,y,scale,draw){var saved=nodes;nodes=[];draw();var children=nodes;nodes=saved;add(S('g',{transform:'translate('+x+','+y+') scale('+(scale||1)+')'},children));}
    function ground(y){add(line(30,y,490,y,ink));}
    function sea(y){add(box(30,y,460,370-y,pale));for(var i=0;i<5;i++)add(path('M'+(45+i*90)+','+(y+30)+' q15,-8 30,0 t30,0'));}
    function house(x,y,scale){group(x,y,scale,function(){add(box(0,0,70,65,'#fff'),poly([[-9,0],[35,-30],[79,0]],pale),box(12,17,17,18,'#fff'),box(43,27,16,38,'#fff'));});}
    function mountain(){add(poly([[30,260],[125,110],[210,195],[310,85],[490,260]],pale));}
    function person(x,y,scale){group(x,y,scale,function(){add(circle(0,-40,12,'#fff'),path('M-18,-18 Q0,-32 18,-18 L11,22 H-11 Z',pale),line(-8,22,-14,52,ink),line(8,22,14,52,ink),line(-15,-14,-33,8,ink),line(15,-14,33,8,ink));});}
    function tree(x,y,fruit){add(line(x,y+15,x,y+63,ink),circle(x,y,26,pale));if(fruit)[[-12,-7],[12,-5],[0,12]].forEach(function(p){add(circle(x+p[0],y+p[1],6,orange));});}
    function sun(x,y){add(circle(x,y,23,orange));for(var a=0;a<360;a+=45){var p=point(x,y,31,a),q=point(x,y,40,a);add(line(p[0],p[1],q[0],q[1],orange));}}
    function steam(x,y){add(path('M'+x+','+y+' q-13,-18 0,-36 t0,-36',null,ink));}
    function pipe(ps){add(path(ps,null,ink));}
    function tank(x,y,w,hh){add(box(x,y,w,hh,'#fff'),S('rect',{x:x+3,y:y+hh*.48,width:w-6,height:hh*.48,fill:pale}),line(x+3,y+hh*.48,x+w-3,y+hh*.48));}
    function turbine(x,y){add(circle(x,y,28,'#fff'),circle(x,y,7,ink));for(var a=0;a<360;a+=60){var p=point(x,y,22,a),q=point(x,y,10,a+35);add(line(p[0],p[1],q[0],q[1]));}}
    function generator(x,y){add(box(x,y,70,57,'#fff'),line(x+12,y+12,x+58,y+12),line(x+12,y+24,x+58,y+24),line(x+12,y+36,x+58,y+36));}
    function pylon(x,y,scale){group(x,y,scale,function(){add(path('M-35,0 L0,-155 L35,0 Z M-27,-30 H27 M-20,-65 H20 M-12,-100 H12 M-25,-30 L20,-65 M25,-30 L-20,-65 M-20,-65 L12,-100 M20,-65 L-12,-100'),line(-42,-105,42,-105),line(-30,-135,30,-135));});}
    function bottle(x,y,fill){add(path('M'+(x-6)+','+y+' h12 v15 l10,12 v47 h-32 v-47 l10,-12 Z',fill));}
    if(d.kind==='japanMap'){
     h=d.regionBoundaries?570:d.port?540:430;
     // 公開の物理海岸線データを静的に同梱。地域を切り出す端は海岸線にしない。
     var coasts=FF.japanMapData.coasts;
     var mapHeight=d.regionBoundaries?570:430,b=d.bounds,sy=(mapHeight-90)/(b[3]-b[1]),sx=440/((b[2]-b[0])*.79),scale=Math.min(sx,sy);
     function project(p){return [260+(p[0]-(b[0]+b[2])/2)*.79*scale,mapHeight/2-(p[1]-(b[1]+b[3])/2)*scale];}
     function clip(ps){
      [[0,b[0],1],[0,b[2],-1],[1,b[1],1],[1,b[3],-1]].forEach(function(edge){var out=[];ps.forEach(function(q,i){var p=ps[(i+ps.length-1)%ps.length],ip=(p[edge[0]]-edge[1])*edge[2]>=0,iq=(q[edge[0]]-edge[1])*edge[2]>=0;if(ip!==iq){var t=(edge[1]-p[edge[0]])/(q[edge[0]]-p[edge[0]]);out.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}if(iq)out.push(q);});ps=out;});return ps;
     }
     function coastSegment(p,q){var lo=0,hi=1,dx=q[0]-p[0],dy=q[1]-p[1];
      var checks=[[-dx,p[0]-b[0]],[dx,b[2]-p[0]],[-dy,p[1]-b[1]],[dy,b[3]-p[1]]];
      for(var i=0;i<checks.length;i++){var a=checks[i][0],c=checks[i][1];if(a===0){if(c<0)return null;}else{var t=c/a;if(a<0)lo=Math.max(lo,t);else hi=Math.min(hi,t);if(lo>hi)return null;}}
      return [project([p[0]+lo*dx,p[1]+lo*dy]),project([p[0]+hi*dx,p[1]+hi*dy])];
     }
     var landId='social-map-land-'+(++socialMapSerial),landCuts=[];
     coasts.forEach(function(ps,index){var cut=clip(ps);if(cut.length>=3){var land=poly(cut.map(project),d.regionBoundaries||b[2]-b[0]>20?'#fff':'none');land.setAttribute('stroke','none');land.setAttribute('data-part','land');add(land);landCuts.push(poly(cut.map(project),'#fff'));}var segments=[];ps.forEach(function(p,i){var seg=coastSegment(p,ps[(i+1)%ps.length]);if(seg)segments.push('M'+seg[0].join(',')+'L'+seg[1].join(','));});if(segments.length){var coast=path(segments.join(' '));coast.setAttribute('stroke-width','1.5');coast.setAttribute('data-part','coast');coast.setAttribute('data-coast-index',index);add(coast);}});
     add(S('defs',{},S('clipPath',{id:landId},landCuts)));
     if(d.marineAreas){
      // 海域の色は陸を塗らない。行政上の境界や距離は示さない模式的な範囲。
      var seaId=landId+'-sea',seaCuts=coasts.map(function(ps){var cut=clip(ps),shape=poly(cut.map(project),'#000');shape.setAttribute('stroke','none');return shape;});
      add(S('defs',{},S('mask',{id:seaId,maskUnits:'userSpaceOnUse',x:0,y:0,width:520,height:mapHeight},[S('rect',{x:0,y:0,width:520,height:mapHeight,fill:'#fff'})].concat(seaCuts))));
      d.marineAreas.forEach(function(ps){var area=poly(clip(ps).map(project),orange);area.setAttribute('fill-opacity','.4');area.setAttribute('stroke-width','1.5');area.setAttribute('mask','url(#'+seaId+')');area.setAttribute('data-part','marine-area');add(area);});
     }
     d.areas.forEach(function(ps){var area=poly(clip(ps).map(project),orange);area.setAttribute('fill-opacity','.3');area.setAttribute('stroke-width','1.5');area.setAttribute('clip-path','url(#'+landId+')');area.setAttribute('data-part','area');add(area);});
     if(d.regionBoundaries)FF.japanMapData.regionBoundaries.forEach(function(ps){var segments=[];for(var i=1;i<ps.length;i++){var seg=coastSegment(ps[i-1],ps[i]);if(seg)segments.push('M'+seg[0].join(',')+'L'+seg[1].join(','));}if(segments.length){var border=path(segments.join(' '),null,ink);border.setAttribute('stroke-width','1.2');border.setAttribute('clip-path','url(#'+landId+')');border.setAttribute('data-part','region-boundary');add(border);}});
     (d.lakes||[FF.japanMapData.lake]).forEach(function(ps){var cut=clip(ps);if(cut.length>=3){var lake=poly(cut.map(project),pale);lake.setAttribute('stroke-width','1.5');lake.setAttribute('data-part','lake');add(lake);}});
     d.routes.forEach(function(r){var ps=r.points.map(project),route=path(ps.map(function(p,i){return(i?'L':'M')+p.join(',');}).join(' '),null,r.type==='ridge'?ink:blue);route.setAttribute('stroke-width',r.type==='river'?(d.insetOnly?'12':'5'):'3');route.setAttribute('data-part',r.type);add(route);});
     if(d.meridian!==undefined){var a=project([d.meridian,b[1]]),z=project([d.meridian,b[3]]),meridian=line(a[0],a[1],z[0],z[1],orange,'8 7');meridian.setAttribute('data-part','meridian');add(meridian);}
     (d.currents||[]).forEach(function(c){
      var ps=c.points.map(project),tint=c.tone==='warm'?'var(--bad)':blue,route=path(ps.map(function(p,i){return(i?'L':'M')+p.join(',');}).join(' '),null,tint);route.setAttribute('stroke-width','9');route.setAttribute('data-part','current');route.setAttribute('data-tone',c.tone);add(route);
      var tip=ps[ps.length-1],prev=ps[ps.length-2],dx=tip[0]-prev[0],dy=tip[1]-prev[1],ll=Math.sqrt(dx*dx+dy*dy),ux=dx/ll,uy=dy/ll;
      var arrow=poly([tip,[tip[0]-18*ux+9*uy,tip[1]-18*uy-9*ux],[tip[0]-18*ux-9*uy,tip[1]-18*uy+9*ux]],tint,tint);arrow.setAttribute('data-part','current-arrow');arrow.setAttribute('data-tone',c.tone);add(arrow);
     });
     d.marks.forEach(function(p){var q=project(p);add(circle(q[0],q[1],7,orange));});
     if(d.mountain){var p=project(d.mountain),peak=poly([[p[0]-12,p[1]+9],[p[0],p[1]-12],[p[0]+12,p[1]+9]],orange);peak.setAttribute('data-part','mountain');add(peak);}
     if(!d.insetOnly)add(text(475,52,'北',32),line(475,65,475,91,ink));
     if(d.inset){
      var frame=d.inset.frame,inset=render({kind:'japanMap',bounds:d.inset.bounds,marks:[],areas:[],routes:d.inset.routes||[],lakes:d.inset.lakes,insetOnly:true,study:true}).querySelector('svg'),insetScale=Math.min(frame[2]/520,frame[3]/430);
      var insetGroup=S('g',{transform:'translate('+(frame[0]+(frame[2]-520*insetScale)/2)+','+(frame[1]+(frame[3]-430*insetScale)/2)+') scale('+insetScale+')','data-part':d.inset.routes?'route-inset':'island-inset'},Array.prototype.slice.call(inset.childNodes));
      add(box(frame[0],frame[1],frame[2],frame[3],'#fff'),insetGroup);
     }
     if(d.port){group(0,440,1,function(){add(line(35,60,485,60),box(35,63,450,25,pale),path('M220,63 h165 l-24,22 H245 Z','#fff'),box(280,44,55,19,'#fff'),line(92,5,92,60),line(92,5,180,25),line(180,25,180,47));});nodes[nodes.length-1].setAttribute('data-part','port');}
    }else if(d.kind==='earthScene'){
     // 緯線・経線・海域・海底は同じ名前のない模式図として共有する。
     if(d.scene==='equator'||d.scene==='latitude'||d.scene==='longitude'){
      add(circle(260,200,150,'#fff'));
      if(d.scene==='equator'){var equator=line(110,200,410,200,orange);equator.setAttribute('stroke-width','7');add(equator);}
      if(d.scene==='latitude'){var globeId='social-globe-'+(++socialMapSerial);add(S('defs',{},S('clipPath',{id:globeId},circle(260,200,150,'#fff'))));[-100,-50,0,50,100].forEach(function(y){var rr=Math.sqrt(150*150-y*y);add(S('ellipse',{cx:260,cy:200+y,rx:rr,ry:12,fill:'none',stroke:blue,'stroke-width':3,'clip-path':'url(#'+globeId+')'}));});}
      if(d.scene==='longitude'){[45,90,125].forEach(function(rx){add(S('ellipse',{cx:260,cy:200,rx:rx,ry:150,fill:'none',stroke:blue,'stroke-width':3}));});add(line(260,50,260,350));}
     }else if(d.scene==='seaZones'){
      add(path('M40,60 H140 Q170,110 140,155 Q110,210 145,255 Q170,300 140,340 H40 Z',pale));
      var near=path('M140,60 H215 Q245,110 215,155 Q185,210 220,255 Q245,300 215,340 H140 Q170,300 145,255 Q110,210 140,155 Q170,110 140,60 Z',d.focus==='near'?orange:blue),outer=path('M215,60 H480 V340 H215 Q245,300 220,255 Q185,210 215,155 Q245,110 215,60 Z',d.focus==='outer'?orange:blue);
      near.setAttribute('fill-opacity','.35');outer.setAttribute('fill-opacity','.22');add(near,outer,path('M140,60 Q170,110 140,155 Q110,210 145,255 Q170,300 140,340','none',ink));
      near.setAttribute('data-part','near-band');outer.setAttribute('data-part','outer-band');
     }else if(d.scene==='shelf'){
      add(path('M150,130 H490 V340 H420 L365,195 L150,145 Z',pale),path('M30,100 H120 L150,145 L365,195 L420,340 H490 V370 H30 Z','#fff'));
      var shelf=path('M150,145 L365,195 L373,215 L150,165 Z',orange);shelf.setAttribute('data-part','shallow-floor');add(shelf,line(150,130,490,130));
     }
    }else if(d.kind==='terrain'){
     if(d.scene==='basin'){add(poly([[30,315],[30,150],[105,70],[175,235],[345,235],[420,70],[490,150],[490,315]],pale),line(175,235,345,235,ink));house(235,212,.35);}
     else if(d.scene==='levees'){add(poly([[35,310],[35,230],[125,230],[150,145],[180,145],[210,280],[310,280],[340,145],[370,145],[395,230],[485,230],[485,310]],pale),box(216,230,88,46,pale));}
     else if(d.scene==='lakeTunnel'){add(poly([[30,320],[30,180],[160,180],[265,70],[390,245],[490,245],[490,320]],pale),box(35,153,115,25,pale),path('M150,170 H280 V245 H425',null,blue,'9 7'),box(392,247,95,28,'#fff'));for(var k=0;k<4;k++)add(line(400+k*23,250,400+k*23,272));}
     else{
      var peak=poly([[35,172],[135,55],[235,172]],pale);peak.setAttribute('data-part','mountain');add(peak);
      if(d.scene==='riverMouth'){add(path('M35,172 H300 L430,330 M300,172 H490 M430,330 H490'),path('M135,145 Q180,190 220,220 Q260,260 390,280',null,blue),circle(390,280,12,orange));}
      if(d.scene==='fan'){add(poly([[30,340],[260,155],[490,340]],pale),path('M165,120 L260,155 Q215,250 120,315'),path('M260,155 Q285,235 340,315'),path('M260,155 Q260,235 260,330'));for(var i=0;i<5;i++)add(circle(175+i*40,280+Math.abs(i-2)*15,3,orange));}
      if(d.scene==='delta'){sea(280);add(poly([[150,310],[260,175],[385,310]],'#fff'),path('M165,125 L260,175 L215,310'),path('M260,175 L325,310'));for(var j=0;j<5;j++)add(circle(220+j*20,285,3,orange));}
     }
    }else if(d.kind==='facility'){
     var scene=d.scene;
     if(scene==='sewer'){house(60,142,1.5);add(box(82,149,48,30,'#fff'),path('M82,145 V135 H106 V150'),box(146,168,27,35,'#fff'),path('M144,165 q30,-8 35,0 v22 h-35 Z','#fff'));ground(240);pipe('M106,180 V295 H435 M161,203 V295');add(line(350,265,400,265),line(375,265,375,295));}
     else if(scene==='sewagePlant'){pipe('M35,280 H145 V225 H190 M80,280 V230 H40');tank(190,180,105,105);tank(320,180,105,105);pipe('M295,232 H320');add(box(180,100,120,55,'#fff'));ground(320);}
     else if(scene==='reservoir'||scene==='supply'||scene==='hillSupply'){
      if(scene==='hillSupply')add(poly([[30,330],[30,170],[180,170],[285,300],[490,300],[490,330]],pale));
      else ground(330);
      if(scene==='hillSupply'){tank(50,90,110,65);add(line(62,155,62,168),line(148,155,148,168));pipe('M160,120 H350 V315 H427 V290');}
      else{tank(50,205,110,70);tank(212,65,115,75);add(line(226,140,226,220),line(314,140,314,220),line(226,190,314,150));pipe('M160,238 H190 V103 H212');}
      if(scene!=='reservoir'){house(400,scene==='hillSupply'?251:281,.75);if(scene!=='hillSupply')pipe('M327,105 H350 V315 H427 V290');}
     }else if(scene==='settling'||scene==='filter'){
      tank(85,80,350,225);
      if(scene==='settling'){for(var i=0;i<9;i++)add(circle(110+i*37,290-i%2*6,5,orange));for(var j=0;j<4;j++)add(circle(125+j*90,160+j%2*30,3,ink));}
      else{add(box(88,211,344,42,orange),box(88,253,344,49,pale));for(var k=0;k<12;k++)add(circle(105+k*28,233,2,ink));for(var l=0;l<9;l++)add(circle(113+l*36,279,6,'#fff'));}
     }else if(scene==='hydro'){
      add(poly([[30,300],[30,150],[190,150],[190,85],[220,85],[250,300]],pale),box(35,111,151,36,pale));pipe('M200,140 V255 H310');turbine(337,255);add(line(365,255,397,255,ink));generator(397,226);ground(322);
     }else if(scene==='landfill'){add(box(50,90,420,240,pale));for(var row=0;row<4;row++){var y=105+row*53;add(box(54,y+28,412,20,orange));for(var col=0;col<9;col++)add(poly([[70+col*44,y+7],[87+col*44,y],[95+col*44,y+21],[74+col*44,y+23]],'#fff'));}ground(90);}
     else if(scene==='truck'){add(box(70,140,270,115,'#fff'),path('M340,155 h65 l45,48 v52 H340 Z',pale),box(352,169,44,30,'#fff'),path('M70,153 H45 L30,225 H70',pale),circle(125,262,27,ink),circle(387,262,27,ink),circle(125,262,12,'#fff'),circle(387,262,12,'#fff'));ground(292);}
     else if(scene==='incinerator'||scene==='gasFilter'){
      add(box(40,200,80,105,pale),path('M48,219 l15,17 15,-18 17,20 18,-10'),box(155,190,85,115,'#fff'),box(182,242,29,35,orange),box(420,75,40,230,'#fff'));pipe(scene==='gasFilter'?'M120,235 H155 M240,220 H420':'M120,235 H155 M240,220 V165 H420');
      if(scene==='gasFilter'){add(box(285,182,77,78,'#fff'));for(var i=0;i<4;i++)add(line(299+i*16,193,299+i*16,248,ink));}
      else generator(285,249);
      ground(325);
     }else if(scene==='compost'){add(path('M140,105 H380 L360,315 H160 Z',pale),line(125,95,395,95,ink),box(225,78,70,17,'#fff'),path('M160,220 Q260,196 365,220 L355,302 H166 Z',orange));[[190,173],[250,165],[310,180]].forEach(function(p){add(path('M'+p[0]+','+p[1]+' q-22,-40 15,-27 q18,15 -15,27 Z','#fff'),line(p[0],p[1],p[0]+8,p[1]-18));});}
     else if(scene==='bottles'){['#fff','#8b6549',pale].forEach(function(color,i){var x=40+i*160;add(box(x,224,120,91,'#fff'));bottle(x+35,145,color);bottle(x+82,145,color);});}
     else if(scene==='wind'){sea(300);[140,370].forEach(function(x){add(line(x,140,x,307,ink),circle(x,140,10,'#fff'));for(var a=90;a<450;a+=120){var p=point(x,140,100,a),q=point(x,140,22,a+20);add(poly([[x,140],q,p],'#fff'));}});}
     else if(scene==='solar'){house(85,200,2);add(poly([[99,182],[155,138],[278,186],[224,198]],blue));for(var i=0;i<3;i++)add(line(125+i*35,163+i*7,145+i*35,196, '#fff'));sun(413,90);ground(338);}
     else if(scene==='pylons'||scene==='substation'){
      // 鉄塔だけを描き、鉄塔と紛らわしい山の輪郭は置かない。
      pylon(105,315,1);pylon(412,315,1);[180,210].forEach(function(y){add(path('M63,'+y+' Q260,'+(y+75)+' 454,'+y,null,ink));});
      if(scene==='substation'){add(box(207,237,103,74,'#fff'));for(var i=0;i<4;i++){add(box(220+i*22,202,10,35,'#fff'),line(215+i*22,219,235+i*22,219));}}
      ground(330);
     }else if(scene==='geothermal'||scene==='thermal'){
      if(scene==='geothermal'){ground(220);add(box(40,223,440,127,pale));pipe('M160,310 V155 H250');for(var i=0;i<3;i++)steam(90+i*110,340);}
      else{add(box(55,130,145,155,'#fff'),box(95,229,60,41,orange));pipe('M200,156 H250');ground(320);}
      turbine(278,156);add(line(306,156,356,156,ink));generator(356,127);
     }else if(scene==='aqueduct'){
      add(poly([[30,320],[30,230],[125,230],[160,345],[360,345],[395,230],[490,230],[490,370],[30,370]],pale),path('M100,210 H420 V265 H365 V250 Q335,208 305,250 V265 H270 V250 Q240,208 210,250 V265 H175 V250 Q145,208 115,250 V265 H100 Z','#fff'),line(100,198,420,198),path('M205,356 Q260,345 315,356'));for(var i=0;i<15;i++)add(line(110+i*20,211,110+i*20,227,ink));
     }else if(scene==='sluice'){
      add(path('M50,80 Q180,180 60,340'),path('M160,80 Q280,180 170,340'),path('M195,210 H390'),path('M190,250 H390'),box(235,192,25,76,'#fff'),line(247,130,247,194,ink),line(215,130,279,130,ink),box(390,180,90,120,pale));for(var i=0;i<3;i++)add(line(412+i*23,190,412+i*23,290));
     }
    }else if(d.kind==='disaster'){
     var scene=d.scene;
     if(scene==='flood'){house(50,160,.9);house(340,180,1);add(path('M200,45 Q285,165 190,355'),path('M290,45 Q375,165 280,355'));add(S('rect',{x:32,y:215,width:455,height:135,fill:blue,'fill-opacity':.22}));for(var i=0;i<5;i++)add(path('M'+(40+i*88)+',250 q20,-10 40,0')); }
     else if(scene==='landslide'){add(poly([[30,330],[30,210],[180,65],[320,305],[490,305],[490,330]],pale));house(380,240,.9);add(poly([[208,160],[286,255],[265,279],[232,249]],orange));[[290,287],[320,298],[265,264]].forEach(function(p){add(poly([[p[0]-8,p[1]],[p[0],p[1]-8],[p[0]+10,p[1]+7]],orange));});}
     else if(scene==='storm'){
      add(path('M315,72 l-16,35 25,20 -20,28 -24,-6 -16,37 -40,10 -12,34 -46,22 -33,-14 13,-28 48,-12 12,-33 41,-9 14,-36 7,-21 Z',pale),poly([[315,56],[350,35],[386,70],[364,98],[324,90]],pale));
      group(65,240,.55,function(){for(var r=0;r<3;r++)add(S('ellipse',{cx:174,cy:120,rx:68+r*35,ry:44+r*24,fill:'none',stroke:blue,'stroke-width':3}));add(path('M188,122 q-37,-45 -65,-7 q-20,55 53,66 q88,-3 78,-85 q-17,-91 -120,-60',null,ink));});nodes[nodes.length-1].setAttribute('data-part','storm');
     }else if(scene==='ash'){add(poly([[50,340],[232,150],[285,150],[470,340]],pale),path('M230,150 Q204,117 224,86 Q180,68 208,39 Q240,13 272,42 Q326,15 345,55 Q390,60 369,98 Q353,127 291,127 L285,150',pale));for(var i=0;i<12;i++)add(circle(65+i*34,144+i%3*38,3,ink));}
     else if(scene==='bag'){add(path('M145,135 Q155,80 260,80 Q365,80 375,135 L395,315 H125 Z',pale),path('M197,90 V60 Q260,18 323,60 V90'),box(169,194,182,97,'#fff'),line(167,166,353,166,ink),line(196,203,326,203));}
     else if(scene==='seaWall'){sea(200);add(poly([[290,350],[290,150],[315,150],[345,285],[490,285],[490,350]],'#fff'));house(389,223,.75);add(path('M60,235 q35,-22 70,0 t70,0'));}
     else if(scene==='sabo'){mountain();add(poly([[225,195],[292,195],[350,355],[178,355]],'#fff'),poly([[215,249],[303,249],[308,271],[208,271]],pale),poly([[197,298],[325,298],[330,323],[190,323]],pale));[[240,225],[264,235],[280,219]].forEach(function(p){add(circle(p[0],p[1],8,orange));});}
     else if(scene==='hydrant'){ground(310);add(box(100,158,57,145,orange),circle(129,157,28,orange),box(78,190,28,29,'#fff'),box(157,190,26,29,'#fff'),path('M181,206 Q230,211 219,286 Q210,352 323,340 Q447,334 430,269 Q415,225 380,254',null,ink),line(380,254,353,266,ink),box(115,127,28,15,'#fff'));}
    }else if(d.kind==='culture'){
     var scene=d.scene;
     if(scene==='lacquer'){var tint=d.tint||orange;add(S('ellipse',{cx:260,cy:123,rx:148,ry:32,fill:tint,stroke:ink,'stroke-width':3}),path('M112,123 Q126,278 260,278 Q394,278 408,123',tint,ink),S('ellipse',{cx:260,cy:123,rx:130,ry:20,fill:ink,stroke:ink,'stroke-width':3}),box(211,278,98,20,tint));}
     else if(scene==='kettle'){add(path('M137,152 Q112,252 170,278 H335 Q394,255 370,150 Z',ink,ink),path('M155,150 Q133,15 263,30 Q390,35 349,150',null,ink),path('M366,174 l65,-43 -10,44 -55,56 Z',ink,ink),path('M130,152 Q255,115 381,152',ink,ink),box(238,107,39,22,ink));for(var i=0;i<8;i++)add(circle(171+i*22,203,3,pale));}
     else if(scene==='houseFront'){add(box(131,155,258,168,'#fff'),box(239,215,42,108,pale),box(155,193,47,35,pale),box(321,193,47,35,pale));ground(326);}
     else if(scene==='castle'){
      add(poly([[110,347],[140,288],[380,288],[410,347]],pale));
      [[145,238,230,54],[172,174,176,62],[202,111,116,61]].forEach(function(p){add(box(p[0],p[1],p[2],p[3],'#fff'),path('M'+(p[0]-18)+','+p[1]+' Q'+(p[0]+20)+','+(p[1]-2)+' '+(p[0]+p[2]/2)+','+(p[1]-30)+' Q'+(p[0]+p[2]-20)+','+(p[1]-2)+' '+(p[0]+p[2]+18)+','+p[1]+' Z',ink,ink));for(var i=0;i<3;i++)add(box(p[0]+20+i*(p[2]-45)/3,p[1]+13,12,21,pale));});ground(350);
     }else if(scene==='lanternPole'){
      add(path('M260,322 Q274,182 258,34',null,ink));
      for(var row=0;row<5;row++){var yy=55+row*40,half=25+row*25;add(line(260-half,yy,260+half,yy,ink));for(var x=260-half;x<=260+half;x+=50){add(line(x,yy,x,yy+9,ink),box(x-16,yy+10,32,27,orange),line(x-16,yy+16,x+16,yy+16,ink),line(x-16,yy+31,x+16,yy+31,ink));}}
      person(260,303,.8);add(line(245,292,260,274,ink));ground(352);
     }else if(scene==='poleFloat'){add(box(155,189,201,77,'#fff'),poly([[125,189],[255,128],[386,189]],pale),box(164,266,185,20,orange),circle(189,303,23,ink),circle(325,303,23,ink),line(255,129,255,26,ink),circle(255,40,8,orange));person(89,280,.85);person(430,280,.85);add(line(90,260,155,278,ink));ground(347);}
     else if(scene==='dollFloat'){
      add(box(139,270,243,33,pale),circle(179,319,22,ink),circle(342,319,22,ink),poly([[148,262],[177,194],[235,166],[307,172],[370,254]],orange),circle(265,121,40,orange),path('M228,111 l8,-46 29,24 28,-24 10,46',ink,ink),path('M232,157 L215,229 L265,208 L318,233 L299,159',pale),line(218,171,166,146,ink),line(303,172,355,125,ink),line(340,157,379,88,ink),path('M250,112 h9 M278,112 h9 M260,139 q12,8 23,0',null,ink));person(65,295,.7);person(450,295,.7);add(line(70,280,139,284,ink));ground(355);
     }
    }else if(d.kind==='industry'){
     var scene=d.scene;
     if(scene==='coastOrchard'){sea(290);[90,205,320,435].forEach(function(x){tree(x,200,true);});ground(266);
     }else if(scene==='citrus'){
      sea(290);add(poly([[30,305],[30,300],[135,300],[135,240],[240,240],[240,180],[345,180],[345,120],[490,120],[490,370],[160,370],[120,305]],'#fff'));
      [ [88,241],[190,181],[295,121],[411,61] ].forEach(function(p){tree(p[0],p[1],true);});
     }else if(scene==='dairy'){
      ground(317);for(var i=0;i<9;i++)add(path('M'+(45+i*50)+',315 l-5,-12 m5,12 l6,-10'));
      add(box(135,155,196,92,'#fff'),path('M331,194 L371,236 L403,282 L376,307 L346,276 L330,241 Z','#fff'),path('M368,236 l6,-21 M388,264 l19,-11',null,ink),circle(383,282,4,ink),box(150,241,22,69,'#fff'),box(289,241,22,69,'#fff'),path('M137,170 Q91,196 121,221',null,ink),path('M160,170 q20,-29 46,10 q-4,38 -46,22 Z',ink,ink),path('M266,166 q32,-10 42,13 q1,30 -31,29 Z',ink,ink));house(55,131,.65);add(line(42,176,105,176));
     }else if(scene==='carFactory'){
      add(box(40,277,440,29,pale));for(var i=0;i<12;i++)add(circle(55+i*37,292,7,'#fff'));
      [68,271].forEach(function(x){add(path('M'+x+',237 l30,-40 h80 l31,40 h25 v35 h-190 v-35 Z',pale),circle(x+36,270,16,ink),circle(x+133,270,16,ink),poly([[x+39,232],[x+54,208],[x+92,208],[x+110,232]],'#fff'));});
      add(box(211,110,39,50,'#fff'),path('M230,135 L183,182 L207,223',null,ink),circle(183,182,10,'#fff'),line(198,224,215,224,ink));ground(334);
     }else if(scene==='greenhouse'){
      add(path('M55,305 V170 Q260,-50 465,170 V305 Z',pale),path('M90,305 V178 Q260,7 430,178 V305'),path('M155,305 V178 Q260,57 365,178 V305'),box(221,200,78,105,'#fff'),line(55,170,465,170));for(var i=0;i<5;i++){var x=93+i*84;add(line(x,265,x,307,ink),path('M'+x+',283 q-30,-33 -27,-5 q12,14 27,5 M'+x+',285 q32,-32 28,-5 q-12,14 -28,5','#fff'));}ground(317);
     }else if(scene==='fishCage'){
      sea(95);add(S('ellipse',{cx:260,cy:151,rx:180,ry:41,fill:'none',stroke:ink,'stroke-width':5}),path('M80,151 L120,295 Q260,343 400,295 L440,151',null,ink));for(var i=0;i<8;i++)add(line(105+i*44,175,126+i*38,299));for(var j=0;j<4;j++)add(path('M'+(91+j*8)+','+(190+j*30)+' Q260,'+(240+j*30)+' '+(429-j*8)+','+(190+j*30)));
      [[175,220],[280,258],[353,222]].forEach(function(p){add(S('ellipse',{cx:p[0],cy:p[1],rx:22,ry:10,fill:'#fff',stroke:blue,'stroke-width':2}),poly([[p[0]-21,p[1]],[p[0]-34,p[1]-10],[p[0]-34,p[1]+10]],'#fff'));});
     }else if(scene==='hotBath'){mountain();add(S('ellipse',{cx:265,cy:279,rx:181,ry:66,fill:pale,stroke:ink,'stroke-width':5}));for(var i=0;i<12;i++){var p=point(0,0,1,i*30);add(circle(265+p[0]*177,279+p[1]*63,11,'#fff'));}steam(185,251);steam(265,238);steam(340,254);}
     else if(scene==='basinOrchard'){
      add(poly([[30,310],[30,150],[115,66],[202,190],[340,204],[422,80],[490,150],[490,345],[30,345]],pale),poly([[123,215],[210,190],[359,290],[90,290]],'#fff'));[[150,225],[239,230],[326,254]].forEach(function(p){tree(p[0],p[1],true);});for(var i=0;i<8;i++)add(circle(130+i*38,318+i%2*8,4,ink));ground(354);
     }
    }
   }else if(d.kind==='circuit'||d.kind==='apparatus'||d.kind==='biology'||d.kind==='pendulum'||d.kind==='scienceScene'||d.kind==='anatomy'||d.kind==='moonView'||d.kind==='starMap'||d.kind==='graph'&&d.science){
    // 共通の教材用線画。結果の矢印・動作の前後・解答ラベルは生成しない。
    function ellipse(x,y,rx,ry,fill){return S('ellipse',{cx:x,cy:y,rx:rx,ry:ry,fill:fill||'none',stroke:blue,'stroke-width':3});}
    function panel(draw,i,pitch){var saved=nodes;nodes=[];draw();var children=nodes;nodes=saved;add(S('g',{transform:'translate(0,'+(i*(pitch||330))+')'},children));}
    function water(x,y,w,hh){add(S('rect',{x:x,y:y,width:w,height:hh,fill:blue,'fill-opacity':.3}));}
    function dots(x,y,w,hh,r){for(var yy=y+14;yy<y+hh;yy+=24)for(var xx=x+14;xx<x+w;xx+=24)add(circle(xx,yy,r||2,'#fff'));}
    function flame(x,y){add(path('M'+x+','+y+' q-23,-22 0,-47 q22,25 0,47 Z',orange));}
    function thermometer(x,y,hh,scale){add(box(x-9,y,18,hh,'#fff'),circle(x,y+hh,14,'#fff'),circle(x,y+hh,8,orange));var level=scale?scale.value/scale.max:.45;add(line(x,y+hh,x,y+hh-10-(hh-25)*level,orange));
     if(scale)for(var v=scale.min;v<=scale.max;v++){var ty=y+hh-10-(hh-25)*v/scale.max;add(line(x+11,ty,x+(v%scale.step===0?27:18),ty));if(v%scale.step===0)add(text(x+38,ty+7,v,22,'start'));}
    }
    function beaker(p){var x=150,y=95,w=220,hh=145;water(x+3,160,w-6,hh-65);add(path('M'+x+','+y+' v'+hh+' h'+w+' v-'+hh+' l15,-10'));
     if(p.ice){for(var i=0;i<3;i++)add(box(175+i*55,166,30,24,'#fff'));}
     if(p.boiling){[190,240,295,330].forEach(function(x,i){add(circle(x,205-i%2*28,7,'#fff'));});}
     if(p.heat)flame(p.edgeHeat?170:260,299);
     if(p.therm)thermometer(p.scale?215:260,35,175,p.scale);
     if(p.lid)add(line(130,85,395,85,p.lid==='glass'?blue:ink));
     if(p.solute){if(p.solute.label==='食塩')add(ellipse(437,131,30,8,'#fff'),path('M410,130 Q437,99 464,130 Z','#fff'),line(463,132,498,103));else add(path('M390,135 h110 v100 h-110 Z','#fff'));add(text(445,173,p.solute.label,20));if(p.solute.amount!==undefined)add(text(445,222,p.solute.amount+p.solute.unit,22));}
    }
    if(d.kind==='circuit'){
     h=d.panels.length*330;d.panels.forEach(function(p,i){panel(function(){
      function battery(x,y,w,label,hide){add(box(x,y,w,38,'#fff'));if(!hide){add(S('rect',{x:x+w,y:y+12,width:10,height:14,rx:2,fill:'#fff',stroke:blue,'stroke-width':2,'data-part':'positive-terminal'}),text(x-16,y-12,'－',24),text(x+w+16,y-12,'＋',24));}if(label)add(text(x+w/2,y+75,label,25));}
      if(p.layout==='unknown'){battery(70,100,150,'Ａ');battery(300,100,150,'Ｂ',true);add(line(230,119,300,119),text(290,84,'？',28));return;}
      var parallel=p.layout==='branches',single=p.layout==='single',ys=parallel?[65,135]:[80];
      if(parallel){ys.forEach(function(y,j){battery(180,y,160);add(line(95,y+19,180,y+19),line(350,y+19,425,y+19));if(p.remove===j)add(text(260,y-12,'外す',24));});add(line(95,84,95,154),line(425,84,425,154));}
      else if(single){battery(190,80,140);add(line(95,99,190,99),line(340,99,425,99));}
      else{battery(105,80,125);battery(290,80,125);add(line(95,99,105,99),line(240,99,290,99));if(p.remove!==undefined)add(text(360,62,'外す',24));}
      if(p.device==='none')return;
      var by=parallel?84:99;
      add(path('M95,'+by+' V250 H220'),path('M300,250 H425 V'+(p.gap?150:by)));
      if(p.gap)add(line(425,by,425,125));
      if(p.device==='coil'){
       add(box(226,235,68,30,pale));var maxTurns=Math.max.apply(null,d.panels.map(function(v){return v.turns||1;})),turns=p.turns?Math.round(2+8*p.turns/maxTurns):6,coil='M220,250 L224,270';
       for(var k=0;k<turns;k++){var xx=224+k*72/(turns-1);coil+=' L'+xx+',270 q-10,-42 0,-42 q10,42 0,42';}add(path(coil+' L300,250','none',orange));
       if(p.turns)add(text(260,315,p.turns+'回',25));
       if(p.clipBox){add(box(445,166,57,118,'#fff'));[190,225,260].forEach(function(y){add(path('M457,'+y+' v15 q7,12 14,0 v-15 q-7,-8 -7,0 v15','none',ink));});}
       if(p.compass){add(circle(380,290,25,'#fff'),line(380,290,360,277,orange),line(380,290,400,303),text(346,275,'N',24));}
      }else add(circle(260,250,39,'#fff'));
      if(p.device==='bulb')add(path('M240,230 l40,40 M280,230 l-40,40'));
      if(p.device==='motor')add(text(260,260,'Ｍ',28));
      if(p.device==='meter'){add(path('M236,240 Q260,215 284,240'),line(260,271,p.needle==='right'?280:260,235),text(260,311,'けんりゅう計',24));}
     },i);});
    }else if(d.kind==='apparatus'){
     h=d.panels.some(function(p){return p.scale;})?670:d.panels.length*330+d.panels.reduce(function(m,p){return Math.max(m,(p.notes||[]).length>2?60:0);},0);d.panels.forEach(function(p,i){panel(function(){
      if(p.label)add(text(260,35,p.label,26));
      if(p.tool==='syringe'){
       var end=p.pressed?285:365,left=100,top=95,bottom=180;
       if(p.contents==='water')water(left+2,top+2,end-left-4,bottom-top-4);
       if(p.contents==='mixed'){water(left+2,138,end-left-4,40);dots(left,top,end-left,43);}
       if(p.contents==='air')dots(left,top,end-left,bottom-top);
       if(p.contents==='balloon')add(ellipse(225,139,46,26,pale),path('M269,144 l13,4 l-10,8'));
       add(path('M100,95 H365 V180 H100 Z M100,120 H70 V155 H100'),line(60,116,60,160),line(end,95,end,180,ink),line(end,138,445,138,ink),line(445,103,445,174,ink));
       if(p.hand)add(path('M447,132 q30,-20 38,0 v28 q-12,20 -38,5 M461,130 v23'));
       (p.marks||[]).forEach(function(v,j){var x=(p.marks.length===1?end:left+(end-left)*(j+1)/p.marks.length);add(line(x,181,x,192),text(x,223,v+'mL',24));});
      }else if(p.tool==='airgun'){add(path('M100,105 H425 V175 H100 Z'),line(55,140,145,140),line(55,115,55,165),circle(158,140,23,pale),circle(402,140,23,pale));dots(180,107,195,65);}
      else if(p.tool==='tankCup'){water(90,95,340,160);add(path('M90,60 V255 H430 V60'),path('M185,200 V105 H335 V200','#fff'));dots(190,110,138,80);}
      else if(p.tool==='beaker'){if(p.scale){water(153,450,214,158);add(path('M150,410 V610 H370 V410 l15,-10'));thermometer(215,35,540,p.scale);}else beaker(p);}
      else if(p.tool==='flask'){add(path('M235,70 V120 Q150,150 170,235 Q260,270 350,235 Q370,150 285,120 V70 Z','#fff'));water(198,189,123,46);add(path('M251,30 V155 H269 V30'));flame(260,311);}
      else if(p.tool==='rod'||p.tool==='plate'){add(box(80,125,365,p.tool==='rod'?23:75,'#fff'));flame(115,250);}
      else if(p.tool==='ballRing'){add(circle(180,138,38,pale),line(180,100,180,55),ellipse(365,142,48,17),line(365,159,365,240));flame(180,247);}
      else if(p.tool==='tubeBath'){water(110,165,300,95);add(path('M110,135 V260 H410 V135'),path('M240,70 V220 Q260,245 280,220 V70'),line(235,70,285,70,orange));if(p.bath==='ice')for(var j=0;j<3;j++)add(box(135+j*90,170,35,27,'#fff'));add(text(260,303,p.bath==='ice'?'氷水':'お湯',25));}
      else if(p.tool==='bagBath'){water(120,170,280,90);add(path('M120,135 V260 H400 V135'),path('M250,90 q-75,120 -25,147 q35,20 70,-5 q30,-35 -35,-142 Z','#fff'),path('M240,88 l30,8 M258,96 v-30'));add(text(260,305,'お湯',25));}
      else if(p.tool==='thermometer'){thermometer(170,55,210);if(p.eyes)[85,155,225].forEach(function(y){add(ellipse(355,y,25,12),circle(355,y,5,ink));});}
      else if(p.tool==='seedCup'){
       if(p.location==='fridge')add(box(92,55,336,190,'#fff'),line(92,97,428,97),line(412,112,412,142));
       add(path('M170,105 L188,235 H332 L350,105','#fff'),ellipse(260,218,69,10,'#fff'));
       if(p.wet!=='dry')water(193,p.wet==='submerged'?145:211,134,p.wet==='submerged'?79:13);
       add(ellipse(246,203,21,12,pale),ellipse(285,210,21,12,pale));
      }else if(p.tool==='plantPot'){
       add(path('M175,174 L195,237 H325 L345,174 Z',pale),ellipse(260,174,85,13,'#fff'),line(260,171,260,104),ellipse(235,120,27,11,pale),ellipse(284,105,27,11,pale));
      }else if(p.tool==='microscope'){
       add(path('M195,65 l20,-20 l73,72 l-20,20 Z','#fff'),path('M270,130 l21,-17 l28,38 l-22,17 Z',pale),path('M263,124 Q187,130 200,236 L235,255 H360 V277 H150 V255 H180 Q137,153 222,100','#fff'),line(252,193,357,193),line(295,193,295,228),circle(214,157,16,pale));
       var marks=p.labels||[];[[100,64,207,60],[420,160,310,155],[420,227,327,193]].forEach(function(v,j){if(marks[j])add(text(v[0],v[1],marks[j],26),line(v[0]+(j?-25:25),v[1]-7,v[2],v[3]));});
       if(p.magnifications){add(text(92,73,p.magnifications[0]+'倍',25),line(142,67,207,60),text(426,155,p.magnifications[1]+'倍',25),line(373,148,310,155));}
      }else if(p.tool==='cylinder'){
       water(171,155,58,89);add(path('M169,65 V245 H231 V65'),ellipse(200,155,29,5),box(148,245,104,13,'#fff'));
       for(var k=0;k<8;k++)add(line(170,85+k*20,185+(k%2?0:9),85+k*20));
       (p.eyes||[]).forEach(function(label,j){var yy=85+j*70;add(ellipse(350,yy,25,12),circle(350,yy,5,ink),text(423,yy+8,label,26));});
      }else if(p.tool==='filter'){
       var stem=p.stem==='touch'?340:285;
       add(path('M170,151 V239 H340 V151 l12,-8'),path('M195,79 H'+(stem+57)+' L'+stem+',141 V178 H'+(stem-10)+' V141 Z','#fff'));
       add(path('M210,84 H'+(stem+40)+' L'+(stem-5)+',128 Z','none',p.paperGap?orange:blue));
       if(p.residue)[235,255,275].forEach(function(xx,j){add(circle(xx,104+j%2*9,4,orange));});
       if(p.pour){add(path('M88,65 l20,-18 l69,45 l-20,22 Z','#fff'),line(160,103,225,123));if(p.pour==='rod')add(line(157,85,257,141,ink));}
       else add(line(180,55,262,116,ink));
      }
      (p.notes||[]).forEach(function(t,j){add(text(260,(p.lid==='glass'?50:265)+j*42,t,24));});
     },i);});
    }else if(d.kind==='scienceScene'){
     h=350;
     if(d.scene==='kettle'){add(ellipse(240,220,115,25,pale),path('M125,220 Q125,110 240,110 Q355,110 355,220',pale),path('M155,130 Q115,40 310,95'),path('M342,145 L403,97 L421,119 L351,189',pale));[0,1,2].forEach(function(i){add(ellipse(410+i*18,82-i*17,17,12,'#fff'));});}
     else if(d.scene==='coldCup'){water(185,130,150,145);add(path('M170,80 L190,285 H330 L350,80'),box(213,138,32,28,'#fff'),box(271,151,32,28,'#fff'));[130,175,220].forEach(function(y){add(ellipse(177,y,5,8,pale),ellipse(343,y+5,5,8,pale));});}
     else if(d.scene==='window'){add(box(100,70,320,220,'#fff'),line(260,70,260,290),line(100,180,420,180));[125,170,220,280,330,380].forEach(function(x,i){add(ellipse(x,125+i%2*85,18,25,pale));});}
     else if(d.scene==='room'){add(path('M70,285 V65 H450 V285 Z'),box(100,210,85,65,'#fff'));for(var i=0;i<4;i++)add(line(115+i*16,224,115+i*16,260,orange));}
     else if(d.scene==='branch'){add(path('M120,285 L270,105 L335,55 M210,175 L135,120 M265,110 L380,115 M170,225 L95,220'));[[135,120],[335,55],[380,115],[95,220]].forEach(function(v){add(ellipse(v[0],v[1],9,16,orange));});}
     else if(d.scene==='tree'){d.seasons.forEach(function(label,i){var x=80+i*120;add(path('M'+x+',260 v-90 m0,25 l-30,-45 m30,45 l32,-52'),text(x,305,label,25));if(i!==3){add(ellipse(x,160,42,50,i===2?orange:pale));}else for(var j=0;j<3;j++)add(circle(x-27+j*27,160,4,orange));});}
     else if(d.scene==='thermLocations'){d.places.forEach(function(label,i){panel(function(){if(i===0)add(circle(100,65,28,orange));if(i===1)add(box(80,45,110,110,'#fff'),path('M195,160 H400'));if(i===2)add(path('M90,240 V65 H430 V240'));add(line(80,265,440,265));thermometer(290,i===0?180:110,75);add(text(260,311,label,26));},i);});h=990;}
     else if(d.scene==='height'){add(line(75,275,440,275),circle(120,90,18,pale),path('M120,112 v85 m0,-50 l-35,45 m35,-45 l35,45 m-35,5 l-25,82 m25,-82 l25,82'));d.positions.forEach(function(p,i){var x=285+i*100,y=p.level==='ground'?215:110;thermometer(x,y,55);if(p.label)add(text(x,83,p.label,26));});}
     else if(d.scene==='groundCompare'){[0,1].forEach(function(i){var x=80+i*240;add(line(x,260,x+170,260));thermometer(x+85,170,70);if(!i)add(circle(x+50,65,28,orange));else add(box(x+10,50,120,85,'#fff'));add(text(x+85,308,i?'日かげ':'日なた',25));});}
     else if(d.scene==='terrain'){add(path('M65,110 Q180,150 250,235 Q335,280 455,180 L455,290 H65 Z',pale));}
     else if(d.scene==='school'){add(box(80,70,120,200,'#fff'),text(140,310,'校舎',25),box(240,70,210,200,'#fff'),text(345,310,'運動場',25));if(d.trace)add(path('M320,90 q-32,30 5,65 q27,35 -20,90','none',blue));if(d.directions){add(text(400,45,d.directions[0],25),text(460,305,d.directions[1],25));}}
     else if(d.scene==='soil'){d.materials.forEach(function(t,i){var x=80+i*240;add(box(x,155,150,110,'#fff'));dots(x,170,140,80,t==='すな'?5:2);add(text(x+75,310,t,26));if(d.pour){add(path('M'+(x+35)+',70 h85 v35 h-85 Z'),line(x+78,105,x+78,135,blue));}});}
     else if(d.scene==='particles'){d.materials.forEach(function(t,i){var x=40+i*165;add(box(x,80,140,165,'#fff'));var rr=d.sizes[i];for(var yy=103;yy<235;yy+=rr*3)for(var xx=x+22;xx<x+129;xx+=rr*3)add(circle(xx,yy,rr,pale));add(text(x+70,298,t,25));});}
     else if(d.scene==='slope'){add(path('M70,155 L450,280 H70 Z',pale),path('M75,65 h100 l-42,60 v32 h-16 v-32 Z','#fff'));}
     else if(d.scene==='cloudCover'){
      for(var i=0;i<d.total;i++){var xx=55+i%5*82,yy=70+Math.floor(i/5)*100;add(box(xx,yy,82,100,'#fff'));if(i<d.covered){var cloud=path('M'+(xx+10)+','+(yy+66)+' q-12,-20 10,-28 q3,-23 25,-15 q25,-7 27,16 q17,19 -4,27 Z',pale);cloud.setAttribute('data-part','cloud-cell');add(cloud);}}
     }else if(d.scene==='cloudMap'){
      // 地理用の同じ海岸線を縮小して使い、向きや翌日の予想は付け足さない。
      var map=render({kind:'japanMap',bounds:[128,30,146,46],marks:[],areas:[],routes:[],insetOnly:true,study:true,caption:''});
      var mapSvg=map.querySelector('svg');if(mapSvg)add(S('g',{transform:'translate(145,5) scale(.65)'},Array.prototype.slice.call(mapSvg.childNodes)));
      if(d.westCloud)add(path('M55,190 q-25,-32 12,-48 q-3,-30 32,-29 q25,-29 52,0 q43,-2 43,38 q25,31 -12,42 Z',pale));
      if(d.track){add(S('polyline',{points:d.track.map(function(p){return p.join(',');}).join(' '),fill:'none',stroke:orange,'stroke-width':4,'stroke-dasharray':'8 7'}));[d.track[0],d.track[d.track.length-1]].forEach(function(p,j){add(circle(p[0],p[1],6,orange),text(p[0]+27,p[1]+9,d.trackLabels[j],26));});}
      if(d.eastArrow){var arrow=path('M96,205 H143 m-14,-10 l14,10 l-14,10','none',orange);arrow.setAttribute('data-part','east-arrow');add(arrow);}
     }else if(d.scene==='typhoon'){
      h=660;panel(function(){for(var j=0;j<4;j++)add(ellipse(260,165,55+j*29,45+j*22,pale));add(ellipse(260,165,35,30,'#fff'),text(260,176,d.labels[0],26),text(447,75,d.labels[1],26),line(425,83,355,105));},0);
      panel(function(){add(path('M75,250 Q60,175 98,120 Q104,57 149,85 Q191,40 208,127 L218,250 Z',pale),path('M302,250 L312,127 Q329,40 371,85 Q416,57 422,120 Q460,175 445,250 Z',pale),text(260,210,d.labels[0],26),text(465,67,d.labels[1],26),line(445,78,383,127));},1);
     }else if(d.scene==='riverValley'){
      add(path('M45,85 L140,140 L253,266 L267,266 L380,140 L475,85 V310 H45 Z',pale),path('M231,240 H289 L267,266 H253 Z',blue));
     }else if(d.scene==='riverStones'){
      [0,1].forEach(function(side){var x=side?350:125;add(text(x,310,d.places[side],25));for(var j=0;j<4;j++){var xx=x-43+j%2*77,yy=110+Math.floor(j/2)*95;if(!side)add(path('M'+(xx-30)+','+yy+' l20,-27 l32,7 l15,33 l-37,20 Z',pale));else add(ellipse(xx,yy,19-j*2,13-j,pale));}});
     }else if(d.scene==='riverBend'){
      add(path('M90,65 C450,65 450,275 90,275 L90,215 C335,215 335,125 90,125 Z',pale));
      if(d.labels[0])add(text(475,180,d.labels[0],26),line(455,172,360,170));
      if(d.labels[1])add(text(257,180,d.labels[1],26),line(280,172,273,170));
     }else if(d.scene==='riverStraight'){
      add(S('rect',{x:180,y:60,width:160,height:240,fill:pale}),line(180,60,180,300),line(340,60,340,300),text(260,146,d.labels[0],26),circle(260,162,4,orange),text(192,242,d.labels[1],26),circle(192,258,4,orange));
     }else if(d.scene==='riverWidth'){
      add(path('M220,60 H300 V145 Q300,210 390,280 H130 Q220,210 220,145 Z',pale),text(350,103,d.labels[0],26),line(330,104,260,104),text(443,265,d.labels[1],26),line(420,259,280,259));
     }else if(d.scene==='riverSection'){
      add(path('M60,132 H110 Q135,255 260,255 Q385,255 410,132 H460 V305 H60 Z',pale),path('M115,150 H405 Q378,249 260,249 Q142,249 115,150 Z',blue));
      [140,260,380].forEach(function(xx,j){add(text(xx,113,d.labels[j],26),line(xx,121,xx,159),circle(xx,163,4,orange));});
     }
    }else if(d.kind==='biology'){
     h=360;
     function mark(j,x,y,tx,ty){if(d.labels[j])add(text(x,y,d.labels[j],27),line(x+(x<tx?20:x>tx?-20:0),y-8,tx,ty),circle(tx,ty,4,orange));}
     if(d.part==='seed'){
      add(path('M315,73 Q172,34 136,139 Q93,264 233,294 Q361,317 389,213 Q410,143 346,121 Q297,100 315,73 Z',pale),path('M313,85 Q182,52 148,144 Q110,253 236,282 Q350,301 376,210 Q395,154 339,134 Q289,112 313,85 Z','#fff'),path('M318,173 Q287,160 276,184 Q274,211 309,230 Q286,204 307,197 Q325,190 318,173 Z',orange));
      mark(0,78,83,150,123);mark(1,94,300,204,216);mark(2,448,194,301,185);
     }else if(d.part==='flower'){
      add(path('M243,291 Q132,241 100,79 Q190,93 244,208 L276,208 Q330,93 420,79 Q388,241 277,291 Z',pale),path('M244,283 Q186,274 176,250 Q207,251 239,263 M278,283 Q334,274 344,250 Q313,251 281,263 Z','#fff'),path('M248,282 Q235,255 249,231 L253,140 Q240,123 250,113 Q260,102 270,113 Q280,123 267,140 L271,231 Q285,255 272,282 Z','#fff'),line(260,283,260,329));
      [211,309].forEach(function(xx){add(line(xx,264,xx,174),ellipse(xx,170,12,20,orange));});
      mark(0,85,194,211,170);mark(1,440,d.focus==='base'?283:130,260,d.focus==='base'?255:121);mark(2,77,60,141,139);mark(3,441,312,328,259);
     }else if(d.part==='stamen'){
      add(line(260,155,260,304),ellipse(239,117,25,57,pale),ellipse(281,117,25,57,pale));mark(0,418,106,285,114);
     }else if(d.part==='pregnancy'){
      add(path('M173,41 Q77,58 91,176 Q85,293 207,314 L233,336 H287 L313,314 Q435,293 429,176 Q443,58 347,41 Q326,85 260,86 Q194,85 173,41 Z',pale),path('M176,66 Q105,81 114,179 Q110,279 211,290 Q260,314 309,290 Q410,279 406,179 Q415,81 344,66 Q329,110 260,108 Q191,110 176,66 Z','#fff'));
      var fluid=path('M176,66 Q105,81 114,179 Q110,279 211,290 Q260,314 309,290 Q410,279 406,179 Q415,81 344,66 Q329,110 260,108 Q191,110 176,66 Z',blue);fluid.setAttribute('fill-opacity','.22');add(fluid,ellipse(394,158,14,61,orange));
      add(circle(235,170,25,'#fff'),path('M217,192 Q199,225 237,251 Q279,275 310,243 Q329,219 296,199 Q271,188 265,212 Q281,235 292,225 M237,251 Q229,222 247,223 M296,242 Q268,257 267,233','#fff'),path('M292,211 Q345,249 349,203 Q339,161 381,163','none',orange));
      mark(0,61,72,121,106);mark(1,63,242,163,214);mark(2,460,270,346,216);mark(3,460,98,394,149);
     }
    }else if(d.kind==='pendulum'){
     h=d.panels.length*360;
     var maxLength=Math.max.apply(null,d.panels.map(function(p){return p.length||1;}));
     d.panels.forEach(function(p,i){panel(function(){
      var len=p.length?220*p.length/maxLength:200,cy=65+len,r=p.size||20,angle=(p.angle||30)*Math.PI/180;
      if(p.label)add(text(260,35,p.label,26));
      add(line(175,61,345,61),circle(260,65,5,ink));
      if(p.mode==='lengthCandidates'){
       add(line(260,65,260,cy),circle(260,cy,r,'#fff'));
       [cy,cy-r,cy+r].forEach(function(y,j){var xx=120+j*50;add(line(xx,65,xx,y),line(xx-6,65,xx+6,65),line(xx-6,y,xx+6,y),text(xx,320,p.labels[j],26));});
      }else if(p.mode==='positions'||p.mode==='amplitude'){
       var aa=p.mode==='positions'?Math.PI/5:angle;
       if(p.mode==='positions'){var ex=len*Math.sin(aa),ey=65+len*Math.cos(aa);add(path('M'+(260-ex)+','+ey+' A'+len+','+len+' 0 0 0 '+(260+ex)+','+ey,'none',blue,'7 6'));}
       [-aa,0,aa].forEach(function(a,j){var x=260+len*Math.sin(a),y=65+len*Math.cos(a);var thread=line(260,65,x,y);if(j!==1)thread.setAttribute('stroke-dasharray','7 6');add(thread,circle(x,y,r,j===1?'#fff':pale));if(p.mode==='positions'&&p.labels[j])add(text(x,y+r+36,p.labels[j],26));});
       if(p.mode==='amplitude'){var rx=50*Math.sin(aa),ry=65+50*Math.cos(aa);add(path('M'+(260-rx)+','+ry+' A50,50 0 0 0 '+(260+rx)+','+ry,'none',orange));if(p.labels&&p.labels[0])add(text(340,121,p.labels[0],26),line(319,114,277,110));}
      }else{
       add(line(260,65,260,p.mode==='sliding'?310:cy),circle(260,cy,r,'#fff'));
       if(p.length)add(text(365,65+len/2,p.length+p.unit,26,'start'),line(330,65,330,cy),line(324,65,336,65),line(324,cy,336,cy));
      }
     },i,360);});
    }else if(d.kind==='anatomy'){
     h=360;
     if(d.part==='skull'){
      add(path('M150,245 Q105,215 125,135 Q140,65 225,60 Q305,55 335,110 L345,150 L365,170 L340,178 L335,213 H290 L275,245 L290,270 L340,260 V233 H355 V273 Q320,305 265,297 L235,263 Z','#fff'));
      var socket=ellipse(306,151,23,28);socket.setAttribute('data-part','eye-socket');add(socket);
      var teeth=path('M289,213 H335 M295,213 v13 m10,-13 v13 m10,-13 v13 m10,-13 v13 M295,226 H335');teeth.setAttribute('data-part','teeth');add(teeth);
     }
     else if(d.part==='ribs'){add(line(260,65,260,285));for(var i=0;i<7;i++){var y=70+i*27,ww=95-i*6;add(path('M250,'+y+' Q'+(260-ww)+','+(y-20)+' '+(260-ww)+','+(y+16)+' Q'+(260-ww)+','+(y+42)+' 250,'+(y+29)),path('M270,'+y+' Q'+(260+ww)+','+(y-20)+' '+(260+ww)+','+(y+16)+' Q'+(260+ww)+','+(y+42)+' 270,'+(y+29)));}}
     else{var bent=d.pose==='bent',joint=[250,210],end=bent?[385,100]:[360,335];
      // 筋肉は骨の両端へつなぎ、内外に1本ずつ。姿勢で太さや形を変えない。
      if(d.muscles){['M145,85 Q257,105 250,210 Q234,125 145,85 Z','M145,85 Q129,195 250,210 Q148,178 145,85 Z'].forEach(function(shape,i){var m=path(shape,pale);m.setAttribute('data-part',i?'outer-muscle':'inner-muscle');add(m);});}
      add(path('M140,85 L245,205 Q250,215 260,205 L152,76 Z','#fff',ink),path('M250,210 L'+end.join(',')+' L'+(end[0]+7)+','+(end[1]+10)+' L261,215 Z','#fff',ink),circle(joint[0],joint[1],13,'#fff'));
      if(d.muscles&&d.labels){add(text(340,60,d.labels[0],25),text(105,270,d.labels[1],25),line(307,74,230,126),line(119,244,168,172));}
     }
    }else if(d.kind==='moonView'){
     h=350;
     function moon(cx,cy,phase){if(phase==='full'||phase==='surface'){add(circle(cx,cy,86,'#fff'));if(phase==='surface')[[0,-30,20],[-35,20,14],[35,34,23],[40,-28,10]].forEach(function(v){add(circle(cx+v[0],cy+v[1],v[2],pale));});}else if(phase==='half'){add(circle(cx,cy,86,blue),path('M'+cx+','+(cy-86)+' A86,86 0 0 1 '+cx+','+(cy+86)+' Z','#fff'));}else if(phase==='crescent'){add(circle(cx,cy,86,blue),path('M'+cx+','+(cy-86)+' A86,86 0 0 1 '+cx+','+(cy+86)+' Q'+(cx+116)+','+cy+' '+cx+','+(cy-86)+' Z','#fff'));}}
     if(d.mode==='shape'){if(d.phase==='invisible')[[130,90],[350,130],[225,240],[415,70]].forEach(function(p){add(circle(p[0],p[1],4,ink));});else moon(260,170,d.phase);}
     else{add(text(260,38,d.sky,25));var dirs=d.directions||[];dirs.forEach(function(t,i){var x=65+i*130;add(line(x-42,285,x+42,285),text(x,323,t,25));if(d.position===t)add(circle(x,145,14,'#fff'));});if(d.position==='unplaced'){if(d.phase==='full'){add(circle(260,155,55,'#fff'),text(260,240,'方位はまだ決めない',24));}else add(circle(260,150,16,'#fff'));}}
    }else if(d.kind==='starMap'){
     h=370;if(d.sky)add(text(260,38,d.sky,25));if(d.horizon)add(line(60,320,460,320));
     if(d.planisphere){add(circle(260,175,130,'#fff'),ellipse(260,205,115,72,pale));for(var j=0;j<24;j++){var p=point(260,175,130,j*15),q=point(260,175,118,j*15);add(line(p[0],p[1],q[0],q[1]));}add(text(260,342,'日付・時刻の目もり',24));}
     d.segments.forEach(function(s){var a=d.points[s[0]],b=d.points[s[1]];add(line(a[0],a[1],b[0],b[1]));});d.points.forEach(function(p,i){var tint=d.tints&&d.tints[i];add(circle(p[0],p[1],7,tint==='warm'?orange:tint==='blue'?blue:ink));if(d.labels[i])add(clearText(p[0],p[1]+35,d.labels[i],25));});
    }else if(d.kind==='graph'&&d.science){
     if(d.blankAxes){h=350;for(var gx=70;gx<=455;gx+=55)add(line(gx,60,gx,280,pale),line(gx,280,gx,287));for(var gy=60;gy<=280;gy+=44)add(line(70,gy,455,gy,pale),line(63,gy,70,gy));add(line(70,280,455,280),line(70,280,70,60),line(70,60,455,60),line(455,60,455,280));}
     else{
     var panels=d.panels||[{values:d.values,labels:d.labels}];h=panels.length*360;panels.forEach(function(p,i){panel(function(){add(line(70,270,455,270),line(70,270,70,65),text(75,37,'気温（℃）',24),text(260,336,'時こく',24));if(p.title)add(text(290,37,p.title,25));
      if(p.values.length){var max=d.panels?5:Math.max.apply(null,p.values)+5,pts=p.values.map(function(v,j){return [90+j*330/(p.values.length-1),250-v/max*180];});add(S('polyline',{points:pts.map(function(v){return v.join(',');}).join(' '),fill:'none',stroke:blue,'stroke-width':3}));pts.forEach(function(v,j){add(circle(v[0],v[1],5,orange));if(!d.panels){add(text(v[0],v[1]-18,p.values[j]+'℃',24),text(v[0],298,p.labels[j],24));}});}
     },i,360);});
     }
    }
   }else if(d.kind==='polygon'&&d.panels){
    var count=d.panels.length,span=520/count,plotWidth=count===1?340:160,plotHeight=170;
    var ext=d.panels.map(function(p){var xs=p.points.map(function(v){return v[0];}),ys=p.points.map(function(v){return v[1];});return {xmin:Math.min.apply(null,xs),xmax:Math.max.apply(null,xs),ymin:Math.min.apply(null,ys),ymax:Math.max.apply(null,ys)};});
    var scale=Math.min.apply(null,ext.map(function(e){return Math.min(plotWidth/(e.xmax-e.xmin),plotHeight/(e.ymax-e.ymin));}));
    h=285+Math.max.apply(null,d.panels.map(function(p){return p.notes.length*42;}))+(d.panels.some(function(p){return p.people;})?55:0);
    d.panels.forEach(function(p,pi){
     var e=ext[pi],cx=span*(pi+.5),cy=140;
     function project(v){return [cx+(v[0]-(e.xmin+e.xmax)/2)*scale,cy-(v[1]-(e.ymin+e.ymax)/2)*scale];}
     var ps=p.points.map(project),center=[cx,cy];
     function polygon(ps,fill){return S('polygon',{points:ps.map(function(v){return v.join(',');}).join(' '),fill:fill,stroke:blue,'stroke-width':3});}
     add(polygon(ps,pale));if(p.title)add(text(cx,42,p.title,26));
     (p.coloredTriangles||[]).forEach(function(ids,i){var node=polygon(ids.map(function(j){return ps[j];}),i?orange:pale);node.setAttribute('fill-opacity','.35');add(node);});
     (p.segments||[]).forEach(function(s){add(line(ps[s[0]][0],ps[s[0]][1],ps[s[1]][0],ps[s[1]][1],orange));});
     if(p.spokes)ps.forEach(function(v){add(line(cx,cy,v[0],v[1]));});
     if(p.circumscribed)add(circle(cx,cy,scale,'none'));
     if(p.radiusMark)add(line(cx,cy,ps[0][0],ps[0][1],orange));
     if(p.midpoints){var mids=ps.map(function(v,i){var q=ps[(i+1)%ps.length];return [(v[0]+q[0])/2,(v[1]+q[1])/2];});add(polygon(mids,'none'));mids.forEach(function(v){add(circle(v[0],v[1],4,orange));});}
     if(p.innerTriangle!==undefined){var r=p.innerTriangle,a=ps[3],b=ps[2],top=[a[0]+r*(b[0]-a[0]),a[1]+r*(b[1]-a[1])];add(polygon([ps[0],ps[1],top],'none'));}
     if(p.cutRectangle){var origin=[e.xmin+(e.xmax-e.xmin-p.cutRectangle[0])*.55,e.ymin+(e.ymax-e.ymin-p.cutRectangle[1])*.55],op=project(origin),cw=p.cutRectangle[0]*scale,ch=p.cutRectangle[1]*scale;add(S('rect',{x:op[0],y:op[1]-ch,width:cw,height:ch,fill:'#fff',stroke:orange,'stroke-width':3}));}
     if(p.seam){var a=project([e.xmin+(e.xmax-e.xmin)*p.seam,e.ymin]),b=project([e.xmin+(e.xmax-e.xmin)*p.seam,e.ymax]);add(line(a[0],a[1],b[0],b[1],orange,'6 6'));}
     (p.heights||[]).forEach(function(v){var a=project(v.slice(0,2)),b=project(v.slice(2));add(line(a[0],a[1],b[0],b[1],orange,'6 6'),path('M'+b[0]+','+(b[1]-14)+' h14 v14','none',orange));});
     (p.parallelSides||[]).forEach(function(ids){var a=ps[ids[0]],b=ps[ids[1]],x=(a[0]+b[0])/2,y=(a[1]+b[1])/2;add(path('M'+(x-6)+','+(y+4)+' l6,-7 l6,7','none',orange));});
     if(p.names)ps.forEach(function(v,i){var dx=v[0]-cx,dy=v[1]-cy,len=Math.hypot(dx,dy)||1;add(clearText(v[0]+dx/len*23,v[1]+dy/len*23+8,p.names[i],24));});
     if(p.angleLabels)ps.forEach(function(v,i){var label=p.angleLabels[i];if(!label)return;var x=v[0]*.70+cx*.30,y=v[1]*.70+cy*.30+8;if(label==='□')add(path('M'+v[0]+','+(v[1]-16)+' h16 v16','none',orange));else add(clearText(x,y,label,25));});
     if(p.tipMarks)ps.forEach(function(v){add(circle(v[0],v[1],5,orange));});
     if(p.people){var cols=count===1?6:5;for(var i=0;i<p.people;i++){var x=cx+(i%cols-(cols-1)/2)*25,y=145+Math.floor(i/cols)*30;icon(x,y,'person');}}
     p.notes.forEach(function(t,i){add(text(cx,280+i*42,t,count===1?25:23));});
    });
   }else if(d.kind==='solid3d'&&d.study){
    var dims=d.dimensions,w=dims[0],dep=dims[1],ht=dims[2],fullW=w+(d.join?d.join[0]:0),fullH=Math.max(ht,d.join?d.join[2]:0),sc=Math.min((d.block?220:300)/(fullW+.6*dep),170/(fullH+.36*dep)),ox=d.block?65:95,oy=230;
    h=290+(d.notes||[]).length*42;
    if(d.baseView==='front')sc=Math.min(300/(w+.55*ht),170/(dep+.3*ht));
    function xyz(x,y,z){return d.baseView==='front'?[ox+x*sc+z*sc*.55,oy-y*sc-z*sc*.3]:[ox+x*sc+y*sc*.6,oy-z*sc-y*sc*.36];}
    function face3(vs,color,dash){add(path('M'+vs.map(function(v){return xyz(v[0],v[1],v[2]).join(',');}).join(' L')+' Z',color||'none',blue,dash));}
    function edge3(a,b,dash,color){var p=xyz(a[0],a[1],a[2]),q=xyz(b[0],b[1],b[2]);add(line(p[0],p[1],q[0],q[1],color||blue,dash));}
    function cubeAt(x,w,dep,ht){
     face3([[x,0,0],[x+w,0,0],[x+w,0,ht],[x,0,ht]],pale);
     face3([[x+w,0,0],[x+w,dep,0],[x+w,dep,ht],[x+w,0,ht]],pale);
     face3([[x,0,ht],[x+w,0,ht],[x+w,dep,ht],[x,dep,ht]],d.open?'none':pale);
     edge3([x,0,0],[x,dep,0],'6 6');edge3([x,dep,0],[x+w,dep,0],'6 6');edge3([x,dep,0],[x,dep,ht],'6 6');
    }
    if(d.shape==='cylinder'){
     var center=xyz(w/2,dep/2,0),rx=w*sc/2,ry=dep*sc*.18,ty=center[1]-ht*sc;
     add(S('ellipse',{cx:center[0],cy:ty,rx:rx,ry:ry,fill:pale,stroke:blue,'stroke-width':3}),line(center[0]-rx,ty,center[0]-rx,center[1]),line(center[0]+rx,ty,center[0]+rx,center[1]),path('M'+(center[0]-rx)+','+center[1]+' A'+rx+','+ry+' 0 0 0 '+(center[0]+rx)+','+center[1]),path('M'+(center[0]-rx)+','+center[1]+' A'+rx+','+ry+' 0 0 1 '+(center[0]+rx)+','+center[1],'none',blue,'6 6'));
    }else if(d.shape==='prism'){
     var n=d.baseSides,base=d.baseEdges?[[0,0],[w,0],[0,dep]]:d.baseView==='front'&&n===3?[[0,0],[w,0],[w/2,dep]]:Array.from({length:n},function(_,i){var a=(90+i*360/n)*Math.PI/180;return [(1+Math.cos(a))*w/2,(1+Math.sin(a))*dep/2];});
     if(d.baseView==='front'){
      face3(base.map(function(v){return [v[0],v[1],0];}),pale);
      for(var i=0;i<n;i++){var a=base[i],b=base[(i+1)%n];edge3([a[0],a[1],ht],[b[0],b[1],ht],i===0?'6 6':null);edge3([a[0],a[1],0],[a[0],a[1],ht],i===0?'6 6':null);}
     }else{
      face3(base.map(function(v){return [v[0],v[1],ht];}),pale);
      for(var i=0;i<n;i++){var a=base[i],b=base[(i+1)%n],hidden=(a[1]+b[1])/2>dep*.5;edge3([a[0],a[1],0],[b[0],b[1],0],hidden?'6 6':null);edge3([a[0],a[1],0],[a[0],a[1],ht],a[1]>dep*.6?'6 6':null);}
     }
    }else if(d.cut){
     var c=d.cut;
     face3([[0,0,0],[w,0,0],[w,0,ht-c],[w-c,0,ht-c],[w-c,0,ht],[0,0,ht]],pale);
     face3([[0,0,ht],[w-c,0,ht],[w-c,c,ht],[w,c,ht],[w,dep,ht],[0,dep,ht]],pale);
     face3([[w,0,0],[w,dep,0],[w,dep,ht],[w,c,ht],[w,c,ht-c],[w,0,ht-c]],pale);
     face3([[w-c,0,ht-c],[w,0,ht-c],[w,c,ht-c],[w-c,c,ht-c]],orange);
     face3([[w-c,0,ht-c],[w-c,c,ht-c],[w-c,c,ht],[w-c,0,ht]],pale);
     face3([[w-c,c,ht-c],[w,c,ht-c],[w,c,ht],[w-c,c,ht]],pale);
     edge3([0,0,0],[0,dep,0],'6 6');edge3([0,dep,0],[w,dep,0],'6 6');edge3([0,dep,0],[0,dep,ht],'6 6');
    }else{
     cubeAt(0,w,dep,ht);if(d.join)cubeAt(w,d.join[0],d.join[1],d.join[2]);
     if(d.open){var thick=d.thickness||Math.min(w,dep)*.07;face3([[thick,thick,ht],[w-thick,thick,ht],[w-thick,dep-thick,ht],[thick,dep-thick,ht]],'none');}
     if(d.stack){for(var i=1;i<w;i++){edge3([i,0,0],[i,0,ht]);edge3([i,0,ht],[i,dep,ht]);}for(var i=1;i<dep;i++){edge3([w,i,0],[w,i,ht]);edge3([0,i,ht],[w,i,ht]);}for(var i=1;i<ht;i++){edge3([0,0,i],[w,0,i]);edge3([w,0,i],[w,dep,i]);}}
     if(d.water!==undefined){var level=d.water+(d.rise||0);face3([[0,0,level],[w,0,level],[w,dep,level],[0,dep,level]],pale);face3([[0,0,0],[w,0,0],[w,0,level],[0,0,level]],pale);if(d.rise)edge3([0,0,d.water],[w,0,d.water],'6 6',orange);edge3([0,0,0],[0,0,ht]);edge3([w,0,0],[w,0,ht]);if(d.stone){var p=xyz(w*.55,dep*.1,level*.35);add(S('ellipse',{cx:p[0],cy:p[1],rx:18,ry:13,fill:orange,stroke:ink,'stroke-width':2}));}}
     if(d.block){var x=405,y=225,a=32;add(path('M'+x+','+y+' h'+a+' l20,-12 v-'+a+' h-'+a+' l-20,12 Z',pale),path('M'+x+','+(y-a)+' h'+a+' v'+a+' M'+(x+a)+','+(y-a)+' l20,-12'));}
    }
    (d.notes||[]).forEach(function(t,i){add(text(260,282+i*42,t,25));});
   }else if(d.kind==='band'&&d.rows){
    h=d.rows.reduce(function(sum,r){return sum+110+r.labels.filter(Boolean).length*42;},10);var yy=20;
    d.rows.forEach(function(r){
     var total=r.parts.reduce(function(a,b){return a+b;},0),x=55;add(text(260,yy+23,r.totalLabel,25));yy+=45;
     r.parts.forEach(function(v,i){var bw=410*(r.schematic?1/r.parts.length:v/(r.scale||total));add(S('rect',{x:x,y:yy,width:bw,height:32,fill:i%2? '#fff':pale,stroke:blue,'stroke-width':2}));x+=bw;});
     yy+=65;r.labels.forEach(function(label,i){if(label){add(text(260,yy,label,25));yy+=42;}});yy+=10;
    });
   }else if(d.kind==='pie'&&d.sectors){
    h=360;var cx=260,cy=120,r=95,total=d.sectors.reduce(function(a,b){return a+b;},0),a=90;
    d.sectors.forEach(function(v,i){var share=d.schematic?1/d.sectors.length:v/total,next=a-360*share,p=point(cx,cy,r,a),q=point(cx,cy,r,next);add(path('M'+cx+','+cy+' L'+p.join(',')+' A'+r+','+r+' 0 '+(share>.5?1:0)+' 1 '+q.join(',')+' Z',i%2?orange:pale));a=next;});
    d.sectorLabels.forEach(function(label,i){add(text(155+(i%2)*210,275+Math.floor(i/2)*40,label,25));});
   }else if(d.kind==='fraction'&&d.rows){
    h=55+d.rows.length*120+(d.people?80:0);d.rows.forEach(function(r,i){
     var y=55+i*120,x=55,w=410;
     add(S('rect',{x:x,y:y,width:w,height:35,fill:'#fff',stroke:blue,'stroke-width':2}));
     if(r.pieces){var offset=0,centers=[];r.pieces.forEach(function(f,j){var ww=w*f[0]/f[1];centers.push(x+offset+ww/2);add(S('rect',{x:x+offset,y:y,width:ww,height:35,fill:j?orange:pale,stroke:blue,'stroke-width':2}));offset+=ww;});r.pieceLabels.forEach(function(t,j){var labelY=y+73+(r.pieceLabelsAtParts?j*36:0);if(r.pieceLabelsAtParts)add(line(centers[j],y+35,centers[j],labelY-27));add(text(r.pieceLabelsAtParts?centers[j]:145+j*230,labelY,t,23));});add(text(260,y-12,r.label,24));}
     else{add(S('rect',{x:x,y:y,width:w*r.n/r.d,height:35,fill:pale}));if(r.used)add(S('rect',{x:x,y:y,width:w*r.used[0]/r.used[1],height:35,fill:orange}));else if(!d.people)for(var k=1;k<r.d;k++)add(line(x+w*k/r.d,y,x+w*k/r.d,y+35));add(text(260,y+78,r.label,25));if(r.usedLabel)add(text(260,y-12,r.usedLabel,24));}
    });if(d.people){for(var i=0;i<d.people;i++)icon(260+(i-(d.people-1)/2)*65,h-40,'person');}
   }else if(d.kind==='numberline'&&d.rows){
    h=90+d.rows.length*160;d.rows.forEach(function(r,i){
     var y=110+i*160,x=65,w=390,end=d.end,start=d.start;
     add(line(x,y,x+w,y),line(x,y-8,x,y+8),line(x+w,y-8,x+w,y+8),text(x,y+40,start,24),text(x+w,y+40,r.endLabel||end,24));
     if(r.title)add(text(260,y-65,r.title,24));
     if(r.subdivisions)for(var j=1;j<r.subdivisions;j++)add(line(x+w*j/r.subdivisions,y-6,x+w*j/r.subdivisions,y+6));
     r.marks.forEach(function(v,j){var px=x+(v-start)/(end-start)*w;add(circle(px,y,5,orange));if(v!==start&&v!==end)add(text(px,y-18,r.labels[j],24));});
     if(r.note)add(text(260,y+80,r.note,25));
    });
   }else if(d.kind==='measure'&&d.study){
    h=310;var n=d.values.length,span=440/n;
    d.values.forEach(function(v,i){var x=40+span*(i+.5),bw=Math.min(90,span*.6),top=45,bottom=230;
     add(S('rect',{x:x-bw/2,y:top,width:bw,height:bottom-top,fill:'#fff',stroke:blue,'stroke-width':3}),S('rect',{x:x-bw/2+2,y:bottom-v/d.capacity*(bottom-top-2),width:bw-4,height:v/d.capacity*(bottom-top-2),fill:d.waterFill==='blue'?blue:pale,'fill-opacity':d.waterFill==='blue'?.4:1}),text(x,280,d.labels[i],25));
    });
   }else if(d.kind==='circle'&&d.diameter&&!d.count){
    h=280;add(circle(260,145,95,'#fff'),line(165,145,355,145,orange),text(260,124,'直径 '+d.diameter+d.unit,26));
   }else if(d.kind==='gridPoints'){
    h=355+(d.notes?d.notes.length*42:0)+(d.unknown?35:0);
    function gx(v){return 100+v*330/d.maxX;}function gy(v){return 300-v*240/d.maxY;}
    for(var i=0;i<=d.maxX;i++)add(line(gx(i),60,gx(i),300,'#c0d7e4'),text(gx(i),330,i,22));
    for(var i=0;i<=d.maxY;i++)add(line(100,gy(i),430,gy(i),'#c0d7e4'),text(74,gy(i)+7,i,22));
    d.segments.forEach(function(s){var a=d.points[s[0]],b=d.points[s[1]];add(line(gx(a.x),gy(a.y),gx(b.x),gy(b.y)));});
    d.points.forEach(function(p){var end=p.x>=d.maxX-1;add(circle(gx(p.x),gy(p.y),5,orange),clearText(gx(p.x)+(end?-12:12),gy(p.y)-12,p.name,24,end?'end':'start'));});
    add(text(48,55,'上',23),text(465,308,'右',23));
    (d.notes||[]).forEach(function(t,i){add(text(260,366+i*42,t,23));});
    if(d.unknown)add(text(260,377+(d.notes?d.notes.length*42:0),d.unknown+'：？',26));
   }else if(d.kind==='solid3d'){
    h=d.notes?395:320;
    var dims=d.dimensions||(d.shape==='cube'?[1,1,1]:[4,3,3]),sc=d.block?25:Math.min(180/dims[0],100/dims[1],130/dims[2]);
    var bx=d.block?80:110,by=245,bw=dims[0]*sc,bz=dims[2]*sc,dx=dims[1]*sc*.6,dy=-dims[1]*sc*.36;
    var vp=[[bx,by],[bx+bw,by],[bx+bw+dx,by+dy],[bx+dx,by+dy],[bx,by-bz],[bx+bw,by-bz],[bx+bw+dx,by-bz+dy],[bx+dx,by-bz+dy]],names='ABCDEFGH';
    if(d.face){var face=path('M'+d.face.split('').map(function(n){return vp[names.indexOf(n)].join(',');}).join(' L')+' Z',orange);face.setAttribute('fill-opacity','0.24');add(face);}
    [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]].forEach(function(e){var a=vp[e[0]],b=vp[e[1]],hidden=e[0]===3||e[1]===3;add(line(a[0],a[1],b[0],b[1],blue,hidden?'6 6':null));});
    d.vertices.forEach(function(v){var p=vp[names.indexOf(v.vertex)],end=v.vertex==='C'||v.vertex==='G';add(circle(p[0],p[1],5,orange),clearText(p[0]+(end?13:-13),p[1]+(v.vertex==='A'||v.vertex==='B'?27:-12),v.label,24,end?'start':'end'));});
    if(d.showLengths)add(text(bx+bw/2,283,'横 '+dims[0]+d.unit,23),text(bx+bw+dx+10,by+dy/2+18,'たて '+dims[1]+d.unit,23),text(42,by-bz/2-15,'高さ',23),text(42,by-bz/2+22,dims[2]+d.unit,23));
    if(d.block){var x=380,y=235,a=d.block*sc;add(path('M'+x+','+y+' h'+a+' l'+(a*.6)+','+(-a*.36)+' v'+(-a)+' h'+(-a)+' l'+(-a*.6)+','+(a*.36)+' Z',pale),path('M'+x+','+(y-a)+' h'+a+' v'+a+' M'+(x+a)+','+(y-a)+' l'+(a*.6)+','+(-a*.36)),text(x+a/2,283,d.block+d.unit,23),text(x+a/2,130,'積み木',23));}
    (d.notes||[]).forEach(function(t,i){add(text(260,310+i*44,t,25));});
   }else if(d.kind==='boxNet'){
    h=340;var w=d.dimensions[0],dep=d.dimensions[1],ht=d.dimensions[2],sc=Math.min(340/(2*w+2*dep),230/(2*dep+ht)),x=(520-(2*w+2*dep)*sc)/2,y=45+dep*sc;
    var widths=[dep,w,dep,w],xx=x;
    widths.forEach(function(v){add(S('rect',{x:xx,y:y,width:v*sc,height:ht*sc,fill:pale,stroke:blue,'stroke-width':2}));xx+=v*sc;});
    add(S('rect',{x:x+dep*sc,y:45,width:w*sc,height:dep*sc,fill:pale,stroke:blue,'stroke-width':2}),S('rect',{x:x+dep*sc,y:y+ht*sc,width:w*sc,height:dep*sc,fill:pale,stroke:blue,'stroke-width':2}));
    if(d.showLengths)add(text(x+dep*sc+w*sc/2,32,w+d.unit,24),text(x+dep*sc-12,45+dep*sc/2+8,dep+d.unit,24,'end'),text(xx+12,y+ht*sc/2+8,ht+d.unit,24,'start'));
   }else if(d.kind==='quadFigure'){
    h=d.diagonal?370:310;var shear=d.shape==='rectangle'?0:d.angle?155/Math.tan(d.angle*Math.PI/180):65,qa=[[100,210],[340,210],[340+shear,55],[100+shear,55]];
    add(path('M'+qa.map(function(p){return p.join(',');}).join(' L')+' Z',pale));
    qa.forEach(function(p,i){add(text(p[0],p[1]+(i<2?30:-14),'ＡＢＣＤ'[i],25));});
    if(d.angle){var a=qa[0],c=qa[2],p=point(a[0],a[1],38,d.angle);add(path('M'+(a[0]+38)+','+a[1]+' A38,38 0 0 0 '+p.join(','),'none',orange),text(a[0]+57,a[1]-23,d.angle+'°',26),text(c[0]-43,c[1]+38,'？',28));}
    if(d.diagonal){var a=qa[0],b=qa[1],c=qa[2],e=qa[3],ox=(a[0]+c[0])/2,oy=(a[1]+c[1])/2;add(line(a[0],a[1],c[0],c[1]),line(b[0],b[1],e[0],e[1]),clearText(ox+19,oy+4,'Ｏ',24),text(260,288,'ＡＣ＝'+d.diagonal+d.unit,26),text(260,330,d.unknown+'：？',26));}
    if(d.sides)add(text(220,280,'ＡＢ＝'+d.sides[0]+d.unit,25),text(451,154,'ＢＣ＝'+d.sides[1]+d.unit,23));
   }else if(d.kind==='objects'&&d.compact){
    h=35+d.groups.length*51;
    d.groups.forEach(function(count,i){var y=35+i*51;add(text(145,y+9,d.labels[i],28,'end'));for(var j=0;j<count;j++)icon(225+j*65,y,d.item);});
   }else if(d.kind==='objects'){
    var cols=d.columns|| (d.groups.length===1?1:2),cell=440/cols,y=20;
    for(var row=0;row<Math.ceil(d.groups.length/cols);row++){
     var rh=0;
     for(var c=0;c<cols;c++){
      var gi=row*cols+c;if(gi>=d.groups.length)continue;
      var count=d.groups[gi],sealed=d.sealed&&d.sealed[gi],per=d.columns===1?count:Math.min(count,cols===1?8:4),rows=sealed?1:Math.ceil(count/per),gh=60+rows*45;
      rh=Math.max(rh,gh);var gx=40+c*cell;
      if(d.groups.length>1&&!d.columns)add(box(gx+5,y,cell-10,gh-8));
      add(text(gx+cell/2,y+31,d.labels[gi],30));
      if(sealed){add(path('M'+(gx+cell/2-30)+','+(y+46)+' q30,-10 60,0 l12,47 q-42,20 -84,0 Z',pale));}
      else for(var j=0;j<count;j++){
       var ix=gx+cell/2+(j%per-(per-1)/2)*45,iy=y+62+Math.floor(j/per)*45;
       icon(ix,iy,d.item,d.mark===j+1?orange:null);
       if(d.names)add(text(ix,iy+45,d.names[j],28));
       if(d.mark===j+1)add(path('M'+ix+','+(iy+23)+' l-7,11 h14 Z',orange,orange));
      }
     }
     y+=rh+10;
    }
    h=y+(d.names?32:0);
   }else if(d.kind==='clock'){
    h=310;var cx=260,cy=151,r=118;
    add(circle(cx,cy,r,'#fff'));
    for(var k=1;k<=12;k++){var p=point(cx,cy,96,90-k*30);add(text(p[0],p[1]+9,k,28));}
    function hand(min,len,color,dash){var p=point(cx,cy,len,90-min*6);add(line(cx,cy,p[0],p[1],color,dash));}
    if(d.hour!==undefined)hand((d.hour%12)*5+d.minute/12,60,ink);
    hand(d.minute,83,blue);
    if(d.toMinute!==undefined){hand(d.toMinute,83,orange);var a=point(cx,cy,55,90-d.minute*6),b=point(cx,cy,55,90-d.toMinute*6);add(path('M'+a.join(',')+' A55,55 0 0 1 '+b.join(','),'none',orange),text(411,155,d.elapsed+'分',26));}
    add(circle(cx,cy,4,ink));
   }else if(d.kind==='tape'){
    var sum=d.values.reduce(function(a,b){return a+b;},0),xx=45;
    var wrapScale=d.wrap?430/d.values.slice(0,d.wrap).reduce(function(a,b){return a+b;},0):0;
    var tapePitch=d.study?(d.notes?145:100):70;
    h=d.wrap?270:d.stacked?85+d.values.length*tapePitch:220;
    d.values.forEach(function(v,i){if(d.wrap&&i%d.wrap===0)xx=45;var w=d.wrap?v*wrapScale:d.stacked?350*v/Math.max.apply(null,d.values):430*v/sum,yy=d.wrap?75+Math.floor(i/d.wrap)*130:d.stacked?50+i*tapePitch:75;
     if(d.schematic)w=d.values[0]===d.values[1]?350:i?150:350;
     add(box(xx,yy,w,38,i%2? '#f6dba9':pale),text(xx+w/2,yy-12,d.labels[i],d.study?24:d.stacked?28:30));
     if(d.schematic&&i===0&&d.values[0]!==d.values[1])add(path('M'+(xx+w/2-8)+','+(yy+30)+' l7,-20 m3,20 l7,-20','none',ink));
     if(d.notes&&d.notes[i])add(text(xx+w/2,yy+75,d.notes[i],28));
     if(!d.stacked)xx+=w;
    });
    if(d.places){xx=45;d.places.forEach(function(p,i){add(text(xx,156,p,28));if(i<d.values.length)xx+=430*d.values[i]/sum;});}
   }else if(d.kind==='measure'){
    h=320;d.values.forEach(function(v,i){var x=125+i*230,bottom=244,top=44;
     add(box(x-50,top,100,bottom-top,'#fff'),S('rect',{x:x-48,y:bottom-v/d.capacity*198,width:96,height:v/d.capacity*198,fill:pale}));
     for(var k=0;k<=d.capacity;k++){var y=bottom-k/d.capacity*200;add(line(x+20,y,x+50,y));if(k%5===0)add(text(x+64,y+8,k,24,'start'));}
     add(text(x,282,d.labels[i],30));
    });
   }else if(d.kind==='balance'){
    h=290;add(path('M105,187 H415 M190,187 l-20,62 h180 l-20,-62',pale),box(224,204,72,29,'#fff'),text(260,226,'？',24));
    d.weights.forEach(function(v,i){var x=120+i*155;add(box(x,79,140,105),path('M'+(x+40)+',79 v-20 h60 v20'),text(x+70,142,v,26));});
   }else if(d.kind==='nestedRect'){
    h=310;var grow=d.growth!==undefined,ow=grow?200:220,oh=grow?200:220,ix=grow?130:205,iy=grow?48:118,iw=grow?126:d.innerW/d.w*ow,ih=grow?126:d.innerH/d.h*oh;
    add(S('rect',{x:130,y:48,width:ow,height:oh,fill:pale,stroke:blue,'stroke-width':3}),S('rect',{x:ix,y:iy,width:iw,height:ih,fill:'#fff',stroke:orange,'stroke-width':3}));
    if(grow){add(text(ix+iw/2,iy+ih/2,'もと：'+d.innerW+d.unit,26),text(260,278,'広げた面積 '+d.area+d.unit+'²',26),text(ix+iw+(ow-iw)/2,36,d.growth+d.unit,24),text(101,iy+ih+(oh-ih)/2+8,d.growth+d.unit,24));}
    else{add(text(240,32,d.w+d.unit,27),text(95,166,d.h+d.unit,27),text(ix+iw/2,iy-12,d.innerW+d.unit,26),text(ix+iw+15,iy+ih/2+8,d.innerH+d.unit,26,'start'),text(ix+iw/2,iy+ih/2+7,'小屋',23));}
   }else if(d.kind==='triangle'){
    h=280;var left=132,bottom=206,right=402,top=53,apex=d.right?left:265;
    add(path('M'+left+','+bottom+' H'+right+' L'+apex+','+top+' Z',pale),text(267,249,d.base+d.unit,30));
    add(line(apex,top,apex,bottom,orange,d.right?null:'6 6'),path('M'+apex+','+(bottom-17)+' h17 v17','none',orange),clearText(apex+(d.right?-18:18),150,d.height+d.unit,28,d.right?'end':'start'));
    if(d.right)add(text(299,116,'？',30));
   }else if(d.kind==='pie'){
    h=270;d.denominators.forEach(function(den,i){var cx=140+i*240,cy=128,r=83;
     add(circle(cx,cy,r,'#fff'));
     for(var k=0;k<den;k++){var a=point(cx,cy,r,90-k*360/den),b=point(cx,cy,r,90-(k+1)*360/den);add(path('M'+cx+','+cy+' L'+a.join(',')+' A'+r+','+r+' 0 '+(360/den>180?1:0)+' 1 '+b.join(',')+' Z',k<d.numerators[i]?pale:'#fff'));}
     add(text(cx,244,d.labels[i],28));
    });
   }else if(d.kind==='band'){
    h=215;var total=d.parts.reduce(function(a,b){return a+b;},0),x=40;
    add(text(260,38,d.totalLabel,27));
    d.parts.forEach(function(v,i){var w=440*v/total;add(box(x,70,w,50,i? '#fff':pale),text(x+w/2,153,d.labels[i],24));if(d.known)add(text(x+w/2,190,d.known[i],26));if(total<=10&&Number.isInteger(v))for(var j=1;j<v;j++)add(line(x+j*w/v,70,x+j*w/v,120));x+=w;});
   }else if(d.kind==='doubleLine'){
    h=d.note?330:300;d.labels.forEach(function(label,i){var y=60+i*135;add(text(45,y-20,label,26,'start'),line(75,y,425,y),line(75,y-8,75,y+8),line(425,y-8,425,y+8));if(d.starts)add(text(d.starts[i].length>4?145:75,y+40,d.starts[i],23),text(425,y+40,d.ends[i],28));else add(text(425,y+40,d.ends[i],30));});if(d.note)add(text(260,300,d.note,23));
   }else if(d.kind==='circle'){
    h=280;if(d.count){var r=42,left=75,cy=135;add(S('rect',{x:left,y:cy-r,width:2*r*d.count,height:2*r,fill:'none',stroke:blue,'stroke-width':3}));for(var i=0;i<d.count;i++)add(circle(left+r+i*2*r,cy,r,'#fff'));add(line(left,cy,left+2*r,cy,orange),text(left+r,64,d.diameter+d.unit,28),text(260,237,'箱の長さ ？',28));}
    else{var cx=d.angle?150:250,cy=d.angle?230:150,r=d.angle?180:100;if(d.angle){h=300;var end=point(cx,cy,r,d.angle);add(path('M'+cx+','+cy+' L'+(cx+r)+','+cy+' A'+r+','+r+' 0 0 0 '+end.join(',')+' Z',pale),text(cx+58,cy-16,d.angle+'°',25),text(cx+r/2,cy+35,d.radius+d.unit,28));}
     else add(circle(cx,cy,r,'#fff'),line(cx,cy,cx+r,cy,orange),circle(cx,cy,4,ink),text(cx+51,cy-14,d.radius+d.unit,28));}
   }else if(d.kind==='coordinate'){
    h=340;var xmin=d.xRange[0],xmax=d.xRange[1],ymin=d.yRange[0],ymax=d.yRange[1];
    function px(x){return 65+(x-xmin)/(xmax-xmin)*390;}function py(y){return 290-(y-ymin)/(ymax-ymin)*235;}function value(x){return d.a*Math.pow(x,d.power)+d.b;}
    if(d.gridSteps){for(var x=xmin;x<=xmax;x+=d.gridSteps[0])add(line(px(x),55,px(x),290,'#c0d7e4'),text(px(x),316,x,22));for(var y=ymin;y<=ymax;y+=d.gridSteps[1])add(line(65,py(y),455,py(y),'#c0d7e4'),text(43,py(y)+7,y,22));h=410;}
    add(line(65,py(0),455,py(0)),line(px(0),55,px(0),290),text(475,py(0)+8,'x',25),text(px(0),44,'y',25),text(260,d.gridSteps?383:326,d.formula,26));
    if(!d.gridSteps)add(text(px(0)-17,py(0)+26,'O',22));
    if(d.knownPoint){var known=d.knownPoint;add(circle(px(known[0]),py(known[1]),5,orange),text(px(known[0])-12,py(known[1])+34,'（'+known.join('，')+'）',23,'end'));}
    var pts=[];for(var i=0;i<=160;i++){var x=xmin+(xmax-xmin)*i/160,y=value(x);if(y>=ymin&&y<=ymax)pts.push([px(x),py(y)].join(','));}
    add(S('polyline',{points:pts.join(' '),fill:'none',stroke:blue,'stroke-width':3}));
    (d.marks||[]).forEach(function(x){var y=value(x);add(circle(px(x),py(y),5,orange),line(px(x),py(y),px(x),py(0),orange,'5 5'),text(px(x),py(0)+26,x,23));});
   }else if(d.kind==='exterior'){
    h=265;var cx=245,cy=182,end=point(cx,cy,160,d.angle);
    add(line(60,cy,cx,cy),line(cx,cy,425,cy,ink,'6 6'),line(cx,cy,end[0],end[1]));
    var p=point(cx,cy,65,d.angle);add(path('M'+(cx+65)+','+cy+' A65,65 0 0 0 '+p.join(','),'none',orange),text(cx+130,cy-16,d.angle+'°',28));
   }else if(d.kind==='inscribed'){
    h=310;var cx=260,cy=153,r=123,a=point(cx,cy,r,270-d.angle),b=point(cx,cy,r,270+d.angle),p=point(cx,cy,r,90);
    add(circle(cx,cy,r,'#fff'),line(p[0],p[1],a[0],a[1]),line(p[0],p[1],b[0],b[1]),line(cx,cy,a[0],a[1],orange),line(cx,cy,b[0],b[1],orange),path('M'+a.join(',')+' A'+r+','+r+' 0 0 0 '+b.join(','),'none',orange),text(cx,p[1]+110,d.angle+'°',24),text(cx,cy+47,'？',28));
   }else if(d.kind==='similarity'){
    h=280;var sx=[100,290],heights=[68,170],widths=[51,128];d.shadows.forEach(function(v,i){var x=sx[i],y=220;add(line(x,y,x,y-heights[i]),line(x,y,x+widths[i],y,orange),line(x,y-heights[i],x+widths[i],y,ink,'6 6'),text(x-13,y-heights[i]/2,i===0?d.height+d.unit:'？',27,'end'),text(x+widths[i]/2,255,v+d.unit,28));});
   }else if(d.kind==='cards'){
    h=d.values.length>2?230:205;
    var n=d.values.length,cw=Math.min(235,450/n),x=(520-n*cw)/2;
    d.values.forEach(function(v,i){var cx=x+(i+.5)*cw;add(box(x+i*cw+5,42,cw-10,112),text(cx,76,d.labels[i],d.balls?24:14));if(d.balls){for(var j=0;j<v;j++)add(S('circle',{cx:cx+(j-(v-1)/2)*55,cy:119,r:21,fill:i===0?'#e36b61':'#fff',stroke:ink,'stroke-width':2}));}else add(text(cx,124,v,n===1?30:n>2?22:27));});
   }else if(d.kind==='bars'){
    h=Math.max(190,55+d.values.length*60);var max=Math.max.apply(null,d.values);
    d.values.forEach(function(v,i){var y=24+i*60;add(text(20,y+22,d.labels[i],d.study?24:16,'start'),box(195,y,Math.max(3,v/max*225),35,i%2? '#f6dba9':pale),text(440,y+24,v,d.study?24:18,'start'));});
   }else if(d.kind==='rect'||d.kind==='cutout'){
    var w=Number(d.w)||8,hh=Number(d.h)||(d.area?8:6),sc=Math.min(310/w,135/hh),rw=w*sc,rh=hh*sc,x0=(520-rw)/2,y0=47;
    if(d.kind==='rect') add(S('rect',{x:x0,y:y0,width:rw,height:rh,fill:pale,stroke:blue,'stroke-width':3}));
    else{
     var cw2=d.cw*sc,ch2=d.ch*sc;
     add(path('M'+x0+','+y0+' H'+(x0+rw-cw2)+' V'+(y0+ch2)+' H'+(x0+rw)+' V'+(y0+rh)+' H'+x0+' Z',pale));
     add(path('M'+(x0+rw-cw2)+','+y0+' H'+(x0+rw)+' V'+(y0+ch2),'none',orange,'5 5'),text(x0+rw-cw2/2,y0-12,d.cw+'cm',17),text(x0+rw+12,y0+ch2/2+6,d.ch+'cm',17,'start'));
    }
    add(text(260,y0+rh+34,d.w+(d.unit||'cm'),d.study?26:20),text(x0-12,y0+rh/2+6,d.h+(d.unit||'cm'),d.study?26:20,'end'));
    if(d.area)add(text(260,y0+rh/2+7,'面積 '+d.area+(d.unit||'cm')+'²',26));
    add(path('M'+x0+','+(y0+rh-13)+' h13 v13','none','#82b1ca'));
   }else if(d.kind==='fraction'&&d.ungrouped){
    h=170;var cell=410/d.n;
    for(var k=0;k<d.n;k++)add(S('rect',{x:55+k*cell,y:45,width:cell,height:42,fill:blue,stroke:'#7ea7bf','stroke-width':1.5}));
    add(text(55+cell/2,123,'1/'+d.d,24));
   }else if(d.kind==='fraction'||d.kind==='fractionSum'){
    var numer=d.kind==='fractionSum'?d.n+d.m:d.n,den=d.d,rows=d.separate?2:Math.ceil(numer/den);h=d.separate?295:60+rows*65+(d.whole?30:0);
    for(var r=0;r<rows;r++){
     var yy=d.separate?(d.whole?50:40)+r*145:(d.whole?50:20)+r*65;
     for(var k=0;k<den;k++)add(S('rect',{x:55+k*410/den,y:yy,width:410/den,height:42,fill:(d.separate?k<(r?d.m:d.n):r*den+k<numer)?(d.kind==='fractionSum'&&(d.separate?r:r*den+k>=d.n)? '#f3c779':blue):'#fff',stroke:'#7ea7bf','stroke-width':1.5}));
     if(d.whole)add(text(260,yy-12,d.whole,24));else if(!d.separate)add(text(480,48+r*65,'１',16));
     if(d.separate)add(text(260,yy+76,(r?d.m:d.n)+'/'+den+(d.unit||(d.whole?'L':'')),26));
    }
   }else if(['angle','angleSplit','angleReflex','protractor'].indexOf(d.kind)>=0){
    var cx=245,cy=d.kind==='angleReflex'?155:194,deg=d.deg||d.total,rad=143,p=point(cx,cy,rad,deg);
    if(d.kind==='protractor'){
     add(path('M'+(cx-rad)+','+cy+' A'+rad+','+rad+' 0 0 1 '+(cx+rad)+','+cy+' Z','#e9f5fb','#9bbfd2'));
     for(var a=0;a<=180;a+=10){var p1=point(cx,cy,rad,a),p2=point(cx,cy,rad-(a%30===0?17:8),a);add(line(p1[0],p1[1],p2[0],p2[1],'#7e9dad'));if(a%30===0){var p3=point(cx,cy,rad-35,a);add(text(p3[0],p3[1]+5,a,15));}}
    }
    add(line(cx,cy,cx+rad,cy),line(cx,cy,p[0],p[1]));
    if(d.kind==='angleSplit'){
     var split=point(cx,cy,rad,d.part),mid1=point(cx,cy,64,d.part/2),mid2=point(cx,cy,95,(deg+d.part)/2);
     add(line(cx,cy,split[0],split[1],orange),text(mid1[0],mid1[1]+7,d.part+'°',20),text(mid2[0],mid2[1]+7,'?',24));
    }else if(d.kind==='angleReflex'){
     var mp=point(cx,cy,60,deg/2);add(text(mp[0],mp[1],deg+'°',20),path('M'+(cx+70)+','+cy+' A70,70 0 1 1 '+point(cx,cy,70,deg).join(','),'none',orange),text(cx-108,cy+12,'?',24));
    }else if(d.kind==='angle'){
     var pp=point(cx,cy,52,deg);add(path('M'+(cx+52)+','+cy+' A52,52 0 '+(deg>180?1:0)+' 0 '+pp.join(','),'none',orange));
     var pm=point(cx,cy,79,deg/2);add(text(pm[0],pm[1],d.label||'?',24));
     if(deg===90)add(path('M'+cx+','+(cy-19)+' h19 v19','none',blue));
    }
    add(S('circle',{cx:cx,cy:cy,r:4,fill:ink}));
   }else if(d.kind==='lines'){
    if(d.mode==='parallel') add(line(105,88,415,88),line(105,161,415,161),text(84,94,'a'),text(84,167,'b'));
    else add(line(95,150,425,150),line(260,30,260,220),path('M260,129 h21 v21','none',orange));
   }else if(d.kind==='polygon'){
    var pts=d.shape==='pentagon'?[[260,40],[390,105],[345,200],[175,200],[130,105]]:d.shape==='trapezoid'?[[170,50],[345,50],[410,175],[110,175]]:d.shape==='diamond'?[[260,35],[410,120],[260,205],[110,120]]:d.shape==='parallelogram'?[[190,55],[400,55],[335,180],[125,180]]:d.w?[[100,65],[412,65],[412,65+312*d.h/d.w],[100,65+312*d.h/d.w]]:[[135,55],[385,55],[385,180],[135,180]];
    add(S('polygon',{points:pts.map(function(p){return p.join(',');}).join(' '),fill:pale,stroke:blue,'stroke-width':3}));
    pts.forEach(function(p,i){add(text(p[0]+(i<2?0:-7),p[1]+(i<2?-13:26),'ABCDE'[i],18));});
    if(d.shape==='diagonals'){add(line(pts[0][0],pts[0][1],pts[2][0],pts[2][1],orange));if(!d.single)add(line(pts[1][0],pts[1][1],pts[3][0],pts[3][1],orange));}
    if(d.w)add(text(260,30,d.w+d.unit,25),text(60,133,d.h+d.unit,25),text(280,115,'？',28));
    if(d.side)add(text(285,31,d.side,20));
    if(d.shape==='trapezoid')add(text(255,56,'›',26),text(255,181,'›',26));
    if(d.shape==='diamond')pts.forEach(function(p,i){var p2=pts[(i+1)%4],mx=(p[0]+p2[0])/2,my=(p[1]+p2[1])/2;add(line(mx-4,my-7,mx+4,my+7,orange));});
   }else if(d.kind==='solid'){
    if(d.shape==='triangularPrism'){
     // 奥の底面は手前の底面を(170,-65)だけ平行移動。隠れる3辺は点線。
     h=320;add(path('M180,100 L350,35 L420,155 L250,220 Z',pale),path('M110,220 L250,220 L180,100 Z',pale),path('M110,220 L280,155 L350,35 M280,155 L420,155','none',blue,'6 6'),line(250,220,420,155,orange),text(365,212,d.h+d.unit,28),text(180,278,'底面積 '+d.baseArea+d.unit+'²',26));
    }else{
    var a=d.cube?130:210,x=(520-a-65)/2,y=93,z=108;
    if(d.water!==undefined){var waterH=z*d.water/d.h;add(path('M'+x+','+(y+z-waterH)+' l65,-50 h'+a+' l-65,50 Z',pale),box(x,y+z-waterH,a,waterH));}
    add(path('M'+x+','+y+' l65,-50 h'+a+' v'+z+' l-65,50 H'+x+' Z',d.water!==undefined?'none':pale),path('M'+x+','+y+' h'+a+' v'+z+' M'+(x+a)+','+y+' l65,-50'),path('M'+(x+65)+','+(y-50)+' v'+z+' h'+a+' M'+x+','+(y+z)+' l65,-50','none','#8cadbf','5 5'));
    if(d.water!==undefined){var wh=z*d.water/d.h;add(path('M'+x+','+(y+z-wh)+' h'+a+' v'+wh+' H'+x+' Z',pale),line(x,y+z-wh,x+a,y+z-wh,orange),text(260,243,d.w+d.unit,26),clearText(402,65,d.depth+d.unit,24),text(81,163,d.h+d.unit,24),text(417,185,'水 '+d.water+d.unit,23));h=280;}
    }
   }else if(d.kind==='net'){
    var cells=[[0,1,'Ａ'],[1,1,'Ｂ'],[2,1,'Ｃ'],[3,1,'Ｄ'],[1,0,'Ｅ'],[1,2,'Ｆ']];h=258;
    cells.forEach(function(c){add(box(130+c[0]*65,14+c[1]*65,65,65,c[2]==='Ａ'?'#f5dbaf':pale),text(162+c[0]*65,54+c[1]*65,c[2],22));});
   }else if(d.kind==='grid'){
    h=272;for(var g=0;g<=5;g++){add(line(120+g*43,27,120+g*43,242,'#c0d7e4'),line(120,242-g*43,335,242-g*43,'#c0d7e4'),text(120+g*43,264,g,16),text(100,248-g*43,g,16));}
    add(S('circle',{cx:120+d.x*43,cy:242-d.y*43,r:7,fill:orange}),text(135+d.x*43,228-d.y*43,'Ｐ',20),text(365,243,'右',17),text(75,40,'上',17));
   }else if(d.kind==='axes'){
    add(line(165,187,423,187),line(165,187,165,30),line(165,187,305,58),text(446,195,'右',17),text(165,22,'高さ',17),text(330,57,'奥',17));
    add(text(305,218,'右 '+d.values[0],18),text(88,90,'高さ '+d.values[2],18),text(325,105,'奥 '+d.values[1],18));
   }else if(d.kind==='graph'){
    var maxV=Math.max.apply(null,d.values),step=[1,2,5,10,20,50,100,200,500,1000].filter(function(c){return Math.ceil(maxV/c)<=8;})[0]||1000,top=Math.ceil(maxV/step)*step;
    var detailed=Number.isFinite(d.minorStep)&&d.minorStep>0&&d.minorStep<step&&top/d.minorStep<=1000,bottom=detailed?300:220,plotHeight=detailed?255:175;h=detailed?360:270;
    if(detailed)for(var minor=d.minorStep;minor<top;minor+=d.minorStep){if(Math.abs(minor/step-Math.round(minor/step))<1e-8)continue;var grid=line(65,bottom-minor/top*plotHeight,472,bottom-minor/top*plotHeight,'#d0e1eb');grid.setAttribute('stroke-width','1');grid.setAttribute('data-part','minor-grid');add(grid);}
    for(var v=0;v<=top;v+=step){var yy=bottom-v/top*plotHeight;add(line(65,yy,472,yy,'#d0e1eb'),text(48,yy+(detailed?8:5),v,detailed?24:15));}
    var points=d.values.map(function(v,i){return [75+i*380/(d.values.length-1),bottom-v/top*plotHeight];});
    add(S('polyline',{points:points.map(function(p){return p.join(',');}).join(' '),fill:'none',stroke:blue,'stroke-width':3}));
    points.forEach(function(p,i){add(S('circle',{cx:p[0],cy:p[1],r:5,fill:orange,stroke:'#fff','stroke-width':2}),text(p[0],detailed?333:249,d.labels[i],detailed?24:15));});
   }else if(d.kind==='abacus'){
    h=270;add(box(135,15,250,223,'#f8eedc'),line(150,97,370,97,'#8e6742'));
    d.digits.forEach(function(n,i){var x=205+i*110;add(line(x,25,x,225,'#aa8764'),text(x,260,d.labels[i],17));
     function bead(y,on){add(S('polygon',{points:[[x-24,y],[x-14,y-9],[x+14,y-9],[x+24,y],[x+14,y+9],[x-14,y+9]].map(function(p){return p.join(',');}).join(' '),fill:on?orange:'#e3d6c3',stroke:on?'#b67a26':'#b8a084','stroke-width':1.5}));}
     bead(n>=5?79:39,n>=5);var count=n%5;
     for(var j=0;j<4;j++)bead(j<count?114+j*20:219-(3-j)*20,j<count);
    });
   }else if(d.kind==='numberline'){
    h=205;add(line(55,100,465,100));var steps=(d.end-d.start)/d.step;
    for(var t=0;t<=steps;t++){var xx=55+t*410/steps,v=d.start+t*d.step;add(line(xx,90,xx,110));if((!d.hideNegative||v>=0)&&(!d.tickLabels||d.tickLabels[t]!==''))add(text(xx,143,d.tickLabels?d.tickLabels[t]:v,24));}
    (d.marks||[]).forEach(function(v,i){var xx=55+(v-d.start)/(d.end-d.start)*410;add(circle(xx,100,5,orange),text(xx,70,d.markLabels?d.markLabels[i]:v,24));});
    if(d.directions)add(text(55,183,d.directions[0],25),text(465,183,d.directions[1],25));
   }
   // 新しい図も昼のテーマの共通色を使う。既存の図の配色は変えない。
   if(d.study||['gridPoints','solid3d','boxNet','quadFigure'].indexOf(d.kind)>=0){
    var paints={};paints[blue]='var(--rn-blue, '+blue+')';paints[ink]='var(--rn-navy, '+ink+')';paints[pale]='var(--rn-pale, '+pale+')';paints[orange]='var(--rn-warm, '+orange+')';
    nodes.forEach(function(n){var all=[n].concat(Array.prototype.slice.call(n.querySelectorAll('*')));all.forEach(function(el){['fill','stroke'].forEach(function(a){var v=el.getAttribute(a);if(paints[v])el.setAttribute(a,paints[v]);});});});
   }
   var svg=S('svg',{viewBox:'0 0 520 '+h,role:'img','aria-label':d.caption||'問題を考えるための図'},[S('title',{},d.caption||'学習の図')].concat(nodes));
   // 個数が多い図は高さを制限すると絵と文字が小さくなるため、自然な縦横比で表示。
   if(d.study||d.kind==='graph'&&d.minorStep||['objects','tape','measure','gridPoints','solid3d','boxNet','quadFigure'].indexOf(d.kind)>=0)svg.style.maxHeight='none';
   fig.appendChild(svg);
  }
  if(d.caption)fig.appendChild(U.el('figcaption',{text:d.caption}));
  return fig;
 }
 FF.lessonFigure={render:render};
})(this);
