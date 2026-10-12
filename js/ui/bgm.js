// 町のBGM（判断411）。町のメインの画面（base）を開いているあいだだけ、audio/bgm-town.ogg をループで流す。
// 設定の「町の音楽」（state.settings.bgm。ない・知らない値は true）と「音の大きさ」（bgmVolume：low／mid／high）。
// ブラウザは、画面をさわるまで音を出せないので、最初の操作のあとに鳴らす。出る・消えるときは、少しずつ大きく・小さく。
// ogg が使えない端末（古い Safari）のために、audio/bgm-town.mp4 を代わりに読む。
(function (root) {
  'use strict';
  var FF = root.FF, doc = root.document;
  var VOLUMES = { low: 0.12, mid: 0.28, high: 0.5 };
  var audio = null, want = false, fade = null, blocked = false;

  function settings() { var s = FF.app && FF.app.state; return (s && s.settings) || {}; }
  function enabled() { return settings().bgm !== false; }
  function volumeId() { var v = settings().bgmVolume; return VOLUMES[v] ? v : 'mid'; }
  function target() { return VOLUMES[volumeId()]; }

  function make() {
    if (audio || !root.Audio) return audio;
    audio = new root.Audio();
    audio.loop = true; audio.preload = 'auto'; audio.volume = 0;
    var ogg = audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"');
    audio.src = ogg ? 'audio/bgm-town.ogg' : 'audio/bgm-town.mp4';
    return audio;
  }
  function ramp(to, done) {
    if (fade) { root.clearInterval(fade); fade = null; }
    var a = audio; if (!a) return;
    fade = root.setInterval(function () {
      var d = to - a.volume;
      if (Math.abs(d) < 0.02) { a.volume = to; root.clearInterval(fade); fade = null; if (done) done(); return; }
      a.volume = Math.max(0, Math.min(1, a.volume + (d > 0 ? 0.02 : -0.03)));
    }, 40);
  }
  function start() {
    var a = make(); if (!a) return;
    var p = a.play();
    blocked = false;
    if (p && p.then) p.then(function () { if (want) ramp(target()); }, function () { blocked = true; });
    else ramp(target());
  }
  function stop() {
    if (!audio || audio.paused) return;
    ramp(0, function () { if (!want && audio) audio.pause(); });
  }
  // 画面・設定が変わるたびに呼ぶ
  function sync() {
    want = !!(FF.app && FF.app.screen === 'base' && enabled() && !(doc && doc.hidden));
    if (want) {
      if (!audio || audio.paused) start();
      else ramp(target());
    } else stop();
  }
  // 最初の操作（ブラウザが、音を許すとき）に、止められていた BGM を鳴らす
  ['pointerdown', 'touchstart', 'keydown'].forEach(function (name) {
    if (doc) doc.addEventListener(name, function () { if (blocked && want) start(); }, { passive: true });
  });
  if (doc) doc.addEventListener('visibilitychange', sync);

  FF.bgm = { sync: sync, enabled: enabled, volumes: VOLUMES, audio: function () { return audio; } };
})(this);
