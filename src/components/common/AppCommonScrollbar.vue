<template>
  <div class="scrollbar" ref="scrollbar">
    <div class="scrollbar__track">
      <div class="scrollbar__thumb" ref="thumb"
           :style="{ transform: `translateY(${thumbTransformY}px)`, height: `${thumbHeight}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'


const props = defineProps({
  blockHeight: {
    default: 20,
    type: Number,
  },
  blockTransformY: {
    default: 0,
    type: Number,
  },
})

const scrollbar = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)
const thumbHeight = computed(() => 100 * scrollbar.value?.clientHeight / props.blockHeight)

const thumbTransformY = computed(() =>
  scrollbar.value ? (-scrollbar.value.clientHeight) * props.blockTransformY / props.blockHeight : 0
)

</script>

<style scoped lang="scss">
.scrollbar {
  padding: 4px;

  &__track {
    width: 3px;
    height: 100%;
    background: var(--color-text);
    border-radius: 10px;
  }

  &__thumb {
    height: 30px;
    width: 5px;
    margin: 0 0 0 -1px;
    border: 1 ps solid var(--color-text);
    border-radius: 10px;
    background: var(--color-text-hover);
    transition: 1s all;
  }
}
</style>