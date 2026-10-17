// 夜の防衛戦の画面（判断442・443、SPEC_tower.md 第8章）：Canvas で戦場を描く。戦いの計算は js/tower.js（純粋関数）。ここは、結果を描いて、操作を受けるだけ。
// 戦いの途中の状態（cur）は、保存しない。別の画面へ行くと、一時停止になる（戻ると、つづけるか、あきらめるかを選ぶ）。
(function (root) {
  'use strict';
  var FF = root.FF, U = FF.ui, E = U.el, X = FF.tower, TT = FF.texts.tower;
  var W = 1440, H = 800, CELL = 160, DIR = 'img/adventure/tower/';
  var LANE_Y = [100, 250, 400, 555, 705], BASE_H = 800, cache = { n: 5, field: null, core: {} };   // 背景の絵の、5本の道の中心（絵に合わせた高さ）。LANE_Y・H は、レーン数に合わせて、useLayout が切りかえる
  // レーンの数（試作。判断458）：5レーンの絵を、つなぎ足して、6レーン以上の戦場にする。背景は、2本目と3本目の道のあいだの1本ぶん（150px）を、道の中心でつなぎ足す。中央炉は、火口1つぶん（160px）を、足す
  function useLayout(n) {
    n = Math.max(5, n | 0); var k = n - 5, y = [100, 250, 400];
    for (var j = 1; j <= k; j++) y.push(400 + 150 * j);
    y.push(555 + 150 * k, 705 + 150 * k);
    LANE_Y = y; H = BASE_H + 150 * k; cache = { n: n, field: null, core: {} };
  }
  function composite(src, k, h0, cutA, bandH, bandSrcY, outScale) {   // src を、縦に、k 回つなぎ足した絵（offscreen canvas）
    var c = root.document.createElement('canvas'), w = src.naturalWidth, sc = src.naturalHeight / h0, g;
    c.width = w; c.height = Math.round((h0 + bandH * k) * sc); g = c.getContext('2d');
    g.drawImage(src, 0, 0, w, cutA * sc, 0, 0, w, cutA * sc);
    for (var j = 0; j < k; j++) g.drawImage(src, 0, bandSrcY * sc, w, bandH * sc, 0, (cutA + bandH * j) * sc, w, bandH * sc);
    g.drawImage(src, 0, cutA * sc, w, (h0 - cutA) * sc, 0, (cutA + bandH * k) * sc, w, (h0 - cutA) * sc);
    return c;
  }
  function fieldImg() {
    var im = images().field, k = cache.n - 5;
    if (!k) return im;
    if (!ready(im)) return null;
    return cache.field || (cache.field = composite(im, k, 800, 400, 150, 250));
  }
  function coreImg(key) {
    var im = images()[key], k = cache.n - 5;
    if (!k || !ready(im)) return im;
    return cache.core[key] || (cache.core[key] = composite(im, k, 800, 320, 160, 160));
  }
  var ENEMY_BOX = { cub: [0, 550, 340, 405, 115], wolf: [337, 278, 497, 675, 155], boss: [829, 20, 707, 940, 225], spirit: [179, 306, 411, 624, 155, 'e2'], giant: [812, 79, 681, 851, 225, 'e2'] };   // 6つ目：絵のシート（なければ snow-enemies.webp。'e2' は enemies-2.webp＝氷の精霊・雪の巨人。判断455）   // snow-enemies.webp の切り出し（x, y, 幅, 高さ）と、戦場での高さ
  var FX = { arrow: [0, 120], ice: [1, 210], heal: [2, 150], spark: [3, 130], smash: [1, 190, 'fx2'] };   // tower-fx.webp の行と、描く大きさ（3つ目：tower-fx-2.webp のシートのとき。凍結は 0行目、壁が壊れるのは 1行目）   // tower-fx.webp の行と、描く大きさ
  var imgs = null, cur = null, token = 0, refs = null;

  function bal() { return FF.balance.TOWER; }
  function loadImg(url) { var i = new Image(); i.src = url; return i; }
  function images() {
    if (imgs) return imgs;
    imgs = { field: loadImg(DIR + 'tower-field.webp'), core1: loadImg(DIR + 'tower-core-1.webp'), core2: loadImg(DIR + 'tower-core-2.webp'), core3: loadImg(DIR + 'tower-core-3.webp'),
      fx: loadImg(DIR + 'tower-fx.webp'), fx2: loadImg(DIR + 'tower-fx-2.webp'), enemies2: loadImg(DIR + 'enemies-2.webp'), enemies: loadImg('img/adventure/snow-enemies.webp'), allies: {} };
    return imgs;
  }
  function allyImg(id) {
    var im = images(), jh = FF.app.state.player.grade >= 7, key = id + (jh ? '-jh' : '-el');
    if (!im.allies[key]) im.allies[key] = loadImg('img/adventure/allies/' + key + '.webp');
    return im.allies[key];
  }
  function ready(i) { return !!i && (i.getContext ? i.width > 0 : i.complete && i.naturalWidth > 0); }   // 絵、または、つなぎ足した offscreen canvas
  function memberName(id) { var m = FF.texts.adventure && FF.texts.adventure.members && FF.texts.adventure.members[id]; return m ? U.plain(m.name) : id; }
  function laneAt(y) { var best = 0; for (var i = 1; i < LANE_Y.length; i++) if (Math.abs(LANE_Y[i] - y) < Math.abs(LANE_Y[best] - y)) best = i; return best; }
  function snd(name) { if (FF.towerSound && FF.towerSound[name]) FF.towerSound[name](); }
  function fill(t, vars) { return Object.keys(vars).reduce(function (s, k) { return s.split('{' + k + '}').join(vars[k]); }, t); }

  // ---- 住民の応援（判断456） ----
  function whoName(id) { return FF.texts.quest.who[id] || id; }
  function cheerText(id) {
    var C = bal().CHEER[id], v = { light: C.light, hp: Math.round((C.hp || 0) * 100), every: C.every, damage: C.damage, heal: Math.round((C.heal || 0) * 100), core: C.core };
    return fill(TT.cheer[id], v);
  }

  // ---- 戦いを始める・進める ----
  function begin(difficulty, mode, lanes) {
    var a = FF.app, seed = Math.floor(a.now() / 1000) % 1000003, bt = X.create(a.state, { difficulty: difficulty, seed: seed, mode: mode === 'raid' ? 'raid' : 'practice', lanes: lanes }), first = Object.keys(bt.defs)[0];
    cur = { bt: bt, paused: false, speed: 1, sel: first ? { kind: 'card', id: first } : null, fx: [], prev: { cd: {}, hp: {}, kills: 0, core: bt.core.hp, wave: 0 }, acc: 0, flash: 0, finished: false, last: null, fresh: true, quizOpen: false, reward: null };
  }
  function playing() { return !!(cur && cur.bt && !cur.bt.result && !cur.paused && !cur.quizOpen); }
  U.towerPlaying = playing;
  U.towerActive = function () { return !!(cur && cur.bt && !cur.bt.result); };   // 戦いの途中（BGM を流すあいだ）
  U.towerQuiet = function () { return !!(cur && cur.bt && !cur.bt.result && (cur.quizOpen || cur.paused)); };   // 問題・一時停止のあいだは、BGM を小さくする
  function bgmSync() { if (FF.bgm) FF.bgm.sync(); }
  U.towerFx = function () { return cur ? cur.fx.length : 0; };   // 確認用
  U.towerBattle = function () { return cur && cur.bt; };   // 確認用（テストが、戦いを早送りするのに使う）

  function addFx(kind, x, y, opt) { cur.fx.push(Object.assign({ kind: kind, x: x, y: y, t: 0, dur: 0.3 }, opt || {})); }
  // 計算は、効果の合図を出さないので、前の状態との違いから、攻撃・回復・被弾・倒れたことを見つけて、絵と音を出す
  function watch() {
    var bt = cur.bt, p = cur.prev, hit = false;
    bt.units.forEach(function (u) {
      var d = bt.defs[u.member], was = p.cd[u.id], hp = p.hp[u.id];
      // 本当に攻撃したときだけ（攻撃の間隔ぶん、待ち時間が戻る）。何もすることがなくて、待ち時間が 0.1 や 0.3 に戻っただけのときは、効果を出さない
      if (was !== undefined && u.cd > was + 0.01 && d.atk > 0 && u.cd >= d.interval - 0.05) {
        var tg = null, bd = 1e9;
        bt.enemies.forEach(function (e) { var dx = e.x - (u.col + 0.5); if (e.lane === u.lane && dx > -0.3 && dx <= d.range + 0.01 && dx < bd) { tg = e; bd = dx; } });
        if (d.role === 'healer') addFx('heal', (u.col + 0.5) * CELL, LANE_Y[u.lane] + 30, { dur: 0.6 });
        else if (tg) {
          hit = true;
          if (d.role === 'ranged') addFx('arrow', (u.col + 0.5) * CELL, LANE_Y[u.lane] - 20, { toX: tg.x * CELL, toY: LANE_Y[tg.lane] - 30, dur: 0.22 });
          else if (d.role === 'mage') addFx('ice', tg.x * CELL, LANE_Y[tg.lane] - 20, { dur: 0.5 });
          else addFx('spark', tg.x * CELL, LANE_Y[tg.lane] - 30, { dur: 0.25 });
        }
      }
      if (hp !== undefined && u.hp < hp - 0.01) {
        var big = bt.enemies.some(function (e) { return e.type === 'giant' && e.lane === u.lane && Math.abs(e.x - (u.col + 0.5)) < 1.3; });   // 雪の巨人に殴られたら、岩と雪が飛び散る
        addFx(big ? 'smash' : 'spark', (u.col + 0.5) * CELL, LANE_Y[u.lane] - 20, { dur: big ? 0.45 : 0.25 });
      }
      p.cd[u.id] = u.cd; p.hp[u.id] = u.hp;
    });
    (bt.cheerLog || []).slice(p.cheerSeen || 0).forEach(function (ev) {   // 住民の応援（矢・手当て）：絵と知らせを出す
      if (ev.who === 'hunter') {
        for (var ln = 0; ln < bt.lanes; ln++) { var fr = null; bt.enemies.forEach(function (e) { if (e.lane === ln && (!fr || e.x < fr.x)) fr = e; }); if (fr) addFx('arrow', fr.x * CELL - 60, LANE_Y[ln] - 140, { toX: fr.x * CELL, toY: LANE_Y[ln] - 30, dur: 0.3 }); }
      } else bt.units.forEach(function (u) { addFx('heal', (u.col + 0.5) * CELL, LANE_Y[u.lane] + 30, { dur: 0.6 }); });
      U.toast(TT.cheerEvent[ev.who]);
    });
    p.cheerSeen = (bt.cheerLog || []).length;
    if (bt.kills > p.kills) { snd('kill'); p.kills = bt.kills; }
    if (hit) snd('hit');
    if (bt.core.hp < p.core) { snd('coreHit'); cur.flash = 0.35; }
    p.core = bt.core.hp;
    if (bt.wave > p.wave) { snd('wave'); p.wave = bt.wave; }
    var known = {};
    bt.units.forEach(function (u) { known[u.id] = true; });
    Object.keys(p.cd).forEach(function (k) { if (!known[k]) { delete p.cd[k]; delete p.hp[k]; } });
  }
  function advance(dt) {
    var bt = cur.bt, tick = bal().TICK;
    cur.acc += dt * cur.speed;
    while (cur.acc >= tick && !bt.result) { X.step(bt, tick); watch(); cur.acc -= tick; }
    cur.fx.forEach(function (f) { f.t += dt * cur.speed; });
    cur.fx = cur.fx.filter(function (f) { return f.t < f.dur; });
    cur.flash = Math.max(0, cur.flash - dt);
    if (bt.result && !cur.finished) finish();
  }
  function finish() {
    var a = FF.app, bt = cur.bt;
    cur.finished = true; bgmSync();
    snd(bt.result === 'win' ? 'win' : 'lose');
    var r = X.finish(a.state, bt, a.now());
    cur.reward = r.reward;
    var next = r.state;
    if (bt.mode === 'raid' && bt.result === 'win' && FF.quests) next = FF.quests.onRaidWin(next, a.now());   // 住民の依頼「防衛」（判断449）
    if (next !== a.state) a.commit(next);
    showOverlay();
  }

  // ---- 問題（灯） ----
  function rewardText(r) {
    var t = ['+' + U.fmt(r.gold) + ' G'];
    Object.keys(r.res || {}).forEach(function (k) { t.push(U.resDef(k).icon + ' ' + U.fmt(r.res[k])); });
    if (r.potions) t.push('🧪×' + r.potions);
    return t.join('　');
  }
  // 冒険の画面で決めた教科・難しさの、選択問題を出す。正解で灯。解いているあいだは、戦場が止まる。学習の記録・熱量には入らない（出題のかぶりを避ける記録だけ残す）
  function openQuiz() {
    if (!cur || cur.quizOpen || cur.paused || cur.bt.result) return;
    if (!X.canQuiz(cur.bt)) return;
    var a = FF.app, adv = a.state.adventure, q = FF.adventure.pick(a.bank, adv, a.state.player.grade || 1, Math.random, a.now());
    if (!q) { U.toast(TT.quizNone); return; }
    var choices = FF.util.shuffle(q.choices || [], Math.random), done = false;
    cur.quizOpen = true; bgmSync();
    function finishQuiz(selected) {
      if (done) return; done = true;
      var correct = selected != null && FF.answer.judge(q, selected).correct, r = X.answer(cur.bt, correct, adv.difficulty);
      var n = FF.util.clone(a.state); n.adventure.recent = (n.adventure.recent || []).concat([q.id]).slice(-FF.balance.ADVENTURE.RECENT); a.commit(n);
      cur.quizOpen = false; cur.last = null; close(); bgmSync();
      if (correct) { snd('light'); U.toast(fill(TT.quizRight, { n: r.gained })); } else U.toast(TT.quizWrong);
    }
    var body = E('div', { class: 'tw-quiz' }, [E('p', { class: 'tw-quiz-note', rich: TT.quizNote }), E('h3', { class: 'tw-quiz-q', rich: q.question })]);
    if (q.diagram && FF.lessonFigure) body.appendChild(FF.lessonFigure.render(q.diagram));
    body.appendChild(E('div', { class: 'tw-quiz-choices', attrs: { role: 'group' } }, choices.map(function (c, i) {
      return E('button', { class: 'tw-quiz-choice', attrs: { type: 'button', 'data-choice': String(i) }, on: { click: function () { finishQuiz(c); } } },
        [E('span', { class: 'tw-quiz-letter', text: ['A', 'B', 'C', 'D'][i] || '', attrs: { 'aria-hidden': 'true' } }), E('span', {}, [U.rich(c)])]);
    })));
    var close = U.modal({ title: TT.quizTitle, body: body, dismissible: false, buttons: [
      { label: TT.quizDontKnow, class: 'ghost', keepOpen: true, onClick: function () { finishQuiz(null); } },
      { label: TT.quizCancel, class: 'ghost', onClick: function () { done = true; cur.quizOpen = false; cur.last = null; bgmSync(); } }] });
  }

  // ---- 描く ----
  function drawCells(ctx) {
    var bt = cur.bt, T = bal();
    if (!cur.sel || cur.sel.kind !== 'card' || bt.result) return;
    ctx.save();
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,240,190,0.55)';
    for (var l = 0; l < bt.lanes; l++) for (var c = T.PLACE_FROM; c <= T.PLACE_TO; c++) {
      if (X.unitAt(bt, l, c)) continue;
      ctx.fillStyle = X.canPlace(bt, cur.sel.id, l, c).ok ? 'rgba(255,236,170,0.24)' : 'rgba(255,255,255,0.07)';
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(c * CELL + 12, LANE_Y[l] - 62, CELL - 24, 124, 18); else ctx.rect(c * CELL + 12, LANE_Y[l] - 62, CELL - 24, 124);
      ctx.fill(); ctx.stroke();
    }
    var h = cur.hover;   // ドラッグ中に、指のあるマス。指で隠れても分かるように、そのマスの行と列を、細長くひからせ、マスには、置く仲間の絵をうすく出す。置けるなら金色、置けないなら赤
    if (h && h.col >= T.PLACE_FROM && h.col <= T.PLACE_TO && h.lane >= 0 && h.lane < bt.lanes) {
      var ok = X.canPlace(bt, cur.sel.id, h.lane, h.col).ok, tint = ok ? '255,214,90' : '230,80,70', cx = h.col * CELL + 12, cy = LANE_Y[h.lane] - 62;
      ctx.fillStyle = 'rgba(' + tint + ',0.16)';
      ctx.fillRect(CELL * T.PLACE_FROM, cy, CELL * (T.PLACE_TO - T.PLACE_FROM + 1), 124);   // その道（行）
      ctx.fillRect(cx, 0, CELL - 24, H);                                                      // そのマスの列
      ctx.fillStyle = 'rgba(' + tint + ',0.45)'; ctx.strokeStyle = 'rgb(' + tint + ')'; ctx.lineWidth = 7;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(cx, cy, CELL - 24, 124, 18); else ctx.rect(cx, cy, CELL - 24, 124);
      ctx.fill(); ctx.stroke();
      var im = allyImg(cur.sel.id);
      if (ready(im) && !X.unitAt(bt, h.lane, h.col)) { var ih = 150, iw = ih * im.naturalWidth / im.naturalHeight; ctx.globalAlpha = ok ? 0.7 : 0.35; ctx.drawImage(im, (h.col + 0.5) * CELL - iw / 2, LANE_Y[h.lane] + 58 - ih, iw, ih); ctx.globalAlpha = 1; }
    }
    ctx.restore();
  }
  // HP のゲージ。いちばん上の道では、頭の上が画面の外になるので、見える範囲（上から 4px）に収める。スマホでは小さく縮むので、太めに描く
  function bar(ctx, x, y, w, ratio, color) {
    y = Math.max(4, y);
    ctx.fillStyle = 'rgba(20,30,50,0.8)'; ctx.fillRect(x - w / 2, y, w, 16);
    ctx.fillStyle = color; ctx.fillRect(x - w / 2 + 2, y + 2, Math.max(0, (w - 4) * ratio), 12);
  }
  function drawCore(ctx) {
    var c = cur.bt.core, r = c.hp / c.max, i = coreImg(r > 0.6 ? 'core1' : r > 0.3 ? 'core2' : 'core3');
    if (ready(i)) ctx.drawImage(i, 0, 0, CELL, H);
    else { ctx.fillStyle = '#b8622b'; ctx.fillRect(0, 0, CELL, H); }
    if (cur.flash > 0) { ctx.fillStyle = 'rgba(255,70,50,' + (cur.flash / 0.35 * 0.35) + ')'; ctx.fillRect(0, 0, CELL, H); }
  }
  function drawUnit(ctx, u) {
    var i = allyImg(u.member), cx = (u.col + 0.5) * CELL, base = LANE_Y[u.lane] + 60, h = 170;
    ctx.fillStyle = 'rgba(10,20,40,0.28)'; ctx.beginPath(); ctx.ellipse(cx, base - 2, 50, 13, 0, 0, Math.PI * 2); ctx.fill();
    if (ready(i)) { var w = h * i.naturalWidth / i.naturalHeight; ctx.drawImage(i, cx - w / 2, base - h, w, h); }
    else { ctx.fillStyle = '#6aa4d8'; ctx.fillRect(cx - 28, base - h, 56, h); }
    if (u.frozen > 0) {   // 凍っている仲間：氷がかたまる→全身が氷→砕ける（tower-fx-2.webp の 0行目）
      var fz = images().fx2, el = bal().ENEMIES.spirit.freeze.dur - u.frozen, fk = el < 0.15 ? 0 : el < 0.3 ? 1 : u.frozen > 0.35 ? 2 : 3;
      if (ready(fz)) ctx.drawImage(fz, fk * 256, 0, 256, 256, cx - 95, base - h / 2 - 105, 190, 190);
    }
    if (u.hp < u.max) bar(ctx, cx, base - h - 14, 90, u.hp / u.max, '#6fd49a');
    if (cur.sel && cur.sel.kind === 'unit' && cur.sel.uid === u.id) { ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 5; ctx.strokeRect(cx - 70, LANE_Y[u.lane] - 66, 140, 132); }
  }
  function drawEnemy(ctx, e) {
    var b = ENEMY_BOX[e.type] || ENEMY_BOX.cub, i = b[5] === 'e2' ? images().enemies2 : images().enemies, cx = e.x * CELL, base = LANE_Y[e.lane] + 60, h = b[4], w = h * b[2] / b[3];
    ctx.fillStyle = 'rgba(10,20,40,0.3)'; ctx.beginPath(); ctx.ellipse(cx, base - 3, w * 0.42, 12, 0, 0, Math.PI * 2); ctx.fill();
    if (ready(i)) ctx.drawImage(i, b[0], b[1], b[2], b[3], cx - w / 2, base - h, w, h);
    else { ctx.fillStyle = '#c0504a'; ctx.fillRect(cx - 30, base - h, 60, h); }
    if (e.hp < e.max) bar(ctx, cx, base - h - 12, Math.max(80, w * 0.8), e.hp / e.max, '#ee6a5a');
  }
  function drawFx(ctx) {
    cur.fx.forEach(function (f) {
      var row = FX[f.kind][0], size = FX[f.kind][1], k = Math.min(3, Math.floor(f.t / f.dur * 4)), x = f.x, y = f.y, i = FX[f.kind][2] === 'fx2' ? images().fx2 : images().fx;
      if (f.kind === 'arrow') { var q = Math.min(1, f.t / f.dur); x = f.x + (f.toX - f.x) * q; y = f.y + (f.toY - f.y) * q; }
      if (ready(i)) ctx.drawImage(i, k * 256, row * 256, 256, 256, x - size / 2, y - size / 2, size, size);
      else { ctx.fillStyle = 'rgba(255,230,150,0.8)'; ctx.fillRect(x - 6, y - 6, 12, 12); }
    });
  }
  function draw() {
    var ctx = cur.canvas.getContext('2d'), im = images(), list = [];
    ctx.clearRect(0, 0, W, H);
    var fi = fieldImg();
    if (fi && (fi.complete === undefined || fi.complete)) ctx.drawImage(fi, 0, 0, W, H);
    else { ctx.fillStyle = '#cfe0f0'; ctx.fillRect(0, 0, W, H); }
    drawCore(ctx);
    drawCells(ctx);
    cur.bt.units.forEach(function (u) { list.push({ y: LANE_Y[u.lane], z: 0, f: function () { drawUnit(ctx, u); } }); });
    cur.bt.enemies.forEach(function (e) { list.push({ y: LANE_Y[e.lane], z: 1, f: function () { drawEnemy(ctx, e); } }); });
    list.sort(function (a, b) { return a.y - b.y || a.z - b.z; }).forEach(function (o) { o.f(); });
    drawFx(ctx);
  }

  // ---- 画面の部品 ----
  function button(label, cls, fn, attrs) { return E('button', { class: 'rn-button ' + (cls || ''), rich: label, attrs: Object.assign({ type: 'button' }, attrs || {}), on: { click: fn } }); }

  function renderStart(main) {
    var s = FF.app.state, max = X.practiceMax(s), picked = Math.min(max, X.raidDifficulty(s)), ids = X.roster(s), opts = [];
    for (var d = 1; d <= max; d++) opts.push(E('option', { text: fill(U.plain(TT.level), { n: d }), attrs: { value: String(d) } }));
    var sel = E('select', { class: 'tw-select', attrs: { 'aria-label': U.plain(TT.difficulty) } }, opts);
    sel.value = String(picked);
    var lanesSel = E('select', { class: 'tw-select', attrs: { 'aria-label': U.plain(TT.lanes) } }, bal().LANES_CHOICES.map(function (n) { return E('option', { text: fill(U.plain(TT.lanesN), { n: n }), attrs: { value: String(n) } }); }));
    lanesSel.value = String(bal().LANES);
    var a = FF.app, fresh = X.today(s, a.now());
    if (fresh !== s) { a.commit(fresh); s = a.state; }
    var rd = X.raidDifficulty(s), left = X.raidsLeft(s, a.now()), rw = X.rewardFor(s, rd, a.now());
    var raid = E('div', { class: 'tw-raid' }, [
      E('strong', { rich: TT.raid }), E('p', { class: 'tw-note', rich: TT.raidLead }),
      E('p', { class: 'tw-raid-meta' }, [E('span', { class: 'tw-badge', rich: fill(TT.level, { n: rd }) }), E('span', { rich: left ? fill(TT.raidLeft, { n: left }) : TT.raidNone })]),
      E('p', { class: 'tw-reward' }, [E('span', { rich: TT.raidReward }), E('b', { text: ' ' + rewardText(rw) })]),
      rw.first && left ? E('p', { class: 'tw-note', rich: TT.raidFirst }) : null,
      button(TT.raidStart, 'primary', function () { begin(rd, 'raid'); U.rerender(); }, ids.length ? { 'data-act': 'raid' } : { 'data-act': 'raid', disabled: 'true' })
    ]);
    var pop = FF.buildings.population(s), pm = X.popMult(s);
    var cheerIds = X.cheers(s);
    var cheer = E('div', { class: 'tw-cheerbox' }, [E('strong', { rich: TT.cheerTitle })].concat(cheerIds.length ?
      cheerIds.map(function (id) { return E('div', { class: 'tw-cheer-row', attrs: { 'data-who': id } }, [U.residentFace(id, 'qt-face'), E('div', {}, [E('b', { rich: whoName(id) }), E('span', { rich: cheerText(id) })])]); }) :
      [E('p', { class: 'tw-note', rich: TT.cheerNone })]));
    main.appendChild(E('section', { class: 'tw-start panel' }, [
      E('h1', { class: 'tw-h1', rich: TT.title }),
      E('p', { class: 'tw-lead', rich: TT.lead }),
      raid,
      E('p', { class: 'tw-pop', rich: fill(TT.popLine, { n: pop.total, m: (Math.round(pm * 100) / 100).toFixed(2).replace(/0$/, '') }) }),
      cheer,
      E('h2', { class: 'tw-h2', rich: TT.howTitle }),
      E('ul', { class: 'tw-how' }, TT.how.map(function (t) { return E('li', { rich: t }); })),
      E('div', { class: 'tw-pick' }, [E('strong', { rich: TT.practice }), E('label', { class: 'tw-label' }, [E('span', { rich: TT.difficulty }), sel]), E('label', { class: 'tw-label' }, [E('span', { rich: TT.lanes }), lanesSel])]),
      E('p', { class: 'tw-note', rich: TT.practiceNote }),
      ids.length ? null : E('p', { class: 'tw-note', rich: TT.noMember }),
      E('p', { class: 'tw-note', rich: fill(TT.record, { n: (s.tower && s.tower.wins) || 0 }) }),
      E('div', { class: 'tw-actions' }, [
        button(TT.start, '', function () { begin(+sel.value, 'practice', +lanesSel.value); U.rerender(); }, ids.length ? { 'data-act': 'start' } : { 'data-act': 'start', disabled: 'true' }),
        button(TT.back, '', function () { U.show('base'); }, { 'data-act': 'back' })
      ])
    ]));
  }

  function renderBattle(main) {
    var bt = cur.bt, T = bal(), my = ++token;
    useLayout(bt.lanes);
    var canvas = E('canvas', { class: 'tw-canvas', style: { aspectRatio: W + ' / ' + H }, attrs: { width: String(W), height: String(H), role: 'img', 'aria-label': U.plain(TT.title) } });
    cur.canvas = canvas;
    var wave = E('span', { class: 'tw-val' }), coreFill = E('i'), coreTxt = E('span', { class: 'tw-val' }), lightTxt = E('strong', { class: 'tw-val' });
    var overlay = E('div', { class: 'tw-overlay', attrs: { hidden: 'true' } }), info = E('div', { class: 'tw-info' }), cards = {};
    function cellAt(ev) {
      var r = canvas.getBoundingClientRect();
      if (ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) return null;
      return { col: Math.floor((ev.clientX - r.left) / r.width * W / CELL), lane: laneAt((ev.clientY - r.top) / r.height * H) };
    }
    function placeAt(id, lane, col) {
      var res = X.place(cur.bt, id, lane, col);
      if (res.ok) { snd('place'); addFx('spark', (col + 0.5) * CELL, LANE_Y[lane] - 10, { dur: 0.25 }); }
      else U.toast(TT.cannot[res.reason] || TT.cannot.cell);
    }
    // カードをドラッグして、マスにはなして置く（押して選んで、マスを押す操作も、そのまま使える）。横にさわると、カードの列が動く（ブラウザが取るので、ドラッグは取り消し）
    function dragCard(ev, id, art) {
      if (ev.button > 0 || !cur || cur.paused || cur.bt.result) return;
      var sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
      function end() {
        ['pointermove', 'pointerup', 'pointercancel'].forEach(function (n, i) { root.document.removeEventListener(n, [move, up, cancel][i]); });
        if (ghost) ghost.remove();
        if (cur) cur.hover = null;
      }
      function move(e) {
        if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) < 10) return;
        moved = true;
        if (!ghost) { ghost = E('img', { class: 'tw-ghost', attrs: { src: art.src, alt: '', draggable: 'false' } }); root.document.body.appendChild(ghost); }
        ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px';
        cur.sel = { kind: 'card', id: id }; cur.hover = cellAt(e);
        ghost.style.display = cur.hover ? 'none' : '';   // 戦場の上では、絵は出さない（上のマスにかぶって、そこが空いているか分からなくなる）。マスに、うすい絵が出る
        draw();
      }
      function up(e) {
        var c = moved && cur && !cur.paused && !cur.bt.result ? cellAt(e) : null;
        end();
        if (!cur || !moved) return;
        if (c && c.col >= T.PLACE_FROM && c.col <= T.PLACE_TO) { if (!X.unitAt(cur.bt, c.lane, c.col)) placeAt(id, c.lane, c.col); else U.toast(TT.cannot.occupied); }
        syncInfo(); syncCards(); draw();
      }
      function cancel() { end(); if (cur) draw(); }
      root.document.addEventListener('pointermove', move); root.document.addEventListener('pointerup', up); root.document.addEventListener('pointercancel', cancel);
    }
    var cardRow = E('div', { class: 'tw-cards', attrs: { role: 'group' } }, Object.keys(bt.defs).map(function (id) {
      var cost = E('span', { class: 'tw-cost' }), art = E('img', { class: 'tw-card-img', attrs: { src: allyImg(id).src, alt: '', draggable: 'false' } });
      var b = E('button', { class: 'tw-card', attrs: { type: 'button', 'data-member': id }, on: { click: function () { cur.sel = { kind: 'card', id: id }; syncInfo(); syncCards(); draw(); }, pointerdown: function (ev) { dragCard(ev, id, art); } } },
        [art, E('span', { class: 'tw-card-name', text: memberName(id) }), cost]);
      cards[id] = { el: b, cost: cost, last: null };
      return b;
    }));
    var pauseBtn = button(TT.pause, 'tw-small', function () { if (!cur.bt.result) { cur.paused = !cur.paused; showOverlay(); bgmSync(); } }, { 'data-act': 'pause' });
    var speedBtn = button('×1', 'tw-small', function () { cur.speed = cur.speed === 1 ? 2 : 1; }, { 'data-act': 'speed' });
    var quizBtn = button(TT.quiz, 'tw-small tw-quiz-btn', function () { openQuiz(); }, { 'data-act': 'quiz' });
    var quitBtn = button(TT.quit, 'tw-small ghost', function () {
      if (cur.bt.result) { cur = null; U.show('base'); return; }
      cur.paused = true; showOverlay(); bgmSync();
      U.modal({ title: TT.title, body: E('p', { rich: TT.quitAsk }), buttons: [{ label: U.plain(TT.quitYes), class: 'primary', onClick: function () { cur = null; U.rerender(); } }, { label: U.plain(TT.quitNo), class: 'ghost' }] });
    }, { 'data-act': 'quit' });
    var tools = [pauseBtn, speedBtn, quizBtn];
    if (FF.debugMode) tools.push(button(TT.debugLight, 'tw-small', function () { cur.bt.light = Math.min(T.LIGHT.MAX, cur.bt.light + 50); }, { 'data-act': 'debug-light' }));
    tools.push(quitBtn);
    main.appendChild(E('section', { class: 'tw-screen', attrs: { 'data-difficulty': String(bt.difficulty) } }, [
      E('div', { class: 'tw-top' }, [
        E('div', { class: 'tw-stat' }, [E('span', { class: 'tw-lbl', rich: TT.wave }), wave]),
        E('div', { class: 'tw-stat tw-core' }, [E('span', { class: 'tw-lbl', rich: TT.core }), E('span', { class: 'tw-meter' }, [coreFill]), coreTxt]),
        E('div', { class: 'tw-stat' }, [E('span', { class: 'tw-lbl', rich: TT.light }), lightTxt])
      ]),
      bt.cheers && bt.cheers.length ? E('div', { class: 'tw-cheer', attrs: { 'aria-label': U.plain(TT.cheerBar) } }, [E('span', { class: 'tw-lbl', rich: TT.cheerBar })].concat(bt.cheers.map(function (id) { return E('span', { class: 'tw-cheer-face', attrs: { 'data-who': id, title: U.plain(whoName(id)) } }, [U.residentFace(id, 'qt-face')]); }))) : null,
      E('div', { class: 'tw-stage' }, [canvas, overlay]),
      E('div', { class: 'tw-bar' }, tools), info, cardRow
    ]));
    refs = { wave: wave, coreFill: coreFill, coreTxt: coreTxt, lightTxt: lightTxt, overlay: overlay, info: info, cards: cards, pause: pauseBtn, speed: speedBtn, quiz: quizBtn, last: {} };

    canvas.addEventListener('pointerdown', function (ev) {
      if (!cur || my !== token || cur.paused || cur.bt.result) return;
      var r = canvas.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * W, y = (ev.clientY - r.top) / r.height * H;
      var col = Math.floor(x / CELL), lane = laneAt(y), un = X.unitAt(cur.bt, lane, col);
      if (un) cur.sel = { kind: 'unit', uid: un.id };
      else if (cur.sel && cur.sel.kind === 'card' && col >= T.PLACE_FROM && col <= T.PLACE_TO) {
        placeAt(cur.sel.id, lane, col);
      } else cur.sel = null;
      syncInfo(); syncCards(); draw();
    });
    function frame(ts) {
      if (!cur || my !== token) return;   // 描き直しや別の画面で、古くなった
      if (FF.app.screen !== 'tower' || !canvas.isConnected) { if (!cur.bt.result) cur.paused = true; return; }
      var dt = cur.last == null ? 0 : Math.min(0.1, (ts - cur.last) / 1000);
      cur.last = ts;
      if (playing()) advance(dt);
      draw(); syncBar(); syncCards();
      root.requestAnimationFrame(frame);
    }
    syncInfo(); showOverlay(); syncBar(); syncCards(); draw();
    root.requestAnimationFrame(frame);
  }

  function setText(key, node, text) { if (refs.last[key] !== text) { refs.last[key] = text; node.textContent = text; } }
  function syncBar() {
    var bt = cur.bt, c = bt.core, ratio = c.hp / c.max, w = Math.round(100 * ratio) + '%';
    setText('wave', refs.wave, Math.max(1, bt.wave) + '／' + bal().WAVES.length);
    setText('core', refs.coreTxt, Math.ceil(c.hp) + '／' + c.max);
    if (refs.last.cw !== w) { refs.last.cw = w; refs.coreFill.style.width = w; refs.coreFill.className = ratio > 0.6 ? '' : ratio > 0.3 ? 'is-mid' : 'is-low'; }
    setText('light', refs.lightTxt, String(Math.floor(bt.light)));
    setText('speed', refs.speed, '×' + cur.speed);
    var wait = Math.ceil(bt.quizLock), qd = wait > 0 || !!bt.result || cur.quizOpen;
    setText('quiz', refs.quiz, U.plain(wait > 0 && !bt.result ? fill(TT.quizWait, { n: wait }) : TT.quiz));
    if (refs.quiz.disabled !== qd) refs.quiz.disabled = qd;
    setText('pause', refs.pause, U.plain(cur.paused ? TT.resume : TT.pause));
  }
  function syncCards() {
    var bt = cur.bt;
    Object.keys(refs.cards).forEach(function (id) {
      var c = refs.cards[id], cost = X.cost(bt, id), on = !!(cur.sel && cur.sel.kind === 'card' && cur.sel.id === id);
      var cls = 'tw-card' + (bt.light >= cost ? '' : ' is-poor') + (on ? ' is-on' : '');
      if (c.el.className !== cls) c.el.className = cls;
      if (c.last !== cost) { c.last = cost; c.cost.textContent = fill(U.plain(TT.cost), { n: cost }); }
    });
  }
  function syncInfo() {
    var box = refs.info, bt = cur.bt;
    U.clear(box);
    if (cur.sel && cur.sel.kind === 'unit') {
      var u = bt.units.filter(function (x) { return x.id === cur.sel.uid; })[0];
      if (u) {
        var back = Math.floor(u.paid * bal().LIGHT.REFUND);
        box.appendChild(E('strong', { class: 'tw-info-name', text: memberName(u.member) }));
        box.appendChild(E('span', { class: 'tw-info-hp', text: 'HP ' + Math.ceil(u.hp) + '／' + u.max }));
        box.appendChild(button(fill(TT.remove, { n: back }), 'tw-small', function () { X.remove(cur.bt, u.id); cur.sel = null; syncInfo(); syncCards(); draw(); }, { 'data-act': 'remove' }));
        return;
      }
      cur.sel = null;
    }
    box.appendChild(E('span', { class: 'tw-hint', rich: cur.sel && cur.sel.kind === 'card' ? TT.selectedHint : TT.pick }));
  }
  function rewardBlock(bt) {
    if (cur.reward) return E('div', { class: 'tw-gain' }, [E('strong', { rich: TT.rewardGot }), E('b', { text: rewardText(cur.reward) }), cur.reward.first ? E('span', { class: 'tw-note', rich: TT.firstClear }) : null]);
    return E('p', { class: 'tw-result', rich: bt.mode === 'raid' ? TT.rewardNone : TT.rewardPractice });
  }
  function showOverlay() {
    var o = refs.overlay, bt = cur.bt;
    U.clear(o);
    if (bt.result) {
      var r = TT[bt.result];
      o.hidden = false; o.className = 'tw-overlay is-' + bt.result;
      o.appendChild(E('div', { class: 'tw-over-card' }, [
        E('h2', { rich: r.title }), E('p', { rich: r.text }),
        E('p', { class: 'tw-result', rich: fill(TT.result, { wave: Math.max(1, bt.wave), waves: bal().WAVES.length, kills: bt.kills }) }),
        bt.result === 'win' ? rewardBlock(bt) : null,
        E('div', { class: 'tw-actions' }, [
          button(TT.again, 'primary', function () { begin(bt.difficulty, bt.mode === 'raid' && X.raidsLeft(FF.app.state, FF.app.now()) > 0 ? 'raid' : 'practice', bt.lanes); U.rerender(); }, { 'data-act': 'again' }),
          button(TT.back, '', function () { cur = null; U.show('base'); }, { 'data-act': 'leave' })])
      ]));
    } else if (cur.paused) {
      o.hidden = false; o.className = 'tw-overlay is-paused';
      o.appendChild(E('div', { class: 'tw-over-card' }, [
        E('h2', { rich: TT.pausedTitle }), E('p', { rich: TT.pausedText }),
        E('div', { class: 'tw-actions' }, [button(TT.resume, 'primary', function () { cur.paused = false; cur.last = null; showOverlay(); bgmSync(); }, { 'data-act': 'resume' })])
      ]));
    } else { o.hidden = true; o.className = 'tw-overlay'; }
  }

  function render(main) {
    root.document.body.setAttribute('data-tower', cur && cur.bt ? 'battle' : 'start');   // 戦っているあいだは、上の資材の帯と下のナビを隠して、1画面に収める（CSS）
    if (cur && cur.bt) {
      if (!cur.bt.result && !cur.fresh) cur.paused = true;   // 画面に戻ってきたら、いったん止める（始めたばかりのときは、止めない）
      cur.fresh = false;
      cur.last = null;
      renderBattle(main);
    } else renderStart(main);
  }
  U.screens.tower = { render: render };
})(this);
