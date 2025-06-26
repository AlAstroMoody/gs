<script setup>
import { useWindowSize, useRafFn } from '@vueuse/core'
import { onMounted, ref, reactive, watch } from 'vue'

const r180 = Math.PI
const r90 = Math.PI / 2
const r15 = Math.PI / 12

const el = ref(null)

const { random } = Math
const size = reactive(useWindowSize())

const start = ref(() => {})
const init = ref(4)
const len = ref(6)
const stopped = ref(false)

function initCanvas(canvas, width = 400, height = 400, _dpi) {
  const ctx = canvas.getContext('2d')

  const dpr = window.devicePixelRatio || 1

  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}

function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)

  return [x + dx, y + dy]
}

let controls
let canvas
let ctx
let canvasWidth
let canvasHeight

onMounted(async () => {
  canvas = el.value
  const canvasInit = initCanvas(canvas, size.width, size.height)
  ctx = canvasInit.ctx
  canvasWidth = size.width
  canvasHeight = size.height

  let steps = []
  let prevSteps = []

  let iterations = 0

  const step = (x, y, rad) => {
    const length = random() * len.value

    const [nx, ny] = polar2cart(x, y, length, rad)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.strokeStyle = '#4a4a8a'
    ctx.lineWidth = random() * 1.2 + 0.8
    ctx.globalAlpha = random() * 0.6 + 0.3
    ctx.stroke()
    ctx.globalAlpha = 1

    const rad1 = rad + random() * r15
    const rad2 = rad - random() * r15

    if (nx < -100 || nx > canvasWidth + 100 || ny < -100 || ny > canvasHeight + 100) return

    if (iterations <= init.value || random() > 0.5) steps.push(() => step(nx, ny, rad1))
    if (iterations <= init.value || random() > 0.5) steps.push(() => step(nx, ny, rad2))
  }

  let lastTime = performance.now()
  const interval = 1000 / 30

  const frame = () => {
    if (performance.now() - lastTime < interval) return

    iterations += 1
    prevSteps = steps
    steps = []
    lastTime = performance.now()

    if (!prevSteps.length) {
      controls.pause()
      stopped.value = true

      return
    }

    prevSteps.forEach((i) => i())
  }

  controls = useRafFn(frame, { immediate: false })

  start.value = () => {
    controls.pause()
    iterations = 0
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.lineWidth = 1
    prevSteps = []
    steps = [
      () => step(random() * canvasWidth, 0, r90),
      () => step(random() * canvasWidth, canvasHeight, -r90),
      () => step(0, random() * canvasHeight, 0),
      () => step(canvasWidth, random() * canvasHeight, r180),
    ]
    if (canvasWidth < 500) steps = steps.slice(0, 2)
    controls.resume()
    stopped.value = false
  }

  start.value()
})

// Следим за изменением размера окна и перезапускаем анимацию
watch(
  [() => size.width, () => size.height],
  () => {
    if (canvas && ctx) {
      // Переинициализируем canvas с новым размером
      const canvasInit = initCanvas(canvas, size.width, size.height)
      ctx = canvasInit.ctx
      canvasWidth = size.width
      canvasHeight = size.height

      // Перезапускаем анимацию
      if (start.value) {
        start.value()
      }
    }
  },
  { flush: 'post' }
)
</script>

<template>
  <div class="pointer-events-none fixed bottom-0 left-0 right-0 top-0" style="z-index: -1">
    <canvas ref="el" width="400" height="400" />
  </div>
</template>
