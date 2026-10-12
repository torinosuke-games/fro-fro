/* Four-direction strips may be assembled per SPRITE_REQUESTS_2.md / SPRITE_REQUESTS_3.md.
   This only extracts, resizes and places generated sprites. No painted pose changes. */
const sharp=require('sharp'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const input=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const root=path.resolve(__dirname,'../../..');
(async()=>{const layers=[],frames=[];
for(let row=0;row<4;row++){
 const base=await sharp(input.paths[row]).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 for(let col=0;col<4;col++){
  const override=input.overrides?.[row+','+col],source=override||input.paths[row];
  const {data,info}=override?await sharp(override).ensureAlpha().raw().toBuffer({resolveWithObject:true}):base;
  const left=override?0:Math.round(col*info.width/4),right=override?info.width:Math.round((col+1)*info.width/4);let x0=right,x1=left,y0=info.height,y1=0;
  for(let y=0;y<info.height;y++)for(let x=left;x<right;x++)if(data[(y*info.width+x)*4+3]>20){x0=Math.min(x0,x);x1=Math.max(x1,x+1);y0=Math.min(y0,y);y1=Math.max(y1,y+1);}
  assert.ok(x1>x0,'Empty cell');const headXs=[];
  for(let y=Math.round(y0+(y1-y0)*.12);y<Math.round(y0+(y1-y0)*.26);y++)for(let x=x0;x<x1;x++)if(data[(y*info.width+x)*4+3]>100)headXs.push(x);
  headXs.sort((a,b)=>a-b);const anchor=headXs[Math.floor(headXs.length/2)],height=400,width=Math.round((x1-x0)*height/(y1-y0));
  const sprite=await sharp(source).extract({left:x0,top:y0,width:x1-x0,height:y1-y0}).resize(width,height).png().toBuffer();
  const dx=Math.round(256-(anchor-x0)*height/(y1-y0)),dy=72;assert.ok(dx>=0&&dx+width<=512,'Cell overflow');
  layers.push({input:sprite,left:col*512+dx,top:row*512+dy});frames.push({row,col,sourceBounds:[x0,y0,x1,y1],placement:[dx,dy,width,height],anchorMethod:'median alpha head region; stable upright head/body axis'});
 }
}
const output=path.join(root,'img/adventure/travelers/'+(input.diagonal?input.name+'-wd.png':input.name+'-w.png'));
await sharp({create:{width:2048,height:2048,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(layers).png().toFile(output);
const{data,info}=await sharp(output).raw().toBuffer({resolveWithObject:true});assert.equal(info.width,2048);assert.equal(info.height,2048);assert.equal(info.channels,4);
const bootWidths=[];
for(let row=0;row<4;row++)for(let col=0;col<4;col++){
 let x0=512,x1=0,y0=512,y1=0,footX0=512,footX1=0;
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){const i=((row*512+y)*2048+col*512+x)*4;if(data[i+3]>20){x0=Math.min(x0,x);x1=Math.max(x1,x+1);y0=Math.min(y0,y);y1=Math.max(y1,y+1);const bootPixel=input.bootColor==='brown'?data[i]>data[i+1]*1.05&&data[i+1]>data[i+2]*1.05&&data[i]<data[i+1]*2.5:true;if(y>=390&&bootPixel){footX0=Math.min(footX0,x);footX1=Math.max(footX1,x+1);}}}
 assert.ok(Math.abs(y1-472)<=1&&Math.abs(y1-y0-400)<=1,'Height / ground mismatch');assert.ok(x0>0&&x1<512,'Boundary collision');
 Object.assign(frames[row*4+col],{bounds:[x0,y0,x1,y1],height:y1-y0,ground:y1,bootSpan:footX1-footX0});bootWidths.push(footX1-footX0);
}
for(const row of (input.diagonal?[0,1,2,3]:[2,3])){const widths=bootWidths.slice(row*4,row*4+4);assert.ok(widths[0]>widths[1]&&widths[2]>widths[3],`Open/closed foot silhouette missing in row ${row}`);if(input.diagonal)assert.ok(Math.min(widths[0],widths[2])-Math.max(widths[1],widths[3])>=15,`Contact/passing silhouette difference too small in row ${row}`);}
fs.writeFileSync(path.join(root,'codex-prototypes/traveler-walk/'+(input.recordDirectory||input.name)+'/results.json'),JSON.stringify({name:input.name,size:[2048,2048],rgba:true,cell:512,groundLine:472,height:400,bootSpanMethod:input.bootColor==='brown'?'Brown pixels in bottom 82px: R>1.05G, G>1.05B, R<2.5G; excludes purple scarf and red edge artifacts':'Alpha>20 in bottom 82px',frames,checks:['16 nonempty frames','RGBA transparent PNG','400px height / 472px foot baseline','No cell overflow',input.diagonal?'All four diagonal rows: contact lower-boot silhouettes at least 15px wider than passing':'Left and right open/closed lower-boot silhouettes'],approval:'Character, anatomy and loop timing require visual review'},null,2));console.log(output);console.log('Foot spans:',bootWidths);
})().catch(e=>{console.error(e);process.exit(1)});
