// 防衛戦の、難しさごとの勝率の目安（判断443）：node tests/tools/tower-sim.js
'use strict';
const { load } = require('../lib/loader');
const { play } = require('../lib/tower-bot');
const ctx = load(); const FF = ctx.FF;
function stateWith(all) {
  const s = FF.state.createDefaultState(1790000000000);
  if (all) s.adventure.recruited = ['juushouhei', 'shiromadoushi', 'kenshi', 'senshi', 'kuromadoushi', 'gakusha', 'shisho', 'touzoku', 'yumitsukai'];
  return s;
}
for (const [label, all] of [['はじめの3人', false], ['9人', true]]) {
  for (const acc of [0.6, 0.85, 1]) {
    const row = [];
    for (let d = 1; d <= 5; d++) {
      let wins = 0, hp = 0, N = 30;
      for (let seed = 1; seed <= N; seed++) { const bt = play(FF, stateWith(all), { difficulty: d, seed, acc }); if (bt.result === 'win') { wins++; hp += bt.core.hp; } }
      row.push(`d${d}: ${Math.round(100 * wins / N)}%${wins ? '（熱 ' + Math.round(hp / wins) + '）' : ''}`);
    }
    console.log(`${label}　正解率 ${Math.round(acc * 100)}%　` + row.join('　'));
  }
}
