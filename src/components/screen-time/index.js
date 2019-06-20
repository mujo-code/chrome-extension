import { Box } from '@jcblw/box'
import React, { useState } from 'react'
import { siteTimeToChartData } from '../../lib/aggregation'
import { HeaderS } from '../fonts'
import { Graph } from '../graph'
import { Time } from '../time'

export const ScreenTime = ({ data }) => {
  const graphData = siteTimeToChartData(data)
  const [selectedSegment, setSelectedSegment] = useState(null)
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
      <HeaderS color="outerSpace">Screen Time</HeaderS>
      <Graph
        data={graphData}
        width={600}
        height={275}
        strokeWidth={16}
        textFill="outerSpace"
        stroke="saltBox"
        spacingAngle={16}
        strokeLinecap="round"
        radius={100}
        selected={selectedSegment}
        selectedStroke="outerSpace"
        onSegmentClick={seg => setSelectedSegment(seg)}
      />
      {selectedSegment ? (
        <Box display="flex" direction="column">
          {Object.keys(selectedSegment.originalData).map(url => (
            <Box
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
              key={url}
            >
              <HeaderS
                color="outerSpace"
                marginTop="xs"
                marginBottom="xs"
              >
                {url}:
              </HeaderS>
              <Time
                color="outerSpace"
                marginTop="xs"
                marginBottom="xs"
              >
                {selectedSegment.originalData[url]}
              </Time>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}

ScreenTime.defaultProps = { data: {} }
