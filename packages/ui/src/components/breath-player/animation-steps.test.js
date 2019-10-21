import { createAnimationSteps, defaults } from './animation-steps'

test('createAnimationSteps should generate a given amount of steps', () => {
  expect(createAnimationSteps(10)).toHaveLength(10)
})

test(`
  createAnimationSteps should generate steps that gradiually get larger
  in scale and duration
`, () => {
  const amount = Math.floor(Math.random() * 20)
  const increaseBreathAmount = defaults.breathTimeIncrease / amount
  const increaseScale = defaults.scaleExpandedIncrease / amount
  const increaseOuterScale = defaults.outerExpandedIncrease / amount
  const steps = createAnimationSteps(amount)

  expect.assertions(amount * 3)
  steps.forEach(({ scale, outerScale, duration }, i) => {
    expect(scale).toEqual([
      defaults.scaleExpanded + increaseScale * i,
      defaults.scale,
    ])
    expect(outerScale).toEqual([
      defaults.outerExpanded + increaseOuterScale * i,
      defaults.outerScale,
    ])
    expect(duration).toEqual([
      defaults.breathTime + increaseBreathAmount * i,
      defaults.breathTime + increaseBreathAmount * i + 10,
    ])
  })
})
