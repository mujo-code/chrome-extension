import { Box } from '@jcblw/box'
import { removeKeys } from '@jcblw/box/dist/lib/remove-keys'
import { css } from 'glamor'
import React from 'react'
import { useTheme } from '../../hooks/use-theme'
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
  const { isOpen, label } = props
  const otherProps = removeKeys(
    props,
    'width',
    'height',
    'isOpen',
    'circleRatio',
    'onFinish',
    'label'
  )
  const [{ animationProps, isBreathIn, iteration }] = useAnimations(
    props,
    isOpen
  )
  const { foreground, background, highlight } = useTheme()
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
        css={{ pointerEvents: 'none' }}
      >
        <Box
          Component="rect"
          fill={background}
          {...animationProps.rect}
        />
        <Box
          Component="circle"
          fill={highlight}
          {...animationProps.circle2}
        />
        <Box
          Component="circle"
          fill={foreground}
          {...animationProps.circle}
        />
        <Box Component="g" {...fadeInGroup}>
          {isOpen ? (
            <>
              <HeaderL
                fill={background}
                Component="text"
                {...animationProps.text}
                {...css(
                  textTranistions,
                  isBreathIn ? fadeInText : {}
                )}
              >
                Breathe in
              </HeaderL>
              <HeaderL
                fill={background}
                Component="text"
                {...textTranistions}
                {...animationProps.text}
                {...css(
                  textTranistions,
                  !isBreathIn ? fadeInText : {}
                )}
              >
                Breathe out
              </HeaderL>
              <HeaderS
                Component="text"
                fill={foreground}
                {...textTranistions}
                {...animationProps.count}
                {...css(textTranistions, fadeInText)}
              >
                {iteration}
              </HeaderS>
            </>
          ) : null}
          <HeaderL
            fill={background}
            Component="text"
            {...textTranistions}
            {...animationProps.text}
            {...css(textTranistions, !isOpen ? fadeInText : {})}
          >
            {label}
          </HeaderL>
        </Box>
      </Box>
    </Box>
  )
}

Player.defaultProps = { circleRatio: 0.2 }
