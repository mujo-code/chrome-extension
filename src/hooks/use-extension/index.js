import { IngressProvider } from '@mujo/ingress'
import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  NEW_TAB_CONNECTION,
  RESET_USAGE,
  APP_READY_KEY,
  SCREEN_TIME_PERMISSIONS,
  TRANSLATION_FILE,
  CURRENT_TAB_KEY,
} from '../../constants'
import { toSiteInfo } from '../../lib/aggregation'
import { message } from '../../lib/extension'
import { usePermissions } from '../use-permissions'
import { useSubscription } from '../use-subscription'
import { useSettings } from './settings'
import { decorateSelectedSegment, mapTopSites } from './transforms'
import { useBreaktimerCallback } from './use-breaktimer-callback'
import { useDeeplink } from './use-deeplink'
import { useModel } from './use-model'
import { useTabs } from './use-tabs'
import { useTopsitesAPI } from './use-topsites-api'

const context = React.createContext()
const { Provider } = context

export const ExtensionProvider = props => {
  // state
  const { shouldRegisterApp } = props
  const { t } = useTranslation(TRANSLATION_FILE)
  const [appReady, setAppReady] = useState(false)
  const [playerIsOpen, setPlayerIsOpen] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [upsellModal, setUpsellModal] = useState(null)
  const tabInterface = useTabs(CURRENT_TAB_KEY)
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
    breathAmount,
    setBreathAmount,
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
  useTopsitesAPI({ setTopSites })
  useEffect(() => {
    if (!pending && !appReady && shouldRegisterApp) {
      updatePageViews(pageViews + 1)
      message(NEW_TAB_CONNECTION)
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
    shouldRegisterApp,
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

  // transforms
  const mappedTopSites = topSites.map(mapTopSites(topSitesUsage))
  const siteTimesAndTimers = toSiteInfo(siteTimes, breakTimers)
  const settings = useSettings({
    user,
    setUpsellModal,
    alarmEnabled,
    setAlarmEnabled,
    hasPermission,
    requestPermissions,
    removePermissions,
    breathAmount,
    setBreathAmount,
    t,
  })
  // TODO avoid mutation
  decorateSelectedSegment({ selectedSegment, siteTimesAndTimers })

  return (
    <Provider
      value={{
        topSites: mappedTopSites,
        alarmEnabled,
        breathAmount,
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
        ...tabInterface,
      }}
    >
      <IngressProvider>{props.children}</IngressProvider>
    </Provider>
  )
}

export const useExtension = () => useContext(context)
