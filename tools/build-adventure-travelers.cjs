// Original 32×48 pixel drawings, based on the selectable portraits' outfits.
// Run with node tools/build-adventure-travelers.cjs. No raster image processing.
const fs = require('node:fs');
const path = require('node:path');
const types = {
 scout: {hair:'#242331',coat:'#765344',trim:'#583269',skin:'#e8b78e',style:'spiky',scarf:true},
 knight: {hair:'#473327',coat:'#315b83',trim:'#c5cfda',skin:'#ecc39b',style:'spiky',armor:true},
 bard: {hair:'#bc78ce',coat:'#ece0c4',trim:'#764793',skin:'#f1c5a5',style:'long',hat:'beret',instrument:true},
 pilot: {hair:'#a8392d',coat:'#6f4736',trim:'#c4ac8a',skin:'#ecc09a',style:'spiky',goggles:true},
 scholar: {hair:'#202b42',coat:'#233b68',trim:'#d8b555',skin:'#ebc0a1',style:'short',glasses:true},
 healer: {hair:'#b49063',coat:'#eee6d2',trim:'#c5a458',skin:'#f2d0b2',style:'long',hat:'hood'},
 ranger: {hair:'#ad4034',coat:'#754936',trim:'#c0a581',skin:'#efc39f',style:'short',hat:'beret',hatColor:'#a83936'},
 paladin: {hair:'#d2b773',coat:'#386282',trim:'#d9dce0',skin:'#f2d0a9',style:'short',armor:true},
 monk: {hair:'#ca632d',coat:'#a83936',trim:'#deb64f',skin:'#f2bd93',style:'buns'},
 guard: {hair:'#20212b',coat:'#69778b',trim:'#923c44',skin:'#efc3a4',style:'pony',armor:true,scarf:true},
 wanderer: {hair:'#7e7b84',coat:'#4e4844',trim:'#98846b',skin:'#e0b394',style:'short',hat:'hood'},
 witch: {hair:'#c4c6dc',coat:'#344768',trim:'#caaa62',skin:'#f1cbb5',style:'long',hat:'witch',staff:true}
};
const elementary = ['scout','knight','bard','pilot','scholar','healer','ranger','paladin','monk','guard','wanderer','witch'];
const junior = ['pilot','ranger','knight','wanderer','scout','guard','paladin','monk','healer','scholar','witch','bard'];
function sprite(p, dir) {
 const parts = [];
 const r = (x,y,w,h,c) => parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`);
 const poly=(points,color)=>parts.push(`<polygon points="${points}" fill="${color}"/>`);
 const light = color => '#' + color.slice(1).match(/../g).map(v=>Math.min(255,parseInt(v,16)+24).toString(16).padStart(2,'0')).join('');
 const side = dir==='left'||dir==='right', back=dir==='up', outline='#273342';
 // Draw right-facing poses by reflecting the complete left pose.
 if(dir==='right')parts.push('<g transform="translate(32 0) scale(-1 1)">');
 r(6,44,21,3,'#26435b33');
 r(side?12:8,37,6,8,outline);r(side?17:19,37,5,8,outline);
 r(side?11:7,44,8,2,'#594b49');r(side?17:18,44,7,2,'#594b49');
 // Hair behind the coat, including the silhouette that identifies each candidate.
 if(p.style==='long'||p.style==='pony'){r(6,15,21,22,p.hair);r(7,31,4,8,p.hair);r(23,30,4,7,p.hair);}
 if(p.style==='pony'){r(side?23:25,8,5,24,p.hair);r(side?25:27,12,3,16,p.hair);r(24,10,4,3,p.trim);}
 r(side?10:6,24,side?15:21,15,outline);r(side?11:7,25,side?13:19,13,p.coat);
 r(side?14:9,27,side?7:14,8,p.coat);r(side?12:8,28,2,7,light(p.coat));r(side?22:24,28,3,9,outline);
 r(side?22:24,29,2,6,p.coat);r(side?22:24,35,3,3,p.skin);
 if(!side){r(4,27,4,10,outline);r(5,28,3,7,p.coat);r(5,35,3,3,p.skin);}
 r(side?12:8,37,side?11:17,2,p.trim);
 if(p.armor){r(side?20:4,25,side?6:8,5,p.trim);if(!side)r(23,25,6,5,p.trim);r(side?12:10,29,side?8:12,5,'#acbac9');r(side?12:10,29,2,5,'#e0e5e6');}
 if(!back&&!side){r(16,27,1,10,p.trim);r(17,29,1,1,'#e9dca5');r(17,33,1,1,'#e9dca5');}
 if(back){r(11,27,11,7,p.trim);r(12,28,9,5,p.coat);r(10,27,2,11,p.trim);r(22,27,2,11,p.trim);}
 // Oversized head, face, fringe and directional nose/eye.
 poly('9,7 25,7 25,9 28,9 28,22 26,22 26,25 9,25 9,23 7,23 7,10 9,10',outline);poly('10,8 24,8 24,10 27,10 27,21 25,21 25,24 10,24 10,22 8,22 8,11 10,11',p.hair);r(12,9,9,2,light(p.hair));if(back){r(10,13,2,7,light(p.hair));r(24,12,1,8,light(p.hair));}
 if(!back){r(side?6:9,12,side?13:15,11,p.skin);r(side?5:10,16,side?3:3,4,p.skin);
   if(side){r(7,15,2,3,outline);r(7,15,1,1,'#fff1da');r(5,19,3,2,'#d4967c');r(8,22,5,1,'#b87567');}
   else {r(11,16,2,3,outline);r(21,16,2,3,outline);r(11,16,1,1,'#fff1da');r(21,16,1,1,'#fff1da');r(16,22,3,1,'#bc7b6c');r(10,20,3,1,'#df9a86');r(22,20,2,1,'#df9a86');}
   r(side?10:9,10,side?16:17,4,p.hair);r(side?16:9,13,4,3,p.hair);r(side?23:24,13,3,8,p.hair);
 }
 if(p.style==='spiky'){r(7,6,20,3,p.hair);r(10,3,4,5,p.hair);r(17,2,4,6,p.hair);r(23,4,4,5,p.hair);r(4,10,4,4,p.hair);r(27,8,3,4,p.hair);}
 if(p.style==='buns'){r(3,5,7,8,p.hair);r(25,5,6,8,p.hair);r(4,7,5,2,p.trim);r(26,7,4,2,p.trim);}
 if(p.scarf){r(side?10:7,24,side?15:20,4,p.trim);r(back?12:side?21:23,27,4,9,p.trim);}
 if(p.glasses&&!back){if(side){r(5,15,6,1,outline);r(5,15,1,5,outline);r(10,15,1,5,outline);r(5,19,6,1,outline);r(11,15,12,1,outline);}else{r(9,15,7,1,outline);r(18,15,7,1,outline);r(9,19,7,1,outline);r(18,19,7,1,outline);[9,15,18,24].forEach(x=>r(x,15,1,5,outline));r(16,16,2,1,outline);}}
 if(p.goggles){r(7,8,20,3,'#443e39');if(!back){r(side?7:9,7,side?6:7,5,'#9aadb9');if(!side)r(19,7,7,5,'#9aadb9');r(side?8:10,8,4,2,'#d2e1e5');}}
 if(p.hat==='beret'){r(6,5,22,6,p.hatColor||p.trim);r(9,2,16,4,p.hatColor||p.trim);r(8,10,19,2,p.hatColor||p.trim);if(p.instrument){r(25,2,2,7,'#dfc991');r(27,1,2,4,'#f2e0b1');}}
 if(p.hat==='hood'){r(5,7,4,18,p.coat);r(26,7,4,18,p.coat);r(7,4,20,5,p.coat);r(9,2,16,3,p.coat);r(5,7,2,18,p.trim);r(28,7,2,18,p.trim);if(back){r(8,7,19,16,p.coat);r(16,5,2,17,p.trim);}}
 if(p.hat==='witch'){r(3,9,27,4,p.trim);r(5,7,23,4,p.coat);r(10,2,14,7,p.coat);r(14,0,9,3,p.coat);r(23,2,5,3,p.coat);r(9,8,17,2,p.trim);}
 if(p.instrument){r(back?10:side?18:9,30,9,9,'#ad774a');r(back?13:side?21:12,27,3,12,'#e0b77b');r(back?15:side?23:14,22,2,12,'#735244');}
 if(p.staff){r(side?27:28,23,2,22,'#a28b6b');r(side?25:26,21,6,4,'#d9c38d');r(side?27:28,19,2,3,'#8fafcf');}
 if(dir==='right')parts.push('</g>');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48" shape-rendering="crispEdges">${parts.join('')}</svg>\n`;
}
for(const [prefix,list] of [['e',elementary],['j',junior]])list.forEach((type,i)=>{
 const p={...types[type]};if(prefix==='j'&&type==='guard'){p.hair='#713835';p.coat='#7b343d';p.trim='#baab78';}if(prefix==='j'&&type==='wanderer')p.hair='#798e99';
 for(const dir of ['up','down','left','right'])fs.writeFileSync(path.join(__dirname,'../img/adventure/travelers',`${prefix}${i+1}-${dir}.svg`),sprite(p,dir));
});
