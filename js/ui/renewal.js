// 学ぶ → 教科 → 問題。既存の資源・熱量・保存・引換・基地の実装を共有する。
(function(root){
 'use strict';
 var FF=root.FF,U=FF.ui,L=FF.learning,C=FF.curriculum,E=U.el;
 var R=FF.texts.renewal;
 FF.renewalBeforeShow=function(name,params){
  var a=FF.app,isLearn=name==='study'&&(!params.tab||params.tab==='learn');
  if(a.screen==='quiz'&&name!=='quiz'&&a.session&&a.session.renewal){
  }
  // 設備の画面で足りない資材を押して来たとき：その日にその資材が決まっている教科にカーソルを当てる（判断319）
  a.learningFocus=null;
  if(isLearn&&params.resource&&FF.defs.RESOURCES.some(function(r){return r.id===params.resource;}))a.learningFocus=params.resource;
 };
 function button(label,fn,cls,disabled,attrs){return E('button',{class:cls||'rn-button',text:label,disabled:!!disabled,attrs:Object.assign({type:'button'},attrs||{}),on:{click:fn}});}
 function title(kicker,heading,sub){return E('div',{class:'rn-heading'},[E('div',{class:'eyebrow',text:kicker}),E('h1',{text:heading}),sub?E('p',{rich:sub}):null]);}
 function school(g){var d=FF.defs.GRADES.filter(function(x){return x.level===g;})[0];return d?d.school:R.chooseGrade;}
 function difficulty(id){return id==='random'?R.random:U.plain(U.nameOf(FF.defs.DIFFICULTIES,id));}
 function doneCount(s){return s.completed||0;}
 function current(){var ses=FF.app.session;return ses&&ses.currentId?ses.items[ses.currentId]:null;}
 // その日の資材は教科で決まる（判断319）。教科から資材を引く。☆は、その日ランダムに決まった教科
 function dailyEntry(subject){return FF.daily.today(FF.app.now()).bySubject[subject]||null;}
 // ☆は文字ではなく図で描く（文字だと、字体によって、円の中央からずれるため）
 function starIcon(){
  var ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),poly=document.createElementNS(ns,'polygon');
  svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','daily-star-svg');svg.setAttribute('aria-hidden','true');
  poly.setAttribute('points','12.00,2.95 14.53,9.47 21.51,9.86 16.09,14.28 17.88,21.04 12.00,17.25 6.12,21.04 7.91,14.28 2.49,9.86 9.47,9.47');poly.setAttribute('fill','none');poly.setAttribute('stroke','currentColor');poly.setAttribute('stroke-width','2');poly.setAttribute('stroke-linejoin','round');
  svg.appendChild(poly);return svg;
 }
 function resourceBadge(entry,cls){
  if(entry.random)return E('span',{class:'daily-badge is-random'+(cls?' '+cls:''),attrs:{title:R.dailyRandomHelp}},[E('span',{class:'daily-random-label'},[starIcon()])]);
  var r=U.resDef(entry.resource);
  return E('span',{class:'daily-badge'+(cls?' '+cls:''),attrs:{title:U.plain(r.name)}},[U.resIcon(r)]);
 }
 // 問題ごとに獲得する資材：教科で決まる。ランダムの教科は、問題ごとに4つのうちのどれか
 function rollResource(subject){
  var entry=dailyEntry(subject);
  if(entry&&entry.random){var list=FF.defs.RESOURCES;return list[Math.floor(Math.random()*list.length)].id;}
  return entry&&entry.resource||C.scarcest(FF.app.state);
 }
 function quizResourceButton(){
  var s=FF.app.session,entry=dailyEntry(s.sel.subject);
  if(entry&&entry.random)return E('span',{class:'quiz-resource-button daily-badge is-random',attrs:{role:'img','aria-label':R.todayResource+'：'+R.dailyRandomHelp}},[E('span',{class:'daily-random-label'},[starIcon()])]);
  var r=U.resDef((entry&&entry.resource)||s.sel.resource||C.scarcest(FF.app.state));
  return E('span',{class:'quiz-resource-button daily-badge',attrs:{role:'img','aria-label':R.todayResource+'：'+U.plain(r.name)}},[U.resIcon(r)]);
 }
 function makeSession(subject){
  var a=FF.app,s=a.state,g=s.player.grade||2;
  var sel={subject:subject,grade:g,unit:'all',difficulty:'random',answerType:FF.tickets.recoverTickets(s.tickets,a.now()).count?'choice':'input',resource:null};
  if(!C.pool(a.bank,sel).length&&subject!=='math')sel.answerType='input';
  a.session={renewal:true,sel:sel,recentIds:[],items:{},currentId:null,order:[],cursor:-1};
  chooseQuestion();U.show('quiz');
 }
// デバッグモードのレビュー（判断202・203）：「確認前だけ」「レビュー済みを出さない」の設定を、出題に反映する
 function reviewBank(bank){
  if(!(FF.debugMode&&U.review))return bank;
  var only=U.review.onlyUnreviewed(),hide=U.review.hideReviewed();
  if(!only&&!hide)return bank;
  var done=U.review.all(),byId={};
  Object.keys(bank.byId).forEach(function(id){var q=bank.byId[id];if(only&&q.reviewed!==false)return;if(done[id]||done[id+'#input'])return;byId[id]=q;});
  return {byId:byId,byKey:bank.byKey,invalid:[],duplicates:[],count:0};
 }
 // 「確認前だけ」で1問も残らないときは、ふつうの出題に戻す（「レビュー済みを出さない」だけのときは戻さない）
 function reviewFallback(){return !!(FF.debugMode&&U.review&&U.review.onlyUnreviewed()&&!U.review.hideReviewed());}
 function chooseQuestion(id,force){
  var a=FF.app,s=a.session;
  if(id&&id===s.currentId&&!force)return;
  var ctxPick={correctLog:a.state.learning.correctLog,recentIds:s.recentIds,now:a.now()};
  var peeked=!id&&s.nextQ&&s.nextSelKey===JSON.stringify(s.sel)?s.nextQ:null;
  s.nextQ=null;
  var q=id?(a.bank.byId[id]||(s.items[id]&&s.items[id].attempt.question)):(peeked||C.pick(reviewBank(a.bank),s.sel,ctxPick)||(reviewFallback()?C.pick(a.bank,s.sel,ctxPick):null));
  if(!q){s.currentId=null;return;}
  // Visiting a question starts a fresh attempt. Persistent results live in the save.
  s.items[q.id]={attempt:L.startAttempt(q),outcome:null,picked:null,selected:null,typed:'',resource:rollResource(s.sel.subject)};
  s.currentId=q.id;s.recentIds=s.recentIds.concat([q.id]).slice(-20);
  if(s.order[s.cursor]!==q.id){s.order=s.order.slice(0,s.cursor+1);s.order.push(q.id);s.cursor=s.order.length-1;}
 }
 // 次の問題を先に選び、絵（diagram.kind==='image'）を裏で読み込む。答え合わせの解説を読んでいる間に読み込みが終わり、「次へ」で待たせない（判断256）
 function prepareNext(){
  var a=FF.app,s=a.session;
  if(!s||!s.renewal)return;
  var ctxPick={correctLog:a.state.learning.correctLog,recentIds:s.recentIds,now:a.now()};
  var q=C.pick(reviewBank(a.bank),s.sel,ctxPick);
  if(!q)return;
  s.nextQ=q;s.nextSelKey=JSON.stringify(s.sel);
  if(q.diagram&&q.diagram.kind==='image'&&q.diagram.src&&root.Image){var img=new root.Image();img.decoding='async';img.src=q.diagram.src;}
 }
 function submit(){
  var a=FF.app,it=current();if(!it||it.attempt.done)return;
  var value=it.attempt.question.answerType==='choice'?it.selected:it.typed;
  if(value==null||!String(value).trim()){it.error=R.selectAnswer;U.rerender();return;}
  var result=L.submitAnswer(a.state,it.attempt,value,{now:a.now(),resource:it.resource});
  if(result.outcome.status==='error') {it.error=result.outcome.error==='noTicket'?R.noTickets:R.selectAnswer;if(result.state!==a.state)a.commit(result.state);U.rerender();return;}
  applyResult(it,result,value);
 }
 // 手書きの欄で、お手本を見たあとの自己採点（判断266）。「書けた」は、ポイントが半分
 function revealHandwriting(){
  var it=current();if(!it||it.attempt.done)return;
  if(!(it.strokes&&it.strokes.length)){it.error=R.hwWriteFirst;U.rerender();return;}
  it.error=null;it.revealed=true;U.rerender();
 }
 function selfCheck(ok){
  var a=FF.app,it=current();if(!it||it.attempt.done||!it.revealed)return;
  var result=L.submitSelfCheck(a.state,it.attempt,ok,{now:a.now(),resource:it.resource});
  if(result.outcome.status==='error'){it.error=R.selectAnswer;U.rerender();return;}
  applyResult(it,result,ok?it.attempt.question.answer:null);
 }
 function applyResult(it,result,value){
  var a=FF.app;
  it.attempt=result.attempt;it.picked=value;it.error=null;
  var arrive=null;
  if(result.outcome.status==='retry'){
   it.error=R.tryAgain.replace('{n}',result.outcome.attemptsLeft);it.typed='';
   var retryState=FF.util.clone(result.state);retryState.learning.questionResults=retryState.learning.questionResults||{};
   retryState.learning.questionResults[it.attempt.question.id.replace(/#input$/,'')]=false;a.commit(retryState);
  }else {
   it.outcome=result.outcome;a.session.completed=(a.session.completed||0)+1;
   if(result.outcome.status==='correct'){if(FF.sound)FF.sound.correct();var changes={heat:result.outcome.points};changes[it.resource]=result.outcome.reward;arrive=FF.rewardFlight.prepare(changes);}
   a.commit(result.state);
   prepareNext();
  }
  U.rerender();
  if(arrive){
   var feedback=document.querySelector('.answer-feedback.good');if(feedback)feedback.scrollIntoView({block:'nearest',behavior:'instant'});
   FF.rewardFlight.fly([{key:it.resource,source:document.querySelector('.reward-resource .ico')},{key:'heat',source:document.querySelector('.reward-heat img')}],arrive);
  }
  setTimeout(function(){var fb=document.querySelector('.answer-feedback');if(fb)fb.focus({preventScroll:true});},0);
 }
 // 手書きの欄：書く→お手本を見る→「書けた」「まちがえた」を自分で選ぶ（判断266）
 function handwriteView(it,q,done){
  var kind=L.handwriteKind(q),en=kind==='english',locked=done||!!it.revealed,cv=FF.handwriting.pad(it,q.answer,locked,kind);
  var box=E('div',{class:'hw'+(en?' hw-en':'')},[E('div',{class:'input-label'},[E('span',{text:en?R.hwHelpEn:R.hwHelp})]),cv]);
  if(!locked){
   box.appendChild(E('div',{class:'hw-actions'},[
    button(R.hwUndo,function(){if(it.strokes.length){it.strokes.pop();cv.redraw();}},'rn-button'),
    button(R.hwClear,function(){it.strokes=[];cv.redraw();},'rn-button')
   ]));
   box.appendChild(button(R.hwUseKeyboard,function(){it.mode='key';it.error=null;U.rerender();},'rn-button hw-switch'));
   box.appendChild(E('p',{class:'hw-tip',text:R.hwTip}));
  }
  if(it.revealed||done){
   box.appendChild(E('div',{class:'hw-model'},[E('span',{class:'eyebrow',text:R.hwModel}),E('strong',{class:'hw-answer'+(en?' en':''),text:q.answer}),E('p',{text:R.hwCompare})].concat(en&&FF.speech&&FF.speech.supported()&&FF.speech.enabled()?[speakButton(q.answer,R.speakAnswer,'small')]:[])));
   if(!done)box.appendChild(E('div',{class:'hw-actions hw-judge'},[
    button('○ '+R.hwOk,function(){selfCheck(true);},'rn-button primary hw-ok'),
    button('× '+R.hwNg,function(){selfCheck(false);},'rn-button hw-ng')
   ]));
  }
  return box;
 }
 function next(){chooseQuestion();U.rerender();root.scrollTo({top:0,behavior:'smooth'});}
 function showFilters(){FF.app.filterDraft=Object.assign({},FF.app.session.sel);U.show('lessonFilters');}
 function changeFilter(k,v){var s=FF.app.session;s.sel[k]=v;chooseQuestion();U.rerender();root.scrollTo(0,0);}
 function selectField(label,value,options,onchange){return E('label',{class:'rn-field'},[E('span',{text:label}),E('select',{value:value,attrs:{'aria-label':label},on:{change:function(e){onchange(e.target.value);}}},options.map(function(o){return E('option',{value:o[0],attrs:{selected:o[0]===value?true:null},text:o[1]});}))]);}
 function unitsView(){
  var a=FF.app,s=a.session,p=E('aside',{class:'lesson-sidebar'}),units=C.units(s.sel.subject,s.sel.grade),counts=C.unitCounts(a.bank,s.sel.subject,s.sel.grade);
  p.appendChild(E('div',{class:'side-title'},[E('h2',{text:R.units}),E('span',{class:'small muted',text:units.length?R.totalQuestions.replace('{n}',C.progress(a.bank,a.state,s.sel.subject,s.sel.grade).total):school(s.sel.grade)})]));
  p.appendChild(button('⤨ '+R.allUnits,function(){changeFilter('unit','all');},'unit-row all'+(s.sel.unit==='all'?' active':''),false,{'aria-pressed':s.sel.unit==='all'}));
  if(units.length)p.appendChild(E('div',{class:'unit-list'},units.map(function(u){
   return E('button',{class:'unit-row'+(s.sel.unit===u.id?' active':''),attrs:{type:'button','aria-pressed':s.sel.unit===u.id?'true':'false'},on:{click:function(){changeFilter('unit',u.id);}}},[
    E('span',{class:'unit-icon',style:{background:u.color},text:u.icon}),E('span',{class:'unit-name',text:u.name}),E('small',{text:counts[u.id]||0}),E('span',{class:'unit-chevron',text:'›'})
   ]);
  })));
  p.appendChild(E('div',{class:'side-settings'},[
   selectField(R.level,s.sel.difficulty,[['random',R.random],['basic',R.basic],['standard',R.standard],['advanced',R.advanced]],function(v){changeFilter('difficulty',v);}),
   selectField(R.format,s.sel.answerType,[['choice',R.choice],['input',R.input]],function(v){changeFilter('answerType',v);})
  ]));
  return p;
 }
 function questionIndex(){
  var s=FF.app.session,qs=C.pool(FF.app.bank,s.sel);
  var wrap=E('section',{class:'question-index'},[E('h2',{text:R.questionList}),E('p',{class:'small muted',text:R.listNote})]);
  var grid=E('div',{class:'index-grid'});
  qs.forEach(function(q){var no=C.numberOf(FF.app.bank,q),status=(FF.app.state.learning.questionResults||{})[q.id.replace(/#input$/,'')],cls=(s.currentId===q.id?' current':'')+(status===true?' solved':status===false?' missed':'');
   grid.appendChild(button(String(no),function(){chooseQuestion(q.id);U.rerender();root.scrollTo(0,0);},'index-item'+cls,false,{'aria-label':R.question+' '+no+(status!==undefined?' '+(status?R.correct:R.review):''),'aria-current':s.currentId===q.id?'true':null}));
  });wrap.appendChild(grid);return wrap;
 }
 function helpView(it,options){
  options=options||{};
  var q=it.attempt.question,done=it.attempt.done;
  var aside=E('aside',{class:'lesson-help'}),hint=E('section',{class:'hint-card'},[E('h2',{},[E('img',{class:'help-heading-icon',attrs:{src:'img/hint-bulb.svg',alt:''}}),E('span',{text:R.hint})]),E('p',{class:'small muted',text:R.hintIntro})]);
  for(var i=0;i<it.attempt.hintsShown;i++)hint.appendChild(E('div',{class:'hint-step'},[E('span',{class:'step-dot',text:i+1}),U.R('p','',q.hints[i])]));
  if(!done&&it.attempt.hintsShown<q.hints.length)hint.appendChild(button(R.openHint+' '+(it.attempt.hintsShown+1)+' / '+q.hints.length,options.revealHint||function(){it.attempt=L.revealHint(it.attempt);U.rerender();},'rn-button hint-button'));
  if(!done&&!options.explore)hint.appendChild(E('p',{class:'micro',text:R.hintReward}));
  aside.appendChild(hint);
  var explain=E('section',{class:'explanation-card'},[E('h2',{},[E('img',{class:'help-heading-icon',attrs:{src:'img/art/subj-en.jpg',alt:''}}),E('span',{text:R.explanation})])]);
  if(done){explain.appendChild(E('div',{class:'answer-label',text:R.answer}));explain.appendChild(U.R('div','answer-value',L.displayAnswer(q)));if(FF.speech&&FF.speech.supported()&&FF.speech.enabled()){var at=FF.speech.answerTextFor(q)||(q.listen?String(q.listen):'');if(at)explain.appendChild(E('div',{class:'speak-row'},[speakButton(at,R.speakAnswer,'small')]));}explain.appendChild(U.R('p','explanation-text',q.explanation));}
  else explain.appendChild(E('div',{class:'locked-explanation'},[E('span',{class:'lock-mark',text:'◇'}),E('p',{text:R.answerAfter})]));
  aside.appendChild(explain);
  aside.appendChild(E('div',{class:'encourage'},[U.artImg('avatar-'+(FF.app.state.player.avatar||'e1')+'.jpg','mentor-avatar'),E('p',{text:done?R.encourageDone:(q.diagram?R.encourage:'あせらなくて大丈夫。問題をよく読んで考えてみよう。')})]));
  return aside;
 }
 // 英語の読み上げ（判断280）：スピーカーのボタン。聞き取りの問題（q.listen）は、大きなボタンで、読み上げができないときは英語の文字を見せる
 function speakButton(text,label,cls,again){
  // はじめは label（きく）。一度きいたら again（もういちど きく）に変わる（判断356）
  var name=E('span',{text:label}),btn=E('button',{class:'speak-button '+(cls||''),attrs:{type:'button','aria-label':label},on:{click:function(){FF.speech.speak(text);if(again){name.textContent=again;btn.setAttribute('aria-label',again);}}}},[E('span',{class:'speak-icon',text:'🔊'}),name]);
  return btn;
 }
 function speakView(q,done){
  if(!FF.speech||q.subject!=='english')return null;
  var text=FF.speech.textFor(q);if(!text)return null;
  var can=FF.speech.supported()&&FF.speech.enabled();
  if(q.listen){
   if(can)return E('div',{class:'speak-row listen'},[speakButton(text,R.speakListen,'big',R.speakAgain),E('span',{class:'speak-note',text:R.speakNote})]);
   return E('div',{class:'speak-row listen no-sound'},[E('span',{class:'speak-note',text:R.speakNoSound}),E('strong',{class:'speak-text',text:'「'+text+'」'})]);
  }
  if(!can)return null;
  return E('div',{class:'speak-row'},[speakButton(text,R.speakListen,'small',R.speakAgain)]);
 }
 FF.lessonHelp=helpView;
 function renderQuiz(main){
  var a=FF.app,s=a.session;if(!s||!s.renewal){U.show('study',{tab:'learn'});return;}
  var it=current();var top=E('div',{class:'lesson-heading'},[
   button('‹ '+R.subjects,function(){U.show('study',{tab:'learn'});},'text-button'),
   E('span',{text:school(s.sel.grade)+' '+U.plain(L.subjectName(s.sel.subject,s.sel.grade))}),
   E('span',{class:'lesson-session-count',text:doneCount(s)+' '+R.completed}),
   quizResourceButton(),button('☷ '+R.conditions,showFilters,'rn-button filter-open')
  ]);main.appendChild(top);
  var layout=E('div',{class:'workbench'}),left=E('div',{class:'lesson-left'},[unitsView(),questionIndex()]);layout.appendChild(left);
  var card=E('section',{class:'question-card'});layout.appendChild(card);
  if(!it){card.appendChild(title(R.learning,R.empty,R.emptyHelp));card.appendChild(button(R.resetFilters,function(){s.sel.unit='all';s.sel.difficulty='random';s.sel.answerType=FF.tickets.recoverTickets(a.state.tickets,a.now()).count?'choice':'input';chooseQuestion();U.rerender();},'rn-button primary'));main.appendChild(layout);return;}
  var q=it.attempt.question,done=it.attempt.done,unit=C.unit(q.subject,q.gradeLevel,q.unit),no=C.numberOf(a.bank,q);
  if(done)card.classList.add('is-done');
  card.appendChild(E('div',{class:'question-meta'},[
   E('span',{class:'question-badge',text:q.generated?R.drill:R.question+' '+(no?no+' / '+C.totalOf(a.bank,q.subject,q.gradeLevel):s.cursor+1)}),
   E('span',{class:'question-unit',text:unit?unit.name:U.plain(L.subjectName(q.subject,q.gradeLevel))}),
   E('span',{class:'difficulty-badge '+q.difficulty,text:'★ '+difficulty(q.difficulty)})
  ]));
  card.appendChild(U.R('div','lesson-question',q.question));
  var speakRow=speakView(q,done);if(speakRow)card.appendChild(speakRow);
  if(q.diagram)card.appendChild(FF.lessonFigure.render(q.diagram));
  var answers=E('div',{class:'lesson-answers'});
  if(q.answerType==='choice'){
   it.attempt.choices.forEach(function(c,i){var cls='answer-option'+(it.selected===c?' selected':'');if(done&&c===q.answer)cls+=' correct';else if(done&&it.picked===c)cls+=' incorrect';
    answers.appendChild(E('button',{class:cls,disabled:done,attrs:{type:'button','aria-pressed':it.selected===c?'true':'false'},on:{click:function(){it.selected=c;it.error=null;submit();}}},[E('span',{class:'option-mark',text:done&&c===q.answer?'✓':String.fromCharCode(65+i)}),U.R('span','option-text',c)]));
   });
  }else{
   var hwOn=L.canHandwrite(q)&&it.mode!=='key';
   if(hwOn){answers.appendChild(handwriteView(it,q,done));}else{
   var input=E('input',{class:'renewal-input',value:it.typed,disabled:done,attrs:{type:'text',inputmode:q.validationMode==='number'?'decimal':'text',autocomplete:'off',placeholder:R.inputPlaceholder,'aria-label':R.inputPlaceholder},on:{input:function(e){it.typed=e.target.value;},keydown:function(e){if(e.key==='Enter'&&!e.isComposing)submit();}}});
   answers.appendChild(E('label',{class:'input-label'},[E('span',{text:R.yourAnswer}),input]));
   U.keepInView(input);
   if(L.canHandwrite(q)&&!done)answers.appendChild(button(R.hwUsePen,function(){it.mode='pen';it.error=null;U.rerender();},'rn-button hw-switch'));
   if(L.canHandwrite(q)&&!done)answers.appendChild(E('p',{class:'hw-tip',text:R.hwTipKey}));
   }
  }
  card.appendChild(answers);
  if(it.error)card.appendChild(E('div',{class:'answer-feedback retry',attrs:{role:'status',tabindex:'-1'},text:it.error}));
  if(!done){
   if(L.canHandwrite(q)&&it.mode!=='key'){if(!it.revealed)card.appendChild(button(R.hwReveal,revealHandwriting,'rn-button primary check-answer'));}
   else if(q.answerType!=='choice')card.appendChild(button(R.checkAnswer,submit,'rn-button primary check-answer'));
   if(q.answerType==='choice'&&FF.tickets.recoverTickets(a.state.tickets,a.now()).count<1)card.appendChild(E('div',{class:'no-ticket-box'},[E('p',{text:R.noTickets}),button(R.switchInput,function(){changeFilter('answerType','input');},'rn-button')]));
  }else if(it.outcome){
   var good=it.outcome.status==='correct',fb=E('div',{class:'answer-feedback '+(good?'good':'review'),attrs:{role:'status',tabindex:'-1'}},[
    E('strong',{text:good?'✓ '+R.correct:R.review}),
    good?E('div',{class:'reward-gains'},[
     E('div',{class:'reward-gain reward-resource'},[U.resIcon(U.resDef(it.resource)),E('strong',{text:'+'+it.outcome.reward}),E('span',{text:U.plain(U.resDef(it.resource).name)})]),
     E('div',{class:'reward-gain reward-heat'},[E('img',{attrs:{src:'img/heat.svg',alt:''}}),E('strong',{text:'+'+it.outcome.points}),E('span',{text:R.heat})])
    ]):E('span',{text:R.reviewNote})
   ]);card.appendChild(fb);
   var det=E('details',{class:'reward-details'},[E('summary',{text:R.rewardDetails})]);
   if(good){var bd=it.outcome.breakdown;det.appendChild(E('p',{text:R.rewardFormula.replace('{accuracy}',String(Math.round(bd.accuracy*100))).replace('{repeat}',String(Math.round(bd.repeat*100))).replace('{hint}',String(Math.round(bd.hint*100)))}));}
   else det.appendChild(E('p',{text:R.noReward}));
   if(it.outcome.method==='self'&&good)det.appendChild(E('p',{text:R.hwHalf}));
   card.appendChild(det);
  }
  card.appendChild(E('div',{class:'lesson-actions'},[
   button('‹ '+R.previous,function(){if(s.cursor>0){s.cursor--;chooseQuestion(s.order[s.cursor],true);U.rerender();}},'rn-button',s.cursor<=0),
   button(done?R.next+' →':R.skip+' →',next,done?'rn-button primary':'rn-button')
  ]));
  layout.appendChild(helpView(it));
  if(FF.debugMode&&U.review){var dock=U.review.panel(q,{onMarked:function(){next();},onPrev:function(){if(s.cursor>0){s.cursor--;chooseQuestion(s.order[s.cursor],true);U.rerender();root.scrollTo({top:0,behavior:'smooth'});}},canPrev:s.cursor>0});dock.classList.add('review-dock');layout.classList.add('has-review-dock');layout.appendChild(dock);}   // 問題のレビュー（デバッグモードだけ。判断202）。画面の下にいつも出す（判断258）
  main.appendChild(layout);
 }
 function renderFilters(main){
  var a=FF.app;if(!a.session||!a.session.renewal){U.show('study');return;}
  var draft=a.filterDraft||Object.assign({},a.session.sel);
  main.appendChild(button('‹ '+R.returnQuestion,function(){U.show('quiz');},'text-button'));
  var pane=E('section',{class:'filter-page panel'},[title(R.learning,R.conditions,R.filterIntro)]);
  if(C.units(draft.subject,draft.grade).length)pane.appendChild(selectField(R.units,draft.unit,[['all',R.allUnits]].concat(C.units(draft.subject,draft.grade).map(function(u){return [u.id,u.name];})),function(v){draft.unit=v;}));
  pane.appendChild(selectField(R.level,draft.difficulty,[['random',R.random],['basic',R.basic],['standard',R.standard],['advanced',R.advanced]],function(v){draft.difficulty=v;}));
  pane.appendChild(selectField(R.format,draft.answerType,[['choice',R.choice],['input',R.input]],function(v){draft.answerType=v;}));
  pane.appendChild(button(R.applyFilters,function(){a.session.sel=Object.assign({},draft);chooseQuestion();U.show('quiz');},'rn-button primary block'));
  main.appendChild(pane);
 }
 var originalStudy=U.screens.study.render;
 function renderStudy(main,params){
  if(params.tab&&params.tab!=='learn'){originalStudy(main,params);return;}
  FF.app.studyTab='learn';var a=FF.app,s=a.state,g=s.player.grade;
  if(!g){main.appendChild(title(R.learning,R.chooseGrade,R.gradeIntro));main.appendChild(U.gradePicker(null,function(n){a.commit(FF.state.setPlayerGrade(a.state,n));U.rerender();}));return;}
  var subjectHead=title(R.learning,R.subjectHeading,R.subjectLead);subjectHead.appendChild(E('p',{class:'daily-note',rich:R.dailyNote}));   // 手に入る資材の説明（判断319）
  main.appendChild(E('div',{class:'subject-top'},[subjectHead,E('div',{class:'subject-top-actions'},[
   button(school(g)+'  ⚙',function(){U.show('settings');},'rn-button')
  ]),U.artImg('avatar-'+(s.player.avatar||'e1')+'.jpg','subject-avatar subject-heading-avatar')]));
  var art={math:'math',japanese:'jp',science:'sci',social:'soc',english:'en'};
  var order=['math','japanese','science','social','english'];
  main.appendChild(E('div',{class:'subject-grid'},order.map(function(id){
   var nUnits=C.units(id,g).length,progress=C.progress(a.bank,s,id,g);
   var entry=dailyEntry(id),focus=!!(a.learningFocus&&entry&&!entry.random&&entry.resource===a.learningFocus),rname=entry&&entry.resource?U.plain(U.resDef(entry.resource).name):'';
   return E('button',{class:'subject-card subject-'+id+(focus?' daily-focus':''),attrs:{type:'button','data-subject':id,'data-resource':entry&&entry.resource||null,'aria-label':U.plain(L.subjectName(id,g))+'：'+R.todayResource+' '+(entry&&entry.random?R.dailyRandomHelp:rname)},on:{click:function(){makeSession(id);}}},[
    entry?resourceBadge(entry,'subject-daily'):null,
    U.artImg('subj-'+art[id],'subject-art'),E('div',{class:'subject-copy'},[E('span',{class:'eyebrow',text:school(g)}),E('h2',{text:U.plain(L.subjectName(id,g))}),E('p',{text:nUnits?R.unitDescription.replace('{n}',nUnits):R.subjectDescription}),
     E('div',{class:'subject-progress',attrs:{title:progress.generated?R.generatedNote:null}},[E('span',{class:'progress-total',text:R.totalQuestions.replace('{n}',progress.total)}),E('span',{class:'progress-correct',text:R.correctQuestions.replace('{n}',progress.correct)}),E('span',{class:'progress-review',text:R.reviewQuestions.replace('{n}',progress.review)})])])
   ]);
  })));
  if(a.learningFocus){var fc=main.querySelector('.daily-focus');if(fc)setTimeout(function(){try{fc.focus({preventScroll:true});fc.scrollIntoView({block:'nearest'});}catch(e){}},0);}
  main.appendChild(E('div',{class:'study-tools'},[
   button(R.records,function(){U.show('study',{tab:'records'});},'text-button'),button(R.exam,function(){U.show('study',{tab:'exam'});},'text-button'),button(R.diagnosis,function(){U.show('study',{tab:'diagnosis'});},'text-button'),button(R.redeem,function(){U.openRedeem();},'text-button')
  ]));
 }
 // 町のほかの施設（判断324）。絵は img/art/fac-*.webp。仲間紹介所は冒険の編成、チケット引換所は引換所を開く。
 var FACILITIES=[
  {id:'weapon',name:R.facWeapon,open:function(){openWeaponShop();}},{id:'armor',name:R.facArmor,open:function(){openArmorShop();}},{id:'item',name:R.facItem},{id:'tavern',name:R.facTavern},
  {id:'party',name:R.facParty,open:function(){U.show('adventureParty');}},{id:'magic',name:R.facMagic,open:function(){openLab();}},{id:'ticket',name:R.facTicket,open:function(){U.openRedeem();}},{id:'training',name:R.facTraining}
 ];
 // 武器屋・防具屋（判断340・343）：ゴールドで買い、装備する。武器は正解1回のダメージ（冒険では主人公の攻撃力）、防具は受けるダメージを減らす
 var closeShop=null;
 function openGearShop(kind){
  var a=FF.app,SH=FF.shop,armor=kind==='armor',k=armor?'armor':'weapon';
  if(closeShop){closeShop();closeShop=null;}
  var s=a.state;
  var again=function(){openGearShop(kind);};
  var list=E('div',{class:'shop-list'},(armor?FF.defs.ARMORS:FF.defs.WEAPONS).map(function(w){
   var st=armor?SH.astats(w.id):SH.stats(w.id),owned=SH.owned(s,k).indexOf(w.id)>=0,can=SH.canBuyItem(s,k,w.id).ok,h=SH.holder(s,k,w.id);
   var action;
   if(owned)action=E('button',{class:'rn-button shop-btn',attrs:{type:'button'},rich:R.shopEquip,on:{click:function(){if(closeShop){closeShop();closeShop=null;}if(FF.ui.openAssign)FF.ui.openAssign(k,w.id);}}});
   else action=E('button',{class:'rn-button primary shop-btn',attrs:{type:'button',disabled:can?null:'true'},rich:R.shopBuy,on:{click:function(){var r=SH.buyItem(a.state,k,w.id);if(r.ok){a.commit(r.state);U.toast(R.shopBought);again();}}}});
   var power=armor?R.shopDefense.replace('{n}',st.defense):R.shopPower.replace('{n}',st.damage)+'／'+R.shopPowerBonus.replace('{n}',st.damage-SH.stats(FF.balance.DEFAULT_WEAPON).damage);
   var status=owned?E('span',{class:'shop-owned',text:'持っている'+(h?'（装備：'+(h==='hero'?a.state.player.name:FF.texts.adventure.members[h].name)+'）':'（装備していない）')}):E('span',{class:'shop-price'},[st.price?U.fmt(st.price)+' G':E('span',{rich:R.shopFree})]);
   return E('div',{class:'shop-row'+(h?' is-equipped':'')+(owned||can?'':' is-short'),attrs:{'data-weapon':w.id}},[
    E('span',{class:'shop-icon',text:w.icon}),
    E('div',{class:'shop-info'},[E('strong',{class:'shop-name',rich:w.name}),E('span',{class:'shop-power',rich:power}),status]),
    action
   ]);
  }));
  var body=E('div',{class:'shop-body'},[E('p',{class:'shop-gold'},[E('span',{rich:R.shopGold}),E('strong',{text:U.fmt(SH.gold(s))+' G'})]),list,E('p',{class:'shop-note',rich:R.shopNote})]);
  closeShop=U.modal({title:armor?R.facArmor:R.facWeapon,body:body,buttons:[{label:U.T('back'),class:'ghost'}]});
 }
 function openWeaponShop(){openGearShop('weapon');}
 function openArmorShop(){openGearShop('armor');}
 // 魔法研究所（判断363）：司書が仲間になると、魔法の書物を、ゴールドで開発できる
 var closeLab=null;
 function openLab(){
  var a=FF.app,RS=FF.research,s=a.state;
  if(closeLab){closeLab();closeLab=null;}
  var body=E('div',{class:'lab-body'});
  if(!RS.unlocked(s)){
   body.appendChild(E('p',{class:'lab-locked',rich:R.labLocked}));   // 条件（獲得熱量）は、書かない（ネタバレになるため。判断364）
  }else{
   body.appendChild(E('p',{class:'shop-gold'},[E('span',{rich:R.shopGold}),E('strong',{text:U.fmt(FF.shop.gold(s))+' G'})]));
   body.appendChild(E('p',{class:'lab-intro',rich:R.labIntro}));
   var P=FF.balance.RESEARCH.BOOKS,names={heal:R.bookHeal,flame:R.bookFlame,guard:R.bookGuard},texts={heal:R.bookHealText.replace('{n}',P.heal.perLevel),flame:R.bookFlameText.replace('{n}',Math.round(P.flame.perLevel*100)),guard:R.bookGuardText.replace('{n}',Math.round(P.guard.perLevel*100))},icons={heal:'📗',flame:'📕',guard:'📘'};
   body.appendChild(E('div',{class:'shop-list'},RS.bookIds().map(function(id){
    var lv=RS.level(s,id),max=P[id].costs.length,c=RS.canDevelop(s,id),cost=RS.nextCost(s,id);
    var action=lv>=max?E('span',{class:'shop-equipped',rich:R.labMax}):E('button',{class:'rn-button primary shop-btn',attrs:{type:'button','data-book':id,disabled:c.ok?null:'true'},rich:R.labDevelop,on:{click:function(){var r=RS.develop(a.state,id);if(r.ok){a.commit(r.state);U.toast(R.labDone);openLab();}}}});
    return E('div',{class:'shop-row'+(lv>=max||c.ok?'':' is-short'),attrs:{'data-book':id}},[
     E('span',{class:'shop-icon',text:icons[id]}),
     E('div',{class:'shop-info'},[E('strong',{class:'shop-name',rich:names[id]}),E('span',{class:'shop-power',rich:texts[id]}),E('span',{class:'shop-owned',rich:R.labLevel.replace('{lv}',lv).replace('{max}',max)+(cost!=null?'　'+U.fmt(cost)+' G':'')})]),
     action]);
   })));
  }
  closeLab=U.modal({title:R.labTitle,body:body,buttons:[{label:U.T('back'),class:'ghost'}]});
 }
 // 獲得熱量で、仲間が力を貸してくれたとき、お知らせを出す（判断363）
 var joinShowing=false;
 function showJoinNotice(){
  var a=FF.app,s=a.state,ids=s.adventure&&s.adventure.joinNotice||[];
  if(!ids.length||joinShowing)return;joinShowing=true;
  var body=E('div',{class:'stack'},ids.map(function(id){
   var m=FF.texts.adventure.members[id];
   return E('div',{class:'rescue-card'},[
    E('div',{class:'rescue-portrait'},FF.adventureArt?FF.adventureArt(id,true):null),
    E('div',{class:'rescue-text'},[E('strong',{},[U.rich(m.name),U.rich('　'),U.rich(m.role)]),E('p',{class:'rescue-quote',rich:'「'+(m.join||m.rescue||'')+'」'}),E('p',{class:'small muted',rich:R.joinText.replace('{name}',m.name)})])
   ]);
  }));
  U.modal({title:R.joinTitle,body:body,buttons:[{label:U.T('ok'),class:'primary',onClick:function(){joinShowing=false;var n=FF.util.clone(a.state);n.adventure.joinNotice=[];a.commit(n);}}],dismissible:false});
 }
 function facilityGrid(){
  return E('nav',{class:'facility-grid',attrs:{'aria-label':R.facilities}},FACILITIES.map(function(f){
   return E('button',{class:'facility-btn'+(f.open?'':' is-soon'),attrs:{type:'button','data-facility':f.id,'aria-label':U.plain(f.name)+(f.open?'':'（'+U.plain(R.facSoon)+'）')},on:{click:function(){
    if(f.open){f.open();return;}
    U.modal({title:f.name,body:E('p',{class:'facility-soon',rich:R.facSoonText}),buttons:[{label:U.T('back'),class:'ghost'}]});
   }}},[
    U.artImg('fac-'+f.id+'.webp','facility-icon'),E('span',{class:'facility-name',rich:f.name})
   ]);
  }));
 }
 var originalBase=U.screens.base.render;
 U.screens.base.render=function(main){
  main.appendChild(E('section',{class:'home-mission'},[
   E('div',{},[E('h1',{text:R.homeHeading}),E('p',{text:R.homeLead})]),
   button(R.start+' →',function(){U.show('study',{tab:'learn'});},'rn-button primary home-start')
  ]));
  originalBase(main);
  var cta=main.querySelector('.base-cta');if(cta)cta.remove();
  // スマホでは、上の見出しと説明を出さず、「学習する」を、風景（フィールドマップ）の下に置く（判断315。PC では、上のボタンだけを出す）
  var scene=main.querySelector('.scene');
  if(scene&&scene.parentNode)scene.parentNode.insertBefore(button(R.start+' →',function(){U.show('study',{tab:'learn'});},'rn-button primary home-start-mobile'),scene.nextSibling);
  // 学習するボタンの下に、ほかの施設のアイコン（スマホでは横4つ。判断324）。仲間紹介所とチケット引換所が使える
  var facilities=facilityGrid();
  if(scene&&scene.parentNode)scene.parentNode.insertBefore(facilities,(scene.nextSibling&&scene.nextSibling.nextSibling)||null);
  // 「学んで、熱を生む」などの3つの手順の表示は、なくした（判断338）
  if(U.adventureEntry)main.insertBefore(U.adventureEntry(),facilities);
 };
 U.screens.study.render=renderStudy;
 U.screens.quiz={render:renderQuiz};
 U.screens.lessonFilters={render:renderFilters};
 var lastValues={},hudSignature=null,counterTweens={};
 function countSpan(key,value){
  value=FF.rewardFlight.display(key,value);
  var prev=lastValues[key],node=E('span',{class:'resource-value',text:U.fmt(value)});lastValues[key]=value;
  var reduce=root.matchMedia&&root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prev!==undefined&&value>prev&&!reduce)counterTweens[key]={from:prev,to:value,start:root.performance.now()};
  if(value<prev||reduce)delete counterTweens[key];
  var tween=counterTweens[key];
  if(tween&&root.performance.now()-tween.start<650){
   node.classList.add('count-up');
   node.style.setProperty('--gain-elapsed',(-Math.max(0,root.performance.now()-tween.start))+'ms');
   function frame(t){var k=Math.min(1,(t-tween.start)/650);node.textContent=U.fmt(tween.from+(tween.to-tween.from)*(1-Math.pow(1-k,3)));if(k<1&&node.isConnected)root.requestAnimationFrame(frame);else if(k>=1)node.classList.remove('count-up');}
   frame(root.performance.now());root.requestAnimationFrame(frame);
  }
  return node;
 }
 FF.renewalHud=function(hud){
  var a=FF.app,s=a.state;hud.hidden=a.screen==='title';if(hud.hidden){lastValues={};hudSignature=null;return;}
  if(s.adventure&&s.adventure.joinNotice&&s.adventure.joinNotice.length&&a.screen!=='quiz'&&a.screen!=='battle'&&a.screen!=='exploreQuiz')root.setTimeout(showJoinNotice,0);
  var recovered=FF.tickets.recoverTickets(s.tickets,a.now());
  var signature=JSON.stringify([a.screen,a.session&&a.session.sel&&a.session.sel.resource,s.resources,s.studyPoints,s.adventure&&s.adventure.gold,recovered.count,FF.defs.RESOURCES.map(function(r){return FF.rewardFlight.display(r.id,s.resources[r.id]);}),FF.rewardFlight.display('heat',s.studyPoints)]);
  if(signature===hudSignature)return;
  hudSignature=signature;
  U.clear(hud);hud.className='hud renewal-hud';
  hud.appendChild(E('div',{class:'masthead'},[
   E('button',{class:'brand',attrs:{type:'button','aria-label':'Frozen Frontier'},on:{click:function(){U.show('base');}}},[
    E('img',{class:'brand-snowflake',attrs:{src:'img/snowflake.svg',alt:''}}),
    E('span',{class:'brand-text'},[E('span',{class:'brand-name',text:'Frozen Frontier'}),E('span',{class:'brand-caption',rich:R.brandCaption})])   // 題名の下に、小さく（判断314）
   ]),
   E('div',{class:'masthead-links'},[button('⌂ '+R.home,function(){U.show('base');},'masthead-link'),button('▥ '+R.records,function(){U.show('study',{tab:'records'});},'masthead-link'),button('⚙ '+R.settings,function(){U.show('settings');},'masthead-link')])
  ]));
  var strip=E('div',{class:'resource-strip'});
  FF.defs.RESOURCES.forEach(function(r){
   var selectable=false;   // 資材は教科で決まるので、資材欄からは選べない（判断319）
   strip.appendChild(E(selectable?'button':'div',{class:'resource-item'+(selectable?' resource-selectable':''),attrs:{type:selectable?'button':null,'data-resource':r.id,'aria-label':U.plain(r.name)+' '+U.fmt(s.resources[r.id])+(selectable?'・この資材を獲得する':''),'aria-pressed':selectable?(a.session.sel.resource===r.id?'true':'false'):null},on:selectable?{click:function(){setQuizResource(r.id);}}:{}},[U.resIcon(r),E('span',{class:'resource-label',text:U.plain(r.name)}),countSpan(r.id,s.resources[r.id])]));
  });
  strip.appendChild(E('div',{class:'heat-item',attrs:{'aria-label':R.heat+' '+s.studyPoints}},[E('img',{class:'heat-illustration',attrs:{src:'img/heat.svg',alt:''}}),E('span',{class:'resource-label',text:R.heat}),countSpan('heat',s.studyPoints),E('small',{text:'pt'})]));
  var gold=FF.shop?FF.shop.gold(s):0;   // 所持ゴールド（冒険のゴールド。判断360）
  strip.appendChild(E('div',{class:'gold-item',attrs:{'aria-label':R.gold+' '+gold,title:R.goldHelp}},[E('span',{class:'gold-ico',attrs:{'aria-hidden':'true'},text:'🪙'}),E('span',{class:'resource-label',rich:R.gold}),E('strong',{class:'gold-num',text:U.fmt(gold)}),E('small',{text:'G'})]));
  var tk=FF.tickets.recoverTickets(s.tickets,a.now());strip.appendChild(E('div',{class:'ticket-item',attrs:{title:R.ticketHelp}},[E('img',{class:'ticket-illustration',attrs:{src:'img/ticket.svg',alt:''}}),E('span',{class:'resource-label',text:R.answerTickets}),E('strong',{text:tk.count+'/'+FF.balance.TICKET_MAX})]));
  hud.appendChild(strip);
 };
 FF.renewalNav=function(nav){
  var screen=FF.app.screen,navScreen=screen==='adventureParty'?'party':screen==='adventureInventory'?'inventory':screen;nav.hidden=['title','quiz','lessonFilters','exam','diagnosis','battle','exploreQuiz'].indexOf(screen)>=0;
  U.clear(nav);
  var options=[['base','img/art/housing.jpg',R.town],['study','img/art/subj-en.jpg',R.start],['explore','img/nav-compass.svg',R.explore],['party','img/nav-party.svg',R.partyNav],['inventory','img/nav-bag.svg',R.invNav],['settings','img/nav-settings.svg',R.settings]];
  nav.appendChild(E('div',{class:'inner'},options.map(function(o){return E('button',{class:navScreen===o[0]?'active':'',attrs:{type:'button','aria-current':navScreen===o[0]?'page':null},on:{click:function(){if(o[0]==='party')U.show('adventureParty');else if(o[0]==='inventory')U.show('adventureInventory');else if(o[0]==='explore'&&!FF.exploration.isExploreOpen(FF.app.state))U.toast(U.T('explore.navLocked'));else U.show(o[0],o[0]==='study'?{tab:'learn'}:{});}}},[E('img',{class:'nav-illustration',attrs:{src:o[1],alt:''}}),E('span',{class:'nav-label',text:o[2]})]);})));
 };
})(this);


