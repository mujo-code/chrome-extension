import { Box } from '@jcblw/box'
import React, { useState } from 'react'
import { useTheme } from '../../hooks/use-theme'
import { siteTimeToChartData } from '../../lib/aggregation'
import { HeaderS, Sup } from '../fonts'
import { Graph } from '../graph'
import { ToolTip } from '../tool-tip'
import { Modal } from './modal'
import { reduceSegmentToUrls } from './reducer'

export const ScreenTime = ({
  data,
  setBreakTimer,
  selectedSegment,
  setSelectedSegment,
}) => {
  const [toolTipOpen, setToolTipOpen] = useState(false)
  const graphData = siteTimeToChartData(data)
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
      <HeaderS
        position="relative"
        cursor="pointer"
        color={foreground}
        onMouseLeave={() => setToolTipOpen(false)}
        onMouseEnter={() => setToolTipOpen(true)}
      >
        Screen Time <Sup>BETA</Sup>
        <ToolTip isOpen={toolTipOpen}>
          Screen time is the time viewing sites between your breaks
        </ToolTip>
      </HeaderS>
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
