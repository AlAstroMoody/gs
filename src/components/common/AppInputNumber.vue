<template>
  <div class="flex items-center">
    <button
      @click="modelValue -= 1"
      class="h-5 w-5 rounded-l-lg bg-silver text-black"
    >
      -
    </button>
    <input
      type="number"
      min="0"
      max="20"
      step="1"
      v-model="modelValue"
      class="h-5 w-8 bg-silver text-black"
      :class="modelValue < 0 || modelValue > 9 ? 'p-1' : 'p-2'"
    />
    <button
      @click="modelValue += 1"
      class="h-5 w-5 rounded-r-lg bg-silver text-black"
    >
      +
    </button>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({ value: { default: 0, type: Number } })
const emit = defineEmits(['change'])

const modelValue = computed({
  get() {
    return props.value
  },
  set(newValue) {
    if (newValue > 20) newValue = 20
    emit('change', newValue)
  },
})
</script>
