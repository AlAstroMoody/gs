import{M as G,r as c,c as B,j as V,a as o,b as p,d as v,f as a,w as E,v as m,e as j,t as w,x as F,n as A,F as O,i as S,k as _,s as M,o as P,u as z,O as D,T as $}from"./index.e43175d8.js";import{g as H}from"./index.af050076.js";import{s as N}from"./store.79a7d66d.js";import K from"./LoupeIcon.e39fcbe5.js";import{_ as I}from"./AppFilter.0f92214c.js";import{_ as R}from"./AppPopup.8332f41f.js";import{e as L,o as W,b as q,c as J}from"./transitions.4bf612d5.js";import Q from"./FilterIcon.7af439af.js";import"./useGoblinState.6312a5ec.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./ExitIcon.3165ef9b.js";const U={key:0,class:"text-orange-300"},X={key:0,class:"pl-3"},T={__name:"AppCraftItem",props:{item:{default:()=>{},type:Object},count:{type:Number,default:0}},setup(g){var i;const b=g,{item:l}=G(b),r=c(!1),n=B(()=>{var s;return!!((s=t==null?void 0:t.parents)!=null&&s.length)}),y=()=>{n.value&&(r.value=!r.value)},t=N.currentItem("items",((i=l.value)==null?void 0:i.id)||0),h=s=>t!=null&&t.count?Number(t.count[s]):0;return(s,x)=>{var f;const C=V("router-link");return o(),p("ol",null,[v("div",{class:A([{"font-bold":n.value},"flex items-center"]),onClick:y},[a(C,{to:`/item/${m(l).id}`,class:"mr-2"},{default:E(()=>[a(K)]),_:1},8,["to"]),j(" "+w(g.count?`${g.count}\u0448\u0442`:"")+" "+w(m(l).name)+" ",1),n.value?(o(),p("span",U," [ "+w(r.value?"-":"+")+" ] ",1)):F("",!0)],2),n.value&&r.value?(o(),p("ul",X,[(o(!0),p(O,null,S((f=m(t))==null?void 0:f.parents,(d,u)=>(o(),_(T,{count:h(d.id),key:u,item:d},null,8,["count","item"]))),128))])):F("",!0)])}}},Y={class:"flex w-full justify-between px-2 pb-20 pt-4"},Z={class:"opacity-1 fixed right-4 top-8 rounded-lg border border-silver bg-gray p-4"},pe={__name:"CraftPage",async setup(g){let b,l;const r=B(()=>N.entities.items);r.value.length||([b,l]=M(()=>N.setItems("items")),await b,l());const n=c(r.value),y=d=>n.value=d,t=c(null),h=()=>t.value.open(),i=c(null),s=c(null),x=c(null);P(()=>{i.value&&L({el:i.value,transformOrigin:"right bottom"}),s.value&&L({el:s.value,transformOrigin:"right bottom"}),H.from(x.value,{duration:1,x:-200,autoAlpha:0,ease:"back.out(1)"})});const{width:C}=z(),f=B(()=>["xxs","xs","sm"].includes(C.value));return(d,u)=>(o(),p("main",Y,[v("ul",{ref_key:"list",ref:x},[a(D,{tag:"ol",css:!1,onBeforeEnter:m(W),onEnter:m(q),onLeave:m(J)},{default:E(()=>[(o(!0),p(O,null,S(n.value.filter(e=>{var k;return(k=e==null?void 0:e.parents)==null?void 0:k.length}).sort((e,k)=>e.level-k.level),e=>(o(),_(T,{item:e,key:e.id},null,8,["item"]))),128))]),_:1},8,["onBeforeEnter","onEnter","onLeave"])],512),f.value?(o(),_($,{key:1,to:"body"},[v("div",{ref_key:"mobileFilter",ref:s,class:"opacity-1 fixed right-4 top-4 rounded border border-silver bg-gray p-2"},[a(Q,{color:"silver",onClick:h,width:40,height:40})],512)])):(o(),_($,{key:0,to:"body"},[v("div",{ref_key:"filter",ref:i,class:"opacity-1 fixed right-8 top-8 rounded border border-silver bg-gray p-4"},[a(I,{onFilteredItems:u[0]||(u[0]=e=>y(e))})],512)])),f.value?(o(),_($,{key:2,to:"body"},[a(R,{ref_key:"popup",ref:t},{default:E(()=>[v("div",Z,[a(I,{onFilteredItems:u[1]||(u[1]=e=>y(e))})])]),_:1},512)])):F("",!0)]))}};export{pe as default};