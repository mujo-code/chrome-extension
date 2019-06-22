import {
  onVisibilityChange,
  onViewingStart,
  onViewingEnd,
} from './content/timing'

onViewingStart()
window.document.addEventListener(
  'visibilitychange',
  onVisibilityChange,
  true
)
window.addEventListener('beforeunload', onViewingEnd)
