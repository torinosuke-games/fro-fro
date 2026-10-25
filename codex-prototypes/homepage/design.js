// ChatGPT の比較用デザイン。ゲームの判定・報酬・施設の操作は本体を共有する。
(function (root) {
  'use strict';
  var FF = root.FF, U = FF.ui, E = U.el;

  function text(tag, cls, content) {
    return E(tag, { class: cls, rich: content });
  }

  var renderTitle = U.screens.title.render;
  U.screens.title.render = function (main) {
    renderTitle(main);
    var wrap = main.querySelector('.title-screen');
    wrap.classList.add('replica-title');
    var card = wrap.querySelector('.title-card');
    var intro = E('div', { class: 'replica-title-intro' }, [
      text('p', 'replica-eyebrow', '{学|まな}んで、{育|そだ}てる{冒険|ぼうけん}。'),
      E('p', { class: 'replica-title-description' }, [U.rich('{問題|もんだい}を{解|と}いて{資材|しざい}を{集|あつ}め、'), E('br'), U.rich('{雪|ゆき}の{町|まち}を{育|そだ}てる{学習|がくしゅう}ゲーム。')])
    ]);
    card.insertBefore(intro, card.firstChild);
    var opening = card.querySelector('.opening');
    U.clear(opening);
    opening.appendChild(U.rich('{冒険|ぼうけん}で{使|つか}う{名前|なまえ}を{教|おし}えてください。'));
    var submit = card.querySelector('button');
    U.clear(submit);
    submit.appendChild(U.rich('この{名前|なまえ}ではじめる'));
  };

  // 設定はヘッダーに残し、下部ナビを5項目の1行に整える。
  var renderNav = FF.renewalNav;
  FF.renewalNav = function (nav) {
    renderNav(nav);
    var buttons = nav.querySelectorAll('.inner > button');
    Array.prototype.forEach.call(buttons, function (button) {
      if (button.querySelector('img[src="img/nav-settings.svg"]')) button.remove();
    });
  };

  var renderBase = U.screens.base.render;
  U.screens.base.render = function (main) {
    renderBase(main);
    var firstTown = FF.app.state.buildings.furnace.level <= 1;
    var mission = main.querySelector('.home-mission');
    var start = mission.querySelector('.home-start');
    start.classList.add('replica-start');
    U.clear(start);
    start.appendChild(U.rich('{教科|きょうか}を{選|えら}んで1{問|もん} →'));
    U.clear(mission);
    mission.className = 'home-mission replica-mission';
    mission.setAttribute('aria-labelledby', 'replica-mission-title');
    var heading = text('h1', '', firstTown ? 'まずは1{問|もん}。{町|まち}に、{最初|さいしょ}の{熱|ねつ}を。' : 'あなたの「わかった」で、{町|まち}が{育|そだ}つ。');
    heading.id = 'replica-mission-title';
    mission.appendChild(E('div', { class: 'replica-mission-copy' }, [
      text('p', 'replica-eyebrow', firstTown ? '{今日|きょう}の{一歩|いっぽ}' : '{町|まち}のつづきを、ここから。'),
      heading,
      text('p', 'replica-mission-lead', firstTown ? '{問題|もんだい}を{解|と}いて、{中央炉|ちゅうおうろ}を{育|そだ}てる{資材|しざい}を{集|あつ}めよう。' : '{学|まな}んで{資材|しざい}を{集|あつ}め、{町|まち}の{施設|しせつ}を{育|そだ}てよう。')
    ]));
    mission.appendChild(start);
    if (firstTown) {
      var steps = E('ol', { class: 'replica-steps', attrs: { 'aria-label': '町づくりの進め方' } }, [
        E('li', { class: 'is-current' }, [E('span', { text: '1' }), U.rich('{問題|もんだい}を{解|と}く')]),
        E('li', {}, [E('span', { text: '2' }), U.rich('{資材|しざい}を{集|あつ}める')]),
        E('li', {}, [E('span', { text: '3' }), U.rich('{町|まち}を{育|そだ}てる')])
      ]);
      mission.appendChild(steps);
      var greeting = main.querySelector('.greeting');
      if (greeting) {
        U.clear(greeting);
        greeting.appendChild(U.rich('{中央炉|ちゅうおうろ}が{町|まち}の{命|いのち}の{火|ひ}。まずは{学習|がくしゅう}で{資材|しざい}を{集|あつ}めよう。'));
      }
    }
    // 最優先の操作を上のカードへ一本化。町の絵はそのすぐ下に残す。
    var mobileStart = main.querySelector('.home-start-mobile');
    if (mobileStart) mobileStart.remove();

    var grid = main.querySelector('.facility-grid');
    if (grid) {
      var details = E('details', { class: 'replica-facilities' });
      if (!firstTown) details.open = true;
      details.appendChild(E('summary', {}, [
        E('span', {}, [text('strong', '', '{町|まち}の{施設|しせつ}'), text('span', 'replica-facility-note', '{武器|ぶき}や{道具|どうぐ}、{仲間|なかま}の{準備|じゅんび}はこちら')]),
        text('span', 'replica-facility-toggle', '8つの{施設|しせつ}')
      ]));
      grid.parentNode.insertBefore(details, grid);
      details.appendChild(grid);
    }
    FF.prototypeVillageMap.mount(main);
  };
})(this);

// 学習ページの配置と答えの閲覧。問題マップ・採点は本体を共有する。
(function(root){
 'use strict';
 var U=root.FF.ui,render=U.screens.quiz.render,fitCleanup=null;
 function fitSidebar(layout,heading){
  if(fitCleanup)fitCleanup();
  var frame=0;
  function measure(){
   frame=0;if(!layout.isConnected)return;
   var top=layout.getBoundingClientRect().top+root.scrollY;
   layout.style.setProperty('--lesson-top',Math.ceil(top)+'px');
  }
  function schedule(){if(!frame)frame=root.requestAnimationFrame(measure);}
  var observer=root.ResizeObserver?new ResizeObserver(schedule):null;
  if(observer){var hud=document.getElementById('hud');if(hud)observer.observe(hud);if(heading)observer.observe(heading);}
  root.addEventListener('resize',schedule);
  if(root.visualViewport)root.visualViewport.addEventListener('resize',schedule);
  schedule();
  fitCleanup=function(){if(observer)observer.disconnect();root.removeEventListener('resize',schedule);if(root.visualViewport)root.visualViewport.removeEventListener('resize',schedule);root.cancelAnimationFrame(frame);};
 }

 U.screens.quiz.render=function(main){
  render(main);
  main.querySelectorAll('.scratch-toggle .sp-ico').forEach(function(icon){
   icon.replaceWith(U.el('img',{class:'sp-ico replica-pencil',attrs:{src:'codex-prototypes/homepage/memo-pencil.webp',alt:'',width:'24',height:'24'}}));
  });
  var layout=main.querySelector('.workbench');
  if(layout){
   layout.classList.add('replica-lesson');
   var badge=layout.querySelector('.question-badge');
   if(badge)badge.textContent=badge.textContent.replace(/^問題(?=\s*\d)/,'問');
   var progress=layout.querySelector('.side-title .muted');
   if(progress){if(/^\d+問中/.test(progress.textContent))progress.textContent='全'+progress.textContent;progress.textContent=progress.textContent.replace(/せいかい/g,'正解');}
   layout.querySelectorAll('.unit-tally').forEach(function(el){el.textContent=el.textContent.replace(/せいかい/g,'正解');});

   var session=root.FF.app.session;
   var item=session&&session.items[session.currentId];
   var actions=layout.querySelector('.lesson-actions');
   if(item&&actions){
    if(!item.attempt.done){
     var reveal=U.el('button',{class:'rn-button replica-reveal-answer',attrs:{type:'button'},rich:'{答|こた}えを見る'});
     reveal.addEventListener('click',function(){
      if(item.attempt.done)return;
      // 閲覧は採点APIを呼ばず、永続の正解記録・報酬・チケットを変更しない。
      item.answerViewed=true;item.attempt=Object.assign({},item.attempt,{done:true});
      item.error=null;item.outcome=null;U.rerender();
     });
     actions.insertBefore(reveal,actions.lastElementChild);
    }else if(item.answerViewed){
     actions.parentNode.insertBefore(U.el('p',{class:'replica-answer-viewed',attrs:{role:'status'},rich:'{答|こた}えを見ました。この{問題|もんだい}の{報酬|ほうしゅう}はありません。'}),actions);
    }
   }
   var encourage=layout.querySelector('.encourage');
   if(encourage)encourage.remove();
   if(layout.querySelector('.question-card.is-done')){
    var answeredHint=layout.querySelector('.hint-card');
    if(answeredHint)answeredHint.remove();
   }
   var hintIntro=layout.querySelector('.hint-card > p.small.muted');
   if(hintIntro)hintIntro.remove();
   var lockMark=layout.querySelector('.locked-explanation .lock-mark');
   if(lockMark)lockMark.remove();
   var mapNote=layout.querySelector('.question-index > p');
   if(mapNote)mapNote.textContent=mapNote.textContent.replace('記録は保存されます。','').trim();
   var heading=main.querySelector('.lesson-heading');
   var memo=layout.querySelector('.scratch-toggle.corner');
   if(heading){
    var leading=document.createElement('div'),trailing=document.createElement('div');
    leading.className='replica-lesson-leading';trailing.className='replica-lesson-trailing';
    Array.from(heading.children).forEach(function(el,i){(i<2?leading:trailing).appendChild(el);});
    var controls=document.createElement('span');controls.className='lesson-inline-controls';
    ['.quiz-resource-button','.filter-open'].forEach(function(selector){var el=trailing.querySelector(selector);if(el)controls.appendChild(el);});
    var subjectGroup=document.createElement('div');subjectGroup.className='lesson-subject-group';
    var subject=leading.children[1];if(subject)subjectGroup.appendChild(subject);
    subjectGroup.appendChild(controls);leading.appendChild(subjectGroup);
    heading.appendChild(leading);
    if(memo)heading.appendChild(memo);
    heading.appendChild(trailing);
   }
   if(heading){
    var completed=heading.querySelector('.lesson-session-count');if(completed)completed.textContent=completed.textContent.replace(/とりくみました/g,'取り組みました');
    var filter=heading.querySelector('.filter-open');
    if(filter){var popupButton=filter.cloneNode(true);filter.replaceWith(popupButton);popupButton.setAttribute('aria-haspopup','dialog');popupButton.addEventListener('click',function(){
     var app=root.FF.app;app.filterDraft=Object.assign({},app.session.sel);
     var temporary=document.createElement('div');U.screens.lessonFilters.render(temporary);
     var pane=temporary.querySelector('.filter-page'),apply=pane&&pane.querySelector('.primary');if(!pane||!apply)return;
     var body=document.createElement('div');body.className='lesson-filter-popover';pane.querySelectorAll('.rn-field').forEach(function(field){body.appendChild(field);});
     U.modal({title:'単元・難易度',body:body,buttons:[{label:'キャンセル',onClick:function(){app.filterDraft=null;}},{label:'適用する',class:'primary',onClick:function(){apply.click();app.filterDraft=null;}}]});
     var overlay=body.closest('.overlay');overlay.setAttribute('aria-label','単元・難易度');body.closest('.modal').classList.add('lesson-filter-modal');
     overlay.addEventListener('keydown',function(e){if(e.key!=='Tab')return;var focusable=Array.from(overlay.querySelectorAll('select,button')).filter(function(el){return !el.disabled;}),first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
     var observer=new MutationObserver(function(){if(!overlay.isConnected){observer.disconnect();var target=main.querySelector('.filter-open');if(target)target.focus({preventScroll:true});}});observer.observe(document.body,{childList:true});
     var first=body.querySelector('select');if(first)first.focus({preventScroll:true});
    });}
   }
   fitSidebar(layout,heading);
  }
 };
})(this);

FF.texts.renewal.dailyNote=FF.texts.renewal.dailyNote.replace('☆はランダムです','サイコロはランダムです');

// 共通ヘッダーの文字記号を、生成したアイコンへ置き換える。
(function(root){
 var FF=root.FF,U=FF.ui,render=FF.renewalHud;
 FF.renewalHud=function(hud){
  render(hud);
  var names=['home','records','settings'];
  hud.querySelectorAll('.masthead-link').forEach(function(button,i){
   if(!names[i])return;
   var label=button.textContent.replace(/^[⌂▥⚙]\s*/,'').trim();
   U.clear(button);button.setAttribute('aria-label',label);button.setAttribute('title',label);
   button.appendChild(U.el('img',{class:'masthead-icon',attrs:{src:'codex-prototypes/homepage/nav-'+names[i]+'.webp',alt:'',width:'24',height:'24'}}));
   button.appendChild(U.el('span',{class:'masthead-label',text:label}));
  });
 };
})(this);

// 全学年の算数・数学の表示を教科書式の分数へ。元の問題データと採点値は維持する。
(function(root){
 var FF=root.FF,U=FF.ui,render=U.screens.quiz.render;
 function fractions(container){
  var walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT),nodes=[],node;
  while((node=walker.nextNode())){
   if(node.parentElement.closest('rt,rp,svg,input,textarea,.g6-fraction'))continue;
   if(node.nodeValue.indexOf('/')>=0)nodes.push(node);
  }
  nodes.forEach(function(node){
   var value=node.nodeValue,re=/(?<![\dA-Za-z./])([−－-]?(?:[0-9０-９]+(?:[.．][0-9０-９]+)?[a-zA-Z]?|[a-zA-Z])|[（(][^()（）/\n]{1,40}[)）])\/([−－-]?(?:[1-9１-９][0-9０-９]*|[a-zA-Z])|[（(][^()（）/\n]{1,40}[)）])(?![\d/])/g,m,last=0,fragment=document.createDocumentFragment();
   while((m=re.exec(value))){
    fragment.appendChild(document.createTextNode(value.slice(last,m.index)));
    var fraction=document.createElement('span');fraction.className='g6-fraction';fraction.setAttribute('role','math');fraction.setAttribute('aria-label',m[2]+'分の'+m[1]);fraction.dataset.value=m[0];
    [['g6-numerator',m[1]],['g6-fraction-slash','/'],['g6-denominator',m[2]]].forEach(function(part){var span=document.createElement('span');span.className=part[0];span.textContent=part[1];span.setAttribute('aria-hidden','true');fraction.appendChild(span);});
    fragment.appendChild(fraction);last=re.lastIndex;
   }
   if(last){fragment.appendChild(document.createTextNode(value.slice(last)));node.replaceWith(fragment);}
  });
 }
 U.screens.quiz.render=function(main){
  render(main);
  var s=FF.app.session,item=s&&s.items&&s.items[s.currentId],q=item&&item.attempt.question;
  if(!q||q.subject!=='math')return;
  main.querySelectorAll('.lesson-question,.option-text,.hint-step p,.answer-value,.explanation-text,.lesson-figure figcaption').forEach(fractions);
 };
})(this);
