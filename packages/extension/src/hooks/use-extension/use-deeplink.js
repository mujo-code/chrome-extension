import { Url } from '@mujo/utils'
import { useEffect, useState } from 'react'

const { queryParams } = Url

export const useDeeplink = ({ appReady, setPlayerIsOpen }) => {
  const [query, setQueryParam] = useState({})
  useEffect(() => {
    if (appReady) {
      requestIdleCallback(() => {
        const params = queryParams(window.location.href)
        setQueryParam(params)
        const { play } = params
        if (play) {
          setPlayerIsOpen(true)
        }
      })
    }
  }, [appReady, setPlayerIsOpen])
  return { query }
}
