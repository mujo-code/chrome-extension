import { Extension } from '@mujo/utils'
import { useState, useEffect } from 'react'
import {
  ALARM_KEY,
  TOP_SITES_KEY,
  TOP_SITES_USAGE_KEY,
  PAGE_VIEWS_KEY,
  SHOW_TOP_SITES_KEY,
  BREAK_TIMERS_KEY,
  ACTIVITY_NUMBER_KEY,
  VALUE_CHANGED,
  ADD_BROADCAST_TAB,
  BREATH_AMOUNT_KEY,
} from '../../constants'
import { useStorage } from '../use-storage'

const { onMessage, message } = Extension

export const onBackgroundMessage = updateFns => payload => {
  const { key, event } = payload
  if (event !== VALUE_CHANGED) return
  const fn = updateFns[key]
  if (typeof fn === 'function') {
    fn(null, { refresh: true })
  }
}

// TODO: can probably just use model object for this.
export const useModel = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [alarmEnabled, setAlarmEnabled] = useStorage(ALARM_KEY)
  const [topSites, setTopSites] = useStorage(TOP_SITES_KEY)
  const [topSitesUsage, setTopSitesUsage] = useStorage(
    TOP_SITES_USAGE_KEY
  )
  const [
    pageViews,
    updatePageViews,
    { pending: pageViewPending },
  ] = useStorage(PAGE_VIEWS_KEY)
  const [showTopSites, updateShowTopSites] = useStorage(
    SHOW_TOP_SITES_KEY
  )
  const [breakTimers, updateBreakTimers] = useStorage(
    BREAK_TIMERS_KEY
  )
  const [activityNumber, updateActivityNumber] = useStorage(
    ACTIVITY_NUMBER_KEY
  )
  const [
    breathAmount,
    setBreathAmount,
    { pending: breathAmountPending },
  ] = useStorage(BREATH_AMOUNT_KEY)
  const updateFns = {
    [ALARM_KEY]: setAlarmEnabled,
    [TOP_SITES_KEY]: setTopSites,
    [TOP_SITES_USAGE_KEY]: setTopSitesUsage,
    [PAGE_VIEWS_KEY]: updatePageViews,
    [SHOW_TOP_SITES_KEY]: updateShowTopSites,
    [BREAK_TIMERS_KEY]: updateBreakTimers,
    [ACTIVITY_NUMBER_KEY]: updateActivityNumber,
    [BREATH_AMOUNT_KEY]: setBreathAmount,
  }
  useEffect(() => {
    if (!isConnected) {
      message(ADD_BROADCAST_TAB)
      onMessage(onBackgroundMessage(updateFns))
      setIsConnected(true)
    }
  }, [updateFns, isConnected, setIsConnected])

  const pending = breathAmountPending || pageViewPending

  return {
    alarmEnabled,
    setAlarmEnabled,
    topSites,
    setTopSites,
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
    updateActivityNumber,
    breathAmount,
    setBreathAmount,
  }
}
