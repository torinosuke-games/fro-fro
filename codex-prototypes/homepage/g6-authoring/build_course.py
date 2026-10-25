"""Rebuild fixed grade-six questions and precise diagrams. No runtime randomness."""
from pathlib import Path
from fractions import Fraction as F
from collections import Counter,defaultdict
import json,math,html,re
from refine_original import REFINEMENTS
BASE=Path(__file__).resolve().parents[1];OUT=BASE/'g6-figures';OUT.mkdir(exist_ok=True)
original=json.loads((BASE/'g6-authoring/original100.json').read_text());records=[];serial=Counter();seen=set();facts=[]
def val(x):
 if isinstance(x,F):return str(x.numerator) if x.denominator==1 else f'{x.numerator}/{x.denominator}'
 if isinstance(x,float):return f'{x:.8f}'.rstrip('0').rstrip('.')
 return str(x)
def semantic(s):
 try:return F(str(s))
 except:return str(s)
def plain(s):return re.sub(r'\{([^|{}]+)\|[^{}]+\}',r'\1',s)
def ruby(s):
 for a,b in [('最頻値','{最頻値|さいひんち}'),('水槽','{水槽|すいそう}'),('花壇','{花壇|かだん}'),('含む','ふくむ'),('含ま','ふくま'),('含め','ふくめ'),('幅','{幅|はば}'),('描','か'),('掛け','かけ'),('埋め','うめ'),('袋込み','袋こみ'),('払','{払|はら}'),('概算','{概算|がいさん}'),('換算','{換算|かんさん}'),('含','{含|ふく}'),('違','{違|ちが}'),('括弧','{括弧|かっこ}'),('埋','{埋|う}'),('替','{替|か}')]:
  # Already annotated phrases are protected below by applying only plain segments.
  parts=re.split(r'(\{[^{}]+\})',s);s=''.join(p if p.startswith('{') else p.replace(a,b) for p in parts)
 return s
for q in original:
 old=q['answer'];pairs=REFINEMENTS[q['id']];q['choices']=[old]+[p[0] for p in pairs];q['misconceptions']=[{'answer':a,'reason':reason} for a,reason in pairs];q['explanation']=q['explanation'].split('\n\nほかの選択肢')[0]+'\n\nほかの選択肢\n'+'\n'.join(f'・「{a}」：{reason}' for a,reason in pairs)
 q['collection']='course_g6_100';q['hints']=q['hints'][:2];records.append(q);serial[q['unit']]+=1;seen.add(plain(q['question']))

def text(x,y,s,size=23,anchor='middle',extra=''):
 return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="sans-serif" font-size="{size}" fill="#183f56" {extra}>{html.escape(plain(str(s)))}</text>'
def svg(name,body,caption):
 (OUT/(name+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 480" role="img" aria-label="{html.escape(plain(caption))}"><rect width="660" height="480" rx="16" fill="#f6fafc"/>{body}</svg>')
 return {'kind':'image','src':f'codex-prototypes/homepage/g6-figures/{name}.svg','caption':caption,'alt':caption}
def graph(name,title,xname,yname,xmax,ymax,xstep,ystep,points=None,bars=None,curve=None,xminor=None,yminor=None):
 # Plot frame: enough space for unit-bearing axes and a non-truncated origin.
 x0,y0,w,h=120,365,480,275
 X=lambda x:x0+x/xmax*w;Y=lambda y:y0-y/ymax*h
 b=text(330,35,title,25)
 for axis,maximum,step,minor in [('x',xmax,xstep,xminor),('y',ymax,ystep,yminor)]:
  spacing=minor or step;num=round(maximum/spacing)
  for i in range(num+1):
   v=round(i*spacing,8);major=abs(v/step-round(v/step))<1e-7
   if axis=='x':
    b+=f'<path d="M{X(v)} {y0} V{y0-h}" stroke="'+('#c0d3de' if major else '#e1ebf0')+'" stroke-width="'+('1.3' if major else '.7')+'"/>'
    if major:b+=text(X(v),y0+29,val(v),24)+f'<path d="M{X(v)} {y0} v7" stroke="#204e67" stroke-width="2"/>'
   else:
    b+=f'<path d="M{x0} {Y(v)} H{x0+w}" stroke="'+('#c0d3de' if major else '#e1ebf0')+'" stroke-width="'+('1.3' if major else '.7')+'"/>'
    if major:b+=text(x0-18,Y(v)+7,val(v),24,'end')+f'<path d="M{x0} {Y(v)} h-7" stroke="#204e67" stroke-width="2"/>'
 b+=f'<path d="M{x0} {y0-h-8} V{y0} H{x0+w+10}" fill="none" stroke="#204e67" stroke-width="2.5"/>'
 b+=text(350,444,xname,24)+text(38,220,yname,24,extra='transform="rotate(-90 38 220)"')
 if points:
  b+='<polyline fill="none" stroke="#177cb5" stroke-width="3.5" points="'+' '.join(f'{X(x)},{Y(y)}' for x,y in points)+'"/>'
  for x,y in points:b+=f'<circle cx="{X(x)}" cy="{Y(y)}" r="4" fill="#177cb5"/>'
 if curve:
  b+='<polyline fill="none" stroke="#177cb5" stroke-width="3.5" points="'+' '.join(f'{X(x)},{Y(y)}' for x,y in curve)+'"/>'
 if bars:
  for lo,hi,n in bars:b+=f'<rect x="{X(lo)}" y="{Y(n)}" width="{(hi-lo)/xmax*w}" height="{n/ymax*h}" fill="#91c7e5" stroke="#286f99" stroke-width="2"/>'
 cap=f'{xname}は大目盛り{val(xstep)}ごと、{yname}は大目盛り{val(ystep)}ごと。'
 if xminor or yminor:cap+=f'補助目盛りは横{val(xminor or xstep)}、縦{val(yminor or ystep)}です。'
 return svg(name,b,cap)
def coordinate(name,ax,ay,k,kind='line',second=None):
 targets=[ax,ay,k,second or 0]
 if kind=='line':targets += [2*k-ax]
 if second is not None:targets += [2*second-ay if kind=='point' else 2*second-(2*k-ax)]
 maximum=math.ceil((max(targets)+3)/2)*2;major=max(2,math.ceil(maximum/12)*2)
 # equal spatial scales along x/y; explicit separate axis units are positions.
 d=graph(name,'対称な点を考えよう','右への位置（1目盛り1）','上への位置（1目盛り1）',maximum,maximum,major,major,xminor=1,yminor=1)
 p=OUT/(name+'.svg');s=p.read_text();X=lambda x:120+x/maximum*480;Y=lambda y:365-y/maximum*275
 extras=f'<circle cx="{X(ax)}" cy="{Y(ay)}" r="5" fill="#d98a31"/>'+text(X(ax)+15,Y(ay)-15,'A',23)
 if kind=='line':
  extras+=f'<path d="M{X(k)} 90 V365" stroke="#b76d31" stroke-width="3" stroke-dasharray="8 5"/>'+text(X(k),72,f'x＝{k}',20)
  if second is not None:extras+=f'<path d="M{X(second)} 90 V365" stroke="#9f6fbb" stroke-width="3" stroke-dasharray="8 5"/>'+text(X(second),58,f'x＝{second}',20)
 else:extras+=f'<circle cx="{X(k)}" cy="{Y(second)}" r="5" fill="#b16c42"/>'+text(X(k)+16,Y(second)-14,'O',23)
 p.write_text(s.replace('</svg>',extras+'</svg>'));d['caption']='横・縦とも数値は位置です。対応点は描いていません。';return d

def emit(unit,level,question,answer,wrongs,hints,explanation,family,params,diagram=None,bounds=None):
 answer=val(answer);pairs=[(val(a),r) for a,r in wrongs]
 if len({semantic(a) for a,_ in [(answer,'')]+pairs})!=4:return False
 if any(not a or not r for a,r in pairs):raise ValueError(family)
 if plain(question) in seen:return False
 if bounds:
  lo,hi=bounds
  if any(not(lo<float(semantic(a))<hi) for a,_ in [(answer,'')]+pairs):return False
 serial[unit]+=1;id=f'math_g6_course_{unit}_{serial[unit]:03}';choices=[answer]+[a for a,_ in pairs];rot=serial[unit]%4;choices=choices[rot:]+choices[:rot]
 q={'id':id,'subject':'math','gradeLevel':6,'unit':unit,'difficulty':level,'answerType':'choice','question':question,'answer':answer,'choices':choices,'hints':hints,'explanation':explanation+'\n\nほかの選択肢\n'+'\n'.join(f'・「{a}」：{r}' for a,r in pairs),'reviewed':False,'collection':'course_g6_100','misconceptions':[{'answer':a,'reason':r} for a,r in pairs],'authoring':{'family':family,'parameters':params}}
 if diagram:q['diagram']=diagram
 records.append(q);seen.add(plain(question));return True

def make_symmetry(f,n,lev):
 u='symmetry';k=4+n;a=1+n;b=2+n;fam=f'symmetry_{f}';p={'n':n};name=f'g6-{fam}-{n}';d=None
 if f==0:
  ans=2*k-a;q=f'縦の直線x＝{k}を対称の軸にします。点A({a},{b})に対応する点の、右への位置はいくつですか。';wrong=[(k-a,'軸からの距離だけを答えています。軸の位置に足しましょう。'),(a,'左右を反転せず、もとの位置を答えています。'),(k,'対応点ではなく軸の位置を答えています。')];h=['対称の軸までの横の距離を調べましょう。'];e=f'軸の左へ{k-a}離れているので、対応点は右へ{k-a}。右への位置は{k}＋{k-a}＝{ans}です。';d=coordinate(name,a,b,k)
 elif f==1:
  shapes=[('正七角形',7),('正八角形',8),('正十角形',10),('正十二角形',12),('正九角形',9)];shape,ans=shapes[(n-1)%5];q=f'{shape}の対称の軸は何本ですか。';wrong=[(ans*2,'1本の軸を中心の両側に分けて、2回数えています。'),(ans-1,'頂点や辺に対応する軸を1本見落としています。'),(1,'1本見つけたところで止めず、ほかの軸も調べましょう。')];h=['正多角形では、頂点や辺の中点を通る軸を順に調べます。'];e=f'{shape}には、折り重なる軸が{ans}本あります。正n角形の対称の軸はn本です。'
 elif f==2:
  ox=5+n;oy=6+n;ay=2+n;ans=2*oy-ay;q=f'点O({ox},{oy})を対称の中心にします。点A({a},{ay})に対応する点の、上への位置はいくつですか。';wrong=[(ay,'上下の位置を変えていません。'),(oy-ay,'中心までの距離で止めています。'),(oy,'対応点ではなく中心の位置を答えています。')];h=['中心から上と下へ同じ距離にある点を考えます。'];e=f'AはOから下へ{oy-ay}。対応点は上へ{oy-ay}なので、{oy}＋{oy-ay}＝{ans}です。';d=coordinate(name,a,ay,ox,'point',oy)
 elif f==3:
  left=2+n;right=10+n;ans=(left+right)/2;q=f'線対称な2点A({left},{b})とB({right},{b})があります。対称の軸が縦の直線x＝□のとき、□はいくつですか。';wrong=[(right-left,'2点の間の距離を答えています。'),((right-left)/2,'距離の半分だけで、左の点の位置を足していません。'),(left+right,'2つの位置を足した後に2で割っていません。')];h=['対称の軸は2点のまん中を通ります。'];e=f'横の位置の平均を求め、({left}＋{right})÷2＝{val(ans)}です。'
 elif f==4:
  ox=5+n;oy=6+n;bx=2*ox-a;by=2*oy-b;ans=oy;q=f'点対称な2点A({a},{b})とB({bx},{by})があります。対称の中心Oの、上への位置はいくつですか。';wrong=[(by-b,'上下の位置の差を答えています。'),((by-b)/2,'差の半分だけで、Aの上への位置を足していません。'),(by+b,'上下の位置の和を2で割っていません。')];h=['対称の中心は、対応する2点を結ぶ線分のまん中です。'];e=f'上への位置は({b}＋{by})÷2＝{oy}です。横の位置も同様に求められます。'
 elif f==5:
  k=7+2*n;a=2+n;ans=2*(k-a);q=f'対称の軸x＝{k}に関して、点A({a},{b})とその対応点Bがあります。線分ABの長さは何目盛りですか。';wrong=[(k-a,'軸までの片側の距離だけを答えています。'),(2*k-a,'Bの位置を答え、Aからの距離を求めていません。'),(k+a,'位置を足しています。軸までの差の2倍を求めましょう。')];h=['Aから軸までと、軸からBまでの距離は等しいです。'];e=f'Aから軸まで{k}－{a}＝{k-a}目盛り。その2倍で{ans}目盛りです。';d=coordinate(name,a,b,k)
 elif f==6:
  l=3+n;m=7+n;a=1+n;mid=2*l-a;ans=2*m-mid;q=f'点A({a},{b})を、まず直線x＝{l}について線対称に移し、次に直線x＝{m}について線対称に移します。最後の点の右への位置はいくつですか。';wrong=[(mid,'1回目の移動で止めています。'),(2*m-a,'最初の点を2本目の軸で反転しただけです。'),(a+(m-l),'2本の軸の間隔を1回だけ足しています。')];h=['1回目の対応点を求めてから、2回目の軸との距離を調べます。',f'1回目は{l}＋({l}－{a})で求めます。'];e=f'1回目の横の位置は{mid}。2回目は{m}＋({m}－{mid})＝{ans}です。';d=coordinate(name,a,b,l,second=m)
 else:
  ox=5+n;oy=7+n;ax=2+n;ay=3+n;axis=9+n;bx=2*ox-ax;by=2*oy-ay;ans=2*axis-bx;q=f'点A({ax},{ay})をO({ox},{oy})を中心に点対称に移し、その点を直線x＝{axis}について線対称に移します。最後の点の右への位置はいくつですか。';wrong=[(bx,'点対称の操作だけで止めています。'),(2*axis-ax,'点対称を行わず、最初の点を線対称に移しています。'),(axis-bx,'最後の軸からの距離だけを答えています。')];h=['点対称では中心をはさんで反対側へ移します。','その後、横の位置を新しい軸について反転します。'];e=f'点対称で({bx},{by})へ移ります。続いて横の位置は{axis}＋({axis}－{bx})＝{ans}です。'
 return emit(u,lev,q,ans,wrong,h,e,fam,p,d)

def make_expression(f,n,lev):
 u='expression';price=80+20*n;count=3+n;fee=40+10*n;cash=1000+500*n;fam=f'expression_{f}';p={'n':n};d=None
 if f==0:
  ans=price*count+fee;q=f'1個{price}円の品物をx個買い、箱代{fee}円を加えると代金は{price}×x＋{fee}円です。x＝{count}のとき、代金は何円ですか。';w=[(price*count,'箱代を加えていません。'),((price+fee)*count,'箱代も個数分かかるとして掛けています。'),(price+count+fee,'単価と個数を掛けずに足しています。')];h=['個数をxに入れ、掛け算を先にします。'];e=f'{price}×{count}＋{fee}＝{ans}円です。'
 elif f==1:
  a=2+n;b=5+n;x=4+n;ans=a*x+b;q=f'y＝{a}×x＋{b}で、x＝{x}のとき、yはいくつですか。';w=[(a*(x+b),'足し算を先にし、式にない括弧を付けています。'),(a*x,'最後の足し算を忘れています。'),(a+x+b,'掛け算を足し算にしています。')];h=['文字を数に置き換え、掛け算を先に計算します。'];e=f'{a}×{x}＋{b}＝{a*x}＋{b}＝{ans}です。'
 elif f==2:
  side=4+n;ans=side;q=f'1辺x cmの正方形の周りの長さが{4*side}cmです。xはいくつですか。';w=[(2*side,'正方形の辺を2本分として割っています。'),(4*side-4,'周の長さから辺の本数を引いています。'),(4*side,'周の長さをそのまま1辺としています。')];h=['正方形には同じ長さの辺が4本あります。'];e=f'4×x＝{4*side}なので、x＝{4*side}÷4＝{side}です。'
 elif f==3:
  ans=cash-price*count-fee;q=f'{cash}円を出し、1冊{price}円のノートを{count}冊と、袋代{fee}円を払います。おつりは何円ですか。';w=[(cash-price*count,'袋代を引いていません。'),(cash-price-fee,'ノート1冊分しか引いていません。'),(price*count+fee,'おつりではなく代金を答えています。')];h=['まずノート全部と袋の代金を合計します。','出したお金から、その合計を引きましょう。'];e=f'代金は{price}×{count}＋{fee}＝{price*count+fee}円。おつりは{cash}－{price*count+fee}＝{ans}円です。'
 elif f==4:
  x=3+n;fee=price*2;ans=x;total=price*x+fee;q=f'品物をx個買う代金y円は、y＝{price}×x＋{fee}です。代金が{total}円のとき、個数xはいくつですか。';w=[(F(total,price),'固定料金を引かずに単価で割っています。'),(F(total+fee,price),'固定料金を引く代わりに足しています。'),(x+1,'固定料金を単価1個分だけ引いてから、単価で割っています。固定料金は2個分です。')];h=['個数によらずかかる料金を先に除きます。'];e=f'({total}－{fee})÷{price}＝{x}個です。'
 elif f==5:
  x=4+n;ans=3*x+1;q=f'棒で正方形を横一列に{ x }個つなぎます。となりどうしは1辺を共有します。必要な棒の本数は何本ですか。';w=[(4*x,'共有する辺を2回数えています。'),(3*x,'最初の正方形に必要な余分な1本を落としています。'),(3*(x-1),'増やした分だけを数え、最初の4本を加えていません。')];h=['1個には4本。2個目からは3本ずつ増えます。'];e=f'4＋3×({x}－1)＝{ans}本です。'
 elif f==6:
  pa=100+10*n;diff=20+10*n;items=4+n;shipping=diff*items;ans=items;q=f'A店は1個{pa}円で送料{shipping}円、B店は1個{pa+diff}円で送料無料です。同じ個数を買って代金が等しくなるのは何個のときですか。';w=[(items*2,'単価の差を半分として計算し、必要な個数を2倍にしています。'),(items-1,'1個少ないと、まだA店に送料分の差が残ります。'),(items+1,'1個多いと、B店の代金がA店を上回ります。')];h=['1個買うごとに、2店の代金の差はどれだけ変わりますか。','送料の差を、1個当たりの値段の差で割ります。'];e=f'単価の差は{diff}円。{shipping}÷{diff}＝{items}個で送料の差が埋まります。'
 else:
  pc=120+10*n;adult=2*pc;people=8+n;children=3+n;total=adult*people-pc*children;ans=children;q=f'入場料は子ども{pc}円、大人{adult}円です。大人と子ども合わせて{people}人で{total}円払いました。子どもは何人ですか。';w=[(people-children,'大人の人数を答えています。'),(children-1,'大人を子どもに替えた人数を1人少なく数えています。'),(total//adult,'全員大人の料金で割った商を、子どもの人数としています。')];h=['全員大人だと仮定した代金と比べます。','子ども1人につき、仮定した代金からいくら減りますか。'];e=f'全員大人なら{adult*people}円。差{pc*children}円を1人分の差{pc}円で割り、{children}人です。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d,(0,cash) if f==3 else None)

def make_ratio(f,n,lev):
 u='ratio';a=2+n;b=3+n;k=4+n;fam=f'ratio_{f}';p={'n':n};d=None
 if f==0:
  ans=f'{a}：{b}';q=f'比{a*k}：{b*k}を最も簡単な整数の比にするとどれですか。';w=[(f'{b}：{a}','前後の順序を逆にしています。'),(f'{a*2}：{b*2}','同じ比ですが、さらに2で割れます。'),(f'{a*k-1}：{b*k-1}','両方から1を引いています。同じ数で割りましょう。')];h=['前後の数を最大公約数で割ります。'];e=f'両方を{k}で割り、{a}：{b}です。隣り合う整数なので、これ以上簡単にできません。'
 elif f==1:
  ans=b*k;q=f'赤：青＝{a}：{b}です。赤が{a*k}個なら青は何個ですか。';w=[(a*k,'赤と同じ個数にしています。'),(b+k,'比の数に倍率を足しています。'),(k,'比の1つ分だけを答えています。')];h=['赤が比の数の何倍かを調べます。'];e=f'倍率は{a*k}÷{a}＝{k}。青は{b}×{k}＝{ans}個です。'
 elif f==2:
  ans=F(a,b);q=f'比{a}：{b}の比の値を求め、約分した分数を選びましょう。';w=[(F(b,a),'前後を逆に割っています。'),(a+b,'比の前後を足しています。'),(b-a,'比の前後の差を求めています。')];h=['比a：bの比の値はa÷bです。'];e=f'{a}÷{b}＝{ans}です。'
 elif f==3:
  total=(a+b)*k;ans=a*k;q=f'米と麦の重さの比を{a}：{b}にして、合計{total}gにします。米は何gですか。';w=[(b*k,'麦の重さを答えています。'),(k,'比の1つ分だけを答えています。'),(F(total*a,b),'合計を麦の重さだと取り違えています。')];h=['比の合計を求め、全体を同じ大きさに分けます。'];e=f'1つ分は{total}÷({a}＋{b})＝{k}g。米は{k}×{a}＝{ans}gです。';d={'kind':'band','parts':[a,b],'labels':[f'米：{a}',f'麦：{b}'],'known':['？g','？g'],'totalLabel':f'合計{total}g','caption':'同じ1つ分のまとまりで比べます。'}
 elif f==4:
  ans=(a+b)*k;q=f'AとBの所持金の比は{b}：{a}で、Aのほうが{k}円多く持っています。合計は何円ですか。';w=[(b*k,'Aの金額だけを答えています。'),(a*k,'Bの金額だけを答えています。'),(k,'2人の差だけを答えています。')];h=['比の差の何つ分が、金額の差に当たりますか。'];e=f'比の差は1つ分なので、1つ分は{k}円。合計は({a}＋{b})×{k}＝{ans}円です。'
 elif f==5:
  # Fractional ratios are made into integers by a common denominator.
  den=2*n+5;ans=f'{a}：{b}';q=f'比{a}/{den}：{b}/{den}を、最も簡単な整数の比にするとどれですか。';w=[(f'{b}：{a}','前後を逆にしています。'),(f'{a}：{den}','2つ目の分子ではなく分母を使っています。'),(f'{a*2}：{b*2}','同じ比ですが、さらに2で割れます。')];h=['両方に同じ分母を掛けます。'];e=f'両方に{den}を掛けると{a}：{b}です。隣り合う整数なのでこれ以上簡単にできません。'
 elif f==6:
  # Initial a:b, add k so equal because b-a=1.
  ans=(a+b)*k;q=f'赤と白の玉の比が{a}：{b}です。赤を{k}個加えると同じ個数になりました。初めの玉は全部で何個ですか。';w=[((a+b)*k+k,'増やした後の合計を答えています。'),(b*k,'初めの白の数だけを答えています。'),(a*k,'初めの赤の数だけを答えています。')];h=['初めの白と赤の差は、比の差の1つ分です。','増やした個数から1つ分を求め、初めの比の合計に掛けます。'];e=f'比の差1つ分が{k}個。初めの合計は({a}＋{b})×{k}＝{ans}個です。'
 else:
  # Use a shared B component, requiring ratio composition.
  c=4+n;ans=f'{a}：{c}';q=f'AとBの重さの比は{a}：{b}、BとCの比は{2*b}：{2*c}です。AとCの比を最も簡単な整数の比で表すとどれですか。';g=math.gcd(a,c);ans=f'{a//g}：{c//g}';w=[(f'{a}：{2*c}','Bの大きさをそろえず、AとCの数だけを取り出しています。'),(f'{c//g}：{a//g}','AとCの順序を逆にしています。'),(f'{a+b}：{b+c}','隣り合う比の数を足しています。')];h=['2つの比で、Bが同じ大きさになるようにそろえます。','A：Bの両方を2倍にするとBがそろいます。'];e=f'A：B＝{2*a}：{2*b}なので、A：B：C＝{2*a}：{2*b}：{2*c}。A：Cを約分して{ans}です。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d)
def make_scale(f,n,lev):
 u='scale';a=3+n;b=5+n;k=2+n;fam=f'scale_{f}';p={'n':n};d=None
 if f==0:
  ans=a*k;q=f'辺の長さが{a}cmの図形を{k}倍に拡大します。対応する辺は何cmですか。';w=[(a+k,'倍率を足しています。'),(F(a,k),'拡大ではなく縮小しています。'),(a,'長さを変えていません。')];h=['対応する辺はすべて同じ倍率になります。'];e=f'{a}×{k}＝{ans}cmです。'
 elif f==1:
  actual=(n+2)*100;ans=actual/100;q=f'縮尺1：{actual}の図で1cmは、実際には何mですか。';w=[(actual,'cmの値をmとして答えています。'),(actual/10,'cmからmへ直すときに10でしか割っていません。'),(actual/1000,'cmからmへ直すときに1000で割っています。')];h=['縮尺の長さの単位は、まずcmで考えます。'];e=f'{actual}cm＝{val(ans)}mです。'
 elif f==2:
  long=a*k;ans=a;q=f'図形の{long}cmの辺を、もとの長さの1/{k}に縮小します。対応する辺は何cmですか。';w=[(long*k,'縮小なのに倍率の分母を掛けています。'),(long-k,'長さから分母を引いています。'),(k,'縮小率の分母だけを答えています。')];h=['1を何等分した倍率かを考えます。'];e=f'{long}÷{k}＝{a}cmです。'
 elif f==3:
  scale=10000*(n+1);cm=n+2;ans=F(cm*scale,100000);q=f'縮尺1：{scale}の地図で、川沿いの道が{cm}cmあります。実際には何kmですか。';w=[(ans*10,'cmからkmへの換算を10倍大きくしています。'),(ans/10,'cmからkmへの換算を10倍小さくしています。'),(cm,'地図上のcmの値を、そのままkmとしています。')];h=['まず実際の長さをcmで求めます。','100000cm＝1kmです。'];e=f'{cm}×{scale}＝{cm*scale}cm。100000で割り、{val(ans)}kmです。'
 elif f==4:
  ratio=F(n+3,2);base=4+n;side=6+n;ans=side*ratio;q=f'三角形を拡大したら、{base}cmの辺が{val(base*ratio)}cmになりました。もとの{side}cmの辺に対応する辺は何cmですか。';w=[(side+(base*ratio-base),'同じ長さを足しています。同じ倍率を使いましょう。'),(side/ratio,'拡大率で割っています。'),(base*ratio,'別の辺の長さをそのまま答えています。')];h=['対応する辺どうしを割って拡大率を求めます。'];e=f'拡大率は{val(base*ratio)}÷{base}＝{val(ratio)}倍。{side}×{val(ratio)}＝{val(ans)}cmです。'
 elif f==5:
  actual=10*(n+3);scale=100*(n+1);ans=F(actual*100,scale);q=f'実際の長さが{actual}mの道を、縮尺1：{scale}の図に表します。図では何cmになりますか。';w=[(F(actual,scale),'mをcmに直さずに縮尺で割っています。'),(ans*10,'mからcmへの換算を10倍大きくしています。'),(ans/10,'mからcmへの換算を10倍小さくしています。')];h=['実際の長さもcmにそろえてから縮小します。'];e=f'{actual}m＝{actual*100}cm。{actual*100}÷{scale}＝{val(ans)}cmです。'
 elif f==6:
  cm1=2+n;cm2=4+n;scale=100*(n+1);factor=scale/100;ans=cm1*cm2*factor*factor;q=f'縮尺1：{scale}の図に、縦{cm1}cm、横{cm2}cmの長方形の庭があります。実際の面積は何m²ですか。';w=[(cm1*cm2*factor,'面積に長さの倍率を1回しか掛けていません。'),(cm1*cm2,'図上の面積を実際の面積としています。'),(2*(cm1+cm2)*factor,'面積ではなく実際の周の長さを求めています。')];h=['縦と横をそれぞれ実際のm単位の長さへ直します。','実際の2辺を掛けて面積を求めます。'];e=f'実際の辺は{val(cm1*factor)}mと{val(cm2*factor)}m。掛けると{val(ans)}m²です。'
 else:
  ra=2+n;rb=3+n;orig=4+n;ans=orig*rb;q=f'同じ図形をAさんは{ra}倍、Bさんは{rb}倍に拡大しました。Aさんの図で{orig*ra}cmの辺は、Bさんの図では何cmですか。';w=[(F(orig*ra*ra,rb),'AとBの倍率の比を逆に掛けています。'),(orig,'もとの図の長さで止めています。'),(orig*ra*rb,'Aさんの図の辺に、そのままBさんの倍率を掛けています。')];h=['まずAさんの図から、もとの長さを求めます。','もとの長さにBさんの拡大率を掛けます。'];e=f'もとの長さは{orig*ra}÷{ra}＝{orig}cm。Bさんの図では{orig}×{rb}＝{ans}cmです。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d)

def circle_art(name,r,mode='full',inner=None):
 cx,cy,R=330,235,145
 body='<g fill="#dceef7" stroke="#237caf" stroke-width="3">'
 if mode=='half':body+=f'<path d="M185 280 A145 145 0 0 1 475 280 Z"/>'
 elif mode=='quarter':body+='<path d="M230 330 V90 A240 240 0 0 1 470 330 Z"/>'
 else:body+=f'<circle cx="{cx}" cy="{cy}" r="{R}"/>'
 if inner is not None:body+=f'<circle cx="{cx}" cy="{cy}" r="{R*inner/r}" fill="#fff"/>'
 body+='</g>'+text(330,440,f'外側の半径 {r}cm・内側の半径 {inner}cm' if inner else f'半径 {r}cm',26)
 return svg(name,body,'半径と、求める部分を確認しましょう。円周率は3.14です。')
def make_circle(f,n,lev):
 u='circle';r=2+n;fam=f'circle_{f}';p={'n':n};name=f'g6-{fam}-{n}';d=None
 if f==0:
  ans=r*r*3.14;q=f'半径{r}cmの円の面積は何cm²ですか。円周率は3.14です。';w=[(2*r*3.14,'面積ではなく円周を求めています。'),(r*3.14,'半径を1回しか掛けていません。'),(4*r*r*3.14,'直径を半径として使っています。')];h=['円の面積＝半径×半径×円周率です。'];e=f'{r}×{r}×3.14＝{val(ans)}cm²です。';d=circle_art(name,r)
 elif f==1:
  diameter=2*r;ans=r*r*3.14;q=f'直径{diameter}cmの円の面積は何cm²ですか。円周率は3.14です。';w=[(diameter*diameter*3.14,'直径をそのまま半径の式に入れています。'),(diameter*3.14,'円周を答えています。'),(r*r,'円周率を掛け忘れています。')];h=['直径の半分が半径です。'];e=f'半径は{diameter}÷2＝{r}cm。面積は{r}×{r}×3.14＝{val(ans)}cm²です。'
 elif f==2:
  a=10*(n+1);b=10*(n+2);ans=a*b;q=f'不規則な形の公園を、縦およそ{a}m、横およそ{b}mの長方形とみなします。およその面積は何m²ですか。';w=[(a+b,'縦と横を足しています。'),(a*b/2,'長方形なのに三角形のように2で割っています。'),(2*(a+b),'面積ではなく周の長さを求めています。')];h=['面積を求めやすい形に置き換えて考えます。'];e=f'長方形の面積として{a}×{b}＝{ans}m²です。これは見積もりなので実際の面積と完全には一致しません。'
 elif f==3:
  ans=r*r*3.14/2;q=f'半径{r}cmの半円の面積は何cm²ですか。円周率は3.14です。';w=[(r*r*3.14,'円全体のままで半分にしていません。'),(r*r*3.14/4,'半円をさらに半分にしています。'),(r*3.14,'半円の曲線部分の長さを求めています。')];h=['同じ半円2個で円全体になります。'];e=f'円全体は{val(r*r*3.14)}cm²。その半分で{val(ans)}cm²です。';d=circle_art(name,r,'half')
 elif f==4:
  ans=r*r*3.14/4;q=f'半径{r}cmの円の4分の1の面積は何cm²ですか。円周率は3.14です。';w=[(r*r*3.14,'円全体の面積を答えています。'),(r*r*3.14/2,'半円の面積を答えています。'),(r*r,'円周率を掛けず、4分の1にする操作もしていません。')];h=['まず円全体を求め、4等分します。'];e=f'{r}×{r}×3.14÷4＝{val(ans)}cm²です。';d=circle_art(name,r,'quarter')
 elif f==5:
  ans=(2*r)**2-r*r*3.14;q=f'1辺{2*r}cmの正方形の中に、直径{2*r}cmの円をぴったり入れます。正方形の内側で円の外側の面積は何cm²ですか。円周率は3.14です。';w=[(r*r*3.14,'円の面積を答えています。'),((2*r)**2-r*r*3.14/2,'円全体ではなく半円だけを引いています。'),((2*r)**2,'円の面積を引いていません。')];h=['正方形の面積から円の面積を引きます。'];e=f'{2*r}×{2*r}－{r}×{r}×3.14＝{val(ans)}cm²です。';d=svg(name,f'<rect x="185" y="90" width="290" height="290" fill="#f5cf91" stroke="#237caf" stroke-width="3"/><circle cx="330" cy="235" r="145" fill="#fff" stroke="#237caf" stroke-width="3"/>'+text(330,440,f'正方形の1辺・円の直径 {2*r}cm'),'正方形の内側で、円の外側の部分を求めます。')
 elif f==6:
  width=1+n;outer=r+width;ans=(outer*outer-r*r)*3.14;q=f'半径{r}mの円形の池の外側に、幅{width}mの道を1周作ります。道の面積は何m²ですか。円周率は3.14です。';w=[(outer*outer*3.14,'外側の円の面積から池を引いていません。'),(width*width*3.14,'道の幅だけを半径とする円を求めています。'),(2*r*3.14*width,'内側の円周に道幅を掛け、外側へ広がる分を無視しています。')];h=['外側の半径は、池の半径と道の幅の和です。','外側の円から内側の円を引きます。'];e=f'外側の半径は{outer}m。({outer}×{outer}－{r}×{r})×3.14＝{val(ans)}m²です。';d=circle_art(name,outer,inner=r);d['caption']='単位はmです。内側が池、外側の帯が道です。';file=OUT/(name+'.svg');file.write_text(file.read_text().replace('cm','m'))
 else:
  # Recover radius from circumference, then compute a composite shape.
  circ=2*r*3.14;rectw=2*r;recth=3+n;ans=rectw*recth+r*r*3.14/2;q=f'直径を1辺とする長方形の外側に半円を1つ付けます。長方形のもう1辺は{recth}cmです。半円と同じ半径の円の円周は{val(circ)}cmです。合わせた面積は何cm²ですか。円周率は3.14です。';w=[(rectw*recth+r*r*3.14,'半円ではなく円全体を足しています。'),(r*r*3.14/2,'半円だけで長方形を足していません。'),(r*recth+r*r*3.14/2,'長方形の辺を直径ではなく半径としています。')];h=['円周÷3.14で直径を求めます。','長方形と半円に分けて、それぞれの面積を足します。'];e=f'直径は{val(circ)}÷3.14＝{2*r}cm、半径は{r}cm。長方形{rectw*recth}と半円{val(r*r*3.14/2)}を足し、{val(ans)}cm²です。';d=svg(name,'<path d="M170 300 V180 A160 160 0 0 1 490 180 V300 Z" fill="#deedf6" stroke="#237caf" stroke-width="3"/><path d="M170 180 H490" stroke="#c78730" stroke-dasharray="7 5"/>'+text(330,355,f'長方形の高さ {recth}cm')+text(330,415,f'同じ半径の円全体の円周 {val(circ)}cm'),'半円の直径と長方形の1辺が重なっています。図は模式図です。')
 return emit(u,lev,q,ans,w,h,e,fam,p,d)
def make_volume(f,n,lev):
 u='volume';r=2+n;hgt=4+n;base=10+5*n;fam=f'volume_{f}';p={'n':n};d=None
 if f==0:
  ans=base*hgt;q=f'底面積{base}cm²、高さ{hgt}cmの三角柱の体積は何cm³ですか。';w=[(ans/2,'底面積が分かっているのに、もう一度2で割っています。'),(base+hgt,'底面積と高さを足しています。'),(ans*2,'三角柱だからと体積を2倍しています。')];h=['角柱の体積＝底面積×高さです。'];e=f'{base}×{hgt}＝{ans}cm³です。';d={'kind':'solid','shape':'triangularPrism','h':hgt,'unit':'cm','baseArea':base,'caption':f'底面積{base}cm²、柱の高さ{hgt}cmの三角柱です。'}
 elif f==1:
  ans=r*r*3.14*hgt;q=f'底面の半径{r}cm、高さ{hgt}cmの円柱の体積は何cm³ですか。円周率は3.14です。';w=[(r*r*3.14,'底面積で止めて、高さを掛けていません。'),(2*r*3.14*hgt,'円の面積ではなく円周に高さを掛けています。'),(4*ans,'直径を半径として計算しています。')];h=['円の底面積を求めてから、高さを掛けます。'];e=f'{r}×{r}×3.14×{hgt}＝{val(ans)}cm³です。'
 elif f==2:
  area=20+10*n;depth=3+n;ans=area*depth;q=f'底面積{area}cm²の柱状の容器に、水を深さ{depth}cmまで入れました。水は何cm³ですか。';w=[(area+depth,'底面積と深さを足しています。'),(area,'底面積の数値だけを答えています。'),(F(area,depth),'底面積を深さで割っています。')];h=['水を1つの柱とみて体積を求めます。'];e=f'{area}×{depth}＝{ans}cm³です。'
 elif f==3:
  b=4+n;th=3+n;hh=7+n;ans=b*th*hh/2;q=f'底面が底辺{b}cm、高さ{th}cmの三角形で、柱の高さが{hh}cmの三角柱です。体積は何cm³ですか。';w=[(b*th*hh,'三角形の底面積を求めるときに2で割っていません。'),(b*th/2,'底面積で止めています。'),(ans/2,'三角形の面積で2で割った後、もう一度2で割っています。')];h=['三角形の高さと柱の高さを区別します。'];e=f'底面積は{b}×{th}÷2＝{val(b*th/2)}cm²。それに{hh}を掛け、{val(ans)}cm³です。'
 elif f==4:
  ans=hgt;total=r*r*3.14*hgt;q=f'底面の半径{r}cm、体積{val(total)}cm³の円柱の高さは何cmですか。円周率は3.14です。';w=[(2*hgt,'底面積を半円として半分にしてから割っています。'),(F(hgt,4),'半径の代わりに直径を使い、底面積が4倍になっています。'),(hgt*3.14,'底面積の円周率を掛け忘れています。')];h=['底面積を先に求め、体積÷底面積で高さを求めます。'];e=f'底面積は{val(r*r*3.14)}cm²。{val(total)}÷{val(r*r*3.14)}＝{hgt}cmです。'
 elif f==5:
  base=25+5*n;before=4+n;rise=2+n;ans=base*rise;q=f'底面積{base}cm²の柱状容器に水が深さ{before}cmまであります。石を完全に沈めると水面が{before+rise}cmになりました。水があふれないとき、石の体積は何cm³ですか。';w=[(base*(before+rise),'石を沈めた後の水と石の合計体積です。'),(base*before,'初めの水の体積を答えています。'),(rise,'水面が上がった深さだけを答えています。')];h=['石の体積は、水面が上がった部分の体積です。'];e=f'上昇は{before+rise}－{before}＝{rise}cm。{base}×{rise}＝{ans}cm³です。'
 elif f==6:
  # Melt 3 columns into one with twice the radius, then use its height.
  count=3;newr=2*r;ans=F(count*hgt,4);q=f'半径{r}cm、高さ{hgt}cmの円柱{count}個を溶かして、半径{newr}cmの円柱1個にします。体積が変わらないとき、新しい高さは何cmですか。';w=[(F(count*hgt,2),'半径が2倍なら底面積も2倍だとしています。底面積は4倍です。'),(F(hgt,4),'もとの円柱が3個あることを忘れています。'),(count*hgt,'もとの高さを足しただけで、底面積の変化を反映していません。')];h=['もとの合計体積を求めます。','新しい底面積はもとの4倍です。'];e=f'新しい高さは、もとの高さ×個数÷底面積の倍率で、{hgt}×3÷4＝{val(ans)}cmです。'
 else:
  area=40+10*n;dep=5+2*n;rise=2+n;take=area*(n+1);ans=dep-(n+1);q=f'底面積{area}cm²の柱状容器に水が深さ{dep}cmまであります。石を完全に沈めると水面が{dep+rise}cmになりました。そのまま水を{take}cm³取り出し、最後に石を取り出します。水の深さは何cmになりますか。水はあふれず、石に付く水は無視します。';w=[(dep+rise-(n+1),'水を取り出したところで止め、石を取り出した変化を反映していません。'),(dep,'水を取り出した分を無視しています。'),(dep-(n+1)-rise,'最後に石の体積を、水の体積からも余分に引いています。')];h=['最後に石はなくなるので、初めの水から取り出した水量を引けば求められます。','取り出した水量÷底面積が、水だけで考えた深さの減少です。'];e=f'取り出した水は深さ{take}÷{area}＝{n+1}cm分です。最後は水だけなので、{dep}－{n+1}＝{ans}cmです。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d)

def make_proportion(f,n,lev):
 u='proportion';rate=2+n;x=3+n;fam=f'proportion_{f}';p={'n':n};name=f'g6-{fam}-{n}';d=None
 if f==0:
  ans=rate*x;q=f'yはxに比例し、x＝2のときy＝{rate*2}です。x＝{x}のとき、yはいくつですか。';w=[(2*rate*x,'x＝2でのyを、そのまま比例定数にしています。'),(rate*2+x-2,'差を足せばよいとして、比例の倍率を使っていません。'),(rate,'比例定数を答え、xを掛けていません。')];h=['y÷xで、決まった数を求めます。'];e=f'比例定数は{rate*2}÷2＝{rate}。y＝{rate}×{x}＝{ans}です。'
 elif f==1:
  ans=rate*x;q=f'毎分{rate}Lずつ水を入れます。空の容器に入れ始めて{x}分後の水量は何Lですか。';w=[(rate+x,'1分の水量と時間を足しています。'),(F(x,rate),'時間を毎分の水量で割っています。'),(rate,'1分分の水量だけを答えています。')];h=['水量＝毎分の水量×時間です。'];e=f'{rate}×{x}＝{ans}Lです。'
 elif f==2:
  pages=20*(n+1);weight=pages*(n+2);ans=n+2;q=f'同じ紙{pages}枚の重さは{weight}gです。枚数x枚と重さy gは比例します。1枚当たりの重さは何gですか。';w=[(F(pages,weight),'枚数÷重さで、1g当たりの枚数を求めています。'),(weight,'紙の束全体の重さを答えています。'),(weight-pages,'重さから枚数を引いています。')];h=['重さを枚数で割ると1枚当たりになります。'];e=f'{weight}÷{pages}＝{ans}gです。'
 elif f==3:
  t=n+2;ans=rate*t;xmax=8;ymax=rate*8;d=graph(name,'水を入れる時間と水量','時間（分）','水量（L）',xmax,ymax,1,rate,points=[(i,rate*i) for i in range(9)],xminor=.5,yminor=1);q=f'グラフのように、空の水槽に一定の速さで水を入れます。{t}分後の水量は何Lですか。';w=[(rate*(t-1),'1つ左の時間の水量を読んでいます。'),(rate*(t+1),'1つ右の時間の水量を読んでいます。'),(t,'横軸の時間を水量として答えています。')];h=['横軸で指定された時間を見つけ、真上のグラフを読みます。'];e=f'1分で{rate}Lなので、{t}分では{rate}×{t}＝{ans}Lです。'
 elif f==4:
  unitg=5+n;length=3+n;total=unitg*length;target=unitg*(length+2);ans=length+2;q=f'同じ針金{length}mの重さが{total}gです。重さ{target}gの針金は何mですか。';w=[(F(target,total),'重さの倍率だけを答えています。'),(target*unitg,'1mの重さで割る代わりに掛けています。'),(length,'もとの長さをそのまま答えています。')];h=['1mの重さを求め、全体の重さをそれで割ります。'];e=f'1mは{total}÷{length}＝{unitg}g。{target}÷{unitg}＝{ans}mです。'
 elif f==5:
  x1=2+n;x2=x1+3;yinc=rate*3;ans=rate*(x2+2);q=f'xとyは比例します。xが{x1}から{x2}になるとyが{yinc}増えました。x＝{x2+2}のとき、yはいくつですか。';w=[(yinc*(x2+2),'yの増加量を比例定数としています。'),(rate*3,'yの増加量だけを答えています。'),(rate*(x2+2-x1),'最初のxからの増加分だけを求めています。')];h=['yの増加量÷xの増加量で比例定数を求めます。'];e=f'比例定数は{yinc}÷3＝{rate}。y＝{rate}×{x2+2}＝{ans}です。'
 elif f==6:
  unitg=3+n;bag=unitg*(n+2);pages=60+10*n;initial=unitg*pages;targetpages=pages+30;total=unitg*targetpages+bag;ans=targetpages;q=f'同じ紙{pages}枚だけの重さは{initial}gです。この紙を袋に入れると、袋こみで{total}gでした。袋は{bag}gです。袋の中の紙は何枚ですか。';w=[(F(total,unitg),'袋の重さを引いていません。'),(F(total+bag,unitg),'袋の重さを引く代わりに足しています。'),(pages,'初めに重さを調べた束の枚数を、そのまま答えています。')];h=['紙1枚の重さを求めます。','袋を除いた紙だけの重さを、1枚の重さで割ります。'];e=f'1枚は{initial}÷{pages}＝{unitg}g。({total}－{bag})÷{unitg}＝{ans}枚です。'
 else:
  a=2+n;b=a+2;capacity=60*(n+1);ans=F(capacity,a+b);q=f'空の水槽に、毎分{a}Lの管Aと毎分{b}Lの管Bから同時に水を入れます。{capacity}Lになるのは何分後ですか。';w=[(F(capacity,a),'管Aだけで入れる時間を求めています。'),(F(capacity,b),'管Bだけで入れる時間を求めています。'),(F(capacity,a)+F(capacity,b),'別々にかかる時間を足しています。')];h=['2本が1分間に入れる水量を合わせます。','目標の水量を、2本合わせた毎分の量で割ります。'];e=f'毎分{a+b}L入るので、{capacity}÷{a+b}＝{val(ans)}分です。';d=graph(name,'2本の管を合わせた水量','時間（分）','水量（L）',24,(a+b)*24,4,(a+b)*4,points=[(i,(a+b)*i) for i in range(0,25,4)],yminor=a+b)
 return emit(u,lev,q,ans,w,h,e,fam,p,d)

def make_inverse(f,n,lev):
 u='inverse';a=24+12*n;x=3+n;fam=f'inverse_{f}';p={'n':n};name=f'g6-{fam}-{n}';d=None
 if f==0:
  ans=a;q=f'yはxに反比例し、x＝3のときy＝{a//3}です。一定になる積x×yはいくつですか。';w=[(F(a,9),'yをxで割り、比例定数のように考えています。'),(3+a//3,'xとyを足しています。'),(a//3,'yの値をそのまま答えています。')];h=['反比例では、対応するxとyの積が一定です。'];e=f'3×{a//3}＝{a}です。'
 elif f==1:
  a=6*(n+3);x=3;ans=a//x;q=f'y＝{a}÷xです。x＝{x}のとき、yはいくつですか。';w=[(a*x,'割る代わりに掛けています。'),(a-x,'割る代わりに引いています。'),(a+x,'割る代わりに足しています。')];h=['式のxを指定の値に置き換えます。'];e=f'{a}÷{x}＝{ans}です。'
 elif f==2:
  times=2+n;ans=F(1,times);q=f'xとyは反比例しています。xが{times}倍になるとyは何倍になりますか。分数は約分して答えます。';w=[(times,'比例の変わり方と混同しています。'),(times*times,'倍率を2回掛けています。'),(1,'積が一定になるための変化を反映していません。')];h=['xとyの積が変わらないように考えます。'];e=f'xが{times}倍ならyを{times}で割るので、1/{times}倍です。'
 elif f==3:
  people=3+n;hours=6;total=people*hours;newpeople=people*2;ans=3;q=f'同じ仕事を、同じ能率の人{people}人で行うと6時間かかります。{newpeople}人では何時間ですか。';w=[(F(3,2),'人数が2倍になったので半分にし、さらにもう一度半分にしています。'),(2,'人数が2倍ではなく3倍になったとして割っています。'),(F(9,2),'減る時間を全体の1/4とし、6時間の3/4を答えています。')];h=['人数×時間が一定になります。'];e=f'{people}×6÷{newpeople}＝3時間です。'
 elif f==4:
  a=12*(n+2);xx=n+2;ans=12;xmax=12;ymax=a/1;d=graph(name,'面積が一定の長方形','縦の長さ（cm）','横の長さ（cm）',12,ymax,2,ymax/6,curve=[(1+i*.05,a/(1+i*.05)) for i in range(221)],xminor=1,yminor=ymax/12);q=f'グラフは面積が{a}cm²の長方形の縦と横の関係です。縦が{xx}cmのとき、横は何cmですか。';w=[(a*xx,'面積を縦で割らずに掛けています。'),(a-xx,'面積から縦を引いています。'),(xx,'縦と横は常に同じだとしています。')];h=['縦×横が一定の面積になります。'];e=f'{a}÷{xx}＝12cmです。'
 elif f==5:
  distance=120+60*n;speed=30+15*n;ans=F(distance,speed);q=f'{distance}kmの道を一定の時速{speed}kmで進みます。かかる時間は何時間ですか。';w=[(distance*speed,'道のりに速さを掛けています。'),(F(speed,distance),'速さ÷道のりにして、割る順序を逆にしています。'),(distance-speed,'道のりから速さを引いています。')];h=['時間＝道のり÷速さです。'];e=f'{distance}÷{speed}＝{val(ans)}時間です。'
 elif f==6:
  people=4+n;allhours=8;done=2;newpeople=people+2;ans=F(people*(allhours-done),newpeople);q=f'同じ能率の人{people}人で8時間かかる仕事を、まず{people}人で2時間しました。残りを{newpeople}人で行うと、あと何時間かかりますか。';w=[(F(people*allhours,newpeople),'すでに終わった仕事を引いていません。'),(allhours-done,'人数が増えたのに残り時間を変えていません。'),(F((people+2)*(allhours-done),people),'人数の比を逆に掛けています。')];h=['全体の仕事量から、初めの2時間にした分を引きます。','残りの仕事量を新しい人数で割ります。'];e=f'残りの仕事量は{people}×(8－2)＝{people*6}人時。これを{newpeople}で割り、{val(ans)}時間です。'
 else:
  d1=60*(n+1);s1=30*(n+1);s2=20*(n+1);ans=F(2*d1,F(d1,s1)+F(d1,s2));q=f'{d1}kmの道を往復します。行きは時速{s1}km、帰りは時速{s2}kmでした。休まないとき、往復全体の平均の速さは時速何kmですか。';w=[(F(s1+s2,2),'速さを単純に平均しています。かかる時間が同じではありません。'),(s1,'行きの速さだけを答えています。'),(s2,'帰りの速さだけを答えています。')];h=['行きと帰りにかかる時間を別々に求めます。','往復の道のり÷往復の時間で平均の速さを求めます。'];e=f'行きは{d1}÷{s1}＝2時間、帰りは{d1}÷{s2}＝3時間。{2*d1}÷5＝{val(ans)}km/時です。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d)
def make_data(f,n,lev):
 u='data';fam=f'data_{f}';p={'n':n};name=f'g6-{fam}-{n}';d=None
 if f==0:
  values=[n+2,n+4,n+5,n+7,n+10];ans=values[2];q=f'記録は小さい順に{values[0]}、{values[1]}、{values[2]}、{values[3]}、{values[4]}です。中央値はいくつですか。';w=[(F(sum(values),5),'平均を求めています。中央値は中央の記録です。'),(values[1],'中央の位置を1つ左にずらしています。'),(values[3],'中央の位置を1つ右にずらしています。')];h=['小さい順で中央に来る記録を選びます。'];e=f'5個の中央は3番目なので、中央値は{ans}です。'
 elif f==1:
  mode=4+n;values=[n,n+1,n+1,mode,mode,mode,mode+2];ans=mode;q=f'記録は{", ".join(map(str,values))}です。最頻値はいくつですか。';w=[(n+1,'2回現れる値を選んでいます。もっと多く現れる値があります。'),(mode+2,'最大値を選んでいます。'),(F(sum(values),len(values)),'平均を求めています。')];h=['値ごとに何回現れるか数えます。'];e=f'{mode}が3回現れ、最も多いので、最頻値は{ans}です。'
 elif f==2:
  # Boundary inclusion without an ambiguous integer alternative.
  lo=10*n;hi=lo+10;ans=lo;q=f'記録を「{lo}以上{hi}未満」の階級に分けます。この階級に入る値はどれですか。';w=[(lo-1,'下端以上という条件を満たしません。'),(hi,'未満は上端の値を含みません。'),(hi+1,'上端を超えています。')];h=['以上はその値を含み、未満はその値を含みません。'];e=f'{lo}は下端なので含みます。{hi}は含まず、正しいのは{lo}です。'
 elif f==3:
  counts=[n+1,n+4,n+2,n+3];ans=counts[0]+counts[1];q='グラフは、ボールを投げた距離の記録を10mずつの階級に分けたものです。記録が20m未満の人は何人ですか。';q=q.replace('グラフは',f'次の{sum(counts)}人のグラフは');w=[(counts[1],'10以上20未満の階級だけを読んでいます。'),(counts[0]+counts[1]+counts[2],'20以上30未満の人まで含めています。'),(sum(counts),'条件を付けず全員を数えています。')];h=['20m未満に当たる柱をすべて選びます。'];e=f'0以上10未満の{counts[0]}人と、10以上20未満の{counts[1]}人を足し、{ans}人です。';d=graph(name,'ボールを投げた距離の記録','ボールを投げた距離（m）','人数（人）',40,math.ceil(max(counts)/2)*2,10,2,bars=[(10*i,10*(i+1),v) for i,v in enumerate(counts)],xminor=5,yminor=1);d['caption']+=' 各階級は左端以上・右端未満です。'
 elif f==4:
  values=[2+n,4+n,7+n,9+n,10+n,12+n];ans=F(values[2]+values[3],2);q=f'6人の記録が小さい順に{", ".join(map(str,values))}です。中央値はいくつですか。';w=[(values[2],'中央の小さいほうだけを答えています。'),(values[3],'中央の大きいほうだけを答えています。'),(values[2]+values[3],'中央2つを足した後に2で割っていません。')];h=['記録が偶数個なら、中央の2つの平均を求めます。'];e=f'({values[2]}＋{values[3]})÷2＝{val(ans)}です。'
 elif f==5:
  vals=[40+3*n,50+3*n,60+3*n,70+3*n];last=75+3*n;avg=F(sum(vals)+last,5);ans=last;q=f'100点満点のテストで、4人の得点は{", ".join(map(str,vals))}点です。5人目を加えた平均が{val(avg)}点になりました。5人目は何点ですか。';w=[(avg,'全体の平均を5人目の点数としています。'),(F(sum(vals),4),'初めの4人の平均を答えています。'),(5*avg-F(sum(vals),4)*5,'初めの平均に5を掛けて、初めの合計を大きく計算しています。')];h=['5人の平均から5人の合計を求めます。'];e=f'5人の合計は{val(avg)}×5＝{sum(vals)+last}点。初めの合計{sum(vals)}点を引き、{last}点です。'
 elif f==6:
  # Means differ but medians agree: select an exact summary, not an impression.
  a=[n+2,n+4,n+6,n+8,n+10];b=[n,n+4,n+6,n+8,n+14];ans='中央値は同じで、平均はB組のほうが大きい';q=f'A組の記録は{", ".join(map(str,a))}、B組は{", ".join(map(str,b))}です。正しい説明はどれですか。';w=[('平均も中央値も同じ','中央値が同じでも、合計が違うので平均は違います。'),('平均はA組のほうが大きい','合計はB組のほうが大きく、人数は同じです。'),('中央値はB組のほうが大きい','どちらも中央の3番目は同じ値です。')];h=['平均と中央値を別々に計算します。','最大値だけで判断せず、合計と中央の位置を確かめましょう。'];e=f'中央値はどちらも{a[2]}。平均はA組{val(F(sum(a),5))}、B組{val(F(sum(b),5))}で、B組が大きいです。';d={'kind':'table','head':['組','小さい順の記録'],'rows':[['A',', '.join(map(str,a))],['B',', '.join(map(str,b))]],'caption':'1組5人の記録です。'}
 else:
  counts=[2+n,3+n,4+n,1+n];total=sum(counts);lower=counts[0]+counts[1];ans=lower;q=f'グラフは{total}人の記録です。小さいほうから{lower}人は20m未満でした。グラフの0以上10m未満の柱と10以上20m未満の柱の人数を合わせると何人ですか。';# replace with richer missing-category inference from thresholds and total
  q=f'グラフは{total}人のボールを投げた距離です。30m以上の人と10m未満の人を除くと、何人残りますか。';ans=counts[1]+counts[2];w=[(total-counts[3],'30m以上だけを除き、10m未満を除いていません。'),(total-counts[0],'10m未満だけを除いています。'),(counts[0]+counts[3],'除く人を合計し、残る人と取り違えています。')];h=['両端の階級の人数をそれぞれ読みます。','全体から両端を引くか、残る中央2つを足します。'];e=f'{total}－{counts[0]}－{counts[3]}＝{ans}人。中央2つの{counts[1]}＋{counts[2]}でも同じです。';d=graph(name,'ボールを投げた距離の分布','ボールを投げた距離（m）','人数（人）',40,math.ceil(max(counts)/2)*2,10,2,bars=[(10*i,10*(i+1),v) for i,v in enumerate(counts)],xminor=5,yminor=1);d['caption']+=' 各階級は左端以上・右端未満です。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d)

def make_case(f,n,lev):
 u='case';fam=f'case_{f}';p={'n':n};d=None
 if f==0:
  a=2+n;b=3+n;ans=a*b;q=f'上着{a}種類とズボン{b}種類から1つずつ選びます。組み合わせは何通りですか。';w=[(a+b,'種類の数を足しています。'),(b,'上着を1種類に固定しています。'),(a*a,'上着とズボンが同じ種類数だとしています。')];h=['上着1種類ごとにズボンが何通りあるか考えます。'];e=f'{a}×{b}＝{ans}通りです。'
 elif f==1:
  people=3+n;ans=people*(people-1)//2;q=f'{people}人から2人を選んで組を作ります。順序を区別しない組は何通りですか。';w=[(people*(people-1),'ABとBAを別の組として2回数えています。'),(people*people,'同じ人を2回選ぶ場合も含めています。'),(people-1,'1人を固定した組だけを数えています。')];h=['1人を選んだら、もう1人は残りから選びます。','順序を区別しないので、2回数えた分を直します。'];e=f'{people}×{people-1}÷2＝{ans}通りです。'
 elif f==2:
  a=2+n;b=3+n;c=2;ans=a*b*c;q=f'パン{a}種類、飲み物{b}種類、デザート{c}種類から1つずつ選びます。選び方は何通りですか。';w=[(a+b+c,'種類の数を足しています。'),(a*b,'デザートの選び方を掛け忘れています。'),(b*c,'パンを1種類に固定しています。')];h=['選ぶ順に枝を分けると、各種類数を掛けられます。'];e=f'{a}×{b}×{c}＝{ans}通りです。'
 elif f==3:
  teams=4+n;ans=teams*(teams-1)//2;q=f'{teams}チームが、ほかのすべてのチームと1回ずつ試合をします。全部で何試合ですか。';w=[(teams*(teams-1),'同じ試合を両チームから2回数えています。'),(teams*(teams+1)//2,'自分自身との組まで含めています。'),(teams-1,'1チームがする試合だけを答えています。')];h=['対戦する2チームの組を、重複しないように数えます。'];e=f'{teams}×{teams-1}÷2＝{ans}試合です。'
 elif f==4:
  cards=3+n;ans=cards*(cards-1);q=f'1から{cards}までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。';w=[(cards*cards,'同じカードを2回使う場合を含めています。'),(ans//2,'12と21など、順序の違う数を同じものとしています。'),(cards-1,'十の位を1つに固定しています。')];h=['十の位を選んだら、一の位は残りのカードから選びます。'];e=f'十の位{cards}通り、一の位{cards-1}通りで、{ans}個です。'
 elif f==5:
  m=3+n;ans=(m-1)*(m-1);q=f'0から{m-1}までの数字カードを1枚ずつ用意します。異なる2枚を使って2桁の整数を作ると、何個できますか。';w=[(m*(m-1),'十の位を0にする場合を含めています。'),((m-1)*m,'使ったカードを一の位で再び使っています。'),((m-1)*(m-2),'一の位にも0を使えないと考えています。')];# two wrong formulas coincide; replace one with double-use plus leading-zero error combined
  w[1]=(m*m,'十の位の0とカードの再使用を両方認めています。');h=['十の位に0は置けませんが、一の位には置けます。'];e=f'十の位は{m-1}通り。一の位は残りの{m-1}通りなので、{ans}個です。'
 elif f==6:
  people=4+(n%2);# 4/5 people, distinguish context/order labels for each variant
  letters=list('ABCDE')[:people];special=letters[(n-1)%people];second=letters[n%people];ans=2*math.factorial(people-1);q=f'{"、".join(letters)}の{people}人を1列に並べます。{special}と{second}がとなり合う並び方は何通りですか。';w=[(math.factorial(people),'となり合わない並び方まで含めています。'),(math.factorial(people-1),'2人の中の順序を1通りに固定しています。'),(2*math.factorial(people-2),'2人の組の置き場所を十分に数えていません。')];h=['となり合う2人を1つのまとまりにします。','まとまりの中の2通りの順序も数えます。'];e=f'まとまりを含めて{people-1}つを並べると{math.factorial(people-1)}通り。2人の中の順序2通りを掛け、{ans}通りです。'
 else:
  m=4+n;evens=m//2;ans=evens*(m-1)*(m-2);q=f'1から{m}までの数字カードを1枚ずつ用意し、異なる3枚で3桁の偶数を作ります。何個できますか。';w=[(m*(m-1)*(m-2),'一の位が奇数の数も含めています。'),((m-1)*(m-2),'一の位を1つの偶数に固定しています。'),(evens*(m-1)*(m-1),'百の位に使ったカードを十の位でも使っています。')];h=['偶数になるための条件を満たす一の位から決めます。','残り2桁は、使ったカードを除いて順に選びます。'];e=f'一の位は偶数{evens}通り。百の位{m-1}通り、十の位{m-2}通りなので、{ans}個です。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d)

def make_fraction(f,n,lev):
 u='fraction';fam=f'fraction_{f}';p={'n':n};d=None;a=F(n+1,n+3);b=F(n+2,n+4)
 if f==0:
  ans=a*b;q=f'{a}×{b}を計算し、約分した答えを選びましょう。';w=[(F(a.numerator+b.numerator,a.denominator+b.denominator),'分子どうし・分母どうしを足しています。'),(a/b,'掛け算なのに後ろの分数を逆数にしています。'),(F(a.numerator*b.numerator,a.denominator),'分母どうしを掛けず、前の分母だけを使っています。')];h=['分子どうし、分母どうしを掛けます。','分子と分母の共通の約数で約分します。'];e=f'分子は{a.numerator}×{b.numerator}、分母は{a.denominator}×{b.denominator}。約分して{ans}です。'
 elif f==1:
  ans=a/b;q=f'{a}÷{b}を計算し、約分した答えを選びましょう。';w=[(a*b,'割り算をそのまま掛け算にしています。'),(b/a,'割る数ではなく割られる数を逆数にしています。'),(F(a.numerator,b.numerator),'分子どうしだけを割っています。')];h=['割る数を逆数にして掛けます。'];e=f'{a}×{1/b}を計算して約分すると{ans}です。'
 elif f==2:
  total=F(n+3,1);per=F(1,n+2);ans=total/per;q=f'{total}Lのジュースを、1人に{per}Lずつ配ります。何人に配れますか。';w=[(n+3+n+2,'全体量の数値と1人分の分母を足しています。'),(F(1,1)/per,'全体を1Lとしています。'),(total,'全体量の数値を、そのまま人数として答えています。')];h=['全体量÷1人分で人数を求めます。'];e=f'{total}÷{per}＝{ans}人です。'
 elif f==3:
  known=6*(n+1);fraction=F(n+1,n+3);ans=F(known,1)/fraction;q=f'ある数の{fraction}が{known}です。ある数はいくつですか。';w=[(known*fraction,'分かっている部分の量を、もとの量として掛けています。'),(known,'部分の量をそのまま答えています。'),(F(known,1)/(1-fraction),'示された割合ではなく残りの割合で割っています。')];h=['もとの数×割合＝分かっている量と考えます。'];e=f'{known}÷{fraction}＝{ans}です。'
 elif f==4:
  first=F(1,n+2);second=F(1,n+3);length=6*(n+2)*(n+3);remaining=length*(1-first)*(1-second);ans=length;q=f'リボンの{first}を使い、残りの{second}をさらに使ったら{remaining}m残りました。初めは何mありましたか。';w=[(remaining/(1-first-second),'2回目の割合も、最初の全体に対する割合として引いています。'),(remaining/(1-second),'最初に使った分を反映していません。'),(remaining/(1-first),'2回目に使った分を反映していません。')];h=['2回目の割合は、1回目に残った量をもとにしています。','最後に残る割合を掛け算で求め、残量をその割合で割ります。'];e=f'最後に残る割合は(1－{first})×(1－{second})＝{(1-first)*(1-second)}。{remaining}をこの割合で割ると{length}mです。'
 else:
  ta=4+n;tb=2*ta;ans=F(1,1)/(F(1,ta)+F(1,tb));q=f'Aさんはある仕事全体を{ta}時間、Bさんは同じ仕事全体を{tb}時間で終えます。一定の能率で2人が同時に働くと何時間かかりますか。';w=[(F(ta+tb,2),'2人の作業時間を単純に平均しています。'),(ta+tb,'同時に働くのに時間を足しています。'),(F(1,ta)+F(1,tb),'1時間当たりの仕事の割合を、時間として答えています。')];h=['仕事全体を1として、1時間に終える割合をそれぞれ求めます。','2人分の割合を足し、全体1をその割合で割ります。'];e=f'1時間に1/{ta}＋1/{tb}＝{F(1,ta)+F(1,tb)}できます。1÷{F(1,ta)+F(1,tb)}＝{ans}時間です。'
 return emit(u,lev,q,ans,w,h,e,fam,p,d)
# Add precisely 400 questions, spread across the year's units. Original IDs remain.
makers={'symmetry':make_symmetry,'expression':make_expression,'fraction':make_fraction,'ratio':make_ratio,'scale':make_scale,'circle':make_circle,'volume':make_volume,'proportion':make_proportion,'inverse':make_inverse,'data':make_data,'case':make_case}
for unit,maker in makers.items():
 if unit=='fraction':plans=[('basic',[0,1],10),('standard',[2,3],12),('advanced',[4,5],8)]
 else:plans=[('basic',[0,1,2],12),('standard',[3,4,5],15),('advanced',[6,7],10)]
 for level,families,target in plans:
  done=0;j=0
  while done<target:
   f=families[j%len(families)];n=j//len(families)+1;j+=1
   if j>300:raise RuntimeError((unit,level,'could not produce valid distinct choices'))
   if maker(f,n,level):done+=1
assert len(records)==500,len(records)
# Upgrade all original graph questions to full labelled axes, units, and sub-ticks.
for q in records:
 if q['id']=='math_g6_course_proportion_005':
  q['diagram']=graph('g6-original-proportion-line','比例のグラフ','x（単位なし）','y（単位なし）',6,15,1,2.5,points=[(i,i*2.5) for i in range(7)],xminor=.5,yminor=.5)
 if q['id']=='math_g6_course_data_006':
  q['diagram']=graph('g6-original-histogram','記録の分布','記録（点）','人数（人）',30,6,10,1,bars=[(0,10,2),(10,20,5),(20,30,3)],xminor=5,yminor=1);q['diagram']['caption']+=' 各階級は左端以上・右端未満です。';q['question']='次の柱状グラフは、記録を10点ずつの階級に分けたものです。記録が20点未満の人は何人ですか。'
# Save choices, hints, and individually matched misconceptions as reviewable fixed data.
for q in records:
 for key in ['question','answer','explanation']:q[key]=ruby(q[key])
 q['choices']=[ruby(x) for x in q['choices']];q['hints']=[ruby(x) for x in q['hints']]
 q['misconceptions']=[{'answer':ruby(x['answer']),'reason':ruby(x['reason'])} for x in q['misconceptions']]
 assert 1<=len(q['hints'])<=2,q['id']
 assert len({semantic(plain(x)) for x in q['choices']})==4,q['id']
 assert len(q['misconceptions'])==3,q['id']
units=json.loads((BASE/'math-g6-course.js').read_text().split('root.FF.units.DEFS.math[6]=',1)[1].split(';\nvar questions=',1)[0]);names={x['id']:x['name'] for x in units}
source='// 小6算数：初回100問＋追加400問。固定問題。利用者レビュー待ち。\n(function(root){\n"use strict";\nroot.FF.units.DEFS.math[6]='+json.dumps(units,ensure_ascii=False,indent=2)+';\nvar questions='+json.dumps(records,ensure_ascii=False,indent=2)+';\nArray.prototype.push.apply(root.QUESTION_BANK=root.QUESTION_BANK||[],questions);\n})(this);\n'
(BASE/'math-g6-course.js').write_text(source)
lines=['# 小学6年 算数：500問レビュー用一覧','','前回100問＋新規追加400問。全問4択、ヒント1〜2個、誤答3つの理由付き。既存の別コレクション10問はこの一覧に含みません。','','|単元|基礎|標準|発展|合計|','|---|---:|---:|---:|---:|']
for unit in names:
 c=Counter(q['difficulty'] for q in records if q['unit']==unit);lines.append(f'|{names[unit]}|{c["basic"]}|{c["standard"]}|{c["advanced"]}|{sum(c.values())}|')
for q in records:
 lines+=['',f'## {q["id"]}（{names[q["unit"]]}・{q["difficulty"]}）','',plain(q['question']),'','選択肢：'+' ／ '.join(map(plain,q['choices'])),'','ヒント：'+' ／ '.join(map(plain,q['hints'])),'','正解：'+plain(q['answer']),'',plain(q['explanation'])]
 if 'diagram'in q:lines+=['','図：'+json.dumps(q['diagram'],ensure_ascii=False)]
(BASE/'G6_QUESTIONS_REVIEW.md').write_text('\n'.join(lines)+'\n')
summary={'count':len(records),'added':400,'difficulties':dict(Counter(q['difficulty'] for q in records)),'diagrams':sum('diagram'in q for q in records),'graph_count':len([q for q in records if q.get('diagram',{}).get('src','').split('/')[-1].startswith(('g6-proportion','g6-inverse','g6-data','g6-original'))])}
(BASE/'g6-authoring/summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');print(summary)

used={q.get('diagram',{}).get('src','').split('/')[-1] for q in records}
for file in OUT.glob('*.svg'):
 if file.name not in used:file.unlink()
