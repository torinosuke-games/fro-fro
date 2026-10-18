// 単元ごとの「正解した問題数／問題数」（判断479）：サイドの単元一覧・問題カード・条件の画面
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.FF_TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href, { waitUntil: 'domcontentloaded' });
  const info = await page.evaluate(() => {
    document.documentElement.dataset.theme = 'day';
    const st = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4);
    const qs = Object.values(FF.app.bank.byId).filter(q => q.subject === 'math' && q.gradeLevel === 4 && q.unit && !q.generated), u = qs[0].unit, same = qs.filter(q => q.unit === u);
    st.learning.questionResults = {}; let q = null, n = 0;
    for (const c of same) { if (n === 2) break; const before = FF.curriculum.unitProgress(FF.app.bank, st, 'math', 4)[u].correct; st.learning.questionResults[c.id] = true; if (FF.curriculum.unitProgress(FF.app.bank, st, 'math', 4)[u].correct > before) { n++; q = q || c; } }
    const total = FF.curriculum.unitProgress(FF.app.bank, st, 'math', 4)[u].total;
    FF.app.state = st;
    FF.app.session = { renewal: true, sel: { subject: 'math', grade: 4, unit: 'all', difficulty: 'random', answerType: 'choice', resource: 'wood' }, recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
    FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' };
    FF.ui.show('quiz');
    return { unit: u, total, n };
  });
  assert.equal(await page.locator('.unit-tally').first().innerText(), info.n + '/' + info.total + '問 せいかい');
  await page.evaluate(() => FF.ui.show('lessonFilters'));
  const opt = await page.locator('select[aria-label] option[value="' + info.unit + '"]').first().innerText();
  assert.ok(opt.includes('（' + info.n + '/' + info.total + '）'), opt);
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.evaluate(() => FF.ui.show('quiz'));
  assert.ok((await page.locator('.unit-score').count()) > 5);
  assert.ok((await page.locator('.side-title, .units-title').first().innerText()).includes('せいかい'));
  assert.deepEqual(errors, []); await browser.close(); console.log('PASS: unit progress');
})().catch(e => { console.error(e); process.exit(1); });
