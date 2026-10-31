// オフラインでも遊べるようにする Service Worker（判断507）。
// 自分のサイトのファイルだけを扱う（Google Fonts・Supabase などほかのサイトへの通信には、さわらない）。
//  ・ページ・JS・CSS・問題データ：ネットがあれば最新を読み、読めたものを保存。つながらないときは保存したものを使う（更新がすぐ届く）
//  ・絵・音：保存があればそれを使う（重いので、毎回読みなおさない）
var VERSION = 'ff-v1';
var CORE = 'ff-core-' + VERSION, MEDIA = 'ff-media-' + VERSION;
var SHELL = ['./', 'index.html', 'manifest.json', 'img/pwa/icon-192.png', 'img/pwa/icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CORE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('ff-') === 0 && k !== CORE && k !== MEDIA; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function isMedia(url) { return /\.(png|jpe?g|webp|svg|gif|ogg|mp3|mp4|m4a|wav)$/i.test(url.pathname); }

self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || req.headers.has('range')) return;
  if (isMedia(url)) {
    e.respondWith(caches.open(MEDIA).then(function (c) {
      return c.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) { if (res && res.status === 200) c.put(req, res.clone()); return res; });
      });
    }));
    return;
  }
  e.respondWith(caches.open(CORE).then(function (c) {
    return fetch(req).then(function (res) { if (res && res.status === 200) c.put(req, res.clone()); return res; })
      .catch(function () { return c.match(req, { ignoreSearch: false }).then(function (hit) { return hit || (req.mode === 'navigate' ? c.match('index.html') : undefined); }); });
  }));
});
