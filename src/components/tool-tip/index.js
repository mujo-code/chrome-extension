import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import React from 'react'
import { useTheme } from '../../hooks/use-theme'

const toolTipWrapper = {
  top: 0,
  left: '50%',
  height: '1px',
  width: '1px',
  transition: 'all 0s ease-in-out',
  transitionDelay: '0s',
  opacity: 0,
  transform: 'translateY(-32px) scale(0)',
}

const toolTipText = {
  zIndex: '1',
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: 'initial',
}

const toolTipPositions = {
  below: (offset = 0) => ({
    transform: `translateY(${8 + offset}px) scale(1)`,
    opacity: 1,
    transitionDelay: '0.5s',
    transitionDuration: '0.2s',
  }),
  above: (offset = 0) => ({
    transform: `translateY(-${72 + offset}px) scale(1)`,
    opacity: 1,
    transitionDelay: '0.5s',
    transitionDuration: '0.2s',
  }),
}

const trianglePositions = {
  above: {
    transform: 'rotate(45deg)',
    top: '56%',
    left: '50%',
    marginLeft: '-9px',
    zIndex: '0',
  },
  below: {
    transform: 'rotate(45deg)',
    top: '-8%',
    left: '50%',
    marginLeft: '-9px',
    zIndex: '0',
  },
}

export const ToolTip = props => {
  const { isOpen, below, offset } = props
  const { foreground, background } = useTheme()
  const styles = below
    ? toolTipPositions.below
    : toolTipPositions.above
  const triangleStyles = below
    ? trianglePositions.below
    : trianglePositions.above
  const otherProps = removeKeys(
    props,
    'isOpen',
    'children',
    'below',
    'offset'
  )
  return (
    <Box position="relative">
      <Box
        position="absolute"
        textAlign="center"
        justifyContent="center"
        display="flex"
        css={[toolTipWrapper, isOpen ? styles(offset) : {}]}
      >
        <Box
          Component="span"
          display="table"
          borderRadius="l"
          paddingTop="xs"
          paddingBottom="xs"
          paddingLeft="s"
          paddingRight="s"
          backgroundColor={foreground}
          color={background}
          whiteSpace="nowrap"
          maxWidth="100px"
          position="relative"
          {...otherProps}
        >
          <Box
            display="block"
            backgroundColor={foreground}
            borderRadius="xs"
            padding="xs"
            position="absolute"
            css={triangleStyles}
          />
          <Box position="relative" css={toolTipText}>
            {props.children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

ToolTip.defaultProps = { isOpen: false }
