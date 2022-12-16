<template>
  <div class="flex flex-row h-full w-full">
    <div class="h-full px-2" ref="scrollbar" @click="trackClick">
      <div class="bg-second ease-out duration-1000 h-full rounded-lg w-one">
        <div
          class="transition-all duration-1000 bg-red rounded-lg w-[3px] -ml-one"
          ref="thumb"
          :style="{
            transform: `translateY(${thumbTransformY}px)`,
            height: `${thumbHeight}%`,
          }"
        />
      </div>
    </div>
    <div class="ease-out duration-1000 w-full" ref="main">
      <div ref="body" class="h-full px-2 md:px-0 lg:px-2">
        <slot ref="slot" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isResize: { default: false, type: Boolean },
  needReset: { default: false, type: Boolean },
})
const { isResize, needReset } = toRefs(props)

const router = useRouter()

router.beforeEach(() => {
  console.log(needReset.value)
  needReset.value ? resize() : null

  return true
})

// scrollbar logic
const scrollbar = ref(null)
const thumb = ref(null)

//body logic
const main = ref(null)
const body = ref(null)
const blockHeight = ref(0)
const thumbHeight = ref(0)

const currentYPosition = ref(0)

const thumbTransformY = computed(
  () =>
    (-scrollbar.value?.clientHeight * currentYPosition.value) /
      blockHeight.value || 0
)

const wheelWatcher = (event) => {
  useScroll(event)
}

// хрень какая-то
const useScroll = (event) => {
  const heightDifference = main.value.scrollHeight - main.value.clientHeight
  if (!heightDifference) return

  if (event.deltaY < 0) {
    currentYPosition.value -= event.deltaY * 4
  } else {
    if (currentYPosition.value - event.deltaY > -heightDifference) {
      currentYPosition.value = currentYPosition.value -= event.deltaY * 4
    }
  }

  // extremum points
  currentYPosition.value >= 0 ? (currentYPosition.value = 0) : null
  currentYPosition.value + heightDifference < 0
    ? (currentYPosition.value = -heightDifference)
    : null

  main.value.style.transform = `translateY(${currentYPosition.value}px)`

  changeBlockHeight()
}

const resize = async () => {
  main.value ? (main.value.style.transform = 'translateY(0px)') : null
  currentYPosition.value = 1
  await nextTick()
  changeBlockHeight()
}

onMounted(() => {
  console.log('mount')
  main.value.addEventListener('wheel', wheelWatcher)
  window.addEventListener('resize', resize)
  resize()
})

onBeforeUnmount(() => {
  main.value.removeEventListener('wheel', wheelWatcher)
  window.removeEventListener('resize', resize)
})

const changeBlockHeight = () => {
  nextTick(() => {
    if (main?.value?.scrollHeight !== body?.value?.scrollHeight) {
      scrollbar.value.classList.add('md:block')
    }
    blockHeight.value = main.value?.scrollHeight || null
    thumbHeight.value =
      (100 * scrollbar.value?.clientHeight) / blockHeight?.value || 0
  })
}

watchEffect(isResize, () => {
  resize()
})

// клик по треку - переписать логику
const trackClick = (event) => {
  // const eventShift =
  //   event.clientY < -currentYPosition.value ? event.offsetY : event.clientY
  // if (main.value) {
  //   const heightDifference = main.value.scrollHeight - main.value.clientHeight
  //   if (eventShift >= heightDifference) {
  //     currentYPosition.value = -heightDifference
  //   } else {
  //     currentYPosition.value = -eventShift
  //   }
  //   main.value.style.transform = `translateY(${currentYPosition.value}px)`
  // }
}
</script>
