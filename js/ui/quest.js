// 酒場の画面（住民の依頼クエスト。判断434・436・440）：看板娘が、今日の依頼を紹介する。受ける・渡す・報告する。
(function (root) {
  'use strict';
  var FF = root.FF, U = FF.ui, E = U.el, Q = FF.quests, T = FF.texts.quest, closeBoard = null;

  function whoName(id) {
    if (T.who[id]) return T.who[id];
    var m = FF.texts.adventure && FF.texts.adventure.members && FF.texts.adventure.members[id];
    return m ? m.name : T.whoOther;
  }
  function resDef(id) { return FF.defs.RESOURCES.filter(function (r) { return r.id === id; })[0] || { icon: '', name: id }; }
  function subjectName(id) { var g = FF.app.state.player.grade || 5; return FF.learning.subjectName ? FF.learning.subjectName(id, g) : U.nameOf(FF.defs.SUBJECTS, id); }
  function enemyName(id) { var e = FF.texts.adventure && FF.texts.adventure.enemies && FF.texts.adventure.enemies[id]; return e ? e.name : id; }

  function askText(qu) {
    if (qu.kind === 'deliver') return T.ask.deliver.replace('{res}', resDef(qu.target).name).replace('{n}', qu.need);
    if (qu.kind === 'defend') return T.ask.defend.replace('{n}', qu.need);
    if (qu.kind === 'hunt') return T.ask.hunt.replace('{enemy}', enemyName(qu.target)).replace('{n}', qu.need);
    if (qu.target === 'any') return T.ask.studyAny.replace('{n}', qu.need);
    return T.ask.study.replace('{subject}', subjectName(qu.target)).replace('{n}', qu.need);
  }
  function rewardView(r) {
    var kids = [E('span', { class: 'qt-gold', text: U.fmt(r.gold) + ' G' })];
    Object.keys(r.res || {}).forEach(function (k) { kids.push(E('span', { class: 'qt-res' }, [resDef(k).icon + ' ' + U.fmt(r.res[k])])); });
    if (r.potions) kids.push(E('span', { class: 'qt-potion', text: '🧪 ×' + r.potions }));
    return E('div', { class: 'qt-reward' }, [E('span', { class: 'qt-reward-label', rich: T.rewardLabel }), E('span', { class: 'qt-reward-items' }, kids)]);
  }

  // 報酬の文字（お知らせ用）
  function rewardText(r) {
    var t = ['+' + U.fmt(r.gold) + ' G'];
    Object.keys(r.res || {}).forEach(function (k) { t.push(resDef(k).icon + U.fmt(r.res[k])); });
    if (r.potions) t.push('🧪×' + r.potions);
    return t.join('　');
  }

  function faceImg(id, cls) { return U.artImg('npc-' + id + '-face.webp', cls, function () { return E('span', { class: cls + ' is-emoji', text: T.faceEmoji[id] || '🙂', attrs: { 'aria-hidden': 'true' } }); }); }
  // 話し手（顔の絵と吹き出し）。酒場の看板娘・武器屋／防具屋／道具屋の店主で共通（判断439）。絵は img/art/npc-<名前>-face.webp
  function speaker(face, name, lines, extra) {
    return E('div', { class: 'qt-girl', attrs: { 'data-speaker': face } }, [
      faceImg(face, 'qt-portrait'),
      E('div', { class: 'qt-bubble' }, [E('strong', { class: 'qt-speaker', rich: name })].concat(lines.map(function (t) { return E('p', { rich: t }); })).concat(extra || []))
    ]);
  }
  // 店主のあいさつ。mood：'greet'｜'bought'｜'poor'
  function keeperBox(kind, mood) {
    var k = T.keeper[kind], lines = k[mood] || k.greet;
    return speaker(kind, k.speaker, lines);
  }

  // 住民の顔（小さな丸い絵。img/art/npc-<id>-face.webp。読めないときは、絵文字）
  function face(id, cls) { return faceImg(id, cls || 'qt-face'); }
  function levelName(state, who) { return T.trust.levels[Q.trustLevel(state, who)]; }
  // 特別な依頼の、お願いのことば（住民の物語のあとに出す）
  function specialText(qu) {
    var idx = +qu.special.split('-')[1] - 1, d = T.special[qu.who] && T.special[qu.who][idx];
    if (!d) return null;
    return { story: d.story, ask: d.ask.replace('{n}', qu.need).replace('{enemy}', enemyName(qu.target)).replace('{subject}', qu.target === 'any' ? U.plain(T.anySubject) : subjectName(qu.target)), thanks: d.thanks };
  }
  // 報告のあとに出す吹き出し（住民の感謝のことば・信頼が上がった知らせ・特別な依頼が届いた知らせ）
  function claimSay(r, qu) {
    var say = [];
    if (qu.special) { var st = specialText(qu); if (st) say.push({ face: qu.who, name: whoName(qu.who), lines: [st.thanks] }); }
    var lines = [];
    if (r.trust && r.trust.levelUp) lines.push(T.trust.levelUp.replace('{who}', whoName(qu.who)).replace('{level}', T.trust.levels[r.trust.to]));
    (r.unlocked || []).forEach(function (sid) { lines.push(T.trust.specialNew.replace('{who}', whoName(sid.split('-')[0]))); });
    if (lines.length) say.push({ face: 'tavern', name: T.speaker, lines: lines });
    return say;
  }

  function card(qu, again) {
    var a = FF.app, s = a.state, done = Q.done(qu), act, sp = qu.special ? specialText(qu) : null;
    var onClaim = function () { var r = Q.claim(a.state, qu.id); if (r.ok) { a.commit(r.state); U.toast(T.toastClaim + ' ' + rewardText(r.reward)); again({ say: claimSay(r, qu) }); } };
    if (qu.claimed) act = E('span', { class: 'qt-state is-claimed', rich: T.claimed });
    else if (!qu.accepted) act = E('button', { class: 'rn-button primary shop-btn qt-btn', attrs: { type: 'button', 'data-act': 'accept' }, rich: T.accept, on: { click: function () { var r = Q.accept(a.state, qu.id); if (r.ok) { a.commit(r.state); U.toast(T.toastAccept); again(); } } } });
    else if (done) act = E('button', { class: 'rn-button primary shop-btn qt-btn', attrs: { type: 'button', 'data-act': 'claim' }, rich: T.claim, on: { click: onClaim } });
    else if (qu.kind === 'deliver') {
      var can = Q.canDeliver(s, qu.id).ok;
      act = E('button', { class: 'rn-button primary shop-btn qt-btn', attrs: { type: 'button', 'data-act': 'deliver', disabled: can ? null : 'true' }, rich: T.deliverBtn, on: { click: function () { var r = Q.deliver(a.state, qu.id); if (r.ok) { a.commit(r.state); again(); } } } });
    } else act = E('span', { class: 'qt-state', rich: T.accepted });
    var pct = Math.round(100 * qu.progress / qu.need), rate = qu.who ? Q.bonusRate(s, qu.who) : 0;
    return E('div', { class: 'qt-card' + (qu.special ? ' is-special' : '') + (qu.claimed ? ' is-claimed' : '') + (qu.accepted && !qu.claimed ? ' is-accepted' : ''), attrs: { 'data-quest': qu.id, 'data-kind': qu.kind, 'data-who': qu.who } }, [
      E('div', { class: 'qt-head' }, [face(qu.who), E('div', { class: 'qt-headtext' }, [
        E('div', { class: 'qt-headline' }, [E('span', { class: 'qt-kind', rich: qu.special ? T.trust.specialLabel : T.kind[qu.kind] }), E('strong', { class: 'qt-who', rich: whoName(qu.who) })]),
        E('span', { class: 'qt-level', rich: levelName(s, qu.who) })])]),
      sp ? E('p', { class: 'qt-story', rich: sp.story }) : null,
      E('p', { class: 'qt-ask', rich: sp ? sp.ask : askText(qu) }),
      rewardView(qu.reward),
      rate ? E('span', { class: 'qt-bonus', rich: T.trust.bonus.replace('{n}', Math.round(rate * 100)) }) : null,
      qu.accepted ? E('div', { class: 'qt-progress', attrs: { role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(qu.need), 'aria-valuenow': String(qu.progress) } }, [
        E('span', { class: 'qt-bar' }, [E('i', { attrs: { style: 'width:' + pct + '%' } })]), E('span', { class: 'qt-count', rich: T.progress.replace('{have}', qu.progress).replace('{need}', qu.need) })]) : null,
      E('div', { class: 'qt-act' }, [act])
    ]);
  }

  // 「住民の信頼」のタブ：住民ごとの、信頼の段階・次の段階までの進み具合・特別な依頼を終えた数
  function trustRow(s, who) {
    var pr = Q.trustProgress(s, who), defs = Q.specialDefs(who), n = (s.quests.specialDone ? defs.filter(function (d, i) { return s.quests.specialDone[who + '-' + (i + 1)]; }).length : 0);
    var pct = pr.next ? Math.round(100 * (pr.have - FF.balance.QUESTS.TRUST.LEVELS[pr.level]) / (pr.next - FF.balance.QUESTS.TRUST.LEVELS[pr.level])) : 100, rate = Q.bonusRate(s, who);
    return E('div', { class: 'qt-trust-row', attrs: { 'data-who': who, 'data-level': String(pr.level) } }, [
      face(who, 'qt-face big'),
      E('div', { class: 'qt-trust-info' }, [
        E('div', { class: 'qt-headline' }, [E('strong', { class: 'qt-who', rich: whoName(who) }), E('span', { class: 'qt-level is-on', rich: T.trust.levels[pr.level] })]),
        E('div', { class: 'qt-progress' }, [E('span', { class: 'qt-bar' }, [E('i', { attrs: { style: 'width:' + pct + '%' } })]),
          E('span', { class: 'qt-count', rich: pr.next ? T.trust.next.replace('{have}', pr.have).replace('{next}', pr.next) : T.trust.max })]),
        E('span', { class: 'qt-trust-meta', rich: (defs.length ? T.trust.specialDone.replace('{n}', n) : '') + (rate ? '　' + T.trust.bonus.replace('{n}', Math.round(rate * 100)) : '') })
      ])
    ]);
  }

  var tab = 'board';
  function open(ctx) {
    var a = FF.app;
    ctx = ctx || {};
    if (closeBoard) { closeBoard(); closeBoard = null; }
    var fresh = Q.today(a.state, a.now());
    if (fresh !== a.state) a.commit(fresh);
    var s = a.state, list = s.quests.board, again = function (c) { open(c); };
    var line = Q.remaining(s) ? T.greet : [T.greetDone];
    var girl = speaker('tavern', T.speaker, line, Q.remaining(s) ? [E('p', { class: 'qt-intro', rich: T.intro.replace('{n}', list.length) })] : []);
    var tabs = E('div', { class: 'qt-tabs', attrs: { role: 'tablist' } }, [['board', T.trust.tabQuests], ['trust', T.trust.tab]].map(function (t) {
      return E('button', { class: 'qt-tab' + (tab === t[0] ? ' is-on' : ''), attrs: { type: 'button', role: 'tab', 'data-tab': t[0], 'aria-selected': tab === t[0] ? 'true' : 'false' }, rich: t[1], on: { click: function () { tab = t[0]; open(); } } });
    }));
    var content;
    if (tab === 'trust') {
      var ids = FF.balance.QUESTS.RESIDENTS.slice();
      Object.keys(s.quests.trust || {}).forEach(function (k) { if (ids.indexOf(k) < 0 && s.quests.trust[k] > 0) ids.push(k); });
      content = [E('p', { class: 'qt-trust-intro', rich: T.trust.intro }), E('div', { class: 'qt-trust-list' }, ids.map(function (id) { return trustRow(s, id); }))];
    } else {
      var specials = Q.specials(s);
      content = [E('div', { class: 'qt-list' }, specials.concat(list).map(function (qu) { return card(qu, again); }))];
    }
    var body = E('div', { class: 'qt-body' }, (ctx.say || []).map(function (m) { return speaker(m.face, m.name, m.lines); }).concat([
      girl, tabs,
      E('p', { class: 'shop-gold' }, [E('span', { rich: T.gold }), E('strong', { text: U.fmt(FF.shop.gold(s)) + ' G' })])
    ], content, [E('p', { class: 'shop-note', rich: T.note })]));
    closeBoard = U.modal({ title: T.title, body: body, buttons: [{ label: U.T('back'), class: 'ghost' }] });
  }

  FF.ui.openTavern = function () { tab = 'board'; open(); };
  FF.ui.keeperBox = keeperBox;
  FF.ui.residentFace = face;   // 住民の顔（夜の防衛戦の応援でも使う。判断456）
})(this);
