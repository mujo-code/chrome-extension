/* global chrome */
import { useEffect } from 'react'
import {
  usePersistantState,
  stampJSONOptions,
  stampBooleanOptions,
} from './use-persistant-state'

const ALARM_DEFAULT_VALUE = true
const LOCAL_STORAGE_ALARM_KEY = 'MINDFUL_ALARM'
const LOCAL_STORAGE_TOP_SITES_KEY = 'TOP_SITES'
const LOCAL_STORAGE_TOP_SITES_USAGE_KEY = 'TOP_SITES_USAGE'
const PAGE_VIEWS_KEY = 'PAGE_VIEWS'
const SHOW_TOP_SITES_KEY = 'SHOW_TOP_SITES'
// actions
const NEW_TAB_CONNECTION = 'New Connection'
const CLEAR_ALARM = 'Clear Alarm'
const SET_ALARM = 'Set Alarm'

const sendToBackground = event => chrome.runtime.sendMessage({ event })

export const onStorageChange = () => e => {
  // potentially close tab
  switch (e.key) {
    case PAGE_VIEWS_KEY:
      chrome.tabs.getCurrent(tab => {
        chrome.tabs.remove(tab.id, () => {})
      })
      break
    default:
  }
}

export const useAppState = () => {
  const [alarmEnabled, setAlarmEnabled] = usePersistantState(
    LOCAL_STORAGE_ALARM_KEY,
    stampBooleanOptions({ defaultValue: ALARM_DEFAULT_VALUE })
  )
  const [topSites, setTopSites] = usePersistantState(
    LOCAL_STORAGE_TOP_SITES_KEY,
    stampJSONOptions({ defaultValue: [] })
  )
  const [topSitesUsage, setTopSitesUsage] = usePersistantState(
    LOCAL_STORAGE_TOP_SITES_USAGE_KEY,
    stampJSONOptions({ defaultValue: [] })
  )
  const [pageViews, updatePageViews] = usePersistantState(
    PAGE_VIEWS_KEY,
    stampJSONOptions({ defaultValue: 0 })
  )
  const [showTopSites, updateShowTopSites] = usePersistantState(
    SHOW_TOP_SITES_KEY,
    stampBooleanOptions({ defaultValue: true })
  )

  // mount hook
  useEffect(
    () => {
      updatePageViews(pageViews + 1)
      chrome.topSites.get(setTopSites)
      window.addEventListener('storage', onStorageChange())
      sendToBackground(NEW_TAB_CONNECTION)
    },
    [] /* NOTE: stops useEffect from continuing firing */
  )

  const setAlarmEnabledProxy = () => {
    const enabled = !alarmEnabled
    setAlarmEnabled(enabled)
    if (enabled) {
      sendToBackground(SET_ALARM)
    } else {
      sendToBackground(CLEAR_ALARM)
    }
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

  return [
    { topSites: mappedTopSites, alarmEnabled, pageViews, showTopSites },
    {
      setAlarmEnabled: setAlarmEnabledProxy,
      setTopSites,
      updateSitesUsed,
      resetUsage,
      updateShowTopSites,
    },
  ]
}
