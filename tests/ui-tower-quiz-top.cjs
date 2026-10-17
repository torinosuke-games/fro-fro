// 夜の防衛戦：長い問題が出ても、問題文（上）から見える（下のボタンまで、勝手にスクロールされない）。ほかの画面のウィンドウも同じ
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const b=await chromium.launch({headless:true,...(process.env.FF_BROWSER_PATH?{executablePath:process.env.FF_BROWSER_PATH}:{})});
 const p=await b.newPage({viewport:{width:360,height:640}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.FF_TEST_URL||pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'domcontentloaded'});
 await p.evaluate(()=>{const s=FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()),5);s.player.avatar='e1';s.adventure.started=true;FF.app.state=s;
  FF.adventure.pick=()=>({id:'x1',subject:'math',gradeLevel:5,difficulty:'basic',answerType:'choice',question:'とても長い問題文です。'.repeat(12)+'\n'+'次の図を見て、答えなさい。'.repeat(6),choices:['アイウエオ','カキクケコ','サシスセソ','タチツテト'],answer:'アイウエオ',explanation:''});FF.ui.show('tower');});
 await p.waitForTimeout(300);await p.locator('[data-act="start"]').click();await p.waitForTimeout(500);
 await p.locator('[data-act="quiz"]').click();await p.waitForTimeout(300);
 const m=await p.evaluate(()=>{const mo=document.querySelector('.modal'),h=mo.querySelector('h2'),q=document.querySelector('.tw-quiz-q');return {scroll:mo.scrollTop,tall:mo.scrollHeight>mo.clientHeight,title:h.getBoundingClientRect().top,q:q.getBoundingClientRect().top,vh:innerHeight}});
 assert.equal(m.scroll,0);assert.ok(m.tall,'長い問題（スクロールが要る）');assert.ok(m.title>=0&&m.q>=0&&m.q<m.vh,'問題文が見える');
 assert.deepEqual(errors,[]);await b.close();console.log('PASS: long quiz opens at the top (title and question visible)');
})().catch(e=>{console.error(e);process.exit(1)});
