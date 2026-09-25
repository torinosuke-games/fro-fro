// バランスの自動計算（node tests/simulate.js）
// SPEC 9.4 の到達時間と、当てずっぽうの期待値を表にして出力する。
// 目標から外れた項目があれば終了コード 1。
'use strict';
const { load } = require('./lib/loader');

const ctx = load();
const FF = ctx.FF;
const B = FF.balance;

let failures = 0;
const pad = (s, n) => String(s).padStart(n);
const fmtMin = m => (m == null ? '—' : m >= 120 ? (m / 60).toFixed(1) + '時間' : m.toFixed(1) + '分');

// ---- 1. 到達時間 ----
console.log('■ 到達時間（プレイ時間）  1日' + B.SIM_DEFAULTS.minutesPerDay + '分・受け取り' + B.SIM_DEFAULTS.collectsPerDay + '回/日');
console.log('到達点        プロフィール   結果        目標      差      判定');
const results = {};
for (const key of Object.keys(B.SIM_PROFILES)) results[key] = FF.simulator.run(B.SIM_PROFILES[key]);
for (const ms of ['furnace2', 'furnace3', 'all5']) {
  for (const key of Object.keys(B.SIM_PROFILES)) {
    const got = results[key].milestones[ms];
    const target = B.TARGETS[ms][key];
    const diff = got == null ? Infinity : (got - target) / target;
    const ok = Math.abs(diff) <= B.TARGET_TOLERANCE;
    if (!ok) failures++;
    console.log(`${ms.padEnd(12)}  ${key.padEnd(12)} ${pad(fmtMin(got), 9)}  ${pad(fmtMin(target), 8)}  ${pad((diff * 100).toFixed(0) + '%', 5)}   ${ok ? 'OK' : 'NG'}`);
  }
}

// ---- 2. 経済の内訳 ----
console.log('\n■ 全施設Lv5までの内訳');
console.log('プロフィール  日数  問題数   4択の割合  学習で獲得  生産      生産の割合');
for (const key of Object.keys(results)) {
  const r = results[key];
  console.log(`${key.padEnd(12)} ${pad(r.days, 4)} ${pad(r.questions, 7)}   ${pad((r.choiceShare * 100).toFixed(0) + '%', 6)}    ${pad(r.learned, 8)}  ${pad(r.produced, 7)}   ${pad((r.productionShare * 100).toFixed(1) + '%', 6)}`);
}
const lv1Share = results.lv1.productionShare;
if (lv1Share > B.PRODUCTION_SHARE_TARGET * 1.5) {
  failures++;
  console.log(`NG: Lv1 の生産の割合 ${(lv1Share * 100).toFixed(1)}% が目標 ${B.PRODUCTION_SHARE_TARGET * 100}% を大きく超えている`);
}

// ---- 2b. 探索（v0.2）を含めた到達時間（SPEC_v0.2 4.3） ----
// 探索あり：地域が開いたらすぐ探索を進める（探索の問題を解く時間もプレイ時間に含める）。
// 報酬だけ：探索にかかる時間を 0 とみなした場合（短縮の上限の目安）。
console.log('\n■ 探索（v0.2）を含めた到達時間  探索あり＝問題を解く時間も含める／報酬だけ＝探索の時間を0とみなす');
console.log('到達点        プロフィール   探索なし    探索あり    ずれ     報酬だけ    ずれ     目標      目標との差  判定');
const withEx = {}, rewardOnly = {};
for (const key of Object.keys(B.SIM_PROFILES)) {
  withEx[key] = FF.simulator.run(B.SIM_PROFILES[key], { explore: true });
  rewardOnly[key] = FF.simulator.run(B.SIM_PROFILES[key], { explore: true, exploreTimeScale: 0 });
}
const pct = x => (x >= 0 ? '+' : '') + (x * 100).toFixed(1) + '%';
for (const ms of ['furnace2', 'furnace3', 'all5']) {
  for (const key of Object.keys(B.SIM_PROFILES)) {
    const base = results[key].milestones[ms];
    const got = withEx[key].milestones[ms];
    const upper = rewardOnly[key].milestones[ms];
    const target = B.TARGETS[ms][key];
    const diff = (got - target) / target;
    // 判定：探索ありでも目標の ±30% 以内、かつ探索による短縮（報酬だけの場合でも）が 30% を超えない
    const ok = Math.abs(diff) <= B.TARGET_TOLERANCE && (base - upper) / base <= B.TARGET_TOLERANCE;
    if (!ok) failures++;
    console.log(`${ms.padEnd(12)}  ${key.padEnd(12)} ${pad(fmtMin(base), 9)}  ${pad(fmtMin(got), 9)}  ${pad(pct((got - base) / base), 7)}  ${pad(fmtMin(upper), 9)}  ${pad(pct((upper - base) / base), 7)}  ${pad(fmtMin(target), 8)}  ${pad(pct(diff), 8)}    ${ok ? 'OK' : 'NG'}`);
  }
}

console.log('\n■ 探索の内訳（期待値）');
console.log('プロフィール  地域        出る学年  1問の秒数  1地点の秒数  100%到達（プレイ時間）');
for (const key of Object.keys(withEx)) {
  const x = withEx[key].explore;
  for (const r of x.regions) {
    console.log(`${key.padEnd(12)} ${r.id.padEnd(10)}  ${pad(r.grade.toFixed(1), 7)}  ${pad(r.secPerQuestion.toFixed(1), 8)}  ${pad(r.secPerNode.toFixed(1), 10)}   ${pad(fmtMin(x.completedAt[r.id]), 9)}`);
  }
  console.log(`${''.padEnd(12)} 合計：探索のプレイ時間 ${fmtMin(x.minutes)}、進んだ地点 ${x.nodes}、資源 ${x.resources}（全施設Lv5までの獲得の ${(x.resources / (withEx[key].learned + withEx[key].produced + x.resources) * 100).toFixed(1)}%）、チケット ${x.tickets}`);
}

// 宝箱のチケット：1地域あたり「まっとうにチケットを稼いだ場合の1〜2時間分」を超えない（SPEC_v0.2 4.1）
// チケットの回復は1時間に 60/5 = 12 枚。1時間分（12枚）を上限として判定する。
const perHour = 3600000 / B.TICKET_RECOVER_MS;
console.log(`\n■ 宝箱のチケット（1時間に回復する枚数 = ${perHour}）`);
for (const r of FF.defs.REGIONS) {
  const n = r.nodes.filter(x => x.kind === 'chest').reduce((a, x) => a + (B.EXPLORE.CHESTS[x.chest].tickets || 0), 0);
  const ok = n <= perHour;
  if (!ok) failures++;
  console.log(`${r.id.padEnd(10)}  ${n} 枚（回復 ${(n / perHour * 60).toFixed(0)} 分ぶん）  ${ok ? 'OK' : 'NG'}`);
}

// ---- 3. 当てずっぽうの期待値（1チケットあたり） ----
console.log('\n■ 当てずっぽう（4択・正解率25%）の期待値：1チケットあたりの獲得量');
const off = JSON.parse(JSON.stringify(B));
off.ACCURACY.THRESHOLD = 0;   // 正答率倍率なし（修正前）
const legit = FF.simulator.guessExpectation({ grade: 1, difficulty: 'standard', pGuess: 1, answers: 1 }).steady;
console.log(`比較対象：Lv1 標準を確実に正解 = ${legit.toFixed(2)}`);
console.log('条件                     修正前    最初の20問  最初の50問  定常      判定（定常 ≦ 比較対象）');
const cases = [
  { label: 'Lv9 標準', grade: 9, difficulty: 'standard' },
  { label: 'Lv9 発展', grade: 9, difficulty: 'advanced' },
  { label: 'Lv9 発展＋重点教科', grade: 9, difficulty: 'advanced', isFocusSubject: true },
  { label: 'Lv7 発展', grade: 7, difficulty: 'advanced' }
];
for (const c of cases) {
  const o = Object.assign({ pGuess: 0.25, answers: 200 }, c);
  const before = FF.simulator.guessExpectation(o, off).steady;
  const g = FF.simulator.guessExpectation(o);
  // 重点教科どうしで比べる場合は比較対象も 1.25 倍
  const ref = c.isFocusSubject ? legit * B.FOCUS_SUBJECT_MULT : legit;
  const ok = g.steady <= ref;
  if (!ok) failures++;
  console.log(`${c.label.padEnd(18)}  ${pad(before.toFixed(2), 8)}  ${pad(g.avgFirst(20).toFixed(2), 10)}  ${pad(g.avgFirst(50).toFixed(2), 10)}  ${pad(g.steady.toFixed(2), 6)}    ${ok ? 'OK' : 'NG'}（比較 ${ref.toFixed(2)}）`);
}

// ---- 4. 正答率倍率が正しく解いている子に与える影響 ----
console.log('\n■ 正答率倍率の平均（定常状態、4択）');
const row = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map(p => {
  const full = FF.simulator.expectedPerQuestion({ grade: 5, difficulty: 'standard', answerType: 'choice', secPerQuestion: 30, accuracy: p }, off).reward;
  const withM = FF.simulator.expectedPerQuestion({ grade: 5, difficulty: 'standard', answerType: 'choice', secPerQuestion: 30, accuracy: p }).reward;
  return `${(p * 100).toFixed(0)}%→${(withM / full).toFixed(2)}`;
});
console.log('正答率→平均倍率  ' + row.join('  '));

// ---- 5. 正答率による感度 ----
console.log('\n■ 感度：正答率を変えたときの 全施設Lv5 到達時間');
for (const acc of [0.7, 0.8, 0.9, 1.0]) {
  const cells = Object.keys(B.SIM_PROFILES).map(key => {
    const p = Object.assign({}, B.SIM_PROFILES[key], { accuracy: acc });
    return `${key} ${fmtMin(FF.simulator.run(p).milestones.all5)}`;
  });
  console.log(`正答率 ${(acc * 100).toFixed(0)}%   ` + cells.join('   '));
}

console.log('\n' + (failures === 0 ? '結果：すべて目標内' : `結果：目標外 ${failures} 件`));
process.exitCode = failures === 0 ? 0 : 1;
