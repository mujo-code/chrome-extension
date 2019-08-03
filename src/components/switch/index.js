import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import React from 'react'
import { useTheme } from '../../hooks/use-theme'
import { noop } from '../../lib/functional'

const radius = {
  m: 16,
  l: 24,
}

export const Switch = props => {
  const { size = 'l', value, onChange = noop, borderSize = 1 } = props
  const otherProps = removeKeys(props, 'size', 'value', 'onChange')
  const { highlight, foreground, background } = useTheme()
  return (
    <Box
      {...otherProps}
      borderRadius={size}
      backgroundColor={highlight}
      display="flex"
      css={{ height: radius[size], width: radius[size] * 2 }}
      onClick={e => {
        e.target.value = !value
        onChange(e)
      }}
    >
      <Box
        borderRadius={size}
        backgroundColor={value ? foreground : background}
        margin
        css={{
          transition: 'all 0.3s',
          width: radius[size] - borderSize * 2,
          height: radius[size] - borderSize * 2,
          transform: `translate(${
            value ? radius[size] + borderSize : borderSize
          }px, 1px)`,
        }}
      />
    </Box>
  )
}
