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
      showGrade();
    }

    // 学年を選ぶ（判断198）。ふりがなの初めの設定と「学ぶ」の初めの選択に使う（解放はこれまでどおり試験・診断）。主人公の候補はこの学年で決まる（判断204）
    function showGrade() {
      var box = step();
      box.appendChild(U.R('div', 'opening', U.T('chooseMyGrade')));
      box.appendChild(U.gradePicker(app.state.player.grade, function (g) {
        app.commit(FF.state.setPlayerGrade(app.state, g));
        showAvatar();
      }));
      box.appendChild(U.R('div', 'small muted center', U.T('gradeLater')));
    }

    // 主人公の絵を選ぶ（判断198・204）。絵の見た目のときだけ（絵が読めなければ飛ばす）。小学生用・中学生用から学年に合う方を出す
    function showAvatar() {
      if (!U.artOn()) { showIntro(); return; }
      var box = step();
      box.appendChild(U.R('div', 'opening', U.T('chooseAvatar')));
      box.appendChild(U.avatarPicker(app.state.player.avatar, function (id) {
        app.commit(FF.state.setPlayerAvatar(app.state, id));
        showIntro();
      }, app.state.player.grade));
    }

    function step() {
      U.clear(wrap);
      var sky2 = sky();
      if (sky2) wrap.appendChild(sky2);
      wrap.appendChild(U.el('div', { class: 'logo' }, [FF.config.TITLE]));
      var box = U.el('div', { class: 'panel strong stack fade-in title-card' });
      wrap.appendChild(box);
      return box;
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
      var g = s.player.grade;
      var offer = !s.flags.diagnosisOffered && (!g || g > FF.balance.INITIAL_UNLOCKED_GRADE);   // 小2以下は最初から選べるので案内しない（判断198）
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

  // 主人公の絵の選択（開始画面と設定で使う。判断198・204）。押すとすぐ onPick(id)。grade に合う候補（小学生用か中学生用）を出す
  function avatarPicker(current, onPick, grade) {
    return U.el('div', { class: 'avatar-grid' }, FF.defs.avatarsFor(grade).map(function (id, i) {
      return U.el('button', {
        class: 'avatar-pick' + (current === id ? ' selected' : ''),
        attrs: { 'aria-pressed': current === id ? 'true' : 'false', 'aria-label': FF.util.plainText(U.T('avatarN'), { n: i + 1 }) },
        on: { click: function () { onPick(id); } }
      }, U.artImg('avatar-' + id + '.jpg', 'avatar-img', function () { return U.el('span', { text: String(i + 1) }); }));
    }));
  }
  // 学年の選択（小1〜小6・中1〜中3。判断198）
  function gradePicker(current, onPick) {
    function chip(gr) {
      var band = gr.level <= 6 ? 'elem' : 'jr', n = band === 'elem' ? gr.level : gr.level - 6;
      return U.el('button', {
        class: 'pick grade-chip ' + band + (current === gr.level ? ' selected' : ''),
        attrs: { 'aria-pressed': current === gr.level ? 'true' : 'false', 'aria-label': gr.school },
        on: { click: function () { onPick(gr.level); } }
      }, U.el('span', { class: 'title' }, [U.rich(U.T('gradeChip.' + band)), String(n)]));
    }
    return U.el('div', { class: 'grade-bands start-grades' }, [
      U.el('div', { class: 'grade-row' }, FF.defs.GRADES.filter(function (g) { return g.level <= 6; }).map(chip)),
      U.el('div', { class: 'grade-row' }, FF.defs.GRADES.filter(function (g) { return g.level > 6; }).map(chip))
    ]);
  }

  U.avatarPicker = avatarPicker;
  U.gradePicker = gradePicker;
  U.nameInput = nameInput;
  U.screens.title = { render: render };
})(this);
