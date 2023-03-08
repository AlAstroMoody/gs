import{_ as T}from"./AppItemsPopup.1a15c55a.js";import{a as m}from"./AppFilter.28e80375.js";import{s as p}from"./store.5d4543e1.js";import{u as C}from"./useGoblinState.a4140d24.js";import{c as j,s as B,r as G,o as n,a as r,b as s,F as N,i as V,f as t,t as a,e as d,d as i,v as M,l as $,T as A,n as D}from"./index.d8e717f9.js";import"./AppPopup.a1292ab0.js";import"./ExitIcon.24b80c55.js";import"./FilterIcon.7de512f1.js";import"./AppSidebar.3dd67011.js";import"./QuestionIcon.eb84e2b9.js";const F={class:"mb-96 flex flex-1 flex-col justify-between px-2"},L={class:"mb-10 flex flex-col"},P=s("div",{class:"headline my-8"},"\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",-1),z={class:"xl:flex"},E={class:"mb-2 flex flex-wrap md:mr-2 xl:flex-col"},I=["onClick"],q={key:0,class:"flex flex-col rounded-lg bg-second p-2 text-primary md:mr-5"},H={class:"flex"},J=["src"],K={class:"subtitle"},O={class:"lg:p-4"},Q={class:"flex flex-wrap items-center p-4 lg:my-4"},R=s("div",{class:"mr-4 text-xl"},"\u0430\u043F\u043D\u0443\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C:",-1),U={class:"w-80 xs:mx-4"},W=s("div",{class:"flex justify-between"},[s("span",null,"1"),i(),s("span",null,"200")],-1),X={class:"mt-6 flex w-full flex-wrap"},Y=s("span",{class:"mr-4 text-xl"},"\u0442\u043E\u0447\u043A\u0438:",-1),Z={class:"flex flex-1 flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap"},ss={class:"w-full sm:mr-8 md:mr-0 lg:mr-8 lg:w-1/2"},es=s("div",{class:"flex justify-between"},[s("span",null,"0"),i(),s("span",null,"85")],-1),ts={class:"w-full lg:w-1/2"},ls=s("div",{class:"flex justify-between"},[s("span",null,"0"),i(),s("span",null,"85")],-1),xs={__name:"GoblinsPage",async setup(os){let _,f;const u=j(()=>p.entities.goblins);u.value.length||([_,f]=B(()=>p.setItems("goblins")),await _,f());const{user:l,setGoblin:x,setLevel:b,changeAttack:v,changeDefense:g}=C(),w=e=>x(e),y=e=>b(Math.round(200*e)||1),o=G({attack:0,defense:0}),k=e=>{o.value.attack=Math.round(85*e)||0,v(o.value.attack)},S=e=>{o.value.defense=Math.round(85*e)||0,g(o.value.defense)};return(e,as)=>{var h;return n(),r("div",F,[s("div",L,[P,s("div",z,[s("div",E,[(n(!0),r(N,null,V(t(u),c=>(n(),r("div",{key:c.id,onClick:ns=>w(c),class:D(["w-fit rounded border px-4 py-2 font-medium lg:text-xl",c===t(l).goblin?"border-second ":"border-primary"])},a(c.name),11,I))),128))]),(h=t(l).goblin)!=null&&h.name?(n(),r("div",q,[s("div",H,[s("img",{src:t(l).goblin.src,alt:"img",class:"mr-4 h-24 w-24"},null,8,J),s("div",null,[s("div",K,a(t(l).goblin.name),1),s("div",null,"\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440: "+a(t(l).goblin.mainParam),1)])]),s("div",O,a(t(l).goblin.description),1),s("div",Q,[R,s("div",U,[W,d(m,{onThumbShift:y,custom:"bg-primary"})]),s("div",X,[Y,s("div",Z,[s("div",ss,[i(" \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0430\u0442\u0430\u043A\u0438: "+a(o.value.attack)+" ",1),es,d(m,{onThumbShift:k,custom:"bg-primary"})]),s("div",ts,[i(" \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0437\u0430\u0449\u0438\u0442\u044B: "+a(o.value.defense)+" ",1),ls,d(m,{onThumbShift:S,custom:"bg-primary"})])])])])])):M("",!0)])]),(n(),$(A,{to:"body"},[d(T,{class:"absolute top-12 right-2 block bg-second md:hidden"})]))])}}};export{xs as default};
