// データの保存（サーバー同期。判断299）：設定でオンにする → コード → 同期 → 競合の選択。Chromium・file://・偽の保管庫（通信は横取り）
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict'), crypto = require('node:crypto');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
const OUT = process.env.FF_SHOT_DIR || null;
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const ctxA = await browser.newContext({ viewport: { width: 390, height: 900 } });   // 端末A（保存先を分けるため、別の context）
  const page = await ctxA.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  // 偽の保管庫（supabase/*.sql と同じ振る舞い）
  const profiles = {}, calls = [], attempts = {};
  const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' };
  const handler = async route => {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const name = req.url().split('/rpc/')[1], a = JSON.parse(req.postData() || '{}');
    calls.push(name);
    const h = k => crypto.createHash('sha256').update(k).digest('hex');
    const p = profiles[h(a.p_key || '')];
    let res;
    if (name === 'ff_create_profile') { if (p) res = { ok: false, error: 'exists' }; else { profiles[h(a.p_key)] = { rev: 0, save: null }; res = { ok: true }; } }
    else if (!p) res = { ok: false, error: 'not_found' };
    else if (name === 'ff_pull') res = { ok: true, rev: p.rev, save_json: p.save };
    else if (name === 'ff_push_save') { if (p.rev !== a.p_base_rev) res = { ok: false, error: 'conflict', rev: p.rev, save_json: p.save }; else { p.rev++; p.save = a.p_save; res = { ok: true, rev: p.rev }; } }
    else if (name === 'ff_push_attempts') { const t = attempts[h(a.p_key)] = attempts[h(a.p_key)] || {}; let n = 0; for (const r of a.p_rows) if (!(r.attempt_id in t)) { t[r.attempt_id] = r; n++; } res = { ok: true, inserted: n }; }
    else if (name === 'ff_delete_profile') { delete profiles[h(a.p_key)]; res = { ok: true }; }
    else res = { ok: false, error: 'unknown' };
    await route.fulfill({ status: 200, contentType: 'application/json', headers: CORS, body: JSON.stringify(res) });
  };
  const HOST = 'https://ivylealwkoatewbcxdeg.supabase.co/**';
  await ctxA.route(HOST, handler);
  const shot = async (n, pg) => { if (OUT) await (pg || page).screenshot({ path: path.join(OUT, n + '.png'), fullPage: false }); };
  const url = pathToFileURL(path.resolve(__dirname, '../index.html')).href + '?debug=1';
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => { document.documentElement.dataset.theme = 'day'; FF.app.state = FF.state.setPlayerGrade(FF.state.withUpdated(FF.state.createDefaultState(FF.app.now()), FF.app.now()), 4); FF.app.state.flags.introSeen = true; FF.app.save(); FF.ui.show('settings'); });
  assert.equal(calls.length, 0, 'オンにするまで通信しない');
  await page.waitForSelector('.sync-panel');
  await shot('sync-1-off');
  // オンにする：保護者の同意 → コード
  await page.locator('.sync-panel .btn.primary').click();
  await page.waitForSelector('.modal');
  assert.match(await page.locator('.modal').innerText(), /同意|どうい/);
  await shot('sync-2-consent');
  await page.locator('.modal .btn.primary').click();
  await page.waitForSelector('.sync-code');
  const code = (await page.locator('.sync-code').innerText()).trim();
  assert.match(code, /^[A-Z2-9]{4}(-[A-Z2-9]{4}){3}$/);
  await shot('sync-3-code');
  await page.locator('.modal .actions .btn').first().click();
  await page.waitForFunction(() => FF.storage.loadSync().rev === 1, null, { timeout: 8000 });
  assert.equal(Object.values(profiles)[0].rev, 1);
  assert.ok(!JSON.stringify(profiles).includes(code.replace(/-/g, '')), 'コードそのものは保管庫に送らない');
  await page.waitForSelector('.sync-panel');
  await shot('sync-4-on');
  // 本物の回答（learning.submitAnswer → app.commit）の履歴が、サーバーに1問ずつ届く
  const answered = await page.evaluate(() => {
    const app = FF.app;
    const q = Object.values(app.bank.byId).find(x => x.answerType === 'choice' && FF.learning.isGradeUnlocked(app.state, x.subject, x.gradeLevel));
    const att = FF.learning.startAttempt(q);
    const r = FF.learning.submitAnswer(app.state, att, att.choices ? att.question.answer : '', { now: app.now(), resource: 'wood' });
    app.commit(r.state);
    return { qid: q.id, pending: FF.syncApp.pending().count, hist: app.state.learning.history.length };
  });
  assert.ok(answered.hist >= 1 && answered.pending >= 1, JSON.stringify(answered));
  await page.evaluate(() => FF.syncApp.sync({ force: true }));
  const mine = Object.values(Object.values(attempts)[0] || {});
  assert.equal(mine.length, answered.hist);
  assert.ok(mine.some(r => r.qid === answered.qid && typeof r.correct === 'boolean' && r.subject));
  assert.equal(await page.evaluate(() => FF.syncApp.pending().count), 0);

  // 競合：ほかの端末が先に保管庫を更新し、この端末も変えた
  const other = await page.evaluate(() => { const s = JSON.parse(JSON.stringify(FF.app.state)); s.studyPointsEarnedTotal = 777; s.studyPoints = 777; s.player.name = 'ほかの端末'; s.updatedAt += 5000; return JSON.parse(FF.state.serialize(s)); });
  Object.values(profiles)[0].rev += 1; Object.values(profiles)[0].save = other;
  await page.evaluate(() => { const s = JSON.parse(JSON.stringify(FF.app.state)); s.studyPointsEarnedTotal = 5; FF.app.commit(s); });
  await page.evaluate(() => FF.ui.show('settings'));
  await page.waitForSelector('.sync-panel');
  await page.locator('.sync-panel .btn.primary').first().click();   // いますぐ同期
  await page.waitForSelector('.modal');
  const txt = await page.locator('.modal').innerText();
  assert.match(txt, /ほかの端末/); assert.match(txt, /777/);
  await shot('sync-5-conflict');
  const buttons = await page.locator('.modal .actions .btn').allInnerTexts();
  assert.equal(buttons.length, 3);
  await page.locator('.modal .actions .btn', { hasText: 'ほかの' }).click();
  await page.waitForFunction(() => FF.app.state.studyPointsEarnedTotal === 777, null, { timeout: 8000 });
  assert.equal(await page.evaluate(() => FF.storage.loadSync().rev), 3);
  assert.ok(await page.evaluate(() => !!FF.storage.loadSyncBackup()), '使わなかったほうの控えが残る');
  await page.evaluate(() => FF.ui.show('settings'));
  await page.waitForSelector('.sync-panel');
  await shot('sync-6-backup');
  // コードの印刷：印刷用のカードだけが紙に出る
  await page.evaluate(() => { window.__printed = 0; window.print = () => { window.__printed++; }; FF.ui.show('settings'); });
  await page.waitForSelector('.sync-panel');
  await page.locator('.sync-panel .btn', { hasText: 'コードを見る' }).click();
  await page.locator('.sync-print').click();
  assert.equal(await page.evaluate(() => window.__printed), 1);
  assert.equal(await page.locator('.code-card').count(), 1);
  assert.equal((await page.locator('.code-card-code').innerText()).trim(), code);
  assert.equal(await page.locator('.code-card').isVisible(), false, '画面では見えない');
  await page.keyboard.press('Escape');
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.code-card').isVisible(), true, '印刷では見える');
  assert.equal(await page.locator('#hud').isVisible(), false);
  assert.equal(await page.locator('.sync-panel').isVisible(), false);
  const box = await page.locator('.code-card').boundingBox();
  assert.ok(box.width > 300 && box.width < 400, '名刺の大きさ');
  await shot('sync-7-print');
  await page.emulateMedia({ media: 'screen' });

  // 別の端末B：コードを入れて引き継ぐ
  const ctxB = await browser.newContext({ viewport: { width: 390, height: 900 } });
  await ctxB.route(HOST, handler);
  const b = await ctxB.newPage();
  b.on('pageerror', e => errors.push(e.message));
  await b.goto(url, { waitUntil: 'domcontentloaded' });
  await b.evaluate(() => { document.documentElement.dataset.theme = 'day'; FF.app.state = FF.state.setPlayerGrade(FF.state.withUpdated(FF.state.createDefaultState(FF.app.now()), FF.app.now()), 4); FF.app.state.flags.introSeen = true; FF.app.save(); FF.ui.show('settings'); });
  await b.waitForSelector('.sync-panel');
  await b.locator('.sync-panel .btn', { hasText: '引き継ぐ' }).first().click();
  await b.waitForSelector('.sync-link-input');
  const go = b.locator('.modal .actions .btn.primary');
  await b.locator('.sync-link-input').fill('ABCD');
  await go.click();
  assert.match(await b.locator('.sync-link-msg').innerText(), /形|かたち/);
  await b.locator('.sync-link-input').fill('ABCD-EFGH-JKMN-PQRS');   // 形は正しいが、保管庫にない
  await go.click();
  await b.waitForFunction(() => /見つかりません|みつかりません/.test(document.querySelector('.sync-link-msg').innerText), null, { timeout: 8000 });
  assert.equal(await b.evaluate(() => FF.storage.loadSync().enabled), false);
  await shot('sync-8-link', b);
  await b.locator('.sync-link-input').fill(code.toLowerCase());   // 小文字・ハイフンつきでも通る
  await go.click();
  await b.waitForSelector('.sync-conflict-info, .modal .actions .btn:has-text("ほかの")', { timeout: 8000 });
  const txtB = await b.locator('.modal').innerText();
  assert.match(txtB, /すでにデータ/); assert.match(txtB, /777/);
  const reco = await b.locator('.modal .actions .btn.primary').innerText();
  assert.match(reco, /ほかの/, 'まっさらな端末では、保管庫のデータがおすすめ');
  await shot('sync-9-first-link', b);
  await b.locator('.modal .actions .btn.primary').click();
  await b.waitForFunction(() => FF.app.state.studyPointsEarnedTotal === 777 && FF.app.state.player.name === 'ほかの端末', null, { timeout: 8000 });
  assert.equal(await b.evaluate(() => FF.storage.loadSync().code), code.replace(/-/g, ''));
  assert.equal(await b.evaluate(() => FF.storage.loadSync().enabled), true);
  // 引き継いだ直後は、変更がないので、送り返さない
  const before = calls.filter(c => c === 'ff_push_save').length;
  await b.evaluate(() => FF.syncApp.sync({ force: true }));
  assert.equal(calls.filter(c => c === 'ff_push_save').length, before);

  // オフにすると通信しない
  await page.evaluate(() => FF.syncApp.disable());
  const n = calls.length;
  await page.evaluate(() => FF.syncApp.sync({ force: true }));
  assert.equal(calls.length, n);
  // 全データのリセットで、同期の記録は消える（保管庫は残る）
  await page.evaluate(() => FF.app.resetAll());
  assert.equal(await page.evaluate(() => FF.storage.loadSync().code), null);
  assert.equal(Object.keys(profiles).length, 1);
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('ui-sync：成功');
})().catch(e => { console.error(e); process.exit(1); });
