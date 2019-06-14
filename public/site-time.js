let count = 0
const { performance } = window

const VIEWING_START = i => `page_viewing_start_${i}`
const VIEWING_END = i => `page_viewing_ended_${i}`
const PAGE_MEASURES = 'Page Viewing Time'

const sendMSG = (event, data) =>
  chrome.runtime.sendMessage(Object.assign({ event }, data || {}))

const onViewingStart = () => {
  count += 1
  performance.mark(VIEWING_START(count))
}

const onViewingEnd = () => {
  performance.mark(VIEWING_END(count))
  performance.measure(PAGE_MEASURES, VIEWING_START(count), VIEWING_END(count))
  sendMSG(PAGE_MEASURES, { measure: performance.getEntriesByType('measure') })
  performance.clearMarks()
  performance.clearMeasures()
}

const onVisibilityChange = async () => {
  const { visibilityState } = document
  switch (visibilityState) {
    case 'visible':
      onViewingStart()
      break
    case 'hidden':
      onViewingEnd()
      break
    default:
      console.log('visibilitychange happened but not handled', visibilityState)
      break
  }
}
const pageVisibilityEvents = [
  'visibilitychange',
  'webkitvisibilitychange',
  'blur',
]
/* eslint-disable-next-line */
;(function() {
  onViewingStart()
  pageVisibilityEvents.forEach(event => {
    window.addEventListener(event, onVisibilityChange, true)
  })
  window.addEventListener('beforeunload', onViewingEnd)
})()
