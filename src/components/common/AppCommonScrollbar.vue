<template>
  <div class="scrollbar" ref="scrollbar">
    <div class="scrollbar__track">
      <div class="scrollbar__thumb"
           :style="{ transform: `translateY(${thumbTransformY}px)`, height: `${thumbHeight}px` }"
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
  thumbTransformY: {
    default: () => {
    },
    type: Object,
  },
})

const scrollbar = ref<HTMLElement | null>(null)
const thumbHeight = computed(() => props.blockHeight && scrollbar.value
  ? props.blockHeight * 100 / scrollbar.value.clientHeight : 0,
)
// const thumbTransformYw = computed(() => {
//   if (props.blockHeight && scrollbar.value) {
//     console.log(props.thumbTransformY.value)
//     console.log(scrollbar.value.clientHeight)
//     return props.thumbTransformY.value + scrollbar.value.clientHeight
//   }
//   return 0
// })

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