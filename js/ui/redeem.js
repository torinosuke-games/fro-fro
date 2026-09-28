// 引換所（v0.4、SPEC 14.5・DESIGN 14.4）：pt の残高と換算、引換券にする時間（プリセット）、確認と方式、これまでの引換券。
// 券の画面（params.ticket）：発行した券を出して印刷する。保護者に見せて［この券を使う］を押すと使用済みになる（判断173）。
// 履歴から何度でも出し直し・印刷し直しができる（pt は減らない）。使用済みの券は、券面にも「使用済み」と出る。
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var P = FF.points;

  // テンプレートの {time} を、ふりがなの記法入りの時間に置き換える（変数で入れた文字にはふりがなが付かないため）
  function withTime(template, minutes) { return template.replace('{time}', P.formatMinutesMarkup(minutes)); }

  function when(t) {
    var d = new Date(t);
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function goBack() {
    var r = FF.app.redeemReturn;
    FF.app.redeemReturn = null;
    if (r && r.screen && r.screen !== 'redeem') U.show(r.screen, r.params);
    else U.show('study', { tab: 'records' });
  }

  function header(title, onBack) {
    return U.el('div', { class: 'row between redeem-head' }, [
      U.el('button', { class: 'btn ghost small', rich: U.T('redeem.back'), on: { click: onBack } }),
      U.R('h2', '', title),
      U.el('span', { class: 'redeem-head-space' })
    ]);
  }

  // ---- 引換所 ----
  function renderMain(main) {
    var s = FF.app.state;
    var rate = P.rateOf(s);
    var bal = s.studyPoints || 0;
    main.appendChild(header(U.T('redeem.title'), goBack));

    main.appendChild(U.el('div', { class: 'panel pt-panel center' }, [
      U.el('div', { class: 'small muted' }, ['⭐ ', U.rich(U.T('ptLabel'))]),
      U.el('div', { class: 'pt-huge', text: U.fmt(bal) + ' pt' }),
      U.el('div', { class: 'small' }, U.rich(withTime(U.T('redeem.worth'), P.minutesFor(bal, rate)), { rate: U.fmt(rate) }))
    ]));

    main.appendChild(U.R('div', 'section-title', U.T('redeem.choose')));
    main.appendChild(U.el('div', { class: 'preset-grid' }, FF.balance.STUDY_POINTS.PRESET_MINUTES.map(function (m) {
      var cost = P.costFor(m, rate);
      var short = bal < cost;
      return U.el('button', {
        class: 'pick preset' + (short ? ' short' : ''), disabled: short,
        attrs: { 'aria-label': U.plain(P.formatMinutesMarkup(m)) + ' ' + U.fmt(cost) + 'pt' },
        on: { click: function () { confirmIssue(m, cost); } }
      }, [
        U.el('span', { class: 'title' }, U.rich(P.formatMinutesMarkup(m))),
        U.el('span', { class: 'sub', text: U.fmt(cost) + 'pt' }),
        short ? U.el('span', { class: 'tag' }, U.rich(U.T('redeem.short'), { n: U.fmt(cost - bal) })) : null
      ]);
    })));
    main.appendChild(U.R('div', 'small muted redeem-note', U.T('redeem.note')));

    // これまでの引換券（新しい順に全部）
    var hist = (s.redeemHistory || []).slice().reverse();
    main.appendChild(U.el('div', { class: 'panel' }, [U.R('h3', '', U.T('redeem.history'))].concat(hist.length ? hist.map(function (h) {
      return U.el('div', { class: 'redeem-row' }, [
        U.el('div', { class: 'row between' }, [
          U.el('span', {}, [when(h.issuedAt) + '  ', U.el('strong', {}, U.rich(P.formatMinutesMarkup(h.minutes))), '  ' + U.fmt(h.points) + 'pt']),
          P.isUsed(h)
            ? U.el('span', { class: 'badge used' }, U.rich(U.T('redeem.usedBadge')))
            : U.el('span', { class: 'badge ice' }, U.rich(U.T('redeem.unusedBadge')))
        ]),
        U.el('div', { class: 'row between' }, [
          U.el('span', { class: 'small muted ticket-id', text: 'ID ' + h.id }),
          U.el('button', { class: 'btn small', rich: U.T('redeem.view'), on: { click: function () { U.show('redeem', { ticket: h.id }); } } })
        ])
      ]);
    }) : [U.R('div', 'small muted', U.T('redeem.noHistory'))])));
  }

  // 時間を選んだら確認し、［引換券を発行する］で発行して券の画面へ（方式は印刷だけ。判断173）
  function confirmIssue(minutes, cost) {
    U.modal({
      body: U.el('div', { class: 'pre' }, U.rich(withTime(U.T('redeem.confirm'), minutes), { pt: U.fmt(cost) })),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        { label: U.T('redeem.issue'), class: 'primary', onClick: function () { issue(minutes, 'print'); } }
      ]
    });
  }

  function issue(minutes, method) {
    var app = FF.app;
    var r = P.redeem(app.state, { minutes: minutes, method: method, now: app.now(), rng: Math.random });
    if (!r.ok) { U.rerender(); return; }   // 残高不足などは、描き直せばボタンが押せない表示になる
    app.commit(r.state);
    U.toast(U.T('redeem.issued'));
    U.show('redeem', { ticket: r.entry.id });
  }

  // ---- 券の画面（DESIGN 14.5） ----
  // 券面は保護者も読むので、ふりがなを付けない。画面と印刷で同じ部品を使う（印刷では券面だけを名刺の大きさで出す）
  function qrSvg(text) {
    var q = FF.qrcode.encode(text);
    var n = q.size + 8;   // まわりに 4 マスの白い余白
    return U.svg('svg', { class: 'ticket-qr', viewBox: '0 0 ' + n + ' ' + n, role: 'img', 'aria-label': 'QR コード', 'shape-rendering': 'crispEdges' }, [
      U.svg('rect', { width: n, height: n, fill: '#ffffff' }),
      U.svg('path', { d: FF.qrcode.pathData(q.modules, 4), fill: '#000000' })
    ]);
  }
  function ticketCard(s, h) {
    var t = function (k, vars) { return U.plain(U.T(k), vars); };
    var used = P.isUsed(h);
    return U.el('div', { class: 'ticket-card' + (used ? ' is-used' : '') }, [
      U.el('div', { class: 'ticket-top' }, [U.el('span', { class: 'ticket-brand', text: FF.config.TITLE }), U.el('span', { class: 'ticket-heading', text: t('redeem.ticketHeading') })]),
      U.el('div', { class: 'ticket-body' }, [
        qrSvg(P.qrText(s, h)),
        U.el('div', { class: 'ticket-info' }, [
          U.el('dl', { class: 'ticket-fields' }, [
            U.el('dt', { text: t('redeem.ticketName') }), U.el('dd', { text: s.player.name }),
            U.el('dt', { text: t('redeem.ticketTime') }), U.el('dd', { text: P.formatMinutes(h.minutes) }),
            U.el('dt', { text: t('redeem.ticketDate') }), U.el('dd', { class: 'ticket-date', text: P.formatDateTime(h.issuedAt) }),
            U.el('dt', { text: 'ID' }), U.el('dd', { class: 'ticket-id', text: h.id })
          ]),
          U.el('div', { class: 'ticket-cost', text: t('redeem.ticketCost', { pt: U.fmt(h.points), rate: U.fmt(h.pointsPerHour) }) })
        ])
      ]),
      used ? U.el('div', { class: 'ticket-used-stamp', text: t('redeem.usedStamp', { date: P.formatDateTime(h.usedAt) }) }) : null
    ]);
  }

  function renderTicket(main, id) {
    var s = FF.app.state;
    var h = (s.redeemHistory || []).filter(function (x) { return x.id === id; })[0];
    if (!h) { renderMain(main); return; }
    main.appendChild(header(U.T('redeem.ticketTitle'), function () { U.show('redeem'); }));
    main.appendChild(ticketCard(s, h));

    var used = P.isUsed(h);
    // 券を使う（保護者に見せて押してもらう）。使用済みなら押せない
    main.appendChild(U.el('div', { class: 'panel stack' }, used ? [
      U.el('div', { class: 'notice' }, U.rich(U.T('redeem.alreadyUsed'), { date: P.formatDateTime(h.usedAt) })),
      U.el('button', { class: 'btn primary block', disabled: true, rich: U.T('redeem.use') })
    ] : [
      U.R('div', 'small muted', U.T('redeem.useNote')),
      U.el('button', { class: 'btn primary block', rich: U.T('redeem.use'), on: { click: function () { confirmUse(h); } } })
    ]));
    // 印刷（使用済みの券も印刷はできる。券面に「使用済み」が出る）
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('div', 'small muted', U.T('redeem.printNote')),
      U.el('button', { class: 'btn block', rich: '🖨 ' + U.T('redeem.doPrint'), on: { click: function () { root.print(); } } })
    ]));
    main.appendChild(U.el('button', { class: 'btn ghost block', rich: U.T('redeem.toList'), on: { click: function () { U.show('redeem'); } } }));
  }

  // ［この券を使う］：確認してから使用済みにする。使うと元に戻せない
  function confirmUse(h) {
    U.modal({
      body: U.el('div', { class: 'pre' }, U.rich(withTime(U.T('redeem.useConfirm'), h.minutes), { id: h.id })),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        { label: U.T('redeem.useDo'), class: 'primary', onClick: function () {
          var app = FF.app;
          var r = P.useTicket(app.state, h.id, app.now());
          if (r.ok) { app.commit(r.state); U.toast(U.T('redeem.usedToast')); }
          U.rerender();
        } }
      ]
    });
  }

  function render(main, params) {
    if (params && params.ticket) renderTicket(main, params.ticket);
    else renderMain(main);
  }

  U.screens.redeem = { render: render };
})(this);
