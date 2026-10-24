// 固定枠の地図を、実際のマウス・タッチ入力で操作するブラウザーテスト。
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const origin = process.env.FF_TEST_ORIGIN || 'http://127.0.0.1:8772';
const out = process.env.FF_QA_OUTPUT || path.resolve(__dirname, '../../village-map-qa');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'], ...(process.env.FF_BROWSER_PATH ? { executablePath: process.env.FF_BROWSER_PATH } : {}) });
  const errors = [], report = [];
  async function boot(page) {
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin + '/codex-prototypes/homepage/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      FF.app.state = FF.state.createDefaultState(FF.app.now());
      FF.app.state = FF.state.setPlayerGrade(FF.app.state, 5);
      FF.app.state.player.avatar = 'e1'; FF.app.state.player.name = 'ゆき';
      FF.ui.show('base'); await document.fonts.ready;
      await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    });
  }
  async function positionMap(page) {
    await page.locator('.village-map').evaluate(async el => {
      window.scrollTo(0, el.getBoundingClientRect().top + scrollY - document.querySelector('#hud').getBoundingClientRect().height - 10);
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
  }
  async function east(page) {
    await page.locator('[data-map-district="east"]').click();
    await page.waitForFunction(() => { const v = document.querySelector('.village-viewport'); return Math.abs(v.scrollLeft - (v.scrollWidth - v.clientWidth)) < 2; });
  }
  async function center(page) {
    await page.locator('.village-home').click();
    await page.waitForFunction(() => document.querySelector('.village-viewport').scrollLeft < 2);
  }
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage(); await boot(page);
    const initialState = await page.evaluate(() => JSON.stringify(FF.app.state));
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 760 ? 844 : 1000 });
      await positionMap(page);
      if (await page.locator('.village-home').isEnabled()) await center(page);
      const before = await page.locator('.village-viewport').boundingBox();
      await page.locator('.village-map').screenshot({ path: path.join(out, `center-${width}.png`), animations: 'disabled', style: '#hud,#nav{visibility:hidden!important}' });
      await east(page);
      const after = await page.locator('.village-viewport').boundingBox();
      assert.equal(after.width, before.width); assert.equal(after.height, before.height);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal(await page.locator('.village-arrow').last().isDisabled(), true);
      assert.equal(await page.locator('.village-home').isEnabled(), true);
      await page.locator('.village-map').screenshot({ path: path.join(out, `east-${width}.png`), animations: 'disabled', style: '#hud,#nav{visibility:hidden!important}' });
      report.push({ width, frame: [after.width, after.height], pageOverflow: false });
      await center(page);
    }
    await positionMap(page);
    const furnace = page.locator('.art-bld[aria-label^="中央炉"]');
    await furnace.click();
    assert.ok((await page.locator('.modal h2').innerText()).includes('中央炉'));
    await page.keyboard.press('Escape');
    const point = await furnace.boundingBox();
    await page.mouse.move(point.x + point.width / 2, point.y + point.height / 2);
    await page.mouse.down(); await page.mouse.move(point.x - 230, point.y + point.height / 2, { steps: 15 }); await page.mouse.up();
    assert.ok(await page.locator('.village-viewport').evaluate(v => v.scrollLeft > 150));
    assert.equal(await page.locator('.overlay').count(), 0, 'drag must not open the facility that was pressed');
    await east(page);
    await positionMap(page);
    // 座標クリックにし、テストツールのscrollIntoViewによる地図の移動を避ける。
    const magic = await page.locator('[data-plot="magic"]').boundingBox();
    await page.mouse.click(magic.x + magic.width / 2, magic.y + magic.height / 2);
    assert.ok((await page.locator('.modal h2').innerText()).includes('魔法研究所'));
    await page.keyboard.press('Escape');
    await positionMap(page);
    const lot = await page.locator('[data-plot="north-lot"]').boundingBox();
    await page.mouse.click(lot.x + lot.width / 2, lot.y + lot.height / 2);
    assert.ok((await page.locator('.modal h2').innerText()).includes('建設予定地'));
    await page.keyboard.press('Escape');
    // 再描画とリサイズで、見ていた地区を維持する。
    await east(page);
    await page.waitForFunction(() => document.querySelector('[data-map-district="east"]').getAttribute('aria-current') === 'location');
    await page.evaluate(() => FF.ui.rerender());
    await page.waitForFunction(() => { const v = document.querySelector('.village-viewport'); return Math.abs(v.scrollLeft / v.clientWidth - 1) < .01; });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() => { const v = document.querySelector('.village-viewport'); return Math.abs(v.scrollLeft / v.clientWidth - 1) < .01; });
    await center(page);
    await page.locator('.village-viewport').focus(); await page.keyboard.press('End');
    await page.waitForFunction(() => document.querySelector('[data-map-district="east"]').getAttribute('aria-current') === 'location');
    await page.keyboard.press('Home');
    await page.waitForFunction(() => document.querySelector('.village-viewport').scrollLeft < 2);
    assert.equal(await page.evaluate(() => JSON.stringify(FF.app.state)), initialState, 'map movement and plot previews must not change game state');

    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const touch = await mobile.newPage(); await boot(touch); await touch.bringToFront(); await positionMap(touch);
    await touch.locator('.village-map').screenshot({ path: path.join(out, 'touch-center.png'), animations: 'disabled', style: '#hud,#nav{visibility:hidden!important}' });
    const cdp = await mobile.newCDPSession(touch);
    async function swipe(x, y, dx, dy) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (let i = 1; i <= 12; i++) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * i / 12, y: y + dy * i / 12 }] });
        await touch.waitForTimeout(16);
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await touch.waitForTimeout(300);
    }
    const tf = await touch.locator('.art-bld[aria-label^="中央炉"]').boundingBox();
    await swipe(tf.x + tf.width / 2, tf.y + tf.height / 2, -155, 0);
    assert.ok(await touch.locator('.village-viewport').evaluate(v => v.scrollLeft > 80), 'touch swipe moves map');
    assert.equal(await touch.locator('.overlay').count(), 0, 'swipe over facility must not open it');
    await center(touch); await positionMap(touch);
    const frame = await touch.locator('.village-viewport').boundingBox();
    const startY = await touch.evaluate(() => scrollY);
    const target = await touch.evaluate(({ x, y }) => ({ target: document.elementFromPoint(x, y)?.className, maxScroll: document.documentElement.scrollHeight - innerHeight }), { x: frame.x + frame.width * .6, y: frame.y + frame.height * .7 });
    await swipe(frame.x + frame.width * .6, frame.y + frame.height * .7, 0, -130);
    const endY = await touch.evaluate(() => scrollY);
    assert.ok(endY > startY + 40, 'vertical swipe over map still scrolls the page: ' + JSON.stringify({ startY, endY, frame, target }));
    assert.ok(await touch.locator('.village-viewport').evaluate(v => v.scrollLeft < 5), 'vertical scrolling must not pan the map');
    await positionMap(touch); await east(touch);
    await touch.locator('.village-map').screenshot({ path: path.join(out, 'touch-east.png'), animations: 'disabled', style: '#hud,#nav{visibility:hidden!important}' });
    await touch.locator('[data-plot="training"]').tap();
    assert.equal(await touch.evaluate(() => FF.app.screen), 'tower', 'extension facility uses original handler');
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ status: 'PASS', report, mouseDrag: true, touchSwipe: true, verticalScroll: true, facilityTap: true, resizeAndKeyboard: true, errors }, null, 2));
    console.log('PASS: 4 widths, fixed frame, mouse drag, touch swipe, vertical scroll, taps, resize, keyboard, unchanged game state');
    await context.close(); await mobile.close();
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
