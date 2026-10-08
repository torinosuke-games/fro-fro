// Tablet-sized real browser: an update, checkpoint recovery, file backup, code restore.
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-save-continuity';fs.mkdirSync(out,{recursive:true});
const oldStorage=cp.execFileSync('git',['show','origin/main:js/storage.js'],{encoding:'utf8'}),oldMain=cp.execFileSync('git',['show','origin/main:js/main.js'],{encoding:'utf8'});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||'/usr/bin/chromium'});
 const errors=[];const url=process.env.FF_TEST_URL||'http://127.0.0.1:8772/';
 async function setup(page){page.on('pageerror',e=>errors.push(e.message));await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//,r=>r.abort());await page.route(/https:\/\/.*\.supabase\.co\//,r=>r.abort());}
 async function check(page){assert.deepEqual(await page.evaluate(()=>({name:FF.app.state.player.name,resources:FF.app.state.resources,heat:FF.app.state.studyPoints,level:FF.app.state.buildings.furnace.level})),{name:'ゆき',resources:{wood:321,iron:42,stone:87,food:63},heat:1234,level:3});}
 try{
  const context=await browser.newContext({viewport:{width:911,height:884},acceptDownloads:true}),page=await context.newPage();await setup(page);
  const oldRoute=async route=>route.fulfill({contentType:'application/javascript',body:route.request().url().endsWith('/js/storage.js')?oldStorage:oldMain});
  await page.route(/\/js\/(storage|main)\.js$/,oldRoute);
  await page.goto(url,{waitUntil:'domcontentloaded'});
  await page.locator('.title-card input').fill('ゆき');await page.locator('.title-card .btn.primary').click();await page.getByRole('button',{name:'小学4年',exact:true}).click();await page.locator('.avatar-pick').first().click();await page.locator('.intro-line + button').click();
  await page.evaluate(()=>{const s=FF.util.clone(FF.app.state);s.resources={wood:321,iron:42,stone:87,food:63};s.studyPoints=1234;s.studyPointsEarnedTotal=2345;s.buildings.furnace.level=3;s.settings.furigana=false;s.settings.furiganaAuto=false;FF.app.commit(s);});
  // Same origin/key, genuinely older storage and boot code replaced by the new code.
  await page.unroute(/\/js\/(storage|main)\.js$/,oldRoute);await page.reload({waitUntil:'domcontentloaded'});await check(page);
  assert.equal(await page.evaluate(()=>FF.app.saveBlocked),false);
  for(let i=0;i<5&&await page.locator('.overlay').count();i++)await page.locator('.overlay').last().locator('button').first().click();
  await page.evaluate(()=>FF.app.commit(FF.state.createDefaultState(FF.app.now())));await page.evaluate(()=>FF.ui.show('settings'));
  const previous=page.locator('.save-recovery article').filter({hasText:'321'}).first();await previous.locator('button').click();await page.locator('.overlay button.primary').click();await check(page);
  await page.evaluate(()=>FF.ui.show('settings'));
  const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'バックアップファイルを保存',exact:true}).click();const download=await downloadPromise;const file=out+'/backup.json';await download.saveAs(file);const remote=JSON.parse(fs.readFileSync(file,'utf8'));
  assert.equal(remote.studyPoints,1234);assert.equal(remote.resources.wood,321);assert.ok(remote.integrity);
  await page.screenshot({path:out+'/recovery-tablet.png',fullPage:true});await context.close();
  // Unreadable save: neither startup nor auto-sync can overwrite it with empty data.
  const c2=await browser.newContext({viewport:{width:768,height:1024}}),p2=await c2.newPage();await setup(p2);
  let calls=0;await p2.route(/https:\/\/.*\.supabase\.co\//,r=>{calls++;return r.abort();});
  await p2.addInitScript(()=>{localStorage.setItem('frozenFrontier.save','{broken');localStorage.setItem('frozenFrontier.save.sync',JSON.stringify({enabled:true,code:'ABCDEFGHJKMNPQRS',deviceId:'test',rev:1,pushedAt:123,consentAt:123}));});
  await p2.goto(url,{waitUntil:'domcontentloaded'});await p2.locator('.overlay button.primary').click();await p2.waitForTimeout(2200);
  assert.equal(await p2.evaluate(()=>FF.app.saveBlocked),true);assert.equal(await p2.evaluate(()=>localStorage.getItem('frozenFrontier.save')),'{broken');assert.equal(calls,0);
  await p2.locator('input[type=file]').setInputFiles(file);await p2.locator('.overlay button.primary').click();await check(p2);assert.equal(await p2.evaluate(()=>FF.app.saveBlocked),false);await c2.close();
  // Code restore uses a fake server; no child's account is contacted or modified.
  const c3=await browser.newContext({viewport:{width:768,height:1024}}),p3=await c3.newPage();await setup(p3);
  let serverSave=remote,serverRev=1,pushes=0;
  await p3.route(/https:\/\/.*\.supabase\.co\//,r=>{if(r.request().url().endsWith('ff_push_save')){serverSave=JSON.parse(r.request().postData()).p_save;serverRev++;pushes++;}return r.fulfill({contentType:'application/json',headers:{'access-control-allow-origin':'*','access-control-allow-headers':'apikey, authorization, content-type','access-control-allow-methods':'POST, OPTIONS'},body:JSON.stringify({ok:true,rev:serverRev,save_json:serverSave})});});
  await p3.goto(url,{waitUntil:'domcontentloaded'});await p3.evaluate(()=>FF.ui.show('settings'));await p3.locator('.sync-link-open').click();await p3.locator('.sync-link-input').fill('ABCDEFGHJKMNPQRS');await p3.locator('.overlay button.primary').click();
  await p3.locator('.overlay button').filter({hasText:'ほかの'}).waitFor({timeout:8000}).catch(async e=>{console.error(await p3.locator('.overlay').allTextContents(),await p3.evaluate(()=>({error:FF.syncApp.record().lastError,enabled:FF.syncApp.record().enabled})));throw e;});assert.ok((await p3.locator('.overlay').innerText()).includes('321'));assert.ok((await p3.locator('.overlay').innerText()).includes('1234'));
  await p3.screenshot({path:out+'/cloud-comparison-tablet.png',fullPage:true});await p3.locator('.overlay button').filter({hasText:'ほかの'}).click();await p3.waitForFunction(()=>FF.app.state.studyPoints===1234);await check(p3);
  await p3.evaluate(()=>{const state=FF.util.clone(FF.app.state);state.resources.wood=322;FF.app.commit(state);});
  await p3.waitForFunction(()=>FF.syncApp.record().pushedAt===FF.app.state.updatedAt);assert.ok(pushes>0);assert.equal(serverSave.resources.wood,322);
  assert.deepEqual(errors,[]);console.log(JSON.stringify({status:'PASS',checks:'older-to-newer app retains full state, previous checkpoint restores progress, full JSON file export/import, unreadable save remains untouched and never auto-syncs zeros, code restores full resources/heat with visible balances',screenshots:out},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
