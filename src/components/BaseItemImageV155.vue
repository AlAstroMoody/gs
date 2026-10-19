<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 64,
  },
  transitionName: {
    type: String,
    default: null,
  },
})

const fallbackSrc = `${import.meta.env.BASE_URL}images/slot.png`
const imageSrc = ref(props.src || fallbackSrc)

const transitionStyle = computed(() => {
  if (props.transitionName) {
    return { 'view-transition-name': props.transitionName }
  }

  return {}
})

watch(
  () => props.src,
  (src) => {
    imageSrc.value = src || fallbackSrc
  }
)

function onError() {
  if (imageSrc.value !== fallbackSrc) {
    imageSrc.value = fallbackSrc
  }
}
</script>

<template>
  <img
    :src="imageSrc"
    :alt="alt"
    :width="size"
    :height="size"
    :style="transitionStyle"
    class="bg-purple rounded-lg border flex-shrink-0"
    loading="lazy"
    @error="onError"
  />
</template>
