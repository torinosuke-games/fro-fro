// 第1回の見本だけを実行時に注入。問題ファイルは変更しない。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/math7-diagram-samples');
const samples=require(path.join(out,'samples.json'));
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:1000},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.FF_TEST_URL||pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
 const report=[];
 for(const [i,sample] of samples.entries()){
  const result=await page.evaluate(({id,diagram})=>{
   document.documentElement.dataset.theme='day';
   const q=JSON.parse(JSON.stringify(FF.app.bank.byId[id]));if(!q.id)throw Error(id);q.diagram=diagram;
   const st=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),7);st.player.name='ゆき';FF.app.state=st;
   FF.app.session={renewal:true,sel:{subject:'math',grade:7,unit:q.unit,difficulty:'random',answerType:q.answerType,resource:'wood'},recentIds:[],items:{},currentId:id,order:[id],cursor:0};
   FF.app.session.items[id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
   FF.ui.show('quiz');return {question:q.question,answer:q.answer};
  },sample);
  await page.evaluate(()=>document.fonts.ready);
  const fig=page.locator('.question-card .lesson-figure');await fig.waitFor();
  const geometry=await fig.evaluate(fig=>{
   const svg=fig.querySelector('svg'),v=svg.viewBox.baseVal;
   return {width:fig.getBoundingClientRect().width,overflow:document.documentElement.scrollWidth>innerWidth+1,
    clipped:[...svg.querySelectorAll('text')].filter(t=>{const b=t.getBBox();return b.x<0||b.y<0||b.x+b.width>v.width+1||b.y+b.height>v.height+1}).map(t=>t.textContent),
    text:[...svg.querySelectorAll('text')].map(t=>t.textContent)};
  });
  assert.equal(geometry.overflow,false,sample.id+' page overflow');assert.deepEqual(geometry.clipped,[],sample.id+' clipped');
  assert.ok(geometry.width>=300,sample.id+' diagram too narrow');
  const file=String(i+1).padStart(2,'0')+'-'+sample.id+'.png';
  // 問題カード全体を390px viewportの実画面で撮影（長い問題も切り取らない）。
  await page.screenshot({path:path.join(out,file),fullPage:true});
  if(process.env.FF_MATH7_CROPS){fs.mkdirSync(process.env.FF_MATH7_CROPS,{recursive:true});await fig.screenshot({path:path.join(process.env.FF_MATH7_CROPS,file)});}
  report.push({...sample,...result,file,geometry});
 }
 assert.deepEqual(errors,[]);await browser.close();
 fs.writeFileSync(path.join(out,'inspection.json'),JSON.stringify(report,null,2)+'\n');
 let md='# 中1数学 第1回 図の見本\n\n390px幅・実際の問題画面。問題データは変更せず、撮影時だけ図を注入した。答えは照合用にこの一覧へ記載し、未回答の図中には追加しない。選択肢にある答えは通常の問題画面の表示。\n\n再撮影: `node tests/ui-math7-diagram-samples.cjs`（Chromium、playwright）。設定は samples.json、機械検査記録は inspection.json。\n\n|種類|問題ID|問題文|答え（照合用）|スクリーンショット|\n|---|---|---|---|---|\n';
 for(const r of report)md+='|'+[r.diagram.kind,r.id,r.question.replaceAll('|','\\|'),r.answer.replaceAll('|','\\|'),'[見本]('+r.file+')'].join('|')+'|\n';
 md+='\n確認：ページの横はみ出し・SVG文字の見切れなし。全見本を目視し、文字の重なりと可読性を確認。寸法・座標・角度と答えの点を描かない条件は tests/cases/math7-diagram-samples.js でも検証する。通常の目盛りは共通制約の例外として表示する。文字量は模式図、錐の母線だけが既知の問題では高さの数値を表示しない。\n';
 fs.writeFileSync(path.join(out,'SAMPLES.md'),md);console.log('PASS: '+report.length+' samples at 390px');
})().catch(e=>{console.error(e);process.exit(1)});
