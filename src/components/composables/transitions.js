import gsap from 'gsap'
import { onBeforeRouteLeave } from 'vue-router'

export function animateChildren(array) {
  array.forEach((el) => {
    gsap.from(gsap.utils.shuffle([...el.value.children]), {
      duration: 0.2,
      x: gsap.utils.random(-100, 100),
      y: gsap.utils.random(-100, 100),
      autoAlpha: 0,
      stagger: 0.05,
      ease: 'back.out(0.5)',
    })
  })

  onBeforeRouteLeave((to, from, next) => {
    let maxLength = 0
    array.forEach((el) => {
      if (el.value.children.length > maxLength) {
        maxLength = el.value.children.length
      }
    })
    array.forEach((el) => {
      gsap.to(gsap.utils.shuffle([...el.value.children]), {
        duration: 0.1,
        x: 100,
        autoAlpha: 0,
        ease: 'power3.in',
        stagger: 0.05,
        onComplete: () => {
          if (el.value.children.length === maxLength) {
            next()
          }
        },
      })
    })
  })
}

export function scaleUp({ el, from, to, autoAlpha = 0, duration = 0.3 } = {}) {
  if (from) {
    gsap.from(el, {
      duration,
      scale: from,
      autoAlpha,
      ease: 'power3.in',
    })
  }
  if (to) {
    gsap.to(el, {
      duration,
      scale: to,
      autoAlpha,
      ease: 'power3.in',
    })
  }
}

export function onBeforeEnterGroup(el) {
  el.style.opacity = 0
  el.style.height = 0
}

export function onEnterGroup(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: 'auto',
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}

export function onLeaveGroup(el, done) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}

export function elTurn({
  el,
  rotate = 90,
  transformOrigin = 'right bottom',
} = {}) {
  gsap.from(el, {
    duration: 1.2,
    rotate,
    transformOrigin,
    autoAlpha: 0,
    ease: 'back.out(1)',
  })
}
