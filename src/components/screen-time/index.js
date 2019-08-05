import { Box } from '@mujo/box'
import React, { useState } from 'react'
import { SCREEN_TIME_PERMISSIONS } from '../../constants'
import { usePermissions } from '../../hooks/use-permissions'
import { useTheme } from '../../hooks/use-theme'
import { siteTimeToChartData } from '../../lib/aggregation'
import { Button } from '../button'
import { HeaderS, Sup } from '../fonts'
import { Graph } from '../graph'
import { ToolTip } from '../tool-tip'
import { Modal } from './modal'
import { NotEnoughData, hasEnoughData } from './not-enough-data'
import { reduceSegmentToUrls } from './reducer'

export const ScreenTime = ({
  data,
  setBreakTimer,
  selectedSegment,
  setSelectedSegment,
}) => {
  const [toolTipOpen, setToolTipOpen] = useState(false)
  const {
    hasPermission,
    requestPermissions,
    removePermissions,
  } = usePermissions(SCREEN_TIME_PERMISSIONS)
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
      {!hasPermission ? (
        <Button
          onClick={requestPermissions}
          alt={
            <Box Component="span">
              Screen time will need to ask for some elevated
              permissions to track viewing times.
            </Box>
          }
          design={theme.buttonStyle}
        >
          Enable
        </Button>
      ) : (
        <Button
          onClick={removePermissions}
          alt={
            <Box Component="span">
              This will remove the permissions that are needed for
              Screen Time to function.
            </Box>
          }
          design={theme.buttonStyle}
        >
          Disable
        </Button>
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
