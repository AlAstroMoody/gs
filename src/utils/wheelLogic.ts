import { computed, ref } from 'vue'

export default function(wheelScrollableBlock) {
  const currentYPosition = ref(0)
  const heightDifference = computed(() =>
    wheelScrollableBlock.scrollHeight - wheelScrollableBlock.clientHeight,
  )

  const wheelWatcher = (event: WheelEvent) => {
    if (currentYPosition.value + event.deltaY < 0) {
      if (event.deltaY > 0) {
        currentYPosition.value += event.deltaY * 4
      } else {
        if (-currentYPosition.value + event.deltaY < heightDifference.value) {
          currentYPosition.value = currentYPosition.value += event.deltaY * 4
        }
      }
    }

    // extremum points
    currentYPosition.value >= 0 ? currentYPosition.value = 0 : null
    currentYPosition.value + heightDifference.value < 0
      ? currentYPosition.value = -heightDifference.value
      : null

    wheelScrollableBlock.style.transform = `translateY(${currentYPosition.value}px)`
  }

  wheelScrollableBlock.addEventListener('wheel', wheelWatcher)
  // removeEventListener ??
  return {
    currentYPosition,
  }
}