// 持ち物・装備（判断359）：持ち物の画面（武器・防具・道具）、編成画面での装備の入れかえ、装備中の品物を別の人に付けるときの確認
const {chromium}=require(process.env.FF_PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict'),fs=require('node:fs');
const out=process.env.FF_QA_OUTPUT||'/tmp/fro-inventory';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FF_BROWSER_PATH||undefined});
const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route(/https:\/\/fonts\./,r=>r.abort());
await p.goto(process.env.FF_TEST_URL,{waitUntil:'domcontentloaded'});
await p.locator('.title-card input').fill('ゆき');await p.locator('.title-card .btn.primary').click();await p.getByRole('button',{name:'小学4年',exact:true}).click();await p.locator('.avatar-pick').first().click();await p.locator('.intro-line + button').click();
await p.evaluate(()=>{let s=FF.shop.addGold(FF.app.state,5000);for(const w of ['stone_sword','iron_sword'])s=FF.shop.buy(s,w).state;s=FF.shop.buyArmor(s,'iron_armor').state;FF.app.commit(s);FF.ui.show('base');});
await p.waitForTimeout(400);
// 町から、持ち物の画面へ
await p.getByRole('button',{name:'持ち物',exact:true}).click();
assert.equal(await p.evaluate(()=>FF.app.screen),'adventureInventory');
assert.equal(await p.locator('.inv-row').count(),3);                                    // 武器：木・石・鉄
assert.ok((await p.locator('.inv-row[data-item="wood_sword"]').innerText()).includes('ゆき'));   // 木の剣は、主人公が装備
assert.ok((await p.locator('.inv-row[data-item="iron_sword"]').innerText()).includes('だれも装備していない'));
await p.screenshot({path:out+'/inventory-weapon.png',fullPage:true});
// 鉄の剣を、アカネ（剣士）に装備
await p.locator('.inv-row[data-item="iron_sword"] .inv-equip').click();
await p.locator('.inv-pick[data-member="kenshi"]').click();
assert.equal(await p.evaluate(()=>FF.shop.holder(FF.app.state,'weapon','iron_sword')),'kenshi');
assert.ok((await p.locator('.inv-row[data-item="iron_sword"]').innerText()).includes('アカネ'));
// 主人公が、アカネの鉄の剣を装備しようとすると、確認のメッセージが出る（「やめる」で、何も変わらない）
await p.locator('.inv-row[data-item="iron_sword"] .inv-equip').click();
await p.locator('.inv-pick[data-member="hero"]').click();
const msg=await p.locator('.overlay').innerText();assert.ok(msg.includes('アカネが装備しています'),msg);
await p.screenshot({path:out+'/inventory-confirm.png'});
await p.getByRole('button',{name:'やめる',exact:true}).click();
assert.equal(await p.evaluate(()=>FF.shop.holder(FF.app.state,'weapon','iron_sword')),'kenshi');
// 「はい」で、入れかわる
await p.locator('.inv-row[data-item="iron_sword"] .inv-equip').click();
await p.locator('.inv-pick[data-member="hero"]').click();
await p.getByRole('button',{name:'はい',exact:true}).click();
assert.equal(await p.evaluate(()=>FF.shop.holder(FF.app.state,'weapon','iron_sword')),'hero');
assert.equal(await p.evaluate(()=>FF.shop.equippedOf(FF.app.state,'kenshi').weapon),null);
// 防具・道具のタブ
await p.locator('.inv-tab[data-tab="armor"]').click();assert.ok((await p.locator('.inv-panel').innerText()).includes('鉄のよろい'));
await p.locator('.inv-tab[data-tab="item"]').click();assert.ok((await p.locator('.inv-panel').innerText()).includes('回復薬'));
// 編成の画面：各メンバーの、ステータスと装備。ここで入れかえる
await p.evaluate(()=>FF.ui.show('adventureParty'));await p.waitForTimeout(300);
const card=p.locator('.adv-roster-card:not(.adv-roster-locked)',{hasText:'ガルド'});
assert.ok((await card.locator('.adv-gear').innerText()).includes('なし')||(await card.locator('.adv-gear').innerText()).includes('だれも'));
await card.locator('.adv-gear-row[data-gear="armor"] .adv-gear-btn').click();
await p.locator('.inv-pick[data-item="iron_armor"]').click();
assert.equal(await p.evaluate(()=>FF.shop.holder(FF.app.state,'armor','iron_armor')),'juushouhei');
assert.ok((await card.locator('.adv-stats').innerText()).includes('+10'));              // ぼうぎょ 19（+10）
await p.screenshot({path:out+'/party-gear.png',fullPage:true});
for(const w of [360,768]){await p.setViewportSize({width:w,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
assert.deepEqual(errors,[]);console.log('PASS: inventory tabs, holders, confirm before taking an equipped item, party gear');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
