// 解説の下書き（out_*.json）を、questions/explanations.js にまとめる（判断497）。node tests/tools/build-explanations.cjs <下書きのフォルダ>
const fs=require('fs'),path=require('path');const dir=process.argv[2];
const all={};fs.readdirSync(dir).filter(f=>/^out_\d+\.json$/.test(f)).sort().forEach(f=>Object.assign(all,JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'))));
const ids=Object.keys(all).sort();
const body=ids.map(id=>'  '+JSON.stringify(id)+':'+JSON.stringify(all[id])).join(',\n');
fs.writeFileSync(path.join(__dirname,'..','..','questions','explanations.js'),`// 解説の充実（判断497）：全問題（算数の自動生成を除く）の解説を、正解の理由と「ほかの選択肢」の説明つきで書きなおしたもの。
// 問題・答え・選択肢・ヒントは変えない。このファイルは tests/tools/build-explanations.cjs が作る（直接は書き換えない。直すときは、もとの下書きか、このファイルの該当 ID の行を直す）。
(function(root){
  'use strict';
  var bank=root.QUESTION_BANK=root.QUESTION_BANK||[];
  var EXPLANATIONS={
${body}
  };
  bank.forEach(function(q){if(EXPLANATIONS[q.id])q.explanation=EXPLANATIONS[q.id];});
})(window);
`);
console.log(ids.length+'問');
