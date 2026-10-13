/* Crop/resize generated strips and keep adopted input cells for reproducible assembly.
   No painted pose changes or whole-character mirroring. */
const fs=require('node:fs'),sharp=require('sharp');
(async()=>{
 const [name,...paths]=process.argv.slice(2);if(!name||paths.length!==4)throw Error('name + four strip paths required');
 const dir='codex-prototypes/traveler-walk/'+name+'-diagonal';fs.mkdirSync(dir,{recursive:true});const overrides={},crops=[];
 for(let row=0;row<4;row++){
  const src=paths[row],{data,info}=await sharp(src).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  for(let col=0;col<4;col++){
   const left=Math.round(col*info.width/4),right=Math.round((col+1)*info.width/4),seen=new Uint8Array(info.width*info.height);let best=[];
   for(let y=0;y<info.height;y++)for(let x=left;x<right;x++){
    const i=y*info.width+x;if(seen[i]||data[i*4+3]<=20)continue;const q=[i];seen[i]=1;
    for(let k=0;k<q.length;k++){const v=q[k],vx=v%info.width,vy=Math.floor(v/info.width);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=vx+dx,ny=vy+dy,j=ny*info.width+nx;if(nx>=left&&nx<right&&ny>=0&&ny<info.height&&!seen[j]&&data[j*4+3]>20){seen[j]=1;q.push(j);}}}
    if(q.length>best.length)best=q;
   }
   if(!best.length)throw Error('Empty cell');let x0=right,y0=info.height,x1=left,y1=0;
   for(const v of best){const x=v%info.width,y=Math.floor(v/info.width);x0=Math.min(x0,x);x1=Math.max(x1,x+1);y0=Math.min(y0,y);y1=Math.max(y1,y+1);}
   const out=dir+'/frame-'+row+'-'+col+'.png';await sharp(src).extract({left:x0,top:y0,width:x1-x0,height:y1-y0}).png().toFile(out);overrides[row+','+col]=out;crops.push({row,col,source:src,sourceSize:[info.width,info.height],bounds:[x0,y0,x1,y1],method:'Bounding box of main connected character, alpha>20'});
  }
 }
 fs.writeFileSync(dir+'/assembly-input.json',JSON.stringify({name,diagonal:true,recordDirectory:name+'-diagonal',bootColor:name==='j6'?undefined:'brown',paths:Array(4).fill(overrides['0,0']),overrides},null,2));
 fs.writeFileSync(dir+'/crops.json',JSON.stringify(crops,null,2));
 const review=fs.readFileSync('codex-prototypes/traveler-walk/e1-diagonal/review.html','utf8').replaceAll('e1-wd',name+'-wd').replaceAll('e1-d',name+'-d').replaceAll('e1 の',name+' の').replaceAll('e1の',name+'の').replaceAll('e1 な',name+' な').replace('href="../review.html"','href="../'+name+'/review.html"');
 fs.writeFileSync(dir+'/review.html',review);
})().catch(e=>{console.error(e);process.exit(1)});
