// 答えの正規化と判定（SPEC 7.4）。純粋関数のみ。
(function (root) {
  'use strict';
  var FF = root.FF = root.FF || {};

  var VALIDATION_MODES = ['exact', 'formula', 'number', 'kana-insensitive', 'any-of'];

  // 全角→半角（NFKC）、前後の空白の除去、連続する空白を1つに、英字を小文字に
  function normalize(s) {
    return String(s == null ? '' : s)
      .normalize('NFKC')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  // 式だけに適用する表記の正規化。exactの挙動は保持する。
  function normalizeFormula(s) {
    return normalize(String(s).replace(/²/g, '^2').replace(/³/g, '^3'))
      .replace(/\s/g, '').replace(/[−‐‑‒–—ーｰ]/g, '-')
      .replace(/[*·]/g, '×').replace(/\^2/g, '²').replace(/\^3/g, '³');
  }

  // カタカナ → ひらがな
  function toHiragana(s) {
    return s.replace(/[ァ-ヶ]/g, function (c) {
      return String.fromCharCode(c.charCodeAt(0) - 0x60);
    });
  }

  // 数値・単純な分数として読む。読めない形やゼロ除算は NaN。
  // 「.5」「+3」、3桁ごとのカンマ（1,000）、マイナス記号の異体字（− ‐ ー など）を許容する。
  function parseNumber(s) {
    var t = normalize(s).replace(/\s/g, '').replace(/[−‐‑‒–—ーｰ]/g, '-');
    // 分子・分母は符号付きの数だけ。式の評価や再帰的な分数は行わない。
    function scalar(value, allowParens) {
      if (allowParens && /^\([^()]+\)$/.test(value)) value = value.slice(1, -1);
      if (/^[+-]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(value)) value = value.replace(/,/g, '');
      if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(value)) return NaN;
      var n = Number(value);
      return isFinite(n) ? n : NaN;
    }
    var parts = t.split('/');
    if (parts.length === 1) return scalar(t, false);
    if (parts.length !== 2) return NaN;
    var numerator = scalar(parts[0], true), denominator = scalar(parts[1], true);
    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return NaN;
    var result = numerator / denominator;
    return isFinite(result) ? result : NaN;
  }

  // 分数解ではスマートフォンでも / を入力できる文字キーボードを使う。
  function inputMode(q) {
    return q && q.validationMode === 'number' && String(q.answer).indexOf('/') < 0 ? 'decimal' : 'text';
  }

  function numberEquals(a, b) {
    return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));
  }

  function candidatesOf(q) {
    return [q.answer].concat(q.acceptedAnswers || []);
  }

  // 自由入力の判定。{ correct, empty }
  function judgeInput(q, input) {
    var inNorm = normalize(input);
    if (inNorm === '') return { correct: false, empty: true };
    var mode = q.validationMode || 'exact';
    var cands = candidatesOf(q);
    for (var i = 0; i < cands.length; i++) {
      var c = cands[i];
      if (mode === 'number') {
        var a = parseNumber(input), b = parseNumber(c);
        if (!isNaN(b)) {
          if (!isNaN(a) && numberEquals(a, b)) return { correct: true, empty: false };
          continue;
        }
        // 数値として読めない正解候補は文字列として比較する
      }
      if (mode === 'formula') {
        if (normalizeFormula(input) === normalizeFormula(c)) return { correct: true, empty: false };
      } else if (mode === 'kana-insensitive') {
        if (toHiragana(inNorm) === toHiragana(normalize(c))) return { correct: true, empty: false };
      } else if (inNorm === normalize(c)) {
        return { correct: true, empty: false };
      }
    }
    return { correct: false, empty: false };
  }

  // 4択の判定：選んだ選択肢の文字列が answer と一致するか
  function judgeChoice(q, selected) {
    return { correct: selected === q.answer, empty: selected == null };
  }

  function judge(q, input) {
    return q.answerType === 'choice' ? judgeChoice(q, input) : judgeInput(q, input);
  }

  FF.answer = {
    VALIDATION_MODES: VALIDATION_MODES,
    normalize: normalize,
    toHiragana: toHiragana,
    parseNumber: parseNumber,
    inputMode: inputMode,
    judgeInput: judgeInput,
    judgeChoice: judgeChoice,
    judge: judge
  };
})(this);
