import { ref } from 'vue'

// Проверяем поддержку View Transition API
const isSupported = ref(false)

// Инициализируем проверку поддержки
if (typeof document !== 'undefined') {
  isSupported.value = 'startViewTransition' in document
}

/**
 * Композабл для работы с View Transition API
 * @returns {Object} Объект с методами для работы с переходами
 */
export function useViewTransition() {
  /**
   * Выполняет переход с анимацией, если браузер поддерживает View Transition API
   * @param {Function} callback - Функция, которая будет выполнена во время перехода
   * @returns {Promise} Промис, который разрешается после завершения перехода
   */
  const startTransition = (callback) => {
    if (isSupported.value && document.startViewTransition) {
      return document.startViewTransition(callback)
    } else {
      // Если View Transition API не поддерживается, выполняем callback без анимации
      return new Promise((resolve) => {
        callback()
        resolve()
      })
    }
  }

  /**
   * Проверяет, поддерживает ли браузер View Transition API
   * @returns {boolean} true, если поддерживается
   */
  const isViewTransitionSupported = () => isSupported.value

  return {
    startTransition,
    isViewTransitionSupported,
    isSupported: isSupported.value
  }
} 