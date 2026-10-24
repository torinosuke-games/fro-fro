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

// 学習ページの装飾だけを追加。問題マップは本体のカレンダー調をそのまま使う。
(function(root){
 'use strict';
 var U=root.FF.ui,render=U.screens.quiz.render;
 U.screens.quiz.render=function(main){
  render(main);
  var layout=main.querySelector('.workbench');
  if(layout){
   layout.classList.add('replica-lesson');
   var encourage=layout.querySelector('.encourage');
   if(encourage)encourage.remove();
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
    heading.appendChild(leading);
    if(memo)heading.appendChild(memo);
    heading.appendChild(trailing);
   }
  }
 };
})(this);

FF.texts.renewal.dailyNote=FF.texts.renewal.dailyNote.replace('☆はランダムです','サイコロはランダムです');
