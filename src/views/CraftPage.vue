<template>
  <main class="flex w-full justify-between px-2 pt-4 pb-20">
    <ul ref="list">
      <transition-group
        tag="ol"
        :css="false"
        @before-enter="onBeforeEnterGroup"
        @enter="onEnterGroup"
        @leave="onLeaveGroup"
      >
        <AppCraftItem
          :item="item"
          v-for="item in craftItems
            .filter((item) => item?.parents?.length)
            .sort((a, b) => a.level - b.level)"
          :key="item.id"
        />
      </transition-group>
    </ul>
    <Teleport to="body" v-if="!isMobile">
      <div
        ref="filter"
        class="opacity-1 fixed right-8 top-8 rounded border border-silver bg-gray p-4"
      >
        <AppFilter @filteredItems="changeItemsKit($event)" />
      </div>
    </Teleport>

    <Teleport to="body" v-else>
      <div
        ref="mobileFilter"
        class="opacity-1 fixed right-4 top-4 rounded border border-silver bg-gray p-2"
      >
        <FilterIcon
          color="silver"
          @click="openPopup"
          :width="40"
          :height="40"
        />
      </div>
    </Teleport>
    <Teleport to="body" v-if="isMobile">
      <AppPopup ref="popup">
        <template #default>
          <div
            class="opacity-1 fixed right-4 top-8 rounded-lg border border-silver bg-gray p-4"
          >
            <AppFilter @filteredItems="changeItemsKit($event)" />
          </div>
        </template>
      </AppPopup>
    </Teleport>
  </main>
</template>

<script setup>
import gsap from 'gsap'
import { ref, computed, onMounted } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import AppFilter from '@/components/AppFilter.vue'
import AppPopup from '@/components/AppPopup.vue'
import { store } from '@/components/composables/store.js'
import {
  onBeforeEnterGroup,
  onEnterGroup,
  onLeaveGroup,
  elTurn,
} from '@/components/composables/transitions'
import { useSizeState } from '@/components/composables/useSizeState'
import FilterIcon from '@/components/icons/FilterIcon.vue'

const items = computed(() => store.entities.items)
if (!items.value.length) await store.setItems('items')

const craftItems = ref(items.value)

/**меняем набор на отфильтрованный */
const changeItemsKit = (filteredItems) => (craftItems.value = filteredItems)

const popup = ref(null)
const openPopup = () => popup.value.open()

const filter = ref(null)
const mobileFilter = ref(null)
const list = ref(null)

onMounted(() => {
  if (filter.value) {
    elTurn({ el: filter.value, transformOrigin: 'right bottom' })
  }
  if (mobileFilter.value) {
    elTurn({ el: mobileFilter.value, transformOrigin: 'right bottom' })
  }

  gsap.from(list.value, {
    duration: 1,
    x: -200,
    autoAlpha: 0,
    ease: 'back.out(1)',
  })
})

const { width } = useSizeState()
const isMobile = computed(() => ['xxs', 'xs', 'sm'].includes(width.value))
</script>
