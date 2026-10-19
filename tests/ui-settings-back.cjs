// 設定のページの「もどる」ボタン：設定に移る前のページ（問題の画面など）に、状態をたもったままもどる（判断492）
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.FF_TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href, { waitUntil: 'domcontentloaded' });
  const screen = () => page.evaluate(() => document.body.dataset.screen);
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'day';
    FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4);
    const q = Object.values(FF.app.bank.byId).find(x => x.subject === 'math' && x.gradeLevel === 4 && x.answerType === 'choice');
    FF.app.session = { renewal: true, sel: { subject: 'math', grade: 4, unit: 'all', difficulty: 'random', answerType: 'choice', resource: 'wood' }, recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
    FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' };
    window.__qid = q.id;
    FF.ui.show('quiz');
  });
  await page.evaluate(() => FF.ui.show('settings'));
  await page.getByRole('button', { name: 'もとのページにもどる' }).click();
  assert.equal(await screen(), 'quiz');
  assert.equal(await page.evaluate(() => FF.app.session.currentId), await page.evaluate(() => window.__qid));
  // 町の画面から行っても、もどれる
  await page.evaluate(() => FF.ui.show('base')); await page.evaluate(() => FF.ui.show('settings'));
  await page.getByRole('button', { name: 'もとのページにもどる' }).click();
  assert.equal(await screen(), 'base');
  assert.deepEqual(errors, []); await browser.close(); console.log('PASS: settings back');
})().catch(e => { console.error(e); process.exit(1); });
