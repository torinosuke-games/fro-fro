// 学習画面：タブ（学ぶ・昇格試験・実力診断・記録）と、「学ぶ」の選択（資源 → 教科 → 学年 → 難易度（ふだんはランダム・折りたたみ） → 出題形式）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var L = FF.learning;
  var TABS = ['learn', 'exam', 'diagnosis', 'records'];

  function nameOfSubject(id, grade) { return L.subjectName(id, grade); }

  // 教科を選んだときの学年：入れた学年（判断198）があれば、解放済みの範囲でそれに合わせる。なければ解放済みのいちばん上
  function gradeFor(s, subject) {
    var top = L.unlockedGrade(s, subject), g = s.player && s.player.grade;
    return g ? Math.min(g, top) : top;
  }
  // いちばん少ない資源（おまかせ・初めの選択。判断198）
  function scarcestResource(s) {
    var best = null;
    FF.defs.RESOURCES.forEach(function (r) { if (!best || (s.resources[r.id] || 0) < (s.resources[best] || 0)) best = r.id; });
    return best;
  }
  // おまかせ：重点教科（×1.25）・その学年・いちばん少ない資源・チケットがあれば選択問題（判断198）
  function autoSel() {
    var app = FF.app, s = app.state;
    var focus = FF.rewards.focusSubjectOf(app.now());
    return {
      resource: scarcestResource(s),
      subject: focus,
      grade: gradeFor(s, focus),
      difficulty: L.RANDOM_DIFFICULTY,
      answerType: FF.tickets.recoverTickets(s.tickets, app.now()).count > 0 ? 'choice' : 'input'
    };
  }
  function defaultSel() {
    var app = FF.app, s = app.state;
    var focus = FF.rewards.focusSubjectOf(app.now());
    return {
      resource: scarcestResource(s),
      subject: focus,
      grade: gradeFor(s, focus),
      difficulty: L.RANDOM_DIFFICULTY,   // 初期値はランダム。指定したいときだけ折りたたみを開いて選ぶ
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

  // 教科のアイコン：絵の見た目（判断177）では img/art/ の絵、読めないときと 'classic' では SVG
  var SUBJECT_ART = { japanese: 'subj-jp', math: 'subj-math', science: 'subj-sci', social: 'subj-soc', english: 'subj-en' };
  function subjectIcon(id) {
    function svgIcon() { return FF.svgSubjects.icon(id, FF.app.theme); }
    return U.artOn() && SUBJECT_ART[id] ? U.artImg(SUBJECT_ART[id], 'subj-icon art', svgIcon) : svgIcon();
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
      subjectIcon(opts.id),
      U.el('span', { class: 'title' }, m ? [U.rich(m[1]), U.el('span', { class: 'paren' }, U.rich('（' + m[2] + '）'))] : U.rich(opts.name)),
      opts.sub ? U.el('span', { class: 'sub' }, opts.sub) : null,
      opts.tag ? U.el('span', { class: 'tag' }, opts.tag) : null
    ]);
  }

  // 資源のボタン：色付きのタイルに絵文字を大きく出し、下に資源名と所持数（4つを横一列に並べる）。
  // 学習ボーナスは、教科の重点の「×1.25」と同じく上の枠に重ねたバッジで出す。
  function resourcePick(opts) {
    return U.el('button', {
      class: 'pick subj res res-' + opts.id + (opts.selected ? ' selected' : ''),
      attrs: { 'aria-pressed': opts.selected ? 'true' : 'false' },
      on: { click: opts.onClick }
    }, [
      U.artOn()
        ? U.el('span', { class: 'res-tile art', attrs: { 'aria-hidden': 'true' } }, U.artImg('res-' + opts.id, '', function () { return U.el('span', { text: opts.icon }); }))
        : U.el('span', { class: 'res-tile', attrs: { 'aria-hidden': 'true' }, text: opts.icon }),
      U.el('span', { class: 'title' }, U.rich(opts.name)),
      opts.tag ? U.el('span', { class: 'tag' }, opts.tag) : null
    ]);
  }

  function renderLearn(box) {
    var app = FF.app, s = app.state, now = app.now();
    box.classList.add('learn-sel');   // 選択画面だけ見出しの余白・アイコンを詰める（style.css の .learn-sel）
    var sel = app.studySel = app.studySel || defaultSel();
    // 解放範囲を超えた選択は直す（データの読み込み直後など）
    // 足りない資源から来たとき（判断187）は教科・学年・出題形式が未選択（null）。選び終わるまで［挑戦する］は押せない
    if (sel.subject && sel.grade != null && !L.isGradeUnlocked(s, sel.subject, sel.grade)) sel.grade = L.unlockedGrade(s, sel.subject);
    var chosen = !!sel.subject && sel.grade != null;   // 教科と学年がそろっていれば、問題があるかを確かめられる
    function set(k, v) { sel[k] = v; U.rerender(); }

    var focus = FF.rewards.focusSubjectOf(now);

    // 並び：教科 → 資源 → 学年 → 出題形式 → ［挑戦する］ → 難易度（優先度の低い難易度はボタンの下）。所持数・Lv の表示は出さない
    // 資源
    var resSec = section(U.T('chooseResource'), U.el('div', { class: 'res-row' }, FF.defs.RESOURCES.map(function (r) {
      var producer = FF.defs.BUILDINGS.filter(function (d) { return d.produces === r.id; })[0];
      var lv = producer ? s.buildings[producer.id].level : 0;
      var bonus = Math.round((FF.rewards.facilityMultiplier(lv) - 1) * 100);
      return resourcePick({
        id: r.id, icon: r.icon, name: r.name,
        tag: bonus > 0 ? '+' + bonus + '%' : null,
        selected: sel.resource === r.id,
        onClick: function () { set('resource', r.id); }
      });
    })));

    // 教科
    var subjSec = section(U.T('chooseSubject'), U.el('div', { class: 'subj-row' }, FF.defs.SUBJECTS.map(function (subj) {
      var g = L.unlockedGrade(s, subj.id);
      return subjectPick({
        id: subj.id,
        name: nameOfSubject(subj.id, sel.subject === subj.id && sel.grade != null ? sel.grade : g),
        tag: subj.id === focus ? '×1.25' : null,
        selected: sel.subject === subj.id,
        onClick: function () { sel.subject = subj.id; sel.grade = sel.pickGrade ? null : gradeFor(s, subj.id); U.rerender(); }
      });
    })));

    // 学年
    // 小学生（Lv1〜6）と中学生（Lv7〜9）の2段に分け、学年を小さなチップで横一列に並べる。
    // チップは「小1」「中3」と Lv（未解放は 🔒）。解放条件・選択の仕組みはこれまでと同じ（pick と同じ .selected・disabled）。
    var anyLocked = false;
    function gradeChip(gr) {
      var band = gr.level <= 6 ? 'elem' : 'jr', n = band === 'elem' ? gr.level : gr.level - 6;
      var open = !!sel.subject && L.isGradeUnlocked(s, sel.subject, gr.level);   // 教科を選ぶまでは押せない
      if (!open && sel.subject) anyLocked = true;
      return U.el('button', {
        class: 'pick grade-chip ' + band + (sel.grade === gr.level ? ' selected' : ''),
        disabled: !open,
        attrs: { 'aria-pressed': sel.grade === gr.level ? 'true' : 'false', 'aria-label': gr.label + ' ' + gr.school + (open ? '' : ' ' + U.plain(U.T('gradeLocked'))) },
        on: { click: function () { set('grade', gr.level); } }
      }, [
        U.el('span', { class: 'title' }, [U.rich(U.T('gradeChip.' + band)), String(n)]),
        U.el('span', { class: 'sub', text: open || !sel.subject ? gr.label : '🔒' })
      ]);
    }
    function band(id, from, to) {
      return U.el('div', { class: 'grade-band ' + id }, [
        U.el('div', { class: 'band-label' }, U.rich(U.T('gradeBand.' + id))),
        U.el('div', { class: 'grade-row' }, FF.defs.GRADES.filter(function (g) { return g.level >= from && g.level <= to; }).map(gradeChip))
      ]);
    }
    // 「🔒 の学年は 昇格試験で解放」は「小学生」の小見出しの行の右に寄せる（未解放の学年があるときだけ）
    var elemRow = band('elem', 1, 6), jrRow = band('jr', 7, 9);   // 先に両方作って anyLocked を決める
    if (anyLocked) elemRow.querySelector('.band-label').appendChild(U.R('span', 'band-note', U.T('gradeLockedNote')));
    var gradeBox = U.el('div', { class: 'grade-bands' }, [elemRow, jrRow]);
    var gradeSec = section(U.T('chooseGrade'), gradeBox);
    if (!sel.subject) gradeSec.appendChild(U.R('div', 'small muted', U.T('chooseSubjectFirst')));
    if (chosen && L.shouldRecommendLower(s, sel.subject, sel.grade)) gradeSec.appendChild(U.R('div', 'notice', U.T('recommendLower')));

    // くわしく選ぶ（判断198）：資源・学年・難易度は、ふだんは「資源：木材 ・ 学年：小3 ・ 難易度：ランダム」の1行に畳む。
    // 学年・資源が未選択のとき（足りない資源から来たとき。判断187）は開いておく
    var moreOpen = !!app.studyMoreOpen || sel.grade == null || !sel.resource;
    var mults = FF.balance.DIFFICULTY_MULT;
    var curName = sel.difficulty === L.RANDOM_DIFFICULTY ? U.T('difficultyRandom') : U.nameOf(FF.defs.DIFFICULTIES, sel.difficulty);
    var gradeName = sel.grade != null ? FF.util.plainText(U.T('gradeChip.' + (sel.grade <= 6 ? 'elem' : 'jr'))) + (sel.grade <= 6 ? sel.grade : sel.grade - 6) : '—';
    var resName = sel.resource ? U.resDef(sel.resource).name : '—';
    var diffSec = U.el('div', { class: 'diff-sec' }, U.el('div', { class: 'diff-line' }, [
      U.el('span', { class: 'diff-now-name more-sum' }, [
        U.R('span', 'diff-now', U.T('moreResource')), U.rich(resName), '　',
        U.R('span', 'diff-now', U.T('moreGrade')), gradeName, '　',
        U.R('span', 'diff-now', U.T('difficultyNow')), U.rich(curName)
      ]),
      U.el('button', {
        class: 'diff-toggle', attrs: { 'aria-expanded': moreOpen ? 'true' : 'false', 'aria-controls': 'more-options' },
        on: { click: function () { app.studyMoreOpen = !moreOpen; U.rerender(); } }
      }, [U.rich(U.T(moreOpen ? 'moreClose' : 'moreOpen')), U.el('span', { class: 'chev', attrs: { 'aria-hidden': 'true' }, text: moreOpen ? ' ▴' : ' ▾' })])
    ]));
    if (moreOpen) {
      var opts = [{ id: L.RANDOM_DIFFICULTY, name: U.T('difficultyRandom'), sub: U.rich(U.T('difficultyRandomNote')) }].concat(FF.defs.DIFFICULTIES.map(function (d) {
        return { id: d.id, name: d.name, sub: '×' + mults[d.id] };
      }));
      var more = U.el('div', { class: 'more-options stack', attrs: { id: 'more-options' } }, [resSec, gradeSec,
        section(U.T('chooseDifficulty'), U.el('div', { class: 'grid4' }, opts.map(function (d) {
          var any = !chosen || L.isAvailable(app.bank, sel.subject, sel.grade, d.id, 'choice') || L.isAvailable(app.bank, sel.subject, sel.grade, d.id, 'input');
          return pick({
            title: U.rich(d.name),
            sub: d.sub,
            tag: any ? null : U.rich(U.T('preparing')),
            selected: sel.difficulty === d.id,
            onClick: function () { set('difficulty', d.id); }
          });
        })))]);
      diffSec.appendChild(more);
    }

    // 出題形式
    var tickets = FF.tickets.recoverTickets(s.tickets, now).count;
    // 書き問題の報酬の倍率（×1.2）は、教科・資源と同じく上の枠に重ねたバッジで出す
    var fmtSec = section(U.T('chooseFormat'), U.el('div', { class: 'grid2 fmt-row' }, FF.defs.ANSWER_TYPES.map(function (t) {
      var avail = !chosen || L.isAvailable(app.bank, sel.subject, sel.grade, sel.difficulty, t.id);
      var mult = FF.balance.FORMAT_MULT[t.id];
      var btn = pick({
        // 説明はタイトルの右に1行で「選択問題（チケット1枚）」の形
        title: [U.rich(t.name), U.el('span', { class: 'fmt-note' }, ['（', U.rich(U.T('formatNote.' + t.id)), '）'])],
        tag: !avail ? U.rich(U.T('preparing')) : (t.id === 'choice' && tickets < 1 ? U.rich(U.T('noTicket')) : null),
        selected: sel.answerType === t.id,
        onClick: function () { set('answerType', t.id); }
      });
      if (mult > 1) btn.appendChild(U.el('span', { class: 'corner-tag', text: '×' + mult }));
      return btn;
    })));

    var ready = chosen && !!sel.answerType;
    var ok = ready && L.isAvailable(app.bank, sel.subject, sel.grade, sel.difficulty, sel.answerType);
    var startBox = U.el('div', { class: 'start-box' }, U.el('button', {
      class: 'btn primary block', rich: ok ? U.T('start') : U.T(ready ? 'preparing' : 'chooseAllFirst'), disabled: !ok,
      on: { click: function () { delete sel.pickGrade; app.session = { sel: Object.assign({}, sel), recentIds: (app.session && app.session.recentIds) || [] }; U.show('quiz'); } }
    }));
    // おまかせ（判断198）：1回押すだけで始める。何が選ばれるかを下に小さく出す
    var auto = autoSel();
    var autoOk = L.isAvailable(app.bank, auto.subject, auto.grade, auto.difficulty, auto.answerType);
    var autoBox = U.el('div', { class: 'auto-box' }, [
      U.el('button', {
        class: 'btn primary block auto-start', rich: U.T('autoStart'), disabled: !autoOk,
        on: { click: function () { app.studySel = Object.assign({}, auto); app.session = { sel: Object.assign({}, auto), recentIds: (app.session && app.session.recentIds) || [] }; U.show('quiz'); } }
      }),
      U.el('div', { class: 'small muted auto-sum' }, [
        U.rich(nameOfSubject(auto.subject, auto.grade)), '・',
        FF.util.plainText(U.T('gradeChip.' + (auto.grade <= 6 ? 'elem' : 'jr'))) + (auto.grade <= 6 ? auto.grade : auto.grade - 6), '・',
        U.rich(FF.defs.ANSWER_TYPES.filter(function (x) { return x.id === auto.answerType; })[0].name), '・',
        U.rich(U.resDef(auto.resource).name)
      ])
    ]);
    // 入れた学年まで開いていない教科は、実力診断をすすめる（判断198）
    var pg = s.player && s.player.grade;
    var diagHint = pg && sel.subject && L.unlockedGrade(s, sel.subject) < pg ? U.el('div', { class: 'notice diag-hint' }, [
      U.R('span', '', U.T('diagnosisHint'), { grade: FF.util.plainText(U.T('gradeChip.' + (pg <= 6 ? 'elem' : 'jr'))) + (pg <= 6 ? pg : pg - 6) }),
      U.el('button', { class: 'btn small ice', rich: U.T('diagnosisStart'), on: { click: function () { U.show('study', { tab: 'diagnosis' }); } } })
    ]) : null;
    [autoBox, U.R('div', 'section-title or-self', U.T('chooseSelf')), subjSec, diagHint, fmtSec, startBox, diffSec].forEach(function (n) { if (n) box.appendChild(n); });
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
