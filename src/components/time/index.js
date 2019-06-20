import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React from 'react'
import { readableTime } from '../../lib/time'
import { BodyS } from '../fonts'

export const Time = props => (
  <BodyS Component="time" {...removeKeys(props, 'children')}>
    {readableTime(props.children)}
  </BodyS>
)
