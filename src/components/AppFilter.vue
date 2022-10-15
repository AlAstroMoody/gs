<template>
  <div
    class="w-full pl-3 px-3 rounded-2xl my-2 flex bg-white-300 border border-solid dark:border-white-400 border-gray-300 ease-out text-gray-500 dark:text-white-400 dark:bg-gray-300"
  >
    <input
      v-model="filterFields.name"
      placeholder=" "
      id="name"
      class="subtitle w-full py-2"
    />
    <label for="name" class="absolute p-2 ease-out duration-300">
      поиск по названию
    </label>
  </div>
  уровень предмета от: {{ Math.round(filterFields.level) }}
  <div class="flex">
    0
    <AppCommonSlider class="" @thumbShift="sliderThumbShift" />
    200
  </div>

  игровой класс:
  <AppCommonSelect
    :data-fg="filteredItems"
    :options="goblins"
    @getOption="goblinSelection"
    default-value="--для всех классов--"
  />
</template>
<script setup>
import { computed, reactive } from 'vue'
import AppCommonSelect from '@/components/common/AppCommonSelect.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { useState } from '@/components/composibles/useState'

// поля фильтрации
const filterFields = reactive({
  name: '',
  level: 0,
  goblins: [],
})

let { entities } = await useState()
console.log(entities)
const goblins = entities.goblins
const items = entities.items

// эмит отфильтрованных артов
const emit = defineEmits(['filteredItems'])
emit('filteredItems', items)

// сдвигаем положение на слайдере
const sliderThumbShift = (distance) => {
  filterFields.level = 200 * distance
}

// добавляем в фильтр текущего гоблина
const goblinSelection = (value) => {
  filterFields.goblins = []
  value.id ? filterFields.goblins.push(value.id) : null
}

// при изменении любого из полей фильтра меняем выборку
const filteredItems = computed(() => {
  let sampleItems = items.value

  if (filterFields.name) {
    sampleItems = sampleItems.filter((item) =>
      item.name.includes(filterFields.name)
    )
  }
  if (filterFields.level) {
    sampleItems = sampleItems.filter((item) =>
      item.level || 0 ? item.level >= filterFields.level : null
    )
  }
  if (filterFields.goblins?.length) {
    sampleItems = sampleItems.filter((item) =>
      item.goblins.some((goblin) => filterFields.goblins[0] === goblin.id)
    )
  }
  emit('filteredItems', sampleItems)
  return sampleItems
})
</script>
