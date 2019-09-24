import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import React from 'react'
import { colors } from '../../styles/colors'

export const BarGraph = props => {
  const { percent, barColor, backgroundColor, height } = props
  const otherProps = removeKeys(
    props,
    'percent',
    'backgroundColor',
    'barColor',
    'height'
  )
  return (
    <Box
      Component="progress"
      max="100"
      value={percent}
      {...otherProps}
      css={{
        height: `${height}px`,
        width: '100%',
        appearance: 'none',
        '::-webkit-progress-value': {
          backgroundColor: colors[barColor],
          borderRadius: `${height}px`,
        },
        '::-webkit-progress-bar': {
          backgroundColor: colors[backgroundColor],
          borderRadius: `${height}px`,
        },
      }}
    >
      {percent}%
    </Box>
  )
}

BarGraph.defaultProps = {
  height: 36,
  barColor: 'saltBox',
  backgroundColor: 'white',
}
