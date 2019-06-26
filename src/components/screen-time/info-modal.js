import { Box } from '@jcblw/box'
import React from 'react'
import { Button } from '../button'
import { HeaderL, BodyS, BodyL } from '../fonts'
import { Time } from '../time'
import { BarGraph } from './bar-graph'
import { BreakTimerForm } from './break-timer-form'

export const InfoModal = ({
  theme: { foreground, highlight, backgroundSecondary },
  segment: { label, time, percent, breakTimer, originalURL },
  setBreakTimer,
}) => (
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
        The site {label} was actively viewed for{' '}
        <Time Component="span" color={foreground}>
          {time}
        </Time>{' '}
        since your last break. That is {percent}% of your web viewing.
      </BodyL>
      <BodyS marginTop="s" marginBottom="m">
        These times are not aways going to represent a 100% view of
        your viewing habits.
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
        <BreakTimerForm
          {...breakTimer}
          originalURL={originalURL}
          setBreakTimer={setBreakTimer}
        />
      </Box>
      <Box flex="0" alignItems="flexEnd" display="flex">
        <Button
          whiteSpace="nowrap"
          design="secondary"
          Component="a"
          href={originalURL}
        >
          Visit site
        </Button>
      </Box>
    </Box>
  </>
)
