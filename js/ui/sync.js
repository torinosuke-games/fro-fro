// データの保存（サーバー同期）の画面：設定のパネルと、競合の選択（判断299・SPEC_sync.md）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;

  // この版では、設定に出すのは config.SYNC.ENABLED が true のときと、デバッグモードのときだけ
  function available() {
    return !!(FF.syncApp && FF.config.SYNC && (FF.config.SYNC.ENABLED || FF.debugMode));
  }

  function whenText(ms) {
    if (!ms) return '—';
    var d = new Date(ms);
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }

  // 印刷用のカード（画面では見えない。印刷のときだけ、紙の左上に出る。css の @media print）
  function printCode(code) {
    var main = document.getElementById('screen');
    if (!main) return;
    Array.prototype.forEach.call(main.querySelectorAll('.code-card'), function (n) { n.remove(); });
    main.appendChild(U.el('div', { class: 'code-card' }, [
      U.R('div', 'code-card-brand', U.T('sync.printBrand')),
      U.el('div', { class: 'code-card-code', text: FF.sync.formatCode(code) }),
      U.R('div', 'code-card-note', U.T('sync.printNote'))
    ]));
    root.print();
  }

  function showCode(code) {
    U.modal({
      title: U.T('sync.codeTitle'),
      body: U.el('div', { class: 'stack' }, [
        U.el('div', { class: 'sync-code', text: FF.sync.formatCode(code), style: { fontSize: '1.25em', fontWeight: 'bold', letterSpacing: '0.04em', whiteSpace: 'nowrap', textAlign: 'center', fontFamily: 'monospace', userSelect: 'all' } }),
        U.R('div', 'small', U.T('sync.codeBody')),
        U.el('button', { class: 'btn small block sync-print', rich: U.T('sync.print'), on: { click: function () { printCode(code); } } })
      ])
    });
  }

  // 別の端末のコードで引き継ぐ
  function openLink() {
    var input = U.el('input', {
      class: 'field sync-link-input',
      attrs: { type: 'text', autocapitalize: 'characters', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', placeholder: 'XXXX-XXXX-XXXX-XXXX', 'aria-label': U.plain(U.T('sync.linkLabel')) }
    });
    var msg = U.el('div', { class: 'small sync-link-msg' });
    function fail(key) { msg.textContent = ''; msg.appendChild(U.rich(U.T(key))); }
    U.modal({
      title: U.T('sync.linkTitle'),
      body: U.el('div', { class: 'stack' }, [U.R('div', 'small', U.T('sync.linkLabel')), input, msg]),
      buttons: [
        { label: U.T('cancel'), class: 'ghost' },
        {
          label: U.T('sync.linkGo'), class: 'primary', keepOpen: true, onClick: function (close) {
            if (!FF.sync.normalizeCode(input.value)) { fail('sync.linkBadCode'); return; }
            FF.syncApp.link(input.value).then(function (r) {
              if (!r.ok) { fail(r.error === 'not_found' ? 'sync.linkNotFound' : r.error === 'bad_code' ? 'sync.linkBadCode' : 'sync.noNetwork'); return; }
              close();
              FF.syncApp.sync({ force: true }).then(function (res) {
                if (res.status === 'error') U.toast(U.T('sync.syncFailed'), { error: errorText(res.error) });
                if (FF.app.screen === 'settings') U.rerender();
              });
            });
          }
        }
      ]
    });
    input.focus();
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
      // おすすめ：最初の引き継ぎは、ポイントの多いほう（まっさらな端末なら、保管庫）。それ以外は、新しいほう
      var recommendRemote = info.firstLink ? info.remote.points >= info.local.points : info.remote.updatedAt > info.local.updatedAt;
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
          { label: U.T('sync.useHere'), class: recommendRemote ? '' : 'primary', onClick: function () { resolve('local'); } }
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
        rec.code ? null : U.el('button', { class: 'btn small', rich: U.T('sync.link'), on: { click: openLink } })
      ]));
      if (!rec.code) kids.push(U.R('div', 'small muted', U.T('sync.linkHelp')));
    } else {
      kids.push(U.R('div', 'small', U.T('sync.on')));
      kids.push(U.R('div', 'small muted', U.T('sync.lastSync') + '：' + (rec.lastSyncAt ? whenText(rec.lastSyncAt) : U.plain(U.T('sync.never')))));
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

  U.syncAvailable = available;
  U.syncPanel = panel;
  U.askSyncConflict = askConflict;
})(this);
