import React from 'react'
import { useSpring, animated as A } from 'react-spring'
import { Box } from '../box'
import { useTheme } from '../../hooks/use-theme'
import { HeaderL } from '../fonts'

export const CenterText = ({ children, show, down, ...otherProps }) => {
  const scaleOut = down ? 'scale(0.9)' : 'scale(1.1)'
  const { background } = useTheme()
  const style = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'scale(1)' : scaleOut,
    config: { duration: show ? 1000 : 500 },
    delay: show ? 1000 : 0,
  })
  return (
    <Box
      layer="2"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      Component={A.div}
      color={background}
      style={style}
      css={{
        left: 0,
        right: 0,
        top: 'calc(50vh - 20px)',
        bottom: 'calc(50vh + 20px)',
        textAlign: 'center',
        height: '40px',
      }}
      {...otherProps}
    >
      <HeaderL marginTop="zero" marginBottom="zero">
        {children}
      </HeaderL>
    </Box>
  )
}
