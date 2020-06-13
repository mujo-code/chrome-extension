import React from 'react'
import { useSpring, animated as A } from 'react-spring'
import { Box } from '../box'
import { useTheme } from '../../hooks/use-theme'

export const EndCardWrapper = ({ children, show, ...otherProps }) => {
  const scaleOut = 'scale(1.1)'
  const { background } = useTheme()
  const style = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'scale(1)' : scaleOut,
    config: { duration: show ? 1500 : 500 },
    delay: show ? 1000 : 0,
  })
  return (
    <Box
      layer="2"
      display="flex"
      justifyContent="center"
      position="absolute"
      Component={A.div}
      color={background}
      flexDirection="column"
      style={style}
      css={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'scroll',
      }}
      onClick={e => {
        // NOTE: This is to stop any clicks from hitting the
        // top level container click handlers
        e.stopPropagation()
      }}
      {...otherProps}
    >
      <Box flex="1" />
      {children}
      <Box flex="1" />
    </Box>
  )
}
