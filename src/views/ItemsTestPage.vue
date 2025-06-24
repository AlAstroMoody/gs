<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import AppCraftTestItem from '@/components/AppCraftTestItem.vue'
import BaseAccordeon from '@/components/BaseAccordeon.vue'
import BaseItemImage from '@/components/BaseItemImage.vue'
import { store } from '@/components/composables/store.js'
import ItemsTree from '@/components/ItemsTree.vue'
import ThePreloader from '@/components/ThePreloader.vue'

const router = useRouter()
const route = useRoute()

const items = computed(() => store.entities.items)
const activeItem = ref(null)

function replacedDesc(desc) {
  return desc.replaceAll('|n', '<br/>').replaceAll('<br/><br/>', '')
}

const search = ref('')
const luck = ref(false)
const upSort = ref(false)

const filteredItems = computed(() => {
  if (!items.value?.length) return []
  let arr = items.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )

  if (luck.value) arr = arr.filter((item) => item.desc.includes('Удача'))

  if (!upSort.value) arr = arr.sort((a, b) => b.level - a.level)
  else arr = arr.sort((a, b) => a.level - b.level)

  return arr
})

const futureCraft = computed(() => {
  if (!items.value?.length) return []

  return items.value.filter((item) => item.craft.some((c) => c.code === activeItem.value?.code))
})

function setActiveItem(el) {
  const item = items.value.find((item) => item.code === el.code)
  if (item) activeItem.value = item
  changeRoute(item.name)
}

function changeItem(el) {
  activeItem.value = el
  changeRoute(el.name)
}

function changeRoute(name) {
  router.push({ name: 'craft', query: { name } })
}

function openItemDesc() {
  if (!items.value.length) return
  activeItem.value = items.value.find((item) => item.name === route.query.name)
}

const isShowItemTree = ref(false)
onMounted(() => {
  if (route.query.name) openItemDesc()
})

watch(
  () => route.query.name,
  () => {
    openItemDesc()
    isShowItemTree.value = false
  }
)

watch(items, () => {
  openItemDesc()
})
</script>
<template>
  <ThePreloader v-if="!items.length" class="mt-20" />
  <main class="flex w-full max-h-screen gap-4 h-full pr-8 z-20 overflow-hidden">
    <div class="w-1/2">
      <div class="scrollbar-custom h-full">
        <AppCraftTestItem
          class="pl-2"
          v-for="item in filteredItems"
          :key="item.code"
          :item="item"
          @choice="changeItem($event)"
          :count="item.count"
        />
      </div>
    </div>

    <div class="w-1/3 pt-14">
      <div
        class="my-2 flex w-80 rounded-2xl border border-solid border-second bg-gray px-3 pl-3 text-second ease-out ml-auto"
      >
        <input
          autocomplete="off"
          v-model="search"
          placeholder=" "
          id="input"
          class="relative z-10 w-full py-4"
        />
        <label for="input" class="absolute p-2 duration-300 ease-out"> поиск по названию </label>
      </div>
      <label class="my-1 flex items-end text-right">
        <span class="ml-auto">с удачей</span>
        <input type="checkbox" class="ml-2 h-5 w-5 bg-silver accent-green" v-model="luck" />
      </label>
      <label class="my-1 flex items-end text-right">
        <span class="ml-auto">по возрастанию уровня</span>
        <input type="checkbox" class="ml-2 h-5 w-5 bg-silver accent-green" v-model="upSort" />
      </label>
    </div>

    <div class="w-1/2 pt-8">
      <div class="p-4 bg-silver text-black rounded-2xl pl-8" v-if="activeItem">
        <div class="text-xl pb-4 flex justify-between leading-5">
          {{ activeItem.name }}
          <span class="text-purple" v-if="activeItem.level !== '0'">
            {{ activeItem.level }} lvl
          </span>
        </div>
        <button @click="isShowItemTree = true" class="bg-purple text-white px-4 py-2 rounded-md">
          Эксперимент
        </button>
        <div v-html="replacedDesc(activeItem.desc)" />

        <BaseAccordeon v-if="activeItem.extended" class="-my-4">
          <template v-slot:button>Подробнее</template>
          <template v-slot:content>
            <div v-html="replacedDesc(activeItem.extended)" class="leading-5"></div>
          </template>
        </BaseAccordeon>
      </div>

      <div v-if="futureCraft.length" class="scrollbar-custom h-[calc(100%-100px)]">
        <div class="py-2 text-xl">Используется в:</div>
        <div class="flex flex-wrap gap-2 pl-8">
          <div v-for="item in futureCraft" :key="item.code" class="group relative">
            <button class="mr-2 mb-1 flex gap-2 items-center" @click="setActiveItem(item)">
              <BaseItemImage :url="item.src" />
              <div
                class="group-hover:block hidden absolute -left-8 -top-11 w-fit bg-silver text-purple rounded-md py-2 px-4 border border-purple z-10 min-w-max max-w-36"
              >
                {{ item.name }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ItemsTree
      :item="activeItem"
      v-if="isShowItemTree"
      @close="isShowItemTree = false"
      class="z-20"
    />
  </main>
</template>
