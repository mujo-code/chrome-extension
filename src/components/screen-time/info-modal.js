import { Box } from '@jcblw/box'
import React from 'react'
import { Button } from '../button'
import { HeaderL, BodyS, BodyL } from '../fonts'
import { Time } from '../time'
import { BarGraph } from './bar-graph'

export const InfoModal = ({
  theme: { foreground, highlight },
  segment: { label, time, percent },
}) => (
  <Box display="flex" direction="column" flex="1">
    <HeaderL marginBottom="s" marginTop="zero" color={foreground}>
      {label}
    </HeaderL>
    <BarGraph
      percent={percent}
      backgroundColor={highlight}
      barColor={foreground}
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
    <Box flex="1" />
    <Box
      flex="0"
      display="flex"
      justifyContent="flexEnd"
      paddingBottom="m"
    >
      <Button
        style="secondary"
        Component="a"
        href={`https://${label}`}
      >
        Visit site
      </Button>
    </Box>
  </Box>
)
