import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React from 'react'
import { readableTime } from '../../lib/time'

export const Time = props => (
  <Box {...removeKeys(props, 'children')}>
    {readableTime(props.children)}
  </Box>
)
