import { Box } from '@jcblw/box'
import React from 'react'
import { FOURTY_FIVE_MINUTES } from '../../constants'
import { Button } from '../button'
import { HeaderL, BodyS, BodyL, HeaderS } from '../fonts'
import { Time } from '../time'
import { BarGraph } from './bar-graph'

export const InfoModal = ({
  theme: { foreground, highlight },
  segment: { label, time, percent, breakTimer, originalURL },
  setBreakTimer,
}) => (
  <Box display="flex" direction="column" flex="1">
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
      These times are not aways going to represent a 100% view of your
      viewing habits.
    </BodyS>
    <Box display="flex" direction="row" alignItems="center">
      <Box
        id="break-timer"
        Component="input"
        type="checkbox"
        marginRight="s"
        checked={breakTimer.enabled}
        onChange={() =>
          setBreakTimer(
            originalURL,
            FOURTY_FIVE_MINUTES,
            !breakTimer.enabled
          )
        }
      />
      <HeaderS
        marginTop="xs"
        marginBottom="xs"
        labelFor="break-timer"
      >
        Break Timer
      </HeaderS>
    </Box>
    <Box
      flex="0"
      display="flex"
      justifyContent="flexEnd"
      paddingBottom="m"
    >
      <Button
        design="secondary"
        Component="a"
        href={`https://${label}`}
      >
        Visit site
      </Button>
    </Box>
  </Box>
)
