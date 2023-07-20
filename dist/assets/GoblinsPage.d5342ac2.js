import{_ as B}from"./AppItemsPopup.f4844322.js";import{e as D}from"./transitions.c96b8bad.js";import{s as F}from"./store.6ba8c3c6.js";import{u as I}from"./useGoblinState.2867a4c4.js";import{c as N,r as s,G as V,o as M,a as r,b as c,F as j,i as E,d as i,t as y,x as S,C as q,f as k,k as A,T as L}from"./index.8c313583.js";import"./AppPopup.218439ea.js";import"./ExitIcon.1749c7c5.js";import"./FilterIcon.bd2488aa.js";import"./AppSidebar.6fb9c9ce.js";import"./AppFilter.661cd061.js";import"./QuestionIcon.a596e1dd.js";import"./index.af050076.js";const O=["onClick"],U={class:"carousel-box absolute left-0 top-0 z-1 h-full w-full"},Z={class:"absolute bottom-4 left-5 z-1 text-xl text-white md:text-3xl"},H=["src"],J={key:0,class:"absolute bottom-10 text-sm font-semibold md:text-2xl lg:bottom-0"},K={__name:"GoblinCards",setup(w){const u=N(()=>F.entities.goblins);let v=s(0),d=s(0),f=s(!1);const C=s(-.1),G=(e,t)=>e.map((n,o)=>t===o?e.length:e.length-Math.abs(t-o)),l=s(null);let a=s(0);const T=(e,t,n)=>{const o=G([...l.value],n)[t];e.style.setProperty("--zIndex",o),e.style.setProperty("--active",(t-n)/l.value.length),e.style.setProperty("--items",l.value.length)},h=()=>{l.value&&(a.value=Math.max(0,Math.min(a.value,l.value.length*10)),d.value=Math.floor(a.value/(l.value.length*10)*(l.value.length-1)),l.value.forEach((e,t)=>T(e,t,d.value)))};let _=s(!1);const p=e=>{if(!f.value)return;_.value=!1;const t=e.clientX||e.touches&&e.touches[0].clientX||0,n=(t-v.value)*C.value;a.value=a.value+n,v.value=t,_.value||requestAnimationFrame(()=>{h(),_.value=!0})},b=e=>{f.value=!0,v.value=e.clientX||e.touches&&e.touches[0].clientX||0},g=()=>f.value=!1,$=s(null),x=()=>{q(()=>{var e;a.value=(10*((e=l.value)==null?void 0:e.length)||0)/2,h(),m.value=u.value[a.value/10]})},m=s(null),z=(e,t)=>{a.value=t/l.value.length*l.value.length*10+10,h(),m.value=e,P(e)},{setGoblin:P}=I();return V(u,()=>x()),M(()=>x()),(e,t)=>{var n;return r(),c("div",{class:"pointer-events-none relative z-1 h-full w-full overflow-hidden",ref_key:"carousel",ref:$,onMousedown:b,onMousemove:p,onMouseup:g,onTouchstart:b,onTouchmove:p,onTouchend:g},[(r(!0),c(j,null,E(u.value,(o,X)=>(r(),c("div",{class:"carousel-item pointer-events-auto absolute overflow-hidden bg-black",key:o.id,ref_for:!0,ref_key:"cards",ref:l,onClick:W=>z(o,X)},[i("div",U,[i("div",Z,y(o.name),1),i("img",{src:`.${o.src}`,class:"pointer-events-none h-full w-full object-cover"},null,8,H)])],8,O))),128)),m.value?(r(),c("div",J,y((n=m.value)==null?void 0:n.description),1)):S("",!0)],544)}}},Q={class:"mb-96 flex flex-1 flex-col justify-between px-2"},R={class:"mb-10 flex h-full flex-col"},ve={__name:"GoblinsPage",setup(w){const u=s(null);return M(()=>{D({el:u.value,transformOrigin:"top right"})}),(v,d)=>(r(),c("div",Q,[i("div",R,[i("div",{class:"headline my-8",ref_key:"title",ref:u},"\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",512),k(K,{class:"md:mb-10 lg:mb-0"})]),(r(),A(L,{to:"body"},[k(B,{class:"absolute right-2 top-20 block bg-second md:hidden"})]))]))}};export{ve as default};