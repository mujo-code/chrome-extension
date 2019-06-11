import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import { css } from 'glamor'
import React from 'react'
import { HeaderL, HeaderS } from '../fonts'
import { useAnimations, transition } from './use-animations'

const fadeInGroup = css({
  transition: 'opacity 0.7s ease-in 0.7s',
  opacity: 0,
  ':not(:empty)': { opacity: 1 },
})

const textTranistions = css({
  transformOrigin: 'center',
  transition: 'all 0.1s ease-out 0s',
  opacity: 0,
  transform: 'scale(0.9)',
})

const fadeInText = css({
  transition: 'all 0.3s ease-in 0.5s',
  opacity: 1,
  transform: 'scale(1)',
})

export const Player = props => {
  const { isOpen } = props
  const otherProps = removeKeys(props, 'width', 'height', 'isOpen')
  const [{ animationProps, isBreathIn, iteration }] = useAnimations(
    props,
    isOpen
  )
  return (
    <Box
      paddingTop={isOpen ? 'none' : 'm'}
      {...transition(props)}
      {...otherProps}
    >
      <Box
        Component="svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...animationProps.svg}
      >
        <Box Component="rect" fill="outerSpace" {...animationProps.rect} />
        <Box Component="circle" fill="saltBox" {...animationProps.circle2} />
        <Box Component="circle" fill="mischka" {...animationProps.circle} />
        <Box Component="g" {...fadeInGroup}>
          {isOpen ? (
            <>
              <HeaderL
                fill="outerSpace"
                Component="text"
                {...animationProps.text}
                {...css(textTranistions, isBreathIn ? fadeInText : {})}
              >
                Breathe in
              </HeaderL>
              <HeaderL
                fill="outerSpace"
                Component="text"
                {...textTranistions}
                {...animationProps.text}
                {...css(textTranistions, !isBreathIn ? fadeInText : {})}
              >
                Breathe out
              </HeaderL>
              <HeaderS
                Component="text"
                fill="mischka"
                {...textTranistions}
                {...animationProps.count}
                {...css(textTranistions, fadeInText)}
              >
                {iteration}
              </HeaderS>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}
