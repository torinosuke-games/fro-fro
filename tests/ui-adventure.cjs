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
    await page.goto(process.env.FF_TEST_URL || 'http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
    await page.locator('.title-card input').fill('ゆき'); await page.locator('.title-card .btn.primary').click();
    await page.getByRole('button', { name: '小学4年', exact: true }).click();
    await page.locator('.avatar-pick').first().click(); await page.locator('.intro-line + button').click();
    await page.getByRole('button', { name: '雪原へ出発', exact: true }).click();
    await page.waitForSelector('.adv-map');
    assert.ok(!(await page.locator('.adv-settings').innerText()).includes('undefined'));
    await page.screenshot({ path: out + '/field-desktop.png', fullPage: true });
    await page.getByRole('button', { name: '仲間を編成', exact: true }).click();
    assert.equal(await page.locator('.adv-roster-card:not(.adv-roster-locked)').count(), 4);
    assert.equal(await page.locator('.adv-roster-locked').count(), 6);
    const sora = page.locator('.adv-roster-card').nth(3);
    await sora.getByRole('button', { name: '待ってもらう', exact: true }).click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.party.length), 3);
    await sora.getByRole('button', { name: '参加する', exact: true }).click();
    await sora.getByRole('button', { name: 'ひとつ前へ', exact: true }).click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.party[2]), 'kenshi');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: out + '/party-phone.png', fullPage: true });
    await page.getByRole('button', { name: 'この仲間で旅をする', exact: true }).click();
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
    await go(3, 6);
    await page.screenshot({ path: out + '/commands-phone.png', fullPage: true });
    assert.equal(await page.locator('.adv-rpg-stats .adv-status').count(), 4);
    await page.getByRole('button', { name: 'ミレイの行動を選ぶ', exact: true }).click();
    await page.getByRole('button', { name: 'まほう', exact: true }).click();
    await page.locator('.adv-subcommand-menu .adv-command').first().click();
    await page.locator('.adv-subcommand-menu .adv-command').first().click();
    await page.getByRole('button', { name: 'ゆきの行動を選ぶ', exact: true }).click();
    await page.getByRole('button', { name: 'どうぐ', exact: true }).click();
    await page.locator('.adv-subcommand-menu .adv-command').first().click();
    await page.locator('.adv-subcommand-menu .adv-command').nth(1).click();
    assert.equal(await page.locator('.adv-order-chip').count(),0);
    assert.equal(await page.getByRole('button',{name:'クイズで行動する',exact:true}).count(),0);
    assert.equal(await page.locator('.adv-quiz-dialog').count(),0);
    // Planning commands never spends MP or supplies before answering.
    assert.equal(await page.evaluate(() => FF.app.state.adventure.potions), 3);
    for (const width of [360, 768, 1440]) { await page.setViewportSize({ width, height: 1000 }); await checkWidth(); }
    await page.screenshot({ path: out + '/commands-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => FF.app.state.adventure.battle.enemy), 'cub');
    assert.equal(await page.locator('.adv-status[aria-pressed="true"]').getAttribute('aria-label'),'ガルドの行動を選ぶ');
    await page.getByRole('button',{name:'たたかう',exact:true}).click();
    assert.equal(await page.locator('.adv-status[aria-pressed="true"]').getAttribute('aria-label'),'アカネの行動を選ぶ');
    assert.equal(await page.locator('.adv-quiz-dialog').count(),0);
    await page.getByRole('button',{name:'たたかう',exact:true}).click();
    await page.locator('.adv-quiz-dialog[open]').waitFor();
    assert.deepEqual(await page.evaluate(()=>FF.app.state.adventure.battle.orders.hero),{type:'item',target:'juushouhei'});
    assert.deepEqual(await page.evaluate(()=>FF.app.state.adventure.battle.orders.siromadoushi),{type:'magic',target:'hero'});
    assert.equal(await page.evaluate(()=>FF.app.state.adventure.potions),3);
    await page.getByRole('button', { name: '戦闘からにげる', exact: true }).click();
    assert.equal(await page.evaluate(() => FF.app.state.adventure.battle), null);
    await go(3, 6);
    let seenMagic = false, seenDefense = false, checkedReload = false, seenWrong = false;
    async function fight() {
      for (let turn = 0; turn < 70; turn++) {
        const b = await page.evaluate(() => FF.app.state.adventure.battle);
        if (b.phase === 'win') {
          await page.locator('.adv-result.win').waitFor({state:'visible'});
          const gold = await page.evaluate(() => FF.app.state.adventure.gold);
          await page.getByRole('button', { name: '旅をつづける', exact: true }).click();
          assert.equal(await page.evaluate(() => FF.app.state.adventure.gold), gold);
          return;
        }
        assert.notEqual(b.phase, 'lose');
        if (b.phase === 'commands') {
          if (b.turn >= 2) assert.equal(await page.locator('.adv-rpg-shell.encounter').count(), 0, 'encounter flash class is removed after it plays (decision 347)');
          if (b.turn === 1) await page.screenshot({ path: out + '/enemy-' + b.enemy + '-phone.png', fullPage: true });
          if (!seenMagic) { await page.getByRole('button', { name: 'まほう', exact: true }).click(); await page.locator('.adv-subcommand-menu .adv-command').first().click(); seenMagic = true; }
          for(let i=0;i<4 && await page.evaluate(()=>FF.app.state.adventure.battle.phase==='commands');i++) await page.getByRole('button',{name:'たたかう',exact:true}).click();
        } else if (b.phase === 'attack') {
          await page.locator('.adv-quiz-dialog[open]').waitFor();
          assert.ok(await page.evaluate(() => {
            const d=document.querySelector('.adv-quiz-dialog').getBoundingClientRect(), c=document.querySelector('.adv-choices').getBoundingClientRect();
            return scrollY === 0 && d.top >= 0 && d.bottom <= innerHeight && c.bottom <= innerHeight;
          }), 'Quiz and answers fit the viewport without scrolling the battle');
          if (!checkedReload) {
            await page.screenshot({ path: out + '/battle-phone.png', fullPage: true });
            const before = await page.evaluate(() => JSON.stringify(FF.app.state.adventure));
            await page.reload({ waitUntil: 'domcontentloaded' });
            assert.equal(await page.evaluate(() => JSON.stringify(FF.app.state.adventure)), before);
            await page.getByRole('button', { name: '冒険のつづき', exact: true }).click();
            assert.equal(await page.evaluate(() => FF.app.state.adventure.battle), null);
            assert.deepEqual(await page.evaluate(() => FF.app.state.adventure.pos), { x: 1, y: 6 });
            checkedReload = true;
            await go(3,6); continue;
          }
          const wrong = !seenWrong; seenWrong = true;
          const index = b.choices.findIndex(c => wrong ? c !== b.question.answer : c === b.question.answer);
          await page.locator('.adv-answer').nth(index).click();
          const damaged = await page.evaluate(() => document.querySelector('.adv-enemy-art').classList.contains('is-hit'));
          assert.equal(damaged, false, 'Explanation precedes damage');
          await page.locator('.adv-feedback').waitFor({state:'visible'});
          await checkWidth();
        } else if (b.phase === 'explanation') await page.getByRole('button', { name: '戦闘へ戻る', exact: true }).click();
        else if (b.phase === 'playerAction' || b.phase === 'enemyAction') {
          seenDefense = seenDefense || b.phase === 'enemyAction';
          assert.equal(await page.locator('.adv-quiz-dialog').count(), 0);
          await page.waitForFunction(phase => FF.app.state.adventure.battle.phase !== phase, b.phase);
        }
      }
      throw Error('Battle did not finish');
    }
    await fight(); assert.ok(seenMagic && seenDefense && checkedReload);
    await go(6, 5); await fight();
    await go(6, 3); // 焚き火で回復
    await go(8, 6); await fight();
    await go(11, 2);
    assert.equal(await page.evaluate(() => FF.app.state.adventure.arrived), true);
    assert.ok(await page.getByText('灯りの集落に、到着！', { exact: true }).isVisible());
    await page.screenshot({ path: out + '/arrival-phone.png', fullPage: true });
    const result = await page.evaluate(() => ({ gold: FF.app.state.adventure.gold, answered: FF.app.state.adventure.answered, correct: FF.app.state.adventure.correct, town: FF.app.state.adventure.lastTown, levels: FF.app.state.adventure.party.map(id => FF.adventure.stats(id, FF.app.state.adventure.roster[id].xp).level) }));
    assert.ok(result.gold >= 101); assert.ok(result.answered > 0); assert.equal(result.correct, result.answered - 1);
    for (const width of [360, 768, 1440]) { await page.setViewportSize({ width, height: 1000 }); await checkWidth(); }
    await page.screenshot({ path: out + '/arrival-desktop.png', fullPage: true });
    await page.reload({ waitUntil: 'domcontentloaded' }); await page.getByRole('button', { name: '冒険のつづき', exact: true }).click();
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
    await page.getByRole('button', { name: '仲間を編成', exact: true }).click();
    await page.getByRole('button', { name: 'この仲間で旅をする', exact: true }).click();
    assert.deepEqual(await page.evaluate(() => FF.app.state.adventure.pos), { x: 1, y: 6 });
    assert.equal(await page.locator('.adv-traveler').getAttribute('data-avatar'), 'j6');
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ status: 'PASS', checks: 'onboarding, party, symbol encounters, escape, commands, wrong answer, automatic retaliation, saved state, town return, town departure, facing, avatar settings, 14 detailed sprite sheets, viewport quiz dialogs, explanation before hit feedback, three enemies, camp, arrival, responsive layouts', result, errors, screenshots: out }, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
