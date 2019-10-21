import { Url } from '@mujo/utils'
import { useEffect } from 'react'

const { queryParams } = Url

export const useDeeplink = ({
  appReady,
  setPlayerIsOpen,
  setSelectedSegment,
}) => {
  useEffect(() => {
    if (!appReady) {
      const { play } = queryParams(window.location.href)
      if (play) {
        setPlayerIsOpen(true)
      }
    }
  }, [appReady, setPlayerIsOpen, setSelectedSegment])
}
