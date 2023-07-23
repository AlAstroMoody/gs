<template>
  <div v-if="!currentItem">Такого предмета нет</div>
  <div class="mx-4 mb-96 flex flex-1 flex-col justify-between" v-else>
    <div ref="content">
      <div class="headline mt-6">{{ currentItem.name }}</div>
      <div class="mb-4 mt-10 flex flex-wrap items-center">
        <div class="flex w-full flex-wrap items-center xs:w-auto">
          <img
            :src="`.${currentItem.src}`"
            alt="logo"
            v-if="currentItem.src"
            class="h-24 w-24"
          />
          <QuestionIcon v-else color="red" />
          <div
            class="text-md ml-2 flex h-fit flex-1 justify-end whitespace-nowrap text-second"
          >
            <button
              class="mr-auto rounded-2xl border border-solid border-second px-2 py-4 ease-out hover:border-red hover:text-red"
              @click="add"
            >
              {{ buttonText }}
            </button>
          </div>
          <div class="ml-4 flex flex-col content-center justify-center">
            <div v-if="currentItem.level">
              требуемый уровень: {{ currentItem.level }}
            </div>
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
              <router-link
                :to="`/boss?name=${currentItem.boss?.name}`"
                class="mr-2 text-red"
              >
                {{ currentItem.boss?.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="body my-2 text-white" v-html="currentItem.description" />
      <div class="body my-2 text-white" v-if="currentItem.max_count">
        Не более {{ currentItem.max_count }} шт.
      </div>
      <div class="my-2 text-lg text-white" v-if="currentItem.source">
        Где достать: <span class="text-green">{{ currentItem.source }}</span>
      </div>
      <ul class="my-2" v-if="currentItem.params">
        Бонусы предмета:

        <li
          v-for="(key, index) in Object.keys(currentItem.params)"
          :key="index"
          class="ml-7"
        >
          <div v-if="currentItem.params[key] && itemParams[key]">
            <span v-if="key === 'manaburn'">
              {{ itemParams[key] }} {{ currentItem.params[key] }} маны
              противнику
            </span>
            <span v-else>
              {{ itemParams[key] }}: {{ currentItem.params[key] }}
            </span>
            <span
              v-if="
                [
                  'as',
                  'mp_regeneration',
                  'resist',
                  'distant_resist',
                  'evade',
                ].includes(key)
              "
            >
              %
            </span>
          </div>
        </li>
      </ul>

      <div
        class="border-bg-silver rounded-lg border p-2"
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

      <div
        class="my-2 rounded-lg border border-silver p-2"
        v-if="currentItem.parents?.length"
      >
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

    <Teleport to="body">
      <AppItemsPopup
        class="fixed right-2 top-20 block h-15 bg-second md:hidden"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { itemParams } from '@/common/itemParams'
import AppItemsPopup from '@/components/AppItemsPopup.vue'
import { store } from '@/components/composables/store.js'
import { animateChildren } from '@/components/composables/transitions'
import { useGoblinState } from '@/components/composables/useGoblinState'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const { user, addItem } = useGoblinState()

const route = useRoute()
const currentItem = computed(() => store.currentItem('items', route.params.id))

const itemNotFit = computed(
  () =>
    currentItem.value?.goblins &&
    !currentItem.value?.goblins.includes(user.goblin.name)
)

const buttonText = computed(() => {
  if (itemNotFit.value) return 'не подходит гоблину'

  return tooMuchSameItems.value
    ? `не более ${currentItem.value.max_count || 1} шт.`
    : user.inventory.length < 6
    ? 'добавить в инвентарь'
    : 'инвентарь переполнен'
})

const tooMuchSameItems = computed(() => {
  const repeatedItems = user.inventory.filter(
    (item) => item.id === currentItem.value.id
  )
  if (!currentItem.value.max_count && repeatedItems.length === 1) return true

  return currentItem.value.max_count <= repeatedItems.length
})

const add = () => {
  if (tooMuchSameItems.value || itemNotFit.value) return
  if (user.inventory.length < 6) addItem(currentItem.value)
}

const parentsCount = (id) =>
  currentItem.value?.count && currentItem.value.count[id]
    ? `${currentItem.value.count[id]}шт`
    : ''

const content = ref(null)

onMounted(() => animateChildren([content]))

const craftColor = (forge) => {
  if (forge === 'Ангельская кузница') return 'text-yellow'
  if (forge === 'Вневременная кузня') return 'text-purple'
  if (forge === 'Великая кузница') return 'text-orange'
  if (forge === 'Котелок Попса') return 'text-green'
  if (forge === 'Демоническая кузница') return 'text-red'

  return ''
}
</script>
