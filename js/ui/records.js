// 学習記録（SPEC 第12章）
(function (root) {
  'use strict';
  var FF = root.FF;
  var U = FF.ui;
  var L = FF.learning;

  function pct(c, a) { return a ? Math.round(c / a * 100) + '%' : '—'; }
  function frac(x) { return x.attempts ? x.correct + '/' + x.attempts : '—'; }
  function th(t) { return U.el('th', {}, U.rich(t)); }
  function td(v) { return U.el('td', {}, typeof v === 'string' || typeof v === 'number' ? String(v) : v); }
  function when(t) {
    var d = new Date(t);
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function render(box) {
    var s = FF.app.state;

    // 勉強量ポイント（v0.4）：残高・累計・引換所への入り口
    box.appendChild(U.el('div', { class: 'panel pt-panel' }, [
      U.el('div', { class: 'row between' }, [
        U.el('div', {}, [
          U.el('div', { class: 'small muted' }, ['⭐ ', U.rich(U.T('ptBalance'))]),
          U.el('div', { class: 'pt-big', text: U.fmt(s.studyPoints || 0) + ' pt' })
        ]),
        U.el('button', { class: 'btn primary small', rich: U.T('ptToRedeem'), on: { click: function () { U.openRedeem(); } } })
      ]),
      U.el('div', { class: 'row between small' }, [U.R('span', 'muted', U.T('ptEarnedTotal')), U.el('strong', { text: U.fmt(s.studyPointsEarnedTotal || 0) + ' pt' })])
    ]));

    var top =U.el('div', { class: 'panel' }, [
      U.R('h3', '', U.T('progress')),
      U.el('div', { class: 'progress-line' }, U.rich(L.progressLine(s))),
      U.R('div', 'disclaimer', U.T('recordsNote'))
    ]);
    box.appendChild(top);

    // 教科ごと
    var table = U.el('table', { class: 'data' }, [
      U.el('thead', {}, U.el('tr', {}, [th(U.T('subject')), th(U.T('attempts')), th(U.T('correctCount')), th(U.T('rate')), th(FF.defs.ANSWER_TYPES[0].name), th(FF.defs.ANSWER_TYPES[1].name), th(U.T('hintsUsed'))]))
    ]);
    var tbody = U.el('tbody');
    FF.defs.SUBJECTS.forEach(function (subj) {
      var sum = L.subjectSummary(s, subj.id);
      tbody.appendChild(U.el('tr', {}, [
        td(U.rich(L.subjectName(subj.id, L.unlockedGrade(s, subj.id)))), td(sum.attempts), td(sum.correct), td(pct(sum.correct, sum.attempts)),
        td(frac(sum.choice)), td(frac(sum.input)), td(sum.hintsUsed)
      ]));
    });
    table.appendChild(tbody);
    box.appendChild(U.el('div', { class: 'panel' }, [U.el('div', { class: 'table-wrap' }, table)]));

    // 学年別
    var perGrade = U.el('div', { class: 'panel' }, [U.R('h3', '', U.T('perGrade'))]);
    var anyGrade = false;
    FF.defs.SUBJECTS.forEach(function (subj) {
      var bySubj = s.learning.stats[subj.id] || {};
      var grades = Object.keys(bySubj).map(Number).sort(function (a, b) { return a - b; });
      if (!grades.length) return;
      anyGrade = true;
      var t = U.el('table', { class: 'data' }, [U.el('thead', {}, U.el('tr', {}, [th(L.subjectName(subj.id, grades[0])), th(U.T('attempts')), th(U.T('rate')), th(FF.defs.ANSWER_TYPES[0].name), th(FF.defs.ANSWER_TYPES[1].name), th(U.T('hintsUsed'))]))]);
      var tb = U.el('tbody');
      grades.forEach(function (g) {
        var c = bySubj[g];
        tb.appendChild(U.el('tr', {}, [td('Lv' + g), td(c.attempts), td(pct(c.correct, c.attempts)), td(frac(c.choice)), td(frac(c.input)), td(c.hintsUsed)]));
      });
      t.appendChild(tb);
      perGrade.appendChild(U.el('div', { class: 'table-wrap', style: { marginBottom: '10px' } }, t));
    });
    if (!anyGrade) perGrade.appendChild(U.R('div', 'small muted', U.T('noRecords')));
    box.appendChild(perGrade);

    // 連続正解・累計
    var st = s.learning.streak;
    box.appendChild(U.el('div', { class: 'panel' }, [
      U.el('div', { class: 'row between' }, [U.R('span', '', U.T('streak')), U.el('strong', { text: st.current })]),
      U.el('div', { class: 'row between' }, [U.R('span', '', U.T('bestStreak')), U.el('strong', { text: st.best })]),
      U.R('div', 'section-title', U.T('totalEarned')),
      U.el('div', { class: 'cost' }, FF.defs.RESOURCES.map(function (r) {
        return U.el('span', { class: 'item' }, [r.icon + ' ', U.rich(r.name), ' ' + U.fmt(s.learning.totalEarned[r.id] || 0)]);
      }))
    ]));

    // 昇格試験の履歴
    var ex = s.learning.examHistory.slice(-10).reverse();
    box.appendChild(U.el('div', { class: 'panel' }, [U.R('h3', '', U.T('examHistory'))].concat(ex.length ? ex.map(function (e) {
      return U.el('div', { class: 'row between small' }, [
        U.el('span', {}, [when(e.at) + '  ', U.rich(L.subjectName(e.subject, e.grade)), ' Lv' + e.grade]),
        U.el('span', { style: { color: e.passed ? 'var(--good)' : 'var(--bad)' } }, [U.rich(e.passed ? U.T('passed') : U.T('failed')), ' ' + e.correct + '/' + e.total])
      ]);
    }) : [U.R('div', 'small muted', U.T('noRecords'))])));

    // 最近の学習
    var hist = s.learning.history.slice(-15).reverse();
    box.appendChild(U.el('div', { class: 'panel' }, [U.R('h3', '', U.T('recentHistory'))].concat(hist.length ? hist.map(function (h) {
      var res = h.resource ? U.resDef(h.resource) : null;
      return U.el('div', { class: 'row between small' }, [
        U.el('span', {}, [(h.correct ? '✓ ' : '✗ ') + when(h.at) + '  ', U.rich(L.subjectName(h.subject, h.grade)), ' Lv' + h.grade]),
        U.el('span', { class: 'muted', text: res ? '+' + h.reward + ' ' + res.icon + (h.points ? '  +' + h.points + ' ⭐' : '') : '—' })
      ]);
    }) : [U.R('div', 'small muted', U.T('noRecords'))])));

    box.appendChild(U.R('div', 'disclaimer', U.T('recordsNote')));
  }

  U.studyTabs = U.studyTabs || {};
  U.studyTabs.records = render;
})(this);
