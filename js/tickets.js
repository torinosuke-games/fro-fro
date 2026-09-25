// 問題チケット（SPEC 7.2）。純粋関数のみ。ticketState = { count, lastRecoveredAt }
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }

  // 経過時間ぶん回復した新しい ticketState を返す
  function recoverTickets(t, now, b) {
    b = bal(b);
    var max = b.TICKET_MAX, step = b.TICKET_RECOVER_MS;
    if (now < t.lastRecoveredAt) {
      // 端末の時計が過去に戻った：枚数は減らさず、基準時刻だけ今にする
      return { count: t.count, lastRecoveredAt: now };
    }
    if (t.count >= max) {
      return { count: t.count, lastRecoveredAt: now };
    }
    var n = Math.floor((now - t.lastRecoveredAt) / step);
    if (n <= 0) return { count: t.count, lastRecoveredAt: t.lastRecoveredAt };
    var count = Math.min(max, t.count + n);
    if (count >= max) return { count: count, lastRecoveredAt: now };
    // 回復途中の端数の時間を失わないように、回復した分だけ進める
    return { count: count, lastRecoveredAt: t.lastRecoveredAt + n * step };
  }

  // 1枚使う。{ ok, tickets }。足りなければ ok: false（tickets は回復処理だけ済んだ状態）
  function consumeTicket(t, now, b) {
    b = bal(b);
    var r = recoverTickets(t, now, b);
    if (r.count < 1) return { ok: false, tickets: r };
    var wasFull = r.count >= b.TICKET_MAX;
    return {
      ok: true,
      tickets: { count: r.count - 1, lastRecoveredAt: wasFull ? now : r.lastRecoveredAt }
    };
  }

  // 次の1枚が回復するまでの残りミリ秒。満タンなら null
  function msUntilNext(t, now, b) {
    b = bal(b);
    var r = recoverTickets(t, now, b);
    if (r.count >= b.TICKET_MAX) return null;
    return b.TICKET_RECOVER_MS - (now - r.lastRecoveredAt);
  }

  // デバッグ用：枚数を設定する（0〜最大に収める）
  function setTicketCount(t, count, now, b) {
    b = bal(b);
    var c = Math.max(0, Math.min(b.TICKET_MAX, Math.floor(count)));
    var r = recoverTickets(t, now, b);
    return { count: c, lastRecoveredAt: c >= b.TICKET_MAX ? now : r.lastRecoveredAt };
  }

  FF.tickets = {
    recoverTickets: recoverTickets,
    consumeTicket: consumeTicket,
    msUntilNext: msUntilNext,
    setTicketCount: setTicketCount
  };
})(this);
