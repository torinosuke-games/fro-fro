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
   if(d.kind==='objects'&&d.compact){
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
    h=d.wrap?270:d.stacked?85+d.values.length*70:220;
    d.values.forEach(function(v,i){if(d.wrap&&i%d.wrap===0)xx=45;var w=d.wrap?v*wrapScale:d.stacked?350*v/Math.max.apply(null,d.values):430*v/sum,yy=d.wrap?75+Math.floor(i/d.wrap)*130:d.stacked?50+i*70:75;
     add(box(xx,yy,w,38,i%2? '#f6dba9':pale),text(d.stacked?xx+w/2:xx+w/2,yy-12,d.labels[i],d.stacked?28:30));
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
    add(line(65,py(0),455,py(0)),line(px(0),55,px(0),290),text(475,py(0)+8,'x',25),text(px(0),44,'y',25),text(px(0)-17,py(0)+26,'O',22),text(260,326,d.formula,26));
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
    d.values.forEach(function(v,i){var y=24+i*60;add(text(20,y+22,d.labels[i],16,'start'),box(195,y,Math.max(3,v/max*225),35,i%2? '#f6dba9':pale),text(440,y+24,v,18,'start'));});
   }else if(d.kind==='rect'||d.kind==='cutout'){
    var w=Number(d.w)||8,hh=Number(d.h)||(d.area?8:6),sc=Math.min(310/w,135/hh),rw=w*sc,rh=hh*sc,x0=(520-rw)/2,y0=47;
    if(d.kind==='rect') add(S('rect',{x:x0,y:y0,width:rw,height:rh,fill:pale,stroke:blue,'stroke-width':3}));
    else{
     var cw2=d.cw*sc,ch2=d.ch*sc;
     add(path('M'+x0+','+y0+' H'+(x0+rw-cw2)+' V'+(y0+ch2)+' H'+(x0+rw)+' V'+(y0+rh)+' H'+x0+' Z',pale));
     add(path('M'+(x0+rw-cw2)+','+y0+' H'+(x0+rw)+' V'+(y0+ch2),'none',orange,'5 5'),text(x0+rw-cw2/2,y0-12,d.cw+'cm',17),text(x0+rw+12,y0+ch2/2+6,d.ch+'cm',17,'start'));
    }
    add(text(260,y0+rh+34,d.w+(d.unit||'cm')),text(x0-12,y0+rh/2+6,d.h+(d.unit||'cm'),20,'end'));
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
    var maxV=Math.max.apply(null,d.values),step=[1,2,5,10,20,50,100,200,500,1000].filter(function(c){return Math.ceil(maxV/c)<=8;})[0]||1000,top=Math.ceil(maxV/step)*step;h=270;
    for(var v=0;v<=top;v+=step){var yy=220-v/top*175;add(line(65,yy,472,yy,'#d0e1eb'),text(48,yy+5,v,15));}
    var points=d.values.map(function(v,i){return [75+i*380/(d.values.length-1),220-v/top*175];});
    add(S('polyline',{points:points.map(function(p){return p.join(',');}).join(' '),fill:'none',stroke:blue,'stroke-width':3}));
    points.forEach(function(p,i){add(S('circle',{cx:p[0],cy:p[1],r:5,fill:orange,stroke:'#fff','stroke-width':2}),text(p[0],249,d.labels[i],15));});
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
   var svg=S('svg',{viewBox:'0 0 520 '+h,role:'img','aria-label':d.caption||'問題を考えるための図'},[S('title',{},d.caption||'学習の図')].concat(nodes));
   // 個数が多い図は高さを制限すると絵と文字が小さくなるため、自然な縦横比で表示。
   if(['objects','tape','measure'].indexOf(d.kind)>=0)svg.style.maxHeight='none';
   fig.appendChild(svg);
  }
  if(d.caption)fig.appendChild(U.el('figcaption',{text:d.caption}));
  return fig;
 }
 FF.lessonFigure={render:render};
})(this);
