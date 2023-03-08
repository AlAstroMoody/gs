import{c as w,r as d,B as X,o as g,a as h,b,t as S,F as B,i as $,f as V,v as z,C as A,D as N,E as R,G as T,H as W,n as U,x as G,y as H,s as E,I as J,J as P,d as C,e as M}from"./index.d8e717f9.js";import{s as k}from"./store.5d4543e1.js";const j={class:"rounded-2xl border border-silver bg-gray p-2"},q=["onClick"],K={__name:"AppCommonSelect",props:{options:{default:()=>[],type:Array},defaultValue:{default:"\u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",type:String}},emits:["getOption"],setup(_,{emit:f}){const o=_,v=w(()=>[{name:o.defaultValue}].concat(o.options).filter(u=>{var l;return u.name!==((l=i.value)==null?void 0:l.name)})),e=d(!1),n=()=>e.value=!e.value,m=u=>{e.value=!e.value,u||u===0?i.value=o.options.find(l=>(l==null?void 0:l.id)===u):i.value={name:o.defaultValue,id:void 0},f("getOption",i.value)},i=d({name:"",id:0}),c=d(null);return X(c,()=>e.value=!e.value),(u,l)=>{var t;return g(),h("div",j,[b("label",{class:"block w-full",onClick:n},S(((t=i.value)==null?void 0:t.name)||_.defaultValue),1),e.value?(g(),h("div",{key:0,class:"opacity-100",ref_key:"select",ref:c},[(g(!0),h(B,null,$(V(v),s=>(g(),h("label",{key:s.id,onClick:a=>m(s.id),class:"block w-full py-0 px-2 transition-all hover:bg-second hover:text-primary"},S(s.name||s),9,q))),128))],512)):z("",!0)])}}},Q=["onClick"],Y={__name:"AppCommonSlider",props:{custom:{default:()=>"",type:String}},emits:["thumbShift"],setup(_,{emit:f}){const o=_,{custom:v}=A(o),e=d(null),n=d(null),m=d(0),i=d(0),c=d(0),u=d(!1),l=w(()=>c.value-i.value),t=w(()=>{if(n.value&&e.value){const r=Number((l.value/(n.value.clientWidth-e.value.clientWidth)).toPrecision(2));return r>0?r:0}return 0}),s=()=>{f("thumbShift",t.value)};N(l,()=>{a()});const a=R(()=>{s()},100),x=r=>{r.preventDefault(),u.value||y(),u.value=!0,e.value&&(m.value=r.clientX-e.value.getBoundingClientRect().left),document.addEventListener("mousemove",I),document.addEventListener("mouseup",L)},I=r=>{if(n.value&&e.value){let p=r.clientX-m.value-n.value.getBoundingClientRect().left;p<0&&(p=0);let D=n.value.offsetWidth-e.value.offsetWidth;p>D&&(p=D),e.value.style.left=p+"px",c.value=e.value.getBoundingClientRect().left}},L=()=>{document.removeEventListener("mouseup",L),document.removeEventListener("mousemove",I)},F=r=>{y(),c.value=r.clientX,e.value&&(e.value.style.left=l.value+"px")},O=()=>!1,y=()=>{i.value=n.value.getBoundingClientRect().left,m.value=0,c.value=0,e.value.style.left="0"};return T(()=>{y(),window.addEventListener("resize",y)}),W(()=>{window.removeEventListener("resize",y)}),(r,p)=>(g(),h("div",{class:U(["h-4 w-full rounded-lg",V(v)]),ref_key:"slider",ref:n,onClick:G(F,["self"])},[b("label",{class:"relative left-0 -top-1 block h-6 w-3 rounded-lg bg-second",ref_key:"thumb",ref:e,onMousedown:x,onDragstart:O},null,544)],10,Q))}},Z={class:"my-2 flex w-full rounded-2xl border border-solid border-second bg-gray px-3 pl-3 text-second ease-out"},ee=b("label",{for:"input",class:"absolute p-2 duration-300 ease-out"}," \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E ",-1),te={class:"flex items-center"},ne={__name:"AppFilter",emits:["filteredItems"],async setup(_,{emit:f}){let o,v;const e=H({name:"",level:0,goblins:[]}),n=w(()=>k.entities.items);n.value.length||([o,v]=E(()=>k.setItems("items")),await o,v());const m=w(()=>k.entities.goblins);m.value.length||([o,v]=E(()=>k.setItems("goblins")),await o,v()),f("filteredItems",n.value);const i=t=>{e.level=200*t,l()},c=t=>{e.goblins=[],t.name&&e.goblins.push(t.name),l()},u=t=>{e.name=t.target.value,l()},l=()=>{var s;let t=n.value;e.name&&(t=t.filter(a=>a.name.toLowerCase().includes(e.name.toLowerCase()))),e.level&&(t=t.filter(a=>a.level?a.level>=e.level:null)),(s=e.goblins)!=null&&s.length&&(t=t.filter(a=>a.goblins.some(x=>e.goblins[0]===x))),f("filteredItems",t)};return(t,s)=>(g(),h(B,null,[b("div",Z,[J(b("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>e.name=a),placeholder:" ",id:"input",class:"relative z-10 w-full py-4",onInput:s[1]||(s[1]=a=>u(a))},null,544),[[P,e.name]]),ee]),C(" \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u043E\u0442: "+S(Math.round(e.level))+" ",1),b("div",te,[C(" 0 "),M(Y,{onThumbShift:i,class:"mx-1",custom:"bg-silver"}),C(" 200 ")]),C(" \u0438\u0433\u0440\u043E\u0432\u043E\u0439 \u043A\u043B\u0430\u0441\u0441: "),M(K,{options:V(m),onGetOption:c,"default-value":"--\u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043A\u043B\u0430\u0441\u0441\u043E\u0432--"},null,8,["options"])],64))}};export{ne as _,Y as a};
