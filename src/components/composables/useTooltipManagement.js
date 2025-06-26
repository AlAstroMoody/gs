import { useTooltip } from './useTooltip.js'

/**
 * Композабл для управления тултипами с предустановленными настройками
 */
export function useTooltipManagement() {
  const { showTooltip, hideTooltip } = useTooltip()

  /**
   * Показывает тултип для строки
   * @param {string} name - Текст для отображения в тултипе
   * @param {Event} event - Событие мыши
   */
  const showTooltipForElement = (name, event) => {
    showTooltip(name, event, 'top', 200)
  }

  return {
    showTooltip: showTooltipForElement,
    hideTooltip,
  }
}
