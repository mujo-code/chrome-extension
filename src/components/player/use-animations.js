import { useEffect, useState } from 'react'
import { toSvgProps, toCircleProps, toTextProps, toRectProps } from './styles'
import { createTween } from './tweens'

export { transition } from './styles'

export const wait = fn => (...args) => setTimeout(() => fn(...args), 0)

const animatingPropsFactory = () => ({
  rect: {},
  circle: {},
  circle2: {},
})

export const useAnimations = props => {
  const { isOpen, onFinish } = props
  const [animatingProps, setAnimatingProps] = useState(animatingPropsFactory())
  const [isBreathIn, setIsBreathIn] = useState(true)
  const [tween, setTween] = useState(null)
  const delayedSetInBreath = wait(setIsBreathIn)
  const delayedSetAnimatingProps = wait(setAnimatingProps)
  const updateTween = ({ tween: currentTween, shouldUpdate }) => ({
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
        circle2: { transform: `scale(${scale})`, transition: 'all 0.1s' },
      })
    )
  }
  const completeTween = () => {
    setAnimatingProps(animatingPropsFactory())
    onFinish()
  }
  useEffect(() => {
    if (isOpen && !tween) {
      setTween(
        createTween({
          updateTween,
          completeTween,
          repeat: 5,
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
      })
    }
  }, [isOpen, animatingProps, isBreathIn, tween])
  const animationProps = {
    svg: toSvgProps(props),
    rect: toRectProps(props, animatingProps.rect),
    circle: toCircleProps(props, animatingProps.circle),
    circle2: toCircleProps(props, animatingProps.circle2),
    text: toTextProps(props, {}),
  }
  return [
    {
      animationProps,
      isBreathIn,
    },
    {},
  ]
}
