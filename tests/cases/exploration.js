// 探索（SPEC_v0.2 6.3・DESIGN 第12章）
module.exports = ({ test, FF, ctx, assert, plain }) => {
  const X = FF.exploration;
  const B = FF.balance;
  const T0 = 1790000000000;
  const bank = FF.learning.createBank(ctx.QUESTION_BANK);

  // 中央炉 Lv3（雪原が開いている）の状態
  function base(furnace = 3) {
    const s = FF.state.createDefaultState(T0);
    s.buildings.furnace.level = furnace;
    return s;
  }
  // 雪原を pos まで進めた状態（宝箱・イベントの処理も通す）
  function advanceTo(s, regionId, pos, rng = FF.util.makeRng(1)) {
    // v0.3 その2：ボスの手前から先（ボスの地点）へは、ボスに勝って進む
    while (X.regionState(s, regionId).position < pos) {
      if (X.nextIsBoss(s, regionId)) { s = FF.battle.winBattle(s, regionId, X.bossNode(regionId).enemy, T0).state; continue; }
      const before = X.regionState(s, regionId).position;
      s = X.advance(s, regionId, T0, rng).state;
      if (X.regionState(s, regionId).position === before) throw new Error("advanceTo: 進めない（" + regionId + " " + before + "）");
    }
    return s;
  }

  const choiceQ = {
    id: 'test_choice_001', subject: 'math', gradeLevel: 1, unit: 't', difficulty: 'basic', answerType: 'choice',
    question: '1+1', choices: ['1', '2', '3', '4'], answer: '2', hints: ['h'], explanation: 'e', reviewed: true
  };
  const inputQ = {
    id: 'test_input_001', subject: 'math', gradeLevel: 1, unit: 't', difficulty: 'basic', answerType: 'input',
    question: '1+1', answer: '2', acceptedAnswers: [], validationMode: 'number', hints: ['h'], explanation: 'e', reviewed: true
  };
  const att = q => FF.learning.startAttempt(q, FF.util.makeRng(3));
  const ans = (s, q, input, regionId = 'snowfield') => X.answerExplore(s, regionId, att(q), input, T0, FF.util.makeRng(5));
  const pos = (s, r = 'snowfield') => X.regionState(s, r).position;

  // ---- 定義 ----
  test('地域の定義：順路がつながり、地点数・宝箱・イベント・敵・ボスが設計どおり（DESIGN 13.2・13.3）', () => {
    const expect = {
      snowfield: { route: 11, chests: 3, events: 3, enemies: 2 },
      forest: { route: 13, chests: 4, events: 4, enemies: 2 },
      glacier: { route: 13, chests: 4, events: 4, enemies: 3 }
    };
    assert.strictEqual(FF.defs.REGIONS.map(r => r.id).join(','), 'snowfield,forest,glacier');
    for (const r of FF.defs.REGIONS) {
      const route = X.route(r.id);
      const e = expect[r.id];
      assert.strictEqual(route.length, e.route, r.id + ' の順路');
      assert.strictEqual(route[0].kind, 'start');
      assert.strictEqual(route[route.length - 1].next, null, '終点は1つ');
      assert.strictEqual(route.filter(n => n.kind === 'chest').length, e.chests);
      assert.ok(e.chests >= 3 && e.chests <= 4, '宝箱は3〜4個（SPEC_v0.2 4.1）');
      assert.strictEqual(route.filter(n => n.kind === 'event').length, e.events);
      const enemies = r.nodes.filter(n => n.kind === 'enemy');
      assert.strictEqual(enemies.length, e.enemies);
      // 順路 + 敵 = すべての地点（どこにもつながらない地点がない）
      assert.strictEqual(route.length + enemies.length, r.nodes.length);
      // ボスは順路の最後に1体だけ
      assert.strictEqual(route.filter(n => n.kind === 'boss').length, 1, r.id + ' のボス');
      assert.strictEqual(route[route.length - 1].kind, 'boss', r.id + ' の終点はボス');
      for (const n of route.filter(x => x.kind === 'boss').concat(enemies)) {
        const def = FF.defs.ENEMIES[n.enemy];
        assert.ok(def, n.id + ' の敵の定義');
        assert.strictEqual(def.region, r.id);
        assert.strictEqual(def.boss, n.kind === 'boss');
        assert.ok(B.BATTLE.ENEMIES[n.enemy] && B.BATTLE.REWARDS[n.enemy], n.enemy + ' の数値');
      }
      for (const n of enemies) {
        assert.ok(route.some(x => x.id === n.adjacent), n.id + ' の隣の地点が順路にある');
        assert.strictEqual(n.reachable, true);
      }
      assert.ok(r.grades[0] <= r.grades[1]);
    }
  });

  // 地図で押せる範囲（js/ui/exploration.js の HIT_R = 7.6。幅 320px の画面で直径 44px 以上）が重ならず、地図からはみ出さない
  test('地図の地点どうしは、押せる範囲が重ならない距離にあり、地図の中に収まる', () => {
    const HIT_R = 7.6;
    for (const r of FF.defs.REGIONS) {
      for (const n of r.nodes) {
        assert.ok(n.x - HIT_R >= 0 && n.x + HIT_R <= 100 && n.y - HIT_R >= 0 && n.y + HIT_R <= 104, n.id + ' が地図の端に近すぎる');
      }
      for (let i = 0; i < r.nodes.length; i++) for (let j = i + 1; j < r.nodes.length; j++) {
        const a = r.nodes[i], b = r.nodes[j];
        assert.ok(Math.hypot(a.x - b.x, a.y - b.y) >= 2 * HIT_R, a.id + ' と ' + b.id + ' が近すぎる');
      }
    }
  });

  test('地点・宝箱・イベントの ID が重複せず、参照先がそろっている', () => {
    const nodeIds = FF.defs.REGIONS.flatMap(r => r.nodes.map(n => n.id));
    assert.strictEqual(new Set(nodeIds).size, nodeIds.length);
    const chestIds = FF.defs.REGIONS.flatMap(r => r.nodes.filter(n => n.kind === 'chest').map(n => n.chest));
    assert.strictEqual(new Set(chestIds).size, chestIds.length);
    assert.deepStrictEqual(plain(chestIds.slice().sort()), Object.keys(B.EXPLORE.CHESTS).sort());
    const resIds = FF.defs.RESOURCES.map(r => r.id);
    for (const id of chestIds) for (const k in B.EXPLORE.CHESTS[id]) assert.ok(k === 'tickets' || resIds.includes(k), id + ': ' + k);
    for (const r of FF.defs.REGIONS) {
      assert.ok(r.events.length >= r.nodes.filter(n => n.kind === 'event').length, r.id + ' のイベントは地点の数以上');
      for (const id of r.events) {
        const ev = FF.defs.EXPLORE_EVENTS[id];
        assert.ok(ev && ev.region === r.id, id);
        assert.ok(['resource', 'trivia', 'choice'].includes(ev.type), id);
        if (ev.type === 'resource') assert.ok(B.EXPLORE.EVENT_REWARDS[id], id + ' の量');
        if (ev.type === 'choice') assert.strictEqual(ev.options.length, 2, id);
      }
    }
    for (const id in B.EXPLORE.EVENT_REWARDS) assert.strictEqual(FF.defs.EXPLORE_EVENTS[id].type, 'resource');
  });

  test('資源イベントの量は、どの宝箱よりも少ない', () => {
    const sum = o => Object.keys(o).filter(k => k !== 'tickets').reduce((a, k) => a + o[k], 0);
    const minChest = Math.min(...Object.values(B.EXPLORE.CHESTS).map(sum));
    for (const id in B.EXPLORE.EVENT_REWARDS) assert.ok(sum(B.EXPLORE.EVENT_REWARDS[id]) * 2 <= minChest, id);
  });

  test('1地域の宝箱のチケットは合計で12枚（1時間に回復する枚数）以下', () => {
    const perHour = 3600000 / B.TICKET_RECOVER_MS;
    for (const r of FF.defs.REGIONS) {
      const total = r.nodes.filter(n => n.kind === 'chest').reduce((a, n) => a + (B.EXPLORE.CHESTS[n.chest].tickets || 0), 0);
      assert.ok(total <= perHour, `${r.id}: ${total}`);
    }
  });

  test('探索の文章（地域・地点・敵・イベント）に読みのない漢字がない', () => {
    const strings = [];
    for (const r of FF.defs.REGIONS) {
      strings.push(r.name, r.intro, r.completeText);
      for (const n of r.nodes) strings.push(n.name, n.text);
    }
    for (const id in FF.defs.EXPLORE_EVENTS) {
      const ev = FF.defs.EXPLORE_EVENTS[id];
      strings.push(ev.text);
      for (const o of ev.options || []) strings.push(o.label, o.result);
    }
    const missing = new Map();
    for (const s of strings) for (const k of FF.util.bareKanji(s, { name: 'X' })) if (!missing.has(k)) missing.set(k, s);
    assert.strictEqual(missing.size, 0, [...missing].map(([k, s]) => `「${k}」 ← ${s}`).join('\n'));
  });

  // ---- 解放 ----
  test('雪原は中央炉 Lv3 で開く。それまでは探索タブも閉じている', () => {
    assert.strictEqual(X.isRegionUnlocked(base(2), 'snowfield'), false);
    assert.strictEqual(X.isExploreOpen(base(2)), false);
    assert.strictEqual(X.isRegionUnlocked(base(3), 'snowfield'), true);
    assert.strictEqual(X.isExploreOpen(base(3)), true);
  });

  test('凍結森林は、雪原 100% かつ中央炉 Lv4 で開く', () => {
    const done3 = advanceTo(base(3), 'snowfield', X.lastIndex('snowfield'));
    assert.strictEqual(X.isRegionUnlocked(done3, 'forest'), false, 'Lv3 では開かない');
    assert.strictEqual(X.isRegionUnlocked(base(4), 'forest'), false, '雪原が 100% でなければ開かない');
    const done4 = advanceTo(base(4), 'snowfield', X.lastIndex('snowfield'));
    assert.strictEqual(X.isRegionUnlocked(done4, 'forest'), true);
  });

  test('解放のお知らせ：開いた地域のうち、まだ見ていないものだけ', () => {
    assert.deepStrictEqual(plain(X.pendingExploreNotices(base(2))), []);
    let s = base(3);
    assert.deepStrictEqual(plain(X.pendingExploreNotices(s)), ['snowfield']);
    s = FF.buildings.markUnlockNoticeSeen(s, 'explore_snowfield');
    assert.deepStrictEqual(plain(X.pendingExploreNotices(s)), []);
  });

  // ---- 進行（6.3） ----
  test('4択：正解したときだけ1地点進み、まちがいでは進まない', () => {
    const s = base();
    const wrong = ans(s, choiceQ, '3');
    assert.strictEqual(wrong.outcome.status, 'wrong');
    assert.strictEqual(pos(wrong.state), 0);
    assert.strictEqual(wrong.arrival, null);
    const right = ans(s, choiceQ, '2');
    assert.strictEqual(right.outcome.status, 'correct');
    assert.strictEqual(pos(right.state), 1);
    assert.strictEqual(right.arrival.node.id, 'sf_02');
  });

  test('自由入力：3回まちがえると進まずに終わる。3回以内に正解すれば進む', () => {
    let s = base();
    let a = att(inputQ);
    for (let i = 1; i <= 2; i++) {
      const r = X.answerExplore(s, 'snowfield', a, '5', T0);
      assert.strictEqual(r.outcome.status, 'retry');
      assert.strictEqual(r.outcome.attemptsLeft, 3 - i);
      assert.strictEqual(pos(r.state), 0);
      s = r.state; a = r.attempt;
    }
    const last = X.answerExplore(s, 'snowfield', a, '5', T0);
    assert.strictEqual(last.outcome.status, 'wrong');
    assert.strictEqual(pos(last.state), 0);
    assert.strictEqual(X.answerExplore(last.state, 'snowfield', last.attempt, '2', T0).outcome.status, 'error', '終わった問題には答えられない');

    const r2 = X.answerExplore(base(), 'snowfield', att(inputQ), '0', T0);
    const ok = X.answerExplore(r2.state, 'snowfield', r2.attempt, '２', T0);
    assert.strictEqual(ok.outcome.status, 'correct');
    assert.strictEqual(ok.outcome.attempts, 2);
    assert.strictEqual(pos(ok.state), 1);
  });

  test('空欄の回答は回数に数えず、状態も変わらない', () => {
    const s = base();
    const r = X.answerExplore(s, 'snowfield', att(inputQ), '  ', T0);
    assert.strictEqual(r.outcome.status, 'error');
    assert.strictEqual(r.state, s);
    assert.strictEqual(r.attempt.wrong, 0);
  });

  test('未解放の地域では回答しても進まない', () => {
    const s = base(2);
    const r = ans(s, choiceQ, '2');
    assert.strictEqual(r.outcome.status, 'error');
    assert.strictEqual(pos(r.state), 0);
    assert.strictEqual(X.pickExploreQuestion(bank, s, 'snowfield', FF.util.makeRng(1), T0), null);
  });

  test('100% の地域では出題されず、正解を渡しても終点を超えない', () => {
    for (const regionId of ['snowfield', 'forest']) {
      let s = advanceTo(base(4), 'snowfield', X.lastIndex('snowfield'));
      s = advanceTo(s, regionId, X.lastIndex(regionId));
      const last = X.lastIndex(regionId);
      assert.strictEqual(X.progressPercent(s, regionId), 100);
      assert.strictEqual(X.isComplete(s, regionId), true);
      assert.strictEqual(X.pickExploreQuestion(bank, s, regionId, FF.util.makeRng(1), T0), null);
      const r = ans(s, choiceQ, '2', regionId);
      assert.strictEqual(r.outcome.status, 'error');
      assert.strictEqual(pos(r.state, regionId), last);
      const a = X.advance(s, regionId, T0, FF.util.makeRng(1));
      assert.strictEqual(a.arrival, null);
      assert.strictEqual(pos(a.state, regionId), last);
      assert.strictEqual(a.state, s, '状態も変わらない');
    }
  });

  test('ボスの手前では問題に正解しても進まず、出題もされない（ボスは戦闘に勝つと進む）', () => {
    let s = advanceTo(base(), 'snowfield', X.gateIndex('snowfield'));
    assert.strictEqual(X.gateIndex('snowfield'), X.lastIndex('snowfield') - 1);
    assert.strictEqual(X.nextIsBoss(s, 'snowfield'), true);
    assert.strictEqual(X.regionState(s, 'snowfield').completedAt, null);
    assert.strictEqual(X.isComplete(s, 'snowfield'), false);
    assert.strictEqual(X.pickExploreQuestion(bank, s, 'snowfield', FF.util.makeRng(1), T0), null);
    const r = ans(s, choiceQ, '2');
    assert.strictEqual(r.outcome.status, 'error');
    assert.strictEqual(r.outcome.error, 'boss');
    assert.strictEqual(X.advance(s, 'snowfield', T0).state, s, 'advance でも進まない');
  });

  test('進捗％：入口 0%、途中は切り捨て、ボスの手前は 90%、ボスを倒すと 100%（寄り道の敵は数えない）', () => {
    let s = base();
    assert.strictEqual(X.progressPercent(s, 'snowfield'), 0);
    s = advanceTo(s, 'snowfield', 1);
    assert.strictEqual(X.progressPercent(s, 'snowfield'), 10);   // 1/10
    s = advanceTo(s, 'snowfield', 9);
    assert.strictEqual(X.progressPercent(s, 'snowfield'), 90);
    s = advanceTo(s, 'snowfield', 10);
    assert.strictEqual(X.progressPercent(s, 'snowfield'), 100);
  });

  test('1地点に必要な正解数を増やすと、その数だけ正解したときに進む', () => {
    const b = JSON.parse(JSON.stringify(B));
    b.EXPLORE.CORRECT_PER_NODE = 2;
    const r1 = X.answerExplore(base(), 'snowfield', att(choiceQ), '2', T0, FF.util.makeRng(1), b);
    assert.strictEqual(pos(r1.state), 0);
    assert.strictEqual(X.regionState(r1.state, 'snowfield').progress, 1);
    const r2 = X.answerExplore(r1.state, 'snowfield', att(choiceQ), '2', T0, FF.util.makeRng(1), b);
    assert.strictEqual(pos(r2.state), 1);
    assert.strictEqual(X.regionState(r2.state, 'snowfield').progress, 0);
  });

  // ---- 宝箱（6.3） ----
  test('宝箱の地点に着くと自動で開き、中身の資源とチケットが増える', () => {
    let s = advanceTo(base(), 'snowfield', 5);   // 次は [7] 旧観測所跡（チケット1・鉄80）
    s.tickets = { count: 10, lastRecoveredAt: T0 };
    const r = ans(s, choiceQ, '2');
    assert.strictEqual(r.arrival.node.id, 'sf_07');
    assert.deepStrictEqual(plain(r.arrival.chest), { id: 'sf_chest_2', reward: { tickets: 1, iron: 80 } });
    assert.strictEqual(r.state.resources.iron, s.resources.iron + 80);
    assert.strictEqual(r.state.tickets.count, 11);
    assert.deepStrictEqual(plain(X.regionState(r.state, 'snowfield').openedChests), ['sf_chest_1', 'sf_chest_2']);
  });

  test('宝箱は1回だけ開く：2回目は報酬が発生しない', () => {
    let s = base();
    const first = X.openChest(s, 'snowfield', 'sf_chest_1', T0);
    assert.deepStrictEqual(plain(first.reward), { wood: 120, stone: 80 });
    assert.strictEqual(first.state.resources.wood, 120);
    const second = X.openChest(first.state, 'snowfield', 'sf_chest_1', T0);
    assert.strictEqual(second.reward, null);
    assert.strictEqual(second.state, first.state);
    assert.strictEqual(second.state.resources.wood, 120);
  });

  test('宝箱：同じ地点にもう一度着いても（位置を戻しても）報酬は増えない', () => {
    let s = advanceTo(base(), 'snowfield', 3);     // [4] 雪にうもれた小屋（sf_chest_1）を開けた
    const wood = s.resources.wood;
    assert.strictEqual(wood, 120);
    s = JSON.parse(JSON.stringify(s));
    s.exploration.regions.snowfield.position = 2;   // 何らかの理由で位置が戻った
    const r = X.advance(s, 'snowfield', T0, FF.util.makeRng(1));
    assert.strictEqual(r.arrival.node.id, 'sf_04');
    assert.strictEqual(r.arrival.chest.reward, null);
    assert.strictEqual(r.state.resources.wood, wood);
  });

  test('宝箱のチケットは上限20を超えて受け取れ、その間は回復しない', () => {
    let s = base();
    s.tickets = { count: 20, lastRecoveredAt: T0 };
    const r = X.openChest(s, 'snowfield', 'sf_chest_3', T0);
    assert.strictEqual(r.state.tickets.count, 22);
    const later = FF.tickets.recoverTickets(r.state.tickets, T0 + 3600000);
    assert.strictEqual(later.count, 22);
    // 使って20を切ると回復が再開する
    let t = r.state.tickets;
    for (let i = 0; i < 3; i++) t = FF.tickets.consumeTicket(t, T0 + 3600000).tickets;
    assert.strictEqual(t.count, 19);
    assert.strictEqual(FF.tickets.recoverTickets(t, T0 + 3600000 + B.TICKET_RECOVER_MS).count, 20);
  });

  test('宝箱のチケットは、たまっていた回復分を先に計算してから足す', () => {
    let s = base();
    s.tickets = { count: 18, lastRecoveredAt: T0 };   // 1時間後なら 20 まで回復しているはず
    const r = X.openChest(s, 'snowfield', 'sf_chest_3', T0 + 3600000);
    assert.strictEqual(r.state.tickets.count, 22);
  });

  // ---- イベント ----
  test('イベント：同じ地域では重複せず、抽選済みの地点は同じイベントのまま', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const rng = FF.util.makeRng(seed);
      let s = advanceTo(base(4), 'snowfield', X.lastIndex('snowfield'), rng);
      s = advanceTo(s, 'forest', X.lastIndex('forest'), rng);
      for (const regionId of ['snowfield', 'forest']) {
        const ev = X.regionState(s, regionId).events;
        const eventNodes = X.route(regionId).filter(n => n.kind === 'event').map(n => n.id);
        assert.deepStrictEqual(plain(Object.keys(ev).sort()), plain(eventNodes.sort()));
        const ids = Object.values(ev).map(e => e.id);
        assert.strictEqual(new Set(ids).size, ids.length, `seed ${seed}: 重複 ${ids}`);
        for (const nodeId of eventNodes) {
          const again = X.drawEvent(s, regionId, nodeId, FF.util.makeRng(999));
          assert.strictEqual(again.eventId, ev[nodeId].id);
          assert.strictEqual(again.reward, null);
          assert.strictEqual(again.state, s);
        }
      }
    }
  });

  test('イベント：出尽くしたときは直前のもの以外から選ぶ', () => {
    let s = JSON.parse(JSON.stringify(base()));
    const r = FF.defs.REGIONS[0];
    // イベント地点以外の地点に全イベントが記録済み、という状態を作る代わりに、使用済みを直接入れる
    const nodes = X.route('snowfield').filter(n => n.kind === 'event');
    r.events.forEach((id, i) => { s.exploration.regions.snowfield.events['dummy' + i] = { id, choice: null }; });
    s.exploration.lastEventId = 'sf_ev_crate';
    for (let seed = 1; seed <= 20; seed++) {
      const d = X.drawEvent(s, 'snowfield', nodes[0].id, FF.util.makeRng(seed));
      assert.notStrictEqual(d.eventId, 'sf_ev_crate');
    }
  });

  test('資源イベントは少量の資源、豆知識・分岐は資源が変わらない', () => {
    const s = base();
    const node = X.route('snowfield').find(n => n.kind === 'event').id;
    let seen = {};
    for (let seed = 1; seed <= 60; seed++) {
      const d = X.drawEvent(s, 'snowfield', node, FF.util.makeRng(seed));
      const ev = FF.defs.EXPLORE_EVENTS[d.eventId];
      seen[ev.type] = true;
      const gained = FF.defs.RESOURCES.reduce((a, r) => a + d.state.resources[r.id] - s.resources[r.id], 0);
      if (ev.type === 'resource') {
        assert.deepStrictEqual(plain(d.reward), plain(B.EXPLORE.EVENT_REWARDS[d.eventId]));
        assert.ok(gained > 0 && gained <= 40);
      } else {
        assert.strictEqual(d.reward, null);
        assert.strictEqual(gained, 0);
      }
      assert.strictEqual(d.state.tickets, s.tickets);
    }
    assert.ok(seen.resource && seen.trivia && seen.choice);
  });

  test('分岐はどちらを選んでも資源・進行が同じで、最初の選択だけを記録する', () => {
    const s0 = base();
    const node = X.route('snowfield').find(n => n.kind === 'event').id;
    let seed = 1, d;
    do { d = X.drawEvent(s0, 'snowfield', node, FF.util.makeRng(seed++)); } while (FF.defs.EXPLORE_EVENTS[d.eventId].type !== 'choice');
    const a = X.chooseEventOption(d.state, 'snowfield', node, 0);
    const b = X.chooseEventOption(d.state, 'snowfield', node, 1);
    assert.strictEqual(X.regionState(a, 'snowfield').events[node].choice, 0);
    assert.strictEqual(X.regionState(b, 'snowfield').events[node].choice, 1);
    assert.deepStrictEqual(plain(a.resources), plain(b.resources));
    assert.strictEqual(pos(a), pos(b));
    assert.strictEqual(X.regionState(X.chooseEventOption(a, 'snowfield', node, 1), 'snowfield').events[node].choice, 0);
    assert.strictEqual(X.chooseEventOption(d.state, 'snowfield', node, 5), d.state, '範囲外の選択は無視');
  });

  // ---- 敵地点（6.3） ----
  test('寄り道の敵：隣の地点に着くまで locked、着いたら available。順路に入らず、進行で到達しない', () => {
    let s = base(5);
    const enemies = FF.defs.REGIONS.flatMap(r => r.nodes.filter(n => n.kind === 'enemy').map(n => [r.id, n]));
    assert.ok(enemies.length >= 7);
    const reached = new Set();
    for (const regionId of ['snowfield', 'forest', 'glacier']) {
      const ids = X.route(regionId).map(n => n.id);
      while (!X.nextIsBoss(s, regionId)) {
        const r = X.advance(s, regionId, T0, FF.util.makeRng(2));
        reached.add(r.arrival.node.kind);
        s = r.state;
        for (const [rid, n] of enemies.filter(e => e[0] === regionId)) {
          const want = X.regionState(s, rid).position >= ids.indexOf(n.adjacent) ? 'available' : 'locked';
          assert.strictEqual(X.nodeStatus(s, rid, n.id), want, n.id);
          assert.strictEqual(X.enemyStatus(s, rid, n.enemy), want, n.id);
          assert.strictEqual(X.canEnterNode(n), true);
          assert.ok(!X.route(rid).includes(n));
        }
      }
    }
    assert.ok(!reached.has('enemy') && !reached.has('boss'));
  });

  test('reachable が false の敵地点は入れない（フラグで切り替わる）', () => {
    const n = Object.assign({}, FF.defs.REGIONS[0].nodes.find(x => x.kind === 'enemy'), { reachable: false });
    assert.strictEqual(X.canEnterNode(n), false);
  });

  test('地点の表示状態：到達済み・現在地・次・先', () => {
    const s = advanceTo(base(), 'snowfield', 2);
    assert.strictEqual(X.nodeStatus(s, 'snowfield', 'sf_01'), 'reached');
    assert.strictEqual(X.nodeStatus(s, 'snowfield', 'sf_02'), 'reached');
    assert.strictEqual(X.nodeStatus(s, 'snowfield', 'sf_03'), 'current');
    assert.strictEqual(X.nodeStatus(s, 'snowfield', 'sf_04'), 'next');
    assert.strictEqual(X.nodeStatus(s, 'snowfield', 'sf_05'), 'ahead');
    assert.strictEqual(X.nodeStatus(s, 'snowfield', 'nope'), 'unknown');
  });

  // ---- 学習・チケットへの影響がない（6.3） ----
  test('探索の回答は、チケット・学習の成績・直近10問・反復記録・履歴・連続正解・獲得累計を変えない', () => {
    let s = base();
    s.learning.stats = { math: { 1: { attempts: 5, correct: 2, choice: { attempts: 5, correct: 2 }, input: { attempts: 0, correct: 0 }, hintsUsed: 0, recent: [1, 0, 0, 1, 0] } } };
    s.learning.correctLog = { test_choice_001: [T0 - 1000] };
    s.learning.streak = { current: 2, best: 4 };
    const before = { tickets: plain(s.tickets), learning: plain(s.learning) };
    const rng = FF.util.makeRng(7);
    for (let i = 0; i < 30; i++) {
      const q = FF.learning.startAttempt(i % 2 ? choiceQ : inputQ, rng);
      const input = i % 3 === 0 ? '9' : '2';
      let r = X.answerExplore(s, 'snowfield', q, input, T0 + i * 1000, rng);
      while (r.outcome.status === 'retry') r = X.answerExplore(r.state, 'snowfield', r.attempt, input, T0 + i * 1000, rng);
      s = r.state;
      if (X.isComplete(s, 'snowfield')) break;
    }
    assert.ok(pos(s) > 0);
    assert.deepStrictEqual(plain(s.learning), before.learning);
    // 雪原の宝箱で増えた分を除けば、チケットは変わっていない（4択でも消費しない）
    const chestTickets = X.regionState(s, 'snowfield').openedChests.reduce((a, id) => a + (B.EXPLORE.CHESTS[id].tickets || 0), 0);
    assert.strictEqual(s.tickets.count, before.tickets.count + chestTickets);
  });

  test('探索専用の集計（回答数・正解数）と直近に出した問題だけを記録する', () => {
    let s = base();
    s = ans(s, choiceQ, '1').state;
    s = ans(s, choiceQ, '2').state;
    assert.deepStrictEqual(plain(s.exploration.stats), { answered: 2, correct: 1 });
    assert.deepStrictEqual(plain(s.exploration.recentQuestionIds), ['test_choice_001', 'test_choice_001']);
  });

  test('探索の回答は元の状態を書き換えない', () => {
    const s = base();
    const snapshot = JSON.stringify(s);
    ans(s, choiceQ, '2');
    ans(s, choiceQ, '1');
    X.openChest(s, 'snowfield', 'sf_chest_3', T0);
    assert.strictEqual(JSON.stringify(s), snapshot);
  });

  // ---- 出題（DESIGN 12.6） ----
  test('まちがえた地点では自由入力だけが出て、次の地点に進むと元に戻る', () => {
    let s = ans(base(), choiceQ, '1').state;
    assert.strictEqual(X.regionState(s, 'snowfield').missedHere, true);
    for (let seed = 1; seed <= 200; seed++) {
      const q = X.pickExploreQuestion(bank, s, 'snowfield', FF.util.makeRng(seed), T0);
      assert.strictEqual(q.answerType, 'input', `seed ${seed}: ${q.id}`);
    }
    s = ans(s, choiceQ, '2').state;
    assert.strictEqual(X.regionState(s, 'snowfield').missedHere, false);
    const types = new Set();
    for (let seed = 1; seed <= 100; seed++) types.add(X.pickExploreQuestion(bank, s, 'snowfield', FF.util.makeRng(seed), T0).answerType);
    assert.ok(types.has('choice') && types.has('input'));
  });

  test('自由入力で1回まちがえた時点で、その地点は自由入力だけになる（読み込み直しても）', () => {
    const r = X.answerExplore(base(), 'snowfield', att(inputQ), '9', T0);
    assert.strictEqual(r.outcome.status, 'retry');
    assert.strictEqual(X.regionState(r.state, 'snowfield').missedHere, true);
  });

  test('出題は解放済みの学年だけ。地域の難易度の傾向どおり。必ず1問出る', () => {
    for (const regionId of ['snowfield', 'forest']) {
      let s = advanceTo(base(4), 'snowfield', regionId === 'forest' ? X.lastIndex('snowfield') : 0);
      s.learning.unlocked = { math: 2, japanese: 5, science: 9, social: 1, english: 3 };
      const allowed = Object.keys(B.EXPLORE.DIFFICULTY_WEIGHT[regionId]);
      const counts = {};
      for (let seed = 1; seed <= 400; seed++) {
        const q = X.pickExploreQuestion(bank, s, regionId, FF.util.makeRng(seed), T0);
        assert.ok(q, `seed ${seed}`);
        assert.ok(q.gradeLevel <= s.learning.unlocked[q.subject], `${q.id} は未解放の学年`);
        assert.ok(allowed.includes(q.difficulty), `${regionId}: ${q.id} ${q.difficulty}`);
        counts[q.subject] = (counts[q.subject] || 0) + 1;
      }
      assert.strictEqual(Object.keys(counts).length, 5, '5教科すべてから出る');
    }
  });

  test('学年は推奨範囲の中が出やすい（重み3対1）', () => {
    const s = base(4);
    for (const subj of FF.defs.SUBJECTS) s.learning.unlocked[subj.id] = 9;
    let inRange = 0, n = 0;
    const rng = FF.util.makeRng(11);
    for (let i = 0; i < 3000; i++) {
      const sel = X.chooseSelection(s, 'snowfield', rng);
      n++;
      if (sel.grade <= 4) inRange++;
    }
    // 期待値：(4×3)/(4×3+5×1) ≒ 0.71
    assert.ok(Math.abs(inRange / n - 12 / 17) < 0.03, String(inRange / n));
  });

  test('推奨範囲の学年が未解放なら、解放済みの学年から出す（凍結森林でも Lv1〜2 で遊べる）', () => {
    const s = base(4);
    const rng = FF.util.makeRng(12);
    for (let i = 0; i < 300; i++) assert.ok(X.chooseSelection(s, 'forest', rng).grade <= 2);
  });

  test('探索で直近に出した問題は避ける', () => {
    const s = JSON.parse(JSON.stringify(base()));
    s.learning.unlocked = { math: 1, japanese: 1, science: 1, social: 1, english: 1 };
    const pool = bank.byKey['japanese|1|standard|input'] || [];
    assert.ok(pool.length >= 2);
    s.exploration.recentQuestionIds = pool.slice(0, pool.length - 1).map(q => q.id);
    const b = JSON.parse(JSON.stringify(B));
    b.EXPLORE.DIFFICULTY_WEIGHT.snowfield = { standard: 1 };
    b.EXPLORE.CHOICE_SHARE = 0;
    const fresh = pool[pool.length - 1].id;
    for (let seed = 1; seed <= 200; seed++) {
      const q = X.pickExploreQuestion(bank, s, 'snowfield', FF.util.makeRng(seed), T0, b);
      if (q.subject === 'japanese') assert.strictEqual(q.id, fresh);
    }
  });

  test('問題がない組み合わせでも、広げて必ず出題する', () => {
    const empty = FF.learning.createBank([]);
    const s = base();
    for (let seed = 1; seed <= 50; seed++) {
      const q = X.pickExploreQuestion(empty, s, 'snowfield', FF.util.makeRng(seed), T0);
      assert.ok(q && q.subject === 'math');
    }
  });

  // ---- 保存と移行（6.3） ----
  test('新規の状態には、全地域の探索が入口の状態で入っている', () => {
    const s = base();
    for (const r of FF.defs.REGIONS) {
      assert.deepStrictEqual(plain(s.exploration.regions[r.id]), { position: 0, progress: 0, missedHere: false, openedChests: [], events: {}, completedAt: null, defeated: [], bossLosses: 0 });
    }
    assert.deepStrictEqual(plain(s.exploration.stats), { answered: 0, correct: 0 });
  });

  test('探索の途中の状態は、エクスポート→インポートでそのまま戻る', () => {
    let s = advanceTo(base(4), 'snowfield', 7, FF.util.makeRng(4));
    s = ans(s, choiceQ, '1').state;
    const r = FF.state.parseSave(FF.state.serialize(s), T0 + 10);
    assert.strictEqual(r.ok, true);
    assert.deepStrictEqual(plain(r.state.exploration), plain(s.exploration));
  });

  test('読み込み時の整合：位置を順路に収め、定義にない宝箱・イベント・選択を捨てる', () => {
    const s = JSON.parse(JSON.stringify(base()));
    const sf = s.exploration.regions.snowfield;
    sf.position = 99;
    sf.progress = 5;
    sf.openedChests = ['sf_chest_1', 'sf_chest_1', 'fr_chest_1', 'nope'];
    sf.events = { sf_03: { id: 'sf_ev_hollow', choice: 7 }, sf_02: { id: 'sf_ev_crate', choice: null }, sf_06: { id: 'fr_ev_nuts', choice: null } };
    s.exploration.regions.forest = { position: -3, progress: 'x', openedChests: 'x', events: null, completedAt: 5 };
    s.exploration.recentQuestionIds = [1, 'a'];
    s.exploration.stats = { answered: -1, correct: 'x' };
    const r = FF.state.migrate(s, T0);
    assert.strictEqual(r.ok, true);
    const ex = r.state.exploration;
    assert.strictEqual(ex.regions.snowfield.position, X.lastIndex('snowfield'));
    assert.strictEqual(ex.regions.snowfield.progress, 0);
    assert.deepStrictEqual(plain(ex.regions.snowfield.openedChests), ['sf_chest_1']);
    assert.deepStrictEqual(plain(ex.regions.snowfield.events), { sf_03: { id: 'sf_ev_hollow', choice: null } });
    assert.strictEqual(ex.regions.forest.position, 0);
    assert.deepStrictEqual(plain(ex.regions.forest.openedChests), []);
    assert.deepStrictEqual(plain(ex.regions.forest.events), {});
    assert.strictEqual(ex.regions.forest.completedAt, null);
    assert.deepStrictEqual(plain(ex.recentQuestionIds), ['a']);
    assert.deepStrictEqual(plain(ex.stats), { answered: 0, correct: 0 });
  });

  test('読み込み時の整合は、正しい状態を変えない', () => {
    let s = advanceTo(base(4), 'snowfield', X.lastIndex('snowfield'), FF.util.makeRng(8));
    s = advanceTo(s, 'forest', 5, FF.util.makeRng(8));
    assert.deepStrictEqual(plain(X.normalizeExploration(s).exploration), plain(s.exploration));
  });

  // ---- バランスシミュレーター（v0.2-3） ----
  test('シミュレーター：1地点の期待時間の式が、実際の出題・回答の処理を何度も試した平均と合う', () => {
    const sec = 20, retry = B.SIM_DEFAULTS.retrySecRatio;
    for (const p of [0.5, 0.9]) {
      const rng = FF.util.makeRng(Math.round(p * 100));
      let total = 0;
      const N = 4000;
      let s = base();
      for (let n = 0; n < N; n++) {
        // 毎回、雪原の入口にいる状態から1地点進むまで
        s.exploration.regions.snowfield = FF.state.defaultRegionState();
        let st = s;
        while (pos(st) === 0) {
          const type = X.chooseSelection(st, 'snowfield', rng).answerType;
          let a = FF.learning.startAttempt(type === 'choice' ? choiceQ : inputQ, rng);
          let first = true;
          for (;;) {
            total += first ? sec : sec * retry;
            first = false;
            const r = X.answerExplore(st, 'snowfield', a, rng() < p ? '2' : '3', T0, rng);
            st = r.state; a = r.attempt;
            if (r.outcome.status !== 'retry') break;
          }
        }
      }
      const expected = FF.simulator.exploreSecPerNode(sec, p, B, retry);
      assert.ok(Math.abs(total / N - expected) / expected < 0.03, `p=${p}: 試行 ${(total / N).toFixed(2)} / 式 ${expected.toFixed(2)}`);
    }
  });

  test('シミュレーター：探索ありでも中央炉 Lv2・Lv3 の到達時間は変わらず、報酬の合計は宝箱＋イベントの期待値', () => {
    for (const key of Object.keys(B.SIM_PROFILES)) {
      const a = FF.simulator.run(B.SIM_PROFILES[key]);
      const e = FF.simulator.run(B.SIM_PROFILES[key], { explore: true, battles: false });   // v0.2 の探索だけ（戦闘は tests/cases/battle.js と simulate.js）
      assert.strictEqual(e.milestones.furnace2, a.milestones.furnace2);
      assert.strictEqual(e.milestones.furnace3, a.milestones.furnace3);
      assert.ok(e.milestones.all5 <= a.milestones.all5 * 1.01);
      assert.strictEqual(a.explore, null);
      // 雪原・凍結森林はボスの手前まで進む（ボスの戦闘のモデルは v0.3-3 で足す）。氷河は中央炉 Lv5 で開き、全施設 Lv5 までに進めた分だけ
      const two = X.gateIndex('snowfield') + X.gateIndex('forest');
      assert.ok(e.explore.nodes >= two && e.explore.nodes <= two + X.gateIndex('glacier'), String(e.explore.nodes));
      assert.ok(e.explore.tickets >= 7 && e.explore.tickets <= 11, String(e.explore.tickets));
      // 雪原・凍結森林の宝箱 1780 ＋ イベント（雪原 (30+20)×3/6、森林 (40+40)×4/6）以上
      assert.ok(e.explore.resources >= Math.floor(1780 + 25 + 160 / 3), String(e.explore.resources));
    }
  });

  test('シミュレーター：探索の学年の期待値と1問の秒数（SPEC 8.3 の想定時間を補間）', () => {
    assert.strictEqual(FF.simulator.secForGrade(1, B), 10);
    assert.strictEqual(FF.simulator.secForGrade(5, B), 30);
    assert.strictEqual(FF.simulator.secForGrade(9, B), 60);
    assert.strictEqual(FF.simulator.secForGrade(3, B), 20);
    const sf = FF.defs.REGIONS[0];
    assert.strictEqual(FF.simulator.exploreGrade(sf, 2, B), 1.5);
    assert.ok(Math.abs(FF.simulator.exploreGrade(sf, 9, B) - 65 / 17) < 1e-9);
  });
};
