import{g as t}from"./index.af050076.js";import{h as s}from"./index.e43175d8.js";function h(e){e.forEach(o=>{t.from(t.utils.shuffle([...o.value.children]),{duration:.2,x:t.utils.random(-100,100),y:t.utils.random(-100,100),autoAlpha:0,stagger:.05,ease:"back.out(0.5)"})}),s((o,n,r)=>{let a=0;e.forEach(i=>{i.value.children.length>a&&(a=i.value.children.length)}),e.forEach(i=>{t.to(t.utils.shuffle([...i.value.children]),{duration:.1,x:100,autoAlpha:0,ease:"power3.in",stagger:.05,onComplete:()=>{i.value.children.length===a&&r()}})})})}function f({el:e,from:o,to:n,autoAlpha:r=0,duration:a=.3}={}){o&&t.from(e,{duration:a,scale:o,autoAlpha:r,ease:"power3.in"}),n&&t.to(e,{duration:a,scale:n,autoAlpha:r,ease:"power3.in"})}function c(e){e.style.opacity=0,e.style.height=0}function p(e,o){t.to(e,{opacity:1,height:"auto",delay:e.dataset.index*.15,onComplete:o})}function d(e,o){t.to(e,{opacity:0,height:0,delay:e.dataset.index*.15,onComplete:o})}function m({el:e,rotate:o=90,transformOrigin:n="right bottom"}={}){t.from(e,{duration:1.2,rotate:o,transformOrigin:n,autoAlpha:0,ease:"back.out(1)"})}export{h as a,p as b,d as c,m as e,c as o,f as s};