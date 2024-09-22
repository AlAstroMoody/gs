<script setup>
import { onMounted, computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

import BaseButton from '@/components/BaseButton.vue'
import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'

const { setGoblin } = useGoblinState()

const route = useRoute()

const goblin = computed(() => store.entities.goblins.find((g) => g.id === +route.params.id))

const activeSkill = ref({})
onMounted(() => chooseGoblin())
watch(goblin, () => chooseGoblin())

const chooseGoblin = () => {
  if (goblin.value) {
    setGoblin(goblin.value)
    if (goblin.value?.abilities) activeSkill.value = goblin.value?.abilities[0]
  }
}

const skillStyle = (index) => `animation-delay: ${index / 8 + 0.1}s`
</script>

<template>
  <main v-if="goblin" class="flex h-full gap-4">
    <div
      class="w-1/3 animate-leftToRight rounded-r-xl border border-l-0 border-second p-4 text-2xl h-fit"
    >
      {{ goblin.description }}
    </div>
    <div class="mx-auto w-2/3 mt-20">
      <div class="flex gap-2">
        <div v-for="(skill, index) in goblin.abilities" :key="skill" class="mb-2">
          <BaseButton
            @click="activeSkill = skill"
            :style="skillStyle(index)"
            class="flex items-center gap-2 animate-skill"
            :text="skill.name"
            :border="activeSkill?.id === skill.id ? 'purple' : ''"
          />
        </div>
      </div>
      <div
        v-if="activeSkill?.description"
        class="rounded-r-xl border border-second p-4 mb-2 bg-primary"
      >
        <div v-html="activeSkill.description" />
        <div v-if="activeSkill.cd" class="text-green">кд: {{ activeSkill.cd }} сек</div>
        <div v-if="activeSkill.dur" class="text-purple">
          длительность: {{ activeSkill.dur }} сек
        </div>
        <div v-if="activeSkill.mc" class="text-red">манакост: {{ activeSkill.mc }} маны</div>
      </div>
    </div>
  </main>
</template>
