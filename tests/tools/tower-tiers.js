// 防衛戦の勝ちやすさを、育ち具合（0：レベル1・装備なし／1：レベル6／2：レベル10・応援・住宅5／3：さらに全員が最強の装備／4：さらに中央炉 Lv10＝町の力）ごとに調べる（判断463）。使い方：node tests/tools/tower-tiers.js 10 20 2,3
const { load } = require('../lib/loader');
const { play } = require('../lib/tower-bot');
const FF = load().FF; const T=FF.balance.TOWER;
const IDS=['juushouhei','shiromadoushi','kenshi','senshi','kuromadoushi','gakusha','shisho','touzoku','yumitsukai'];
function st(tier){const s=FF.state.createDefaultState(1790000000000);
 s.adventure.recruited=IDS.slice();
 if(tier>=1){const xp=tier===1?600:2000;IDS.forEach(i=>s.adventure.roster[i].xp=xp);}
 if(tier>=2){s.buildings.housing.level=5;s.quests=FF.quests.create();s.quests.trust={baker:15,woodcutter:15,hunter:15,nurse:15,child:15,elder:15};}
 if(tier>=3){s.equipment={owned:IDS.map(_=>'flame_sword'),ownedArmor:IDS.map(_=>'steel_armor'),equipped:{}};IDS.forEach(i=>s.equipment.equipped[i]={weapon:'flame_sword',armor:'steel_armor'});}
 if(tier>=4){s.buildings.furnace.level=10;}
 return s;}
module.exports={st,IDS};
if(require.main===module){
 const from=+process.argv[2]||1,to=+process.argv[3]||10;
 for(const tier of (process.argv[4]||"2,3").split(",").map(Number)){const row=[];for(let d=from;d<=to;d++){let w=0,N=12;for(let seed=1;seed<=N;seed++){if(play(FF,st(tier),{difficulty:d,seed,acc:1,fill:!!process.env.FILL}).result==='win')w++;}row.push(`${d}:${Math.round(100*w/N)}`)}console.log('tier',tier,row.join(' '));}
}
