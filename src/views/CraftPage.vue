<template>
  <main class="flex w-full justify-between px-2 pt-4 pb-20">
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
        class="opacity-1 fixed right-8 top-8 rounded border border-silver bg-gray p-4"
      >
        <AppFilter @filteredItems="changeItemsKit($event)" />
      </div>
    </Teleport>

    <Teleport to="body" v-else>
      <div
        class="opacity-1 fixed right-4 top-4 rounded border border-silver bg-gray p-2"
      >
        <FilterIcon
          color="silver"
          @click="openPopup"
          :width="40"
          :height="40"
        />
        <AppPopup ref="popup" @wheel.stop>
          <template #default>
            <div
              class="opacity-1 fixed right-4 top-8 rounded-lg border border-silver bg-gray p-4"
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
import { ref, computed } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import AppFilter from '@/components/AppFilter.vue'
import AppPopup from '@/components/AppPopup.vue'
import { useAppState } from '@/components/composibles/useAppState'
import { useState } from '@/components/composibles/useState'
import FilterIcon from '@/components/icons/FilterIcon.vue'

const { entities } = await useState({ entity: 'items' })
const items = ref(entities)

/**меняем набор на отфильтрованный */
const changeItemsKit = (filteredItems) => (items.value = filteredItems)

const popup = ref(null)
const openPopup = () => popup.value.open()

const { width } = useAppState()
const isMobile = computed(() => ['xxs', 'xs', 'sm'].includes(width.value))
</script>
