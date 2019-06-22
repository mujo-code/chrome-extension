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
  const label = selectedSegment.label.children
  const { percent } = find({ label })(allSegments)
  const time = selectedSegment.originalData[label]
  return {
    label,
    time,
    percent: makeNicePercent(percent),
  }
}
