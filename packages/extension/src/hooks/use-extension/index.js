import { IngressProvider } from '@mujo/ingress'
import { Extension } from '@mujo/utils'
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
  CURRENT_TAB_KEY,
} from '../../constants'
import { useSubscription } from '../use-subscription'
import { decorateSelectedSegment, mapTopSites } from './transforms'
import { useBreaktimerCallback } from './use-breaktimer-callback'
import { useDeeplink } from './use-deeplink'
import { useModel } from './use-model'
import { useSettings } from './use-settings'
import { useTabs } from './use-tabs'
import { useEndScreen } from './use-end-screen'
import { useTopsitesAPI } from './use-topsites-api'

const { message } = Extension

const context = React.createContext()
const { Provider } = context

export const ExtensionProvider = props => {
  // state
  const { shouldRegisterApp } = props
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
  const endScreenInterface = useEndScreen()

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
  const settingsInterface = useSettings()
  // TODO avoid mutation
  decorateSelectedSegment({ selectedSegment })

  return (
    <Provider
      value={{
        user,
        topSites: mappedTopSites,
        alarmEnabled,
        breathAmount,
        setBreathAmount,
        pageViews,
        showTopSites,
        siteTimes,
        appReady,
        breakTimers,
        selectedSegment,
        playerIsOpen,
        activityNumber,
        upsellModal,
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
        ...settingsInterface,
        ...tabInterface,
        ...endScreenInterface,
      }}
    >
      <IngressProvider>{props.children}</IngressProvider>
    </Provider>
  )
}

export const useExtension = () => useContext(context)
