import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import { Time as TimeUtil } from '@mujo/utils'
import React from 'react'

const { readableTime } = TimeUtil

export const Time = props => (
  <Box {...removeKeys(props, 'children')}>
    {readableTime(props.children)}
  </Box>
)
