import { Box } from '@mujo/box'
import React, { useState } from 'react'
import { useTheme } from '../../hooks/use-theme'
import { BodyS } from '../fonts'

export const Tab = ({ label, selected, onClick }) => {
  const [hovered, setHovered] = useState(false)
  const { highlight } = useTheme()
  const yPosition = hovered ? 4 : 8
  const css = {
    marginLeft: '-8px',
    marginBottom: '-8px',
    left: '50%',
    bottom: 0,
    transition: 'transform 0.2s ease-in-out',
    transform: `translateY(${selected ? 0 : yPosition}px) scale(${
      selected ? 1 : 0.8
    })`,
  }
  return (
    <Box
      position="relative"
      paddingLeft="m"
      paddingRight="m"
      whiteSpace="nowrap"
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        position="absolute"
        height="m"
        width="m"
        borderRadius="m"
        css={css}
        backgroundColor={highlight}
      />
      <BodyS>{label}</BodyS>
    </Box>
  )
}
