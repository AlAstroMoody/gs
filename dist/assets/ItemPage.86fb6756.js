import{v as V,c as $,r as L,o as M,j as F,a as t,b as s,d as n,t as a,k as j,e as r,x as l,f as d,l as m,F as v,i as h,T as H,y as p}from"./index.4b806c45.js";import{_ as P}from"./AppItemsPopup.2313c480.js";import{s as S}from"./store.14acc1fd.js";import{a as D}from"./transitions.b795eee3.js";import{u as E}from"./useGoblinState.0ba39767.js";import G from"./QuestionIcon.e9756dcf.js";import"./AppPopup.8bddf903.js";import"./ExitIcon.f65ebc1d.js";import"./FilterIcon.ba173b6a.js";import"./AppSidebar.17c3806d.js";import"./AppFilter.e7832208.js";import"./index.af050076.js";const f={strength:"\u0441\u0438\u043B\u0430",agility:"\u043B\u043E\u0432\u043A\u043E\u0441\u0442\u044C",intelligence:"\u0440\u0430\u0437\u0443\u043C",attack:"\u0443\u0440\u043E\u043D",defence:"\u0437\u0430\u0449\u0438\u0442\u0430",visibility:"\u043E\u0431\u0437\u043E\u0440",luck:"\u0443\u0434\u0430\u0447\u0430",hp:"\u0425\u041F",mp:"\u041C\u041F",resist:"\u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u0430\u0433\u0438\u0438",hp_regeneration:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F",mp_regeneration:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043C\u0430\u043D\u044B",stealth_detection:"\u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E\u043A",as:"\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0430\u0442\u0430\u043A\u0438",ms:"\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0431\u0435\u0433\u0430",manaburn:"\u043A\u0430\u0436\u0434\u044B\u0439 \u0443\u0434\u0430\u0440 \u0441\u0436\u0438\u0433\u0430\u0435\u0442",evade:"\u0443\u043A\u043B\u043E\u043D\u0435\u043D\u0438\u0435",aura:"\u0430\u0443\u0440\u0430",active:"\u0430\u043A\u0442\u0438\u0432",distant_resist:"\u0441\u043D\u0438\u0436\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u043D\u0430 \u043E\u0442 \u0434\u0430\u043B\u044C\u043D\u0435\u0433\u043E \u0431\u043E\u044F"},O={key:0},R={key:1,class:"mx-4 mb-96 flex flex-1 flex-col justify-between"},q={class:"headline mt-6"},z={class:"mb-4 mt-10 flex flex-wrap items-center"},A={class:"flex w-full flex-wrap items-center xs:w-auto"},J=["src"],K={class:"text-md ml-2 flex h-fit flex-1 justify-end whitespace-nowrap text-second"},Q={class:"ml-4 flex flex-col content-center justify-center"},U={key:0},W={key:1},X={key:2},Y={class:"text-lg text-red"},Z={key:3},ee={key:4},te={class:"text-red"},se={key:5},oe=["innerHTML"],ae={key:0,class:"my-2"},ne={key:0},re={key:0},le={key:1},ie={key:2},de={key:1,class:"border-bg-silver rounded-lg border p-2"},ce={class:"text-red hover:border-b"},ue={key:0},_e={key:1},me={key:2,class:"my-2 rounded-lg border border-silver p-2"},ve={class:"text-red hover:border-b"},he={key:0},pe={key:1},Ne={__name:"ItemPage",setup(fe){const{user:x,addItem:C}=E(),T=V(),e=$(()=>S.currentItem("items",T.params.id)),B=$(()=>x.inventory.length<6?"\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C":"\u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C \u043F\u0435\u0440\u0435\u043F\u043E\u043B\u043D\u0435\u043D"),I=()=>{x.inventory.length<6&&C(e.value)},N=c=>{var u;return((u=e.value)==null?void 0:u.count)&&e.value.count[c]?`${e.value.count[c]}\u0448\u0442`:""},b=L(null);return M(()=>D([b])),(c,u)=>{var y,k,g,w;const _=F("router-link");return e.value?(t(),s("div",R,[n("div",{ref_key:"content",ref:b},[n("div",q,a(e.value.name),1),n("div",z,[n("div",A,[e.value.src?(t(),s("img",{key:0,src:`.${e.value.src}`,alt:"logo",class:"h-24 w-24"},null,8,J)):(t(),j(G,{key:1,color:"red"})),n("div",K,[n("button",{class:"mr-auto rounded-2xl border border-solid border-second px-2 py-4 ease-out hover:border-red hover:text-red",onClick:I},a(B.value),1)]),n("div",Q,[e.value.level?(t(),s("div",U," \u0442\u0440\u0435\u0431\u0443\u0435\u043C\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C: "+a(e.value.level),1)):(t(),s("div",W,"\u041D\u0435\u0442 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0443\u0440\u043E\u0432\u043D\u044E")),(y=e.value.goblins)!=null&&y.length?(t(),s("div",X,[r(" \u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043A\u043B\u0430\u0441\u0441\u0430: "),n("span",Y,a(e.value.goblins.join(", ")),1)])):(t(),s("div",Z,"\u041F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043A\u043B\u0430\u0441\u0441\u043E\u0432")),e.value.craft?(t(),s("div",ee,[r(" \u043A\u0440\u0430\u0444\u0442 \u0432: "),n("span",te,a(e.value.craft),1)])):l("",!0),e.value.boss?(t(),s("div",se,[r(" \u0411\u043E\u0441\u0441: "),d(_,{to:`/boss?name=${(k=e.value.boss)==null?void 0:k.name}`,class:"mr-2 text-red"},{default:m(()=>{var o;return[r(a((o=e.value.boss)==null?void 0:o.name),1)]}),_:1},8,["to"])])):l("",!0)])])]),n("div",{class:"body my-2 text-white",innerHTML:e.value.description},null,8,oe),e.value.params?(t(),s("ul",ae,[r(" \u0411\u043E\u043D\u0443\u0441\u044B \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430: "),(t(!0),s(v,null,h(Object.keys(e.value.params),(o,i)=>(t(),s("li",{key:i,class:"ml-7"},[e.value.params[o]&&p(f)[o]?(t(),s("div",ne,[o==="manaburn"?(t(),s("span",re,a(p(f)[o])+" "+a(e.value.params[o])+" \u043C\u0430\u043D\u044B \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0443 ",1)):(t(),s("span",le,a(p(f)[o])+": "+a(e.value.params[o]),1)),["as","mp_regeneration","resist","distant_resist","evade"].includes(o)?(t(),s("span",ie," % ")):l("",!0)])):l("",!0)]))),128))])):l("",!0),(g=e.value.children)!=null&&g.length?(t(),s("div",de,[r(' \u0418\u0437 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 "'+a(e.value.name)+'" \u043C\u043E\u0436\u043D\u043E \u0441\u043A\u0440\u0430\u0444\u0442\u0438\u0442\u044C: ',1),(t(!0),s(v,null,h(e.value.children,(o,i)=>(t(),s("span",{class:"text-md text-end",key:o.id},[d(_,{to:`/item/${o.id}`},{default:m(()=>[n("span",ce,a(o.name),1),i!==e.value.children.length-1?(t(),s("span",ue,", ")):(t(),s("span",_e,"; "))]),_:2},1032,["to"])]))),128))])):l("",!0),(w=e.value.parents)!=null&&w.length?(t(),s("div",me,[r(' \u041F\u0440\u0435\u0434\u043C\u0435\u0442 "'+a(e.value.name)+'" \u043A\u0440\u0430\u0444\u0442\u0438\u0442\u0441\u044F \u0438\u0437: ',1),(t(!0),s(v,null,h(e.value.parents,(o,i)=>(t(),s("span",{class:"text-md text-end",key:o.id},[d(_,{to:`/item/${o.id}`},{default:m(()=>[n("span",ve,a(N(o.id))+" "+a(o.name),1),i!==e.value.parents.length-1?(t(),s("span",he,", ")):(t(),s("span",pe,"; "))]),_:2},1032,["to"])]))),128))])):l("",!0)],512),(t(),j(H,{to:"body"},[d(P,{class:"fixed right-2 top-20 block h-15 bg-second md:hidden"})]))])):(t(),s("div",O,"\u0422\u0430\u043A\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u043D\u0435\u0442"))}}};export{Ne as default};
