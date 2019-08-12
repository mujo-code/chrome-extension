import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react'
import {
  NEW_TAB_CONNECTION,
  RESET_USAGE,
  APP_READY_KEY,
  SCREEN_TIME_PERMISSIONS,
} from '../../constants'
import { toSiteInfo } from '../../lib/aggregation'
import { message, topSites as topSitesApi } from '../../lib/extension'
import { usePermissions } from '../use-permissions'
import { useSubscription } from '../use-subscription'
import { makeSettings } from './settings'
import { decorateSelectedSegment, mapTopSites } from './transforms'
import { useBreaktimerCallback } from './use-breaktimer-callback'
import { useDeeplink } from './use-deeplink'
import { useModel } from './use-model'

const context = React.createContext()
const { Provider } = context

export const ExtensionProvider = props => {
  // state
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

  // effects
  useDeeplink({
    appReady,
    setPlayerIsOpen,
    setSelectedSegment,
  })
  useEffect(() => {
    if (!pending && !appReady) {
      updatePageViews(pageViews + 1)
      message(NEW_TAB_CONNECTION)
      topSitesApi.get(setTopSites)
      setAppReady(true)
      if (typeof window[APP_READY_KEY] === 'function') {
        window[APP_READY_KEY]()
      }
      window[APP_READY_KEY] = true
    }
  }, [
    pageViews,
    pending,
    setSiteTimes,
    setTopSites,
    updatePageViews,
    appReady,
  ])

  // callbacks
  const setAlarmEnabledProxy = useCallback(() => {
    const enabled = !alarmEnabled
    setAlarmEnabled(enabled)
  }, [alarmEnabled, setAlarmEnabled])
  const { setBreakTimer } = useBreaktimerCallback({
    breakTimers,
    setUpsellModal,
    updateBreakTimers,
    user,
  })
  const updateSitesUsed = useCallback(
    site => {
      setTopSitesUsage([...topSitesUsage, site])
    },
    [setTopSitesUsage, topSitesUsage]
  )
  const resetUsage = useCallback(() => {
    message(RESET_USAGE)
  }, [])

  // data transforms
  const mappedTopSites = topSites.map(mapTopSites(topSitesUsage))
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

  // TODO avoid mutation
  decorateSelectedSegment({ selectedSegment, siteTimesAndTimers })

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
