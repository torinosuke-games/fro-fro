// 算数の計算用メモ（判断490）：アイコンで開き、指（ポインタ）で書け、画面の3分の1ほどで、算数以外では出ない
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const errors = [];
  for (const vp of [{ width: 390, height: 800 }, { width: 768, height: 1000 }, { width: 1100, height: 900 }]) {
    const page = await browser.newPage({ viewport: vp, hasTouch: false });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(process.env.FF_TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href, { waitUntil: 'domcontentloaded' });
    const show = subject => page.evaluate(subject => {
      document.documentElement.dataset.theme = 'day';
      const st = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4); FF.app.state = st;
      const q = Object.values(FF.app.bank.byId).find(x => x.subject === subject && x.gradeLevel === 4 && x.answerType === 'choice');
      FF.app.session = { renewal: true, sel: { subject, grade: 4, unit: 'all', difficulty: 'random', answerType: 'choice', resource: 'wood' }, recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
      FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' };
      FF.ui.show('quiz');
    }, subject);
    await show('science');
    assert.equal(await page.locator('.scratch-toggle:visible').count(), 0, '算数以外では出ない');
    await show('math');
    assert.equal(await page.locator('.question-meta .scratch-toggle').count(), 0, '問題の行には置かない（問題が下がるため）');
    const tb = await page.locator('.scratch-toggle:visible').boundingBox(), qb = await page.locator('.question-card').boundingBox();
    if (vp.width >= 900) assert.ok(tb.y + tb.height <= qb.y + 2 && tb.x + tb.width > qb.x + qb.width - 20, '広い画面：問題の枠の右上の外');
    else assert.ok(tb.y < qb.y, '狭い画面：問題の枠より上（帯の中）');
    await page.locator('.scratch-toggle:visible').click();
    await page.waitForSelector('.scratch-sheet.is-open');
    const box = await page.locator('.scratch-sheet').boundingBox();
    assert.ok(box.height >= vp.height * 0.28 && box.height <= vp.height * 0.45, 'おおよそ3分の1：' + box.height);
    const cb = await page.locator('.sp-canvas').boundingBox();
    const dark = () => page.evaluate(() => { const c = document.querySelector('.sp-canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] < 120) n++; return n; });
    assert.equal(await dark(), 0);
    await page.mouse.move(cb.x + cb.width * .2, cb.y + cb.height * .3); await page.mouse.down();
    await page.mouse.move(cb.x + cb.width * .6, cb.y + cb.height * .6, { steps: 6 }); await page.mouse.up();
    assert.ok(await dark() > 50, '線が書ける');
    await page.getByRole('button', { name: 'もどす' }).click();
    assert.equal(await dark(), 0, 'もどす');
    await page.mouse.move(cb.x + cb.width * .2, cb.y + cb.height * .3); await page.mouse.down(); await page.mouse.move(cb.x + cb.width * .5, cb.y + cb.height * .5, { steps: 4 }); await page.mouse.up();
    await page.getByRole('button', { name: 'ぜんぶけす' }).click();
    assert.equal(await dark(), 0, 'ぜんぶけす');
    // 画面の内容が、パッドにかくれずにスクロールできる（下に余白）
    assert.ok(await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('#screen')).paddingBottom) > 150));
    // 次の問題に進むと、線は消える。とじると、パッドは出ない
    await page.mouse.move(cb.x + cb.width * .3, cb.y + cb.height * .3); await page.mouse.down(); await page.mouse.move(cb.x + cb.width * .6, cb.y + cb.height * .6, { steps: 4 }); await page.mouse.up();
    await page.evaluate(() => { const q = Object.values(FF.app.bank.byId).filter(x => x.subject === 'math' && x.gradeLevel === 4 && x.answerType === 'choice')[1]; FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' }; FF.app.session.currentId = q.id; FF.ui.rerender(); });
    await page.waitForTimeout(100);
    assert.equal(await dark(), 0, '次の問題で消える');
    await page.getByRole('button', { name: 'とじる' }).click();
    assert.equal(await page.locator('.scratch-sheet.is-open').count(), 0);
    if (vp.width === 768) { await page.locator('.scratch-toggle:visible').click(); await page.waitForTimeout(150); await page.screenshot({ path: '/tmp/sp_768.png' }); }
    else if (vp.width === 390) { await page.locator('.scratch-toggle:visible').click(); await page.waitForTimeout(150); await page.screenshot({ path: '/tmp/sp_390.png' }); }
    else { await page.locator('.scratch-toggle:visible').click(); await page.waitForTimeout(150); await page.screenshot({ path: '/tmp/sp_1100.png' }); }
    await page.close();
  }
  assert.deepEqual(errors, []); await browser.close(); console.log('PASS: scratchpad');
})().catch(e => { console.error(e); process.exit(1); });
