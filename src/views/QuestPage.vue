<script setup>
import { ref, computed, onMounted } from 'vue'

import BigMap from '@/components/BigMap.vue'
import { store } from '@/components/composables/store.js'
import TheModal from '@/components/TheModal.vue'

onMounted(async () => await store.setQuests())

const items = computed(() => store.entities.items)

const findItemFromName = (name) => {
  const item = items.value.find((item) => item.name === name)

  return `/item/${item?.id}`
}

const vkItems = computed(() =>
  items.value
    .filter((item) => item.craft === 'Великая кузница')
    .sort((a, b) => (a.level > b.level ? 1 : -1))
)
const angelItems = computed(() =>
  items.value
    .filter((item) => item.craft === 'Ангельская кузница')
    .sort((a, b) => (a.level > b.level ? 1 : -1))
)
const demonItems = computed(() =>
  items.value
    .filter((item) => item.craft === 'Демоническая кузница')
    .sort((a, b) => (a.level > b.level ? 1 : -1))
)
const demonRecipes = computed(() =>
  items.value.filter((item) => item.source === 'Демон').sort((a, b) => (a.level > b.level ? 1 : -1))
)

const dragonItems = computed(() => items.value.filter((item) => item.source === 'Драконье логово'))

const potions = computed(() =>
  items.value.filter((item) => [578, 187, 186, 185, 562].includes(item.id))
)

const quests = computed(() => store.entities.quests)

const modal = ref(null)
const showMap = () => {
  modal.value.open()
}
</script>

<template>
  <main class="h-screen px-2">
    <div class="pt-2 text-3xl xxl:text-4xl">Квесты</div>
    <div v-if="!quests?.length" class="mt-8">Куда-то потерялись :с</div>
    <div class="flex w-full flex-col gap-4">
      <div v-for="quest in quests" :key="quest.id" class="p-2 last:mb-20">
        <span class="text-xl">{{ quest.name }}</span>
        <div class="rounded bg-silver p-4 px-4 text-lg text-primary opacity-75">
          <div>
            {{ quest.description }}
          </div>
        </div>
        <div class="group mt-2" v-if="quest.help">
          <button class="text-2xl text-orange">+</button>
          <div class="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
            <div class="overflow-hidden text-lg">
              <div class="p-4">
                <div v-if="quest.id === 3">
                  Наконец нам пригодился медик, хотя нет, он по прежнему не нужен. Используем костры
                  инженера, арты с регенерацией и
                  <details>
                    <summary class="text-orange">зелья восстановления здоровья</summary>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        v-for="item in potions"
                        :key="item.id"
                        :to="`/item/${item.id}`"
                        class="text-green"
                      >
                        {{ item.name }}
                      </router-link>
                    </div>
                  </details>
                </div>
                <div v-else-if="quest.id === 4">
                  Страж Кузни опасный противник для новичков, но если одолеете, то сможете крафтить
                  в
                  <span class="text-green">Великой кузнице</span>
                  <details>
                    <summary class="text-orange">кучу крутых шмоток</summary>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        v-for="item in vkItems"
                        :key="item.id"
                        :to="`/item/${item.id}`"
                        class="text-green"
                      >
                        {{ item.name }}
                      </router-link>
                    </div>
                  </details>
                </div>
                <div v-else-if="quest.id === 5">
                  Необходимо найти 3 таблички. Места возможного респауна на
                  <button @click="showMap('blue')" class="text-green">карте</button>(устаревшая
                  инфа)
                </div>

                <div v-else-if="quest.id === 10">
                  Собираем вот эту
                  <router-link :to="findItemFromName('Набор деталей')" class="text-green">
                    хреновину
                  </router-link>
                </div>
                <div v-else-if="quest.id === 12">
                  Будим афкашеров, делаем
                  <router-link :to="findItemFromName('Серебряная пыль')" class="text-green">
                    серебрянную пыль
                  </router-link>
                  , или берем арты для поиска 9 невидимых бочек. ТИК-ТАК МАЗАФАКА!
                </div>
                <div v-else-if="quest.id === 14">
                  Этот чувак при выполнении квеста будет продавать книжки с картинками. А ещё у него
                  можно скрафтить в
                  <span class="text-yellow">Ангельской кузне</span>
                  <details>
                    <summary class="text-orange">вот это барахло</summary>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        v-for="item in angelItems"
                        :key="item.id"
                        :to="`/item/${item.id}`"
                        class="text-green"
                      >
                        {{ item.name }}
                      </router-link>
                    </div>
                  </details>
                </div>
                <div v-else-if="quest.id === 15">
                  Кому нужны книжки, завалите Ангела и сможете купить
                  <details>
                    <summary class="text-orange">крутые рецепты</summary>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        v-for="item in demonRecipes"
                        :key="item.id"
                        :to="`/item/${item.id}`"
                        class="text-green"
                      >
                        {{ item.name }}
                      </router-link>
                    </div>
                  </details>
                  и скрафтить в
                  <span class="text-red">Демонической кузнице</span>
                  <details>
                    <summary class="text-orange">еще более крутые арты</summary>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        v-for="item in demonItems"
                        :key="item.id"
                        :to="`/item/${item.id}`"
                        class="text-green"
                      >
                        {{ item.name }}
                      </router-link>
                    </div>
                  </details>
                </div>
                <div v-else-if="quest.id === 16">
                  Инженер ещё живой? Пусть крафтит
                  <router-link :to="findItemFromName('Голосовой модуль')" class="text-green">
                    голосовой модуль
                  </router-link>
                </div>
                <div v-else-if="quest.id === 19">
                  Хм, вы убили одного слабенького дракона? Попробуйте убить сильного! А в награду
                  получите доступ к
                  <details>
                    <summary class="text-orange">куче рецептов</summary>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        v-for="item in dragonItems"
                        :key="item.id"
                        :to="`/item/${item.id}`"
                        class="text-green"
                      >
                        {{ item.name }}
                      </router-link>
                    </div>
                  </details>
                  Внимание! Стоимость рецептов от полумиллиона гоблинских тугриков
                </div>
                <div v-else>{{ quest.help }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheModal ref="modal">
      <template #default>
        <BigMap class="absolute inset-0 z-10 flex w-fit flex-col gap-2 rounded m-auto" />
      </template>
    </TheModal>
  </main>
</template>
