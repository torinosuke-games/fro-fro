// 勉強量ポイント（pt）と引換所（SPEC 8.4・14.2・14.4・14.5、DESIGN 第14章）。純粋関数のみ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function bal(b) { return b || FF.balance; }

  // ---- 獲得 pt ----
  // p は資源の rewardBreakdown と同じ形（grade, difficulty, answerType, hintsUsed, attempt, repeatCount, recent）。
  // 施設ボーナス・重点教科倍率・形式倍率はかけない（SPEC 8.4）。
  function pointsBreakdown(p, b) {
    b = bal(b);
    var R = FF.rewards;
    var m = {
      base: b.STUDY_POINTS.BASE[p.grade][p.difficulty],
      repeat: R.repeatMultiplier(p.repeatCount, b),
      hint: b.HINT_MULT[Math.min(p.hintsUsed || 0, b.HINT_MULT.length - 1)],
      attempt: p.answerType === 'input' ? b.ATTEMPT_MULT[p.attempt || 1] : 1,
      accuracy: R.accuracyMultiplier(p.recent, b)
    };
    var raw = m.base * m.repeat * m.hint * m.attempt * m.accuracy;
    // 浮動小数の誤差で切り捨てが1つずれないように補正する（rewards.js と同じ）
    m.total = Math.max(b.STUDY_POINTS.MIN, Math.floor(raw + 1e-9));
    return m;
  }

  function calcPoints(p, b) { return pointsBreakdown(p, b).total; }

  // 正解した pt を状態に足す（残高と累計）。state は呼び出し側で複製済みのものを渡す。
  function addPoints(state, n) {
    state.studyPoints = (state.studyPoints || 0) + n;
    state.studyPointsEarnedTotal = (state.studyPointsEarnedTotal || 0) + n;
    return state;
  }

  // ---- 交換レートと時間 ----
  function isValidRate(rate, b) {
    var sp = bal(b).STUDY_POINTS;
    return typeof rate === 'number' && Math.floor(rate) === rate && rate >= sp.PER_HOUR_MIN && rate <= sp.PER_HOUR_MAX;
  }
  function rateOf(state, b) {
    var r = state && state.settings && state.settings.pointsPerHour;
    return isValidRate(r, b) ? r : bal(b).STUDY_POINTS.PER_HOUR_DEFAULT;
  }
  // pt → 換算できる時間（分、切り捨て）
  function minutesFor(points, rate) { return Math.max(0, Math.floor(points * 60 / rate + 1e-9)); }
  // 時間（分）→ 必要な pt（切り上げ）
  function costFor(minutes, rate) { return Math.ceil(minutes * rate / 60 - 1e-9); }

  // 「1時間30分」「45分」「2時間」「0分」
  function formatMinutes(min) {
    var h = Math.floor(min / 60), m = min % 60;
    if (h === 0) return m + '分';
    return h + '時間' + (m ? m + '分' : '');
  }
  // 同じ文字列の、ふりがなの記法入り（「分」の読みは util の minuteReading）
  function formatMinutesMarkup(min) {
    var h = Math.floor(min / 60), m = min % 60;
    var mm = function (n) { return n + '{分|' + FF.util.minuteReading(n) + '}'; };
    if (h === 0) return mm(m);
    return h + '{時間|じかん}' + (m ? mm(m) : '');
  }
  // 「2026-09-27 15:00」（端末のローカル時刻）
  function formatDateTime(t) {
    var d = new Date(t);
    var p2 = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + ' ' + p2(d.getHours()) + ':' + p2(d.getMinutes());
  }

  // ---- 保護者のメールアドレス ----
  function isValidEmail(s) {
    return typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  // ---- 引換券ID：XXXX-XXXX ----
  // 見まちがえやすい 0・O・1・I を除いた 32 字。7文字をランダムに選び、8文字目はチェック用。
  // チェック：Σ (i+1) × 値[i]（i = 0〜7）が 31 で割り切れるように8文字目（0〜30）を決める。
  // 31 は素数なので、1文字の書き誤りと、となり合う2文字の入れかえを見つけられる。
  // 例外は値の差が 31 になる「2」（値 0）と「Z」（値 31）の取りちがえ・入れかえだけ。
  var ID_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  var ID_MOD = 31;
  function checkValue(vals) {
    var s = 0;
    for (var i = 0; i < 7; i++) s += (i + 1) * vals[i];
    // 8 × c ≡ −s（mod 31）。8 の逆数は 4（8 × 4 = 32 ≡ 1）
    return (((-s * 4) % ID_MOD) + ID_MOD) % ID_MOD;
  }
  function normalizeTicketId(id) {
    return String(id == null ? '' : id).toUpperCase().replace(/[\s-]/g, '');
  }
  function isValidTicketId(id) {
    var raw = normalizeTicketId(id);
    if (raw.length !== 8) return false;
    var vals = [];
    for (var i = 0; i < 8; i++) {
      var v = ID_CHARS.indexOf(raw[i]);
      if (v < 0) return false;
      vals.push(v);
    }
    var s = 0;
    for (var j = 0; j < 8; j++) s += (j + 1) * vals[j];
    return s % ID_MOD === 0;
  }
  function randomTicketId(rng) {
    var vals = [];
    for (var i = 0; i < 7; i++) vals.push(Math.floor(rng() * ID_CHARS.length));
    vals.push(checkValue(vals));
    var s = vals.map(function (v) { return ID_CHARS[v]; }).join('');
    return s.slice(0, 4) + '-' + s.slice(4);
  }
  // 履歴と重ならない ID を作る
  function newTicketId(history, rng) {
    rng = rng || Math.random;
    var used = {};
    (history || []).forEach(function (h) { used[h.id] = true; });
    for (;;) {
      var id = randomTicketId(rng);
      if (!used[id]) return id;
    }
  }

  // ---- 引換 ----
  var METHODS = ['mail', 'print'];

  // o: { minutes, method, now, rng }
  // 戻り値：{ ok: true, state, entry } または { ok: false, error: 'notEnough' | 'noEmail' | 'badMinutes' | 'badMethod' }
  function redeem(state, o, b) {
    b = bal(b);
    var minutes = o.minutes;
    if (typeof minutes !== 'number' || Math.floor(minutes) !== minutes || minutes <= 0) return { ok: false, error: 'badMinutes' };
    if (METHODS.indexOf(o.method) < 0) return { ok: false, error: 'badMethod' };
    if (o.method === 'mail' && !isValidEmail(state.settings.parentEmail)) return { ok: false, error: 'noEmail' };
    var rate = rateOf(state, b);
    var cost = costFor(minutes, rate);
    if ((state.studyPoints || 0) < cost) return { ok: false, error: 'notEnough', cost: cost };
    var s = FF.util.clone(state);
    var entry = {
      id: newTicketId(s.redeemHistory, o.rng),
      issuedAt: o.now,
      points: cost,
      minutes: minutes,
      pointsPerHour: rate,
      method: o.method
    };
    s.studyPoints -= cost;
    s.redeemHistory = (s.redeemHistory || []).concat([entry]);
    return { ok: true, state: s, entry: entry };
  }

  // ---- メールと QR コードの文字列（SPEC 14.5） ----
  function mailSubject(state) {
    return '【学習ゲーム】' + state.player.name + 'さんが遊び時間を申請しています';
  }
  function mailBody(state, entry) {
    return state.player.name + 'さんが勉強量ポイントを' + entry.points.toLocaleString('en-US') + 'pt使って、' +
      formatMinutes(entry.minutes) + 'ぶんの遊び時間を申請しました。（引換券ID: ' + entry.id + '、発行日時: ' + formatDateTime(entry.issuedAt) + '）';
  }
  function mailtoUrl(state, entry) {
    var to = encodeURIComponent(state.settings.parentEmail || '').replace(/%40/g, '@');
    return 'mailto:' + to + '?subject=' + encodeURIComponent(mailSubject(state)) + '&body=' + encodeURIComponent(mailBody(state, entry));
  }
  function qrText(state, entry) {
    return [
      FF.config.TITLE + ' 引換券',
      'ID: ' + entry.id,
      'なまえ: ' + state.player.name,
      'じかん: ' + formatMinutes(entry.minutes),
      'はっこう: ' + formatDateTime(entry.issuedAt)
    ].join('\n');
  }

  // ---- 読み込み時の整合（state.js の migrate から呼ぶ） ----
  function isCount(v) { return typeof v === 'number' && isFinite(v) && Math.floor(v) === v && v >= 0; }
  function isValidEntry(e) {
    return FF.util.isPlainObject(e) && typeof e.id === 'string' && e.id !== '' &&
      isCount(e.issuedAt) && isCount(e.points) && isCount(e.minutes) && e.minutes > 0 &&
      isCount(e.pointsPerHour) && e.pointsPerHour > 0 && typeof e.method === 'string';
  }
  function normalizePoints(state, b) {
    b = bal(b);
    if (!isCount(state.studyPoints)) state.studyPoints = 0;
    if (!isCount(state.studyPointsEarnedTotal)) state.studyPointsEarnedTotal = 0;
    state.redeemHistory = (Array.isArray(state.redeemHistory) ? state.redeemHistory : []).filter(isValidEntry);
    if (!isValidRate(state.settings.pointsPerHour, b)) state.settings.pointsPerHour = b.STUDY_POINTS.PER_HOUR_DEFAULT;
    if (typeof state.settings.parentEmail !== 'string') state.settings.parentEmail = '';
    return state;
  }

  FF.points = {
    pointsBreakdown: pointsBreakdown,
    calcPoints: calcPoints,
    addPoints: addPoints,
    isValidRate: isValidRate,
    rateOf: rateOf,
    minutesFor: minutesFor,
    costFor: costFor,
    formatMinutes: formatMinutes,
    formatMinutesMarkup: formatMinutesMarkup,
    formatDateTime: formatDateTime,
    isValidEmail: isValidEmail,
    ID_CHARS: ID_CHARS,
    isValidTicketId: isValidTicketId,
    newTicketId: newTicketId,
    METHODS: METHODS,
    redeem: redeem,
    mailSubject: mailSubject,
    mailBody: mailBody,
    mailtoUrl: mailtoUrl,
    qrText: qrText,
    normalizePoints: normalizePoints
  };
})(this);
