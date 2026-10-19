// 選択問題の誤答（まちがいの選択肢）が、正解にくらべて質が悪くないかを調べる道具（判断493）。
// 使い方：node tests/tools/check-distractors.cjs [ID の前の部分 例: math_g4_hand]  → 気になる問題を、理由つきで出す
// 見る点：①数の答え：誤答が、正解と桁がちがう・遠すぎる ②長さ：正解だけが長い・短い ③形：正解と誤答の書き方（単位・文字の種類）がちがう ④誤答どうしが似すぎ・重複
const L = require('../lib/loader.js');
const c = L.load(), FF = c.FF, B = c.QUESTION_BANK;
const prefix = process.argv[2] || '';
function plain(s) { return String(s).replace(/\{([^{}|]*)\|[^{}]*\}/g, '$1'); }
function num(s) { const t = plain(s).replace(/[,，]/g, '').replace(/[０-９]/g, d => String.fromCharCode(d.charCodeAt(0) - 0xFEE0)); const m = t.match(/^[^0-9\-]*(-?[0-9]+(?:\.[0-9]+)?)(?:\/([0-9]+))?/); if (!m) return NaN; return m[2] ? Number(m[1]) / Number(m[2]) : Number(m[1]); }
function isNumericAnswer(a) { const t = plain(a).trim(); return /^[^0-9\-]{0,3}-?[0-9０-９][0-9０-９.,，\/]*\s*[^\s0-9]{0,6}$/.test(t) && !isNaN(num(t)); }
const out = [];
B.filter(q => q.answerType === 'choice' && q.id.startsWith(prefix)).forEach(q => {
  const reasons = [], ans = plain(q.answer), ds = q.choices.filter(x => x !== q.answer).map(plain);
  if (isNumericAnswer(ans)) {
    const n = num(ans);
    const dec = (ans.match(/\.([0-9]+)/) || [, ''])[1].length, step = Math.pow(10, -dec);
    ds.forEach(d => {
      const v = num(d); if (isNaN(v)) { reasons.push('数でない誤答 ' + d); return; }
      // 遠い：正解との比が 4倍より大きい・4分の1より小さい（0.1 や 1 など小さい答えは差が 12 ぶん以内ならよい）。桁ちがいは、ほかの誤答にも同じ桁ちがいがあるときだけ見のがす
      const r = n === 0 ? (v === 0 ? 1 : 99) : Math.abs(v / n), near = Math.abs(v - n) <= 12 * step;
      if (!near && (r > 4 || r < 0.25 || (n > 0 && v < 0))) reasons.push('遠い ' + d + '（正解 ' + ans + '）');
    });
  } else {
    const la = ans.length, lds = ds.map(d => d.length), avg = lds.reduce((a, b) => a + b, 0) / Math.max(1, lds.length);
    if (la >= 8 && la > avg * 1.8) reasons.push('正解だけが長い');
    if (ds.every(d => d.length <= la * 0.5) && la >= 6) reasons.push('誤答がどれも短い');
    const kind = s => /[ぁ-ん]/.test(s) ? 'ひら' : /[ァ-ヶ]/.test(s) ? 'カタ' : /[一-鿿]/.test(s) ? '漢' : /[A-Za-z]/.test(s) ? '英' : '他';
    const ka = kind(ans); ds.forEach(d => { if (kind(d) !== ka && !(ka === 'ひら' && kind(d) === '漢')) reasons.push('字種がちがう ' + d); });
  }
  if (new Set(q.choices.map(plain)).size < q.choices.length) reasons.push('重複');
  if (reasons.length) out.push({ id: q.id, q: plain(q.question).slice(0, 60), answer: ans, choices: ds, reasons: Array.from(new Set(reasons)) });
});
if (process.argv.includes('--json')) console.log(JSON.stringify(out));
else { console.log('対象（選択問題）：' + B.filter(q => q.answerType === 'choice' && q.id.startsWith(prefix)).length + ' 問、気になる問題：' + out.length + ' 問'); out.slice(0, +(process.env.N || 40)).forEach(o => console.log(o.id + ' | ' + o.q + ' | 正解 ' + o.answer + ' | 誤答 ' + o.choices.join(' / ') + ' | ' + o.reasons.join('、'))); }
