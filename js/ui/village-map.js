// 固定した窓の奥に地区を横につなぐ。本体の施設ボタンはそのまま中央地区へ移す。
(function (root) {
  'use strict';
  var FF = root.FF, U = FF.ui, E = U.el;
  var camera = 0, resizeObserver = null;
  var districts = [
    { id: 'center', name: '{中央|ちゅうおう}の{村|むら}' },
    { id: 'east', name: '{東|ひがし}の{開拓地|かいたくち}', background: 'img/homepage/east-clearing.webp' }
  ];
  // 建物と背景を分離。座標は各地区内の%なので、枠のサイズが変わっても位置を保てる。
  var plots = [
    { id: 'magic', name: '{魔法研究所|まほうけんきゅうじょ}', x: 29, y: 48, facility: 'magic' },
    { id: 'training', name: '{訓練所|くんれんじょ}', x: 71, y: 49, facility: 'training' },
    { id: 'north-lot', name: '{建設予定地|けんせつよていち}', x: 32, y: 79 },
    { id: 'south-lot', name: '{建設予定地|けんせつよていち}', x: 73, y: 79 }
  ];
  districts[1].plots = plots;
  function rich(tag, cls, content) { return E(tag, { class: cls, rich: content }); }
  function action(label, cls, onClick) {
    return E('button', { class: cls, attrs: { type: 'button' }, rich: label, on: { click: onClick } });
  }
  function mount(main) {
    var scene = main.querySelector('.scene');
    if (!scene) return;
    if (resizeObserver) resizeObserver.disconnect();
    var box = E('section', { class: 'village-map', attrs: { 'aria-label': '村の地図' } });
    scene.parentNode.insertBefore(box, scene);
    var area = rich('strong', 'village-current', districts[0].name);
    area.setAttribute('aria-live', 'polite');
    var home = action('⌂ {中央炉|ちゅうおうろ}へ{戻|もど}る', 'village-home', function () { go(0); });
    box.appendChild(E('div', { class: 'village-toolbar' }, [
      E('div', {}, [rich('span', 'village-eyebrow', '{村|むら}を{見渡|みわた}す'), area]), home
    ]));
    var viewport = E('div', { class: 'village-viewport', attrs: { tabindex: '0', role: 'region', 'aria-label': '村の地図。左右にスワイプ、または左右の矢印キーで移動', 'aria-describedby': 'village-help' } });
    var world = E('div', { class: 'village-world' });
    world.style.setProperty('--district-count', districts.length);
    districts.forEach(function (district, index) {
      var pane = E('div', { class: 'village-district ' + (index === 0 ? 'village-center' : 'village-east'), attrs: { 'data-district': district.id } });
      world.appendChild(pane);
      if (index === 0) { pane.appendChild(scene); return; }
      pane.appendChild(E('img', { class: 'village-east-bg', attrs: { src: district.background, alt: '', draggable: 'false' } }));
      pane.appendChild(rich('span', 'village-east-name', district.name));
      (district.plots || []).forEach(function (plot) {
      var button = action(plot.name, 'village-plot' + (plot.facility ? ' has-facility' : ' is-empty'), function () {
        if (plot.facility) {
          var original = main.querySelector('.facility-grid [data-facility="' + plot.facility + '"]');
          if (original) original.click();
        } else {
          U.modal({ title: plot.name, body: '{村|むら}の{新|あたら}しい{施設|しせつ}をつくるための{土地|とち}です。ここに、どんな{施設|しせつ}をつくろう？', buttons: [{ label: U.T('back'), class: 'ghost' }] });
        }
      });
      U.clear(button);
      button.setAttribute('data-plot', plot.id);
      button.style.left = plot.x + '%'; button.style.top = plot.y + '%';
      if (plot.facility) button.appendChild(E('img', { attrs: { src: 'img/art/fac-' + plot.facility + '.webp', alt: '', draggable: 'false' } }));
      else button.appendChild(E('span', { class: 'village-lot-symbol', text: '＋', attrs: { 'aria-hidden': 'true' } }));
      button.appendChild(rich('span', 'village-plot-label', plot.name));
      pane.appendChild(button);
      });
    });
    viewport.appendChild(world); box.appendChild(viewport);
    var prev = action('‹', 'village-arrow', function () { go(Math.ceil(camera) - 1); });
    prev.setAttribute('aria-label', '左の地区へ');
    var next = action('›', 'village-arrow', function () { go(Math.floor(camera) + 1); });
    next.setAttribute('aria-label', '右の地区へ');
    var mini = E('nav', { class: 'village-minimap', attrs: { 'aria-label': '地区を選ぶ' } });
    var markers = districts.map(function (district, index) {
      var button = action(district.name, 'village-mini', function () { go(index); });
      button.setAttribute('data-map-district', district.id);
      mini.appendChild(button); return button;
    });
    box.appendChild(E('div', { class: 'village-navigation' }, [prev, mini, next]));
    box.appendChild(E('p', { class: 'village-help', attrs: { id: 'village-help' } }, [
      rich('span', 'village-touch-help', '← {左右|さゆう}にスワイプして、{村|むら}を{見渡|みわた}そう →'),
      rich('span', 'village-mouse-help', '← ドラッグで{移動|いどう}・{施設|しせつ}をクリック →')
    ]));

    var selected = -1, previousWidth = viewport.clientWidth, glideFrame = 0;
    function stopGlide() { root.cancelAnimationFrame(glideFrame); glideFrame = 0; }
    function update() {
      if (!viewport.isConnected) return;
      // リサイズに伴うscrollイベントでも、古いpx座標から地区を計算し直さない。
      if (viewport.clientWidth !== previousWidth) {
        previousWidth = viewport.clientWidth;
        viewport.scrollLeft = viewport.clientWidth * camera;
      }
      camera = Math.max(0, Math.min(districts.length - 1, viewport.scrollLeft / viewport.clientWidth || 0));
      var index = Math.round(camera);
      if (index !== selected) {
        selected = index; U.clear(area); area.appendChild(U.rich(districts[index].name));
        markers.forEach(function (m, i) { m.setAttribute('aria-current', i === index ? 'location' : 'false'); });
      }
      prev.disabled = camera < 0.005;
      next.disabled = camera > districts.length - 1.005;
      home.disabled = camera < 0.005;
    }
    function go(index) {
      stopGlide();
      index = Math.max(0, Math.min(districts.length - 1, index));
      viewport.scrollTo({ left: viewport.clientWidth * index, behavior: root.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
    viewport.addEventListener('scroll', update, { passive: true });
    viewport.addEventListener('keydown', function (event) {
      if (event.target !== viewport) return;
      if (event.key === 'ArrowRight') go(Math.floor(camera) + 1);
      else if (event.key === 'ArrowLeft') go(Math.ceil(camera) - 1);
      else if (event.key === 'Home') go(0);
      else if (event.key === 'End') go(districts.length - 1);
      else return;
      event.preventDefault();
    });
    // 縦はブラウザーのページスクロール、横は8pxを超えてから地図をドラッグする。
    // 押しただけなら施設のクリック。タッチでは指を離すと短い慣性移動を付ける。
    var pointer = null, suppressClick = false;
    viewport.addEventListener('pointerdown', function (event) {
      if (!event.isPrimary || event.button !== 0) return;
      stopGlide();
      suppressClick = false;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, time: root.performance.now(), velocity: 0, left: viewport.scrollLeft, touch: event.pointerType === 'touch', dragging: false };
    });
    viewport.addEventListener('pointermove', function (event) {
      if (!pointer || event.pointerId !== pointer.id) return;
      if (!pointer.touch && !(event.buttons & 1)) { release(); return; }
      var dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
      if (!pointer.dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        pointer.dragging = true; suppressClick = true;
        viewport.setPointerCapture(event.pointerId); viewport.classList.add('is-dragging');
      }
      if (pointer.dragging) {
        event.preventDefault();
        var now = root.performance.now(), dt = Math.max(1, now - pointer.time);
        pointer.velocity = pointer.velocity * .4 + ((pointer.lastX - event.clientX) / dt) * .6;
        pointer.lastX = event.clientX; pointer.time = now;
        viewport.scrollLeft = pointer.left - dx;
      }
    });
    function release(event) {
      var p = pointer;
      pointer = null; viewport.classList.remove('is-dragging');
      if (!p || !p.touch || !p.dragging || !event || event.type !== 'pointerup' || root.performance.now() - p.time > 120 || root.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var velocity = Math.max(-2.5, Math.min(2.5, p.velocity)), last = root.performance.now();
      function glide(now) {
        if (!viewport.isConnected) return;
        var dt = Math.min(32, now - last), before = viewport.scrollLeft;
        last = now; viewport.scrollLeft += velocity * dt;
        velocity *= Math.exp(-dt / 180);
        if (Math.abs(velocity) > .02 && viewport.scrollLeft !== before) glideFrame = root.requestAnimationFrame(glide);
      }
      glideFrame = root.requestAnimationFrame(glide);
    }
    viewport.addEventListener('pointerup', release);
    viewport.addEventListener('pointercancel', release);
    viewport.addEventListener('lostpointercapture', function (event) {
      // タッチ開始時の施設ボタンから枠へcaptureを移す際の通知は、終了扱いにしない。
      if (event.target === viewport) release(event);
    });
    viewport.addEventListener('click', function (event) {
      if (suppressClick && event.detail > 0) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
    }, true);
    viewport.addEventListener('dragstart', function (event) { event.preventDefault(); });
    viewport.addEventListener('pointerleave', function () { if (pointer && !pointer.dragging) release(); });
    var initialCamera = camera;
    viewport.scrollLeft = viewport.clientWidth * initialCamera;
    update();
    if (root.ResizeObserver) {
      var observer = new root.ResizeObserver(function () {
        if (!viewport.isConnected) { observer.disconnect(); return; }
        update();
      });
      observer.observe(viewport);
      resizeObserver = observer;
    }
  }
  FF.villageMap = { mount: mount };
})(this);
