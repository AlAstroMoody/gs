<script setup>
import { ref } from 'vue'

const isOpen = ref()
</script>
<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="my-4 w-full text-left text-xl font-semibold text-link hover:text-hover hover:bg-gray-50 rounded-lg p-3 transition-all duration-200 flex items-center"
    >
      <svg
        class="w-5 h-5 transition-transform duration-200 mr-2"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
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
