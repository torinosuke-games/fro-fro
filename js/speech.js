// 英語の読み上げ（判断280。画面には触れないので js/ に置く）。音のファイルは使わず、ブラウザに入っている読み上げ機能（speechSynthesis）で声に出す
// （file:// でも動く。外部ライブラリ・fetch なし）。声の質は、端末によって少しちがう。
// 設定：state.settings.speech（オン・オフ。ない・知らない値はオン）、state.settings.speechRate（'slow'・'normal'・'fast'）。
(function (root) {
  'use strict';
  var FF = root.FF;
  var RATES = { slow: 0.7, normal: 0.85, fast: 1.0 };
  var voice = null, voicesLoaded = false;

  function supported() {
    return typeof root.speechSynthesis !== 'undefined' && typeof root.SpeechSynthesisUtterance !== 'undefined';
  }
  function settings() {
    var s = FF.app && FF.app.state;
    return (s && s.settings) || {};
  }
  function enabled() { return settings().speech !== false; }
  function rateId() {
    var id = settings().speechRate;
    return RATES[id] ? id : 'normal';
  }
  function rate() { return RATES[rateId()]; }

  // 英語の声をえらぶ：アメリカ英語で、自然な声（名前でわかるもの）を先に。なければ英語の声ならどれでも
  function pickVoice() {
    if (voice) return voice;
    var list = [];
    try { list = root.speechSynthesis.getVoices() || []; } catch (e) { list = []; }
    if (!list.length) return null;
    voicesLoaded = true;
    var en = list.filter(function (v) { return /^en[-_]US/i.test(v.lang); });
    var pool = en.length ? en : list.filter(function (v) { return /^en/i.test(v.lang); });
    var good = pool.filter(function (v) { return /Samantha|Google US|Aria|Jenny|Natural|Ava|Allison/i.test(v.name); });
    voice = (good[0] || pool[0]) || null;
    return voice;
  }
  if (supported() && root.speechSynthesis.addEventListener) {
    try { root.speechSynthesis.addEventListener('voiceschanged', function () { voice = null; pickVoice(); }); } catch (e) { /* 読み上げだけ使えない */ }
  }

  // 読み上げる英語（英字・数字・かんたんな記号だけの文字列）か
  var EN_ONLY = /^[A-Za-z0-9][A-Za-z0-9 ,.'’!?:;\-\/&"]*$/;
  function isEnglish(text) {
    return typeof text === 'string' && EN_ONLY.test(text.trim()) && /[A-Za-z]/.test(text) && text.indexOf('( )') < 0;
  }

  // 問題から、読み上げる英語を取り出す。q.listen（聞き取りの問題）→「…」の中の最初の英語。なければ ''
  function textFor(q) {
    if (!q || q.subject !== 'english') return '';
    if (q.listen) return String(q.listen);
    var m = String(q.question || '').match(/「([^」]+)」/g) || [];
    for (var i = 0; i < m.length; i++) {
      var t = m[i].slice(1, -1).replace(/\\'/g, "'");
      if (isEnglish(t)) return t;
    }
    return '';
  }
  // 答えが英語なら、答え合わせのあとで読み上げる
  function answerTextFor(q) {
    if (!q || q.subject !== 'english' || q.answerType !== 'choice' && q.answerType !== 'input') return '';
    return isEnglish(q.answer) ? String(q.answer) : '';
  }

  function stop() {
    if (!supported()) return;
    try { root.speechSynthesis.cancel(); } catch (e) { /* なにもしない */ }
  }
  // 読み上げる。始められたら true
  function speak(text) {
    if (!supported() || !text) return false;
    try {
      var u = new root.SpeechSynthesisUtterance(String(text).replace(/P\.E\./g, 'P E'));
      u.lang = 'en-US';
      var v = pickVoice();
      if (v) u.voice = v;
      u.rate = rate();
      u.pitch = 1;
      root.speechSynthesis.cancel();
      root.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  FF.speech = { RATES: RATES, supported: supported, enabled: enabled, rateId: rateId, rate: rate, isEnglish: isEnglish, textFor: textFor, answerTextFor: answerTextFor, speak: speak, stop: stop };
})(this);
