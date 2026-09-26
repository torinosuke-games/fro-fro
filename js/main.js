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
    theme: 'night',          // いま画面に使っているテーマ（'night' | 'day'）
    themeHourOverride: null, // デバッグ画面：テーマ「自動」の確認用の時刻（時）。保存しない   // 探索の出題（画面の一時状態。保存しない）
    leaveGuard: null,
    saveWarned: false,

    now: function () { return FF.clock.now(); },

    // 状態を変える操作はすべてここを通す：更新時刻を付けて保存し、ヘッダーを描き直す
    commit: function (s) {
      app.state = FF.state.withUpdated(s, app.now());
      app.save();
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
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(this);
