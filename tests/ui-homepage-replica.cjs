// 比較用入口の操作と保存領域を確認する。ゲームのデータはテスト専用ブラウザー内だけ。
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.FF_TEST_ORIGIN || 'http://127.0.0.1:8772';
const out = process.env.FF_QA_OUTPUT || path.resolve(__dirname, '../../homepage-replica-qa');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.FF_BROWSER_PATH ? { executablePath: process.env.FF_BROWSER_PATH } : {}), args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await page.locator('.replica-title-description').waitFor();
    assert.equal(await page.evaluate(() => FF.config.SAVE_KEY), 'frozenFrontier.save');
    const settle = () => page.evaluate(async () => {
      await document.fonts.ready;
      for (const img of document.images) { try { await img.decode(); } catch {} }
    });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await settle();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: path.join(out, `title-${width}.png`), fullPage: true, animations: 'disabled' });
    }
    await page.locator('.title-card input').fill('ゆき');
    await page.locator('.title-card button').click();
    await page.locator('.grade-chip').nth(4).click();
    await page.locator('.avatar-pick').first().click();
    await page.locator('.title-card button').click();
    const layout = [];
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 760 ? 844 : 1000 });
      await page.evaluate(() => { FF.ui.show('base'); scrollTo(0, 0); });
      await settle();
      const check = await page.evaluate(() => {
        const nav = document.querySelector('#nav').getBoundingClientRect();
        const buttons = [...document.querySelectorAll('#nav button')].map(b => b.getBoundingClientRect());
        const cta = document.querySelector('.replica-start').getBoundingClientRect();
        const entry = document.querySelector('.adv-entry').getBoundingClientRect();
        const depart = document.querySelector('.adv-entry .adv-button').getBoundingClientRect();
        const details = document.querySelector('.replica-facilities');
        return {
          width: innerWidth,
          overflow: document.documentElement.scrollWidth > innerWidth,
          count: buttons.length,
          navOneRow: buttons.every(b => Math.abs(b.top - buttons[0].top) < 1),
          navContained: buttons.every(b => b.top >= nav.top && b.bottom <= nav.bottom + 1),
          ctaVisible: cta.top > 0 && cta.bottom < innerHeight - nav.height,
          departWidth: depart.width,
          departContained: depart.left >= entry.left && depart.right <= entry.right,
          facilitiesCollapsed: !details.open,
          facilityCount: details.querySelectorAll('[data-facility]').length,
          literalMarkup: /<span>|<br>/.test(document.querySelector('#screen').textContent)
        };
      });
      assert.equal(check.overflow, false); assert.equal(check.count, 5);
      assert.equal(check.navOneRow, true); assert.equal(check.navContained, true);
      assert.equal(check.ctaVisible, true); assert.equal(check.departContained, true);
      assert.equal(check.facilitiesCollapsed, true); assert.equal(check.facilityCount, 8);
      assert.equal(check.literalMarkup, false);
      if (width < 760) assert.ok(check.departWidth > 250, 'mobile departure button must be full width');
      layout.push(check);
      await page.screenshot({ path: path.join(out, `town-${width}.png`), fullPage: true, animations: 'disabled' });
      if (width === 390) {
        await page.screenshot({ path: path.join(out, 'town-mobile-viewport.png'), animations: 'disabled' });
        await page.locator('.adv-entry').evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - document.querySelector('#hud').getBoundingClientRect().height - 20));
        await page.screenshot({ path: path.join(out, 'adventure-mobile-viewport.png'), animations: 'disabled' });
      }
    }
    await page.locator('.replica-facilities summary').click();
    assert.equal(await page.locator('[data-facility="ticket"]').isVisible(), true);
    await page.locator('[data-facility="ticket"]').click();
    assert.equal(await page.evaluate(() => FF.app.screen), 'redeem', 'original facility handler opens');
    await page.evaluate(() => FF.ui.show('base'));
    await page.locator('.replica-start').click();
    assert.equal(await page.evaluate(() => FF.app.screen), 'study');
    await page.locator('.subject-card').first().click();
    assert.equal(await page.evaluate(() => FF.app.screen), 'quiz');
    assert.ok(await page.locator('.question-card').count());
    await page.evaluate(() => FF.ui.show('base'));
    await page.locator('.masthead-link').last().click();
    assert.equal(await page.evaluate(() => FF.app.screen), 'settings');
    await page.evaluate(() => FF.ui.show('base'));
    await page.locator('.adv-entry .adv-button').click();
    assert.equal(await page.evaluate(() => FF.app.screen), 'adventure');
    await page.evaluate(() => FF.ui.show('base'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.locator('.replica-mission').waitFor();
    assert.equal(await page.evaluate(() => FF.app.state.player.name), 'ゆき');
    assert.ok(await page.evaluate(() => !!localStorage.getItem(FF.config.SAVE_KEY)));   // 本体のセーブに保存される（判断500）
    // 町が育った後は、初回向けの説明を外し、施設を最初から開く。
    await page.evaluate(() => { FF.app.state.buildings.furnace.level = 2; FF.ui.show('base'); });
    assert.equal(await page.locator('.replica-steps').count(), 0);
    assert.equal(await page.locator('.replica-facilities').evaluate(d => d.open), true);
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ layout, errors }, null, 2));
    console.log(JSON.stringify({ status: "PASS", layout, errors }, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
