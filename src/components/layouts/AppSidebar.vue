<template>
  <div ref="sidebar">
    <div class="filters">
      <div class="filters__name">
        <input v-model="filterFields.name" placeholder=" " id="name" class="subtitle" />
        <label for="name"> поиск по названию </label>
      </div>

      уровень предмета от: {{ Math.round(filterFields.level) }}
      <div class="filters__level">
        0
        <AppCommonSlider class="filters__slider" @thumbShift="sliderThumbShift" />
        200
      </div>

      игровой класс:
      <AppCommonSelect
        :options="goblins"
        @getOption="classSelection"
        default-value="--игровой класс--"
      />
    </div>

    <div class="sidebar__body">
      <AppScrollingComponent :is-resize="isResize">
        <div class="sidebar__items" ref="itemsBlock">
          <AppItemLine v-for="item in filteredItems" :key="item.id" :item="item" />
        </div>
        <div v-if="!filteredItems.length" class="sidebar__items_empty">
          совпадений не найдено
        </div>
      </AppScrollingComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRefs, watch } from "vue";

import AppItemLine from "@/components/AppItemLine.vue";
import AppScrollingComponent from "@/components/AppScrollingComponent.vue";
import AppCommonSelect from "@/components/common/AppCommonSelect.vue";
import AppCommonSlider from "@/components/common/AppCommonSlider.vue";
import { useGoblinsStore } from "@/stores/goblins";
import { useItemsStore } from "@/stores/items";

const props = defineProps({
  isShow: {
    default: true,
    type: Boolean,
  },
});

const { isShow } = toRefs(props);
watch(isShow, async () => {
  if (sidebar.value) {
    sidebar.value.classList.add(isShow.value ? "sidebar_show" : "sidebar_hidden");
    sidebar.value.classList.remove(isShow.value ? "sidebar_hidden" : "sidebar_show");
  }
});

const sidebar = ref<HTMLElement | null>(null);

const itemsStore = useItemsStore();
const items = computed(() => itemsStore.allItems);

const goblinsStore = useGoblinsStore();
const goblins = computed(() => goblinsStore.allGoblins);

const filterFields = reactive({
  name: "",
  level: 0,
  class: <number | null>null,
});

const filteredItems = computed(() => {
  let sampleItems = items.value;
  if (filterFields.name) {
    sampleItems = sampleItems.filter((item) => item.name.includes(filterFields.name));
  }
  if (filterFields.level) {
    sampleItems = sampleItems.filter((item) =>
      item.level ? item.level >= filterFields.level : null
    );
  }
  if (filterFields.class || filterFields.class === 0) {
    sampleItems = sampleItems.filter((item) =>
      item.class.some((c) => c === filterFields.class)
    );
  }

  return sampleItems;
});

const isResize = ref(false);
watch(filteredItems, async () => {
  isResize.value = true;
  setTimeout(() => (isResize.value = false), 500);
});

const sliderThumbShift = (distance: number) => {
  filterFields.level = 200 * distance;
};

const classSelection = (value: { id: number }) => {
  filterFields.class = value.id || value.id === 0 ? value.id : null;
};
</script>

<style scoped lang="scss">
.sidebar {
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  transform: translateY(-100%);
  animation: sidebar 1s ease-in forwards;
  animation-delay: 0.3s;
  overflow: hidden;

  @media (min-width: $l) {
    padding: 16px 24px;
  }

  &_show {
    animation: show 0.5s ease-in forwards;
    transform: translateY(0);
  }

  &_hidden {
    animation: hidden 0.5s ease-in forwards;
    transform: translateY(0);
  }

  &__body {
    justify-content: space-between;
    display: flex;
    overflow: hidden;
    opacity: 0;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.8s;
    height: 100%;
  }

  &__items {
    position: relative;
    z-index: 1;
    height: 100%;
    transition: all 1s ease-out;
    flex: 1;
    margin-left: 8px;

    &_empty {
      width: 100%;
      text-align: center;
    }
  }
}

.filters {
  width: 100%;
  background: var(--color-background);
  min-height: 300px;
  position: relative;
  z-index: 2;
  opacity: 0;
  animation: opacity 1s ease-out forwards;
  animation-delay: 1.6s;
  border-radius: 16px;
  border: 1px solid var(--color-text);
  margin: 8px 0;
  padding: 8px;

  &__name {
    width: 100%;
    padding: 12px 12px 0;
    background: var(--color-background-soft);
    border-radius: 16px;
    margin: 8px 0;
    display: flex;
    border: 1px solid var(--color-text);

    label {
      position: absolute;
      inset: 0 auto;
      padding: 8px;
      @include transition(all);
    }

    input {
      color: var(--color-text);
      width: 100%;
    }
  }

  &__level {
    display: flex;
    align-items: center;
  }

  &__slider {
    margin: 0 4px;
  }
}

@keyframes sidebar {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes show {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes hidden {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
