<template>
  <main class="align-center relative mb-20 flex flex-col">
    <picture>
      <source srcset="/src/assets/images/header.webp" type="image/webp" />
      <img
        src="/src/assets/images/header.jpg"
        alt="main"
        class="mb-4 min-h-[150px] w-full object-cover"
      />
    </picture>
    <div class="px-2">
      <div class="headline">
        G
        <GrenadeIcon class="mb-2 inline" :class="grenadeClass" />
        blin Survival
      </div>
      <div class="subtitle my-6">
        <span>
          Интерактивный редактор персонажа, дерево крафта и библиотека оружия
          для твоей любимой карты. <br />Актуально для версии:
        </span>
        <span class="text-xl text-red"> 1.4f.fix7 </span>
      </div>
      <div class="indent-8">
        Небольшой гоблинской экспедиции становится известным о старой
        заброшенной пещере, в которой несколько сотен лет назад пропала безвести
        целая бригада гномов-археологов.
      </div>
      <div class="indent-8">
        Всё-бы ничего, но в той бригаде было множество очень умных
        инженеров-механиков, и все свои секретные чертежи и разработки были
        утеряны вместе с ними. Никому неизвестно почему именно пропала та
        бригада, но известно лишь что они откопали в глубине скальной породы
        несколько храмовых помещений, в которых, по всей видимости, жили самые
        первые гномы.
      </div>
      <div class="indent-8">
        Отважные и обезбашенные гоблины разбивают лагерь перед входом в пещеру,
        настраивают мини-телепорты для передачи предметов с поверхности, и
        спускаются в заброшенную шахту, с надеждой выкрасть и найти уникальные
        секреты гномов и научиться использовать их в своих смертоносных
        сумасшедших изобретениях...
      </div>

      <div class="mx-auto mt-12 mb-2 text-center">
        Проект
        <span
          class="before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-silver"
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
      <div class="mr-20 mb-auto text-right">
        <a
          href="https://discord.gg/uzJDPcuv"
          target="_blank"
          class="pb-20 font-medium text-red"
        >
          Discord-сообщество
        </a>
        проекта
      </div>
    </div>
    <ExploseIcon class="absolute bottom-0 -right-1/4 opacity-30" color="red" />
  </main>
</template>
<script setup>
import { computed } from 'vue'

import { useSizeState } from '@/components/composibles/useSizeState'
import ExploseIcon from '@/components/icons/ExploseIcon.vue'
import GrenadeIcon from '@/components/icons/GrenadeIcon.vue'

const { width } = useSizeState()

/**
 * меняем классы svg в зависимости от ширины экрана
 */
const grenadeClass = computed(() =>
  width.value === 'xxl' ? 'w-10 -ml-2 -mr-3' : 'w-5 -mr-1'
)
</script>
