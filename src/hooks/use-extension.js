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
  ADD_BROADCAST_TAB,
  VALUE_CHANGED,
  MAX_BREAKTIMER_MODAL,
  MAX_BREAKTIMERS,
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
} from '../constants'
import { toSiteInfo } from '../lib/aggregation'
import {
  message,
  topSites as topSitesApi,
  onMessage,
} from '../lib/extension'
import { first } from '../lib/functional'
import { queryParams, shortURL, origin } from '../lib/url'
import { set, create } from '../lib/util'
import { useStorage } from './use-storage'

export const onBackgroundMessage = updateFns => payload => {
  const { key, event } = payload
  if (event !== VALUE_CHANGED) return
  const fn = updateFns[key]
  if (typeof fn === 'function') {
    fn(null, { refresh: true })
  }
}

export const useExtension = () => {
  const [appReady, setAppReady] = useState(false)
  const [playerIsOpen, setPlayerIsOpen] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [upsellModal, setUpsellModal] = useState(null)
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
      onMessage(onBackgroundMessage(updateFns))
      message(NEW_TAB_CONNECTION)
      message(ADD_BROADCAST_TAB)
      setAppReady(true)
      const { site, play } = queryParams(window.location.href)
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
    const enabledTimers = Object.keys(nextBreakTimers).filter(
      key => nextBreakTimers[key].enabled
    )
    if (enabledTimers.length > MAX_BREAKTIMERS) {
      setUpsellModal({
        name: MAX_BREAKTIMER_MODAL,
        url: shortURL(url),
        onClick: () =>
          setUpsellModal({
            name: SUB_DETAILS_MODAL,
            sku: CURRENT_SUB_SKU,
          }),
      })
      return
    }
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
      upsellModal,
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
      setUpsellModal,
      updateBreakTimers,
    },
  ]
}
