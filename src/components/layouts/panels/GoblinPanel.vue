<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { convertWarcraftUrl } from '@/common/imageUtils'
import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'
import { usePanelPositioning } from '@/components/composables/usePanelPositioning'
import { useTooltipManagement } from '@/components/composables/useTooltipManagement'

const router = useRouter()
const { user, setGoblin } = useGoblinState()
const { getGoblinStyle, isActive, getActiveClasses } = usePanelPositioning()
const { showTooltip, hideTooltip } = useTooltipManagement()

const goblins = computed(() => store.entities.goblins)

function chooseGoblin(goblin) {
  setGoblin(goblin)
  router.push({ name: 'home', query: { goblin: goblin.name } })
}
</script>

<template>
  <div class="absolute z-10 ml-96 w-lg left-9 -bottom-16">
    <!-- гоблины -->
    <button
      @click="chooseGoblin(goblin)"
      v-for="(goblin, index) in goblins"
      :key="goblin.id"
      :style="getGoblinStyle(index)"
      class="group transition-all duration-200 hover:scale-105"
      @mouseenter="showTooltip(goblin.name, $event)"
      @mouseleave="hideTooltip"
    >
      <img
        :src="convertWarcraftUrl(goblin.url)"
        class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_16px_gold]"
        :class="getActiveClasses(isActive(goblin, user.goblin))"
      />
    </button>
  </div>
</template>
