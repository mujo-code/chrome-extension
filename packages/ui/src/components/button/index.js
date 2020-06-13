import { omitKeys } from '@mujo/box'
import { Tracker } from '@mujo/utils'
import React, { useState } from 'react'
import { Box } from '../box'
import { headerS } from '../fonts/styles'
import { ToolTip } from '../tool-tip'

const { track } = Tracker

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
  const { children = 'Label', design = 'primary', alt, altOffset = 0 } = props
  const restProps = omitKeys(
    props,
    'design',
    'alt',
    'children',
    'altOffset',
    'onClick'
  )
  const [tooltipOpen, setToolTipOpen] = useState(false)
  const { color, backgroundColor, highlight } = colors[design]
  return (
    <Box
      font="headerS"
      outlineColor={highlight}
      color={color}
      backgroundColor={backgroundColor}
      display="inlineFlex"
      flexDirection="column"
      alignItems="center"
      paddingTop="xs"
      paddingLeft="l"
      paddingBottom="xs"
      paddingRight="l"
      border="none"
      borderRadius="l"
      textDecoration="none"
      position="relative"
      onClick={(e, ...args) => {
        props.onClick && props.onClick(e, ...args)
        track({
          category: 'button',
          action: 'click',
          label: typeof children === 'string' ? children : e.target.textContent,
        })
      }}
      onMouseLeave={() => setToolTipOpen(false)}
      onMouseEnter={() => setToolTipOpen(true)}
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
