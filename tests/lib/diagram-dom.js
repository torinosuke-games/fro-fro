// SVGの構造・数値を検査する小さなDOM。画面の文字寸法は別途Chromiumで検査。
const vm=require('node:vm');
class Node {
 constructor(tag,attrs={},children=[]){this.tag=tag;this.attrs={...attrs};this.style={};this.children=[];this.append(children);}
 append(c){if(c==null)return;if(Array.isArray(c))c.forEach(x=>this.append(x));else this.children.push(c);}
 appendChild(c){this.append(c);return c;}
 setAttribute(k,v){this.attrs[k]=v;}
 getAttribute(k){return this.attrs[k];}
 querySelectorAll(q){return this.children.flatMap(n=>n instanceof Node?[...(q==='*'||n.tag===q?[n]:[]),...n.querySelectorAll(q)]:[]);}
 querySelector(q){return this.querySelectorAll(q)[0]||null;}
 get childNodes(){return this.children;}
 get textContent(){return this.children.map(n=>n instanceof Node?n.textContent:String(n)).join('');}
}
function renderer(source){
 const svg=(tag,attrs,children)=>new Node(tag,attrs,children);
 const el=(tag,props={},children)=>{const n=new Node(tag,props.attrs,children);if(props.class)n.attrs.class=props.class;if(props.text)n.append(props.text);Object.assign(n.style,props.style||{});return n;};
 const ctx={FF:{ui:{svg,el}}};vm.runInNewContext(require('fs').readFileSync(require('path').join(__dirname,'../../js/japan-map.js'),'utf8'),ctx);vm.runInNewContext(source,ctx);return ctx.FF.lessonFigure.render;
}
module.exports={Node,renderer};
