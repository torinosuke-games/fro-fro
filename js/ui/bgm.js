// BGM（判断411・412）。画面によって、曲を切りかえて、ループで流す：
//   町のメイン画面（base）…… audio/bgm-town.ogg
//   雪原のフィールド（adventure で、戦闘中でないとき）…… audio/bgm-field.ogg
//   戦闘中（adventure で、戦闘が始まっているあいだ）…… audio/bgm-battle.ogg（戦闘が始まるたびに、最初から。判断416）
//   戦闘に勝ったとき（battle.phase が win）…… audio/bgm-victory.mp3 を、単発で（ループなし）。そのあと、戦闘の画面にいるあいだは無音。勝つたびに、最初から。
// ほかの画面・タブを隠したときは、止める。設定の「町の音楽（BGM）」（state.settings.bgm。ない・知らない値は true）と
// 「音楽の大きさ」（bgmVolume：low／mid／high）は、どの曲も同じ。ブラウザは、画面をさわるまで音を出せないので、止められたときは、最初の操作のあとに鳴らす。
// 出る・消えるときは、少しずつ大きく・小さく。ogg が使えない端末（古い Safari）のために、同じ曲の .mp4（AAC）を代わりに読む。
(function (root) {
  'use strict';
  var FF = root.FF, doc = root.document;
  var VOLUMES = { low: 0.12, mid: 0.28, high: 0.5 };
  var TRACKS = { town: 'audio/bgm-town', field: 'audio/bgm-field', battle: 'audio/bgm-battle' };
  var RESTART = { field: true, battle: true };   // 止めたあと、また流すときは、曲の最初から（戦闘から戻ったとき。判断413）。町の曲は、続きから（ただし、フィールドから町へ移ったときは、最初から。判断415）
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
    if (FF.app.screen === 'adventure') return a && a.battle ? (a.battle.phase === 'win' ? null : 'battle') : 'field';   // 勝ったあとは、戦闘の曲を止めて、無音（勝利の音を鳴らす。判断417）
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
    t.fromField = false;
    var p = t.audio.play();
    t.blocked = false;
    if (p && p.then) p.then(function () { if (t.want) ramp(t, target()); }, function () { t.blocked = true; });
    else ramp(t, target());
  }
  function stop(name, t) {
    if (t.audio.paused) { if (t.fromField) { t.audio.currentTime = 0; t.fromField = false; } return; }
    ramp(t, 0, function () {
      if (t.want) return;
      t.audio.pause();
      if (RESTART[name] || t.fromField) { t.audio.currentTime = 0; t.fromField = false; }
    });
  }
  // 勝利の音（単発）。戦闘に勝つたびに、最初から鳴らす。戦闘の画面を出る・タブを隠す・設定オフで止める
  var jingle = null, jingleDone = false;
  function winning() {
    var a = FF.app && FF.app.state && FF.app.state.adventure;
    return !!(FF.app && FF.app.screen === 'adventure' && a && a.battle && a.battle.phase === 'win');
  }
  function syncJingle() {
    var w = winning();
    if (w && enabled() && !(doc && doc.hidden)) {
      if (!jingleDone && root.Audio) {
        if (!jingle) { jingle = new root.Audio(); jingle.preload = 'auto'; jingle.loop = false; jingle.src = 'audio/bgm-victory.mp3'; }
        jingle.currentTime = 0; jingle.volume = target();
        var p = jingle.play(); if (p && p.catch) p.catch(function () {});
        jingleDone = true;
      }
    } else if (jingle && !jingle.paused) jingle.pause();
    if (!w) jingleDone = false;   // 勝利の画面を出たら、次に勝つとき、また鳴らす
  }
  // 画面・設定が変わるたびに呼ぶ
  function sync() {
    syncJingle();
    var w = wanted();
    Object.keys(TRACKS).forEach(function (name) {
      var t = name === w ? track(name) : tracks[name];
      if (!t) return;
      var was = t.want;
      t.want = name === w;
      if (t.want && !was && name === 'battle') t.audio.currentTime = 0;   // 戦闘が始まるたびに、最初から（判断416）
      if (name === 'town' && w === 'field') t.fromField = true;   // フィールドへ移ったら、町の曲は、止めたあと最初に戻す（判断415）
      if (t.want) {
        if (t.audio.paused) { if (!t.blocked) start(t); }
        else ramp(t, target());
      } else stop(name, t);
    });
  }
  // 最初の操作（ブラウザが、音を許すとき）に、止められていた BGM を鳴らす
  ['pointerdown', 'touchstart', 'keydown'].forEach(function (name) {
    if (doc) doc.addEventListener(name, function () {
      Object.keys(tracks).forEach(function (n) { var t = tracks[n]; if (t.blocked && t.want) start(t); });
    }, { passive: true });
  });
  if (doc) doc.addEventListener('visibilitychange', sync);

  FF.bgm = { sync: sync, enabled: enabled, volumes: VOLUMES, wanted: wanted, jingle: function () { return jingle; }, audio: function (name) { var t = tracks[name || 'town']; return t ? t.audio : null; } };
})(this);
