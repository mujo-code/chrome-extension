const stampAnimation = () => ({
  scale: [],
  duration: [],
  outerScale: [],
})

const createNArray = (n, fn) => new Array(n).fill(0).map((_, i) => fn(i))

export const defaults = {
  // circle scales
  scale: 1,
  scaleExpanded: 1.6,
  outerScale: 1,
  outerExpanded: 2,
  scaleExpandedIncrease: 0.7,
  outerExpandedIncrease: 1,
  // duration
  breathTime: 3000,
  breathTimeIncrease: 1500,
}

export const createAnimationSteps = amount => {
  const increaseBreathAmount = defaults.breathTimeIncrease / amount
  const increaseScale = defaults.scaleExpandedIncrease / amount
  const increaseOuterScale = defaults.outerExpandedIncrease / amount

  return createNArray(amount, stampAnimation).map((animation, i) => {
    const duration = increaseBreathAmount * i
    const scale = increaseScale * i
    const outerScale = increaseOuterScale * i

    animation.scale.push(defaults.scaleExpanded + scale)
    animation.scale.push(defaults.scale)

    animation.outerScale.push(defaults.outerExpanded + outerScale)
    animation.outerScale.push(defaults.outerScale)

    animation.duration.push(defaults.breathTime + duration)
    animation.duration.push(defaults.breathTime + duration + 10)

    return animation
  })
}
