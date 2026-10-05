// 効果音（正解の音。判断259・262）。音のファイルは使わず、Web Audio API で鳴らす（file:// でも動く。外部ライブラリなし）。
// 設定の「正解の音」（state.settings.sound。ない・知らない値は true）がオフのときは鳴らさない。
// 音の種類は state.settings.soundStyle（FF.defs.SOUND_STYLES のどれか）。
(function (root) {
  'use strict';
  var FF = root.FF;
  var ctx = null;

  function enabled() {
    var s = FF.app && FF.app.state;
    return !(s && s.settings && s.settings.sound === false);
  }
  function styleId() {
    var s = FF.app && FF.app.state, id = s && s.settings && s.settings.soundStyle;
    return FF.defs.SOUND_STYLES.some(function (x) { return x.id === id; }) ? id : 'bright';
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
  // 1つの音：type 波形、freq 高さ（Hz）、start 開始、dur 長さ（秒）、vol 音量、opt.slide 終わりの高さ
  function tone(c, type, freq, start, dur, vol, opt) {
    var o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, start);
    if (opt && opt.slide) o.frequency.exponentialRampToValueAtTime(opt.slide, start + dur);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol, start + ((opt && opt.attack) || 0.012));
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(c.destination);
    o.start(start); o.stop(start + dur + 0.03);
  }

  var STYLES = {
    // あかるい3音：ソ・ド・ミと上がる
    bright: function (c, t) {
      tone(c, 'triangle', 784, t, 0.16, 0.16);
      tone(c, 'triangle', 1047, t + 0.1, 0.16, 0.16);
      tone(c, 'triangle', 1319, t + 0.2, 0.34, 0.14);
    },
    // ぴんぽーん：よくある、高い「ぴん」と、少し低く長い「ぽーん」（ベルのように、あとに余韻が残る）
    pinpon: function (c, t) {
      tone(c, 'sine', 1175, t, 0.22, 0.2);
      tone(c, 'sine', 2350, t, 0.1, 0.04);
      tone(c, 'sine', 880, t + 0.2, 0.75, 0.2, { attack: 0.01 });
      tone(c, 'sine', 1760, t + 0.2, 0.35, 0.05);
    },
    // ぴこん：かわいい、短い2音
    piko: function (c, t) {
      tone(c, 'sine', 988, t, 0.09, 0.2);
      tone(c, 'sine', 1480, t + 0.08, 0.22, 0.2, { slide: 1560 });
    },
    // きらきら：高い音が、さらさらと上がっていく
    sparkle: function (c, t) {
      [1047, 1319, 1568, 2093, 2637].forEach(function (f, i) {
        tone(c, 'sine', f, t + i * 0.06, 0.28, 0.1);
        tone(c, 'sine', f * 2, t + i * 0.06, 0.12, 0.025);
      });
    },
    // コイン：昔のゲームのような、四角い波の「ピロリン」
    coin: function (c, t) {
      tone(c, 'square', 988, t, 0.07, 0.07);
      tone(c, 'square', 1319, t + 0.07, 0.4, 0.07);
    },
    // ベル：「チーン」と、長くのびる金属の音
    bell: function (c, t) {
      [[1, 0.2, 1.1], [2.76, 0.09, 0.7], [5.4, 0.05, 0.45], [8.93, 0.025, 0.3]].forEach(function (p) {
        tone(c, 'sine', 784 * p[0], t, p[2], p[1], { attack: 0.004 });
      });
    }
  };

  // style を省くと、設定の種類。enabled を見ない（設定画面で、選んだ音を聞かせるときにも使う）
  function play(style) {
    var c = context();
    if (!c) return;
    unlock();
    (STYLES[style || styleId()] || STYLES.bright)(c, c.currentTime + 0.02);
  }
  // 正解の音（設定がオフなら鳴らさない）
  function correct() {
    if (enabled()) play();
  }

  ['pointerdown', 'touchstart', 'keydown'].forEach(function (name) {
    if (root.document) root.document.addEventListener(name, function () { if (enabled()) unlock(); }, { passive: true });
  });

  FF.sound = { enabled: enabled, correct: correct, play: play, unlock: unlock };
})(this);
