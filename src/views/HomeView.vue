<template>
  <main class="flex flex-col align-center relative z-50">
    <img
      src="/src/assets/images/header.jpg"
      alt="main"
      class="-mt:4 mb-4 w-full opacity-0 delay-200 animate-string"
    />
    <div class="headline opacity-0 animate-string delay-300">
      Goblin Survival
    </div>
    <div class="subtitle opacity-0 my-6 delay-500 animate-string">
      <span>
        Интерактивный редактор персонажа, дерево крафта и библиотека оружия для
        твоей любимой карты. Актуально для версии:
      </span>
      <span class="text-red-100 text-xl">1.4f.fix7</span>
    </div>
    <div class="opacity-0 indent-8 delay-700 animate-string">
      Небольшой гоблинской экспедиции становится известным о старой заброшенной
      пещере, в которой несколько сотен лет назад пропала безвести целая бригада
      гномов-археологов.
    </div>
    <div class="opacity-0 indent-8 delay-700 animate-string">
      Всё-бы ничего, но в той бригаде было множество очень умных
      инженеров-механиков, и все свои секретные чертежи и разработки были
      утеряны вместе с ними. Никому неизвестно почему именно пропала та бригада,
      но известно лишь что они откопали в глубине скальной породы несколько
      храмовых помещений, в которых, по всей видимости, жили самые первые гномы.
    </div>
    <div class="opacity-0 indent-8 delay-700 animate-string">
      Отважные и обезбашенные гоблины разбивают лагерь перед входом в пещеру,
      настраивают мини-телепорты для передачи предметов с поверхности, и
      спускаются в заброшенную шахту, с надеждой выкрасть и найти уникальные
      секреты гномов и научиться использовать их в своих смертоносных
      сумасшедших изобретениях...
    </div>

    <div
      class="home__privacy opacity-0 mt-50px mx-auto mb-auto delay-1000 animate-string mt-12"
    >
      Проект "Goblin Survival" создан
      <a href="http://goblinworkshop.ru/" target="_blank" class="text-red-100">
        гильдией картостроителей</a
      >, все права принадлежат ей же.
    </div>
  </main>
</template>

<script setup></script>

<style scoped lang="scss">
.home {
  &__privacy {
    animation-delay: 1.4s;

    a {
      font-size: 0.8em;

      &:hover {
        @include transition(all);
        border-bottom: 1px solid var(--color-text-hover);
      }
    }
  }
}
</style>
