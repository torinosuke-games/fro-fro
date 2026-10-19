// デバッグ版の「要改善の問題」の ID を押すと、その問題の画面が開く（判断488）
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto((process.env.FF_TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href) + '?debug=1', { waitUntil: 'domcontentloaded' });
  const id = 'social_g5_hand_industry_013';
  await page.evaluate(id => {
    document.documentElement.dataset.theme = 'day';
    FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 5);
    FF.ui.review.set(FF.app.bank.byId[id], 'fix', 'テスト');
    FF.ui.show('debug');
  }, id);
  await page.getByRole('link', { name: id }).click();
  await page.waitForSelector('.question-card');
  const shown = await page.evaluate(() => FF.app.session.currentId);
  assert.equal(shown, id);
  assert.ok((await page.locator('.lesson-question').innerText()).includes('高速道路'));
  assert.deepEqual(errors, []); await browser.close(); console.log('PASS: debug review link');
})().catch(e => { console.error(e); process.exit(1); });
