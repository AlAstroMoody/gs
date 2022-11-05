<template>
  <div
    class="bg-gray w-full h-4 rounded-lg"
    ref="slider"
    @click.self="onSliderClick"
  >
    <label
      class="slider__thumb rounded-lg relative left-0 h-6 w-3 -top-1"
      ref="thumb"
      @mousedown="onMouseDown"
      @dragstart="OnDragStart"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import { throttle } from '@/common/throttle'

const emit = defineEmits(['thumbShift'])
const thumb = ref(null)
const slider = ref(null)
const shiftX = ref(0)
const startX = ref(0)
const endX = ref(0)
const isTouched = ref(false)

const travelDistance = computed(() => endX.value - startX.value)

const thumbShift = computed(() => {
  if (slider.value && thumb.value) {
    const shiftValue = Number(
      (
        travelDistance.value /
        (slider.value.clientWidth - thumb.value.clientWidth)
      ).toPrecision(2)
    )

    return shiftValue > 0 ? shiftValue : 0
  }

  return 0
})

// таймаут на срабатывание слайдера
const sliderTimeout = ref(null)

// проброс результата наверх
const emitShift = () => {
  console.log('shift')
  emit('thumbShift', thumbShift.value)
}

watch(travelDistance, () => {
  const asd = throttle(emitShift, 1500)
})

// const throttle = (func, ms) => {
//   let isThrottled = false,
//     savedArgs,
//     savedThis

//   function wrapper() {
//     if (isThrottled) {
//       savedArgs = arguments
//       savedThis = this
//       return
//     }

//     func.apply(this, arguments)

//     isThrottled = true

//     setTimeout(function () {
//       isThrottled = false // (3)
//       if (savedArgs) {
//         wrapper.apply(savedThis, savedArgs)
//         savedArgs = savedThis = null
//       }
//     }, ms)
//   }

//   return wrapper
// }

const onMouseDown = (event) => {
  event.preventDefault()
  !isTouched.value ? resize() : null
  isTouched.value = true
  thumb.value
    ? (shiftX.value = event.clientX - thumb.value.getBoundingClientRect().left)
    : null
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event) => {
  if (slider.value && thumb.value) {
    let newLeft =
      event.clientX - shiftX.value - slider.value.getBoundingClientRect().left
    newLeft < 0 ? (newLeft = 0) : null
    let rightEdge = slider.value.offsetWidth - thumb.value.offsetWidth
    newLeft > rightEdge ? (newLeft = rightEdge) : null
    thumb.value.style.left = newLeft + 'px'
    endX.value = thumb.value.getBoundingClientRect().left
  }
}

const onMouseUp = () => {
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mousemove', onMouseMove)
}

const onSliderClick = (event) => {
  resize()
  endX.value = event.clientX
  thumb.value ? (thumb.value.style.left = travelDistance.value + 'px') : null
}

const OnDragStart = () => false

const resize = () => {
  startX.value = slider.value.getBoundingClientRect().left
  shiftX.value = 0
  endX.value = 0
  thumb.value.style.left = '0'
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

// очистка таймаута
const clearSliderTimeout = () => {
  clearTimeout(sliderTimeout.value)
  sliderTimeout.value = null
}

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  clearSliderTimeout()
})
</script>
