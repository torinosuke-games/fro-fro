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
  // ---- 数字のあとの数え方の読み（判断485） ----
  // 「8日」「15分」「3本」「4人」などを、数字ごと {15分|じゅうごふん} のように読む。
  // 数字は、半角・全角の数字か、漢字の数字（一〜九十九・百）。小数・カンマ・分数の途中の数は対象にしない。
  var D1 = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
  function numberReading(n) {   // 1〜9999
    var out = '', th = Math.floor(n / 1000), h = Math.floor(n / 100) % 10, t = Math.floor(n / 10) % 10, o = n % 10;
    if (th) out += th === 1 ? 'せん' : th === 3 ? 'さんぜん' : th === 8 ? 'はっせん' : D1[th] + 'せん';
    if (h) out += h === 1 ? 'ひゃく' : h === 3 ? 'さんびゃく' : h === 6 ? 'ろっぴゃく' : h === 8 ? 'はっぴゃく' : D1[h] + 'ひゃく';
    if (t) out += t === 1 ? 'じゅう' : D1[t] + 'じゅう';
    if (o) out += D1[o];
    return out;
  }
  // 数の終わり：1〜9＝その数字、10の位が終わり＝'ten'、100の位＝'hundred'、1000の位＝'thousand'
  function endOf(n) { return n % 10 ? n % 10 : n % 100 ? 'ten' : n % 1000 ? 'hundred' : 'thousand'; }
  function gem(r) { return r.replace(/いち$/, 'いっ').replace(/ろく$/, 'ろっ').replace(/はち$/, 'はっ').replace(/じゅう$/, 'じゅっ').replace(/ひゃく$/, 'ひゃっ'); }
  var DAYS = { 2: 'ふつか', 3: 'みっか', 4: 'よっか', 5: 'いつか', 6: 'むいか', 7: 'なのか', 8: 'ようか', 9: 'ここのか', 10: 'とおか', 14: 'じゅうよっか', 20: 'はつか', 24: 'にじゅうよっか' };
  function counterReading(n, ch) {
    var e = endOf(n), r = numberReading(n), g = (e === 1 || e === 6 || e === 8 || e === 'ten' || e === 'hundred');
    var four = n % 10 === 4 ? r.replace(/よん$/, 'よ') : r;
    switch (ch) {
      case '日': return DAYS[n] ? DAYS[n] : r + 'にち';
      case '月': return n >= 1 && n <= 12 ? (n === 4 ? 'し' : n === 7 ? 'しち' : n === 9 ? 'く' : r) + 'がつ' : null;
      case '時': return (n % 10 === 4 ? four : n % 10 === 7 ? r.replace(/なな$/, 'しち') : n % 10 === 9 ? r.replace(/きゅう$/, 'く') : r) + 'じ';
      case '年': return four + 'ねん';
      case '円': return four + 'えん';
      case '人': return n === 1 ? 'ひとり' : n === 2 ? 'ふたり' : four + 'にん';
      case '本': return (g ? gem(r) : r) + (g ? 'ぽん' : e === 3 ? 'ぼん' : 'ほん');
      case '匹': return (g ? gem(r) : r) + (g ? 'ぴき' : e === 3 ? 'びき' : 'ひき');
      case '杯': return (g ? gem(r) : r) + (g ? 'ぱい' : e === 3 ? 'ばい' : 'はい');
      case '分': return (g || e === 3 || e === 4 ? gem(r) : r) + (g || e === 3 || e === 4 ? 'ぷん' : 'ふん');
      case '冊': return ((e === 1 || e === 8 || e === 'ten') ? gem(r) : r) + 'さつ';
      case '回': case '個': return (g ? gem(r) : r) + (ch === '回' ? 'かい' : 'こ');
      case '階': return (g ? gem(r) : r) + (e === 3 ? 'がい' : 'かい');
      case '羽': return (e === 6 || e === 'ten' || e === 'hundred' ? gem(r) : r) + (e === 6 || e === 'ten' || e === 'hundred' ? 'ぱ' : e === 3 ? 'ば' : 'わ');
      case '週': return ((e === 1 || e === 8 || e === 'ten') ? gem(r) : r) + 'しゅう';
      case '才': case '歳': return n === 20 ? 'はたち' : ((e === 1 || e === 8 || e === 'ten') ? gem(r) : r) + 'さい';
      case '点': return ((e === 1 || e === 8 || e === 'ten') ? gem(r) : r) + 'てん';
      case '位': return r + 'い';
    }
    return null;
  }
  var KNUM = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 };
  function parseKanjiNumber(str) {   // 一〜九百九十九
    var n = 0, cur = 0, ok = str.length > 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      if (KNUM[c]) cur = KNUM[c];
      else if (c === '十') { n += (cur || 1) * 10; cur = 0; }
      else if (c === '百') { n += (cur || 1) * 100; cur = 0; }
      else ok = false;
    }
    return ok ? n + cur : 0;
  }
  // seg の i 番目から「数字＋数え方」が始まっていれば、{len, markup} を返す
  function countedRuby(seg, i) {
    var prev = i > 0 ? seg.charAt(i - 1) : '';
    if (/[0-9０-９.．,，/／:：一二三四五六七八九十百]/.test(prev)) return null;   // 数の途中（小数・カンマ・分数・時刻・長い漢数字）は対象にしない
    var m = /^([0-9０-９]{1,4}|[一二三四五六七八九十百]{1,5})(日|月|時|年|円|人|本|匹|杯|分|冊|回|個|階|羽|週|才|歳|点|位)/.exec(seg.slice(i, i + 7));
    if (!m) return null;
    var numStr = m[1], n = /^[0-9０-９]/.test(numStr) ? parseInt(numStr.replace(/[０-９]/g, function (d) { return String(d.charCodeAt(0) - 0xFF10); }), 10) : parseKanjiNumber(numStr);
    if (!n || n > 9999) return null;
    var after = seg.charAt(i + numStr.length + 1);
    var r = counterReading(n, m[2]);
    if (!r) return null;
    var len = numStr.length + 1;
    if (after === '間' && /[日週時年分]/.test(m[2])) { r += 'かん'; len++; }
    else if (after === '分' && /[日人個本枚杯冊匹回台]/.test(m[2])) { r += 'ぶん'; len++; }
    else if (m[2] === '分' && after === 'の') r = r.replace(/ぷん$/, 'ぶん').replace(/ふん$/, 'ぶん');
    return { len: len, markup: '{' + seg.substr(i, len) + '|' + r + '}' };
  }

  function autoRubyMarkup(template, dict) {
    // 文脈で読みを直した文字列の表（判断484）。辞書を指定したとき（テスト）は使わない
    if (!dict && FF.FURIGANA_CONTEXT && Object.prototype.hasOwnProperty.call(FF.FURIGANA_CONTEXT, template)) return FF.FURIGANA_CONTEXT[template];
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
        var cnt = countedRuby(seg, i);
        if (cnt && (!hit || cnt.len >= hit.length)) {
          out += cnt.markup;
          i += cnt.len;
        } else if (hit) {
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

  // ---- 学年に合わせたふりがな（判断482） ----
  // 漢字の学年：1〜6＝小学校、7＝中学校（常用漢字）、99＝それ以外（表にない漢字）
  var gradeMap = null;
  function kanjiGrade(ch) {
    if (!gradeMap) {
      gradeMap = {};
      var g = (FF.KANJI_GRADES) || {};
      Object.keys(g).forEach(function (k) { for (var i = 0; i < g[k].length; i++) gradeMap[g[k].charAt(i)] = +k; });
      gradeMap['々'] = 1;
    }
    return gradeMap[ch] || 99;
  }
  // 学年 grade の人に、この語（漢字）のふりがなが要るか。学年が未設定（0・null）なら、いつも要る。
  // 語の中に、その学年までに習っていない漢字が1つでもあれば要る。
  // 地名・人名（千曲川など。FF.FURIGANA_ALWAYS）は、読みが漢字から分からないので、学年に関係なくいつも要る。
  function needsRuby(base, grade) {
    if (!grade) return true;
    if (FF.FURIGANA_ALWAYS && FF.FURIGANA_ALWAYS[base]) return true;
    for (var i = 0; i < base.length; i++) {
      var ch = base.charAt(i);
      if (/[一-鿿々]/.test(ch) && kanjiGrade(ch) > grade) return true;
    }
    return false;
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
    minuteReading: minuteReading,
    clone: clone,
    isPlainObject: isPlainObject,
    normalizeName: normalizeName,
    parseRichText: parseRichText,
    plainText: plainText,
    autoRubyMarkup: autoRubyMarkup,
    bareKanji: bareKanji,
    kanjiGrade: kanjiGrade,
    needsRuby: needsRuby,
    makeRng: makeRng,
    shuffle: shuffle,
    localDayNumber: localDayNumber,
    formatCountdown: formatCountdown
  };
})(this);
