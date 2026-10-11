// Canvas のフィールドの、地面と地図の外の雪原の絵を焼く（判断390）。地図（FF.adventure.MAP）や、地面の見た目を変えたら、これを実行して、できた絵をコミットする。
//   node tests/tools/bake-canvas-ground.cjs
// 出力：img/adventure/canvas/ground-<地図の指紋>.webp、plain.webp（古い ground-*.webp は消す）
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../..'),OUT=path.join(ROOT,'img/adventure/canvas');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json'};
(async()=>{
 const server=http.createServer((q,r)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/,'')||'index.html');fs.readFile(fs.existsSync(f)&&fs.statSync(f).isDirectory()?path.join(f,'index.html'):f,(e,d)=>{if(e){r.writeHead(404);r.end();return;}r.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});r.end(d);});});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage();
 await p.goto('http://127.0.0.1:'+server.address().port+'/index.html',{waitUntil:'load'});
 const r=await p.evaluate(async()=>{const a=await FF.ui.fieldCanvas.bakeAssets(FF.adventure.MAP);return {key:a.key,ground:a.ground.toDataURL('image/webp',.8),plain:a.plain.toDataURL('image/webp',.8),gw:a.ground.width,gh:a.ground.height};});
 await b.close();server.close();
 for(const f of fs.readdirSync(OUT))if(/^ground-.*\.webp$/.test(f))fs.unlinkSync(path.join(OUT,f));
 const save=(name,url)=>{const buf=Buffer.from(url.split(',')[1],'base64');fs.writeFileSync(path.join(OUT,name),buf);console.log(name,buf.length+' bytes');};
 save('ground-'+r.key+'.webp',r.ground);save('plain.webp',r.plain);console.log('ground canvas',r.gw+'x'+r.gh);
})().catch(e=>{console.error(e);process.exit(1);});
