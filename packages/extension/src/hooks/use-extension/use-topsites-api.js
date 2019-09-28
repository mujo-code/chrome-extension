import { Extension } from '@mujo/utils'
import { useState, useEffect } from 'react'

const { topSites } = Extension

export const useTopsitesAPI = ({ setTopSites }) => {
  const [hasRefreshTopSites, setHasReefreshedTopSites] = useState(
    false
  )
  useEffect(() => {
    if (!hasRefreshTopSites) {
      topSites.get(setTopSites)
      setHasReefreshedTopSites(true)
    }
  }, [hasRefreshTopSites, setTopSites])
}
