<script setup>
import { useStorage } from '@vueuse/core'
import { computed, nextTick, ref, watch, onMounted } from 'vue'

import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'

const goblins = computed(() => store.entities.goblins)

let startX = ref(0)
let active = ref(0)
let isDown = ref(false)
const speedDrag = ref(-0.1)
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  )

const cards = ref(null)
let progress = ref(0)
const displayItems = (item, index, active) => {
  const zIndex = getZindex([...cards.value], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index - active) / cards.value.length)
  item.style.setProperty('--items', cards.value.length)
}
const animate = () => {
  if (cards.value) {
    progress.value = Math.max(
      0,
      Math.min(progress.value, cards.value.length * 10)
    )
    active.value = Math.floor(
      (progress.value / (cards.value.length * 10)) * (cards.value.length - 1)
    )
    cards.value.forEach((item, index) =>
      displayItems(item, index, active.value)
    )
  }
}

let ticking = ref(false)
const handleMouseMove = (e) => {
  if (!isDown.value) return
  ticking.value = false
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX.value) * speedDrag.value
  progress.value = progress.value + mouseProgress
  startX.value = x
  if (!ticking.value) {
    requestAnimationFrame(() => {
      animate()
      ticking.value = true
    })
  }
}
const handleMouseDown = (e) => {
  isDown.value = true
  startX.value = e.clientX || (e.touches && e.touches[0].clientX) || 0
}
const handleMouseUp = () => (isDown.value = false)

const carousel = ref(null)

const init = () => {
  nextTick(() => {
    progress.value = (10 * cards.value?.length || 0) / 2
    animate()
    activeGoblin.value = goblins.value[progress.value / 10]
  })
}

const activeGoblin = ref(null)
const chooseCard = (goblin, index) => {
  progress.value = (index / cards.value.length) * cards.value.length * 10 + 10
  animate()
  activeGoblin.value = goblin
  setGoblin(goblin)
  localStorage.setItem('goblin', goblin.name)
}
const { setGoblin } = useGoblinState()

watch(goblins, async () => {
  await getStorageGoblin()
})
onMounted(async () => {
  await getStorageGoblin()
})

const getStorageGoblin = async () => {
  const goblinName = useStorage('goblin')
  const storageGoblin = goblins.value.find((g) => g.name === goblinName.value)
  if (storageGoblin) {
    setGoblin(storageGoblin)
    await nextTick()
    chooseCard(storageGoblin, storageGoblin.id - 1)
  } else init()
}
</script>
<template>
  <div
    class="pointer-events-none relative z-1 h-full w-full overflow-hidden"
    ref="carousel"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @touchstart="handleMouseDown"
    @touchmove="handleMouseMove"
    @touchend="handleMouseUp"
  >
    <div
      class="carousel-item pointer-events-auto absolute overflow-hidden bg-black"
      v-for="(goblin, index) of goblins"
      :key="goblin.id"
      ref="cards"
      @click="chooseCard(goblin, index)"
    >
      <div class="carousel-box absolute left-0 top-0 z-1 h-full w-full">
        <div
          class="absolute bottom-4 left-5 z-1 text-xl text-white md:text-3xl"
        >
          {{ goblin.name }}
        </div>
        <img
          :src="`.${goblin.src}`"
          class="pointer-events-none h-full w-full object-cover"
        />
      </div>
    </div>
    <div
      class="absolute bottom-10 text-sm font-semibold md:text-2xl lg:bottom-0"
      v-if="activeGoblin"
    >
      {{ activeGoblin?.description }}
    </div>
  </div>
</template>

<style>
/* TODO убрать стили позднее */
.carousel-item {
  --x: calc(var(--active) * 80% * var(--items));
  --y: calc(var(--active) * 20% * var(--items));
  --rot: calc(var(--active) * 120deg);
  --opacity: calc(var(--zIndex) / var(--items) * 3 - 2);
  z-index: var(--zIndex);
  width: 200px;
  height: 250px;
  margin: -125px 0 0 -100px;
  border-radius: 10px;
  top: 30%;
  left: 50%;
  user-select: none;
  transform-origin: 0% 100%;
  box-shadow: 0 10px 50px 10px rgba(0, 0, 0, 0.5);
  transform: translate(var(--x), var(--y)) rotate(var(--rot));
  transition: transform 0.8s cubic-bezier(0, 0.02, 0, 1);
}
.carousel-box {
  transition: opacity 0.8s cubic-bezier(0, 0.02, 0, 1);
  opacity: var(--opacity);
}
.carousel-box:before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.5)
  );
}
</style>
