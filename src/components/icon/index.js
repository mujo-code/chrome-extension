import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import React from 'react'
import { Menu, X } from 'react-feather'
import { colors } from '../../styles/colors'

// maintain list to avoid blowing up bundle size
// if using another icon please add to icons list
const icons = { menu: Menu, close: X }
const sizes = { s: 16, m: 24, l: 32 }
const NotFound = ({ icon }) => (
  <Box>{console.warn(`Warning icon ${icon} not found`) && null}</Box>
)

export const Icon = props => {
  const { icon, color, size } = props
  const otherProps = removeKeys(props, 'icon', 'color', 'size')
  const Component = icons[icon] || NotFound
  return (
    <Box {...otherProps}>
      <Component
        icon={icon}
        color={colors[color] || colors.saltBox}
        size={sizes[size] || sizes.m}
      />
    </Box>
  )
}
