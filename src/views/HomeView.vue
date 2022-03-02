<template>
  <main class="home">
    <img src="/src/assets/images/header.jpg" alt="main" class="home__image">
    <div class="headline home__headline">Goblin Survival</div>
    <div class="home__subtitle subtitle">
      Интерактивный редактор персонажа, дерево крафта и библиотека оружия для твоей любимой карты.
      Актуально для версии: <span>1.4f.fix7</span>

    </div>
    <div class="home__description">
      Небольшой гоблинской экспедиции становится известным о старой заброшенной пещере,
      в которой несколько сотен лет назад пропала безвести целая бригада гномов-археологов.
    </div>
    <div class="home__description">
      Всё-бы ничего, но в той бригаде было множество очень умных инженеров-механиков, и все
      свои секретные чертежи и разработки были утеряны вместе с ними.
      Никому неизвестно
      почему именно пропала та бригада, но известно лишь что они откопали в глубине
      скальной породы несколько храмовых помещений, в которых, по всей видимости, жили
      самые первые гномы.
    </div>
    <div class="home__description">
      Отважные и обезбашенные гоблины разбивают лагерь перед входом
      в пещеру, настраивают мини-телепорты для передачи предметов с поверхности, и
      спускаются в заброшенную шахту, с надеждой выкрасть и найти уникальные секреты
      гномов и научиться использовать их в своих смертоносных сумасшедших изобретениях...
    </div>

    <div class="home__privacy">
      Проект "Goblin Survival" создан
      <a href="http://goblinworkshop.ru/" target="_blank">
        гильдией картостроителей</a>, все права принадлежат ей же.
    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &__image {
    margin: -16px 0 16px;
    width: 100vw;
    opacity: 0;
    animation: opacity 1s forwards;
    animation-delay: 0.5s;
    @media (min-width: $l) {
      width: 100%;
    }
  }

  &__headline {
    opacity: 0;
    animation: opacity 1s forwards;
    animation-delay: 0.7s;
  }

  &__subtitle {
    margin: 24px 0;
    opacity: 0;
    animation: opacity 1s forwards;
    animation-delay: 0.8s;

    span {
      color: var(--color-text-hover);
      font-size: 0.8em;
    }
  }

  &__description {
    text-indent: 1.5em;
    opacity: 0;
    animation: opacity 1s forwards;
    animation-delay: 1.1s;
  }

  &__privacy {
    margin: 50px 0 auto auto;
    opacity: 0;
    animation: opacity 1s forwards;
    animation-delay: 1.4s;

    a {
      font-size: 0.8em;
      color: var(--color-text-hover);

      &:hover {
        @include transition(all);
        border-bottom: 1px solid var(--color-text-hover);
      }
    }
  }
}
</style>
