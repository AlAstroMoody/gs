<template>
  <div class="flex flex-row h-full w-full">
    <div class="h-full hidden px-2" ref="scrollbar" @click="trackClick">
      <div
        class="scrollbar__track z-background ease-out duration-1000 h-full rounded-lg w-[1px]"
      >
        <div
          class="scrollbar__thumb bg-red-100"
          ref="thumb"
          :style="{
            transform: `translateY(${thumbTransformY}px)`,
            height: `${thumbHeight}%`,
          }"
        />
      </div>
    </div>
    <div class="ease-out duration-1000 w-full" ref="main">
      <div
        ref="body"
        :class="{ 'xs:h-full': ['/item', '/goblins'].includes(route.path) }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  isResize: {
    default: false,
    type: Boolean,
  },
})
const { isResize } = toRefs(props)

// scrollbar logic
const scrollbar = ref(null)
const thumb = ref(null)
const thumbHeight = computed(() => {
  return scrollbar.value
    ? (100 * scrollbar.value.clientHeight) / blockHeight.value
    : null
})

const thumbTransformY = computed(() =>
  scrollbar.value
    ? (-scrollbar.value.clientHeight * currentYPosition.value) /
      blockHeight.value
    : 0
)

//body logic
const main = ref(null)
const body = ref(null)
const blockHeight = ref(0)

const currentYPosition = ref(0)

const wheelWatcher = (event) => {
  const heightDifference = main.value.scrollHeight - main.value.clientHeight
  console.log(heightDifference)
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
}

const addWheelHandler = () => {
  main.value ? main.value.addEventListener('wheel', wheelWatcher) : null
}
const removeWheelHandler = () => {
  main.value ? main.value.removeEventListener('wheel', wheelWatcher) : null
}

const resize = () => {
  main.value ? (main.value.style.transform = 'translateY(0px)') : null
  changeBlockHeight()
  currentYPosition.value = 0
}

onMounted(() => {
  nextTick(() => {
    addWheelHandler()
    changeBlockHeight()
    window.addEventListener('resize', resize)
  })
})

onUnmounted(() => {
  removeWheelHandler()
  window.removeEventListener('resize', resize)
})

const changeBlockHeight = () => {
  if (main?.value?.clientHeight !== body?.value?.scrollHeight) {
    scrollbar.value.classList.add('md:block')
  }

  nextTick(() =>
    main.value ? (blockHeight.value = main.value.scrollHeight) : null
  )
}

const route = useRoute()
const routePath = computed(() => route.path)
watch(routePath, async () => {
  resize()
})

watch(isResize, async () => {
  resize()
})

const trackClick = (event) => {
  const eventShift =
    event.clientY < -currentYPosition.value ? event.offsetY : event.clientY
  if (main.value) {
    const heightDifference = main.value.scrollHeight - main.value.clientHeight
    if (eventShift >= heightDifference) {
      currentYPosition.value = -heightDifference
    } else {
      currentYPosition.value = -eventShift
    }
    main.value.style.transform = `translateY(${currentYPosition.value}px)`
  }
}
</script>

<style scoped lang="scss">
.scrollbar {
  &__thumb {
    height: 30px;
    width: 3px;
    margin: 0 0 0 -1px;
    border: 1 ps solid var(--color-text);
    border-radius: 10px;
    background: var(--color-text-hover);
    transition: 1s all;
  }
}
</style>
