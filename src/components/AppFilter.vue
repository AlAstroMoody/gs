<template>
  <div
    class="my-2 flex w-full rounded-2xl border border-solid border-second bg-gray px-3 pl-3 text-second ease-out"
  >
    <input
      v-model="filterFields.name"
      placeholder=" "
      id="input"
      class="relative z-10 w-full py-4"
      @input="searchItem($event)"
    />
    <label for="input" class="absolute p-2 duration-300 ease-out">
      поиск по названию
    </label>
  </div>
  уровень предмета от: {{ Math.round(filterFields.level) }}
  <div class="flex items-center">
    0
    <AppCommonSlider
      @thumbShift="sliderThumbShift"
      class="mx-1"
      custom="bg-silver"
    />
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
import { reactive, computed } from 'vue'

import AppCommonSelect from '@/components/common/AppCommonSelect.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { store } from '@/components/composibles/store.js'

// поля фильтрации
const filterFields = reactive({
  name: '',
  level: 0,
  goblins: [],
})

const items = computed(() => store.entities.items)
if (!items.value.length) await store.setItems('items')

const goblins = computed(() => store.entities.goblins)
if (!goblins.value.length) await store.setItems('goblins')

// эмит отфильтрованных артов
const emit = defineEmits(['filteredItems'])
emit('filteredItems', items.value)

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
  let sampleItems = items.value

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
