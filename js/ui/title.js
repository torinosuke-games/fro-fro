// 開始画面：名前の入力 → 導入 → 実力診断の案内（SPEC 3.1）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;

  function nameInput(initial, onEnter) {
    var max = FF.config.NAME_MAX_LENGTH;
    var counter = U.el('div', { class: 'small muted', attrs: { 'aria-live': 'polite' } });
    var input = U.el('input', {
      class: 'field center',
      attrs: { type: 'text', autocomplete: 'off', placeholder: FF.util.plainText(U.T('namePlaceholder')), 'aria-label': FF.util.plainText(U.T('settingsName')) },
      value: initial || ''
    });
    // 12文字を超えた分は切る。日本語の変換中（IME）は切らない。
    function clamp() {
      var chars = Array.from(input.value);
      if (chars.length > max) input.value = chars.slice(0, max).join('');
      counter.textContent = Array.from(input.value).length + ' / ' + max;
    }
    input.addEventListener('input', function (e) { if (!e.isComposing) clamp(); });
    input.addEventListener('compositionend', clamp);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing) onEnter(); });
    clamp();
    return { input: input, counter: counter };
  }

  function render(main) {
    var app = FF.app;
    // 試作の見た目（config.TITLE_STYLE = 'hero'）は昼のテーマのときだけ。夜はこれまでの見た目（判断102）
    var hero = app.theme === 'day' && FF.config.TITLE_STYLE === 'hero';
    var wrap = U.el('div', { class: 'title-screen' + (hero ? ' hero' : '') });
    main.appendChild(wrap);
    // 昼は青空・太陽・雲を描く（試作では雪原の絵。読み込めなければ描いた空に切り替える）。夜は描かない（SPEC_theme_default_day.md）
    function sky() {
      if (app.theme !== 'day') return null;
      if (!hero) return FF.svgScene.renderSky('day');
      var img = U.el('img', { class: 'title-hero', attrs: { src: FF.config.TITLE_HERO_IMAGE, alt: '' } });
      img.addEventListener('error', function () { if (img.parentNode) img.parentNode.replaceChild(FF.svgScene.renderSky('day'), img); });
      return img;
    }
    var sky1 = sky();
    if (sky1) wrap.appendChild(sky1);

    var logo = U.el('div', { class: 'logo fade-in' }, [FF.config.TITLE, U.el('small', { text: 'SURVIVE · LEARN · BUILD' })]);
    wrap.appendChild(logo);

    var form = U.el('div', { class: 'panel strong stack fade-in title-card' });
    var ni = nameInput('', decide);
    form.appendChild(U.R('div', 'opening', U.T('opening')));
    form.appendChild(ni.input);
    form.appendChild(U.el('div', { class: 'row between' }, [ni.counter]));
    form.appendChild(U.el('button', { class: 'btn primary block', rich: U.T('decide'), on: { click: decide } }));
    wrap.appendChild(form);
    setTimeout(function () { ni.input.focus(); }, 50);

    function decide() {
      var s = FF.state.setPlayerName(app.state, ni.input.value);
      app.commit(s);
      showIntro();
    }

    function showIntro() {
      U.clear(wrap);
      var sky2 = sky();
      if (sky2) wrap.appendChild(sky2);
      wrap.appendChild(U.el('div', { class: 'logo' }, [FF.config.TITLE]));
      var box = U.el('div', { class: 'panel strong stack fade-in title-card' });
      // 名前は textContent で表示する
      box.appendChild(U.el('div', { class: 'intro-name', text: app.state.player.name }));
      box.appendChild(U.R('div', 'intro-line', U.T('introAfter')));
      box.appendChild(U.el('button', { class: 'btn primary block', rich: U.T('introContinue'), on: { click: enterBase } }));
      wrap.appendChild(box);
    }

    function enterBase() {
      var s = Object.assign({}, app.state, { flags: Object.assign({}, app.state.flags, { introSeen: true }) });
      var offer = !s.flags.diagnosisOffered;
      s = FF.exam.markDiagnosisOffered(s);
      app.commit(s);
      U.show('base');
      if (offer) {
        U.modal({
          title: U.T('diagnosisOfferTitle'),
          body: U.T('diagnosisOffer'),
          vars: { name: app.state.player.name },
          buttons: [
            { label: U.T('skip'), class: 'ghost' },
            { label: U.T('diagnosisStart'), class: 'primary', onClick: function () { U.show('study', { tab: 'diagnosis' }); } }
          ]
        });
      }
    }
  }

  U.nameInput = nameInput;
  U.screens.title = { render: render };
})(this);
