// Reference-only geometry; no labels or QA markers are shipped in the game.
'use strict';
function inside(p,ring){let hit=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
function segmentDistance(p,a,b){const x=b[0]-a[0],y=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*x+(p[1]-a[1])*y)/(x*x+y*y||1)));return Math.hypot(p[0]-a[0]-t*x,p[1]-a[1]-t*y);}
function distance(p,rings){return Math.min(...rings.map(r=>Math.min(...r.slice(1).map((b,i)=>segmentDistance(p,r[i],b)))));}
function project(p,b){const scale=Math.min(340/(b[3]-b[1]),440/((b[2]-b[0])*.79));return [260+(p[0]-(b[0]+b[2])/2)*.79*scale,215-(p[1]-(b[1]+b[3])/2)*scale];}
module.exports={inside,distance,project};
