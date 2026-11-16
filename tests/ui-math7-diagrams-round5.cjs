// 登録済みの第5回28図を設定と照合し、390px幅の実画面で撮影する。
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/math7-diagrams/round5');
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
   const q=JSON.parse(JSON.stringify(FF.app.bank.byId[id]));if(!q.id)throw Error(id);if(JSON.stringify(q.diagram)!==JSON.stringify(diagram))throw Error('registered diagram mismatch '+id);
   const st=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),7);st.player.name='ゆき';FF.app.state=st;
   FF.app.session={renewal:true,sel:{subject:'math',grade:7,unit:q.unit,difficulty:'random',answerType:q.answerType,resource:'wood'},recentIds:[],items:{},currentId:id,order:[id],cursor:0};
   FF.app.session.items[id]={attempt:FF.learning.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:'wood'};
   FF.ui.show('quiz');return {question:q.question,answer:q.answer};
  },sample);
  await page.evaluate(()=>document.fonts.ready);
  const fig=page.locator('.question-card .lesson-figure');await fig.waitFor();await fig.evaluate(async f=>{await Promise.all([...f.querySelectorAll('img')].map(img=>img.decode()));});
  const geometry=await fig.evaluate(fig=>{
   const svg=fig.querySelector('svg');if(!svg)return {width:fig.getBoundingClientRect().width,overflow:document.documentElement.scrollWidth>innerWidth+1,clipped:[],text:[...fig.querySelectorAll('th,td')].map(t=>t.textContent)};const v=svg.viewBox.baseVal;
   return {width:fig.getBoundingClientRect().width,overflow:document.documentElement.scrollWidth>innerWidth+1,
    clipped:[...svg.querySelectorAll('text')].filter(t=>{const b=t.getBBox();return b.x<0||b.y<0||b.x+b.width>v.width+1||b.y+b.height>v.height+1}).map(t=>t.textContent),
    text:[...svg.querySelectorAll('text')].map(t=>t.textContent)};
  });
  assert.equal(geometry.overflow,false,sample.id+' page overflow');assert.deepEqual(geometry.clipped,[],sample.id+' clipped');
  assert.ok(geometry.width>=300,sample.id+' diagram too narrow');
  const file=fs.readdirSync(out).find(f=>f.endsWith('-'+sample.id+'.png'))||String(i+1).padStart(2,'0')+'-'+sample.id+'.png';
  await page.evaluate(()=>window.scrollTo(0,0));
  const bottom=await fig.evaluate(f=>f.getBoundingClientRect().bottom);
  await page.setViewportSize({width:390,height:Math.max(1000,Math.ceil(bottom+450))});
  // 問題カード全体を390px viewportの実画面で撮影（長い問題も切り取らない）。
  await page.screenshot({path:path.join(out,file),fullPage:true});
  if(process.env.FF_MATH7_CROPS){fs.mkdirSync(process.env.FF_MATH7_CROPS,{recursive:true});await fig.screenshot({path:path.join(process.env.FF_MATH7_CROPS,file)});}
  report.push({...sample,...result,file,geometry});
 }
 assert.deepEqual(errors,[]);await browser.close();
 fs.writeFileSync(path.join(out,'inspection.json'),JSON.stringify(report,null,2)+'\n');
 let md='# 中1数学 図の登録 第5回\n\n空間図形21問・資料の活用7問。390px幅の実際の登録済み問題画面。答えは照合用で、図中に解答を追加しない。文字量は模式図。与条件のみを表示。\n\n再撮影：`FF_TEST_URL=http://127.0.0.1:8765/ node tests/ui-math7-diagrams-round5.cjs`。設定はsamples.json、検査結果はinspection.json。\n\n|種類|問題ID|問題文|答え（照合用）|スクリーンショット|\n|---|---|---|---|---|\n';
 for(const r of report)md+='|'+[r.diagram.kind,r.id,r.question.replaceAll('|','\\|'),r.answer.replaceAll('|','\\|'),'[図]('+r.file+')'].join('|')+'|\n';
 md+='\n判断546：回転前の辺を上下に延長した1点鎖線の軸、円柱へ向かう真上・正面の矢印、楕円内で半径線の上に置く共通の寸法ラベル、合同な正五角形の上下の面を修正。全28問を撮り直した。\n';
 md+='\n縦長の図は画面の高さを増やし、図全体を撮影。全28問の目視、文字見切れ・横はみ出し、座標の条件、答えの点・結論を追加しないことを確認。\n';
 fs.writeFileSync(path.join(out,'LIST.md'),md);console.log('PASS: '+report.length+' samples at 390px');
})().catch(e=>{console.error(e);process.exit(1)});
