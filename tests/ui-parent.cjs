// 保護者の記録（判断304）：履歴をたくさん読み込んだときの画面。コードを持たない端末（保護者のスマホ）でコードを入れて開く。Chromium・偽の保管庫
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict'), crypto = require('node:crypto');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
const OUT = process.env.FF_SHOT_DIR || null;
const CODE = 'ABCDEFGHJKMNPQRS';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await (await browser.newContext({ viewport: { width: 390, height: 900 } })).newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const url = pathToFileURL(path.resolve(__dirname, '../index.html')).href + '?debug=1';
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // 本物の問題から、偽の履歴をつくる（14日ぶん・正答率が問題ごとに違う）
  const qs = await page.evaluate(() => Object.values(FF.app.bank.byId).filter(q => !q.id.endsWith('#input') && q.gradeLevel === 4 && ['math', 'science', 'japanese'].includes(q.subject)).slice(0, 4000).filter((q, i) => i % 97 === 0).map(q => ({ id: q.id, subject: q.subject, grade: q.gradeLevel })));
  assert.ok(qs.length >= 10);
  const now = await page.evaluate(() => FF.app.now());
  const rows = []; let n = 0;
  for (let day = 0; day < 14; day++) {
    if (day === 5 || day === 6) continue;   // 学習しなかった日
    for (let k = 0; k < 6 + (day % 4) * 3; k++) {
      const q = qs[(day * 7 + k) % qs.length];
      const weak = (day * 7 + k) % qs.length < 3;   // 先頭の3問は、よく間違える
      rows.push({ attempt_id: 'x' + (n++), at: now - day * 86400000 - k * 60000, qid: q.id, subject: q.subject, grade: q.grade, difficulty: 1, type: 'choice', correct: weak ? k % 5 === 0 : k % 4 !== 0, attempts: 1, hints: 0, resource: 'wood', reward: 3, points: 5 });
    }
  }
  const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' };
  const key = crypto.createHash('sha256').update('FROZEN-FRONTIER/sync/' + CODE).digest('hex');
  await page.route('https://ivylealwkoatewbcxdeg.supabase.co/**', async route => {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const a = JSON.parse(req.postData() || '{}');
    const res = a.p_key !== key ? { ok: false, error: 'not_found' } : { ok: true, rows: rows.filter(r => r.at > (a.p_since || 0)).sort((x, y) => x.at - y.at).slice(0, 1000) };
    await route.fulfill({ status: 200, contentType: 'application/json', headers: CORS, body: JSON.stringify(res) });
  });
  await page.evaluate(() => { document.documentElement.dataset.theme = 'day'; FF.app.state.flags.introSeen = true; FF.ui.show('settings'); });
  await page.waitForSelector('.sync-panel');
  // コードを入れて開く（この端末はオフのまま・コードを保存しない）
  await page.locator('.sync-parent-open').click();
  await page.locator('.sync-link-input').fill('zzzz');
  await page.locator('.modal .actions .btn.primary').click();
  assert.match(await page.locator('.sync-link-msg').innerText(), /形|かたち/);
  await page.locator('.sync-link-input').fill('ZZZZ-ZZZZ-ZZZZ-ZZZZ');
  await page.locator('.modal .actions .btn.primary').click();
  await page.waitForSelector('.parent-loading', { state: 'detached', timeout: 8000 });
  assert.equal(await page.locator('.parent-tiles').count(), 0);
  await page.evaluate(() => FF.ui.show('settings'));
  await page.waitForSelector('.sync-panel');
  await page.locator('.sync-parent-open').click();
  await page.locator('.sync-link-input').fill(CODE.toLowerCase());
  await page.locator('.modal .actions .btn.primary').click();
  await page.waitForSelector('.parent-tiles', { timeout: 8000 });
  assert.equal(await page.evaluate(() => FF.storage.loadSync().code), null, 'コードは保存しない');
  const tiles = await page.locator('.parent-tiles').innerText();
  assert.match(tiles, new RegExp(String(rows.length)));
  assert.equal(await page.locator('.parent-chart g').count(), 14);
  assert.ok(await page.locator('.parent-missed').count() >= 1, 'よく間違える問題が出る');
  assert.ok(await page.locator('.parent-rate-row').count() >= 2);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(over <= 1, '横にはみ出さない: ' + over);
  if (OUT) { await page.screenshot({ path: path.join(OUT, 'parent-1-top.png') }); await page.evaluate(() => window.scrollTo(0, 700)); await page.screenshot({ path: path.join(OUT, 'parent-2-mid.png') }); await page.evaluate(() => window.scrollTo(0, 1500)); await page.screenshot({ path: path.join(OUT, 'parent-3-low.png') }); }
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('ui-parent：成功');
})().catch(e => { console.error(e); process.exit(1); });
