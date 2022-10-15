<template>
  <main>
    <div v-for="boss in entities" :key="boss.id" class="mb-8">
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
import { useState } from '@/components/composibles/useState'

const { entities } = await useState({ entity: 'bosses' })
</script>
