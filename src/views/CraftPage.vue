<template>
  <main class="mb-8">
    <ul>
      <AppCraftItem
        :item="item"
        v-for="item in entities
          .filter((item) => item?.parents?.length)
          .sort((a, b) => a.level - b.level)"
        :key="item.id"
      />
    </ul>
  </main>
</template>

<script setup>
import AppCraftItem from '@/components/AppCraftItem.vue'
import { useState } from '@/components/composibles/useState'

const { entities } = await useState({ entity: 'items' })
</script>
