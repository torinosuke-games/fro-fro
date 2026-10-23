// 解説づくりの材料：自動生成以外の全問題を、教科・学年・単元の順に N 個のかたまりに分けて JSON に書く（判断497）。
// 使い方：node tests/tools/dump-explain-chunks.cjs <出力フォルダ> [N]
const L=require('../lib/loader.js');const fs=require('fs'),path=require('path');
const c=L.load(L.LOGIC_FILES_WITH_FIXES),U=c.FF.util;const out=process.argv[2],N=+(process.argv[3]||20);fs.mkdirSync(out,{recursive:true});
const B=c.QUESTION_BANK.filter(q=>!q.id.startsWith('gen_')).sort((a,b)=>(a.subject+a.gradeLevel+a.unit+a.id).localeCompare(b.subject+b.gradeLevel+b.unit+b.id));
const rows=B.map(q=>({id:q.id,subject:q.subject,grade:q.gradeLevel,unit:q.unit,type:q.answerType,question:q.question,answer:q.answer,choices:q.choices||null,hints:q.hints,explanation:q.explanation,figure:q.diagram?(q.diagram.caption||q.diagram.kind):null}));
const k=Math.ceil(rows.length/N);for(let i=0;i<N;i++){fs.writeFileSync(path.join(out,'chunk_'+i+'.json'),JSON.stringify(rows.slice(i*k,(i+1)*k),null,1));console.log(i,rows.slice(i*k,(i+1)*k).length,rows[i*k]&&rows[i*k].id);}
