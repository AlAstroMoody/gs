import{x as B,w as N,c as x,j as V,f as e,o as t,a as s,b as a,t as r,k as f,d as c,F as _,i as m,y as d,e as u,T as $,l as g}from"./index.ad3f03e2.js";import{_ as I}from"./AppItemsPopup.0f5f8525.js";import{u as L}from"./useGoblinState.4da59105.js";import{u as S}from"./useState.a0b3ddfa.js";import F from"./QuestionIcon.98a702ca.js";import"./AppPopup.f3dfdf2c.js";import"./ExitIcon.147d39ec.js";import"./FilterIcon.4fee562d.js";import"./AppSidebar.bedfcaa0.js";import"./AppFilter.fd875479.js";const p={strength:"\u0441\u0438\u043B\u0430",agility:"\u043B\u043E\u0432\u043A\u043E\u0441\u0442\u044C",intelligence:"\u0440\u0430\u0437\u0443\u043C",attack:"\u0443\u0440\u043E\u043D",defence:"\u0437\u0430\u0449\u0438\u0442\u0430",visibility:"\u043E\u0431\u0437\u043E\u0440",luck:"\u0443\u0434\u0430\u0447\u0430",hp:"\u0425\u041F",mp:"\u041C\u041F",resist:"\u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u0430\u0433\u0438\u0438",hp_regeneration:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F",mp_regeneration:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043C\u0430\u043D\u044B",stealth_detection:"\u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E\u043A",as:"\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0430\u0442\u0430\u043A\u0438",ms:"\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0431\u0435\u0433\u0430",manaburn:"\u043A\u0430\u0436\u0434\u044B\u0439 \u0443\u0434\u0430\u0440 \u0441\u0436\u0438\u0433\u0430\u0435\u0442",evade:"\u0443\u043A\u043B\u043E\u043D\u0435\u043D\u0438\u0435",aura:"\u0430\u0443\u0440\u0430",active:"\u0430\u043A\u0442\u0438\u0432",distant_resist:"\u0441\u043D\u0438\u0436\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u043D\u0430 \u043E\u0442 \u0434\u0430\u043B\u044C\u043D\u0435\u0433\u043E \u0431\u043E\u044F"},H={key:0},M={key:1,class:"mx-4 mb-96 flex flex-1 flex-col justify-between"},P={class:"headline mt-6"},A={class:"mt-10 mb-4 flex flex-wrap items-center"},D={class:"flex w-full xs:w-auto"},E=["src"],G={class:"ml-4 flex flex-col content-center justify-center"},O={key:0},R={key:1},q={key:2},z={class:"text-lg text-red"},J={key:3},K={class:"text-md ml-2 flex h-fit flex-1 justify-end whitespace-nowrap text-second"},Q=["innerHTML"],U={key:0,class:"my-2"},W={key:0},X={key:0},Y={key:1},Z={key:2},ee={key:1,class:"border-bg-silver rounded-lg border p-2"},te={class:"text-red hover:border-b"},se={key:0},oe={key:1},ne={key:2,class:"my-2 rounded-lg border border-silver p-2"},re={class:"text-red hover:border-b"},ae={key:0},ie={key:1},fe={__name:"ItemPage",async setup(de){let l,h;const{user:y,addItem:k}=L(),w=B(),{currentItem:o}=([l,h]=N(()=>S({id:w.params.id,entity:"items"})),l=await l,h(),l),j=x(()=>y.inventory.length<6?"\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C":"\u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C \u043F\u0435\u0440\u0435\u043F\u043E\u043B\u043D\u0435\u043D"),C=()=>{y.inventory.length<6&&k(o.value)},T=x(()=>o.value.goblins.map(b=>b.attributes.name).join(", "));return(b,le)=>{const v=V("router-link");return e(o)?(t(),s("div",M,[a("div",null,[a("div",P,r(e(o).name),1),a("div",A,[a("div",D,[e(o).src?(t(),s("img",{key:0,src:e(o).src,alt:"logo",class:"h-24 w-24"},null,8,E)):(t(),f(F,{key:1,color:"red"})),a("div",G,[e(o).level?(t(),s("div",O," \u0442\u0440\u0435\u0431\u0443\u0435\u043C\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C: "+r(e(o).level),1)):(t(),s("div",R,"\u041D\u0435\u0442 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0443\u0440\u043E\u0432\u043D\u044E")),e(o).goblins.length?(t(),s("div",q,[c(" \u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043A\u043B\u0430\u0441\u0441\u0430: "),a("span",z,r(e(T)),1)])):(t(),s("div",J,"\u041F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043A\u043B\u0430\u0441\u0441\u043E\u0432"))])]),a("div",K,[a("button",{class:"rounded-2xl border border-solid border-second px-2 py-4 ease-out hover:border-red hover:text-red",onClick:C},r(e(j)),1)])]),a("div",{class:"body my-2",innerHTML:e(o).description},null,8,Q),e(o).params?(t(),s("ul",U,[c(" \u0411\u043E\u043D\u0443\u0441\u044B \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430: "),(t(!0),s(_,null,m(Object.keys(e(o).params),(n,i)=>(t(),s("li",{key:i,class:"ml-7"},[e(o).params[n]&&e(p)[n]?(t(),s("div",W,[n==="manaburn"?(t(),s("span",X,r(e(p)[n])+" "+r(e(o).params[n])+" \u043C\u0430\u043D\u044B \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0443 ",1)):(t(),s("span",Y,r(e(p)[n])+": "+r(e(o).params[n]),1)),["as","mp_regeneration","resist","distant_resist"].includes(n)?(t(),s("span",Z," % ")):d("",!0)])):d("",!0)]))),128))])):d("",!0),e(o).children.length?(t(),s("div",ee,[c(' \u0418\u0437 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 "'+r(e(o).name)+'" \u043C\u043E\u0436\u043D\u043E \u0441\u043A\u0440\u0430\u0444\u0442\u0438\u0442\u044C: ',1),(t(!0),s(_,null,m(e(o).children,(n,i)=>(t(),s("span",{class:"text-md text-end",key:n.id},[u(v,{to:`/item/${n.id}`},{default:g(()=>[a("span",te,r(n.name),1),i!==e(o).children.length-1?(t(),s("span",se,", ")):(t(),s("span",oe,"; "))]),_:2},1032,["to"])]))),128))])):d("",!0),e(o).parents.length?(t(),s("div",ne,[c(' \u041F\u0440\u0435\u0434\u043C\u0435\u0442 "'+r(e(o).name)+'" \u043A\u0440\u0430\u0444\u0442\u0438\u0442\u0441\u044F \u0438\u0437: ',1),(t(!0),s(_,null,m(e(o).parents,(n,i)=>(t(),s("span",{class:"text-md text-end",key:n.id},[u(v,{to:`/item/${n.id}`},{default:g(()=>[a("span",re,r(n.name),1),i!==e(o).parents.length-1?(t(),s("span",ae,", ")):(t(),s("span",ie,"; "))]),_:2},1032,["to"])]))),128))])):d("",!0)]),(t(),f($,{to:"body"},[u(I,{class:"absolute top-12 right-2 block bg-second md:hidden"})]))])):(t(),s("div",H,"\u0422\u0430\u043A\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u043D\u0435\u0442"))}}};export{fe as default};
