import { shortURL } from './url'
import { set } from './util'

const combineUrlTimes = data => {
  const keys = Object.keys(data)
  return keys.reduce((accum, key) => {
    const shortKey = shortURL(key)
    set(accum, shortKey, data[key] + (accum[shortKey] || 0))
    return accum
  }, {})
}

const getTotalTime = data => {
  const iterable = Object.keys(data)
  return iterable
    .map(key => data[key])
    .reduce((total, value) => {
      /* eslint-disable-next-line no-param-reassign */
      total += value
      return total
    }, 0)
}

export const siteTimeToChartData = rawData => {
  const data = combineUrlTimes(rawData)
  const totals = getTotalTime(data)
  return Object.keys(data).map(label => {
    const percent = data[label] / totals
    return {
      label,
      percent,
      originalData: { [label]: data[label] },
    }
  })
}
