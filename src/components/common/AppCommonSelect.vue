<template>
  <div class="bg-gray rounded-2xl p-2 border-silver border">
    <label class="w-full block" @click="selectClick">
      {{ currentValue?.name || defaultValue }}
    </label>
    <div class="opacity-100" v-if="isSelectClick">
      <label
        v-for="option in filteredOptions"
        :key="option.id"
        @click="selectValue(option.id)"
        class="py-0 px-2 w-full block transition-all hover:text-primary hover:bg-second"
      >
        {{ option.name || option }}
      </label>
    </div>
  </div>
</template>

<script setup>
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
const changeOptionsVisibility = () => {
  isSelectClick.value = !isSelectClick.value
  !isSelectClick.value ? removeHandler() : null
}

const selectClick = () => (isSelectClick.value ? null : addHandler())
const selectValue = (id) => {
  removeHandler()
  isSelectClick.value = !isSelectClick.value
  if (id || id === 0) {
    currentValue.value = props.options.find((option) => option?.id === id)
  } else {
    currentValue.value = { name: props.defaultValue, id: undefined }
  }
  emit('getOption', currentValue.value)
}

const currentValue = ref({ name: '', id: 0 })

const addHandler = () => {
  window.addEventListener('click', changeOptionsVisibility)
}
const removeHandler = () => {
  window.removeEventListener('click', changeOptionsVisibility)
}
</script>
