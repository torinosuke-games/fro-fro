// BGM（判断411・412）。画面によって、曲を切りかえて、ループで流す：
//   町のメイン画面（base）…… audio/bgm-town.ogg
//   雪原のフィールド（adventure で、戦闘中でないとき）…… audio/bgm-field.ogg
// ほかの画面・戦闘中・タブを隠したときは、止める。設定の「町の音楽（BGM）」（state.settings.bgm。ない・知らない値は true）と
// 「音楽の大きさ」（bgmVolume：low／mid／high）は、どの曲も同じ。ブラウザは、画面をさわるまで音を出せないので、止められたときは、最初の操作のあとに鳴らす。
// 出る・消えるときは、少しずつ大きく・小さく。ogg が使えない端末（古い Safari）のために、同じ曲の .mp4（AAC）を代わりに読む。
(function (root) {
  'use strict';
  var FF = root.FF, doc = root.document;
  var VOLUMES = { low: 0.12, mid: 0.28, high: 0.5 };
  var TRACKS = { town: 'audio/bgm-town', field: 'audio/bgm-field' };
  var tracks = {};   // 曲の名前 → { audio, fade, want, blocked }

  function settings() { var s = FF.app && FF.app.state; return (s && s.settings) || {}; }
  function enabled() { return settings().bgm !== false; }
  function volumeId() { var v = settings().bgmVolume; return VOLUMES[v] ? v : 'mid'; }
  function target() { return VOLUMES[volumeId()]; }

  // いま流す曲（なければ null）
  function wanted() {
    if (!enabled() || (doc && doc.hidden) || !FF.app) return null;
    if (FF.app.screen === 'base') return 'town';
    var a = FF.app.state && FF.app.state.adventure;
    if (FF.app.screen === 'adventure' && !(a && a.battle)) return 'field';
    return null;
  }
  function track(name) {
    if (tracks[name] || !root.Audio) return tracks[name];
    var a = new root.Audio();
    a.loop = true; a.preload = 'auto'; a.volume = 0;
    var ogg = a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"');
    a.src = TRACKS[name] + (ogg ? '.ogg' : '.mp4');
    return (tracks[name] = { audio: a, fade: null, want: false, blocked: false });
  }
  function ramp(t, to, done) {
    if (t.fade) { root.clearInterval(t.fade); t.fade = null; }
    var a = t.audio;
    t.fade = root.setInterval(function () {
      var d = to - a.volume;
      if (Math.abs(d) < 0.02) { a.volume = to; root.clearInterval(t.fade); t.fade = null; if (done) done(); return; }
      a.volume = Math.max(0, Math.min(1, a.volume + (d > 0 ? 0.02 : -0.03)));
    }, 40);
  }
  function start(t) {
    var p = t.audio.play();
    t.blocked = false;
    if (p && p.then) p.then(function () { if (t.want) ramp(t, target()); }, function () { t.blocked = true; });
    else ramp(t, target());
  }
  function stop(t) {
    if (t.audio.paused) return;
    ramp(t, 0, function () { if (!t.want) t.audio.pause(); });
  }
  // 画面・設定が変わるたびに呼ぶ
  function sync() {
    var w = wanted();
    Object.keys(TRACKS).forEach(function (name) {
      var t = name === w ? track(name) : tracks[name];
      if (!t) return;
      t.want = name === w;
      if (t.want) {
        if (t.audio.paused) { if (!t.blocked) start(t); }
        else ramp(t, target());
      } else stop(t);
    });
  }
  // 最初の操作（ブラウザが、音を許すとき）に、止められていた BGM を鳴らす
  ['pointerdown', 'touchstart', 'keydown'].forEach(function (name) {
    if (doc) doc.addEventListener(name, function () {
      Object.keys(tracks).forEach(function (n) { var t = tracks[n]; if (t.blocked && t.want) start(t); });
    }, { passive: true });
  });
  if (doc) doc.addEventListener('visibilitychange', sync);

  FF.bgm = { sync: sync, enabled: enabled, volumes: VOLUMES, wanted: wanted, audio: function (name) { var t = tracks[name || 'town']; return t ? t.audio : null; } };
})(this);
