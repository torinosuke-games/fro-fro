// 効果音（正解の音。判断259）。音のファイルは使わず、Web Audio API で鳴らす（file:// でも動く。外部ライブラリなし）。
// 設定の「こうかおん」（state.settings.sound。ない・知らない値は true）がオフのときは鳴らさない。
(function (root) {
  'use strict';
  var FF = root.FF;
  var ctx = null;

  function enabled() {
    var s = FF.app && FF.app.state;
    return !(s && s.settings && s.settings.sound === false);
  }
  function context() {
    if (ctx) return ctx;
    var AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { ctx = null; }
    return ctx;
  }
  // スマホのブラウザは、画面をさわったあとでないと音を出せない。最初のタッチで用意しておく
  function unlock() {
    var c = context();
    if (c && c.state === 'suspended' && c.resume) { try { c.resume(); } catch (e) { /* 鳴らせないだけ */ } }
  }
  function tone(c, freq, start, dur, vol) {
    var o = c.createOscillator(), g = c.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol, start + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(c.destination);
    o.start(start); o.stop(start + dur + 0.03);
  }
  // 正解：明るい「ピンポン」（上がっていく3つの音）
  function correct() {
    if (!enabled()) return;
    var c = context();
    if (!c) return;
    unlock();
    var t = c.currentTime + 0.02;
    tone(c, 784, t, 0.16, 0.16);          // ソ
    tone(c, 1047, t + 0.1, 0.16, 0.16);   // ド
    tone(c, 1319, t + 0.2, 0.34, 0.14);   // ミ
  }

  ['pointerdown', 'touchstart', 'keydown'].forEach(function (name) {
    if (root.document) root.document.addEventListener(name, function () { if (enabled()) unlock(); }, { passive: true });
  });

  FF.sound = { enabled: enabled, correct: correct, unlock: unlock };
})(this);
