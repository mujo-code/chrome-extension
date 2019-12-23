import { Extension } from '@mujo/utils'
import { useState, useEffect } from 'react'
import { DEFAULT_URLS } from '../../constants'

const { topSites } = Extension

export const useTopsitesAPI = ({ setTopSites }) => {
  const [hasRefreshTopSites, setHasRefreshedTopSites] = useState(
    false
  )
  useEffect(() => {
    if (!hasRefreshTopSites && topSites) {
      try {
        topSites.get(setTopSites)
      } catch (e) {
        setTopSites(DEFAULT_URLS)
      }
      setHasRefreshedTopSites(true)
    }
  }, [hasRefreshTopSites, setTopSites])
}
