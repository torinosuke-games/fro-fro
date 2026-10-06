// データの保存（サーバー同期）の画面：設定のパネルと、競合の選択（判断299・SPEC_sync.md）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;

  // 設定に出すのは、config.SYNC.ENABLED が true のとき（判断310。false に戻せば、デバッグモードのときだけになる）
  function available() {
    return !!(FF.syncApp && FF.config.SYNC && (FF.config.SYNC.ENABLED || FF.debugMode));
  }

  function whenText(ms) {
    if (!ms) return '—';
    var d = new Date(ms);
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }

  // ---- QR コード（引き継ぎコードを、カメラで読み取れるようにする。判断306）----
  // 入っているのは、開くとコードが渡る URL（#ffcode=…。# のうしろはサーバーに送られない）。標準のカメラアプリで読むと、そのままゲームが開く。
  function codeUrl(code) { return FF.sync.shareUrl(FF.config.SYNC.PUBLIC_URL, code, !!FF.debugMode); }
  function qrSvg(text, cls) {
    var q = FF.qrcode.encode(text), n = q.size + 8;   // まわりに 4 マスの白い余白
    return U.svg('svg', { class: cls, viewBox: '0 0 ' + n + ' ' + n, role: 'img', 'aria-label': 'QR コード', 'shape-rendering': 'crispEdges' }, [
      U.svg('rect', { width: n, height: n, fill: '#ffffff' }),
      U.svg('path', { d: FF.qrcode.pathData(q.modules, 4), fill: '#000000' })
    ]);
  }

  // 印刷用のカード（画面では見えない。印刷のときだけ、紙の左上に出る。css の @media print）
  function printCode(code) {
    var main = document.getElementById('screen');
    if (!main) return;
    Array.prototype.forEach.call(main.querySelectorAll('.code-card'), function (n) { n.remove(); });
    main.appendChild(U.el('div', { class: 'code-card' }, [
      U.R('div', 'code-card-brand', U.T('sync.printBrand')),
      U.el('div', { class: 'code-card-main' }, [
        qrSvg(codeUrl(code), 'code-card-qr'),
        U.el('div', { class: 'code-card-side' }, [
          U.el('div', { class: 'code-card-code', text: FF.sync.formatCode(code) }),
          U.R('div', 'code-card-note', U.T('sync.printNote'))
        ])
      ])
    ]));
    root.print();
  }

  function showCode(code) {
    U.modal({
      title: U.T('sync.codeTitle'),
      body: U.el('div', { class: 'stack' }, [
        qrSvg(codeUrl(code), 'sync-qr'),
        U.R('div', 'small muted sync-qr-note', U.T('sync.qrNote')),
        U.el('div', { class: 'sync-code', text: FF.sync.formatCode(code), style: { fontSize: '1.25em', fontWeight: 'bold', letterSpacing: '0.04em', whiteSpace: 'nowrap', textAlign: 'center', fontFamily: 'monospace', userSelect: 'all' } }),
        U.R('div', 'small', U.T('sync.codeBody')),
        U.el('button', { class: 'btn small block sync-print', rich: U.T('sync.print'), on: { click: function () { printCode(code); } } })
      ])
    });
  }

  // ---- カメラで QR コードを読み取る ----
  // ブラウザの BarcodeDetector を使う（Android の Chrome など）。使えないブラウザ（iPhone の Safari など）では、ボタンを出さずに、
  // 「標準のカメラアプリで QR コードを読み取ってください」と案内する（読み取ると、そのままこのゲームが開く）
  function scanSupported() {
    return !!(root.navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && root.BarcodeDetector);
  }

  function openScanner(onCode) {
    var video = U.el('video', { class: 'sync-scan-video', attrs: { playsinline: true, muted: true, autoplay: true } });
    var msg = U.el('div', { class: 'small sync-scan-msg' });
    var stream = null, timer = null, stopped = false, detector = null;
    function stop() {
      stopped = true;
      if (timer) clearTimeout(timer);
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      stream = null;
    }
    function say(key) { msg.textContent = ''; msg.appendChild(U.rich(U.T(key))); }
    var closeScan = U.modal({
      title: U.T('sync.scanTitle'),
      dismissible: false,
      body: U.el('div', { class: 'stack' }, [video, U.R('div', 'small muted', U.T('sync.scanHelp')), msg]),
      buttons: [{ label: U.T('cancel'), class: 'ghost', onClick: stop }]
    });
    function loop() {
      if (stopped) return;
      detector.detect(video).then(function (found) {
        for (var i = 0; i < found.length; i++) {
          var code = FF.sync.codeFromText(found[i].rawValue);
          if (code) {
            stop();
            closeScan();
            onCode(code);
            return;
          }
        }
        if (found.length) say('sync.scanOther');
        timer = setTimeout(loop, 250);
      }, function () { timer = setTimeout(loop, 500); });
    }
    try { detector = new root.BarcodeDetector({ formats: ['qr_code'] }); } catch (e) { say('sync.scanNone'); return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false }).then(function (s) {
      if (stopped) { s.getTracks().forEach(function (t) { t.stop(); }); return; }
      stream = s;
      video.srcObject = s;
      var p = video.play(); if (p && p.catch) p.catch(function () { /* 自動再生が止められても、映像は出る */ });
      loop();
    }, function () { say('sync.scanDenied'); });
  }

  // コードを入れる画面の、カメラのボタンか案内（ボタンを押して読めたら onCode(code)）
  function scanControl(onCode) {
    if (scanSupported()) return U.el('button', { class: 'btn small block sync-scan-btn', rich: U.T('sync.scan'), on: { click: function () { openScanner(onCode); } } });
    return U.R('div', 'small muted sync-scan-hint', U.T('sync.scanHint'));
  }

  // 別の端末のコードで引き継ぐ（コードが読めたあとの処理）
  function linkWithCode(code, onFail) {
    return FF.syncApp.link(code).then(function (r) {
      if (!r.ok) { onFail(r.error === 'not_found' ? 'sync.linkNotFound' : r.error === 'bad_code' ? 'sync.linkBadCode' : 'sync.noNetwork'); return false; }
      FF.syncApp.sync({ force: true }).then(function (res) {
        if (res.status === 'error') U.toast(U.T('sync.syncFailed'), { error: errorText(res.error) });
        if (FF.app.screen === 'settings') U.rerender();
      });
      return true;
    });
  }

  function openLink() {
    var input = U.el('input', {
      class: 'field sync-link-input',
      attrs: { type: 'text', autocapitalize: 'characters', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', placeholder: 'XXXX-XXXX-XXXX-XXXX', 'aria-label': U.plain(U.T('sync.linkLabel')) }
    });
    var msg = U.el('div', { class: 'small sync-link-msg' });
    function fail(key) { msg.textContent = ''; msg.appendChild(U.rich(U.T(key))); }
    var closeModal = null;
    function go(text) {
      if (!FF.sync.codeFromText(text)) { fail('sync.linkBadCode'); return; }
      linkWithCode(FF.sync.codeFromText(text), fail).then(function (ok) { if (ok && closeModal) closeModal(); });
    }
    closeModal = U.modal({
      title: U.T('sync.linkTitle'),
      body: U.el('div', { class: 'stack' }, [scanControl(function (code) { go(code); }), U.R('div', 'small', U.T('sync.linkLabel')), input, msg]),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        { label: U.T('sync.linkGo'), class: 'primary', keepOpen: true, onClick: function () { go(input.value); } }
      ]
    });
    input.focus();
  }

  // QR コード（URL の # のうしろ）から開かれたとき：どうするかを聞く（起動のあとに1回）
  function handleIncoming() {
    var m = /ffcode=/.test(root.location.hash || '') ? FF.sync.codeFromText(root.location.hash) : null;
    if (!m) return;
    try { root.history.replaceState(null, '', root.location.pathname + root.location.search); } catch (e) { /* 何もしない */ }
    var rec = FF.syncApp ? FF.syncApp.record() : null;
    var buttons = [{ label: U.T('cancel'), class: 'ghost' }, {
      label: U.T('sync.incomingView'), class: 'primary', onClick: function () {
        U.addGuardian(m).then(function (r) { if (r.ok) U.show('parent', { code: m }); else U.modal({ body: U.T(r.error === 'not_found' ? 'sync.linkNotFound' : 'sync.noNetwork') }); });
      }
    }];
    if (FF.syncApp && !(rec && rec.code)) buttons.push({
      label: U.T('sync.incomingLink'), class: '', onClick: function () {
        linkWithCode(m, function (key) { U.modal({ body: U.T(key) }); });
      }
    });
    U.modal({ title: U.T('sync.incomingTitle'), body: U.R('div', '', U.T(rec && rec.code ? 'sync.incomingBodyHasCode' : 'sync.incomingBody')), buttons: buttons, dismissible: false });
  }

  // 競合の選択。'local'（この端末）・'remote'（ほかの端末）・null（あとで）で解決する
  function askConflict(info) {
    return new Promise(function (resolve) {
      function row(title, x) {
        return U.el('div', { class: 'panel stack' }, [
          U.R('h3', '', title),
          U.R('div', 'pre small', U.T('sync.conflictRow'), { when: whenText(x.updatedAt), name: x.name, points: U.fmt(x.points), levels: x.levels })
        ]);
      }
      // おすすめ：最初の引き継ぎは、いつも「ほかの端末（保管庫）」（この端末で保管庫を置き換えるのは、おすすめにしない）。それ以外は、新しいほう
      var recommendRemote = info.firstLink ? true : info.remote.updatedAt > info.local.updatedAt;
      // 最初の引き継ぎで「この端末を使う」を選ぶと、保管庫のデータを置き換えてしまう（別の人のコードを入れたときは、その人のデータが消える）。確認を1段はさむ
      function useHere(close) {
        if (!info.firstLink) { close(); resolve('local'); return; }
        U.modal({
          title: U.T('sync.overwriteTitle'), body: U.T('sync.overwriteBody'), dismissible: false,
          buttons: [
            { label: U.T('sync.overwriteCancel'), class: 'primary' },
            { label: U.T('sync.overwriteOk'), class: 'danger', onClick: function () { close(); resolve('local'); } }
          ]
        });
      }
      U.modal({
        title: U.T('sync.conflictTitle'),
        dismissible: false,
        body: U.el('div', { class: 'stack' }, [
          U.R('div', '', info.firstLink ? U.T('sync.conflictBodyFirst') : U.T('sync.conflictBody')),
          row(U.T('sync.conflictHere'), info.local),
          row(U.T('sync.conflictThere'), info.remote),
          U.R('div', 'small muted', U.T('sync.conflictNote'))
        ]),
        buttons: [
          { label: U.T('sync.later'), class: 'ghost', onClick: function () { resolve(null); } },
          { label: U.T('sync.useThere'), class: recommendRemote ? 'primary' : '', onClick: function () { resolve('remote'); } },
          { label: U.T('sync.useHere'), class: recommendRemote ? '' : 'primary', keepOpen: true, onClick: useHere }
        ]
      });
    });
  }

  function errorText(code) { return String(code || ''); }

  function runSync(btn) {
    var app = FF.app;
    if (btn) { btn.disabled = true; }
    U.toast(U.T('sync.syncing'));
    FF.syncApp.sync({ force: true }).then(function (r) {
      if (r.status === 'error') U.toast(U.T('sync.syncFailed'), { error: errorText(r.error) });
      else if (r.status !== 'deferred') U.toast(U.T('sync.synced'));
      if (app.screen === 'settings') U.rerender();
    });
  }

  function turnOn() {
    U.modal({
      title: U.T('sync.consentTitle'),
      body: U.T('sync.consentBody'),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        {
          label: U.T('sync.consentOk'), class: 'primary', onClick: function () {
            if (!(root.crypto && root.crypto.getRandomValues)) { U.modal({ body: U.T('sync.noRandom') }); return; }
            FF.syncApp.enable().then(function (r) {
              if (!r.ok) { U.modal({ body: U.T('sync.noNetwork') }); return; }
              showCode(r.code);
              FF.syncApp.sync({ force: true }).then(function () { if (FF.app.screen === 'settings') U.rerender(); });
            });
          }
        }
      ]
    });
  }

  function panel() {
    var rec = FF.syncApp.record();
    var kids = [U.R('h3', '', U.T('sync.title'))];
    if (!rec.enabled) {
      kids.push(U.R('div', 'small muted', U.T('sync.help')));
      kids.push(U.el('div', { class: 'row' }, [
        U.el('button', { class: 'btn small primary', rich: U.T('sync.turnOn'), on: { click: turnOn } }),
        rec.code ? null : U.el('button', { class: 'btn small sync-link-open', rich: U.T('sync.link'), on: { click: openLink } })
      ]));
      if (!rec.code) kids.push(U.R('div', 'small muted', U.T('sync.linkHelp')));
    } else {
      kids.push(U.R('div', 'small', U.T('sync.on')));
      kids.push(U.R('div', 'small muted', U.T('sync.lastSync') + '：' + (rec.lastSyncAt ? whenText(rec.lastSyncAt) : U.plain(U.T('sync.never')))));
      var pend = FF.syncApp.pending();
      if (pend.count || pend.dropped) kids.push(U.R('div', 'small muted', U.T('sync.pending') + (pend.dropped ? U.T('sync.droppedNote') : ''), { count: pend.count, dropped: pend.dropped }));
      if (rec.lastError) kids.push(U.R('div', 'small', U.T('sync.syncFailed'), { error: errorText(rec.lastError) }));
      var syncBtn = U.el('button', { class: 'btn small primary', rich: U.T('sync.syncNow') });
      syncBtn.addEventListener('click', function () { runSync(syncBtn); });
      kids.push(U.el('div', { class: 'row' }, [
        syncBtn,
        U.el('button', { class: 'btn small', rich: U.T('sync.showCode'), on: { click: function () { showCode(rec.code); } } }),
        U.el('button', {
          class: 'btn small', rich: U.T('sync.turnOff'), on: { click: function () {
            U.modal({ body: U.T('sync.turnOffConfirm'), buttons: [
              { label: U.T('cancel'), class: 'ghost' },
              { label: U.T('sync.turnOff'), class: 'primary', onClick: function () { FF.syncApp.disable(); U.rerender(); } }
            ] });
          } }
        })
      ]));
    }
    kids.push(U.el('button', { class: 'btn small sync-parent-open', rich: U.T('guardian.open'), on: { click: function () { U.openParentReport(); } } }));
    if (rec.code) {
      kids.push(U.el('button', {
        class: 'btn danger small', rich: U.T('sync.deleteRemote'), on: { click: function () {
          U.modal({ body: U.T('sync.deleteConfirm'), buttons: [
            { label: U.T('cancel'), class: 'ghost' },
            { label: U.T('sync.deleteRemote'), class: 'danger', onClick: function () {
              FF.syncApp.deleteRemote().then(function (r) {
                if (r.ok) { FF.storage.clearSync(); U.toast(U.T('sync.deleted')); } else U.modal({ body: U.T('sync.noNetwork') });
                U.rerender();
              });
            } }
          ] });
        } }
      }));
    }
    var out = U.el('div', { class: 'panel stack sync-panel' }, kids);

    // 使わなかったほうのセーブの控え
    var backup = FF.storage.loadSyncBackup();
    if (backup) {
      var ta = U.el('textarea', { attrs: { readonly: true, 'aria-label': U.plain(U.T('sync.backupTitle')) }, value: backup });
      return U.el('div', { class: 'stack' }, [out, U.el('div', { class: 'panel stack' }, [
        U.R('h3', '', U.T('sync.backupTitle')),
        U.R('div', 'small muted', U.T('sync.backupHelp')),
        ta,
        U.el('div', { class: 'row' }, [
          U.el('button', { class: 'btn small', rich: U.T('copy'), on: { click: function () { ta.focus(); ta.select(); try { document.execCommand('copy'); U.toast(U.T('copied')); } catch (e) { U.toast(U.T('copyFailed')); } } } }),
          U.el('button', { class: 'btn small danger', rich: U.T('sync.backupDelete'), on: { click: function () { FF.storage.saveSyncBackup(null); U.rerender(); } } })
        ])
      ])]);
    }
    return out;
  }

  U.scanControl = scanControl;
  U.handleIncomingCode = handleIncoming;
  U.syncAvailable = available;
  U.syncPanel = panel;
  U.askSyncConflict = askConflict;
})(this);
