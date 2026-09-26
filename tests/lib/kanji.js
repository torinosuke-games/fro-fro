// 漢字の学年配当の照合（テストと確認用の報告で使う）。データは tests/data/kanji.js。
// 学年の数え方：1〜6 は学年別漢字配当表の学年、7 は常用漢字のうち配当表にない字（中学校以降）、8 は常用漢字でない字（表外字）。
// ゲームの学年（Lv）と比べるとき、Lv1〜6 は「その学年までに配当された字」、Lv7〜9 は「常用漢字」を習った字とみなす。
'use strict';
const { KYOIKU, JOYO } = require('../data/kanji.js');

const GRADE = new Map();
for (const g of Object.keys(KYOIKU)) for (const ch of KYOIKU[g]) GRADE.set(ch, Number(g));
for (const ch of JOYO) if (!GRADE.has(ch)) GRADE.set(ch, 7);

const KANJI_RE = /[々〆一-鿿㐀-䶿]/g;

function gradeOf(ch) {
  if (ch === '々') return 1;   // 繰り返しの記号。字として数えない
  return GRADE.get(ch) || 8;
}
// その Lv までに習う字か
function learnedBy(ch, level) {
  const g = gradeOf(ch);
  return level >= 7 ? g <= 7 : g <= level;
}
// 文字列の中の、その Lv で習っていない字（重複なし）。[{ ch, grade }]
function unlearned(text, level) {
  const seen = new Set(), out = [];
  for (const ch of String(text).match(KANJI_RE) || []) {
    if (seen.has(ch)) continue;
    seen.add(ch);
    if (!learnedBy(ch, level)) out.push({ ch, grade: gradeOf(ch) });
  }
  return out;
}
function gradeLabel(g) { return g <= 6 ? '小' + g : g === 7 ? '中学' : '表外'; }

module.exports = { gradeOf, learnedBy, unlearned, gradeLabel, KANJI_RE };
