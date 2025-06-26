<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useGoblinState } from '@/components/composables/useGoblinState'
import { usePanelPositioning } from '@/components/composables/usePanelPositioning'
import { useTooltipManagement } from '@/components/composables/useTooltipManagement'
import ExitIcon from '@/components/icons/ExitIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const route = useRoute()
const { user } = useGoblinState()
const { getItemStyle, isActive, getActiveClasses } = usePanelPositioning()
const { showTooltip, hideTooltip } = useTooltipManagement()

const items = computed(() => user.inventory)
const activeItem = ref(null)

const removeItem = (index) => {
  useGoblinState().removeItem(index)
  activeItem.value = null
}
</script>

<template>
  <div class="absolute z-10 ml-256 w-lg h-full top-[82px]">
    <!-- инвентарь -->
    <RouterLink
      v-for="(item, index) in items"
      :to="`/item/${item.id}`"
      :key="item.id"
      :style="getItemStyle(index)"
      class="group transition-all duration-200 hover:scale-105"
      @mouseenter="showTooltip(item.name, $event)"
      @mouseleave="hideTooltip"
    >
      <button
        class="group-hover:block hidden absolute -top-2 -right-2 z-10"
        @click="removeItem(index)"
      >
        <ExitIcon
          color="white"
          :width="24"
          :height="24"
          class="hover:rotate-90 transition-all bg-red-500 rounded-full p-1"
        />
      </button>
      <img
        v-if="item.src"
        :src="item.src"
        class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_12px_gold]"
        :class="getActiveClasses(isActive(item, { id: +route.params.id }))"
      />
      <div
        v-else
        class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_12px_gold] bg-silver flex items-center justify-center"
        :class="getActiveClasses(isActive(item, { id: +route.params.id }))"
      >
        <QuestionIcon class="m-auto" />
      </div>
    </RouterLink>
  </div>
</template>
