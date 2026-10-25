"""Independent exact-arithmetic oracles for each of the 400 additional items."""
from pathlib import Path
from fractions import Fraction as F
import json,math,re,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1];source=(root/'codex-prototypes/homepage/math-g6-course.js').read_text();qs=json.loads(source.split('var questions=',1)[1].split(';\nArray.prototype',1)[0]);assert len(qs)==500
new=[q for q in qs if 'authoring'in q];assert len(new)==400
plain=lambda s:re.sub(r'\{([^|{}]+)\|[^{}]+\}',r'\1',s)
P=F(314,100)
def expected(f,n):
 u,i=f.rsplit('_',1);i=int(i);r=2+n;a=2+n;b=3+n;k=4+n
 if u=='symmetry':return [7+n,[7,8,10,12,9][(n-1)%5],10+n,6+n,6+n,10+2*n,9+n,10+n][i]
 if u=='expression':return [(80+20*n)*(3+n)+40+10*n,(2+n)*(4+n)+5+n,4+n,1000+500*n-(80+20*n)*(3+n)-(40+10*n),3+n,3*(4+n)+1,4+n,3+n][i]
 if u=='ratio':
  a=2+n;b=3+n;c=4+n;k=4+n;g=math.gcd(a,c)
  return [f'{a}：{b}',b*k,F(a,b),a*k,(a+b)*k,f'{a}：{b}',(a+b)*k,f'{a//g}：{c//g}'][i]
 if u=='scale':return [(3+n)*(2+n),n+2,3+n,F((n+2)*(n+1),10),F((6+n)*(n+3),2),F(10*(n+3),n+1),(n+2)*(n+4)*(n+1)**2,(4+n)*(3+n)][i]
 if u=='circle':return [r*r*P,r*r*P,100*(n+1)*(n+2),r*r*P/2,r*r*P/4,(2*r)**2-r*r*P,((r+1+n)**2-r*r)*P,2*r*(3+n)+r*r*P/2][i]
 if u=='volume':return [(10+5*n)*(4+n),r*r*P*(4+n),(20+10*n)*(3+n),F((4+n)*(3+n)*(7+n),2),4+n,(25+5*n)*(2+n),F(3*(4+n),4),4+n][i]
 if u=='proportion':return [(2+n)*(3+n),(2+n)*(3+n),2+n,(2+n)**2,5+n,(2+n)*(7+n),90+10*n,F(60*(n+1),6+2*n)][i]
 if u=='inverse':return [24+12*n,2*(n+3),F(1,2+n),3,12,4,F((4+n)*6,6+n),24*(n+1)][i]
 if u=='data':return [n+5,n+4,n*10,2*n+5,n+8,75+3*n,'中央値は同じで、平均はB組のほうが大きい',7+2*n][i]
 if u=='case':
  m=4+n;people=4+n%2
  return [(2+n)*(3+n),(3+n)*(2+n)//2,(2+n)*(3+n)*2,(4+n)*(3+n)//2,(3+n)*(2+n),(2+n)**2,2*math.factorial(people-1),(m//2)*(m-1)*(m-2)][i]
 if u=='fraction':return [F(n+1,n+3)*F(n+2,n+4),F(n+1,n+3)/F(n+2,n+4),(n+3)*(n+2),6*(n+3),6*(n+2)*(n+3),F(2*(4+n),3)][i]
 raise AssertionError(f)
checked=0
for q in new:
 f=q['authoring']['family'];n=q['authoring']['parameters']['n'];want=expected(f,n);actual=plain(q['answer'])
 if isinstance(want,str):assert actual==want,(q['id'],actual,want)
 else:assert abs(F(actual)-F(want))<F(1,10**7),(q['id'],actual,want)
 if f=='expression_3':assert all(0<F(plain(x))<1000+500*n for x in q['choices'])
 if f in ['expression_4','expression_6','expression_7','proportion_6','fraction_2']:assert all(F(plain(x)).denominator==1 for x in q['choices']),q['id']
 if f=='expression_7':assert all(0<F(plain(x))<=8+n for x in q['choices'])
 if f=='data_5':assert all(0<=F(plain(x))<=100 for x in q['choices'])
 checked+=1
for q in qs:
 assert 1<=len(q['hints'])<=2
 wrongs=[plain(x) for x in q['choices'] if x!=q['answer']];reasons={plain(x['answer']):x['reason'] for x in q['misconceptions']}
 assert set(wrongs)==set(reasons),(q['id'],wrongs,reasons)
 assert all(r.strip() for r in reasons.values())
 if q.get('diagram',{}).get('kind')=='image':
  path=root/q['diagram']['src'];tree=ET.parse(path)
  if path.name.startswith(('g6-proportion','g6-inverse','g6-data','g6-original')):
   strings=''.join(tree.getroot().itertext());assert '（'in strings and '）'in strings,path
   assert tree.getroot().attrib['viewBox']=='0 0 660 480';assert len(tree.findall('.//{http://www.w3.org/2000/svg}path'))>8
print(f'PASS: {checked} independent answer oracles, money/score bounds, 500 hint and misconception checks, labelled graph SVGs')
