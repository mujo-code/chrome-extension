import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React from 'react'

export const Close = props => {
  const otherProps = removeKeys(props, 'fill', 'width', 'height')
  return (
    <Box
      Component="svg"
      width={props.width}
      height={props.height}
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <Box
        Component="path"
        d={`
        M9.778 6.864
        l5.754-6.1
        a2 2 0 1 1 2.91 2.746
        l-5.914 6.268 5.913 6.269
        a2 2 0 1 1-2.91 2.744
        l-5.753-6.098-5.753 6.098
        a2 2 0 1 1-2.91-2.744
        l5.914-6.269L1.115 3.51
        A2 2 0 1 1 4.025.765l5.753 6.099z
        `}
        fill={props.fill}
        fillRule="nonzero"
      />
    </Box>
  )
}

Close.defaultProps = {
  width: 19,
  height: 20,
  fill: 'saltBox',
}
