import React, { useEffect, useState, useContext } from 'react'
import {
  NEW_TAB_CONNECTION,
  RESET_USAGE,
  MAX_BREAKTIMER_MODAL,
  MAX_BREAKTIMERS,
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
  APP_READY_KEY,
  SCREEN_TIME_PERMISSIONS,
} from '../../constants'
import { toSiteInfo } from '../../lib/aggregation'
import { message, topSites as topSitesApi } from '../../lib/extension'
import { first } from '../../lib/functional'
import { queryParams, shortURL, origin } from '../../lib/url'
import { set, create } from '../../lib/util'
import { usePermissions } from '../use-permissions'
import { useSubscription } from '../use-subscription'
import { makeSettings } from './settings'
import { useModel } from './use-model'

const context = React.createContext()
const { Provider } = context

export const ExtensionProvider = props => {
  const [appReady, setAppReady] = useState(false)
  const [playerIsOpen, setPlayerIsOpen] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [upsellModal, setUpsellModal] = useState(null)
  const {
    alarmEnabled,
    setAlarmEnabled,
    topSites,
    setTopSites,
    siteTimes,
    setSiteTimes,
    topSitesUsage,
    setTopSitesUsage,
    pageViews,
    updatePageViews,
    pending,
    showTopSites,
    updateShowTopSites,
    breakTimers,
    updateBreakTimers,
    activityNumber,
  } = useModel()
  const { user } = useSubscription()
  const {
    hasPermission,
    requestPermissions,
    removePermissions,
  } = usePermissions(SCREEN_TIME_PERMISSIONS)

  // mount hook
  useEffect(() => {
    if (!pending && !appReady) {
      updatePageViews(pageViews + 1)
      topSitesApi.get(setTopSites)
      message(NEW_TAB_CONNECTION)
      setAppReady(true)
      if (typeof window[APP_READY_KEY] === 'function') {
        window[APP_READY_KEY]()
      }
      window[APP_READY_KEY] = true
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
    const overLimit = enabledTimers.length > MAX_BREAKTIMERS
    if (overLimit && !user.isSubscribed) {
      setUpsellModal({
        name: MAX_BREAKTIMER_MODAL,
        url: shortURL(url),
        onClick: () =>
          setUpsellModal({
            name: SUB_DETAILS_MODAL,
            sku: CURRENT_SUB_SKU,
            callback: () => setBreakTimer(url, time, enabled),
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

  const settings = makeSettings({
    user,
    setUpsellModal,
    alarmEnabled,
    setAlarmEnabled,
    hasPermission,
    requestPermissions,
    removePermissions,
  })

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

  return (
    <Provider
      value={[
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
          settings,
          screenTime: {
            hasPermission,
            requestPermissions,
            removePermissions,
          },
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
      ]}
    >
      {props.children}
    </Provider>
  )
}

export const useExtension = () => useContext(context)
