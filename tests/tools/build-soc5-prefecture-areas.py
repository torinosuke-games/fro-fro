"""Offline geometry preparation only. No dependency is added to the game."""
import sys,json,hashlib,math
from pathlib import Path

from shapely.geometry import shape,Polygon,MultiPolygon,LineString,Point,box
from shapely.ops import unary_union
from shapely.affinity import scale
from shapely import make_valid

raw=Path(sys.argv[1]).read_bytes()
features=json.loads(raw)
if isinstance(features,dict):features=features['features']
features=[f for f in features if str(f['properties'].get('iso_3166_2','')).startswith('JP-')]
if len(features)!=47:raise ValueError('Expected 47 Japanese prefectures')
factor_x,factor_y=111*.79,111
def project(g):return scale(g,xfact=factor_x,yfact=factor_y,origin=(0,0))
def unproject(g):return scale(g,xfact=1/factor_x,yfact=1/factor_y,origin=(0,0))
pref={f['properties']['iso_3166_2']:project(make_valid(shape(f['geometry']))) for f in features}
land=unary_union(list(pref.values()))
def parts(g):
 if g.is_empty:return []
 if isinstance(g,Polygon):return [g]
 return [p for c in g.geoms for p in parts(c)]
def main(g):return max(parts(g),key=lambda p:p.area)
def line_parts(g):
 if g.is_empty:return []
 if isinstance(g,LineString):return [g]
 return [p for c in getattr(g,'geoms',[]) for p in line_parts(c)]
def rings(g,tolerance=.35,min_area=.3):
 out=[]
 for p in parts(g):
  if p.area<min_area:continue
  p=p.simplify(tolerance,preserve_topology=True)
  coords=[[round(x,5),round(y,5)] for x,y in unproject(p).exterior.coords]
  if len(coords)>=4:out.append(coords)
 return out

# 環境省の3つの外海への開口部を使う。線の両端を陸側へ延ばす。
gates=[[(130.968,33.961),(130.964,33.973)],[(131.902,33.263),(132.017,33.344)],[(134.749,33.833),(135.064,33.887)]]
barriers=[]
for a,b in gates:
 a,b=project(Point(a)),project(Point(b));dx,dy=b.x-a.x,b.y-a.y;ll=math.hypot(dx,dy);ux,uy=dx/ll,dy/ll
 barriers.append(LineString([(a.x-ux*6,a.y-uy*6),(b.x+ux*6,b.y+uy*6)]).buffer(.08))
water=project(box(130,32,136.5,36)).difference(land).difference(unary_union(barriers))
seed=project(Point(133.2,34.05))
seto=next(p for p in parts(water) if p.covers(seed))
if seto.area>30000 or seto.area<10000:raise ValueError(('Unexpected Seto sea area',seto.area))

plans={
 'industry_006':(['JP-23','JP-24'],'coast','ise'),
 'industry_010':(['JP-13','JP-14'],'coast','tokyo'),
 'industry_011':(['JP-27','JP-28'],'coast','osaka'),
 'industry_012':(['JP-33','JP-34'],'coast','seto'),
 'industry_013':(['JP-10','JP-09','JP-11'],'whole',None),
 'climate_011':(['JP-33','JP-34','JP-35','JP-36','JP-37','JP-38'],'coast','seto'),
 'climate_013':(['JP-20','JP-19'],'whole',None),
 'climate_024':(['JP-02','JP-05','JP-06','JP-15','JP-16','JP-17','JP-18'],'coast','japanSea'),
}
def allowed(a,b,kind,code):
 x,y=unproject(Point((a[0]+b[0])/2,(a[1]+b[1])/2)).coords[0]
 if kind=='ise':return 34.45<=y<=35.3 and 136.45<=x<=137.55
 if kind=='tokyo':return 35.2<=y<=35.85 and 139.60<=x<=139.97
 if kind=='osaka':return 34.28<=y<=34.84 and 134.5<=x<=135.7
 if kind=='seto':return seto.distance(Point((a[0]+b[0])/2,(a[1]+b[1])/2))<.3
 if kind=='japanSea':
  # 青森は津軽半島の西岸と西津軽だけ。太平洋・陸奥湾を含めない。
  return code!='JP-02' or x<140.46
 return True

results={};provenance={}
for id,(codes,mode,zone) in plans.items():
 selected=[];per_pref={}
 for code in codes:
  g=main(pref[code])
  if mode=='whole':result=g
  else:
   ps=list(g.exterior.coords);segments=[]
   for a,b in zip(ps,ps[1:]):
    mid=Point((a[0]+b[0])/2,(a[1]+b[1])/2)
    if land.boundary.distance(mid)<.002 and allowed(a,b,zone,code):segments.append(LineString([a,b]))
   if not segments:raise ValueError((id,code,'no shore segments'))
   # 県の輪郭と約20kmの沿岸帯との共通部分。幅は位置表示のための目安。
   result=g.intersection(unary_union(segments).buffer(20,quad_segs=8))
  rr=rings(result);selected+=rr;per_pref[code]=rr
  if not rr:raise ValueError((id,code,'empty'))
 results[id]={'areas':selected}
 provenance[id]={'codes':codes,'mode':mode,'zone':zone,'pieceCounts':{c:len(r) for c,r in per_pref.items()}}
results['terrain_022']={'marineAreas':rings(seto,tolerance=.25,min_area=1)}
needed=sorted({c for p in plans.values() for c in p[0]})
fixture={'source':'https://github.com/nvkelso/natural-earth-vector/blob/ca96624a56bd078437bca8184e78163e5039ad19/geojson/ne_10m_admin_1_states_provinces.geojson',
 'filteredSourceSha256':hashlib.sha256(raw).hexdigest(),'coastalBandKm':20,'simplificationKm':.35,'gates':gates,
 'plans':provenance,'prefectures':{c:rings(main(pref[c]),tolerance=.15,min_area=0) for c in needed},
 'setoAreaKm2':round(seto.area,2)}
payload={'results':results,'fixture':fixture}
if len(sys.argv)>2:payload=payload[sys.argv[2]]
print(json.dumps(payload,ensure_ascii=False,separators=(',',':')))

