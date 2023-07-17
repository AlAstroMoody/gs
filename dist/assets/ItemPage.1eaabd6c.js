import{v as L,c as v,r as S,o as F,j as H,a as t,b as s,d as n,t as a,k as j,e as i,n as P,x as l,f as u,l as h,F as p,i as f,T as z,y as x}from"./index.8c313583.js";import{_ as D}from"./AppItemsPopup.f4844322.js";import{s as E}from"./store.6ba8c3c6.js";import{a as G}from"./transitions.c96b8bad.js";import{u as O}from"./useGoblinState.2867a4c4.js";import R from"./QuestionIcon.a596e1dd.js";import"./AppPopup.218439ea.js";import"./ExitIcon.1749c7c5.js";import"./FilterIcon.bd2488aa.js";import"./AppSidebar.6fb9c9ce.js";import"./AppFilter.661cd061.js";import"./index.af050076.js";const y={strength:"\u0441\u0438\u043B\u0430",agility:"\u043B\u043E\u0432\u043A\u043E\u0441\u0442\u044C",intelligence:"\u0440\u0430\u0437\u0443\u043C",attack:"\u0443\u0440\u043E\u043D",defence:"\u0437\u0430\u0449\u0438\u0442\u0430",visibility:"\u043E\u0431\u0437\u043E\u0440",luck:"\u0443\u0434\u0430\u0447\u0430",hp:"\u0425\u041F",mp:"\u041C\u041F",resist:"\u0441\u043E\u043F\u0440\u043E\u0442\u0438\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u0430\u0433\u0438\u0438",hp_regeneration:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u044F",mp_regeneration:"\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043C\u0430\u043D\u044B",stealth_detection:"\u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0438\u0435 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E\u043A",as:"\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0430\u0442\u0430\u043A\u0438",ms:"\u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0431\u0435\u0433\u0430",manaburn:"\u043A\u0430\u0436\u0434\u044B\u0439 \u0443\u0434\u0430\u0440 \u0441\u0436\u0438\u0433\u0430\u0435\u0442",evade:"\u0443\u043A\u043B\u043E\u043D\u0435\u043D\u0438\u0435",aura:"\u0430\u0443\u0440\u0430",active:"\u0430\u043A\u0442\u0438\u0432",distant_resist:"\u0441\u043D\u0438\u0436\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u043D\u0430 \u043E\u0442 \u0434\u0430\u043B\u044C\u043D\u0435\u0433\u043E \u0431\u043E\u044F"},q={key:0},A={key:1,class:"mx-4 mb-96 flex flex-1 flex-col justify-between"},J={class:"headline mt-6"},K={class:"mb-4 mt-10 flex flex-wrap items-center"},Q={class:"flex w-full flex-wrap items-center xs:w-auto"},U=["src"],W={class:"text-md ml-2 flex h-fit flex-1 justify-end whitespace-nowrap text-second"},X={class:"ml-4 flex flex-col content-center justify-center"},Y={key:0},Z={key:1},ee={key:2},te={class:"text-lg text-red"},se={key:3},oe={key:4},ae={key:5},ne=["innerHTML"],re={key:0,class:"body my-2 text-white"},le={key:1,class:"my-2"},ie={key:0},ce={key:0},de={key:1},ue={key:2},_e={key:2,class:"border-bg-silver rounded-lg border p-2"},me={class:"text-red hover:border-b"},ve={key:0},he={key:1},pe={key:3,class:"my-2 rounded-lg border border-silver p-2"},fe={class:"text-red hover:border-b"},xe={key:0},ye={key:1},Le={__name:"ItemPage",setup(be){const{user:_,addItem:I}=O(),T=L(),e=v(()=>E.currentItem("items",T.params.id)),B=v(()=>b.value?`\u043D\u0435 \u0431\u043E\u043B\u0435\u0435 ${e.value.max_count||1} \u0448\u0442.`:_.inventory.length<6?"\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C":"\u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u044C \u043F\u0435\u0440\u0435\u043F\u043E\u043B\u043D\u0435\u043D"),b=v(()=>{const r=_.inventory.filter(c=>c.id===e.value.id);return!e.value.max_count&&r.length===1?!0:e.value.max_count<=r.length}),M=()=>{b.value||_.inventory.length<6&&I(e.value)},N=r=>{var c;return((c=e.value)==null?void 0:c.count)&&e.value.count[r]?`${e.value.count[r]}\u0448\u0442`:""},k=S(null);F(()=>G([k]));const V=r=>r==="\u0410\u043D\u0433\u0435\u043B\u044C\u0441\u043A\u0430\u044F \u043A\u0443\u0437\u043D\u0438\u0446\u0430"?"text-yellow":r==="\u0412\u043D\u0435\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u043A\u0443\u0437\u043D\u044F"?"text-purple":r==="\u0412\u0435\u043B\u0438\u043A\u0430\u044F \u043A\u0443\u0437\u043D\u0438\u0446\u0430"?"text-green":r==="\u0414\u0435\u043C\u043E\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043A\u0443\u0437\u043D\u0438\u0446\u0430"?"text-red":"";return(r,c)=>{var g,w,C,$;const m=H("router-link");return e.value?(t(),s("div",A,[n("div",{ref_key:"content",ref:k},[n("div",J,a(e.value.name),1),n("div",K,[n("div",Q,[e.value.src?(t(),s("img",{key:0,src:`.${e.value.src}`,alt:"logo",class:"h-24 w-24"},null,8,U)):(t(),j(R,{key:1,color:"red"})),n("div",W,[n("button",{class:"mr-auto rounded-2xl border border-solid border-second px-2 py-4 ease-out hover:border-red hover:text-red",onClick:M},a(B.value),1)]),n("div",X,[e.value.level?(t(),s("div",Y," \u0442\u0440\u0435\u0431\u0443\u0435\u043C\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C: "+a(e.value.level),1)):(t(),s("div",Z,"\u041D\u0435\u0442 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0443\u0440\u043E\u0432\u043D\u044E")),(g=e.value.goblins)!=null&&g.length?(t(),s("div",ee,[i(" \u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043A\u043B\u0430\u0441\u0441\u0430: "),n("span",te,a(e.value.goblins.join(", ")),1)])):(t(),s("div",se,"\u041F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043A\u043B\u0430\u0441\u0441\u043E\u0432")),e.value.craft?(t(),s("div",oe,[i(" \u043A\u0440\u0430\u0444\u0442 \u0432: "),n("span",{class:P(V(e.value.craft))},a(e.value.craft),3)])):l("",!0),e.value.boss?(t(),s("div",ae,[i(" \u0411\u043E\u0441\u0441: "),u(m,{to:`/boss?name=${(w=e.value.boss)==null?void 0:w.name}`,class:"mr-2 text-red"},{default:h(()=>{var o;return[i(a((o=e.value.boss)==null?void 0:o.name),1)]}),_:1},8,["to"])])):l("",!0)])])]),n("div",{class:"body my-2 text-white",innerHTML:e.value.description},null,8,ne),e.value.max_count?(t(),s("div",re," \u041D\u0435 \u0431\u043E\u043B\u0435\u0435 "+a(e.value.max_count)+" \u0448\u0442. ",1)):l("",!0),e.value.params?(t(),s("ul",le,[i(" \u0411\u043E\u043D\u0443\u0441\u044B \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430: "),(t(!0),s(p,null,f(Object.keys(e.value.params),(o,d)=>(t(),s("li",{key:d,class:"ml-7"},[e.value.params[o]&&x(y)[o]?(t(),s("div",ie,[o==="manaburn"?(t(),s("span",ce,a(x(y)[o])+" "+a(e.value.params[o])+" \u043C\u0430\u043D\u044B \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0443 ",1)):(t(),s("span",de,a(x(y)[o])+": "+a(e.value.params[o]),1)),["as","mp_regeneration","resist","distant_resist","evade"].includes(o)?(t(),s("span",ue," % ")):l("",!0)])):l("",!0)]))),128))])):l("",!0),(C=e.value.children)!=null&&C.length?(t(),s("div",_e,[i(' \u0418\u0437 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 "'+a(e.value.name)+'" \u043C\u043E\u0436\u043D\u043E \u0441\u043A\u0440\u0430\u0444\u0442\u0438\u0442\u044C: ',1),(t(!0),s(p,null,f(e.value.children,(o,d)=>(t(),s("span",{class:"text-md text-end",key:o.id},[u(m,{to:`/item/${o.id}`},{default:h(()=>[n("span",me,a(o.name),1),d!==e.value.children.length-1?(t(),s("span",ve,", ")):(t(),s("span",he,"; "))]),_:2},1032,["to"])]))),128))])):l("",!0),($=e.value.parents)!=null&&$.length?(t(),s("div",pe,[i(' \u041F\u0440\u0435\u0434\u043C\u0435\u0442 "'+a(e.value.name)+'" \u043A\u0440\u0430\u0444\u0442\u0438\u0442\u0441\u044F \u0438\u0437: ',1),(t(!0),s(p,null,f(e.value.parents,(o,d)=>(t(),s("span",{class:"text-md text-end",key:o.id},[u(m,{to:`/item/${o.id}`},{default:h(()=>[n("span",fe,a(N(o.id))+" "+a(o.name),1),d!==e.value.parents.length-1?(t(),s("span",xe,", ")):(t(),s("span",ye,"; "))]),_:2},1032,["to"])]))),128))])):l("",!0)],512),(t(),j(z,{to:"body"},[u(D,{class:"fixed right-2 top-20 block h-15 bg-second md:hidden"})]))])):(t(),s("div",q,"\u0422\u0430\u043A\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u043D\u0435\u0442"))}}};export{Le as default};
