<script setup>
import GrenadeIcon from '@/components/icons/GrenadeIcon.vue'
</script>
<template>
  <main class="align-center relative flex flex-col -mt-16">
    <img src="/images/header.webp" alt="main" class="min-h-[150px] w-full object-cover" />

    <div class="px-6 text-right text-3xl text-purple xxl:text-6xl fixed right-8 top-15">
      G<GrenadeIcon class="mb-2 inline" />blin Survival
    </div>
    <div class="px-8 transition-opaciry" ref="body">
      <div class="text-2xl lg:text-3xl">
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
  </main>
</template>
