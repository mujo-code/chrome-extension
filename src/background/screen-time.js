import { SITE_TIME_KEY } from '../constants'
import { compose } from '../lib/functional'
import { create } from '../lib/util'

const getOrigin = url => new URL(url).origin
const getJSONItem = compose(
  JSON.parse.bind(JSON),
  localStorage.getItem.bind(localStorage)
)

export const updateScreenTime = (url, measures) => {
  const site = getOrigin(url)
  let siteTimes
  try {
    siteTimes = getJSONItem(SITE_TIME_KEY) || {}
  } catch (e) {
    siteTimes = {}
  }
  const totalTime = measures.reduce((total, m) => {
    /* eslint-disable-next-line */
    total += m.duration
    return total
  }, 0)
  const currentSiteTime = (siteTimes[site] || 0) + totalTime
  const nextSiteTimes = create(siteTimes, site, currentSiteTime)
  localStorage.setItem(SITE_TIME_KEY, JSON.stringify(nextSiteTimes))
}
