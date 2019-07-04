import {
  SITE_TIME_KEY,
  LAST_ACTIVE_KEY,
  FOURTY_FIVE_MINUTES,
  PAGE_VIEWS_KEY,
  TOP_SITES_USAGE_KEY,
  ACTIVITY_NUMBER_KEY,
  HOUR,
} from '../../constants'
import { toSiteInfo, getTotalTime } from '../../lib/aggregation'
import statsModel from '../../model'
import { storage } from '../storage'
import { addLatestActivity } from '../storage/index-db'

export const activityStatKeys = [
  PAGE_VIEWS_KEY,
  TOP_SITES_USAGE_KEY,
  SITE_TIME_KEY,
]

export const getTotalSiteTime = async () => {
  const times = await storage.get(SITE_TIME_KEY)
  const siteInfo = toSiteInfo(times, {})
  return getTotalTime(siteInfo)
}

export const isActive = async (now = new Date()) => {
  const lastActive = await storage.get(LAST_ACTIVE_KEY)
  if (lastActive === 0) return true
  const timeSinceLastActive = +now - lastActive
  return timeSinceLastActive < FOURTY_FIVE_MINUTES
}

export const updateActivityNumber = async () => {
  const totalSiteTimes = await getTotalSiteTime()
  const pageViews = await storage.get(PAGE_VIEWS_KEY)
  const lastActivityNumber = await storage.get(ACTIVITY_NUMBER_KEY)
  // totalSiteTimes + hour for each page view / 1000
  const newActivityNumber = (totalSiteTimes + pageViews * HOUR) / 1000
  if (lastActivityNumber === newActivityNumber) return
  await storage.set(ACTIVITY_NUMBER_KEY, newActivityNumber)
}

export const resetUsage = async () =>
  Promise.all(
    activityStatKeys.map(key =>
      storage.set(key, statsModel[key].defaultValue)
    )
  )

export const setLastActive = async date => {
  const now = date || new Date()
  const wasActive = await isActive()
  if (!wasActive) {
    // means user probably took a break from their computer
    // reset activity before setting last active
    await resetUsage()
  }
  await addLatestActivity(now)
  return storage.set(LAST_ACTIVE_KEY, +now)
}
