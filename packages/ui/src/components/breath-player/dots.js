import { Box } from '@mujo/box'
import React from 'react'
import { animated as A } from 'react-spring'
import { useTheme } from '../../hooks/use-theme'
import { getStyle } from './styles'
import { useDotAnimation } from './use-dot-animation'

export const Dots = ({
  json,
  size,
  width,
  height,
  onFinish,
  currentStep,
  setCurrentStep,
  isOpen,
  EndCard,
  setPlays,
  plays,
  onRenderEndCard = () => {},
}) => {
  const { highlight, foreground } = useTheme()
  const halfSize = size / 2
  const { props } = useDotAnimation({
    json,
    isOpen,
    setCurrentStep,
    currentStep,
    onFinish,
    onRenderEndCard,
    EndCard,
    plays,
    setPlays,
  })

  return (
    <>
      <Box
        Component={A.div}
        position="absolute"
        style={{
          ...getStyle({ width, height, isOpen, size, halfSize }),
          transform: props.outerScale.interpolate(x => `scale(${x})`),
        }}
        backgroundColor={highlight}
        layer="1"
      ></Box>
      <Box
        Component={A.div}
        position="absolute"
        style={{
          ...getStyle({ width, height, isOpen, size, halfSize }),
          transform: props.scale.interpolate(x => `scale(${x})`),
        }}
        backgroundColor={foreground}
        layer="1"
      ></Box>
    </>
  )
}
