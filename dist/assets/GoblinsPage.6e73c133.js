import{_ as C}from"./AppItemsPopup.0f5f8525.js";import{a as f}from"./AppFilter.fd875479.js";import{u as G}from"./useGoblinState.4da59105.js";import{u as j}from"./useState.a0b3ddfa.js";import{_ as B}from"./plugin-vue_export-helper.21dcd24c.js";import{w as I,r as M,o as n,a as m,b as e,F as N,i as P,f as s,t as l,e as _,d as c,y as V,k as L,T as $,L as A,M as D,n as F}from"./index.ad3f03e2.js";import"./AppPopup.f3dfdf2c.js";import"./ExitIcon.147d39ec.js";import"./FilterIcon.4fee562d.js";import"./AppSidebar.bedfcaa0.js";import"./QuestionIcon.98a702ca.js";const i=r=>(A("data-v-de478520"),r=r(),D(),r),z={class:"mb-96 flex flex-1 flex-col justify-between px-2"},E={class:"mb-10 flex flex-col"},q=i(()=>e("div",{class:"headline mb-8"},"\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",-1)),H={class:"xl:flex"},J={class:"mb-2 flex flex-wrap md:mr-2 xl:flex-col"},K=["onClick"],O={key:0,class:"flex flex-col rounded-lg bg-second p-2 text-primary md:mr-5"},Q={class:"flex"},R=["src"],U={class:"subtitle"},W={class:"lg:p-4"},X={class:"flex flex-wrap items-center p-4 lg:my-4"},Y=i(()=>e("div",{class:"mr-4 text-xl"},"\u0430\u043F\u043D\u0443\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C:",-1)),Z={class:"w-80 xs:mx-4"},ee=i(()=>e("div",{class:"flex justify-between"},[e("span",null,"1"),c(),e("span",null,"200")],-1)),te={class:"mt-6 flex w-full flex-wrap"},se=i(()=>e("span",{class:"mr-4 text-xl"},"\u0442\u043E\u0447\u043A\u0438:",-1)),oe={class:"flex w-80 flex-wrap xs:flex-nowrap"},ae={class:"w-full xs:mr-8 xs:w-1/2"},le=i(()=>e("div",{class:"flex justify-between"},[e("span",null,"0"),c(),e("span",null,"85")],-1)),ie={class:"w-full xs:w-1/2"},ne=i(()=>e("div",{class:"flex justify-between"},[e("span",null,"0"),c(),e("span",null,"85")],-1)),ce={__name:"GoblinsPage",async setup(r){let d,h;const{entities:x}=([d,h]=I(()=>j({entity:"goblins"})),d=await d,h(),d),{user:o,setGoblin:b,setLevel:g,changeAttack:v,changeDefense:y}=G(),w=t=>b(t),k=t=>g(Math.round(200*t)||1),a=M({attack:0,defense:0}),S=t=>{a.value.attack=Math.round(85*t)||0,v(a.value.attack)},T=t=>{a.value.defense=Math.round(85*t)||0,y(a.value.defense)};return(t,re)=>{var u;return n(),m("div",z,[e("div",E,[q,e("div",H,[e("div",J,[(n(!0),m(N,null,P(s(x),p=>(n(),m("div",{key:p.id,onClick:de=>w(p),class:F(["w-fit rounded px-4 py-2 font-medium lg:text-xl",{"border border-second ":p===s(o).goblin}])},l(p.name),11,K))),128))]),(u=s(o).goblin)!=null&&u.name?(n(),m("div",O,[e("div",Q,[e("img",{src:s(o).goblin.src,alt:"img",class:"mr-4 h-32 w-32"},null,8,R),e("div",null,[e("div",U,l(s(o).goblin.name),1),e("div",null,"\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440: "+l(s(o).goblin.mainParam),1)])]),e("div",W,l(s(o).goblin.description),1),e("div",X,[Y,e("div",Z,[ee,_(f,{onThumbShift:k,custom:"bg-primary"})]),e("div",te,[se,e("div",oe,[e("div",ae,[c(" \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0430\u0442\u0430\u043A\u0438: "+l(a.value.attack)+" ",1),le,_(f,{onThumbShift:S,custom:"bg-primary"})]),e("div",ie,[c(" \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0437\u0430\u0449\u0438\u0442\u044B: "+l(a.value.defense)+" ",1),ne,_(f,{onThumbShift:T,custom:"bg-primary"})])])])])])):V("",!0)])]),(n(),L($,{to:"body"},[_(C,{class:"absolute top-12 right-2 block bg-second md:hidden"})]))])}}};var we=B(ce,[["__scopeId","data-v-de478520"]]);export{we as default};
