import { baseUrl } from './constants'

/**
 * Утилиты для обработки URL изображений
 */

/**
 * Преобразует URL Warcraft в URL изображения
 * @param {string} warcraftUrl - URL из Warcraft
 * @returns {string} URL изображения
 */
export function convertWarcraftUrl(warcraftUrl) {
  if (!warcraftUrl) return ''

  return (
    baseUrl +
    warcraftUrl
      .replace('ReplaceableTextures\\CommandButtons\\', '')
      .replace('CommandButtons/', '')
      .replace('.blp', '.png')
  )
}

/**
 * Проверяет, является ли URL валидным изображением
 * @param {string} url - URL для проверки
 * @returns {boolean} True если URL валиден
 */
export function isValidImageUrl(url) {
  if (!url) return false

  // Проверяем, что URL начинается с http/https или является относительным
  return url.startsWith('http') || url.startsWith('/') || url.startsWith('./')
}

/**
 * Получает URL изображения с fallback
 * @param {string} primaryUrl - Основной URL
 * @param {string} fallbackUrl - URL для fallback
 * @returns {string} URL изображения
 */
export function getImageUrl(primaryUrl, fallbackUrl = '') {
  if (isValidImageUrl(primaryUrl)) {
    return primaryUrl
  }

  if (fallbackUrl && isValidImageUrl(fallbackUrl)) {
    return fallbackUrl
  }

  return ''
}
