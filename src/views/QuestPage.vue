<template>
  <main class="h-screen px-2">
    <div class="headline pt-2">Квесты</div>
    <button @click="showMap('green')" class="absolute right-4 top-4">
      <BinocularsIcon :width="64" color="silver" />
    </button>
    <Teleport to="body" v-if="isShowMap">
      <div
        class="absolute inset-0 flex h-screen flex-col bg-gray bg-opacity-75"
      >
        <div
          class="absolute left-0 top-0 z-10 flex w-fit flex-col gap-2 rounded bg-silver p-2 text-silver"
          ref="map"
        >
          <button
            @click="eventColor = 'red'"
            class="rounded bg-primary px-2"
            :class="{ 'text-red': eventColor === 'red' }"
          >
            Бочки
          </button>
          <button
            @click="eventColor = 'green'"
            class="rounded bg-primary px-2"
            :class="{ 'text-green': eventColor === 'green' }"
          >
            Кобольд
          </button>
          <button
            @click="eventColor = 'blue'"
            class="rounded bg-primary px-2"
            :class="{ 'text-blue': eventColor === 'blue' }"
          >
            Таблички
          </button>
        </div>
        <TheMap :color="eventColor" class="m-auto w-full" />
      </div>
    </Teleport>
    <button
      v-for="(quest, index) in quests"
      @click="activeQuest = index"
      :key="index"
      class="mx-2 my-4 whitespace-nowrap text-lg text-green opacity-75 lg:text-2xl"
      :class="{ ' underline': index === activeQuest }"
    >
      {{ quest.name }}
    </button>
    <div
      class="flex max-h-[calc(100%-200px)] w-full flex-col gap-4 overflow-y-auto md:w-9/12"
    >
      <div
        v-for="quest in quests[activeQuest]?.steps"
        :key="quest.id"
        class="p-2 last:mb-20"
      >
        <span class="text-xl">{{ quest.name }}</span>
        <div class="rounded bg-silver p-4 px-4 text-lg text-primary opacity-75">
          <div>
            {{ quest.description }}
          </div>
        </div>
        <div class="group mt-2" v-if="quest.help">
          <button class="text-2xl text-orange">+</button>
          <div
            class="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]"
          >
            <div class="overflow-hidden text-lg">
              <div class="p-4">
                <div v-if="quest.id === 0">
                  Необходимо найти Гигантского Мурлока и отобрать у него
                  снаряжение. А если повезёт, то из его мяса можно собрать
                  <router-link
                    :to="findItemFromName('Жракодел-700')"
                    class="text-green"
                  >
                    Жракодел-700
                  </router-link>
                </div>
                <div v-else-if="quest.id === 3">
                  Наконец нам пригодился медик, хотя нет, он по прежнему не
                  нужен. Используем костры инженера, арты с регенерацией и
                  <details>
                    <summary class="text-orange">
                      зелья восстановления здоровья
                    </summary>
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
                  Страж Кузни опасный противник для новичков, но если одолеете,
                  то сможете крафтить в
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
                  <button @click="showMap('blue')" class="text-green">
                    карте
                  </button>
                </div>

                <div v-else-if="quest.id === 10">
                  Собираем вот эту
                  <router-link
                    :to="findItemFromName('Набор деталей')"
                    class="text-green"
                  >
                    хреновину
                  </router-link>
                </div>
                <div v-else-if="quest.id === 12">
                  Будим афкашеров, делаем
                  <router-link
                    :to="findItemFromName('Серебряная пыль')"
                    class="text-green"
                  >
                    серебрянную пыль
                  </router-link>
                  , или берем арты для поиска 9 невидимых бочек. ТИК-ТАК
                  МАЗАФАКА!
                </div>
                <div v-else-if="quest.id === 14">
                  Этот чувак при выполнении квеста будет продавать книжки с
                  картинками. А ещё у него можно скрафтить в
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
                  <router-link
                    :to="findItemFromName('Голосовой модуль')"
                    class="text-green"
                  >
                    голосовой модуль
                  </router-link>
                </div>
                <div v-else-if="quest.id === 19">
                  Хм, вы убили одного слабенького дракона? Попробуйте убить
                  сильного! А в награду получите доступ к
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
                  Внимание! Стоимость рецептов от полумиллиона гоблинских
                  тугриков
                </div>
                <div v-else>{{ quest.help }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'

import { store } from '@/components/composables/store.js'
import BinocularsIcon from '@/components/icons/BinocularsIcon.vue'
import TheMap from '@/components/TheMap.vue'

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
  items.value
    .filter((item) => item.source === 'Демон')
    .sort((a, b) => (a.level > b.level ? 1 : -1))
)

const dragonItems = computed(() =>
  items.value.filter((item) => item.source === 'Драконье логово')
)

const potions = computed(() =>
  items.value.filter((item) => [578, 187, 186, 185, 562].includes(item.id))
)

const activeQuest = ref(0)

const quests = computed(() => store.entities.quests)

const map = ref(null)
onClickOutside(map, () => (isShowMap.value = false))
const eventColor = ref('')
const isShowMap = ref(false)
const showMap = (color) => {
  isShowMap.value = true
  eventColor.value = color
}
</script>
