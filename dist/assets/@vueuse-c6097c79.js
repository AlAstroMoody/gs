import{u as K,o as z,n as V,r as S,a as x,w as W,g as J,b as $,c as U,s as X,d as Z,e as ee}from"./@vue-d43bc838.js";function L(e){return $()?(U(e),!0):!1}function O(e){return typeof e=="function"?e():K(e)}const H=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const te=Object.prototype.toString,ne=e=>te.call(e)==="[object Object]",A=()=>{},re=ie();function ie(){var e,t;return H&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&(/iP(ad|hone|od)/.test(window.navigator.userAgent)||((t=window==null?void 0:window.navigator)==null?void 0:t.maxTouchPoints)>2&&/iPad|Macintosh/.test(window==null?void 0:window.navigator.userAgent))}function R(e,t){function n(...r){return new Promise((i,u)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(i).catch(u)})}return n}const q=e=>e();function oe(e,t={}){let n,r,i=A;const u=s=>{clearTimeout(s),i(),i=A};return s=>{const l=O(e),d=O(t.maxWait);return n&&u(n),l<=0||d!==void 0&&d<=0?(r&&(u(r),r=null),Promise.resolve(s())):new Promise((m,p)=>{i=t.rejectOnCancel?p:m,d&&!r&&(r=setTimeout(()=>{n&&u(n),r=null,m(s())},d)),n=setTimeout(()=>{r&&u(r),r=null,m(s())},l)})}}function ue(e=q){const t=S(!0);function n(){t.value=!1}function r(){t.value=!0}const i=(...u)=>{t.value&&e(...u)};return{isActive:x(t),pause:n,resume:r,eventFilter:i}}function se(e){return e||J()}function ye(e,t=200,n={}){return R(oe(t,n),e)}function ae(e,t,n={}){const{eventFilter:r=q,...i}=n;return W(e,R(r,t),i)}function le(e,t,n={}){const{eventFilter:r,...i}=n,{eventFilter:u,pause:f,resume:s,isActive:l}=ue(r);return{stop:ae(e,t,{...i,eventFilter:u}),pause:f,resume:s,isActive:l}}function k(e,t=!0,n){se()?z(e,n):t?e():V(e)}function T(e){var t;const n=O(e);return(t=n==null?void 0:n.$el)!=null?t:n}const b=H?window:void 0;function E(...e){let t,n,r,i;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,i]=e,t=b):[t,n,r,i]=e,!t)return A;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const u=[],f=()=>{u.forEach(m=>m()),u.length=0},s=(m,p,o,c)=>(m.addEventListener(p,o,c),()=>m.removeEventListener(p,o,c)),l=W(()=>[T(t),O(i)],([m,p])=>{if(f(),!m)return;const o=ne(p)?{...p}:p;u.push(...n.flatMap(c=>r.map(w=>s(m,c,w,o))))},{immediate:!0,flush:"post"}),d=()=>{l(),f()};return L(d),d}let C=!1;function Se(e,t,n={}){const{window:r=b,ignore:i=[],capture:u=!0,detectIframe:f=!1}=n;if(!r)return A;re&&!C&&(C=!0,Array.from(r.document.body.children).forEach(o=>o.addEventListener("click",A)),r.document.documentElement.addEventListener("click",A));let s=!0;const l=o=>i.some(c=>{if(typeof c=="string")return Array.from(r.document.querySelectorAll(c)).some(w=>w===o.target||o.composedPath().includes(w));{const w=T(c);return w&&(o.target===w||o.composedPath().includes(w))}}),m=[E(r,"click",o=>{const c=T(e);if(!(!c||c===o.target||o.composedPath().includes(c))){if(o.detail===0&&(s=!l(o)),!s){s=!0;return}t(o)}},{passive:!0,capture:u}),E(r,"pointerdown",o=>{const c=T(e);s=!l(o)&&!!(c&&!o.composedPath().includes(c))},{passive:!0}),f&&E(r,"blur",o=>{setTimeout(()=>{var c;const w=T(e);((c=r.document.activeElement)==null?void 0:c.tagName)==="IFRAME"&&!(w!=null&&w.contains(r.document.activeElement))&&t(o)},0)})].filter(Boolean);return()=>m.forEach(o=>o())}function ce(){const e=S(!1),t=J();return t&&z(()=>{e.value=!0},t),e}function fe(e){const t=ce();return ee(()=>(t.value,!!e()))}function be(e,t={}){const{immediate:n=!0,fpsLimit:r=void 0,window:i=b}=t,u=S(!1),f=r?1e3/r:null;let s=0,l=null;function d(o){if(!u.value||!i)return;s||(s=o);const c=o-s;if(f&&c<f){l=i.requestAnimationFrame(d);return}s=o,e({delta:c,timestamp:o}),l=i.requestAnimationFrame(d)}function m(){!u.value&&i&&(u.value=!0,s=0,l=i.requestAnimationFrame(d))}function p(){u.value=!1,l!=null&&i&&(i.cancelAnimationFrame(l),l=null)}return n&&m(),L(p),{isActive:x(u),pause:p,resume:m}}function de(e,t={}){const{window:n=b}=t,r=fe(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let i;const u=S(!1),f=d=>{u.value=d.matches},s=()=>{i&&("removeEventListener"in i?i.removeEventListener("change",f):i.removeListener(f))},l=Z(()=>{r.value&&(s(),i=n.matchMedia(O(e)),"addEventListener"in i?i.addEventListener("change",f):i.addListener(f),u.value=i.matches)});return L(()=>{l(),s(),i=void 0}),u}const N=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},_="__vueuse_ssr_handlers__",me=pe();function pe(){return _ in N||(N[_]=N[_]||{}),N[_]}function he(e,t){return me[e]||t}function we(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const ve={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},D="vueuse-storage";function Ae(e,t,n,r={}){var i;const{flush:u="pre",deep:f=!0,listenToStorageChanges:s=!0,writeDefaults:l=!0,mergeDefaults:d=!1,shallow:m,window:p=b,eventFilter:o,onError:c=a=>{console.error(a)},initOnMounted:w}=r,g=(m?X:S)(typeof t=="function"?t():t);if(!n)try{n=he("getDefaultStorage",()=>{var a;return(a=b)==null?void 0:a.localStorage})()}catch(a){c(a)}if(!n)return g;const y=O(t),M=we(y),F=(i=r.serializer)!=null?i:ve[M],{pause:B,resume:P}=le(g,()=>G(g.value),{flush:u,deep:f,eventFilter:o});p&&s&&k(()=>{E(p,"storage",I),E(p,D,Y),w&&I()}),w||I();function j(a,h){p&&p.dispatchEvent(new CustomEvent(D,{detail:{key:e,oldValue:a,newValue:h,storageArea:n}}))}function G(a){try{const h=n.getItem(e);if(a==null)j(h,null),n.removeItem(e);else{const v=F.write(a);h!==v&&(n.setItem(e,v),j(h,v))}}catch(h){c(h)}}function Q(a){const h=a?a.newValue:n.getItem(e);if(h==null)return l&&y!=null&&n.setItem(e,F.write(y)),y;if(!a&&d){const v=F.read(h);return typeof d=="function"?d(v,y):M==="object"&&!Array.isArray(v)?{...y,...v}:v}else return typeof h!="string"?h:F.read(h)}function I(a){if(!(a&&a.storageArea!==n)){if(a&&a.key==null){g.value=y;return}if(!(a&&a.key!==e)){B();try{(a==null?void 0:a.newValue)!==F.write(g.value)&&(g.value=Q(a))}catch(h){c(h)}finally{a?V(P):P()}}}}function Y(a){I(a.detail)}return g}function Ee(e={}){const{window:t=b,initialWidth:n=Number.POSITIVE_INFINITY,initialHeight:r=Number.POSITIVE_INFINITY,listenOrientation:i=!0,includeScrollbar:u=!0}=e,f=S(n),s=S(r),l=()=>{t&&(u?(f.value=t.innerWidth,s.value=t.innerHeight):(f.value=t.document.documentElement.clientWidth,s.value=t.document.documentElement.clientHeight))};if(l(),k(l),E("resize",l,{passive:!0}),i){const d=de("(orientation: portrait)");W(d,()=>l())}return{width:f,height:s}}export{be as a,Ae as b,ye as c,Se as o,Ee as u};
