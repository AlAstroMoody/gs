import {
  createGoblinPositionStyle,
  createItemPositionStyle,
  createSkillPositionStyle,
} from '@/common/positionUtils'

/**
 * Композабл для управления позиционированием элементов в панелях
 */
export function usePanelPositioning() {
  const getGoblinStyle = (index) => createGoblinPositionStyle(index)

  const getItemStyle = (index) => createItemPositionStyle(index)

  const getSkillStyle = (index) => createSkillPositionStyle(index)

  const isActive = (element, activeElement) => element?.id === activeElement?.id

  const getActiveClasses = (isActive) => ({
    'border-white': isActive,
    'border-transparent': !isActive,
  })

  return {
    getGoblinStyle,
    getItemStyle,
    getSkillStyle,
    isActive,
    getActiveClasses,
  }
}
