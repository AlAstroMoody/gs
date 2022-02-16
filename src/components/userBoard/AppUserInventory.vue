<template>
  <div class="inventory">
    <div class="inventory__subtitle body">Предметы</div>
    <div class="inventory__slots">
      <div v-for="_ in 6" :key="6" class="inventory__slot" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.inventory {
  padding: 2px 8px;
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 152px;
  width: fit-content;
  height: fit-content;
  border-radius: 0 16px 0 0;

  &__subtitle {
    margin: auto;
  }

  &__slots {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &__slot {
    margin: 1px;
    background-image: url("src/assets/images/slot.png");
    width: 66px;
    height: 66px;
    border: 1px solid var(--color-text);
  }
}
</style>