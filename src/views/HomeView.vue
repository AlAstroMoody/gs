<template>
  <main class="flex flex-col align-center relative z-50 mb-20">
    <img
      src="/src/assets/images/header.jpg"
      alt="main"
      class="mb-4 w-full min-h-[150px] object-cover"
    />
    <div class="headline">
      G
      <GrenadeIcon class="inline mb-2" :class="grenadeClass" />
      blin Survival
    </div>
    <div class="subtitle my-6">
      <span>
        Интерактивный редактор персонажа, дерево крафта и библиотека оружия для
        твоей любимой карты. <br />Актуально для версии:
      </span>
      <span class="text-red text-xl"> 1.4f.fix7 </span>
    </div>
    <div class="indent-8">
      Небольшой гоблинской экспедиции становится известным о старой заброшенной
      пещере, в которой несколько сотен лет назад пропала безвести целая бригада
      гномов-археологов.
    </div>
    <div class="indent-8">
      Всё-бы ничего, но в той бригаде было множество очень умных
      инженеров-механиков, и все свои секретные чертежи и разработки были
      утеряны вместе с ними. Никому неизвестно почему именно пропала та бригада,
      но известно лишь что они откопали в глубине скальной породы несколько
      храмовых помещений, в которых, по всей видимости, жили самые первые гномы.
    </div>
    <div class="indent-8">
      Отважные и обезбашенные гоблины разбивают лагерь перед входом в пещеру,
      настраивают мини-телепорты для передачи предметов с поверхности, и
      спускаются в заброшенную шахту, с надеждой выкрасть и найти уникальные
      секреты гномов и научиться использовать их в своих смертоносных
      сумасшедших изобретениях...
    </div>

    <div class="mt-12 mx-auto mb-2">
      Проект
      <span
        class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-silver"
      >
        <span class="relative text-primary">"Goblin Survival"</span>
      </span>
      создан
      <a
        href="http://goblinworkshop.ru/"
        target="_blank"
        class="text-red font-medium"
      >
        гильдией картостроителей
      </a>
      , все права принадлежат ей же.
    </div>
    <div class="mx-auto mb-auto text-right">
      <a
        href="https://discord.gg/uzJDPcuv"
        target="_blank"
        class="text-red font-medium pb-20"
      >
        Discord-сообщество
      </a>
      проекта
    </div>
    <ExploseIcon class="opacity-30 absolute bottom-0 -right-1/4" color="red" />
  </main>
</template>
<script setup>
import { ref, toRefs, watch, onMounted } from 'vue'

import ExploseIcon from '@/components/icons/ExploseIcon.vue'
import GrenadeIcon from '@/components/icons/GrenadeIcon.vue'

const props = defineProps({
  appWidth: {
    default: 0,
    type: Number,
  },
})

const { appWidth } = toRefs(props)
const grenadeClass = ref('w-5')
watch(appWidth, (e) => {
  changeGrenadeClass(e)
})

/* меняем классы svg в зависимости от ширины экрана, 
   может вынести в стор словарь с размерами, и брать там
 */
const changeGrenadeClass = (e) => {
  grenadeClass.value = e > 1440 ? 'w-10 -ml-2 -mr-3' : 'w-5 -mr-1'
}

onMounted(() => changeGrenadeClass(appWidth.value))
</script>
