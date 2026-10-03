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
   fig.appendChild(U.el('div',{class:'story-visual'+(scenic?' scenic':'')},[
    U.el('img',{attrs:{src:scenic?'img/learning-warehouse.png':'img/lesson-'+d.art+'.jpg',alt:'雪原の町の'+d.item+'の場面'}}),
    U.el('div',{class:'story-note'},[U.el('span',{class:'eyebrow',text:'町のおしごと'}),U.el('strong',{text:d.item}),U.el('div',{class:'story-quantities'},[U.el('span',{text:d.total}),U.el('span',{text:d.each})])])
   ]));
  }else if(d.kind==='table'){
   fig.appendChild(U.el('div',{class:'diagram-table-wrap'},U.el('table',{class:'diagram-table'},[
    U.el('thead',{},U.el('tr',{},d.head.map(function(t){return U.el('th',{attrs:{scope:'col'},text:t});}))),
    U.el('tbody',{},d.rows.map(function(row){return U.el('tr',{},row.map(function(t,i){return U.el(i===0?'th':'td',{attrs:i===0?{scope:'row'}:{},text:t});}));}))
   ])));
  }else{
   var nodes=[],h=245;
   function add(){Array.prototype.forEach.call(arguments,function(n){nodes.push(n);});}
   if(d.kind==='cards'){
    h=d.values.length>2?230:205;
    var n=d.values.length,cw=Math.min(235,450/n),x=(520-n*cw)/2;
    d.values.forEach(function(v,i){add(box(x+i*cw+5,42,cw-10,112),text(x+(i+.5)*cw,76,d.labels[i],14),text(x+(i+.5)*cw,124,v,n===1?30:n>2?22:27));});
   }else if(d.kind==='bars'){
    h=Math.max(190,55+d.values.length*60);var max=Math.max.apply(null,d.values);
    d.values.forEach(function(v,i){var y=24+i*60;add(text(20,y+22,d.labels[i],16,'start'),box(195,y,Math.max(3,v/max*265),35,i%2? '#f6dba9':pale),text(474,y+24,v,18));});
   }else if(d.kind==='rect'||d.kind==='cutout'){
    var w=Number(d.w)||8,hh=Number(d.h)||6,sc=Math.min(310/w,135/hh),rw=w*sc,rh=hh*sc,x0=(520-rw)/2,y0=47;
    if(d.kind==='rect') add(S('rect',{x:x0,y:y0,width:rw,height:rh,fill:pale,stroke:blue,'stroke-width':3}));
    else{
     var cw2=d.cw*sc,ch2=d.ch*sc;
     add(path('M'+x0+','+y0+' H'+(x0+rw-cw2)+' V'+(y0+ch2)+' H'+(x0+rw)+' V'+(y0+rh)+' H'+x0+' Z',pale));
     add(path('M'+(x0+rw-cw2)+','+y0+' H'+(x0+rw)+' V'+(y0+ch2),'none',orange,'5 5'),text(x0+rw-cw2/2,y0-12,d.cw+'cm',17),text(x0+rw+12,y0+ch2/2+6,d.ch+'cm',17,'start'));
    }
    add(text(260,y0+rh+34,d.w+(d.unit||'cm')),text(x0-12,y0+rh/2+6,d.h+(d.unit||'cm'),20,'end'));
    add(path('M'+x0+','+(y0+rh-13)+' h13 v13','none','#82b1ca'));
   }else if(d.kind==='fraction'||d.kind==='fractionSum'){
    var numer=d.kind==='fractionSum'?d.n+d.m:d.n,den=d.d,rows=Math.ceil(numer/den);h=60+rows*65;
    for(var r=0;r<rows;r++){
     for(var k=0;k<den;k++)add(S('rect',{x:55+k*410/den,y:20+r*65,width:410/den,height:42,fill:r*den+k<numer?(d.kind==='fractionSum'&&r*den+k>=d.n? '#f3c779':blue):'#fff',stroke:'#7ea7bf','stroke-width':1.5}));
     add(text(480,48+r*65,'１',16));
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
    var pts=d.shape==='trapezoid'?[[170,50],[345,50],[410,175],[110,175]]:d.shape==='diamond'?[[260,35],[410,120],[260,205],[110,120]]:d.shape==='parallelogram'?[[190,55],[400,55],[335,180],[125,180]]:[[135,55],[385,55],[385,180],[135,180]];
    add(S('polygon',{points:pts.map(function(p){return p.join(',');}).join(' '),fill:pale,stroke:blue,'stroke-width':3}));
    pts.forEach(function(p,i){add(text(p[0]+(i<2?0:-7),p[1]+(i<2?-13:26),'ABCD'[i],18));});
    if(d.shape==='diagonals')add(line(135,55,385,180,orange),line(385,55,135,180,orange));
    if(d.side)add(text(285,31,d.side,20));
    if(d.shape==='trapezoid')add(text(255,56,'›',26),text(255,181,'›',26));
    if(d.shape==='diamond')pts.forEach(function(p,i){var p2=pts[(i+1)%4],mx=(p[0]+p2[0])/2,my=(p[1]+p2[1])/2;add(line(mx-4,my-7,mx+4,my+7,orange));});
   }else if(d.kind==='solid'){
    var a=d.cube?130:210,x=(520-a-65)/2,y=93,z=108;
    add(path('M'+x+','+y+' l65,-50 h'+a+' v'+z+' l-65,50 H'+x+' Z',pale),path('M'+x+','+y+' h'+a+' v'+z+' M'+(x+a)+','+y+' l65,-50'),path('M'+(x+65)+','+(y-50)+' v'+z+' h'+a+' M'+x+','+(y+z)+' l65,-50','none','#8cadbf','5 5'));
   }else if(d.kind==='net'){
    var cells=[[0,1,'Ａ'],[1,1,'Ｂ'],[2,1,'Ｃ'],[3,1,'Ｄ'],[1,0,'Ｅ'],[1,2,'Ｆ']];h=258;
    cells.forEach(function(c){add(box(130+c[0]*65,14+c[1]*65,65,65,c[2]==='Ａ'?'#f5dbaf':pale),text(162+c[0]*65,54+c[1]*65,c[2],22));});
   }else if(d.kind==='grid'){
    h=272;for(var g=0;g<=5;g++){add(line(120+g*43,27,120+g*43,242,'#c0d7e4'),line(120,242-g*43,335,242-g*43,'#c0d7e4'),text(120+g*43,264,g,16),text(100,248-g*43,g,16));}
    add(S('circle',{cx:120+d.x*43,cy:242-d.y*43,r:7,fill:orange}),text(135+d.x*43,228-d.y*43,'Ｐ',20),text(365,243,'右',17),text(120,23,'上',17));
   }else if(d.kind==='axes'){
    add(line(165,187,423,187),line(165,187,165,30),line(165,187,305,58),text(446,195,'右',17),text(165,22,'高さ',17),text(330,57,'奥',17));
    add(text(305,218,'右 '+d.values[0],18),text(88,90,'高さ '+d.values[2],18),text(325,105,'奥 '+d.values[1],18));
   }else if(d.kind==='graph'){
    var maxV=Math.max.apply(null,d.values),step=maxV>8?2:1,top=Math.ceil(maxV/step)*step;h=270;
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
    h=170;add(line(55,82,465,82));var steps=(d.end-d.start)/d.step;
    for(var t=0;t<=steps;t++){var xx=55+t*410/steps;add(line(xx,72,xx,92),text(xx,121,d.start+t*d.step,17));}
   }
   var svg=S('svg',{viewBox:'0 0 520 '+h,role:'img','aria-label':d.caption||'問題を考えるための図'},[S('title',{},d.caption||'学習の図')].concat(nodes));
   fig.appendChild(svg);
  }
  if(d.caption)fig.appendChild(U.el('figcaption',{text:d.caption}));
  return fig;
 }
 FF.lessonFigure={render:render};
})(this);
