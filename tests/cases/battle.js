// 戦闘（SPEC_v0.3_battle 第1章・第3章、DESIGN 13.4・13.5・13.10）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const X = FF.exploration;
  const BA = FF.battle;
  const B = FF.balance;
  const BT = B.BATTLE;
  const T0 = 1790000000000;
  const bank = FF.learning.createBank(ctx.QUESTION_BANK);

  function base(furnace = 5) {
    const s = FF.state.createDefaultState(T0);
    s.buildings.furnace.level = furnace;
    return s;
  }
  // 地域を pos まで進める（ボスの地点へはボスに勝って進む）
  function advanceTo(s, regionId, pos) {
    while (X.regionState(s, regionId).position < pos) {
      if (X.nextIsBoss(s, regionId)) { s = BA.winBattle(s, regionId, X.bossNode(regionId).enemy, T0).state; continue; }
      s = X.advance(s, regionId, T0, FF.util.makeRng(1)).state;
    }
    return s;
  }
  const gate = (s, regionId) => advanceTo(s, regionId, X.gateIndex(regionId));

  const choiceQ = {
    id: 'test_battle_choice', subject: 'math', gradeLevel: 1, unit: 't', difficulty: 'basic', answerType: 'choice',
    question: '1+1', choices: ['1', '2', '3', '4'], answer: '2', hints: ['h'], explanation: 'e', reviewed: true
  };
  const inputQ = {
    id: 'test_battle_input', subject: 'math', gradeLevel: 1, unit: 't', difficulty: 'basic', answerType: 'input',
    question: '1+1', answer: '2', acceptedAnswers: [], validationMode: 'number', hints: ['h'], explanation: 'e', reviewed: true
  };
  const att = q => FF.learning.startAttempt(q, FF.util.makeRng(3));
  const hit = (s, bat, q, input) => BA.answerBattle(s, bat, att(q), input, T0, FF.util.makeRng(5));
  // 勝つまで正解し続ける
  function winAll(s, bat) {
    let r = { state: s, battle: bat };
    while (!r.battle.result) r = hit(r.state, r.battle, choiceQ, '2');
    return r;
  }
  // 負けるまでまちがえ続ける
  function loseAll(s, bat) {
    let r = { state: s, battle: bat };
    while (!r.battle.result) r = hit(r.state, r.battle, choiceQ, '1');
    return r;
  }

  // ---- 定義と数値 ----
  test('敵の数値：HP は正解のダメージの倍数、攻撃力で負けるまでのまちがいは雑魚5回・ボス6回（DESIGN 13.4）', () => {
    const ids = Object.keys(FF.defs.ENEMIES);
    assert.strictEqual(ids.length, 10);
    for (const id of ids) {
      const st = BT.ENEMIES[id], boss = FF.defs.ENEMIES[id].boss;
      assert.strictEqual(st.hp % BT.DAMAGE_PER_CORRECT, 0, id);
      assert.strictEqual(Math.ceil(BT.PLAYER_HP / st.attack), boss ? 6 : 5, id);
    }
  });

  test('敵の名前は地図の地点と同じ。遭遇・勝利・負けの文章に読みのない漢字がない', () => {
    const missing = new Map();
    for (const r of FF.defs.REGIONS) {
      for (const n of r.nodes.filter(x => x.enemy)) assert.strictEqual(n.name, FF.defs.ENEMIES[n.enemy].name, n.id);
    }
    const strings = [FF.defs.BATTLE_LOSE_TEXT];
    for (const id in FF.defs.ENEMIES) { const e = FF.defs.ENEMIES[id]; strings.push(e.name, e.encounter, e.victory); }
    for (const s of strings) for (const k of FF.util.bareKanji(s)) if (!missing.has(k)) missing.set(k, s);
    assert.deepStrictEqual([...missing.keys()], [], [...missing.entries()].map(([k, s]) => k + '：' + s).join('\n'));
  });

  test('氷河の文章（地点・導入・完了・イベント）に読みのない漢字がない', () => {
    const r = X.regionDef('glacier');
    const strings = [r.name, r.intro, r.completeText].concat(r.nodes.flatMap(n => [n.name, n.text]));
    r.events.forEach(id => {
      const ev = FF.defs.EXPLORE_EVENTS[id];
      strings.push(ev.text);
      (ev.options || []).forEach(o => strings.push(o.label, o.result));
    });
    const bad = strings.filter(s => FF.util.bareKanji(s, { name: 'X' }).length);
    assert.deepStrictEqual(bad, []);
  });

  // ---- 戦える条件 ----
  test('寄り道の敵は隣の地点に着くまで戦えず、着いたら戦える。ボスは手前まで進むと戦える', () => {
    let s = base(3);
    assert.strictEqual(BA.startBattle(s, 'snowfield', 'sf_enemy_fangs'), null);
    assert.strictEqual(BA.startBattle(s, 'snowfield', 'sf_boss_wolf'), null);
    s = advanceTo(s, 'snowfield', X.route('snowfield').findIndex(n => n.id === 'sf_07'));
    const bat = BA.startBattle(s, 'snowfield', 'sf_enemy_fangs');
    assert.ok(bat);
    assert.strictEqual(bat.enemyHp, 30);
    assert.strictEqual(bat.playerHp, BT.PLAYER_HP);
    assert.strictEqual(BA.startBattle(s, 'snowfield', 'sf_enemy_machine'), null, '隣の [8] にはまだ着いていない');
    assert.strictEqual(BA.startBattle(s, 'snowfield', 'sf_boss_wolf'), null);
    s = gate(s, 'snowfield');
    assert.ok(BA.startBattle(s, 'snowfield', 'sf_boss_wolf'));
    assert.strictEqual(BA.startBattle(s, 'snowfield', 'fr_enemy_antler'), null, 'ほかの地域の敵は選べない');
    assert.strictEqual(BA.startBattle(s, 'snowfield', 'nope'), null);
  });

  test('未解放の地域の敵とは戦えない', () => {
    const s = base(2);
    assert.strictEqual(BA.canChallenge(s, 'snowfield', 'sf_enemy_fangs'), false);
  });

  // ---- ダメージと勝ち負け ----
  test('正解で敵に 10、まちがいで隊長に敵の攻撃力ぶんのダメージ', () => {
    const s = gate(base(3), 'snowfield');
    let bat = BA.startBattle(s, 'snowfield', 'sf_enemy_fangs');
    let r = hit(s, bat, choiceQ, '2');
    assert.strictEqual(r.outcome.status, 'correct');
    assert.strictEqual(r.outcome.damageDealt, 10);
    assert.strictEqual(r.battle.enemyHp, 20);
    assert.strictEqual(r.battle.playerHp, 100);
    r = hit(r.state, r.battle, choiceQ, '3');
    assert.strictEqual(r.outcome.status, 'wrong');
    assert.strictEqual(r.outcome.damageTaken, 20);
    assert.strictEqual(r.battle.playerHp, 80);
    assert.strictEqual(r.battle.enemyHp, 20);
    assert.strictEqual(r.battle.missed, true);
    assert.strictEqual(r.result, null);
  });

  test('書き問題は1問3回まで。まちがえるたびにダメージを受け、3回で終わる', () => {
    const s = gate(base(3), 'snowfield');
    const bat = BA.startBattle(s, 'snowfield', 'sf_enemy_fangs');
    let a = att(inputQ);
    let r = BA.answerBattle(s, bat, a, '5', T0);
    assert.strictEqual(r.outcome.status, 'retry');
    assert.strictEqual(r.outcome.attemptsLeft, 2);
    assert.strictEqual(r.battle.playerHp, 80);
    r = BA.answerBattle(r.state, r.battle, r.attempt, '6', T0);
    assert.strictEqual(r.outcome.status, 'retry');
    r = BA.answerBattle(r.state, r.battle, r.attempt, '7', T0);
    assert.strictEqual(r.outcome.status, 'wrong');
    assert.strictEqual(r.battle.playerHp, 40);
    assert.strictEqual(r.attempt.done, true);
    assert.strictEqual(BA.answerBattle(r.state, r.battle, r.attempt, '2', T0).outcome.error, 'finished');
    // 2回目で正解してもダメージは 10
    const r2 = BA.answerBattle(s, bat, att(inputQ), '9', T0);
    const r3 = BA.answerBattle(r2.state, r2.battle, r2.attempt, '2', T0);
    assert.strictEqual(r3.outcome.status, 'correct');
    assert.strictEqual(r3.outcome.damageDealt, 10);
  });

  test('空欄の回答は数えない', () => {
    const s = gate(base(3), 'snowfield');
    const bat = BA.startBattle(s, 'snowfield', 'sf_enemy_fangs');
    const r = hit(s, bat, inputQ, '  ');
    assert.strictEqual(r.outcome.error, 'empty');
    assert.strictEqual(r.battle, bat);
  });

  test('敵の HP が 0 で勝ち：倒した記録と初回の報酬。2回目は報酬なし', () => {
    let s = advanceTo(base(3), 'snowfield', 6);
    const res0 = plain(s.resources);
    const r = winAll(s, BA.startBattle(s, 'snowfield', 'sf_enemy_fangs'));
    assert.strictEqual(r.result, 'win');
    assert.strictEqual(r.win.firstTime, true);
    assert.deepStrictEqual(plain(r.win.reward), plain(BT.REWARDS.sf_enemy_fangs));
    assert.strictEqual(r.state.resources.food, res0.food + BT.REWARDS.sf_enemy_fangs.food);
    assert.deepStrictEqual(plain(X.regionState(r.state, 'snowfield').defeated), ['sf_enemy_fangs']);
    assert.strictEqual(X.enemyStatus(r.state, 'snowfield', 'sf_enemy_fangs'), 'defeated');
    assert.strictEqual(X.regionState(r.state, 'snowfield').position, 6, '寄り道の敵では進まない');
    const again = winAll(r.state, BA.startBattle(r.state, 'snowfield', 'sf_enemy_fangs'));
    assert.strictEqual(again.win.firstTime, false);
    assert.strictEqual(again.win.reward, null);
    assert.deepStrictEqual(plain(again.state.resources), plain(r.state.resources));
    assert.strictEqual(BA.answerBattle(again.state, again.battle, att(choiceQ), '2', T0).outcome.error, 'over');
  });

  test('隊長の HP が 0 で負け：資源・チケットは減らず、何度でも満タンから挑める', () => {
    const s = gate(base(3), 'snowfield');
    const bat = BA.startBattle(s, 'snowfield', 'sf_enemy_machine');
    const r = loseAll(s, bat);
    assert.strictEqual(r.result, 'lose');
    assert.strictEqual(r.battle.playerHp, 0);
    assert.deepStrictEqual(plain(r.state.resources), plain(s.resources));
    assert.deepStrictEqual(plain(r.state.tickets), plain(s.tickets));
    assert.strictEqual(X.enemyStatus(r.state, 'snowfield', 'sf_enemy_machine'), 'available');
    assert.strictEqual(X.regionState(r.state, 'snowfield').bossLosses, 0, '雑魚の負けは数えない');
    const again = BA.startBattle(r.state, 'snowfield', 'sf_enemy_machine');
    assert.strictEqual(again.playerHp, BT.PLAYER_HP);
    assert.strictEqual(again.enemyHp, 40);
  });

  test('負けるまでのまちがいの回数：雑魚は5回目、ボスは6回目', () => {
    let s = gate(base(3), 'snowfield');
    const count = bat => { let r = { state: s, battle: bat }, n = 0; while (!r.battle.result) { r = hit(r.state, r.battle, choiceQ, '1'); n++; } return n; };
    assert.strictEqual(count(BA.startBattle(s, 'snowfield', 'sf_enemy_fangs')), 5);
    assert.strictEqual(count(BA.startBattle(s, 'snowfield', 'sf_boss_wolf')), 6);
  });

  // ---- ボス ----
  test('ボスに勝つと地域が 100% になり、完了時刻が付く。報酬は1回だけ', () => {
    let s = gate(base(3), 'snowfield');
    const tickets0 = s.tickets.count;
    const r = winAll(s, BA.startBattle(s, 'snowfield', 'sf_boss_wolf'));
    assert.strictEqual(r.result, 'win');
    assert.strictEqual(r.win.completed, true);
    assert.strictEqual(X.isComplete(r.state, 'snowfield'), true);
    assert.strictEqual(X.progressPercent(r.state, 'snowfield'), 100);
    assert.strictEqual(X.regionState(r.state, 'snowfield').completedAt, T0);
    assert.strictEqual(r.state.tickets.count, tickets0 + BT.REWARDS.sf_boss_wolf.tickets);
    assert.strictEqual(X.nodeStatus(r.state, 'snowfield', 'sf_11'), 'current');
    // もう一度挑める（報酬・完了時刻は変わらない）
    const again = winAll(r.state, BA.startBattle(r.state, 'snowfield', 'sf_boss_wolf'));
    assert.strictEqual(again.win.reward, null);
    assert.strictEqual(again.win.completed, false);
    assert.strictEqual(X.regionState(again.state, 'snowfield').completedAt, T0);
  });

  test('ボスに負けるたびに、次の挑戦の HP が減る（半分まで）。勝つと元に戻る', () => {
    let s = gate(base(3), 'snowfield');
    const hps = [];
    for (let i = 0; i < 7; i++) {
      const bat = BA.startBattle(s, 'snowfield', 'sf_boss_wolf');
      hps.push(bat.enemyHp);
      s = loseAll(s, bat).state;
    }
    assert.deepStrictEqual(hps, [80, 70, 60, 60, 50, 40, 40]);
    assert.strictEqual(X.regionState(s, 'snowfield').bossLosses, X.bossLossCap());
    assert.strictEqual(X.bossLossCap(), 5);
    s = winAll(s, BA.startBattle(s, 'snowfield', 'sf_boss_wolf')).state;
    assert.strictEqual(X.regionState(s, 'snowfield').bossLosses, 0);
    assert.strictEqual(BA.startBattle(s, 'snowfield', 'sf_boss_wolf').enemyHp, 80, '倒したあとの挑戦は満タンの HP');
  });

  test('ボスの HP の軽減：森の奥の主は 100 → 50、氷河の守護機は 120 → 60 まで', () => {
    let s = base(5);
    s = gate(s, 'snowfield');
    s = gate(s, 'forest');
    s = gate(s, 'glacier');
    const w = X.withRegion(s, 'forest'); w.rs.bossLosses = 5; s = w.s;
    const w2 = X.withRegion(s, 'glacier'); w2.rs.bossLosses = 5; s = w2.s;
    assert.strictEqual(BA.startBattle(s, 'forest', 'fr_enemy_warden').enemyHp, 50);
    assert.strictEqual(BA.startBattle(s, 'glacier', 'gl_boss_guardian').enemyHp, 60);
  });

  test('引き返す：負けと同じ扱い（ボスなら負けの回数に数える。何も失わない）', () => {
    const s = gate(base(3), 'snowfield');
    const bat = BA.startBattle(s, 'snowfield', 'sf_boss_wolf');
    const r1 = hit(s, bat, choiceQ, '2');
    const r = BA.retreatBattle(r1.state, r1.battle);
    assert.strictEqual(r.battle.result, 'lose');
    assert.strictEqual(X.regionState(r.state, 'snowfield').bossLosses, 1);
    assert.deepStrictEqual(plain(r.state.resources), plain(s.resources));
    const side = BA.retreatBattle(s, BA.startBattle(s, 'snowfield', 'sf_enemy_fangs'));
    assert.strictEqual(X.regionState(side.state, 'snowfield').bossLosses, 0);
  });

  // ---- 地域の解放 ----
  test('次の地域は、前の地域のボスの手前まで進めば開く（ボスに勝たなくてよい）', () => {
    let s = base(4);
    assert.strictEqual(X.isRegionUnlocked(s, 'forest'), false);
    s = gate(s, 'snowfield');
    assert.strictEqual(X.isComplete(s, 'snowfield'), false);
    assert.strictEqual(X.isRegionUnlocked(s, 'forest'), true);
    assert.strictEqual(X.isRegionUnlocked(s, 'glacier'), false);
    s = gate(s, 'forest');
    assert.strictEqual(X.isRegionUnlocked(s, 'glacier'), false, '中央炉 Lv5 が必要');
    s.buildings.furnace.level = 5;
    assert.strictEqual(X.isRegionUnlocked(s, 'glacier'), true);
  });

  // ---- 出題 ----
  test('戦闘の出題：一度まちがえたら書き問題だけ。まちがえる前は選択問題も出る', () => {
    const s = gate(base(3), 'snowfield');
    const bat = BA.startBattle(s, 'snowfield', 'sf_enemy_fangs');
    const types = new Set();
    for (let i = 0; i < 60; i++) types.add(BA.pickBattleQuestion(bank, s, bat, FF.util.makeRng(i), T0).answerType);
    assert.ok(types.has('choice') && types.has('input'));
    const missed = Object.assign({}, bat, { missed: true });
    for (let i = 0; i < 60; i++) assert.strictEqual(BA.pickBattleQuestion(bank, s, missed, FF.util.makeRng(i), T0).answerType, 'input');
    assert.strictEqual(BA.pickBattleQuestion(bank, s, Object.assign({}, bat, { result: 'win' }), FF.util.makeRng(1), T0), null);
  });

  test('ボスを倒したあとの地域でも、戦闘の出題はできる（もう一度挑むとき）', () => {
    let s = gate(base(3), 'snowfield');
    s = winAll(s, BA.startBattle(s, 'snowfield', 'sf_boss_wolf')).state;
    const bat = BA.startBattle(s, 'snowfield', 'sf_boss_wolf');
    assert.ok(BA.pickBattleQuestion(bank, s, bat, FF.util.makeRng(2), T0));
  });

  // ---- 記録に触れない ----
  test('戦闘の回答は、チケット・学習の記録に触れず、探索の集計だけを数える', () => {
    const s = gate(base(3), 'snowfield');
    const r = winAll(s, BA.startBattle(s, 'snowfield', 'sf_enemy_fangs'));
    assert.deepStrictEqual(plain(r.state.tickets), plain(s.tickets));
    assert.deepStrictEqual(plain(r.state.learning), plain(s.learning));
    assert.strictEqual(r.state.exploration.stats.answered, s.exploration.stats.answered + 3);
    assert.strictEqual(r.state.exploration.stats.correct, s.exploration.stats.correct + 3);
    assert.deepStrictEqual(plain(r.state.exploration.recentQuestionIds).slice(-1), [choiceQ.id]);
  });

  // ---- 保存と読み込み ----
  test('読み込み時の整合：倒した敵は定義にあるものだけ、ボスの負けの回数は 0〜上限', () => {
    const s = JSON.parse(JSON.stringify(base(5)));
    s.exploration.regions.snowfield.defeated = ['sf_enemy_fangs', 'sf_enemy_fangs', 'fr_enemy_antler', 'nope'];
    s.exploration.regions.snowfield.bossLosses = 99;
    s.exploration.regions.forest.bossLosses = -2;
    delete s.exploration.regions.glacier;
    const r = FF.state.migrate(s, T0);
    assert.strictEqual(r.ok, true);
    const ex = r.state.exploration;
    assert.deepStrictEqual(plain(ex.regions.snowfield.defeated), ['sf_enemy_fangs']);
    assert.strictEqual(ex.regions.snowfield.bossLosses, 5);
    assert.strictEqual(ex.regions.forest.bossLosses, 0);
    assert.deepStrictEqual(plain(ex.regions.glacier), plain(FF.state.defaultRegionState()));
  });

  test('v0.2 のセーブで 100% だった地域は、読み込むとボスの手前（90%）で、次の地域は開いたまま', () => {
    const s = JSON.parse(JSON.stringify(base(4)));
    const sf = s.exploration.regions.snowfield;
    sf.position = 9; sf.completedAt = T0;         // v0.2 の終点（石塔）
    delete sf.defeated; delete sf.bossLosses;     // v0.2 には無い項目
    const r = FF.state.migrate(s, T0);
    const st = r.state;
    assert.strictEqual(X.regionState(st, 'snowfield').position, 9);
    assert.strictEqual(X.progressPercent(st, 'snowfield'), 90);
    assert.strictEqual(X.regionState(st, 'snowfield').completedAt, null);
    assert.strictEqual(X.nextIsBoss(st, 'snowfield'), true);
    assert.strictEqual(X.isRegionUnlocked(st, 'forest'), true);
    assert.deepStrictEqual(plain(X.regionState(st, 'snowfield').defeated), []);
  });

  test('戦闘の結果（倒した敵・負けの回数・完了）は、エクスポート→インポートでそのまま戻る', () => {
    let s = gate(base(3), 'snowfield');
    s = winAll(s, BA.startBattle(s, 'snowfield', 'sf_enemy_fangs')).state;
    s = loseAll(s, BA.startBattle(s, 'snowfield', 'sf_boss_wolf')).state;
    const back = FF.state.parseSave(FF.state.serialize(s), T0);
    assert.strictEqual(back.ok, true);
    assert.deepStrictEqual(plain(back.state.exploration), plain(s.exploration));
  });
  // ---- シミュレーター（v0.3-3） ----
  test("シミュレーターの勝率の式：1回の挑戦で勝つ確率が設計の表（DESIGN 13.4）と一致する", () => {
    const w = (need, lose, p) => Math.round(FF.simulator.battleAttempt(need, lose, p).win * 100);
    assert.strictEqual(w(3, 5, 0.5), 77);
    assert.strictEqual(w(8, 6, 0.7), 83);
    assert.strictEqual(w(10, 6, 0.8), 94);
    assert.strictEqual(w(12, 6, 0.7), 60);
  });

  test("シミュレーターの期待値（挑戦回数・回答数）が、battle.js で実際に戦った平均と合う（ボスの HP の軽減を含む）", () => {
    for (const [regionId, enemyId, p] of [["snowfield", "sf_enemy_machine", 0.6], ["snowfield", "sf_boss_wolf", 0.55]]) {
      const rng = FF.util.makeRng(42);
      let attempts = 0, answers = 0;
      const N = 3000;
      for (let n = 0; n < N; n++) {
        let s = gate(base(3), regionId);
        for (;;) {
          let r = { state: s, battle: BA.startBattle(s, regionId, enemyId) };
          attempts++;
          while (!r.battle.result) { r = hit(r.state, r.battle, choiceQ, rng() < p ? "2" : "1"); answers++; }
          s = r.state;
          if (r.result === "win") break;
        }
      }
      const e = FF.simulator.battleExpect(enemyId, p, B);
      assert.ok(Math.abs(attempts / N - e.attempts) / e.attempts < 0.05, enemyId + " 挑戦 " + (attempts / N) + " / " + e.attempts);
      assert.ok(Math.abs(answers / N - e.answers) / e.answers < 0.05, enemyId + " 回答 " + (answers / N) + " / " + e.answers);
    }
  });
};
