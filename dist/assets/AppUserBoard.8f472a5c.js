import{c as v,r as h,u as D,G as M,j as I,a,b as i,d as e,n as F,y as n,t as c,f as _,F as b,i as x,x as w,e as m,H as G,K as T,k as E,l as H,A as K,L as U}from"./index.4b806c45.js";import{u as q}from"./useGoblinState.0ba39767.js";import J from"./CollapseIcon.4575b5de.js";import O from"./ExitIcon.f65ebc1d.js";import Q from"./QuestionIcon.e9756dcf.js";import"./plugin-vue_export-helper.21dcd24c.js";var R="/gs/images/slot.png";const W={key:1,class:"inset-x-0 z-10 h-[calc(100%-64px)] w-full border-b-0 border-silver bg-gray px-2 md:h-fit md:w-fit md:rounded-t-2xl md:border xl:px-6"},X={class:"mb-2 flex justify-center"},Y={class:"overflow-hidden"},Z=["src"],ee={class:"ml-4 w-3/4"},te=e("div",{class:"subtitle mx-auto"},'\u041A\u0440\u044F\u0433\u0437 "\u042F\u0434\u0440\u043E"',-1),le={class:"flex justify-between"},se={class:"mr-auto w-56 rounded-lg border border-second p-1 text-center"},ae={class:"mb-2 flex flex-wrap items-center justify-center"},oe={class:"flex h-fit w-full flex-col flex-wrap md:w-fit md:max-w-[132px]"},ie={class:"m-auto flex w-52 flex-wrap gap-1 md:w-full md:gap-0"},ne=["onMouseenter"],re={key:0,class:"absolute right-0 top-0 z-10 rounded-full border border-double border-white"},ue=["src"],ce={key:2,class:"flex h-16 w-16 bg-silver"},de={class:"mt-1 flex-1 border-r-2 pl-1 pr-4 xl:px-6"},ve=e("span",{class:"border-b-2"},[e("span",null,[m("\u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 "),e("br"),m("\u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B:")])],-1),me={class:"ml-1"},pe={class:"pl-2 pr-1 xl:px-6"},fe=e("span",{class:"border-b-2"},[e("span",null,[m(" \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 "),e("br")]),e("span",null,"\u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B:")],-1),he={class:"ml-1"},Ce={__name:"AppUserBoard",setup(ge){const{user:s,itemsStats:t,removeItem:j}=q(),z=v(()=>{let o=0;switch(s.goblin.mainParam){case"\u0421\u0438\u043B\u0430":o=s.goblin.stats.strength+t.value.strength;break;case"\u041B\u043E\u0432\u043A\u043E\u0441\u0442\u044C":o=s.goblin.stats.agility+t.value.agility;break;default:o=s.goblin.stats.intelligence+t.value.intelligence;break}return t.value.attack+o}),B=v(()=>t?Math.floor(1+t.value.defence+(s.goblin.stats.agility+t.value.agility)/3):0),P=v(()=>t.value.strength*20+t.value.hp),L=v(()=>t.value.intelligence*15+t.value.mp),d=h({}),g=h(!1),y=(o,u)=>{g.value=!!o,o&&(d.value=o,d.value.index=u)},N=v(()=>[{title:"hp:",value:P},{title:"mp:",value:L},{title:"\u0441\u0438\u043B\u0430:",value:t.value.strength},{title:"\u043B\u043E\u0432\u043A\u043E\u0441\u0442\u044C:",value:t.value.agility},{title:"\u0440\u0430\u0437\u0443\u043C:",value:t.value.intelligence},{title:"\u0443\u0440\u043E\u043D:",value:z.value+s.attackPoints*100},{title:"\u0437\u0430\u0449\u0438\u0442\u0430:",value:B.value+s.defencePoints*3}]),V=v(()=>[{title:"\u0443\u0434\u0430\u0447\u0430:",value:t.value.luck||0},{title:"\u043C\u0430\u0433. \u0440\u0435\u0437\u0438\u0441\u0442:",value:`${t.value.resist||0}%`},{title:"c\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0431\u0435\u0433\u0430:",value:(t.value.ms||0)+s.goblin.stats_increase.ms},{title:"c\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0430\u0442\u0430\u043A\u0438:",value:t.value.as>=500?"max":`${t.value.as||0}%`},{title:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F hp:",value:`${t.value.hp_regeneration+Math.floor(t.value.strength/100)||0}/\u0441\u0435\u043A`},{title:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F mp:",value:`${t.value.mp_regeneration+Math.floor(t.value.intelligence/100)||0}%`}]),r=h(!0),{width:k}=D();M(k,()=>{["xxs","xs","sm"].includes(k.value)&&(r.value=!1)});const p=h(null);return M(()=>s,async()=>{!r.value&&p.value&&(p.value.classList.add("animate-ping"),await U(600),p.value.classList.remove("animate-ping"))},{deep:!0}),r.value=!1,(o,u)=>{var $;const A=I("router-link");return r.value?n(s).goblin?(a(),i("div",W,[e("div",X,[e("div",Y,[e("img",{src:`.${($=n(s).goblin)==null?void 0:$.src}`,alt:"logo",class:"h-16 w-16"},null,8,Z)]),e("div",ee,[te,e("div",le,[e("div",se," \u0423\u0440\u043E\u0432\u0435\u043D\u044C "+c(n(s).level)+", "+c(n(s).goblin.name),1),_(J,{onClick:u[1]||(u[1]=l=>r.value=!r.value)})])])]),e("div",ae,[e("div",oe,[e("div",ie,[(a(),i(b,null,x(6,l=>{var C,S;return e("div",{key:l,class:"relative m-one h-16 w-16 border-second bg-slot",onMouseenter:f=>y(n(s).inventory[l-1],l),onMouseleave:u[2]||(u[2]=f=>y({}))},[G(e("div",{class:"absolute -top-12 whitespace-nowrap rounded-md border border-primary bg-silver p-2 text-primary"},c(d.value.name),513),[[T,g.value&&((C=d.value)==null?void 0:C.name)&&((S=d.value)==null?void 0:S.index)===l]]),n(s).inventory[l-1]?(a(),E(A,{key:0,to:`/item/${n(s).inventory[l-1].id}`},{default:H(()=>{var f;return[g.value&&((f=d.value)==null?void 0:f.index)===l?(a(),i("button",re,[_(O,{onClick:K(_e=>n(j)(l),["prevent"]),width:30,height:30,color:"white",class:"duration-500 hover:rotate-90"},null,8,["onClick"])])):w("",!0),n(s).inventory[l-1].src?(a(),i("img",{key:1,src:`.${n(s).inventory[l-1].src}`,alt:"img"},null,8,ue)):(a(),i("div",ce,[_(Q,{class:"m-auto"})]))]}),_:2},1032,["to"])):w("",!0)],40,ne)}),64))])]),e("div",de,[ve,(a(!0),i(b,null,x(N.value,l=>(a(),i("div",{class:"flex justify-between",key:l.title},[m(c(l.title)+" ",1),e("span",me,c(l.value),1)]))),128))]),e("div",pe,[fe,(a(!0),i(b,null,x(V.value,l=>(a(),i("div",{class:"flex justify-between",key:l.title},[m(c(l.title)+" ",1),e("span",he,c(l.value),1)]))),128))])])])):w("",!0):(a(),i("div",{key:0,class:F(["right-2 h-16 w-16 md:left-2 md:right-auto lg:bottom-2 lg:top-auto",o.$route.name!=="item"?"top-2 md:top-20":"bottom-2 top-auto"])},[e("button",null,[e("img",{class:"relative z-10",src:R,alt:"logo",onClick:u[0]||(u[0]=l=>r.value=!r.value)}),e("span",{class:"z-0 absolute left-0 top-0 inline-flex w-full rounded-full bg-silver bg-gradient-to-r from-purple opacity-75 lg:h-full",ref_key:"collapse",ref:p},null,512)])],2))}}};export{Ce as default};
