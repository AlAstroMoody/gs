import{g as t}from"./index.af050076.js";import{h as s}from"./index.8c313583.js";function f(e){e.forEach(o=>{var a;(a=o.value)!=null&&a.children&&t.from(t.utils.shuffle([...o.value.children]),{duration:.2,x:t.utils.random(-100,100),y:t.utils.random(-100,100),autoAlpha:0,stagger:.05,ease:"back.out(0.5)"})}),s((o,a,i)=>{let n=0;e.forEach(l=>{var r;((r=l.value)==null?void 0:r.children.length)>n&&(n=l.value.children.length)}),e.forEach(l=>{t.to(t.utils.shuffle([...l.value.children]),{duration:.1,x:100,autoAlpha:0,ease:"power3.in",stagger:.05,onComplete:()=>{l.value.children.length===n&&i()}})}),e.length||i()})}function c({el:e,from:o,to:a,autoAlpha:i=0,duration:n=.3}={}){o&&t.from(e,{duration:n,scale:o,autoAlpha:i,ease:"power3.in"}),a&&t.to(e,{duration:n,scale:a,autoAlpha:i,ease:"power3.in"})}function p(e){e.style.opacity=0,e.style.height=0}function d(e,o){t.to(e,{opacity:1,height:"auto",delay:e.dataset.index*.15,onComplete:o})}function g(e,o){t.to(e,{opacity:0,height:0,delay:e.dataset.index*.15,onComplete:o})}function m({el:e,rotate:o=90,transformOrigin:a="right bottom"}={}){t.from(e,{duration:1.2,rotate:o,transformOrigin:a,autoAlpha:0,ease:"back.out(1)"})}export{f as a,d as b,g as c,m as e,p as o,c as s};