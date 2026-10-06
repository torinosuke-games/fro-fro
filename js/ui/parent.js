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

  // 日ごとの回答数（せいかい・まちがいを積む）。色は意味どおり（せいかい＝緑、まちがい＝赤）で、凡例と、下の表でも読める
  function dailyChart(daily) {
    var W = 336, H = 120, base = 100, top = 8, n = daily.length, slot = W / n, bw = Math.min(16, slot - 6);
    var max = Math.max.apply(null, daily.map(function (d) { return d.answered; }).concat([1]));
    var sc = (base - top) / max;
    var s = U.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'parent-chart', role: 'img', 'aria-label': U.plain(U.T('guardian.dailyTitle')) });
    s.appendChild(U.svg('line', { x1: 0, x2: W, y1: base + 0.5, y2: base + 0.5, stroke: '#8aa0b2', 'stroke-width': 1 }));
    var maxLabel = U.svg('text', { x: 2, y: top + 8, 'font-size': 10 }); maxLabel.textContent = String(max); maxLabel.style.fill = 'var(--muted)'; s.appendChild(maxLabel);
    daily.forEach(function (d, i) {
      var x = i * slot + (slot - bw) / 2, hc = d.correct * sc, hw = (d.answered - d.correct) * sc;
      var g = U.svg('g', {});
      var tip = U.svg('title', {}); tip.textContent = dayLabel(d.day) + '：' + d.answered + ' / ' + d.correct; g.appendChild(tip);
      g.appendChild(U.svg('rect', { x: i * slot, y: 0, width: slot, height: base, fill: 'transparent' }));   // 押しやすい大きさ
      if (hc > 0) { var r1 = U.svg('rect', { x: x, y: base - hc, width: bw, height: hc, rx: 2 }); r1.style.fill = 'var(--good)'; g.appendChild(r1); }
      if (hw > 0) { var r2 = U.svg('rect', { x: x, y: base - hc - hw - (hc > 0 ? 2 : 0), width: bw, height: hw, rx: 2 }); r2.style.fill = 'var(--bad)'; g.appendChild(r2); }
      if (i % 2 === (n - 1) % 2) { var t = U.svg('text', { x: x + bw / 2, y: base + 14, 'font-size': 9, 'text-anchor': 'middle' }); t.textContent = dayLabel(d.day); t.style.fill = 'var(--muted)'; g.appendChild(t); }
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

  function render(main) {
    var app = FF.app, code = app.params && app.params.code;
    main.appendChild(U.el('div', { class: 'row between redeem-head' }, [
      U.el('button', { class: 'btn ghost small', rich: U.T('redeem.back'), on: { click: function () { U.show('settings'); } } }),
      U.R('h2', '', U.T('guardian.title')),
      U.el('span', { class: 'redeem-head-space' })
    ]));
    var box = U.el('div', { class: 'stack' }, [U.el('div', { class: 'panel' }, [U.R('div', 'small muted parent-loading', U.T('guardian.loading'))])]);
    main.appendChild(box);
    if (typeof root.fetch !== 'function') { U.clear(box); box.appendChild(U.el('div', { class: 'panel' }, [U.R('div', '', U.T('sync.noNetwork'))])); return; }
    FF.sync.fetchAttempts(root.fetch.bind(root), FF.config.SYNC, FF.balance.SYNC, code).then(function (r) {
      if (app.screen !== 'parent' || !box.isConnected) return;   // もう別の画面を見ている
      if (!r.ok) {
        U.clear(box);
        box.appendChild(U.el('div', { class: 'panel stack' }, [U.R('div', '', r.error === 'not_found' ? U.T('sync.linkNotFound') : r.error === 'bad_code' ? U.T('sync.linkBadCode') : U.T('sync.noNetwork'))]));
        return;
      }
      renderReport(box, r.rows);
    });
  }

  // 設定の「保護者の記録を見る」：この端末にコードがあればそれを使う。なければ、コードを入れてもらう（保存しない）
  function open() {
    var rec = FF.syncApp ? FF.syncApp.record() : null;
    if (rec && rec.code) { U.show('parent', { code: rec.code }); return; }
    var input = U.el('input', {
      class: 'field sync-link-input',
      attrs: { type: 'text', autocapitalize: 'characters', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', placeholder: 'XXXX-XXXX-XXXX-XXXX', 'aria-label': U.plain(U.T('sync.linkLabel')) }
    });
    var msg = U.el('div', { class: 'small sync-link-msg' });
    U.modal({
      title: U.T('guardian.codeTitle'),
      body: U.el('div', { class: 'stack' }, [U.R('div', 'small', U.T('guardian.codeHelp')), input, msg]),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        {
          label: U.T('guardian.view'), class: 'primary', keepOpen: true, onClick: function (close) {
            var code = FF.sync.normalizeCode(input.value);
            if (!code) { U.clear(msg); msg.appendChild(U.rich(U.T('sync.linkBadCode'))); return; }
            close();
            U.show('parent', { code: code });
          }
        }
      ]
    });
    input.focus();
  }

  U.screens.parent = { render: render };
  U.openParentReport = open;
})(this);
