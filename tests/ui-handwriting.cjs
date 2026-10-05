// 手書きの自己採点（判断266）：書く → お手本を見る → 「かけた」「まちがえた」。Chromium・file://・昼テーマ。
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(__dirname, '../index.html')).href, { waitUntil: 'domcontentloaded' });
  const show = id => page.evaluate(id => {
    document.documentElement.dataset.theme = 'day';
    if (!FF.app.state || !FF.app.state.player || FF.app.state.player.grade !== 4) FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4);
    const q = FF.app.bank.byId[id];
    FF.app.session = { renewal: true, sel: { subject: 'japanese', grade: 4, unit: 'all', difficulty: 'random', answerType: 'input', resource: 'wood' }, recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
    FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' };
    FF.ui.show('quiz');
  }, id);
  async function draw() {
    const box = await page.locator('.hw-canvas').boundingBox();
    await page.mouse.move(box.x + box.width * .3, box.y + box.height * .3);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * .6, box.y + box.height * .5, { steps: 5 });
    await page.mouse.move(box.x + box.width * .4, box.y + box.height * .8, { steps: 5 });
    await page.mouse.up();
  }
  const ID = 'japanese_g4_hand_kanji_write_008#input';       // 書き取り（書き問題の形）
  await show(ID);
  await page.waitForSelector('.hw-canvas');
  // 手書きの欄が出ていて、キーボードの入力欄は出ていない
  assert.equal(await page.locator('.renewal-input').count(), 0);
  // 何も書かずに「お手本を見る」を押すと、まず書くように言われる
  await page.getByRole('button', { name: 'お手本を見る' }).click();
  assert.equal(await page.locator('.hw-model').count(), 0);
  assert.ok((await page.locator('.answer-feedback.retry').textContent()).includes('かいてみましょう'));
  // 線を書く。1つもどす・ぜんぶけす
  await draw(); await draw();
  assert.equal(await page.evaluate(() => FF.app.session.items[FF.app.session.currentId].strokes.length), 2);
  await page.getByRole('button', { name: '1つもどす' }).click();
  assert.equal(await page.evaluate(() => FF.app.session.items[FF.app.session.currentId].strokes.length), 1);
  await page.getByRole('button', { name: 'ぜんぶけす' }).click();
  assert.equal(await page.evaluate(() => FF.app.session.items[FF.app.session.currentId].strokes.length), 0);
  await draw();
  // 画面を作りなおしても、線が残る
  await page.evaluate(() => FF.ui.rerender());
  assert.equal(await page.evaluate(() => FF.app.session.items[FF.app.session.currentId].strokes.length), 1);
  const ink = await page.evaluate(() => { const c = document.querySelector('.hw-canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] < 80 && d[i + 2] > 60 && d[i + 2] < 120) n++; return n; });
  assert.ok(ink > 500, '線が、欄に描かれている: ' + ink);
  // お手本を見る → お手本と、「かけた」「まちがえた」
  await page.getByRole('button', { name: 'お手本を見る' }).click();
  assert.equal((await page.locator('.hw-answer').textContent()), await page.evaluate(id => FF.app.bank.byId[id].answer, ID));
  assert.equal(await page.locator('.hw-ok').count(), 1);
  assert.equal(await page.locator('.hw-ng').count(), 1);
  const before = await page.evaluate(() => ({ p: FF.app.state.studyPoints, w: FF.app.state.resources.wood }));
  await page.locator('.hw-ok').click();
  await page.waitForSelector('.answer-feedback.good');
  const after = await page.evaluate(() => ({ p: FF.app.state.studyPoints, w: FF.app.state.resources.wood, h: FF.app.state.learning.history.slice(-1)[0] }));
  assert.ok(after.p > before.p, '勉強量ポイントが増える');
  assert.equal(after.h.points, after.p - before.p);
  assert.ok((await page.locator('.reward-details').textContent()).includes('半分'));
  // 「まちがえた」：不正解で終わり、ポイントは増えない
  await show('japanese_g4_hand_kanji_write_009#input');
  await page.waitForSelector('.hw-canvas'); await draw();
  await page.getByRole('button', { name: 'お手本を見る' }).click();
  const b2 = await page.evaluate(() => FF.app.state.studyPoints);
  await page.locator('.hw-ng').click();
  await page.waitForSelector('.answer-feedback.review');
  assert.equal(await page.evaluate(() => FF.app.state.studyPoints), b2);
  // キーボードで入力にも、切りかえられる（書く前）
  await show('japanese_g4_hand_kanji_write_010#input');
  await page.getByRole('button', { name: 'キーボードで入力する' }).click();
  assert.equal(await page.locator('.renewal-input').count(), 1);
  assert.equal(await page.locator('.hw-canvas').count(), 0);
  await page.getByRole('button', { name: 'てがきでかく' }).click();
  assert.equal(await page.locator('.hw-canvas').count(), 1);
  // 読みの問題（ひらがなで答える）には、手書きの欄が出ない
  await show('japanese_g4_hand_kanji_read_001#input');
  assert.equal(await page.locator('.hw-canvas').count(), 0);
  assert.equal(await page.locator('.renewal-input').count(), 1);
  // 英語の単語（判断282）：四本線の手書きの欄。お手本は、英語の大きな文字。「書けた」で、半分のポイント
  await page.evaluate(() => { FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 5); });
  const showEn = id => page.evaluate(id => {
    const q = FF.app.bank.byId[id];
    FF.app.session = { renewal: true, sel: { subject: 'english', grade: 5, unit: 'all', difficulty: 'random', answerType: 'input', resource: 'wood' }, recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
    FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' };
    FF.ui.show('quiz');
  }, id);
  await showEn('english_g5_hand_spell_001#input');            // 「たいよう」を英語で書こう → sun
  await page.waitForSelector('.hw-canvas');
  assert.ok(await page.locator('.hw-en').count() === 1, '英語の手書きの欄');
  assert.ok((await page.locator('.hw-tip').first().textContent()).includes('てがき入力'));
  await draw();
  await page.getByRole('button', { name: 'お手本を見る' }).click();
  assert.equal((await page.locator('.hw-answer').textContent()), 'sun');
  assert.equal(await page.locator('.hw-answer.en').count(), 1);
  const bEn = await page.evaluate(() => FF.app.state.studyPoints);
  await page.locator('.hw-ok').click();
  await page.waitForSelector('.answer-feedback.good');
  assert.ok(await page.evaluate(() => FF.app.state.studyPoints) > bEn);
  // 英語の書き問題でも、キーボードの入力に、切りかえられて、案内が出る
  await showEn('english_g5_hand_spell_002#input');
  await page.getByRole('button', { name: 'キーボードで入力する' }).click();
  assert.equal(await page.locator('.renewal-input').count(), 1);
  assert.ok((await page.locator('.hw-tip').textContent()).includes('てがき入力'));
  // 英語でも、答えが1文字（アルファベット）や文の問題には、手書きの欄が出ない
  await showEn('english_g4_hand_alphabet_005#input');
  assert.equal(await page.locator('.hw-canvas').count(), 0);
  assert.deepEqual(errors, []);
  await page.screenshot({ path: process.env.FF_SHOT || '/tmp/hw.png' });
  await browser.close();
  console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
