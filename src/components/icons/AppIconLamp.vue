<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    class="lamp"
    @click="toggleTheme"
  >
    <g>
      <path
        fill="var(--color-text)"
        d="M10.5,1.674V4c1.215,0.912,2,2.364,2,4c0,2.762-2.238,5
      -5,5s-5-2.238-5-5c0-1.636,0.785-3.088,2-4 V1.674C2.135,2.797,0.5,5.208,0.5,8c0,
      3.866,3.134,7,7,7s7-3.134,7-7C14.5,5.208,12.865,2.797,10.5,1.674z"
      />
      <path
        fill="var(--color-text)"
        d="M8.5,7.003V0.997C8.5,0.446,8.056,0,7.5,0c-0.553,0
      -1,0.453-1,0.997v6.006C6.5,7.554,6.944,8,7.5,8C8.053,8,8.5,7.547,8.5,7.003z"
      />
    </g>
  </svg>
</template>
<script setup>
import { ref } from 'vue'

const isDarkTheme = ref(true)

const checkColorTheme = () => {
  isDarkTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  changeBodyClass()
}

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  changeBodyClass()
}

const changeBodyClass = () => {
  document.body.className = isDarkTheme.value ? 'dark' : 'light'
}

const media = window.matchMedia('(prefers-color-scheme: dark)')
if (media.addEventListener) {
  media.addEventListener('change', checkColorTheme)
}
</script>

<style scoped lang="scss">
.lamp {
  cursor: pointer;
  width: 40px;
  margin-left: 16px;
  animation: lamp 1s ease-out;

  &:hover {
    path {
      @include transition(fill);
      fill: var(--color-text-hover);
      @media (min-width: $m) {
      }
    }
  }
}

@keyframes lamp {
  from {
    transform: translateY(-200px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
