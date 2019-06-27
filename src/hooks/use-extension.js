import { useEffect, useState } from 'react'
import {
  ALARM_KEY,
  TOP_SITES_KEY,
  TOP_SITES_USAGE_KEY,
  PAGE_VIEWS_KEY,
  SITE_TIME_KEY,
  SHOW_TOP_SITES_KEY,
  NEW_TAB_CONNECTION,
  BREAK_TIMERS_KEY,
  RESET_USAGE,
  ACTIVITY_NUMBER_KEY,
} from '../constants'
import { toSiteInfo } from '../lib/aggregation'
import { message, topSites as topSitesApi } from '../lib/extension'
import { first } from '../lib/functional'
import { queryParams, shortURL, origin } from '../lib/url'
import { set, create } from '../lib/util'
import { useStorage } from './use-storage'

export const onStorageChange = updateFns => e => {
  const { key } = e
  const fn = updateFns[key]
  console.log({ key, fn, message: 'Storage Changed' })
  if (typeof fn === 'function') {
    fn(null, { refresh: true })
  }
}

export const useExtension = () => {
  const [appReady, setAppReady] = useState(false)
  const [playerIsOpen, setPlayerIsOpen] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [alarmEnabled, setAlarmEnabled] = useStorage(ALARM_KEY)
  const [topSites, setTopSites] = useStorage(TOP_SITES_KEY)
  const [siteTimes, setSiteTimes] = useStorage(SITE_TIME_KEY)
  const [topSitesUsage, setTopSitesUsage] = useStorage(
    TOP_SITES_USAGE_KEY
  )
  const [pageViews, updatePageViews, { pending }] = useStorage(
    PAGE_VIEWS_KEY
  )
  const [showTopSites, updateShowTopSites] = useStorage(
    SHOW_TOP_SITES_KEY
  )
  const [breakTimers, updateBreakTimers] = useStorage(
    BREAK_TIMERS_KEY
  )
  const [activityNumber, updateActivityNumber] = useStorage(
    ACTIVITY_NUMBER_KEY
  )

  const updateFns = {
    [ALARM_KEY]: setAlarmEnabled,
    [TOP_SITES_KEY]: setTopSites,
    [SITE_TIME_KEY]: setSiteTimes,
    [TOP_SITES_USAGE_KEY]: setTopSitesUsage,
    [PAGE_VIEWS_KEY]: updatePageViews,
    [SHOW_TOP_SITES_KEY]: updateShowTopSites,
    [BREAK_TIMERS_KEY]: updateBreakTimers,
    [ACTIVITY_NUMBER_KEY]: updateActivityNumber,
  }

  // mount hook
  useEffect(() => {
    if (!pending && !appReady) {
      updatePageViews(pageViews + 1)
      topSitesApi.get(setTopSites)
      window.addEventListener('storage', onStorageChange(updateFns))
      message(NEW_TAB_CONNECTION)
      setAppReady(true)
      const url = window.location.href
      const { site, play } = queryParams(url)
      if (play) {
        setPlayerIsOpen(true)
      } else if (site) {
        setSelectedSegment({
          label: shortURL(site),
          urls: [origin(site)],
          link: site,
        })
      }
    }
  }, [
    pageViews,
    pending,
    setSiteTimes,
    setTopSites,
    updatePageViews,
    appReady,
    updateFns,
  ])

  const setAlarmEnabledProxy = () => {
    const enabled = !alarmEnabled
    setAlarmEnabled(enabled)
  }

  const setBreakTimer = (url, time, enabled) => {
    const lastBreakTimer = breakTimers[url] || {}
    const nextBreakTimer = Object.assign({}, lastBreakTimer, {
      url,
      time,
      enabled,
    })
    const nextBreakTimers = create(breakTimers, url, nextBreakTimer)
    updateBreakTimers(nextBreakTimers)
  }

  const updateSitesUsed = site => {
    setTopSitesUsage([...topSitesUsage, site])
  }

  const resetUsage = () => {
    message(RESET_USAGE)
  }

  const mappedTopSites = topSites.map(topSite => {
    const { url } = topSite
    const isUsed = topSitesUsage.some(site => site.url === url)
    return Object.assign({ isUsed }, topSite)
  })

  const siteTimesAndTimers = toSiteInfo(siteTimes, breakTimers)

  if (selectedSegment) {
    const { urls } = selectedSegment
    if (urls.length === 1) {
      const originalURL = first(selectedSegment.urls)
      const { breakTimer, time } = siteTimesAndTimers[originalURL]
      set(selectedSegment, 'data', {
        breakTimer,
        time,
        originalURL,
      })
    }
  }

  return [
    {
      topSites: mappedTopSites,
      alarmEnabled,
      pageViews,
      showTopSites,
      siteTimes,
      siteTimesAndTimers,
      appReady,
      breakTimers,
      selectedSegment,
      playerIsOpen,
      activityNumber,
    },
    {
      setAlarmEnabled: setAlarmEnabledProxy,
      setTopSites,
      updateSitesUsed,
      resetUsage,
      updateShowTopSites,
      setBreakTimer,
      setSelectedSegment,
      setPlayerIsOpen,
    },
  ]
}
