// 確認ページ（Artifact）用に、<script> を数個のかたまりにまとめる（判断501）。
// 確認ページは 1つにつきファイル数の上限（511）があるので、JS・問題データ約110ファイルを、約1.2MB（約45万文字）ずつのかたまり（bundle-N.js）にする。
// 使い方：node tests/tools/build-artifact-stage.cjs <出力フォルダ> [--debug]   → <出力>/index.html と bundle-N.js。最後に、公開に使う files の JSON（bundle と、もとの個別ファイルを消す null）を files.json に書く
const fs=require('fs'),path=require('path'),cp=require('child_process');
const root=path.resolve(__dirname,'..','..'),out=process.argv[2],debug=process.argv.includes('--debug');fs.mkdirSync(out,{recursive:true});
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const re=/\s*<script\s+src="([^"]+)"><\/script>/g;const scripts=[...html.matchAll(re)].map(m=>m[1].split('?')[0]);
const MAX=450000;/* 文字数（日本語は1文字3バイトなので、約1.2MB） */const bundles=[];let cur=[],size=0;
scripts.forEach(f=>{const t=fs.readFileSync(path.join(root,f),'utf8');if(size+t.length>MAX&&cur.length){bundles.push(cur);cur=[];size=0;}cur.push('/* '+f+' */\n'+t+'\n;');size+=t.length;});
if(cur.length)bundles.push(cur);
fs.readdirSync(out).filter(f=>/^bundle-\d+\.js$/.test(f)).forEach(f=>fs.unlinkSync(path.join(out,f)));
bundles.forEach((b,i)=>fs.writeFileSync(path.join(out,'bundle-'+(i+1)+'.js'),b.join('\n')));
// 最初の <script src> のところに、まとめたものを入れる（FF_DEBUG の印は、そのまえ）
const first=html.search(re);
html=html.replace(re,'');
const tags=(debug?'  <script>window.FF_DEBUG = true;</script>\n':'')+bundles.map((_,i)=>'  <script src="bundle-'+(i+1)+'.js"></script>\n').join('');
html=html.replace('</body>',tags+'</body>');
if(debug)html=html.replace('<title>FROZEN FRONTIER</title>','<title>FROZEN FRONTIER DEBUG</title>');
fs.writeFileSync(path.join(out,'index.html'),html);
// いま main にあって確認ページにも個別に載っているファイル（→ null で消す）
const tracked=new Set(cp.execSync('git ls-tree -r origin/main --name-only',{cwd:root}).toString().split('\n'));
const files={};bundles.forEach((_,i)=>files['bundle-'+(i+1)+'.js']=path.join(out,'bundle-'+(i+1)+'.js'));
scripts.forEach(f=>{if(tracked.has(f))files[f]=null;});
fs.writeFileSync(path.join(out,'files.json'),JSON.stringify(files,null,1));
console.log(bundles.length+'個のかたまり、個別ファイル '+scripts.length+'個、うち消すもの '+scripts.filter(f=>tracked.has(f)).length+'個');
