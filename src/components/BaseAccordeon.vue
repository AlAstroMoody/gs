<script setup>
import { ref } from 'vue'

const isOpen = ref()
</script>
<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="my-4 text-xl font-semibold text-link hover:text-hover hover:underline"
    >
      <slot name="button" />
    </button>

    <div
      ref="abilities"
      class="grid overflow-hidden transition-all bg-silver rounded-xl text-purple"
      :class="isOpen ? 'grid-rows-[1fr] p-2' : 'grid-rows-[0fr]'"
    >
      <div class="min-h-0">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
