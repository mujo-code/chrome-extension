export const shouldDisplayModal = (timer, siteTime) => {
  const hasTimer = timer && timer.enabled && timer.time > 0
  const hasTime = siteTime > 0
  if (!hasTime || !hasTimer) {
    return false
  }
  return timer.time <= siteTime
}
