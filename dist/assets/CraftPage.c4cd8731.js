import{C as P,r as x,c as k,j as S,o as s,a as c,b as d,e as p,w as I,f as i,d as T,t as h,v as w,n as z,F as B,i as F,l as g,s as A,u as L,T as $,x as M}from"./index.d8e717f9.js";import{s as C}from"./store.5d4543e1.js";import O from"./LoupeIcon.a25bfd99.js";import{_ as N}from"./AppFilter.28e80375.js";import{_ as D}from"./AppPopup.a1292ab0.js";import E from"./FilterIcon.7de512f1.js";import"./useGoblinState.a4140d24.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./ExitIcon.24b80c55.js";const H={key:0,class:"text-orange-300"},K={key:0,class:"pl-3"},V={__name:"AppCraftItem",props:{item:{default:()=>{},type:Object},count:{type:Number,default:0}},setup(m){var v;const f=m,{item:u}=P(f),n=x(!1),r=k(()=>{var a;return!!((a=t==null?void 0:t.parents)!=null&&a.length)}),_=()=>{r.value&&(n.value=!n.value)},t=C.currentItem("items",((v=u.value)==null?void 0:v.id)||0),y=a=>t!=null&&t.count?Number(t.count[a]):0;return(a,b)=>{var e;const o=S("router-link");return s(),c("ol",null,[d("div",{class:z([{"font-bold":i(r)},"flex items-center"]),onClick:_},[p(o,{to:`/item/${i(u).id}`,class:"mr-2"},{default:I(()=>[p(O)]),_:1},8,["to"]),T(" "+h(m.count?`${m.count}\u0448\u0442`:"")+" "+h(i(u).name)+" ",1),i(r)?(s(),c("span",H," [ "+h(n.value?"-":"+")+" ] ",1)):w("",!0)],2),i(r)&&n.value?(s(),c("ul",K,[(s(!0),c(B,null,F((e=i(t))==null?void 0:e.parents,(l,j)=>(s(),g(V,{count:y(l.id),key:j,item:l},null,8,["count","item"]))),128))])):w("",!0)])}}},R={class:"flex w-full justify-between px-2 pt-4 pb-20"},W={class:"opacity-1 fixed right-8 top-8 rounded border border-silver bg-gray p-4"},q={class:"opacity-1 fixed right-4 top-4 rounded border border-silver bg-gray p-2"},G={class:"opacity-1 fixed right-4 top-8 rounded-lg border border-silver bg-gray p-4"},oe={__name:"CraftPage",async setup(m){let f,u;const n=k(()=>C.entities.items);n.value.length||([f,u]=A(()=>C.setItems("items")),await f,u());const r=x(n.value),_=b=>r.value=b,t=x(null),y=()=>t.value.open(),{width:v}=L(),a=k(()=>["xxs","xs","sm"].includes(v.value));return(b,o)=>(s(),c("main",R,[d("ul",null,[(s(!0),c(B,null,F(r.value.filter(e=>{var l;return(l=e==null?void 0:e.parents)==null?void 0:l.length}).sort((e,l)=>e.level-l.level),e=>(s(),g(V,{item:e,key:e.id},null,8,["item"]))),128))]),i(a)?(s(),g($,{key:1,to:"body"},[d("div",q,[p(E,{color:"silver",onClick:y,width:40,height:40}),p(D,{ref_key:"popup",ref:t,onWheel:o[2]||(o[2]=M(()=>{},["stop"]))},{default:I(()=>[d("div",G,[p(N,{onFilteredItems:o[1]||(o[1]=e=>_(e))})])]),_:1},512)])])):(s(),g($,{key:0,to:"body"},[d("div",W,[p(N,{onFilteredItems:o[0]||(o[0]=e=>_(e))})])]))]))}};export{oe as default};