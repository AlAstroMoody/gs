<script setup>
import { computed } from 'vue'

import { baseUrl } from '@/common/constants'

const props = defineProps({
  url: String,
  transitionName: {
    type: String,
    default: null,
  },
})

const imageSrc = computed(() => {
  return (
    baseUrl +
    props.url
      .replace('ReplaceableTextures\\PassiveButtons\\', '')
      .replace('ReplaceableTextures\\CommandButtons\\', '')
      .replace('CommandButtons/', '')
  )
})

const transitionStyle = computed(() => {
  if (props.transitionName) {
    return { 'view-transition-name': props.transitionName }
  }

  return {}
})
</script>

<template>
  <img
    :src="imageSrc"
    alt="item icon"
    class="bg-purple rounded-lg block w-fit border"
    :width="64"
    :height="64"
    :style="transitionStyle"
    onerror="this.src='/gs/images/slot.png';"
    loading="lazy"
  />
</template>
