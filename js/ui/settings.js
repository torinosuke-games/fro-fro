// 設定：名前の変更、ふりがな、エクスポート／インポート、全データのリセット（SPEC 3.2・13・14.2）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;

  function copyText(textarea) {
    var text = textarea.value;
    function fallback() {
      textarea.focus();
      textarea.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      U.toast(ok ? U.T('copied') : U.T('copyFailed'));
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { U.toast(U.T('copied')); }, fallback);
    } else {
      fallback();
    }
  }

  // 交換レートは確認のモーダルを1段はさんで変える（SPEC 14.4）。メールアドレスは空（登録しない）か正しい形だけを保存する。
  function parentPanel() {
    var app = FF.app, s = app.state, SP = FF.balance.STUDY_POINTS;
    var rate = FF.points.rateOf(s);
    var rateInput = U.el('input', {
      class: 'field rate-input',
      attrs: { type: 'number', inputmode: 'numeric', min: SP.PER_HOUR_MIN, max: SP.PER_HOUR_MAX, step: 100, 'aria-label': U.plain(U.T('parent.rate')) },
      value: String(rate)
    });
    function setSettings(patch) {
      app.commit(Object.assign({}, app.state, { settings: Object.assign({}, app.state.settings, patch) }));
    }
    function changeRate() {
      var raw = String(rateInput.value).trim();
      var v = /^\d+$/.test(raw) ? Number(raw) : NaN;
      if (!FF.points.isValidRate(v)) {
        U.modal({ body: U.T('parent.rateError'), vars: { min: SP.PER_HOUR_MIN, max: SP.PER_HOUR_MAX } });
        return;
      }
      var from = FF.points.rateOf(app.state);
      if (v === from) { U.toast(U.T('parent.rateSame')); return; }
      U.modal({
        body: U.T('parent.rateConfirm'), vars: { from: U.fmt(from), to: U.fmt(v) },
        buttons: [
          { label: U.T('cancel'), class: 'ghost', onClick: function () { rateInput.value = String(from); } },
          { label: U.T('change'), class: 'primary', onClick: function () { setSettings({ pointsPerHour: v }); U.toast(U.T('parent.rateChanged')); U.rerender(); } }
        ]
      });
    }
    return U.el('div', { class: 'panel stack parent-panel' }, [
      U.R('h3', '', U.T('parent.title')),
      U.R('div', 'small muted', U.T('parent.help')),
      U.R('div', 'section-title', U.T('parent.rate')),
      U.el('div', { class: 'row' }, [rateInput, U.R('span', '', U.T('parent.rateUnit')), U.el('button', { class: 'btn small', rich: U.T('change'), on: { click: changeRate } })]),
      U.el('div', { class: 'row', style: { justifyContent: 'flex-end' } }, [
        U.el('button', { class: 'btn small ice', rich: U.T('parent.openRedeem'), on: { click: function () { U.openRedeem(); } } })
      ])
    ]);
  }

  function render(main) {
    var app = FF.app, s = app.state;

    // 名前
    var ni = U.nameInput(s.player.name, changeName);
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('settingsName')),
      ni.input,
      U.el('div', { class: 'row between' }, [ni.counter, U.el('button', { class: 'btn primary small', rich: U.T('change'), on: { click: changeName } })])
    ]));
    function changeName() {
      app.commit(FF.state.setPlayerName(app.state, ni.input.value));
      U.toast(U.T('nameChanged'));
      U.rerender();
    }

    // 学年・主人公の絵（判断198）
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('settingsGrade')),
      U.R('div', 'small muted', U.T('settingsGradeHelp')),
      U.gradePicker(s.player.grade, function (g) { app.commit(FF.state.setPlayerGrade(app.state, g)); app.studySel = null; U.toast(U.T('gradeChanged')); U.rerender(); })
    ]));
    if (U.artOn()) main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('settingsAvatar')),
      U.avatarPicker(s.player.avatar, function (id) { app.commit(FF.state.setPlayerAvatar(app.state, id)); U.rerender(); }, s.player.grade)
    ]));

    // ふりがな
    var on = s.settings.furigana;
    function setFurigana(v) {
      var ns = Object.assign({}, app.state, { settings: Object.assign({}, app.state.settings, { furigana: v, furiganaAuto: false }) });
      app.commit(ns);
      U.rerender();
    }
    main.appendChild(U.el('div', { class: 'panel row between' }, [
      U.R('h3', '', U.T('furigana')),
      U.el('div', { class: 'switch', attrs: { role: 'group' } }, [
        U.el('button', { class: on ? 'on' : '', rich: U.T('on'), attrs: { 'aria-pressed': on ? 'true' : 'false' }, on: { click: function () { setFurigana(true); } } }),
        U.el('button', { class: on ? '' : 'on', rich: U.T('off'), attrs: { 'aria-pressed': on ? 'false' : 'true' }, on: { click: function () { setFurigana(false); } } })
      ])
    ]));

    // 正解の音（判断259）
    var soundOn = s.settings.sound !== false;
    function setSound(v) {
      app.commit(Object.assign({}, app.state, { settings: Object.assign({}, app.state.settings, { sound: v }) }));
      if (v && FF.sound) FF.sound.correct();   // オンにしたとき、どんな音か聞こえるように鳴らす
      U.rerender();
    }
    main.appendChild(U.el('div', { class: 'panel row between' }, [
      U.R('h3', '', U.T('soundEffect')),
      U.el('div', { class: 'switch', attrs: { role: 'group' } }, [
        U.el('button', { class: soundOn ? 'on' : '', rich: U.T('on'), attrs: { 'aria-pressed': soundOn ? 'true' : 'false' }, on: { click: function () { setSound(true); } } }),
        U.el('button', { class: soundOn ? '' : 'on', rich: U.T('off'), attrs: { 'aria-pressed': soundOn ? 'false' : 'true' }, on: { click: function () { setSound(false); } } })
      ])
    ]));

    // 正解の音の種類（判断262）：押すと、その音が鳴る
    var curStyle = FF.defs.SOUND_STYLES.some(function (x) { return x.id === s.settings.soundStyle; }) ? s.settings.soundStyle : 'bright';
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('soundStyle')),
      U.el('div', { class: 'grid2' }, FF.defs.SOUND_STYLES.map(function (x) {
        return U.el('button', {
          class: 'btn small' + (curStyle === x.id ? ' primary' : ''), text: (curStyle === x.id ? '✓ ' : '') + x.name, attrs: { type: 'button', 'aria-pressed': curStyle === x.id ? 'true' : 'false' },
          on: { click: function () {
            app.commit(Object.assign({}, app.state, { settings: Object.assign({}, app.state.settings, { soundStyle: x.id }) }));
            if (FF.sound) FF.sound.play(x.id);
            U.rerender();
          } }
        });
      }))
    ]));

    // 英語の読み上げ（判断280）：オン・オフと速さ。この端末で読み上げが使えないときは、見せない
    if (FF.speech && FF.speech.supported()) {
      var speechOn = s.settings.speech !== false, curRate = FF.speech.rateId();
      function setSpeech(patch) {
        app.commit(Object.assign({}, app.state, { settings: Object.assign({}, app.state.settings, patch) }));
        U.rerender();
      }
      main.appendChild(U.el('div', { class: 'panel row between' }, [
        U.R('h3', '', U.T('speechEffect')),
        U.el('div', { class: 'switch', attrs: { role: 'group' } }, [
          U.el('button', { class: speechOn ? 'on' : '', rich: U.T('on'), attrs: { 'aria-pressed': speechOn ? 'true' : 'false' }, on: { click: function () { setSpeech({ speech: true }); } } }),
          U.el('button', { class: speechOn ? '' : 'on', rich: U.T('off'), attrs: { 'aria-pressed': speechOn ? 'false' : 'true' }, on: { click: function () { setSpeech({ speech: false }); } } })
        ])
      ]));
      var rateNames = { slow: 'speechSlow', normal: 'speechNormal', fast: 'speechFast' };
      main.appendChild(U.el('div', { class: 'panel stack' }, [
        U.R('h3', '', U.T('speechRateTitle')),
        U.el('div', { class: 'grid2' }, ['slow', 'normal', 'fast'].map(function (id) {
          return U.el('button', {
            class: 'btn small' + (curRate === id ? ' primary' : ''), text: (curRate === id ? '✓ ' : '') + FF.util.plainText(U.T(rateNames[id])), attrs: { type: 'button', 'aria-pressed': curRate === id ? 'true' : 'false' },
            on: { click: function () {
              app.commit(Object.assign({}, app.state, { settings: Object.assign({}, app.state.settings, { speechRate: id }) }));
              FF.speech.speak('Hello. Nice to meet you.');   // どんな速さか、聞こえるように読み上げる
              U.rerender();
            } }
          });
        }))
      ]));
    }

    // 保護者の方へ：交換レートとメールアドレス（v0.4、SPEC 14.4・DESIGN 14.4）
    main.appendChild(parentPanel());

    // データの保存（サーバー同期。判断299）：設定で有効にしたときと、デバッグモードのときだけ
    if (U.syncAvailable && U.syncAvailable()) main.appendChild(U.syncPanel());

    var checkpoints=FF.storage.loadRecovery(app.now());
    if (checkpoints.length) main.appendChild(U.el('section',{class:'panel stack save-recovery'},[
      U.R('h3','',U.T('recoveryTitle')),U.R('p','small',U.T('recoveryHelp')),
      U.el('div',{class:'stack'},checkpoints.map(function(item){
        var st=item.state,r=st.resources;
        return U.el('article',{class:'panel stack'},[
          U.el('strong',{text:st.player.name+' · '+new Date(st.updatedAt).toLocaleString()}),
          U.R('p','small',U.T('saveBalances'),{wood:r.wood,iron:r.iron,stone:r.stone,food:r.food,heat:st.studyPoints}),
          U.el('button',{class:'btn small',rich:U.T('recoveryUse'),on:{click:function(){inp.value=item.text;doImport();}}})
        ]);
      }))
    ]));
    // エクスポート
    var out = U.el('textarea', { attrs: { readonly: true, 'aria-label': FF.util.plainText(U.T('exportTitle')) }, value: FF.state.serialize(app.state) });
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('exportTitle')),
      U.R('div', 'small muted', U.T('exportHelp')),
      out,
      U.el('button', { class: 'btn small', rich: U.T('copy'), on: { click: function () { copyText(out); } } }),
      U.el('button',{class:'btn small',rich:U.T('downloadSave'),on:{click:function(){
        var url=URL.createObjectURL(new Blob([FF.state.serialize(app.state)],{type:'application/json'})),link=U.el('a',{attrs:{href:url,download:'frozen-frontier-'+app.now()+'.json'}});
        document.body.appendChild(link);link.click();link.remove();root.setTimeout(function(){URL.revokeObjectURL(url);},1000);
      }}})
    ]));

    // インポート
    var file=U.el('input',{attrs:{type:'file',accept:'.json,application/json','aria-label':U.plain(U.T('uploadSave'))},on:{change:function(){if(!file.files[0])return;var reader=new FileReader();reader.onload=function(){inp.value=String(reader.result);doImport();};reader.onerror=function(){U.modal({body:U.T('copyFailed')});};reader.readAsText(file.files[0]);}}});
    var inp = U.el('textarea', { attrs: { 'aria-label': FF.util.plainText(U.T('importTitle')) } });
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('importTitle')),
      U.R('div', 'small muted', U.T('importHelp')),
      inp, file,
      U.el('button', { class: 'btn small', rich: U.T('importBtn'), on: { click: doImport } })
    ]));
    function doImport() {
      var r = FF.state.parseSave(inp.value, app.now());
      if (!r.ok) { U.modal({ body: r.error }); return; }
      U.modal({
        body: U.T('importConfirm'),
        buttons: [
          { label: U.T('cancel'), class: 'ghost' },
          {
            label: U.T('importBtn'), class: 'primary', onClick: function () {
              var st = r.state;
              st.tickets = FF.tickets.recoverTickets(st.tickets, app.now());
              app.session = null;
              app.studySel = null;
              app.saveBlocked = false;
              app.commit(st);
              U.toast(U.T('imported'));
              U.show(st.flags.introSeen ? 'base' : 'title');
            }
          }
        ]
      });
    }

    // リセット（2段階の確認）
    main.appendChild(U.el('div', { class: 'panel stack' }, [
      U.R('h3', '', U.T('resetTitle')),
      U.el('button', { class: 'btn danger small', rich: U.T('resetBtn'), on: { click: confirmReset } })
    ]));
    function confirmReset() {
      U.modal({
        body: U.T('resetConfirm1'),
        buttons: [
          { label: U.T('cancel'), class: 'ghost' },
          {
            label: U.T('resetNext'), class: 'danger', onClick: function () {
              U.modal({
                body: U.T('resetConfirm2'),
                buttons: [
                  { label: U.T('cancel'), class: 'ghost' },
                  { label: U.T('resetDo'), class: 'danger', onClick: function () { app.resetAll(); } }
                ]
              });
            }
          }
        ]
      });
    }

    if (FF.debugMode) {
      main.appendChild(U.el('button', { class: 'btn block', rich: U.T('debugOpen'), on: { click: function () { U.show('debug'); } } }));
    }
  }

  U.screens.settings = { render: render };
})(this);
