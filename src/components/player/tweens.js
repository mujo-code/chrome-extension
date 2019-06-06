import * as TWEEN from '@tweenjs/tween.js'

const loop = shouldLoop => time => {
  if (shouldLoop()) {
    requestAnimationFrame(loop(shouldLoop))
    TWEEN.update(time)
  }
}

export const createTween = ({
  updateTween,
  completeTween,
  setTween,
  repeat = 2,
  startDelay = 700,
  circleScale = 1,
  circleScaleExpanded = 2,
  circleInnerScale = 1,
  circleInnerExpanded = 1.6,
  breathTime = 3000,
  shouldLoop,
}) => {
  let iteration = 0
  const renderLoop = loop(shouldLoop)
  const position = { scale: circleScale, scale2: circleInnerScale }
  const breathIn = new TWEEN.Tween(position)
    .to({ scale: circleScaleExpanded, scale2: circleInnerExpanded }, breathTime)
    .easing(TWEEN.Easing.Back.InOut)
  const update = updateTween({ tween: breathIn, shouldUpdate: shouldLoop })
  const breathOut = new TWEEN.Tween(position)
    .to({ scale: circleScale, scale2: circleInnerScale }, breathTime)
    .easing(TWEEN.Easing.Back.InOut)
    .onUpdate(update)
    .onComplete(() => {
      iteration += 1
      if (iteration === repeat) {
        completeTween()
      } else {
        breathIn.start()
      }
    })

  breathIn.chain(breathOut).onUpdate(update)

  // NOTE: start every thing
  const timer = setTimeout(() => {
    breathIn.start()
  }, startDelay)
  requestAnimationFrame(renderLoop)

  // return function to teardown
  return {
    update: ({ updateTween: nextUpdateTween, shouldLoop: nextShouldLoop }) => {
      const nextUpdate = nextUpdateTween({
        tween: breathIn,
        shouldUpdate: nextShouldLoop,
      })
      breathIn.onUpdate(nextUpdate)
      breathOut.onUpdate(nextUpdate)
    },
    stop: () => {
      setTween(null)
      clearTimeout(timer)
      breathIn.stop()
      TWEEN.removeAll()
    },
  }
}
