<template>
  <div ref="slider" />
</template>

<script setup>
import { useDebounceFn } from '@vueuse/core'
import * as noUiSlider from 'nouislider/dist/nouislider.min'
import { onMounted, ref } from 'vue'
import 'nouislider/dist/nouislider.min.css'

const props = defineProps({
  value: {
    default: () => [],
    type: Array,
  },
  range: {
    default: () => {},
    type: Object,
  },
})
const emit = defineEmits(['change'])
const slider = ref(null)

const getPosition = () => debouncedFn()

const debouncedFn = useDebounceFn(() => {
  emit('change', slider.value?.noUiSlider.get())
}, 50)

onMounted(() => {
  noUiSlider.create(slider.value, {
    start: props.value,
    connect: true,
    range: {
      min: props.range.min,
      max: props.range.max,
    },
  })

  slider.value.noUiSlider.on('update', function () {
    getPosition()
  })
})
</script>
<style>
.noUi-handle {
  border-radius: 100%;
  background-color: #181818;
}
.noUi-target {
  background: rgba(235, 235, 235, 0.64);
}
.noUi-connect {
  background: #d4cece;
}
.noUi-handle:after,
.noUi-handle:before {
  content: none;
}
</style>
