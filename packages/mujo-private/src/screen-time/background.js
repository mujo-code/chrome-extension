import { useStorage, useMessage, context } from '@mujo/plugins'
import { useCallback, useContext } from 'react'
import { SITE_TIME_KEY } from '../constants'

const origin = url => new URL(url).origin

export const ScreenTimeBackground = ({ api }) => {
  const { constants, storage } = useContext(context)
  const [siteTimes, setSiteTimes] = useStorage(SITE_TIME_KEY)
  const [identity] = useStorage(constants.ID_KEY)
  // callback
  const updateScreenTime = useCallback(
    async (url, measures) => {
      const site = origin(url)
      const totalTime = measures.reduce((total, m) => {
        /* eslint-disable-next-line */
        total += m.duration
        return total
      }, 0)
      const currentSiteTime = (siteTimes[site] || 0) + totalTime
      const nextSiteTimes = { ...siteTimes, [site]: currentSiteTime }
      setSiteTimes(nextSiteTimes)
      const activityNumber = await storage.get(constants.ACTIVITY_NUMBER_KEY)
      await api.addActivity({
        d: new Date().toISOString(),
        i: identity,
        n: activityNumber,
      })
    },
    [
      siteTimes,
      setSiteTimes,
      api,
      identity,
      constants.ACTIVITY_NUMBER_KEY,
      storage,
    ]
  )
  // effects
  useMessage(({ request, sender, sendResponse }) => {
    const { event } = request
    if (event === constants.PAGE_VIEWING_TIME) {
      updateScreenTime(sender.url, request.measure)
    }
  })

  return null
}
