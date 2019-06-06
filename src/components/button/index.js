import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React, { useState } from 'react'
import { headerS } from '../fonts/styles'
import { ToolTip } from '../tool-tip'

const colors = {
  primary: { color: 'white', backgroundColor: 'amethyst' },
  secondary: { color: 'white', backgroundColor: 'danube' },
  tertiary: { color: 'nevada', backgroundColor: 'mischka' },
}

export const Button = props => {
  const { children = 'Label', style = 'primary', alt } = props
  const restProps = removeKeys(props, 'style', 'alt', 'children')
  const [tooltipOpen, setToolTipOpen] = useState(false)
  const { color, backgroundColor } = colors[style]
  return (
    <Box
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
      {alt ? <ToolTip isOpen={tooltipOpen}>{alt}</ToolTip> : null}
    </Box>
  )
}

Button.defaultProps = { Component: 'button' }
