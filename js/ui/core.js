// 画面の共通部品：DOM の組み立て、ふりがな付きテキスト、ヘッダー、ナビ、画面の切り替え、モーダル、トースト。
// 文字の表示は必ず textContent（または DOM ノードの組み立て）で行い、innerHTML は使わない（SPEC 3.2）。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  var doc = root.document;
  var SVG_NS = 'http://www.w3.org/2000/svg';

  // ---- DOM の組み立て ----
  // el('button', { class: 'btn', text: '...', on: { click: fn }, attrs: {...} }, [子])
  function el(tag, opts, children) {
    var node = doc.createElement(tag);
    applyOpts(node, opts || {});
    append(node, children);
    return node;
  }
  function svg(tag, attrs, children) {
    var node = doc.createElementNS(SVG_NS, tag);
    for (var k in (attrs || {})) if (attrs[k] !== undefined && attrs[k] !== null) node.setAttribute(k, attrs[k]);
    append(node, children);
    return node;
  }
  function applyOpts(node, o) {
    if (o.class) node.className = o.class;
    if (o.text !== undefined) node.textContent = String(o.text);
    if (o.rich !== undefined) { var span = doc.createElement('span'); span.appendChild(rich(o.rich, o.vars)); node.appendChild(span); }
    if (o.attrs) for (var k in o.attrs) if (o.attrs[k] !== undefined && o.attrs[k] !== null && o.attrs[k] !== false) node.setAttribute(k, o.attrs[k] === true ? '' : o.attrs[k]);
    if (o.on) for (var ev in o.on) node.addEventListener(ev, o.on[ev]);
    if (o.style) for (var s in o.style) node.style[s] = o.style[s];
    if (o.disabled) node.disabled = true;
    if (o.value !== undefined) node.value = o.value;
  }
  function append(node, children) {
    if (children === undefined || children === null) return;
    if (!Array.isArray(children)) children = [children];
    children.forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' || typeof c === 'number' ? doc.createTextNode(String(c)) : c);
    });
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  // ---- ふりがな付きテキスト ----
  // template の {name} などは vars の値を文字としてそのまま入れる。ふりがなオンなら辞書で <ruby> を付ける。
  function furiganaOn() { return !!(FF.app && FF.app.state && FF.app.state.settings.furigana); }
  function rich(template, vars) {
    var frag = doc.createDocumentFragment();
    var src = furiganaOn() ? FF.util.autoRubyMarkup(template) : String(template);
    FF.util.parseRichText(src, vars || {}).forEach(function (t) {
      if (t.text !== undefined) {
        frag.appendChild(doc.createTextNode(t.text));
      } else if (furiganaOn()) {
        var r = doc.createElement('ruby');
        r.appendChild(doc.createTextNode(t.ruby));
        var rt = doc.createElement('rt');
        rt.textContent = t.rt;
        r.appendChild(rt);
        frag.appendChild(r);
      } else {
        frag.appendChild(doc.createTextNode(t.ruby));
      }
    });
    return frag;
  }
  // rich の短縮：el(tag, { class }, rich(...)) を1行で
  function R(tag, cls, template, vars) { return el(tag, { class: cls, rich: template, vars: vars }); }
  // ふりがなを付けない文字列（ボタンの aria-label やトーストなど）
  function plain(template, vars) { return FF.util.plainText(template, vars || {}); }

  function T(path) {
    var v = FF.texts;
    path.split('.').forEach(function (k) { v = v == null ? v : v[k]; });
    return v == null ? path : v;
  }

  function fmt(n) { return Math.floor(n).toLocaleString('ja-JP'); }
  function resDef(id) { return FF.defs.RESOURCES.filter(function (r) { return r.id === id; })[0]; }
  function buildingName(id) { return FF.buildings.defOf(id).name; }
  function nameOf(list, id) { var d = list.filter(function (x) { return x.id === id; })[0]; return d ? d.name : id; }

  // 資源の量の並び（コスト表示など）。have を渡すと不足分を赤くする
  function costView(cost, have) {
    return el('div', { class: 'cost' }, Object.keys(cost).map(function (r) {
      var d = resDef(r);
      var short = have && (have[r] || 0) < cost[r];
      return el('span', { class: 'item' + (short ? ' short' : '') }, [d.icon + ' ', R('span', '', d.name), ' ' + fmt(cost[r])]);
    }));
  }

  // ---- トースト・モーダル ----
  var toastTimer = null;
  function toast(message, vars) {
    var old = doc.querySelector('.toast');
    if (old) old.remove();
    var t = el('div', { class: 'toast', attrs: { role: 'status' } }, rich(message, vars));
    doc.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.remove(); }, 2600);
  }

  // opts: { title, body: Node | string, vars, buttons: [{ label, class, onClick, keepOpen }], dismissible }
  function modal(opts) {
    var overlay = el('div', { class: 'overlay', attrs: { role: 'dialog', 'aria-modal': 'true' } });
    function close() { overlay.remove(); doc.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape' && opts.dismissible !== false) close(); }
    var body = typeof opts.body === 'string' ? R('div', 'pre', opts.body, opts.vars) : opts.body;
    var box = el('div', { class: 'modal' }, [
      opts.title ? R('h2', '', opts.title, opts.vars) : null,
      body,
      el('div', { class: 'actions' }, (opts.buttons || [{ label: T('ok'), class: 'primary' }]).map(function (b) {
        return el('button', {
          class: 'btn ' + (b.class || ''), rich: b.label,
          on: { click: function () { if (!b.keepOpen) close(); if (b.onClick) b.onClick(close); } }
        });
      }))
    ]);
    overlay.appendChild(box);
    overlay.addEventListener('click', function (e) { if (e.target === overlay && opts.dismissible !== false) close(); });
    doc.addEventListener('keydown', onKey);
    doc.body.appendChild(overlay);
    var first = box.querySelector('.actions .btn.primary') || box.querySelector('.actions .btn');
    if (first) first.focus();
    return close;
  }

  // ---- ヘッダー（資源とチケット） ----
  function renderHud() {
    var hud = doc.getElementById('hud');
    if (!hud || !FF.app.state) return;
    var s = FF.app.state, now = FF.app.now();
    hud.hidden = FF.app.screen === 'title';
    clear(hud);
    // 学習の「学ぶ」（選択画面）では、資源の所持数の行を出さない（縦の長さを減らすため。チケットの行は出す）
    var hideRes = FF.app.screen === 'study' && FF.app.studyTab === 'learn';
    hud.classList.toggle('compact', hideRes);   // チケットの行だけのときは上下を詰める
    if (!hideRes) hud.appendChild(el('div', { class: 'hud-res' }, FF.defs.RESOURCES.map(function (r) {
      return el('div', { class: 'res-chip', attrs: { title: r.name } }, [el('span', { class: 'ico', text: r.icon }), fmt(s.resources[r.id] || 0)]);
    })));
    var t = FF.tickets.recoverTickets(s.tickets, now);
    var next = FF.tickets.msUntilNext(t, now);
    var max = FF.balance.TICKET_MAX;
    hud.appendChild(el('div', { class: 'hud-tickets' }, [
      el('span', {}, [R('span', '', T('tickets')), ' ', el('span', { class: 'count', text: t.count + ' / ' + max })]),
      el('span', { class: 'ticket-bar' }, el('i', { style: { width: Math.min(100, t.count / max * 100) + '%' } })),
      el('span', { class: 'timer' }, next === null ? R('span', '', T('ticketsFull')) : [R('span', '', T('ticketsNext')), ' ' + FF.util.formatCountdown(next)])
    ]));
  }

  // ---- ナビ ----
  var NAV = [
    { id: 'base', icon: '🏠' }, { id: 'explore', icon: '🗺️', locked: function (s) { return !FF.exploration.isExploreOpen(s); }, lockedText: 'explore.navLocked' }, { id: 'battle', icon: '⚔️', locked: true },
    { id: 'allies', icon: '👥', locked: true }, { id: 'study', icon: '📖' }, { id: 'settings', icon: '⚙️' }
  ];
  function navGroup(screen) {
    if (screen === 'exam' || screen === 'diagnosis' || screen === 'quiz') return 'study';
    if (screen === 'debug') return 'settings';
    if (screen === 'exploreQuiz') return 'explore';
    return screen;
  }
  function renderNav() {
    var nav = doc.getElementById('nav');
    if (!nav) return;
    nav.hidden = FF.app.screen === 'title';
    clear(nav);
    var active = navGroup(FF.app.screen);
    nav.appendChild(el('div', { class: 'inner' }, NAV.map(function (n) {
      // locked は true か、状態から決める関数（探索は中央炉 Lv3 で開く）
      var locked = typeof n.locked === 'function' ? n.locked(FF.app.state) : !!n.locked;
      return el('button', {
        class: (n.id === active ? 'active' : '') + (locked ? ' locked' : ''),
        attrs: { 'aria-label': plain(T('nav.' + n.id)), 'aria-disabled': locked ? 'true' : null, 'aria-current': n.id === active ? 'page' : null },
        on: { click: function () { if (locked) toast(T(n.lockedText || 'navLocked')); else show(n.id); } }
      }, [el('span', { class: 'ico', text: n.icon }), R('span', '', T('nav.' + n.id))]);
    })));
  }

  // ---- 昼／夜テーマ（SPEC_theme.md） ----
  // 昼の見た目を持つ画面。デバッグ画面は対象外で、常に夜。
  var THEMED_SCREENS = ['title', 'base', 'study', 'quiz', 'exam', 'settings', 'explore', 'exploreQuiz', 'battle'];
  // 「自動」の判定に使う時刻：実際の端末の時計（FF.clock は使わない）。デバッグ画面で時だけ指定できる
  function themeNow() {
    var d = new Date();
    if (FF.app.themeHourOverride != null) d.setHours(FF.app.themeHourOverride, 0, 0, 0);
    return d;
  }
  function currentTheme() {
    if (!FF.app.state || THEMED_SCREENS.indexOf(FF.app.screen) < 0) return 'night';
    return FF.theme.resolve(FF.app.state.settings.themeMode, themeNow());
  }
  function applyTheme() {
    var t = currentTheme();
    FF.app.theme = t;
    if (doc.documentElement.getAttribute('data-theme') !== t) doc.documentElement.setAttribute('data-theme', t);
    return t;
  }

  // ---- 画面の切り替え ----
  var screens = {};
  function show(name, params) {
    if (FF.app.leaveGuard && !FF.app.leaveGuard(name)) return;
    FF.app.leaveGuard = null;
    FF.app.screen = name;
    FF.app.params = params || {};
    rerender();
    root.scrollTo(0, 0);
  }
  function rerender() {
    applyTheme();
    var main = doc.getElementById('screen');
    doc.body.classList.remove('typing');   // 入力欄ごと描き直すと blur が来ないことがあるため
    clear(main);
    var sc = screens[FF.app.screen];
    if (sc) sc.render(main, FF.app.params || {});
    renderHud();
    renderNav();
  }
  function tick() {
    // 「自動」で昼と夜の境目をまたいだら描き直す
    if (currentTheme() !== FF.app.theme) { rerender(); return; }
    renderHud();
    var sc = screens[FF.app.screen];
    if (sc && sc.onTick) sc.onTick();
  }

  // ---- 算数の自由入力のテンキー（SPEC_v0.3 2章） ----
  // 押した文字を入力欄の末尾に足す（入力欄はそのままキーボードでも打てる）。「けす」は末尾の1文字を消す。
  var NUMPAD_KEYS = ['7', '8', '9', '/', '4', '5', '6', '-', '1', '2', '3', '.', '0'];
  function usesNumpad(q) { return !!q && q.subject === 'math' && q.answerType === 'input'; }
  function numpad(input) {
    var keys = NUMPAD_KEYS.map(function (k) {
      var sym = /[^0-9]/.test(k);
      return el('button', {
        class: 'numpad-key' + (sym ? ' sym' : '') + (k === '0' ? ' wide' : ''),
        text: k === '-' ? '−' : k,
        attrs: { type: 'button', 'aria-label': k === '-' ? plain(T('numpad.minus')) : k === '/' ? plain(T('numpad.slash')) : k === '.' ? plain(T('numpad.dot')) : k },
        on: { click: function () { input.value += k; } }
      });
    });
    keys.push(el('button', {
      class: 'numpad-key del wide', rich: T('numpad.del'),
      attrs: { type: 'button', 'aria-label': plain(T('numpad.delLabel')) },
      on: { click: function () { input.value = Array.from(input.value).slice(0, -1).join(''); } }
    }));
    return el('div', { class: 'numpad', attrs: { role: 'group', 'aria-label': plain(T('numpad.label')) } }, keys);
  }
  // 書き問題の欄に自動でフォーカスしてよいか。タッチ操作の端末（スマートフォンなど）では、どの問題でも自動ではフォーカスしない
  // （キーボードが勝手に開いて問題文やヒント・テンキーを隠すため）。PC は従来どおり自動でフォーカスする。
  function isTouch() { return !!(root.matchMedia && root.matchMedia('(pointer: coarse)').matches); }
  function autoFocusOK(q) { return !isTouch(); }

  // 書き問題の欄をタップしてフォーカスが当たったら、キーボードが開いたあとの見えている範囲（visualViewport）に
  // 問題文と入力欄が入るようにスクロールする。問題文の上端を上のヘッダーのすぐ下に合わせ、
  // 入らないときは入力欄の下端を見えている範囲の下端に合わせる。見た目（入力欄・ボタン）は変えない。
  // 入力中（フォーカスがある間）は、画面の下に固定したナビと出題の固定バーを隠す（body.typing）。
  // キーボードで画面が縮む端末では、それらがキーボードの上に出て問題文の場所を取るため。フォーカスが外れたら戻す。
  function keepInView(input) {
    if (!isTouch()) return;
    var timer = null;
    function align() {
      if (doc.activeElement !== input) return;
      var vv = root.visualViewport;
      var visTop = vv ? vv.offsetTop : 0, visBottom = vv ? vv.offsetTop + vv.height : root.innerHeight;
      var hud = doc.getElementById('hud');
      if (hud && !hud.hidden) visTop += hud.getBoundingClientRect().height;
      // 画面の下に固定しているもの（出題の固定バー・ナビ）が見えている範囲にかかっていれば、その上までを使う
      Array.prototype.forEach.call(doc.querySelectorAll('.quiz-footer, nav.tabs'), function (f) {
        var r = f.getBoundingClientRect();
        if (r.height && r.top < visBottom && r.bottom > visTop) visBottom = Math.min(visBottom, r.top);
      });
      var panel = input.closest ? input.closest('.panel') : null;
      var qEl = (panel && panel.querySelector('.question')) || doc.querySelector('.question');
      var row = input.parentNode || input;
      var top = (qEl || row).getBoundingClientRect().top, bottom = row.getBoundingClientRect().bottom;
      var delta = top - (visTop + 8);
      if (bottom - delta > visBottom - 8) delta = bottom - (visBottom - 8);
      if (Math.abs(delta) > 2) root.scrollBy(0, delta);
    }
    function schedule() { clearTimeout(timer); timer = setTimeout(align, 60); }
    input.addEventListener('focus', function () {
      doc.body.classList.add('typing');
      schedule();
      setTimeout(align, 400);   // visualViewport がない・キーボードの大きさが変わらない端末のため
      if (root.visualViewport) root.visualViewport.addEventListener('resize', schedule);
    });
    input.addEventListener('blur', function () {
      doc.body.classList.remove('typing');
      clearTimeout(timer);
      if (root.visualViewport) root.visualViewport.removeEventListener('resize', schedule);
    });
  }

  FF.ui = {
    usesNumpad: usesNumpad, numpad: numpad, autoFocusOK: autoFocusOK, keepInView: keepInView,
    el: el, svg: svg, clear: clear, rich: rich, R: R, plain: plain, T: T, fmt: fmt,
    resDef: resDef, buildingName: buildingName, nameOf: nameOf, costView: costView,
    toast: toast, modal: modal, renderHud: renderHud, renderNav: renderNav,
    screens: screens, show: show, rerender: rerender, tick: tick,
    currentTheme: currentTheme, applyTheme: applyTheme
  };
})(this);
