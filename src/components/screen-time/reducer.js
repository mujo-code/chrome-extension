import { find } from '../../lib/find'
/*
// selectedSegement
{
  label: { children: 'google.com' },
  originalData: { google.com: 23232.232, ... }
}
*/

const makeNicePercent = percent => Math.floor(percent * 100)

export const reduceSelectedSegment = (
  selectedSegment,
  allSegments
) => {
  const { label, data, link } = selectedSegment
  const { percent } = find({ label })(allSegments)
  const { time, breakTimer, originalURL } = data
  return {
    label,
    time,
    percent: makeNicePercent(percent),
    breakTimer,
    originalURL,
    link,
  }
}

export const reduceSegmentToUrls = segment => {
  const label = segment.label.children
  const urls = Object.keys(segment.originalData).map(
    url => segment.originalData[url].originalURL
  )
  return {
    label,
    urls,
  }
}
