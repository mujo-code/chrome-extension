import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React from 'react'
import { Button } from '../button'

export const ButtonGroup = props => {
  const childArr = React.Children.toArray(props.children)
  const otherProps = removeKeys(props, 'children')
  return (
    <Box display="flex" direction="row" {...otherProps}>
      {childArr
        .filter(child => child.type === Button)
        .map((child, i, arr) => {
          const isFirst = i === 0
          const isLast = i === arr.length - 1
          const borderTopLeftRadius = isFirst ? 'l' : 'none'
          const borderBottomLeftRadius = isFirst ? 'l' : 'none'
          const borderTopRightRadius = isLast ? 'l' : 'none'
          const borderBottomRightRadius = isLast ? 'l' : 'none'
          const element = React.cloneElement(child, {
            borderRadius: 'none',
            borderTopLeftRadius,
            borderBottomLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
          })
          return (
            <React.Fragment key={`el-${i}`}>
              {element}
              {isLast ? null : <Box css={{ width: '1px' }} />}
            </React.Fragment>
          )
        })}
    </Box>
  )
}
