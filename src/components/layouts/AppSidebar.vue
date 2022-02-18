<template>
  <div>
    <div class="sidebar__subtitle subtitle">фильтры</div>
    <div class="sidebar__filters">блок с фильтрами</div>
    <div class="sidebar__body">
      <app-common-scrollbar :block-height="blockHeight" :block-transform-y="blockTransformY.value" />
      <div class="sidebar__items" ref="itemsBlock">
        <app-item-line v-for="item in items" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'

import AppCommonScrollbar from '@/components/common/AppCommonScrollbar.vue'
import AppItemLine from '@/components/AppItemLine.vue'
import wheelLogic from '@/utils/wheelLogic'

// to pinya
const items = reactive([
  { name: 'оружие', src: './src/assets/images/armor.png', id: 0 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 1 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 2 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 3 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 4 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 5 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 6 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 7 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 8 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 9 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 0 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 1 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 2 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 3 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 4 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 5 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 6 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 7 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 8 },
  { name: 'оружие', src: './src/assets/images/armor.png', id: 9 },
])

const itemsBlock = ref<HTMLElement | null>(null)
const blockHeight = computed(() =>
  itemsBlock.value?.scrollHeight - itemsBlock.value?.clientHeight,
)

const blockTransformY = computed(() => itemsBlock.value?.clientHeight
  ? wheelLogic(itemsBlock.value).currentYPosition : {},
)

</script>

<style scoped lang="scss">
.sidebar {
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  transform: translateY(-100%);
  animation: sidebar 1s ease-in forwards;
  animation-delay: 0.3s;
  overflow: hidden;

  &__subtitle {
    margin: 0 auto;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.3s;
    opacity: 0;
    width: 100%;
    position: relative;
    z-index: 2;
    background: var(--color-background);
  }

  &__filters {
    width: 100%;
    background: var(--color-background);
    height: 300px;
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.6s;
    border-radius: 16px;
    border: 1px solid var(--color-text);
    margin: 8px 0;
  }

  &__body {
    justify-content: space-between;
    display: flex;
    overflow: hidden;
    opacity: 0;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.8s;
  }

  &__items {
    position: relative;
    z-index: 1;
    max-height: 600px;
    transition: all 1s ease-out;
    flex: 1;
    margin-left: 8px;
  }
}

@keyframes sidebar {
  from {
    transform: translateY(-100%)
  }
  to {
    transform: translateY(0)
  }
}

</style>