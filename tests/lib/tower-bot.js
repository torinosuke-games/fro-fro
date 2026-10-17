// 防衛戦の、自動で遊ぶ人（テスト・調整用）。灯がたまったら、決まった順に、仲間を並べる。問題は、正解率 acc で、灯をもらう。
'use strict';
const PLAN = [   // [仲間, レーンの選び方, 列]。レーンは、'all'（全レーン）か、レーンの番号
  ['kenshi', 2, 3], ['juushouhei', 2, 4], ['kenshi', 1, 3], ['kenshi', 3, 3], ['juushouhei', 1, 4], ['juushouhei', 3, 4],
  ['yumitsukai', 2, 2], ['gakusha', 0, 1], ['kenshi', 0, 3], ['kenshi', 4, 3], ['juushouhei', 0, 4], ['juushouhei', 4, 4],
  ['shiromadoushi', 2, 1], ['kuromadoushi', 1, 2], ['kuromadoushi', 3, 2], ['senshi', 2, 5], ['yumitsukai', 1, 2], ['yumitsukai', 3, 2],
  ['shisho', 2, 5], ['touzoku', 0, 2], ['touzoku', 4, 2], ['senshi', 1, 5], ['senshi', 3, 5], ['yumitsukai', 0, 1], ['yumitsukai', 4, 1]
];
function play(FF, state, { difficulty, seed, acc = 0.85, diffKey = 'standard', plan = PLAN, maxSeconds = 400 }) {
  const Tw = FF.tower, T = FF.balance.TOWER, bt = Tw.create(state, { difficulty, seed, mode: 'practice' });
  if (bt.lanes > 5) plan = plan.reduce((o, e) => { o.push(e); if (e[1] === 4) o.push([e[0], 5, e[2]]); return o; }, []);   // 6本目の道も、5本目と同じ並べ方で守る
  let rng = (seed * 7919 + 13) >>> 0;
  const r = () => { rng = (rng + 0x6D2B79F5) >>> 0; let t = rng; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  let idx = 0, ticks = Math.round(maxSeconds / T.TICK);
  for (let i = 0; i < ticks && !bt.result; i++) {
    if (Tw.canQuiz(bt)) Tw.answer(bt, r() < acc, diffKey);
    // 次に並べる仲間を、並べられるあいだ、並べる（置けないところ・いない仲間は、とばす）
    while (idx < plan.length) {
      const [id, lane, col] = plan[idx];
      if (!bt.defs[id] || Tw.unitAt(bt, lane, col)) { idx++; continue; }
      if (!Tw.place(bt, id, lane, col).ok) break;
      idx++;
    }
    // やられたところを、もう一度並べる
    if (idx >= plan.length) idx = 0;
    Tw.step(bt, T.TICK);
  }
  return bt;
}
module.exports = { play, PLAN };
