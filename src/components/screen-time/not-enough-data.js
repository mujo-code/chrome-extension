import { Box } from '@jcblw/box'
import React from 'react'
import { MINUTE } from '../../constants'
import { useTheme } from '../../hooks/use-theme'
import { getTotalTime } from '../../lib/aggregation'
import { BodyS } from '../fonts'

export const hasEnoughData = (segments, data) =>
  segments.length >= 2 && getTotalTime(data) >= MINUTE

export const NotEnoughData = props => {
  const theme = useTheme()
  return (
    <Box>
      <Box
        Component="svg"
        width="600"
        height="250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Box
          Component="path"
          d="M19 125.5h566"
          stroke={theme.background}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <Box
          Component="circle"
          stroke={theme.background}
          strokeWidth="8"
          fill={theme.backgroundSecondary}
          fillRule="nonzero"
          cx="235.5"
          cy="125.5"
          r="102.5"
        />
        <Box
          Component="circle"
          stroke={theme.background}
          strokeWidth="8"
          fill={theme.backgroundSecondary}
          fillRule="nonzero"
          cx="521.5"
          cy="125.5"
          r="33.5"
        />
        <Box
          Component="circle"
          stroke={theme.background}
          strokeWidth="8"
          fill={theme.backgroundSecondary}
          fillRule="nonzero"
          cx="64.5"
          cy="125.5"
          r="26.5"
        />
        <Box
          Component="circle"
          fill={theme.background}
          fillRule="nonzero"
          cx="364.5"
          cy="39.5"
          r="26.5"
        />
        <Box
          Component="circle"
          fill={theme.background}
          fillRule="nonzero"
          cx="456"
          cy="126"
          r="15"
        />
        <Box
          Component="circle"
          fill={theme.background}
          fillRule="nonzero"
          cx="419"
          cy="126"
          r="15"
        />
      </Box>
      <BodyS>
        Explore more, there is not enough data to show you anything
        yet.
      </BodyS>
    </Box>
  )
}
