import { Box } from '@jcblw/box'
import React from 'react'
import { HeaderL } from '../fonts'

export const ListModal = ({
  theme: { foregroundSecondary },
  selectedSegment,
  setSelectedSegment,
}) => (
  <>
    {Object.keys(selectedSegment.originalData).map(url => (
      <Box key={url} display="flex" direction="row">
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
            const timing = selectedSegment.originalData[url]
            setSelectedSegment({
              label: { children: url },
              originalData: { [url]: timing },
            })
          }}
        >
          {url}
        </HeaderL>
      </Box>
    ))}
  </>
)
