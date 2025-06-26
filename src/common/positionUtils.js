/**
 * Утилиты для позиционирования элементов в интерфейсе
 */

// Константы размеров
export const SIZES = {
  GOBLIN_ICON: 84,
  ITEM_ICON: 64,
  GAP: 4,
}

// Базовые координаты для разных панелей
export const BASE_COORDS = {
  GOBLINS: {
    left: 208, // left-52
    bottom: 96, // bottom-24
  },
  ITEMS: {
    left: 8, // left-2
    bottom: 160, // bottom-40
  },
  SKILLS: {
    left: 208, // left-52
    bottom: 96, // bottom-24
  },
}

/**
 * Создает стили позиционирования для сетки 4x2
 * @param {number} index - Индекс элемента
 * @param {Object} options - Опции позиционирования
 * @param {number} options.size - Размер элемента
 * @param {Object} options.baseCoords - Базовые координаты
 * @param {number} options.gap - Отступ между элементами
 * @returns {Object} Стили для позиционирования
 */
export function createGridPositionStyle(index, { size, baseCoords, gap = SIZES.GAP }) {
  const row = index < 4 ? 0 : 1
  const col = index % 4

  return {
    position: 'absolute',
    left: `${baseCoords.left + col * (size + gap)}px`,
    bottom: `${baseCoords.bottom + row * (size + gap)}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 1,
  }
}

/**
 * Создает стили позиционирования для гоблинов
 * @param {number} index - Индекс гоблина
 * @returns {Object} Стили для позиционирования
 */
export function createGoblinPositionStyle(index) {
  return createGridPositionStyle(index, {
    size: SIZES.GOBLIN_ICON,
    baseCoords: BASE_COORDS.GOBLINS,
  })
}

/**
 * Создает стили позиционирования для предметов
 * @param {number} index - Индекс предмета
 * @returns {Object} Стили для позиционирования
 */
export function createItemPositionStyle(index) {
  return createGridPositionStyle(index, {
    size: SIZES.ITEM_ICON,
    baseCoords: BASE_COORDS.ITEMS,
  })
}

/**
 * Создает стили позиционирования для скиллов
 * @param {number} index - Индекс скилла
 * @returns {Object} Стили для позиционирования
 */
export function createSkillPositionStyle(index) {
  return createGridPositionStyle(index, {
    size: SIZES.GOBLIN_ICON,
    baseCoords: BASE_COORDS.SKILLS,
  })
}
