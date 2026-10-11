/* Independent battle study. No production scripts, persistent storage or external services. */
(() => {
  'use strict';
  const D = window.BATTLE_DATA, $ = id => document.getElementById(id);
  const definitions = Object.fromEntries(D.members.map(m => [m.id, m]));
  const orderNames = {attack:'たたかう', skill:'わざ', guard:'まもる', item:'回復薬'};
  const icons = {attack:'⚔', skill:'✧', guard:'◇', item:'＋'};
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let state, timer = 0, noticeTimer = 0, pendingTarget = null, paused = false, speed = 1;
  let queue = [], queueIndex = 0, epoch = 0;
  const stats = {renders:0, answerSubmissions:0, reviewAcknowledgements:0, appliedEvents:0, animations:0};
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clone = value => JSON.parse(JSON.stringify(value));

  function fresh() {
    return {auto:false,phase:'commands',turn:1,actor:'hero',enemyHp:360,enemyMax:360,potions:2,
      party:D.members.map(m=>({id:m.id,hp:m.startHp,mp:m.mp})),
      orders:Object.fromEntries(D.members.map(m=>[m.id,{type:'attack',target:m.id}])),
      selected:null,hint:false,question:null,history:[],log:[],acknowledged:false,correct:false,outcome:null};
  }
  const member = id => state.party.find(m => m.id === id);
  const alive = () => state.party.filter(m => m.hp > 0);
  function orderLabel(id) { const o=state.orders[id];return !member(id).hp?'戦闘不能':!o?'未選択':o.type==='skill'?definitions[id].skill:orderNames[o.type]; }
  function remainingItems(except) {return state.potions-Object.entries(state.orders).filter(([id,o])=>id!==except&&member(id).hp>0&&o.type==='item').length;}
  function notice(text) { $('notice').textContent=text;$('notice').classList.add('visible');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').classList.remove('visible'),2500); }
  function message(text) { $('sceneMessage').textContent=text; }
  function focusHeading() {const h=$('panel').querySelector('h1,h2');const target=h&&h.getClientRects().length?h:$('panel').querySelector('.question-text,.answer-status,.selection-heading,.resolving-title,.result-copy,.panel-body');if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}
  function clearNotice() {clearTimeout(noticeTimer);$('notice').classList.remove('visible');}
  function changePhase(phase) {clearTimeout(timer);timer=0;clearNotice();state.phase=phase;render();focusHeading();}

  function renderStatus() {
    $('app').dataset.phase=state.phase;
    $('autoButton').setAttribute('aria-pressed',String(state.auto));
    $('autoButton').innerHTML=`<strong>オート ${state.auto?'ON':'OFF'}</strong><small>問題・解答は手動</small>`;
    $('turnLabel').textContent='TURN '+String(state.turn).padStart(2,'0');
    const step=state.phase==='commands'?0:state.phase==='quiz'?1:state.phase==='review'?2:3;
    document.querySelectorAll('.flow li').forEach((el,i)=>{el.classList.toggle('current',i===step);el.classList.toggle('done',i<step);if(i===step)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
    $('enemyNumbers').textContent=state.enemyHp+' / '+state.enemyMax;
    $('enemyBar').style.width=(state.enemyHp/state.enemyMax*100)+'%';
    document.querySelector('.enemy-meter').setAttribute('aria-valuenow',state.enemyHp);
    document.querySelector('.enemy-meter').setAttribute('aria-valuemax',state.enemyMax);
    $('enemyState').textContent=state.enemyHp===0?'峠に、静けさが戻った':state.enemyHp<state.enemyMax*.3?'あと少し。落ち着いて進もう。':'峠を守る、氷のけもの';
    $('enemyFigure').classList.toggle('defeated',state.enemyHp===0);
    $('party').innerHTML=state.party.map(m=>{const d=definitions[m.id],select=state.phase==='commands'&&state.actor===m.id;
      const hpState=m.hp===0?'down':m.hp/d.hp<=.25?'critical':m.hp/d.hp<=.5?'caution':'normal';
      const hpNotice=hpState==='critical'?'、HPがとても少ない':hpState==='caution'?'、HPが少ない':hpState==='down'?'、戦闘不能':'';
      return `<button class="member ${m.hp?'':'dead'}" data-actor="${m.id}" data-hp-state="${hpState}" aria-pressed="${select}" aria-label="${d.name}${hpNotice}、HP ${m.hp}/${d.hp}、MP ${m.mp}/${d.mp}、${orderLabel(m.id)}" ${state.phase!=='commands'||!m.hp?'disabled':''}>
        <span class="member-top"><span class="portrait"><img src="assets/${m.id}.webp" alt=""></span><span class="member-name">${d.name}<span class="member-role">${d.role}</span></span></span>
        <span class="vitals"><span>HP <b>${m.hp}</b>/${d.hp}</span><span class="mp">MP ${m.mp}</span></span>
        <span class="meter"><i style="width:${m.hp/d.hp*100}%"></i></span>
        <span class="order-label"><span class="order-dot">${m.hp?'◆':'−'}</span>${orderLabel(m.id)}</span></button>`;
    }).join('');
    for(const m of state.party){const el=document.querySelector(`[data-fighter="${m.id}"]`);el.classList.toggle('selected',state.phase==='commands'&&state.actor===m.id);el.classList.toggle('down',!m.hp);}
  }
  function heading(kicker,title,description='') {return `<header class="panel-heading"><div class="panel-kicker"><span>${kicker}</span><span>TURN ${String(state.turn).padStart(2,'0')}</span></div><h1>${title}</h1>${description?`<p>${description}</p>`:''}</header>`;}
  function footer(button,note='') {return `<footer class="panel-footer">${note?`<p class="footer-note">${note}</p>`:''}${button}</footer>`;}
  function primary(label,action,disabled=false){return `<button class="primary" data-do="${action}" ${disabled?'disabled':''}>${label}<span class="arrow" aria-hidden="true">→</span></button>`;}

  function commandsPanel(actor=state.actor,order=state.orders[actor]) {
    const m=member(actor),d=definitions[m.id],o=order,items=remainingItems(m.id);
    const descriptions={attack:'敵1体を攻撃します。MPは使いません。',skill:d.detail,guard:'このターン、自分が受けるダメージを半分にします。',item:`仲間1人のHPを45回復。回復薬は残り${state.potions}こ。`};
    return heading('CHOOSE YOUR PLAN','仲間の作戦を決めよう','仲間のカードを押すと、行動を変更できます。')+
      `<div class="panel-body"><div class="selection-heading"><strong>${d.name}の行動</strong><span>MP ${m.mp} / ${d.mp}</span></div><div class="commands">`+
      ['attack','skill','guard','item'].map(type=>`<button class="command ${o?.type===type?'active':''}" data-order="${type}" aria-pressed="${o?.type===type}" ${type==='skill'&&m.mp<d.cost||type==='item'&&items<1?'disabled':''}><span class="command-icon" aria-hidden="true">${icons[type]}</span><strong>${type==='skill'?d.skill:orderNames[type]}</strong><small>${type==='attack'?'MPを使わない':type==='skill'?`MP ${d.cost}`:type==='guard'?'受けるダメージ半分':`予約できる数 ${Math.max(0,items)}`}</small></button>`).join('')+
      `</div><p class="command-info">${descriptions[o?.type||'attack']}${o&&(o.type==='item'||o.type==='skill'&&d.kind==='heal')?`<br>対象：${definitions[o.target].name}`:''}</p><div class="plan-tools"><button class="secondary" data-do="recommend">おすすめの作戦</button><button class="secondary" data-do="allAttack">全員たたかう</button></div></div>`+
      footer(primary('この作戦で問題へ','startQuiz'),'選んだ作戦は、解答を確認したあとに実行します。');
  }
  function figure(q) {return q.diagram==='rectangle'?`<figure class="question-figure" aria-label="たて6センチメートル、横8センチメートルの長方形"><svg viewBox="0 0 250 100" role="img"><title>たて6cm、横8cmの長方形</title><rect x="67" y="18" width="112" height="66" rx="3" fill="#e9f0e4" stroke="#7e9c86" stroke-width="2"/><path d="M67 18h10v10M179 84h-10v-10" fill="none" stroke="#9aad94"/><text x="122" y="12" text-anchor="middle" fill="#587969" font-size="13">8cm</text><text x="41" y="56" text-anchor="middle" fill="#587969" font-size="13">6cm</text></svg></figure>`:'';}
  function quizPanel() {
    const q=state.question;
    return heading('LEARNING TURN','ひとつずつ、考えよう')+`<div class="panel-body"><div class="question-tag"><span class="tag">小学4年 · 算数</span><span class="tag">${q.unit}</span></div><p class="question-text">${esc(q.text)}</p>${figure(q)}<div class="choices" role="group" aria-label="答えを選ぶ">`+
      q.choices.map((v,i)=>`<button class="choice" data-choice="${i}" aria-pressed="${state.selected===i}"><span class="letter" aria-hidden="true">${'ABCD'[i]}</span><span>${esc(v)}</span></button>`).join('')+
      `</div><div class="quiz-tools"><button class="quiet" data-do="hint" aria-expanded="${state.hint}">◇ ヒント${state.hint?'を閉じる':'を見る'}</button><button class="quiet" data-do="dontKnow">わからない・解答を見る</button></div>${state.hint?`<p class="hint">${esc(q.hint)}</p>`:''}</div>`+
      footer(primary('この答えにする','submit',state.selected===null),'時間制限はありません。答えは決定前なら変更できます。');
  }
  function reviewPanel() {
    const q=state.question,h=state.history.at(-1);
    return heading('ANSWER & UNDERSTANDING','答えを確かめよう')+
      `<div class="panel-body"><div class="answer-status ${h.correct?'':'wrong'}"><span class="seal" aria-hidden="true">${h.correct?'✓':'◇'}</span><strong>${h.correct?'正解！ よく考えたね。':h.selected===null?'いっしょに確認しよう。':'ここが、学びのチャンス。'}</strong></div><p class="answer-question">${esc(q.text)}</p><div class="answer-pair"><div><small>あなたの答え</small><strong>${h.selected===null?'わからない':esc(q.choices[h.selected])}</strong></div><div><small>正しい答え</small><strong>${esc(q.choices[q.answer])}</strong></div></div><p class="explanation">${esc(q.explanation)}</p><div class="learning-effect">${h.correct?'学ぶ力が仲間に届いた。攻撃が1.5倍、受けるダメージが半分に。':'仲間は選んだ作戦で行動します。次の問題でもう一度挑戦しよう。'}</div></div>`+
      footer(primary('解答を確認した · 行動する','acknowledge'),'正解も、まちがえた問題も、上の「記録」で読み返せます。');
  }
  function logsMarkup() {return `<ul class="action-log">${state.log.map(t=>`<li><span class="log-dot" aria-hidden="true">◇</span><span>${esc(t)}</span></li>`).join('')}</ul>`;}
  function actionPanel() {
    if(state.phase==='resolving') return heading('PARTY ACTION','仲間たちの行動')+`<div class="panel-body"><p class="resolving-title">${paused?'一時停止中です':'作戦を実行しています'}</p><p class="resolve-note">${paused?'ページに戻ると続きから再開します。':'仲間と敵の行動は、ここに記録されます。'}</p>${logsMarkup()}</div>`+footer(`<button class="secondary" style="width:100%" data-do="fast">演出を短くする</button>`);
    const turnLog=state.log.length?logsMarkup():'';
    return heading('TURN COMPLETE',state.auto?'次の問題へ進みます':'次の一手を考えよう')+`<div class="panel-body">${turnLog}</div>`+footer(primary(`ターン ${state.turn+1} へ`,'nextTurn'),state.auto?'オート ON · 1.5秒後に次の作戦を選び、問題で止まります。':'次のターンも、問題と解答を確認してから行動します。');
  }
  function endPanel() {
    const won=state.phase==='win',correct=state.history.filter(h=>h.correct).length;
    return heading(won?'VICTORY':'TRY AGAIN',won?'峠の向こうへ。':'ひと休みして、もう一度。')+`<div class="panel-body"><div class="end-mark" aria-hidden="true">${won?'✧':'◇'}</div><p class="result-copy">${won?'学ぶ力と仲間の作戦で、道がひらけました。':'今回はここまで。確認した答えは、あなたの力になります。'}</p><div class="summary-totals"><div><small>取り組んだ問題</small><strong>${state.history.length}<small>問</small></strong></div><div><small>正解した問題</small><strong>${correct}<small>問</small></strong></div></div><button class="secondary" data-do="history" style="width:100%">問題と解答をふり返る</button></div>`+footer(primary('もう一度試す','restart'),'この試作の結果は、本体のセーブには反映されません。');
  }
  function renderPanel() {stats.renders++;$('panel').innerHTML=state.phase==='commands'?commandsPanel():state.phase==='quiz'?quizPanel():state.phase==='review'?reviewPanel():['win','lose'].includes(state.phase)?endPanel():actionPanel();}
  function render() {renderStatus();renderPanel();}

  // Reserve enough space for the longest command description once per viewport.
  // Phase changes and actor selection never recalculate the arena height.
  function lockArena() {
    const app=$('app');app.classList.remove('arena-locked');
    if(!matchMedia('(max-width:999px) and (orientation:portrait)').matches)return;
    const phase=app.dataset.phase,probe=document.createElement('section');
    probe.className='console';
    probe.style.cssText=`position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${$('console').getBoundingClientRect().width}px;height:auto;min-height:0;`;
    app.dataset.phase='commands';app.append(probe);
    let required=0,partyHeight=0,available=0;
    try {
      const target=D.members.reduce((a,b)=>a.name.length>=b.name.length?a:b).id;
      for(const m of D.members)for(const type of ['attack','skill','guard','item']) {
        probe.innerHTML=`<div class="panel" style="height:auto">${commandsPanel(m.id,{type,target})}</div>`;
        probe.querySelector('.panel-body').style.flex='none';
        // Keep the previous arena height; reclaimed heading space belongs to the question.
        probe.querySelector('.panel-heading').style.display='block';
        required=Math.max(required,probe.getBoundingClientRect().height);
      }
      partyHeight=$('party').getBoundingClientRect().height;
      const layout=document.querySelector('.battle-layout');
      available=layout.clientHeight-partyHeight-2*parseFloat(getComputedStyle(layout).rowGap)-Math.ceil(required);
    } finally {probe.remove();app.dataset.phase=phase;}
    app.style.setProperty('--locked-arena-height',Math.max(80,Math.floor(available))+'px');
    app.style.setProperty('--locked-party-height',partyHeight+'px');
    app.classList.add('arena-locked');
  }

  function chooseOrder(type) {
    if(state.phase!=='commands')return;
    const d=definitions[state.actor],m=member(state.actor);
    if(!m.hp||type==='skill'&&m.mp<d.cost||type==='item'&&remainingItems(m.id)<1)return;
    if(type==='item'||type==='skill'&&d.kind==='heal'){openTargets(type);return;}
    state.orders[m.id]={type,target:m.id};render();
  }
  function openTargets(type) {
    pendingTarget={type,actor:state.actor};
    openDialog(type==='item'?'回復薬を使う相手':'いやしの光を届ける相手',`<p>${type==='item'?'HPを45回復します。':'HPを38回復します。'}</p><div class="target-list">${state.party.map(m=>{const d=definitions[m.id];return `<button class="target-option" data-target="${m.id}" ${!m.hp||m.hp===d.hp?'disabled':''}><img src="assets/${m.id}.webp" alt=""><span><b>${d.name}</b><small>HP ${m.hp} / ${d.hp}${!m.hp?' · 戦闘不能':m.hp===d.hp?' · HPは満タン':''}</small></span></button>`}).join('')}</div>`);
  }
  function autoOrders(silent=false) {
    if(state.phase!=='commands')return;
    const low=alive().slice().sort((a,b)=>a.hp/definitions[a.id].hp-b.hp/definitions[b.id].hp)[0];
    let plannedHeal=false;
    for(const m of alive()){
      const d=definitions[m.id];let o={type:'attack',target:m.id};
      if(d.kind==='heal'&&m.mp>=d.cost&&low.hp/definitions[low.id].hp<.75){o={type:'skill',target:low.id};plannedHeal=true;}
      else if(d.kind==='cover'&&m.mp>=d.cost&&low.hp/definitions[low.id].hp<.5)o={type:'skill',target:m.id};
      else if(d.kind==='strike'&&m.mp>=d.cost)o={type:'skill',target:m.id};
      state.orders[m.id]=o;
    }
    if(!plannedHeal&&low.hp/definitions[low.id].hp<.4&&state.potions>0)state.orders[low.id]={type:'item',target:low.id};
    render();if(!silent)notice('おすすめを予約しました。カードから変更できます。');
  }
  function validOrders() {
    return alive().every(m=>{const o=state.orders[m.id],d=definitions[m.id],target=o&&member(o.target);return o&&['attack','skill','guard','item'].includes(o.type)&&(!(o.type==='skill')||m.mp>=d.cost)&&(!(o.type==='item'||o.type==='skill'&&d.kind==='heal')||target?.hp>0)})&&Object.entries(state.orders).filter(([id,o])=>member(id).hp>0&&o.type==='item').length<=state.potions;
  }
  function startQuiz() {
    if(state.phase!=='commands'||!validOrders())return;
    state.question=clone(D.questions[(state.turn-1)%D.questions.length]);state.selected=null;state.hint=false;state.acknowledged=false;
    message('落ち着いて、自分のペースで。');changePhase('quiz');
  }
  function submit(selected) {
    if(state.phase!=='quiz'||selected!==null&&(!Number.isInteger(selected)||selected<0||selected>=state.question.choices.length))return;
    state.selected=selected;state.correct=selected===state.question.answer;
    state.history.push({turn:state.turn,question:clone(state.question),selected,correct:state.correct,acknowledged:false});stats.answerSubmissions++;
    message(state.correct?'正解の力が、仲間に届いた。':'答えを確認して、次につなげよう。');changePhase('review');
  }

  // Compute a complete turn on a copy. Applying events is impossible before explicit review acknowledgement.
  function combatQueue() {
    const s=clone(state),events=[],guards=new Set();let cover=null;
    const byId=id=>s.party.find(m=>m.id===id);
    function event(kind,actor,target,amount,text){events.push({kind,actor,target,amount,text,party:clone(s.party),enemyHp:s.enemyHp,potions:s.potions});}
    for(const m of s.party){
      if(!m.hp||s.enemyHp<=0)continue;
      const d=definitions[m.id],o=s.orders[m.id],target=byId(o.target);
      if(o.type==='guard'){guards.add(m.id);event('guard',m.id,m.id,0,`${d.name}は身を守っている。`);continue;}
      if(o.type==='item'){
        const heal=Math.min(45,definitions[target.id].hp-target.hp);
        if(heal>0&&s.potions>0){s.potions--;target.hp+=heal;event('heal',m.id,target.id,heal,`${d.name}の回復薬。${definitions[target.id].name}のHPが${heal}回復。`);}else event('note',m.id,m.id,0,`${definitions[target.id].name}のHPは満タン。回復薬は使わなかった。`);
        continue;
      }
      if(o.type==='skill'){
        m.mp-=d.cost;
        if(d.kind==='cover'){cover=m.id;event('guard',m.id,m.id,0,`${d.name}が仲間をかばえる位置へ。`);continue;}
        if(d.kind==='heal'){const heal=Math.min(38,definitions[target.id].hp-target.hp);target.hp+=heal;event('heal',m.id,target.id,heal,`${d.name}のいやしの光。${definitions[target.id].name}のHPが${heal}回復。`);continue;}
      }
      const power=o.type==='skill'?d.skillPower:d.power,damage=Math.min(s.enemyHp,Math.round(power*(s.correct?1.5:1)));
      s.enemyHp-=damage;event('hit',m.id,'enemy',damage,`${d.name}の${o.type==='skill'?d.skill:'攻撃'}。${damage}ダメージ。`);
    }
    if(s.enemyHp>0){
      const active=s.party.filter(m=>m.hp>0),all=s.turn%3===0;
      let targets=all?active:[active[(s.turn-1)%active.length]];
      if(!all&&cover)targets=[byId(cover)];
      for(const target of targets){const damage=Math.min(target.hp,Math.max(1,Math.round((all?22:36)*(s.correct?.5:1)*(guards.has(target.id)?.5:1)*(!all&&cover===target.id?.5:1))));target.hp-=damage;event('hurt','enemy',target.id,damage,`${all?'大獣の吹雪':'大獣の一撃'}。${definitions[target.id].name}に${damage}ダメージ${target.hp===0?'、戦闘不能':'。'}`);}
    }
    return events;
  }
  function acknowledge() {
    if(state.phase!=='review'||!state.history.length||state.acknowledged)return;
    state.acknowledged=true;state.history.at(-1).acknowledged=true;stats.reviewAcknowledgements++;
    queue=combatQueue();queueIndex=0;state.log=[];changePhase('resolving');processNext();
  }
  function animateEvent(e) {
    if(motion.matches||document.hidden)return;
    const duration=360/speed;
    const target=e.target==='enemy'?$('enemyFigure'):document.querySelector(`[data-fighter="${e.target}"]`);
    if(e.kind==='hit'){const actor=document.querySelector(`[data-fighter="${e.actor}"]`);actor.animate([{transform:'translateX(0)'},{transform:'translateX(12px)',offset:.4},{transform:'translateX(0)'}],{duration});}
    if(['hit','hurt'].includes(e.kind))target.animate([{transform:'translateX(0)'},{transform:'translateX(-4px)',offset:.25},{transform:'translateX(4px)',offset:.5},{transform:'translateX(0)'}],{duration:230/speed});
    $('effect').className='effect '+(e.kind==='hit'?'slash':e.kind==='heal'?'heal':e.kind==='guard'?'guard':'');
    $('effect').animate([{opacity:0},{opacity:1,offset:.3},{opacity:0}],{duration:duration+100,fill:'forwards'});
    if(e.amount){const f=$('floatText');f.textContent=(e.kind==='heal'?'+':'−')+e.amount;f.classList.toggle('heal',e.target!=='enemy');f.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,offset:.15},{opacity:0,transform:'translateY(-24px)'}],{duration:600/speed,fill:'forwards'});}
    stats.animations++;
  }
  function schedule() {
    clearTimeout(timer);timer=0;
    if(document.hidden||$('infoDialog').open)return;
    const token=epoch;
    if(state.phase==='resolving')timer=setTimeout(()=>{if(token===epoch)processNext();},(motion.matches?180:650)/speed);
    else if(state.phase==='summary'&&state.auto)timer=setTimeout(()=>{timer=0;if(token===epoch&&state.auto&&!document.hidden&&!$('infoDialog').open)nextTurn();},1500);
  }
  function toggleAuto() {
    state.auto=!state.auto;renderStatus();
    if(state.phase==='commands'&&state.auto){autoOrders(true);startQuiz();}
    else if(state.phase==='summary'){renderPanel();schedule();}
  }
  function processNext() {
    timer=0;if(state.phase!=='resolving'||!state.acknowledged||document.hidden||$('infoDialog').open)return;
    paused=false;
    if(queueIndex>=queue.length){state.outcome=state.enemyHp<=0?'win':alive().length?'summary':'lose';message(state.outcome==='win'?'学ぶ力で、道がひらけた。':state.outcome==='lose'?'仲間とともに、ひと休み。':'このターンの行動が終わりました。');changePhase(state.outcome);schedule();return;}
    const event=queue[queueIndex++];state.party=clone(event.party);state.enemyHp=event.enemyHp;state.potions=event.potions;state.log.push(event.text);stats.appliedEvents++;
    render();message(event.text);animateEvent(event);const scroll=$('panel').querySelector('.panel-body');if(scroll)scroll.scrollTop=scroll.scrollHeight;schedule();
  }
  function nextTurn() {
    if(state.phase!=='summary'||!state.acknowledged||state.history.at(-1)?.turn!==state.turn)return;
    state.turn++;state.question=null;state.selected=null;state.log=[];state.acknowledged=false;state.actor=alive()[0].id;
    for(const m of alive()){const o=state.orders[m.id],d=definitions[m.id];if(!o||o.type==='skill'&&m.mp<d.cost||o.type==='item'||!member(o.target)?.hp)state.orders[m.id]={type:'attack',target:m.id};}
    message('仲間の状態を見て、次の作戦を。');changePhase('commands');if(state.auto){autoOrders(true);startQuiz();}
  }
  function stopAnimations() {document.getAnimations().forEach(a=>a.cancel());$('floatText').textContent='';$('effect').className='effect';}
  function restart() {epoch++;clearTimeout(timer);clearNotice();stopAnimations();queue=[];queueIndex=0;pendingTarget=null;paused=false;state=fresh();message('仲間とともに、峠の向こうへ。');render();lockArena();focusHeading();}

  function openDialog(title,html) {
    clearTimeout(timer);if(state.phase==='resolving'){paused=true;stopAnimations();renderPanel();}
    $('dialogTitle').textContent=title;$('dialogBody').innerHTML=html;$('infoDialog').showModal();
  }
  function history() {
    const html=state.history.length?state.history.map(h=>`<article class="history-item"><small>TURN ${h.turn} · ${h.question.unit} · ${h.correct?'正解':'確認した問題'}</small><h3>${esc(h.question.text)}</h3><p class="history-answer">あなたの答え：${h.selected===null?'わからない':esc(h.question.choices[h.selected])}<br><b>正しい答え：${esc(h.question.choices[h.question.answer])}</b></p><p class="history-explain">${esc(h.question.explanation)}</p></article>`).join(''):'<p>問題に答えると、ここに問題・自分の答え・正解・解説が残ります。</p>';
    openDialog('問題と解答の記録',html);
  }
  function help() {openDialog('戦闘のせつめい',`<p>仲間のカードを押して、作戦を選びます。最初は全員「たたかう」です。</p><ol><li>作戦を選ぶ</li><li>1問に答える</li><li>正しい答えと解説を確認する</li><li>仲間と敵が行動する</li></ol><p>正解すると攻撃が1.5倍、受けるダメージが半分になります。まちがえても仲間は行動します。</p><p>「オート ON」は毎ターンの作戦と次のターンへの進行を自動化します。問題への回答と解答確認は手動です。いつでもOFFにできます。OFFにしても今のターンに予約済みの作戦は変えません。次のターンから再び手動で選べます。「おすすめの作戦」は行動の予約だけです。時間制限はありません。</p><p>MPと回復薬は、実際に行動するときに使います。画面の「演出 ×1」で速さを変えられます。</p><p>このページは戦闘だけの独立試作です。本体・フィールド試作・セーブデータには接続しません。</p>`);}
  $('closeDialog').onclick=()=>$('infoDialog').close();
  $('infoDialog').addEventListener('close',()=>{pendingTarget=null;if(state.phase==='resolving'){paused=false;renderPanel();schedule();}else if(state.phase==='summary')schedule();});
  $('dialogBody').addEventListener('click',e=>{const b=e.target.closest('[data-target]');if(!b||b.disabled||!pendingTarget||state.phase!=='commands')return;const p=pendingTarget,target=member(b.dataset.target);if(!target?.hp)return;state.orders[p.actor]={type:p.type,target:target.id};$('infoDialog').close();render();});
  $('autoButton').onclick=toggleAuto;
  $('historyButton').onclick=history;$('helpButton').onclick=help;
  $('speedButton').onclick=()=>{speed=speed===1?2:1;$('speedButton').textContent='演出 ×'+speed;$('speedButton').setAttribute('aria-label','演出速度 '+speed+'倍。押すと切り替え');};
  $('party').addEventListener('click',e=>{const b=e.target.closest('[data-actor]');if(b&&!b.disabled&&state.phase==='commands'){state.actor=b.dataset.actor;render();}});
  $('panel').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.order){chooseOrder(b.dataset.order);return;}
    if(b.dataset.choice!==undefined&&state.phase==='quiz'){state.selected=Number(b.dataset.choice);$('panel').querySelectorAll('[data-choice]').forEach(c=>c.setAttribute('aria-pressed',Number(c.dataset.choice)===state.selected));$('panel').querySelector('[data-do=submit]').disabled=false;return;}
    switch(b.dataset.do){
      case 'startQuiz':startQuiz();break;
      case 'submit':if(state.selected!==null)submit(state.selected);break;
      case 'dontKnow':submit(null);break;
      case 'acknowledge':acknowledge();break;
      case 'nextTurn':nextTurn();break;
      case 'recommend':autoOrders();break;
      case 'allAttack':if(state.phase==='commands'){for(const m of alive())state.orders[m.id]={type:'attack',target:m.id};render();notice('全員の「たたかう」を予約しました。');}break;
      case 'hint':if(state.phase==='quiz'){state.hint=!state.hint;renderPanel();$('panel').querySelector('[data-do=hint]').focus({preventScroll:true});}break;
      case 'fast':speed=2;$('speedButton').textContent='演出 ×2';notice('行動の演出を短くします。');break;
      case 'history':history();break;
      case 'restart':restart();break;
    }
  });
  document.addEventListener('visibilitychange',()=>{if(state.phase!=='resolving'&&state.phase!=='summary')return;if(document.hidden){clearTimeout(timer);timer=0;paused=true;stopAnimations();}else if(!$('infoDialog').open){paused=false;renderPanel();schedule();}});
  motion.addEventListener('change',()=>{if(motion.matches)stopAnimations();});
  let layoutFrame=0;
  window.addEventListener('resize',()=>{cancelAnimationFrame(layoutFrame);layoutFrame=requestAnimationFrame(lockArena);});
  state=fresh();render();lockArena();
  if(new URLSearchParams(location.search).has('qa'))window.BATTLE_QA={
    snapshot:()=>clone(state),stats,definitions:D.members,questions:D.questions,
    fixture:(patch={})=>{restart();if(patch.turn)state.turn=patch.turn;if(patch.enemyHp){state.enemyHp=patch.enemyHp;state.enemyMax=patch.enemyHp;}for(const m of state.party){if(patch.hp?.[m.id]!==undefined)m.hp=patch.hp[m.id];if(patch.mp?.[m.id]!==undefined)m.mp=patch.mp[m.id];}if(patch.potions!==undefined)state.potions=patch.potions;state.actor=alive()[0]?.id||'hero';render();},
    drain:()=>{clearTimeout(timer);let max=15;while(state.phase==='resolving'&&max-->0){processNext();clearTimeout(timer);}stopAnimations();if(state.phase==='summary'&&state.auto)schedule();},
    transitions:{startQuiz,submit,acknowledge,nextTurn},
    animationState:()=>({pending:state.phase==='resolving'&&queueIndex<queue.length,paused,queueIndex,queueLength:queue.length,timer:!!timer})
  };
})();
