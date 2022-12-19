<template>
  <main class="flex justify-between pt-4 pb-20">
    <ul>
      <AppCraftItem
        :item="item"
        v-for="item in items
          .filter((item) => item?.parents?.length)
          .sort((a, b) => a.level - b.level)"
        :key="item.id"
      />
    </ul>
    <Teleport to="body" v-if="!isMobile">
      <div
        class="fixed right-8 top-8 rounded bg-gray p-4 opacity-1 border border-silver"
      >
        <AppFilter @filteredItems="changeItemsKit($event)" />
      </div>
    </Teleport>

    <Teleport to="body" v-else>
      <div
        class="fixed right-4 top-4 rounded bg-gray p-2 opacity-1 border border-silver"
      >
        <FilterIcon
          color="silver"
          @click.native="openPopup"
          :width="40"
          :height="40"
        />
        <AppPopup ref="popup" @wheel.stop>
          <template #default>
            <div
              class="fixed right-4 top-8 rounded-lg bg-gray p-4 opacity-1 border border-silver"
            >
              <AppFilter @filteredItems="changeItemsKit($event)" />
            </div>
          </template>
        </AppPopup>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, watch, toRefs, onMounted, nextTick } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import AppFilter from '@/components/AppFilter.vue'
import AppPopup from '@/components/AppPopup.vue'
import { useState } from '@/components/composibles/useState'
import FilterIcon from '@/components/icons/FilterIcon.vue'

const { entities } = await useState({ entity: 'items' })

const emit = defineEmits(['resize'])

const changeItemsKit = (filteredItems) => {
  items.value = filteredItems
  emit('resize')
}
const items = ref(entities)

// фильтр для мобилок
const popup = ref(null)
const openPopup = () => {
  popup.value.open()
}

const props = defineProps({
  appWidth: {
    default: 0,
    type: Number,
  },
})

const { appWidth } = toRefs(props)

const isMobile = ref(false)
watch(appWidth, (e) => {
  isMobile.value = e < 768
})

onMounted(() => nextTick(() => (isMobile.value = appWidth.value < 768)))
</script>
