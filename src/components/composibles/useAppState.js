import tailwindConfig from 'tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'
import { ref, readonly } from 'vue'

// получаем размеры из конфига тайлвинда
const fullConfig = resolveConfig(tailwindConfig)
const screens = fullConfig.theme.screens

const size = ref({})
const width = ref(0)
// размеры экрана
export function useAppState() {
  const setSize = (newState) => {
    size.value = newState
    let max = 0
    Object.entries(screens).forEach((screen) => {
      if (screen[1].replace('px', '') <= size.value.width) {
        max = screen
      }
    })
    width.value = max[0]
  }

  return { size: readonly(size), width: readonly(width), setSize }
}
