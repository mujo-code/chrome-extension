import * as TWEEN from '@tweenjs/tween.js'

const loop = shouldLoop => time => {
  if (shouldLoop()) {
    requestAnimationFrame(loop(shouldLoop))
    TWEEN.update(time)
  }
}

const defaultsOptions = {
  repeat: 2,
  startDelay: 700,
  circleScale: 1,
  circleScaleExpanded: 1.6,
  circleInnerScale: 1,
  circleInnerExpanded: 1.4,
  breathTime: 3000,
}

export const createTween = inputOptions => {
  const options = { ...defaultsOptions, ...inputOptions }
  const {
    updateTween,
    completeTween,
    setTween,
    repeat,
    startDelay,
    circleScale,
    circleScaleExpanded,
    circleInnerScale,
    circleInnerExpanded,
    breathTime,
    shouldLoop,
  } = options
  const renderLoop = loop(shouldLoop)
  const position = { scale: circleScale, scale2: circleInnerScale }
  const breathIn = new TWEEN.Tween(position)
    .to(
      { scale: circleScaleExpanded, scale2: circleInnerExpanded },
      breathTime
    )
    .easing(TWEEN.Easing.Back.InOut)
  const update = updateTween({
    tween: breathIn,
    shouldUpdate: shouldLoop,
  })
  const breathOut = new TWEEN.Tween(position)
    .to({ scale: circleScale, scale2: circleInnerScale }, breathTime)
    .easing(TWEEN.Easing.Back.InOut)
    .onUpdate(update)
    .onComplete(completeTween({ tween: breathIn, ...options }))

  breathIn.chain(breathOut).onUpdate(update)

  // NOTE: start every thing
  const timer = setTimeout(() => {
    breathIn.start()
  }, startDelay)
  requestAnimationFrame(renderLoop)

  // return function to teardown
  return {
    repeat,
    update: ({
      updateTween: nextUpdateTween,
      shouldLoop: nextShouldLoop,
      completeTween: nextCompleteTween,
    }) => {
      const nextUpdate = nextUpdateTween({
        tween: breathIn,
        shouldUpdate: nextShouldLoop,
      })
      breathIn.onUpdate(nextUpdate)
      breathOut.onUpdate(nextUpdate)
      breathOut.onComplete(
        nextCompleteTween({ tween: breathIn, ...options })
      )
    },
    stop: () => {
      setTween(null)
      clearTimeout(timer)
      breathIn.stop()
      TWEEN.removeAll()
    },
  }
}
