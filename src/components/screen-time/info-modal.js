import { Box } from '@jcblw/box'
import React from 'react'
import { HeaderS, HeaderL, BodyS, BodyL } from '../fonts'
import { Time } from '../time'

export const InfoModal = ({
  theme: { foreground },
  segment: { label, time, percent },
}) => (
  <Box display="flex" direction="row">
    <Box css={{ width: '70%' }}>
      <HeaderS marginBottom="zero" color={foreground}>
        Screen Time for:
      </HeaderS>
      <HeaderL marginTop="xs" marginBottom="xs" color={foreground}>
        {label}
      </HeaderL>
      <Box Component="progress" max="100" value={percent}>
        {percent}%
      </Box>
      <BodyL>
        The site {label} was actively viewed for{' '}
        <Time Component="span" color={foreground}>
          {time}
        </Time>{' '}
        since your last break. That is {percent}% of your web viewing.
      </BodyL>
      <BodyS>
        These times are not aways going to represent a 100% view of
        your viewing habits.
      </BodyS>
    </Box>
    <Box>
      <HeaderS>More Info</HeaderS>
    </Box>
  </Box>
)
