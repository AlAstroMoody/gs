import{u as f}from"./vue-router-4f9fcc4b.js";import{_ as h}from"./BaseButton-c50d771c.js";import{a as x,s as y}from"./index-9c72a268.js";import{e as g,r as k,o as G,w as S,l as o,m as a,q as l,A as n,F as w,G as B,I as i,E as C,t as L}from"./@vue-d43bc838.js";import"./yandex-metrika-vue3-31715aa8.js";import"./@vueuse-c6097c79.js";import"./picocolors-7608e719.js";import"./tailwindcss-animation-delay-bb812693.js";import"./tailwindcss-f34f17cc.js";import"./tailwind-scrollbar-b75acc9f.js";import"./firebase-6ed2b05d.js";import"./@firebase-40ef63b3.js";import"./idb-81bdbf9b.js";import"./nouislider-b0ecb9ee.js";const M={key:0,class:"flex h-full gap-4"},N={class:"w-1/3 animate-leftToRight rounded-r-xl border border-l-0 border-second p-4 text-2xl h-fit"},T={class:"mx-auto w-2/3 mt-20"},V={class:"flex gap-2"},$={key:0,class:"rounded-r-xl border border-second p-4 mb-2 bg-primary"},E=["innerHTML"],F={key:0,class:"text-green"},H={key:1,class:"text-purple"},R={key:2,class:"text-red"},ee={__name:"GoblinPage",setup(q){const{setGoblin:p}=x(),v=f(),t=g(()=>y.entities.goblins.find(s=>s.id===+v.params.id)),e=k({});G(()=>d()),S(t,()=>d());const d=()=>{var s,c;t.value&&(p(t.value),(s=t.value)!=null&&s.abilities&&(e.value=(c=t.value)==null?void 0:c.abilities[0]))},_=s=>`animation-delay: ${s/8+.1}s`;return(s,c)=>{var u;return t.value?(o(),a("main",M,[l("div",N,n(t.value.description),1),l("div",T,[l("div",V,[(o(!0),a(w,null,B(t.value.abilities,(r,b)=>{var m;return o(),a("div",{key:r,class:"mb-2"},[C(h,{onClick:z=>e.value=r,style:L(_(b)),class:"flex items-center gap-2 animate-skill",text:r.name,border:((m=e.value)==null?void 0:m.id)===r.id?"purple":""},null,8,["onClick","style","text","border"])])}),128))]),(u=e.value)!=null&&u.description?(o(),a("div",$,[l("div",{innerHTML:e.value.description},null,8,E),e.value.cd?(o(),a("div",F,"кд: "+n(e.value.cd)+" сек",1)):i("",!0),e.value.dur?(o(),a("div",H," длительность: "+n(e.value.dur)+" сек ",1)):i("",!0),e.value.mc?(o(),a("div",R,"манакост: "+n(e.value.mc)+" маны",1)):i("",!0)])):i("",!0)])])):i("",!0)}}};export{ee as default};
