<template>
  <main>
    <div v-for="boss in bosses" :key="boss.id" class="mb-8">
      <div class="subtitle">{{ boss.name }}</div>
      <div class="my-4">волна №{{ boss.wave }}</div>
      <div>
        Дроп:
        <div v-for="item in boss.items" :key="item.id" class="ml-4">
          <router-link :to="`/item/${item.id}`" class="link">
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'

import { useBossStore } from '@/stores/bosses'

const goblinsStore = useBossStore()

// все боссы
const bosses = computed(() => goblinsStore.allBosses)
</script>
