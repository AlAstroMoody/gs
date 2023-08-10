<template>
  <main class="align-center relative mb-20 flex flex-col" ref="container">
    <picture>
      <source srcset="/images/header.webp" type="image/webp" />
      <img
        src="/images/header.jpg"
        alt="main"
        class="mb-4 min-h-[150px] w-full object-cover"
      />
    </picture>

    <div class="headline px-4 lg:px-2">
      G
      <GrenadeIcon class="mb-2 inline" :class="grenadeClass" />
      blin Survival
    </div>
    <div class="subtitle my-6 px-4 lg:px-2">
      <span>
        Интерактивный редактор персонажа, дерево крафта и библиотека оружия для
        твоей любимой карты. <br />Актуально для версии:
      </span>
      <span class="text-xl text-red"> {{ version }} </span>
      или<button
        class="ml-2 text-xl text-green underline"
        @click="changeVersion"
      >
        {{ changeVersionText }}
      </button>
    </div>

    <div class="px-4 indent-8 lg:px-2">
      Небольшой гоблинской экспедиции становится известным о старой заброшенной
      пещере, в которой несколько сотен лет назад пропала безвести целая бригада
      гномов-археологов.
    </div>
    <div class="px-4 indent-8 lg:px-2">
      Всё-бы ничего, но в той бригаде было множество очень умных
      инженеров-механиков, и все свои секретные чертежи и разработки были
      утеряны вместе с ними. Никому неизвестно почему именно пропала та бригада,
      но известно лишь что они откопали в глубине скальной породы несколько
      храмовых помещений, в которых, по всей видимости, жили самые первые гномы.
    </div>
    <div class="px-4 indent-8 lg:px-2">
      Отважные и обезбашенные гоблины разбивают лагерь перед входом в пещеру,
      настраивают мини-телепорты для передачи предметов с поверхности, и
      спускаются в заброшенную шахту, с надеждой выкрасть и найти уникальные
      секреты гномов и научиться использовать их в своих смертоносных
      сумасшедших изобретениях...
    </div>

    <div class="mx-auto mb-2 mt-12 px-4 text-center lg:px-2">
      Проект
      <span
        class="before:absolute before:-inset-1 before:mx-1 before:block before:-skew-y-3 before:bg-silver"
      >
        <span class="relative text-primary">"Goblin Survival"</span>
      </span>
      создан
      <a
        href="http://goblinworkshop.ru/"
        target="_blank"
        class="font-medium text-red"
      >
        гильдией картостроителей
      </a>
      , все права принадлежат ей же.
    </div>
    <div class="mb-20 mr-20 px-4 text-right lg:px-2">
      <a
        href="https://discord.gg/aMHPcaqYSn"
        target="_blank"
        class="pb-20 font-medium text-red"
      >
        Discord-сообщество
      </a>
      проекта
    </div>
  </main>
</template>
<script setup>
import gsap from 'gsap'
import { computed, ref, onMounted } from 'vue'

import { store } from '@/components/composables/store.js'
import { useSizeState } from '@/components/composables/useSizeState'
import GrenadeIcon from '@/components/icons/GrenadeIcon.vue'

const { width } = useSizeState()

const grenadeClass = computed(() =>
  width.value === 'xxl' ? 'w-10 -ml-2 -mr-3' : 'w-5 -mr-1'
)

const container = ref(null)

onMounted(() => {
  gsap.from(container.value.children, {
    duration: 1,
    y: -100,
    autoAlpha: 0,
    stagger: 0.25,
    ease: 'back.out(1.7)',
  })
})

const version = computed(() =>
  store.version === '1.5а' ? '1.5а' : '1.4f.fix7'
)
const changeVersion = () => {
  store.setVersion(store.version === '1.5а' ? '1.4f.fix7' : '1.5а')
  location.reload()
}

const changeVersionText = computed(() =>
  version.value === '1.4f.fix7' ? '1.5а(актуальная)' : ' перейти на f7(старая)'
)
</script>
