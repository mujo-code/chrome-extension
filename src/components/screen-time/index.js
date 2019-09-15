import { Box } from '@mujo/box'
import { Tab } from '@mujo/plugins'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_FILE } from '../../constants'
import { useExtension } from '../../hooks/use-extension'
import { useTheme } from '../../hooks/use-theme'
import { siteTimeToChartData } from '../../lib/aggregation'
import { HeaderS, Sup, BodyS } from '../fonts'
import { Graph } from '../graph'
import { Switch } from '../switch'
import { ToolTip } from '../tool-tip'
import { Modal } from './modal'
import { NotEnoughData, hasEnoughData } from './not-enough-data'
import { reduceSegmentToUrls } from './reducer'

export const ScreenTime = () => {
  const {
    siteTimesAndTimers: data,
    setBreakTimer,
    selectedSegment,
    setSelectedSegment,
    screenTime: permissions,
  } = useExtension()
  const { t } = useTranslation(TRANSLATION_FILE)
  const [toolTipOpen, setToolTipOpen] = useState(false)
  const {
    hasPermission,
    requestPermissions,
    removePermissions,
  } = permissions
  const graphData = siteTimeToChartData(data)
  const theme = useTheme()
  const { foreground, highlight } = theme
  const showGraph = hasEnoughData(graphData, data)
  const status = hasPermission ? t('enabled') : t('disabled')
  return (
    <Tab name={t('screen-time')}>
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
          {t('screen-time')} <Sup>{t('beta')}</Sup>
          <ToolTip isOpen={toolTipOpen}>
            {t('screen-time-explain')}
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
        <Box display="flex" direction="row">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Switch
              onChange={() => {
                if (hasPermission) {
                  removePermissions()
                } else {
                  requestPermissions()
                }
              }}
              value={hasPermission}
            />
          </Box>
          <BodyS flex="1" paddingLeft="m">
            {t('screen-time-status', { status })}
          </BodyS>
        </Box>

        <Modal
          isOpen={!!selectedSegment}
          theme={theme}
          setSelectedSegment={setSelectedSegment}
          selectedSegment={selectedSegment}
          allSegments={graphData}
          setBreakTimer={setBreakTimer}
        />
      </Box>
    </Tab>
  )
}

ScreenTime.defaultProps = { data: {} }
