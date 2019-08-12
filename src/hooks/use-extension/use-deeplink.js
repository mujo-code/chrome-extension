import { useEffect } from 'react'
import { queryParams, shortURL, origin } from '../../lib/url'

export const useDeeplink = ({
  appReady,
  setPlayerIsOpen,
  setSelectedSegment,
}) => {
  useEffect(() => {
    if (!appReady) {
      const { site, play } = queryParams(window.location.href)
      if (play) {
        setPlayerIsOpen(true)
      } else if (site) {
        setSelectedSegment({
          label: shortURL(site),
          urls: [origin(site)],
          link: site,
        })
      }
    }
  }, [appReady, setPlayerIsOpen, setSelectedSegment])
}
