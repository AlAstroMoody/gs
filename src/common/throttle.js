// - callee, функция, которую надо вызывать;
// - timeout, интервал в мс, с которым следует пропускать вызовы.
export const throttle = (callee, timeout) => {
  let timer = null
  if (timer) return

  timer = setTimeout(() => {
    callee()
    clearTimeout(timer)
    timer = null
  }, timeout)
}
