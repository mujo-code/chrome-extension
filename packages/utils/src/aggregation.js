import { FOURTY_FIVE_MINUTES } from './constants'
import { shortURL } from './url'
import { set } from './util'

const combineUrlTimes = data => {
  const keys = Object.keys(data)
  return keys.reduce((accum, key) => {
    const shortKey = shortURL(key)
    const lastTime = (accum[shortKey] && accum[shortKey].time) || 0
    set(accum, shortKey, {
      time: data[key].time + lastTime,
      breakTimer: data[key].breakTimer,
      originalURL: key,
    })
    return accum
  }, {})
}

export const getTotalTime = data => {
  const iterable = Object.keys(data)
  return iterable
    .map(key => data[key].time)
    .reduce((total, value) => {
      /* eslint-disable-next-line no-param-reassign */
      total += value
      return total
    }, 0)
}

export const toSiteInfo = (times, timers) =>
  Object.keys(times).reduce((accum, url) => {
    set(accum, url, accum[url] || {})
    set(accum[url], 'time', times[url])
    set(
      accum[url],
      'breakTimer',
      timers[url] || {
        enabled: false,
        time: FOURTY_FIVE_MINUTES,
        url,
      }
    )
    return accum
  }, {})

export const siteTimeToChartData = rawData => {
  const data = combineUrlTimes(rawData)
  const totals = getTotalTime(data)
  return Object.keys(data).map(label => {
    const percent = data[label].time / totals
    return {
      label,
      percent,
      originalData: { [label]: data[label] },
    }
  })
}
