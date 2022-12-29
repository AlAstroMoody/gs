<template>
  <div v-if="!currentItem">Такого предмета нет</div>
  <div class="mx-4 mb-96 flex flex-1 flex-col justify-between" v-else>
    <div>
      <div class="headline mt-6">{{ currentItem.name }}</div>
      <div class="mt-10 mb-4 flex flex-wrap items-center">
        <div class="flex w-full xs:w-auto">
          <img
            :src="currentItem.src"
            alt="logo"
            v-if="currentItem.src"
            class="h-24 w-24"
          />
          <QuestionIcon v-else color="red" />
          <div class="ml-4 flex flex-col content-center justify-center">
            <div v-if="currentItem.level">
              требуемый уровень: {{ currentItem.level }}
            </div>
            <div v-else>Нет ограничения по уровню</div>
            <div v-if="currentItem.goblins.length">
              Только для класса:
              <span class="text-lg text-red">
                {{ goblinClasses }}
              </span>
            </div>
            <div v-else>Подходит для всех классов</div>
          </div>
        </div>
        <div
          class="text-md ml-2 flex h-fit flex-1 justify-end whitespace-nowrap text-second"
        >
          <button
            class="rounded-2xl border border-solid border-second px-2 py-4 ease-out hover:border-red hover:text-red"
            @click="add"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div class="body my-2" v-html="currentItem.description" />

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
                ['as', 'mp_regeneration', 'resist', 'distant_resist'].includes(
                  key
                )
              "
            >
              %
            </span>
          </div>
        </li>
      </ul>

      <div
        class="border-bg-silver rounded-lg border p-2"
        v-if="currentItem.children.length"
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
        v-if="currentItem.parents.length"
      >
        Предмет "{{ currentItem.name }}" крафтится из:
        <span
          v-for="(parent, index) in currentItem.parents"
          class="text-md text-end"
          :key="parent.id"
        >
          <router-link :to="`/item/${parent.id}`">
            <span class="text-red hover:border-b"> {{ parent.name }} </span>
            <span v-if="index !== currentItem.parents.length - 1">, </span>
            <span v-else>; </span>
          </router-link>
        </span>
      </div>
    </div>

    <Teleport to="body">
      <AppItemsPopup
        class="absolute top-12 right-2 block bg-second md:hidden"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { itemParams } from '@/common/itemParams'
import AppItemsPopup from '@/components/AppItemsPopup.vue'
import { store } from '@/components/composibles/store.js'
import { useGoblinState } from '@/components/composibles/useGoblinState'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const { user, addItem } = useGoblinState()

const route = useRoute()

const currentItem = store.currentItem('items', route.params.id)
const items = computed(() => store.entities.items)
if (!items.value.length) await store.setItems('items')

const buttonText = computed(() =>
  user.inventory.length < 6 ? 'добавить в инвентарь' : 'инвентарь переполнен'
)
/** добавить в инвентарь */
const add = () => {
  if (user.inventory.length < 6) addItem(currentItem)
}

/** join классов гоблинов шмотки */
const goblinClasses = computed(() =>
  currentItem.goblins
    .map((currentItem) => currentItem.attributes.name)
    .join(', ')
)
</script>
