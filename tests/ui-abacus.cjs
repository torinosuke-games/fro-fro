// そろばんの図（判断311）：2〜4けたのどれでも、柱が全部、わく（と画面の幅）の中に入る。math_g4_hand_abacus_015（637円）で、一の位が、わくの外に出ていた
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
const OUT = process.env.FF_SHOT_DIR || null;
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(__dirname, '../index.html')).href, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => { document.documentElement.dataset.theme = 'day'; });
  const cases = [
    { digits: [3, 5], labels: ['十', '一'] },
    { digits: [6, 3, 7], labels: ['百', '十', '一'] },
    { digits: [4, 5, 0, 0], labels: ['千', '百', '十', '一'] },
    { digits: [0, 9, 5], labels: ['一', '十分の一', '百分の一'] }
  ];
  for (const [i, c] of cases.entries()) {
    const info = await page.evaluate(c => {
      const fig = FF.lessonFigure.render(Object.assign({ kind: 'abacus', caption: 'そろばん' }, c));
      document.body.appendChild(fig);
      const svg = fig.querySelector('svg'), rects = [...svg.querySelectorAll('rect')];
      const frame = rects[0];   // いちばん外のわく
      const fx = +frame.getAttribute('x'), fw = +frame.getAttribute('width');
      const cols = [...svg.querySelectorAll('line')].filter(l => l.getAttribute('x1') === l.getAttribute('x2')).map(l => +l.getAttribute('x1'));
      const texts = [...svg.querySelectorAll('text')].map(t => ({ x: +t.getAttribute('x'), s: t.textContent }));
      const out = { fx, fw, cols, texts, vb: svg.getAttribute('viewBox') };
      fig.id = 'fig' + c.digits.length + '_' + c.labels[0];
      return out;
    }, c);
    assert.equal(info.cols.length, c.digits.length, '柱の数');
    for (const x of info.cols) assert.ok(x - 30 >= info.fx && x + 30 <= info.fx + info.fw, `柱 ${x} がわくの外: ${JSON.stringify(info)}`);
    assert.ok(info.fx >= 0 && info.fx + info.fw <= 520, 'わくが画面（viewBox 幅 520）の中');
    assert.deepEqual(info.texts.map(t => t.s), c.labels, '位の名前');
    for (const t of info.texts) assert.ok(t.x >= 40 && t.x <= 480, '位の名前が見切れない');
    const mid = (info.cols[0] + info.cols[info.cols.length - 1]) / 2;
    assert.ok(Math.abs(mid - 260) < 1, '中央にそろう');
    if (OUT) await page.locator('#fig' + c.digits.length + '_' + c.labels[0]).screenshot({ path: path.join(OUT, 'abacus-' + i + '.png') });
  }
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('ui-abacus：成功');
})().catch(e => { console.error(e); process.exit(1); });
