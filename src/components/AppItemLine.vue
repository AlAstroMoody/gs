<template>
  <router-link
    :to="'/item/' + item.id"
    class="flex w-full p-1 rounded-2xl my-1 mx-0 border border-second transition-all bg-primary hover:bg-second text-second hover:text-primary"
  >
    <img v-if="item.src" :src="item.src" class="w-16 h-16" alt="img" />
    <QuestionIcon v-else color="purple" class="w-16 h-16 mr-3 rounded-lg" />
    <div class="ml-2 my-auto">{{ item.name }}</div>
  </router-link>
</template>

<script setup>
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})
</script>
