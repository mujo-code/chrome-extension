import { Functional, Util } from '@mujo/utils'

const { first } = Functional
const { set } = Util

export const decorateSelectedSegment = ({
  selectedSegment,
  siteTimesAndTimers,
}) => {
  if (!selectedSegment) return
  const { urls } = selectedSegment
  if (urls.length === 1) {
    const originalURL = first(selectedSegment.urls)
    const { breakTimer, time } = siteTimesAndTimers[originalURL]
    set(selectedSegment, 'data', {
      breakTimer,
      time,
      originalURL,
    })
  }
}

export const mapTopSites = topSitesUsage => topSite => {
  const { url } = topSite
  const isUsed = topSitesUsage.some(site => site.url === url)
  return { isUsed, ...topSite }
}
