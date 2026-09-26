// 共通の純粋関数。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function isPlainObject(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }

  // プレイヤー名：制御文字を除き、前後の空白（全角を含む）を取り、最大文字数で切る。空なら既定名。
  function normalizeName(raw, cfg) {
    cfg = cfg || FF.config;
    var s = String(raw == null ? '' : raw).replace(/[\u0000-\u001f\u007f]/g, '').trim();
    var chars = Array.from(s);   // サロゲートペア（絵文字など）を1文字として数える
    if (chars.length > cfg.NAME_MAX_LENGTH) s = chars.slice(0, cfg.NAME_MAX_LENGTH).join('').trim();
    return s === '' ? cfg.DEFAULT_PLAYER_NAME : s;
  }

  // 表示用テキストをトークンに分解する。
  //   {name} などの変数 → vars の値をそのまま文字として挿入（記法として解釈しない）
  //   {漢字|かんじ}      → ふりがな
  //   {漢字|}            → ふりがなを付けない（辞書の自動付与からも外す。漢字の読みを問う問題の答えなど）
  // 戻り値：[{ text: "..." } | { ruby: "漢字", rt: "かんじ" }]
  function parseRichText(template, vars) {
    vars = vars || {};
    var tokens = [];
    var re = /\{([^{}|]+)\|([^{}]*)\}|\{([A-Za-z_][A-Za-z0-9_]*)\}/g;
    var last = 0, m;
    function pushText(t) {
      if (!t) return;
      var prev = tokens[tokens.length - 1];
      if (prev && prev.text !== undefined) prev.text += t;
      else tokens.push({ text: t });
    }
    while ((m = re.exec(template)) !== null) {
      pushText(template.slice(last, m.index));
      if (m[1] !== undefined) {
        if (m[2] === '') pushText(m[1]);
        else tokens.push({ ruby: m[1], rt: m[2] });
      }
      else if (Object.prototype.hasOwnProperty.call(vars, m[3])) pushText(String(vars[m[3]]));
      else pushText(m[0]);
      last = re.lastIndex;
    }
    pushText(template.slice(last));
    return tokens;
  }

  // ふりがなを外した文字列にする（{name} は展開する）
  function plainText(template, vars) {
    return parseRichText(template, vars).map(function (t) {
      return t.text !== undefined ? t.text : t.ruby;
    }).join('');
  }

  // ---- 辞書によるふりがなの自動付与 ----
  // 文中の語を辞書から探し、{漢字|よみ} の記法に置き換えた文字列を返す。
  // {name} や既に書かれた {漢字|よみ} の中身には手を付けない（プレイヤー名は変数として後から入るので対象外）。
  var dictCache = { dict: null, byFirst: null };
  function indexDict(dict) {
    if (dictCache.dict === dict) return dictCache.byFirst;
    var byFirst = {};
    Object.keys(dict).sort(function (a, b) { return b.length - a.length; }).forEach(function (k) {
      (byFirst[k.charAt(0)] = byFirst[k.charAt(0)] || []).push(k);
    });
    dictCache = { dict: dict, byFirst: byFirst };
    return byFirst;
  }
  function autoRubyMarkup(template, dict) {
    dict = dict || FF.FURIGANA || {};
    var byFirst = indexDict(dict);
    return String(template).split(/(\{[^{}]*\})/).map(function (seg, idx) {
      if (idx % 2 === 1) return seg;
      var out = '', i = 0;
      while (i < seg.length) {
        var cands = byFirst[seg.charAt(i)], hit = null;
        if (cands) {
          for (var c = 0; c < cands.length; c++) {
            if (seg.substr(i, cands[c].length) === cands[c]) { hit = cands[c]; break; }
          }
        }
        if (hit) {
          var v = dict[hit];
          out += v.indexOf('{') >= 0 ? v : '{' + hit + '|' + v + '}';
          i += hit.length;
        } else {
          out += seg.charAt(i);
          i++;
        }
      }
      return out;
    }).join('');
  }

  // ふりがなのない漢字が残っていないか（テスト用）。残っている漢字の配列を返す。
  function bareKanji(template, vars, dict) {
    var found = [];
    parseRichText(autoRubyMarkup(template, dict), vars || {}).forEach(function (t) {
      if (t.text === undefined) return;
      var m = t.text.match(/[々一-鿿]+/g);
      if (m) found = found.concat(m);
    });
    return found;
  }

  // シード付き乱数（mulberry32）。0以上1未満を返す関数を返す。
  function makeRng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // 新しい配列を返すシャッフル（Fisher–Yates）
  function shuffle(arr, rng) {
    rng = rng || Math.random;
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // 端末のローカル日付の通し日数（日付が変わると1増える）
  function localDayNumber(now) {
    var d = new Date(now);
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }

  // ミリ秒 → "MM:SS"（秒は切り上げ）
  function formatCountdown(ms) {
    var sec = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  // 残り時間を「1時間20分」「5分」「30秒」の形の、ふりがなの記法入りの文字列にする（SPEC_v0.3 3章の「あと◯分」）。
  // 1分以上は分に切り上げ、1時間以上は時間と分。「分」の読みは数の一の位で変わる（1・3・4・6・8・0 → ぷん、2・5・7・9 → ふん）。
  function minuteReading(n) { return /[134680]$/.test(String(n)) ? 'ぷん' : 'ふん'; }
  function formatDurationMarkup(ms) {
    var sec = Math.max(0, Math.ceil(ms / 1000));
    if (sec < 60) return sec + '{秒|びょう}';
    var min = Math.ceil(sec / 60), h = Math.floor(min / 60), m = min % 60;
    var out = h > 0 ? h + '{時間|じかん}' : '';
    if (m > 0) out += m + '{分|' + minuteReading(m) + '}';
    return out;
  }

  FF.util = {
    formatDurationMarkup: formatDurationMarkup,
    clone: clone,
    isPlainObject: isPlainObject,
    normalizeName: normalizeName,
    parseRichText: parseRichText,
    plainText: plainText,
    autoRubyMarkup: autoRubyMarkup,
    bareKanji: bareKanji,
    makeRng: makeRng,
    shuffle: shuffle,
    localDayNumber: localDayNumber,
    formatCountdown: formatCountdown
  };
})(this);
