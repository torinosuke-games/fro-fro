// 保護者の記録（判断304・306）：履歴をたくさん読み込んだときの画面・グラフの縦軸と横の線・コードの保存（複数の子ども）・
// QR コードを読み取って開く（カメラの読み取りは偽のもの）。Chromium・偽の保管庫
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict'), crypto = require('node:crypto');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
const OUT = process.env.FF_SHOT_DIR || null;
const CODE = 'ABCDEFGHJKMNPQRS', CODE2 = 'TUVWXYZ234567892';   // 2つ目は 16文字
const CODE2_OK = 'TUVWXYZ23456789A';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
  const page = await ctx.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  // 偽のカメラ読み取り（BarcodeDetector と getUserMedia）。window.__qr に文字を入れると、読めたことになる
  await page.addInitScript(() => {
    window.__qr = null;
    window.BarcodeDetector = class { constructor() {} detect() { return Promise.resolve(window.__qr ? [{ rawValue: window.__qr }] : []); } };
    const c = document.createElement('canvas'); c.width = 64; c.height = 48; c.getContext('2d').fillRect(0, 0, 64, 48);
    if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = () => Promise.resolve(c.captureStream());
  });
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
  const rows2 = rows.slice(0, 12).map((r, i) => Object.assign({}, r, { attempt_id: 'y' + i }));
  const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' };
  const keyOf = c => crypto.createHash('sha256').update('FROZEN-FRONTIER/sync/' + c).digest('hex');
  const kids = { [keyOf(CODE)]: { name: 'ひなた', rows }, [keyOf(CODE2_OK)]: { name: 'そうた', rows: rows2 } };
  let pulls = 0;
  const route = async route => {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const a = JSON.parse(req.postData() || '{}'), kid = kids[a.p_key], fn = req.url().split('/rpc/')[1];
    let res;
    if (!kid) res = { ok: false, error: 'not_found' };
    else if (fn === 'ff_pull') { pulls++; res = { ok: true, rev: 1, save_json: { player: { name: kid.name, grade: 4 } } }; }
    else res = { ok: true, rows: kid.rows.filter(r => r.at > (a.p_since || 0)).sort((x, y) => x.at - y.at).slice(0, 1000) };
    await route.fulfill({ status: 200, contentType: 'application/json', headers: CORS, body: JSON.stringify(res) });
  };
  await ctx.route('https://ivylealwkoatewbcxdeg.supabase.co/**', route);
  const setup = async () => { await page.evaluate(() => { document.documentElement.dataset.theme = 'day'; FF.app.state.flags.introSeen = true; FF.ui.show('settings'); }); await page.waitForSelector('.sync-panel'); };
  await setup();

  // ---- 1. はじめて開く：コードを入れる ----
  assert.deepEqual(await page.evaluate(() => FF.storage.loadGuardians()), []);
  await page.locator('.sync-parent-open').click();
  await page.waitForSelector('.sync-link-input');
  await page.locator('.sync-link-input').fill('zzzz');
  await page.locator('.modal .actions .btn.primary').click();
  assert.match(await page.locator('.sync-link-msg').innerText(), /形|かたち/);
  await page.locator('.sync-link-input').fill('ZZZZ-ZZZZ-ZZZZ-ZZZZ');   // 形は正しいが、保管庫にない
  await page.locator('.modal .actions .btn.primary').click();
  await page.waitForFunction(() => /見つかりません|みつかりません/.test(document.querySelector('.sync-link-msg').innerText.replace(/\s/g, '')) || document.querySelector('.sync-link-msg ruby'), null, { timeout: 8000 });
  assert.deepEqual(await page.evaluate(() => FF.storage.loadGuardians()), [], '見つからなかったコードは保存しない');
  await page.locator('.sync-link-input').fill(CODE.toLowerCase());
  await page.locator('.modal .actions .btn.primary').click();
  await page.waitForSelector('.parent-tiles', { timeout: 8000 });
  const saved = await page.evaluate(() => FF.storage.loadGuardians());
  assert.equal(saved.length, 1); assert.equal(saved[0].code, CODE); assert.equal(saved[0].name, 'ひなた');
  assert.equal(await page.evaluate(() => FF.storage.loadSync().code), null, '同期のコードにはしない');
  assert.match(await page.locator('.parent-chips').innerText(), /ひなた/);
  const tiles = await page.locator('.parent-tiles').innerText();
  assert.match(tiles, new RegExp(String(rows.length)));

  // ---- 2. グラフ：縦軸の数字と横の線、棒の上の回答数 ----
  assert.equal(await page.locator('.parent-chart g').count(), 14);
  const yLabels = await page.locator('.parent-chart text').evaluateAll(ts => ts.map(t => t.textContent));
  const nums = yLabels.filter(t => /^\d+$/.test(t));
  assert.ok(nums.length >= 6, '縦軸の数字と棒の上の数: ' + yLabels.join(','));
  assert.ok(yLabels.includes('0'), '縦軸に 0');
  const grid = await page.locator('.parent-chart line.parent-grid').count();
  assert.ok(grid >= 3 && grid <= 6, '横の線: ' + grid);
  const ys = await page.locator('.parent-chart line.parent-grid').evaluateAll(ls => ls.map(l => +l.getAttribute('y1')));
  assert.equal(new Set(ys).size, ys.length, '横の線は重ならない');
  assert.ok(await page.locator('.parent-missed').count() >= 1, 'よく間違える問題が出る');
  assert.ok(await page.locator('.parent-rate-row').count() >= 2);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(over <= 1, '横にはみ出さない: ' + over);
  if (OUT) { await page.screenshot({ path: require('node:path').join(OUT, 'parent-1-top.png') }); await page.locator('.parent-chart').scrollIntoViewIfNeeded(); await page.screenshot({ path: path.join(OUT, 'parent-2-chart.png') }); }

  // ---- 3. 保存したコード：開き直しても、入れ直さずに開く ----
  await page.reload({ waitUntil: 'domcontentloaded' });
  await setup();
  await page.locator('.sync-parent-open').click();
  await page.waitForSelector('.parent-tiles', { timeout: 8000 });
  assert.equal(await page.locator('.modal').count(), 0, 'コードを聞かれない');
  assert.match(await page.locator('.parent-chips').innerText(), /ひなた/);

  // ---- 4. 子どもを追加（カメラの読み取り）→ 切り替え ----
  await page.locator('.parent-chips .btn.ghost').click();
  await page.waitForSelector('.sync-scan-btn');
  await page.locator('.sync-scan-btn').click();
  await page.waitForSelector('.sync-scan-video');
  await page.evaluate(() => { window.__qr = 'https://example.com/other'; });
  await page.waitForTimeout(700);
  assert.equal(await page.locator('.sync-scan-video').count(), 1, 'このゲームの QR コードでなければ、読み続ける');
  await page.evaluate(code => { window.__qr = 'https://torinosuke-games.github.io/fro-fro/?debug=1#ffcode=' + code; }, CODE2_OK);
  await page.waitForSelector('.sync-scan-video', { state: 'detached', timeout: 8000 });
  await page.waitForFunction(() => document.querySelector('.parent-chips') && /そうた/.test(document.querySelector('.parent-chips').innerText), null, { timeout: 8000 });
  assert.equal((await page.evaluate(() => FF.storage.loadGuardians())).length, 2);
  assert.equal(await page.evaluate(() => window.__qr = null), null);
  await page.waitForSelector('.parent-tiles', { timeout: 8000 });
  assert.match(await page.locator('.parent-tiles').innerText(), /12/);
  await page.locator('.parent-chips .btn').first().click();   // 切り替え
  await page.waitForFunction(n => document.querySelector('.parent-tiles') && document.querySelector('.parent-tiles').innerText.includes(String(n)), rows.length, { timeout: 8000 });

  // ---- 5. 消す（この端末から）----
  await page.locator('.parent-chips .btn').nth(1).click();
  await page.waitForSelector('.parent-tiles', { timeout: 8000 });
  await page.locator('.parent-loading').waitFor({ state: 'detached' }).catch(() => {});
  await page.locator('.parent-remove').click();
  await page.locator('.modal .actions .btn.danger').click();
  await page.waitForSelector('.parent-chips');
  assert.deepEqual((await page.evaluate(() => FF.storage.loadGuardians())).map(g => g.code), [CODE]);

  // ---- 6. QR コードから開かれた（URL の # のうしろ）----
  await page.goto('about:blank');
  await page.goto(url + '#ffcode=' + CODE2_OK.toLowerCase(), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.modal .actions .btn.primary');
  assert.equal(await page.evaluate(() => location.hash), '', 'コードは URL から消す');
  assert.match(await page.locator('.modal').innerText(), /読みとりました|よみとりました|QR/);
  await page.screenshot({ path: OUT ? path.join(OUT, 'parent-3-incoming.png') : undefined });
  assert.equal(await page.locator('.modal .actions .btn').count(), 3, 'やめる・記録を見る・この端末で引き継ぐ');
  await page.locator('.modal .actions .btn.primary').click();
  await page.waitForFunction(() => document.querySelector('.parent-chips') && /そうた/.test(document.querySelector('.parent-chips').innerText), null, { timeout: 8000 });
  assert.equal((await page.evaluate(() => FF.storage.loadGuardians())).length, 2);

  // ---- 7. 全データのリセットで、保存したコードも消える ----
  await page.evaluate(() => FF.app.resetAll());
  assert.deepEqual(await page.evaluate(() => FF.storage.loadGuardians()), []);

  assert.deepEqual(errors, []);
  await browser.close();
  console.log('ui-parent：成功');
})().catch(e => { console.error(e); process.exit(1); });
