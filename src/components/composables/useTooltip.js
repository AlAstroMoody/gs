import { useEventListener, useWindowSize } from '@vueuse/core'
import { ref, computed } from 'vue'

export function useTooltip() {
  const content = ref('')
  const position = ref('top')
  const visible = ref(false)
  const coords = ref({ x: 0, y: 0 })
  const delay = ref(300)
  const showTimeout = ref(null)

  const { width, height } = useWindowSize()

  const showTooltip = (tooltipContent, event, tooltipPosition = 'top', tooltipDelay = 300) => {
    clearTimeout(showTimeout.value)

    showTimeout.value = setTimeout(() => {
      content.value = tooltipContent
      position.value = tooltipPosition
      delay.value = tooltipDelay

      // Вычисляем позицию относительно элемента
      const rect = event.target.getBoundingClientRect()
      coords.value = {
        x: rect.left + rect.width / 2,
        y: tooltipPosition === 'top' ? rect.top : rect.bottom,
      }

      visible.value = true
    }, tooltipDelay)
  }

  const hideTooltip = () => {
    clearTimeout(showTimeout.value)
    visible.value = false
  }

  // Автоматическое скрытие при клике вне тултипа
  useEventListener(document, 'click', (event) => {
    if (visible.value && !event.target.closest('[data-tooltip]')) {
      hideTooltip()
    }
  })

  // Автоматическое скрытие при скролле
  useEventListener(window, 'scroll', () => {
    if (visible.value) {
      hideTooltip()
    }
  })

  const tooltipStyle = computed(() => {
    if (!visible.value) return {}

    let x = coords.value.x
    let y = coords.value.y

    // Корректируем позицию в зависимости от направления
    switch (position.value) {
      case 'top':
        y = y - 40 // примерная высота тултипа
        x = x - 100 // примерная ширина тултипа / 2
        break
      case 'bottom':
        y = y + 8
        x = x - 100
        break
    }

    // Проверяем границы экрана
    if (x < 8) x = 8
    if (x + 200 > width.value - 8) x = width.value - 208
    if (y < 8) y = 8
    if (y + 40 > height.value - 8) y = height.value - 48

    return {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 9999,
    }
  })

  return {
    content,
    position,
    visible,
    tooltipStyle,
    showTooltip,
    hideTooltip,
  }
}
