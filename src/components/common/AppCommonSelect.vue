<template>
  <div class="select">
    <div class="select__value" @click="selectClick">
      {{ currentValue?.name || defaultValue }}
    </div>
    <div class="select__options" v-if="isSelectClick">
      <div
        v-for="option in filteredOptions"
        :key="option.id"
        @click="selectValue(option.id)"
        class="select__option"
      >
        {{ option.name || option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { CommonSelect } from '@/common/interfaces'

const emit = defineEmits(['getOption'])
const props = defineProps({
  options: {
    default: (): CommonSelect[] => [],
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
const selectValue = (id: number) => {
  removeHandler()
  isSelectClick.value = !isSelectClick.value
  if (id || id === 0) {
    currentValue.value = props.options.find(
      (option) => option?.id === id
    ) as CommonSelect
  } else {
    currentValue.value = { name: props.defaultValue, id: undefined }
  }
  emit('getOption', currentValue.value)
}

const currentValue = ref<CommonSelect>({ name: '', id: 0 })

const addHandler = () => {
  window.addEventListener('click', changeOptionsVisibility)
}
const removeHandler = () => {
  window.removeEventListener('click', changeOptionsVisibility)
}
</script>

<style scoped lang="scss">
.select {
  border: 1px solid var(--color-text);
  color: var(--color-text);
  background: var(--color-background-soft);
  border-radius: 16px;
  padding: 8px;

  &__options {
    color: var(--color-text);
    opacity: 1;
  }

  &__value {
    cursor: url(/src/assets/images/cursor_gauntlet.png), auto;

    &:hover {
      cursor: url(/src/assets/images/cursor_gauntlet2.png), auto;
    }
  }

  &__option {
    width: max-content;
    cursor: url(/src/assets/images/cursor_gauntlet2.png), auto;
    padding: 0 8px;

    &:after {
      width: 0;
      @include transition(all);
    }

    &:hover {
      background: var(--color-text);
      border-radius: 4px;
      color: var(--color-background);

      &:after {
        border-bottom: 1px solid var(--color-border-hover);
        content: '';
        position: absolute;
        width: 100%;
        inset: 4px 0;
      }
    }
  }
}
</style>
