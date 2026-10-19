// チケットが0でも選択問題を解ける（判断486）：注意書き・連続正解のボーナス表示・報酬の内訳
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.FF_TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'day';
    const st = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4);
    st.tickets = { count: 0, lastRecoveredAt: FF.app.now() };
    FF.app.state = st;
    const q = Object.values(FF.app.bank.byId).find(x => x.subject === 'science' && x.gradeLevel === 4 && x.answerType === 'choice');
    FF.app.session = { renewal: true, sel: { subject: 'science', grade: 4, unit: 'all', difficulty: 'random', answerType: 'choice', resource: 'wood' }, recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
    FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood', shownAt: FF.app.now() - 10000 };
    window.__q = q;
    FF.ui.show('quiz');
  });
  await page.waitForSelector('.no-ticket-box');
  assert.ok((await page.locator('.no-ticket-box').innerText()).includes('少なめ'));
  assert.ok((await page.locator('.no-ticket-streak').innerText()).includes('ランダム'));
  // 選択肢を選んで答える（書き問題に切り替えさせられない）
  const ans = await page.evaluate(() => window.__q.answer);
  await page.locator('.answer-option', { hasText: ans }).first().click();
  await page.getByRole('button', { name: /答え|こたえ|確認|チェック/ }).first().click().catch(() => {});
  await page.waitForTimeout(300);
  const outcome = await page.evaluate(() => { const it = FF.app.session.items[FF.app.session.currentId]; return it.outcome && { status: it.outcome.status, noTicket: it.outcome.noTicket, points: it.outcome.points }; });
  assert.deepEqual({ status: outcome.status, noTicket: outcome.noTicket }, { status: 'correct', noTicket: true });
  assert.ok(outcome.points >= 1);
  assert.deepEqual(errors, []); await browser.close(); console.log('PASS: no-ticket choice');
})().catch(e => { console.error(e); process.exit(1); });
