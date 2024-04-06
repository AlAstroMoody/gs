<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseButton from '@/components/BaseButton.vue'
import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'
import ItemParams from '@/components/ItemParams.vue'
import ThePreloader from '@/components/ThePreloader.vue'

const { user, addItem } = useGoblinState()

const route = useRoute()

const items = computed(() => store.entities.items)
const currentItem = computed(() => store.currentItem('items', route.params.id))

const itemNotFit = computed(
  () => currentItem.value?.goblins && !currentItem.value?.goblins.includes(user.goblin.name)
)

const cantBeAdded = computed(() =>
  currentItem.value.notUsed?.some((item) => user.inventory.map((i) => i.id).includes(item.id))
)

const buttonText = computed(() => {
  if (cantBeAdded.value) return 'нельзя добавить'
  if (itemNotFit.value) return 'не подходит гоблину'

  return user.inventory.length === 6
    ? 'инвентарь переполнен'
    : tooMuchSameItems.value
      ? `не более ${currentItem.value.max_count || 1} шт.`
      : 'добавить в инвентарь'
})

const tooMuchSameItems = computed(() => {
  const repeatedItems = user.inventory.filter((item) => item.id === currentItem.value.id)
  if (!currentItem.value.max_count && repeatedItems.length === 1) return true

  return currentItem.value.max_count <= repeatedItems.length
})

const add = () => {
  if (tooMuchSameItems.value || itemNotFit.value || cantBeAdded.value) return
  if (user.inventory.length < 6) addItem(currentItem.value)
}

const parentsCount = (id) =>
  currentItem.value?.count && currentItem.value.count[id] ? `${currentItem.value.count[id]}шт` : ''

const craftColor = (forge) => {
  if (forge === 'Ангельская кузница') return 'text-yellow'
  if (forge === 'Вневременная кузня') return 'text-purple'
  if (forge === 'Великая кузница') return 'text-orange'
  if (forge === 'Котелок Попса') return 'text-green'
  if (forge === 'Демоническая кузница') return 'text-red'

  return ''
}

const equalityParams = computed(
  () =>
    currentItem.value.params.strength === currentItem.value.params.agility &&
    currentItem.value.params.agility === currentItem.value.params.intelligence
)
const currentItemParams = computed(() =>
  Object.keys(currentItem.value.params)
    .sort((a) => (['strength', 'agility', 'intelligence'].includes(a) ? -1 : 1))
    .filter((key) => (equalityParams.value ? !['agility', 'intelligence'].includes(key) : true))
)
</script>

<template>
  <ThePreloader v-if="!items.length" />
  <div v-else-if="!currentItem">Такого предмета нет</div>
  <div class="flex w-full justify-between py-4" v-else>
    <div class="h-[calc(100vh-350px)] pb-20 overflow-y-auto scrollbar-custom">
      <div class="text-3xl xxl:text-6xl">{{ currentItem.name }}</div>

      <div class="my-2 flex flex-wrap items-center">
        <div class="flex w-full flex-wrap items-center xs:w-auto">
          <img :src="currentItem.src" alt="logo" v-if="currentItem.src" class="h-24 w-24" />
          <QuestionIcon v-else color="red" />
          <div class="text-md ml-2 flex h-fit flex-1 justify-end whitespace-nowrap text-second">
            <BaseButton @click="add" :text="buttonText" />
          </div>
          <div class="ml-4 flex flex-col content-center justify-center">
            <div v-if="currentItem?.level > 1">требуемый уровень: {{ currentItem.level }}</div>
            <div v-else>Нет ограничения по уровню</div>
            <div v-if="currentItem.goblins?.length">
              Только для класса:
              <span class="text-lg text-red">
                {{ currentItem.goblins.join(', ') }}
              </span>
            </div>
            <div v-else>Подходит для всех классов</div>
            <div v-if="currentItem.craft">
              крафт в:
              <span :class="craftColor(currentItem.craft)">
                {{ currentItem.craft }}
              </span>
            </div>
            <div v-if="currentItem.boss">
              Босс:
              <router-link :to="`/boss?name=${currentItem.boss?.name}`" class="mr-2 text-red">
                {{ currentItem.boss?.name }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="w-full text-white lg:text-xl" v-html="currentItem.description" />
        <div class="my-2 w-full text-white lg:text-xl" v-if="currentItem.max_count">
          Не более {{ currentItem.max_count }} шт.
        </div>
        <div class="w-full text-lg text-white" v-if="currentItem.source">
          Где достать: <span class="text-green">{{ currentItem.source }}</span>
        </div>
        <div v-if="currentItem.isMedicDD" class="text-orange">Медик-ДД</div>
        <div v-if="currentItem.isMedicSupport" class="text-orange">Медик-сап</div>
        <ul class="my-2 w-full" v-if="currentItem.params">
          Бонусы предмета:
          <ItemParams
            v-for="(key, index) in currentItemParams"
            :key="index"
            class="ml-7"
            :item="currentItem"
            :param="key"
            :equalityParams="equalityParams"
          />
        </ul>

        <div class="my-1 w-full p-2" v-if="currentItem.notUsed?.length">
          Нельзя использовать с:
          <span
            v-for="(item, index) in currentItem.notUsed"
            class="text-md text-end"
            :key="item.id"
          >
            <router-link :to="`/item/${item.id}`">
              <span class="text-red hover:border-b">
                {{ parentsCount(item.id) }} {{ item.name }}
              </span>
              <span v-if="index !== currentItem.notUsed.length - 1">, </span>
              <span v-else>; </span>
            </router-link>
          </span>
        </div>

        <div class="w-full">
          <div
            class="border-bg-silver rounded-lg border p-2 w-fit"
            v-if="currentItem.children?.length"
          >
            Из предмета "{{ currentItem.name }}" можно скрафтить:
            <span
              v-for="(child, index) in currentItem.children"
              class="text-md text-end"
              :key="child.id"
            >
              <router-link :to="`/item/${child.id}`">
                <span class="text-red hover:border-b"> {{ child.name }} </span>
                <span v-if="index !== currentItem.children.length - 1">, </span>
                <span v-else>; </span>
              </router-link>
            </span>
          </div>
        </div>

        <div class="my-2 rounded-lg border border-silver p-2" v-if="currentItem.parents?.length">
          Предмет "{{ currentItem.name }}" крафтится из:
          <span
            v-for="(parent, index) in currentItem.parents"
            class="text-md text-end"
            :key="parent.id"
          >
            <router-link :to="`/item/${parent.id}`">
              <span class="text-red hover:border-b">
                {{ parentsCount(parent.id) }} {{ parent.name }}
              </span>
              <span v-if="index !== currentItem.parents.length - 1">, </span>
              <span v-else>; </span>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
