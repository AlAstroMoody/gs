<template>
  <div
    class="card"
    @click="choiceGoblin(goblin)"
    :class="{ card_active: userGoblin.id === goblin.id }"
  >
    <div class="card__main">
      <img :src="goblin.src" alt="img" />
      <div class="card__info">
        <div class="subtitle">{{ goblin.name }}</div>
        <div>Основной параметр: {{ goblin.mainParam }}</div>
      </div>
    </div>
    <div class="card__description">{{ goblin.description }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue"

  import type { GoblinsInterface } from "@/common/interfaces"
  import { useUserStore } from "@/stores/user"


  defineProps({
    goblin: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
      type: Object as () => GoblinsInterface,
    },
  })

  const userStore = useUserStore()
  const choiceGoblin = (goblin: GoblinsInterface) => {
    userStore.choiceGoblin(goblin)
  }

  const userGoblin = computed(() => userStore.userGoblin)
</script>

<style scoped lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    padding: 8px;
    min-width: 250px;
    @include transition(color, background);

    &:hover {
      border-radius: 8px;
      padding: 7px;
      border: 1px solid var(--color-background);
      background: var(--color-text);
      color: var(--color-background);
    }

    &_active {
      border-radius: 8px;
      padding: 7px;
      border: 1px solid var(--color-background);
      background: var(--color-text);
      color: var(--color-background);
    }

    &__main {
      display: flex;

      img {
        margin-right: 8px;
      }
    }

    &-enter-from,
    &-leave-to {
      height: 0;
    }

    &-enter-active,
    &-leave-active {
      transition: height 0.3s ease-out;
    }
  }
</style>
