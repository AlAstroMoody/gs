<template>
  <div
    class="w-full pl-3 px-3 rounded-2xl my-2 flex border border-solid border-second ease-out text-second bg-gray"
  >
    <input
      v-model="filterFields.name"
      placeholder=" "
      id="input"
      class="w-full py-4 relative z-10"
      @input="searchItem($event)"
    />
    <label for="input" class="absolute p-2 ease-out duration-300">
      поиск по названию
    </label>
  </div>
  уровень предмета от: {{ Math.round(filterFields.level) }}
  <div class="flex">
    0
    <AppCommonSlider @thumbShift="sliderThumbShift" />
    200
  </div>

  игровой класс:
  <AppCommonSelect
    :options="goblins"
    @getOption="goblinSelection"
    default-value="--для всех классов--"
  />
</template>
<script setup>
import { reactive } from 'vue'

import AppCommonSelect from '@/components/common/AppCommonSelect.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { useState } from '@/components/composibles/useState'

// поля фильтрации
const filterFields = reactive({
  name: '',
  level: 0,
  goblins: [],
})

const { entities } = await useState()

const goblins = entities.goblins
const items = entities.items

// эмит отфильтрованных артов
const emit = defineEmits(['filteredItems'])
emit('filteredItems', items)

// сдвигаем положение на слайдере
const sliderThumbShift = (distance) => {
  filterFields.level = 200 * distance
  getItemsSample()
}

// добавляем в фильтр текущего гоблина
const goblinSelection = (value) => {
  filterFields.goblins = []
  // теряем реактивность
  value.id ? filterFields.goblins.push(value.id) : null
  getItemsSample()
}

const searchItem = (event) => {
  filterFields.name = event.target.value
  getItemsSample()
}

// при изменении любого из полей фильтра меняем выборку
const getItemsSample = () => {
  let sampleItems = items

  if (filterFields.name) {
    sampleItems = sampleItems.filter((item) =>
      item.name.toLowerCase().includes(filterFields.name.toLowerCase())
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
}
</script>
