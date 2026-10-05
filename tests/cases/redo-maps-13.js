'use strict';
const crypto=require('node:crypto'),dem=require('../fixtures/kanto-plain-dem.json');
const {inside}=require('../lib/social-map-geometry');
module.exports=({test,FF,ctx,assert,plain})=>{
 const ids=['geography_005','geography_008','pioneer_010'].map(s=>'social_g4_hand_'+s);
 const all=plain(ctx.QUESTION_BANK.filter(q=>q.collection==='hand_soc4'));
 const get=s=>all.find(q=>q.id==='social_g4_hand_'+s).diagram;
 const hash=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
 test('第13弾：3問のdiagramだけを変更・ほかの294問と全問題本文を固定',()=>{
  assert.equal(all.length,297);assert.equal(all.filter(q=>!ids.includes(q.id)).length,294);
  assert.equal(hash(all.filter(q=>!ids.includes(q.id))),'625e441084743719fec0ae819bbc302f03a59a30b4c3b2787c5e384da8207e66');
  assert.equal(hash(all.map(q=>{const r={...q};delete r.diagram;return r;})),'ca40e5b1247f6446217b4b362c74be93502c6f88f1ace947b4bce419d64cf8ac');
  assert.equal(hash(plain(FF.japanMapData.coasts)),'ad3a5d69a5a2899f1ead5e424dcaaf2b2c8e40aae180436674f95ddc3797da07');
  const bank=FF.learning.createBank(ctx.QUESTION_BANK);
  for(const id of ids){const q=all.find(q=>q.id===id);assert.ok(q.diagram.caption);assert.ok(!q.diagram.caption.includes(q.answer));if(bank.byId[id+'#input'])assert.deepEqual(plain(bank.byId[id+'#input'].diagram),q.diagram);}
 });
 test('第13弾：九州は火山1つだけで県の丸を描かない',()=>{
  const d=get('geography_008');assert.deepEqual(d.marks,[]);assert.deepEqual(d.areas,[]);assert.deepEqual(d.routes,[]);assert.deepEqual(d.mountain,[131.104,32.884]);
 });
 test('第13弾：低地は標高タイル由来の閉じた多角形・参照点を含み山側を除外',()=>{
  const d=get('geography_005'),ps=d.areas[0];assert.equal(d.areas.length,1);assert.equal(ps.length,1229);assert.deepEqual(ps[0],ps.at(-1));assert.deepEqual(d.marks,[]);assert.deepEqual(d.routes,[]);
  assert.equal(dem.threshold,100);assert.equal(dem.slopeDegrees,3);assert.equal(dem.tiles.length,49);assert.equal(dem.tiles.filter(t=>!t.missing).length,48);
  for(const t of dem.tiles)assert.ok(t.missing||/^[a-f0-9]{64}$/.test(t.sha256));
  for(const p of dem.references)assert.equal(inside(p.point,ps),p.within,p.id);
  for(const p of ps){assert.equal(p.length,2);assert.ok(p.every(Number.isFinite));assert.ok(p[0]>=d.bounds[0]&&p[0]<=d.bounds[2]&&p[1]>=d.bounds[1]&&p[1]<=d.bounds[3]);}
 });
 test('第15弾：疏水は地図をやめて、まちへ水を引く絵',()=>{
  const d=get('pioneer_010');
  assert.equal(d.kind,'image');
  assert.equal(d.src,'img/diagrams/soc4_pioneer_010.webp');
  assert.equal(d.caption,'山をぬけて、まちへ水を引く水路');
  assert.equal(d.study,true);
  assert.ok(!d.caption.includes('琵琶湖疏水')&&!d.alt.includes('琵琶湖疏水'));
 });
};
