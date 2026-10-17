// 夜の防衛戦の効果音。Web Audio API のみ（file:// 対応）。
// index.html で FF 初期化後に読み込む。戦場から FF.towerSound.*() を呼ぶ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};
  var ctx = null, output = null, voices = 0;
  var last = Object.create(null);
  var MAX_VOICES = 24;

  function enabled() {
    var s = FF.app && FF.app.state;
    return !(s && s.settings && s.settings.sound === false);
  }

  function context() {
    if (ctx) return ctx;
    var AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return null;
    try {
      var c = new AC();
      var gain = c.createGain(), compressor = c.createDynamicsCompressor();
      // 控えめな共通音量と圧縮。連続攻撃でも音量が積み上がりすぎない。
      gain.gain.value = 0.5;
      compressor.threshold.value = -20;
      compressor.knee.value = 12;
      compressor.ratio.value = 12;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.12;
      gain.connect(compressor);
      compressor.connect(c.destination);
      ctx = c;
      output = gain;
    } catch (e) { return null; }
    return ctx;
  }

  // sound.js と同じ、最初のタッチ・キー入力で AudioContext を有効にする方式。
  function unlock() {
    if (!enabled()) return;
    var c = context();
    if (c && c.state === 'suspended' && c.resume) {
      try {
        var p = c.resume();
        if (p && p.catch) p.catch(function () { /* 再度の操作で試す */ });
      } catch (e) { /* 音が出せない環境でもゲームは続ける */ }
    }
  }

  function tone(c, type, freq, start, dur, vol, slide) {
    if (voices >= MAX_VOICES) return;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, start);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, start + dur);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol, start + Math.min(0.012, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g);
    g.connect(output);
    voices += 1;
    o.onended = function () {
      o.disconnect();
      g.disconnect();
      voices -= 1;
    };
    o.start(start);
    o.stop(start + dur + 0.02);
  }

  var sounds = {
    place: function (c, t) {
      tone(c, 'sine', 420, t, 0.12, 0.09, 240);
    },
    hit: function (c, t) {
      // 頻発するので、ごく短く小さく。
      tone(c, 'triangle', 820, t, 0.035, 0.025, 420);
    },
    kill: function (c, t) {
      tone(c, 'triangle', 520, t, 0.08, 0.065);
      tone(c, 'sine', 780, t + 0.055, 0.14, 0.055);
    },
    coreHit: function (c, t) {
      tone(c, 'sine', 105, t, 0.3, 0.12, 48);
      tone(c, 'triangle', 155, t, 0.16, 0.04, 70);
    },
    light: function (c, t) {
      tone(c, 'sine', 1047, t, 0.18, 0.06);
      tone(c, 'sine', 1568, t + 0.075, 0.26, 0.045);
    },
    win: function (c, t) {
      [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
        tone(c, 'triangle', f, t + i * 0.115, i === 3 ? 0.42 : 0.16, 0.075);
      });
      tone(c, 'sine', 523.25, t + 0.345, 0.42, 0.035);
    },
    lose: function (c, t) {
      [392, 329.63, 261.63].forEach(function (f, i) {
        tone(c, 'sine', f, t + i * 0.17, 0.3, 0.07);
      });
    },
    wave: function (c, t) {
      // やわらかい低いホルン。倍音を少量だけ重ねる。
      tone(c, 'triangle', 196, t, 0.38, 0.075);
      tone(c, 'sine', 392, t, 0.32, 0.025);
      tone(c, 'triangle', 246.94, t + 0.28, 0.42, 0.065);
    }
  };
  var intervals = { place: 0.08, hit: 0.06, kill: 0.08, coreHit: 0.18,
    light: 0.1, win: 1, lose: 1, wave: 0.7 };
  var api = {};
  Object.keys(sounds).forEach(function (name) {
    api[name] = function () {
      if (!enabled()) return;
      var c = context();
      if (!c) return;
      unlock();
      // ロック中の音は予約しない（解除した瞬間の一斉再生を防ぐ）。
      if (c.state !== 'running') return;
      var t = c.currentTime;
      if (last[name] !== undefined && t - last[name] < intervals[name]) return;
      last[name] = t;
      sounds[name](c, t + 0.01);
    };
  });
  ['pointerdown', 'touchstart', 'keydown'].forEach(function (name) {
    if (root.document) root.document.addEventListener(name, unlock, { passive: true });
  });
  FF.towerSound = api;
})(this);
