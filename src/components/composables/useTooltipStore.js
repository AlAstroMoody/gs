import { reactive } from 'vue'

// Глобальное состояние тултипов
export const tooltipStore = reactive({
  content: '',
  visible: false,
  position: { x: 0, y: 0 },
  direction: 'top',
  delay: 100,
  showTimeout: null,
})

// Методы для работы с состоянием
export const tooltipActions = {
  show(content, event, direction = 'top', delay = 100) {
    // Очищаем предыдущий таймаут
    if (tooltipStore.showTimeout) {
      clearTimeout(tooltipStore.showTimeout)
    }

    // Устанавливаем новый таймаут
    tooltipStore.showTimeout = setTimeout(() => {
      const rect = event.target.getBoundingClientRect()
      const { width, height } = window
      let x = rect.left + rect.width / 2
      let y = direction === 'top' ? rect.top : rect.bottom
      // Предварительно ставим тултип по центру (ширина 200)
      if (direction === 'top' || direction === 'bottom') {
        x = x - 100
      }
      if (direction === 'top') {
        y = y - 48
      }
      if (direction === 'bottom') {
        y = y + 8
      }
      if (direction === 'left') {
        x = x - 220
        y = y - 20
      }
      if (direction === 'right') {
        x = x + 8
        y = y - 20
      }
      // Границы экрана
      if (x < 8) x = 8
      if (x + 200 > width - 8) x = width - 208
      if (y < 8) y = 8
      if (y + 40 > height - 8) y = height - 48
      tooltipStore.content = content
      tooltipStore.direction = direction
      tooltipStore.position = { x, y }
      tooltipStore.visible = true
      // Корректировка после рендера по реальной ширине
      requestAnimationFrame(() => {
        const el =
          document.querySelector(
            '[data-tooltip][v-cloak], [data-tooltip]:not([style*="display: none"])'
          ) || document.querySelector('[data-tooltip]')
        if (el) {
          const tipRect = el.getBoundingClientRect()
          let newX = rect.left + rect.width / 2 - tipRect.width / 2
          // Границы экрана
          if (newX < 8) newX = 8
          if (newX + tipRect.width > width - 8) newX = width - tipRect.width - 8
          tooltipStore.position = { x: newX, y }
        }
      })
    }, delay)
  },

  hide() {
    if (tooltipStore.showTimeout) {
      clearTimeout(tooltipStore.showTimeout)
      tooltipStore.showTimeout = null
    }
    tooltipStore.visible = false
  },

  updatePosition() {
    if (!tooltipStore.visible) return

    // Обновляем позицию при изменении размера окна
    const { width, height } = window
    let { x, y } = tooltipStore.position

    // Проверяем границы экрана
    if (x < 8) x = 8
    if (x + 200 > width - 8) x = width - 208
    if (y < 8) y = 8
    if (y + 40 > height - 8) y = height - 48

    tooltipStore.position = { x, y }
  },
}
