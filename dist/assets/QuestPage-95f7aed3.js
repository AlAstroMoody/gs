import{s as h,d as F,B as M}from"./index-9ca0f51e.js";import{o as z,e as _,r as D,v as Q,l as t,m as a,F as w,q as e,H as m,I as p,D as x,y as d,A as c,z as l,x as v}from"./@vue-5e60537e.js";import"./yandex-metrika-vue3-31715aa8.js";import"./@vueuse-6ebe5ee8.js";import"./vue-router-ee9931d1.js";import"./firebase-6ed2b05d.js";import"./@firebase-40ef63b3.js";import"./idb-81bdbf9b.js";import"./picocolors-7608e719.js";import"./tailwindcss-animation-delay-bb812693.js";import"./tailwindcss-f34f17cc.js";import"./tailwind-scrollbar-b75acc9f.js";import"./nouislider-b0ecb9ee.js";const A={class:"px-2"},E=e("div",{class:"pt-2 text-3xl xxl:text-4xl"},"Квесты",-1),H={key:0,class:"mt-8"},L={class:"flex w-full flex-col gap-4"},P={class:"text-xl"},R={class:"rounded bg-silver p-4 px-4 text-lg text-primary opacity-75"},S={key:0,class:"group mt-2"},T=e("button",{class:"text-2xl text-orange"},"+",-1),j={class:"grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]"},G={class:"overflow-hidden text-lg"},J={class:"p-4"},K={key:0},O=e("summary",{class:"text-orange"},"зелья восстановления здоровья",-1),U={class:"flex flex-wrap gap-2"},W={key:1},X=e("span",{class:"text-green"},"Великой кузнице",-1),Y=e("summary",{class:"text-orange"},"кучу крутых шмоток",-1),Z={class:"flex flex-wrap gap-2"},q={key:2},ee={key:3},te={key:4},se={key:5},oe=e("span",{class:"text-yellow"},"Ангельской кузне",-1),le=e("summary",{class:"text-orange"},"вот это барахло",-1),ae={class:"flex flex-wrap gap-2"},ne={key:6},ie=e("summary",{class:"text-orange"},"крутые рецепты",-1),re={class:"flex flex-wrap gap-2"},de=e("span",{class:"text-red"},"Демонической кузнице",-1),ce=e("summary",{class:"text-orange"},"еще более крутые арты",-1),_e={class:"flex flex-wrap gap-2"},ue={key:7},me={key:8},pe=e("summary",{class:"text-orange"},"куче рецептов",-1),ve={class:"flex flex-wrap gap-2"},xe={key:9},Me={__name:"QuestPage",setup(fe){z(async()=>await h.setQuests());const u=_(()=>h.entities.items),f=o=>{const n=u.value.find(r=>r.name===o);return`/item/${n==null?void 0:n.id}`},$=_(()=>u.value.filter(o=>o.craft==="Великая кузница").sort((o,n)=>o.level>n.level?1:-1)),B=_(()=>u.value.filter(o=>o.craft==="Ангельская кузница").sort((o,n)=>o.level>n.level?1:-1)),I=_(()=>u.value.filter(o=>o.craft==="Демоническая кузница").sort((o,n)=>o.level>n.level?1:-1)),b=_(()=>u.value.filter(o=>o.source==="Демон").sort((o,n)=>o.level>n.level?1:-1)),N=_(()=>u.value.filter(o=>o.source==="Драконье логово")),C=_(()=>u.value.filter(o=>[578,187,186,185,562].includes(o.id))),g=_(()=>h.entities.quests),y=D(null),V=()=>{y.value.open()};return(o,n)=>{var k;const r=Q("router-link");return t(),a("main",A,[E,(k=g.value)!=null&&k.length?w("",!0):(t(),a("div",H,"Куда-то потерялись :с")),e("div",L,[(t(!0),a(m,null,p(g.value,i=>(t(),a("div",{key:i.id,class:"p-2 last:mb-20"},[e("span",P,c(i.name),1),e("div",R,[e("div",null,c(i.description),1)]),i.help?(t(),a("div",S,[T,e("div",j,[e("div",G,[e("div",J,[i.id===3?(t(),a("div",K,[l(" Наконец нам пригодился медик, хотя нет, он по прежнему не нужен. Используем костры инженера, арты с регенерацией и "),e("details",null,[O,e("div",U,[(t(!0),a(m,null,p(C.value,s=>(t(),v(r,{key:s.id,to:`/item/${s.id}`,class:"text-green"},{default:d(()=>[l(c(s.name),1)]),_:2},1032,["to"]))),128))])])])):i.id===4?(t(),a("div",W,[l(" Страж Кузни опасный противник для новичков, но если одолеете, то сможете крафтить в "),X,e("details",null,[Y,e("div",Z,[(t(!0),a(m,null,p($.value,s=>(t(),v(r,{key:s.id,to:`/item/${s.id}`,class:"text-green"},{default:d(()=>[l(c(s.name),1)]),_:2},1032,["to"]))),128))])])])):i.id===5?(t(),a("div",q,[l(" Необходимо найти 3 таблички. Места возможного респауна на "),e("button",{onClick:n[0]||(n[0]=s=>V()),class:"text-green"},"карте"),l("(устаревшая инфа) ")])):i.id===10?(t(),a("div",ee,[l(" Собираем вот эту "),x(r,{to:f("Набор деталей"),class:"text-green"},{default:d(()=>[l(" хреновину ")]),_:1},8,["to"])])):i.id===12?(t(),a("div",te,[l(" Будим афкашеров, делаем "),x(r,{to:f("Серебряная пыль"),class:"text-green"},{default:d(()=>[l(" серебрянную пыль ")]),_:1},8,["to"]),l(" , или берем арты для поиска 9 невидимых бочек. ТИК-ТАК МАЗАФАКА! ")])):i.id===14?(t(),a("div",se,[l(" Этот чувак при выполнении квеста будет продавать книжки с картинками. А ещё у него можно скрафтить в "),oe,e("details",null,[le,e("div",ae,[(t(!0),a(m,null,p(B.value,s=>(t(),v(r,{key:s.id,to:`/item/${s.id}`,class:"text-green"},{default:d(()=>[l(c(s.name),1)]),_:2},1032,["to"]))),128))])])])):i.id===15?(t(),a("div",ne,[l(" Кому нужны книжки, завалите Ангела и сможете купить "),e("details",null,[ie,e("div",re,[(t(!0),a(m,null,p(b.value,s=>(t(),v(r,{key:s.id,to:`/item/${s.id}`,class:"text-green"},{default:d(()=>[l(c(s.name),1)]),_:2},1032,["to"]))),128))])]),l(" и скрафтить в "),de,e("details",null,[ce,e("div",_e,[(t(!0),a(m,null,p(I.value,s=>(t(),v(r,{key:s.id,to:`/item/${s.id}`,class:"text-green"},{default:d(()=>[l(c(s.name),1)]),_:2},1032,["to"]))),128))])])])):i.id===16?(t(),a("div",ue,[l(" Инженер ещё живой? Пусть крафтит "),x(r,{to:f("Голосовой модуль"),class:"text-green"},{default:d(()=>[l(" голосовой модуль ")]),_:1},8,["to"])])):i.id===19?(t(),a("div",me,[l(" Хм, вы убили одного слабенького дракона? Попробуйте убить сильного! А в награду получите доступ к "),e("details",null,[pe,e("div",ve,[(t(!0),a(m,null,p(N.value,s=>(t(),v(r,{key:s.id,to:`/item/${s.id}`,class:"text-green"},{default:d(()=>[l(c(s.name),1)]),_:2},1032,["to"]))),128))])]),l(" Внимание! Стоимость рецептов от полумиллиона гоблинских тугриков ")])):(t(),a("div",xe,c(i.help),1))])])])])):w("",!0)]))),128))]),x(F,{ref_key:"modal",ref:y},{default:d(()=>[x(M,{class:"absolute inset-0 z-10 flex w-fit flex-col gap-2 rounded m-auto"})]),_:1},512)])}}};export{Me as default};