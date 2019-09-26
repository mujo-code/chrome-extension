import { Box } from '@mujo/box'
import { Url } from '@mujo/utils'
import React from 'react'
import { HeaderL } from '../fonts'

const { shortURL } = Url

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
