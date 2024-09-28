<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useGoblinState } from '@/components/composables/useGoblinState'
import GrenadeIcon from '@/components/icons/GrenadeIcon.vue'

const route = useRoute()

const activeGoblin = computed(() => route.query.goblin)

const { user, setSkill } = useGoblinState()

watch(
  () => activeGoblin.value,
  () => {
    setSkill(user.goblin?.abilities[0])
  }
)
</script>
<template>
  <main class="align-center relative flex flex-col -mt-16">
    <img
      src="/images/header.webp"
      alt="main"
      class="min-h-[150px] w-full object-cover"
      v-if="!activeGoblin"
    />
    <div
      class="px-6 text-right text-3xl text-purple xxl:text-6xl fixed right-8 top-15 name-shadow"
      v-if="!activeGoblin"
    >
      G<GrenadeIcon class="mb-2 inline" />blin Survival
    </div>
    <div class="px-8 transition-opaciry" ref="body" v-if="!activeGoblin">
      <div class="text-xl lg:text-2xl mb-2">
        <span>
          Интерактивный редактор персонажа, дерево крафта и библиотека оружия для твоей любимой
          карты. <br />Актуально для версии 1.5b
        </span>
      </div>

      <div class="indent-8">
        Небольшой гоблинской экспедиции становится известным о старой заброшенной пещере, в которой
        несколько сотен лет назад пропала безвести целая бригада гномов-археологов.
      </div>
      <div class="indent-8">
        Всё-бы ничего, но в той бригаде было множество очень умных инженеров-механиков, и все свои
        секретные чертежи и разработки были утеряны вместе с ними. Никому неизвестно почему именно
        пропала та бригада, но известно лишь что они откопали в глубине скальной породы несколько
        храмовых помещений, в которых, по всей видимости, жили самые первые гномы.
      </div>
      <div class="indent-8">
        Отважные и обезбашенные гоблины разбивают лагерь перед входом в пещеру, настраивают
        мини-телепорты для передачи предметов с поверхности, и спускаются в заброшенную шахту, с
        надеждой выкрасть и найти уникальные секреты гномов и научиться использовать их в своих
        смертоносных сумасшедших изобретениях...
      </div>
    </div>
    <div v-if="activeGoblin && user.goblin" class="flex h-full gap-4 mt-20">
      <div class="w-1/2">
        <div class="text-active text-3xl my-4 px-4 w-fit">{{ user.goblin.name }}</div>
        <div
          class="w-full animate-leftToRight rounded-r-xl border border-l-0 border-second p-4 text-2xl h-fit"
        >
          {{ user.goblin.description }}
        </div>
      </div>
      <div class="mx-auto w-2/3 mt-16">
        <div class="text-2xl text-active py-2" v-if="user.activeSkill">
          {{ user.activeSkill.name }}
        </div>
        <div
          v-if="user.activeSkill?.description"
          class="rounded-r-xl border border-second p-4 mb-2 bg-primary leading-5"
        >
          <div v-html="user.activeSkill.description" />
          <div v-if="user.activeSkill.cd" class="text-green">кд: {{ user.activeSkill.cd }} сек</div>
          <div v-if="user.activeSkill.dur" class="text-purple">
            длительность: {{ user.activeSkill.dur }} сек
          </div>
          <div v-if="user.activeSkill.mc" class="text-red">
            манакост: {{ user.activeSkill.mc }} маны
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
.name-shadow {
  text-shadow: 1px 1px 2px black;
}
</style>
