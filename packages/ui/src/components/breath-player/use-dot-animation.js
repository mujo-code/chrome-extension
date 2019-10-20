import { useEffect, useCallback, useState } from 'react'
import { useSpring } from 'react-spring'
import { defaults } from './animation-steps'
import { backInOut } from './ease'

const animationFrom = ({ config, ...rest }) => ({
  scale: defaults.scale,
  outerScale: defaults.outerScale,
  ...rest,
  config: {
    duration: defaults.breathAmount,
    mass: 1,
    tension: 280,
    friction: 50,
    easing: backInOut,
    ...(config || {}),
  },
})

export const useDotAnimation = ({
  json,
  isOpen,
  setCurrentStep,
  currentStep,
  onFinish,
  onRenderEndCard,
  EndCard,
  plays,
  setPlays,
}) => {
  const [renderEndCard, setRenderEndCard] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  // NOTE on rest is fired at the end of a in/out breath
  const onRest = useCallback(
    animationProps => {
      if (!json[0] && isOpen) {
        setIsAnimatingOut(true)
        return
      }
      if (!isOpen) {
        return
      }
      const { scale } = animationProps
      const index = json[0].scale.indexOf(scale)
      if (index === 1) {
        json.shift()
      }
      setCurrentStep(index ? 0 : 1)
    },
    // eslint-disable-next-line
    [json, setCurrentStep]
  )

  const [props, set, stop] = useSpring(() =>
    animationFrom({
      config: { duration: defaults.breathTime },
      onRest,
    })
  )

  const close = useCallback(() => {
    onFinish()
    setRenderEndCard(false)
    onRenderEndCard(null)
    setIsAnimatingOut(false)
    set(animationFrom({ onRest })) // all defaults
  }, [onFinish, onRenderEndCard, onRest, set])

  const replay = useCallback(() => {
    setPlays(plays + 1)
    setRenderEndCard(false)
    onRenderEndCard(null)
    setIsAnimatingOut(false)
    set(animationFrom({ onRest })) // all defaults
  }, [onRenderEndCard, onRest, plays, set, setPlays])

  const onFinishAnimation = useCallback(() => {
    if (renderEndCard || !isOpen) return
    if (EndCard) {
      setRenderEndCard(true)
      const duration = defaults.breathTime + defaults.breathTimeIncrease

      // Animate out
      set(
        animationFrom({
          scale: 4.5,
          outerScale: 5,
          config: { duration },
        })
      )
      onRenderEndCard({ close, replay })
      return
    }
    onFinish()
  }, [
    EndCard,
    close,
    isOpen,
    onFinish,
    onRenderEndCard,
    renderEndCard,
    replay,
    set,
  ])

  useEffect(() => {
    if (!isOpen || renderEndCard || isAnimatingOut) {
      return () => {}
    }
    const isEnding = !json[0]
    set(
      animationFrom({
        scale: isEnding ? defaults.scale : json[0].scale[currentStep],
        outerScale: isEnding
          ? defaults.outerScale
          : json[0].outerScale[currentStep],
        config: {
          duration: isEnding
            ? defaults.breathAmount
            : json[0].duration[currentStep],
        },
        onRest,
      })
    ) // kick off animation
    return () => {
      stop()
    }
  }, [
    currentStep,
    isAnimatingOut,
    isOpen,
    json,
    onRest,
    renderEndCard,
    set,
    stop,
  ])

  useEffect(() => {
    if (isAnimatingOut) {
      onFinishAnimation()
      setIsAnimatingOut(false)
    }
  }, [isAnimatingOut, onFinishAnimation])

  return { props }
}
