<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { baseUrl } from '@/common/constants'
import BaseLink from '@/components/BaseLink.vue'
import BigMap from '@/components/BigMap.vue'
import { store } from '@/components/composables/store.js'
import { useTooltipStore } from '@/components/composables/tooltipStore.js'
import { useGoblinState } from '@/components/composables/useGoblinState'
// import GoblinParams from '@/components/GoblinParams.vue'
import BinocularsIcon from '@/components/icons/BinocularsIcon.vue'
import ExitIcon from '@/components/icons/ExitIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'
import TheMap from '@/components/TheMap.vue'
import TheModal from '@/components/TheModal.vue'

const route = useRoute()
const router = useRouter()
const { user, setGoblin, setSkill } = useGoblinState()
const tooltipStore = useTooltipStore()

const goblinIconSize = 84
const itemIconSize = 64

await store.setItems('bosses')
await store.setItems('goblins')
// await store.setItems('items')

const goblins = computed(() => store.entities.goblins)
const items = computed(() => user.inventory)

const showBottom = computed(() => ['item', 'home', 'goblin'].includes(route.name))

const activeItem = ref(null)

// Позиционирование гоблинов (4x2 сетка)
const goblinPositionStyle = (index) => {
  const size = goblinIconSize
  const gap = 4
  const row = index < 4 ? 0 : 1
  const col = index % 4

  // Базовые координаты: left-52 (208px) + bottom-24 (96px)
  const baseLeft = 208
  const baseBottom = 96

  return {
    position: 'absolute',
    left: `${baseLeft + col * (size + gap)}px`,
    bottom: `${baseBottom + row * (size + gap)}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 1,
  }
}

// Позиционирование предметов (сетка 4x2)
const itemPositionStyle = (index) => {
  const size = itemIconSize
  const gap = 4
  const row = Math.floor(index / 4)
  const col = index % 4

  // Базовые координаты для инвентаря
  const baseLeft = 8 // left-2
  const baseBottom = 160 // bottom-40

  return {
    position: 'absolute',
    left: `${baseLeft + col * (size + gap)}px`,
    bottom: `${baseBottom + row * (size + gap)}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 1,
  }
}

// Позиционирование скиллов (4x2 сетка)
const skillPositionStyle = (index) => {
  const size = goblinIconSize
  const gap = 4
  const row = index < 4 ? 0 : 1
  const col = index % 4

  // Базовые координаты для скиллов
  const baseLeft = 208 // left-52
  const baseBottom = 96 // bottom-24

  return {
    position: 'absolute',
    left: `${baseLeft + col * (size + gap)}px`,
    bottom: `${baseBottom + row * (size + gap)}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 1,
  }
}

const removeItem = (index) => {
  useGoblinState().removeItem(index)
  activeItem.value = null
}

const modal = ref(null)
const openPopup = () => modal.value.open()

const inventory = ref()
onMounted(() => {
  if (('onMounted', route.path === '/')) {
    inventory.value.classList.add('hidden')
  }
})

function chooseGoblin(goblin) {
  setGoblin(goblin)
  router.push({ name: 'home', query: { goblin: goblin.name } })
}

function setActiveSkill(skill) {
  setSkill(skill)
}

// Функции для тултипов
const showGoblinTooltip = (goblin, event) => {
  tooltipStore.showTooltip(`Гоблин: ${goblin.name}`, event, 'top', 200)
}

const showItemTooltip = (item, event) => {
  tooltipStore.showTooltip(`Предмет: ${item.name}`, event, 'top', 200)
}

const showSkillTooltip = (skill, event) => {
  tooltipStore.showTooltip(`Скилл: ${skill.name}`, event, 'top', 200)
}

const hideTooltip = () => {
  tooltipStore.hideTooltip()
}
</script>
<template>
  <main class="flex h-screen flex-col items-center justify-between w-full">
    <div class="fixed top-0 z-20 flex animate-top-to-bottom-bounce items-start">
      <img src="/images/t1.png" style="margin-left: -512px" />
      <img src="/images/t1.png" />
      <img src="/images/t2.png" />
      <img src="/images/t3.png" />
      <img src="/images/t4.png" />
      <img src="/images/t1.png" style="margin-right: -512px; height: 61px" />
      <div class="absolute w-lg">
        <!-- сделать отдельные блоки под меню и центрировать в них ссылки? -->
        <BaseLink title="Главная" link="/" class="absolute left-10 top-2 z-1" />
        <BaseLink title="Крафт" link="/craft" class="absolute top-2 z-1 left-56" />
        <BaseLink title="Боссы" link="/boss" class="absolute right-12 top-2 z-1" />
      </div>
      <div class="absolute ml-128 w-lg">
        <BaseLink title="Квесты" link="/quest" class="absolute left-12 top-2 z-1" />
        <BaseLink title="О проекте" link="/about" class="absolute -right-4 top-2 z-1" />
      </div>
      <div class="absolute ml-256 w-lg">
        <!-- <BaseLink title="Test craft" link="/test" class="absolute left-24 top-2 z-1" /> -->
        <div class="absolute left-20 top-2 text-orange font-extrabold text-xl">Version 1.5b3+</div>
        <a
          href="https://discord.gg/3rhvtTWU"
          target="_blank"
          class="absolute -right-13 my-3 font-medium text-link transition-all hover:scale-110 hover:text-active"
        >
          Гоблины в Discord
        </a>
      </div>
    </div>

    <div class="pt-16 flex justify-between w-full relative max-h-screen h-full">
      <slot></slot>
    </div>

    <div
      ref="inventory"
      class="fixed bottom-0 items-end z-10 flex"
      v-show="route.path === '/'"
      :class="showBottom ? 'animate-bottom-to-top-bounc' : 'animate-footer'"
    >
      <TheMap class="absolute left-5 bottom-3 aspect-auto w-[280px] h-[280px]" />
      <div class="bg-black absolute left-5 w-[280px] h-14" />
      <img src="/images/1.png" />
      <!-- панель иконок -->
      <div class="absolute z-1 ml-76 top-16">
        <button class="px-3 group" @click="openPopup">
          <BinocularsIcon :width="32" color="silver" class="group-hover:fill-purple" />
        </button>
      </div>
      <img src="/images/2.png" />
      <img src="/images/3.png" />
      <img src="/images/4.png" class="pointer-events-none touch-none" />
      <img
        :src="user.goblin.src"
        class="absolute bottom-16 left-10 -z-1 ml-96 h-40 w-40 animate-goblin"
      />
      <!-- <div class="absolute bottom-0 ml-96 w-60 h-15 pr-4">
        <div class="text-green mt-1 flex justify-center">{{ hp }}/{{ hp }}</div>
        <div class="text-purple mt-1 flex justify-center">{{ mp }}/{{ mp }}</div>
      </div> -->
      <div class="absolute z-1 ml-96 w-lg left-9 -bottom-16">
        <!-- <div class="ml-auto h-56 w-92 text-red">Раздел в переработке</div> -->
        <!-- <GoblinParams class="ml-auto mr-6 h-56 w-92" /> -->
        <!-- гоблины -->
        <button
          @click="chooseGoblin(goblin)"
          v-for="(goblin, index) in goblins"
          :key="goblin.id"
          :style="goblinPositionStyle(index)"
          class="group transition-all duration-200 hover:scale-105"
          @mouseenter="showGoblinTooltip(goblin, $event)"
          @mouseleave="hideTooltip"
        >
          <img
            :src="
              baseUrl +
              goblin.url
                .replace('ReplaceableTextures\\CommandButtons\\', '')
                .replace('CommandButtons/', '')
                .replace('.blp', '.png')
            "
            class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_16px_gold]"
            :class="{
              'border-white': user.goblin.id === goblin.id,
              'border-transparent': user.goblin.id !== goblin.id,
            }"
          />
        </button>
      </div>
      <div class="absolute z-1 ml-256 w-lg h-full top-[82px]">
        <!-- инвентарь -->
        <RouterLink
          v-for="(item, index) in items"
          :to="`/item/${item.id}`"
          :key="item.id"
          :style="itemPositionStyle(index)"
          class="group transition-all duration-200 hover:scale-105"
          @mouseenter="showItemTooltip(item, $event)"
          @mouseleave="hideTooltip"
        >
          <button
            class="group-hover:block hidden absolute -top-2 -right-2 z-10"
            @click="removeItem(index)"
          >
            <ExitIcon
              color="white"
              :width="24"
              :height="24"
              class="hover:rotate-90 transition-all bg-red-500 rounded-full p-1"
            />
          </button>
          <img
            v-if="item.src"
            :src="item.src"
            class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_12px_gold]"
            :class="{
              'border-white': +route.params.id === item.id,
              'border-transparent': +route.params.id !== item.id,
            }"
          />
          <div
            v-else
            class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_12px_gold] bg-silver flex items-center justify-center"
            :class="{
              'border-white': +route.params.id === item.id,
              'border-transparent': +route.params.id !== item.id,
            }"
          >
            <QuestionIcon class="m-auto" />
          </div>
        </RouterLink>

        <!-- скилы -->
        <template v-if="route.query.goblin">
          <button
            @click="setActiveSkill(skill)"
            v-for="(skill, index) in user.goblin.abilities"
            :key="skill.id"
            :style="skillPositionStyle(index)"
            class="group transition-all duration-200 hover:scale-105"
            @mouseenter="showSkillTooltip(skill, $event)"
            @mouseleave="hideTooltip"
          >
            <img
              :src="
                baseUrl +
                skill.url
                  .replace('ReplaceableTextures\\CommandButtons\\', '')
                  .replace('CommandButtons/', '')
                  .replace('.blp', '.png')
              "
              class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_16px_gold]"
              :class="{
                'border-white': user.activeSkill?.id === skill.id,
                'border-transparent': user.activeSkill?.id !== skill.id,
              }"
            />
          </button>
        </template>
      </div>
      <div class="absolute right-0 z-1">4</div>
    </div>

    <TheModal ref="modal">
      <template #default>
        <BigMap class="absolute inset-0 z-10 flex w-fit flex-col gap-2 rounded-sm m-auto" />
      </template>
    </TheModal>
  </main>
</template>
