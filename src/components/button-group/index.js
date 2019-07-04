import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React from 'react'

// clone element pass props but add new props.

export const ButtonGroup = props => {
  const childArr = React.Children.toArray(props.children)
  const otherProps = removeKeys(props, 'children')
  return (
    <Box display="flex" direction="row" {...otherProps}>
      {childArr.map((child, i, arr) => {
        const isFirst = i === 0
        const isLast = i === arr.length - 1
        const borderTopLeftRadius = isFirst ? 'l' : 'none'
        const borderBottomLeftRadius = isFirst ? 'l' : 'none'
        const borderTopRightRadius = isLast ? 'l' : 'none'
        const borderBottomRightRadius = isLast ? 'l' : 'none'
        const element = React.cloneElement(child, {
          key: `el-${i}`,
          borderRadius: 'none',
          borderTopLeftRadius,
          borderBottomLeftRadius,
          borderTopRightRadius,
          borderBottomRightRadius,
        })
        return (
          <>
            {element}
            {isLast ? null : <Box css={{ width: '1px' }} />}
          </>
        )
      })}
    </Box>
  )
}
