import { computed } from 'vue'

import { tooltipStore, tooltipActions } from './useTooltipStore.js'

export function useTooltip() {
  const tooltipStyle = computed(() => {
    if (!tooltipStore.visible) return {}

    return {
      position: 'fixed',
      left: `${tooltipStore.position.x}px`,
      top: `${tooltipStore.position.y}px`,
      zIndex: 99999,
    }
  })

  const showTooltip = (content, event, direction = 'top', delay = 200) => {
    tooltipActions.show(content, event, direction, delay)
  }

  const hideTooltip = () => {
    tooltipActions.hide()
  }

  return {
    content: computed(() => tooltipStore.content),
    visible: computed(() => tooltipStore.visible),
    direction: computed(() => tooltipStore.direction),
    tooltipStyle,

    showTooltip,
    hideTooltip,
  }
}
