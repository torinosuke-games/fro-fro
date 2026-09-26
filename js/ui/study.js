// 学習画面：タブ（学ぶ・昇格試験・実力診断・記録）と、「学ぶ」の選択（資源 → 教科 → 学年 → 難易度 → 形式）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var L = FF.learning;
  var TABS = ['learn', 'exam', 'diagnosis', 'records'];

  function nameOfSubject(id, grade) { return L.subjectName(id, grade); }

  function defaultSel() {
    var app = FF.app, s = app.state;
    var focus = FF.rewards.focusSubjectOf(app.now());
    return {
      resource: 'wood',
      subject: focus,
      grade: L.unlockedGrade(s, focus),
      difficulty: 'standard',
      answerType: FF.tickets.recoverTickets(s.tickets, app.now()).count > 0 ? 'choice' : 'input'
    };
  }

  function section(title, children) {
    return U.el('div', {}, [U.R('div', 'section-title', title), children]);
  }

  function pick(opts) {
    return U.el('button', {
      class: 'pick' + (opts.selected ? ' selected' : ''),
      disabled: !!opts.disabled,
      attrs: { 'aria-pressed': opts.selected ? 'true' : 'false' },
      on: { click: opts.onClick }
    }, [
      U.el('span', { class: 'title' }, opts.title),
      opts.sub ? U.el('span', { class: 'sub' }, opts.sub) : null,
      opts.tag ? U.el('span', { class: 'tag' }, opts.tag) : null
    ]);
  }

  // 教科のボタン：アイコンと教科名（5つを横一列に並べる）。選択中・未選択の見た目は pick と同じ（.pick.selected）。
  // 「生活（理科）」のような名前は、かっこの部分を小さくして2行目に出す（幅が狭いため）。
  function subjectPick(opts) {
    var m = /^(.*?)（(.*)）$/.exec(opts.name);
    return U.el('button', {
      class: 'pick subj' + (opts.selected ? ' selected' : ''),
      attrs: { 'aria-pressed': opts.selected ? 'true' : 'false' },
      on: { click: opts.onClick }
    }, [
      FF.svgSubjects.icon(opts.id, FF.app.theme),
      U.el('span', { class: 'title' }, m ? [U.rich(m[1]), U.el('span', { class: 'paren' }, U.rich('（' + m[2] + '）'))] : U.rich(opts.name)),
      U.el('span', { class: 'sub' }, opts.sub),
      opts.tag ? U.el('span', { class: 'tag' }, opts.tag) : null
    ]);
  }

  function renderLearn(box) {
    var app = FF.app, s = app.state, now = app.now();
    var sel = app.studySel = app.studySel || defaultSel();
    // 解放範囲を超えた選択は直す（データの読み込み直後など）
    if (!L.isGradeUnlocked(s, sel.subject, sel.grade)) sel.grade = L.unlockedGrade(s, sel.subject);
    function set(k, v) { sel[k] = v; U.rerender(); }

    var focus = FF.rewards.focusSubjectOf(now);
    box.appendChild(U.el('div', { class: 'focus-banner' }, U.rich(U.T('focusToday'), { subject: nameOfSubject(focus, L.unlockedGrade(s, focus)) })));

    // 資源
    box.appendChild(section(U.T('chooseResource'), U.el('div', { class: 'grid2' }, FF.defs.RESOURCES.map(function (r) {
      var producer = FF.defs.BUILDINGS.filter(function (d) { return d.produces === r.id; })[0];
      var lv = producer ? s.buildings[producer.id].level : 0;
      var bonus = Math.round((FF.rewards.facilityMultiplier(lv) - 1) * 100);
      return pick({
        title: [r.icon + ' ', U.rich(r.name)],
        sub: [U.rich(U.T('owned')), ' ' + U.fmt(s.resources[r.id] || 0), bonus > 0 ? '　' : '', bonus > 0 ? U.rich(U.T('studyBonus')) : '', bonus > 0 ? ' +' + bonus + '%' : ''],
        selected: sel.resource === r.id,
        onClick: function () { set('resource', r.id); }
      });
    }))));

    // 教科
    box.appendChild(section(U.T('chooseSubject'), U.el('div', { class: 'subj-row' }, FF.defs.SUBJECTS.map(function (subj) {
      var g = L.unlockedGrade(s, subj.id);
      return subjectPick({
        id: subj.id,
        name: nameOfSubject(subj.id, sel.subject === subj.id ? sel.grade : g),
        sub: 'Lv1〜' + g,
        tag: subj.id === focus ? '×1.25' : null,
        selected: sel.subject === subj.id,
        onClick: function () { sel.subject = subj.id; sel.grade = L.unlockedGrade(s, subj.id); U.rerender(); }
      });
    }))));

    // 学年
    var gradeBox = U.el('div', { class: 'grid3' }, FF.defs.GRADES.map(function (gr) {
      var open = L.isGradeUnlocked(s, sel.subject, gr.level);
      return pick({
        title: gr.label,
        sub: U.rich(gr.school),
        tag: open ? null : ['🔒 ', U.rich(U.T('gradeLocked'))],
        selected: sel.grade === gr.level,
        disabled: !open,
        onClick: function () { set('grade', gr.level); }
      });
    }));
    var gradeSec = section(U.T('chooseGrade'), gradeBox);
    if (L.shouldRecommendLower(s, sel.subject, sel.grade)) gradeSec.appendChild(U.R('div', 'notice', U.T('recommendLower')));
    box.appendChild(gradeSec);

    // 難易度
    box.appendChild(section(U.T('chooseDifficulty'), U.el('div', { class: 'grid3' }, FF.defs.DIFFICULTIES.map(function (d) {
      var any = L.isAvailable(app.bank, sel.subject, sel.grade, d.id, 'choice') || L.isAvailable(app.bank, sel.subject, sel.grade, d.id, 'input');
      return pick({
        title: U.rich(d.name),
        sub: '×' + FF.balance.DIFFICULTY_MULT[d.id],
        tag: any ? null : U.rich(U.T('preparing')),
        selected: sel.difficulty === d.id,
        onClick: function () { set('difficulty', d.id); }
      });
    }))));

    // 形式
    var tickets = FF.tickets.recoverTickets(s.tickets, now).count;
    box.appendChild(section(U.T('chooseFormat'), U.el('div', { class: 'grid2' }, FF.defs.ANSWER_TYPES.map(function (t) {
      var avail = L.isAvailable(app.bank, sel.subject, sel.grade, sel.difficulty, t.id);
      return pick({
        title: U.rich(t.name),
        sub: U.rich(U.T('formatNote.' + t.id)),
        tag: !avail ? U.rich(U.T('preparing')) : (t.id === 'choice' && tickets < 1 ? U.rich(U.T('noTicket')) : null),
        selected: sel.answerType === t.id,
        onClick: function () { set('answerType', t.id); }
      });
    }))));

    var ok = L.isAvailable(app.bank, sel.subject, sel.grade, sel.difficulty, sel.answerType);
    box.appendChild(U.el('div', { style: { marginTop: '16px' } }, U.el('button', {
      class: 'btn primary block', rich: ok ? U.T('start') : U.T('preparing'), disabled: !ok,
      on: { click: function () { app.session = { sel: Object.assign({}, sel), recentIds: (app.session && app.session.recentIds) || [] }; U.show('quiz'); } }
    })));
  }

  function render(main, params) {
    var app = FF.app;
    var tab = params.tab || app.studyTab || 'learn';
    app.studyTab = tab;
    main.appendChild(U.el('div', { class: 'subtabs', attrs: { role: 'tablist' } }, TABS.map(function (t) {
      return U.el('button', {
        class: t === tab ? 'active' : '', rich: U.T('studyTabs.' + t),
        attrs: { role: 'tab', 'aria-selected': t === tab ? 'true' : 'false' },
        on: { click: function () { U.show('study', { tab: t }); } }
      });
    })));
    var box = U.el('div', {});
    main.appendChild(box);
    U.studyTabs[tab](box);
  }

  U.studyTabs = U.studyTabs || {};
  U.studyTabs.learn = renderLearn;
  U.screens.study = {
    render: render,
    onTick: function () {
      // 昇格試験のクールダウン表示だけ更新する
      if (FF.app.studyTab === 'exam' && U.studyTabs.examTick) U.studyTabs.examTick();
    }
  };
})(this);
