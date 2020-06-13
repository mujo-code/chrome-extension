import { omitKeys } from '@mujo/box'
import { Time as TimeUtil } from '@mujo/utils'
import React from 'react'
import { Box } from '../box'

const { readableTime } = TimeUtil

export const Time = props => (
  <Box {...omitKeys(props, 'children')}>{readableTime(props.children)}</Box>
)
