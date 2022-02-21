<template>
  <router-link :to="'/item/' + item.id">
    <div class="line">
      <img :src="item.src" class="line__image" alt="img">
      <div class="line__information body">{{item.name}}</div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  item: {}
})
</script>

<style scoped lang="scss">
.line {
  display: flex;
  width: 100%;
  padding: 4px;
  border: 1px solid var(--color-text);
  border-radius: 16px;
  margin: 4px 0;
  cursor: pointer;

  &:hover {
    @include transition(all);
    background: var(--color-text);
    color: var(--color-background);
  }

  &__image {
    margin-right: 12px;
    width: 64px;
    height: 64px;
    border-radius: 8px;
  }

  &__information {

  }
}
</style>