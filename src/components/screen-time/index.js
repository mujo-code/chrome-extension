import { Box } from '@jcblw/box'
import React from 'react'
import { useTheme } from '../../hooks/use-theme'
import { siteTimeToChartData } from '../../lib/aggregation'
import { HeaderS } from '../fonts'
import { Graph } from '../graph'
import { Modal } from './modal'
import { NotEnoughData, hasEnoughData } from './not-enough-data'
import { reduceSegmentToUrls } from './reducer'

export const ScreenTime = ({
  data,
  setBreakTimer,
  selectedSegment,
  setSelectedSegment,
}) => {
  const graphData = siteTimeToChartData(data)
  const theme = useTheme()
  const { foreground, highlight } = theme
  const showGraph = hasEnoughData(graphData, data)
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
      {showGraph ? (
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
          onSegmentClick={seg =>
            setSelectedSegment(reduceSegmentToUrls(seg))
          }
        />
      ) : (
        <NotEnoughData />
      )}
      {selectedSegment ? (
        <Modal
          theme={theme}
          setSelectedSegment={setSelectedSegment}
          selectedSegment={selectedSegment}
          allSegments={graphData}
          setBreakTimer={setBreakTimer}
        />
      ) : null}
    </Box>
  )
}

ScreenTime.defaultProps = { data: {} }
