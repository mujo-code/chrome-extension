import { Box } from '@jcblw/box'
import { css } from 'glamor'
import React from 'react'
import { HeaderS, HeaderL } from '../fonts'
import { Time } from '../time'

export const ListModal = ({
  theme: { backgroundSecondary, foregroundSecondary, foreground },
  selectedSegment,
}) => (
  <>
    <HeaderL color={foreground}>Screen Time</HeaderL>
    {Object.keys(selectedSegment.originalData).map(url => (
      <Box key={url} display="flex" direction="row" marginBottom="xs">
        <HeaderS
          color={foregroundSecondary}
          backgroundColor={backgroundSecondary}
          paddingTop="xs"
          paddingBottom="xs"
          marginTop="zero"
          marginBottom="zero"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          textAlign="right"
          paddingLeft="m"
          paddingRight="s"
          borderRadius="s"
          {...css({ width: '35%' })}
        >
          {url}
        </HeaderS>
        <Time
          color={foreground}
          marginTop="xs"
          marginBottom="xs"
          whiteSpace="nowrap"
          marginLeft="s"
        >
          {selectedSegment.originalData[url]}
        </Time>
      </Box>
    ))}
  </>
)
