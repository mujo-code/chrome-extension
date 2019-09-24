import { useState, useEffect } from 'react'
import { topSites } from '../../lib/extension'

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
