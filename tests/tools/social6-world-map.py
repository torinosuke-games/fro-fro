"""Render Natural Earth land directly; no generated coastline or country emphasis.
Usage: python tests/tools/social6-world-map.py /path/ne_110m_land.geojson
Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson
Natural Earth public domain. Plate carree, longitude -30..330, latitude -90..90.
"""
import json,sys,io
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
from PIL import Image
fig=plt.figure(figsize=(12,8),dpi=100,facecolor='#f6f3e9')
ax=fig.add_axes([.035,.08,.93,.84]);ax.set_facecolor('#e5f0f3')
for feature in json.load(open(sys.argv[1]))['features']:
 g=feature['geometry'];polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
 for poly in polys:
  for shift in [-360,0,360]:
   ax.add_patch(Polygon([(x+shift,y) for x,y in poly[0]],closed=True,facecolor='#c5d1ad',edgecolor='none',linewidth=0))
ax.set_aspect('equal');ax.set_xlim(-30,330);ax.set_ylim(-90,90);ax.set_xticks([]);ax.set_yticks([])
for s in ax.spines.values():s.set_visible(False)
b=io.BytesIO();fig.savefig(b,format='png',dpi=100);b.seek(0)
im=Image.open(b).convert('RGB');assert im.size==(1200,800)
im.save('img/diagrams/soc6_international_002.webp',format='WEBP',quality=90)
