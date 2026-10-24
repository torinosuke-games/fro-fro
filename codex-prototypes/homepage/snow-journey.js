// 比較用の探索モデル。既存 adventure の進行・報酬・セーブとは独立。
(function (root) {
  'use strict';
  var FF = root.FF, W = 40, H = 30;
  var places = [
    { id: 'home', x: 4, y: 24, name: '灯火の村', kind: 'town', note: '冒険のはじまり。中央炉の火が、帰り道の目印。' },
    { id: 'fork', x: 14, y: 19, name: '三つ道の標', kind: 'sign', note: '北：白樺の宿場町 ／ 西：こだまの洞窟 ／ 東：封印図書館。街道では魔物に出会いません。' },
    { id: 'camp', x: 20, y: 15, name: '旅人の焚き火', kind: 'camp', note: '湖を渡れば、次の街。東の森には、言葉を封じる魔物の古い図書館があるらしい。' },
    { id: 'town', x: 29, y: 8, name: '白樺の宿場町', kind: 'town', note: '山へ向かう旅人が集まる、二つ目の街。訪れた街には「帰還」からすぐに戻れます。' },
    { id: 'cave', x: 8, y: 9, name: 'こだまの洞窟', kind: 'cave', note: '氷の奥から、かすかな光が見える。小さな洞窟を探索しよう。' },
    { id: 'library', x: 33, y: 22, name: '封印図書館', kind: 'boss', note: '国語を司る大ボスの拠点。言葉を取り戻す戦いを、ここに追加する予定です。今回は入口まで探索できます。' },
    { id: 'pass', x: 34, y: 4, name: '氷嶺への峠', kind: 'gate', note: '次の地方への道。氷山の観測塔（理科）へ続く地域を、ここから追加できます。今は雪で閉ざされています。' }
  ];
  var grid = Array.from({ length: H }, function (_, y) { return Array.from({ length: W }, function (_, x) {
    if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) return '#';
    if (Math.pow((x - 25) / 6, 2) + Math.pow((y - 15) / 4, 2) < 1) return '~';
    return ((x * 37 + y * 19 + x * y * 7) % 23 < 6) ? '#' : '.';
  }); });
  function road(points, type) {
    points.slice(1).forEach(function (p, i) {
      var a = points[i], dx = Math.sign(p[0] - a[0]), dy = Math.sign(p[1] - a[1]), n = Math.max(Math.abs(p[0] - a[0]), Math.abs(p[1] - a[1]));
      for (var j = 0; j <= n; j++) { var x = a[0] + dx * j, y = a[1] + dy * j;
        grid[y][x] = grid[y][x] === '~' || grid[y][x] === '=' ? '=' : (grid[y][x] === 'r' ? 'r' : type);
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(function (d) { if (grid[y+d[1]] && grid[y+d[1]][x+d[0]] === '#') grid[y+d[1]][x+d[0]] = '.'; });
      }
    });
  }
  road([[4,24],[10,24],[10,19],[14,19],[14,15],[20,15],[22,15],[22,8],[29,8],[34,8],[34,4]], 'r');
  road([[14,19],[8,19],[8,9]], '.');
  road([[14,19],[18,19],[18,22],[33,22]], '.');
  places.forEach(function (p) { for (var dy=-1;dy<=1;dy++) for(var dx=-1;dx<=1;dx++) {var tile=grid[p.y+dy][p.x+dx];grid[p.y+dy][p.x+dx] = ['town','camp','sign'].includes(p.kind) ? 'r' : (tile==='r'||tile==='='?tile:'.');} });
  var cave = ['#############','######...####','##.......####','##.###...####','##.#####.####','##.......####','####.########','##.......####','##.##########','#############'].map(function (s) {return s.split('');});
  var cavePlaces = [ { id:'exit', x:2,y:8,name:'雪原へ',kind:'exit',note:'洞窟の外へ戻ります。' }, { id:'chest',x:8,y:2,name:'旅人の宝箱',kind:'chest',note:'古い地図を見つけた！ 東の森に「封印図書館」の印がある。' } ];
  function map(region) { return region === 'cave' ? cave : grid; }
  function walkable(region, x, y) { var g=map(region); return !!g[y] && !!g[y][x] && g[y][x] !== '#' && g[y][x] !== '~'; }
  function path(region, from, to) {
    if (!walkable(region,to.x,to.y)) return [];
    var queue=[{x:from.x,y:from.y,cost:0}], seen=new Map([[from.x+','+from.y,null]]), costs=new Map([[from.x+','+from.y,0]]), end=to.x+','+to.y;
    // 街道を優先する最小コスト経路。目的地タップで危険な森を近道しない。
    while(queue.length) {queue.sort(function(a,b){return a.cost-b.cost;});var p=queue.shift(), k=p.x+','+p.y;if(p.cost!==costs.get(k))continue;if(k===end)break;
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var q={x:p.x+d[0],y:p.y+d[1]}, key=q.x+','+q.y;
        if(!walkable(region,q.x,q.y))return;
        var tile=map(region)[q.y][q.x],cost=p.cost+(region==='cave'||tile==='r'||tile==='='?1:5);
        if(!costs.has(key)||cost<costs.get(key)){costs.set(key,cost);seen.set(key,p);q.cost=cost;queue.push(q);}
      });
    }
    if(!seen.has(end)) return [];
    var out=[], at=to;
    while(at && (at.x!==from.x || at.y!==from.y)){out.unshift(at);at=seen.get(at.x+','+at.y);} return out;
  }
  // 元の移動パッドと同じ壁沿い移動。斜めでは両隣も確認して角抜けを防ぐ。
  function nextStep(region,from,dx,dy){
    function ok(x,y){return walkable(region,x,y);}
    var x=from.x,y=from.y;
    if(dx&&dy&&!(ok(x+dx,y+dy)&&ok(x+dx,y)&&ok(x,y+dy))){
      if(ok(x+dx,y))dy=0;else if(ok(x,y+dy))dx=0;else return null;
    }
    return (dx||dy)&&ok(x+dx,y+dy)?{x:x+dx,y:y+dy}:null;
  }
  var KEY='frozenFrontier.prototype.snowJourney.v1';
  function fresh(){return {region:'field',x:4,y:24,visited:['home'],chest:false,seen:[]};}
  function read(){try{var p=JSON.parse(root.localStorage.getItem(KEY));
    if(!p || !['field','cave'].includes(p.region) || !Number.isInteger(p.x) || !Number.isInteger(p.y) || !walkable(p.region,p.x,p.y)) return fresh();
    return {region:p.region,x:p.x,y:p.y,visited:Array.isArray(p.visited)?Array.from(new Set(['home'].concat(p.visited).filter(function(id){return places.some(function(p){return p.id===id;});}))):['home'],chest:p.chest===true,seen:Array.isArray(p.seen)?p.seen.filter(function(k){return typeof k==='string'&&/^\d+,\d+$/.test(k);}).slice(-1200):[]};
  }catch(e){return fresh();}}
  FF.snowJourney={width:W,height:H,grid:grid,cave:cave,places:places,cavePlaces:cavePlaces,map:map,path:path,nextStep:nextStep,walkable:walkable,read:read,key:KEY};
})(this);
