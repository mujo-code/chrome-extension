import { Url } from '@mujo/utils'
import { useEffect } from 'react'

const { queryParams } = Url

export const useDeeplink = ({ appReady, setPlayerIsOpen }) => {
  useEffect(() => {
    if (appReady) {
      setTimeout(() => {
        const { play } = queryParams(window.location.href)
        if (play) {
          setPlayerIsOpen(true)
        }
      }, 500)
    }
  }, [appReady, setPlayerIsOpen])
}
