const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const context={FF:{},localStorage:{getItem:()=>null}};vm.createContext(context);vm.runInContext(fs.readFileSync('codex-prototypes/homepage/snow-journey.js','utf8'),context);const M=context.FF.snowJourney;
let bridge=[];M.grid.forEach((row,y)=>row.forEach((t,x)=>{if(t==='=')bridge.push({x,y})}));assert.ok(bridge.length>3);assert.ok(bridge.every(p=>p.x===25),'one straight bridge');
for(const b of bridge){for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
 if(!dx)continue;const shore={x:b.x+dx,y:b.y+dy};if(!M.walkable('field',shore.x,shore.y))continue;
 assert.equal(M.canMove('field',shore,b),false);assert.equal(M.canMove('field',b,shore),false);
 const step=M.nextStep('field',shore,-dx,-dy);assert.ok(!step||M.grid[step.y][step.x]!=='=','no diagonal slide onto bridge side');
}}
const first=bridge[0],last=bridge.at(-1);assert.ok(M.canMove('field',{x:25,y:first.y-1},first));assert.ok(M.canMove('field',last,{x:25,y:last.y+1}));
for(const destination of M.places){let from={x:4,y:24};const route=M.path('field',from,destination);assert.ok(route.length||destination.id==='home');for(const step of route){assert.ok(M.canMove('field',from,step));from=step;}}
// Regression: a walkable bank tile alongside a bridge must not become an entry.
const middle=bridge[Math.floor(bridge.length/2)],side={x:24,y:middle.y};M.grid[side.y][side.x]='.';
assert.equal(M.canMove('field',side,middle),false);assert.equal(M.nextStep('field',side,1,0),null);
for(let y=first.y-1;y<=middle.y;y++)M.grid[y][24]='.';
const detour=M.path('field',side,middle);assert.ok(detour.length>1);let prev=side;for(const step of detour){assert.ok(M.canMove('field',prev,step));prev=step;}
console.log('PASS: straight bridge, both ends accessible, side/diagonal entry blocked, pathfinding respects edges, destinations connected');
