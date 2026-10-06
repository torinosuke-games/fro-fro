// 起動処理：読み込み → データ移行 → チケット回復 → 描画 → 自動保存
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;

  var app = FF.app = {
    state: null,
    bank: null,
    screen: 'title',
    params: {},
    session: null,     // 学習中の出題（画面の一時状態。保存しない）
    studySel: null,    // 学習の選択（資源・教科・学年・難易度・形式）
    studyTab: 'learn',
    examRun: null,
    exploreSession: null,
    theme: 'day',            // いま画面に使っているテーマ（いつも 'day'。判断176）
    leaveGuard: null,
    saveWarned: false,

    now: function () { return FF.clock.now(); },

    // 状態を変える操作はすべてここを通す：更新時刻を付けて保存し、ヘッダーを描き直す
    commit: function (s) {
      app.state = FF.state.withUpdated(s, app.now());
      app.save();
      if (FF.syncApp) FF.syncApp.collect(app.state);   // 新しい回答の履歴を、サーバーへ送る箱に入れる（同期がオンのときだけ）
      U.renderHud();
    },

    save: function () {
      if (!app.state) return;
      if (!FF.storage.save(app.state) && !app.saveWarned) {
        app.saveWarned = true;
        U.toast(U.T('saveError'));
      }
    },

    // デバッグで時刻を動かしたとき
    onTimeJump: function () {
      recoverTickets();
      completeBuilds();
      U.rerender();
    },

    resetAll: function () {
      FF.storage.clear();
      FF.storage.clearSync();   // 全データのリセットでは、同期もオフにする（空のデータで保管庫を上書きしないため。保管庫のデータは残る）
      app.session = null;
      app.studySel = null;
      app.examRun = null;
      app.exploreSession = null;
      app.leaveGuard = null;
      app.state = FF.exam.applyFuriganaAuto(FF.state.createDefaultState(app.now()));
      app.save();
      U.show('title');
    }
  };

  // 回復した枚数が変わったときだけ保存する
  function recoverTickets() {
    var t = FF.tickets.recoverTickets(app.state.tickets, app.now());
    if (t.count !== app.state.tickets.count || app.now() < app.state.tickets.lastRecoveredAt) {
      app.commit(Object.assign({}, app.state, { tickets: t }));
    }
  }

  // 終わった工事を完成させる（SPEC_v0.3 3章）。完成した建物があれば知らせる。
  // 描き直すのは基地の画面を開いているときだけ（出題中に描き直すと、入力中の答えが消えるため）。
  // 中央炉の解放のお知らせは、基地の画面を描いたときに出る。
  function completeBuilds() {
    var r = FF.buildings.completeConstructions(app.state, app.now());
    if (r.state === app.state) return false;
    app.commit(r.state);
    r.completed.forEach(function (c) {
      U.toast(U.T('upgradeDone'), { building: U.buildingName(c.id), level: c.level });
    });
    if (r.completed.length && app.screen === 'base') U.rerender();
    return true;
  }

  // ---- データの保存（サーバー同期。判断299）：オンにしたときだけ、裏で動く。通信できなくても遊びは止まらない ----
  function setupSync() {
    if (typeof root.fetch !== 'function' || !FF.config.SYNC) return;
    app.syncBusyUi = function () { return !!(app.session || app.examRun || app.exploreSession || app.screen === 'quiz' || app.screen === 'battle'); };
    FF.syncApp = FF.sync.createEngine({
      fetch: root.fetch.bind(root), cfg: FF.config.SYNC, balance: FF.balance.SYNC,
      now: function () { return app.now(); },
      randomBytes: function (n) {
        var a = new Uint8Array(n);
        root.crypto.getRandomValues(a);
        return Array.prototype.slice.call(a);
      },
      loadRec: function () { return FF.storage.loadSync(); },
      saveRec: function (r) { FF.storage.saveSync(r); },
      saveBackup: function (t) { FF.storage.saveSyncBackup(t); },
      loadOutbox: function () { return FF.storage.loadOutbox(); },
      saveOutbox: function (o) { FF.storage.saveOutbox(o); },
      getState: function () { return app.state; },
      applyRemote: function (st) {
        st.tickets = FF.tickets.recoverTickets(st.tickets, app.now());
        app.state = st;
        FF.storage.save(app.state);   // commit は使わない（更新時刻をいまにしない）
        app.session = null; app.studySel = null; app.examRun = null; app.exploreSession = null; app.leaveGuard = null;
        U.renderHud();
        U.show(app.state.flags.introSeen ? 'base' : 'title');
        U.toast(U.T('imported'));
      },
      decideConflict: function (info) { return U.askSyncConflict(info); },
      canInterrupt: function () { return !app.syncBusyUi(); }
    });
    // timer のときは、前回の同期から変わっていなければ通信しない（変更があったときだけ送る。SPEC_sync.md 5章）
    function auto(force, timer) {
      var rec = FF.syncApp.record();
      if (timer && rec.rev !== null && app.state.updatedAt === rec.pushedAt && !FF.syncApp.pending().count) return;
      FF.syncApp.sync({ force: !!force }).then(function () { if (app.screen === 'settings' && !document.querySelector('.overlay')) U.rerender(); });
    }
    setTimeout(function () { auto(true); }, 2000);
    setInterval(function () { auto(false, true); }, FF.balance.SYNC.INTERVAL_MS);
    // 隠れるとき：送る。戻ってきたとき：ほかの端末の変更を受け取る
    document.addEventListener('visibilitychange', function () { auto(false); });
  }

  function boot() {
    document.title = FF.config.TITLE;
    var now = app.now();
    var loaded = FF.storage.load(now);
    var s = loaded.state;
    s.tickets = FF.tickets.recoverTickets(s.tickets, now);
    app.state = FF.exam.applyFuriganaAuto(s);
    app.save();

    app.bank = FF.learning.createBank(root.QUESTION_BANK || []);
    if (app.bank.invalid.length || app.bank.duplicates.length) {
      console.warn('問題データの不備（出題から除外）:', app.bank.invalid, app.bank.duplicates);
    }

    if (FF.debugMode) {
      document.body.appendChild(U.el('div', { class: 'debug-flag', text: 'DEBUG', on: { click: function () { U.show('debug'); } } }));
    }

    U.show(app.state.flags.introSeen ? 'base' : 'title');
    if (loaded.status === 'error') U.modal({ body: U.T('loadError') });
    else if (loaded.status === 'migrated') U.toast(U.T('migrated'));

    // アプリを閉じていた間に終わった工事
    completeBuilds();

    setInterval(function () {
      recoverTickets();
      completeBuilds();
      U.tick();
    }, 1000);

    // ページを閉じるとき・隠れるときにも保存する
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') app.save();
      else { recoverTickets(); completeBuilds(); U.rerender(); }
    });
    root.addEventListener('pagehide', app.save);
    setupSync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(this);
