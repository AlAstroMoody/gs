<template>
  <div>
    <div class="filters">

      <div class="filters__name">
        <input v-model="filterFields.name" placeholder=" " id="name" class="subtitle">
        <label for="name">
          поиск по названию
        </label>
      </div>

      уровень предмета от: {{ Math.round(filterFields.level) }}
      <div class="filters__level">
        0
        <AppCommonSlider class="filters__slider" @thumbShift="sliderThumbShift" />
        200
      </div>

      игровой класс:
      <AppCommonSelect :options="goblins" @getOption="classSelection" default-value="--игровой класс--" />

    </div>
    <div class="sidebar__body">
      <AppCommonScrollbar :block-height="blockHeight" :block-transform-y="blockTransformY.value" />
      <div class="sidebar__items" ref="itemsBlock">
        <AppItemLine v-for="item in filteredItems" :key="item.id" :item="item" />
      </div>
      <div v-if="!filteredItems.length" class="sidebar__items_empty">совпадений не найдено</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import AppCommonScrollbar from '@/components/common/AppCommonScrollbar.vue'
import AppItemLine from '@/components/AppItemLine.vue'

import wheelLogic from '@/utils/wheelLogic'
import { useItemsStore } from '@/stores/items'
import { useGoblinsStore } from '@/stores/goblins'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import AppCommonSelect from '@/components/common/AppCommonSelect.vue'


const itemsStore = useItemsStore()
const items = computed(() => itemsStore.allItems)

const goblinsStore = useGoblinsStore()
const goblins = computed(() => goblinsStore.allGoblins)


const filterFields = reactive({
  name: '',
  level: 0,
  class: null,
})

const filteredItems = computed(() => {
  let sampleItems = items.value
  if (filterFields.name) {
    sampleItems = sampleItems.filter(item => item.name.includes(filterFields.name))
  }
  if (filterFields.level) {
    sampleItems = sampleItems.filter(item => item.level >= filterFields.level)
  }
  if (filterFields.class) {
    sampleItems = sampleItems.filter(item =>
      item.class.some(c => c === filterFields.class),
    )
  }

  return sampleItems
})

const itemsBlock = ref<HTMLElement | null>(null)
const blockHeight = computed(() =>
  itemsBlock.value?.scrollHeight - itemsBlock.value?.clientHeight,
)


// TODO make Resize & filter changes, debounce
const blockTransformY = computed(() => itemsBlock.value?.clientHeight
  ? wheelLogic(itemsBlock.value).currentYPosition : 0,
)

const sliderThumbShift = (distance) => {
  filterFields.level = 200 * distance
}

const classSelection = (value) => {
  filterFields.class = value?.id ?  value.id : null
}

</script>

<style scoped lang="scss">
.sidebar {
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  transform: translateY(-100%);
  animation: sidebar 1s ease-in forwards;
  animation-delay: 0.3s;
  overflow: hidden;

  &__body {
    justify-content: space-between;
    display: flex;
    overflow: hidden;
    opacity: 0;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.8s;
    height: 100%;
  }

  &__items {
    position: relative;
    z-index: 1;
    height: 100%;
    transition: all 1s ease-out;
    flex: 1;
    margin-left: 8px;

    &_empty {
      width: 100%;
      text-align: center;
    }
  }
}

.filters {
  width: 100%;
  background: var(--color-background);
  min-height: 300px;
  position: relative;
  z-index: 2;
  opacity: 0;
  animation: opacity 1s ease-out forwards;
  animation-delay: 1.6s;
  border-radius: 16px;
  border: 1px solid var(--color-text);
  margin: 8px 0;
  padding: 8px;

  &__name {
    width: 100%;
    padding: 12px;
    background: var(--color-background-soft);
    border-radius: 16px;
    margin: 8px 0;
    display: flex;

    label {
      position: absolute;
      inset: 0 auto;
      padding: 8px;
      transition: 0.2s all ease-in-out;
    }

    input {
      color: var(--color-text);
      width: 100%;
    }
  }

  &__level {
    display: flex;
    align-items: center;
  }

  &__slider {
    margin: 0 4px;
  }
}

@keyframes sidebar {
  from {
    transform: translateY(-100%)
  }
  to {
    transform: translateY(0)
  }
}

</style>