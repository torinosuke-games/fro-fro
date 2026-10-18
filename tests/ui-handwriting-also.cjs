// 手書きのお手本に、ほかの正解も出る（判断478）：that の問題で、「ほかに、who・whom も せいかい です。」
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.FF_TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href, { waitUntil: 'domcontentloaded' });
  const show = id => page.evaluate(id => {
    document.documentElement.dataset.theme = 'day';
    FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 9);
    const q = FF.app.bank.byId[id];
    FF.app.session = { renewal: true, sel: { subject: 'english', grade: 9, unit: 'all', difficulty: 'random', answerType: 'input', resource: 'wood' }, recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
    FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' };
    FF.ui.show('quiz');
  }, id);
  await show('english_g9_relative_004');
  await page.waitForSelector('.hw-canvas');
  const box = await page.locator('.hw-canvas').boundingBox();
  await page.mouse.move(box.x + box.width * .3, box.y + box.height * .4); await page.mouse.down();
  await page.mouse.move(box.x + box.width * .6, box.y + box.height * .6, { steps: 5 }); await page.mouse.up();
  await page.getByRole('button', { name: 'お手本を見る' }).click();
  assert.equal(await page.locator('.hw-answer').innerText(), 'that');
  assert.ok((await page.locator('.hw-also').innerText()).includes('who・whom'));
  // ほかの答えがない問題には、出ない
  await show('english_g9_verb_003'); await page.waitForSelector('.hw-canvas');
  const b2 = await page.locator('.hw-canvas').boundingBox();
  await page.mouse.move(b2.x + b2.width * .3, b2.y + b2.height * .4); await page.mouse.down();
  await page.mouse.move(b2.x + b2.width * .6, b2.y + b2.height * .6, { steps: 5 }); await page.mouse.up();
  await page.getByRole('button', { name: 'お手本を見る' }).click();
  assert.equal(await page.locator('.hw-also').count(), 0);
  assert.deepEqual(errors, []); await browser.close(); console.log('PASS: handwriting model shows also-correct answers');
})().catch(e => { console.error(e); process.exit(1); });
