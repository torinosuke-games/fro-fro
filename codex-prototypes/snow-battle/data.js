/* Standalone sample content. Does not load or alter the production question bank. */
window.BATTLE_DATA = Object.freeze({
  members: [
    { id: 'hero', name: 'ゆき', role: '旅人', hp: 96, startHp: 76, mp: 16, power: 22, color: '#8974b3', skill: '炎の一閃', cost: 4, kind: 'strike', detail: '敵1体に強い一撃。消費MP 4。', skillPower: 43 },
    { id: 'guardian', name: '重装兵', role: '守り役', hp: 132, startHp: 112, mp: 12, power: 18, color: '#638ea9', skill: '仲間をかばう', cost: 3, kind: 'cover', detail: 'このターン、仲間への単体攻撃を引き受けて半減。消費MP 3。' },
    { id: 'healer', name: '白魔道士', role: '回復役', hp: 84, startHp: 60, mp: 20, power: 12, color: '#92a782', skill: 'いやしの光', cost: 4, kind: 'heal', detail: '仲間1人のHPを38回復。消費MP 4。戦闘不能は回復できません。' },
    { id: 'sword', name: '剣士', role: '攻め役', hp: 104, startHp: 88, mp: 16, power: 25, color: '#b08082', skill: 'つむじ斬り', cost: 4, kind: 'strike', detail: '敵1体に強い一撃。消費MP 4。', skillPower: 39 }
  ],
  items: [
    {id:'potion',name:'回復薬',description:'仲間1人のHPを45回復します。',effect:'restoreHp',amount:45,count:2}
  ],
  questions: [
    { id:'area', unit:'面積', text:'たて 6cm、横 8cm の長方形。面積は何cm²？', choices:['14cm²','28cm²','48cm²','64cm²'], answer:2, explanation:'長方形の面積は「たて × 横」。6 × 8 ＝ 48 なので、48cm²です。', hint:'長さを足すのではなく、たてと横をかけます。', diagram:'rectangle' },
    { id:'division', unit:'わり算', text:'84このクッキーを、4人で同じ数ずつ分けます。1人分は何こ？', choices:['20こ','21こ','22こ','24こ'], answer:1, explanation:'84 ÷ 4 ＝ 21。80 ÷ 4 ＝ 20 と、4 ÷ 4 ＝ 1 を合わせても求められます。', hint:'80こと4こに分けて考えてみよう。' },
    { id:'angle', unit:'角の大きさ', text:'まっすぐな角180°から、65°を引いた残りの角は何度？', choices:['105°','115°','125°','135°'], answer:1, explanation:'まっすぐな角は180°です。180 − 65 ＝ 115 なので、残りは115°です。', hint:'180から65を引きます。' },
    { id:'decimal', unit:'小数', text:'1.5L の水に 0.8L の水を足します。全部で何L？', choices:['1.13L','2.1L','2.3L','2.5L'], answer:2, explanation:'小数点の位置をそろえて足します。1.5 ＋ 0.8 ＝ 2.3Lです。', hint:'0.1Lが15こ分と、8こ分あります。' },
    { id:'fraction', unit:'分数', text:'1/5 ＋ 2/5 は、いくつ？', choices:['3/10','2/5','3/5','4/5'], answer:2, explanation:'同じ分母の分数は、分母を変えずに分子を足します。1 ＋ 2 ＝ 3 で、3/5です。', hint:'1/5が合わせて何こ分になるかを考えよう。' },
    { id:'large', unit:'大きな数', text:'1万を 36こ 集めた数は、いくつ？', choices:['3万6000','36万','360万','3600万'], answer:1, explanation:'1万が36こなので36万です。数字では360,000と書きます。', hint:'「万」を単位にして考えよう。' },
    { id:'round', unit:'およその数', text:'3478を四捨五入して、百の位までのがい数にすると？', choices:['3400','3470','3500','4000'], answer:2, explanation:'百の位までにするので、十の位の7を見ます。5以上だから切り上げて3500です。', hint:'残したい位の、ひとつ右の数字を見ます。' },
    { id:'order', unit:'計算のきまり', text:'7 ＋ 3 × 4 の答えは？', choices:['19','28','31','40'], answer:0, explanation:'かけ算を先に計算します。3 × 4 ＝ 12、そのあと7を足すので19です。', hint:'足し算とかけ算、先に計算するのはどちらかな？' },
    { id:'square', unit:'面積', text:'1辺が 9cm の正方形。面積は何cm²？', choices:['18cm²','36cm²','72cm²','81cm²'], answer:3, explanation:'正方形の面積は「1辺 × 1辺」。9 × 9 ＝ 81cm²です。', hint:'正方形は、たても横も9cmです。' },
    { id:'remainder', unit:'あまりのあるわり算', text:'53まいのカードを、6まいずつ配ります。何人に配れて、何まい余る？', choices:['8人、5まい','8人、6まい','9人、1まい','9人、5まい'], answer:0, explanation:'6 × 8 ＝ 48、53 − 48 ＝ 5。8人に配れて、5まい余ります。', hint:'6 × 9だと54になり、53まいでは足りません。' },
    { id:'time', unit:'時間', text:'午前9時35分から、50分たつと何時何分？', choices:['午前10時15分','午前10時25分','午前10時35分','午前10時45分'], answer:1, explanation:'午前10時まで25分。残りの25分を足すので、午前10時25分です。', hint:'まず、午前10時まで何分かを考えよう。' },
    { id:'unit', unit:'長さの単位', text:'2km 350m は、何m？', choices:['235m','2035m','2350m','2500m'], answer:2, explanation:'1kmは1000mです。2000m ＋ 350m ＝ 2350mです。', hint:'2kmをmに直してから足します。' }
  ]
});
