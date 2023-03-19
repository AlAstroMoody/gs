<template>
  <div class="rounded-2xl border border-silver bg-gray p-2">
    <label class="block w-full" @click="selectClick">
      {{ currentValue?.name || defaultValue }}
    </label>
    <div class="opacity-100" v-if="isSelectClick" ref="select">
      <label
        v-for="option in filteredOptions"
        :key="option.id"
        @click="selectValue(option.id)"
        class="block w-full py-0 px-2 transition-all hover:bg-second hover:text-primary"
      >
        {{ option.name || option }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

const emit = defineEmits(['getOption'])
const props = defineProps({
  options: {
    default: () => [],
    type: Array,
  },
  defaultValue: {
    default: 'выберите значение',
    type: String,
  },
})

const filteredOptions = computed(() => {
  return [{ name: props.defaultValue }]
    .concat(props.options)
    .filter((option) => option.name !== currentValue.value?.name)
})

const isSelectClick = ref(false)

const selectClick = () => {
  isSelectClick.value = !isSelectClick.value
}
const selectValue = (id) => {
  isSelectClick.value = !isSelectClick.value
  if (id || id === 0) {
    currentValue.value = props.options.find((option) => option?.id === id)
  } else {
    currentValue.value = { name: props.defaultValue, id: undefined }
  }
  emit('getOption', currentValue.value)
}

const currentValue = ref({ name: '', id: 0 })

const select = ref(null)
onClickOutside(select, () => (isSelectClick.value = !isSelectClick.value))
</script>
