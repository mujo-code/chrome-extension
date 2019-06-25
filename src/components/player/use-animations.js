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

const REPEAT = 5
export const wait = fn => (...args) =>
  setTimeout(() => fn(...args), 0)

const animatingPropsFactory = () => ({
  rect: {},
  circle: {},
  circle2: {},
})

const defaultsOptions = {
  breathTimeIncrease: 300,
  circleScaleExpandedIncrease: 0.2,
  circleInnerExpandedIncrease: 0.1,
}

export const useAnimations = (props, argOptions = {}) => {
  const options = Object.assign({}, defaultsOptions, argOptions)
  const { isOpen, onFinish } = props
  const [animatingProps, setAnimatingProps] = useState(
    animatingPropsFactory()
  )
  const [isBreathIn, setIsBreathIn] = useState(true)
  const [tween, setTween] = useState(null)
  const delayedSetInBreath = wait(setIsBreathIn)
  const delayedSetAnimatingProps = wait(setAnimatingProps)
  const updateTween = useCallback(
    ({ tween: currentTween, shouldUpdate }) => ({
      scale,
      scale2,
    }) => {
      /* eslint-disable-next-line no-underscore-dangle */
      const isPlaying = currentTween._isPlaying
      if (isBreathIn !== isPlaying) {
        delayedSetInBreath(isPlaying)
      }
      if (!shouldUpdate()) {
        return
      }
      setAnimatingProps(
        Object.assign({}, animatingProps, {
          circle: {
            transform: `scale(${scale2})`,
            transition: 'none',
          },
          circle2: {
            transform: `scale(${scale})`,
            transition: 'all 0.1s',
          },
        })
      )
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
          repeat: REPEAT,
          shouldLoop: () => isOpen,
          setTween,
        })
      )
    } else if (tween && !isOpen) {
      tween.stop()
      delayedSetAnimatingProps(
        Object.assign({}, animatingProps, {
          circle: {},
          circle2: {},
        })
      )
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
