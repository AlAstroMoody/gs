<script setup>
import { useRoute } from 'vue-router'

import { convertWarcraftUrl } from '@/common/imageUtils'
import { useGoblinState } from '@/components/composables/useGoblinState'
import { usePanelPositioning } from '@/components/composables/usePanelPositioning'
import { useTooltipManagement } from '@/components/composables/useTooltipManagement'

const route = useRoute()
const { user, setSkill } = useGoblinState()
const { getSkillStyle, isActive, getActiveClasses } = usePanelPositioning()
const { showTooltip, hideTooltip } = useTooltipManagement()

function setActiveSkill(skill) {
  setSkill(skill)
}
</script>

<template>
  <div class="absolute z-10 ml-256 w-lg h-full top-[82px]">
    <!-- скилы -->
    <template v-if="route.query.goblin">
      <button
        @click="setActiveSkill(skill)"
        v-for="(skill, index) in user.goblin.abilities"
        :key="skill.id"
        :style="getSkillStyle(index)"
        class="group transition-all duration-200 hover:scale-105"
        @mouseenter="showTooltip(skill.name, $event)"
        @mouseleave="hideTooltip"
      >
        <img
          :src="convertWarcraftUrl(skill.url)"
          class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_16px_gold]"
          :class="getActiveClasses(isActive(skill, user.activeSkill))"
        />
      </button>
    </template>
  </div>
</template>
