<template>
  <div class="scrollbar__wrapper">
    <div class="scrollbar" ref="scrollbar" @click="trackClick">
      <div class="scrollbar__track">
        <div class="scrollbar__thumb" ref="thumb"
             :style="{ transform: `translateY(${thumbTransformY}px)`, height: `${thumbHeight}%` }"
        />
      </div>
    </div>
    <div class="main" ref="main">
      <div ref="body">
      <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, nextTick, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'


const props = defineProps({
  isResize: {
    default: false,
    type: Boolean
  }
})
const { isResize } = toRefs(props)

// scrollbar logic
const scrollbar = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)
const thumbHeight = computed(() => {
    return scrollbar.value ? 100 * scrollbar.value.clientHeight / blockHeight.value : null
  }
)

const thumbTransformY = computed(() =>
  scrollbar.value ? (-scrollbar.value.clientHeight) * currentYPosition.value / blockHeight.value : 0,
)

//body logic
const main = ref<HTMLElement | null>(null)
const body = ref<HTMLElement | null>(null)
const blockHeight = ref(0)

const currentYPosition = ref(0)

const wheelWatcher = (event: WheelEvent) => {
  if (main.value) {
    const heightDifference = main.value.scrollHeight - main.value.clientHeight
    if (!heightDifference) return

    if (currentYPosition.value + event.deltaY < 0) {
      if (event.deltaY > 0) {
        currentYPosition.value += event.deltaY * 4
      } else {
        if (-currentYPosition.value + event.deltaY < heightDifference) {
          currentYPosition.value = currentYPosition.value += event.deltaY * 4
        }
      }
    }
    // extremum points
    currentYPosition.value >= 0 ? currentYPosition.value = 0 : null
    currentYPosition.value + heightDifference < 0
      ? currentYPosition.value = -heightDifference
      : null

    main.value.style.transform = `translateY(${currentYPosition.value}px)`
  }
}

const addWheelHandler = () => {
  main.value ? main.value.addEventListener('wheel', wheelWatcher) : null
}
const removeWheelHandler = () => {
  main.value ? main.value.removeEventListener('wheel', wheelWatcher) : null
}

const resize = () => {
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
  if (main.value && scrollbar.value && body.value) {
    if (main.value.clientHeight !== body.value.scrollHeight) {
      scrollbar.value.style.display = 'block'
    }
  }

  nextTick(() =>
    main.value ? blockHeight.value = main.value.scrollHeight : null
  )
}

const route = useRoute()
const routePath = computed(() => route.path)
watch(routePath, async () => {
  main.value ? main.value.style.transform = "translateY(0px)" : null
  resize()
})

watch(isResize, async () => {
  resize()
})

const trackClick = (event: MouseEvent) => {
  const eventShift = event.clientY < - currentYPosition.value ? event.offsetY : event.clientY
  if (main.value) {
    const heightDifference = main.value.scrollHeight - main.value.clientHeight
    if (eventShift >= heightDifference) {
      currentYPosition.value = - heightDifference
    } else {
      currentYPosition.value = - eventShift
    }
    main.value.style.transform = `translateY(${currentYPosition.value}px)`
  }
}

</script>

<style scoped lang="scss">
.scrollbar {
  padding: 0 8px;
  display: none;
  height: 100%;

  &__wrapper {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }

  &__track {
    width: 1px;
    height: 100%;
    background: var(--color-text);
    border-radius: 10px;
  }

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

.main {
  width: 100%;
  transition: all 1s ease-out;
}

</style>