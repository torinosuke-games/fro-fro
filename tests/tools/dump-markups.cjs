// 全文の [元の文字列, ふりがな付きの文字列] を /tmp/markups.json に書く（build-furigana-context.py の入力。判断484）
const L = require('../lib/loader.js'); const c = L.load(), FF = c.FF, U = FF.util; const seen = new Set(), out = [];
function walk(v) {
  if (typeof v === 'string') { if (!/[一-鿿]/.test(v) || seen.has(v)) return; seen.add(v); out.push([v, U.autoRubyMarkup(v)]); }
  else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk);
}
walk(c.QUESTION_BANK.map(q => ({ question: q.question, choices: q.choices, answer: q.answer, hints: q.hints, explanation: q.explanation, unit: q.unit }))); walk(FF.texts);
require('fs').writeFileSync(process.argv[2] || '/tmp/markups.json', JSON.stringify(out)); console.log(out.length);
