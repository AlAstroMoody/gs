import{c as w,r as v,D as A,a as _,b as k,d as c,t as V,F,j as N,g as L,x as R,E as T,G as O,H as U,o as W,I as G,n as j,y as H,z as J,v as E,J as S,K,e as g,f as B,L as z}from"./index.55f217f3.js";import{s as C}from"./store.fd9f566f.js";const P={class:"rounded-2xl border border-silver bg-gray p-2"},q=["onClick"],Q={__name:"AppCommonSelect",props:{options:{default:()=>[],type:Array},defaultValue:{default:"\u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",type:String}},emits:["getOption"],setup(y,{emit:h}){const o=y,m=w(()=>[{name:o.defaultValue}].concat(o.options).filter(u=>{var a;return u.name!==((a=i.value)==null?void 0:a.name)})),e=v(!1),n=()=>{e.value=!e.value},p=u=>{e.value=!e.value,u||u===0?i.value=o.options.find(a=>(a==null?void 0:a.id)===u):i.value={name:o.defaultValue,id:void 0},h("getOption",i.value)},i=v({name:"",id:0}),d=v(null);return A(d,()=>e.value=!e.value),(u,a)=>{var l;return _(),k("div",P,[c("label",{class:"block w-full",onClick:n},V(((l=i.value)==null?void 0:l.name)||y.defaultValue),1),e.value?(_(),k("div",{key:0,class:"opacity-100",ref_key:"select",ref:d},[(_(!0),k(F,null,N(L(m),s=>(_(),k("label",{key:s.id,onClick:t=>p(s.id),class:"block w-full py-0 px-2 transition-all hover:bg-second hover:text-primary"},V(s.name||s),9,q))),128))],512)):R("",!0)])}}},Y=["onClick"],Z={__name:"AppCommonSlider",props:{custom:{default:()=>"",type:String}},emits:["thumbShift"],setup(y,{emit:h}){const o=y,{custom:m}=T(o),e=v(null),n=v(null),p=v(0),i=v(0),d=v(0),u=v(!1),a=w(()=>d.value-i.value),l=w(()=>{if(n.value&&e.value){const r=Number((a.value/(n.value.clientWidth-e.value.clientWidth)).toPrecision(2));return r>0?r:0}return 0}),s=()=>{h("thumbShift",l.value)};O(a,()=>{t()});const t=U(()=>{s()},100),f=r=>{r.preventDefault(),u.value||x(),u.value=!0,e.value&&(p.value=r.clientX-e.value.getBoundingClientRect().left),document.addEventListener("mousemove",I),document.addEventListener("mouseup",M)},I=r=>{if(n.value&&e.value){let b=r.clientX-p.value-n.value.getBoundingClientRect().left;b<0&&(b=0);let D=n.value.offsetWidth-e.value.offsetWidth;b>D&&(b=D),e.value.style.left=b+"px",d.value=e.value.getBoundingClientRect().left}},M=()=>{document.removeEventListener("mouseup",M),document.removeEventListener("mousemove",I)},X=r=>{x(),d.value=r.clientX,e.value&&(e.value.style.left=a.value+"px")},$=()=>!1,x=()=>{i.value=n.value.getBoundingClientRect().left,p.value=0,d.value=0,e.value.style.left="0"};return W(()=>{x(),window.addEventListener("resize",x)}),G(()=>{window.removeEventListener("resize",x)}),(r,b)=>(_(),k("div",{class:j(["h-4 w-full rounded-lg",L(m)]),ref_key:"slider",ref:n,onClick:H(X,["self"])},[c("label",{class:"relative left-0 -top-1 block h-6 w-3 rounded-lg bg-second",ref_key:"thumb",ref:e,onMousedown:f,onDragstart:$},null,544)],10,Y))}},ee={class:"my-2 flex w-full rounded-2xl border border-solid border-second bg-gray px-3 pl-3 text-second ease-out"},te=c("label",{for:"input",class:"absolute p-2 duration-300 ease-out"}," \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E ",-1),le={class:"flex items-center"},se={class:"my-1 flex items-center"},ne={class:"my-1 flex items-center"},ue={__name:"AppFilter",emits:["filteredItems"],async setup(y,{emit:h}){let o,m;const e=J({name:"",level:0,goblins:[],luck:!1,stealth:!1}),n=w(()=>C.entities.items);n.value.length||([o,m]=E(()=>C.setItems("items")),await o,m());const p=w(()=>C.entities.goblins);p.value.length||([o,m]=E(()=>C.setItems("goblins")),await o,m()),h("filteredItems",n.value);const i=l=>{e.level=200*l},d=l=>{e.goblins=[],l.id&&e.goblins.push(l.name)},u=l=>{e.name=l.target.value},a=()=>{var s;let l=n.value;e.name&&(l=l.filter(t=>t.name.toLowerCase().includes(e.name.toLowerCase()))),e.level&&(l=l.filter(t=>t.level?t.level>=e.level:null)),(s=e.goblins)!=null&&s.length&&(l=l.filter(t=>t.goblins.some(f=>e.goblins[0]===f))),e.luck&&(l=l.filter(t=>{var f;return(f=t==null?void 0:t.params)==null?void 0:f.luck})),e.stealth&&(l=l.filter(t=>{var f;return(f=t==null?void 0:t.params)==null?void 0:f.stealth_detection})),h("filteredItems",l)};return O(e,()=>a()),(l,s)=>(_(),k(F,null,[c("div",ee,[S(c("input",{autocomplete:"off","onUpdate:modelValue":s[0]||(s[0]=t=>e.name=t),placeholder:" ",id:"input",class:"relative z-10 w-full py-4",onInput:s[1]||(s[1]=t=>u(t))},null,544),[[K,e.name]]),te]),g(" \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u043E\u0442: "+V(Math.round(e.level))+" ",1),c("div",le,[g(" 0 "),B(Z,{onThumbShift:i,class:"mx-1",custom:"bg-silver"}),g(" 200 ")]),g(" \u0438\u0433\u0440\u043E\u0432\u043E\u0439 \u043A\u043B\u0430\u0441\u0441: "),B(Q,{options:L(p),onGetOption:d,"default-value":"--\u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043A\u043B\u0430\u0441\u0441\u043E\u0432--"},null,8,["options"]),c("label",se,[S(c("input",{type:"checkbox",class:"mr-2 h-5 w-5 bg-silver accent-black","onUpdate:modelValue":s[2]||(s[2]=t=>e.luck=t)},null,512),[[z,e.luck]]),g(" \u0441 \u0443\u0434\u0430\u0447\u0435\u0439 ")]),c("label",ne,[S(c("input",{type:"checkbox",class:"mr-2 h-5 w-5 bg-silver accent-black","onUpdate:modelValue":s[3]||(s[3]=t=>e.stealth=t)},null,512),[[z,e.stealth]]),g(" \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E\u043A ")])],64))}};export{ue as _,Z as a};
