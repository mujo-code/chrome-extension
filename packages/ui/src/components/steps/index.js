import React, { useState, useCallback, useMemo } from 'react'
import { animated as A, useSpring } from 'react-spring'
import { Box } from '@mujo/box'
import { useTheme } from '../../hooks/use-theme'
import { Button } from '../button'

const getSteps = children =>
  React.Children.toArray(children)
    .filter(child => {
      if (!React.isValidElement(child) || child.type !== Step) {
        return false
      }
      return true
    })
    .map(child => child.props || {})

// NOTE: this  is just to help filter out to only certain components
// we pull off props from this component so passing children will still
// be rendered but not inside this component but inside the steps component
export const Step = () => null
Step.displayName = 'Step'

export const AnimatedStep = ({ show, children }) => {
  const style = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'scale(1)' : 'scale(0.8)',
    config: { duration: show ? 300 : 200 },
    delay: show ? 200 : 0,
  })
  return (
    <Box Component={A.div} position="absolute" style={style} layer="1">
      {children}
    </Box>
  )
}

export const Steps = ({
  children,
  onFinish,
  lastCTA = 'Done',
  nextCTA = 'Next',
  backgroundColor,
  highlightColor,
  buttonDesign,
}) => {
  const { background, highlight, buttonStyle } = useTheme()
  const steps = getSteps(children)
  const [step, setStep] = useState(0)
  const isDone = useMemo(() => step + 1 === steps.length, [step, steps])
  const next = useCallback(() => {
    if (isDone) return
    setStep(step + 1)
  }, [isDone, step])

  const bg = backgroundColor || background
  const hl = highlightColor || highlight

  return (
    <Box display="flex" direction="column" flex="1" minHeight="100%">
      <Box
        flex="1"
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {steps.map((child, i) => (
          <AnimatedStep key={child.name} show={step === i}>
            {child.children}
          </AnimatedStep>
        ))}
      </Box>
      <Box display="flex" direction="column" paddingBottom="m">
        <Box
          flex="0"
          display="flex"
          direction="row"
          justifyContent="center"
          marginBottom="m"
        >
          {steps.map(({ name }, i) => (
            <Box
              key={name}
              marginLeft="s"
              marginRight="s"
              borderRadius="l"
              backgroundColor={i === step ? bg : hl}
              css={{ width: '16px', height: '16px' }}
            />
          ))}
        </Box>
        <Box
          flex="0"
          display="flex"
          justifyContent="center"
          position="relative"
          layer="3"
        >
          <Button
            design={buttonDesign || buttonStyle}
            onClick={isDone ? onFinish : next}
          >
            {isDone ? lastCTA : nextCTA}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
