<script setup>
import BaseItemImageV155 from '@/components/BaseItemImageV155.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])
</script>

<template>
  <button
    type="button"
    :class="[
      'w-full p-3 mb-2 rounded-lg border-2 cursor-pointer text-left transition-all duration-200',
      active
        ? 'bg-purple-600 border-purple-400 shadow-lg'
        : 'bg-gray-700 border-gray-500 hover:bg-gray-600 hover:border-gray-400',
    ]"
    @click="$emit('select', item)"
  >
    <div class="flex items-center gap-3">
      <BaseItemImageV155 :src="item.iconPath" alt="" :size="64" />
      <div class="flex-1 min-w-0">
        <div class="text-white font-semibold text-sm truncate">{{ item.name }}</div>
        <div class="mt-1 flex flex-wrap items-center gap-1">
          <span v-if="item.level" class="text-gray-300 text-xs">Уровень: {{ item.level }}</span>
          <span
            v-for="goblinClass in item.classes"
            :key="goblinClass"
            class="rounded bg-gray-900/60 px-1.5 py-0.5 text-xs text-purple-200"
          >
            {{ goblinClass }}
          </span>
        </div>
      </div>
    </div>
  </button>
</template>
