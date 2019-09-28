import { useEffect, useState, useCallback } from 'react'
import {
  toSvgProps,
  toCircleProps,
  toTextProps,
  toRectProps,
  toCountProps,
} from './styles'
import { createTween } from './tweens'

export { transition } from './styles'

export const wait = fn => (...args) => setTimeout(() => fn(...args), 0)

const animatingPropsFactory = () => ({
  rect: {},
  circle: {},
  circle2: {},
})

// these are now totals
const defaultsOptions = {
  breathTimeIncrease: 1500,
  circleScaleExpandedIncrease: 1,
  circleInnerExpandedIncrease: 0.7,
}

const makeOptions = (breathAmount = 5, argOptions) => {
  const {
    breathTimeIncrease,
    circleScaleExpandedIncrease,
    circleInnerExpandedIncrease,
  } = { ...defaultsOptions, ...argOptions }
  return {
    breathTimeIncrease: breathTimeIncrease / breathAmount,
    circleScaleExpandedIncrease: circleScaleExpandedIncrease / breathAmount,
    circleInnerExpandedIncrease: circleInnerExpandedIncrease / breathAmount,
  }
}

export const useAnimations = (props, argOptions = {}) => {
  const { isOpen, onFinish, breathAmount } = props
  const options = makeOptions(breathAmount, argOptions)
  const [animatingProps, setAnimatingProps] = useState(animatingPropsFactory())
  const [isBreathIn, setIsBreathIn] = useState(true)
  const [tween, setTween] = useState(null)
  const delayedSetInBreath = wait(setIsBreathIn)
  const delayedSetAnimatingProps = wait(setAnimatingProps)
  const updateTween = useCallback(
    ({ tween: currentTween, shouldUpdate }) => ({ scale, scale2 }) => {
      /* eslint-disable-next-line no-underscore-dangle */
      const isPlaying = currentTween._isPlaying
      if (isBreathIn !== isPlaying) {
        delayedSetInBreath(isPlaying)
      }
      if (!shouldUpdate()) {
        return
      }
      setAnimatingProps({
        ...animatingProps,
        circle: {
          transform: `scale(${scale2}) translateZ(0)`,
          transition: 'none',
        },
        circle2: {
          transform: `scale(${scale}) translateZ(0)`,
          transition: 'none',
        },
      })
    },
    [animatingProps, delayedSetInBreath, isBreathIn]
  )
  // TODO: update to be able to hot swappable like update
  const completeTween = useCallback(
    ({
      repeat: iteration,
      breathTime,
      circleScaleExpanded,
      circleInnerExpanded,
    }) => () => {
      if (iteration > 1) {
        const {
          breathTimeIncrease,
          circleScaleExpandedIncrease,
          circleInnerExpandedIncrease,
        } = options
        setTween(
          createTween({
            updateTween,
            completeTween,
            startDelay: 0,
            repeat: iteration - 1,
            shouldLoop: () => isOpen,
            breathTime: breathTime + breathTimeIncrease,
            circleScaleExpanded:
              circleScaleExpanded + circleScaleExpandedIncrease,
            circleInnerExpanded:
              circleInnerExpanded + circleInnerExpandedIncrease,
            setTween,
          })
        )
        return
      }
      setAnimatingProps(animatingPropsFactory())
      onFinish()
    },
    [isOpen, onFinish, options, updateTween]
  )
  useEffect(() => {
    if (isOpen && !tween) {
      setTween(
        createTween({
          updateTween,
          completeTween,
          repeat: breathAmount || 5,
          shouldLoop: () => isOpen,
          setTween,
        })
      )
    } else if (tween && !isOpen) {
      tween.stop()
      delayedSetAnimatingProps({
        ...animatingProps,
        circle: {},
        circle2: {},
      })
    } else if (tween) {
      tween.update({
        updateTween,
        shouldLoop: () => isOpen,
        completeTween,
      })
    }
  }, [
    isOpen,
    animatingProps,
    isBreathIn,
    tween,
    updateTween,
    completeTween,
    delayedSetAnimatingProps,
    options.breathAmount,
    breathAmount,
  ])
  const animationProps = {
    svg: toSvgProps(props),
    rect: toRectProps(props, animatingProps.rect),
    circle: toCircleProps(props, animatingProps.circle),
    circle2: toCircleProps(props, animatingProps.circle2),
    text: toTextProps(props, {}),
    count: toCountProps(props, {}),
  }
  return [
    {
      iteration: tween ? tween.repeat : 0,
      animationProps,
      isBreathIn,
    },
    {},
  ]
}
