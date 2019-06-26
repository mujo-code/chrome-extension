import { SITE_TIME_KEY } from '../constants'
import { origin } from '../lib/url'
import { create } from '../lib/util'
import { storage } from './storage'

export const updateScreenTime = async (url, measures) => {
  const site = origin(url)
  const siteTimes = (await storage.get(SITE_TIME_KEY)) || {}
  const totalTime = measures.reduce((total, m) => {
    /* eslint-disable-next-line */
    total += m.duration
    return total
  }, 0)
  const currentSiteTime = (siteTimes[site] || 0) + totalTime
  const nextSiteTimes = create(siteTimes, site, currentSiteTime)
  await storage.set(SITE_TIME_KEY, nextSiteTimes)
}
