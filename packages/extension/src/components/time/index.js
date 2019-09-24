import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import React from 'react'
import { readableTime } from '../../lib/time'

export const Time = props => (
  <Box {...removeKeys(props, 'children')}>
    {readableTime(props.children)}
  </Box>
)
