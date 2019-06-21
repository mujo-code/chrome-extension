import { Box } from '@jcblw/box'
import React, { useState } from 'react'
import { useTheme } from '../../hooks/use-theme'
import { siteTimeToChartData } from '../../lib/aggregation'
import { HeaderS } from '../fonts'
import { Graph } from '../graph'
import { ScreenTimeListModal } from './modal'

export const ScreenTime = ({ data }) => {
  const graphData = siteTimeToChartData(data)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const theme = useTheme()
  const { foreground, highlight } = theme
  return (
    <Box
      flex="1"
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      position="relative"
      layer="1"
    >
      <HeaderS color={foreground}>Screen Time</HeaderS>
      <Graph
        data={graphData}
        width={600}
        height={275}
        strokeWidth={16}
        textFill={foreground}
        stroke={highlight}
        spacingAngle={16}
        strokeLinecap="round"
        radius={100}
        selected={selectedSegment}
        selectedStroke={foreground}
        onSegmentClick={seg => setSelectedSegment(seg)}
      />
      {selectedSegment ? (
        <ScreenTimeListModal
          theme={theme}
          setSelectedSegment={setSelectedSegment}
          selectedSegment={selectedSegment}
        />
      ) : null}
    </Box>
  )
}

ScreenTime.defaultProps = { data: {} }
