import { Box } from '@jcblw/box'
import React from 'react'
import { shortURL } from '../../lib/url'
import { HeaderL } from '../fonts'

export const ListModal = ({
  theme: { foregroundSecondary },
  selectedSegment,
  setSelectedSegment,
}) => (
  <>
    {selectedSegment.urls.map(url => (
      <Box
        key={url}
        display="flex"
        direction="row"
        paddingLeft="m"
        paddingRight="m"
      >
        <HeaderL
          color={foregroundSecondary}
          paddingTop="xs"
          paddingBottom="xs"
          marginTop="zero"
          marginBottom="zero"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          textAlign="left"
          paddingRight="s"
          cursor="pointer"
          onClick={() => {
            setSelectedSegment({
              label: shortURL(url),
              urls: [url],
            })
          }}
        >
          {shortURL(url)}
        </HeaderL>
      </Box>
    ))}
  </>
)
