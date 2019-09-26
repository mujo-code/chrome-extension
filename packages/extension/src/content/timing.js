import { Extension } from '@mujo/utils'

const { message } = Extension
let count = 0
const { performance } = window

const VIEWING_START = i => `page_viewing_start_${i}`
const VIEWING_END = i => `page_viewing_ended_${i}`
const PAGE_MEASURES = 'Page Viewing Time'

export const onViewingStart = () => {
  count += 1
  performance.mark(VIEWING_START(count))
}

export const onViewingEnd = () => {
  performance.mark(VIEWING_END(count))
  performance.measure(
    PAGE_MEASURES,
    VIEWING_START(count),
    VIEWING_END(count)
  )
  const data = { measure: performance.getEntriesByType('measure') }
  message(PAGE_MEASURES, data)
  performance.clearMarks()
  performance.clearMeasures()
}

export const onVisibilityChange = async () => {
  const { visibilityState } = document
  switch (visibilityState) {
    case 'visible':
      onViewingStart()
      break
    case 'hidden':
      onViewingEnd()
      break
    default:
      break
  }
}
