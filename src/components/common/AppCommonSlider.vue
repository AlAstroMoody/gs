<template>
  <div class="slider" ref="slider" @click.self="onSliderClick">
    <div class="slider__thumb" ref="thumb" @mousedown="onMouseDown" @dragstart="OnDragStart" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'


const emit = defineEmits(['thumbShift'])
const thumb = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
const shiftX = ref(0)
const startX = ref(0)
const endX = ref(0)

const travelDistance = computed(() => endX.value - startX.value)

const thumbShift = computed(() => {
  const shiftValue = (travelDistance.value / (slider.value.clientWidth - thumb.value.clientWidth)).toPrecision(2)
  return shiftValue > 0 ? shiftValue : 0
})

watch(travelDistance, async (newValue) => {
  emit('thumbShift', thumbShift.value)
})

const onMouseDown = (event: MouseEvent) => {
  event.preventDefault()
  shiftX.value = event.clientX - thumb.value.getBoundingClientRect().left
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event: MouseEvent) => {
  let newLeft = event.clientX - shiftX.value - slider.value.getBoundingClientRect().left
  newLeft < 0 ? newLeft = 0 : null
  let rightEdge = slider.value.offsetWidth - thumb.value.offsetWidth
  newLeft > rightEdge ? newLeft = rightEdge : null
  thumb.value.style.left = newLeft + 'px'
  endX.value = thumb.value.getBoundingClientRect().left
}

const onMouseUp = (event: MouseEvent) => {
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mousemove', onMouseMove)
}

const onSliderClick = (event: MouseEvent) => {
  endX.value = event.clientX
  thumb.value.style.left = travelDistance.value + 'px'
}

const OnDragStart = () => false

onMounted(() => {
  // TODO resize?
  startX.value = slider.value.getBoundingClientRect().left
})
</script>

<style scoped lang="scss">
.slider {
  border-radius: 8px;
  background: var(--color-background-soft);
  width: 100%;
  height: 15px;

  &__thumb {
    width: 10px;
    height: 25px;
    border-radius: 8px;
    position: relative;
    left: 0;
    top: -5px;
    background: var(--color-text);
    cursor: pointer;
  }
}
</style>