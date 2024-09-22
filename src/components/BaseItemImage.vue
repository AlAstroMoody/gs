<script setup>
import { baseUrl } from '@/common/constants'

defineProps({ url: String })
</script>
<template>
  <img
    :src="
      baseUrl +
      url
        .replace('ReplaceableTextures\\PassiveButtons\\', '')
        .replace('ReplaceableTextures\\CommandButtons\\', '')
        .replace('CommandButtons/', '')
    "
    alt="item icon"
    class="bg-purple rounded-lg block w-fit border"
    :width="64"
    :height="64"
    onerror="this.src='/gs/images/slot.png';"
  />
</template>
