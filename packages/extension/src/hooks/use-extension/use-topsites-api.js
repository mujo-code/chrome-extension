import { Extension } from '@mujo/utils'
import { useState, useEffect } from 'react'
import { DEFAULT_URLS } from '../../constants'

const { topSites } = Extension

const getTopSites = async set => {
  set(await topSites.get())
}

export const useTopsitesAPI = ({ setTopSites }) => {
  const [hasRefreshTopSites, setHasRefreshedTopSites] = useState(
    false
  )
  useEffect(() => {
    if (!hasRefreshTopSites && topSites) {
      try {
        getTopSites(setTopSites)
      } catch (e) {
        setTopSites(DEFAULT_URLS)
      }
      setHasRefreshedTopSites(true)
    }
  }, [hasRefreshTopSites, setTopSites])
}
