import{s as y,b as V}from"./index-c8d0eea9.js";import{O as C,l as s,m as n,q as o,u,r as B,e as _,v as z,E as f,y as F,z as L,A as d,H as $,B as O,F as x,C as g,x as h}from"./@vue-b697c9f7.js";import{_ as A}from"./ThePreloader-6a5dcab0.js";import"./yandex-metrika-vue3-31715aa8.js";import"./@vueuse-aa787f22.js";import"./vue-router-e2a4607d.js";import"./picocolors-7608e719.js";import"./tailwindcss-animation-delay-bb812693.js";import"./tailwindcss-f34f17cc.js";import"./tailwind-scrollbar-b75acc9f.js";import"./firebase-6ed2b05d.js";import"./@firebase-40ef63b3.js";import"./idb-81bdbf9b.js";import"./nouislider-b0ecb9ee.js";const E={width:"15",height:"16",viewBox:"0 0 15 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},H=["stroke"],P=["stroke"],S={__name:"LoupeIcon",props:{color:{default:"red",type:String}},setup(i){const p=i,{color:t}=C(p);return(a,c)=>(s(),n("svg",E,[o("circle",{cx:"6.13442",cy:"5.83334",r:"4.73334",stroke:u(t),"stroke-width":"1.2"},null,8,H),o("path",{d:"M9.46777 9.83333L13.4678 14.5",stroke:u(t),"stroke-width":"1.2","stroke-linecap":"round"},null,8,P)]))}},j={class:"group-hover:font-bold group-hover:text-purple"},q={class:"mx-1 text-red group-hover:text-purple"},D={key:0,class:"text-orange"},K={key:0,class:"pl-3"},k={__name:"AppCraftItem",props:{item:{default:()=>{},type:Object},count:{type:Number,default:0}},setup(i){var l;const p=i,{item:t}=C(p),a=B(!1),c=_(()=>{var m;return!!((m=e==null?void 0:e.parents)!=null&&m.length)}),v=()=>c.value?a.value=!a.value:null,e=y.currentItem("items",((l=t.value)==null?void 0:l.id)||0),r=m=>e!=null&&e.count?Number(e.count[m]):0;return(m,W)=>{var b;const I=z("router-link");return s(),n("ol",null,[o("div",{class:O([{"font-bold":c.value},"flex items-center group"]),onClick:v},[f(I,{to:`/item/${u(t).id}`,class:"mr-2"},{default:F(()=>[f(S,{class:"group-hover:stroke-purple"})]),_:1},8,["to"]),o("button",j,[L(d(i.count?`${i.count}шт`:"")+" "+d(u(t).name)+" ",1),o("span",q,d(u(t).level>1?`${u(t).level} lvl`:""),1),c.value?(s(),n("span",D," [ "+d(a.value?"-":"+")+" ] ",1)):$("",!0)])],2),c.value&&a.value?(s(),n("ul",K,[(s(!0),n(x,null,g((b=u(e))==null?void 0:b.parents,(w,N)=>(s(),h(k,{count:r(w.id),key:N,item:w},null,8,["count","item"]))),128))])):$("",!0)])}}},M={key:1,class:"flex w-full z-10 max-h-screen gap-4 h-full"},R={class:"w-1/3"},T=o("div",{class:"text-2xl px-4 border-purple text-purple rounded-md border w-fit mb-2"}," Базовые арты ",-1),G={class:"h-5/6 scrollbar-custom"},J={class:"w-1/3"},Q=o("div",{class:"text-2xl px-4 border-purple text-purple rounded-md border w-fit mb-2"},"Крафт",-1),U={class:"h-5/6 scrollbar-custom"},pe={__name:"ItemsPage",setup(i){const p=_(()=>y.entities.items),t=B(p.value),a=_(()=>t.value.filter(e=>{var r;return!((r=e==null?void 0:e.parents)!=null&&r.length)})),c=_(()=>t.value.filter(e=>{var r;return(r=e==null?void 0:e.parents)==null?void 0:r.length})),v=e=>t.value=e;return(e,r)=>p.value.length?(s(),n("main",M,[o("div",R,[T,o("ul",G,[(s(!0),n(x,null,g(a.value,l=>(s(),h(k,{key:l.id,item:l},null,8,["item"]))),128))])]),o("div",J,[Q,o("ul",U,[(s(!0),n(x,null,g(c.value,l=>(s(),h(k,{key:l.id,item:l},null,8,["item"]))),128))])]),f(V,{class:"w-1/3",onFilteredItems:r[0]||(r[0]=l=>v(l))})])):(s(),h(A,{key:0,class:"mt-20"}))}};export{pe as default};
