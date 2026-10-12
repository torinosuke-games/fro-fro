// node tests/ui-adventure.cjs — 実際の画面で出発・編成・戦闘・到着・再読み込みまで。
const { chromium } = require(process.env.FF_PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const out = process.env.FF_QA_OUTPUT || '/tmp/fro-fro-adventure-qa';
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.FF_BROWSER_PATH || '/usr/bin/chromium' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, reducedMotion: 'reduce' });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    // Google Fontsは任意。外部ネットワーク待ちを切り離して同梱画像とシステムフォントで検証。
    await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, r => r.abort());
    await page.addInitScript(()=>{window.FF_FIELD_MODE='css';});   // Canvas の表示ではなく、CSS の表示を確かめる（判断387）
    await page.goto(process.env.FF_TEST_URL || 'http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
    await page.locator('.title-card input').fill('ゆき'); await page.locator('.title-card .btn.primary').click();
    await page.getByRole('button', { name: '小学4年', exact: true }).click();
    await page.evaluate(() => { FF.adventureRng = () => 0.99; });
    await page.locator('.avatar-pick').first().click(); await page.locator('.intro-line + button').click();
    await page.getByRole('button', { name: '雪原へ出発', exact: true }).click();
    await page.waitForSelector('.adv-map');
    assert.ok(!(await page.locator('.adv-settings').innerText()).includes('undefined'));
    await page.screenshot({ path: out + '/field-desktop.png', fullPage: true });
    await page.getByRole('button', { name: '仲間を編成', exact: true }).click();
    assert.equal(await page.locator('.adv-roster-card:not(.adv-roster-locked)').count(), 4);
    assert.equal(await page.locator('.adv-roster-locked').count(), 6);
    const sora = page.locator('.adv-roster-card').nth(3);
    await sora.getByRole('button', { name: '隊から外す', exact: true }).click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.party.length), 3);
    await sora.getByRole('button', { name: '参加する', exact: true }).click();
    await sora.getByRole('button', { name: 'ひとつ前へ', exact: true }).click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.party[2]), 'kenshi');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: out + '/party-phone.png', fullPage: true });
    // いまの隊：4つの枠に、先頭から順に、名前が出る。「この仲間で旅をする」は、ない（判断358）
    assert.equal(await page.getByRole('button', { name: 'この仲間で旅をする', exact: true }).count(), 0);
    assert.equal(await page.locator('.adv-squad-slot').count(), 4);
    assert.deepEqual(await page.locator('.adv-squad-slot:not(.is-empty)').evaluateAll(n => n.map(e => e.getAttribute('data-member'))), await page.evaluate(() => FF.app.state.adventure.party));
    await page.locator('.adv-squad-slot[data-member="kenshi"] .adv-squad-move').click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.party[1]), 'kenshi');
    await page.locator('.adv-squad-slot[data-member="kenshi"] .adv-squad-out').click();
    assert.ok(!(await page.evaluate(() => FF.app.state.adventure.party.includes('kenshi'))));
    assert.equal(await page.locator('.adv-squad-slot.is-empty').count(), 1);
    const back = page.locator('.adv-roster-card:not(.adv-roster-locked)', { hasText: 'アカネ' });   // 元の並びにもどす
    await back.getByRole('button', { name: '参加する', exact: true }).click();
    await back.getByRole('button', { name: 'ひとつ前へ', exact: true }).click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.party[2]), 'kenshi');
    await page.getByRole('button', { name: '町の画面へ', exact: true }).click();
    await page.getByRole('button', { name: /雪原へ出発|冒険のつづき/ }).click();
    await page.screenshot({ path: out + '/field-phone.png', fullPage: true });
    assert.ok(await page.locator('.adv-world-art').evaluate(img => img.complete && img.naturalWidth > 0));
    assert.equal(await page.locator('.adv-traveler').count(), 1);
    await page.getByRole('button', { name: '全体マップ', exact: true }).click();
    assert.ok(await page.locator('.adv-map-viewport.overview').isVisible());
    await page.screenshot({ path: out + '/overview-phone.png', fullPage: true });
    await page.getByRole('button', { name: '現在地へ', exact: true }).click();
    await page.getByRole('button', { name: '東へ', exact: true }).click();
    await page.waitForFunction(() => FF.app.state.adventure.pos.x === 2);
    assert.equal(await page.locator('.adv-traveler').getAttribute('data-facing'), 'right');
    await page.getByRole('button', { name: '北へ', exact: true }).click();
    assert.equal(await page.locator('.adv-traveler').getAttribute('data-facing'), 'up');
    await page.getByRole('button', { name: '東へ', exact: true }).click();
    await page.getByRole('button', { name: '西へ', exact: true }).click();
    assert.equal(await page.locator('.adv-traveler').getAttribute('data-facing'), 'left');
    await page.getByRole('button', { name: '南へ', exact: true }).click();
    assert.equal(await page.locator('.adv-traveler').getAttribute('data-facing'), 'down');
    await page.getByRole('button', { name: '西へ', exact: true }).click();
    await page.waitForFunction(() => FF.app.screen === 'base');
    await page.getByRole('button', { name: '冒険のつづき', exact: true }).click();
    assert.deepEqual(await page.evaluate(() => FF.app.state.adventure.pos), { x: 1, y: 6 });
    assert.equal(await page.locator('.adv-traveler').count(), 1);
    // Every selectable candidate maps to a detailed sheet with four large poses.
    const sprites = await page.evaluate(async () => {
      const urls = [...new Set(FF.defs.AVATARS.map(id => FF.adventureScene.traveler(id)))];
      const sizes = await Promise.all(urls.map(async src => { const image=new Image(); image.src=src; await image.decode(); return [image.naturalWidth,image.naturalHeight]; }));
      return {count:urls.length, sizes};
    });
    assert.equal(sprites.count,14);
    assert.ok(sprites.sizes.every(([w,h]) => w === h && w / 2 >= 600));
    const checkWidth = async () => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Horizontal overflow');
    await checkWidth();
    async function go(x, y) {
      await page.locator('.adv-tile[data-x="' + x + '"][data-y="' + y + '"]').click();
      await page.waitForFunction(([x, y]) => FF.app.state.adventure.pos.x === x && FF.app.state.adventure.pos.y === y, [x, y]);
    }
    // ザコ敵は、歩いていると、ランダムに現れる（判断376）。ここでは、乱数を固定して、1歩で出す。ふだんは、出ないようにする
    const quiet = () => page.evaluate(() => { FF.adventureRng = () => 0.99; });
    async function goFight(x, y) {
      await page.evaluate(() => { FF.adventureRng = () => 0; const s = FF.util.clone(FF.app.state); s.adventure.steps = 99; FF.app.commit(s); });
      await page.locator('.adv-tile[data-x="' + x + '"][data-y="' + y + '"]').click();
      await page.waitForFunction(() => FF.app.state.adventure.battle);
      await quiet();
    }
    await goFight(3, 6);
    await page.locator('.bt-app').waitFor();
    await page.screenshot({ path: out + '/commands-phone.png' });
    assert.equal(await page.locator('.bt-member').count(), 4);
    assert.equal(await page.evaluate(() => FF.app.state.adventure.battle.enemy), 'cub');
    // 作戦を決めるだけでは、MP・回復薬は減らない（判断394。戦闘の画面の細かい確認は tests/ui-battle.cjs）
    await page.locator('[data-order="defend"]').click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.potions), 3);
    await page.locator('.bt-escape').click(); await page.locator('.overlay .actions .btn.primary').click();
    await page.waitForFunction(() => !FF.app.state.adventure.battle);
    await goFight(3, 6);
    let checkedReload = false, seenWrong = false;
    async function fight() {
      for (let step = 0; step < 90; step++) {
        const b = await page.evaluate(() => FF.app.state.adventure.battle);
        if (b.phase === 'win') {
          await page.locator('[data-do="finish"].win').waitFor({ state: 'visible' });
          const gold = await page.evaluate(() => FF.app.state.adventure.gold);
          await page.locator('[data-do="finish"]').click();
          await page.waitForFunction(() => !FF.app.state.adventure.battle);
          assert.equal(await page.evaluate(() => FF.app.state.adventure.gold), gold);
          return;
        }
        assert.notEqual(b.phase, 'lose');
        if (b.phase === 'commands') {
          await page.locator('[data-do="startQuiz"]').click();
        } else if (b.phase === 'attack') {
          await page.locator('[data-choice="0"]').waitFor();
          assert.ok(await page.evaluate(() => { const c = document.querySelector('.bt-primary').getBoundingClientRect(); return c.bottom <= innerHeight; }), '決定のボタンが画面におさまる');
          if (!checkedReload) {
            const before = await page.evaluate(() => JSON.stringify(FF.app.state.adventure));
            await page.reload({ waitUntil: 'domcontentloaded' }); await quiet();
            assert.equal(await page.evaluate(() => JSON.stringify(FF.app.state.adventure)), before);
            await page.getByRole('button', { name: '冒険のつづき', exact: true }).click();
            assert.equal(await page.evaluate(() => FF.app.state.adventure.battle), null);
            checkedReload = true; await goFight(3, 6); continue;
          }
          const wrong = !seenWrong; seenWrong = true;
          const index = b.choices.findIndex(c => wrong ? c !== b.question.answer : c === b.question.answer);
          await page.locator('[data-choice="' + index + '"]').click();
          await page.locator('[data-do="submit"]').click();
          await page.locator('[data-do="ack"]').waitFor();
        } else if (b.phase === 'explanation') {
          await page.locator('[data-do="ack"]').click();
          await page.waitForFunction(() => { const x = FF.app.state.adventure.battle; return !x || x.phase === 'commands' || x.phase === 'win' || x.phase === 'lose'; }, null, { timeout: 30000 });
        } else await page.waitForTimeout(300);
      }
      throw Error('Battle did not finish');
    }
    await fight(); assert.ok(checkedReload);
    await goFight(6, 5); await fight();
    await go(6, 3); // 焚き火で回復
    await go(8, 6); await fight();
    await go(11, 2);
    assert.equal(await page.evaluate(() => FF.app.state.adventure.arrived), true);
    assert.ok(await page.getByText('灯りの集落に、到着！', { exact: true }).isVisible());
    await page.screenshot({ path: out + '/arrival-phone.png', fullPage: true });
    const result = await page.evaluate(() => ({ gold: FF.app.state.adventure.gold, answered: FF.app.state.adventure.answered, correct: FF.app.state.adventure.correct, town: FF.app.state.adventure.lastTown, levels: FF.app.state.adventure.party.map(id => FF.adventure.stats(id, FF.app.state.adventure.roster[id].xp).level) }));
    assert.ok(result.gold >= 190);   // 野獣20G＋野獣20G＋大獣150G（ザコ敵は、ランダム。判断376）
     assert.ok(result.answered > 0); assert.equal(result.correct, result.answered - 1);
    for (const width of [360, 768, 1440]) { await page.setViewportSize({ width, height: 1000 }); await checkWidth(); }
    await page.screenshot({ path: out + '/arrival-desktop.png', fullPage: true });
    await page.reload({ waitUntil: 'domcontentloaded' }); await quiet(); await page.getByRole('button', { name: '冒険のつづき', exact: true }).click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.lastTown), 'home');
    assert.deepEqual(await page.evaluate(() => FF.app.state.adventure.pos), { x: 1, y: 6 });
    assert.equal(await page.evaluate(() => FF.app.state.studyPoints), 0);
    // Change the actual settings picker, then verify departure uses the chosen avatar.
    await page.getByRole('button', { name: '町の画面へ', exact: true }).click();
    await page.locator('.masthead-links .masthead-link').nth(2).click();
    await page.locator('.avatar-pick').nth(11).click();
    await page.getByRole('button', { name: 'Frozen Frontier', exact: true }).click();
    await page.getByRole('button', { name: '冒険のつづき', exact: true }).click();
    assert.equal(await page.locator('.adv-traveler').getAttribute('data-avatar'), 'e12');
    await page.getByRole('button', { name: '北へ', exact: true }).click();
    assert.ok((await page.locator('.adv-traveler').getAttribute('data-sprite')).endsWith('e12.webp'));
    await page.screenshot({ path: out + '/witch-up-phone.png', fullPage: true });
    await page.getByRole('button', { name: '町の画面へ', exact: true }).click();
    await page.locator('.masthead-links .masthead-link').nth(2).click();
    await page.getByRole('button', { name: '中学1年', exact: true }).click();
    await page.locator('.avatar-pick').nth(5).click();
    await page.getByRole('button', { name: 'Frozen Frontier', exact: true }).click();
    await page.locator('#nav button', { hasText: '仲間' }).click();   // 下のナビ（判断360・361）
    await page.getByRole('button', { name: '町の画面へ', exact: true }).click();
    await page.getByRole('button', { name: /雪原へ出発|冒険のつづき/ }).click();
    assert.deepEqual(await page.evaluate(() => FF.app.state.adventure.pos), { x: 1, y: 6 });
    assert.equal(await page.locator('.adv-traveler').getAttribute('data-avatar'), 'j6');
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ status: 'PASS', checks: 'onboarding, party, symbol encounters, escape, commands, wrong answer, automatic retaliation, saved state, town return, town departure, facing, avatar settings, 14 detailed sprite sheets, viewport quiz dialogs, explanation before hit feedback, three enemies, camp, arrival, responsive layouts', result, errors, screenshots: out }, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
