import{_ as f}from"./AppFilter.0f92214c.js";import{s as u}from"./store.79a7d66d.js";import y from"./QuestionIcon.63f87d0c.js";import{c as h,s as v,r as x,j as g,a as t,b as o,d as l,f as b,F as w,i as k,x as C,k as p,w as B,t as I,n as $}from"./index.e43175d8.js";import"./useGoblinState.6312a5ec.js";const F={class:"fixed inset-y-0 right-0 mx-auto -translate-y-full animate-topToBottom border-l border-second"},N={class:"relative z-10 my-1 ml-1 w-full animate-filter rounded-2xl border border-second bg-primary p-2 opacity-0"},S={class:"ml-1 h-[calc(100%-275px)] animate-opacity justify-between overflow-y-auto opacity-0 animation-delay-500"},V=["src"],j={class:"my-auto ml-2"},z={key:0,class:"w-full text-center"},q={__name:"AppSidebar",async setup(A){let i,c;const d=h(()=>u.entities.items);d.value.length||([i,c]=v(()=>u.setItems("items")),await i,c());const a=x(d.value),_=n=>{a.value=n.sort((s,r)=>s.src?r.src?s.src.localeCompare(r.src):-1:1)};return(n,s)=>{var m;const r=g("router-link");return t(),o("div",F,[l("div",N,[b(f,{onFilteredItems:s[0]||(s[0]=e=>_(e))})]),l("div",S,[(t(!0),o(w,null,k(a.value,e=>(t(),p(r,{key:e.id,to:"/item/"+e.id,class:$(["my-1 flex w-full rounded-2xl border border-second transition-all",n.$route.params.id===String(e.id)?"bg-second text-primary":"bg-primary text-second hover:bg-second hover:text-primary"])},{default:B(()=>[e.src?(t(),o("img",{key:0,src:`.${e.src}`,class:"h-16 w-16 rounded-l-2xl",alt:"img"},null,8,V)):(t(),p(y,{key:1,color:"purple",class:"mr-3 h-16 w-16 rounded-lg"})),l("div",j,I(e.name),1)]),_:2},1032,["to","class"]))),128)),(m=a.value)!=null&&m.length?C("",!0):(t(),o("div",z," \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0439 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E "))])])}}};export{q as default};
