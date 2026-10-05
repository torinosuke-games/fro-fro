// 英語の読み上げ（判断280）：スピーカーのボタン・聞き取りの問題・読み上げができない端末・設定。Chromium・file://・昼テーマ。
// 実際の声は、この環境では出せないので、speechSynthesis を、ためしの部品（モック）に入れかえて、呼ばれ方を確かめる。
const path = require('node:path'), { pathToFileURL } = require('node:url'), assert = require('node:assert/strict');
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || undefined });
  const url = pathToFileURL(path.resolve(__dirname, '../index.html')).href;
  async function open(mock) {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } }), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    if (mock) await page.addInitScript(() => {
      window.__spoken = [];
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
      Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { getVoices: () => [{ lang: 'en-US', name: 'Samantha' }, { lang: 'ja-JP', name: 'Kyoko' }], cancel() {}, speak(u) { window.__spoken.push({ text: u.text, rate: u.rate, lang: u.lang, voice: u.voice && u.voice.name }); }, addEventListener() {} } });
    }); else await page.addInitScript(() => { Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined }); Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: undefined }); });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    return { page, errors };
  }
  const show = (page, id, sel) => page.evaluate(([id, sel]) => {
    document.documentElement.dataset.theme = 'day';
    if (!FF.app.state || !FF.app.state.player || FF.app.state.player.grade !== 4) FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4);
    const q = FF.app.bank.byId[id];
    FF.app.session = { renewal: true, sel: Object.assign({ subject: 'english', grade: 4, unit: 'all', difficulty: 'random', answerType: 'choice', resource: 'wood' }, sel || {}), recentIds: [], items: {}, currentId: q.id, order: [q.id], cursor: 0 };
    FF.app.session.items[q.id] = { attempt: FF.learning.startAttempt(q), outcome: null, picked: null, selected: null, typed: '', resource: 'wood' };
    FF.ui.show('quiz');
  }, [id, sel]);

  // 1) 読み上げができる端末：ふつうの問題に、小さなボタン。押すと、英語が、ゆっくり目の速さで読み上げられる
  let { page, errors } = await open(true);
  await show(page, 'english_g4_hand_animal_007');          // 「elephant」は 日本語で どれかな
  assert.equal(await page.locator('.speak-button.small').count(), 1);
  await page.locator('.speak-button.small').click();
  let spoken = await page.evaluate(() => window.__spoken);
  assert.deepEqual(spoken.map(s => s.text), ['elephant']);
  assert.equal(spoken[0].lang, 'en-US'); assert.equal(spoken[0].rate, 0.85); assert.equal(spoken[0].voice, 'Samantha');
  // 日本語しかない問題（「りんご」を英語で…）には、ボタンが出ない
  await show(page, 'english_g4_hand_food_012');
  assert.equal(await page.locator('.speak-row').count(), 0);

  // 2) 聞き取りの問題：大きなボタンで聞く。英語の文字は、画面に出ない。答え合わせのあと、答えの英語を聞き直せる
  await show(page, 'english_g4_hand_listening_001');
  assert.equal(await page.locator('.speak-button.big').count(), 1);
  assert.ok(!(await page.locator('.question-card').textContent()).includes('apple'));
  await page.locator('.speak-button.big').click();
  spoken = await page.evaluate(() => window.__spoken);
  assert.equal(spoken[spoken.length - 1].text, 'apple');
  await page.getByRole('button', { name: 'りんご' }).click();
  assert.ok((await page.locator('.explanation-card .speak-button').count()) >= 1);
  await page.locator('.explanation-card .speak-button').click();
  spoken = await page.evaluate(() => window.__spoken);
  assert.equal(spoken[spoken.length - 1].text, 'apple');

  // 3) 速さの設定：ゆっくりにすると 0.7。オフにすると、ふつうの問題はボタンが出ず、聞き取りの問題は、英語の文字を見せる
  await page.evaluate(() => { FF.app.state.settings.speechRate = 'slow'; });
  await show(page, 'english_g4_hand_animal_007');
  await page.locator('.speak-button.small').click();
  spoken = await page.evaluate(() => window.__spoken);
  assert.equal(spoken[spoken.length - 1].rate, 0.7);
  await page.evaluate(() => { FF.app.state.settings.speech = false; });
  await show(page, 'english_g4_hand_animal_007');
  assert.equal(await page.locator('.speak-row').count(), 0);
  await show(page, 'english_g4_hand_listening_001');
  assert.equal(await page.locator('.speak-row.no-sound').count(), 1);
  assert.ok((await page.locator('.speak-text').textContent()).includes('apple'));
  assert.deepEqual(errors, []);
  await page.close();

  // 4) 読み上げができない端末：聞き取りの問題は、英語の文字を見せる。ふつうの問題には、ボタンが出ない
  ({ page, errors } = await open(false));
  await show(page, 'english_g4_hand_listening_001');
  assert.equal(await page.locator('.speak-button').count(), 0);
  assert.equal(await page.locator('.speak-row.no-sound').count(), 1);
  assert.ok((await page.locator('.speak-text').textContent()).includes('apple'));
  await show(page, 'english_g4_hand_animal_007');
  assert.equal(await page.locator('.speak-row').count(), 0);
  assert.deepEqual(errors, []);
  await page.close();

  // 5) 設定画面：読み上げが使える端末にだけ、オン・オフと速さが出る
  ({ page, errors } = await open(true));
  await page.evaluate(() => { FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4); FF.ui.show('settings'); });
  assert.ok((await page.locator('main#screen').textContent()).includes('英語の読み上げ'));
  await page.getByRole('button', { name: /ゆっくり/ }).click();
  assert.equal(await page.evaluate(() => FF.app.state.settings.speechRate), 'slow');
  assert.ok((await page.evaluate(() => window.__spoken)).length >= 1);   // 速さをえらぶと、ためしに読み上げる
  assert.deepEqual(errors, []);
  await page.close();
  ({ page, errors } = await open(false));
  await page.evaluate(() => { FF.app.state = FF.state.setPlayerGrade(FF.state.createDefaultState(FF.app.now()), 4); FF.ui.show('settings'); });
  assert.ok(!(await page.locator('main#screen').textContent()).includes('英語の読み上げ'));
  assert.deepEqual(errors, []);
  await browser.close();
  console.log('英語の読み上げ：ボタン・聞き取り・設定・読み上げができない端末　すべて成功');
})().catch(e => { console.error(e); process.exit(1); });
