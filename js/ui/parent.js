// 保護者の記録（サーバーに送った学習の履歴を、集計して見せる画面。SPEC_sync.md 7章・判断304）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;

  function pct(x) { return Math.round(x * 100) + '%'; }
  function dayLabel(key) { return Number(key.slice(5, 7)) + '/' + Number(key.slice(8, 10)); }

  // 回答した問題の単元などを、問題データから引く
  function lookup(qid) {
    var q = FF.app.bank && FF.app.bank.byId[qid];
    if (!q) return null;
    var u = q.unit && FF.units.get(q.subject, q.gradeLevel, q.unit);
    return { subject: q.subject, grade: q.gradeLevel, unit: q.unit || null, unitName: u ? u.name : null, question: q.question };
  }

  function subjectLabel(subject, grade) {
    var name = FF.learning.subjectName(subject, grade || undefined);
    return name + (grade ? ' 小' + grade : '');
  }

  function tile(label, value) {
    return U.el('div', { class: 'parent-tile' }, [U.R('div', 'small muted', label), U.el('div', { class: 'parent-tile-value', text: value })]);
  }

  // 日ごとの回答数（せいかい・まちがいを積む）。縦軸に数字と横の線（目盛り）、棒の上に回答数。
  // 色は意味どおり（せいかい＝緑、まちがい＝赤）で、凡例と、下の表でも読める
  function dailyChart(daily) {
    var W = 360, H = 150, left = 30, right = 6, base = 118, top = 14, n = daily.length, slot = (W - left - right) / n, bw = Math.min(14, slot - 6);
    var ticks = FF.analytics.niceTicks(Math.max.apply(null, daily.map(function (d) { return d.answered; }).concat([1])), 4);
    var sc = (base - top) / ticks.max;
    var s = U.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'parent-chart', role: 'img', 'aria-label': U.plain(U.T('guardian.dailyTitle')) });
    function text(x, y, str, size, anchor, bold) {
      var t = U.svg('text', { x: x, y: y, 'font-size': size, 'text-anchor': anchor || 'start' });
      t.textContent = str; t.style.fill = 'var(--muted)'; if (bold) t.style.fontWeight = '700';
      return t;
    }
    // 横の線と、縦軸の数字（0 の線だけ、少し濃い）
    ticks.ticks.forEach(function (v) {
      var y = base - v * sc;
      var line = U.svg('line', { x1: left, x2: W - right, y1: y, y2: y, 'stroke-width': v === 0 ? 1.2 : 1, class: 'parent-grid' + (v === 0 ? ' base' : '') });
      s.appendChild(line);
      s.appendChild(text(left - 5, y + 3.5, String(v), 10, 'end'));
    });
    s.appendChild(text(left - 5, top - 5, U.plain(U.T('guardian.unit')), 9, 'end'));
    daily.forEach(function (d, i) {
      var x = left + i * slot + (slot - bw) / 2, hc = d.correct * sc, hw = (d.answered - d.correct) * sc;
      var g = U.svg('g', {});
      var tip = U.svg('title', {}); tip.textContent = dayLabel(d.day) + '：' + d.answered + ' / ' + d.correct; g.appendChild(tip);
      g.appendChild(U.svg('rect', { x: left + i * slot, y: 0, width: slot, height: base, fill: 'transparent' }));   // 押しやすい大きさ
      if (hc > 0) { var r1 = U.svg('rect', { x: x, y: base - hc, width: bw, height: hc, rx: 2 }); r1.style.fill = 'var(--good)'; g.appendChild(r1); }
      if (hw > 0) { var r2 = U.svg('rect', { x: x, y: base - hc - hw - (hc > 0 ? 2 : 0), width: bw, height: hw, rx: 2 }); r2.style.fill = 'var(--bad)'; g.appendChild(r2); }
      if (d.answered > 0) g.appendChild(text(x + bw / 2, base - hc - hw - (hc > 0 && hw > 0 ? 2 : 0) - 3, String(d.answered), 8.5, 'middle', true));
      // 日付は1日おき（今日を含める）
      if ((n - 1 - i) % 2 === 0) g.appendChild(text(x + bw / 2, base + 14, dayLabel(d.day), 9, 'middle'));
      s.appendChild(g);
    });
    return s;
  }

  function rateRow(label, answered, rate) {
    var bar = U.el('div', { class: 'parent-rate-bar' }, [U.el('div', { class: 'parent-rate-fill', style: { width: Math.max(2, Math.round(rate * 100)) + '%' } })]);
    return U.el('div', { class: 'parent-rate-row' }, [
      U.el('div', { class: 'row between small' }, [U.el('span', {}, [U.rich(label)]), U.el('span', { class: 'muted', text: pct(rate) + '（' + answered + '）' })]),
      bar
    ]);
  }

  function renderReport(box, rows) {
    var A = FF.analytics;
    var sum = A.summarize(rows, { now: FF.app.now(), tzOffset: new Date(FF.app.now()).getTimezoneOffset(), days: 14, lookup: lookup });
    var t = sum.total;
    U.clear(box);
    if (!t.answered) { box.appendChild(U.el('div', { class: 'panel' }, [U.R('div', 'small muted', U.T('guardian.empty'))])); return; }

    box.appendChild(U.el('div', { class: 'panel stack' }, [
      U.el('div', { class: 'parent-tiles' }, [
        tile(U.T('guardian.answered'), U.fmt(t.answered)),
        tile(U.T('guardian.rate'), pct(t.rate)),
        tile(U.T('guardian.points'), U.fmt(t.points) + ' pt'),
        tile(U.T('guardian.activeDays'), t.activeDays + ' 日'),
        tile(U.T('guardian.streak'), t.streak + ' 日')
      ]),
      U.R('div', 'small muted', U.T('guardian.period'), { from: new Date(t.firstAt).toLocaleDateString('ja-JP'), to: new Date(t.lastAt).toLocaleDateString('ja-JP') })
    ]));

    // 日ごと
    var table = U.el('table', { class: 'parent-table small' }, [U.el('tr', {}, [U.R('th', '', U.T('guardian.day')), U.R('th', '', U.T('guardian.answeredShort')), U.R('th', '', U.T('guardian.correctShort')), U.R('th', '', U.T('guardian.pointsShort'))])]
      .concat(sum.daily.slice().reverse().map(function (d) {
        return U.el('tr', {}, [U.el('td', { text: dayLabel(d.day) }), U.el('td', { text: String(d.answered) }), U.el('td', { text: d.answered ? pct(d.correct / d.answered) : '—' }), U.el('td', { text: String(d.points) })]);
      })));
    box.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('guardian.dailyTitle')),
      dailyChart(sum.daily),
      U.el('div', { class: 'row small' }, [
        U.el('span', { class: 'parent-legend' }, [U.el('i', { class: 'parent-swatch good' }), U.rich(U.T('guardian.legendCorrect'))]),
        U.el('span', { class: 'parent-legend' }, [U.el('i', { class: 'parent-swatch bad' }), U.rich(U.T('guardian.legendWrong'))])
      ]),
      U.el('details', {}, [U.R('summary', 'small', U.T('guardian.table')), table])
    ]));

    // 教科ごと
    box.appendChild(U.el('div', { class: 'panel stack' }, [U.R('h3', '', U.T('guardian.subjects'))].concat(sum.bySubject.map(function (s) {
      return rateRow(FF.learning.subjectName(s.subject), s.answered, s.rate);
    }))));

    // 復習したい単元（正答率が低い順）
    box.appendChild(U.el('div', { class: 'panel stack' }, [U.R('h3', '', U.T('guardian.weak')), U.R('div', 'small muted', U.T('guardian.weakHelp'))].concat(
      sum.weakUnits.length ? sum.weakUnits.map(function (u) { return rateRow(subjectLabel(u.subject, u.grade) + '：' + (u.name || u.unit), u.answered, u.rate); })
        : [U.R('div', 'small muted', U.T('guardian.noWeak'))])));

    // よく間違える問題
    box.appendChild(U.el('div', { class: 'panel stack' }, [U.R('h3', '', U.T('guardian.missed'))].concat(
      sum.missed.length ? sum.missed.map(function (m) {
        var text = m.question ? FF.util.plainText(m.question).replace(/\s+/g, ' ').slice(0, 70) : U.plain(U.T('guardian.generated'));
        return U.el('div', { class: 'parent-missed small' }, [
          U.el('div', { class: 'muted', text: subjectLabel(m.subject, m.grade) + '　' + m.tries + '回中 ' + m.wrong + '回 ' + U.plain(U.T('guardian.wrongOf')) }),
          U.el('div', { text: text })
        ]);
      }) : [U.R('div', 'small muted', U.T('guardian.noMissed'))])));
  }

  // ---- 見られる子ども（この端末に保存したコード＋この端末の同期のコード）----
  function entries() {
    var rec = FF.syncApp ? FF.syncApp.record() : null, mine = rec && rec.code ? rec.code : null;
    // 1人に1つのプレイヤーコード。この端末の持ち主（自分）が先頭、そのあとに、記録を見るためにコードを入れた人たち
    var list = FF.storage.loadGuardians().filter(function (g) { return g.code !== mine; }).map(function (g) { return { code: g.code, name: g.name, saved: true, mine: false }; });
    if (mine) list.unshift({ code: mine, name: FF.app.state.player.name, saved: false, mine: true });
    return list;
  }

  function saveGuardian(code, name) {
    var list = FF.storage.loadGuardians().filter(function (g) { return g.code !== code; });
    list.push({ code: code, name: name || null, addedAt: FF.app.now() });
    FF.storage.saveGuardians(list);
  }

  // コードを確かめて（保管庫にあるか・子どもの名前）、この端末に保存する。{ ok, name } か { ok: false, error }
  function addGuardian(codeText) {
    var code = FF.sync.codeFromText(codeText);
    if (!code) return Promise.resolve({ ok: false, error: 'bad_code' });
    if (typeof root.fetch !== 'function') return Promise.resolve({ ok: false, error: 'network' });
    return FF.sync.fetchProfile(root.fetch.bind(root), FF.config.SYNC, FF.balance.SYNC, code).then(function (r) {
      if (!r.ok) return r;
      var rec = FF.syncApp ? FF.syncApp.record() : null;
      if (!(rec && rec.code === code)) saveGuardian(code, r.name);   // この端末の同期のコードは、保存しなくても見られる
      return { ok: true, name: r.name, code: code };
    });
  }

  // 「子どもを追加」：コードを入れる（カメラで読み取ってもよい）。入れたコードは、この端末に保存する
  function openAdd() {
    var input = U.el('input', {
      class: 'field sync-link-input',
      attrs: { type: 'text', autocapitalize: 'characters', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', placeholder: 'XXXX-XXXX-XXXX-XXXX', 'aria-label': U.plain(U.T('sync.linkLabel')) }
    });
    var msg = U.el('div', { class: 'small sync-link-msg' });
    var closeModal = null;
    function fail(key) { msg.textContent = ''; msg.appendChild(U.rich(U.T(key))); }
    function go(text) {
      if (!FF.sync.codeFromText(text)) { fail('sync.linkBadCode'); return; }
      msg.textContent = '';
      addGuardian(text).then(function (r) {
        if (!r.ok) { fail(r.error === 'not_found' ? 'sync.linkNotFound' : r.error === 'bad_code' ? 'sync.linkBadCode' : 'sync.noNetwork'); return; }
        if (closeModal) closeModal();
        U.show('parent', { code: r.code });
      });
    }
    closeModal = U.modal({
      title: U.T('guardian.codeTitle'),
      body: U.el('div', { class: 'stack' }, [U.R('div', 'small', U.T('guardian.codeHelp')), U.scanControl(function (code) { go(code); }), input, msg]),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        { label: U.T('guardian.view'), class: 'primary', keepOpen: true, onClick: function () { go(input.value); } }
      ]
    });
    input.focus();
  }

  function render(main) {
    var app = FF.app, list = entries();
    var code = app.params && app.params.code;
    if (!code || !list.some(function (g) { return g.code === code; })) code = list.length ? list[0].code : null;
    if (!code) { U.show('settings'); return; }
    var cur = list.filter(function (g) { return g.code === code; })[0];

    main.appendChild(U.el('div', { class: 'row between redeem-head' }, [
      U.el('button', { class: 'btn ghost small', rich: U.T('redeem.back'), on: { click: function () { U.show('settings'); } } }),
      U.R('h2', '', U.T('guardian.title')),
      U.el('span', { class: 'redeem-head-space' })
    ]));
    // 子どもの切り替え（1人でも、名前を出す）
    var chips = list.map(function (g) {
      return U.el('button', {
        class: 'btn small' + (g.code === code ? ' primary' : '') + (g.mine ? ' mine' : ''), text: (g.name || U.plain(U.T('guardian.noName'))) + (g.mine ? U.plain(U.T('guardian.me')) : ''), attrs: { type: 'button', 'aria-pressed': g.code === code ? 'true' : 'false' },
        on: { click: function () { if (g.code !== code) U.show('parent', { code: g.code }); } }
      });
    });
    chips.push(U.el('button', { class: 'btn small ghost', rich: U.T('guardian.add'), on: { click: openAdd } }));
    main.appendChild(U.el('div', { class: 'row parent-chips' }, chips));

    var box = U.el('div', { class: 'stack' }, [U.el('div', { class: 'panel' }, [U.R('div', 'small muted parent-loading', U.T('guardian.loading'))])]);
    main.appendChild(box);
    if (typeof root.fetch !== 'function') { U.clear(box); box.appendChild(U.el('div', { class: 'panel' }, [U.R('div', '', U.T('sync.noNetwork'))])); return; }
    var f = root.fetch.bind(root);
    // 名前が変わっていたら、保存した名前も直す（記録の読み込みと同時に確かめる）
    FF.sync.fetchProfile(f, FF.config.SYNC, FF.balance.SYNC, code).then(function (p) {
      if (p.ok && p.name && cur.saved && p.name !== cur.name) saveGuardian(code, p.name);
    });
    FF.sync.fetchAttempts(f, FF.config.SYNC, FF.balance.SYNC, code).then(function (r) {
      if (app.screen !== 'parent' || !box.isConnected) return;   // もう別の画面を見ている
      if (!r.ok) {
        U.clear(box);
        box.appendChild(U.el('div', { class: 'panel stack' }, [U.R('div', '', r.error === 'not_found' ? U.T('sync.linkNotFound') : r.error === 'bad_code' ? U.T('sync.linkBadCode') : U.T('sync.noNetwork'))]));
        return;
      }
      renderReport(box, r.rows);
      if (cur.saved) box.appendChild(U.el('div', { class: 'panel stack' }, [
        U.R('div', 'small muted', U.T('guardian.savedNote')),
        U.el('button', { class: 'btn small danger parent-remove', rich: U.T('guardian.remove'), on: { click: function () {
          U.modal({ body: U.T('guardian.removeConfirm'), vars: { name: cur.name || '' }, buttons: [
            { label: U.T('cancel'), class: 'ghost' },
            { label: U.T('guardian.remove'), class: 'danger', onClick: function () {
              FF.storage.saveGuardians(FF.storage.loadGuardians().filter(function (g) { return g.code !== code; }));
              U.show(entries().length ? 'parent' : 'settings', {});
            } }
          ] });
        } } })
      ]));
    });
  }

  // 設定の「保護者の記録を見る」：保存したコード（と、この端末の同期のコード）があればすぐ開く。なければ、コードを入れてもらう
  function open() {
    var list = entries();
    if (list.length) { U.show('parent', { code: (FF.app.params && FF.app.params.code) || list[0].code }); return; }
    openAdd();
  }

  U.screens.parent = { render: render };
  U.openParentReport = open;
  U.addGuardian = addGuardian;
})(this);
