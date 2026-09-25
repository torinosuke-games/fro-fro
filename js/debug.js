// デバッグ画面（URL に ?debug=1 を付けたときだけ有効。SPEC 9.5）
// 時刻の操作は clock.advance() を使う（SPEC 21.2）。
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var MIN = 60 * 1000;

  FF.debugMode = /(?:^|[?&])debug=1(?:&|$)/.test((root.location && root.location.search || '').replace(/^\?/, ''));

  function field(label, input) {
    return U.el('label', {}, [label, input]);
  }
  function numInput(value, attrs) {
    return U.el('input', { class: 'field', attrs: Object.assign({ type: 'number' }, attrs || {}), value: String(value) });
  }
  function select(options, value) {
    var s = U.el('select', { class: 'field' }, options.map(function (o) {
      return U.el('option', { attrs: { value: o[0], selected: String(o[0]) === String(value) }, text: o[1] });
    }));
    return s;
  }
  function fmtMin(m) { return m == null ? '—' : m >= 120 ? (m / 60).toFixed(1) + ' 時間' : m.toFixed(1) + ' 分'; }

  function render(main) {
    var app = FF.app;
    if (!FF.debugMode) { U.show('settings'); return; }
    main.classList.add('debug');

    // ---- 時刻 ----
    var clockInfo = U.el('div', { class: 'small muted' });
    function refreshClock() {
      clockInfo.textContent = '現在時刻（ゲーム内）: ' + new Date(FF.clock.now()).toLocaleString('ja-JP');
    }
    refreshClock();
    function advance(ms) {
      FF.clock.advance(ms);
      app.onTimeJump();
      refreshClock();
      U.toast('時間を ' + Math.round(ms / MIN) + ' 分進めた');
    }
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: '時間を進める（clock.advance）' }),
      clockInfo,
      U.el('div', { class: 'grid3' }, [
        ['+5分', 5 * MIN], ['+17分', 17 * MIN], ['+1時間', 60 * MIN], ['+4時間', 240 * MIN], ['+1日', 1440 * MIN]
      ].map(function (b) {
        return U.el('button', { class: 'btn small', text: b[0], on: { click: function () { advance(b[1]); } } });
      }).concat([U.el('button', { class: 'btn small ghost', text: '実時刻に戻す', on: { click: function () { FF.clock.reset(); app.onTimeJump(); refreshClock(); } } })]))
    ]));

    // ---- 資源 ----
    var amount = numInput(1000, { min: 1 });
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: '資源を追加する' }),
      field('量', amount),
      U.el('div', { class: 'grid2' }, FF.defs.RESOURCES.map(function (r) {
        return U.el('button', { class: 'btn small', text: r.icon + ' ' + r.name, on: { click: function () { addRes([r.id]); } } });
      }).concat([U.el('button', { class: 'btn small ice', text: 'すべて', on: { click: function () { addRes(FF.defs.RESOURCES.map(function (r) { return r.id; })); } } })]))
    ]));
    function addRes(ids) {
      var n = Math.max(0, Math.floor(Number(amount.value) || 0));
      var s = FF.util.clone(app.state);
      ids.forEach(function (id) { s.resources[id] = (s.resources[id] || 0) + n; });
      app.commit(s);
      U.toast('資源を追加した');
    }

    // ---- チケット ----
    var tcount = numInput(FF.tickets.recoverTickets(app.state.tickets, app.now()).count, { min: 0, max: FF.balance.TICKET_MAX });
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: 'チケット数を設定する' }),
      U.el('div', { class: 'row' }, [tcount, U.el('button', {
        class: 'btn small', text: '設定', on: {
          click: function () {
            var s = Object.assign({}, app.state, { tickets: FF.tickets.setTicketCount(app.state.tickets, Number(tcount.value) || 0, app.now()) });
            app.commit(s);
            U.toast('チケットを ' + s.tickets.count + ' 枚にした');
          }
        }
      })])
    ]));

    // ---- 学年 ----
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: '学年の解放（テスト用）' }),
      U.el('div', { class: 'grid2' }, [
        U.el('button', { class: 'btn small', text: '全教科 Lv9 まで解放', on: { click: function () { setUnlocked(FF.balance.MAX_GRADE); } } }),
        U.el('button', { class: 'btn small', text: '全教科 Lv2 に戻す', on: { click: function () { setUnlocked(FF.balance.INITIAL_UNLOCKED_GRADE); } } }),
        U.el('button', { class: 'btn small', text: '試験の待ち時間を解除', on: { click: clearCooldown } }),
        U.el('button', { class: 'btn small', text: '実力診断をやり直せるようにする', on: { click: resetDiagnosis } })
      ])
    ]));
    function setUnlocked(g) {
      var s = FF.util.clone(app.state);
      FF.defs.SUBJECTS.forEach(function (x) { s.learning.unlocked[x.id] = g; });
      app.studySel = null;
      app.commit(FF.exam.applyFuriganaAuto(s));
      U.toast('全教科を Lv' + g + ' にした');
    }
    function clearCooldown() {
      var s = FF.util.clone(app.state);
      FF.defs.SUBJECTS.forEach(function (x) { s.learning.examCooldownUntil[x.id] = 0; });
      app.commit(s);
      U.toast('待ち時間を解除した');
    }
    function resetDiagnosis() {
      var s = FF.util.clone(app.state);
      FF.defs.SUBJECTS.forEach(function (x) { s.learning.diagnosis[x.id] = null; });
      app.commit(s);
      U.toast('実力診断を未受験に戻した');
    }

    // ---- 昼／夜テーマの確認（SPEC_theme.md） ----
    // 「自動」の判定に使う時刻（時）だけを指定する。保存はしない。FF.clock とは別（テーマは端末の時計で決まるため）
    var themeInfo = U.el('div', { class: 'small muted' });
    function refreshTheme() {
      var o = app.themeHourOverride;
      themeInfo.textContent = '設定：' + FF.theme.normalizeMode(app.state.settings.themeMode) + '　確認用の時刻：' + (o == null ? '端末の時計' : o + '時') +
        '　→ 基地の画面は ' + FF.theme.resolve(app.state.settings.themeMode, (function () { var d = new Date(); if (o != null) d.setHours(o, 0, 0, 0); return d; })());
    }
    refreshTheme();
    function setMode(m) {
      var s = FF.util.clone(app.state);
      s.settings.themeMode = m;
      app.commit(s);
      refreshTheme();
    }
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: '昼／夜テーマの確認' }),
      themeInfo,
      U.el('div', { class: 'grid3' }, [['夜', 'night'], ['昼', 'day'], ['自動', 'auto']].map(function (b) {
        return U.el('button', { class: 'btn small', text: '設定を「' + b[0] + '」に', on: { click: function () { setMode(b[1]); } } });
      })),
      U.el('div', { class: 'small muted', text: '「自動」のときの時刻（基地の画面で確かめる）' }),
      U.el('div', { class: 'grid3' }, [5, 6, 12, 17, 18, 21].map(function (h) {
        return U.el('button', { class: 'btn small', text: h + '時', on: { click: function () { app.themeHourOverride = h; refreshTheme(); U.toast('確認用の時刻を ' + h + '時 にした'); } } });
      }).concat([U.el('button', { class: 'btn small ghost', text: '端末の時計に戻す', on: { click: function () { app.themeHourOverride = null; refreshTheme(); } } })]))
    ]));

    // ---- 探索（v0.2） ----
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: '探索（テスト用）' }),
      U.el('div', { class: 'small muted', text: '雪原は中央炉 Lv3、凍結森林は雪原 100% かつ中央炉 Lv4 で開く。進めると宝箱・できごとの報酬も入る。' }),
      U.el('div', { class: 'grid2' }, [
        U.el('button', { class: 'btn small', text: '中央炉を Lv3 にする', on: { click: function () { setFurnace(3); } } }),
        U.el('button', { class: 'btn small', text: '中央炉を Lv4 にする', on: { click: function () { setFurnace(4); } } }),
        U.el('button', { class: 'btn small', text: '雪原を1地点進める', on: { click: function () { exAdvance('snowfield', 1); } } }),
        U.el('button', { class: 'btn small', text: '雪原を終点の1つ手前まで', on: { click: function () { exAdvance('snowfield', 'last'); } } }),
        U.el('button', { class: 'btn small', text: '凍結森林を1地点進める', on: { click: function () { exAdvance('forest', 1); } } }),
        U.el('button', { class: 'btn small', text: '凍結森林を終点の1つ手前まで', on: { click: function () { exAdvance('forest', 'last'); } } }),
        U.el('button', { class: 'btn small ghost', text: '探索を最初からにする', on: { click: exReset } }),
        U.el('button', { class: 'btn small', text: '探索で、選択肢に漢字がある4択を出す', on: { click: exKanjiChoice } })
      ])
    ]));
    // ふりがなの確認用：選択肢に {漢字|よみ} がある4択（解放済みの学年）を、探索の次の問題として出す
    function exKanjiChoice() {
      var s = app.state, X = FF.exploration;
      var region = FF.defs.REGIONS.filter(function (r) { return X.isRegionUnlocked(s, r.id) && !X.isComplete(s, r.id); })[0];
      if (!region) { U.toast('探索できる地域がない（中央炉 Lv3 以上で、100% でない地域が必要）'); return; }
      var qs = Object.keys(app.bank.byId).map(function (id) { return app.bank.byId[id]; }).filter(function (q) {
        return q.answerType === 'choice' && q.gradeLevel <= FF.learning.unlockedGrade(s, q.subject) &&
          q.choices.some(function (c) { return /\{[^{}|]+\|[^{}]+\}/.test(c); });
      });
      if (!qs.length) { U.toast('該当する問題がない'); return; }
      var q = qs[Math.floor(Math.random() * qs.length)];
      app.exploreSession = { region: region.id, attempt: FF.learning.startAttempt(q, Math.random) };
      U.show('exploreQuiz', { region: region.id });
    }
    // 中央炉とほかの建物をそのレベルまで上げる（資源は使わない）
    function setFurnace(level) {
      var s = FF.util.clone(app.state);
      FF.defs.BUILDINGS.forEach(function (d) { if (s.buildings[d.id].level < level) s.buildings[d.id].level = level; });
      s = FF.buildings.normalizeBuildings(s, app.now());
      app.commit(s);
      U.toast('中央炉などを Lv' + level + ' にした');
    }
    function exAdvance(regionId, n) {
      var s = app.state, X = FF.exploration;
      if (!X.isRegionUnlocked(s, regionId)) { U.toast('その地域はまだ開いていない'); return; }
      var goal = n === 'last' ? X.lastIndex(regionId) - 1 : X.regionState(s, regionId).position + n;
      while (X.regionState(s, regionId).position < goal && !X.isComplete(s, regionId)) s = X.advance(s, regionId, app.now(), Math.random).state;
      app.exploreSession = null;
      app.commit(s);
      U.toast(regionId + '：' + X.progressPercent(s, regionId) + '%');
    }
    function exReset() {
      var s = FF.util.clone(app.state);
      s.exploration = FF.state.defaultExploration();
      s.flags.unlockNoticesSeen = s.flags.unlockNoticesSeen.filter(function (id) { return id.indexOf('explore_') !== 0; });
      app.exploreSession = null;
      app.commit(s);
      U.toast('探索を最初からにした（宝箱で得た資源・チケットはそのまま）');
    }

    // ---- リセット ----
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: '全データをリセットする' }),
      U.el('button', {
        class: 'btn danger small', text: '今すぐリセット（確認なし）',
        on: { click: function () { app.resetAll(); } }
      })
    ]));

    // ---- シミュレーター ----
    var p = FF.balance.SIM_PROFILES.lv1;
    var grade = select(FF.defs.GRADES.map(function (g) { return [g.level, g.label]; }), p.grade);
    var diff = select(FF.defs.DIFFICULTIES.map(function (d) { return [d.id, d.name]; }), p.difficulty);
    var fmt = select(FF.defs.ANSWER_TYPES.map(function (d) { return [d.id, d.name + (d.id === 'choice' ? '（チケットが切れたら自由入力）' : '')]; }), p.format);
    var sec = numInput(p.secPerQuestion, { min: 1 });
    var acc = numInput(Math.round(p.accuracy * 100), { min: 1, max: 100 });
    var mpd = numInput(FF.balance.SIM_DEFAULTS.minutesPerDay, { min: 1 });
    var result = U.el('div', {});
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('h3', { text: 'バランスシミュレーター' }),
      U.el('div', { class: 'grid2' }, [
        field('学年', grade), field('難易度', diff), field('形式', fmt), field('1問あたりの秒数', sec),
        field('正答率（%）', acc), field('1日のプレイ時間（分）', mpd)
      ]),
      U.el('button', { class: 'btn primary', text: '計算する', on: { click: simulate } }),
      result
    ]));
    function simulate() {
      var prof = {
        grade: Number(grade.value), difficulty: diff.value, format: fmt.value,
        secPerQuestion: Math.max(1, Number(sec.value) || 1), accuracy: Math.min(1, Math.max(0.01, (Number(acc.value) || 1) / 100))
      };
      var r = FF.simulator.run(prof, { minutesPerDay: Math.max(1, Number(mpd.value) || 30) });
      var T = FF.balance.TARGETS;
      var key = prof.grade <= 2 ? 'lv1' : prof.grade <= 6 ? 'lv5' : 'lv9';
      U.clear(result);
      result.appendChild(U.el('table', { class: 'data' }, [
        U.el('thead', {}, U.el('tr', {}, [U.el('th', { text: '到達点' }), U.el('th', { text: '計算結果' }), U.el('th', { text: '目標（' + key + '）' })])),
        U.el('tbody', {}, [['furnace2', '中央炉 Lv2'], ['furnace3', '中央炉 Lv3'], ['all5', '中央炉 Lv5（全施設 Lv5）']].map(function (m) {
          return U.el('tr', {}, [U.el('td', { text: m[1] }), U.el('td', { text: fmtMin(r.milestones[m[0]]) }), U.el('td', { text: fmtMin(T[m[0]][key]) })]);
        }))
      ]));
      result.appendChild(U.el('div', { class: 'small muted', text: '日数 ' + r.days + ' 日 ／ 問題数 ' + r.questions + ' ／ 生産の割合 ' + (r.productionShare * 100).toFixed(1) + '%' }));
    }
    simulate();
  }

  U.screens.debug = { render: render };
})(this);
