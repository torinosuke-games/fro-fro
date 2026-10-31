// 画面いっぱいの表示（判断507）：アドレスバーを隠す全画面と、横向きの固定。
// ホーム画面に追加して開いたとき（PWA）は、もともとアドレスバーがない。ふつうのブラウザでは、全画面にすると隠れる。
// 向きの固定（screen.orientation.lock）は、全画面のときだけ効く。使えない端末（iPhone など）では、押すと案内を出す。
(function (root) {
  'use strict';
  var FF = root.FF, U = FF.ui, doc = root.document;
  var locked = false;

  var TEXT = {
    enter: '全画面で横向き', exit: '全画面をやめる',
    enterStandalone: '全画面で横向き', exitStandalone: '全画面をやめる',
    failed: 'この端末では、向きを固定できませんでした。画面の自動回転をオンにして、端末を横に持ってください。',
    help: 'アドレスバーを隠して、画面を広く使います。横向きに固定して、戦闘やフィールドを大きく見られます。'
  };

  function standalone() {
    try { return !!((root.matchMedia && root.matchMedia('(display-mode: standalone)').matches) || (root.navigator && root.navigator.standalone)); } catch (e) { return false; }
  }
  function canLock() { var o = root.screen && root.screen.orientation; return !!(o && typeof o.lock === 'function'); }
  function canFullscreen() { return !!(doc && doc.documentElement && doc.documentElement.requestFullscreen && doc.fullscreenEnabled); }
  // 向きを固定できる端末だけで使う（全画面にできない・向きも固定できない端末では、ボタンを出さない）
  // ボタンは、いつも出す（端末によって、向きの固定・全画面が使えるかは、押してみないと分からないため）。できなかったときは、案内を出す
  function supported() { return true; }
  function isOn() { return locked || !!(doc && doc.fullscreenElement); }

  function label() { return standalone() ? (isOn() ? TEXT.exitStandalone : TEXT.enterStandalone) : (isOn() ? TEXT.exit : TEXT.enter); }

  function release() {
    if (canLock()) { try { root.screen.orientation.unlock(); } catch (e) { /* 何もしない */ } }
    locked = false;
    if (doc && doc.fullscreenElement && doc.exitFullscreen) { try { doc.exitFullscreen().catch(function () {}); } catch (e) { /* 何もしない */ } }
  }
  function enter() {
    // Android の Chrome は、全画面のときだけ向きを固定できる（ホーム画面から開いたアプリでも同じ）。全画面にできなくても、固定を試す
    var ready = !canFullscreen() ? Promise.resolve() : doc.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(function () {});
    return Promise.resolve(ready).then(function () {
      if (!canLock()) throw new Error('nolock');
      return root.screen.orientation.lock('landscape').then(function () { locked = true; });
    }).catch(function () {
      // 向きを固定できなかった（全画面だけ入ったときは、そのまま全画面を続ける）
      locked = false;
      if (U.toast) U.toast(TEXT.failed);
    });
  }
  function toggle() { return isOn() ? (release(), Promise.resolve()) : enter(); }

  var buttons = [];
  function refresh() {
    buttons = buttons.filter(function (b) { return b.isConnected; });
    buttons.forEach(function (b) { b.textContent = label(); b.setAttribute('aria-pressed', isOn() ? 'true' : 'false'); });
  }
  // 画面に置くボタン。使えない端末では null を返す
  function button(cls) {
    if (!supported()) return null;
    var b = U.el('button', { class: cls || 'btn small', text: label(), attrs: { type: 'button', 'aria-pressed': isOn() ? 'true' : 'false' }, on: { click: function () { toggle().then(refresh); } } });
    buttons.push(b);
    return b;
  }

  if (doc) doc.addEventListener('fullscreenchange', function () { if (!doc.fullscreenElement) locked = false; refresh(); });

  // 冒険（フィールド・戦闘）から離れたら、向きの固定をやめる（学習や町は、縦向きで使うため）
  var origShow = U.show;
  U.show = function (name, params) {
    var before = FF.app && FF.app.screen;
    origShow(name, params);
    if (locked && before === 'adventure' && FF.app.screen !== 'adventure') { release(); refresh(); }
  };

  U.display = { supported: supported, standalone: standalone, isOn: isOn, toggle: toggle, button: button, release: release, text: TEXT };
})(this);
