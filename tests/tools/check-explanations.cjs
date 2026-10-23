// 解説の下書き（{ID: 解説} の JSON）の点検（判断497）。node tests/tools/check-explanations.cjs <下書き.json> [材料のchunk.json]
// 見る点：ID があるか／選択問題は、正解以外の選択肢の言葉・数がすべて解説に出てくるか／長さ／ふりがなの記法のこわれ
const L=require('../lib/loader.js');const fs=require('fs');
const c=L.load(L.LOGIC_FILES_WITH_FIXES),U=c.FF.util;const draft=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const by={};c.QUESTION_BANK.forEach(q=>by[q.id]=q);
const ids=process.argv[3]?JSON.parse(fs.readFileSync(process.argv[3],'utf8')).map(r=>r.id):Object.keys(draft);
const plain=s=>U.plainText(String(s)).replace(/\s+/g,'');
let ng=0;const say=(id,m)=>{ng++;console.log(id+': '+m);};
ids.forEach(id=>{const q=by[id],e=draft[id];
 if(!q){say(id,'問題がない');return;}if(typeof e!=='string'||!e.trim()){say(id,'解説がない');return;}
 const pe=plain(e);
 if(e.length>800)say(id,'長すぎる（'+e.length+'字）');if(e.length<50)say(id,'短すぎる（'+e.length+'字）');
 if(/undefined|NaN|\[object/.test(e))say(id,'変な文字');
 if((e.match(/\{/g)||[]).length!==(e.match(/\}/g)||[]).length||/\{[^{}|]*\}/.test(e))say(id,'ふりがなの記法がこわれている');
 if(q.answerType==='choice'){q.choices.filter(x=>x!==q.answer).forEach(x=>{const p=plain(x);if(p&&!pe.includes(p))say(id,'誤答「'+p.slice(0,20)+'」が解説に出てこない');});
  if(!pe.includes(plain(q.answer).slice(0,12)))say(id,'正解が解説に出てこない');}
});
console.log(ng?('問題あり '+ng+' 件'):'OK（'+ids.length+'問）');process.exit(ng?1:0);
