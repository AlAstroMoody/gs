<script setup>
import { reactive, computed, watch } from 'vue'

import AppCommonSelect from '@/components/common/AppCommonSelect.vue'
import RangeSlider from '@/components/common/RangeSlider.vue'
import { store } from '@/components/composables/store.js'

const emit = defineEmits(['filteredItems'])

const items = computed(() => store.entities.items)
const goblins = computed(() => store.entities.goblins)
const maxLevel = computed(() => store.maxLevel)

// поля фильтрации
const filterFields = reactive({
  name: '',
  level: [0, maxLevel.value],
  goblins: [],
  luck: false,
  stealth: false,
  allGoblinitems: false,
  speed: false,
  up: false,
})

// сдвигаем положение на слайдере
const sliderThumbShift = (distance) => {
  filterFields.level = distance
  getItemsSample()
}

// добавляем в фильтр текущего гоблина
const goblinSelection = (value) => {
  filterFields.goblins = []
  value.id ? filterFields.goblins.push(value.name) : null
}

const searchItem = (event) => {
  filterFields.name = event.target.value
}

// при изменении любого из полей фильтра меняем выборку
const getItemsSample = () => {
  let sampleItems = items.value

  if (filterFields.name) {
    sampleItems = sampleItems.filter((item) =>
      item.name.toLowerCase().includes(filterFields.name.toLowerCase())
    )
  }

  sampleItems = sampleItems.filter(
    (item) =>
      Number(filterFields.level[1]) >= (item.level || 0) &&
      (item.level || 0) >= Number(filterFields.level[0])
  )

  if (filterFields.allGoblinitems) {
    sampleItems = sampleItems.filter(
      (item) =>
        item.goblins?.some((goblin) => filterFields.goblins[0] === goblin) || !item.goblins?.length
    )
  } else if (filterFields.goblins?.length) {
    sampleItems = sampleItems.filter((item) =>
      item.goblins?.some((goblin) => filterFields.goblins[0] === goblin)
    )
  }
  if (filterFields.luck) {
    sampleItems = sampleItems.filter((item) => item?.params?.luck)
  }
  if (filterFields.ms) {
    sampleItems = sampleItems.filter((item) => item?.params?.ms)
  }
  if (filterFields.stealth) {
    sampleItems = sampleItems.filter((item) => item?.params?.stealth_detection)
  }

  sampleItems = sampleItems.sort((a, b) =>
    a.level > b.level ? (filterFields.up ? 1 : -1) : filterFields.up ? -1 : 1
  )

  emit('filteredItems', sampleItems)
}

watch(filterFields, () => getItemsSample())
watch(items, () => emit('filteredItems', items.value))
</script>

<template>
  <div>
    <div
      class="my-2 flex w-full rounded-2xl border border-solid border-second bg-gray px-3 pl-3 text-second ease-out"
    >
      <input
        autocomplete="off"
        v-model="filterFields.name"
        placeholder=" "
        id="input"
        class="relative z-10 w-full py-4"
        @input="searchItem($event)"
      />
      <label for="input" class="absolute p-2 duration-300 ease-out"> поиск по названию </label>
    </div>
    уровень предмета от: {{ Math.round(filterFields.level[0]) }} до:
    {{ Math.round(filterFields.level[1]) }}
    <div class="mx-5 my-1">
      <RangeSlider
        :value="filterFields.level"
        :range="{ min: 0, max: maxLevel }"
        @change="sliderThumbShift"
      />
    </div>
    игровой класс:
    <AppCommonSelect
      :options="goblins"
      @getOption="goblinSelection"
      default-value="--для всех классов--"
    />
    <label class="my-1 flex items-center">
      <input
        :disabled="!filterFields.goblins[0]"
        type="checkbox"
        class="mr-2 h-5 w-5 bg-silver accent-black"
        v-model="filterFields.allGoblinitems"
      />
      всё для {{ filterFields.goblins[0] || 'выбранного класс' }}а
    </label>
    <label class="my-1 flex items-center">
      <input
        type="checkbox"
        class="mr-2 h-5 w-5 bg-silver accent-black"
        v-model="filterFields.luck"
      />
      с удачей
    </label>
    <label class="my-1 flex items-center">
      <input
        type="checkbox"
        class="mr-2 h-5 w-5 bg-silver accent-black"
        v-model="filterFields.stealth"
      />
      обнаружение невидимок
    </label>
    <label class="my-1 flex items-center">
      <input
        type="checkbox"
        class="mr-2 h-5 w-5 bg-silver accent-black"
        v-model="filterFields.ms"
      />
      быстрее бегать
    </label>
    <label class="my-1 flex items-center">
      <input
        type="checkbox"
        class="mr-2 h-5 w-5 bg-silver accent-black"
        v-model="filterFields.up"
      />
      по возрастанию уровня
    </label>
  </div>
</template>
