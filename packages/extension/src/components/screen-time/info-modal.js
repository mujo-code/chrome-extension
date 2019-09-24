import { Box } from '@mujo/box'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  BREAK_TIMER_FEATURE,
  TRANSLATION_FILE,
} from '../../constants'
import { Button } from '../button'
import { HeaderL, BodyS, BodyL } from '../fonts'
import { Time } from '../time'
import { BarGraph } from './bar-graph'
import { BreakTimerForm } from './break-timer-form'

export const InfoModal = ({
  theme: { foreground, highlight, backgroundSecondary },
  segment: { label, time, percent, breakTimer, originalURL, link },
  setBreakTimer,
}) => {
  const { t } = useTranslation(TRANSLATION_FILE)
  return (
    <>
      <Box
        display="flex"
        direction="column"
        flex="1"
        overflow="scroll"
        paddingLeft="m"
        paddingRight="m"
      >
        <HeaderL marginBottom="s" marginTop="zero" color={foreground}>
          {label}
        </HeaderL>
        <BarGraph
          percent={percent}
          backgroundColor={highlight}
          barColor={foreground}
          height={16}
        />
        <BodyL marginTop="s" marginBottom="s">
          {t('actively-viewed-for', { site: label })}{' '}
          <Time Component="span" color={foreground}>
            {time}
          </Time>{' '}
          {t('since-last-break-percent', { percent })}
        </BodyL>
        <BodyS marginTop="s" marginBottom="m">
          {t('screen-time-disclaimer')}
        </BodyS>
      </Box>
      <Box
        flex="0"
        display="flex"
        direction="row"
        paddingLeft="m"
        paddingRight="m"
        paddingTop="s"
        paddingBottom="s"
        backgroundColor={backgroundSecondary}
      >
        <Box flex="1" display="flex">
          {BREAK_TIMER_FEATURE && (
            <BreakTimerForm
              {...breakTimer}
              originalURL={originalURL}
              setBreakTimer={setBreakTimer}
            />
          )}
        </Box>
        <Box flex="0" alignItems="flexEnd" display="flex">
          <Button
            whiteSpace="nowrap"
            design="secondary"
            Component="a"
            href={link || originalURL}
          >
            {link ? t('back-to-site') : t('visit-site')}
          </Button>
        </Box>
      </Box>
    </>
  )
}
