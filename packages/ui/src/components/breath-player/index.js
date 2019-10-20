import { Box } from '@mujo/box'
import React, { useState, useMemo } from 'react'
import { useTheme } from '../../hooks/use-theme'
import { HeaderS } from '../fonts'
import {
  createAnimationSteps,
  createIdleAnimationSteps,
} from './animation-steps'
import { CenterText } from './center-text'
import { Dots } from './dots'
import { EndCardWrapper } from './end-card-wrapper'

// const exampleJSON = [
//   { scale: [1, 1.6], outterScale: [1, 1.8]  duration: [3000, 3000] },
//   { scale: [1, 2.6], outterScale: [1, 2.8], duration: [3200, 3200] },
//   { scale: [1, 3.6], outterScale: [1, 3.8], duration: [3400, 3400] },
// ]

export const BreathPlayer = ({
  breathAmount = 5,
  width = 80,
  height = 80,
  size = 30,
  onFinish = () => {},
  isOpen = false,
  data,
  EndCard,
  breatheInText = 'Inhale',
  breatheOutText = 'Exhale',
  ...otherProps
}) => {
  const { foreground, background } = useTheme()
  const [plays, setPlays] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [endCardActive, setEndCardActive] = useState(null)
  const json = useMemo(() => {
    if (isOpen) {
      return data || [...createAnimationSteps(breathAmount, plays)]
    }
    return [] || createIdleAnimationSteps()
  }, [breathAmount, isOpen, plays, data])

  return (
    <Box
      display="flex"
      alignItems="flexStart"
      justifyContent="center"
      backgroundColor={background}
      overflow="hidden"
      position="relative"
      css={{
        height: !isOpen ? height : '100vh',
        width: !isOpen ? width : '100vw',
        borderRadius: !isOpen ? width / 8 : 0,
        transition: 'all 0.7s ease-in-out',
      }}
      {...otherProps}
    >
      <Dots
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        json={json}
        size={size}
        width={width}
        height={height}
        onFinish={onFinish}
        isOpen={isOpen}
        EndCard={EndCard}
        plays={plays}
        setPlays={setPlays}
        onRenderEndCard={props => {
          setEndCardActive(props)
        }}
      />
      {isOpen ? (
        <>
          <CenterText down show={!endCardActive && !currentStep}>
            {breatheInText}
          </CenterText>
          <CenterText show={!endCardActive && currentStep}>
            {breatheOutText}
          </CenterText>
          <HeaderS color={foreground}>{json.length}</HeaderS>
          <EndCardWrapper show={endCardActive}>
            {endCardActive ? <EndCard {...endCardActive} /> : null}
          </EndCardWrapper>
        </>
      ) : null}
    </Box>
  )
}
