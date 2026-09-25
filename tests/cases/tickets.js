// チケット（SPEC 7.2・第19章）
module.exports = ({ test, FF, assert, plain }) => {
  const T = FF.tickets;
  const clock = FF.clock;
  const MIN = 60 * 1000;
  const T0 = 1790000000000;

  test('初期状態で20枚ある', () => {
    const s = FF.state.createDefaultState(T0);
    assert.strictEqual(s.tickets.count, 20);
  });

  test('回答すると1枚減る（正解でも不正解でも同じ関数で消費する）', () => {
    clock.set(T0);
    const r = T.consumeTicket({ count: 12, lastRecoveredAt: T0 }, clock.now());
    assert.strictEqual(r.ok, true);
    assert.strictEqual(r.tickets.count, 11);
  });

  test('回復処理だけでは減らない（表示・戻るでは消費関数を呼ばない）', () => {
    clock.set(T0 + 1000);
    const r = T.recoverTickets({ count: 12, lastRecoveredAt: T0 }, clock.now());
    assert.strictEqual(r.count, 12);
  });

  test('5分経つと1枚回復する', () => {
    clock.set(T0);
    const t = { count: 10, lastRecoveredAt: clock.now() };
    clock.advance(5 * MIN - 1);
    assert.strictEqual(T.recoverTickets(t, clock.now()).count, 10);
    clock.advance(1);
    assert.strictEqual(T.recoverTickets(t, clock.now()).count, 11);
  });

  test('17分で3枚回復し、次の回復まで約3分（端数を保持）', () => {
    clock.set(T0);
    const t = { count: 10, lastRecoveredAt: clock.now() };
    clock.advance(17 * MIN);
    const r = T.recoverTickets(t, clock.now());
    assert.strictEqual(r.count, 13);
    assert.strictEqual(r.lastRecoveredAt, T0 + 15 * MIN);
    assert.strictEqual(T.msUntilNext(r, clock.now()), 3 * MIN);
    assert.strictEqual(FF.util.formatCountdown(T.msUntilNext(r, clock.now())), '03:00');
  });

  test('回復処理を何度に分けても結果が同じ', () => {
    clock.set(T0);
    let t = { count: 0, lastRecoveredAt: T0 };
    for (let i = 0; i < 17; i++) {
      clock.advance(MIN);
      t = T.recoverTickets(t, clock.now());
    }
    assert.strictEqual(t.count, 3);
    assert.strictEqual(T.msUntilNext(t, clock.now()), 3 * MIN);
  });

  test('ブラウザを閉じている間も回復する（保存→読み込み→回復）', () => {
    clock.set(T0);
    let s = FF.state.createDefaultState(clock.now());
    s.tickets = { count: 4, lastRecoveredAt: clock.now() };
    const text = FF.state.serialize(s);
    clock.advance(26 * MIN);   // 閉じている間
    const loaded = FF.state.parseSave(text, clock.now()).state;
    const r = T.recoverTickets(loaded.tickets, clock.now());
    assert.strictEqual(r.count, 9);
    assert.strictEqual(T.msUntilNext(r, clock.now()), 4 * MIN);
  });

  test('20枚を超えない', () => {
    clock.set(T0);
    const t = { count: 19, lastRecoveredAt: T0 };
    clock.advance(10 * 60 * MIN);
    const r = T.recoverTickets(t, clock.now());
    assert.strictEqual(r.count, 20);
    assert.strictEqual(r.lastRecoveredAt, clock.now());
    assert.strictEqual(T.msUntilNext(r, clock.now()), null);
  });

  test('満タンのまま時間が経っても、使った直後から5分数え直す', () => {
    clock.set(T0);
    let t = { count: 20, lastRecoveredAt: T0 };
    clock.advance(3 * 60 * MIN);
    const c = T.consumeTicket(t, clock.now());
    assert.strictEqual(c.tickets.count, 19);
    assert.strictEqual(c.tickets.lastRecoveredAt, clock.now());
    clock.advance(4 * MIN);
    assert.strictEqual(T.recoverTickets(c.tickets, clock.now()).count, 19);
    clock.advance(MIN);
    assert.strictEqual(T.recoverTickets(c.tickets, clock.now()).count, 20);
  });

  test('満タンでないときの消費は回復の端数を保つ', () => {
    clock.set(T0);
    const t = { count: 10, lastRecoveredAt: T0 };
    clock.advance(7 * MIN);
    const c = T.consumeTicket(t, clock.now());
    assert.strictEqual(c.tickets.count, 10);   // 1枚回復して1枚使う
    assert.strictEqual(c.tickets.lastRecoveredAt, T0 + 5 * MIN);
    clock.advance(3 * MIN);
    assert.strictEqual(T.recoverTickets(c.tickets, clock.now()).count, 11);
  });

  test('0枚のときは消費できない', () => {
    clock.set(T0);
    const r = T.consumeTicket({ count: 0, lastRecoveredAt: T0 }, clock.now());
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.tickets.count, 0);
  });

  test('端末の時計を過去に戻しても減らない', () => {
    clock.set(T0);
    const t = { count: 5, lastRecoveredAt: T0 };
    clock.set(T0 - 3 * 60 * MIN);
    const r = T.recoverTickets(t, clock.now());
    assert.strictEqual(r.count, 5);
    assert.strictEqual(r.lastRecoveredAt, clock.now());
    clock.advance(5 * MIN);
    assert.strictEqual(T.recoverTickets(r, clock.now()).count, 6);
  });

  test('時計が戻っていても残り時間は5分以内', () => {
    clock.set(T0);
    const t = { count: 5, lastRecoveredAt: T0 };
    clock.set(T0 - 60 * MIN);
    assert.strictEqual(T.msUntilNext(t, clock.now()), 5 * MIN);
  });

  test('デバッグ用の枚数設定は0〜20に収まる', () => {
    clock.set(T0);
    const t = { count: 5, lastRecoveredAt: T0 };
    assert.strictEqual(T.setTicketCount(t, 99, clock.now()).count, 20);
    assert.strictEqual(T.setTicketCount(t, -3, clock.now()).count, 0);
    assert.deepStrictEqual(plain(T.setTicketCount(t, 7, clock.now())), { count: 7, lastRecoveredAt: T0 });
  });

  test('残り時間の表示形式', () => {
    assert.strictEqual(FF.util.formatCountdown(201000), '03:21');
    assert.strictEqual(FF.util.formatCountdown(200001), '03:21');
    assert.strictEqual(FF.util.formatCountdown(0), '00:00');
  });
};
