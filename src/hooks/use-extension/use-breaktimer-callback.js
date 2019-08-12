import { useCallback } from 'react'
import {
  MAX_BREAKTIMER_MODAL,
  MAX_BREAKTIMERS,
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
} from '../../constants'
import { shortURL } from '../../lib/url'
import { create } from '../../lib/util'

export const useBreaktimerCallback = ({
  breakTimers,
  setUpsellModal,
  updateBreakTimers,
  user,
}) => {
  const setBreakTimer = useCallback(
    (url, time, enabled) => {
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
    },
    [
      breakTimers,
      setUpsellModal,
      updateBreakTimers,
      user.isSubscribed,
    ]
  )
  return { setBreakTimer }
}
