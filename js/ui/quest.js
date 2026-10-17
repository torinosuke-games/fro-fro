// 酒場の画面（住民の依頼クエスト。判断434・436）：看板娘が、今日の依頼を紹介する。受ける・渡す・報告する。
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

  // 話し手（顔の絵と吹き出し）。酒場の看板娘・武器屋／防具屋／道具屋の店主で共通（判断439）。絵は img/art/npc-<名前>-face.webp
  function speaker(face, name, lines, extra) {
    return E('div', { class: 'qt-girl', attrs: { 'data-speaker': face } }, [
      U.artImg('npc-' + face + '-face.webp', 'qt-portrait'),
      E('div', { class: 'qt-bubble' }, [E('strong', { class: 'qt-speaker', rich: name })].concat(lines.map(function (t) { return E('p', { rich: t }); })).concat(extra || []))
    ]);
  }
  // 店主のあいさつ。mood：'greet'｜'bought'｜'poor'
  function keeperBox(kind, mood) {
    var k = T.keeper[kind], lines = k[mood] || k.greet;
    return speaker(kind, k.speaker, lines);
  }

  function card(qu, again) {
    var a = FF.app, s = a.state, done = Q.done(qu), act;
    if (qu.claimed) act = E('span', { class: 'qt-state is-claimed', rich: T.claimed });
    else if (!qu.accepted) act = E('button', { class: 'rn-button primary shop-btn qt-btn', attrs: { type: 'button', 'data-act': 'accept' }, rich: T.accept, on: { click: function () { var r = Q.accept(a.state, qu.id); if (r.ok) { a.commit(r.state); U.toast(T.toastAccept); again(); } } } });
    else if (done) act = E('button', { class: 'rn-button primary shop-btn qt-btn', attrs: { type: 'button', 'data-act': 'claim' }, rich: T.claim, on: { click: function () { var r = Q.claim(a.state, qu.id); if (r.ok) { a.commit(r.state); U.toast(T.toastClaim + ' ' + rewardText(r.reward)); again(); } } } });
    else if (qu.kind === 'deliver') {
      var can = Q.canDeliver(s, qu.id).ok;
      act = E('button', { class: 'rn-button primary shop-btn qt-btn', attrs: { type: 'button', 'data-act': 'deliver', disabled: can ? null : 'true' }, rich: T.deliverBtn, on: { click: function () { var r = Q.deliver(a.state, qu.id); if (r.ok) { a.commit(r.state); again(); } } } });
    } else act = E('span', { class: 'qt-state', rich: T.accepted });
    var pct = Math.round(100 * qu.progress / qu.need);
    return E('div', { class: 'qt-card' + (qu.claimed ? ' is-claimed' : '') + (qu.accepted && !qu.claimed ? ' is-accepted' : ''), attrs: { 'data-quest': qu.id, 'data-kind': qu.kind } }, [
      E('div', { class: 'qt-head' }, [E('span', { class: 'qt-kind', rich: T.kind[qu.kind] }), E('strong', { class: 'qt-who', rich: whoName(qu.who) })]),
      E('p', { class: 'qt-ask', rich: askText(qu) }),
      rewardView(qu.reward),
      qu.accepted ? E('div', { class: 'qt-progress', attrs: { role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(qu.need), 'aria-valuenow': String(qu.progress) } }, [
        E('span', { class: 'qt-bar' }, [E('i', { attrs: { style: 'width:' + pct + '%' } })]), E('span', { class: 'qt-count', rich: T.progress.replace('{have}', qu.progress).replace('{need}', qu.need) })]) : null,
      E('div', { class: 'qt-act' }, [act])
    ]);
  }

  function open() {
    var a = FF.app;
    if (closeBoard) { closeBoard(); closeBoard = null; }
    var fresh = Q.today(a.state, a.now());
    if (fresh !== a.state) a.commit(fresh);
    var s = a.state, list = s.quests.board, again = function () { open(); };
    var line = Q.remaining(s) ? T.greet : [T.greetDone];
    var girl = speaker('tavern', T.speaker, line, Q.remaining(s) ? [E('p', { class: 'qt-intro', rich: T.intro.replace('{n}', list.length) })] : []);
    var body = E('div', { class: 'qt-body' }, [
      girl,
      E('p', { class: 'shop-gold' }, [E('span', { rich: T.gold }), E('strong', { text: U.fmt(FF.shop.gold(s)) + ' G' })]),
      E('div', { class: 'qt-list' }, list.map(function (qu) { return card(qu, again); })),
      E('p', { class: 'shop-note', rich: T.note })
    ]);
    closeBoard = U.modal({ title: T.title, body: body, buttons: [{ label: U.T('back'), class: 'ghost' }] });
  }

  FF.ui.openTavern = open;
  FF.ui.keeperBox = keeperBox;
})(this);
