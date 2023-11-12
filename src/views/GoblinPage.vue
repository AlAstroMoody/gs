<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'

const { setGoblin } = useGoblinState()

const route = useRoute()

const goblin = computed(() => store.entities.goblins.find((g) => g.id === +route.params.id))

onMounted(() => (goblin.value ? setGoblin(goblin.value) : null))
watch(goblin, () => (goblin.value ? setGoblin(goblin.value) : null))
</script>

<template>
  <main v-if="goblin" class="flex h-full">
    <div
      class="w-1/3 animate-leftToRight rounded-r-xl border border-l-0 border-second p-4 text-2xl h-fit"
    >
      {{ goblin.description }}
    </div>
    <div class="mx-auto">
      <div v-for="skill in 5" :key="skill">{{ skill }} skill</div>
    </div>
  </main>
</template>
