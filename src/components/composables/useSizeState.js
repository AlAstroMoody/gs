import { ref, readonly } from 'vue'

// Захардкоженные брейкпоинты (px)
const breakpoints = {
  xxs: 320,
  xs: 460,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1280,
  xxl: 1440,
}

const size = ref({})
const width = ref(0)
const breakpoint = ref('')

export function useSizeState() {
  const setSize = (newState) => {
    size.value = newState
    let current = 'xxs'
    for (const [name, px] of Object.entries(breakpoints)) {
      if (size.value.width >= px) {
        current = name
      }
    }
    width.value = breakpoints[current]
    breakpoint.value = current
  }

  return { size: readonly(size), width: readonly(width), breakpoint: readonly(breakpoint), setSize }
}
