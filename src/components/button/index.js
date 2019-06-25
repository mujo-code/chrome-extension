import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React, { useState } from 'react'
import { headerS } from '../fonts/styles'
import { ToolTip } from '../tool-tip'

const colors = {
  primary: {
    color: 'mischka',
    backgroundColor: 'outerSpace',
    highlight: 'saltBox',
  },
  secondary: {
    color: 'white',
    backgroundColor: 'saltBox',
    highlight: 'gravel',
  },
  tertiary: {
    color: 'outerSpace',
    backgroundColor: 'mischka',
    highlight: 'saltBox',
  },
}

export const Button = props => {
  const {
    children = 'Label',
    design = 'primary',
    alt,
    altOffset = 0,
  } = props
  const restProps = removeKeys(
    props,
    'design',
    'alt',
    'children',
    'altOffset'
  )
  const [tooltipOpen, setToolTipOpen] = useState(false)
  const { color, backgroundColor, highlight } = colors[design]
  return (
    <Box
      outlineColor={highlight}
      color={color}
      backgroundColor={backgroundColor}
      display="inlineFlex"
      direction="column"
      alignItems="center"
      paddingTop="xs"
      paddingLeft="l"
      paddingBottom="xs"
      paddingRight="l"
      border="none"
      borderRadius="l"
      textDecoration="none"
      position="relative"
      onMouseLeave={() => setToolTipOpen(false)}
      onMouseEnter={() => setToolTipOpen(true)}
      {...headerS}
      {...restProps}
    >
      {children}
      {alt ? (
        <ToolTip isOpen={tooltipOpen} offset={altOffset}>
          {alt}
        </ToolTip>
      ) : null}
    </Box>
  )
}

Button.defaultProps = { Component: 'button' }
