import { useEffect, useState } from 'react'
import {
  ALARM_KEY,
  TOP_SITES_KEY,
  TOP_SITES_USAGE_KEY,
  PAGE_VIEWS_KEY,
  SITE_TIME_KEY,
  SHOW_TOP_SITES_KEY,
  NEW_TAB_CONNECTION,
  CLEAR_ALARM,
  SET_ALARM,
  BREAK_TIMERS_KEY,
} from '../constants'
import { message, topSites as topSitesApi } from '../lib/extension'
import { first } from '../lib/functional'
import { set, create } from '../lib/util'
import { useStorage } from './use-storage'

export const onStorageChange = ({ setSiteTimes }) => e => {
  // TODO: make this refrersh all keys, need better way to access refresh
  switch (e.key) {
    case SITE_TIME_KEY:
      // refresh will update value from localStorage
      setSiteTimes(null, { refresh: true })
      break
    default:
  }
}

export const useExtension = () => {
  const [appReady, setAppReady] = useState(false)
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

  // mount hook
  useEffect(
    () => {
      if (!pending && !appReady) {
        updatePageViews(pageViews + 1)
        topSitesApi.get(setTopSites)
        window.addEventListener(
          'storage',
          onStorageChange({ setSiteTimes })
        )
        message(NEW_TAB_CONNECTION)
        setAppReady(true)
      }
    },
    [
      pageViews,
      pending,
      setSiteTimes,
      setTopSites,
      updatePageViews,
      appReady,
    ] /* NOTE: stops useEffect from continuing firing */
  )

  const setAlarmEnabledProxy = () => {
    const enabled = !alarmEnabled
    setAlarmEnabled(enabled)
    if (enabled) {
      message(SET_ALARM)
    } else {
      message(CLEAR_ALARM)
    }
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
    updatePageViews(0)
    setTopSitesUsage([])
  }

  const mappedTopSites = topSites.map(topSite => {
    const { url } = topSite
    const isUsed = topSitesUsage.some(site => site.url === url)
    return Object.assign({ isUsed }, topSite)
  })

  const siteTimesAndTimers = Object.keys(siteTimes).reduce(
    (accum, url) => {
      set(accum, url, accum[url] || {})
      set(accum[url], 'time', siteTimes[url])
      set(accum[url], 'breakTimer', breakTimers[url] || {})
      return accum
    },
    {}
  )

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
    },
    {
      setAlarmEnabled: setAlarmEnabledProxy,
      setTopSites,
      updateSitesUsed,
      resetUsage,
      updateShowTopSites,
      setBreakTimer,
      setSelectedSegment,
    },
  ]
}
